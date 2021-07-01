import Boot from "../../scenes/Boot";

export default class ErrorWindow {
  public scene: Boot;

  constructor(scene: Boot) {
    this.scene = scene;
    this.create();
  }

  private create(): void {
    const bg: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 20, 614, 240, 'mid-syst');
    this.scene.add.sprite(bg.x - 1, bg.getTopCenter().y + 1, 'header-syst').setOrigin(0.5, 1);
    this.scene.add.sprite(bg.x, bg.getBottomCenter().y - 1, 'bottom-syst').setOrigin(0.5, 0);

    this.scene.add.text(bg.x, bg.y - 10, this.scene.state.lang.unknownError, { font: 'Bold 30px Shadow', color: '#925C28', align: 'center', wordWrap: { width: 400 } }).setOrigin(0.5, 1).setLineSpacing(8).setDepth(bg.depth + 1);
    
    const btn = this.scene.shopButton(bg.x, bg.y + 80, this.scene.state.lang.reload);
    btn.btn.setScale(1.8);
    btn.title.setFontSize(34);
    this.scene.clickShopBtn(btn, (): void => { window.location.reload(); });
  }

}