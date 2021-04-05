/**
  *  Анимация феерверка в позиции сцен    
  * 
  *  Конструктор принимает:
  *1. объект сцены; 
  *2. объект позиции Iposition {x, y}; 
  *3. количество феерверков (1, 3, 5);  
*/

export default class Firework {
  public scene: Phaser.Scene;
  public position: Iposition;
  private count: number;
  private fireworks: Phaser.GameObjects.Group;
  private spriteBg: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, position: Iposition, count: number = 1){
    this.scene = scene;
    this.position = position;
    this.count = count;
    this.fireworks = this.scene.add.group();
    this.init();
  }
  static create(scene: Phaser.Scene, position: Iposition, count: number): Firework {
    return new Firework(scene, position, count);
  }

  private init(): void {
    if (this.count === 1) {
      this.animation();
    } else if (this.count === 3) {
      this.animation();
      this.scene.time.addEvent({
        delay: 100,
        callback: () => {
          this.position = { x: this.position.x + 50, y: this.position.y - 50 };
          this.animation();
        },
      callbackScope: this,
      });
      this.scene.time.addEvent({
        delay: 200,
        callback: () => {
          this.position = { x: this.position.x - 100, y: this.position.y };
          this.animation();
        },
      callbackScope: this,
      });
    } else if (this.count === 5) {
      this.animation();
      this.scene.time.addEvent({
        delay: 100,
        callback: () => {
          this.position = { x: this.position.x + 70, y: this.position.y - 70 };
          this.animation();
        },
      callbackScope: this,
      });
      this.scene.time.addEvent({
        delay: 200,
        callback: () => {
          this.position = { x: this.position.x - 140, y: this.position.y };
          this.animation();
        },
        callbackScope: this,
      });
      this.scene.time.addEvent({
        delay: 300,
        callback: () => {
          this.position = { x: this.position.x, y: this.position.y + 140 };
          this.animation();
        },
        callbackScope: this,
      });
      this.scene.time.addEvent({
        delay: 400,
        callback: () => {
          this.position = { x: this.position.x + 140, y: this.position.y };
          this.animation();
        },
        callbackScope: this,
      });
    }
    this.scene.time.addEvent({
      delay: 2000,
      callback: this.destroy,
      callbackScope: this,
    })
  }

  private destroy(): void {
    this.spriteBg.destroy();
    this.fireworks.destroy(true);
  }

  private animation(): void {
    this.spriteBg = this.scene.add.sprite(this.position.x, this.position.y, 'fireworkBg').setScale(0).setDepth(10000 - 1);

    const scaleConfig = { value: { from: 0, to: 1 }, duration: 200, ease: 'Power3' };
    const alphaConfig = { value: 0, duration: 200, delay: 150, ease: 'Power1' };

    this.scene.tweens.add({
      delay: 0,
      targets: this.firework.setAngle(180),
      props: {
        y: {value: this.position.y + Phaser.Math.Between(90, 130), duration: 400, ease: 'Power1', yoyo: true},
        scale: scaleConfig,
        alpha: alphaConfig,
      },
    });

    this.scene.tweens.add({
      delay: 10,
      targets: this.firework.setAngle(135),
      props: {
        y: {value: this.position.y + Phaser.Math.Between(50, 130), duration: 400, ease: 'Power1', yoyo: true},
        x: {value: this.position.x + Phaser.Math.Between(50, 130), duration: 400, ease: 'Power1', yoyo: true},
        scale: scaleConfig,
        alpha: alphaConfig,
      }
    });
    
    this.scene.tweens.add({
      delay: 20,
      targets: this.firework.setAngle(90),
      props: {
        x: {value: this.position.x + Phaser.Math.Between(90, 130), duration: 400, ease: 'Power1', yoyo: true},
        scale: scaleConfig,
        alpha: alphaConfig,
      }
    });

    this.scene.tweens.add({
      delay: 30,
      targets: this.firework.setAngle(45),
      props: {
        x: {value: this.position.x + Phaser.Math.Between(50, 130), duration: 400, ease: 'Power1', yoyo: true},
        y: {value: this.position.y - Phaser.Math.Between(50, 130), duration: 400, ease: 'Power1', yoyo: true},
        scale: scaleConfig,
        alpha: alphaConfig,
      }
    });
  
    this.scene.tweens.add({
      delay: 40,
      targets: this.firework.setAngle(0),
      props: {
        y: {value: this.position.y - Phaser.Math.Between(90, 130), duration: 400, ease: 'Power1', yoyo: true},
        scale: scaleConfig,
        alpha: alphaConfig,
      }
    });

    
    this.scene.tweens.add({
      delay: 50,
      targets: this.firework.setAngle(-45),
      props: {
        y: {value: this.position.y - Phaser.Math.Between(50, 130), duration: 400, ease: 'Power1', yoyo: true},
        x: {value: this.position.x - Phaser.Math.Between(50, 130), duration: 400, ease: 'Power1', yoyo: true},
        scale: scaleConfig,
        alpha: alphaConfig,
      }
    });
    
    this.scene.tweens.add({
      delay: 60,
      targets: this.firework.setAngle(-90),
      props: {
        x: {value: this.position.x - Phaser.Math.Between(90, 130), duration: 400, ease: 'Power1', yoyo: true},
        scale: scaleConfig,
        alpha: alphaConfig,
      }
    });

    this.scene.tweens.add({
      delay: 70,
      targets: this.firework.setAngle(-135),
      props: {
        y: {value: this.position.y + Phaser.Math.Between(50, 130), duration: 400, ease: 'Power1', yoyo: true},
        x: {value: this.position.x - Phaser.Math.Between(50, 130), duration: 400, ease: 'Power1', yoyo: true},
        scale: scaleConfig,
        alpha: alphaConfig,
      }
    });

    this.scene.tweens.add({
      targets: this.spriteBg,
      props: {
        scale: { value: 1.5, duration: 300, ease: 'Power3' },
        alpha: { value: 0, delay: 200, duration: 150 }
      },
    });
  }

  private get firework(): Phaser.GameObjects.Sprite {
    let randomIndex: number = Phaser.Math.Between(1, 3);
    const firework: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.position.x, this.position.y, `firework${randomIndex}`).setScale(0).setDepth(10000);
    this.fireworks.add(firework);
    return firework;
  }
}