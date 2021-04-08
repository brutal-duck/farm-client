
export default class Currency {
  public scene: Phaser.Scene;
  public position: Iposition;
  public target: Iposition;
  public texture: string;
  public speed: number;
  public sprite: Phaser.GameObjects.Sprite;
  public anim: Phaser.Tweens.Tween;
  public duration: number;
  public scale: number;
  public rotation: boolean;
  constructor(scene: Phaser.Scene, position: Iposition, target: Iposition, texture: string, duration: number = 300, scale: number = 0.16, rotation?: boolean) {
    this.scene = scene;
    this.position = position;
    this.target = target;
    this.texture = texture;
    this.duration = duration;
    this.scale = scale;
    this.rotation = rotation;
    this.createSprite();
    this.setAnimation();
  }

  static create(scene: Phaser.Scene, position: Iposition, target: Iposition, texture: string, duration?: number, scale?: number, rotation?: boolean): Currency {
    return new Currency(scene, position, target, texture, duration, scale, rotation);
  }

  public createSprite(): void {
    this.sprite = this.scene.add.sprite(this.position.x, this.position.y, this.texture).setScale(this.scale);
  }

  public setAnimation(): void {
    this.anim = this.scene.tweens.add({
      targets: this.sprite,
      duration: this.duration,
      x: this.target.x,
      y: this.target.y,
      onComplete: (): void => {
        this.sprite.destroy();
      }
    });
    if (this.rotation) {
      this.scene.add.tween({
        targets: this.sprite,
        rotation: - 2 * Math.PI,
        duration: 400, 
        repeat: -1,
      })
    }
  }
}