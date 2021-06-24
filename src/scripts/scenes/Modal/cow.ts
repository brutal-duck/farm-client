import { shortNum, romanize, timer, shortTime } from "../../general/basic";
import Hint from '../../components/animations/Hint';
import SpeechBubble from './../../components/animations/SpeechBuble';
import ExpelAnimalWindow from "../../components/modal/system/ExpelAnimalWindow";

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
      new ExpelAnimalWindow(this.scene)
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


// хранилище молока
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

    if (this.state.userCow.part === 2 && this.state.userCow.tutorial < 40) {
      this.progressButton = this.bigButton('grey', 'left', 10, this.state.lang.sellMilk , milkMoney);
      this.clickModalBtn(this.progressButton, (): void => {
        if (this.state.territory.volume > 0) {
          this.scene.stop();
          SpeechBubble.create(this.game.scene.keys[`${this.state.farm}Bars`], this.state.lang.doneNextTask, 3);
        }
      });
    } else {
      this.progressButton = this.bigButton('yellow', 'left', 10, this.state.lang.sellMilk , milkMoney);
      this.clickModalBtn(this.progressButton, (): void => {
        if (this.state.territory.volume > 0) {
          this.scene.stop();
          if (this.state.userCow.tutorial >= 40 || this.state.userCow.part >= 3) {
            this.game.scene.keys[this.state.farm].showConfirmSellMilk();
          } else {
            this.game.scene.keys[this.state.farm].sellMilk();
          }
        }
      });
    }

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


    if (this.state.userCow.part === 2 && this.state.userCow.tutorial < 40) {
      this.progressButton = this.bigButton('grey', 'left', 50, this.state.lang.sellMilk , milkMoney);
      this.clickModalBtn(this.progressButton, (): void => {
        if (this.state.territory.volume > 0) {
          this.scene.stop();
          SpeechBubble.create(this.game.scene.keys[`${this.state.farm}Bars`], this.state.lang.doneNextTask, 3);
        }
      });
    } else {
      this.progressButton = this.bigButton('yellow', 'left', 50, this.state.lang.sellMilk , milkMoney);
      this.clickModalBtn(this.progressButton, (): void => {
        if (this.state.territory.volume > 0) {
          this.scene.stop();
          if (this.state.userCow.tutorial < 40) {
            this.game.scene.keys[this.state.farm].sellMilk();
          } else {
            this.game.scene.keys[this.state.farm].showConfirmSellMilk();
          }
        }
      });
    }
    
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


export {
  cowFair,
  cow,
  cowWater,
  cowMilkRepository,
}
