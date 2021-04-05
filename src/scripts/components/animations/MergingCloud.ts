import Sheep from '../../scenes/Sheep/Main';
import Cow from '../../scenes/Cow/Main';
import Chicken from '../../scenes/Chicken/Main';
import Event from '../../scenes/Event/Main';

/**
  *  Анимация облака в позиции сцен    
  * 
  *  Конструктор принимает:
  *1. объект сцены; 
  *2. объект позиции Iposition {x, y} или животное; 
  *3. необязательный параметр, если неудачный мерджинг то передать true;  
*/
export default class MergingCloud {

  private scene: Sheep | Cow | Event | Chicken;
  private position: Iposition | Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite;
  private clouds: Phaser.GameObjects.Group;
  private type: boolean;
  
  constructor(scene: Sheep | Cow | Event | Chicken, position: Iposition | Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite, type: boolean = false) {
    this.scene = scene;
    this.position = position;
    this.type = type;
    this.init();
  }
  
  static create(scene: Sheep | Cow | Event | Chicken, position: Iposition | Phaser.GameObjects.Sprite | Phaser.Physics.Arcade.Sprite, type: boolean = false): MergingCloud {
    return new MergingCloud(scene, position, type);
  }

  private init(): void {
    this.clouds = this.scene.add.group();
    this.animation();

  }

  private animation(): void {
    this.scene.add.tween({
      targets: this.cloud,
      props: {
        y: { value: '-=300', duration: 3500 },
        alpha: { value: '0', duration: 1300 },
      },
      onComplete: () => {
        this.clouds.destroy(true);
      }
    })
  }

  private get cloud(): [ Phaser.GameObjects.Sprite, Phaser.GameObjects.Text ] {
    const texture: string = !this.type ? 'merging-animation' : 'bad-merging-animation';
    const cloud = this.scene.add.sprite(this.position.x, this.position.y, texture).setDepth(this.position.y * 100);
    const cloudText = this.scene.add.text(this.position.x, this.position.y, this.scene.state.lang.herdBoostBadMerge, {
      font: '34px Shadow',
      color: '#1a1a1a',
      align: 'center'
    }).setOrigin(0.5, 0.5).setVisible(this.type).setDepth(this.position.y * 100 + 1).setStroke('#cc3737', 2);
    this.clouds.add(cloud);
    this.clouds.add(cloudText);
    return [cloud, cloudText];
  } 
}