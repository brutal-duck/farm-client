import { clickButtonUp } from '../../../general/clicks';
import { openShop } from '../../../general/animations';
import Hint from '../../../components/animations/Hint';
import { shortTime } from '../../../general/basic';
import Notificator from './../../../components/gameObjects/Notificator';

class ShopBars extends Phaser.Scene {
  
  public state: Istate;
  public clickButtonUp = clickButtonUp.bind(this);
  public openShop = openShop.bind(this);
  public boostTabNotificator: Notificator;
  public diamondTabNotificator: Notificator;
  public opened: boolean = false;

  constructor() {
    super('ShopBars');
  }

  
  public init(state: Istate): void {
    this.state = state;
  }


  public create(): void {
    
    // бахрама
    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 390, 'shop-head').setDepth(2);

    // кнопка закрыть
    let close: Phaser.GameObjects.Sprite = this.add.sprite(605, this.cameras.main.centerY - 465, 'shop-close');
    this.clickButtonUp(close, (): void => {
      if (this.state.boughtFeedBoost) {
        Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.feedBoostNotification} ${shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang)}`, 2);
        this.state.boughtFeedBoost = false;
      }
      if (this.state.boughtFactoryBoost) {
        Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.factoryBoostNotification} ${shortTime(this.state[`user${this.state.farm}`].factory.boostTime, this.state.lang)}`, 2);
        this.state.boughtFactoryBoost = false;
      };
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.opened = false;
      this.scene.stop();
      this.scene.stop('Shop');
      this.scene.stop('Modal');
    
    });
    if (this.state.farm === 'Sheep' && this.state.userSheep?.tutorial === 90) {
      close.setVisible(false);
    }

    // кристаллы
    if (this.state.modal.shopType === 1) {

      this.add.sprite(136, this.cameras.main.centerY - 485, 'shop-tab-active').setDepth(1);
      this.add.sprite(136, this.cameras.main.centerY - 495, 'diamond').setScale(0.25).setDepth(1);

    } else {
      
      let diamonds: Phaser.GameObjects.Sprite = this.add.sprite(136, this.cameras.main.centerY - 485, 'shop-tab');
      let diamondsIcon: Phaser.GameObjects.Sprite = this.add.sprite(136, this.cameras.main.centerY - 487, 'diamond').setScale(0.25);
      this.clickButtonUp(diamonds, (): void => {
  
        if (this.state.userSheep?.tutorial !== 90) {

          let modal: Imodal = {
            type: 2,
            shopType: 1
          }
          this.state.modal = modal;
          this.scene.stop();
          this.scene.stop('Shop');
          this.scene.stop('Modal');
          this.scene.launch('Modal', this.state);

        }
  
      }, diamondsIcon);

    }

    let coinIcon: string;
    let animalIconTexture: string;

    if (this.state.farm === 'Sheep') {

      coinIcon = 'sheepCoin';
      animalIconTexture = 'icon-shop-sheep';

    } else if (this.state.farm === 'Chicken') {

      coinIcon = 'chickenCoin';
      animalIconTexture = 'icon-shop-chicken';
    
    } else if (this.state.farm === 'Unicorn') {

      coinIcon = 'unicornCoin';
      animalIconTexture = 'icon-shop-event';

    } else if (this.state.farm === 'Cow') {

      coinIcon = 'cowCoin';
      animalIconTexture = 'icon-shop-cow';
      
    }
    // монеты
    if (this.state.modal.shopType === 2) {

      this.add.sprite(258, this.cameras.main.centerY - 485, 'shop-tab-active').setDepth(1);
      this.add.sprite(258, this.cameras.main.centerY - 492, coinIcon).setScale(0.25).setDepth(1);

    } else {

      let money: Phaser.GameObjects.Sprite = this.add.sprite(258, this.cameras.main.centerY - 485, 'shop-tab');
      let moneyIcon: Phaser.GameObjects.Sprite = this.add.sprite(258, this.cameras.main.centerY - 485, coinIcon).setScale(0.25);
      this.clickButtonUp(money, (): void => {

        if (this.state.userSheep?.tutorial !== 90) {

          let modal: Imodal = {
            type: 2,
            shopType: 2
          }
          this.state.modal = modal;
          this.scene.stop();
          this.scene.stop('Shop');
          this.scene.stop('Modal');
          this.scene.launch('Modal', this.state);

        }

      }, moneyIcon);

    }


    
    // животные
    if (this.state.modal.shopType === 3) {

      this.add.sprite(380, this.cameras.main.centerY - 485, 'shop-tab-active').setDepth(1);
      this.add.sprite(380, this.cameras.main.centerY - 492, animalIconTexture).setDepth(1);

    } else {

      let animal: Phaser.GameObjects.Sprite = this.add.sprite(380, this.cameras.main.centerY - 485, 'shop-tab');
      let animalIcon: Phaser.GameObjects.Sprite = this.add.sprite(380, this.cameras.main.centerY - 487, animalIconTexture);
      this.clickButtonUp(animal, (): void => {

        if (this.state.userSheep?.tutorial !== 90) {

          let modal: Imodal = {
            type: 2,
            shopType: 3
          }
          this.state.modal = modal;
          this.scene.stop();
          this.scene.stop('ClanFarm');
          this.scene.stop('Profile');
          this.scene.stop('Shop');
          this.scene.stop('Modal');
          this.scene.launch('Modal', this.state);
          
        }

      }, animalIcon);

    }


    // бусты
    if (this.state.modal.shopType === 4) {

      this.add.sprite(502, this.cameras.main.centerY - 485, 'shop-tab-active').setDepth(1);
      this.add.sprite(502, this.cameras.main.centerY - 492, 'icon-shop-boosts').setDepth(1);

    } else {

      let boosts: Phaser.GameObjects.Sprite = this.add.sprite(502, this.cameras.main.centerY - 485, 'shop-tab');
      let boostsIcon: Phaser.GameObjects.Sprite = this.add.sprite(502, this.cameras.main.centerY - 487, 'icon-shop-boosts');
      this.clickButtonUp(boosts, (): void => {

        let modal: Imodal = {
          type: 2,
          shopType: 4
        }
        this.state.modal = modal;
        this.scene.stop();
        this.scene.stop('Shop');
        this.scene.stop('Modal');
        this.scene.stop('ClanFarm');
        this.scene.stop('Profile');
        this.scene.launch('Modal', this.state);

      }, boostsIcon);

    }

    if (!this.opened) {
      this.opened = true;
      this.openShop(this.cameras.main, this.game.scene.keys['Modal'].cameras.main, 
      this.game.scene.keys['Shop'].cameras.cameras[0], 
      this.game.scene.keys['Shop'].cameras.cameras[1])
    }

    this.boostTabNotificator = new Notificator(this, { x: 540, y: this.cameras.main.centerY - 520, }).setDepth(2);
    this.diamondTabNotificator = new Notificator(this, { x: 175, y: this.cameras.main.centerY - 520 }).setDepth(2);
  }

  public update(): void {
    this.updateNotification();
    // this.updateEventNotification();
  }

  public updateNotification(): void {  
    
    if (this.state[`user${this.state.farm}`].part < this.game.scene.keys[this.state.farm].herdBoostLvl ||
      this.state[`user${this.state.farm}`].takenHerdBoost > 0 ||
      !this.state.user.additionalTutorial.herdBoost){
      this.boostTabNotificator.setCount(0);
    } else if (this.state.modal.shopType === 4) {
      this.boostTabNotificator.setPosition(560, this.cameras.main.centerY - 540);
    } else if (this.state.modal.shopType !== 4 &&
    this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
    this.state[`user${this.state.farm}`].takenHerdBoost <= 0 &&
    this.state.user.additionalTutorial.herdBoost) {
      this.boostTabNotificator.setPosition(540, this.cameras.main.centerY - 520);
      this.boostTabNotificator.setCount(this.state.shopNotificationCount[3]);
    }

    if (this.state.modal.shopType === 1) {
      this.diamondTabNotificator.setPosition(195, this.cameras.main.centerY - 540);
      this.diamondTabNotificator.setCount(this.state.shopNotificationCount[0]);
    } else if (this.state.modal.shopType !== 1) {
      this.diamondTabNotificator.setPosition(175, this.cameras.main.centerY - 520);
      this.diamondTabNotificator.setCount(this.state.shopNotificationCount[0]);
    }
  }

  // public updateEventNotification(): void{  
  //   if (this.state.modal.shopType === 4 && 
  //   (this.state[`user${this.state.farm}`].points < this.game.scene.keys[this.state.farm].herdBoostLvl ||
  //   this.state[`user${this.state.farm}`].takenHerdBoost > 0 ||
  //   this.notificationBoostCounter.text === '0' || !this.state.user.additionalTutorial.herdBoost) &&
  //   this.notificationBoost.visible) {
  //     this.notificationBoost.setVisible(false);
  //     this.notificationBoostCounter.setVisible(false);
  //   } else if (!(this.state.modal.shopType === 4) &&
  //   this.state[`user${this.state.farm}`].points >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
  //   this.state[`user${this.state.farm}`].takenHerdBoost <= 0 &&
  //   !this.notificationBoost.visible && 
  //   this.notificationBoostCounter.text !== '0' && this.state.user.additionalTutorial.herdBoost) {
  //     this.notificationBoost.setVisible(true);
  //     this.notificationBoostCounter.setVisible(true);
  //   }
  // }
}

export default ShopBars;
