import ClanWindow from './ClanWindow';
import Modal from '../../../scenes/Modal/Modal';
import { shortTime } from '../../../general/basic';
import TaskBar from './../../gameObjects/TaskBar';

const tasksComplete: string = require('./../../../../assets/images/modal/tasks/complete.png');
const tasksUncomplete: string = require('./../../../../assets/images/modal/tasks/uncomplete.png');
const tasksReward: string = require('./../../../../assets/images/modal/tasks/reward.png');

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  color: '#b05b00',
  fontFamily: 'Shadow',
  fontSize: '24px',
  align: 'center',
  wordWrap: { width: 400 }, 
};

export default class ClanTasksWindow {
  private window: ClanWindow;
  private scene: Modal;
  private x: number;
  private y: number;
  private top: number = 0;
  private timer: Phaser.GameObjects.Text;
  private tasks: { task: IclanTask, taskData: ItaskData }[];

  constructor(window: ClanWindow) {
    this.window = window;
    this.scene = this.window.scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.top = this.y - 200
    this.window.headerText.setText(this.scene.state.lang.dailyTasks).setFontSize(32);
    this.window.header.setTexture('modal-header-orange');
    this.tasks = this.getTasks();
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, () => {
      this.update();
    }, this);
  }

  private create(): void {
    const pos: Iposition = {
      x: this.x,
      y: this.y - 280,
    };

    const title: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, this.scene.state.lang.updatingTasksThrough, textStyle).setOrigin(0.5);
    this.timer = this.scene.add.text(pos.x, pos.y + 30, shortTime(this.scene.state.timeToNewDay, this.scene.state.lang), textStyle).setOrigin(0.5).setFontSize(28).setColor('#ffe1c0');
    
    this.scene.add.nineslice(pos.x, this.y + 110, this.window.width - 40, 650, 'modal-square-bg', 10).setOrigin(0.5);
    this.createTasksBars();
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

  private createTasksBars(): void {
    const x: number = this.x;
    let y: number = this.top;
    for (let i = 0; i < this.tasks.length; i++) {
      const bar: TaskBar  = new TaskBar(x, y, this.tasks[i], this.scene);
      y += bar.displayHeight + 5;
    }
  }


  private getTasks(): { task: IclanTask, taskData: ItaskData }[] {
    const tasks: { task: IclanTask, taskData: ItaskData }[] = [];
    this.scene.state.user.clanTasks.forEach(task => {
      let name: string = this.scene.state.lang['taskClan_' + task.type];
      if (!name) name = this.scene.state.lang.taskName;
      name = name.replace('$1', String(task.count)).replace('$2', String(task.state));

      const taskData =  {
        icon: 'clan-task-icon-' + task.type,
        name: name
      }
      tasks.push({ task, taskData });
    });

    return tasks;
  }
};
