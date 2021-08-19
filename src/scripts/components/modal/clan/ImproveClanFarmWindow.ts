import Modal from '../../../scenes/Modal/Modal';
import ClanWindow from './ClanWindow';
import axios, { AxiosResponse } from 'axios';
import BigInteger from './../../../libs/BigInteger';
import { shortNum } from '../../../general/basic';

const improveSettings: Array<string> = [
  '1000000',
  '10000000',
  '100000000',
  '1000000000',
  '10000000000',
  '100000000000',
  '1000000000000',
  '10000000000000',
  '100000000000000',
];

export default class ImproveClanFarmWindow {
  private window: ClanWindow;
  private scene: Modal;
  private price: string;
  private x: number;
  private y: number;
  private farm: string;

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
    this.farm = this.scene.state.modal.message;
    this.price = improveSettings[this.scene.state.clan[this.farm].level - 1];
    this.window.headerText.setText(this.scene.state.lang[`${this.farm}ClanFarm`]).setFontSize(30);
  }

  private createText(): void {
    const pos: Iposition = {
      x: this.x - 230,
      y: this.y + 80,
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
      fontSize: '20px',
      color: '#92450c'
    };

    const noteTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F19D38',
      fontFamily: 'Shadow',
      fontSize: '20px',
      align: 'center',
      wordWrap: { width: 450, useAdvancedWrap: true },
    }

    this.scene.add.nineslice(this.x, pos.y - 265, this.window.width - 30, 100, 'tasks-bar-ns', 15).setOrigin(0.5);
    this.scene.add.text(this.x, pos.y - 265, 'Чем выше уровень клановой фермы, тем выше доход на твоей собственной ферме', noteTextStyle).setOrigin(0.5);
    const bg: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x, pos.y - 110, `${this.farm}-herd-boost-icon`).setDepth(1);
    this.scene.add.sprite(bg.x, bg.y + 10, 'clan-window-wreath').setDepth(1);
    this.scene.add.nineslice(this.x, bg.y, this.window.width, bg.displayHeight + 10, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);

    const levelPlate: Phaser.GameObjects.Sprite = this.scene.add.sprite(bg.x, bg.y + bg.displayHeight / 2 - 20, 'profile-window-level').setDepth(1);

    const levelText: Phaser.GameObjects.Text = this.scene.add.text(levelPlate.x, levelPlate.y, `${this.scene.state.lang.level} ${this.scene.state.clan[this.farm].level}`, levelTextStyle).setDepth(2).setOrigin(0.5);

    const text1: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, this.scene.state.lang.increasingFarmIncomeNow, textStyle).setDepth(1);
    const count1: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 400, text1.getBounds().centerY, `${String(this.scene.state.clan[this.farm].level)}%`, textStyle).setOrigin(0, 0.5).setDepth(1).setFontFamily('Shadow').setFontSize(30);
    this.scene.add.nineslice(this.x, text1.getBounds().centerY, this.window.width, text1.displayHeight + 20, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);
    const text2: Phaser.GameObjects.Text = this.scene.add.text(pos.x, text1.getBounds().bottom + 30, this.scene.state.lang.increasingFarmIncomeAfterImprove, textStyle).setDepth(1);
    const count2: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 400, text2.getBounds().centerY, `${String(this.scene.state.clan[this.farm].level + 1)}%`, textStyle).setDepth(1).setColor('#dcff3c').setOrigin(0, 0.5).setFontFamily('Shadow').setFontSize(30);
    this.scene.add.nineslice(this.x, text2.getBounds().centerY, this.window.width, text2.displayHeight + 20, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);

    this.scene.add.sprite(count2.getBounds().right + 25, count2.y - 7, 'chat-arrow').setAngle(90).setScale(0.65);
    this.scene.add.sprite(count2.getBounds().right + 25, count2.y + 7, 'chat-arrow').setAngle(90).setScale(0.65);
    
  }

  private createBtns(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#E73F00',
      fontFamily: 'Shadow',
      fontSize: '16px',
      align: 'center',
    }
    const padding: number = 310;
    const right1 = {
      text: shortNum(this.price),
      icon: `${this.farm}Coin`
    };
    if (this.scene.state.clan.ownerId === this.scene.state.user.id) {
      const btn1 = this.scene.bigButton('green', 'left', padding, this.scene.state.lang.improveFarm, right1);  
      this.scene.clickModalBtn(btn1, () => { this.handleImprove(); });
    } else {
      const btn1 = this.scene.bigButton('grey', 'left', padding + 10, this.scene.state.lang.improveFarm, right1);
      this.scene.add.text(this.x, this.y + padding - 40, 'Действие доступно только для главы клана', textStyle).setOrigin(0.5)
    }
  }

  private handleImprove(): void {
    if (BigInteger.greaterThanOrEqual(this.scene.state.clan[this.farm].money, this.price)) {
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
        count: BigInteger.subtract(this.price, this.scene.state.clan[this.farm].money),
        diamonds: 100,
        type: this.farm === 'sheep' ? 2 : this.farm === 'chicken' ? 3 : 4,
      }
      this.scene.scene.restart(this.scene.state);
    }
  }

  private postServer(): Promise<AxiosResponse<any>> {
    const data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      type: this.farm,
    };
    return axios.post(process.env.API + '/improveClanBuilding', data);
  }
};
