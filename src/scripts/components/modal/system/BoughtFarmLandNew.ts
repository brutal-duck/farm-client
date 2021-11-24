import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import BigButton from './../../Buttons/BigButton';

export default class BoughtFarmLand {
  public scene: Modal;
  private price: number;
  private height: number;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);    
  }

  private create(): void {
    this.height = 120;
    this.scene.textHeader.setText(this.scene.state.lang.boughtLand);

    const farm: string = this.scene.state.farm;
    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${farm}`];
    const partSettings: IpartSettings[] = this.scene.state[`${farm.toLowerCase()}Settings`].partSettings;
    const territorySettings: IterritoriesPartSettings = partSettings[farmUser.part - 1].territory;

    const territoryPrice = { icon: `${farm.toLowerCase()}Coin`, text: shortNum(Math.round(territorySettings.improveTerritoryPrice / 100 * 30)) };
    const repositoryPrice = { icon: 'diamond', text: shortNum(territorySettings.improveRepositoryPrice) };
    
    if (farm === 'Sheep' && this.scene.state.userSheep.tutorial < 100) {
      territoryPrice.text = '0';
      repositoryPrice.text = '0';
      this.createSheepWindow(territoryPrice, repositoryPrice);
    } else if (farm === 'Cow') {
      this.createCowWindow(territoryPrice, repositoryPrice);
    } else {
      this.createWindow(territoryPrice, repositoryPrice);
    };
    
    this.scene.resizeWindow(this.height);
  }


  private createWindow(moneyPrice: IbigButtonElementSettings, diamondPrice: IbigButtonElementSettings) {
    new BigButton(this.scene, -60, (): void => { this.setTerritory(2); }, {
      color: 'green',
      text: this.scene.state.lang.sowPasture,
      textAlign: 'left',
      right1: moneyPrice,
    });

    new BigButton(this.scene, 30, (): void => { this.setTerritory(3); }, {
      color: 'blue',
      text: this.scene.state.lang.installWater,
      textAlign: 'left',
      right1: moneyPrice,
    });

    new BigButton(this.scene, 120, (): void => { this.setTerritory(5); }, {
      color: 'orange',
      text: this.scene.state.lang.buildRepository,
      textAlign: 'left',
      right1: diamondPrice,
    });

    this.height = 270;
  }

  private createSheepWindow(moneyPrice: IbigButtonElementSettings, diamondPrice: IbigButtonElementSettings) {
    if (this.scene.state.userSheep.tutorial === 20 &&
      this.scene.state.territory.block === 2 &&
      this.scene.state.territory.position === 3) {
      const button = this.scene.bigButton('green', 'left', 30, this.scene.state.lang.sowPasture, moneyPrice);
      this.scene.clickModalBtn(button, (): void => { this.setTerritory(2); });
    } else if (this.scene.state.userSheep.tutorial === 30 &&
      this.scene.state.territory.block === 2 &&
      this.scene.state.territory.position === 2) {
      const button = this.scene.bigButton('blue', 'left', 30, this.scene.state.lang.installWater, moneyPrice);
      this.scene.clickModalBtn(button, (): void => { this.setTerritory(3); });
    } else if (this.scene.state.userSheep.tutorial === 80 &&
      this.scene.state.territory.block === 2 &&
      this.scene.state.territory.position === 1) {
      const button = this.scene.bigButton('orange', 'left', 30, this.scene.state.lang.buildRepository, diamondPrice);
      this.scene.clickModalBtn(button, (): void => { this.setTerritory(5); });
    }
  }

  private createCowWindow(moneyPrice: IbigButtonElementSettings, diamondPrice: IbigButtonElementSettings) {
    if (this.scene.state.territory.block === 3 && this.scene.state.territory.position === 1 && this.scene.state.territory.territoryType === 1) {
      const button = this.scene.bigButton('orange', 'left', 30, this.scene.state.lang.buildFactory, moneyPrice);
      this.scene.clickModalBtn(button, (): void => { this.setTerritory(8); });
      this.height = 100;
    } else if (this.scene.state.territory.block === 2 && this.scene.state.territory.position === 1 && this.scene.state.territory.territoryType === 1) {
      const button = this.scene.bigButton('orange', 'left', 30, this.scene.state.lang.buildRepository, diamondPrice);
      this.scene.clickModalBtn(button, (): void => { this.setTerritory(5); });
      this.height = 100;
    } else {
      const button1 = this.scene.bigButton('green', 'left', -60, this.scene.state.lang.sowPasture, moneyPrice);
      this.scene.clickModalBtn(button1, (): void => { this.setTerritory(2); });

      const button2 = this.scene.bigButton('blue', 'left', 30, this.scene.state.lang.installWater, moneyPrice);
      this.scene.clickModalBtn(button2, (): void => { this.setTerritory(3); });

      const button3 = this.scene.bigButton('orange', 'left', 120, this.scene.state.lang.buildRepository, diamondPrice);
      this.scene.clickModalBtn(button3, (): void => { this.setTerritory(5); });
      this.height = 270;
    };
  }

  private setTerritory(type: number) {
    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];
    const partSettings: IpartSettings[] = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`].partSettings;
    const territorySettings: IterritoriesPartSettings = partSettings[farmUser.part - 1].territory;

    if (type === 5) {
      const price = territorySettings.improveRepositoryPrice;
      const { user } = this.scene.state;
      if (price <= user.diamonds) {
        user.diamonds -= price;
        this.scene.state.territory.bougthType = type;
        this.scene.state.territory.setTerritoryUnlockCooldown(type);
        this.scene.scene.stop();
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      } else {
        const count: number = price - user.diamonds;
        this.scene.state.convertor = {
          fun: 5,
          count: count,
          diamonds: count,
          type: 1
        };
        const modal: Imodal = { type: 1, sysType: 4 };
        this.scene.state.modal = modal;
        this.scene.scene.restart(this.scene.state);
      }
    } else {
      let price = Math.round(territorySettings.improveTerritoryPrice / 100 * 30);
      if (this.scene.state.farm === 'Sheep' && farmUser.tutorial < 100) {
        price = 0;
      }
      if (farmUser.money >= price) {
        farmUser.money -= price;
        this.scene.state.territory.bougthType = type;
        this.scene.state.territory.setTerritoryUnlockCooldown(type);
        this.scene.scene.stop();
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      } else {
        const count: number = price - farmUser.money;
        const diamonds: number = this.scene.game.scene.keys[this.scene.state.farm].convertMoney(count);
        this.scene.state.convertor = {
          fun: 5,
          count: count,
          diamonds: diamonds,
          type: 1
        };
        const modal: Imodal = {
          type: 1,
          sysType: 4,
        };
        this.scene.state.modal = modal;
        this.scene.scene.restart(this.scene.state);
      }
    }
  }
}