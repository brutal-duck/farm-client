import ClanWindow from './ClanWindow';
import Modal from '../../../scenes/Modal/Modal';
import { shortTime } from '../../../general/basic';

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  color: '#b05b00',
  fontFamily: 'Shadow',
  fontSize: '22px',
  align: 'center',
  wordWrap: { width: 400 }, 
};

export default class ClanTasksWindow {
  private window: ClanWindow;
  private scene: Modal;
  private x: number;
  private y: number;
  private timer: Phaser.GameObjects.Text;

  constructor(window: ClanWindow) {
    this.window = window;
    this.scene = this.window.scene;
    this.init()
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.window.headerText.setText(this.scene.state.lang.dailyTasks).setFontSize(32);
    this.window.header.setTexture('modal-header-orange');
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, () => {
      this.update();
    }, this);
  }

  private create(): void {
    const pos: Iposition = {
      x: this.x,
      y: this.y - 230,
    };

    const title: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, 'Обновление заданий через:', textStyle).setOrigin(0.5);
    this.timer = this.scene.add.text(pos.x, pos.y + 30, shortTime(this.scene.state.timeToNewDay, this.scene.state.lang), textStyle).setOrigin(0.5).setColor('#ffe1c0');
    
    this.scene.add.nineslice(pos.x, this.y + 90, this.window.width - 40, 520, 'modal-square-bg', 10).setOrigin(0.5);
  }

  private handleClose(): void {
    this.scene.scene.stop();
  }

  private update(): void {
    if (this.timer?.active) {
      if (this.scene.state.timeToNewDay > 0) {
        const text: string = shortTime(this.scene.state.timeToNewDay, this.scene.state.lang);
        if (this.timer.text !== text) this.timer.setText(text);
      } else {
        this.scene.scene.restart();
      }
    }
  }

};
