import Profile from '../../scenes/Profile';
import ClanFarm from '../../scenes/ClanFarm';
import LogoManager from '../Utils/LogoManager';

export default class ClanFlagPole extends Phaser.GameObjects.Sprite {
  public scene: Profile | ClanFarm;
  private flagPosition: Iposition;
  private flag: Phaser.GameObjects.Sprite;
  private avatar: IconfigIcon;

  constructor(scene: Profile | ClanFarm, pos: Iposition) {
    super(scene, pos.x, pos.y, 'clan-flagpole');
    this.scene = scene;
    this.init();
    this.create();
  }
  
  private init(): void {
    this.avatar = this.scene.state.clan.avatar;
    this.flagPosition = {
      x: this.x + 20, 
      y: this.y - 17,
    };
  }

  private create(): void {
    this.scene.add.existing(this);
    this.flag = LogoManager.createFlag(this.scene, this.flagPosition.x, this.flagPosition.y, this.avatar).setScale(0.17);
  }

  public preUpdate(): void {
    if (JSON.stringify(this.avatar) !== JSON.stringify(this.scene.state.clan.avatar)) {
      this.updateFlag();
    }
  }

  private updateFlag(): void {
    this.avatar = this.scene.state.clan.avatar;
    this.flag.destroy();
    this.flag = LogoManager.createFlag(this.scene, this.flagPosition.x, this.flagPosition.y, this.avatar).setScale(0.17);
  }

  public setDepth(value: number): this {
    super.setDepth(value);
    this.flag?.setDepth(value - 1);
    return this;
  }
}