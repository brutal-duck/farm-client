import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class ConfirmBuyCooldown {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    const headerText: string = this.scene.state.territory.territoryType === 0 ? this.scene.state.lang.speedUpForest : this.scene.state.lang.boughtLand;
    this.scene.textHeader.setText(headerText);
    const price: number = this.scene.state.territory.cooldownSprite.price;

    const text: string = this.scene.state.territory.territoryType === 0 ? this.scene.state.lang.confirmBuyCooldownForest : this.scene.state.lang.confirmBuyCooldownBuild;

    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, text, {
      font: '26px Bip',
      color: '#925C28',
      wordWrap: { width: 450 },
      align: 'center',
    }).setOrigin(0.5);

    const img = {
      icon: 'diamond',
      text: shortNum(price), // Обработать обновление текста кнопки
    };

    const textBtn: string = this.scene.state.territory.territoryType === 0 ? this.scene.state.lang.speedUpForest : this.scene.state.lang.speedUpBuild;
    this.scene.progressButton = this.scene.bigButton('green', 'left', 20, textBtn, img);
    const redBtn = this.scene.bigButton('red', 'center', 110, this.scene.state.lang.cancel);

    this.scene.clickModalBtn(this.scene.progressButton, (): void => {
      this.closeWindow();
      if (this.scene.state.user.diamonds >= price) this.confirmBuy(price);
      else this.openConvertor(price);
    });

    this.scene.clickModalBtn(redBtn, (): void => { this.closeWindow(); });

    this.scene.resizeWindow(250);
  }


  private confirmBuy(price: number): void {
    this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
      type: 'cooldown',
      count: price,
    });
    this.scene.state.user.diamonds -= price;
    this.scene.state.territory.cooldown = 0;
    this.scene.game.scene.keys[this.scene.state.farm].tryTask(15, 0, price);
  }


  private openConvertor(price: number): void {
    this.scene.state.convertor = {
      fun: 0,
      count: price,
      diamonds: price,
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