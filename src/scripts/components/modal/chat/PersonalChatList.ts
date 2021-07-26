import axios from 'axios';
import Chat from './../../../scenes/Modal/Chat/Main';
import Modal from './../../../scenes/Modal/Modal';
import Notificator from './../../gameObjects/Notificator';
const KEY = '196ea80e3d8a8ef81b09c965d6658b7f';
interface IchatListData {
  _id?: string;
  name: string;
  type: number;
  text: string;
  status: number | string;
  check: boolean;
  time: Date;
  userId: string;
  messages: IpersonalMessage[];
}
export default class PersonalChatList {
  private scene: Chat;
  private messages: Array<IchatListData>;

  constructor(scene: Chat) {
    this.scene = scene;
    this.init();
    this.createElements();
  }

  private init(): void {
    this.scene.scrollHeight = Number(this.scene.game.config.height) - 1200 + 510;
    this.scene.scrolling.bottom = 0;
    this.scene.scrolling.scrollY = 0;
    this.messages = [];
    this.initArray();
  }

  private initArray(): void {
    const personal: IuserPersonalMessage[] = this.scene.state.user.personalMessages;
    const message: Imessage[] = this.scene.state.user.messages;

    message.forEach(el => {
      this.messages.push({
        _id: el._id,
        name: '',
        userId: '',
        type: el.type,
        text: el.text,
        status: el.status,
        check: el.check,
        time: el.time,
        messages: [],
      });
    })

    for (let i = 0; i < personal.length; i += 1) {
      this.messages.push({
        name: personal[i].name,
        userId: personal[i].userId,
        type: 0,
        text: personal[i].messages[personal[i].messages.length - 1].text,
        status: personal[i].status,
        check: personal[i].messages[personal[i].messages.length - 1].check,
        time: personal[i].messages[personal[i].messages.length - 1].time,
        messages: personal[i].messages,
      })
    }
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
    console.log(this.messages);
    this.messages.sort((a, b) => {
      const timeA: number = new Date(a?.time).getTime();
      const timeB: number = new Date(b?.time).getTime();
      return timeB - timeA;
    })
    this.messages.forEach(el => {
      if (el.type === 0) {
        this.createPersonal(el);
      } else if (el.type === 2) {
        this.createClanInvite(el);
      }
    });
    this.scene.state.user.personalMessages.forEach(el => {
    });
  }

  private createPersonal(data: IchatListData): void {
    const padding: number = 35;
    const bgWidth: number = 450;
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 325,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding,
    };
    const { name, status, messages, userId } = data;
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
    const checkNotification: boolean = messages.some(el => !el.check);
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
      this.onPersonalClick(userId);
    });
  }

  private createClanInvite(data: IchatListData): void {
    const padding: number = 35;
    const bgWidth: number = 450;
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 325,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding,
    };

    const btnTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      align: 'center',
      fontSize: '16px',
      color: '#ffe2e2',
      stroke: '#D78A31',
      strokeThickness: 1,
    };

    const messageTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '20px',
      color: '#173cb4',
      wordWrap: { width: bgWidth - 40 }
    };

    const timeTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '16px',
      color: '#63527F',
      align: 'left'
    };
    
    const notificationTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '16px',
      color: '#7b7b7b',
      wordWrap: { width: bgWidth - 40 }
    };

    const splitedText: string[] = data.text.split(',');
    const message: string = `${splitedText[2]} ${this.scene.state.lang.inviteYouClan} "${splitedText[1]}"`;

    const messageText: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y + 30, message, messageTextStyle).setDepth(2).setOrigin(0, 1);
    const messageTextGeom: Phaser.Geom.Rectangle = messageText.getBounds();
    
    let height: number = 0;

    const acceptBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x + 50, messageTextGeom.bottom + 10, 'profile-window-button-green')
      .setOrigin(0, 0)
      .setDepth(2)
      .setVisible(false);
    const acceptBtnGeom: Phaser.Geom.Rectangle = acceptBtn.getBounds();
    const acceptBtnText: Phaser.GameObjects.Text = this.scene.add.text(acceptBtnGeom.centerX, acceptBtnGeom.centerY - 3, this.scene.state.lang.accept, btnTextStyle)
      .setOrigin(0.5)
      .setDepth(2)
      .setVisible(false);

    const declainBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(acceptBtnGeom.right + 40, messageTextGeom.bottom + 10, 'profile-window-button-red')
      .setOrigin(0, 0)
      .setDepth(2)
      .setVisible(false);
    const declainBtnGeom: Phaser.Geom.Rectangle = declainBtn.getBounds();
    const declainBtnText: Phaser.GameObjects.Text = this.scene.add.text(declainBtnGeom.centerX, declainBtnGeom.centerY - 3, this.scene.state.lang.declain, btnTextStyle)
      .setOrigin(0.5)
      .setDepth(2)
      .setVisible(false);

    const text: Phaser.GameObjects.Text = this.scene.add.text(pos.x, messageTextGeom.bottom + 5, this.scene.state.lang.youAcceptInvite, notificationTextStyle)
      .setDepth(2)
      .setVisible(false);

    this.scene.clickModalBtn({ btn: acceptBtn, title: acceptBtnText }, () => { this.onAcceptInvite(data._id); });
    this.scene.clickModalBtn({ btn: declainBtn, title: declainBtnText }, () => { this.onDeclainInvite(data._id); });
    if (data.status === 0 && !this.scene.state.clan) {
      height = acceptBtnGeom.height;
      acceptBtn.setVisible(true);
      acceptBtnText.setVisible(true);
      declainBtn.setVisible(true);
      declainBtnText.setVisible(true);
    } else if (data.status === 1) {
      height = text.getBounds().height;
      text.setVisible(true);
    } else if (data.status === 2) {
      text.setText(this.scene.state.lang.youDeclainInvite);
      text.setVisible(true);
      height = text.getBounds().height;
    } else if (data.status === 3) {
      text.setText(this.scene.state.lang.clanIsFull);
      text.setVisible(true);
      height = text.getBounds().height;
    } else if (this.scene.state.clan) {
      text.setText(this.scene.state.lang.youAreInClan);
      text.setVisible(true);
      height = text.getBounds().height;
    }
    
    const bgHeight: number = messageTextGeom.height + 50 + height;
    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(messageTextGeom.left - 20, messageTextGeom.top - 20, bgWidth, bgHeight, 'chat-clan-message-bg', 20).setOrigin(0);
    const bgGeom: Phaser.Geom.Rectangle = bg.getBounds();
    const date: string = this.getDate(data.time);
    const time: Phaser.GameObjects.Text = this.scene.add.text(bgGeom.left + 15, bgGeom.bottom, date, timeTextStyle).setOrigin(0);

    messageText.setCrop(0, 0, bgWidth - 40, 500);
    this.scene.scrollHeight += bgHeight + padding;
    this.scene.scrolling.bottom = this.scene.scrollHeight;
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

  private onAcceptInvite(id: string): void {
    const message: Imessage = this.scene.state.user.messages.find(el => el._id === id);
    const data = {
      userId: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      clanId: message.text.split(',')[0],
    };
    let login: string = this.scene.state.user.login;
    if (this.scene.state.platform !== 'web' && this.scene.state.platform !== 'android') login = this.scene.state.name;

    axios.post(process.env.API +'/acceptInviteClan', data).then((res): void => {
      const { status } = res.data.result;
      if (res.data.error) {
        if (status === 'limit') {
          message.status = 3;
          this.scene.scene.restart(this.scene.state);
        }
      } else {
        console.log(res.data.result)
        if (res.data.result.id) {
          message.status = 1;
          this.scene.state.user.clanId = res.data.result.id;
          this.scene.state.clan = res.data.result;
  
          this.scene.state.socket.io.emit('joinClanRoom', {
            clanId: this.scene.state.user.clanId,
          });
          this.scene.state.socket.io.emit('sendClanMessage', {
            id: this.scene.state.user.id,
            clanId: this.scene.state.user.clanId,
            message: KEY,
            userName: login,
            userStatus: this.scene.state.user.status,
          });
          this.scene.scene.stop('Modal');
          this.scene.scene.stop();
          this.scene.scene.launch('Modal', this.scene.state);
        }
      }
    });    
  }
  
  private onDeclainInvite(id: string): void {
    const message: Imessage = this.scene.state.user.messages.find(el => el._id === id);
    message.status = 2;
    this.scene.scene.restart(this.scene.state);
  }
};
