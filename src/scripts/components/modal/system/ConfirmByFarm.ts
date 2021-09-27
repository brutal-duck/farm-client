import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class ConfirmBuyFarm {
  public scene: Modal;
  private user: IuserSheep | IuserChicken | IuserCow;
  private progress: IpartProgress;
  private farm: string;
  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init() {
    if (this.scene.state.userChicken.part <= 0) {
      this.user = this.scene.state.userSheep;
      this.progress = this.scene.state.progress.chicken;
      this.farm = 'Chicken';
    } else if (this.scene.state.userChicken.part > 0) {
      this.user = this.scene.state.userChicken;
      this.progress = this.scene.state.progress.cow;
      this.farm = 'Cow';
    }
  }

  private create(): void {
    const headerText: string = this.scene.state.lang[`${this.farm.toLowerCase()}Farm`];
    this.scene.textHeader.setText(headerText);
    const price: number = this.progress.price;

    const text: string = this.scene.state.lang[`confirmBuy${this.farm}Farm`];

    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, text, {
      font: '26px Bip',
      color: '#925C28',
      wordWrap: { width: 450 },
      align: 'center',
    }).setOrigin(0.5);

    const img = {
      icon: this.farm === 'Chicken' ? 'sheepCoin' : 'chickenCoin',
      text: shortNum(price), // Обработать обновление текста кнопки
    };

    const textBtn: string = this.scene.state.lang.buy;
    const confirmBtn = this.scene.bigButton('green', 'left', 20, textBtn, img);
    const redBtn = this.scene.bigButton('red', 'center', 110, this.scene.state.lang.cancel);

    this.scene.clickModalBtn(confirmBtn, (): void => {
      this.closeWindow();
      this.confirmBuy();
    });

    this.scene.clickModalBtn(redBtn, (): void => { this.closeWindow(); });

    this.scene.resizeWindow(250);
  }


  private confirmBuy(): void {
    if (this.user.money >= this.progress.price) {
      this.user.money -= this.progress.price;
      this.scene.state.amplitude.logAmplitudeEvent('get_new_farm', {
        type: 'buy',
        farm_id: this.farm
      });
      this.scene.scene.stop('Profile');
      this.scene.scene.stop('Modal');
      this.scene.scene.stop(this.scene.state.farm);
      this.scene.scene.stop(this.scene.state.farm + 'Bars');
      this.scene.scene.start(this.farm + 'Preload', this.scene.state);
    } else {
      if (
        this.scene.state.farm !== 'Chicken' && this.farm === 'Cow' ||
        this.scene.state.farm !== 'Sheep' && this.farm === 'Chicken'
      ) {
        
        this.scene.state.modal = {
          type: 1,
          sysType: 3,
          height: 150,
          message: this.farm === 'Cow' ? this.scene.state.lang.notEnoughCoins : this.scene.state.lang.notEnoughSheepCoins,
        }
        this.scene.scene.restart(this.scene.state);
      } else {
        const count: number = this.progress.price - this.user.money;
        const diamonds: number = this.scene.game.scene.keys[this.scene.state.farm].convertMoney(count);
        this.scene.state.convertor = {
          fun: 7,
          count: count,
          diamonds: diamonds,
          type: 1
        };
  
        this.scene.state.modal = {
          type: 1,
          sysType: 4
        };
        this.scene.scene.restart(this.scene.state);
      }
    }
  }

  private closeWindow(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }
}