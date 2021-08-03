import Chat from './../../../scenes/Modal/Chat/Main';
import axios from 'axios';
import Modal from './../../../scenes/Modal/Modal';

const JOIN_KEY = '196ea80e3d8a8ef81b09c965d6658b7f';
const LEAVE_KEY = '1491f4c9d53dfa6c50d0c4a375f9ba76';
export default class ClanChat {
  private scene: Chat;
  private ready: boolean;
  private msg: Array<Ichat>;
  private lastMsgFromUser: string;
  private textWrap: number;

  constructor (scene: Chat) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    this.scene.scrollHeight = Number(this.scene.game.config.height) - 1200 + 562;
    this.scene.scrolling.bottom = 0;
    this.scene.scrolling.scrollY = 0;
    this.msg = [];
    this.textWrap = 340;
    this.getLastChatMessages();
  }

  public update(): void {
    this.printNewChatMessages();
  }

  private getLastChatMessages(): void {
    const data = { 
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      clanId: this.scene.state.user.clanId,
    };

    axios.post(process.env.API + "/getClanMessages", data)
      .then((res) => {
        if (!res.data.error) {
          this.scene.state.clan.chatMessages = [];
          for (let i: number = res.data.messages.length - 1; i >= 0; i--) {
            this.scene.state.clan.chatMessages.push(res.data.messages[i]);
          }
          this.ready = true;
        }
      });
  }

  private printNewChatMessages(): void {
    if (this.scene.state.clan.chatMessages.length > this.msg.length && this.ready) {
      const index: number = this.scene.state.clan.chatMessages.length - (this.scene.state.clan.chatMessages.length - this.msg.length); // Индекс ненапечатанного сообщения
      for (let i: number = index; i < this.scene.state.clan.chatMessages.length; i++) {
        this.msg.push(this.scene.state.clan.chatMessages[i]);
        this.newMsg(this.scene.state.clan.chatMessages[i]);
      }
    }
  }

  private newMsg(msgData: Ichat) {
    if (msgData.text.includes(JOIN_KEY) || msgData.text.includes(LEAVE_KEY)) {
      this.createClanMessage(msgData);
    } else if (msgData.userId === this.scene.state.user.id) {
      this.createUserMessage(msgData);
    } else {
      this.createForeignMessage(msgData);
    }
    this.scene.scrolling.bottom = this.scene.scrollHeight;
    this.scene.scrolling.scrollY = this.scene.scrollHeight;
  }

  private getDate(msgData: Ichat): string {
    const time: Date = new Date(msgData.time);
    const year: number = time.getFullYear();
    const month: number = time.getMonth() + 1;
    const day: number = time.getDate();
    const hours: number = time.getHours();
    const minutes: string = time.getMinutes() < 10 ? '0' + time.getMinutes() : String(time.getMinutes());
    const date: string = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
    return date;
  }

  private createUserMessage(msgData: Ichat): void {
    const messageTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '21px',
      fontFamily: 'Bip',
      color: '#FADAC1',
      align: 'left',
      wordWrap: { width: this.textWrap }
    };
    const nameTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '18px',
      fontFamily: 'Shadow',
      color: '#FADAC1',
      align: 'right'
    };
    const timeTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '16px',
      fontFamily: 'Shadow',
      color: '#63527F',
      align: 'right'
    };

    const date: string = this.getDate(msgData);
    let padding: number = 18;
    if (this.lastMsgFromUser !== msgData.userId) padding += 20;

    const pos: Iposition = {
      x: this.scene.windowWidth - this.textWrap - 32,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding
    }

    // Текст исходящего сообщения
    const text: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, msgData.text, messageTextStyle)
      .setOrigin(0, 0)
      .setDepth(2);
     
    const textGeom: Phaser.Geom.Rectangle = text.getBounds();
    const textHeight: number = text.getBounds().height;
    text.setCrop(0, 0, this.textWrap - 5, textHeight);
    const textWidth: number = text.getBounds().width;
          
    // Текст Ника
    if (this.lastMsgFromUser !== msgData.userId) {
      const nicknameText: Phaser.GameObjects.Text = this.scene.add.text(32, text.y - 34, msgData.login, nameTextStyle)
      .setOrigin(0)
      .setCrop(0, 0, this.scene.windowWidth - 40, 100)
      .setDepth(1);

      const nicknameTextWidth: number = nicknameText.getBounds().width;
      if (nicknameTextWidth < 479) nicknameText.setX(this.scene.windowWidth - nicknameTextWidth - 10);   
    }

    // Время исходящего сообщения
    const timeText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.windowWidth - 24, text.y + textHeight + 36, date, timeTextStyle)
      .setOrigin(1)
      .setDepth(2);

    const timeWidth: number = timeText.getBounds().width;
    

    // Определяем размер и положение плашки и текста
    let bgX: number = text.x - 14;
    let bgWidth: number = textWidth + 40;

    if (textWidth > 364) bgWidth = 336;
    else {
      text.setX(this.scene.windowWidth - textWidth - 32);
      bgX = text.x - 14;
    }
    // Минимальный размер и положение плашки
    if (textWidth < timeWidth - 10) {
      timeText.setX(this.scene.windowWidth - 14);
    }
    
    const status: IstatusSettings = this.scene.getStatusSettings(msgData.status);
    if (status) {
      this.scene.add.sprite(bgX - 12, this.scene.windowHeight + this.scene.scrollHeight + padding, status.iconTexture).setOrigin(1, 0).setScale(0.8);
    }

    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(bgX, text.y - 10, bgWidth, textHeight + 30, 'chat-user-message-bg', 20).setOrigin(0);

    this.lastMsgFromUser = msgData.userId;
    // Добавляем длинну скролла если высота всех сообщений уходит за границу
    this.scene.scrollHeight += textHeight + padding + 40; 
  }

  private createForeignMessage(msgData: Ichat): void {
    const messageTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '21px',
      fontFamily: 'Bip',
      color: '#5E340C',
      align: 'left',
      wordWrap: { width: this.textWrap }
    };
    const nameTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '18px',
      fontFamily: 'Shadow',
      color: '#FADAC1',
      align: 'right'
    };
    const timeTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '16px',
      fontFamily: 'Shadow',
      color: '#63527F',
      align: 'right'
    };
    const date: string = this.getDate(msgData);
    let padding: number = 18;
    if (this.lastMsgFromUser !== msgData.userId) padding += 20;

    const pos: Iposition = {
      x: 24,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding,
    };

    const text: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, msgData.text, messageTextStyle).setOrigin(0)
      .setDepth(2);
    const textGeom: Phaser.Geom.Rectangle = text.getBounds();
    const textHeight: number = textGeom.height;
    text.setCrop(0, 0, this.textWrap - 5, textHeight);

    const textWidth: number = textGeom.width;
    
    if (this.lastMsgFromUser !== msgData.userId) {
      this.scene.add.text(pos.x - 14, text.y - 34, msgData.login, nameTextStyle)
        .setOrigin(0)
        .setCrop(0, 0, this.scene.windowWidth - 40, 100)
        .setDepth(1);  
    }
  
    // Время сообщения
    const timeText: Phaser.GameObjects.Text = this.scene.add.text(24, text.y + textHeight + 36, date, timeTextStyle)
      .setOrigin(0, 1)
      .setDepth(2);
  
    const timeWidth: number = timeText.getBounds().width;
    
  
    // Определяем плашки и текст
    let bgX: number = text.x - 14;
    let bgWidth: number = textWidth + 40;
  
    // Устанавливает минимальный размер и положение плашки
    if (textWidth > 364) bgWidth = 364;
    if (textWidth < timeWidth - 10) timeText.setX(14);
    
    const status: IstatusSettings = this.scene.getStatusSettings(msgData.status);
    if (status) {
      this.scene.add.sprite(bgX + bgWidth + 30, this.scene.windowHeight + this.scene.scrollHeight + padding, status.iconTexture).setOrigin(1, 0).setScale(0.8);
    }
  
    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(bgX, text.y - 10, bgWidth, textHeight + 30, 'chat-foreign-message-bg', 20).setOrigin(0);
  
    this.lastMsgFromUser = msgData.userId;
    this.scene.scrollHeight += textHeight + padding + 40;

    this.scene.click(bg, () => {
      this.onPersonalClick(msgData);
    });
  }

  private createClanMessage(msgData: Ichat): void {
    const messageTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '21px',
      fontFamily: 'Bip',
      color: '#FADAC1',
      align: 'center',
      wordWrap: { width: this.textWrap }
    };

    const padding: number = 38;

    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 115,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding
    }

    let textString: string = msgData.text.includes(JOIN_KEY) ? 
    `${msgData.login} ${this.scene.state.lang.nowInClan}` : 
    `${msgData.login} ${this.scene.state.lang.leaveOnClan}`;

    const text: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, textString, messageTextStyle).setOrigin(0.5, 0).setDepth(2);
    const textHeight: number = text.getBounds().height + 30;
    if (text.getBounds().width > this.textWrap) {
      text.setCrop(this.textWrap / 2 - 10, 0, this.textWrap, textHeight);
    }
    const bgWidth: number = text.getBounds().width > this.textWrap ? this.textWrap + 50 : text.getBounds().width + 50;
    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(pos.x, pos.y - 10, bgWidth, textHeight, 'chat-user-message-bg', 20).setOrigin(0.5, 0).setAlpha(0.5);
    this.lastMsgFromUser = '';
    // Добавляем длинну скролла если высота всех сообщений уходит за границу
    this.scene.scrollHeight += textHeight + padding; 
  }

  private onPersonalClick(msgData: Ichat): void {
    const ModalScene: Modal = this.scene.scene.get('Modal') as Modal;
    ModalScene.mainInput?.remove();
    ModalScene.chatBars.enterKey?.destroy();
    this.scene.state.foreignProfileId = msgData.userId;
    this.scene.state.modal = {
      type: 15,
    };
    this.scene.scene.stop('Chat');
    this.scene.scene.launch('Modal',this.scene.state);
  }
}