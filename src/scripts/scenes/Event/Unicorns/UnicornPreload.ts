import axios from 'axios';
import Socket from '../../../Socket';
import loadData from '../../../general/loadData';
import { loadingScreen } from '../../../general/basic';
import Amplitude from './../../../libs/Amplitude';

const pixel: any = require("./../../../../assets/images/pixel.png");
const bg: any = require("./../../../../assets/images/scroll-bg.png");
const top: any = require("./../../../../assets/images/event/top.png");
const bottom: any = require("./../../../../assets/images/event/bottom.png");
const topbar: any = require("./../../../../assets/images/event/topbar.png");
const tabbar: any = require("./../../../../assets/images/tabbar.png");
const resourceCollector: any = require("./../../../../assets/images/event/event-collector.png");
const shop: any = require("./../../../../assets/images/icons/shop.png");
const mapIcon: any = require("./../../../../assets/images/icons/map.png");
const sandwich: any = require("./../../../../assets/images/icons/sandwich.png");
const sandwichClose: any = require("./../../../../assets/images/icons/sandwich-close.png");
const profile: any = require("./../../../../assets/images/icons/profile.png");
const chat: any = require("./../../../../assets/images/icons/chat.png");
const forBuying: any = require("./../../../../assets/images/event/territories/for-buying.png");
const lockTerritory: any = require("./../../../../assets/images/event/lock-event-territory.png");
const mergingAnimation: any = require("./../../../../assets/images/merging-animation.png");
const coin: any = require("./../../../../assets/images/event/icons/money.png");
const diamond: any = require("./../../../../assets/images/icons/diamonds.png");
const lock: any = require("./../../../../assets/images/icons/lock.png");
const gift: any = require("./../../../../assets/images/icons/gift.png");
const offline: any = require("./../../../../assets/images/icons/offline.png");
const tutorBtn: any = require("./../../../../assets/images/modal/tutor-btn.png");
const heart: any = require("./../../../../assets/images/icons/heart.png");
const calendar: any = require("./../../../../assets/images/calendar.png");
const adIcon: any = require("./../../../../assets/images/icons/ad-icon.png");
const bgAd: any = require("./../../../../assets/images/icons/bg-ad.png");
const bigButtonGreen: any = require("./../../../../assets/images/modal/btn_lg.png");
const grass: any = require("./../../../../assets/images/event/territories/grass.png");
const forest1: any = require("./../../../../assets/images/event/territories/forest-1.png");
const forest2: any = require("./../../../../assets/images/event/territories/forest-2.png");
const forest3: any = require("./../../../../assets/images/event/territories/forest-3.png");
const forest4: any = require("./../../../../assets/images/event/territories/forest-4.png");
const forest5: any = require("./../../../../assets/images/event/territories/forest-5.png");
const forest6: any = require("./../../../../assets/images/event/territories/forest-6.png");
const verticalBorder: any = require("./../../../../assets/images/event/territories/vertical-border.png");
const horizontalBorder1: any = require("./../../../../assets/images/event/territories/horizontal-border-1.png");
const horizontalBorder2: any = require("./../../../../assets/images/event/territories/horizontal-border-2.png");
const horizontalBorder3: any = require("./../../../../assets/images/event/territories/horizontal-border-3.png");
const eventWorkZone: any = require("./../../../../assets/images/event/territories/work-zone.png");
const eventBuyIcon1: any = require("./../../../../assets/images/event/icons/event-buy-icon-1.png");
const eventBuyIcon2: any = require("./../../../../assets/images/event/icons/event-buy-icon-2.png");
const eventBuyIcon3: any = require("./../../../../assets/images/event/icons/event-buy-icon-3.png");
const eventBuyIcon4: any = require("./../../../../assets/images/event/icons/event-buy-icon-4.png");
const eventBuyIcon5: any = require("./../../../../assets/images/event/icons/event-buy-icon-5.png");
const eventBuyIcon6: any = require("./../../../../assets/images/event/icons/event-buy-icon-6.png");
const eventBuyIcon7: any = require("./../../../../assets/images/event/icons/event-buy-icon-7.png");
const eventBuyIcon8: any = require("./../../../../assets/images/event/icons/event-buy-icon-8.png");
const eventBuyIcon9: any = require("./../../../../assets/images/event/icons/event-buy-icon-9.png");
const eventBuyIcon10: any = require("./../../../../assets/images/event/icons/event-buy-icon-10.png");
const eventBuyIcon11: any = require("./../../../../assets/images/event/icons/event-buy-icon-11.png");
const eventBuyIcon12: any = require("./../../../../assets/images/event/icons/event-buy-icon-12.png");
const eventBuyIcon13: any = require("./../../../../assets/images/event/icons/event-buy-icon-13.png");
const eventBuyIcon14: any = require("./../../../../assets/images/event/icons/event-buy-icon-14.png");
const eventBuyIcon15: any = require("./../../../../assets/images/event/icons/event-buy-icon-15.png");
const eventBuyIcon16: any = require("./../../../../assets/images/event/icons/event-buy-icon-16.png");
const eventBuyIcon17: any = require("./../../../../assets/images/event/icons/event-buy-icon-17.png");
const eventBuyIcon18: any = require("./../../../../assets/images/event/icons/event-buy-icon-18.png");
const eventBuyIcon19: any = require("./../../../../assets/images/event/icons/event-buy-icon-19.png");
const eventBuyIcon20: any = require("./../../../../assets/images/event/icons/event-buy-icon-20.png");
const eventBuyIcon21: any = require("./../../../../assets/images/event/icons/event-buy-icon-21.png");
const eventBuyIcon22: any = require("./../../../../assets/images/event/icons/event-buy-icon-22.png");
const eventBuyIcon23: any = require("./../../../../assets/images/event/icons/event-buy-icon-23.png");
const eventBuyIcon24: any = require("./../../../../assets/images/event/icons/event-buy-icon-24.png");
const eventBuyIcon25: any = require("./../../../../assets/images/event/icons/event-buy-icon-25.png");
const eventBuyIcon26: any = require("./../../../../assets/images/event/icons/event-buy-icon-26.png");
const eventBuyIcon27: any = require("./../../../../assets/images/event/icons/event-buy-icon-27.png");
const eventBuyIcon28: any = require("./../../../../assets/images/event/icons/event-buy-icon-28.png");
const eventBuyIcon29: any = require("./../../../../assets/images/event/icons/event-buy-icon-29.png");
const eventBuyIcon30: any = require("./../../../../assets/images/event/icons/event-buy-icon-30.png");
const eventBuyIcon31: any = require("./../../../../assets/images/event/icons/event-buy-icon-31.png");
const eventBuyIcon32: any = require("./../../../../assets/images/event/icons/event-buy-icon-32.png");
const eventBuyIcon33: any = require("./../../../../assets/images/event/icons/event-buy-icon-33.png");
const eventBuyIcon34: any = require("./../../../../assets/images/event/icons/event-buy-icon-34.png");
const eventBuyIcon35: any = require("./../../../../assets/images/event/icons/event-buy-icon-35.png");
const eventBuyIcon36: any = require("./../../../../assets/images/event/icons/event-buy-icon-36.png");
const eventBuyIcon37: any = require("./../../../../assets/images/event/icons/event-buy-icon-37.png");
const eventBuyIcon38: any = require("./../../../../assets/images/event/icons/event-buy-icon-38.png");
const eventBuyIcon39: any = require("./../../../../assets/images/event/icons/event-buy-icon-39.png");
const eventBuyIcon40: any = require("./../../../../assets/images/event/icons/event-buy-icon-40.png");
const eventBuyIcon41: any = require("./../../../../assets/images/event/icons/event-buy-icon-41.png");
const eventBuyIcon42: any = require("./../../../../assets/images/event/icons/event-buy-icon-42.png");
const eventBuyIcon43: any = require("./../../../../assets/images/event/icons/event-buy-icon-43.png");
const eventBuyIcon44: any = require("./../../../../assets/images/event/icons/event-buy-icon-44.png");
const eventBuyIcon45: any = require("./../../../../assets/images/event/icons/event-buy-icon-45.png");
const eventBuyIcon46: any = require("./../../../../assets/images/event/icons/event-buy-icon-46.png");
const eventBuyIcon47: any = require("./../../../../assets/images/event/icons/event-buy-icon-47.png");
const eventBuyIcon48: any = require("./../../../../assets/images/event/icons/event-buy-icon-48.png");
const eventBuyIcon49: any = require("./../../../../assets/images/event/icons/event-buy-icon-49.png");
const eventBuyIcon50: any = require("./../../../../assets/images/event/icons/event-buy-icon-50.png");
const eventBuyIcon51: any = require("./../../../../assets/images/event/icons/event-buy-icon-51.png");
const eventBuyIcon52: any = require("./../../../../assets/images/event/icons/event-buy-icon-52.png");
const eventBuyIcon53: any = require("./../../../../assets/images/event/icons/event-buy-icon-53.png");
const eventBuyIcon54: any = require("./../../../../assets/images/event/icons/event-buy-icon-54.png");
const eventBuyIcon55: any = require("./../../../../assets/images/event/icons/event-buy-icon-55.png");
const eventBuyIcon56: any = require("./../../../../assets/images/event/icons/event-buy-icon-56.png");
const eventBuyIcon57: any = require("./../../../../assets/images/event/icons/event-buy-icon-57.png");
const eventBuyIcon58: any = require("./../../../../assets/images/event/icons/event-buy-icon-58.png");
const eventBuyIcon59: any = require("./../../../../assets/images/event/icons/event-buy-icon-59.png");
const eventBuyIcon60: any = require("./../../../../assets/images/event/icons/event-buy-icon-60.png");
const eventBuyIcon61: any = require("./../../../../assets/images/event/icons/event-buy-icon-61.png");
const eventBuyIcon62: any = require("./../../../../assets/images/event/icons/event-buy-icon-62.png");
const eventBuyIcon63: any = require("./../../../../assets/images/event/icons/event-buy-icon-63.png");
const eventBuyIcon64: any = require("./../../../../assets/images/event/icons/event-buy-icon-64.png");
const eventBuyIcon65: any = require("./../../../../assets/images/event/icons/event-buy-icon-65.png");
const eventBuyIcon66: any = require("./../../../../assets/images/event/icons/event-buy-icon-66.png");
const eventBuyIcon67: any = require("./../../../../assets/images/event/icons/event-buy-icon-67.png");
const eventBuyIcon68: any = require("./../../../../assets/images/event/icons/event-buy-icon-68.png");
const eventBuyIcon69: any = require("./../../../../assets/images/event/icons/event-buy-icon-69.png");
const eventBuyIcon70: any = require("./../../../../assets/images/event/icons/event-buy-icon-70.png");
const eventBuyIcon71: any = require("./../../../../assets/images/event/icons/event-buy-icon-71.png");
const eventBuyIcon72: any = require("./../../../../assets/images/event/icons/event-buy-icon-72.png");
const eventBuyIcon73: any = require("./../../../../assets/images/event/icons/event-buy-icon-73.png");
const eventBuyIcon74: any = require("./../../../../assets/images/event/icons/event-buy-icon-74.png");
const eventBuyIcon75: any = require("./../../../../assets/images/event/icons/event-buy-icon-75.png");
const eventBuyIcon76: any = require("./../../../../assets/images/event/icons/event-buy-icon-76.png");
const eventBuyIcon77: any = require("./../../../../assets/images/event/icons/event-buy-icon-77.png");
const eventBuyIcon78: any = require("./../../../../assets/images/event/icons/event-buy-icon-78.png");
const eventBuyIcon79: any = require("./../../../../assets/images/event/icons/event-buy-icon-79.png");
const eventBuyIcon80: any = require("./../../../../assets/images/event/icons/event-buy-icon-80.png");
const eventBuyIcon81: any = require("./../../../../assets/images/event/icons/event-buy-icon-81.png");
const eventBuyIcon82: any = require("./../../../../assets/images/event/icons/event-buy-icon-82.png");
const eventBuyIcon83: any = require("./../../../../assets/images/event/icons/event-buy-icon-83.png");
const eventBuyIcon84: any = require("./../../../../assets/images/event/icons/event-buy-icon-84.png");
const eventBuyIcon85: any = require("./../../../../assets/images/event/icons/event-buy-icon-85.png");
const eventBuyIcon86: any = require("./../../../../assets/images/event/icons/event-buy-icon-86.png");
const eventBuyIcon87: any = require("./../../../../assets/images/event/icons/event-buy-icon-87.png");
const eventBuyIcon88: any = require("./../../../../assets/images/event/icons/event-buy-icon-88.png");
const eventBuyIcon89: any = require("./../../../../assets/images/event/icons/event-buy-icon-89.png");
const eventBuyIcon90: any = require("./../../../../assets/images/event/icons/event-buy-icon-90.png");
const eventBuyIcon91: any = require("./../../../../assets/images/event/icons/event-buy-icon-91.png");
const eventBuyIcon92: any = require("./../../../../assets/images/event/icons/event-buy-icon-92.png");
const eventBuyIcon93: any = require("./../../../../assets/images/event/icons/event-buy-icon-93.png");
const eventBuyIcon94: any = require("./../../../../assets/images/event/icons/event-buy-icon-94.png");
const eventBuyIcon95: any = require("./../../../../assets/images/event/icons/event-buy-icon-95.png");
const eventBuyIcon96: any = require("./../../../../assets/images/event/icons/event-buy-icon-96.png");
const eventBuyIcon97: any = require("./../../../../assets/images/event/icons/event-buy-icon-97.png");
const eventBuyIcon98: any = require("./../../../../assets/images/event/icons/event-buy-icon-98.png");
const eventBuyIcon99: any = require("./../../../../assets/images/event/icons/event-buy-icon-99.png");
const eventBuyIcon100: any = require("./../../../../assets/images/event/icons/event-buy-icon-100.png");
const animal1: any = require("./../../../../assets/images/event/animal/animal1.png");
const animal2: any = require("./../../../../assets/images/event/animal/animal2.png");
const animal3: any = require("./../../../../assets/images/event/animal/animal3.png");
const animal4: any = require("./../../../../assets/images/event/animal/animal4.png");
const animal5: any = require("./../../../../assets/images/event/animal/animal5.png");
const animal6: any = require("./../../../../assets/images/event/animal/animal6.png");
const animal7: any = require("./../../../../assets/images/event/animal/animal7.png");
const animal8: any = require("./../../../../assets/images/event/animal/animal8.png");
const animal9: any = require("./../../../../assets/images/event/animal/animal9.png");
const animal10: any = require("./../../../../assets/images/event/animal/animal10.png");
const animal11: any = require("./../../../../assets/images/event/animal/animal11.png");
const animal12: any = require("./../../../../assets/images/event/animal/animal12.png");
const animal13: any = require("./../../../../assets/images/event/animal/animal13.png");
const animal14: any = require("./../../../../assets/images/event/animal/animal14.png");
const animal15: any = require("./../../../../assets/images/event/animal/animal15.png");
const animal16: any = require("./../../../../assets/images/event/animal/animal16.png");
const animal17: any = require("./../../../../assets/images/event/animal/animal17.png");
const animal18: any = require("./../../../../assets/images/event/animal/animal18.png");
const animal19: any = require("./../../../../assets/images/event/animal/animal19.png");
const animal20: any = require("./../../../../assets/images/event/animal/animal20.png");
const animal21: any = require("./../../../../assets/images/event/animal/animal21.png");
const animal22: any = require("./../../../../assets/images/event/animal/animal22.png");
const animal23: any = require("./../../../../assets/images/event/animal/animal23.png");
const animal24: any = require("./../../../../assets/images/event/animal/animal24.png");
const animal25: any = require("./../../../../assets/images/event/animal/animal25.png");
const animal26: any = require("./../../../../assets/images/event/animal/animal26.png");
const animal27: any = require("./../../../../assets/images/event/animal/animal27.png");
const animal28: any = require("./../../../../assets/images/event/animal/animal28.png");
const animal29: any = require("./../../../../assets/images/event/animal/animal29.png");
const animal30: any = require("./../../../../assets/images/event/animal/animal30.png");
const animal31: any = require("./../../../../assets/images/event/animal/animal31.png");
const animal32: any = require("./../../../../assets/images/event/animal/animal32.png");
const animal33: any = require("./../../../../assets/images/event/animal/animal33.png");
const animal34: any = require("./../../../../assets/images/event/animal/animal34.png");
const animal35: any = require("./../../../../assets/images/event/animal/animal35.png");
const animal36: any = require("./../../../../assets/images/event/animal/animal36.png");
const animal37: any = require("./../../../../assets/images/event/animal/animal37.png");
const animal38: any = require("./../../../../assets/images/event/animal/animal38.png");
const animal39: any = require("./../../../../assets/images/event/animal/animal39.png");
const animal40: any = require("./../../../../assets/images/event/animal/animal40.png");
const animal41: any = require("./../../../../assets/images/event/animal/animal41.png");
const animal42: any = require("./../../../../assets/images/event/animal/animal42.png");
const animal43: any = require("./../../../../assets/images/event/animal/animal43.png");
const animal44: any = require("./../../../../assets/images/event/animal/animal44.png");
const animal45: any = require("./../../../../assets/images/event/animal/animal45.png");
const animal46: any = require("./../../../../assets/images/event/animal/animal46.png");
const animal47: any = require("./../../../../assets/images/event/animal/animal47.png");
const animal48: any = require("./../../../../assets/images/event/animal/animal48.png");
const animal49: any = require("./../../../../assets/images/event/animal/animal49.png");
const animal50: any = require("./../../../../assets/images/event/animal/animal50.png");
const animal51: any = require("./../../../../assets/images/event/animal/animal51.png");
const animal52: any = require("./../../../../assets/images/event/animal/animal52.png");
const animal53: any = require("./../../../../assets/images/event/animal/animal53.png");
const animal54: any = require("./../../../../assets/images/event/animal/animal54.png");
const animal55: any = require("./../../../../assets/images/event/animal/animal55.png");
const animal56: any = require("./../../../../assets/images/event/animal/animal56.png");
const animal57: any = require("./../../../../assets/images/event/animal/animal57.png");
const animal58: any = require("./../../../../assets/images/event/animal/animal58.png");
const animal59: any = require("./../../../../assets/images/event/animal/animal59.png");
const animal60: any = require("./../../../../assets/images/event/animal/animal60.png");
const animal61: any = require("./../../../../assets/images/event/animal/animal61.png");
const animal62: any = require("./../../../../assets/images/event/animal/animal62.png");
const animal63: any = require("./../../../../assets/images/event/animal/animal63.png");
const animal64: any = require("./../../../../assets/images/event/animal/animal64.png");
const animal65: any = require("./../../../../assets/images/event/animal/animal65.png");
const animal66: any = require("./../../../../assets/images/event/animal/animal66.png");
const animal67: any = require("./../../../../assets/images/event/animal/animal67.png");
const animal68: any = require("./../../../../assets/images/event/animal/animal68.png");
const animal69: any = require("./../../../../assets/images/event/animal/animal69.png");
const animal70: any = require("./../../../../assets/images/event/animal/animal70.png");
const animal71: any = require("./../../../../assets/images/event/animal/animal71.png");
const animal72: any = require("./../../../../assets/images/event/animal/animal72.png");
const animal73: any = require("./../../../../assets/images/event/animal/animal73.png");
const animal74: any = require("./../../../../assets/images/event/animal/animal74.png");
const animal75: any = require("./../../../../assets/images/event/animal/animal75.png");
const animal76: any = require("./../../../../assets/images/event/animal/animal76.png");
const animal77: any = require("./../../../../assets/images/event/animal/animal77.png");
const animal78: any = require("./../../../../assets/images/event/animal/animal78.png");
const animal79: any = require("./../../../../assets/images/event/animal/animal79.png");
const animal80: any = require("./../../../../assets/images/event/animal/animal80.png");
const animal81: any = require("./../../../../assets/images/event/animal/animal81.png");
const animal82: any = require("./../../../../assets/images/event/animal/animal82.png");
const animal83: any = require("./../../../../assets/images/event/animal/animal83.png");
const animal84: any = require("./../../../../assets/images/event/animal/animal84.png");
const animal85: any = require("./../../../../assets/images/event/animal/animal85.png");
const animal86: any = require("./../../../../assets/images/event/animal/animal86.png");
const animal87: any = require("./../../../../assets/images/event/animal/animal87.png");
const animal88: any = require("./../../../../assets/images/event/animal/animal88.png");
const animal89: any = require("./../../../../assets/images/event/animal/animal89.png");
const animal90: any = require("./../../../../assets/images/event/animal/animal90.png");
const animal91: any = require("./../../../../assets/images/event/animal/animal91.png");
const animal92: any = require("./../../../../assets/images/event/animal/animal92.png");
const animal93: any = require("./../../../../assets/images/event/animal/animal93.png");
const animal94: any = require("./../../../../assets/images/event/animal/animal94.png");
const animal95: any = require("./../../../../assets/images/event/animal/animal95.png");
const animal96: any = require("./../../../../assets/images/event/animal/animal96.png");
const animal97: any = require("./../../../../assets/images/event/animal/animal97.png");
const animal98: any = require("./../../../../assets/images/event/animal/animal98.png");
const animal99: any = require("./../../../../assets/images/event/animal/animal99.png");
const animal100: any = require("./../../../../assets/images/event/animal/animal100.png");
const cloud: any = require("./../../../../assets/images/event/cloud.png");
const resource: any = require("./../../../../assets/images/event/resource.png");
const disableAnimal: any = require("./../../../../assets/images/event/animal/disable-animal.png");
const merging: any = require("./../../../../assets/images/event/territories/merging.png");
const tent: any = require("./../../../../assets/images/event/territories/tent.png");
const flower1: any = require("./../../../../assets/images/event/territories/flower1.png");
const flower2: any = require("./../../../../assets/images/event/territories/flower2.png");
const flower3: any = require("./../../../../assets/images/event/territories/flower3.png");
const flower4: any = require("./../../../../assets/images/event/territories/flower4.png");
const confetti1: any = require("./../../../../assets/images/event/territories/confetti1.png");
const confetti2: any = require("./../../../../assets/images/event/territories/confetti2.png");
const confetti3: any = require("./../../../../assets/images/event/territories/confetti3.png");
const confetti4: any = require("./../../../../assets/images/event/territories/confetti4.png");
const confetti5: any = require("./../../../../assets/images/event/territories/confetti5.png");
const confetti6: any = require("./../../../../assets/images/event/territories/confetti6.png");
const confetti7: any = require("./../../../../assets/images/event/territories/confetti7.png");
const confetti8: any = require("./../../../../assets/images/event/territories/confetti8.png");
const firework1: any = require("./../../../../assets/images/animations/firework1.png");
const firework2: any = require("./../../../../assets/images/animations/firework2.png");
const firework3: any = require("./../../../../assets/images/animations/firework3.png");
const fireworkBg: any = require("./../../../../assets/images/animations/fireworkBg.png");

let doubleFeedBoost: any = require("./../../../../assets/images/icons/double-feed-boost.png");
let eventFeedBoostMini: any = require("./../../../../assets/images/event/icons/event-feed-boost-mini.png");

// Автопрогресс эвентовой фермы
let autoprogressBG: any = require("./../../../../assets/images/event/modal/autoprogress-bg.png");
let purpleBtn: any = require("./../../../../assets/images/event/modal/purple-btn.png");

// Окно рейтингов
let ratingBG: any = require("./../../../../assets/images/event/modal/rating-bg.png");
let ratingRulesBtn: any = require("./../../../../assets/images/event/modal/rating-rules-btn.png");
let ratingPriseBtn: any = require("./../../../../assets/images/event/modal/rating-price-btn.png");
let ratingPrisePlaces: any = require("./../../../../assets/images/event/modal/rating-places.png");
let eventTutorMerging: any = require("./../../../../assets/images/event/tutor-merging.png");

let eventTerritoryBtn: any = require("./../../../../assets/images/event/territories/buy-button.png");
let starterpackIcon: any = require("./../../../../assets/images/icons/starterpack.png");

const notificationBg: string = require('../../../../assets/images/icons/notificator.png');
class EventPreload extends Phaser.Scene {

  public lang: string; // индекс языка
  public state: Istate;
  public userReady: boolean;
  public loadingReady: boolean;
  public socket: boolean;
  public loadTime: number;
  public startTime: number;
  public loadingScreen = loadingScreen.bind(this);
  public loadData = loadData.bind(this);

  constructor() {
    super('UnicornPreload');
  }

  
  public init(state: Istate): void {

    this.state  = state;
    this.userReady = false;
    this.loadingReady = false;
    this.loadUser();
    this.state.farm = 'Unicorn';
    this.startTime = Math.round(new Date().getTime() / 1000);

    if (!this.state.socket) {
      this.socket = true;
      this.loadTime = Math.round(new Date().getTime() / 1000);
      this.state.socket = new Socket(this.state);
    }

  }
  
  public preload(): void {
    this.loadingScreen('Unicorn');
    this.load.image('bg', bg);
    this.load.image('event-top', top);
    this.load.image('event-bottom', bottom);
    this.load.image('topbar-event', topbar);
    this.load.image('tabbar', tabbar);
    this.load.image('event-collector', resourceCollector);
    this.load.image('shop', shop);
    this.load.image('map-icon', mapIcon);
    this.load.image('sandwich', sandwich);
    this.load.image('sandwich-close', sandwichClose);
    this.load.image('profile', profile);
    this.load.image('chat', chat);
    this.load.image('event-for-buying', forBuying);
    this.load.image('lock-event-territory', lockTerritory);
    this.load.image('merging-animation', mergingAnimation);
    this.load.image('unicornCoin', coin);
    this.load.image('diamond', diamond);
    this.load.image('lock', lock);
    this.load.image('gift', gift);
    this.load.image('offline', offline);
    this.load.image('tutor-btn', tutorBtn);
    this.load.image('heart', heart);
    this.load.image('calendar', calendar);
    this.load.image('ad-icon', adIcon);
    this.load.image('bg-ad', bgAd);
    this.load.image('big-btn-green', bigButtonGreen);
    this.load.image('event-grass', grass);
    this.load.image('event-forest-1', forest1);
    this.load.image('event-forest-2', forest2);
    this.load.image('event-forest-3', forest3);
    this.load.image('event-forest-4', forest4);
    this.load.image('event-forest-5', forest5);
    this.load.image('event-forest-6', forest6);
    this.load.image('unicorn-vertical-border', verticalBorder);
    this.load.image('unicorn-horizontal-border-1', horizontalBorder1);
    this.load.image('unicorn-horizontal-border-2', horizontalBorder2);
    this.load.image('unicorn-horizontal-border-3', horizontalBorder3);
    this.load.image('event-work-zone', eventWorkZone);
    this.load.image('event-buy-icon-1', eventBuyIcon1);
    this.load.image('event-buy-icon-2', eventBuyIcon2);
    this.load.image('event-buy-icon-3', eventBuyIcon3);
    this.load.image('event-buy-icon-4', eventBuyIcon4);
    this.load.image('event-buy-icon-5', eventBuyIcon5);
    this.load.image('event-buy-icon-6', eventBuyIcon6);
    this.load.image('event-buy-icon-7', eventBuyIcon7);
    this.load.image('event-buy-icon-8', eventBuyIcon8);
    this.load.image('event-buy-icon-9', eventBuyIcon9);
    this.load.image('event-buy-icon-10', eventBuyIcon10);
    this.load.image('event-buy-icon-11', eventBuyIcon11);
    this.load.image('event-buy-icon-12', eventBuyIcon12);
    this.load.image('event-buy-icon-13', eventBuyIcon13);
    this.load.image('event-buy-icon-14', eventBuyIcon14);
    this.load.image('event-buy-icon-15', eventBuyIcon15);
    this.load.image('event-buy-icon-16', eventBuyIcon16);
    this.load.image('event-buy-icon-17', eventBuyIcon17);
    this.load.image('event-buy-icon-18', eventBuyIcon18);
    this.load.image('event-buy-icon-19', eventBuyIcon19);
    this.load.image('event-buy-icon-20', eventBuyIcon20);
    this.load.image('event-buy-icon-21', eventBuyIcon21);
    this.load.image('event-buy-icon-22', eventBuyIcon22);
    this.load.image('event-buy-icon-23', eventBuyIcon23);
    this.load.image('event-buy-icon-24', eventBuyIcon24);
    this.load.image('event-buy-icon-25', eventBuyIcon25);
    this.load.image('event-buy-icon-26', eventBuyIcon26);
    this.load.image('event-buy-icon-27', eventBuyIcon27);
    this.load.image('event-buy-icon-28', eventBuyIcon28);
    this.load.image('event-buy-icon-29', eventBuyIcon29);
    this.load.image('event-buy-icon-30', eventBuyIcon30);
    this.load.image('event-buy-icon-31', eventBuyIcon31);
    this.load.image('event-buy-icon-32', eventBuyIcon32);
    this.load.image('event-buy-icon-33', eventBuyIcon33);
    this.load.image('event-buy-icon-34', eventBuyIcon34);
    this.load.image('event-buy-icon-35', eventBuyIcon35);
    this.load.image('event-buy-icon-36', eventBuyIcon36);
    this.load.image('event-buy-icon-37', eventBuyIcon37);
    this.load.image('event-buy-icon-38', eventBuyIcon38);
    this.load.image('event-buy-icon-39', eventBuyIcon39);
    this.load.image('event-buy-icon-40', eventBuyIcon40);
    this.load.image('event-buy-icon-41', eventBuyIcon41);
    this.load.image('event-buy-icon-42', eventBuyIcon42);
    this.load.image('event-buy-icon-43', eventBuyIcon43);
    this.load.image('event-buy-icon-44', eventBuyIcon44);
    this.load.image('event-buy-icon-45', eventBuyIcon45);
    this.load.image('event-buy-icon-46', eventBuyIcon46);
    this.load.image('event-buy-icon-47', eventBuyIcon47);
    this.load.image('event-buy-icon-48', eventBuyIcon48);
    this.load.image('event-buy-icon-49', eventBuyIcon49);
    this.load.image('event-buy-icon-50', eventBuyIcon50);
    this.load.image('event-buy-icon-51', eventBuyIcon51);
    this.load.image('event-buy-icon-52', eventBuyIcon52);
    this.load.image('event-buy-icon-53', eventBuyIcon53);
    this.load.image('event-buy-icon-54', eventBuyIcon54);
    this.load.image('event-buy-icon-55', eventBuyIcon55);
    this.load.image('event-buy-icon-56', eventBuyIcon56);
    this.load.image('event-buy-icon-57', eventBuyIcon57);
    this.load.image('event-buy-icon-58', eventBuyIcon58);
    this.load.image('event-buy-icon-59', eventBuyIcon59);
    this.load.image('event-buy-icon-60', eventBuyIcon60);
    this.load.image('event-buy-icon-61', eventBuyIcon61);
    this.load.image('event-buy-icon-62', eventBuyIcon62);
    this.load.image('event-buy-icon-63', eventBuyIcon63);
    this.load.image('event-buy-icon-64', eventBuyIcon64);
    this.load.image('event-buy-icon-65', eventBuyIcon65);
    this.load.image('event-buy-icon-66', eventBuyIcon66);
    this.load.image('event-buy-icon-67', eventBuyIcon67);
    this.load.image('event-buy-icon-68', eventBuyIcon68);
    this.load.image('event-buy-icon-69', eventBuyIcon69);
    this.load.image('event-buy-icon-70', eventBuyIcon70);
    this.load.image('event-buy-icon-70', eventBuyIcon70);
    this.load.image('event-buy-icon-71', eventBuyIcon71);
    this.load.image('event-buy-icon-72', eventBuyIcon72);
    this.load.image('event-buy-icon-73', eventBuyIcon73);
    this.load.image('event-buy-icon-74', eventBuyIcon74);
    this.load.image('event-buy-icon-75', eventBuyIcon75);
    this.load.image('event-buy-icon-76', eventBuyIcon76);
    this.load.image('event-buy-icon-77', eventBuyIcon77);
    this.load.image('event-buy-icon-78', eventBuyIcon78);
    this.load.image('event-buy-icon-79', eventBuyIcon79);
    this.load.image('event-buy-icon-80', eventBuyIcon80);
    this.load.image('event-buy-icon-81', eventBuyIcon81);
    this.load.image('event-buy-icon-82', eventBuyIcon82);
    this.load.image('event-buy-icon-83', eventBuyIcon83);
    this.load.image('event-buy-icon-84', eventBuyIcon84);
    this.load.image('event-buy-icon-85', eventBuyIcon85);
    this.load.image('event-buy-icon-86', eventBuyIcon86);
    this.load.image('event-buy-icon-87', eventBuyIcon87);
    this.load.image('event-buy-icon-88', eventBuyIcon88);
    this.load.image('event-buy-icon-89', eventBuyIcon89);
    this.load.image('event-buy-icon-90', eventBuyIcon90);
    this.load.image('event-buy-icon-91', eventBuyIcon91);
    this.load.image('event-buy-icon-92', eventBuyIcon92);
    this.load.image('event-buy-icon-93', eventBuyIcon93);
    this.load.image('event-buy-icon-94', eventBuyIcon94);
    this.load.image('event-buy-icon-95', eventBuyIcon95);
    this.load.image('event-buy-icon-96', eventBuyIcon96);
    this.load.image('event-buy-icon-97', eventBuyIcon97);
    this.load.image('event-buy-icon-98', eventBuyIcon98);
    this.load.image('event-buy-icon-99', eventBuyIcon99);
    this.load.image('event-buy-icon-100', eventBuyIcon100);
    this.load.image('disable-animal', disableAnimal);
    this.load.image('animal1', animal1);
    this.load.image('animal2', animal2);
    this.load.image('animal3', animal3);
    this.load.image('animal4', animal4);
    this.load.image('animal5', animal5);
    this.load.image('animal6', animal6);
    this.load.image('animal7', animal7);
    this.load.image('animal8', animal8);
    this.load.image('animal9', animal9);
    this.load.image('animal10', animal10);
    this.load.image('animal11', animal11);
    this.load.image('animal12', animal12);
    this.load.image('animal13', animal13);
    this.load.image('animal14', animal14);
    this.load.image('animal15', animal15);
    this.load.image('animal16', animal16);
    this.load.image('animal17', animal17);
    this.load.image('animal18', animal18);
    this.load.image('animal19', animal19);
    this.load.image('animal20', animal20);
    this.load.image('animal21', animal21);
    this.load.image('animal22', animal22);
    this.load.image('animal23', animal23);
    this.load.image('animal24', animal24);
    this.load.image('animal25', animal25);
    this.load.image('animal26', animal26);
    this.load.image('animal27', animal27);
    this.load.image('animal28', animal28);
    this.load.image('animal29', animal29);
    this.load.image('animal30', animal30);
    this.load.image('animal31', animal31);
    this.load.image('animal32', animal32);
    this.load.image('animal33', animal33);
    this.load.image('animal34', animal34);
    this.load.image('animal35', animal35);
    this.load.image('animal36', animal36);
    this.load.image('animal37', animal37);
    this.load.image('animal38', animal38);
    this.load.image('animal39', animal39);
    this.load.image('animal40', animal40);
    this.load.image('animal41', animal41);
    this.load.image('animal42', animal42);
    this.load.image('animal43', animal43);
    this.load.image('animal44', animal44);
    this.load.image('animal45', animal45);
    this.load.image('animal46', animal46);
    this.load.image('animal47', animal47);
    this.load.image('animal48', animal48);
    this.load.image('animal49', animal49);
    this.load.image('animal50', animal50);
    this.load.image('animal51', animal51);
    this.load.image('animal52', animal52);
    this.load.image('animal53', animal53);
    this.load.image('animal54', animal54);
    this.load.image('animal55', animal55);
    this.load.image('animal56', animal56);
    this.load.image('animal57', animal57);
    this.load.image('animal58', animal58);
    this.load.image('animal59', animal59);
    this.load.image('animal60', animal60);
    this.load.image('animal61', animal61);
    this.load.image('animal62', animal62);
    this.load.image('animal63', animal63);
    this.load.image('animal64', animal64);
    this.load.image('animal65', animal65);
    this.load.image('animal66', animal66);
    this.load.image('animal67', animal67);
    this.load.image('animal68', animal68);
    this.load.image('animal69', animal69);
    this.load.image('animal70', animal70);
    this.load.image('animal71', animal71);
    this.load.image('animal72', animal72);
    this.load.image('animal73', animal73);
    this.load.image('animal74', animal74);
    this.load.image('animal75', animal75);
    this.load.image('animal76', animal76);
    this.load.image('animal77', animal77);
    this.load.image('animal78', animal78);
    this.load.image('animal79', animal79);
    this.load.image('animal80', animal80);
    this.load.image('animal81', animal81);
    this.load.image('animal82', animal82);
    this.load.image('animal83', animal83);
    this.load.image('animal84', animal84);
    this.load.image('animal85', animal85);
    this.load.image('animal86', animal86);
    this.load.image('animal87', animal87);
    this.load.image('animal88', animal88);
    this.load.image('animal89', animal89);
    this.load.image('animal90', animal90);
    this.load.image('animal91', animal91);
    this.load.image('animal92', animal92);
    this.load.image('animal93', animal93);
    this.load.image('animal94', animal94);
    this.load.image('animal95', animal95);
    this.load.image('animal96', animal96);
    this.load.image('animal97', animal97);
    this.load.image('animal98', animal98);
    this.load.image('animal99', animal99);
    this.load.image('animal100', animal100);
    this.load.image('cloud', cloud);
    this.load.image('event-resource', resource);
    this.load.image('pixel', pixel);
    this.load.image('unicorn-merging', merging);
    this.load.image('unicorn-tent', tent);
    this.load.image('flower1', flower1);
    this.load.image('flower2', flower2);
    this.load.image('flower3', flower3);
    this.load.image('flower4', flower4);
    this.load.image('confetti1', confetti1);
    this.load.image('confetti2', confetti2);
    this.load.image('confetti3', confetti3);
    this.load.image('confetti4', confetti4);
    this.load.image('confetti5', confetti5);
    this.load.image('confetti6', confetti6);
    this.load.image('confetti7', confetti7);
    this.load.image('confetti8', confetti8);
    this.load.image('double-feed-boost', doubleFeedBoost);
    this.load.image('event-feed-boost-mini', eventFeedBoostMini);
    this.load.image('autoprogress-bg', autoprogressBG);
    this.load.image('purple-btn', purpleBtn);
    this.load.image('rating-bg', ratingBG);
    this.load.image('rating-rules-btn', ratingRulesBtn);
    this.load.image('rating-price-btn', ratingPriseBtn);
    this.load.image('rating-places', ratingPrisePlaces);
    this.load.image('event-tutor-merging',eventTutorMerging);
    this.load.image('event-territory-btn', eventTerritoryBtn);
    this.load.image('starterpack-icon', starterpackIcon);
    this.load.image('firework1', firework1);
    this.load.image('firework2', firework2);
    this.load.image('firework3', firework3);
    this.load.image('fireworkBg', fireworkBg);
    this.load.image('notification-bg', notificationBg);

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
        
        const Amplitude:Amplitude = this.state.amplitude;
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
    }
  }

  
  public loadUser(): void {
    axios.post(process.env.API + '/loadData', {
      hash: this.state.user.hash
    }).then((response) => {
      this.state.farm = 'Unicorn';
      this.loadData(response);
      this.state.offlineTime = response.data.progress.eventOfflineTime;
      this.userReady = true;
      this.state.shopNotificationCount = [0, 0, 0, 0];
    })
  }
}

export default EventPreload;
