import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class FarmFairWindow {
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

    const nextFair = this.scene.state[`${farm.toLocaleLowerCase()}Settings`][`${farm.toLocaleLowerCase()}FairLevels`].find((item: IfairLevel) => item.level === this.scene.state[`user${farm}`].fair + 1);

    if (nextFair !== undefined && this.scene.state[`user${farm}`].fair < this.scene.state[`${farm.toLocaleLowerCase()}Settings`][`${farm.toLocaleLowerCase()}FairLevels`].length) {

      this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 80, this.scene.state.lang[`improve${farm}Fair`], {
        font: '26px Shadow',
        fill: '#925C28',
        align: 'center',
        wordWrap: { width: 400 }
      }).setDepth(1).setOrigin(0.5, 0);
      
      let priceM: number | string = shortNum(nextFair.price_m);
      let priceD: number | string = shortNum(nextFair.price_d);
      let text: string = this.scene.state.lang.improveFair.replace('$1', String(this.scene.state[`user${farm}`].fair + 1));

      if (this.scene.state[`user${farm}`].part >= nextFair.part_unlock) {

        if (nextFair.price_m > 0 && nextFair.price_d > 0) {

          const right1 = {
            icon: `${farm.toLowerCase()}Coin`,
            text: priceM
          };
          const right2 = {
            icon: 'diamond',
            text: priceD
          };
          const button = this.scene.bigButton('green', 'left', 90, text, right1, right2);
          this.scene.clickModalBtn(button, (): void => { this.upgradeFair() });

        } else {
          const right = {
            icon: `${farm.toLowerCase()}Coin`,
            text: priceM
          };
          const button = this.scene.bigButton('green', 'left', 90, text, right);
          this.scene.clickModalBtn(button, (): void => { this.upgradeFair() });
        }
        
      } else {
        const right = {
          icon: 'lock',
          text: this.scene.state.lang.shortPart + ' ' + nextFair.part_unlock
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
    if (this.scene.state.farm === 'Cow') this.scene.game.scene.keys[this.scene.state.farm].territories.children.entries.find(el => el.territoryType === 4).fairLevelUp();
    else this.scene.game.scene.keys[this.scene.state.farm].fairLevelUp();
  }
}