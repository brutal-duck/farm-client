
import SheepBars from './../../scenes/Sheep/SheepBars';
import ChickenBars from './../../scenes/Chicken/ChickenBars';
import CowBars from './../../scenes/Cow/CowBars';
import UnicornBars from '../../scenes/Event/Unicorns/UnicornBars';
import Fortune from '../../scenes/Fortune';
import BarsScene from './../Scenes/BarsScene';
/**
  *  Советы в барах сцен    
  * 
  *  Конструктор принимает:
  *1. объект сцены; 
  *2. смещение по Y относительно центра; 
  *3. текст;
  *4. время до затухания в секундах.
*/

export default class Hint extends Phaser.GameObjects.Text {
  
  public scene: BarsScene | UnicornBars | Fortune;
  public delay: number;
  public bg: Phaser.GameObjects.Graphics;

  constructor (scene: BarsScene | UnicornBars | Fortune, y: number, text: string, delay: number) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY + y, text, {
      fontFamily: 'Bip',
      fontSize: '35px',
      color: '#FFFFFF',
      wordWrap: { width: 550 },
      align: 'center',
    })
    this.init(scene, delay);
  }

  static create(scene: BarsScene | UnicornBars | Fortune, y: number, text: string, delay: number): Hint {
    const newHint: Hint = new Hint(scene, y, text, delay);

    if (scene.hints.children.entries.length > 0) {
        scene.time.addEvent({
        delay: 400,
        callback: (): void => {
          newHint.setVisible(true);
          newHint.bg.setVisible(true);
        }
      });
    } else {
      newHint.setVisible(true);
      newHint.bg.setVisible(true);
    }

    scene.hints.children.entries.forEach((hint: Hint) => {
      hint?.scrollDown(newHint.height + 40);
    });
    scene.hints.add(newHint);
    return newHint;
  }
  
  private init(scene: BarsScene | UnicornBars | Fortune, delay: number): void {
    this.scene = scene;
    this.delay = delay;
    this.scene.add.existing(this);
    this.setVisible(false);

    this.setDepth(this.y + 1).setStroke('#000000', 5).setOrigin(0.5);
    this.createBg();
    this.faidOutAnim();
  }
  
  private createBg(): void {
    this.bg = this.scene.add.graphics();
    this.bg.fillStyle(0x000000, 0.6)
    .fillRoundedRect(this.x - (this.width + 50) / 2, this.y - (this.height + 20) / 2, this.width + 50, this.height + 20, 20)
    .setDepth(this.y).setVisible(false);
  }

  private faidOutAnim(): void {
    const tween: Phaser.Tweens.Tween = this.scene?.tweens.add({
      delay: this.delay * 1000,
      targets: [ this, this.bg ],
      alpha: 0,
      duration: 300,
      onComplete: () => {
        this.bg.destroy();
        this.destroy();
        tween.remove();
      },
      onCompleteParams: this,
    })
  } 

  private scrollDown(value: number) {
    const tween: Phaser.Tweens.Tween = this.scene?.tweens.add({
      targets: [ this, this.bg ],
      y: `+=${value}`,
      duration: 400,
      onComplete: () => {
        tween.remove();
      },
      onCompleteParams: this,
    })
  }


}