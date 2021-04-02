
import Animal from './Animal';
import Cow from './../scenes/Cow/Main';


export default class CowSprite extends Animal {
  public animalType: number;
  public milk: number;
  public milkStatus: Phaser.GameObjects.Sprite;
  public scene: Cow;
  constructor(scene: Cow, 
    position: Iposition, 
    animalType: number,   
    id: string,
    counter: number = 0,
    diamond: number = 0,
    vector: number = 7,
    fireworkAnim: boolean = false){
    super(scene, position, `cow-${animalType}`, id, counter, diamond, vector, fireworkAnim);
    this.animalType = animalType;
    this.milk = 0;
  }
  public init(): void {
    super.init();
    this.scene.cow.add(this);
    this.milkStatus = this.scene.add.sprite(this.x, this.y, 'milk-status').setVisible(false);
    this.setListener();
  }
  public setListener(): void {
    this.scene.click(this, (): void => {

      // let modal: Imodal = {
      //   type: 1,
      //   sysType: 1
      // }
      // this.state.modal = modal;
      // this.state.animal = cow;
      // this.scene.launch('Modal', this.state);
  
      if (this.milk >= 900) {
        this.scene.collectMilk(this, true);
      }
  
    });
  }
  public setBrain(): void {
    super.setBrain();
    let statusPosition: number;
    if (!this.drag) {
      if (this.merging) this.moving = false;
      if (this.vector === 2 ||
        this.vector === 3 ||
        this.vector === 7 ||
        this.vector === 8) {
        statusPosition = 50
      } else {
        statusPosition = -50
      }
    if (this.milk >= 900 && !this.milkStatus.visible) this.milkStatus.setVisible(true);
    if (this.milk < 900 && this.milkStatus.visible) this.milkStatus.setVisible(false);
    this.milkStatus.setDepth(this.depth + 1);
    this.milkStatus.x = this.x + statusPosition;
    this.milkStatus.y = this.y - 60;
    }
  }
}