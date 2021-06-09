import Modal from "../../scenes/Modal/Modal";

export default class DonateWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'donate');

    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 10, this.scene.state.lang.crystalsCredited, {
      font: '30px Shadow',
      color: '#763701',
      align: 'center',
      wordWrap: { width: 350 }
    }).setOrigin(0.5, 0.5);
  
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 70, this.scene.state.lang.enjoy, {
      font: '30px Shadow',
      color: '#763701',
      align: 'center',
      wordWrap: { width: 350 }
    }).setOrigin(0.5, 0.5);
  
    let btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 7, this.scene.cameras.main.centerY + 166, 'done-chapter-button');
    let title: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 7, this.scene.cameras.main.centerY + 158, this.scene.state.lang.excellent, {
      font: '32px Shadow',
      fill: '#FFD2D2',
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#2C5D0C', 5);
  
    this.scene.clickModalBtn({ btn, title }, (): void => {
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.game.scene.keys[this.scene.state.farm].takeDonate();
    });
  }
}