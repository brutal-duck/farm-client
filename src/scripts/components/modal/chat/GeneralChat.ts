import Chat from './../../../scenes/Modal/Chat/Main';
import axios from 'axios';
const KEY: string = 
`6307b55e185c4058b9c12d9d076ddae6
    26cd32b7a7d1d6096528ae647c235d6f
    adde749a4a6c3186a429f98b4c7abe18
    6ec1fb0bf90ee695df541d93ce8ac263
    12a9cd2785f399c0938e15d19b2ce7ba
    47c922da1f077a8508b6fccf572d08c8
    59a38e7c495a71393839f19a2a6dd372
    f7f581c3cb90712919777fc0b3ff232a
    76f8f2b2a7f03cf307f788961513e8c9
    04961f62df30faa6a4ffbc16cfe059b4`;

export default class GeneralChat {
  private scene: Chat;
  private ready: boolean;
  private msg: Array<Ichat>;
  private lastMsgFromUser: string;

  constructor (scene: Chat) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    this.msg = [];
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
      type: 1
    };

    axios.post(process.env.API + "/getLastMessages", data)
      .then((res) => {
        if (!res.data.error) {
          this.scene.state.chat = [];
          for (let i: number = res.data.messages.length - 1; i >= 0; i--) {
            this.scene.state.chat.push(res.data.messages[i]);
          }
          this.ready = true;
        }
      });
  }

  private printNewChatMessages(): void {
    if (this.scene.state.chat.length > this.msg.length && this.ready) {
      const index: number = this.scene.state.chat.length - (this.scene.state.chat.length - this.msg.length); // Индекс ненапечатанного сообщения
      for (let i: number = index; i < this.scene.state.chat.length; i++) {
        this.msg.push(this.scene.state.chat[i]);
        this.newMsg(this.scene.state.chat[i]);
      }
    }
  }

  private newMsg(msgData: Ichat) {
    if (msgData.text.includes(KEY)) {
      this.createFortunePlate(msgData);
    } else if (msgData.login === this.scene.state.user.login || msgData.login === this.scene.state.name) {
      this.createUserMessage(msgData);
    } else {
      this.createForeignMessage(msgData);
    }
    this.scene.scrolling.bottom = this.scene.scrollHeight;
    this.scene.scrolling.scrollY = this.scene.scrollHeight;
  }

  private getDate(msgData: Ichat): string {
    const time: Date = new Date(Number(msgData.time) * 1000);
    const year: number = time.getFullYear();
    const month: number = time.getMonth() + 1;
    const day: number = time.getDate();
    const date: string = day + '.' + month + '.' + year;
    return date;
  }

  private createFortunePlate(msgData: Ichat): void {
    const date: string = this.getDate(msgData);

    const padding: number = 20;
    const prize: string = msgData.text.substring(KEY.length + 1)

    const plate: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 120, this.scene.windowHeight + this.scene.scrollHeight + padding + 40, 'fortune-plate');
    const plateGeom: Phaser.Geom.Rectangle = plate.getBounds();
    const prizeText: Phaser.GameObjects.Text = this.scene.add.text(plateGeom.centerX, plateGeom.centerY - 20, `${this.scene.state.lang.mainPrize} - ${prize}`, {
      font: '18px Shadow',
      color: '#ffd595',
      align: 'center',
      wordWrap: { width: 240 },
    }).setOrigin(0.5);
    
    const prizeGeom: Phaser.Geom.Rectangle = prizeText.getBounds();

    this.scene.add.sprite(prizeGeom.right + 3, prizeGeom.centerY, 'diamond').setScale(0.07).setOrigin(0, 0.5);
    const nameText: Phaser.GameObjects.Text = this.scene.add.text(prizeGeom.centerX, prizeGeom.bottom + 5, `${this.scene.state.lang.taken} ${msgData.login}`, {
      font: '18px Shadow',
      color: '#f9eee1',
    }).setOrigin(0.5, 0);
    
    const nameGeom: Phaser.Geom.Rectangle = nameText.getBounds();

    if (nameGeom.width > 350) {
      nameText.setCrop(0, 0, 350, 40);
      nameText.setOrigin(0);
      nameText.setX(60);
    }

    this.scene.add.text(prizeGeom.centerX, nameGeom.bottom + 5, date, {
      font: '18px Shadow',
      color: '#f2ff25',
    }).setOrigin(0.5, 0);

    this.scene.scrollHeight += plate.getBounds().height + padding;
  }

  private createUserMessage(msgData: Ichat): void {
    const date: string = this.getDate(msgData);
    let padding: number = 18;
    if (this.lastMsgFromUser !== msgData.login) padding += 20;

    // Текст исходящего сообщения
    const outputText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.windowWidth - this.scene.textWrap - 24,  this.scene.windowHeight + this.scene.scrollHeight + padding, msgData.text, {
      font: '21px Bip',
      color: '#FADAC1',
      align: 'left',
      wordWrap: { width: this.scene.textWrap }
    })
      .setOrigin(0, 0)
      .setDepth(2);
      
    let textHeight: number = outputText.getBounds().height;
    outputText.setCrop(0, 0, this.scene.textWrap - 5, textHeight);
    let textWidth: number = outputText.getBounds().width;
          
    // Текст Ника
    if (this.lastMsgFromUser !== msgData.login) {
      const nicknameText: Phaser.GameObjects.Text = this.scene.add.text(32, outputText.y - 34, msgData.login, {
        font: '18px Shadow',
        color: '#63527F',
        align: 'right'
      })
      .setOrigin(0)
      .setCrop(0, 0, this.scene.windowWidth - 40, 100)
      .setDepth(1);

      const nicknameTextWidth: number = nicknameText.getBounds().width;
      if (nicknameTextWidth < 479) nicknameText.setX(this.scene.windowWidth - nicknameTextWidth - 10);   
    }

    // Время исходящего сообщения
    const timeText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.windowWidth - 24, outputText.y + textHeight + 36, date, {
      font: '16px Shadow',
      color: '#FADAC1',
      align: 'right'
    })
    .setOrigin(1)
    .setDepth(2);

    const timeWidth: number = timeText.getBounds().width;
    

    // Определяем размер и положение плашки и текста
    let bgX: number = outputText.x - 14;
    let bgWidth: number = textWidth;

    if (textWidth > 364) bgWidth = 336;
    else {
      outputText.setX(this.scene.windowWidth - textWidth - 24);
      bgX = outputText.x - 14;
    }
    // Минимальный размер и положение плашки
    if (textWidth < timeWidth - 10) {
      timeText.setX(this.scene.windowWidth - 14);
    }
    
    const status: IstatusSettings = this.scene.getStatusSettings(msgData.status);
    if (status) {
      this.scene.add.sprite(bgX - 12, this.scene.windowHeight + this.scene.scrollHeight + padding, status.iconTexture).setOrigin(1, 0).setScale(0.8);
    }
    // Фон сообщения
    this.scene.add.tileSprite(bgX + 10, outputText.y - 14, bgWidth + 8, textHeight + 28, 'tile2').setOrigin(0);
    this.scene.add.tileSprite(bgX, outputText.y - 4, bgWidth + 28, textHeight + 8, 'tile2').setOrigin(0);
    let corner1: Phaser.GameObjects.Sprite = this.scene.add.sprite(bgX + 10, outputText.y - 4, 'corner2').setOrigin(1);
    let corner2: Phaser.GameObjects.Sprite = this.scene.add.sprite(corner1.x + bgWidth + 8, corner1.y, 'corner2').setOrigin(1).setAngle(90);
    let corner3: Phaser.GameObjects.Sprite = this.scene.add.sprite(corner2.x, corner2.y + textHeight + 8, 'corner2').setOrigin(1).setAngle(180);
    let corner4: Phaser.GameObjects.Sprite = this.scene.add.sprite(corner1.x, corner3.y, 'corner2').setOrigin(1).setAngle(270);
    
    this.lastMsgFromUser = msgData.login;
    // Добавляем длинну скролла если высота всех сообщений уходит за границу
    this.scene.scrollHeight += textHeight + padding + 40; 
  }

  private createForeignMessage(msgData: Ichat): void {
    const date: string = this.getDate(msgData);
    let padding: number = 18;
    if (this.lastMsgFromUser !== msgData.login) padding += 20;
    
    const gettedText: Phaser.GameObjects.Text = this.scene.add.text(24, this.scene.windowHeight + this.scene.scrollHeight + padding, msgData.text, {
      font: '21px Bip',
      color: '#5E340C',
      align: 'left',
      wordWrap: { width: this.scene.textWrap }
    }).setOrigin(0)
      .setDepth(2);
    
    const textHeight: number = gettedText.getBounds().height;
    gettedText.setCrop(0, 0, this.scene.textWrap - 5, textHeight);
    const textWidth: number = gettedText.getBounds().width;
    
    // Текст Ника
    if (this.lastMsgFromUser !== msgData.login) {
      const nicknameText: Phaser.GameObjects.Text = this.scene.add.text(10, gettedText.y - 34, msgData.login, {
        font: '18px Shadow',
        color: '#63527F',
        align: 'right'
      }).setOrigin(0)
        .setCrop(0, 0, this.scene.windowWidth - 40, 100)
        .setDepth(1);  
    }
  
  
    // Время сообщения
    const timeText: Phaser.GameObjects.Text = this.scene.add.text(24, gettedText.y + textHeight + 36, date, {
      font: '16px Shadow',
      color: '#FADAC1',
      align: 'right'
    }).setOrigin(0, 1)
      .setDepth(2);
  
    const timeWidth: number = timeText.getBounds().width;
    
  
    // Определяем плашки и текст
    let bgX: number = gettedText.x - 14;
    let bgWidth: number = textWidth;
  
    // Устанавливает минимальный размер и положение плашки
    if (textWidth > 364) bgWidth = 364;
    if (textWidth < timeWidth - 10) timeText.setX(14);
    
    const status: IstatusSettings = this.scene.getStatusSettings(msgData.status);
    if (status) {
      this.scene.add.sprite(bgX + bgWidth + 65, this.scene.windowHeight + this.scene.scrollHeight + padding, status.iconTexture).setOrigin(1, 0).setScale(0.8);
    }
  
    // Фон сообщения
    const tile: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(bgX + 10, gettedText.y - 14, bgWidth + 8, textHeight + 28, 'tile1').setOrigin(0);
    const tile2: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(bgX, gettedText.y - 4, bgWidth + 28, textHeight + 8, 'tile1').setOrigin(0);
  
    const corner1: Phaser.GameObjects.Sprite = this.scene.add.sprite(bgX + 10, gettedText.y - 4, 'corner1').setOrigin(1);
    const corner2: Phaser.GameObjects.Sprite = this.scene.add.sprite(corner1.x + bgWidth + 8, corner1.y, 'corner1').setOrigin(1).setAngle(90);
    const corner3: Phaser.GameObjects.Sprite = this.scene.add.sprite(corner2.x, corner2.y + textHeight + 8, 'corner1').setOrigin(1).setAngle(180);
    const corner4: Phaser.GameObjects.Sprite = this.scene.add.sprite(corner1.x, corner3.y, 'corner1').setOrigin(1).setAngle(270);
  
    this.lastMsgFromUser = msgData.login;
    this.scene.scrollHeight += textHeight + padding + 40;
  }
}