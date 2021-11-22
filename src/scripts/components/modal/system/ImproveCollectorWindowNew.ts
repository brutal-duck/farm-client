import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import Firework from "../../animations/Firework";

export default class ImproveCollectorWindowNew {
  public scene: Modal;

  private farm: string
  private partSettings: IpartSettings;
  private currentSettings: IpartSettings;
  private currentTimeSettings: IpartSettings;
  private nextSettings: IpartSettings;
  private nextTimeSettings: IpartSettings;
  private timeText: Phaser.GameObjects.Text
  private speedText: Phaser.GameObjects.Text
  private timeNextText: Phaser.GameObjects.Text
  private speedNextText: Phaser.GameObjects.Text
  private farmUser: IuserSheep | IuserChicken | IuserCow;

  private currentTimeLevel: number
  private currentSpeedLevel: number
  private nextTimeLevel: number
  private nextSpeedLevel: number

  constructor(scene: Modal) {
    this.scene = scene;
    this.init()
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.farm = this.scene.state.farm;
    this.farmUser = this.scene.state[`user${this.farm}`];
    const farmSettings: IsheepSettings | IchickenSettings | IcowSettings = this.scene.state[`${this.farm.toLowerCase()}Settings`];
    this.currentSettings = farmSettings.partSettings[this.farmUser.collectorLevel - 1];
    this.currentTimeSettings = farmSettings.partSettings[this.farmUser.collectorTimeLevel - 1];
    this.nextSettings = farmSettings.partSettings[this.farmUser.collectorLevel];
    this.nextTimeSettings = farmSettings.partSettings[this.farmUser.collectorTimeLevel];

    this.partSettings = farmSettings.partSettings[this.farmUser.part - 1];
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
      this.scene.body.getTopCenter().y + 10,
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
      this.scene.body.getCenter().y + 40,
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
    if (!this.nextTimeLevel) {
      this.scene.add.text(
        this.scene.body.getCenter().x,
        this.timeText.getBottomCenter().y + 60,
        this.scene.state.lang.maxCollectortTimeLevel,
        { font: '28px Bip', color: '#925C28', align: 'center', wordWrap: { width: 560 } }
      ).setOrigin(0.5)

    } else if (this.farmUser.part <= this.farmUser.collectorTimeLevel + 1) {
      const timeIcon = {
        icon: 'lock',
        text: this.nextTimeLevel ? `${this.scene.state.lang.shortPart} ${this.farmUser.part + 1}` : '',
      };
      const text = this.nextTimeLevel ? this.scene.state.lang.improveToLevel.replace('$1', String(this.farmUser.collectorTimeLevel + 2)) : this.scene.state.lang.max
      this.scene.bigButton('grey', 'left', -40, text, timeIcon);

    } else {
      const timeCost = { icon: `${this.farm.toLowerCase()}Coin`, text: shortNum(
        this.currentSettings[this.farmUser.collectorTimeLevel + 1].collectorTimeCost) }
      const improveTime = this.scene.bigButton('green', 'left', -40, this.scene.state.lang.improveToLevel.replace('$1', String(this.farmUser.collectorTimeLevel + 2)), timeCost);
      this.scene.clickModalBtn(improveTime, (): void => { this.improveCollector(improveTime, 'time') });
    }
  }


  private createSpeedBtn(): void {
    if (!this.nextSpeedLevel) {
      this.scene.add.text(
        this.scene.body.getCenter().x,
        this.speedText.getBottomCenter().y + 60,
        this.scene.state.lang.maxCollectorLevel,
        { font: '28px Bip', color: '#925C28', align: 'center', wordWrap: { width: 560 } }
      ).setOrigin(0.5)

    } else if (this.farmUser.part <= this.farmUser.collectorLevel + 1) {
      const timeIcon = {
        icon: 'lock',
        text: this.nextSpeedLevel ? `${this.scene.state.lang.shortPart} ${this.farmUser.part + 1}` : '',
      };
      const text = this.nextSpeedLevel ? this.scene.state.lang.improveToLevel.replace('$1', String(this.farmUser.collectorLevel + 2)) : this.scene.state.lang.max
      this.scene.bigButton('grey', 'left', 140, text, timeIcon);

    } else {
      const speedCost = { icon: 'diamond', text: shortNum(this.currentSettings[this.farmUser.collectorLevel + 1].collectorSpeedCost) }
      const improveSpeed = this.scene.bigButton('green', 'left', 140, this.scene.state.lang.improveToLevel.replace('$1', String(this.farmUser.collectorLevel + 2)), speedCost);
      this.scene.clickModalBtn(improveSpeed, (): void => { this.improveCollector(improveSpeed, 'speed') });
    }
  }


  private improveCollector(
    btn: {
      btn: Phaser.GameObjects.Sprite,
      img1: Phaser.GameObjects.Sprite,
      img2: Phaser.GameObjects.Sprite,
      text1: Phaser.GameObjects.Text
      text2: Phaser.GameObjects.Text
      title: Phaser.GameObjects.Text
    },
    improveType: string
  ): void {
    if (this.improveCollectorPayment(improveType)) {
      Object.values(btn).forEach(el => { el?.destroy() })
      
      if (improveType === 'time') {
        this.scene.state[`user${this.farm}`].collectorTimeLevel++
        this.scene.game.scene.keys[this.farm].tryTask(23, 0, 0, this.scene.state[`user${this.farm}`].collectorTimeLevel + 1);
        this.setLevelConfig()
        this.createTimeBtn()
      } else if (improveType === 'speed') {
        this.scene.state[`user${this.farm}`].collectorLevel++
        this.setLevelConfig()
        this.createSpeedBtn()
        console.log('speed CD', Math.round(1000 / this.currentSettings[this.farmUser.collectorLevel].collectorSpeed));
      }
      
      // this.setCurrentLevelInfoText()
      // this.setNextLevelInfoText()
      this.closeAndFireworksBlow()

    } else {
      if (improveType === 'time') {
        let count: number = this.currentSettings[this.farmUser.collectorTimeLevel + 1].collectorTimeCost - this.farmUser.money;
        let diamonds: number = this.scene.game.scene.keys[this.scene.state.farm].convertMoney(count);
        this.scene.state.convertor = { fun: 8, count, diamonds, type: 1 }
        this.scene.state.modal = { type: 1, sysType: 4 };

      } else if (improveType === 'speed') {
        let count: number = this.currentSettings[this.farmUser.collectorLevel + 1].collectorSpeedCost - this.scene.state.user.diamonds
        let diamonds: number = this.currentSettings[this.farmUser.collectorLevel + 1].collectorSpeedCost - this.scene.state.user.diamonds
        this.scene.state.convertor = { fun: 8, count, diamonds, type: 2 }
        this.scene.state.modal = { type: 1, sysType: 4 };
      }

      this.scene.scene.stop()
      this.scene.scene.start('Modal', this.scene.state);
    }
  }


  private improveCollectorPayment(improveType: string): boolean {
    if (improveType === 'time' && this.farmUser.money >= this.currentSettings[this.farmUser.collectorTimeLevel + 1].collectorTimeCost) {
      this.farmUser.money -= this.currentSettings[this.farmUser.collectorTimeLevel + 1].collectorTimeCost
      return true
    } else if (improveType === 'speed' && this.scene.state.user.diamonds >= this.currentSettings[this.farmUser.collectorLevel + 1].collectorSpeedCost) {
      const price = this.currentSettings[this.farmUser.collectorLevel + 1].collectorSpeedCost
      this.scene.state.user.diamonds -= price
      this.scene.game.scene.keys[this.scene.state.farm].tryTask(15, 0, price)
      return true
    } else return false
  }


  private setLevelConfig(): void {
    this.currentTimeLevel = this.currentTimeSettings.collector.time;
    this.currentSpeedLevel = this.currentSettings.collector.speed;
    this.nextTimeLevel = this.nextTimeSettings.collector?.time || null;
    this.nextSpeedLevel = this.nextSettings.collector?.speed || null;
  }

  private setCurrentLevelInfoText(): void {
    this.timeText.setText(`${this.scene.state.lang.duration}: ${this.currentTimeLevel} ${this.scene.state.lang.minutes}`)
    this.speedText.setText(`${this.scene.state.lang.speed}: ${this.currentSpeedLevel} ${this.scene.state.lang[`unit${this.scene.state.farm}`]}/${this.scene.state.lang.seconds}`)
  }

  private setNextLevelInfoText(): void {
    if (this.nextTimeLevel) this.timeNextText.setText(`(+${this.nextTimeLevel - this.currentTimeLevel})`).setX(this.timeText.getRightCenter().x + 10)
    else this.timeNextText.setText('')
    if (this.nextSpeedLevel) this.speedNextText.setText(`(+${(this.nextSpeedLevel - this.currentSpeedLevel).toFixed(1)})`).setX(this.speedText.getRightCenter().x + 10)
    else this.speedNextText.setText('')
  }

  private closeAndFireworksBlow(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.scrollY = 0;
    new Firework(this.scene.game.scene.keys[this.scene.state.farm], { x: this.scene.cameras.main.centerX, y: 340 }, 3)
  }
}