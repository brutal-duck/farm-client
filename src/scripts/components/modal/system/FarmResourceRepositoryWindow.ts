import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class FarmResourceRepositoryWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    const farm: string = this.scene.state.farm
    let repository: string = this.scene.state.lang.repository.replace('$1', this.scene.state.territory.improve);
    this.scene.textHeader.setText(repository);
    
    let part: Ipart = this.scene.state[`${farm.toLowerCase()}Settings`][`${farm.toLowerCase()}Parts`].find((data: Ipart) => data.sort === this.scene.state[`user${farm}`].part);

    // let exchange = {
    //   icon: `${farm.toLowerCase()}Coin`,
    //   text: shortNum(part.improve_territory_2)
    // }

    let woolMoney = {
      icon: `${farm.toLowerCase()}Coin`,
      text: shortNum(this.scene.state.territory.money)
    }

    if (this.scene.state.territory.improve < this.scene.state[`${farm.toLowerCase()}Settings`][`territories${farm}Settings`].length) {

      let price: number;
      let lock: number = this.scene.state[`${farm.toLowerCase()}Settings`][`territories${farm}Settings`].find(data => data.improve === this.scene.state.territory.improve + 1).unlock_improve;
      
      if (this.scene.state[`user${farm}`].part >= lock) {

        if (this.scene.state.territory.improve === 1) price = part.improve_territory_2;
        else if (this.scene.state.territory.improve === 2) price = part.improve_territory_3;
        else price = part.improve_territory_4;

        let improve = {
          icon: `${farm.toLowerCase()}Coin`,
          text: shortNum(price)
        }
        let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
        let button = this.scene.bigButton('orange', 'left', 110, improveText, improve);
        this.scene.clickModalBtn(button, (): void => {
          this.scene.scene.stop();
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
          this.scene.game.scene.keys[this.scene.state.farm].improveTerritory();
        });

      } else {
        
        let improve = {
          icon: 'lock',
          text: this.scene.state.lang.shortPart + ' ' + lock
        }
        let improveText: string = this.scene.state.lang.improveToLevel.replace('$1', this.scene.state.territory.improve + 1);
        this.scene.bigButton('grey', 'left', 110, improveText, improve);

      }

      this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 160, '', {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5);

      this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 120, 'pb-chapter-modal');
      this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 120, 0, 16, 'green-progress').setOrigin(0, 0.5);

      this.scene.progressButton = this.scene.repositoryBtn(10, this.scene.state.lang.sellWool, woolMoney);
      this.scene.clickModalBtn(this.scene.progressButton, (): void => {this.sellResource(farm)});
      
      if (this.scene.state[`user${farm}`].feedBoostTime > 0) {
        this.scene.feedBoostText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 80, ' ', {
          font: '26px Bip',
          color: '#925C28'
        }).setOrigin(0.5, 0.5).setVisible(false);
      }

      let button1 = this.scene.bigButton('red', 'center', 200, this.scene.state.lang.exchangeRepositoryBtn);
      this.scene.clickModalBtn(button1, (): void => { this.launchModal() });

      this.scene.resizeWindow(430);

    } else {

      this.scene.progressText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 120, '', {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5);

      this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, 'pb-chapter-modal');
      this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY - 70, 0, 16, 'green-progress')
        .setOrigin(0, 0.5);

      this.scene.progressButton = this.scene.repositoryBtn(60, this.scene.state.lang.sellWool, woolMoney);
      this.scene.clickModalBtn(this.scene.progressButton, (): void => { this.sellResource(farm) });

      this.scene.feedBoostText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 30, ' ', {
        font: '26px Bip',
        color: '#925C28'
      }).setOrigin(0.5, 0.5).setVisible(false);

      

      let button1 = this.scene.bigButton('red', 'center', 170, this.scene.state.lang.exchangeRepositoryBtn);
      this.scene.clickModalBtn(button1, (): void => { this.launchModal() });

      this.scene.resizeWindow(330);

    }
  
  }


  private launchModal(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    let modal: Imodal = {
      type: 1,
      sysType: 11
    }
    this.scene.state.modal = modal;
    this.scene.scene.start('Modal', this.scene.state);
  }


  private sellResource(farm: string): void {

    let resourse: string

    if (farm === 'Sheep') resourse = 'Wool'
    else if (farm === 'Chicken') resourse = 'Egg'
    else if (farm === 'Cow') resourse = 'Milk'

    if (this.scene.state.territory.money > 0) {
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.game.scene.keys[this.scene.state.farm][`sell${resourse}`]();
    }
  }
}