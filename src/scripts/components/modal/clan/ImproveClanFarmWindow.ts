import Modal from '../../../scenes/Modal/Modal';
import ClanWindow from './ClanWindow';
import axios, { AxiosResponse } from 'axios';
import BigInteger from './../../../libs/BigInteger';
import { shortNum, shortTime } from '../../../general/basic';
import { improveClanFarm } from '../../../local/settings';


export default class ImproveClanFarmWindow extends Phaser.GameObjects.Sprite{
  private window: ClanWindow;
  public scene: Modal;
  private price: string;
  public x: number;
  public y: number;
  private farm: string;
  private timer: Phaser.GameObjects.Text;
  private level: number;
  private leftText: Phaser.GameObjects.Text;

  constructor(window: ClanWindow) {
    super(window.scene, 0, 0, 'pixel');
    this.window = window;
    this.scene = window.scene;
    this.init();
    if (this.price) {
      this.createLevel();
      this.createBtns();
    } else {
      this.createMaxLevel();
    }
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.scene.add.existing(this);
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.farm = this.scene.state.modal.message;
    this.level = this.scene.state.clan[this.farm].cooldown > 0 ? this.scene.state.clan[this.farm].level - 1 : this.scene.state.clan[this.farm].level;
    this.price = improveClanFarm[this.level - 1];
    this.window.headerText.setText(this.scene.state.lang[`${this.farm}ClanFarm`]).setFontSize(30);
  }

  private createLevel(): void {
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
    };

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
      wordWrap: { width: 400, useAdvancedWrap: true },
    }

    this.scene.add.nineslice(this.x, pos.y - 265, this.window.width - 30, 100, 'tasks-bar-ns', 15).setOrigin(0.5);
    this.scene.add.text(this.x, pos.y - 265, this.scene.state.lang.clanFarmImproveNote, noteTextStyle).setOrigin(0.5);
    const bg: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x, pos.y - 110, `icon-clan-${this.farm}`).setDepth(1);
    this.scene.add.sprite(bg.x, bg.y + 10, 'clan-window-wreath').setDepth(1);
    this.scene.add.tileSprite(this.x, bg.y, this.window.width, bg.displayHeight + 10, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);

    const levelPlate: Phaser.GameObjects.Sprite = this.scene.add.sprite(bg.x, bg.y + bg.displayHeight / 2 - 20, 'profile-window-level').setDepth(1);

    const levelText: Phaser.GameObjects.Text = this.scene.add.text(levelPlate.x, levelPlate.y, `${this.scene.state.lang.level} ${this.level}`, levelTextStyle).setDepth(2).setOrigin(0.5);

    let nowText: string = '';
    let nextText: string = '';

    if (this.farm === 'sheep') {
      nowText = this.scene.state.lang.increasingSheepFarmIncomeNow
      nextText = this.scene.state.lang.increasingSheepFarmIncomeAfterImprove
    } else if (this.farm === 'chicken') {
      nowText = this.scene.state.lang.increasingChickenFarmIncomeNow
      nextText = this.scene.state.lang.increasingChickenFarmIncomeAfterImprove
    } else if (this.farm === 'cow') {
      nowText = this.scene.state.lang.increasingCowFarmIncomeNow
      nextText = this.scene.state.lang.increasingCowFarmIncomeAfterImprove
    }
    

    const text1: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, nowText, textStyle).setDepth(1);
    const count1: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 400, text1.getBounds().centerY, `${String(this.level)}%`, textStyle).setOrigin(0, 0.5).setDepth(1).setFontFamily('Shadow').setFontSize(30);
    this.scene.add.tileSprite(this.x, text1.getBounds().centerY, this.window.width, text1.displayHeight + 20, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);
    const text2: Phaser.GameObjects.Text = this.scene.add.text(pos.x, text1.getBounds().bottom + 30, nextText, textStyle).setDepth(1);
    const count2: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 400, text2.getBounds().centerY, `${String(this.level + 1)}%`, textStyle).setDepth(1).setColor('#dcff3c').setOrigin(0, 0.5).setFontFamily('Shadow').setFontSize(30);
    this.scene.add.tileSprite(this.x, text2.getBounds().centerY, this.window.width, text2.displayHeight + 20, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);

    this.scene.add.sprite(this.window.bg.getBounds().right - 30, count2.y - 7, 'chat-arrow').setAngle(90).setScale(0.65);
    this.scene.add.sprite(this.window.bg.getBounds().right - 30, count2.y + 7, 'chat-arrow').setAngle(90).setScale(0.65);
    
  }

  private createMaxLevel(): void {
    const pos: Iposition = {
      x: this.x - 230,
      y: this.y + 140,
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
      wordWrap: { width: 350, useAdvancedWrap: true },
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

    const maxLevelStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#dcff3c',
      fontFamily: 'Bip',
      fontSize: '30px',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
      wordWrap: { width: 400, useAdvancedWrap: true },
    }

    this.scene.add.nineslice(this.x, pos.y - 265, this.window.width - 30, 100, 'tasks-bar-ns', 15).setOrigin(0.5);
    this.scene.add.text(this.x, pos.y - 265, this.scene.state.lang.clanFarmImproveNote, noteTextStyle).setOrigin(0.5);
    const bg: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x, pos.y - 110, `icon-clan-${this.farm}`).setDepth(1);
    this.scene.add.sprite(bg.x, bg.y + 10, 'clan-window-wreath').setDepth(1);
    this.scene.add.tileSprite(this.x, bg.y, this.window.width, bg.displayHeight + 10, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);

    const levelPlate: Phaser.GameObjects.Sprite = this.scene.add.sprite(bg.x, bg.y + bg.displayHeight / 2 - 20, 'profile-window-level').setDepth(1);

    const levelText: Phaser.GameObjects.Text = this.scene.add.text(levelPlate.x, levelPlate.y, `${this.scene.state.lang.level} ${this.level}`, levelTextStyle).setDepth(2).setOrigin(0.5);

    const text1: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, this.scene.state.lang.increasingFarmIncome, textStyle).setDepth(1);
    const count1: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 400, text1.getBounds().centerY, `${String(this.level)}%`, textStyle).setOrigin(0, 0.5).setDepth(1).setFontFamily('Shadow').setFontSize(30);
    this.scene.add.tileSprite(this.x, text1.getBounds().centerY, this.window.width, text1.displayHeight + 20, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);
    
    this.scene.add.text(this.x, pos.y + 100, this.scene.state.lang.maxLevelFarm, maxLevelStyle)
      .setOrigin(0.5)
      .setDepth(1)

    this.window.resize(400);
  }

  private createBtns(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#E73F00',
      fontFamily: 'Shadow',
      fontSize: '20px',
      align: 'center',
    };
    const ownerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#FFFDFA',
      fontFamily: 'Shadow',
      fontSize: '22px',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };

    const padding: number = 310;
    const right1 = {
      text: shortNum(this.price),
      icon: `clan-${this.farm}-coin`
    };

    this.leftText = this.scene.add.text(0, this.y + padding - 40, this.scene.state.lang.left, ownerTextStyle).setOrigin(0, 0.5);
    this.timer = this.scene.add.text(0, this.y + padding - 40, '', ownerTextStyle).setColor('#dcff3c').setOrigin(0, 0.5);

    if (this.scene.state.clan.ownerId === this.scene.state.user.id) {
      if (this.scene.state.clan[this.farm].cooldown > 0) {
        const estimateCost: number = Math.round(this.scene.state.clan[this.farm].cooldown / 60) * 2;
        right1.text = String(estimateCost > 1000 ? 1000 : estimateCost);
        right1.icon = 'clan-diamond-coin';
        const btn1 = this.scene.bigButton('green', 'left', padding + 10, this.scene.state.lang.speedUpImprovment, right1);  
        this.scene.clickModalBtn(btn1, () => { this.handleSpeedUp(); });
      } else {
        const btn1 = this.scene.bigButton('green', 'left', padding, this.scene.state.lang.improveFarm, right1);  
        this.scene.clickModalBtn(btn1, () => { this.handleImprove(); });
        this.timer.setVisible(false);
        this.leftText.setVisible(false);
      }
    } else {
      this.timer.setVisible(false);
      this.leftText.setVisible(false);
      if (this.scene.state.clan[this.farm].cooldown > 0) {
        const estimateCost: number = Math.round(this.scene.state.clan[this.farm].cooldown / 60) * 2;
        right1.text = String(estimateCost > 1000 ? 1000 : estimateCost);
        right1.icon = 'clan-diamond-coin';
        this.scene.add.text(this.x, this.y + padding - 40, this.scene.state.lang.actionIsAvailableHead, textStyle).setOrigin(0.5);
        const btn1 = this.scene.bigButton('grey', 'left', padding + 10, this.scene.state.lang.speedUpImprovment, right1);
      } else {
        this.scene.add.text(this.x, this.y + padding - 40, this.scene.state.lang.actionIsAvailableHead, textStyle).setOrigin(0.5);
        const btn1 = this.scene.bigButton('grey', 'left', padding + 10, this.scene.state.lang.improveFarm, right1);
      }
    }
  }

  private handleImprove(): void {
    if (BigInteger.greaterThanOrEqual(this.scene.state.clan[this.farm].money, this.price)) {
      this.postServer().then(res => {
        if (!res.data) {
          this.scene.state.amplitude.logAmplitudeEvent(`clan_${this.farm}_improve`, {
            level: this.level + 1,
          });
        }
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

  private handleSpeedUp(): void {
    this.scene.state.modal = {
      type: 18,
      clanWindowType: 6,
      message: this.farm,
    };
    this.scene.scene.restart(this.scene.state);
  }

  private postServer(): Promise<AxiosResponse<any>> {
    const data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      type: this.farm,
      price: this.price,
    };
    return axios.post(process.env.API + '/improveClanBuilding', data);
  }

  private setLeftTimeTextX(): void {
    const width: number = (this.leftText.getBounds().width + this.timer.getBounds().width) / 2;
    this.leftText.setX(this.x - width - 5);
    this.timer.setX(this.leftText.getBounds().right + 5);
  }

  public preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (this.timer) {
      if (this.scene.state.clan.ownerId === this.scene.state.user.id) {
        if (this.scene.state.clan[this.farm].cooldown > 0) {
          const text: string = shortTime(this.scene.state.clan[this.farm].cooldown, this.scene.state.lang);
          if (this.timer.text !== text) {
            this.timer.setText(text);
            this.setLeftTimeTextX();
          }
        } else {
          if (this.timer.visible) this.scene.scene.restart(this.scene.state);
        }
      }
    } 
  }
};
