let centerY: number
let height: number

function tasks(): void {

  centerY = this.cameras.main.centerY + 60 // Центр окна по Y
  height = 112
  
  this.top = this.add.image(this.cameras.main.centerX + 1, centerY - Math.floor(height / 2), 'tasks-top').setOrigin(0.5, 1)
  this.middle = this.add.tileSprite(this.cameras.main.centerX, centerY, 563, height, 'tasks-middle').setOrigin(0.5, 0.5)
  this.bottom = this.add.image(this.cameras.main.centerX, centerY + Math.floor(height / 2), 'tasks-bottom').setOrigin(0.5, 0.5)
  this.close = this.add.sprite(606, centerY - Math.floor(height / 2 + 114), 'tasks-close').setDepth(2)

  this.tasksWindow();

}

function tasksWindow(): void {

  this.state.amplitude.getInstance().logEvent('show_tasks_window', {
    farm_id: this.state.farm
  });

  let tasks = [];
  let textsHeight = [];
  let countBreed: number;
  let countDone: number = 0
  let taskCenterY: number = centerY - 134
  let barHeight: number = 154
  let textWidth: number = 330

  if (this.state.farm === 'Cow') {
    countBreed = this.state.cowSettings.cowSettings.length;
  } else if (this.state.farm === 'Chicken') {
    countBreed = this.state.chickenSettings.chickenSettings.length;
  } else if (this.state.farm === 'Sheep') {
    countBreed = this.state.sheepSettings.sheepSettings.length;
  }

  // Определение общей высоты с текстом и позиции 1ой плашки заданий
  for (let i = 0; i < this.state.modal.tasksParams.tasks.length; i++) {

    let task: Itasks = this.state.modal.tasksParams.tasks[i];
    let taskData: ItaskData = this.game.scene.keys[this.state.farm].getTaskData(task);

    let textForWidth: Phaser.GameObjects.Text = this.add.text(0, 0, taskData.name, {
      font: '24px Bip',
      color: '#944000',
      align: 'center',
      wordWrap: { width: textWidth }
    }).setAlpha(0);

    if (textForWidth.getBounds().height > 60) taskCenterY -= 86;
    else taskCenterY -= 80;

    textsHeight.push(textForWidth.getBounds().height);

    tasks.push({
      task: task,
      taskData: taskData,
    });

  }
  
  // Цикл создания tasks
  for (let i = 0; i < this.state.modal.tasksParams.tasks.length; i++) {

    let completed: Phaser.GameObjects.Image;
    let awardText: Phaser.GameObjects.Image;
    let awardIcon: Phaser.GameObjects.Image;
    let doneText: Phaser.GameObjects.Text;
    let takeButton: Phaser.GameObjects.Image; // зеленая кнопки
    let takeText: Phaser.GameObjects.Text; // текст кнопки
    let padding: number; // Отступ от предыдущей верхней плашки

    if (textsHeight[i] > 60 && Number(i) < this.state.modal.tasksParams.tasks.length) {

      if (barHeight === 154) padding = 12;
      else if (barHeight === 164) padding = 8;

      height += 168 + Number(i);
      taskCenterY += barHeight + padding;
      barHeight = 164;

    } else if (Number(i) < this.state.modal.tasksParams.tasks.length) {

      if (barHeight === 154) padding = 6;
      else if (barHeight === 164) padding = 2;
      
      height += 158 + Number(i);
      taskCenterY += barHeight + padding;
      barHeight = 154;
    }
    
    // Иконка и текст
    let icon: Phaser.GameObjects.Image = this.add.image(194, taskCenterY - 6, tasks[i].taskData.icon).setDepth(1).setOrigin(0.5, 0.5).setScale(0.9);
    let text: Phaser.GameObjects.Text = this.add.text(420, taskCenterY - 26, tasks[i].taskData.name, {
      font: '24px Bip',
      color: '#944000',
      align: 'center',
      wordWrap: { width: textWidth }
    }).setDepth(1).setOrigin(0.5, 0.5);

    // Отрисовка плашек
    if (tasks[i].task.done === 1 && tasks[i].task.got_awarded === 1) {

      // Галочка и затемнение иконки
      icon.setTint(0x777777).setAlpha(0.5);
      completed = this.add.image(194, taskCenterY - 6, 'completed').setDepth(1).setTint(0xc0c0c0).setOrigin(0.5, 0.5).setAlpha(0.9);

      // Плашка задания
      this.add.image(this.cameras.main.centerX + 2, taskCenterY, 'tasks-complete').setOrigin(0.5, 0.5).setDisplaySize(460, barHeight);
      text.setColor('#494949').setAlpha(0.6).setY(text.y + 20);
      countDone++;

    } else if (tasks[i].task.done === 1 && tasks[i].task.got_awarded === 0) {
      // костыль //
      let iconTexture: string = 'diamond'; 
      let award: string = String(tasks[i].task.diamonds);
      let moneyTask: any = undefined;

      if (this.state.farm === 'Sheep') {     
        moneyTask = this.game.scene.keys['Sheep'].moneyTasks.find(el => el.id === tasks[i].task.id);
        if (moneyTask) {
          award = moneyTask.money;
          iconTexture = 'sheepCoin';
        }
      }
      // ----- //

      icon.setTint(0x777777);
      completed = this.add.image(194, taskCenterY - 6, 'completed').setDepth(1).setOrigin(0.5, 0.5);

      // Плашка задания
      this.add.image(this.cameras.main.centerX + 2, taskCenterY, 'tasks-reward').setOrigin(0.5, 0.5).setDisplaySize(460, barHeight);
      this.add.image(this.cameras.main.centerX + 100, taskCenterY + (barHeight / 2) - 29, 'tasks-bar').setOrigin(0.5, 0.5);

      takeButton = this.add.image(422, taskCenterY + (barHeight / 2) - 26, 'little-button').setOrigin(0.5, 0.5).setDepth(1).setDisplaySize(134, 48);
      const position: Iposition = {
        x: 422,
        y: taskCenterY + (barHeight / 2) - 26
      }
      takeText = this.add.text(422, taskCenterY + (barHeight / 2) - 29, this.state.lang.pickUp, {
        font: '22px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5).setDepth(1);

      awardText = this.add.text(542, taskCenterY + (barHeight / 2) - 29, award, {
        font: '34px Bip',
        color: '#FFFFFF'
      }).setDepth(2).setOrigin(0.5, 0.5).setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 5);

      awardIcon = this.add.image(510, taskCenterY + (barHeight / 2) - 29, iconTexture)
        .setDepth(2)
        .setScale(0.14)
        .setOrigin(0.5, 0.5);
        
      if (moneyTask) { // костыль
        awardText.setVisible(false);
        awardIcon.setVisible(false);
        takeButton.setX(460);
        takeText.setX(takeButton.x);
      }  

      this.clickShopBtn({ btn: takeButton, title: takeText, img: false }, (): void => {
        if (iconTexture === 'diamond') {
          this.game.scene.keys[this.state.farm + 'Bars'].getCurrency(position, tasks[i].task.diamonds, 'diamond');
        } else if (iconTexture === 'sheepCoin') {
          this.game.scene.keys[this.state.farm + 'Bars'].plusMoneyAnimation(position);
        }
        this.game.scene.keys[this.state.farm].pickUpTaskReward(tasks[i].task.id);
      });

      countDone++;

    } else {
      // Счетчик прогресса
      let count: number = tasks[i].task.count;
      if (tasks[i].task.type === 14 && tasks[i].task.count === 0) count = countBreed;

      // Плашка задания
      let taskBg: Phaser.GameObjects.Image = this.add.image(this.cameras.main.centerX + 2, taskCenterY, 'tasks-uncomplete').setOrigin(0.5, 0.5).setDisplaySize(460, barHeight);
      this.add.image(this.cameras.main.centerX + 100, taskCenterY + (barHeight / 2) - 29, 'tasks-bar').setOrigin(0.5, 0.5);

      this.click(taskBg, (): void => {
        this.scene.stop('Modal');
        this.clickTaskBoard(tasks[i].task);
      });
      // костыль //

      let iconTexture: string = 'diamond';
      let award: string = String(tasks[i].task.diamonds);
      let moneyTask: any = undefined;

      if (this.state.farm === 'Sheep') {     
        moneyTask = this.game.scene.keys['Sheep'].moneyTasks.find(el => el.id === tasks[i].task.id);
        if (moneyTask) {
          award = moneyTask.money;
          iconTexture = 'sheepCoin';
        }
      }
      // ------- //


      takeText = this.add.text(426, taskCenterY + (barHeight / 2) - 28, this.state.lang.taskReward, {
        font: '24px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5).setDepth(1);

      awardText = this.add.text(542, taskCenterY + (barHeight / 2) - 29, award, {
        font: '34px Bip',
        color: '#FFFFFF'
      }).setDepth(2).setOrigin(0.5, 0.5).setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 5);

      awardIcon = this.add.image(510, taskCenterY + (barHeight / 2) - 29, iconTexture)
        .setDepth(2)
        .setScale(0.14)
        .setOrigin(0.5, 0.5);
      
      if (moneyTask) { // костыль //
        takeText.setVisible(false);
        awardIcon.setX(415);
        awardText.setX(awardIcon.getBounds().right + 5).setOrigin(0, 0.5);
      }

      doneText = this.add.text(194, taskCenterY + 60, tasks[i].task.progress + '/' + count, {
        font: '26px Shadow',
        color: '#944000'
      }).setDepth(1).setOrigin(0.5, 0.5).setShadow(1, 1, 'rgba(0, 0, 0, 0.5)', 2);

      let progress: number = (100 / count * tasks[i].task.progress) * (6.3 / 100) - Math.PI / 2

      this.add.graphics()
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
        .setDepth(3)

    }
    
  }


  // Полоска прогресса
  let percent: number = countDone / (this.state.modal.tasksParams.tasks.length / 100);
  percent = 460 / 100 * percent;
  this.add.tileSprite(132, this.cameras.main.centerY + (height / 2) + 4, percent, 16, 'part-progress').setOrigin(0, 0.5);


  // Остальной текст
  this.add.text(this.cameras.main.centerX, centerY - Math.floor(height / 2 + 200), this.state.modal.tasksParams.part, {
    font: '72px Shadow',
    fill: '#FFFFFF'
  }).setOrigin(0.5, 0.5).setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 5);

  this.add.text(this.cameras.main.centerX, centerY - Math.floor(height / 2 + 150), this.state.lang.part, {
    font: '34px Shadow',
    fill: '#FFFFFF'
  }).setOrigin(0.5, 0.5).setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 5);

  this.add.text(this.cameras.main.centerX, centerY - Math.floor(height / 2 + 78), this.state.modal.tasksParams.name, {
    font: '32px Shadow',
    fill: '#F2DCFF'
  }).setOrigin(0.5, 0.5)

  this.add.text(this.cameras.main.centerX, centerY + Math.floor(height / 2 + 10), this.state.modal.tasksParams.farmer, {
    font: '26px Shadow',
    fill: '#8f3f00'
  }).setOrigin(0.5, 0.5)
  
  const parts: Ipart[] = this.state[`${this.state.farm.toLowerCase()}Settings`][`${this.state.farm.toLowerCase()}Parts`];
  const userPart: number = this.state[`user${this.state.farm}`].part;
  
  if (this.state.modal.tasksParams.done && 
    parts.length !== userPart) {

    let nextPart = this.add.sprite(this.cameras.main.centerX, centerY + Math.floor(height / 2 + 60), 'big-btn-green').setDisplaySize(412, 64)
    let nextPartText = this.add.text(this.cameras.main.centerX, centerY + Math.floor(height / 2 + 54), this.state.lang.donePart, {
      font: '24px Shadow',
      fill: '#FFFFFF'
    }).setOrigin(0.5, 0.5)

    this.clickShopBtn({ btn: nextPart, title: nextPartText }, (): void => {
      this.game.scene.keys[this.state.farm].nextPart();
    });

  } else if (this.state.modal.tasksParams.done && 
    parts.length === userPart){

    this.add.text(this.cameras.main.centerX, centerY + Math.floor(height / 2 + 60), this.state.lang[`${this.state.farm.toLowerCase()}CompanyDone`], {
      font: '20px Shadow',
      fill: '#c15e00',
      align: 'center',
      wordWrap: { width: 420 }
    }).setOrigin(0.5, 0.5)
  
  } else if (!this.state.modal.tasksParams.done) {
    this.add.text(this.cameras.main.centerX, centerY + Math.floor(height / 2 + 60), this.state.modal.tasksParams.description, {
      font: '20px Shadow',
      fill: '#c15e00',
      align: 'center',
      wordWrap: { width: 420 }
    }).setOrigin(0.5, 0.5)
  
  }


  // Кнопка закрытия
  this.clickButton(this.close, (): void => {
    this.tasksOpened = false;
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  });

  this.resizeTasksWindow(height);

  if (!this.tasksOpened){
    this.tasksOpened = true;
    this.openModal(this.cameras.main);
  }

}

// Перезадать размеры
function resizeTasksWindow(height: number): void {

  this.top.y = centerY - Math.floor(height / 2);
  this.middle.height = height;
  this.bottom.y = centerY + Math.floor(height / 2);
  this.close.y = centerY - Math.floor(height / 2 + 114);

}


export {
  tasks,
  tasksWindow,
  resizeTasksWindow
}
