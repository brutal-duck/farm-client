import axios from 'axios';
import Socket from '../../../Socket';
import loadData from '../../../general/loadData';
import { loadingScreen } from '../../../general/basic';
import ErrorWindow from './../../../components/Web/ErrorWindow';
import { clickShopBtn } from '../../../general/clicks';
import Ads from './../../../components/Utils/Ads';
import assets from '../../../data/assets';

class UnicornPreload extends Phaser.Scene {

  public lang: string; // индекс языка
  public state: Istate;
  public userReady: boolean;
  public loadingReady: boolean;  
  private serverError: boolean;
  public socket: boolean;
  public loadTime: number;
  public startTime: number;
  public loadingScreen = loadingScreen.bind(this);
  public loadData = loadData.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);

  constructor() {
    super('UnicornPreload');
  }

  
  public init(state: Istate): void {
    this.state  = state;
    this.userReady = false;
    this.loadingReady = false;
    this.serverError = false;
    this.loadUser();
    this.state.farm = 'Unicorn';
    this.startTime = Math.round(new Date().getTime() / 1000);

    if (!this.state.socket) {
      this.socket = true;
      this.loadTime = Math.round(new Date().getTime() / 1000);
      this.state.socket = new Socket(this.state);
    }
    Ads.showInterstitialOnPreload(this.state);
  }
  
  public preload(): void {
    this.loadingScreen('Unicorn');
    this.load.image('bg', assets.bg);
    this.load.image('event-top', assets.unicornTop);
    this.load.image('event-bottom', assets.unicornBottom);
    this.load.image('topbar-event', assets.unicornTopbar);
    this.load.image('tabbar', assets.tabbar);
    this.load.image('event-collector', assets.resourceCollector);
    this.load.image('shop', assets.shop);
    this.load.image('map-icon', assets.mapIcon);
    this.load.image('sandwich', assets.sandwich);
    this.load.image('sandwich-close', assets.sandwichClose);
    this.load.image('profile', assets.profile);
    this.load.image('chat', assets.chat);
    this.load.image('event-for-buying', assets.unicornForBuying);
    this.load.image('lock-event-territory', assets.unicornlockTerritory);
    this.load.image('merging-animation', assets.mergingAnimation);
    this.load.image('unicornCoin', assets.unicornCoin);
    this.load.image('diamond', assets.diamond);
    this.load.image('lock', assets.lock);
    this.load.image('gift', assets.gift);
    this.load.image('offline', assets.offline);
    this.load.image('tutor-btn', assets.tutorBtn);
    this.load.image('heart', assets.heart);
    this.load.image('calendar', assets.calendar);
    this.load.image('ad-icon', assets.adIcon);
    this.load.image('bg-ad', assets.bgAd);
    this.load.image('big-btn-green', assets.bigButtonGreen);
    this.load.image('event-grass', assets.unicornGrass);
    this.load.image('event-forest-1', assets.unicornForest1);
    this.load.image('event-forest-2', assets.unicornForest2);
    this.load.image('event-forest-3', assets.unicornForest3);
    this.load.image('event-forest-4', assets.unicornForest4);
    this.load.image('event-forest-5', assets.unicornForest5);
    this.load.image('event-forest-6', assets.unicornForest6);
    this.load.image('unicorn-vertical-border', assets.unicornVerticalBorder);
    this.load.image('unicorn-horizontal-border-1', assets.unicornHorizontalBorder1);
    this.load.image('unicorn-horizontal-border-2', assets.unicornHorizontalBorder2);
    this.load.image('unicorn-horizontal-border-3', assets.unicornHorizontalBorder3);
    this.load.image('event-work-zone', assets.eventWorkZone);
    this.load.image('event-buy-icon-1', assets.eventBuyIcon1);
    this.load.image('event-buy-icon-2', assets.eventBuyIcon2);
    this.load.image('event-buy-icon-3', assets.eventBuyIcon3);
    this.load.image('event-buy-icon-4', assets.eventBuyIcon4);
    this.load.image('event-buy-icon-5', assets.eventBuyIcon5);
    this.load.image('event-buy-icon-6', assets.eventBuyIcon6);
    this.load.image('event-buy-icon-7', assets.eventBuyIcon7);
    this.load.image('event-buy-icon-8', assets.eventBuyIcon8);
    this.load.image('event-buy-icon-9', assets.eventBuyIcon9);
    this.load.image('event-buy-icon-10', assets.eventBuyIcon10);
    this.load.image('event-buy-icon-11', assets.eventBuyIcon11);
    this.load.image('event-buy-icon-12', assets.eventBuyIcon12);
    this.load.image('event-buy-icon-13', assets.eventBuyIcon13);
    this.load.image('event-buy-icon-14', assets.eventBuyIcon14);
    this.load.image('event-buy-icon-15', assets.eventBuyIcon15);
    this.load.image('event-buy-icon-16', assets.eventBuyIcon16);
    this.load.image('event-buy-icon-17', assets.eventBuyIcon17);
    this.load.image('event-buy-icon-18', assets.eventBuyIcon18);
    this.load.image('event-buy-icon-19', assets.eventBuyIcon19);
    this.load.image('event-buy-icon-20', assets.eventBuyIcon20);
    this.load.image('event-buy-icon-21', assets.eventBuyIcon21);
    this.load.image('event-buy-icon-22', assets.eventBuyIcon22);
    this.load.image('event-buy-icon-23', assets.eventBuyIcon23);
    this.load.image('event-buy-icon-24', assets.eventBuyIcon24);
    this.load.image('event-buy-icon-25', assets.eventBuyIcon25);
    this.load.image('event-buy-icon-26', assets.eventBuyIcon26);
    this.load.image('event-buy-icon-27', assets.eventBuyIcon27);
    this.load.image('event-buy-icon-28', assets.eventBuyIcon28);
    this.load.image('event-buy-icon-29', assets.eventBuyIcon29);
    this.load.image('event-buy-icon-30', assets.eventBuyIcon30);
    this.load.image('event-buy-icon-31', assets.eventBuyIcon31);
    this.load.image('event-buy-icon-32', assets.eventBuyIcon32);
    this.load.image('event-buy-icon-33', assets.eventBuyIcon33);
    this.load.image('event-buy-icon-34', assets.eventBuyIcon34);
    this.load.image('event-buy-icon-35', assets.eventBuyIcon35);
    this.load.image('event-buy-icon-36', assets.eventBuyIcon36);
    this.load.image('event-buy-icon-37', assets.eventBuyIcon37);
    this.load.image('event-buy-icon-38', assets.eventBuyIcon38);
    this.load.image('event-buy-icon-39', assets.eventBuyIcon39);
    this.load.image('event-buy-icon-40', assets.eventBuyIcon40);
    this.load.image('event-buy-icon-41', assets.eventBuyIcon41);
    this.load.image('event-buy-icon-42', assets.eventBuyIcon42);
    this.load.image('event-buy-icon-43', assets.eventBuyIcon43);
    this.load.image('event-buy-icon-44', assets.eventBuyIcon44);
    this.load.image('event-buy-icon-45', assets.eventBuyIcon45);
    this.load.image('event-buy-icon-46', assets.eventBuyIcon46);
    this.load.image('event-buy-icon-47', assets.eventBuyIcon47);
    this.load.image('event-buy-icon-48', assets.eventBuyIcon48);
    this.load.image('event-buy-icon-49', assets.eventBuyIcon49);
    this.load.image('event-buy-icon-50', assets.eventBuyIcon50);
    this.load.image('event-buy-icon-51', assets.eventBuyIcon51);
    this.load.image('event-buy-icon-52', assets.eventBuyIcon52);
    this.load.image('event-buy-icon-53', assets.eventBuyIcon53);
    this.load.image('event-buy-icon-54', assets.eventBuyIcon54);
    this.load.image('event-buy-icon-55', assets.eventBuyIcon55);
    this.load.image('event-buy-icon-56', assets.eventBuyIcon56);
    this.load.image('event-buy-icon-57', assets.eventBuyIcon57);
    this.load.image('event-buy-icon-58', assets.eventBuyIcon58);
    this.load.image('event-buy-icon-59', assets.eventBuyIcon59);
    this.load.image('event-buy-icon-60', assets.eventBuyIcon60);
    this.load.image('event-buy-icon-61', assets.eventBuyIcon61);
    this.load.image('event-buy-icon-62', assets.eventBuyIcon62);
    this.load.image('event-buy-icon-63', assets.eventBuyIcon63);
    this.load.image('event-buy-icon-64', assets.eventBuyIcon64);
    this.load.image('event-buy-icon-65', assets.eventBuyIcon65);
    this.load.image('event-buy-icon-66', assets.eventBuyIcon66);
    this.load.image('event-buy-icon-67', assets.eventBuyIcon67);
    this.load.image('event-buy-icon-68', assets.eventBuyIcon68);
    this.load.image('event-buy-icon-69', assets.eventBuyIcon69);
    this.load.image('event-buy-icon-70', assets.eventBuyIcon70);
    this.load.image('event-buy-icon-70', assets.eventBuyIcon70);
    this.load.image('event-buy-icon-71', assets.eventBuyIcon71);
    this.load.image('event-buy-icon-72', assets.eventBuyIcon72);
    this.load.image('event-buy-icon-73', assets.eventBuyIcon73);
    this.load.image('event-buy-icon-74', assets.eventBuyIcon74);
    this.load.image('event-buy-icon-75', assets.eventBuyIcon75);
    this.load.image('event-buy-icon-76', assets.eventBuyIcon76);
    this.load.image('event-buy-icon-77', assets.eventBuyIcon77);
    this.load.image('event-buy-icon-78', assets.eventBuyIcon78);
    this.load.image('event-buy-icon-79', assets.eventBuyIcon79);
    this.load.image('event-buy-icon-80', assets.eventBuyIcon80);
    this.load.image('event-buy-icon-81', assets.eventBuyIcon81);
    this.load.image('event-buy-icon-82', assets.eventBuyIcon82);
    this.load.image('event-buy-icon-83', assets.eventBuyIcon83);
    this.load.image('event-buy-icon-84', assets.eventBuyIcon84);
    this.load.image('event-buy-icon-85', assets.eventBuyIcon85);
    this.load.image('event-buy-icon-86', assets.eventBuyIcon86);
    this.load.image('event-buy-icon-87', assets.eventBuyIcon87);
    this.load.image('event-buy-icon-88', assets.eventBuyIcon88);
    this.load.image('event-buy-icon-89', assets.eventBuyIcon89);
    this.load.image('event-buy-icon-90', assets.eventBuyIcon90);
    this.load.image('event-buy-icon-91', assets.eventBuyIcon91);
    this.load.image('event-buy-icon-92', assets.eventBuyIcon92);
    this.load.image('event-buy-icon-93', assets.eventBuyIcon93);
    this.load.image('event-buy-icon-94', assets.eventBuyIcon94);
    this.load.image('event-buy-icon-95', assets.eventBuyIcon95);
    this.load.image('event-buy-icon-96', assets.eventBuyIcon96);
    this.load.image('event-buy-icon-97', assets.eventBuyIcon97);
    this.load.image('event-buy-icon-98', assets.eventBuyIcon98);
    this.load.image('event-buy-icon-99', assets.eventBuyIcon99);
    this.load.image('event-buy-icon-100', assets.eventBuyIcon100);
    this.load.image('disable-animal', assets.disableAnimal);
    this.load.image('animal1', assets.unicorn1);
    this.load.image('animal2', assets.unicorn2);
    this.load.image('animal3', assets.unicorn3);
    this.load.image('animal4', assets.unicorn4);
    this.load.image('animal5', assets.unicorn5);
    this.load.image('animal6', assets.unicorn6);
    this.load.image('animal7', assets.unicorn7);
    this.load.image('animal8', assets.unicorn8);
    this.load.image('animal9', assets.unicorn9);
    this.load.image('animal10', assets.unicorn10);
    this.load.image('animal11', assets.unicorn11);
    this.load.image('animal12', assets.unicorn12);
    this.load.image('animal13', assets.unicorn13);
    this.load.image('animal14', assets.unicorn14);
    this.load.image('animal15', assets.unicorn15);
    this.load.image('animal16', assets.unicorn16);
    this.load.image('animal17', assets.unicorn17);
    this.load.image('animal18', assets.unicorn18);
    this.load.image('animal19', assets.unicorn19);
    this.load.image('animal20', assets.unicorn20);
    this.load.image('animal21', assets.unicorn21);
    this.load.image('animal22', assets.unicorn22);
    this.load.image('animal23', assets.unicorn23);
    this.load.image('animal24', assets.unicorn24);
    this.load.image('animal25', assets.unicorn25);
    this.load.image('animal26', assets.unicorn26);
    this.load.image('animal27', assets.unicorn27);
    this.load.image('animal28', assets.unicorn28);
    this.load.image('animal29', assets.unicorn29);
    this.load.image('animal30', assets.unicorn30);
    this.load.image('animal31', assets.unicorn31);
    this.load.image('animal32', assets.unicorn32);
    this.load.image('animal33', assets.unicorn33);
    this.load.image('animal34', assets.unicorn34);
    this.load.image('animal35', assets.unicorn35);
    this.load.image('animal36', assets.unicorn36);
    this.load.image('animal37', assets.unicorn37);
    this.load.image('animal38', assets.unicorn38);
    this.load.image('animal39', assets.unicorn39);
    this.load.image('animal40', assets.unicorn40);
    this.load.image('animal41', assets.unicorn41);
    this.load.image('animal42', assets.unicorn42);
    this.load.image('animal43', assets.unicorn43);
    this.load.image('animal44', assets.unicorn44);
    this.load.image('animal45', assets.unicorn45);
    this.load.image('animal46', assets.unicorn46);
    this.load.image('animal47', assets.unicorn47);
    this.load.image('animal48', assets.unicorn48);
    this.load.image('animal49', assets.unicorn49);
    this.load.image('animal50', assets.unicorn50);
    this.load.image('animal51', assets.unicorn51);
    this.load.image('animal52', assets.unicorn52);
    this.load.image('animal53', assets.unicorn53);
    this.load.image('animal54', assets.unicorn54);
    this.load.image('animal55', assets.unicorn55);
    this.load.image('animal56', assets.unicorn56);
    this.load.image('animal57', assets.unicorn57);
    this.load.image('animal58', assets.unicorn58);
    this.load.image('animal59', assets.unicorn59);
    this.load.image('animal60', assets.unicorn60);
    this.load.image('animal61', assets.unicorn61);
    this.load.image('animal62', assets.unicorn62);
    this.load.image('animal63', assets.unicorn63);
    this.load.image('animal64', assets.unicorn64);
    this.load.image('animal65', assets.unicorn65);
    this.load.image('animal66', assets.unicorn66);
    this.load.image('animal67', assets.unicorn67);
    this.load.image('animal68', assets.unicorn68);
    this.load.image('animal69', assets.unicorn69);
    this.load.image('animal70', assets.unicorn70);
    this.load.image('animal71', assets.unicorn71);
    this.load.image('animal72', assets.unicorn72);
    this.load.image('animal73', assets.unicorn73);
    this.load.image('animal74', assets.unicorn74);
    this.load.image('animal75', assets.unicorn75);
    this.load.image('animal76', assets.unicorn76);
    this.load.image('animal77', assets.unicorn77);
    this.load.image('animal78', assets.unicorn78);
    this.load.image('animal79', assets.unicorn79);
    this.load.image('animal80', assets.unicorn80);
    this.load.image('animal81', assets.unicorn81);
    this.load.image('animal82', assets.unicorn82);
    this.load.image('animal83', assets.unicorn83);
    this.load.image('animal84', assets.unicorn84);
    this.load.image('animal85', assets.unicorn85);
    this.load.image('animal86', assets.unicorn86);
    this.load.image('animal87', assets.unicorn87);
    this.load.image('animal88', assets.unicorn88);
    this.load.image('animal89', assets.unicorn89);
    this.load.image('animal90', assets.unicorn90);
    this.load.image('animal91', assets.unicorn91);
    this.load.image('animal92', assets.unicorn92);
    this.load.image('animal93', assets.unicorn93);
    this.load.image('animal94', assets.unicorn94);
    this.load.image('animal95', assets.unicorn95);
    this.load.image('animal96', assets.unicorn96);
    this.load.image('animal97', assets.unicorn97);
    this.load.image('animal98', assets.unicorn98);
    this.load.image('animal99', assets.unicorn99);
    this.load.image('animal100', assets.unicorn100);
    this.load.image('cloud', assets.cloud);
    this.load.image('event-resource', assets.resource);
    this.load.image('pixel', assets.pixel);
    this.load.image('unicorn-merging', assets.unicornMerging);
    this.load.image('unicorn-tent', assets.unicornTent);
    this.load.image('flower1', assets.unicornFlower1);
    this.load.image('flower2', assets.unicornFlower2);
    this.load.image('flower3', assets.unicornFlower3);
    this.load.image('flower4', assets.unicornFlower4);
    this.load.image('confetti1', assets.unicornConfetti1);
    this.load.image('confetti2', assets.unicornConfetti2);
    this.load.image('confetti3', assets.unicornConfetti3);
    this.load.image('confetti4', assets.unicornConfetti4);
    this.load.image('confetti5', assets.unicornConfetti5);
    this.load.image('confetti6', assets.unicornConfetti6);
    this.load.image('confetti7', assets.unicornConfetti7);
    this.load.image('confetti8', assets.unicornConfetti8);
    this.load.image('double-feed-boost', assets.doubleFeedBoost);
    this.load.image('event-feed-boost-mini', assets.eventFeedBoostMini);
    this.load.image('autoprogress-bg', assets.autoprogressBG);
    this.load.image('purple-btn', assets.purpleBtn);
    this.load.image('rating-bg', assets.ratingBG);
    this.load.image('rating-rules-btn', assets.ratingRulesBtn);
    this.load.image('rating-price-btn', assets.ratingPriseBtn);
    this.load.image('rating-places', assets.ratingPrisePlaces);
    this.load.image('event-tutor-merging', assets.eventTutorMerging);
    this.load.image('event-territory-btn', assets.eventTerritoryBtn);
    this.load.image('stock-icon', assets.stockIcon);
    this.load.image('notification-bg', assets.notificationBg);
    this.load.image('text-sale', assets.textSale);
    this.load.image('icon-sale', assets.saleIcon);

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
      }

      this.userReady = false;
      this.loadingReady = false;
      // считаем общее время отсутсвия
      this.startTime = Math.round(new Date().getTime() / 1000) - this.startTime;
      this.state.offlineTime += this.startTime;
      this.scene.stop();
      this.scene.start('Unicorn', this.state); // сцена с евентом
      this.scene.start('UnicornBars', this.state); // сцена с барами
      this.scene.start('Preload', this.state); // сцена с подзагрузкой
    } else if (this.loadingReady && this.serverError) {
      this.loadingReady = false;
      this.serverError = false;
      this.children.destroy();
      new ErrorWindow(this, this.state.lang.checkYourInternet);
    }
  }

  
  public loadUser(): void {
    const { id, hash, counter } = this.state.user;
    axios.post(process.env.API + '/takeUnicornOfflineTime', { id, hash, counter }).then(res => {
      const { error, value } = res.data;
      if (!error) {
        this.state.offlineTime = value;
        this.userReady = true;
      } else {
        this.serverError = true;
      }
    }).catch (() => {
      this.serverError = true;
    });
    this.state.farm = 'Unicorn';
    this.state.shopNotificationCount = [0, 0, 0, 0];
  }
}

export default UnicornPreload;
