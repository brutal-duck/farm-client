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
    const farm: string = this.scene.state.farm;
    const pasture: string = this.scene.state.lang.pasture.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(pasture);
    const territoriesSettings: IterritoriesSheepSettings[] | IterritoriesChickenSettings[] | IterritoriesCowSettings[] = this.scene.state[`${farm.toLowerCase()}Settings`][`territories${farm}Settings`];

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
      const button = this.scene.bigButton('green', 'left', -30, improveText, improve);
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
      this.scene.bigButton('grey', 'left', -30, improveText, improve);
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