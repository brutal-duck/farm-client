
import CowSprite from '../Animal/CowSprite';
import Cow from '../../scenes/Cow/Main';

export default class CowGroup extends Phaser.Physics.Arcade.Group {
  public children: Phaser.Structs.Set<CowSprite>
  public scene: Cow;
  constructor(scene: Cow){
    super(scene.physics.world, scene);
    this.scene.add.existing(this);
  }

  public generate(scene: Cow, 
    position: Iposition, 
    breed: number,   
    id: string,
    counter: number = 0,
    diamond: number = 0,
    vector: number = 7,
    fireworkAnim: boolean = false): CowSprite {
    const cowSprite: CowSprite =  CowSprite.create(scene, position, breed, id, counter, diamond, vector, fireworkAnim);
    this.add(cowSprite);
    return cowSprite;
  }
}