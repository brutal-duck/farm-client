import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class ConfirmSpendDiamonds {
  public scene: Modal;
  private params: IconfirmSpendParams;

  constructor(scene: Modal) {
    this.scene = scene;
    this.params = this.scene.state.modal.confirmSpendParams;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    const headerText: string = this.scene.state.lang[`confirm${this.params.type}Header`];
    this.scene.textHeader.setText(headerText);
    let text: string = this.scene.state.lang[`confirm${this.params.type}Text`]
    text = text?.replace('$1', String(this.params.level));

    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, text, {
      font: '26px Bip',
      color: '#925C28',
      wordWrap: { width: 450 },
      align: 'center',
    }).setOrigin(0.5);

    const img = {
      icon: 'diamond',
      text: shortNum(this.params.price),
    };

    const textBtn: string = this.scene.state.lang.improve;
    const confirmBtn = this.scene.bigButton('green', 'left', 20, textBtn, img);
    const redBtn = this.scene.bigButton('red', 'center', 110, this.scene.state.lang.cancel);

    this.scene.clickModalBtn(confirmBtn, (): void => {
      this.closeWindow();
      if (this.scene.state.user.diamonds >= this.params.price) {
        this.params.callback();
      } else this.openConvertor();
    });

    this.scene.clickModalBtn(redBtn, (): void => { this.closeWindow(); });

    this.scene.resizeWindow(250);
  }


  private openConvertor(): void {
    this.scene.state.convertor = {
      fun: 0,
      count: this.params.price,
      diamonds: this.params.price,
      type: 1
    };
    this.scene.game.scene.keys[this.scene.state.farm].exchange();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }

  private closeWindow(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }
}