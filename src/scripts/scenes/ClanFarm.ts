import LogoManager, { Icon } from "../components/Utils/LogoManager";
import { click } from "../general/clicks";

export default class ClanFarm extends Phaser.Scene {
  public state: Istate;
  private bg: Phaser.GameObjects.TileSprite;
  private nameText: Phaser.GameObjects.Text;
  private icon: Icon;

  constructor() {
    super('ClanFarm');
  }

  public click = click.bind(this);

  public init(state: Istate): void {
    this.state = state;
  }

  public create(): void {
    this.createBg();
    this.createClanInfo();
    this.createMain();
  }

  private createBg(): void {
    this.bg = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'white-pixel').setOrigin(0).setInteractive();
  }

  private createClanInfo(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '30px',
      align: 'center',
      color: '#763701',
      wordWrap: { width: 350 }
    };
    const pos: Iposition = {
      x: this.cameras.main.centerX,
      y: 250,
    };
    this.icon = LogoManager.createIcon(this, pos.x, pos.y, this.state.clan.avatar);
    this.nameText = this.add.text(pos.x, pos.y - 150, this.state.clan.name, textStyle).setOrigin(0.5);
  }

  private createMain(): void {
    const pos: Iposition = {
      x: this.cameras.main.centerX,
      y: this.cameras.main.centerY,
    };
    const zone = this.add.zone(pos.x, pos.y, 200, 200).setDropZone(undefined, () => {});

    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0xFFFF00);
    graphics.strokeRect(
      zone.x - zone.input.hitArea.width / 2, 
      zone.y - zone.input.hitArea.height / 2, 
      zone.input.hitArea.width, 
      zone.input.hitArea.height
      );

    this.click(zone, () => {
      this.state.modal = {
        type: 17,
        clanTabType: 1,
      }
      this.scene.launch('Modal', this.state);
    });
  }
};
