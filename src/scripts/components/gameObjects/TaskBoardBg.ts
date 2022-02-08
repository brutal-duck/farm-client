const OFFSET_Y = 15 * 2;

export default class TaskBoardBg {
  private top: Phaser.GameObjects.Sprite;
  private mid: Phaser.GameObjects.Sprite;
  private bot: Phaser.GameObjects.Sprite;
  private _y: number;
  public x: number;
  public depth: number;
  private visible: boolean;
  public width: number;
  public height: number;
  private scene: Phaser.Scene;
  private alpha: number;

  constructor(scene: Phaser.Scene, y: number) {
    this.scene = scene;
    this.x = this.scene.cameras.main.centerX;
    this._y = y;
    this.width = 660;
    this.depth = -1;
    this.create();
  }

  public get y(): number {
    return this._y;
  }

  public set y(y: number) {
    this.setY(y);
  }

  public get middle(): Phaser.GameObjects.Sprite {
    return this.mid;
  }

  private create(): void {
    this.bot = this.scene.add.sprite(this.x, this._y, 'task-bar-bot').setOrigin(0.5, 1);
    const geom = this.bot.getBounds();
    this.mid = this.scene.add.sprite(this.x, geom.top, 'task-bar-mid').setDisplaySize(this.width, this.height - OFFSET_Y).setOrigin(0.5, 1);
    this.top = this.scene.add.sprite(this.x, this.mid.getBounds().top, 'task-bar-top').setOrigin(0.5, 1);
  }

  public setDisplaySize(width: number, height: number): this {
    this.height = height;
    this.width = width;
    
    this.mid.setDisplaySize(this.width, this.height - OFFSET_Y);
    this.top.setY(this.mid.getBounds().top);

    return this;
  }

  public setVisible(visibility: boolean): this {
    this.visible = visibility;
    
    this.top.setVisible(this.visible);
    this.mid.setVisible(this.visible);
    this.bot.setVisible(this.visible);

    return this;
  }

  public setDepth(depth: number): this {
    this.depth = depth;
    
    this.top.setDepth(this.depth);
    this.mid.setDepth(this.depth);
    this.bot.setDepth(this.depth);

    return this;
  }

  public setY(y: number): this {
    this._y = y;

    this.bot.setY(this._y);
    this.mid.setY(this.bot.getBounds().top);
    this.top.setY(this.mid.getBounds().top);

    return this;
  }
  
  public setAlpha(alpha: number): this {
    this.alpha = alpha;

    this.bot.setAlpha(this.alpha);
    this.mid.setAlpha(this.alpha);
    this.top.setAlpha(this.alpha);

    return this;
  }

  public setInteractive(): this {
    this.mid.setInteractive();

    return this;
  }

  public removeAllListeners(): this {
    this.mid.removeAllListeners();

    return this;
  }

  public getTopRight(): Phaser.Math.Vector2 {
    return this.top.getTopRight();
  }

  public getTopCenter(): Phaser.Math.Vector2 {
    return this.top.getTopCenter();
  }
};
