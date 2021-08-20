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

export default class BuyCooldownWindow {
  private window: ClanWindow;
  private scene: Modal;
  private x: number;
  private y: number;
  private farm: string;
  private price: number;
  private building: IclanBuilding;
  private timer: Phaser.GameObjects.Text;

  constructor(window: ClanWindow) {
    this.window = window;
    this.scene = this.window.scene;
    this.init()
    this.create();
    this.scene.openModal(this.scene.cameras.main);
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, () => {
      this.update();
    });
  }

  private init(): void {
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
      icon: 'diamond',
      text: shortNum(this.price),
    };

    const text: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, this.scene.state.lang.confirmBuyCooldownImprovmentFarm, textStyle).setOrigin(0.5, 0.5);
    const str: string = `${this.scene.state.lang.left} ${shortTime(this.building.cooldown, this.scene.state.lang)}`;
    this.timer = this.scene.add.text(pos.x, pos.y + 40, str, textStyle).setOrigin(0.5).setColor('#DBFC3B'); 

    const pay = this.scene.bigButton('green', 'left', padding, this.scene.state.lang.speedUpImprovment, img);
    this.scene.clickModalBtn(pay, (): void => { this.handleAccept(); });

    const cancel = this.scene.bigButton('yellow', 'center', padding + 90, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(cancel, (): void => { this.handleClose(); });
  }

  private handleClose(): void { 
    this.scene.scene.stop();
  }


  private handleAccept(): void {
    if (this.scene.state.user.diamonds >= this.price) {
      this.postServer().then(res => {
        if (!res.data.error) {
          if (this.scene.state.user.diamonds >= this.price) {
            this.scene.state.user.diamonds -= this.price;
          } else this.scene.state.user.diamonds = 0;
          this.building.cooldown = 0;
        }
      });
    } else {
      this.scene.state.convertor = {
        fun: 0,
        count: this.price - this.scene.state.user.diamonds,
        diamonds: this.price - this.scene.state.user.diamonds,
        type: 2
      };
      this.scene.state.modal = {
        type: 1,
        sysType: 4,
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
    };
    return axios.post(process.env.API + '/buyCooldownClanBuilding', data);
  }

  private update(): void {
    if (this.checkUpdate()) {
      const str: string = `${this.scene.state.lang.left} ${shortTime(this.building.cooldown, this.scene.state.lang)}`;
      if (this.timer?.text !== str) this.timer.setText(str);
    }
  }

  private checkUpdate(): boolean {
    return this.scene.scene.isActive() &&
      this.scene.state.modal.type === 18 &&
      this.scene.state.modal.clanWindowType === 6;
  }
}