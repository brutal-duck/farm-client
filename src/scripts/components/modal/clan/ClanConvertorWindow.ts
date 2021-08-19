import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import ClanWindow from './ClanWindow';

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  color: '#fffdfa',
  fontFamily: 'Bip',
  fontSize: '24px',
  align: 'left',
  shadow: {
    offsetX: 1,
    offsetY: 1, 
    color: '#96580e',
    blur: 2,
    fill: true,
  },
};

export default class ClanConvertorWindow {
  private window: ClanWindow;
  private scene: Modal;
  private x: number;
  private y: number;
  private type: number;

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
    this.window.headerText.setText(this.scene.state.lang.exchange);
    this.type = this.scene.state.convertor.type;
  }

  private create(): void {
    const count: number | string = shortNum(this.scene.state.convertor.count);
    const length: number = String(count).length * 10 + 15;
    const padding: number = 70;
    const pos: Iposition = {
      x: this.x - length,
      y: this.scene.cameras.main.centerY - 50,
    };

    const notEnaugh: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, this.scene.state.lang.notEnoughForClan, textStyle).setOrigin(0.5, 0.5);
    const text: Phaser.GameObjects.Text = this.scene.add.text(this.x, notEnaugh.getBounds().bottom + 5, this.scene.state.lang.wantGoTreasury, textStyle).setOrigin(0.5, 0);
    const border = notEnaugh.getBounds();

    this.scene.add.text(border.right + 50, pos.y, count, textStyle).setOrigin(0, 0.5);
    const texture: string = this.type === 1 ? 'diamond' :
    this.type === 2 ? 'sheepCoin' :
    this.type === 3 ? 'chickenCoin' : 'cowCoin';
    this.scene.add.sprite(border.right + 5, pos.y, texture).setOrigin(0, 0.5).setScale(0.15);

    const pay = this.scene.bigButton('green', 'center', padding, this.scene.state.lang.goToTreasury);
    this.scene.clickModalBtn(pay, (): void => { this.handleAccept(); });

    const cancel = this.scene.bigButton('yellow', 'center', padding + 90, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(cancel, (): void => { this.handleClose(); });
  }

  private handleClose(): void { 
    this.scene.scene.stop();
  }


  private handleAccept(): void {
    this.scene.state.modal = {
      type: 19,
      clanTabType: this.type,
    };
    this.scene.scene.restart(this.scene.state);
  }
}