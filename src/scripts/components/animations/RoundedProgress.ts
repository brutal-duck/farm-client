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
  private animation: Phaser.Tweens.Tween

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

  
  }

  private create(): void {
    this.scene.add.tileSprite(this.x, this.y, 160, 160, 'white-pixel').setDepth(99999)

    this.rightSegment = this.scene.add.sprite(this.x, this.y, this.texture).setOrigin(0, 0.5).setTint(this.tint).setScale(this.scale).setDepth(100000)
    this.leftSegment = this.scene.add.sprite(this.x, this.y, this.texture).setOrigin(1, 0.5).setFlipX(true).setTint(this.tint).setScale(this.scale).setDepth(100000)

    this.mask = this.scene.add.tileSprite(this.x, this.y, this.rightSegment.getBounds().width + 5, this.rightSegment.getBounds().height + 5, 'white-pixel').setDepth(this.rightSegment.depth - 2).setTint(0xee0000).createBitmapMask()
    this.mask.invertAlpha = true

    if (this.time) this.play()
  }

  private play(): void {
    let targets = this.mask.bitmapMask as Phaser.GameObjects.TileSprite
    let duration = this.time
    let from: number
    let to: number
    let callback: Function
    console.log('play ~ targets', targets)

    // if (this.clockWise) {
    //   targets.setOrigin(1)
    //   this.rightSegment.setMask(this.mask)
    //   from = 0
    //   to = 360
    //   callback = (): void => {
    //     if (targets.angle >= 90 && targets.originY === 1) targets.setOrigin(1, 0.5)
    //     if (this.animation.elapsed >= duration / 2 && this.rightSegment.visible) {
    //       this.rightSegment.setVisible(false)
    //       this.leftSegment.setMask(this.mask)
    //     }
    //   }
    // } else {
      targets.setOrigin(0, 1)
      this.leftSegment.setMask(this.mask)
      from = 360
      to = 0
      callback = (): void => {
        if (targets.angle <= 270 && targets.originY === 1) targets.setOrigin(0, 0.5)
        if (this.animation.elapsed >= duration / 2 && this.leftSegment.visible) {
          this.leftSegment.setVisible(false)
          this.rightSegment.setMask(this.mask)
        }
      }
    // }

    this.animation = this.scene.tweens.add({
      targets,
      angle: { from, to },
      duration,
      onUpdate: (): void => { callback() },
    })
  }

}