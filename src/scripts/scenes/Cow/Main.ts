import Scrolling from '../../libs/Scrolling';
import world from './world';
import drag from './drag';
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
  logAmplitudeEvent,
  logAmplitudeRevenue,
  farmBalance,
  autoporgressCollectorTime,
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
  findFreeTerritory
} from '../../general/territories';
import { repositoryAnimation, animations } from './animations';
import {
  teleportation,
  checkMerging,
  cancelMerging,
  buyCow,
  collectMilk,
  sellMilk,
  confirmExpelCow,
  expelCow,
  dragCowMerging
} from './cow';
import { 
  installTerritory,  
  deleteTerritoriesLocks
} from './territories';
import {
  balance,
  cowPrice,
  maxBreedForBuy,
  takeDiamondCow,
  buildBorders,
  collisions,
  showImproveFactory,
  showFactoryBoost
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
import CowGroup from '../../components/AnimalGroup/CowGroup';
import {
  sheepIntervalProgress,
  sheepCollectorProgress,
  chickenCollectorProgress,
  chickenIntervalProgress,
  updateProfileNative,
  intervalPorgressCollectorTime,
  intervalCollectorTutorial,
  showFeedBoostSpeechBubble,
} from '../../general/interval';

class Cow extends Phaser.Scene {
  constructor() {
    super('Cow');
  }
  
  public state: Istate;
  public scrolling: Scrolling;
  public animalGroup: CowGroup;
  public territories: Phaser.Physics.Arcade.Group;
  public milk: Phaser.Physics.Arcade.Group;
  public bubble: Phaser.GameObjects.Graphics;;
  public bubbleText: Phaser.GameObjects.Text;
  public topIndent: number = 240; // верхний отступ для блоков территорий
  public bottomIndent: number = 240; // нижний отступ мира (не считая нахлест)
  public height: number; // ширина-высота территории
  public alarm: boolean;
  public settings: IcowSettings; // настройки
  public collector: number = 0; // время собирателя в секундах
  public collectorTakenTime: number = 0; // время на сколько брали собирателя
  public house: Phaser.GameObjects.Image;
  public autoSaveTimer: number; // таймер для автосохранения
  public autoprogressTimer: number; // таймер для автопрогресса
  public caveIconsTimer: number; // таймер для анимации иконок на пещере
  public collectorTimer: Phaser.Time.TimerEvent; // интервал собирателя молока
  public debugLog: boolean; // метка для отлова ошибок
  public herdBoostLvl: number = 5; // уровень старта стадного буста
  public feedBoostMultiplier: number = 2; // множитель для буста 
  public feedBoostLvl: number = 6; // уровень старта буста комбикорм
  public feedBoostStack: number = 11; // максимальный стек часов
  public dailyStartCheck: boolean = true; // запущено ли открытие окна daily
  public milkMultiply: number = 0.2;
  public clabberMultiply: number = 0.5;
  public pasteurizedMilkMultiply: number = 1;
  public cheeseMultiply: number = 1.5;
  public chocolateMultiply: number = 2.5;
  public factoryBoostStack: number = 11;
  public counterWithoutCollector: number = 0;

  public world = world.bind(this);
  public drag = drag.bind(this);
  public collisions = collisions.bind(this);
  public interval = interval.bind(this);
  public click = click.bind(this);
  public clickTerritory = clickTerritory.bind(this);
  public teleportation = teleportation.bind(this);
  public currentTerritory = currentTerritory.bind(this);
  public confirmExchangeTerritory = confirmExchangeTerritory.bind(this);
  public installTerritory = installTerritory.bind(this);
  public deleteTerritoriesLocks = deleteTerritoriesLocks.bind(this);
  public repositoryAnimation = repositoryAnimation.bind(this);
  public balance = balance.bind(this);
  public convertDiamonds = convertDiamonds.bind(this);
  public convertMoney = convertMoney.bind(this);
  public exchange = exchange.bind(this);
  public cowPrice = cowPrice.bind(this);
  public checkMerging = checkMerging.bind(this);
  public cancelMerging = cancelMerging.bind(this);
  public buyCow = buyCow.bind(this);
  public collectMilk = collectMilk.bind(this);
  public sellMilk = sellMilk.bind(this);
  public confirmExpelCow = confirmExpelCow.bind(this);
  public expelCow = expelCow.bind(this);
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
  public takeDiamondCow = takeDiamondCow.bind(this);
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
  public dragCowMerging = dragCowMerging.bind(this);
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
  public animations = animations.bind(this);
  public findFreeTerritory = findFreeTerritory.bind(this);
  public showImproveFactory = showImproveFactory.bind(this);
  public showFactoryBoost = showFactoryBoost.bind(this);
  public logAmplitudeEvent = logAmplitudeEvent.bind(this);
  public logAmplitudeRevenue = logAmplitudeRevenue.bind(this);  
  public farmBalance = farmBalance.bind(this);
  public autoporgressCollectorTime = autoporgressCollectorTime.bind(this);
  public intervalPorgressCollectorTime = intervalPorgressCollectorTime.bind(this);
  public sheepIntervalProgress = sheepIntervalProgress.bind(this);
  public sheepCollectorProgress = sheepCollectorProgress.bind(this);
  public chickenCollectorProgress = chickenCollectorProgress.bind(this);
  public chickenIntervalProgress = chickenIntervalProgress.bind(this);
  public updateProfileNative = updateProfileNative.bind(this);
  public intervalCollectorTutorial = intervalCollectorTutorial.bind(this);
  public showFeedBoostSpeechBubble = showFeedBoostSpeechBubble.bind(this);

  public init(state: Istate): void {

    this.autoprogressTimer = Math.round(new Date().getTime() / 1000);
    this.autoSaveTimer = 0;
    this.state = state;
    this.alarm = false;
    this.collectorTimer = null;
    this.settings = state.cowSettings;
    this.caveIconsTimer = 0;
    this.counterWithoutCollector = 0;
    console.log('Cow');
    
    this.autoprogress(true);
  }


  public create(): void {
    // сторим мир
    this.world();

    // перетаскивание
    this.drag();

    // коллизии
    this.collisions();

    // интервальные функции
    this.interval();
    this.setCollector();

    this.animations();

    // let cursors = this.input.keyboard.createCursorKeys();
    // cursors.space.on('down', (): void => {
    //   // this.state.userCow.diamondAnimalTime = 0
    //   // this.state.newbieTime = 0
    //   // this.state.daily = Number(this.state.daily) + 1
    //   // this.state.user.takenReward = false;
    //   // this.state.dailyAwards = [false, false, false, false, false, false, false, false]

    //   // let modal: Imodal = {
    //   //   type: 9,
    //   // }

    //   // this.state.modal = modal;
    //   // this.scene.launch('Modal', this.state);

    //   // this.state.userSheep.feedBoostTimer = 10
    //   // this.scene.launch('Modal', this.state);
    //   // let tasks = this.partTasks();
    //   // for (let i in tasks) {
    //   //   tasks[i].done = 1;
    //   //   tasks[i].got_awarded = 1;
    //   // }
    // });
    
  }


  public update(): void {
    // анимация полных хранилищ
    this.repositoryAnimation();

  }


}

export default Cow;
