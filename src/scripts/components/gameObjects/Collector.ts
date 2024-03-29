import { shortTime } from "../../general/basic";
import UnicornBars from '../../scenes/Event/Unicorns/UnicornBars';
import RoundedProgress from "../animations/RoundedProgress";
import BarsScene from "../Scenes/BarsScene";

/**
  *  Круговой бар собирателя    
  * 
  *  Метод create принимает:
  *1. объект сцены; 
  *2. координату x;
  *3. координату y;
  *4. радиус;
*/
export default class Collector extends Phaser.GameObjects.Text {

  public progressX: number;
  public progressY: number;
  public radius: number;
  public startAngle: number;
  public endAngle: number;
  public color: number;
  public weight: number;
  public scene: UnicornBars | BarsScene;
  public percent: number;
  public bubble: Phaser.GameObjects.Graphics;
  public pulseTimer: number = 0;
  public farmData: IuserSheep | IuserUnicorn | IuserChicken | IuserCow;
  private time: number;
  private progress: RoundedProgress;

  constructor(
    scene: UnicornBars | BarsScene,
    x: number,
    y: number,
    radius: number,
  ) {
    super(scene, 230, scene.height - 43, shortTime(scene.state[`user${scene.state.farm}`].collector, scene.state.lang), {
      fontSize: '28px',
      fontFamily: 'Bip',
      color: '#925C28',
      align: 'center'
    });
    this.progressX = x;
    this.progressY = y;
    this.radius = radius;
    this.startAngle = -1.66;
    this.endAngle = -1.66;
    this.color = 0x89DE3D;
    this.weight = 10;
    this.init();
  }

  static create(scene: UnicornBars | BarsScene, x: number = 400, y: number = 300, radius: number = 40): Collector {
    return new Collector(scene, x, y, radius);
  }

  private init(): void {
    
    this.scene.add.existing(this);
    this.setDepth(this.scene.height);
    this.setOrigin(0.5, 0.5);

    if (this.scene.state.farm === 'Unicorn') {
      this.weight = 15;
      this.color = 0x750296;
    }

    this.percent = 6.3 / 100;
    this.progress = new RoundedProgress(this.scene, this.progressX, this.progressY, 1.25, this.color).setDepth(0);

    const bounds: Phaser.Geom.Rectangle = this.getBounds();
    this.bubble = this.scene.add.graphics({ x: bounds.left - 15, y: bounds.top });
    this.bubble.fillStyle(0xffffff, 1);
    this.bubble.strokeRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);
    this.bubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);

    this.farmData = this.scene.state[`user${this.scene.state.farm}`];
  }

  public preUpdate(): void {

    if (this.time !== this.farmData.collector) {

      this.time = this.farmData.collector;
      let percent: number = 0;
      
      if (this.farmData.collector > 0 && this.farmData.collectorTakenTime > 0) {
        percent = this.farmData.collector / (this.farmData.collectorTakenTime / 100);
      }

      this.progress.setPercent(percent);

      const time: string = shortTime(this.farmData.collector, this.scene.state.lang);
      this.setText(time);
      this.setColor('#925C28');
  
      if (this.bubble.visible) {
        this.bubble.destroy();
        const bounds: Phaser.Geom.Rectangle = this.getBounds();
        this.bubble = this.scene.add.graphics({ x: bounds.left - 15, y: bounds.top });
        this.bubble.fillStyle(0xffffff, 1);
        this.bubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);
      }
    }
    this.setPulseAnimation();
  }

  private setPulseAnimation(): void {
    if ((this.scene.state[`user${this.scene.state.farm}`].collector === 0 
      && this.scene.state.farm !== 'Sheep'
      && this.scene.state.farm !== 'Unicorn') 
      || (this.scene.state[`user${this.scene.state.farm}`].collector === 0 
      && this.scene.state[`user${this.scene.state.farm}`].tutorial >= 100 
      && this.scene.state.farm === 'Sheep') || (
      this.scene.state.userUnicorn?.tutorial > 70 
      && this.scene.state.farm === 'Unicorn' && this.scene.state[`user${this.scene.state.farm}`].collector === 0 
      )) {
      this.pulseTimer++;
      if (this.pulseTimer === 20) this.setPulseColor(false);
      else if (this.pulseTimer === 40) {
        this.pulseTimer = 0;
        this.setPulseColor(true);
      }
    }
  }

  private setPulseColor(status: boolean): void {
    let textColor: string;
    let bubbleColor: number;

    if (status) {
      textColor = '#FFFFFF';
      bubbleColor = 0xC70000;
    } else {
      textColor = '#C70000';
      bubbleColor = 0xFFFFFF;
    }
    
    this.setColor(textColor);
    const bounds = this.getBounds();
    this.bubble.clear();
    this.bubble.fillStyle(bubbleColor, 1);
    this.bubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);
  }
}