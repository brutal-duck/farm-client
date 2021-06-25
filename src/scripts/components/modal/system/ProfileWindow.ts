import { romanize } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class ProfileWindow {
  public scene: Modal;

  private height: number;
  private heightText: number;

  private name: Phaser.GameObjects.Text
  private nameHeight: number
  private farmer: Phaser.GameObjects.Text
  private statusIcon: Phaser.GameObjects.Sprite;
  private status: Phaser.GameObjects.Text; 
  private nickBtn: Phaser.GameObjects.Sprite;
  private nickText: Phaser.GameObjects.Text;


  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.height = 360
    this.heightText = 23
  }

  private create(): void {

    this.scene.textHeader.setText(this.scene.state.lang.profile);

    let avatar: Phaser.GameObjects.Sprite;
    let login: string = this.scene.state.user.login;
    const farm: string = this.scene.state.farm.toLowerCase();
    
    const userFarmPart: number = this.scene.state.farm !== 'Unicorn' ? 
    this.scene.state[`user${this.scene.state.farm}`].part : 
    this.scene.state[`user${this.scene.state.farm}`].maxLevelAnimal;

    if (this.scene.state.platform === 'ya' || this.scene.state.platform === 'vk' || this.scene.state.platform === 'ok') login = this.scene.state.name;

    if (this.scene.state.platform === 'vk') avatar = this.scene.add.sprite(200, 0, 'avatar').setScale(0.85).setDepth(1);
    else if (this.scene.state.platform === 'ok') avatar = this.scene.add.sprite(200, 0, 'avatar').setScale(1.2).setDepth(1);
    else if (this.scene.state.platform === 'ya') avatar = this.scene.add.sprite(200, 0, 'avatar').setDepth(1);
    else avatar = this.scene.add.sprite(200, 0, 'farmer').setScale(0.6).setDepth(1);
        
    if (avatar.texture.key === '__MISSING') avatar.setTexture('farmer').setScale(0.6);
    
    const star: Phaser.GameObjects.Sprite = this.scene.add.sprite(260, 0, 'star').setScale(0.65).setDepth(1);
    const level: Phaser.GameObjects.Text = this.scene.add.text(260, 0, String(this.scene.state.user.level), { font: '24px Bip', color: '#925C28' }).setOrigin(0.5, 0.5).setDepth(1);
    this.name = this.scene.add.text(305, 0, login, {
      font: '25px Shadow',
      color: '#925C28',
      align: 'left',
      wordWrap: { width: 310 }
    }).setOrigin(0, 0).setDepth(1);

    this.farmer = this.scene.add.text(305, 0, this.scene.state.lang[`${farm}ProfileName`] + ' ' + romanize(userFarmPart), {
      font: '24px Bip',
      color: '#925C28',
      align: 'left',
      wordWrap: { width: 310 }
    }).setOrigin(0, 0.5).setDepth(1);
    
    const statusSettings: IstatusSettings = this.scene.getStatusSettings(this.scene.state.user.status);

    if (statusSettings) {
      this.statusIcon = this.scene.add.sprite(305, 0, statusSettings.iconTexture).setDepth(2).setOrigin(0, 0.5).setVisible(statusSettings.iconVisible);
      this.status = this.scene.add.text(this.statusIcon.getBounds().right + 5, 0, statusSettings.text , {
        font: '24px Bip',
        color: statusSettings.textColor,
        align: 'left',
        wordWrap: { width: 310 }
      }).setOrigin(0, 0.5).setDepth(2);
    }
    
    if (this.scene.state.platform === 'web') {
      if (this.scene.state.platform === 'web') {
        const exit = this.scene.bigButton('orange', 'center', 80, this.scene.state.lang.profileExit);
        this.scene.clickModalBtn(exit, (): void => { this.exit() });
        this.height += 80;
      }
      this.nameHeight = this.name.getBounds().height;
      if (statusSettings) {
        this.setNick(90);
        this.updateStatus();
      } else this.setNick(58);
      this.scene.clickModalBtn({ btn: this.nickBtn, title: this.nickText }, (): void => { this.openSysWindow(12) });
    } else if (this.scene.state.platform === 'vk' || this.scene.state.platform === 'ok' || this.scene.state.platform === 'ya') {
      this.heightText += this.name.getBounds().height;
      this.heightText += this.farmer.getBounds().height;
      if (statusSettings) {
        this.updateNameAndFarmer(10);
        this.updateStatus();
      } else this.updateNameAndFarmer(25);
    } else if (this.scene.state.platform === 'android') {
      this.nameHeight = this.name.getBounds().height;
      this.heightText += this.name.getBounds().height;
      this.heightText += this.farmer.getBounds().height;
      if (statusSettings) {
        this.setNick(140);
        this.updateNameAndFarmer(-20);
        this.updateStatus();
      } else {
        this.setNick(120);
        this.updateNameAndFarmer(0);
      }
      this.scene.clickModalBtn({ btn: this.nickBtn, title: this.nickText }, (): void => { this.openSysWindow(12) });
    }
    const support = this.scene.bigButton('green', 'center', 0, this.scene.state.lang.support);
    this.scene.clickModalBtn(support, (): void => {
      if (this.scene.state.platform === 'vk') window.open(process.env.VK_SUPPORT_LINK, '_blank');
      else if (this.scene.state.platform === 'ok') window.open(process.env.OK_SUPPORT_LINK, '_blank');
      else this.openSysWindow(14)
    });

    const agreement: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX, 0, this.scene.state.lang.agreement, {
      font: '22px Shadow',
      color: '#777777'
    }).setOrigin(0.5, 0.5);

    this.scene.clickButton(agreement, (): void => { window.open('https://' + location.hostname + '/agreement', '_blank') });
    
    const bg: Phaser.GameObjects.Graphics = this.scene.add.graphics({ x: 115, y: this.scene.cameras.main.centerY - (this.height / 2) + 25 });
    bg.fillStyle(0xF8EFCE, 1);
    bg.fillRoundedRect(0, 0, 490, 220, 16);

    agreement.setY(this.scene.cameras.main.centerY + (this.height / 2) + 10);
    support.btn.setY(this.scene.cameras.main.centerY + (this.height / 2) - 60);
    support.title.setY(support.btn.y - 5);
    avatar.setY(this.scene.cameras.main.centerY - (this.height / 2) + 135);
    star.setY(avatar.y - 65);
    level.setY(star.y);

    if (this.scene.state.platform !== 'web') {
      const mask: Phaser.GameObjects.Sprite = this.scene.add.sprite(avatar.x, avatar.y, 'farmer').setScale(0.6).setVisible(false);
      avatar.mask = new Phaser.Display.Masks.BitmapMask(this.scene, mask);
    } 

    this.scene.resizeWindow(this.height);
  
  }


  private setNick(btnPadiingY: number): void {
    this.name.setY(this.scene.cameras.main.centerY - 170);
    this.farmer.setY(this.name.y + this.nameHeight + 23);
    this.nickBtn = this.scene.add.sprite(405, this.farmer.y + btnPadiingY, 'middle-button').setDepth(1);
    this.nickText = this.scene.add.text(405, this.farmer.y + btnPadiingY - 2, this.scene.state.lang.changeNick, {
      font: '22px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setDepth(1);
  }


  private updateStatus(): void {
    this.status.setY(this.farmer.getBounds().height + 7 + this.farmer.y);
    this.statusIcon.setY(this.status.y);
  }


  private updateNameAndFarmer(namePaddingY: number): void {
    this.name.setY(this.scene.cameras.main.centerY - (this.height / 2) + namePaddingY + (110 - this.heightText / 2));
    this.farmer.setY(this.name.y + this.name.getBounds().height + 23);
  }


  private openSysWindow(sysType: number) {
    const modal: Imodal = { type: 1, sysType }
    this.scene.state.modal = modal;
    this.scene.game.scene.keys[this.scene.state.farm].scene.launch('Modal', this.scene.state);
  }


  private exit(): void {
    document.cookie = "farmHASH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.farm = '';
    window.location.reload();
  }

}