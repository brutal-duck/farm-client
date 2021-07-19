export default class Notificator {
  private scene: Phaser.Scene;
  private bg: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private anim: boolean;
  private animBg: Phaser.GameObjects.Sprite;
  private position: Iposition;
  private count: number;
  private visible: boolean;
  private depth: number;

  constructor(scene: Phaser.Scene, position: Iposition, anim?: boolean) { 
    this.scene = scene;
    this.position = position;
    this.anim = anim;
    this.visible = true;
    this.depth = 0;
    this.create();
    if (this.anim) this.setAnim();
  };

  private create(): void {
    const notificationTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '28px',
      color: '#ffffff',
      fontStyle: 'Bold',
    };

    this.animBg = this.scene.add.sprite(this.position.x, this.position.y, 'notification-bg').setDepth(this.depth);
    this.bg = this.scene.add.sprite(this.position.x, this.position.y, 'notification-bg').setDepth(this.depth);
    this.text = this.scene.add.text(this.position.x, this.position.y, '1', notificationTextStyle).setOrigin(0.5).setDepth(this.depth);
  }

  private setAnim(): void {
    this.scene.tweens.add({
      targets: [ this.animBg ],
      scale: { from: 1.05, to: 2 },
      alpha: { from: 0.5, to: 0 },
      duration: 500,
      repeat: -1,
      repeatDelay: 1150,
    });
  }
  
  private setText(text: string | number): void {
    this.text.setText(String(text));
  }

  public setVisible(visible: boolean): void {
    if (this.visible !== visible) {
      this.visible = visible;
      this.animBg.setVisible(this.visible);
      this.bg.setVisible(this.visible);
      this.text.setVisible(this.visible);
    }
  }

  public setCount(count: number): void {
    if (count !== this.count) {
      this.count = count;
      if (this.count <= 0) {
        this.setVisible(false);
      } else {
        this.setText(count);
        this.setVisible(true);
      }
    }
  }

  public setDepth(depth: number): void {
    this.animBg.setDepth(depth);
    this.bg.setDepth(depth);
    this.text.setDepth(depth);
  }
}