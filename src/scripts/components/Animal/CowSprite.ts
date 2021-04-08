
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

  public teleportation(): void {
    const territories: any[] = this.openedTerritory;

    // смотрим, где какая корова сидит
    for (let i in this.scene.cow.children.entries) {

      const c: CowSprite = this.scene.cow.children.entries[i];
      let territory = this.scene.currentTerritory(c.x, c.y);

      if (territory !== undefined) {
        territory = territories.find(data => data._id === territory._id);
        if (territory !== undefined) {
          territory.count++;
        }
      }
    }

    // сортируем, чтобы взять первую с наименьшим количеством
    territories.sort((x1, x2) => {
      if (x1.count < x2.count) return -1;
      if (x1.count > x2.count) return 1;
      return 0;
    });

    let halfWidth: number = Math.ceil(this.width / 2) + 1;
    let halfHeight: number = Math.ceil(this.height / 2) + 1;

    let minX: number = (territories[0].position - 1) * this.scene.height + halfWidth;
    let maxX: number = territories[0].position * this.scene.height - halfWidth;

    let mixY: number = (territories[0].block - 1) * this.scene.height + halfHeight + this.scene.topIndent;
    let maxY: number = territories[0].block * this.scene.height - halfHeight + this.scene.topIndent;

    this.x = Phaser.Math.Between(minX, maxX);
    this.y = Phaser.Math.Between(mixY, maxY);
    this.counter = 200;
    this.aim = false;
    this.aimX = 0;
    this.aimY = 0;
    this.distance = 0;
  }

  public destroy(): void {
    super.destroy();
    this.hornsSprite?.destroy();
  }
}
