import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class FarmPastureWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    let height: number = 270;
    const farm: string = this.scene.state.farm;
    const pasture: string = this.scene.state.lang.pasture.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(pasture);
    const territoriesSettings: IterritoriesSheepSettings[] | IterritoriesChickenSettings[] | IterritoriesCowSettings[] = this.scene.state[`${farm.toLowerCase()}Settings`][`territories${farm}Settings`];
    const exchangePrice: number = territoriesSettings.find((data: IterritoriesCowSettings) => data.improve === 2).improvePastureMoneyPrice

    const icon: string = `${farm.toLowerCase()}Coin`;
    const text = shortNum(exchangePrice);
    const exchange: any = { icon, text };

    if (this.scene.state.territory.improve < territoriesSettings.length) {

      let improve: number = this.scene.state.territory.improve + 1;
      if (improve > territoriesSettings.length) {
        improve = territoriesSettings.length;
      }

      const settings: IterritoriesCowSettings = territoriesSettings.find((data: IterritoriesCowSettings) => data.improve === improve);

      if (this.scene.state[`user${farm}`].part >= settings.unlock_improve) {

        let improve: any;
        if (settings.improvePastureMoneyPrice) {
          improve = {
            icon: `${farm.toLowerCase()}Coin`,
            text: shortNum(settings.improvePastureMoneyPrice)
          };
        } else if (settings.improvePastureDiamondPrice) {
          improve = {
            icon: 'diamond',
            text: shortNum(settings.improvePastureDiamondPrice)
          };
        }
        
        const improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
        const button = this.scene.bigButton('green', 'left', -60, improveText, improve);
        this.scene.clickModalBtn(button, (): void => {
          this.scene.scene.stop();
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
          this.scene.state.territory.improveTerritory();
        });

      } else {

        const improve = {
          icon: 'lock',
          text: this.scene.state.lang.shortPart + ' ' + settings.unlock_improve
        };
        const improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
        this.scene.bigButton('grey', 'left', -60, improveText, improve);
        
      }

      const button1 = this.scene.bigButton('blue', 'left', 30, this.scene.state.lang.exchangeWater, exchange);
      this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(3) });

      const button2 = this.scene.bigButton('orange', 'left', 120, this.scene.state.lang.exchangeRepository, exchange);
      this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });

    }  else {

      const button1 = this.scene.bigButton('blue', 'left', -15, this.scene.state.lang.exchangeWater, exchange);
      this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(3) });

      const button2 = this.scene.bigButton('orange', 'left', 75, this.scene.state.lang.exchangeRepository, exchange);
      this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });

      height = 200;
    }

    this.scene.resizeWindow(height);
  }


  private exchangeTerritory(type: number): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.game.scene.keys[this.scene.state.farm].confirmExchangeTerritory(type);
  }
}