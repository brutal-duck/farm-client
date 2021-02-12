import Scrolling from '../../../libs/Scrolling';

let img: any = require("./../../../../assets/images/сurrency-bg.png");

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
  public messageLength: number;
  public maxNameWordLength: number;
  public textWrap: number;
  public lastMsgFromUser: string;
  public userName: string;

  public msg: any;

  public init(state: Istate): void {
    this.state = state
    this.scrollHeight = 640;
    this.windowHeight = 646;
    this.windowWidth = 479;
    this.messageLength = 0;
    this.maxNameWordLength = 450
    this.textWrap = 340;
    this.lastMsgFromUser;
    this.userName = 'user1'


    this.msg = [
      {
        name: 'user1',
        time: '22.22.2222',
        text: '3j4 t-9 93jg vm3 34j fg3 gj 3pg 5646 eee 3653jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 65 356 36n eyhrdhr e5d yeryr'
      },
      {
        name: 'user2user2user2user2user2',
        time: '22.22.2222',
        text: 'k'
      },
      {
        name: 'user3',
        time: '22.22.2222',
        text: '3j4t-9ytut tje dh\n93jgvm3'
      },
      {
        name: 'user3',
        time: '22.22.2222',
        text: '3h\n93jgvm3'
      },
      {
        name: 'user4',
        time: '22.22.2222',
        text: '3j4t-9 93jgvm3 34jfg3 gj3pg wwg3t3t 3geaga a gwe234444444444442343242234444444244 24234234'
      },
      {
        name: 'user1',
        time: '22.22.2222',
        text: 'yeryr'
      },

    ]
  }


  public preload():void {
    this.load.image('img', img);
  }

  
  public create(): void {

    this.height = Number(this.game.config.height);

    let cameraOptions = {
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

    // let graphics: Phaser.GameObjects.Graphics = this.add.graphics()
    // .lineStyle(2, 0xF4E404)
    // .strokeRect(cameraOptions.x, cameraOptions.y, cameraOptions.width, cameraOptions.height);

    let y = this.height;
    for (let i = 0; i < 10; i++) {
      this.add.sprite(cameraOptions.x + 120, y + (i * 100), 'img').setOrigin(0)
      this.add.text(cameraOptions.x + 100, y + (i * 100), String(i + 1)).setOrigin(0)
      if (i !== 0) this.scrollHeight += 100
    }
    
    // Исходящее
    let outputMsgBg = this.add.graphics()
    .fillStyle(0x63527F, 1)
    .fillRoundedRect(100, cameraOptions.height + this.scrollHeight + 4, 370, 60, 24)
    let outputMsg = this.add.graphics()
    .fillStyle(0x6162AD, 1)
    .fillRoundedRect(100, cameraOptions.height + this.scrollHeight, 370, 60, 24)

    this.scrollHeight += 100

    let getedMsgBg = this.add.graphics()
    .fillStyle(0x64527A, 1)
    .fillRoundedRect(10, cameraOptions.height + this.scrollHeight + 4, 370, 60, 24)
    let getedMsg = this.add.graphics()
    .fillStyle(0xFADAC1, 1)
    .fillRoundedRect(10, cameraOptions.height + this.scrollHeight, 370, 60, 24)

    this.scrollHeight += 100

    this.buildMessages()

    this.scrolling.bottom = this.scrollHeight
    this.scrolling.scrollY =  this.scrollHeight

  }

  public update(): void {

  }


  
  public buildMessages(): void {

    for (let i in this.msg) {
      
      if (this.msg[i].name === this.userName) {

        // СООБЩЕНИЯ ПОЛЬЗОВАТЕЛЯ
        let padding: number = 32
        if (this.lastMsgFromUser !== this.msg[i].name) padding = 8
    
        // Текст исходящего сообщения
        let outputText: Phaser.GameObjects.Text = this.add.text(this.windowWidth - this.textWrap - 24, this.windowHeight + this.scrollHeight + padding, this.msg[i].text + 'kjlk', {
          font: '19px Shadow',
          color: '#FADAC1',
          align: 'left',
          wordWrap: { width: this.textWrap }
        })
        .setOrigin(0, 0)
        .setCrop(0, 0, this.textWrap - 5, 100)
        .setDepth(1)
        
        let textHeight: number = outputText.getBounds().height
        let textWidth: number = outputText.getBounds().width
        
    
        // Текст Ника
        if (this.lastMsgFromUser !== this.msg[i].name) {
    
          let nicknameText: Phaser.GameObjects.Text = this.add.text(32, outputText.y - 34, this.msg[i].name, {
            font: '18px Shadow',
            color: '#63527F',
            align: 'right'
          })
          .setOrigin(0, 0)
          .setCrop(0, 0, this.windowWidth - 40, 100)
          .setDepth(1)
    
          let nicknameTextWidth: number = nicknameText.getBounds().width
          if (nicknameTextWidth < 479) nicknameText.setX(this.windowWidth - nicknameTextWidth - 10)
    
        }
    
    
        // Время исходящего сообщения
        let timeText: Phaser.GameObjects.Text = this.add.text(this.windowWidth - 24, outputText.y + textHeight + 36, this.msg[i].time, {
          font: '16px Shadow',
          color: '#FADAC1',
          align: 'right'
        })
        .setOrigin(1)
        .setDepth(1)
    
        let timeHeight: number = timeText.getBounds().height
        let timeWidth: number = timeText.getBounds().width
        
    
        // Определяем размер и положение плашки и текста
        let bgX: number = outputText.x - 14
        let bgWidth: number = textWidth
        let bgRound: number = 24
    
        if (textWidth > 364) bgWidth = 336
        else {
          outputText.setX(this.windowWidth - textWidth - 24)
          bgX = outputText.x - 14
        }
        // Минимальный размер и положение плашки
        if (textWidth < timeWidth - 10) {
          timeText.setX(this.windowWidth - 14)
          // bgWidth = timeWidth
          // bgX = timeText.x - timeWidth - 14
          bgRound = 12
        }
    
        // Фон сообщения
        let outputMsgBg = this.add.graphics()
        .fillStyle(0x63527F, 1)
        .fillRoundedRect(bgX, outputText.y - 14 + 4, bgWidth + 28, textHeight + 28, bgRound)
        let outputMsg = this.add.graphics()
        .fillStyle(0x6162AD, 1)
        .fillRoundedRect(bgX, outputText.y - 14, bgWidth + 28, textHeight + 28, bgRound)
        
        this.lastMsgFromUser = this.msg[i].name
    
        // Добавляем длинну скролла
        this.scrollHeight += textHeight + timeHeight + padding * 2

      } else {

        // ВХОДЯЩИЕ СООБЩЕНИЯ
        let padding: number = 34
        // if (this.lastMsgFromUser !== this.msg[1].name) padding = 20
        
        // Текст сообщения
        let gettedText: Phaser.GameObjects.Text = this.add.text(24, this.windowHeight + this.scrollHeight + padding, this.msg[i].text, {
          font: '19px Shadow',
          color: '#5E340C',
          align: 'left',
          wordWrap: { width: this.textWrap }
        })
        .setOrigin(0)
        .setCrop(0, 0, this.textWrap - 5, 100)
        .setDepth(1)
        
        let textHeight: number = gettedText.getBounds().height
        let textWidth: number = gettedText.getBounds().width
      
        // Текст Ника
        // if (this.lastMsgFromUser !== this.msg[0].name) {
      
          let nicknameText: Phaser.GameObjects.Text = this.add.text(10, gettedText.y - 34, this.msg[i].name, {
            font: '18px Shadow',
            color: '#FADAC1',
            align: 'right'
          })
      
          .setOrigin(0)
          .setCrop(0, 0, this.windowWidth - 40, 100)
          .setDepth(1)    
      
        // }
      
        // Время сообщения
        let timeText: Phaser.GameObjects.Text = this.add.text(24, gettedText.y + textHeight + 20, this.msg[i].time, {
          font: '16px Shadow',
          color: '#FADAC1',
          align: 'right'
        })
        .setOrigin(0)
        .setDepth(1)
      
        let timeHeight: number = timeText.getBounds().height
        let timeWidth: number = timeText.getBounds().width
        
      
        // Определяем плашки и текст
        let bgX: number = gettedText.x - 14
        let bgWidth: number = textWidth
        let bgRound: number = 24
      
        if (textWidth > 364) bgWidth = 364
        // Устанавливает минимальный размер и положение плашки
        if (textWidth < timeWidth - 10) {
          timeText.setX(14)
          // bgWidth = timeWidth
          // bgX = timeText.x - timeWidth - 14
          bgRound = 12
        }
      
        // Фон сообщения
        let gettedMsgBg = this.add.graphics()
        .fillStyle(0x63527F, 1)
        .fillRoundedRect(bgX, gettedText.y - 14 + 4, bgWidth + 28, textHeight + 28, bgRound)
        let gettedMsg = this.add.graphics()
        .fillStyle(0xFADAC1, 1)
        .fillRoundedRect(bgX, gettedText.y - 14, bgWidth + 28, textHeight + 28, bgRound)
      
        this.lastMsgFromUser = this.msg[i].name
        
        // Добавляем длинну скролла
        this.scrollHeight += textHeight + timeHeight + padding * 2

        
      }


    }

    
  }


}

export default Chat;