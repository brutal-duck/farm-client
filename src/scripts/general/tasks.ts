import AllTasks from '../tasks';
import SpeechBubble from '../components/animations/SpeechBuble';

// список заданий текущей главы
function partTasks(): Itasks[] {

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


// попытка выполнения задания
function tryTask(type: number, state: number, count: number = 1): void {

  let part: number;

  if (this.state.farm === 'Sheep') part = this.state.userSheep.part;
  else if (this.state.farm === 'Chicken') part = this.state.userChicken.part;
  else if (this.state.farm === 'Cow') part = this.state.userCow.part;

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

    }

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

  } else if (this.state.farm === 'Cow') {

    animals = this.cow.children.entries;
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
        task.progress = count;
      }
      
    } else if (task?.count === 0) {
  
      let count: number = 0;
  
      for (let i: number = 0; i < settings.length; i++) {
  
        for (let j = 0; j < animals.length; j++) {
  
          if (settings[i].breed === animals[j].type) {
            console.log(animals[j].type)
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
      
    }
  } else {
    let tasks: Itasks[] = this.partTasks();
    let task: Itasks = tasks.find((data: Itasks) => data.type === 14);
    console.log(task)
    if (task?.state === 0 && task?.count > 0 && task?.done === 0) {
  
      let count: number = animals.length;
      task.progress = count;
  
      if (task.count <= count) {
        task.done = 1;
        task.progress = count;
      }
      
    } else if (task?.count === 0) {
  
      let count: number = 0;
  
      for (let i: number = 0; i < settings.length; i++) {
  
        for (let j = 0; j < animals.length; j++) {
  
          if (settings[i].breed === animals[j].animalType) {
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
  
    } else if (task?.state > 0 && task?.count > 0) {
  
      let count: number = 0;
      for (let i in animals) {
  
        let chicken = animals[i];
        if (task.state === chicken.animalType) count++
  
      }
  
      task.progress = count;
  
      if (task.count <= count) {
        task.progress = count;
        task.done = 1;
      }
      
    }
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
  this.game.scene.keys[this.state.farm + 'Bars'].currentPartProgress();

}

function clickTaskBoard(task: Itasks): void {
  const openTerritoryWindow = (territory: any): void => {
    this.state.territory = territory;
    const modal: Imodal = {
      type: 1,
      sysType: 2
    }
    this.state.modal = modal;
    this.scene.manager.keys[this.state.farm].scene.launch('Modal', this.state);
  }
  
  const openRegisterWindow = (): void => {
    const modal: Imodal = {
      type: 1,
      sysType: 15
    }
    this.state.modal = modal;
    this.scene.manager.keys[this.state.farm].scene.launch('Modal', this.state);
  }
  
  const openShopAnimal = (): void => {
    const modal: Imodal = {
      type: 2,
      shopType: 3
    }
    this.state.modal = modal;
    this.scene.manager.keys[this.state.farm].scene.launch('Modal', this.state);
  }
  
  const mergeAnimalBubble = (): void => {
    this.game.scene.keys[this.state.farm].scrolling.scrollY = 0; 
    SpeechBubble.create(this.game.scene.keys[this.state.farm], this.state.lang.taskHelp_2, 1);
  }
  
  const openShopBoosters = (): void => {
    const modal: Imodal = {
      type: 2,
      shopType: 4
    }
    this.state.modal = modal;
    this.scene.manager.keys[this.state.farm].scene.launch('Modal', this.state);
  }
  
  const takeAnimalBubble = (): void => {
    this.game.scene.keys[this.state.farm].scrolling.scrollY = 0; 
    SpeechBubble.create(this.game.scene.keys[this.state.farm], this.state.lang.taskHelp_4, 1);
  }
  
  const openMerg = (): void => {
    const merg: any = this.game.scene.keys[this.state.farm].territories.children.entries.find(el => el.type === 4);
    openTerritoryWindow(merg);
  }
  
  const openPastureOrSpeechBuble = (): void => {
    this.state.territory = undefined;
    let territory: any;
    for (let i = 1; i < 4; i++) {
      territory = this.game.scene.keys[this.state.farm].territories.children.entries.find(el => el.type === 2 && el.improve === task.state - i);
      if (territory) break;
    }
  
    if (territory) openTerritoryWindow(territory);
    else SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang.taskHelp_8, 3);
    
    
  }
  
  const openDrinkerOrSpeechBuble = (): void => {
    this.state.territory = undefined;
    let territory: any;
    for (let i = 1; i < 4; i++) {
      territory = this.game.scene.keys[this.state.farm].territories.children.entries.find(el => el.type === 3 && el.improve === task.state - i);
      if (territory) break;
    }
    if (territory) openTerritoryWindow(territory);
    else SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang.taskHelp_9, 3);
  }
  
  const openStorageToImproveOrSpeechBuble = (): void => {
    this.state.territory = undefined;
    let territory: any;
    for (let i = 1; i < 4; i++) {
      territory = this.game.scene.keys[this.state.farm].territories.children.entries.find(el => el.type === 5 && el.improve === task.state - i);
      if (territory) break;
    }
    if (territory) openTerritoryWindow(territory);
    else SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang.taskHelp_9, 3);
  }
  
  const openNotFreeStorageOrSpeechBubble = (): void => {
    let storage: any = this.game.scene.keys[this.state.farm].territories.children.entries.find(el => el.type === 5 && el.money > 0);
    this.state.territory = undefined;
    if (storage) openTerritoryWindow(storage);
    else SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang.taskHelp_6, 3);
  }
  
  const openStorageOrSpeechBuble = (): void => {
    let storage: any = this.game.scene.keys[this.state.farm].territories.children.entries.find(el => el.type === 5);
    this.state.territory = undefined;
    if (storage) openTerritoryWindow(storage); 
    else SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang.taskHelp_6, 3);
  }
  
  const findUnlockTerritoryForBuy = (): any => {
    let farmTerritories: any = this.game.scene.keys[this.state.farm].territories.children.entries;
    let settings: IterritoriesPrice[] = this.state[`${this.state.farm.toLowerCase()}Settings`][`territories${this.state.farm}Price`];
    let unlockTerritories: IterritoriesPrice[] = settings.filter(el => el.unlock <= this.state[`user${this.state.farm}`].part);
    let terr: any;
    unlockTerritories.forEach((territory: IterritoriesPrice) => {
      let findTerr = farmTerritories.find(el => el.type === 0 && el.block === territory.block && el.position === territory.position);
      if (findTerr) terr = findTerr;
    });
    return terr;
  }

  const openBuyTerritoryWindowForTask = (): void => {
  
    if (task.state === 1 || task.state === 0) {
      const territory = findUnlockTerritoryForBuy();
      openTerritoryWindow(territory);
    }
    if (task.state === 2 || task.state === 5) {
      let territory: any;
      territory = this.game.scene.keys[this.state.farm].territories.children.entries.find(el => el.type === 1);
      if (territory) openTerritoryWindow(territory);
      else {
        territory = findUnlockTerritoryForBuy();
        if (territory) openTerritoryWindow(territory);
        else SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang[`taskHelp_5_${task.state}`], 3);
        
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
      SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang[`taskHelp${this.state.farm}_14`], 3);
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
      this.game.scene.keys[this.state.farm][`takeDiamond${this.state.farm}`]();
      break;
    case 19: 
      SpeechBubble.create(this.game.scene.keys[this.state.farm + 'Bars'], this.state.lang[`taskHelp${this.state.farm}_19`], 3);
      break;
    case 20: 
      openStorageOrSpeechBuble();
      break;
  }
}


export {
  partTasks,
  tryTask,
  getTaskData,
  checkAnimalTask,
  checkDoneTasks,
  clickTaskBoard
}
