import { click, clickShopBtn, clickButton } from '../general/clicks';
import { shortNum, getEventRaiting, shortTime, loadingModal, getStatusSettings } from '../general/basic';
import { scoreEnding } from './Event/Unicorns/basic';
import Currency from '../components/animations/Currency';
import Notificator from './../components/gameObjects/Notificator';
import ClanFlagPole from './../components/clan/ClanFlagPole';
import Utils from './../libs/Utils';
import assets from '../data/assets';

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
  private currentDiamonds: number;
  private animDiamondsCount: number = 0;
  private shopNotificator: Notificator;
  private clanNotificator: Notificator;
  private personalMessageNotificator: Notificator;
  private clanFlagPole: ClanFlagPole;
  private fortunePull: Phaser.GameObjects.Text;
  public hints: Phaser.GameObjects.Group;

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
    this.clanFlagPole = null;
    this.hints = this.add.group();
  }


  public preload(): void {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');
    this.loadingModal();
    this.load.image('profile-bg', assets.profileBackground);
    this.load.image('profile-chciken-farm', assets.chickenFarm);
    this.load.image('profile-cow-farm', assets.cowFarm);
    this.load.image('profile-event-farm', assets.eventFarm);
    this.load.image('profile-sticker', assets.sticker);
    this.load.image('profile-cow-farm-lock', assets.cowFarmLock);
    this.load.image('profile-lock-icon', assets.profileLockIcon);
    this.load.image('profile-event-island', assets.eventIsland);
    this.load.image('profile-fortune-bg', assets.fortuneBg);
    this.load.image('profile-fortune-wheel', assets.fortuneWheel);
    this.load.image('profile-fortune-pointer', assets.fortunePointer);
    this.load.image('profile-btn', assets.profileBtn);
    this.load.image('profile-pointer', assets.profilePointer);
    this.load.image('profile-social-btn-vk', assets.socialBtnVk);
    this.load.image('profile-social-btn-ok', assets.socialBtnOk);
    this.load.image('close-window-btn', assets.closeWindowBtn);
    this.load.image('clan-flagpole', assets.clanFlagpole);
    this.load.image('clan-building', assets.clanBuilding);
    if ((this.state.platform === 'vk' || this.state.platform === 'ok' || this.state.platform === 'ya') && this.state.avatar !== '') {
      this.load.image(`avatar-${this.state.user.id}`, this.state.avatar);
    }
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
    // this.createDebugZone();
  }

  public update(): void {
    this.updateEvent();
    this.updateUserDiamonds();
    this.updateShopNotification();
    this.updatePersonalMessagesNotification();
    this.updateClanNotification();
    this.updateClanFlagPole();
    this.updateFortunePull();
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
    const pos: Iposition = { x: 280, y: 70 };

    const avatarType = Number(this.state.user.avatar);
    const texture: string = isNaN(avatarType) ? `avatar-${this.state.user.id}` : `avatar-${avatarType}`;
    const checkTexture = this.textures.exists(texture);
    const maskSprite = this.add.sprite(pos.x, pos.y, 'avatar-0').setScale(0.8).setVisible(false);
    const mask = new Phaser.Display.Masks.BitmapMask(this, maskSprite);
    const avatar = this.add.sprite(pos.x, pos.y, texture).setMask(mask);
    if (!checkTexture) avatar.setTexture('avatar-0');
    const scaleX = maskSprite.displayWidth / avatar.displayWidth;
    const scaleY = maskSprite.displayHeight / avatar.displayHeight;
    avatar.setScale(scaleX, scaleY);

    const avatarGeom: Phaser.Geom.Rectangle = avatar.getBounds();
    const status: IstatusSettings = this.getStatusSettings(this.state.user.status);
    if (status) {
      this.game.scene.keys[this.state.farm].achievement.lazyLoading(this.state.user.status).then(() => {
        this.add.sprite(avatarGeom.right - 10, avatarGeom.top + 10, status.iconTexture).setScale(0.6).setVisible(status.iconVisible);
      });
    }
    let login = Utils.getUserName(this.state);
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

    const zone = this.add.zone(this.cameras.main.centerX + 10, 70, 320, 140).setDropZone(undefined, () => null);
    this.click(zone, (): void => {
      this.state.modal = { type: 15 };
      this.scene.launch('Modal', this.state);
    });
  }

  private createDebugZone(): void {
    let color = 0x000000;
    this.children.list.forEach(el => {
      if (el.type === 'Zone') {
        const zone = el as Phaser.GameObjects.Zone;
        this.createZoneGraphics(zone, color);
        color += 0x000050;
      }
    })
  }

  private createZoneGraphics(zone: Phaser.GameObjects.Zone, color: number): void {
    const { height, width } = zone.input.hitArea;
    const { x, y } = zone;
    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, color);
    graphics.strokeRect(x - width / 2, y - height / 2, width, height);
  }

  private createFarms(): void {
    this.createSheepFarm();
    this.createChickenFarm();
    this.createCowFarm();
    this.createFortuneWheel();
    if (this.state.progress.event.type === 1) {
      this.createUnicornFarm();
    }
    
  }

  private createSheepFarm(): void {
    const farmPosition: Iposition = { x: 150, y: 767 };
    const width: number = 300;
    const height: number = 240;
    
    const farmZone = this.add.zone(
      farmPosition.x,
      farmPosition.y,
      width,
      height
    ).setDropZone(undefined, () => {});
    const { part } = this.state.userSheep;
    const { max } = this.state.progress.sheep; 
    const progressText = `${part}/${max}`;
    this.add.text(
      farmPosition.x + 155,
      farmPosition.y + 38,
      progressText,
      progressTextStyle
    ).setOrigin(0.5);

    this.sheepNotificator = new Notificator(
      this,
      { x: farmPosition.x + 125, y: farmPosition.y - 85 },
      true,
    );

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
    if (this.state.userChicken.part > 0) {
      const farmSprite = this.add.sprite(
        farmPosition.x,
        farmPosition.y,
        'profile-chicken-farm'
      )
        .setOrigin(1, 0.5)
        .setDepth(1);
      const progressText: string = `${this.state.userChicken.part}/${this.state.progress.chicken.max}`;
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
        this.state.modal = {
          type: 1,
          sysType: 23,
        };
        this.scene.launch('Modal', this.state);
      });
    }
  }

  private createCowFarm(): void {
    const farmPosition: Iposition = { x: 0, y: 1020 };

    if (this.state.userCow.part > 0) {
      const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm').setOrigin(0, 0.5);

      const progressText: string = `${this.state.userCow.part}/${this.state.progress.cow.max}`;
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
    } else if (this.state.userChicken.part > 0) {
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
        this.state.modal = {
          type: 1,
          sysType: 23,
        };
        this.scene.launch('Modal', this.state);
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
    this.eventMapFarm = this.add.sprite(farmPosition.x, farmPosition.y - 15, 'profile-event-farm').setOrigin(1, 0.5).setVisible(false);
    this.eventZone = this.add.zone(570, 790, 300, 170).setDropZone(undefined, () => {});

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

  private createWheelAnim(wheel: Phaser.GameObjects.Sprite): void {
    wheel.setRotation(Phaser.Math.Between(0, 100) / 100 * Math.PI);
    this.tweens.add({
      targets: wheel,
      duration: 3500,
      rotation: { from: wheel.rotation, to: wheel.rotation - 6 * Math.PI },
      ease: 'Power3',
      repeat: -1,
      repeatDelay: 1000,
    });
  }

  private createFortuneWheel(): void {
    const OPENING_LEVEL = 8;
    const data = {
      name: Utils.getUserName(this.state),
      spending: 0,
      prize: 0,
      jackpot: false,
    }
    const pos = {
      x: 560,
      y: 560,
      width: 200,
      height: 170,
    };

    const bg = this.add.sprite(pos.x, pos.y, 'profile-fortune-bg');
    const wheel = this.add.sprite(pos.x + 31, pos.y - 10, 'profile-fortune-wheel');
    const pointer = this.add.sprite(pos.x + 32, pos.y - 10, 'profile-fortune-pointer');

    if (this.state.userSheep.part < OPENING_LEVEL || !this.checkAuthUser()) {
      bg.setTint(0xbbbbbb);
      wheel.setTint(0xbbbbbb).setAlpha(0.8);
      pointer.setTint(0xbbbbbb).setAlpha(0.8);
    } else {
      this.state.socket.io.emit('fortune-send', data);
      this.fortunePull = this.add.text(pos.x - 52, pos.y + 48, '', progressTextStyle).setOrigin(0.5);
      this.createWheelAnim(wheel);
    }

    const fortuneZone: Phaser.GameObjects.Zone = this.add.zone(
      pos.x, 
      pos.y, 
      pos.width, 
      pos.height,
    ).setDropZone(undefined, () => {});

    this.click(fortuneZone, (): void => {
      if (this.state.userSheep.part >= OPENING_LEVEL && this.checkAuthUser()) {
        this.scene.launch('Fortune', this.state);
      } else if (this.state.userSheep.part < OPENING_LEVEL) {
        this.state.modal = {
          type: 1,
          sysType: 3,
          message: this.state.lang.reachChapterOfSheepFarm.replace('$1', String(OPENING_LEVEL)),
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

    if (Utils.checkStarterpack(this.state) && this.state.user.takenFreeDiamonds) {

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
      x: 600,
      y: 360
    };
    const size: Isize = {
      width: 150,
      height: 230
    };
    const zone: Phaser.GameObjects.Zone = this.add.zone(pos.x, pos.y, size.width, size.height).setDepth(1).setDropZone(undefined, () => {});

    this.clanNotificator = new Notificator(this, { x: pos.x + 65, y: pos.y - 45 }, true).setCount(0);
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
      (this.state.userSheep.part > 4 ||
      this.state.userChicken.part >= 1 ||
      this.state.userCow.part >= 1) && 
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
      (this.state.userUnicorn?.tutorial > 0 &&
      this.state.progress.event.type === 1) &&
      this.state.progress.event.endTime > 0 && 
      (this.state.userSheep.part > 4 || 
      this.state.userChicken.part >= 1 || 
      this.state.userCow.part >= 1) && 
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
      (this.state.userUnicorn?.tutorial === 0 && 
      this.state.progress.event.type === 1) && 
      this.checkAuthUser() &&
      (this.state.userSheep.part > 4 || 
      this.state.userChicken.part >= 1 || 
      this.state.userCow.part >= 1) && 
      this.state.progress.event.endTime > 0 &&
      this.eventZone?.active
    ) {
      this.eventIsland?.setVisible(true);
      this.eventZone?.destroy();

    } else if (
      this.state.progress.event.endTime <= 0 &&
      this.state.progress.event.open &&
      this.checkAuthUser() &&
      (this.state.userSheep.part > 4 ||
      this.state.userChicken.part >= 1 ||
      this.state.userCow.part >= 1) 
      && !this.eventStartText?.visible
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
      this.state.userSheep.part <= 4 && 
      this.state.userChicken.part < 1 && 
      this.state.userCow.part < 1) || 
      !this.state.progress.event.open) && 
      this.eventZone?.active 
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
  }
  
  private createSocialTaskBtn(): void {
    const position: Iposition = { x: 70, y: 190 };
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
    if (this.state.clan) {
      const count = this.state.user.clanTasks.filter(el => el.done && !el.got_awarded).length;
      this.clanNotificator.setCount(count);
    }
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
    this.state.userChicken.part >= 1 || 
    this.state.userCow.part >= 1);
  }
  
  private updateClanFlagPole(): void {
    if (this.state.clan && !this.clanFlagPole) {
      const pos: Iposition = {
        x: 605,
        y: 375
      };
      this.clanFlagPole = new ClanFlagPole(this, { x: pos.x, y: pos.y - 100 }).setDepth(2);
    }
  }

  private updateFortunePull(): void {
    if (this.state.fortuneData && this.fortunePull) {
      if (String(this.state.fortuneData.pull) !== this.fortunePull.text) {
        this.fortunePull.setText(String(this.state.fortuneData.pull));
      }
    }
  }
}


export default Profile;
