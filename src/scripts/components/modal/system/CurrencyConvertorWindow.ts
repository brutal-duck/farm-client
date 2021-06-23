import { shortNum, shortTime } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import Hint from "../../animations/Hint";

export default class CurrencyConvertorWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    this.scene.textHeader.setText(this.scene.state.lang.exchange);

    if (this.scene.state.convertor.type === 1) this.typeOneConverter()
    else if (this.scene.state.convertor.type === 2) this.typeTwoConverter()
    
  }


  private typeOneConverter(): void {

    this.scene.resizeWindow(300);

    let count: number | string = shortNum(this.scene.state.convertor.count);
    let length: number = String(count).length * 10 + 15;
    
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 140, this.scene.state.lang.rememberSellWool, {
      font: '26px Bip',
      color: '#57A90E',
      align: 'center',
      wordWrap: { width: 440 }
    }).setOrigin(0.5, 0);

    let notEnaugh: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - length, this.scene.cameras.main.centerY - 10, this.scene.state.lang.notEnoughForYou, {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    let border = notEnaugh.getBounds();

    this.scene.add.text(border.right + 50, this.scene.cameras.main.centerY - 10, count, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center'
    }).setOrigin(0, 0.5);

    this.scene.add.sprite(border.right + 5, this.scene.cameras.main.centerY - 10, 'sheepCoin').setOrigin(0, 0.5).setScale(0.15);

    if (this.scene.state.convertor.diamonds === 1 && this.scene.state.readyAd) {

      let right = {
        icon: 'ad-icon',
        text: ''
      }

      let ad = this.scene.bigButton('green', 'left', 60, this.scene.state.lang.addCoins, right);
      this.scene.clickModalBtn(ad, (): void => { this.watchAdAndClose() });

    } else {

      // let right = {
      //   icon: 'diamond',
      //   text: shortNum(this.scene.state.convertor.diamonds)
      // }

      // let pay = this.scene.bigButton('green', 'left', 60, this.scene.state.lang.surcharge, right);
      // this.scene.clickModalBtn(pay, (): void => {
      //   this.scene.stop();
      //   this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      //   this.scene.game.scene.keys[this.scene.state.farm].exchange();
      // });

      let btn = this.scene.bigButton('green', 'center', 60, this.scene.state.lang.goExchanger);
      this.scene.clickModalBtn(btn, (): void => { this.openModal() });

    }
  
    let cancel = this.scene.bigButton('yellow', 'center', 140, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(cancel, (): void => { this.closeWindow() });
  }


  private typeTwoConverter(): void {

    this.scene.resizeWindow(280);

    let count: number | string = shortNum(this.scene.state.convertor.count);
    let length: number = String(count).length * 10 + 15;

    let notEnaugh: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - length, this.scene.cameras.main.centerY - 55, this.scene.state.lang.notEnoughForYou, {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    let border = notEnaugh.getBounds();

    this.scene.add.text(border.right + 50, this.scene.cameras.main.centerY - 55, count, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center'
    }).setOrigin(0, 0.5);

    this.scene.add.sprite(border.right + 5, this.scene.cameras.main.centerY - 55, 'diamond').setOrigin(0, 0.5).setScale(0.15);

    let pay = this.scene.bigButton('green', 'center', 40, this.scene.state.lang.buy);
    this.scene.clickModalBtn(pay, (): void => { this.showBankAndClose() });

    let cancel = this.scene.bigButton('yellow', 'center', 120, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(cancel, (): void => { this.closeWindow() });

  }


  private closeWindow(): void {
    if (this.scene.state.boughtFeedBoost) {
      Hint.create(this.scene.game.scene.keys[`${this.scene.state.farm}Bars`], -250, `${this.scene.state.lang.feedBoostNative} ${shortTime(this.scene.state[`user${this.scene.state.farm}`].feedBoostTime, this.scene.state.lang)}`, 2);
      this.scene.state.boughtFeedBoost = false;
    };
    
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }


  private watchAdAndClose(): void {
    this.scene.game.scene.keys[this.scene.state.farm].watchAd(1);
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }


  private showBankAndClose(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.game.scene.keys[this.scene.state.farm].showBank();
  }


  private openModal(): void {
    let modal: Imodal = {
      type: 2,
      shopType: 2
    }
    this.scene.state.modal = modal;
    this.scene.scene.stop();
    this.scene.scene.start('Modal', this.scene.state);
  }
}