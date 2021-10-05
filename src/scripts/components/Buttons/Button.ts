import Modal from './../../scenes/Modal/Modal';
import Sheep from './../../scenes/Sheep/Main';
import Chicken from './../../scenes/Chicken/Main';
import Cow from './../../scenes/Cow/Main';
import Profile from './../../scenes/Profile';
import Fortune from './../../scenes/Fortune';
import Shop from './../../scenes/Modal/Shop/Main';

export type childrenType = Phaser.GameObjects.Sprite | Phaser.GameObjects.Text | Phaser.GameObjects.TileSprite;
export type scenesType = Modal | Sheep | Chicken | Cow | Profile | Fortune | Shop;

export default class Button extends Phaser.GameObjects.Group {
  public scene: scenesType;
  protected mainSprite: Phaser.GameObjects.Sprite;
  private press: boolean;
  private increase: boolean;
  private action: () => void;
  protected position: Iposition;
  constructor(scene: scenesType, position: Iposition, action: () => void) {
    super(scene);
    this.action = action;
    this.position = position;
    this.init();
  }

  protected init(): void {
    this.scene.add.existing(this);
  }

  public preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

  }

  protected setClickListener(): void {
    if (!this.mainSprite) return;
    this.mainSprite.setInteractive();
    this.mainSprite.on('pointerdown', this.pointerdownHandler, this);
    this.mainSprite.on('pointerout', this.pointeroutHandler, this);
    this.mainSprite.on('pointerup', this.pointerupHandler, this);
  }

  private pointerdownHandler(): void {
    if (this.scene.game.scene.keys[this.scene.state.farm]) {
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.enabled = false;
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.downHandler();
    }

    this.press = true;
    this.increase = false;
    this.setPointerDownAnim();
    this.scene.game.scene.keys[this.scene.state.farm]?.playSoundOnce('click-sound');
  }

  private pointeroutHandler(): void {
    if (this.press) {
      this.press = false;
      this.increase = true;
      this.setPointerOutAnim();
    }
    this.enableScroll();
  }

  private pointerupHandler(): void {
    if (this.press) {
      this.press = false;
      this.increase = true;
      this.setPointerUpAnim();
    }
    this.enableScroll();
  }

  private enableScroll(): void {
    if (this.scene.game.scene.keys[this.scene.state.farm]) this.scene.game.scene.keys[this.scene.state.farm].scrolling.enabled = true;
  }

  private setPointerDownAnim(): void {
    let counter = 0;
    let filter: number = 0xFFFFFF;
    const interval = this.scene.time.addEvent({ delay: 5, callback: () => {
      filter -= 0x222222;
      this.mainSprite.setTint(filter);
      this.mainSprite.y += 1;
      this.children.iterate((el: childrenType) => {
        el.setTint(filter);
        el.y += 1;
      });
      counter++;
      if (counter >= 3) interval.remove(false);
    }, callbackScope: this, loop: true });
  }

  private setPointerOutAnim(): void {
    let counter = 0;
    let filter: number = 0x999999;
    const interval = this.scene.time.addEvent({ delay: 10, callback: () => {
      filter += 0x222222;
      this.mainSprite.setTint(filter);
      this.mainSprite.y -= 1;
      this.children.iterate((el: childrenType) => {
        el.setTint(filter);
        el.y -= 1;
      });
      counter++;
      if (counter >= 3) interval.remove(false);
    }, callbackScope: this, loop: true });
  }

  private setPointerUpAnim(): void {
    let counter = 0;
    let filter: number = 0x999999;
    const interval = this.scene.time.addEvent({ delay: 10, callback: () => {
      filter += 0x222222;
      this.mainSprite.setTint(filter);
      this.mainSprite.y -= 1;
      this.children.iterate((el: childrenType) => {
        el.setTint(filter);
        el.y -= 1;
      });
      counter++;
      if (counter >= 3) {
        interval.remove(false);
        this.action();
      }
    }, callbackScope: this, loop: true });
  }

  public get height(): number {
    return this.mainSprite.height;
  }

  public set y(y: number) {
    this.position.y = y;
    this.children.iterate((el: childrenType) => {
      el.setY(this.position.y - 5);
    });
    this.mainSprite.setY(y);
  }

  public setDepth(depth: number): this {
    super.setDepth(depth);
    this.mainSprite.setDepth(depth);
    return this;
  }

  public get y(): number {
    return this.position.y;
  }

  public setScale(scale: number): this {
    this.mainSprite.setScale(scale);
    return this;
  }

  public set x(x: number) {
    this.position.x = x;
    this.children.iterate((el: childrenType) => {
      el.x = this.position.x - 5;
    });
    this.mainSprite.x = x;
  }

  public get x(): number {
    return this.position.x;
  }
  
  public destroy(): void {
    this.mainSprite.destroy();
    super.destroy(true);
  }

  public getBounds(): Phaser.Geom.Rectangle {
    if (this.mainSprite) return this.mainSprite.getBounds();
    return null;
  }
}