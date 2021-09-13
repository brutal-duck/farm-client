export default class RoundedField {
  public scene: Phaser.Scene;
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public atlasTexture: string;

  public depth: number;
  public alpha: number;
  public originY: number;

  private elements: (Phaser.GameObjects.Sprite | Phaser.GameObjects.TileSprite)[];

  private sideWidth: number;
  private sideHeight: number;
  private angleWidth: number;
  private angleHeight: number;

  private leftTop: Phaser.GameObjects.Sprite;
  private rightTop: Phaser.GameObjects.Sprite;
  private leftBottom: Phaser.GameObjects.Sprite;
  private rightBottom: Phaser.GameObjects.Sprite;
  private middle: Phaser.GameObjects.Sprite;
  private leftBorder: Phaser.GameObjects.Sprite;
  private topBorder: Phaser.GameObjects.Sprite;
  private rigthBorder: Phaser.GameObjects.Sprite;
  private bottomBorder: Phaser.GameObjects.Sprite;

  private expandAni: Phaser.Tweens.Tween;
  private cutDownAni: Phaser.Tweens.Tween;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number,
    atlasTexture: string
  ) {
    // super(scene, 'roundedField')
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.atlasTexture = atlasTexture;
    this.init();
  }


  private init(): void {
    this.depth = 0
    this.depth = 1
    this.originY = 0.5
    this.create();
  }

  private create(): void {
    // const frames = this.scene.textures.get(this.atlasTexture).getFrameNames();
    this.leftTop = this.scene.add.sprite(this.x - this.width / 2, this.y - this.height / 2, this.atlasTexture, 'left-top').setOrigin(0);
    this.rightTop = this.scene.add.sprite(this.x + this.width / 2, this.y - this.height / 2, this.atlasTexture, 'right-top').setOrigin(1, 0);
    this.leftBottom = this.scene.add.sprite(this.x - this.width / 2, this.y + this.height / 2, this.atlasTexture, 'left-bottom').setOrigin(0, 1);
    this.rightBottom = this.scene.add.sprite(this.x + this.width / 2, this.y + this.height / 2, this.atlasTexture, 'right-bottom').setOrigin(1);
    
    this.setSizes();

    this.middle = this.scene.add.sprite(0, 0, this.atlasTexture, 'middle').setDisplaySize(this.sideWidth, this.sideHeight).setOrigin(0);
    this.leftBorder = this.scene.add.sprite(0, 0, this.atlasTexture, 'left-side').setDisplaySize(this.angleWidth, this.sideHeight).setOrigin(0, 0.5);
    this.topBorder = this.scene.add.sprite(0, 0, this.atlasTexture, 'top-side').setDisplaySize(this.sideWidth, this.angleHeight).setOrigin(0.5, 0);
    this.rigthBorder = this.scene.add.sprite(0, 0, this.atlasTexture, 'right-side').setDisplaySize(this.angleWidth, this.sideHeight).setOrigin(1, 0.5);
    this.bottomBorder = this.scene.add.sprite(0, 0, this.atlasTexture, 'bottom-side').setDisplaySize(this.sideWidth, this.angleHeight).setOrigin(0.5, 1);

    this.setMiddleAndBordersPosition();

    this.elements = [
      this.leftTop,
      this.rightTop,
      this.leftBottom,
      this.rightBottom,
      this.middle,
      this.leftBorder,
      this.topBorder,
      this.rigthBorder,
      this.bottomBorder
    ];
  }


  private setSizes(): void {
    this.sideWidth = this.rightTop.getLeftCenter().x - this.leftTop.getRightCenter().x; // длина сторон без учета длинны углов
    this.sideHeight = this.leftBottom.getTopCenter().y - this.leftTop.getBottomCenter().y; // высота сторон без учета высоты углов
    this.angleWidth = this.leftTop.width;
    this.angleHeight = this.leftTop.height;
    this.width = this.sideWidth + this.angleWidth * 2;
    this.height = this.sideHeight + this.angleHeight * 2;
  }


  private setMiddleAndBordersPosition(): void {
    this.middle.setPosition(this.leftTop.getBottomRight().x, this.leftTop.getBottomRight().y);
    this.leftBorder.setPosition(this.leftTop.getBottomLeft().x, this.leftTop.getBottomLeft().y + this.sideHeight / 2);
    this.topBorder.setPosition(this.leftTop.getTopRight().x + this.sideWidth / 2, this.leftTop.getTopRight().y);
    this.rigthBorder.setPosition(this.rightTop.getBottomRight().x, this.rightTop.getBottomRight().y + this.sideHeight / 2);
    this.bottomBorder.setPosition(this.leftBottom.getBottomRight().x + this.sideWidth / 2, this.leftBottom.getBottomRight().y);
  }


  public expand(height: number): void {
    this.expandAni = this.scene.tweens.add({
      targets: [ this.leftTop, this.topBorder, this.rightTop ],
      y: `-=${height}`,
      duration: 2000,
      delay: 1000,
      ease: 'Power2',
      onUpdate: (): void => {
        this.setSizes();
        this.setMiddleAndBordersPosition();
        this.leftBorder.setDisplaySize(this.angleWidth, this.sideHeight);
        this.middle.setDisplaySize(this.sideWidth, this.sideHeight);
        this.rigthBorder.setDisplaySize(this.angleWidth, this.sideHeight);
      },
      onComplete: (): void => { this.cutDown(this.topBorder.y) },
      completeDelay: 1000,
    })
  }
  
  
  public cutDown(height: number): void {
    this.expandAni?.remove();
    height = this.height - height > 100 ? height : this.height - 100

    this.cutDownAni = this.scene.tweens.add({
      targets: [ this.leftTop, this.topBorder, this.rightTop ],
      y: `+=${height}`,
      duration: 2000,
      ease: 'Power2',
      onUpdate: (): void => {
        this.setSizes()
        this.setMiddleAndBordersPosition()
        this.leftBorder.setDisplaySize(this.angleWidth, this.sideHeight);
        this.middle.setDisplaySize(this.sideWidth, this.sideHeight);
        this.rigthBorder.setDisplaySize(this.angleWidth, this.sideHeight);
      },
    })
  }


  public setOriginY(origin: number): this {
    if (origin !== this.originY) {
      if (origin === 0 || origin === 1) this.originY = origin;
      else origin = 0.5;

      this.setPosition();
    }
    return this
  }


  public setPosition(x?: number, y?: number): this {
    this.x = x ? x : this.x
    this.y = y ? y : this.y

    switch (this.originY) {
      case 0: {
        this.leftTop.setPosition(this.leftTop.x, this.y);
        this.rightTop.setPosition(this.rightTop.x, this.y);
        this.leftBottom.setPosition(this.leftBottom.x, this.y + this.height);
        this.rightBottom.setPosition(this.rightBottom.x, this.y + this.height);
        break;
      }

      case 1: {
        this.leftTop.setPosition(this.leftTop.x, this.y - this.height);
        this.rightTop.setPosition(this.rightTop.x, this.y - this.height);
        this.leftBottom.setPosition(this.leftBottom.x, this.y);
        this.rightBottom.setPosition(this.rightBottom.x, this.y);
        break;
      }

      default: {
        this.leftTop.setPosition(this.x - this.width / 2, this.y - this.height / 2);
        this.rightTop.setPosition(this.x + this.width / 2, this.y - this.height / 2);
        this.leftBottom.setPosition(this.x - this.width / 2, this.y + this.height / 2);
        this.rightBottom.setPosition(this.x + this.width / 2, this.y + this.height / 2);
        break;
      }
    }

    this.setMiddleAndBordersPosition();
    return this
  }


  public setX(x: number): this {
    this.setPosition(x);
    return this
  }


  public setY(y: number): this {
    this.setPosition(this.x, y);
    return this
  }


  public setTint(tint: number): this {
    this.elements.forEach(el => el.setTint(tint));
    return this
  }


  public clearTint(): this {
    this.elements.forEach(el => el.clearTint());
    return this;
  }


  public setDepth(depth: number): this {
    this.depth = depth;
    this.elements.forEach(el => el?.setDepth(depth));
    return this
  }


  public setAlpha(alpha: number): this {
    this.alpha = alpha;
    this.elements.forEach(el => el?.setAlpha(alpha));
    return this
  }


  public setInteractive(): this {
    this.elements.forEach(el => el?.setInteractive())
    return this
  }


  public on(event: string, callback: Function): this {
    this.elements.forEach(el => el.on(event, callback))
    return this
  }


  public getCenter(): { x: number, y: number } {
    return { x: this.middle.getCenter().x, y: this.middle.getCenter().y }
  }

  public getTopCenter(): { x: number, y: number } {
    return { x: this.topBorder.getTopCenter().x, y: this.topBorder.getTopCenter().y }
  }

  public getLeftCenter(): { x: number, y: number } {
    return { x: this.leftBorder.getLeftCenter().x, y: this.leftBorder.getLeftCenter().y }
  }
  
  public getRightCenter(): { x: number, y: number } {
    return { x: this.rigthBorder.getRightCenter().x, y: this.rigthBorder.getRightCenter().y }
  }

  public getBottomCenter(): { x: number, y: number } {
    return { x: this.bottomBorder.getBottomCenter().x, y: this.bottomBorder.getBottomCenter().y }
  }


  public destroy(): void {
    this.expandAni?.remove();
    this.cutDownAni?.remove();
    this.elements.forEach(el => el?.destroy());
  }
}