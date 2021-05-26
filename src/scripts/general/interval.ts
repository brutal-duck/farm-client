import Sheep from './../scenes/Sheep/Main';
import Chicken from './../scenes/Chicken/Main';
import Unicorn from './../scenes/Event/Unicorns/Main';
import Cow from './../scenes/Cow/Main';
import Profile from './../scenes/Profile';
import Arrow from './../components/animations/Arrow';
import SpeechBubble from './../components/animations/SpeechBuble';

const progressTerritoryCooldown = (territories: any, time: number): void => {
  for (const territory of territories) {
    if (territory.cooldown > 0) {
      territory.cooldown -= time;
      if (territory.cooldown <= 0) territory.cooldown = 0;
    }
  }
}

const getRandomProductId = (settings: IfactorySettings, boost: boolean): number => {
  const pull: number[] = [ settings.production1Percent, settings.production2Percent, settings.production3Percent ];
  if (boost) pull.push(settings.production4Percent);

  const totalCounter: number = pull.reduce((prev, current) => prev += current);
  const arrRange: {
    id: number,
    bottom: number,
    top: number
  }[] = [];

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
  progressTerritoryCooldown(Scene.state.sheepTerritories, 1);
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

  progressTerritoryCooldown(Scene.state.chickenTerritories, 1);

  if (Scene.state.userChicken.part > 0) {
    for (let i in Scene.state.chicken) {
      const chicken: Ichicken = Scene.state.chicken[i];
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
        const block: number = Math.ceil((chicken.x - 240) / this.height);
        const position: number = Math.ceil(chicken.y / this.height);
        const territory = this.state.chickenTerritories.find((data: Iterritories) => data.block === block && data.position === position);
        
        if (territory) {
          const countEggs: number = chickenSettings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).countEggs;
          let eggs: number = 0;
          for (let i in Scene.state.chickenEggs) {
            const egg = Scene.state.chickenEggs[i];
            const block: number = Math.ceil((egg.x - 240) / this.height);
            const position: number = Math.ceil(egg.y / this.height);
            const ter = this.state.chickenTerritories.find((data: Iterritories) => data.block === block && data.position === position);
            if (ter?.block === territory.block && ter?.position === territory.position) eggs++;
          }
  
          if ((eggs < countEggs || chicken.type === 0) && (territory.type === 2 || territory.type === 3)) {
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
            if (chicken.type === 0) chicken.diamond++;
            if (chicken.diamond >= 3 && chicken.type === 0) {
              Scene.state.chicken = Scene.state.chicken.filter((el: Ichicken)=> el._id !== chicken._id);
            }
          }
        }
      }
    }
  }
}

function cowIntervalProgress(): void {
  const Scene: Sheep | Chicken | Unicorn = this;
  const MILK_DELAY: number = 60;
  const cowBalance: Ibalance = Scene.farmBalance('Cow');
  const cowSettings: IcowSettings = Scene.state.cowSettings;

  progressTerritoryCooldown(Scene.state.cowTerritories, 1);

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

function sheepCollectorProgress(sheepCollectorVolume: number): void {
  const Scene: Chicken | Cow | Unicorn = this;
  if (Scene.state.progress.sheep.collector > 0) {
    const speed: number = Scene.state.sheepCollectorSettings.find((data: IcollectorSettings) => data.level === Scene.state.userSheep.collectorLevel).speed;
    const SEC: number = 1000;
    sheepCollectorVolume += 2 * SEC;
    let collectedWool: number = Math.floor(sheepCollectorVolume / speed / SEC);
    if (collectedWool > 0) {
      sheepCollectorVolume -= collectedWool * speed * SEC;
      for (let i in Scene.state.sheepTerritories) {
        const territory: Iterritories = Scene.state.sheepTerritories[i];
        if (territory.type === 5) {
          const max: number = Scene.state.sheepSettings.territoriesSheepSettings.find((data: IterritoriesSheepSettings) => data.improve === territory.improve).woolStorage;
          for (let i: number = 0; i < collectedWool; i += 1) {
            for (let i in Scene.state.sheep) {
              const sheep: Isheep = Scene.state.sheep[i];
              if (sheep.type !== 0 && sheep.wool >= 1000) {
                const sheepPoints: IsheepPoints = Scene.state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === sheep.type);
                if (max > territory.volume) {
                  let price: number = sheepPoints.long_wool;
                  if (Scene.state.userSheep.feedBoostTime > 0) price *= this.feedBoostMultiplier;
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
}

function chickenCollectorProgress(chickenCollectorVolume: number): void {
  const Scene: Sheep | Cow | Unicorn = this;
  if (Scene.state.progress.chicken.collector > 0 && Scene.state.userChicken.part > 0) {
    const speed: number = Scene.state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === Scene.state.userChicken.collectorLevel).speed;
    const SEC: number = 1000;
    chickenCollectorVolume += 2 * SEC;
    const collectedEggs: number = Math.floor(chickenCollectorVolume / speed / SEC);
    if (collectedEggs > 0) {
      chickenCollectorVolume -= collectedEggs * speed * SEC;
      for (let i in Scene.state.chickenTerritories) {
        const territory: Iterritories = Scene.state.chickenTerritories[i];
        if (territory.type === 5) {
          const max: number = Scene.state.chickenSettings.territoriesChickenSettings.find((data: IterritoriesChickenSettings) => data.improve === territory.improve).eggStorage;
          if (max > territory.volume) {
            const eggArray: IchickenEgg[] = Scene.state.chickenEggs.filter((el: IchickenEgg) => el.type !== 0);
            if (eggArray.length > 0) {
              for (let i: number = 0; i < collectedEggs; i += 1) {
                const egg: IchickenEgg = eggArray.shift();
                if (egg) {
                  let price: number = Scene.state.chickenSettings.chickenSettings.find((data: IchickenPoints) => data.breed === egg.type).eggPrice;
                  if (Scene.state.userChicken.feedBoostTime > 0) price *= this.feedBoostMultiplier;
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
}

function cowCollectorProgress(cowCollectorVolume: number): void {
  const Scene: Sheep | Chicken | Unicorn = this;
  if (Scene.state.progress.cow.collector > 0 && Scene.state.userCow.part > 0) {
    const speed: number = Scene.state.cowCollectorSettings.find((data: IcollectorSettings) => data.level === Scene.state.userCow.collectorLevel).speed;
    const SEC: number = 1000;
    cowCollectorVolume += 2 * SEC;
    let collectedMilk: number = Math.floor(cowCollectorVolume / speed / SEC);
    if (collectedMilk > 0) {
      cowCollectorVolume -= collectedMilk * speed * SEC;
      for (let i in Scene.state.cowTerritories) {
        const territory: Iterritories = Scene.state.cowTerritories[i];
        if (territory.type === 5) {
          const max: number = Scene.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === territory.improve).storage;
          for (let i: number = 0; i < collectedMilk; i += 1) {
            for (const cow of Scene.state.cow) {
              const cowPoints: IcowPoints = Scene.state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === cow.type);
              if (cow.type !== 0 && cow.milk >= cowPoints.maxMilkVolume) {
                const cowPoints: IcowPoints = Scene.state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === cow.type);
                if (max > territory.volume + cowPoints.maxMilkVolume) {
                  let price: number = 0;
                  if (Scene.state.userCow.feedBoostTime > 0) price *= this.feedBoostMultiplier;
                  territory.volume += cow.milk;
                  territory.money += price;
                  cow.milk = 0;
                  collectedMilk -= 1;
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
}

function cowFactoryProgress(): void {
  const Scene: Sheep | Chicken | Unicorn = this;
  if (Scene.state.progress.cow.part > 0) {
    const factory: Ifactory = Scene.state.userCow.factory;
    const factoryTerr: Iterritories = Scene.state.cowTerritories.find((data: Iterritories) => data.type === 8);
    if (!factoryTerr) return;
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

function updateProfileNative(load: boolean = false): void {
  if (!this.scene.isActive('Profile') && !load) return;

  const Profile: Profile = this.game.scene.keys['Profile'];
  if (Profile.sheepNativeText) {
    if (Profile.state.progress.sheep.collector <= 0 && Profile.sheepNativeCount[0] !== 1) Profile.sheepNativeCount[0] = 1;
    else if (Profile.state.progress.sheep.collector > 0 && Profile.sheepNativeCount[0] !== 0) Profile.sheepNativeCount[0] = 0;

    const check: boolean = checkStorageSheep.bind(this)();
    if (check && Profile.sheepNativeCount[1] !== 1) Profile.sheepNativeCount[1] = 1;
    else if (!check && Profile.sheepNativeCount[1] !== 0) Profile.sheepNativeCount[1] = 0;

    if (Profile.state.userSheep.part >= 3 && Profile.state.userSheep.diamondAnimalTime <= 0 && Profile.sheepNativeCount[2] !== 1) Profile.sheepNativeCount[2] = 1;
    else if ((Profile.state.userSheep.part < 3 || Profile.state.userSheep.diamondAnimalTime > 0) && Profile.sheepNativeCount[2] !== 0) Profile.sheepNativeCount[2] = 0;

    if (Profile.state.userSheep.takenHerdBoost <= 0 && Profile.state.userSheep.part >= 5 && Profile.sheepNativeCount[3] !== 1) Profile.sheepNativeCount[3] = 1;
    else if (Profile.state.userSheep.takenHerdBoost > 0 && Profile.state.userSheep.part >= 5 && Profile.sheepNativeCount[3] !== 0) Profile.sheepNativeCount[3] = 1;


    const count: number = Profile.sheepNativeCount.reduce((prev, cur) => prev += cur);
    if (Profile.sheepNativeText.text !== String(count)) {
      Profile.sheepNativeText.setText(String(count));
    }
    if (count <= 0 && Profile.sheepNativeText.visible) {
      Profile.sheepNativeText.setVisible(false);
      Profile.sheepNativeBg.setVisible(false);
    } else if (count > 0 && !Profile.sheepNativeText.visible) {
      Profile.sheepNativeText.setVisible(true);
      Profile.sheepNativeBg.setVisible(true);
    }
  }

  if (Profile.chickenNativeText) {
    if (Profile.state.progress.chicken.collector <= 0 && Profile.chickenNativeCount[0] !== 1) Profile.chickenNativeCount[0] = 1;
    else if (Profile.state.progress.chicken.collector > 0 && Profile.chickenNativeCount[0] !== 0) Profile.chickenNativeCount[0] = 0;

    const check: boolean = checkStorageChicken.bind(this)();
    if (check && Profile.chickenNativeCount[1] !== 1) Profile.chickenNativeCount[1] = 1;
    else if (!check && Profile.chickenNativeCount[1] !== 0) Profile.chickenNativeCount[1] = 0;

    if (Profile.state.userChicken.part >= 3 && Profile.state.userChicken.diamondAnimalTime <= 0 && Profile.chickenNativeCount[2] !== 1) Profile.chickenNativeCount[2] = 1;
    else if ((Profile.state.userChicken.part < 3 || Profile.state.userChicken.diamondAnimalTime > 0) && Profile.chickenNativeCount[2] !== 0) Profile.chickenNativeCount[2] = 0;

    if (Profile.state.userChicken.takenHerdBoost <= 0 && Profile.state.userChicken.part >= 5 && Profile.chickenNativeCount[3] !== 1) Profile.chickenNativeCount[3] = 1;
    else if (Profile.state.userChicken.takenHerdBoost > 0 && Profile.state.userChicken.part >= 5 && Profile.chickenNativeCount[3] !== 0) Profile.chickenNativeCount[3] = 1;

    const count: number = Profile.chickenNativeCount.reduce((prev, cur) => prev += cur);
    if (Profile.chickenNativeText.text !== String(count)) {
      Profile.chickenNativeText.setText(String(count));
    }
    if (count <= 0 && Profile.chickenNativeText.visible) {
      Profile.chickenNativeText.setVisible(false);
      Profile.chickenNativeBg.setVisible(false);
    } else if (count > 0 && !Profile.chickenNativeText.visible) {
      Profile.chickenNativeText.setVisible(true);
      Profile.chickenNativeBg.setVisible(true);
    }
  }
  
  if (Profile.cowNativeText) {
    if (Profile.state.progress.cow.collector <= 0 && Profile.cowNativeCount[0] !== 1) Profile.cowNativeCount[0] = 1;
    else if (Profile.state.progress.cow.collector > 0 && Profile.cowNativeCount[0] !== 0) Profile.cowNativeCount[0] = 0;
    
    const check: boolean = checkStorageCow.bind(this)();
    if (check && Profile.cowNativeCount[1] !== 1) Profile.cowNativeCount[1] = 1;
    else if (!check && Profile.cowNativeCount[1] !== 0) Profile.cowNativeCount[1] = 0;
    
    if (Profile.state.userCow.part >= 3 && Profile.state.userCow.diamondAnimalTime <= 0 && Profile.cowNativeCount[2] !== 1) Profile.cowNativeCount[2] = 1;
    else if ((Profile.state.userCow.part < 3 || Profile.state.userCow.diamondAnimalTime > 0) && Profile.cowNativeCount[2] !== 0) Profile.cowNativeCount[2] = 0;

    if (Profile.state.userCow.takenHerdBoost <= 0 && Profile.state.userCow.part >= 5 && Profile.cowNativeCount[3] !== 1) Profile.cowNativeCount[3] = 1;
    else if (Profile.state.userCow.takenHerdBoost > 0 && Profile.state.userCow.part >= 5 && Profile.cowNativeCount[3] !== 0) Profile.cowNativeCount[3] = 1;

    const count: number = Profile.cowNativeCount.reduce((prev, cur) => prev += cur);
    if (Profile.cowNativeText.text !== String(count)) {
      Profile.cowNativeText.setText(String(count));
    }
    if (count <= 0 && Profile.cowNativeText.visible) {
      Profile.cowNativeText.setVisible(false);
      Profile.cowNativeBg.setVisible(false);
    } else if (count > 0 && !Profile.cowNativeText.visible) {
      Profile.cowNativeText.setVisible(true);
      Profile.cowNativeBg.setVisible(true);
    }
  }
}

function checkStorageSheep(): boolean {
  const check: boolean[] = [];
  if (this.state.farm === 'Sheep') {
    for (const territory of this.territories.children.entries) {
      if (territory.type === 5) {
        const max: number = this.state.sheepSettings.territoriesSheepSettings.find(el => el.improve === territory.improve).woolStorage;
        check.push(territory.volume >= max); 
      }
    }
  } else {
    for (const territory of this.state.sheepTerritories) {
      if (territory.type === 5) {
        const max: number = this.state.sheepSettings.territoriesSheepSettings.find(el => el.improve === territory.improve).woolStorage;
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
      if (territory.type === 5) {
        const max: number = this.state.chickenSettings.territoriesChickenSettings.find(el => el.improve === territory.improve).eggStorage;
        check.push(territory.volume >= max); 
      }
    }
  } else {
    for (const territory of this.state.chickenTerritories) {
      if (territory.type === 5) {
        const max: number = this.state.chickenSettings.territoriesChickenSettings.find(el => el.improve === territory.improve).eggStorage;
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
      if (territory.type === 5) {
        const max: number = this.state.cowSettings.territoriesCowSettings.find(el => el.improve === territory.improve).storage;
        check.push(territory.volume >= max); 
      }
    }
  } else {
    for (const territory of this.state.cowTerritories) {
      if (territory.type === 5) {
        const max: number = this.state.cowSettings.territoriesCowSettings.find(el => el.improve === territory.improve).storage;
        check.push(territory.volume >= max); 
      }
    }
  }
  return check.length > 0 ? check.every(el => el) : false;
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

  if (this.state.userSheep.diamondAnimalTime > 0) this.state.userSheep.diamondAnimalTime--;
  if (this.state.userChicken.diamondAnimalTime > 0) this.state.userChicken.diamondAnimalTime--;
  if (this.state.userCow.diamondAnimalTime > 0) this.state.userCow.diamondAnimalTime--;

}

function intervalCollectorTutorial(arrowOnCollector: Phaser.GameObjects.Sprite): void {
  const DELAY: number = 10;

  if (this.state.user.additionalTutorial.collector) {

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
  else if (this.feedBoostRemaindTimer >= DELAY){
    this.feedBoostRemaindTimer = 0;
    SpeechBubble.create(this.game.scene.keys[`${this.state.farm}Bars`], this.state.lang[`feedBoostSpeechBuble${this.state.farm}`], 3);
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
  updateProfileNative,
  intervalPorgressCollectorTime,
  intervalCollectorTutorial,
  showFeedBoostSpeechBubble,
  progressTerritoryCooldown,
}