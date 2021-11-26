import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class FarmFairWindowNew {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    let height = 220;
    const farm: string = this.scene.state.farm;
    const fair: string = this.scene.state.lang.fair.replace('$1', String(this.scene.state[`user${farm}`].fair));
    this.scene.textHeader.setText(fair);
    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${farm}`];
    const fairLevel: number = farmUser.fair;

    const partSettings: IpartSettings[] = this.scene.state[`${farm.toLowerCase()}Settings`].partSettings;
    const nextFair: IpartSettings = partSettings[farmUser.part - 1];
    if (nextFair && fairLevel < this.scene.state[`${farm.toLowerCase()}Settings`][`${farm.toLowerCase()}FairLevels`].length) {
      const text: string = this.scene.state.lang.improveFair.replace('$1', String(fairLevel + 1));
      this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 80, this.scene.state.lang[`improve${farm}Fair`], {
        font: '26px Shadow',
        fill: '#925C28',
        align: 'center',
        wordWrap: { width: 400 }
      }).setDepth(1).setOrigin(0.5, 0);

      const price = nextFair.territory.improveFairPrice;
      const index = partSettings.filter(el => el.territory.improveFairPrice).findIndex(el => el.territory.improveFairPrice === price);
      if (price > 0 && index + 2 > fairLevel) {
          const right = {
            icon: `${farm.toLowerCase()}Coin`,
            text: shortNum(price)
          };
          const button = this.scene.bigButton('green', 'left', 90, text, right);
          this.scene.clickModalBtn(button, (): void => { this.upgradeFair() });
      } else {
        let nextPart = farmUser.part;
        for (let i = nextPart; i < partSettings.length; i += 1) {
          if (partSettings[i].territory.improveFairPrice > 0) {
            nextPart = i + 1;
            break;
          }
        }     
        const right = {
          icon: 'lock',
          text: this.scene.state.lang.shortPart + ' ' + nextPart
        };

        this.scene.bigButton('grey', 'left', 90, text, right);
      }

    } else {
      this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 20, this.scene.state.lang.maxFairLevel, {
        font: '26px Shadow',
        fill: '#925C28',
        align: 'center',
        wordWrap: {
          width: 400
        }
      }).setDepth(1).setOrigin(0.5, 0);

      height = 170;
    }

    this.scene.resizeWindow(height);
  }


  private upgradeFair(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.game.scene.keys[this.scene.state.farm].territories.children.entries.find(el => el.territoryType === 4).fairLevelUp();
  }
}