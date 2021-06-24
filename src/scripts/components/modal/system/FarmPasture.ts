import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class FarmPasture {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    const farm: string = this.scene.state.farm
    let height: number
    let pasture: string = this.scene.state.lang.pasture.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(pasture);

    if (farm === 'Cow') {

      let improve: number = this.scene.state.territory.improve + 1;
      if (improve > this.scene.state.cowSettings.territoriesCowSettings.length) {
        improve = this.scene.state.cowSettings.territoriesCowSettings.length;
      }
      const settings: IterritoriesCowSettings = this.scene.state.cowSettings.territoriesCowSettings
        .find((data: IterritoriesCowSettings) => data.improve === improve);
        
      const exchangePrice: number = this.scene.state.cowSettings.territoriesCowSettings
        .find((data: IterritoriesCowSettings) => data.improve === 2).improvePastureMoneyPrice;
      
      const exchange = {
        icon: 'cowCoin',
        text: shortNum(exchangePrice)
      }

      if (this.scene.state.territory.improve < this.scene.state.cowSettings.territoriesCowSettings.length) {
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
          }
          const improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
          this.scene.bigButton('grey', 'left', -60, improveText, improve);
        }

        const button1 = this.scene.bigButton('blue', 'left', 30, this.scene.state.lang.exchangeWater, exchange);
        this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(3) });

        const button2 = this.scene.bigButton('orange', 'left', 120, this.scene.state.lang.exchangeRepository, exchange);
        this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });

        height = 270

      } else {

        const button1 = this.scene.bigButton('blue', 'left', -15, this.scene.state.lang.exchangeWater, exchange);
        this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(3) });

        const button2 = this.scene.bigButton('orange', 'left', 75, this.scene.state.lang.exchangeRepository, exchange);
        this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });

        height = 200

      }

    } else {

      let part: Ipart = this.scene.state[`${farm.toLowerCase()}Settings`][`${farm.toLowerCase()}Parts`].find((data: Ipart) => data.sort === this.scene.state[`user${farm}`].part);
        
      let exchange = {
        icon: `${farm.toLowerCase()}Coin`,
        text: shortNum(part.improve_territory_2)
      }
  
      if (this.scene.state.territory.improve < this.scene.state[`${farm.toLowerCase()}Settings`][`territories${farm}Settings`].length) {
  
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
          let button = this.scene.bigButton('green', 'left', -60, improveText, improve);
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
        
        let button1 = this.scene.bigButton('blue', 'left', 30, this.scene.state.lang.exchangeWater, exchange);
        this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(3) });
  
        let button2 = this.scene.bigButton('orange', 'left', 120, this.scene.state.lang.exchangeRepository, exchange);
        this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });
  
        height = 270;
  
      } else {
  
        let button1 = this.scene.bigButton('blue', 'left', -15, this.scene.state.lang.exchangeWater, exchange);
        this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(3) });
  
        let button2 = this.scene.bigButton('orange', 'left', 75, this.scene.state.lang.exchangeRepository, exchange);
        this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });
  
        height = 200;
      }

    }

    this.scene.resizeWindow(height);
  
  }


  private exchangeTerritory(type: number): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.game.scene.keys[this.scene.state.farm].confirmExchangeTerritory(type);
  }
}