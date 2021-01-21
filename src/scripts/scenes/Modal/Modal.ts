import {
  clickButton,
  clickModalBtn,
  clickShopBtn,
  shortNum
} from '../../general/basic';
import {
  systemWindow,
  chickenTerritory,
  sheepTerritory,
  resizeWindow
} from './system';
import {
  chickenFair,
  chicken,
  chickenPasture,
  chickenWater,
  boughtChickenLand,
  buyChickenTerritory,
  chickenConvertor,
  confirmChickenExchangeTerritory,
  chickenEggsRepository,
  confirmExpelChicken,
  chickenProfile,
  diamondChickenAd,
  improveCollectorChicken
} from './chicken';
import {
  sheepFair,
  sheep,
  sheepPasture,
  sheepWater,
  boughtSheepLand,
  buySheepTerritory,
  sheepConvertor,
  confirmSheepExchangeTerritory,
  sheepWoolRepository,
  confirmExpelSheep,
  sheepProfile,
  diamondSheepAd,
  improveCollectorSheep
} from './sheep';
import {
  tasks,
  tasksWindow,
  resizeTasksWindow
} from './tasks';
import daily from './daily';
import dailyNewbie from './dailyNewbie';
import nextChapter from './nextChapter';
import donate from './donate';
import { changeNickname, support } from '../../html';
import { bigButton, repositoryBtn, mergingCloud } from '../../elements';
  // буст "Стадо"
import {herdBoostWindow, getRandomSheep, getRandomChicken, getRandomStartPosition} from './herdBoost';

let partProgress: any = require("./../../../assets/images/modal/part-progress.png");
let newbieBg: any = require("./../../../assets/images/daily/newbie-bg.png");
let newbieDay0: any = require("./../../../assets/images/daily/newbie-day-0.png");
let newbieDay1: any = require("./../../../assets/images/daily/newbie-day-1.png");
let newbieDay2: any = require("./../../../assets/images/daily/newbie-day-2.png");
let newbieDay3: any = require("./../../../assets/images/daily/newbie-day-3.png");
let newbieDay4: any = require("./../../../assets/images/daily/newbie-day-4.png");
let newbieDay5: any = require("./../../../assets/images/daily/newbie-day-5.png");
let newbieDay6: any = require("./../../../assets/images/daily/newbie-day-6.png");
let newbieDay7: any = require("./../../../assets/images/daily/newbie-day-7.png");
let dayYellow: any = require("./../../../assets/images/daily/day-yellow.png");
let dayPurple: any = require("./../../../assets/images/daily/day-purple.png");
let dayRed: any = require("./../../../assets/images/daily/day-red.png");
let awardReceived: any = require("./../../../assets/images/daily/award-received.png");
let donateBg: any = require("./../../../assets/images/modal/donate.png");
let doneChapterButton: any = require("./../../../assets/images/modal/done-chapter-button.png");
let shopWindow: any = require("./../../../assets/images/modal/shop.png");
let dailyBg: any = require("./../../../assets/images/modal/daily-bg.png");
let middleButton: any = require("./../../../assets/images/modal/middle-button.png");
let awardBg: any = require("./../../../assets/images/icons/award-bg.png");
let achievementDaily: any = require("./../../../assets/images/modal/achievement-daily.png");
let flashDaily: any = require("./../../../assets/images/modal/flash-daily.png");
let doneChapter: any = require("./../../../assets/images/modal/done-chapter.png");
let pbChapterAnimal: any = require("./../../../assets/images/modal/pb-chapter-modal.png");
let greenProgress: any = require("./../../../assets/images/modal/green-progress.png");
let farmer: any = require("./../../../assets/images/farmer.png");
// let tasksWindowSide: any = require("./../../../assets/images/modal/tasks-window-side.png"); // old
// let tasksWindowBody: any = require("./../../../assets/images/modal/tasks-window-body.png"); // old
let tasksTop: any = require("./../../../assets/images/modal/tasks-top.png");
let tasksMiddle: any = require("./../../../assets/images/modal/tasks-middle.png");
let tasksBottom: any = require("./../../../assets/images/modal/tasks-bottom.png");
let tasksComplete: any = require("./../../../assets/images/modal/tasks-complete.png");
let tasksUncomplete: any = require("./../../../assets/images/modal/tasks-uncomplete.png");
let tasksReward: any = require("./../../../assets/images/modal/tasks-reward.png");
let tasksBar: any = require("./../../../assets/images/modal/tasks-bar.png");
let tasksClose: any = require("./../../../assets/images/modal/tasks-close.png");
let pbChapter: any = require("./../../../assets/images/modal/pb-chapter.png");
let bigButtonGrey: any = require("./../../../assets/images/modal/btn_l_lock.png");
let bigButtonBlue: any = require("./../../../assets/images/modal/btn_lb.png");
let bigButtonOrange: any = require("./../../../assets/images/modal/btn_lo.png");
let bigButtonRed: any = require("./../../../assets/images/modal/btn_lr.png");
let bigButtonYellow: any = require("./../../../assets/images/modal/btn_ly.png");
let repositorySellBtn: any = require("./../../../assets/images/modal/repository-sell-btn.png");
let herdBoostRoadSheep: any = require("./../../../assets/images/sheep/herd-boost-road-sheep.png");
let herdBoostRoadChicken: any = require("./../../../assets/images/chicken/herd-boost-road-chicken.png");
let badMergingAnimation: any = require("./../../../assets/images/bad-merging-animation.png");
let boostWindowBg: any = require("./../../../assets/images/boost/background.png");
let boostCountdown: any = require("./../../../assets/images/boost/countdown.png");
let boostLeaves: any = require("./../../../assets/images/boost/leaves.png");
let flags: any = require("./../../../assets/images/modal/flags.png");
let herdBoostSheepIcon: any = require("./../../../assets/images/icons/sheep-herd-boost.png");
let herdBoostChickenIcon: any = require("./../../../assets/images/icons/chicken-herd-boost.png");
class Modal extends Phaser.Scene {
  constructor() {
    super('Modal');
  }
  
  public state: Istate;
  public textHeader: Phaser.GameObjects.Text;
  public header: Phaser.GameObjects.Image;
  public close: Phaser.GameObjects.Sprite;
  public bottom: Phaser.GameObjects.Image;
  public body: Phaser.GameObjects.Image;
  public progressBar: Phaser.GameObjects.TileSprite;
  public progressText: Phaser.GameObjects.Text;
  public progressButton: any;
  public caveTimer: Phaser.GameObjects.Text;
  // буст "Стадо"
  public sheepForBoost: Phaser.Physics.Arcade.Group;
  public chickenForBoost: Phaser.Physics.Arcade.Group;
  public mergingArray: any[];

  public clickButton = clickButton.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public systemWindow = systemWindow.bind(this);
  public chicken = chicken.bind(this);
  public chickenTerritory = chickenTerritory.bind(this);
  public sheepTerritory = sheepTerritory.bind(this);
  public resizeWindow = resizeWindow.bind(this);
  public bigButton = bigButton.bind(this);
  public repositoryBtn = repositoryBtn.bind(this);
  public chickenFair = chickenFair.bind(this);
  public chickenPasture = chickenPasture.bind(this);
  public chickenWater = chickenWater.bind(this);
  public boughtChickenLand = boughtChickenLand.bind(this);
  public buyChickenTerritory = buyChickenTerritory.bind(this);
  public chickenConvertor = chickenConvertor.bind(this);
  public confirmChickenExchangeTerritory = confirmChickenExchangeTerritory.bind(this);
  public chickenEggsRepository = chickenEggsRepository.bind(this);
  public confirmExpelChicken = confirmExpelChicken.bind(this);
  public sheepFair = sheepFair.bind(this);
  public sheep = sheep.bind(this);
  public sheepPasture = sheepPasture.bind(this);
  public sheepWater = sheepWater.bind(this);
  public boughtSheepLand = boughtSheepLand.bind(this);
  public buySheepTerritory = buySheepTerritory.bind(this);
  public sheepConvertor = sheepConvertor.bind(this);
  public confirmSheepExchangeTerritory = confirmSheepExchangeTerritory.bind(this);
  public sheepWoolRepository = sheepWoolRepository.bind(this);
  public confirmExpelSheep = confirmExpelSheep.bind(this);
  public tasks = tasks.bind(this);
  public tasksWindow = tasksWindow.bind(this);
  public resizeTasksWindow = resizeTasksWindow.bind(this);
  public chickenProfile = chickenProfile.bind(this);
  public sheepProfile = sheepProfile.bind(this);
  public changeNickname = changeNickname.bind(this);
  public support = support.bind(this);
  public daily = daily.bind(this);
  public nextChapter = nextChapter.bind(this);
  public dailyNewbie = dailyNewbie.bind(this);
  public diamondSheepAd = diamondSheepAd.bind(this);
  public diamondChickenAd = diamondChickenAd.bind(this);
  public donate = donate.bind(this);
  public improveCollectorSheep = improveCollectorSheep.bind(this);
  public improveCollectorChicken = improveCollectorChicken.bind(this);
  // буст "Стадо"
  public herdBoostWindow = herdBoostWindow.bind(this);
  public getRandomSheep = getRandomSheep.bind(this);
  public getRandomChicken = getRandomChicken.bind(this);
  public getRandomStartPosition = getRandomStartPosition.bind(this);
  public mergingCloud = mergingCloud.bind(this);
  
  public init(state: Istate): void {
    this.state = state;
  }


  public preload(): void {
    
    this.load.image('part-progress', partProgress);
    this.load.image('donate', donateBg);
    this.load.image('done-chapter-button', doneChapterButton);
    this.load.image('shop-window', shopWindow);
    this.load.image('middle-button', middleButton);
    this.load.image('award-bg', awardBg);
    this.load.image('done-chapter', doneChapter);
    this.load.image('pb-chapter-modal', pbChapterAnimal);
    this.load.image('green-progress', greenProgress);
    // this.load.image('tasks-window-side', tasksWindowSide);
    // this.load.image('tasks-window-body', tasksWindowBody);
    this.load.image('tasks-top', tasksTop);
    this.load.image('tasks-middle', tasksMiddle);
    this.load.image('tasks-bottom', tasksBottom);
    this.load.image('tasks-complete', tasksComplete);
    this.load.image('tasks-uncomplete', tasksUncomplete);
    this.load.image('tasks-reward', tasksReward);
    this.load.image('tasks-bar', tasksBar);
    this.load.image('tasks-close', tasksClose);
    this.load.image('pb-chapter', pbChapter);
    this.load.image('big-btn-grey', bigButtonGrey);
    this.load.image('big-btn-blue', bigButtonBlue);
    this.load.image('big-btn-orange', bigButtonOrange);
    this.load.image('big-btn-red', bigButtonRed);
    this.load.image('big-btn-yellow', bigButtonYellow);
    this.load.image('repository-sell-btn', repositorySellBtn);
    
    if (this.state.newbieTime > 0) {
      this.load.image('newbie-bg', newbieBg);
      this.load.image('newbie-day-0', newbieDay0);
      this.load.image('newbie-day-1', newbieDay1);
      this.load.image('newbie-day-2', newbieDay2);
      this.load.image('newbie-day-3', newbieDay3);
      this.load.image('newbie-day-4', newbieDay4);
      this.load.image('newbie-day-5', newbieDay5);
      this.load.image('newbie-day-6', newbieDay6);
      this.load.image('newbie-day-7', newbieDay7);
      this.load.image('day-yellow', dayYellow);
      this.load.image('day-purple', dayPurple);
      this.load.image('day-red', dayRed);
      this.load.image('award-received', awardReceived);
    } else {
      this.load.image('daily-bg', dailyBg);
      this.load.image('achievement-daily', achievementDaily);
      this.load.image('flash-daily', flashDaily);
    }

    if (this.state.platform !== 'web') {
      this.load.image('avatar', this.state.avatar);
    } else {
      this.load.image('farmer', farmer);
    }

    // буст "стадо"
    if (this.state.farm === 'Sheep') this.load.image('herd-boost-road-sheep', herdBoostRoadSheep);
    if (this.state.farm === 'Chicken') this.load.image('herd-boost-road-chicken', herdBoostRoadChicken);
    this.load.image('bad-merging-animation', badMergingAnimation);
    this.load.image('boost-window-bg', boostWindowBg);
    this.load.image('boost-countdown', boostCountdown);
    this.load.image('boost-leaves', boostLeaves);
    this.load.image('flags', flags);
    this.load.image('sheep-herd-boost-icon', herdBoostSheepIcon);
    this.load.image('chicken-herd-boost-icon', herdBoostChickenIcon);
  }


  public create(): void {
    
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');

    this.add.tileSprite(0, 0,
      Number(this.game.config.width),
      Number(this.game.config.height),
      'modal'
    ).setOrigin(0).setInteractive();
      
    // тип окна
    switch (this.state.modal.type) {
      case 1: // системное окно
        this.systemWindow();
        break;
      case 2: // магазин
        this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'shop-window');
        this.scene.launch('Shop', this.state);
        break;
      case 3: // окно с заданиями
        this.tasks();
        break;
      case 4: // ежедневные награды
        this.daily();
        break;
      case 5: // следующая глава
        this.nextChapter();
        break;
      case 6: // ежедневные награды новичков
        this.dailyNewbie();
        break;
      case 7: // окно выдачи донатных кристаллов
        this.donate();
        break;
      case 8: // окно стадного буста
        this.herdBoostWindow();
        break;
      default:
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        break;
    }
    
  }


  public update(): void {
    
    // восстановление скролла
    if (this.game.scene.keys[this.state.farm].scrolling.wheel === true) {
      this.game.scene.keys[this.state.farm].scrolling.wheel = false;
    }
    
    // прогресс бар шерсти овец
    if (this.state.modal.type === 1 &&
      this.state.modal.sysType === 1 &&
      this.state.farm === 'Sheep') {

      let width: number = Math.round(444 / 100 * (this.state.animal.wool / 10));
      
      if (width === 440) width = 444;

      if (this.progressBar.displayWidth !== width) {
        this.progressBar.setDisplaySize(width, 16);
      }

      if (this.state.animal.wool === 1000 && this.progressButton.btn.texture.key === 'big-btn-grey') {

        this.progressButton.btn.setTexture('big-btn-green');
        this.progressButton.title.setColor('#FFFFFF');
        this.progressButton.text1.setColor('#FFFFFF');
        
      }

    }

    // прогресс бар яйца курицы
    if (this.state.modal.type === 1 &&
      this.state.modal.sysType === 1 &&
      this.state.farm === 'Chicken') {

      let width: number = Math.round(444 / 100 * (this.state.animal.egg / 10));
      
      if (width === 440) width = 444;

      if (this.progressBar.displayWidth !== width) {
        this.progressBar.setDisplaySize(width, 16);
      }

    }

    // прогресс для хранилищ
    if (this.state.territory?.type === 5 && this.state.modal?.sysType === 2) {

      let max: number, count: string, percent: number = 0;

      if (this.state.farm === 'Sheep') {

        max = this.state.sheepSettings.territoriesSheepSettings.find((data: IterritoriesSheepSettings) => data.improve === this.state.territory.improve).woolStorage;
        count = this.state.lang.countWool;

      } else if (this.state.farm === 'Chicken') {

        max = this.state.chickenSettings.territoriesChickenSettings.find((data: IterritoriesChickenSettings) => data.improve === this.state.territory.improve).eggStorage;
        count = this.state.lang.countEggs;

      }

      if (this.state.territory.volume > 0) {
        percent = this.state.territory.volume / (max / 100);
      }
      
      let width: number = Math.round(444 / 100 * percent);

      if (this.progressBar.displayWidth !== width) {
        this.progressBar.setDisplaySize(width, 16);
      }

      if (this.progressButton.text1.text !== shortNum(this.state.territory.money)) {
        this.progressButton.text1.setText(shortNum(this.state.territory.money));
        this.progressButton.img1.x = 555 - this.progressButton.text1.displayWidth;
      }

      let volume: string = count + ': ' + this.state.territory.volume + ' / ' + max;
      if (this.progressText.text !== volume) this.progressText.setText(volume);
      
    }

  }


}

export default Modal;
