import { shortTime } from '../../general/basic';
import Sheep from './../../scenes/Sheep/Main';

export default class CooldownSprite extends Phaser.GameObjects.Sprite {
  public scene: Sheep;
  private timer: Phaser.GameObjects.Text;
  private timerBg: Phaser.GameObjects.TileSprite;
  private btnText: Phaser.GameObjects.Text;
  private btnDiamond: Phaser.GameObjects.Sprite;
  private btn: Phaser.GameObjects.Sprite;

  constructor(scene: Sheep, x: number, y: number) {
    super(scene, x, y - 50, 'hatchet');
    this.create();
  }

  private create(): void {
    this.scene.add.existing(this);
    this.setScale(1.1)
    this.setDepth(100000)

    this.timer = this.scene.add.text(this.x, this.y + 60, shortTime(200000, this.scene.state.lang), {
      fontSize: '28px',
      fontFamily: 'Bip',
      color: '#823C0F'
    }).setDepth(this.depth).setOrigin(0.5);
    const textGeom: Phaser.Geom.Rectangle = this.timer.getBounds();
    this.timerBg = this.scene.add.tileSprite(textGeom.centerX, textGeom.centerY, textGeom.width + 10, textGeom.height, 'white-pixel').setTint(0xF7DFC7).setDepth(this.depth - 1);
    this.btn = this.scene.add.sprite(textGeom.centerX, textGeom.bottom + 30, 'improve-collector').setDepth(this.depth).setScale(0.6);

    this.btnDiamond = this.scene.add.sprite(textGeom.centerX - 15, textGeom.bottom + 28, 'diamond').setDepth(this.depth).setScale(0.10);
    this.btnText = this.scene.add.text(textGeom.centerX + 15, textGeom.bottom + 28, '10', {
      fontSize: '26px',
      fontFamily: 'Shadow',
      color: '#E4DADD'
    }).setDepth(this.depth).setOrigin(0.5);
  }

  public preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
  }

}