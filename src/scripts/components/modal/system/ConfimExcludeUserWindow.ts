import Modal from "../../../scenes/Modal/Modal";
const EXCLUDE_KEY = '8e06b3d7e677bf289936486aafbd0222';

export default class ConfimExcludeUserWindow {
  private scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
  }

  private create(): void {
    this.scene.textHeader.setText(this.scene.state.lang.exclude);
    const name: string = this.scene.state.modal.message;
    const textString: string = this.scene.state.lang.confirmExcludeUser.replace('$1', name);
    const text = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 60, textString, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 450, useAdvancedWrap: true }
    }).setOrigin(0.5, 0.5);
  
    const textGeom: Phaser.Geom.Rectangle = text.getBounds();
    const MAX_TEXT_HEIGHT: number = 102;
    let padding: number = 0;
    if (textGeom.height > MAX_TEXT_HEIGHT) {
      padding = (textGeom.height - MAX_TEXT_HEIGHT) / 2;
    }

    text.setY(text.y - padding / 5);
    const button = this.scene.bigButton('red', 'center', 40 + padding, this.scene.state.lang.exclude);
    this.scene.clickModalBtn(button, (): void => {
      this.excludeClanUser();
    });
  
    const cancel = this.scene.bigButton('yellow', 'center', 120 + padding, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(cancel, (): void => {
      this.closeWindow();
    });
  
    this.scene.resizeWindow(250 + padding * 2);
  }


  private excludeClanUser(): void {
    let login: string = this.scene.state.user.login;;
      if (this.scene.state.platform !== 'web' && this.scene.state.platform !== 'android') login = this.scene.state.name;

    const data = {
      userId: this.scene.state.modal.userId, 
      ownerName: login,
      ownerClanId: this.scene.state.user.clanId,
    };
    this.scene.state.socket.io.emit('excludeUserClan', data);
    this.scene.state.socket.io.emit('sendClanMessage', {
      id: this.scene.state.user.id,
      clanId: this.scene.state.user.clanId,
      message: EXCLUDE_KEY,
      userName: this.scene.state.modal.message,
      userStatus: this.scene.state.user.status,
    });
    this.closeWindow();
  }


  private closeWindow(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }
};
