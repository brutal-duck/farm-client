import { shortNum, romanize, timer, shortTime } from "../../general/basic";
import Hint from '../../components/animations/Hint';
import Territory from './../../components/Territories/Territory';
import Factory from './../../components/Territories/Factory';

// ярмарка
function cowFair(): void {

  let fair: string = this.state.lang.fair.replace('$1', this.state.userCow.fair);
  this.textHeader.setText(fair);

  let nextFair = this.state.cowSettings.cowFairLevels.find((item: IfairLevel) => item.level === this.state.userCow.fair + 1);

  if (nextFair !== undefined && this.state.userCow.fair < this.state.cowSettings.cowFairLevels.length) {

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 80, this.state.lang.improveCowFair, {
      font: '26px Shadow',
      fill: '#925C28',
      align: 'center',
      wordWrap: { width: 400 }
    }).setDepth(1).setOrigin(0.5, 0);
    
    let priceM: number | string = shortNum(nextFair.price_m);
    let priceD: number | string = shortNum(nextFair.price_d);
    let text: string = this.state.lang.improveFair.replace('$1', this.state.userCow.fair + 1);

    if (this.state.userCow.part >= nextFair.part_unlock) {

      if (nextFair.price_m > 0 && nextFair.price_d > 0) {

        let right1 = {
          icon: 'cowCoin',
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
          this.game.scene.keys[this.state.farm].territories.children.entries.find(el => el.territoryType === 4).fairLevelUp();
        });

      } else {
        
        let right = {
          icon: 'cowCoin',
          text: priceM
        }
        let button = this.bigButton('green', 'left', 90, text, right);
        this.clickModalBtn(button, (): void => {
          this.scene.stop();
          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.game.scene.keys[this.state.farm].territories.children.entries.find(el => el.territoryType === 4).fairLevelUp();
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
function cow(): void {

  this.textHeader.setText(this.state.lang.cow);

  if (this.state.animal.breed !== 0) {

    let icon: string = 'cow' + this.state.animal.breed;
    let sprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 145, icon);
    sprite.anims.play('cow-drag' + this.state.animal.breed, true);

    let breed: string = this.state.lang['cowBreed' + this.state.animal.breed];
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 35, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 35, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY + 35, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    let milkSpeed: number = Math.round(this.state.animal.settings.maxMilkVolume / 60);

    this.add.text(132, this.cameras.main.centerY + 90, this.state.lang.milkSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.add.text(588, this.cameras.main.centerY + 90, milkSpeed + ' ' + this.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    this.add.text(132, this.cameras.main.centerY + 135, this.state.lang.milkPrice, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    let price: Phaser.GameObjects.Text = this.add.text(588, this.cameras.main.centerY + 135, String(this.state.animal.settings.maxMilkVolume), {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    let priceWidth: number = price.getBounds().left - 25;
    this.add.sprite(priceWidth, this.cameras.main.centerY + 135, 'cowCoin').setScale(0.15);

    let sellPrice = {
      icon: 'cowCoin',
      text: shortNum(Math.round(this.game.scene.keys[this.state.farm].cowPrice(1).price / 2))
    }
    let button = this.bigButton('red', 'left', 220, this.state.lang.expel, sellPrice);
    this.clickModalBtn(button, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExpelCow();
    });

    this.resizeWindow(460);

  } else {

    let icon: string = 'cow' + this.state.animal.breed;
    let sprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 85, icon);
    sprite.anims.play('cow-drag0', true);

    let breed: string = this.state.lang['cowBreed' + this.state.animal.breed];
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 25, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 95, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY + 95, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    let points: IcowPoints = this.state.cowSettings.cowSettings.find((item: IcowPoints) => item.breed === 1);
    
    let milkSpeed: number = Math.round(points.maxMilkVolume / 60);

    this.add.text(132, this.cameras.main.centerY + 150, this.state.lang.diamondSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.add.text(588, this.cameras.main.centerY + 150, milkSpeed + ' ' + this.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    this.resizeWindow(350);
    
  }

}

// окно пастбища
function cowPasture(): void {
  const pasture: string = this.state.lang.pasture.replace('$1', this.state.territory.improve);
  this.textHeader.setText(pasture);
  
  let improve: number = this.state.territory.improve + 1;
  if (improve > this.state.cowSettings.territoriesCowSettings.length) {
    improve = this.state.cowSettings.territoriesCowSettings.length;
  }
  const settings: IterritoriesCowSettings = this.state.cowSettings.territoriesCowSettings
    .find((data: IterritoriesCowSettings) => data.improve === improve);
    
  const exchangePrice: number = this.state.cowSettings.territoriesCowSettings
    .find((data: IterritoriesCowSettings) => data.improve === 2).improvePastureMoneyPrice;
  
  const exchange = {
    icon: 'cowCoin',
    text: shortNum(exchangePrice)
  }

  if (this.state.territory.improve < this.state.cowSettings.territoriesCowSettings.length) {
    if (this.state.userCow.part >= settings.unlock_improve) {
      let improve: any;
      if (settings.improvePastureMoneyPrice) {
        improve = {
          icon: 'cowCoin',
          text: shortNum(settings.improvePastureMoneyPrice)
        }
      } else if (settings.improvePastureDiamondPrice) {
        improve = {
          icon: 'diamond',
          text: shortNum(settings.improvePastureDiamondPrice)
        }
      }
      
      const improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);
      const button = this.bigButton('green', 'left', -60, improveText, improve);
      this.clickModalBtn(button, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.state.territory.improveTerritory();
      });
    } else {
      const improve = {
        icon: 'lock',
        text: this.state.lang.shortPart + ' ' + settings.unlock_improve
      }
      const improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);
      this.bigButton('grey', 'left', -60, improveText, improve);
    }
    const button1 = this.bigButton('blue', 'left', 30, this.state.lang.exchangeWater, exchange);
    this.clickModalBtn(button1, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(3);
    });
    const button2 = this.bigButton('orange', 'left', 120, this.state.lang.exchangeRepository, exchange);
    this.clickModalBtn(button2, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(5);
    });
    this.resizeWindow(270);
  } else {
    const button1 = this.bigButton('blue', 'left', -15, this.state.lang.exchangeWater, exchange);
    this.clickModalBtn(button1, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(3);
    });
    const button2 = this.bigButton('orange', 'left', 75, this.state.lang.exchangeRepository, exchange);
    this.clickModalBtn(button2, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(5);
    });
    this.resizeWindow(200);
  }
}

// окно поилки
function cowWater(): void {

  const water: string = this.state.lang.water.replace('$1', this.state.territory.improve);
  this.textHeader.setText(water);

  let improve: number = this.state.territory.improve + 1;
  if (improve > this.state.cowSettings.territoriesCowSettings.length) {
    improve = this.state.cowSettings.territoriesCowSettings.length;
  }
  const settings: IterritoriesCowSettings = this.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === improve);
  const exchangePrice: number = this.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === 2).improvePastureMoneyPrice;
  const exchange = {
    icon: 'cowCoin',
    text: shortNum(exchangePrice)
  }
  if (this.state.territory.improve < this.state.cowSettings.territoriesCowSettings.length) {
    if (this.state.userCow.part >= settings.unlock_improve) {
      let improve: any;
      if (settings.improvePastureMoneyPrice) {
        improve = {
          icon: 'cowCoin',
          text: shortNum(settings.improvePastureMoneyPrice)
        }
      } else if (settings.improvePastureDiamondPrice) {
        improve = {
          icon: 'diamond',
          text: shortNum(settings.improvePastureDiamondPrice)
        }
      }
      const improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);

      const button = this.bigButton('blue', 'left', -60, improveText, improve);
      this.clickModalBtn(button, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.state.territory.improveTerritory();
      });
    } else {
      const improve = {
        icon: 'lock',
        text: this.state.lang.shortPart + ' ' + settings.unlock_improve
      }
      const improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);

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
    const button1 = this.bigButton('green', 'left', -15, this.state.lang.exchangeGrass, exchange);
    this.clickModalBtn(button1, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(2);
    });

    const button2 = this.bigButton('orange', 'left', 75, this.state.lang.exchangeRepository, exchange);
    this.clickModalBtn(button2, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].confirmExchangeTerritory(5);
    });
    this.resizeWindow(200);
  }
}

// купленная земля
function boughtCowLand(): void {
  
  this.textHeader.setText(this.state.lang.boughtLand);

  let price: number = this.state.cowSettings.territoriesCowPrice.find((data: IterritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position).price;

  // 30% от суммы покупки
  price = Math.round((price / 100) * 30);

  let right = {
    icon: 'cowCoin',
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
function buyCowTerritory(): void {
  this.textHeader.setText(this.state.lang.buyTerritory);

  const settings: IterritoriesPrice = this.state.cowSettings.territoriesCowPrice.find((data: IterritoriesPrice) => {
    return data.block === this.state.territory.block && data.position === this.state.territory.position;
  });

  if (this.state.userCow.part >= settings.unlock) {
    // 70% от суммы покупки
    const price = Math.round((settings.price / 100) * 70);
    const right = {
      icon: 'cowCoin',
      text: shortNum(price)
    }
    const button = this.bigButton('yellow', 'left', 20, this.state.lang.buyTerritory, right);
    this.clickModalBtn(button, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.state.territory.buyTerritory();
    });

  } else {
    const right = {
      icon: 'lock',
      text: this.state.lang.shortPart + ' ' + settings.unlock
    }
    this.bigButton('grey', 'left', 20, this.state.lang.buyTerritory, right);
  }
  this.resizeWindow(130);
}

// окно конвертора куриной фермы
function cowConvertor(): void {
  this.textHeader.setText(this.state.lang.exchange);
  if (this.state.convertor.type === 1) {

    this.resizeWindow(300);
    let count: number | string = shortNum(this.state.convertor.count);
    let length: number = String(count).length * 10 + 15;

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 140, this.state.lang.rememberSellMilk, {
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

    this.add.sprite(border.right + 5, this.cameras.main.centerY - 10, 'cowCoin')
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
      if (this.state.boughtFactoryBoost) {
        Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.factoryBoostNative} ${shortTime(this.state[`user${this.state.farm}`].factory.boostTime, this.state.lang)}`, 2);
        this.state.boughtFactoryBoost = false;
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
        Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.feedBoostNative} ${shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang)}`, 2);
        this.state.boughtFeedBoost = false;
      };
      
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    });

  }

}

// окно подтверждения смены типа территории
function confirmCowExchangeTerritory(): void {

  this.textHeader.setText(this.state.lang.exchangeTerritory);
  this.resizeWindow(250);

  let repository: string = '';

  if (this.state.territory.territoryType === 5) {
    repository = ' ' + this.state.lang.milkWillBeSold;
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
      this.state.territory.exchangeTerritory();
    });

  } else if (this.state.exchangeTerritory === 3) {

    let confirm = this.bigButton('blue', 'center', 40, this.state.lang.exchangeWater);
    this.clickModalBtn(confirm, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.state.territory.exchangeTerritory();
    });

  } else if (this.state.exchangeTerritory === 5) {

    let confirm = this.bigButton('orange', 'center', 40, this.state.lang.exchangeRepository);
    this.clickModalBtn(confirm, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.state.territory.exchangeTerritory();
    });

  }

}

// хранилище яиц
function cowMilkRepository(): void {
  
  let repository: string = this.state.lang.repository.replace('$1', this.state.territory.improve);
  this.textHeader.setText(repository);

  let improve: number = this.state.territory.improve + 1;
  if (improve > this.state.cowSettings.territoriesCowSettings.length) {
    improve = this.state.cowSettings.territoriesCowSettings.length;
  }
  let settings: IterritoriesCowSettings = this.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === improve);

  let milkMoney = {
    icon: 'cowCoin',
    text: shortNum(this.state.territory.volume * this.game.scene.keys[this.state.farm].milkMultiply)
  }
  if (this.state.territory.improve < this.state.cowSettings.territoriesCowSettings.length) {

    if (this.state.userCow.part >= settings.unlock_improve) {
      let improve: any;
      if (settings.improveStorageMoneyPrice) {
        improve = {
          icon: 'cowCoin',
          text: shortNum(settings.improveStorageMoneyPrice)
        }
      } else if (settings.improveStorageDiamondPrice) {
        improve = {
          icon: 'diamond',
          text: shortNum(settings.improveStorageDiamondPrice)
        }
      }
      let improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);
      let button = this.bigButton('orange', 'left', 90, improveText, improve);
      this.clickModalBtn(button, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.state.territory.improveTerritory();
      });

    } else {
      
      let improve = {
        icon: 'lock',
        text: this.state.lang.shortPart + ' ' + settings.unlock_improve
      }
      let improveText: string = this.state.lang.improveToLevel.replace('$1', this.state.territory.improve + 1);
      this.bigButton('grey', 'left', 90, improveText, improve);

    }

    this.progressText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 140, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 100, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY - 100, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);
    this.progressButton = this.bigButton('yellow', 'left', 10, this.state.lang.sellMilk , milkMoney);
    this.clickModalBtn(this.progressButton, (): void => {

      if (this.state.territory.volume > 0) {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].showConfirmSellMilk();
      }

    });

    this.feedBoostText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 60, ' ', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

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

    this.resizeWindow(350);

  } else {

    this.progressText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 60, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY - 60, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    this.progressButton = this.bigButton('yellow', 'left', 50, this.state.lang.sellMilk , milkMoney);
    this.clickModalBtn(this.progressButton, (): void => {

      if (this.state.territory.volume > 0) {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].showConfirmSellMilk();
      }

    });
    
    if (this.state.userCow.feedBoostTime > 0) {
      this.feedBoostText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 20, ' ', {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5).setVisible(false);
    }

    let button1 = this.bigButton('red', 'center', 130, this.state.lang.exchangeRepositoryBtn);
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

    this.resizeWindow(280);

  }

}

function cowMilkRepositoryExchange(): void {
  const repository: string = this.state.lang.repository.replace('$1', this.state.territory.improve);
  this.textHeader.setText(repository);

  const settings: IterritoriesCowSettings = this.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === 2);
  
  const exchange = {
    icon: 'cowCoin',
    text: shortNum(settings.improvePastureMoneyPrice)
  }

  const textTitle: string = this.state.lang.exchangeRepositoryTitle.replace('$1', this.state.territory.improve);

  const title: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 100, textTitle, {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: {width: 450},
  });
  title.setOrigin(0.5, 0.5);
  const button1 = this.bigButton('green', 'left', 0, this.state.lang.exchangeGrass, exchange);
  this.clickModalBtn(button1, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].confirmExchangeTerritory(2);
  });

  const button2 = this.bigButton('blue', 'left', 80, this.state.lang.exchangeWater, exchange);
  this.clickModalBtn(button2, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].confirmExchangeTerritory(3);
  });

  const button3 = this.bigButton('red', 'center', 160, this.state.lang.cancel);
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
function confirmExpelCow(): void {

  this.textHeader.setText(this.state.lang.expelCow);

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 60, this.state.lang.confirmExpelCow, {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: { width: 400 }
  }).setOrigin(0.5, 0.5);

  let button = this.bigButton('red', 'center', 40, this.state.lang.expel);
  this.clickModalBtn(button, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].expelCow();
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
function diamondCowAd(): void {

  this.textHeader.setText(this.state.lang.summonCow);

  let sprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 145, 'cow0');
  sprite.play('cow-stay-right0', true);

  let time: string = timer(this.state.userCow.diamondAnimalTime);
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

    this.state.userCow.diamondAnimalAd = false;
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

function updateFactoryModal(): void {
  if (this.state.modal?.sysType === 17 && this.state.farm === 'Cow') {
    if (this.state.userCow.factory.boostTime > 0) {
      if (this.factoryBoostTimer.text !== shortTime(this.state.userCow.factory.boostTime, this.state.lang)) {
        this.factoryBoostTimer.setText(shortTime(this.state.userCow.factory.boostTime, this.state.lang));
      }
    } else {
      if (this.factoryBoostTimer?.visible) {

        this.factoryBoostTimer.setVisible(false);
      }
    }
  }
}

function improveFactoryWindow(): void {
  const factory: string = this.state.lang.factory.replace('$1', this.state.territory.factory.improve);
  this.textHeader.setText(factory);
  const headerStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '26px',
    fontFamily: 'Bip',
    color: '#925C28',
    fontStyle: 'bold'
  };
  const basicStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '24px',
    fontFamily: 'Bip',
    color: '#925C28'
  };
  const improveStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    fontSize: '24px',
    fontFamily: 'Bip',
    color: '#57A90E'
  };

  const thisLevel: IfactorySettings = this.state.territory.factory.settings;
  const nextLevel: IfactorySettings = this.state.cowSettings.cowFactorySettings.find((data: IfactorySettings) => data.improve === this.state.territory.factory.improve + 1);

  let nextLevelProductId: number = 0;
  for (let i = 2; i < 4; i++) {
    if (thisLevel[`production${i}Percent`] <= 0 && nextLevel[`production${i}Percent`] > 0) {
      nextLevelProductId = i;
      break;
    }
  }

  if (nextLevelProductId > 0) {
    const text: string = `${this.state.lang[`production${nextLevelProductId}`]}`;
    const productText: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY + 40, `${this.state.lang.newProduct}:`, basicStyle);
    this.add.text(productText.getBounds().right + 10, this.cameras.main.centerY + 40, text, improveStyle);
  }

  const dY: number = nextLevelProductId > 0 ? 0 : 20
  
  const nextLevelHeader: string = `${this.state.lang.nextFactory.replace('$1', nextLevel.improve)}`;
  const header: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 120, nextLevelHeader, headerStyle).setOrigin(0.5);

  const lotSize: string = `${this.state.lang.lotSize}: ${shortNum(thisLevel.lotSize)} ${this.state.lang.litres}`;
  const lot: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 80 + dY, lotSize, basicStyle);
  
  const time: string = thisLevel.processingTime / 60 < 1 ? `${thisLevel.processingTime} ${this.state.lang.seconds}`: 
  `${shortNum(thisLevel.processingTime / 60)} ${this.state.lang.minutes}`;

  const durationText: string = `${this.state.lang.processingTime}: ${time}`;
  const duration: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 40 + dY, durationText, basicStyle);

  const efficiencyText: string = `${this.state.lang.efficiency}: ${thisLevel.efficiency}%`;
  const efficiency: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY + dY, efficiencyText, basicStyle);

  let icon: string;
  let text: string;

  if (nextLevel.processingTime > thisLevel.processingTime) {

    const position: Iposition = {
      x: duration.getBounds().right + 10,
      y: duration.y
    }
    const time: string = (nextLevel.processingTime - thisLevel.processingTime) / 60 < 1 ? 
    `${(nextLevel.processingTime - thisLevel.processingTime)} ${this.state.lang.seconds}`: 
    `${shortNum(nextLevel.processingTime - thisLevel.processingTime)} ${this.state.lang.minutes}`;

    const text: string = `(+${time})`;
    this.add.text(position.x, position.y, text, improveStyle);
    
  } 
  
  if (nextLevel.lotSize > thisLevel.lotSize) {

    const position: Iposition = {
      x: lot.getBounds().right + 10,
      y: lot.y
    }
    const text: string = `(+${shortNum(nextLevel.lotSize - thisLevel.lotSize)} ${this.state.lang.litres})`;
    this.add.text(position.x, position.y, text, improveStyle);

  }

  if (nextLevel.efficiency > thisLevel.efficiency) {

    const position: Iposition = {
      x: efficiency.getBounds().right + 10,
      y: efficiency.y
    }
    const text: string = `(+${shortNum(nextLevel.efficiency - thisLevel.efficiency)}%)`;
    this.add.text(position.x, position.y, text, improveStyle);

  }

  const btnY: number = nextLevelProductId > 0 ? 130 : 110;

  if (this.state[`user${this.state.farm}`].part >= nextLevel.unlock_improve) {
    if (nextLevel.improveDiamondPrice) {
      icon = 'diamond';
      text = String(nextLevel.improveDiamondPrice);
    } else {
      icon = `cowCoin`;
      text = String(nextLevel.improveMoneyPrice);
    }

    const right = {
      icon: icon,
      text: shortNum(text)
    }
    const improve = this.bigButton('green', 'left', btnY, this.state.lang.improve, right);
    this.clickModalBtn(improve, (): void => {
      this.state.territory.improveFactory();
    });

  } else {

    let improve = {
      icon: 'lock',
      text: `${this.state.lang.shortPart} ${nextLevel.unlock_improve}`,
    }
    this.bigButton('grey', 'left', btnY, this.state.lang.improve, improve);
  }
  if (nextLevelProductId > 0) {
    this.resizeWindow(300);
  } else {
    header.setY(header.y += 20);
    this.resizeWindow(250);
  }
}

function factoryBoostWindow(): void {
  const price: number = 25;
  let multiplyTime: number = 1;
  if (this.state.userCow.factory.boostTime > 0) multiplyTime = 2;
  const ONE_HOUR: number = 3600;

  this.textHeader.setText(this.state.lang.showCase);
  const sprite: Phaser.GameObjects.Sprite = this.add.sprite(140, this.cameras.main.centerY - 20, 'chocolate');
  const spriteGeom: Phaser.Geom.Rectangle = sprite.getBounds();
  this.add.text(spriteGeom.right + 10, spriteGeom.centerY, this.state.lang.showCaseText2, {
    font: '26px Bip',
    color: '#925C28',
    wordWrap: { width: 400 },
    align: 'left',
  }).setOrigin(0, 0.5);
  const text = this.state.lang.buyCocoaBeans.replace('$1', multiplyTime);
  const right1 = {
    text: price,
    icon: 'diamond'}
  const button = this.bigButton('green', 'left', 90, text, right1);

  this.factoryBoostTimer = this.add.text(spriteGeom.centerX, spriteGeom.top, shortTime(this.state.userCow.factory.boostTime, this.state.lang), {
    font: '26px Bip',
    color: '#925C28'
  }).setOrigin(0.5);

  this.clickModalBtn(button, (): void => {
    
    if (this.state.user.diamonds >= price) {
      
      if (this.state.userCow.factory.boostTime <= 0) {
        this.state.user.diamonds -= price;
        this.state.userCow.factory.boostTime += ONE_HOUR;

        this.state.boughtFactoryBoost = true;

        this.game.scene.keys[this.state.farm].logAmplitudeEvent('diamonds_spent', {
          type: 'booster_factory',
          count: price,
        });

        button.title.setText(this.state.lang.buyCocoaBeans.replace('$1', 2));

        this.factoryBoostTimer = this.add.text(spriteGeom.centerX, spriteGeom.top, shortTime(this.state.userCow.factory.boostTime, this.state.lang), {
          font: '26px Bip',
          color: '#925C28'
        }).setOrigin(0.5);
      } else {
        if (this.state.userCow.factory.boostTime / ONE_HOUR + 2 > this.game.scene.keys['Cow'].factoryBoostStack) {
          const modal: Imodal = {
            type: 1,
            sysType: 3,
            height: 150,
            message: this.state.lang.factoryBoostMaxTime
          }
          this.state.modal = modal;
          this.scene.restart(this.state);
        } else {
          this.state.boughtFactoryBoost = true;
          this.state.user.diamonds -= price;
          this.state.userCow.factory.boostTime += 2 * ONE_HOUR;
          this.game.scene.keys[this.state.farm].logAmplitudeEvent('diamonds_spent', {
            type: 'booster_factory',
            count: price,
          });
        }
      }
    } else {
      const countResources = price - this.state.user.diamonds;
      this.state.convertor = {
        fun: 2,
        count: countResources,
        diamonds: countResources,
        type: 2
      }
      const modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.state.modal = modal;
      this.scene.restart(this.state);
    }
  });
  this.resizeWindow(180);
}

function confirmSellMilk(): void {
  const factory: string = this.state.lang.repository.replace('$1', this.state.territory.improve);
  this.textHeader.setText(factory);

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 70, this.state.lang.confirmSellMilk, {
    font: '26px Bip',
    color: '#925C28',
    wordWrap: { width: 450 },
    align: 'center',
  }).setOrigin(0.5);
  const milkMoney = {
    icon: 'cowCoin',
    text: shortNum(this.state.territory.volume * this.game.scene.keys[this.state.farm].milkMultiply)
  }

  this.progressButton = this.bigButton('red', 'left', 50, this.state.lang.sellMilk , milkMoney);
  const greenBtn = this.bigButton('green', 'center', 140, this.state.lang.dontSellMilk);

  this.clickModalBtn(this.progressButton, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].sellMilk();
  });

  this.clickModalBtn(greenBtn, (): void => {
    const modal: Imodal = {
      type: 1, 
      sysType: 2,
    };
    this.state.modal = modal;
    this.scene.restart(this.state);

  });
  this.resizeWindow(300);
}

export {
  cowFair,
  cow,
  cowPasture,
  cowWater,
  boughtCowLand,
  buyCowTerritory,
  cowConvertor,
  confirmCowExchangeTerritory,
  cowMilkRepository,
  confirmExpelCow,
  diamondCowAd,
  cowMilkRepositoryExchange,
  updateFactoryModal,
  improveFactoryWindow,
  factoryBoostWindow,
  confirmSellMilk,
}
