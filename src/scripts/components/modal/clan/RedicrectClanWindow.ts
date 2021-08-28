import ClanWindow from './ClanWindow';
import Modal from './../../../scenes/Modal/Modal';

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  color: '#fffdfa',
  fontFamily: 'Bip',
  fontSize: '24px',
  align: 'center',
  wordWrap: { width: 400 }, 
  shadow: {
    offsetX: 1,
    offsetY: 1, 
    color: '#96580e',
    blur: 2,
    fill: true,
  },
};

export default class RedirectClanWindow {
  private window: ClanWindow;
  private scene: Modal;
  private type: string;
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
    this.type = this.scene.state.modal.message;
    this.window.headerText.setText(this.scene.state.clan?.name);
  }

  private create(): void {
    const padding: number = 70;
    const pos: Iposition = {
      x: this.x,
      y: this.scene.cameras.main.centerY - 30,
    };
    const string: string = this.type === 'join' ? this.scene.state.lang.youJoinedClan.replace('$1', this.scene.state.clan?.name) : this.scene.state.lang.youCreatedClan.replace('$1', this.scene.state.clan?.name)
    const text: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, string, textStyle).setOrigin(0.5);
    const go = this.scene.bigButton('green', 'center', padding, this.scene.state.lang.goToClanFarm);
    this.scene.clickModalBtn(go, (): void => { this.handleAccept(); });

    const cancel = this.scene.bigButton('yellow', 'center', padding + 90, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(cancel, (): void => { this.handleClose(); });
  }

  private handleClose(): void {
    this.scene.scene.stop('Modal');
  }

  private handleAccept(): void {
    this.scene.scene.stop('Modal');
    this.scene.scene.stop('Profile');
    this.scene.scene.launch('ClanFarm', this.scene.state);
  }
}