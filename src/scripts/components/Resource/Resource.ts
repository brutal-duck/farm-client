export default abstract class Resource extends Phaser.GameObjects.Sprite {
  public scene: Phaser.Scene;
  public clickZone: Phaser.GameObjects.Zone;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.init();
  }

  public init(): void {
    this.scene.add.existing(this);
    this?.setDepth(this?.y)
    this.clickZone = this.scene.add.zone(this.x, this.y, 100, 100).setDropZone(undefined, () => null).setDepth(this?.depth);
  }

  public flyToPoint(target: Iposition): void {
    const anim: Phaser.Tweens.Tween = this.scene.tweens.add({
      targets: this,
      duration: 350,
      onStart: (): void => {
        this?.setDepth(10000);
        this.clickZone?.destroy();
      },
      x: target.x,
      y: target.y,
      onComplete: (): void => {
        anim?.stop();
        this?.destroy();
      }
    });
  }
} 