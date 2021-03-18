import Scrolling from '../../../libs/Scrolling';
import axios from 'axios';
import { getStatusSettings } from '../../../general/basic';

let tile1: any = require("./../../../../assets/images/chat-tile-1.png");
let tile2: any = require("./../../../../assets/images/chat-tile-2.png");
let corner1: any = require("./../../../../assets/images/chat-corner-1.png");
let corner2: any = require("./../../../../assets/images/chat-corner-2.png");

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
  public lastMsgFromUser: string;
  public msg: Ichat[];
  public ready: boolean;

  public getStatusSettings = getStatusSettings.bind(this);

  public init(state: Istate): void {

    this.state = state
    this.scrollHeight = Number(this.game.config.height) - 1200 + 562;
    this.windowHeight = 646;
    this.windowWidth = 479;
    this.isFirstBuild = true
    this.textWrap = 340;
    this.lastMsgFromUser;
    this.ready = false;

    this.msg = [];

    const data = { 
      id: this.state.user.id,
      hash: this.state.user.hash,
      counter: this.state.user.counter,
      type: 1
    }
    axios.post(process.env.API + "/getLastMessages", data)
    .then((res) => {
      if (!res.data.error) {
        this.state.chat = [];
        for (let i: number = res.data.messages.length - 1; i >= 0; i--) {
          this.state.chat.push(res.data.messages[i]);
        }
        this.ready = true;
      }
    })

  }

  public preload(): void {
    this.load.image('tile1', tile1);
    this.load.image('tile2', tile2);
    this.load.image('corner1', corner1);
    this.load.image('corner2', corner2);
  }

  
  public create(): void {    
    
    this.height = Number(this.game.config.height)
    
    let cameraOptions: IScrollingOptions = {
      x: 120,
      y: this.cameras.main.centerY - 347 + this.game.scene.keys['Modal'].chatHeight,
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

  public update(): void {
    if (this.state.chat.length > this.msg.length && this.ready) {

      let index: number = this.state.chat.length - (this.state.chat.length - this.msg.length); // Индекс ненапечатанного сообщения

      for (let i: number = index; i < this.state.chat.length; i++) {
      
        this.msg.push(this.state.chat[i])
        this.newMsg(this.state.chat[i])

      }
      
    }
  }


  public newMsg(msgData: Ichat) {
    let time: Date = new Date(Number(msgData.time) * 1000);
    let year: number = time.getFullYear();
    let month: number = time.getMonth() + 1;
    let day: number = time.getDate();
    let date: string = day + '.' + month + '.' + year;

    if (msgData.login === this.state.user.login) {

      // СООБЩЕНИЯ ПОЛЬЗОВАТЕЛЯ
      let padding: number = 18;
      if (this.lastMsgFromUser !== msgData.login) padding += 20;
  
      // Текст исходящего сообщения
      let outputText: Phaser.GameObjects.Text = this.add.text(this.windowWidth - this.textWrap - 24,  this.windowHeight + this.scrollHeight + padding, msgData.text, {
        font: '21px Bip',
        color: '#FADAC1',
        align: 'left',
        wordWrap: { width: this.textWrap }
      })
        .setOrigin(0, 0)
        .setDepth(2);
      
      let textHeight: number = outputText.getBounds().height;
      outputText.setCrop(0, 0, this.textWrap - 5, textHeight);
      let textWidth: number = outputText.getBounds().width;
            
      // Текст Ника
      if (this.lastMsgFromUser !== msgData.login) {
  
        let nicknameText: Phaser.GameObjects.Text = this.add.text(32, outputText.y - 34, msgData.login, {
          font: '18px Shadow',
          color: '#63527F',
          align: 'right'
        })
        .setOrigin(0)
        .setCrop(0, 0, this.windowWidth - 40, 100)
        .setDepth(1);
  
        let nicknameTextWidth: number = nicknameText.getBounds().width;
        if (nicknameTextWidth < 479) nicknameText.setX(this.windowWidth - nicknameTextWidth - 10);
                
      }

      // Время исходящего сообщения
      let timeText: Phaser.GameObjects.Text = this.add.text(this.windowWidth - 24, outputText.y + textHeight + 36, date, {
        font: '16px Shadow',
        color: '#FADAC1',
        align: 'right'
      })
      .setOrigin(1)
      .setDepth(2);
  
      let timeWidth: number = timeText.getBounds().width;
      
  
      // Определяем размер и положение плашки и текста
      let bgX: number = outputText.x - 14;
      let bgWidth: number = textWidth;
  
      if (textWidth > 364) bgWidth = 336;
      else {
        outputText.setX(this.windowWidth - textWidth - 24);
        bgX = outputText.x - 14;
      }

      // Минимальный размер и положение плашки
      if (textWidth < timeWidth - 10) {
        timeText.setX(this.windowWidth - 14);
        // bgWidth = timeWidth
        // bgX = timeText.x - timeWidth - 14
      }
      
      const status: IstatusSettings = this.getStatusSettings(msgData.status);

      if (status) {
        this.add.sprite(bgX - 12, this.windowHeight + this.scrollHeight + padding, status.iconTexture).setOrigin(1, 0).setScale(0.8);
      }

      // Фон сообщения
      this.add.tileSprite(bgX + 10, outputText.y - 14, bgWidth + 28 - 20, textHeight + 28, 'tile2').setOrigin(0);
      this.add.tileSprite(bgX, outputText.y - 14 + 10, bgWidth + 28, textHeight + 28 - 20, 'tile2').setOrigin(0);

      let corner1: Phaser.GameObjects.Sprite = this.add.sprite(bgX + 10, outputText.y - 14 + 10, 'corner2').setOrigin(1);
      let corner2: Phaser.GameObjects.Sprite = this.add.sprite(corner1.x + bgWidth + 28 - 20, corner1.y, 'corner2').setOrigin(1).setAngle(90);
      let corner3: Phaser.GameObjects.Sprite = this.add.sprite(corner2.x, corner2.y + textHeight + 28 - 20, 'corner2').setOrigin(1).setAngle(180);
      let corner4: Phaser.GameObjects.Sprite = this.add.sprite(corner1.x, corner3.y, 'corner2').setOrigin(1).setAngle(270);

      
      this.lastMsgFromUser = msgData.login;

      // Добавляем длинну скролла если высота всех сообщений уходит за границу
      this.scrollHeight += textHeight + padding + 40   ;     

      
    } else {

      // ВХОДЯЩИЕ СООБЩЕНИЯ
      let padding: number = 18;
      if (this.lastMsgFromUser !== msgData.login) padding += 20;
      

      // Текст сообщения
      let gettedText: Phaser.GameObjects.Text = this.add.text(24, this.windowHeight + this.scrollHeight + padding, msgData.text, {
        font: '21px Bip',
        color: '#5E340C',
        align: 'left',
        wordWrap: { width: this.textWrap }
      })
      .setOrigin(0)
      .setDepth(2);
      
      let textHeight: number = gettedText.getBounds().height;
      gettedText.setCrop(0, 0, this.textWrap - 5, textHeight);
      let textWidth: number = gettedText.getBounds().width;
      
      // Текст Ника
      if (this.lastMsgFromUser !== msgData.login) {
    
        let nicknameText: Phaser.GameObjects.Text = this.add.text(10, gettedText.y - 34, msgData.login, {
          font: '18px Shadow',
          color: '#63527F',
          align: 'right'
        })
        .setOrigin(0)
        .setCrop(0, 0, this.windowWidth - 40, 100)
        .setDepth(1);  
    
      }

    
      // Время сообщения
      let timeText: Phaser.GameObjects.Text = this.add.text(24, gettedText.y + textHeight + 36, date, {
        font: '16px Shadow',
        color: '#FADAC1',
        align: 'right'
      })
      .setOrigin(0, 1)
      .setDepth(2);
    
      let timeWidth: number = timeText.getBounds().width;
      
    
      // Определяем плашки и текст
      let bgX: number = gettedText.x - 14;
      let bgWidth: number = textWidth;
    
      // Устанавливает минимальный размер и положение плашки
      if (textWidth > 364) bgWidth = 364;
      if (textWidth < timeWidth - 10) {
        timeText.setX(14);
        // bgWidth = timeWidth
        // bgX = timeText.x - timeWidth - 14
      }

      const status: IstatusSettings = this.getStatusSettings(msgData.status);

      if (status) {
        this.add.sprite(bgX + bgWidth + 35, this.windowHeight + this.scrollHeight + padding, status.iconTexture).setOrigin(1, 0).setScale(0.8);
      }

      // Фон сообщения
      let tile: Phaser.GameObjects.TileSprite = this.add.tileSprite(bgX + 10, gettedText.y - 14, bgWidth + 28 - 20, textHeight + 28, 'tile1').setOrigin(0);
      let tile2: Phaser.GameObjects.TileSprite = this.add.tileSprite(bgX, gettedText.y - 14 + 10, bgWidth + 28, textHeight + 28 - 20, 'tile1').setOrigin(0);

      let corner1: Phaser.GameObjects.Sprite = this.add.sprite(bgX + 10, gettedText.y - 14 + 10, 'corner1').setOrigin(1);
      let corner2: Phaser.GameObjects.Sprite = this.add.sprite(corner1.x + bgWidth + 28 - 20, corner1.y, 'corner1').setOrigin(1).setAngle(90);
      let corner3: Phaser.GameObjects.Sprite = this.add.sprite(corner2.x, corner2.y + textHeight + 28 - 20, 'corner1').setOrigin(1).setAngle(180);
      let corner4: Phaser.GameObjects.Sprite = this.add.sprite(corner1.x, corner3.y, 'corner1').setOrigin(1).setAngle(270);


      this.lastMsgFromUser = msgData.login;
      
      // Добавляем длинну скролла
      this.scrollHeight += textHeight + padding + 40;


    }

    this.scrolling.bottom = this.scrollHeight;
    this.scrolling.scrollY = this.scrollHeight;


  }


}

export default Chat;