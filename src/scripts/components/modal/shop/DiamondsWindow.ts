import { payRobokassa, payAndroid, shortNum, shortTime } from "../../../general/basic";
import Shop from "../../../scenes/Modal/Shop/Main";
import Utils from './../../../libs/Utils';
import ShopButton from './../../Buttons/ShopButton';
import ShopBars from './../../../scenes/Modal/Shop/Bars';
import Sheep from './../../../scenes/Sheep/Main';
import Chicken from './../../../scenes/Chicken/Main';
import Cow from './../../../scenes/Cow/Main';
import Unicorn from './../../../scenes/Event/Unicorns/Main';

const FREE_DIAMONDS: number = 1;

export default class DiamondsWindow extends Phaser.GameObjects.Sprite{
  public scene: Shop;
  private rows: number;
  private freeDiamondTimer: Phaser.GameObjects.Text;
  private freeDiamondBtn: ShopButton;
  private adButton: boolean;
  private hasStarterpack: boolean;

  constructor(scene: Shop) {
    super(scene, 0, 0, 'pixel');
    this.init();
    this.create();
  }

  private init(): void {
    this.scene.add.existing(this);
    this.scene.state.amplitude.logAmplitudeEvent('bank_page_viewed', {});
    this.rows = 2;
    this.setScrolling();
    this.hasStarterpack = Utils.checkStarterpack(this.scene.state);

  }
  
  private create(): void {
    this.createAllPackages();
    if (this.hasStarterpack) this.createStarterpack();
    if (this.checkFreeDiamonds()) this.createFreeDiamonds();
  }

  private createAllPackages(): void {
    const startIndex = Utils.checkSale(this.scene.state,'PACKAGE_PRICE') ? 2 : Utils.checkSale(this.scene.state,'DIAMOND_COUNT') ? 4 : 0;
    for (let i: number = startIndex; i < this.rows + startIndex; i++) {
      let y: number = (i - startIndex) * 270 + 40;
      if (this.hasStarterpack) y += 238;
      
      const left: Ipackage = this.scene.state.packages[i * 2];
      const right: Ipackage = this.scene.state.packages[i * 2 + 1];
      
      this.createPack(left, {x: 0, y: y});
      if (right) this.createPack(right, {x: 240, y: y});
    }
  }

  private setScrolling(): void {
    const height: number = this.rows * 270 + 40;
    this.scene.scrolling.bottom = this.scene.height - this.scene.heightWindow + height;
  }

  private createPack(packData: Ipackage, position: Iposition): void {
    const basicId = Utils.checkSale(this.scene.state,'PACKAGE_PRICE') ? packData.id - 4 : Utils.checkSale(this.scene.state,'DIAMOND_COUNT') ? packData.id - 8 : packData.id;
    const basicPackage: Ipackage = this.scene.state.packages.find(el => el.id === basicId);
    const pack: Phaser.GameObjects.Sprite = this.scene.add.sprite(position.x, position.y + this.scene.height, 'bank-package').setOrigin(0);
    this.scene.click(pack, (): void => { this.packHandler(packData); });

    if (!Utils.checkSale(this.scene.state,'DIAMOND_COUNT') || Utils.checkSale(this.scene.state,'PACKAGE_PRICE')) {
      this.scene.add.text(position.x + 110, position.y + 145 + this.scene.height, String(packData.diamonds + packData.bonus), {
        font: '40px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5);
    } else {
      const text1 = this.scene.add.text(position.x + 110, position.y + 145 + this.scene.height, String(basicPackage.diamonds + basicPackage.bonus), {
        font: '35px Shadow',
        color: '#ddd',
      }).setOrigin(0, 0.5).setAlpha(0.9);
      const text2 = this.scene.add.text(position.x + 110, position.y + 145 + this.scene.height, String(packData.diamonds + packData.bonus), {
        font: '40px Shadow',
        color: '#FFFFFF',
      }).setOrigin(0, 0.5);

      const width = (text1.displayWidth + text2.displayWidth + 5) / 2;
      text1.setX(position.x + 110 - width);
      text2.setX(text1.getBounds().right + 5);
      this.scene.add.tileSprite(text1.x + text1.displayWidth / 2, text1.y, text1.displayWidth + 7, 5, 'white-pixel').setTint(0xFF4A2C).setAngle(5).setOrigin(0.5);
    }
    

    if (!Utils.checkSale(this.scene.state,'PACKAGE_PRICE')) {
      const text: string = this.scene.state.platform === 'ok' ? `${packData.price} ОК` : 
      this.scene.state.platform === 'vk' ? `${packData.voices} ${this.scene.state.lang.voices}` : 
      `${packData.price} ${this.scene.state.lang.ruble}`;

      const btn = this.scene.shopButton(position.x + 110, position.y + 223 + this.scene.height, text);
      this.scene.clickShopBtn(btn, (): void => { this.packHandler(packData); });
    } else {
      const str1: string = this.scene.state.platform === 'ok' ? `${basicPackage.price}` : 
      this.scene.state.platform === 'vk' ? `${basicPackage.voices}` : 
      `${basicPackage.price}`;

      const str2: string = this.scene.state.platform === 'ok' ? `${packData.price} ОК` : 
      this.scene.state.platform === 'vk' ? `${packData.voices} ${this.scene.state.lang.voices}` : 
      `${packData.price} ${this.scene.state.lang.ruble}`;

      const btn = this.scene.add.sprite(position.x + 110, position.y + 223 + this.scene.height, 'shop-btn');
      const title = this.scene.add.text(0, btn.y - 5, str1, {
        font: '28px Shadow',
        color: '#eee'
      }).setOrigin(0, 0.5);

      const text1 = this.scene.add.text(0, btn.y - 5, str2, {
        font: '28px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0, 0.5);

      const width = (title.displayWidth + text1.displayWidth + 5) / 2;
      title.setX(btn.x - width);
      text1.setX(title.getBounds().right + 5);

      const img1 = this.scene.add.tileSprite(title.x + title.displayWidth / 2, title.y, title.displayWidth + 7, 4, 'white-pixel')
        .setTint(0xFF4A2C)
        .setAngle(5)
        .setOrigin(0.5);

      this.scene.clickModalBtn({btn, title: title, text1, img1}, (): void => { this.packHandler(packData); });
    }

    if (packData.stock > 0) {
      const x: number = position.x;
      const y: number = position.y + this.scene.height;
      this.scene.add.sprite(x, y, 'stock-tape').setOrigin(0, 0);
      this.scene.add.text(x + 162, y + 42, '+' + packData.stock + '%', {
        font: '34px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5).setRotation(0.55);
    }

    if ((packData.diamonds + packData.bonus) >= 750 && this.hasStarterpack) {
      const x: number = position.x + 200;
      const y: number = position.y + this.scene.height + 200;
      
      const starterpackIcon: Phaser.GameObjects.Image = this.scene.add.image(x, y, 'stock-icon');
      starterpackIcon.setScale(0.45).setDepth(3);
      this.scene.tweens.add({
        targets: starterpackIcon,
        delay: 2000,
        props: {
          rotation: { duration: 600, yoyo: false, ease: 'Power2', value: 2 * Math.PI },
          scale: { value: 0.5, ease: 'Power1', duration: 250, yoyo: true },
        },
        loop: -1,
      });
    }

    if (packData.bonus > 0) {
      const x: number = position.x + 110;
      const y: number = position.y + 180 + this.scene.height;
      const text: string = `${this.scene.state.lang.benefit} +${Utils.checkSale(this.scene.state,'DIAMOND_COUNT') && !Utils.checkSale(this.scene.state,'PACKAGE_PRICE') ? packData.bonus : basicPackage.bonus}`;

      this.scene.add.text(x, y, text, {
        font: '20px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5);
    }
  }

  private createFreeDiamonds(): void {
    const timerStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '20px',
      fontFamily: 'Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 220 },
      align: 'center'
    };
    let y: number = (this.rows + 1) * 270 + 50 + this.scene.height - 238;
    if (this.hasStarterpack) y += 238;
    this.scene.add.sprite(this.scene.cameras.main.centerX - 130, y, 'free-diamonds-bg');
    const diamondCount: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 300, y, `+${FREE_DIAMONDS}`, {
      font: '34px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    this.scene.add.sprite(diamondCount.getBounds().right + 5, y, 'diamond').setScale(0.23).setOrigin(0, 0.5);
    this.createFreeBtn(this.scene.state.user.takenFreeDiamonds);
    const str = `${this.scene.state.lang.forNextAd} ${shortTime(this.scene.state.user.takeFreeDiamondTime, this.scene.state.lang)}`
    this.freeDiamondTimer = this.scene.add.text(this.scene.cameras.main.centerX - 30, y, str, timerStyle).setVisible(false).setOrigin(0.5);
    this.adButton = this.scene.state.user.takenFreeDiamonds;
  }

  private createStarterpack(): void {
    this.scene.scrolling.bottom += 350;
    const y: number = this.scene.height + 140;
    const { centerX } = this.scene.cameras.main;
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '26px',
      color: '#FBCB64',
      shadow: {
        offsetX: 3,
        offsetY: 3, 
        color: 'rgba(0, 0, 0, 0.3)',
        blur: 2,
        fill: true,
      },
      align: 'center',
    };
    const starterpackBg = this.scene.add.sprite(centerX - 130, y, 'starterpack-bg');
    const starterpackIconShadow = this.scene.add.sprite(centerX - 265, y + 70, 'starterpack-shadow');
    const starterpackIcon = this.scene.add.sprite(centerX - 270, y, 'starterpack-icon');
    const text1 = this.scene.add.text(centerX - 90, y - 60, this.scene.state.lang.buyFrom, textStyle).setColor('#FFFFFF').setOrigin(0.5, 0.5);
    const text2 = this.scene.add.text(text1.getBounds().right + 10, text1.y, '750', textStyle).setOrigin(0, 0.5);
    const diamond1 = this.scene.add.sprite(text2.getBounds().right + 5, text1.y, 'diamond').setScale(0.1).setOrigin(0, 0.5);
    const text3 = this.scene.add.text(centerX - 50, text1.getBounds().bottom + 5, this.scene.state.lang.getGift, textStyle).setColor('#FFFFFF').setOrigin(0.5, 0);
    const text4 = this.scene.add.text(centerX - 90, text3.getBounds().bottom + 5, this.scene.state.lang.more, textStyle).setColor('#FFFFFF').setOrigin(0.5, 0);
    const text5 = this.scene.add.text(text4.getBounds().right + 5, text3.getBounds().bottom + 5, '+750', textStyle).setOrigin(0, 0);
    const diamond2 = this.scene.add.sprite(text5.getBounds().right + 5, text5.y, 'diamond').setScale(0.10).setOrigin(0);
    this.scene.add.text(centerX - 50, text5.getBounds().bottom + 15, this.scene.state.lang.noInterstitial, textStyle).setOrigin(0.5, 0).setFontSize(20);

    this.scene.tweens.add({
      targets: starterpackIcon,
      delay: 2000,
      props: {
        rotation: { duration: 1200, yoyo: false, ease: 'Power2', value: 2 * Math.PI },
        y: { value: '-=40', ease: 'Power1', duration: 250, repeat: 2, yoyo: true },
      },
      loop: -1,
      loopDelay: 1000,
    });

    this.scene.tweens.add({
      targets: starterpackIconShadow,
      delay: 2000,
      duration: 250,
      repeat: 2,
      yoyo: true,
      scale: 0.3,
      ease: 'Power1',
      loop: -1,
      loopDelay: 1000
    });
  }

  private packHandler(pack: Ipackage): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.closeWindow();

    if (this.scene.state.platform === 'ok') this.scene.payOdnoklassniki(pack.id);
    else if (this.scene.state.platform === 'vk') this.scene.payVK(pack.id);
    else if (this.scene.state.platform === 'ya') this.scene.payYandex(pack.id);
    else if (this.scene.state.platform === 'android') payAndroid(pack.id);
    else payRobokassa(pack.id, this.scene.state);
  }

  private freeDiamondsBtnHandler(): void {
    if (!this.scene.state.user.takenFreeDiamonds) {
      const mainScene: Sheep | Chicken | Cow | Unicorn = this.scene.game.scene.keys[this.scene.state.farm];

      this.scene.state.user.takenFreeDiamonds = true;
      this.scene.state.user.diamonds += FREE_DIAMONDS;
      mainScene.autosave();
      mainScene.achievement.tryId(3);
      this.scene.state.amplitude.logAmplitudeEvent('diamonds_get', {
        type: 'bank_page',
        count: FREE_DIAMONDS,
      });
      if (this.scene.state.readyAd) {
        this.pickUpAnim();
        this.createFreeBtn(true);
      } else {
        this.closeWindow();
        if (this.scene.scene.isActive('Profile')) this.scene.game.scene.keys['Profile'].getCurrency({
          x: this.scene.game.scene.keys['Profile'].cameras.main.centerX,
          y: this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].cameras.main.centerY,
        }, FREE_DIAMONDS, 'diamond');
        else this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].getCurrency({
          x: this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].cameras.main.centerX,
          y: this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].cameras.main.centerY,
        }, FREE_DIAMONDS, 'diamond');
      }
    } else this.scene.game.scene.keys[this.scene.state.farm].ads.watchAd(6);
  }

  private createFreeBtn(ad: boolean): void {
    this.freeDiamondBtn?.destroy();
    let y: number = (this.rows + 1) * 270 + 50 + this.scene.height - 238;
    if (this.hasStarterpack) y += 238;
    const elements: IshopButtonElements = { text1: '0 ' + this.scene.state.lang.ruble };
    if (ad) {
      elements.text1 = this.scene.state.lang.pickUp;
      elements.img = {
        texture: 'ad-icon',
        scale: 0.6,
      };
    }
    this.adButton = ad;
    this.freeDiamondBtn = new ShopButton(this.scene, { x: this.scene.cameras.main.centerX - 30, y: y }, () => {this.freeDiamondsBtnHandler()}, elements);
  }

  private checkFreeDiamonds(): boolean {
    return (this.scene.state.userSheep.tutorial >= 100 || 
    this.scene.state.progress.chicken.part >= 1 || 
    this.scene.state.progress.cow.part >= 1) &&
    (!this.scene.state.user.takenFreeDiamonds || this.scene.state.readyAd);
  }

  private closeWindow(): void {
    this.scene.scene.stop();
    this.scene.scene.stop('ShopBars');
    this.scene.scene.stop('Modal');
  }

  public preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (this.freeDiamondTimer?.active && this.freeDiamondBtn?.active) {
      if (this.scene.state.user.takenFreeDiamonds) {
        if (this.scene.state.user.takeFreeDiamondTime > 0 && this.freeDiamondTimer.visible) {
          const str = `${this.scene.state.lang.forNextAd} ${shortTime(this.scene.state.user.takeFreeDiamondTime, this.scene.state.lang)}`;
          if (str !== this.freeDiamondTimer.text) this.freeDiamondTimer.setText(str);
        } else if (this.scene.state.user.takeFreeDiamondTime > 0 && !this.freeDiamondTimer.visible) {
          this.freeDiamondBtn.setVisible(false);
          this.freeDiamondTimer.setVisible(true);
        } else if (this.scene.state.user.takeFreeDiamondTime <= 0 && !this.freeDiamondBtn.visible) {
          this.freeDiamondBtn.setVisible(true);
          this.freeDiamondTimer.setVisible(false);
        }
      } else {
        if (this.adButton) {
          this.createFreeBtn(true);
          this.freeDiamondBtn.setVisible(true);
        } else {
          if (!this.freeDiamondBtn.visible) this.freeDiamondBtn.setVisible(true);
        }
        if (this.freeDiamondTimer.visible) this.freeDiamondTimer.setVisible(false);
      }
    }
  }

  public pickUpAnim(): void {
    if (!this.freeDiamondBtn) return;
    const diamond: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.freeDiamondBtn.x, this.freeDiamondBtn.y, 'diamond').setScale(0.15).setDepth(10);
    this.scene.tweens.add({
      targets: diamond,
      props: {
        rotation: { duration: 400, yoyo: false, ease: 'Power2', value: 2 * Math.PI },
        scale: { value: 0.2, ease: 'Power1', duration: 150, yoyo: true },
      },
      onComplete: (): void => { diamond.destroy(); },
    });
  }
}