import { shortTime } from '../../general/basic';
import ClanFarm from './../../scenes/ClanFarm';
import axios, { AxiosResponse } from 'axios';

export default class ClanCooldownBuilding extends Phaser.GameObjects.Sprite {
  public scene: ClanFarm;
  private building: IclanBuilding;
  private timer: Phaser.GameObjects.Text;
  constructor(scene: ClanFarm, position: Iposition, building: IclanBuilding, type: string) {
    super(scene, position.x, position.y, 'clan-cooldown-bg');
    this.building = building;
    this.type = type;
    this.create();
  }

  private create(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '24px',
      fontFamily: 'Shadow',
      color: '#F0F1DC',
      shadow: {
        offsetX: 1,
        offsetY: 2, 
        color: 'rgba(0, 0, 0, 0.5)',
        blur: 2,
        fill: true,
      },
    };

    this.scene.add.existing(this);
    this.timer = this.scene.add.text(this.x - 7, this.y - 12, shortTime(this.building.cooldown, this.scene.state.lang), textStyle).setOrigin(0.5);
  }

  public preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta);
    if (this.checkDestroy()) {
      if (this.active) {
        this.destroy();
      };
    } else {
      const time: string = shortTime(this.building.cooldown, this.scene.state.lang);
      if (this.timer.text !== time) {
        this.timer.setText(time);
      }
    }
  }

  private checkDestroy(): boolean {  
    return this.building.cooldown <= 0;
  }

  public destroy(): void {
    super.destroy();
    this.timer?.destroy();
  }

  // private setListeners(): void {
  //   const price = 0;
  //   this.scene.clickModalBtn({ btn: this.btn, title: this.btnPrice, img1: this.btnDiamond }, (): void => {
  //     if (this.scene.state.user.diamonds >= price) {
  //       this.postServer().then(res => {
  //         if (!res.data.error) {
  //           if (this.scene.state.user.diamonds >= price) {
  //             this.scene.state.user.diamonds -= price;
  //           } else this.scene.state.user.diamonds = 0;
  //           this.building.cooldown = 0;
  //         }
  //       });
  //     } else {
  //       this.scene.state.convertor = {
  //         fun: 0,
  //         count: price - this.scene.state.user.diamonds,
  //         diamonds: price - this.scene.state.user.diamonds,
  //         type: 2
  //       };
  //       this.scene.state.modal = {
  //         type: 1,
  //         sysType: 4,
  //       };
  //       this.scene.scene.launch('Modal',this.scene.state);
  //       this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  //     }
  //   });
  // }


  private postServer(): Promise<AxiosResponse<any>> {
    const data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      type: this.type,
    };
    return axios.post(process.env.API + '/buyCooldownClanBuilding', data);
  }
} 