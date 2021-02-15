import Scrolling from '../../../libs/Scrolling';
import axios from 'axios';

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

  public init(state: Istate): void {

    this.state = state
    this.scrollHeight = 562;
    this.windowHeight = 646;
    this.windowWidth = 479;
    this.isFirstBuild = true
    this.textWrap = 340;
    this.lastMsgFromUser;

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
        for (let i: number = res.data.messages.length - 1; i > 0; i--) {
          this.state.chat.push(res.data.messages[i]);
        }
  
      }
    })

  }

  
  public create(): void {    
    
    this.height = Number(this.game.config.height)
    
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
    

    // this.add.graphics().lineStyle(2, 0xF4E404).strokeRect(cameraOptions.x, cameraOptions.y, this.windowWidth, this.scrollHeight - (this.allMsgsHeight + this.windowHeight));


    // let cursors = this.input.keyboard.createCursorKeys();
    // cursors.space.on('down', (): void => {

    //   this.state.chat.push({
    //     login: 'user3',
    //     time: '22.22.2222',
    //     text: '3j4t-9ytut tje dh\n93jgvm3',
    //     id: 'adeq'
    //   });
  
    // });

  }

  public update(): void {
    if (this.state.chat.length > this.msg.length) {

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


    if (msgData.id === this.state.user.id) {


      // СООБЩЕНИЯ ПОЛЬЗОВАТЕЛЯ
      let padding: number = 18
      if (this.lastMsgFromUser !== msgData.login) padding += 20
  
      // Текст исходящего сообщения
      let outputText: Phaser.GameObjects.Text = this.add.text(this.windowWidth - this.textWrap - 24,  this.windowHeight + this.scrollHeight + padding, msgData.text, {
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
      if (this.lastMsgFromUser !== msgData.login) {
  
        let nicknameText: Phaser.GameObjects.Text = this.add.text(32, outputText.y - 34, msgData.login, {
          font: '18px Shadow',
          color: '#63527F',
          align: 'right'
        })
        .setOrigin(0)
        .setCrop(0, 0, this.windowWidth - 40, 100)
        .setDepth(1)
  
        let nicknameTextWidth: number = nicknameText.getBounds().width
        if (nicknameTextWidth < 479) nicknameText.setX(this.windowWidth - nicknameTextWidth - 10)
  
      }

  
      // Время исходящего сообщения
      let timeText: Phaser.GameObjects.Text = this.add.text(this.windowWidth - 24, outputText.y + textHeight + 36, date, {
        font: '16px Shadow',
        color: '#FADAC1',
        align: 'right'
      })
      .setOrigin(1)
      .setDepth(1)
  
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
      
      this.lastMsgFromUser = msgData.login

      // Добавляем длинну скролла если высота всех сообщений уходит за границу
      this.scrollHeight += textHeight + padding + 40        

      
    } else {

      // ВХОДЯЩИЕ СООБЩЕНИЯ
      let padding: number = 18
      if (this.lastMsgFromUser !== msgData.login) padding += 20
      

      // Текст сообщения
      let gettedText: Phaser.GameObjects.Text = this.add.text(24, this.windowHeight + this.scrollHeight + padding, msgData.text, {
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
      if (this.lastMsgFromUser !== msgData.login) {
    
        let nicknameText: Phaser.GameObjects.Text = this.add.text(10, gettedText.y - 34, msgData.login, {
          font: '18px Shadow',
          color: '#63527F',
          align: 'right'
        })
        .setOrigin(0)
        .setCrop(0, 0, this.windowWidth - 40, 100)
        .setDepth(1)    
    
      }

    
      // Время сообщения
      let timeText: Phaser.GameObjects.Text = this.add.text(24, gettedText.y + textHeight + 36, date, {
        font: '16px Shadow',
        color: '#FADAC1',
        align: 'right'
      })
      .setOrigin(0, 1)
      .setDepth(1)
    
      let timeWidth: number = timeText.getBounds().width
      
    
      // Определяем плашки и текст
      let bgX: number = gettedText.x - 14
      let bgWidth: number = textWidth
      let bgRound: number = 24
    
      // Устанавливает минимальный размер и положение плашки
      if (textWidth > 364) bgWidth = 364
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
    
      this.lastMsgFromUser = msgData.login
      
      // Добавляем длинну скролла
      this.scrollHeight += textHeight + padding + 40

      
    }

    this.scrolling.bottom = this.scrollHeight
    this.scrolling.scrollY = this.scrollHeight


  }


}

export default Chat;