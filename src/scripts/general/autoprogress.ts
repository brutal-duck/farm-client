import BigInteger from '../libs/BigInteger';
import Egg from './../components/Resource/Egg';
import { randomString } from './basic';
import CowSprite from './../components/Animal/CowSprite';
import Territory from './../components/Territories/Territory';
import Factory from './../components/Territories/Factory';

export default function autoprogress(load: boolean = false): void {
  const state: Istate = this.state;
  
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

  // овцы
  const sheepOfflineProgress = (offlineTime: number = state.progress.sheep.offlineTime): void => {
    if (state.userSheep.diamondAnimalTime >= offlineTime) state.userSheep.diamondAnimalTime -= offlineTime;
    else {
      state.userSheep.diamondAnimalTime = 0;
      state.userSheep.diamondAnimalAd = true;
    }
  
    // время буста комбикорм
    let wasFeedBoost: number = 0;
  
    if (state.userSheep.feedBoostTime >= offlineTime) {
      state.userSheep.feedBoostTime -= offlineTime;
      wasFeedBoost = offlineTime;
    } else {
      wasFeedBoost = state.userSheep.feedBoostTime;
      state.userSheep.feedBoostTime = 0;
    }
  
    // время собирателя
    let wasCollector: number = 0;
  
    if (state.userSheep.collector >= offlineTime) {
      state.userSheep.collector -= offlineTime;
      wasCollector = offlineTime;
    } else {
      wasCollector = state.userSheep.collector;
      state.userSheep.collector = 0;
    }
    
    // процент шерсти под бустом
    let feedPercent: number = Number((wasFeedBoost / wasCollector).toFixed(2));
    if (feedPercent >= 1 ) feedPercent = 1;
  
    // считаем сколько раз подстригли овец
    let balance: Ibalance = this.farmBalance('Sheep');
    let sheepWoolcuts: { id: string, type: number, count: number }[] = [];

    for (let i in state.sheep) {
      let sheep: Isheep = state.sheep[i];
      let breed: number;
      if (sheep.type === 0) breed = 1;
      else breed = sheep.type;
      let points: IsheepPoints = state.sheepSettings.sheepSettings.find((item: IsheepPoints) => item.breed === breed);
      let wool: number = points.wool_growth;
      if (balance.alarm) {
        wool = Math.round(wool / 100 * state.sheepSettings.sheepBadPercent);
        if (wool < 1) wool = 1;
      }
      let woolcuts: number = Math.floor((wool * wasCollector) / 1000);
      if (woolcuts === 0) {
        if (sheep.wool + (wool * wasCollector) > 1000) sheep.wool = 1000;
        else sheep.wool += (wool * wasCollector);
      }
      if (state.userSheep.collector === 0) {
        sheep.wool = 1000;
      }
      if (sheep.type !== 0) {
        sheepWoolcuts.push({
          id: sheep._id,
          type: sheep.type,
          count: woolcuts
        });
      }
    }
  
    // скорость сборки
    let speed: number = state.sheepCollectorSettings.find((data: IcollectorSettings) => data.level === state.userSheep.collectorLevel).speed;
  
    if (state.sheep.length > speed * 10) {
      let excess: number = 100 / (speed * 10) * state.sheep.length;
      let percent: number = 100 / (excess / 100);
      for (let i in sheepWoolcuts) {
        if (sheepWoolcuts[i].count > 0) {
          sheepWoolcuts[i].count = Math.round(sheepWoolcuts[i].count / 100 * percent);
        }
      }
    }
    // заполняем хранилища
    let wool: number[] = [];
    for (let i in sheepWoolcuts) {
      for (let j: number = 0; j < sheepWoolcuts[i].count; j++) {
        wool.push(sheepWoolcuts[i].type);
      }
    }
  
    for (let i in wool) {
      let price: number = state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === wool[i]).long_wool;
      price *= (1 + feedPercent); // коэфф
      for (const territory of state.sheepTerritories) {
        if (territory.type === 5) {
          let max: number = state.sheepSettings.territoriesSheepSettings.find((item: IterritoriesSheepSettings) => item.improve === territory.improve).woolStorage;
          if (territory.volume < max) {
            let sheep = sheepWoolcuts.find(data => data.type === wool[i] && data.count > 0);
            if (sheep?.count > 0) sheep.count--;
            territory.money += price;
            territory.volume++;
            break;
          } else {
            territory.volume = max; 
          }
        }
      }
    }
    
    // если есть остаток, то овцы пушистые
    for (let i in sheepWoolcuts) {
      if (sheepWoolcuts[i].count > 0) {
        let sheep = state.sheep.find((data: any) => data._id === sheepWoolcuts[i].id);
        sheep.wool = 1000;
      }
    }
  }

  const chickenOfflineProgress = (offlineTime: number = state.progress.chicken.offlineTime): void => {
    // значение отступа для яиц, чтоб не прилегали к краям территории
    let indent: number = 20;
  
    // время кристаллической курочки
    if (state.userChicken.diamondAnimalTime >= offlineTime) state.userChicken.diamondAnimalTime -= offlineTime;
    else {
      state.userChicken.diamondAnimalTime = 0;
      state.userChicken.diamondAnimalAd = true;
    }
     // время буста комбикорм
     let wasFeedBoost: number = 0;
  
     if (state.userChicken.feedBoostTime >= offlineTime) {
       state.userChicken.feedBoostTime -= offlineTime;
       wasFeedBoost = offlineTime;
     } else {
       wasFeedBoost = state.userChicken.feedBoostTime;
       state.userChicken.feedBoostTime = 0;
     }
  
    // время собирателя
    let wasCollector: number = 0;
  
    if (state.userChicken.collector >= offlineTime) {
      state.userChicken.collector -= offlineTime;
      wasCollector = offlineTime;
    } else {
      wasCollector = state.userChicken.collector;
      state.userChicken.collector = 0;
    }
  
    // процент шерсти под бустом
    let feedPercent: number = Number((wasFeedBoost / wasCollector).toFixed(2));
    if (feedPercent >= 1 ) feedPercent = 1;
    
    // считаем сколько снесла курица яйцо
    let balance: Ibalance = this.farmBalance('Chicken');
    let newEggs: { egg: boolean, id: string, type: number, count: number }[] = [];
  
    for (let i in state.chicken) {
  
      let chicken = state.chicken[i];
      let breed: number;
  
      if (chicken.type === 0) breed = 1;
      else breed = chicken.type;
  
      let points: IchickenPoints = state.chickenSettings.chickenSettings.find((item: IchickenPoints) => item.breed === breed);
  
      let egg: number = points.egg;
  
      if (balance.alarm) {
        egg = Math.round(egg / 100 * state.chickenSettings.chickenBadPercent);
        if (egg < 1) egg = 1;
      }
  
      let eggsCollect: number = Math.floor((egg * wasCollector) / 1000);
  
      if (eggsCollect === 0) {
        if (chicken.egg + (eggsCollect * wasCollector) > 1000) chicken.egg = 1000;
        else chicken.egg += (eggsCollect * wasCollector);
      }
      
      if (state.userChicken.collector === 0) {
        chicken.egg = Phaser.Math.Between(0, 1000);
      }
  
      newEggs.push({
        id: chicken._id,
        type: chicken.type,
        count: eggsCollect,
        egg: false
      });
  
    }
    
    // добавляем в массив яйца, которые могут лежать на поле
    for (let i in state.chickenEggs) {
      let egg = state.chickenEggs[i];
      if (egg.type !== 0) {
        newEggs.push({
          id: egg._id,
          type: egg.type,
          count: 1,
          egg: true
        });
      }
    }
  
    // берем кристаллические курицы если есть и формируем обновленный массив
    let eggs: { egg: boolean, id: string, type: number, count: number }[] = [];
    for (let i in newEggs) {
      if (newEggs[i].type !== 0) {
        eggs.push(newEggs[i]);
      } else {
        let chicken = state.chicken.find((data: any) => data._id === newEggs[i].id);
        if (chicken) {
          const block: number = Math.ceil((chicken.x - 240) / this.height);
          const position: number = Math.ceil(chicken.y / this.height);
          const territory = state.chickenTerritories.find((data: Iterritories) => data.block === block && data.position === position);

          if (territory) {
            let count: number = 0;
            let minX: number = (territory.position - 1) * 240 + indent;
            let maxX: number = territory.position * 240 - indent;
            let minY: number = territory.block * 240 + indent;
            let maxY: number = (territory.block + 1) * 240 - indent;
    
            if (newEggs[i].count < chicken.diamond) {
              chicken.diamond -= newEggs[i].count;
              count = newEggs[i].count;
            } else {
              count = 5 - chicken.diamond;
              state.chicken = state.chicken.filter((el: Ichicken) => el._id !== chicken._id);
            }
            for (let j: number = 0; j < count; j++) {
    
              let egg: IchickenEgg = {
                type: 0,
                x: Phaser.Math.Between(minX, maxX),
                y: Phaser.Math.Between(minY, maxY),
                _id: 'local_' + randomString(18)
              }
              state.chickenEggs.push(egg);
            }
          }
        }
      }
    }
  
    // скорость сборки
    let percent: number = 100;
    let speed: number = state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === state.userChicken.collectorLevel).speed;
  
    if (state.chicken.length > speed * 10) {
      let excess: number = 100 / (speed * 10) * state.chicken.length;
      percent = Math.round(100 / (excess / 100));
    }
  
    // формируем массив яиц
    let eggsArr: { id: string, type: string }[] = [];
    for (let i in eggs) {
      for (let j: number = 0; j < eggs[i].count; j++) {
        eggsArr.push({
          id: eggs[i].id,
          type: String(eggs[i].type)
        });
      }
    }
  
    // ложим яйца в хранилища
    let length: number = eggsArr.length;
    if (percent < 100) length = Math.floor(eggsArr.length / 100 * percent);
    for (let i: number = 0; i < length; i++) {
      let price: number = state.chickenSettings.chickenSettings.find((data: IchickenPoints) => String(data.breed) === eggsArr[i].type).eggPrice;
      price *= (1 + feedPercent); // коэфф
      for (let j in state.chickenTerritories) {
        if (state.chickenTerritories[j].type === 5) {
          let territory = state.chickenTerritories[j];
          let max: number = state.chickenSettings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).eggStorage;
          if (territory.volume < max && wasCollector > 0) {
            let egg = eggs.find(data => data.id === eggsArr[i].id);
            if (egg.count > 0) egg.count--
            territory.money += price;
            territory.volume++;
            break;
          }
        }
      }
    }
  
    // убираем яйца, которые собрали с поля
    for (let i in eggs) {
      if (eggs[i].egg && eggs[i].count === 0) {
        state.chickenEggs.filter((data: IchickenEgg) => data._id !== eggs[i].id);
      }
    }
  
    // ложим остатки яиц на поле
    let remainingEggs: number[] = [];
    for (let i in eggs) {
      for (let j: number = 0; j < eggs[i].count; j++) {
        if (!eggs[i].egg) {
          remainingEggs.push(eggs[i].type);
        }
      }
    }
  
    // формируем свободные места на клетках
    let freeSpace: Iposition[] = [];
    for (let i in state.chickenTerritories) {
      let territory = state.chickenTerritories[i];
      if (territory.type === 2 || territory.type === 3) {
        let count: number = state.chickenSettings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).countEggs;
        let minX: number = (territory.position - 1) * 240 + indent;
        let maxX: number = territory.position * 240 - indent;
        let minY: number = territory.block * 240 + indent;
        let maxY: number = (territory.block + 1) * 240 - indent;
        for (let j in state.chickenEggs) {
          let egg = state.chickenEggs[j];
          if (egg?.x > minX && egg?.x < maxX && egg?.y > minY && egg?.y < maxY) count--;
        }
        for (let j: number = 0; j < count; j++) {
          freeSpace.push({
            x: Phaser.Math.Between(minX, maxX),
            y: Phaser.Math.Between(minY, maxY)
          });
        }
      }
    }
    
    // ставим оставшиеся яйца на поле
    let index: number = 0;
    state.chickenEggs = state.chickenEggs.filter((data: IchickenEgg) => data.type === 0);
    for (let i in freeSpace) {
      if (typeof remainingEggs[index] === 'number') {
        let egg: IchickenEgg = {
          type: remainingEggs[index],
          x: freeSpace[i]?.x,
          y: freeSpace[i]?.y,
          _id: 'local_' + randomString(18)
        }
        state.chickenEggs.push(egg);
      } else break;
      index++;
    }
  } 

  const cowOfflineProgress = (offlineTime: number = state.progress.cow.offlineTime): void => {
    const MILK_DELAY = 60;
    if (state.userCow.diamondAnimalTime >= offlineTime) state.userCow.diamondAnimalTime -= offlineTime;
    else {
      state.userCow.diamondAnimalTime = 0;
      state.userCow.diamondAnimalAd = true;
    }
  
    // время буста комбикорм
    let wasFeedBoost: number = 0;
  
    if (state.userCow.feedBoostTime >= offlineTime) {
      state.userCow.feedBoostTime -= offlineTime;
      wasFeedBoost = offlineTime;
    } else {
      wasFeedBoost = state.userCow.feedBoostTime;
      state.userCow.feedBoostTime = 0;
    }
  
    // время собирателя
    let wasCollector: number = 0;
  
    if (state.userCow.collector >= offlineTime) {
      state.userCow.collector -= offlineTime;
      wasCollector = offlineTime;
    } else {
      wasCollector = state.userCow.collector;
      state.userCow.collector = 0;
    }
    
    let wasFactoryBoost: number = 0;

    if (state.userCow.factory.boostTime >= offlineTime) {
      state.userCow.factory.boostTime >= offlineTime;
      wasFactoryBoost = offlineTime;
    } else {
      wasFactoryBoost = state.userCow.factory.boostTime;
      state.userCow.factory.boostTime = 0;
    }

    // процент шерсти под бустом
    let feedPercent: number = Number((wasFeedBoost / wasCollector).toFixed(2));
    if (feedPercent >= 1 ) feedPercent = 1;
  
    // считаем сколько раз подстригли овец
    let balance: Ibalance = this.farmBalance('Cow');
    let milkCollected: { id: string, type: number, count: number }[] = [];

    for (const cow of state.cow) {
      const breed: number = cow.type === 0 ? 1 : cow.type;
      const cowPoints: IcowPoints = state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === breed);
      // зарождение яйца
      if (cow.milk < cowPoints.maxMilkVolume) {
        let milk: number = cowPoints.maxMilkVolume / MILK_DELAY;
        if (cow.type === 0) milk = cowPoints.maxMilkVolume / 10;
  
        if (balance.alarm) {
          milk = Math.round(milk / 100 * state.cowSettings.cowBadPercent);
          if (milk < 1) milk = 1;
        }

        const milkCollect: number = Math.floor((milk * wasCollector) / 1000);
        if (milkCollect === 0) {
          if (cow.milk + (milk * wasCollector) > 1000) cow.milk = cowPoints.maxMilkVolume;
          else cow.milk += (milk * wasCollector);
        }
        if (cow.type !== 0) {
          milkCollected.push({
            id: cow._id,
            type: cow.type,
            count: milkCollect,
          })
        }
      }
    }

    // скорость сборки
    const speed: number = state.cowCollectorSettings.find((data: IcollectorSettings) => data.level === state.userCow.collectorLevel).speed;
  
    if (state.cow.length > speed * 10) {
      const excess: number = 100 / (speed * 10) * state.cow.length;
      const percent: number = 100 / (excess / 100);
      for (const milk of milkCollected) {
        if (milk.count > 0) {
          milk.count = Math.round(milk.count / 100 * percent);
        }
      }
    }
    // заполняем хранилища
    const milkStorage: number[] = [];
    for (const milk of milkCollected) {
      for (let j: number = 0; j < milk.count; j++) {
        milkStorage.push(milk.type);
      }
    }
  
    for (const milk of milkStorage) {
      let count: number = state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === milk).maxMilkVolume;
      count *= (1 + feedPercent); // коэфф
      for (const territory of state.sheepTerritories) {

        if (territory.type === 5) {
          const max: number = state.cowSettings.territoriesCowSettings.find((item: IterritoriesCowSettings) => item.improve === territory.improve).storage;
          if (territory.volume + count < max) {
            const milkCollect = milkCollected.find(data => data.type === milk && data.count > 0);
            if (milkCollect) milkCollect.count--;
            territory.money += 0;
            territory.volume += count;
            break;
          }
        }
      }
    }
    
    const territories: Iterritories[] = state.cowTerritories;
    const factoryTerritory: Iterritories = territories.find((data: Iterritories) => data.type === 8);
    if (factoryTerritory) {
      const factory: Ifactory = state.userCow.factory;
      const factorySettings: IfactorySettings = state.cowSettings.cowFactorySettings.find((data: IfactorySettings) => data.improve === factoryTerritory.improve);
  
      if (state.offlineTime > factorySettings.processingTime - factory.productionTimer) {
        const countLaunchedProductions: number = Math.floor((state.offlineTime + factorySettings.processingTime - factory.productionTimer) / factorySettings.processingTime);
        const needMilk: number = countLaunchedProductions * factorySettings.lotSize;
        
        let haveMilk: number = 0;
        for (const territory of territories) {
          if (territory.type === 5) {
            haveMilk += territory.volume;
          }
        }
        // сколько фактически производств было
        let count: number = 0;

        if (needMilk < haveMilk) {
          haveMilk -= needMilk;
          count = countLaunchedProductions;
        } else {
          count = Math.floor(haveMilk / factorySettings.lotSize);
        }

        let boostedCount: number = 0;
        if (count > 1 && wasFactoryBoost > factorySettings.processingTime * count) {
          boostedCount = Math.floor(count);
        } else if (count > 1 && wasFactoryBoost > 0) {
          boostedCount = Math.floor(wasFactoryBoost / factorySettings.processingTime * count);
          if (wasFactoryBoost > factorySettings.processingTime && boostedCount === 0) boostedCount = 1;
        }
  
        const currentProduction: number = factory.currentProduction;
        if (count > 0) {
          for (let i: number = 0; i < count; i += 1) {
            if (currentProduction && i === 0) {
              factory[`production${currentProduction}Money`] += factorySettings.lotSize * factory[`production${currentProduction}Multiply`];
              factory.money += factorySettings.lotSize * factory[`production${currentProduction}Multiply`];
            } else {
              if (boostedCount > 0) {
                boostedCount -= 1;
              }
              const productId: number = getRandomProductId(factorySettings, boostedCount > 0);
              const type: number = productId
              factory[`production${type}Money`] += factorySettings.lotSize * factory[`production${type}Multiply`];
              factory.money += factorySettings.lotSize * factory[`production${type}Multiply`];
            }
          }

          const remainingTime: number = state.offlineTime + factorySettings.processingTime - factory.productionTimer - factorySettings.processingTime * count;
          factory.productionTimer = remainingTime;
      
          if (remainingTime > 0) {
            factory.currentProduction = getRandomProductId(factorySettings, state.userCow.factory.boostTime > 0);
          }
        } 
        if (factory.currentProduction) factory.productionTimer -= state.offlineTime;
        if (factory.productionTimer < 0 || factory.productionTimer > factorySettings.processingTime) factory.productionTimer = factorySettings.processingTime;
        // раскладываем остатки молока
        for (const territory of territories) {
          if (haveMilk > 0) {
            if (territory.type === 5) {
              const terSettings: IterritoriesCowSettings = state.cowSettings.territoriesCowSettings
                .find((data: IterritoriesCowSettings) => territory.improve === data.improve);
              if (haveMilk > terSettings.storage) {
                territory.volume = terSettings.storage;
                haveMilk -= terSettings.storage;
              } else {
                territory.volume = haveMilk;
                haveMilk = 0;
              }
            }
          }
        }
      } else {
        if (factory.currentProduction) factory.productionTimer -= state.offlineTime;
        if (factory.productionTimer < 0 || factory.productionTimer > factorySettings.processingTime) factory.productionTimer = factorySettings.processingTime;
      }
    }
    // если есть остаток, то овцы пушистые
    for (let i in milkCollected) {
      if (milkCollected[i].count > 0) {
        const cow = state.cow.find((data: any) => data._id === milkCollected[i].id);
        const breed: number = cow.type === 0 ? 1 : cow.type;
        const cowPoints: number = state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === breed).maxMilkVolume;
        cow.milk = cowPoints;
      }
    }
  }

  const sheepAutoprogress = (): void => {
     // время кристаллической овцы
  if (state.userSheep.diamondAnimalTime >= state.offlineTime) state.userSheep.diamondAnimalTime -= state.offlineTime;
  else {
    state.userSheep.diamondAnimalTime = 0;
    state.userSheep.diamondAnimalAd = true;
  }
  // время буста комбикорм
  let wasFeedBoost: number = 0;

  if (state.userSheep.feedBoostTime >= state.offlineTime) {
    state.userSheep.feedBoostTime -= state.offlineTime;
    wasFeedBoost = state.offlineTime;
  } else {
    wasFeedBoost = state.userSheep.feedBoostTime;
    state.userSheep.feedBoostTime = 0;
  }

  // время собирателя
  let wasCollector: number = 0;

  if (state.userSheep.collector >= state.offlineTime) {
    state.userSheep.collector -= state.offlineTime;
    wasCollector = state.offlineTime;
  } else {
    wasCollector = state.userSheep.collector;
    state.userSheep.collector = 0;
  }
  
  // процент шерсти под бустом
  let feedPercent: number = Number((wasFeedBoost / wasCollector).toFixed(2));
  if (feedPercent >= 1 ) feedPercent = 1;

  
  if (!load) this.game.scene.keys['SheepBars'].collector.update();
  if (!load) state.timeToNewDay -= state.offlineTime;

  // считаем сколько раз подстригли овец
  let balance: Ibalance = this.balance();
  let sheepWoolcuts: { id: string, type: number, count: number }[] = [];

  if (balance.waterRecovery > 0 && balance.grassRecovery > 0) {

    for (let i in this.sheep.children.entries) {

      let sheep = this.sheep.children.entries[i];
      let breed: number;

      if (sheep.type === 0) breed = 1;
      else breed = sheep.type;

      let points: IsheepPoints = this.settings.sheepSettings.find((item: IsheepPoints) => item.breed === breed);

      let wool: number = points.wool_growth;

      if (balance.alarm) {
        wool = Math.round(wool / 100 * this.settings.sheepBadPercent);
        if (wool < 1) wool = 1;
      }

      let woolcuts: number = Math.floor((wool * wasCollector) / 1000);

      if (woolcuts === 0) {
        if (sheep.wool + (wool * wasCollector) > 1000) sheep.wool = 1000;
        else sheep.wool += (wool * wasCollector);
      }
      
      if (state.userSheep.collector === 0) {
        sheep.wool = 1000;
      }

      if (sheep.type !== 0) {

        sheepWoolcuts.push({
          id: sheep._id,
          type: sheep.type,
          count: woolcuts
        });

      }

    }

  }

  // скорость сборки
  let speed: number = state.sheepCollectorSettings.find((data: IcollectorSettings) => data.level === state.userSheep.collectorLevel).speed;

  if (this.sheep.children.entries.length > speed * 10) {

    let excess: number = 100 / (speed * 10) * this.sheep.children.entries.length;
    let percent: number = 100 / (excess / 100);

    for (let i in sheepWoolcuts) {
      if (sheepWoolcuts[i].count > 0) {
        sheepWoolcuts[i].count = Math.round(sheepWoolcuts[i].count / 100 * percent);
      }
    }

  }

  // заполняем хранилища
  let wool: number[] = [];

  for (let i in sheepWoolcuts) {
    for (let j: number = 0; j < sheepWoolcuts[i].count; j++) {
      wool.push(sheepWoolcuts[i].type);
    }
  }

  for (let i in wool) {
    
    let price: number = state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === wool[i]).long_wool;
    price *= (1 + feedPercent); // коэфф
    
    for (let j in this.territories.children.entries) {
      if (this.territories.children.entries[j].type === 5) {
        
        let territory = this.territories.children.entries[j];
        let max: number = this.settings.territoriesSheepSettings.find((item: IterritoriesSheepSettings) => item.improve === territory.improve).woolStorage;

        if (territory.volume < max) {

          let sheep = sheepWoolcuts.find(data => data.type === wool[i] && data.count > 0);
          if (sheep?.count > 0) sheep.count--;

          territory.money += price;
          territory.volume++;
          break;
        }
      }
    }
  }
  
  // если есть остаток, то овцы пушистые
    for (let i in sheepWoolcuts) {
      if (sheepWoolcuts[i].count > 0) {
        let sheep = this.sheep.children.entries.find((data: any) => data._id === sheepWoolcuts[i].id);
        sheep.wool = 1000;
      }
    }
  }

  const chickenAutoprogress = (): void => {
      // значение отступа для яиц, чтоб не прилегали к краям территории
    let indent: number = 20;

    // время кристаллической курочки
    if (state.userChicken.diamondAnimalTime >= state.offlineTime) state.userChicken.diamondAnimalTime -= state.offlineTime;
    else {
      state.userChicken.diamondAnimalTime = 0;
      state.userChicken.diamondAnimalAd = true;
    }
     // время буста комбикорм
    let wasFeedBoost: number = 0;

    if (state.userChicken.feedBoostTime >= state.offlineTime) {
      state.userChicken.feedBoostTime -= state.offlineTime;
      wasFeedBoost = state.offlineTime;
    } else {
      wasFeedBoost = state.userChicken.feedBoostTime;
      state.userChicken.feedBoostTime = 0;
    }

    // время собирателя
    let wasCollector: number = 0;

    if (state.userChicken.collector >= state.offlineTime) {
      state.userChicken.collector -= state.offlineTime;
      wasCollector = state.offlineTime;
    } else {
      wasCollector = state.userChicken.collector;
      state.userChicken.collector = 0;
    }

    // процент шерсти под бустом
    let feedPercent: number = Number((wasFeedBoost / wasCollector).toFixed(2));
    if (feedPercent >= 1 ) feedPercent = 1;

    if (!load) this.game.scene.keys['ChickenBars'].collector.update();
    if (!load) state.timeToNewDay -= state.offlineTime;

    // считаем сколько снесла курица яйцо
    let balance: Ibalance = this.balance();
    let newEggs: { egg: boolean, id: string, type: number, count: number }[] = [];

    for (let i in this.chicken.children.entries) {

      let chicken = this.chicken.children.entries[i];
      let breed: number;

      if (chicken.type === 0) breed = 1;
      else breed = chicken.type;

      let points: IchickenPoints = this.settings.chickenSettings.find((item: IchickenPoints) => item.breed === breed);

      let egg: number = points.egg;

      if (balance.alarm) {
        egg = Math.round(egg / 100 * this.settings.chickenBadPercent);
        if (egg < 1) egg = 1;
      }

      let eggs: number = Math.floor((egg * wasCollector) / 1000);

      if (eggs === 0) {
        if (chicken.egg + (eggs * wasCollector) > 1000) chicken.egg = 1000;
        else chicken.egg += (eggs * wasCollector);
      }

      if (state.userChicken.collector === 0) {
        chicken.egg = Phaser.Math.Between(0, 1000);
      }

      newEggs.push({
        id: chicken._id,
        type: chicken.type,
        count: eggs,
        egg: false
      });

    }

    // добавляем в массив яйца, которые могут лежать на поле
    for (let i in this.eggs.children.entries) {

      let egg = this.eggs.children.entries[i];

      if (egg.type !== 0) {

        newEggs.push({
          id: egg._id,
          type: egg.animalType,
          count: 1,
          egg: true
        });

      }

    }

    // берем кристаллические курицы если есть и формируем обновленный массив
    let eggs: { egg: boolean, id: string, type: number, count: number }[] = [];

    for (let i in newEggs) {

      if (newEggs[i].type !== 0) {

        eggs.push(newEggs[i]);

      } else {


        let chicken = this.chicken.children.entries.find((data: any) => data._id === newEggs[i].id);
        if (chicken) {
          let territory = this.currentTerritory(chicken?.x, chicken?.y);
          if (territory) {
            let count: number = 0;
            let minX: number = (territory.position - 1) * 240 + indent;
            let maxX: number = territory.position * 240 - indent;
            let minY: number = territory.block * 240 + indent;
            let maxY: number = (territory.block + 1) * 240 - indent;
          
            if (newEggs[i].count < chicken.diamond) {
              chicken.diamond -= newEggs[i].count;
              count = newEggs[i].count;
            } else {
              count = 5 - chicken.diamond;
              chicken.destroy();
            }
            for (let j: number = 0; j < count; j++) {
            
              let egg: IchickenEgg = {
                type: 0,
                x: Phaser.Math.Between(minX, maxX),
                y: Phaser.Math.Between(minY, maxY),
                _id: 'local_' + randomString(18)
              }
              Egg.create(this, egg);
            }
          }
        }
      }
    }

    // скорость сборки
    let percent: number = 100;
    let speed: number = state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === state.userChicken.collectorLevel).speed;

    if (this.chicken.children.entries.length > speed * 10) {
      let excess: number = 100 / (speed * 10) * this.chicken.children.entries.length;
      percent = Math.round(100 / (excess / 100));
    }

    // формируем массив яиц
    let eggsArr: { id: string, type: string }[] = [];

    for (let i in eggs) {
      for (let j: number = 0; j < eggs[i].count; j++) {
        eggsArr.push({
          id: eggs[i].id,
          type: String(eggs[i].type)
        });
      }
    }

    // ложим яйца в хранилища
    let length: number = eggsArr.length;
    if (percent < 100) length = Math.floor(eggsArr.length / 100 * percent);

    for (let i: number = 0; i < length; i++) {

      let price: number = state.chickenSettings.chickenSettings.find((data: IchickenPoints) => String(data.breed) === eggsArr[i].type).eggPrice;
      price *= (1 + feedPercent); // коэфф

      for (let j in this.territories.children.entries) {

        if (this.territories.children.entries[j].type === 5) {

          let territory = this.territories.children.entries[j];

          let max: number = this.settings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).eggStorage;

          if (territory.volume < max && wasCollector > 0) {

            let egg = eggs.find(data => data.id === eggsArr[i].id);
            if (egg.count > 0) egg.count--;

            territory.money += price;
            territory.volume++;
            break;

          }
        }
      }
    }

    // убираем яйца, которые собрали с поля
    for (let i in eggs) {

      if (eggs[i].egg && eggs[i].count === 0) {
        let egg = this.eggs.children.entries.find((data: any) => data._id === eggs[i].id);
        egg.destroy();
      }

    }

    // ложим остатки яиц на поле
    let remainingEggs: number[] = [];
    for (let i in eggs) {
      for (let j: number = 0; j < eggs[i].count; j++) {
        if (!eggs[i].egg) {
          remainingEggs.push(eggs[i].type);
        }
      }
    }

    // формируем свободные места на клетках
    let freeSpace: Iposition[] = [];
    for (let i in this.territories.children.entries) {

      let territory = this.territories.children.entries[i];

      if (territory.type === 2 || territory.type === 3) {

        let count: number = this.settings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).countEggs;
        let minX: number = (territory.position - 1) * 240 + indent;
        let maxX: number = territory.position * 240 - indent;
        let minY: number = territory.block * 240 + indent;
        let maxY: number = (territory.block + 1) * 240 - indent;

        for (let j in this.eggs.children.entries) {
          let egg = this.eggs.children.entries[j];
          if (egg?.x > minX && egg?.x < maxX && egg?.y > minY && egg?.y < maxY) count--;
        }

        for (let j: number = 0; j < count; j++) {
          freeSpace.push({
            x: Phaser.Math.Between(minX, maxX),
            y: Phaser.Math.Between(minY, maxY)
          });
        }

      }

    }

    // ставим оставшиеся яйца на поле
    let index: number = 0;
    for (let i in freeSpace) {

      if (typeof remainingEggs[index] === 'number') {

        let egg: IchickenEgg = {
          type: remainingEggs[index],
          x: freeSpace[i]?.x,
          y: freeSpace[i]?.y,
          _id: 'local_' + randomString(18)
        }

        Egg.create(this, egg);

      } else break;

      index++;

    }
  }

  const cowAutoprogress = (): void => {
    const MILK_DELAY = 60;
    if (state.userCow.diamondAnimalTime >= state.offlineTime) state.userCow.diamondAnimalTime -= state.offlineTime;
    else {
      state.userCow.diamondAnimalTime = 0;
      state.userCow.diamondAnimalAd = true;
    }
  
    // время буста комбикорм
    let wasFeedBoost: number = 0;
  
    if (state.userCow.feedBoostTime >= state.offlineTime) {
      state.userCow.feedBoostTime -= state.offlineTime;
      wasFeedBoost = state.offlineTime;
    } else {
      wasFeedBoost = state.userCow.feedBoostTime;
      state.userCow.feedBoostTime = 0;
    }
  
    // время собирателя
    let wasCollector: number = 0;
  
    if (state.userCow.collector >= state.offlineTime) {
      state.userCow.collector -= state.offlineTime;
      wasCollector = state.offlineTime;
    } else {
      wasCollector = state.userCow.collector;
      state.userCow.collector = 0;
    }

    let wasFactoryBoost: number = 0;

    if (state.userCow.factory.boostTime >= state.offlineTime) {
      state.userCow.factory.boostTime >= state.offlineTime;
      wasFactoryBoost = state.offlineTime;
    } else {
      wasFactoryBoost = state.userCow.factory.boostTime;
      state.userCow.factory.boostTime = 0;
    }

    if (!load) this.game.scene.keys['CowBars'].collector.update();
    if (!load) state.timeToNewDay -= state.offlineTime;
    // процент шерсти под бустом
    let feedPercent: number = Number((wasFeedBoost / wasCollector).toFixed(2));
    if (feedPercent >= 1 ) feedPercent = 1;
  
    // считаем сколько раз подстригли овец
    let balance: Ibalance = this.farmBalance('Cow');
    let milkCollected: { id: string, type: number, count: number }[] = [];
    const cowGroup: CowSprite[] = this.animalGroup.children.entries;
    for (const cow of cowGroup) {
      const breed: number = cow.breed === 0 ? 1 : cow.breed;
      const cowPoints: IcowPoints = state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === breed);
      // зарождение яйца
      if (cow.milk < cowPoints.maxMilkVolume) {
        let milk: number = cowPoints.maxMilkVolume / MILK_DELAY;
        if (cow.breed === 0) milk = cowPoints.maxMilkVolume / 10;
  
        if (balance.alarm) {
          milk = Math.round(milk / 100 * state.cowSettings.cowBadPercent);
          if (milk < 1) milk = 1;
        }

        const milkCollect: number = Math.floor((milk * wasCollector) / 1000);
        if (milkCollect === 0) {
          if (cow.milk + (milk * wasCollector) > 1000) cow.milk = cowPoints.maxMilkVolume;
          else cow.milk += (milk * wasCollector);
        }
        if (cow.breed !== 0) {
          milkCollected.push({
            id: cow._id,
            type: cow.breed,
            count: milkCollect,
          })
        }
      }
    }

    // скорость сборки
    const speed: number = state.cowCollectorSettings.find((data: IcollectorSettings) => data.level === state.userCow.collectorLevel).speed;
  
    if (cowGroup.length > speed * 10) {
      const excess: number = 100 / (speed * 10) * cowGroup.length;
      const percent: number = 100 / (excess / 100);
      for (const milk of milkCollected) {
        if (milk.count > 0) {
          milk.count = Math.round(milk.count / 100 * percent);
        }
      }
    }
    // заполняем хранилища
    const milkStorage: number[] = [];
    for (const milk of milkCollected) {
      for (let j: number = 0; j < milk.count; j++) {
        milkStorage.push(milk.type);
      }
    }
    const territories: Territory[] = this.territories.children.entries;
    for (const milk of milkStorage) {
      let count: number = state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === milk).maxMilkVolume;
      count *= (1 + feedPercent); // коэфф
      for (const territory of territories) {

        if (territory.territoryType === 5) {
          const max: number = state.cowSettings.territoriesCowSettings.find((item: IterritoriesCowSettings) => item.improve === territory.improve).storage;
          if (territory.volume + count < max) {
            const milkCollect = milkCollected.find(data => data.type === milk && data.count > 0);
            if (milkCollect) milkCollect.count--;
            territory.money += 0;
            territory.volume += count;
            break;
          }
        }
      }
    }

    const factoryTerritory: Territory = territories.find((data: Territory) => data.territoryType === 8);
    if (factoryTerritory) {
      const factory: Factory = factoryTerritory.factory;
      const factorySettings: IfactorySettings = factory.settings;
      if (state.offlineTime > factorySettings.processingTime - factory.productionTimer) {
        const countLaunchedProductions: number = Math.floor((state.offlineTime + factorySettings.processingTime - factory.productionTimer) / factorySettings.processingTime);
        const needMilk: number = countLaunchedProductions * factorySettings.lotSize;
        
        let haveMilk: number = 0;
        for (const territory of territories) {
          if (territory.territoryType === 5) {
            haveMilk += territory.volume;
          }
        }
        // сколько фактически производств было
        let count: number = 0;
        if (needMilk < haveMilk) {
          haveMilk -= needMilk;
          count = countLaunchedProductions;
        } else {
          count = Math.floor(haveMilk / factorySettings.lotSize);
        }

        let boostedCount: number = 0;
        if (count > 1 && wasFactoryBoost > factorySettings.processingTime * count) {
          boostedCount = Math.floor(count);
        } else if (count > 1 && wasFactoryBoost > 0) {
          boostedCount = Math.floor(wasFactoryBoost / factorySettings.processingTime * count);
          if (wasFactoryBoost > factorySettings.processingTime && boostedCount === 0) boostedCount = 1;
        }
  
        const currentProduction: number = factory.currentProduction;
        if (count > 0) {
          for (let i: number = 0; i < count; i += 1) {
            if (currentProduction && i === 0) {
              factory[`production${currentProduction}Money`] += factorySettings.lotSize * state.userCow.factory[`production${currentProduction}Multiply`];
              factory.money += factorySettings.lotSize * state.userCow.factory[`production${currentProduction}Multiply`];
            } else {
              const type: number = getRandomProductId(factorySettings, boostedCount > 0);
              factory[`production${type}Money`] += factorySettings.lotSize * state.userCow.factory[`production${type}Multiply`];
              factory.money += factorySettings.lotSize * state.userCow.factory[`production${type}Multiply`];
            }
          }

          const remainingTime: number = state.offlineTime + factorySettings.processingTime - factory.productionTimer - factorySettings.processingTime * count;
          factory.productionTimer = remainingTime;

          if (factory.productionTimer  > 0) {
            factory.currentProduction = getRandomProductId(factorySettings, boostedCount > 0);
          }
        }
        if (factory.currentProduction) factory.productionTimer -= state.offlineTime;
        if (factory.productionTimer < 0 || factory.productionTimer > factorySettings.processingTime) factory.productionTimer = factorySettings.processingTime;
        // раскладываем остатки молока
        for (const territory of territories) {
          if (haveMilk > 0) {
            if (territory.territoryType === 5) {
              const terSettings: IterritoriesCowSettings = state.cowSettings.territoriesCowSettings
                .find((data: IterritoriesCowSettings) => territory.improve === data.improve);
              if (haveMilk > terSettings.storage) {
                territory.volume = terSettings.storage;
                haveMilk -= terSettings.storage;
              } else {
                territory.volume = haveMilk;
                haveMilk = 0;
              }
            }
          }
        }
      } else {
        if (factory.currentProduction) factory.productionTimer -= state.offlineTime;
        if (factory.productionTimer < 0 || factory.productionTimer > factorySettings.processingTime) factory.productionTimer = factorySettings.processingTime;
      }
    }


    // если есть остаток, то овцы пушистые
    for (let i in milkCollected) {
      if (milkCollected[i].count > 0) {
        const cow = cowGroup.find((data: any) => data._id === milkCollected[i].id);
        const breed: number = cow.breed === 0 ? 1 : cow.breed;
        const cowPoints: number = state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === breed).maxMilkVolume;
        cow.milk = cowPoints;
      }
    }
  }

  const unicornAutoprogress = (): void => {
   // время буста комбикорм
    let wasFeedBoost: number = 0;
    
    if (state.userUnicorn.feedBoostTime >= state.offlineTime) {
      state.userUnicorn.feedBoostTime -= state.offlineTime;
      wasFeedBoost = state.offlineTime;
    } else {
      wasFeedBoost = state.userUnicorn.feedBoostTime;
      state.userUnicorn.feedBoostTime = 0;
    }

    // время собирателя
    let wasCollector: number = 0;

    if (state.userUnicorn.collector >= state.offlineTime) {
      state.userUnicorn.collector -= state.offlineTime;
      wasCollector = state.offlineTime;
    } else {
      wasCollector = state.userUnicorn.collector;
      state.userUnicorn.collector = 0;
    }

    // процент ресурсов под бустом
    let feedBoostNumberPercent: number;
    let feedPercent: string = String(100);
    if (wasFeedBoost > 0) {
      feedBoostNumberPercent = 100 + Number((wasFeedBoost / wasCollector).toFixed(2)) * 100;
      if (feedBoostNumberPercent >= 200 ) feedBoostNumberPercent = 200;
      feedPercent = String(feedBoostNumberPercent);
    }


    if (!load) this.game.scene.keys['UnicornBars'].collector.update();
    if (!load) state.timeToNewDay -= state.offlineTime;

    // считаем сколько появилось ресурсов
    let newResources: { resource: boolean, id: string, type: number, count: number }[] = [];

    for (let i in this.animals.children.entries) {

      let animal = this.animals.children.entries[i];
      let breed: number = animal.data.values.type;

      let points: IeventPoints = state.unicornSettings.unicornSettings.find((item: IeventPoints) => item.breed === breed);

      let resource: number = points.resource;

      let resources: number = Math.floor((resource * wasCollector) / 1000);

      if (resources === 0) {
        if (animal.data.values.active.data.values.resource + (resources * wasCollector) > 1000) animal.data.values.active.data.values.resource = 1000;
        else animal.data.values.active.data.values.resource += (resources * wasCollector);
      }

      if (state.userUnicorn.collector === 0) {
        animal.data.values.resource = Phaser.Math.Between(0, 1000);
      }

      if (animal.data.values.active.data.values.working) {
        newResources.push({
          id: animal.data.values._id,
          type: animal.data.values.type,
          count: resources,
          resource: false
        });
      }
    }

    // добавляем в массив ресурсов, которые могут лежать на поле
    for (let i in this.resources.children.entries) {

      let resource = this.resources.children.entries[i];

        newResources.push({
          id: resource.data.values._id,
          type: resource.data.values.type,
          count: 1,
          resource: true
        });

    }

    // скорость сборки
    let percent: number = 100;
    let speed: number = state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === state.userUnicorn.collectorLevel).speed;

    if (this.animals.children.entries.length > speed * 10) {

      let excess: number = 100 / (speed * 10) * this.animals.children.entries.length;
      percent = Math.round(100 / (excess / 100));

    }

    // формируем массив ресурсов
    let resourceArr: { id: string, type: number }[] = [];

    for (let i in newResources) {
      for (let j: number = 0; j < newResources[i].count; j++) {
        resourceArr.push({
          id: newResources[i].id,
          type: newResources[i].type
        });
      }
    }

    // сохраняем ресурсы
    let income: string = String(0);
    let length: number = resourceArr.length;

    if (percent < 100) length = Math.floor(length / 100 * percent);

    for (let i: number = 0; i < length; i++) {

      let price: string = state.unicornSettings.unicornSettings.find((data: IeventPoints) => data.breed === resourceArr[i].type).resourcePrice;
      price = BigInteger.divide(BigInteger.multiply(price, feedPercent), String(100)); // коэфф


      if (wasCollector > 0) {

        let resource = newResources.find(data => data.id === resourceArr[i].id);

        if (resource.count > 0) resource.count--;

        income = BigInteger.add(income, price);

      }
    }
    if (state.offlineTime > 900 && BigInteger.greaterThan(income, '0')) {
      let modal: Imodal = {
        type: 10,
        eventParams: {
          offlineTime: state.offlineTime,
          offlineProgress: income,
          collectorTime: wasCollector,
        }
      }
      this.scene.stop('Modal');
      this.scene.stop('Shop');
      this.scene.stop('ShopBars');
      state.modal = modal;
      this.scene.launch('Modal', this.state);
    } else {
      state.userUnicorn.money = BigInteger.add(state.userUnicorn.money, income);
    }


    // убираем ресурсы, которые собрали с поля
    for (let i in newResources) {

      if (newResources[i].resource && newResources[i].count === 0) {

        let resource = this.resources.children.entries.find((data: any) => data.data.values._id === newResources[i].id);

        resource.destroy();
      }

    }

    // ложим остатки ресурсов на поле
    let remainingResources: number[] = [];
    for (let i in newResources) {

      for (let j: number = 0; j < newResources[i].count; j++) {

        if (!newResources[i].resource) {

          remainingResources.push(newResources[i].type);
        }
      }
    }

    // формируем свободные места на рабочей зоне
    let freeSpace: Iposition[] = [];
    for (let j: number = 0; j < this.maxCountResource - this.resources.children.entries.length; j++) {
      freeSpace.push({
        x: Phaser.Math.Between(20, 700),
        y: Phaser.Math.Between(this.topIndent + 20, this.topIndent + 460)
      });
    }

    // ставим оставшиеся ресуры на поле
    let index: number = 0;
    for (let i in freeSpace) {

      if (typeof remainingResources[index] === 'number') {

        let resource: IchickenEgg = {
          type: remainingResources[index],
          x: freeSpace[i].x,
          y: freeSpace[i].y,
          _id: 'local_' + randomString(18)
        }

        this.getResource(resource);

      } else break;

      index++;

    } 
  }

  if (load) {
    sheepOfflineProgress();
    if (state.progress.chicken.part > 0) chickenOfflineProgress();
    if (state.progress.cow.part > 0) cowOfflineProgress();
    if (state.farm === 'Unicorn') unicornAutoprogress();
  } else {
    if (state.farm === 'Sheep') {
      sheepAutoprogress();
      if (state.progress.chicken.part > 0) chickenOfflineProgress(state.offlineTime);
      if (state.progress.cow.part > 0) cowOfflineProgress(state.offlineTime);
    } else if (state.farm === 'Chicken') {
      chickenAutoprogress();
      sheepOfflineProgress(state.offlineTime);
      if (state.progress.cow.part > 0) cowOfflineProgress(state.offlineTime);
    } else if (state.farm === 'Cow') {
      cowAutoprogress();
      sheepOfflineProgress(state.offlineTime);
      if (state.progress.chicken.part > 0) chickenOfflineProgress(state.offlineTime);
    } else {
      unicornAutoprogress();
      sheepOfflineProgress(state.offlineTime);
      if (state.progress.chicken.part > 0) chickenOfflineProgress(state.offlineTime);
      if (state.progress.cow.part > 0) cowOfflineProgress(state.offlineTime);
    }
  }
  this.autoporgressCollectorTime();
}