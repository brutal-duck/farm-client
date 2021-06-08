/**
  *  Анимация летящих вверх сердечек из позиции    
  * 
  *  Конструктор принимает:
  *1. объект сцены; 
  *2. объект позиции Iposition {x, y} или Phaser.GameObject.Sprite или Phaser.Physics.Arcade.Sprite; 
*/

export default class Hearts {
  public scene: Phaser.Scene;
  public position: Phaser.GameObjects.Sprite | Iposition | Phaser.Physics.Arcade.Sprite;
  private hearts: Phaser.GameObjects.Group;
  public texture: string;
  constructor(scene: Phaser.Scene, position: Phaser.GameObjects.Sprite | Iposition | Phaser.Physics.Arcade.Sprite, texture: string = 'heart') {
    this.scene = scene;
    this.position = position;
    this.texture = texture;
    this.init();
  }
  
  static create(scene: Phaser.Scene, position: Iposition, texture: string = 'heart'): Hearts {
    return new Hearts(scene, position, texture);
  }

  private init(): void {
    this.hearts = this.scene.add.group();
    this.scene.time.addEvent({
      delay: 150,
      callback: () => {
        this.animation()
      },
      repeat: 2,
    });
    this.scene.time.addEvent({
      delay: 3000, 
      callback: () => {
        this.hearts.destroy(true);
      }
    })
  }

  private animation(): void {
    this.scene.tweens.add({
      targets: this.heart, 
      props: {
        y: { value: this.position.y - 200, duration: 3000, ease: 'Power3' },
        alpha: { value: 0, duration: 1000 }
      },
    })
  }

  private get heart(): Phaser.GameObjects.Sprite {
    const heart = this.scene.add.sprite(this.position.x + Phaser.Math.Between(20, 30) * Phaser.Math.Between(-1, 1), this.position.y, this.texture).setDepth(this.position.y * 100);
    this.hearts.add(heart);
    return heart;
  }
} 
