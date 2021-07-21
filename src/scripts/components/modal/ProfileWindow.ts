import axios from "axios";
import Modal from "../../scenes/Modal/Modal";
import LocalStorage from '../../libs/LocalStorage';

export default class ProfileWindow {
  public scene: Modal;

  private x: number;
  private y: number;

  private name: Phaser.GameObjects.Text;
  private statusIcon: Phaser.GameObjects.Sprite;
  private status: Phaser.GameObjects.Text; 
  private nickBtn: Phaser.GameObjects.Sprite;
  private nickText: Phaser.GameObjects.Text;
  private bg: Phaser.GameObjects.Sprite;
  private header: Phaser.GameObjects.Sprite;
  private headerText: Phaser.GameObjects.Text;
  private avatar: Phaser.GameObjects.Sprite;
  private closeBtn: Phaser.GameObjects.Sprite;
  private footer: Phaser.GameObjects.Sprite;
  private level: Phaser.GameObjects.Text;
  private settingsBtn: Phaser.GameObjects.Sprite;
  private onlineStatus: Phaser.GameObjects.Text;
  private supportBtn: Phaser.GameObjects.Sprite;
  private supportBtnText: Phaser.GameObjects.Text;
  private exitProfileBtn: Phaser.GameObjects.Sprite;
  private exitProfileBtnText: Phaser.GameObjects.Text;
  private licenseBtnText: Phaser.GameObjects.Text;
  private writeBtn: Phaser.GameObjects.Sprite;
  private writeBtnText: Phaser.GameObjects.Text;
  private farmBtn: Phaser.GameObjects.Sprite;
  private farmBtnText: Phaser.GameObjects.Text;
  private blockBtn: Phaser.GameObjects.Sprite;
  private blockBtnText: Phaser.GameObjects.Text;
  private height: number;
  private profile: IprofileData;
  private owner: boolean = false;

  constructor(scene: Modal) {
    this.scene = scene;
    this.getUserInfo();
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    if (this.profile) {
      this.owner = false;
    } else {
      this.owner = true;
      let nameText: string = this.scene.state.user.login;
      if (this.scene.state.platform === 'ya' 
        || this.scene.state.platform === 'vk' 
        || this.scene.state.platform === 'ok') nameText = this.scene.state.name;
      const profile: IprofileData = {
        id: this.scene.state.user.id,
        name: nameText,
        avatar: 'avatar',
        status: this.scene.state.user.status,
        level: this.scene.state.user.level,
      };
      this.profile = profile;
    }
  }

  private getUserInfo(): void {
    if (this.scene.state.foreignProfileId) {
      const data = {
        userId: this.scene.state.user.id,
        hash: this.scene.state.user.hash,
        counter: this.scene.state.user.counter,
        id: this.scene.state.foreignProfileId,
      };
      this.scene.scene.launch('Block');
      const loadingSprite:Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'loading-spinner');
      const animation:Phaser.Tweens.Tween = this.scene.tweens.add({
        targets: loadingSprite,
        rotation: 2 * Math.PI,
        duration: 700,
        repeat: -1,
      });
      axios.post(process.env.API +'/getUserInfo', data).then((res): void => {
        const { result, error }: { result: IprofileData, error: boolean }  = res.data;
        if (!error) {
          if (result.avatar) {
            this.scene.load.image(`avatar${result.id}`, result.avatar);
            this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
              this.scene.scene.stop('Block');
              animation?.remove();
              loadingSprite?.destroy();
              this.profile = result;
              this.init();
              this.create();
            });
            this.scene.load.start();

          } else {
            this.profile = result;
            this.init();
            this.create();
            this.scene.scene.stop('Block');
            animation?.remove();
            loadingSprite?.destroy();
          }
        } else {
          this.scene.scene.stop('Modal');
          this.scene.scene.stop('Block');
          animation?.remove();
          loadingSprite?.destroy();
        }
      }).catch(() => {
        this.scene.scene.stop('Block');
        animation?.remove();
        loadingSprite?.destroy();
      });
    } else {
      this.init();
      this.create();
      this.scene.openModal(this.scene.cameras.main);
    }
  }
  
  private create(): void {
    this.createMainElements();
    this.createAvatar();
    this.createProfileInfo();
    if (this.owner) this.createOwnerBtns();
    else this.createForeignBtns();
    this.setListeners();
  }

  private createMainElements(): void {
    this.bg = this.scene.add.sprite(this.x, this.y, 'profile-window-bg');
    this.height = this.bg.getBounds().height;
    this.createHeader();
    this.createFooter();
  }

  private createHeader(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
    };
    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 10 , 'profile-window-header').setOrigin(0.5, 1);
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 15, this.scene.state.lang.profile, headerTextStyle).setOrigin(0.5);
    this.closeBtn = this.scene.add.sprite(headerGeom.right - 35, headerGeom.top + 35, 'tasks-close');
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2 + 23, 'profile-window-footer').setDepth(-1).setOrigin(0.5, 1);
  }

  private createAvatar(): void {
    const pos: Iposition = {
      x: 220,
      y: this.y - 60,
    };
    this.avatar = this.scene.add.sprite(pos.x, pos.y, 'farmer').setScale(0.53).setDepth(1);
    // if (this.scene.state.platform === 'vk') this.avatar = this.scene.add.sprite(pos.x, pos.y, `avatar${this.profile.id}`).setScale(0.8).setDepth(1);
    // else if (this.scene.state.platform === 'ok') this.avatar = this.scene.add.sprite(pos.x, pos.y, `avatar${this.profile.id}`).setScale(1.1).setDepth(1);
    // else if (this.scene.state.platform === 'ya') this.avatar = this.scene.add.sprite(pos.x, pos.y, `avatar${this.profile.id}`).setDepth(1);
    // else this.avatar = this.scene.add.sprite(pos.x, pos.y, 'farmer').setScale(0.53).setDepth(1);
    // if (this.avatar.texture.key === '__MISSING') this.avatar.setTexture('farmer').setScale(0.53);
    
    // if (this.scene.state.platform !== 'web') {
    //   const mask: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x, pos.y, 'farmer').setScale(0.53).setVisible(false);
    //   this.avatar.mask = new Phaser.Display.Masks.BitmapMask(this.scene, mask);
    // }
  }

  private createProfileInfo(): void {
    const pos: Iposition = {
      x: this.x - 50,
      y: this.y - 85,
    };
    const nameTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '24px',
      color: '#FFEBD0',
      wordWrap: { width: 240 },
      align: 'left'
    };

    const levelTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#7A3D10'
    };

    const onlineStatusTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '16px',
      color: '#FBCB8D'
    };

    this.name = this.scene.add.text(pos.x, pos.y, this.profile.name, nameTextStyle).setOrigin(0, 0.5);
    this.name.setCrop(0, 0, 240, 50);
    
    const nameGeom: Phaser.Geom.Rectangle = this.name.getBounds();

    this.settingsBtn = this.scene.add.sprite(pos.x + 250, pos.y + 180, 'profile-window-settings-btn')
      .setVisible(this.owner);

    const levelText: string = `${this.scene.state.lang.level} ${this.profile.level}`;
    const levelPlate: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.avatar.x, this.avatar.y + this.avatar.displayHeight / 2, 'profile-window-level').setDepth(1);
    this.level = this.scene.add.text(levelPlate.x, levelPlate.y, levelText, levelTextStyle).setDepth(2).setOrigin(0.5);

    const onlineY: number = nameGeom.height > 50 ? pos.y + 25 : nameGeom.bottom;
    this.onlineStatus = this.scene.add.text(pos.x, onlineY, this.scene.state.lang.onlineStatus, onlineStatusTextStyle)
      .setOrigin(0)
      .setVisible(this.owner);

    const statusSettings: IstatusSettings = this.scene.getStatusSettings(this.profile.status);

    if (statusSettings) {
      const statusTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
        fontFamily: 'Bip',
        fontSize: '20px',
        color: '#fce700',
      };

      const onlineGeom: Phaser.Geom.Rectangle = this.onlineStatus.getBounds();
      const statusY: number = onlineGeom.bottom;
      this.status = this.scene.add.text(pos.x, statusY, statusSettings.text, statusTextStyle).setOrigin(0);
      this.statusIcon = this.scene.add.sprite(this.status.getBounds().right, this.status.getBounds().centerY, statusSettings.iconTexture)
        .setVisible(statusSettings.iconVisible)
        .setOrigin(0, 0.5);
    }

  }

  private createOwnerBtns(): void {
    const pos1: Iposition = {
      x: this.x - 165,
      y: this.y + 97,
    };
    const pos2: Iposition = {
      x: this.x - 25,
      y: this.y + 97,
    }
    const pos3: Iposition = {
      x: this.x + 105,
      y: this.y + 97,
    }
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      align: 'center',
      fontSize: '14px',
      color: '#ffe2e2',
      stroke: '#D78A31',
      strokeThickness: 3,
    };

    switch (this.scene.state.platform) {
      case 'vk':
      case 'ok':
        this.supportBtn = this.scene.add.sprite(pos1.x, pos1.y, 'profile-window-button');
        this.supportBtnText = this.scene.add.text(this.supportBtn.x, this.supportBtn.y - 5, this.scene.state.lang.support, textStyle).setOrigin(0.5);
        this.licenseBtnText = this.scene.add.text(pos2.x + 2, pos2.y - 5, this.scene.state.lang.agreement, textStyle)
          .setOrigin(0.5)
          .setStroke('#7a7a7a', 2);
        break;
      case 'web':
        this.supportBtn = this.scene.add.sprite(pos1.x, pos1.y, 'profile-window-button');
        this.exitProfileBtn = this.scene.add.sprite(pos2.x, pos2.y, 'profile-window-button-red');
        this.supportBtnText = this.scene.add.text(this.supportBtn.x, this.supportBtn.y - 5, this.scene.state.lang.support, textStyle).setOrigin(0.5);
        this.exitProfileBtnText = this.scene.add.text(this.exitProfileBtn.x + 2, this.exitProfileBtn.y - 5, this.scene.state.lang.profileExit, textStyle)
          .setOrigin(0.5)
          .setStroke('#990000', 2);
        this.licenseBtnText = this.scene.add.text(pos3.x + 2, pos3.y - 5, this.scene.state.lang.agreement, textStyle)
          .setOrigin(0.5)
          .setStroke('#7a7a7a', 2);
        break;
      case 'ya':
      case 'android':
        this.supportBtn = this.scene.add.sprite(pos1.x, pos1.y, 'profile-window-button');
        this.supportBtnText = this.scene.add.text(this.supportBtn.x, this.supportBtn.y - 5, this.scene.state.lang.support, textStyle).setOrigin(0.5);
        break;
      default: 
        break;
    }
  }

  private createForeignBtns(): void {
    const pos1: Iposition = {
      x: this.x - 150,
      y: this.y + 97,
    };
    const pos2: Iposition = {
      x: this.x,
      y: this.y + 97,
    }
    const pos3: Iposition = {
      x: this.x + 150,
      y: this.y + 97,
    }
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      align: 'center',
      fontSize: '14px',
      color: '#ffe2e2',
      stroke: '#D78A31',
      strokeThickness: 3,
    };

    this.writeBtn = this.scene.add.sprite(pos1.x, pos1.y, 'profile-window-button');
    this.writeBtnText = this.scene.add.text(this.writeBtn.x, this.writeBtn.y - 5, this.scene.state.lang.writing, textStyle).setOrigin(0.5);

    // this.farmBtn = this.scene.add.sprite(pos2.x, pos2.y, 'profile-window-button');
    // this.farmBtnText = this.scene.add.text(this.farmBtn.x + 2, this.farmBtn.y - 5, this.scene.state.lang.goToFarm, textStyle)
    //   .setOrigin(0.5);

    // this.blockBtn = this.scene.add.sprite(pos3.x + 2, pos3.y - 5, 'profile-window-button-red');
    // this.blockBtnText = this.scene.add.text(this.blockBtn.x + 2, this.blockBtn.y - 5, this.scene.state.lang.blocking, textStyle)
    // .setOrigin(0.5)
    // .setStroke('#990000', 2);
  }

  private setListeners(): void {
    if (this.supportBtn) {
      this.scene.clickModalBtn({ btn: this.supportBtn, title: this.supportBtnText }, () => { this.onSupportBtn(); });
    }
    if (this.exitProfileBtn) {
      this.scene.clickModalBtn({ btn: this.exitProfileBtn, title: this.exitProfileBtnText }, () => { this.onExitProfileBtn(); });
    }
    if (this.licenseBtnText) {
      this.scene.clickButton(this.licenseBtnText, () => { this.onLicenseBtn(); });
    }
    if (this.settingsBtn) {
      this.scene.clickButton(this.settingsBtn, () => { this.onSettingsBtn(); });
    }
    if(this.writeBtn) {
      this.scene.clickModalBtn({ btn: this.writeBtn, title: this.writeBtnText }, () => { this.onWriteBtn(); });
    }

    this.scene.clickButton(this.closeBtn, () => { this.onCloseBtn(); } );
  }

  private onWriteBtn(): void {
    const user: IuserPersonalMessage = this.scene.state.user.personalMessages.find(el => el.userId === this.profile.id);
      if (!user) {
        const createnUser: IuserPersonalMessage = {
          name: this.profile.name,
          userId: this.profile.id,
          status: this.profile.status,
          messages: [],
        };
        this.scene.state.user.personalMessages.push(createnUser);
      }

    this.scene.state.modal = {
      type: 9,
      chatType: 2,
      chatUserId: this.profile.id,
    };
    const ModalScene: Modal = this.scene.scene.get('Modal') as Modal;
    ModalScene.scene.restart(this.scene.state);
  }

  private onSupportBtn(): void {
    if (this.scene.state.platform === 'vk') window.open(process.env.VK_SUPPORT_LINK, '_blank');
    else if (this.scene.state.platform === 'ok') window.open(process.env.OK_SUPPORT_LINK, '_blank');
    else this.openSysWindow(14);
  }

  private onExitProfileBtn(): void {
    document.cookie = "farmHASH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    LocalStorage.set('farm', '');
    window.location.reload();
  }

  private onLicenseBtn(): void {
    window.open('https://' + location.hostname + '/agreement', '_blank');
  }
  
  private onSettingsBtn(): void {
    const modal: Imodal = { type: 16 };
    this.scene.state.modal = modal;
    this.scene.scene.restart(this.scene.state);
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
    this.scene.state.foreignProfileId = undefined;
  }

  private openSysWindow(sysType: number) {
    const modal: Imodal = { type: 1, sysType };
    this.scene.state.modal = modal;
    this.scene.scene.restart(this.scene.state);
  }
};
