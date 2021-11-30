import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import Firework from "../../animations/Firework";
import BigButton from './../../Buttons/BigButton';
import Utils from './../../../libs/Utils';
import { TaskType } from "../../../local/tasks/types";

export default class ImproveCollectorWindowNew {
  public scene: Modal;

  private farm: string;
  private currentSpeedSettings: IcollectorPartSettings;
  private currentTimeSettings: IcollectorPartSettings;
  private nextSpeedSettings: IcollectorPartSettings;
  private nextTimeSettings: IcollectorPartSettings;
  private timeText: Phaser.GameObjects.Text;
  private speedText: Phaser.GameObjects.Text;
  private timeNextText: Phaser.GameObjects.Text;
  private speedNextText: Phaser.GameObjects.Text;
  private farmUser: IuserSheep | IuserChicken | IuserCow;

  private currentTime: number;
  private currentSpeed: number;
  private nextTime: number;
  private nextSpeed: number;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init()
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.farm = this.scene.state.farm;
    this.farmUser = this.scene.state[`user${this.farm}`];
    this.setLevelConfig()
    this.scene.resizeWindow(300);
  }

  private create(): void {
    const currentTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '32px',
      fontFamily: 'Bip',
      color: '#925C28',
    };

    const nextTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '32px',
      fontFamily: 'Bip',
      color: '#57A90E',
    }

    const resource: string = this.scene.state.farm === 'Sheep' ? 'wool' : 
    this.scene.state.farm === 'Chicken' ? 'egg' : 
    this.scene.state.farm === 'Cow' ? 'milk' : '';
    

    this.scene.textHeader.setText(`${this.scene.state.lang[`${resource}Collector`]}`);
    
    this.timeText = this.scene.add.text(
      this.scene.body.getTopLeft().x + 70,
      this.scene.body.getTopCenter().y + 30,
      '',
      currentTextStyle
    ).setOrigin(0)

    this.timeNextText = this.scene.add.text(
      this.timeText.getRightCenter().x + 10,
      this.timeText.y,
      '',
      nextTextStyle
    ).setOrigin(0)

    this.speedText = this.scene.add.text(
      this.scene.body.getLeftCenter().x + 70,
      this.scene.body.getCenter().y + 60,
      '',
      currentTextStyle
    ).setOrigin(0)

    this.speedNextText = this.scene.add.text(
      this.speedText.getRightCenter().x + 10,
      this.speedText.y,
      '',
      nextTextStyle
    ).setOrigin(0)

    this.setCurrentLevelInfoText()
    this.setNextLevelInfoText()
    this.createTimeBtn()
    this.createSpeedBtn()
  }


  private createTimeBtn(): void {
    if (!this.nextTime) {
      this.scene.add.text(
        this.scene.body.getCenter().x,
        this.timeText.getBottomCenter().y + 60,
        this.scene.state.lang.maxCollectortTimeLevel,
        { font: '28px Bip', color: '#925C28', align: 'center', wordWrap: { width: 560 } }
      ).setOrigin(0.5)

    } else if (this.farmUser.collectorTimeLevel >= this.farmUser.part) {
      const timeIcon = {
        icon: 'lock',
        text: this.nextTime ? `${this.scene.state.lang.shortPart} ${this.farmUser.part + 1}` : '',
      };
      const text = this.nextTime ? this.scene.state.lang.improveToLevel.replace('$1', String(this.farmUser.collectorTimeLevel + 1)) : this.scene.state.lang.max
      this.scene.bigButton('grey', 'left', -40, text, timeIcon);

    } else {
      const timeCost = { icon: `${this.farm.toLowerCase()}Coin`, text: shortNum(this.nextTimeSettings.improveTimePrice) };
      const settings: IbigButtonSetting = {
        color: 'green',
        textAlign: 'left',
        text: this.scene.state.lang.improveToLevel.replace('$1', String(this.farmUser.collectorTimeLevel + 1)),
        right1: timeCost,
      };
      if (Utils.checkSale(this.scene.state, `${this.scene.state.farm.toUpperCase()}_COLLECTOR_IMPROVE`)) {
        settings.right1.sale = shortNum(Math.floor(this.nextTimeSettings.improveTimePrice / 2));
      }
      const action = () => this.improveCollector('time');
      new BigButton(this.scene, -40, action, settings);
    }
  }


  private createSpeedBtn(): void {
    if (!this.nextSpeed) {
      this.scene.add.text(
        this.scene.body.getCenter().x,
        this.speedText.getBottomCenter().y + 60,
        this.scene.state.lang.maxCollectorLevel,
        { font: '28px Bip', color: '#925C28', align: 'center', wordWrap: { width: 560 } }
      ).setOrigin(0.5)

    } else if (this.farmUser.collectorLevel >= this.farmUser.part) {
      const timeIcon = {
        icon: 'lock',
        text: this.nextSpeed ? `${this.scene.state.lang.shortPart} ${this.farmUser.part + 1}` : '',
      };
      const text = this.nextSpeed ? this.scene.state.lang.improveToLevel.replace('$1', String(this.farmUser.collectorLevel + 1)) : this.scene.state.lang.max
      this.scene.bigButton('grey', 'left', 140, text, timeIcon);

    } else {
      const sale = Utils.checkSale(this.scene.state, `${this.scene.state.farm.toUpperCase()}_COLLECTOR_IMPROVE`);
      const speedCost = { icon: 'diamond', text: shortNum(this.nextSpeedSettings.imporveSpeedPrice) }
      const settings: IbigButtonSetting = {
        color: 'green',
        textAlign: 'left',
        text: this.scene.state.lang.improveToLevel.replace('$1',String(this.farmUser.collectorLevel + 1)),
        right1: speedCost,
      };
      if (sale) {
        settings.right1.sale = shortNum(Math.floor(this.nextTimeSettings.imporveSpeedPrice / 2));
      }
      const action = () => {
        const modal: Imodal = {
          type: 1,
          sysType: 24,
          confirmSpendParams: {
            type: `ImproveCollectorSpeed${this.scene.state.farm}`,
            level: this.farmUser.collectorLevel + 1,
            price: sale ? Math.floor(this.nextTimeSettings.imporveSpeedPrice / 2) : this.nextSpeedSettings.imporveSpeedPrice, 
            callback: () => this.improveCollector('speed'),
          }
        }
        this.scene.state.modal = modal;
        this.scene.scene.restart(this.scene.state);
      }
      new BigButton(this.scene, 140, action, settings);
    }
  }


  private improveCollector(improveType: string): void {
    const sale = Utils.checkSale(this.scene.state, `${this.scene.state.farm.toUpperCase()}_COLLECTOR_IMPROVE`);
    const speedPrice = sale ? Math.round(this.nextSpeedSettings.imporveSpeedPrice / 2) : this.nextSpeedSettings.imporveSpeedPrice;
    const timePrice = sale ? Math.round(this.nextTimeSettings.improveTimePrice / 2) : this.nextTimeSettings.improveTimePrice;

    if (this.checkImprove(improveType)) {
      if (improveType === 'time') {
        this.scene.state[`user${this.farm}`].collectorTimeLevel++;
        this.scene.game.scene.keys[this.farm].tryTask(TaskType.IMPROVE_COLLECTOR);
        this.farmUser.money -= timePrice;
      } else if (improveType === 'speed') {
        this.scene.state[`user${this.farm}`].collectorLevel++;
        const price = speedPrice;
        this.scene.state.user.diamonds -= price;
        this.scene.game.scene.keys[this.scene.state.farm].tryTask(15, 0, price);
        this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
          type: 'improve_collector',
          count: price,
        });
      }
      this.closeAndFireworksBlow();

    } else {
      if (improveType === 'time') {
        let count: number = timePrice - this.farmUser.money;
        let diamonds: number = this.scene.game.scene.keys[this.scene.state.farm].convertMoney(count);
        this.scene.state.convertor = { fun: 8, count, diamonds, type: 1 }
        this.scene.state.modal = { type: 1, sysType: 4 };

      } else if (improveType === 'speed') {
        let count: number = speedPrice - this.scene.state.user.diamonds
        let diamonds: number = speedPrice - this.scene.state.user.diamonds
        this.scene.state.convertor = { fun: 8, count, diamonds, type: 2 }
        this.scene.state.modal = { type: 1, sysType: 4 };
      }

      this.scene.scene.restart(this.scene.state);
    }
  }


  private checkImprove(improveType: string): boolean {
    const sale = Utils.checkSale(this.scene.state, `${this.scene.state.farm.toUpperCase()}_COLLECTOR_IMPROVE`);
    const speedPrice = sale ? Math.round(this.nextSpeedSettings.imporveSpeedPrice / 2) : this.nextSpeedSettings.imporveSpeedPrice;
    const timePrice = sale ? Math.round(this.nextTimeSettings.improveTimePrice / 2) : this.nextTimeSettings.improveTimePrice;
    return improveType === 'time' 
    && this.farmUser.money >= timePrice 
    || improveType === 'speed' 
    && this.scene.state.user.diamonds >= speedPrice;
  }


  private setLevelConfig(): void {
    const farmSettings: IsheepSettings | IchickenSettings | IcowSettings = this.scene.state[`${this.farm.toLowerCase()}Settings`];
    this.currentSpeedSettings = farmSettings.partSettings[this.farmUser.collectorLevel - 1].collector;
    this.currentTimeSettings = farmSettings.partSettings[this.farmUser.collectorTimeLevel - 1].collector;
    this.nextSpeedSettings = farmSettings.partSettings[this.farmUser.collectorLevel]?.collector || null;
    this.nextTimeSettings = farmSettings.partSettings[this.farmUser.collectorTimeLevel]?.collector || null;
    
    this.currentTime = this.currentTimeSettings.time;
    this.currentSpeed = this.currentSpeedSettings.speed;
    this.nextTime = this.nextTimeSettings?.time || null;
    this.nextSpeed = this.nextSpeedSettings?.speed || null;
  }

  private setCurrentLevelInfoText(): void {
    this.timeText.setText(`${this.scene.state.lang.duration}: ${this.currentTime} ${this.scene.state.lang.minutes}`)
    this.speedText.setText(`${this.scene.state.lang.speed}: ${this.currentSpeed} ${this.scene.state.lang[`unit${this.scene.state.farm}`]}/${this.scene.state.lang.seconds}`)
  }

  private setNextLevelInfoText(): void {
    if (this.nextTime) this.timeNextText.setText(`+${this.nextTime - this.currentTime}`).setX(this.timeText.getRightCenter().x + 10)
    else this.timeNextText.setText('')
    if (this.nextSpeed) this.speedNextText.setText(`+${(this.nextSpeed - this.currentSpeed).toFixed(1)}`).setX(this.speedText.getRightCenter().x + 10)
    else this.speedNextText.setText('')
  }

  private closeAndFireworksBlow(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.scrollY = 0;
    new Firework(this.scene.game.scene.keys[this.scene.state.farm], { x: this.scene.cameras.main.centerX, y: 340 }, 3)
  }
}