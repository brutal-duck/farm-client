import {shortTime} from './../../general/basic';
import Arrow from '../../components/animations/Arrow';
import Firework from '../../components/animations/Firework';
import Hearts from '../../components/animations/Hearts';
import Egg from '../../components/Resource/Egg';
import Chicken from './Main';
let checkCollector: number = 0;
let sheepCollectorVolume: number = 0;
let cowCollectorVolume: number = 0;

function interval(): void {

  // значение отступа для яиц, чтоб не прилегали к краям территории
  let indent: number = 20;

  let statusBalance: boolean = false;

  let checkRaiting: boolean = false;

  let arrowOnMap: Phaser.GameObjects.Sprite;
  
  this.time.addEvent({ delay: 1000, callback: (): void => {
    
    // проверка подключения к интернету
    this.onlineStatus();

    let balance: Ibalance = this.balance();

    if (!statusBalance && balance.alarm) {
      this.logAmplitudeEvent('resources', {
        status: 'problem started',
      });
    } else if (statusBalance && !balance.alarm) {
      this.logAmplitudeEvent('resources', {
        status: 'problem is over',
      });
    }

    statusBalance = balance.alarm;

    // восстановаление территорий
    for (let i in this.territories.children.entries) {

      let territory = this.territories.children.entries[i];

      if ((territory.type === 2 || territory.type === 3) && territory.volume < 1000) {

        let reg: number = this.settings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).regeneration;
        territory.volume += reg;
  
        if (territory.volume > 1000) {
          territory.volume = 1000;
        }
  
      }

    }
    
    // поедание территорий курицами
    for (let i in this.chicken.children.entries) {

      let chicken = this.chicken.children.entries[i];
      
      let breed: number;

      if (chicken.type === 0) breed = 1;
      else breed = chicken.type;
      
      let points: IchickenPoints = this.settings.chickenSettings.find((item: IchickenPoints) => item.breed === breed);

      // зарождение яйца
      if (chicken.egg < 1000) {

        let egg: number = points.egg;

        if (balance.alarm) {
          egg = Math.round(egg / 100 * this.settings.chickenBadPercent);
          if (egg < 1) egg = 1;
        }

        chicken.egg += egg;
        if (chicken.egg > 1000) chicken.egg = 1000;

      }

      if (chicken.egg === 1000) {

        let territory = this.currentTerritory(chicken.x, chicken.y);

        if (territory) {
          
          let countEggs: number = this.settings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).countEggs;

          let eggs: number = 0;

          for (let i in this.eggs.children.entries) {

            let egg = this.eggs.children.entries[i];
            let ter = this.currentTerritory(egg.x, egg.y);

            if (ter?.block === territory.block && ter?.position === territory.position) eggs++;

          }

          if (eggs < countEggs && !chicken.drag && (territory.type === 2 || territory.type === 3)) {

            chicken.egg = 0;

            // рандом разброса яиц
            let minX: number = chicken.x - indent;
            let maxX: number = chicken.x + indent;
            let minY: number = chicken.y + 40 - indent;
            let maxY: number = chicken.y + 40 + indent;

            let left: number = (territory.position - 1) * 240 + indent;
            let right: number = territory.position * 240 - indent;
            let top: number = (territory.block) * 240 + indent;
            let bottom: number = (territory.block + 1) * 240 - indent;

            if (left > minX) minX = left;
            if (maxX > right) maxX = right;
            if (top > minY) minY = top;
            if (maxY > bottom) {
              maxY = bottom;
              if (maxY < minY) minY -= 40;
            }
 
            let egg: IchickenEgg = {
              type: chicken.type,
              x: this.random(minX, maxX),
              y: this.random(minY, maxY),
              _id: 'local_' + this.randomString(18)
            }
            Egg.create(this, egg);

            if (chicken.type === 0) chicken.diamond++;
            if (chicken.diamond >= 5 && chicken.type === 0) {
              Firework.create(this, chicken, 1)
              chicken.destroy();
            }

          }

        }

      }

      // отнимаем очки у территории
      let territory = this.currentTerritory(chicken.x, chicken.y);

      if (territory && !chicken.drag) {

        if (territory.type === 2) {

          if (points.eating > territory.volume) territory.volume = 0;
          else territory.volume -= points.eating;
  
        } else if (territory.type === 3) {

          if (points.drinking > territory.volume) territory.volume = 0;
          else territory.volume -= points.drinking;

        }

      }

    }

    // меняем спрайты территорий, если нужно
    for (let i in this.territories.children.entries) {

      let territory = this.territories.children.entries[i];

      if (territory.type === 2 || territory.type === 3 || territory.type === 5) {
        this.changeSprite(territory);
      }

      if (territory.type === 4) {

        if (territory.mergingCounter > 0) territory.mergingCounter++;
        if (territory.mergingCounter > this.state.maxMerginTime) {

          let chicken1: any;
          let chicken2: any;

          switch (territory.merging.length) {
            case 0:
              chicken1 = false;
              chicken2 = false;
              break;
            case 1:
              chicken1 = this.chicken.children.entries.find((data: any) => data._id === territory.merging[0]._id);
              chicken2 = false;
              break;
            case 2:
              chicken1 = this.chicken.children.entries.find((data: any) => data._id === territory.merging[0]._id);
              chicken2 = this.chicken.children.entries.find((data: any) => data._id === territory.merging[1]._id);;
              break;
            default:
              break;
          }

          this.cancelMerging(territory, chicken1, chicken2);

        }

      }

    }

    for (let i in this.eggs.children.entries) {

      let egg = this.eggs.children.entries[i];
      egg.timeout++;
    
    }

    // бар собирателя
    if (this.state.userChicken.collector > 0) {
      this.state.userChicken.collector--;
    } 

    // задание на накопление денег
    this.tryTask(6, this.state.userChicken.money);

    // задание на кур на поле
    this.checkAnimalTask();

    // баланс-бары
    this.game.scene.keys['ChickenBars'].setBalanceBars(balance);
    
    // автосохранение
    this.autoSaveTimer++;
    if (this.autoSaveTimer >= this.state.autoSaveSpeed) this.autosave();

    // автопрогресс в случае неактивности
    let time: number = Math.round(new Date().getTime() / 1000);

    if (time > this.autoprogressTimer + 5) {
      this.state.offlineTime = time - this.autoprogressTimer;
      this.autoprogress();
    }
    
    this.autoprogressTimer = time;
    
    // окно с ежедневными наградами
    this.dailyAward();

    if (this.state.newbieTime > 0) this.state.newbieTime--;

    // выдача наград новичка
    if (!this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')) this.getNewbieAward();

    // поиск рекламы
    this.findAd();

    // отнимание времени до кристалического животного
    if (this.state[`user${this.state.farm}`].diamondAnimalTime > 0) {
      this.state[`user${this.state.farm}`].diamondAnimalTime--;
    }

    this.debug();

    this.nextDayTimer();

    if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
     this.state[`user${this.state.farm}`].takenHerdBoost <= 0 && 
     this.state.user.additionalTutorial.herdBoost) {
      this.state.nativeCounter[3] = 1;
    } else this.state.nativeCounter[3] = 0;

    if (!this.state.user.starterpack) this.state.nativeCounter[0] = 1;
    else this.state.nativeCounter[0] = 0;

    let nativeCount = 0;
    
    for (let i = 0; i < this.state.nativeCounter.length; i++) {
      nativeCount += this.state.nativeCounter[i];
    }
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShopCounter.setText(nativeCount);

    if (this.state.donate &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')) this.showDonate();

    // уменьшаем время буста комбикорм
    if (this.state.userChicken.feedBoostTime > 0) {

      if (Phaser.Math.Between(0, 7) >= 5) { // чтобы не так часто появлялись сердца

        let randomIndex: number = Phaser.Math.Between(0, this.chicken.children.entries.length - 1);
        Hearts.create(this, this.chicken.children.entries[randomIndex])
      }

      this.state.userChicken.feedBoostTime--;
    }

    // Проверяем и запускаем распростанение овец по полю
    if (this.chicken.children.entries.every(el => el.spread === false)) {
      
      this.spreadAnimals();

    }
    if (this.state.progress.event.type === 1) {

      // обновление времени евента
      if (this.state.progress.event.endTime > 0) {
        this.state.progress.event.endTime--;
        if ( this.scene.isActive('Profile')) {
          this.game.scene.keys['Profile'].eventEndTime?.setText(shortTime(this.state.progress.event.endTime, this.state.lang));
        } 
      }
  
      if (this.state.progress.event.startTime > 0) {
        this.state.progress.event.startTime--;
        if (this.scene.isActive('Profile')) {
          this.game.scene.keys['Profile'].eventStartTime?.setText(shortTime(this.state.progress.event.startTime, this.state.lang));
        }
      } 
  
      if (this.state.progress.event.endTime <= 0 && 
        this.state.progress.event.eventPoints > 0  && this.state.progress.event.open &&
        this.scene.isActive('Profile')) {
        this.autosave();
        this.scene.stop('Profile');
      }
  
      if (this.state.progress.event.endTime <= 0 && 
        this.state.progress.event.eventPoints > 0 && this.state.progress.event.open &&
        !this.scene.isActive('Modal') && 
        !this.scene.isActive('Tutorial') &&
        !this.scene.isActive('Profile')) { 
        
        if (!checkRaiting) {
          this.getEventRaiting();
          checkRaiting = true;
        }
        
        if (this.state.progress.event.updateRaitings) {
  
          let modal: Imodal = {
            type: 12,
          };
  
          this.state.modal = modal;
          this.scene.launch('Modal', this.state);
  
        }
      }
    }
    
    if (this.state.progress.event.type === 2) {
      if (this.state.progress.event.endTime > 0) {
        this.state.progress.event.endTime--;
      }
    }

    if ((this.state.name !== '' || this.state.user.login !== '') && 
      this.state.progress.event.startTime <= 0 && 
      this.state.progress.event.endTime > 0 &&
      this.state.progress.event.open) {
        
      if (this.state.user.additionalTutorial.eventTutorial === 0 &&
        !arrowOnMap && !this.scene.isActive('Modal') &&
        !this.scene.isActive('Tutorial') &&
        !this.scene.isActive('Profile')) {
        Arrow.generate(this.game.scene.keys[`${this.state.farm}Bars`], 17);
      }
  
      if (this.state.user.additionalTutorial.eventTutorial === 0 &&
        !this.scene.isActive('Tutorial') &&
        this.scene.isActive('Profile') &&
        this.state.progress.event.open) {
        this.showEventTutorial();
      }
    }

    this.intervalPorgressCollectorTime();
    arrayInterval.bind(this)();

  }, callbackScope: this, loop: true });

}

const getRandomProductId = (settings: IfactorySettings, boost: boolean): number => {
  const pull: number[] = [ settings.clabberPercent, settings.pasteurizedMilkPercent, settings.cheesePercent ];
  if (boost) pull.push(settings.chocolatePercent);

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
  console.log(arrRange)
  return productId;
}

function arrayInterval(): void {
  const Scene: Chicken = this;
  const MILK_DELAY: number = 60;
  const cowBalance: Ibalance = Scene.farmBalance('Cow');
  const sheepBalance: Ibalance = Scene.farmBalance('Sheep');
  const cowSettings: IcowSettings = Scene.state.cowSettings;
  const sheepSettings: IsheepSettings = Scene.state.sheepSettings;

  

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

  if (checkCollector < 2) {
    checkCollector += 1;
  } else {
    checkCollector = 0;

    if (Scene.state.progress.cow.collector > 0) {
      const speed: number = Scene.state.cowCollectorSettings.find((data: IcollectorSettings) => data.level === Scene.state.userCow.collectorLevel).speed;
      const SEC: number = 1000;
      cowCollectorVolume += 2 * SEC;
      let collectedMilk: number = Math.floor(cowCollectorVolume / speed / SEC);
      if (collectedMilk > 0) {
        cowCollectorVolume -= collectedMilk * speed * SEC;
        for (let i in Scene.state.cowTerritories) {
          const territory: Iterritories = Scene.state.cowTerritories[i];
          if (territory.type === 5) {
            console.log(territory.volume)
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
        factory[`${factory.currentProduction}Money`] += factorySettings.lotSize * factory[`${factory.currentProduction}Multiply`];
        factory.money += factorySettings.lotSize * factory[`${factory.currentProduction}Multiply`];
        factory.currentProduction = '';
        console.log(factory.clabberMoney, 'простокваша');
        console.log(factory.pasteurizedMilkMoney, 'пастеризованное молоко');
        console.log(factory.cheeseMoney, 'сыр');
        console.log(factory.chocolateMoney, 'шоколад');
        console.log(factory.money, 'общие деньги');
      }
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
          factory.currentProduction = productId === 1 ? 'clabber' :
            productId === 2 ? 'pasteurizedMilk' : 
            productId === 3 ? 'cheese' : 
            productId === 4 ? 'chocolate' : '';
        } 
      } else {
        console.log('Недостаточно молока для производства');
      }
    } else {
      factory.productionTimer -= 1;
    }
    if (factory.productionTimer > 0) {
      console.log('время до конца производства', factory.productionTimer);
    }
  }
}

export default interval;
