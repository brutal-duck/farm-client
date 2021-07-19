import {
  shortNum,
  shortTime,
  createTaskZone
} from '../../general/basic';
import {
  click,
  clickButton,
  clickShopBtn,
  clickModalBtn,
} from '../../general/clicks';
import { updateNativeShop } from './../../general/boosts';
import {
  pulseBalance,
  increaseDiamonds,
  newbieAwardAnimation,
  getCurrency,
  plusMoneyAnimation
} from '../../general/animations';
import { clickTaskBoard } from '../../general/tasks';
import TaskBoard from '../../components/gameObjects/TaskBoard';
import Collector from '../../components/gameObjects/Collector';
import BarsMenu from '../../components/gameObjects/BarsMenu';
import SpeechBubble from './../../components/animations/SpeechBuble';
import RoundedProgress from '../../components/animations/RoundedProgress';

class ChickenBars extends Phaser.Scene {
  constructor() {
    super('ChickenBars');
  }
  
  public state: Istate;
  public height: number;
  public money: any;
  public diamonds: any;
  public part: any;
  public cursors: any;
  public collector: Collector;
  public menu: BarsMenu;
  public chickenBuy: Phaser.GameObjects.Image;
  public chickenPrice: Phaser.GameObjects.Text;
  public chickenPriceBubble: Phaser.GameObjects.Graphics;
  public partProgress: Phaser.GameObjects.Text;
  public balanceBg: Phaser.GameObjects.Image;
  public waterBg: Phaser.GameObjects.Image;
  public grassBg: Phaser.GameObjects.Image;
  public textWater: any;
  public textGrass: any;
  public waterBar: RoundedProgress;
  public grassBar: RoundedProgress;
  public waterProblem: boolean;
  public grassProblem: boolean;
  public timeout: Phaser.Time.TimerEvent; // таймаут пульсации алмазов
  public increaseAnimation: boolean; // метка занятости анимации пульсации алмазов
  public countIncrease: number; // колличество пульсаций
  public userDiamonds: number; // промежуточные кристаллы
  public stepsDiamonds: number[] = [];
  public calendarText: Phaser.GameObjects.Text;
  public calendar: any;
  public nativeShop: Phaser.GameObjects.Graphics;
  public nativeShopCounter: Phaser.GameObjects.Text;
  public mapNativeText: Phaser.GameObjects.Text;
  public mapNativeBg: Phaser.GameObjects.Graphics;
  public starterpackIcon: Phaser.GameObjects.Image;
  public hints: Phaser.GameObjects.Group;
  public taskZone: Phaser.GameObjects.Zone;

  public click = click.bind(this);
  public clickButton = clickButton.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public pulseBalance = pulseBalance.bind(this);
  public increaseDiamonds = increaseDiamonds.bind(this);
  public newbieAwardAnimation = newbieAwardAnimation.bind(this);
  public updateNativeShop = updateNativeShop.bind(this);
  public shortTime = shortTime.bind(this);
  public getCurrency = getCurrency.bind(this);
  public clickTaskBoard = clickTaskBoard.bind(this);
  public plusMoneyAnimation = plusMoneyAnimation.bind(this);
  public createTaskZone = createTaskZone.bind(this);



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

    this.add.sprite(0, 0, 'topbar').setOrigin(0, 0).setInteractive();
    
    this.add.sprite(0, this.height + 10, 'tabbar')
      .setInteractive()
      .setOrigin(0, 1);
    
    let chickenIcon: string = 'chicken-buy-icon-' + this.game.scene.keys[this.state.farm].maxBreedForBuy();
    this.chickenBuy = this.add.image(82, this.height - 92, chickenIcon);
    let collector: Phaser.GameObjects.Image = this.add.image(230, this.height - 90, 'egg-collector');
    let shop: Phaser.GameObjects.Image = this.add.image(370, this.height - 90, 'shop');
    let map: Phaser.GameObjects.Image = this.add.image(510, this.height - 90, 'map-icon');
    
    this.nativeShop = this.add.graphics()
      .fillStyle(0xFF2400, 1)
      .fillCircle(shop.x + 35, shop.y - 50, 20)
      .setDepth(2)
      .setVisible(false);
    this.nativeShopCounter = this.add.text(shop.x + 35, shop.y - 50, '!', {
      font: '32px Shadow',
      color: '#f3eae6'
    }).setDepth(3)
      .setOrigin(0.5, 0.5)
      .setVisible(false);

    this.mapNativeBg = this.add.graphics()
      .fillStyle(0xFF2400, 1)
      .fillCircle(map.x + 35, map.y - 50, 20)
      .setDepth(2)
      .setVisible(false);
    this.mapNativeText = this.add.text(map.x + 35, map.y - 50, '!', {
      font: '32px Shadow',
      color: '#f3eae6'
    }).setDepth(3)
      .setOrigin(0.5, 0.5)
      .setVisible(false);
    // быстрая покупка курицы
    this.clickButton(this.chickenBuy, (): void => {
      this.game.scene.keys[this.state.farm].buyChicken(this.game.scene.keys[this.state.farm].maxBreedForBuy());
    });
    
    // кнопка собирателя яиц
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
      this.scene.launch('Profile', this.state);
      
    });

    this.menu = BarsMenu.create(this);
    this.createTaskZone();
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
    this.currentPartProgress();

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
    
    this.add.sprite(352, 0, 'chicken-leaves').setOrigin(0.5, 0);

    this.balanceBg = this.add.image(0, 0, 'green-balance-bg').setOrigin(0, 0);

    this.click(this.balanceBg, (): void => {
        SpeechBubble.create(this, this.state.lang.remainderBalance, 4);
    });
    this.add.sprite(70, 10, 'water-balance').setOrigin(0.5, 0).setDepth(2);
    this.add.sprite(170, 10, 'grass-balance').setOrigin(0.5, 0).setDepth(2);
    this.waterBg = this.add.image(70, 10, 'resource-enough').setOrigin(0.5, 0).setDepth(1);
    this.grassBg = this.add.image(170, 10, 'resource-enough').setOrigin(0.5, 0).setDepth(1);

    this.textWater = this.add.text(70, 98, '0%', {
      font: '26px Shadow',
      color: '#FFFFFF'
    }).setDepth(2).setOrigin(0.5, 0.5);
    this.textGrass = this.add.text(170, 98, '0%', {
      font: '26px Shadow',
      color: '#FFFFFF'
    }).setDepth(2).setOrigin(0.5, 0.5);
    this.textWater.pulseTimer = 0;
    this.textGrass.pulseTimer = 0;
    this.grassBar = new RoundedProgress(this, 170, 47, 0.9);
    this.waterBar = new RoundedProgress(this, 70, 47, 0.9);
    this.waterBg = this.add.image(70, 10, 'resource-enough').setOrigin(0.5, 0).setDepth(1);
    this.grassBg = this.add.image(170, 10, 'resource-enough').setOrigin(0.5, 0).setDepth(1);
    this.setBalanceBars(this.game.scene.keys[this.state.farm].balance());

    // круглый бар собирателя
    this.collector = new Collector(this, 230, this.height - 90, 44);

    // цена быстрой покупки
    let breed: number = this.game.scene.keys[this.state.farm].maxBreedForBuy();
    let price: string = String(shortNum(this.game.scene.keys[this.state.farm].chickenPrice(breed).price));

    this.chickenPrice = this.add.text(82, this.height - 43, price, {
      font: '28px Bip',
      color: '#925C28',
      align: 'center'
    }).setDepth(this.height).setOrigin(0.5, 0.5);

    let bounds = this.chickenPrice.getBounds();
    this.chickenPriceBubble = this.add.graphics({ x: bounds.left - 15, y: bounds.top });
    this.chickenPriceBubble.fillStyle(0xFFFFFF, 1);
    this.chickenPriceBubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);

    // плашка заданий
    TaskBoard.create(this);

    // иконка ежедневных наград для новичков
    if (this.state.newbieTime > 0) {
  
      this.calendar = this.add.sprite(283, 77, 'calendar').setDepth(2);
      this.calendar.counter = 0;
      this.calendarText = this.add.text(285, 85, String(Number(this.state.daily)), {
        font: '25px Bip',
        color: '#285881'
      }).setOrigin(0.5, 0.5).setDepth(2);

      this.click(this.calendar, (): void => {

        let modal: Imodal = { type: 6 }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
        
      });

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

    if (this.money.text !== String(shortNum(this.state.userChicken.money))) {
      this.money.setText(shortNum(this.state.userChicken.money));
    }

    if (this.part.text !== String(shortNum(this.state.userChicken.part))) {
      this.part.setText(String(this.state.userChicken.part));
    }

    // пульсация баланс-баров
    this.pulseBalance();

    // актуальный статус кнопки покупки курицы
    this.buyChickenStatus();

    // икнока календарика

    this.updateNativeShop();

    if (this.starterpackIcon && this.state.user.starterpack) this.starterpackIcon?.destroy();

  }

  // обновление цены покупки кур
  public updateChickenPrice(): void {
    
    let breed: number = this.game.scene.keys['Chicken'].maxBreedForBuy();
    let price: string = String(shortNum(this.game.scene.keys['Chicken'].chickenPrice(breed).price));
    this.chickenPrice.setText(price);
    let bounds = this.chickenPrice.getBounds();
    this.chickenPriceBubble.destroy();
    this.chickenPriceBubble = this.add.graphics({ x: bounds.left - 15, y: bounds.top });
    this.chickenPriceBubble.fillStyle(0xffffff, 1);
    this.chickenPriceBubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);

  }


  // актуальный прогресс главы
  public currentPartProgress(): void {
  
    let tasks: Itasks[] = this.game.scene.keys[this.state.farm].partTasks();
    let done: number = 0;

    for (let i in tasks) if (tasks[i].done === 1) done++;

    let text: string = done + '/' + tasks.length;

    if (text !== this.partProgress.text) this.partProgress.setText(text);

  }


  // обновить баланс-бары
  public setBalanceBars(balance: Ibalance): void {

    if (balance.alarm && this.balanceBg.texture.key === 'green-balance-bg') {
      this.balanceBg.setTexture('red-balance-bg');
    } else if (!balance.alarm && this.balanceBg.texture.key === 'red-balance-bg') {
      this.balanceBg.setTexture('green-balance-bg');
    }

    if (balance.notEnoughWater && this.waterBg.texture.key === 'resource-enough') {
      this.waterBg.setTexture('resource-problem');
    } else if (!balance.notEnoughWater && this.waterBg.texture.key === 'resource-problem') {
      this.waterBg.setTexture('resource-enough');
    }

    if (balance.notEnoughGrass && this.grassBg.texture.key === 'resource-enough') {
      this.grassBg.setTexture('resource-problem');
    } else if (!balance.notEnoughGrass && this.grassBg.texture.key === 'resource-problem') {
      this.grassBg.setTexture('resource-enough');
    }

    let waterPercent: string = balance.waterPercent + '%';
    let waterColor: number = 0x96D005;

    if (balance.notEnoughWater) {
      
      waterPercent = '-' + balance.waterPercent + '%';
      waterColor = 0xF07D58;
      this.waterProblem = true;

    } else this.waterProblem = false;

    if (this.textWater.text !== waterPercent) {

      this.textWater.setText(waterPercent);
      this.waterBar.setPercent(balance.waterPercent).setTint(waterColor);
      
    }

    let grassPercent: string = balance.grassPercent + '%';
    let grassColor: number = 0x96D005;

    if (balance.notEnoughGrass) {
      
      grassPercent = '-' + balance.grassPercent + '%';
      grassColor = 0xF07D58;
      this.grassProblem = true;

    } else this.grassProblem = false;

    if (this.textGrass.text !== grassPercent) {

      this.textWater.setText(grassPercent);
      this.waterBar.setPercent(balance.grassPercent).setTint(grassColor);

    }
    
  }


  // затемнение на кнопке покупки овцы
  public buyChickenStatus(): void {

    let breed: number = this.game.scene.keys[this.state.farm].maxBreedForBuy();
    let price: number = this.game.scene.keys[this.state.farm].chickenPrice(breed).price

    if (price > this.state.userChicken.money && this.chickenBuy.tintBottomLeft === 0xFFFFFF) {
      this.chickenBuy.setTint(0x777777);
    } else if (price <= this.state.userChicken.money && this.chickenBuy.tintBottomLeft === 0x777777) {
      this.chickenBuy.setTint(0xFFFFFF);
    }

  }


}

export default ChickenBars;
