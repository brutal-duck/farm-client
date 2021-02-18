import axios from 'axios';
import tasks from '../../tasks';
import Socket from '../../Socket';

let pixel: any = require("./../../../assets/images/pixel.png");
let bg: any = require("./../../../assets/images/scroll-bg.png");
let top: any = require("./../../../assets/images/event/top.png");
let bottom: any = require("./../../../assets/images/event/bottom.png");
let topbar: any = require("./../../../assets/images/event/topbar.png");
let tabbar: any = require("./../../../assets/images/tabbar.png");
let resourceCollector: any = require("./../../../assets/images/event/event-collector.png");
let shop: any = require("./../../../assets/images/icons/shop.png");
let mapIcon: any = require("./../../../assets/images/icons/map.png");
let sandwich: any = require("./../../../assets/images/icons/sandwich.png");
let sandwichClose: any = require("./../../../assets/images/icons/sandwich-close.png");
let profile: any = require("./../../../assets/images/icons/profile.png");
let chat: any = require("./../../../assets/images/icons/chat.png");
let forBuying: any = require("./../../../assets/images/event/territories/for-buying.png");
let lockTerritory: any = require("./../../../assets/images/event/lock-event-territory.png");
let mergingAnimation: any = require("./../../../assets/images/merging-animation.png");
let coin: any = require("./../../../assets/images/event/icons/money.png");
let diamond: any = require("./../../../assets/images/icons/diamonds.png");
let lock: any = require("./../../../assets/images/icons/lock.png");
let gift: any = require("./../../../assets/images/icons/gift.png");
let firework250: any = require("./../../../assets/images/animations/firework250.png");
let offline: any = require("./../../../assets/images/icons/offline.png");
let tutorBtn: any = require("./../../../assets/images/modal/tutor-btn.png");
let heart: any = require("./../../../assets/images/icons/heart.png");
let calendar: any = require("./../../../assets/images/calendar.png");
let adIcon: any = require("./../../../assets/images/icons/ad-icon.png");
let bgAd: any = require("./../../../assets/images/icons/bg-ad.png");
let bigButtonGreen: any = require("./../../../assets/images/modal/btn_lg.png");
let grass: any = require("./../../../assets/images/event/territories/grass.png");
let forest1: any = require("./../../../assets/images/event/territories/forest-1.png");
let forest2: any = require("./../../../assets/images/event/territories/forest-2.png");
let forest3: any = require("./../../../assets/images/event/territories/forest-3.png");
let forest4: any = require("./../../../assets/images/event/territories/forest-4.png");
let forest5: any = require("./../../../assets/images/event/territories/forest-5.png");
let forest6: any = require("./../../../assets/images/event/territories/forest-6.png");
let verticalBorder: any = require("./../../../assets/images/event/territories/vertical-border.png");
let horizontalBorder1: any = require("./../../../assets/images/event/territories/horizontal-border-1.png");
let horizontalBorder2: any = require("./../../../assets/images/event/territories/horizontal-border-2.png");
let horizontalBorder3: any = require("./../../../assets/images/event/territories/horizontal-border-3.png");
let eventLeaves: any = require("./../../../assets/images/event/event-leaves.png");
let eventWorkZone: any = require("./../../../assets/images/event/territories/work-zone.png");
let eventBuyIcon1: any = require("./../../../assets/images/event/icons/event-buy-icon-1.png");
let eventBuyIcon2: any = require("./../../../assets/images/event/icons/event-buy-icon-2.png");
let eventBuyIcon3: any = require("./../../../assets/images/event/icons/event-buy-icon-3.png");
let eventBuyIcon4: any = require("./../../../assets/images/event/icons/event-buy-icon-4.png");
let eventBuyIcon5: any = require("./../../../assets/images/event/icons/event-buy-icon-5.png");
let eventBuyIcon6: any = require("./../../../assets/images/event/icons/event-buy-icon-6.png");
let eventBuyIcon7: any = require("./../../../assets/images/event/icons/event-buy-icon-7.png");
let eventBuyIcon8: any = require("./../../../assets/images/event/icons/event-buy-icon-8.png");
let eventBuyIcon9: any = require("./../../../assets/images/event/icons/event-buy-icon-9.png");
let eventBuyIcon10: any = require("./../../../assets/images/event/icons/event-buy-icon-10.png");
let eventBuyIcon11: any = require("./../../../assets/images/event/icons/event-buy-icon-11.png");
let eventBuyIcon12: any = require("./../../../assets/images/event/icons/event-buy-icon-12.png");
// let eventBuyIcon13: any = require("./../../../assets/images/event/icons/event-buy-icon-13.png");
// let eventBuyIcon14: any = require("./../../../assets/images/event/icons/event-buy-icon-14.png");
// let eventBuyIcon15: any = require("./../../../assets/images/event/icons/event-buy-icon-15.png");
// let eventBuyIcon16: any = require("./../../../assets/images/event/icons/event-buy-icon-16.png");
// let eventBuyIcon17: any = require("./../../../assets/images/event/icons/event-buy-icon-17.png");
// let eventBuyIcon18: any = require("./../../../assets/images/event/icons/event-buy-icon-18.png");
// let eventBuyIcon19: any = require("./../../../assets/images/event/icons/event-buy-icon-19.png");
// let eventBuyIcon20: any = require("./../../../assets/images/event/icons/event-buy-icon-20.png");
// let eventBuyIcon21: any = require("./../../../assets/images/event/icons/event-buy-icon-21.png");
// let eventBuyIcon22: any = require("./../../../assets/images/event/icons/event-buy-icon-22.png");
// let eventBuyIcon23: any = require("./../../../assets/images/event/icons/event-buy-icon-23.png");
// let eventBuyIcon24: any = require("./../../../assets/images/event/icons/event-buy-icon-24.png");
// let eventBuyIcon25: any = require("./../../../assets/images/event/icons/event-buy-icon-25.png");
// let eventBuyIcon26: any = require("./../../../assets/images/event/icons/event-buy-icon-26.png");
// let eventBuyIcon27: any = require("./../../../assets/images/event/icons/event-buy-icon-27.png");
// let eventBuyIcon28: any = require("./../../../assets/images/event/icons/event-buy-icon-28.png");
// let eventBuyIcon29: any = require("./../../../assets/images/event/icons/event-buy-icon-29.png");
// let eventBuyIcon30: any = require("./../../../assets/images/event/icons/event-buy-icon-30.png");
// let eventBuyIcon31: any = require("./../../../assets/images/event/icons/event-buy-icon-31.png");
// let eventBuyIcon32: any = require("./../../../assets/images/event/icons/event-buy-icon-32.png");
// let eventBuyIcon33: any = require("./../../../assets/images/event/icons/event-buy-icon-33.png");
// let eventBuyIcon34: any = require("./../../../assets/images/event/icons/event-buy-icon-34.png");
// let eventBuyIcon35: any = require("./../../../assets/images/event/icons/event-buy-icon-35.png");
// let eventBuyIcon36: any = require("./../../../assets/images/event/icons/event-buy-icon-36.png");
// let eventBuyIcon37: any = require("./../../../assets/images/event/icons/event-buy-icon-37.png");
// let eventBuyIcon38: any = require("./../../../assets/images/event/icons/event-buy-icon-38.png");
// let eventBuyIcon39: any = require("./../../../assets/images/event/icons/event-buy-icon-39.png");
// let eventBuyIcon40: any = require("./../../../assets/images/event/icons/event-buy-icon-40.png");
// let eventBuyIcon41: any = require("./../../../assets/images/event/icons/event-buy-icon-41.png");
// let eventBuyIcon42: any = require("./../../../assets/images/event/icons/event-buy-icon-42.png");
// let eventBuyIcon43: any = require("./../../../assets/images/event/icons/event-buy-icon-43.png");
// let eventBuyIcon44: any = require("./../../../assets/images/event/icons/event-buy-icon-44.png");
// let eventBuyIcon45: any = require("./../../../assets/images/event/icons/event-buy-icon-45.png");
// let eventBuyIcon46: any = require("./../../../assets/images/event/icons/event-buy-icon-46.png");
// let eventBuyIcon47: any = require("./../../../assets/images/event/icons/event-buy-icon-47.png");
// let eventBuyIcon48: any = require("./../../../assets/images/event/icons/event-buy-icon-48.png");
// let eventBuyIcon49: any = require("./../../../assets/images/event/icons/event-buy-icon-49.png");
// let eventBuyIcon50: any = require("./../../../assets/images/event/icons/event-buy-icon-50.png");
// let eventBuyIcon51: any = require("./../../../assets/images/event/icons/event-buy-icon-51.png");
// let eventBuyIcon52: any = require("./../../../assets/images/event/icons/event-buy-icon-52.png");
// let eventBuyIcon53: any = require("./../../../assets/images/event/icons/event-buy-icon-53.png");
// let eventBuyIcon54: any = require("./../../../assets/images/event/icons/event-buy-icon-54.png");
// let eventBuyIcon55: any = require("./../../../assets/images/event/icons/event-buy-icon-55.png");
// let eventBuyIcon56: any = require("./../../../assets/images/event/icons/event-buy-icon-56.png");
// let eventBuyIcon57: any = require("./../../../assets/images/event/icons/event-buy-icon-57.png");
// let eventBuyIcon58: any = require("./../../../assets/images/event/icons/event-buy-icon-58.png");
// let eventBuyIcon59: any = require("./../../../assets/images/event/icons/event-buy-icon-59.png");
// let eventBuyIcon60: any = require("./../../../assets/images/event/icons/event-buy-icon-60.png");

let animal1: any = require("./../../../assets/images/event/animal/animal1.png");
let animal2: any = require("./../../../assets/images/event/animal/animal2.png");
let animal3: any = require("./../../../assets/images/event/animal/animal3.png");
let animal4: any = require("./../../../assets/images/event/animal/animal4.png");
let animal5: any = require("./../../../assets/images/event/animal/animal5.png");
let animal6: any = require("./../../../assets/images/event/animal/animal6.png");
let animal7: any = require("./../../../assets/images/event/animal/animal7.png");
let animal8: any = require("./../../../assets/images/event/animal/animal8.png");
let animal9: any = require("./../../../assets/images/event/animal/animal9.png");
let animal10: any = require("./../../../assets/images/event/animal/animal10.png");
let animal11: any = require("./../../../assets/images/event/animal/animal11.png");
let animal12: any = require("./../../../assets/images/event/animal/animal12.png");
let animal13: any = require("./../../../assets/images/event/animal/animal13.png");
let animal14: any = require("./../../../assets/images/event/animal/animal14.png");
let animal15: any = require("./../../../assets/images/event/animal/animal15.png");
let animal16: any = require("./../../../assets/images/event/animal/animal16.png");
let animal17: any = require("./../../../assets/images/event/animal/animal17.png");
let animal18: any = require("./../../../assets/images/event/animal/animal18.png");
let animal19: any = require("./../../../assets/images/event/animal/animal19.png");
let animal20: any = require("./../../../assets/images/event/animal/animal20.png");
let animal21: any = require("./../../../assets/images/event/animal/animal21.png");
let animal22: any = require("./../../../assets/images/event/animal/animal22.png");
let animal23: any = require("./../../../assets/images/event/animal/animal23.png");
let animal24: any = require("./../../../assets/images/event/animal/animal24.png");
let animal25: any = require("./../../../assets/images/event/animal/animal25.png");
let animal26: any = require("./../../../assets/images/event/animal/animal26.png");
let animal27: any = require("./../../../assets/images/event/animal/animal27.png");
let animal28: any = require("./../../../assets/images/event/animal/animal28.png");
let animal29: any = require("./../../../assets/images/event/animal/animal29.png");
let animal30: any = require("./../../../assets/images/event/animal/animal30.png");
let animal31: any = require("./../../../assets/images/event/animal/animal31.png");
let animal32: any = require("./../../../assets/images/event/animal/animal32.png");
let animal33: any = require("./../../../assets/images/event/animal/animal33.png");
let animal34: any = require("./../../../assets/images/event/animal/animal34.png");
let animal35: any = require("./../../../assets/images/event/animal/animal35.png");
let animal36: any = require("./../../../assets/images/event/animal/animal36.png");
let animal37: any = require("./../../../assets/images/event/animal/animal37.png");
let animal38: any = require("./../../../assets/images/event/animal/animal38.png");
let animal39: any = require("./../../../assets/images/event/animal/animal39.png");
let animal40: any = require("./../../../assets/images/event/animal/animal40.png");
let animal41: any = require("./../../../assets/images/event/animal/animal41.png");
let animal42: any = require("./../../../assets/images/event/animal/animal42.png");
let animal43: any = require("./../../../assets/images/event/animal/animal43.png");
let animal44: any = require("./../../../assets/images/event/animal/animal44.png");
let animal45: any = require("./../../../assets/images/event/animal/animal45.png");
let animal46: any = require("./../../../assets/images/event/animal/animal46.png");
let animal47: any = require("./../../../assets/images/event/animal/animal47.png");
let animal48: any = require("./../../../assets/images/event/animal/animal48.png");
let animal49: any = require("./../../../assets/images/event/animal/animal49.png");
let animal50: any = require("./../../../assets/images/event/animal/animal50.png");
let animal51: any = require("./../../../assets/images/event/animal/animal51.png");
let animal52: any = require("./../../../assets/images/event/animal/animal52.png");
let animal53: any = require("./../../../assets/images/event/animal/animal53.png");
let animal54: any = require("./../../../assets/images/event/animal/animal54.png");
let animal55: any = require("./../../../assets/images/event/animal/animal55.png");
let animal56: any = require("./../../../assets/images/event/animal/animal56.png");
let animal57: any = require("./../../../assets/images/event/animal/animal57.png");
let animal58: any = require("./../../../assets/images/event/animal/animal58.png");
let animal59: any = require("./../../../assets/images/event/animal/animal59.png");
let animal60: any = require("./../../../assets/images/event/animal/animal60.png");

let cloud: any = require("./../../../assets/images/event/cloud.png");
let resource: any = require("./../../../assets/images/event/resource.png");

let disableAnimal: any = require("./../../../assets/images/event/animal/disable-animal.png");
let merging: any = require("./../../../assets/images/event/territories/merging.png");
let tent: any = require("./../../../assets/images/event/territories/tent.png");

let flower1: any = require("./../../../assets/images/event/territories/flower1.png");
let flower2: any = require("./../../../assets/images/event/territories/flower2.png");
let flower3: any = require("./../../../assets/images/event/territories/flower3.png");
let flower4: any = require("./../../../assets/images/event/territories/flower4.png");

let confetti1: any = require("./../../../assets/images/event/territories/confetti1.png");
let confetti2: any = require("./../../../assets/images/event/territories/confetti2.png");
let confetti3: any = require("./../../../assets/images/event/territories/confetti3.png");
let confetti4: any = require("./../../../assets/images/event/territories/confetti4.png");
let confetti5: any = require("./../../../assets/images/event/territories/confetti5.png");
let confetti6: any = require("./../../../assets/images/event/territories/confetti6.png");
let confetti7: any = require("./../../../assets/images/event/territories/confetti7.png");
let confetti8: any = require("./../../../assets/images/event/territories/confetti8.png");

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

const testTerritories: IeventTerritories[] = [
  { _id: 'local_11', block: 1, position: 1, type: 4 },
  { _id: 'local_31', block: 3, position: 1, type: 2 },
  { _id: 'local_32', block: 3, position: 2, type: 2 },
  { _id: 'local_33', block: 3, position: 3, type: 2 },
  { _id: 'local_41', block: 4, position: 1, type: 2 },
  { _id: 'local_42', block: 4, position: 2, type: 2 },
  { _id: 'local_43', block: 4, position: 3, type: 2 },
  { _id: 'local_51', block: 5, position: 1, type: 2 },
  { _id: 'local_52', block: 5, position: 2, type: 2 },
  { _id: 'local_53', block: 5, position: 3, type: 2 },
  { _id: 'local_61', block: 6, position: 1, type: 2 },
  { _id: 'local_62', block: 6, position: 2, type: 2 },
  { _id: 'local_63', block: 6, position: 3, type: 2 },
];

const testEventSettings: IeventSettings = {
  buyBetterBreedAnimal: 2,
  doubledСollectorPrice: 25,
  feedBoostPrice: 35,
  collectorPrice4: 90,
  collectorPrice12: 250,
  unlockCollector4: 5,
  unlockCollector12: 8,
  priceCoefficient: 7,
  eventSettings: [
    { 
      breed: 1, 
      resource: 100, 
      resourcePrice: BigInt(10), 
      price: BigInt(100), 
      exchange: BigInt(1000)
    },
    { 
      breed: 2, 
      resource: 100, 
      resourcePrice: BigInt(20), 
      price: BigInt(1500), 
      exchange: BigInt(2800)
    },
    { 
      breed: 3, 
      resource: 100, 
      resourcePrice: BigInt(40), 
      price: BigInt(4800), 
      exchange: BigInt(7200)
    },
    { 
      breed: 4, 
      resource: 100, 
      resourcePrice: BigInt(90), 
      price: BigInt(15000), 
      exchange: BigInt(17600)
    },
    { 
      breed: 5, 
      resource: 100, 
      resourcePrice: BigInt(190), 
      price: BigInt(48000), 
      exchange: BigInt(41600)
    },
    { 
      breed: 6, 
      resource: 100, 
      resourcePrice: BigInt(400), 
      price: BigInt(150000), 
      exchange: BigInt(96000)
    },
    { 
      breed: 7, 
      resource: 100, 
      resourcePrice: BigInt(850), 
      price: BigInt(480000), 
      exchange: BigInt(217600)
    },
    { 
      breed: 8, 
      resource: 100, 
      resourcePrice: BigInt(1780), 
      price: BigInt(1500000), 
      exchange: BigInt(486600)
    },
    { 
      breed: 9, 
      resource: 100, 
      resourcePrice: BigInt(3750), 
      price: BigInt(4800000), 
      exchange: BigInt(1075200)
    },
    { 
      breed: 10, 
      resource: 100, 
      resourcePrice: BigInt(7900), 
      price: BigInt(15000000), 
      exchange: BigInt(2355200)
    },
    { 
      breed: 11, 
      resource: 100, 
      resourcePrice: BigInt(16000), 
      price: BigInt(48000000), 
      exchange: BigInt(5120000)
    },
    { 
      breed: 12, 
      resource: 100, 
      resourcePrice: BigInt(73000), 
      price: BigInt(480000000), 
      exchange: BigInt(12000000)
    },
    { 
      breed: 13, 
      resource: 100, 
      resourcePrice: BigInt(34000), 
      price: BigInt(150000000), 
      exchange: BigInt(24000000)
    },
    { 
      breed: 14, 
      resource: 100, 
      resourcePrice: BigInt(150000), 
      price: BigInt(1500000000), 
      exchange: BigInt(48000000)
    },
    { 
      breed: 15, 
      resource: 100, 
      resourcePrice: BigInt(320000), 
      price: BigInt(4800000000), 
      exchange: BigInt(96000000)
    },
    { 
      breed: 16, 
      resource: 100, 
      resourcePrice: BigInt(670000), 
      price: BigInt(15000000000), 
      exchange: BigInt(192000000)
    },
    { 
      breed: 17, 
      resource: 100, 
      resourcePrice: BigInt(1400000), 
      price: BigInt(48000000000), 
      exchange: BigInt(384000000)
    },
    { 
      breed: 18, 
      resource: 100, 
      resourcePrice: BigInt(2900000), 
      price: BigInt(150000000000), 
      exchange: BigInt(768000000)
    },
    { 
      breed: 19, 
      resource: 100, 
      resourcePrice: BigInt(6200000), 
      price: BigInt(480000000000), 
      exchange: BigInt(1536000000)
    },
    { 
      breed: 20, 
      resource: 100, 
      resourcePrice: BigInt(13000000), 
      price: BigInt(1500000000000), 
      exchange: BigInt(3072000000)
    },
    { 
      breed: 21, 
      resource: 100, 
      resourcePrice: BigInt(25000000), 
      price: BigInt(4800000000000), 
      exchange: BigInt(6144000000)
    },
    { 
      breed: 22, 
      resource: 100, 
      resourcePrice: BigInt(50200000), 
      price: BigInt(15000000000000), 
      exchange: BigInt(12288000000)
    },
    { 
      breed: 23, 
      resource: 100, 
      resourcePrice: BigInt(100300000), 
      price: BigInt(48000000000000), 
      exchange: BigInt(24576000000)
    },
    { 
      breed: 24, 
      resource: 100, 
      resourcePrice: BigInt(200000000), 
      price: BigInt(150000000000000), 
      exchange: BigInt(49152000000)
    },
    { 
      breed: 25, 
      resource: 100, 
      resourcePrice: BigInt(400000000), 
      price: BigInt(480000000000000), 
      exchange: BigInt(98304000000)
    },
    { 
      breed: 26, 
      resource: 100, 
      resourcePrice: BigInt(800000000), 
      price: BigInt(1500000000000000), 
      exchange: BigInt(196608000000)
    },
    { 
      breed: 27, 
      resource: 100, 
      resourcePrice: BigInt(1600000000), 
      price: BigInt(4800000000000000), 
      exchange: BigInt(393216000000)
    },
    { 
      breed: 28, 
      resource: 100, 
      resourcePrice: BigInt(3200000000), 
      price: BigInt(15000000000000000), 
      exchange: BigInt(786432000000)
    },
    { 
      breed: 29, 
      resource: 100, 
      resourcePrice: BigInt(6400000000), 
      price: BigInt(48000000000000000), 
      exchange: BigInt(1572864000000)
    },
    { 
      breed: 30, 
      resource: 100, 
      resourcePrice: BigInt(12800000000), 
      price: BigInt(150000000000000000), 
      exchange: BigInt(3145728000000)
    },
    { 
      breed: 31, 
      resource: 100, 
      resourcePrice: BigInt(25600000000), 
      price: BigInt(480000000000000000), 
      exchange: BigInt(6291456000000)
    },
    { 
      breed: 32, 
      resource: 100, 
      resourcePrice: BigInt(51200000000), 
      price: BigInt(1500000000000000000), 
      exchange: BigInt(12582912000000)
    },
    { 
      breed: 33, 
      resource: 100, 
      resourcePrice: BigInt(102400000000), 
      price: BigInt(4800000000000000000), 
      exchange: BigInt(25165824000000)
    },
    { 
      breed: 34, 
      resource: 100, 
      resourcePrice: BigInt(204800000000), 
      price: BigInt(15000000000000000000), 
      exchange: BigInt(50331648000000)
    },
    { 
      breed: 35, 
      resource: 100, 
      resourcePrice: BigInt(409600000000), 
      price: BigInt(48000000000000000000), 
      exchange: BigInt(100663296000000)
    },
    { 
      breed: 36, 
      resource: 100, 
      resourcePrice: BigInt(819200000000), 
      price: BigInt(150000000000000000000), 
      exchange: BigInt(201326592000000)
    },
    { 
      breed: 37, 
      resource: 100, 
      resourcePrice: BigInt(1638400000000), 
      price: BigInt(480000000000000000000), 
      exchange: BigInt(402653184000000)
    },
    { 
      breed: 38, 
      resource: 100, 
      resourcePrice: BigInt(3276800000000), 
      price: BigInt(1500000000000000000000), 
      exchange: BigInt(805306368000000)
    },
    { 
      breed: 39, 
      resource: 100, 
      resourcePrice: BigInt(6553600000000), 
      price: BigInt(4800000000000000000000), 
      exchange: BigInt(1610612736000000)
    },
    { 
      breed: 40, 
      resource: 100, 
      resourcePrice: BigInt(13107200000000), 
      price: BigInt(15000000000000000000000), 
      exchange: BigInt(3221225472000000)
    },
    { 
      breed: 41, 
      resource: 100, 
      resourcePrice: BigInt(26214400000000), 
      price: BigInt(48000000000000000000000), 
      exchange: BigInt(6442450944000000)
    },
    { 
      breed: 42, 
      resource: 100, 
      resourcePrice: BigInt(52428800000000), 
      price: BigInt(150000000000000000000000), 
      exchange: BigInt(12884901888000000)
    },
    { 
      breed: 43, 
      resource: 100, 
      resourcePrice: BigInt(104857600000000), 
      price: BigInt(480000000000000000000000), 
      exchange: BigInt(25769803776000000)
    },
    { 
      breed: 44, 
      resource: 100, 
      resourcePrice: BigInt(209715200000000), 
      price: BigInt(1500000000000000000000000), 
      exchange: BigInt(51539607552000000)
    },
    { 
      breed: 45, 
      resource: 100, 
      resourcePrice: BigInt(419430400000000), 
      price: BigInt(4800000000000000000000000), 
      exchange: BigInt(103079215104000000)
    },
    { 
      breed: 46, 
      resource: 100, 
      resourcePrice: BigInt(838860800000000), 
      price: BigInt(15000000000000000000000000), 
      exchange: BigInt(206158430208000000)
    },
    { 
      breed: 47, 
      resource: 100, 
      resourcePrice: BigInt(1677721600000000), 
      price: BigInt(48000000000000000000000000), 
      exchange: BigInt(412316860416000000)
    },
    { 
      breed: 48, 
      resource: 100, 
      resourcePrice: BigInt(3355443200000000), 
      price: BigInt(150000000000000000000000000), 
      exchange: BigInt(824633720832000000)
    },
    { 
      breed: 49, 
      resource: 100, 
      resourcePrice: BigInt(6710886400000000), 
      price: BigInt(480000000000000000000000000), 
      exchange: BigInt(1649267441664000000)
    },
    { 
      breed: 50, 
      resource: 100, 
      resourcePrice: BigInt(13421772800000000), 
      price: BigInt(1500000000000000000000000000), 
      exchange: BigInt(3298534883328000000)
    },
    { 
      breed: 51, 
      resource: 100, 
      resourcePrice: BigInt(26843545600000000), 
      price: BigInt(4800000000000000000000000000), 
      exchange: BigInt(6597069766656000000)
    },
    { 
      breed: 52, 
      resource: 100, 
      resourcePrice: BigInt(53687091200000000), 
      price: BigInt(15000000000000000000000000000), 
      exchange: BigInt(13194139533312000000)
    },
    { 
      breed: 53, 
      resource: 100, 
      resourcePrice: BigInt(107374182400000000), 
      price: BigInt(48000000000000000000000000000), 
      exchange: BigInt(26388279066624000000)
    },
    { 
      breed: 54, 
      resource: 100, 
      resourcePrice: BigInt(214748364800000000), 
      price: BigInt(150000000000000000000000000000), 
      exchange: BigInt(52776558133248000000)
    },
    { 
      breed: 55, 
      resource: 100, 
      resourcePrice: BigInt(429496729600000000), 
      price: BigInt(480000000000000000000000000000), 
      exchange: BigInt(105553116266496000000)
    },
    { 
      breed: 56, 
      resource: 100, 
      resourcePrice: BigInt(858993459200000000), 
      price: BigInt(1500000000000000000000000000000), 
      exchange: BigInt(211106232532992000000)
    },
    { 
      breed: 57, 
      resource: 100, 
      resourcePrice: BigInt(1717986918400000000), 
      price: BigInt(4800000000000000000000000000000), 
      exchange: BigInt(422212465065984000000)
    },
    { 
      breed: 58, 
      resource: 100, 
      resourcePrice: BigInt(3435973836800000000), 
      price: BigInt(15000000000000000000000000000000), 
      exchange: BigInt(844424930131968000000)
    },
    { 
      breed: 59, 
      resource: 100, 
      resourcePrice: BigInt(6871947673600000000), 
      price: BigInt(48000000000000000000000000000000), 
      exchange: BigInt(1688849860263940000000)
    },
    { 
      breed: 60, 
      resource: 100, 
      resourcePrice: BigInt(13743895347200000000), 
      price: BigInt(150000000000000000000000000000000), 
      exchange: BigInt(3377699720527870000000)
    },
  ],
  territoriesEventPrice: [
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
  territoriesEventSettings: [
    { improve: 1, regeneration: 11, countResources: 5, unlock_improve: 1, resourceStorage: 200 },
    { improve: 2, regeneration: 22, countResources: 5, unlock_improve: 2, resourceStorage: 700 },
    { improve: 3, regeneration: 33, countResources: 5, unlock_improve: 5, resourceStorage: 1500 },
    { improve: 4, regeneration: 44, countResources: 5, unlock_improve: 8, resourceStorage: 4000 }
  ]
}

const testUserEvent: IuserEvent = {
  money: BigInt(10000),
  herdBoostAnimals: [],
  countAnimal: [ // количество купленных животных
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    {counter: 1},
    
  ],
  collector: 0,
  collectorLevel: 1,
  collectorTakenTime: 0,
  maxLevelAnimal: 0,
  tutorial: 0,
  autosaveCounter: 0,
  takenHerdBoost: 0,
  feedBoostTime: 0
}

class EventPreload extends Phaser.Scene {

  public lang: string; // индекс языка
  public state: Istate;
  public userReady: boolean;
  public loadingReady: boolean;
  public socket: boolean;
  public loadTime: number;
  public startTime: number;

  constructor() {
    super('EventPreload');
  }

  
  public init(state: Istate): void {

    this.state  = state;
    this.userReady = false;
    this.loadingReady = false;
    // this.loadUser();
    //удалить по завершению тестов и появлянию бэка
    // -------
    this.userReady = true;
    this.state.eventTerritories = testTerritories;
    this.state.eventSettings = testEventSettings;
    this.state.userEvent = testUserEvent;
    this.state.eventCollectorSettings = testCollector;
    this.state.eventAnimals = [];
    this.state.farm = 'Event';
    // -------
    this.startTime = Math.round(new Date().getTime() / 1000);

    if (!this.state.socket) {
      this.socket = true;
      this.loadTime = Math.round(new Date().getTime() / 1000);
      this.state.socket = new Socket(this.state);
    }

  }
  
  public preload(): void {

    let loading: string = this.state.lang.loading;

    // экран загрузки
    let height: number = 200; // параметр для высоты окна
    let text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 11, '0%', {
      font: '37px Shadow',
      color: '#1F5B06'
    }).setDepth(1).setOrigin(0.5, 0.5);

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - Math.floor(height / 2), 'header-syst')
      .setOrigin(0.5, 1);
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + Math.floor(height / 2), 'bottom-syst')
      .setOrigin(0.5, 0);
    this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 614, height + 2, "mid-syst")
      .setOrigin(0.5, 0.5);
    
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - Math.floor(height / 2) - 22, loading, {
      font: '37px Shadow',
      color: '#F9D48D'
    }).setDepth(1).setOrigin(0.5, 1);

    this.add.image(120, this.cameras.main.centerY + 20, 'pb-empty-corner');
    this.add.image(600, this.cameras.main.centerY + 20, 'pb-empty-corner').setScale(-1, 1);
    this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY + 20, 436, 130, 'pb-empty-mid');
    
    let leftCorner = this.add.image(120, this.cameras.main.centerY + 20, 'pb-full-corner')
      .setAlpha(0);
    let rightCorner = this.add.image(600, this.cameras.main.centerY + 20, 'pb-full-corner')
      .setFlip(true, false)
      .setAlpha(0);
    let progress = this.add.tileSprite(142, this.cameras.main.centerY + 20, 0, 130, 'pb-full-mid')
      .setOrigin(0, 0.5);

    // прогресс загрузки
    this.load.on('progress', (value: number): void => {

      let percent: number = Math.round(value * 100);

      if (percent >= 5 && leftCorner.alpha === 0) leftCorner.setAlpha(1);
      if (percent >= 95 && rightCorner.alpha === 0) {
        progress.setDisplaySize(436, 130);
        rightCorner.setAlpha(1);
      }

      if (percent > 5 && percent < 95) {

        let onePercent: number = 420 / 90;
        let bar = Math.round(percent * onePercent); 
        progress.setDisplaySize(bar, 130);
        
      }
      
      text.setText(percent + '%');

    });


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
    this.load.image('eventCoin', coin);
    this.load.image('diamond', diamond);
    this.load.image('lock', lock);
    this.load.image('gift', gift);
    this.load.spritesheet('firework250', firework250, { frameWidth: 250, frameHeight: 250 });
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

    this.load.image('event-vertical-border', verticalBorder);
    this.load.image('event-horizontal-border-1', horizontalBorder1);
    this.load.image('event-horizontal-border-2', horizontalBorder2);
    this.load.image('event-horizontal-border-3', horizontalBorder3);

    this.load.image('event-leaves', eventLeaves);

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
    // this.load.image('event-buy-icon-13', eventBuyIcon13);
    // this.load.image('event-buy-icon-14', eventBuyIcon14);
    // this.load.image('event-buy-icon-15', eventBuyIcon15);
    // this.load.image('event-buy-icon-16', eventBuyIcon16);
    // this.load.image('event-buy-icon-17', eventBuyIcon17);
    // this.load.image('event-buy-icon-18', eventBuyIcon18);
    // this.load.image('event-buy-icon-19', eventBuyIcon19);
    // this.load.image('event-buy-icon-20', eventBuyIcon20);
    // this.load.image('event-buy-icon-21', eventBuyIcon21);
    // this.load.image('event-buy-icon-22', eventBuyIcon22);
    // this.load.image('event-buy-icon-23', eventBuyIcon23);
    // this.load.image('event-buy-icon-24', eventBuyIcon24);
    // this.load.image('event-buy-icon-25', eventBuyIcon25);
    // this.load.image('event-buy-icon-26', eventBuyIcon26);
    // this.load.image('event-buy-icon-27', eventBuyIcon27);
    // this.load.image('event-buy-icon-28', eventBuyIcon28);
    // this.load.image('event-buy-icon-29', eventBuyIcon29);
    // this.load.image('event-buy-icon-30', eventBuyIcon30);
    // this.load.image('event-buy-icon-31', eventBuyIcon31);
    // this.load.image('event-buy-icon-32', eventBuyIcon32);
    // this.load.image('event-buy-icon-33', eventBuyIcon33);
    // this.load.image('event-buy-icon-34', eventBuyIcon34);
    // this.load.image('event-buy-icon-35', eventBuyIcon35);
    // this.load.image('event-buy-icon-36', eventBuyIcon36);
    // this.load.image('event-buy-icon-37', eventBuyIcon37);
    // this.load.image('event-buy-icon-38', eventBuyIcon38);
    // this.load.image('event-buy-icon-39', eventBuyIcon39);
    // this.load.image('event-buy-icon-40', eventBuyIcon40);
    // this.load.image('event-buy-icon-41', eventBuyIcon41);
    // this.load.image('event-buy-icon-42', eventBuyIcon42);
    // this.load.image('event-buy-icon-43', eventBuyIcon43);
    // this.load.image('event-buy-icon-44', eventBuyIcon44);
    // this.load.image('event-buy-icon-45', eventBuyIcon45);
    // this.load.image('event-buy-icon-46', eventBuyIcon46);
    // this.load.image('event-buy-icon-47', eventBuyIcon47);
    // this.load.image('event-buy-icon-48', eventBuyIcon48);
    // this.load.image('event-buy-icon-49', eventBuyIcon49);
    // this.load.image('event-buy-icon-50', eventBuyIcon50);
    // this.load.image('event-buy-icon-51', eventBuyIcon51);
    // this.load.image('event-buy-icon-52', eventBuyIcon52);
    // this.load.image('event-buy-icon-53', eventBuyIcon53);
    // this.load.image('event-buy-icon-54', eventBuyIcon54);
    // this.load.image('event-buy-icon-55', eventBuyIcon55);
    // this.load.image('event-buy-icon-56', eventBuyIcon56);
    // this.load.image('event-buy-icon-57', eventBuyIcon57);
    // this.load.image('event-buy-icon-58', eventBuyIcon58);
    // this.load.image('event-buy-icon-59', eventBuyIcon59);
    // this.load.image('event-buy-icon-60', eventBuyIcon60);

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
    this.load.image('cloud', cloud);
    this.load.image('event-resource', resource);

    this.load.image('pixel', pixel);
    this.load.image('event-merging', merging);
    this.load.image('event-tent', tent);

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
  }

  
  public create(): void {
    console.log('eventPreload')
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
      this.scene.start('Event', this.state); // сцена с евентом
      this.scene.start('EventBars', this.state); // сцена с барами
      this.scene.start('Preload', this.state); // сцена с подзагрузкой

    }

  }

  
  public loadUser(): void {
  
    axios.post(process.env.API + '/event/loadData', {
      hash: this.state.user.hash
    }).then((response) => {

      // checkStorage(response.data.user.hash);

      // let localSaveCounter: number = 0;

      // if (localStorage.userEvent) {
      //   let user: IuserEvent = JSON.parse(localStorage.userEvent);
      //   if (typeof user.autosaveCounter === 'number') localSaveCounter = user.autosaveCounter;
      // }

      // if (response.data.user.eventSaveCounter >= localSaveCounter) {

        // общие настройки
        this.state.autoSaveSpeed = response.data.autoSaveSpeed;
        this.state.maxMerginTime = response.data.maxMerginTime;
        this.state.packages = response.data.packages;
        this.state.herdBoostSpeedAnimal = response.data.herdBoostSpeedAnimal;
        this.state.herdBoostTime = response.data.herdBoostTime;
        this.state.herdBoostPrice = response.data.herdBoostPrice;
        this.state.herdBoostDelay = response.data.herdBoostDelay;
        
        // массив с настройками для евентовой фермы
        const eventSettings: IeventSettings = {  // IeventSettings Нужно делать интерфейс
          territoriesEventSettings: response.data.territoriesEventSettings,
          eventSettings: response.data.eventSettings,
          territoriesEventPrice: response.data.territoriesEventPrice,
          buyBetterBreedAnimal: response.data.buyBetterBreedAnimal,
          doubledСollectorPrice: response.data.doubledСollectorPrice,
          collectorPrice4: response.data.collectorPrice4,
          collectorPrice12: response.data.collectorPrice12,
          unlockCollector4: response.data.unlockCollector4,
          unlockCollector12: response.data.unlockCollector12,
          priceCoefficient: response.data.priceCoefficient,
          feedBoostPrice: response.data.feedBoostPrice
        }

        this.state.eventSettings = eventSettings;

        const eventAnimals: IeventAnimal[] = []; // IeventAnimal

        for (let i in response.data.animals) {
          
          let animal = response.data.animals[i];
          eventAnimals.push({
            _id: animal._id,
            type: animal.type,
            activeAnimal: animal.active,
            x: animal.x,
            y: animal.y,
          });

        }
        
        const eventTerritories: IeventTerritories[] = [];
        
        for (let i in response.data.territories) {

          let territory = response.data.territories[i];

          eventTerritories.push({
            _id: territory._id,
            block: territory.block,
            position: territory.position,
            type: territory.type
          });

        }

        const eventResources: IeventResource[] = []; // IeventResource

        for (let i in response.data.eventResources) {

          let eventResource = response.data.eventResources[i];

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
        }

        const userEvent: IuserEvent = {  // нужно делать интерфейс IuserEvent
          money: response.data.user.eventMoney,
          countAnimal: response.data.user.countEvent,
          collector: response.data.user.eventCollector,
          collectorLevel: response.data.user.eventCollectorLevel,
          collectorTakenTime: response.data.user.eventCollector,
          tutorial: response.data.user.eventTutor,
          autosaveCounter: response.data.user.eventSaveCounter,
          takenHerdBoost: response.data.user.takenHerdBoostEvent,
          feedBoostTime: response.data.user.feedBoostTime,
          maxLevelAnimal: response.data.user.maxLevelAnimal,
          herdBoostAnimals: response.data.user.herdBoostAnimals
        }
        
        // переписываем стейт
        this.state.timeToHerdBoost = response.data.timeToHerdBoost;
        this.state.eventCollectorSettings = response.data.collectorSettings;
        this.state.offlineTime = response.data.offlineTime;
        this.state.progress = response.data.progress;
        this.state.eventTerritories = eventTerritories;
        this.state.eventAnimals = eventAnimals;
        this.state.eventResources = eventResources; 
        this.state.user = user;
        this.state.userEvent = userEvent;
        this.state.farm = 'Event';
        this.userReady = true;
        this.state.nativeCounter = [0, 0, 0, 0];
      // } else {
      //   this.loadChicken(response.data.user.counter);
      // }
      
    })
    // .catch(() => {
    //   this.loadChicken();
    // });

    // localStorage.farm = 'Event';
  }

}

export default EventPreload;
