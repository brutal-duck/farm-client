import Modal from '../../../scenes/Modal/Modal';
import BigButton from '../../Buttons/BigButton';

export default class ConfirmBuyAnimal {
  public scene: Modal;
  private params: IconfirmSpendParams;

  constructor(scene: Modal) {
    this.scene = scene;
    this.params = this.scene.state.modal.confirmSpendParams;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '26px',
      fontFamily: 'Bip',
      color: '#925C28',
      wordWrap: { width: 450 },
      align: 'center',
    };
    const { buySheep, badBalancePasture, badBalanceWater } = this.scene.state.lang;
    this.scene.textHeader.setText(buySheep);
    const str = this.params.type === 'pasture' ? badBalancePasture : badBalanceWater;
    const { centerX, centerY } = this.scene.cameras.main;
    this.scene.add.text(centerX, centerY - 70, str, textStyle).setOrigin(0.5);

    const confirmAction = () => {
      this.closeWindow();
      this.params.callback();
    };

    const confirmSettings: IbigButtonSetting = {
      color: 'red',
      textAlign: 'center',
      text: buySheep,
    };

    const canselSettings: IbigButtonSetting = {
      color: 'green',
      textAlign: 'center',
      text: this.scene.state.lang.cancel,
    };

    new BigButton(this.scene, 60, confirmAction, confirmSettings);
    new BigButton(this.scene, 140, this.closeWindow, canselSettings);
    this.scene.resizeWindow(310);
  }

  private closeWindow(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }
}