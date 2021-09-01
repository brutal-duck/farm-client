import { click, clickShopBtn, clickButton } from '../general/clicks';
import { shortNum, getEventRaiting, shortTime, loadingModal, getStatusSettings } from '../general/basic';
import { scoreEnding } from './Event/Unicorns/basic';
import Currency from '../components/animations/Currency';
import Notificator from './../components/gameObjects/Notificator';
import ClanFlagPole from './../components/clan/ClanFlagPole';

const background: string = require('./../../assets/images/profile/background.jpg');
const chickenFarm: string = require('./../../assets/images/profile/chicken-farm.png');
const cowFarm: string = require('./../../assets/images/profile/cow-farm.png');
const eventFarm: string = require('./../../assets/images/profile/event-farm.png');
const sticker: string = require('./../../assets/images/profile/sticker.png');
const cowFarmLock: string = require('./../../assets/images/profile/cow-farm-lock.png');
const profileLockIcon: string = require('./../../assets/images/icons/profile-lock-icon.png');
const eventIsland: string = require('./../../assets/images/profile/event-island.png');
const btn: string = require('./../../assets/images/profile/btn.png');
const pointer: string = require('./../../assets/images/profile/pointer.png');
const fortune: string = require('./../../assets/images/profile/event-fortune.png');
const socialBtnVk: string = require('./../../assets/images/profile/social-btn-vk.png');
const socialBtnOk: string = require('./../../assets/images/profile/social-btn-ok.png');
const closeWindowBtn: string = require('../../assets/images/modal/close-window-btn.png');
const clanFlagpole: string = require('../../assets/images/clan/flagpole.png');

const progressTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'Shadow',
  fontSize: '24px',
  color: '#ffe5d7',
  stroke: '#c85d11',
  strokeThickness: 3,
};
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
  public sheepNotificator: Notificator;
  public chickenNotificator: Notificator;
  public cowNotificator: Notificator;
  public unicornNotificator: Notificator;
  private socialTaskBtn: Phaser.GameObjects.Sprite;
  private socialTaskNotificator: Notificator;
  private socialTasks: IsociaTasks;
  private currentEndTime: string = ' ';
  private currentDiamonds: number;
  private animDiamondsCount: number = 0;
  private shopNotificator: Notificator;
  private clanNotificator: Notificator;
  private personalMessageNotificator: Notificator;
  
  public click = click.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public getEventRaiting = getEventRaiting.bind(this); 
  public scoreEnding = scoreEnding.bind(this);
  public loadingModal = loadingModal.bind(this);
  public clickButton = clickButton.bind(this);
  public getStatusSettings = getStatusSettings.bind(this);

  public init(state: Istate): void {
    this.state = state;
    if (this.state.platform === 'vk') {
      this.socialTasks = this.state.vkTask;
    } else if (this.state.platform === 'ok') {
      this.socialTasks = this.state.okTask;
    } 
    this.currentDiamonds = this.state.user.diamonds;
  }


  public preload(): void {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');
    this.loadingModal();
    this.load.image('profile-bg', background);
    this.load.image('profile-chciken-farm', chickenFarm);
    this.load.image('profile-cow-farm', cowFarm);
    this.load.image('profile-event-farm', eventFarm);
    this.load.image('profile-sticker', sticker);
    this.load.image('profile-cow-farm-lock', cowFarmLock);
    this.load.image('profile-lock-icon', profileLockIcon);
    this.load.image('profile-event-island', eventIsland);
    this.load.image('profile-btn', btn);
    this.load.image('profile-pointer', pointer);
    this.load.image('profile-fortune', fortune);
    this.load.image('profile-social-btn-vk', socialBtnVk);
    this.load.image('profile-social-btn-ok', socialBtnOk);
    this.load.image('close-window-btn', closeWindowBtn);
    this.load.image('clan-flagpole', clanFlagpole);
  }


  public getCurrency(position: Iposition, counter: number = 1, texture: string): void {
    if (counter > 5) counter = 5;
  
    let time: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
      counter--;
      const pos: Iposition = {
        x: Phaser.Math.Between(position.x - 30, position.x + 30),
        y: Phaser.Math.Between(position.y - this.game.scene.keys[this.state.farm].scrolling.scrollY - 30, position.y - this.game.scene.keys[this.state.farm].scrolling.scrollY + 30),
      }
      let target = { x: 100, y: 30 };
      if (texture !== 'diamond') {
        target = { x: 495, y: 120}
      }
      Currency.create(this, pos, target, texture, 400);
      if (counter <= 0) time.remove(false);
    }, callbackScope: this, loop: true });
  
  }

  public create(): void {
    if (
      this.state.progress.event.open && 
      this.state.progress.event.type === 1 && 
      this.state.progress.event.startTime < 0 && 
      this.state.progress.event.endTime > 0
    ) this.getEventRaiting(); // получаем новые рейтинги
    
    this.bg = this.add.sprite(0, 0, 'profile-bg')
      .setInteractive()
      .setOrigin(0, 0);
    
    this.createElements();
    this.setListeners();
    this.game.scene.keys[this.state.farm].updateProfileNotification(true);
  }

  public update(): void {
    this.updateEvent();
    this.updateUserDiamonds();
    this.updateShopNotification();
    this.updatePersonalMessagesNotification();
    this.updateClanNotification();
  }

  private createElements(): void {
    this.backBtn = this.add.sprite(632, 60, 'close-window-btn');
    this.createProfileInfo();
    this.createFarms();
    this.createShop();
    this.createProfile();
    this.createPersonalMessages();
    this.createClan();
    this.creaetePointer();
    if (this.state.platform === 'vk' || this.state.platform === 'ok') this.createSocialTaskBtn();
  }

  private createProfileInfo(): void {
    const farmer: Phaser.GameObjects.Sprite = this.add.sprite(280, 75, 'farmer').setScale(0.3).setVisible(false);
    let avatar: Phaser.GameObjects.Sprite;
    avatar = farmer;
    avatar.setVisible(true);
    // if (this.state.platform === 'web' || this.state.platform === 'android' ) {
    //   avatar = farmer;
    //   avatar.setVisible(true);
    // } else {
    //   avatar = this.add.sprite(farmer.x, farmer.y, 'avatar');
    //   if (this.state.platform === 'vk') {
    //     avatar.setScale(0.6);
    //   }
    //   avatar.setMask(new Phaser.Display.Masks.BitmapMask(this, farmer));
    //   if (avatar.texture.key === '__MISSING') {
    //     avatar.setTexture('farmer');
    //   }
    // }
    const avatarGeom: Phaser.Geom.Rectangle = farmer.getBounds();
    const status: IstatusSettings = this.getStatusSettings(this.state.user.status);
    if (status) {
      this.add.sprite(avatarGeom.right - 5, avatarGeom.top + 5, status.iconTexture).setVisible(status.iconVisible);
    }
    let login: string = this.state.platform === 'web' || this.state.platform === 'android'? this.state.user.login : this.state.name;
    if (!login) login = this.state.lang.unknownFarmer;
    const nameTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '32px',
      fontFamily: 'Shadow',
      color: '#FFFFFF',
      align: 'center',
      wordWrap: { width: 190, useAdvancedWrap: true },
    }
    const text: Phaser.GameObjects.Text = this.add.text(avatarGeom.right + 100, avatarGeom.centerY, login, nameTextStyle).setOrigin(0.5);
    if (text.displayHeight > 100) {
      const multiply: number = text.displayHeight / 100;
      text.setFontSize(parseInt(text.style.fontSize) / multiply);
    }
    this.diamondsText = this.add.text(110, 75, shortNum(this.state.user.diamonds), {
      font: '32px Shadow',
      color: '#7D3D0F',
      align: 'center',
      wordWrap: { width: 220 },
    }).setOrigin(0.5);
  }

  private createFarms(): void {
    this.createSheepFarm();
    this.createChickenFarm();
    this.createCowFarm();
    if (this.state.progress.event.type === 1) {
      this.createUnicornFarm();
    } else if (this.state.progress.event.type === 2) {
      this.createFortuneWheel();
    }
  }

  private createSheepFarm(): void {
    const farmPosition: Iposition = { x: 150, y: 750 };
    const width: number = 300;
    const height: number = 240;
    
    const farmZone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y, width, height).setDropZone(undefined, () => {});
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFFFF00);
    // graphics.strokeRect(farmZone.x - farmZone.input.hitArea.width / 2, farmZone.y - farmZone.input.hitArea.height / 2, farmZone.input.hitArea.width, farmZone.input.hitArea.height);
    const progressText: string = `${this.state.progress.sheep.part}/${this.state.progress.sheep.max}`;
    this.add.text(farmPosition.x + 155, farmPosition.y + 38, progressText, progressTextStyle).setOrigin(0.5);
    this.sheepNotificator = new Notificator(this, { x: farmPosition.x + 125, y: farmPosition.y - 85 }, true);
    this.click(farmZone, (): void => {
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
  
  private createChickenFarm(): void {
    const farmPosition: Iposition = { x: 720, y: 1025 };
    if (this.state.progress.chicken.open) {
      const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-chicken-farm').setOrigin(1, 0.5).setDepth(1);
      const progressText: string = `${this.state.progress.chicken.part}/${this.state.progress.chicken.max}`;
      this.add.text(farmPosition.x - 245, farmPosition.y + 20, progressText, progressTextStyle).setOrigin(0.5).setDepth(1);
      this.chickenNotificator = new Notificator(this, { x: farmPosition.x - 200, y: farmPosition.y - 110 }, true).setDepth(2);
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

  private createCowFarm(): void {
    const farmPosition: Iposition = { x: 0, y: 1020 };

    if (this.state.progress.cow.open) {
      const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm').setOrigin(0, 0.5);

      const progressText: string = `${this.state.progress.cow.part}/${this.state.progress.cow.max}`;
      this.add.text(farmPosition.x + 319, farmPosition.y + 23, progressText, progressTextStyle).setOrigin(0.5);

      this.cowNotificator = new Notificator(this, { x: farmPosition.x + 260, y: farmPosition.y - 150 }, true);
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

    this.unicornNotificator = new Notificator(this, { x: farmPosition.x - 210, y: farmPosition.y - 80 }, true);
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
    const pos: Iposition = {
      x: 215,
      y: 520
    }
    const size: Isize = {
      width: 150,
      height: 210
    }
    const zone: Phaser.GameObjects.Zone = this.add.zone(pos.x, pos.y, size.width, size.height).setDropZone(undefined, () => {});
      
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFF0000);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    this.click(zone, (): void => {
      const modal: Imodal = {
        type: 2,
        shopType: 1,
      }
      this.state.modal = modal;
      // this.scene.stop();
      this.scene.launch('Modal', this.state);
    });

    this.shopNotificator = new Notificator(this, { x: pos.x + 60, y: pos.y - 60, });

    if (!this.state.user.starterpack && (this.state.progress.sheep.part > 4 || this.state.progress.chicken.part >= 1) && this.state.user.takenFreeDiamonds) {

      const starterpackIcon: Phaser.GameObjects.Sprite = this.add.sprite(pos.x + 55, pos.y - 50, 'stock-icon').setScale(0.45);
      this.tweens.add({
        targets: starterpackIcon,
        delay: 2000,
        props: {
          rotation: { duration: 600, yoyo: false, ease: 'Power2', value: 2 * Math.PI },
          scale: { value: 0.5, ease: 'Power1', duration: 250, yoyo: true },
        },
        loop: -1,
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
  }

  private createProfile(): void {
    const pos: Iposition = {
      x: 365,
      y: 300
    };
    const size: Isize = {
      width: 190,
      height: 240
    };
    const zone: Phaser.GameObjects.Zone = this.add.zone(pos.x, pos.y, size.width, size.height).setDropZone(undefined, () => {});
      
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFF0000);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    this.click(zone, (): void => {
      const modal: Imodal = {
        type: 15,
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
    });
  }

  private createPersonalMessages(): void {
    const pos: Iposition = {
      x: 475,
      y: 400
    };
    const size: Isize = {
      width: 80,
      height: 110
    };
    const zone: Phaser.GameObjects.Zone = this.add.zone(pos.x, pos.y, size.width, size.height).setDepth(1).setDropZone(undefined, () => {});
      
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFFFF00);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    this.click(zone, (): void => {
      const modal: Imodal = {
        type: 9, chatType: 2 
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
    });

    const count: number = this.getPersonalTabCountNotification();
    this.personalMessageNotificator = new Notificator(this, {x: pos.x + 15, y: pos.y - 40,}, true);
    this.personalMessageNotificator.setCount(count);
  }

  private createClan(): void {
    const pos: Iposition = {
      x: 610,
      y: 400
    };
    const size: Isize = {
      width: 150,
      height: 230
    };
    const zone: Phaser.GameObjects.Zone = this.add.zone(pos.x, pos.y, size.width, size.height).setDepth(1).setDropZone(undefined, () => {});
      
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFFFF00);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    if (this.state.clan) {
      new ClanFlagPole(this, { x: pos.x + 5, y: pos.y - 100 }).setDepth(2);
    }
    this.clanNotificator = new Notificator(this, { x: pos.x + 65, y: pos.y - 80 }, true);
    this.click(zone, (): void => {
      if (this.state.userSheep.part >= 7 && this.checkAuthUser()) {
        if (!this.state.user.clanId || !this.state.clan) {
          this.state.modal = {
            type: 17,
            clanTabType: 2,
          };
          this.scene.launch('Modal', this.state);
        } else {
          this.scene.stop();
          this.scene.launch('ClanFarm', this.state);
        }
      } else if (this.state.userSheep.part < 7) {
        this.state.modal = {
          type: 1,
          sysType: 3,
          message: this.state.lang.reachChapterOfSheepFarm.replace('$1', '7'),
          height: 150,
        };
        this.scene.launch('Modal', this.state);
      } else {
        this.state.modal = {
          type: 1,
          sysType: 3,
          message: this.state.lang.needRegistration,
          height: 150,
        };
        this.scene.launch('Modal', this.state);
      }
    });
  }

  private checkAuthUser(): boolean {
    return (this.state.user.login || this.state.name) && this.state.platform !== 'ya'|| this.state.yaPlayer && this.state.platform === 'ya';
  }
  private updatePersonalMessagesNotification(): void {
    if (this.state.updatePersonalMessage) {
      this.state.updatePersonalMessage = false;
      const count: number = this.getPersonalTabCountNotification();
      this.personalMessageNotificator.setCount(count);
    }
  }

  private getPersonalTabCountNotification(): number {
    let count: number = 0;
    for (const user of this.state.user.personalMessages) {
      for (const message of user.messages) {
        if (!message.check) {
          count += 1;
          break;
        }
      }
    }
    for (const message of this.state.user.messages) {
      if (!message.check) {
        count += 1;
      }
    }
    return count;
  }

  private updateEvent(): void {
    if (
      this.state.progress.event.startTime > 0 && 
      this.state.progress.event.open && 
      (!this.state.user.fortuneTutorial && 
      this.state.progress.event.type === 2 ||
      // this.state.userUnicorn?.tutorial === 0 &&
      this.state.progress.event.type === 1) && 
      (this.state.progress.sheep.part > 4 ||
      this.state.progress.chicken.part >= 1 ||
      this.state.progress.cow.part >= 1) && 
      this.checkAuthUser() &&
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
      (this.state.user.fortuneTutorial &&
      this.state.progress.event.type === 2 || this.state.userUnicorn?.tutorial > 0 &&
      this.state.progress.event.type === 1) &&
      this.state.progress.event.endTime > 0 && 
      (this.state.progress.sheep.part > 4 || 
      this.state.progress.chicken.part >= 1 || 
      this.state.progress.cow.part >= 1) && 
      this.checkAuthUser() &&
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
      (!this.state.user.fortuneTutorial && 
      this.state.progress.event.type === 2 ||
      this.state.userUnicorn?.tutorial === 0 && 
      this.state.progress.event.type === 1) && 
      this.checkAuthUser() &&
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
      this.checkAuthUser() &&
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
      ((!this.checkAuthUser() || 
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
    
    if (this.state.unicornRaitings?.updated && this.state.progress.event.type === 1) {
      const points: number = this.state.userUnicorn.points;

      this.eventScore.setText(points + ' ' + this.scoreEnding(points, this.state.lang));
      this.eventPlace.setText(this.state.unicornRaitings?.user.place + ' ' + this.state.lang.eventPlace);
      this.eventEndTime.setText(shortTime(this.state.progress.event.endTime, this.state.lang));
      this.state.unicornRaitings.updated = false;
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
  
  private createSocialTaskBtn(): void {
    const position: Iposition = { x: 70, y: 230 };
    if (this.state.userSheep.tutorial >= 100) {
      this.socialTaskBtn = this.add.sprite(position.x, position.y, `profile-social-btn-${this.state.platform}`);
      this.socialTaskNotificator = new Notificator(this, { x: position.x + this.socialTaskBtn.displayWidth / 2 - 10, y: position.y - this.socialTaskBtn.displayHeight / 2 + 5 });
      this.clickButton(this.socialTaskBtn, (): void => {
        const modal: Imodal = { type: 14 };
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
      });
      this.updateSocialTaskNotification();
    }
  }

  public updateSocialTaskNotification(): void {
    const check: boolean[] = [];
    for (const key in this.socialTasks) {
      check.push(this.socialTasks[key]);
    }
    let count: number = check.length - check.filter(el => el).length;
    if (count <= 0 && !this.state.user.takenSocialAward) {
      count = 1;
    }
    if (this.state.userSheep.tutorial < 100 || this.state.shownSocialTaskWindow) count = 0;
    
    if (this.state.user.takenSocialAward) {
      this.socialTaskNotificator.setVisible(false);
    } else {
      this.socialTaskNotificator.setCount(count);
    }
  }

  private updateClanNotification(): void {
    const count = this.state.user.clanTasks.filter(el => el.done && !el.got_awarded).length;
    this.clanNotificator.setCount(count);
  }

  private updateUserDiamonds(): void {
    if (this.currentDiamonds < this.state.user.diamonds) {
      if (this.animDiamondsCount === 0) {
        const count: number = this.state.user.diamonds - this.currentDiamonds;
        this.animDiamondsCount = count >= 3 ? 2 : count == 2 ? 1 : 0;
        this.tweens.add({
          duration: 100,
          loop: this.animDiamondsCount,
          scale: { from: 1, to: 1.5 },
          yoyo: true,
          targets: this.diamondsText,
          onComplete: (): void => { this.animDiamondsCount = 0 },
        });
        this.diamondsText.setText(shortNum(this.state.user.diamonds));
        this.currentDiamonds = this.state.user.diamonds;
      }
    } else if (this.currentDiamonds > this.state.user.diamonds){
      this.currentDiamonds = this.state.user.diamonds;
      this.diamondsText.setText(shortNum(this.state.user.diamonds));
    }
  }

  private updateShopNotification(): void {
    this.shopNotificator?.setVisible(this.checkFreeDiamondsNotification());
  }

  private checkFreeDiamondsNotification(): boolean {
    return !this.state.user.takenFreeDiamonds && 
    (this.state.userSheep.tutorial >= 100 || 
    this.state.progress.chicken.part >= 1 || 
    this.state.progress.cow.part >= 1);
  }
}


export default Profile;
