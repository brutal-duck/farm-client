import { shortNum, shortTime } from "../../general/basic";
import BigInteger from "../../libs/BigInteger";
import Modal from "../../scenes/Modal/Modal";
import MoneyAnimation from "../animations/MoneyAnimation";

export default class EventProgressWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    let height: number = 80;
    let doubleProfitPrice: number = 5;
    let ad: boolean = false;
  
    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - height, 'autoprogress-bg');
  
    this.scene.add.text(this.scene.cameras.main.centerX + 58, this.scene.cameras.main.centerY - 148 - height, this.scene.state.lang.offlineTime, {
      font: '21px Shadow',
      color: '#06693e'
    }).setOrigin(1);
  
    // Для тестов
    // this.scene.state.modal = {
    //   type: 11,
    //   eventParams: {
    //     offlineTime: 1000,
    //     offlineProgress: '655',
    //     collectorTime: 566
    //   }
    // }

    this.scene.add.text(this.scene.cameras.main.centerX + 150, this.scene.cameras.main.centerY - 146 - height, shortTime(this.scene.state.modal.eventParams.offlineTime, this.scene.state.lang), {
      font: '36px Shadow',
      color: '#fff3e1'
    }).setOrigin(0.5, 1).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 3);
  
    this.scene.add.text(this.scene.cameras.main.centerX + 12, this.scene.cameras.main.centerY - 74 - height, this.scene.state.lang.offlineCollectorTime + ' ' + shortTime(this.scene.state.modal.eventParams.collectorTime, this.scene.state.lang), {
      font: '21px Shadow',
      color: '#fff3e1',
      align: 'center',
      wordWrap: { width: 260 }
    }).setOrigin(0.5, 0.5).setLineSpacing(8);
  
    this.scene.add.text(this.scene.cameras.main.centerX + 80, this.scene.cameras.main.centerY + 10 - height, '+' + shortNum(this.scene.state.modal.eventParams.offlineProgress), {
      font: '48px Shadow',
      color: '#fff3e1'
    }).setOrigin(0.5, 0.5).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 3);
  
    this.scene.add.text(this.scene.cameras.main.centerX + 9, this.scene.cameras.main.centerY + 96 - height, this.scene.state.lang.doubleProfit, {
      font: '24px Shadow',
      color: '#643302'
    }).setOrigin(0.5, 0.5);
  
    // Определение стоимости удвоения
    if (this.scene.state.modal.eventParams.offlineTime >= 1800 && this.scene.state.modal.eventParams.offlineTime <= 7200) doubleProfitPrice = 40
    else if (this.scene.state.modal.eventParams.offlineTime > 7200) doubleProfitPrice = 90;
  
    // Кнопка удвоения
    let btn: Phaser.GameObjects.Sprite;
    let title: Phaser.GameObjects.Text;
    let img1: Phaser.GameObjects.Sprite;
    let text1: Phaser.GameObjects.Text;
  
    btn = this.scene.add.sprite(this.scene.cameras.main.centerX + 9, this.scene.cameras.main.centerY + 156 - height, 'purple-btn');
    title = this.scene.add.text(btn.x - 140, btn.y, this.scene.state.lang.pickUp + ' X2', {
      font: '30px Shadow',
      color: '#fff3e1',
    }).setOrigin(0, 0.5).setStroke('#7214a3', 7).setCrop(0, 0, 200, 100);
  
  
    if (this.scene.state.readyAd && doubleProfitPrice === 5) {
  
      img1 = this.scene.add.sprite(btn.x + 100, btn.y, 'ad-icon').setScale(0.8);
      ad = true;
  
    } else {
  
      img1 = this.scene.add.sprite(btn.x + 80, btn.y, 'diamond').setScale(0.12);
      text1 = this.scene.add.text(btn.x + 120, btn.y, String(doubleProfitPrice), { font: '30px Shadow', color: '#fff3e1', }).setOrigin(0.5, 0.5).setStroke('#7214a3', 7); 
  
    }
  
    this.scene.clickModalBtn({
      btn: btn,
      title: title,
      text1: text1,
      img1: img1
    }, (): void => {
  
      this.scene.state.userUnicorn.money = BigInteger.add(this.scene.state.userUnicorn.money, this.scene.state.modal.eventParams.offlineProgress);
      if (ad && doubleProfitPrice === 5) {
  
        this.scene.game.scene.keys[this.scene.state.farm].watchAd(5);
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
  
      } else if (this.scene.state.user.diamonds - doubleProfitPrice >= 0) {
        
        this.scene.state.user.diamonds -= doubleProfitPrice;
  
        this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('diamonds_spent', {
          type: 'event_double_salary',
          count: doubleProfitPrice,
        });
  
        this.scene.state.userUnicorn.money = BigInteger.add(this.scene.state.userUnicorn.money, this.scene.state.modal.eventParams.offlineProgress);
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
        MoneyAnimation.create(this.scene.game.scene.keys['UnicornBars']);
  
      } else {
        
        this.scene.state.convertor = {
          fun: 0,
          count: doubleProfitPrice - this.scene.state.user.diamonds,
          diamonds: doubleProfitPrice - this.scene.state.user.diamonds,
          type: 1
        }
    
        this.scene.game.scene.keys[this.scene.state.farm].exchange();
      }
  
    })
  
  
    // Кнопка 'Забрать'
    this.scene.time.addEvent({ delay: 3000, callback: (): void => {
  
      let pickUp = this.scene.shopButton(this.scene.cameras.main.centerX + 9, this.scene.cameras.main.centerY + 276 - height, this.scene.state.lang.pickUp);
      this.scene.clickShopBtn(pickUp, (): void => {
        this.scene.state.userUnicorn.money = BigInteger.add(this.scene.state.userUnicorn.money, this.scene.state.modal.eventParams.offlineProgress);
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
    
      });
  
    }, callbackScope: this, loop: false });
  
    
  }
}