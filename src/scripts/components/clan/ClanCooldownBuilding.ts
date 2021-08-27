import { shortTime } from '../../general/basic';
import ClanFarm from './../../scenes/ClanFarm';
import Firework from './../animations/Firework';

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
        Firework.create(this.scene, { x: this.x, y: this.y - 50 }, 5);
        this.destroy();
      };
    } else {
      const timer: string = shortTime(this.building.cooldown, this.scene.state.lang);
      if (this.timer.text !== timer) {
        this.timer.setText(timer);
      }
    }
  }

  private checkDestroy(): boolean {  
    return this.scene.state.clan[this.type].cooldown <= 0;
  }

  public destroy(): void {
    super.destroy();
    this.timer?.destroy();
  }
} 