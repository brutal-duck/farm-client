import { click, clickShopBtn, clickButton } from '../general/clicks';
import { shortNum, getEventRaiting, shortTime, loadingModal, getStatusSettings } from '../general/basic';
import { scoreEnding } from './Event/basic';

const sheepCoin: string = require("./../../assets/images/sheep/icons/money.png");
const chickenCoin: string = require("./../../assets/images/chicken/icons/money.png");
const back: string = require("./../../assets/images/icons/back.png");
const map: string = require("./../../assets/images/map.png");
const mapLockIcon: string = require("./../../assets/images/icons/map-lock-icon.png");
const mapChickenIcon: string = require("./../../assets/images/icons/map-chicken-icon.png");
const mapSheepIcon: string = require("./../../assets/images/icons/map-sheep-icon.png");
const pointMap: string = require("./../../assets/images/icons/point-map.png");
const pbChapterMap: string = require("./../../assets/images/modal/pb-chapter-map.png");
const partProgress: string = require("./../../assets/images/modal/part-progress.png");
const mapBtn: string = require("./../../assets/images/modal/map-btn.png");
const mapCloud: string = require("./../../assets/images/event/map-cloud.png");
const mapEventFarm: string = require("./../../assets/images/event/map-event-farm.png");
const mapEventIsland: string = require("./../../assets/images/event/map-event-island.png");

const background: string = require('./../../assets/images/profile/background.jpg');
const backButton: string = require('./../../assets/images/profile/back-button.png');

class Profile extends Phaser.Scene {
  constructor() {
    super('Profile');
  }
  
  public state: Istate;
  public bg: Phaser.GameObjects.Sprite;
  public point: Phaser.GameObjects.Sprite;
  public pointPosition: Iposition;
  public pointAnimation: number;
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
    this.pointAnimation = 0;
  }


  public preload(): void {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');
    this.loadingModal();
    
    this.load.image('sheepCoin', sheepCoin);
    this.load.image('chickenCoin', chickenCoin);
    this.load.image('back', back);
    this.load.image('map-lock-icon', mapLockIcon);
    this.load.image('map-sheep-icon', mapSheepIcon);
    this.load.image('map-chicken-icon', mapChickenIcon);
    this.load.image('point-map', pointMap);
    this.load.image('pb-chapter-map', pbChapterMap);
    this.load.image('part-progress', partProgress);
    this.load.image('map-btn', mapBtn);
    this.load.image('map-cloud', mapCloud);
    this.load.image('map-event-farm', mapEventFarm);
    this.load.image('map-event-island', mapEventIsland);

    this.load.image('profile-bg', background);
    this.load.image('back-button', backButton);

  }


  public create(): void {

    if (this.state.progress.event.eventPoints >= 0 && this.state.progress.event.open) this.getEventRaiting(); // получаем новые рейтинги
    
    this.bg = this.add.sprite(0, 0, 'profile-bg')
      .setInteractive()
      .setOrigin(0, 0);

    this.backBtn = this.add.sprite(630, 80, 'back-button');
    this.createElements();














    this.point = this.add.sprite(0, 0, 'point-map').setOrigin(0.5, 1).setDepth(100).setVisible(false);
    
    let sheepPosition: Iposition = { x: 155, y: 145 };
    let chickenPosition: Iposition = { x: 500, y: 270 };
    let eventPosition: Iposition = { x: 580, y: 650 };
    let cowPosition: Iposition = { x: 100, y: 650 };

    if (this.state.farm === 'Sheep') {
      this.pointPosition = sheepPosition;
    } else if (this.state.farm === 'Chicken') {
      this.pointPosition = chickenPosition;
    } else if (this.state.farm === 'Event') {
      this.pointPosition = eventPosition;
    } else if (this.state.farm === 'Cow') {
      this.pointPosition = cowPosition;
    }

    this.point.x = this.pointPosition.x;
    this.point.y = this.pointPosition.y;

    this.build(sheepPosition, 'Sheep', this.state.progress.sheep);

    this.state.progress.chicken.unlock = 1; // костыль для покупки куриной фермы
    this.build(chickenPosition,'Chicken', this.state.progress.chicken);
    
    // Евентовая ферма на карте
    this.buildEvent();
    this.cowFarm();

    this.createPointerAnim();
    this.setListeners();
  }

  private createPointerAnim(): void {
    this.tweens.add({
      targets: this.point,
      y: `-=20`,
      yoyo: true,
      repeat: -1,
      duration: 250
    });
  }


  private createElements(): void {
    this.createProfileInfo();

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



  private setListeners(): void {
    this.clickButton(this.backBtn, () => {
      this.game.scene.keys[this.state.farm].scrolling.downHandler();
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
    });
  }

  
  public update(): void {
    this.updateEvent();
  }


  // строим информацию о фермах
  public build(position: Iposition, farm: string, progress: IpartProgress): void {

    // 1 - открыта
    // 2 - купить
    // 3 - закрыто

    let status: number;

    if (progress.open) {
      status = 1;
      if (farm === 'Chicken') this.state.dailyAwards[3] = false
    } else {
      let previousPart: number = this.previousPartAndCoin(farm).part;
      if (previousPart >= progress.unlock) {
        status = 2;
      } else {
        status = 3;
      }
    }

    if (status === 1 || status === 2) {
      this.add.sprite(position.x - 79, position.y + 52, 'map-' + farm.toLowerCase() + '-icon');
    } else {
      this.add.sprite(position.x - 79, position.y + 52, 'map-lock-icon');
    }

    if (status === 1) {
      
      let tileX: number = position.x - 34;
      let percent: number = Math.round(100 / progress.max *  progress.part * (275 / 100));
      this.add.sprite(position.x + 35, position.y + 28, 'pb-chapter-map')
        .setOrigin(0.5, 0);
      this.add.tileSprite(tileX, position.y + 34, percent, 16, 'part-progress')
        .setOrigin(0, 0)
        .setScale(0.5);

      this.add.text(position.x - 39, position.y + 70, this.state.lang.part + ' ' + progress.part + ' / ' + progress.max, {
        font: '22px Shadow',
        color: '#FBD0B9'
      }).setOrigin(0, 0.5).setStroke('#522007', 5);

      let zone: Phaser.GameObjects.Zone = this.add.zone(position.x, position.y + 70, 280, 140).setDropZone(undefined, () => {});
    
      // let graphics: Phaser.GameObjects.Graphics = this.add.graphics();
      // graphics.lineStyle(2, 0xFFFF00);
      // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
  
      this.click(zone, (): void => {
  
        if (this.state.farm !== farm) {
          this.game.scene.keys[this.state.farm].autosave();
          this.scene.stop();
          this.scene.stop(this.state.farm);
          this.scene.stop(this.state.farm + 'Bars');
          this.scene.start(farm + 'Preload', this.state);
        } else {
          this.game.scene.keys[this.state.farm].scrolling.downHandler();
          this.game.scene.keys[this.state.farm].scrolling.enabled = true;
          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.scene.stop();
        }
  
      }, 8);

    } else if (status === 2) {

      let count: string = String(shortNum(progress.price));
      let icon: string;
      
      if (progress.donate) icon = 'diamond';
      else icon = this.previousPartAndCoin(farm).coin;

      let btn: Phaser.GameObjects.Sprite = this.add.sprite(position.x + 35, position.y + 55, 'map-btn');
      let title: Phaser.GameObjects.Text = this.add.text(position.x + 47, position.y + 52, count, {
        font: '22px Shadow',
        color: '#FBD0B9',
        wordWrap: { width: 165 }
      }).setOrigin(0.5, 0.5).setStroke('#1F530A', 5);

      let left: number = title.getBounds().left - 17;
      let img: Phaser.GameObjects.Sprite = this.add.sprite(left, position.y + 52, icon).setScale(0.12);

      this.clickShopBtn({ btn: btn, title: title, img: img }, (): void => {
        
        this.game.scene.keys[this.state.farm].buyNextFarm();
        this.game.scene.keys[this.state.farm].scrolling.downHandler();
        this.game.scene.keys[this.state.farm].scrolling.enabled = true;
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
      });

    } else if (status === 3) {

      let text: string = this.state.lang.openFarm.replace('$1', progress.unlock);

      this.add.text(position.x + 35, position.y + 55, text, {
        font: '18px Shadow',
        color: '#FBD0B9',
        wordWrap: { width: 165 }
      }).setOrigin(0.5, 0.5).setStroke('#522007', 5);
    }
  }

  public cowFarm(): void {

    this.add.text(160, 540, 'COW\nFARM', {font: '50px Shadow', color: 'white', align: 'center'}).setStroke('black', 6)

    let zone: Phaser.GameObjects.Zone = this.add.zone(180, 600, 280, 140).setDropZone(undefined, () => {});
    
    let graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(2, 0xFFFF00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
  
    this.click(zone, (): void => {

      if (this.state.farm !== 'Cow') {
        this.scene.stop();
        this.scene.stop(this.state.farm);
        this.scene.stop(this.state.farm + 'Bars');
        this.scene.start('CowPreload', this.state)
        localStorage.farm = 'Cow'
      }
    });
  }

  public buildEvent(): void {
    this.eventCloud = this.add.sprite(550, 750, 'map-cloud').setVisible(false);
    this.eventMapFarm = this.add.sprite(720, 730, 'map-event-farm').setOrigin(1, 0.5).setVisible(false);
    this.eventZone = this.add.zone(570, 720, 220, 160).setDropZone(undefined, () => {});

    // this.add.graphics({
    //   fillStyle: {
    //     color: 0xffffff,
    //     alpha: 0.6
    //   },
    // }).fillRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.width, zone.height);

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
  };

  public updateEvent(): void {
    
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
      this.eventCloud.setVisible(true);
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

  // предыдущая глава
  public previousPartAndCoin(farm: string): { part: number, coin: string } {

    let part: number;
    let coin: string;

    switch(farm) {
      case 'Sheep':
        part = 0;
        break;
      case 'Chicken':
        part = this.state.progress.sheep.part;
        coin = 'sheepCoin';
        break;
    }

    return {
      part: part,
      coin: coin
    }

  }

}

export default Profile;
