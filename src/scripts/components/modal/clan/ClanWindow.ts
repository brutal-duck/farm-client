import Modal from "../../../scenes/Modal/Modal";
import { Icon } from "../../Utils/LogoManager";
import CreateClanWindow from './CreateClanWindow';
import EditClanAvatarWindow from './EditClanAvatarWindow';

export default class ClanWindow {
  public scene: Modal;
  private x: number;
  private y: number;
  private height: number;
  public width: number;
  public bg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Sprite;
  private closeBtn: Phaser.GameObjects.Sprite;
  public headerText: Phaser.GameObjects.Text;
  private footer: Phaser.GameObjects.Sprite;
  private windowType: number
  public modalElements: Array<modalElementType | Icon> = [];
  
  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.createMainElements();
    this.createElements();
  };

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.windowType = this.scene.state.modal.clanWindowType || 1;
    this.height = 400;
    if (this.windowType === 2) {
      this.height = 435;
    }
    this.width = 527;
  }

  private createMainElements(): void {
    this.createBg();
    this.createHeader();
    this.createFooter();
  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.width, this.height, 'white-pixel').setTint(0xFA8F1F);
    this.modalElements.push(this.bg);
  }

  private createHeader(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
    };
    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 10 , 'settings-window-header').setOrigin(0.5, 1);
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 15, '', headerTextStyle).setOrigin(0.5);
    this.closeBtn = this.scene.add.sprite(headerGeom.right - 35, headerGeom.top + 35, 'tasks-close');

    this.scene.clickButton(this.closeBtn, () => { this.onCloseBtn(); });
    this.modalElements.push(this.header);
  }
  
  private onCloseBtn(): void {
    if (this.scene.state.modal.clanWindowType !== 2) {
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.scene.stop();
    } else {
      if (this.scene.state.clan) {
        this.scene.state.modal = {
          type: 17,
          clanTabType: 4,
        };
        this.scene.scene.restart(this.scene.state);
      } else {
        this.scene.state.modal = {
          type: 18,
          clanWindowType: 1,
        };
        this.scene.scene.restart(this.scene.state);
      }
    }
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2, 'profile-window-footer').setOrigin(0.5, 0);
    this.modalElements.push(this.footer);
  }
  
  private createElements(): void {
    switch (this.windowType) {
      case 1:
        new CreateClanWindow(this);
        break;
      case 2: 
        new EditClanAvatarWindow(this);
        break;
      default:
        break;
    }
  }

  public addWindowHeight(height: number): void {
    this.header.setY(this.header.y - height);
    this.headerText.setY(this.headerText.y - height);
    this.closeBtn.setY(this.closeBtn.y - height);
    this.scene.add.tileSprite(this.x, this.header.getBounds().bottom - 15, this.width, height + 15, 'white-pixel').setTint(0xFA8F1F).setOrigin(0.5, 0).setDepth(-1);
  }
};
