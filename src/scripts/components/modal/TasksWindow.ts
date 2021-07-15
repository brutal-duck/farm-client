import { shortNum } from "../../general/basic";
import Modal from "../../scenes/Modal/Modal";

export default class TasksWindow {
  public scene: Modal;

  private top: Phaser.GameObjects.Sprite;
  private middle: Phaser.GameObjects.TileSprite;
  private bottom: Phaser.GameObjects.Sprite;
  private close: Phaser.GameObjects.Sprite;
  private centerY: number;
     

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
  }

  private init(): void {
    this.centerY = this.scene.cameras.main.centerY + 60;
  }

  private create(): void {
    this.scene.state.amplitude.logAmplitudeEvent('show_tasks_window', {});

    let height: number = 112;
    let tasks: { task: Itasks, taskData: ItaskData }[] = [];
    let textsHeight = [];
    let countBreed: number;
    let countDone: number = 0;
    let taskCenterY: number = this.centerY - 134;
    let barHeight: number = 154;
    let textWidth: number = 330;
    
    this.top = this.scene.add.sprite(this.scene.cameras.main.centerX + 1, this.centerY - Math.floor(height / 2), 'tasks-top').setOrigin(0.5, 1);
    this.middle = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.centerY, 563, height, 'tasks-middle').setOrigin(0.5, 0.5);
    this.bottom = this.scene.add.sprite(this.scene.cameras.main.centerX, this.centerY + Math.floor(height / 2), 'tasks-bottom').setOrigin(0.5, 0.5);
    this.close = this.scene.add.sprite(606, this.centerY - Math.floor(height / 2 + 114), 'tasks-close').setDepth(2);
  
    if (this.scene.state.farm === 'Cow') countBreed = this.scene.state.cowSettings.cowSettings.length;
    else if (this.scene.state.farm === 'Chicken') countBreed = this.scene.state.chickenSettings.chickenSettings.length;
    else if (this.scene.state.farm === 'Sheep')  countBreed = this.scene.state.sheepSettings.sheepSettings.length;

    // Определение общей высоты с текстом и позиции 1ой плашки заданий
    for (let i = 0; i < this.scene.state.modal.tasksParams.tasks.length; i++) {

      let task: Itasks = this.scene.state.modal.tasksParams.tasks[i];
      let taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);

      const textForWidth: Phaser.GameObjects.Text = this.scene.add.text(0, 0, taskData.name, {
        font: '24px Bip',
        color: '#944000',
        align: 'center',
        wordWrap: { width: textWidth }
      }).setAlpha(0);

      if (textForWidth.getBounds().height > 60) taskCenterY -= 86;
      else taskCenterY -= 80;

      textsHeight.push(textForWidth.getBounds().height);
      tasks.push({ task, taskData });

    }

    tasks = tasks.sort((x1: { task: Itasks, taskData: ItaskData }, x2: { task: Itasks, taskData: ItaskData }) => {
      if (x1.task.sort > x2.task.sort) return 1;
      if (x1.task.sort < x2.task.sort) return -1;
      return 0;
    });

    // Цикл создания tasks
    for (let i = 0; i < this.scene.state.modal.tasksParams.tasks.length; i++) {

      let completed: Phaser.GameObjects.Sprite;
      let awardText: Phaser.GameObjects.Text;
      let awardIcon: Phaser.GameObjects.Sprite;
      let doneText: Phaser.GameObjects.Text;
      let takeButton: Phaser.GameObjects.Sprite; // зеленая кнопки
      let takeText: Phaser.GameObjects.Text; // текст кнопки
      let padding: number; // Отступ от предыдущей верхней плашки

      if (textsHeight[i] > 60 && Number(i) < this.scene.state.modal.tasksParams.tasks.length) {

        if (barHeight === 154) padding = 12;
        else if (barHeight === 164) padding = 8;

        height += 168 + Number(i);
        taskCenterY += barHeight + padding;
        barHeight = 164;

      } else if (Number(i) < this.scene.state.modal.tasksParams.tasks.length) {

        if (barHeight === 154) padding = 6;
        else if (barHeight === 164) padding = 2;
        
        height += 158 + Number(i);
        taskCenterY += barHeight + padding;
        barHeight = 154;
      }
      
      // Иконка и текст
      let icon: Phaser.GameObjects.Sprite = this.scene.add.sprite(194, taskCenterY - 6, tasks[i].taskData.icon).setDepth(1).setOrigin(0.5, 0.5).setScale(0.9);
      let text: Phaser.GameObjects.Text = this.scene.add.text(420, taskCenterY - 26, tasks[i].taskData.name, {
        font: '24px Bip',
        color: '#944000',
        align: 'center',
        wordWrap: { width: textWidth }
      }).setDepth(1).setOrigin(0.5, 0.5);

      // Отрисовка плашек
      if (tasks[i].task.done === 1 && tasks[i].task.got_awarded === 1) {

        // Галочка и затемнение иконки
        icon.setTint(0x777777).setAlpha(0.5);
        completed = this.scene.add.sprite(194, taskCenterY - 6, 'completed').setDepth(1).setTint(0xc0c0c0).setOrigin(0.5).setAlpha(0.9);

        // Плашка задания
        this.scene.add.sprite(this.scene.cameras.main.centerX + 2, taskCenterY, 'tasks-complete').setOrigin(0.5).setDisplaySize(460, barHeight);
        text.setColor('#494949').setAlpha(0.6).setY(text.y + 20);
        countDone++;

      } else if (tasks[i].task.done === 1 && tasks[i].task.got_awarded === 0) {
        // костыль //
        let iconTexture: string = 'diamond'; 
        let award: string = String(tasks[i].task.diamonds);
        let moneyTask: any = undefined;

        if (this.scene.state.farm === 'Sheep') {     
          moneyTask = this.scene.game.scene.keys['Sheep'].moneyTasks.find(el => el.id === tasks[i].task.id);
          if (moneyTask) {
            award = moneyTask.money;
            iconTexture = 'sheepCoin';
          }
        }

        icon.setTint(0x777777);
        completed = this.scene.add.sprite(194, taskCenterY - 6, 'completed').setDepth(1).setOrigin(0.5, 0.5);

        // Плашка задания
        this.scene.add.sprite(this.scene.cameras.main.centerX + 2, taskCenterY, 'tasks-reward').setOrigin(0.5, 0.5).setDisplaySize(460, barHeight);
        this.scene.add.sprite(this.scene.cameras.main.centerX + 100, taskCenterY + (barHeight / 2) - 29, 'tasks-bar').setOrigin(0.5, 0.5);

        takeButton = this.scene.add.sprite(422, taskCenterY + (barHeight / 2) - 26, 'little-button').setOrigin(0.5, 0.5).setDepth(1).setDisplaySize(134, 48);
        const position: Iposition = {
          x: 422,
          y: taskCenterY + (barHeight / 2) - 26
        };

        takeText = this.scene.add.text(422, taskCenterY + (barHeight / 2) - 29, this.scene.state.lang.pickUp, {
          font: '22px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5).setDepth(1);

        awardText = this.scene.add.text(542, taskCenterY + (barHeight / 2) - 29, award, {
          font: '34px Bip',
          color: '#FFFFFF'
        }).setDepth(2).setOrigin(0.5, 0.5).setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 5);

        awardIcon = this.scene.add.sprite(510, taskCenterY + (barHeight / 2) - 29, iconTexture).setDepth(2).setScale(0.14).setOrigin(0.5, 0.5);
          
        if (moneyTask) { // костыль
          awardText.setVisible(false);
          awardIcon.setVisible(false);
          takeButton.setX(460);
          takeText.setX(takeButton.x);
        }  

        this.scene.clickShopBtn({ btn: takeButton, title: takeText, img: false }, (): void => {
          if (iconTexture === 'diamond') {
            this.scene.game.scene.keys[this.scene.state.farm + 'Bars'].getCurrency(position, tasks[i].task.diamonds, 'diamond');
          } else if (iconTexture === 'sheepCoin') {
            this.scene.game.scene.keys[this.scene.state.farm + 'Bars'].plusMoneyAnimation(position);
          }
          this.scene.game.scene.keys[this.scene.state.farm].pickUpTaskReward(tasks[i].task.id);
        });

        countDone++;

      } else {
        // Счетчик прогресса
        let count: number = tasks[i].task.count;
        if (tasks[i].task.type === 14 && tasks[i].task.count === 0) count = countBreed;

        // Плашка задания
        let taskBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 2, taskCenterY, 'tasks-uncomplete').setOrigin(0.5, 0.5).setDisplaySize(460, barHeight);
        this.scene.add.sprite(this.scene.cameras.main.centerX + 100, taskCenterY + (barHeight / 2) - 29, 'tasks-bar').setOrigin(0.5, 0.5);

        this.scene.click(taskBg, (): void => {
          this.scene.scene.stop('Modal');
          this.scene.clickTaskBoard(tasks[i].task);
        });
        // костыль //

        let iconTexture: string = 'diamond';
        let award: string = String(tasks[i].task.diamonds);
        let moneyTask: any = undefined;

        if (this.scene.state.farm === 'Sheep') {     
          moneyTask = this.scene.game.scene.keys['Sheep'].moneyTasks.find(el => el.id === tasks[i].task.id);
          if (moneyTask) {
            award = moneyTask.money;
            iconTexture = 'sheepCoin';
          }
        }
        // ------- //


        takeText = this.scene.add.text(426, taskCenterY + (barHeight / 2) - 28, this.scene.state.lang.taskReward, {
          font: '24px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5).setDepth(1);

        awardText = this.scene.add.text(542, taskCenterY + (barHeight / 2) - 29, award, {
          font: '34px Bip',
          color: '#FFFFFF'
        }).setDepth(2).setOrigin(0.5, 0.5).setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 5);

        awardIcon = this.scene.add.sprite(510, taskCenterY + (barHeight / 2) - 29, iconTexture).setDepth(2).setScale(0.14).setOrigin(0.5, 0.5);
        
        if (moneyTask) { // костыль //
          takeText.setVisible(false);
          awardIcon.setX(415);
          awardText.setX(awardIcon.getBounds().right + 5).setOrigin(0, 0.5);
        }

        doneText = this.scene.add.text(194, taskCenterY + 60, `${shortNum(tasks[i].task.progress)}/${shortNum(count)}`, {
          font: '26px Shadow',
          color: '#944000'
        }).setDepth(1).setOrigin(0.5).setShadow(1, 1, 'rgba(0, 0, 0, 0.5)', 2);
        
        if (doneText.width > 120) doneText.setOrigin(0, 0.5).setX(icon.getLeftCenter().x - 18).setFontSize(24)

        let progress: number = (100 / count * tasks[i].task.progress) * (6.3 / 100) - Math.PI / 2;

        this.scene.add.graphics()
          .clear()
          // Внутренний круг
          .lineStyle(4, 0xc09245, 1)
          .beginPath()
          .arc(194, taskCenterY - 6, 40, 0, Math.PI * 2)
          .strokePath()
          // Прогресс
          .lineStyle(8, 0x70399f, 1)
          .beginPath()
          .arc(194, taskCenterY - 6, 46, Math.PI / -2, progress)
          .strokePath()
          // Внешний круг
          .lineStyle(4, 0xc09245, 1)
          .beginPath()
          .arc(194, taskCenterY - 6, 51, 0, Math.PI * 2)
          .strokePath()
          .setDepth(3);

      }
    }

    this.progressLineAndOtherText(countDone, height);

    // Кнопка закрытия
    this.scene.clickButton(this.close, (): void => { this.closeWindow(); });

    this.resizeTasksWindow(height);

    if (!this.scene.game.scene.keys[this.scene.state.farm].tasksOpened) {
      this.scene.game.scene.keys[this.scene.state.farm].tasksOpened = true;
      this.scene.openModal(this.scene.cameras.main);
    }
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


  // Перезадать размеры
  private resizeTasksWindow(height: number): void {
    this.top.y = this.centerY - Math.floor(height / 2);
    this.middle.height = height;
    this.bottom.y = this.centerY + Math.floor(height / 2);
    this.close.y = this.centerY - Math.floor(height / 2 + 114);
  }
}