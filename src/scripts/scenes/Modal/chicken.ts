import { shortNum, romanize, timer } from "../../general/basic";

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

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 130, this.state.lang.rememberSellEggs, {
      font: '26px Bip',
      color: '#57A90E',
      align: 'center',
      wordWrap: { width: 440 }
    }).setOrigin(0.5, 0);

    let notEnaugh: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - length, this.cameras.main.centerY - 25, this.state.lang.notEnoughForYou, {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    let border = notEnaugh.getBounds();

    this.add.text(border.right + 50, this.cameras.main.centerY - 25, count, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center'
    }).setOrigin(0, 0.5);

    this.add.sprite(border.right + 5, this.cameras.main.centerY - 25, 'chickenCoin')
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

      let right = {
        icon: 'diamond',
        text: shortNum(this.state.convertor.diamonds)
      }
    
      let pay = this.bigButton('green', 'left', 60, this.state.lang.surcharge, right);
      this.clickModalBtn(pay, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].exchange();
      });

    }
  
    let cancel = this.bigButton('yellow', 'center', 140, this.state.lang.cancel);
    this.clickModalBtn(cancel, (): void => {
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

    if (this.state.userChicken.feedBoostTime > 0) {
      this.feedBoostText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 80, this.state.lang.feedBoostCounterText + this.shortTime(this.state.userChicken.feedBoostTime), {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5);
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

    this.progressButton = this.repositoryBtn(60, this.state.lang.sellEggs, eggMoney);
    this.clickModalBtn(this.progressButton, (): void => {

      if (this.state.territory.money > 0) {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].sellEggs();
      }

    });
    
    if (this.state.userChicken.feedBoostTime > 0) {
      this.feedBoostText = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 30, this.state.lang.feedBoostCounterText + this.shortTime(this.state.userChicken.feedBoostTime), {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5);
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

  this.resizeWindow(300);
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


// окно профиля
function chickenProfile(): void {

  this.textHeader.setText(this.state.lang.profile);

  let height: number = 360;
  let exit: any;
  let nickBtn: Phaser.GameObjects.Sprite;
  let nickText: Phaser.GameObjects.Text;
  let avatar: Phaser.GameObjects.Sprite;
  let login: string = this.state.user.login;

  if (this.state.platform !== 'web') login = this.state.name;

  if (this.state.platform === 'vk') {

    avatar = this.add.sprite(200, 0, 'avatar').setScale(0.7).setDepth(1);

  } else if (this.state.platform === 'ok') {

    avatar = this.add.sprite(200, 0, 'avatar').setDepth(1);

  } else {

    avatar = this.add.sprite(200, 0, 'farmer').setScale(0.6).setDepth(1);
    
  }
  
  let star: Phaser.GameObjects.Sprite = this.add.sprite(260, 0, 'star').setScale(0.65).setDepth(1);

  let level: Phaser.GameObjects.Text = this.add.text(260, 0, String(this.state.user.level), {
    font: '24px Bip',
    color: '#925C28'
  }).setOrigin(0.5, 0.5).setDepth(1);

  let name: Phaser.GameObjects.Text = this.add.text(305, 0, login, {
    font: '25px Shadow',
    color: '#925C28',
    align: 'left',
    wordWrap: { width: 310 }
  }).setOrigin(0, 0).setDepth(1);

  let farmer: Phaser.GameObjects.Text = this.add.text(305, 0, this.state.lang.chickenProfileName + ' ' + romanize(this.state.userChicken.part), {
    font: '24px Bip',
    color: '#925C28',
    align: 'left',
    wordWrap: { width: 310 }
  }).setOrigin(0, 0.5).setDepth(1);

  if (this.state.platform === 'web') {
  
    exit = this.bigButton('orange', 'center', 80, this.state.lang.profileExit);
    this.clickModalBtn(exit, (): void => {
      document.cookie = "farmHASH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.reload();
    });

    name.y = this.cameras.main.centerY - 170;
    let nameHeight: number = name.getBounds().height;
    farmer.y = name.y + nameHeight + 23;
    
    nickBtn = this.add.sprite(405, farmer.y + 58, 'middle-button').setDepth(1);
    nickText = this.add.text(405, farmer.y + 55, this.state.lang.changeNick, {
      font: '22px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setDepth(1);

    this.clickModalBtn({ btn: nickBtn, title: nickText }, (): void => {
      let modal: Imodal = {
        type: 1,
        sysType: 12
      }
      this.state.modal = modal;
      this.game.scene.keys[this.state.farm].scene.launch('Modal', this.state);
    });

    height += 80;

  } else {

    let heightText: number = 23;
    heightText += name.getBounds().height;
    heightText += farmer.getBounds().height;

    name.y = this.cameras.main.centerY - (height / 2) + 25 + (110 - heightText / 2);
    farmer.y = name.y + name.getBounds().height + 23;

  }

  let support = this.bigButton('green', 'center', 0, this.state.lang.support);
  this.clickModalBtn(support, (): void => {
    this.support();
  });

  let agreement: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, 0, this.state.lang.agreement, {
    font: '22px Shadow',
    color: '#777777'
  }).setOrigin(0.5, 0.5);

  this.clickButton(agreement, (): void => {
    window.open('https://' + location.hostname + '/agreement', '_blank');
  });
  
  let bg: Phaser.GameObjects.Graphics = this.add.graphics({ x: 115, y: this.cameras.main.centerY - (height / 2) + 25 });
  bg.fillStyle(0xF8EFCE, 1);
  bg.fillRoundedRect(0, 0, 490, 220, 16);

  agreement.y = this.cameras.main.centerY + (height / 2) + 10;
  support.btn.y = this.cameras.main.centerY + (height / 2) - 60;
  support.title.y = support.btn.y - 5;
  avatar.y = this.cameras.main.centerY - (height / 2) + 135;
  star.y = avatar.y - 65;
  level.y = star.y;

  this.resizeWindow(height);

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


// окно улучшения собирателя яиц
function improveCollectorChicken(): void {

  this.textHeader.setText(this.state.lang.eggCollector + ' ' + this.state.userChicken.collectorLevel + ' ' + this.state.lang.shortLevel + '.');

  let thisLevel: IcollectorSettings = this.state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userChicken.collectorLevel);
  let nextLevel: IcollectorSettings = this.state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userChicken.collectorLevel + 1);

  let speedText: string = this.state.lang.speed + ': ' + thisLevel.speed + ' / ' + this.state.lang.seconds;
  let speed: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 80, speedText, {
    font: '34px Bip',
    color: '#925C28'
  });
  
  let durationText: string = this.state.lang.duration + ': ' + thisLevel.time + ' ' + this.state.lang.minutes;
  let duration: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 25, durationText, {
    font: '34px Bip',
    color: '#925C28'
  });

  let icon: string;

  if (nextLevel.time > thisLevel.time) {

    let position: Iposition = {
      x: duration.getBounds().right + 10,
      y: duration.y
    }
    let text: string = '(+' + (nextLevel.time - thisLevel.time) + ' ' + this.state.lang.shortMinutes +  ')';
    this.add.text(position.x, position.y, text, {
      font: '34px Bip',
      color: '#57A90E'
    });
    
  } else if (nextLevel.speed > thisLevel.speed) {

    let position: Iposition = {
      x: speed.getBounds().right + 10,
      y: speed.y
    }
    let text: string = '(+' + (nextLevel.speed - thisLevel.speed).toFixed(1) + ' ' + this.state.lang.seconds +  ')';
    this.add.text(position.x, position.y, text, {
      font: '34px Bip',
      color: '#57A90E'
    });

  }

  if (this.state.userChicken.part >= nextLevel.chapter) {

    if (nextLevel.diamonds) icon = 'diamond';
    else icon = 'chickenCoin';

    let right = {
      icon: icon,
      text: String(nextLevel.price)
    }
    let improve = this.bigButton('green', 'left', 90, this.state.lang.improve, right);
    this.clickModalBtn(improve, (): void => {

      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].improveCollector();

    });

  } else {

    let improve = {
      icon: 'lock',
      text: this.state.lang.shortPart + ' ' + nextLevel.chapter
    }
    this.bigButton('grey', 'left', 90, this.state.lang.improve, improve);

  }

  this.resizeWindow(250);
  
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
  chickenProfile,
  diamondChickenAd,
  improveCollectorChicken,
  chickenEggRepositoryExchange
}
