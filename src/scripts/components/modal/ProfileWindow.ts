import { romanize } from "../../general/basic";
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
  private editNicknameBtn: Phaser.GameObjects.Sprite;
  private onlineStatus: Phaser.GameObjects.Text;
  private supportBtn: Phaser.GameObjects.Sprite;
  private supportBtnText: Phaser.GameObjects.Text;
  private exitProfileBtn: Phaser.GameObjects.Sprite;
  private exitProfileBtnText: Phaser.GameObjects.Text;
  private licenseBtn: Phaser.GameObjects.Sprite;
  private licenseBtnText: Phaser.GameObjects.Text;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
  }

  private create(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
    };

    this.bg = this.scene.add.sprite(this.x, this.y, 'profile-window-bg');
    const bgGeom: Phaser.Geom.Rectangle = this.bg.getBounds();
    this.header = this.scene.add.sprite(this.x, bgGeom.top + 10, 'profile-window-header').setOrigin(0.5, 1);
    this.headerText = this.scene.add.text(this.header.x, this.header.getCenter().y - 15, this.scene.state.lang.profile, headerTextStyle).setOrigin(0.5);
    this.closeBtn = this.scene.add.sprite(this.x + this.header.width / 2 - 35, bgGeom.top - this.header.height + 45, 'tasks-close');
    this.footer = this.scene.add.sprite(this.x, bgGeom.bottom - 10, 'profile-window-footer').setDepth(-1).setOrigin(0.5, 0);
    this.createAvatar();
    this.createProfileInfo();
    this.createBtns();
    this.setListeners();

  }

  private createAvatar(): void {
    const pos: Iposition = {
      x: 220,
      y: this.y - 60,
    };
    if (this.scene.state.platform === 'vk') this.avatar = this.scene.add.sprite(pos.x, pos.y, 'avatar').setScale(0.8).setDepth(1);
    else if (this.scene.state.platform === 'ok') this.avatar = this.scene.add.sprite(pos.x, pos.y, 'avatar').setScale(1.1).setDepth(1);
    else if (this.scene.state.platform === 'ya') this.avatar = this.scene.add.sprite(pos.x, pos.y, 'avatar').setDepth(1);
    else this.avatar = this.scene.add.sprite(pos.x, pos.y, 'farmer').setScale(0.53).setDepth(1);
    if (this.avatar.texture.key === '__MISSING') this.avatar.setTexture('farmer').setScale(0.6);

     if (this.scene.state.platform !== 'web') {
      const mask: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x, pos.y, 'farmer').setScale(0.53).setVisible(false);
      this.avatar.mask = new Phaser.Display.Masks.BitmapMask(this.scene, mask);
    }
    
  }

  private createProfileInfo(): void {
    const pos: Iposition = {
      x: this.x - 50,
      y: this.y - 80,
    };
    const nameTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '24px',
      color: '#FFEBD0'
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

    let nameText: string = this.scene.state.user.login;
    if (this.scene.state.platform === 'ya' 
      || this.scene.state.platform === 'vk' 
      || this.scene.state.platform === 'ok') nameText = this.scene.state.name;

    this.name = this.scene.add.text(pos.x, pos.y, nameText, nameTextStyle).setOrigin(0, 0.5);
    this.name.setCrop(0, 0, 240, 30);

    const editBtnX: number = this.name.getBounds().width > 240 ? pos.x + 245 : this.name.getBounds().right + 5;
    this.editNicknameBtn = this.scene.add.sprite(editBtnX, pos.y, 'profile-window-edit-btn')
      .setOrigin(0, 0.5)
      .setVisible(this.scene.state.platform === 'web' || this.scene.state.platform === 'android');

    const levelText: string = `${this.scene.state.lang.level} ${this.scene.state.user.level}`;
    const levelPlate: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.avatar.x, this.avatar.y + this.avatar.displayHeight / 2, 'profile-window-level').setDepth(1);
    this.level = this.scene.add.text(levelPlate.x, levelPlate.y, levelText, levelTextStyle).setDepth(2).setOrigin(0.5);

    this.onlineStatus = this.scene.add.text(pos.x, pos.y + 15, this.scene.state.lang.onlineStatus, onlineStatusTextStyle);

    const statusSettings: IstatusSettings = this.scene.getStatusSettings(this.scene.state.user.status);
    // const statusSettings: IstatusSettings = this.scene.getStatusSettings('unicorn');

    if (statusSettings) {
      const statusTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
        fontFamily: 'Bip',
        fontSize: '20px',
        color: '#fce700',
      };
  
      this.status = this.scene.add.text(pos.x, pos.y + 55, statusSettings?.text, statusTextStyle).setOrigin(0, 0.5);
      this.statusIcon = this.scene.add.sprite(this.status.getBounds().right, this.status.y, statusSettings.iconTexture)
        .setVisible(statusSettings.iconVisible)
        .setOrigin(0, 0.5);
    }

  }

  private createBtns(): void {
    const pos1: Iposition = {
      x: this.x - 150,
      y: this.y + 100,
    };
    const pos2: Iposition = {
      x: this.x,
      y: this.y + 100,
    }
    const pos3: Iposition = {
      x: this.x + 150,
      y: this.y + 100,
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
    if (this.editNicknameBtn) {
      this.scene.clickButton(this.editNicknameBtn, () => { this.onEditNicknameBtn(); });
    }
    this.scene.clickButton(this.closeBtn, () => { this.onCloseBtn(); } );
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
  
  private onEditNicknameBtn(): void {
    this.openSysWindow(12);
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
  }


  private openSysWindow(sysType: number) {
    const modal: Imodal = { type: 1, sysType };
    this.scene.state.modal = modal;
    this.scene.scene.restart(this.scene.state);
  }

  // private create(): void {
  //   // this.scene.textHeader.setText(this.scene.state.lang.profile);

  //   let avatar: Phaser.GameObjects.Sprite;
  //   let login: string = this.scene.state.user.login;
  //   const farm: string = this.scene.state.farm.toLowerCase();
    
  //   const userFarmPart: number = this.scene.state.farm !== 'Unicorn' ? 
  //   this.scene.state[`user${this.scene.state.farm}`].part : 
  //   this.scene.state[`user${this.scene.state.farm}`].points;

  //   if (this.scene.state.platform === 'ya' || this.scene.state.platform === 'vk' || this.scene.state.platform === 'ok') login = this.scene.state.name;

  //   if (this.scene.state.platform === 'vk') avatar = this.scene.add.sprite(200, 0, 'avatar').setScale(0.85).setDepth(1);
  //   else if (this.scene.state.platform === 'ok') avatar = this.scene.add.sprite(200, 0, 'avatar').setScale(1.2).setDepth(1);
  //   else if (this.scene.state.platform === 'ya') avatar = this.scene.add.sprite(200, 0, 'avatar').setDepth(1);
  //   else avatar = this.scene.add.sprite(200, 0, 'farmer').setScale(0.6).setDepth(1);
        
  //   if (avatar.texture.key === '__MISSING') avatar.setTexture('farmer').setScale(0.6);
    
  //   const star: Phaser.GameObjects.Sprite = this.scene.add.sprite(260, 0, 'star').setScale(0.65).setDepth(1);
  //   const level: Phaser.GameObjects.Text = this.scene.add.text(260, 0, String(this.scene.state.user.level), { font: '24px Bip', color: '#925C28' }).setOrigin(0.5, 0.5).setDepth(1);
  //   this.name = this.scene.add.text(305, 0, login, {
  //     font: '25px Shadow',
  //     color: '#925C28',
  //     align: 'left',
  //     wordWrap: { width: 310 }
  //   }).setOrigin(0, 0).setDepth(1);

  //   this.farmer = this.scene.add.text(305, 0, this.scene.state.lang[`${farm}ProfileName`] + ' ' + romanize(userFarmPart), {
  //     font: '24px Bip',
  //     color: '#925C28',
  //     align: 'left',
  //     wordWrap: { width: 310 }
  //   }).setOrigin(0, 0.5).setDepth(1);
    
  //   const statusSettings: IstatusSettings = this.scene.getStatusSettings(this.scene.state.user.status);

  //   if (statusSettings) {
  //     this.statusIcon = this.scene.add.sprite(305, 0, statusSettings.iconTexture).setDepth(2).setOrigin(0, 0.5).setVisible(statusSettings.iconVisible);
  //     this.status = this.scene.add.text(this.statusIcon.getBounds().right + 5, 0, statusSettings.text , {
  //       font: '24px Bip',
  //       color: statusSettings.textColor,
  //       align: 'left',
  //       wordWrap: { width: 310 }
  //     }).setOrigin(0, 0.5).setDepth(2);
  //   }
    
  //   if (this.scene.state.platform === 'web') {
  //     if (this.scene.state.platform === 'web') {
  //       const exit = this.scene.bigButton('orange', 'center', 80, this.scene.state.lang.profileExit);
  //       this.scene.clickModalBtn(exit, (): void => { this.exit() });
  //       this.height += 80;
  //     }
  //     this.nameHeight = this.name.getBounds().height;
  //     if (statusSettings) {
  //       this.setNick(90);
  //       this.updateStatus();
  //     } else this.setNick(58);
  //     this.scene.clickModalBtn({ btn: this.nickBtn, title: this.nickText }, (): void => { this.openSysWindow(12) });
  //   } else if (this.scene.state.platform === 'vk' || this.scene.state.platform === 'ok' || this.scene.state.platform === 'ya') {
  //     this.heightText += this.name.getBounds().height;
  //     this.heightText += this.farmer.getBounds().height;
  //     if (statusSettings) {
  //       this.updateNameAndFarmer(10);
  //       this.updateStatus();
  //     } else this.updateNameAndFarmer(25);
  //   } else if (this.scene.state.platform === 'android') {
  //     this.nameHeight = this.name.getBounds().height;
  //     this.heightText += this.name.getBounds().height;
  //     this.heightText += this.farmer.getBounds().height;
  //     if (statusSettings) {
  //       this.setNick(140);
  //       this.updateNameAndFarmer(-20);
  //       this.updateStatus();
  //     } else {
  //       this.setNick(120);
  //       this.updateNameAndFarmer(0);
  //     }
  //     this.scene.clickModalBtn({ btn: this.nickBtn, title: this.nickText }, (): void => { this.openSysWindow(12) });
  //   }
  //   const support = this.scene.bigButton('green', 'center', 0, this.scene.state.lang.support);
  //   this.scene.clickModalBtn(support, (): void => {

  //   });

  //   if (this.scene.state.platform !== 'ya') {
  //     const agreement: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX, 0, this.scene.state.lang.agreement, {
  //       font: '22px Shadow',
  //       color: '#777777'
  //     }).setOrigin(0.5, 0.5);
  
  //     this.scene.clickButton(agreement, (): void => {  });
  //     agreement.setY(this.scene.cameras.main.centerY + (this.height / 2) + 10);
  //   }
    
  //   const bg: Phaser.GameObjects.Graphics = this.scene.add.graphics({ x: 115, y: this.scene.cameras.main.centerY - (this.height / 2) + 25 });
  //   bg.fillStyle(0xF8EFCE, 1);
  //   bg.fillRoundedRect(0, 0, 490, 220, 16);

  //   support.btn.setY(this.scene.cameras.main.centerY + (this.height / 2) - 60);
  //   support.title.setY(support.btn.y - 5);
  //   avatar.setY(this.scene.cameras.main.centerY - (this.height / 2) + 135);
  //   star.setY(avatar.y - 65);
  //   level.setY(star.y);

  //   if (this.scene.state.platform !== 'web') {
  //     const mask: Phaser.GameObjects.Sprite = this.scene.add.sprite(avatar.x, avatar.y, 'farmer').setScale(0.6).setVisible(false);
  //     avatar.mask = new Phaser.Display.Masks.BitmapMask(this.scene, mask);
  //   } 

  //   // this.scene.resizeWindow(this.height);
  // }


  // private setNick(btnPadiingY: number): void {
  //   this.name.setY(this.scene.cameras.main.centerY - 170);
  //   this.farmer.setY(this.name.y + this.nameHeight + 23);
  //   this.nickBtn = this.scene.add.sprite(405, this.farmer.y + btnPadiingY, 'middle-button').setDepth(1);
  //   this.nickText = this.scene.add.text(405, this.farmer.y + btnPadiingY - 2, this.scene.state.lang.changeNick, {
  //     font: '22px Shadow',
  //     color: '#FFFFFF'
  //   }).setOrigin(0.5, 0.5).setDepth(1);
  // }


  // private updateStatus(): void {
  //   this.status.setY(this.farmer.getBounds().height + 7 + this.farmer.y);
  //   this.statusIcon.setY(this.status.y);
  // }


  // private updateNameAndFarmer(namePaddingY: number): void {
  //   this.name.setY(this.scene.cameras.main.centerY - (this.height / 2) + namePaddingY + (110 - this.heightText / 2));
  //   this.farmer.setY(this.name.y + this.name.getBounds().height + 23);
  // }







}