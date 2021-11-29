import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import BigButton from './../../Buttons/BigButton';
import Utils from './../../../libs/Utils';

const basicTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'Bip',
  fontSize: '30px',
  color: '#925C28'
};

const nextLevelTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'Bip',
  fontSize: '30px',
  color: '#57A90E'
};
export default class ImproveCollectorWindow {
  public scene: Modal;
  private speed: Phaser.GameObjects.Text;
  private duration: Phaser.GameObjects.Text;
  private nextLevelText: Phaser.GameObjects.Text;
  private currentLevel: IcollectorSettings;
  private nextLevel: IcollectorSettings;

  constructor(scene: Modal) {
    this.scene = scene;
    this.updateCollectorSettings();
    this.create();
    this.scene.openModal(this.scene.cameras.main);    
  }

  private create(): void {
    const resource: string = this.scene.state.farm === 'Sheep' ? 'wool' : 
    this.scene.state.farm === 'Chicken' ? 'egg' : 
    this.scene.state.farm === 'Cow' ? 'milk' : '';
    
    this.scene.textHeader.setText(`${this.scene.state.lang[`${resource}Collector`]} ${this.scene.state[`user${this.scene.state.farm}`].collectorLevel} ${this.scene.state.lang.shortLevel}.`);
    let speedText: string = `${this.scene.state.lang.speed}: ${this.currentLevel.speed} ${this.scene.state.lang[`unit${this.scene.state.farm}`]}/${this.scene.state.lang.seconds}`;

    this.speed = this.scene.add.text(125, this.scene.cameras.main.centerY - 80, speedText, basicTextStyle);
    
    const durationText: string = `${this.scene.state.lang.duration}: ${this.currentLevel.time} ${this.scene.state.lang.minutes}`;
    this.duration = this.scene.add.text(125, this.scene.cameras.main.centerY - 25, durationText, basicTextStyle);

    if (this.nextLevel.time > this.currentLevel.time) {
      const position: Iposition = {
        x: this.duration.getBounds().right + 10,
        y: this.duration.y
      };

      const text: string = `+${(this.nextLevel.time - this.currentLevel.time)} ${this.scene.state.lang.shortMinutes}`;
      this.nextLevelText = this.scene.add.text(position.x, position.y, text, { font: '30px Bip', color: '#57A90E' });
      
    } else if (this.nextLevel.speed > this.currentLevel.speed) {
      const position: Iposition = {
        x: this.speed.getBounds().right + 10,
        y: this.speed.y
      };

      let text: string = `+${(this.nextLevel.speed - this.currentLevel.speed).toFixed(1)}`;
      this.nextLevelText = this.scene.add.text(position.x, position.y, text, nextLevelTextStyle);
    }

    this.createBtn();

    this.scene.resizeWindow(250);

    if (this.scene.state.modal.message === 'improved') {
      this.scene.game.scene.keys['Modal'].improveCollectorAnim({x: this.scene.cameras.main.centerX, y: this.scene.cameras.main.centerY + 10});
    }
  }

  private updateCollectorSettings(): void {
    const collectorSettings: IcollectorSettings[] = this.scene.state[`${this.scene.state.farm.toLowerCase()}CollectorSettings`];
    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];
    this.currentLevel = collectorSettings.find((data: IcollectorSettings) => data.level === farmUser.collectorLevel);
    this.nextLevel = collectorSettings.find((data: IcollectorSettings) => data.level === farmUser.collectorLevel + 1);
  }

  private updateImproveCollector(): void {
    this.updateCollectorSettings();
    const resource: string = this.scene.state.farm === 'Sheep' ? 'wool' : 
    this.scene.state.farm === 'Chicken' ? 'egg' : 
    this.scene.state.farm === 'Cow' ? 'milk' : '';

    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];

    const strHeader = `${this.scene.state.lang[`${resource}Collector`]} ${farmUser.collectorLevel} ${this.scene.state.lang.shortLevel}.`;
    this.scene.textHeader.setText(strHeader);
  
    const speedText = `${this.scene.state.lang.speed}: ${this.currentLevel.speed} ${this.scene.state.lang[`unit${this.scene.state.farm}`]}/${this.scene.state.lang.seconds}`;
  
    this.speed.setText(speedText);
  
    const durationText: string = `${this.scene.state.lang.duration}: ${this.currentLevel.time} ${this.scene.state.lang.minutes}`;
    this.duration.setText(durationText);
  
    let position: Iposition;
    let text: string;
    if (this.nextLevel?.time > this.currentLevel.time) {
      position = {
        x: this.duration.getBounds().right + 10,
        y: this.duration.y
      };
      text = `+${(this.nextLevel.time - this.currentLevel.time)} ${this.scene.state.lang.shortMinutes}`;
    } else if (this.nextLevel?.speed > this.currentLevel.speed) {
      position = {
        x: this.speed.getBounds().right + 10,
        y: this.speed.y
      };
      text =  `+${(this.nextLevel.speed - this.currentLevel.speed).toFixed(1)} ${this.scene.state.lang.seconds}`;
    }
    this.nextLevelText?.setPosition(position?.x, position?.y).setText(text);
    this.createBtn();
  }

  private createBtn(): void {
    let icon = this.nextLevel.diamonds ? 'diamond' : `${this.scene.state.farm.toLowerCase()}Coin`;
    const right = { icon: icon, text: shortNum(this.nextLevel.price) };
    let btn: BigButton;
    const settings: IbigButtonSetting = {
      color: 'green',
      textAlign: 'left',
      text: this.scene.state.lang.improve,
      right1: right,
    };
    let action: () => void = () => {
      btn?.destroy();
      this.scene.game.scene.keys[this.scene.state.farm].improveCollector();
      this.updateImproveCollector(); 
    };
    if (Utils.checkSale(this.scene.state, `${this.scene.state.farm.toUpperCase()}_COLLECTOR_IMPROVE`)) {
      settings.right1.sale = shortNum(Math.floor(this.nextLevel.price / 2));
    }
    if (this.scene.state[`user${this.scene.state.farm}`].part < this.nextLevel?.chapter) {
      const improve = {
        icon: 'lock',
        text: `${this.scene.state.lang.shortPart} ${this.nextLevel?.chapter}`,
      };
      settings.color = 'grey';
      settings.right1 = improve;
      action = null;
    }
    btn = new BigButton(this.scene, 90, action, settings);
  }
}