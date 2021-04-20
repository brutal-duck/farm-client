import axios from 'axios';
import tasks from '../../tasks';
import Socket from '../../Socket';
import loadCow from '../../local/loadCow';
import { loadingScreen } from '../../general/basic';
import { checkStorage } from '../../general/basic';

const pixel: string = require("./../../../assets/images/pixel.png");
const bg: string = require("./../../../assets/images/scroll-bg.png");
const top: string = require("./../../../assets/images/cow/top.png");
const bottom: string = require("./../../../assets/images/cow/bottom.png");
const topbar: string = require("./../../../assets/images/topbar.png");
const tabbar: string = require("./../../../assets/images/tabbar.png");
const cowBuyIcon1: string = require("./../../../assets/images/cow/icons/cow-buy-icon-1.png");
const cowBuyIcon2: string = require("./../../../assets/images/cow/icons/cow-buy-icon-2.png");
const cowBuyIcon3: string = require("./../../../assets/images/cow/icons/cow-buy-icon-3.png");
const cowBuyIcon4: string = require("./../../../assets/images/cow/icons/cow-buy-icon-4.png");
const cowBuyIcon5: string = require("./../../../assets/images/cow/icons/cow-buy-icon-5.png");
const cowBuyIcon6: string = require("./../../../assets/images/cow/icons/cow-buy-icon-6.png");
const cowBuyIcon7: string = require("./../../../assets/images/cow/icons/cow-buy-icon-7.png");
const cowBuyIcon8: string = require("./../../../assets/images/cow/icons/cow-buy-icon-8.png");
const cowBuyIcon9: string = require("./../../../assets/images/cow/icons/cow-buy-icon-9.png");
const cowBuyIcon10: string = require("./../../../assets/images/cow/icons/cow-buy-icon-10.png");
const cowBuyIcon11: string = require("./../../../assets/images/cow/icons/cow-buy-icon-11.png");
const cowBuyIcon12: string = require("./../../../assets/images/cow/icons/cow-buy-icon-12.png");
const milkCollector: string = require("./../../../assets/images/cow/milk-collector.png");
const shop: string = require("./../../../assets/images/icons/shop.png");
const mapIcon: string = require("./../../../assets/images/icons/map.png");
const sandwich: string = require("./../../../assets/images/icons/sandwich.png");
const sandwichClose: string = require("./../../../assets/images/icons/sandwich-close.png");
const profile: string = require("./../../../assets/images/icons/profile.png");
const chat: string = require("./../../../assets/images/icons/chat.png");
const forBuying: string = require("./../../../assets/images/cow/territories/for-buying.png");
const bought: string = require("./../../../assets/images/cow/territories/bought.png");
const merging: string = require("./../../../assets/images/cow/territories/merging.png");
const tent: string = require("./../../../assets/images/cow/territories/tent.png");
const house: string = require("./../../../assets/images/cow/territories/house.png");
const ground: string = require("./../../../assets/images/cow/territories/ground.png");
const repository: string = require("./../../../assets/images/cow/territories/repository.png");
const repository11: string = require("./../../../assets/images/cow/territories/repository-1-1.png");
const repository21: string = require("./../../../assets/images/cow/territories/repository-2-1.png");
const repository31: string = require("./../../../assets/images/cow/territories/repository-3-1.png");
const repository41: string = require("./../../../assets/images/cow/territories/repository-4-1.png");
const repository12: string = require("./../../../assets/images/cow/territories/repository-1-2.png");
const repository22: string = require("./../../../assets/images/cow/territories/repository-2-2.png");
const repository32: string = require("./../../../assets/images/cow/territories/repository-3-2.png");
const repository42: string = require("./../../../assets/images/cow/territories/repository-4-2.png");
const repository13: string = require("./../../../assets/images/cow/territories/repository-1-3.png");
const repository23: string = require("./../../../assets/images/cow/territories/repository-2-3.png");
const repository33: string = require("./../../../assets/images/cow/territories/repository-3-3.png");
const repository43: string = require("./../../../assets/images/cow/territories/repository-4-3.png");
const repository14: string = require("./../../../assets/images/cow/territories/repository-1-4.png");
const repository24: string = require("./../../../assets/images/cow/territories/repository-2-4.png");
const repository34: string = require("./../../../assets/images/cow/territories/repository-3-4.png");
const repository44: string = require("./../../../assets/images/cow/territories/repository-4-4.png");
const grass11: string = require("./../../../assets/images/cow/territories/grass1-1.png");
const grass12: string = require("./../../../assets/images/cow/territories/grass1-2.png");
const grass13: string = require("./../../../assets/images/cow/territories/grass1-3.png");
const grass14: string = require("./../../../assets/images/cow/territories/grass1-4.png");
const grass15: string = require("./../../../assets/images/cow/territories/grass1-5.png");
const grass21: string = require("./../../../assets/images/cow/territories/grass2-1.png");
const grass22: string = require("./../../../assets/images/cow/territories/grass2-2.png");
const grass23: string = require("./../../../assets/images/cow/territories/grass2-3.png");
const grass24: string = require("./../../../assets/images/cow/territories/grass2-4.png");
const grass25: string = require("./../../../assets/images/cow/territories/grass2-5.png");
const grass31: string = require("./../../../assets/images/cow/territories/grass3-1.png");
const grass32: string = require("./../../../assets/images/cow/territories/grass3-2.png");
const grass33: string = require("./../../../assets/images/cow/territories/grass3-3.png");
const grass34: string = require("./../../../assets/images/cow/territories/grass3-4.png");
const grass35: string = require("./../../../assets/images/cow/territories/grass3-5.png");
const grass41: string = require("./../../../assets/images/cow/territories/grass4-1.png");
const grass42: string = require("./../../../assets/images/cow/territories/grass4-2.png");
const grass43: string = require("./../../../assets/images/cow/territories/grass4-3.png");
const grass44: string = require("./../../../assets/images/cow/territories/grass4-4.png");
const grass45: string = require("./../../../assets/images/cow/territories/grass4-5.png");
const water11: string = require("./../../../assets/images/cow/territories/water1-1.png");
const water12: string = require("./../../../assets/images/cow/territories/water1-2.png");
const water13: string = require("./../../../assets/images/cow/territories/water1-3.png");
const water14: string = require("./../../../assets/images/cow/territories/water1-4.png");
const water21: string = require("./../../../assets/images/cow/territories/water2-1.png");
const water22: string = require("./../../../assets/images/cow/territories/water2-2.png");
const water23: string = require("./../../../assets/images/cow/territories/water2-3.png");
const water24: string = require("./../../../assets/images/cow/territories/water2-4.png");
const water31: string = require("./../../../assets/images/cow/territories/water3-1.png");
const water32: string = require("./../../../assets/images/cow/territories/water3-2.png");
const water33: string = require("./../../../assets/images/cow/territories/water3-3.png");
const water34: string = require("./../../../assets/images/cow/territories/water3-4.png");
const water41: string = require("./../../../assets/images/cow/territories/water4-1.png");
const water42: string = require("./../../../assets/images/cow/territories/water4-2.png");
const water43: string = require("./../../../assets/images/cow/territories/water4-3.png");
const water44: string = require("./../../../assets/images/cow/territories/water4-4.png");
const lockTerritory: string = require("./../../../assets/images/lock-territory.png");
const cow0: string = require("./../../../assets/images/cow/cow/cow0.png");
const cowHorns1: string = require("./../../../assets/images/cow/cow/horns-1.png");
const cowHorns2: string = require("./../../../assets/images/cow/cow/horns-2.png");
const cowHorns3: string = require("./../../../assets/images/cow/cow/horns-3.png");
const cow1: string = require("./../../../assets/images/cow/cow/cow1.png");
const cow2: string = require("./../../../assets/images/cow/cow/cow2.png");
const cow3: string = require("./../../../assets/images/cow/cow/cow3.png");
const cow4: string = require("./../../../assets/images/cow/cow/cow4.png");
const cow5: string = require("./../../../assets/images/cow/cow/cow5.png");
const cow6: string = require("./../../../assets/images/cow/cow/cow6.png");
const cow7: string = require("./../../../assets/images/cow/cow/cow7.png");
const cow8: string = require("./../../../assets/images/cow/cow/cow8.png");
const cow9: string = require("./../../../assets/images/cow/cow/cow9.png");
const cow10: string = require("./../../../assets/images/cow/cow/cow10.png");
const cow11: string = require("./../../../assets/images/cow/cow/cow11.png");
const cow12: string = require("./../../../assets/images/cow/cow/cow12.png");
const milkStatus: string = require("./../../../assets/images/cow/icons/milk-status.png");
const milk0: string = require("./../../../assets/images/cow/milk/milk0.png");
const mergingAnimation: string = require("./../../../assets/images/merging-animation.png");
const coin: string = require("./../../../assets/images/cow/icons/money.png");
const diamond: string = require("./../../../assets/images/icons/diamonds.png");
const lock: string = require("./../../../assets/images/icons/lock.png");
const disablecow: string = require("./../../../assets/images/cow/cow/disable-cow.png");
const house9: string = require("./../../../assets/images/cow/houses/house-9.png");
const houseSprite: string = require("./../../../assets/images/cow/houses/house-10.png");
const caveDisalble: string = require("./../../../assets/images/cave/cave-disable.png");
const caveReady: string = require("./../../../assets/images/cave/cave-ready.png");
const caveWait: string = require("./../../../assets/images/cave/cave-wait.png");
const caveTimer: string = require("./../../../assets/images/cave/cave-timer.png");
const chapter1: string = require("./../../../assets/images/cow/chapters/chapter1.png");
const chapter2: string = require("./../../../assets/images/cow/chapters/chapter2.png");
const chapter3: string = require("./../../../assets/images/cow/chapters/chapter3.png");
const chapter4: string = require("./../../../assets/images/cow/chapters/chapter4.png");
const chapter5: string = require("./../../../assets/images/cow/chapters/chapter5.png");
const chapter6: string = require("./../../../assets/images/cow/chapters/chapter6.png");
const chapter7: string = require("./../../../assets/images/cow/chapters/chapter7.png");
const chapter8: string = require("./../../../assets/images/cow/chapters/chapter8.png");
const chapter9: string = require("./../../../assets/images/cow/chapters/chapter9.png");
const chapter10: string = require("./../../../assets/images/cow/chapters/chapter10.png");
const chapter11: string = require("./../../../assets/images/cow/chapters/chapter11.png");
const chapter12: string = require("./../../../assets/images/cow/chapters/chapter12.png");
const chapter13: string = require("./../../../assets/images/cow/chapters/chapter13.png");
const chapter14: string = require("./../../../assets/images/cow/chapters/chapter14.png");
const chapter15: string = require("./../../../assets/images/cow/chapters/chapter15.png");
const chapter16: string = require("./../../../assets/images/cow/chapters/chapter16.png");
const forest1: string = require("./../../../assets/images/cow/territories/forest-1.png");
const forest2: string = require("./../../../assets/images/cow/territories/forest-2.png");
const forest3: string = require("./../../../assets/images/cow/territories/forest-3.png");
const forest4: string = require("./../../../assets/images/cow/territories/forest-4.png");
const forest5: string = require("./../../../assets/images/cow/territories/forest-5.png");
const forest6: string = require("./../../../assets/images/cow/territories/forest-6.png");
const forest7: string = require("./../../../assets/images/cow/territories/forest-7.png");
const forest8: string = require("./../../../assets/images/cow/territories/forest-8.png");
const star: string = require("./../../../assets/images/icons/star.png");
const completed: string = require("./../../../assets/images/icons/completed.png");
const littleButton: string = require("./../../../assets/images/modal/little-button.png");
const taskIcon1: string = require("./../../../assets/images/cow/tasks/task-icon-1.png");
const taskIcon2: string = require("./../../../assets/images/cow/tasks/task-icon-2.png");
const taskIcon3: string = require("./../../../assets/images/cow/tasks/task-icon-3.png");
const taskIcon4: string = require("./../../../assets/images/cow/tasks/task-icon-4.png");
const taskIcon5: string = require("./../../../assets/images/cow/tasks/task-icon-5.png");
const taskIcon6: string = require("./../../../assets/images/cow/tasks/task-icon-6.png");
const taskIcon7: string = require("./../../../assets/images/cow/tasks/task-icon-7.png");
const taskIcon8: string = require("./../../../assets/images/cow/tasks/task-icon-8.png");
const taskIcon9: string = require("./../../../assets/images/cow/tasks/task-icon-9.png");
const taskIcon10: string = require("./../../../assets/images/cow/tasks/task-icon-10.png");
const taskIcon11: string = require("./../../../assets/images/cow/tasks/task-icon-11.png");
const taskIcon12: string = require("./../../../assets/images/cow/tasks/task-icon-12.png");
const taskIcon13: string = require("./../../../assets/images/cow/tasks/task-icon-13.png");
const taskIcon14: string = require("./../../../assets/images/cow/tasks/task-icon-14.png");
const taskIcon15: string = require("./../../../assets/images/cow/tasks/task-icon-15.png");
const taskIcon16: string = require("./../../../assets/images/cow/tasks/task-icon-16.png");
const taskIcon17: string = require("./../../../assets/images/cow/tasks/task-icon-17.png");
const taskIcon18: string = require("./../../../assets/images/cow/tasks/task-icon-18.png");
const taskIcon20: string = require("./../../../assets/images/cow/tasks/task-icon-20.png");
const taskIcon21: string = require("./../../../assets/images/cow/tasks/task-icon-21.png");
const taskIcon22: string = require("./../../../assets/images/cow/tasks/task-icon-22.png");
const taskIcon23: string = require("./../../../assets/images/cow/tasks/task-icon-23.png");
const taskIcon24: string = require("./../../../assets/images/cow/tasks/task-icon-24.png");
const taskIcon25: string = require("./../../../assets/images/cow/tasks/task-icon-25.png");
const taskIcon26: string = require("./../../../assets/images/cow/tasks/task-icon-26.png");
const taskIcon27: string = require("./../../../assets/images/cow/tasks/task-icon-27.png");
const taskIcon28: string = require("./../../../assets/images/cow/tasks/task-icon-28.png");
const taskIcon29: string = require("./../../../assets/images/cow/tasks/task-icon-29.png");
const taskIcon32: string = require("./../../../assets/images/cow/tasks/task-icon-32.png");
const taskIcon33: string = require("./../../../assets/images/cow/tasks/task-icon-33.png");
const taskIcon34: string = require("./../../../assets/images/cow/tasks/task-icon-34.png");
const plus: string = require("./../../../assets/images/icons/plus.png");
const cowLeaves: string = require("./../../../assets/images/cow/cow-leaves.png");
const greenBalanceBg: string = require("./../../../assets/images/balance/green-balance-bg.png");
const redBalanceBg: string = require("./../../../assets/images/balance/red-balance-bg.png");
const resourceEnough: string = require("./../../../assets/images/balance/resource-enough.png");
const resourceProblem: string = require("./../../../assets/images/balance/resource-problem.png");
const grassBalance: string = require("./../../../assets/images/balance/grass-balance.png");
const waterBalance: string = require("./../../../assets/images/balance/water-balance.png");
const tail: string = require("./../../../assets/images/tail.png");
const verticalBorder: string = require("./../../../assets/images/cow/territories/vertical-border.png");
const horizontalBorder1: string = require("./../../../assets/images/cow/territories/horizontal-border-1.png");
const horizontalBorder2: string = require("./../../../assets/images/cow/territories/horizontal-border-2.png");
const horizontalBorder3: string = require("./../../../assets/images/cow/territories/horizontal-border-3.png");
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


class CowPreload extends Phaser.Scene {

  public lang: string; // индекс языка
  public state: Istate;
  public userReady: boolean;
  public loadingReady: boolean;
  public socket: boolean;
  public loadTime: number;
  public startTime: number;
  public loadCow = loadCow.bind(this);
  public loadingScreen = loadingScreen.bind(this);

  constructor() {
    super('CowPreload');
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
    this.load.image('chat', chat);
    this.load.image('cow-for-buying', forBuying);
    this.load.image('cow-bought', bought);
    this.load.image('cow-merging', merging);
    this.load.image('cow-tent', tent);
    this.load.image('cow-house', house);
    this.load.image('cow-ground', ground);
    this.load.image('cow-repository', repository);
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
    this.load.image('cow-grass1-5', grass15);
    this.load.image('cow-grass2-1', grass21);
    this.load.image('cow-grass2-2', grass22);
    this.load.image('cow-grass2-3', grass23);
    this.load.image('cow-grass2-4', grass24);
    this.load.image('cow-grass2-5', grass25);
    this.load.image('cow-grass3-1', grass31);
    this.load.image('cow-grass3-2', grass32);
    this.load.image('cow-grass3-3', grass33);
    this.load.image('cow-grass3-4', grass34);
    this.load.image('cow-grass3-5', grass35);
    this.load.image('cow-grass4-1', grass41);
    this.load.image('cow-grass4-2', grass42);
    this.load.image('cow-grass4-3', grass43);
    this.load.image('cow-grass4-4', grass44);
    this.load.image('cow-grass4-5', grass45);
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
    this.load.image('cow-milk0', milk0);
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
    this.load.image('cow-task-icon-32', taskIcon32);
    this.load.image('cow-task-icon-33', taskIcon33);
    this.load.image('cow-task-icon-34', taskIcon34);
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
      this.scene.start('Cow', this.state); // сцена с коровами
      this.scene.start('CowBars', this.state); // сцена с барами
      this.scene.start('Preload', this.state); // сцена с подзагрузкой

    }

  }

  public loadUser(): void {

    axios.post(process.env.API + '/cow/loadData', {
      hash: this.state.user.hash
    }).then((response) => {
      // console.log(response.data)

    //   // checkStorage(response.data.user.hash);

    //   // let localSaveCounter: number = 0;

    //   // if (localStorage.userCow) {
    //   //   let user: IuserCow = JSON.parse(localStorage.userCow);
    //   //   if (typeof user.autosaveCounter === 'number') localSaveCounter = user.autosaveCounter;
    //   // }

    //   // if (response.data.user.cowSaveCounter >= localSaveCounter) {

        // общие настройки
        this.state.autoSaveSpeed = response.data.autoSaveSpeed;
        this.state.maxMerginTime = response.data.maxMerginTime;
        this.state.packages = response.data.packages;
        this.state.herdBoostSpeedAnimal = response.data.herdBoostSpeedAnimal;
        this.state.herdBoostTime = response.data.herdBoostTime;
        this.state.herdBoostPrice = response.data.herdBoostPrice;
        this.state.herdBoostDelay = response.data.herdBoostDelay;
        
        const factoryCowSettings: IfactorySettings[] = [
          { 
            improve: 1,
            unlock_improve: 1,
            improveMoneyPrice: 0,
            improveDiamondPrice: 0,
            processingTime: 15,
            lotSize: 100,
            clabberPercent: 40,
            pasteurizedMilkPercent: 0,
            cheesePercent: 0,
            chocolatePercent: 100,
          },
          { 
            improve: 2,
            unlock_improve: 1,
            improveMoneyPrice: 40000,
            improveDiamondPrice: 0,
            processingTime: 30,
            lotSize: 400,
            clabberPercent: 40,
            pasteurizedMilkPercent: 30,
            cheesePercent: 0,
            chocolatePercent: 100,
          },
          { 
            improve: 3,
            unlock_improve: 1,
            improveMoneyPrice: 600000,
            improveDiamondPrice: 0,
            processingTime: 30,
            lotSize: 1000,
            clabberPercent: 30,
            pasteurizedMilkPercent: 40,
            cheesePercent: 0,
            chocolatePercent: 100,
          },
          { 
            improve: 4,
            unlock_improve: 1,
            improveMoneyPrice: 1600000,
            improveDiamondPrice: 0,
            processingTime: 30,
            lotSize: 2000,
            clabberPercent: 30,
            pasteurizedMilkPercent: 45,
            cheesePercent: 0,
            chocolatePercent: 100,
          },
          { 
            improve: 5,
            unlock_improve: 1,
            improveMoneyPrice: 0,
            improveDiamondPrice: 60,
            processingTime: 60,
            lotSize: 3000,
            clabberPercent: 35,
            pasteurizedMilkPercent: 45,
            cheesePercent: 20,
            chocolatePercent: 100,
          },
          { 
            improve: 6,
            unlock_improve: 1,
            improveMoneyPrice: 12000000,
            improveDiamondPrice: 0,
            processingTime: 60,
            lotSize: 12000,
            clabberPercent: 35,
            pasteurizedMilkPercent: 45,
            cheesePercent: 20,
            chocolatePercent: 100,
          },
          { 
            improve: 7,
            unlock_improve: 1,
            improveMoneyPrice: 36000000,
            improveDiamondPrice: 0,
            processingTime: 60,
            lotSize: 25000,
            clabberPercent: 25,
            pasteurizedMilkPercent: 43,
            cheesePercent: 32,
            chocolatePercent: 100,
          },
          { 
            improve: 8,
            unlock_improve: 1,
            improveMoneyPrice: 56000000,
            improveDiamondPrice: 0,
            processingTime: 60,
            lotSize: 35000,
            clabberPercent: 25,
            pasteurizedMilkPercent: 43,
            cheesePercent: 32,
            chocolatePercent: 100,
          },
          { 
            improve: 9,
            unlock_improve: 1,
            improveMoneyPrice: 160000000,
            improveDiamondPrice: 0,
            processingTime: 60,
            lotSize: 50000,
            clabberPercent: 25,
            pasteurizedMilkPercent: 43,
            cheesePercent: 32,
            chocolatePercent: 100,
          },
          { 
            improve: 10,
            unlock_improve: 1,
            improveMoneyPrice: 0,
            improveDiamondPrice: 240,
            processingTime: 120,
            lotSize: 150000,
            clabberPercent: 25,
            pasteurizedMilkPercent: 43,
            cheesePercent: 32,
            chocolatePercent: 100,
          },
          { 
            improve: 11,
            unlock_improve: 1,
            improveMoneyPrice: 320000000,
            improveDiamondPrice: 0,
            processingTime: 120,
            lotSize: 300000,
            clabberPercent: 25,
            pasteurizedMilkPercent: 45,
            cheesePercent: 35,
            chocolatePercent: 100,
          },
          { 
            improve: 12,
            unlock_improve: 1,
            improveMoneyPrice: 560000000,
            improveDiamondPrice: 0,
            processingTime: 120,
            lotSize: 400000,
            clabberPercent: 20,
            pasteurizedMilkPercent: 50,
            cheesePercent: 30,
            chocolatePercent: 100,
          },
          { 
            improve: 13,
            unlock_improve: 1,
            improveMoneyPrice: 1200000000,
            improveDiamondPrice: 0,
            processingTime: 120,
            lotSize: 600000,
            clabberPercent: 20,
            pasteurizedMilkPercent: 50,
            cheesePercent: 30,
            chocolatePercent: 100,
          },
          { 
            improve: 14,
            unlock_improve: 1,
            improveMoneyPrice: 1600000000,
            improveDiamondPrice: 0,
            processingTime: 120,
            lotSize: 950000,
            clabberPercent: 20,
            pasteurizedMilkPercent: 50,
            cheesePercent: 30,
            chocolatePercent: 100,
          },
          { 
            improve: 15,
            unlock_improve: 1,
            improveMoneyPrice: 0,
            improveDiamondPrice: 540,
            processingTime: 180,
            lotSize: 2000000,
            clabberPercent: 20,
            pasteurizedMilkPercent: 35,
            cheesePercent: 45,
            chocolatePercent: 100,
          },
          { 
            improve: 16,
            unlock_improve: 1,
            improveMoneyPrice: 2600000000,
            improveDiamondPrice: 0,
            processingTime: 180,
            lotSize: 3500000,
            clabberPercent: 20,
            pasteurizedMilkPercent: 35,
            cheesePercent: 45,
            chocolatePercent: 100,
          },
          { 
            improve: 17,
            unlock_improve: 1,
            improveMoneyPrice: 4000000000,
            improveDiamondPrice: 0,
            processingTime: 180,
            lotSize: 5000000,
            clabberPercent: 20,
            pasteurizedMilkPercent: 35,
            cheesePercent: 45,
            chocolatePercent: 100,
          },
          { 
            improve: 18,
            unlock_improve: 1,
            improveMoneyPrice: 0,
            improveDiamondPrice: 840,
            processingTime: 300,
            lotSize: 9000000,
            clabberPercent: 5,
            pasteurizedMilkPercent: 30,
            cheesePercent: 65,
            chocolatePercent: 100,
          },
          { 
            improve: 19,
            unlock_improve: 1,
            improveMoneyPrice: 0,
            improveDiamondPrice: 1080,
            processingTime: 300,
            lotSize: 14000000,
            clabberPercent: 5,
            pasteurizedMilkPercent: 30,
            cheesePercent: 65,
            chocolatePercent: 100,
          },
          { 
            improve: 20,
            unlock_improve: 1,
            improveMoneyPrice: 0,
            improveDiamondPrice: 1800,
            processingTime: 300,
            lotSize: 30000000,
            clabberPercent: 5,
            pasteurizedMilkPercent: 30,
            cheesePercent: 65,
            chocolatePercent: 100,
          },
        ]
        // массив с настройками для коровьей фермы
        const cowSettings: IcowSettings = {
          cowBadPercent: response.data.cowBadPercent,
          cowPrice: response.data.cowPrice,
          territoriesCowSettings: response.data.territoriesCowSettings,
          cowSettings: response.data.cowSettings,
          territoriesCowPrice: response.data.territoriesCowPrice,
          cowFairLevels: response.data.cowFairLevels,
          cowParts: response.data.cowParts,
          buyBetterBreedCow: response.data.buyBetterBreedCow,
          doubledСollectorPrice: response.data.doubledСollectorPrice,
          collectorPrice4: response.data.collectorPrice4,
          collectorPrice12: response.data.collectorPrice12,
          unlockCollector4: response.data.unlockCollector4,
          unlockCollector12: response.data.unlockCollector12,
          cowDiamondsTime: response.data.cowDiamondsTime,
          feedBoostPrice: response.data.feedBoostPrice,
          cowFactorySettings: factoryCowSettings,
        }

        let territoriesCowSettings: IterritoriesCowSettings[] = [
          { 
            improve: 1, 
            regeneration: 11, 
            unlock_improve: 1, 
            storage: 5000,   
            improvePastureMoneyPrice: 0,
            improveStorageMoneyPrice: 0,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 2, 
            regeneration: 13, 
            unlock_improve: 2, 
            storage: 30000,   
            improvePastureMoneyPrice: 100,
            improveStorageMoneyPrice: 10000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 3, 
            regeneration: 15, 
            unlock_improve: 2, 
            storage: 100000,   
            improvePastureMoneyPrice: 400,
            improveStorageMoneyPrice: 150000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 4, 
            regeneration: 17, 
            unlock_improve: 2, 
            storage: 230000,   
            improvePastureMoneyPrice: 1500,
            improveStorageMoneyPrice: 400000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 5, 
            regeneration: 19, 
            unlock_improve: 2, 
            storage: 510000,   
            improvePastureMoneyPrice: 5000,
            improveStorageMoneyPrice: 0,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 50,
          },
          { 
            improve: 6, 
            regeneration: 22, 
            unlock_improve: 3, 
            storage: 1100000,   
            improvePastureMoneyPrice: 10000,
            improveStorageMoneyPrice: 3000000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 7, 
            regeneration: 23, 
            unlock_improve: 3, 
            storage: 2500000,   
            improvePastureMoneyPrice: 23000,
            improveStorageMoneyPrice: 9000000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 8, 
            regeneration: 24, 
            unlock_improve: 4, 
            storage: 5000000,   
            improvePastureMoneyPrice: 50000,
            improveStorageMoneyPrice: 14000000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 9, 
            regeneration: 25, 
            unlock_improve: 4, 
            storage: 9000000,   
            improvePastureMoneyPrice: 70000,
            improveStorageMoneyPrice: 40000000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          {
            improve: 10, 
            regeneration: 27, 
            unlock_improve: 5, 
            storage: 14500000,   
            improvePastureMoneyPrice: 100000,
            improveStorageMoneyPrice: 0,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 200,
          },
          { 
            improve: 11, 
            regeneration: 29, 
            unlock_improve: 6, 
            storage: 22000000,   
            improvePastureMoneyPrice: 402000,
            improveStorageMoneyPrice: 80000000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 12, 
            regeneration: 31, 
            unlock_improve: 6, 
            storage: 35000000,   
            improvePastureMoneyPrice: 1230000,
            improveStorageMoneyPrice: 140000000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 13, 
            regeneration: 33, 
            unlock_improve: 7, 
            storage: 50000000,   
            improvePastureMoneyPrice: 1400000,
            improveStorageMoneyPrice: 300000000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 14, 
            regeneration: 34, 
            unlock_improve: 7, 
            storage: 80000000,   
            improvePastureMoneyPrice: 1600000,
            improveStorageMoneyPrice: 400000000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 15, 
            regeneration: 35, 
            unlock_improve: 8, 
            storage: 110000000,   
            improvePastureMoneyPrice: 1800000,
            improveStorageMoneyPrice: 0,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 450,
          },
          { 
            improve: 16, 
            regeneration: 36, 
            unlock_improve: 9, 
            storage: 200000000,   
            improvePastureMoneyPrice: 3600000,
            improveStorageMoneyPrice: 650000000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 17, 
            regeneration: 38, 
            unlock_improve: 10, 
            storage: 300000000,   
            improvePastureMoneyPrice: 7200000,
            improveStorageMoneyPrice: 1000000000,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 0,
          },
          { 
            improve: 18, 
            regeneration: 40, 
            unlock_improve: 11, 
            storage: 400000000,   
            improvePastureMoneyPrice: 14400000,
            improveStorageMoneyPrice: 0,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 700,
          },
          { 
            improve: 19, 
            regeneration: 42, 
            unlock_improve: 12, 
            storage: 500000000,   
            improvePastureMoneyPrice: 28800000,
            improveStorageMoneyPrice: 0,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 900,
          },
          { 
            improve: 20, 
            regeneration: 44, 
            unlock_improve: 13, 
            storage: 1000000000,   
            improvePastureMoneyPrice: 57600000,
            improveStorageMoneyPrice: 0,
            improvePastureDiamondPrice: 0,
            improveStorageDiamondPrice: 1500,
          },
        ]

        

        cowSettings.territoriesCowSettings = territoriesCowSettings;
        console.log(cowSettings.territoriesCowSettings)
        this.state.cowSettings = cowSettings;

        const cow: Icow[] = [];

        for (let i in response.data.cow) {
          
          let cw = response.data.cow[i];
          cow.push({
            _id: cw._id,
            type: cw.type,
            milk: cw.milk,
            x: cw.x,
            y: cw.y,
            counter: cw.counter,
            diamond: cw.diamond,
            vector: cw.vector
          });

        }
        
        const cowTerritories: Iterritories[] = [];
        
        for (let i in response.data.territories) {

          let territory = response.data.territories[i];

          cowTerritories.push({
            _id: territory._id,
            block: territory.block,
            position: territory.position,
            type: territory.type,
            volume: territory.volume,
            improve: territory.improve,
            money: territory.money
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

        const userCow: IuserCow = {
          money: response.data.user.cow_money,
          fair: response.data.user.cow_fair,
          part: response.data.user.cow_part,
          countCow: response.data.user.count_cow,
          collector: response.data.user.cow_collector,
          collectorLevel: response.data.user.cowCollectorLevel,
          collectorTakenTime: response.data.user.cow_collector,
          diamondAnimalTime: response.data.user.diamonds_cow_time,
          tutorial: response.data.user.cow_tutor,
          autosaveCounter: response.data.user.cowSaveCounter,
          diamondAnimalAd: response.data.user.diamonds_cow_ad,
          takenHerdBoost: response.data.user.takenHerdBoostCow,
          feedBoostTime: response.data.user.feedBoostTimeCow,
        }
        
        const Amplitude = this.state.amplitude;
        const identify = new Amplitude.Identify().set('CatcherCow', userCow.collectorLevel);
        Amplitude.getInstance().identify(identify);

        const cowTasks: Itasks[] = [];

        for (let i in tasks) if (tasks[i].farm === 2) cowTasks.push(tasks[i]);
        for (let i in response.data.tasks) {

          let usersTask = response.data.tasks[i];
          let task = tasks.find((task: Itasks) => task.id === usersTask.task_id);

          if (task) {
            task.done = usersTask.done;
            task.got_awarded = usersTask.got_awarded;
            task.progress = usersTask.progress;
          }

        }
        
        this.state.timeToNewDay = response.data.timeToNewDay;
        this.state.cowCollectorSettings = response.data.collectorSettings;
        this.state.dailyAwards = response.data.dailyAwards;
        this.state.newbieTime = response.data.newbieTime;
        this.state.daily = response.data.daily;
        this.state.offlineTime = response.data.offlineTime;
        this.state.progress = response.data.progress;
        this.state.cowTerritories = cowTerritories;
        this.state.cow = cow;
        this.state.user = user;
        this.state.userCow = userCow;
        this.state.cowTasks = cowTasks;
        this.state.farm = 'Cow';
        this.userReady = true;
        this.state.nativeCounter = [0, 0, 0, 0];
    //   // } else {
    //   //   this.loadCow(response.data.user.counter);
    //   // }
      
    })
    // .catch(() => {
    //   this.loadCow();
    // });


    localStorage.farm = 'Cow';
  }

  
 
}

export default CowPreload;
