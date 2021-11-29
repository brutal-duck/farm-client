import Scrolling from '../../libs/Scrolling';
import world from './world';
import drag from './drag';
import interval from './interval';
import autoprogress from '../../general/autoprogress';
import autosave from '../../general/autosave';
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
  random,
  randomString,
  getRandomBool,
  spreadAnimals,
  getEventRaiting,
  nextDayTimer,
  farmBalance,
  autoporgressCollectorTime,
  sendSocialEvent,
  sendAppEventVk,
  yandexAuth,
  playSoundOnce,
  setPlatformStorage,
  getPlatformStorage,
  openConvertorForClan,
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
  tryClanTask,
  getTaskData,
  checkAnimalTask,
  checkDoneTasks
} from '../../general/tasks';
import {
  currentTerritory,
  findFreeTerritory,
  deleteTerritoriesLocks,
} from '../../general/territories';
import { animations } from './animations';
import {
  teleportation,
  checkMerging,
  cancelMerging,
  buyCow,
  collectMilk,
  sellMilk,
  confirmExpelCow,
  dragCowMerging
} from './cow';
import {
  balance,
  cowPrice,
  maxBreedForBuy,
  takeDiamondCow,
  buildBorders,
  collisions,
  showImproveFactory,
  showFactoryBoost,
  showConfirmSellMilk,
} from './basic';
import { 
  showTutorial,
  doneTutor_0,
  doneTutor_10,
  doneTutor_20,
  doneTutor_30,
  doneTutor_40,
} from './tutorial';
import setCollector, { updateCollector } from './collector';
import { showEventTutorial, doneEventTutor_0 } from '../Event/Unicorns/tutorial';
import CowGroup from '../../components/AnimalGroup/CowGroup';
import LocalStorage from './../../libs/LocalStorage';
import {
  sheepIntervalProgress,
  sheepCollectorProgress,
  chickenCollectorProgress,
  chickenIntervalProgress,
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
  public spaceCount: number = 0;
  public feedBoostRemaindTimer: number = 0;
  public ads: Ads;
  public speedCollectorTimer: number = 0;
  public achievement: Achievement;
  public collectorCD: number;
  public collectorIsReady: boolean;

  public world = world.bind(this);
  public drag = drag.bind(this);
  public collisions = collisions.bind(this);
  public interval = interval.bind(this);
  public click = click.bind(this);
  public clickTerritory = clickTerritory.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public teleportation = teleportation.bind(this);
  public currentTerritory = currentTerritory.bind(this);
  public confirmExchangeTerritory = confirmExchangeTerritory.bind(this);
  public deleteTerritoriesLocks = deleteTerritoriesLocks.bind(this);
  public balance = balance.bind(this);
  public convertDiamonds = convertDiamonds.bind(this);
  public convertMoney = convertMoney.bind(this);
  public exchange = exchange.bind(this);
  public cowPrice = cowPrice.bind(this);
  public animalPrice = cowPrice.bind(this);
  public checkMerging = checkMerging.bind(this);
  public cancelMerging = cancelMerging.bind(this);
  public buyCow = buyCow.bind(this);
  public buyAnimal = buyCow.bind(this);
  public collectMilk = collectMilk.bind(this);
  public sellMilk = sellMilk.bind(this);
  public confirmExpelCow = confirmExpelCow.bind(this);
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
  public takeDiamondCow = takeDiamondCow.bind(this);
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
  public autoprogress = autoprogress.bind(this);
  public dailyAward = dailyAward.bind(this);
  public logout = logout.bind(this);
  public onlineStatus = onlineStatus.bind(this);
  public checkDoneTasks = checkDoneTasks.bind(this);
  public takeNewbieAward = takeNewbieAward.bind(this);
  public getNewbieAward = getNewbieAward.bind(this);
  public dragCowMerging = dragCowMerging.bind(this);
  // public findAd = findAd.bind(this);
  // public watchAd = watchAd.bind(this);
  // public adReward = adReward.bind(this);
  // public VKOnAdsReady = VKOnAdsReady.bind(this);
  // public VKNoAds = VKNoAds.bind(this);
  public showDonate = showDonate.bind(this);
  public takeDonate = takeDonate.bind(this);
  public setCollector = setCollector.bind(this);
  public showImproveCollector = showImproveCollector.bind(this);
  public improveCollector = improveCollector.bind(this);
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
  public farmBalance = farmBalance.bind(this);
  public autoporgressCollectorTime = autoporgressCollectorTime.bind(this);
  public intervalPorgressCollectorTime = intervalPorgressCollectorTime.bind(this);
  public sheepIntervalProgress = sheepIntervalProgress.bind(this);
  public sheepCollectorProgress = sheepCollectorProgress.bind(this);
  public chickenCollectorProgress = chickenCollectorProgress.bind(this);
  public chickenIntervalProgress = chickenIntervalProgress.bind(this);
  public updateProfileNotification = updateProfileNotification.bind(this);
  public intervalCollectorTutorial = intervalCollectorTutorial.bind(this);
  public showFeedBoostSpeechBubble = showFeedBoostSpeechBubble.bind(this);
  public showConfirmSellMilk = showConfirmSellMilk.bind(this);
  public progressTerritoryCooldown = progressTerritoryCooldown.bind(this);
  public yandexAuth = yandexAuth.bind(this);
  public playSoundOnce = playSoundOnce.bind(this);
  public setPlatformStorage = setPlatformStorage.bind(this);
  public getPlatformStorage = getPlatformStorage.bind(this);
  private openConvertorForClan = openConvertorForClan.bind(this);
  public speedCheckCollector = speedCheckCollector.bind(this);
  public updateCollector: (delta: number) => void = updateCollector.bind(this);
  
  public init(state: Istate): void {
    this.autoprogressTimer = Math.round(new Date().getTime() / 1000);
    this.autoSaveTimer = 0;
    this.state = state;
    this.state.userCow.part = this.state.userCow.part || 1; 
    this.alarm = false;
    this.collectorTimer = null;
    this.settings = state.cowSettings;
    this.caveIconsTimer = 0;
    this.counterWithoutCollector = 0;
    this.ads = new Ads(this);
    this.achievement = new Achievement(this);
    this.autoprogress(true);
    if (Utils.checkTestB(this.state)) {
      const speed = this.state.cowSettings.partSettings[this.state.userCow.collectorLevel - 1].collector.speed;
      this.collectorCD = Math.round(1000 / speed);
      this.collectorIsReady = false;
    }
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
    if (!Utils.checkTestB(this.state)) this.setCollector();

    this.animations();
    this.openConvertorForClan();
    this.ads.showInterstitialAd();

    // Заменить на нормальное открытие
    if (!LocalStorage.get('openCow')) {
      LocalStorage.set('openCow', 'true');
      sendSocialEvent(this.state, 3, 100);
      sendAppEventVk(this.state, 4, 100);
    }

    this.input.keyboard.createCursorKeys().space.on('down', (): void => {
      this.state.offlineTime = 60 * 60
      this.autoprogress()
    });
    
  }

  public update(time: number, delta: number): void {
    if (Utils.checkTestB(this.state)) this.updateCollector(delta);

  }
}

export default Cow;
