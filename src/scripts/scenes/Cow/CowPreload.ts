import axios from 'axios';
import Socket from '../../Socket';
import loadCow from '../../local/loadCow';
import loadData from '../../general/loadData';
import { loadingScreen, checkStorage } from '../../general/basic';
import LocalStorage from './../../libs/LocalStorage';
import { clickShopBtn } from '../../general/clicks';
import { general } from '../../local/settings';
import ErrorWindow from './../../components/Web/ErrorWindow';

const pixel: string = require('./../../../assets/images/pixel.png');
const bg: string = require('./../../../assets/images/scroll-bg.png');
const top: string = require('./../../../assets/images/cow/top.png');
const bottom: string = require('./../../../assets/images/cow/bottom.png');
const topbar: string = require('./../../../assets/images/topbar.png');
const tabbar: string = require('./../../../assets/images/tabbar.png');
const cowBuyIcon1: string = require('./../../../assets/images/cow/icons/cow-buy-icon-1.png');
const cowBuyIcon2: string = require('./../../../assets/images/cow/icons/cow-buy-icon-2.png');
const cowBuyIcon3: string = require('./../../../assets/images/cow/icons/cow-buy-icon-3.png');
const cowBuyIcon4: string = require('./../../../assets/images/cow/icons/cow-buy-icon-4.png');
const cowBuyIcon5: string = require('./../../../assets/images/cow/icons/cow-buy-icon-5.png');
const cowBuyIcon6: string = require('./../../../assets/images/cow/icons/cow-buy-icon-6.png');
const cowBuyIcon7: string = require('./../../../assets/images/cow/icons/cow-buy-icon-7.png');
const cowBuyIcon8: string = require('./../../../assets/images/cow/icons/cow-buy-icon-8.png');
const cowBuyIcon9: string = require('./../../../assets/images/cow/icons/cow-buy-icon-9.png');
const cowBuyIcon10: string = require('./../../../assets/images/cow/icons/cow-buy-icon-10.png');
const cowBuyIcon11: string = require('./../../../assets/images/cow/icons/cow-buy-icon-11.png');
const cowBuyIcon12: string = require('./../../../assets/images/cow/icons/cow-buy-icon-12.png');
const milkCollector: string = require('./../../../assets/images/cow/milk-collector.png');
const shop: string = require('./../../../assets/images/icons/shop.png');
const mapIcon: string = require('./../../../assets/images/icons/map.png');
const sandwich: string = require('./../../../assets/images/icons/sandwich.png');
const sandwichClose: string = require('./../../../assets/images/icons/sandwich-close.png');
const profile: string = require('./../../../assets/images/icons/profile.png');
const fortune: string = require('./../../../assets/images/icons/fortune.png');
const chat: string = require('./../../../assets/images/icons/chat.png');
const forBuying: string = require('./../../../assets/images/cow/territories/for-buying.png');
const bought: string = require('./../../../assets/images/cow/territories/bought.png');
const merging: string = require('./../../../assets/images/cow/territories/merging.png');
const tent: string = require('./../../../assets/images/cow/territories/tent.png');
const house: string = require('./../../../assets/images/cow/territories/house.png');
const ground: string = require('./../../../assets/images/cow/territories/ground.png');
const repository: string = require('./../../../assets/images/cow/territories/repository.png');
const factory: string = require('./../../../assets/images/cow/territories/factory.png');
const repository11: string = require('./../../../assets/images/cow/territories/repository-1-1.png');
const repository21: string = require('./../../../assets/images/cow/territories/repository-2-1.png');
const repository31: string = require('./../../../assets/images/cow/territories/repository-3-1.png');
const repository41: string = require('./../../../assets/images/cow/territories/repository-4-1.png');
const repository12: string = require('./../../../assets/images/cow/territories/repository-1-2.png');
const repository22: string = require('./../../../assets/images/cow/territories/repository-2-2.png');
const repository32: string = require('./../../../assets/images/cow/territories/repository-3-2.png');
const repository42: string = require('./../../../assets/images/cow/territories/repository-4-2.png');
const repository13: string = require('./../../../assets/images/cow/territories/repository-1-3.png');
const repository23: string = require('./../../../assets/images/cow/territories/repository-2-3.png');
const repository33: string = require('./../../../assets/images/cow/territories/repository-3-3.png');
const repository43: string = require('./../../../assets/images/cow/territories/repository-4-3.png');
const repository14: string = require('./../../../assets/images/cow/territories/repository-1-4.png');
const repository24: string = require('./../../../assets/images/cow/territories/repository-2-4.png');
const repository34: string = require('./../../../assets/images/cow/territories/repository-3-4.png');
const repository44: string = require('./../../../assets/images/cow/territories/repository-4-4.png');
const grass11: string = require('./../../../assets/images/cow/territories/grass1-1.png');
const grass12: string = require('./../../../assets/images/cow/territories/grass1-2.png');
const grass13: string = require('./../../../assets/images/cow/territories/grass1-3.png');
const grass14: string = require('./../../../assets/images/cow/territories/grass1-4.png');
const grass21: string = require('./../../../assets/images/cow/territories/grass2-1.png');
const grass22: string = require('./../../../assets/images/cow/territories/grass2-2.png');
const grass23: string = require('./../../../assets/images/cow/territories/grass2-3.png');
const grass24: string = require('./../../../assets/images/cow/territories/grass2-4.png');
const grass31: string = require('./../../../assets/images/cow/territories/grass3-1.png');
const grass32: string = require('./../../../assets/images/cow/territories/grass3-2.png');
const grass33: string = require('./../../../assets/images/cow/territories/grass3-3.png');
const grass34: string = require('./../../../assets/images/cow/territories/grass3-4.png');
const grass41: string = require('./../../../assets/images/cow/territories/grass4-1.png');
const grass42: string = require('./../../../assets/images/cow/territories/grass4-2.png');
const grass43: string = require('./../../../assets/images/cow/territories/grass4-3.png');
const grass44: string = require('./../../../assets/images/cow/territories/grass4-4.png');
const water11: string = require('./../../../assets/images/cow/territories/water1-1.png');
const water12: string = require('./../../../assets/images/cow/territories/water1-2.png');
const water13: string = require('./../../../assets/images/cow/territories/water1-3.png');
const water14: string = require('./../../../assets/images/cow/territories/water1-4.png');
const water21: string = require('./../../../assets/images/cow/territories/water2-1.png');
const water22: string = require('./../../../assets/images/cow/territories/water2-2.png');
const water23: string = require('./../../../assets/images/cow/territories/water2-3.png');
const water24: string = require('./../../../assets/images/cow/territories/water2-4.png');
const water31: string = require('./../../../assets/images/cow/territories/water3-1.png');
const water32: string = require('./../../../assets/images/cow/territories/water3-2.png');
const water33: string = require('./../../../assets/images/cow/territories/water3-3.png');
const water34: string = require('./../../../assets/images/cow/territories/water3-4.png');
const water41: string = require('./../../../assets/images/cow/territories/water4-1.png');
const water42: string = require('./../../../assets/images/cow/territories/water4-2.png');
const water43: string = require('./../../../assets/images/cow/territories/water4-3.png');
const water44: string = require('./../../../assets/images/cow/territories/water4-4.png');
const lockTerritory: string = require('./../../../assets/images/lock-territory.png');
const cow0: string = require('./../../../assets/images/cow/cow/cow0.png');
const cowHorns1: string = require('./../../../assets/images/cow/cow/horns-1.png');
const cowHorns2: string = require('./../../../assets/images/cow/cow/horns-2.png');
const cowHorns3: string = require('./../../../assets/images/cow/cow/horns-3.png');
const cow1: string = require('./../../../assets/images/cow/cow/cow1.png');
const cow2: string = require('./../../../assets/images/cow/cow/cow2.png');
const cow3: string = require('./../../../assets/images/cow/cow/cow3.png');
const cow4: string = require('./../../../assets/images/cow/cow/cow4.png');
const cow5: string = require('./../../../assets/images/cow/cow/cow5.png');
const cow6: string = require('./../../../assets/images/cow/cow/cow6.png');
const cow7: string = require('./../../../assets/images/cow/cow/cow7.png');
const cow8: string = require('./../../../assets/images/cow/cow/cow8.png');
const cow9: string = require('./../../../assets/images/cow/cow/cow9.png');
const cow10: string = require('./../../../assets/images/cow/cow/cow10.png');
const cow11: string = require('./../../../assets/images/cow/cow/cow11.png');
const cow12: string = require('./../../../assets/images/cow/cow/cow12.png');
const milkStatus: string = require('./../../../assets/images/cow/icons/milk-status.png');
const diamondStatus: string = require('./../../../assets/images/icons/diamond-status.png');
const milk: string = require('./../../../assets/images/cow/milk.png');
const mergingAnimation: string = require('./../../../assets/images/merging-animation.png');
const coin: string = require('./../../../assets/images/cow/icons/money.png');
const diamond: string = require('./../../../assets/images/icons/diamonds.png');
const lock: string = require('./../../../assets/images/icons/lock.png');
const disablecow: string = require('./../../../assets/images/cow/cow/disable-cow.png');
const houseSprite: string = require('./../../../assets/images/cow/houses/house-10.png');
const caveDisalble: string = require('./../../../assets/images/cave/cave-disable.png');
const caveReady: string = require('./../../../assets/images/cave/cave-ready.png');
const caveWait: string = require('./../../../assets/images/cave/cave-wait.png');
const caveTimer: string = require('./../../../assets/images/cave/cave-timer.png');
const chapter1: string = require('./../../../assets/images/cow/chapters/chapter1.png');
const chapter2: string = require('./../../../assets/images/cow/chapters/chapter2.png');
const chapter3: string = require('./../../../assets/images/cow/chapters/chapter3.png');
const chapter4: string = require('./../../../assets/images/cow/chapters/chapter4.png');
const chapter5: string = require('./../../../assets/images/cow/chapters/chapter5.png');
const chapter6: string = require('./../../../assets/images/cow/chapters/chapter6.png');
const chapter7: string = require('./../../../assets/images/cow/chapters/chapter7.png');
const chapter8: string = require('./../../../assets/images/cow/chapters/chapter8.png');
const chapter9: string = require('./../../../assets/images/cow/chapters/chapter9.png');
const chapter10: string = require('./../../../assets/images/cow/chapters/chapter10.png');
const chapter11: string = require('./../../../assets/images/cow/chapters/chapter11.png');
const chapter12: string = require('./../../../assets/images/cow/chapters/chapter12.png');
const chapter13: string = require('./../../../assets/images/cow/chapters/chapter13.png');
const chapter14: string = require('./../../../assets/images/cow/chapters/chapter14.png');
const chapter15: string = require('./../../../assets/images/cow/chapters/chapter15.png');
const chapter16: string = require('./../../../assets/images/cow/chapters/chapter16.png');
const forest1: string = require('./../../../assets/images/cow/territories/forest-1.png');
const forest2: string = require('./../../../assets/images/cow/territories/forest-2.png');
const forest3: string = require('./../../../assets/images/cow/territories/forest-3.png');
const forest4: string = require('./../../../assets/images/cow/territories/forest-4.png');
const forest5: string = require('./../../../assets/images/cow/territories/forest-5.png');
const forest6: string = require('./../../../assets/images/cow/territories/forest-6.png');
const forest7: string = require('./../../../assets/images/cow/territories/forest-7.png');
const forest8: string = require('./../../../assets/images/cow/territories/forest-8.png');
const star: string = require('./../../../assets/images/icons/star.png');
const completed: string = require('./../../../assets/images/icons/completed.png');
const littleButton: string = require('./../../../assets/images/modal/little-button.png');
const littleButtonDisable: string = require('./../../../assets/images/modal/little-button-disable.png');
const taskIcon1: string = require('./../../../assets/images/cow/tasks/task-icon-1.png');
const taskIcon2: string = require('./../../../assets/images/cow/tasks/task-icon-2.png');
const taskIcon3: string = require('./../../../assets/images/cow/tasks/task-icon-3.png');
const taskIcon4: string = require('./../../../assets/images/cow/tasks/task-icon-4.png');
const taskIcon5: string = require('./../../../assets/images/cow/tasks/task-icon-5.png');
const taskIcon6: string = require('./../../../assets/images/cow/tasks/task-icon-6.png');
const taskIcon7: string = require('./../../../assets/images/cow/tasks/task-icon-7.png');
const taskIcon8: string = require('./../../../assets/images/cow/tasks/task-icon-8.png');
const taskIcon9: string = require('./../../../assets/images/cow/tasks/task-icon-9.png');
const taskIcon10: string = require('./../../../assets/images/cow/tasks/task-icon-10.png');
const taskIcon11: string = require('./../../../assets/images/cow/tasks/task-icon-11.png');
const taskIcon12: string = require('./../../../assets/images/cow/tasks/task-icon-12.png');
const taskIcon13: string = require('./../../../assets/images/cow/tasks/task-icon-13.png');
const taskIcon14: string = require('./../../../assets/images/cow/tasks/task-icon-14.png');
const taskIcon15: string = require('./../../../assets/images/cow/tasks/task-icon-15.png');
const taskIcon16: string = require('./../../../assets/images/cow/tasks/task-icon-16.png');
const taskIcon17: string = require('./../../../assets/images/cow/tasks/task-icon-17.png');
const taskIcon18: string = require('./../../../assets/images/cow/tasks/task-icon-18.png');
const taskIcon20: string = require('./../../../assets/images/cow/tasks/task-icon-20.png');
const taskIcon21: string = require('./../../../assets/images/cow/tasks/task-icon-21.png');
const taskIcon22: string = require('./../../../assets/images/cow/tasks/task-icon-22.png');
const taskIcon23: string = require('./../../../assets/images/cow/tasks/task-icon-23.png');
const taskIcon24: string = require('./../../../assets/images/cow/tasks/task-icon-24.png');
const taskIcon25: string = require('./../../../assets/images/cow/tasks/task-icon-25.png');
const taskIcon26: string = require('./../../../assets/images/cow/tasks/task-icon-26.png');
const taskIcon27: string = require('./../../../assets/images/cow/tasks/task-icon-27.png');
const taskIcon28: string = require('./../../../assets/images/cow/tasks/task-icon-28.png');
const taskIcon29: string = require('./../../../assets/images/cow/tasks/task-icon-29.png');
const taskIcon31: string = require('./../../../assets/images/cow/tasks/task-icon-31.png');
const taskIcon32: string = require('./../../../assets/images/cow/tasks/task-icon-32.png');
const taskIcon33: string = require('./../../../assets/images/cow/tasks/task-icon-33.png');
const taskIcon34: string = require('./../../../assets/images/cow/tasks/task-icon-34.png');
const taskIcon35: string = require('./../../../assets/images/cow/tasks/task-icon-35.png');
const taskIcon36: string = require('./../../../assets/images/cow/tasks/task-icon-36.png');
const taskIcon37: string = require('./../../../assets/images/cow/tasks/task-icon-37.png');
const plus: string = require('./../../../assets/images/icons/plus.png');
const cowLeaves: string = require('./../../../assets/images/cow/cow-leaves.png');
const greenBalanceBg: string = require('./../../../assets/images/balance/green-balance-bg.png');
const redBalanceBg: string = require('./../../../assets/images/balance/red-balance-bg.png');
const resourceEnough: string = require('./../../../assets/images/balance/resource-enough.png');
const resourceProblem: string = require('./../../../assets/images/balance/resource-problem.png');
const grassBalance: string = require('./../../../assets/images/balance/grass-balance.png');
const waterBalance: string = require('./../../../assets/images/balance/water-balance.png');
const tail: string = require('./../../../assets/images/tail.png');
const verticalBorder: string = require('./../../../assets/images/cow/territories/vertical-border.png');
const horizontalBorder1: string = require('./../../../assets/images/cow/territories/horizontal-border-1.png');
const horizontalBorder2: string = require('./../../../assets/images/cow/territories/horizontal-border-2.png');
const horizontalBorder3: string = require('./../../../assets/images/cow/territories/horizontal-border-3.png');
const gift: string = require('./../../../assets/images/icons/gift.png');
const offline: string = require('./../../../assets/images/icons/offline.png');
const tutorBtn: string = require('./../../../assets/images/modal/tutor-btn.png');
const heart: string = require('./../../../assets/images/icons/heart.png');
const notEnoughtWater: string = require("./../../../assets/images/icons/not-enought-water.png");
const notEnoughtGrass: string = require("./../../../assets/images/icons/not-enought-grass.png");
const calendar: string = require('./../../../assets/images/calendar.png');
const adIcon: string = require('./../../../assets/images/icons/ad-icon.png');
const bgAd: string = require('./../../../assets/images/icons/bg-ad.png');
const bigButtonGreen: string = require('./../../../assets/images/modal/btn_lg.png');
const arrow: string = require('./../../../assets/images/arrow.png');
const stockIcon: string = require('./../../../assets/images/icons/stock.png');
const firework1: string = require('./../../../assets/images/animations/firework1.png');
const firework2: string = require('./../../../assets/images/animations/firework2.png');
const firework3: string = require('./../../../assets/images/animations/firework3.png');
const fireworkBg: string = require('./../../../assets/images/animations/fireworkBg.png');
const loadingSpinner: string = require('./../../../assets/images/animations/loading-spinner.png');
const farmer: string = require('./../../../assets/images/farmer.png');
const whitePixel: string = require('./../../../assets/images/white-pixel.jpg');
const scrollArrow: string = require('./../../../assets/images/scroll-arrow.png');
const factorySmoke: string = require('./../../../assets/images/cow/factory-smoke.png');
const factoryFlash: string = require('./../../../assets/images/cow/factory-flash.png');
const tutorialShowcase: string = require('./../../../assets/images/cow/tutorial-showcase.png');
const hatchet: string = require("./../../../assets/images/icons/hatchet.png");
const hammer: string = require("./../../../assets/images/icons/hammer.png");
const improveCollector: string = require("./../../../assets/images/modal/improve-collector.png");
const tasksUncomplete: string = require("./../../../assets/images/modal/tasks/uncomplete.png");
const squareTask: string = require("./../../../assets/images/modal/square-task.png");
const circle: string = require("./../../../assets/images/circle.png");
const notificationBg: string = require('../../../assets/images/icons/notificator.png');
const roundedBarSegment: string = require("./../../../assets/images/rounded-bar-segment.png");
const circleOutline: string = require("./../../../assets/images/circle-outline.png");
const cooldownPlate: string = require("./../../../assets/images/cooldown-plate.png");
const tasksBarNs: string = require("./../../../assets/images/modal/tasks/bar-ns.png");
const textSale: string = require("./../../../assets/images/modal/text-sale.png");
const saleIcon: string = require('../../../assets/images/sale-icon.png');

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

  }
  
  public preload(): void {
    this.loadingScreen('cow');
    this.load.image('bg', bg);
    this.load.image('cow-top', top);
    this.load.image('cow-bottom', bottom);
    this.load.image('topbar', topbar);
    this.load.image('tabbar', tabbar);
    this.load.image('cow-buy-icon-1', cowBuyIcon1);
    this.load.image('cow-buy-icon-2', cowBuyIcon2);
    this.load.image('cow-buy-icon-3', cowBuyIcon3);
    this.load.image('cow-buy-icon-4', cowBuyIcon4);
    this.load.image('cow-buy-icon-5', cowBuyIcon5);
    this.load.image('cow-buy-icon-6', cowBuyIcon6);
    this.load.image('cow-buy-icon-7', cowBuyIcon7);
    this.load.image('cow-buy-icon-8', cowBuyIcon8);
    this.load.image('cow-buy-icon-9', cowBuyIcon9);
    this.load.image('cow-buy-icon-10', cowBuyIcon10);
    this.load.image('cow-buy-icon-11', cowBuyIcon11);
    this.load.image('cow-buy-icon-12', cowBuyIcon12);
    this.load.image('milk-collector', milkCollector);
    this.load.image('shop', shop);
    this.load.image('map-icon', mapIcon);
    this.load.image('sandwich', sandwich);
    this.load.image('sandwich-close', sandwichClose);
    this.load.image('profile', profile);
    this.load.image('fortune-icon', fortune);
    this.load.image('chat', chat);
    this.load.image('cow-for-buying', forBuying);
    this.load.image('cow-bought', bought);
    this.load.image('cow-merging', merging);
    this.load.image('cow-tent', tent);
    this.load.image('cow-house', house);
    this.load.image('cow-ground', ground);
    this.load.image('cow-repository', repository);
    this.load.image('cow-factory', factory);
    this.load.image('cow-repository-1-1', repository11);
    this.load.image('cow-repository-2-1', repository21);
    this.load.image('cow-repository-3-1', repository31);
    this.load.image('cow-repository-4-1', repository41);
    this.load.image('cow-repository-1-2', repository12);
    this.load.image('cow-repository-2-2', repository22);
    this.load.image('cow-repository-3-2', repository32);
    this.load.image('cow-repository-4-2', repository42);
    this.load.image('cow-repository-1-3', repository13);
    this.load.image('cow-repository-2-3', repository23);
    this.load.image('cow-repository-3-3', repository33);
    this.load.image('cow-repository-4-3', repository43);
    this.load.image('cow-repository-1-4', repository14);
    this.load.image('cow-repository-2-4', repository24);
    this.load.image('cow-repository-3-4', repository34);
    this.load.image('cow-repository-4-4', repository44);
    this.load.image('cow-grass1-1', grass11);
    this.load.image('cow-grass1-2', grass12);
    this.load.image('cow-grass1-3', grass13);
    this.load.image('cow-grass1-4', grass14);
    this.load.image('cow-grass2-1', grass21);
    this.load.image('cow-grass2-2', grass22);
    this.load.image('cow-grass2-3', grass23);
    this.load.image('cow-grass2-4', grass24);
    this.load.image('cow-grass3-1', grass31);
    this.load.image('cow-grass3-2', grass32);
    this.load.image('cow-grass3-3', grass33);
    this.load.image('cow-grass3-4', grass34);
    this.load.image('cow-grass4-1', grass41);
    this.load.image('cow-grass4-2', grass42);
    this.load.image('cow-grass4-3', grass43);
    this.load.image('cow-grass4-4', grass44);
    this.load.image('cow-water1-1', water11);
    this.load.image('cow-water1-2', water12);
    this.load.image('cow-water1-3', water13);
    this.load.image('cow-water1-4', water14);
    this.load.image('cow-water2-1', water21);
    this.load.image('cow-water2-2', water22);
    this.load.image('cow-water2-3', water23);
    this.load.image('cow-water2-4', water24);
    this.load.image('cow-water3-1', water31);
    this.load.image('cow-water3-2', water32);
    this.load.image('cow-water3-3', water33);
    this.load.image('cow-water3-4', water34);
    this.load.image('cow-water4-1', water41);
    this.load.image('cow-water4-2', water42);
    this.load.image('cow-water4-3', water43);
    this.load.image('cow-water4-4', water44);
    this.load.image('lock-territory', lockTerritory);
    this.load.spritesheet('cow0', cow0, { frameWidth: 132.7, frameHeight: 137 });
    this.load.image('cow-horns-1', pixel);
    this.load.image('cow-horns-2', cowHorns1);
    this.load.image('cow-horns-3', cowHorns2);
    this.load.image('cow-horns-4', cowHorns3);
    this.load.spritesheet('cow1', cow1, { frameWidth: 147, frameHeight: 140 });
    this.load.spritesheet('cow2', cow2, { frameWidth: 146.7, frameHeight: 143 });
    this.load.spritesheet('cow3', cow3, { frameWidth: 147.7, frameHeight: 146 });
    this.load.spritesheet('cow4', cow4, { frameWidth: 144.7, frameHeight: 149 });
    this.load.spritesheet('cow5', cow5, { frameWidth: 148.9, frameHeight: 149 });
    this.load.spritesheet('cow6', cow6, { frameWidth: 153.7, frameHeight: 154 });
    this.load.spritesheet('cow7', cow7, { frameWidth: 144.7, frameHeight: 154 });
    this.load.spritesheet('cow8', cow8, { frameWidth: 144.7, frameHeight: 154 });
    this.load.spritesheet('cow9', cow9, { frameWidth: 134, frameHeight: 154 });
    this.load.spritesheet('cow10', cow10, { frameWidth: 133.7, frameHeight: 143 });
    this.load.spritesheet('cow11', cow11, { frameWidth: 152.7, frameHeight: 153 });
    this.load.spritesheet('cow12', cow12, { frameWidth: 143.8, frameHeight: 156 });
    this.load.image('milk-status', milkStatus);
    this.load.image('diamond-status', diamondStatus);
    this.load.image('cow-milk', milk);
    this.load.image('merging-animation', mergingAnimation);
    this.load.image('cowCoin', coin);
    this.load.image('diamond', diamond);
    this.load.image('lock', lock);
    this.load.image('disable-cow', disablecow);
    this.load.image('cow-house-sprite', houseSprite);
    this.load.image('cave-disable', caveDisalble);
    this.load.image('cave-ready', caveReady);
    this.load.image('cave-wait', caveWait);
    this.load.image('cave-timer', caveTimer);
    this.load.image('cow-chapter-1', chapter1);
    this.load.image('cow-chapter-2', chapter2);
    this.load.image('cow-chapter-3', chapter3);
    this.load.image('cow-chapter-4', chapter4);
    this.load.image('cow-chapter-5', chapter5);
    this.load.image('cow-chapter-6', chapter6);
    this.load.image('cow-chapter-7', chapter7);
    this.load.image('cow-chapter-8', chapter8);
    this.load.image('cow-chapter-9', chapter9);
    this.load.image('cow-chapter-10', chapter10);
    this.load.image('cow-chapter-11', chapter11);
    this.load.image('cow-chapter-12', chapter12);
    this.load.image('cow-chapter-13', chapter13);
    this.load.image('cow-chapter-14', chapter14);
    this.load.image('cow-chapter-15', chapter15);
    this.load.image('cow-chapter-16', chapter16);
    this.load.image('cow-forest-1', forest1);
    this.load.image('cow-forest-2', forest2);
    this.load.image('cow-forest-3', forest3);
    this.load.image('cow-forest-4', forest4);
    this.load.image('cow-forest-5', forest5);
    this.load.image('cow-forest-6', forest6);
    this.load.image('cow-forest-7', forest7);
    this.load.image('cow-forest-8', forest8);
    this.load.image('star', star);
    this.load.image('completed', completed);
    this.load.image('little-button', littleButton);
    this.load.image('little-button-disable', littleButtonDisable);
    this.load.image('cow-task-icon-1', taskIcon1);
    this.load.image('cow-task-icon-2', taskIcon2);
    this.load.image('cow-task-icon-3', taskIcon3);
    this.load.image('cow-task-icon-4', taskIcon4);
    this.load.image('cow-task-icon-5', taskIcon5);
    this.load.image('cow-task-icon-6', taskIcon6);
    this.load.image('cow-task-icon-7', taskIcon7);
    this.load.image('cow-task-icon-8', taskIcon8);
    this.load.image('cow-task-icon-9', taskIcon9);
    this.load.image('cow-task-icon-10', taskIcon10);
    this.load.image('cow-task-icon-11', taskIcon11);
    this.load.image('cow-task-icon-12', taskIcon12);
    this.load.image('cow-task-icon-13', taskIcon13);
    this.load.image('cow-task-icon-14', taskIcon14);
    this.load.image('cow-task-icon-15', taskIcon15);
    this.load.image('cow-task-icon-16', taskIcon16);
    this.load.image('cow-task-icon-17', taskIcon17);
    this.load.image('cow-task-icon-18', taskIcon18);
    this.load.image('cow-task-icon-20', taskIcon20);
    this.load.image('cow-task-icon-21', taskIcon21);
    this.load.image('cow-task-icon-22', taskIcon22);
    this.load.image('cow-task-icon-23', taskIcon23);
    this.load.image('cow-task-icon-24', taskIcon24);
    this.load.image('cow-task-icon-25', taskIcon25);
    this.load.image('cow-task-icon-26', taskIcon26);
    this.load.image('cow-task-icon-27', taskIcon27);
    this.load.image('cow-task-icon-28', taskIcon28);
    this.load.image('cow-task-icon-29', taskIcon29);
    this.load.image('cow-task-icon-29', taskIcon29);
    this.load.image('cow-task-icon-31', taskIcon31);
    this.load.image('cow-task-icon-32', taskIcon32);
    this.load.image('cow-task-icon-33', taskIcon33);
    this.load.image('cow-task-icon-34', taskIcon34);
    this.load.image('cow-task-icon-35', taskIcon35);
    this.load.image('cow-task-icon-36', taskIcon36);
    this.load.image('cow-task-icon-37', taskIcon37);
    this.load.image('plus', plus);
    this.load.image('cow-leaves', cowLeaves);
    this.load.image('green-balance-bg', greenBalanceBg);
    this.load.image('red-balance-bg', redBalanceBg);
    this.load.image('resource-enough', resourceEnough);
    this.load.image('resource-problem', resourceProblem);
    this.load.image('grass-balance', grassBalance);
    this.load.image('water-balance', waterBalance);
    this.load.image('tail', tail);
    this.load.image('pixel', pixel);
    this.load.image('cow-vertical-border', verticalBorder);
    this.load.image('cow-horizontal-border-1', horizontalBorder1);
    this.load.image('cow-horizontal-border-2', horizontalBorder2);
    this.load.image('cow-horizontal-border-3', horizontalBorder3);
    this.load.image('gift', gift);
    this.load.image('offline', offline);
    this.load.image('tutor-btn', tutorBtn);
    this.load.image('heart', heart);
    this.load.image('not-enought-water', notEnoughtWater);
    this.load.image('not-enought-grass', notEnoughtGrass);

    this.load.image('calendar', calendar);
    this.load.image('ad-icon', adIcon);
    this.load.image('bg-ad', bgAd);
    this.load.image('big-btn-green', bigButtonGreen);
    this.load.image('arrow', arrow);
    this.load.image('stock-icon', stockIcon);
    this.load.image('firework1', firework1);
    this.load.image('firework2', firework2);
    this.load.image('firework3', firework3);
    this.load.image('fireworkBg', fireworkBg);
    this.load.image('loading-spinner', loadingSpinner);
    this.load.image('farmer', farmer);
    this.load.image('white-pixel', whitePixel);
    this.load.image('scroll-arrow', scrollArrow);
    this.load.image('factory-smoke', factorySmoke);
    this.load.image('factory-flash', factoryFlash);
    this.load.image('tutorial-showcase', tutorialShowcase);
    this.load.image('hatchet', hatchet);
    this.load.image('hammer', hammer);
    this.load.image('improve-collector', improveCollector);
    this.load.image('tasks-uncomplete-rend', tasksUncomplete);
    this.load.image('square-task', squareTask);

    this.load.image('circle', circle);
    this.load.image('notification-bg', notificationBg);
    this.load.image('rounded-segment', roundedBarSegment);
    this.load.image('circle-outline', circleOutline);
    this.load.image('cooldown-plate', cooldownPlate);
    this.load.image('tasks-bar-ns', tasksBarNs);
    this.load.image('text-sale', textSale);
    this.load.image('icon-sale', saleIcon);

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

  private initAndroidStore(): void {
    const { packages } = general;
    const store: any = window['store'];
    if (!store) {
      console.log('Store not available');
      return;
    }

    for (const pack of packages) {
      store.register({
        id: String(pack.id),
        alias: 'package_' + pack.id,
        price: pack.price,
        type: store.CONSUMABLE
      });
    }

    for (const pack of packages) {
      store.when('package_' + pack.id)
        .approved((p) => {
          p.verify();
        })
        .verified((p) => {
          axios.post(process.env.API + '/callbackPayAndroid', {
            id: this.state.user.id,
            hash: this.state.user.hash,
            counter: this.state.user.counter,
            pack: p,
          }).then(res => {
            if (!res.data.error) {
              try {
                this.state.adjust.shopPurchaseEvent.setRevenue(pack.price, "RUB");
                window[`Adjust`].trackEvent(this.state.adjust.shopPurchaseEvent);
              } catch (err) { console.log('ADJUST', err) }

              this.game.scene.keys[this.state.farm].autosave();
            }
          });
          p.finish();
        });
    }

    store.error((error) => {
      console.log('ERROR ' + error.code + ': ' + error.message);
    });
    store.applicationUsername = () => this.state.user.id;
    store.refresh();
  }
}

export default CowPreload;
