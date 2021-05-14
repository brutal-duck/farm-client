import tasks from '../tasks';
import basicSheepTerritories from '../local/sheepTerritories';
import basicChickenTerritories from '../local/chickenTerritories';
import basicCowTerritories from '../local/cowTerritories';
import basicUnicornCollector from '../local/unicornCollector';
import { unicornSettings, sheepSettings, chickenSettings, cowSettings } from '../local/settings';

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
    sheepFairLevels: response.data.settings.sheep.fairs,
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
    chickenFairLevels: response.data.settings.chicken.fairs,
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

  const factoryCowSettings: IfactorySettings[] = [
    { 
      improve: 1,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 0,
      processingTime: 15,
      lotSize: 100,
      clabberPercent: 40,
      pasteurizedMilkPercent: 0,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 20,
    },
    { 
      improve: 2,
      unlock_improve: 1,
      improveMoneyPrice: 40000,
      improveDiamondPrice: 0,
      processingTime: 30,
      lotSize: 400,
      clabberPercent: 40,
      pasteurizedMilkPercent: 30,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 50,
    },
    { 
      improve: 3,
      unlock_improve: 1,
      improveMoneyPrice: 600000,
      improveDiamondPrice: 0,
      processingTime: 30,
      lotSize: 1000,
      clabberPercent: 30,
      pasteurizedMilkPercent: 40,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 55,
    },
    { 
      improve: 4,
      unlock_improve: 1,
      improveMoneyPrice: 1600000,
      improveDiamondPrice: 0,
      processingTime: 30,
      lotSize: 2000,
      clabberPercent: 30,
      pasteurizedMilkPercent: 45,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 60,
    },
    { 
      improve: 5,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 60,
      processingTime: 60,
      lotSize: 3000,
      clabberPercent: 35,
      pasteurizedMilkPercent: 45,
      cheesePercent: 20,
      chocolatePercent: 100,
      efficiency: 93,
    },
    { 
      improve: 6,
      unlock_improve: 1,
      improveMoneyPrice: 12000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 12000,
      clabberPercent: 35,
      pasteurizedMilkPercent: 45,
      cheesePercent: 20,
      chocolatePercent: 100,
      efficiency: 93,
    },
    { 
      improve: 7,
      unlock_improve: 1,
      improveMoneyPrice: 36000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 25000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 8,
      unlock_improve: 1,
      improveMoneyPrice: 56000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 35000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 9,
      unlock_improve: 1,
      improveMoneyPrice: 160000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 50000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 10,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 240,
      processingTime: 120,
      lotSize: 150000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 11,
      unlock_improve: 1,
      improveMoneyPrice: 320000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 300000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 45,
      cheesePercent: 35,
      chocolatePercent: 100,
      efficiency: 108,
    },
    { 
      improve: 12,
      unlock_improve: 1,
      improveMoneyPrice: 560000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 400000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 50,
      cheesePercent: 30,
      chocolatePercent: 100,
      efficiency: 105,
    },
    { 
      improve: 13,
      unlock_improve: 1,
      improveMoneyPrice: 1200000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 600000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 50,
      cheesePercent: 30,
      chocolatePercent: 100,
      efficiency: 105,
    },
    { 
      improve: 14,
      unlock_improve: 1,
      improveMoneyPrice: 1600000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 950000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 50,
      cheesePercent: 30,
      chocolatePercent: 100,
      efficiency: 105,
    },
    { 
      improve: 15,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 540,
      processingTime: 180,
      lotSize: 2000000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 35,
      cheesePercent: 45,
      chocolatePercent: 100,
      efficiency: 113,
    },
    { 
      improve: 16,
      unlock_improve: 1,
      improveMoneyPrice: 2600000000,
      improveDiamondPrice: 0,
      processingTime: 180,
      lotSize: 3500000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 35,
      cheesePercent: 45,
      chocolatePercent: 100,
      efficiency: 113,
    },
    { 
      improve: 17,
      unlock_improve: 1,
      improveMoneyPrice: 4000000000,
      improveDiamondPrice: 0,
      processingTime: 180,
      lotSize: 5000000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 35,
      cheesePercent: 45,
      chocolatePercent: 100,
      efficiency: 113,
    },
    { 
      improve: 18,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 840,
      processingTime: 300,
      lotSize: 9000000,
      clabberPercent: 5,
      pasteurizedMilkPercent: 30,
      cheesePercent: 65,
      chocolatePercent: 100,
      efficiency: 130,
    },
    { 
      improve: 19,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 1080,
      processingTime: 300,
      lotSize: 14000000,
      clabberPercent: 5,
      pasteurizedMilkPercent: 30,
      cheesePercent: 65,
      chocolatePercent: 100,
      efficiency: 130,
    },
    { 
      improve: 20,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 1800,
      processingTime: 300,
      lotSize: 30000000,
      clabberPercent: 5,
      pasteurizedMilkPercent: 30,
      cheesePercent: 65,
      chocolatePercent: 100,
      efficiency: 130,
    },
  ];

  const resCowSettings: IcowSettings = {
    cowBadPercent: response.data.settings.cow.badPercent,
    cowPrice: response.data.settings.cow.price,
    territoriesCowSettings: response.data.settings.cow.territoriesSettings,
    cowSettings: response.data.settings.cow.cowSettings,
    territoriesCowPrice: response.data.settings.cow.territoriesPrice,
    cowFairLevels: response.data.settings.cow.fairs,
    cowParts: response.data.settings.cow.parts,
    buyBetterBreedCow: response.data.settings.cow.buyBetterBreed,
    doubledСollectorPrice: response.data.settings.cow.doubledСollectorPrice,
    collectorPrice4: response.data.settings.cow.collectorPrice4,
    collectorPrice12: response.data.settings.cow.collectorPrice12,
    unlockCollector4: response.data.settings.cow.unlockCollector4,
    unlockCollector12: response.data.settings.cow.unlockCollector12,
    cowDiamondsTime: response.data.settings.cow.diamondAnimalTime,
    feedBoostPrice: response.data.settings.cow.feedBoostPrice,
    cowFactorySettings: factoryCowSettings,
  };

  const territoriesCowSettings: IterritoriesCowSettings[] = [
    { 
      improve: 1, 
      regeneration: 11, 
      unlock_improve: 1, 
      storage: 5000,   
      improvePastureMoneyPrice: 0,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 2, 
      regeneration: 13, 
      unlock_improve: 2, 
      storage: 30000,   
      improvePastureMoneyPrice: 100,
      improveStorageMoneyPrice: 10000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 3, 
      regeneration: 15, 
      unlock_improve: 2, 
      storage: 100000,   
      improvePastureMoneyPrice: 400,
      improveStorageMoneyPrice: 150000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 4, 
      regeneration: 17, 
      unlock_improve: 2, 
      storage: 230000,   
      improvePastureMoneyPrice: 1500,
      improveStorageMoneyPrice: 400000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 5, 
      regeneration: 19, 
      unlock_improve: 2, 
      storage: 510000,   
      improvePastureMoneyPrice: 5000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 50,
    },
    { 
      improve: 6, 
      regeneration: 22, 
      unlock_improve: 3, 
      storage: 1100000,   
      improvePastureMoneyPrice: 10000,
      improveStorageMoneyPrice: 3000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 7, 
      regeneration: 23, 
      unlock_improve: 3, 
      storage: 2500000,   
      improvePastureMoneyPrice: 23000,
      improveStorageMoneyPrice: 9000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 8, 
      regeneration: 24, 
      unlock_improve: 4, 
      storage: 5000000,   
      improvePastureMoneyPrice: 50000,
      improveStorageMoneyPrice: 14000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 9, 
      regeneration: 25, 
      unlock_improve: 4, 
      storage: 9000000,   
      improvePastureMoneyPrice: 70000,
      improveStorageMoneyPrice: 40000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    {
      improve: 10, 
      regeneration: 27, 
      unlock_improve: 5, 
      storage: 14500000,   
      improvePastureMoneyPrice: 100000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 200,
    },
    { 
      improve: 11, 
      regeneration: 29, 
      unlock_improve: 6, 
      storage: 22000000,   
      improvePastureMoneyPrice: 402000,
      improveStorageMoneyPrice: 80000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 12, 
      regeneration: 31, 
      unlock_improve: 6, 
      storage: 35000000,   
      improvePastureMoneyPrice: 1230000,
      improveStorageMoneyPrice: 140000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 13, 
      regeneration: 33, 
      unlock_improve: 7, 
      storage: 50000000,   
      improvePastureMoneyPrice: 1400000,
      improveStorageMoneyPrice: 300000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 14, 
      regeneration: 34, 
      unlock_improve: 7, 
      storage: 80000000,   
      improvePastureMoneyPrice: 1600000,
      improveStorageMoneyPrice: 400000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 15, 
      regeneration: 35, 
      unlock_improve: 8, 
      storage: 110000000,   
      improvePastureMoneyPrice: 1800000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 450,
    },
    { 
      improve: 16, 
      regeneration: 36, 
      unlock_improve: 9, 
      storage: 200000000,   
      improvePastureMoneyPrice: 3600000,
      improveStorageMoneyPrice: 650000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 17, 
      regeneration: 38, 
      unlock_improve: 10, 
      storage: 300000000,   
      improvePastureMoneyPrice: 7200000,
      improveStorageMoneyPrice: 1000000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 18, 
      regeneration: 40, 
      unlock_improve: 11, 
      storage: 400000000,   
      improvePastureMoneyPrice: 14400000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 700,
    },
    { 
      improve: 19, 
      regeneration: 42, 
      unlock_improve: 12, 
      storage: 500000000,   
      improvePastureMoneyPrice: 28800000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 900,
    },
    { 
      improve: 20, 
      regeneration: 44, 
      unlock_improve: 13, 
      storage: 1000000000,   
      improvePastureMoneyPrice: 57600000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 1500,
    },
  ];

  resCowSettings.territoriesCowSettings = territoriesCowSettings;
  
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
      block: this.state.farm === 'Sheep' ? territory.block + 1 : territory.block,
      position: territory.position,
      type: territory.type,
      volume: territory.volume,
      improve: territory.improve,
      money: territory.money
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
      money: territory.money
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
      money: territory.money
    });
  }

  // проверка наличия территорий
  if (sheepTerritories.length === 0) {
    for (let i in basicSheepTerritories) {
      const territory = basicSheepTerritories[i];
      sheepTerritories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type,
        volume: territory.volume,
        improve: territory.improve,
        money: territory.money
      });
    }
  }

  if (chickenTerritories.length === 0) {
    for (let i in basicChickenTerritories) {
      let territory = basicChickenTerritories[i];
      chickenTerritories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type,
        volume: territory.volume,
        improve: territory.improve,
        money: territory.money
      });
    }
  }

  if (cowTerritories.length === 0) {
    for (let i in basicCowTerritories) {
      const territory = basicCowTerritories[i];
      cowTerritories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type,
        volume: territory.volume,
        improve: territory.improve,
        money: territory.money
      });
    }
  }

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
    boosts: response.data.user.boosts,          
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
    factoryBoostTime: 0,
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
  for (let i in tasks) if (tasks[i].farm === 2) cowTasks.push(tasks[i]);
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

  this.state.sheepCollectorSettings = response.data.settings.sheep.collectorSettings;
  this.state.chickenCollectorSettings = response.data.settings.chicken.collectorSettings;
  this.state.cowCollectorSettings = response.data.settings.cow.collectorSettings;
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