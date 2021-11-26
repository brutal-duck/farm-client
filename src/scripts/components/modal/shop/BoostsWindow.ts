import { shortNum, shortTime } from "../../../general/basic";
import Shop from "../../../scenes/Modal/Shop/Main";
import Arrow from "../../animations/Arrow";
import CollectorButton from './../../Buttons/CollectorButton';
import Utils from './../../../libs/Utils';
import BoostButton from './../../Buttons/BoostButton';
import Sheep from './../../../scenes/Sheep/Main';
import Chicken from './../../../scenes/Chicken/Main';
import Cow from './../../../scenes/Cow/Main';
import Unicorn from './../../../scenes/Event/Unicorns/Main';

const ONE_HOUR: number = 3600;
const TWO_HOURS: number = 7200;    

export default class BoostsWindow extends Phaser.GameObjects.Sprite {
  public scene: Shop;
  private farm: string;
  private herdBoostTimerText: Phaser.GameObjects.Text;
  private herdBoostButton: BoostButton;
  private feedBoostButton: BoostButton;
  private herdBoostBtnUpdated: boolean;
  private feedBoostBtnUpdated: boolean;
  private feedProgressBar: Phaser.GameObjects.TileSprite;
  private feedProgressText: Phaser.GameObjects.Text;
  private feedProgressBarBg: Phaser.GameObjects.Sprite;
  private feedBoostNotificator: Phaser.GameObjects.Text;
  private feedBoostNotificatorBg: Phaser.GameObjects.Sprite;
  private herdBoostNotificator: Phaser.GameObjects.Text;
  private herdBoostNotificatorBg: Phaser.GameObjects.Sprite;
  private collectorTimer: Phaser.GameObjects.Text;
  private collectorIsOn: boolean;
  private freeCollector: CollectorButton;
  private doubleCollector: CollectorButton;
  private adBtn: CollectorButton;
  private improve: BoostButton;
  private maxWidth: number;
  private feedAdBtn: Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.TileSprite>;

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
    if (this.scene.state[`user${this.farm}`].collector !== 0) this.collectorIsOn = true;
    else this.collectorIsOn = false;
    this.maxWidth = 408;
  }

  private create(): void {
    switch (this.farm) {
      case 'Sheep':
        if (!Utils.checkTestB(this.scene.state)) this.collectorBoost();
        else this.collectorBoostTestB();
        
        if (this.checkHerdBoost()) this.herdBoost();
        if (this.checkFeedBoost()) this.feedBoost();
        break;
      case 'Chicken':
        if (!Utils.checkTestB(this.scene.state)) this.collectorBoost();
        else this.collectorBoostTestB();

        if (this.checkHerdBoost()) this.herdBoost();
        if (this.checkFeedBoost()) this.feedBoost();
        break;
      case 'Cow':
        if (!Utils.checkTestB(this.scene.state)) this.collectorBoost();
        else this.collectorBoostTestB();

        if (this.checkHerdBoost()) this.herdBoost();
        if (this.checkFeedBoost()) this.feedBoost();
        break;
      case 'Unicorn':
        this.collectorBoost();
        if (this.checkEventHerdBoost()) this.herdBoost();
        if (this.checkEventFeedBoost()) this.feedBoost();
        break;
    }
    this.createTutorialArrow();
  }

  public preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (this.collectorIsOn) this.updateCollectorTime();
    if (this.scene.state.farm !== 'Unicorn' && this.checkHerdBoost()) this.updateHerdBoostBtn();
    else if (this.scene.state.farm === 'Unicorn' && this.checkEventHerdBoost()) this.updateHerdBoostBtn();
    if (this.scene.state.farm !== 'Unicorn' && this.checkFeedBoost()) this.updateFeedBoostBtn();
    else if (this.scene.state.farm === 'Unicorn' && this.checkEventFeedBoost()) this.updateFeedBoostBtn();
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
      const position: Iposition = {
        x: 120, 
        y: 285 + this.scene.height,
      };
      const action: () => void = () => {
        this.scene.game.scene.keys[this.scene.state.farm].showImproveCollector() 
      };
      const settings: IboostButtonSetting = {
        left: this.scene.state.lang.improve
      };
      this.improve = new BoostButton(this.scene, position, action, settings);
      if (this.scene.state[`user${this.scene.state.farm}`].collector === 0) {
        this.improve.y -= 15;
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

  private collectorBoostTestB(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '28px',
      color: '#ffffff',
      stroke: '#8B4A84',
      strokeThickness: 2,
    };
    const timerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#FFFFFF',
    };

    // собиратель шерсти
    let resource: string;
    if (this.scene.state.farm === 'Sheep') resource = 'wool';
    else if (this.scene.state.farm === 'Chicken') resource = 'egg';
    else if (this.scene.state.farm === 'Cow') resource = 'milk';
    else if (this.scene.state.farm === 'Unicorn') resource = 'resource';

    this.scene.add.sprite(0, 20 + this.scene.height, 'boost-bg').setOrigin(0);

    const header: string = this.scene.state.lang[`${resource}Collector`];
    this.scene.add.text(225, 40 + this.scene.height, header, headerTextStyle).setOrigin(0.5);

    const texture = `shop-${this.scene.state.farm.toLowerCase()}-${resource}-collector`;
    const collectorSprite = this.scene.add.sprite(40, 65 + this.scene.height, texture).setOrigin(0);

    if (this.scene.state[`user${this.scene.state.farm}`].collector > 0) {
      const time = shortTime(this.scene.state[`user${this.scene.state.farm}`].collector, this.scene.state.lang);
      const str = this.scene.state.lang.still + ' ' + time;
      this.collectorTimer = this.scene.add.text(120, 235 + this.scene.height, str, timerTextStyle).setOrigin(0.5);
    }
    
    this.createFreeCollectorBtnsTestB();
    this.createHoursCollectorBtn(4);
    this.createHoursCollectorBtn(12);
      
    // кнопка улучшения
    if (this.checkImproveCollectorTestB()) {
      const position: Iposition = {
        x: 120, 
        y: 285 + this.scene.height,
      };
      const action = () => {
        this.scene.game.scene.keys[this.scene.state.farm].showImproveCollector() 
      };
      const settings: IboostButtonSetting = {
        left: this.scene.state.lang.improve
      };
      this.improve = new BoostButton(this.scene, position, action, settings);
      if (this.scene.state[`user${this.scene.state.farm}`].collector === 0) {
        this.improve.y -= 15;
      }
    } else {
      if (this.scene.state[`user${this.scene.state.farm}`].collector > 0) {
        this.collectorTimer.y += 45;
        collectorSprite.y += 25;
      } else {
        collectorSprite.y += 35;
      }
    }
  }

  private createHoursCollectorBtn(hoursCount: number): void {
    const unlockCollector: number = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`unlockCollector${hoursCount}`];
    const price: number = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`collectorPrice${hoursCount}`];
    const farmPart: number = this.scene.state.farm === 'Unicorn' ? this.scene.state.userUnicorn.points : this.scene.state[`user${this.scene.state.farm}`].part;
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
      const boostCount: number = this.scene.state.farm === 'Unicorn' ? 0 : this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()][`collector${hoursCount}`];
      const action: () => void = (): void => {
        this.scene.game.scene.keys[this.farm].buyCollector(hoursCount === 4 ? 3 : 4);
        this.scene.game.scene.keys[this.farm].autosave();
      };
      if (Utils.checkSale(this.scene.state, `${this.farm.toUpperCase()}_COLLECTOR_PRICE`)) {
        settings.sale = String(Math.floor(price / 2));
      }
      if (boostCount > 0) {
        settings.type = 'free-diamond';
        settings.right = this.scene.state.lang.take;
        settings.sale = null;
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

  private checkImproveCollectorTestB(): boolean {
    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.farm}`];
    const maxLevel: number = this.scene.state[`${this.farm.toLowerCase()}`]?.partSettings?.length || this.scene.state[`${this.farm.toLowerCase()}CollectorSettings`].length;
    return farmUser.collectorLevel < maxLevel || farmUser.collectorTimeLevel < maxLevel;
  }

  private createFreeCollectorBtns(): void {
    this.destroyFreeCollectorBtns();
    const farmUser: IuserSheep | IuserChicken | IuserCow | IuserUnicorn = this.scene.state[`user${this.farm}`];
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

  private createFreeCollectorBtnsTestB(): void {
    this.destroyFreeCollectorBtns();
    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.farm}`];
    const collectorSettings: IpartSettings[] = this.scene.state[`${this.farm.toLowerCase()}Settings`].partSettings;
    const collectorLevel: number = farmUser.collectorTimeLevel;

    const freeTime: number = collectorSettings[collectorLevel - 1].collector.time;

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
    const sale = Utils.checkSale(this.scene.state, `${this.farm.toUpperCase()}_COLLECTOR_PRICE`)

    let action: () => void = null;

    if (this.checkDouble()) {
      if (this.scene.state.readyAd) {
        action = (): void => {
          this.scene.game.scene.keys[this.farm].ads.watchAd(3);
          this.scene.scene.stop('Shop');
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');
          this.scene.game.scene.keys[this.farm].scrolling.wheel = true;
        };
      } else {
        action = (): void => {
          this.scene.game.scene.keys[this.farm].freeCollector(2);
          this.scene.game.scene.keys[this.farm].autosave();
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
    const farmUser: IuserSheep | IuserChicken | IuserCow | IuserUnicorn = this.scene.state[`user${this.farm}`];
    if (this.farm === 'Sheep') return farmUser.collector === 0 && farmUser.tutorial >= 100;
    return farmUser.collector === 0;
  }

  private createTutorialArrow(): void {
    const farmUser: IuserSheep | IuserChicken | IuserCow | IuserUnicorn = this.scene.state[`user${this.farm}`];
    if (farmUser.collector === 0) {
      if (this.farm === 'Sheep' && farmUser.tutorial === 90) Arrow.generate(this.scene, 8);
      if (this.scene.state.userUnicorn && this.scene.state.userUnicorn.tutorial === 90) Arrow.generate(this.scene, 8);

    }
  }

  private destroyFreeCollectorBtns(): void {
    this.freeCollector?.destroy();
    this.doubleCollector?.destroy();
    this.adBtn?.destroy();
  }
  
  private herdBoost(): void {
    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.farm}`];
    if (this.farm === 'Unicorn' && this.scene.state.userUnicorn.takenHerdBoost <= 0) this.scene.state.userUnicorn.takenHerdBoost = 1;
    const y: number = 335 + this.scene.height;
    this.scene.add.tileSprite(0, y, 466, 235, 'boost-bg').setOrigin(0, 0);
    this.scene.add.text(240, y + 35, this.scene.state.lang[`herdBoostTitle${this.farm}`], { 
      font: '28px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
    
    const icon = this.scene.add.sprite(25, y + 70, `${this.farm.toLocaleLowerCase()}-herd-boost-icon`).setOrigin(0, 0);

    if (this.scene.state.readyAd && farmUser.herdBoostAd && farmUser.takenHerdBoost > 0) {
      this.createAdBtn(icon, () => { this.scene.game.scene.keys[this.farm].ads.watchAd(8); });
    }

    this.scene.add.sprite(0, y, 'flags').setOrigin(0, 0).setFlipX(true);
    this.scene.add.sprite(466, y, 'flags').setOrigin(1, 0);
    // кнопка
    let xBtn: number =  330;
    let yBtn: number = y + 170;
       
    this.herdBoostTimerText = this.scene.add.text(xBtn, yBtn - 60, this.scene.state.lang.stillForBoost + ' ' + shortTime(this.scene.state.timeToNewDay, this.scene.state.lang), {
      font: '20px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 220 },
      align: 'center'
    }).setOrigin(0.5);

    this.createHerdBoostBtn();
  }

  private createAdBtn(icon: Phaser.GameObjects.Sprite, action: () => void):  Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.TileSprite>{
    const iconGeom = icon.getBounds();
    const ad = this.scene.add.sprite(iconGeom.right - 10, iconGeom.centerY + 20, 'ad-icon').setDepth(2);
    const bgAd = this.scene.add.sprite(ad.x, ad.y, 'bg-ad').setDepth(1);
    const zone = this.scene.add.tileSprite(ad.x, ad.y, ad.width + 20, ad.height + 20, 'pixel').setOrigin(0.5);

    this.scene.click(zone, action);

    this.scene.tweens.add({
      targets: [bgAd, ad],
      delay: 5000,
      props: {
        scale: { value: 1.25, duration: 250, ease: 'Power2', yoyo: true },
        angle: { value: -5, duration: 250, ease: 'Power2', yoyo: true },
        y: { value: '-=25', duration: 250, ease: 'Power2', yoyo: true },
      },
      loop: -1,
    });
    return [ ad, bgAd, zone ];
  }

  private destroyHerdBoostBtn(): void {
    this.feedBoostButton?.destroy();
    this.herdBoostNotificator?.destroy();
    this.herdBoostNotificatorBg?.destroy();
  }

  private createHerdBoostBtn(): void {
    this.herdBoostBtnUpdated = true;
    const y: number = 335 + this.scene.height;
    const xBtn: number =  330;
    const yBtn: number = y + 170;
    const price: number = this.scene.state.herdBoostPrice * this.scene.state[`user${this.farm}`].takenHerdBoost;
    const halfPrice: number = Math.floor(price / 2);
    const takenBoost: number = this.scene.state[`user${this.farm}`].takenHerdBoost;
    const farmBoosts: IfarmBoosts = this.scene.state.user.boosts[this.farm.toLowerCase()];
    const freeBoost: number =  farmBoosts ? farmBoosts.herd : 0;
    const position: Iposition = {
      x: xBtn, 
      y: yBtn,
    };

    const action: () => void = () => {
      this.herdBoostBtnHandler();
    };

    const settings: IboostButtonSetting = {
      left: this.scene.state.lang.buy,
      right: String(price),
      sale: null,
    };

    if (Utils.checkSale(this.scene.state, `${this.farm.toUpperCase()}_HERD`)) {
      settings.sale = String(halfPrice);
    }

    if (takenBoost <= 0) {
      position.y -= 23;
      settings.left = this.scene.state.lang.free;
      settings.right = null;
      settings.sale = null;
      this.herdBoostTimerText?.setVisible(false);
    }

    if (freeBoost > 0 && takenBoost > 0) {
      settings.left = this.scene.state.lang.take;
      settings.right = null;
      settings.sale = null;
    }

    if (this.farm === 'Unicorn') {
      position.y -= 23;
      this.herdBoostTimerText?.setVisible(false);
    }

    this.herdBoostButton = new BoostButton(this.scene, position, action, settings);

    const { text, bg } = this.createBoostNotificator(this.herdBoostButton, freeBoost);
    this.herdBoostNotificator = text;
    this.herdBoostNotificatorBg = bg;
  }

  private createBoostNotificator(btn: BoostButton, freeBoost: number): { text: Phaser.GameObjects.Text, bg: Phaser.GameObjects.Sprite } {
    if (freeBoost <= 0) return { text: null, bg: null };
    const text = this.scene.add.text(btn.x + 90, btn.y - 30, String(freeBoost), {
      font: '28px Shadow',
      color: '#FFFFFF'
    }).setDepth(2).setOrigin(0.5).setShadow(2, 3, '#724719', 5);

    const bg = this.scene.add.sprite(0, 0, 'boost-counter-bg').setDepth(1);
    const textGeom: Phaser.Geom.Rectangle = text.getBounds();
    const width: number = textGeom.width + 30 < 60 ? 60 : textGeom.width + 30;
    bg.setPosition(textGeom.centerX, textGeom.centerY).setDisplaySize(width, textGeom.height + 20);
    return { text, bg };
  }
  
  private herdBoostBtnHandler(): void {
    const MainScene = this.scene.game.scene.keys[this.farm] as Sheep | Chicken | Cow | Unicorn;
    const price: number = this.scene.state.herdBoostPrice * this.scene.state[`user${this.farm}`].takenHerdBoost;
    const farmBoosts: IfarmBoosts = this.scene.state.user.boosts[this.farm.toLowerCase()];
    const freeBoost: number =  farmBoosts ? farmBoosts.herd : 0;
    if (freeBoost > 0) MainScene.startHerdBoost();
    else {
      if (this.scene.state.user.diamonds >= price) MainScene.startHerdBoost();
      else this.openDiamondConvertor(price);
    }
  }

  private feedBoost(): void {
    const MainScene = this.scene.game.scene.keys[this.farm] as Sheep | Chicken | Cow | Unicorn;
    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.farm}`];

    const y: number = 585 + this.scene.height;
    this.scene.add.tileSprite(0, y, 466, 270, 'boost-bg').setOrigin(0, 0);
    this.scene.add.text(240, y + 20, this.scene.state.lang.feedBoostTitle, { 
      font: '28px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
  
    this.scene.add.text(330, y + 75, this.scene.state.lang[`feedBoostSubtitle${this.farm}`], { 
      font: '18px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 240 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
    
    const icon = this.scene.add.sprite(25, y + 35, `${this.farm.toLocaleLowerCase()}-feed-boost-icon`).setOrigin(0, 0);

    if (
      this.scene.state.readyAd 
      && farmUser.feedBoostAd
      && farmUser.feedBoostTime + TWO_HOURS <= MainScene.feedBoostStack * ONE_HOUR
    ) {
      this.feedAdBtn = this.createAdBtn(icon, () => { 
        this.scene.game.scene.keys[this.farm].ads.watchAd(9);
        this.hideFeedBoostAdBtn();
      });
    }
    
    this.createFeedBoostBtn();
    
    this.feedProgressBarBg = this.scene.add.sprite(10, y + 230, 'pb-chapter-modal').setOrigin(0, 0.5).setScale(0.92, 1);
    this.feedProgressBar = this.scene.add.tileSprite(25, y + 230, 0, 16, 'green-progress').setOrigin(0, 0.5);
    const time: number = farmUser.feedBoostTime;
    const stack: number = this.scene.game.scene.keys[this.farm].feedBoostStack;
    const progress: number = (time / (ONE_HOUR * stack)) * this.maxWidth;
    this.feedProgressBar.setDisplaySize(progress, 16);
    this.feedProgressText = this.scene.add.text(240, y + 200, this.scene.state.lang.still + ' ' + shortTime(time, this.scene.state.lang), {
      font: '21px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);
  }
  
  private destroyFeedBoostBtn(): void {
    this.feedBoostButton?.destroy();
    this.feedBoostNotificator?.destroy();
    this.feedBoostNotificatorBg?.destroy();
  }

  private hideFeedBoostAdBtn(): void {
    this.feedAdBtn.forEach(el => el.destroy());
  }

  private createFeedBoostBtn(): void {
    this.feedBoostBtnUpdated = true;
    const y: number = 585 + this.scene.height;
    const xBtn: number =  330;
    const yBtn: number = y + 135;
    const price: number = this.scene.state[`${this.farm.toLowerCase()}Settings`].feedBoostPrice;
    const halfPrice: number = Math.floor(price / 2);
    const farmBoosts: IfarmBoosts = this.scene.state.user.boosts[this.farm.toLowerCase()];
    const time: number = this.scene.state[`user${this.farm}`].feedBoostTime;
    const freeBoost: number =  farmBoosts ? farmBoosts.feed : 0;
    const position: Iposition = {
      x: xBtn, 
      y: yBtn,
    };

    const action: () => void = () => {
      this.feedBoostBtnHandler();
    };

    const settings: IboostButtonSetting = {
      left: `+2 ${this.scene.state.lang.hours}`,
      right: shortNum(price),
      sale: null,
    };

    if (time <= 0) settings.left = `+1 ${this.scene.state.lang.hour}`;

    if (Utils.checkSale(this.scene.state, `${this.farm.toUpperCase()}_FEED`)) {
      settings.sale = shortNum(halfPrice);
    }

    if (freeBoost > 0) {
      settings.left = this.scene.state.lang.take;
      settings.right = null;
      settings.sale = null;
    }
    
    this.feedBoostButton = new BoostButton(this.scene, position, action, settings);

    const { text, bg } = this.createBoostNotificator(this.feedBoostButton, freeBoost);
    this.feedBoostNotificator = text;
    this.feedBoostNotificatorBg = bg;
  }
  
  private feedBoostBtnHandler(): void {
    const farmUser: IuserSheep | IuserChicken | IuserCow | IuserUnicorn = this.scene.state[`user${this.farm}`];
    const MainScene = this.scene.game.scene.keys[this.farm] as Sheep | Chicken | Cow | Unicorn;
    const farmBoosts: IfarmBoosts = this.scene.state.user.boosts[this.farm.toLowerCase()];
    const freeBoosts: number = farmBoosts ? farmBoosts.feed : 0;
    if (freeBoosts > 0) {
      if (farmUser.feedBoostTime + TWO_HOURS > MainScene.feedBoostStack * ONE_HOUR) {
        this.showMessageMaxFeedBoost();
      } else {
        this.scene.state.user.boosts[this.farm.toLowerCase()].feed -= 1;
        this.scene.state.amplitude.logAmplitudeEvent('feed_boost_spent', {});
        this.scene.state.boughtFeedBoost = true;
        this.addFeedBoostTime();
        this.feedBoostBtnUpdated = false;
        if (farmUser.feedBoostTime + TWO_HOURS > MainScene.feedBoostStack * ONE_HOUR) {
          this.hideFeedBoostAdBtn();
        }
      }
    } else {
      let price: number = this.scene.state[`${this.farm.toLowerCase()}Settings`].feedBoostPrice;
      if (Utils.checkSale(this.scene.state, `${this.farm.toUpperCase()}_FEED`)) {
        price = Math.floor(price / 2);
      }
      if (this.scene.state.user.diamonds >= price) {
        if (farmUser.feedBoostTime + TWO_HOURS > MainScene.feedBoostStack * ONE_HOUR) {
          this.showMessageMaxFeedBoost();
        } else {
          this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
            type: 'booster_feed_x2',
            count: price,
          });
  
          this.scene.state.user.diamonds -= price;
          this.scene.state.boughtFeedBoost = true;
          MainScene.tryTask(15, 0, price);
          this.addFeedBoostTime();
          this.feedBoostBtnUpdated = false;
        }
      } else {
        this.openDiamondConvertor(price);
      }
    }
  }

  private openDiamondConvertor(price: number) {
    const MainScene = this.scene.game.scene.keys[this.farm] as Sheep | Chicken | Cow | Unicorn;
    this.scene.state.convertor = {
      fun: 0,
      count: price,
      diamonds: price,
      type: 1
    };
    MainScene.exchange();
    MainScene.scrolling.wheel = true;
    this.scene.scene.stop();
    this.scene.scene.stop('ShopBars');
    this.scene.scene.stop('Modal');
  }
  
  private addFeedBoostTime(): void {
    const farmUser: IuserSheep | IuserChicken | IuserCow | IuserUnicorn = this.scene.state[`user${this.farm}`];
    const MainScene = this.scene.game.scene.keys[this.farm] as Sheep | Chicken | Cow;
    if (farmUser.feedBoostTime <= 0) {
      farmUser.feedBoostTime += ONE_HOUR; // прибавить час
      MainScene.tryTask(21, 0, 1);
      if (this.farm !== 'Unicorn') MainScene.tryClanTask(9, 0, 1);
    } else {
      farmUser.feedBoostTime += TWO_HOURS; // прибавить 2часа
      MainScene.tryTask(21, 0, 2);
      if (this.farm !== 'Unicorn') MainScene.tryClanTask(9, 0, 2);
    }
  }

  private showMessageMaxFeedBoost(): void {
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
  }

  private updateHerdBoostBtn(): void {
    if (this.herdBoostTimerText?.active) this.herdBoostTimerText?.setText(this.scene.state.lang.stillForBoost + ' ' + shortTime(this.scene.state.timeToNewDay, this.scene.state.lang));
    if (this.scene.state.timeToNewDay <= 0 && this.herdBoostBtnUpdated) this.herdBoostBtnUpdated = false;
    if (!this.herdBoostBtnUpdated) {
      this.destroyHerdBoostBtn();
      this.createHerdBoostBtn();
    }
  }

  private updateFeedBoostBtn(): void {
    const feedBoostTime: number = this.scene.state[`user${this.farm}`].feedBoostTime;
    const feedBoostStack: number = this.scene.game.scene.keys[this.farm].feedBoostStack;
    if (!this.feedBoostBtnUpdated) {
      this.destroyFeedBoostBtn();
      this.createFeedBoostBtn();
    }

    if (feedBoostTime > 0) {
      const percent: number = feedBoostTime / (ONE_HOUR * feedBoostStack);
      const progress: number =  percent * this.maxWidth;
      if (this.feedProgressBar && this.feedProgressBar.active) {
        this.feedProgressBar.setDisplaySize(progress, 16);
        const leftText: string = this.scene.state.lang.still + ' ' + shortTime(feedBoostTime, this.scene.state.lang);
        if (!this.feedProgressBar?.visible) this.feedBoostBtnUpdated = false;
        if (!this.feedProgressBar?.visible) this.feedProgressBar?.setVisible(true);
        if (!this.feedProgressBarBg?.visible) this.feedProgressBarBg?.setVisible(true);
        if (!this.feedProgressText?.visible)this.feedProgressText?.setVisible(true);
        if (this.feedProgressText.text !== leftText) this.feedProgressText.setText(leftText);
      }
    } else {
      if (this.feedProgressBar?.visible) {
        this.feedBoostBtnUpdated = false;
        this.feedProgressBar?.setVisible(false);
        this.feedProgressText?.setVisible(false);
        this.feedProgressBarBg?.setVisible(false);
      }
    }
  }
  
  private updateCollectorTime(): void {
    const time = this.scene.state.lang.still + ' ' + shortTime(this.scene.state[`user${this.farm}`].collector, this.scene.state.lang);
    if (this.scene.state[`user${this.farm}`].collector === 0 && this.scene.state.modal?.shopType === 4) {
      this.collectorIsOn = false;
      this.collectorTimer.setVisible(false);
      if (Utils.checkTestB(this.scene.state)) this.createFreeCollectorBtnsTestB();
      else this.createFreeCollectorBtns();
      if (this.improve) {
        this.improve.y -= 15;
      }
    } else if (this.collectorTimer?.text !== time) this.collectorTimer.setText(time);
  }
  
  private checkFeedBoost(): boolean {
    return this.scene.state.modal.shopType === 4 && 
    this.scene.state[`user${this.farm}`].part >= this.scene.game.scene.keys[this.farm].feedBoostLvl &&
    (this.scene.state.user.additionalTutorial.feedBoost || this.farm !== 'Sheep');
  }

  private checkHerdBoost(): boolean {
    return this.scene.state.modal.shopType === 4 && 
    this.scene.state[`user${this.farm}`].part >= this.scene.game.scene.keys[this.farm].herdBoostLvl &&
    (this.scene.state.user.additionalTutorial.herdBoost || this.farm !== 'Sheep');
  }

  private checkEventHerdBoost(): boolean {
    return this.scene.state.modal.shopType === 4 && 
    this.scene.state[`user${this.farm}`].points >= this.scene.game.scene.keys[this.farm].herdBoostLvl;
  }

  private checkEventFeedBoost(): boolean {
    return this.scene.state.modal.shopType === 4 && 
    this.scene.state[`user${this.farm}`].points >= this.scene.game.scene.keys[this.farm].feedBoostLvl;
  }
}
