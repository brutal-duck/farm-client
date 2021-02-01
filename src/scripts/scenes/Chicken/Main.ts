import Scrolling from '../../libs/Scrolling';
import collisions from '../../general/collisions';
import world from './world';
import drag from './drag';
import chickenBrain from './chickenBrain';
import interval from './interval';
import autoprogress from './autoprogress';
import autosave from './autosave';
import {
  genAnimations,
  firework250,
  cave,
  caveIconsAnimation
} from '../../general/animations';
import {
  click,
  clickTerritory,
  logout,
  convertDiamonds,
  convertMoney,
  exchange,
  freeCollector,
  buyCollector,
  donePart,
  pickUpTaskReward,
  caveTimer,
  onlineStatus,
  buyNextFarm,
  getNewbieAward,
  takeDonate,
  improveCollector,
  debug, 
  createBoostAnimal
} from '../../general/basic';
import {
  confirmExchangeTerritory,
  messageIsSent,
  showBank,
  nextPart,
  showTasks,
  dailyAward,
  takeNewbieAward,
  showDonate,
  showImproveCollector,
  startHerdBoost
} from '../../general/modal';
import {
  partTasks,
  tryTask,
  getTaskData,
  checkAnimalTask,
  checkDoneTasks
} from '../../general/tasks';
import {
  currentTerritory,
  changeSprite,
  fairLevelUp,
  improveTerritory,
  exchangeTerritory,
  deleteTerritoriesLocks,
  buildBorders,
  checkExchangeRepository,
  buyTerritory
} from '../../general/territories';
import { animations, repositoryAnimation } from './animations';
import {
  teleportation,
  reverse,
  aim,
  getChicken,
  getEgg,
  checkMerging,
  cancelMerging,
  buyChicken,
  collectEgg,
  sellEggs,
  eggsFly,
  confirmExpelChicken,
  expelChicken,
  dragChickenMerging
} from './chicken';
import { installTerritory } from './territories';
import { createSpeechBubble, mergingCloud } from '../../elements';
import {
  balance,
  chickenPrice,
  maxBreedForBuy,
  takeDiamondChicken
} from './basic';
import { 
  showTutorial,
  doneTutor_0
} from './tutorial';
import {
  findAd,
  watchAd,
  adReward,
  VKOnAdsReady,
  VKNoAds
} from '../../general/ads';
import setCollector from './collector';

class Chicken extends Phaser.Scene {
  constructor() {
    super('Chicken');
  }
  
  public state: Istate;
  public scrolling: Scrolling;
  public chicken: Phaser.Physics.Arcade.Group;
  public territories: Phaser.Physics.Arcade.Group;
  public eggs: Phaser.Physics.Arcade.Group;
  public bubble: Phaser.GameObjects.Graphics;;
  public bubbleText: Phaser.GameObjects.Text;
  public velocity: number = 40; // дефолтное ускорение куриц
  public topIndent: number = 240; // верхний отступ для блоков территорий
  public bottomIndent: number = 240; // нижний отступ мира (не считая нахлест)
  public height: number; // ширина-высота территории
  public alarm: boolean;
  public settings: IchickenSettings; // настройки
  public collector: number = 0; // время собирателя в секундах
  public collectorTakenTime: number = 0; // время на сколько брали собирателя
  public house: Phaser.GameObjects.Image;
  public autoSaveTimer: number; // таймер для автосохранения
  public autoprogressTimer: number; // таймер для автопрогресса
  public caveIconsTimer: number; // таймер для анимации иконок на пещере
  public collectorTimer: Phaser.Time.TimerEvent; // интервал собирателя яиц
  public debugLog: boolean; // метка для отлова ошибок
  public herdBoostLvl: number = 6; // уровень старта стадного буста

  public world = world.bind(this);
  public drag = drag.bind(this);
  public collisions = collisions.bind(this);
  public chickenBrain = chickenBrain.bind(this);
  public interval = interval.bind(this);
  public click = click.bind(this);
  public clickTerritory = clickTerritory.bind(this);
  public animations = animations.bind(this);
  public firework250 = firework250.bind(this);
  public genAnimations = genAnimations.bind(this);
  public teleportation = teleportation.bind(this);
  public reverse = reverse.bind(this);
  public aim = aim.bind(this);
  public getChicken = getChicken.bind(this);
  public getEgg = getEgg.bind(this);
  public currentTerritory = currentTerritory.bind(this);
  public changeSprite = changeSprite.bind(this);
  public fairLevelUp = fairLevelUp.bind(this);
  public improveTerritory = improveTerritory.bind(this);
  public confirmExchangeTerritory = confirmExchangeTerritory.bind(this);
  public exchangeTerritory = exchangeTerritory.bind(this);
  public installTerritory = installTerritory.bind(this);
  public deleteTerritoriesLocks = deleteTerritoriesLocks.bind(this);
  public buyTerritory = buyTerritory.bind(this);
  public checkExchangeRepository = checkExchangeRepository.bind(this);
  public repositoryAnimation = repositoryAnimation.bind(this);
  public balance = balance.bind(this);
  public convertDiamonds = convertDiamonds.bind(this);
  public convertMoney = convertMoney.bind(this);
  public exchange = exchange.bind(this);
  public chickenPrice = chickenPrice.bind(this);
  public checkMerging = checkMerging.bind(this);
  public cancelMerging = cancelMerging.bind(this);
  public buyChicken = buyChicken.bind(this);
  public collectEgg = collectEgg.bind(this);
  public sellEggs = sellEggs.bind(this);
  public eggsFly = eggsFly.bind(this);
  public confirmExpelChicken = confirmExpelChicken.bind(this);
  public expelChicken = expelChicken.bind(this);
  public createSpeechBubble = createSpeechBubble.bind(this);
  public mergingCloud = mergingCloud.bind(this);
  public showBank = showBank.bind(this);
  public freeCollector = freeCollector.bind(this);
  public buyCollector = buyCollector.bind(this);
  public nextPart = nextPart.bind(this);
  public donePart = donePart.bind(this);
  public maxBreedForBuy = maxBreedForBuy.bind(this);
  public partTasks = partTasks.bind(this);
  public pickUpTaskReward = pickUpTaskReward.bind(this);
  public tryTask = tryTask.bind(this);
  public getTaskData = getTaskData.bind(this);
  public cave = cave.bind(this);
  public takeDiamondChicken = takeDiamondChicken.bind(this);
  public checkAnimalTask = checkAnimalTask.bind(this);
  public showTasks = showTasks.bind(this);
  public messageIsSent = messageIsSent.bind(this);
  public autosave = autosave.bind(this);
  public buildBorders = buildBorders.bind(this);
  public showTutorial = showTutorial.bind(this);
  public doneTutor_0 = doneTutor_0.bind(this);
  public autoprogress = autoprogress.bind(this);
  public caveTimer = caveTimer.bind(this);
  public dailyAward = dailyAward.bind(this);
  public logout = logout.bind(this);
  public onlineStatus = onlineStatus.bind(this);
  public checkDoneTasks = checkDoneTasks.bind(this);
  public buyNextFarm = buyNextFarm.bind(this);
  public takeNewbieAward = takeNewbieAward.bind(this);
  public getNewbieAward = getNewbieAward.bind(this);
  public dragChickenMerging = dragChickenMerging.bind(this);
  public findAd = findAd.bind(this);
  public watchAd = watchAd.bind(this);
  public adReward = adReward.bind(this);
  public caveIconsAnimation = caveIconsAnimation.bind(this);
  public VKOnAdsReady = VKOnAdsReady.bind(this);
  public VKNoAds = VKNoAds.bind(this);
  public showDonate = showDonate.bind(this);
  public takeDonate = takeDonate.bind(this);
  public setCollector = setCollector.bind(this);
  public showImproveCollector = showImproveCollector.bind(this);
  public improveCollector = improveCollector.bind(this);
  public debug = debug.bind(this);
  public createBoostAnimal = createBoostAnimal.bind(this);
  public startHerdBoost = startHerdBoost.bind(this);
  

  public init(state: Istate): void {

    this.autoprogressTimer = Math.round(new Date().getTime() / 1000);
    this.autoSaveTimer = 0;
    this.state = state;
    this.alarm = false;
    this.collectorTimer = null;
    this.settings = state.chickenSettings;
    this.caveIconsTimer = 0;
    console.log('Chicken');
    
  }


  public create(): void {
    
    // анимации
    this.animations();
    this.genAnimations();

    // сторим мир
    this.world();

    // перетаскивание
    this.drag();

    // коллизии
    this.collisions();

    // интервальные функции
    this.interval();
    this.setCollector();


  }


  public update(): void {

    // мозг куриц
    this.chickenBrain();

    // полет яиц в хранилище
    this.eggsFly();

    // анимация полных хранилищ
    this.repositoryAnimation();

    // анимация пещеры
    this.cave();
    
  }


}

export default Chicken;
