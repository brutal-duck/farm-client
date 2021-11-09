import Scrolling from '../../../libs/Scrolling';
import { shopButton, boostButton } from '../../../elements';
import { cowPrice } from '../../Cow/basic';
import { chickenPrice } from '../../Chicken/basic';
import { sheepPrice } from '../../Sheep/basic';
import { animalPrice } from '../../Event/Unicorns/basic';
import {
  click,
  clickShopBtn,
  clickModalBtn,
  clickBoostBtn,
} from '../../../general/clicks';
import {
  payRobokassa,
  payOdnoklassniki,
  payVK,
  payYandex,
  shortTime,
  loadingModal,
} from '../../../general/basic';
import DiamondsWindow from '../../../components/modal/shop/DiamondsWindow';
import BoostsWindow from '../../../components/modal/shop/BoostsWindow';
import MoneyWindow from '../../../components/modal/shop/MoneyWindow';
import AnimalWindow from '../../../components/modal/shop/AnimalWindow';
import AnimalUnicornWindow from '../../../components/modal/shop/AnimalUnicornWindow';

const shopHead: string = require('./../../../../assets/images/modal/shop-head.png');
const shopClose: string = require('./../../../../assets/images/modal/shop-close.png');
const shopTabActive: string = require('./../../../../assets/images/modal/shop-tab-active.png');
const shopTab: string = require('./../../../../assets/images/modal/shop-tab.png');
const iconShopSheep: string = require('./../../../../assets/images/sheep/icons/icon-shop-sheep.png');
const iconShopChicken: string = require('./../../../../assets/images/chicken/icons/icon-shop-chicken.png');
const iconShopCow: string = require('./../../../../assets/images/cow/icons/icon-shop-cow.png');
const iconShopEvent: string = require('./../../../../assets/images/event/icons/icon-shop-event.png');
const iconShopBoosts: string = require('./../../../../assets/images/icons/icon-shop-boosts.png');
const bankPackage: string = require('./../../../../assets/images/modal/bank-package.png');
const stockTape: string = require('./../../../../assets/images/modal/stock-tape.png');
const shopBtn: string = require('./../../../../assets/images/modal/shop-btn.png');
const sheepMoneyPackage: string = require('./../../../../assets/images/sheep/money-package.png');
const chickenMoneyPackage: string = require('./../../../../assets/images/chicken/money-package.png');
const cowMoneyPackage: string = require('./../../../../assets/images/cow/money-package.png');
const eventMoneyPackage: string = require('./../../../../assets/images/event/money-package.png');
const animalShopBg: string = require('./../../../../assets/images/modal/animal-shop-bg.png');
const shopWoolCollector: string = require('./../../../../assets/images/sheep/shop-wool-collector.png');
const shopEggCollector: string = require('./../../../../assets/images/chicken/shop-egg-collector.png');
const shopMilkCollector: string = require('./../../../../assets/images/cow/shop-milk-collector.png');
const shopBtnDisable: string = require('./../../../../assets/images/modal/shop-btn-disable.png');
const boostBtn: string = require('./../../../../assets/images/modal/boost-btn.png');
const boostBtnDisable: string = require('./../../../../assets/images/modal/boost-btn-disable.png');
const boostBtnAd: string = require('./../../../../assets/images/modal/boost-btn-ad.png');
const levelBg: string = require('./../../../../assets/images/modal/level-bg.png');
const boostBg: string = require('./../../../../assets/images/modal/boost-bg.png');
const improveCollector: string = require('./../../../../assets/images/modal/improve-collector.png');
const shopResourceCollector: string = require('./../../../../assets/images/event/shop-resource-collector.png');
const starterpackBg: string = require('./../../../../assets/images/modal/starterpack-bg.png');
const starterpackShadow: string = require('./../../../../assets/images/modal/starterpack-icon-shadow.png');
const herdBoostSheepIcon: string = require('./../../../../assets/images/icons/sheep-herd-boost.png');
const herdBoostChickenIcon: string = require('./../../../../assets/images/icons/chicken-herd-boost.png');
const herdBoostCowIcon: string = require('./../../../../assets/images/icons/cow-herd-boost.png');
const herdBoostEventIcon: string = require('./../../../../assets/images/icons/event-herd-boost.png');
const feedBoostSheepIcon: string = require('./../../../../assets/images/icons/sheep-feed-boost.png');
const feedBoostChickenIcon: string = require('./../../../../assets/images/icons/chicken-feed-boost.png');
const feedBoostCowIcon: string = require('./../../../../assets/images/icons/cow-feed-boost.png');
const feedBoostEventIcon: string = require('./../../../../assets/images/icons/event-feed-boost.png');
const freeDiamondsBg: string = require('./../../../../assets/images/modal/free-diamonds-bg.png');
const boostCounterBg: string = require('./../../../../assets/images/modal/boost-counter-bg.png');
const starterpackIcon: string = require('../../../../assets/images/icons/starterpack.png');
class Shop extends Phaser.Scene {
  [x: string]: any;
  public diamondsWindow: DiamondsWindow;
  constructor() {
    super('Shop');
  }
  
  public state: Istate;
  public scrolling: Scrolling;
  public height: number;
  public heightWindow: number = 835;

  public click = click.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public shopButton = shopButton.bind(this);
  public chickenPrice = chickenPrice.bind(this);
  public cowPrice = cowPrice.bind(this);
  public sheepPrice = sheepPrice.bind(this);
  public boostButton = boostButton.bind(this);
  public clickBoostBtn = clickBoostBtn.bind(this);
  public payOdnoklassniki = payOdnoklassniki.bind(this);
  public payVK = payVK.bind(this);
  public payYandex = payYandex.bind(this);
  public animalPrice = animalPrice.bind(this);
  public loadingModal = loadingModal.bind(this);


  public init(state: Istate): void {
  
    this.state = state;

  }

  public preload(): void {
    this.loadingModal();
    this.load.image('shop-head', shopHead);
    this.load.image('shop-close', shopClose);
    this.load.image('shop-tab-active', shopTabActive);
    this.load.image('shop-tab', shopTab);
    if (this.state.farm === 'Sheep') this.load.image('icon-shop-sheep', iconShopSheep);
    if (this.state.farm === 'Chicken') this.load.image('icon-shop-chicken', iconShopChicken);
    if (this.state.farm === 'Cow') this.load.image('icon-shop-cow', iconShopCow);
    if (this.state.farm === 'Unicorn') this.load.image('icon-shop-event', iconShopEvent);
    this.load.image('icon-shop-boosts', iconShopBoosts);
    this.load.image('bank-package', bankPackage);
    this.load.image('stock-tape', stockTape);
    this.load.image('shop-btn', shopBtn);
    if (this.state.farm === 'Sheep') this.load.image('sheep-money-package', sheepMoneyPackage);
    if (this.state.farm === 'Chicken') this.load.image('chicken-money-package', chickenMoneyPackage);
    if (this.state.farm === 'Cow') this.load.image('cow-money-package', cowMoneyPackage);
    if (this.state.farm === 'Unicorn') this.load.image('event-money-package', eventMoneyPackage);
    this.load.image('animal-shop-bg', animalShopBg);
    if (this.state.farm === 'Sheep') this.load.image('shop-sheep-wool-collector', shopWoolCollector);
    if (this.state.farm === 'Chicken') this.load.image('shop-chicken-egg-collector', shopEggCollector);
    if (this.state.farm === 'Cow') this.load.image('shop-cow-milk-collector', shopMilkCollector);
    if (this.state.farm === 'Unicorn') this.load.image('shop-unicorn-resource-collector', shopResourceCollector);
    this.load.image('shop-btn-disable', shopBtnDisable);
    this.load.image('boost-btn', boostBtn);
    this.load.image('boost-btn-disable', boostBtnDisable);
    this.load.image('boost-btn-ad', boostBtnAd);
    this.load.image('level-bg', levelBg);
    this.load.image('boost-bg', boostBg);
    this.load.image('improve-collector', improveCollector);
    this.load.image('starterpack-bg', starterpackBg);
    this.load.image('starterpack-shadow', starterpackShadow);
    this.load.image('free-diamonds-bg', freeDiamondsBg);
    if (this.state.farm === 'Sheep') this.load.image('sheep-herd-boost-icon', herdBoostSheepIcon);
    if (this.state.farm === 'Chicken') this.load.image('chicken-herd-boost-icon', herdBoostChickenIcon);
    if (this.state.farm === 'Cow') this.load.image('cow-herd-boost-icon', herdBoostCowIcon);
    if (this.state.farm === 'Unicorn') this.load.image('unicorn-herd-boost-icon', herdBoostEventIcon);
    if (this.state.farm === 'Sheep') this.load.image('sheep-feed-boost-icon', feedBoostSheepIcon);
    if (this.state.farm === 'Chicken') this.load.image('chicken-feed-boost-icon', feedBoostChickenIcon);
    if (this.state.farm === 'Cow') this.load.image('cow-feed-boost-icon', feedBoostCowIcon);
    if (this.state.farm === 'Unicorn') this.load.image('unicorn-feed-boost-icon', feedBoostEventIcon);
    this.load.image('boost-counter-bg', boostCounterBg);
    this.load.image('starterpack-icon', starterpackIcon);
  }


  public create(): void {

    this.scene.launch('ShopBars', this.state);
    this.game.scene.keys['Modal'].add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 70, 'shop-window');
    this.height = Number(this.game.config.height);

    let cameraOptions = {
      x: 130,
      y: this.cameras.main.centerY - 360,
      width: 465,
      height: this.heightWindow,
      wheel: true,
      top: this.height
    };
    this.scrolling = new Scrolling(this, cameraOptions);

    if (this.state.farm === 'Unicorn' && this.state.modal.shopType === 3 && this.game.scene.keys['Unicorn'].scrollPoint) {
      this.scrolling.scrollY = this.game.scene.keys['Unicorn'].scrollPoint
    }

    this.input.on('pointerup', (): void => {
      this.scrolling.enabled = true;
      this.scrolling.wheel = true;
    });

    if (this.state.modal.shopType === 1) this.diamondsWindow = new DiamondsWindow(this);
    else if (this.state.modal.shopType === 2) new MoneyWindow(this);
    else if (this.state.modal.shopType === 3) {

      if (this.state.farm === 'Unicorn') new AnimalUnicornWindow(this);
      else new AnimalWindow(this);

    } else if (this.state.modal.shopType === 4) new BoostsWindow(this);
    
  }


  
  public update(): void {
    
    if (this.state.farm === 'Unicorn' && this.state.modal.shopType === 3) {
      this.game.scene.keys['Unicorn'].scrollPoint = this.scrolling.scrollY;
    }
    
  }


}

export default Shop;
