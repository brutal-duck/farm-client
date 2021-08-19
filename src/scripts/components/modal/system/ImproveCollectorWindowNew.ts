import { convertMoney, shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class ImproveCollectorWindowNew {
  public scene: Modal;

  private farm: string
  private config: any
  private timeText: Phaser.GameObjects.Text
  private speedText: Phaser.GameObjects.Text
  private timeNextText: Phaser.GameObjects.Text
  private speedNextText: Phaser.GameObjects.Text

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
    this.config = this.scene.state.config
    this.setLevelConfig()
    this.scene.resizeWindow(300);
  }

  private create(): void {
    const resource: string = this.scene.state.farm === 'Sheep' ? 'wool' : 
    this.scene.state.farm === 'Chicken' ? 'egg' : 
    this.scene.state.farm === 'Cow' ? 'milk' : '';
    
    this.scene.textHeader.setText(`${this.scene.state.lang[`${resource}Collector`]}`);
    
    this.timeText = this.scene.add.text(
      this.scene.body.getTopLeft().x + 70,
      this.scene.body.getTopCenter().y + 10,
      '',
      { font: '32px Bip', color: '#925C28' }
    ).setOrigin(0)

    this.timeNextText = this.scene.add.text(
      this.timeText.getRightCenter().x + 10,
      this.timeText.y,
      '',
      { font: '32px Bip', color: '#57A90E' }
    ).setOrigin(0)

    this.speedText = this.scene.add.text(
      this.scene.body.getLeftCenter().x + 70,
      this.scene.body.getCenter().y + 40,
      '',
      { font: '32px Bip', color: '#925C28' }
    ).setOrigin(0)

    this.speedNextText = this.scene.add.text(
      this.speedText.getRightCenter().x + 10,
      this.speedText.y,
      '',
      { font: '32px Bip', color: '#57A90E' }
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

    } else if (this.scene.state.userSheep.part <= this.scene.state.userSheep.collectorTimeLevel + 1) {
      const timeIcon = {
        icon: 'lock',
        text: this.nextTimeLevel ? `${this.scene.state.lang.shortPart} ${this.scene.state.userSheep.part + 1}` : '',
      };
      const text = this.nextTimeLevel ? this.scene.state.lang.improveToLevel.replace('$1', String(this.scene.state.userSheep.collectorTimeLevel + 2)) : this.scene.state.lang.max
      this.scene.bigButton('grey', 'left', -40, text, timeIcon);

    } else {
      const timeCost = { icon: `${this.farm.toLowerCase()}Coin`, text: shortNum(this.config[this.scene.state.userSheep.collectorTimeLevel + 1].collectorTimeCost) }
      const improveTime = this.scene.bigButton('green', 'left', -40, this.scene.state.lang.improveToLevel.replace('$1', String(this.scene.state.userSheep.collectorTimeLevel + 2)), timeCost);
      this.scene.clickModalBtn(improveTime, (): void => { this.improveCollector(improveTime, 'time') });
    }
  }


  private createSpeedBtn(): void {
    if (!this.nextSpeedLevel) {
      this.scene.add.text(
        this.scene.body.getCenter().x,
        this.speedText.getBottomCenter().y + 60,
        this.scene.state.lang.maxCollectorSpeedLevel,
        { font: '28px Bip', color: '#925C28', align: 'center', wordWrap: { width: 560 } }
      ).setOrigin(0.5)

    } else if (this.scene.state.userSheep.part <= this.scene.state.userSheep.collectorSpeedLevel + 1) {
      const timeIcon = {
        icon: 'lock',
        text: this.nextSpeedLevel ? `${this.scene.state.lang.shortPart} ${this.scene.state.userSheep.part + 1}` : '',
      };
      const text = this.nextSpeedLevel ? this.scene.state.lang.improveToLevel.replace('$1', String(this.scene.state.userSheep.collectorSpeedLevel + 2)) : this.scene.state.lang.max
      this.scene.bigButton('grey', 'left', 140, text, timeIcon);

    } else {
      const speedCost = { icon: 'diamond', text: shortNum(this.config[this.scene.state.userSheep.collectorSpeedLevel + 1].collectorSpeedCost) }
      const improveSpeed = this.scene.bigButton('green', 'left', 140, this.scene.state.lang.improveToLevel.replace('$1', String(this.scene.state.userSheep.collectorSpeedLevel + 2)), speedCost);
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
    const success: boolean = this.improveCollectorPayment(improveType)

    if (success) {
      Object.values(btn).forEach(el => { el?.destroy() })
      
      if (improveType === 'time') {
        this.scene.state[`user${this.farm}`].collectorTimeLevel++
        this.scene.game.scene.keys[this.farm].tryTask(23, 0, 0, this.scene.state[`user${this.farm}`].collectorTimeLevel + 1);
        this.setLevelConfig()
        this.createTimeBtn()
      } else if (improveType === 'speed') {
        this.scene.state[`user${this.farm}`].collectorSpeedLevel++
        this.setLevelConfig()
        this.createSpeedBtn()
        console.log('speed CD', Math.round(1000 / this.config[this.scene.state.userSheep.collectorSpeedLevel].collectorSpeed));
      }
      
      this.setCurrentLevelInfoText()
      this.setNextLevelInfoText()

    } else {
      if (improveType === 'time') {
        let count: number = this.config[this.scene.state.userSheep.collectorTimeLevel + 1].collectorTimeCost - this.scene.state.userSheep.money;
        let diamonds: number = this.scene.convertMoney(count);
        this.scene.state.convertor = { fun: 8, count, diamonds, type: 1 }
        this.scene.state.modal = { type: 1, sysType: 4 };

      } else if (improveType === 'speed') {
        let count: number = this.config[this.scene.state.userSheep.collectorSpeedLevel + 1].collectorSpeedCost - this.scene.state.user.diamonds
        let diamonds: number = this.config[this.scene.state.userSheep.collectorSpeedLevel + 1].collectorSpeedCost - this.scene.state.user.diamonds
        this.scene.state.convertor = { fun: 8, count, diamonds, type: 2 }
        this.scene.state.modal = { type: 1, sysType: 4 };
      }

      this.scene.scene.stop()
      this.scene.scene.start('Modal', this.scene.state);
    }
  }


  private improveCollectorPayment(improveType: string): boolean {
    if (improveType === 'time' && this.scene.state.userSheep.money >= this.config[this.scene.state.userSheep.collectorTimeLevel + 1].collectorTimeCost) {
      this.scene.state.userSheep.money -= this.config[this.scene.state.userSheep.collectorTimeLevel + 1].collectorTimeCost
      return true
    } else if (improveType === 'speed' && this.scene.state.user.diamonds >= this.config[this.scene.state.userSheep.collectorSpeedLevel + 1].collectorSpeedCost) {
      this.scene.state.user.diamonds -= this.config[this.scene.state.userSheep.collectorSpeedLevel + 1].collectorSpeedCost
      return true
    } else return false
  }


  private setLevelConfig(): void {
    this.currentTimeLevel = this.config[this.scene.state.userSheep.collectorTimeLevel].collectorTime
    this.currentSpeedLevel = this.config[this.scene.state.userSheep.collectorSpeedLevel].collectorSpeed
    this.nextTimeLevel = this.config[this.scene.state.userSheep.collectorTimeLevel + 1]?.collectorTime ? this.config[this.scene.state.userSheep.collectorTimeLevel + 1].collectorTime : null
    this.nextSpeedLevel = this.config[this.scene.state.userSheep.collectorSpeedLevel + 1]?.collectorSpeed ? this.config[this.scene.state.userSheep.collectorSpeedLevel + 1].collectorSpeed : null
  }

  private setCurrentLevelInfoText(): void {
    this.timeText.setText(`${this.scene.state.lang.duration}: ${this.currentTimeLevel} ${this.scene.state.lang.minutes}`)
    this.speedText.setText(`${this.scene.state.lang.power}: ${this.currentSpeedLevel} ${this.scene.state.lang[`unit${this.scene.state.farm}`]}/${this.scene.state.lang.seconds}`)
  }

  private setNextLevelInfoText(): void {
    if (this.nextTimeLevel) this.timeNextText.setText(`(+${this.nextTimeLevel - this.currentTimeLevel})`).setX(this.timeText.getRightCenter().x + 10)
    else this.timeNextText.setText('')
    if (this.nextSpeedLevel) this.speedNextText.setText(`(+${(this.nextSpeedLevel - this.currentSpeedLevel).toFixed(1)})`).setX(this.speedText.getRightCenter().x + 10)
    else this.speedNextText.setText('')
  }
}