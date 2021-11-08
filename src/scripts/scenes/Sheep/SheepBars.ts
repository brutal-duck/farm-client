import {
  click,
  clickButton,
  clickShopBtn,
  clickModalBtn,
} from '../../general/clicks';
import {
  shortNum,
  shortTime,
  createTaskZone,
  createСleanButton,
  checkCleanUpBtn,
} from '../../general/basic';
import { updateNotificationShop } from './../../general/boosts';

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
import Notificator from './../../components/gameObjects/Notificator';
import RoundedProgress from '../../components/animations/RoundedProgress';
import Utils from './../../libs/Utils';

class SheepBars extends Phaser.Scene {
  constructor() {
    super('SheepBars');
  }
  
  public state: Istate;
  public height: number;
  public money: any;
  public diamonds: any;
  public part: any;
  public cursors: any;
  public collector: Collector;
  public menu: BarsMenu;
  public sheepBuy: Phaser.GameObjects.Image;
  public sheepPrice: Phaser.GameObjects.Text;
  public sheepPriceBubble: Phaser.GameObjects.Graphics;
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
  public addDiamonds: Phaser.GameObjects.Sprite;
  public addMoney: Phaser.GameObjects.Sprite;
  public shop: Phaser.GameObjects.Image;
  public map: Phaser.GameObjects.Image;
  public collectorBtn: Phaser.GameObjects.Image;
  public waterBalance: Phaser.GameObjects.Image;
  public grassBalance: Phaser.GameObjects.Image;
  public timeout: Phaser.Time.TimerEvent; // таймаут пульсации алмазов
  public increaseAnimation: boolean; // метка занятости анимации пульсации алмазов
  public countIncrease: number; // колличество пульсаций
  public userDiamonds: number; // промежуточные кристаллы
  public stepsDiamonds: number[] = [];
  public offline: Phaser.GameObjects.Sprite;
  public calendarText: Phaser.GameObjects.Text;
  public calendar: any;
  public shopNotificator: Notificator;
  public mapNotificator: Notificator;
  public starterpackIcon: Phaser.GameObjects.Sprite;
  public hints: Phaser.GameObjects.Group;
  public taskZone: Phaser.GameObjects.Zone;
  public saleBuyIcon: Phaser.GameObjects.Sprite;
  public cleanUpBtn: Phaser.GameObjects.Sprite;

  public click = click.bind(this);
  public clickButton = clickButton.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public pulseBalance = pulseBalance.bind(this);
  public increaseDiamonds = increaseDiamonds.bind(this);
  public newbieAwardAnimation = newbieAwardAnimation.bind(this);
  public updateNotificationShop = updateNotificationShop.bind(this);
  public shortTime = shortTime.bind(this);
  public getCurrency = getCurrency.bind(this);
  public clickTaskBoard = clickTaskBoard.bind(this);
  public plusMoneyAnimation = plusMoneyAnimation.bind(this);
  public createTaskZone = createTaskZone.bind(this);
  public createСleanButton = createСleanButton.bind(this);
  public checkCleanUpBtn = checkCleanUpBtn.bind(this);

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
    this.add.sprite(0, this.height + 10, 'tabbar').setInteractive().setOrigin(0, 1);
    this.createСleanButton();
    
    let sheepIcon: string = 'sheep-buy-icon-' + this.game.scene.keys[this.state.farm].maxBreedForBuy();
    this.sheepBuy = this.add.image(82, this.height - 92, sheepIcon);
    this.saleBuyIcon = this.add.sprite(this.sheepBuy.getBounds().left + 30, this.sheepBuy.getBounds().top + 30, 'icon-sale').setOrigin(0.5).setAngle(-18);
    this.collectorBtn = this.add.image(230, this.height - 90, 'wool-collector');
    this.shop = this.add.image(370, this.height - 90, 'shop');
    this.map = this.add.image(510, this.height - 90, 'map-icon');
    
    this.mapNotificator = new Notificator(this, { x: this.map.x + 35, y: this.map.y - 50 });
    this.mapNotificator.setCount(0);

    this.shopNotificator = new Notificator(this, { x: this.shop.x + 35, y: this.shop.y - 50 });
    this.shopNotificator.setCount(0);

    // быстрая покупка овцы
    this.clickButton(this.sheepBuy, (): void => {

      if (this.state.userSheep.tutorial >= 100) {
        this.game.scene.keys[this.state.farm].buySheep(this.game.scene.keys[this.state.farm].maxBreedForBuy());
      }
      
    });
    
    // кнопка подстригателя
    this.clickButton(this.collectorBtn, (): void => {

      let modal: Imodal = {
        type: 2,
        shopType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    });
    
    // кнопка магазина
    this.clickButton(this.shop, (): void => {

      let modal: Imodal = {
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
    this.createTaskZone();
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
    this.currentPartProgress();

    this.add.sprite(498, 100, 'sheepCoin').setScale(0.22);

    // плюсики для софты и харды
    this.addDiamonds = this.add.sprite(680, 38, 'plus').setDepth(2);
    this.addMoney = this.add.sprite(680, 100, 'plus').setDepth(2);

    this.clickButton(this.addDiamonds, (): void => {
      let modal: Imodal = {
        type: 2,
        shopType: 1
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
    });

    this.clickButton(this.addMoney, (): void => {
      let modal: Imodal = {
        type: 2,
        shopType: 2
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
    });

    this.add.sprite(352, 0, 'sheep-leaves').setOrigin(0.5, 0);

    this.balanceBg = this.add.image(0, 0, 'green-balance-bg').setOrigin(0, 0);

    this.click(this.balanceBg, (): void => {
      if (this.state.userSheep.tutorial >= 100)  {
        SpeechBubble.create(this, this.state.lang.remainderBalance, 4);
      }
    });

    this.waterBalance = this.add.image(70, 10, 'water-balance').setOrigin(0.5, 0).setDepth(2);
    this.grassBalance = this.add.image(170, 10, 'grass-balance').setOrigin(0.5, 0).setDepth(2);
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
    this.setBalanceBars(this.game.scene.keys[this.state.farm].balance());

    
    // круглый бар собирателя
    this.collector = Collector.create(this, 230, this.height - 90, 44);

    // цена быстрой покупки
    let breed: number = this.game.scene.keys[this.state.farm].maxBreedForBuy();
    let price: string = String(shortNum(this.game.scene.keys[this.state.farm].sheepPrice(breed).price));
    let halfPrice: string = String(shortNum(Math.round(this.game.scene.keys[this.state.farm].sheepPrice(breed).price / 2)));

    this.sheepPrice = this.add.text(82, this.height - 43, Utils.checkSale(this.state,`${this.state.farm.toUpperCase()}_PRICE`) && this.state.userSheep.tutorial >= 100 ? halfPrice : price, {
      font: '28px Bip',
      color: '#925C28',
      align: 'center'
    }).setDepth(this.height).setOrigin(0.5, 0.5);

    let bounds = this.sheepPrice.getBounds();
    this.sheepPriceBubble = this.add.graphics({ x: bounds.left - 15, y: bounds.top });
    this.sheepPriceBubble.fillStyle(0xFFFFFF, 1);
    this.sheepPriceBubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);

    // плашка заданий
    TaskBoard.create(this);

    // блокировка баров для туториала
    if (this.state.userSheep.tutorial < 100) {
      this.taskZone.setVisible(false);
      this.addDiamonds.setVisible(false);
      this.addMoney.setVisible(false);
      this.shop.setVisible(false);
      this.map.setVisible(false);
      this.collectorBtn.setVisible(false);
      this.collector.setVisible(false);
      this.collector.bubble.setVisible(false);
    }

    if (this.state.userSheep.tutorial < 20) {
      this.sheepBuy.setVisible(false);
      this.saleBuyIcon.setVisible(false);
      this.sheepPrice.setVisible(false);
      this.sheepPriceBubble.setVisible(false);
    }

    if (this.state.userSheep.tutorial < 30) {
      this.textGrass.setVisible(false);
      this.grassBg.setVisible(false);
      this.grassBalance.setVisible(false);
      this.grassBar.setVisible(false);
    }

    if (this.state.userSheep.tutorial < 40) {
      this.textWater.setVisible(false);
      this.waterBg.setVisible(false);
      this.waterBalance.setVisible(false);
      this.waterBar.setVisible(false);
    }

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

    // let zone: Phaser.GameObjects.Zone = this.add.zone(360, 50, 100, 100)
    //   .setDropZone(undefined, () => {})
    //   .setInteractive();
    // zone.on('pointerdown', (): void => {

    // });

    // let graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(2, 0xFFFF00);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    if (!this.state.user.starterpack) {
      this.starterpackIcon = this.add.sprite(480, 25, 'stock-icon').setScale(0.34).setVisible(false);
      this.click(this.starterpackIcon, (): void => {
        const modal: Imodal = {
          type: 2,
          shopType: 1,
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
      });
      
      this.tweens.add({
        targets: this.starterpackIcon,
        delay: 2000,
        props: {
          rotation: { duration: 600, yoyo: false, ease: 'Power2', value: 2 * Math.PI },
          scale: { value: 0.40, ease: 'Power1', duration: 250, yoyo: true },
        },
        loop: -1,
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

    if (this.money.text !== String(shortNum(this.state.userSheep.money))) {
      this.money.setText(shortNum(this.state.userSheep.money));
    }

    if (this.part.text !== String(shortNum(this.state.userSheep.part))) {
      this.part.setText(String(this.state.userSheep.part));
    }

    // пульсация баланс-баров
    this.pulseBalance();

    // актуальный статус кнопки покупки овцы
    this.buySheepStatus();

    // икнока календарика
    if (this.calendar?.scene) {

      if (this.state.farm === 'Sheep') {
  
        if (this.state.userSheep.part >= 4 && !this.calendar.visible) {
          this.calendar.setVisible(true);
          this.calendarText.setVisible(true);
        } else if (this.state.userSheep.part < 4 && this.calendar.visible) {
          this.calendar.setVisible(false);
          this.calendarText.setVisible(false);
        }
  
      }
    }

    this.updateNotificationShop();

    if (this.starterpackIcon && this.state.user.starterpack) this.starterpackIcon?.destroy();
    if (this.starterpackIcon && this.starterpackIcon.visible && this.state.userSheep.tutorial < 70 && this.state.userSheep?.part < 4) this.starterpackIcon.setVisible(false);
    else if (this.starterpackIcon && !this.starterpackIcon.visible && this.state.userSheep.tutorial >= 70 && this.state.userSheep?.part > 4) this.starterpackIcon.setVisible(true);

    this.updateSale();

    if (this.cleanUpBtn?.active) {
      if (!this.checkCleanUpBtn()) this.cleanUpBtn?.destroy();
    }
  }

  // обновление цены покупки овцы
  public updateSheepPrice(): void {
    let breed: number = this.game.scene.keys['Sheep'].maxBreedForBuy();
    let price: string = String(shortNum(this.game.scene.keys['Sheep'].sheepPrice(breed).price));
    let halfPrice: string = String(shortNum(Math.round(this.game.scene.keys['Sheep'].sheepPrice(breed).price) / 2));
    this.sheepPrice.setText(Utils.checkSale(this.state, `${this.state.farm.toUpperCase()}_PRICE`) && this.state.userSheep.tutorial >= 100 ? halfPrice : price);
    let bounds = this.sheepPrice.getBounds();
    this.sheepPriceBubble.destroy();
    this.sheepPriceBubble = this.add.graphics({ x: bounds.left - 15, y: bounds.top });
    this.sheepPriceBubble.fillStyle(0xffffff, 1);
    this.sheepPriceBubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);
  }

  private updateSale(): void {
    const visibility = Utils.checkSale(this.state, `${this.state.farm.toUpperCase()}_PRICE`) && this.state.userSheep.tutorial >= 100 && this.sheepBuy.visible;
    if (this.saleBuyIcon.visible !== visibility) {
      this.saleBuyIcon.setVisible(visibility);
      this.updateSheepPrice();
    }
  }

  // актуальный прогресс главы
  public currentPartProgress(): void {
    const tasks: Itasks[] = this.game.scene.keys[this.state?.farm]?.partTasks();
    if (tasks) {
      const done: number = tasks.filter(el => el.done === 1).length;
      const text: string = done + '/' + tasks?.length;
      if (text !== this.partProgress?.text) this.partProgress?.setText(text);
    }
  }


  // обновить баланс-бары
  public setBalanceBars(balance: Ibalance): void {

    if (balance.alarm && this.balanceBg.texture.key === 'green-balance-bg' && this.state.userSheep.tutorial >= 100) {
      this.balanceBg.setTexture('red-balance-bg');
    } else if (!balance.alarm && this.balanceBg.texture.key === 'red-balance-bg') {
      this.balanceBg.setTexture('green-balance-bg');
    }

    if (balance.notEnoughWater && this.waterBg.texture.key === 'resource-enough' && this.state.userSheep.tutorial >= 100) {
      this.waterBg.setTexture('resource-problem');
    } else if (!balance.notEnoughWater && this.waterBg.texture.key === 'resource-problem' && this.state.userSheep.tutorial >= 100) {
      this.waterBg.setTexture('resource-enough');
    }

    if (balance.notEnoughGrass && this.grassBg.texture.key === 'resource-enough' && this.state.userSheep.tutorial >= 100) {
      this.grassBg.setTexture('resource-problem');
    } else if (!balance.notEnoughGrass && this.grassBg.texture.key === 'resource-problem' && this.state.userSheep.tutorial >= 100) {
      this.grassBg.setTexture('resource-enough');
    }

    let waterPercent: string = balance.waterPercent + '%';
    let waterColor: number = 0x96D005;

    if (balance.notEnoughWater) {
      
      waterPercent = '-' + balance.waterPercent + '%';
      waterColor = 0xF07D58;
      this.waterProblem = true;

    } else this.waterProblem = false;

    if (this.textWater.text !== waterPercent && this.state.userSheep.tutorial >= 40) {

      if (this.state.userSheep.tutorial === 40 && waterPercent !== '-100%') {
        this.waterBar.setPercent(balance.waterPercent).setTint(waterColor);
        this.textWater.setText(waterPercent);
      } else if (this.state.userSheep.tutorial > 40) {
        this.waterBar.setPercent(balance.waterPercent).setTint(waterColor);
        this.textWater.setText(waterPercent);
      }
      
    }

    let grassPercent: string = balance.grassPercent + '%';
    let grassColor: number = 0x96D005;

    if (balance.notEnoughGrass) {
      
      grassPercent = '-' + balance.grassPercent + '%';
      grassColor = 0xF07D58;
      this.grassProblem = true;

    } else this.grassProblem = false;

    if (this.textGrass.text !== grassPercent && this.state.userSheep.tutorial >= 30) {

      if (this.state.userSheep.tutorial === 30 && grassPercent !== '-100%') {
        this.grassBar.setPercent(balance.grassPercent).setTint(grassColor);
        this.textGrass.setText(grassPercent);
      } else if (this.state.userSheep.tutorial > 30) {
        this.grassBar.setPercent(balance.grassPercent).setTint(grassColor);
        this.textGrass.setText(grassPercent);
      }

    }
    
  }


  // затемнение на кнопке покупки овцы
  public buySheepStatus(): void {

    let breed: number = this.game.scene.keys[this.state.farm].maxBreedForBuy();
    let price: number = this.game.scene.keys[this.state.farm].sheepPrice(breed).price
    if (Utils.checkSale(this.state, `${this.state.farm.toUpperCase()}_PRICE`) && this.state.userSheep.tutorial >= 100) price = Math.round(price / 2);

    if ((price > this.state.userSheep.money || this.state.userSheep.tutorial < 100) && this.sheepBuy.tintBottomLeft === 0xFFFFFF) {
      this.sheepBuy.setTint(0x777777);
    } else if (price <= this.state.userSheep.money && this.sheepBuy.tintBottomLeft === 0x777777 && this.state.userSheep.tutorial >= 100) {
      this.sheepBuy.setTint(0xFFFFFF);
    }

  }
}

export default SheepBars;
