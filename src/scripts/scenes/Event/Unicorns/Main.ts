import Scrolling from '../../../libs/Scrolling';
import {
  click,
  clickTerritory,
  doubleClick,
} from '../../../general/clicks';
import {
  logout,
  onlineStatus,
  takeDonate,
  getEventRaiting,
  nextDayTimer,
  autoporgressCollectorTime,
  farmBalance,
  randomString,
  playSoundOnce,
  setPlatformStorage,
  getPlatformStorage,
} from '../../../general/basic';
import {
  confirmExchangeTerritory,
  messageIsSent,
  showBank,
  showDonate,
  showImproveCollector,
  startHerdBoost
} from '../../../general/modal';
import {
  findAd,
  watchAd,
  adReward,
  VKOnAdsReady,
  VKNoAds
} from '../../../general/ads';
import world from './world';
import { 
  maxBreedForBuy, 
  animalPrice, 
  getFreePosition, 
  convertDiamonds, 
  currentTerritory, 
  freeCollector, 
  buyCollector,
  convertMoney,
  improveCollector,
  exchange,
  createBoostAnimal,
  getFreeBoostPositions,
  tryTask,
} from './basic';
import { 
  buyAnimal, 
  getAnimal, 
  confirmExpelAnimal, 
  checkMerging, 
  reverse, 
  aim, 
  getResource, 
  collectResource, 
  getActiveAnimal,
} from './animals';
import drag  from './drag';
import { animalBrain, collisions } from './animalBrain';
import interval from './interval';
import { 
  deleteTerritoriesLocks, 
  buyTerritory, 
  buildBorders,
  buildFlowers, 
  buildConfetti
} from './territories';
import setCollector from './collector';
import autosave from '../../../general/autosave';
import { 
  flyAnimal, 
  teleportation, 
  updateTeleportation,
  dragEventAnimal, 
} from './animations';
import autoprogress from '../../../general/autoprogress';
import { 
  showEventTutorial, 
  doneEventTutor_10, 
  doneEventTutor_20, 
  doneEventTutor_30,
  doneEventTutor_40,
  doneEventTutor_50, 
  doneEventTutor_60, 
  doneEventTutor_70, 
  progressEventTutor_40,
  progressEventTutor_50
} from './tutorial';

import {
  sheepIntervalProgress,
  sheepCollectorProgress,
  chickenIntervalProgress,
  chickenCollectorProgress,
  cowIntervalProgress,
  cowCollectorProgress,
  cowFactoryProgress,
  intervalPorgressCollectorTime,
  progressTerritoryCooldown,
  updateProfileNotification
} from '../../../general/interval';
import Ads from '../../../components/Utils/Ads';
import { tryClanTask } from '../../../general/tasks';
import Achievement from './../../../components/Utils/Achievement';
class Unicorn extends Phaser.Scene {
  constructor() {
    super('Unicorn');
  }

  public state: Istate;
  public scrolling: Scrolling;
  public animals: Phaser.Physics.Arcade.Group;
  public territories: Phaser.Physics.Arcade.Group;
  public resources: Phaser.Physics.Arcade.Group;
  public bubble: Phaser.GameObjects.Graphics;
  public bubbleText: Phaser.GameObjects.Text;
  public topIndent: number = 140; // верхний отступ для блоков территорий
  public bottomIndent: number = 240; // нижний отступ мира (не считая нахлест)
  public height: number; // ширина-высота территории
  public alarm: boolean;
  public settings: IunicornSettings; // настройки
  public collector: number = 0; // время собирателя в секундах
  public collectorTakenTime: number = 0; // время на сколько брали собирателя
  public autoSaveTimer: number = 0; // таймер для автосохранения
  public autoprogressTimer: number; // таймер для автопрогресса
  public collectorTimer: Phaser.Time.TimerEvent; // интервал собирателя ресурсов
  public debugLog: boolean;
  public velocity: number = 100; 
  public maxCountResource: number = 30; // максимальное количество ресурсов
  public herdBoostLvl: number = 4;
  public feedBoostLvl: number = 5;
  public startCreateHerdBoostAnimal: boolean = false; // метка начала создания животных
  public feedBoostMultiplier: string = '2';
  public feedBoostStack: number = 11; // максимальный стек часов
  public mergTutor: number; // счетчик для повтора туториала про мерджинг
  public showMergPointer: boolean; // показ пальца с перетаскиванием овец для тутора
  public mergPointer: any; // спрайт пальца с перетаскиванием
  public scrollPoint: number;
  public ads: Ads;
  public achievement: Achievement;

  public collisions = collisions.bind(this);
  public click = click.bind(this);
  public clickTerritory = clickTerritory.bind(this);
  public currentTerritory = currentTerritory.bind(this);
  public confirmExchangeTerritory = confirmExchangeTerritory.bind(this);
  public convertDiamonds = convertDiamonds.bind(this);
  public exchange = exchange.bind(this);
  public showBank = showBank.bind(this);
  public freeCollector = freeCollector.bind(this);
  public buyCollector = buyCollector.bind(this);
  public messageIsSent = messageIsSent.bind(this);
  public buildBorders = buildBorders.bind(this);
  public logout = logout.bind(this);
  public onlineStatus = onlineStatus.bind(this);
  public findAd = findAd.bind(this);
  public watchAd = watchAd.bind(this);
  public adReward = adReward.bind(this);
  public VKOnAdsReady = VKOnAdsReady.bind(this);
  public VKNoAds = VKNoAds.bind(this);
  public showDonate = showDonate.bind(this);
  public takeDonate = takeDonate.bind(this);
  public showImproveCollector = showImproveCollector.bind(this);
  public improveCollector = improveCollector.bind(this);
  public createBoostAnimal = createBoostAnimal.bind(this);
  public startHerdBoost = startHerdBoost.bind(this);
  public world = world.bind(this);
  public maxBreedForBuy = maxBreedForBuy.bind(this);
  public buyAnimal = buyAnimal.bind(this);
  public getAnimal = getAnimal.bind(this);
  public animalPrice = animalPrice.bind(this);
  public tryClanTask = tryClanTask.bind(this);
  public getFreePosition = getFreePosition.bind(this);
  public drag = drag.bind(this);
  public confirmExpelAnimal = confirmExpelAnimal.bind(this);
  public checkMerging = checkMerging.bind(this);
  public teleportation = teleportation.bind(this);
  public animalBrain = animalBrain.bind(this);
  public reverse = reverse.bind(this);
  public aim = aim.bind(this);
  public getResource = getResource.bind(this);
  public interval = interval.bind(this);
  public collectResource = collectResource.bind(this);
  public deleteTerritoriesLocks = deleteTerritoriesLocks.bind(this);
  public buyTerritory = buyTerritory.bind(this);
  public setCollector = setCollector.bind(this);
  public convertMoney = convertMoney.bind(this);
  public getActiveAnimal = getActiveAnimal.bind(this);
  public autosave = autosave.bind(this);
  public flyAnimal = flyAnimal.bind(this);
  public updateTeleportation = updateTeleportation.bind(this);
  public getFreeBoostPositions = getFreeBoostPositions.bind(this);
  public tryTask = tryTask.bind(this);
  public buildFlowers = buildFlowers.bind(this);
  public buildConfetti = buildConfetti.bind(this);
  public autoprogress = autoprogress.bind(this);
  public getEventRaiting = getEventRaiting.bind(this);
  public doubleClick = doubleClick.bind(this);
  public showEventTutorial = showEventTutorial.bind(this);
  public doneEventTutor_10 = doneEventTutor_10.bind(this);
  public doneEventTutor_20 = doneEventTutor_20.bind(this);
  public doneEventTutor_30 = doneEventTutor_30.bind(this);
  public doneEventTutor_40 = doneEventTutor_40.bind(this);
  public doneEventTutor_50 = doneEventTutor_50.bind(this);
  public doneEventTutor_60 = doneEventTutor_60.bind(this);
  public doneEventTutor_70 = doneEventTutor_70.bind(this);
  public progressEventTutor_40 = progressEventTutor_40.bind(this);
  public progressEventTutor_50 = progressEventTutor_50.bind(this);
  public dragEventAnimal = dragEventAnimal.bind(this);
  public nextDayTimer = nextDayTimer.bind(this);
  public intervalPorgressCollectorTime = intervalPorgressCollectorTime.bind(this);
  public autoporgressCollectorTime = autoporgressCollectorTime.bind(this);
  public farmBalance = farmBalance.bind(this);
  public sheepIntervalProgress = sheepIntervalProgress.bind(this);
  public sheepCollectorProgress = sheepCollectorProgress.bind(this);
  public chickenIntervalProgress = chickenIntervalProgress.bind(this);
  public chickenCollectorProgress = chickenCollectorProgress.bind(this);
  public cowIntervalProgress = cowIntervalProgress.bind(this);
  public cowCollectorProgress = cowCollectorProgress.bind(this);
  public cowFactoryProgress = cowFactoryProgress.bind(this);
  public updateProfileNotification = updateProfileNotification.bind(this);
  public randomString = randomString.bind(this);
  public progressTerritoryCooldown = progressTerritoryCooldown.bind(this);
  public playSoundOnce = playSoundOnce.bind(this);
  public setPlatformStorage = setPlatformStorage.bind(this);
  public getPlatformStorage = getPlatformStorage.bind(this);

  public init(state: Istate): void {
    this.state = state;
    this.state.farm = 'Unicorn';
    this.collectorTimer = null;
    this.ads = new Ads(this);
    this.achievement = new Achievement(this);
    this.autoprogressTimer = null;
    if (this.state.userUnicorn.takenHerdBoost <= 0) this.state.userUnicorn.takenHerdBoost = 1;
  }


  public create(): void {
    this.world();
    this.drag();
    this.collisions();
    this.interval();
    this.setCollector();
    this.flyAnimal();
    this.getEventRaiting();
    this.ads.showInterstitialAd();
    // let cursors = this.input.keyboard.createCursorKeys();
    // cursors.space.on('down', (): void => {
    //   // this.state.user.diamonds = 100000;
    //   // let tasks = this.partTasks();
    //   // for (let i in tasks) {
    //   //   tasks[i].done = 1;
    //   //   tasks[i].got_awarded = 1;
    //   // }
    // });
  }


  public update(): void {
    this.animalBrain();
    this.updateTeleportation();  
    if (!this.scene.isActive('Tutorial')) this.dragEventAnimal(true);
    if (this.state.userUnicorn.tutorial === 30) {
      if (this.animals.children.entries.length > 1) {
        this.doneEventTutor_30();
      }
    }  

    if (this.state.userUnicorn.tutorial === 40) {
      if (this.state.userUnicorn.points >= 2) {
        this.doneEventTutor_40();
      }
    }
    
    if (this.state.userUnicorn.tutorial === 50 && !this.scene.isActive('Tutorial')) {
      this.animals.children.entries.forEach((animal) => {
        if (animal.data.values.active.data.values.working) this.doneEventTutor_50();
      });
    }
  }
}

export default Unicorn;
