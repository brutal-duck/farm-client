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
  clickButtonUp
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
import DailyAwardWindow from '../../components/modal/DailyAwardWindow';
import { bigButton, repositoryBtn, shopButton } from '../../elements';
// буст "Стадо"
import { improveCollectorAnim, openModal } from '../../general/animations';
import { clickTaskBoard } from '../../general/tasks';
import typePreload from './typePreload';
import FactoryWindow from './../../components/modal/FactoryWindow';
import DailyNewbieWindow from '../../components/modal/DailyNewbieWindow';
import TasksWindow from '../../components/modal/TasksWindow';
import NextChapterWindow from '../../components/modal/NextChapterWindow';
import DonateWindow from '../../components/modal/DonateWindow';
import HerdBoostWindow from '../../components/modal/HerdBoostWindow';
import SocialTasksWindow from './../../components/modal/SocialTasksWindow';
import EventProgressWindow from '../../components/modal/EventProgressWindow';
import EventEndWindow from '../../components/modal/EventEndWindow';
import EventRatingsWindow from '../../components/modal/EventRatingsWindow';
import HerdBoostUnicornWindow from '../../components/modal/HerdBoostUnicornWindow';
import ProfileWindow from '../../components/modal/ProfileWindow';
import ChatBars from '../../components/modal/chat/ChatBars';
import SettingsWindow from './../../components/modal/SettingsWindow';
import ClanTabsWindow from '../../components/modal/clan/ClanTabsWindow';
import ClanWindow from '../../components/modal/clan/ClanWindow';
import ClanBankWindow from './../../components/modal/clan/ClanBankWindow';
import ClanTournamentWindow from '../../components/modal/clan/ClanTournamentWindow';
import TournamentRaitingsWindow from './../../components/modal/clan/TournamentRaitingsWindow';
import ClanTournamentEndWindow from './../../components/modal/clan/ClanTournamentEndWindow';
import SaleWindow from './../../components/modal/SaleWindow';
import ReviewWindow from '../../components/modal/ReviewWindow';
import AvatarsWindow from './../../components/modal/AvatarsWindow';
import AchievementsWindow from '../../components/modal/AchievementsWindow';
import Utils from './../../libs/Utils';
import TasksWindowNew from '../../components/modal/TasksWindowNew';
import DebugWindow from './../../components/modal/DebugWindow';

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
  public mainInput: HTMLInputElement;
  public secondInput: HTMLTextAreaElement | HTMLInputElement;
  public enterKey: Phaser.Input.Keyboard.Key;
  public chatHeight: number = 0;
  public chatBG: Phaser.GameObjects.Sprite;
  public eventLeftTime: Phaser.GameObjects.Text;
  public socialTakskWindow: SocialTasksWindow;
  public chatBars: ChatBars;
  public taskWindow: TasksWindow;
  public taskWindowNew: TasksWindowNew;
  public ClanTabsWindow: ClanTabsWindow;
  public oldType: number = 0;
  public hints: Phaser.GameObjects.Group;

  public click = click.bind(this);
  public clickButton = clickButton.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public systemWindow = systemWindow.bind(this);
  public chickenTerritory = chickenTerritory.bind(this);
  public cowTerritory = cowTerritory.bind(this);
  public sheepTerritory = sheepTerritory.bind(this);
  public resizeWindow = resizeWindow.bind(this);
  public resizeWindowTop = resizeWindowTop.bind(this);
  public bigButton = bigButton.bind(this);
  public repositoryBtn = repositoryBtn.bind(this);
  public shopButton = shopButton.bind(this);
  public shortNum = shortNum.bind(this);
  public eventTerritory = eventTerritory.bind(this);
  public improveCollectorAnim = improveCollectorAnim.bind(this);
  public getStatusSettings = getStatusSettings.bind(this);
  public typePreload = typePreload.bind(this);
  public clickTaskBoard = clickTaskBoard.bind(this);
  public openModal = openModal.bind(this);
  public loadingModal = loadingModal.bind(this);
  public clickButtonUp = clickButtonUp.bind(this);

  public init(state: Istate): void {
    this.state = state;
    this.hints = this.add.group();
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
    const avatarWinAnim = this.oldType !== this.state.modal.type;
    this.oldType = this.state.modal.type;
    // тип окна
    switch (this.state.modal.type) {
      case 1: // системное окно
        this.systemWindow();
        break;
      case 2: // магазин
        this.scene.launch('Shop', this.state);
        break;
      case 3: // окно с заданиями
        if (Utils.checkTestB(this.state)) this.taskWindowNew = new TasksWindowNew(this);
        else this.taskWindow = new TasksWindow(this);
        break;
      case 4: // ежедневные награды
        new DailyAwardWindow(this);
        break;
      case 5: // следующая глава
        new NextChapterWindow(this)
        break;
      case 6: // ежедневные награды новичков
        new DailyNewbieWindow(this);
        break;
      case 7: // окно выдачи донатных кристаллов
        new DonateWindow(this)
        break;
      case 8: // окно стадного буста
        if (this.state.farm === 'Unicorn') new HerdBoostUnicornWindow(this)
        else new HerdBoostWindow(this)
        break;
      case 9: // Чат
        this.chatBars = new ChatBars(this);
        this.scene.launch('Chat', this.state);
        break;
      case 10: // окно автопрогресса ивентовой фермы
        new EventProgressWindow(this);
        break;
      case 11: // окно рейтингов ивентовой фермы
        new EventRatingsWindow(this);
        break;
      case 12: // окно выдачи наград ивентовой фермы
        new EventEndWindow(this);
        break;
      case 13: 
        new FactoryWindow(this);
        this.openModal(this.cameras.main);
        break;
      case 14: 
        this.socialTakskWindow = new SocialTasksWindow(this);
        this.openModal(this.cameras.main);
        break;
      case 15: 
        new ProfileWindow(this);
        this.openModal(this.cameras.main);
        break;
      case 16: 
        new SettingsWindow(this);
        this.openModal(this.cameras.main);
        break;
      case 17: 
        this.ClanTabsWindow = new ClanTabsWindow(this);
        break;
      case 18: 
        new ClanWindow(this);
        break;
      case 19: 
        new ClanBankWindow(this);
        break;
      case 20: 
        new ClanTournamentWindow(this);
        break;
      case 21: 
        new TournamentRaitingsWindow(this);
        break;
      case 22: 
        new ClanTournamentEndWindow(this);
        break;
      case 23: 
        this.openModal(this.cameras.main);
        new SaleWindow(this);
        break;
      case 24: 
        this.openModal(this.cameras.main);
        new ReviewWindow(this);
        break;
      case 25: 
        if (avatarWinAnim) this.openModal(this.cameras.main);
        new AvatarsWindow(this);
        break;
      case 26:
        new AchievementsWindow(this);
        break;
      case 27:
        new DebugWindow(this);
        break;
      default:
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        break;
    }
  }

  public update(): void {
    if (this.state.closeModal) {
      this.state.closeModal = false;
      this.state.user.clanId = '';
      this.state.clan = null;
      if (this.scene.isActive('ClanScroll')) {
        this.scene.stop('Modal');
        this.scene.stop('ClanScroll');
      }
      if (this.scene.isActive('Chat')) {
        this.scene.stop('Chat');
        this.scene.restart(this.state);
      }
    }

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
    if (this.state.territory?.territoryType === 5 && this.state.modal?.sysType === 2) {

      let max: number, count: string, percent: number = 0;

      if (Utils.checkTestB(this.state)) {
        if (this.state.farm === 'Sheep') {
          max = this.state.sheepSettings.partSettings[this.state.territory?.improve - 1].territory.maxRepositoryVolume;
          count = this.state.lang.countWool;
        } else if (this.state.farm === 'Chicken') {
          max = this.state.chickenSettings.partSettings[this.state.territory?.improve - 1].territory.maxRepositoryVolume;
          count = this.state.lang.countEggs;
        } else if (this.state.farm === 'Cow') {
          max = this.state.cowSettings.partSettings[this.state.territory?.improve - 1].territory.maxRepositoryVolume;
          count = this.state.lang.countMilk;
        }
      } else {
        if (this.state.farm === 'Sheep') {
  
          max = this.state.sheepSettings.territoriesSheepSettings.find((data: IterritoriesSheepSettings) => data.improve === this.state.territory.improve).storage;
          count = this.state.lang.countWool;
  
        } else if (this.state.farm === 'Chicken') {
  
          max = this.state.chickenSettings.territoriesChickenSettings.find((data: IterritoriesChickenSettings) => data.improve === this.state.territory.improve).storage;
          count = this.state.lang.countEggs;
  
        } else if (this.state.farm === 'Cow') {
  
          max = this.state.cowSettings.cowFactorySettings.find((data: IfactorySettings) => data.improve === this.state.territory.improve).lotSize * this.state.storageMultiply;
          count = this.state.lang.countMilk;
  
        }
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
        const text = `${this.state.lang.feedBoostTitle}. ${this.state.lang.left} ${shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang)}`;
        if (text !== this.feedBoostText.text) {
          this.feedBoostText?.setText(text);
        }
        this.feedBoostText?.setVisible(true);
      } else {
        if (this.feedBoostText?.visible) {
          this.scene.restart(this.state);
        }
      }
    }

    if (this.state.farm === 'Cow' && this.state.territory?.territoryType === 5 && this.state.modal?.sysType === 2) {

      let max: number = this.state.cowSettings.cowFactorySettings.find((data: IfactorySettings) => data.improve === this.state.territory.improve).lotSize * this.state.storageMultiply;
      if (Utils.checkTestB(this.state)) {
        max = this.state.cowSettings.partSettings[this.state.territory?.improve - 1].territory.maxRepositoryVolume;
      }
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
        this.feedBoostText?.setText(this.state.lang.feedBoostCounterText + shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang));
        this.feedBoostText?.setVisible(true);
      } else {
        this.feedBoostText?.setVisible(false);
      }
      
    }

  }
}

export default Modal;
