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

  public msg: any;

  public init(state: Istate): void {
    this.state = state
    this.scrollHeight = 640;
    this.windowHeight = 646;
    this.windowWidth = 479;
    this.messageLength = 0;
    this.maxNameWordLength = 450
    this.textWrap = 340;

    this.msg = [
      {
        name: 'user1',
        time: '12:10',
        text: '3j4 t-9 93jg vm3 34j fg3 gj 3pg 5646 eee 3653jjjjjjjjjjjjjjjjjjjjjjjjjjjjjj 65 356 36n eyhrdhr e5d yeryr'
      },
      {
        name: 'user2user2user2user2user2',
        time: '12:12',
        text: 'Ok'
      },
      {
        name: 'user3',
        time: '00:55',
        text: '3j4t-9ytut tje dh\n93jgvm3'
      },
      {
        name: 'user4',
        time: '24:24',
        text: '3j4t-9 93jgvm3 34jfg3 gj3pg wwg3t3t 3geaga a g4'
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
    
    let outputText: Phaser.GameObjects.Text = this.add.text(this.windowWidth - this.textWrap - 20, this.windowHeight + this.scrollHeight + 10, this.msg[0].text, {
      font: '19px Shadow',
      color: '#F7DACA',
      align: 'left',
      wordWrap: { width: this.textWrap }
    })
    .setOrigin(0, 0)
    .setCrop(0, 0, this.textWrap - 5, 100)
    .setDepth(1)

    let textHeight: number = outputText.getBounds().height
    let textWidth: number = outputText.getBounds().width
    console.log(textHeight, textWidth)

    // this.add.graphics()
    // .lineStyle(2, 0xF4E404)
    // .strokeRect(outputText.x, outputText.y, textWidth, textHeight)
    // .setDepth(2)
    
    let bgWidth: number = textWidth
    if (textWidth > 364) bgWidth = 364
    
    let outputMsgBg = this.add.graphics()
    .fillStyle(0x63527F, 1)
    .fillRoundedRect(outputText.x - 14, outputText.y - 14 + 4, bgWidth, textHeight + 28, 24)
    let outputMsg = this.add.graphics()
    .fillStyle(0x6162AD, 1)
    .fillRoundedRect(outputText.x - 14, outputText.y - 14, bgWidth, textHeight + 28, 24)

    this.scrollHeight += textHeight + 56
    
  }

}

export default Chat;