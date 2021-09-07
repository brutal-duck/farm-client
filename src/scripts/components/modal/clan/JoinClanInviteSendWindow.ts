import ClanWindow from './ClanWindow';
import Modal from './../../../scenes/Modal/Modal';
import LogoManager from './../../Utils/LogoManager';

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  color: '#fffdfa',
  fontFamily: 'Shadow',
  fontSize: '28px',
  align: 'center',
  wordWrap: { width: 470, useAdvancedWrap: true }, 
  shadow: {
    offsetX: 1,
    offsetY: 1, 
    color: '#96580e',
    blur: 2,
    fill: true,
  },
};

export default class JoinClanInviteSendWindow {
  private window: ClanWindow;
  private scene: Modal;
  private clanName: string;
  private x: number;
  private y: number;

  constructor(window: ClanWindow) {
    this.window = window;
    this.scene = this.window.scene;
    this.init()
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.clanName = this.scene.state.modal.message;
    this.window.headerText.setText(this.scene.state.lang.inviteToJoin);
  }

  private create(): void {
    const pos: Iposition = {
      x: this.x,
      y: this.scene.cameras.main.centerY + 10,
    };

    LogoManager.createIcon(this.scene, pos.x, pos.y, this.scene.state.clanAvatar).setScale(0.5);
    const text: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y + 110, `${this.scene.state.lang.inviteToJoinClanSend} ${this.clanName}`, textStyle).setOrigin(0.5);
  }
}
