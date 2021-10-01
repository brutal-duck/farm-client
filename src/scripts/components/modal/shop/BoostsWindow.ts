import { shortNum, shortTime } from "../../../general/basic";
import Shop from "../../../scenes/Modal/Shop/Main";
import Arrow from "../../animations/Arrow";
import CollectorButton from './../../Buttons/CollectorButton';
import Utils from './../../../libs/Utils';

const ONE_HOUR: number = 3600;
const TWO_HOURS: number = 7200;    

const btnTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontSize: '23px',
  fontFamily: 'Shadow',
  color: '#ffffff',
  stroke: '#3B5367',
  strokeThickness: 4,
};
export default class BoostsWindow extends Phaser.GameObjects.Sprite {
  public scene: Shop;
  private farm: string;

  private herdBoostTimerText: Phaser.GameObjects.Text;
  private herdBoostBtnRightText: Phaser.GameObjects.Text;
  private herdBoostBtnLeftText: Phaser.GameObjects.Text;
  private herdBoostDiamondBtn: Phaser.GameObjects.Sprite;
  private herdBoostBtn: Phaser.GameObjects.Sprite;
  private herdBoostBtnUpdated: boolean;
  private feedProgressBar: Phaser.GameObjects.TileSprite;
  private feedProgressText: Phaser.GameObjects.Text;
  private feedProgressBarBg: Phaser.GameObjects.Sprite;
  private feedBoostBtnRightText: Phaser.GameObjects.Text;
  private feedBoostBtnLeftText: Phaser.GameObjects.Text;
  private feedBoostDiamondBtn: Phaser.GameObjects.Sprite;
  private feedBoostBtn: Phaser.GameObjects.Sprite;
  private feedBoostNotification: Phaser.GameObjects.Text;
  private feedBoostNotificationBg: Phaser.GameObjects.Sprite;
  private herdBoostNotification: Phaser.GameObjects.Text;
  private herdBoostNotificationBg: Phaser.GameObjects.Sprite;
  private collectorTimer: Phaser.GameObjects.Text;
  private collectorIsOn: boolean;
  private freeCollector: CollectorButton;
  private doubleCollector: CollectorButton;
  private adBtn: CollectorButton;
  private improve: Phaser.GameObjects.Sprite;
  private improveText: Phaser.GameObjects.Text;
  private maxWidth: number;

  constructor(scene: Shop) {
    super(scene, 0, 0, 'pixel');
    this.scene = scene;
    this.init();
    this.create();
  }

  private init(): void {
    this.scene.add.existing(this);
    this.scene.scrolling.bottom = this.scene.height - this.scene.heightWindow;
    this.farm = this.scene.state.farm;
    if (this.scene.state[`user${this.scene.state.farm}`].collector !== 0) this.collectorIsOn = true;
    else this.collectorIsOn = false;
    this.maxWidth = 408;
  }

  private create(): void {
    switch (this.scene.state.farm) {
      case 'Sheep':
        this.collectorBoost();
        if (this.checkHerdBoost()) this.herdBoost();
        if (this.checkFeedBoost()) this.feedBoost();
        break;
      case 'Chicken':
        this.collectorBoost();
        if (this.checkHerdBoost()) this.herdBoost();
        if (this.checkFeedBoost()) this.feedBoost();
        break;
      case 'Cow':
        this.collectorBoost();
        if (this.checkHerdBoost()) this.herdBoost();
        if (this.checkFeedBoost()) this.feedBoost();
        break;
      case 'Unicorn':
        this.collectorBoost();
        if (this.checkEventHerdBoost()) this.eventHerdBoost();
        if (this.checkEventFeedBoost()) this.eventFeedBoost();
        break;
    }
    this.createTutorialArrow();
  }

  public preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (this.collectorIsOn) this.updateCollectorTime();
    this.updateHerdBoostBtn();
    this.updateFeedBoostBtn();

    if (this.scene.state.farm === 'Unicorn') {
      this.updateEventHerdBoostBtn();
      this.updateEventFeedBoostBtn();
    }
  }
  
  private collectorBoost(): void {
    // собиратель шерсти
    let resource: string;
    if (this.scene.state.farm === 'Sheep') resource = 'wool';
    if (this.scene.state.farm === 'Chicken') resource = 'egg';
    if (this.scene.state.farm === 'Cow') resource = 'milk';
    if (this.scene.state.farm === 'Unicorn') resource = 'resource';
    this.scene.add.sprite(0, 20 + this.scene.height, 'boost-bg').setOrigin(0, 0);
    this.scene.add.text(225, 40 + this.scene.height, this.scene.state.lang[`${resource}Collector`], { font: '28px Shadow', color: '#FFFFFF' }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
    const collectorSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(40, 65 + this.scene.height, `shop-${this.scene.state.farm.toLowerCase()}-${resource}-collector`).setOrigin(0, 0);
    const levelBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(10, 55 + this.scene.height, 'level-bg').setOrigin(0, 0);
    let level: string = String(this.scene.state[`user${this.scene.state.farm}`].collectorLevel);
    if (this.scene.state[`user${this.scene.state.farm}`].collectorLevel === this.scene.state[`${this.scene.state.farm.toLowerCase()}CollectorSettings`].length) level = 'Max';
  
    const userLevel: Phaser.GameObjects.Text = this.scene.add.text(52, 90 + this.scene.height, level, { font: '26px Bip', color: '#F8DF86' }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);
    const levelText: Phaser.GameObjects.Text = this.scene.add.text(52, 110 + this.scene.height, this.scene.state.lang.shortLevel, { font: '18px Bip', color: '#F8DF86' }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);
  
    // осталось времени
    if (this.scene.state[`user${this.scene.state.farm}`].collector > 0) {
      const time: string = shortTime(this.scene.state[`user${this.scene.state.farm}`].collector, this.scene.state.lang);
      this.collectorTimer = this.scene.add.text(120, 235 + this.scene.height, this.scene.state.lang.still + ' ' + time, { font: '20px Shadow', color: '#FFFFFF' }).setOrigin(0.5, 0.5);
    }
    
    this.createFreeCollectorBtns();
    this.createHoursCollectorBtn(4);
    this.createHoursCollectorBtn(12);
      
    // кнопка улучшения
    if (this.checkImproveCollector()) {
      this.improve = this.scene.add.sprite(120, 285 + this.scene.height, 'improve-collector');
      this.improveText = this.scene.add.text(120, 281 + this.scene.height, this.scene.state.lang.improve, btnTextStyle).setOrigin(0.5, 0.5);
      this.scene.clickShopBtn({ btn: this.improve, title: this.improveText }, (): void => { this.scene.game.scene.keys[this.scene.state.farm].showImproveCollector() });
      if (this.scene.state[`user${this.scene.state.farm}`].collector === 0) {
        this.improve.y -= 15;
        this.improveText.y -= 15;
      }
    } else {
      if (this.scene.state[`user${this.scene.state.farm}`].collector > 0) {
        this.collectorTimer.y += 45;
        collectorSprite.y += 25;
        levelBg.y += 25;
        userLevel.y += 25;
        levelText.y += 25;
      } else {
        collectorSprite.y += 35;
        levelBg.y += 35;
        userLevel.y += 35;
        levelText.y += 35;
      }
    }
  }

  private createHoursCollectorBtn(hoursCount: number): void {
    const unlockCollector: number = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`unlockCollector${hoursCount}`];
    const price: number = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`collectorPrice${hoursCount}`];
    const farmPart: number = this.scene.state[`user${this.scene.state.farm}`].part;
    const position: Iposition = {
      x: 350,
      y: hoursCount === 4 ? 220 + this.scene.height : 280 + this.scene.height,
    };
    const settings: IcollectorButtonSetting = {
      left: String(hoursCount),
      leftLitleText: this.scene.state.lang.shortHours,
      right: String(price),
      sale: null,
      type: 'diamond',
    };

    if (unlockCollector <= farmPart) {
      const boostCount: number = this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()][`collector${hoursCount}`];
      if (boostCount > 0) {
        settings.type = 'free-diamond';
        settings.right = this.scene.state.lang.take;
      }
      const action: () => void = (): void => {
        this.scene.game.scene.keys[this.farm].buyCollector(hoursCount === 4 ? 3 : 4);
        this.scene.game.scene.keys[this.farm].autosave();
      };
      if (Utils.checkSale(this.scene.state.sales, `${this.farm.toUpperCase()}_COLLECTOR_PRICE`)) {
        settings.sale = String(Math.floor(price / 2));
      }
      const btn = new CollectorButton(this.scene, position, action, settings);
      this.createCollectorBoostNotificator(btn, boostCount);
    } else {
      settings.type = 'lock';
      settings.right = `${this.scene.state.lang.lvl} ${unlockCollector}`;
      new CollectorButton(this.scene, position, null, settings);
    }
  }

  private createCollectorBoostNotificator(btn: CollectorButton, boostCount: number): void {
    if (boostCount > 0) {
      const buttonGeom: Phaser.Geom.Rectangle =  btn.getBounds();
      const text: Phaser.GameObjects.Text = this.scene.add.text(buttonGeom.left - 2, buttonGeom.top + 5, String(boostCount), {
        font: '28px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5).setDepth(2).setShadow(2, 3, '#724719', 5);
      const textGeom: Phaser.Geom.Rectangle = text.getBounds();
      const width: number = textGeom.width + 30 < 60 ? 60 : textGeom.width + 30;
      this.scene.add.sprite(text.x, text.y, 'boost-counter-bg').setDisplaySize(width, textGeom.height + 25).setDepth(1);
    }
  }

  private checkImproveCollector(): boolean {
    const farmUser: IuserSheep | IuserChicken | IuserCow | IuserUnicorn = this.scene.state[`user${this.scene.state.farm}`];
    const maxLevel: number = this.scene.state[`${this.scene.state.farm.toLowerCase()}CollectorSettings`].length;
    if (this.scene.state.farm === 'Sheep') return farmUser.collectorLevel < maxLevel && farmUser.tutorial >= 100;
    return farmUser.collectorLevel < maxLevel;
  }

  private createFreeCollectorBtns(): void {
    this.destroyFreeCollectorBtns();
    const farmUser: IuserSheep | IuserChicken | IuserCow | IuserUnicorn = this.scene.state[`user${this.scene.state.farm}`];
    const collectorSettings: IcollectorSettings[] = this.scene.state[`${this.farm.toLowerCase()}CollectorSettings`];
    const collectorLevel: number = farmUser.collectorLevel;

    const freeTime: number = collectorSettings.find((data: IcollectorSettings) => data.level === collectorLevel).time;

    // бесплатный
    const position: Iposition = {
      x: 350,
      y: 100 + this.scene.height,
    };
    const settings: IcollectorButtonSetting = {
      left: String(freeTime),
      leftLitleText: this.scene.state.lang.shortMinutes,
      right: this.scene.state.lang.take,
      type: 'free',
    };

    let action: () => void = null;

    if (farmUser.collector === 0) {
      action = (): void => {
        this.scene.game.scene.keys[this.farm].freeCollector(1);
        this.scene.game.scene.keys[this.farm].autosave();
      }
    } else settings.type = 'free-lock';

    this.freeCollector = new CollectorButton(this.scene, position, action, settings);
  
    // удвоенный собиратель
    this.createDoubledCollectorBtn(freeTime);
  }

  private createDoubledCollectorBtn(freeTime: number) {
    const time: number = freeTime * 2;
    const price: number = Math.floor(time / 60 * this.scene.state[`${this.farm.toLowerCase()}Settings`].doubledСollectorPrice);

    const position: Iposition = {
      x: 350,
      y: 160 + this.scene.height,
    };

    const settings: IcollectorButtonSetting = {
      left: String(time),
      leftLitleText: this.scene.state.lang.shortMinutes,
      right: '',
      type: 'ad',
    };
    const sale = Utils.checkSale(this.scene.state.sales, `${this.farm.toUpperCase()}_COLLECTOR_PRICE`)

    let action: () => void = null;

    if (this.checkDouble()) {
      if (this.scene.state.readyAd) {
        action = (): void => {
          this.scene.game.scene.keys[this.scene.state.farm].ads.watchAd(3);
          this.scene.scene.stop('Shop');
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        };
      } else {
        action = (): void => {
          this.scene.game.scene.keys[this.scene.state.farm].freeCollector(2);
          this.scene.game.scene.keys[this.scene.state.farm].autosave();
        };
        settings.right = String(price);
        settings.sale = sale ? String(Math.floor(price / 2)) : null;
        settings.type = 'ad-diamond';
      }

    } else {
      if (this.scene.state.readyAd)
        settings.type = 'lock-ad';
      else {
        settings.right = String(price);
        settings.sale = sale ? String(Math.floor(price / 2)) : null;
        settings.type = 'lock-ad-diamond';
      }
    }
    this.adBtn = new CollectorButton(this.scene, position, action, settings);
  }

  private checkDouble(): boolean {
    const farmUser: IuserSheep | IuserChicken | IuserCow | IuserUnicorn = this.scene.state[`user${this.scene.state.farm}`];
    if (this.scene.state.farm === 'Sheep') return farmUser.collector === 0 && farmUser.tutorial >= 100;
    return farmUser.collector === 0;
  }

  private createTutorialArrow(): void {
    const farmUser: IuserSheep | IuserChicken | IuserCow | IuserUnicorn = this.scene.state[`user${this.scene.state.farm}`];
    if (farmUser.collector === 0) {
      if (this.scene.state.farm === 'Sheep' && farmUser.tutorial === 90) Arrow.generate(this.scene, 8);
      if (this.scene.state.userUnicorn.tutorial === 90) Arrow.generate(this.scene, 8);

    }
  }

  private destroyFreeCollectorBtns(): void {
    this.freeCollector?.destroy();
    this.doubleCollector?.destroy();
    this.adBtn?.destroy();
  }
  
  private herdBoost(): void {
    const y: number = 335 + this.scene.height;
    this.scene.add.tileSprite(0, y, 466, 235, 'boost-bg').setOrigin(0, 0);
    this.scene.add.text(240, y + 35, this.scene.state.lang[`herdBoostTitle${this.scene.state.farm}`], { 
      font: '28px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
    
    this.scene.add.sprite(40, y + 70, `${this.scene.state.farm.toLocaleLowerCase()}-herd-boost-icon`).setOrigin(0, 0);
    this.scene.add.sprite(0, y, 'flags').setOrigin(0, 0).setFlipX(true);
    this.scene.add.sprite(466, y, 'flags').setOrigin(1, 0);
    // кнопка
    let xBtn: number =  330;
    let yBtn: number = y + 170;
    this.herdBoostBtn = this.scene.add.sprite(xBtn, yBtn, 'improve-collector');
    this.herdBoostBtn.setDataEnabled();
    this.herdBoostBtnUpdated = false;

    this.herdBoostBtnLeftText = this.scene.add.text(xBtn, yBtn - 5, this.scene.state.lang.buy, btnTextStyle).setOrigin(0, 0.5).setDepth(10);
    this.herdBoostDiamondBtn = this.scene.add.sprite(xBtn, yBtn - 5, 'diamond').setOrigin(0, 0.5).setVisible(true).setScale(0.11);

    const price: number = this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost;
    this.herdBoostBtnRightText = this.scene.add.text(xBtn, yBtn - 5, String(shortNum(price)), btnTextStyle).setOrigin(0, 0.5).setDepth(10);
  
    const width: number = (this.herdBoostBtnLeftText.displayWidth + this.herdBoostDiamondBtn.displayWidth + this.herdBoostBtnRightText.displayWidth) / 2;
    this.herdBoostBtnLeftText.setX(xBtn - width);
    this.herdBoostDiamondBtn.setX(this.herdBoostBtnLeftText.getBounds().right + 2);
    this.herdBoostBtnRightText.setX(this.herdBoostDiamondBtn.getBounds().right + 2);
    
    if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].herd > 0) {
      this.herdBoostNotification = this.scene.add.text(xBtn + 90, yBtn - 60, this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].herd, {
        font: '28px Shadow',
        color: '#FFFFFF'
      }).setDepth(2).setOrigin(0.5).setShadow(2, 3, '#724719', 5);
  
      this.herdBoostNotificationBg = this.scene.add.sprite(0, 0, 'boost-counter-bg').setDepth(1);
      const textGeom: Phaser.Geom.Rectangle = this.herdBoostNotification.getBounds();
      const width: number = textGeom.width + 30 < 60 ? 60 : textGeom.width + 30;
      this.herdBoostNotificationBg.setPosition(textGeom.centerX, textGeom.centerY).setDisplaySize(width, textGeom.height + 20);
    }
        
    this.herdBoostTimerText = this.scene.add.text(xBtn, yBtn - 60, this.scene.state.lang.stillForBoost + ' ' + shortTime(this.scene.state.timeToNewDay, this.scene.state.lang), {
      font: '20px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 220 },
      align: 'center'
    }).setOrigin(0.5);
    
    const modalBtn: any = {
      btn: this.herdBoostBtn,
      title: this.herdBoostBtnLeftText,
      text1: this.herdBoostBtnRightText,
      img1: this.herdBoostDiamondBtn
    };
    this.scene.clickModalBtn(modalBtn, (): void => { this.herdBoostBtnHandler(); });
  }
  
  private herdBoostBtnHandler(): void {
    const price: number = this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost;
    if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].herd > 0) {
      this.scene.game.scene.keys[this.scene.state.farm].startHerdBoost();
    } else {
      if (this.scene.state.user.diamonds >= price) {
        this.scene.game.scene.keys[this.scene.state.farm].startHerdBoost();
      } else {
        // вызывем конвертор
        this.scene.state.convertor = {
          fun: 0,
          count: price,
          diamonds: price,
          type: 1
        };
        this.scene.game.scene.keys[this.scene.state.farm].exchange();
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
        this.scene.scene.stop('ShopBars');
        this.scene.scene.stop('Modal');
      }
    }
  }

  private feedBoost(): void {
    const y: number = 585 + this.scene.height;
    this.scene.add.tileSprite(0, y, 466, 270, 'boost-bg').setOrigin(0, 0);
    this.scene.add.text(240, y + 20, this.scene.state.lang.feedBoostTitle, { 
      font: '28px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
  
    this.scene.add.text(330, y + 75, this.scene.state.lang[`feedBoostSubtitle${this.scene.state.farm}`], { 
      font: '18px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 240 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
    
    this.scene.add.sprite(40, y + 35, `${this.scene.state.farm.toLocaleLowerCase()}-feed-boost-icon`).setOrigin(0, 0);
  
    let xBtn: number =  330;
    let yBtn: number = y + 135;
    this.feedBoostBtn = this.scene.add.sprite(xBtn, yBtn, 'improve-collector');
    this.feedBoostDiamondBtn = this.scene.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11).setOrigin(0, 0.5);
    
    this.feedBoostBtnLeftText = this.scene.add.text(xBtn, yBtn - 5 , '+1 ' + this.scene.state.lang.hour, btnTextStyle).setOrigin(0, 0.5).setDepth(10);
    this.feedBoostBtnRightText = this.scene.add.text(xBtn, yBtn - 5 , String(shortNum(this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice)), btnTextStyle).setOrigin(0, 0.5).setDepth(10);

    this.feedBoostNotification = this.scene.add.text(xBtn + 90, yBtn - 40, this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed, { font: '28px Shadow', color: '#FFFFFF' }).setDepth(1).setOrigin(0.5).setVisible(false).setShadow(2, 3, '#724719', 5);
    this.feedBoostNotificationBg = this.scene.add.sprite(this.feedBoostNotification.x, this.feedBoostNotification.y, 'boost-counter-bg');

    const width: number = (this.feedBoostBtnLeftText.displayWidth + this.feedBoostDiamondBtn.displayWidth + this.feedBoostBtnRightText.displayWidth) / 2;

    this.feedBoostBtnLeftText.setX(this.feedBoostBtn.x - width);
    this.feedBoostDiamondBtn.setX(this.feedBoostBtnLeftText.getBounds().right + 2);
    this.feedBoostBtnRightText.setX(this.feedBoostDiamondBtn.getBounds().right + 2);
    
    this.feedProgressBarBg = this.scene.add.sprite(10, y + 230, 'pb-chapter-modal').setOrigin(0, 0.5).setScale(0.92, 1).setVisible(false);
    this.feedProgressBar = this.scene.add.tileSprite(25, y + 230, 0, 16, 'green-progress').setOrigin(0, 0.5).setVisible(false);
    let progress: number = (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / (ONE_HOUR * this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack)) * this.maxWidth;
    this.feedProgressBar.setDisplaySize(progress, 16);
    this.feedProgressText = this.scene.add.text(240, y + 200, this.scene.state.lang.still + ' ' + shortTime(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime, this.scene.state.lang), {
      font: '21px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setVisible(false);
  
    const modalBtn: any = {
      btn: this.feedBoostBtn,
      title: this.feedBoostBtnLeftText,
      text1: this.feedBoostBtnRightText,
      img1: this.feedBoostDiamondBtn
    };
    this.scene.clickModalBtn(modalBtn, (): void => { this.feedBoostBtnHandler(); });
  }
  
  private feedBoostBtnHandler(): void {
    if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed > 0) {
        
      if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime + TWO_HOURS > this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack * ONE_HOUR) {
        this.scene.scene.stop('Shop');
        this.scene.scene.stop('ShopBars');
        this.scene.scene.stop('Modal');
        const modal: Imodal = {
          type: 1,
          sysType: 3,
          height: 150,
          message: this.scene.state.lang.feedBoostMax
        };
        this.scene.state.modal = modal;
        this.scene.scene.launch('Modal', this.scene.state);
      } else {
        this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed -= 1;
        this.scene.state.amplitude.logAmplitudeEvent('feed_boost_spent', {});
        this.scene.state.boughtFeedBoost = true;
        if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime <= 0) {
          this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += ONE_HOUR; // прибавить час
          this.scene.state.amplitude.logAmplitudeEvent('booster_feed_x2', {
            price: 0,
            time: 1,
          });
          this.scene.game.scene.keys[this.scene.state.farm].tryTask(21, 0, 1);
          this.scene.game.scene.keys[this.scene.state.farm].tryClanTask(9, 0, 1);
        } else {
          const time: number = Math.ceil(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / ONE_HOUR / 2) + 1;
          this.scene.state.amplitude.logAmplitudeEvent('booster_feed_x2', {
            price: 0,
            time: time,
          });
          this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += TWO_HOURS; // прибавить 2часа
          this.scene.game.scene.keys[this.scene.state.farm].tryTask(21, 0, 2);
          this.scene.game.scene.keys[this.scene.state.farm].tryClanTask(9, 0, 2);
        }
      }
    } else {
      if (this.scene.state.user.diamonds >= this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice) {
        if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime + TWO_HOURS > this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack * ONE_HOUR) {
  
          this.scene.scene.stop('Shop');
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');

          let modal: Imodal = {
            type: 1,
            sysType: 3,
            height: 150,
            message: this.scene.state.lang.feedBoostMax
          };
          
          this.scene.state.modal = modal;
          this.scene.scene.launch('Modal', this.scene.state);
          
        } else {
  
          this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
            type: 'booster_feed_x2',
            count: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
          });
  
          this.scene.state.user.diamonds -= this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice;
  
          this.scene.state.boughtFeedBoost = true;
          this.scene.game.scene.keys[this.scene.state.farm].tryTask(15, 0, this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice);
          
          if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime <= 0) {
            this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += ONE_HOUR; // прибавить час
  
            this.scene.state.amplitude.logAmplitudeEvent('booster_feed_x2', {
              price: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
              time: 1,
            });
            this.scene.game.scene.keys[this.scene.state.farm].tryTask(21, 0, 1);
            this.scene.game.scene.keys[this.scene.state.farm].tryClanTask(9, 0, 1);
          } else {
            const time: number = Math.ceil(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / ONE_HOUR / 2) + 1;
            this.scene.state.amplitude.logAmplitudeEvent('booster_feed_x2', {
              price: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
              time: time,
            });
            this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += TWO_HOURS; // прибавить 2часа
            this.scene.game.scene.keys[this.scene.state.farm].tryTask(21, 0, 2);
            this.scene.game.scene.keys[this.scene.state.farm].tryClanTask(9, 0, 2);
          }
        }
      } else {
        // вызывем конвертор
        this.scene.state.convertor = {
          fun: 0,
          count: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
          diamonds: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
          type: 1
        };
        this.scene.game.scene.keys[this.scene.state.farm].exchange();
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
        this.scene.scene.stop('ShopBars');
        this.scene.scene.stop('Modal');
      }
    }
  }

  private eventHerdBoost(): void {
    if (this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost <= 0) this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost = 1;
    
    const y: number = 335 + this.scene.height;
    this.scene.add.tileSprite(0, y, 466, 235, 'boost-bg').setOrigin(0, 0);
    this.scene.add.text(240, y + 35, this.scene.state.lang[`herdBoostTitle${this.scene.state.farm}`], { 
      font: '28px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
    
    this.scene.add.sprite(40, y + 70, `${this.scene.state.farm.toLocaleLowerCase()}-herd-boost-icon`).setOrigin(0, 0);
    this.scene.add.sprite(0, y, 'flags').setOrigin(0, 0).setFlipX(true);
    this.scene.add.sprite(466, y, 'flags').setOrigin(1, 0);
    // кнопка
    let xBtn: number =  330;
    let yBtn: number = y + 170;
    this.herdBoostBtn = this.scene.add.sprite(xBtn, yBtn, 'improve-collector');
    this.herdBoostBtnUpdated = false;
  
    this.herdBoostDiamondBtn = this.scene.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11).setOrigin(0, 0.5);
    this.herdBoostBtnLeftText = this.scene.add.text(xBtn, yBtn - 5 , this.scene.state.lang.buy, btnTextStyle).setOrigin(0, 0.5).setDepth(10);
    this.herdBoostBtnRightText = this.scene.add.text(xBtn, yBtn - 5 , String(shortNum(this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost)), btnTextStyle).setOrigin(0, 0.5).setDepth(10);
    
    const width: number = (this.herdBoostBtnLeftText.displayWidth + this.herdBoostDiamondBtn.displayWidth + this.herdBoostBtnRightText.displayWidth) / 2;
    this.herdBoostBtnLeftText.setX(xBtn - width - 5);
    this.herdBoostDiamondBtn.setX(this.herdBoostBtnLeftText.getBounds().right + 2);
    this.herdBoostBtnRightText.setX(this.herdBoostDiamondBtn.getBounds().right + 2);

    const modalBtn: any = {
      btn: this.herdBoostBtn,
      title: this.herdBoostBtnLeftText,
      text1: this.herdBoostBtnRightText,
      img1: this.herdBoostDiamondBtn
    };
    this.scene.clickModalBtn(modalBtn, (): void => { this.eventHerdBoostBtnHandler(); });
  }

  private eventHerdBoostBtnHandler(): void {
    const price: number = this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost;
    if (this.scene.state.user.diamonds >= price) {
      this.scene.game.scene.keys[this.scene.state.farm].startHerdBoost();
    } else {
      this.scene.state.convertor = {
        fun: 0,
        count: price,
        diamonds: price,
        type: 1
      }
      this.scene.game.scene.keys[this.scene.state.farm].exchange();
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.scene.stop();
      this.scene.scene.stop('ShopBars');
      this.scene.scene.stop('Modal');
    }
  }
  
  private eventFeedBoost(): void {
    const y: number = 585 + this.scene.height;
    this.scene.add.tileSprite(0, y, 466, 270, 'boost-bg').setOrigin(0, 0);
    this.scene.add.text(240, y + 20, this.scene.state.lang.feedBoostTitle, { 
      font: '28px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
  
    this.scene.add.text(330, y + 75, this.scene.state.lang[`feedBoostSubtitle${this.scene.state.farm}`], { 
      font: '18px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 240 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
    
    this.scene.add.sprite(40, y + 35, `${this.scene.state.farm.toLocaleLowerCase()}-feed-boost-icon`).setOrigin(0, 0);
  
    const xBtn: number =  330;
    const yBtn: number = y + 135;
    this.feedBoostBtn = this.scene.add.sprite(xBtn, yBtn, 'improve-collector');
    this.feedBoostDiamondBtn = this.scene.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11).setOrigin(0, 0.5);
    this.feedBoostBtnLeftText = this.scene.add.text(xBtn, yBtn - 5 , '+1 ' + this.scene.state.lang.hour, btnTextStyle).setOrigin(0, 0.5).setDepth(10);
    const price: number = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice;
    this.feedBoostBtnRightText = this.scene.add.text(xBtn, yBtn - 5 , String(shortNum(price)), btnTextStyle).setOrigin(0, 0.5).setDepth(10);
  
    const width: number = (this.feedBoostBtnLeftText.displayWidth + this.feedBoostDiamondBtn.displayWidth + this.feedBoostBtnRightText.displayWidth) / 2;
    this.feedBoostBtnLeftText.setX(this.feedBoostBtn.x - width);
    this.feedBoostDiamondBtn.setX(this.feedBoostBtnLeftText.getBounds().right + 2);
    this.feedBoostBtnRightText.setX(this.feedBoostDiamondBtn.getBounds().right + 2);
    this.feedProgressBarBg = this.scene.add.sprite(10, y + 230, 'pb-chapter-modal').setOrigin(0, 0.5).setScale(0.92, 1).setVisible(false);
    this.feedProgressBar = this.scene.add.tileSprite(25, y + 230, 0, 16, 'green-progress').setOrigin(0, 0.5).setVisible(false);

    const percent: number = (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / (ONE_HOUR * this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack));
    const progress: number = percent * this.maxWidth;
    this.feedProgressBar.setDisplaySize(progress, 16);
    this.feedProgressText = this.scene.add.text(240, y + 200, this.scene.state.lang.still + ' ' + shortTime(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime, this.scene.state.lang), {
      font: '21px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5).setVisible(false);
  
    const modalBtn: any = {
      btn: this.feedBoostBtn,
      title: this.feedBoostBtnLeftText,
      text1: this.feedBoostBtnRightText,
      img1: this.feedBoostDiamondBtn
    };
  
    this.scene.clickModalBtn(modalBtn, (): void => { this.eventFeedBoostBtnHandler(); });
  }

  private eventFeedBoostBtnHandler(): void {
    const price: number = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice;
    if (this.scene.state.user.diamonds >= price) {
      this.scene.state.user.diamonds -= price;
      this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
        type: 'booster_feed_x2',
        count: price,
      });

      if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime + 7200 > this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack * ONE_HOUR) {

        this.scene.scene.stop('Shop');
        this.scene.scene.stop('ShopBars');
        this.scene.scene.stop('Modal');
        let modal: Imodal = {
          type: 1,
          sysType: 3,
          height: 150,
          message: this.scene.state.lang.feedBoostMax
        }
        
        this.scene.state.modal = modal;
        this.scene.scene.launch('Modal', this.scene.state);
        
      } else {
        
        this.scene.state.boughtFeedBoost = true;
        
        if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime <= 0) {
          this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += ONE_HOUR; // прибавить час

          this.scene.state.amplitude.logAmplitudeEvent('booster_feed_x2', {
            price: price,
            time: 1,
          });

        } else {
          
          let time: number = Math.ceil(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / ONE_HOUR / 2) + 1;
          this.scene.state.amplitude.logAmplitudeEvent('booster_feed_x2', {
            price: price,
            time: time,
          });
          this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += 7200; // прибавить 2часа
        }
      }
    } else {
      // вызывем конвертор
      this.scene.state.convertor = {
        fun: 0,
        count: price,
        diamonds: price,
        type: 1
      }

      this.scene.game.scene.keys[this.scene.state.farm].exchange();
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.scene.stop();
      this.scene.scene.stop('ShopBars');
      this.scene.scene.stop('Modal');
    }
  }

  private updateHerdBoostBtn(): void {
    if (this.checkHerdBoost()) {
      let xBtn: number =  330;
      let yBtn: number = 500 + this.scene.height;
      
      if (this.herdBoostTimerText?.active) this.herdBoostTimerText?.setText(this.scene.state.lang.stillForBoost + ' ' + shortTime(this.scene.state.timeToNewDay, this.scene.state.lang));
      if (this.scene.state.timeToNewDay <= 0 && this.herdBoostBtn?.active && this.herdBoostBtnUpdated) this.herdBoostBtnUpdated = false;
      
      if (this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost <= 0 && this.herdBoostBtn?.active && !this.herdBoostBtnUpdated) {
        this.herdBoostBtnUpdated = true;
        this.herdBoostBtnLeftText?.setText(this.scene.state.lang.free).setY(yBtn - 27).setX(xBtn).setOrigin(0.5); 
        this.herdBoostBtnRightText?.setVisible(false);
        this.herdBoostDiamondBtn?.setVisible(false);
        this.herdBoostBtn?.setY(yBtn - 23);
        this.herdBoostTimerText?.setVisible(false);
        
        if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].herd > 0) {
          this.herdBoostNotification?.setX(this.herdBoostBtn?.getBounds().right - 20);
          this.herdBoostNotification?.setY(this.herdBoostBtn?.getBounds().top - 3);
          this.herdBoostNotificationBg?.setPosition(this.herdBoostNotification?.x, this.herdBoostNotification?.y);
        }
      }
        if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].herd > 0 && 
        this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost > 0 && 
        this.herdBoostBtn?.active && !this.herdBoostBtnUpdated) {

        this.herdBoostBtnUpdated = true;
        this.herdBoostBtnLeftText?.setText(this.scene.state.lang.pickUp).setX(xBtn).setOrigin(0.5);
        this.herdBoostBtnRightText?.setVisible(false);
        this.herdBoostDiamondBtn?.setVisible(false);
        this.herdBoostNotification?.setY(this.herdBoostNotification.y + 25);
        
        const textGeom: Phaser.Geom.Rectangle = this.herdBoostNotification?.getBounds();
        const width: number = textGeom.width + 30 < 60 ? 60 : textGeom.width + 30;
        this.herdBoostNotificationBg?.setPosition(textGeom.centerX, textGeom.centerY).setDisplaySize(width, textGeom.height + 20);
      }
    }
  }

  private updateFeedBoostBtn(): void {
    if (this.checkFeedBoost()) {
      if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed > 0) {
        if (this.feedBoostNotification?.active) this.feedBoostNotification?.setText(this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed).setVisible(true);
        if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setText(this.scene.state.lang.pickUp);
        this.feedBoostNotificationBg?.setVisible(true);
        const textGeom: Phaser.Geom.Rectangle = this.feedBoostNotification?.getBounds();
        const width: number = textGeom?.width + 30 < 60 ? 60 : textGeom?.width + 30;
  
        this.feedBoostNotificationBg?.setDisplaySize(width, textGeom?.height + 20);
        this.feedBoostBtnRightText?.setVisible(false);
        this.feedBoostDiamondBtn?.setVisible(false);
        this.feedBoostBtnLeftText?.setX(this.feedBoostBtn.x - this.feedBoostBtnLeftText?.width / 2);
      } else {        
        if (this.feedBoostNotification?.active) this.feedBoostNotification?.setVisible(false);
        this.feedBoostNotificationBg?.setVisible(false);
        this.feedBoostBtnRightText?.setVisible(true);
        this.feedBoostDiamondBtn?.setVisible(true);
      }
      if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime > 0) {
        const percent: number = this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / (ONE_HOUR * this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack);
        const progress: number =  percent * this.maxWidth;
        this.feedProgressBar?.setDisplaySize(progress, 16);
        if (this.feedProgressText?.active) this.feedProgressText?.setText(this.scene.state.lang.still + ' ' + shortTime(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime, this.scene.state.lang)).setVisible(true);
        this.feedProgressBar?.setVisible(true);
        this.feedProgressBarBg?.setVisible(true);
        
        if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed <= 0) {
          if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setText('+2 ' + this.scene.state.lang.hours);
          const width: number = (this.feedBoostBtnLeftText.displayWidth + this.feedBoostDiamondBtn.displayWidth + this.feedBoostBtnRightText.displayWidth) / 2;
          this.feedBoostBtnLeftText.setX(this.feedBoostBtn.x - width);
          this.feedBoostDiamondBtn.setX(this.feedBoostBtnLeftText.getBounds().right + 2);
          this.feedBoostBtnRightText.setX(this.feedBoostDiamondBtn.getBounds().right + 2);
        }
      } else {
        this.feedProgressBar?.setVisible(false);
        this.feedProgressText?.setVisible(false);
        this.feedProgressBarBg?.setVisible(false);
  
        if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed <= 0) {
          if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setText('+1 ' + this.scene.state.lang.hour);
          const width: number = (this.feedBoostBtnLeftText.displayWidth + this.feedBoostDiamondBtn.displayWidth + this.feedBoostBtnRightText.displayWidth) / 2;
          this.feedBoostBtnLeftText.setX(this.feedBoostBtn.x - width);
          this.feedBoostDiamondBtn.setX(this.feedBoostBtnLeftText.getBounds().right + 2);
          this.feedBoostBtnRightText.setX(this.feedBoostDiamondBtn.getBounds().right + 2);
        }
      }
    } 
  }
  
  private updateEventHerdBoostBtn(): void {
    if (this.checkEventHerdBoost() && !this.herdBoostBtnUpdated) {
      let yBtn: number = 500 + this.scene.height;
      this.herdBoostBtnUpdated = true;
      this.herdBoostBtn?.setY(yBtn - 23);
      this.herdBoostBtnLeftText?.setY(yBtn - 25);
      this.herdBoostDiamondBtn?.setY(yBtn - 25);
      this.herdBoostBtnRightText?.setY(yBtn - 25);
    }
  }

  private updateEventFeedBoostBtn(): void {
    if (this.scene.scene.isActive('Modal') && this.checkEventFeedBoost()) {
      if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime > 0) {
        const percent: number = this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / (ONE_HOUR * this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack);
        const progress: number = percent * this.maxWidth;
        this.feedProgressBar?.setDisplaySize(progress, 16);
        if (this.feedProgressText?.active) this.feedProgressText.setText(this.scene.state.lang.still + ' ' + shortTime(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime, this.scene.state.lang)).setVisible(true)
        this.feedProgressBar?.setVisible(true);
        this.feedProgressBarBg?.setVisible(true);
        if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setText('+2 ' + this.scene.state.lang.hours);
        const width: number = (this.feedBoostBtnLeftText.displayWidth + this.feedBoostDiamondBtn.displayWidth + this.feedBoostBtnRightText.displayWidth) / 2;
        this.feedBoostBtnLeftText.setX(this.feedBoostBtn.x - width);
        this.feedBoostDiamondBtn.setX(this.feedBoostBtnLeftText.getBounds().right + 2);
        this.feedBoostBtnRightText.setX(this.feedBoostDiamondBtn.getBounds().right + 2);
        
      } else {
        if (this.feedProgressBar?.active) this.feedProgressBar?.setVisible(false);
        if (this.feedProgressText?.active) this.feedProgressText?.setVisible(false);
        if (this.feedProgressBarBg?.active) this.feedProgressBarBg?.setVisible(false);
        if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setText('+1 ' + this.scene.state.lang.hour);
        const width: number = (this.feedBoostBtnLeftText.displayWidth + this.feedBoostDiamondBtn.displayWidth + this.feedBoostBtnRightText.displayWidth) / 2;
        this.feedBoostBtnLeftText.setX(this.feedBoostBtn.x - width);
        this.feedBoostDiamondBtn.setX(this.feedBoostBtnLeftText.getBounds().right + 2);
        this.feedBoostBtnRightText.setX(this.feedBoostDiamondBtn.getBounds().right + 2);
      }
    }
  }

  private updateCollectorTime(): void {
    const time = this.scene.state.lang.still + ' ' + shortTime(this.scene.state[`user${this.scene.state.farm}`].collector, this.scene.state.lang);
    if (this.scene.state[`user${this.scene.state.farm}`].collector === 0 && this.scene.state.modal?.shopType === 4) {
      this.collectorIsOn = false;
      this.collectorTimer.setVisible(false);
      this.createFreeCollectorBtns();
      if (this.improve) {
        this.improve.y -= 15;
        this.improveText.y -= 15;
      }
    } else if (this.collectorTimer?.text !== time) this.collectorTimer.setText(time);
  }
  
  private checkFeedBoost(): boolean {
    return this.scene.state.modal.shopType === 4 && 
    this.scene.state[`user${this.scene.state.farm}`].part >= this.scene.game.scene.keys[this.scene.state.farm].feedBoostLvl &&
    (this.scene.state.user.additionalTutorial.feedBoost || this.scene.state.farm !== 'Sheep');
  }

  private checkHerdBoost(): boolean {
    return this.scene.state.modal.shopType === 4 && 
    this.scene.state[`user${this.scene.state.farm}`].part >= this.scene.game.scene.keys[this.scene.state.farm].herdBoostLvl &&
    (this.scene.state.user.additionalTutorial.herdBoost || this.scene.state.farm !== 'Sheep');
  }

  private checkEventHerdBoost(): boolean {
    return this.scene.state.modal.shopType === 4 && 
    this.scene.state[`user${this.scene.state.farm}`].points >= this.scene.game.scene.keys[this.scene.state.farm].herdBoostLvl;
  }

  private checkEventFeedBoost(): boolean {
    return this.scene.state.modal.shopType === 4 && 
    this.scene.state[`user${this.scene.state.farm}`].points >= this.scene.game.scene.keys[this.scene.state.farm].feedBoostLvl;
  }
}
