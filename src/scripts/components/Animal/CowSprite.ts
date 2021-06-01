
import Animal from './Animal';
import Cow from '../../scenes/Cow/Main';

export default class CowSprite extends Animal {
  public breed: number;
  public milk: number;
  public milkStatus: Phaser.GameObjects.Sprite;
  public scene: Cow;
  public hornsSprite: Phaser.GameObjects.Sprite;
  public settings: IcowPoints;
  public barBg: Phaser.GameObjects.Graphics;
  public barLineBg: Phaser.GameObjects.Graphics;
  public barProgress: Phaser.GameObjects.Graphics;
  constructor(scene: Cow, 
    position: Iposition, 
    breed: number,   
    id: string,
    counter: number = 0,
    milk: number = 0,
    diamond: number = 0,
    vector: number = 7,
    fireworkAnim: boolean = false) {
    super(scene, position, 'cow', breed, id, counter, diamond, vector, fireworkAnim);
    this.breed = breed;
    this.milk = milk;
  }

  static create(scene: Cow, 
    position: Iposition, 
    breed: number,   
    id: string,
    counter: number = 0,
    milk: number = 0,
    diamond: number = 0,
    vector: number = 7,
    fireworkAnim: boolean = false): CowSprite {
    const cowSprite: CowSprite = new CowSprite(scene, position, breed, id, counter, milk, diamond, vector, fireworkAnim);
    return cowSprite;
  }

  public init(): void {
    super.init();
    this.basicVelocity = 30;
    const milkStatusTexture: string = this.breed !== 0 ? 'milk-status' : 'diamond-status';
    this.milkStatus = this.scene.add.sprite(this.x, this.y, milkStatusTexture).setVisible(false);
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
      const milkLevel: number =(this.settings.maxMilkVolume - 2 * (this.settings.maxMilkVolume / 60));
      if (this.milk >= milkLevel) {
        this.scene.collectMilk(this, true);
      }
    });
  }

  public startDrag(): void {
    super.startDrag();
    let side: string;
    if (this.vector === 2 ||
      this.vector === 3 ||
      this.vector === 7 ||
      this.vector === 8) {
      side = 'left';
    } else {
      side = 'right';
    }
    this.play(`${this.type}-stay-${side}${this.breed}`, true);
  }

  public dragging(dragX: number, dragY: number): void {
    super.dragging(dragX, dragY);
    this.play(`${this.type}-drag${this.breed}`, true);
  }
  public setBrain(): void {
    super.setBrain();
    this.setMilkStatusPosition();
    this.setMilkStatusVisibility();
    this.setFullnessBarVisibility();
    this.setDiamondStage();
    if (this.scene.state.userCow.part === 1) {
      this.setFullnessBar();
    } else if (this.barBg || this.barLineBg || this.barProgress) {
      this.removeFullnessBar();
    }
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
      else if (side === 'right' || this.drag && this.anims.currentAnim.key === `${this.type}-drag${this.breed}`) {
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
    this.milkStatus.setPosition(this.x + statusPosition, this.y - 60);
    }
  }

  private setMilkStatusVisibility(): void {
    const milkLevel: number =(this.settings.maxMilkVolume - 2 * (this.settings.maxMilkVolume / 60));
    if (this.milk >=  milkLevel && !this.milkStatus.visible) {
      this.milkStatus?.setVisible(true);
    }
    if ((this.milk < milkLevel || this.drag) && this.milkStatus.visible) {
      this.milkStatus?.setVisible(false);
    }
  }

  public destroy(): void {
    super.destroy();
    this.hornsSprite?.destroy();
    this.milkStatus?.destroy();
    this.removeFullnessBar();
  }

  private setFullnessBar(): void {
    let x: number = this.x - 55;
    let y: number = this.y - 90;
    let progress: number = Math.round(94 * (this.milk / this.settings.maxMilkVolume))

    if (!this.barBg) this.barBg = this.scene.add.graphics({ x: x, y: y });
    if (!this.barLineBg) this.barLineBg = this.scene.add.graphics({ x: x + 3, y: y + 3 }).setDepth(y);
    if (!this.barProgress) this.barProgress = this.scene.add.graphics({ x: x + 3, y: y + 3 }).setDepth(y);
    this.barBg?.clear().setPosition(x, y).setDepth(this.depth);
    this.barLineBg?.clear().setPosition(x + 3, y + 3).setDepth(this.depth);
    this.barProgress?.clear().setPosition(x + 3, y + 3).setDepth(this.depth);

    this.barBg?.fillStyle(0xFFFEDE, 1);
    this.barBg?.fillRoundedRect(0, 0, 100, 22, 5);
    this.barLineBg?.fillStyle(0xFFE398, 1);
    this.barLineBg?.fillRoundedRect(0, 0, 94, 16, 3);
    this.barProgress?.fillStyle(0xFF8C3B, 1);
    this.barProgress?.fillRoundedRect(0, 0, progress, 16, 3);
  }

  private removeFullnessBar(): void {
    this.barBg?.destroy();
    this.barLineBg?.destroy();
    this.barProgress?.destroy();
    this.barBg = undefined;
    this.barLineBg = undefined;
    this.barProgress = undefined;
  }

  private setFullnessBarVisibility(): void {
    if (this.scene.state.userCow.part === 1) {
      if (this.milkStatus.visible || this.drag) {
        this.barBg?.setVisible(false);
        this.barLineBg?.setVisible(false);
        this.barProgress?.setVisible(false);
      } else if (!this.milkStatus.visible && !this.drag) {
        this.barBg?.setVisible(true);
        this.barLineBg?.setVisible(true);
        this.barProgress?.setVisible(true);    
      };
    }
  }
}
