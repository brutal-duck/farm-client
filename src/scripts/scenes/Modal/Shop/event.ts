import { Arrows } from '../../../elements';
import { shortNum, shortTime } from '../../../general/basic';

// монеты
function animalMoney(): void {
  
  let diamonds: number[] = [1, 10, 50, 100, 500, 1000];
  let rows: number = Math.ceil(diamonds.length / 2);
  let height: number = rows * 270 + 40;
  this.scrolling.bottom = this.height - this.heightWindow + height;

  for (let i: number = 0; i < rows; i++) {

    let y: number = i * 270 + 40;
    let left: number = diamonds[i * 2];
    let right: number = diamonds[i * 2 + 1];

    let pack: Phaser.GameObjects.Sprite = this.add.sprite(0, y + this.height, 'animal-money-package').setOrigin(0, 0);
    this.click(pack, (): void => {

      this.state.convertor = {
        fun: 0,
        count: left,
        diamonds: left,
        type: 1
      }
      this.game.scene.keys[this.state.farm].exchange();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');

    });
    
    let count: string = String(shortNum(this.game.scene.keys[this.state.farm].convertDiamonds(left)));

    this.add.text(110, y + 160 + this.height, count, {
      font: '40px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    let btn = this.shopButton(110, y + 223 + this.height, left, 'diamond');
    this.clickShopBtn(btn, (): void => {
      
      this.state.convertor = {
        fun: 0,
        count: left,
        diamonds: left,
        type: 1
      }
      this.game.scene.keys[this.state.farm].exchange();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');

    });

    if (right) {

      let pack: Phaser.GameObjects.Sprite = this.add.sprite(240, y + this.height, 'chicken-money-package').setOrigin(0, 0);
      this.click(pack, (): void => {

        this.state.convertor = {
          fun: 0,
          count: right,
          diamonds: right,
          type: 1
        }
        this.game.scene.keys[this.state.farm].exchange();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');

      });

      let count: string = String(shortNum(this.game.scene.keys[this.state.farm].convertDiamonds(right)));

      this.add.text(350, y + 160 + this.height, count, {
        font: '40px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5);

      let btn = this.shopButton(350, y + 223 + this.height, right, 'diamond');
      this.clickShopBtn(btn, (): void => {

        this.state.convertor = {
          fun: 0,
          count: right,
          diamonds: right,
          type: 1
        }
        this.game.scene.keys[this.state.farm].exchange();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');

      });

    }

  }

}


// курицы
function animals(): void {

  let rows: number = this.state.eventSettings.eventSettings.length;
  let height: number = rows * 270 + 40;
  this.scrolling.bottom = this.height - this.heightWindow + height;
  
  for (let i: number = 0; i < rows; i++) {

    let y: number = i * 270 + 40;
    this.add.sprite(0, y + this.height, 'animal-shop-bg').setOrigin(0, 0);

    let animal: IeventPoints = this.state.eventSettings.eventSettings.find((data: IeventPoints) => data.breed === i + 1);

    // иконка
    if (this.state.userEvent.maxLevelAnimal + 1 < animal.breed) {
      this.add.sprite(110, y + this.height + 110, 'disable-animal');
    } else {

      let sprite: Phaser.GameObjects.Sprite = this.add.sprite(110, y + this.height + 110, 'animal' + animal.breed);
      sprite.anims.play('chicken-drag' + animal.breed, true);

    }

    // описание
    let center: number = y + 110 + this.height;
    
    let animalName: string = this.state.lang['chickenBreed' + animal.breed];
    let name: Phaser.GameObjects.Text = this.add.text(240, center, animalName, {
      font: '28px Shadow',
      fill: '#FFFFFF',
      align: 'left',
      wordWrap: { width: 230 }
    }).setOrigin(0, 0.5);
    let boundsName = name.getBounds();

    let resourcePriceText: string = this.state.lang.eggPrice;
    let resource: Phaser.GameObjects.Text = this.add.text(240, center, resourcePriceText, {
      font: '20px Shadow',
      fill: '#FFFFFF'
    }).setOrigin(0, 0.5);
    let boundsResource = resource.getBounds();

    let resourcePrice: Phaser.GameObjects.Text = this.add.text(boundsResource.right, center, String(shortNum(animal.resourcePrice)), {
      font: '20px Shadow',
      fill: '#ECC896'
    }).setOrigin(0, 0.5);

    // кнопка покупки
    let heightBtn: number = 0;
    let btn: any = false;
    if (animal.breed <= this.state.userEvent.maxLevelAnimal || animal.breed === 1) {

      let price: string = String(shortNum(this.animalPrice(animal.breed).price));
      
      btn = this.shopButton(330, center, price, 'chickenCoin');
      this.clickShopBtn(btn, (): void => {

        let result: boolean = this.game.scene.keys[this.state.farm].buyAnimal(animal.breed, true);
        if (result) this.updateAnimalPrices();

      });

      this.buttons.push({
        text: btn.title,
        breed: animal.breed,
        img: btn.img
      });

      heightBtn = btn.btn.height;

    }
    
    let height: number = heightBtn + boundsName.height + boundsResource.height + 20;
    name.y -= height / 2 - (boundsName.height / 2);
    resource.y -= height / 2 - boundsName.height - (boundsResource.height / 2) - 5;
    resourcePrice.y = resource.y;

    if (btn) {
      btn.btn.y += height / 2 - (heightBtn / 2);
      btn.title.y += height / 2 - (heightBtn / 2);
      btn.img.y += height / 2 - (heightBtn / 2);
    }

  }

}

// обновление цен кнопок
function updateAnimalPrices(): void {
  
  for (let i in this.buttons) {

    this.buttons[i].text.setText(String(shortNum(this.animalPrice(this.buttons[i].breed).price)));
    this.buttons[i].img.x = this.buttons[i].text.getBounds().left - 25;

  }

}

// бусты

function eventCollectorBoost(): void {
  // собиратель шерсти
  this.add.sprite(0, 20 + this.height, 'boost-bg').setOrigin(0, 0);
  this.add.text(225, 40 + this.height, this.state.lang.resourceCollector, {
    font: '28px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
  let collectorSprite: Phaser.GameObjects.Sprite = this.add.sprite(40, 65 + this.height, `shop-event-resource-collector`).setOrigin(0, 0);
  let levelBg: Phaser.GameObjects.Sprite = this.add.sprite(10, 55 + this.height, 'level-bg').setOrigin(0, 0);
  
  let level: string = String(this.state.userEvent.collectorLevel);
  if (this.state.userEvent.collectorLevel === this.state.eventCollectorSettings.length) level = 'Max';

  let userLevel: Phaser.GameObjects.Text = this.add.text(52, 90 + this.height, level, {
    font: '26px Bip',
    color: '#F8DF86'
  }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);
  let levelText: Phaser.GameObjects.Text = this.add.text(52, 110 + this.height, this.state.lang.shortLevel, {
    font: '18px Bip',
    color: '#F8DF86'
  }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);

  let freeTime: number = this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userEvent.collectorLevel).time;

  // осталось времени
  if (this.state.userEvent.collector > 0) {

    let time: string = shortTime(this.state[`user${this.state.farm}`].collector, this.state.lang);
    this.collectorTimer = this.add.text(120, 235 + this.height, this.state.lang.still + ' ' + time, {
      font: '20px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

  }

  // бесплатный
  if (this.state.userEvent.collector === 0) {

    if (this.state.userEvent.tutorial === 90) {
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

  let doubleTimePrice: number = Math.floor(doubleTime / 60 * this.state.eventSettings.doubledСollectorPrice);
  
  if (this.state.userEvent.collector === 0) {

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
  if (this.state.eventSettings.unlockCollector4 <= this.state.userEvent.part) {

    let hours4 = this.boostButton(350, 220 + this.height, '4', this.state.lang.shortHours, String(this.state.eventSettings.collectorPrice4), 'diamond');
    this.clickBoostBtn(hours4, (): void => {
      this.game.scene.keys[this.state.farm].buyCollector(3);
    });

  } else {

    this.boostButton(350, 220 + this.height, '4', this.state.lang.shortHours, String(this.state.eventSettings.unlockCollector4), 'lock');
    
  }

  // 12 часа собирателя
  if (this.state.eventSettings.unlockCollector12 <= this.state.userEvent.part) {

    let hours12 = this.boostButton(350, 280 + this.height, '12', this.state.lang.shortHours, String(this.state.eventSettings.collectorPrice12), 'diamond');
    this.clickBoostBtn(hours12, (): void => {
      this.game.scene.keys[this.state.farm].buyCollector(4);
    });

  } else {

    this.boostButton(350, 280 + this.height, '12', this.state.lang.shortHours, String(this.state.eventSettings.unlockCollector12), 'lock');
    
  }

  // кнопка улучшения
  if (this.state.userEvent.collectorLevel < this.state.eventCollectorSettings.length) {
    
    let improve: Phaser.GameObjects.Sprite = this.add.sprite(120, 285 + this.height, 'improve-collector');
    let improveText: Phaser.GameObjects.Text = this.add.text(120, 281 + this.height, this.state.lang.improve, {
      font: '26px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4);

    this.clickShopBtn({ btn: improve, title: improveText }, (): void => {
      this.game.scene.keys[this.state.farm].showImproveCollector();
    });

    if (this.state.userEvent.collector === 0) {
      improve.y -= 15;
      improveText.y -= 15;
    }

  } else {
    
    if (this.state.userEvent.collector > 0) {

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
  
  this.herdBoostTimerText = this.add.text(xBtn, yBtn - 60, this.state.lang.stillForBoost + ' ' + shortTime(this.state.timeToHerdBoost, this.state.lang), {
    font: '20px Shadow',
    color: '#FFFFFF',
    wordWrap: {width: 220},
    align: 'center'
  }).setOrigin(0.5, 0.5);

  this.clickModalBtn({ btn: this.herdBoostBtn, title: this.herdBoostBtnLeftText, text1: this.herdBoostBtnRightText, img1: this.herdBoostDiamondBtn }, (): void => {
    if (this.state.user.diamonds >= this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost) {
      this.state.user.diamonds -= this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost;
      this.game.scene.keys[this.state.farm].startHerdBoost();

      if (this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost > 0) {
        this.game.scene.keys[this.state.farm].tryTask(15, 0, this.state.herdBoostPrice);
        this.state.amplitude.getInstance().logEvent('diamonds_spent', {
          type: 'herd',
          count: this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost,
          farm_id: this.state.farm
        });
      }

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

  this.add.text(330, y + 75, this.state.lang.feedBoostSubtitle, { 
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

function updateHerdBoostBtn(): void {
  if (this.state.modal.shopType === 4 && 
    this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
    this.state.user.additionalTutorial.herdBoost) {
    let xBtn: number =  330;
    let yBtn: number = 500 + this.height;
    this.herdBoostTimerText.setText(this.state.lang.stillForBoost + ' ' + shortTime(this.state.timeToHerdBoost, this.state.lang));
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

export {
  animalMoney,
  animals,
  updateAnimalPrices,
  eventCollectorBoost
}
