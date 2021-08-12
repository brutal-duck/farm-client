import { shortNum } from "../../general/basic";
import Modal from "../../scenes/Modal/Modal";
import RoundedProgress from "../animations/RoundedProgress";
import Scrolling from '../../libs/Scrolling.js'

export default class TasksWindowNew {
  public scene: Modal;

  private top: Phaser.GameObjects.Sprite;
  private middle: Phaser.GameObjects.TileSprite;
  private bottom: Phaser.GameObjects.Sprite;
  private close: Phaser.GameObjects.Sprite;
  private centerY: number;
  private scrolling: Scrolling;
  private scrollHeight: number
     

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
  }

  private init(): void {
    this.centerY = this.scene.cameras.main.centerY + 60;
  }

  private create(): void {
    // this.scene.state.amplitude.logAmplitudeEvent('show_tasks_window', {});

    let height: number = 760;
    let tasks: { task: Itasks, taskData: ItaskData }[] = this.getTasks();
    let countDone: number = tasks.filter(el => el.task.done === 1).length;
    let barHeight: number = 154;
    let textWidth: number = 330;
    
    this.top = this.scene.add.sprite(this.scene.cameras.main.centerX + 3, this.centerY - Math.floor(height / 2), 'tasks-top').setOrigin(0.5, 1);
    this.middle = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.centerY, 563, height, 'tasks-middle').setOrigin(0.5);
    this.bottom = this.scene.add.sprite(this.scene.cameras.main.centerX, this.centerY + Math.floor(height / 2), 'tasks-bottom').setOrigin(0.5);
    this.close = this.scene.add.sprite(606, this.centerY - Math.floor(height / 2 + 114), 'tasks-close').setDepth(2);
    
    const x: number = this.middle.getTopLeft().x + 46
    const y: number = this.middle.getTopCenter().y - 7
    const w: number = this.middle.getBounds().width - 87
    const h: number = this.middle.getBounds().height - 94
    
    this.setScroll(x, y, w, h * 2)
    const mid = this.scene.add.tileSprite(x, y, w, h, 'white-pixel').setOrigin(0).setAlpha(0.3)
    console.log('create ~ this.scene.cameras', this.scene)
    console.log('setScroll ~ this.scrolling', this.scrolling)
    
    
    this.progressLineAndOtherText(countDone, height);
    this.scene.clickButton(this.close, (): void => { this.closeWindow(); });
    if (!this.scene.game.scene.keys[this.scene.state.farm].tasksOpened) {
      this.scene.game.scene.keys[this.scene.state.farm].tasksOpened = true;
      this.scene.openModal(this.scene.cameras.main);
    }
  }


  private setScroll(x: number, y: number, width: number, height: number): void {
    const cameraOptions: IScrollingOptions = {
      x,
      y,
      width,
      height,
      wheel: true,
      top: +this.scene.game.config.height
    };
    
    this.scrolling = new Scrolling(this.scene, cameraOptions);
    this.scene.input.on('pointerup', (): void => {
      this.scrolling.enabled = true;
      this.scrolling.wheel = true;
    });
    
    this.scrollHeight = height
    this.scrolling.bottom = this.scrollHeight;
    this.scrolling.scrollY = this.scrollHeight;
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

    } else if (this.scene.state.modal.tasksParams.done && parts.length === userPart){

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


  private closeWindow(): void {
    this.scene.game.scene.keys[this.scene.state.farm].tasksOpened = false;
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }
}