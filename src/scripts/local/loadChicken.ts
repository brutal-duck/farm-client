import { general, chickenSettings } from './settings';
import territories from './chickenTerritories';
import collectorSettings from './chickenCollector';
import { userData, userChicken } from './usersData';
import tasks from '../tasks';
import progress from './progress';
import LocalStorage from './../libs/LocalStorage';

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
  if (LocalStorage.get('dailyAwards')) this.state.dailyAwards = JSON.parse(LocalStorage.get('dailyAwards'));

  if (LocalStorage.get('chicken')) this.state.chicken = JSON.parse(LocalStorage.get('chicken'));
  if (LocalStorage.get('chickenEggs')) this.state.chickenEggs = JSON.parse(LocalStorage.get('chickenEggs'));

  if (LocalStorage.get('chickenTerritories')) this.state.chickenTerritories = JSON.parse(LocalStorage.get('chickenTerritories'));
  else this.state.chickenTerritories = territories;

  if (LocalStorage.get('user')) this.state.user = JSON.parse(LocalStorage.get('user'));
  else this.state.user = userData;
  
  if (counter > 0) this.state.user.counter = counter;

  if (LocalStorage.get('userChicken')) this.state.userChicken = JSON.parse(LocalStorage.get('userChicken'));
  else this.state.userChicken = userChicken;

  if (LocalStorage.get('chickenTasks')) this.state.chickenTasks = JSON.parse(LocalStorage.get('chickenTasks'));
  else {

    let chickenTasks: Itasks[] = [];
    for (let i in tasks) if (tasks[i].farm === 2) chickenTasks.push(tasks[i]);
    this.state.chickenTasks = chickenTasks;

  }

  if (LocalStorage.get('chickenTime')) {

    let time: number = Math.round(new Date().getTime() / 1000);
    this.state.offlineTime = time - Number(LocalStorage.get('chickenTime'));

  } else this.state.offlineTime = 0;

  this.userReady = true;

}

export default loadChicken;
