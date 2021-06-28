import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import SpeechBubble from "../../animations/SpeechBuble";

export default class FarmResourceRepositoryWindow {
  public scene: Modal;

  private resource: string
  private farm: string
  private part: Ipart
  private settings: IterritoriesCowSettings
  private improve: number
  private money: any

  constructor(scene: Modal) {
    this.scene = scene;
    this.init()
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }


  private init(): void {

    this.farm = this.scene.state.farm
    if (this.farm === 'Sheep') this.resource = 'Wool'
    else if (this.farm === 'Chicken') this.resource = 'Eggs'
    else if (this.farm === 'Cow') this.resource = 'Milk'

    if (this.farm !== 'Cow') this.part = this.scene.state[`${this.farm.toLowerCase()}Settings`][`${this.farm.toLowerCase()}Parts`].find((data: Ipart) => data.sort === this.scene.state[`user${this.farm}`].part);
    else {
      this.improve = this.scene.state.territory.improve + 1;
      if (this.improve > this.scene.state.cowSettings.territoriesCowSettings.length) {
        this.improve = this.scene.state.cowSettings.territoriesCowSettings.length;
      }
      this.settings = this.scene.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === this.improve);
    }

    this.money = {
      icon: `${this.farm.toLowerCase()}Coin`,
      text: shortNum(this.scene.state.territory.money)
    }

  }


  private create(): void {

    let repository: string = this.scene.state.lang.repository.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(repository);

    if (this.farm !== 'Cow' && this.scene.state.territory.improve < this.scene.state[`${this.farm.toLowerCase()}Settings`][`territories${this.farm}Settings`].length) {
      
      this.nonCowRepositoryUpgradeAvalable()

    } else if (this.farm === 'Cow' && this.scene.state.territory.improve < this.scene.state.cowSettings.territoriesCowSettings.length) {

      this.cowRepositoryApgradeAvalable()
      
    } else {

      if (this.farm !== 'Cow') this.nonCowRepositoryMaxLevel()
      else this.cowRepositoryMaxLevel()

    }
  
  }


  private nonCowRepositoryUpgradeAvalable(): void {

    let price: number;
    let lock: number = this.scene.state[`${this.farm.toLowerCase()}Settings`][`territories${this.farm}Settings`].find(data => data.improve === this.scene.state.territory.improve + 1).unlock_improve;
    
    if (this.scene.state[`user${this.farm}`].part >= lock) {

      if (this.scene.state.territory.improve === 1) price = this.part.improve_territory_2;
      else if (this.scene.state.territory.improve === 2) price = this.part.improve_territory_3;
      else price = this.part.improve_territory_4;

      let improve = {
        icon: `${this.farm.toLowerCase()}Coin`,
        text: shortNum(price)
      }
      let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
      let button = this.scene.bigButton('orange', 'left', 110, improveText, improve);
      this.scene.clickModalBtn(button, (): void => { this.improveTerritory() });

    } else {
      
      let improve = {
        icon: 'lock',
        text: this.scene.state.lang.shortPart + ' ' + lock
      }
      let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
      this.scene.bigButton('grey', 'left', 110, improveText, improve);

    }

    this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 160, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 120, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 120, 0, 16, 'green-progress').setOrigin(0, 0.5);

    this.scene.progressButton = this.scene.repositoryBtn(10, this.scene.state.lang[`sell${this.resource}`], this.money);
    this.scene.clickModalBtn(this.scene.progressButton, (): void => {this.sellResource()});
    
    if (this.scene.state[`user${this.farm}`].feedBoostTime > 0) {
      this.scene.feedBoostText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 80, ' ', {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5).setVisible(false);
    }

    let button1 = this.scene.bigButton('red', 'center', 200, this.scene.state.lang.exchangeRepositoryBtn);
    this.scene.clickModalBtn(button1, (): void => { this.launchExchangeCurrencyModal() });

    this.scene.resizeWindow(430);

  }


  private cowRepositoryApgradeAvalable(): void {

    if (this.scene.state.userCow.part >= this.settings.unlock_improve) {
      let improve: any;
      if (this.settings.improveStorageMoneyPrice) {
        improve = {
          icon: 'cowCoin',
          text: shortNum(this.settings.improveStorageMoneyPrice)
        }
      } else if (this.settings.improveStorageDiamondPrice) {
        improve = {
          icon: 'diamond',
          text: shortNum(this.settings.improveStorageDiamondPrice)
        }
      }
      let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
      let button = this.scene.bigButton('orange', 'left', 90, improveText, improve);
      this.scene.clickModalBtn(button, (): void => { this.improveTerritory() });

    } else {
      
      let improve = {
        icon: 'lock',
        text: this.scene.state.lang.shortPart + ' ' + this.settings.unlock_improve
      }
      let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
      this.scene.bigButton('grey', 'left', 90, improveText, improve);

    }

    this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 140, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 100, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 100, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    if (this.scene.state.userCow.part === 2 && this.scene.state.userCow.tutorial < 40) {
      this.scene.progressButton = this.scene.bigButton('grey', 'left', 10, this.scene.state.lang.sellMilk, this.money);
      this.scene.clickModalBtn(this.scene.progressButton, (): void => {
        if (this.scene.state.territory.volume > 0) {
          this.scene.scene.stop();
          SpeechBubble.create(this.scene.game.scene.keys[`${this.farm}Bars`], this.scene.state.lang.doneNextTask, 3);
        }
      });
    } else {
      this.scene.progressButton = this.scene.bigButton('yellow', 'left', 10, this.scene.state.lang.sellMilk, this.money);
      this.scene.clickModalBtn(this.scene.progressButton, (): void => {
        if (this.scene.state.territory.volume > 0) {
          this.scene.scene.stop();
          if (this.scene.state.userCow.tutorial >= 40 || this.scene.state.userCow.part >= 3) {
            this.scene.game.scene.keys[this.farm].showConfirmSellMilk();
          } else {
            this.scene.game.scene.keys[this.farm].sellMilk();
          }
        }
      });
    }

    this.scene.feedBoostText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 60, ' ', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    let button1 = this.scene.bigButton('red', 'center', 170, this.scene.state.lang.exchangeRepositoryBtn);
    this.scene.clickModalBtn(button1, (): void => { this.launchExchangeCurrencyModal() });

    this.scene.resizeWindow(350);

  }


  private nonCowRepositoryMaxLevel(): void {

    this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 120, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 70, 0, 16, 'green-progress').setOrigin(0, 0.5);

    this.scene.progressButton = this.scene.repositoryBtn(60, this.scene.state.lang[`sell${this.resource}`], this.money);
    this.scene.clickModalBtn(this.scene.progressButton, (): void => { this.sellResource() });

    this.scene.feedBoostText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 30, ' ', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5).setVisible(false);

    let button1 = this.scene.bigButton('red', 'center', 170, this.scene.state.lang.exchangeRepositoryBtn);
    this.scene.clickModalBtn(button1, (): void => { this.launchExchangeCurrencyModal() });

    this.scene.resizeWindow(330);

  }


  private cowRepositoryMaxLevel(): void {

    this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 100, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 60, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 60, 0, 16, 'green-progress').setOrigin(0, 0.5);

    if (this.scene.state.userCow.part === 2 && this.scene.state.userCow.tutorial < 40) {
      this.scene.progressButton = this.scene.bigButton('grey', 'left', 50, this.scene.state.lang.sellMilk, this.money);
      this.scene.clickModalBtn(this.scene.progressButton, (): void => {
        if (this.scene.state.territory.volume > 0) {
          this.scene.scene.stop();
          SpeechBubble.create(this.scene.game.scene.keys[`${this.farm}Bars`], this.scene.state.lang.doneNextTask, 3);
        }
      });
    } else {
      this.scene.progressButton = this.scene.bigButton('yellow', 'left', 50, this.scene.state.lang.sellMilk, this.money);
      this.scene.clickModalBtn(this.scene.progressButton, (): void => {
        if (this.scene.state.territory.volume > 0) {
          this.scene.scene.stop();
          if (this.scene.state.userCow.tutorial < 40) this.scene.game.scene.keys[this.farm].sellMilk();
          else this.scene.game.scene.keys[this.farm].showConfirmSellMilk();
        }
      });
    }
    
    if (this.scene.state.userCow.feedBoostTime > 0) {
      this.scene.feedBoostText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 20, ' ', {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5).setVisible(false);
    }

    let button1 = this.scene.bigButton('red', 'center', 130, this.scene.state.lang.exchangeRepositoryBtn);
    this.scene.clickModalBtn(button1, (): void => { this.launchExchangeCurrencyModal() });

    this.scene.resizeWindow(280);

  }

  private launchExchangeCurrencyModal(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.farm].scrolling.wheel = true;
    let modal: Imodal = {
      type: 1,
      sysType: 11
    }
    this.scene.state.modal = modal;
    this.scene.scene.start('Modal', this.scene.state);
  }


  private sellResource(): void {
    if (this.scene.state.territory.money > 0) {
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.farm].scrolling.wheel = true;
      this.scene.game.scene.keys[this.farm][`sell${this.resource}`]();
    }
  }

  private improveTerritory(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.farm].scrolling.wheel = true;
    if (this.farm !== 'Cow') this.scene.game.scene.keys[this.farm].improveTerritory();
    else this.scene.state.territory.improveTerritory();
  }

}