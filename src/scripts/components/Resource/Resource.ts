export default abstract class Resource extends Phaser.GameObjects.Sprite {
  public scene: Phaser.Scene;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.init();
  }

  public init(): void {
    this.scene.add.existing(this);
    this.setDepth(this.y)
  }

  public flyToPoint(target: Iposition): void {
    this.scene.tweens.add({
      targets: this,
      duration: 350,
      x: target.x,
      y: target.y,
      onComplete: ():void => {
        this.destroy();
      }
    });
  }
} 