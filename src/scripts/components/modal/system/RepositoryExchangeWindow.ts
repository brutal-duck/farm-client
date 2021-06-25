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

    const farm: string = this.scene.state.farm.toLowerCase()
    let repository: string = this.scene.state.lang.repository.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(repository);

    let settings: any
    let exchange: any

    if (this.scene.state.farm !== 'Cow') {
      settings = this.scene.state[`${farm}Settings`][`${farm}Parts`].find((data: Ipart) => data.sort === this.scene.state[`user${this.scene.state.farm}`].part);
      exchange = {
        icon: `${farm}Coin`,
        text: shortNum(settings.improve_territory_2)
      }
    } else {
      settings = this.scene.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === 2);
      exchange = {
        icon: 'cowCoin',
        text: shortNum(settings.improvePastureMoneyPrice)
      }
    }

    let textTitle: string = this.scene.state.lang.exchangeRepositoryTitle.replace('$1', this.scene.state.territory.improve);

    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 100, textTitle, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 450 },
    }).setOrigin(0.5, 0.5);

    const button1 = this.scene.bigButton('green', 'left', 0, this.scene.state.lang.exchangeGrass, exchange);
    this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(2) });

    const button2 = this.scene.bigButton('blue', 'left', 80, this.scene.state.lang.exchangeWater, exchange);
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
      let modal: Imodal = {
        type: 1,
        sysType: 2
      }
      this.scene.state.modal = modal;
      this.scene.scene.start('Modal', this.scene.state);
    }

  }

}