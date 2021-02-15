import Scrolling from '../libs/Scrolling';
import { click, shortNum, clickShopBtn } from '../general/basic';

let sheepCoin: any = require("./../../assets/images/sheep/icons/money.png");
let chickenCoin: any = require("./../../assets/images/chicken/icons/money.png");
let back: any = require("./../../assets/images/icons/back.png");
let map: any = require("./../../assets/images/map.png");
let mapLockIcon: any = require("./../../assets/images/icons/map-lock-icon.png");
let mapChickenIcon: any = require("./../../assets/images/icons/map-chicken-icon.png");
let mapSheepIcon: any = require("./../../assets/images/icons/map-sheep-icon.png");
let pointMap: any = require("./../../assets/images/icons/point-map.png");
let pbChapterMap: any = require("./../../assets/images/modal/pb-chapter-map.png");
let partProgress: any = require("./../../assets/images/modal/part-progress.png");
let mapBtn: any = require("./../../assets/images/modal/map-btn.png");

class Map extends Phaser.Scene {
  constructor() {
    super('Map');
  }
  
  public state: Istate;
  public height: number = 1769;
  public bg: Phaser.GameObjects.TileSprite;
  public scrolling: Scrolling;
  public point: Phaser.GameObjects.Sprite;
  public pointPosition: Iposition;
  public pointAnimation: number;

  public click = click.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  

  public init(state: Istate): void {

    this.state = state;
    this.pointAnimation = 0;

  }


  public preload(): void {

    this.load.image('sheepCoin', sheepCoin);
    this.load.image('chickenCoin', chickenCoin);
    this.load.image('back', back);
    this.load.image('map', map);
    this.load.image('map-lock-icon', mapLockIcon);
    this.load.image('map-sheep-icon', mapSheepIcon);
    this.load.image('map-chicken-icon', mapChickenIcon);
    this.load.image('point-map', pointMap);
    this.load.image('pb-chapter-map', pbChapterMap);
    this.load.image('part-progress', partProgress);
    this.load.image('map-btn', mapBtn);

  }


  public create(): void {

    this.scene.launch('MapBars', this.state);
    
    this.bg = this.add.tileSprite(0, 0, 720, this.height, 'map')
      .setInteractive()
      .setOrigin(0, 0);

    let cameraOptions = {
      wheel: true,
      bottom: this.height
    };
    this.scrolling = new Scrolling(this, cameraOptions);
    this.input.on('pointerup', (): void => {
      this.scrolling.enabled = true;
      this.scrolling.wheel = true;
    });

    this.point = this.add.sprite(0, 0, 'point-map').setOrigin(0.5, 1);
    
    let sheepPosition: Iposition = { x: 155, y: 145 };
    let chickenPosition: Iposition = { x: 500, y: 270 };
    let eventPosition: Iposition = { x: 520, y: 700 };

    if (this.state.farm === 'Sheep') {
      this.pointPosition = sheepPosition;
    } else if (this.state.farm === 'Chicken') {
      this.pointPosition = chickenPosition;
    } else if (this.state.farm === 'Event') {
      this.pointPosition = eventPosition;
    }

    this.point.x = this.pointPosition.x;
    this.point.y = this.pointPosition.y;

    this.build(sheepPosition, 'Sheep', this.state.progress.sheep);

    this.state.progress.chicken.unlock = 1; // костыль для покупки куриной фермы
    this.build(chickenPosition,'Chicken', this.state.progress.chicken);
    
    // Евентовая ферма на карте
    let eventIcon: Phaser.GameObjects.Graphics = this.add.graphics();
    eventIcon.fillStyle(0xff0000, 1.0)
      .fillCircle(520, 740, 50);
    let eventText: Phaser.GameObjects.Text = this.add.text(520, 740, 'Нажми!', {
      fontSize: '40px',
      color: '#000',
      fontFamily: 'Shadow'
    }).setOrigin(0.5, 0.5);
    this.click(eventText, (): void => {
      console.log('click')
      this.game.scene.keys[this.state.farm].autosave();
      this.scene.stop();
      this.scene.stop('MapBars');
      this.scene.stop(this.state.farm);
      this.scene.stop(this.state.farm + 'Bars');
      this.scene.start('EventPreload', this.state);
    });
  }


  public update(): void {

    this.pointAnimation++;

    if (this.pointAnimation < 20) this.point.y--;
    else if (this.pointAnimation >= 20) this.point.y++;

    if (this.pointAnimation >= 38) {

      this.pointAnimation = 0;
      this.point.x = this.pointPosition.x;
      this.point.y = this.pointPosition.y;

    }

  }


  // строим информацию о фермах
  public build(position: Iposition, farm: string, progress: IpartProgress): void {

    // 1 - открыта
    // 2 - купить
    // 3 - закрыто

    let status: number;

    if (progress.open) {

      status = 1;

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
          this.scene.stop('MapBars');
          this.scene.stop(this.state.farm);
          this.scene.stop(this.state.farm + 'Bars');
          this.scene.start(farm + 'Preload', this.state);
  
        } else {
  
          this.game.scene.keys[this.state.farm].scrolling.downHandler();
          this.game.scene.keys[this.state.farm].scrolling.enabled = true;
          this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          this.scene.stop('MapBars');
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
        this.scene.stop('MapBars');
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

export default Map;
