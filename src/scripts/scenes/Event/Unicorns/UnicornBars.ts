import {  
  click,
  clickButton,
  clickShopBtn,
  clickModalBtn,
} from '../../../general/clicks';
import {
  shortNum,
  shortTime,
} from '../../../general/basic';
import {
  updateNotificationShop, 
} from '../../../general/boosts';
import { 
  updateRaitingsBar,
  scoreEnding 
} from './basic';
import {
  increaseDiamonds,
  newbieAwardAnimation,
  getCurrency,
} from '../../../general/animations';
import Collector from '../../../components/gameObjects/Collector';
import BarsMenu from '../../../components/gameObjects/BarsMenu';
import BigInteger from '../../../libs/BigInteger';
import Notificator from './../../../components/gameObjects/Notificator';

class UnicornBars extends Phaser.Scene {
  constructor() {
    super('UnicornBars');
  }
  
  public state: Istate;
  public height: number;
  public money: any;
  public diamonds: any;
  public part: any;
  public cursors: any;
  public collector: Collector;
  public menu: BarsMenu;
  public animalBuy: Phaser.GameObjects.Image;
  public animalPrice: Phaser.GameObjects.Text;
  public animalPriceBubble: Phaser.GameObjects.Graphics;
  public timeout: Phaser.Time.TimerEvent; // таймаут пульсации алмазов
  public increaseAnimation: boolean; // метка занятости анимации пульсации алмазов
  public countIncrease: number; // колличество пульсаций
  public userDiamonds: number; // промежуточные кристаллы
  public stepsDiamonds: number[] = [];
  public offline: Phaser.GameObjects.Sprite;
  public calendarText: Phaser.GameObjects.Text;
  public calendar: any;
  public proceedsText: Phaser.GameObjects.Text;
  public score: Phaser.GameObjects.Text;
  public place: Phaser.GameObjects.Text;
  public feedBoostDoubledIcon: Phaser.GameObjects.Image;
  public feedBoostIcon: Phaser.GameObjects.Image;
  public feedBoostTime: Phaser.GameObjects.Text;
  public addDiamonds: Phaser.GameObjects.Sprite;
  public addMoney: Phaser.GameObjects.Sprite;
  public shop: Phaser.GameObjects.Image;
  public map: Phaser.GameObjects.Image;
  public collectorBtn: Phaser.GameObjects.Image;
  public starterpackIcon: Phaser.GameObjects.Image;
  public hints: Phaser.GameObjects.Group;
  public shopNotificator: Notificator;
  public mapNotificator: Notificator;

  public click = click.bind(this);
  public clickButton = clickButton.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public increaseDiamonds = increaseDiamonds.bind(this);
  public newbieAwardAnimation = newbieAwardAnimation.bind(this);
  public getCurrency = getCurrency.bind(this);
  public updateNotificationShop = updateNotificationShop.bind(this);
  public updateRaitingsBar = updateRaitingsBar.bind(this);
  public scoreEnding = scoreEnding.bind(this);
  

  public init(state: Istate): void {
    
    this.state = state;
    this.height = Number(this.game.config.height);
    this.increaseAnimation = false;
    this.countIncrease = 0;
    this.userDiamonds = this.state.user.diamonds;
    this.stepsDiamonds = [];
    this.hints = this.add.group();
    
  }


  public create(): void {
    this.add.sprite(0, 0, 'topbar-event').setOrigin(0, 0).setInteractive();
    const raitingZone:Phaser.GameObjects.Zone = this.add.zone(0,0, 480, 280);
    this.click(raitingZone, () => {
      if (this.state.userUnicorn.tutorial > 70) {
        this.game.scene.keys['Unicorn'].getEventRaiting();
        const modal: Imodal = {
          type: 11
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
      }
    })

    this.add.sprite(0, this.height + 10, 'tabbar')
      .setInteractive()
      .setOrigin(0, 1);
    
    let animalIcon: string = 'event-buy-icon-' + this.game.scene.keys[this.state.farm].maxBreedForBuy();
    this.animalBuy = this.add.image(82, this.height - 92, animalIcon);
    this.collectorBtn = this.add.image(230, this.height - 90, 'event-collector');
    this.shop = this.add.image(370, this.height - 90, 'shop');
    this.map = this.add.image(510, this.height - 90, 'map-icon');

    this.mapNotificator = new Notificator(this, { x: this.map.x + 35, y: this.map.y - 50 });
    this.mapNotificator.setCount(0);

    this.shopNotificator = new Notificator(this, { x: this.shop.x + 35, y: this.shop.y - 50 });
    this.shopNotificator.setCount(0);

    // быстрая покупка Животного
    this.clickButton(this.animalBuy, (): void => {
      if (this.state.userUnicorn.tutorial > 70 || this.state.userUnicorn.tutorial === 30)
      this.game.scene.keys[this.state.farm].buyAnimal(this.game.scene.keys['Unicorn'].maxBreedForBuy());
      this.updateAnimalPrice();
    });
    

    // кнопка собирателя 
    this.clickButton(this.collectorBtn, (): void => {
      const modal: Imodal = {
        type: 2,
        shopType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
    });
    
    // кнопка магазина
    this.clickButton(this.shop, (): void => {
      const modal: Imodal = {
        type: 2,
        shopType: this.state.modal?.shopType || 1
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
    });
    
    // кнопка карты
    this.clickButton(this.map, (): void => {
      this.game.scene.keys[this.state.farm].scrolling.downHandler();
      this.game.scene.keys[this.state.farm].scrolling.enabled = false;
      this.game.scene.keys[this.state.farm].scrolling.wheel = false;
      this.scene.launch('Profile', this.state);
    });

    this.menu = BarsMenu.create(this);
    this.offline = this.add.sprite(650, this.height - 90, 'offline')
      .setInteractive()
      .setDepth(this.height + 4)
      .setVisible(false);

    if (!this.state.online) this.offline.setVisible(true);

    // монеты и кристаллы
    this.diamonds = this.add.text(590, 38, '', {
      font: '32px Shadow',
      color: '#7B3B0D'
    }).setDepth(1).setOrigin(0.5, 0.5);
    this.money = this.add.text(590, 100, '', {
      font: '32px Shadow',
      color: '#7B3B0D'
    }).setDepth(1).setOrigin(0.5, 0.5);

    this.addDiamonds = this.add.sprite(680, 38, 'plus').setDepth(2);
    this.addMoney = this.add.sprite(680, 100, 'plus').setDepth(2);

    this.score = this.add.text(110, 30, '- ' + this.scoreEnding(10, this.state.lang), {
      font: '28px Shadow',
      color: '#6e00c7'
    }).setDepth(2).setOrigin(0.5, 0.5);

    this.place = this.add.text(110, 90, '- ' + this.state.lang.eventPlace, {
      font: '28px Shadow',
      color: '#f0e8ce'
    }).setDepth(2).setOrigin(0.5, 0.5).setShadow(4, 2, '#00000030', 0.5);

    this.clickButton(this.addDiamonds, (): void => {
      if (this.state.userUnicorn.tutorial > 70) {
        const modal: Imodal = {
          type: 2,
          shopType: 1
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
      }
    });

    this.clickButton(this.addMoney, (): void => {
      if (this.state.userUnicorn.tutorial > 70) {
        const modal: Imodal = {
          type: 2,
          shopType: 2
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
        
      }
    });
    
    // круглый бар собирателя
    this.collector = new Collector(this, 230, this.height - 90, 44);

    // цена быстрой покупки
    let breed: number = this.game.scene.keys[this.state.farm].maxBreedForBuy();
    let price: string = String(shortNum(this.game.scene.keys[this.state.farm].animalPrice(breed).price));

    this.animalPrice = this.add.text(82, this.height - 43, price, {
      font: '28px Bip',
      color: '#925C28',
      align: 'center'
    }).setDepth(this.height).setOrigin(0.5, 0.5);

    let bounds = this.animalPrice.getBounds();
    this.animalPriceBubble = this.add.graphics({ x: bounds.left - 15, y: bounds.top });
    this.animalPriceBubble.fillStyle(0xFFFFFF, 1);
    this.animalPriceBubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);

    // Доход в секунду
    this.proceedsText = this.add.text(this.cameras.main.centerX, 92, this.state.lang.income + ' 0/'+ this.state.lang.seconds, {
      font: '21px Shadow',
      color: '#f2ede4',
      wordWrap: { width: 80 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setShadow(4, 2, '#00000030', 0.5);

    this.feedBoostDoubledIcon = this.add.image(this.cameras.main.centerX + 60, 50, 'double-feed-boost').setVisible(false);
    this.feedBoostIcon = this.add.image(this.cameras.main.centerX - 50, 105, 'event-feed-boost-mini').setVisible(false);
    this.feedBoostTime = this.add.text(this.feedBoostIcon.getBounds().right + 5, 105, shortTime(this.state.userUnicorn.feedBoostTime, this.state.lang), {
      font: '21px Shadow',
      color: '#f2ede4'
    }).setOrigin(0, 0.5).setVisible(false);

        // блокировка баров для туториала
    if (this.state.userUnicorn.tutorial < 80) {
      this.shop.setVisible(false);
      this.map.setVisible(false);
      this.collectorBtn.setVisible(false);
      this.collector.setVisible(false);
      this.collector.bubble.setVisible(false);
    }

    if (this.state.userUnicorn.tutorial < 30) {
      this.animalBuy.setVisible(false);
      this.animalPrice.setVisible(false);
      this.animalPriceBubble.setVisible(false);
    }

    if (!this.state.user.starterpack) {
      
      this.starterpackIcon = this.add.image(490, 45, 'starterpack-icon').setScale(0.2);
      this.click(this.starterpackIcon, ()=>{
        const modal: Imodal = {
          type: 2,
          shopType: 1,
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
      });
      
      this.tweens.add({
        targets: this.starterpackIcon,
        duration: 300,
        yoyo: true,
        ease: 'Power2',
        repeat: 2,
        delay: 400,
        scale: 0.3,
        loop: -1,
        loopDelay: 4000,
      });
    }
  }


  public update(): void {

    if (this.userDiamonds < this.state.user.diamonds) {

      if (this.countIncrease === 0) {
        
        let plus: number = this.state.user.diamonds - this.userDiamonds;

        if (plus >= 3) {

          this.countIncrease = 3;
          let step: number = Math.round(plus / 3);
          this.stepsDiamonds.push(this.state.user.diamonds);
          this.stepsDiamonds.push(this.userDiamonds + step);
          this.stepsDiamonds.push(this.userDiamonds + step + step);

        } else if (plus === 2) {

          this.countIncrease = 2;
          this.stepsDiamonds.push(this.state.user.diamonds);
          this.stepsDiamonds.push(this.userDiamonds + 1);

        } else {

          this.countIncrease = 1;
          this.stepsDiamonds.push(this.state.user.diamonds);

        }

      } else if (this.countIncrease > 0 && !this.increaseAnimation) {
        this.increaseDiamonds();
      }

    } else this.userDiamonds = this.state.user.diamonds;
    

    if (this.diamonds.text !== String(shortNum(this.userDiamonds))) {
      this.diamonds.setText(String(shortNum(this.userDiamonds)));
    }
    // установка денег 
    if (this.money.text !== String(shortNum(this.state.userUnicorn.money))) {
      this.money.setText(shortNum(this.state.userUnicorn.money));
    }    

    // актуальный статус кнопки покупки курицы
    this.buyAnimalStatus();

    // Обновление натива магазина
    this.updateNotificationShop();

    this.updateRaitingsBar();

    if (this.starterpackIcon && this.state.user.starterpack) this.starterpackIcon?.destroy();

  } 

  // обновление цены покупки кур
  public updateAnimalPrice(): void {
    
    let breed: number = this.game.scene.keys['Unicorn'].maxBreedForBuy();
    let price: string = String(shortNum(this.game.scene.keys['Unicorn'].animalPrice(breed).price));
    let animalIcon: string = 'event-buy-icon-' + breed;
    this.animalBuy.setTexture(animalIcon);
    this.animalPrice.setText(price);
    let bounds = this.animalPrice.getBounds();
    this.animalPriceBubble.destroy();
    this.animalPriceBubble = this.add.graphics({ x: bounds.left - 15, y: bounds.top });
    this.animalPriceBubble.fillStyle(0xffffff, 1);
    this.animalPriceBubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);

  }

  // затемнение на кнопке покупки животного
  public buyAnimalStatus(): void {
    const breed: number = this.game.scene.keys['Unicorn'].maxBreedForBuy();
    const price: string = this.game.scene.keys[this.state.farm].animalPrice(breed).price
    
    if ((this.state.userUnicorn.herdBoostAnimals.length > 0 || 
      BigInteger.greaterThan(price, this.state.userUnicorn.money) || 
      (this.state.userUnicorn.tutorial < 70 &&
      this.state.userUnicorn.tutorial !== 30)) && 
      this.animalBuy.tintBottomLeft === 0xFFFFFF) {
      this.animalBuy.setTint(0x777777);
    } else if (this.state.userUnicorn.herdBoostAnimals.length <= 0 && 
      BigInteger.lessThanOrEqual(price, this.state.userUnicorn.money) &&
      this.animalBuy.tintBottomLeft === 0x777777 &&
      (this.state.userUnicorn.tutorial > 70 ||
      this.state.userUnicorn.tutorial === 30)) {
      this.animalBuy.setTint(0xFFFFFF);
    }

  }

}

export default UnicornBars;
