import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class ConfirmSellMilk {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    const factory: string = this.scene.state.lang.repository.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(factory);

    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, this.scene.state.lang.confirmSellMilk, {
      font: '26px Bip',
      color: '#925C28',
      wordWrap: { width: 450 },
      align: 'center',
    }).setOrigin(0.5);
    
    const milkMoney = {
      icon: 'cowCoin',
      text: shortNum(this.scene.state.territory.volume * this.scene.game.scene.keys[this.scene.state.farm].milkMultiply)
    }

    this.scene.progressButton = this.scene.bigButton('red', 'left', 50, this.scene.state.lang.sellMilk , milkMoney);
    const greenBtn = this.scene.bigButton('green', 'center', 140, this.scene.state.lang.dontSellMilk);

    this.scene.clickModalBtn(this.scene.progressButton, (): void => { this.confirmSellMilk() });
    this.scene.clickModalBtn(greenBtn, (): void => { this.cancelSellMilk() });

    this.scene.resizeWindow(300);
  
  }


  private confirmSellMilk(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.game.scene.keys[this.scene.state.farm].sellMilk();
  }


  private cancelSellMilk(): void {
    const modal: Imodal = {
      type: 1, 
      sysType: 2,
    };
    this.scene.state.modal = modal;
    this.scene.scene.restart(this.scene.state);
  }
}