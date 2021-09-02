export default class LogoManager {
  private static getClanTexture(scene: Phaser.Scene, { bg, frame, icon }: IconfigIcon): string {
    const check = Object.keys(scene.textures.list).find(el => el ===`clan-texture-${bg}-${frame}-${icon}`);
    if (!check) {
      const height: number = 210;
      const width: number = 262;
      const config: Phaser.Types.GameObjects.RenderTexture.RenderTextureConfig = {
        x: 0,
        y: 0,
        width,
        height,
      };

      const rt: Phaser.GameObjects.RenderTexture = scene.make.renderTexture(config, false);
      const spriteBg: Phaser.GameObjects.Sprite = scene.make.sprite({ key: `clan-bg-${bg}`, origin: 0.5, scale: 1.05 }, false);
      const spriteFrame: Phaser.GameObjects.Sprite = scene.make.sprite({ key: `clan-frame-${frame}`, origin: 0.5 }, false);
      const spriteIcon: Phaser.GameObjects.Sprite = scene.make.sprite({ key: `clan-icon-${icon}`, origin: 0.5 }, false);

      rt.draw(spriteBg, width / 2, height / 2);
      rt.draw(spriteFrame,width / 2, height / 2);
      rt.draw(spriteIcon, width / 2, height / 2);
      
      var texture: Phaser.Textures.Texture = rt.saveTexture(`clan-texture-${bg}-${frame}-${icon}`);
      return texture.key;
    }
    return `clan-texture-${bg}-${frame}-${icon}`;
  }

  public static createIcon(scene: Phaser.Scene, x: number, y: number, { bg, frame, icon }: IconfigIcon): Icon {
    const texture: string = this.getClanTexture(scene, { bg, frame, icon });
    return new Icon(scene, x, y, texture);
  };

  public static createFlag(scene: Phaser.Scene, x: number, y: number, { bg, frame, icon }: IconfigIcon): Phaser.GameObjects.Sprite {
    const texture: string = this.getClanTexture(scene, { bg, frame, icon });
    const sprite = scene.add.sprite(x, y, texture);
    return sprite;
  };
};

export class Icon {
  private _frame: Phaser.GameObjects.Sprite;
  private _mask: Phaser.GameObjects.Sprite;
  private _sprite: Phaser.GameObjects.Sprite;
  private _scale: number;
  private _y: number;
  private _x: number;
  private _mainTexture: string;
  private _scene: Phaser.Scene;
  private _depth: number;
  private _basicSize: number = 190;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    this._scene = scene;
    this._x = x;
    this._y = y;
    this._depth = 1;
    this._scale = 1;
    this._mainTexture = texture;
    this.createElements();
  }

  private createElements(): void {
    this._mask = this._scene.add.sprite(this._x, this._y,'clan-window-medal')
      .setDisplaySize(this._basicSize * this._scale, this._basicSize * this._scale)
      .setVisible(false);
    const mask = new Phaser.Display.Masks.BitmapMask(this._scene, this._mask);
    this._sprite = this._scene.add.sprite(this._x, this._y, this._mainTexture).setMask(mask);
    this._frame = this._scene.add.sprite(this._x, this._y, 'clan-main-frame');
  }

  public setY(y: number): Icon {
    this._y = y;
    this._mask.setY(this._y);
    this._sprite.setY(this._y);
    this._frame.setY(this._y);
    return this;
  }

  public setX(x: number): Icon {
    this._x = x;
    this._mask.setX(this._x);
    this._sprite.setX(this._x);
    this._frame.setX(this._x);
    return this;
  }

  public setDepth(depth: number): Icon {
    this._depth = depth;
    this._mask.setDepth(this._depth);
    this._sprite.setDepth(this._depth);
    this._frame.setDepth(this._depth);
    return this;
  }

  public setScale(scale: number): Icon {
    this._scale = scale;
    this._mask.setDisplaySize(this._basicSize * scale, this._basicSize * scale);
    this._sprite.setScale(this._scale);
    this._frame.setScale(this._scale);
    return this;
  }

  public getBounds(): Phaser.Geom.Rectangle {
    return this._frame.getBounds();
  }

  public get y(): number {
    return this._y;
  }

  public get x(): number {
    return this._x;
  }

  public get texture(): string {
    return this._mainTexture;
  }

  public setVisible(visible: boolean): this {
    this._mask.setVisible(visible);
    this._sprite.setVisible(visible);
    this._frame.setVisible(visible);
    return this;
  }

  public destroy(): void {
    this._mask.destroy();
    this._sprite.destroy();
    this._frame.destroy();
  }

}