
import Animal from './Animal';
import Cow from '../../scenes/Cow/Main';

export default class CowSprite extends Animal {
  public breed: number;
  public milk: number;
  public milkStatus: Phaser.GameObjects.Sprite;
  public scene: Cow;
  public hornsSprite: Phaser.GameObjects.Sprite;
  constructor(scene: Cow, 
    position: Iposition, 
    breed: number,   
    id: string,
    counter: number = 0,
    diamond: number = 0,
    vector: number = 7,
    fireworkAnim: boolean = false) {
    super(scene, position, 'cow', breed, id, counter, diamond, vector, fireworkAnim);
    this.breed = breed;
    this.milk = 0;
  }

  static create(scene: Cow, 
    position: Iposition, 
    breed: number,   
    id: string,
    counter: number = 0,
    diamond: number = 0,
    vector: number = 7,
    fireworkAnim: boolean = false): CowSprite {
    const cowSprite: CowSprite = new CowSprite(scene, position, breed, id, counter, diamond, vector, fireworkAnim);
    return cowSprite;
  }

  public init(): void {
    super.init();
    this.basicVelocity = 30;
    this.milkStatus = this.scene.add.sprite(this.x, this.y, 'milk-status').setVisible(false);
    if (this.breed === 0) this.createDiamondHorns();
    this.setListeners();
  }

  private createDiamondHorns(): void {
    let side = 'right';
    if (this.vector === 2 || this.vector === 3 || this.vector === 7 || this.vector === 8) side = 'left';
    let stage: number;
    if (this.milk <= 200) stage = 1;
    else if (this.milk > 200 && this.milk <= 600) stage = 2;
    else if (this.milk > 600 && this.milk <= 900) stage = 3;
    else stage = 4;
    this.hornsSprite = this.scene.add.sprite(this.x, this.y, `${this.type}-${side}-${this.breed}-${stage}`).setDepth(this.depth); 
  }

  public setListeners(): void {
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

  public startDrag(): void {
    super.startDrag();
    this.anims.play(`${this.type}-drag${this.breed}`, true);
  }
  public setBrain(): void {
    super.setBrain();
    this.setMilkStatusPosition();
    this.setMilkStatusVisibility();
    this.setDiamondStage();
  }

  private setDiamondStage(): void {
    if (this.breed === 0) {
      let side = 'right';
      if (this.vector === 2 || this.vector === 3 || this.vector === 7 || this.vector === 8) side = 'left';
      let stage: number;
      if (this.milk <= 200) stage = 1;
      else if (this.milk > 200 && this.milk <= 600) stage = 2;
      else if (this.milk > 600 && this.milk <= 900) stage = 3;
      else stage = 4;
      this.hornsSprite.setTexture(`${this.type}-${side}-${this.breed}-${stage}`); 
      this.hornsSprite.setDepth(this.depth);
      this.hornsSprite.setPosition(this.x, this.y);
    }
  }
  private setMilkStatusPosition(): void {
    let statusPosition: number = -50;
    if (!this.drag) {
      if (this.merging) this.moving = false;
      if (this.vector === 2 || this.vector === 3 || this.vector === 7 || this.vector === 8) {
        statusPosition *= -1;
      } 

    this.milkStatus.setDepth(this.depth + 1);
    this.milkStatus.setPosition(this.x + statusPosition, this.y - 60)
    }
  }

  private setMilkStatusVisibility(): void {
    if (this.milk >= 900 && !this.milkStatus.visible) this.milkStatus.setVisible(true);
    if ((this.milk < 900 || this.drag) && this.milkStatus.visible) this.milkStatus.setVisible(false);
  }

  public destroy(): void {
    super.destroy();
    this.hornsSprite?.destroy();
  }
}
