import Scrolling from '../../libs/Scrolling';
import collisions from '../../general/collisions';
import world from './world';
import drag from './drag';
import sheepBrain from './sheepBrain';
import interval from './interval';
import autoprogress from '../../general/autoprogress';
import autosave from '../../general/autosave';
import { FAPI } from '../../libs/Fapi.js';
import {  
  improveCollector, 
  createBoostAnimal,   
  freeCollector,
  buyCollector,
 } from '../../general/boosts';
import {
  dragSheep,
} from '../../general/animations';
import {
  click,
  clickTerritory,
  clickModalBtn,
} from '../../general/clicks';
import {
  logout,
  convertDiamonds,
  convertMoney,
  exchange,
  donePart,
  pickUpTaskReward,
  onlineStatus,
  getNewbieAward,
  takeDonate,
  getRandomBool,
  spreadAnimals, 
  getEventRaiting,
  nextDayTimer,
  autoporgressCollectorTime,
  remainderSellResource,
  farmBalance,
  randomString,
  yandexAuth,
  playSoundOnce,
  setPlatformStorage,
  getPlatformStorage,
  openConvertorForClan,
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
  startHerdBoost,
  openEmailWindow
} from '../../general/modal';
import {
  partTasks,
  tryTask,
  tryClanTask,
  getTaskData,
  checkAnimalTask,
  checkDoneTasks,
} from '../../general/tasks';
import {
  currentTerritory,
  deleteTerritoriesLocks,
  buildBorders,
  findFreeTerritory,
} from '../../general/territories';
import { animations } from './animations';
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
  confirmExpelSheep,
  woolSprite,
  dragSheepMerging
} from './sheep';
import {
  balance,
  checkSheepBalance,
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
import setCollector, { updateCollector } from './collector';
import { showEventTutorial, doneEventTutor_0 } from './../Event/Unicorns/tutorial';
import {
  chickenIntervalProgress,
  chickenCollectorProgress,
  cowCollectorProgress,
  cowFactoryProgress,
  cowIntervalProgress,
  updateProfileNotification,
  intervalPorgressCollectorTime,
  intervalCollectorTutorial,
  showFeedBoostSpeechBubble,
  progressTerritoryCooldown,
  speedCheckCollector,
} from '../../general/interval';
import Ads from '../../components/Utils/Ads';
import Achievement from './../../components/Utils/Achievement';
import Utils from './../../libs/Utils';
import SheepTerritory from '../../components/Territories/SheepTerritory';
import SpeechBubble from './../../components/animations/SpeechBuble';

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
  public arrow: Phaser.GameObjects.Sprite; // стрелки
  public woolPB_bg: Phaser.GameObjects.Graphics; // прогресс-бар для тутора
  public woolPB_lineBg: Phaser.GameObjects.Graphics; // прогресс-бар для тутора
  public woolPB_progress: Phaser.GameObjects.Graphics; // прогресс-бар для тутора
  public woolPB_show: Boolean; // прогресс-бар для тутора
  public showMergPointer: boolean; // показ пальца с перетаскиванием овец для тутора
  public mergPointer: any; // спрайт пальца с перетаскиванием
  public counterWithoutCollector: number;
  public dragScroll: number; // позиция скролла при перетаскивании
  public collectorTimer: Phaser.Time.TimerEvent; // интервал подстригателя
  public debugLog: boolean; // метка для отлова ошибок
  public herdBoostLvl: number = 5; // уровень старта буста стадо
  public feedBoostMultiplier: number = 2; // множитель для буста комбикорм
  public feedBoostLvl: number = 6; // уровень старта буста комбикорм
  public feedBoostStack: number = 11; // максимальный стек часов
  public dailyStartCheck: boolean = true; // запущено ли открытие окна daily
  public remaindSellTimer: number = 0;
  public feedBoostRemaindTimer: number = 0;
  public speedCollectorTimer: number = 30;
  public ads: Ads;
  public achievement: Achievement;
  public collectorCD: number;
  public collectorIsReady: boolean;
  public activeBubble: SpeechBubble;

  public readonly moneyTasks: { id: number, money: number }[] = [
    {
      id: 127,
      money: 3000
    },
    {
      id: 4,
      money: 4000
    }
  ];

  public world: () => void = world.bind(this);
  public drag: () => void = drag.bind(this);
  public collisions: () => void = collisions.bind(this);
  public sheepBrain: () => void = sheepBrain.bind(this);
  public interval: () => void = interval.bind(this);
  public click: (object: any, action: () => void, maxMoveCounter: number) => void = click.bind(this);
  public clickTerritory: (object: any, action: () => void) => void = clickTerritory.bind(this);
  public clickModalBtn: (arr: any, action: () => void) => void = clickModalBtn.bind(this);
  public animations: () => void = animations.bind(this);
  public teleportation: (sheep: any) => void = teleportation.bind(this);
  public reverse: (sheep: any) => void = reverse.bind(this);
  public aim = aim.bind(this);
  public getSheep = getSheep.bind(this);
  public currentTerritory: (x: number, y: number) => SheepTerritory = currentTerritory.bind(this);
  public confirmExchangeTerritory: (type: number) => void = confirmExchangeTerritory.bind(this);
  public deleteTerritoriesLocks: () => void = deleteTerritoriesLocks.bind(this);
  public balance: () => Ibalance = balance.bind(this);
  public checkSheepBalance: (animalBreed: number) => { pasture: boolean, water: boolean } = checkSheepBalance.bind(this);
  public convertDiamonds: (diamonds: number) => number = convertDiamonds.bind(this);
  public convertMoney: (money: number) => number = convertMoney.bind(this);
  public exchange: (ad?: boolean) => void = exchange.bind(this);
  public sheepPrice = sheepPrice.bind(this);
  public animalPrice = sheepPrice.bind(this);
  public checkMerging = checkMerging.bind(this);
  public cancelMerging = cancelMerging.bind(this);
  public buySheep = buySheep.bind(this);
  public buyAnimal = buySheep.bind(this);
  public collectWool = collectWool.bind(this);
  public sellWool = sellWool.bind(this);
  public confirmExpelSheep = confirmExpelSheep.bind(this);
  public woolSprite = woolSprite.bind(this);
  public showBank = showBank.bind(this);
  public freeCollector = freeCollector.bind(this);
  public buyCollector = buyCollector.bind(this);
  public nextPart = nextPart.bind(this);
  public donePart = donePart.bind(this);
  public maxBreedForBuy = maxBreedForBuy.bind(this);
  public partTasks = partTasks.bind(this);
  public pickUpTaskReward = pickUpTaskReward.bind(this);
  public tryTask = tryTask.bind(this);
  public tryClanTask = tryClanTask.bind(this);
  public getTaskData = getTaskData.bind(this);
  public takeDiamondSheep = takeDiamondSheep.bind(this);
  public checkAnimalTask = checkAnimalTask.bind(this);
  public showTasks = showTasks.bind(this);
  public messageIsSent = messageIsSent.bind(this);
  public autosave = autosave.bind(this);
  public buildBorders = buildBorders.bind(this);
  public showTutorial = showTutorial.bind(this);
  public doneTutor_0: () => void = doneTutor_0.bind(this);
  public doneTutor_10: () => void = doneTutor_10.bind(this);
  public doneTutor_20: () => void = doneTutor_20.bind(this);
  public doneTutor_30: () => void = doneTutor_30.bind(this);
  public doneTutor_40: () => void = doneTutor_40.bind(this);
  public doneTutor_50: () => void = doneTutor_50.bind(this);
  public doneTutor_60: () => void = doneTutor_60.bind(this);
  public doneTutor_70: () => void = doneTutor_70.bind(this);
  public doneTutor_75: () => void = doneTutor_75.bind(this);
  public doneTutor_80: () => void = doneTutor_80.bind(this);
  public doneTutor_90: () => void = doneTutor_90.bind(this);
  public doneTutor_100: () => void = doneTutor_100.bind(this);
  public progressTutor_20: () => void = progressTutor_20.bind(this);
  public progressTutor_30: () => void = progressTutor_30.bind(this);
  public progressTutor_40: () => void = progressTutor_40.bind(this);
  public progressTutor_70: () => void = progressTutor_70.bind(this);
  public progressTutor_80: () => void = progressTutor_80.bind(this);
  public progressTutor_90: () => void = progressTutor_90.bind(this);
  public doneTutorCave1: () => void = doneTutorCave1.bind(this);
  public doneTutorCave2: () => void = doneTutorCave2.bind(this);
  public skipTutorial: () => void = skipTutorial.bind(this);
  public autoprogress: (load?: boolean) => void = autoprogress.bind(this);
  public dailyAward = dailyAward.bind(this);
  public logout = logout.bind(this);
  public onlineStatus = onlineStatus.bind(this);
  public dragSheep = dragSheep.bind(this);
  public checkDoneTasks = checkDoneTasks.bind(this);
  public collectorTutorial = collectorTutorial.bind(this);
  public dragSheepMerging = dragSheepMerging.bind(this);
  public takeNewbieAward = takeNewbieAward.bind(this);
  public getNewbieAward = getNewbieAward.bind(this);
  public showDonate = showDonate.bind(this);
  public takeDonate = takeDonate.bind(this);
  public setCollector = setCollector.bind(this);
  public showImproveCollector = showImproveCollector.bind(this);
  public improveCollector = improveCollector.bind(this);
  public createBoostAnimal = createBoostAnimal.bind(this);
  public startHerdBoost = startHerdBoost.bind(this);
  public getRandomBool = getRandomBool.bind(this);
  public spreadAnimals = spreadAnimals.bind(this);
  public getEventRaiting = getEventRaiting.bind(this);
  public showEventTutorial = showEventTutorial.bind(this);
  public doneEventTutor_0 = doneEventTutor_0.bind(this);
  public nextDayTimer = nextDayTimer.bind(this);
  public intervalPorgressCollectorTime = intervalPorgressCollectorTime.bind(this);
  public autoporgressCollectorTime = autoporgressCollectorTime.bind(this);
  public openEmailWindow = openEmailWindow.bind(this);
  public remainderSellResource = remainderSellResource.bind(this);
  public findFreeTerritory = findFreeTerritory.bind(this);
  public farmBalance = farmBalance.bind(this);
  public randomString = randomString.bind(this);
  public chickenIntervalProgress = chickenIntervalProgress.bind(this);
  public chickenCollectorProgress = chickenCollectorProgress.bind(this);
  public cowCollectorProgress = cowCollectorProgress.bind(this);
  public cowFactoryProgress = cowFactoryProgress.bind(this);
  public cowIntervalProgress = cowIntervalProgress.bind(this);
  public updateProfileNotification = updateProfileNotification.bind(this);
  public intervalCollectorTutorial = intervalCollectorTutorial.bind(this);
  public showFeedBoostSpeechBubble = showFeedBoostSpeechBubble.bind(this);
  public progressTerritoryCooldown = progressTerritoryCooldown.bind(this);
  public yandexAuth: () => Promise<void>  = yandexAuth.bind(this);
  public playSoundOnce: (soundName: string) => void = playSoundOnce.bind(this);
  public setPlatformStorage: (key: string, value: any) => void = setPlatformStorage.bind(this);
  public getPlatformStorage: (key: string) => Promise<any> = getPlatformStorage.bind(this);
  private openConvertorForClan: () => void = openConvertorForClan.bind(this);
  public speedCheckCollector: () => void = speedCheckCollector.bind(this);
  public updateCollector: (delta: number) => void = updateCollector.bind(this);

  public init(state: Istate): void {
    this.autoprogressTimer = Math.round(new Date().getTime() / 1000);
    this.autoSaveTimer = 0;
    this.state = state;
    this.alarm = false;
    this.settings = state.sheepSettings;
    this.showMergPointer = false;
    this.arrow = null;
    this.collectorTimer = null;
    this.counterWithoutCollector = 0;
    this.ads = new Ads(this)
    this.autoprogress(true);
    this.achievement = new Achievement(this);
    if (Utils.checkTestB(this.state)) {
      const speed = this.state.sheepSettings.partSettings[this.state.userSheep.collectorLevel - 1].collector.speed;
      this.collectorCD = Math.round(1000 / speed);
      this.collectorIsReady = false;
    }
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

    // интервальные функция
    this.interval();
    this.openConvertorForClan();
    this.ads.showInterstitialAd();

    if (!Utils.checkTestB(this.state)) this.setCollector();
    this.input.keyboard.createCursorKeys().space.on('down', (): void => {
      this.state.offlineTime = 60 * 60
      this.autoprogress()
      this.state.user.achievements.forEach(el => {
        el.progress = el.count;
      })
    });
  }


  public update(time: number, delta: number): void {
    // мозг овец
    this.sheepBrain();
    // перетаскивание овец
    this.dragSheep(true);

    if (Utils.checkTestB(this.state)) this.updateCollector(delta);
  }
}

export default Sheep;
