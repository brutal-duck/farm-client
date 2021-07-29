import Scrolling from '../../../libs/Scrolling';
import { getStatusSettings, loadingModal } from '../../../general/basic';
import { click, clickModalBtn, clickButton } from '../../../general/clicks';
import ClanUsersList from './../../../components/modal/clan/ClanUsersList';

class Clan extends Phaser.Scene {
  constructor() {
    super('Clan');
  }

  public state: Istate;
  public scrolling: Scrolling;
  public height: number;
  public scrollHeight: number;
  public windowHeight: number;
  public windowWidth: number;

  public getStatusSettings = getStatusSettings.bind(this);
  public loadingModal = loadingModal.bind(this);
  public click = click.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public clickButton = clickButton.bind(this);

  public init(state: Istate): void {
    this.state = state;
    this.scrollHeight = 0;
    this.windowHeight = 600;
    this.windowWidth = 479;
    this.initScrolling();
  }

  public preload(): void {
  }

  public create(): void {
    if (this.state.modal.clanType === 1) {
      new ClanUsersList(this);
    }
  }

  public update(): void {
  }

  private initScrolling(): void {
    this.height = Number(this.game.config.height);
    let y: number = this.cameras.main.centerY - 200;
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

export default Clan;