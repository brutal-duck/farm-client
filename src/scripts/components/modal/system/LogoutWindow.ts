import Modal from "../../../scenes/Modal/Modal";

export default class LogoutWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    this.scene.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');
    this.scene.close.setVisible(false);
    this.scene.textHeader.setText(this.scene.state.lang.message);
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 20, this.scene.state.lang.stopSession, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5, 0.5);
    
    this.scene.resizeWindow(120);
  
  }
}