import Animal from './Animal';

export default class AnimalSpine {
  public spine: any
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    spine: string,
    animation: string = 'stay',
    play: boolean = true
  ) {
    // @ts-ignore
    this.spine = scene.add.spine(x, y, spine, animation, play)
    this.spine.setDepth(y);
    if (play && animation) {
      this.spine.customParams = { animation };
      this.spine.play(this.spine.customParams.animation, play);
      this.spine.skeletonData.animations.forEach(anim1 => {
        this.spine.skeletonData.animations.forEach(anim2 => {
          if (anim1 !== anim2) {
            if (anim1.name === 'drag' || anim2.name === 'drag') {
              this.spine.setMix(anim1.name, anim2.name, 0.1);
            } else {
              this.spine.setMix(anim1.name, anim2.name, 0.3);
            }
          }
        });
      });
    }
    
  }

  static create(
    scene: Phaser.Scene,
    x: number,
    y: number,
    spine: string,
    animation: string = 'stay',
    play: boolean = true) {
    return new AnimalSpine(scene, x, y, spine, animation, play);
  }

  public setAttachment(slotName: string, attachmentName: string) {
    this.spine.skeleton.setAttachment(slotName, attachmentName);
  }

  // setSkin(newSkin: string) {
  //   this.spine.setSkin(null)
  //   this.spine.setSkinByName(newSkin)
  // }

  public setAnimation(animation: string, loop: boolean = false) {
    if (this.spine.customParams.animation !== animation) {
      this.spine.customParams.animation = animation;
      this.spine.play(animation, loop);
    }
  }

  public update(player: Animal) {
    // spine position
    this.spine.x = player.body.center.x;
    this.spine.y = player.body.center.y;
    // spine flip
    if (player.flipX !== this.spine.flipX) {
      this.spine.flipX = player.flipX;
      this.spine.scaleX *= -1;
    }
  }

  public destroy(): void {
    this.spine.destroy();
  }

  public setDepth(value: number): void {
    this.spine.setDepth(value);
  }
}
