import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class RepositoryExchangeWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    const farm: string = this.scene.state.farm;
    const currentLevel: number = this.scene.state.territory.improve
    const currentPart: number = this.scene.state[`user${farm}`].part - 1
    const repository: string = this.scene.state.lang.repository.replace('$1', String(currentLevel + 1));
    this.scene.textHeader.setText(repository);

    const exchangePriceCoins = this.scene.state.config[currentPart].grassAndWaterTerritoryCost
    console.log('create ~ exchangePriceCoins', exchangePriceCoins)
    const exchangeForCoins: any = { icon: `${farm.toLowerCase()}Coin`, text: shortNum(exchangePriceCoins) };

    const textTitle: string = this.scene.state.lang.exchangeRepositoryTitle.replace('$1', String(currentLevel + 1));

    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 100, textTitle, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 450 },
    }).setOrigin(0.5, 0.5);

    const button1 = this.scene.bigButton('green', 'left', 0, this.scene.state.lang.exchangeGrass, exchangeForCoins);
    this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(2) });

    const button2 = this.scene.bigButton('blue', 'left', 80, this.scene.state.lang.exchangeWater, exchangeForCoins);
    this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(3) });

    const button3 = this.scene.bigButton('red', 'center', 160, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(button3, (): void => { this.exchangeTerritory() });

    this.scene.resizeWindow(310);
  }

  private exchangeTerritory(territiryType?: number): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;

    if (territiryType) this.scene.game.scene.keys[this.scene.state.farm].confirmExchangeTerritory(territiryType);
    else {
      const modal: Imodal = {
        type: 1,
        sysType: 2
      };
      this.scene.state.modal = modal;
      this.scene.scene.start('Modal', this.scene.state);
    }
  }
}