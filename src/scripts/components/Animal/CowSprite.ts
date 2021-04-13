
import Animal from './Animal';
import Cow from '../../scenes/Cow/Main';

export default class CowSprite extends Animal {
  public breed: number;
  public milk: number;
  public milkStatus: Phaser.GameObjects.Sprite;
  public scene: Cow;
  public hornsSprite: Phaser.GameObjects.Sprite;
  public settings: IcowPoints;
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
    if (this.breed !== 0) {
      this.settings = this.scene.settings.cowSettings.find((item: IcowPoints) => item.breed === this.breed);
    } else {
      this.settings = this.scene.settings.cowSettings.find((item: IcowPoints) => item.breed === 1);
    }
  }

  private createDiamondHorns(): void {
    let side = 'right';
    if (this.vector === 2 || this.vector === 3 || this.vector === 7 || this.vector === 8) side = 'left';
    let stage: number;
    if (this.milk <= 200) stage = 1;
    else if (this.milk > 200 && this.milk <= 600) stage = 2;
    else if (this.milk > 600 && this.milk <= 900) stage = 3;
    else stage = 4;
    this.hornsSprite = this.scene.add.sprite(this.x, this.y, `${this.type}-horns-${stage}`).setDepth(this.depth).setOrigin(0.5, 1); 
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
      const milkLevel: number =(this.settings.maxMilkVolume - 6 * (this.settings.maxMilkVolume / 60));
      if (this.milk >= milkLevel) {
        this.scene.collectMilk(this, true);
      }
    });
  }

  public startDrag(): void {
    super.startDrag();
    this.play(`${this.type}-drag${this.breed}`, true);

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
      if (this.milk <= this.settings.maxMilkVolume * 0.2) stage = 1;
      else if (this.milk > this.settings.maxMilkVolume * 0.2 && this.milk <= this.settings.maxMilkVolume * 0.6) stage = 2;
      else if (this.milk > this.settings.maxMilkVolume * 0.6 && this.milk <= this.settings.maxMilkVolume * 0.9) stage = 3;
      else stage = 4;
      let dx: number = 10;
      let dy: number = 43;
      if (side === 'left' && !this.drag) this.hornsSprite.setFlipX(true);
      else {
        dx *= -1;
        this.hornsSprite.setFlipX(false);
      }
      this.hornsSprite.setTexture(`${this.type}-horns-${stage}`); 
      this.hornsSprite.setDepth(this.depth + 1);
      this.hornsSprite.setPosition(this.x - dx, this.y - dy);
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
    const milkLevel: number =(this.settings.maxMilkVolume - 6 * (this.settings.maxMilkVolume / 60));
    if (this.milk >=  milkLevel && !this.milkStatus.visible) this.milkStatus.setVisible(true);
    if ((this.milk < milkLevel || this.drag) && this.milkStatus.visible) this.milkStatus.setVisible(false);
  }

  public destroy(): void {
    super.destroy();
    this.hornsSprite?.destroy();
    this.milkStatus?.destroy();
  }
}
