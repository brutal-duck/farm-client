import { click, clickShopBtn, clickButton } from '../general/clicks';
import { shortNum, getEventRaiting, shortTime, loadingModal, getStatusSettings } from '../general/basic';
import { scoreEnding } from './Event/Unicorns/basic';

const background: string = require('./../../assets/images/profile/background.jpg');
const backButton: string = require('./../../assets/images/profile/back-button.png');
const sheepFarm: string = require('./../../assets/images/profile/sheep-farm.png');
const chickenFarm: string = require('./../../assets/images/profile/chicken-farm.png');
const cowFarm: string = require('./../../assets/images/profile/cow-farm.png');
const eventFarm: string = require('./../../assets/images/profile/event-farm.png');
const sticker: string = require('./../../assets/images/profile/sticker.png');
const cowFarmLock: string = require('./../../assets/images/profile/cow-farm-lock.png');
const chickenFarmLock: string = require('./../../assets/images/profile/chicken-farm-lock.png');
const profileLockIcon: string = require('./../../assets/images/icons/profile-lock-icon.png');
const eventIsland: string = require('./../../assets/images/profile/event-island.png');
const btn: string = require('./../../assets/images/profile/btn.png');
const pointer: string = require('./../../assets/images/profile/pointer.png');
const fortune: string = require('./../../assets/images/profile/event-fortune.png');
const nativeBg: string = require('./../../assets/images/native.png');

class Profile extends Phaser.Scene {
  constructor() {
    super('Profile');
  }
  
  public state: Istate;
  public bg: Phaser.GameObjects.Sprite;
  public eventScore: Phaser.GameObjects.Text;
  public eventPlace: Phaser.GameObjects.Text;
  public eventEndText: Phaser.GameObjects.Text;
  public eventEndTime: Phaser.GameObjects.Text;
  public eventMapFarm: Phaser.GameObjects.Sprite;
  public eventStartText: Phaser.GameObjects.Text;
  public eventStartTime: Phaser.GameObjects.Text;
  public eventStartBg: Phaser.GameObjects.Graphics;
  public eventZone: Phaser.GameObjects.Zone;
  public backBtn: Phaser.GameObjects.Sprite;
  public avatar: Phaser.GameObjects.Sprite;
  public diamondsText: Phaser.GameObjects.Text;
  public eventIsland: Phaser.GameObjects.Sprite;
  public sheepNativeCount: number[] = [ 0, 0, 0, 0 ];
  public chickenNativeCount: number[] = [ 0, 0, 0, 0 ];
  public cowNativeCount: number[] = [ 0, 0, 0, 0 ];
  public sheepNativeText: Phaser.GameObjects.Text;
  public chickenNativeText: Phaser.GameObjects.Text;
  public cowNativeText: Phaser.GameObjects.Text;
  public sheepNativeBg: Phaser.GameObjects.Sprite;
  public chickenNativeBg: Phaser.GameObjects.Sprite;
  public cowNativeBg: Phaser.GameObjects.Sprite;
  public animSheepSprite: Phaser.GameObjects.Sprite;
  public animChickenSprite: Phaser.GameObjects.Sprite;
  public animCowSprite: Phaser.GameObjects.Sprite;
  public currentEndTime: string = ' ';
  
  public click = click.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public getEventRaiting = getEventRaiting.bind(this); 
  public scoreEnding = scoreEnding.bind(this);
  public loadingModal = loadingModal.bind(this);
  public clickButton = clickButton.bind(this);
  public getStatusSettings = getStatusSettings.bind(this);

  public init(state: Istate): void {
    this.state = state;
  }


  public preload(): void {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');
    this.loadingModal();
    this.load.image('profile-bg', background);
    this.load.image('profile-back-button', backButton);
    this.load.image('profile-sheep-farm', sheepFarm);
    this.load.image('profile-chicken-farm', chickenFarm);
    this.load.image('profile-cow-farm', cowFarm);
    this.load.image('profile-event-farm', eventFarm);
    this.load.image('profile-sticker', sticker);
    this.load.image('profile-cow-farm-lock', cowFarmLock);
    this.load.image('profile-chicken-farm-lock', chickenFarmLock);
    this.load.image('profile-lock-icon', profileLockIcon);
    this.load.image('profile-event-island', eventIsland);
    this.load.image('profile-btn', btn);
    this.load.image('profile-pointer', pointer);
    this.load.image('profile-fortune', fortune);
    this.load.image('profile-native-bg', nativeBg)
  }


  public create(): void {
    if (this.state.progress.event.eventPoints >= 0 && this.state.progress.event.open && this.state.progress.event.type === 1) this.getEventRaiting(); // получаем новые рейтинги
    
    this.bg = this.add.sprite(0, 0, 'profile-bg')
      .setInteractive()
      .setOrigin(0, 0);
    
    this.createElements();
    this.setListeners();
    this.setNativeAnim();

    this.game.scene.keys[this.state.farm].updateProfileNative(true);
  }

  public update(): void {
    this.updateEvent();
  }

  private createElements(): void {
    this.backBtn = this.add.sprite(630, 80, 'profile-back-button');
    this.createProfileInfo();
    this.createFarms();
    this.createShop();
    this.creaetePointer();
  }

  private createProfileInfo(): void {
    const farmer: Phaser.GameObjects.Sprite = this.add.sprite(80, 75, 'farmer').setScale(0.45).setVisible(false);
    let avatar: Phaser.GameObjects.Sprite;
    if (this.state.platform === 'web') {
      avatar = farmer;
      avatar.setVisible(true);
    } else {
      avatar = this.add.sprite(farmer.x, farmer.y, 'avatar');
      if (this.state.platform === 'vk') {
        avatar.setScale(0.6);
      }
      avatar.setMask(new Phaser.Display.Masks.BitmapMask(this, farmer));
      if (avatar.texture.key === '__MISSING') {
        avatar.setTexture('farmer');
      }
    }
    const avatarGeom: Phaser.Geom.Rectangle = farmer.getBounds();
    const status: IstatusSettings = this.getStatusSettings(this.state.user.status);
    if (status) {
      this.add.sprite(avatarGeom.right - 15, avatarGeom.top + 15, status.iconTexture).setVisible(status.iconVisible);
    }
    let login: string = this.state.platform === 'web' ? this.state.user.login : this.state.name;
    if (!login) login = this.state.lang.unknownFarmer;
    const text: Phaser.GameObjects.Text = this.add.text(avatarGeom.right + 110, avatarGeom.centerY, login,  {
      font: '32px Shadow',
      color: '#FFFFFF',
      align: 'center',
      wordWrap: { width: 220 },
    }).setOrigin(0.5);
    if (text.displayWidth > 200) {
      const multiply: number = text.displayWidth / 200;
      text.setFontSize(parseInt(text.style.fontSize) / multiply);
    }
    this.diamondsText = this.add.text(this.cameras.main.centerX + 120, 95, shortNum(this.state.user.diamonds), {
      font: '32px Shadow',
      color: '#FFFFFF',
      align: 'center',
      wordWrap: { width: 220 },
    }).setOrigin(0.5);
  }

  private createFarms(): void {
    this.createSheepFarm();
    if (this.state.user.test === 'B') {
      this.createChickenFarmTestB();
      this.createCowFarmTestB();
    } else {
      this.createChickenFarmTestA();
      this.createCowFarmTestA();
    }
    // this.createLockedCowFarm();
    if (this.state.progress.event.type === 1) {
      this.createUnicornFarm();
    } else if (this.state.progress.event.type === 2) {
      this.createFortuneWheel();
    }
  }

  private createSheepFarm(): void {
    const farmPosition: Iposition = { x: 160, y: 810 };
    const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-sheep-farm');
    this.add.text(farmPosition.x + 110, farmPosition.y + 5, `${this.state.progress.sheep.part}/${this.state.progress.sheep.max}`, {
      font: '28px Shadow',
      color: '#ffe5d7'
    }).setOrigin(0.5, 0.5).setStroke('#522007', 5);
    
    this.sheepNativeText = this.add.text(farmPosition.x + 110, farmPosition.y - 125, '', {
      font: '30px Bip',
      color: '#ffffff',
    }).setOrigin(0.5).setDepth(1).setVisible(false);
    this.sheepNativeBg = this.add.sprite(this.sheepNativeText.x, this.sheepNativeText.y, 'profile-native-bg').setVisible(false);
    this.animSheepSprite = this.add.sprite(this.sheepNativeBg.x, this.sheepNativeBg.y, 'profile-native-bg').setVisible(false);
    this.click(farmSprite, (): void => {
      if (this.state.farm !== 'Sheep') {
        this.game.scene.keys[this.state.farm].autosave();
        this.scene.stop();
        this.scene.stop(this.state.farm);
        this.scene.stop(this.state.farm + 'Bars');
        this.scene.start('Sheep' + 'Preload', this.state);
      } else {
        this.game.scene.keys[this.state.farm].scrolling.downHandler();
        this.game.scene.keys[this.state.farm].scrolling.enabled = true;
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
      }
    }, 8);
  }
  
  private createChickenFarmTestA(): void {
    const farmPosition: Iposition = { x: 720, y: 1025 };
    if (this.state.progress.chicken.open) {
      const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-chicken-farm').setOrigin(1, 0.5).setDepth(1);
      this.add.text(farmPosition.x - 215, farmPosition.y - 25, `${this.state.progress.chicken.part}/${this.state.progress.chicken.max}`, {
        font: '28px Shadow',
        color: '#ffe5d7'
      }).setOrigin(0.5, 0.5).setStroke('#522007', 5).setDepth(1);
      this.chickenNativeText = this.add.text(farmPosition.x - 160, farmPosition.y - 125, '', {
        font: '30px Bip',
        color: '#ffffff',
      }).setOrigin(0.5).setDepth(3).setVisible(false);
      this.chickenNativeBg = this.add.sprite(this.chickenNativeText.x, this.chickenNativeText.y, 'profile-native-bg').setDepth(1).setVisible(false);
      this.animChickenSprite = this.add.sprite(this.chickenNativeBg.x, this.chickenNativeBg.y, 'profile-native-bg').setDepth(2).setVisible(false);

      this.click(farmSprite, (): void => {
        if (this.state.farm !== 'Chicken') {
          this.game.scene.keys[this.state.farm].autosave();
          this.scene.stop();
          this.scene.stop(this.state.farm);
          this.scene.stop(this.state.farm + 'Bars');
          this.scene.start('Chicken' + 'Preload', this.state);
        } else {
          this.game.scene.keys[this.state.farm].scrolling.downHandler();
          this.game.scene.keys[this.state.farm].scrolling.enabled = true;
          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.scene.stop();
        }
      }, 8);

    } else {
      this.add.sprite(farmPosition.x, farmPosition.y, 'profile-chicken-farm').setOrigin(1, 0.5).setDepth(1);
      this.add.sprite(farmPosition.x, farmPosition.y, 'profile-sticker').setOrigin(1, 0.5).setDepth(1)
      const btn: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x - 125, farmPosition.y + 0, 'profile-btn').setDepth(1);
      const title: Phaser.GameObjects.Text = this.add.text(btn.x + 15, btn.y - 5, shortNum(this.state.progress.chicken.price), {
        font: '22px Shadow',
        color: '#FBD0B9',
        wordWrap: { width: 165 }
      }).setOrigin(0.5, 0.5).setStroke('#1F530A', 5).setDepth(1);

      const left: number = title.getBounds().left - 17;
      const img: Phaser.GameObjects.Sprite = this.add.sprite(left, title.y, 'sheepCoin').setScale(0.12).setDepth(1);

      this.clickShopBtn({ btn: btn, title: title, img: img }, (): void => {
        this.game.scene.keys[this.state.farm].buyNextFarm();
        this.game.scene.keys[this.state.farm].scrolling.downHandler();
        this.game.scene.keys[this.state.farm].scrolling.enabled = true;
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
      });
    }
  }

  private createCowFarmTestA(): void {
    const farmPosition: Iposition = { x: 0, y: 1050 };

    if (this.state.progress.cow.open) {
      const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm').setOrigin(0, 0.5);

      this.add.text(farmPosition.x + 290, farmPosition.y + 10, `${this.state.progress.cow.part}/${this.state.progress.cow.max}`, {
        font: '28px Shadow',
        color: '#ffe5d7'
      }).setOrigin(0.5, 0.5).setStroke('#522007', 5);

      this.cowNativeText = this.add.text(farmPosition.x + 280, farmPosition.y - 100, '', {
        font: '30px Bip',
        color: '#ffffff',
      }).setOrigin(0.5).setDepth(3).setVisible(false);
      this.cowNativeBg = this.add.sprite(this.cowNativeText.x, this.cowNativeText.y, 'profile-native-bg').setVisible(false);
      this.animCowSprite = this.add.sprite(this.cowNativeBg.x, this.cowNativeBg.y, 'profile-native-bg').setDepth(2).setVisible(false);

      this.click(farmSprite, (): void => {
        if (this.state.farm !== 'Cow') {
          this.game.scene.keys[this.state.farm].autosave();
          this.scene.stop();
          this.scene.stop(this.state.farm);
          this.scene.stop(this.state.farm + 'Bars');
          this.scene.start('Cow' + 'Preload', this.state);
        } else {
          this.game.scene.keys[this.state.farm].scrolling.downHandler();
          this.game.scene.keys[this.state.farm].scrolling.enabled = true;
          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.scene.stop();
        }
      }, 8);
    } else if (this.state.progress.chicken.part > 0) {
      this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm').setOrigin(0, 0.5);
      this.add.sprite(farmPosition.x + 30, farmPosition.y, 'profile-sticker').setOrigin(0, 0.5).setDepth(1)
      const btn: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x + 145, farmPosition.y, 'profile-btn').setDepth(1);
      const title: Phaser.GameObjects.Text = this.add.text(btn.x + 15, btn.y - 5, shortNum(this.state.progress.cow.price), {
        font: '22px Shadow',
        color: '#FBD0B9',
        wordWrap: { width: 165 }
      }).setOrigin(0.5, 0.5).setStroke('#1F530A', 5).setDepth(1);

      const left: number = title.getBounds().left - 17;
      const img: Phaser.GameObjects.Sprite = this.add.sprite(left, title.y, 'chickenCoin').setScale(0.12).setDepth(1);

      this.clickShopBtn({ btn: btn, title: title, img: img }, (): void => {
        this.game.scene.keys[this.state.farm].buyNextFarm();
        this.game.scene.keys[this.state.farm].scrolling.downHandler();
        this.game.scene.keys[this.state.farm].scrolling.enabled = true;
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
      });
    } else {
      this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm-lock').setOrigin(0, 0.5);
      const text: Phaser.GameObjects.Text = this.add.text(farmPosition.x + 150, farmPosition.y, this.state.lang.openChickenFarm, {
        font: '20px Shadow',
        color: '#fbd0b9',
        wordWrap: { width: 250 },
        align: 'center',
      }).setOrigin(0.5).setDepth(2);

      const textBounds: Phaser.Geom.Rectangle = text.getBounds();

      this.add.graphics({ x: textBounds.left - 20, y: textBounds.top - 20 })
        .fillStyle(0x2b3d11, 0.5)
        .fillRoundedRect(0, 0, textBounds.width + 40, textBounds.height + 40).setDepth(1);
    }
  }

  private createChickenFarmTestB(): void {
    const farmPosition: Iposition = { x: 720, y: 1025 };
    if (this.state.progress.chicken.open) {
      const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-chicken-farm').setOrigin(1, 0.5).setDepth(1);
      this.add.text(farmPosition.x - 215, farmPosition.y - 25, `${this.state.progress.chicken.part}/${this.state.progress.chicken.max}`, {
        font: '28px Shadow',
        color: '#ffe5d7'
      }).setOrigin(0.5, 0.5).setStroke('#522007', 5).setDepth(1);
      this.chickenNativeText = this.add.text(farmPosition.x - 160, farmPosition.y - 125, '', {
        font: '30px Bip',
        color: '#ffffff',
      }).setOrigin(0.5).setDepth(3).setVisible(false);
      this.chickenNativeBg = this.add.sprite(this.chickenNativeText.x, this.chickenNativeText.y, 'profile-native-bg').setDepth(1).setVisible(false);
      this.animChickenSprite = this.add.sprite(this.chickenNativeBg.x, this.chickenNativeBg.y, 'profile-native-bg').setDepth(2).setVisible(false);

      this.click(farmSprite, (): void => {
        if (this.state.farm !== 'Chicken') {
          this.game.scene.keys[this.state.farm].autosave();
          this.scene.stop();
          this.scene.stop(this.state.farm);
          this.scene.stop(this.state.farm + 'Bars');
          this.scene.start('Chicken' + 'Preload', this.state);
        } else {
          this.game.scene.keys[this.state.farm].scrolling.downHandler();
          this.game.scene.keys[this.state.farm].scrolling.enabled = true;
          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.scene.stop();
        }
      }, 8);

    } else if (this.state.userSheep.part >= this.state.sheepSettings.sheepParts.length 
      && this.state.sheepTasks.filter(el => el.part === this.state.sheepSettings.sheepParts.length).every(el => el.done === 1)) {
      this.add.sprite(farmPosition.x, farmPosition.y, 'profile-chicken-farm').setOrigin(1, 0.5).setDepth(1);
      this.add.sprite(farmPosition.x, farmPosition.y, 'profile-sticker').setOrigin(1, 0.5).setDepth(1)
      const btn: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x - 125, farmPosition.y, 'profile-btn').setDepth(1);
      const title: Phaser.GameObjects.Text = this.add.text(btn.x + 15, btn.y - 5, shortNum(this.state.progress.chicken.price), {
        font: '22px Shadow',
        color: '#FBD0B9',
        wordWrap: { width: 165 }
      }).setOrigin(0.5, 0.5).setStroke('#1F530A', 5).setDepth(1);

      const left: number = title.getBounds().left - 17;
      const img: Phaser.GameObjects.Sprite = this.add.sprite(left, title.y, 'sheepCoin').setScale(0.12).setDepth(1);

      this.clickShopBtn({ btn: btn, title: title, img: img }, (): void => {
        this.game.scene.keys[this.state.farm].buyNextFarm();
        this.game.scene.keys[this.state.farm].scrolling.downHandler();
        this.game.scene.keys[this.state.farm].scrolling.enabled = true;
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
      });
    } else {
      this.add.sprite(farmPosition.x, farmPosition.y - 6, 'profile-chicken-farm-lock').setOrigin(1, 0.5);
      const text: Phaser.GameObjects.Text = this.add.text(farmPosition.x - 150, farmPosition.y - 20, this.state.lang.accessSheepFarmDone, {
        font: '20px Shadow',
        color: '#fbd0b9',
        wordWrap: { width: 250 },
        align: 'center',
      }).setOrigin(0.5).setDepth(2);
      const textBounds: Phaser.Geom.Rectangle = text.getBounds();

      this.add.graphics({ x: textBounds.left - 20, y: textBounds.top - 20 })
        .fillStyle(0x2b3d11, 0.5)
        .fillRoundedRect(0, 0, textBounds.width + 40, textBounds.height + 40).setDepth(1);
    }
  }

  private createCowFarmTestB(): void {
    const farmPosition: Iposition = { x: 0, y: 1050 };

    if (this.state.progress.cow.open) {
      const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm').setOrigin(0, 0.5);

      this.add.text(farmPosition.x + 290, farmPosition.y + 10, `${this.state.progress.cow.part}/${this.state.progress.cow.max}`, {
        font: '28px Shadow',
        color: '#ffe5d7'
      }).setOrigin(0.5, 0.5).setStroke('#522007', 5);

      this.cowNativeText = this.add.text(farmPosition.x + 280, farmPosition.y - 100, '', {
        font: '30px Bip',
        color: '#ffffff',
      }).setOrigin(0.5).setDepth(3).setVisible(false);
      this.cowNativeBg = this.add.sprite(this.cowNativeText.x, this.cowNativeText.y, 'profile-native-bg').setVisible(false);
      this.animCowSprite = this.add.sprite(this.cowNativeBg.x, this.cowNativeBg.y, 'profile-native-bg').setDepth(2).setVisible(false);

      this.click(farmSprite, (): void => {
        if (this.state.farm !== 'Cow') {
          this.game.scene.keys[this.state.farm].autosave();
          this.scene.stop();
          this.scene.stop(this.state.farm);
          this.scene.stop(this.state.farm + 'Bars');
          this.scene.start('Cow' + 'Preload', this.state);
        } else {
          this.game.scene.keys[this.state.farm].scrolling.downHandler();
          this.game.scene.keys[this.state.farm].scrolling.enabled = true;
          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.scene.stop();
        }
      }, 8);
    } else if (this.state.userChicken.part >= this.state.chickenSettings.chickenParts.length 
      && this.state.chickenTasks.filter(el => el.part === this.state.chickenSettings.chickenParts.length).every(el => el.done === 1)) {
        this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm').setOrigin(0, 0.5);
        this.add.sprite(farmPosition.x + 30, farmPosition.y, 'profile-sticker').setOrigin(0, 0.5).setDepth(1)
        const btn: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x + 145, farmPosition.y, 'profile-btn').setDepth(1);
        const title: Phaser.GameObjects.Text = this.add.text(btn.x + 15, btn.y - 5, shortNum(this.state.progress.cow.price), {
          font: '22px Shadow',
          color: '#FBD0B9',
          wordWrap: { width: 165 }
        }).setOrigin(0.5, 0.5).setStroke('#1F530A', 5).setDepth(1);
  
        const left: number = title.getBounds().left - 17;
        const img: Phaser.GameObjects.Sprite = this.add.sprite(left, title.y, 'chickenCoin').setScale(0.12).setDepth(1);
  
        this.clickShopBtn({ btn: btn, title: title, img: img }, (): void => {
          this.game.scene.keys[this.state.farm].buyNextFarm();
          this.game.scene.keys[this.state.farm].scrolling.downHandler();
          this.game.scene.keys[this.state.farm].scrolling.enabled = true;
          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.scene.stop();
        });
    } else {
      this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm-lock').setOrigin(0, 0.5);
      const string: string = this.state.progress.chicken.part > 0 ? this.state.lang.accessChickenFarmDone : this.state.lang.accessSecondFarmDone
      const text: Phaser.GameObjects.Text = this.add.text(farmPosition.x + 150, farmPosition.y, string, {
        font: '20px Shadow',
        color: '#fbd0b9',
        wordWrap: { width: 250 },
        align: 'center',
      }).setOrigin(0.5).setDepth(2);

      const textBounds: Phaser.Geom.Rectangle = text.getBounds();

      this.add.graphics({ x: textBounds.left - 20, y: textBounds.top - 20 })
        .fillStyle(0x2b3d11, 0.5)
        .fillRoundedRect(0, 0, textBounds.width + 40, textBounds.height + 40).setDepth(1);
    }
  }

  private createLockedCowFarm(): void {
    const farmPosition: Iposition = { x: 0, y: 1050 };
    const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm-lock').setOrigin(0, 0.5);
    const text: Phaser.GameObjects.Text = this.add.text(farmPosition.x + 150, farmPosition.y, this.state.lang.unlockNextUpdate, {
      font: '20px Shadow',
      color: '#fbd0b9',
      wordWrap: { width: 200 },
      align: 'center',
    }).setOrigin(0.5).setDepth(2);
    const textBounds: Phaser.Geom.Rectangle = text.getBounds();

    this.add.graphics({ x: textBounds.left - 20, y: textBounds.top - 20 })
      .fillStyle(0x2b3d11, 0.5)
      .fillRoundedRect(0, 0, textBounds.width + 40, textBounds.height + 40).setDepth(1);
    
    this.click(farmSprite, (): void => {
      if (this.state.farm !== 'Cow') {
        this.game.scene.keys[this.state.farm].autosave();
        this.scene.stop();
        this.scene.stop(this.state.farm);
        this.scene.stop(this.state.farm + 'Bars');
        this.scene.start('Cow' + 'Preload', this.state);
      } else {
        this.game.scene.keys[this.state.farm].scrolling.downHandler();
        this.game.scene.keys[this.state.farm].scrolling.enabled = true;
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
      }
    }, 8);
    
  }

  private createUnicornFarm(): void {
    const farmPosition: Iposition = {
      x: 720,
      y: 775
    }
    this.eventMapFarm = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-event-farm').setOrigin(1, 0.5).setVisible(false);
    this.eventZone = this.add.zone(570, 790, 300, 170).setDropZone(undefined, () => {});

    // this.add.graphics()
    //   .lineStyle(5, 0x00FFFF)
    //   .strokeRect(
    //     this.eventZone.x - this.eventZone.input.hitArea.width / 2,
    //     this.eventZone.y - this.eventZone.input.hitArea.height / 2,
    //     this.eventZone.width,
    //     this.eventZone.height
    //   );  

    this.eventScore = this.add.text(farmPosition.x - 122, farmPosition.y - 58, `- ${this.state.lang.eventScores}`, {
      fontSize: '21px',
      color: '#6e00c7',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setVisible(false);

    this.eventPlace = this.add.text(farmPosition.x - 122, farmPosition.y - 20, '- ' + this.state.lang.eventPlace, {
      fontSize: '18px',
      color: '#f0e8ce',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setVisible(false);

    this.eventEndText = this.add.text(farmPosition.x - 122, farmPosition.y, this.state.lang.eventLastTime, {
      fontSize: '14px',
      color: '#530d8e',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setVisible(false);

    this.eventEndTime = this.add.text(farmPosition.x - 122, farmPosition.y + 15, shortTime(this.state.progress.event.endTime, this.state.lang), {
      fontSize: '18px',
      color: '#cbff40',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setVisible(false);
    
    this.eventIsland = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-event-island').setOrigin(1, 0.5).setVisible(false);
    this.eventStartText = this.add.text(farmPosition.x - 150, farmPosition.y + 30, this.state.lang.eventStart, {
      fontSize: '16px',
      color: '#fbd0b9',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setDepth(1).setVisible(false);
    
    this.eventStartTime = this.add.text(farmPosition.x - 150, farmPosition.y + 40, shortTime(this.state.progress.event.startTime, this.state.lang), {
      fontSize: '21px',
      color: '#cbff40',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setDepth(2).setVisible(false);

    this.eventStartBg = this.add.graphics({
      fillStyle: {
        color: 0x2b3d11,
        alpha: 0.5
      },
    }).fillRoundedRect(this.eventStartText.getBounds().left - 25, this.eventStartText.getBounds().top - 20, this.eventStartText.width + 50, 60).setVisible(false);

    this.click(this.eventZone, (): void => {
      if (this.state.farm !== 'Unicorn') {
  
        this.game.scene.keys[this.state.farm].autosave();
        this.scene.stop();
        this.scene.stop(this.state.farm);
        this.scene.stop(this.state.farm + 'Bars');
        this.scene.start('UnicornPreload', this.state);

      } else {

        this.game.scene.keys[this.state.farm].scrolling.downHandler();
        this.game.scene.keys[this.state.farm].scrolling.enabled = true;
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();

      }
    });
  }

  private createFortuneWheel(): void {
    const data = {
      name: this.state.platform !== 'web' ? this.state.name : this.state.user.login,
      spending: 0,
      prize: 0,
      jackpot: false,
    }
    this.state.socket.io.emit('fortune-send', data);
    const farmPosition: Iposition = {
      x: 720,
      y: 775
    }
    this.eventMapFarm = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-fortune').setOrigin(1, 0.5).setVisible(false);
    this.eventZone = this.add.zone(570, 790, 300, 170).setDropZone(undefined, () => {});

    // this.add.graphics()
    //   .lineStyle(5, 0x00FFFF)
    //   .strokeRect(
    //     this.eventZone.x - this.eventZone.input.hitArea.width / 2,
    //     this.eventZone.y - this.eventZone.input.hitArea.height / 2,
    //     this.eventZone.width,
    //     this.eventZone.height
    //   );  

    this.eventScore = this.add.text(farmPosition.x - 290, farmPosition.y + 20, ` - `, {
      fontSize: '25px',
      color: '#ffffff',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setVisible(false);

    this.eventEndTime = this.add.text(farmPosition.x - 290, farmPosition.y + 40, `${this.state.lang.lastTime} ${shortTime(this.state.progress.event.endTime, this.state.lang)}`, {
      fontSize: '12px',
      color: '#942600',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setVisible(false);
    
    this.eventIsland = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-event-island').setOrigin(1, 0.5).setVisible(false);
    this.eventStartText = this.add.text(farmPosition.x - 150, farmPosition.y + 30, this.state.lang.eventStart, {
      fontSize: '16px',
      color: '#fbd0b9',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setDepth(1).setVisible(false);
    
    this.eventStartTime = this.add.text(farmPosition.x - 150, farmPosition.y + 40, shortTime(this.state.progress.event.startTime, this.state.lang), {
      fontSize: '21px',
      color: '#cbff40',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setDepth(2).setVisible(false);

    this.eventStartBg = this.add.graphics({
      fillStyle: {
        color: 0x2b3d11,
        alpha: 0.5
      },
    }).fillRoundedRect(this.eventStartText.getBounds().left - 25, this.eventStartText.getBounds().top - 20, this.eventStartText.width + 50, 60).setVisible(false);

    this.click(this.eventZone, (): void => {
      this.scene.stop('Profile');
      this.scene.launch('Fortune', this.state);
    });
  }

  private creaetePointer(): void {
    const pointer = this.add.sprite(0, 0, 'profile-pointer').setOrigin(0.5, 1).setDepth(100);
    
    const sheepPosition: Iposition = { x: 140, y: 740 };
    const chickenPosition: Iposition = { x: 610, y: 940 };
    const eventPosition: Iposition =  { x: 600, y: 700 };
    const cowPosition: Iposition = { x: 160, y: 980 };

    if (this.state.farm === 'Sheep') {
      pointer.setPosition(sheepPosition.x, sheepPosition.y)
    } else if (this.state.farm === 'Chicken') {
      pointer.setPosition(chickenPosition.x, chickenPosition.y)
    } else if (this.state.farm === 'Unicorn') {
      pointer.setPosition(eventPosition.x, eventPosition.y)
    } else if (this.state.farm === 'Cow') {
      pointer.setPosition(cowPosition.x, cowPosition.y)
    }

    this.tweens.add({
      targets: pointer,
      y: '-=20',
      duration: 300,
      yoyo: true,
      repeat: -1
    })
  }

  private setListeners(): void {
    this.clickButton(this.backBtn, () => {
      this.game.scene.keys[this.state.farm].scrolling.downHandler();
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
    });
  }

  private createShop(): void {
    const shopPosition: Iposition = {
      x: 290,
      y: 600
    }
    const zoneSize: Isize = {
      width: 170,
      height: 170
    }
    const zone: Phaser.GameObjects.Zone = this.add.zone(shopPosition.x, shopPosition.y, zoneSize.width, zoneSize.height).setDropZone(undefined, () => {});
      
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFF0000);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    this.click(zone, (): void => {
      const modal: Imodal = {
        type: 2,
        shopType: 1,
      }
      this.state.modal = modal;
      this.scene.stop();
      this.scene.launch('Modal', this.state);
    });

    if (!this.state.user.starterpack && (this.state.progress.sheep.part > 4 || this.state.progress.chicken.part >= 1)) {

      const starterpackIcon: Phaser.GameObjects.Sprite = this.add.sprite(shopPosition.x + 60, shopPosition.y - 80, 'starterpack-icon').setScale(0.25)
      this.tweens.add({
        targets: starterpackIcon,
        delay: 2000,
        scale: 0.32,
        duration: 180,
        yoyo: true,
        repeat: 1,
        loop: -1
      });

      this.click(starterpackIcon, () => {
        const modal: Imodal = {
          type: 2,
          shopType: 1
        }
        this.state.modal = modal;
        this.scene.stop();
        this.scene.launch('Modal', this.state);
      });
    }

    if (!this.state.user.takenFreeDiamonds  && (this.state.userSheep.tutorial >= 100 || this.state.progress.chicken.part >= 1 || this.state.progress.cow.part >= 1)) {
      this.add.sprite(shopPosition.x - 50, shopPosition.y - 70, 'profile-native-bg');
      this.add.text(shopPosition.x - 50, shopPosition.y - 70, '1', {
        font: '30px Bip',
        color: '#ffffff',
      }).setOrigin(0.5);
    }
  }

  private updateEvent(): void {
    if (
      this.state.progress.event.startTime > 0 && 
      this.state.progress.event.open && 
      this.state.user.additionalTutorial.eventTutorial === 0 && 
      (this.state.progress.sheep.part > 4 ||
      this.state.progress.chicken.part >= 1 ||
      this.state.progress.cow.part >= 1) && 
      (this.state.user.login || this.state.name) &&
      !this.eventStartText?.visible
    ) {
      this.eventIsland?.setVisible(true);
      this.eventStartText?.setY(795);
      this.eventStartText?.setVisible(true);
      this.eventStartTime?.setVisible(true);
      this.eventStartBg?.setVisible(true);
      this.eventMapFarm?.setVisible(false);
      this.eventPlace?.setVisible(false);
      this.eventScore?.setVisible(false);
      this.eventEndTime?.setVisible(false);
      this.eventEndText?.setVisible(false);
      this.eventZone?.destroy();

    } else if (
      this.state.progress.event.startTime <= 0 && 
      this.state.progress.event.open && 
      this.state.user.additionalTutorial.eventTutorial > 0 &&
      this.state.progress.event.endTime > 0 && 
      (this.state.progress.sheep.part > 4 || 
      this.state.progress.chicken.part >= 1 || 
      this.state.progress.cow.part >= 1) && 
      (this.state.user.login || this.state.name) &&
      !this.eventMapFarm?.visible
    ) {
      this.eventStartText?.setVisible(false);
      this.eventStartTime?.setVisible(false);
      this.eventStartBg?.setVisible(false);
      this.eventMapFarm?.setVisible(true);
      this.eventPlace?.setVisible(true);
      this.eventScore?.setVisible(true);
      this.eventEndTime?.setVisible(true);
      this.eventEndText?.setVisible(true);
      
    } else if (
      this.state.progress.event.startTime <= 0 && 
      this.state.progress.event.open && 
      this.state.user.additionalTutorial.eventTutorial === 0 && 
      (this.state.user.login || this.state.name) && 
      (this.state.progress.sheep.part > 4 || 
      this.state.progress.chicken.part >= 1 || 
      this.state.progress.cow.part >= 1) && 
      this.state.progress.event.endTime > 0 &&
      this.eventZone.active
    ) {
      this.eventIsland?.setVisible(true);
      this.eventZone?.destroy();

    } else if (
      this.state.progress.event.endTime <= 0 &&
      this.state.progress.event.open &&
      (this.state.user.login || this.state.name) &&
      (this.state.progress.sheep.part > 4 ||
      this.state.progress.chicken.part >= 1 ||
      this.state.progress.cow.part >= 1) 
      && !this.eventStartText.visible
    ) {
      this.eventIsland?.setVisible(false);
      this.eventStartText?.setVisible(true);
      this.eventStartText?.setY(805);
      this.eventStartTime?.setVisible(false);
      this.eventStartBg?.setVisible(true);
      this.eventStartText?.setText(this.state.lang.eventEndText);
      this.eventMapFarm?.setVisible(false);
      this.eventPlace?.setVisible(false);
      this.eventScore?.setVisible(false);
      this.eventEndTime?.setVisible(false);
      this.eventEndText?.setVisible(false);
      this.eventZone?.destroy();

    } else if (
      ((!this.state.user.login && 
      !this.state.name || 
      this.state.progress.sheep.part <= 4 && 
      this.state.progress.chicken.part < 1 && 
      this.state.progress.cow.part < 1) || 
      !this.state.progress.event.open) && 
      this.eventZone.active 
    ) {
      this.eventIsland?.setVisible(false);
      this.eventStartText?.setVisible(false);
      this.eventStartTime?.setVisible(false);
      this.eventStartBg?.setVisible(false);
      this.eventMapFarm?.setVisible(false);
      this.eventPlace?.setVisible(false);
      this.eventScore?.setVisible(false);
      this.eventEndTime?.setVisible(false);
      this.eventEndText?.setVisible(false);
      this.eventZone?.destroy();

    } 
    
    if (this.state.progress.event.updateRaitings && this.state.progress.event.type === 1) {
      const points: number = this.state.progress.event.eventPoints >= 0 ? this.state.progress.event.eventPoints : 0;

      this.eventScore.setText(points + ' ' + this.scoreEnding(points, this.state.lang));
      this.eventPlace.setText(this.state.progress.event.userEventRaiting.place + ' ' + this.state.lang.eventPlace);
      this.eventEndTime.setText(shortTime(this.state.progress.event.endTime, this.state.lang));
      this.state.progress.event.updateRaitings = false;
    }

    if (this.state.progress.event.type === 2 && this.state.progress.event.startTime < 0) {
      if (this.eventScore.text !== String(this.state.fortuneData?.pull)) {
        this.eventScore.setText(String(this.state.fortuneData?.pull));
      }
      
      const time: string = `${shortTime(this.state.progress.event.endTime, this.state.lang)}`
      if (this.currentEndTime !== time) {
        this.currentEndTime = time;
        const text: string = `${this.state.lang.lastTime} ${this.currentEndTime}`;
        this.eventEndTime.setText(text);
      }
    }
  }
  
  private setNativeAnim(): void {
    if (this.sheepNativeBg) {
      this.tweens.add({
        targets: [ this.animSheepSprite ],
        scale: { from: 1.05, to: 2 },
        alpha: { from: 0.5, to: 0 },
        duration: 500,
        repeat: -1,
        repeatDelay: 1150,
      });
    }
    if (this.chickenNativeBg) {
      this.tweens.add({
        targets: [ this.animChickenSprite ],
        scale: { from: 1.05, to: 2 },
        alpha: { from: 0.5, to: 0 },
        duration: 500,
        repeat: -1,
        repeatDelay: 1150,
      });
    } 
    if (this.cowNativeBg) {
      this.tweens.add({
        targets: [ this.animCowSprite ],
        scale: { from: 1.05, to: 2 },
        alpha: { from: 0.5, to: 0 },
        duration: 500,
        repeat: -1,
        repeatDelay: 1150,
      });
    }
  }

}

export default Profile;
