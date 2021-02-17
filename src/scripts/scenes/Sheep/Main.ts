import Scrolling from '../../libs/Scrolling';
import collisions from '../../general/collisions';
import world from './world';
import drag from './drag';
import sheepBrain from './sheepBrain';
import interval from './interval';
import autoprogress from './autoprogress';
import autosave from './autosave';
import {
  genAnimations,
  firework250,
  cave,
  dragSheep,
  hearts,
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
  createBoostAnimal,
  getRandomBool,
  spreadAnimals
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
import { animations, repositoryAnimation, arrowsBehavior } from './animations';
import {
  teleportation,
  reverse,
  aim,
  getSheep,
  checkMerging,
  cancelMerging,
  buySheep,
  collectWool,
  sellWool,
  woolFly,
  confirmExpelSheep,
  expelSheep,
  woolSprite,
  dragSheepMerging
} from './sheep';
import { installTerritory } from './territories';
import { createSpeechBubble, mergingCloud, Arrows } from '../../elements';
import {
  balance,
  sheepPrice,
  maxBreedForBuy,
  takeDiamondSheep
} from './basic';
import {
  showTutorial,
  doneTutor_0,
  doneTutor_10,
  doneTutor_20,
  doneTutor_30,
  doneTutor_40,
  doneTutor_50,
  doneTutor_60,
  doneTutor_70,
  doneTutor_75,
  doneTutor_80,
  doneTutor_90,
  doneTutor_100,
  progressTutor_20,
  progressTutor_30,
  progressTutor_40,
  progressTutor_70,
  progressTutor_80,
  progressTutor_90,
  doneTutorCave1,
  doneTutorCave2,
  skipTutorial,
  collectorTutorial
} from './tutorial';
import {
  findAd,
  watchAd,
  adReward,
  VKOnAdsReady,
  VKNoAds
} from '../../general/ads';
import setCollector from './collector';

class Sheep extends Phaser.Scene {
  constructor() {
    super('Sheep');
  }
  
  public state: Istate;
  public scrolling: Scrolling;
  public sheep: Phaser.Physics.Arcade.Group;
  public territories: Phaser.Physics.Arcade.Group;
  public wool: Phaser.Physics.Arcade.Group;
  public bubble: Phaser.GameObjects.Graphics;
  public bubbleText: Phaser.GameObjects.Text;
  public velocity: number = 20; // дефолтное ускорение овец
  public topIndent: number = 240; // верхний отступ для блоков территорий
  public bottomIndent: number = 240; // нижний отступ мира (не считая нахлест)
  public height: number; // ширина-высота территории
  public alarm: boolean;
  public settings: IsheepSettings; // настройки
  public collector: number = 0; // время собирателя в секундах
  public collectorTakenTime: number = 0; // время на сколько брали собирателя
  public house: Phaser.GameObjects.Image;
  public autoSaveTimer: number; // таймер для автосохранения
  public mergTutor: number; // счетчик для повтора туториала про мерджинг
  public caveTutor: boolean; // метка туториала с кристаллической овцой
  public autoprogressTimer: number; // таймер для автопрогресса
  public takeRewardRegistration: boolean; // метка за сбор награды за регистрацию
  public arrows: Arrows; // стрелки
  public woolPB_bg: Phaser.GameObjects.Graphics; // прогресс-бар для тутора
  public woolPB_lineBg: Phaser.GameObjects.Graphics; // прогресс-бар для тутора
  public woolPB_progress: Phaser.GameObjects.Graphics; // прогресс-бар для тутора
  public woolPB_show: Boolean; // прогресс-бар для тутора
  public showMergPointer: boolean; // показ пальца с перетаскиванием овец для тутора
  public mergPointer: any; // спрайт пальца с перетаскиванием
  public counterWithoutCollector: number;
  public dragScroll: number; // позиция скролла при перетаскивании
  public caveIconsTimer: number; // таймер для анимации иконок на пещере
  public collectorTimer: Phaser.Time.TimerEvent; // интервал подстригателя
  public debugLog: boolean; // метка для отлова ошибок
  public herdBoostLvl: number = 5; // уровень старта буста стадо
  public feedBoostMultiplier: number = 2; // множитель для буста комбикорм
  public feedBoostLvl: number = 6; // уровень старта буста комбикорм
  public feedBoostStack: number = 11; // максимальный стек часов

  public world = world.bind(this);
  public drag = drag.bind(this);
  public collisions = collisions.bind(this);
  public sheepBrain = sheepBrain.bind(this);
  public interval = interval.bind(this);
  public click = click.bind(this);
  public clickTerritory = clickTerritory.bind(this);
  public animations = animations.bind(this);
  public genAnimations = genAnimations.bind(this);
  public firework250 = firework250.bind(this);
  public teleportation = teleportation.bind(this);
  public reverse = reverse.bind(this);
  public aim = aim.bind(this);
  public getSheep = getSheep.bind(this);
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
  public sheepPrice = sheepPrice.bind(this);
  public checkMerging = checkMerging.bind(this);
  public cancelMerging = cancelMerging.bind(this);
  public buySheep = buySheep.bind(this);
  public collectWool = collectWool.bind(this);
  public sellWool = sellWool.bind(this);
  public woolFly = woolFly.bind(this);
  public confirmExpelSheep = confirmExpelSheep.bind(this);
  public expelSheep = expelSheep.bind(this);
  public woolSprite = woolSprite.bind(this);
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
  public takeDiamondSheep = takeDiamondSheep.bind(this);
  public checkAnimalTask = checkAnimalTask.bind(this);
  public showTasks = showTasks.bind(this);
  public messageIsSent = messageIsSent.bind(this);
  public autosave = autosave.bind(this);
  public buildBorders = buildBorders.bind(this);
  public showTutorial = showTutorial.bind(this);
  public doneTutor_0 = doneTutor_0.bind(this);
  public doneTutor_10 = doneTutor_10.bind(this);
  public doneTutor_20 = doneTutor_20.bind(this);
  public doneTutor_30 = doneTutor_30.bind(this);
  public doneTutor_40 = doneTutor_40.bind(this);
  public doneTutor_50 = doneTutor_50.bind(this);
  public doneTutor_60 = doneTutor_60.bind(this);
  public doneTutor_70 = doneTutor_70.bind(this);
  public doneTutor_75 = doneTutor_75.bind(this);
  public doneTutor_80 = doneTutor_80.bind(this);
  public doneTutor_90 = doneTutor_90.bind(this);
  public doneTutor_100 = doneTutor_100.bind(this);
  public progressTutor_20 = progressTutor_20.bind(this);
  public progressTutor_30 = progressTutor_30.bind(this);
  public progressTutor_40 = progressTutor_40.bind(this);
  public progressTutor_70 = progressTutor_70.bind(this);
  public progressTutor_80 = progressTutor_80.bind(this);
  public progressTutor_90 = progressTutor_90.bind(this);
  public doneTutorCave1 = doneTutorCave1.bind(this);
  public doneTutorCave2 = doneTutorCave2.bind(this);
  public skipTutorial = skipTutorial.bind(this);
  public autoprogress = autoprogress.bind(this);
  public caveTimer = caveTimer.bind(this);
  public dailyAward = dailyAward.bind(this);
  public logout = logout.bind(this);
  public onlineStatus = onlineStatus.bind(this);
  public dragSheep = dragSheep.bind(this);
  public hearts = hearts.bind(this);
  public arrowsBehavior = arrowsBehavior.bind(this);
  public checkDoneTasks = checkDoneTasks.bind(this);
  public collectorTutorial = collectorTutorial.bind(this);
  public buyNextFarm = buyNextFarm.bind(this);
  public dragSheepMerging = dragSheepMerging.bind(this);
  public takeNewbieAward = takeNewbieAward.bind(this);
  public getNewbieAward = getNewbieAward.bind(this);
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
  public getRandomBool = getRandomBool.bind(this);
  public spreadAnimals = spreadAnimals.bind(this);

  public init(state: Istate): void {

    this.autoprogressTimer = Math.round(new Date().getTime() / 1000);
    this.autoSaveTimer = 0;
    this.state = state;
    this.alarm = false;
    this.settings = state.sheepSettings;
    this.showMergPointer = false;
    this.arrows = null;
    this.collectorTimer = null;
    this.counterWithoutCollector = 0;
    this.caveIconsTimer = 0;
    console.log('Sheep');
    
  }


  public create(): void {

    // анимации
    this.genAnimations();
    this.animations();
    
    // сторим мир
    this.world();

    // перетаскивание
    this.drag();

    // коллизии
    this.collisions();

    // интервальные функция
    this.interval();
    this.setCollector();

    // let cursors = this.input.keyboard.createCursorKeys();
    // cursors.space.on('down', (): void => {
    //   this.openEmailWindow()
    //   // this.state.userSheep.feedBoostTimer = 10
    //   // this.state.user.diamonds = 10000000;
    //   // let tasks = this.partTasks();
    //   // for (let i in tasks) {
    //   //   tasks[i].done = 1;
    //   //   tasks[i].got_awarded = 1;
    //   // }
    // });

  }


  public update(): void {

    // мозг овец
    this.sheepBrain();

    // полет шерсти в хранилище
    this.woolFly();

    // анимация полных хранилищ
    this.repositoryAnimation();

    // анимация пещеры
    this.cave();

    // перетаскивание овец
    this.dragSheep(true);

    // укзывающие стрелки
    this.arrowsBehavior();
  }

  public openEmailWindow(): void {

    let modal: Imodal = {
      type: 1,
      sysType: 13
    }
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);

  }


}

export default Sheep;
