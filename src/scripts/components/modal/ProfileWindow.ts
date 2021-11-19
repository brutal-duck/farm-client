import axios from "axios";
import Modal from "../../scenes/Modal/Modal";
import LocalStorage from '../../libs/LocalStorage';
import { Icon } from "../Utils/LogoManager";
import LogoManager from './../Utils/LogoManager';
import Utils from './../../libs/Utils';
import achievements from "../../local/tasks/achievements";

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
  private loadingSprite: Phaser.GameObjects.Sprite;
  private loadAnim: Phaser.Tweens.Tween;
  private bottomHeight: number = 220;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    if (this.scene.state.foreignProfileId) {
      this.owner = false;
      this.createLoadingAnim();
      this.loadForeignProfile();
    } else {
      this.owner = true;
      this.startCreateUserProfile();
    }
  }

  private init(): void {
    const { cameras } = this.scene;
    this.x = cameras.main.centerX;
    this.y = cameras.main.centerY - this.bottomHeight / 2;
  }

  private getUserProfileInfo(): IprofileData {
    const { state } = this.scene;
    let nameText: string = Utils.getUserName(state)
    return {
      id: state.user.id,
      name: nameText,
      avatar: state.user.avatar,
      status: state.user.status,
      level: state.user.level,
      clan: state.clan,
      sheepPart: state.userSheep.part,
      chickenPart: state.userChicken.part,
      cowPart: state.userCow.part,
      achievements: state.user.achievements,
    };
  }

  private startCreateUserProfile(): void {
    this.profile = this.getUserProfileInfo();
    this.create();
  }

  private loadForeignProfile(): void {
    const data = {
      userId: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      id: this.scene.state.foreignProfileId,
    };
    axios.post(process.env.API + '/getUserInfo', data).then((res): void => {
      const { result, error }: { result: IprofileData; error: boolean; } = res.data;
      if (!error) {
        if (result.avatar) {
          this.loadAvatarAsset(result).then((res) => { 
            this.startCreateForeignProfile(res);
          });
        } else this.startCreateForeignProfile(result);
      } else this.stopLoading();
    }).catch(() => {
      this.stopLoading();
    });
  }

  private createLoadingAnim(): void {
    this.scene.scene.launch('Block');
    const { centerX, centerY } = this.scene.cameras.main;
    this.loadingSprite = this.scene.add.sprite(centerX, centerY, 'loading-spinner');
    this.loadAnim = this.scene.tweens.add({
      targets: this.loadingSprite,
      rotation: 2 * Math.PI,
      duration: 700,
      repeat: -1,
    });
  }

  private stopLoading(): void {
    this.scene.scene.stop('Modal');
    this.scene.scene.stop('Block');
    this.loadAnim?.remove();
    this.loadingSprite?.destroy();
  }

  private startCreateForeignProfile(result: IprofileData): void {
    this.profile = result;
    this.scene.scene.stop('Block');
    this.loadAnim?.remove();
    this.loadingSprite?.destroy();
    this.create();
  }

  private loadAvatarAsset(data: IprofileData): Promise<IprofileData> {
    return new Promise(resolve => {
      const { id, avatar } = data;
      const avatarIsLink = isNaN(Number(avatar));
      const key = `avatar-${id}`;
      if (this.scene.textures.exists(key) || !avatarIsLink) return resolve(data);
      this.scene.load.image(key, avatar);
      this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => resolve(data));
      this.scene.load.start();
    });
  }

  private create(): void {
    this.createMainElements();
    this.createAvatar();
    this.createProfileInfo();
    if (this.owner) this.createOwnerBtns();
    else this.createForeignBtns();
    this.setListeners();
    this.createAchievementsInfo();
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
      const x = this.status.getBounds().right;
      const y = this.status.getBounds().centerY;
      this.scene.game.scene.keys[this.scene.state.farm].achievement
        .lazyLoading(this.profile.status).then(() => {
          this.statusIcon = this.scene.add.sprite(x, y, statusSettings.iconTexture)
            .setOrigin(0, 0.5)
            .setScale(0.4)
            .setVisible(statusSettings.iconVisible);
        });
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
        const inviteClanBtn = this.scene.add.sprite(pos2.x, pos2.y, 'profile-window-button-yellow');
        const inviteClanBtnText: Phaser.GameObjects.Text = this.scene.add.text(inviteClanBtn.x + 2, inviteClanBtn.y - 5, this.scene.state.lang.inviteClan, textStyle)
          .setOrigin(0.5);
    
        this.scene.clickModalBtn({ btn: inviteClanBtn, title: inviteClanBtnText }, () => { this.onInviteClanBtn(); });
      } else {
        const expelBtn = this.scene.add.sprite(pos2.x, pos2.y, 'profile-window-button-red');
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
    LocalStorage.set('hash', '');
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
      x: geom.left + 70,
      y: geom.bottom - 20,
    };
    if (this.scene.state.userSheep.part >= 7) {
      if (this.profile.clan) {
        const title: Phaser.GameObjects.Text = this.scene.add.text(geom.centerX, pos.y - 35, this.scene.state.lang.inClan, textStyle).setOrigin(0.5).setDepth(2);
        const avatar: Icon = LogoManager.createIcon(this.scene, pos.x, pos.y, this.profile.clan.avatar).setScale(0.3).setDepth(2);
        const avatarGeom: Phaser.Geom.Rectangle = avatar.getBounds();
        const text: Phaser.GameObjects.Text = this.scene.add.text(avatarGeom.right + 10, avatarGeom.centerY, this.profile.clan.name, textStyle).setDepth(2).setOrigin(0, 0.5);
        if (this.owner) {
          const btn = this.scene.add.sprite(geom.centerX + 100, pos.y, 'profile-window-button-yellow').setOrigin(0, 0.5).setDepth(2);
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
          const btn = this.scene.add.sprite(pos.x + 300, pos.y,'profile-window-button-yellow').setOrigin(0, 0.5).setDepth(2);
          const btnText= this.scene.add.text(btn.getCenter().x, btn.getCenter().y - 5, this.scene.state.lang.clans,btnTextStyle).setDepth(2).setOrigin(0.5);
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

  private createAchievementsInfo(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#954F00',
      wordWrap: { width: 350, useAdvancedWrap: true },
    };
    const btnTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      align: 'center',
      fontSize: '16px',
      color: '#ffe2e2',
      stroke: '#4268d7',
      strokeThickness: 3,
    };
    const geom: Phaser.Geom.Rectangle = this.bottomBg.getBounds();
    const pos: Iposition = {
      x: geom.left + 50,
      y: geom.top + 80,
    };

    let points = 0;
    let done = 0;

    this.profile.achievements.forEach(el => {
      if (el.progress >= el.count && this.owner) {
        points += el.points;
        done += 1;
      } else if (!this.owner){
        const achievement = achievements.find(ach => ach.id === el.id);
        if (achievement) {
          points += achievement.points;
          done += 1;
        }
      }
    });

    const doneStr = String(Math.round((done / achievements.length) * 100));

    const { achievementsPoints, achievementsDone } = this.scene.state.lang;

    const pointsText = this.scene.add.text(pos.x, pos.y - 5, achievementsPoints, textStyle)
      .setOrigin(0, 0.5)
      .setDepth(1);
    const pointsCount = this.scene.add.text(pointsText.getBounds().right + 5, pos.y - 5, String(points), textStyle)
      .setColor('#8EB508')
      .setOrigin(0, 0.5)
      .setDepth(1);

    const doneText = this.scene.add.text(pos.x, pos.y + 25, achievementsDone, textStyle)
      .setOrigin(0, 0.5)
      .setDepth(1);
    const doneCount = this.scene.add.text(doneText.getBounds().right + 5, pos.y + 25, `${doneStr}%`, textStyle)
      .setColor('#8EB508')
      .setOrigin(0, 0.5)
      .setDepth(1);

    this.scene.add.sprite(geom.centerX, pos.y + 55, 'profile-window-line').setDepth(2);
    
    if (points > 0 || this.owner) {
      const btn = this.scene.add.sprite(pos.x + 375, pos.y + 10,'profile-window-button-blue').setScale(1.15).setDepth(2);
      const btnText= this.scene.add.text(btn.getCenter().x, btn.getCenter().y - 5, this.scene.state.lang.achievements, btnTextStyle).setDepth(2).setOrigin(0.5);
      this.scene.clickModalBtn({ btn: btn, title: btnText }, () => {
        this.scene.state.modal = { type: 26 };
        if (!this.owner) this.scene.state.modal.achievements = this.profile.achievements;
        this.scene.scene.restart(this.scene.state);
      });
    }
  }
};
