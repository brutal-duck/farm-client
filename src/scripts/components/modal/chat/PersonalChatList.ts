import Chat from './../../../scenes/Modal/Chat/Main';

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

  private createElements(): void {
    const data: IuserPersonalMessage = {
      userId: '60d59563df63e60c70517a8d',
      name: 'Вася пупкин',
      status: '',
      messages: [{
        owned: false,
        time: 123,
        text: 'Халоу вам',
        check: false,
      }],
    }

    const data1: IuserPersonalMessage = {
      userId: '60d59563df63e60c70517a8d',
      name: 'Пупкин Вася 123213123',
      status: '',
      messages: [{
        owned: false,
        time: 123,
        text: 'Халоу /* dsakdlaskdlasldkaskdlask ldk askdlas kdlkas;dka;sk sad askd kas;dk  вфывфы фвы вфы вфывф */',
        check: false,
      }],
    }

    const data2: IuserPersonalMessage = {
      userId: '60d59563df63e60c70517a8d',
      name: 'Дмитрий-Владимирович Непупкин',
      status: 'unicorn',
      messages: [{
        owned: false,
        time: 123,
        text: 'Халоу вфывфыв фыв фыв фыв фыв фыв фыв ыфы фв фывф ы вфыв фыв фыв фыв фывфывфыв ыфвыфв фывфы в фыв фыв фы sadashdkj ahskjdhas kjdhaskjhd jkas h jkdhakjdh jkashdsk ah djkashd kjashdkjash djkas hdkjh askjd haskjdhaskjdhasjkhdaskjhdjkashdjkhaskjdhsakjdhsajkhdaskjhkj',
        check: false,
      }],
    }

    const data3: IuserPersonalMessage = {
      userId: '60d59563df63e60c70517a8d',
      name: 'Васёк 228',
      status: 'unicorn',
      messages: [{
        owned: false,
        time: 123213123123,
        text: '123123',
        check: false,
      }],
    }
    this.createPersonal(data);
    this.createPersonal(data3);
    this.createPersonal(data2);
    this.createPersonal(data1);
    this.createPersonal(data2);
    this.createPersonal(data1);
    this.createPersonal(data2);
    this.createPersonal(data3);
    this.createPersonal(data);
    this.createPersonal(data2);
    this.createPersonal(data1);
    this.createPersonal(data2);
    this.createPersonal(data3);
    this.createPersonal(data1);
    this.createPersonal(data);
    this.createPersonal(data3);
    this.createPersonal(data2);
    this.createPersonal(data1);
    this.createPersonal(data2);
    this.createPersonal(data);
    this.createPersonal(data2);
    this.createPersonal(data1);
    this.createPersonal(data);
    this.createPersonal(data3);
  }

  private createPersonal(data: IuserPersonalMessage): void {
    const padding: number = 35;
    const bgWidth: number = 450;
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 325,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding,
    };
    const { name, status, messages } = data;
    const lastMessage: IpersonalMessage = messages[messages.length - 1];

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
    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(nameTextGeom.left - 20, nameTextGeom.top - 20, bgWidth, bgHeight, 'chat-message-bg', 30).setOrigin(0);
    const bgGeom: Phaser.Geom.Rectangle = bg.getBounds();
    const date: string = this.getDate(lastMessage.time);
    const time: Phaser.GameObjects.Text = this.scene.add.text(bgGeom.left + 15, bgGeom.bottom, date, timeTextStyle).setOrigin(0);

    if (statusSettings) {
      const x: number = nameTextGeom.width > bgWidth - 80 ? nameTextGeom.left + bgWidth - 80 + 5 : nameTextGeom.right + 5;
      const y: number = nameTextGeom.centerY;
      this.scene.add.sprite(x, y, statusSettings.iconTexture).setVisible(statusSettings.iconVisible).setOrigin(0, 0.5).setScale(0.7);
    }

    nameText.setCrop(0, 0, bgWidth - 80, 500);
    messageText.setCrop(0, 0, bgWidth - 40, 500);
    this.scene.scrollHeight += bgHeight + padding;
    this.scene.scrolling.bottom = this.scene.scrollHeight;
  }


  private getDate(data: number): string {
    const time: Date = new Date(Number(data) * 1000);
    const year: number = time.getFullYear();
    const month: number = time.getMonth() + 1;
    const day: number = time.getDate();
    const date: string = day + '.' + month + '.' + year;
    return date;
  }
};
