
import Chicken from './../scenes/Chicken/Main';
import Sheep from './../scenes/Sheep/Main';
import Cow from './../scenes/Cow/Main';
import { timer } from '../general/basic';

export default class Cave extends Phaser.GameObjects.Sprite {
  public scene: Sheep | Chicken | Cow; 
  private position: Iposition;
  private timerBg: Phaser.GameObjects.Sprite;
  private timer: Phaser.GameObjects.Text;
  private pulseTimer: number;
  private bgAd: Phaser.GameObjects.Sprite;
  private free: Phaser.GameObjects.Text;
  private ad: Phaser.GameObjects.Sprite;
  private animation: Phaser.Tweens.Tween;
  private currentTimer: number;

  constructor(scene: Sheep | Chicken | Cow, position: Iposition) {
    super(scene, position.x, position.y, 'cave-wait');
    this.position = position;
    this.init();
  }

  static create(scene: Sheep | Chicken | Cow, position: Iposition): Cave {
    return new Cave(scene, position);
  }
  private init(): void {
    this.scene.add.existing(this);
    if (this.scene.state[`user${this.scene.state.farm}`].part < 3) this.setTexture('cave-disable');
    this.setOrigin(0.5, 1)
      .setDepth(this.position.y);
    this.pulseTimer = 0;
    this.build();
  }

  private build(): void {

    this.timerBg = this.scene.add.sprite(this.position.x, this.position.y - 200, 'cave-timer')
      .setDepth(this.position.y)
      .setVisible(false);

    this.timer = this.scene.add.text(this.position.x, this.position.y - 203, '3:00:00', {
      font: '28px Shadow',
      color: '#455409'
    }).setOrigin(0.5, 0.5).setDepth(this.position.y).setVisible(false);


    this.bgAd = this.scene.add.sprite(this.position.x + 50, this.position.y - 90, 'bg-ad')
      .setDepth(this.position.y);
    this.bgAd
      .setAngle(11)
      .setVisible(false);

    this.free = this.scene.add.text(this.position.x + 50, this.position.y - 90, 'free', {
      font: '26px Bip',
      color: '#FBE2D2'
    }).setOrigin(0.5, 0.5)
      .setDepth(this.position.y)
      .setStroke('#793510', 4)
      .setAngle(11)
      .setVisible(false);
          
    this.ad = this.scene.add.sprite(this.position.x + 50, this.position.y - 90, 'ad-icon')
      .setDepth(this.position.y)
      .setAngle(11)
      .setVisible(false);

    this.setAnimation();
    
  }

  public preUpdate(): void {
    this.checkAndSetState();
    this.setTimerText();
  }

  private setAnimation(): void {

    this.animation = this.scene.tweens.add({
      targets: [ this.bgAd, this.free, this.ad ],
      delay: 5000,
      props: {
        scale: { value: 1.25, duration: 250, ease: 'Power2', yoyo: true },
        angle: { value: -5, duration: 250, ease: 'Power2', yoyo: true },
        y: { value: '-=25', duration: 250, ease: 'Power2', yoyo: true },
      },
      loop: -1,
    });
}

  private checkAndSetState(): void {

  const user: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];
  if (user.part >= 3) {
    if (user.diamondAnimalTime === 0) {
      if (!this.bgAd.visible) this.bgAd.visible = true;
      if (!this.free.visible) this.free.visible = true;

      this.pulseTimer++;

      if (this.pulseTimer === 20) this.setTexture('cave-ready');
      else if (this.pulseTimer === 40) {
        this.pulseTimer = 0;
        this.setTexture('cave-wait');
      }
    } else {
      if (this.free.visible) this.free.visible = false;
      if (this.scene.state.readyAd && user.diamondAnimalAd) {
        if (!this.bgAd.visible) this.bgAd.visible = true;
        if (!this.ad.visible) this.ad.visible = true;
      } else {
        if (this.bgAd.visible) this.bgAd.visible = false;
        if (this.ad.visible) this.ad.visible = false;
      }
    }
  }
}

// таймер кристаллической пещеры
  private setTimerText(): void {
  const user: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];
    if (this.currentTimer !== user.diamondAnimalTime) {
      this.currentTimer = user.diamondAnimalTime;
      if (user.diamondAnimalTime > 0) {
        if (!this.timerBg.visible) this.timerBg.setVisible(true);
        if (!this.timer.visible) this.timer.setVisible(true);
        
        if (this.texture.key !== 'cave-wait') this.setTexture('cave-wait');
        
        let time: string = timer(user.diamondAnimalTime);
        this.timer.setText(time);
        if (this.scene.scene.isActive('Modal') && this.scene.state.modal?.type === 1 && this.scene.state.modal?.sysType === 9) {
          this.scene.game.scene.keys['Modal'].caveTimer.setText(this.scene.state.lang.summonTime + time);
        }
      
        if (user.diamondAnimalTime <= 0) {
          user.diamondAnimalAd = true;
          this.timer.setVisible(false);
          this.timerBg.setVisible(false);
        }
      }
    } 
  }
}