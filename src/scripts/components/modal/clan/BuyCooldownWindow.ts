import axios, { AxiosResponse } from "axios";
import { shortNum, shortTime } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import ClanWindow from './ClanWindow';

const TIMER_COEFFICIENT = 2;

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
};

export default class BuyCooldownWindow extends Phaser.GameObjects.Sprite {
  private window: ClanWindow;
  public scene: Modal;
  public x: number;
  public y: number;
  private farm: string;
  private price: number;
  private building: IclanBuilding;
  private leftText: Phaser.GameObjects.Text;
  private timer: Phaser.GameObjects.Text;

  constructor(window: ClanWindow) {
    super(window.scene, 0, 0, 'pixel');
    this.window = window;
    this.scene = this.window.scene;
    this.init()
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.scene.add.existing(this);
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.farm = this.scene.state.modal.message;
    this.building = this.scene.state.clan[this.farm];
    const estimateCost: number = Math.round(this.building.cooldown / 60) * TIMER_COEFFICIENT;
    this.price = estimateCost > 1000 ? 1000 : estimateCost;
    this.window.headerText.setText(this.scene.state.lang[`${this.farm}ClanFarm`]).setFontSize(30);
  }

  private create(): void {
    const padding: number = 70;
    const pos: Iposition = {
      x: this.x,
      y: this.scene.cameras.main.centerY - 50,
    };

    const img = {
      icon: 'clan-diamond-coin',
      text: shortNum(this.price),
    };

    const text: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, this.scene.state.lang.confirmBuyCooldownImprovmentFarm, textStyle).setOrigin(0.5);
    const str: string = shortTime(this.building.cooldown, this.scene.state.lang);
    this.leftText = this.scene.add.text(pos.x, pos.y + 40, this.scene.state.lang.left, textStyle).setOrigin(0.5);
    this.timer = this.scene.add.text(pos.x, pos.y + 40, str, textStyle).setOrigin(0.5).setColor('#DBFC3B'); 
    this.setTextPosition();
    const pay = this.scene.bigButton('green', 'left', padding, this.scene.state.lang.speedUpImprovment, img);
    this.scene.clickModalBtn(pay, (): void => { this.handleAccept(); });

    const cancel = this.scene.bigButton('yellow', 'center', padding + 90, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(cancel, (): void => { this.handleClose(); });
  }

  private handleClose(): void { 
    this.scene.scene.stop();
  }

  private setTextPosition(): void {
    const leftGeom: Phaser.Geom.Rectangle = this.leftText?.getBounds();
    const timerGeom: Phaser.Geom.Rectangle = this.timer?.getBounds();

    const width: number = (leftGeom.width + timerGeom.width + 10) / 4;
    this.leftText?.setX(this.x - width);
    this.timer?.setX(this.x + width);
  }

  private handleAccept(): void {
    if (this.scene.state.clan.diamond.count >= this.price) {
      this.postServer().then(res => {
        if (!res.data.error) {
          this.building.cooldown = 0;
          this.scene.scene.stop();
        }
      });
    } else {
      this.scene.state.convertor = {
        fun: 0,
        count: this.price - this.scene.state.clan.diamond.count,
        diamonds: this.price - this.scene.state.clan.diamond.count,
        type: 1
      };
      this.scene.state.modal = {
        type: 18,
        clanWindowType: 4,
      };
      this.scene.scene.restart(this.scene.state);
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    }
  }

  private postServer(): Promise<AxiosResponse<any>> {
    const data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      type: this.farm,
      count: this.price,
    };
    return axios.post(process.env.API + '/buyCooldownClanBuilding', data);
  }

  public preUpdate(time: number, delta: number): void {
    if (this.checkUpdate()) {
      if (this.building.cooldown > 0) {
        const str: string = shortTime(this.building.cooldown, this.scene.state.lang);
        if (this.timer?.text !== str) {
          this.timer.setText(str);
          this.setTextPosition();
        }
      } else this.scene.scene.stop();
    }
  }

  private checkUpdate(): boolean {
    return this.scene.scene.isActive() &&
      this.scene.state.modal.type === 18 &&
      this.scene.state.modal.clanWindowType === 6 &&
      this.timer.active &&
      this.leftText.active;
  }
}