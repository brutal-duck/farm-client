import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class BuyFarmTerritoryWindow {
  public scene: Modal;

  private height: number;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    this.height = 130;
    const farm: string = this.scene.state.farm;
    this.scene.textHeader.setText(this.scene.state.lang.buyTerritory);

    const settings = this.scene.state[`${farm.toLowerCase()}Settings`][`territories${farm}Price`].find((data: IterritoriesPrice) => data.block === this.scene.state.territory.block && data.position === this.scene.state.territory.position);

    if (this.scene.state[`user${farm}`].part >= settings.unlock || this.scene.state.userUnicorn?.points >= settings.unlock) {

      let price: number;
      // 70% от суммы покупки
      if (farm === 'Unicorn') price = settings.price;
      else price = Math.round((settings.price / 100) * 70);

      const right = {
        icon: `${farm.toLowerCase()}Coin`,
        text: shortNum(price)
      };
    
      const button = this.scene.bigButton('yellow', 'left', 20, this.scene.state.lang.buyTerritory, right);
      this.scene.clickModalBtn(button, (): void => { this.buyTerritoryAndClose() });

    } else {

      if (farm === 'Unicorn') this.unicornFarmBtns(settings);
      else this.customFarmBtn(settings);

    }
    
    this.scene.resizeWindow(this.height);
  }


  private customFarmBtn(settings: IterritoriesPrice): void {
    const right = {
      icon: 'lock',
      text: this.scene.state.lang.shortPart + ' ' + settings.unlock
    };

    this.scene.bigButton('grey', 'left', 20, this.scene.state.lang.buyTerritory, right);
  }


  private unicornFarmBtns(settings: IeventTerritoriesPrice): void {
    const right1 = {
      icon: 'diamond',
      text: settings.diamond
    };
  
    const button = this.scene.bigButton('yellow', 'left', -15, this.scene.state.lang.buyTerritory, right1);
    this.scene.clickModalBtn(button, (): void => { this.buyTerritoryAndClose() });

    const right2 = {
      icon: 'lock',
      text: this.scene.state.lang.shortLevel + '. ' + settings.unlock
    };
  
    this.scene.bigButton('grey', 'left', 65, this.scene.state.lang.buyTerritory, right2);
    this.height = 150;
  }


  private buyTerritoryAndClose(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    if (this.scene.state.farm !== 'Cow') this.scene.game.scene.keys[this.scene.state.farm].buyTerritory();
    else this.scene.state.territory.buyTerritory();
  }
}