import { general, chickenSettings } from './settings';
import territories from './chickenTerritories';
import collectorSettings from './chickenCollector';
import { userData, userChicken } from './usersData';
import tasks from '../tasks';
import progress from './progress';

function loadChicken(counter: number = 0): void {
  
  this.state.chickenCollectorSettings = collectorSettings;
  this.state.autoSaveSpeed = general.autoSaveSpeed;
  this.state.maxMerginTime = general.maxMerginTime;
  this.state.packages = general.packages;
  this.state.chickenSettings = chickenSettings;
  this.state.progress = progress();
  this.state.chicken = [];
  this.state.chickenEggs = [];
  this.state.farm = 'Chicken';
  this.state.daily = false;
  this.state.newbieTime = 0;
  this.state.timeToBoost = 0;
  if (localStorage.dailyAwards) this.state.dailyAwards = JSON.parse(localStorage.dailyAwards);

  if (localStorage.chicken) this.state.chicken = JSON.parse(localStorage.chicken);
  if (localStorage.chickenEggs) this.state.chickenEggs = JSON.parse(localStorage.chickenEggs);

  if (localStorage.chickenTerritories) this.state.chickenTerritories = JSON.parse(localStorage.chickenTerritories);
  else this.state.chickenTerritories = territories;

  if (localStorage.user) this.state.user = JSON.parse(localStorage.user);
  else this.state.user = userData;
  
  if (counter > 0) this.state.user.counter = counter;

  if (localStorage.userChicken) this.state.userChicken = JSON.parse(localStorage.userChicken);
  else this.state.userChicken = userChicken;

  if (localStorage.chickenTasks) this.state.chickenTasks = JSON.parse(localStorage.chickenTasks);
  else {

    let chickenTasks: Itasks[] = [];
    for (let i in tasks) if (tasks[i].farm === 2) chickenTasks.push(tasks[i]);
    this.state.chickenTasks = chickenTasks;

  }

  if (localStorage.chickenTime) {

    let time: number = Math.round(new Date().getTime() / 1000);
    this.state.offlineTime = time - Number(localStorage.chickenTime);

  } else this.state.offlineTime = 0;

  this.userReady = true;

}

export default loadChicken;
