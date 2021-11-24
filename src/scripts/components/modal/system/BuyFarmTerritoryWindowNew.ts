import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class BuyFarmTerritoryWindowNew {
  public scene: Modal;

  private height: number;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    this.height = 130;
    const farm: string = this.scene.state.farm.toLowerCase();
    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];
    const territoriesPrice: IterritoriesPrice[] = this.scene.state[`${farm}Settings`][`territories${this.scene.state.farm}Price`];
    const settings: IterritoriesPrice = territoriesPrice.find((data: IterritoriesPrice) => data.block === this.scene.state.territory.block 
      && data.position === this.scene.state.territory.position);

    if (farmUser.part >= settings.unlock) {
      const partSettings: IpartSettings[] = this.scene.state[`${farm}Settings`].partSettings;
      const terrSettings: IterritoriesPartSettings = partSettings[farmUser.part - 1].territory;
      const price = Math.round((terrSettings.improveTerritoryPrice / 100) * 70);

      const right = {
        icon: `${farm.toLowerCase()}Coin`,
        text: shortNum(price)
      };
    
      const button = this.scene.bigButton('yellow', 'left', 20, this.scene.state.lang.buyTerritory, right);
      this.scene.clickModalBtn(button, (): void => { this.buyTerritoryAndClose() });
    } else {
      const right = {
        icon: 'lock',
        text: this.scene.state.lang.shortPart + ' ' + settings.unlock
      };
  
      this.scene.bigButton('grey', 'left', 20, this.scene.state.lang.buyTerritory, right);
    }
    this.scene.resizeWindow(this.height);
  }

  private buyTerritoryAndClose(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.state.territory.buyTerritory();
  }
}