import Modal from "../../../scenes/Modal/Modal";

export default class ImproveCollectorEventWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    this.scene.textHeader.setText(this.scene.state.lang.resourceCollector + ' ' + this.scene.state.userUnicorn.collectorLevel + ' ' + this.scene.state.lang.shortLevel + '.').setDisplaySize(this.scene.header.width - 160, this.scene.textHeader.height);

    let thisLevel: IcollectorSettings = this.scene.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.scene.state.userUnicorn.collectorLevel);
    let nextLevel: IcollectorSettings = this.scene.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.scene.state.userUnicorn.collectorLevel + 1);

    let speedText: string = this.scene.state.lang.power + ': ' + thisLevel.speed + ' ' + this.scene.state.lang.unitEvent + '/' + this.scene.state.lang.seconds;
    let speed: Phaser.GameObjects.Text = this.scene.add.text(125, this.scene.cameras.main.centerY - 80, speedText, {
      font: '30px Bip',
      color: '#925C28'
    });
    
    let durationText: string = this.scene.state.lang.duration + ': ' + thisLevel.time + ' ' + this.scene.state.lang.minutes;
    let duration: Phaser.GameObjects.Text = this.scene.add.text(125, this.scene.cameras.main.centerY - 25, durationText, {
      font: '30px Bip',
      color: '#925C28'
    });

    let icon: string;
    let nextLevelText: Phaser.GameObjects.Text;

    if (nextLevel.time > thisLevel.time) {

      let position: Iposition = {
        x: duration.getBounds().right + 10,
        y: duration.y
      }
      let text: string = '(+' + (nextLevel.time - thisLevel.time) + ' ' + this.scene.state.lang.shortMinutes +  ')';
      nextLevelText = this.scene.add.text(position.x, position.y, text, {
        font: '30px Bip',
        color: '#57A90E'
      });
      
    } else if (nextLevel.speed > thisLevel.speed) {

      let position: Iposition = {
        x: speed.getBounds().right + 10,
        y: speed.y
      }
      let text: string = '(+' + (nextLevel.speed - thisLevel.speed).toFixed(1) + ' ' + this.scene.state.lang.seconds +  ')';
      nextLevelText = this.scene.add.text(position.x, position.y, text, {
        font: '30px Bip',
        color: '#57A90E'
      });

    }

    if (this.scene.state.userUnicorn.points >= nextLevel.chapter) {

      if (nextLevel.diamonds) icon = 'diamond';
      else icon = 'unicornCoin';

      let right = {
        icon: icon,
        text: String(nextLevel.price)
      }
      let improve = this.scene.bigButton('green', 'left', 90, this.scene.state.lang.improve, right);
      this.scene.clickModalBtn(improve, (): void => {

        this.scene.game.scene.keys[this.scene.state.farm].improveCollector();
        this.updateImproveCollectorEvent(improve, speed, duration, nextLevelText);  

      });

    } else {

      let improve = {
        icon: 'lock',
        text: this.scene.state.lang.shortLevel + ' ' + nextLevel.chapter
      }
      this.scene.bigButton('grey', 'left', 90, this.scene.state.lang.improve, improve);

    }

    this.scene.resizeWindow(250);
    
  }


  private updateImproveCollectorEvent(
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
  
    this.scene.textHeader.setText(this.scene.state.lang.resourceCollector + ' ' + this.scene.state.userUnicorn.collectorLevel + ' ' + this.scene.state.lang.shortLevel + '.');
    let thisLevel: IcollectorSettings = this.scene.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.scene.state.userUnicorn.collectorLevel);
    let nextLevel: IcollectorSettings = this.scene.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.scene.state.userUnicorn.collectorLevel + 1);
  
    let speedText: string = this.scene.state.lang.power + ': ' + thisLevel.speed + ' ' + this.scene.state.lang.unitEvent + '/' + this.scene.state.lang.seconds;
    speed.setText(speedText);
      
    let durationText: string = this.scene.state.lang.duration + ': ' + thisLevel.time + ' ' + this.scene.state.lang.minutes;
    duration.setText(durationText);
  
    let position: Iposition;
    let text: string;
    if (nextLevel?.time > thisLevel.time) {
  
      position = {
        x: duration.getBounds().right + 10,
        y: duration.y
      }
      text = '(+' + (nextLevel.time - thisLevel.time) + ' ' + this.scene.state.lang.shortMinutes +  ')';
      
    } else if (nextLevel?.speed > thisLevel.speed) {
      
      position = {
        x: speed.getBounds().right + 10,
        y: speed.y
      }
      text = '(+' + (nextLevel.speed - thisLevel.speed).toFixed(1) + ' ' + this.scene.state.lang.seconds +  ')';
    }
    nextLevelText?.setPosition(position?.x, position?.y).setText(text);
    if (this.scene.state.userUnicorn.points >= nextLevel?.chapter) {
      let icon: string;
      if (nextLevel?.diamonds) icon = 'diamond';
      else icon = 'unicornCoin';
  
      let right = {
        icon: icon,
        text: String(nextLevel?.price)
      }
  
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
        text: this.scene.state.lang.shortLevel + '. ' + nextLevel?.chapter
      }
      this.scene.bigButton('grey', 'left', 90, this.scene.state.lang.improve, improve);
  
    }
  
  }
  
}