import { shortNum, shortTime } from '../../general/basic';
import Sheep from './../../scenes/Sheep/Main';

const TIMER_COEFFICIENT = 3;

export default class CooldownSprite extends Phaser.GameObjects.Sprite {
  public scene: Sheep;
  public territory: any;
  private timer: Phaser.GameObjects.Text;
  private timerBg: Phaser.GameObjects.Sprite;
  private btnPrice: Phaser.GameObjects.Text;
  private btnDiamond: Phaser.GameObjects.Sprite;
  private btn: Phaser.GameObjects.Sprite;
  private anim: Phaser.Tweens.Tween;
  private price: number;

  constructor(territory: any) {
    const texture: string = territory.territoryType === 0 ? 'hatchet' : 'hammer';
    super(territory.scene, territory.x + 80, territory.y + 65, texture);
    this.territory = territory;
    this.price = Math.round(this.territory.cooldown / 60) * TIMER_COEFFICIENT;
    this.create();
    this.setHatchAnimation();
    this.setListeners();
  }

  private create(): void {
    this.scene.add.existing(this);
    this.setOrigin(0.2, 0.8);
    this.setScale(1.1)
    this.setDepth(this.territory.depth + 5)
    const timerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '28px',
      fontFamily: 'Bip',
      color: '#FFF4F7',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };
    this.timer = this.scene.add.text(this.territory.x + 120, this.territory.y + 120, shortTime(this.territory.cooldown, this.scene.state.lang), timerTextStyle).setDepth(this.depth + 240).setOrigin(0.5);
    const textGeom: Phaser.Geom.Rectangle = this.timer.getBounds();

    this.timerBg = this.scene.add.sprite(textGeom.centerX, textGeom.centerY + 28, 'cooldown-plate')
      .setDepth(this.depth + 239);

    this.btn = this.scene.add.sprite(textGeom.centerX, textGeom.bottom + 25, 'improve-collector')
      .setDepth(this.depth + 240)
      .setScale(0.6);

    this.btnDiamond = this.scene.add.sprite(textGeom.centerX - 15, this.btn.y - 2, 'diamond')
      .setDepth(this.depth + 240)
      .setScale(0.10).setOrigin(0, 0.5);

    this.btnPrice = this.scene.add.text(textGeom.centerX + 15, this.btn.y - 2, '1000', {
      fontSize: '26px',
      fontFamily: 'Shadow',
      color: '#E4DADD'
    }).setDepth(this.depth + 240).setOrigin(1, 0.5);

    this.setBtnTextPosition();
  }

  public preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (this.checkDestroy()) {
      if (this.active) {
        this.territory.unlockTerritory();
        if (this.scene.scene.isActive('Modal') && this.scene.state.modal?.type === 1 && this.scene.state.modal?.sysType === 19) {
          this.scene.scene.stop('Modal');
        }
        this.destroy();
      };
    } else if (this.territory.cooldown > 0) {
      this.setPrice();
      const text: string = shortNum(this.price);
      if (this.btnPrice.text !== text) {
        this.btnPrice.setText(text);
        this.setBtnTextPosition();
      }
      const time: string = shortTime(this.territory.cooldown, this.scene.state.lang);
      if (this.timer.text !== time) {
        this.timer.setText(time);
      }
    }
  }

  private checkDestroy(): boolean {  
    return (this.territory.territoryType !== this.territory.boughtType) 
      && this.territory.cooldown <= 0
  }

  private setHatchAnimation(): void {
    this.anim = this.scene.add.tween({
      targets: this,
      duration: 300,
      delay: 150,
      angle: 50,
      repeat: -1,
      yoyo: true,
      repeatDelay: 250,
    });
  }

  public destroy(): void {
    super.destroy();
    this.timer?.destroy();
    this.timerBg?.destroy();
    this.btnPrice?.destroy();
    this.btnDiamond?.destroy();
    this.btn?.destroy();
    this.anim?.remove();
  }

  private setListeners(): void {
    this.scene.clickModalBtn({ btn: this.btn, title: this.btnPrice, img1: this.btnDiamond }, (): void => {
      let modal: Imodal = {
        type: 1,
        sysType: 19,
      }
      this.scene.state.territory = this.territory;
      this.scene.state.modal = modal;
      this.scene.scene.launch('Modal', this.scene.state);
    });
  }

  private setPrice(): void {
    this.price = Math.round(this.territory.cooldown / 60) * TIMER_COEFFICIENT;
    if (this.price <= 0) this.price = 1;
    else if (this.price >= 1000) this.price = 1000;
  }

  private setBtnTextPosition(): void {
    const centerX: number = this.btn.x;
    const textWindth: number = this.btnPrice.getBounds().width;
    const imgWidth: number = this.btnDiamond.getBounds().width;
    const halfWidth: number = (textWindth + imgWidth + 5) / 2;
    this.btnPrice.setX(centerX + halfWidth); 
    this.btnDiamond.setX(centerX - halfWidth); 
  }
}