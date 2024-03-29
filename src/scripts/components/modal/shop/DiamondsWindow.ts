import * as platform from 'platform';
import { payRobokassa, payAndroid, shortTime } from "../../../general/basic";
import Shop from "../../../scenes/Modal/Shop/Main";
import Utils from './../../../libs/Utils';
import ShopButton from './../../Buttons/ShopButton';
import Sheep from './../../../scenes/Sheep/Main';
import Chicken from './../../../scenes/Chicken/Main';
import Cow from './../../../scenes/Cow/Main';
import Unicorn from './../../../scenes/Event/Unicorns/Main';

const FREE_DIAMONDS: number = 1;

export default class DiamondsWindow extends Phaser.GameObjects.Sprite{
  public scene: Shop;
  private rows: number;
  private freeDiamondText: Phaser.GameObjects.Text;
  private freeDiamondTimer: Phaser.GameObjects.Text;
  private freeDiamondBtn: ShopButton;
  private adButton: boolean;
  private hasStarterpack: boolean;
  private block: boolean;

  constructor(scene: Shop) {
    super(scene, 0, 0, 'pixel');
    this.init();
    this.create();
  }

  private init(): void {
    this.scene.add.existing(this);
    this.scene.state.amplitude.logAmplitudeEvent('bank_page_viewed', {});
    this.block = (platform.os.family === 'iOS' && this.scene.state.platform === 'vk') || this.scene.state.platform === 'gd';
    this.rows = 2;
    if (this.block) {
      this.rows = 0;
      this.createIOSInfo();
    }
    this.setScrolling();
    this.hasStarterpack = Utils.checkStarterpack(this.scene.state);
  }
  
  private create(): void {
    this.createAllPackages();
    if (this.hasStarterpack && !this.block) this.createStarterpack();
    if (this.checkFreeDiamonds() && !this.block) this.createFreeDiamonds();
    if (this.block) this.createIOSFreeDiamonds();
  }

  private createIOSInfo(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '30px',
      fontFamily: 'Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 450 },
      align: 'center'
    };
    let y: number = this.scene.height + 100;
    const { centerX } = this.scene.cameras.main;
    this.scene.add.text(centerX - 130, y, this.scene.state.lang.freeCrystal, textStyle).setOrigin(0.5, 0);
  }
  
  private createAllPackages(): void {
    const startIndex = Utils.checkSale(this.scene.state,'PACKAGE_PRICE') ? 2 : Utils.checkSale(this.scene.state,'DIAMOND_COUNT') ? 4 : 0;
    for (let i: number = startIndex; i < this.rows + startIndex; i++) {
      let y: number = (i - startIndex) * 270 + 20;
      if (this.hasStarterpack) y += 208;
      if (this.checkFreeDiamonds() && this.hasStarterpack) y += 100;
      else if (this.checkFreeDiamonds() && !this.hasStarterpack) y += 110;
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
      const text: string = this.getPlatformPrice(packData);
      const btn = this.scene.shopButton(position.x + 110, position.y + 223 + this.scene.height, text);
      this.scene.clickShopBtn(btn, (): void => { this.packHandler(packData); });
    } else {
      const str1: string = String(basicPackage.price);
      const str2: string = this.getPlatformPrice(packData);

      const btn = this.scene.add.sprite(position.x + 110, position.y + 223 + this.scene.height, 'shop-btn');
      const title = this.scene.add.text(0, btn.y - 5, str1, {
        fontSize: '28px',
        fontFamily: Utils.checkAndroidEngPlatform(this.scene.state) ? 'Bip' : 'Shadow',
        color: '#eee'
      }).setOrigin(0, 0.5);

      const text1 = this.scene.add.text(0, btn.y - 5, str2, {
        fontSize: '28px',
        fontFamily: Utils.checkAndroidEngPlatform(this.scene.state) ? 'Bip' : 'Shadow',
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

  private getPlatformPrice(packData: Pick<Ipackage, 'price' | 'voices' | 'dollars'> ): string {
    const { voices, ruble, yan, ok } = this.scene.state.lang;
    const { platform } = this.scene.state;

    let prefix = platform === 'vk' ? packData.voices : packData.price;
    let postfix = ruble;
    if (Utils.checkAndroidEngPlatform(this.scene.state)) {
      prefix = packData.dollars;
      postfix = '$';
    }
    if (platform === 'vk') postfix = voices;
    else if (platform === 'ok') postfix = ok;
    else if (platform === 'ya') postfix = yan;
    return `${prefix} ${postfix}`;
  }

  private createFreeDiamonds(): void {
    const timerStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '20px',
      fontFamily: 'Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 220 },
      align: 'center'
    };
    let y: number = this.scene.height + 37 + 40;
    if (this.hasStarterpack && !this.block) y += 198;
    else if (this.block) y += 320;
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

  private createIOSFreeDiamonds(): void {
    const timerStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '20px',
      fontFamily: 'Shadow',
      color: '#FFFFFF',
      wordWrap: { width: 220 },
      align: 'center'
    };
    let y: number = this.scene.height + 402;
    this.scene.add.sprite(this.scene.cameras.main.centerX - 130, y - 70, 'free-diamond-plate');
    const diamondCount: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 290, y, `+${FREE_DIAMONDS}`, {
      font: '50px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    this.scene.add.sprite(diamondCount.getBounds().right + 5, y, 'diamond').setScale(0.23).setOrigin(0, 0.5);
    this.createFreeBtn(this.scene.state.user.takenFreeDiamonds);
    const str = shortTime(this.scene.state.user.takeFreeDiamondTime, this.scene.state.lang);
    this.freeDiamondText = this.scene.add.text(this.scene.cameras.main.centerX - 50, y - 20, this.scene.state.lang.forNextAd, timerStyle).setVisible(false).setOrigin(0.5);
    this.freeDiamondTimer = this.scene.add.text(this.scene.cameras.main.centerX - 50, this.freeDiamondText.getBounds().bottom, str, timerStyle).setVisible(false).setOrigin(0.5, 0).setFontSize(30).setColor('#ffd800');
    this.adButton = this.scene.state.user.takenFreeDiamonds;
  }

  private createStarterpack(): void {
    this.scene.scrolling.bottom += 300;
    const y: number = this.scene.height + 120;
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
      wordWrap: { width: 290 },
      align: 'center',
    };
    const starterpackBg = this.scene.add.sprite(centerX - 130, y, 'starterpack-bg').setDisplaySize(472, 210);
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
    let y: number = this.scene.height + 40 + 40;
    if (this.hasStarterpack && !this.block) y += 198;
    else if (this.block) y = this.scene.height + 410;
    const price = this.block ?  this.scene.state.lang.pickUp : this.getPlatformPrice({ voices: 0, price: 0, dollars: 0 });
    const elements: IshopButtonElements = { text1: price };
    if (ad) {
      elements.text1 = this.scene.state.lang.pickUp;
      elements.img = { texture: 'ad-icon', scale: 0.6 };
    }
    let notificator: Phaser.GameObjects.Sprite;
    let notificatorText: Phaser.GameObjects.Text;


    this.adButton = ad;
    this.freeDiamondBtn = new ShopButton(this.scene, { x: this.scene.cameras.main.centerX - 30, y: y }, () => {
      notificator?.destroy();
      notificatorText?.destroy();
      this.freeDiamondsBtnHandler();
    }, elements);

    if (!ad) {
      const geom = this.freeDiamondBtn.getBounds();
      const pos: Iposition = { x: geom.left + 5, y: geom.top + 5 };
      notificator = this.scene.add.sprite(pos.x, pos.y, 'notification-bg');
      notificatorText = this.scene.add.text(pos.x, pos.y, '!', {
        fontFamily: 'Bip',
        fontSize: '28px',
        color: '#ffffff',
        fontStyle: 'Bold',
      }).setOrigin(0.5);
    }
    
    if (Utils.checkAndroidEngPlatform(this.scene.state)) {
      this.freeDiamondBtn.setFontFamily('Bip');
    }
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
      if (this.scene.state.user.takenFreeDiamonds && this.scene.state.readyAd) {
        if (this.scene.state.user.takeFreeDiamondTime > 0 && this.freeDiamondTimer.visible) {
          if (this.block) {
            const str1 = shortTime(this.scene.state.user.takeFreeDiamondTime, this.scene.state.lang);
            const str2 = this.scene.state.lang.forNextAd;
            if (str1 !== this.freeDiamondTimer.text) this.freeDiamondTimer.setText(str1);
            if (str2 !== this.freeDiamondText.text) this.freeDiamondText.setText(str2);
          } else {
            const str = `${this.scene.state.lang.forNextAd} ${shortTime(this.scene.state.user.takeFreeDiamondTime, this.scene.state.lang)}`;
            if (str !== this.freeDiamondTimer.text) this.freeDiamondTimer.setText(str);
          }
        } else if (this.scene.state.user.takeFreeDiamondTime > 0 && !this.freeDiamondTimer.visible) {
          this.freeDiamondBtn.setVisible(false);
          this.freeDiamondTimer.setVisible(true);
          this.freeDiamondText?.setVisible(true);
        } else if (this.scene.state.user.takeFreeDiamondTime <= 0 && !this.freeDiamondBtn.visible) {
          this.freeDiamondBtn.setVisible(true);
          this.freeDiamondTimer.setVisible(false);
          this.freeDiamondText?.setVisible(false);
        }
      } else if (!this.scene.state.user.takenFreeDiamonds && this.scene.state.readyAd) {
        if (this.adButton) {
          this.createFreeBtn(true);
          this.freeDiamondBtn.setVisible(true);
        } else {
          if (!this.freeDiamondBtn.visible) this.freeDiamondBtn.setVisible(true);
        }
        if (this.freeDiamondTimer.visible) this.freeDiamondTimer.setVisible(false);
      } else if (this.scene.state.user.takenFreeDiamonds && !this.scene.state.readyAd) {
        if (this.freeDiamondBtn.visible) {
          this.freeDiamondBtn.setVisible(false);
          this.freeDiamondTimer.setVisible(true);
          this.freeDiamondText?.setVisible(true);
        }
        const str1 = shortTime(this.scene.state.timeToNewDay, this.scene.state.lang);
        const str2 = this.scene.state.lang.stillForBoost;
        if (str1 !== this.freeDiamondTimer.text) this.freeDiamondTimer.setText(str1);
        if (this.freeDiamondText && str2 !== this.freeDiamondText?.text) this.freeDiamondText.setText(str2);
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