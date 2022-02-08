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
import assets from '../../../data/assets';

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
    this.load.image('shop-head', assets.shopHead);
    this.load.image('shop-close', assets.shopClose);
    this.load.image('shop-tab-active', assets.shopTabActive);
    this.load.image('shop-tab', assets.shopTab);
    if (this.state.farm === 'Sheep') this.load.image('icon-shop-sheep', assets.iconShopSheep);
    if (this.state.farm === 'Chicken') this.load.image('icon-shop-chicken', assets.iconShopChicken);
    if (this.state.farm === 'Cow') this.load.image('icon-shop-cow', assets.iconShopCow);
    if (this.state.farm === 'Unicorn') this.load.image('icon-shop-event', assets.iconShopEvent);
    this.load.image('icon-shop-boosts', assets.iconShopBoosts);
    this.load.image('bank-package', assets.bankPackage);
    this.load.image('stock-tape', assets.stockTape);
    this.load.image('shop-btn', assets.shopBtn);
    if (this.state.farm === 'Sheep') this.load.image('sheep-money-package', assets.sheepMoneyPackage);
    if (this.state.farm === 'Chicken') this.load.image('chicken-money-package', assets.chickenMoneyPackage);
    if (this.state.farm === 'Cow') this.load.image('cow-money-package', assets.cowMoneyPackage);
    if (this.state.farm === 'Unicorn') this.load.image('event-money-package', assets.eventMoneyPackage);
    this.load.image('animal-shop-bg', assets.animalShopBg);
    if (this.state.farm === 'Sheep') this.load.image('shop-sheep-wool-collector', assets.shopWoolCollector);
    if (this.state.farm === 'Chicken') this.load.image('shop-chicken-egg-collector', assets.shopEggCollector);
    if (this.state.farm === 'Cow') this.load.image('shop-cow-milk-collector', assets.shopMilkCollector);
    if (this.state.farm === 'Unicorn') this.load.image('shop-unicorn-resource-collector', assets.shopResourceCollector);
    this.load.image('shop-btn-disable', assets.shopBtnDisable);
    this.load.image('boost-btn', assets.boostBtn);
    this.load.image('boost-btn-disable', assets.boostBtnDisable);
    this.load.image('boost-btn-ad', assets.boostBtnAd);
    this.load.image('level-bg', assets.levelBg);
    this.load.image('boost-bg', assets.boostBg);
    this.load.image('lock-boost-bg', assets.lockBoostBg);
    this.load.image('lock-boost', assets.lockBoost);
    this.load.image('improve-collector', assets.improveCollector);
    this.load.image('starterpack-bg', assets.starterpackBg);
    this.load.image('starterpack-shadow', assets.starterpackShadow);
    this.load.image('free-diamonds-bg', assets.freeDiamondsBg);
    if (this.state.farm === 'Sheep') this.load.image('sheep-herd-boost-icon', assets.herdBoostSheepIcon);
    if (this.state.farm === 'Chicken') this.load.image('chicken-herd-boost-icon', assets.herdBoostChickenIcon);
    if (this.state.farm === 'Cow') this.load.image('cow-herd-boost-icon', assets.herdBoostCowIcon);
    if (this.state.farm === 'Unicorn') this.load.image('unicorn-herd-boost-icon', assets.herdBoostEventIcon);
    if (this.state.farm === 'Sheep') this.load.image('sheep-feed-boost-icon', assets.feedBoostSheepIcon);
    if (this.state.farm === 'Chicken') this.load.image('chicken-feed-boost-icon', assets.feedBoostChickenIcon);
    if (this.state.farm === 'Cow') this.load.image('cow-feed-boost-icon', assets.feedBoostCowIcon);
    if (this.state.farm === 'Unicorn') this.load.image('unicorn-feed-boost-icon', assets.feedBoostEventIcon);
    this.load.image('boost-counter-bg', assets.boostCounterBg);
    this.load.image('starterpack-icon', assets.starterpackIcon);
    this.load.image('free-diamond-plate', assets.freeDiamondPlate);
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
