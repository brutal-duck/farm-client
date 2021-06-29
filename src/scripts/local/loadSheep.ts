import { general, sheepSettings } from './settings';
import territories from './sheepTerritories';
import collectorSettings from './sheepCollector';
import { userData, userSheep } from './usersData';
import tasks from '../tasks';
import progress from './progress';
import LocalStorage from './../libs/LocalStorage';

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
  this.state.timeToBoost = 0;
  if (LocalStorage.get('dailyAwards')) this.state.dailyAwards = JSON.parse(LocalStorage.get('dailyAwards'));

  if (LocalStorage.get('sheep')) this.state.sheep = JSON.parse(LocalStorage.get('sheep'));

  if (LocalStorage.get('sheepTerritories')) {

    let sheepTerritories: Iterritories[] = [];
    let storageTerritories: Iterritories[] = JSON.parse(LocalStorage.get('sheepTerritories'));

    for (let i in storageTerritories) {

      sheepTerritories.push({
        _id: storageTerritories[i]._id,
        block: storageTerritories[i].block + 1,
        position: storageTerritories[i].position,
        type: storageTerritories[i].type,
        volume: storageTerritories[i].volume,
        improve: storageTerritories[i].improve,
        money: storageTerritories[i].money,
        cooldown: storageTerritories[i].cooldown,
      });

    }

    this.state.sheepTerritories = sheepTerritories;

  } else this.state.sheepTerritories = territories;

  if (LocalStorage.get('user')) this.state.user = JSON.parse(LocalStorage.get('user'));
  else this.state.user = userData;

  if (counter > 0) this.state.user.counter = counter;

  if (LocalStorage.get('userSheep')) this.state.userSheep = JSON.parse(LocalStorage.get('userSheep'));
  else this.state.userSheep = userSheep;

  if (LocalStorage.get('sheepTasks')) this.state.sheepTasks = JSON.parse(LocalStorage.get('sheepTasks'));
  else {

    let sheepTasks: Itasks[] = [];
    for (let i in tasks) if (tasks[i].farm === 1) sheepTasks.push(tasks[i]);
    this.state.sheepTasks = sheepTasks;

  }
  
  if (LocalStorage.get('sheepTime')) {

    let time: number = Math.round(new Date().getTime() / 1000);
    this.state.offlineTime = time - Number(LocalStorage.get('sheepTime'));

  } else this.state.offlineTime = 0;

  this.userReady = true;
  
}

export default loadSheep;
