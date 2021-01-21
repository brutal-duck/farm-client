function tasks(): void {
  
  let height: number = 400;

  // Старый фон окна заданий
  // this.header = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - Math.floor(height / 2), 'tasks-window-side')
  //   .setOrigin(0.5, 1);
  // this.close = this.add.sprite(617, this.cameras.main.centerY - Math.floor(height / 2) + 5, 'header-close')
  //   .setOrigin(0.5, 0.5)
  //   .setDepth(1);
  // this.bottom = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + Math.floor(height / 2), 'tasks-window-side')
  //   .setOrigin(0.5, 0);
  // this.bottom.flipY = true;
  // this.body = this.add.tileSprite(this.cameras.main.centerX - 3, this.cameras.main.centerY, 614, height + 2, 'tasks-window-body')
  //   .setOrigin(0.5, 0.5);

  this.top = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - Math.floor(height / 2), 'tasks-top').setOrigin(0.5, 1)
  this.middle = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 563, height, 'tasks-middle').setOrigin(0.5, 0.5)
  this.top = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + Math.floor(height / 2), 'tasks-bottom').setOrigin(0.5, 0.5)

  this.tasksWindow();

}


// Старое окно заданий
// function tasksWindow(): void {

//   this.state.amplitude.getInstance().logEvent('show_tasks_window', {
//     farm_id: this.state.farm
//   });

//   let height: number = 340;
//   let startHeight: number = 140;
//   let tasks = [];
//   let countBreed: number;
//   let part: string

//   if (this.state.farm === 'Chicken') {
//     countBreed = this.state.chickenSettings.chickenSettings.length;
//     part = String(this.state.userChicken.part)
//   } else if (this.state.farm === 'Sheep') {
//     countBreed = this.state.sheepSettings.sheepSettings.length;
//     part = String(this.state.userSheep.part)
//   }

//   console.log(this.state.modal.tasksParams);
//   console.log(part);
  
  
//   for (let i in this.state.modal.tasksParams.tasks) {

//     let task: Itasks = this.state.modal.tasksParams.tasks[i];
//     let taskData: ItaskData = this.game.scene.keys[this.state.farm].getTaskData(task);
//     let boardColor: number = 0xFFEBC5;
//     let completed: boolean | Phaser.GameObjects.Image = false;
//     let awardText: boolean | Phaser.GameObjects.Image = false;
//     let awardIcon: boolean | Phaser.GameObjects.Image = false;
//     let doneText: boolean | Phaser.GameObjects.Text = false;
//     let takeButton: boolean | Phaser.GameObjects.Image = false;
//     let takeText: boolean | Phaser.GameObjects.Text = false; 
//     let gotAwarded: boolean = false;
//     let textWidth: number = 300;
    
//     if (task.got_awarded === 1) gotAwarded = true;
//     if (task.done === 1 && task.got_awarded === 0) textWidth = 260;

//     let boardHeight: number = 110;
//     let board: Phaser.GameObjects.Graphics = this.add.graphics({ x: 110, y: 0 }).setDepth(1);

//     let icon: Phaser.GameObjects.Image = this.add.image(165, 0, taskData.icon).setDepth(1);
//     let text: Phaser.GameObjects.Text = this.add.text(220, 0, taskData.name, {
//       font: '23px Bip',
//       color: '#713D1E',
//       align: 'left',
//       wordWrap: { width: textWidth }
//     }).setDepth(1).setOrigin(0, 0);

//     let boundsHeight = text.getBounds().height;

//     if (boundsHeight > 30) {
//       let plusHeight: number = boundsHeight - 30;
//       boardHeight += plusHeight;
//     }

//     if (task.done === 1) {

//       boardColor = 0x94CB6F;
//       icon.setTint(0x777777);
//       completed = this.add.image(165, 0, 'completed').setDepth(1);

//     } else {

//       let count: number = task.count;
//       if (task.type === 14 && task.count === 0) count = countBreed;
      
//       doneText = this.add.text(222, 0, this.state.lang.performed + ' ' + task.progress + ' / ' + count, {
//         font: '20px Bip',
//         color: '#525252'
//       }).setDepth(1).setOrigin(0, 0.5);

//     }

//     board.fillStyle(boardColor, 1);
//     board.fillRoundedRect(0, 0, 500, boardHeight, 8);

//     // Кристалы - награда
//     if ((task.done === 1 && task.got_awarded === 0) || task.done === 0) {
      
//       awardText = this.add.text(261, 300, String(task.diamonds), {
//         font: '20px Bip',
//         color: '#FFFFFF'
//       }).setDepth(2).setOrigin(0, 0.5);

//       awardIcon = this.add.image(231, 300, 'diamond')
//         .setDepth(2)
//         .setScale(0.1)
//         .setOrigin(0, 0.5);

//     }

//     if (task.done === 1 && task.got_awarded === 0) {

//       takeButton = this.add.image(540, 0, 'little-button').setDepth(1);
//       takeText = this.add.text(540, 0, this.state.lang.pickUp, {
//         font: '20px Shadow',
//         color: '#FFFFFF'
//       }).setOrigin(0.5, 0.5).setDepth(1);

//       this.clickShopBtn({ btn: takeButton, title: takeText, img: false }, (): void => {
//         this.game.scene.keys[this.state.farm].pickUpTaskReward(task.id);
//       });

//     }

//     tasks.push({
//       board: board,
//       icon: icon,
//       completed: completed,
//       text: text,
//       height: boardHeight,
//       gotAwarded: gotAwarded,
//       awardIcon: awardIcon,
//       awardText: awardText,
//       doneText: doneText,
//       takeButton: takeButton,
//       takeText: takeText
//     });

//     height += boardHeight;

//   }

//   for (let i in tasks) {

//     startHeight += 5;
//     let task = tasks[i];
//     task.board.y = this.cameras.main.centerY - (height / 2 - startHeight);
//     task.icon.y = this.cameras.main.centerY - (height / 2 - startHeight - (task.height / 2));

//     if (task.completed) {

//       task.completed.y = task.icon.y;
//       task.text.y = task.icon.y;

//       if (!task.gotAwarded) {
//         task.text.setOrigin(0, 0);
//         task.text.y = this.cameras.main.centerY - (height / 2 - startHeight - 20);
//       } else {
//         task.text.setOrigin(0, 0.5);
//       }

//     } else task.text.y = this.cameras.main.centerY - (height / 2 - startHeight - 10);

//     if (task.doneText) {

//       let boundsText = task.text.getBounds();
//       task.doneText.y = boundsText.height + boundsText.y + 15;

//     }

//     if (task.awardIcon && task.awardText) {

//       let boundsText: Phaser.GameObjects.Text;
//       if (task.doneText) boundsText = task.doneText.getBounds();
//       else boundsText = task.text.getBounds();
      
//       let margin: number = 18;
//       if (!task.doneText) margin = 25;

//       task.awardIcon.y = boundsText.height + boundsText.y + margin;
//       task.awardText.y = boundsText.height + boundsText.y + margin;
      
//       let bounds = task.awardText.getBounds();
//       let awardBg = this.add.graphics({ x: bounds.left - 40, y: bounds.top - 3 });
//       awardBg.fillStyle(0x713D1E, 1);
//       awardBg.fillRoundedRect(0, 0, bounds.width + 50, bounds.height + 6, 5);
//       awardBg.setDepth(1);

//     }

//     if (task.takeButton && task.takeText) {

//       task.takeButton.y = task.icon.y;
//       task.takeText.y = task.icon.y - 3;

//     }

//     startHeight += task.height;

//   }

//   // Фон заданий, создающий окантовку
//   let bg: Phaser.GameObjects.Graphics = this.add.graphics({
//     x: 105,
//     y: this.cameras.main.centerY - height / 2 + 140
//   });

//   bg.fillStyle(0xF9D48D, 1);
//   bg.fillRoundedRect(0, 0, 510, startHeight - 140 + 5, 8);

//   // Текст главы
//   this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - (height / 2 - 10), this.state.modal.tasksParams.part, {
//     font: '28px Shadow',
//     fill: '#713D1E'
//   }).setOrigin(0.5, 0.5);
  
//   // Текст названия главы
//   this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - (height / 2 - 55), this.state.modal.tasksParams.name, {
//     font: '36px Shadow',
//     fill: '#713D1E'
//   }).setOrigin(0.5, 0.5);

//   let countDone: number = 0;
  
//   for (let i in this.state.modal.tasksParams.tasks) {
//     let task: Itasks = this.state.modal.tasksParams.tasks[i];
//     if (task.done === 1) countDone++;
//   }

//   let percent: number = countDone / (this.state.modal.tasksParams.tasks.length / 100);
//   percent = 496 / 100 * percent;

//   // Полоска прогресса
//   this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - (height / 2 - 105), 'pb-chapter');
//   this.add.tileSprite(112, this.cameras.main.centerY - (height / 2 - 105), percent, 16, 'part-progress')
//     .setOrigin(0, 0.5);

//   let progress: Phaser.GameObjects.Graphics = this.add.graphics();
//   progress.fillStyle(0x713D1E, 1);
//   progress.fillRect(100, this.cameras.main.centerY + (height / 2 - 150), 520, 2.5);

//   this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + (height / 2 - 110), this.state.modal.tasksParams.farmer, {
//     font: '28px Shadow',
//     fill: '#713D1E'
//   }).setOrigin(0.5, 0.5);

//   if (this.state.modal.tasksParams.done) {

//     let nextPart = this.bigButton('green', 'center', (height / 2 - 40), this.state.lang.donePart);
//     this.clickModalBtn(nextPart, (): void => {
//       this.game.scene.keys[this.state.farm].nextPart();
//     });

//   } else {

//     this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + (height / 2 - 40), this.state.modal.tasksParams.description, {
//       font: '24px Shadow',
//       fill: '#737373',
//       align: 'center',
//       wordWrap: { width: 450 }
//     }).setOrigin(0.5, 0.5);

//   }

//   this.resizeTasksWindow(height);

//   this.clickButton(this.close, (): void => {
//     this.scene.stop();
//     this.game.scene.keys[this.state.farm].scrolling.wheel = true;
//   });

// }

function tasksWindow(): void {

}

// задать размеры
function resizeTasksWindow(height: number): void {

  this.header.y = this.cameras.main.centerY - Math.floor(height / 2);
  this.close.y = this.cameras.main.centerY - Math.floor(height / 2) + 5;
  this.bottom.y = this.cameras.main.centerY + Math.floor(height / 2);
  this.body.height = height + 2;

}


export {
  tasks,
  tasksWindow,
  resizeTasksWindow
}
