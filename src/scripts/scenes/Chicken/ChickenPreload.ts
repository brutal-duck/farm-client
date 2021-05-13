import axios from 'axios';
import Socket from '../../Socket';
import loadChicken from '../../local/loadChicken';
import loadData from '../../general/loadData';
import { checkStorage, loadingScreen,  } from '../../general/basic';

const pixel: string = require("./../../../assets/images/pixel.png");
const bg: string = require("./../../../assets/images/scroll-bg.png");
const top: string = require("./../../../assets/images/chicken/top.png");
const bottom: string = require("./../../../assets/images/chicken/bottom.png");
const topbar: string = require("./../../../assets/images/topbar.png");
const tabbar: string = require("./../../../assets/images/tabbar.png");
const chickenBuyIcon1: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-1.png");
const chickenBuyIcon2: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-2.png");
const chickenBuyIcon3: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-3.png");
const chickenBuyIcon4: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-4.png");
const chickenBuyIcon5: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-5.png");
const chickenBuyIcon6: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-6.png");
const chickenBuyIcon7: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-7.png");
const chickenBuyIcon8: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-8.png");
const chickenBuyIcon9: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-9.png");
const chickenBuyIcon10: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-10.png");
const chickenBuyIcon11: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-11.png");
const chickenBuyIcon12: string = require("./../../../assets/images/chicken/icons/chicken-buy-icon-12.png");
const eggCollector: string = require("./../../../assets/images/chicken/egg-collector.png");
const shop: string = require("./../../../assets/images/icons/shop.png");
const mapIcon: string = require("./../../../assets/images/icons/map.png");
const sandwich: string = require("./../../../assets/images/icons/sandwich.png");
const sandwichClose: string = require("./../../../assets/images/icons/sandwich-close.png");
const profile: string = require("./../../../assets/images/icons/profile.png");
const fortune: string = require("./../../../assets/images/icons/fortune.png");
const chat: string = require("./../../../assets/images/icons/chat.png");
const forBuying: string = require("./../../../assets/images/chicken/territories/for-buying.png");
const bought: string = require("./../../../assets/images/chicken/territories/bought.png");
const merging: string = require("./../../../assets/images/chicken/territories/merging.png");
const tent: string = require("./../../../assets/images/chicken/territories/tent.png");
const house: string = require("./../../../assets/images/chicken/territories/house.png");
const ground: string = require("./../../../assets/images/chicken/territories/ground.png");
const repository: string = require("./../../../assets/images/chicken/territories/repository.png");
const repository11: string = require("./../../../assets/images/chicken/territories/repository-1-1.png");
const repository21: string = require("./../../../assets/images/chicken/territories/repository-2-1.png");
const repository31: string = require("./../../../assets/images/chicken/territories/repository-3-1.png");
const repository41: string = require("./../../../assets/images/chicken/territories/repository-4-1.png");
const repository12: string = require("./../../../assets/images/chicken/territories/repository-1-2.png");
const repository22: string = require("./../../../assets/images/chicken/territories/repository-2-2.png");
const repository32: string = require("./../../../assets/images/chicken/territories/repository-3-2.png");
const repository42: string = require("./../../../assets/images/chicken/territories/repository-4-2.png");
const repository13: string = require("./../../../assets/images/chicken/territories/repository-1-3.png");
const repository23: string = require("./../../../assets/images/chicken/territories/repository-2-3.png");
const repository33: string = require("./../../../assets/images/chicken/territories/repository-3-3.png");
const repository43: string = require("./../../../assets/images/chicken/territories/repository-4-3.png");
const repository14: string = require("./../../../assets/images/chicken/territories/repository-1-4.png");
const repository24: string = require("./../../../assets/images/chicken/territories/repository-2-4.png");
const repository34: string = require("./../../../assets/images/chicken/territories/repository-3-4.png");
const repository44: string = require("./../../../assets/images/chicken/territories/repository-4-4.png");
const grass11: string = require("./../../../assets/images/chicken/territories/grass1-1.png");
const grass12: string = require("./../../../assets/images/chicken/territories/grass1-2.png");
const grass13: string = require("./../../../assets/images/chicken/territories/grass1-3.png");
const grass14: string = require("./../../../assets/images/chicken/territories/grass1-4.png");
const grass15: string = require("./../../../assets/images/chicken/territories/grass1-5.png");
const grass21: string = require("./../../../assets/images/chicken/territories/grass2-1.png");
const grass22: string = require("./../../../assets/images/chicken/territories/grass2-2.png");
const grass23: string = require("./../../../assets/images/chicken/territories/grass2-3.png");
const grass24: string = require("./../../../assets/images/chicken/territories/grass2-4.png");
const grass25: string = require("./../../../assets/images/chicken/territories/grass2-5.png");
const grass31: string = require("./../../../assets/images/chicken/territories/grass3-1.png");
const grass32: string = require("./../../../assets/images/chicken/territories/grass3-2.png");
const grass33: string = require("./../../../assets/images/chicken/territories/grass3-3.png");
const grass34: string = require("./../../../assets/images/chicken/territories/grass3-4.png");
const grass35: string = require("./../../../assets/images/chicken/territories/grass3-5.png");
const grass41: string = require("./../../../assets/images/chicken/territories/grass4-1.png");
const grass42: string = require("./../../../assets/images/chicken/territories/grass4-2.png");
const grass43: string = require("./../../../assets/images/chicken/territories/grass4-3.png");
const grass44: string = require("./../../../assets/images/chicken/territories/grass4-4.png");
const grass45: string = require("./../../../assets/images/chicken/territories/grass4-5.png");
const water11: string = require("./../../../assets/images/chicken/territories/water1-1.png");
const water12: string = require("./../../../assets/images/chicken/territories/water1-2.png");
const water13: string = require("./../../../assets/images/chicken/territories/water1-3.png");
const water14: string = require("./../../../assets/images/chicken/territories/water1-4.png");
const water21: string = require("./../../../assets/images/chicken/territories/water2-1.png");
const water22: string = require("./../../../assets/images/chicken/territories/water2-2.png");
const water23: string = require("./../../../assets/images/chicken/territories/water2-3.png");
const water24: string = require("./../../../assets/images/chicken/territories/water2-4.png");
const water31: string = require("./../../../assets/images/chicken/territories/water3-1.png");
const water32: string = require("./../../../assets/images/chicken/territories/water3-2.png");
const water33: string = require("./../../../assets/images/chicken/territories/water3-3.png");
const water34: string = require("./../../../assets/images/chicken/territories/water3-4.png");
const water41: string = require("./../../../assets/images/chicken/territories/water4-1.png");
const water42: string = require("./../../../assets/images/chicken/territories/water4-2.png");
const water43: string = require("./../../../assets/images/chicken/territories/water4-3.png");
const water44: string = require("./../../../assets/images/chicken/territories/water4-4.png");
const lockTerritory: string = require("./../../../assets/images/lock-territory.png");
const chicken0: string = require("./../../../assets/images/chicken/chicken/chicken0.png");
const chicken1: string = require("./../../../assets/images/chicken/chicken/chicken1.png");
const chicken2: string = require("./../../../assets/images/chicken/chicken/chicken2.png");
const chicken3: string = require("./../../../assets/images/chicken/chicken/chicken3.png");
const chicken4: string = require("./../../../assets/images/chicken/chicken/chicken4.png");
const chicken5: string = require("./../../../assets/images/chicken/chicken/chicken5.png");
const chicken6: string = require("./../../../assets/images/chicken/chicken/chicken6.png");
const chicken7: string = require("./../../../assets/images/chicken/chicken/chicken7.png");
const chicken8: string = require("./../../../assets/images/chicken/chicken/chicken8.png");
const chicken9: string = require("./../../../assets/images/chicken/chicken/chicken9.png");
const chicken10: string = require("./../../../assets/images/chicken/chicken/chicken10.png");
const chicken11: string = require("./../../../assets/images/chicken/chicken/chicken11.png");
const chicken12: string = require("./../../../assets/images/chicken/chicken/chicken12.png");
const egg0: string = require("./../../../assets/images/chicken/eggs/egg0.png");
const egg1: string = require("./../../../assets/images/chicken/eggs/egg1.png");
const egg2: string = require("./../../../assets/images/chicken/eggs/egg2.png");
const egg3: string = require("./../../../assets/images/chicken/eggs/egg3.png");
const egg4: string = require("./../../../assets/images/chicken/eggs/egg4.png");
const egg5: string = require("./../../../assets/images/chicken/eggs/egg5.png");
const egg6: string = require("./../../../assets/images/chicken/eggs/egg6.png");
const egg7: string = require("./../../../assets/images/chicken/eggs/egg7.png");
const egg8: string = require("./../../../assets/images/chicken/eggs/egg8.png");
const egg9: string = require("./../../../assets/images/chicken/eggs/egg9.png");
const egg10: string = require("./../../../assets/images/chicken/eggs/egg10.png");
const egg11: string = require("./../../../assets/images/chicken/eggs/egg11.png");
const egg12: string = require("./../../../assets/images/chicken/eggs/egg12.png");
const mergingAnimation: string = require("./../../../assets/images/merging-animation.png");
const coin: string = require("./../../../assets/images/chicken/icons/money.png");
const diamond: string = require("./../../../assets/images/icons/diamonds.png");
const lock: string = require("./../../../assets/images/icons/lock.png");
const disableChicken: string = require("./../../../assets/images/chicken/chicken/disable-chicken.png");
const houseSprite: string = require("./../../../assets/images/chicken/houses/house-5.png");
const caveDisalble: string = require("./../../../assets/images/cave/cave-disable.png");
const caveReady: string = require("./../../../assets/images/cave/cave-ready.png");
const caveWait: string = require("./../../../assets/images/cave/cave-wait.png");
const caveTimer: string = require("./../../../assets/images/cave/cave-timer.png");
const chapter1: string = require("./../../../assets/images/chicken/chapters/chapter1.png");
const chapter2: string = require("./../../../assets/images/chicken/chapters/chapter2.png");
const chapter3: string = require("./../../../assets/images/chicken/chapters/chapter3.png");
const chapter4: string = require("./../../../assets/images/chicken/chapters/chapter4.png");
const chapter5: string = require("./../../../assets/images/chicken/chapters/chapter5.png");
const chapter6: string = require("./../../../assets/images/chicken/chapters/chapter6.png");
const chapter7: string = require("./../../../assets/images/chicken/chapters/chapter7.png");
const chapter8: string = require("./../../../assets/images/chicken/chapters/chapter8.png");
const chapter9: string = require("./../../../assets/images/chicken/chapters/chapter9.png");
const chapter10: string = require("./../../../assets/images/chicken/chapters/chapter10.png");
const chapter11: string = require("./../../../assets/images/chicken/chapters/chapter11.png");
const chapter12: string = require("./../../../assets/images/chicken/chapters/chapter12.png");
const chapter13: string = require("./../../../assets/images/chicken/chapters/chapter13.png");
const chapter14: string = require("./../../../assets/images/chicken/chapters/chapter14.png");
const chapter15: string = require("./../../../assets/images/chicken/chapters/chapter15.png");
const chapter16: string = require("./../../../assets/images/chicken/chapters/chapter16.png");
const forest1: string = require("./../../../assets/images/chicken/territories/forest-1.png");
const forest2: string = require("./../../../assets/images/chicken/territories/forest-2.png");
const forest3: string = require("./../../../assets/images/chicken/territories/forest-3.png");
const forest4: string = require("./../../../assets/images/chicken/territories/forest-4.png");
const forest5: string = require("./../../../assets/images/chicken/territories/forest-5.png");
const forest6: string = require("./../../../assets/images/chicken/territories/forest-6.png");
const forest7: string = require("./../../../assets/images/chicken/territories/forest-7.png");
const forest8: string = require("./../../../assets/images/chicken/territories/forest-8.png");
const star: string = require("./../../../assets/images/icons/star.png");
const completed: string = require("./../../../assets/images/icons/completed.png");
const littleButton: string = require("./../../../assets/images/modal/little-button.png");
const taskIcon1: string = require("./../../../assets/images/chicken/tasks/task-icon-1.png");
const taskIcon2: string = require("./../../../assets/images/chicken/tasks/task-icon-2.png");
const taskIcon3: string = require("./../../../assets/images/chicken/tasks/task-icon-3.png");
const taskIcon4: string = require("./../../../assets/images/chicken/tasks/task-icon-4.png");
const taskIcon5: string = require("./../../../assets/images/chicken/tasks/task-icon-5.png");
const taskIcon6: string = require("./../../../assets/images/chicken/tasks/task-icon-6.png");
const taskIcon7: string = require("./../../../assets/images/chicken/tasks/task-icon-7.png");
const taskIcon8: string = require("./../../../assets/images/chicken/tasks/task-icon-8.png");
const taskIcon9: string = require("./../../../assets/images/chicken/tasks/task-icon-9.png");
const taskIcon10: string = require("./../../../assets/images/chicken/tasks/task-icon-10.png");
const taskIcon11: string = require("./../../../assets/images/chicken/tasks/task-icon-11.png");
const taskIcon12: string = require("./../../../assets/images/chicken/tasks/task-icon-12.png");
const taskIcon13: string = require("./../../../assets/images/chicken/tasks/task-icon-13.png");
const taskIcon14: string = require("./../../../assets/images/chicken/tasks/task-icon-14.png");
const taskIcon15: string = require("./../../../assets/images/chicken/tasks/task-icon-15.png");
const taskIcon16: string = require("./../../../assets/images/chicken/tasks/task-icon-16.png");
const taskIcon17: string = require("./../../../assets/images/chicken/tasks/task-icon-17.png");
const taskIcon18: string = require("./../../../assets/images/chicken/tasks/task-icon-18.png");
const taskIcon20: string = require("./../../../assets/images/chicken/tasks/task-icon-20.png");
const taskIcon21: string = require("./../../../assets/images/chicken/tasks/task-icon-21.png");
const taskIcon22: string = require("./../../../assets/images/chicken/tasks/task-icon-22.png");
const taskIcon23: string = require("./../../../assets/images/chicken/tasks/task-icon-23.png");
const taskIcon24: string = require("./../../../assets/images/chicken/tasks/task-icon-24.png");
const taskIcon25: string = require("./../../../assets/images/chicken/tasks/task-icon-25.png");
const taskIcon26: string = require("./../../../assets/images/chicken/tasks/task-icon-26.png");
const taskIcon27: string = require("./../../../assets/images/chicken/tasks/task-icon-27.png");
const taskIcon28: string = require("./../../../assets/images/chicken/tasks/task-icon-28.png");
const taskIcon29: string = require("./../../../assets/images/chicken/tasks/task-icon-29.png");
const taskIcon32: string = require("./../../../assets/images/chicken/tasks/task-icon-32.png");
const taskIcon33: string = require("./../../../assets/images/chicken/tasks/task-icon-33.png");
const taskIcon34: string = require("./../../../assets/images/chicken/tasks/task-icon-34.png");
const plus: string = require("./../../../assets/images/icons/plus.png");
const chickenLeaves: string = require("./../../../assets/images/chicken/chicken-leaves.png");
const greenBalanceBg: string = require("./../../../assets/images/balance/green-balance-bg.png");
const redBalanceBg: string = require("./../../../assets/images/balance/red-balance-bg.png");
const resourceEnough: string = require("./../../../assets/images/balance/resource-enough.png");
const resourceProblem: string = require("./../../../assets/images/balance/resource-problem.png");
const grassBalance: string = require("./../../../assets/images/balance/grass-balance.png");
const waterBalance: string = require("./../../../assets/images/balance/water-balance.png");
const tail: string = require("./../../../assets/images/tail.png");
const verticalBorder: string = require("./../../../assets/images/chicken/territories/vertical-border.png");
const horizontalBorder1: string = require("./../../../assets/images/chicken/territories/horizontal-border-1.png");
const horizontalBorder2: string = require("./../../../assets/images/chicken/territories/horizontal-border-2.png");
const horizontalBorder3: string = require("./../../../assets/images/chicken/territories/horizontal-border-3.png");
const gift: string = require("./../../../assets/images/icons/gift.png");
const offline: string = require("./../../../assets/images/icons/offline.png");
const tutorBtn: string = require("./../../../assets/images/modal/tutor-btn.png");
const heart: string = require("./../../../assets/images/icons/heart.png");
const calendar: string = require("./../../../assets/images/calendar.png");
const adIcon: string = require("./../../../assets/images/icons/ad-icon.png");
const bgAd: string = require("./../../../assets/images/icons/bg-ad.png");
const bigButtonGreen: string = require("./../../../assets/images/modal/btn_lg.png");
const arrow: string = require("./../../../assets/images/arrow.png");
const starterpackIcon: string = require("./../../../assets/images/icons/starterpack.png");
const firework1: string = require("./../../../assets/images/animations/firework1.png");
const firework2: string = require("./../../../assets/images/animations/firework2.png");
const firework3: string = require("./../../../assets/images/animations/firework3.png");
const fireworkBg: string = require("./../../../assets/images/animations/fireworkBg.png");
const loadingSpinner: string = require('./../../../assets/images/animations/loading-spinner.png');
const farmer: string = require("./../../../assets/images/farmer.png");
const whitePixel: string = require("./../../../assets/images/white-pixel.jpg");
const scrollArrow: string = require("./../../../assets/images/scroll-arrow.png");

class ChickenPreload extends Phaser.Scene {

  public lang: string; // индекс языка
  public state: Istate;
  public userReady: boolean;
  public loadingReady: boolean;
  public socket: boolean;
  public loadTime: number;
  public startTime: number;

  public loadChicken = loadChicken.bind(this);
  public loadingScreen = loadingScreen.bind(this);
  public loadData = loadData.bind(this);

  constructor() {
    super('ChickenPreload');
  }

  
  public init(state: Istate): void {

    this.state  = state;
    this.userReady = false;
    this.loadingReady = false;
    this.loadUser();
    this.startTime = Math.round(new Date().getTime() / 1000);

    if (!this.state.socket) {
      this.socket = true;
      this.loadTime = Math.round(new Date().getTime() / 1000);
      this.state.socket = new Socket(this.state);
    }

  }
  
  public preload(): void {

    this.loadingScreen('Chicken');
    
    this.load.image('bg', bg);
    this.load.image('chicken-top', top);
    this.load.image('chicken-bottom', bottom);
    this.load.image('topbar', topbar);
    this.load.image('tabbar', tabbar);
    this.load.image('chicken-buy-icon-1', chickenBuyIcon1);
    this.load.image('chicken-buy-icon-2', chickenBuyIcon2);
    this.load.image('chicken-buy-icon-3', chickenBuyIcon3);
    this.load.image('chicken-buy-icon-4', chickenBuyIcon4);
    this.load.image('chicken-buy-icon-5', chickenBuyIcon5);
    this.load.image('chicken-buy-icon-6', chickenBuyIcon6);
    this.load.image('chicken-buy-icon-7', chickenBuyIcon7);
    this.load.image('chicken-buy-icon-8', chickenBuyIcon8);
    this.load.image('chicken-buy-icon-9', chickenBuyIcon9);
    this.load.image('chicken-buy-icon-10', chickenBuyIcon10);
    this.load.image('chicken-buy-icon-11', chickenBuyIcon11);
    this.load.image('chicken-buy-icon-12', chickenBuyIcon12);
    this.load.image('egg-collector', eggCollector);
    this.load.image('shop', shop);
    this.load.image('map-icon', mapIcon);
    this.load.image('sandwich', sandwich);
    this.load.image('sandwich-close', sandwichClose);
    this.load.image('profile', profile);
    this.load.image('fortune-icon', fortune);
    this.load.image('chat', chat);
    this.load.image('chicken-for-buying', forBuying);
    this.load.image('chicken-bought', bought);
    this.load.image('chicken-merging', merging);
    this.load.image('chicken-tent', tent);
    this.load.image('chicken-house', house);
    this.load.image('chicken-ground', ground);
    this.load.image('chicken-repository', repository);
    this.load.image('chicken-repository-1-1', repository11);
    this.load.image('chicken-repository-2-1', repository21);
    this.load.image('chicken-repository-3-1', repository31);
    this.load.image('chicken-repository-4-1', repository41);
    this.load.image('chicken-repository-1-2', repository12);
    this.load.image('chicken-repository-2-2', repository22);
    this.load.image('chicken-repository-3-2', repository32);
    this.load.image('chicken-repository-4-2', repository42);
    this.load.image('chicken-repository-1-3', repository13);
    this.load.image('chicken-repository-2-3', repository23);
    this.load.image('chicken-repository-3-3', repository33);
    this.load.image('chicken-repository-4-3', repository43);
    this.load.image('chicken-repository-1-4', repository14);
    this.load.image('chicken-repository-2-4', repository24);
    this.load.image('chicken-repository-3-4', repository34);
    this.load.image('chicken-repository-4-4', repository44);
    this.load.image('chicken-grass1-1', grass11);
    this.load.image('chicken-grass1-2', grass12);
    this.load.image('chicken-grass1-3', grass13);
    this.load.image('chicken-grass1-4', grass14);
    this.load.image('chicken-grass1-5', grass15);
    this.load.image('chicken-grass2-1', grass21);
    this.load.image('chicken-grass2-2', grass22);
    this.load.image('chicken-grass2-3', grass23);
    this.load.image('chicken-grass2-4', grass24);
    this.load.image('chicken-grass2-5', grass25);
    this.load.image('chicken-grass3-1', grass31);
    this.load.image('chicken-grass3-2', grass32);
    this.load.image('chicken-grass3-3', grass33);
    this.load.image('chicken-grass3-4', grass34);
    this.load.image('chicken-grass3-5', grass35);
    this.load.image('chicken-grass4-1', grass41);
    this.load.image('chicken-grass4-2', grass42);
    this.load.image('chicken-grass4-3', grass43);
    this.load.image('chicken-grass4-4', grass44);
    this.load.image('chicken-grass4-5', grass45);
    this.load.image('chicken-water1-1', water11);
    this.load.image('chicken-water1-2', water12);
    this.load.image('chicken-water1-3', water13);
    this.load.image('chicken-water1-4', water14);
    this.load.image('chicken-water2-1', water21);
    this.load.image('chicken-water2-2', water22);
    this.load.image('chicken-water2-3', water23);
    this.load.image('chicken-water2-4', water24);
    this.load.image('chicken-water3-1', water31);
    this.load.image('chicken-water3-2', water32);
    this.load.image('chicken-water3-3', water33);
    this.load.image('chicken-water3-4', water34);
    this.load.image('chicken-water4-1', water41);
    this.load.image('chicken-water4-2', water42);
    this.load.image('chicken-water4-3', water43);
    this.load.image('chicken-water4-4', water44);
    this.load.image('lock-territory', lockTerritory);
    this.load.spritesheet('chicken0', chicken0, { frameWidth: 109, frameHeight: 138 });
    this.load.spritesheet('chicken1', chicken1, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('chicken2', chicken2, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('chicken3', chicken3, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('chicken4', chicken4, { frameWidth: 115, frameHeight: 137 });
    this.load.spritesheet('chicken5', chicken5, { frameWidth: 115, frameHeight: 150 });
    this.load.spritesheet('chicken6', chicken6, { frameWidth: 115, frameHeight: 150 });
    this.load.spritesheet('chicken7', chicken7, { frameWidth: 115, frameHeight: 142 });
    this.load.spritesheet('chicken8', chicken8, { frameWidth: 115, frameHeight: 150 });
    this.load.spritesheet('chicken9', chicken9, { frameWidth: 115, frameHeight: 143 });
    this.load.spritesheet('chicken10', chicken10, { frameWidth: 115, frameHeight: 145 });
    this.load.spritesheet('chicken11', chicken11, { frameWidth: 115, frameHeight: 133 });
    this.load.spritesheet('chicken12', chicken12, { frameWidth: 115, frameHeight: 150 });
    this.load.image('chicken-egg0', egg0);
    this.load.image('chicken-egg1', egg1);
    this.load.image('chicken-egg2', egg2);
    this.load.image('chicken-egg3', egg3);
    this.load.image('chicken-egg4', egg4);
    this.load.image('chicken-egg5', egg5);
    this.load.image('chicken-egg6', egg6);
    this.load.image('chicken-egg7', egg7);
    this.load.image('chicken-egg8', egg8);
    this.load.image('chicken-egg9', egg9);
    this.load.image('chicken-egg10', egg10);
    this.load.image('chicken-egg11', egg11);
    this.load.image('chicken-egg12', egg12);
    this.load.image('merging-animation', mergingAnimation);
    this.load.image('chickenCoin', coin);
    this.load.image('diamond', diamond);
    this.load.image('lock', lock);
    this.load.image('disable-chicken', disableChicken);
    this.load.image('chicken-house-sprite', houseSprite);
    this.load.image('cave-disable', caveDisalble);
    this.load.image('cave-ready', caveReady);
    this.load.image('cave-wait', caveWait);
    this.load.image('cave-timer', caveTimer);
    this.load.image('chicken-chapter-1', chapter1);
    this.load.image('chicken-chapter-2', chapter2);
    this.load.image('chicken-chapter-3', chapter3);
    this.load.image('chicken-chapter-4', chapter4);
    this.load.image('chicken-chapter-5', chapter5);
    this.load.image('chicken-chapter-6', chapter6);
    this.load.image('chicken-chapter-7', chapter7);
    this.load.image('chicken-chapter-8', chapter8);
    this.load.image('chicken-chapter-9', chapter9);
    this.load.image('chicken-chapter-10', chapter10);
    this.load.image('chicken-chapter-11', chapter11);
    this.load.image('chicken-chapter-12', chapter12);
    this.load.image('chicken-chapter-13', chapter13);
    this.load.image('chicken-chapter-14', chapter14);
    this.load.image('chicken-chapter-15', chapter15);
    this.load.image('chicken-chapter-16', chapter16);
    this.load.image('chicken-forest-1', forest1);
    this.load.image('chicken-forest-2', forest2);
    this.load.image('chicken-forest-3', forest3);
    this.load.image('chicken-forest-4', forest4);
    this.load.image('chicken-forest-5', forest5);
    this.load.image('chicken-forest-6', forest6);
    this.load.image('chicken-forest-7', forest7);
    this.load.image('chicken-forest-8', forest8);
    this.load.image('star', star);
    this.load.image('completed', completed);
    this.load.image('little-button', littleButton);
    this.load.image('chicken-task-icon-1', taskIcon1);
    this.load.image('chicken-task-icon-2', taskIcon2);
    this.load.image('chicken-task-icon-3', taskIcon3);
    this.load.image('chicken-task-icon-4', taskIcon4);
    this.load.image('chicken-task-icon-5', taskIcon5);
    this.load.image('chicken-task-icon-6', taskIcon6);
    this.load.image('chicken-task-icon-7', taskIcon7);
    this.load.image('chicken-task-icon-8', taskIcon8);
    this.load.image('chicken-task-icon-9', taskIcon9);
    this.load.image('chicken-task-icon-10', taskIcon10);
    this.load.image('chicken-task-icon-11', taskIcon11);
    this.load.image('chicken-task-icon-12', taskIcon12);
    this.load.image('chicken-task-icon-13', taskIcon13);
    this.load.image('chicken-task-icon-14', taskIcon14);
    this.load.image('chicken-task-icon-15', taskIcon15);
    this.load.image('chicken-task-icon-16', taskIcon16);
    this.load.image('chicken-task-icon-17', taskIcon17);
    this.load.image('chicken-task-icon-18', taskIcon18);
    this.load.image('chicken-task-icon-20', taskIcon20);
    this.load.image('chicken-task-icon-21', taskIcon21);
    this.load.image('chicken-task-icon-22', taskIcon22);
    this.load.image('chicken-task-icon-23', taskIcon23);
    this.load.image('chicken-task-icon-24', taskIcon24);
    this.load.image('chicken-task-icon-25', taskIcon25);
    this.load.image('chicken-task-icon-26', taskIcon26);
    this.load.image('chicken-task-icon-27', taskIcon27);
    this.load.image('chicken-task-icon-28', taskIcon28);
    this.load.image('chicken-task-icon-29', taskIcon29);
    this.load.image('chicken-task-icon-29', taskIcon29);
    this.load.image('chicken-task-icon-32', taskIcon32);
    this.load.image('chicken-task-icon-33', taskIcon33);
    this.load.image('chicken-task-icon-34', taskIcon34);
    this.load.image('plus', plus);
    this.load.image('chicken-leaves', chickenLeaves);
    this.load.image('green-balance-bg', greenBalanceBg);
    this.load.image('red-balance-bg', redBalanceBg);
    this.load.image('resource-enough', resourceEnough);
    this.load.image('resource-problem', resourceProblem);
    this.load.image('grass-balance', grassBalance);
    this.load.image('water-balance', waterBalance);
    this.load.image('tail', tail);
    this.load.image('pixel', pixel);
    this.load.image('chicken-vertical-border', verticalBorder);
    this.load.image('chicken-horizontal-border-1', horizontalBorder1);
    this.load.image('chicken-horizontal-border-2', horizontalBorder2);
    this.load.image('chicken-horizontal-border-3', horizontalBorder3);
    this.load.image('gift', gift);
    this.load.image('offline', offline);
    this.load.image('tutor-btn', tutorBtn);
    this.load.image('heart', heart);
    this.load.image('calendar', calendar);
    this.load.image('ad-icon', adIcon);
    this.load.image('bg-ad', bgAd);
    this.load.image('big-btn-green', bigButtonGreen);
    this.load.image('arrow', arrow);
    this.load.image('starterpack-icon', starterpackIcon);
    this.load.image('firework1', firework1);
    this.load.image('firework2', firework2);
    this.load.image('firework3', firework3);
    this.load.image('fireworkBg', fireworkBg);
    this.load.image('loading-spinner', loadingSpinner);
    this.load.image('farmer', farmer);
    this.load.image('white-pixel', whitePixel);
    this.load.image('scroll-arrow', scrollArrow);

    
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
      this.scene.start('Chicken', this.state); // сцена с курицами
      this.scene.start('ChickenBars', this.state); // сцена с барами
      this.scene.start('Preload', this.state); // сцена с подзагрузкой

    }

  }

  
  public loadUser(): void {

    axios.post(process.env.API + '/loadData', {
      hash: this.state.user.hash
    }).then((response) => {

      // checkStorage(response.data.user.hash);

      // let localSaveCounter: number = 0;

      // if (localStorage.userChicken) {
      //   let user: IuserChicken = JSON.parse(localStorage.userChicken);
      //   if (typeof user.autosaveCounter === 'number') localSaveCounter = user.autosaveCounter;
      // }

      // if (response.data.user.chickenSaveCounter >= localSaveCounter) {
        this.state.farm = 'Chicken';
        this.loadData(response);
        this.state.offlineTime = response.data.progress.chickenOfflineTime;
        this.userReady = true;
        this.state.nativeCounter = [0, 0, 0, 0];
        const Amplitude = this.state.amplitude;
        const identify = new Amplitude.Identify().set('CatcherSheep', this.state.userChicken.collectorLevel);
        Amplitude.getInstance().identify(identify);
      // } else {
      //   this.loadChicken(response.data.user.counter);
      // }
      
    })
    // .catch(() => {
    //   this.loadChicken();
    // });

    localStorage.farm = 'Chicken';
  }

}

export default ChickenPreload;
