import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import SpeechBubble from "../../animations/SpeechBuble";

export default class FarmResourceRepositoryWindowNew {
  public scene: Modal;

  private resource: string;
  private farm: string;
  private config: Iconfig[];
  private currentLevel: number
  private nextLevel: number
  private money: any;


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
    // console.log('init ~ this.state', this.scene.state)

    this.config = this.scene.state.config
    this.currentLevel = this.scene.state.territory.improve - 1
    this.nextLevel = this.scene.state.territory.improve
    this.money = {
      icon: `${this.farm.toLowerCase()}Coin`,
      text: shortNum(this.scene.state.territory.money)
    };
  }


  private create(): void {
    let repository: string = this.scene.state.lang.repository.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(repository);

    if (this.config[this.nextLevel]) this.createRepository()
    else this.createRepositoryMaxLevel()
  }


  private createRepository(): void {
    if (this.scene.state.userSheep.part <= this.currentLevel + 1) {
      const icon = {
        icon: 'lock',
        text: `${this.scene.state.lang.shortPart} ${this.scene.state.userSheep.part + 1}`
      };

      const text = this.config[this.nextLevel] ? this.scene.state.lang.improveToLevel.replace('$1', String(this.nextLevel + 1)) : ''
      this.scene.bigButton('grey', 'left', 110, text, icon);

    } else {
      const cost = { icon: 'diamond', text: shortNum(this.config[this.nextLevel].repositoryCost) }
      const improveBtn = this.scene.bigButton('orange', 'left', 110, this.scene.state.lang.improveToLevel.replace('$1', String(this.nextLevel + 1)), cost);
      this.scene.clickModalBtn(improveBtn, (): void => { this.improveTerritory() });
    }

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 120, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 120, 0, 16, 'green-progress').setOrigin(0, 0.5);

    this.scene.progressButton = this.scene.repositoryBtn(10, this.scene.state.lang[`sell${this.resource}`], this.money);
    this.scene.clickModalBtn(this.scene.progressButton, (): void => { this.sellResource() });

    this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 160, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    if (this.scene.state[`user${this.farm}`].feedBoostTime > 0) {
      this.scene.feedBoostText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 80, ' ', {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5).setVisible(false);
    }

    const exchangeTerritoryBtn = this.scene.bigButton('red', 'center', 200, this.scene.state.lang.exchangeRepositoryBtn);
    this.scene.clickModalBtn(exchangeTerritoryBtn, (): void => { this.launchExchangeCurrencyModal(); });

    this.scene.resizeWindow(430);
  }


  private createRepositoryMaxLevel(): void {
    this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 120, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 70, 0, 16, 'green-progress').setOrigin(0, 0.5);

    this.scene.progressButton = this.scene.repositoryBtn(60, this.scene.state.lang[`sell${this.resource}`], this.money);
    this.scene.clickModalBtn(this.scene.progressButton, (): void => { this.sellResource() });

    if (this.scene.state[`user${this.farm}`].feedBoostTime > 0) {
      this.scene.feedBoostText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 30, ' ', {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5).setVisible(false);
    }

    let exchangeTerritoryBtn = this.scene.bigButton('red', 'center', 170, this.scene.state.lang.exchangeRepositoryBtn);
    this.scene.clickModalBtn(exchangeTerritoryBtn, (): void => { this.launchExchangeCurrencyModal() });
    this.scene.resizeWindow(330);
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