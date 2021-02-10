import {
  click,
  clickButton,
  clickShopBtn,
  clickModalBtn,
  shortNum,
  socialButtons,
  updateNativeShop
} from '../../general/basic';
import {
  Collector,
  TaskBoard,
  buildMenu
} from '../../elements';
import {
  сurrencyAnimation,
  menuAnimation,
  pulseBalance,
  increaseDiamonds,
  plusDiamondsAnimation,
  calendarAnimation,
  newbieAwardAnimation,
  plusDiamonds,
  firework250
} from '../../general/animations';
import { pulseCollector } from './animations';
import {
  registration,
  chatWindow
} from '../../html';

class EventBars extends Phaser.Scene {
  constructor() {
    super('EventBars');
  }
  
  public state: Istate;
  public height: number;
  public money: any;
  public diamonds: any;
  public part: any;
  public cursors: any;
  public сurrency: Phaser.GameObjects.Group; // группа монет и кристаллов для анимации
  public collector: Collector;
  public sendwich: boolean;
  public chat: Phaser.GameObjects.Image;
  public profile: Phaser.GameObjects.Image;
  public menu: Phaser.GameObjects.Image;
  public auth: Phaser.GameObjects.Image;
  public sendwichTimer: number;
  public animalBuy: Phaser.GameObjects.Image;
  public animalPrice: Phaser.GameObjects.Text;
  public animalPriceBubble: Phaser.GameObjects.Graphics;
  public taskBoard: TaskBoard;
  public partProgress: Phaser.GameObjects.Text;
  public balanceBg: Phaser.GameObjects.Image;
  public waterBg: Phaser.GameObjects.Image;
  public grassBg: Phaser.GameObjects.Image;
  public textWater: any;
  public textGrass: any;
  public waterBar: Phaser.GameObjects.Graphics;
  public grassBar: Phaser.GameObjects.Graphics;
  public waterProblem: boolean;
  public grassProblem: boolean;
  public timeout: Phaser.Time.TimerEvent; // таймаут пульсации алмазов
  public increaseAnimation: boolean; // метка занятости анимации пульсации алмазов
  public countIncrease: number; // колличество пульсаций
  public userDiamonds: number; // промежуточные кристаллы
  public stepsDiamonds: number[] = [];
  public offline: Phaser.GameObjects.Sprite;
  public calendarText: Phaser.GameObjects.Text;
  public calendar: any;
  public nativeShop: Phaser.GameObjects.Graphics;
  public nativeShopCounter: Phaser.GameObjects.Text;

  public click = click.bind(this);
  public clickButton = clickButton.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public сurrencyAnimation = сurrencyAnimation.bind(this);
  public pulseCollector = pulseCollector.bind(this);
  public menuAnimation = menuAnimation.bind(this);
  public pulseBalance = pulseBalance.bind(this);
  public registration = registration.bind(this);
  public buildMenu = buildMenu.bind(this);
  public chatWindow = chatWindow.bind(this);
  public increaseDiamonds = increaseDiamonds.bind(this);
  public plusDiamondsAnimation = plusDiamondsAnimation.bind(this);
  public socialButtons = socialButtons.bind(this);
  public calendarAnimation = calendarAnimation.bind(this);
  public newbieAwardAnimation = newbieAwardAnimation.bind(this);
  public plusDiamonds = plusDiamonds.bind(this);
  public firework250 = firework250.bind(this);
  public updateNativeShop = updateNativeShop.bind(this);


  public init(state: Istate): void {
    
    this.state = state;
    this.height = Number(this.game.config.height);
    this.sendwich = false;
    this.sendwichTimer = 0;
    this.increaseAnimation = false;
    this.countIncrease = 0;
    this.userDiamonds = this.state.user.diamonds;
    this.stepsDiamonds = [];
    
  }


  public create(): void {

    this.add.sprite(0, 0, 'topbar').setOrigin(0, 0).setInteractive();
    
    this.add.sprite(0, this.height + 10, 'tabbar')
      .setInteractive()
      .setOrigin(0, 1);
    
    let animalIcon: string = 'event-buy-icon-' + this.game.scene.keys[this.state.farm].maxBreedForBuy();
    this.animalBuy = this.add.image(82, this.height - 92, animalIcon);
    let collector: Phaser.GameObjects.Image = this.add.image(230, this.height - 90, 'event-collector');
    let shop: Phaser.GameObjects.Image = this.add.image(370, this.height - 90, 'shop');
    let map: Phaser.GameObjects.Image = this.add.image(510, this.height - 90, 'map-icon');

    // this.nativeShop = this.add.graphics()
    //   .fillStyle(0xFF2400, 1)
    //   .fillCircle(405, this.height - 140, 20)
    //   .setDepth(2)
    //   .setVisible(false);
    // this.nativeShopCounter = this.add.text(405, this.height - 140, '!', {
    //   font: '32px Shadow',
    //   color: '#f3eae6'
    // }).setDepth(3)
    //   .setOrigin(0.5, 0.5)
    //   .setVisible(false);

    // быстрая покупка Животного
    this.clickButton(this.animalBuy, (): void => {
      let breed: number = this.game.scene.keys['Event'].maxBreedForBuy();
      this.game.scene.keys[this.state.farm].buyAnimal(breed);
      this.updateAnimalPrice();
    });
    
    // кнопка собирателя 
    this.clickButton(collector, (): void => {

      let modal: Imodal = {
        type: 2,
        shopType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    });
    
    // кнопка магазина
    this.clickButton(shop, (): void => {

      let modal: Imodal = {
        type: 2,
        shopType: this.state.modal?.shopType || 1
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    });
    
    // кнопка карты
    this.clickButton(map, (): void => {

      this.game.scene.keys[this.state.farm].scrolling.downHandler();
      this.game.scene.keys[this.state.farm].scrolling.enabled = false;
      this.game.scene.keys[this.state.farm].scrolling.wheel = false;
      this.scene.launch('Map', this.state);
      
    });

    // социальные иконки
    if (this.state.platform === 'web' && this.state.user.login === '') {

      this.auth = this.add.image(650, this.height - 90, 'profile');

      this.clickButton(this.auth, (): void => {
        this.registration();
      });

    } else this.buildMenu();

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
    this.part = this.add.text(this.cameras.main.centerX, 60, '', {
      font: '44px Shadow',
      color: '#124C03'
    }).setDepth(1).setOrigin(0.5, 0.5);
    this.partProgress = this.add.text(this.cameras.main.centerX, 120, '', {
      font: '32px Shadow',
      color: '#7B3B0D'
    }).setDepth(1).setOrigin(0.5, 0.5);

    this.add.sprite(498, 100, 'chickenCoin').setScale(0.22);

    let addDiamonds: Phaser.GameObjects.Sprite = this.add.sprite(680, 38, 'plus').setDepth(2);
    let addMoney: Phaser.GameObjects.Sprite = this.add.sprite(680, 100, 'plus').setDepth(2);

    this.clickButton(addDiamonds, (): void => {

      let modal: Imodal = {
        type: 2,
        shopType: 1
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    });

    this.clickButton(addMoney, (): void => {

      let modal: Imodal = {
        type: 2,
        shopType: 2
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
      
    });
    
    this.add.sprite(352, 0, 'event-leaves').setOrigin(0.5, 0);

    // монеты и кристаллы для анимации
    this.сurrency = this.physics.add.group();

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
    if (this.money.text !== String(shortNum(this.state.userEvent.money))) {
      this.money.setText(shortNum(this.state.userEvent.money));
    }    

    // анимация монет и кристаллов
    this.сurrencyAnimation();

    // мигание нулевого таймера собирателя
    this.pulseCollector();

    // актуальный статус кнопки покупки курицы
    this.buyChickenStatus();

    // отображение кнопок социальных механик
    this.socialButtons();

    // Обновление натива магазина
    // this.updateNativeShop();

  }


  // анимация монет от позиции
  public plusMoneyAnimation(position: Iposition): void {
    
    let y = position.y - this.game.scene.keys['Chicken'].scrolling.scrollY;

    let img1 = this.сurrency.create(position.x - 70, y, 'chickenCoin').setScale(0.2);
    let img2 = this.сurrency.create(position.x + 70, y, 'chickenCoin').setScale(0.2);
    let img3 = this.сurrency.create(position.x, y - 30, 'chickenCoin').setScale(0.2);

    img1.counter = 0;
    img2.counter = 0;
    img3.counter = 0;

    let target: Iposition = { x: 495, y: 120 }
    let aim = new Phaser.Math.Vector2();
    aim.x = target.x;
    aim.y = target.y;
    let distance: number = Phaser.Math.Distance.Between(img1.x, img1.y, target.x, target.y) * 2;
    this.physics.moveToObject(img1, aim, distance);
    
    distance = Phaser.Math.Distance.Between(img2.x, img2.y, target.x, target.y) * 2;
    this.physics.moveToObject(img2, aim, distance);
    
    distance = Phaser.Math.Distance.Between(img3.x, img3.y, target.x, target.y) * 2;
    this.physics.moveToObject(img3, aim, distance);

  }


  // обновление цены покупки кур
  public updateAnimalPrice(): void {
    
    let breed: number = this.game.scene.keys['Event'].maxBreedForBuy();
    let price: string = String(shortNum(this.game.scene.keys['Event'].animalPrice(breed).price));
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
  public buyChickenStatus(): void {

    let breed: number = this.game.scene.keys['Event'].maxBreedForBuy();
    let price: number = this.game.scene.keys[this.state.farm].animalPrice(breed).price
    
    if (price > this.state.userEvent.money && this.animalBuy.tintBottomLeft === 0xFFFFFF) {
      this.animalBuy.setTint(0x777777);
    } else if (price <= this.state.userEvent.money && this.animalBuy.tintBottomLeft === 0x777777) {
      this.animalBuy.setTint(0xFFFFFF);
    }

  }


}

export default EventBars;
