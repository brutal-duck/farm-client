import Sheep from './../scenes/Sheep/Main';
import Chicken from './../scenes/Chicken/Main';
import Unicorn from './../scenes/Event/Unicorns/Main';
import Cow from './../scenes/Cow/Main';
import Profile from './../scenes/Profile';
import Arrow from './../components/animations/Arrow';
import SpeechBubble from './../components/animations/SpeechBuble';
import Factory from './../components/Territories/Factory';
import axios from 'axios';

function progressTerritoryCooldown (territories: Iterritories[], time: number, farm: string, offline: boolean = false): void {
  for (const territory of territories) {
    if (territory.cooldown > 0) {
      territory.bought = true;
      territory.cooldown -= time;
      if (offline && territory.cooldown <= 0) {
        territory.type = territory.boughtType;

        if (territory.type === 1) {
          const sheepTask: Itasks = this.state.sheepTasks.find(el => el.part === this.state.userSheep.part && el.type === 5 && (el.state === 1 || el.state === 0));
          const chickenTask: Itasks = this.state.chickenTasks.find(el => el.part === this.state.userChicken.part && el.type === 5 && (el.state === 1 || el.state === 0));
          const cowTask: Itasks = this.state.cowTasks.find(el => el.part === this.state.userCow.part && el.type === 5 && (el.state === 1 || el.state === 0));
          if (sheepTask && farm === 'Sheep') {
            sheepTask.progress += 1;
            if (sheepTask.count <= sheepTask.progress) {
              sheepTask.done = 1;
              this.tryClanTask(16);
            }
          }
          if (chickenTask && farm === 'Chicken') {
            chickenTask.progress += 1;
            if (chickenTask.count <= chickenTask.progress) {
              chickenTask.done = 1;
              this.tryClanTask(16);
            }
          }
          if (cowTask && farm === 'Cow') {
            cowTask.progress += 1;
            if (cowTask.count <= cowTask.progress) {
              cowTask.done = 1;
              this.tryClanTask(16);
            }
          }
        }
      };
      if (territory.cooldown <= 0) {
        territory.cooldown = 0;
      }
    }
  }
}

const progressClanCooldown = (state: Istate, time: number = 1): void => {
  if (state.clan) {
    if (state.clan.main.cooldown > 0) state.clan.main.cooldown -= time;
    if (state.clan.sheep.cooldown > 0) state.clan.sheep.cooldown -= time;
    if (state.clan.chicken.cooldown > 0) state.clan.chicken.cooldown -= time;
    if (state.clan.cow.cooldown > 0) state.clan.cow.cooldown -= time;
  } else {
    if (state.user.clanId) state.user.clanId = '';
  }
};

const progressSalesTime = (state: Istate, time: number = 1): void => {
  state.sales.forEach(el => {
    if (el.startTime > 0) el.startTime -= time;
    if (el.endTime > 0) el.endTime -= time;
  })
}

const getRandomProductId = (settings: IfactorySettings, boost: boolean): number => {
  const pull: number[] = [ settings.production1Percent, settings.production2Percent, settings.production3Percent ];
  if (boost) pull.push(settings.production4Percent);

  const totalCounter: number = pull.reduce((prev, current) => prev += current);
  const arrRange: {
    id: number,
    bottom: number,
    top: number
  } [] = [];

  let current: number = 0;
  let previos: number = 0;
  for (let i: number = 0; i < pull.length; i += 1) {
    if (pull[i] !== 0) {
      current = pull[i] + previos;
      arrRange.push({
        id: i + 1, 
        bottom: previos, 
        top: current 
      })
      previos = current;
    }
  }

  const randomIndex: number = Phaser.Math.Between(1, totalCounter);
  let productId: number;

  for (let i: number = 0; i < arrRange.length; i += 1) {
    if (arrRange[i].bottom < randomIndex && arrRange[i].top >= randomIndex) {
      productId = arrRange[i].id;
    }
  }
  return productId;
}

function sheepIntervalProgress(): void {
  const Scene: Chicken | Cow | Unicorn = this;
  const sheepBalance: Ibalance = Scene.farmBalance('Sheep');
  const sheepSettings: IsheepSettings = Scene.state.sheepSettings;
  this.progressTerritoryCooldown(Scene.state.sheepTerritories, 1, 'Sheep', true);
  for (let i in Scene.state.sheep) {
    const sheep: Isheep = Scene.state.sheep[i];
    let breed: number;
    if (sheep.type === 0) breed = 1;
    else breed = sheep.type;
    let points: IsheepPoints = sheepSettings.sheepSettings.find((item: IsheepPoints) => item.breed === breed);
    // рост шерсти
    if (sheep.wool < 1000 && sheepBalance.waterRecovery > 0 && sheepBalance.grassRecovery > 0) {
      let wool: number = points.wool_growth;
      if (sheepBalance.alarm) {
        wool = Math.round(wool / 100 * sheepSettings.sheepBadPercent);
        if (wool < 1) wool = 1;
      }
      sheep.wool += wool;
      if (sheep.wool > 1000) sheep.wool = 1000;
    }
  }
}

function chickenIntervalProgress(): void {
  const Scene: Sheep | Cow | Unicorn = this;
  const INDENT: number = 20;
  const chickenBalance: Ibalance = Scene.farmBalance('Chicken');
  const chickenSettings: IchickenSettings = Scene.state.chickenSettings;

  this.progressTerritoryCooldown(Scene.state.chickenTerritories, 1, 'Chicken', true);

  if (Scene.state.userChicken.part > 0) {
    for (let i in Scene.state.chicken) {
      const chicken: Ichicken = Scene.state.chicken[i];
      if (chicken) {
        let breed: number;
        if (chicken.type === 0) breed = 1;
        else breed = chicken.type;
        const points: IchickenPoints = chickenSettings.chickenSettings.find((item: IchickenPoints) => item.breed === breed);
        // зарождение яйца
        if (chicken.egg < 1000) {
          let egg: number = points.egg;
          if (chickenBalance.alarm) {
            egg = Math.round(egg / 100 * chickenSettings.chickenBadPercent);
            if (egg < 1) egg = 1;
          }
          chicken.egg += egg;
          if (chicken.egg > 1000) chicken.egg = 1000;
        }
        if (chicken.egg === 1000) {
          const indent: number =  240;
          const height: number = 240;
          const block: number = Math.ceil((chicken.y - indent) / height);
          const position: number = Math.ceil(chicken.x / height);
          const territory = this.state.chickenTerritories.find((data: Iterritories) => data.block === block && data.position === position);
          if (territory) {
            const countEggs: number = chickenSettings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).countEggs;
            let eggs: number = 0;
            for (let i in Scene.state.chickenEggs) {
              const egg = Scene.state.chickenEggs[i];
              const block: number = Math.ceil((egg.y - indent) / height);
              const position: number = Math.ceil(egg.x / height);
              const ter = this.state.chickenTerritories.find((data: Iterritories) => data.block === block && data.position === position);
              if (ter?.block === territory.block && ter?.position === territory.position) eggs++;
            }
    
            if ((eggs < countEggs || chicken.type === 0) && (territory?.type === 2 || territory?.type === 3)) {
              chicken.egg = 0;
              // рандом разброса яиц
              let minX: number = chicken.x - INDENT;
              let maxX: number = chicken.x + INDENT;
              let minY: number = chicken.y + 40 - INDENT;
              let maxY: number = chicken.y + 40 + INDENT;
              let left: number = (territory.position - 1) * 240 + INDENT;
              let right: number = territory.position * 240 - INDENT;
              let top: number = (territory.block) * 240 + INDENT;
              let bottom: number = (territory.block + 1) * 240 - INDENT;
              if (left > minX) minX = left;
              if (maxX > right) maxX = right;
              if (top > minY) minY = top;
              if (maxY > bottom) {
                maxY = bottom;
                if (maxY < minY) minY -= 40;
              }
    
              const egg: IchickenEgg = {
                type: chicken.type,
                x: Phaser.Math.Between(minX, maxX),
                y: Phaser.Math.Between(minY, maxY),
                _id: 'local_' + this.randomString(18),
              }
              Scene.state.chickenEggs.push(egg);
              if (chicken?.type === 0) chicken.diamond++;
              if (chicken.diamond >= 3 && chicken?.type === 0) {
                Scene.state.chicken = Scene.state.chicken.filter((el: Ichicken)=> el._id !== chicken._id);
              }
            }
          }
        }
      }
    }
  }
}

function cowIntervalProgress(): void {
  const Scene: Sheep | Chicken | Unicorn = this;
  const MILK_DELAY: number = 10;
  const cowBalance: Ibalance = Scene.farmBalance('Cow');
  const cowSettings: IcowSettings = Scene.state.cowSettings;

  this.progressTerritoryCooldown(Scene.state.cowTerritories, 1, 'Cow', true);

  if (Scene.state.userCow.part > 0) {
    for (let i in Scene.state.cow) {
      const cow: Icow = Scene.state.cow[i];
      let breed: number;
      if (cow.type === 0) breed = 1;
      else breed = cow.type;
      const cowPoints: IcowPoints = cowSettings.cowSettings.find((item: IcowPoints) => item.breed === breed);
      if (cow.milk < cowPoints.maxMilkVolume) {
        let milk: number = cowPoints.maxMilkVolume / MILK_DELAY;
        if (cow.type === 0) milk = cowPoints.maxMilkVolume / 10;
  
        if (cowBalance.alarm) {
          milk = Math.round(milk / 100 * Scene.state.cowSettings.cowBadPercent);
          if (milk < 1) milk = 1;
        }
        cow.milk += milk;
        if (cow.milk > cowPoints.maxMilkVolume) {
          cow.milk = cowPoints.maxMilkVolume;
        }
      }
    }
  }
}

function sheepCollectorProgress(sheepCollectorVolume: number): number {
  const Scene: Chicken | Cow | Unicorn = this;
  if (Scene.state.progress.sheep.collector > 0) {
    const speed: number = Scene.state.sheepCollectorSettings.find((data: IcollectorSettings) => data.level === Scene.state.userSheep.collectorLevel).speed;
    const SEC: number = 1000;
    sheepCollectorVolume += 2 * SEC;
    let collectedWool: number = Math.floor(sheepCollectorVolume / speed / SEC);
    if (collectedWool > 0) {
      sheepCollectorVolume -= collectedWool * SEC;
      for (let i in Scene.state.sheepTerritories) {
        const territory: Iterritories = Scene.state.sheepTerritories[i];
        if (territory.type === 5) {
          const max: number = Scene.state.sheepSettings.territoriesSheepSettings.find((data: IterritoriesSheepSettings) => data.improve === territory.improve).storage;
          for (let i: number = 0; i < collectedWool; i += 1) {
            for (let i in Scene.state.sheep) {
              const sheep: Isheep = Scene.state.sheep[i];
              if (sheep.type !== 0 && sheep.wool >= 1000) {
                const sheepPoints: IsheepPoints = Scene.state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === sheep.type);
                if (max > territory.volume) {
                  let price: number = sheepPoints.long_wool;
                  if (Scene.state.userSheep.feedBoostTime > 0) price *= this.feedBoostMultiplier;
                  if (Scene.state.clan) {
                    const multiply: number = Scene.state.clan.sheep.cooldown > 0 ? 1 + ((Scene.state.clan.sheep.level - 1) / 100) : 1 + (Scene.state.clan.sheep.level / 100);
                    price *= multiply;
                  }
                  territory.volume += 1;
                  territory.money += price;
                  sheep.wool = 0;
                  collectedWool -= 1;
                  break;
                }
              }
            }
          }
        }
      }
    } else {
      sheepCollectorVolume = 0;
    }
  }
  return sheepCollectorVolume;
}

function chickenCollectorProgress(chickenCollectorVolume: number): number {
  const Scene: Sheep | Cow | Unicorn = this;
  if (Scene.state.progress.chicken.collector > 0 && Scene.state.userChicken.part > 0) {
    const speed: number = Scene.state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === Scene.state.userChicken.collectorLevel).speed;
    const SEC: number = 1000;
    chickenCollectorVolume += 2 * SEC;
    const collectedEggs: number = Math.floor(chickenCollectorVolume / speed / SEC);
    if (collectedEggs > 0) {
      chickenCollectorVolume -= collectedEggs * SEC;
      for (let i in Scene.state.chickenTerritories) {
        const territory: Iterritories = Scene.state.chickenTerritories[i];
        if (territory.type === 5) {
          const max: number = Scene.state.chickenSettings.territoriesChickenSettings.find((data: IterritoriesChickenSettings) => data.improve === territory.improve).storage;
          if (max > territory.volume) {
            const eggArray: IchickenEgg[] = Scene.state.chickenEggs.filter((el: IchickenEgg) => el.type !== 0);
            if (eggArray.length > 0) {
              for (let i: number = 0; i < collectedEggs; i += 1) {
                const egg: IchickenEgg = eggArray.shift();
                if (egg) {
                  let price: number = Scene.state.chickenSettings.chickenSettings.find((data: IchickenPoints) => data.breed === egg.type).eggPrice;
                  if (Scene.state.userChicken.feedBoostTime > 0) price *= this.feedBoostMultiplier;
                  if (Scene.state.clan) {
                    const multiply: number = Scene.state.clan.chicken.cooldown > 0 ? 1 + ((Scene.state.clan.chicken.level - 1) / 100) : 1 + (Scene.state.clan.chicken.level / 100);
                    price *= multiply;
                  }
                  territory.volume += 1;
                  territory.money += price;
                } else break;
              }
              Scene.state.chickenEggs = Scene.state.chickenEggs.filter((item: IchickenEgg) => eggArray.find(el => el._id === item._id) || item.type === 0);
            }
          }
        }
      }
    } else {
      chickenCollectorVolume = 0;
    }
  }
  return chickenCollectorVolume;
}

function cowCollectorProgress(cowCollectorVolume: number): number {
  const Scene: Sheep | Chicken | Unicorn = this;
  if (Scene.state.progress.cow.collector > 0 && Scene.state.userCow.part > 0) {
    const speed: number = Scene.state.cowCollectorSettings.find((data: IcollectorSettings) => data.level === Scene.state.userCow.collectorLevel).speed;
    const SEC: number = 1000;
    cowCollectorVolume += 2 * SEC;
    let collectedMilk: number = Math.floor(cowCollectorVolume / speed / SEC);
    if (collectedMilk > 0) {
      cowCollectorVolume -= collectedMilk * SEC;
      for (let i in Scene.state.cowTerritories) {
        const territory: Iterritories = Scene.state.cowTerritories[i];
        if (territory.type === 5) {
          const max: number = Scene.state.cowSettings.cowFactorySettings
            .find((data: IfactorySettings) => data.improve === territory.improve).lotSize * this.state.storageMultiply;
          if (territory.volume >= max) territory.volume = max;
          for (let i: number = 0; i < collectedMilk; i += 1) {
            for (const cow of Scene.state.cow) {
              const cowPoints: IcowPoints = Scene.state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === cow.type);
              if (cow.type !== 0 && cow.milk >= cowPoints.maxMilkVolume) {
                if (max > territory.volume) {
                  let price: number = 0;
                  if (Scene.state.userCow.feedBoostTime > 0) cow.milk *= this.feedBoostMultiplier;
                  if (Scene.state.clan) cow.milk *= (1 + (Scene.state.clan.chicken.level / 100));
                  territory.volume += cow.milk;
                  territory.money += price;
                  cow.milk = 0;
                  break;
                }
              }
            }
          }
        }
      }
    } else {
      cowCollectorVolume = 0;
    }
  }
  return cowCollectorVolume;
}

function cowFactoryProgress(): void {
  const Scene: Sheep | Chicken | Unicorn = this;
  if (Scene.state.progress.cow.part > 0) {
    const factory: Ifactory = Scene.state.userCow.factory;
    const factoryTerr: Iterritories = Scene.state.cowTerritories.find((data: Iterritories) => data.type === 8);
    if (!factoryTerr && this.state.userCow.tutorial < 40) return;
    const factorySettings: IfactorySettings = Scene.state.cowSettings.cowFactorySettings.find((data: IfactorySettings) => data.improve === factoryTerr.improve);
  
    if (factory.boostTime > 0) {
      factory.boostTime -= 1;
    }
    let resourceAmount: number = 0;
    if (factory.productionTimer <= 0) {
      if (factory.currentProduction) {
        const multiply: number = factory[`production${factory.currentProduction}Multiply`];
        factory[`production${factory.currentProduction}Money`] += factorySettings.lotSize * multiply;
        factory.money += factorySettings.lotSize * multiply;
        factory.currentProduction = undefined;
      } else {
        const storages: Iterritories[] = Scene.state.cowTerritories.filter((data: Iterritories) => data.type === 5);
        storages.forEach((storage: Iterritories) => {
          resourceAmount += storage.volume;
        });
        if (resourceAmount >= factorySettings.lotSize) {
          factory.productionTimer = factorySettings.processingTime;
          let lot: number = factorySettings.lotSize;
          for (const storage of storages) {
            if (storage.volume > lot) {
              storage.volume -= lot;
              lot = 0;
            } else {
              lot -= storage.volume;
              storage.volume = 0;
            }
          }
          const productId = getRandomProductId(factorySettings, factory.boostTime > 0);
          if (productId) {
            factory.currentProduction = productId;
          } 
        }
      }
    } else {
      factory.productionTimer -= 1;
    }
  }
}

function updateNotificationState(): void {

  if (this.state.progress.sheep.collector <= 0 && this.state.sheepNotificationCount[0] !== 1) this.state.sheepNotificationCount[0] = 1;
  else if (this.state.progress.sheep.collector > 0 && this.state.sheepNotificationCount[0] !== 0) this.state.sheepNotificationCount[0] = 0;

  const check: boolean = checkStorageSheep.bind(this)();
  if (check && this.state.sheepNotificationCount[1] !== 1) this.state.sheepNotificationCount[1] = 1;
  else if (!check && this.state.sheepNotificationCount[1] !== 0) this.state.sheepNotificationCount[1] = 0;

  if (this.state.userSheep.part >= 3 && this.state.userSheep.diamondAnimalTime <= 0 && this.state.sheepNotificationCount[2] !== 1) this.state.sheepNotificationCount[2] = 1;
  else if ((this.state.userSheep.part < 3 || this.state.userSheep.diamondAnimalTime > 0) && this.state.sheepNotificationCount[2] !== 0) this.state.sheepNotificationCount[2] = 0;

  if (this.state.userSheep.takenHerdBoost <= 0 && this.state.userSheep.part >= 5 && this.state.sheepNotificationCount[3] !== 1) this.state.sheepNotificationCount[3] = 1;
  else if (this.state.userSheep.takenHerdBoost > 0 && this.state.userSheep.part >= 5 && this.state.sheepNotificationCount[3] !== 0) this.state.sheepNotificationCount[3] = 0;

  if (this.state.userChicken.part > 0) {
    if (this.state.progress.chicken.collector <= 0 && this.state.chickenNotificationCount[0] !== 1) this.state.chickenNotificationCount[0] = 1;
    else if (this.state.progress.chicken.collector > 0 && this.state.chickenNotificationCount[0] !== 0) this.state.chickenNotificationCount[0] = 0;
  
    const check: boolean = checkStorageChicken.bind(this)();
  
    if (check && this.state.chickenNotificationCount[1] !== 1) this.state.chickenNotificationCount[1] = 1;
    else if (!check && this.state.chickenNotificationCount[1] !== 0) this.state.chickenNotificationCount[1] = 0;
    if (this.state.userChicken.part >= 3 && this.state.userChicken.diamondAnimalTime <= 0 && this.state.chickenNotificationCount[2] !== 1) this.state.chickenNotificationCount[2] = 1;
    else if ((this.state.userChicken.part < 3 || this.state.userChicken.diamondAnimalTime > 0) && this.state.chickenNotificationCount[2] !== 0) this.state.chickenNotificationCount[2] = 0;
    if (this.state.userChicken.takenHerdBoost <= 0 && this.state.userChicken.part >= 5 && this.state.chickenNotificationCount[3] !== 1) this.state.chickenNotificationCount[3] = 1;
    else if (this.state.userChicken.takenHerdBoost > 0 && this.state.userChicken.part >= 5 && this.state.chickenNotificationCount[3] !== 0) this.state.chickenNotificationCount[3] = 0;
  }

  if (this.state.userCow.part > 0) {
    if (this.state.progress.cow.collector <= 0 && this.state.cowNotificationCount[0] !== 1) this.state.cowNotificationCount[0] = 1;
    else if (this.state.progress.cow.collector > 0 && this.state.cowNotificationCount[0] !== 0) this.state.cowNotificationCount[0] = 0;
    
    const check: boolean = checkStorageCow.bind(this)();
    const checkFactory: boolean = this.state.userCow.tutorial >= 50 ? checkFactoryCow.bind(this)() : false;

    if (check && this.state.cowNotificationCount[1] !== 1) this.state.cowNotificationCount[1] = 1;
    else if (!check && this.state.cowNotificationCount[1] !== 0) this.state.cowNotificationCount[1] = 0;
    
    if (this.state.userCow.part >= 3 && this.state.userCow.diamondAnimalTime <= 0 && this.state.cowNotificationCount[2] !== 1) this.state.cowNotificationCount[2] = 1;
    else if ((this.state.userCow.part < 3 || this.state.userCow.diamondAnimalTime > 0) && this.state.cowNotificationCount[2] !== 0) this.state.cowNotificationCount[2] = 0;

    if (this.state.userCow.takenHerdBoost <= 0 && this.state.userCow.part >= 5 && this.state.cowNotificationCount[3] !== 1) this.state.cowNotificationCount[3] = 1;
    else if (this.state.userCow.takenHerdBoost > 0 && this.state.userCow.part >= 5 && this.state.cowNotificationCount[3] !== 0) this.state.cowNotificationCount[3] = 0;

    if (checkFactory && this.state.cowNotificationCount[4] !== 1) this.state.cowNotificationCount[4] = 1;
    else if (!checkFactory && this.state.cowNotificationCount[4] !== 0) this.state.cowNotificationCount[4] = 0;
  }

  if (
    this.state.progress.event.type === 1 &&
    this.state.progress.event.startTime < 0 && 
    this.state.progress.event.endTime > 0 &&
    this.state.progress.event.open && 
    this.state.userUnicorn.tutorial > 0 &&
    (this.state.user.login || this.state.name) &&
    (this.state.progress.sheep.part > 4 ||
    this.state.progress.chicken.part >= 1 ||
    this.state.progress.cow.part >= 1)
  ) {
    if (this.state.userUnicorn.collector <= 0 && this.state.unicornNotificationCount[0] !== 1) this.state.unicornNotificationCount[0] = 1;
    else if (this.state.userUnicorn.collector > 0 && this.state.unicornNotificationCount[0] !== 0) this.state.unicornNotificationCount[0] = 0;
  }

}

function updateProfileNotification(load: boolean = false): void {
  updateNotificationState.bind(this)();
  updateMapNotification.bind(this)();
  if (!this.scene.isActive('Profile') && !load) return;

  const Profile: Profile = this.game.scene.keys['Profile'];
  if (Profile.sheepNotificator) {
    const count: number = this.state.sheepNotificationCount.reduce((prev, cur) => prev += cur);
    Profile.sheepNotificator.setCount(count);
  }

  if (Profile.chickenNotificator) {
    const count: number = this.state.chickenNotificationCount.reduce((prev, cur) => prev += cur);
    Profile.chickenNotificator.setCount(count);
  }
  
  if (Profile.cowNotificator) {
    const count: number = this.state.cowNotificationCount.reduce((prev, cur) => prev += cur);
    Profile.cowNotificator.setCount(count);
  }

  if (Profile.unicornNotificator) {
    const count: number = this.state.unicornNotificationCount.reduce((prev, cur) => prev += cur);
    Profile.unicornNotificator.setCount(count);
  }
}

function updateMapNotification(): void {
  const sheepCount: number = this.state.sheepNotificationCount.reduce((prev, cur) => prev += cur);
  const chickenCount: number = this.state.chickenNotificationCount.reduce((prev, cur) => prev += cur);
  const cowCount: number = this.state.cowNotificationCount.reduce((prev, cur) => prev += cur);
  const unicornCount: number = this.state.unicornNotificationCount.reduce((prev, cur) => prev += cur);

  const checkSocial: boolean[] = [];
  const socialTask: IsociaTasks = this.state.platform === 'vk' ? this.state.vkTask :
  this.state.platform === 'ok' ? this.state.okTask : {}; 

  for (const key in socialTask) {
    checkSocial.push(socialTask[key]);
  }
  let socialCount: number = checkSocial.length - checkSocial.filter(el => el).length;
  if (socialCount <= 0 && !this.state.user.takenSocialAward && (this.state.platform === 'vk' || this.state.platform === 'ok')) {
    socialCount = 1;
    this.state.shownSocialTaskWindow = false;
  }
  const clanCount: number = this.state.user.clanTasks?.filter(el => el.done && !el.got_awarded).length;
  if (this.state.userSheep.tutorial < 100 || this.state.shownSocialTaskWindow) socialCount = 0;
  const count: number = this.state.farm === 'Sheep' ? chickenCount + cowCount + unicornCount + socialCount + clanCount:
  this.state.farm === 'Chicken' ? sheepCount + cowCount + unicornCount + socialCount + clanCount:
  this.state.farm === 'Cow' ? sheepCount + chickenCount + unicornCount + socialCount + clanCount:
  this.state.farm === 'Unicorn' && this.state.userUnicorn.tutorial >= 80 ? sheepCount + chickenCount + cowCount + socialCount + clanCount: 0;

  this.game.scene.keys[`${this.state.farm}Bars`].mapNotificator.setCount(count);
}

function checkStorageSheep(): boolean {
  const check: boolean[] = [];
  if (this.state.farm === 'Sheep') {
    for (const territory of this.territories.children.entries) {
      if (territory.territoryType === 5) {
        const max: number = this.state.sheepSettings.territoriesSheepSettings.find(el => el.improve === territory.improve).storage;
        check.push(territory.volume >= max); 
      }
    }
  } else {
    for (const territory of this.state.sheepTerritories) {
      if (territory.type === 5) {
        const max: number = this.state.sheepSettings.territoriesSheepSettings.find(el => el.improve === territory.improve).storage;
        check.push(territory.volume >= max); 
      }
    }
  }
  return check.length > 0 ? check.every(el => el) : false;
}

function checkStorageChicken(): boolean {
  const check: boolean[] = [];
  if (this.state.farm === 'Chicken') {
    for (const territory of this.territories.children.entries) {
      if (territory.territoryType === 5) {
        const max: number = this.state.chickenSettings.territoriesChickenSettings.find(el => el.improve === territory.improve).storage;
        check.push(territory.volume >= max); 
      }
    }
  } else {
    for (const territory of this.state.chickenTerritories) {
      if (territory.type === 5) {
        const max: number = this.state.chickenSettings.territoriesChickenSettings.find(el => el.improve === territory.improve).storage;
        check.push(territory.volume >= max); 
      }
    }
  }
  return check.length > 0 ? check.every(el => el) : false;
}

function checkStorageCow(): boolean {
  const check: boolean[] = [];
  if (this.state.farm === 'Cow') {
    for (const territory of this.territories.children.entries) {
      if (territory.territoryType === 5) {
        const max: number = this.state.cowSettings.cowFactorySettings.find(el => el.improve === territory.improve).lotSize * this.state.storageMultiply;
        check.push(territory.volume >= max); 
      }
    }
  } else {
    for (const territory of this.state.cowTerritories) {
      if (territory.type === 5) {
        const max: number = this.state.cowSettings.cowFactorySettings.find(el => el.improve === territory.improve).lotSize * this.state.storageMultiply;
        check.push(territory.volume >= max); 
      }
    }
  }
  return check.length > 0 ? check.every(el => el) : false;
}

function checkFactoryCow(): boolean {
  if (this.state.farm === 'Cow') {
    const factory: Factory = this.territories.children.entries.find(el => el.territoryType === 8)?.factory;
    return factory.money > 0 && !factory.currentProduction;
  } 

  return this.state.userCow.factory.money > 0 && !this.state.userCow.factory.currentProduction;
}

function intervalPorgressCollectorTime(): void {

  if (this.state.farm === 'Sheep') {
    this.state.progress.sheep.collector = this.state.userSheep.collector;
    if (this.state.progress.chicken.collector > 0) this.state.progress.chicken.collector--;
    if (this.state.progress.cow.collector > 0) this.state.progress.cow.collector--;
    this.state.userChicken.collector = this.state.progress.chicken.collector;
    this.state.userCow.collector = this.state.progress.cow.collector;
  } else if (this.state.farm === 'Chicken') {
    this.state.progress.chicken.collector = this.state.userChicken.collector;
    if (this.state.progress.sheep.collector > 0) this.state.progress.sheep.collector--;
    if (this.state.progress.cow.collector > 0) this.state.progress.cow.collector--;
    this.state.userSheep.collector = this.state.progress.sheep.collector;
    this.state.userCow.collector = this.state.progress.cow.collector;
  } else if (this.state.farm === 'Cow') {
    this.state.progress.cow.collector = this.state.userCow.collector;
    if (this.state.progress.sheep.collector > 0) this.state.progress.sheep.collector--;
    if (this.state.progress.chicken.collector > 0) this.state.progress.chicken.collector--;
    this.state.userSheep.collector = this.state.progress.sheep.collector;
    this.state.userChicken.collector = this.state.progress.chicken.collector;
  } else if (this.state.farm === 'Unicorn') {
    if (this.state.progress.chicken.collector > 0) this.state.progress.chicken.collector--;
    if (this.state.progress.sheep.collector > 0) this.state.progress.sheep.collector--;
    if (this.state.progress.cow.collector > 0) this.state.progress.cow.collector--;
    this.state.userSheep.collector = this.state.progress.sheep.collector;
    this.state.userChicken.collector = this.state.progress.chicken.collector;
    this.state.userCow.collector = this.state.progress.cow.collector;
  }

  if (this.state.userUnicorn?.collector > 0 && this.state.farm !== 'Unicorn') this.state.userUnicorn.collector--

  if (this.state.userSheep.diamondAnimalTime > 0) this.state.userSheep.diamondAnimalTime--;
  if (this.state.userChicken.diamondAnimalTime > 0) this.state.userChicken.diamondAnimalTime--;
  if (this.state.userCow.diamondAnimalTime > 0) this.state.userCow.diamondAnimalTime--;

}

function intervalCollectorTutorial(arrowOnCollector: Phaser.GameObjects.Sprite): void {
  const DELAY: number = 10;
  if (this.state.user.additionalTutorial.collector || this.state.farm !== 'Sheep') {

    if (this.state[`user${this.state.farm}`].collector === 0 &&
      !arrowOnCollector &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile') &&
      !this.scene.isActive('Fortune')) {

      this.counterWithoutCollector++;
      if (this.counterWithoutCollector >= DELAY) {
        this.counterWithoutCollector = 0;
        arrowOnCollector = Arrow.generate(this.game.scene.keys[`${this.state.farm}Bars`], 18);
      }
    }
  } else {
    if ((this.state.userSheep.tutorial >= 100 && this.state.farm === 'Sheep') && this.state[`user${this.state.farm}`].collector === 0 && !this.scene.isActive('Tutorial')) {
      this.counterWithoutCollector++;
      if (this.counterWithoutCollector >= DELAY &&
        this.state[`user${this.state.farm}`].part >= 2 &&
        !this.scene.isActive('Modal') &&
        !this.scene.isActive('Tutorial') &&
        !this.scene.isActive('Profile') &&
        !this.scene.isActive('Fortune')) {

        this.counterWithoutCollector = 0;
        this.state.user.additionalTutorial.collector = true;
        this.showTutorial('collector');
      }
    }
  }
  if (arrowOnCollector && this.state[`user${this.state.farm}`].collector > 0) this.counterWithoutCollector = 0;
}

function showFeedBoostSpeechBubble(): void {
  const DELAY: number = 300;
  if (this.feedBoostRemaindTimer < DELAY && 
    this.state[`user${this.state.farm}`].feedBoostTime <= 0 && 
    this.state.user.additionalTutorial.feedBoost && 
    this.state[`user${this.state.farm}`].part > 5) this.feedBoostRemaindTimer++;
  else if (this.feedBoostRemaindTimer >= DELAY) {
    this.feedBoostRemaindTimer = 0;
    SpeechBubble.create(this.game.scene.keys[`${this.state.farm}Bars`], this.state.lang[`feedBoostSpeechBubble${this.state.farm}`], 3);
  }
}

function progressClanEventTime(state: Istate, time: number = 1): void {
  if (state.clan) {
    if (state.progress.clanEvent.endTime > 0) {
      state.progress.clanEvent.endTime -= time;
    } else if (state.progress.clanEvent.endTime === 0) {
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
    if (state.progress.clanEvent.startTime > 0) {
      state.progress.clanEvent.startTime -= time;
    }
  }
}

function showSale(scene: Sheep | Chicken | Cow): void {
  const checkInactiveScenes = !scene.scene.isActive('Tutorial')
  && !scene.scene.isActive('Modal')
  && !scene.scene.isActive('Profile')
  && !scene.scene.isActive('Fortune')
  && !scene.scene.isActive('Block');
  
  if (checkInactiveScenes && scene.state.userSheep.part > 4) {
    const sale = scene.state.sales.find(el => !el.shown && el.startTime <= 0 && el.endTime > 0);
    if (sale) {
      sale.shown = true;
      scene.state.modal = {
        type: 23,
        message: sale.type,
      };
      scene.scene.launch('Modal', scene.state);
    }
  }

}

export {
  sheepIntervalProgress,
  chickenIntervalProgress,
  cowIntervalProgress,
  sheepCollectorProgress,
  chickenCollectorProgress,
  cowCollectorProgress,
  cowFactoryProgress,
  updateProfileNotification,
  intervalPorgressCollectorTime,
  intervalCollectorTutorial,
  showFeedBoostSpeechBubble,
  progressTerritoryCooldown,
  progressClanCooldown,
  progressSalesTime,
  progressClanEventTime,
  showSale,
}