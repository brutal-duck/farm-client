
export default class RoundedProgress {
  public scene: Phaser.Scene;

  private x: number;
  private y: number;
  private scale: number;
  private tint: number;
  private texture: string;
  private percent: number;
  private time: number;

  public rightSegment: Phaser.GameObjects.Sprite;
  public leftSegment: Phaser.GameObjects.Sprite;
  public mask: Phaser.Display.Masks.BitmapMask;
  private timeoutAni: Phaser.Tweens.Tween;
  private setAni: Phaser.Tweens.Tween;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    scale: number = 1,
    textureOrTint: string | number = 0xffffff,
    percent: number = 0,
    time: number = 0
  ) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.scale = scale;
    this.tint = typeof textureOrTint === 'number' ? textureOrTint : 0x000;
    this.texture = typeof textureOrTint === 'string' ? textureOrTint : 'rounded-segment';
    this.percent = percent;
    this.time = time;

    this.create();
  }


  private create(): void {
    this.rightSegment = this.scene.add.sprite(this.x, this.y, this.texture).setOrigin(0, 0.5).setTint(this.tint).setScale(this.scale).setDepth(100000);
    this.leftSegment = this.scene.add.sprite(this.x, this.y, this.texture).setOrigin(1, 0.5).setFlipX(true).setTint(this.tint).setScale(this.scale).setDepth(100000);

    this.mask = this.scene.add.tileSprite(this.x, this.y, this.rightSegment.getBounds().width + 5, this.rightSegment.getBounds().height + 5, 'white-pixel').setOrigin(0, 1).setVisible(false).setDepth(-1).createBitmapMask();
    this.mask.invertAlpha = true;
    this.leftSegment.setMask(this.mask);

    if (this.time) this.playTimeout(360 / 100 * this.percent);
  }


  private playTimeout(from: number): void {
    this.timeoutAni?.remove();
    
    const targets = this.mask.bitmapMask as Phaser.GameObjects.TileSprite;
    const to: number = 0;

    this.timeoutAni = this.scene.tweens.add({
      targets,
      angle: { from, to },
      duration: this.time,
      onUpdate: (): void => { this.updateElements() },
    });
  }


  public setPercent(percent: number, time: number = 0, duration: number = 500): RoundedProgress {
    if (percent === 100) percent = 99.9
    const targets = this.mask?.bitmapMask as Phaser.GameObjects.TileSprite;
    let from = this.timeoutAni?.isPlaying() ? this.timeoutAni.data[0].current : 360 / 100 * this.percent;
    let to = 360 / 100 * percent;
    this.time = time ? time : this.time;

    if (this.timeoutAni?.isPlaying()) this.timeoutAni.stop();
    if (this.setAni?.isPlaying()) {
      from = this.setAni?.getValue();
      this.setAni?.remove();
    }
    
    this.setAni = this.scene.tweens.add({
      targets,
      angle: { from, to },
      duration,
      ease: 'Power2',
      onUpdate: (): void => { this.updateElements() },
      onComplete: (): void => {
        if (time) this.playTimeout(to)
        this.percent = percent
      }
    });

    return this;
  }


  private updateElements(): void {
    const target = this.mask.bitmapMask as Phaser.GameObjects.TileSprite;

    if (target.angle <= 270 && target.originY === 1) target.setOrigin(0, 0.5);
    else if (target.angle > 270 && target.originY !== 1) target.setOrigin(0, 1);

    if (target.angle >= 0 && this.leftSegment.visible) {
      this.leftSegment.setVisible(false);
      this.rightSegment.setMask(this.mask);
    } else if (target.angle < 0 && !this.leftSegment.visible) {
      this.leftSegment.setVisible(true);
      this.rightSegment.clearMask();
    }
  }


  public setTint(tint: number): RoundedProgress {
    this.rightSegment.setTint(tint)
    this.leftSegment.setTint(tint)
    return this;
  }


  public setTexture(texture: string): RoundedProgress {
    this.rightSegment.setTexture(texture);
    this.leftSegment.setTexture(texture);
    return this;
  }


  public setVisible(isVisible: boolean): RoundedProgress {
    this.rightSegment.setVisible(isVisible);
    this.leftSegment.setVisible(isVisible);
    if (isVisible) this.updateElements();
    return this;
  }


  public setAlpha(alpha: number): RoundedProgress {
    this.rightSegment.setAlpha(alpha);
    this.leftSegment.setAlpha(alpha);
    return this;
  }


  public setDepth(depth: number): RoundedProgress {
    this.rightSegment.setDepth(depth);
    this.leftSegment.setDepth(depth);
    return this;
  }


  public setPosition(x: number, y: number): RoundedProgress {
    this.rightSegment.setPosition(x, y);
    this.leftSegment.setPosition(x, y);
    let mask = this.mask.bitmapMask as Phaser.GameObjects.TileSprite;
    mask.setPosition(x, y);
    return this;
  }

  public destroy(): null {
    this.rightSegment?.destroy();
    this.leftSegment?.destroy();
    this.mask?.destroy();
    this.timeoutAni?.remove();
    this.setAni?.remove();
    return null
  }

}