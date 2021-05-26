import Scrolling from '../../libs/Scrolling';
import collisions from '../../general/collisions';
import world from './world';
import drag from './drag';
import chickenBrain from './chickenBrain';
import interval from './interval';
import autoprogress from '../../general/autoprogress';
import autosave from '../../general/autosave';
import {  
  click,
  clickTerritory,
} from '../../general/clicks';
import {
  logout,
  convertDiamonds,
  convertMoney,
  exchange,
  donePart,
  pickUpTaskReward,
  onlineStatus,
  buyNextFarm,
  getNewbieAward,
  takeDonate,
  debug, 
  random,
  randomString,
  getRandomBool,
  spreadAnimals,
  getEventRaiting,
  nextDayTimer,
  autoporgressCollectorTime,
  logAmplitudeEvent,
  logAmplitudeRevenue,
  farmBalance,
} from '../../general/basic';
import {
  improveCollector,
  createBoostAnimal,
  freeCollector,
  buyCollector,
} from '../../general/boosts';
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
  buyTerritory,
  findFreeTerritory
} from '../../general/territories';
import { animations, repositoryAnimation } from './animations';
import {
  teleportation,
  reverse,
  aim,
  getChicken,
  checkMerging,
  cancelMerging,
  buyChicken,
  collectEgg,
  sellEggs,
  confirmExpelChicken,
  expelChicken,
  dragChickenMerging
} from './chicken';
import { installTerritory } from './territories';
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
import { showEventTutorial, doneEventTutor_0 } from '../Event/Unicorns/tutorial';
import {
  sheepIntervalProgress,
  sheepCollectorProgress,
  cowIntervalProgress,
  cowCollectorProgress,
  cowFactoryProgress,
  updateProfileNative,
  intervalPorgressCollectorTime,
  intervalCollectorTutorial,
  showFeedBoostSpeechBubble,
} from '../../general/interval';

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
  public herdBoostLvl: number = 5; // уровень старта стадного буста
  public feedBoostMultiplier: number = 2; // множитель для буста 
  public feedBoostLvl: number = 6; // уровень старта буста комбикорм
  public feedBoostStack: number = 11; // максимальный стек часов
  public dailyStartCheck: boolean = true; // запущено ли открытие окна daily
  public counterWithoutCollector: number = 0;

  public world = world.bind(this);
  public drag = drag.bind(this);
  public collisions = collisions.bind(this);
  public chickenBrain = chickenBrain.bind(this);
  public interval = interval.bind(this);
  public click = click.bind(this);
  public clickTerritory = clickTerritory.bind(this);
  public animations = animations.bind(this);
  public teleportation = teleportation.bind(this);
  public reverse = reverse.bind(this);
  public aim = aim.bind(this);
  public getChicken = getChicken.bind(this);
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
  public confirmExpelChicken = confirmExpelChicken.bind(this);
  public expelChicken = expelChicken.bind(this);
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
  public takeDiamondChicken = takeDiamondChicken.bind(this);
  public checkAnimalTask = checkAnimalTask.bind(this);
  public showTasks = showTasks.bind(this);
  public messageIsSent = messageIsSent.bind(this);
  public autosave = autosave.bind(this);
  public buildBorders = buildBorders.bind(this);
  public showTutorial = showTutorial.bind(this);
  public doneTutor_0 = doneTutor_0.bind(this);
  public autoprogress = autoprogress.bind(this);
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
  public random = random.bind(this);
  public randomString = randomString.bind(this);
  public getRandomBool = getRandomBool.bind(this);
  public spreadAnimals = spreadAnimals.bind(this);
  public getEventRaiting = getEventRaiting.bind(this);
  public showEventTutorial = showEventTutorial.bind(this);
  public doneEventTutor_0 = doneEventTutor_0.bind(this);
  public nextDayTimer = nextDayTimer.bind(this);
  public intervalPorgressCollectorTime = intervalPorgressCollectorTime.bind(this);
  public autoporgressCollectorTime = autoporgressCollectorTime.bind(this);
  public findFreeTerritory = findFreeTerritory.bind(this);
  public logAmplitudeEvent = logAmplitudeEvent.bind(this);
  public logAmplitudeRevenue = logAmplitudeRevenue.bind(this);  
  public farmBalance = farmBalance.bind(this);
  public sheepIntervalProgress = sheepIntervalProgress.bind(this);
  public sheepCollectorProgress = sheepCollectorProgress.bind(this);
  public cowIntervalProgress = cowIntervalProgress.bind(this);
  public cowCollectorProgress = cowCollectorProgress.bind(this);
  public cowFactoryProgress = cowFactoryProgress.bind(this);
  public updateProfileNative = updateProfileNative.bind(this);
  public intervalCollectorTutorial = intervalCollectorTutorial.bind(this);
  public showFeedBoostSpeechBubble = showFeedBoostSpeechBubble.bind(this);

  public init(state: Istate): void {

    this.autoprogressTimer = Math.round(new Date().getTime() / 1000);
    this.autoSaveTimer = 0;
    this.state = state;
    this.alarm = false;
    this.collectorTimer = null;
    this.settings = state.chickenSettings;
    this.counterWithoutCollector = 0;
    this.caveIconsTimer = 0;
    console.log('Chicken');
    this.autoprogress(true);
  }


  public create(): void {
    // анимации
    this.animations();

    // сторим мир
    this.world();

    // перетаскивание
    this.drag();

    // коллизии
    this.collisions();

    // интервальные функции
    this.interval();
    this.setCollector();

    let cursors = this.input.keyboard.createCursorKeys();
    cursors.space.on('down', (): void => {
      this.state.userChicken.part = 16;
      let tasks = this.partTasks();
      for (let i in tasks) {
          tasks[i].done = 1;
          tasks[i].got_awarded = 1;
      }
      // this.state.userChicken.diamondAnimalTime = 0;
    });

  }


  public update(): void {
    // мозг куриц
    this.chickenBrain();
    // анимация полных хранилищ
    this.repositoryAnimation();
  }
}

export default Chicken;
