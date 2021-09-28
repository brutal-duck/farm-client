import ClanWindow from './ClanWindow';
import Modal from './../../../scenes/Modal/Modal';
import Utils from './../../../libs/Utils';

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

export default class RedirectFarmWindow {
  private window: ClanWindow;
  private scene: Modal;
  private farm: string;
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
    this.farm = this.scene.state.modal.message;
    this.window.headerText.setText(this.scene.state.lang.buyingCoins);
  }

  private create(): void {
    const padding: number = 70;
    const pos: Iposition = {
      x: this.x,
      y: this.scene.cameras.main.centerY - 30,
    };
    const farm: string = Utils.ucFirst(this.farm);
    const text: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, this.scene.state.lang[`goToNote${farm}`], textStyle).setOrigin(0.5);
    const pay = this.scene.bigButton('green', 'center', padding, this.scene.state.lang[`goTo${farm}Farm`]);
    this.scene.clickModalBtn(pay, (): void => { this.handleAccept(); });

    const cancel = this.scene.bigButton('yellow', 'center', padding + 90, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(cancel, (): void => { this.handleClose(); });
  }

  private handleClose(): void {
    this.scene.state.modal = {
      type: 19,
      clanTabType: this.farm === 'sheep' ? 2 : this.farm === 'chicken' ? 3 : 4,
    };
    this.scene.scene.restart();
  }

  private handleAccept(): void {
    const farm: string = Utils.ucFirst(this.farm);
    this.scene.state.openConvertor = true;
    this.scene.game.scene.keys[this.scene.state.farm].autosave();
    this.scene.scene.stop('Modal');
    this.scene.scene.stop('ClanScroll');
    this.scene.scene.stop('ClanFarm');
    this.scene.scene.stop(this.scene.state.farm);
    this.scene.scene.stop(`${this.scene.state.farm}Bars`);
    this.scene.scene.start(`${farm}Preload`, this.scene.state);
  }
}