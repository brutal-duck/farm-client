import Chat from './../../../scenes/Modal/Chat/Main';
import Modal from './../../../scenes/Modal/Modal';
import Notificator from './../../gameObjects/Notificator';

export default class PersonalChatList {
  private scene: Chat;

  constructor(scene: Chat) {
    this.scene = scene;
    this.init();
    this.createElements();
  }

  private init(): void {
    this.scene.scrollHeight = Number(this.scene.game.config.height) - 1200 + 510;
    this.scene.scrolling.bottom = 0;
    this.scene.scrolling.scrollY = 0;
  }

  public update(): void {
    if (this.scene.state.updatePersonalMessage) {
      this.scene.state.modal = {
        type: 9,
        chatType: 2,
      };
      this.scene.scene.stop('Chat');
      const ModalScene: Modal = this.scene.scene.get('Modal') as Modal;
      ModalScene.scene.restart(this.scene.state);
      this.scene.state.updatePersonalMessage = false;
    }
  }

  private createElements(): void {
    this.scene.state.user.personalMessages.sort((a, b) => {
      const timeA: number = new Date(a.messages[a.messages.length - 1]?.time).getTime();
      const timeB: number = new Date(b.messages[b.messages.length - 1]?.time).getTime();
      return timeB - timeA;
    })
    this.scene.state.user.personalMessages.forEach(el => {
      this.createPersonal(el);
    });
  }

  private createPersonal(data: IuserPersonalMessage): void {
    const padding: number = 35;
    const bgWidth: number = 450;
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 325,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding,
    };
    const { name, status, messages } = data;
    const lastMessage: IpersonalMessage = messages[messages.length - 1] || {
      owned: false,
      check: true,
      time: new Date(),
      text: '',
    };

    const nameTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '24px',
      color: '#692e96'
    };
    
    const messageTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '20px',
      color: '#8f4804',
      wordWrap: { width: bgWidth - 40 }
    };

    const timeTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '16px',
      color: '#63527F',
      align: 'left'
    };
    
    const statusSettings: IstatusSettings = this.scene.getStatusSettings(status);
    const nameText: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, name, nameTextStyle).setDepth(2).setOrigin(0, 1);
    const nameTextGeom: Phaser.Geom.Rectangle = nameText.getBounds();

    const message: string = lastMessage.text.length > 100 ? lastMessage.text.substr(0, 97) + '...' : lastMessage.text;

    const messageText: Phaser.GameObjects.Text = this.scene.add.text(nameTextGeom.left, nameTextGeom.bottom, message, messageTextStyle).setDepth(2).setOrigin(0);
    const messageTextGeom: Phaser.Geom.Rectangle = messageText.getBounds();
    
    const bgHeight: number = nameTextGeom.height + messageTextGeom.height + 50;
    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(nameTextGeom.left - 20, nameTextGeom.top - 20, bgWidth, bgHeight, 'chat-foreign-message-bg', 20).setOrigin(0);
    const bgGeom: Phaser.Geom.Rectangle = bg.getBounds();
    const date: string = this.getDate(lastMessage.time);
    const time: Phaser.GameObjects.Text = this.scene.add.text(bgGeom.left + 15, bgGeom.bottom, date, timeTextStyle).setOrigin(0);

    if (statusSettings) {
      const x: number = nameTextGeom.width > bgWidth - 80 ? nameTextGeom.left + bgWidth - 80 + 5 : nameTextGeom.right + 5;
      const y: number = nameTextGeom.centerY;
      this.scene.add.sprite(x, y, statusSettings.iconTexture).setVisible(statusSettings.iconVisible).setOrigin(0, 0.5).setScale(0.7);
    }
    const checkNotification: boolean = data.messages.some(el => !el.check);
    if (checkNotification) {
      const pos: Iposition = {
        x: bgGeom.right - 10,
        y: bgGeom.top + 10,
      };
      new Notificator(this.scene, pos).setCount(1);
    }

    nameText.setCrop(0, 0, bgWidth - 80, 500);
    messageText.setCrop(0, 0, bgWidth - 40, 500);
    this.scene.scrollHeight += bgHeight + padding;
    this.scene.scrolling.bottom = this.scene.scrollHeight;

    this.scene.click(bg, () => {
      this.onPersonalClick(data.userId);
    });
  }

  private getDate(data: Date): string {
    const time: Date = new Date(data);
    const year: number = time.getFullYear();
    const month: number = time.getMonth() + 1;
    const day: number = time.getDate();
    const hours: number = time.getHours();
    const minutes: string = time.getMinutes() < 10 ? '0' + time.getMinutes() : String(time.getMinutes());
    const date: string = day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
    return date;
  }

  private onPersonalClick(id: string): void {
    this.scene.state.modal = {
      type: 9,
      chatType: 2,
      chatUserId: id,
    };
    this.scene.scene.stop('Chat');
    const ModalScene: Modal = this.scene.scene.get('Modal') as Modal;
    ModalScene.scene.restart(this.scene.state);
  }
};
