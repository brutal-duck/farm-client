import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import Utils from '../../../libs/Utils';

export default class TerritoryExchangeWindowNew {
  public scene: Modal;
  private type: string;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.type = this.scene.state.territory.territoryType === 5 ? 'repository' :
    this.scene.state.territory.territoryType === 2 ? 'pasture' : 'water';
  }

  private create(): void {
    const farm: string = this.scene.state.farm.toLowerCase();
    let header: string = this.scene.state.lang[this.type].replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(header);

    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];
    const partSettings: IpartSettings[] = this.scene.state[`${farm}Settings`].partSettings;
    const territorySettings: IterritoriesPartSettings = partSettings[farmUser.part - 1].territory;

    const territoryPrice = { icon: `${farm}Coin`, text: shortNum(Math.round(territorySettings.improveTerritoryPrice / 100 * 30)) };
    const repositoryPrice = { icon: 'diamond', text: shortNum(territorySettings.improveRepositoryPrice) };
    

    const textTitle: string = this.scene.state.lang[`exchange${Utils.ucFirst(this.type)}Title`].replace('$1', this.scene.state.territory.improve);

    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 110, textTitle, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 450 },
    }).setOrigin(0.5, 0.5);

    if (this.scene.state.territory.territoryType === 5) {
      const button1 = this.scene.bigButton('green', 'left', -10, this.scene.state.lang.exchangeGrass, territoryPrice);
      this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(2) });
  
      const button2 = this.scene.bigButton('blue', 'left', 70, this.scene.state.lang.exchangeWater, territoryPrice);
      this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(3) });

      const button3 = this.scene.bigButton('red', 'center', 150, this.scene.state.lang.cancel);
      this.scene.clickModalBtn(button3, (): void => { this.close() });
    } else if (this.scene.state.territory.territoryType === 2) {
      const button1 = this.scene.bigButton('blue', 'left', -10, this.scene.state.lang.exchangeWater, territoryPrice);
      this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(3) });
  
      const button2 = this.scene.bigButton('orange', 'left', 70, this.scene.state.lang.exchangeRepository, repositoryPrice);
      this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });

      const button3 = this.scene.bigButton('red', 'center', 150, this.scene.state.lang.cancel);
      this.scene.clickModalBtn(button3, (): void => { this.close() });
    } else {
      const button1 = this.scene.bigButton('green', 'left', -10, this.scene.state.lang.exchangeGrass, territoryPrice);
      this.scene.clickModalBtn(button1, (): void => { this.exchangeTerritory(2) });
  
      const button2 = this.scene.bigButton('orange', 'left', 70, this.scene.state.lang.exchangeRepository, repositoryPrice);
      this.scene.clickModalBtn(button2, (): void => { this.exchangeTerritory(5) });

      const button3 = this.scene.bigButton('red', 'center', 150, this.scene.state.lang.cancel);
      this.scene.clickModalBtn(button3, (): void => { this.close() });
    }
    
    this.scene.resizeWindow(310);
  }
  

  private exchangeTerritory(territoryType?: number): void {
    if (territoryType) this.scene.game.scene.keys[this.scene.state.farm].confirmExchangeTerritory(territoryType);
    else {
      const modal: Imodal = {
        type: 1,
        sysType: 2
      };
      this.scene.state.modal = modal;
      this.scene.scene.launch('Modal', this.scene.state);
    }
  }

  private close(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }
}