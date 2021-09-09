import Modal from "../../../scenes/Modal/Modal";

export default class MessageWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
    this.scene.state.modal.height = this.scene.state.modal.height || 150;
  }

  private create(): void {
    this.scene.textHeader.setText(this.scene.state.lang.message);
    this.scene.resizeWindow(this.scene.state.modal.height);
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 20, this.scene.state.modal.message, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5, 0.5);
  }
}