import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class BoughtFarmLand {
  public scene: Modal;
  private price: number;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);    
  }

  private create(): void {
    this.scene.textHeader.setText(this.scene.state.lang.boughtLand);

    const farm: string = this.scene.state.farm;
    let height: number = 120;
    this.price = this.scene.state[`${farm.toLowerCase()}Settings`][`territories${farm}Price`]
      .find((data: IterritoriesPrice) => data.block === this.scene.state.territory.block && data.position === this.scene.state.territory.position).price;

    // 30% от суммы покупки
    this.price = Math.round((this.price / 100) * 30);

    const right = {
      icon: `${farm.toLowerCase()}Coin`,
      text: shortNum(this.price)
    };
    
    if (farm === 'Sheep' && this.scene.state.userSheep.tutorial < 100) {
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
      }
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

    if (this.scene.state[`user${this.scene.state.farm}`].money >= this.price) {
      this.scene.state[`user${this.scene.state.farm}`].money -= this.price;
      this.scene.state.territory.bougthType = type;
      this.scene.state.territory.setTerritoryUnlockCooldown(type);
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    } else {
      const count: number = this.price - this.scene.state[`user${this.scene.state.farm}`].money;
      const diamonds: number = this.scene.game.scene.keys[this.scene.state.farm].convertMoney(count);
      this.scene.state.convertor = {
        fun: 5,
        count: count,
        diamonds: diamonds,
        type: 1
      }
      const modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.scene.state.modal = modal;
      this.scene.scene.restart(this.scene.state);
    }
  }
}