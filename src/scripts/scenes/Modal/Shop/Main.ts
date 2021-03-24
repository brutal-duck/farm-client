import Scrolling from '../../../libs/Scrolling';
import { shopButton, boostButton } from '../../../elements';
import { cowPrice } from '../../Cow/basic';
import { chickenPrice } from '../../Chicken/basic';
import { sheepPrice } from '../../Sheep/basic';
import { animalPrice } from '../../Event/basic';
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
  shortTime,
} from '../../../general/basic';
import {  
  updateHerdBoostBtn,
  herdBoost,
  feedBoost,
  collectorBoost,
  updateFeedBoostBtn,
} from '../../../general/boosts';
import {
  sheepMoney,
  sheep,
  updateSheepPrices
} from './sheep';
import {
  chickenMoney,
  chicken,
  updateChickenPrices
} from './chicken';
import {
  cowMoney,
  cow,
  updateCowPrices
} from './cow';
import {
  animalMoney,
  animals,
  updateAnimalPrices,
  eventCollectorBoost,
  updateEventFeedBoostBtn,
  updateEventHerdBoostBtn,
  eventFeedBoost,
  eventHerdBoost,
  getDiamondPrice
} from './event';
import { Arrows } from '../../../elements';
import { openModal } from '../../../general/animations';

let shopHead: any = require("./../../../../assets/images/modal/shop-head.png");
let shopClose: any = require("./../../../../assets/images/modal/shop-close.png");
let shopTabActive: any = require("./../../../../assets/images/modal/shop-tab-active.png");
let shopTab: any = require("./../../../../assets/images/modal/shop-tab.png");
let iconShopSheep: any = require("./../../../../assets/images/sheep/icons/icon-shop-sheep.png");
let iconShopChicken: any = require("./../../../../assets/images/chicken/icons/icon-shop-chicken.png");
let iconShopCow: any = require("./../../../../assets/images/cow/icons/icon-shop-cow.png");
let iconShopEvent: any = require("./../../../../assets/images/event/icons/icon-shop-event.png");
let iconShopBoosts: any = require("./../../../../assets/images/icons/icon-shop-boosts.png");
let bankPackage: any = require("./../../../../assets/images/modal/bank-package.png");
let stockTape: any = require("./../../../../assets/images/modal/stock-tape.png");
let shopBtn: any = require("./../../../../assets/images/modal/shop-btn.png");
let sheepMoneyPackage: any = require("./../../../../assets/images/sheep/money-package.png");
let chickenMoneyPackage: any = require("./../../../../assets/images/chicken/money-package.png");
let cowMoneyPackage: any = require("./../../../../assets/images/cow/money-package.png");
let eventMoneyPackage: any = require("./../../../../assets/images/event/money-package.png");
let animalShopBg: any = require("./../../../../assets/images/modal/animal-shop-bg.png");
let shopWoolCollector: any = require("./../../../../assets/images/sheep/shop-wool-collector.png");
let shopEggCollector: any = require("./../../../../assets/images/chicken/shop-egg-collector.png");
let shopMilkCollector: any = require("./../../../../assets/images/cow/shop-milk-collector.png");
let shopBtnDisable: any = require("./../../../../assets/images/modal/shop-btn-disable.png");
let boostBtn: any = require("./../../../../assets/images/modal/boost-btn.png");
let boostBtnDisable: any = require("./../../../../assets/images/modal/boost-btn-disable.png");
let boostBtnAd: any = require("./../../../../assets/images/modal/boost-btn-ad.png");
let levelBg: any = require("./../../../../assets/images/modal/level-bg.png");
let boostBg: any = require("./../../../../assets/images/modal/boost-bg.png");
let improveCollector: any = require("./../../../../assets/images/modal/improve-collector.png");
let shopResourceCollector: any = require("./../../../../assets/images/event/shop-resource-collector.png");
let starterpackBg: any = require("./../../../../assets/images/modal/starterpack-bg.png");
let starterpackShadow: any = require("./../../../../assets/images/modal/starterpack-icon-shadow.png");
let herdBoostSheepIcon: any = require("./../../../../assets/images/icons/sheep-herd-boost.png");
let herdBoostChickenIcon: any = require("./../../../../assets/images/icons/chicken-herd-boost.png");
let herdBoostCowIcon: any = require("./../../../../assets/images/icons/cow-herd-boost.png");
let herdBoostEventIcon: any = require("./../../../../assets/images/icons/event-herd-boost.png");
let feedBoostSheepIcon: any = require("./../../../../assets/images/icons/sheep-feed-boost.png");
let feedBoostChickenIcon: any = require("./../../../../assets/images/icons/chicken-feed-boost.png");
let feedBoostCowIcon: any = require("./../../../../assets/images/icons/cow-feed-boost.png");
let feedBoostEventIcon: any = require("./../../../../assets/images/icons/event-feed-boost.png");

class Shop extends Phaser.Scene {
  constructor() {
    super('Shop');
  }
  
  public state: Istate;
  public scrolling: Scrolling;
  public height: number;
  public heightWindow: number = 835;
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
  public feedProgressBar: Phaser.GameObjects.TileSprite;
  public feedProgressText: Phaser.GameObjects.Text;
  public feedProgressBarBg: Phaser.GameObjects.Sprite;
  public feedBoostBtnRightText: Phaser.GameObjects.Text;
  public feedBoostBtnLeftText: Phaser.GameObjects.Text;
  public feedBoostDiamondBtn: Phaser.GameObjects.Sprite;
  public feedBoostBtn: any;

  public click = click.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public shopButton = shopButton.bind(this);
  public chickenPrice = chickenPrice.bind(this);
  public cowPrice = cowPrice.bind(this);
  public sheepPrice = sheepPrice.bind(this);
  public boostButton = boostButton.bind(this);
  public clickBoostBtn = clickBoostBtn.bind(this);
  public chickenMoney = chickenMoney.bind(this);
  public chicken = chicken.bind(this);
  public updateChickenPrices = updateChickenPrices.bind(this);
  public cowMoney = cowMoney.bind(this);
  public cow = cow.bind(this);
  public updateCowPrices = updateCowPrices.bind(this);
  public sheepMoney = sheepMoney.bind(this);
  public sheep = sheep.bind(this);
  public updateSheepPrices = updateSheepPrices.bind(this);
  public payOdnoklassniki = payOdnoklassniki.bind(this);
  public payVK = payVK.bind(this);
  public updateHerdBoostBtn = updateHerdBoostBtn.bind(this);
  public herdBoost = herdBoost.bind(this);
  public feedBoost = feedBoost.bind(this);
  public collectorBoost = collectorBoost.bind(this);
  public updateFeedBoostBtn = updateFeedBoostBtn.bind(this);
  public shortTime = shortTime.bind(this);
  public animals = animals.bind(this);
  public animalPrice = animalPrice.bind(this);
  public animalMoney = animalMoney.bind(this);
  public updateAnimalPrices = updateAnimalPrices.bind(this);
  public eventCollectorBoost = eventCollectorBoost.bind(this);
  public updateEventFeedBoostBtn = updateEventFeedBoostBtn.bind(this);
  public updateEventHerdBoostBtn = updateEventHerdBoostBtn.bind(this);
  public eventFeedBoost = eventFeedBoost.bind(this);
  public eventHerdBoost = eventHerdBoost.bind(this);
  public getDiamondPrice = getDiamondPrice.bind(this);
  public openModal = openModal.bind(this);


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
    if (this.state.farm === 'Cow') this.load.image('icon-shop-cow', iconShopCow);
    if (this.state.farm === 'Event') this.load.image('icon-shop-event', iconShopEvent);
    this.load.image('icon-shop-boosts', iconShopBoosts);
    this.load.image('bank-package', bankPackage);
    this.load.image('stock-tape', stockTape);
    this.load.image('shop-btn', shopBtn);
    if (this.state.farm === 'Sheep') this.load.image('sheep-money-package', sheepMoneyPackage);
    if (this.state.farm === 'Chicken') this.load.image('chicken-money-package', chickenMoneyPackage);
    if (this.state.farm === 'Cow') this.load.image('cow-money-package', cowMoneyPackage);
    if (this.state.farm === 'Event') this.load.image('event-money-package', eventMoneyPackage);
    this.load.image('animal-shop-bg', animalShopBg);
    if (this.state.farm === 'Sheep') this.load.image('shop-sheep-wool-collector', shopWoolCollector);
    if (this.state.farm === 'Chicken') this.load.image('shop-chicken-egg-collector', shopEggCollector);
    if (this.state.farm === 'Cow') this.load.image('shop-cow-milk-collector', shopMilkCollector);
    if (this.state.farm === 'Event') this.load.image('shop-event-resource-collector', shopResourceCollector);
    this.load.image('shop-btn-disable', shopBtnDisable);
    this.load.image('boost-btn', boostBtn);
    this.load.image('boost-btn-disable', boostBtnDisable);
    this.load.image('boost-btn-ad', boostBtnAd);
    this.load.image('level-bg', levelBg);
    this.load.image('boost-bg', boostBg);
    this.load.image('improve-collector', improveCollector);
    this.load.image('starterpack-bg', starterpackBg);
    this.load.image('starterpack-shadow', starterpackShadow);
    if (this.state.farm === 'Sheep') this.load.image('sheep-herd-boost-icon', herdBoostSheepIcon);
    if (this.state.farm === 'Chicken') this.load.image('chicken-herd-boost-icon', herdBoostChickenIcon);
    if (this.state.farm === 'Cow') this.load.image('cow-herd-boost-icon', herdBoostCowIcon);
    if (this.state.farm === 'Event') this.load.image('event-herd-boost-icon', herdBoostEventIcon);
    if (this.state.farm === 'Sheep') this.load.image('sheep-feed-boost-icon', feedBoostSheepIcon);
    if (this.state.farm === 'Chicken') this.load.image('chicken-feed-boost-icon', feedBoostChickenIcon);
    if (this.state.farm === 'Cow') this.load.image('cow-feed-boost-icon', feedBoostCowIcon);
    if (this.state.farm === 'Event') this.load.image('event-feed-boost-icon', feedBoostEventIcon);

  }


  public create(): void {

    this.scene.launch('ShopBars', this.state);
    
    this.game.scene.keys['Modal'].add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 70, 'shop-window');
    
    this.height = Number(this.game.config.height);

    let cameraOptions = {
      x: 130,
      y: this.cameras.main.centerY - 360,
      width: 460,
      height: this.heightWindow,
      wheel: true,
      top: this.height
    };
    this.scrolling = new Scrolling(this, cameraOptions);

    if (this.state.farm === 'Event' && this.state.modal.shopType === 3 && this.game.scene.keys['Event'].scrollPoint) {
      this.scrolling.scrollY = this.game.scene.keys['Event'].scrollPoint
    }

    this.input.on('pointerup', (): void => {
      this.scrolling.enabled = true;
      this.scrolling.wheel = true;
    });

    if (this.state.modal.shopType === 1) {

      this.shopDiamonds();

    } else if (this.state.modal.shopType === 2) {

      if (this.state.farm === 'Sheep') this.sheepMoney();
      else if (this.state.farm === 'Chicken') this.chickenMoney();
      else if (this.state.farm === 'Cow') this.cowMoney();
      else if (this.state.farm === 'Event') this.animalMoney();

    } else if (this.state.modal.shopType === 3) {

      if (this.state.farm === 'Sheep') this.sheep();
      else if (this.state.farm === 'Chicken') this.chicken();
      else if (this.state.farm === 'Cow') this.cow();
      else if (this.state.farm === 'Event') this.animals();

    } else if (this.state.modal.shopType === 4) {   
      this.boosts();
    }
    
  }


  
  public update(): void {
    // укзывающие стрелки
    if (this.arrows?.active) this.arrows.update();
    
    // обновляем время бустера
    this.updateHerdBoostBtn();

    this.updateFeedBoostBtn();

    if (this.state.farm === 'Event') {
      this.updateEventHerdBoostBtn();
      this.updateEventFeedBoostBtn();
    }

    if (this.state.farm === 'Event' && this.state.modal.shopType === 3) {
      this.game.scene.keys['Event'].scrollPoint = this.scrolling.scrollY;
    }
    
  }


  public boosts(): void {
    this.scrolling.bottom = this.height - this.heightWindow;
    if (this.state.farm === 'Sheep') {
      this.collectorBoost();

      if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
      this.state.user.additionalTutorial.herdBoost) this.herdBoost(); // проверяем главу и создаем окно только если глава выше 6
      
      if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].feedBoostLvl &&
      this.state.user.additionalTutorial.feedBoost) {
        this.feedBoost();
      }
      
    } else if (this.state.farm === 'Chicken') {
      this.collectorBoost();

      if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
      this.state.user.additionalTutorial.herdBoost) this.herdBoost(); // проверяем главу и создаем окно только если глава выше 6

      if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].feedBoostLvl &&
      this.state.user.additionalTutorial.feedBoost) {
        this.feedBoost();
      }

    } else if (this.state.farm === 'Cow') {
      this.collectorBoost();

      if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
      this.state.user.additionalTutorial.herdBoost) this.herdBoost(); // проверяем главу и создаем окно только если глава выше 6

      if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].feedBoostLvl &&
      this.state.user.additionalTutorial.feedBoost) {
        this.feedBoost();
      }

    } else if (this.state.farm === 'Event') {
      this.eventCollectorBoost();

      if (this.state[`user${this.state.farm}`].maxLevelAnimal >= this.game.scene.keys[this.state.farm].herdBoostLvl && 
      this.state.user.additionalTutorial.herdBoost) this.eventHerdBoost();

      if (this.state[`user${this.state.farm}`].maxLevelAnimal >= this.game.scene.keys[this.state.farm].feedBoostLvl &&
      this.state.user.additionalTutorial.feedBoost) this.eventFeedBoost();
      
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
    
    if (!this.state.user.starterpack && 
      (this.state.userSheep?.part > 4 ||
        this.state.userChicken?.part >= 1 ||
        this.state.userEvent?.maxLevelAnimal >= 1 ||
        this.state.userCow?.part >= 1
      )) {

      let starterpackBg: Phaser.GameObjects.Image = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 210, 'starterpack-bg');
      let starterpackIconShadow: Phaser.GameObjects.Image = this.add.image(this.cameras.main.centerX - 135, this.cameras.main.centerY - 145, 'starterpack-shadow');
      let starterpackIcon: Phaser.GameObjects.Image = this.add.image(this.cameras.main.centerX - 140, this.cameras.main.centerY - 210, 'starterpack-icon');
      let text1: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 40, this.cameras.main.centerY - 260, this.state.lang.buyFrom, {
        font: '26px Shadow',
        color: '#FBCB64'
      }).setOrigin(0.5, 0.5);
  
      let text2: Phaser.GameObjects.Text = this.add.text(text1.getBounds().right + 10, text1.y, '750', {
        font: '26px Shadow',
        color: '#ffffff'
      }).setOrigin(0, 0.5);
  
      let diamond1: Phaser.GameObjects.Image = this.add.image(text2.getBounds().right + 5, text1.y, 'diamond').setScale(0.10).setOrigin(0, 0.5);
  
      let text3: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 80, text1.getBounds().bottom + 5, this.state.lang.getGift,  {
        font: '26px Shadow',
        color: '#FBCB64'
      }).setOrigin(0.5, 0);
  
      let text4: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 40, text3.getBounds().bottom + 5, this.state.lang.more, {
        font: '26px Shadow',
        color: '#FBCB64'
      }).setOrigin(0.5, 0);
      
      let text5: Phaser.GameObjects.Text = this.add.text(text4.getBounds().right + 5, text3.getBounds().bottom + 5, '+750', {
        font: '26px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0, 0);
  
      let diamond2: Phaser.GameObjects.Image = this.add.image(text5.getBounds().right + 5, text5.y, 'diamond').setScale(0.10).setOrigin(0);
  
      let text6: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 80, text4.getBounds().bottom + 5, this.state.lang.dontMissChanse, {
        font: '26px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0);

      this.tweens.add({
        targets: starterpackIcon,
        delay: 2000,
        props: {
          rotation: { duration: 1200, yoyo: false, ease: 'Power2', value: 2 * Math.PI },
          y: { value: '-=40', ease: 'Power1', duration: 250, repeat: 2, yoyo: true },
        },
        loop: -1,
        loopDelay: 1000,
      });

      this.tweens.add({ targets: starterpackIconShadow, delay: 2000, duration: 250,  repeat: 2, yoyo: true, scale: 0.3, ease: 'Power1', loop: -1, loopDelay: 1000 });

    }


    for (let i: number = 0; i < rows; i++) {
      let y: number = i * 270 + 40;

      if (!this.state.user.starterpack && 
        (this.state.userSheep?.part > 4 ||
          this.state.userChicken?.part >= 1 ||
          this.state.userEvent?.maxLevelAnimal >= 1 ||
          this.state.userCow?.part >= 1
        )) y += 248;
      
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

      this.add.text(110, y + 145 + this.height, String(left.diamonds + left.bonus), {
        font: '40px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5);

      if (left.bonus > 0) {

        this.add.text(110, y + 180 + this.height, this.state.lang.benefit + ' ' + '+' + left.bonus, {
          font: '20px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);

      }

      if (left.diamonds + left.bonus >= 750 && 
        !this.state.user.starterpack && 
        (this.state.userSheep?.part > 4 ||
          this.state.userChicken?.part >= 1 ||
          this.state.userEvent?.maxLevelAnimal >= 1 ||
          this.state.userCow?.part >= 1
        )) {
        let starterpackIcon: Phaser.GameObjects.Image = this.add.image(30, y + this.height + 20, 'starterpack-icon').setScale(0.4);
        this.tweens.add({
          targets: starterpackIcon,
          delay: 2000,
          angle: -21,
          duration: 100,
          yoyo: true,
          repeat: 1,
          loop: -1
        });
      }

      let text: string;

      if (this.state.platform === 'ok') {
        text = left.price + ' ' + 'ОК';
      } else if (this.state.platform === 'vk') {
        text = left.voices + ' ' + this.state.lang.voices;
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
        this.add.text(162, y + 42 + this.height, '+' + left.stock + '%', {
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

        this.add.text(350, y + 145 + this.height, String(right.diamonds + right.bonus), {
          font: '40px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);
        
        if (right.diamonds + right.bonus >= 750 && 
          !this.state.user.starterpack && 
          (this.state.userSheep?.part > 4 ||
          this.state.userChicken?.part >= 1 ||
          this.state.userEvent?.maxLevelAnimal >= 1 ||
          this.state.userCow?.part >= 1
        )) {
          let starterpackIcon: Phaser.GameObjects.Image = this.add.image(270, y + this.height + 20, 'starterpack-icon').setScale(0.4).setDepth(3);
          this.tweens.add({
            targets: starterpackIcon,
            delay: 2000,
            angle: -21,
            duration: 100,
            yoyo: true,
            repeat: 1,
            loop: -1
          });
        }

        if (right.bonus > 0) {

          this.add.text(350, y + 180 + this.height, this.state.lang.benefit + ' ' + '+' + right.bonus , {
            font: '20px Shadow',
            color: '#FFFFFF'
          }).setOrigin(0.5, 0.5);

        }
        let text: string;

        if (this.state.platform === 'ok') {
          text = right.price + ' ' + 'ОК';
        } else if (this.state.platform === 'vk') {
          text = right.voices + ' ' + this.state.lang.voices;
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
          this.add.text(402, y + 42 + this.height, '+' + right.stock + '%', {
            font: '34px Shadow',
            color: '#FFFFFF'
          }).setOrigin(0.5, 0.5).setRotation(0.55);

        }

      }

    }

  }
  

}

export default Shop;
