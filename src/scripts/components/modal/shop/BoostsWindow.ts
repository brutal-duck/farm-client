import { shortNum, shortTime } from "../../../general/basic";
import Shop from "../../../scenes/Modal/Shop/Main";
import Arrow from "../../animations/Arrow";

export default class BoostsWindow {
  private scene: Shop;

  private herdBoostTimerText: Phaser.GameObjects.Text;
  private herdBoostBtnRightText: Phaser.GameObjects.Text;
  private herdBoostBtnLeftText: Phaser.GameObjects.Text;
  private herdBoostDiamondBtn: Phaser.GameObjects.Sprite;
  private herdBoostBtn: any;
  private feedProgressBar: Phaser.GameObjects.TileSprite;
  private feedProgressText: Phaser.GameObjects.Text;
  private feedProgressBarBg: Phaser.GameObjects.Sprite;
  private feedBoostBtnRightText: Phaser.GameObjects.Text;
  private feedBoostBtnLeftText: Phaser.GameObjects.Text;
  private feedBoostDiamondBtn: Phaser.GameObjects.Sprite;
  private feedBoostBtn: any;
  private feedBoostNative: Phaser.GameObjects.Text;
  private feedBoostNativeBg: Phaser.GameObjects.Sprite;
  private herdBoostNative: Phaser.GameObjects.Text;
  private herdBoostNativeBg: Phaser.GameObjects.Sprite;

  constructor(scene: Shop) {
    this.scene = scene;
    this.create();
  }

  private create(): void {

    this.scene.scrolling.bottom = this.scene.height - this.scene.heightWindow;
    if (this.scene.state.farm === 'Sheep') {
      this.collectorBoost();
      if (this.scene.state[`user${this.scene.state.farm}`].part >= this.scene.game.scene.keys[this.scene.state.farm].herdBoostLvl &&
      this.scene.state.user.additionalTutorial.herdBoost) this.herdBoost();
      if (this.scene.state[`user${this.scene.state.farm}`].part >= this.scene.game.scene.keys[this.scene.state.farm].feedBoostLvl &&
      this.scene.state.user.additionalTutorial.feedBoost) this.feedBoost();
      
    } else if (this.scene.state.farm === 'Chicken') {
      this.collectorBoost();
      if (this.scene.state[`user${this.scene.state.farm}`].part >= this.scene.game.scene.keys[this.scene.state.farm].herdBoostLvl) this.herdBoost(); 
      if (this.scene.state[`user${this.scene.state.farm}`].part >= this.scene.game.scene.keys[this.scene.state.farm].feedBoostLvl) this.feedBoost();

    } else if (this.scene.state.farm === 'Cow') {
      this.collectorBoost();
      if (this.scene.state[`user${this.scene.state.farm}`].part >= this.scene.game.scene.keys[this.scene.state.farm].herdBoostLvl) this.herdBoost(); 
      if (this.scene.state[`user${this.scene.state.farm}`].part >= this.scene.game.scene.keys[this.scene.state.farm].feedBoostLvl) this.feedBoost();

    } else if (this.scene.state.farm === 'Unicorn') {
      this.eventCollectorBoost();
      if (this.scene.state[`user${this.scene.state.farm}`].maxLevelAnimal >= this.scene.game.scene.keys[this.scene.state.farm].herdBoostLvl) this.eventHerdBoost();
      if (this.scene.state[`user${this.scene.state.farm}`].maxLevelAnimal >= this.scene.game.scene.keys[this.scene.state.farm].feedBoostLvl) this.eventFeedBoost();
    }

    this.scene.events.on(Phaser.Scenes.Events.POST_UPDATE, this.update, this);
    
  }

  private collectorBoost(): void {
    // собиратель шерсти
    let resource: string;
    if (this.scene.state.farm === 'Sheep') resource = 'wool';
    if (this.scene.state.farm === 'Chicken') resource = 'egg';
    if (this.scene.state.farm === 'Cow') resource = 'milk';
    this.scene.add.sprite(0, 20 + this.scene.height, 'boost-bg').setOrigin(0, 0);
    this.scene.add.text(225, 40 + this.scene.height, this.scene.state.lang[`${resource}Collector`], { font: '28px Shadow', color: '#FFFFFF' }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
    let collectorSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(40, 65 + this.scene.height, `shop-${this.scene.state.farm.toLowerCase()}-${resource}-collector`).setOrigin(0, 0);
    let levelBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(10, 55 + this.scene.height, 'level-bg').setOrigin(0, 0);
    let level: string = String(this.scene.state[`user${this.scene.state.farm}`].collectorLevel);
    if (this.scene.state[`user${this.scene.state.farm}`].collectorLevel === this.scene.state[`${this.scene.state.farm.toLowerCase()}CollectorSettings`].length) level = 'Max';
  
    let userLevel: Phaser.GameObjects.Text = this.scene.add.text(52, 90 + this.scene.height, level, { font: '26px Bip', color: '#F8DF86' }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);
    let levelText: Phaser.GameObjects.Text = this.scene.add.text(52, 110 + this.scene.height, this.scene.state.lang.shortLevel, { font: '18px Bip', color: '#F8DF86' }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);
    let freeTime: number = this.scene.state[`${this.scene.state.farm.toLowerCase()}CollectorSettings`].find((data: IcollectorSettings) => data.level === this.scene.state[`user${this.scene.state.farm}`].collectorLevel).time;
  
    // осталось времени
    if (this.scene.state[`user${this.scene.state.farm}`].collector > 0) {
  
      let time: string = shortTime(this.scene.state[`user${this.scene.state.farm}`].collector, this.scene.state.lang);
      this.scene.collectorTimer = this.scene.add.text(120, 235 + this.scene.height, this.scene.state.lang.still + ' ' + time, { font: '20px Shadow', color: '#FFFFFF' }).setOrigin(0.5, 0.5);
  
    }
  
    // бесплатный
    if (this.scene.state[`user${this.scene.state.farm}`].collector === 0) {
  
      if (this.scene.state[`user${this.scene.state.farm}`].tutorial === 90) Arrow.generate(this.scene, 8);
  
      this.scene.freeCollector = this.scene.boostButton(350, 100 + this.scene.height, String(freeTime), this.scene.state.lang.shortMinutes, this.scene.state.lang.take, 'free');
      this.scene.clickBoostBtn(this.scene.freeCollector, (): void => {
        this.scene.game.scene.keys[this.scene.state.farm].freeCollector(1);
        this.scene.game.scene.keys[this.scene.state.farm].autosave();
      });
  
    } else this.scene.freeCollector = this.scene.boostButton(350, 100 + this.scene.height, String(freeTime), this.scene.state.lang.shortMinutes, this.scene.state.lang.take, 'free-lock');
  
  
    // удвоенный собиратель
    let doubleTime: number = freeTime * 2;
  
    let doubleTimePrice: number = Math.floor(doubleTime / 60 * this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].doubledСollectorPrice);
    
    // проверки для двойного собирателя разные
    let checkDouble: boolean = true;
    if (this.scene.state.farm === 'Sheep') checkDouble = this.scene.state[`user${this.scene.state.farm}`].collector === 0 && this.scene.state[`user${this.scene.state.farm}`].tutorial >= 100;
    else if (this.scene.state.farm === 'Chicken') checkDouble = this.scene.state[`user${this.scene.state.farm}`].collector === 0; 
    else if (this.scene.state.farm === 'Cow') checkDouble = this.scene.state[`user${this.scene.state.farm}`].collector === 0; 
    
    if (checkDouble) {
  
      if (this.scene.state.readyAd) {
  
        let doubleCollector = this.scene.boostButton(350, 160 + this.scene.height, String(doubleTime), this.scene.state.lang.shortMinutes, '', 'ad');
        this.scene.clickBoostBtn(doubleCollector, (): void => {
  
          this.scene.game.scene.keys[this.scene.state.farm].watchAd(3);
          this.scene.scene.stop('Shop');
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  
        });
  
      } else {
        
        let doubleCollector = this.scene.boostButton(350, 160 + this.scene.height, String(doubleTime), this.scene.state.lang.shortMinutes, String(doubleTimePrice), 'ad-diamond');
        this.scene.clickBoostBtn(doubleCollector, (): void => {
          this.scene.game.scene.keys[this.scene.state.farm].freeCollector(2);
          this.scene.game.scene.keys[this.scene.state.farm].autosave();
        });
  
      }
  
    } else {
      
      if (this.scene.state.readyAd) this.scene.boostButton(350, 160 + this.scene.height, String(doubleTime), this.scene.state.lang.shortMinutes, '', 'lock-ad');
      else this.scene.boostButton(350, 160 + this.scene.height, String(doubleTime), this.scene.state.lang.shortMinutes, String(doubleTimePrice), 'lock-ad-diamond');
  
    }
  
    // 4 часа собирателя
    if (this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].unlockCollector4 <= this.scene.state[`user${this.scene.state.farm}`].part) {
  
      let hours4 = this.scene.boostButton(350, 220 + this.scene.height, '4', this.scene.state.lang.shortHours, String(this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].collectorPrice4), 'diamond');
      if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].collector4 > 0) {
        hours4.icon.setVisible(false);
        hours4.right.setText(this.scene.state.lang.take);
        const buttonGeom: Phaser.Geom.Rectangle =  hours4.btn.getBounds();
        const text: Phaser.GameObjects.Text = this.scene.add.text(buttonGeom.left - 2, buttonGeom.top + 5, this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].collector4, {
          font: '28px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5).setDepth(2).setShadow(2, 3, '#724719', 5);
        const textGeom: Phaser.Geom.Rectangle = text.getBounds();
        const width: number = textGeom.width + 30 < 60 ? 60 : textGeom.width + 30;
        this.scene.add.sprite(text.x, text.y, 'native-bg').setDisplaySize(width, textGeom.height + 25).setDepth(1);
      }
      this.scene.clickBoostBtn(hours4, (): void => {
        this.scene.game.scene.keys[this.scene.state.farm].buyCollector(3);
        this.scene.game.scene.keys[this.scene.state.farm].autosave();
      });
  
    } else this.scene.boostButton(350, 220 + this.scene.height, '4', this.scene.state.lang.shortHours, String(this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].unlockCollector4), 'lock');
      
  
    // 12 часа собирателя
    if (this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].unlockCollector12 <= this.scene.state[`user${this.scene.state.farm}`].part) {
  
      let hours12 = this.scene.boostButton(350, 280 + this.scene.height, '12', this.scene.state.lang.shortHours, String(this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].collectorPrice12), 'diamond');
      if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].collector12 > 0) {
        hours12.icon.setVisible(false);
        hours12.right.setText(this.scene.state.lang.take);
        const buttonGeom: Phaser.Geom.Rectangle =  hours12.btn.getBounds();
        const text: Phaser.GameObjects.Text = this.scene.add.text(buttonGeom.left - 2, buttonGeom.top + 5, this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].collector12, {
          font: '28px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5).setDepth(2).setShadow(2, 3, '#724719', 5);
        const textGeom: Phaser.Geom.Rectangle = text.getBounds();
        const width: number = textGeom.width + 30 < 60 ? 60 : textGeom.width + 30;
        this.scene.add.sprite(text.x, text.y, 'native-bg').setDisplaySize(width, textGeom.height + 25).setDepth(1);
      }
      this.scene.clickBoostBtn(hours12, (): void => {
        this.scene.game.scene.keys[this.scene.state.farm].buyCollector(4);
        this.scene.game.scene.keys[this.scene.state.farm].autosave();
      });
  
    } else this.scene.boostButton(350, 280 + this.scene.height, '12', this.scene.state.lang.shortHours, String(this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].unlockCollector12), 'lock');
      
    let check: boolean;
    if (this.scene.state.farm === 'Sheep') check = this.scene.state[`user${this.scene.state.farm}`].collectorLevel < this.scene.state[`${this.scene.state.farm.toLowerCase()}CollectorSettings`].length && this.scene.state[`user${this.scene.state.farm}`].tutorial >= 100;
    if (this.scene.state.farm === 'Chicken') check = this.scene.state[`user${this.scene.state.farm}`].collectorLevel < this.scene.state[`${this.scene.state.farm.toLowerCase()}CollectorSettings`].length;
    if (this.scene.state.farm === 'Cow') check = this.scene.state[`user${this.scene.state.farm}`].collectorLevel < this.scene.state[`${this.scene.state.farm.toLowerCase()}CollectorSettings`].length;
    // кнопка улучшения
    if (check) {
      
      let improve: Phaser.GameObjects.Sprite = this.scene.add.sprite(120, 285 + this.scene.height, 'improve-collector');
      let improveText: Phaser.GameObjects.Text = this.scene.add.text(120, 281 + this.scene.height, this.scene.state.lang.improve, {
        font: '26px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4);
  
      this.scene.clickShopBtn({ btn: improve, title: improveText }, (): void => { this.scene.game.scene.keys[this.scene.state.farm].showImproveCollector() });
  
      if (this.scene.state[`user${this.scene.state.farm}`].collector === 0) {
        improve.y -= 15;
        improveText.y -= 15;
      }
  
    } else {
      
      if (this.scene.state[`user${this.scene.state.farm}`].collector > 0) {
        this.scene.collectorTimer.y += 45;
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
  

  private eventCollectorBoost(): void {
    // собиратель шерсти
    this.scene.add.sprite(0, 20 + this.scene.height, 'boost-bg').setOrigin(0, 0);
    this.scene.add.text(225, 40 + this.scene.height, this.scene.state.lang.resourceCollector, { font: '28px Shadow', color: '#FFFFFF' }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
    let collectorSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(40, 65 + this.scene.height, `shop-event-resource-collector`).setOrigin(0, 0);
    let levelBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(10, 55 + this.scene.height, 'level-bg').setOrigin(0, 0);
    let level: string = String(this.scene.state.userUnicorn.collectorLevel);
    if (this.scene.state.userUnicorn.collectorLevel === this.scene.state.eventCollectorSettings.length) level = 'Max';
  
    let userLevel: Phaser.GameObjects.Text = this.scene.add.text(52, 90 + this.scene.height, level, { font: '26px Bip', color: '#F8DF86' }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);
    let levelText: Phaser.GameObjects.Text = this.scene.add.text(52, 110 + this.scene.height, this.scene.state.lang.shortLevel, { font: '18px Bip', color: '#F8DF86' }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);
    let freeTime: number = this.scene.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.scene.state.userUnicorn.collectorLevel).time;
  
    // осталось времени
    if (this.scene.state.userUnicorn.collector > 0) {
  
      let time: string = this.scene.shortTime(this.scene.state[`user${this.scene.state.farm}`].collector, this.scene.state.lang);
      this.scene.collectorTimer = this.scene.add.text(120, 235 + this.scene.height, this.scene.state.lang.still + ' ' + time, { font: '20px Shadow', color: '#FFFFFF' }).setOrigin(0.5, 0.5);
  
    }
  
    // бесплатный
    if (this.scene.state.userUnicorn.collector === 0) {
  
      this.scene.freeCollector = this.scene.boostButton(350, 100 + this.scene.height, String(freeTime), this.scene.state.lang.shortMinutes, this.scene.state.lang.take, 'free');
      this.scene.clickBoostBtn(this.scene.freeCollector, (): void => { this.scene.game.scene.keys[this.scene.state.farm].freeCollector(1) });
  
    } else this.scene.freeCollector = this.scene.boostButton(350, 100 + this.scene.height, String(freeTime), this.scene.state.lang.shortMinutes, this.scene.state.lang.take, 'free-lock');
  
    // удвоенный собиратель
    let doubleTime: number = freeTime * 2;
    let doubleTimePrice: number = Math.floor(doubleTime / 60 * this.scene.state.unicornSettings.doubledСollectorPrice);
    
    if (this.scene.state.userUnicorn.collector === 0) {
  
      if (this.scene.state.readyAd) {
  
        let doubleCollector = this.scene.boostButton(350, 160 + this.scene.height, String(doubleTime), this.scene.state.lang.shortMinutes, '', 'ad');
        this.scene.clickBoostBtn(doubleCollector, (): void => {
  
          this.scene.game.scene.keys[this.scene.state.farm].watchAd(3);
          this.scene.scene.stop('Shop');
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  
        });
  
      } else {
        
        let doubleCollector = this.scene.boostButton(350, 160 + this.scene.height, String(doubleTime), this.scene.state.lang.shortMinutes, String(doubleTimePrice), 'ad-diamond');
        this.scene.clickBoostBtn(doubleCollector, (): void => { this.scene.game.scene.keys[this.scene.state.farm].freeCollector(2) });
  
      }
  
    } else {
      
      if (this.scene.state.readyAd) this.scene.boostButton(350, 160 + this.scene.height, String(doubleTime), this.scene.state.lang.shortMinutes, '', 'lock-ad');
      else this.scene.boostButton(350, 160 + this.scene.height, String(doubleTime), this.scene.state.lang.shortMinutes, String(doubleTimePrice), 'lock-ad-diamond');
  
    }
  
    // 4 часа собирателя
    if (this.scene.state.unicornSettings.unlockCollector4 <= this.scene.state.userUnicorn.maxLevelAnimal) {
  
      let hours4 = this.scene.boostButton(350, 220 + this.scene.height, '4', this.scene.state.lang.shortHours, String(this.scene.state.unicornSettings.collectorPrice4), 'diamond');
      this.scene.clickBoostBtn(hours4, (): void => { this.scene.game.scene.keys[this.scene.state.farm].buyCollector(3) });
  
    } else this.scene.boostButton(350, 220 + this.scene.height, '4', this.scene.state.lang.shortHours, String(this.scene.state.unicornSettings.unlockCollector4), 'lock');
  
    // 12 часа собирателя
    if (this.scene.state.unicornSettings.unlockCollector12 <= this.scene.state.userUnicorn.maxLevelAnimal) {
  
      let hours12 = this.scene.boostButton(350, 280 + this.scene.height, '12', this.scene.state.lang.shortHours, String(this.scene.state.unicornSettings.collectorPrice12), 'diamond');
      this.scene.clickBoostBtn(hours12, (): void => {
        this.scene.game.scene.keys[this.scene.state.farm].buyCollector(4);
      });
  
    } else this.scene.boostButton(350, 280 + this.scene.height, '12', this.scene.state.lang.shortHours, String(this.scene.state.unicornSettings.unlockCollector12), 'lock');

    // кнопка улучшения
    if (this.scene.state.userUnicorn.collectorLevel < this.scene.state.eventCollectorSettings.length) {
      
      let improve: Phaser.GameObjects.Sprite = this.scene.add.sprite(120, 285 + this.scene.height, 'improve-collector');
      let improveText: Phaser.GameObjects.Text = this.scene.add.text(120, 281 + this.scene.height, this.scene.state.lang.improve, { font: '26px Shadow', color: '#FFFFFF' }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4);
  
      this.scene.clickShopBtn({ btn: improve, title: improveText }, (): void => { this.scene.game.scene.keys[this.scene.state.farm].showImproveCollector() });
  
      if (this.scene.state.userUnicorn.collector === 0) {
        improve.y -= 15;
        improveText.y -= 15;
      }
  
    } else {
      
      if (this.scene.state.userUnicorn.collector > 0) {
  
        this.scene.collectorTimer.y += 45;
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


  private herdBoost(): void {
    let y: number = 335 + this.scene.height;
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
    this.herdBoostBtn.data.values.updated = false;
    this.herdBoostDiamondBtn = this.scene.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11);
    this.herdBoostBtnLeftText = this.scene.add.text(xBtn, yBtn - 5 , this.scene.state.lang.buy, { font: '23px Shadow', color: '#FFFFFF' }).setOrigin(1, 0.5).setStroke('#3B5367', 4).setDepth(10);
    this.herdBoostBtnRightText = this.scene.add.text(xBtn, yBtn - 5 , String(shortNum(this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost)), {
      font: '23px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0, 0.5).setStroke('#3B5367', 4).setDepth(10);
  
    if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].herd > 0) {
      this.herdBoostNative = this.scene.add.text(xBtn + 90, yBtn - 60, this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].herd, {
        font: '28px Shadow',
        color: '#FFFFFF'
      }).setDepth(2).setOrigin(0.5).setShadow(2, 3, '#724719', 5);
  
      this.herdBoostNativeBg = this.scene.add.sprite(0, 0, 'native-bg').setDepth(1);
      const textGeom: Phaser.Geom.Rectangle = this.herdBoostNative.getBounds();
      const width: number = textGeom.width + 30 < 60 ? 60 : textGeom.width + 30;
      this.herdBoostNativeBg.setPosition(textGeom.centerX, textGeom.centerY).setDisplaySize(width, textGeom.height + 20);
    }
    
    this.herdBoostDiamondBtn.setX(this.herdBoostBtn.x + this.herdBoostBtnLeftText.width - 25 - this.herdBoostBtnRightText.width);
    this.herdBoostBtnLeftText.setX(this.herdBoostDiamondBtn.getBounds().left - 2);
    this.herdBoostBtnRightText.setX(this.herdBoostDiamondBtn.getBounds().right + 1);
    
    this.herdBoostTimerText = this.scene.add.text(xBtn, yBtn - 60, this.scene.state.lang.stillForBoost + ' ' + shortTime(this.scene.state.timeToNewDay, this.scene.state.lang), {
      font: '20px Shadow',
      color: '#FFFFFF',
      wordWrap: {width: 220},
      align: 'center'
    }).setOrigin(0.5, 0.5);
  
    this.scene.clickModalBtn({ btn: this.herdBoostBtn, title: this.herdBoostBtnLeftText, text1: this.herdBoostBtnRightText, img1: this.herdBoostDiamondBtn }, (): void => {
      if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].herd > 0) {
        this.scene.game.scene.keys[this.scene.state.farm].startHerdBoost();
      } else {
        if (this.scene.state.user.diamonds >= this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost) {
          this.scene.game.scene.keys[this.scene.state.farm].startHerdBoost();
        } else {
          // вызывем конвертор
          this.scene.state.convertor = {
            fun: 0,
            count: this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost,
            diamonds: this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost,
            type: 1
          }
          this.scene.game.scene.keys[this.scene.state.farm].exchange();
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
          this.scene.scene.stop();
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');
        }
      }
      // проверка хватает ли денег и лишь потом запуск сцены
    });

  }
  

  private feedBoost(): void {
    const ONE_HOUR: number = 3600;
  
    let y: number = 585 + this.scene.height;
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
    this.feedBoostDiamondBtn = this.scene.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11);
    
    this.feedBoostBtnLeftText = this.scene.add.text(xBtn, yBtn - 5 , '+1 ' + this.scene.state.lang.hour, { font: '23px Shadow', color: '#FFFFFF' }).setOrigin(1, 0.5).setStroke('#3B5367', 4).setDepth(10);
    this.feedBoostBtnRightText = this.scene.add.text(xBtn, yBtn - 5 , String(shortNum(this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice)), { font: '23px Shadow', color: '#FFFFFF' }).setOrigin(0, 0.5).setStroke('#3B5367', 4).setDepth(10);
    this.feedBoostNative = this.scene.add.text(xBtn + 90, yBtn - 40, this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed, { font: '28px Shadow', color: '#FFFFFF' }).setDepth(1).setOrigin(0.5).setVisible(false).setShadow(2, 3, '#724719', 5);
    this.feedBoostNativeBg = this.scene.add.sprite(this.feedBoostNative.x, this.feedBoostNative.y, 'native-bg');
    this.feedBoostDiamondBtn.setX(this.feedBoostBtn.x + this.feedBoostBtnLeftText.width - 25 - this.feedBoostBtnRightText.width);
    this.feedBoostBtnLeftText.setX(this.feedBoostDiamondBtn.getBounds().left - 2);
    this.feedBoostBtnRightText.setX(this.feedBoostDiamondBtn.getBounds().right + 1);
    this.feedProgressBarBg = this.scene.add.sprite(10, y + 230, 'pb-chapter-modal').setOrigin(0, 0.5).setScale(0.92, 1).setVisible(false);
    this.feedProgressBar = this.scene.add.tileSprite(25, y + 230, 0, 16, 'green-progress').setOrigin(0, 0.5).setVisible(false);
    this.feedProgressBar.setDataEnabled();
    this.feedProgressBar.data.values.maxWidth = 408; // максимальная ширина бара
    let progress: number = (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / (ONE_HOUR * this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack)) * this.feedProgressBar.data.values.maxWidth;
    this.feedProgressBar.setDisplaySize(progress, 16);
    this.feedProgressText = this.scene.add.text(240, y + 200, this.scene.state.lang.still + ' ' + shortTime(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime, this.scene.state.lang), {
      font: '21px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setVisible(false);
  
  
  
    this.scene.clickModalBtn({ btn: this.feedBoostBtn, title: this.feedBoostBtnLeftText, text1: this.feedBoostBtnRightText, img1: this.feedBoostDiamondBtn }, (): void => {
      if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed > 0) {
        
        if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime + 2 * ONE_HOUR > this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack * ONE_HOUR) {
          this.scene.scene.stop('Shop');
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');
          const modal: Imodal = {
            type: 1,
            sysType: 3,
            height: 150,
            message: this.scene.state.lang.feedBoostMax
          }
          this.scene.state.modal = modal;
          this.scene.scene.launch('Modal', this.scene.state);
        } else {
          this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed -= 1;
          this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('feed_boost_spent', {});
          this.scene.state.boughtFeedBoost = true;
          if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime <= 0) {
            this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += ONE_HOUR; // прибавить час
            this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('booster_feed_x2', {
              price: 0,
              time: 1,
            });
            this.scene.game.scene.keys[this.scene.state.farm].tryTask(21, 0, 1);
          } else {
            const time: number = Math.ceil(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / ONE_HOUR / 2) + 1;
            this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('booster_feed_x2', {
              price: 0,
              time: time,
            });
            this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += 2 * ONE_HOUR; // прибавить 2часа
            this.scene.game.scene.keys[this.scene.state.farm].tryTask(21, 0, 2);
          }
        }
      } else {
        if (this.scene.state.user.diamonds >= this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice) {
          if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime + 2 * ONE_HOUR > this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack * ONE_HOUR) {
    
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
    
            this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('diamonds_spent', {
              type: 'booster_feed_x2',
              count: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
            });
    
            this.scene.state.user.diamonds -= this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice;
    
            this.scene.state.boughtFeedBoost = true;
            this.scene.game.scene.keys[this.scene.state.farm].tryTask(15, 0, this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice);
            
            if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime <= 0) {
              this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += ONE_HOUR; // прибавить час
    
              this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('booster_feed_x2', {
                price: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
                time: 1,
              });
              this.scene.game.scene.keys[this.scene.state.farm].tryTask(21, 0, 1);
            } else {
              const time: number = Math.ceil(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / ONE_HOUR / 2) + 1;
              this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('booster_feed_x2', {
                price: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
                time: time,
              });
              this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += 2 * ONE_HOUR; // прибавить 2часа
              this.scene.game.scene.keys[this.scene.state.farm].tryTask(21, 0, 2);
            }
          }
        } else {
          // вызывем конвертор
          this.scene.state.convertor = {
            fun: 0,
            count: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
            diamonds: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
            type: 1
          }
          this.scene.game.scene.keys[this.scene.state.farm].exchange();
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
          this.scene.scene.stop();
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');
        }
      }
    });
  }
  

  private eventHerdBoost(): void {
    if (this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost <= 0) this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost = 1;
    
    let y: number = 335 + this.scene.height;
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
    this.herdBoostBtn.data.values.updated = false;
  
    this.herdBoostDiamondBtn = this.scene.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11);
    this.herdBoostBtnLeftText = this.scene.add.text(xBtn, yBtn - 5 , this.scene.state.lang.buy, { font: '23px Shadow', color: '#FFFFFF' }).setOrigin(1, 0.5).setStroke('#3B5367', 4).setDepth(10);
    this.herdBoostBtnRightText = this.scene.add.text(xBtn, yBtn - 5 , String(shortNum(this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost)), {
      font: '23px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0, 0.5).setStroke('#3B5367', 4).setDepth(10);
    
    this.herdBoostDiamondBtn.setX(this.herdBoostBtn.x + this.herdBoostBtnLeftText.width - 25 - this.herdBoostBtnRightText.width);
    this.herdBoostBtnLeftText.setX(this.herdBoostDiamondBtn.getBounds().left - 2);
    this.herdBoostBtnRightText.setX(this.herdBoostDiamondBtn.getBounds().right + 1);
    this.herdBoostTimerText = this.scene.add.text(xBtn, yBtn - 60, this.scene.state.lang.stillForBoost + ' ' + shortTime(this.scene.state.timeToNewDay, this.scene.state.lang), {
      font: '20px Shadow',
      color: '#FFFFFF',
      wordWrap: {width: 220},
      align: 'center'
    }).setOrigin(0.5, 0.5);
  
    this.scene.clickModalBtn({ btn: this.herdBoostBtn, title: this.herdBoostBtnLeftText, text1: this.herdBoostBtnRightText, img1: this.herdBoostDiamondBtn }, (): void => {
      if (this.scene.state.user.diamonds >= this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost) {
        this.scene.state.user.diamonds -= this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost;
        this.scene.game.scene.keys[this.scene.state.farm].startHerdBoost();
      } else {
        // вызывем конвертор
        this.scene.state.convertor = {
          fun: 0,
          count: this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost,
          diamonds: this.scene.state.herdBoostPrice * this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost,
          type: 1
        }
        this.scene.game.scene.keys[this.scene.state.farm].exchange();
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
        this.scene.scene.stop('ShopBars');
        this.scene.scene.stop('Modal');
      }
      // проверка хватает ли денег и лишь потом запуск сцены
    });
  }


  private eventFeedBoost(): void {
    let y: number = 585 + this.scene.height;
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
    this.feedBoostDiamondBtn = this.scene.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11);
    this.feedBoostBtnLeftText = this.scene.add.text(xBtn, yBtn - 5 , '+1 ' + this.scene.state.lang.hour, {
      font: '23px Shadow',
      color: '#FFFFFF'
    }).setOrigin(1, 0.5).setStroke('#3B5367', 4).setDepth(10);
  
    this.feedBoostBtnRightText = this.scene.add.text(xBtn, yBtn - 5 , String(shortNum(this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice)), {
      font: '23px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0, 0.5).setStroke('#3B5367', 4).setDepth(10);
  
    
    this.feedBoostDiamondBtn.setX(this.feedBoostBtn.x + this.feedBoostBtnLeftText.width - 25 - this.feedBoostBtnRightText.width);
    this.feedBoostBtnLeftText.setX(this.feedBoostDiamondBtn.getBounds().left - 2);
    this.feedBoostBtnRightText.setX(this.feedBoostDiamondBtn.getBounds().right + 1);
    this.feedProgressBarBg = this.scene.add.sprite(10, y + 230, 'pb-chapter-modal').setOrigin(0, 0.5).setScale(0.92, 1).setVisible(false);
    this.feedProgressBar = this.scene.add.tileSprite(25, y + 230, 0, 16, 'green-progress').setOrigin(0, 0.5).setVisible(false);
    this.feedProgressBar.setDataEnabled();
    this.feedProgressBar.data.values.maxWidth = 408; // максимальная ширина бара
    let progress: number = (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / (3600 * this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack)) * this.feedProgressBar.data.values.maxWidth;
    this.feedProgressBar.setDisplaySize(progress, 16);
    this.feedProgressText = this.scene.add.text(240, y + 200, this.scene.state.lang.still + ' ' + shortTime(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime, this.scene.state.lang), {
      font: '21px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setVisible(false);
  
  
  
    this.scene.clickModalBtn({ btn: this.feedBoostBtn, title: this.feedBoostBtnLeftText, text1: this.feedBoostBtnRightText, img1: this.feedBoostDiamondBtn }, (): void => {
      
      if (this.scene.state.user.diamonds >= this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice) {
  
        this.scene.state.user.diamonds -= this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice;
        this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('diamonds_spent', {
          type: 'booster_feed_x2',
          count: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
        });
  
        if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime + 7200 > this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack * 3600) {
  
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
            this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += 3600; // прибавить час
  
            this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('booster_feed_x2', {
              price: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
              time: 1,
            });
  
          } else {
            
            let time: number = Math.ceil(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / 3600 / 2) + 1;
            this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('booster_feed_x2', {
              price: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
              time: time,
            });
            this.scene.state[`user${this.scene.state.farm}`].feedBoostTime += 7200; // прибавить 2часа
          }
        }
      } else {
        // вызывем конвертор
        this.scene.state.convertor = {
          fun: 0,
          count: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
          diamonds: this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].feedBoostPrice,
          type: 1
        }
  
        this.scene.game.scene.keys[this.scene.state.farm].exchange();
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
        this.scene.scene.stop('ShopBars');
        this.scene.scene.stop('Modal');
      }
    });
  }


  private updateHerdBoostBtn(): void {
    // if (this.herdBoostTimerText && this.herdBoostBtnLeftText && this.herdBoostDiamondBtn && this.herdBoostTimerText) {

      if (
        this.scene.state.modal.shopType === 4 && 
        this.scene.state[`user${this.scene.state.farm}`].part >= this.scene.game.scene.keys[this.scene.state.farm].herdBoostLvl &&
        (this.scene.state.user.additionalTutorial.herdBoost || this.scene.state.farm !== 'Sheep')
      ) {
        let xBtn: number =  330;
        let yBtn: number = 500 + this.scene.height;
    
        if (this.herdBoostTimerText?.active) this.herdBoostTimerText?.setText(this.scene.state.lang.stillForBoost + ' ' + shortTime(this.scene.state.timeToNewDay, this.scene.state.lang));
        if (this.scene.state.timeToNewDay <= 0 && this.herdBoostBtn?.active && this.herdBoostBtn?.data && this.herdBoostBtn?.data.values.updated) this.herdBoostBtn.data.values.updated = false;
    
        if (this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost <= 0 && this.herdBoostBtn?.active && this.herdBoostBtn.data && !this.herdBoostBtn.data.values.updated) {
          this.herdBoostBtn.data.values.updated = true;
          // если не взят буст
          this.herdBoostBtnLeftText?.setText(this.scene.state.lang.free).setY(yBtn - 25).setX(xBtn).setOrigin(0.5, 0.5); 
          this.herdBoostBtnRightText?.setVisible(false);
          this.herdBoostDiamondBtn?.setVisible(false);
          this.herdBoostBtn?.setY(yBtn - 23);
          this.herdBoostTimerText?.setVisible(false);
          
          if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].herd > 0) {
            this.herdBoostNative?.setX(this.herdBoostBtn?.getBounds().right - 20);
            this.herdBoostNative?.setY(this.herdBoostBtn?.getBounds().top - 3);
            this.herdBoostNativeBg?.setPosition(this.herdBoostNative?.x, this.herdBoostNative?.y);
          } else {
            this.herdBoostNative?.setInteractive(false)
            this.herdBoostNativeBg?.setInteractive(false)
          }
        } 
        if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].herd > 0 && this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost > 0 && this.herdBoostBtn?.active && this.herdBoostBtn.data && !this.herdBoostBtn?.data.values.updated) {
          this.herdBoostBtn.data.values.updated = true;
          this.herdBoostBtnLeftText?.setText(this.scene.state.lang.pickUp).setX(xBtn).setOrigin(0.5, 0.5);
          this.herdBoostBtnRightText?.setVisible(false);
          this.herdBoostDiamondBtn?.setVisible(false);
          this.herdBoostNative?.setY(this.herdBoostNative.y + 25);
    
          const textGeom: Phaser.Geom.Rectangle = this.herdBoostNative?.getBounds();
          const width: number = textGeom.width + 30 < 60 ? 60 : textGeom.width + 30;
          this.herdBoostNativeBg?.setPosition(textGeom.centerX, textGeom.centerY).setDisplaySize(width, textGeom.height + 20);
        }
      }

    // }

  }

  private updateFeedBoostBtn(): void {

    if (
      this.scene.state.modal.shopType === 4 && 
      this.scene.state[`user${this.scene.state.farm}`].part >= this.scene.game.scene.keys[this.scene.state.farm].feedBoostLvl &&
      (this.scene.state.user.additionalTutorial.feedBoost || this.scene.state.farm !== 'Sheep')
    ) {
      if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed > 0) {
        if (this.feedBoostNative?.active) this.feedBoostNative?.setText(this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed).setVisible(true);
        if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setText(this.scene.state.lang.pickUp);
        this.feedBoostNativeBg?.setVisible(true);
        const textGeom: Phaser.Geom.Rectangle = this.feedBoostNative?.getBounds();
        const width: number = textGeom?.width + 30 < 60 ? 60 : textGeom?.width + 30;
  
        this.feedBoostNativeBg?.setDisplaySize(width, textGeom?.height + 20);
        this.feedBoostBtnRightText?.setVisible(false);
        this.feedBoostDiamondBtn?.setVisible(false);
        this.feedBoostBtnLeftText?.setX(this.feedBoostBtn.x + this.feedBoostBtnLeftText?.width / 2);

      } else {        
        if (this.feedBoostNative?.active) this.feedBoostNative?.setVisible(false);
        this.feedBoostNativeBg?.setVisible(false);
        this.feedBoostBtnRightText?.setVisible(true);
        this.feedBoostDiamondBtn?.setVisible(true);
      }
      if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime > 0) {
        const progress: number = (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / (3600 * this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack)) * this.feedProgressBar?.data?.values.maxWidth;
        this.feedProgressBar?.setDisplaySize(progress, 16);
        if (this.feedProgressText?.active) this.feedProgressText?.setText(this.scene.state.lang.still + ' ' + shortTime(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime, this.scene.state.lang)).setVisible(true);
        this.feedProgressBar?.setVisible(true);
        this.feedProgressBarBg?.setVisible(true);
        
        if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed <= 0) {
          if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setText('+2 ' + this.scene.state.lang.hours);
          this.feedBoostDiamondBtn?.setX(this.feedBoostBtn.x + this.feedBoostBtnLeftText?.width - 30 - this.feedBoostBtnRightText?.width);
          this.feedBoostBtnLeftText?.setX(this.feedBoostDiamondBtn.getBounds().left - 2);
          this.feedBoostBtnRightText?.setX(this.feedBoostDiamondBtn.getBounds().right + 1); 
        }
      } else {
        this.feedProgressBar?.setVisible(false);
        this.feedProgressText?.setVisible(false);
        this.feedProgressBarBg?.setVisible(false);
  
        if (this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed <= 0) {
          if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setText('+1 ' + this.scene.state.lang.hour);
          this.feedBoostDiamondBtn?.setX(this.feedBoostBtn?.x + this.feedBoostBtnLeftText.width - 25 - this.feedBoostBtnRightText.width);
          this.feedBoostBtnLeftText?.setX(this.feedBoostDiamondBtn?.getBounds().left - 2);
          this.feedBoostBtnRightText?.setX(this.feedBoostDiamondBtn?.getBounds().right + 1);
        }
      }
    } 
  }
  
  private updateEventHerdBoostBtn(): void {
    if (this.scene.state.modal.shopType === 4 && 
      this.scene.state[`user${this.scene.state.farm}`].maxLevelAnimal >= this.scene.game.scene.keys[this.scene.state.farm].herdBoostLvl  &&
      this.scene.state.user.additionalTutorial.herdBoost && this.herdBoostBtn.data && !this.herdBoostBtn.data.values.updated) {
      let xBtn: number =  330;
      let yBtn: number = 500 + this.scene.height;
      this.herdBoostTimerText.setText(this.scene.state.lang.stillForBoost + ' ' + shortTime(this.scene.state.timeToNewDay, this.scene.state.lang));
      //----------- костыль со скрытием текста и центрированием кнопки //
      this.herdBoostBtn.data.values.updated = true;
      this.herdBoostTimerText?.setVisible(false)
      this.herdBoostBtn?.setY(yBtn - 23);
      this.herdBoostBtnLeftText?.setY(yBtn - 25);
      this.herdBoostDiamondBtn?.setY(yBtn - 25);
      this.herdBoostBtnRightText?.setY(yBtn - 25);
      //-------------------------------------------------------------//
      // if (this.scene.state[`user${this.scene.state.farm}`].takenHerdBoost <= 0 && !this.herdBoostBtn.data.values.updated) { 
      //   this.herdBoostBtn.data.values.updated = true;
      //   // если не взят буст
      //   this.herdBoostBtnLeftText.setText(this.scene.state.lang.pickUp); 
      //   this.herdBoostDiamondBtn.setVisible(false);
      //   this.herdBoostBtn.setY(yBtn - 23);
      //   this.herdBoostBtnLeftText.setY(yBtn - 25);
      //   this.herdBoostBtnLeftText.setX(xBtn);
      //   this.herdBoostBtnLeftText.setOrigin(0.5, 0.5);
      //   this.herdBoostBtnRightText.setVisible(false);
      //   this.herdBoostTimerText.setVisible(false);
      // } 
    }
  }

  private updateEventFeedBoostBtn(): void {
    if (
      this.scene.scene.isActive('Modal') &&
      this.scene.state.modal.shopType === 4 && 
      this.scene.state[`user${this.scene.state.farm}`].maxLevelAnimal >= this.scene.game.scene.keys[this.scene.state.farm].feedBoostLvl &&
      this.scene.state.user.additionalTutorial.feedBoost
    ) {
      if (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime > 0) {
    
        let progress: number = (this.scene.state[`user${this.scene.state.farm}`].feedBoostTime / (3600 * this.scene.game.scene.keys[this.scene.state.farm].feedBoostStack)) * this.feedProgressBar?.data?.values.maxWidth;
        this.feedProgressBar?.setDisplaySize(progress, 16);
        if (this.feedProgressText?.active) this.feedProgressText.setText(this.scene.state.lang.still + ' ' + shortTime(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime, this.scene.state.lang)).setVisible(true)
        this.feedProgressBar?.setVisible(true);
        this.feedProgressBarBg?.setVisible(true);
        if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setText('+2 ' + this.scene.state.lang.hours);
    
        this.feedBoostDiamondBtn?.setX(this.feedBoostBtn.x + this.feedBoostBtnLeftText?.width - 30 - this.feedBoostBtnRightText?.width);
        if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setX(this.feedBoostDiamondBtn?.getBounds().left - 2);
        if (this.feedBoostBtnRightText?.active) this.feedBoostBtnRightText?.setX(this.feedBoostDiamondBtn?.getBounds().right + 1);
        
      } else {
        if (this.feedProgressBar?.active) this.feedProgressBar?.setVisible(false);
        if (this.feedProgressText?.active) this.feedProgressText?.setVisible(false);
        if (this.feedProgressBarBg?.active) this.feedProgressBarBg?.setVisible(false);
        if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setText('+1 ' + this.scene.state.lang.hour);
        if (this.feedBoostDiamondBtn?.active) this.feedBoostDiamondBtn?.setX(this.feedBoostBtn?.x + this.feedBoostBtnLeftText.width - 25 - this.feedBoostBtnRightText.width);
        if (this.feedBoostBtnLeftText?.active) this.feedBoostBtnLeftText?.setX(this.feedBoostDiamondBtn?.getBounds().left - 2);
        if (this.feedBoostBtnRightText?.active) this.feedBoostBtnRightText?.setX(this.feedBoostDiamondBtn?.getBounds().right + 1);
      }
    }
  }
  
  
  private update(): void {

    // обновляем время бустера
    this.updateHerdBoostBtn();
    this.updateFeedBoostBtn();

    if (this.scene.state.farm === 'Unicorn') {
      this.updateEventHerdBoostBtn();
      this.updateEventFeedBoostBtn();
    }

  }
  
}