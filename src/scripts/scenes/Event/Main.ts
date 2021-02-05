import Scrolling from '../../libs/Scrolling';
import {
  genAnimations,
  firework250,
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
  onlineStatus,
  takeDonate,
  improveCollector,
  debug, 
  createBoostAnimal
} from '../../general/basic';
import {
  confirmExchangeTerritory,
  messageIsSent,
  showBank,
  showDonate,
  showImproveCollector,
  startHerdBoost
} from '../../general/modal';
import {
  buildBorders,
  checkExchangeRepository,
} from '../../general/territories';
import { createSpeechBubble, mergingCloud } from '../../elements';
import {
  findAd,
  watchAd,
  adReward,
  VKOnAdsReady,
  VKNoAds
} from '../../general/ads';
import world from './world';
import { maxBreedForBuy, animalPrice, getFreePosition, convertEventMoney, currentTerritory } from './basic';
import { 
  buyAnimal, 
  getAnimal, 
  confirmExpelAnimal, 
  checkMerging, 
  teleportation, 
  reverse, 
  aim, 
  getResource, 
  collectResource, 
  resourcesFly,
  expelAnimal, 
} from './animals';
import drag  from './drag';
import { animalBrain, collisions } from './animalBrain';
import interval from './interval';
import { deleteTerritoriesLocks, buyTerritory } from './territories';
import setCollector from './collector';
class Event extends Phaser.Scene {
  constructor() {
    super('Event');
  }

  public state: Istate;
  public scrolling: Scrolling;
  public animals: Phaser.Physics.Arcade.Group;
  public territories: Phaser.Physics.Arcade.Group;
  public resources: Phaser.Physics.Arcade.Group;
  public bubble: Phaser.GameObjects.Graphics;;
  public bubbleText: Phaser.GameObjects.Text;
  public topIndent: number = 240; // верхний отступ для блоков территорий
  public bottomIndent: number = 240; // нижний отступ мира (не считая нахлест)
  public height: number; // ширина-высота территории
  public alarm: boolean;
  public settings: IeventSettings; // настройки
  public collector: number = 0; // время собирателя в секундах
  public collectorTakenTime: number = 0; // время на сколько брали собирателя
  public autoSaveTimer: number; // таймер для автосохранения
  public autoprogressTimer: number; // таймер для автопрогресса
  public collectorTimer: Phaser.Time.TimerEvent; // интервал собирателя ресурсов
  public debugLog: boolean;
  public velocity: number = 100; 
  public maxCountResource: number = 30; // максимальное количество ресурсов

  public collisions = collisions.bind(this);
  public click = click.bind(this);
  public clickTerritory = clickTerritory.bind(this);
  public firework250 = firework250.bind(this);
  public genAnimations = genAnimations.bind(this);
  public currentTerritory = currentTerritory.bind(this);
  public confirmExchangeTerritory = confirmExchangeTerritory.bind(this);
  public checkExchangeRepository = checkExchangeRepository.bind(this);
  public convertDiamonds = convertDiamonds.bind(this);
  public convertEventMoney = convertEventMoney.bind(this);
  public exchange = exchange.bind(this);
  public createSpeechBubble = createSpeechBubble.bind(this);
  public mergingCloud = mergingCloud.bind(this);
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
  public debug = debug.bind(this);
  public createBoostAnimal = createBoostAnimal.bind(this);
  public startHerdBoost = startHerdBoost.bind(this);
  public world = world.bind(this);
  public maxBreedForBuy = maxBreedForBuy.bind(this);
  public buyAnimal = buyAnimal.bind(this);
  public getAnimal = getAnimal.bind(this);
  public animalPrice = animalPrice.bind(this);
  public getFreePosition = getFreePosition.bind(this);
  public drag = drag.bind(this);
  public confirmExpelAnimal = confirmExpelAnimal.bind(this);
  public checkMerging = checkMerging.bind(this);
  public teleportation = teleportation.bind(this);
  public animalBrain = animalBrain.bind(this);
  public collisions = collisions.bind(this);
  public reverse = reverse.bind(this);
  public aim = aim.bind(this);
  public getResource = getResource.bind(this);
  public interval = interval.bind(this);
  public collectResource = collectResource.bind(this);
  public resourcesFly = resourcesFly.bind(this);
  public deleteTerritoriesLocks = deleteTerritoriesLocks.bind(this);
  public buyTerritory = buyTerritory.bind(this);
  public expelAnimal = expelAnimal.bind(this);
  public setCollector = setCollector.bind(this);

  public init(state: Istate): void {

    this.state = state;

    console.log('Event');
    this.state.farm = 'Event';
    this.collectorTimer = null;
    
  }


  public create(): void {
    this.world();
    this.drag();
    this.collisions();
    this.interval();
    this.setCollector();
    // анимации
    // let cursors = this.input.keyboard.createCursorKeys();
    // cursors.space.on('down', (): void => {

    //   // let modal: Imodal = {
    //   //   type: 8,
    //   // }
    //   // this.state.modal = modal;
    //   // this.scene.launch('Modal', this.state);

    //   // let tasks = this.partTasks();
    //   // for (let i in tasks) {
    //   //   tasks[i].done = 1;
    //   //   tasks[i].got_awarded = 1;
    //   // }
    // });

    

  }


  public update(): void {
    this.animalBrain();
    this.resourcesFly();
  }


}

export default Event;
