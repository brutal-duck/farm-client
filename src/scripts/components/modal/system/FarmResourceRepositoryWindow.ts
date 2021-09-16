import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import SpeechBubble from "../../animations/SpeechBuble";
const bonusTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'Bip',
  fontSize: '20px',
  color: '#925C28',
};
export default class FarmResourceRepositoryWindow {
  public scene: Modal;

  private resource: string;
  private farm: string;
  private settings: IterritoriesSheepSettings | IterritoriesChickenSettings | IterritoriesCowSettings;
  private money: any;
  private territoriesSettings: IterritoriesSheepSettings[] | IterritoriesChickenSettings[] | IterritoriesCowSettings[];

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }


  private init(): void {
    this.farm = this.scene.state.farm;
    if (this.farm === 'Sheep') this.resource = 'Wool';
    else if (this.farm === 'Chicken') this.resource = 'Eggs';
    else if (this.farm === 'Cow') this.resource = 'Milk';

    this.territoriesSettings = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`territories${this.scene.state.farm}Settings`];

    this.settings = this.territoriesSettings
      .find((data: IterritoriesSheepSettings | IterritoriesChickenSettings | IterritoriesCowSettings) => data.improve === this.scene.state.territory.improve + 1);
    this.money = {
      icon: `${this.farm.toLowerCase()}Coin`,
      text: shortNum(this.scene.state.territory.money)
    };
  }


  private create(): void {
    let repository: string = this.scene.state.lang.repository.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(repository);

    if (this.farm !== 'Cow' && this.scene.state.territory.improve < this.territoriesSettings.length) {
      this.nonCowRepositoryUpgradeAvalable();
    } else if (this.farm === 'Cow' && this.scene.state.territory.improve < this.territoriesSettings.length) {
      this.cowRepositoryApgradeAvalable();
    } else {
      if (this.farm !== 'Cow') this.nonCowRepositoryMaxLevel();
      else this.cowRepositoryMaxLevel();
    }
  }


  private nonCowRepositoryUpgradeAvalable(): void {
    let padding: number = 0;

    if (this.scene.state[`user${this.farm}`].feedBoostTime > 0) {
      padding += 20;
      const bonusHeader: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 100, this.scene.state.lang.priceBonus, bonusTextStyle).setOrigin(0, 0.5);
      const textFeed: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 70, '+100%', bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
      this.scene.feedBoostText = this.scene.add.text(textFeed.getBounds().right + 5, this.scene.cameras.main.centerY - 70, ' ', bonusTextStyle).setOrigin(0, 0.5).setVisible(false);
      if (this.scene.state.clan) {
        padding += 20;
        bonusHeader.setY(bonusHeader.y - padding / 2);
        textFeed.setY(textFeed.y - padding / 2);
        this.scene.feedBoostText.setY(this.scene.feedBoostText.y - padding / 2);
        const str: string = `+${this.scene.state.clan[this.scene.state.farm.toLowerCase()].level}%`;
        const text: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 60, str, bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
        this.scene.add.text(text.getBounds().right + 5, this.scene.cameras.main.centerY - 60,  this.scene.state.lang.fromClanFarm, bonusTextStyle).setOrigin(0, 0.5);
      }
    } else if (this.scene.state.clan) {
      this.scene.add.text(160, this.scene.cameras.main.centerY - 95, this.scene.state.lang.priceBonus, bonusTextStyle).setOrigin(0, 0.5);
      padding += 20;
      const str: string = `+${this.scene.state.clan[this.scene.state.farm.toLowerCase()].level}%`;
      const text: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 70, str, bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
      this.scene.add.text(text.getBounds().right + 5, this.scene.cameras.main.centerY - 70,  this.scene.state.lang.fromClanFarm, bonusTextStyle).setOrigin(0, 0.5);
    }

    if (this.scene.state[`user${this.scene.state.farm}`].part >= this.settings.unlock_improve) {
      let improve: any;
      if (this.settings.improveStorageMoneyPrice) {
        improve = {
          icon: `${this.scene.state.farm.toLowerCase()}Coin`,
          text: shortNum(this.settings.improveStorageMoneyPrice)
        };
      } else if (this.settings.improveStorageDiamondPrice) {
        improve = {
          icon: 'diamond',
          text: shortNum(this.settings.improveStorageDiamondPrice)
        };
      }
      let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
      const button = this.scene.bigButton('orange', 'left', 110 + padding / 2, improveText, improve);
      this.scene.clickModalBtn(button, (): void => { this.improveTerritory() });
    } else {
      const improve = {
        icon: 'lock',
        text: this.scene.state.lang.shortPart + ' ' + this.settings.unlock_improve
      };
      let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
      this.scene.bigButton('grey', 'left', 110 + padding / 2, improveText, improve);
    }


    this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 160 - padding, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 120 - padding, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 120 - padding, 0, 16, 'green-progress').setOrigin(0, 0.5);

    this.scene.progressButton = this.scene.repositoryBtn(10 + padding / 2, this.scene.state.lang[`sell${this.resource}`], this.money);
    this.scene.clickModalBtn(this.scene.progressButton, (): void => {this.sellResource()});
    


    const button1 = this.scene.bigButton('red', 'center', 200 + padding / 2, this.scene.state.lang.exchangeRepositoryBtn);
    this.scene.clickModalBtn(button1, (): void => { this.launchExchangeCurrencyModal(); });

    this.scene.resizeWindow(430 + padding);
  }


  private cowRepositoryApgradeAvalable(): void {
    let padding: number = 0;

    if (this.scene.state[`user${this.farm}`].feedBoostTime > 0) {
      padding += 10;
      const bonusHeader: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 100 + 35, this.scene.state.lang.quantityBonus, bonusTextStyle).setOrigin(0, 0.5);
      const textFeed: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 70 + 35, '+100%', bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
      this.scene.feedBoostText = this.scene.add.text(textFeed.getBounds().right + 5, this.scene.cameras.main.centerY - 70 + 35, ' ', bonusTextStyle).setOrigin(0, 0.5).setVisible(false);
      if (this.scene.state.clan) {
        padding += 10;
        bonusHeader.setY(bonusHeader.y - padding);
        textFeed.setY(textFeed.y - padding);
        this.scene.feedBoostText.setY(this.scene.feedBoostText.y - padding);
        const str: string = `+${this.scene.state.clan[this.scene.state.farm.toLowerCase()].level}%`;
        const text: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 60 + 35, str, bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
        this.scene.add.text(text.getBounds().right + 5, this.scene.cameras.main.centerY - 60 + 35,  this.scene.state.lang.fromClanFarm, bonusTextStyle).setOrigin(0, 0.5);
      }
    } else if (this.scene.state.clan) {
      this.scene.add.text(160, this.scene.cameras.main.centerY - 95 + 25, this.scene.state.lang.quantityBonus, bonusTextStyle).setOrigin(0, 0.5);
      padding += 10;
      const str: string = `+${this.scene.state.clan[this.scene.state.farm.toLowerCase()].level}%`;
      const text: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 70 + 25, str, bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
      this.scene.add.text(text.getBounds().right + 5, this.scene.cameras.main.centerY - 70 + 25,  this.scene.state.lang.fromClanFarm, bonusTextStyle).setOrigin(0, 0.5);
    }

    if (this.scene.state.userCow.part >= this.settings.unlock_improve) {

      let improve: any;
      if (this.settings.improveStorageMoneyPrice) {
        improve = {
          icon: `${this.scene.state.farm.toLowerCase()}Coin`,
          text: shortNum(this.settings.improveStorageMoneyPrice)
        };
      } else if (this.settings.improveStorageDiamondPrice) {
        improve = {
          icon: 'diamond',
          text: shortNum(this.settings.improveStorageDiamondPrice)
        };
      }
      let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
      const button = this.scene.bigButton('orange', 'left', 90 + padding, improveText, improve);
      this.scene.clickModalBtn(button, (): void => { this.improveTerritory() });

    } else {
      
      const improve = {
        icon: 'lock',
        text: this.scene.state.lang.shortPart + ' ' + this.settings.unlock_improve
      };
      let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
      this.scene.bigButton('grey', 'left', 90 + padding, improveText, improve);

    }

    this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 140 - padding, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 100 - padding, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 100 - padding, 0, 16, 'green-progress').setOrigin(0, 0.5);

    if (this.scene.state.userCow.part === 2 && this.scene.state.userCow.tutorial < 40) {
      this.scene.progressButton = this.scene.bigButton('grey', 'left', 10 + padding, this.scene.state.lang.sellMilk, this.money);
      this.scene.clickModalBtn(this.scene.progressButton, (): void => {
        if (this.scene.state.territory.volume > 0) {
          this.scene.scene.stop();
          SpeechBubble.create(this.scene.game.scene.keys[`${this.farm}Bars`], this.scene.state.lang.doneNextTask, 3);
        }
      });
    } else {
      this.scene.progressButton = this.scene.bigButton('yellow', 'left', 10 + padding, this.scene.state.lang.sellMilk, this.money);
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

    let button1 = this.scene.bigButton('red', 'center', 170 + padding, this.scene.state.lang.exchangeRepositoryBtn);
    this.scene.clickModalBtn(button1, (): void => { this.launchExchangeCurrencyModal() });

    this.scene.resizeWindow(370 + padding);
  }

  private nonCowRepositoryMaxLevel(): void {
    let padding: number = 0;

    if (this.scene.state[`user${this.farm}`].feedBoostTime > 0) {
      padding += 10;
      const bonusHeader: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 100 + 55, this.scene.state.lang.priceBonus, bonusTextStyle).setOrigin(0, 0.5);
      const textFeed: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 70 + 55, '+100%', bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
      this.scene.feedBoostText = this.scene.add.text(textFeed.getBounds().right + 5, this.scene.cameras.main.centerY - 70 + 55, ' ', bonusTextStyle).setOrigin(0, 0.5).setVisible(false);
      if (this.scene.state.clan) {
        padding += 10;
        bonusHeader.setY(bonusHeader.y - padding);
        textFeed.setY(textFeed.y - padding);
        this.scene.feedBoostText.setY(this.scene.feedBoostText.y - padding);
        padding += 10;
        const str: string = `+${this.scene.state.clan[this.scene.state.farm.toLowerCase()].level}%`;
        const text: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 60 + 55, str, bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
        this.scene.add.text(text.getBounds().right + 5, this.scene.cameras.main.centerY - 60 + 55,  this.scene.state.lang.fromClanFarm, bonusTextStyle).setOrigin(0, 0.5);
      }
    } else if (this.scene.state.clan) {
      this.scene.add.text(160, this.scene.cameras.main.centerY - 95 + 55, this.scene.state.lang.priceBonus, bonusTextStyle).setOrigin(0, 0.5);
      padding += 10;
      const str: string = `+${this.scene.state.clan[this.scene.state.farm.toLowerCase()].level}%`;
      const text: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 70 + 55, str, bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
      this.scene.add.text(text.getBounds().right + 5, this.scene.cameras.main.centerY - 70 + 55,  this.scene.state.lang.fromClanFarm, bonusTextStyle).setOrigin(0, 0.5);
    }

    this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 120 - padding, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70 - padding, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 70 - padding, 0, 16, 'green-progress').setOrigin(0, 0.5);

    this.scene.progressButton = this.scene.repositoryBtn(60 + padding, this.scene.state.lang[`sell${this.resource}`], this.money);
    this.scene.clickModalBtn(this.scene.progressButton, (): void => { this.sellResource() });

    let button1 = this.scene.bigButton('red', 'center', 170 + padding / 2, this.scene.state.lang.exchangeRepositoryBtn);
    this.scene.clickModalBtn(button1, (): void => { this.launchExchangeCurrencyModal() });

    this.scene.resizeWindow(340 + padding + 10);
  }


  private cowRepositoryMaxLevel(): void {
    let padding: number = 0;

    if (this.scene.state[`user${this.farm}`].feedBoostTime > 0) {
      padding += 10;
      const bonusHeader: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 100 + 70, this.scene.state.lang.quantityBonus, bonusTextStyle).setOrigin(0, 0.5);
      const textFeed: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 70 + 70, '+100%', bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
      this.scene.feedBoostText = this.scene.add.text(textFeed.getBounds().right + 5, this.scene.cameras.main.centerY - 70 + 70, ' ', bonusTextStyle).setOrigin(0, 0.5).setVisible(false);
      if (this.scene.state.clan) {
        padding += 10;
        bonusHeader.setY(bonusHeader.y - padding);
        textFeed.setY(textFeed.y - padding);
        this.scene.feedBoostText.setY(this.scene.feedBoostText.y - padding);
        padding += 10;
        const str: string = `+${this.scene.state.clan[this.scene.state.farm.toLowerCase()].level}%`;
        const text: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 60 + 70, str, bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
        this.scene.add.text(text.getBounds().right + 5, this.scene.cameras.main.centerY - 60 + 70,  this.scene.state.lang.fromClanFarm, bonusTextStyle).setOrigin(0, 0.5);
      }
    } else if (this.scene.state.clan) {
      this.scene.add.text(160, this.scene.cameras.main.centerY - 95 + 65, this.scene.state.lang.quantityBonus, bonusTextStyle).setOrigin(0, 0.5);
      padding += 10;
      const str: string = `+${this.scene.state.clan[this.scene.state.farm.toLowerCase()].level}%`;
      const text: Phaser.GameObjects.Text = this.scene.add.text(160, this.scene.cameras.main.centerY - 70 + 65, str, bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
      this.scene.add.text(text.getBounds().right + 5, this.scene.cameras.main.centerY - 70 + 65,  this.scene.state.lang.fromClanFarm, bonusTextStyle).setOrigin(0, 0.5);
    }

    this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 100 - padding, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 60 - padding, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 60 - padding, 0, 16, 'green-progress').setOrigin(0, 0.5);

    if (this.scene.state.userCow.part === 2 && this.scene.state.userCow.tutorial < 40) {
      this.scene.progressButton = this.scene.bigButton('grey', 'left', 50 + padding, this.scene.state.lang.sellMilk, this.money);
      this.scene.clickModalBtn(this.scene.progressButton, (): void => {
        if (this.scene.state.territory.volume > 0) {
          this.scene.scene.stop();
          SpeechBubble.create(this.scene.game.scene.keys[`${this.farm}Bars`], this.scene.state.lang.doneNextTask, 3);
        }
      });
    } else {
      this.scene.progressButton = this.scene.bigButton('yellow', 'left', 50 + padding, this.scene.state.lang.sellMilk, this.money);
      this.scene.clickModalBtn(this.scene.progressButton, (): void => {
        if (this.scene.state.territory.volume > 0) {
          this.scene.scene.stop();
          if (this.scene.state.userCow.tutorial < 40) this.scene.game.scene.keys[this.farm].sellMilk();
          else this.scene.game.scene.keys[this.farm].showConfirmSellMilk();
        }
      });
    }
    
    const button1 = this.scene.bigButton('red', 'center', 130 + padding, this.scene.state.lang.exchangeRepositoryBtn);
    this.scene.clickModalBtn(button1, (): void => { this.launchExchangeCurrencyModal(); });

    this.scene.resizeWindow(290 + padding);
  }

  private launchExchangeCurrencyModal(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.farm].scrolling.wheel = true;
    const modal: Imodal = {
      type: 1,
      sysType: 11
    };
    this.scene.state.modal = modal;
    this.scene.scene.start('Modal', this.scene.state);
  }


  private sellResource(): void {
    if (this.scene.state.territory.money > 0) {
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.farm].scrolling.wheel = true;
      this.scene.state.territory.sellResource();
    }
  }

  private improveTerritory(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.farm].scrolling.wheel = true;
    this.scene.state.territory.improveTerritory();
  }

}