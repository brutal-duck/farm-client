import Chicken from "../../scenes/Chicken/Main";
import Cow from "../../scenes/Cow/Main";
import Unicorn from "../../scenes/Event/Unicorns/Main";
import Sheep from "../../scenes/Sheep/Main";

export default class RoundedProgress {
  public scene: Sheep | Chicken | Cow | Unicorn

  private x: number
  private y: number
  private scale: number
  private tint: number
  private texture: string
  private percent: number
  private time: number

  private rightSegment: Phaser.GameObjects.Sprite
  private leftSegment: Phaser.GameObjects.Sprite
  private mask: Phaser.Display.Masks.BitmapMask
  private timeoutAni: Phaser.Tweens.Tween
  private setAni: Phaser.Tweens.Tween
  private halfPoint: number
  private currentPercent: number

  constructor(
    scene: Sheep | Chicken | Cow | Unicorn,
    x: number,
    y: number,
    scale: number = 1.5,
    textureOrTint: string | number = 0x000,
    percent: number = 100,
    time: number = 0
  ) {
    this.scene = scene
    this.x = x
    this.y = y
    this.scale = scale
    this.tint = typeof textureOrTint === 'number' ? textureOrTint : 0x000
    this.texture = typeof textureOrTint === 'string' ? textureOrTint : 'sg'
    this.percent = percent
    this.time = time

    this.init()
    this.create()
  }

  private init(): void {
    this.time = 15000
    this.percent = 70
    this.currentPercent = this.percent
  }

  private create(): void {
    this.scene.add.tileSprite(this.x, this.y, 160, 160, 'white-pixel').setDepth(99999)

    this.rightSegment = this.scene.add.sprite(this.x, this.y, this.texture).setOrigin(0, 0.5).setTint(this.tint).setScale(this.scale).setDepth(100000)
    this.leftSegment = this.scene.add.sprite(this.x, this.y, this.texture).setOrigin(1, 0.5).setFlipX(true).setTint(this.tint).setScale(this.scale).setDepth(100000)

    this.mask = this.scene.add.tileSprite(this.x, this.y, this.rightSegment.getBounds().width + 5, this.rightSegment.getBounds().height + 5, 'white-pixel').setOrigin(0, 1).setDepth(this.rightSegment.depth - 2).setTint(0xee0000).createBitmapMask()
    this.mask.invertAlpha = true
    this.leftSegment.setMask(this.mask)

    if (this.time) this.play(360 / 100 * this.percent)

    
  }

  private play(from: number): void {
    this.timeoutAni?.remove()
    
    let targets = this.mask.bitmapMask as Phaser.GameObjects.TileSprite
    let to: number = 0
    
    console.log('play ~ this.percent', this.percent)
    
    this.timeoutAni = this.scene.tweens.add({
      onStart: (): void => { this.updateElements() },
      targets,
      angle: { from, to },
      duration: this.time,
      onUpdate: (): void => { this.checkElements() },
    })

    this.scene.time.addEvent({
      delay: Phaser.Math.Between(2500, 4000),
      callback: (): void => {
        this.setPercent(Phaser.Math.Between(30, 80))
      }
    })

  }

  public setPercent(percent: number, time: number = 0) {
    let targets = this.mask.bitmapMask as Phaser.GameObjects.TileSprite
    let duration = 2000
    let from = this.timeoutAni.data[0].current
    let to = 360 / 100 * percent
    this.time = time ? time : this.time

    if (this.timeoutAni?.isPlaying()) this.timeoutAni.stop()

    this.setAni = this.scene.tweens.add({
      // onStart: (): void => { this.updateElements(percent) },
      targets,
      angle: { from, to },
      duration,
      ease: 'Power4',
      onUpdate: (): void => { if (targets.angle >= 270 && targets.originY !== 1) targets.setOrigin(0, 1) },
      onComplete: (): void => { if (this.time) this.play(to) }
    })

  }

  private checkElements(): void {
    let target = this.mask.bitmapMask as Phaser.GameObjects.TileSprite

    if (target.angle <= 270 && target.originY === 1) target.setOrigin(0, 0.5)
    else if (target.angle > 270 && target.originY !== 1) target.setOrigin(0, 1)

    if (this.percent > 50 && this.timeoutAni.elapsed >= this.halfPoint && this.leftSegment.visible) {
      this.leftSegment.setVisible(false)
      this.rightSegment.setMask(this.mask)
    }
  }

  private updateElements(percent: number = this.percent): void {
    this.percent = percent
    this.halfPoint = this.percent <= 100 && this.percent > 50 ? this.time / this.percent * (this.percent - 50) : null

    if (this.percent <= 100 && this.percent > 50) {
      this.rightSegment.clearMask()
      this.leftSegment.setVisible(true)
    } else if (this.percent <= 50 && this.percent > 0) {
      this.leftSegment.setVisible(false)
      this.rightSegment.setMask(this.mask)
    } else {
      this.rightSegment.setVisible(false)
      this.leftSegment.setVisible(false)
    }
  }

}