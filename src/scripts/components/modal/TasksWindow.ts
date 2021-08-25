import Modal from "../../scenes/Modal/Modal";
import Scrolling from '../../libs/Scrolling.js'
import TaskBar from "../gameObjects/TaskBar";

const tasksComplete: string = require("./../../../assets/images/modal/tasks-complete.png");
const tasksUncomplete: string = require("./../../../assets/images/modal/tasks-uncomplete.png");
const tasksReward: string = require("./../../../assets/images/modal/tasks-reward.png");

export default class TasksWindowNew {
  public scene: Modal;

  private tasks: { task: Itasks, taskData: ItaskData }[]
  private top: Phaser.GameObjects.Sprite;
  private middle: Phaser.GameObjects.TileSprite;
  private bottom: Phaser.GameObjects.Sprite;
  private close: Phaser.GameObjects.Sprite;
  private centerY: number;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.preload();
    this.create();
  }


  private init(): void {
    this.centerY = this.scene.cameras.main.centerY + 60;
    this.tasks = this.getTasks();
  }


  private preload(): void {
    this.scene.load.image('tasks-complete', tasksComplete);
    this.scene.load.image('tasks-uncomplite', tasksUncomplete);
    this.scene.load.image('tasks-reward', tasksReward);
  }


  private create(): void {
    // this.scene.state.amplitude.logAmplitudeEvent('show_tasks_window', {});

    let height: number = 760;
    
    this.top = this.scene.add.sprite(this.scene.cameras.main.centerX + 3, this.centerY - Math.floor(height / 2), 'tasks-top').setOrigin(0.5, 1);
    this.close = this.scene.add.sprite(606, this.centerY - Math.floor(height / 2 + 114), 'tasks-close').setDepth(2);

    this.createTasksBars()

    this.scene.clickButton(this.close, (): void => { this.closeWindow(); });
    if (!this.scene.game.scene.keys[this.scene.state.farm].tasksOpened) {
      this.scene.game.scene.keys[this.scene.state.farm].tasksOpened = true;
      this.scene.openModal(this.scene.cameras.main);
    }
  }


  private createTasksBars(): void {
    let taskBars: TaskBar[] = []
    
    for (let i = 0; i < this.tasks.length; i++) {
      const x: number = this.top.getBottomCenter().x
      const y: number = taskBars.length ? taskBars[i - 1].getBottomCenter().y + 4 : this.top.getBottomCenter().y
      taskBars.push(new TaskBar(x, y, this.tasks[i], this.scene))
    }
    
    let lastElementBottomY = taskBars[taskBars.length - 1].getBottomCenter().y
    let height: number = lastElementBottomY - this.top.getBottomCenter().y
    console.log('createTasksBars ~ height', height)
    let countDone: number = this.tasks.filter(el => el.task.done === 1).length;

    this.resizeWindow(height)
    this.progressLineAndOtherText(countDone, height);
  }


  private getTasks(): { task: Itasks, taskData: ItaskData }[] {
    let tasks: { task: Itasks, taskData: ItaskData }[] = [];

    this.scene.state.modal.tasksParams.tasks.forEach(task => {
      const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task)
      tasks.push({ task, taskData })
    })

    tasks = tasks.sort((x1: { task: Itasks, taskData: ItaskData }, x2: { task: Itasks, taskData: ItaskData }) => {
      if (x1.task.sort > x2.task.sort) return 1;
      if (x1.task.sort < x2.task.sort) return -1;
      return 0;
    });

    return tasks
  }


  private progressLineAndOtherText(countDone: number, height: number): void {
    // Полоска прогресса
    let percent: number = countDone / (this.scene.state.modal.tasksParams.tasks.length / 100);
    percent = 460 / 100 * percent;
    this.scene.add.tileSprite(132, this.scene.cameras.main.centerY + (height / 2) + 4, percent, 16, 'part-progress').setOrigin(0, 0.5);

    // Остальной текст
    this.scene.add.text(this.scene.cameras.main.centerX, this.centerY - Math.floor(height / 2 + 200), this.scene.state.modal.tasksParams.part, {
      font: '72px Shadow',
      fill: '#166c00'
    }).setOrigin(0.5, 0.5);

    this.scene.add.text(this.scene.cameras.main.centerX, this.centerY - Math.floor(height / 2 + 150), this.scene.state.lang.part, {
      font: '34px Shadow',
      fill: '#166c00'
    }).setOrigin(0.5, 0.5);

    this.scene.add.text(this.scene.cameras.main.centerX, this.centerY - Math.floor(height / 2 + 78), this.scene.state.modal.tasksParams.name, {
      font: '32px Shadow',
      fill: '#F2DCFF'
    }).setOrigin(0.5, 0.5);

    this.scene.add.text(this.scene.cameras.main.centerX, this.centerY + Math.floor(height / 2 + 10), this.scene.state.modal.tasksParams.farmer, {
      font: '26px Shadow',
      fill: '#8f3f00'
    }).setOrigin(0.5, 0.5);
    
    const parts: Ipart[] = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`${this.scene.state.farm.toLowerCase()}Parts`];
    const userPart: number = this.scene.state[`user${this.scene.state.farm}`].part;
    
    if (this.scene.state.modal.tasksParams.done && parts.length !== userPart) {
      const nextPart = this.scene.add.sprite(this.scene.cameras.main.centerX, this.centerY + Math.floor(height / 2 + 60), 'big-btn-green').setDisplaySize(412, 64)
      const nextPartText = this.scene.add.text(this.scene.cameras.main.centerX, this.centerY + Math.floor(height / 2 + 54), this.scene.state.lang.donePart, {
        font: '24px Shadow',
        fill: '#FFFFFF'
      }).setOrigin(0.5, 0.5);

      this.scene.clickShopBtn({ btn: nextPart, title: nextPartText }, (): void => { this.scene.game.scene.keys[this.scene.state.farm].nextPart() });

    } else if (this.scene.state.modal.tasksParams.done && parts.length === userPart) {
      this.scene.add.text(this.scene.cameras.main.centerX, this.centerY + Math.floor(height / 2 + 60), this.scene.state.lang[`${this.scene.state.farm.toLowerCase()}CompanyDone`], {
        font: '20px Shadow',
        fill: '#c15e00',
        align: 'center',
        wordWrap: { width: 420 }
      }).setOrigin(0.5, 0.5);
    
    } else if (!this.scene.state.modal.tasksParams.done) {
      this.scene.add.text(this.scene.cameras.main.centerX, this.centerY + Math.floor(height / 2 + 60), this.scene.state.modal.tasksParams.description, {
        font: '20px Shadow',
        fill: '#c15e00',
        align: 'center',
        wordWrap: { width: 420 }
      }).setOrigin(0.5, 0.5);
    }
  }


  private resizeWindow(height: number): void {
    this.middle = this.scene.add.tileSprite(this.top.x - 3, this.top.getBottomCenter().y, 563, height, 'tasks-middle').setOrigin(0.5, 0);
    this.bottom = this.scene.add.sprite(this.top.x - 3, this.middle.getBottomCenter().y, 'tasks-bottom').setOrigin(0.5, 0);
  }


  private closeWindow(): void {
    this.scene.game.scene.keys[this.scene.state.farm].tasksOpened = false;
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }
}