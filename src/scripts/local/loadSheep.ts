import { general, sheepSettings } from './settings';
import territories from './sheepTerritories';
import collectorSettings from './sheepCollector';
import { userData, userSheep } from './usersData';
import tasks from '../tasks';
import progress from './progress';

function loadSheep(counter: number = 0): void {

  this.state.sheepCollectorSettings = collectorSettings;
  this.state.autoSaveSpeed = general.autoSaveSpeed;
  this.state.maxMerginTime = general.maxMerginTime;
  this.state.packages = general.packages;
  this.state.sheepSettings = sheepSettings;
  this.state.progress = progress();
  this.state.sheep = [];
  this.state.farm = 'Sheep';
  this.state.daily = false;
  this.state.newbieTime = 0;

  if (localStorage.dailyAwards) this.state.dailyAwards = JSON.parse(localStorage.dailyAwards);

  if (localStorage.sheep) this.state.sheep = JSON.parse(localStorage.sheep);

  if (localStorage.sheepTerritories) {

    let sheepTerritories: Iterritories[] = [];
    let storageTerritories: Iterritories[] = JSON.parse(localStorage.sheepTerritories);

    for (let i in storageTerritories) {

      sheepTerritories.push({
        _id: storageTerritories[i]._id,
        block: storageTerritories[i].block + 1,
        position: storageTerritories[i].position,
        type: storageTerritories[i].type,
        volume: storageTerritories[i].volume,
        improve: storageTerritories[i].improve,
        money: storageTerritories[i].money
      });

    }

    this.state.sheepTerritories = sheepTerritories;

  } else this.state.sheepTerritories = territories;

  if (localStorage.user) this.state.user = JSON.parse(localStorage.user);
  else this.state.user = userData;

  if (counter > 0) this.state.user.counter = counter;

  if (localStorage.userSheep) this.state.userSheep = JSON.parse(localStorage.userSheep);
  else this.state.userSheep = userSheep;

  if (localStorage.sheepTasks) this.state.sheepTasks = JSON.parse(localStorage.sheepTasks);
  else {

    let sheepTasks: Itasks[] = [];
    for (let i in tasks) if (tasks[i].farm === 1) sheepTasks.push(tasks[i]);
    this.state.sheepTasks = sheepTasks;

  }
  
  if (localStorage.sheepTime) {

    let time: number = Math.round(new Date().getTime() / 1000);
    this.state.offlineTime = time - Number(localStorage.sheepTime);

  } else this.state.offlineTime = 0;

  this.userReady = true;
  
}

export default loadSheep;
