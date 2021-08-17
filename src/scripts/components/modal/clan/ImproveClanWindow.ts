import Modal from '../../../scenes/Modal/Modal';
import ClanWindow from './ClanWindow';
import axios, { AxiosResponse } from 'axios';

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
    this.price = 100 * Math.pow(2, this.scene.state.clan.mainBuilding.level - 1);
    this.window.headerText.setText(`${this.scene.state.lang.clanImprovement}${this.scene.state.clan.mainBuilding.level}`).setFontSize(30);
  }

  private createText(): void {
    const pos: Iposition = {
      x: this.x - 230,
      y: this.y - 100,
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
    const text1: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, 'Максимальное количество игроков сейчас:', textStyle);
    const count1: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 400, text1.getBounds().centerY, String(this.scene.state.clan.limit), textStyle).setOrigin(0, 0.5);
    const text2: Phaser.GameObjects.Text = this.scene.add.text(pos.x, text1.getBounds().bottom + 5, 'Максимальное количество игроков при улучшении:', textStyle);
    const count2: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 400, text2.getBounds().centerY, String(this.scene.state.clan.limit + 1) + '⬆️', textStyle).setColor('#00aa00').setOrigin(0, 0.5);
    // const incText: Phaser.GameObjects.Text = this.scene.add.text(count2.getBounds().right + 5, count2.y, '(+1)', textStyle).setOrigin(0, 0.5).setColor('#00aa00');
  }

  private createBtns(): void {
    const padding: number = 90;
    const right1 = {
      text: this.price,
      icon: 'diamond'
    };
    const btn1 = this.scene.bigButton('green', 'left', padding, this.scene.state.lang.improveClan, right1);  
    this.scene.clickModalBtn(btn1, () => { this.handleImprove(); });

    const btn2 = this.scene.bigButton('yellow', 'center', padding + 90, this.scene.state.lang.cancel);  
    this.scene.clickModalBtn(btn2, () => { this.handleCancel(); });
  }

  private handleImprove(): void {
    if (this.scene.state.clan.diamond.count >= this.price) {
      this.postServer().then(res => {
        this.scene.scene.stop();
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
