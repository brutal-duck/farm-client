import axios from 'axios';
import tasks from '../../tasks';
import Socket from '../../Socket';

let pixel: any = require("./../../../assets/images/pixel.png");
let bg: any = require("./../../../assets/images/scroll-bg.png");
let top: any = require("./../../../assets/images/event/top.png");
let bottom: any = require("./../../../assets/images/event/bottom.png");
let topbar: any = require("./../../../assets/images/topbar.png");
let tabbar: any = require("./../../../assets/images/tabbar.png");
let resourceCollector: any = require("./../../../assets/images/event/event-collector.png");
let shop: any = require("./../../../assets/images/icons/shop.png");
let mapIcon: any = require("./../../../assets/images/icons/map.png");
let sandwich: any = require("./../../../assets/images/icons/sandwich.png");
let sandwichClose: any = require("./../../../assets/images/icons/sandwich-close.png");
let profile: any = require("./../../../assets/images/icons/profile.png");
let chat: any = require("./../../../assets/images/icons/chat.png");
let forBuying: any = require("./../../../assets/images/event/territories/for-buying.png");
let bought: any = require("./../../../assets/images/event/territories/bought.png");
let lockTerritory: any = require("./../../../assets/images/lock-territory.png");
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
let grass1: any = require("./../../../assets/images/event/territories/grass1-1.png");
let grass2: any = require("./../../../assets/images/event/territories/grass1-2.png");
let grass3: any = require("./../../../assets/images/event/territories/grass1-3.png");
let grass4: any = require("./../../../assets/images/event/territories/grass1-4.png");
let grass5: any = require("./../../../assets/images/event/territories/grass1-5.png");
let forest1: any = require("./../../../assets/images/event/territories/forest-1.png");
let forest2: any = require("./../../../assets/images/event/territories/forest-2.png");
let forest3: any = require("./../../../assets/images/event/territories/forest-3.png");
let forest4: any = require("./../../../assets/images/event/territories/forest-4.png");
let forest5: any = require("./../../../assets/images/event/territories/forest-5.png");
let forest6: any = require("./../../../assets/images/event/territories/forest-6.png");
let forest7: any = require("./../../../assets/images/event/territories/forest-7.png");
let forest8: any = require("./../../../assets/images/event/territories/forest-8.png");
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
let animal0: any = require("./../../../assets/images/event/animal/animal0.png");
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
let resource0: any = require("./../../../assets/images/event/resources/resource0.png");
let resource1: any = require("./../../../assets/images/event/resources/resource1.png");
let resource2: any = require("./../../../assets/images/event/resources/resource2.png");
let resource3: any = require("./../../../assets/images/event/resources/resource3.png");
let resource4: any = require("./../../../assets/images/event/resources/resource4.png");
let resource5: any = require("./../../../assets/images/event/resources/resource5.png");
let resource6: any = require("./../../../assets/images/event/resources/resource6.png");
let resource7: any = require("./../../../assets/images/event/resources/resource7.png");
let resource8: any = require("./../../../assets/images/event/resources/resource8.png");
let resource9: any = require("./../../../assets/images/event/resources/resource9.png");
let resource10: any = require("./../../../assets/images/event/resources/resource10.png");
let resource11: any = require("./../../../assets/images/event/resources/resource11.png");
let resource12: any = require("./../../../assets/images/event/resources/resource12.png");
let disableAnimal: any = require("./../../../assets/images/event/animal/disable-animal.png");
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
  { _id: 'local_42', block: 4, position: 2, type: 0 },
  { _id: 'local_43', block: 4, position: 3, type: 0 },
  { _id: 'local_51', block: 5, position: 1, type: 0 },
  { _id: 'local_52', block: 5, position: 2, type: 0 },
  { _id: 'local_53', block: 5, position: 3, type: 0 },
  { _id: 'local_61', block: 6, position: 1, type: 0 },
  { _id: 'local_62', block: 6, position: 2, type: 0 },
  { _id: 'local_63', block: 6, position: 3, type: 0 },
];

const testEventSettings: IeventSettings = {
  buyBetterBreedAnimal: 2,
  doubledСollectorPrice: 25,
  collectorPrice4: 90,
  collectorPrice12: 250,
  unlockCollector4: 5,
  unlockCollector12: 8,
  priceCoefficient: 7,
  eventSettings: [
    { breed: 1, resource: 100, resourcePrice: 100, price: 100, exchange: 10},
    { breed: 2, resource: 100, resourcePrice: 200, price: 200, exchange: 20},
    { breed: 3, resource: 100, resourcePrice: 400, price: 500, exchange: 30},
    { breed: 4, resource: 100, resourcePrice: 800, price: 600, exchange: 40},
    { breed: 5, resource: 100, resourcePrice: 1600, price: 800, exchange: 50},
    { breed: 6, resource: 100, resourcePrice: 3200, price: 1000, exchange: 60},
    { breed: 7, resource: 100, resourcePrice: 6400, price: 10000, exchange: 70},
    { breed: 8, resource: 100, resourcePrice: 12800, price: 1000000, exchange: 80},
    { breed: 9, resource: 100, resourcePrice: 25600, price: 1000000, exchange: 90},
    { breed: 10, resource: 100, resourcePrice: 51200, price: 1000000, exchange: 100},
    { breed: 11, resource: 100, resourcePrice: 102400, price: 1000000, exchange: 110},
    { breed: 12, resource: 100, resourcePrice: 204800, price: 1000000, exchange: 120}
  ],
  territoriesEventPrice: [
    { block: 3, position: 2, diamond: 0, price: 0, unlock: 0 },
    { block: 3, position: 3, diamond: 0, price: 0, unlock: 0 },
    { block: 4, position: 1, diamond: 0, price: 0, unlock: 0 },
    { block: 4, position: 2, diamond: 0, price: 2000, unlock: 2 },
    { block: 4, position: 3, diamond: 0, price: 4000, unlock: 3 },
    { block: 5, position: 1, diamond: 0, price: 5000, unlock: 3 },
    { block: 5, position: 2, diamond: 1, price: 0, unlock: 4 },
    { block: 5, position: 3, diamond: 1, price: 0, unlock: 8 },
    { block: 6, position: 1, diamond: 1, price: 0, unlock: 10 },
    { block: 6, position: 2, diamond: 1, price: 0, unlock: 11 },
    { block: 6, position: 3, diamond: 1, price: 0, unlock: 12 },
  ],
  territoriesEventSettings: [
    { improve: 1, regeneration: 11, countResources: 5, unlock_improve: 1, resourceStorage: 200 },
    { improve: 2, regeneration: 22, countResources: 5, unlock_improve: 2, resourceStorage: 700 },
    { improve: 3, regeneration: 33, countResources: 5, unlock_improve: 5, resourceStorage: 1500 },
    { improve: 4, regeneration: 44, countResources: 5, unlock_improve: 8, resourceStorage: 4000 }
  ]
}

const testUserEvent: IuserEvent = {
  money: 10000,
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
    this.load.image('topbar', topbar);
    this.load.image('tabbar', tabbar);
    this.load.image('event-collector', resourceCollector);
    this.load.image('shop', shop);
    this.load.image('map-icon', mapIcon);
    this.load.image('sandwich', sandwich);
    this.load.image('sandwich-close', sandwichClose);
    this.load.image('profile', profile);
    this.load.image('chat', chat);
    this.load.image('event-for-buying', forBuying);
    this.load.image('event-bought', bought);
    this.load.image('lock-territory', lockTerritory);
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
    this.load.image('event-grass1', grass1);
    this.load.image('event-grass2', grass2);
    this.load.image('event-grass3', grass3);
    this.load.image('event-grass4', grass4);
    this.load.image('event-grass5', grass5);

    this.load.image('event-forest-1', forest1);
    this.load.image('event-forest-2', forest2);
    this.load.image('event-forest-3', forest3);
    this.load.image('event-forest-4', forest4);
    this.load.image('event-forest-5', forest5);
    this.load.image('event-forest-6', forest6);
    this.load.image('event-forest-7', forest7);
    this.load.image('event-forest-8', forest8);

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

    this.load.image('disable-animal', disableAnimal);
    this.load.spritesheet('animal0', animal0, { frameWidth: 109, frameHeight: 138 });
    this.load.spritesheet('animal1', animal1, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('animal2', animal2, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('animal3', animal3, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('animal4', animal4, { frameWidth: 115, frameHeight: 137 });
    this.load.spritesheet('animal5', animal5, { frameWidth: 115, frameHeight: 150 });
    this.load.spritesheet('animal6', animal6, { frameWidth: 115, frameHeight: 150 });
    this.load.spritesheet('animal7', animal7, { frameWidth: 115, frameHeight: 142 });
    this.load.spritesheet('animal8', animal8, { frameWidth: 115, frameHeight: 150 });
    this.load.spritesheet('animal9', animal9, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('animal10', animal10, { frameWidth: 115, frameHeight: 145 });
    this.load.spritesheet('animal11', animal11, { frameWidth: 115, frameHeight: 133 });
    this.load.spritesheet('animal12', animal12, { frameWidth: 115, frameHeight: 150 });

    this.load.image('event-resource0', resource0);
    this.load.image('event-resource1', resource1);
    this.load.image('event-resource2', resource2);
    this.load.image('event-resource3', resource3);
    this.load.image('event-resource4', resource4);
    this.load.image('event-resource5', resource5);
    this.load.image('event-resource6', resource6);
    this.load.image('event-resource7', resource7);
    this.load.image('event-resource8', resource8);
    this.load.image('event-resource9', resource9);
    this.load.image('event-resource10', resource10);
    this.load.image('event-resource11', resource11);
    this.load.image('event-resource12', resource12);

    this.load.image('pixel', pixel);
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
