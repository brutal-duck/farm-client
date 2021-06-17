import Modal from "../../scenes/Modal/Modal";

export default class DonateWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    const x: number = this.scene.cameras.main.centerX;
    const y: number = this.scene.cameras.main.centerY;
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '30px',
      align: 'center',
      color: '#763701',
      wordWrap: { width: 350 }
    }

    this.scene.add.sprite(x, y, 'donate');
    this.scene.add.text(x, y + 10, this.scene.state.lang.crystalsCredited, textStyle).setOrigin(0.5);
    this.scene.add.text(x, y + 70, this.scene.state.lang.enjoy, textStyle).setOrigin(0.5);
  
    const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(x - 7, y + 166, 'done-chapter-button');
    const title: Phaser.GameObjects.Text = this.scene.add.text(x - 7, y + 158, this.scene.state.lang.excellent, {
      font: '32px Shadow',
      fill: '#FFD2D2',
      align: 'center'
    }).setOrigin(0.5).setStroke('#2C5D0C', 5);
  
    this.scene.clickModalBtn({ btn, title }, (): void => { this.btnHandler(); });
  }

  private btnHandler(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.game.scene.keys[this.scene.state.farm].takeDonate();
  }
}