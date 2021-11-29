import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import SpeechBubble from "../../animations/SpeechBuble";
import BigButton from './../../Buttons/BigButton';
import Utils from './../../../libs/Utils';
const bonusTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'Bip',
  fontSize: '20px',
  color: '#925C28',
};
export default class FarmResourceRepositoryWindowNew {
  public scene: Modal;

  private resource: string;
  private farm: string;
  private currentSettings: IterritoriesPartSettings;
  private nextSettings: IterritoriesPartSettings;
  private money: any;
  private partSettings: IpartSettings[];
  private padding: number;
  private farmUser: IuserSheep | IuserChicken | IuserCow;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }


  private init(): void {
    this.padding = 0;
    this.farm = this.scene.state.farm;
    if (this.farm === 'Sheep') this.resource = 'Wool';
    else if (this.farm === 'Chicken') this.resource = 'Eggs';
    else if (this.farm === 'Cow') this.resource = 'Milk';

    this.farmUser = this.scene.state[`user${this.scene.state.farm}`];
    this.partSettings = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].partSettings;

    this.currentSettings = this.partSettings[this.scene.state.territory.improve - 1].territory;
    this.nextSettings = this.partSettings[this.scene.state.territory.improve]?.territory || null;
    this.money = {
      icon: `${this.farm.toLowerCase()}Coin`,
      text: shortNum(this.scene.state.territory.money)
    };
  }


  private create(): void {
    let repository: string = this.scene.state.lang.repository.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(repository);

    if (this.farm !== 'Cow' && this.scene.state.territory.improve < this.partSettings.length) {
      this.nonCowRepositoryUpgradeAvalable();
    } else if (this.farm === 'Cow' && this.scene.state.territory.improve < this.partSettings.length) {
      this.cowRepositoryApgradeAvalable();
    } else {
      if (this.farm !== 'Cow') this.nonCowRepositoryMaxLevel();
      else this.cowRepositoryMaxLevel();
    }
  }


  private nonCowRepositoryUpgradeAvalable(): void {
    this.createBoostInfoAndSetPadding(this.scene.cameras.main.centerY - 100);
    this.createProgress(this.scene.cameras.main.centerY - 160 - this.padding - 2);
    this.createSellResourceBtn(this.padding / 2);
    this.createImproveBtn(100 + this.padding / 2);
    this.createExchangeBtn(180 + this.padding / 2);
    this.scene.resizeWindow(430 + this.padding);
  }

  private nonCowRepositoryMaxLevel(): void {
    this.createBoostInfoAndSetPadding(this.scene.cameras.main.centerY - 50);
    this.createProgress(this.scene.cameras.main.centerY - 120 - this.padding);
    this.createSellResourceBtn(60 + this.padding / 2);
    this.createExchangeBtn(160 + this.padding / 2);
    this.scene.resizeWindow(340 + this.padding + 10);
  }

  private cowRepositoryApgradeAvalable(): void {
    this.createBoostInfoAndSetPadding(this.scene.cameras.main.centerY - 80);
    this.createProgress(this.scene.cameras.main.centerY - 150 - this.padding);
    this.createSellMilkBtn(this.padding);
    this.createImproveBtn(80 + this.padding);
    this.createExchangeBtn(160 + this.padding);
    this.scene.resizeWindow(370 + this.padding);
  }

  private cowRepositoryMaxLevel(): void {
    this.createBoostInfoAndSetPadding(this.scene.cameras.main.centerY - 30);
    this.createProgress(this.scene.cameras.main.centerY - 100 - this.padding);
    this.createSellMilkBtn(50 + this.padding);
    this.createExchangeBtn(130 + this.padding);
    this.scene.resizeWindow(290 + this.padding);
  }

  /**
   * Функция создает информацию по бустам и устанавливает смещение
   * @param startY Верхняя координата Y
   */
  private createBoostInfoAndSetPadding(startY: number): void {
    if (this.scene.state[`user${this.farm}`].feedBoostTime > 0) {
      this.padding += 20;
      const bonusHeader: Phaser.GameObjects.Text = this.scene.add.text(160, startY, this.scene.state.lang.priceBonus, bonusTextStyle).setOrigin(0, 0.5);
      const textFeed: Phaser.GameObjects.Text = this.scene.add.text(160, startY + 30, '+100%', bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
      this.scene.feedBoostText = this.scene.add.text(textFeed.getBounds().right + 5, startY + 30, ' ', bonusTextStyle).setOrigin(0, 0.5).setVisible(false);
      if (this.scene.state.clan) {
        this.padding += 20;
        bonusHeader.setY(bonusHeader.y - this.padding / 2);
        textFeed.setY(textFeed.y - this.padding / 2);
        this.scene.feedBoostText.setY(this.scene.feedBoostText.y - this.padding / 2);
        const clanFarm: IclanFarm = this.scene.state.clan[this.scene.state.farm.toLowerCase()];
        const percent: number = clanFarm.cooldown > 0 ? clanFarm.level - 1 : clanFarm.level;
        const str: string = `+${percent}%`;
        const text: Phaser.GameObjects.Text = this.scene.add.text(160, startY + 40, str, bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
        this.scene.add.text(text.getBounds().right + 5, startY + 40, this.scene.state.lang.fromClanFarm, bonusTextStyle).setOrigin(0, 0.5);
      }
    } else if (this.scene.state.clan) {
      this.scene.add.text(160, startY + 5, this.scene.state.lang.priceBonus, bonusTextStyle).setOrigin(0, 0.5);
      this.padding += 20;
      const clanFarm: IclanFarm = this.scene.state.clan[this.scene.state.farm.toLowerCase()];
      const percent: number = clanFarm.cooldown > 0 ? clanFarm.level - 1 : clanFarm.level;
      const str: string = `+${percent}%`;
      const text: Phaser.GameObjects.Text = this.scene.add.text(160, startY + 30, str, bonusTextStyle).setColor('#57A90E').setOrigin(0, 0.5);
      this.scene.add.text(text.getBounds().right + 5, startY + 30, this.scene.state.lang.fromClanFarm, bonusTextStyle).setOrigin(0, 0.5);
    }
  }

  /**
   * Функция создает кнопку улучшения хранилища
   * @param y Смещение по Y относительно цетнра
   */
  private createImproveBtn(y: number) {
    const sale = Utils.checkSale(this.scene.state, `${this.scene.state.farm.toUpperCase()}_REPOSITORY_IMPROVE`);
    let action = (): void => { this.improveTerritory(); };
    const improveSettings: IbigButtonSetting = {
      text: this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1),
      color: 'orange',
      textAlign: 'left',
      right1: {
        icon: 'diamond',
        text: shortNum(this.nextSettings.improveRepositoryPrice),
        sale: sale ? shortNum(Math.floor(this.nextSettings.improveRepositoryPrice / 2)) : null,
      }
    };
    if (this.scene.state.territory.improve >= this.farmUser.part) {
      action = null;
      improveSettings.color = 'grey';
      improveSettings.right1 = {
        icon: 'lock',
        text: `${this.scene.state.lang.shortPart} ${this.farmUser.part + 1}`,
      };
    }
    new BigButton(this.scene, y, action, improveSettings);
  }

  /**
   * Функция создает кнопку обмена хранилища
   * @param y Смещение по Y относительно цетнра
   */
  private createExchangeBtn(y: number): void {
    new BigButton(this.scene, y, () => { this.launchExchangeCurrencyModal(); }, {
      color: 'red',
      textAlign: 'center',
      text: this.scene.state.lang.exchangeRepositoryBtn,
    });
  }
  
  /**
   * Функция создает на сцене прогресс бар и текст
   * @param startY Верхняя координата Y
   */
  private createProgress(startY: number): void {
    this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, startY, '', {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, startY + 50, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, startY + 50, 0, 16, 'green-progress').setOrigin(0, 0.5);
  }

  /**
   * Функция создает кнопку для продажи ресурсов
   * @param y Смещение по Y относительно цетнра
   */
  private createSellResourceBtn(y: number): void {
    this.scene.progressButton = this.scene.repositoryBtn(y, this.scene.state.lang[`sell${this.resource}`], this.money);
    this.scene.clickModalBtn(this.scene.progressButton, (): void => { this.sellResource(); });
  }

  /**
   * Функция создает кнопку продажи молока
   * @param y Смещение по Y относительно цетнра
   */
  private createSellMilkBtn(y: number): void {   
    if (this.scene.state.userCow.part === 2 && this.scene.state.userCow.tutorial < 40) {
      this.scene.progressButton = this.scene.bigButton('grey', 'left', y, this.scene.state.lang.sellMilk, this.money);
      this.scene.clickModalBtn(this.scene.progressButton, (): void => {
        if (this.scene.state.territory.volume > 0) {
          this.scene.scene.stop();
          SpeechBubble.create(this.scene.game.scene.keys[`${this.farm}Bars`], this.scene.state.lang.doneNextTask, 3);
        }
      });
    } else {
      this.scene.progressButton = this.scene.bigButton('yellow', 'left', y, this.scene.state.lang.sellMilk, this.money);
      this.scene.clickModalBtn(this.scene.progressButton, (): void => {
        if (this.scene.state.territory.volume > 0) {
          this.scene.scene.stop();
          if (this.scene.state.userCow.tutorial < 40)
            this.scene.game.scene.keys[this.farm].sellMilk();
          else
            this.scene.game.scene.keys[this.farm].showConfirmSellMilk();
        }
      });
    }
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
      const settignsArray: Array<IterritoriesSheepSettings | IterritoriesChickenSettings> = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`territories${this.scene.state.farm}Settings`];
      const settings = settignsArray.find(el => el.improve === this.scene.state.territory.improve);
      const half = Math.round(settings.storage / 2);
      if (this.scene.state.territory.volume >= half && this.scene.state.userSheep.part >= 4 && this.scene.state.farm !== 'Cow' && this.scene.state.readyAd) {
        this.scene.state.modal = { type: 1, sysType: 27 };
        this.scene.scene.restart(this.scene.state);
      } else {
        this.scene.scene.stop();
        this.scene.game.scene.keys[this.farm].scrolling.wheel = true;
        this.scene.state.territory.sellResource();
      }
    }
  }

  private improveTerritory(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.farm].scrolling.wheel = true;
    this.scene.state.territory.improveTerritory();
  }

}