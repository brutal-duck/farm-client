import Modal from './../../../scenes/Modal/Modal';

export default class AchievementsBars {
  private scene: Modal;
  private bg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Sprite;
  private footer: Phaser.GameObjects.Sprite;
  private x: number;
  private y: number;
  private height: number;
  private width: number;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.startScrollScene();
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.height = 600;
    this.width = 527;
  }

  private create(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.width, this.height, 'white-pixel').setTint(0xFF9700);
    this.createHeader();
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2, 'profile-window-footer').setOrigin(0.5, 0);
  }

  private createHeader(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
      wordWrap: { width: 400, useAdvancedWrap: true },
      align: 'center',
    };
    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 25, 'achievement-window-header').setOrigin(0.5, 1);
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();

    this.scene.add.text(headerGeom.centerX - 15, headerGeom.bottom - 70, this.scene.state.lang.achievements, headerTextStyle).setOrigin(0.5);
    const closeBtn = this.scene.add.sprite(headerGeom.right - 35, headerGeom.bottom - 95, 'close-window-btn');

    this.scene.clickButton(closeBtn, () => { this.onCloseBtn(); });
  }

  private onCloseBtn(): void {
    this.scene.scene.stop();
    this.scene.scene.stop('Achievements');
  }

  private startScrollScene(): void {
    this.scene.scene.launch('Achievements', this.scene.state);
  }
};
