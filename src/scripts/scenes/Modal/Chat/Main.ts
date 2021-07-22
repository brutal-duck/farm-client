import Scrolling from '../../../libs/Scrolling';
import { getStatusSettings, loadingModal } from '../../../general/basic';
import GeneralChat from './../../../components/modal/chat/GeneralChat';
import PersonalChatList from './../../../components/modal/chat/PersonalChatList';
import PersonalChat from '../../../components/modal/chat/PersonalChat';
import { click } from '../../../general/clicks';
import Modal from './../Modal';
import ClanChat from './../../../components/modal/chat/ClanChat';

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
  public msg: Ichat[];
  public generalChat: GeneralChat;
  public personalChatList: PersonalChatList;
  public personalChat: PersonalChat;
  public clanChat: ClanChat;

  public getStatusSettings = getStatusSettings.bind(this);
  public loadingModal = loadingModal.bind(this);
  public click = click.bind(this);

  public init(state: Istate): void {
    this.state = state;
    this.scrollHeight = 0;
    if (this.state.modal.chatType === 1 || this.state.modal.chatType === 3) {
      this.windowHeight = 640;
    } else if (this.state.modal.chatType === 2 && !this.state.modal.chatUserId) {
      this.windowHeight = 722;
    } else if (this.state.modal.chatType === 2 && this.state.modal.chatUserId){
      this.windowHeight = 568;
    }
    this.windowWidth = 479;
    this.isFirstBuild = true;
    this.initScrolling();
  }

  public preload(): void {
  }

  public create(): void {   
    if (this.state.modal.chatType === 1) {
      this.generalChat = new GeneralChat(this);
    } else if (this.state.modal.chatType === 2 && !this.state.modal.chatUserId) {
      this.personalChatList = new PersonalChatList(this);
    } else if (this.state.modal.chatType === 2 && this.state.modal.chatUserId) {
      this.personalChat = new PersonalChat(this);
    } else if (this.state.modal.chatType === 3) {
      this.clanChat = new ClanChat(this);
    }
  }

  public update(): void {
    switch (this.state.modal.chatType) {
      case 1: 
        this.generalChat?.update();
        break;
      case 2: 
        if (!this.state.modal.chatUserId) this.personalChatList?.update(); 
        else this.personalChat?.update();
        break;
      case 3: 
        this.clanChat?.update();
        break;
    }
    const ModalScene: Modal = this.scene.get('Modal') as Modal;
    ModalScene.chatBars?.update();
  }

  private initScrolling(): void {
    this.height = Number(this.game.config.height);
    let y: number = this.cameras.main.centerY - 320;
    if (this.state.modal.chatType === 2 && this.state.modal.chatUserId) y += 70;
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

export default Chat;