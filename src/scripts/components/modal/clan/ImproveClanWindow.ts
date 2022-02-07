import Modal from '../../../scenes/Modal/Modal';
import ClanWindow from './ClanWindow';
import axios, { AxiosResponse } from 'axios';
import { shortNum } from '../../../general/basic';

export default class ImproveClanWindow {
  private window: ClanWindow;
  private scene: Modal;
  private price: number;
  private x: number;
  private y: number;

  constructor(window: ClanWindow) {
    this.window = window;
    this.scene = window.scene;
    this.init();
    this.createText();
    this.createBtns();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.price = 100 * Math.pow(2, this.scene.state.clan.main.level - 1);
    this.window.headerText.setText(this.scene.state.lang.clanImprovement);
  }

  private createText(): void {
    const pos: Iposition = {
      x: this.x - 230,
      y: this.y - 10,
    };
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#fffdfa',
      fontFamily: 'Bip',
      fontSize: '24px',
      align: 'left',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
      wordWrap: { width: 400, useAdvancedWrap: true },
    }

    const levelTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '40px',
      align: 'center',
      color: '#fffcf9',
    };

    const bg: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x, pos.y - 120, 'clan-window-wreath-bg').setDepth(1);
    this.scene.add.sprite(bg.x, bg.y + 10, 'clan-window-wreath').setDepth(1);
    this.scene.add.tileSprite(this.x, bg.y, this.window.width, bg.displayHeight + 20, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);

    const levelText: Phaser.GameObjects.Text = this.scene.add.text(bg.x, bg.y - 20, String(this.scene.state.clan.main.level), levelTextStyle).setDepth(2).setOrigin(0.5);
    this.scene.add.text(bg.x, levelText.getBounds().bottom, this.scene.state.lang.lvl, levelTextStyle).setDepth(2).setFontSize(30).setColor('#a98dc3').setOrigin(0.5, 0);
    const text1: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, this.scene.state.lang.maxLimitBeforeImprove, textStyle).setDepth(1);
    const count1: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 400, text1.getBounds().centerY, String(this.scene.state.clan.limit), textStyle).setOrigin(0, 0.5).setDepth(1).setFontFamily('Shadow').setFontSize(30);
    this.scene.add.tileSprite(this.x, text1.getBounds().centerY, this.window.width, text1.displayHeight + 20, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);
    const text2: Phaser.GameObjects.Text = this.scene.add.text(pos.x, text1.getBounds().bottom + 40, this.scene.state.lang.maxLimitAfterImprove, textStyle).setDepth(1);
    const count2: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 400, text2.getBounds().centerY, String(this.scene.state.clan.limit + 1), textStyle).setDepth(1).setColor('#dcff3c').setOrigin(0, 0.5).setFontFamily('Shadow').setFontSize(30);
    this.scene.add.tileSprite(this.x, text2.getBounds().centerY, this.window.width, text2.displayHeight + 20, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);

    this.scene.add.sprite(count2.getBounds().right + 25, count2.y - 7, 'chat-arrow').setAngle(90).setScale(0.65);
    this.scene.add.sprite(count2.getBounds().right + 25, count2.y + 7, 'chat-arrow').setAngle(90).setScale(0.65);
    
  }

  private createBtns(): void {
    const padding: number = 220;
    const right1 = {
      text: this.price,
      icon: 'clan-diamond-coin'
    };
    const btn1 = this.scene.bigButton('green', 'left', padding, this.scene.state.lang.improveClan, right1);  
    this.scene.clickModalBtn(btn1, () => { this.handleImprove(); });

    const btn2 = this.scene.bigButton('yellow', 'center', padding + 90, this.scene.state.lang.cancel);  
    this.scene.clickModalBtn(btn2, () => { this.handleCancel(); });
  }

  private handleImprove(): void {
    if (this.scene.state.clan.diamond.count >= this.price) {
      this.postServer().then(res => {
        if (!res.data) {
          this.scene.state.amplitude.logAmplitudeEvent('clan_diamonds_spent', {
            type: 'improve_office',
            count: this.price,
          });
          this.scene.scene.stop();
        }
      });
    } else {
      this.scene.state.modal = {
        type: 18,
        clanWindowType: 4,
      };
      this.scene.state.convertor = {
        fun: 0,
        count: this.price - this.scene.state.clan.diamond.count,
        diamonds: this.price - this.scene.state.clan.diamond.count,
        type: 1,
      }
      this.scene.scene.restart(this.scene.state);
    }
  }

  private postServer(): Promise<AxiosResponse<any>> {
    const data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      type: 'main',
      price: this.price,
    };
    return axios.post(process.env.API + '/improveClanBuilding', data);
  }

  private handleCancel(): void {
    this.scene.state.modal = {
      type: 17,
      clanTabType: 4,
    };
    this.scene.scene.restart(this.scene.state);
  }
};
