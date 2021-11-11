import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import BigButton from '../../Buttons/BigButton';
import Sheep from './../../../scenes/Sheep/Main';
import Chicken from './../../../scenes/Chicken/Main';
import Cow from './../../../scenes/Cow/Main';

export default class ConfirmBuyAvatar {
  public scene: Modal;
  private avatar: Iavatar;

  constructor(scene: Modal) {
    this.scene = scene;
    this.avatar = this.scene.state.modal.avatarParams;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    const { centerX, centerY } = this.scene.cameras.main;
    this.scene.textHeader.setText(this.scene.state.lang.buyingAvatar);
    this.scene.add.sprite(centerX, centerY - 90, `avatar-${this.avatar.type}`);
    this.scene.add.text(centerX, centerY - 10, this.scene.state.lang.confirmBuyAvatar, {
      font: '26px Bip',
      color: '#925C28',
      wordWrap: { width: 450 },
      align: 'center',
    }).setOrigin(0.5);

    const img = {
      icon: 'diamond',
      text: shortNum(this.avatar.price),
    };

    const confirmAction = () => {
      this.closeWindow();
      if (this.scene.state.user.diamonds >= this.avatar.price) {
        this.scene.state.user.diamonds -= this.avatar.price;
        this.scene.state.user.boughtAvatars.push(this.avatar.type);
        this.scene.state.user.avatar = String(this.avatar.type);
        const mainScene = this.scene.game.scene.getScene(this.scene.state.farm) as Sheep | Chicken | Cow;
        mainScene.tryTask(15, this.avatar.price);
        this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
          type: 'avatar',
          count: this.avatar.price,
        });
        this.scene.state.modal = { type: 25 };
        this.scene.scene.restart(this.scene.state);
      } else this.openConvertor();
    };

    const confirmSettings: IbigButtonSetting = {
      color: 'green',
      textAlign: 'left',
      right1: img,
      text: this.scene.state.lang.buy,
    };

    const canselSettings: IbigButtonSetting = {
      color: 'red',
      textAlign: 'center',
      text: this.scene.state.lang.cancel,
    };

    new BigButton(this.scene, 40 + 20, confirmAction, confirmSettings);
    new BigButton(this.scene, 40 + 110, this.closeWindow, canselSettings);
    this.scene.resizeWindow(340);
  }

  private openConvertor(): void {
    this.scene.state.convertor = {
      fun: 0,
      count: this.avatar.price,
      diamonds: this.avatar.price,
      type: 1
    };
    this.scene.game.scene.keys[this.scene.state.farm].exchange();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }

  private closeWindow(): void {
    this.scene.state.modal = { type: 25 };
    this.scene.scene.restart(this.scene.state);
  }
}