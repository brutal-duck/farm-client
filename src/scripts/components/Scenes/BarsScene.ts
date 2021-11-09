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
import { updateNotificationShop } from '../../general/boosts';

import {
  pulseBalance,
  increaseDiamonds,
  newbieAwardAnimation,
  getCurrency,
  plusMoneyAnimation
} from '../../general/animations';
import { clickTaskBoard } from '../../general/tasks';
import TaskBoard from '../gameObjects/TaskBoard';
import Collector from '../gameObjects/Collector';
import BarsMenu from '../gameObjects/BarsMenu';
import SpeechBubble from '../animations/SpeechBuble';
import Notificator from '../gameObjects/Notificator';
import RoundedProgress from '../animations/RoundedProgress';
import Utils from '../../libs/Utils';
import Sheep from '../../scenes/Sheep/Main';
import Chicken from '../../scenes/Chicken/Main';
import Cow from '../../scenes/Cow/Main';

export default class BarsScene extends Phaser.Scene {
  constructor(farm: string) {
    super(`${farm}Bars`);
  }
  
  public state: Istate;
  public height: number;
  public money: any;
  public diamonds: any;
  public part: any;
  public cursors: any;
  public collector: Collector;
  public menu: BarsMenu;
  public animalBuy: Phaser.GameObjects.Sprite;
  public animalPrice: Phaser.GameObjects.Text;
  public animalPriceBubble: Phaser.GameObjects.Graphics;
  public partProgress: Phaser.GameObjects.Text;
  public balanceBg: Phaser.GameObjects.Sprite;
  public textWater: Phaser.GameObjects.Text;
  public textGrass: Phaser.GameObjects.Text;
  public waterProblem: boolean;
  public grassProblem: boolean;
  public addDiamonds: Phaser.GameObjects.Sprite;
  public addMoney: Phaser.GameObjects.Sprite;
  public shop: Phaser.GameObjects.Sprite;
  public map: Phaser.GameObjects.Sprite;
  public collectorBtn: Phaser.GameObjects.Sprite;
  public waterBalance: Phaser.GameObjects.Sprite;
  public grassBalance: Phaser.GameObjects.Sprite;
  public timeout: Phaser.Time.TimerEvent; // таймаут пульсации алмазов
  public increaseAnimation: boolean; // метка занятости анимации пульсации алмазов
  public countIncrease: number; // колличество пульсаций
  public userDiamonds: number; // промежуточные кристаллы
  public stepsDiamonds: number[] = [];
  public offline: Phaser.GameObjects.Sprite;
  public calendarText: Phaser.GameObjects.Text;
  public calendar: Phaser.GameObjects.Sprite;
  public shopNotificator: Notificator;
  public mapNotificator: Notificator;
  public starterpackIcon: Phaser.GameObjects.Sprite;
  public hints: Phaser.GameObjects.Group;
  public taskZone: Phaser.GameObjects.Zone;
  public saleBuyIcon: Phaser.GameObjects.Sprite;
  public cleanUpBtn: Phaser.GameObjects.Sprite;
  public feedBoostTimer: Phaser.GameObjects.Text;
  public boostCount: Phaser.GameObjects.Text;
  public boostText: Phaser.GameObjects.Text;
  public cloudSprite: Phaser.GameObjects.Sprite;
  public feedRound: RoundedProgress;
  public mainScene: Sheep | Chicken | Cow;
  public farmUser: IuserSheep | IuserChicken | IuserCow;

  public click = click.bind(this);
  public clickButton = clickButton.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public pulseBalanceAnim = pulseBalance.bind(this);
  public increaseDiamonds = increaseDiamonds.bind(this);
  public newbieAwardAnimation = newbieAwardAnimation.bind(this);
  public updateNotificationShop = updateNotificationShop.bind(this);
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
    this.mainScene = this.game.scene.getScene(this.state.farm) as Sheep | Chicken | Cow;
    this.farmUser = this.state[`user${this.state.farm}`];
  }


  public create(): void {
    this.createTopBar();
    this.createСleanButton();
    TaskBoard.create(this);
    this.createBottomBar();
  }

  public update(): void {
    this.pulseBalanceAnim();
    this.setBuyAnimalStatus();
    this.updateMoneyInfo();
    this.updatePartProgress();
    this.updateNotificationShop();
    this.updateStarterpackIcon();
    this.updateSale();
    this.updateCleanUpBtn();
    this.updateFeedBoostTimer();
  }

  public setCurrentPartProgress(): void {
    const tasks: Itasks[] = this.game.scene.keys[this.state?.farm]?.partTasks();
    if (tasks) {
      const done: number = tasks.filter(el => el.done === 1).length;
      const text: string = done + '/' + tasks?.length;
      if (text !== this.partProgress?.text) this.partProgress?.setText(text);
    }
  }

  private createBottomBar() {
    this.add.sprite(0, this.height + 10, 'tabbar').setInteractive().setOrigin(0, 1);
    this.createBtns();
  }

  private createTopBar() {
    this.add.sprite(0, 0, 'topbar').setOrigin(0, 0).setInteractive();
    this.createPartProgress();
    this.createBalanceInfo();
    this.setBalanceBars(this.mainScene.balance());
    this.createMoneyInfo();
    this.createCalendarIcon();
  }

  private createPartProgress() {
    const currentPartStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '44px',
      fontFamily: 'Shadow',
      color: '#124C03',
    };
    const progressStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '32px',
      color: '#CA6200'
    };

    this.part = this.add.text(82, 55, '', currentPartStyle).setDepth(1).setOrigin(0.5, 0.5);
    this.partProgress = this.add.text(82, 120, '', progressStyle).setDepth(1).setOrigin(0.5, 0.5);
    this.add.sprite(70, 0, `${this.state.farm.toLowerCase()}-leaves`).setOrigin(0.5, 0);
    this.createTaskZone();
    this.setCurrentPartProgress();
  }

  private createCalendarIcon() {
    if (this.state.newbieTime <= 0) return;
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '25px',
      color: '#285881',
    };
    this.calendar = this.add.sprite(140, 115, 'calendar').setDepth(2);
    this.click(this.calendar, (): void => { this.openModal({ type: 6 }); });

    const { x, y } = this.calendar;
    const str = String(Number(this.state.daily));
    this.calendarText = this.add.text(x + 2, y + 8, str, textStyle).setOrigin(0.5).setDepth(2);
  }

  private createMoneyInfo() {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '32px',
      fontFamily: 'Shadow',
      color: '#7b3b0d',
    };
    this.diamonds = this.add.text(590, 38, '', textStyle).setDepth(1).setOrigin(0.5);
    this.money = this.add.text(590, 100, '', textStyle).setDepth(1).setOrigin(0.5);
    this.addDiamonds = this.add.sprite(680, 38, 'plus').setDepth(2);
    this.addMoney = this.add.sprite(680, 100, 'plus').setDepth(2);
    this.add.sprite(498, 100, `${this.state.farm.toLowerCase()}Coin`).setScale(0.22);
    this.createStarterpackIcon();

    this.clickButton(this.addDiamonds, (): void => { this.openModal({ type: 2, shopType: 1 }); });
    this.clickButton(this.addMoney, (): void => { this.openModal({ type: 2, shopType: 2 }); });
  }

  private createStarterpackIcon() {
    if (!this.state.user.starterpack) {
      this.starterpackIcon = this.add.sprite(480, 25, 'stock-icon').setScale(0.34).setVisible(false);
      this.click(this.starterpackIcon, (): void => { this.openModal({ type: 2, shopType: 1 }); });

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

  public setBalanceBars(balance: Ibalance): void {
    if (this.farmUser.part >= 6) {
      if (balance.alarm && this.balanceBg.texture.key === 'green-balance-bg') {
        this.balanceBg.setTexture('red-balance-bg');
      } else if (!balance.alarm && this.balanceBg.texture.key === 'red-balance-bg') {
        this.balanceBg.setTexture('green-balance-bg');
      }
    } else {
      if (balance.alarm && this.balanceBg.texture.key === 'green-balance-bg-big') {
        this.balanceBg.setTexture('red-balance-bg-big');
      } else if (!balance.alarm && this.balanceBg.texture.key === 'red-balance-bg-big') {
        this.balanceBg.setTexture('green-balance-bg-big');
      }
    }

    let waterPercent: string = balance.waterPercent + '%';
    if (balance.notEnoughWater) {
      waterPercent = '-' + balance.waterPercent + '%';
      this.waterProblem = true;

    } else this.waterProblem = false;
    if (this.textWater.text !== waterPercent) {
      this.textWater.setText(waterPercent);
    }
    let grassPercent: string = balance.grassPercent + '%';
    if (balance.notEnoughGrass) {
      grassPercent = '-' + balance.grassPercent + '%';
      this.grassProblem = true;
    } else this.grassProblem = false;
    if (this.textGrass.text !== grassPercent) {
      this.textGrass.setText(grassPercent);
    }
  }
  
  private createBtns() {
    this.createAnimalBuyBtn();  
    this.createCollectorBtn();
    this.createShopBtn();
    this.createMapBtn();
    this.createMenuBtn();
  }

  private createMenuBtn(): void {
    this.menu = BarsMenu.create(this);
    this.offline = this.add.sprite(650, this.height - 90, 'offline')
      .setInteractive()
      .setDepth(this.height + 4)
      .setVisible(false);

    if (!this.state.online) this.offline.setVisible(true);
  }

  private createAnimalBuyBtn(): void {
    const iconTexture = this.state.farm.toLowerCase() + '-buy-icon-' + this.mainScene.maxBreedForBuy();
    this.animalBuy = this.add.sprite(82, this.height - 92, iconTexture);
    this.saleBuyIcon = this.add.sprite(this.animalBuy.getBounds().left + 30, this.animalBuy.getBounds().top + 30, 'icon-sale').setOrigin(0.5).setAngle(-18);
    // цена быстрой покупки
    const breed = this.mainScene.maxBreedForBuy();
    const price = String(shortNum(this.mainScene.animalPrice(breed).price));
    const halfPrice = String(shortNum(Math.round(this.mainScene.animalPrice(breed).price / 2)));
    const str = Utils.checkSale(this.state, `${this.state.farm.toUpperCase()}_PRICE`) ? halfPrice : price;
    const priceStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '28px',
      fontFamily: 'Bip',
      color: '#925C28',
      align: 'center'
    };
    this.animalPrice = this.add.text(82, this.height - 43, str, priceStyle).setDepth(this.height).setOrigin(0.5);

    const bounds = this.animalPrice.getBounds();
    this.animalPriceBubble = this.add.graphics({ x: bounds.left - 15, y: bounds.top });
    this.animalPriceBubble.fillStyle(0xFFFFFF, 1);
    this.animalPriceBubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);

    this.clickButton(this.animalBuy, (): void => {
      if (this.state.userSheep.tutorial >= 100 || this.state.farm !== 'Sheep') {
        this.mainScene.buyAnimal(this.mainScene.maxBreedForBuy());
      }
    });
  }

  private createMapBtn(): void {
    this.map = this.add.sprite(510, this.height - 90, 'map-icon');
    this.mapNotificator = new Notificator(this, { x: this.map.x + 35, y: this.map.y - 50 });
    this.mapNotificator.setCount(0);
    this.clickButton(this.map, (): void => {
      this.mainScene.scrolling.downHandler();
      this.mainScene.scrolling.enabled = false;
      this.mainScene.scrolling.wheel = false;
      this.scene.launch('Profile', this.state);
    });
  }

  private createShopBtn(): void {
    this.shop = this.add.sprite(370, this.height - 90, 'shop');
    this.shopNotificator = new Notificator(this, { x: this.shop.x + 35, y: this.shop.y - 50 });
    this.shopNotificator.setCount(0);
    this.clickButton(this.shop, (): void => { this.openModal({ type: 2, shopType: this.state.modal?.shopType || 1 }); });
  }

  private createCollectorBtn(): void {
    let resource = 'wool';
    if (this.state.farm == 'Chicken') resource = 'egg';
    if (this.state.farm == 'Cow') resource = 'milk';
    this.collectorBtn = this.add.sprite(230, this.height - 90, `${resource}-collector`);
    this.collector = Collector.create(this, 230, this.height - 90, 44);
    this.clickButton(this.collectorBtn, (): void => { this.openModal({ type: 2, shopType: 4 }); });
  }

  protected createBalanceInfo(): void {
    const bgTexture: string = this.farmUser.part >= 6 ? 'green-balance-bg' : 'green-balance-bg-big';
    const bgX: number = this.farmUser.part >= 6 ? this.cameras.main.centerX + 25 : this.cameras.main.centerX - 35;
    this.balanceBg = this.add.sprite(bgX, 3, bgTexture).setOrigin(0.5, 0);

    this.click(this.balanceBg, (): void => {
      if (this.state.userSheep.tutorial >= 100 || this.state.farm !== 'Sheep') SpeechBubble.create(this, this.state.lang.remainderBalance, 4);
    });

    const balanceGeom = this.balanceBg.getBounds();
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '26px',
      fontFamily: 'Shadow',
      color: '#ffffff',
      shadow: {
        fill: true,
        offsetX: 3,
        offsetY: 1,
        color: 'rgba(0, 0, 0, 0.2)',
      }
    };

    this.grassBalance = this.add.sprite(balanceGeom.left + 10, balanceGeom.centerY - 25, 'grass-balance').setOrigin(0, 0.5).setDepth(2);
    this.waterBalance = this.add.sprite(balanceGeom.left + 10, balanceGeom.centerY + 30, 'water-balance').setOrigin(0, 0.5).setDepth(2);
    const grassSpriteGeom = this.grassBalance.getBounds();
    const waterSpriteGeom = this.waterBalance.getBounds();
    this.textGrass = this.add.text(balanceGeom.centerX + 20, grassSpriteGeom.centerY, '0%', textStyle).setDepth(2).setOrigin(0.5);
    this.textWater = this.add.text(balanceGeom.centerX + 20, waterSpriteGeom.centerY, '0%', textStyle).setDepth(2).setOrigin(0.5);
    this.textGrass.setDataEnabled();
    this.textGrass.setData('pulseTimer', 0);
    this.textWater.setDataEnabled();
    this.textWater.setData('pulseTimer', 0);

    if (this.farmUser.part >= 6) this.createBoostInfo();
  }

  private destroyBalanceInfo(): void {
    this.balanceBg?.destroy();
    this.grassBalance?.destroy();
    this.waterBalance?.destroy();
    this.textGrass?.destroy();
    this.textWater?.destroy();
  }

  private createBoostInfo(): void {
    const { centerX } = this.cameras.main;
    const timerStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#FEFBFC',
    };
    const countStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '24px',
      color: '#FCE2AC',
    };
    const style: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#FCD079',
    };

    const plate = this.add.sprite(centerX - 95, 40, 'plate-feed');
    const icon = this.add.sprite(centerX - 170, 40, `feed-${this.state.farm.toLowerCase()}-balance`);

    this.feedRound = new RoundedProgress(this, icon.x, icon.y, 0.7, 0x89DE3D);
    this.feedRound.setPercent(0);

    this.feedBoostTimer = this.add.text(plate.x, plate.y, shortTime(0, this.state.lang), timerStyle).setOrigin(0.5);

    let bonusCount: number = 0;
    if (this.farmUser.feedBoostTime > 0) bonusCount += 100;
    if (this.state.clan) {
      const clanFarm: IclanFarm = this.state.clan[this.state.farm.toLowerCase()];
      bonusCount += clanFarm.level;
      if (clanFarm.cooldown > 0) bonusCount -= 1;
    }
    this.boostText = this.add.text(centerX - 130, 85, this.state.lang.bonus + ':', style).setOrigin(0.5);
    this.boostCount = this.add.text(centerX - 130, this.boostText.getBounds().bottom, `+${bonusCount}%`, countStyle).setOrigin(0.5, 0);
    this.cloudSprite = this.add.sprite(this.boostCount.getBounds().right, this.boostCount.getBounds().centerY, 'cloud-info').setOrigin(0, 0.5);

  }

  private updateFeedBoostTimer(): void {
    if (this.farmUser.part >= 6 && this.feedBoostTimer?.active) {
      let bonusCount: number = 0;
      if (this.farmUser.feedBoostTime > 0) bonusCount += 100;
      if (this.state.clan) {
        const clanFarm: IclanFarm = this.state.clan[this.state.farm.toLowerCase()];
        bonusCount += clanFarm.level;
        if (clanFarm.cooldown > 0) bonusCount -= 1;
      }
      const str = `+${bonusCount}%`;
      if (str !== this.boostCount.text) {
        this.boostCount.setText(str);
        this.cloudSprite.setX(this.boostCount.getBounds().right);
      }
      const timeStr = shortTime(this.farmUser.feedBoostTime,this.state.lang);
      if (timeStr !== this.feedBoostTimer.text) {
        this.feedBoostTimer.setText(timeStr);
        const maxStack = this.mainScene.feedBoostStack;
        const percent = Math.round((this.farmUser.feedBoostTime / (60 * 60 * maxStack)) * 100);
        this.feedRound.setPercent(percent);
      }
    } else if (this.farmUser.part >= 6) {
      this.destroyBalanceInfo();
      this.createBalanceInfo();
    }
  }

  private updatePartProgress() {
    if (this.part.text !== String(shortNum(this.farmUser.part))) {
      this.part.setText(String(this.farmUser.part));
    }
  }

  private updateMoneyInfo(): void {
    if (this.userDiamonds < this.state.user.diamonds) {
      if (this.countIncrease === 0) {
        const plus = this.state.user.diamonds - this.userDiamonds;
        if (plus >= 3) {
          this.countIncrease = 3;
          const step = Math.round(plus / 3);
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
    } else
      this.userDiamonds = this.state.user.diamonds;

    if (this.diamonds.text !== String(shortNum(this.userDiamonds))) {
      this.diamonds.setText(String(shortNum(this.userDiamonds)));
    }

    if (this.money.text !== String(shortNum(this.farmUser.money))) {
      this.money.setText(shortNum(this.farmUser.money));
    }
  }

  private updateCleanUpBtn(): void {
    if (this.cleanUpBtn?.active) {
      if (!this.checkCleanUpBtn())
        this.cleanUpBtn?.destroy();
    }
  }

  private updateStarterpackIcon() {
    const check = Utils.checkStarterpack(this.state);
    if (this.starterpackIcon && this.state.user.starterpack)
      this.starterpackIcon?.destroy();
    if (this.starterpackIcon && this.starterpackIcon.visible && !check)
      this.starterpackIcon.setVisible(false);
    else if (this.starterpackIcon && !this.starterpackIcon.visible && check)
      this.starterpackIcon.setVisible(true);
  }

  public updateAnimalPrice(): void {
    const breed: number = this.mainScene.maxBreedForBuy();
    const price: string = String(shortNum(this.mainScene.animalPrice(breed).price));
    const halfPrice: string = String(shortNum(Math.round(this.mainScene.animalPrice(breed).price) / 2));
    this.animalPrice.setText(Utils.checkSale(this.state, `${this.state.farm.toUpperCase()}_PRICE`) ? halfPrice : price);
    const bounds = this.animalPrice.getBounds();
    this.animalPriceBubble.destroy();
    this.animalPriceBubble = this.add.graphics({ x: bounds.left - 15, y: bounds.top });
    this.animalPriceBubble.fillStyle(0xffffff, 1);
    this.animalPriceBubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);
  }

  private updateSale(): void {
    const visibility = Utils.checkSale(this.state, `${this.state.farm.toUpperCase()}_PRICE`) && this.animalBuy.visible;
    if (this.saleBuyIcon.visible !== visibility) {
      this.saleBuyIcon.setVisible(visibility);
      this.updateAnimalPrice();
    }
  }

  private setBuyAnimalStatus(): void {
    const breed: number = this.mainScene.maxBreedForBuy();
    let price: number = this.mainScene.animalPrice(breed).price
    if (Utils.checkSale(this.state, `${this.state.farm.toUpperCase()}_PRICE`)) price = Math.round(price / 2);

    if ((price > this.farmUser.money || (this.state.userSheep.tutorial < 100 && this.state.farm === 'Sheep')) && this.animalBuy.tintBottomLeft === 0xFFFFFF) {
      this.animalBuy.setTint(0x777777);
    } else if (price <= this.farmUser.money && this.animalBuy.tintBottomLeft === 0x777777 && (this.state.userSheep.tutorial >= 100 || this.state.farm !== 'Sheep')) {
      this.animalBuy.setTint(0xFFFFFF);
    }
  }

  private openModal(modal: Imodal): void {
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);
  }
};
