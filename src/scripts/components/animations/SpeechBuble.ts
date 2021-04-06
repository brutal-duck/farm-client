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
  *3.	Вызывается в барах, в верхнем правом углу, под монетами.   
*/
export default class SpeechBubble {
  private text: string;
  private type: number;
  private x: number = 120;
  private y: number = 360;
  private width: number = 340;
  private scene: Phaser.Scene;
  private bubble: Phaser.GameObjects.Graphics;
  private bubbleText: Phaser.GameObjects.Text;
  private bubbleFarmer: Phaser.GameObjects.Image;
  private bubbleBg: Phaser.GameObjects.Graphics;
  private triangleCoords: ItriangleCoords = {
    point1X: 340,
    point1Y: 40,
    point2X: 340,
    point2Y: 10,
    point3X: 380,
    point3Y: 20,
  };
  constructor(scene: Phaser.Scene, text: string, type: number = 1) {
    this.text = text;
    this.type = type;
    this.scene = scene;
    this.init();
  }

  static create(scene: Phaser.Scene, text: string, type: number): SpeechBubble {
    return new SpeechBubble(scene, text, type);
  }

  private init(): void {
    this.bubble = this.scene.add.graphics({ x: this.x, y: this.y }).setDepth(this.y + 240);
    this.bubbleBg = this.scene.add.graphics();
    this.bubbleText = this.scene.add.text(0, 0, this.text, {
      font: '24px Bip',
      color: '#823431',
      align: 'left',
      wordWrap: { width: this.width }
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
      this.x = 205;
      this.triangleCoords.point1Y = bubleTextHeight / 2 - 15;
      this.triangleCoords.point2Y = bubleTextHeight / 2 + 15;
      this.triangleCoords.point3Y = bubleTextHeight / 2 + 25;
      this.bubbleFarmer.setPosition(this.scene.cameras.main.width - 20, this.bubble.y - (bubleTextHeight / 2)).setOrigin(1, 0.7).setVisible(true);
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
        .fillRoundedRect(this.bubble.x - 20, this.bubble.y - 20, this.width + this.bubbleFarmer.displayWidth + 60, bubleTextHeight + 40, 16);
    }
  }

  private setAnim(): void {
    const anims: Phaser.Tweens.Tween = this.scene.tweens.add({
      targets: [this.bubble, this.bubbleText, this.bubbleFarmer, this.bubbleBg],
      delay: 3000,
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
  }
  
}
