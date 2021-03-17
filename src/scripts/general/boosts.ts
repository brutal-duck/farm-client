import { Arrows } from "../elements";
import { shortTime, randomString, shortNum } from "./basic";

// получение животного по бусту
function createBoostAnimal(): void {
  if (this.state.herdBoostAnimals.length === 0) return;
  
  this.state.herdBoostAnimals.forEach(type => {
    this.time.addEvent({ 
      delay: 100, 
      callback: (): void => {
        let x: number = Phaser.Math.Between(270, 690);
        let y: number = Phaser.Math.Between(510, 690);
        let id: string = 'local_' + randomString(18);
        this[`get${this.state.farm}`](id, type, x, y, 0, 500);
        this.firework250(x, y);
      }, 
      callbackScope: this, 
      loop: false 
    });
    this.tryTask(4, type);
  });

  this.state.herdBoostAnimals = [];

}

function updateNativeShop(): void {
  let counter: number = 0;
  for (let i = 0; i < this.state.nativeCounter.length; i++) {
    counter += this.state.nativeCounter[i];
  }
  
  if ((this.scene.isActive('Modal') ||
  this.scene.isActive('Block') ||
  this.scene.isActive('Tutorial')) &&
  this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.visible ||
  counter <= 0) {

    this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.setVisible(false);
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShopCounter.setVisible(false);

  } else if (!this.scene.isActive('Modal') &&
  !this.scene.isActive('Block') &&
  !this.scene.isActive('Tutorial') &&
  !this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.visible &&
  counter > 0 &&
  this.state.user.additionalTutorial.herdBoost) {

    this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.setVisible(true);
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShopCounter.setVisible(true);

  }
}

function updateHerdBoostBtn(): void {
  if (this.state.modal.shopType === 4 && 
    this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
    this.state.user.additionalTutorial.herdBoost) {
    let xBtn: number =  330;
    let yBtn: number = 500 + this.height;
    this.herdBoostTimerText.setText(this.state.lang.stillForBoost + ' ' + shortTime(this.state.timeToNewDay, this.state.lang));
    if (this.state[`user${this.state.farm}`].takenHerdBoost <= 0 && !this.herdBoostBtn.data.values.updated) { 
      this.herdBoostBtn.data.values.updated = true;
      // если не взят буст
      this.herdBoostBtnLeftText.setText(this.state.lang.pickUp); 
      this.herdBoostDiamondBtn.setVisible(false);
      this.herdBoostBtn.setY(yBtn - 23);
      this.herdBoostBtnLeftText.setY(yBtn - 25);
      this.herdBoostBtnLeftText.setX(xBtn);
      this.herdBoostBtnLeftText.setOrigin(0.5, 0.5);
      this.herdBoostBtnRightText.setVisible(false);
      this.herdBoostTimerText.setVisible(false);
    } 
  }
}


// улучшение собирателей
function improveCollector(): void {

  let user: IuserSheep | IuserChicken;
  let collectorSettings: IcollectorSettings[];

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    collectorSettings = this.state.sheepCollectorSettings;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    collectorSettings = this.state.chickenCollectorSettings;

  }

  let nextLevel: IcollectorSettings = collectorSettings.find((data: IcollectorSettings) => data.level === user.collectorLevel + 1);

  
  if (!nextLevel) {
    
    this.scene.stop('Modal');
    this.scene.stop('Shop');
    this.scene.stop('ShopBars');

    let modal: Imodal = {
      type: 1,
      sysType: 3,
      message: this.state.lang.maxLevelCollector,
      height: 150
    }
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);
  }
  
  if (nextLevel.diamonds) {

    if (this.state.user.diamonds >= nextLevel.price) {

      this.tryTask(15, 0, nextLevel.price);
      this.tryTask(21, nextLevel.level);

      this.state.amplitude.getInstance().logEvent('diamonds_spent', {
        type: 'improve_collector',
        count: nextLevel.price,
        farm_id: this.state.farm
      });

      this.state.user.diamonds -= nextLevel.price;
      user.collectorLevel++;
      this.setCollector();

      this.game.scene.keys['Modal'].improveCollectorAnim({x: this.cameras.main.centerX, y: this.cameras.main.centerY + 10});
      
      this.time.addEvent({ delay: 500, callback: (): void => {
        this.game.scene.keys[this.state.farm + 'Bars'].firework250(230, Number(this.game.config.height) - 70);
      }, callbackScope: this, loop: false });

    } else {

      this.state.convertor = {
        fun: 8,
        count: nextLevel.price - this.state.user.diamonds,
        diamonds: nextLevel.price - this.state.user.diamonds,
        type: 2
      }
      let modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    }

  } else {

    if (user.money >= nextLevel.price) {

      this.tryTask(21, nextLevel.level);
      user.money -= nextLevel.price;
      user.collectorLevel++;
      this.setCollector();

      this.game.scene.keys['Modal'].improveCollectorAnim({x: this.cameras.main.centerX, y: this.cameras.main.centerY + 10});

      this.time.addEvent({ delay: 500, callback: (): void => {
        this.game.scene.keys[this.state.farm + 'Bars'].firework250(230, Number(this.game.config.height) - 70);
      }, callbackScope: this, loop: false });

    } else {

      let count: number = nextLevel.price - user.money;
      let diamonds: number = this.convertMoney(count);
      this.state.convertor = {
        fun: 8,
        count: count,
        diamonds: diamonds,
        type: 1
      }
      let modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    }

  }
  
}

function collectorBoost(): void {
  // собиратель шерсти
  let resource: string;
  if (this.state.farm === 'Sheep') resource = 'wool';
  if (this.state.farm === 'Chicken') resource = 'egg';
  this.add.sprite(0, 20 + this.height, 'boost-bg').setOrigin(0, 0);
  this.add.text(225, 40 + this.height, this.state.lang[`${resource}Collector`], {
    font: '28px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
  let collectorSprite: Phaser.GameObjects.Sprite = this.add.sprite(40, 65 + this.height, `shop-${this.state.farm.toLowerCase()}-${resource}-collector`).setOrigin(0, 0);
  let levelBg: Phaser.GameObjects.Sprite = this.add.sprite(10, 55 + this.height, 'level-bg').setOrigin(0, 0);
  
  let level: string = String(this.state[`user${this.state.farm}`].collectorLevel);
  if (this.state[`user${this.state.farm}`].collectorLevel === this.state[`${this.state.farm.toLowerCase()}CollectorSettings`].length) level = 'Max';

  let userLevel: Phaser.GameObjects.Text = this.add.text(52, 90 + this.height, level, {
    font: '26px Bip',
    color: '#F8DF86'
  }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);
  let levelText: Phaser.GameObjects.Text = this.add.text(52, 110 + this.height, this.state.lang.shortLevel, {
    font: '18px Bip',
    color: '#F8DF86'
  }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);

  let freeTime: number = this.state[`${this.state.farm.toLowerCase()}CollectorSettings`].find((data: IcollectorSettings) => data.level === this.state[`user${this.state.farm}`].collectorLevel).time;

  // осталось времени
  if (this.state[`user${this.state.farm}`].collector > 0) {

    let time: string = shortTime(this.state[`user${this.state.farm}`].collector, this.state.lang);
    this.collectorTimer = this.add.text(120, 235 + this.height, this.state.lang.still + ' ' + time, {
      font: '20px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

  }

  // бесплатный
  if (this.state[`user${this.state.farm}`].collector === 0) {

    if (this.state[`user${this.state.farm}`].tutorial === 90) {
      this.arrows = new Arrows(this, { x: 330, y: 100 + this.height }, 100, false, true, false, false, false);
    }

    this.freeCollector = this.boostButton(350, 100 + this.height, String(freeTime), this.state.lang.shortMinutes, this.state.lang.take, 'free');
    this.clickBoostBtn(this.freeCollector, (): void => {
      this.game.scene.keys[this.state.farm].freeCollector(1);
    });

  } else {

    this.freeCollector = this.boostButton(350, 100 + this.height, String(freeTime), this.state.lang.shortMinutes, this.state.lang.take, 'free-lock');

  }

  // удвоенный собиратель
  let doubleTime: number = freeTime * 2;

  let doubleTimePrice: number = Math.floor(doubleTime / 60 * this.state[`${this.state.farm.toLowerCase()}Settings`].doubledСollectorPrice);
  
  // проверки для двойного собирателя разные
  let checkDouble: boolean = true;
  if (this.state.farm === 'Sheep') checkDouble = this.state[`user${this.state.farm}`].collector === 0 && this.state[`user${this.state.farm}`].tutorial >= 100;
  else if (this.state.farm === 'Chicken') checkDouble = this.state[`user${this.state.farm}`].collector === 0; 
  
  if (checkDouble) {

    if (this.state.readyAd) {

      let doubleCollector = this.boostButton(350, 160 + this.height, String(doubleTime), this.state.lang.shortMinutes, '', 'ad');
      this.clickBoostBtn(doubleCollector, (): void => {

        this.game.scene.keys[this.state.farm].watchAd(3);
        this.scene.stop('Shop');
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;

      });

    } else {
      
      let doubleCollector = this.boostButton(350, 160 + this.height, String(doubleTime), this.state.lang.shortMinutes, String(doubleTimePrice), 'ad-diamond');
      this.clickBoostBtn(doubleCollector, (): void => {
        this.game.scene.keys[this.state.farm].freeCollector(2);
      });

    }

  } else {
    
    if (this.state.readyAd) {
      this.boostButton(350, 160 + this.height, String(doubleTime), this.state.lang.shortMinutes, '', 'lock-ad');
    } else {
      this.boostButton(350, 160 + this.height, String(doubleTime), this.state.lang.shortMinutes, String(doubleTimePrice), 'lock-ad-diamond');
    }

  }

  // 4 часа собирателя
  if (this.state[`${this.state.farm.toLowerCase()}Settings`].unlockCollector4 <= this.state[`user${this.state.farm}`].part) {

    let hours4 = this.boostButton(350, 220 + this.height, '4', this.state.lang.shortHours, String(this.state[`${this.state.farm.toLowerCase()}Settings`].collectorPrice4), 'diamond');
    this.clickBoostBtn(hours4, (): void => {
      this.game.scene.keys[this.state.farm].buyCollector(3);
    });

  } else {

    this.boostButton(350, 220 + this.height, '4', this.state.lang.shortHours, String(this.state[`${this.state.farm.toLowerCase()}Settings`].unlockCollector4), 'lock');
    
  }

  // 12 часа собирателя
  if (this.state[`${this.state.farm.toLowerCase()}Settings`].unlockCollector12 <= this.state[`user${this.state.farm}`].part) {

    let hours12 = this.boostButton(350, 280 + this.height, '12', this.state.lang.shortHours, String(this.state[`${this.state.farm.toLowerCase()}Settings`].collectorPrice12), 'diamond');
    this.clickBoostBtn(hours12, (): void => {
      this.game.scene.keys[this.state.farm].buyCollector(4);
    });

  } else {

    this.boostButton(350, 280 + this.height, '12', this.state.lang.shortHours, String(this.state[`${this.state.farm.toLowerCase()}Settings`].unlockCollector12), 'lock');
    
  }
  let check: boolean;
  if (this.state.farm === 'Sheep') check = this.state[`user${this.state.farm}`].collectorLevel < this.state[`${this.state.farm.toLowerCase()}CollectorSettings`].length && this.state[`user${this.state.farm}`].tutorial >= 100;
  if (this.state.farm === 'Chicken') check = this.state[`user${this.state.farm}`].collectorLevel < this.state[`${this.state.farm.toLowerCase()}CollectorSettings`].length; 
  // кнопка улучшения
  if (check) {
    
    let improve: Phaser.GameObjects.Sprite = this.add.sprite(120, 285 + this.height, 'improve-collector');
    let improveText: Phaser.GameObjects.Text = this.add.text(120, 281 + this.height, this.state.lang.improve, {
      font: '26px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4);

    this.clickShopBtn({ btn: improve, title: improveText }, (): void => {
      this.game.scene.keys[this.state.farm].showImproveCollector();
    });

    if (this.state[`user${this.state.farm}`].collector === 0) {
      improve.y -= 15;
      improveText.y -= 15;
    }

  } else {
    
    if (this.state[`user${this.state.farm}`].collector > 0) {

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


function herdBoost(): void {
  let y: number = 335 + this.height;
  this.add.tileSprite(0, y, 466, 235, 'boost-bg').setOrigin(0, 0);
  this.add.text(240, y + 35, this.state.lang[`herdBoostTitle${this.state.farm}`], { 
    font: '28px Shadow',
    color: '#FFFFFF',
    wordWrap: { width: 300 },
    align: 'center'
  }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
  
  this.add.sprite(40, y + 70, `${this.state.farm.toLocaleLowerCase()}-herd-boost-icon`).setOrigin(0, 0);
  this.add.sprite(0, y, 'flags').setOrigin(0, 0).setFlipX(true);
  this.add.sprite(466, y, 'flags').setOrigin(1, 0);
  // кнопка
  let xBtn: number =  330;
  let yBtn: number = y + 170;
  this.herdBoostBtn = this.add.sprite(xBtn, yBtn, 'improve-collector');
  this.herdBoostBtn.setDataEnabled();
  this.herdBoostBtn.data.values.updated = false;

  this.herdBoostDiamondBtn = this.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11);
  
  this.herdBoostBtnLeftText = this.add.text(xBtn, yBtn - 5 , this.state.lang.buy, {
    font: '23px Shadow',
    color: '#FFFFFF'
  }).setOrigin(1, 0.5).setStroke('#3B5367', 4).setDepth(10);

  this.herdBoostBtnRightText = this.add.text(xBtn, yBtn - 5 , String(shortNum(this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost)), {
    font: '23px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0, 0.5).setStroke('#3B5367', 4).setDepth(10);

  
  this.herdBoostDiamondBtn.setX(this.herdBoostBtn.x + this.herdBoostBtnLeftText.width - 25 - this.herdBoostBtnRightText.width);
  this.herdBoostBtnLeftText.setX(this.herdBoostDiamondBtn.getBounds().left - 2);
  this.herdBoostBtnRightText.setX(this.herdBoostDiamondBtn.getBounds().right + 1);
  
  this.herdBoostTimerText = this.add.text(xBtn, yBtn - 60, this.state.lang.stillForBoost + ' ' + shortTime(this.state.timeToNewDay, this.state.lang), {
    font: '20px Shadow',
    color: '#FFFFFF',
    wordWrap: {width: 220},
    align: 'center'
  }).setOrigin(0.5, 0.5);

  this.clickModalBtn({ btn: this.herdBoostBtn, title: this.herdBoostBtnLeftText, text1: this.herdBoostBtnRightText, img1: this.herdBoostDiamondBtn }, (): void => {
    if (this.state.user.diamonds >= this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost) {
      this.game.scene.keys[this.state.farm].startHerdBoost();
      this.state.amplitude.getInstance().logEvent('booster_merge', {
        count: this.state[`user${this.state.farm}`].takenHerdBoost,
        farm_id: this.state.farm
      });
    } else {
      // вызывем конвертор
      this.state.convertor = {
        fun: 0,
        count: this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost,
        diamonds: this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost,
        type: 1
      }
      this.game.scene.keys[this.state.farm].exchange();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');
    }
    // проверка хватает ли денег и лишь потом запуск сцены
  });
}

function feedBoost(): void {
  let y: number = 585 + this.height;
  this.add.tileSprite(0, y, 466, 270, 'boost-bg').setOrigin(0, 0);
  this.add.text(240, y + 20, this.state.lang.feedBoostTitle, { 
    font: '28px Shadow',
    color: '#FFFFFF',
    wordWrap: { width: 300 },
    align: 'center'
  }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);

  this.add.text(330, y + 75, this.state.lang[`feedBoostSubtitle${this.state.farm}`], { 
    font: '18px Shadow',
    color: '#FFFFFF',
    wordWrap: { width: 240 },
    align: 'center'
  }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
  
  this.add.sprite(40, y + 35, `${this.state.farm.toLocaleLowerCase()}-feed-boost-icon`).setOrigin(0, 0);

  let xBtn: number =  330;
  let yBtn: number = y + 135;
  this.feedBoostBtn = this.add.sprite(xBtn, yBtn, 'improve-collector');

  this.feedBoostDiamondBtn = this.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11);
  
  this.feedBoostBtnLeftText = this.add.text(xBtn, yBtn - 5 , '+1 ' + this.state.lang.hour, {
    font: '23px Shadow',
    color: '#FFFFFF'
  }).setOrigin(1, 0.5).setStroke('#3B5367', 4).setDepth(10);

  this.feedBoostBtnRightText = this.add.text(xBtn, yBtn - 5 , String(shortNum(this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice)), {
    font: '23px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0, 0.5).setStroke('#3B5367', 4).setDepth(10);

  
  this.feedBoostDiamondBtn.setX(this.feedBoostBtn.x + this.feedBoostBtnLeftText.width - 25 - this.feedBoostBtnRightText.width);
  this.feedBoostBtnLeftText.setX(this.feedBoostDiamondBtn.getBounds().left - 2);
  this.feedBoostBtnRightText.setX(this.feedBoostDiamondBtn.getBounds().right + 1);

  this.feedProgressBarBg = this.add.sprite(10, y + 230, 'pb-chapter-modal').setOrigin(0, 0.5).setScale(0.92, 1).setVisible(false);
  this.feedProgressBar = this.add.tileSprite(25, y + 230, 0, 16, 'green-progress')
      .setOrigin(0, 0.5).setVisible(false);
  
  this.feedProgressBar.setDataEnabled();
  this.feedProgressBar.data.values.maxWidth = 408; // максимальная ширина бара
 let progress: number = (this.state[`user${this.state.farm}`].feedBoostTime / (3600 * this.game.scene.keys[this.state.farm].feedBoostStack)) * this.feedProgressBar.data.values.maxWidth;
  this.feedProgressBar.setDisplaySize(progress, 16);
  this.feedProgressText = this.add.text(240, y + 200, this.state.lang.still + ' ' + shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang), {
    font: '21px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0.5, 0.5).setVisible(false);



  this.clickModalBtn({ btn: this.feedBoostBtn, title: this.feedBoostBtnLeftText, text1: this.feedBoostBtnRightText, img1: this.feedBoostDiamondBtn }, (): void => {
    
    if (this.state.user.diamonds >= this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice) {

      this.state.user.diamonds -= this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice;

      this.state.amplitude.getInstance().logEvent('diamonds_spent', {
        type: 'booster_feed_x2',
        count: this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice,
        farm_id: this.state.farm
      });

      if (this.state[`user${this.state.farm}`].feedBoostTime + 7200 > this.game.scene.keys[this.state.farm].feedBoostStack * 3600) {

        this.scene.stop('Shop');
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');
        let modal: Imodal = {
          type: 1,
          sysType: 3,
          height: 150,
          message: this.state.lang.feedBoostMax
        }
        
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
        
      } else {
        
        this.state.boughtFeedBoost = true;
        this.game.scene.keys[this.state.farm].tryTask(15, 0, this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice);
        
        if (this.state[`user${this.state.farm}`].feedBoostTime <= 0) {
          this.state[`user${this.state.farm}`].feedBoostTime += 3600; // прибавить час

          this.state.amplitude.getInstance().logEvent('booster_feed_x2', {
            price: this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice,
            time: 1,
            farm_id: this.state.farm
          });

        } else {
          
          let time: number = Math.ceil(this.state[`user${this.state.farm}`].feedBoostTime / 3600 / 2) + 1;
         
          this.state.amplitude.getInstance().logEvent('booster_feed_x2', {
            price: this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice,
            time: time,
            farm_id: this.state.farm
          });

          this.state[`user${this.state.farm}`].feedBoostTime += 7200; // прибавить 2часа
        }
      }
      
    } else {
      // вызывем конвертор
      this.state.convertor = {
        fun: 0,
        count: this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice,
        diamonds: this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice,
        type: 1
      }

      this.game.scene.keys[this.state.farm].exchange();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');
    }
    
  });
}

function updateFeedBoostBtn(): void {
  if (this.state.modal.shopType === 4 && 
    this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].feedBoostLvl &&
    this.state.user.additionalTutorial.feedBoost) {
    if (this.state[`user${this.state.farm}`].feedBoostTime > 0) {
   
      let progress: number = (this.state[`user${this.state.farm}`].feedBoostTime / (3600 * this.game.scene.keys[this.state.farm].feedBoostStack)) * this.feedProgressBar?.data?.values.maxWidth;
      this.feedProgressBar.setDisplaySize(progress, 16);
      this.feedProgressText.setText(this.state.lang.still + ' ' + this.shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang));
      this.feedProgressBar.setVisible(true);
      this.feedProgressText.setVisible(true);
      this.feedProgressBarBg.setVisible(true);
      this.feedBoostBtnLeftText.setText('+2 ' + this.state.lang.hours);
  
      this.feedBoostDiamondBtn.setX(this.feedBoostBtn.x + this.feedBoostBtnLeftText?.width - 30 - this.feedBoostBtnRightText?.width);
      this.feedBoostBtnLeftText.setX(this.feedBoostDiamondBtn.getBounds().left - 2);
      this.feedBoostBtnRightText.setX(this.feedBoostDiamondBtn.getBounds().right + 1);
      
    } else {
      this.feedProgressBar.setVisible(false);
      this.feedProgressText.setVisible(false);
      this.feedProgressBarBg.setVisible(false);
      this.feedBoostBtnLeftText.setText('+1 ' + this.state.lang.hour);
      
      this.feedBoostDiamondBtn.setX(this.feedBoostBtn?.x + this.feedBoostBtnLeftText.width - 25 - this.feedBoostBtnRightText.width);
      this.feedBoostBtnLeftText.setX(this.feedBoostDiamondBtn?.getBounds().left - 2);
      this.feedBoostBtnRightText.setX(this.feedBoostDiamondBtn?.getBounds().right + 1);
   
    }
  }
}

function showFeedTime(): void {
    
    let x: number = this.cameras.main.centerX;
    let y: number = this.cameras.main.centerY - 250;

    
    let text: Phaser.GameObjects.Text = this.add.text(x, y,  this.state.lang.feedBoostNative + shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang), {
        font: '35px Bip',
        fill: '#FFFFFF'
      });
    text.setOrigin(0.5, 0.5)
      .setDepth(y)
      .setDepth(y + 1)
      .setStroke('#000000', 5);

    let textWidth: number = text.width + 50;

    let bar: Phaser.GameObjects.Graphics = this.add.graphics();
    bar.fillStyle(0x000000, 0.6)
      .fillRoundedRect(x - textWidth / 2, y - 35, textWidth, 70, 20)
      .setDepth(y);

    let alpha: number = 1;

    let timer: Phaser.Time.TimerEvent = this.time.addEvent({
        delay: 50,
        loop: true,
        callback: () => {

          if (alpha >= 0) {

            alpha -= 0.015;
            text.setAlpha(alpha);
            bar.setAlpha(alpha);

          } else {

            bar.destroy();
            text.destroy();
            timer.remove();

          }
        },
        callbackScope: this
      })
}

// бесплатный собиратель
function freeCollector(type: number = 1): void {

  let user: IuserSheep | IuserChicken;
  let settings: IcollectorSettings[];
  let doubledСollectorPrice: number;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    settings = this.state.sheepCollectorSettings;
    doubledСollectorPrice = this.state.sheepSettings.doubledСollectorPrice;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    settings = this.state.chickenCollectorSettings;
    doubledСollectorPrice = this.state.chickenSettings.doubledСollectorPrice;

  }

  this.scrolling.wheel = true;
  this.scene.stop('Shop');
  this.scene.stop('ShopBars');
  this.scene.stop('Modal');

  if (user.collector === 0) {

    let minutes: number = settings.find((data: IcollectorSettings) => data.level === user.collectorLevel).time;

    if (type === 1) {

      let collector: number = minutes * 60;
      user.collector += collector;
      user.collectorTakenTime = user.collector;
      this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
      this.tryTask(3, 0, minutes);
  
      if (user.tutorial === 90 && this.state.farm === 'Sheep') {
        this.doneTutor_90();
      }
  
      this.state.amplitude.getInstance().logEvent('collector', {
        type: 'free',
        farm_id: this.state.farm
      });

    } else {
      
      minutes *= 2;
      let doubleTimePrice: number = Math.floor(minutes / 60 * doubledСollectorPrice);

      if (this.state.user.diamonds >= doubleTimePrice) {

        this.state.user.diamonds -= doubleTimePrice;
        user.collector += minutes * 60;
        user.collectorTakenTime = user.collector;
        this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
        this.tryTask(3, 0, minutes);
        this.tryTask(15, 0, doubleTimePrice);
  
        this.state.amplitude.getInstance().logEvent('collector', {
          type: minutes + ' minutes',
          price: 'hard',
          farm_id: this.state.farm
        });
  
        this.state.amplitude.getInstance().logEvent('diamonds_spent', {
          type: 'collector',
          count: doubleTimePrice,
          farm_id: this.state.farm
        });

      } else {

        let count: number = doubleTimePrice - this.state.user.diamonds;
        this.state.convertor = {
          fun: 0,
          count: count,
          diamonds: count,
          type: 2
        }
        let modal: Imodal = {
          type: 1,
          sysType: 4
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);

      }

    }

  }

}


// покупка собирателя
function buyCollector(type: number): void {

  let user: IuserSheep | IuserChicken;
  let settings: IsheepSettings | IchickenSettings;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    settings = this.state.sheepSettings;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    settings = this.state.chickenSettings;

  }

  let hours: number;

  if (type === 3) hours = 4;
  else if (type === 4) hours = 12;

  this.scrolling.wheel = true;
  this.scene.stop('Shop');
  this.scene.stop('ShopBars');
  this.scene.stop('Modal');

  if (settings['unlockCollector' + hours] <= user.part) {
    
    if (this.state.user.diamonds >= settings['collectorPrice' + hours]) {

      this.state.user.diamonds -= settings['collectorPrice' + hours];
      user.collector += hours * 60 * 60;
      user.collectorTakenTime = user.collector;
      this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
      this.tryTask(3, 0, hours * 60);
      this.tryTask(15, 0, settings['collectorPrice' + hours]);

      this.state.amplitude.getInstance().logEvent('collector', {
        type: hours + ' hours',
        price: 'hard',
        farm_id: this.state.farm
      });

      this.state.amplitude.getInstance().logEvent('diamonds_spent', {
        type: 'collector',
        count: settings['collectorPrice' + hours],
        farm_id: this.state.farm
      });

    } else {

      let count: number = settings['collectorPrice' + hours] - this.state.user.diamonds;
      this.state.convertor = {
        fun: 0,
        count: count,
        diamonds: count,
        type: 2
      }
      let modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    }
    
  }
  
}
export {
  showFeedTime,
  createBoostAnimal,
  updateNativeShop,
  updateHerdBoostBtn,
  herdBoost,
  feedBoost,
  collectorBoost,
  updateFeedBoostBtn,
  improveCollector,
  freeCollector,
  buyCollector,
}