import { shortNum, shortTime } from "../../general/basic";
import BigInteger from "../../libs/BigInteger";
import Modal from "../../scenes/Modal/Modal";
import MoneyAnimation from "../animations/MoneyAnimation";

export default class EventProgressWindow {
  public scene: Modal;
  private doubleProfitPrice: number = 5;
  private params: IunicornParams;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.params = this.scene.state.modal.unicornParams;
    this.setPrice();
  }

  private create(): void {
    const height: number = 80;
    const x: number = this.scene.cameras.main.centerX;
    const y: number = this.scene.cameras.main.centerY;
    this.scene.add.sprite(x, y - height, 'autoprogress-bg');
    this.scene.add.text(x + 58, y - 148 - height, this.scene.state.lang.offlineTime, {
      font: '21px Shadow',
      color: '#06693e'
    }).setOrigin(1);
  
    this.scene.add.text(x + 150, y - 146 - height, shortTime(this.params.offlineTime, this.scene.state.lang), {
      font: '36px Shadow',
      color: '#fff3e1'
    }).setOrigin(0.5, 1).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 3);
  
    this.scene.add.text(x + 12, y - 74 - height, this.scene.state.lang.offlineCollectorTime + ' ' + shortTime(this.params.collectorTime, this.scene.state.lang), {
      font: '21px Shadow',
      color: '#fff3e1',
      align: 'center',
      wordWrap: { width: 260 }
    }).setOrigin(0.5).setLineSpacing(8);
  
    this.scene.add.text(x + 80, y + 10 - height, '+' + shortNum(this.params.offlineProgress), {
      font: '48px Shadow',
      color: '#fff3e1'
    }).setOrigin(0.5).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 3);
  
    this.scene.add.text(x + 9, y + 96 - height, this.scene.state.lang.doubleProfit, {
      font: '24px Shadow',
      color: '#643302'
    }).setOrigin(0.5);
  
    const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(x + 9, y + 156 - height, 'purple-btn');
    const title: Phaser.GameObjects.Text = this.scene.add.text(btn.x - 140, btn.y, this.scene.state.lang.pickUp + ' X2', {
      font: '30px Shadow',
      color: '#fff3e1',
    }).setOrigin(0, 0.5).setStroke('#7214a3', 7).setCrop(0, 0, 200, 100);
    const img1: Phaser.GameObjects.Sprite = this.scene.add.sprite(btn.x + 80, btn.y, 'diamond').setScale(0.12);
    const text1: Phaser.GameObjects.Text = this.scene.add.text(btn.x + 120, btn.y, String(this.doubleProfitPrice), { font: '30px Shadow', color: '#fff3e1', }).setOrigin(0.5).setStroke('#7214a3', 7);
    if (this.checkAd()) {
      img1.setTexture('ad-icon');
      img1.setScale(0.8);
      img1.setX(img1.x + 20);
      text1.setVisible(false);
    } 

    const modalBtn: any = {
      btn,
      title,
      text1,
      img1
    };
    this.scene.clickModalBtn(modalBtn, (): void => { this.doubleProfitBtnHandler(); });
  
    this.scene.time.addEvent({ delay: 3000, callback: (): void => {
      const pickUp = this.scene.shopButton(x + 9, y + 276 - height, this.scene.state.lang.pickUp);
      this.scene.clickShopBtn(pickUp, (): void => { this.pickUpBtnHandler(); });
    }, callbackScope: this, loop: false });
  }

  private setPrice(): void {
    const THIRTY_MINUTES: number = 1800;
    const TWO_HOURS: number = 7200;
    if (this.params.offlineTime >= THIRTY_MINUTES && this.params.offlineTime <= TWO_HOURS) this.doubleProfitPrice = 10;
    else if (this.params.offlineTime > TWO_HOURS) this.doubleProfitPrice = 20;
  }

  private pickUpBtnHandler(): void {
    this.scene.state.userUnicorn.money = BigInteger.add(this.scene.state.userUnicorn.money, this.params.offlineProgress);
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
  }

  private doubleProfitBtnHandler(): void {
    this.scene.state.userUnicorn.money = BigInteger.add(this.scene.state.userUnicorn.money, this.params.offlineProgress);
    if (this.checkAd()) {
      // this.scene.game.scene.keys[this.scene.state.farm].watchAd(5);
      this.scene.game.scene.keys[this.scene.state.farm].ads.watchAd(5);
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.scene.stop();
    } else if (this.scene.state.user.diamonds >= this.doubleProfitPrice) {
      this.scene.state.user.diamonds -= this.doubleProfitPrice;
      this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
        type: 'event_double_salary',
        count: this.doubleProfitPrice,
      });
      this.scene.state.userUnicorn.money = BigInteger.add(this.scene.state.userUnicorn.money, this.params.offlineProgress);
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.scene.stop();
      MoneyAnimation.create(this.scene.game.scene.keys['UnicornBars']);
    } else {
      this.scene.state.convertor = {
        fun: 0,
        count: this.doubleProfitPrice - this.scene.state.user.diamonds,
        diamonds: this.doubleProfitPrice - this.scene.state.user.diamonds,
        type: 1
      };
      this.scene.game.scene.keys[this.scene.state.farm].exchange();
    }
  }

  private checkAd(): boolean {
    return this.scene.state.readyAd && this.doubleProfitPrice === 5;
  }
}