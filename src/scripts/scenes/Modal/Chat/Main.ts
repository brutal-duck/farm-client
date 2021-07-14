import Scrolling from '../../../libs/Scrolling';
import { getStatusSettings, loadingModal } from '../../../general/basic';
import GeneralChat from './../../../components/modal/chat/GeneralChat';
class Chat extends Phaser.Scene {
  constructor() {
    super('Chat');
  }

  public state: Istate;
  public scrolling: Scrolling;
  public height: number;
  public scrollHeight: number;
  public windowHeight: number;
  public windowWidth: number;
  public isFirstBuild: boolean;
  public textWrap: number;
  public msg: Ichat[];
  public generalChat: GeneralChat;

  public getStatusSettings = getStatusSettings.bind(this);
  public loadingModal = loadingModal.bind(this);

  public init(state: Istate): void {
    this.state = state;
    this.scrollHeight = Number(this.game.config.height) - 1200 + 562;
    this.windowHeight = 630;
    this.windowWidth = 479;
    this.isFirstBuild = true;
    this.textWrap = 340;
    this.initScrolling();
  }

  public preload(): void {
  }

  public create(): void {   
    if (this.state.modal.chatType === 1) {
      this.generalChat = new GeneralChat(this);
    }
  }

  public update(): void {
    switch (this.state.modal.chatType) {
      case 1: 
        this.generalChat?.update();
        break;
      case 2: 
        break;
    }
  }

  private initScrolling(): void {
    this.height = Number(this.game.config.height)
    const cameraOptions: IScrollingOptions = {
      x: 120,
      y: this.cameras.main.centerY - 320,
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

export default Chat;