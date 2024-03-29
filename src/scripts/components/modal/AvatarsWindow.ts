import Modal from './../../scenes/Modal/Modal';
import { checkUserName } from '../../general/loadData';
const AVATARS: Array<Iavatar> = [
  {
    type: 1,
    price: 0,
    desc: '1',
  },
  {
    type: 2,
    price: 0,
    desc: '2',
  },
  {
    type: 3,
    price: 100,
    desc: '3',
  },
  {
    type: 4,
    price: 100,
    desc: '4',
  },
  {
    type: 5,
    price: 100,
    desc: '5',
  },
  {
    type: 6,
    price: 100,
    desc: '6',
  },
  {
    type: 7,
    price: 100,
    desc: '7',
  },
  {
    type: 8,
    price: 100,
    desc: '8',
  },
];

export default class AvatarsWindow {
  private scene: Modal;
  private header: Phaser.GameObjects.Sprite;
  private headerText: Phaser.GameObjects.Text;
  private closeBtn: Phaser.GameObjects.Sprite;
  private footer: Phaser.GameObjects.Sprite;
  private height: number;
  private width: number;
  private bg: Phaser.GameObjects.TileSprite;
  private x: number;
  private y: number;
  private currentType: number;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.createElements();
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;

    this.height = this.checkSocialAvatarAvalible() ? 580 : 450;
    this.width = 527;
    this.currentType = isNaN(Number(this.scene.state.user.avatar)) ? 0 : Number(this.scene.state.user.avatar);
  }

  private createElements(): void {
    this.createBg();
    this.createHeader();
    this.createFooter();
    this.createAvatars();
  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.width, this.height, 'white-pixel').setTint(0xFF9700);
  }

  private createHeader(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
    };
    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 10 , 'profile-window-header').setOrigin(0.5, 1);
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 15, this.scene.state.lang.avatarSettings, headerTextStyle).setOrigin(0.5);
    this.closeBtn = this.scene.add.sprite(headerGeom.right - 35, headerGeom.top + 35, 'close-window-btn');

    this.scene.clickButton(this.closeBtn, () => { this.onCloseBtn(); });
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2, 'profile-window-footer').setOrigin(0.5, 0);
  }

  private createAvatars(): void {
    const bgGeom = this.bg.getBounds();
    const position: Iposition = {
      x: bgGeom.left + 110,
      y: bgGeom.top + 260,
    };
    
    AVATARS.forEach(el => {
      this.createAvatar(el, position);
    });

    if (this.checkSocialAvatarAvalible()) this.createSocialAvatar()
  }

  private createAvatar(
    avatar: { type: number, price: number, desc: string }, 
    position: Iposition,
  ): void {
    const bgGeom = this.bg.getBounds();
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '22px',
      color: '#7A3D10'
    };

    if (avatar.price > 0) {
      const sprite = this.scene.add.sprite(position.x, position.y, `avatar-${avatar.type}`);
      const isOwned = this.ownCheck(avatar.type);
      const btnTexture = isOwned ? 'profile-window-level' : 'buy-avatar-plate';
      const btn = this.scene.add.sprite(sprite.x, sprite.y + 60, btnTexture);
      if (!isOwned) {
        const text = this.scene.add.text(btn.x - 10, btn.y - 1, String(avatar.price), textStyle).setOrigin(0.5).setColor('#ffffff');
        const diamond = this.scene.add.sprite(text.getBounds().right + 2, text.y, 'diamond').setScale(0.1).setOrigin(0, 0.5);
      } else {
        const text = this.scene.add.text(btn.x, btn.y - 3, this.scene.state.lang.select, textStyle).setOrigin(0.5);
        if (this.currentType === avatar.type) {
          this.scene.add.sprite(sprite.x + 3, sprite.y + 3, 'avatar-frame');
          btn.setVisible(false);
          text.setVisible(false);
        }
      }

      this.scene.click(sprite, (): void => { this.avatarHandler(avatar); });
      this.scene.click(btn, (): void => { this.avatarHandler(avatar); });
      position.x += sprite.width + 40;
      if (position.x >= bgGeom.right - 80) {
        position.x = bgGeom.left + 110;
        position.y += sprite.height + 40;
      }
    } else {
      const freePosition1: Iposition = { x: bgGeom.centerX - 100, y: bgGeom.top + 100 };
      const freePosition2: Iposition = { x: bgGeom.centerX + 100, y: bgGeom.top + 100 };

      const position: Iposition = avatar.type === 1 ? freePosition1 : freePosition2;
      const sprite = this.scene.add.sprite(position.x, position.y, `avatar-${avatar.type}`);
      const btn = this.scene.add.sprite(sprite.x, sprite.y + 60, 'profile-window-level');
      this.scene.click(sprite, (): void => { this.avatarHandler(avatar); });
      this.scene.click(btn, (): void => { this.avatarHandler(avatar); });
      const text = this.scene.add.text(btn.x, btn.y - 1, this.scene.state.lang.select, textStyle).setOrigin(0.5);
      if (this.currentType === avatar.type) {
        this.scene.add.sprite(sprite.x + 3, sprite.y + 3, 'avatar-frame');
        btn.setVisible(false);
        text.setVisible(false);
      }
    }
  }

  private avatarHandler(avatar: Iavatar): void {
    if (this.ownCheck(avatar.type) || avatar.type === 1 || avatar.type === 2) {
      this.scene.state.user.avatar = avatar.type !== 0 ? String(avatar.type) : this.scene.state.avatar;
      this.scene.scene.restart(this.scene.state);
    } else {
      this.scene.state.modal = { type: 1, sysType: 26, avatarParams: avatar };
      this.scene.scene.restart(this.scene.state);
    }
  }

  private ownCheck(type: number): boolean {
    return this.scene.state.user.boughtAvatars.some(el => el === type);
  }

  private checkSocialAvatarAvalible(): boolean {
    const { platform, user } = this.scene.state;
    const avatarTexture = `avatar-${user.id}`;
    const avalible = this.scene.textures.exists(avatarTexture) || user.boughtAvatars.some(el => el === 0);
    return (platform === 'vk' || platform === 'ok' || platform === 'ya') && avalible;
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.state.modal = { type: 15 };
    this.scene.scene.restart(this.scene.state);
    checkUserName(this.scene.state);
  }

  private createSocialAvatar(): void {
    const bottomGeom = this.footer.getBounds();
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '22px',
      color: '#7A3D10',
    };
    const avatar: Iavatar = {
      type: 0,
      price: 1000,
      desc: '123',
    };
    const position: Iposition = { x: bottomGeom.centerX, y: bottomGeom.bottom - 150 };
    const isOwned = this.ownCheck(avatar.type);
    const btnTexture = isOwned ? 'profile-window-level' : 'buy-avatar-plate';
    
    const avatarTexture = `avatar-${this.scene.state.user.id}`;
    const checkTexture = this.scene.textures.exists(avatarTexture);
    const maskSprite = this.scene.add.sprite(position.x, position.y, 'avatar-0').setVisible(false);
    const mask = new Phaser.Display.Masks.BitmapMask(this.scene, maskSprite);
    const sprite = this.scene.add.sprite(position.x, position.y, avatarTexture).setMask(mask);
    if (!checkTexture) sprite.setTexture('avatar-0');
    const scaleX = maskSprite.width / sprite.width;
    const scaleY = maskSprite.height / sprite.height;
    sprite.setScale(scaleX, scaleY);

    const btn = this.scene.add.sprite(sprite.x, sprite.y + 60, btnTexture);
    if (!isOwned) {
      const text = this.scene.add.text(btn.x - 10, btn.y - 1, String(avatar.price), textStyle).setOrigin(0.5).setColor('#ffffff');
      const diamond = this.scene.add.sprite(text.getBounds().right + 2, text.y, 'diamond').setScale(0.1).setOrigin(0, 0.5);
    } else {
      const text = this.scene.add.text(btn.x, btn.y - 3, this.scene.state.lang.select, textStyle).setOrigin(0.5);
      if (this.currentType === avatar.type) {
        this.scene.add.sprite(sprite.x + 3, sprite.y + 3, 'avatar-frame');
        btn.setVisible(false);
        text.setVisible(false);
      }
    }

    this.scene.click(sprite, (): void => { this.avatarHandler(avatar); });
    this.scene.click(btn, (): void => { this.avatarHandler(avatar); });
  }
}