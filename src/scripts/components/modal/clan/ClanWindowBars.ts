import Modal from './../../../scenes/Modal/Modal';

export default class ClanWindowBars {
  private scene: Modal;
  private x: number;
  private y: number;
  private height: number;
  private width: number;
  private bg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Sprite;
  private closeBtn: Phaser.GameObjects.Sprite;
  private headerText: Phaser.GameObjects.Text;
  private footer: Phaser.GameObjects.Sprite;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.createElements();
  }
  
  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.height = 200;
    this.width = 527;
  }

  private createElements(): void {
    this.createBg();
    this.createHeader();
    this.createFooter();

  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.width, this.height, 'white-pixel').setTint(0xFA8F1F);
  }

  private createHeader(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
    };
    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 10 , 'clan-window-header').setOrigin(0.5, 1);
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 15, this.scene.state.lang.settingsHeader, headerTextStyle).setOrigin(0.5);
    this.closeBtn = this.scene.add.sprite(headerGeom.right - 35, headerGeom.top + 35, 'tasks-close');

    this.scene.clickButton(this.closeBtn, () => { this.onCloseBtn(); });
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2, 'profile-window-footer').setOrigin(0.5, 0);
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
    this.scene.state.foreignProfileId = undefined
  }
}