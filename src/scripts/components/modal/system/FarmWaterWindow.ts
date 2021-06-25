import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class FarmWaterWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    let height: number = 270
    const farm: string = this.scene.state.farm
    const water: string = this.scene.state.lang.water.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(water);

    let part: Ipart = this.scene.state[`${farm.toLowerCase()}Settings`][`${farm.toLowerCase()}Parts`].find((data: Ipart) => data.sort === this.scene.state[`user${farm}`].part);
    let exchangePrice: number = farm === 'Cow'
    ? this.scene.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === 2).improvePastureMoneyPrice
    : part.improve_territory_2

    const icon: string = `${farm.toLowerCase()}Coin`
    const text = shortNum(exchangePrice)
    const exchange: any = { icon, text }

    if (farm === 'Cow' && this.scene.state.territory.improve < this.scene.state.cowSettings.territoriesCowSettings.length) {

      let improve: number = this.scene.state.territory.improve + 1;
      if (improve > this.scene.state.cowSettings.territoriesCowSettings.length) {
        improve = this.scene.state.cowSettings.territoriesCowSettings.length;
      }
    
      const settings: IterritoriesCowSettings = this.scene.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === improve);
      
      if (this.scene.state.userCow.part >= settings.unlock_improve) {

        let improve: any;

        if (settings.improvePastureMoneyPrice) {
          improve = {
            icon: 'cowCoin',
            text: shortNum(settings.improvePastureMoneyPrice)
          }
        } else if (settings.improvePastureDiamondPrice) {
          improve = {
            icon: 'diamond',
            text: shortNum(settings.improvePastureDiamondPrice)
          }
        }

        const improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
        const button = this.scene.bigButton('blue', 'left', -60, improveText, improve);
        this.scene.clickModalBtn(button, (): void => {
          this.scene.scene.stop();
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
          this.scene.state.territory.improveTerritory();
        });
        
      } else {

        const improve = {
          icon: 'lock',
          text: this.scene.state.lang.shortPart + ' ' + settings.unlock_improve
        }
        const improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
        this.scene.bigButton('grey', 'left', -60, improveText, improve);

      }

      let button1 = this.scene.bigButton('green', 'left', 30, this.scene.state.lang.exchangeGrass, exchange);
      this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(2) });
  
      let button2 = this.scene.bigButton('orange', 'left', 120, this.scene.state.lang.exchangeRepository, exchange);
      this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });

    } else if (farm !== 'Cow' && this.scene.state.territory.improve < this.scene.state.sheepSettings.territoriesSheepSettings.length) {

      let price: number;
      let lock: number = this.scene.state[`${farm.toLowerCase()}Settings`][`territories${farm}Settings`].find(data => data.improve === this.scene.state.territory.improve + 1).unlock_improve;
      
      if (this.scene.state[`user${farm}`].part >= lock) {

        if (this.scene.state.territory.improve === 1) price = part.improve_territory_2;
        else if (this.scene.state.territory.improve === 2) price = part.improve_territory_3;
        else price = part.improve_territory_4;

        let improve = {
          icon: `${farm.toLowerCase()}Coin`,
          text: shortNum(price)
        }

        let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);

        let button = this.scene.bigButton('blue', 'left', -60, improveText, improve);
        this.scene.clickModalBtn(button, (): void => {
          this.scene.scene.stop();
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
          this.scene.game.scene.keys[this.scene.state.farm].improveTerritory();
        });

      } else {
        
        let improve = {
          icon: 'lock',
          text: this.scene.state.lang.shortPart + ' ' + lock
        }

        let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);

        this.scene.bigButton('grey', 'left', -60, improveText, improve);

      }

      let button1 = this.scene.bigButton('green', 'left', 30, this.scene.state.lang.exchangeGrass, exchange);
      this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(2) });

      let button2 = this.scene.bigButton('orange', 'left', 120, this.scene.state.lang.exchangeRepository, exchange);
      this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });

      this.scene.resizeWindow(270);

    } else {

      let button1 = this.scene.bigButton('green', 'left', -15, this.scene.state.lang.exchangeGrass, exchange);
      this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(2) });

      let button2 = this.scene.bigButton('orange', 'left', 75, this.scene.state.lang.exchangeRepository, exchange);
      this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });

      height = 200
    }
    
    this.scene.resizeWindow(height);

  }


  private exchangeTerritory(type: number): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.game.scene.keys[this.scene.state.farm].confirmExchangeTerritory(type);
  }


}