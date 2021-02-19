import axios from 'axios';
import tasks from '../../tasks';
import Socket from '../../Socket';
import loadChicken from '../../local/loadChicken';
import { loadingScreen } from '../../general/basic';
import { checkStorage } from '../../general/basic';

let pixel: any = require("./../../../assets/images/pixel.png");
let bg: any = require("./../../../assets/images/scroll-bg.png");
let top: any = require("./../../../assets/images/chicken/top.png");
let bottom: any = require("./../../../assets/images/chicken/bottom.png");
let topbar: any = require("./../../../assets/images/topbar.png");
let tabbar: any = require("./../../../assets/images/tabbar.png");
let chickenBuyIcon1: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-1.png");
let chickenBuyIcon2: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-2.png");
let chickenBuyIcon3: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-3.png");
let chickenBuyIcon4: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-4.png");
let chickenBuyIcon5: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-5.png");
let chickenBuyIcon6: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-6.png");
let chickenBuyIcon7: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-7.png");
let chickenBuyIcon8: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-8.png");
let chickenBuyIcon9: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-9.png");
let chickenBuyIcon10: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-10.png");
let chickenBuyIcon11: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-11.png");
let chickenBuyIcon12: any = require("./../../../assets/images/chicken/icons/chicken-buy-icon-12.png");
let eggCollector: any = require("./../../../assets/images/chicken/egg-collector.png");
let shop: any = require("./../../../assets/images/icons/shop.png");
let mapIcon: any = require("./../../../assets/images/icons/map.png");
let sandwich: any = require("./../../../assets/images/icons/sandwich.png");
let sandwichClose: any = require("./../../../assets/images/icons/sandwich-close.png");
let profile: any = require("./../../../assets/images/icons/profile.png");
let chat: any = require("./../../../assets/images/icons/chat.png");
let forBuying: any = require("./../../../assets/images/chicken/territories/for-buying.png");
let bought: any = require("./../../../assets/images/chicken/territories/bought.png");
let merging: any = require("./../../../assets/images/chicken/territories/merging.png");
let tent: any = require("./../../../assets/images/chicken/territories/tent.png");
let house: any = require("./../../../assets/images/chicken/territories/house.png");
let ground: any = require("./../../../assets/images/chicken/territories/ground.png");
let repository: any = require("./../../../assets/images/chicken/territories/repository.png");
let repository11: any = require("./../../../assets/images/chicken/territories/repository-1-1.png");
let repository21: any = require("./../../../assets/images/chicken/territories/repository-2-1.png");
let repository31: any = require("./../../../assets/images/chicken/territories/repository-3-1.png");
let repository41: any = require("./../../../assets/images/chicken/territories/repository-4-1.png");
let repository12: any = require("./../../../assets/images/chicken/territories/repository-1-2.png");
let repository22: any = require("./../../../assets/images/chicken/territories/repository-2-2.png");
let repository32: any = require("./../../../assets/images/chicken/territories/repository-3-2.png");
let repository42: any = require("./../../../assets/images/chicken/territories/repository-4-2.png");
let repository13: any = require("./../../../assets/images/chicken/territories/repository-1-3.png");
let repository23: any = require("./../../../assets/images/chicken/territories/repository-2-3.png");
let repository33: any = require("./../../../assets/images/chicken/territories/repository-3-3.png");
let repository43: any = require("./../../../assets/images/chicken/territories/repository-4-3.png");
let repository14: any = require("./../../../assets/images/chicken/territories/repository-1-4.png");
let repository24: any = require("./../../../assets/images/chicken/territories/repository-2-4.png");
let repository34: any = require("./../../../assets/images/chicken/territories/repository-3-4.png");
let repository44: any = require("./../../../assets/images/chicken/territories/repository-4-4.png");
let grass11: any = require("./../../../assets/images/chicken/territories/grass1-1.png");
let grass12: any = require("./../../../assets/images/chicken/territories/grass1-2.png");
let grass13: any = require("./../../../assets/images/chicken/territories/grass1-3.png");
let grass14: any = require("./../../../assets/images/chicken/territories/grass1-4.png");
let grass15: any = require("./../../../assets/images/chicken/territories/grass1-5.png");
let grass21: any = require("./../../../assets/images/chicken/territories/grass2-1.png");
let grass22: any = require("./../../../assets/images/chicken/territories/grass2-2.png");
let grass23: any = require("./../../../assets/images/chicken/territories/grass2-3.png");
let grass24: any = require("./../../../assets/images/chicken/territories/grass2-4.png");
let grass25: any = require("./../../../assets/images/chicken/territories/grass2-5.png");
let grass31: any = require("./../../../assets/images/chicken/territories/grass3-1.png");
let grass32: any = require("./../../../assets/images/chicken/territories/grass3-2.png");
let grass33: any = require("./../../../assets/images/chicken/territories/grass3-3.png");
let grass34: any = require("./../../../assets/images/chicken/territories/grass3-4.png");
let grass35: any = require("./../../../assets/images/chicken/territories/grass3-5.png");
let grass41: any = require("./../../../assets/images/chicken/territories/grass4-1.png");
let grass42: any = require("./../../../assets/images/chicken/territories/grass4-2.png");
let grass43: any = require("./../../../assets/images/chicken/territories/grass4-3.png");
let grass44: any = require("./../../../assets/images/chicken/territories/grass4-4.png");
let grass45: any = require("./../../../assets/images/chicken/territories/grass4-5.png");
let water11: any = require("./../../../assets/images/chicken/territories/water1-1.png");
let water12: any = require("./../../../assets/images/chicken/territories/water1-2.png");
let water13: any = require("./../../../assets/images/chicken/territories/water1-3.png");
let water14: any = require("./../../../assets/images/chicken/territories/water1-4.png");
let water21: any = require("./../../../assets/images/chicken/territories/water2-1.png");
let water22: any = require("./../../../assets/images/chicken/territories/water2-2.png");
let water23: any = require("./../../../assets/images/chicken/territories/water2-3.png");
let water24: any = require("./../../../assets/images/chicken/territories/water2-4.png");
let water31: any = require("./../../../assets/images/chicken/territories/water3-1.png");
let water32: any = require("./../../../assets/images/chicken/territories/water3-2.png");
let water33: any = require("./../../../assets/images/chicken/territories/water3-3.png");
let water34: any = require("./../../../assets/images/chicken/territories/water3-4.png");
let water41: any = require("./../../../assets/images/chicken/territories/water4-1.png");
let water42: any = require("./../../../assets/images/chicken/territories/water4-2.png");
let water43: any = require("./../../../assets/images/chicken/territories/water4-3.png");
let water44: any = require("./../../../assets/images/chicken/territories/water4-4.png");
let lockTerritory: any = require("./../../../assets/images/lock-territory.png");
let chicken0: any = require("./../../../assets/images/chicken/chicken/chicken0.png");
let chicken1: any = require("./../../../assets/images/chicken/chicken/chicken1.png");
let chicken2: any = require("./../../../assets/images/chicken/chicken/chicken2.png");
let chicken3: any = require("./../../../assets/images/chicken/chicken/chicken3.png");
let chicken4: any = require("./../../../assets/images/chicken/chicken/chicken4.png");
let chicken5: any = require("./../../../assets/images/chicken/chicken/chicken5.png");
let chicken6: any = require("./../../../assets/images/chicken/chicken/chicken6.png");
let chicken7: any = require("./../../../assets/images/chicken/chicken/chicken7.png");
let chicken8: any = require("./../../../assets/images/chicken/chicken/chicken8.png");
let chicken9: any = require("./../../../assets/images/chicken/chicken/chicken9.png");
let chicken10: any = require("./../../../assets/images/chicken/chicken/chicken10.png");
let chicken11: any = require("./../../../assets/images/chicken/chicken/chicken11.png");
let chicken12: any = require("./../../../assets/images/chicken/chicken/chicken12.png");
let egg0: any = require("./../../../assets/images/chicken/eggs/egg0.png");
let egg1: any = require("./../../../assets/images/chicken/eggs/egg1.png");
let egg2: any = require("./../../../assets/images/chicken/eggs/egg2.png");
let egg3: any = require("./../../../assets/images/chicken/eggs/egg3.png");
let egg4: any = require("./../../../assets/images/chicken/eggs/egg4.png");
let egg5: any = require("./../../../assets/images/chicken/eggs/egg5.png");
let egg6: any = require("./../../../assets/images/chicken/eggs/egg6.png");
let egg7: any = require("./../../../assets/images/chicken/eggs/egg7.png");
let egg8: any = require("./../../../assets/images/chicken/eggs/egg8.png");
let egg9: any = require("./../../../assets/images/chicken/eggs/egg9.png");
let egg10: any = require("./../../../assets/images/chicken/eggs/egg10.png");
let egg11: any = require("./../../../assets/images/chicken/eggs/egg11.png");
let egg12: any = require("./../../../assets/images/chicken/eggs/egg12.png");
let mergingAnimation: any = require("./../../../assets/images/merging-animation.png");
let coin: any = require("./../../../assets/images/chicken/icons/money.png");
let diamond: any = require("./../../../assets/images/icons/diamonds.png");
let lock: any = require("./../../../assets/images/icons/lock.png");
let disableChicken: any = require("./../../../assets/images/chicken/chicken/disable-chicken.png");
let house1: any = require("./../../../assets/images/chicken/houses/house-1.png");
let house2: any = require("./../../../assets/images/chicken/houses/house-2.png");
let house3: any = require("./../../../assets/images/chicken/houses/house-3.png");
let house4: any = require("./../../../assets/images/chicken/houses/house-4.png");
let house5: any = require("./../../../assets/images/chicken/houses/house-5.png");
let house6: any = require("./../../../assets/images/chicken/houses/house-6.png");
let house7: any = require("./../../../assets/images/chicken/houses/house-7.png");
let house8: any = require("./../../../assets/images/chicken/houses/house-8.png");
let house9: any = require("./../../../assets/images/chicken/houses/house-9.png");
let house10: any = require("./../../../assets/images/chicken/houses/house-10.png");
let house11: any = require("./../../../assets/images/chicken/houses/house-11.png");
let house12: any = require("./../../../assets/images/chicken/houses/house-12.png");
let house13: any = require("./../../../assets/images/chicken/houses/house-13.png");
let house14: any = require("./../../../assets/images/chicken/houses/house-14.png");
let house15: any = require("./../../../assets/images/chicken/houses/house-15.png");
let house16: any = require("./../../../assets/images/chicken/houses/house-16.png");
let caveDisalble: any = require("./../../../assets/images/cave/cave-disable.png");
let caveReady: any = require("./../../../assets/images/cave/cave-ready.png");
let caveWait: any = require("./../../../assets/images/cave/cave-wait.png");
let caveTimer: any = require("./../../../assets/images/cave/cave-timer.png");
let chapter1: any = require("./../../../assets/images/chicken/chapters/chapter1.png");
let chapter2: any = require("./../../../assets/images/chicken/chapters/chapter2.png");
let chapter3: any = require("./../../../assets/images/chicken/chapters/chapter3.png");
let chapter4: any = require("./../../../assets/images/chicken/chapters/chapter4.png");
let chapter5: any = require("./../../../assets/images/chicken/chapters/chapter5.png");
let chapter6: any = require("./../../../assets/images/chicken/chapters/chapter6.png");
let chapter7: any = require("./../../../assets/images/chicken/chapters/chapter7.png");
let chapter8: any = require("./../../../assets/images/chicken/chapters/chapter8.png");
let chapter9: any = require("./../../../assets/images/chicken/chapters/chapter9.png");
let chapter10: any = require("./../../../assets/images/chicken/chapters/chapter10.png");
let chapter11: any = require("./../../../assets/images/chicken/chapters/chapter11.png");
let chapter12: any = require("./../../../assets/images/chicken/chapters/chapter12.png");
let chapter13: any = require("./../../../assets/images/chicken/chapters/chapter13.png");
let chapter14: any = require("./../../../assets/images/chicken/chapters/chapter14.png");
let chapter15: any = require("./../../../assets/images/chicken/chapters/chapter15.png");
let chapter16: any = require("./../../../assets/images/chicken/chapters/chapter16.png");
let forest1: any = require("./../../../assets/images/chicken/territories/forest-1.png");
let forest2: any = require("./../../../assets/images/chicken/territories/forest-2.png");
let forest3: any = require("./../../../assets/images/chicken/territories/forest-3.png");
let forest4: any = require("./../../../assets/images/chicken/territories/forest-4.png");
let forest5: any = require("./../../../assets/images/chicken/territories/forest-5.png");
let forest6: any = require("./../../../assets/images/chicken/territories/forest-6.png");
let forest7: any = require("./../../../assets/images/chicken/territories/forest-7.png");
let forest8: any = require("./../../../assets/images/chicken/territories/forest-8.png");
let star: any = require("./../../../assets/images/icons/star.png");
let completed: any = require("./../../../assets/images/icons/completed.png");
let littleButton: any = require("./../../../assets/images/modal/little-button.png");
let taskIcon1: any = require("./../../../assets/images/chicken/tasks/task-icon-1.png");
let taskIcon2: any = require("./../../../assets/images/chicken/tasks/task-icon-2.png");
let taskIcon3: any = require("./../../../assets/images/chicken/tasks/task-icon-3.png");
let taskIcon4: any = require("./../../../assets/images/chicken/tasks/task-icon-4.png");
let taskIcon5: any = require("./../../../assets/images/chicken/tasks/task-icon-5.png");
let taskIcon6: any = require("./../../../assets/images/chicken/tasks/task-icon-6.png");
let taskIcon7: any = require("./../../../assets/images/chicken/tasks/task-icon-7.png");
let taskIcon8: any = require("./../../../assets/images/chicken/tasks/task-icon-8.png");
let taskIcon9: any = require("./../../../assets/images/chicken/tasks/task-icon-9.png");
let taskIcon10: any = require("./../../../assets/images/chicken/tasks/task-icon-10.png");
let taskIcon11: any = require("./../../../assets/images/chicken/tasks/task-icon-11.png");
let taskIcon12: any = require("./../../../assets/images/chicken/tasks/task-icon-12.png");
let taskIcon13: any = require("./../../../assets/images/chicken/tasks/task-icon-13.png");
let taskIcon14: any = require("./../../../assets/images/chicken/tasks/task-icon-14.png");
let taskIcon15: any = require("./../../../assets/images/chicken/tasks/task-icon-15.png");
let taskIcon16: any = require("./../../../assets/images/chicken/tasks/task-icon-16.png");
let taskIcon17: any = require("./../../../assets/images/chicken/tasks/task-icon-17.png");
let taskIcon18: any = require("./../../../assets/images/chicken/tasks/task-icon-18.png");
let taskIcon20: any = require("./../../../assets/images/chicken/tasks/task-icon-20.png");
let taskIcon21: any = require("./../../../assets/images/chicken/tasks/task-icon-21.png");
let taskIcon22: any = require("./../../../assets/images/chicken/tasks/task-icon-22.png");
let taskIcon23: any = require("./../../../assets/images/chicken/tasks/task-icon-23.png");
let taskIcon24: any = require("./../../../assets/images/chicken/tasks/task-icon-24.png");
let taskIcon25: any = require("./../../../assets/images/chicken/tasks/task-icon-25.png");
let taskIcon26: any = require("./../../../assets/images/chicken/tasks/task-icon-26.png");
let taskIcon27: any = require("./../../../assets/images/chicken/tasks/task-icon-27.png");
let taskIcon28: any = require("./../../../assets/images/chicken/tasks/task-icon-28.png");
let taskIcon29: any = require("./../../../assets/images/chicken/tasks/task-icon-29.png");
let plus: any = require("./../../../assets/images/icons/plus.png");
let chickenLeaves: any = require("./../../../assets/images/chicken/chicken-leaves.png");
let greenBalanceBg: any = require("./../../../assets/images/balance/green-balance-bg.png");
let redBalanceBg: any = require("./../../../assets/images/balance/red-balance-bg.png");
let resourceEnough: any = require("./../../../assets/images/balance/resource-enough.png");
let resourceProblem: any = require("./../../../assets/images/balance/resource-problem.png");
let grassBalance: any = require("./../../../assets/images/balance/grass-balance.png");
let waterBalance: any = require("./../../../assets/images/balance/water-balance.png");
let tail: any = require("./../../../assets/images/tail.png");
let verticalBorder: any = require("./../../../assets/images/chicken/territories/vertical-border.png");
let horizontalBorder1: any = require("./../../../assets/images/chicken/territories/horizontal-border-1.png");
let horizontalBorder2: any = require("./../../../assets/images/chicken/territories/horizontal-border-2.png");
let horizontalBorder3: any = require("./../../../assets/images/chicken/territories/horizontal-border-3.png");
let gift: any = require("./../../../assets/images/icons/gift.png");
let firework250: any = require("./../../../assets/images/animations/firework250.png");
let offline: any = require("./../../../assets/images/icons/offline.png");
let tutorBtn: any = require("./../../../assets/images/modal/tutor-btn.png");
let heart: any = require("./../../../assets/images/icons/heart.png");
let calendar: any = require("./../../../assets/images/calendar.png");
let adIcon: any = require("./../../../assets/images/icons/ad-icon.png");
let bgAd: any = require("./../../../assets/images/icons/bg-ad.png");
let bigButtonGreen: any = require("./../../../assets/images/modal/btn_lg.png");

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
    this.load.image('chicken-house-1', house1);
    this.load.image('chicken-house-2', house2);
    this.load.image('chicken-house-3', house3);
    this.load.image('chicken-house-4', house4);
    this.load.image('chicken-house-5', house5);
    this.load.image('chicken-house-6', house6);
    this.load.image('chicken-house-7', house7);
    this.load.image('chicken-house-8', house8);
    this.load.image('chicken-house-9', house9);
    this.load.image('chicken-house-10', house10);
    this.load.image('chicken-house-11', house11);
    this.load.image('chicken-house-12', house12);
    this.load.image('chicken-house-13', house13);
    this.load.image('chicken-house-14', house14);
    this.load.image('chicken-house-15', house15);
    this.load.image('chicken-house-16', house16);
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
    this.load.spritesheet('firework250', firework250, { frameWidth: 250, frameHeight: 250 });
    this.load.image('offline', offline);
    this.load.image('tutor-btn', tutorBtn);
    this.load.image('heart', heart);
    this.load.image('calendar', calendar);
    this.load.image('ad-icon', adIcon);
    this.load.image('bg-ad', bgAd);
    this.load.image('big-btn-green', bigButtonGreen);
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

    axios.post(process.env.API + '/chicken/loadData', {
      hash: this.state.user.hash
    }).then((response) => {

      // checkStorage(response.data.user.hash);

      // let localSaveCounter: number = 0;

      // if (localStorage.userChicken) {
      //   let user: IuserChicken = JSON.parse(localStorage.userChicken);
      //   if (typeof user.autosaveCounter === 'number') localSaveCounter = user.autosaveCounter;
      // }

      // if (response.data.user.chickenSaveCounter >= localSaveCounter) {

        // общие настройки
        this.state.autoSaveSpeed = response.data.autoSaveSpeed;
        this.state.maxMerginTime = response.data.maxMerginTime;
        this.state.packages = response.data.packages;
        this.state.herdBoostSpeedAnimal = response.data.herdBoostSpeedAnimal;
        this.state.herdBoostTime = response.data.herdBoostTime;
        this.state.herdBoostPrice = response.data.herdBoostPrice;
        this.state.herdBoostDelay = response.data.herdBoostDelay;
        
        // массив с настройками для куриной фермы
        const chickenSettings: IchickenSettings = {
          chickenBadPercent: response.data.chickenBadPercent,
          chickenPrice: response.data.chickenPrice,
          territoriesChickenSettings: response.data.territoriesChickenSettings,
          chickenSettings: response.data.chickenSettings,
          territoriesChickenPrice: response.data.territoriesChickenPrice,
          chickenFairLevels: response.data.chickenFairLevels,
          chickenParts: response.data.chickenParts,
          buyBetterBreedChicken: response.data.buyBetterBreedChicken,
          doubledСollectorPrice: response.data.doubledСollectorPrice,
          collectorPrice4: response.data.collectorPrice4,
          collectorPrice12: response.data.collectorPrice12,
          unlockCollector4: response.data.unlockCollector4,
          unlockCollector12: response.data.unlockCollector12,
          chickenDiamondsTime: response.data.chickenDiamondsTime,
          feedBoostPrice: response.data.feedBoostPrice,
        }

        this.state.chickenSettings = chickenSettings;

        const chicken: Ichicken[] = [];

        for (let i in response.data.chicken) {
          
          let chick = response.data.chicken[i];
          chicken.push({
            _id: chick._id,
            type: chick.type,
            egg: chick.egg,
            x: chick.x,
            y: chick.y,
            counter: chick.counter,
            diamond: chick.diamond,
            vector: chick.vector
          });

        }
        
        const chickenTerritories: Iterritories[] = [];
        
        for (let i in response.data.territories) {

          let territory = response.data.territories[i];

          chickenTerritories.push({
            _id: territory._id,
            block: territory.block,
            position: territory.position,
            type: territory.type,
            volume: territory.volume,
            improve: territory.improve,
            money: territory.money
          });

        }

        const chickenEggs: IchickenEgg[] = [];

        for (let i in response.data.eggs) {

          let egg = response.data.eggs[i];

          chickenEggs.push({
            _id: egg._id,
            x: egg.x,
            y: egg.y,
            type: egg.type
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
          eventPoints: response.data.user.eventPoints
        }

        const userChicken: IuserChicken = {
          money: response.data.user.chicken_money,
          fair: response.data.user.chicken_fair,
          part: response.data.user.chicken_part,
          countChicken: response.data.user.count_chicken,
          collector: response.data.user.chicken_collector,
          collectorLevel: response.data.user.chickenCollectorLevel,
          collectorTakenTime: response.data.user.chicken_collector,
          diamondAnimalTime: response.data.user.diamonds_chicken_time,
          tutorial: response.data.user.chicken_tutor,
          autosaveCounter: response.data.user.chickenSaveCounter,
          diamondAnimalAd: response.data.user.diamonds_chicken_ad,
          takenHerdBoost: response.data.user.takenHerdBoostChicken,
          feedBoostTime: response.data.user.feedBoostTimeChicken,
        }
        
        const Amplitude = this.state.amplitude;
        const identify = new Amplitude.Identify().set('CatcherSheep', userChicken.collectorLevel);
        Amplitude.getInstance().identify(identify);

        const chickenTasks: Itasks[] = [];

        for (let i in tasks) if (tasks[i].farm === 2) chickenTasks.push(tasks[i]);
        for (let i in response.data.tasks) {

          let usersTask = response.data.tasks[i];
          let task = tasks.find((task: Itasks) => task.id === usersTask.task_id);

          if (task) {
            task.done = usersTask.done;
            task.got_awarded = usersTask.got_awarded;
            task.progress = usersTask.progress;
          }

        }
        
        this.state.timeToHerdBoost = response.data.timeToHerdBoost;
        this.state.chickenCollectorSettings = response.data.collectorSettings;
        this.state.dailyAwards = response.data.dailyAwards;
        this.state.newbieTime = response.data.newbieTime;
        this.state.daily = response.data.daily;
        this.state.offlineTime = response.data.offlineTime;
        this.state.progress = response.data.progress;
        this.state.chickenTerritories = chickenTerritories;
        this.state.chicken = chicken;
        this.state.chickenEggs = chickenEggs;
        this.state.user = user;
        this.state.userChicken = userChicken;
        this.state.chickenTasks = chickenTasks;
        this.state.farm = 'Chicken';
        this.userReady = true;
        this.state.nativeCounter = [0, 0, 0, 0];
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
