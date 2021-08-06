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
  private flag: Phaser.GameObjects.Sprite;
  private flagBtnLeft: Phaser.GameObjects.Sprite;
  private flagBtnRight: Phaser.GameObjects.Sprite;
  private frameBtnLeft: Phaser.GameObjects.Sprite;
  private frameBtnRight: Phaser.GameObjects.Sprite;
  private iconBtnLeft: Phaser.GameObjects.Sprite;
  private iconBtnRight: Phaser.GameObjects.Sprite;

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
    const scroller = new Scroller(this.scene, pos, 'clan-bg-', this.avatar.bg);
    console.log(scroller);
  }

  private createFrameManager(): void {
    const pos: Iposition = {
      x: this.x, 
      y: this.y + 10,
    };
    const bg = this.scene.add.nineslice(pos.x, pos.y, this.window.width, 130, 'clan-window-leader-plate', 1).setOrigin(0.5);
    this.scene.add.tileSprite(pos.x, pos.y, 145, 115, 'white-pixel').setTint(0xD06900);
    this.scene.add.sprite(pos.x, pos.y, `clan-bg-${this.avatar.bg}`).setOrigin(0.5).setScale(0.55);
    this.scene.add.sprite(pos.x, pos.y, `clan-frame-${this.avatar.frame}`).setOrigin(0.5).setScale(0.55);

    const bgGeom: Phaser.Geom.Rectangle = bg.getBounds();
    this.frameBtnLeft = this.scene.add.sprite(bgGeom.left + 30, bgGeom.centerY, 'chat-arrow').setOrigin(0, 0.5);
    this.frameBtnRight = this.scene.add.sprite(bgGeom.right - 30, bgGeom.centerY, 'chat-arrow').setFlipX(true).setOrigin(1, 0.5);
  }

  private createIconManager(): void {
    const pos: Iposition = {
      x: this.x, 
      y: this.y + 150,
    };
    const bg = this.scene.add.nineslice(pos.x, pos.y, this.window.width, 130, 'clan-window-leader-plate', 1).setOrigin(0.5);
    this.scene.add.tileSprite(pos.x, pos.y, 145, 115, 'white-pixel').setTint(0xD06900);
    this.scene.add.sprite(pos.x, pos.y, `clan-bg-${this.avatar.bg}`).setOrigin(0.5).setScale(0.55);
    this.scene.add.sprite(pos.x, pos.y, `clan-frame-${this.avatar.frame}`).setOrigin(0.5).setScale(0.55);
    this.scene.add.sprite(pos.x, pos.y, `clan-icon-${this.avatar.icon}`).setOrigin(0.5).setScale(0.55);

    const bgGeom: Phaser.Geom.Rectangle = bg.getBounds();
    this.iconBtnLeft = this.scene.add.sprite(bgGeom.left + 30, bgGeom.centerY, 'chat-arrow').setOrigin(0, 0.5);
    this.iconBtnRight = this.scene.add.sprite(bgGeom.right - 30, bgGeom.centerY, 'chat-arrow').setFlipX(true).setOrigin(1, 0.5);
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

    this.scene.clickModalBtn({ btn: saveBtn, title: saveBtnText }, () => { this.getNewIcon(); });
    this.window.modalElements.push(
      saveBtn,
      saveBtnText,
      this.icon,
    );
  }

  private initAvatar(): void {
    this.avatar = {
      bg: Phaser.Math.Between(1, 14),
      frame: Phaser.Math.Between(1, 10),
      icon: Phaser.Math.Between(1, 12),
    };
  }

  private getNewIcon(): void {
    this.initAvatar();
    const pos: Iposition = {
      x: this.icon.x,
      y: this.icon.y,
    };

    this.icon.destroy();
    this.icon = LogoManager.createIcon(this.scene, pos.x, pos.y, this.avatar).setScale(0.8);
  }
}

class Scroller {
  private _scene: Phaser.Scene;
  private _active: number;
  private _textureKey: string;
  private _array: Array<number>;
  private _rightBtn: Phaser.GameObjects.Sprite;
  private _leftBtn: Phaser.GameObjects.Sprite;
  private _pos: Iposition;
  private _arraySprites: Array<Phaser.GameObjects.Sprite>;

  constructor(scene: Phaser.Scene, pos: Iposition, textureKey: string, start: number) {
    this._scene = scene;
    this._textureKey = textureKey;
    this._active = start;
    this._pos = pos;
    this.initArray();
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
    this._rightBtn = this._scene.add.sprite(this._pos.x + 220, this._pos.y, 'chat-arrow').setFlipX(true);
  }
  private createSprites(): void {
    let startX: number = -200 * (this._active - 1)

    for (let i = 1; i <= this._array.length; i += 1) {
      startX += 200
      
      const sprite = this._scene.add.sprite(this._pos.x + startX, this._pos.y, `${this._textureKey}${i}`).setScale(0.55);
      console.log(sprite)
    }
  }
 

}