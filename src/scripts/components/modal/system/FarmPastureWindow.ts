import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class FarmPastureWindow {
  public scene: Modal;

  private config: Iconfig[];

  constructor(scene: Modal) {
    this.scene = scene;
    this.config = this.scene.state.config
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    let height: number = 270;
    const farm: string = this.scene.state.farm;
    const currentLevel: number = this.scene.state.territory.improve
    const currentPart: number = this.scene.state[`user${farm}`].part - 1
    const pasture: string = this.scene.state.lang.pasture.replace('$1', String(currentLevel));
    this.scene.textHeader.setText(pasture);
    
    const nextLevelPrice = Math.round(this.config[currentLevel]?.grassAndWaterTerritoryCost / 100 * 30)
    const exchangePriceCoins = Math.round(this.config[currentPart].grassAndWaterTerritoryCost / 100 * 30)
    const exchangePriceDiamonds = this.config[currentPart].repositoryCost

    const exchangeForCoins: any = { icon: `${farm.toLowerCase()}Coin`, text: shortNum(exchangePriceCoins) };
    const exchangeForDiamonds: any = { icon: 'diamond', text: shortNum(exchangePriceDiamonds) };

    if (nextLevelPrice) {

      if (currentLevel - 1 < currentPart) {
        const improve = {
          icon: `${farm.toLowerCase()}Coin`,
          text: shortNum(nextLevelPrice)
        };
        
        const improveText: string = this.scene.state.lang.improveToLevel.replace('$1', String(currentLevel + 1));
        const button = this.scene.bigButton('green', 'left', -60, improveText, improve);
        this.scene.clickModalBtn(button, (): void => {
          this.scene.scene.stop();
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
          this.scene.state.territory.improveTerritory();
        });

      } else {

        const improve = {
          icon: 'lock',
          text: `${this.scene.state.lang.shortPart} ${this.scene.state[`user${farm}`].part + 1}`
        };
        const improveText: string = this.scene.state.lang.improveToLevel.replace('$1', String(currentLevel + 1));
        this.scene.bigButton('grey', 'left', -60, improveText, improve);
        
      }

      const button1 = this.scene.bigButton('blue', 'left', 30, this.scene.state.lang.exchangeWater, exchangeForCoins);
      this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(3) });

      const button2 = this.scene.bigButton('orange', 'left', 120, this.scene.state.lang.exchangeRepository, exchangeForDiamonds);
      this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });

    }  else {

      const button1 = this.scene.bigButton('blue', 'left', -15, this.scene.state.lang.exchangeWater, exchangeForCoins);
      this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(3) });

      const button2 = this.scene.bigButton('orange', 'left', 75, this.scene.state.lang.exchangeRepository, exchangeForDiamonds);
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