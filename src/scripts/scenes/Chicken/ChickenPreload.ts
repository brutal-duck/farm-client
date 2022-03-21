import axios from 'axios';
import Socket from '../../Socket';
import loadChicken from '../../local/loadChicken';
import loadData from '../../general/loadData';
import { checkStorage, initAndroidStore, loadingScreen,  } from '../../general/basic';
import LocalStorage from './../../libs/LocalStorage';
import { clickShopBtn } from '../../general/clicks';
import { general } from '../../local/settings';
import ErrorWindow from './../../components/Web/ErrorWindow';
import Ads from './../../components/Utils/Ads';
import assets from '../../data/assets';

class ChickenPreload extends Phaser.Scene {

  public lang: string; // индекс языка
  public state: Istate;
  public userReady: boolean;
  public loadingReady: boolean;
  public socket: boolean;
  public loadTime: number;
  public startTime: number;
  private serverError: boolean;

  public loadChicken = loadChicken.bind(this);
  public loadingScreen = loadingScreen.bind(this);
  public loadData = loadData.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public initAndroidStore = initAndroidStore.bind(this);

  constructor() {
    super('ChickenPreload');
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
    Ads.showInterstitialOnPreload(this.state, this);
  }
  
  public preload(): void {
    this.loadingScreen('Chicken');
    this.load.image('diamond', assets.diamond);
    this.load.image('chickenCoin', assets.chickenCoin);
    this.load.image('bg', assets.bg);
    this.load.image('chicken-top', assets.chickenTop);
    this.load.image('chicken-bottom', assets.chickenBottom);
    this.load.image('topbar', assets.topbar);
    this.load.image('tabbar', assets.tabbar);
    this.load.image('chicken-buy-icon-1', assets.chickenBuyIcon1);
    this.load.image('chicken-buy-icon-2', assets.chickenBuyIcon2);
    this.load.image('chicken-buy-icon-3', assets.chickenBuyIcon3);
    this.load.image('chicken-buy-icon-4', assets.chickenBuyIcon4);
    this.load.image('chicken-buy-icon-5', assets.chickenBuyIcon5);
    this.load.image('chicken-buy-icon-6', assets.chickenBuyIcon6);
    this.load.image('chicken-buy-icon-7', assets.chickenBuyIcon7);
    this.load.image('chicken-buy-icon-8', assets.chickenBuyIcon8);
    this.load.image('chicken-buy-icon-9', assets.chickenBuyIcon9);
    this.load.image('chicken-buy-icon-10', assets.chickenBuyIcon10);
    this.load.image('chicken-buy-icon-11', assets.chickenBuyIcon11);
    this.load.image('chicken-buy-icon-12', assets.chickenBuyIcon12);
    this.load.image('egg-collector', assets.eggCollector);
    this.load.image('shop', assets.shop);
    this.load.image('map-icon', assets.mapIcon);
    this.load.image('sandwich', assets.sandwich);
    this.load.image('sandwich-close', assets.sandwichClose);
    this.load.image('profile', assets.profile);
    this.load.image('debug', assets.debug);
    this.load.image('chat', assets.chat);
    this.load.image('chicken-for-buying', assets.chickenForBuying);
    this.load.image('chicken-bought', assets.chickenBought);
    this.load.image('chicken-merging', assets.chickenMerging);
    this.load.image('chicken-tent', assets.chickenTent);
    this.load.image('chicken-house', assets.chickenHouse);
    this.load.image('chicken-ground', assets.chickenGround);
    this.load.image('chicken-repository', assets.chickenRepository);
    this.load.image('chicken-repository-1-1', assets.chickenRepository11);
    this.load.image('chicken-repository-2-1', assets.chickenRepository21);
    this.load.image('chicken-repository-3-1', assets.chickenRepository31);
    this.load.image('chicken-repository-4-1', assets.chickenRepository41);
    this.load.image('chicken-repository-1-2', assets.chickenRepository12);
    this.load.image('chicken-repository-2-2', assets.chickenRepository22);
    this.load.image('chicken-repository-3-2', assets.chickenRepository32);
    this.load.image('chicken-repository-4-2', assets.chickenRepository42);
    this.load.image('chicken-repository-1-3', assets.chickenRepository13);
    this.load.image('chicken-repository-2-3', assets.chickenRepository23);
    this.load.image('chicken-repository-3-3', assets.chickenRepository33);
    this.load.image('chicken-repository-4-3', assets.chickenRepository43);
    this.load.image('chicken-repository-1-4', assets.chickenRepository14);
    this.load.image('chicken-repository-2-4', assets.chickenRepository24);
    this.load.image('chicken-repository-3-4', assets.chickenRepository34);
    this.load.image('chicken-repository-4-4', assets.chickenRepository44);
    this.load.image('chicken-grass1-1', assets.chickenGrass11);
    this.load.image('chicken-grass1-2', assets.chickenGrass12);
    this.load.image('chicken-grass1-3', assets.chickenGrass13);
    this.load.image('chicken-grass1-4', assets.chickenGrass14);
    this.load.image('chicken-grass2-1', assets.chickenGrass21);
    this.load.image('chicken-grass2-2', assets.chickenGrass22);
    this.load.image('chicken-grass2-3', assets.chickenGrass23);
    this.load.image('chicken-grass2-4', assets.chickenGrass24);
    this.load.image('chicken-grass3-1', assets.chickenGrass31);
    this.load.image('chicken-grass3-2', assets.chickenGrass32);
    this.load.image('chicken-grass3-3', assets.chickenGrass33);
    this.load.image('chicken-grass3-4', assets.chickenGrass34);
    this.load.image('chicken-grass4-1', assets.chickenGrass41);
    this.load.image('chicken-grass4-2', assets.chickenGrass42);
    this.load.image('chicken-grass4-3', assets.chickenGrass43);
    this.load.image('chicken-grass4-4', assets.chickenGrass44);
    this.load.image('chicken-water1-1', assets.chickenWater11);
    this.load.image('chicken-water1-2', assets.chickenWater12);
    this.load.image('chicken-water1-3', assets.chickenWater13);
    this.load.image('chicken-water1-4', assets.chickenWater14);
    this.load.image('chicken-water2-1', assets.chickenWater21);
    this.load.image('chicken-water2-2', assets.chickenWater22);
    this.load.image('chicken-water2-3', assets.chickenWater23);
    this.load.image('chicken-water2-4', assets.chickenWater24);
    this.load.image('chicken-water3-1', assets.chickenWater31);
    this.load.image('chicken-water3-2', assets.chickenWater32);
    this.load.image('chicken-water3-3', assets.chickenWater33);
    this.load.image('chicken-water3-4', assets.chickenWater34);
    this.load.image('chicken-water4-1', assets.chickenWater41);
    this.load.image('chicken-water4-2', assets.chickenWater42);
    this.load.image('chicken-water4-3', assets.chickenWater43);
    this.load.image('chicken-water4-4', assets.chickenWater44);
    this.load.image('lock-territory', assets.lockTerritory);
    this.load.spritesheet('chicken0', assets.chicken0, { frameWidth: 109, frameHeight: 138 });
    this.load.spritesheet('chicken1', assets.chicken1, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('chicken2', assets.chicken2, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('chicken3', assets.chicken3, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('chicken4', assets.chicken4, { frameWidth: 115, frameHeight: 137 });
    this.load.spritesheet('chicken5', assets.chicken5, { frameWidth: 115, frameHeight: 150 });
    this.load.spritesheet('chicken6', assets.chicken6, { frameWidth: 115, frameHeight: 150 });
    this.load.spritesheet('chicken7', assets.chicken7, { frameWidth: 115, frameHeight: 142 });
    this.load.spritesheet('chicken8', assets.chicken8, { frameWidth: 115, frameHeight: 150 });
    this.load.spritesheet('chicken9', assets.chicken9, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('chicken10', assets.chicken10, { frameWidth: 115, frameHeight: 145 });
    this.load.spritesheet('chicken11', assets.chicken11, { frameWidth: 115, frameHeight: 133 });
    this.load.spritesheet('chicken12', assets.chicken12, { frameWidth: 115, frameHeight: 150 });
    this.load.image('chicken-egg0', assets.egg0);
    this.load.image('chicken-egg1', assets.egg1);
    this.load.image('chicken-egg2', assets.egg2);
    this.load.image('chicken-egg3', assets.egg3);
    this.load.image('chicken-egg4', assets.egg4);
    this.load.image('chicken-egg5', assets.egg5);
    this.load.image('chicken-egg6', assets.egg6);
    this.load.image('chicken-egg7', assets.egg7);
    this.load.image('chicken-egg8', assets.egg8);
    this.load.image('chicken-egg9', assets.egg9);
    this.load.image('chicken-egg10', assets.egg10);
    this.load.image('chicken-egg11', assets.egg11);
    this.load.image('chicken-egg12', assets.egg12);
    this.load.image('merging-animation', assets.mergingAnimation);
    this.load.image('lock', assets.lock);
    this.load.image('disable-chicken', assets.disableChicken);
    this.load.image('chicken-house-sprite', assets.chickenHouseSprite);
    this.load.image('cave-disable', assets.caveDisalble);
    this.load.image('cave-ready', assets.caveReady);
    this.load.image('cave-wait', assets.caveWait);
    this.load.image('cave-timer', assets.caveTimer);
    this.load.image('chicken-forest-1', assets.chickenForest1);
    this.load.image('chicken-forest-2', assets.chickenForest2);
    this.load.image('chicken-forest-3', assets.chickenForest3);
    this.load.image('chicken-forest-4', assets.chickenForest4);
    this.load.image('chicken-forest-5', assets.chickenForest5);
    this.load.image('chicken-forest-6', assets.chickenForest6);
    this.load.image('chicken-forest-7', assets.chickenForest7);
    this.load.image('chicken-forest-8', assets.chickenForest8);
    this.load.image('star', assets.star);
    this.load.image('completed', assets.completed);
    this.load.image('little-button', assets.littleButton);
    this.load.image('little-button-disable', assets.littleButtonDisable);
    this.load.image('chicken-task-icon-1', assets.chickenTaskIcon1);
    this.load.image('chicken-task-icon-2', assets.chickenTaskIcon2);
    this.load.image('chicken-task-icon-3', assets.chickenTaskIcon3);
    this.load.image('chicken-task-icon-4', assets.chickenTaskIcon4);
    this.load.image('chicken-task-icon-5', assets.chickenTaskIcon5);
    this.load.image('chicken-task-icon-6', assets.chickenTaskIcon6);
    this.load.image('chicken-task-icon-7', assets.chickenTaskIcon7);
    this.load.image('chicken-task-icon-8', assets.chickenTaskIcon8);
    this.load.image('chicken-task-icon-9', assets.chickenTaskIcon9);
    this.load.image('chicken-task-icon-10', assets.chickenTaskIcon10);
    this.load.image('chicken-task-icon-11', assets.chickenTaskIcon11);
    this.load.image('chicken-task-icon-12', assets.chickenTaskIcon12);
    this.load.image('chicken-task-icon-13', assets.chickenTaskIcon13);
    this.load.image('chicken-task-icon-14', assets.chickenTaskIcon14);
    this.load.image('chicken-task-icon-15', assets.chickenTaskIcon15);
    this.load.image('chicken-task-icon-16', assets.chickenTaskIcon16);
    this.load.image('chicken-task-icon-17', assets.chickenTaskIcon17);
    this.load.image('chicken-task-icon-18', assets.chickenTaskIcon18);
    this.load.image('chicken-task-icon-20', assets.chickenTaskIcon20);
    this.load.image('chicken-task-icon-21', assets.chickenTaskIcon21);
    this.load.image('chicken-task-icon-22', assets.chickenTaskIcon22);
    this.load.image('chicken-task-icon-23', assets.chickenTaskIcon23);
    this.load.image('chicken-task-icon-24', assets.chickenTaskIcon24);
    this.load.image('chicken-task-icon-25', assets.chickenTaskIcon25);
    this.load.image('chicken-task-icon-26', assets.chickenTaskIcon26);
    this.load.image('chicken-task-icon-27', assets.chickenTaskIcon27);
    this.load.image('chicken-task-icon-28', assets.chickenTaskIcon28);
    this.load.image('chicken-task-icon-29', assets.chickenTaskIcon29);
    this.load.image('chicken-task-icon-29', assets.chickenTaskIcon29);
    this.load.image('chicken-task-icon-31', assets.chickenTaskIcon31);
    this.load.image('chicken-task-icon-32', assets.chickenTaskIcon32);
    this.load.image('chicken-task-icon-33', assets.chickenTaskIcon33);
    this.load.image('chicken-task-icon-34', assets.chickenTaskIcon34);
    this.load.image('chicken-task-icon-38', assets.chickenTaskIcon38);
    this.load.image('chicken-task-icon-39', assets.chickenTaskIcon39);
    this.load.image('chicken-task-icon-40', assets.chickenTaskIcon40);
    this.load.image('plus', assets.plus);
    this.load.image('chicken-leaves', assets.chickenLeaves);
    this.load.image('green-balance-bg', assets.greenBalanceBg);
    this.load.image('red-balance-bg', assets.redBalanceBg);
    this.load.image('resource-enough', assets.resourceEnough);
    this.load.image('resource-problem', assets.resourceProblem);
    this.load.image('grass-balance', assets.grassBalance);
    this.load.image('water-balance', assets.waterBalance);
    this.load.image('tail', assets.tail);
    this.load.image('pixel', assets.pixel);
    this.load.image('chicken-vertical-border', assets.chickenVerticalBorder);
    this.load.image('chicken-horizontal-border-1', assets.chickenHorizontalBorder1);
    this.load.image('chicken-horizontal-border-2', assets.chickenHorizontalBorder2);
    this.load.image('chicken-horizontal-border-3', assets.chickenHorizontalBorder3);
    this.load.image('gift', assets.gift);
    this.load.image('offline', assets.offline);
    this.load.image('tutor-btn', assets.tutorBtn);
    this.load.image('heart', assets.heart);
    this.load.image('not-enought-water', assets.notEnoughtWater);
    this.load.image('not-enought-grass', assets.notEnoughtGrass);
    this.load.image('calendar', assets.calendar);
    this.load.image('ad-icon', assets.adIcon);
    this.load.image('bg-ad', assets.bgAd);
    this.load.image('big-btn-green', assets.bigButtonGreen);
    this.load.image('arrow', assets.arrow);
    this.load.image('stock-icon', assets.stockIcon);
    this.load.image('loading-spinner', assets.loadingSpinner);
    this.load.image('farmer', assets.farmer);
    this.load.image('white-pixel', assets.whitePixel);
    this.load.image('scroll-arrow', assets.scrollArrow);
    this.load.image('hatchet', assets.hatchet);
    this.load.image('hammer', assets.hammer);
    this.load.image('improve-collector', assets.improveCollector);
    this.load.image('task-award-bg', assets.tasksAwardBg);
    this.load.image('notification-bg', assets.notificationBg);
    this.load.image('rounded-segment', assets.roundedBarSegment);
    this.load.image('circle-outline', assets.circleOutline);
    this.load.image('cooldown-plate', assets.cooldownPlate);
    this.load.image('tasks-bar-ns', assets.tasksBarNs);
    this.load.image('tasks-bar-fix', assets.tasksBarNs);
    this.load.image('task-bar-top', assets.taskBarTop);
    this.load.image('task-bar-bot', assets.taskBarBot);
    this.load.image('task-bar-mid', assets.taskBarMid);
    this.load.image('text-sale', assets.textSale);
    this.load.image('icon-sale', assets.saleIcon);
    this.load.image('btn-clean', assets.btnClean);
    this.load.image('feed-chicken-balance', assets.feedChickenBalance);
    this.load.image('plate-feed', assets.plateFeed);
    this.load.image('cloud-info', assets.cloudInfo);
    this.load.image('green-balance-bg-big', assets.greenBalanceBgBig);
    this.load.image('red-balance-bg-big', assets.redBalanceBgBig);
  }

  public create(): void {
    this.loadingReady = true;
  }

  public update(): void {
    if (this.loadingReady && this.userReady) {
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
        const Amplitude = this.state.amplitude;
        Amplitude.setFarmIdentify();
        console.log(`Test - ${this.state.user.test}`);
        if (this.state.platform === 'android') this.initAndroidStore();
      }

      this.userReady = false;
      this.loadingReady = false;
      
      // считаем общее время отсутсвия
      this.startTime = Math.round(new Date().getTime() / 1000) - this.startTime;
      this.state.offlineTime += this.startTime;
      
      this.scene.stop();
      this.scene.start('Chicken', this.state); // сцена с курицами
      this.scene.start('ChickenBars', this.state); // сцена с барами
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
      axios
        .post(process.env.API + '/loadData', { hash: this.state.user.hash })
        .then((response) => {
          this.state.dataIsLoaded = true;
          this.loadData(response);
          this.state.offlineTime = response.data.progress.chickenOfflineTime;
          this.userReady = true;
        })
        .catch(() => {
          this.serverError = true;
        });
    } else {
      this.userReady = true;
    }

    this.state.farm = 'Chicken';
    this.state.shopNotificationCount = [0, 0, 0, 0];
    LocalStorage.set('farm', 'Chicken');
  }
}

export default ChickenPreload;
