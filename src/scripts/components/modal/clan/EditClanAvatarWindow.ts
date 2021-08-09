import Modal from "../../../scenes/Modal/Modal";
import ClanWindow from './ClanWindow';
import LogoManager, { Icon } from '../../Utils/LogoManager';

export default class EditClanAvatarWindow {
  private window: ClanWindow;
  private scene: Modal;

  private switchBg: Phaser.GameObjects.Sprite;
  private x: number;
  private y: number;
  private avatar: IconfigIcon;
  private icon: Icon;
  private frameBg: Phaser.GameObjects.Sprite;
  private iconBg: Phaser.GameObjects.Sprite;
  private iconFrame: Phaser.GameObjects.Sprite;
  private bgScroller: Scroller;
  private frameScroller: Scroller;
  private iconScroller: Scroller;

  constructor(window: ClanWindow) {
    this.window = window;
    this.scene = window.scene;
    this.init();
    this.createClanFlag();
    this.createSettigs();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.window.headerText.setText(this.scene.state.lang.flagSettings);
  }

  private createSettigs(): void {
    this.initAvatar();
    this.createFlagManager();
    this.createFrameManager();
    this.createIconManager();
  }

  private createFlagManager(): void {
    const pos: Iposition = {
      x: this.x, 
      y: this.y - 130,
    };
    const bg = this.scene.add.nineslice(pos.x, pos.y, this.window.width, 130, 'clan-window-leader-plate', 1).setOrigin(0.5);
    this.scene.add.tileSprite(pos.x, pos.y, 145, 115, 'white-pixel').setTint(0xD06900);
    this.bgScroller = new Scroller(this.scene, pos, 'clan-bg-', this.avatar.bg, this);
  }

  private createFrameManager(): void {
    const pos: Iposition = {
      x: this.x, 
      y: this.y + 10,
    };
    const bg = this.scene.add.nineslice(pos.x, pos.y, this.window.width, 130, 'clan-window-leader-plate', 1).setOrigin(0.5);
    this.scene.add.tileSprite(pos.x, pos.y, 145, 115, 'white-pixel').setTint(0xD06900);
    this.frameBg = this.scene.add.sprite(pos.x, pos.y, `clan-bg-${this.avatar.bg}`).setOrigin(0.5).setScale(0.55);
    this.frameScroller = new Scroller(this.scene, pos, 'clan-frame-', this.avatar.frame, this);
  }

  private createIconManager(): void {
    const pos: Iposition = {
      x: this.x, 
      y: this.y + 150,
    };
    const bg = this.scene.add.nineslice(pos.x, pos.y, this.window.width, 130, 'clan-window-leader-plate', 1).setOrigin(0.5);
    this.scene.add.tileSprite(pos.x, pos.y, 145, 115, 'white-pixel').setTint(0xD06900);
    this.iconBg = this.scene.add.sprite(pos.x, pos.y, `clan-bg-${this.avatar.bg}`).setOrigin(0.5).setScale(0.55);
    this.iconFrame = this.scene.add.sprite(pos.x, pos.y, `clan-frame-${this.avatar.frame}`).setOrigin(0.5).setScale(0.55);
    this.iconScroller = new Scroller(this.scene, pos, 'clan-icon-', this.avatar.icon, this);
  }


  private createClanFlag(): void {
    const buttonTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      color: '#fffdfa',
      fontSize: '19px',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };
    
    this.initAvatar();
    const saveBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x - 100, this.y + 285, 'profile-window-button-green').setScale(1.2);
    const saveBtnText: Phaser.GameObjects.Text = this.scene.add.text(saveBtn.x, saveBtn.y - 5, 'Сохранить', buttonTextStyle).setOrigin(0.5);
    const randomBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x + 100, this.y + 285, 'profile-window-button-red').setScale(1.2);
    const randomBtnText: Phaser.GameObjects.Text = this.scene.add.text(randomBtn.x, randomBtn.y - 5, 'Случайно', buttonTextStyle).setOrigin(0.5);

    // this.scene.clickModalBtn({ btn: saveBtn, title: saveBtnText }, () => { this.getNewIcon(); });

    this.scene.clickModalBtn({ btn: randomBtn, title: randomBtnText }, () => { this.onRandomBtn(); });
  }

  private initAvatar(): void {
    this.avatar = {
      bg: Phaser.Math.Between(1, 14),
      frame: Phaser.Math.Between(1, 10),
      icon: Phaser.Math.Between(1, 12),
    };
  }

  public setBg(bg: number): void {
    this.frameBg.setTexture(`clan-bg-${bg}`); 
    this.iconBg.setTexture(`clan-bg-${bg}`); 
  }

  public setFrame(frame: number): void {
    this.iconFrame.setTexture(`clan-frame-${frame}`); 
  }

  private onRandomBtn(): void {
    if (!this.bgScroller.checkAnim() && !this.frameScroller.checkAnim() && !this.iconScroller.checkAnim()) {
      this.initAvatar();
      this.bgScroller.setActive(this.avatar.bg);
      this.frameScroller.setActive(this.avatar.frame);
      this.iconScroller.setActive(this.avatar.icon);
    }
  }
}

class Scroller {
  private _scene: Modal;
  private _active: number;
  private _textureKey: string;
  private _array: Array<number>;
  private _previous: number;
  private _rightBtn: Phaser.GameObjects.Sprite;
  private _leftBtn: Phaser.GameObjects.Sprite;
  private _pos: Iposition;
  private _anim: Phaser.Tweens.Tween;
  private _arraySprites: Array<Phaser.GameObjects.Sprite> = [];
  private _mask: Phaser.Display.Masks.GeometryMask;
  private _window: EditClanAvatarWindow;

  constructor(scene: Modal, pos: Iposition, textureKey: string, start: number, window: EditClanAvatarWindow) {
    this._scene = scene;
    this._textureKey = textureKey;
    this._active = start;
    this._pos = pos;
    this._window = window;
    this.initArray();
    this.createMask();
    this.createElements();
  }

  private initArray(): void {
    const textures = Object.keys(this._scene.textures.list).filter(el => el.includes(this._textureKey));
    this._array = textures.map(el => Number(el.replace(this._textureKey, '')));
  }

  private createElements(): void {
    this.createBtns();
    this.createSprites();
  }

  private createBtns(): void {
    this._leftBtn = this._scene.add.sprite(this._pos.x - 220, this._pos.y, 'chat-arrow');
    this._scene.clickButton(this._leftBtn, () => { this.onLeftBtn(); });
    this._rightBtn = this._scene.add.sprite(this._pos.x + 220, this._pos.y, 'chat-arrow').setFlipX(true);
    this._scene.clickButton(this._rightBtn, () => { this.onRightBtn(); });
  }

  private createSprites(): void {
    let startX: number = -135 * (this._active)

    for (let i = 1; i <= this._array.length; i += 1) {
      startX += 135;
      const sprite = this._scene.add.sprite(this._pos.x + startX, this._pos.y, `${this._textureKey}${i}`).setDepth(2).setScale(0.3);
      if (this._active === i) {
        sprite.setScale(0.55);
      }
      sprite.setMask(this._mask);
      this._arraySprites.push(sprite);
    }
  }
  
  public setActive(active: number): void {
    this._previous = this._active;
    this._active = active;
    if (this._previous !== this._active) {
      this.startAnim();
    }
  }

  private startAnim(): void {
    this.setInactiveSize(this._arraySprites[this._previous - 1]);
    this.setActiveSize(this._arraySprites[this._active - 1]);
    this._anim = this._scene.add.tween({
      targets: this._arraySprites,
      duration: 600,
      x: `+=${(this._previous - this._active) * 135}`,
      ease: 'Power3',
      onStart: (): void => {
        this._leftBtn.setTint(0xc09245);
        this._rightBtn.setTint(0xc09245);
      },
      onComplete: (): void => {
        if (this._textureKey === 'clan-bg-') {
          this._window.setBg(this._active);
        } else if (this._textureKey === 'clan-frame-') {
          this._window.setFrame(this._active);
        }
        this._leftBtn.setTint(0xffffff);
        this._rightBtn.setTint(0xffffff);
        this._anim.remove();
        this._anim = undefined;
      }
    });
    
  }

  private createMask(): void {
    const width: number = 400;
    const height: number = 120;
    const mask: Phaser.GameObjects.Graphics = this._scene.add.graphics().fillRect(this._pos.x - width / 2, this._pos.y - height / 2, width, height).setVisible(false);

    this._mask = mask.createGeometryMask();
  }

  private onLeftBtn(): void {
    if (!this._anim) {
      const newActive: number = this._active - 1 <= 0 ? this._array.length : this._active - 1;
      this.setActive(newActive);
    }
  }

  private onRightBtn(): void {
    if (!this._anim) {
      const newActive: number = this._active + 1 > this._array.length ? 1 : this._active + 1;
      this.setActive(newActive);
    }
  }

  private setInactiveSize(target: Phaser.GameObjects.Sprite): void {
    this._scene.add.tween({
      targets: target,
      duration: 500,
      ease: 'Power3',
      scale: { from: 0.55, to: 0.3 },
    });
  }

  private setActiveSize(target: Phaser.GameObjects.Sprite): void {
    this._scene.add.tween({
      targets: target,
      duration: 500,
      ease: 'Power3',
      scale: { from: 0.3, to: 0.55 },
    });
  }

  public checkAnim = (): boolean => this._anim ? true : false; 
}