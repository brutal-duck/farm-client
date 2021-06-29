import { general, cowSettings } from './settings';
import territories from './cowTerritories';
import collectorSettings from './cowCollector';
import { userData, userCow } from './usersData';
import tasks from '../tasks';
import progress from './progress';
import LocalStorage from './../libs/LocalStorage';

function loadCow(counter: number = 0): void {
  
  this.state.cowCollectorSettings = collectorSettings;
  this.state.autoSaveSpeed = general.autoSaveSpeed;
  this.state.maxMerginTime = general.maxMerginTime;
  this.state.packages = general.packages;
  this.state.cowSettings = cowSettings;
  this.state.progress = progress();
  this.state.cow = [];
  this.state.cowMilk = [];
  this.state.farm = 'Cow';
  this.state.daily = false;
  this.state.newbieTime = 0;
  this.state.timeToBoost = 0;
  if (LocalStorage.get('dailyAwards')) this.state.dailyAwards = JSON.parse(LocalStorage.get('dailyAwards'));

  if (LocalStorage.get('cow')) this.state.cow = JSON.parse(LocalStorage.get('cow'));
  if (LocalStorage.get('cowMilk')) this.state.cowMilk = JSON.parse(LocalStorage.get('cowMilk'));

  if (LocalStorage.get('cowTerritories')) this.state.cowTerritories = JSON.parse(LocalStorage.get('cowTerritories'));
  else this.state.cowTerritories = territories;

  if (LocalStorage.get('user')) this.state.user = JSON.parse(LocalStorage.get('user'));
  else this.state.user = userData;
  
  if (counter > 0) this.state.user.counter = counter;

  if (LocalStorage.get('userCow')) this.state.userCow = JSON.parse(LocalStorage.get('userCow'));
  else this.state.userCow = userCow;

  if (LocalStorage.get('cowTasks')) this.state.cowTasks = JSON.parse(LocalStorage.get('cowTasks'));
  else {

    let cowTasks: Itasks[] = [];
    for (let i in tasks) if (tasks[i].farm === 2) cowTasks.push(tasks[i]);
    this.state.cowTasks = cowTasks;

  }

  if (LocalStorage.get('cowTime')) {

    let time: number = Math.round(new Date().getTime() / 1000);
    this.state.offlineTime = time - Number(LocalStorage.get('cowTime'));

  } else this.state.offlineTime = 0;

  this.userReady = true;

}

export default loadCow;
