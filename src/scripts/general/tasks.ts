import AllTasks from '../tasks';
import SpeechBubble from '../components/animations/SpeechBuble';
import clanTasks from '../local/tasks/clanTasks';
import { Task, TaskType, TerritoryType } from '../local/tasks/types';
import Territory from './../components/Territories/Territory';
import BarsScene from './../components/Scenes/BarsScene';
import Utils from './../libs/Utils';

// список заданий текущей главы
function partTasks(): Itasks[] {
  if (Utils.checkTestB(this.state))return partTasksTestB.bind(this)();

  let partTasks: Itasks[] = [];
  let tasks: Itasks[] = [];
  let user: IuserSheep | IuserChicken | IuserCow;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    tasks = this.state.sheepTasks;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    tasks = this.state.chickenTasks;
    
  } else if (this.state.farm === 'Cow') {

    user = this.state.userCow;
    tasks = this.state.cowTasks;
    
  }
  
  // костыль (иногда нет заданий у кого-то)
  if (tasks?.length === 0 || !tasks) {

    tasks = [];

    for (let i in AllTasks) {

      if (AllTasks[i].farm === 1 && this.state.farm === 'Sheep') tasks.push(AllTasks[i]);
      if (AllTasks[i].farm === 2 && this.state.farm === 'Chicken') tasks.push(AllTasks[i]);
      if (AllTasks[i].farm === 3 && this.state.farm === 'Cow') tasks.push(AllTasks[i]);

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

function partTasksTestB(): Task[] {
  const partTasks: Task[] = [];
  const tasks: Task[] = this.state[`${this.state.farm.toLowerCase()}Tasks`];
  const farmUser: IuserSheep | IuserChicken | IuserCow = this.state[`user${this.state.farm}`];
  const { part, collectorTimeLevel } = farmUser;

  tasks.forEach(task => {
    const [ taskPart ] = task.id.split('-').map(el => Number(el));
    if (task.type === TaskType['IMPROVE_COLLECTOR']) task.progress = collectorTimeLevel;
    if (part === taskPart) partTasks.push(task);
  });

  return partTasks;
}


// попытка выполнения задания
function tryTask(type: number, state: number, count: number = 1, currentProgress?: number): void {
  if (Utils.checkTestB(this.state)) return tryTaskTestB.bind(this)(type, state, count, currentProgress);

  let part: number;
  if (this.state.farm === 'Sheep') part = this.state.userSheep.part;
  else if (this.state.farm === 'Chicken') part = this.state.userChicken.part;
  else if (this.state.farm === 'Cow') part = this.state.userCow.part;

  let tasks: Itasks[] = this.partTasks();
  let task: Itasks = tasks.find((data: Itasks) => data.type === type);
  
  if (!currentProgress && task?.done === 0 &&
    task?.progress < task?.count &&
    (task?.state === state || task?.state === 0 || 
    ((task?.type === 24 || task?.type === 8 || task?.type === 9 || task?.type === 17) 
    && task?.state <= state))) {
    task.progress += count;
    if (task.progress >= task.count) {
      task.done = 1;
      this.tryClanTask(16);
      this.state.amplitude.logAmplitudeEvent('task_done', {
        task_id: task.id,
        part: part,
      });
    }
    this.game.scene.keys[this.state.farm + 'Bars'].setCurrentPartProgress();
  }

  if ((task?.done === 0 && currentProgress)) {
    task.progress = currentProgress;
    if (task.progress >= task.count) {
      task.done = 1;
      this.tryClanTask(16);
      this.state.amplitude.logAmplitudeEvent('task_done', {
        task_id: task.id,
        part: part,
      });
    }
    this.game.scene.keys[this.state.farm + 'Bars'].setCurrentPartProgress();
  }

  if (task?.progress >= task?.count && (task?.type === 21 || task?.type === 22 || task?.type === 3)) {
    task.done = 1;
    this.tryClanTask(16);
    this.state.amplitude.logAmplitudeEvent('task_done', {
      task_id: task.id,
      part: part,
    });
    this.game.scene.keys[this.state.farm + 'Bars'].setCurrentPartProgress();
  }
}

function tryTaskTestB(type: number, state: number, count: number = 1, currentProgress?: number): void {
  const part: number = this.state[`user${this.state.farm}`].part;


  const tasks: Task[] = this.partTasks();
  const task: Task = tasks.find(data => data.type === type && data.done === 0);

  if (!task) return;

  const checkDoneTask = (): void => {
    if (task.progress >= task.count) {
      task.done = 1;
      this.tryClanTask(16);
      this.state.amplitude.logAmplitudeEvent('task_done', {
        task_id: task.id,
        part: part,
      });
    }
    this.game.scene.keys[this.state.farm + 'Bars'].setCurrentPartProgress();
  }

  const isImproveTerritoryTask = task.type === TaskType['IMPROVE_FACTORY'] 
    || task.type === TaskType['IMPROVE_PASTURE'] 
    || task.type === TaskType['IMPROVE_WATER'] 
    || task.type === TaskType['IMPROVE_REPOSITORY'];
    if (!currentProgress) {
      const isNullState = task.state === 0;
      const checkState = task.state === state || isNullState || (isImproveTerritoryTask && task.state <= state);
    if (task.progress < task.count && checkState) {
      task.progress += count;
      checkDoneTask();
    }
  } else {
    task.progress = currentProgress;
    checkDoneTask();
  }

  const isCountTask = task.type === TaskType['TAKE_COLLECTOR']
  || task.type === TaskType['TAKE_FEED_BOOST']
  || task.type === TaskType['TAKE_HERD_BOOST'];
  if (isCountTask) checkDoneTask();
}

// имя и иконка задания
function getTaskData(task: Itasks): ItaskData {
  if (Utils.checkTestB(this.state)) return getTaskDataTestB.bind(this)(task);
  if (!task) return;
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
      else if (task.state === 8) num = 37;
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
    case 21: num = 32; break; 
    case 22: num = 33; break;
    case 23: num = 34; break;
    case 24: num = 35; break;
    case 25: num = 33; break;
    case 26: num = 36; break;
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

function getTaskDataTestB(task: Task): ItaskData {
  if (!task) return;
  
  let num: number;

  switch (task.type) {
    case TaskType['BUY_ANIMAL']:
      if (task.state === 0) num = 17;
      else num = task.state;
      break;
    case TaskType['MERGE_ANIMAL']:
      if (task.state === 0) num = 20;
      else num = task.state;
      break;
    case TaskType['TAKE_COLLECOTR']: num = 16; break;
    case TaskType['GET_ANIMAL']:
      if (task.state === 0) num = 17;
      else num = task.state;
      break;
    case TaskType['BUY_TERRITORY']:
      if (task.state === TerritoryType['PASTURE']) num = 25;
      else if (task.state === TerritoryType['WATER']) num = 26;
      else if (task.state === TerritoryType['RESPOSITORY']) num = 27;
      else if (task.state === TerritoryType['FACTORY']) num = 37;
      else num = 29;
      break;
    case TaskType['COLLECT_MONEY']: num = 15; break;
    case TaskType['IMPROVE_FAIR']: num = 22; break;
    case TaskType['IMPROVE_PASTURE']: num = 24; break;
    case TaskType['IMPROVE_WATER']: num = 23; break;
    case TaskType['SAVE_PROGRESS']: num = 19; break;
    case TaskType['HAND_COLLECT']: num = 21; break;
    case TaskType['ANIMAL_ON_FARM']: num = 17; break;
    case TaskType['SPEND_DIAMONDS']: num = 14; break;
    case TaskType['ADD_EMAIL']: num = 30; break;
    case TaskType['IMPROVE_REPOSITORY']: num = 28; break;
    case TaskType['TAKE_DIAMOND_ANIMAL']: num = 13; break;
    case TaskType['COLLECT_DIAMONDS_FROM_ANIMAL']: num = 13; break;
    case TaskType['SELL_RESOURCE']: num = 31; break;
    case TaskType['TAKE_FEED_BOOST']: num = 32; break; 
    case TaskType['TAKE_HERD_BOOST']: num = 33; break;
    case TaskType['IMPROVE_COLLECTOR']: num = 34; break;
    case TaskType['IMPROVE_FACTORY']: num = 35; break;
    case TaskType['TAKE_ANIMAL_FROM_HERD']: num = 33; break;
    case TaskType['SAVE_MILK']: num = 36; break;
    case TaskType['IMPROVE_ALL_TERRITORY']: num = 29; break;
    case TaskType['EXCHANGE_DIAMOND']: num = 14; break;
    default: num = 21; break;
  }

  const newId = task.id.replace('-', '_');
  let name: string = this.state.lang[`taskName${this.state.farm}_${newId}`];

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
  if (Utils.checkTestB(this.state)) return checkAnimalTaskTestB.bind(this)();
  let animals: any;
  let settings: IchickenPoints[] | IsheepPoints[] = [];

  if (this.state.farm === 'Sheep') {
    animals = this.sheep.children.entries;
    settings = this.state.sheepSettings.sheepSettings;
  } else if (this.state.farm === 'Chicken') {
    animals = this.chicken.children.entries;
    settings = this.state.chickenSettings.chickenSettings;
  } else if (this.state.farm === 'Cow') {
    animals = this.animalGroup.children.entries;
    settings = this.state.cowSettings.cowSettings;
  }

  if (this.state.farm !== 'Cow') {
    let tasks: Itasks[] = this.partTasks();
    let task: Itasks = tasks.find((data: Itasks) => data.type === 14);
    if (task?.state === 0 && task?.count > 0 && task?.done === 0) {
      let count: number = animals.length;
      task.progress = count;
      if (task.count <= count) {
        task.done = 1;
        this.tryClanTask(16);
        task.progress = count;
      }
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
        this.tryClanTask(16);
        task.progress = count;
      }
  
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
        this.tryClanTask(16);
      }
    }
  } else {
    let tasks: Itasks[] = this.partTasks();
    let task: Itasks = tasks.find((data: Itasks) => data.type === 14);
    if (task?.state === 0 && task?.count > 0 && task?.done === 0) {
      let count: number = animals.length;
      task.progress = count;
  
      if (task.count <= count) {
        task.done = 1;
        task.progress = count;
        this.tryClanTask(16);
      }
      
    } else if (task?.count === 0) {
      let count: number = 0;
      for (let i: number = 0; i < settings.length; i++) {
        for (let j = 0; j < animals.length; j++) {
          if (settings[i].breed === animals[j].breed) {
            count++
            break;
          }
        }
      }
  
      task.progress = count;
  
      if (settings.length <= count) {
        task.done = 1;
        task.progress = count;
        this.tryClanTask(16);
      }
  
    } else if (task?.state > 0 && task?.count > 0) {
      let count: number = 0;
      for (let i in animals) {
        let chicken = animals[i];
        if (task.state === chicken.breed) count++
      }
  
      task.progress = count;
  
      if (task.count <= count) {
        task.progress = count;
        task.done = 1;
        this.tryClanTask(16);
      }
    }
  }
}

function checkAnimalTaskTestB(): void {
  let animals: any;
  let settings: IchickenPoints[] | IsheepPoints[] | IcowPoints[] = [];

  if (this.state.farm === 'Sheep') {
    animals = this.sheep.children.entries;
    settings = this.state.sheepSettings.sheepSettings;
  } else if (this.state.farm === 'Chicken') {
    animals = this.chicken.children.entries;
    settings = this.state.chickenSettings.chickenSettings;
  } else if (this.state.farm === 'Cow') {
    animals = this.animalGroup.children.entries;
    settings = this.state.cowSettings.cowSettings;
  }

  const setDoneTask = (task: Task, count: number) => {
    task.done = 1;
    this.tryClanTask(16);
    task.progress = count;
  }

  const tasks: Task[] = this.partTasks();
  const task = tasks.find(data => data.type === 14);
  if (!task || task.done === 1) return;

  if (task.state === 0 && task.count > 0) {
    let count: number = animals.length;
    task.progress = count;
    if (task.count <= count) setDoneTask(task, count)
  } else if (task.count === 0) {
    let count: number = 0;
    for (let i: number = 0; i < settings.length; i++) {
      for (let j = 0; j < animals.length; j++) {
        if (settings[i].breed === animals[j].type || settings[i].breed === animals[j].breed) {
          count++;
          break;
        }
      }
    }
    task.progress = count;
    if (settings.length <= count) setDoneTask(task, count);
  } else if (task.state > 0 && task.count > 0) {
    let count: number = 0;
    for (let i in animals) {
      let animal = animals[i];
      if (task.state === animal.type || task.state === animal.breed) count++
    }
    task.progress = count;
    if (task.count <= count) setDoneTask(task, count)
  }
}

// проверка на уже выполненние задания
function checkDoneTasks(): void {
  if (Utils.checkTestB(this.state)) return checkDoneTasksTestB.bind(this)();
  const tasks: Itasks[] = this.partTasks();
  for (let i in tasks) {

    // задания на улучшение земель
    if (tasks[i].type === 8
      || tasks[i].type === 9
      || tasks[i].type === 17
      || tasks[i].type === 24) {

      let count: number = 0;
      let type: number;

      if (tasks[i].type === 8) type = 2;
      else if (tasks[i].type === 9) type = 3;
      else if (tasks[i].type === 17) type = 5;
      else if (tasks[i].type === 24) type = 8

      for (let j in this.territories.children.entries) {
        if (type === this.territories.children.entries[j].territoryType &&
          this.territories.children.entries[j].improve >= tasks[i].state) count++
      }

      if (count >= tasks[i].count) {
        tasks[i].progress = tasks[i].count;
        tasks[i].done = 1;
        this.tryClanTask(16);
      } else {
        tasks[i].progress = count;
      }
    }
    
    if (tasks[i]?.type === 23) {
      tasks[i].progress = this.state[`user${this.state.farm}`].collectorLevel;
      if (this.state[`user${this.state.farm}`].collectorLevel >= tasks[i].count) {
        tasks[i].done = 1;
      }
    }

    if (tasks[i]?.type === 21) {
      if (Math.floor(this.state[`user${this.state.farm}`].feedBoostTime / 60) >= tasks[i].count) {
        tasks[i].done = 1;
      }
    }
  }
  this.game.scene.keys[this.state.farm + 'Bars'].setCurrentPartProgress();
}

function checkDoneTasksTestB(): void {
  const tasks: Task[] = this.partTasks();
  tasks.forEach(task => {
    if (task.type === TaskType['IMPROVE_ALL_TERRITORY']) {
      const part = this.state[`user${this.state.farm}`].part;
      const availableTerritories: number = part === 20 ? 21 : part + 2;
      const territories: Territory[] = this.territories.children.entries;
      const filteredTer = territories.filter(el => (el.territoryType === TerritoryType['REPOSITORY'] 
        || el.territoryType === TerritoryType['PASTURE'] 
        || el.territoryType === TerritoryType['WATER']) 
        && el.improve === part
      );

      this.tryTask(27, availableTerritories, 0, filteredTer.length)
    }
  });
  this.game.scene.keys[this.state.farm + 'Bars'].setCurrentPartProgress();
}

function clickTaskBoard(task: Itasks): void {
  if (Utils.checkTestB(this.state)) return clickTaskBoardTestB.bind(this)(task);
  if (!task) return;
  const farmTerritories: Territory[] = this.game.scene.keys[this.state.farm].territories.children.entries;
  const barsScene: BarsScene = this.game.scene.keys[`${this.state.farm}Bars`];

  const openTerritoryWindow = (territory: any): void => {
    this.state.territory = territory;
    const modal: Imodal = { type: 1, sysType: 2 };
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);
  };
  
  const openRegisterWindow = (): void => {
    const modal: Imodal = { type: 1, sysType: 15 };
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);
  }
  
  const openShopAnimal = (): void => {
    const modal: Imodal = { type: 2, shopType: 3 };
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);
  }
  
  const mergeAnimalBubble = (): void => {
    this.game.scene.keys[this.state.farm].scrolling.scrollY = 0; 
    SpeechBubble.create(this.game.scene.keys[this.state.farm], this.state.lang.taskHelp_2, 1);
  }
  
  const openShopBoosters = (): void => {
    const modal: Imodal = { type: 2, shopType: 4 };
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);
  }
  
  const takeAnimalBubble = (): void => {
    this.game.scene.keys[this.state.farm].scrolling.scrollY = 0; 
    SpeechBubble.create(this.game.scene.keys[this.state.farm], this.state.lang.taskHelp_4, 1);
  }
  
  const openMerg = (): void => {
    const merg: Territory = farmTerritories.find(el => (el.territoryType === 4));
    openTerritoryWindow(merg);
  }
  
  const findTerritoryToImproveFromType = (type: number): Territory => {
    let territory: Territory;
    for (let i = 1; i < 20; i++) {
      territory = farmTerritories.find(el => (el.territoryType === type) && el.improve === task.state - i);
      if (territory) break;
    }
    return territory;
  }  

  const openPastureOrSpeechBuble = (): void => {
    this.state.territory = undefined;
    const territory = findTerritoryToImproveFromType(2);
    if (territory) openTerritoryWindow(territory);
    else SpeechBubble.create(barsScene, this.state.lang.taskHelp_8, 3);
  }
  
  const openDrinkerOrSpeechBuble = (): void => {
    this.state.territory = undefined;
    const territory = findTerritoryToImproveFromType(3);
    if (territory) openTerritoryWindow(territory);
    else SpeechBubble.create(barsScene, this.state.lang.taskHelp_9, 3);
  }
  
  const openStorageToImproveOrSpeechBuble = (): void => {
    this.state.territory = undefined;
    const territory = findTerritoryToImproveFromType(5);
    if (territory) openTerritoryWindow(territory);
    else SpeechBubble.create(barsScene, this.state.lang.taskHelp_17, 3);
  }
  
  const openNotFreeStorageOrSpeechBubble = (): void => {
    let storage: Territory = farmTerritories.find(el => (el.territoryType === 5) && el.money > 0);
    this.state.territory = undefined;
    if (storage) openTerritoryWindow(storage);
    else SpeechBubble.create(barsScene, this.state.lang.taskHelp_6, 3);
  }
  
  const openStorageOrSpeechBuble = (): void => {
    let storage: Territory = farmTerritories.find(el => (el.territoryType === 5));
    this.state.territory = undefined;
    if (storage) openTerritoryWindow(storage); 
    else SpeechBubble.create(barsScene, this.state.lang.taskHelp_20, 3);
  }
  
  const openFactory = (): void => {
    let factory: Territory = farmTerritories.find(el => (el.territoryType === 8));
    this.state.territory = factory;
    if (factory) {
      const modal: Imodal = { type: 13 };
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
    }; 
  }

  const openImproveFactory = (): void => {
    let factory: Territory = farmTerritories.find(el => (el.territoryType === 8));
    this.state.territory = factory;
    if (factory) this.game.scene.keys[this.state.farm].showImproveFactory();
  }
  
  const findUnlockTerritoryForBuy = (): Territory => {
    let settings: IterritoriesPrice[] = this.state[`${this.state.farm.toLowerCase()}Settings`][`territories${this.state.farm}Price`];
    let unlockTerritories: IterritoriesPrice[] = settings.filter(el => el.unlock <= this.state[`user${this.state.farm}`].part);
    for (const territoryPrice of unlockTerritories) {
      let findTerr = farmTerritories.find(el => (el.territoryType === 0) && el.block === territoryPrice.block && el.position === territoryPrice.position && el.cooldown <= 0);
      if (findTerr) return findTerr;
    }
  }

  const openBuyTerritoryWindowForTask = (): void => {
    if (task.state === 1 || task.state === 0) {
      const territory = findUnlockTerritoryForBuy();
      if (territory) openTerritoryWindow(territory);
      else SpeechBubble.create(barsScene, this.state.lang.taskHelp_5, 3);
    }
    if (task.state === 2 || task.state === 5 ) {
      const territory = farmTerritories.find(el => el.territoryType === 1);
      if (territory) openTerritoryWindow(territory);
      else {
        const unlockTerritory = findUnlockTerritoryForBuy();
        if (unlockTerritory) openTerritoryWindow(unlockTerritory);
        else SpeechBubble.create(barsScene, this.state.lang[`taskHelp_5_${task.state}`], 3);
      }
    };

    if (this.state.userCow.part < 3 && task.state === 8) {
      const task: Itasks = this.state.cowTasks.find(el => el.id === 138);
      const territory = farmTerritories.find(el => el.block === 3 && el.position === 1);
      if (task?.done === 1 && task?.got_awarded === 1 && territory.cooldown <= 0) {
        openTerritoryWindow(territory)
      } else if (territory.cooldown > 0) {
        SpeechBubble.create(barsScene, this.state.lang.taskHelp_5, 3)
      } else {
        SpeechBubble.create(this.game.scene.keys[`${this.state.farm}Bars`], this.state.lang.doneFirstTask, 3);
      } 
    }
  }
  switch (task.type) {
    case 1: 
      openShopAnimal();
      break;
    case 2: 
      mergeAnimalBubble();
      break;
    case 3: 
      openShopBoosters();
      break;
    case 4: 
      takeAnimalBubble();
      break;
    case 5:
      openBuyTerritoryWindowForTask();
      break;
    case 6: 
      openNotFreeStorageOrSpeechBubble();
      break;
    case 7: 
      openMerg();
      break;
    case 8: 
      openPastureOrSpeechBuble();
      break;
    case 9:
      openDrinkerOrSpeechBuble();
      break;
    case 10: 
      openRegisterWindow();
      break;
    case 11: 
      SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang[`taskHelp${this.state.farm}_11`], 3);
      break;
    case 12: 
      break;
    case 13: 
      break;
    case 14: 
      openShopAnimal();
      break;
    case 15: 
      openShopBoosters();
      break;
    case 16: 
      this.game.scene.keys['Sheep'].openEmailWindow(); // задание на почту
      break;
    case 17: 
      openStorageToImproveOrSpeechBuble();
      break;
    case 18: 
      this.game.scene.keys[this.state.farm].scrolling.scrollY = 0;
      this.game.scene.keys[this.state.farm][`takeDiamond${this.state.farm}`]();
      break;
    case 19: 
      SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang[`taskHelp${this.state.farm}_19`], 3);
      break;
    case 20: 
      if (this.state.farm !== 'Cow') openStorageOrSpeechBuble();
      else openFactory();
      break;
    case 21: 
      openShopBoosters();
      break;
    case 22: 
      openShopBoosters();
      break;
    case 23: 
      this.game.scene.keys[this.state.farm].showImproveCollector();
      break;
    case 24:
      openImproveFactory(); 
      break;
    case 25: 
      openShopBoosters();
      break;
    case 26: 
      SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang.taskHelp_26, 3);
      break;
    default: 
      break;
  }
}

function clickTaskBoardTestB(task: Task): void {
  if (!task) return;
  const farmTerritories: Territory[] = this.game.scene.keys[this.state.farm].territories.children.entries;
  const barsScene: BarsScene = this.game.scene.keys[`${this.state.farm}Bars`];

  const openTerritoryWindow = (territory: Territory): void => {
    this.state.territory = territory;
    const modal: Imodal = { type: 1, sysType: 2 };
    this.state.modal = modal;
    if (this.scene.isActive('Modal')) this.scene.restart(this.state);
    else this.scene.launch('Modal', this.state);
  };
  
  const openRegisterWindow = (): void => {
    const modal: Imodal = { type: 1, sysType: 15 };
    this.state.modal = modal;
    if (this.scene.isActive('Modal')) this.scene.restart(this.state);
    else this.scene.launch('Modal', this.state);
  }
  
  const openShopAnimal = (): void => {
    const modal: Imodal = { type: 2, shopType: 3 };
    this.state.modal = modal;
    if (this.scene.isActive('Modal')) this.scene.restart(this.state);
    else this.scene.launch('Modal', this.state);
  }
  
  const mergeAnimalBubble = (): void => {
    this.game.scene.keys[this.state.farm].scrolling.scrollY = 0; 
    SpeechBubble.create(this.game.scene.keys[this.state.farm], this.state.lang.taskHelp_2, 1);
    this.scene.stop('Modal');
  }
  
  const openShopBoosters = (): void => {
    const modal: Imodal = { type: 2, shopType: 4 };
    this.state.modal = modal;
    if (this.scene.isActive('Modal')) this.scene.restart(this.state);
    else this.scene.launch('Modal', this.state);
  }
  
  const takeAnimalBubble = (): void => {
    this.game.scene.keys[this.state.farm].scrolling.scrollY = 0; 
    SpeechBubble.create(this.game.scene.keys[this.state.farm], this.state.lang.taskHelp_4, 1);
    this.scene.stop('Modal');
  }
  
  const openMerg = (): void => {
    const merg: Territory = farmTerritories.find(el => (el.territoryType === 4));
    openTerritoryWindow(merg);
  }
  
  const findTerritoryToImproveFromType = (type: number): Territory => {
    let territory: Territory;
    for (let i = 1; i < 20; i++) {
      territory = farmTerritories.find(el => (el.territoryType === type) && el.improve === task.state - i);
      if (territory) break;
    }
    return territory
  }  

  const openPastureOrSpeechBuble = (): void => {
    this.state.territory = undefined;
    const territory = findTerritoryToImproveFromType(2);
    if (territory) openTerritoryWindow(territory);
    else {
      this.scene.stop('Modal');
      SpeechBubble.create(barsScene, this.state.lang.taskHelp_8, 3);
    }
  }
  
  const openDrinkerOrSpeechBuble = (): void => {
    this.state.territory = undefined;
    const territory = findTerritoryToImproveFromType(3);
    if (territory) openTerritoryWindow(territory);
    else {
      this.scene.stop('Modal');
      SpeechBubble.create(barsScene, this.state.lang.taskHelp_9, 3);
    }
  }
  
  const openStorageToImproveOrSpeechBuble = (): void => {
    this.state.territory = undefined;
    const territory = findTerritoryToImproveFromType(5);
    if (territory) openTerritoryWindow(territory);
    else {
      this.scene.stop('Modal');
      SpeechBubble.create(barsScene, this.state.lang.taskHelp_17, 3);
    }
  }
  
  const openNotFreeStorageOrSpeechBubble = (): void => {
    let storage: Territory = farmTerritories.find(el => (el.territoryType === 5) && el.money > 0);
    this.state.territory = undefined;
    if (storage) openTerritoryWindow(storage);
    else {
      this.scene.stop('Modal');
      SpeechBubble.create(barsScene, this.state.lang.taskHelp_6, 3);
    }
  }
  
  const openStorageOrSpeechBuble = (): void => {
    let storage: Territory = farmTerritories.find(el => (el.territoryType === 5));
    this.state.territory = undefined;
    if (storage) openTerritoryWindow(storage); 
    else {
      this.scene.stop('Modal');
      SpeechBubble.create(barsScene, this.state.lang.taskHelp_20, 3);
    }
  }
  
  const openFactory = (): void => {
    let factory: Territory = farmTerritories.find(el => (el.territoryType === 8));
    this.state.territory = factory;
    if (factory) {
      const modal: Imodal = { type: 13 };
      this.state.modal = modal;
      if (this.scene.isActive('Modal')) this.scene.restart(this.state);
      else this.scene.launch('Modal', this.state);
    }; 
  }

  const openImproveFactory = (): void => {
    let factory: Territory = farmTerritories.find(el => (el.territoryType === 8));
    this.state.territory = factory;
    if (factory) this.game.scene.keys[this.state.farm].showImproveFactory();
  }
  
  const findUnlockTerritoryForBuy = (): Territory => {
    let settings: IterritoriesPrice[] = this.state[`${this.state.farm.toLowerCase()}Settings`][`territories${this.state.farm}Price`];
    let unlockTerritories: IterritoriesPrice[] = settings.filter(el => el.unlock <= this.state[`user${this.state.farm}`].part);
    for (const territoryPrice of unlockTerritories) {
      let findTerr = farmTerritories.find(el => (el.territoryType === 0) && el.block === territoryPrice.block && el.position === territoryPrice.position && el.cooldown <= 0);
      if (findTerr) return findTerr;
    }
  }

  const openBuyTerritoryWindowForTask = (forced: boolean = false): void => {
    if (task.state === 1 || task.state === 0 || forced) {
      const territory = findUnlockTerritoryForBuy();
      if (territory) openTerritoryWindow(territory);
      else {
        this.scene.stop('Modal');
        SpeechBubble.create(barsScene, this.state.lang.taskHelp_5, 3);
      }
    }
    if (task.state === 2 || task.state === 5 ) {
      const territory = farmTerritories.find(el => el.territoryType === 1);
      if (territory) openTerritoryWindow(territory);
      else {
        const unlockTerritory = findUnlockTerritoryForBuy();
        if (unlockTerritory) openTerritoryWindow(unlockTerritory);
        else {
          this.scene.stop('Modal');
          SpeechBubble.create(barsScene, this.state.lang[`taskHelp_5_${task.state}`], 3);
        }
      }
    };

    if (this.state.userCow.part < 3 && task.state === 8) {
      const task: Itasks = this.state.cowTasks.find(el => el.id === 138);
      const territory = farmTerritories.find(el => el.block === 3 && el.position === 1);
      if (task?.done === 1 && task?.got_awarded === 1 && territory.cooldown <= 0) {
        openTerritoryWindow(territory)
      } else if (territory.cooldown > 0) {
        this.scene.stop('Modal');
        SpeechBubble.create(barsScene, this.state.lang.taskHelp_5, 3);
      } else {
        this.scene.stop('Modal');
        SpeechBubble.create(this.game.scene.keys[`${this.state.farm}Bars`], this.state.lang.doneFirstTask, 3);
      } 
    }
  }

  const openShopCoins = (): void => {
    const modal: Imodal = { type: 2, shopType: 2 };
    this.state.modal = modal;
    if (this.scene.isActive('Modal')) this.scene.restart(this.state);
    else this.scene.launch('Modal', this.state);
  };

  const openTerritoryToImprove = (): void => {
    let territory = farmTerritories.find(el =>
      (el.territoryType === 5 || el.territoryType === 3 || el.territoryType === 2) && el.improve < this.state[`user${this.state.farm}`].part
    )
    if (territory) openTerritoryWindow(territory);
    else {
      territory = farmTerritories.find(el => el.territoryType === 1);
      if (territory && territory.cooldown === 0) openTerritoryWindow(territory);
      else openBuyTerritoryWindowForTask(true);
    }
  }

  switch (task.type) {
    case TaskType['BUY_ANIMAL']: openShopAnimal(); break;
    case TaskType['MERGE_ANIMAL']: mergeAnimalBubble(); break;
    case TaskType['TAKE_COLLECTOR']: openShopBoosters(); break;
    case TaskType['GET_ANIMAL']: takeAnimalBubble(); break;
    case TaskType['BUY_TERRITORY']: openBuyTerritoryWindowForTask(); break;
    case TaskType['COLLECT_MONEY']: openNotFreeStorageOrSpeechBubble(); break;
    case TaskType['IMPROVE_FAIR']: openMerg(); break;
    case TaskType['IMPROVE_PASTURE']: openPastureOrSpeechBuble(); break;
    case TaskType['IMPROVE_WATER']: openDrinkerOrSpeechBuble(); break;
    case TaskType['SAVE_PROGRESS']: openRegisterWindow(); break;
    case TaskType['HAND_COLLECT']: 
      SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang[`taskHelp${this.state.farm}_11`], 3);
      break;
    case TaskType['CREATE_CLAN']: break;
    case TaskType['ANIMAL_ON_FARM']: openShopAnimal(); break;
    case TaskType['SPEND_DIAMONDS']: openShopBoosters(); break;
    case TaskType['ADD_EMAIL']: 
      this.game.scene.keys['Sheep'].openEmailWindow(); // задание на почту
      break;
    case TaskType['IMPROVE_REPOSITORY']: openStorageToImproveOrSpeechBuble(); break;
    case TaskType['TAKE_DIAMOND_ANIMAL']:
      this.game.scene.keys[this.state.farm].scrolling.scrollY = 0;
      this.game.scene.keys[this.state.farm][`takeDiamond${this.state.farm}`]();
      break;
    case TaskType['COLLECT_DIAMONDS_FROM_ANIMAL']: 
      SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang[`taskHelp${this.state.farm}_19`], 3);
      break;
    case TaskType['SELL_RESOURCE']: 
      if (this.state.farm !== 'Cow') openStorageOrSpeechBuble();
      else openFactory();
      break;
    case TaskType['TAKE_FEED_BOOST']: openShopBoosters(); break;
    case TaskType['TAKE_HERD_BOOST']: openShopBoosters(); break;
    case TaskType['IMPROVE_COLLECTOR']: 
      this.game.scene.keys[this.state.farm].showImproveCollector();
      break;
    case TaskType['IMPROVE_FACTORY']: openImproveFactory(); break;
    case TaskType['TAKE_ANIMAL_FROM_HERD']: openShopBoosters(); break;
    case TaskType['SAVE_MILK']: 
      SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang.taskHelp_26, 3);
      break;
    case 27:
      openTerritoryToImprove()
      break;
    case 28:
      openShopCoins()
      break;
    default: 
      break;
  }
}

function getNewClanTasks(state: Istate): IclanTask[] {
  const tasks: IclanTask[] = [];
  const MAX_COUNT: number = 4;
  let count: number = 0;
  const shuffledTasks: IclanTask[] = Phaser.Utils.Array.Shuffle(clanTasks);
  shuffledTasks.forEach(el => {
    if (count < MAX_COUNT) {
      if (tasks.some(task => task.type !== el.type) || tasks.length <= 0) {
        if (el.type !== 14 && el.type !== 16 && el.type !== 17) {
          const cloned = Phaser.Utils.Objects.Clone(el) as IclanTask;
          tasks.push(cloned);
          count += 1;
        } else {
          if (checkAvailabilityOfTasks(state, el)) {
            const cloned = Phaser.Utils.Objects.Clone(el) as IclanTask;
            tasks.push(cloned);
            count += 1;
          }
        }
      }
    }
  });
  return tasks;
}

function checkAvailabilityOfTasks(state: Istate, task: IclanTask): boolean {
  if (task.type === 14) {
    let count: number = 0
    count += state.sheepTerritories.filter(el => el.type === 0 && el.cooldown < 0).length;
    count += state.chickenTerritories.filter(el => el.type === 0 && el.cooldown < 0).length;
    count += state.cowTerritories.filter(el => el.type === 0 && el.cooldown < 0).length;
    if (state.unicornTerritories) count += state.unicornTerritories.filter(el => el.type === 0).length;
    return count >= task.count;
  } else if (task.type === 16) {
    let count: number = 0;
    count += state.sheepTasks.filter(el => el.part >= state.userSheep.part && !Boolean(el.done)).length;
    count += state.chickenTasks.filter(el => el.part >= state.userChicken.part && !Boolean(el.done)).length;
    count += state.cowTasks.filter(el => el.part >= state.userCow.part && !Boolean(el.done)).length;
    return count >= task.count;
  } else if (task.type === 17) {
    let count: number = 0;
    count += (state.sheepSettings.sheepParts.length - state.userSheep.part);
    count += (state.chickenSettings.chickenParts.length - state.userChicken.part);
    count += (state.cowSettings.cowParts.length - state.userCow.part);
    return count >= task.count;
  }
  return false;
}

function tryClanTask(type: number, state: number = 0, count: number = 1, currentProgress?: number): void {
  if (!this.state.clan) return;
  let tasks: IclanTask[] = this.state.user.clanTasks;
  let task: IclanTask = tasks?.find((data: IclanTask) => data.type === type);
  if (!currentProgress && !task?.done &&
    task?.progress < task?.count &&
    (task?.state <= state || task?.state === 0)) {
    task.progress += count;
    if (task.progress >= task.count) {
      task.done = true;
      this.state.amplitude.logAmplitudeEvent('clan_task_done', {
        clan_task_done: task.id,
      });
    }
  } else if (!task?.done && currentProgress) {
    task.progress = currentProgress;
    if (task.progress >= task.count) {
      task.done = true;
      this.state.amplitude.logAmplitudeEvent('clan_task_done', {
        clan_task_done: task.id,
      });
    }
  }
}


export {
  partTasks,
  tryTask,
  getTaskData,
  checkAnimalTask,
  checkDoneTasks,
  clickTaskBoard,
  getNewClanTasks,
  tryClanTask,
}
