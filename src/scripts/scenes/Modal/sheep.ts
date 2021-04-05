import { shortNum, romanize, timer, shortTime } from "../../general/basic";
import { FAPI } from '../../libs/Fapi.js';
import Hint from '../../components/animations/Hint';

// ярмарка
function sheepFair(): void {

  let fair: string = this.state.lang.fair.replace('$1', this.state.userSheep.fair);
  this.textHeader.setText(fair);

  let nextFair = this.state.sheepSettings.sheepFairLevels.find((item: IfairLevel) => item.level === this.state.userSheep.fair + 1);

  if (nextFair !== undefined && this.state.userSheep.fair < this.state.sheepSettings.sheepFairLevels.length) {

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 80, this.state.lang.improveSheepFair, {
      font: '26px Shadow',
      fill: '#925C28',
      align: 'center',
      wordWrap: { width: 400 }
    }).setDepth(1).setOrigin(0.5, 0);
    
    let priceM: number | string = shortNum(nextFair.price_m);
    let priceD: number | string = shortNum(nextFair.price_d);
    let text: string = this.state.lang.improveFair.replace('$1', this.state.userSheep.fair + 1);

    if (this.state.userSheep.part >= nextFair.part_unlock) {

      if (nextFair.price_m > 0 && nextFair.price_d > 0) {

        let right1 = {
          icon: 'sheepCoin',
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
          icon: 'sheepCoin',
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


// окно овцы
function sheep(): void {

  this.textHeader.setText(this.state.lang.sheep);

  if (this.state.animal.type !== 0) {

    let icon: string = 'sheep' + this.state.animal.type;
    let sprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 180, icon);
    sprite.anims.play('sheep-stay-right' + this.state.animal.type, true);
    this.add.sprite(sprite.x, sprite.y, 'sheep-right-' + this.state.animal.type  + '-2');

    let breed: string = this.state.lang['sheepBreed' + this.state.animal.type];
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 70, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    let points: IsheepPoints = this.state.sheepSettings.sheepSettings.find((item: IsheepPoints) => item.breed === this.state.animal.type);
    
    let woolGrowth: number = Math.round(1000 / points.wool_growth);

    this.add.text(132, this.cameras.main.centerY + 55, this.state.lang.woolSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.add.text(588, this.cameras.main.centerY + 55, woolGrowth + ' ' + this.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    this.add.text(132, this.cameras.main.centerY + 100, this.state.lang.woolPrice, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    let price: Phaser.GameObjects.Text = this.add.text(588, this.cameras.main.centerY + 100, String(points.long_wool), {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    let priceWidth: number = price.getBounds().left - 25;
    this.add.sprite(priceWidth, this.cameras.main.centerY + 100, 'sheepCoin').setScale(0.15);
    
    let priceWool: number = this.state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === this.state.animal.type).long_wool;

    let diamond = {
      icon: 'sheepCoin',
      text: shortNum(priceWool)
    }
    this.progressButton = this.bigButton('grey', 'left', 180, this.state.lang.cutWool, diamond);

    this.clickModalBtn(this.progressButton, (): void => {

      if (this.state.animal.wool === 1000) {
        
        this.scene.stop();
        this.game.scene.keys[this.state.farm].collectWool(this.state.animal, true);
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  
      }

    });

    let sellPrice = {
      icon: 'sheepCoin',
      text: shortNum(Math.round(this.game.scene.keys[this.state.farm].sheepPrice(1).price / 2))
    }
    let button = this.bigButton('red', 'left', 265, this.state.lang.expel, sellPrice);
    this.clickModalBtn(button, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExpelSheep();
    });

    this.resizeWindow(540);

  } else {

    let icon: string = 'sheep' + this.state.animal.type;
    let sprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 130, icon);
    sprite.anims.play('sheep-stay-right0', true);
    this.add.sprite(sprite.x, sprite.y, 'sheep-right-0-4');

    let breed: string = this.state.lang['sheepBreed' + this.state.animal.type];
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 20, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY + 50, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    let points: IsheepPoints = this.state.sheepSettings.sheepSettings.find((item: IsheepPoints) => item.breed === 1);
    
    let woolGrowth: number = Math.round(1000 / points.wool_growth);

    this.add.text(132, this.cameras.main.centerY + 105, this.state.lang.diamondSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.add.text(588, this.cameras.main.centerY + 105, woolGrowth + ' ' + this.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    let diamond = {
      icon: 'diamond',
      text: 1
    }

    this.progressButton = this.bigButton('grey', 'left', 195, this.state.lang.collectDiamond, diamond);
    this.clickModalBtn(this.progressButton, (): void => {

      if (this.state.animal.wool === 1000) {
        
        this.scene.stop();
        this.game.scene.keys[this.state.farm].collectWool(this.state.animal, true);
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  
      }

    });

    this.resizeWindow(430);
    
  }

}


// окно пастбища
function sheepPasture(): void {

  let pasture: string = this.state.lang.pasture.replace('$1', this.state.territory.improve);
  this.textHeader.setText(pasture);

  let part: Ipart = this.state.sheepSettings.sheepParts.find((data: Ipart) => data.sort === this.state.userSheep.part);

  let exchange = {
    icon: 'sheepCoin',
    text: shortNum(part.improve_territory_2)
  }

  if (this.state.territory.improve < this.state.sheepSettings.territoriesSheepSettings.length) {

    let price: number;

    let lock: number = this.state.sheepSettings.territoriesSheepSettings.find((data: IterritoriesSheepSettings) => data.improve === this.state.territory.improve + 1).unlock_improve;
    
    if (this.state.userSheep.part >= lock) {

      if (this.state.territory.improve === 1) {
        price = part.improve_territory_2;
      } else if (this.state.territory.improve === 2) {
        price = part.improve_territory_3;
      } else {
        price = part.improve_territory_4;
      }

      let improve = {
        icon: 'sheepCoin',
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
function sheepWater(): void {

  let water: string = this.state.lang.water.replace('$1', this.state.territory.improve);
  this.textHeader.setText(water);

  let part: Ipart = this.state.sheepSettings.sheepParts.find((data: Ipart) => data.sort === this.state.userSheep.part);

  let exchange = {
    icon: 'sheepCoin',
    text: shortNum(part.improve_territory_2)
  }

  if (this.state.territory.improve < this.state.sheepSettings.territoriesSheepSettings.length) {

    let price: number;

    let lock: number = this.state.sheepSettings.territoriesSheepSettings.find((data: IterritoriesSheepSettings) => data.improve === this.state.territory.improve + 1).unlock_improve;
    
    if (this.state.userSheep.part >= lock) {

      if (this.state.territory.improve === 1) {
        price = part.improve_territory_2;
      } else if (this.state.territory.improve === 2) {
        price = part.improve_territory_3;
      } else {
        price = part.improve_territory_4;
      }

      let improve = {
        icon: 'sheepCoin',
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
function boughtSheepLand(): void {

  this.textHeader.setText(this.state.lang.boughtLand);

  let price: number = this.state.sheepSettings.territoriesSheepPrice.find((data: IterritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position).price;

  // 30% от суммы покупки
  price = Math.round((price / 100) * 30);

  let right = {
    icon: 'sheepCoin',
    text: shortNum(price)
  }
  
  if (this.state.userSheep.tutorial === 20 &&
    this.state.territory.block === 2 &&
    this.state.territory.position === 3) {

    let button = this.bigButton('green', 'left', 30, this.state.lang.sowPasture, right);
    this.clickModalBtn(button, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.state.exchangeTerritory = 2;
      this.game.scene.keys[this.state.farm].installTerritory();
    });
    
    this.resizeWindow(120);

  } else if (this.state.userSheep.tutorial === 30 &&
    this.state.territory.block === 2 &&
    this.state.territory.position === 2) {

    let button = this.bigButton('blue', 'left', 30, this.state.lang.installWater, right);
    this.clickModalBtn(button, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.state.exchangeTerritory = 3;
      this.game.scene.keys[this.state.farm].installTerritory();
    });
    
    this.resizeWindow(120);

  } else if (this.state.userSheep.tutorial === 80 &&
    this.state.territory.block === 2 &&
    this.state.territory.position === 1) {

    let button = this.bigButton('orange', 'left', 30, this.state.lang.buildRepository, right);
    this.clickModalBtn(button, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.state.exchangeTerritory = 5;
      this.game.scene.keys[this.state.farm].installTerritory();
    });
    
    this.resizeWindow(120);

  } else {

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

}


// земля для покупки
function buySheepTerritory(): void {
  
  this.textHeader.setText(this.state.lang.buyTerritory);

  let settings: IterritoriesPrice = this.state.sheepSettings.territoriesSheepPrice.find((data: IterritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position);

  if (this.state.userSheep.part >= settings.unlock) {

    // 70% от суммы покупки
    let price = Math.round((settings.price / 100) * 70);

    let right = {
      icon: 'sheepCoin',
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


// окно конвертора овечьей фермы
function sheepConvertor(): void {

  this.textHeader.setText(this.state.lang.exchange);

  if (this.state.convertor.type === 1) {

    this.resizeWindow(300);

    let count: number | string = shortNum(this.state.convertor.count);
    let length: number = String(count).length * 10 + 15;
    
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 140, this.state.lang.rememberSellWool, {
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

    this.add.sprite(border.right + 5, this.cameras.main.centerY - 10, 'sheepCoin')
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
        Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.feedBoostNative} ${shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang)}`, 2);
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
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    });

  }

}


// окно подтверждения смены типа территории
function confirmSheepExchangeTerritory(): void {

  this.textHeader.setText(this.state.lang.exchangeTerritory);
  this.resizeWindow(250);

  let repository: string = '';

  if (this.state.territory.type === 5) {
    repository = ' ' + this.state.lang.woolWillBeSold;
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


// хранилище шерсти
function sheepWoolRepository(): void {
  
  let repository: string = this.state.lang.repository.replace('$1', this.state.territory.improve);
  this.textHeader.setText(repository);
  
  let part: Ipart = this.state.sheepSettings.sheepParts.find((data: Ipart) => data.sort === this.state.userSheep.part);

  let exchange = {
    icon: 'sheepCoin',
    text: shortNum(part.improve_territory_2)
  }

  let woolMoney = {
    icon: 'sheepCoin',
    text: shortNum(this.state.territory.money)
  }

  if (this.state.territory.improve < this.state.sheepSettings.territoriesSheepSettings.length) {

    let price: number;
    let lock: number = this.state.sheepSettings.territoriesSheepSettings.find((data: IterritoriesSheepSettings) => data.improve === this.state.territory.improve + 1).unlock_improve;
    
    if (this.state.userSheep.part >= lock) {

      if (this.state.territory.improve === 1) {
        price = part.improve_territory_2;
      } else if (this.state.territory.improve === 2) {
        price = part.improve_territory_3;
      } else {
        price = part.improve_territory_4;
      }

      let improve = {
        icon: 'sheepCoin',
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

    this.progressButton = this.repositoryBtn(10, this.state.lang.sellWool, woolMoney);
    this.clickModalBtn(this.progressButton, (): void => {
      
      if (this.state.territory.money > 0) {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].sellWool();
      }

    });
    
    if (this.state.userSheep.feedBoostTime > 0) {
      this.feedBoostText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 80, ' ', {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5).setVisible(false);
    }

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

    this.progressButton = this.repositoryBtn(60, this.state.lang.sellWool, woolMoney);
    this.clickModalBtn(this.progressButton, (): void => {

      if (this.state.territory.money > 0) {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].sellWool();
      }

    });

    this.feedBoostText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 30, ' ', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5).setVisible(false);

    

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

function sheepWoolRepositoryExchange(): void {
  let repository: string = this.state.lang.repository.replace('$1', this.state.territory.improve);
  this.textHeader.setText(repository);

  let part: Ipart = this.state.sheepSettings.sheepParts.find((data: Ipart) => data.sort === this.state.userSheep.part);

  let exchange = {
    icon: 'sheepCoin',
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
function confirmExpelSheep(): void {

  this.textHeader.setText(this.state.lang.expelSheep);

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 60, this.state.lang.confirmExpelSheep, {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: { width: 400 }
  }).setOrigin(0.5, 0.5);

  let button = this.bigButton('red', 'center', 40, this.state.lang.expel);
  this.clickModalBtn(button, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].expelSheep();
  });

  let cancel = this.bigButton('yellow', 'center', 120, this.state.lang.cancel);
  this.clickModalBtn(cancel, (): void => {
    this.state.animal.expel = false;
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  });

  this.resizeWindow(250);

}

// призыва кристаллической овечки за рекламу
function diamondSheepAd(): void {

  this.textHeader.setText(this.state.lang.summonSheep);

  let sprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 145, 'sheep0');
  sprite.anims.play('sheep-stay-right0', true);
  this.add.sprite(sprite.x, sprite.y, 'sheep-right-0-4');

  let time: string = timer(this.state.userSheep.diamondAnimalTime);
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

    this.state.userSheep.diamondAnimalAd = false;
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
  sheepFair,
  sheep,
  sheepPasture,
  sheepWater,
  boughtSheepLand,
  buySheepTerritory,
  sheepConvertor,
  confirmSheepExchangeTerritory,
  sheepWoolRepository,
  confirmExpelSheep,
  diamondSheepAd,
  sheepWoolRepositoryExchange,
}
