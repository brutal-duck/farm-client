import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class FarmPastureWindowNew {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    const farm: string = this.scene.state.farm;
    const pasture: string = this.scene.state.lang.pasture.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(pasture);
    const territoriesSettings: IpartSettings[] = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].partSettings;

    let improve: number = this.scene.state.territory.improve;
    if (improve > territoriesSettings.length) {
      improve = territoriesSettings.length;
    }

    const settings: IterritoriesPartSettings = territoriesSettings[improve - 1].territory;

    if (this.scene.state[`user${farm}`].part > improve) {
      const right = {
        icon: `${farm.toLowerCase()}Coin`,
        text: shortNum(settings.improveTerritoryPrice)
      };
      
      const improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
      const button = this.scene.bigButton('green', 'left', -30, improveText, right);
      this.scene.clickModalBtn(button, (): void => {
        this.scene.scene.stop();
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.state.territory.improveTerritory();
      });

    } else {
      const right = {
        icon: 'lock',
        text: this.scene.state.lang.shortPart + ' ' + (improve + 1)
      };
      const improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
      this.scene.bigButton('grey', 'left', -30, improveText, right);
    }

    const button1 = this.scene.bigButton('red', 'center', 60, this.scene.state.lang.exchangePastureBtn);
    this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory() });

    this.scene.resizeWindow(190);
  }


  private exchangeTerritory(): void {
    this.scene.state.modal = {
      type: 1,
      sysType: 11,
    };
    this.scene.scene.restart(this.scene.state);
  }
}