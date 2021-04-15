import { click, clickShopBtn, clickButton } from '../general/clicks';
import { shortNum, getEventRaiting, shortTime, loadingModal, getStatusSettings } from '../general/basic';
import { scoreEnding } from './Event/basic';

const background: string = require('./../../assets/images/profile/background.jpg');
const backButton: string = require('./../../assets/images/profile/back-button.png');
const farms: string = require('./../../assets/images/profile/farms.png');

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
  public eventCloud: Phaser.GameObjects.Sprite;
  public eventMapFarm: Phaser.GameObjects.Sprite;
  public eventStartText: Phaser.GameObjects.Text;
  public eventStartTime: Phaser.GameObjects.Text;
  public eventStartBg: Phaser.GameObjects.Graphics;
  public eventZone: Phaser.GameObjects.Zone;
  public backBtn: Phaser.GameObjects.Sprite;
  public avatar: Phaser.GameObjects.Sprite;
  public diamondsText: Phaser.GameObjects.Text;
  
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
    this.load.image('back-button', backButton);
    this.load.image('farms', farms);
  }


  public create(): void {
    if (this.state.progress.event.eventPoints >= 0 && this.state.progress.event.open) this.getEventRaiting(); // получаем новые рейтинги
    
    this.bg = this.add.sprite(0, 0, 'profile-bg')
      .setInteractive()
      .setOrigin(0, 0);

    this.createElements();
    this.setListeners();
  }

  private createElements(): void {
    this.backBtn = this.add.sprite(630, 80, 'back-button');

    this.createProfileInfo();
    this.createFarms();
    this.createShopZone();
  }

  private createProfileInfo(): void {
    const farmer: Phaser.GameObjects.Sprite = this.add.sprite(80, 75, 'farmer').setScale(0.45).setVisible(true);
    let avatar: Phaser.GameObjects.Sprite;
    if (this.state.platform === 'web') {
      avatar = farmer;
      avatar.setVisible(true);
    } else {
      avatar = this.add.sprite(farmer.x, farmer.y, 'avatar');
      avatar.setMask(new Phaser.Display.Masks.BitmapMask(this, farmer));
      if (avatar.texture.key === '__MISSING') {
        avatar = farmer;
        avatar.setVisible(true);
      }
    }
    const avatarGeom: Phaser.Geom.Rectangle = avatar.getBounds();
    const status: IstatusSettings = this.getStatusSettings(this.state.user.status);
    if (status) {
      this.add.sprite(avatarGeom.right - 15, avatarGeom.top + 15, status.iconTexture).setVisible(status.iconVisible);
    }
    
    const text: Phaser.GameObjects.Text = this.add.text(avatarGeom.right + 110, avatarGeom.centerY, this.state.user.login,  {
      font: '32px Shadow',
      color: '#FFFFFF',
      align: 'center',
      wordWrap: { width: 220 },
    }).setOrigin(0.5);
    if (!this.state.user.login) text.setText(this.state.lang.unknownFarmer);
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
    this.add.sprite(720, 750, 'farms').setOrigin(1, 0);
    this.createChickenFarm();
    this.createSheepFarm();
    this.createCowFarm();
    this.createEventFarm();
  }

  private createSheepFarm(): void {
    const farmPosition: Iposition = { x: 160, y: 740 };
    const zoneSize: Isize = { width: 320, height: 240 };
    this.add.text(farmPosition.x + 115, farmPosition.y + 90, `${this.state.progress.sheep.part}/${this.state.progress.sheep.max}`, {
      font: '20px Shadow',
      color: '#FBD0B9'
    }).setOrigin(0.5, 0.5).setStroke('#522007', 5);
    this.createFarmZone(farmPosition, 'Sheep', zoneSize);
  }
  
  private createChickenFarm(): void {
    const farmPosition: Iposition = { x: 580, y: 950 };
    const zoneSize: Isize = { width: 280, height: 280 };
    if (this.state.progress.chicken.open) {
      this.add.text(farmPosition.x - 75, farmPosition.y + 30, `${this.state.progress.chicken.part}/${this.state.progress.chicken.max}`, {
        font: '20px Shadow',
        color: '#FBD0B9'
      }).setOrigin(0.5, 0.5).setStroke('#522007', 5);
      this.createFarmZone(farmPosition, 'Chicken', zoneSize);
    } else {
      this.add.graphics({ x: farmPosition.x, y: farmPosition.y })
        .fillStyle(0x000000, 0.5)
        .fillRoundedRect(-100, 0, 200, 70, 8);

      const btn: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y + 35, 'map-btn');
      const title: Phaser.GameObjects.Text = this.add.text(btn.x + 15, btn.y - 5, shortNum(this.state.progress.chicken.price), {
        font: '22px Shadow',
        color: '#FBD0B9',
        wordWrap: { width: 165 }
      }).setOrigin(0.5, 0.5).setStroke('#1F530A', 5);

      const left: number = title.getBounds().left - 17;
      const img: Phaser.GameObjects.Sprite = this.add.sprite(left, title.y, 'sheepCoin').setScale(0.12);

      this.clickShopBtn({ btn: btn, title: title, img: img }, (): void => {
        console.log('Купил куриную ферму')
        this.game.scene.keys[this.state.farm].buyNextFarm();
        this.game.scene.keys[this.state.farm].scrolling.downHandler();
        this.game.scene.keys[this.state.farm].scrolling.enabled = true;
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
      });
    }
  }

  private createCowFarm(): void {
    const farmPosition: Iposition = { x: 160, y: 1000 };
    const zoneSize: Isize = { width: 320, height: 240 };

    if (this.state.progress.cow.open) {
      this.add.text(farmPosition.x + 115, farmPosition.y + 90, `${this.state.progress.cow.part}/${this.state.progress.cow.max}`, {
        font: '20px Shadow',
        color: '#FBD0B9'
      }).setOrigin(0.5, 0.5).setStroke('#522007', 5);
      this.add.text(farmPosition.x - 100, farmPosition.y, 'COW\nFARM', {font: '50px Shadow', color: 'white', align: 'center'}).setStroke('black', 6)
      this.createFarmZone(farmPosition, 'Cow', zoneSize);
    } else if (this.state.progress.chicken.part >= this.state.progress.cow.unlock){
      this.add.graphics({ x: farmPosition.x, y: farmPosition.y })
      .fillStyle(0x000000, 0.5)
      .fillRoundedRect(-100, 0, 200, 70, 8);
      const btn: Phaser.GameObjects.Sprite = this.add.sprite(farmPosition.x, farmPosition.y + 35, 'map-btn');
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
      this.add.text(farmPosition.x, farmPosition.y, `Уровень открытия ${this.state.progress.cow.unlock}`, {
        font: '22px Shadow',
        color: '#FFFFFF',
        wordWrap: { width: 165 },
        align: 'center'
      }).setOrigin(0.5);
    }
  }

  private createEventFarm(): void {
    // this.eventCloud = this.add.sprite(550, 750, 'map-cloud').setVisible(false);
    this.eventMapFarm = this.add.sprite(720, 730, 'map-event-farm').setOrigin(1, 0.5).setVisible(false);
    this.eventZone = this.add.zone(570, 790, 300, 170).setDropZone(undefined, () => {});

    this.add.graphics()
      .lineStyle(5, 0x00FFFF)
      .strokeRect(
        this.eventZone.x - this.eventZone.input.hitArea.width / 2,
        this.eventZone.y - this.eventZone.input.hitArea.height / 2,
        this.eventZone.width,
        this.eventZone.height
      );  

    this.eventScore = this.add.text(580, 675, '- ' + this.state.lang.eventScores, {
      fontSize: '21px',
      color: '#6e00c7',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setVisible(false);

    this.eventPlace = this.add.text(580, 720, '- ' + this.state.lang.eventPlace, {
      fontSize: '21px',
      color: '#f0e8ce',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setVisible(false);

    this.eventEndText = this.add.text(580, 740, this.state.lang.eventLastTime, {
      fontSize: '16px',
      color: '#530d8e',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setVisible(false);

    this.eventEndTime = this.add.text(580, 760, '-', {
      fontSize: '24px',
      color: '#cbff40',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setVisible(false);
    
    this.eventStartText = this.add.text(570, 740, this.state.lang.eventStart, {
      fontSize: '16px',
      color: '#ffe9e4',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setDepth(1).setVisible(false);

    this.eventStartTime = this.add.text(570, 760, '-', {
      fontSize: '21px',
      color: '#cbff40',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5).setDepth(1).setVisible(false);

    this.eventStartBg = this.add.graphics({
      fillStyle: {
        color: 0x3d1a11,
        alpha: 0.5
      },
    }).fillRoundedRect(this.eventStartText.getBounds().left - 25, this.eventStartText.getBounds().top - 10, this.eventStartText.width + 50, 60).setVisible(false);



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

  private createFarmZone(farmPosition: Iposition, farmName: string, zoneSize: Isize): void {
    const zone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y + 70, zoneSize.width, zoneSize.height).setDropZone(undefined, () => {});
      
    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0xFFFF00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    this.click(zone, (): void => {
      if (this.state.farm !== farmName) {
        this.game.scene.keys[this.state.farm].autosave();
        this.scene.stop();
        this.scene.stop(this.state.farm);
        this.scene.stop(this.state.farm + 'Bars');
        this.scene.start(farmName + 'Preload', this.state);
      } else {
        this.game.scene.keys[this.state.farm].scrolling.downHandler();
        this.game.scene.keys[this.state.farm].scrolling.enabled = true;
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
      }
    }, 8);
  }

  private setListeners(): void {
    this.clickButton(this.backBtn, () => {
      this.game.scene.keys[this.state.farm].scrolling.downHandler();
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
    });
  }

  private createShopZone(): void {
    const shopPosition: Iposition = {
      x: 290,
      y: 600
    }
    const zoneSize: Isize = {
      width: 170,
      height: 170
    }
    const zone: Phaser.GameObjects.Zone = this.add.zone(shopPosition.x, shopPosition.y, zoneSize.width, zoneSize.height).setDropZone(undefined, () => {});
      
    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0xFF0000);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    this.click(zone, (): void => {
      const modal: Imodal = {
        type: 2,
        shopType: this.state.modal?.shopType || 1
      }
      this.state.modal = modal;
      this.scene.stop();
      this.scene.launch('Modal', this.state);
    });
  }

  public update(): void {
    this.updateEvent();
  }

  private updateEvent(): void {
    
    if (this.state.progress.event.startTime > 0 && 
      this.state.progress.event.open && 
      this.state.user.additionalTutorial.eventTutorial === 0) {

        if (!this.eventCloud?.visible) {

        this.eventCloud?.setVisible(true);
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
      this.state.progress.event.endTime > 0) {

      if (!this.eventMapFarm?.visible) {

        this.eventCloud?.setVisible(false);
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
      this.eventCloud?.setVisible(true);
      this.eventZone?.destroy();

    } 
    
    if (this.state.progress.event.endTime <= 0 && this.state.progress.event.open) {
      this.eventCloud?.setVisible(true);
      this.eventStartText?.setVisible(true);
      this.eventStartText?.setY(750);
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
      this.eventCloud?.setVisible(true);
      this.eventStartText.setVisible(false);
      this.eventStartTime.setVisible(false);
      this.eventStartBg.setVisible(false);
      this.eventMapFarm.setVisible(false);
      this.eventPlace.setVisible(false);
      this.eventScore.setVisible(false);
      this.eventEndTime.setVisible(false);
      this.eventEndText.setVisible(false);
      this.eventZone?.destroy();
    }

    if (this.state.progress.event.updateRaitings) {
      let points: number = this.state.progress.event.eventPoints >= 0 ? this.state.progress.event.eventPoints : 0;

      this.eventScore.setText(points + ' ' + this.scoreEnding(points, this.state.lang));
      this.eventPlace.setText(this.state.progress.event.userEventRaiting.place + ' ' + this.state.lang.eventPlace);
      this.eventEndTime.setText(shortTime(this.state.progress.event.endTime, this.state.lang));
      this.state.progress.event.updateRaitings = false;
    }
    
  }

}

export default Profile;
