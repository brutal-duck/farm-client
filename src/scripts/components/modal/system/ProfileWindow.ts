import { romanize } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class ProfileWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    this.scene.textHeader.setText(this.scene.state.lang.profile);

    let height: number = 360;
    let exit: any;
    let nickBtn: Phaser.GameObjects.Sprite;
    let nickText: Phaser.GameObjects.Text;
    let avatar: Phaser.GameObjects.Sprite;
    let login: string = this.scene.state.user.login;
    let farm: string = this.scene.state.farm.toLowerCase();
    let userFarmPart: number = this.scene.state.farm !== 'Unicorn' ? 
    this.scene.state[`user${this.scene.state.farm}`].part : 
    this.scene.state[`user${this.scene.state.farm}`].maxLevelAnimal;

    if (this.scene.state.platform !== 'web') login = this.scene.state.name;

    if (this.scene.state.platform === 'vk') {

      avatar = this.scene.add.sprite(200, 0, 'avatar').setScale(0.7).setDepth(1);
      
    } else if (this.scene.state.platform === 'ok') {
      
      avatar = this.scene.add.sprite(200, 0, 'avatar').setDepth(1);
      
    } else {
      
      avatar = this.scene.add.sprite(200, 0, 'farmer').setScale(0.6).setDepth(1);
      
    }
    
    if (avatar.texture.key === '__MISSING') {
      avatar.setTexture('farmer').setScale(0.6);
    }
    
    
    let star: Phaser.GameObjects.Sprite = this.scene.add.sprite(260, 0, 'star').setScale(0.65).setDepth(1);

    let level: Phaser.GameObjects.Text = this.scene.add.text(260, 0, String(this.scene.state.user.level), {
      font: '24px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5).setDepth(1);

    let name: Phaser.GameObjects.Text = this.scene.add.text(305, 0, login, {
      font: '25px Shadow',
      color: '#925C28',
      align: 'left',
      wordWrap: { width: 310 }
    }).setOrigin(0, 0).setDepth(1);

    let farmer: Phaser.GameObjects.Text = this.scene.add.text(305, 0, this.scene.state.lang[`${farm}ProfileName`] + ' ' + romanize(userFarmPart), {
      font: '24px Bip',
      color: '#925C28',
      align: 'left',
      wordWrap: { width: 310 }
    }).setOrigin(0, 0.5).setDepth(1);
    
    let statusSettings: IstatusSettings = this.scene.getStatusSettings(this.scene.state.user.status);
    let statusIcon: Phaser.GameObjects.Sprite ;
    let status: Phaser.GameObjects.Text; 

    if (statusSettings) {
      statusIcon = this.scene.add.sprite(305, 0, statusSettings.iconTexture).setDepth(2).setOrigin(0, 0.5).setVisible(statusSettings.iconVisible);

      status = this.scene.add.text(statusIcon.getBounds().right + 5, 0, statusSettings.text , {
        font: '24px Bip',
        color: statusSettings.textColor,
        align: 'left',
        wordWrap: { width: 310 }
      }).setOrigin(0, 0.5).setDepth(2);
    }
    
    if (this.scene.state.platform === 'web') {
    
      exit = this.scene.bigButton('orange', 'center', 80, this.scene.state.lang.profileExit);
      this.scene.clickModalBtn(exit, (): void => {
        document.cookie = "farmHASH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.farm = '';
        window.location.reload();
      });
      let nameHeight: number = name.getBounds().height;

      if (statusSettings) {
        
        name.y = this.scene.cameras.main.centerY - 170;
        farmer.y = name.y + nameHeight + 23;
        status.y = farmer.getBounds().height + 7 + farmer.y;
        statusIcon.y = status.y;
        
        nickBtn = this.scene.add.sprite(405, farmer.y + 90, 'middle-button').setDepth(1);
        nickText = this.scene.add.text(405, farmer.y + 88, this.scene.state.lang.changeNick, {
          font: '22px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5).setDepth(1);

      } else {

        name.y = this.scene.cameras.main.centerY - 170;
        farmer.y = name.y + nameHeight + 23;
        
        nickBtn = this.scene.add.sprite(405, farmer.y + 58, 'middle-button').setDepth(1);
        nickText = this.scene.add.text(405, farmer.y + 55, this.scene.state.lang.changeNick, {
          font: '22px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5).setDepth(1);
      }

      this.scene.clickModalBtn({ btn: nickBtn, title: nickText }, (): void => {
        let modal: Imodal = {
          type: 1,
          sysType: 12
        }
        this.scene.state.modal = modal;
        this.scene.game.scene.keys[this.scene.state.farm].scene.launch('Modal', this.scene.state);
      });

      height += 80;

    } else {
      
      let heightText: number = 23;
      heightText += name.getBounds().height;
      heightText += farmer.getBounds().height;

      if (statusSettings) {

        name.y = this.scene.cameras.main.centerY - (height / 2) + 10 + (110 - heightText / 2);
    
        farmer.y = name.y + name.getBounds().height + 23;
    
        status.y = farmer.getBounds().height + 7 + farmer.y;
        statusIcon.y = status.y;

      } else {
    
        name.y = this.scene.cameras.main.centerY - (height / 2) + 25 + (110 - heightText / 2);
    
        farmer.y = name.y + name.getBounds().height + 23;
      }
      
    }

    let support = this.scene.bigButton('green', 'center', 0, this.scene.state.lang.support);
    this.scene.clickModalBtn(support, (): void => {

      if (this.scene.state.platform === 'vk') {

        window.open(process.env.VK_SUPPORT_LINK, '_blank');
        
      } else if (this.scene.state.platform === 'ok') {
        
        window.open(process.env.OK_SUPPORT_LINK, '_blank');

      } else {
        
        let modal: Imodal = {
          type: 1,
          sysType: 14
        }
        this.scene.state.modal = modal;
        this.scene.game.scene.keys[this.scene.state.farm].scene.launch('Modal', this.scene.state);
      }

    });

    let agreement: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX, 0, this.scene.state.lang.agreement, {
      font: '22px Shadow',
      color: '#777777'
    }).setOrigin(0.5, 0.5);

    this.scene.clickButton(agreement, (): void => {
      window.open('https://' + location.hostname + '/agreement', '_blank');
    });
    
    let bg: Phaser.GameObjects.Graphics = this.scene.add.graphics({ x: 115, y: this.scene.cameras.main.centerY - (height / 2) + 25 });
    bg.fillStyle(0xF8EFCE, 1);
    bg.fillRoundedRect(0, 0, 490, 220, 16);

    agreement.y = this.scene.cameras.main.centerY + (height / 2) + 10;
    support.btn.y = this.scene.cameras.main.centerY + (height / 2) - 60;
    support.title.y = support.btn.y - 5;
    avatar.y = this.scene.cameras.main.centerY - (height / 2) + 135;
    star.y = avatar.y - 65;
    level.y = star.y;

    if (this.scene.state.platform !== 'web') {
      const mask: Phaser.GameObjects.Sprite = this.scene.add.sprite(avatar.x, avatar.y, 'farmer').setScale(0.6).setVisible(false);
      avatar.mask = new Phaser.Display.Masks.BitmapMask(this.scene, mask);
    } 
    this.scene.resizeWindow(height);
  
  }
}