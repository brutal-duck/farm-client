import axios from 'axios';
import Socket from '../../Socket';
import loadSheep from '../../local/loadSheep';
import loadData from '../../general/loadData';
import { checkStorage, initAndroidStore, loadingScreen } from '../../general/basic';
import LocalStorage from './../../libs/LocalStorage';
import { clickShopBtn } from '../../general/clicks';
import ErrorWindow from './../../components/Web/ErrorWindow';
import Ads from './../../components/Utils/Ads';
import assets from '../../data/assets';
class SheepPreload extends Phaser.Scene {

  public lang: string; // индекс языка
  public state: Istate;
  public userReady: boolean;
  private serverError: boolean;
  public loadingReady: boolean;
  public socket: boolean;
  public loadTime: number;
  public startTime: number;

  public loadSheep = loadSheep.bind(this);
  public loadingScreen = loadingScreen.bind(this);
  public loadData = loadData.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public initAndroidStore = initAndroidStore.bind(this);

  constructor() {
    super('SheepPreload');
  }

  public init(state: Istate): void {
    this.state  = state;
    this.userReady = false;
    this.loadingReady = false;
    this.serverError = false;
    this.socket = false;
    this.loadUser();
    this.startTime = Math.round(new Date().getTime() / 1000);

    if (!this.state.socket) {
      this.socket = true;
      this.loadTime = Math.round(new Date().getTime() / 1000);
      this.state.socket = new Socket(this.state);
    }
    if (process.env.platform !== 'gd') {
      Ads.showInterstitialOnPreload(this.state, this);
    }
  }
  

  public preload(): void {
    this.loadingScreen('Sheep');
    this.load.image('diamond', assets.diamond);
    this.load.image('sheepCoin', assets.sheepCoin);
    this.load.image('bg', assets.bg);
    this.load.image('sheep-top', assets.sheepTop);
    this.load.image('sheep-bottom', assets.sheepBottom);
    this.load.image('topbar', assets.topbar);
    this.load.image('tabbar', assets.tabbar);
    this.load.image('sheep-buy-icon-1', assets.sheepBuyIcon1);
    this.load.image('sheep-buy-icon-2', assets.sheepBuyIcon2);
    this.load.image('sheep-buy-icon-3', assets.sheepBuyIcon3);
    this.load.image('sheep-buy-icon-4', assets.sheepBuyIcon4);
    this.load.image('sheep-buy-icon-5', assets.sheepBuyIcon5);
    this.load.image('sheep-buy-icon-6', assets.sheepBuyIcon6);
    this.load.image('sheep-buy-icon-7', assets.sheepBuyIcon7);
    this.load.image('sheep-buy-icon-8', assets.sheepBuyIcon8);
    this.load.image('sheep-buy-icon-9', assets.sheepBuyIcon9);
    this.load.image('sheep-buy-icon-10', assets.sheepBuyIcon10);
    this.load.image('sheep-buy-icon-11', assets.sheepBuyIcon11);
    this.load.image('sheep-buy-icon-12', assets.sheepBuyIcon12);
    this.load.image('wool-collector', assets.woolCollector);
    this.load.image('shop', assets.shop);
    this.load.image('map-icon', assets.mapIcon);
    this.load.image('sandwich', assets.sandwich);
    this.load.image('sandwich-close', assets.sandwichClose);
    this.load.image('profile', assets.profile);
    this.load.image('debug', assets.debug);
    this.load.image('chat', assets.chat);
    this.load.image('sheep-for-buying', assets.sheepForBuying);
    this.load.image('sheep-bought', assets.sheepBought);
    this.load.image('sheep-merging', assets.sheepMerging);
    this.load.image('sheep-tent', assets.sheepTent);
    this.load.image('sheep-house', assets.sheepHouse);
    this.load.image('sheep-ground', assets.sheepGround);
    this.load.image('sheep-repository', assets.sheepRepository);
    this.load.image('sheep-repository-1-1', assets.sheepRepository11);
    this.load.image('sheep-repository-1-2', assets.sheepRepository12);
    this.load.image('sheep-repository-1-3', assets.sheepRepository13);
    this.load.image('sheep-repository-1-4', assets.sheepRepository14);
    this.load.image('sheep-repository-2-1', assets.sheepRepository21);
    this.load.image('sheep-repository-2-2', assets.sheepRepository22);
    this.load.image('sheep-repository-2-3', assets.sheepRepository23);
    this.load.image('sheep-repository-2-4', assets.sheepRepository24);
    this.load.image('sheep-repository-3-1', assets.sheepRepository31);
    this.load.image('sheep-repository-3-2', assets.sheepRepository32);
    this.load.image('sheep-repository-3-3', assets.sheepRepository33);
    this.load.image('sheep-repository-3-4', assets.sheepRepository34);
    this.load.image('sheep-repository-4-1', assets.sheepRepository41);
    this.load.image('sheep-repository-4-2', assets.sheepRepository42);
    this.load.image('sheep-repository-4-3', assets.sheepRepository43);
    this.load.image('sheep-repository-4-4', assets.sheepRepository44);
    this.load.image('sheep-grass1-1', assets.sheepGrass11);
    this.load.image('sheep-grass1-2', assets.sheepGrass12);
    this.load.image('sheep-grass1-3', assets.sheepGrass13);
    this.load.image('sheep-grass1-4', assets.sheepGrass14);
    this.load.image('sheep-grass2-1', assets.sheepGrass21);
    this.load.image('sheep-grass2-2', assets.sheepGrass22);
    this.load.image('sheep-grass2-3', assets.sheepGrass23);
    this.load.image('sheep-grass2-4', assets.sheepGrass24);
    this.load.image('sheep-grass3-1', assets.sheepGrass31);
    this.load.image('sheep-grass3-2', assets.sheepGrass32);
    this.load.image('sheep-grass3-3', assets.sheepGrass33);
    this.load.image('sheep-grass3-4', assets.sheepGrass34);
    this.load.image('sheep-grass4-1', assets.sheepGrass41);
    this.load.image('sheep-grass4-2', assets.sheepGrass42);
    this.load.image('sheep-grass4-3', assets.sheepGrass43);
    this.load.image('sheep-grass4-4', assets.sheepGrass44);
    this.load.image('sheep-water1-1', assets.sheepWater11);
    this.load.image('sheep-water1-2', assets.sheepWater12);
    this.load.image('sheep-water1-3', assets.sheepWater13);
    this.load.image('sheep-water1-4', assets.sheepWater14);
    this.load.image('sheep-water2-1', assets.sheepWater21);
    this.load.image('sheep-water2-2', assets.sheepWater22);
    this.load.image('sheep-water2-3', assets.sheepWater23);
    this.load.image('sheep-water2-4', assets.sheepWater24);
    this.load.image('sheep-water3-1', assets.sheepWater31);
    this.load.image('sheep-water3-2', assets.sheepWater32);
    this.load.image('sheep-water3-3', assets.sheepWater33);
    this.load.image('sheep-water3-4', assets.sheepWater34);
    this.load.image('sheep-water4-1', assets.sheepWater41);
    this.load.image('sheep-water4-2', assets.sheepWater42);
    this.load.image('sheep-water4-3', assets.sheepWater43);
    this.load.image('sheep-water4-4', assets.sheepWater44);
    this.load.image('lock-territory', assets.lockTerritory);
    this.load.spritesheet('sheep0', assets.sheep0, { frameWidth: 121, frameHeight: 158 });
    this.load.spritesheet('sheep1', assets.sheep1, { frameWidth: 135, frameHeight: 128 });
    this.load.spritesheet('sheep2', assets.sheep2, { frameWidth: 135, frameHeight: 128 });
    this.load.spritesheet('sheep3', assets.sheep3, { frameWidth: 135, frameHeight: 132 });
    this.load.spritesheet('sheep4', assets.sheep4, { frameWidth: 135, frameHeight: 147 });
    this.load.spritesheet('sheep5', assets.sheep5, { frameWidth: 135, frameHeight: 130 });
    this.load.spritesheet('sheep6', assets.sheep6, { frameWidth: 135, frameHeight: 139 });
    this.load.spritesheet('sheep7', assets.sheep7, { frameWidth: 159, frameHeight: 126 });
    this.load.spritesheet('sheep8', assets.sheep8, { frameWidth: 138, frameHeight: 139 });
    this.load.spritesheet('sheep9', assets.sheep9, { frameWidth: 135, frameHeight: 131 });
    this.load.spritesheet('sheep10', assets.sheep10, { frameWidth: 146, frameHeight: 133 });
    this.load.spritesheet('sheep11', assets.sheep11, { frameWidth: 151, frameHeight: 125 });
    this.load.spritesheet('sheep12', assets.sheep12, { frameWidth: 136, frameHeight: 146 });
    this.load.image('sheep-wool1', assets.wool1);
    this.load.image('sheep-wool2', assets.wool2);
    this.load.image('sheep-wool3', assets.wool3);
    this.load.image('sheep-wool4', assets.wool4);
    this.load.image('sheep-wool5', assets.wool5);
    this.load.image('sheep-wool6', assets.wool6);
    this.load.image('sheep-wool7', assets.wool7);
    this.load.image('sheep-wool8', assets.wool8);
    this.load.image('sheep-wool9', assets.wool9);
    this.load.image('sheep-wool10', assets.wool10);
    this.load.image('sheep-wool11', assets.wool11);
    this.load.image('sheep-wool12', assets.wool12);
    this.load.image('merging-animation', assets.mergingAnimation);
    this.load.image('lock', assets.lock);
    this.load.image('disable-sheep', assets.disableSheep);
    this.load.image('sheep-house-sprite', assets.sheepHouseSprite)
    this.load.image('cave-disable', assets.caveDisalble);
    this.load.image('cave-ready', assets.caveReady);
    this.load.image('cave-wait', assets.caveWait);
    this.load.image('cave-timer', assets.caveTimer);
    this.load.image('sheep-forest-1', assets.sheepForest1);
    this.load.image('sheep-forest-2', assets.sheepForest2);
    this.load.image('sheep-forest-3', assets.sheepForest3);
    this.load.image('sheep-forest-4', assets.sheepForest4);
    this.load.image('sheep-forest-5', assets.sheepForest5);
    this.load.image('sheep-forest-6', assets.sheepForest6);
    this.load.image('sheep-forest-7', assets.sheepForest7);
    this.load.image('sheep-forest-8', assets.sheepForest8);
    this.load.image('star', assets.star);
    this.load.image('completed', assets.completed);
    this.load.image('little-button', assets.littleButton);
    this.load.image('little-button-disable', assets.littleButtonDisable);
    this.load.image('sheep-task-icon-1', assets.sheepTaskIcon1);
    this.load.image('sheep-task-icon-2', assets.sheepTaskIcon2);
    this.load.image('sheep-task-icon-3', assets.sheepTaskIcon3);
    this.load.image('sheep-task-icon-4', assets.sheepTaskIcon4);
    this.load.image('sheep-task-icon-5', assets.sheepTaskIcon5);
    this.load.image('sheep-task-icon-6', assets.sheepTaskIcon6);
    this.load.image('sheep-task-icon-7', assets.sheepTaskIcon7);
    this.load.image('sheep-task-icon-8', assets.sheepTaskIcon8);
    this.load.image('sheep-task-icon-9', assets.sheepTaskIcon9);
    this.load.image('sheep-task-icon-10', assets.sheepTaskIcon10);
    this.load.image('sheep-task-icon-11', assets.sheepTaskIcon11);
    this.load.image('sheep-task-icon-12', assets.sheepTaskIcon12);
    this.load.image('sheep-task-icon-13', assets.sheepTaskIcon13);
    this.load.image('sheep-task-icon-14', assets.sheepTaskIcon14);
    this.load.image('sheep-task-icon-15', assets.sheepTaskIcon15);
    this.load.image('sheep-task-icon-16', assets.sheepTaskIcon16);
    this.load.image('sheep-task-icon-17', assets.sheepTaskIcon17);
    this.load.image('sheep-task-icon-18', assets.sheepTaskIcon18);
    this.load.image('sheep-task-icon-19', assets.sheepTaskIcon19);
    this.load.image('sheep-task-icon-20', assets.sheepTaskIcon20);
    this.load.image('sheep-task-icon-21', assets.sheepTaskIcon21);
    this.load.image('sheep-task-icon-22', assets.sheepTaskIcon22);
    this.load.image('sheep-task-icon-23', assets.sheepTaskIcon23);
    this.load.image('sheep-task-icon-24', assets.sheepTaskIcon24);
    this.load.image('sheep-task-icon-25', assets.sheepTaskIcon25);
    this.load.image('sheep-task-icon-26', assets.sheepTaskIcon26);
    this.load.image('sheep-task-icon-27', assets.sheepTaskIcon27);
    this.load.image('sheep-task-icon-28', assets.sheepTaskIcon28);
    this.load.image('sheep-task-icon-29', assets.sheepTaskIcon29);
    this.load.image('sheep-task-icon-30', assets.sheepTaskIcon30);
    this.load.image('sheep-task-icon-31', assets.sheepTaskIcon31);
    this.load.image('sheep-task-icon-32', assets.sheepTaskIcon32);
    this.load.image('sheep-task-icon-33', assets.sheepTaskIcon33);
    this.load.image('sheep-task-icon-34', assets.sheepTaskIcon34);
    this.load.image('sheep-task-icon-38', assets.sheepTaskIcon38);
    this.load.image('sheep-task-icon-39', assets.sheepTaskIcon39);
    this.load.image('sheep-task-icon-40', assets.sheepTaskIcon40);
    this.load.image('plus', assets.plus);
    this.load.image('sheep-leaves', assets.sheepLeaves);
    this.load.image('green-balance-bg', assets.greenBalanceBg);
    this.load.image('red-balance-bg', assets.redBalanceBg);
    this.load.image('resource-enough', assets.resourceEnough);
    this.load.image('resource-problem', assets.resourceProblem);
    this.load.image('grass-balance', assets.grassBalance);
    this.load.image('water-balance', assets.waterBalance);
    this.load.image('sheep-left-0-1', assets.pixel);
    this.load.image('sheep-left-0-2', assets.sheepLeft_0_2);
    this.load.image('sheep-left-0-3', assets.sheepLeft_0_3);
    this.load.image('sheep-left-0-4', assets.sheepLeft_0_4);
    this.load.image('sheep-right-0-1', assets.pixel);
    this.load.image('sheep-right-0-2', assets.sheepRight_0_2);
    this.load.image('sheep-right-0-3', assets.sheepRight_0_3);
    this.load.image('sheep-right-0-4', assets.sheepRight_0_4);
    this.load.image('sheep-left-1-1', assets.sheepLeft_1_1);
    this.load.image('sheep-left-1-2', assets.sheepLeft_1_2);
    this.load.image('sheep-left-1-3', assets.sheepLeft_1_3);
    this.load.image('sheep-left-1-4', assets.sheepLeft_1_4);
    this.load.image('sheep-right-1-1', assets.sheepRight_1_1);
    this.load.image('sheep-right-1-2', assets.sheepRight_1_2);
    this.load.image('sheep-right-1-3', assets.sheepRight_1_3);
    this.load.image('sheep-right-1-4', assets.sheepRight_1_4);
    this.load.image('sheep-left-2-1', assets.sheepLeft_2_1);
    this.load.image('sheep-left-2-2', assets.sheepLeft_2_2);
    this.load.image('sheep-left-2-3', assets.sheepLeft_2_3);
    this.load.image('sheep-left-2-4', assets.sheepLeft_2_4);
    this.load.image('sheep-right-2-1', assets.sheepRight_2_1);
    this.load.image('sheep-right-2-2', assets.sheepRight_2_2);
    this.load.image('sheep-right-2-3', assets.sheepRight_2_3);
    this.load.image('sheep-right-2-4', assets.sheepRight_2_4);
    this.load.image('sheep-left-3-1', assets.sheepLeft_3_1);
    this.load.image('sheep-left-3-2', assets.sheepLeft_3_2);
    this.load.image('sheep-left-3-3', assets.sheepLeft_3_3);
    this.load.image('sheep-left-3-4', assets.sheepLeft_3_4);
    this.load.image('sheep-right-3-1', assets.sheepRight_3_1);
    this.load.image('sheep-right-3-2', assets.sheepRight_3_2);
    this.load.image('sheep-right-3-3', assets.sheepRight_3_3);
    this.load.image('sheep-right-3-4', assets.sheepRight_3_4);
    this.load.image('sheep-left-4-1', assets.sheepLeft_4_1);
    this.load.image('sheep-left-4-2', assets.sheepLeft_4_2);
    this.load.image('sheep-left-4-3', assets.sheepLeft_4_3);
    this.load.image('sheep-left-4-4', assets.sheepLeft_4_4);
    this.load.image('sheep-right-4-1', assets.sheepRight_4_1);
    this.load.image('sheep-right-4-2', assets.sheepRight_4_2);
    this.load.image('sheep-right-4-3', assets.sheepRight_4_3);
    this.load.image('sheep-right-4-4', assets.sheepRight_4_4);
    this.load.image('sheep-left-5-1', assets.sheepLeft_5_1);
    this.load.image('sheep-left-5-2', assets.sheepLeft_5_2);
    this.load.image('sheep-left-5-3', assets.sheepLeft_5_3);
    this.load.image('sheep-left-5-4', assets.sheepLeft_5_4);
    this.load.image('sheep-right-5-1', assets.sheepRight_5_1);
    this.load.image('sheep-right-5-2', assets.sheepRight_5_2);
    this.load.image('sheep-right-5-3', assets.sheepRight_5_3);
    this.load.image('sheep-right-5-4', assets.sheepRight_5_4);
    this.load.image('sheep-left-6-1', assets.sheepLeft_6_1);
    this.load.image('sheep-left-6-2', assets.sheepLeft_6_2);
    this.load.image('sheep-left-6-3', assets.sheepLeft_6_3);
    this.load.image('sheep-left-6-4', assets.sheepLeft_6_4);
    this.load.image('sheep-right-6-1', assets.sheepRight_6_1);
    this.load.image('sheep-right-6-2', assets.sheepRight_6_2);
    this.load.image('sheep-right-6-3', assets.sheepRight_6_3);
    this.load.image('sheep-right-6-4', assets.sheepRight_6_4);
    this.load.image('sheep-left-7-1', assets.sheepLeft_7_1);
    this.load.image('sheep-left-7-2', assets.sheepLeft_7_2);
    this.load.image('sheep-left-7-3', assets.sheepLeft_7_3);
    this.load.image('sheep-left-7-4', assets.sheepLeft_7_4);
    this.load.image('sheep-right-7-1', assets.sheepRight_7_1);
    this.load.image('sheep-right-7-2', assets.sheepRight_7_2);
    this.load.image('sheep-right-7-3', assets.sheepRight_7_3);
    this.load.image('sheep-right-7-4', assets.sheepRight_7_4);
    this.load.image('sheep-left-8-1', assets.sheepLeft_8_1);
    this.load.image('sheep-left-8-2', assets.sheepLeft_8_2);
    this.load.image('sheep-left-8-3', assets.sheepLeft_8_3);
    this.load.image('sheep-left-8-4', assets.sheepLeft_8_4);
    this.load.image('sheep-right-8-1', assets.sheepRight_8_1);
    this.load.image('sheep-right-8-2', assets.sheepRight_8_2);
    this.load.image('sheep-right-8-3', assets.sheepRight_8_3);
    this.load.image('sheep-right-8-4', assets.sheepRight_8_4);
    this.load.image('sheep-left-9-1', assets.sheepLeft_9_1);
    this.load.image('sheep-left-9-2', assets.sheepLeft_9_2);
    this.load.image('sheep-left-9-3', assets.sheepLeft_9_3);
    this.load.image('sheep-left-9-4', assets.sheepLeft_9_4);
    this.load.image('sheep-right-9-1', assets.sheepRight_9_1);
    this.load.image('sheep-right-9-2', assets.sheepRight_9_2);
    this.load.image('sheep-right-9-3', assets.sheepRight_9_3);
    this.load.image('sheep-right-9-4', assets.sheepRight_9_4);
    this.load.image('sheep-left-10-1', assets.sheepLeft_10_1);
    this.load.image('sheep-left-10-2', assets.sheepLeft_10_2);
    this.load.image('sheep-left-10-3', assets.sheepLeft_10_3);
    this.load.image('sheep-left-10-4', assets.sheepLeft_10_4);
    this.load.image('sheep-right-10-1', assets.sheepRight_10_1);
    this.load.image('sheep-right-10-2', assets.sheepRight_10_2);
    this.load.image('sheep-right-10-3', assets.sheepRight_10_3);
    this.load.image('sheep-right-10-4', assets.sheepRight_10_4);
    this.load.image('sheep-left-11-1', assets.sheepLeft_11_1);
    this.load.image('sheep-left-11-2', assets.sheepLeft_11_2);
    this.load.image('sheep-left-11-3', assets.sheepLeft_11_3);
    this.load.image('sheep-left-11-4', assets.sheepLeft_11_4);
    this.load.image('sheep-right-11-1', assets.sheepRight_11_1);
    this.load.image('sheep-right-11-2', assets.sheepRight_11_2);
    this.load.image('sheep-right-11-3', assets.sheepRight_11_3);
    this.load.image('sheep-right-11-4', assets.sheepRight_11_4);
    this.load.image('sheep-left-12-1', assets.sheepLeft_12_1);
    this.load.image('sheep-left-12-2', assets.sheepLeft_12_2);
    this.load.image('sheep-left-12-3', assets.sheepLeft_12_3);
    this.load.image('sheep-left-12-4', assets.sheepLeft_12_4);
    this.load.image('sheep-right-12-1', assets.sheepRight_12_1);
    this.load.image('sheep-right-12-2', assets.sheepRight_12_2);
    this.load.image('sheep-right-12-3', assets.sheepRight_12_3);
    this.load.image('sheep-right-12-4', assets.sheepRight_12_4);
    this.load.image('tail', assets.tail);
    this.load.image('pixel', assets.pixel);
    this.load.image('sheep-vertical-border', assets.sheepVerticalBorder);
    this.load.image('sheep-horizontal-border-1', assets.sheepHorizontalBorder1);
    this.load.image('sheep-horizontal-border-2', assets.sheepHorizontalBorder2);
    this.load.image('sheep-horizontal-border-3', assets.sheepHorizontalBorder3);
    this.load.image('tutor-merging', assets.tutorMerging);
    this.load.image('gift', assets.gift);
    this.load.image('shave-status', assets.shaveStatus);
    this.load.image('diamond-status', assets.diamondStatus);
    this.load.image('offline', assets.offline);
    this.load.image('hatchet', assets.hatchet);
    this.load.image('hammer', assets.hammer);
    this.load.image('arrow', assets.arrow);
    this.load.image('tutor-btn', assets.tutorBtn);
    this.load.image('сurrency-bg', assets.сurrencyBg);
    this.load.image('heart', assets.heart);
    this.load.image('not-enought-water', assets.notEnoughtWater);
    this.load.image('not-enought-grass', assets.notEnoughtGrass);
    this.load.image('calendar', assets.calendar);
    this.load.image('ad-icon', assets.adIcon);
    this.load.image('bg-ad', assets.bgAd);
    this.load.image('big-btn-green', assets.bigButtonGreen);
    this.load.image('stock-icon', assets.stockIcon);
    this.load.image('loading-spinner', assets.loadingSpinner);
    this.load.image('farmer', assets.farmer);
    this.load.image('white-pixel', assets.whitePixel);
    this.load.image('scroll-arrow', assets.scrollArrow);
    this.load.image('improve-collector', assets.improveCollector);
    this.load.image('task-award-bg', assets.tasksAwardBg);
    this.load.image('tasks-bar-ns', assets.tasksBarNs);
    this.load.image('tasks-bar-fix', assets.tasksBarNs);
    this.load.image('task-bar-top', assets.taskBarTop);
    this.load.image('task-bar-bot', assets.taskBarBot);
    this.load.image('task-bar-mid', assets.taskBarMid);
    this.load.image('notification-bg', assets.notificationBg);
    this.load.image('rounded-segment', assets.roundedBarSegment);
    this.load.image('circle-outline', assets.circleOutline);
    this.load.image('cooldown-plate', assets.cooldownPlate);
    this.load.image('text-sale', assets.textSale);
    this.load.image('icon-sale', assets.saleIcon);
    this.load.image('btn-clean', assets.btnClean);
    this.load.image('feed-sheep-balance', assets.feedSheepBalance);
    this.load.image('plate-feed', assets.plateFeed);
    this.load.image('cloud-info', assets.cloudInfo);
    this.load.image('green-balance-bg-big', assets.greenBalanceBgBig);
    this.load.image('red-balance-bg-big', assets.redBalanceBgBig);
  }
  
  public create(): void {
    this.loadingReady = true;
  }

  public update(): void {
    if (this.loadingReady && this.userReady && !this.serverError) {
      if (this.socket) {
        let loadTime: number = Math.round(new Date().getTime() / 1000) - this.loadTime;
        let sizes = document.body.clientWidth + ' * ' + document.body.clientHeight;

        this.state.socket.io.emit('updateSession', {
          user_id: this.state.user.id,
          hash: this.state.user.hash,
          screen_size: sizes,
          loadTime: loadTime
        });
        
        if (this.state.user.clanId) {
          this.state.socket.io.emit('joinClanRoom', {
            clanId: this.state.user.clanId,
          });
        }
        
        console.log(`Test - ${this.state.user.test}`);
        // подрубаем амплитуду
        const Amplitude = this.state.amplitude;
        Amplitude.setFarmIdentify();

        if (this.state.platform === 'android') this.initAndroidStore();
      }

      this.userReady = false;
      this.loadingReady = false;

      // считаем общее время отсутсвия
      this.startTime = Math.round(new Date().getTime() / 1000) - this.startTime;
      this.state.offlineTime += this.startTime;
      
      this.scene.stop();
      this.scene.start('Sheep', this.state); // сцена с овцами
      this.scene.start('SheepBars', this.state); // сцена с барами
      this.scene.start('Preload', this.state); // сцена с подзагрузкой
    } else if (this.loadingReady && this.serverError) {
      this.loadingReady = false;
      this.serverError = false;
      this.children.destroy();
      new ErrorWindow(this, this.state.lang.checkYourInternet);
    }
  }
  
  public loadUser(): void {
    if (!this.state.dataIsLoaded) {
      axios.post(process.env.API + '/loadData', {
        hash: this.state.user.hash
      }).then((response) => {
        this.state.dataIsLoaded = true;
        this.loadData(response);
        this.state.offlineTime = response.data.progress.sheepOfflineTime;
        const Amplitude = this.state.amplitude;
        if (response.data.user.tutor === 0) Amplitude.logAmplitudeEvent('tutor_before_load', {});
        this.userReady = true;
      }).catch(() => {
        this.serverError = true;
      });
    } else {
      this.userReady = true;
    }
    this.state.shopNotificationCount = [0, 0, 0, 0];
    this.state.farm = 'Sheep';
    LocalStorage.set('farm', 'Sheep');
  }
}

export default SheepPreload;
