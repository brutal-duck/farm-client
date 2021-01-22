import Scrolling from '../../../libs/Scrolling';
import { shopButton, boostButton } from '../../../elements';
import { chickenPrice } from '../../Chicken/basic';
import { sheepPrice } from '../../Sheep/basic';
import {
  click,
  clickShopBtn,
  clickModalBtn,
  payRobokassa,
  clickBoostBtn,
  payOdnoklassniki,
  payVK,
  shortTime,
  shortNum,
} from '../../../general/basic';
import {
  sheepMoney,
  sheep,
  sheepBoosts,
  updateSheepPrices
} from './sheep';
import {
  chickenMoney,
  chicken,
  chickenBoosts,
  updateChickenPrices
} from './chicken';
import { Arrows } from '../../../elements';

let shopHead: any = require("./../../../../assets/images/modal/shop-head.png");
let shopClose: any = require("./../../../../assets/images/modal/shop-close.png");
let shopTabActive: any = require("./../../../../assets/images/modal/shop-tab-active.png");
let shopTab: any = require("./../../../../assets/images/modal/shop-tab.png");
let iconShopSheep: any = require("./../../../../assets/images/sheep/icons/icon-shop-sheep.png");
let iconShopChicken: any = require("./../../../../assets/images/chicken/icons/icon-shop-chicken.png");
let iconShopBoosts: any = require("./../../../../assets/images/icons/icon-shop-boosts.png");
let bankPackage: any = require("./../../../../assets/images/modal/bank-package.png");
let stockTape: any = require("./../../../../assets/images/modal/stock-tape.png");
let shopBtn: any = require("./../../../../assets/images/modal/shop-btn.png");
let sheepMoneyPackage: any = require("./../../../../assets/images/sheep/money-package.png");
let chickenMoneyPackage: any = require("./../../../../assets/images/chicken/money-package.png");
let animalShopBg: any = require("./../../../../assets/images/modal/animal-shop-bg.png");
let shopWoolCollector: any = require("./../../../../assets/images/sheep/shop-wool-collector.png");
let shopEggCollector: any = require("./../../../../assets/images/chicken/shop-egg-collector.png");
let shopBtnDisable: any = require("./../../../../assets/images/modal/shop-btn-disable.png");
let boostBtn: any = require("./../../../../assets/images/modal/boost-btn.png");
let boostBtnDisable: any = require("./../../../../assets/images/modal/boost-btn-disable.png");
let boostBtnAd: any = require("./../../../../assets/images/modal/boost-btn-ad.png");
let levelBg: any = require("./../../../../assets/images/modal/level-bg.png");
let boostBg: any = require("./../../../../assets/images/modal/boost-bg.png");
let improveCollector: any = require("./../../../../assets/images/modal/improve-collector.png");

class Shop extends Phaser.Scene {
  constructor() {
    super('Shop');
  }
  
  public state: Istate;
  public scrolling: Scrolling;
  public height: number;
  public heightWindow: number = 625;
  public buttons: IshopButtons[];
  public collectorTimer: Phaser.GameObjects.Text;
  public herdBoostTimerText: Phaser.GameObjects.Text;
  public freeCollector: any;
  public arrows: Arrows; // стрелки

  // буст

  public herdBoostBtnRightText: Phaser.GameObjects.Text;
  public herdBoostBtnLeftText: Phaser.GameObjects.Text;
  public herdBoostDiamondBtn: Phaser.GameObjects.Sprite;
  public herdBoostBtn: any;

  public click = click.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public shopButton = shopButton.bind(this);
  public chickenPrice = chickenPrice.bind(this);
  public sheepPrice = sheepPrice.bind(this);
  public boostButton = boostButton.bind(this);
  public clickBoostBtn = clickBoostBtn.bind(this);
  public chickenMoney = chickenMoney.bind(this);
  public chicken = chicken.bind(this);
  public chickenBoosts = chickenBoosts.bind(this);
  public updateChickenPrices = updateChickenPrices.bind(this);
  public sheepMoney = sheepMoney.bind(this);
  public sheep = sheep.bind(this);
  public sheepBoosts = sheepBoosts.bind(this);
  public updateSheepPrices = updateSheepPrices.bind(this);
  public payOdnoklassniki = payOdnoklassniki.bind(this);
  public payVK = payVK.bind(this);

  public init(state: Istate): void {
    
    this.state = state;
    this.buttons = [];
  }

  public preload(): void {
    
    this.load.image('shop-head', shopHead);
    this.load.image('shop-close', shopClose);
    this.load.image('shop-tab-active', shopTabActive);
    this.load.image('shop-tab', shopTab);
    if (this.state.farm === 'Sheep') this.load.image('icon-shop-sheep', iconShopSheep);
    if (this.state.farm === 'Chicken') this.load.image('icon-shop-chicken', iconShopChicken);
    this.load.image('icon-shop-boosts', iconShopBoosts);
    this.load.image('bank-package', bankPackage);
    this.load.image('stock-tape', stockTape);
    this.load.image('shop-btn', shopBtn);
    if (this.state.farm === 'Sheep') this.load.image('sheep-money-package', sheepMoneyPackage);
    if (this.state.farm === 'Chicken') this.load.image('chicken-money-package', chickenMoneyPackage);
    this.load.image('animal-shop-bg', animalShopBg);
    if (this.state.farm === 'Sheep') this.load.image('shop-sheep-wool-collector', shopWoolCollector);
    if (this.state.farm === 'Chicken') this.load.image('shop-chicken-egg-collector', shopEggCollector);
    this.load.image('shop-btn-disable', shopBtnDisable);
    this.load.image('boost-btn', boostBtn);
    this.load.image('boost-btn-disable', boostBtnDisable);
    this.load.image('boost-btn-ad', boostBtnAd);
    this.load.image('level-bg', levelBg);
    this.load.image('boost-bg', boostBg);
    this.load.image('improve-collector', improveCollector);

  }


  public create(): void {

    this.scene.launch('ShopBars', this.state);

    this.height = Number(this.game.config.height);

    let cameraOptions = {
      x: 130,
      y: this.cameras.main.centerY - 260,
      width: 460,
      height: this.heightWindow,
      wheel: true,
      top: this.height
    };
    this.scrolling = new Scrolling(this, cameraOptions);
    this.input.on('pointerup', (): void => {
      this.scrolling.enabled = true;
      this.scrolling.wheel = true;
    });


    if (this.state.modal.shopType === 1) {

      this.shopDiamonds();

    } else if (this.state.modal.shopType === 2) {

      if (this.state.farm === 'Sheep') this.sheepMoney();
      else if (this.state.farm === 'Chicken') this.chickenMoney();

    } else if (this.state.modal.shopType === 3) {

      if (this.state.farm === 'Sheep') this.sheep();
      else if (this.state.farm === 'Chicken') this.chicken();

    } else if (this.state.modal.shopType === 4) {   
      this.scrolling.bottom = this.height - this.heightWindow + 300;   
      if (this.state.farm === 'Sheep') this.sheepBoosts();
      else if (this.state.farm === 'Chicken') this.chickenBoosts();
      if (this.state[`user${this.state.farm}`].part >= 6) this.herdBoost(); // проверяем главу и создаем окно только если глава выше 6
    }

  }

  public herdBoost(): void {

    this.add.tileSprite(0, 344 + this.height, 466, 270, 'boost-bg').setOrigin(0, 0);
    this.add.text(240, 380 + this.height, this.state.lang[`herdBoostTitle${this.state.farm}`], { // Заменить текст
      font: '28px Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 300 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
    
    this.add.sprite(40, 420 + this.height, `${this.state.farm.toLocaleLowerCase()}-herd-boost-icon`).setOrigin(0, 0);
    this.add.sprite(0, 344 + this.height, 'flags').setOrigin(0, 0).setFlipX(true);
    this.add.sprite(466, 344 + this.height, 'flags').setOrigin(1, 0);
    // кнопка
    let xBtn: number =  330;
    let yBtn: number = 520 + this.height;
    this.herdBoostBtn = this.add.sprite(xBtn, yBtn, 'improve-collector');
    this.herdBoostBtn.setDataEnabled();
    this.herdBoostBtn.data.values.updated = false;

    this.herdBoostDiamondBtn = this.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11);
    
    this.herdBoostBtnLeftText = this.add.text(xBtn, yBtn - 5 , this.state.lang.buy, {
      font: '23px Shadow',
      color: '#FFFFFF'
    }).setOrigin(1, 0.5).setStroke('#3B5367', 4).setDepth(10);

    this.herdBoostBtnRightText = this.add.text(xBtn, yBtn - 5 , String(shortNum(this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost)), {
      font: '23px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0, 0.5).setStroke('#3B5367', 4).setDepth(10);

    
    this.herdBoostDiamondBtn.setX(this.herdBoostBtn.x + this.herdBoostBtnLeftText.width - 25 - this.herdBoostBtnRightText.width);
    this.herdBoostBtnLeftText.setX(this.herdBoostDiamondBtn.getBounds().left - 2);
    this.herdBoostBtnRightText.setX(this.herdBoostDiamondBtn.getBounds().right + 1);
    
    this.herdBoostTimerText = this.add.text(xBtn, yBtn - 60, this.state.lang.stillForBoost + ' ' + shortTime(this.state.timeToHerdBoost, this.state.lang), {
      font: '20px Shadow',
      color: '#FFFFFF',
      wordWrap: {width: 220},
      align: 'center'
    }).setOrigin(0.5, 0.5);

    this.clickModalBtn({ btn: this.herdBoostBtn, title: this.herdBoostBtnLeftText, text1: this.herdBoostBtnRightText, img1: this.herdBoostDiamondBtn }, (): void => {
      if (this.state.user.diamonds >= this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost) {
        this.state.user.diamonds -= this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost;
        this.game.scene.keys[this.state.farm].startHerdBoost();

        if (this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost > 0) {
          this.state.amplitude.getInstance().logEvent('diamonds_spent', {
            type: 'herd',
            count: this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost,
            farm_id: this.state.farm
          });
        }

        this.state.amplitude.getInstance().logEvent('booster_merge', {
          count: this.state[`user${this.state.farm}`].takenHerdBoost,
          farm_id: this.state.farm
        });
      } else {
        // вызывем конвертор
        this.state.convertor = {
          fun: 0,
          count: this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost,
          diamonds: this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost,
          type: 1
        }
        this.game.scene.keys[this.state.farm].exchange();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');
      }
      // проверка хватает ли денег и лишь потом запуск сцены
    });
  }
  
  public update(): void {
    // укзывающие стрелки
    if (this.arrows?.active) this.arrows.update();
    
    // обновляем время бустера
    if (this.state.modal.shopType === 4 && this.state[`user${this.state.farm}`].part >= 6) {
      let xBtn: number =  330;
      let yBtn: number = 520 + this.height;
      this.herdBoostTimerText.setText(this.state.lang.stillForBoost + ' ' + shortTime(this.state.timeToHerdBoost, this.state.lang));
      if (this.state[`user${this.state.farm}`].takenHerdBoost <= 0 && !this.herdBoostBtn.data.values.updated) { 
        this.herdBoostBtn.data.values.updated = true;
        // если не взят буст
        this.herdBoostBtnLeftText.setText(this.state.lang.pickUp); 
        this.herdBoostDiamondBtn.setVisible(false);
        this.herdBoostBtn.setY(yBtn - 23);
        this.herdBoostBtnLeftText.setY(yBtn - 25);
        this.herdBoostBtnLeftText.setX(xBtn);
        this.herdBoostBtnLeftText.setOrigin(0.5, 0.5);
        this.herdBoostBtnRightText.setVisible(false);
        this.herdBoostTimerText.setVisible(false);
      } 
    }

    
  }


  // окно покупки кристаллов
  public shopDiamonds(): void {

    this.state.amplitude.getInstance().logEvent('bank_page_viewed', {
      farm_id: this.state.farm
    });
    
    let rows: number = Math.ceil(this.state.packages.length / 2);
    let height: number = rows * 270 + 40;
    this.scrolling.bottom = this.height - this.heightWindow + height;

    for (let i: number = 0; i < rows; i++) {

      let y: number = i * 270 + 40;
      let left: Ipackage = this.state.packages[i * 2];
      let right: Ipackage = this.state.packages[i * 2 + 1];
      
      // левая
      let pack: Phaser.GameObjects.Sprite = this.add.sprite(0, y + this.height, 'bank-package').setOrigin(0, 0);
      this.click(pack, (): void => {

        this.state.amplitude.getInstance().logEvent('bank_pack_selected', {
          package_id: left.id
        });
        
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');

        if (this.state.platform === 'ok') {
          this.payOdnoklassniki(left.id);
        } else if (this.state.platform === 'vk') {
          this.payVK(left.id);
        } else {
          payRobokassa(left.id, this.state);
        }

      });

      this.add.text(110, y + 145 + this.height, String(left.diamonds), {
        font: '40px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5);

      if (left.bonus > 0) {

        this.add.text(110, y + 180 + this.height, '+' + left.bonus + ' ' + this.state.lang.free, {
          font: '20px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);

      }

      let text: string;

      if (this.state.platform === 'ok') {
        text = left.price + ' ' + 'ОК';
      } else if (this.state.platform === 'vk') {
        text = Math.floor(left.price / 7) + ' ' + this.state.lang.voices;
      } else {
        text = left.price + ' ' + this.state.lang.ruble;
      }

      let btn = this.shopButton(110, y + 223 + this.height, text);
      this.clickShopBtn(btn, (): void => {
        
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');

        if (this.state.platform === 'ok') {
          this.payOdnoklassniki(left.id);
        } else if (this.state.platform === 'vk') {
          this.payVK(left.id);
        } else {
          payRobokassa(left.id, this.state);
        }

      });

      if (left.stock > 0) {

        this.add.sprite(0, y + this.height, 'stock-tape').setOrigin(0, 0);
        this.add.text(162, y + 42 + this.height, '-' + left.stock + '%', {
          font: '34px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5).setRotation(0.55);

      }
      
      // правая
      if (right) {
        
        let pack: Phaser.GameObjects.Sprite = this.add.sprite(240, y + this.height, 'bank-package').setOrigin(0, 0);
        this.click(pack, (): void => {
          
          this.state.amplitude.getInstance().logEvent('bank_pack_selected', {
            package_id: right.id
          });

          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.scene.stop();
          this.scene.stop('ShopBars');
          this.scene.stop('Modal');
          
          if (this.state.platform === 'ok') {
            this.payOdnoklassniki(right.id);
          } else if (this.state.platform === 'vk') {
            this.payVK(right.id);
          } else {
            payRobokassa(right.id, this.state);
          }

        });

        this.add.text(350, y + 145 + this.height, String(right.diamonds), {
          font: '40px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);

        if (right.bonus > 0) {

          this.add.text(350, y + 180 + this.height, '+' + right.bonus + ' ' + this.state.lang.free, {
            font: '20px Shadow',
            color: '#FFFFFF'
          }).setOrigin(0.5, 0.5);

        }
        
        let text: string;

        if (this.state.platform === 'ok') {
          text = right.price + ' ' + 'ОК';
        } else if (this.state.platform === 'vk') {
          text = Math.floor(right.price / 7) + ' ' + this.state.lang.voices;
        } else {
          text = right.price + ' ' + this.state.lang.ruble;
        }

        let btn = this.shopButton(350, y + 223 + this.height, text);
        this.clickShopBtn(btn, (): void => {
          
          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.scene.stop();
          this.scene.stop('ShopBars');
          this.scene.stop('Modal');

          if (this.state.platform === 'ok') {
            this.payOdnoklassniki(right.id);
          } else if (this.state.platform === 'vk') {
            this.payVK(right.id);
          } else {
            payRobokassa(right.id, this.state);
          }

        });

        if (right.stock > 0) {

          this.add.sprite(240, y + this.height, 'stock-tape').setOrigin(0, 0);
          this.add.text(402, y + 42 + this.height, '-' + right.stock + '%', {
            font: '34px Shadow',
            color: '#FFFFFF'
          }).setOrigin(0.5, 0.5).setRotation(0.55);

        }

      }

    }

  }
  

}

export default Shop;
