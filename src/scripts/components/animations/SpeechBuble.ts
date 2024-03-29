import BarsScene from './../Scenes/BarsScene';
import Sheep from './../../scenes/Sheep/Main';
import Chicken from './../../scenes/Chicken/Main';
import Cow from './../../scenes/Cow/Main';

interface ItriangleCoords {
  point1X: number;
  point1Y: number;
  point2X: number;
  point2Y: number;
  point3X: number;
  point3Y: number;
}

/**
  * Подсказывающий бабл  
  * Конструктор принимает:  
  * Объект сцены, текст и номер типа куда будет направлен указатель.
  * 
  * Типы: 
  *1.	Указывает на ярмарку;  
  *2.	Указывает на пещеру;   
  *3.	Вызывается в барах, в верхнем правом углу, под монетами;   
  *4. Вызывается в барах, указывает на баланс бар.  
  *5. Вызывается в барах, указывает на комбикормовый бонус.
*/
export default class SpeechBubble {
  private text: string;
  public type: number;
  private x: number = 80;
  private y: number = 360;
  private width: number = 380;
  private scene: BarsScene | Sheep | Chicken | Cow;
  private bubble: Phaser.GameObjects.Graphics;
  private bubbleText: Phaser.GameObjects.Text;
  private bubbleFarmer: Phaser.GameObjects.Image;
  private bubbleBg: Phaser.GameObjects.Graphics;
  public active: boolean;

  private triangleCoords: ItriangleCoords = {
    point1X: 380,
    point1Y: 40,
    point2X: 380,
    point2Y: 10,
    point3X: 420,
    point3Y: 20,
  };

  constructor(scene: BarsScene | Sheep | Chicken | Cow, text: string, type: number = 1) {
    this.text = text;
    this.type = type;
    this.scene = scene;
    this.init();
  }

  static create(scene: BarsScene | Sheep | Chicken | Cow, text: string, type: number): void {
    const barsScene = scene.game.scene.getScene(`${scene.state.farm}Bars`) as BarsScene;
    const mainScene = scene.game.scene.getScene(`${scene.state.farm}`) as Sheep | Chicken | Cow;
    if (barsScene.activeBubble && barsScene.activeBubble.active && barsScene.activeBubble.type !== type) {
      barsScene.activeBubble.destroy();
    }
    if (mainScene.activeBubble && mainScene.activeBubble.active && mainScene.activeBubble.type !== type) {
      mainScene.activeBubble.destroy();
    }
    if ((!barsScene.activeBubble || !barsScene.activeBubble.active) 
      && (!mainScene.activeBubble || !mainScene.activeBubble.active)) {
      scene.activeBubble = new SpeechBubble(scene, text, type);
    }
  }

  private init(): void {
    this.active = true;
    this.bubble = this.scene.add.graphics({ x: this.x, y: this.y }).setDepth(this.y + 240);
    this.bubbleBg = this.scene.add.graphics();
    this.bubbleText = this.scene.add.text(0, 0, this.text, {
      font: '24px Bip',
      color: '#823431',
      align: 'left',
      wordWrap: { width: this.width - 20 }
    }).setDepth(this.y + 240);
    this.bubbleFarmer = this.scene.add.image(0, 0, 'farmer').setScale(0.5).setVisible(false);
        
    this.setPosition();
    this.drawGraphics();
    this.setAnim();
  }

  private setPosition(): void {
    const bubleTextHeight = this.bubbleText.getBounds().height + 40;
    if (this.type === 2) {
      this.y = 220;
      this.x = 260;
      this.triangleCoords.point1X = 0;
      this.triangleCoords.point2X = 0;
      this.triangleCoords.point3X = -40;
    } 
    if (this.type === 3) {
      this.y = 165;
      this.x = 165;
      this.triangleCoords.point1Y = bubleTextHeight / 2 - 15;
      this.triangleCoords.point2Y = bubleTextHeight / 2 + 15;
      this.triangleCoords.point3Y = bubleTextHeight / 2 + 25;
      this.bubbleFarmer.setPosition(this.scene.cameras.main.width - 20, this.y + this.triangleCoords.point2Y).setOrigin(1, 0.5).setVisible(true);
    } 
    if (this.type === 4) {
      this.y = 150;
      this.x = 300;
      this.triangleCoords.point1Y = -15;
      this.triangleCoords.point2Y = 0;
      this.triangleCoords.point3Y = 0;
      this.triangleCoords.point1X = 80;
      this.triangleCoords.point2X = 65;
      this.triangleCoords.point3X = 95;
    }
    if (this.type === 5) {
      this.y = 150;
      this.x = 170;
      this.triangleCoords.point1Y = -15;
      this.triangleCoords.point2Y = 0;
      this.triangleCoords.point3Y = 0;
      this.triangleCoords.point1X = 80;
      this.triangleCoords.point2X = 65;
      this.triangleCoords.point3X = 95;
    }
    this.bubble.setPosition(this.x, this.y);
    this.bubbleText.setPosition(this.x + 20, this.bubble.y + 20);
  }

  private drawGraphics(): void {
    const bubleTextHeight = this.bubbleText.getBounds().height + 40;
    this.bubble.fillStyle(0xFFFFFF, 1);
    this.bubble.fillRoundedRect(0, 0, this.width, bubleTextHeight, 16);
    this.bubble.fillTriangle(
      this.triangleCoords.point1X,
      this.triangleCoords.point1Y,
      this.triangleCoords.point2X,
      this.triangleCoords.point2Y,
      this.triangleCoords.point3X,
      this.triangleCoords.point3Y,
    );
    if (this.type === 3) {
      this.bubbleBg
        .fillStyle(0x000000, 0.5)
        .fillRoundedRect(this.bubble.x - 20, this.bubble.y - 20, this.width + this.bubbleFarmer.displayWidth + 60, bubleTextHeight + 60, 16);
    }
  }

  private setAnim(): void {
    const anims: Phaser.Tweens.Tween = this.scene.tweens.add({
      targets: [this.bubble, this.bubbleText, this.bubbleFarmer, this.bubbleBg],
      delay: 4000,
      duration: 1000,
      alpha: 0,
      ease: 'Power1',
      onComplete: (): void => {
        anims.remove();
        this.destroy();
      },
    });
  }

  private destroy(): void {
    this.bubble?.destroy();
    this.bubbleText?.destroy();
    this.bubbleFarmer?.destroy();
    this.bubbleBg?.destroy();
    this.active = false;
  }
  
}
