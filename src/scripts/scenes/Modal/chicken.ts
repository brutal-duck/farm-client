import { shortNum, romanize, timer, shortTime } from "../../general/basic";
import Hint from '../../components/animations/Hint';

// ярмарка
function chickenFair(): void {

  let fair: string = this.state.lang.fair.replace('$1', this.state.userChicken.fair);
  this.textHeader.setText(fair);

  let nextFair = this.state.chickenSettings.chickenFairLevels.find((item: IfairLevel) => item.level === this.state.userChicken.fair + 1);

  if (nextFair !== undefined && this.state.userChicken.fair < this.state.chickenSettings.chickenFairLevels.length) {

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 80, this.state.lang.improveChickenFair, {
      font: '26px Shadow',
      fill: '#925C28',
      align: 'center',
      wordWrap: { width: 400 }
    }).setDepth(1).setOrigin(0.5, 0);
    
    let priceM: number | string = shortNum(nextFair.price_m);
    let priceD: number | string = shortNum(nextFair.price_d);
    let text: string = this.state.lang.improveFair.replace('$1', this.state.userChicken.fair + 1);

    if (this.state.userChicken.part >= nextFair.part_unlock) {

      if (nextFair.price_m > 0 && nextFair.price_d > 0) {

        let right1 = {
          icon: 'chickenCoin',
          text: priceM
        }
        let right2 = {
          icon: 'diamond',
          text: priceD
        }
        let button = this.bigButton('green', 'left', 90, text, right1, right2);
        this.clickModalBtn(button, (): void => {
          this.scene.stop();
          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.game.scene.keys[this.state.farm].fairLevelUp();
        });

      } else {
        
        let right = {
          icon: 'chickenCoin',
          text: priceM
        }
        let button = this.bigButton('green', 'left', 90, text, right);
        this.clickModalBtn(button, (): void => {
          this.scene.stop();
          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.game.scene.keys[this.state.farm].fairLevelUp();
        });
        
      }
      
    } else {

      let right = {
        icon: 'lock',
        text: this.state.lang.shortPart + ' ' + nextFair.part_unlock
      }
      this.bigButton('grey', 'left', 90, text, right);

    }

    this.resizeWindow(220);

  } else {

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 20, this.state.lang.maxFairLevel, {
      font: '26px Shadow',
      fill: '#925C28',
      align: 'center',
      wordWrap: {
        width: 400
      }
    }).setDepth(1).setOrigin(0.5, 0);
    this.resizeWindow(170);

  }

}


// окно курицы
function chicken(): void {

  this.textHeader.setText(this.state.lang.chicken);

  if (this.state.animal.type !== 0) {

    let icon: string = 'chicken' + this.state.animal.type;
    let sprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 145, icon);
    sprite.anims.play('chicken-drag' + this.state.animal.type, true);

    let breed: string = this.state.lang['chickenBreed' + this.state.animal.type];
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 35, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 35, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY + 35, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    let points: IchickenPoints = this.state.chickenSettings.chickenSettings.find((item: IchickenPoints) => item.breed === this.state.animal.type);
    
    let eggSpeed: number = Math.round(1000 / points.egg);

    this.add.text(132, this.cameras.main.centerY + 90, this.state.lang.eggSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.add.text(588, this.cameras.main.centerY + 90, eggSpeed + ' ' + this.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    this.add.text(132, this.cameras.main.centerY + 135, this.state.lang.eggPrice, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    let price: Phaser.GameObjects.Text = this.add.text(588, this.cameras.main.centerY + 135, String(points.eggPrice), {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    let priceWidth: number = price.getBounds().left - 25;
    this.add.sprite(priceWidth, this.cameras.main.centerY + 135, 'chickenCoin').setScale(0.15);

    let sellPrice = {
      icon: 'chickenCoin',
      text: shortNum(Math.round(this.game.scene.keys[this.state.farm].chickenPrice(1).price / 2))
    }
    let button = this.bigButton('red', 'left', 220, this.state.lang.expel, sellPrice);
    this.clickModalBtn(button, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExpelChicken();
    });

    this.resizeWindow(460);

  } else {

    let icon: string = 'chicken' + this.state.animal.type;
    let sprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 85, icon);
    sprite.anims.play('chicken-drag0', true);

    let breed: string = this.state.lang['chickenBreed' + this.state.animal.type];
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 25, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 95, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY + 95, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    let points: IchickenPoints = this.state.chickenSettings.chickenSettings.find((item: IchickenPoints) => item.breed === 1);
    
    let eggSpeed: number = Math.round(1000 / points.egg);

    this.add.text(132, this.cameras.main.centerY + 150, this.state.lang.diamondSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.add.text(588, this.cameras.main.centerY + 150, eggSpeed + ' ' + this.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    this.resizeWindow(350);
    
  }

}


// окно пастбища
function chickenPasture(): void {

  let pasture: string = this.state.lang.pasture.replace('$1', this.state.territory.improve);
  this.textHeader.setText(pasture);

  let part: Ipart = this.state.chickenSettings.chickenParts.find((data: Ipart) => data.sort === this.state.userChicken.part);

  let exchange = {
    icon: 'chickenCoin',
    text: shortNum(part.improve_territory_2)
  }

  if (this.state.territory.improve < this.state.chickenSettings.territoriesChickenSettings.length) {

    let price: number;

    let lock: number = this.state.chickenSettings.territoriesChickenSettings.find((data: IterritoriesChickenSettings) => data.improve === this.state.territory.improve + 1).unlock_improve;
    
    if (this.state.userChicken.part >= lock) {

      if (this.state.territory.improve === 1) {
        price = part.improve_territory_2;
      } else if (this.state.territory.improve === 2) {
        price = part.improve_territory_3;
      } else {
        price = part.improve_territory_4;
      }

      let improve = {
        icon: 'chickenCoin',
        text: shortNum(price)
      }

      let improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);

      let button = this.bigButton('green', 'left', -60, improveText, improve);
      this.clickModalBtn(button, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].improveTerritory();
      });

    } else {
      
      let improve = {
        icon: 'lock',
        text: this.state.lang.shortPart + ' ' + lock
      }

      let improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);

      this.bigButton('grey', 'left', -60, improveText, improve);

    }
    
    let button1 = this.bigButton('blue', 'left', 30, this.state.lang.exchangeWater, exchange);
    this.clickModalBtn(button1, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(3);
    });

    let button2 = this.bigButton('orange', 'left', 120, this.state.lang.exchangeRepository, exchange);
    this.clickModalBtn(button2, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(5);
    });

    this.resizeWindow(270);

  } else {

    let button1 = this.bigButton('blue', 'left', -15, this.state.lang.exchangeWater, exchange);
    this.clickModalBtn(button1, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(3);
    });

    let button2 = this.bigButton('orange', 'left', 75, this.state.lang.exchangeRepository, exchange);
    this.clickModalBtn(button2, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(5);
    });

    this.resizeWindow(200);

  }

}


// окно поилки
function chickenWater(): void {

  let water: string = this.state.lang.water.replace('$1', this.state.territory.improve);
  this.textHeader.setText(water);

  let part: Ipart = this.state.chickenSettings.chickenParts.find((data: Ipart) => data.sort === this.state.userChicken.part);

  let exchange = {
    icon: 'chickenCoin',
    text: shortNum(part.improve_territory_2)
  }

  if (this.state.territory.improve < this.state.chickenSettings.territoriesChickenSettings.length) {

    let price: number;

    let lock: number = this.state.chickenSettings.territoriesChickenSettings.find((data: IterritoriesChickenSettings) => data.improve === this.state.territory.improve + 1).unlock_improve;
    
    if (this.state.userChicken.part >= lock) {

      if (this.state.territory.improve === 1) {
        price = part.improve_territory_2;
      } else if (this.state.territory.improve === 2) {
        price = part.improve_territory_3;
      } else {
        price = part.improve_territory_4;
      }

      let improve = {
        icon: 'chickenCoin',
        text: shortNum(price)
      }

      let improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);

      let button = this.bigButton('blue', 'left', -60, improveText, improve);
      this.clickModalBtn(button, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].improveTerritory();
      });

    } else {
      
      let improve = {
        icon: 'lock',
        text: this.state.lang.shortPart + ' ' + lock
      }

      let improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);

      this.bigButton('grey', 'left', -60, improveText, improve);

    }

    let button1 = this.bigButton('green', 'left', 30, this.state.lang.exchangeGrass, exchange);
    this.clickModalBtn(button1, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(2);
    });

    let button2 = this.bigButton('orange', 'left', 120, this.state.lang.exchangeRepository, exchange);
    this.clickModalBtn(button2, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(5);
    });

    this.resizeWindow(270);

  } else {

    let button1 = this.bigButton('green', 'left', -15, this.state.lang.exchangeGrass, exchange);
    this.clickModalBtn(button1, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(2);
    });

    let button2 = this.bigButton('orange', 'left', 75, this.state.lang.exchangeRepository, exchange);
    this.clickModalBtn(button2, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(5);
    });

    this.resizeWindow(200);

  }

}


// купленная земля
function boughtChickenLand(): void {
  
  this.textHeader.setText(this.state.lang.boughtLand);

  let price: number = this.state.chickenSettings.territoriesChickenPrice.find((data: IterritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position).price;

  // 30% от суммы покупки
  price = Math.round((price / 100) * 30);

  let right = {
    icon: 'chickenCoin',
    text: shortNum(price)
  }
  
  let button1 = this.bigButton('green', 'left', -60, this.state.lang.sowPasture, right);
  this.clickModalBtn(button1, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.state.exchangeTerritory = 2;
    this.game.scene.keys[this.state.farm].installTerritory();
  });

  let button2 = this.bigButton('blue', 'left', 30, this.state.lang.installWater, right);
  this.clickModalBtn(button2, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.state.exchangeTerritory = 3;
    this.game.scene.keys[this.state.farm].installTerritory();
  });
  
  let button3 = this.bigButton('orange', 'left', 120, this.state.lang.buildRepository, right);
  this.clickModalBtn(button3, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.state.exchangeTerritory = 5;
    this.game.scene.keys[this.state.farm].installTerritory();
  });
  
  this.resizeWindow(270);

}


// земля для покупки
function buyChickenTerritory(): void {
  
  this.textHeader.setText(this.state.lang.buyTerritory);

  let settings: IterritoriesPrice = this.state.chickenSettings.territoriesChickenPrice.find((data: IterritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position);

  if (this.state.userChicken.part >= settings.unlock) {

    // 70% от суммы покупки
    let price = Math.round((settings.price / 100) * 70);

    let right = {
      icon: 'chickenCoin',
      text: shortNum(price)
    }
  
    let button = this.bigButton('yellow', 'left', 20, this.state.lang.buyTerritory, right);
    this.clickModalBtn(button, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].buyTerritory();
    });

  } else {

    let right = {
      icon: 'lock',
      text: this.state.lang.shortPart + ' ' + settings.unlock
    }
  
    this.bigButton('grey', 'left', 20, this.state.lang.buyTerritory, right);

  }
  
  this.resizeWindow(130);

}


// окно конвертора куриной фермы
function chickenConvertor(): void {

  this.textHeader.setText(this.state.lang.exchange);

  if (this.state.convertor.type === 1) {

    this.resizeWindow(300);

    let count: number | string = shortNum(this.state.convertor.count);
    let length: number = String(count).length * 10 + 15;

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 140, this.state.lang.rememberSellEggs, {
      font: '26px Bip',
      color: '#57A90E',
      align: 'center',
      wordWrap: { width: 440 }
    }).setOrigin(0.5, 0);

    let notEnaugh: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - length, this.cameras.main.centerY - 10, this.state.lang.notEnoughForYou, {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    let border = notEnaugh.getBounds();

    this.add.text(border.right + 50, this.cameras.main.centerY - 10, count, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center'
    }).setOrigin(0, 0.5);

    this.add.sprite(border.right + 5, this.cameras.main.centerY - 10, 'chickenCoin')
      .setOrigin(0, 0.5)
      .setScale(0.15);

      
    if (this.state.convertor.diamonds === 1 && this.state.readyAd) {

      let right = {
        icon: 'ad-icon',
        text: ''
      }

      let ad = this.bigButton('green', 'left', 60, this.state.lang.addCoins, right);
      this.clickModalBtn(ad, (): void => {

        this.game.scene.keys[this.state.farm].watchAd(1);
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        
      });

    } else {

      // let right = {
      //   icon: 'diamond',
      //   text: shortNum(this.state.convertor.diamonds)
      // }
    
      // let pay = this.bigButton('green', 'left', 60, this.state.lang.surcharge, right);
      // this.clickModalBtn(pay, (): void => {
      //   this.scene.stop();
      //   this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      //   this.game.scene.keys[this.state.farm].exchange();
      // });

      let btn = this.bigButton('green', 'center', 60, this.state.lang.goExchanger);
      this.clickModalBtn(btn, (): void => {
        let modal: Imodal = {
          type: 2,
          shopType: 2
        }
        this.state.modal = modal;
        this.scene.stop();
        this.scene.start('Modal', this.state);

      });
    }
  
    let cancel = this.bigButton('yellow', 'center', 140, this.state.lang.cancel);
    this.clickModalBtn(cancel, (): void => {
      if (this.state.boughtFeedBoost) {
        this.game.scene.keys[`${this.state.farm}Bars`].hint = Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.feedBoostNative} ${shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang)}`, 2);
        this.state.boughtFeedBoost = false;
      };
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    });

  } else if (this.state.convertor.type === 2) {
    
    this.resizeWindow(280);

    let count: number | string = shortNum(this.state.convertor.count);
    let length: number = String(count).length * 10 + 15;

    let notEnaugh: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - length, this.cameras.main.centerY - 55, this.state.lang.notEnoughForYou, {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    let border = notEnaugh.getBounds();

    this.add.text(border.right + 50, this.cameras.main.centerY - 55, count, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center'
    }).setOrigin(0, 0.5);

    this.add.sprite(border.right + 5, this.cameras.main.centerY - 55, 'diamond')
      .setOrigin(0, 0.5)
      .setScale(0.15);

    let pay = this.bigButton('green', 'center', 40, this.state.lang.buy);
    this.clickModalBtn(pay, (): void => {

      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].showBank();

    });

    let cancel = this.bigButton('yellow', 'center', 120, this.state.lang.cancel);
    this.clickModalBtn(cancel, (): void => {
      if (this.state.boughtFeedBoost) {
        this.game.scene.keys[`${this.state.farm}Bars`].hint = Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.feedBoostNative} ${shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang)}`, 2);
        this.state.boughtFeedBoost = false;
      };
      
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    });

  }

}


// окно подтверждения смены типа территории
function confirmChickenExchangeTerritory(): void {

  this.textHeader.setText(this.state.lang.exchangeTerritory);
  this.resizeWindow(250);

  let repository: string = '';

  if (this.state.territory.type === 5) {
    repository = ' ' + this.state.lang.eggsWillBeSold;
  }

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 60, this.state.lang.sureExchange + repository, {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: { width: 440 }
  }).setOrigin(0.5, 0.5);

  let cancel = this.bigButton('yellow', 'center', 120, this.state.lang.cancel);
  this.clickModalBtn(cancel, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  });

  if (this.state.exchangeTerritory === 2) {

    let confirm = this.bigButton('green', 'center', 40, this.state.lang.exchangeGrass);
    this.clickModalBtn(confirm, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].exchangeTerritory();
    });

  } else if (this.state.exchangeTerritory === 3) {

    let confirm = this.bigButton('blue', 'center', 40, this.state.lang.exchangeWater);
    this.clickModalBtn(confirm, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].exchangeTerritory();
    });

  } else if (this.state.exchangeTerritory === 5) {

    let confirm = this.bigButton('orange', 'center', 40, this.state.lang.exchangeRepository);
    this.clickModalBtn(confirm, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].exchangeTerritory();
    });

  }

}


// хранилище яиц
function chickenEggsRepository(): void {
  
  let repository: string = this.state.lang.repository.replace('$1', this.state.territory.improve);
  this.textHeader.setText(repository);

  let part: Ipart = this.state.chickenSettings.chickenParts.find((data: Ipart) => data.sort === this.state.userChicken.part);

  let exchange = {
    icon: 'chickenCoin',
    text: shortNum(part.improve_territory_2)
  }

  let eggMoney = {
    icon: 'chickenCoin',
    text: shortNum(this.state.territory.money)
  }

  if (this.state.territory.improve < this.state.chickenSettings.territoriesChickenSettings.length) {

    let price: number;
    let lock: number = this.state.chickenSettings.territoriesChickenSettings.find((data: IterritoriesChickenSettings) => data.improve === this.state.territory.improve + 1).unlock_improve;
    
    if (this.state.userChicken.part >= lock) {

      if (this.state.territory.improve === 1) {
        price = part.improve_territory_2;
      } else if (this.state.territory.improve === 2) {
        price = part.improve_territory_3;
      } else {
        price = part.improve_territory_4;
      }

      let improve = {
        icon: 'chickenCoin',
        text: shortNum(price)
      }
      let improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);
      let button = this.bigButton('orange', 'left', 110, improveText, improve);
      this.clickModalBtn(button, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].improveTerritory();
      });

    } else {
      
      let improve = {
        icon: 'lock',
        text: this.state.lang.shortPart + ' ' + lock
      }
      let improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);
      this.bigButton('grey', 'left', 110, improveText, improve);

    }

    this.progressText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 160, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 120, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY - 120, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    this.progressButton = this.repositoryBtn(10, this.state.lang.sellEggs, eggMoney);
    this.clickModalBtn(this.progressButton, (): void => {

      if (this.state.territory.money > 0) {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].sellEggs();
      }

    });

    this.feedBoostText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 80, ' ', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    let button1 = this.bigButton('red', 'center', 200, this.state.lang.exchangeRepositoryBtn);
    this.clickModalBtn(button1, (): void => {
   
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      let modal: Imodal = {
        type: 1,
        sysType: 11
      }
      this.state.modal = modal;
      this.scene.start('Modal', this.state);
    });

    this.resizeWindow(430);

  } else {

    this.progressText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 120, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 70, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY - 70, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    this.progressButton = this.repositoryBtn(60, this.state.lang.sellEggs, eggMoney);
    this.clickModalBtn(this.progressButton, (): void => {

      if (this.state.territory.money > 0) {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].sellEggs();
      }

    });
    
    if (this.state.userChicken.feedBoostTime > 0) {
      this.feedBoostText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 30, ' ', {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5).setVisible(false);
    }

    let button1 = this.bigButton('red', 'center', 170, this.state.lang.exchangeRepositoryBtn);
    this.clickModalBtn(button1, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      let modal: Imodal = {
        type: 1,
        sysType: 11
      }
      this.state.modal = modal;
      this.scene.start('Modal', this.state);
    });

    this.resizeWindow(330);

  }

}

function chickenEggRepositoryExchange(): void {
  let repository: string = this.state.lang.repository.replace('$1', this.state.territory.improve);
  this.textHeader.setText(repository);

  let part: Ipart = this.state.chickenSettings.chickenParts.find((data: Ipart) => data.sort === this.state.userChicken.part);

  let exchange = {
    icon: 'chickenCoin',
    text: shortNum(part.improve_territory_2)
  }
  let textTitle: string = this.state.lang.exchangeRepositoryTitle.replace('1$', this.state.territory.improve);

  let title: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, textTitle, {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: {width: 450},
  });
  title.setOrigin(0.5, 0.5);
  let button1 = this.bigButton('green', 'left', 0, this.state.lang.exchangeGrass, exchange);
  this.clickModalBtn(button1, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].confirmExchangeTerritory(2);
  });

  let button2 = this.bigButton('blue', 'left', 80, this.state.lang.exchangeWater, exchange);
  this.clickModalBtn(button2, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].confirmExchangeTerritory(3);
  });

  let button3 = this.bigButton('red', 'center', 160, this.state.lang.cancel);
  this.clickModalBtn(button3, (): void => {
    this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      let modal: Imodal = {
        type: 1,
        sysType: 2
      }
      this.state.modal = modal;
      this.scene.start('Modal', this.state);
  });

  this.resizeWindow(310);
}

// окно подтверждения изгнания
function confirmExpelChicken(): void {

  this.textHeader.setText(this.state.lang.expelChicken);

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 60, this.state.lang.confirmExpelChicken, {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: { width: 400 }
  }).setOrigin(0.5, 0.5);

  let button = this.bigButton('red', 'center', 40, this.state.lang.expel);
  this.clickModalBtn(button, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].expelChicken();
  });

  let cancel = this.bigButton('yellow', 'center', 120, this.state.lang.cancel);
  this.clickModalBtn(cancel, (): void => {
    this.state.animal.expel = false;
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  });

  this.resizeWindow(250);

}

// призыва кристаллической курочки за рекламу
function diamondChickenAd(): void {

  this.textHeader.setText(this.state.lang.summonChicken);

  let sprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 145, 'chicken0');
  sprite.anims.play('chicken-drag0', true);

  let time: string = timer(this.state.userChicken.diamondAnimalTime);
  this.caveTimer = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 55, this.state.lang.summonTime + time, {
    font: '26px Bip',
    color: '#57A90E',
    align: 'center',
    wordWrap: { width: 420 }
  }).setOrigin(0.5, 0);

  this.add.text(this.cameras.main.centerX - length, this.cameras.main.centerY + 15, this.state.lang.wantAdSummon, {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: { width: 420 }
  }).setOrigin(0.5, 0);

  let right = {
    icon: 'ad-icon',
    text: ''
  }
  let ad = this.bigButton('green', 'left', 135, this.state.lang.summon, right);
  this.clickModalBtn(ad, (): void => {

    this.state.userChicken.diamondAnimalAd = false;
    this.game.scene.keys[this.state.farm].watchAd(2);
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    
  });

  let cancel = this.bigButton('yellow', 'center', 225, this.state.lang.cancel);
  this.clickModalBtn(cancel, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  });

  this.resizeWindow(450);

}

export {
  chickenFair,
  chicken,
  chickenPasture,
  chickenWater,
  boughtChickenLand,
  buyChickenTerritory,
  chickenConvertor,
  confirmChickenExchangeTerritory,
  chickenEggsRepository,
  confirmExpelChicken,
  diamondChickenAd,
  chickenEggRepositoryExchange,
}
