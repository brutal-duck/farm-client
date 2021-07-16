import Chat from "../../../scenes/Modal/Chat/Main";

export default class PersonalChat {
  private scene: Chat;
  private ready: boolean;
  private msg: Array<IpersonalMessage>;
  private lastMsgFromUser: string;
  private textWrap: number;
  private userMsg: IuserPersonalMessage;

  constructor (scene: Chat) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    this.scene.scrollHeight = Number(this.scene.game.config.height) - 1200 + 640;
    this.scene.scrolling.bottom = 0;
    this.scene.scrolling.scrollY = 0;
    this.msg = [];
    this.textWrap = 340;
    this.userMsg = this.scene.state.user.personalMessages.find(el => el.userId === this.scene.state.modal.chatUserId);
  }

  public update(): void {
    this.printNewChatMessages();
  }

  private printNewChatMessages(): void {
    if (this.userMsg?.messages.length > this.msg.length) {
      const index: number = this.userMsg.messages.length - (this.userMsg.messages.length - this.msg.length); // Индекс ненапечатанного сообщения
      for (let i: number = index; i < this.userMsg.messages.length; i++) {
        this.msg.push(this.userMsg.messages[i]);
        this.newMsg(this.userMsg.messages[i]);
      }
    }
  }

  private newMsg(msgData: IpersonalMessage) {
    msgData.check = true;
    if (msgData.owned) {
      this.createUserMessage(msgData);
    } else {
      this.createForeignMessage(msgData);
    }
    this.scene.scrolling.bottom = this.scene.scrollHeight;
    this.scene.scrolling.scrollY = this.scene.scrollHeight;
  }

  private getDate(msgData: IpersonalMessage): string {
    const time: Date = new Date(msgData.time);
    const year: number = time.getFullYear();
    const month: number = time.getMonth() + 1;
    const day: number = time.getDate();
    const hours: number = time.getHours();
    const minutes: number = time.getMinutes();
    const date: string = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
    return date;
  }

  private createUserMessage(msgData: IpersonalMessage): void {
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

    const login: string = this.scene.state.name ? this.scene.state.name : this.scene.state.user.login;
    const date: string = this.getDate(msgData);
    let padding: number = 18;
    if (this.lastMsgFromUser !== login) padding += 20;

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

    if (this.lastMsgFromUser !== login) {
      const nicknameText: Phaser.GameObjects.Text = this.scene.add.text(32, text.y - 34, login, nameTextStyle)
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
    
    const status: IstatusSettings = this.scene.getStatusSettings(this.scene.state.user.status);
    if (status) {
      this.scene.add.sprite(bgX - 12, this.scene.windowHeight + this.scene.scrollHeight + padding, status.iconTexture).setOrigin(1, 0).setScale(0.8);
    }

    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(bgX, text.y - 10, bgWidth, textHeight + 30, 'chat-user-message-bg', 20).setOrigin(0);

    this.lastMsgFromUser = login;
    // Добавляем длинну скролла если высота всех сообщений уходит за границу
    this.scene.scrollHeight += textHeight + padding + 40; 
  }

  private createForeignMessage(msgData: IpersonalMessage): void {
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
    if (this.lastMsgFromUser !== this.userMsg.name) padding += 20;

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
    
    if (this.lastMsgFromUser !== this.userMsg.name) {
      this.scene.add.text(pos.x - 14, text.y - 34, this.userMsg.name, nameTextStyle)
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

    const status: IstatusSettings = this.scene.getStatusSettings(this.userMsg.status);
    if (status) {
      this.scene.add.sprite(bgX + bgWidth + 30, this.scene.windowHeight + this.scene.scrollHeight + padding, status.iconTexture).setOrigin(1, 0).setScale(0.8);
    }
  
    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(bgX, text.y - 10, bgWidth, textHeight + 30, 'chat-foreign-message-bg', 20).setOrigin(0);
  
    this.lastMsgFromUser = this.userMsg.name;
    this.scene.scrollHeight += textHeight + padding + 40;
  }
}