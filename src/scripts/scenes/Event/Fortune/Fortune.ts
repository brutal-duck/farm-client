import { shortTime } from '../../../general/basic';
import { clickModalBtn } from '../../../general/clicks';

const bg: string = require('../../../../assets/images/event/fortune/bg.png');
const modal: string = require('../../../../assets/images/event/fortune/modal.png');
const btn: string = require('../../../../assets/images/event/fortune/btn.png');

export default class Fortune extends Phaser.Scene {
  constructor() {
    super('Fortune');
  }

  public state: Istate;
  public endTimeText: Phaser.GameObjects.Text;
  public btn: Phaser.GameObjects.Sprite;
  public btnText1: Phaser.GameObjects.Text;
  public btnText2: Phaser.GameObjects.Text;
  public btnImg: Phaser.GameObjects.Sprite;
  public wheel: Phaser.GameObjects.Sprite;
  public price: number = 10;

  public clickModalBtn = clickModalBtn.bind(this);

  public init(state: Istate): void {
    this.state = state;
  }

  public preload(): void {
    this.load.image('fortune-bg', bg);
    this.load.image('fortune-modal', modal);
    this.load.image('fortune-btn', btn);
  }

  public create(): void {
    console.log('Fortune Create')
    this.state.user.boosts.fortune = 1
    this.createElements();
    this.setListeners();
  }

  public update(): void {
    this.updateElements();
  }

  private createElements(): void {
    this.add.sprite(0, 0, 'fortune-bg').setOrigin(0);
    this.createModal();
    
  }

  private createModal(): void {
    const modalSprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'fortune-modal');
    const modalGeom: Phaser.Geom.Rectangle = modalSprite.getBounds();
    this.endTimeText = this.add.text(modalGeom.centerX, modalGeom.top + 20, `Ярмарка закроется через ${shortTime(this.state.progress.event.endTime, this.state.lang)}`, {
      font: '24px Shadow',
      color: '#000000'
    }).setOrigin(0.5, 0);

    this.btn = this.add.sprite(modalGeom.centerX, modalGeom.centerY, 'fortune-btn');
    this.btnText1 = this.add.text(this.btn.x, this.btn.y, 'купить билетик', {
      font: '16px Shadow',
      color: '#000000',
      align: 'center'
    }).setOrigin(0.5);
    this.btnText2 = this.add.text(this.btnText1.getBounds().centerX, this.btnText1.getBounds().bottom + 5, String(this.price), {
      font: '16px Shadow',
      color: '#000000',
      align: 'center'
    }).setOrigin(0.5, 0);
    this.btnImg = this.add.sprite(this.btnText2.getBounds().right, this.btnText2.getBounds().centerX, 'diamond').setScale(0.10).setOrigin(0, 0.5);

    
  }

  private updateElements(): void {
    if (this.state.user.boosts.fortune > 0 && this.btnText1.text !== 'Играть') {
      this.btnText1.setText('Играть');
      this.btnText2.setText(`Остался ${this.state.user.boosts.fortune}`);
      this.btnImg.setTexture('sheepCoin').setPosition(this.btnText2.getBounds().right, this.btnText2.getBounds().centerY);
    } else if (this.state.user.boosts.fortune <= 0 && this.btnText1.text !== 'Купить билетик') {
      this.btnText1.setText('Купить билетик');
      this.btnText2.setText(String(this.price));
      this.btnImg.setTexture('diamond').setPosition(this.btnText2.getBounds().right, this.btnText2.getBounds().centerY);
    }
  }

  private setListeners(): void {
    const btn: any = {
      btn: this.btn,
      title: this.btnText1,
      text1: this.btnText2,
      img1: this.btnImg
    }
    this.clickModalBtn(btn, () => this.handlerBtn());
  }

  private handlerBtn(): void {
    if (this.state.user.boosts.fortune > 0) {
      this.startScrollWheel();
    } else {
      this.startScrollWheel();
    }
  }

  private startScrollWheel(): void {
    this.tweens.add({
      targets: this.btn,
      duration: 3000,
      angle: '-=180',
      yoyo: true,
      onComplete: this.getPrize,
      onCompleteScope: this,
    })
  }

  private getPrize(): void {
    this.state.user.boosts.fortune -= 1;
    console.log('ПОЛУЧИЛ ПРИИИЗ')
  }
};
