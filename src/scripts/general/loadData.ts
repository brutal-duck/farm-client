import tasks from '../tasks';
import basicSheepTerritories from '../local/sheepTerritories';
import basicChickenTerritories from '../local/chickenTerritories';
import basicCowTerritories from '../local/cowTerritories';
import basicUnicornCollector from '../local/unicornCollector';
import { unicornSettings, sheepSettings, chickenSettings, cowSettings } from '../local/settings';
import { userCow, userData } from '../local/usersData';
import sheepCollectorSettings from '../local/sheepCollector';
import chickenCollectorSettings from '../local/chickenCollector';
import cowCollectorSettings from '../local/cowCollector';
const basicUserCow = userCow;

function validateTerritories(territories: Iterritories[], basicTerritories: Iterritories[]): void {
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
      });
    }
  }
}

function validateBoosts(boosts: Iboosts): Iboosts {
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

export default function loadData(response: any): void {
  if (this.state.farm === 'Sheep') this.state.offline = response.data.progress.sheepOfflineTime;
  else if (this.state.farm === 'Chicken') this.state.offline = response.data.progress.chickenOfflineTime;
  else if (this.state.farm === 'Cow') this.state.offline = response.data.progress.cowOfflineTime;
  else if (this.state.farm === 'Unicorn') this.state.offline = response.data.progress.eventOfflineTime;
  // общие настройки
  this.state.autoSaveSpeed = response.data.settings.general.autoSaveSpeed;
  this.state.maxMerginTime = response.data.settings.general.maxMerginTime;
  this.state.herdBoostSpeedAnimal = response.data.settings.general.herdBoostSpeedAnimal;
  this.state.herdBoostTime = response.data.settings.general.herdBoostTime;
  this.state.herdBoostPrice = response.data.settings.general.herdBoostPrice;
  this.state.herdBoostDelay = response.data.settings.general.herdBoostDelay;
  this.state.packages = response.data.settings.packages;

  // общие данные
  this.state.dailyAwards = response.data.user.dailyAwards;
  this.state.newbieTime = response.data.progress.newbieTime;
  this.state.daily = response.data.progress.daily;
  this.state.timeToNewDay = response.data.progress.timeToNewDay;

  const resSheepSettings: IsheepSettings = {
    sheepBadPercent: response.data.settings.sheep.badPercent,
    sheepPrice: response.data.settings.sheep.price,
    territoriesSheepSettings: response.data.settings.sheep.territoriesSettings,
    sheepSettings: response.data.settings.sheep.sheepSettings,
    territoriesSheepPrice: response.data.settings.sheep.territoriesPrice,
    sheepFairLevels: sheepSettings.sheepFairLevels,
    sheepParts: response.data.settings.sheep.parts,
    buyBetterBreedSheep: response.data.settings.sheep.buyBetterBreed,
    doubledСollectorPrice: response.data.settings.sheep.doubledСollectorPrice,
    collectorPrice4: response.data.settings.sheep.collectorPrice4,
    collectorPrice12: response.data.settings.sheep.collectorPrice12,
    unlockCollector4: response.data.settings.sheep.unlockCollector4,
    unlockCollector12: response.data.settings.sheep.unlockCollector12,
    sheepDiamondsTime: response.data.settings.sheep.diamondAnimalTime,
    feedBoostPrice: response.data.settings.sheep.feedBoostPrice,
  }


  const resChickenSettings: IchickenSettings = {
    chickenBadPercent: response.data.settings.chicken.badPercent,
    chickenPrice: response.data.settings.chicken.price,
    territoriesChickenSettings: response.data.settings.chicken.territoriesSettings,
    chickenSettings: response.data.settings.chicken.chickenSettings,
    territoriesChickenPrice: response.data.settings.chicken.territoriesPrice,
    chickenFairLevels: chickenSettings.chickenFairLevels,
    chickenParts: response.data.settings.chicken.parts,
    buyBetterBreedChicken: response.data.settings.chicken.buyBetterBreed,
    doubledСollectorPrice: response.data.settings.chicken.doubledСollectorPrice,
    collectorPrice4: response.data.settings.chicken.collectorPrice4,
    collectorPrice12: response.data.settings.chicken.collectorPrice12,
    unlockCollector4: response.data.settings.chicken.unlockCollector4,
    unlockCollector12: response.data.settings.chicken.unlockCollector12,
    chickenDiamondsTime: response.data.settings.chicken.diamondAnimalTime,
    feedBoostPrice: response.data.settings.chicken.feedBoostPrice,
  };

  const resCowSettings: IcowSettings = {
    cowBadPercent: response.data.settings.cow.badPercent,
    cowPrice: response.data.settings.cow.price,
    territoriesCowSettings: response.data.settings.cow.territoriesSettings,
    cowSettings: response.data.settings.cow.cowSettings,
    territoriesCowPrice: response.data.settings.cow.territoriesPrice,
    cowFairLevels: cowSettings.cowFairLevels,
    cowParts: response.data.settings.cow.parts,
    buyBetterBreedCow: response.data.settings.cow.buyBetterBreed,
    doubledСollectorPrice: response.data.settings.cow.doubledСollectorPrice,
    collectorPrice4: response.data.settings.cow.collectorPrice4,
    collectorPrice12: response.data.settings.cow.collectorPrice12,
    unlockCollector4: response.data.settings.cow.unlockCollector4,
    unlockCollector12: response.data.settings.cow.unlockCollector12,
    cowDiamondsTime: response.data.settings.cow.diamondAnimalTime,
    feedBoostPrice: response.data.settings.cow.feedBoostPrice,
    cowFactorySettings: response.data.settings.cow.cowFactorySettings,
  };

  for (const key in resSheepSettings) {
    if (resSheepSettings[key] === undefined || resSheepSettings[key] === null) resSheepSettings[key] = sheepSettings[key];
  }

  for (const key in resChickenSettings) {
    if (resChickenSettings[key] === undefined || resChickenSettings[key] === null) resChickenSettings[key] = chickenSettings[key];
  }

  for (const key in resCowSettings) {
    if (resCowSettings[key] === undefined || resCowSettings[key] === null) resCowSettings[key] = cowSettings[key];
  }

  this.state.sheepSettings = resSheepSettings;
  this.state.chickenSettings = resChickenSettings;
  this.state.cowSettings = resCowSettings;
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
  for (let i in response.data.user.sheep_territories) {
    const territory = response.data.user.sheep_territories[i];
    sheepTerritories.push({
      _id: territory._id,
      block: response.data.user.sheep_territories[0].block === 0 ? territory.block + 1 : territory.block,
      position: territory.position,
      type: territory.type,
      volume: territory.volume,
      improve: territory.improve,
      money: territory.money,
      cooldown: territory.cooldown,
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
    });
  }

  validateTerritories(sheepTerritories, basicSheepTerritories);
  validateTerritories(chickenTerritories, basicChickenTerritories);
  validateTerritories(cowTerritories, basicCowTerritories);

  this.state.sheepTerritories = sheepTerritories;
  this.state.chickenTerritories = chickenTerritories;
  this.state.cowTerritories = cowTerritories;
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
  const test: string = response.data.user.test ? response.data.user.test : 'A';
  const user: Iuser = {
    diamonds: response.data.user.diamonds,
    id: response.data.user._id,
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
    test: test,
    takenFreeDiamonds: response.data.user.takenFreeDiamonds,
  };
  this.state.user = user;
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

  const sheepTasks: Itasks[] = [];
  for (let i in tasks) if (tasks[i].farm === 1) sheepTasks.push(tasks[i]);
  for (let i in response.data.user.sheep_tasks) {
    const usersTask = response.data.user.sheep_tasks[i];
    const task = tasks.find((task: Itasks) => task.id === usersTask.task_id);
    if (task) {
      task.done = usersTask.done;
      task.got_awarded = usersTask.got_awarded;
      task.progress = usersTask.progress;
    }
  }

  const chickenTasks: Itasks[] = [];
  for (let i in tasks) if (tasks[i].farm === 2) chickenTasks.push(tasks[i]);
  for (let i in response.data.user.chicken_tasks) {
    const usersTask = response.data.user.chicken_tasks[i];
    const task = tasks.find((task: Itasks) => task.id === usersTask.task_id);
    if (task) {
      task.done = usersTask.done;
      task.got_awarded = usersTask.got_awarded;
      task.progress = usersTask.progress;
    }
  }

  const cowTasks: Itasks[] = [];
  for (let i in tasks) if (tasks[i].farm === 3) cowTasks.push(tasks[i]);
  for (let i in response.data.user.cow_tasks) {
    const usersTask = response.data.user.cow_tasks[i];
    const task = tasks.find((task: Itasks) => task.id === usersTask.task_id);
    if (task) {
      task.done = usersTask.done;
      task.got_awarded = usersTask.got_awarded;
      task.progress = usersTask.progress;
    }
  }

  this.state.sheepTasks = sheepTasks;
  this.state.chickenTasks = chickenTasks;
  this.state.cowTasks = cowTasks;

  this.state.sheepCollectorSettings = sheepCollectorSettings;
  this.state.chickenCollectorSettings = chickenCollectorSettings;
  this.state.cowCollectorSettings = cowCollectorSettings;
  const progress: Iprogress = {
    sheep: {
      part: response.data.user.sheep_part,
      max: response.data.settings.sheep.parts.length,
      open: true,
      price: response.data.settings.farms[0].price,
      unlock: response.data.settings.farms[0].open,
      donate: response.data.settings.farms[0].donate,
      collector: response.data.user.shaver_time,
      offlineTime: response.data.progress.sheepOfflineTime,
    },
    chicken: {
      part: response.data.user.chicken_part,
      max: response.data.settings.chicken.parts.length,
      open: response.data.user.chicken_part > 0,
      price: response.data.settings.farms[1].price,
      unlock: response.data.settings.farms[1].open,
      donate: response.data.settings.farms[1].donate,
      collector: response.data.user.chicken_collector,
      offlineTime: response.data.progress.chickenOfflineTime,
    },
    cow: {
      part: response.data.user.cow_part,
      max: response.data.settings.cow.parts.length,
      open: response.data.user.cow_part > 0,
      price: response.data.settings.farms[2].price,
      unlock: response.data.settings.farms[2].open,
      donate: response.data.settings.farms[2].donate,
      collector: response.data.user.cow_collector,
      offlineTime: response.data.progress.cowOfflineTime,
    },
    event: {
      eventPoints: response.data.user.eventPoints,
      startTime: response.data.progress.event.startTime,
      endTime: response.data.progress.event.endTime,
      open: response.data.settings.event.open,
      type: response.data.settings.event.type,
    }
  }
  this.state.progress = progress;
  if (
    this.state.progress.event.type === 1 
    && this.state.progress.event.startTime < 0 
    && this.state.progress.event.endTime > 0 
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
      maxLevelAnimal: response.data.user.eventPoints,
      herdBoostAnimals: response.data.event.herdBoostAnimals,
      takenAd: response.data.event.takenAd,
      timeToAd: response.data.event.timeToAd,
    };

    this.state.eventTerritories = eventTerritories;
    this.state.eventAnimals = eventAnimals;
    this.state.eventResources = eventResources; 
    this.state.userUnicorn = userUnicorn;
    this.state.eventCollectorSettings = basicUnicornCollector;
  }
}