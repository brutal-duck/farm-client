import AllTasks from '../tasks';

// список заданий текущей главы
function partTasks(): Itasks[] {

  let partTasks: Itasks[] = [];
  let tasks: Itasks[] = [];
  let user: IuserSheep | IuserChicken;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    tasks = this.state.sheepTasks;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    tasks = this.state.chickenTasks;
    
  }
  
  // костыль (иногда нет заданий у кого-то)
  if (tasks?.length === 0 || !tasks) {

    console.log('-----------');

    console.log('AllTasks ', AllTasks);
    console.log('this state farm', this.state.farm);

    console.log('-----------');

    tasks = [];

    for (let i in AllTasks) {

      

      if (AllTasks[i].farm === 1 && this.state.farm === 'Sheep') tasks.push(AllTasks[i]);
      if (AllTasks[i].farm === 2 && this.state.farm === 'Chicken') tasks.push(AllTasks[i]);

    }

  }

  for (let i: number = 0; i < tasks.length; i++) {

    if (tasks[i].part === user.part) {

      if (tasks[i].type === 10) {
        
        if ((this.state.platform === 'web' &&
          this.state.user.login === '') || 
          this.takeRewardRegistration) {
          partTasks.push(tasks[i]);
        }
        
      } else if (tasks[i].type === 16) {

        if (this.state.platform === 'web') {
          partTasks.push(tasks[i]);
        }

      } else {
        partTasks.push(tasks[i]);
      }

    }

  }

  return partTasks;
  
}


// попытка выполнения задания
function tryTask(type: number, state: number, count: number = 1): void {

  let part: number;

  if (this.state.farm === 'Sheep') part = this.state.userSheep.part;
  else if (this.state.farm === 'Chicken') part = this.state.userChicken.part;

  let tasks: Itasks[] = this.partTasks();
  let task: Itasks = tasks.find((data: Itasks) => data.type === type);

  if (task?.done === 0 &&
    task?.progress < task?.count &&
    (task?.state === state || task?.state === 0 || (task?.type === 6 && task?.state <= state))) {
    
    task.progress += count;

    if (task.progress >= task.count) {

      task.done = 1;
      this.state.amplitude.getInstance().logEvent('task_done', {
        task_id: task.id,
        part: part,
        farm_id: this.state.farm
      });

      if (task.id === 127 || task.id === 5) this.arrows?.destroy();

    }

    this.game.scene.keys[this.state.farm + 'Bars'].taskBoard.update();
    this.game.scene.keys[this.state.farm + 'Bars'].currentPartProgress();

  }

}


// имя и иконка задания
function getTaskData(task: Itasks): ItaskData {
  
  let num: number;

  switch (task.type) {
    case 1:
      if (task.state === 0) num = 17;
      else num = task.state;
      break;
    case 2:
      if (task.state === 0) num = 20;
      else num = task.state;
      break;
    case 3: num = 16; break;
    case 4:
      if (task.state === 0) num = 17;
      else num = task.state;
      break;
    case 5:
      if (task.state === 2) num = 25;
      else if (task.state === 3) num = 26;
      else if (task.state === 5) num = 27;
      else num = 29;
      break;
    case 6: num = 15; break;
    case 7: num = 22; break;
    case 8: num = 24; break;
    case 9: num = 23; break;
    case 10: num = 19; break;
    case 11: num = 21; break;
    case 14: num = 17; break;
    case 15: num = 14; break;
    case 16: num = 30; break;
    case 17: num = 28; break;
    case 18: num = 13; break;
    case 19: num = 13; break;
    case 20: num = 31; break;
    default: num = 21; break;
  }

  let name: string = this.state.lang['taskName_' + task.id];

  if (!name) {
    name = this.state.lang.taskName;
  }

  name = name.replace('$1', String(task.count));
  name = name.replace('$2', String(task.state));

  return {
    icon: this.state.farm.toLowerCase() + '-task-icon-' + num,
    name: name
  }

}


// проверка задания "животные на поле"
function checkAnimalTask(): void {

  let animals: any;
  let settings: IchickenPoints[] | IsheepPoints[] = [];

  if (this.state.farm === 'Sheep') {

    animals = this.sheep.children.entries;
    settings = this.state.sheepSettings.sheepSettings;

  } else if (this.state.farm === 'Chicken') {

    animals = this.chicken.children.entries;
    settings = this.state.chickenSettings.chickenSettings;

  }

  let tasks: Itasks[] = this.partTasks();
  let task: Itasks = tasks.find((data: Itasks) => data.type === 14);

  if (task?.state === 0 && task?.count > 0 && task?.done === 0) {

    let count: number = animals.length;
    task.progress = count;

    if (task.count <= count) {
      task.done = 1;
      task.progress = count;
    }
    
    this.game.scene.keys[this.state.farm + 'Bars'].taskBoard.update();

  } else if (task?.count === 0) {

    let count: number = 0;

    for (let i: number = 0; i < settings.length; i++) {

      for (let j = 0; j < animals.length; j++) {

        if (settings[i].breed === animals[j].type) {
          count++
          break;
        }

      }

    }

    task.progress = count;

    if (settings.length <= count) {

      task.done = 1;
      task.progress = count;

    }

    this.game.scene.keys[this.state.farm + 'Bars'].taskBoard.update();

  } else if (task?.state > 0 && task?.count > 0) {

    let count: number = 0;
    for (let i in animals) {

      let chicken = animals[i];
      if (task.state === chicken.type) count++

    }

    task.progress = count;

    if (task.count <= count) {
      task.progress = count;
      task.done = 1;
    }
    
    this.game.scene.keys[this.state.farm + 'Bars'].taskBoard.update();

  }

}


// проверка на уже выполненние задания
function checkDoneTasks(): void {

  let tasks: Itasks[] = this.partTasks();

  for (let i in tasks) {

    // задания на улучшение земель
    if (tasks[i].type === 8 || tasks[i].type === 9 || tasks[i].type === 17) {

      let count: number = 0;
      let type: number;

      if (tasks[i].type === 8) type = 2;
      else if (tasks[i].type === 9) type = 3;
      else if (tasks[i].type === 17) type = 5;

      for (let j in this.territories.children.entries) {

        if (type === this.territories.children.entries[j].type &&
          this.territories.children.entries[j].improve === tasks[i].state) count++

      }

      if (count >= tasks[i].count) {

        tasks[i].progress = tasks[i].count;
        tasks[i].done = 1;

      } else {
        tasks[i].progress = count;
      }


    }

  }

  this.game.scene.keys[this.state.farm + 'Bars'].taskBoard.update();
  this.game.scene.keys[this.state.farm + 'Bars'].currentPartProgress();

}


export {
  partTasks,
  tryTask,
  getTaskData,
  checkAnimalTask,
  checkDoneTasks
}
