/**
  *  Анимация звездочки в позиции сцен    
  * 
  *  Конструктор принимает:
  *1. объект сцены; 
  *2. объект позиции Iposition {x, y}; 
*/

export default class Stars {
  public scene: Phaser.Scene;
  public position: Iposition;
  public stars: Phaser.GameObjects.Group;

  constructor(scene: Phaser.Scene, position: Iposition) {
    this.scene = scene;
    this.position = position;
    this.init();
  }

  static create(scene: Phaser.Scene, position: Iposition): Stars {
    return new Stars(scene, position);
  }

  private init(): void {
    this.stars = this.scene.add.group();
    this.scene.time.addEvent({
      delay: 100,
      callbackScope: this,
      repeat: 2,
      callback: () => {
        this.animation();
      }
    })

    this.scene.time.addEvent({
      delay: 2000,
      callback: () => {
        this.stars.destroy(true);
      }
    })

  }

  private animation(): void {
    const alphaDuration: number = 600;
    const rotationConfig = { value: Math.PI * 2, duration: 300, repeat: -1, ease: 'Power1' };
    const scaleConfig = { value: { from: 0, to: 0.65 }, duration: 300, yoyo: true, ease: 'Power3' };
    const alphaConfig = { value: { from: 1, to: 0 }, duration: alphaDuration };

    let star1: Phaser.GameObjects.Sprite = this.star;
    this.scene.tweens.add({
      targets: star1,
      props: {
          x: { value: this.position.x - Phaser.Math.Between(40, 120), duration: 150, yoyo: true },
          y: { value: this.position.y - Phaser.Math.Between(40, 120), duration: 250,  yoyo: true },
          rotation: rotationConfig,
          scale: scaleConfig,
          alpha: alphaConfig,
      },
      onComplete: () => star1.destroy(),
      ease: 'Sine.easeInOut',
    });

    let star2: Phaser.GameObjects.Sprite = this.star;
    this.scene.tweens.add({
      delay: 150,
      targets: star2,
      props: {
        x: { value: this.position.x + Phaser.Math.Between(40, 120), duration: 250, yoyo: true},
        y: { value: this.position.y - Phaser.Math.Between(40, 120), duration: 150,  yoyo: true,},
        rotation: rotationConfig,
        scale: scaleConfig,
        alpha: alphaConfig,
      },
      onComplete: () => star2.destroy(),
      ease: 'Sine.easeInOut',
    });

    let star3: Phaser.GameObjects.Sprite = this.star;
    this.scene.tweens.add({
      delay: 50,
      targets: star3,
      props: {
        x: { value: this.position.x + Phaser.Math.Between(40, 120), duration: 150, yoyo: true},
        y: { value: this.position.y + Phaser.Math.Between(40, 120), duration: 250,  yoyo: true,},
        rotation: rotationConfig,
        scale: scaleConfig,
        alpha: alphaConfig,
      },
      onComplete: () => star3.destroy(),
      ease: 'Sine.easeInOut',
    })

    let star4: Phaser.GameObjects.Sprite = this.star;
    this.scene.tweens.add({
      delay: 200,
      targets: star4,
      props: {
        x: { value: this.position.x - Phaser.Math.Between(40, 120), duration: 250, yoyo: true},
        y: { value: this.position.y + Phaser.Math.Between(40, 120), duration: 200, yoyo: true},
        rotation: rotationConfig,
        scale: scaleConfig,
        alpha: alphaConfig,
      },
      onComplete: () => star4.destroy(),
      ease: 'Sine.easeInOut',
    })

    let star5: Phaser.GameObjects.Sprite = this.star;
    this.scene.tweens.add({
      delay: 300,
      targets: star5,
      props: {
        x: { value: this.position.x + Phaser.Math.Between(40, 120), duration: 200, yoyo: true},
        y: { value: this.position.y + Phaser.Math.Between(40, 120), duration: 250, yoyo: true},
        rotation: rotationConfig,
        scale: scaleConfig,
        alpha: alphaConfig,
      },
      onComplete: () => star5.destroy(),
      ease: 'Sine.easeInOut',
    })

    let star6: Phaser.GameObjects.Sprite = this.star;
    this.scene.tweens.add({
      delay: 100,
      targets: star6,
      props: {
        x: { value: this.position.x - Phaser.Math.Between(40, 120), duration: 250, yoyo: true },
        y: { value: this.position.y - Phaser.Math.Between(40, 120), duration: 200, yoyo: true},
        rotation: rotationConfig,
        scale: scaleConfig,
        alpha: alphaConfig,
      },
      onComplete: () => star6.destroy(),
      ease: 'Sine.easeInOut',
    })
  }

  private get star(): Phaser.GameObjects.Sprite {
    const star: Phaser.GameObjects.Sprite  = this.scene.add.sprite(this.position.x, this.position.y, 'star').setDepth(10000).setScale(0.6).setAlpha(0);
    this.stars.add(star);
    return star;
  }
}