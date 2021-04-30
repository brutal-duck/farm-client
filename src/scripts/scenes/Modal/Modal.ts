import {
  shortNum,
  shortTime,
  getStatusSettings,
  loadingModal,
} from '../../general/basic';
import {
  click,
  clickButton,
  clickModalBtn,
  clickShopBtn,
} from '../../general/clicks';
import {
  systemWindow,
  chickenTerritory,
  cowTerritory,
  sheepTerritory,
  resizeWindow,
  resizeWindowTop,
  eventTerritory
} from './system';
import {
  chickenFair,
  chicken,
  chickenPasture,
  chickenWater,
  boughtChickenLand,
  buyChickenTerritory,
  chickenConvertor,
  confirmChickenExchangeTerritory,
  chickenEggsRepository,
  confirmExpelChicken,
  diamondChickenAd,
  chickenEggRepositoryExchange,
} from './chicken';
import {
  cowFair,
  cow,
  cowPasture,
  cowWater,
  boughtCowLand,
  buyCowTerritory,
  cowConvertor,
  confirmCowExchangeTerritory,
  cowMilkRepository,
  confirmExpelCow,
  diamondCowAd,
  cowMilkRepositoryExchange,
  cowFactory,
  updateFactoryModal,
  improveFactoryWindow,
  factoryBoostWindow
} from './cow';
import {
  confirmExpelAnimal,
  eventConvertor,
  buyEventTerritory,
  improveCollectorEvent,
  herdBoostEventWindow,
  eventDrag,
  eventProgress,
  eventRatings,
  endEventModal,
  updateImproveCollectorEvent
} from './event';
import {
  sheepFair,
  sheep,
  sheepPasture,
  sheepWater,
  boughtSheepLand,
  buySheepTerritory,
  sheepConvertor,
  confirmSheepExchangeTerritory,
  sheepWoolRepository,
  confirmExpelSheep,
  diamondSheepAd,
  sheepWoolRepositoryExchange,
} from './sheep';
import {
  tasks,
  tasksWindow,
  resizeTasksWindow
} from './tasks';
import daily from './daily';
import dailyNewbie from './dailyNewbie';
import nextChapter from './nextChapter';
import donate from './donate';
import { bigButton, repositoryBtn, shopButton } from '../../elements';
import { 
  changeNickname,
  addEmail,
  support,
  registration,
  profileWindow,
  improveCollector,
  updateImproveCollector
} from '../../general/modal';
  // буст "Стадо"
import { herdBoostWindow, getRandomAnimal, getRandomStartPosition } from './herdBoost';
import { createChatBars } from './Chat/elements';
import { improveCollectorAnim, openModal } from '../../general/animations';
import { clickTaskBoard } from '../../general/tasks';
import typePreload from './typePreload';
import Territory from './../../components/Territories/Territory';

class Modal extends Phaser.Scene {
  constructor() {
    super('Modal');
  }
  
  public state: Istate;
  public textHeader: Phaser.GameObjects.Text;
  public header: Phaser.GameObjects.Image;
  public close: Phaser.GameObjects.Sprite;
  public bottom: Phaser.GameObjects.Image;
  public body: Phaser.GameObjects.Image;
  public progressBar: Phaser.GameObjects.TileSprite;
  public progressText: Phaser.GameObjects.Text;
  public progressButton: any;
  public feedBoostText: Phaser.GameObjects.Text;
  public caveTimer: Phaser.GameObjects.Text;
  public animalForBoost: Phaser.Physics.Arcade.Group;
  public mergingArray: any[];
  public mainInput: HTMLInputElement;
  public secondInput: HTMLInputElement;
  public enterKey: Phaser.Input.Keyboard.Key;
  public chatHeight: number = 0;
  public chatBG: Phaser.GameObjects.Sprite;
  public line: Phaser.GameObjects.Text;
  public playerPlaceAndName: Phaser.GameObjects.Text;
  public playerScore: Phaser.GameObjects.Text;
  public eventRatingsNames: Phaser.GameObjects.Text[];
  public eventRatingsScores: Phaser.GameObjects.Text[];
  public eventLeftTime: Phaser.GameObjects.Text;
  public timerNewbieAward: Phaser.GameObjects.Text;
  public factoryProductText: Phaser.GameObjects.Text;
  public factoryProgressBar: Phaser.GameObjects.TileSprite;
  public factorySellButton: any;
  public clabberMoneyText: Phaser.GameObjects.Text;
  public pasteurizedMilkMoneyText: Phaser.GameObjects.Text;
  public cheeseMoneyText: Phaser.GameObjects.Text;
  public chocolateMoneyText: Phaser.GameObjects.Text;
  public factoryBoostTimer: Phaser.GameObjects.Text;
  public chocolateSprite: Phaser.GameObjects.Sprite;
  public feedBoostNative: Phaser.GameObjects.Text;
  public herdBoostNative: Phaser.GameObjects.Text;


  public click = click.bind(this);
  public clickButton = clickButton.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public systemWindow = systemWindow.bind(this);
  public chicken = chicken.bind(this);
  public chickenTerritory = chickenTerritory.bind(this);
  public cow = cow.bind(this);
  public cowTerritory = cowTerritory.bind(this);
  public sheepTerritory = sheepTerritory.bind(this);
  public resizeWindow = resizeWindow.bind(this);
  public resizeWindowTop = resizeWindowTop.bind(this);
  public bigButton = bigButton.bind(this);
  public repositoryBtn = repositoryBtn.bind(this);
  public chickenFair = chickenFair.bind(this);
  public chickenPasture = chickenPasture.bind(this);
  public chickenWater = chickenWater.bind(this);
  public boughtChickenLand = boughtChickenLand.bind(this);
  public buyChickenTerritory = buyChickenTerritory.bind(this);
  public cowFair = cowFair.bind(this);
  public cowPasture = cowPasture.bind(this);
  public cowWater = cowWater.bind(this);
  public boughtCowLand = boughtCowLand.bind(this);
  public buyCowTerritory = buyCowTerritory.bind(this);
  public chickenConvertor = chickenConvertor.bind(this);
  public confirmChickenExchangeTerritory = confirmChickenExchangeTerritory.bind(this);
  public chickenEggsRepository = chickenEggsRepository.bind(this);
  public confirmExpelChicken = confirmExpelChicken.bind(this);
  public cowConvertor = cowConvertor.bind(this);
  public confirmCowExchangeTerritory = confirmCowExchangeTerritory.bind(this);
  public cowMilkRepository = cowMilkRepository.bind(this);
  public confirmExpelCow = confirmExpelCow.bind(this);
  public sheepFair = sheepFair.bind(this);
  public sheep = sheep.bind(this);
  public sheepPasture = sheepPasture.bind(this);
  public sheepWater = sheepWater.bind(this);
  public boughtSheepLand = boughtSheepLand.bind(this);
  public buySheepTerritory = buySheepTerritory.bind(this);
  public sheepConvertor = sheepConvertor.bind(this);
  public confirmSheepExchangeTerritory = confirmSheepExchangeTerritory.bind(this);
  public sheepWoolRepository = sheepWoolRepository.bind(this);
  public confirmExpelSheep = confirmExpelSheep.bind(this);
  public tasks = tasks.bind(this);
  public tasksWindow = tasksWindow.bind(this);
  public resizeTasksWindow = resizeTasksWindow.bind(this);
  public profileWindow = profileWindow.bind(this);
  public support = support.bind(this);
  public registration = registration.bind(this);
  public daily = daily.bind(this);
  public nextChapter = nextChapter.bind(this);
  public dailyNewbie = dailyNewbie.bind(this);
  public diamondSheepAd = diamondSheepAd.bind(this);
  public diamondChickenAd = diamondChickenAd.bind(this);
  public diamondCowAd = diamondCowAd.bind(this);
  public donate = donate.bind(this);
  public improveCollector = improveCollector.bind(this);
  public updateImproveCollector = updateImproveCollector.bind(this);
  public herdBoostWindow = herdBoostWindow.bind(this);
  public getRandomAnimal = getRandomAnimal.bind(this);
  public getRandomStartPosition = getRandomStartPosition.bind(this);
  public shopButton = shopButton.bind(this);
  public shortTime = shortTime.bind(this);
  public sheepWoolRepositoryExchange = sheepWoolRepositoryExchange.bind(this);
  public chickenEggRepositoryExchange = chickenEggRepositoryExchange.bind(this);
  public cowMilkRepositoryExchange = cowMilkRepositoryExchange.bind(this);
  public changeNickname = changeNickname.bind(this);
  public addEmail = addEmail.bind(this);
  public confirmExpelAnimal = confirmExpelAnimal.bind(this);
  public shortNum = shortNum.bind(this);
  public eventConvertor = eventConvertor.bind(this);
  public eventTerritory = eventTerritory.bind(this);
  public buyEventTerritory = buyEventTerritory.bind(this);
  public improveCollectorEvent = improveCollectorEvent.bind(this);
  public updateImproveCollectorEvent = updateImproveCollectorEvent.bind(this);
  public herdBoostEventWindow = herdBoostEventWindow.bind(this);
  public eventDrag = eventDrag.bind(this);
  public eventProgress = eventProgress.bind(this);
  public createChatBars = createChatBars.bind(this);
  public eventRatings = eventRatings.bind(this);
  public endEventModal = endEventModal.bind(this);
  public improveCollectorAnim = improveCollectorAnim.bind(this);
  public getStatusSettings = getStatusSettings.bind(this);
  public typePreload = typePreload.bind(this);
  public clickTaskBoard = clickTaskBoard.bind(this);
  public openModal = openModal.bind(this);
  public loadingModal = loadingModal.bind(this);
  public cowFactory = cowFactory.bind(this);
  public updateFactoryModal = updateFactoryModal.bind(this);
  public improveFactoryWindow = improveFactoryWindow.bind(this);
  public factoryBoostWindow = factoryBoostWindow.bind(this);

  public init(state: Istate): void {
    this.state = state;
  }

  public preload(): void {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');
    this.loadingModal();
    this.typePreload();
  }
  
  public create(): void {
    this.add.tileSprite(0, 0,
      Number(this.game.config.width),
      Number(this.game.config.height),
      'modal'
    ).setOrigin(0).setInteractive();
    // тип окна
    switch (this.state.modal.type) {
      case 1: // системное окно
        this.systemWindow();
        break;
      case 2: // магазин
        this.scene.launch('Shop', this.state);
        break;
      case 3: // окно с заданиями
        this.tasks();
        break;
      case 4: // ежедневные награды
        this.daily();
        break;
      case 5: // следующая глава
        this.nextChapter();
        break;
      case 6: // ежедневные награды новичков
        this.dailyNewbie();
        break;
      case 7: // окно выдачи донатных кристаллов
        this.donate();
        break;
      case 8: // окно стадного буста
        if (this.state.farm !== 'Unicorn') {
          this.herdBoostWindow();
        } else {
          this.eventDrag();
          this.herdBoostEventWindow();
        }
        break;
      case 9: // Чат
        this.chatBG = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + this.chatHeight, 'chat-bg');
        this.scene.launch('Chat', this.state);
        this.createChatBars(this.chatHeight)
        break;
      case 10: // окно автопрогресса ивентовой фермы
        this.eventProgress();
        break;
      case 11: // окно рейтингов ивентовой фермы
        this.eventRatings();
        break;
      case 12: // окно выдачи наград ивентовой фермы
        this.endEventModal();
        break;
      default:
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        break;
    }
  }

  public update(): void {
    
    // восстановление скролла
    if (this.game.scene.keys[this.state.farm].scrolling?.wheel === true) {
      this.game.scene.keys[this.state.farm].scrolling.wheel = false;
    }
    
    // прогресс бар шерсти овец
    if (this.state.modal.type === 1 &&
      this.state.modal.sysType === 1 &&
      this.state.farm === 'Sheep') {

      let width: number = Math.round(444 / 100 * (this.state.animal.wool / 10));
      
      if (width === 440) width = 444;

      if (this.progressBar.displayWidth !== width) {
        this.progressBar.setDisplaySize(width, 16);
      }

      if (this.state.animal.wool === 1000 && this.progressButton.btn.texture.key === 'big-btn-grey') {

        this.progressButton.btn.setTexture('big-btn-green');
        this.progressButton.title.setColor('#FFFFFF');
        this.progressButton.text1.setColor('#FFFFFF');
        
      }

    }

    // прогресс бар яйца курицы
    if (this.state.modal.type === 1 &&
      this.state.modal.sysType === 1 &&
      this.state.farm === 'Chicken') {

      let width: number = Math.round(444 / 100 * (this.state.animal.egg / 10));
      
      if (width === 440) width = 444;

      if (this.progressBar.displayWidth !== width) {
        this.progressBar.setDisplaySize(width, 16);
      }
      
    }

    // прогресс бар молока коровы
    if (this.state.modal.type === 1 &&
      this.state.modal.sysType === 1 &&
      this.state.farm === 'Cow') {

      let width: number = Math.round(444 / 100 * (this.state.animal.milk / 10));
      
      if (width === 440) width = 444;

      if (this.progressBar.displayWidth !== width) {
        this.progressBar.setDisplaySize(width, 16);
      }
      
    }

    // прогресс для хранилищ
    if (this.state.territory?.type === 5 && this.state.modal?.sysType === 2) {

      let max: number, count: string, percent: number = 0;

      if (this.state.farm === 'Sheep') {

        max = this.state.sheepSettings.territoriesSheepSettings.find((data: IterritoriesSheepSettings) => data.improve === this.state.territory.improve).woolStorage;
        count = this.state.lang.countWool;

      } else if (this.state.farm === 'Chicken') {

        max = this.state.chickenSettings.territoriesChickenSettings.find((data: IterritoriesChickenSettings) => data.improve === this.state.territory.improve).eggStorage;
        count = this.state.lang.countEggs;

      } else if (this.state.farm === 'Cow') {

        max = this.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === this.state.territory.improve).storage;
        count = this.state.lang.countMilk;

      }
      if (this.state.territory.volume > 0) {
        percent = this.state.territory.volume / (max / 100);
      }
      
      let width: number = Math.round(444 / 100 * percent);

      if (this.progressBar.displayWidth !== width) {
        this.progressBar.setDisplaySize(width, 16);
      }
      if (this.state.farm !== 'Cow') {
        if (this.progressButton.text1.text !== shortNum(this.state.territory.money)) {
          this.progressButton.text1.setText(shortNum(this.state.territory.money));
          this.progressButton.img1.x = 555 - this.progressButton.text1.displayWidth;
        }
      } else {
        if (this.progressButton.text1.text !== shortNum(this.state.territory.volume)) {
          this.progressButton.text1.setText(shortNum(this.state.territory.volume));
          this.progressButton.img1.x = 555 - this.progressButton.text1.displayWidth;
        }
      }

      let volume: string = count + ': ' + this.state.territory.volume + ' / ' + max;
      if (this.progressText.text !== volume) this.progressText.setText(volume);

      if (this.state[`user${this.state.farm}`].feedBoostTime > 0) {
        this.feedBoostText?.setText(this.state.lang.feedBoostCounterText + this.shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang));
        this.feedBoostText?.setVisible(true);
      } else {
        this.feedBoostText?.setVisible(false);
      }
    }

    if (this.state.farm === 'Cow' && this.state.territory?.territoryType === 5 && this.state.modal?.sysType === 2) {

      const max: number = this.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === this.state.territory.improve).storage;
      const count: string = this.state.lang.countMilk;
      let percent: number = 0;

      if (this.state.territory.volume > 0) {
        percent = this.state.territory.volume / (max / 100);
      }
      
      let width: number = Math.round(444 / 100 * percent);

      if (this.progressBar.displayWidth !== width) {
        this.progressBar.setDisplaySize(width, 16);
      }

      if (this.progressButton.text1.text !== shortNum(this.state.territory.volume * this.game.scene.keys[this.state.farm].milkMultiply)) {
        this.progressButton.text1.setText(shortNum(this.state.territory.volume * this.game.scene.keys[this.state.farm].milkMultiply));
        this.progressButton.img1.x = 555 - this.progressButton.text1.displayWidth;
      }

      let volume: string = `${count}: ${this.state.territory.volume} / ${max}`;
      if (this.state.farm === 'Cow') {
        volume = `${count}: ${shortNum(this.state.territory.volume)} / ${shortNum(max)}`;
      }
      if (this.progressText.text !== volume) this.progressText.setText(volume);

      if (this.state[`user${this.state.farm}`].feedBoostTime > 0) {
        this.feedBoostText?.setText(this.state.lang.feedBoostCounterText + this.shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang));
        this.feedBoostText?.setVisible(true);
      } else {
        this.feedBoostText?.setVisible(false);
      }
      
    }

    // Обновление таблицы рейтингов евента
    if (this.state.progress.event.updateRaitings && this.state.modal.type === 11) {

      for (let i: number = 0; i < 10; i++) {
        if (this.state.progress.event.eventRaitings[i].score !== null) {
          this.eventRatingsNames[i].setText(this.state.progress.event.eventRaitings[i].place + '. ' + this.state.progress.event.eventRaitings[i].name).setCrop(0, 0, 260, 100)
          this.eventRatingsScores[i].setText(String(this.state.progress.event.eventRaitings[i].score))
        }
      }
      
      if (this.state.progress.event.userEventRaiting.place <= 10) {
        
        this.line.setVisible(false)
        this.playerPlaceAndName.setVisible(false)
        this.playerScore.setVisible(false)
    
      } else if (this.state.progress.event.userEventRaiting.place > 10) {
        
        this.line.setVisible(true)
        this.playerPlaceAndName.setVisible(true).setCrop(0, 0, 280, 100)
        this.playerScore.setVisible(true)
        
      }

      this.state.progress.event.updateRaitings = false

    }
  
    if (this.state.modal.type === 6) this.timerNewbieAward.setText(shortTime(this.state.timeToNewDay, this.state.lang));

    this.updateFactoryModal();
    
  }
}

export default Modal;
