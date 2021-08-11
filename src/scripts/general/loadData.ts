import axios from 'axios';

import AllTasks from '../tasks';
import basicSheepTerritories from '../local/sheepTerritories';
import basicChickenTerritories from '../local/chickenTerritories';
import basicCowTerritories from '../local/cowTerritories';
import basicUnicornCollector from '../local/unicornCollector';
import { unicornSettings, sheepSettings, chickenSettings, cowSettings, general } from '../local/settings';
import { userCow, userData, userSheep, userChicken } from '../local/usersData';
import sheepCollectorSettings from '../local/sheepCollector';
import chickenCollectorSettings from '../local/chickenCollector';
import cowCollectorSettings from '../local/cowCollector';
import getProgress from '../local/progress';
import ErrorWindow from './../components/Web/ErrorWindow';
const basicUserCow = userCow;
const basicUserSheep = userSheep;
const basicUserChicken = userChicken;

const checkUserName = (state: Istate) => {
  const { user, clan, platform, name, avatar } = state;

  const clanUser = clan.users.find(el => el.id === user.id);

  let newName: string = user.login;
  if (platform !== 'web' && platform !== 'android') newName = name;
  const newAvatar: string = Number(user.avatar) > 0 ? user.avatar : avatar;

  if (clanUser.name !== newName || clanUser.avatar !== newAvatar) {
    const data = {
      id: user.id,
      hash: user.hash,
      counter: user.counter,
      name: newName,
      avatar: newAvatar,
    };
    axios.post(process.env.API + '/updateClanUser', data).then(res => {
      if (!res.data.error) {
        clanUser.name = newName;
        clanUser.avatar = newAvatar;
      }
    });
  }
}


const validateTerritories = (territories: Iterritories[], basicTerritories: Iterritories[]): Iterritories[] => {
  const maxTerritoryType: number = 8;
  for (let i: number = 0; i < territories.length; i += 1) {
    const territory: Iterritories = basicTerritories.find((data: Iterritories) => territories[i].position === data.position && territories[i].block === data.block);
    if (territory) {
      if (!(territory.type >= 0 && territory.type <= maxTerritoryType
        && territory.money >= 0
        && territory.volume >= 0
        && territory.improve > 0)) {
        territories[i] = basicTerritories[i];  
      }
    } else {
      territories[i] = basicTerritories[i];
    }
  }

  if (territories.length === 0) {
    for (const territory of basicTerritories) {
      territories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type,
        volume: territory.volume,
        improve: territory.improve,
        money: territory.money, 
        cooldown: territory.cooldown,
        boughtType: territory.boughtType,
      });
    }
  }
  return territories;
}

const validateBoosts = (boosts: Iboosts): Iboosts => {
  if (boosts) {
    const sheepBoostsBasic: IfarmBosts = userData.boosts.sheep;
    const chickenBoostsBasic: IfarmBosts = userData.boosts.chicken;
    const cowBoostsBasic: IfarmBosts = userData.boosts.cow;
    const fortuneBoostsBasic: number = userData.boosts.fortune;
  
    for (const key in sheepBoostsBasic) {
      if (!boosts.sheep[key]) boosts.sheep[key] = sheepBoostsBasic[key];
    }
    for (const key in chickenBoostsBasic) {
      if (!boosts.chicken[key]) boosts.chicken[key] = chickenBoostsBasic[key];
    }
    for (const key in cowBoostsBasic) {
      if (!boosts.cow[key]) boosts.cow[key] = cowBoostsBasic[key];
    }
    if (!boosts.fortune) boosts.fortune = fortuneBoostsBasic;
    return boosts;
  }
  return userData.boosts;
}

const setTaskStatus = (farmId: number, resTask: any[]): Itasks[] => {
  const updatedTasks: Itasks[] = [];
  for (const task of AllTasks) if (task.farm === farmId) updatedTasks.push(task);
  for (const usersTask of resTask) {
    const task = AllTasks.find((task: Itasks) => task.id === usersTask.task_id);
    if (task) {
      task.done = usersTask.done;
      task.got_awarded = usersTask.got_awarded;
      task.progress = usersTask.progress;
    }
  }
  return updatedTasks;
}

const updateImproveTerritories = (territories: Iterritories[]): Iterritories[]  => {
  return territories.map(el => {
    if (el.improve === 2 && (el.type === 2 || el.type === 3 || el.type === 5)) {
      el.improve = 6 
    } else if (el.improve === 3 &&  (el.type === 2 || el.type === 3 || el.type === 5)) {
      el.improve = 13
    } else if (el.improve === 4 && (el.type === 2 || el.type === 3 || el.type === 5)) {
      el.improve = 20
    } else if (el.improve === 1 && (el.type === 2 || el.type === 3 || el.type === 5)) el.improve = 1;
    return el;
  });
}


function checkDoneTasks(state: Istate): void {
  const sheepTasks: Itasks[] = AllTasks.filter(el => el.part === state.userSheep.part && el.farm === 1);

  const chickenTasks: Itasks[] = AllTasks.filter(el => el.part === state.userChicken.part && el.farm === 2);

  for (const task of sheepTasks) {
    // задания на улучшение земель
    if (task.type === 8
      || task.type === 9
      || task.type === 17
      || task.type === 24) {

      let count: number = 0;
      let type: number;

      if (task.type === 8) type = 2;
      else if (task.type === 9) type = 3;
      else if (task.type === 17) type = 5;
      else if (task.type === 24) type = 8

      for (const territory of state.sheepTerritories) {
        if (type === territory.type &&
          territory.improve >= task.state) count++
      }

      if (count >= task.count) {
        task.progress = task.count;
        task.done = 1;
      } else {
        task.progress = count;
      }
    }
  }
  for (const task of chickenTasks) {
    // задания на улучшение земель
    if (task.type === 8
      || task.type === 9
      || task.type === 17
      || task.type === 24) {

      let count: number = 0;
      let type: number;

      if (task.type === 8) type = 2;
      else if (task.type === 9) type = 3;
      else if (task.type === 17) type = 5;
      else if (task.type === 24) type = 8

      for (const territory of state.chickenTerritories) {
        if (type === territory.type &&
          territory.improve >= task.state) count++
      }

      if (count >= task.count) {
        task.progress = task.count;
        task.done = 1;
      } else {
        task.progress = count;
      }
    }
  }
}

export default function loadData(response: any): void {
  if (this.state.build < response.data.user.build) {
    this.children.destroy();
    new ErrorWindow(this);
    return;
  }

  if (this.state.farm === 'Sheep') this.state.offline = response.data.progress.sheepOfflineTime;
  else if (this.state.farm === 'Chicken') this.state.offline = response.data.progress.chickenOfflineTime;
  else if (this.state.farm === 'Cow') this.state.offline = response.data.progress.cowOfflineTime;
  else if (this.state.farm === 'Unicorn') this.state.offline = response.data.progress.eventOfflineTime;
  // общие настройки
  this.state.autoSaveSpeed = general.autoSaveSpeed;
  this.state.maxMerginTime = general.maxMerginTime;
  this.state.herdBoostSpeedAnimal = general.herdBoostSpeedAnimal;
  this.state.herdBoostTime = general.herdBoostTime;
  this.state.herdBoostPrice = general.herdBoostPrice;
  this.state.herdBoostDelay = general.herdBoostDelay;
  this.state.packages = general.packages;

  // общие данные
  this.state.dailyAwards = response.data.user.dailyAwards;
  this.state.newbieTime = response.data.progress.newbieTime;
  this.state.daily = response.data.progress.daily;
  this.state.timeToNewDay = response.data.progress.timeToNewDay;

  this.state.sheepSettings = sheepSettings;
  this.state.chickenSettings = chickenSettings;
  this.state.cowSettings = cowSettings;
  // животные
  const sheep: Isheep[] = [];
  for (let i in response.data.user.sheep) {    
    const lamb = response.data.user.sheep[i];
    sheep.push({
      _id: lamb._id,
      type: lamb.type,
      wool: lamb.wool,
      x: lamb.x,
      y: lamb.y,
      counter: lamb.counter,
      diamond: lamb.diamond,
      vector: lamb.vector
    });
  };

  const chicken: Ichicken[] = [];
  for (let i in response.data.user.chicken) {  
    const chick = response.data.user.chicken[i];
    chicken.push({
      _id: chick._id,
      type: chick.type,
      egg: chick.egg,
      x: chick.x,
      y: chick.y,
      counter: chick.counter,
      diamond: chick.diamond,
      vector: chick.vector
    });
  };

  const cow: Icow[] = [];
  for (let i in response.data.user.cow) {
    const cw = response.data.user.cow[i];
    cow.push({
      _id: cw._id,
      type: cw.type,
      milk: isNaN(cw.milk) || !cw.milk ? 0 : cw.milk,
      x: cw.x,
      y: cw.y,
      counter: cw.counter,
      diamond: cw.diamond,
      vector: cw.vector
    });
  };
  
  this.state.sheep = sheep;
  this.state.chicken = chicken;
  this.state.cow = cow;

  //территории для обычных ферм
  const sheepTerritories: Iterritories[] = [];
  for (const territory of response.data.user.sheep_territories) {
    sheepTerritories.push({
      _id: territory._id,
      block: response.data.user.sheep_territories[0].block === 0 ? territory.block + 1 : territory.block,
      position: territory.position,
      type: territory.type,
      volume: territory.volume,
      improve: territory.improve,
      money: territory.money,
      cooldown: territory.cooldown,
      boughtType: territory.boughtType,
    });
  }

  const chickenTerritories: Iterritories[] = [];
  for (let i in response.data.user.chicken_territories) {
    let territory = response.data.user.chicken_territories[i];
    chickenTerritories.push({
      _id: territory._id,
      block: territory.block,
      position: territory.position,
      type: territory.type,
      volume: territory.volume,
      improve: territory.improve,
      money: territory.money,
      cooldown: territory.cooldown,
      boughtType: territory.boughtType,
    });
  }

  const cowTerritories: Iterritories[] = [];
  for (let i in response.data.user.cow_territories) {
    const territory = response.data.user.cow_territories[i];
    cowTerritories.push({
      _id: territory._id,
      block: territory.block,
      position: territory.position,
      type: territory.type,
      volume: territory.volume,
      improve: territory.improve,
      money: territory.money,
      cooldown: territory.cooldown,
      boughtType: territory.boughtType,
    });
  }

  if (sheepTerritories.length === 0) response.data.user.money = basicUserSheep.money;
  if (chickenTerritories.length === 0) response.data.user.chicken_money = basicUserCow.money;
  if (cowTerritories.length === 0) response.data.user.cow_money = basicUserChicken.money;

  this.state.sheepTerritories = validateTerritories(sheepTerritories, basicSheepTerritories);
  this.state.chickenTerritories = validateTerritories(chickenTerritories, basicChickenTerritories);
  this.state.cowTerritories = validateTerritories(cowTerritories, basicCowTerritories);

  // яйца
  const chickenEggs: IchickenEgg[] = [];
  for (let i in response.data.user.chicken_eggs) {
    const egg = response.data.user.chicken_eggs[i];
    chickenEggs.push({
      _id: egg._id,
      x: egg.x > 0 && egg.x < 720 ? egg.x : Phaser.Math.Between(500, 700),
      y: egg.y > 480 && egg.y < 2160 ? egg.y : Phaser.Math.Between(500, 700),
      type: egg.type
    });
  }
  this.state.chickenEggs = chickenEggs;
  const boosts: Iboosts = validateBoosts(response.data.user.boosts);
  const user: Iuser = {
    diamonds: response.data.user.diamonds,
    id: response.data.user._id,
    clanId: response.data.user.clanId,
    xp: response.data.user.xp,
    hash: response.data.user.hash,
    login: response.data.user.login,
    counter: response.data.user.counter,
    mail: response.data.user.mail,
    level: response.data.user.level,
    additionalTutorial: response.data.user.additional_tutorial,
    takenReward: response.data.user.taken_reward,
    status: response.data.user.status,
    statuses: response.data.user.statuses,
    starterpack: response.data.user.starterpack,
    boosts: boosts,
    test: response.data.user.test,
    takenFreeDiamonds: response.data.user.takenFreeDiamonds,
    takenSocialAward: response.data.user.takenSocialAward,
    messages: response.data.user.messages,
    personalMessages: response.data.user.personalMessages,
    avatar: response.data.user.avatar,
    fortuneTutorial: false,
  };
  this.state.user = user;

  this.state.clan = response.data.clan;
  if (this.state.name === '' && this.state.platform === 'ya') {
    this.state.name = `yandex_${user.id.substr(0, 4)}`;
  }
  
  if (response.data.user.chicken_part === 0 && this.state.farm === 'Chicken') response.data.user.chicken_part = 1;
  if (response.data.user.cow_part === 0 && this.state.farm === 'Cow') response.data.user.cow_part = 1;

  const userSheep: IuserSheep = {
    money: response.data.user.money,
    fair: response.data.user.sheep_fair,
    part: response.data.user.sheep_part,
    countSheep: response.data.user.count_sheep,
    collector: response.data.user.shaver_time,
    collectorLevel: response.data.user.sheepCollectorLevel,
    collectorTakenTime: response.data.user.shaver_time,
    diamondAnimalTime: response.data.user.diamonds_sheep_time,
    tutorial: response.data.user.tutor,
    autosaveCounter: response.data.user.sheepSaveCounter,
    diamondAnimalAd: response.data.user.diamonds_sheep_ad,
    takenHerdBoost: response.data.user.takenHerdBoostSheep,
    feedBoostTime: response.data.user.feedBoostTimeSheep,
  }

  const userChicken: IuserChicken = {
    money: response.data.user.chicken_money,
    fair: response.data.user.chicken_fair,
    part: response.data.user.chicken_part,
    countChicken: response.data.user.count_chicken,
    collector: response.data.user.chicken_collector,
    collectorLevel: response.data.user.chickenCollectorLevel,
    collectorTakenTime: response.data.user.chicken_collector,
    diamondAnimalTime: response.data.user.diamonds_chicken_time,
    tutorial: response.data.user.chicken_tutor,
    autosaveCounter: response.data.user.chickenSaveCounter,
    diamondAnimalAd: response.data.user.diamonds_chicken_ad,
    takenHerdBoost: response.data.user.takenHerdBoostChicken,
    feedBoostTime: response.data.user.feedBoostTimeChicken,
  }

  let cowFactory: Ifactory = response.data.user.cowFactory;
  if (!response.data.user.cowFactory) cowFactory = basicUserCow.factory;

  if (!cowFactory.money) cowFactory.money = 0;
  if (!cowFactory.production1Money) cowFactory.production1Money = 0;
  if (!cowFactory.production2Money) cowFactory.production2Money = 0;
  if (!cowFactory.production3Money) cowFactory.production3Money = 0;
  if (!cowFactory.production4Money) cowFactory.production4Money = 0;

  const userCow: IuserCow = {
    money: response.data.user.cow_money,
    fair: response.data.user.cow_fair,
    part: response.data.user.cow_part,
    countCow: response.data.user.count_cow,
    collector: response.data.user.cow_collector,
    collectorLevel: response.data.user.cowCollectorLevel,
    collectorTakenTime: response.data.user.cow_collector,
    diamondAnimalTime: response.data.user.diamonds_cow_time,
    tutorial: response.data.user.cow_tutor,
    autosaveCounter: response.data.user.cowSaveCounter,
    diamondAnimalAd: response.data.user.diamonds_cow_ad,
    takenHerdBoost: response.data.user.takenHerdBoostCow,
    feedBoostTime: response.data.user.feedBoostTimeCow,
    factory: {
      currentProduction: cowFactory.currentProduction,
      productionTimer: cowFactory.productionTimer,
      money: cowFactory.money,
      production1Money: cowFactory.production1Money,
      production2Money: cowFactory.production2Money,
      production3Money: cowFactory.production3Money,
      production4Money: cowFactory.production4Money,
      boostTime: cowFactory.boostTime,
      milkMultiply: 0.2,
      production1Multiply: 0.5,
      production2Multiply: 1,
      production3Multiply: 1.5,
      production4Multiply: 2.5,
    }
  }

  this.state.userSheep = userSheep;
  this.state.userChicken = userChicken;
  this.state.userCow = userCow;

  this.state.sheepTasks = setTaskStatus(1, response.data.user.sheep_tasks);
  this.state.chickenTasks = setTaskStatus(2, response.data.user.chicken_tasks);;
  this.state.cowTasks = setTaskStatus(3, response.data.user.cow_tasks);;

  this.state.sheepCollectorSettings = sheepCollectorSettings;
  this.state.chickenCollectorSettings = chickenCollectorSettings;
  this.state.cowCollectorSettings = cowCollectorSettings;

  const basicProgress: Iprogress = getProgress();
  const progress: Iprogress = {
    sheep: {
      part: response.data.user.sheep_part,
      max: basicProgress.sheep.max,
      open: true,
      price: basicProgress.sheep.price,
      unlock: basicProgress.sheep.unlock,
      donate: basicProgress.sheep.donate,
      collector: response.data.user.shaver_time,
      offlineTime: response.data.progress.sheepOfflineTime,
    },
    chicken: {
      part: response.data.user.chicken_part,
      max: basicProgress.chicken.max,
      open: response.data.user.chicken_part > 0,
      price: basicProgress.chicken.price,
      unlock: basicProgress.chicken.unlock,
      donate: basicProgress.chicken.donate,
      collector: response.data.user.chicken_collector,
      offlineTime: response.data.progress.chickenOfflineTime,
    },
    cow: {
      part: response.data.user.cow_part,
      max: basicProgress.cow.max,
      open: response.data.user.cow_part > 0,
      price: basicProgress.cow.price,
      unlock: basicProgress.cow.unlock,
      donate: basicProgress.cow.donate,
      collector: response.data.user.cow_collector,
      offlineTime: response.data.progress.cowOfflineTime,
    },
    event: {
      startTime: response.data.progress.event.startTime,
      endTime: response.data.progress.event.endTime,
      open: response.data.settings.event.open,
      type: response.data.settings.event.type,
    }
  }
  this.state.progress = progress;
  if (response.data.user.build < 3.9) {
    this.state.sheepTerritories = updateImproveTerritories(this.state.sheepTerritories);
    this.state.chickenTerritories = updateImproveTerritories(this.state.chickenTerritories);
    checkDoneTasks(this.state);
  }
  
  if (
    this.state.progress.event.type === 1 
    && this.state.progress.event.startTime < 0 
    && this.state.progress.event.open
  ) {
    this.state.unicornSettings = unicornSettings;

    const eventAnimals: IeventAnimal[] = []; // IeventAnimal
    for (let i in response.data.event.animals) {
      let animal = response.data.event.animals[i];
      eventAnimals.push({
        _id: animal._id,
        type: animal.type,
        activeAnimal: animal.activeAnimal,
        x: animal.x,
        y: animal.y,
      });
    }

    const eventTerritories: IeventTerritories[] = [];
    for (let i in response.data.event.territories) {
      let territory = response.data.event.territories[i];
      eventTerritories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type
      });
    }

    const eventResources: IeventResource[] = []; // IeventResource
    for (let i in response.data.event.resources) {
      let eventResource = response.data.event.resources[i];
      eventResources.push({
        _id: eventResource._id,
        x: eventResource.x,
        y: eventResource.y,
        type: eventResource.type
      });
    }

    const countAnimal = response.data.event.countAnimal;
    if (countAnimal.length < this.state.unicornSettings.unicornSettings.length) {
      let addCounter: number = this.state.unicornSettings.unicornSettings.length - countAnimal.length;
      for (let i = 0; i < addCounter; i++) {
        countAnimal.push({ counter: 1 });
      }
    }
    const userUnicorn: IuserEvent = {  
      money: response.data.event.money,
      countAnimal: countAnimal,
      collector: response.data.event.collector,
      collectorLevel: response.data.event.collectorLevel,
      collectorTakenTime: response.data.event.collector,
      tutorial: response.data.event.tutorial,
      autosaveCounter: response.data.event.autosaveCounter,
      takenHerdBoost: response.data.event.takenHerdBoost,
      feedBoostTime: response.data.event.feedBoostTime,
      herdBoostAnimals: response.data.event.herdBoostAnimals,
      takenAd: response.data.event.takenAd,
      timeToAd: response.data.event.timeToAd,
      points: response.data.event.points,
      takenAward: response.data.event.takenAward,
    };

    this.state.eventTerritories = eventTerritories;
    this.state.eventAnimals = eventAnimals;
    this.state.eventResources = eventResources; 
    this.state.userUnicorn = userUnicorn;
    this.state.eventCollectorSettings = basicUnicornCollector;
  }
  
  if (
    this.state.progress.event.type === 2 
    && this.state.progress.event.startTime < 0 
    && this.state.progress.event.open
  ) {
    this.state.user.fortuneTutorial = response.data.event;
  }
  if (this.state.user.clanId) {
    console.log(this.state.user.clanId)
    checkUserName(this.state);
  }
  this.userReady = true;
}