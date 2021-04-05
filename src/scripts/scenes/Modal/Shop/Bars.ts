import { clickButtonUp } from '../../../general/clicks';
import { openShop } from '../../../general/animations';
import Hint from '../../../components/animations/Hint';
import { shortTime } from '../../../general/basic';

class ShopBars extends Phaser.Scene {
  
  public state: Istate;
  public clickButtonUp = clickButtonUp.bind(this);
  public openShop = openShop.bind(this);
  public nativeBoost: Phaser.GameObjects.Graphics;
  public nativeBoostCounter: Phaser.GameObjects.Text;
  public nativeDiamond: Phaser.GameObjects.Graphics;
  public nativeDiamondCounter: Phaser.GameObjects.Text;
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
        this.game.scene.keys[`${this.state.farm}Bars`].hint = Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.feedBoostNative} ${shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang)}`, 2);
        this.state.boughtFeedBoost = false;
      }

      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.opened = false;
      this.scene.stop();
      this.scene.stop('Shop');
      this.scene.stop('Modal');
    
    });

    //натив вкладки с бустами
    this.nativeBoost = this.add.graphics()
      .fillStyle(0xFF2400, 1)
      .fillCircle(550, this.cameras.main.centerY - 520, 20)
      .setDepth(2)
      .setVisible(false);
    this.nativeBoostCounter = this.add.text(550, this.cameras.main.centerY - 520, String(this.state.nativeCounter[3]), {
      font: '32px Shadow',
      color: '#f3eae6'
    }).setDepth(3)
      .setOrigin(0.5, 0.5)
      .setVisible(false);

    //натив вкладки с diamonds
    this.nativeDiamond = this.add.graphics()
      .fillStyle(0xFF2400, 1)
      .fillCircle(175, this.cameras.main.centerY - 520, 20)
      .setDepth(2)
      .setVisible(false);
    this.nativeDiamondCounter = this.add.text(175, this.cameras.main.centerY - 520, String(this.state.nativeCounter[0]), {
      font: '32px Shadow',
      color: '#f3eae6'
    }).setDepth(3)
      .setOrigin(0.5, 0.5)
      .setVisible(false);

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
    
    } else if (this.state.farm === 'Event') {

      coinIcon = 'eventCoin';
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
        this.scene.launch('Modal', this.state);

      }, boostsIcon);

    }

    if (!this.opened) {
      this.opened = true;
      this.openShop(this.cameras.main, this.game.scene.keys['Modal'].cameras.main, 
      this.game.scene.keys['Shop'].cameras.cameras[0], 
      this.game.scene.keys['Shop'].cameras.cameras[1])
    }
  }

  public update(): void {
    this.updateNative();
    // this.updateEventNative();
  }

  public updateNative(): void{  
    if (this.state.modal.shopType === 4 && 
    (this.state[`user${this.state.farm}`].part < this.game.scene.keys[this.state.farm].herdBoostLvl ||
    this.state[`user${this.state.farm}`].takenHerdBoost > 0 ||
    this.nativeBoostCounter.text === '0' || !this.state.user.additionalTutorial.herdBoost) &&
    this.nativeBoost.visible) {
      this.nativeBoost.setVisible(false);
      this.nativeBoostCounter.setVisible(false);
    } else if (!(this.state.modal.shopType === 4) &&
    this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
    this.state[`user${this.state.farm}`].takenHerdBoost <= 0 &&
    !this.nativeBoost.visible && 
    this.nativeBoostCounter.text !== '0' && this.state.user.additionalTutorial.herdBoost) {
      this.nativeBoost.setVisible(true);
      this.nativeBoostCounter.setVisible(true);
    }

    if ((this.state.modal.shopType === 1 ||
      this.state.user.starterpack || 
      this.nativeDiamondCounter.text === '0') && 
      this.nativeDiamond.visible) {
        
      this.nativeDiamond.setVisible(false);
      this.nativeDiamondCounter.setVisible(false);

    } else if (this.state.modal.shopType !== 1 &&
      !this.state.user.starterpack && 
      this.nativeDiamondCounter.text !== '0' && 
      !this.nativeDiamond.visible) {

      this.nativeDiamond.setVisible(true);
      this.nativeDiamondCounter.setVisible(true);

    }
  }

  public updateEventNative(): void{  
    if (this.state.modal.shopType === 4 && 
    (this.state[`user${this.state.farm}`].maxLevelAnimal < this.game.scene.keys[this.state.farm].herdBoostLvl ||
    this.state[`user${this.state.farm}`].takenHerdBoost > 0 ||
    this.nativeBoostCounter.text === '0' || !this.state.user.additionalTutorial.herdBoost) &&
    this.nativeBoost.visible) {
      this.nativeBoost.setVisible(false);
      this.nativeBoostCounter.setVisible(false);
    } else if (!(this.state.modal.shopType === 4) &&
    this.state[`user${this.state.farm}`].maxLevelAnimal >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
    this.state[`user${this.state.farm}`].takenHerdBoost <= 0 &&
    !this.nativeBoost.visible && 
    this.nativeBoostCounter.text !== '0' && this.state.user.additionalTutorial.herdBoost) {
      this.nativeBoost.setVisible(true);
      this.nativeBoostCounter.setVisible(true);
    }
  }
}

export default ShopBars;
