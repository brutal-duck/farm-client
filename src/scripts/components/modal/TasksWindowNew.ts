import { shortNum } from "../../general/basic";
import Modal from "../../scenes/Modal/Modal";
import RoundedProgress from "../animations/RoundedProgress";
import Scrolling from '../../libs/Scrolling.js'

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
  private scrolling: Scrolling;
  private lastElementBottomY: number

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.preload();
    this.create();
  }


  private init(): void {
    this.centerY = this.scene.cameras.main.centerY + 60;
    this.tasks = this.getTasks();
    this.lastElementBottomY = 0
  }


  private preload(): void {
    this.scene.load.image('tasks-complete', tasksComplete);
    this.scene.load.image('tasks-uncomplite', tasksUncomplete);
    this.scene.load.image('tasks-reward', tasksReward);
  }


  private create(): void {
    // this.scene.state.amplitude.logAmplitudeEvent('show_tasks_window', {});

    let height: number = 760;
    let countDone: number = this.tasks.filter(el => el.task.done === 1).length;
    
    this.top = this.scene.add.sprite(this.scene.cameras.main.centerX + 3, this.centerY - Math.floor(height / 2), 'tasks-top').setOrigin(0.5, 1);
    this.middle = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.centerY, 563, height, 'tasks-middle').setOrigin(0.5);
    this.bottom = this.scene.add.sprite(this.scene.cameras.main.centerX, this.centerY + Math.floor(height / 2), 'tasks-bottom').setOrigin(0.5);
    this.close = this.scene.add.sprite(606, this.centerY - Math.floor(height / 2 + 114), 'tasks-close').setDepth(2);
    
    const x: number = this.middle.getTopLeft().x + 46
    const y: number = this.middle.getTopCenter().y - 7
    const w: number = this.middle.getBounds().width - 87
    const h: number = this.middle.getBounds().height - 94

    this.setScroll(x, y, w, h)
    this.createTasksBars()
    this.updateScroll(h)
    this.progressLineAndOtherText(countDone, height);

    this.scene.clickButton(this.close, (): void => { this.closeWindow(); });
    if (!this.scene.game.scene.keys[this.scene.state.farm].tasksOpened) {
      this.scene.game.scene.keys[this.scene.state.farm].tasksOpened = true;
      this.scene.openModal(this.scene.cameras.main);
    }
  }


  private createTasksBars(): void {
    let slots: Phaser.GameObjects.RenderTexture[] = []
    let wordWrap: { width: number } = { width: 330 }
    const x: number = this.scene.cameras.main.centerX - this.scrolling.x + 2
    const top = this.scrolling.top

    // ДЛЯ ТЕСТА
    this.tasks = this.tasks.concat(this.tasks)
    
    for (let i = 0; i < this.tasks.length; i++) {
      const y = slots.length ? slots[i - 1].getBottomCenter().y + 4 : top + 6
      let barHeight: number = 140;
      let slot: Phaser.GameObjects.RenderTexture
      let valutaTexture: string = 'diamond';
      let award: string = String(this.tasks[i].task.diamonds);
      let moneyTask = this.scene.game.scene.keys['Sheep'].moneyTasks.find(el => el.id === this.tasks[i].task.id)

      if (this.scene.state.farm === 'Sheep' && moneyTask) {     
        award = '';
        valutaTexture = 'sheepCoin';
      }

      const icon: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, y, this.tasks[i].taskData.icon).setDepth(2).setScale(0.9)
      const bar: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, y, 'tasks-bar').setOrigin(0, 1).setDepth(2).setVisible(false)
      const text: Phaser.GameObjects.Text = this.scene.add.text(x, y, this.tasks[i].taskData.name,{
        font: '24px Bip',
        color: '#944000',
        align: 'center',
        wordWrap
      }).setDepth(2).setOrigin(0.5)
      
      if (text.height > 30) barHeight += (text.height - 30) / 2

      if (this.tasks[i].task.done === 1 && this.tasks[i].task.got_awarded === 1) {
        // Задание выполнено, награда получена
        slot = this.scene.add.nineslice(x, y, 460, barHeight, 'tasks-complete', 13).setOrigin(0.5, 0)
        text.setPosition(slot.getCenter().x + 60, slot.getCenter().y).setColor('#494949').setAlpha(0.6)
        icon.setPosition(slot.getLeftCenter().x + 60, slot.getCenter().y - 10).setTint(0x777777).setAlpha(0.5)
        this.scene.add.sprite(icon.x, icon.y, 'completed').setDepth(2).setTint(0xc0c0c0).setAlpha(0.9);

      } else if (this.tasks[i].task.done === 1 && this.tasks[i].task.got_awarded === 0) {
        // Задание выполнено, награда не получена
        slot = this.scene.add.nineslice(x, y, 460, barHeight, 'tasks-reward', 13).setOrigin(0.5, 0)
        bar.setPosition(slot.getBottomCenter().x - 30, slot.getBottomCenter().y - 1).setVisible(true)
        const takeButton: Phaser.GameObjects.Sprite = this.scene.add.sprite(bar.getLeftCenter().x + 18, bar.getLeftCenter().y + 3, 'little-button').setOrigin(0, 0.5).setDepth(2).setDisplaySize(134, 48);
        const takeText: Phaser.GameObjects.Text = this.scene.add.text(takeButton.getCenter().x, takeButton.getCenter().y - 4, this.scene.state.lang.pickUp, { font: '22px Shadow', color: '#FFFFFF' }).setOrigin(0.5).setDepth(2)
        const valuta: Phaser.GameObjects.Sprite = this.scene.add.sprite(takeButton.getRightCenter().x + (award ? 6 : 18), takeButton.getRightCenter().y, valutaTexture).setOrigin(0, 0.5).setDepth(2).setScale(0.14)
        this.scene.add.text(valuta.getRightCenter().x + 4, valuta.getRightCenter().y, award, { font: '34px Bip', color: '#FFFFFF' }).setDepth(2).setOrigin(0, 0.5).setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 5)
        text.setPosition(slot.getCenter().x + 60, slot.getCenter().y - 26)
        icon.setPosition(slot.getLeftCenter().x + 60, slot.getCenter().y - 10).setTint(0x777777)
        this.scene.add.sprite(icon.x, icon.y, 'completed').setDepth(2)

        this.scene.clickShopBtn({ btn: takeButton, title: takeText, img: false }, (): void => {
          // if (valutaTexture === 'diamond') this.scene.game.scene.keys[this.scene.state.farm + 'Bars'].getCurrency({ x: takeButton.x, y: takeButton.y }, this.tasks[i].task.diamonds, 'diamond');
          // else if (valutaTexture === 'sheepCoin')  this.scene.game.scene.keys[this.scene.state.farm + 'Bars'].plusMoneyAnimation({ x: takeButton.x, y: takeButton.y });
          this.scene.game.scene.keys[this.scene.state.farm].pickUpTaskReward(this.tasks[i].task.id);
        });

      } else {
        // Задание выполняется
        slot = this.scene.add.nineslice(x, y, 460, barHeight, 'tasks-uncomplete', 13).setOrigin(0.5, 0)
        this.scene.click(slot, (): void => {
          this.scene.scene.stop('Modal');
          this.scene.clickTaskBoard(this.tasks[i].task);
        });

        bar.setPosition(slot.getBottomCenter().x - 30, slot.getBottomCenter().y - 1).setVisible(true)
        const takeText: Phaser.GameObjects.Text = this.scene.add.text(bar.getLeftCenter().x + 30, bar.getLeftCenter().y, this.scene.state.lang.taskReward, { font: '24px Shadow', color: '#FFFFFF' }).setOrigin(0, 0.5).setDepth(2)
        const valuta: Phaser.GameObjects.Sprite = this.scene.add.sprite(takeText.getRightCenter().x + (award ? 8 : 16), takeText.getRightCenter().y, valutaTexture).setOrigin(0, 0.5).setDepth(2).setScale(0.14)
        this.scene.add.text(valuta.getRightCenter().x + 4, valuta.getRightCenter().y, award, { font: '34px Bip', color: '#FFFFFF' }).setDepth(2).setOrigin(0, 0.5).setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 5)
        
        text.setPosition(slot.getCenter().x + 60, slot.getCenter().y - 26)

        icon.setPosition(slot.getLeftCenter().x + 60, slot.getCenter().y - 10)
        let count: number = this.tasks[i].task.type === 14 && this.tasks[i].task.count === 0 ? this.scene.state[`${this.scene.state.farm}Settings`][`${this.scene.state.farm}Settings`].length : this.tasks[i].task.count;
        const doneText: Phaser.GameObjects.Text = this.scene.add.text(icon.x, icon.getBottomCenter().y + 26, `${shortNum(this.tasks[i].task.progress)}/${shortNum(count)}`, { font: '26px Shadow', color: '#944000' }).setDepth(2).setOrigin(0.5).setShadow(1, 1, 'rgba(0, 0, 0, 0.5)', 2);
        if (doneText.width > 120) doneText.setOrigin(0, 0.5).setX(icon.getLeftCenter().x - 18).setFontSize(24);

        const progress = new RoundedProgress(this.scene, icon.x, icon.y, 1.2).setPercent(Math.round(100 / count * this.tasks[i].task.progress)).setTint(0x70399f)
        this.scene.add.sprite(progress.rightSegment.x, progress.rightSegment.y, 'circle-outline').setScale(0.95).setTint(0xc09245).setDepth(progress.rightSegment.depth + 1);
        this.scene.add.sprite(progress.rightSegment.x, progress.rightSegment.y, 'circle-outline').setScale(1.2).setTint(0xc09245).setDepth(progress.rightSegment.depth + 1);
      }

      slots.push(slot)
    }
    
    this.lastElementBottomY = slots[slots.length - 1].getBottomCenter().y + 6
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
    console.log('updateScroll ~ elementsHeight', elementsHeight)
    if (elementsHeight > height) {
      const additionalHeight = elementsHeight - height
      console.log('updateScroll ~ additionalHeight', additionalHeight)
      this.scrolling.bottom += additionalHeight
    }
    console.log('updateScroll ~ this.scrolling', this.scrolling)
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


  private closeWindow(): void {
    this.scene.game.scene.keys[this.scene.state.farm].tasksOpened = false;
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }
}