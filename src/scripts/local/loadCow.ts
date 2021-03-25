import { general, cowSettings } from './settings';
import territories from './cowTerritories';
import collectorSettings from './cowCollector';
import { userData, userCow } from './usersData';
import tasks from '../tasks';
import progress from './progress';

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
  if (localStorage.dailyAwards) this.state.dailyAwards = JSON.parse(localStorage.dailyAwards);

  if (localStorage.cow) this.state.cow = JSON.parse(localStorage.cow);
  if (localStorage.cowMilk) this.state.cowMilk = JSON.parse(localStorage.cowMilk);

  if (localStorage.cowTerritories) this.state.cowTerritories = JSON.parse(localStorage.cowTerritories);
  else this.state.cowTerritories = territories;

  if (localStorage.user) this.state.user = JSON.parse(localStorage.user);
  else this.state.user = userData;
  
  if (counter > 0) this.state.user.counter = counter;

  if (localStorage.userCow) this.state.userCow = JSON.parse(localStorage.userCow);
  else this.state.userCow = userCow;

  if (localStorage.cowTasks) this.state.cowTasks = JSON.parse(localStorage.cowTasks);
  else {

    let cowTasks: Itasks[] = [];
    for (let i in tasks) if (tasks[i].farm === 2) cowTasks.push(tasks[i]);
    this.state.cowTasks = cowTasks;

  }

  if (localStorage.cowTime) {

    let time: number = Math.round(new Date().getTime() / 1000);
    this.state.offlineTime = time - Number(localStorage.cowTime);

  } else this.state.offlineTime = 0;

  this.userReady = true;

}

export default loadCow;
