import { click, clickShopBtn, clickButton } from '../general/clicks';
import { shortNum, getEventRaiting, shortTime, loadingModal, getStatusSettings } from '../general/basic';
import { scoreEnding } from './Event/basic';

const background: string = require('./../../assets/images/profile/background.jpg');
const backButton: string = require('./../../assets/images/profile/back-button.png');
const sheepFarm: string = require('./../../assets/images/profile/sheep-farm.png');
const chickenFarm: string = require('./../../assets/images/profile/chicken-farm.png');
const cowFarm: string = require('./../../assets/images/profile/cow-farm.png');
const eventFarm: string = require('./../../assets/images/profile/event-farm.png');
const sticker: string = require('./../../assets/images/profile/sticker.png');
const cowFarmLock: string = require('./../../assets/images/profile/cow-farm-lock.png');
const profileLockIcon: string = require('./../../assets/images/icons/profile-lock-icon.png');
const eventIsland: string = require('./../../assets/images/profile/event-island.png');
const btn: string = require('./../../assets/images/profile/btn.png');
const pointer: string = require('./../../assets/images/profile/pointer.png');

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
    this.load.image('profile-lock-icon', profileLockIcon);
    this.load.image('profile-event-island', eventIsland);
    this.load.image('profile-btn', btn);
    this.load.image('profile-pointer', pointer);
  }


  public create(): void {
    if (this.state.progress.event.eventPoints >= 0 && this.state.progress.event.open) this.getEventRaiting(); // получаем новые рейтинги
    
    this.bg = this.add.sprite(0, 0, 'profile-bg')
      .setInteractive()
      .setOrigin(0, 0);

    this.createElements();
    this.setListeners();
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
    const farmer: Phaser.GameObjects.Sprite = this.add.sprite(80, 75, 'farmer').setScale(0.45).setVisible(true);
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
        avatar = farmer;
        avatar.setVisible(true);
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
    this.createChickenFarm();
    this.createSheepFarm();
    this.createLockedCowFarm();
    // this.createCowFarm();
    this.createEventFarm();
  }

  private createSheepFarm(): void {
    const farmPosition: Iposition = { x: 160, y: 810 };
    const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-sheep-farm');
    this.add.text(farmPosition.x + 110, farmPosition.y + 5, `${this.state.progress.sheep.part}/${this.state.progress.sheep.max}`, {
      font: '28px Shadow',
      color: '#ffe5d7'
    }).setOrigin(0.5, 0.5).setStroke('#522007', 5);
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
  
  private createChickenFarm(): void {
    const farmPosition: Iposition = { x: 720, y: 1025 };
    if (this.state.progress.chicken.open) {
      const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-chicken-farm').setOrigin(1, 0.5);
      this.add.text(farmPosition.x - 215, farmPosition.y - 25, `${this.state.progress.chicken.part}/${this.state.progress.chicken.max}`, {
        font: '28px Shadow',
        color: '#ffe5d7'
      }).setOrigin(0.5, 0.5).setStroke('#522007', 5);

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
      this.add.sprite(farmPosition.x, farmPosition.y, 'profile-chicken-farm').setOrigin(1, 0.5);
      this.add.sprite(farmPosition.x, farmPosition.y, 'profile-sticker').setOrigin(1, 0.5)
      const btn: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x - 125, farmPosition.y + 0, 'profile-btn');
      const title: Phaser.GameObjects.Text = this.add.text(btn.x + 15, btn.y - 5, shortNum(this.state.progress.chicken.price), {
        font: '22px Shadow',
        color: '#FBD0B9',
        wordWrap: { width: 165 }
      }).setOrigin(0.5, 0.5).setStroke('#1F530A', 5);

      const left: number = title.getBounds().left - 17;
      const img: Phaser.GameObjects.Sprite = this.add.sprite(left, title.y, 'sheepCoin').setScale(0.12);

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
    const farmPosition: Iposition = { x: 0, y: 1050 };

    if (this.state.progress.cow.open) {
      const farmSprite: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm').setOrigin(0, 0.5);

      this.add.text(farmPosition.x + 290, farmPosition.y + 5, `${this.state.progress.cow.part}/${this.state.progress.cow.max}`, {
        font: '28px Shadow',
        color: '#ffe5d7'
      }).setOrigin(0.5, 0.5).setStroke('#522007', 5);

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
    } else if (this.state.progress.chicken.part >= this.state.progress.cow.unlock){
      this.add.graphics({ x: farmPosition.x, y: farmPosition.y })
      .fillStyle(0x2b3d11, 0.5)
      .fillRoundedRect(-100, 0, 200, 70, 8);
      const btn: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y + 35, 'profile-btn');
      const title: Phaser.GameObjects.Text = this.add.text(btn.x + 15, btn.y - 5, shortNum(this.state.progress.cow.price), {
        font: '22px Shadow',
        color: '#FBD0B9',
        wordWrap: { width: 165 }
      }).setOrigin(0.5, 0.5).setStroke('#1F530A', 5);

      const left: number = title.getBounds().left - 17;
      const img: Phaser.GameObjects.Sprite = this.add.sprite(left, title.y, 'chickenCoin').setScale(0.12);

      this.clickShopBtn({ btn: btn, title: title, img: img }, (): void => {
        console.log('Купил коровью ферму')
        // this.game.scene.keys[this.state.farm].buyNextFarm();
        // this.game.scene.keys[this.state.farm].scrolling.downHandler();
        // this.game.scene.keys[this.state.farm].scrolling.enabled = true;
        // this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        // this.scene.stop();
      });
    } else {
      this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm-lock').setOrigin(0, 0.5);
      this.add.sprite(farmPosition.x + 150, farmPosition.y - 25, 'profile-lock-icon');
      this.add.text(farmPosition.x + 150, farmPosition.y + 30, `Уровень открытия ${this.state.progress.cow.unlock}`, {
        font: '22px Shadow',
        color: '#FFFFFF',
        wordWrap: { width: 165 },
        align: 'center'
      }).setOrigin(0.5);
    }
  }

  private createLockedCowFarm(): void {
    const farmPosition: Iposition = { x: 0, y: 1050 };
    this.add.sprite(farmPosition.x, farmPosition.y, 'profile-cow-farm-lock').setOrigin(0, 0.5);
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
    
    
  }

  private createEventFarm(): void {
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
      if (this.state.farm !== 'Event') {
  
        this.game.scene.keys[this.state.farm].autosave();
        this.scene.stop();
        this.scene.stop(this.state.farm);
        this.scene.stop(this.state.farm + 'Bars');
        this.scene.start('EventPreload', this.state);

      } else {

        this.game.scene.keys[this.state.farm].scrolling.downHandler();
        this.game.scene.keys[this.state.farm].scrolling.enabled = true;
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();

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
    } else if (this.state.farm === 'Event') {
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
        shopType: this.state.modal?.shopType || 1
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
      })
    }
  }

  private updateEvent(): void {
    
    if (this.state.progress.event.startTime > 0 && 
      this.state.progress.event.open && 
      this.state.user.additionalTutorial.eventTutorial === 0 && 
      (this.state.progress.sheep.part > 4 || 
      this.state.progress.chicken.part >= 1) && 
      (this.state.user.login || this.state.name)) {

        if (!this.eventStartText?.visible) {
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
      } 
    } else if (this.state.progress.event.startTime <= 0 && 
      this.state.progress.event.open && 
      this.state.user.additionalTutorial.eventTutorial > 0 &&
      this.state.progress.event.endTime > 0 && 
      (this.state.progress.sheep.part > 4 || 
      this.state.progress.chicken.part >= 1) && 
      (this.state.user.login || this.state.name)) {

      if (!this.eventMapFarm?.visible) {
        this.eventZone?.destroy();
        this.eventStartText?.setVisible(false);
        this.eventStartTime?.setVisible(false);
        this.eventStartBg?.setVisible(false);
        this.eventMapFarm?.setVisible(true);
        this.eventPlace?.setVisible(true);
        this.eventScore?.setVisible(true);
        this.eventEndTime?.setVisible(true);
        this.eventEndText?.setVisible(true);

      }   
    } else if (this.state.progress.event.startTime <= 0 && 
      this.state.progress.event.open && 
      this.state.user.additionalTutorial.eventTutorial === 0) {
      this.eventIsland?.setVisible(true);
      this.eventZone?.destroy();
    } 
    
    if (this.state.progress.event.endTime <= 0 && this.state.progress.event.open) {
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
    }

    if (!this.state.progress.event.open) {
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

    if (this.state.progress.event.updateRaitings) {
      const points: number = this.state.progress.event.eventPoints >= 0 ? this.state.progress.event.eventPoints : 0;

      this.eventScore.setText(points + ' ' + this.scoreEnding(points, this.state.lang));
      this.eventPlace.setText(this.state.progress.event.userEventRaiting.place + ' ' + this.state.lang.eventPlace);
      this.eventEndTime.setText(shortTime(this.state.progress.event.endTime, this.state.lang));
      this.state.progress.event.updateRaitings = false;
    }
    if (!this.state.user.login && !this.state.name) {
      this.eventZone?.destroy();
    }
  }
}

export default Profile;
