import Modal from "../../../scenes/Modal/Modal";
import ClanWindow from './ClanWindow';
import { Icon } from '../../Utils/LogoManager';
import axios from "axios";
const CHANGE_EMBLEM_COST: number = 200;

export default class EditClanAvatarWindow {
  private window: ClanWindow;
  private scene: Modal;

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
    this.avatar = this.scene.state.clanAvatar;
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
    
    const saveBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x - 100, this.y + 285, 'profile-window-button-green').setScale(1.2);
    const saveBtnText: Phaser.GameObjects.Text = this.scene.add.text(saveBtn.x, saveBtn.y - 5, this.scene.state.lang.saveAvatar, buttonTextStyle).setOrigin(0.5);
    const randomBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x + 100, this.y + 285, 'profile-window-button-red').setScale(1.2);
    const randomBtnText: Phaser.GameObjects.Text = this.scene.add.text(randomBtn.x, randomBtn.y - 5, this.scene.state.lang.random, buttonTextStyle).setOrigin(0.5);

    this.scene.clickModalBtn({ btn: saveBtn, title: saveBtnText }, () => { this.onSaveBtn(); });

    this.scene.clickModalBtn({ btn: randomBtn, title: randomBtnText }, () => { this.onRandomBtn(); });
  }

  private onSaveBtn(): void {
    if (!this.scene.state.user.clanId) {
      this.avatar = {
        bg: this.bgScroller.active,
        frame: this.frameScroller.active,
        icon: this.iconScroller.active,
      };
      this.scene.state.clanAvatar = this.avatar;
      this.scene.state.modal = {
        type: 18,
        clanWindowType: 1,
        message: this.scene.state.modal.message,
      };
      this.scene.scene.restart(this.scene.state);
    } else {
      if (this.scene.state.user.diamonds >= CHANGE_EMBLEM_COST) {
        const data = {
          clanId: this.scene.state.clan.id,
          userId: this.scene.state.user.id,
          hash: this.scene.state.user.hash,
          counter: this.scene.state.user.counter,
          avatar: {
            bg: this.bgScroller.active,
            frame: this.frameScroller.active,
            icon: this.iconScroller.active,
          },
        }
        axios.post(process.env.API + '/changeClanAvatar', data).then(data => {
          if (!data.data.error) {
            this.scene.state.modal = {
              type: 17,
              clanTabType: 4,
            };
            this.scene.scene.restart(this.scene.state);
            this.scene.state.user.diamonds -= CHANGE_EMBLEM_COST;
            this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
              type: 'change_clan_avatar',
              count: CHANGE_EMBLEM_COST,
            });
          }
        });
      } else {
        this.scene.state.convertor = {
          fun: 0,
          count: CHANGE_EMBLEM_COST - this.scene.state.user.diamonds,
          diamonds: CHANGE_EMBLEM_COST - this.scene.state.user.diamonds,
          type: 2,
        };
        this.scene.state.modal = {
          type: 1,
          sysType: 4,
        };
        this.scene.scene.restart(this.scene.state);
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      }

    }
  }

  private randomAvatar(): void {
    const bgMax: number = Object.keys(this.scene.textures.list).filter(el => el.includes('clan-bg-')).length;
    const frameMax: number = Object.keys(this.scene.textures.list).filter(el => el.includes('clan-frame-')).length;
    const iconMax: number = Object.keys(this.scene.textures.list).filter(el => el.includes('clan-icon-')).length;
    this.avatar = {
      bg: Phaser.Math.Between(1, bgMax),
      frame: Phaser.Math.Between(1, frameMax),
      icon: Phaser.Math.Between(1, iconMax),
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
      this.randomAvatar();
      this.bgScroller.restart(this.avatar.bg);
      this.frameScroller.restart(this.avatar.frame);
      this.iconScroller.restart(this.avatar.icon);
      this.setBg(this.avatar.bg);
      this.setFrame(this.avatar.frame);
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
  private _mask: Phaser.Display.Masks.GeometryMask;
  private _window: EditClanAvatarWindow;
  private _viewArray: Array<Phaser.GameObjects.Sprite> = [];

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
    this.createViewArray();
  }

  private createBtns(): void {
    this._leftBtn = this._scene.add.sprite(this._pos.x - 220, this._pos.y, 'chat-arrow');
    this._scene.clickButton(this._leftBtn, () => { this.onLeftBtn(); });
    this._rightBtn = this._scene.add.sprite(this._pos.x + 220, this._pos.y, 'chat-arrow').setFlipX(true);
    this._scene.clickButton(this._rightBtn, () => { this.onRightBtn(); });
  }

  private setActive(active: number): void {
    this._previous = this._active;
    this._active = active;
  }

  private animForDirection(direction: number): void {
    if (this._previous !== this._active) {
      this.startAnim(direction);
    }
  }

  private startAnim(direction: number): void {
    this._anim = this._scene.add.tween({
      targets: this._viewArray,
      duration: 450,
      x: `+=${direction * 135}`,
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

  private setInactiveSize(target: Phaser.GameObjects.Sprite): void {
    this._scene.add.tween({
      targets: target,
      duration: 400,
      ease: 'Power3',
      scale: { from: 0.55, to: 0.3 },
    });
  }

  private setActiveSize(target: Phaser.GameObjects.Sprite): void {
    this._scene.add.tween({
      targets: target,
      duration: 400,
      ease: 'Power3',
      scale: { from: 0.3, to: 0.55 },
    });
  }

  private createViewArray(): void {
    let startX: number = -135 * 3;
    for (let i = 0; i < 5; i += 1) {
      startX += 135;
      let key: number = this._active + i - 2;
      if (key <= 0) {
        key = this._array.length - key;
      } 
      if (key > this._array.length) {
        key = this._array[i - 3];
      }
      const sprite = this._scene.add.sprite(this._pos.x + startX, this._pos.y, `${this._textureKey}${key}`).setScale(0.3);
      if (i === 2) {
        sprite.setScale(0.55);
      }
      sprite.setMask(this._mask);
      this._viewArray.push(sprite);
    }
  }

  private onLeftBtn(): void {
    if (!this._anim) {
      const newActive: number = this._active - 1 <= 0 ? this._array.length : this._active - 1;
      this.setActive(newActive);
      this.animForDirection(1);
      this.setInactiveSize(this._viewArray[2]);
      this.setActiveSize(this._viewArray[1]);
      this._viewArray.pop().destroy();
      const firstElement = this._viewArray[0];
      const key: number = newActive - 2 <= 0 ? this._array.length - 2 + newActive : newActive - 2;
      const newSprite = this._scene.add.sprite(firstElement.x, firstElement.y, this._textureKey + key).setMask(this._mask).setScale(0.3);
      this._viewArray.unshift(newSprite);
    }
  }

  private onRightBtn(): void {
    if (!this._anim) {
      const newActive: number = this._active + 1 > this._array.length ? 1 : this._active + 1;
      this.setActive(newActive);
      this.animForDirection(-1);
      this.setInactiveSize(this._viewArray[2]);
      this.setActiveSize(this._viewArray[3]);
      this._viewArray.shift().destroy();
      const lastElement = this._viewArray[this._viewArray.length - 1];
      const key: number = newActive >= this._array.length - 1 ?  2 + newActive -  this._array.length : newActive + 2;
      const newSprite = this._scene.add.sprite(lastElement.x, lastElement.y, this._textureKey + key).setMask(this._mask).setScale(0.3);
      this._viewArray.push(newSprite);
    }
  }

  public restart(start: number): void {
    this.destroyArray();
    this._active = start;
    this._previous = null;
    this.createViewArray();
  }
  
  private destroyArray(): void {
    this._viewArray.forEach(el => {
      el.destroy();
    });
    this._viewArray = [];
  }

  public checkAnim = (): boolean => this._anim ? true : false; 

  public get active(): number {
    return this._active;
  }

}