export default class SpineCow {
  public spine: any
  private scene: any

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    spine: string = 'cow',
    animation: string = 'stay',
    play: boolean = true
  ) {

    this.scene = scene

    // @ts-ignore
    this.spine = scene.add.spine(x, y, spine, animation, play)
    this.spine.setDepth(1000).setScale(1)
    this.spine.customParams = { animation }

    this.scene.physics.add.existing(this.spine);  // Создаем физическое тело для Spine
    
    this.spine.play(this.spine.customParams.animation, true)
    this.spine.setMix('move', 'stay', 0.3)
    this.spine.setMix('move', 'eat', 0.3)
    this.spine.setMix('stay', 'move', 0.3)
    this.spine.setMix('stay', 'eat', 0.3)
    this.spine.setMix('eat', 'stay', 0.3)
    this.spine.setMix('eat', 'move', 0.3)

    // this.setSkin('blue')
    
  }

  getAttachments() {
    return this.spine.skeleton.skin.attachments
  }

  getSlots() {
    return this.spine.skeleton.slots
  }

  setAttachment(slotName: string, attachmentName: string) {
    this.spine.skeleton.setAttachment(slotName, attachmentName)
  }

  setSkin(newSkin: string) {
    this.spine.setSkin(null)
    this.spine.setSkinByName(newSkin)
  }

  setAnimation(animation: string, loop: boolean = false) {
    if (this.spine.customParams.animation !== animation) {
      this.spine.customParams.animation = animation
      this.spine.play(animation, loop)
    }
  }

  move() {

    let timeline: Phaser.Tweens.Timeline = this.scene.tweens.createTimeline({
      loop: -1,
      loopDelay: 2500,
    });

    timeline.add({
      targets: this.spine,
      x: '+= 240',
      ease: 'Linear',
      delay: 2500,
      duration: 3000,
      onUpdate: (): void => { this.setAnimation('move', true) },
      onComplete: (): void => { this.setAnimation('stay', true) },
    })

    timeline.add({
      targets: this.spine,
      scaleX: {from: 1, to: -1},
      ease: 'Linear',
      delay: 2500,
      duration: 0,
      onUpdate: (): void => { this.setAttachment('tag', 'tag-flip') }
    })

    timeline.add({
      targets: this.spine,
      scaleX: {from: -1, to: -1},
      ease: 'Linear',
      delay: 100,
      duration: 2000,
      onUpdate: (): void => { this.setAnimation('eat', false) },
      onComplete: (): void => { this.setAnimation('stay', true) },
    })

    timeline.add({
      targets: this.spine,
      x: '-= 240',
      ease: 'Linear',
      delay: 3500,
      duration: 3000,
      onUpdate: (): void => { this.setAnimation('move', true) },
      onComplete: (): void => { this.setAnimation('stay', true) }
    })

    timeline.add({
      targets: this.spine,
      scaleX: {from: -1, to: 1},
      ease: 'Linear',
      delay: 2500,
      duration: 0,
      onUpdate: (): void => { this.setAttachment('tag', 'tag') }
    })

    timeline.play()

  }

  // update() {
    // if (!player || !player.body) return

    // // spine position
    // this.spine.x = player.body.center.x
    // this.spine.y = player.body.bottom + 8

    // // spine animation
    // if (player.body.blocked.down) {
    //   this.spine.customParams.isKilling = false
    //   const animation = Math.abs(player.body.velocity.x) >= 10 ? 'run' : 'idle'
    //   this.setAnimation(animation, true)
    // }
    // if (!player.body.blocked.down) {
    //   const animation = this.spine.customParams.isKilling ? 'kill' : 'jump'
    //   this.setAnimation(animation)
    // }

    // // spine flip
    // if (player.flipX !== this.spine.flipX) this.spine.flipX = player.flipX
  // }
}
