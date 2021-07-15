import Chicken from "../../scenes/Chicken/Main";
import Cow from "../../scenes/Cow/Main";
import Unicorn from "../../scenes/Event/Unicorns/Main";
import Sheep from "../../scenes/Sheep/Main";

export default class RoundedProgress {
  public scene: Sheep | Chicken | Cow | Unicorn

  constructor(scene: Sheep | Chicken | Cow | Unicorn) {
    this.scene = scene

    this.create()
  }

  private create(): void {
    let x = this.scene.cameras.main.centerX
    let y = this.scene.cameras.main.centerY
    let tint1 = 0x000
    let scale1 = 1.5
    let scale2 = 1.25

    this.scene.add.tileSprite(x, y, 160, 160, 'white-pixel').setDepth(100000)

    let sg1: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, y, 'sg').setOrigin(0, 0.5).setTint(tint1).setScale(scale1).setDepth(100000)
    let sg2: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, y, 'sg').setOrigin(1, 0.5).setFlipX(true).setTint(tint1).setScale(scale1).setDepth(100000)

    let mask = this.scene.add.tileSprite(x, y, sg1.getBounds().width + 5, sg1.getBounds().height + 5, 'white-pixel').setOrigin(1, 1).setDepth(100000).setTint(0xee0000).createBitmapMask()
    mask.invertAlpha = true
    sg1.setMask(mask)
    console.log('create ~ mask.bitmapMask', mask.bitmapMask)

    
    let duration = 3000
    let tl = this.scene.tweens.createTimeline()
    let targets = mask.bitmapMask as Phaser.GameObjects.TileSprite

    tl.add({
      targets,
      angle: 90,
      duration,
      onComplete: (): void => {
        targets.setOrigin(1, 0.5)
      }
    })

    tl.add({
      targets,
      angle: 180,
      duration,
      onComplete: (): void => {
        sg1.setVisible(false)
        sg2.setMask(mask)
      }
    })

    tl.add({
      targets,
      angle: 270,
      duration,
    })

    tl.add({
      targets,
      angle: 0,
      duration,
      onComplete: (): void => {
        sg2.setVisible(false)
      }
    })

    tl.play()

  }
}