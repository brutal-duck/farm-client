import axios, { AxiosResponse } from 'axios';

import AllTasks from '../tasks';

import basicUnicornCollector from '../local/unicornCollector';
import { unicornSettings, sheepSettings, chickenSettings, cowSettings, general } from '../local/settings';
import { testSheepSettings, testChickenSettings, testCowSettings, testGeneral } from '../local/test/settings';
import testSheepTasks from '../local/test/sheepTasks';

import { userCow, userSheep, userChicken } from '../local/usersData';
import sheepCollectorSettings from '../local/sheepCollector';
import chickenCollectorSettings from '../local/chickenCollector';
import cowCollectorSettings from '../local/cowCollector';
import getProgress from '../local/progress';
import ErrorWindow from './../components/Web/ErrorWindow';
import { getNewClanTasks } from './tasks';
import DataValidator from './../libs/DataValidator';
import Achievement from './../components/Utils/Achievement';
import sheepPartSettings from '../local/test/sheepPartSettings';
import chickenPartSettings from '../local/test/chickenPartSettings';
import Utils from './../libs/Utils';
import testChickenTasks from './../local/test/chickenTasks';
import testCowTasks from './../local/test/cowTasks';
import cowPartSettings from './../local/test/cowPartSettings';
const basicUserCow = userCow;
const basicUserSheep = userSheep;
const basicUserChicken = userChicken;

const checkUserName = (state: Istate) => {
  const { user, clan, platform, name, avatar } = state;

  const clanUser = clan?.users.find(el => el.id === user.id);

  if (clanUser) {
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
        status: user.status,
      };
      axios.post(process.env.API + '/updateClanUser', data).then(res => {
        if (!res.data.error) {
          clanUser.name = newName;
          clanUser.avatar = newAvatar;
        }
      });
    }
  }
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

  const cowTasks: Itasks[] = AllTasks.filter(el => el.part === state.userCow.part && el.farm === 3);

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
  for (const task of cowTasks) {
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

      for (const territory of state.cowTerritories) {
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

const checkDoneAchievement = (state: Istate): void => {
  const sheepDoneTaskCount = state.sheepTasks.filter(el => el.done).length;
  const chickenDoneTaskCount = state.chickenTasks.filter(el => el.done).length;
  const cowDoneTaskCount = state.cowTasks.filter(el => el.done).length;
  const taskCount = sheepDoneTaskCount + chickenDoneTaskCount + cowDoneTaskCount;
  Achievement.setCurrentProgress(state, taskCount, 0, 2, 0);

  if (state.userSheep.tutorial >= 100) Achievement.setCurrentProgress(state, 1, 1);

  if (state.userSheep.collectorLevel >= state.sheepCollectorSettings.length) Achievement.setCurrentProgress(state, 1, 27);
  if (state.userChicken.collectorLevel >= state.chickenCollectorSettings.length) Achievement.setCurrentProgress(state, 1, 30);
  if (state.userCow.collectorLevel >= state.cowCollectorSettings.length) Achievement.setCurrentProgress(state, 1, 33);

  if (state.sheepTerritories.every(el => el.type !== 0)) Achievement.setCurrentProgress(state, 1, 35);
  if (state.chickenTerritories.every(el => el.type !== 0)) Achievement.setCurrentProgress(state, 1, 36);
  if (state.cowTerritories.every(el => el.type !== 0)) Achievement.setCurrentProgress(state, 1, 37);

  const sheepRepositories = state.sheepTerritories.filter(el => el.type === 5);
  const maxSheepTerritoryLevel = state.sheepSettings.territoriesSheepSettings.length;
  if (sheepRepositories.some(el => el.improve >= maxSheepTerritoryLevel)) Achievement.setCurrentProgress(state, 1, 16);

  const chickenRepositories = state.chickenTerritories.filter(el => el.type === 5);
  const maxChickenTerritoryLevel = state.chickenSettings.territoriesChickenSettings.length;
  if (chickenRepositories.some(el => el.improve >= maxChickenTerritoryLevel)) Achievement.setCurrentProgress(state, 1, 20);

  const cowRepositories = state.cowTerritories.filter(el => el.type === 5);
  const maxCowTerritoryLevel = state.cowSettings.territoriesCowSettings.length;
  if (cowRepositories.some(el => el.improve >= maxCowTerritoryLevel)) Achievement.setCurrentProgress(state, 1, 22);


  const sheepPasture = state.sheepTerritories.filter(el => el.type === 2);
  const chickenPasture = state.chickenTerritories.filter(el => el.type === 2);
  const cowPasture = state.cowTerritories.filter(el => el.type === 2);

  const sheepWater = state.sheepTerritories.filter(el => el.type === 3);
  const chickenWater = state.chickenTerritories.filter(el => el.type === 3);
  const cowWater = state.cowTerritories.filter(el => el.type === 3);

  if (sheepPasture.some(el => el.improve >= maxSheepTerritoryLevel)) Achievement.setCurrentProgress(state, 1, 17);
  if (chickenPasture.some(el => el.improve >= maxChickenTerritoryLevel)) Achievement.setCurrentProgress(state, 1, 17);
  if (cowPasture.some(el => el.improve >= maxCowTerritoryLevel)) Achievement.setCurrentProgress(state, 1, 17);

  if (sheepWater.some(el => el.improve >= maxSheepTerritoryLevel)) Achievement.setCurrentProgress(state, 1, 18);
  if (chickenWater.some(el => el.improve >= maxChickenTerritoryLevel)) Achievement.setCurrentProgress(state, 1, 18);
  if (cowWater.some(el => el.improve >= maxCowTerritoryLevel)) Achievement.setCurrentProgress(state, 1, 18);

  const fairSheepLevel = state.userSheep.fair;
  const maxFairSheepLevel = state.sheepSettings.sheepFairLevels.length;
  if (fairSheepLevel >= maxFairSheepLevel) Achievement.setCurrentProgress(state, 1, 19);

  const fairChickenLevel = state.userChicken.fair;
  const maxFairChickenLevel = state.chickenSettings.chickenFairLevels.length;
  if (fairChickenLevel >= maxFairChickenLevel) Achievement.setCurrentProgress(state, 1, 21);

  const fairCowLevel = state.userCow.fair;
  const maxFairCowLevel = state.cowSettings.cowFairLevels.length;
  if (fairCowLevel >= maxFairCowLevel) Achievement.setCurrentProgress(state, 1, 23);

  let improveCount = 0;
  sheepPasture.forEach(el => { improveCount += el.improve - 1; });
  chickenPasture.forEach(el => { improveCount += el.improve - 1; });
  cowPasture.forEach(el => { improveCount += el.improve - 1; });
  sheepWater.forEach(el => { improveCount += el.improve - 1; });
  chickenWater.forEach(el => { improveCount += el.improve - 1; });
  cowWater.forEach(el => { improveCount += el.improve - 1; });
  improveCount += fairSheepLevel;
  improveCount += fairChickenLevel;
  improveCount += fairCowLevel;

  const factoryTerritory = state.cowTerritories.find(el => el.type === 8);
  if (factoryTerritory) {
    const factoryLevel = factoryTerritory.improve;
    const maxFactoryLevel = state.cowSettings.cowFactorySettings.length;
    if (factoryLevel >= maxFactoryLevel) Achievement.setCurrentProgress(state, 1, 24);

    improveCount += factoryLevel;
  }

  Achievement.setCurrentProgress(state, improveCount, 0, 11);

  if (state.user.statuses.some(el => el === 'unicorn')) {
    Achievement.setCurrentProgress(state, 1, 41);
    Achievement.setCurrentProgress(state, 1, 42);
  }

  let farmDoneCount = 0;
  if (userSheep.part === state.sheepSettings.sheepParts.length) {
    const sheepTasks = state.sheepTasks.filter(el => el.id === userSheep.part);
    if (sheepTasks.every(el => el.done === 1)) farmDoneCount += 1;
  }
  if (userChicken.part === state.chickenSettings.chickenParts.length) {
    const chickenTasks = state.chickenTasks.filter(el => el.id === userChicken.part);
    if (chickenTasks.every(el => el.done === 1)) farmDoneCount += 1;
  }  
  if (userCow.part === state.chickenSettings.chickenParts.length) {
    const chickenTasks = state.chickenTasks.filter(el => el.id === userCow.part);
    if (chickenTasks.every(el => el.done === 1)) farmDoneCount += 1;
  }
  if (farmDoneCount > 0) Achievement.setCurrentProgress(state, farmDoneCount, 40);
}

const filterSale = (state: Istate, sales: Isale[]): Isale[] => {
  if (!sales) return [];

  const farms = {
    sheep: state.progress.sheep,
    chicken: state.progress.chicken,
    cow: state.progress.cow,
  };

  const inactiveFarm = [];
  const filteredSales = [];

  Object.keys(farms).forEach(key => {
    if (farms[key].part <= 0) inactiveFarm.push(key.toUpperCase());
  });

  sales.forEach(sale => {
    if (!inactiveFarm.some(el => sale.type.includes(el))) filteredSales.push(sale);
  });

  state.sales.forEach(sale => {
    sales.find(el => el.type === sale.type).shown = sale.shown;
  });

  return filteredSales;
}

export default function loadData(response: AxiosResponse): void {
  const state: Istate = this.state;
  if (state.build < response.data.user.build || response.data.user.banned) {
    this.children.destroy();
    new ErrorWindow(this);
    return;
  }

  if (state.farm === 'Sheep') state.offline = response.data.progress.sheepOfflineTime;
  else if (state.farm === 'Chicken') state.offline = response.data.progress.chickenOfflineTime;
  else if (state.farm === 'Cow') state.offline = response.data.progress.cowOfflineTime;
  else if (state.farm === 'Unicorn') state.offline = response.data.progress.eventOfflineTime;
  // общие настройки
  state.autoSaveSpeed = general.autoSaveSpeed;
  state.maxMerginTime = general.maxMerginTime;
  state.herdBoostSpeedAnimal = general.herdBoostSpeedAnimal;
  state.herdBoostTime = general.herdBoostTime;
  state.herdBoostPrice = general.herdBoostPrice;
  state.herdBoostDelay = general.herdBoostDelay;
  state.packages = general.packages;

  // общие данные
  state.dailyAwards = response.data.user.dailyAwards;
  state.newbieTime = response.data.progress.newbieTime;
  state.daily = response.data.progress.daily;
  state.timeToNewDay = response.data.progress.timeToNewDay;

  state.sheepSettings = sheepSettings;
  state.chickenSettings = chickenSettings;
  state.cowSettings = cowSettings;

  if (response.data.user.test === 'B') {
    state.sheepSettings = testSheepSettings;
    state.chickenSettings = testChickenSettings;
    state.cowSettings = testCowSettings;
    state.herdBoostTime = testGeneral.herdBoostTime;
    state.sheepSettings.partSettings = sheepPartSettings;
    state.chickenSettings.partSettings = chickenPartSettings;
    state.cowSettings.partSettings = cowPartSettings;
  }

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
  
  state.sheep = sheep;
  state.chicken = chicken;
  state.cow = cow;

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

  state.sheepTerritories = DataValidator.validateTerritories(sheepTerritories, 1);
  state.chickenTerritories = DataValidator.validateTerritories(chickenTerritories, 2);
  state.cowTerritories = DataValidator.validateTerritories(cowTerritories, 3);

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
  state.chickenEggs = chickenEggs;
  const boosts: Iboosts = DataValidator.validateBoosts(response.data.user.boosts);
  const achievements = DataValidator.setAchievementsStatus(response.data.user.achievements);
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
    fortuneTimeAd: response.data.user.fortuneTimeAd,
    additionalTutorial: response.data.user.additional_tutorial,
    takenReward: response.data.user.taken_reward,
    status: response.data.user.status,
    statuses: response.data.user.statuses,
    starterpack: response.data.user.starterpack,
    boosts: boosts,
    test: response.data.user.test,
    takenFreeDiamonds: response.data.user.takenFreeDiamonds,
    takenSocialAward: response.data.user.takenSocialAward,
    messages: response.data.user.messages || [],
    personalMessages: response.data.user.personalMessages || [],
    avatar: response.data.user.avatar,
    boughtAvatars: response.data.user.boughtAvatars || [],
    clanTasks: response.data.user.clan_tasks || [],
    takeFreeDiamondTime: response.data.user.takeFreeDiamondTime,
    achievements: achievements,
  };
  state.user = DataValidator.validateUser(user);

  state.clan = DataValidator.validateClan(response.data.clan);
  if (state.name === '' && state.platform === 'ya') {
    state.name = `yandex_${user.id.substr(0, 4)}`;
  }
  
  if (response.data.user.chicken_part === 0 && state.farm === 'Chicken') response.data.user.chicken_part = 1;
  if (response.data.user.cow_part === 0 && state.farm === 'Cow') response.data.user.cow_part = 1;

  const userSheep: IuserSheep = {
    money: response.data.user.money,
    fair: response.data.user.sheep_fair,
    part: response.data.user.sheep_part,
    countSheep: response.data.user.count_sheep,
    collector: response.data.user.shaver_time,
    collectorLevel: response.data.user.sheepCollectorLevel,
    collectorTimeLevel: response.data.user.sheepCollectorTimeLevel,
    collectorTakenTime: response.data.user.shaver_time,
    diamondAnimalTime: response.data.user.diamonds_sheep_time,
    tutorial: response.data.user.tutor,
    autosaveCounter: response.data.user.sheepSaveCounter,
    diamondAnimalAd: response.data.user.diamonds_sheep_ad,
    takenHerdBoost: response.data.user.takenHerdBoostSheep,
    feedBoostTime: response.data.user.feedBoostTimeSheep,
    herdBoostAd: response.data.user.herdBoostSheepAd,
    feedBoostAd: response.data.user.feedBoostSheepAd,
  }

  const userChicken: IuserChicken = {
    money: response.data.user.chicken_money,
    fair: response.data.user.chicken_fair,
    part: response.data.user.chicken_part,
    countChicken: response.data.user.count_chicken,
    collector: response.data.user.chicken_collector,
    collectorLevel: response.data.user.chickenCollectorLevel,
    collectorTimeLevel: response.data.user.chickenCollectorTimeLevel,
    collectorTakenTime: response.data.user.chicken_collector,
    diamondAnimalTime: response.data.user.diamonds_chicken_time,
    tutorial: response.data.user.chicken_tutor,
    autosaveCounter: response.data.user.chickenSaveCounter,
    diamondAnimalAd: response.data.user.diamonds_chicken_ad,
    takenHerdBoost: response.data.user.takenHerdBoostChicken,
    feedBoostTime: response.data.user.feedBoostTimeChicken,
    herdBoostAd: response.data.user.herdBoostChickenAd,
    feedBoostAd: response.data.user.feedBoostChickenAd,
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
    collectorTimeLevel: response.data.user.cowCollectorTimelevel,
    collectorTakenTime: response.data.user.cow_collector,
    diamondAnimalTime: response.data.user.diamonds_cow_time,
    tutorial: response.data.user.cow_tutor,
    autosaveCounter: response.data.user.cowSaveCounter,
    diamondAnimalAd: response.data.user.diamonds_cow_ad,
    takenHerdBoost: response.data.user.takenHerdBoostCow,
    feedBoostTime: response.data.user.feedBoostTimeCow,
    herdBoostAd: response.data.user.herdBoostCowAd,
    feedBoostAd: response.data.user.feedBoostCowAd,
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

  state.userSheep = Utils.checkTestB(state) 
    ? DataValidator.validateUserSheepTestB(userSheep) 
    : DataValidator.validateUserSheep(userSheep);

  state.userChicken = Utils.checkTestB(state) 
    ? DataValidator.validateUserChickenTestB(userChicken) 
    : DataValidator.validateUserChicken(userChicken);

  state.userCow = Utils.checkTestB(state)
    ? DataValidator.validateUserCowTestB(userCow)
    : DataValidator.validateUserCow(userCow);

  if (Utils.checkTestB(state)) {
    state.sheepTasks = DataValidator.setTaskStatusTest(testSheepTasks, response.data.user.sheep_tasks) as unknown as Itasks[];
    state.chickenTasks = DataValidator.setTaskStatusTest(testChickenTasks, response.data.user.chicken_tasks) as unknown as Itasks[];
    state.cowTasks = DataValidator.setTaskStatusTest(testCowTasks, response.data.user.cow_tasks) as unknown as Itasks[];
  } else {
    state.sheepTasks = DataValidator.setTaskStatus(1, response.data.user.sheep_tasks);
    state.chickenTasks = DataValidator.setTaskStatus(2, response.data.user.chicken_tasks);
    state.cowTasks = DataValidator.setTaskStatus(3, response.data.user.cow_tasks);
  }

  state.sheepCollectorSettings = sheepCollectorSettings;
  state.chickenCollectorSettings = chickenCollectorSettings;
  state.cowCollectorSettings = cowCollectorSettings;

  const basicProgress: Iprogress = getProgress(response.data.user.test === 'B');
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
    },
    clanEvent: {
      startTime: response.data.progress.clanEvent.startTime,
      endTime: response.data.progress.clanEvent.endTime,
      open: response.data.settings.clanEvent.open,
      type: response.data.settings.clanEvent.type,
    }
  }
  state.progress = progress;
  if (response.data.user.build < 3.9) {
    state.sheepTerritories = updateImproveTerritories(state.sheepTerritories);
    state.chickenTerritories = updateImproveTerritories(state.chickenTerritories);
    checkDoneTasks(state);
  }
  
  if (response.data.user.build && response.data.user.build < 4.14) {
    checkDoneAchievement(state);
  }

  if (
    state.progress.event.type === 1 
    && state.progress.event.startTime < 0 
    && state.progress.event.open
  ) {
    state.unicornSettings = unicornSettings;

    const unicorn: Iunicorn[] = []; // IeventAnimal
    for (let i in response.data.event.animals) {
      let animal = response.data.event.animals[i];
      unicorn.push({
        _id: animal._id,
        type: animal.type,
        activeAnimal: animal.activeAnimal,
        x: animal.x,
        y: animal.y,
      });
    }

    const unicornTerritories: IunicornTerritories[] = [];
    for (let i in response.data.event.territories) {
      let territory = response.data.event.territories[i];
      unicornTerritories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type
      });
    }

    const unicornResources: IunicornResource[] = []; // IeventResource
    for (let i in response.data.event.resources) {
      let eventResource = response.data.event.resources[i];
      unicornResources.push({
        _id: eventResource._id,
        x: eventResource.x,
        y: eventResource.y,
        type: eventResource.type
      });
    }

    const countAnimal = response.data.event.countAnimal;
    if (countAnimal.length < state.unicornSettings.unicornSettings.length) {
      let addCounter: number = state.unicornSettings.unicornSettings.length - countAnimal.length;
      for (let i = 0; i < addCounter; i++) {
        countAnimal.push({ counter: 1 });
      }
    }
    const userUnicorn: IuserUnicorn = {  
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
      collectorNotificationTime: response.data.event.collector,
    };

    state.unicornTerritories = unicornTerritories;
    state.unicorn = unicorn;
    state.unicornResources = unicornResources; 
    state.userUnicorn = userUnicorn;
    state.unicornCollectorSettings = basicUnicornCollector;
  }

  if (state.user.clanId) {
    checkUserName(state);
    const currentDate: Date = new Date(response.data.time * 1000);
    const autosaveDate: Date = new Date(response.data.user.time * 1000);
    const currentDay: string = `${currentDate.getDate()}.${currentDate.getMonth()}.${currentDate.getFullYear()}`;
    const autosaveDay: string = `${autosaveDate.getDate()}.${autosaveDate.getMonth()}.${autosaveDate.getFullYear()}`;
    if (currentDay !== autosaveDay || state.user.clanTasks?.length <= 0 || !state.user.clanTasks) {
       state.user.clanTasks = getNewClanTasks(state);
    }
  }

  if (state.progress.clanEvent.endTime <= 0 && state.user.clanId) {
    const data = {
      id: state.user.id,
      hash: state.user.hash,
      counter: state.user.counter,
    };
    axios.post(process.env.API + '/checkTournamentAward', data).then(res => {
      const { error, userAward } = res.data;
      if (!error) state.clanEventTakenAward = userAward;
    });
  }
  
  state.sales = filterSale(state, response.data.sales);
};

export { checkUserName };
