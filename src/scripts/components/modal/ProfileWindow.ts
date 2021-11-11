import axios from "axios";
import Modal from "../../scenes/Modal/Modal";
import LocalStorage from '../../libs/LocalStorage';
import { Icon } from "../Utils/LogoManager";
import LogoManager from './../Utils/LogoManager';

export default class ProfileWindow {
  public scene: Modal;

  private x: number;
  private y: number;

  private name: Phaser.GameObjects.Text;
  private statusIcon: Phaser.GameObjects.Sprite;
  private status: Phaser.GameObjects.Text; 
  private nickBtn: Phaser.GameObjects.Sprite;
  private nickText: Phaser.GameObjects.Text;
  private topBg: Phaser.GameObjects.Sprite;
  private bottomBg: Phaser.GameObjects.TileSprite;
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
  private exitBtn: Phaser.GameObjects.Sprite;
  private exitBtnText: Phaser.GameObjects.Text;
  private farmBtn: Phaser.GameObjects.Sprite;
  private farmBtnText: Phaser.GameObjects.Text;
  private blockBtn: Phaser.GameObjects.Sprite;
  private blockBtnText: Phaser.GameObjects.Text;
  private height: number;
  private profile: IprofileData;
  private owner: boolean = false;

  private bottomHeight: number = 150;

  constructor(scene: Modal) {
    this.scene = scene;
    this.getUserInfo();
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY - this.bottomHeight / 2;
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
        avatar: this.scene.state.user.avatar,
        status: this.scene.state.user.status,
        level: this.scene.state.user.level,
        clan: this.scene.state.clan,
        sheepPart: this.scene.state.userSheep.part,
        chickenPart: this.scene.state.userChicken.part,
        cowPart: this.scene.state.userCow.part,
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
            this.scene.load.image(`avatar-${result.id}`, result.avatar);
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
      this.profile = null;
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
    this.createClanInfo();
  }

  private createMainElements(): void {
    this.topBg = this.scene.add.sprite(this.x, this.y, 'profile-window-bg');
    this.createBottomBg();
    this.height = this.topBg.getBounds().height;
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
    this.closeBtn = this.scene.add.sprite(headerGeom.right - 35, headerGeom.top + 35, 'close-window-btn');
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.bottomBg.getBounds().bottom - 55, 'profile-window-footer').setOrigin(0.5, 0);
  }

  private createAvatar(): void {
    const pos: Iposition = {
      x: 220,
      y: this.y - 60,
    };

    const avatarType = Number(this.profile.avatar);
    const texture: string = isNaN(avatarType) ? `avatar-${this.profile.id}` : `avatar-${avatarType}`;
    const checkTexture = this.scene.textures.exists(texture);
    const maskSprite = this.scene.add.sprite(pos.x, pos.y, 'avatar-0').setVisible(false);
    const mask = new Phaser.Display.Masks.BitmapMask(this.scene, maskSprite);
    this.avatar = this.scene.add.sprite(pos.x, pos.y, texture).setMask(mask);
    if (!checkTexture) this.avatar.setTexture('avatar-0');
    const scaleX = maskSprite.width / this.avatar.width;
    const scaleY = maskSprite.height / this.avatar.height;
    this.avatar.setScale(scaleX, scaleY);

    if (this.owner) {
      const posBtn = this.avatar.getTopRight();
      const edit = this.scene.add.sprite(posBtn.x - 20, posBtn.y + 20, 'profile-window-edit-avatar-btn').setScale(0.7).setDepth(1);
      this.scene.click(this.avatar, (): void => {
        this.scene.state.modal = { type: 25 };
        this.scene.scene.restart(this.scene.state);
      });
      this.scene.click(edit, (): void => {
        this.scene.state.modal = { type: 25 };
        this.scene.scene.restart(this.scene.state);
      });
    }
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
      y: this.y + 90,
    };
    const pos2: Iposition = {
      x: this.x - 25,
      y: this.y + 90,
    }
    const pos3: Iposition = {
      x: this.x + 105,
      y: this.y + 90,
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
        this.supportBtn = this.scene.add.sprite(pos1.x, pos1.y, 'profile-window-button-yellow');
        this.supportBtnText = this.scene.add.text(this.supportBtn.x, this.supportBtn.y - 5, this.scene.state.lang.support, textStyle).setOrigin(0.5);
        this.licenseBtnText = this.scene.add.text(pos2.x + 2, pos2.y - 5, this.scene.state.lang.agreement, textStyle)
          .setOrigin(0.5)
          .setStroke('#7a7a7a', 2);
        break;
      case 'web':
        this.supportBtn = this.scene.add.sprite(pos1.x, pos1.y, 'profile-window-button-yellow');
        this.supportBtnText = this.scene.add.text(this.supportBtn.x, this.supportBtn.y - 5, this.scene.state.lang.support, textStyle).setOrigin(0.5);
        this.exitProfileBtn = this.scene.add.sprite(pos2.x, pos2.y, 'profile-window-button-red');
        this.exitProfileBtnText = this.scene.add.text(this.exitProfileBtn.x + 2, this.exitProfileBtn.y - 5, this.scene.state.lang.profileExit, textStyle)
          .setOrigin(0.5)
          .setStroke('#990000', 2);
        this.licenseBtnText = this.scene.add.text(pos3.x + 2, pos3.y - 5, this.scene.state.lang.agreement, textStyle)
          .setOrigin(0.5)
          .setStroke('#7a7a7a', 2);
        break;
      case 'ya':
        this.supportBtn = this.scene.add.sprite(pos1.x, pos1.y, 'profile-window-button-yellow');
        this.supportBtnText = this.scene.add.text(this.supportBtn.x, this.supportBtn.y - 5, this.scene.state.lang.support, textStyle).setOrigin(0.5);
        break;
      case 'android':
        this.exitBtn = this.scene.add.sprite(pos2.x, pos2.y, 'profile-window-button-red');
        this.exitBtnText = this.scene.add.text(this.exitBtn.x + 2, this.exitBtn.y - 5, this.scene.state.lang.exitGame, textStyle)
          .setOrigin(0.5)
          .setStroke('#990000', 2);
        this.supportBtn = this.scene.add.sprite(pos1.x, pos1.y, 'profile-window-button-yellow');
        this.supportBtnText = this.scene.add.text(this.supportBtn.x, this.supportBtn.y - 5, this.scene.state.lang.support, textStyle).setOrigin(0.5);
        break;
      default: 
        break;
    }
  }

  private createForeignBtns(): void {
    const pos1: Iposition = {
      x: this.x - 150,
      y: this.y + 90,
    };
    const pos2: Iposition = {
      x: this.x,
      y: this.y + 90,
    }
    const pos3: Iposition = {
      x: this.x + 150,
      y: this.y + 90,
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

    this.writeBtn = this.scene.add.sprite(pos1.x, pos1.y, 'profile-window-button-yellow');
    this.writeBtnText = this.scene.add.text(this.writeBtn.x, this.writeBtn.y - 5, this.scene.state.lang.writing, textStyle).setOrigin(0.5);

    if (this.scene.state.clan && this.scene.state.clan?.ownerId === this.scene.state.user.id) {
      if (this.profile.clan && this.profile.clan?.id !== this.scene.state.clan.id || !this.profile.clan) {
        const inviteClanBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos2.x, pos2.y, 'profile-window-button-yellow');
        const inviteClanBtnText: Phaser.GameObjects.Text = this.scene.add.text(inviteClanBtn.x + 2, inviteClanBtn.y - 5, this.scene.state.lang.inviteClan, textStyle)
          .setOrigin(0.5);
    
        this.scene.clickModalBtn({ btn: inviteClanBtn, title: inviteClanBtnText }, () => { this.onInviteClanBtn(); });
      } else {
        const expelBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos2.x, pos2.y, 'profile-window-button-red');
        const expelBtnText: Phaser.GameObjects.Text = this.scene.add.text(expelBtn.x + 2, expelBtn.y - 5, this.scene.state.lang.excludeClan, textStyle)
          .setStroke('#990000', 2)
          .setOrigin(0.5);
          
        this.scene.clickModalBtn({ btn: expelBtn, title: expelBtnText }, (): void => {
          this.scene.state.modal = {
            type: 1,
            sysType: 22,
            userId: this.profile.id,
            message: this.profile.name,
          };
          this.scene.scene.restart(this.scene.state);
        });
      }
    }

    
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

    if (this.exitBtn) {
      this.scene.clickModalBtn({ btn: this.exitBtn, title: this.exitBtnText }, () => { this.onExitBtn(); });
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
      userId: this.profile.id,
    };
    const ModalScene: Modal = this.scene.scene.get('Modal') as Modal;
    ModalScene.scene.restart(this.scene.state);
  }

  private onInviteClanBtn(): void {
    if (this.profile.sheepPart >= 7) {
      this.inviteUser();
    } else {
      this.scene.state.modal = {
        type: 1,
        sysType: 3,
        message: this.scene.state.lang.forThisPlayerClanIsNotAccepted.replace('$1', this.profile.name),
        height: 150,
      };
      this.scene.scene.restart(this.scene.state);
    }
  }
  
  private inviteUser(): void {
    let name: string = this.scene.state.user.login;
    if (this.scene.state.platform === 'ya' 
      || this.scene.state.platform === 'vk' 
      || this.scene.state.platform === 'ok') name = this.scene.state.name;
    const data = {
      clanId: this.scene.state.clan.id,
      userId: this.profile.id,
      name: name,
    };
    this.scene.state.socket.io.emit('inviteClan', data);
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
    this.scene.state.foreignProfileId = undefined;
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

  private onExitBtn(): void {
    //@ts-ignore
    if (navigator.app) navigator.app.exitApp();
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

  private createBottomBg(): void {
    const pos: Iposition = {
      x: this.x,
      y: this.topBg.getBounds().bottom - 40,
    };
    const width: number = 527;
    this.bottomBg = this.scene.add.tileSprite(pos.x, pos.y, width, this.bottomHeight, 'white-pixel').setTint(0xFF9700).setDepth(-1).setOrigin(0.5, 0);
    this.scene.add.nineslice(pos.x, pos.y + 40, width - 40, this.bottomHeight , 'clan-window-search-plate-ns', 5).setOrigin(0.5, 0).setDepth(1);
  }

  private createClanInfo(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#954F00',
      wordWrap: { width: 350, useAdvancedWrap: true },
    };
    const bannerStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '16px',
      color: '#D98C38',
      wordWrap: { width: 330 },
    };
    const btnTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      align: 'center',
      fontSize: '16px',
      color: '#ffe2e2',
      stroke: '#D78A31',
      strokeThickness: 3,
    };
    const geom: Phaser.Geom.Rectangle = this.bottomBg.getBounds();
    const pos: Iposition = {
      x: geom.left + 60,
      y: geom.centerY + 40,
    };
    if (this.scene.state.userSheep.part >= 7) {
      if (this.profile.clan) {
        const title: Phaser.GameObjects.Text = this.scene.add.text(geom.centerX, geom.centerY, this.scene.state.lang.inClan, textStyle).setOrigin(0.5).setDepth(2);
        const avatar: Icon = LogoManager.createIcon(this.scene, pos.x, pos.y, this.profile.clan.avatar).setScale(0.3).setDepth(2);
        const avatarGeom: Phaser.Geom.Rectangle = avatar.getBounds();
        const text: Phaser.GameObjects.Text = this.scene.add.text(avatarGeom.right + 10, avatarGeom.centerY, this.profile.clan.name, textStyle).setDepth(2).setOrigin(0, 0.5);
        if (this.owner) {
          const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(geom.centerX + 100, pos.y, 'profile-window-button-yellow').setOrigin(0, 0.5).setDepth(2);
          const btnText: Phaser.GameObjects.Text = this.scene.add.text(btn.getCenter().x, btn.getCenter().y - 5, this.scene.state.lang.clan, btnTextStyle).setDepth(2).setOrigin(0.5);
          this.scene.clickModalBtn({ btn: btn, title: btnText }, () => {
            this.scene.scene.stop();
            this.scene.scene.launch('ClanFarm', this.scene.state);
          });
        }
      } else {
        if (!this.owner) {
          this.scene.add.text(this.scene.cameras.main.centerX, pos.y, this.scene.state.lang.userHasNotInClan, textStyle).setAlign('center').setDepth(2).setOrigin(0.5);
        } else {
          const bannerText = this.scene.add.text(pos.x - 20, pos.y, this.scene.state.lang.joinClanBanner, bannerStyle).setDepth(2).setOrigin(0, 0.5);
          const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(bannerText.getBounds().right + 5, pos.y,'profile-window-button-yellow').setOrigin(0, 0.5).setDepth(2);
          const btnText: Phaser.GameObjects.Text = this.scene.add.text(btn.getCenter().x, btn.getCenter().y - 5, this.scene.state.lang.clans,btnTextStyle).setDepth(2).setOrigin(0.5);
          this.scene.clickModalBtn({ btn: btn, title: btnText }, () => {
            this.scene.state.modal = {
              type: 17,
              clanTabType: 3,
            };
            this.scene.scene.restart(this.scene.state);
          });
        }
      }
    } else {
      this.scene.add.text(
        this.scene.cameras.main.centerX, 
        pos.y, 
        this.scene.state.lang.reachChapterOfSheepFarm.replace('$1', '7'), 
        textStyle
      )
        .setAlign('center')
        .setDepth(2)
        .setOrigin(0.5);
    }
  }
};
