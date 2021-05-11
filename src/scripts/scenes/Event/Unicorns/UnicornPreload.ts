import axios from 'axios';
import Socket from '../../../Socket';
import { loadingScreen } from '../../../general/basic';

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

const testCollector: IcollectorSettings[] = [
  {
    level: 1,
    chapter: 1,
    time: 3,
    speed: 0.8,
    price: 0,
    diamonds: false
  },
  {
    level: 2,
    chapter: 1,
    time: 4,
    speed: 0.8,
    price: 100,
    diamonds: false
  },
  {
    level: 3,
    chapter: 1,
    time: 5,
    speed: 0.8,
    price: 200,
    diamonds: false
  },
  {
    level: 4,
    chapter: 1,
    time: 6,
    speed: 0.8,
    price: 300,
    diamonds: false
  },
  {
    level: 5,
    chapter: 1,
    time: 6,
    speed: 0.9,
    price: 5,
    diamonds: true
  },
  {
    level: 6,
    chapter: 1,
    time: 7,
    speed: 0.9,
    price: 400,
    diamonds: false
  },
  {
    level: 7,
    chapter: 1,
    time: 8,
    speed: 0.9,
    price: 500,
    diamonds: false
  },
  {
    level: 8,
    chapter: 1,
    time: 9,
    speed: 0.9,
    price: 600,
    diamonds: false
  },
  {
    level: 9,
    chapter: 1,
    time: 10,
    speed: 0.9,
    price: 700,
    diamonds: false
  },
  {
    level: 10,
    chapter: 1,
    time: 10,
    speed: 1,
    price: 15,
    diamonds: true
  },
  {
    level: 11,
    chapter: 2,
    time: 11,
    speed: 1,
    price: 1000,
    diamonds: false
  },
  {
    level: 12,
    chapter: 2,
    time: 12,
    speed: 1,
    price: 1250,
    diamonds: false
  },
  {
    level: 13,
    chapter: 2,
    time: 13,
    speed: 1,
    price: 1600,
    diamonds: false
  },
  {
    level: 14,
    chapter: 2,
    time: 14,
    speed: 1,
    price: 1900,
    diamonds: false
  },
  {
    level: 15,
    chapter: 2,
    time: 14,
    speed: 1.1,
    price: 25,
    diamonds: true
  },
  {
    level: 16,
    chapter: 2,
    time: 15,
    speed: 1.1,
    price: 2500,
    diamonds: false
  },
  {
    level: 17,
    chapter: 2,
    time: 16,
    speed: 1.1,
    price: 3000,
    diamonds: false
  },
  {
    level: 18,
    chapter: 2,
    time: 17,
    speed: 1.1,
    price: 3500,
    diamonds: false
  },
  {
    level: 19,
    chapter: 2,
    time: 18,
    speed: 1.1,
    price: 4000,
    diamonds: false
  },
  {
    level: 20,
    chapter: 2,
    time: 18,
    speed: 1.2,
    price: 40,
    diamonds: true
  },
  {
    level: 21,
    chapter: 3,
    time: 19,
    speed: 1.2,
    price: 10000,
    diamonds: false
  },
  {
    level: 22,
    chapter: 3,
    time: 20,
    speed: 1.2,
    price: 12000,
    diamonds: false
  },
  {
    level: 23,
    chapter: 3,
    time: 21,
    speed: 1200,
    price: 15000,
    diamonds: false
  },
  {
    level: 24,
    chapter: 3,
    time: 22,
    speed: 1.2,
    price: 19000,
    diamonds: false
  },
  {
    level: 25,
    chapter: 3,
    time: 22,
    speed: 1.3,
    price: 60,
    diamonds: true
  },
  {
    level: 26,
    chapter: 4,
    time: 23,
    speed: 1.3,
    price: 25000,
    diamonds: false
  },
  {
    level: 27,
    chapter: 4,
    time: 24,
    speed: 1.3,
    price: 30000,
    diamonds: false
  },
  {
    level: 28,
    chapter: 4,
    time: 25,
    speed: 1.3,
    price: 35000,
    diamonds: false
  },
  {
    level: 29,
    chapter: 4,
    time: 26,
    speed: 1.3,
    price: 40000,
    diamonds: false
  },
  {
    level: 30,
    chapter: 4,
    time: 26,
    speed: 1.4,
    price: 90,
    diamonds: true
  },
  {
    level: 31,
    chapter: 4,
    time: 27,
    speed: 1.4,
    price: 50000,
    diamonds: false
  },
  {
    level: 32,
    chapter: 4,
    time: 28,
    speed: 1.4,
    price: 55000,
    diamonds: false
  },
  {
    level: 33,
    chapter: 4,
    time: 29,
    speed: 1.4,
    price: 60000,
    diamonds: false
  },
  {
    level: 34,
    chapter: 4,
    time: 30,
    speed: 1.4,
    price: 65000,
    diamonds: false
  },
  {
    level: 35,
    chapter: 4,
    time: 30,
    speed: 1.5,
    price: 140,
    diamonds: true
  },
  {
    level: 36,
    chapter: 5,
    time: 31,
    speed: 1.5,
    price: 80000,
    diamonds: false
  },
  {
    level: 37,
    chapter: 5,
    time: 32,
    speed: 1.5,
    price: 90000,
    diamonds: false
  },
  {
    level: 38,
    chapter: 5,
    time: 33,
    speed: 1.5,
    price: 100000,
    diamonds: false
  },
  {
    level: 39,
    chapter: 5,
    time: 34,
    speed: 1.5,
    price: 110000,
    diamonds: false
  },
  {
    level: 40,
    chapter: 5,
    time: 34,
    speed: 1.6,
    price: 200,
    diamonds: true
  },
  {
    level: 41,
    chapter: 5,
    time: 35,
    speed: 1.6,
    price: 120000,
    diamonds: false
  },
  {
    level: 42,
    chapter: 5,
    time: 36,
    speed: 1.6,
    price: 130000,
    diamonds: false
  },
  {
    level: 43,
    chapter: 5,
    time: 37,
    speed: 1.6,
    price: 140000,
    diamonds: false
  },
  {
    level: 44,
    chapter: 5,
    time: 38,
    speed: 1.6,
    price: 150000,
    diamonds: false
  },
  {
    level: 45,
    chapter: 5,
    time: 38,
    speed: 1.7,
    price: 350,
    diamonds: true
  },
  {
    level: 46,
    chapter: 6,
    time: 39,
    speed: 1.7,
    price: 180000,
    diamonds: false
  },
  {
    level: 47,
    chapter: 6,
    time: 40,
    speed: 1.7,
    price: 195000,
    diamonds: false
  },
  {
    level: 48,
    chapter: 6,
    time: 41,
    speed: 1.7,
    price: 210000,
    diamonds: false
  },
  {
    level: 49,
    chapter: 6,
    time: 42,
    speed: 1.7,
    price: 225000,
    diamonds: false
  },
  {
    level: 50,
    chapter: 6,
    time: 42,
    speed: 1.8,
    price: 500,
    diamonds: true
  },
  {
    level: 51,
    chapter: 6,
    time: 43,
    speed: 1.8,
    price: 240000,
    diamonds: false
  },
  {
    level: 52,
    chapter: 6,
    time: 44,
    speed: 1.8,
    price: 255000,
    diamonds: false
  },
  {
    level: 53,
    chapter: 6,
    time: 45,
    speed: 1.8,
    price: 270000,
    diamonds: false
  },
  {
    level: 54,
    chapter: 6,
    time: 46,
    speed: 1.8,
    price: 285000,
    diamonds: false
  },
  {
    level: 55,
    chapter: 6,
    time: 46,
    speed: 1.9,
    price: 700,
    diamonds: true
  },
  {
    level: 56,
    chapter: 7,
    time: 47,
    speed: 1.9,
    price: 300000,
    diamonds: false
  },
  {
    level: 57,
    chapter: 7,
    time: 48,
    speed: 1.9,
    price: 320000,
    diamonds: false
  },
  {
    level: 58,
    chapter: 7,
    time: 49,
    speed: 1.9,
    price: 340000,
    diamonds: false
  },
  {
    level: 59,
    chapter: 7,
    time: 50,
    speed: 1.9,
    price: 360000,
    diamonds: false
  },
  {
    level: 60,
    chapter: 7,
    time: 50,
    speed: 2,
    price: 950,
    diamonds: true
  },
  {
    level: 61,
    chapter: 7,
    time: 51,
    speed: 2,
    price: 380000,
    diamonds: false
  },
  {
    level: 62,
    chapter: 7,
    time: 52,
    speed: 2,
    price: 400000,
    diamonds: false
  },
  {
    level: 63,
    chapter: 7,
    time: 53,
    speed: 2,
    price: 420000,
    diamonds: false
  },
  {
    level: 64,
    chapter: 7,
    time: 54,
    speed: 2,
    price: 440000,
    diamonds: false
  },
  {
    level: 65,
    chapter: 8,
    time: 54,
    speed: 2.1,
    price: 1300,
    diamonds: true
  },
  {
    level: 66,
    chapter: 8,
    time: 55,
    speed: 2.1,
    price: 500000,
    diamonds: false
  },
  {
    level: 67,
    chapter: 8,
    time: 56,
    speed: 2.1,
    price: 530000,
    diamonds: false
  },
  {
    level: 68,
    chapter: 8,
    time: 57,
    speed: 2.1,
    price: 560000,
    diamonds: false
  },
  {
    level: 69,
    chapter: 8,
    time: 58,
    speed: 2.1,
    price: 590000,
    diamonds: false
  },
  {
    level: 70,
    chapter: 8,
    time: 58,
    speed: 2.2,
    price: 1700,
    diamonds: true
  },
  {
    level: 71,
    chapter: 8,
    time: 59,
    speed: 2.2,
    price: 620000,
    diamonds: false
  },
  {
    level: 72,
    chapter: 8,
    time: 60,
    speed: 2.2,
    price: 650000,
    diamonds: false
  },
  {
    level: 73,
    chapter: 8,
    time: 61,
    speed: 2.2,
    price: 680000,
    diamonds: false
  },
  {
    level: 74,
    chapter: 8,
    time: 62,
    speed: 2.2,
    price: 710000,
    diamonds: false
  },
  {
    level: 75,
    chapter: 8,
    time: 62,
    speed: 2.3,
    price: 2150,
    diamonds: true
  },
  {
    level: 76,
    chapter: 8,
    time: 63,
    speed: 2.3,
    price: 750000,
    diamonds: false
  },
  {
    level: 77,
    chapter: 8,
    time: 64,
    speed: 2.3,
    price: 800000,
    diamonds: false
  },
  {
    level: 78,
    chapter: 8,
    time: 65,
    speed: 2.3,
    price: 850000,
    diamonds: false
  },
  {
    level: 79,
    chapter: 8,
    time: 66,
    speed: 2.3,
    price: 900000,
    diamonds: false
  },
  {
    level: 80,
    chapter: 8,
    time: 66,
    speed: 2.4,
    price: 2650,
    diamonds: false
  },
  {
    level: 81,
    chapter: 8,
    time: 67,
    speed: 2.4,
    price: 950000,
    diamonds: false
  },
  {
    level: 82,
    chapter: 8,
    time: 68,
    speed: 2.4,
    price: 1000000,
    diamonds: false
  },
  {
    level: 83,
    chapter: 8,
    time: 69,
    speed: 2.4,
    price: 1050000,
    diamonds: false
  },
  {
    level: 84,
    chapter: 8,
    time: 70,
    speed: 2.4,
    price: 1100000,
    diamonds: false
  },
  {
    level: 85,
    chapter: 8,
    time: 70,
    speed: 2.5,
    price: 3200,
    diamonds: true
  },
  {
    level: 86,
    chapter: 8,
    time: 71,
    speed: 2.5,
    price: 1150000,
    diamonds: false
  },
  {
    level: 87,
    chapter: 8,
    time: 72,
    speed: 2.5,
    price: 1200000,
    diamonds: false
  },
  {
    level: 88,
    chapter: 8,
    time: 73,
    speed: 2.5,
    price: 1250000,
    diamonds: false
  },
  {
    level: 89,
    chapter: 8,
    time: 74,
    speed: 2.5,
    price: 1300000,
    diamonds: false
  },
  {
    level: 90,
    chapter: 8,
    time: 74,
    speed: 2.6,
    price: 3800,
    diamonds: true
  },
  {
    level: 91,
    chapter: 8,
    time: 75,
    speed: 2.6,
    price: 1350000,
    diamonds: false
  },
  {
    level: 92,
    chapter: 8,
    time: 76,
    speed: 2.6,
    price: 1400000,
    diamonds: false
  },
  {
    level: 93,
    chapter: 8,
    time: 77,
    speed: 2.6,
    price: 1450000,
    diamonds: false
  },
  {
    level: 94,
    chapter: 8,
    time: 78,
    speed: 2.6,
    price: 1500000,
    diamonds: false
  },
  {
    level: 95,
    chapter: 8,
    time: 78,
    speed: 2.7,
    price: 4400,
    diamonds: true
  },
  {
    level: 96,
    chapter: 8,
    time: 79,
    speed: 2.7,
    price: 1550000,
    diamonds: false
  },
  {
    level: 97,
    chapter: 8,
    time: 80,
    speed: 2.7,
    price: 1600000,
    diamonds: false
  },
  {
    level: 98,
    chapter: 8,
    time: 81,
    speed: 2.7,
    price: 1650000,
    diamonds: false
  },
  {
    level: 99,
    chapter: 8,
    time: 82,
    speed: 2.7,
    price: 1700000,
    diamonds: false
  },
  {
    level: 100,
    chapter: 8,
    time: 82,
    speed: 2.8,
    price: 5000,
    diamonds: true
  }
]

const testEventSettings: IeventSettings = {
  buyBetterBreedAnimal: 2,
  doubledСollectorPrice: 25,
  feedBoostPrice: 40,
  collectorPrice4: 90,
  collectorPrice12: 250,
  unlockCollector4: 5,
  unlockCollector12: 8,
  priceCoefficient: 7,
  unicornSettings: [
    { 
      breed: 1, 
      resource: 100, 
      resourcePrice: '10',
      price: '100',
      exchange: '1000'
    },
    { 
      breed: 2, 
      resource: 100, 
      resourcePrice: '20',
      price: '1500',
      exchange: '2800'
    },
    { 
      breed: 3, 
      resource: 100, 
      resourcePrice: '40',
      price: '4800',
      exchange: '7200'
    },
    { 
      breed: 4, 
      resource: 100, 
      resourcePrice: '90',
      price: '15000',
      exchange: '17600'
    },
    { 
      breed: 5, 
      resource: 100, 
      resourcePrice: '190',
      price: '48000',
      exchange: '41600'
    },
    { 
      breed: 6, 
      resource: 100, 
      resourcePrice: '400',
      price: '150000',
      exchange: '96000'
    },
    { 
      breed: 7, 
      resource: 100, 
      resourcePrice: '850',
      price: '480000',
      exchange: '217600'
    },
    { 
      breed: 8, 
      resource: 100, 
      resourcePrice: '1780',
      price: '1500000',
      exchange: '486600'
    },
    { 
      breed: 9, 
      resource: 100, 
      resourcePrice: '3750',
      price: '4800000',
      exchange: '1075200'
    },
    { 
      breed: 10, 
      resource: 100, 
      resourcePrice: '7900',
      price: '15000000',
      exchange: '2355200'
    },
    { 
      breed: 11, 
      resource: 100, 
      resourcePrice: '16000',
      price: '48000000',
      exchange: '5120000'
    },
    { 
      breed: 12, 
      resource: 100, 
      resourcePrice: '73000',
      price: '480000000',
      exchange: '12000000'
    },
    { 
      breed: 13, 
      resource: 100, 
      resourcePrice: '34000',
      price: '150000000',
      exchange: '24000000'
    },
    { 
      breed: 14, 
      resource: 100, 
      resourcePrice: '150000',
      price: '1500000000',
      exchange: '48000000'
    },
    { 
      breed: 15, 
      resource: 100, 
      resourcePrice: '320000',
      price: '4800000000',
      exchange: '96000000'
    },
    { 
      breed: 16, 
      resource: 100, 
      resourcePrice: '670000',
      price: '15000000000',
      exchange: '192000000'
    },
    { 
      breed: 17, 
      resource: 100, 
      resourcePrice: '1400000',
      price: '48000000000',
      exchange: '384000000'
    },
    { 
      breed: 18, 
      resource: 100, 
      resourcePrice: '2900000',
      price: '150000000000',
      exchange: '768000000'
    },
    { 
      breed: 19, 
      resource: 100, 
      resourcePrice: '6200000',
      price: '480000000000',
      exchange: '1536000000'
    },
    { 
      breed: 20, 
      resource: 100, 
      resourcePrice: '13000000',
      price: '1500000000000',
      exchange: '3072000000'
    },
    { 
      breed: 21, 
      resource: 100, 
      resourcePrice: '25000000',
      price: '4800000000000',
      exchange: '6144000000'
    },
    { 
      breed: 22, 
      resource: 100, 
      resourcePrice: '50200000',
      price: '15000000000000',
      exchange: '12288000000'
    },
    { 
      breed: 23, 
      resource: 100, 
      resourcePrice: '100300000',
      price: '48000000000000',
      exchange: '24576000000'
    },
    { 
      breed: 24, 
      resource: 100, 
      resourcePrice: '200000000',
      price: '150000000000000',
      exchange: '49152000000'
    },
    { 
      breed: 25, 
      resource: 100, 
      resourcePrice: '400000000',
      price: '480000000000000',
      exchange: '98304000000'
    },
    { 
      breed: 26, 
      resource: 100, 
      resourcePrice: '800000000',
      price: '1500000000000000',
      exchange: '196608000000'
    },
    { 
      breed: 27, 
      resource: 100, 
      resourcePrice: '1600000000',
      price: '4800000000000000',
      exchange: '393216000000'
    },
    { 
      breed: 28, 
      resource: 100, 
      resourcePrice: '3200000000', 
      price: '15000000000000000', 
      exchange: '786432000000'
    },
    { 
      breed: 29, 
      resource: 100, 
      resourcePrice: '6400000000',
      price: '48000000000000000',
      exchange: '1572864000000'
    },
    { 
      breed: 30, 
      resource: 100, 
      resourcePrice: '12800000000',
      price: '150000000000000000',
      exchange: '3145728000000'
    },
    { 
      breed: 31, 
      resource: 100, 
      resourcePrice: '25600000000',
      price: '480000000000000000',
      exchange: '6291456000000'
    },
    { 
      breed: 32, 
      resource: 100, 
      resourcePrice: '51200000000',
      price: '1500000000000000000',
      exchange: '12582912000000'
    },
    { 
      breed: 33, 
      resource: 100, 
      resourcePrice: '102400000000',
      price: '4800000000000000000',
      exchange: '25165824000000'
    },
    { 
      breed: 34, 
      resource: 100, 
      resourcePrice: '204800000000',
      price: '15000000000000000000',
      exchange: '50331648000000'
    },
    { 
      breed: 35, 
      resource: 100, 
      resourcePrice: '409600000000',
      price: '48000000000000000000',
      exchange: '100663296000000'
    },
    { 
      breed: 36, 
      resource: 100, 
      resourcePrice: '819200000000',
      price: '150000000000000000000',
      exchange: '201326592000000'
    },
    { 
      breed: 37, 
      resource: 100, 
      resourcePrice: '1638400000000',
      price: '480000000000000000000',
      exchange: '402653184000000'
    },
    { 
      breed: 38, 
      resource: 100, 
      resourcePrice: '3276800000000',
      price: '1500000000000000000000',
      exchange: '805306368000000'
    },
    { 
      breed: 39, 
      resource: 100, 
      resourcePrice: '6553600000000',
      price: '4800000000000000000000',
      exchange: '1610612736000000'
    },
    { 
      breed: 40, 
      resource: 100, 
      resourcePrice: '13107200000000',
      price: '15000000000000000000000',
      exchange: '3221225472000000'
    },
    { 
      breed: 41, 
      resource: 100, 
      resourcePrice: '26214400000000',
      price: '48000000000000000000000',
      exchange: '6442450944000000'
    },
    { 
      breed: 42, 
      resource: 100, 
      resourcePrice: '52428800000000',
      price: '150000000000000000000000',
      exchange: '12884901888000000'
    },
    { 
      breed: 43, 
      resource: 100, 
      resourcePrice: '104857600000000',
      price: '480000000000000000000000',
      exchange: '25769803776000000'
    },
    { 
      breed: 44, 
      resource: 100, 
      resourcePrice: '209715200000000',
      price: '1500000000000000000000000',
      exchange: '51539607552000000'
    },
    { 
      breed: 45, 
      resource: 100, 
      resourcePrice: '419430400000000',
      price: '4800000000000000000000000',
      exchange: '103079215104000000'
    },
    { 
      breed: 46, 
      resource: 100, 
      resourcePrice: '838860800000000',
      price: '15000000000000000000000000',
      exchange: '206158430208000000'
    },
    { 
      breed: 47, 
      resource: 100, 
      resourcePrice: '1677721600000000',
      price: '48000000000000000000000000',
      exchange: '412316860416000000'
    },
    { 
      breed: 48, 
      resource: 100, 
      resourcePrice: '3355443200000000',
      price: '150000000000000000000000000',
      exchange: '824633720832000000'
    },
    { 
      breed: 49, 
      resource: 100, 
      resourcePrice: '6710886400000000',
      price: '480000000000000000000000000',
      exchange: '1649267441664000000'
    },
    { 
      breed: 50, 
      resource: 100, 
      resourcePrice: '13421772800000000',
      price: '1500000000000000000000000000',
      exchange: '3298534883328000000'
    },
    { 
      breed: 51, 
      resource: 100, 
      resourcePrice: '26843545600000000',
      price: '4800000000000000000000000000',
      exchange: '6597069766656000000'
    },
    { 
      breed: 52, 
      resource: 100, 
      resourcePrice: '53687091200000000', 
      price: '15000000000000000000000000000', 
      exchange: '13194139533312000000'
    },
    { 
      breed: 53, 
      resource: 100, 
      resourcePrice: '107374182400000000', 
      price: '48000000000000000000000000000', 
      exchange: '26388279066624000000'
    },
    { 
      breed: 54, 
      resource: 100, 
      resourcePrice: '214748364800000000', 
      price: '150000000000000000000000000000', 
      exchange: '52776558133248000000'
    },
    { 
      breed: 55, 
      resource: 100, 
      resourcePrice: '429496729600000000', 
      price: '480000000000000000000000000000', 
      exchange: '105553116266496000000'
    },
    { 
      breed: 56, 
      resource: 100, 
      resourcePrice: '858993459200000000', 
      price: '1500000000000000000000000000000', 
      exchange: '211106232532992000000'
    },
    { 
      breed: 57, 
      resource: 100, 
      resourcePrice: '1717986918400000000', 
      price: '4800000000000000000000000000000', 
      exchange: '422212465065984000000'
    },
    { 
      breed: 58, 
      resource: 100, 
      resourcePrice: '3435973836800000000', 
      price: '15000000000000000000000000000000', 
      exchange: '844424930131968000000'
    },
    { 
      breed: 59, 
      resource: 100, 
      resourcePrice: '6871947673600000000', 
      price: '48000000000000000000000000000000', 
      exchange: '1688849860263940000000'
    },
    { 
      breed: 60, 
      resource: 100, 
      resourcePrice: '13743895347200000000', 
      price: '150000000000000000000000000000000', 
      exchange: '3377699720527870000000'
    },
    { 
      breed: 61, 
      resource: 100, 
      resourcePrice: '27487790694400000000', 
      price: '4800000000000000000000000000000000', 
      exchange: '6755399441055740000000'
    },
    { 
      breed: 62, 
      resource: 100, 
      resourcePrice: '5497558138880000000', 
      price: '15000000000000000000000000000000000', 
      exchange: '13510798882111500000000'
    },
    { 
      breed: 63, 
      resource: 100, 
      resourcePrice: '10995116277760000000', 
      price: '48000000000000000000000000000000000', 
      exchange: '27021597764223000000000'
    },
    { 
      breed: 64, 
      resource: 100, 
      resourcePrice: '21990232555520000000', 
      price: '150000000000000000000000000000000000', 
      exchange: '54043195528446000000000'
    },
    { 
      breed: 65, 
      resource: 100, 
      resourcePrice: '43980465111040000000', 
      price: '480000000000000000000000000000000000',
      exchange: '108086391056892000000000'
    },
    { 
      breed: 66, 
      resource: 100, 
      resourcePrice: '87960930222080000000', 
      price: '1500000000000000000000000000000000000', 
      exchange: '216172782113784000000000'
    },
    { 
      breed: 67, 
      resource: 100, 
      resourcePrice: '175921860444160000000', 
      price: '4800000000000000000000000000000000000', 
      exchange: '432345564227568000000000'
    },
    { 
      breed: 68, 
      resource: 100, 
      resourcePrice: '351843720888320000000', 
      price: '15000000000000000000000000000000000000', 
      exchange: '864691128455135000000000'
    },
    { 
      breed: 69, 
      resource: 100, 
      resourcePrice: '703687441776640000000', 
      price: '48000000000000000000000000000000000000', 
      exchange: '1729382256910270000000000'
    },
    { 
      breed: 70, 
      resource: 100, 
      resourcePrice: '1407374883553280000000', 
      price: '150000000000000000000000000000000000000', 
      exchange: '3458764513820540000000000'
    },
    { 
      breed: 71, 
      resource: 100, 
      resourcePrice: '28147497671065600000000', 
      price: '480000000000000000000000000000000000000', 
      exchange: '6917529027641080000000000'
    },
    { 
      breed: 72, 
      resource: 100, 
      resourcePrice: '56294995342131200000000',
      price: '1500000000000000000000000000000000000000',
      exchange: '13835058055282200000000000'
    },
    { 
      breed: 73, 
      resource: 100, 
      resourcePrice: '112589990684262000000000',
      price: '4800000000000000000000000000000000000000',
      exchange: '27670116110564300000000000'
    },
    { 
      breed: 74, 
      resource: 100, 
      resourcePrice: '225179981368525000000000',
      price: '15000000000000000000000000000000000000000',
      exchange: '55340232221128700000000000'
    },
    { 
      breed: 75, 
      resource: 100, 
      resourcePrice: '450359962737050000000000',
      price: '48000000000000000000000000000000000000000',
      exchange: '110680464442257000000000000'
    },
    { 
      breed: 76, 
      resource: 100, 
      resourcePrice: '900719925474099000000000',
      price: '150000000000000000000000000000000000000000',
      exchange: '221360928884515000000000000'
    },
    { 
      breed: 77, 
      resource: 100, 
      resourcePrice: '1801439850948200000000000',
      price: '480000000000000000000000000000000000000000',
      exchange: '442721857769029000000000000'
    },
    { 
      breed: 78, 
      resource: 100, 
      resourcePrice: '3602879701896400000000000',
      price: '1500000000000000000000000000000000000000000',
      exchange: '885443715538059000000000000'
    },
    { 
      breed: 79, 
      resource: 100, 
      resourcePrice: '7205759403792790000000000',
      price: '4800000000000000000000000000000000000000000',
      exchange: '1770887431076120000000000000'
    },
    { 
      breed: 80, 
      resource: 100, 
      resourcePrice: '14411518807585600000000000',
      price: '15000000000000000000000000000000000000000000',
      exchange: '3541774862152230000000000000'
    },
    { 
      breed: 81, 
      resource: 100, 
      resourcePrice: '2882303761517120000000000',
      price: '48000000000000000000000000000000000000000000',
      exchange: '6917529027641080000000000'
    },
    { 
      breed: 82, 
      resource: 100, 
      resourcePrice: '5764607523034240000000000',
      price: '150000000000000000000000000000000000000000000',
      exchange: '13835058055282200000000000'
    },
    { 
      breed: 83, 
      resource: 100, 
      resourcePrice: '11529215046068500000000000',
      price: '480000000000000000000000000000000000000000000',
      exchange: '27670116110564300000000000'
    },
    { 
      breed: 84, 
      resource: 100, 
      resourcePrice: '23058430092136900000000000',
      price: '1500000000000000000000000000000000000000000000',
      exchange: '55340232221128700000000000'
    },
    { 
      breed: 85, 
      resource: 100, 
      resourcePrice: '46116860184273900000000000',
      price: '4800000000000000000000000000000000000000000000',
      exchange: '110680464442257000000000000'
    },
    { 
      breed: 86, 
      resource: 100, 
      resourcePrice: '92233720368547800000000000',
      price: '15000000000000000000000000000000000000000000000',
      exchange: '221360928884515000000000000'
    },
    { 
      breed: 87, 
      resource: 100, 
      resourcePrice: '184467440737096000000000000',
      price: '48000000000000000000000000000000000000000000000',
      exchange: '442721857769029000000000000'
    },
    { 
      breed: 88, 
      resource: 100, 
      resourcePrice: '368934881474191000000000000',
      price: '150000000000000000000000000000000000000000000000',
      exchange: '885443715538059000000000000'
    },
    { 
      breed: 89, 
      resource: 100, 
      resourcePrice: '737869762948382000000000000',
      price: '480000000000000000000000000000000000000000000000',
      exchange: '1770887431076120000000000000'
    },
    { 
      breed: 90, 
      resource: 100, 
      resourcePrice: '1475739525896760000000000000',
      price: '1500000000000000000000000000000000000000000000000',
      exchange: '3541774862152230000000000000'
    },
    { 
      breed: 91, 
      resource: 100, 
      resourcePrice: '2951479051793530000000000000',
      price: '4800000000000000000000000000000000000000000000000',
      exchange: '7253554917687780000000000000000'
    },
    { 
      breed: 92, 
      resource: 100, 
      resourcePrice: '5902958103587060000000000000',
      price: '15000000000000000000000000000000000000000000000000',
      exchange: '14507109835375600000000000000000'
    },
    { 
      breed: 93, 
      resource: 100, 
      resourcePrice: '11805916207174100000000000000',
      price: '48000000000000000000000000000000000000000000000000',
      exchange: '29014219670751100000000000000000'
    },
    { 
      breed: 94, 
      resource: 100, 
      resourcePrice: '23611832414348200000000000000',
      price: '150000000000000000000000000000000000000000000000000',
      exchange: '58028439341502200000000000000000'
    },
    { 
      breed: 95, 
      resource: 100, 
      resourcePrice: '47223664828696500000000000000',
      price: '480000000000000000000000000000000000000000000000000',
      exchange: '116056878683004000000000000000000'
    },
    { 
      breed: 96, 
      resource: 100, 
      resourcePrice: '94447329657392900000000000000', 
      price: '1500000000000000000000000000000000000000000000000000', 
      exchange: '232113757366009000000000000000000'
    },
    { 
      breed: 97, 
      resource: 100, 
      resourcePrice: '188894659314786000000000000000', 
      price: '4800000000000000000000000000000000000000000000000000', 
      exchange: '464227514732018000000000000000000'
    },
    { 
      breed: 98, 
      resource: 100, 
      resourcePrice: '377789318629572000000000000000', 
      price: '15000000000000000000000000000000000000000000000000000', 
      exchange: '928455029464035000000000000000000'
    },
    { 
      breed: 99, 
      resource: 100, 
      resourcePrice: '755578637259143000000000000000', 
      price: '48000000000000000000000000000000000000000000000000000', 
      exchange: '1856910058928070000000000000000000'
    },
    { 
      breed: 100, 
      resource: 100, 
      resourcePrice: '1511157274518290000000000000000', 
      price: '150000000000000000000000000000000000000000000000000000', 
      exchange: '3713820117856140000000000000000000'
    },
  ],
  territoriesUnicornPrice: [
    { block: 3, position: 1, diamond: 0, price: 0, unlock: 0 },
    { block: 3, position: 2, diamond: 0, price: 0, unlock: 0 },
    { block: 3, position: 3, diamond: 0, price: 0, unlock: 0 },
    { block: 4, position: 1, diamond: 0, price: 0, unlock: 0 },
    { block: 4, position: 2, diamond: 10, price: 1500, unlock: 2 },
    { block: 4, position: 3, diamond: 10, price: 5000, unlock: 4 },
    { block: 5, position: 1, diamond: 20, price: 10000, unlock: 6 },
    { block: 5, position: 2, diamond: 40, price: 20000, unlock: 8 },
    { block: 5, position: 3, diamond: 100, price: 50000, unlock: 10 },
    { block: 6, position: 1, diamond: 180, price: 90000, unlock: 12 },
    { block: 6, position: 2, diamond: 300, price: 150000, unlock: 14 },
    { block: 6, position: 3, diamond: 400, price: 200000, unlock: 16 },
  ],
  territoriesUnicornSettings: [
    { improve: 1, regeneration: 11, countResources: 5, unlock_improve: 1, resourceStorage: 200 },
    { improve: 2, regeneration: 22, countResources: 5, unlock_improve: 2, resourceStorage: 700 },
    { improve: 3, regeneration: 33, countResources: 5, unlock_improve: 5, resourceStorage: 1500 },
    { improve: 4, regeneration: 44, countResources: 5, unlock_improve: 8, resourceStorage: 4000 }
  ]
}
class EventPreload extends Phaser.Scene {

  public lang: string; // индекс языка
  public state: Istate;
  public userReady: boolean;
  public loadingReady: boolean;
  public socket: boolean;
  public loadTime: number;
  public startTime: number;
  public loadingScreen = loadingScreen.bind(this);

  constructor() {
    super('UnicornPreload');
  }

  
  public init(state: Istate): void {

    this.state  = state;
    this.userReady = false;
    this.loadingReady = false;
    this.loadUser();
    // ---------- Тестовые настройки, не с бека --------//
    this.state.unicornSettings = testEventSettings;
    this.state.eventCollectorSettings = testCollector;
    // ------------------------------------------------//
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
    // грузим траву, нужно убавить будет
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

    // Автопрогресс эвентовой фермы
    this.load.image('autoprogress-bg', autoprogressBG);
    this.load.image('purple-btn', purpleBtn);
    
    // Окно рейтингов
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

        // подрубаем амплитуду
        const Amplitude = this.state.amplitude;
        const identify = new Amplitude.Identify().setOnce('start_version', '3.0')
          .set('diamond_balance', this.state.user.diamonds)
          .set('partner', this.state.platform)
          .set('user_id', this.state.user.id)
          .set('browser', navigator.userAgent);
        Amplitude.getInstance().identify(identify);
        // Amplitude.getInstance().logEvent('load_time', {
        //   seconds: loadTime
        // });

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

        // общие настройки
        this.state.autoSaveSpeed = response.data.settings.general.autoSaveSpeed;
        this.state.maxMerginTime = response.data.settings.general.maxMerginTime;
        this.state.herdBoostSpeedAnimal = response.data.settings.general.herdBoostSpeedAnimal;
        this.state.herdBoostTime = response.data.settings.general.herdBoostTime;
        this.state.herdBoostPrice = response.data.settings.general.herdBoostPrice;
        this.state.herdBoostDelay = response.data.settings.general.herdBoostDelay;
        this.state.packages = response.data.settings.packages;
        
      //   // массив с настройками для евентовой фермы
      //   const eventSettings: IeventSettings = {  // IeventSettings Нужно делать интерфейс
      //     territoriesEventSettings: response.data.territoriesEventSettings,
      //     eventSettings: response.data.eventSettings,
      //     territoriesUnicornPrice: response.data.territoriesUnicornPrice,
      //     buyBetterBreedAnimal: response.data.buyBetterBreedAnimal,
      //     doubledСollectorPrice: response.data.doubledСollectorPrice,
      //     collectorPrice4: response.data.collectorPrice4,
      //     collectorPrice12: response.data.collectorPrice12,
      //     unlockCollector4: response.data.unlockCollector4,
      //     unlockCollector12: response.data.unlockCollector12,
      //     priceCoefficient: response.data.priceCoefficient,
      //     feedBoostPrice: response.data.feedBoostPrice
      //   }

      //   this.state.eventSettings = eventSettings;

        const eventAnimals: IeventAnimal[] = []; // IeventAnimal

        for (let i in response.data.event.animals) {
          
          let animal = response.data.event.animals[i];
          eventAnimals.push({
            _id: animal._id,
            type: animal.type,
            activeAnimal: animal.activeAnimal,
            x: animal.x,
            y: animal.y,
          });

        }
        
        const eventTerritories: IeventTerritories[] = [];
        
        for (let i in response.data.event.territories) {

          let territory = response.data.event.territories[i];

          eventTerritories.push({
            _id: territory._id,
            block: territory.block,
            position: territory.position,
            type: territory.type
          });

        }
        
        const eventResources: IeventResource[] = []; // IeventResource

        for (let i in response.data.event.resources) {

          let eventResource = response.data.event.resources[i];

          eventResources.push({
            _id: eventResource._id,
            x: eventResource.x,
            y: eventResource.y,
            type: eventResource.type
          });

        }

        const user: Iuser = {
          diamonds: response.data.user.diamonds,
          id: response.data.user._id,
          xp: response.data.user.xp,
          hash: response.data.user.hash,
          login: response.data.user.login,
          counter: response.data.user.counter,
          mail: response.data.user.mail,
          level: response.data.user.level,
          additionalTutorial: response.data.user.additional_tutorial,
          takenReward: response.data.user.taken_reward,
          status: response.data.user.status,
          statuses: response.data.user.statuses,
          starterpack: response.data.user.starterpack,
          boosts: response.data.user.boosts,

        }

        const countAnimal = response.data.event.countAnimal;
        if (countAnimal.length < this.state.unicornSettings.unicornSettings.length) {
          let addCounter: number = this.state.unicornSettings.unicornSettings.length - countAnimal.length;
          for (let i = 0; i < addCounter; i++) {
            countAnimal.push({ counter: 1 });
          }
        }
        const userUnicorn: IuserEvent = {  
          money: response.data.event.money,
          countAnimal: countAnimal,
          collector: response.data.event.collector,
          collectorLevel: response.data.event.collectorLevel,
          collectorTakenTime: response.data.event.collector,
          tutorial: response.data.event.tutorial,
          autosaveCounter: response.data.event.autosaveCounter,
          takenHerdBoost: response.data.event.takenHerdBoost,
          feedBoostTime: response.data.event.feedBoostTime,
          maxLevelAnimal: response.data.user.eventPoints,
          herdBoostAnimals: response.data.event.herdBoostAnimals,
          takenAd: response.data.event.takenAd,
          timeToAd: response.data.event.timeToAd,
        }
        
      //   // переписываем стейт
        this.state.timeToNewDay = response.data.progress.timeToNewDay;
        this.state.offlineTime = response.data.progress.eventOfflineTime;
        const progress: Iprogress = {
          sheep: {
            part: response.data.user.sheep_part,
            max: response.data.settings.sheep.parts.length,
            open: true,
            price: response.data.settings.farms[0].price,
            unlock: response.data.settings.farms[0].open,
            donate: response.data.settings.farms[0].donate,
            collector: response.data.user.shaver_time,
            offlineTime: response.data.progress.sheepOfflineTime,
          },
          chicken: {
            part: response.data.user.chicken_part,
            max: response.data.settings.chicken.parts.length,
            open: response.data.user.chicken_part > 0,
            price: response.data.settings.farms[1].price,
            unlock: response.data.settings.farms[1].open,
            donate: response.data.settings.farms[1].donate,
            collector: response.data.user.chicken_collector,
            offlineTime: response.data.progress.chickenOfflineTime,
          },
          cow: {
            part: response.data.user.cow_part,
            max: response.data.settings.cow.parts.length,
            open: response.data.user.cow_part > 0,
            price: response.data.settings.farms[2].price,
            unlock: response.data.settings.farms[2].open,
            donate: response.data.settings.farms[2].donate,
            collector: response.data.user.cow_collector,
            offlineTime: response.data.progress.cowOfflineTime,
          },
          event: {
            eventPoints: response.data.user.eventPoints,
            startTime: response.data.progress.event.startTime,
            endTime: response.data.progress.event.endTime,
            open: response.data.settings.event.open,
            type: response.data.settings.event.type,
          }
        }
        this.state.progress = progress;
        this.state.eventTerritories = eventTerritories;
        this.state.eventAnimals = eventAnimals;
        this.state.eventResources = eventResources; 
        this.state.user = user;
        this.state.userUnicorn = userUnicorn;
        this.state.farm = 'Unicorn';
        this.userReady = true;
        this.state.nativeCounter = [0, 0, 0, 0];
    })
  }

}

export default EventPreload;
