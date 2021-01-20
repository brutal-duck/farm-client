import Scrolling from '../../../libs/Scrolling';
import { shopButton, boostButton } from '../../../elements';
import { chickenPrice } from '../../Chicken/basic';
import { sheepPrice } from '../../Sheep/basic';
import {
  click,
  clickShopBtn,
  payRobokassa,
  clickBoostBtn,
  payOdnoklassniki,
  payVK,
  shortTime,
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
  public herdBoostTimer: Phaser.GameObjects.Text;
  public freeCollector: any;
  public arrows: Arrows; // стрелки

  public click = click.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
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

      if (this.state.farm === 'Sheep') this.sheepBoosts();
      else if (this.state.farm === 'Chicken') this.chickenBoosts();
      this.herdBoost();
    }

  }

  public herdBoost(): void {
    this.add.tileSprite(0, 344 + this.height, 466, 230, 'boost-bg').setOrigin(0, 0);
    this.add.text(225, 360 + this.height, 'Стадо овец', { // Заменить текст
      font: '28px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
    
    this.add.sprite(40, 390 + this.height, `${this.state.farm.toLocaleLowerCase()}-herd-boost-icon`).setOrigin(0, 0);
    this.add.sprite(0, 344 + this.height, 'flags').setOrigin(0, 0).setFlipX(true);
    this.add.sprite(466, 344 + this.height, 'flags').setOrigin(1, 0);
    let herdBoostBtn: Phaser.GameObjects.Sprite = this.add.sprite(350, 485 + this.height, 'improve-collector');
    let herdBoostBtnText: Phaser.GameObjects.Text = this.add.text(350, 480 + this.height, this.state.lang.pickUp, {
      font: '26px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4).setDepth(10);
    let diamondBtn: Phaser.GameObjects.Sprite = this.add.sprite(385, 480 + this.height, 'diamond').setVisible(false).setScale(0.11);
    // осталось времени
    if (true) { // добавить условие this.state.[`user${this.state.farm}].herdBoost > 0
      let time: string = shortTime(10000, this.state.lang); // Вместо 3000 указать this.state.[`user${this.state.farm}].boost
      this.herdBoostTimer = this.add.text(350, 420 + this.height, this.state.lang.stillForBoost + '  ' + time, {
        font: '20px Shadow',
        color: '#FFFFFF',
        wordWrap: {width: 206},
        align: 'center'
      }).setOrigin(0.5, 0.5);
      herdBoostBtnText.setText(this.state.lang.buy + '    ' + 20 * 1); // заменить 1 на нужный множитель
      diamondBtn.setVisible(true);
      

    } else {
      herdBoostBtn.setY(460 + this.height);
      herdBoostBtnText.setY(455 + this.height);
      diamondBtn.setVisible(false);
    }
    
    this.clickShopBtn({ btn: herdBoostBtn, title: herdBoostBtnText, img: diamondBtn}, (): void => {
      this.game.scene.keys[this.state.farm].startHerdBoost();
    })

    // осталось времени

  }

  
  public update(): void {
    
    // укзывающие стрелки
    if (this.arrows?.active) this.arrows.update();
    
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
