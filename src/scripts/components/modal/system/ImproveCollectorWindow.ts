import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class ImproveCollectorWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);    
  }

  private create(): void {
    const farm: string = this.scene.state.farm.toLowerCase();
    const resource: string = this.scene.state.farm === 'Sheep' ? 'wool' : 
    this.scene.state.farm === 'Chicken' ? 'egg' : 
    this.scene.state.farm === 'Cow' ? 'milk' : '';
    
    this.scene.textHeader.setText(`${this.scene.state.lang[`${resource}Collector`]} ${this.scene.state[`user${this.scene.state.farm}`].collectorLevel} ${this.scene.state.lang.shortLevel}.`);
    const thisLevel: IcollectorSettings = this.scene.state[`${farm}CollectorSettings`].find((data: IcollectorSettings) => data.level === this.scene.state[`user${this.scene.state.farm}`].collectorLevel);
    const nextLevel: IcollectorSettings = this.scene.state[`${farm}CollectorSettings`].find((data: IcollectorSettings) => data.level === this.scene.state[`user${this.scene.state.farm}`].collectorLevel + 1);
    
    let speedText: string = `${this.scene.state.lang.speed}: ${thisLevel.speed} ${this.scene.state.lang[`unit${this.scene.state.farm}`]}/${this.scene.state.lang.seconds}`;

    const speed: Phaser.GameObjects.Text = this.scene.add.text(125, this.scene.cameras.main.centerY - 80, speedText, {
      font: '30px Bip',
      color: '#925C28'
    });
    
    const durationText: string = `${this.scene.state.lang.duration}: ${thisLevel.time} ${this.scene.state.lang.minutes}`;
    const duration: Phaser.GameObjects.Text = this.scene.add.text(125, this.scene.cameras.main.centerY - 25, durationText, {
      font: '30px Bip',
      color: '#925C28'
    });

    let icon: string;
    let nextLevelText: Phaser.GameObjects.Text;

    if (nextLevel.time > thisLevel.time) {

      const position: Iposition = {
        x: duration.getBounds().right + 10,
        y: duration.y
      };

      const text: string = `(+${(nextLevel.time - thisLevel.time)} ${this.scene.state.lang.shortMinutes})`;
      nextLevelText = this.scene.add.text(position.x, position.y, text, { font: '30px Bip', color: '#57A90E' });
      
    } else if (nextLevel.speed > thisLevel.speed) {

      const position: Iposition = {
        x: speed.getBounds().right + 10,
        y: speed.y
      };

      let text: string = `(+${(nextLevel.speed - thisLevel.speed).toFixed(1)})`;
      nextLevelText = this.scene.add.text(position.x, position.y, text, {
        font: '30px Bip',
        color: '#57A90E'
      });

    }

    if (this.scene.state[`user${this.scene.state.farm}`].part >= nextLevel.chapter) {
      if (nextLevel.diamonds) icon = 'diamond';
      else icon = `${farm}Coin`;

      const right = { icon: icon, text: shortNum(nextLevel.price) }
      const improve = this.scene.bigButton('green', 'left', 90, this.scene.state.lang.improve, right);
      this.scene.clickModalBtn(improve, (): void => {
        this.scene.game.scene.keys[this.scene.state.farm].improveCollector();
        this.updateImproveCollector(improve, speed, duration, nextLevelText);  
      });

    } else {

      const improve = {
        icon: 'lock',
        text: `${this.scene.state.lang.shortPart} ${nextLevel.chapter}`,
      };

      this.scene.bigButton('grey', 'left', 90, this.scene.state.lang.improve, improve);

    }

    this.scene.resizeWindow(250);
  }


  private updateImproveCollector(
    btn: {
      btn: Phaser.GameObjects.Sprite,
      img1: Phaser.GameObjects.Sprite,
      img2: Phaser.GameObjects.Sprite,
      text1: Phaser.GameObjects.Text
      text2: Phaser.GameObjects.Text
      title: Phaser.GameObjects.Text
    }, 
    speed: Phaser.GameObjects.Text, 
    duration: Phaser.GameObjects.Text, 
    nextLevelText: Phaser.GameObjects.Text
  ): void {
    const farm: string = this.scene.state.farm.toLowerCase();
    const resource: string = this.scene.state.farm === 'Sheep' ? 'wool' : 
    this.scene.state.farm === 'Chicken' ? 'egg' : 
    this.scene.state.farm === 'Cow' ? 'milk' : '';
  
    this.scene.textHeader.setText(`${this.scene.state.lang[`${resource}Collector`]} ${this.scene.state[`user${this.scene.state.farm}`].collectorLevel} ${this.scene.state.lang.shortLevel}.`);
  
    const thisLevel: IcollectorSettings = this.scene.state[`${farm}CollectorSettings`].find((data: IcollectorSettings) => data.level === this.scene.state[`user${this.scene.state.farm}`].collectorLevel);
    const nextLevel: IcollectorSettings = this.scene.state[`${farm}CollectorSettings`].find((data: IcollectorSettings) => data.level === this.scene.state[`user${this.scene.state.farm}`].collectorLevel + 1);
  
    let speedText: string = `${this.scene.state.lang.speed}: ${thisLevel.speed} ${this.scene.state.lang[`unit${this.scene.state.farm}`]}/${this.scene.state.lang.seconds}`;
  
    speed.setText(speedText);
  
    const durationText: string = `${this.scene.state.lang.duration}: ${thisLevel.time} ${this.scene.state.lang.minutes}`;
    duration.setText(durationText);
  
    let position: Iposition;
    let text: string;
    if (nextLevel?.time > thisLevel.time) {
  
      position = {
        x: duration.getBounds().right + 10,
        y: duration.y
      };
      text = `(+${(nextLevel.time - thisLevel.time)} ${this.scene.state.lang.shortMinutes})`;
      
    } else if (nextLevel?.speed > thisLevel.speed) {
      
      position = {
        x: speed.getBounds().right + 10,
        y: speed.y
      };
      text =  `(+${(nextLevel.speed - thisLevel.speed).toFixed(1)} ${this.scene.state.lang.seconds})`;
    }

    nextLevelText?.setPosition(position?.x, position?.y).setText(text);
    if (this.scene.state[`user${this.scene.state.farm}`].part >= nextLevel?.chapter) {
      let icon: string;
      if (nextLevel.diamonds) icon = 'diamond';
      else icon = `${farm}Coin`;
  
      let right = {
        icon: icon,
        text: shortNum(nextLevel.price)
      };
  
      btn.text1.setText(right.text);
      btn.img1.setTexture(right.icon);
      btn.img1.setX(570 - btn.text1.displayWidth);
  
    } else {
  
      btn.btn.destroy();
      btn.img1.destroy();
      btn.text1.destroy();
      btn.title.destroy();
  
      let improve = {
        icon: 'lock',
        text: `${this.scene.state.lang.shortPart} ${nextLevel?.chapter}`,
      };
      this.scene.bigButton('grey', 'left', 90, this.scene.state.lang.improve, improve);
    }
  }
}