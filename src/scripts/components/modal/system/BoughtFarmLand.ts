import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class BoughtFarmLand {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);    
  }

  private create(): void {
    this.scene.textHeader.setText(this.scene.state.lang.boughtLand);

    const farm: string = this.scene.state.farm;
    let height: number = 120;
    let price: number = this.scene.state[`${farm.toLowerCase()}Settings`][`territories${farm}Price`].find((data: IterritoriesPrice) => data.block === this.scene.state.territory.block && data.position === this.scene.state.territory.position).price;

    // 30% от суммы покупки
    price = Math.round((price / 100) * 30);

    const right = {
      icon: `${farm.toLowerCase()}Coin`,
      text: shortNum(price)
    };
    
    if (
      this.scene.state.userSheep.tutorial === 20 &&
      this.scene.state.territory.block === 2 &&
      this.scene.state.territory.position === 3
    ) {

      const button = this.scene.bigButton('green', 'left', 30, this.scene.state.lang.sowPasture, right);
      this.scene.clickModalBtn(button, (): void => { this.setTerritory(2) });

    } else if (
      this.scene.state.userSheep.tutorial === 30 &&
      this.scene.state.territory.block === 2 &&
      this.scene.state.territory.position === 2
    ) {

      const button = this.scene.bigButton('blue', 'left', 30, this.scene.state.lang.installWater, right);
      this.scene.clickModalBtn(button, (): void => { this.setTerritory(3) });

    } else if (
      this.scene.state.userSheep.tutorial === 80 &&
      this.scene.state.territory.block === 2 &&
      this.scene.state.territory.position === 1
    ) {

      const button = this.scene.bigButton('orange', 'left', 30, this.scene.state.lang.buildRepository, right);
      this.scene.clickModalBtn(button, (): void => { this.setTerritory(5) });

    } else if (farm === 'Cow') {

      if (this.scene.state.territory.block === 3 && this.scene.state.territory.position === 1 && this.scene.state.territory.territoryType === 1) {
        const button = this.scene.bigButton('orange', 'left', 30, this.scene.state.lang.buildFactory, right);
        this.scene.clickModalBtn(button, (): void => { this.setTerritory(8) });
        height = 100;
      } else if (this.scene.state.territory.block === 2 && this.scene.state.territory.position === 1 && this.scene.state.territory.territoryType === 1) {
        const button = this.scene.bigButton('orange', 'left', 30, this.scene.state.lang.buildRepository, right);
        this.scene.clickModalBtn(button, (): void => { this.setTerritory(5) });
        height = 100;
      } else {
        const button1 = this.scene.bigButton('green', 'left', -60, this.scene.state.lang.sowPasture, right);
        this.scene.clickModalBtn(button1, (): void => { this.setTerritory(2) });
      
        const button2 = this.scene.bigButton('blue', 'left', 30, this.scene.state.lang.installWater, right);
        this.scene.clickModalBtn(button2, (): void => { this.setTerritory(3) });
        
        const button3 = this.scene.bigButton('orange', 'left', 120, this.scene.state.lang.buildRepository, right);
        this.scene.clickModalBtn(button3, (): void => { this.setTerritory(5) });
        height = 270
      };

    } else {

      const button1 = this.scene.bigButton('green', 'left', -60, this.scene.state.lang.sowPasture, right);
      this.scene.clickModalBtn(button1, (): void => { this.setTerritory(2) });

      const button2 = this.scene.bigButton('blue', 'left', 30, this.scene.state.lang.installWater, right);
      this.scene.clickModalBtn(button2, (): void => { this.setTerritory(3) });
      
      const button3 = this.scene.bigButton('orange', 'left', 120, this.scene.state.lang.buildRepository, right);
      this.scene.clickModalBtn(button3, (): void => { this.setTerritory(5) });
      height = 270;
      
    };
    
    this.scene.resizeWindow(height);
  }


  private setTerritory(type: number) {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    // this.scene.state.exchangeTerritory = type;
    // this.scene.game.scene.keys[this.scene.state.farm].installTerritory();
    this.scene.state.territory.bougthType = type;
    if (this.scene.state.farm !== 'Cow') {
      this.scene.game.scene.keys[this.scene.state.farm].setTerritoryUnlockCooldown(type);
    } else {
      this.scene.state.territory.setTerritoryUnlockCooldown(type);
    }
  }
}