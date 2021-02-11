import Scrolling from '../../../libs/Scrolling';

let img: any = require("./../../../../assets/images/сurrency-bg.png");

class Chat extends Phaser.Scene {
  constructor() {
    super('Chat');
  }

  public state: Istate;
  public scrolling: Scrolling;


  public init(state: Istate): void {
    this.state = state
  }


  public preload():void {
    this.load.image('img', img);
  }

  
  public create(): void {

    console.log(this.game.config.height);

    let cameraOptions = {
      x: 120,
      y: this.cameras.main.centerY - 342 + this.game.scene.keys['Modal'].chatHeight,
      width: 479,
      height: 640,
      wheel: true,
      top: this.game.config.height
    };

    this.scrolling = new Scrolling(this, cameraOptions);
    this.input.on('pointerup', (): void => {
      this.scrolling.enabled = true;
      this.scrolling.wheel = true;
    });

    let graphics: Phaser.GameObjects.Graphics = this.add.graphics()
    .lineStyle(2, 0xF4E404)
    .strokeRect(cameraOptions.x, cameraOptions.y, cameraOptions.width, cameraOptions.height);
    
    for (let i = 0; i < 8; i++) {
      this.add.sprite(cameraOptions.x + 120, cameraOptions.y + 20 + (i * 120), 'img')
    }

  }

}

export default Chat;