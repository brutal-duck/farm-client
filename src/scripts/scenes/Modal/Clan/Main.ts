import Scrolling from '../../../libs/Scrolling';
import { getStatusSettings, loadingModal } from '../../../general/basic';
import { click, clickModalBtn, clickButton } from '../../../general/clicks';
import ClanUsersList from './../../../components/modal/clan/ClanUsersList';
import ClanLeaderboard from './../../../components/modal/clan/ClanLeaderboard';
import ClanSearch from './../../../components/modal/clan/ClanSearch';

class ClanScroll extends Phaser.Scene {
  constructor() {
    super('ClanScroll');
  }

  public state: Istate;
  public scrolling: Scrolling;
  public height: number;
  public scrollHeight: number;
  public windowHeight: number;
  public windowWidth: number;
  public windowType: number;
  private usersList: ClanUsersList;

  public getStatusSettings = getStatusSettings.bind(this);
  public loadingModal = loadingModal.bind(this);
  public click = click.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public clickButton = clickButton.bind(this);

  public init(state: Istate): void {
    this.state = state;
    this.windowType = this.state.modal.clanTabType || 2;
    this.scrollHeight = 0;
    this.windowHeight = 600;
    this.windowWidth = 479;
    this.initScrolling();
  }

  public preload(): void {
  }

  public create(): void {
    if (this.state.modal.clanTabType === 1) {
      this.usersList = new ClanUsersList(this);
    } else if (this.state.modal.clanTabType === 2) {
      new ClanLeaderboard(this);
    } else if (this.state.modal.clanTabType === 3) {
      new ClanSearch(this);
    }
  }

  public update(): void {
    if (this.state.modal.clanTabType === 1) {
      this.usersList.update();
    }    
  }

  private initScrolling(): void {
    this.height = Number(this.game.config.height);
    let y: number;
    if (this.windowType === 1) {
      y = this.cameras.main.centerY - 198;
      this.windowHeight = 595;
    } else if (this.windowType === 2 && this.state.user.clanId) {
      y = this.cameras.main.centerY - 267;
      this.windowHeight = 673;
    } else if (this.windowType === 2) {
      y = this.cameras.main.centerY - 172;
      this.windowHeight = 584;
    } else if (this.windowType === 3) {
      y = this.cameras.main.centerY - 172;
      this.windowHeight = 584;
    }

    const cameraOptions: IScrollingOptions = {
      x: 120,
      y: y,
      width: this.windowWidth,
      height: this.windowHeight,
      wheel: true,
      top: this.height
    };
    
    this.scrolling = new Scrolling(this, cameraOptions);
    this.input.on('pointerup', (): void => {
      this.scrolling.enabled = true;
      this.scrolling.wheel = true;
    });
  }
}

export default ClanScroll;