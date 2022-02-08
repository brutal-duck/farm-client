import axios from 'axios';
import Socket from '../../Socket';
import loadCow from '../../local/loadCow';
import loadData from '../../general/loadData';
import { loadingScreen, checkStorage, initAndroidStore } from '../../general/basic';
import LocalStorage from './../../libs/LocalStorage';
import { clickShopBtn } from '../../general/clicks';
import { general } from '../../local/settings';
import ErrorWindow from './../../components/Web/ErrorWindow';
import Ads from './../../components/Utils/Ads';
import assets from '../../data/assets';

class CowPreload extends Phaser.Scene {

  public lang: string; // индекс языка
  public state: Istate;
  public userReady: boolean;
  private serverError: boolean;
  public loadingReady: boolean;
  public socket: boolean;
  public loadTime: number;
  public startTime: number;
  public loadCow = loadCow.bind(this);
  public loadingScreen = loadingScreen.bind(this);
  public loadData = loadData.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public initAndroidStore = initAndroidStore.bind(this);

  constructor() {
    super('CowPreload');
  }

  
  public init(state: Istate): void {
    this.state  = state;
    this.userReady = false;
    this.loadingReady = false;
    this.serverError = false;
    this.loadUser();
    this.socket = false;
    this.startTime = Math.round(new Date().getTime() / 1000);

    if (!this.state.socket) {
      this.socket = true;
      this.loadTime = Math.round(new Date().getTime() / 1000);
      this.state.socket = new Socket(this.state);
    }
    Ads.showInterstitialOnPreload(this.state);
  }
  
  public preload(): void {
    this.loadingScreen('cow');
    this.load.image('diamond', assets.diamond);
    this.load.image('cowCoin', assets.cowCoin);
    this.load.image('bg', assets.bg);
    this.load.image('cow-top', assets.cowTop);
    this.load.image('cow-bottom', assets.cowBottom);
    this.load.image('topbar', assets.topbar);
    this.load.image('tabbar', assets.tabbar);
    this.load.image('cow-buy-icon-1', assets.cowBuyIcon1);
    this.load.image('cow-buy-icon-2', assets.cowBuyIcon2);
    this.load.image('cow-buy-icon-3', assets.cowBuyIcon3);
    this.load.image('cow-buy-icon-4', assets.cowBuyIcon4);
    this.load.image('cow-buy-icon-5', assets.cowBuyIcon5);
    this.load.image('cow-buy-icon-6', assets.cowBuyIcon6);
    this.load.image('cow-buy-icon-7', assets.cowBuyIcon7);
    this.load.image('cow-buy-icon-8', assets.cowBuyIcon8);
    this.load.image('cow-buy-icon-9', assets.cowBuyIcon9);
    this.load.image('cow-buy-icon-10', assets.cowBuyIcon10);
    this.load.image('cow-buy-icon-11', assets.cowBuyIcon11);
    this.load.image('cow-buy-icon-12', assets.cowBuyIcon12);
    this.load.image('milk-collector', assets.milkCollector);
    this.load.image('shop', assets.shop);
    this.load.image('map-icon', assets.mapIcon);
    this.load.image('sandwich', assets.sandwich);
    this.load.image('sandwich-close', assets.sandwichClose);
    this.load.image('profile', assets.profile);
    this.load.image('debug', assets.debug);
    this.load.image('chat', assets.chat);
    this.load.image('cow-for-buying', assets.cowForBuying);
    this.load.image('cow-bought', assets.cowBought);
    this.load.image('cow-merging', assets.cowMerging);
    this.load.image('cow-tent', assets.cowTent);
    this.load.image('cow-house', assets.cowHouse);
    this.load.image('cow-ground', assets.cowGround);
    this.load.image('cow-repository', assets.cowRepository);
    this.load.image('cow-factory', assets.factory);
    this.load.image('cow-repository-1-1', assets.cowRepository11);
    this.load.image('cow-repository-2-1', assets.cowRepository21);
    this.load.image('cow-repository-3-1', assets.cowRepository31);
    this.load.image('cow-repository-4-1', assets.cowRepository41);
    this.load.image('cow-repository-1-2', assets.cowRepository12);
    this.load.image('cow-repository-2-2', assets.cowRepository22);
    this.load.image('cow-repository-3-2', assets.cowRepository32);
    this.load.image('cow-repository-4-2', assets.cowRepository42);
    this.load.image('cow-repository-1-3', assets.cowRepository13);
    this.load.image('cow-repository-2-3', assets.cowRepository23);
    this.load.image('cow-repository-3-3', assets.cowRepository33);
    this.load.image('cow-repository-4-3', assets.cowRepository43);
    this.load.image('cow-repository-1-4', assets.cowRepository14);
    this.load.image('cow-repository-2-4', assets.cowRepository24);
    this.load.image('cow-repository-3-4', assets.cowRepository34);
    this.load.image('cow-repository-4-4', assets.cowRepository44);
    this.load.image('cow-grass1-1', assets.cowGrass11);
    this.load.image('cow-grass1-2', assets.cowGrass12);
    this.load.image('cow-grass1-3', assets.cowGrass13);
    this.load.image('cow-grass1-4', assets.cowGrass14);
    this.load.image('cow-grass2-1', assets.cowGrass21);
    this.load.image('cow-grass2-2', assets.cowGrass22);
    this.load.image('cow-grass2-3', assets.cowGrass23);
    this.load.image('cow-grass2-4', assets.cowGrass24);
    this.load.image('cow-grass3-1', assets.cowGrass31);
    this.load.image('cow-grass3-2', assets.cowGrass32);
    this.load.image('cow-grass3-3', assets.cowGrass33);
    this.load.image('cow-grass3-4', assets.cowGrass34);
    this.load.image('cow-grass4-1', assets.cowGrass41);
    this.load.image('cow-grass4-2', assets.cowGrass42);
    this.load.image('cow-grass4-3', assets.cowGrass43);
    this.load.image('cow-grass4-4', assets.cowGrass44);
    this.load.image('cow-water1-1', assets.cowWater11);
    this.load.image('cow-water1-2', assets.cowWater12);
    this.load.image('cow-water1-3', assets.cowWater13);
    this.load.image('cow-water1-4', assets.cowWater14);
    this.load.image('cow-water2-1', assets.cowWater21);
    this.load.image('cow-water2-2', assets.cowWater22);
    this.load.image('cow-water2-3', assets.cowWater23);
    this.load.image('cow-water2-4', assets.cowWater24);
    this.load.image('cow-water3-1', assets.cowWater31);
    this.load.image('cow-water3-2', assets.cowWater32);
    this.load.image('cow-water3-3', assets.cowWater33);
    this.load.image('cow-water3-4', assets.cowWater34);
    this.load.image('cow-water4-1', assets.cowWater41);
    this.load.image('cow-water4-2', assets.cowWater42);
    this.load.image('cow-water4-3', assets.cowWater43);
    this.load.image('cow-water4-4', assets.cowWater44);
    this.load.image('lock-territory', assets.lockTerritory);
    this.load.spritesheet('cow0', assets.cow0, { frameWidth: 132.7, frameHeight: 137 });
    this.load.image('cow-horns-1', assets.pixel);
    this.load.image('cow-horns-2', assets.cowHorns1);
    this.load.image('cow-horns-3', assets.cowHorns2);
    this.load.image('cow-horns-4', assets.cowHorns3);
    this.load.spritesheet('cow1', assets.cow1, { frameWidth: 147, frameHeight: 140 });
    this.load.spritesheet('cow2', assets.cow2, { frameWidth: 146.7, frameHeight: 143 });
    this.load.spritesheet('cow3', assets.cow3, { frameWidth: 147.7, frameHeight: 146 });
    this.load.spritesheet('cow4', assets.cow4, { frameWidth: 144.7, frameHeight: 149 });
    this.load.spritesheet('cow5', assets.cow5, { frameWidth: 148.9, frameHeight: 149 });
    this.load.spritesheet('cow6', assets.cow6, { frameWidth: 153.7, frameHeight: 154 });
    this.load.spritesheet('cow7', assets.cow7, { frameWidth: 144.7, frameHeight: 154 });
    this.load.spritesheet('cow8', assets.cow8, { frameWidth: 144.7, frameHeight: 154 });
    this.load.spritesheet('cow9', assets.cow9, { frameWidth: 134, frameHeight: 154 });
    this.load.spritesheet('cow10', assets.cow10, { frameWidth: 133.7, frameHeight: 143 });
    this.load.spritesheet('cow11', assets.cow11, { frameWidth: 152.7, frameHeight: 153 });
    this.load.spritesheet('cow12', assets.cow12, { frameWidth: 143.8, frameHeight: 156 });
    this.load.image('milk-status', assets.milkStatus);
    this.load.image('diamond-status', assets.diamondStatus);
    this.load.image('cow-milk', assets.milk);
    this.load.image('merging-animation', assets.mergingAnimation);
    this.load.image('diamond', assets.diamond);
    this.load.image('lock', assets.lock);
    this.load.image('disable-cow', assets.disableCow);
    this.load.image('cow-house-sprite', assets.cowHouseSprite);
    this.load.image('cave-disable', assets.caveDisalble);
    this.load.image('cave-ready', assets.caveReady);
    this.load.image('cave-wait', assets.caveWait);
    this.load.image('cave-timer', assets.caveTimer);
    this.load.image('cow-forest-1', assets.cowForest1);
    this.load.image('cow-forest-2', assets.cowForest2);
    this.load.image('cow-forest-3', assets.cowForest3);
    this.load.image('cow-forest-4', assets.cowForest4);
    this.load.image('cow-forest-5', assets.cowForest5);
    this.load.image('cow-forest-6', assets.cowForest6);
    this.load.image('cow-forest-7', assets.cowForest7);
    this.load.image('cow-forest-8', assets.cowForest8);
    this.load.image('star', assets.star);
    this.load.image('completed', assets.completed);
    this.load.image('little-button', assets.littleButton);
    this.load.image('little-button-disable', assets.littleButtonDisable);
    this.load.image('cow-task-icon-1', assets.cowTaskIcon1);
    this.load.image('cow-task-icon-2', assets.cowTaskIcon2);
    this.load.image('cow-task-icon-3', assets.cowTaskIcon3);
    this.load.image('cow-task-icon-4', assets.cowTaskIcon4);
    this.load.image('cow-task-icon-5', assets.cowTaskIcon5);
    this.load.image('cow-task-icon-6', assets.cowTaskIcon6);
    this.load.image('cow-task-icon-7', assets.cowTaskIcon7);
    this.load.image('cow-task-icon-8', assets.cowTaskIcon8);
    this.load.image('cow-task-icon-9', assets.cowTaskIcon9);
    this.load.image('cow-task-icon-10', assets.cowTaskIcon10);
    this.load.image('cow-task-icon-11', assets.cowTaskIcon11);
    this.load.image('cow-task-icon-12', assets.cowTaskIcon12);
    this.load.image('cow-task-icon-13', assets.cowTaskIcon13);
    this.load.image('cow-task-icon-14', assets.cowTaskIcon14);
    this.load.image('cow-task-icon-15', assets.cowTaskIcon15);
    this.load.image('cow-task-icon-16', assets.cowTaskIcon16);
    this.load.image('cow-task-icon-17', assets.cowTaskIcon17);
    this.load.image('cow-task-icon-18', assets.cowTaskIcon18);
    this.load.image('cow-task-icon-20', assets.cowTaskIcon20);
    this.load.image('cow-task-icon-21', assets.cowTaskIcon21);
    this.load.image('cow-task-icon-22', assets.cowTaskIcon22);
    this.load.image('cow-task-icon-23', assets.cowTaskIcon23);
    this.load.image('cow-task-icon-24', assets.cowTaskIcon24);
    this.load.image('cow-task-icon-25', assets.cowTaskIcon25);
    this.load.image('cow-task-icon-26', assets.cowTaskIcon26);
    this.load.image('cow-task-icon-27', assets.cowTaskIcon27);
    this.load.image('cow-task-icon-28', assets.cowTaskIcon28);
    this.load.image('cow-task-icon-29', assets.cowTaskIcon29);
    this.load.image('cow-task-icon-29', assets.cowTaskIcon29);
    this.load.image('cow-task-icon-31', assets.cowTaskIcon31);
    this.load.image('cow-task-icon-32', assets.cowTaskIcon32);
    this.load.image('cow-task-icon-33', assets.cowTaskIcon33);
    this.load.image('cow-task-icon-34', assets.cowTaskIcon34);
    this.load.image('cow-task-icon-35', assets.cowTaskIcon35);
    this.load.image('cow-task-icon-36', assets.cowTaskIcon36);
    this.load.image('cow-task-icon-37', assets.cowTaskIcon37);
    this.load.image('cow-task-icon-38', assets.cowTaskIcon38);
    this.load.image('cow-task-icon-39', assets.cowTaskIcon39);
    this.load.image('cow-task-icon-40', assets.cowTaskIcon40);
    this.load.image('plus', assets.plus);
    this.load.image('cow-leaves', assets.cowLeaves);
    this.load.image('green-balance-bg', assets.greenBalanceBg);
    this.load.image('red-balance-bg', assets.redBalanceBg);
    this.load.image('resource-enough', assets.resourceEnough);
    this.load.image('resource-problem', assets.resourceProblem);
    this.load.image('grass-balance', assets.grassBalance);
    this.load.image('water-balance', assets.waterBalance);
    this.load.image('tail', assets.tail);
    this.load.image('pixel', assets.pixel);
    this.load.image('cow-vertical-border', assets.cowVerticalBorder);
    this.load.image('cow-horizontal-border-1', assets.cowHorizontalBorder1);
    this.load.image('cow-horizontal-border-2', assets.cowHorizontalBorder2);
    this.load.image('cow-horizontal-border-3', assets.cowHorizontalBorder3);
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
    this.load.image('factory-smoke', assets.factorySmoke);
    this.load.image('factory-flash', assets.factoryFlash);
    this.load.image('tutorial-showcase', assets.tutorialShowcase);
    this.load.image('hatchet', assets.hatchet);
    this.load.image('hammer', assets.hammer);
    this.load.image('improve-collector', assets.improveCollector);
    this.load.image('task-award-bg', assets.tasksAwardBg);

    this.load.image('circle', assets.circle);
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
    this.load.image('feed-cow-balance', assets.feedCowBalance);
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
      this.scene.start('Cow', this.state); // сцена с коровами
      this.scene.start('CowBars', this.state); // сцена с барами
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
        this.state.offlineTime = response.data.progress.cowOfflineTime;
        this.userReady = true;
      }).catch(() => {
        this.serverError = true;
      });
    } else {
      this.userReady = true;
    }

    this.state.farm = 'Cow';
    this.state.shopNotificationCount = [0, 0, 0, 0];
    LocalStorage.set('farm', 'Cow');
  }
}

export default CowPreload;
