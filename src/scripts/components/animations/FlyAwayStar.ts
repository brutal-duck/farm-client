export default class FlyAwayStar {
  public scene: Phaser.Scene;

  private x: number;
  private y: number;
  private sum: number;

  private star: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private flyAwayAni: Phaser.Tweens.Tween;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    sum?: number
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.sum = sum;
    this.create();
  }

  private create(): void {
    this.star = this.scene.add.sprite(this.x, this.y, 'clan-star').setScale(0.8).setDepth(10000);
    if (this.sum) this.text = this.scene.add.text(this.x, this.y, `+${this.sum}`, { font: '24px Shadow', color: '#60DF54' }).setStroke('black', 2).setOrigin(0.5).setDepth(this.star.depth + 1);
    this.flyAway();
  }

  private flyAway(): void {
    const targets: Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.Text> = [ this.star ]
    if (this.sum) targets.push(this.text)

    this.flyAwayAni = this.scene.tweens.add({
      targets,
      y: '-=80',
      ease: 'Power3',
      duration: 450,
      onComplete: (): void => {
        this.star.destroy();
        this.text?.destroy();
        this.flyAwayAni.remove();
      }
    })
  }
}