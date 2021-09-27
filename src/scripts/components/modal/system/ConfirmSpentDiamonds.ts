import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class ConfirmSpentDiamonds {
  public scene: Modal;
  private callback: () => void;
  private price: number;

  constructor(scene: Modal) {
    this.scene = scene;
    this.callback = this.scene.state.modal.callback;
    this.price = this.scene.state.modal.count;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    const headerText: string = this.scene.state.modal.message;
    this.scene.textHeader.setText(headerText);

    const text: string = this.scene.state.modal.message;

    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, text, {
      font: '26px Bip',
      color: '#925C28',
      wordWrap: { width: 450 },
      align: 'center',
    }).setOrigin(0.5);

    const img = {
      icon: 'diamond',
      text: shortNum(this.price),
    };

    const textBtn: string = this.scene.state.lang.buy;
    const confirmBtn = this.scene.bigButton('green', 'left', 20, textBtn, img);
    const redBtn = this.scene.bigButton('red', 'center', 110, this.scene.state.lang.cancel);

    this.scene.clickModalBtn(confirmBtn, (): void => {
      this.closeWindow();
      if (this.scene.state.user.diamonds <= this.price) {
        this.callback();
      } else this.openConvertor();
    });

    this.scene.clickModalBtn(redBtn, (): void => { this.closeWindow(); });

    this.scene.resizeWindow(250);
  }


  private openConvertor(): void {
    this.scene.state.convertor = {
      fun: 0,
      count: this.price,
      diamonds: this.price,
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