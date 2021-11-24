import { Task } from "../../local/tasks/types";
import Modal from "../../scenes/Modal/Modal";
import TaskBarNew from './../gameObjects/TaskBarNew';
import Scrolling from '../../libs/Scrolling';

const tasksUncomplete: string = require("./../../../assets/images/modal/tasks/uncomplete.png");
const tasksReward: string = require("./../../../assets/images/modal/tasks/reward.png");

export default class TasksWindowNew {
  public scene: Modal;

  private tasks: { task: Task, taskData: ItaskData }[];
  private top: Phaser.GameObjects.Sprite;
  private middle: Phaser.GameObjects.TileSprite;
  private bottom: Phaser.GameObjects.Sprite;
  private close: Phaser.GameObjects.Sprite;
  private centerY: number;

  private line: Phaser.GameObjects.TileSprite;
  private lineAni: Phaser.Tweens.Tween;
  private nextPart: Phaser.GameObjects.Sprite;
  private nextPartText: Phaser.GameObjects.Text;
  private partDiscription: Phaser.GameObjects.Text;
  private lastElementBottomY: number;

  private scrolling: any;

  private footerTextStyle: Phaser.Types.GameObjects.Text.TextStyle;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
  }


  private init(): void {
    this.centerY = this.scene.cameras.main.centerY + 60;
    this.tasks = this.getTasks();
    this.footerTextStyle = {
      fontSize: '20px',
      fontFamily: 'Shadow',
      color: '#c15e00',
      align: 'center',
      wordWrap: { width: 420 }
    }
  }

  private create(): void {
    const height: number = 760;
    
    this.top = this.scene.add.sprite(this.scene.cameras.main.centerX + 3, this.centerY - Math.floor(height / 2), 'tasks-top').setOrigin(0.5, 1);
    this.middle = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.centerY, 563, height, 'tasks-middle').setOrigin(0.5);
    this.bottom = this.scene.add.sprite(this.scene.cameras.main.centerX, this.centerY + Math.floor(height / 2), 'tasks-bottom').setOrigin(0.5);
    this.close = this.scene.add.sprite(606, this.centerY - Math.floor(height / 2 + 114), 'close-window-btn').setDepth(2);
    
    const x: number = this.middle.getTopLeft().x + 46;
    const y: number = this.middle.getTopCenter().y - 7;
    const w: number = this.middle.getBounds().width - 87;
    const h: number = this.middle.getBounds().height - 94;

    this.setScroll(x, y, w, h);
    this.createTasksBars();
    this.updateScroll(h);

    this.scene.clickButton(this.close, (): void => { this.closeWindow(); });
  }

  private setScroll(x: number, y: number, width: number, height: number): void {
    const cameraOptions: IScrollingOptions = {
      x,
      y,
      width,
      height,
      wheel: true,
      top: +this.scene.game.config.height,
    };
    
    this.scrolling = new Scrolling(this.scene, cameraOptions);
    this.scene.input.on('pointerup', (): void => {
      this.scrolling.enabled = true;
      this.scrolling.wheel = true;
    });
    
    this.scrolling.bottom = +this.scene.game.config.height
  }

  private updateScroll(height: number): void {
    const elementsHeight = this.lastElementBottomY - +this.scene.game.config.height
    if (elementsHeight > height) {
      const additionalHeight = elementsHeight - height
      this.scrolling.bottom += additionalHeight
    }
  }

  private createTasksBars(): void {
    const taskBars: TaskBarNew[] = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const x: number = this.scene.cameras.main.centerX - this.scrolling.x + 2;
      const y: number = taskBars.length ? taskBars[i - 1].getBottomCenter().y + 4 : this.scrolling.top + 6;
      taskBars.push(new TaskBarNew(x, y, this.tasks[i], this.scene));
    }
    
    this.lastElementBottomY = taskBars[taskBars.length - 1]?.getBottomCenter().y + 6;

    this.progressLineAndOtherText();
  }


  private getTasks(): { task: Task, taskData: ItaskData }[] {
    let tasks: { task: Task, taskData: ItaskData }[] = [];

    this.scene.state.modal.tasksParams.tasks.forEach(task => {
      const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
      tasks.push({ task, taskData });
    })

    tasks = tasks.sort((x1: { task: Task, taskData: ItaskData }, x2: { task: Task, taskData: ItaskData }) => {
      if (x1.task.sort > x2.task.sort) return 1;
      if (x1.task.sort < x2.task.sort) return -1;
      return 0;
    });

    return tasks;
  }


  private progressLineAndOtherText(): void {
    // Остальной текст
    const partNum: Phaser.GameObjects.Text = this.scene.add.text(this.top.getCenter().x, this.top.getTopCenter().y + 60, this.scene.state.modal.tasksParams.part, {
      font: '72px Shadow',
      color: '#166c00'
    }).setOrigin(0.5);

    const partText: Phaser.GameObjects.Text = this.scene.add.text(partNum.getBottomCenter().x, partNum.getBottomCenter().y + 14, this.scene.state.lang.part, {
      font: '31px Shadow',
      color: '#166c00'
    }).setOrigin(0.5, 0.5);

    this.scene.add.text(partText.getBottomCenter().x, partText.getBottomCenter().y + 50, this.scene.state.modal.tasksParams.name, {
      font: '32px Shadow',
      color: '#F2DCFF'
    }).setOrigin(0.5, 0.5);

    this.scene.add.text(this.bottom.getCenter().x, this.bottom.getCenter().y + 8, this.scene.state.modal.tasksParams.farmer, {
      font: '26px Shadow',
      color: '#8f3f00'
    }).setOrigin(0.5, 0.5);
    
    this.line = this.scene.add.tileSprite(this.bottom.getLeftCenter().x + 55, this.bottom.getCenter().y - 56, 1, 16, 'part-progress');
    this.partDiscription = this.scene.add.text(this.bottom.getCenter().x, this.bottom.getCenter().y + 60, '', this.footerTextStyle).setOrigin(0.5);

    this.updateProgress();
  }


  private createNextPartButton(): void {
    this.partDiscription?.destroy();
    this.nextPart?.destroy();
    this.nextPartText?.destroy();

    this.nextPart = this.scene.add.sprite(this.bottom.getCenter().x, this.bottom.getCenter().y + 60, 'big-btn-green').setDisplaySize(412, 64)
    this.nextPartText = this.scene.add.text(this.bottom.getCenter().x, this.bottom.getCenter().y + 54, this.scene.state.lang.donePart, {
      font: '24px Shadow',
      fill: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    this.scene.clickShopBtn({ btn: this.nextPart, title: this.nextPartText }, (): void => { this.scene.game.scene.keys[this.scene.state.farm].nextPart() });
  }


  public updateProgress(): void {
    this.scene.state.modal.tasksParams.done = this.tasks.every(el => el.task.done === 1 && el.task.awardTaken === 1);
    const parts: Ipart[] = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`${this.scene.state.farm.toLowerCase()}Parts`];
    const userPart: number = this.scene.state[`user${this.scene.state.farm}`].part;
    
    if (this.scene.state.modal.tasksParams.done && parts.length === userPart && this.partDiscription.active) this.partDiscription?.setText(this.scene.state.lang[`${this.scene.state.farm.toLowerCase()}CompanyDone`]);
    else if (this.scene.state.modal.tasksParams.done && parts.length !== userPart) this.createNextPartButton();
    else if (!this.scene.state.modal.tasksParams.done && this.partDiscription?.active) this.partDiscription?.setText(this.scene.state.modal.tasksParams.description);

    this.lineAni?.remove();
    this.tasks = this.getTasks();
    const countDone: number = this.tasks.filter(el => el.task.done === 1).length;
    const percent: number = 456 / 100 * (countDone / (this.scene.state.modal.tasksParams.tasks.length / 100));
    const lineWidth: number = this.line ? this.line.getBounds().width : 1;
    this.line?.setSize(lineWidth, 16).setOrigin(0, 0.5);

    this.lineAni = this.scene.tweens.add({
      targets: this.line,
      width: percent,
      duration: 500,
      delay: 150,
      ease: 'Cubic.easeOut'
    })
  }


  private closeWindow(): void {
    this.scene.game.scene.keys[this.scene.state.farm].tasksOpened = false;
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }
}