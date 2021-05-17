import { shortTime } from '../../general/basic';
import Arrow from '../../components/animations/Arrow';
import Hearts from '../../components/animations/Hearts';
import Sheep from './Main';

let checkCollector: number = 0;
let chickenCollectorVolume: number = 0;
let cowCollectorVolume: number = 0;

function interval(): void {
  
  let statusBalance: boolean = false;
  let checkRaiting: boolean = false;
  let arrowOnStorage: Phaser.GameObjects.Sprite;
  let arrowOnTerrirory: Phaser.GameObjects.Sprite;
  let arrowOnMap: Phaser.GameObjects.Sprite;
  let arrowOnCollector: Phaser.GameObjects.Sprite;
  this.time.addEvent({ delay: 1000, callback: (): void => {
    
    this.remainderSellResource();
    // проверка подключения к интернету
    this.onlineStatus();

    let balance: Ibalance = this.balance();

    if (!statusBalance && balance.alarm) {

      // тутор про нарушение баланса воды или травы
      if (!this.state.user.additionalTutorial.balance && this.state.userSheep.tutorial >= 100 && !this.caveTutor) {

        this.state.user.additionalTutorial.balance = true;
        this.showTutorial('balance');

      }

      this.logAmplitudeEvent('resources', {
        status: 'problem started',
      });

    } else if (statusBalance && !balance.alarm) {

      this.logAmplitudeEvent('resources', {
        status: 'problem is over',
      });

    }

    statusBalance = balance.alarm;

    // тутор про пещеру
    if (this.state.userSheep.part >= 3 &&
      !this.state.user.additionalTutorial.cave &&
      this.state.userSheep.diamondAnimalTime === 0 &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile') &&
      !this.scene.isActive('Fortune')) {

      this.caveTutor = true;
      this.time.addEvent({ delay: 300, callback: (): void => {
        this.showTutorial('cave1');
      }, callbackScope: this, loop: false });
    }

    // тутор про бустер переполох
    if (this.state.userSheep.part >= this.herdBoostLvl &&
    !this.state.user.additionalTutorial.herdBoost &&
    !this.scene.isActive('Modal') &&
    !this.scene.isActive('Tutorial') &&
    !this.scene.isActive('Profile')&&
    !this.scene.isActive('Fortune')) {
    this.showTutorial('herdBoost1');
    }

    // тутор про бустер комбикорм
    if (this.state.userSheep.part >= this.feedBoostLvl &&
      !this.state.user.additionalTutorial.feedBoost &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')&&
      !this.scene.isActive('Fortune')) {
      this.showTutorial('feedBoost1');
      }

    // восстановаление территорий
    for (let i in this.territories.children.entries) {
      let territory = this.territories.children.entries[i];
      if ((territory.type === 2 || territory.type === 3) && territory.volume < 1000) {
        let reg: number = this.settings.territoriesSheepSettings.find((item: IterritoriesSheepSettings) => item.improve === territory.improve).regeneration;
        territory.volume += reg;
        if (territory.volume > 1000) {
          territory.volume = 1000;
        }
      }
    }
    
    // поедание территорий животным
    for (let i in this.sheep.children.entries) {
      let sheep = this.sheep.children.entries[i];
      let breed: number;
      if (sheep.type === 0) breed = 1;
      else breed = sheep.type;
      let points: IsheepPoints = this.settings.sheepSettings.find((item: IsheepPoints) => item.breed === breed);
      // рост шерсти
      if (sheep.wool < 1000 && balance.waterRecovery > 0 && balance.grassRecovery > 0) {
        let wool: number = points.wool_growth;
        if (balance.alarm) {
          wool = Math.round(wool / 100 * this.settings.sheepBadPercent);
          if (wool < 1) wool = 1;
        }
        sheep.wool += wool;
        if (sheep.wool > 1000) sheep.wool = 1000;
      }

      // отнимаем очки у территории
      let territory = this.currentTerritory(sheep.x, sheep.y);
      if (territory && !sheep.drag) {
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
          let sheep1: any;
          let sheep2: any;
          switch (territory.merging.length) {
            case 0:
              sheep1 = false;
              sheep2 = false;
              break;
            case 1:
              sheep1 = this.sheep.children.entries.find((data: any) => data._id === territory.merging[0]._id);
              sheep2 = false;
              break;
            case 2:
              sheep1 = this.sheep.children.entries.find((data: any) => data._id === territory.merging[0]._id);
              sheep2 = this.sheep.children.entries.find((data: any) => data._id === territory.merging[1]._id);
              break;
            default:
              break;
          }
          this.cancelMerging(territory, sheep1, sheep2);
        }
      }
    }

    // бар собирателя
    if (this.state.userSheep.collector > 0) {
      this.state.userSheep.collector--;
    } 

    // задание на накопление денег
    this.tryTask(6, this.state.userSheep.money);

    // задание на овец на поле
    this.checkAnimalTask();

    // отнимание времени до кристалического животного
    if (this.state[`user${this.state.farm}`].diamondAnimalTime > 0) {
      this.state[`user${this.state.farm}`].diamondAnimalTime--;
    }

    // баланс-бары
    this.game.scene.keys['SheepBars'].setBalanceBars(balance);

    // автосохранение
    this.autoSaveTimer++;
    if (this.autoSaveTimer >= this.state.autoSaveSpeed) this.autosave();

    // повтор шага туториала про мерджинг овец
    if (this.state.userSheep.tutorial === 70 && !this.scene.isActive('Tutorial')) {

      this.mergTutor++;
      let successMergin: any = this.territories.children.entries.find((data: any) => data.type === 4);

      if (this.mergTutor > 5 && successMergin.merging.length === 0) this.showTutorial();

    }
    
    // автопрогресс в случае неактивности
    let time: number = Math.round(new Date().getTime() / 1000);
    
    if (time > this.autoprogressTimer + 5) {
      this.state.offlineTime = time - this.autoprogressTimer;
      this.autoprogress();
    }

    this.autoprogressTimer = time;

    // окно с ежедневными наградами
    this.dailyAward();

    // стрелки для некоторых заданий
    if (this.state.userSheep.part < 3) {
      
      let tasks: Itasks[] = this.partTasks();
      tasks.sort((x1: Itasks, x2: Itasks) => {
        if (x1.got_awarded < x2.got_awarded) return -1;
        if (x1.got_awarded > x2.got_awarded) return 1;
        if (x1.done < x2.done) return 1;
        if (x1.done > x2.done) return -1;
        if (x1.sort < x2.sort) return -1;
        if (x1.sort > x2.sort) return 1;
        return 0;
      });

      let task: Itasks = tasks[0];
      
      // задание с продажей шерсти из хранилища
      if (task?.done === 0 && task?.id === 127 && !arrowOnStorage) {

        let territory: any = this.territories.children.entries.find((data: any) => data.type === 5);
        
        if (territory?.volume > 0) {
          arrowOnStorage = Arrow.generate(this, 9, { x: territory.x + 120, y: territory.y + 120 });
        }

      }

      // задание на покупку территории и установку пастбища
      if (task?.done === 0 && task?.id === 5 && !arrowOnTerrirory) {
        
        let territory: any = this.territories.children.entries.find((data: any) => data.block === 3 && data.position === 3);
        arrowOnTerrirory = Arrow.generate(this, 10, { x: territory.x + 120, y: territory.y + 180 });
      }

    }

    // тутор про невключенного подстригателя
    if (this.state.user.additionalTutorial.collector) {

      if (this.state.userSheep.collector === 0 &&
        !arrowOnCollector &&
        !this.scene.isActive('Modal') &&
        !this.scene.isActive('Tutorial') &&
        !this.scene.isActive('Profile') &&
        !this.scene.isActive('Fortune')) {

        this.counterWithoutCollector++;

        if (this.counterWithoutCollector >= 10) {
          this.counterWithoutCollector = 0;
          arrowOnCollector = Arrow.generate(this.game.scene.keys['SheepBars'], 18);
        }

      }

    } else {

      if (this.state.userSheep.tutorial >= 100 && this.state.userSheep.collector === 0 && !this.scene.isActive('Tutorial')) {

        this.counterWithoutCollector++;

        if (this.counterWithoutCollector >= 10 &&
          this.state.userSheep.part >= 2 &&
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

    if (arrowOnCollector && this.state.userSheep.collector > 0) {
      this.counterWithoutCollector = 0;
    }

    if (this.state.newbieTime > 0) this.state.newbieTime--;

    // выдача наград новичка
    if (!this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')) this.getNewbieAward();
    
    // поиск рекламы
    this.findAd();

    this.debug();

    this.nextDayTimer();
    
    if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
     this.state[`user${this.state.farm}`].takenHerdBoost <= 0 && 
     this.state.user.additionalTutorial.herdBoost ) {
      this.state.nativeCounter[3] = 1;
    } else this.state.nativeCounter[3] = 0;

    if (!this.state.user.starterpack && this.state.userSheep.part > 4) this.state.nativeCounter[0] = 1;
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
    if (this.state.userSheep.feedBoostTime > 0) {

      if (Phaser.Math.Between(0, 7) >= 5) { // чтобы не так часто появлялись сердца

        let randomIndex: number = Phaser.Math.Between(0, this.sheep.children.entries.length - 1);
        Hearts.create(this, this.sheep.children.entries[randomIndex]);

      }

      this.state.userSheep.feedBoostTime--;

    }

    // Проверяем и запускаем распростанение овец по полю
    if (this.sheep.children.entries.every(el => el.spread === false)) {

      this.spreadAnimals();

    }
    
    // обновление времени евента
    if (this.state.progress.event.type === 1) {
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
    }

    if (this.state.progress.event.type === 2) {
      if (this.state.progress.event.endTime > 0) {
        this.state.progress.event.endTime--;
      }
    }

    if (this.state.progress.event.endTime <= 0 && 
      this.state.progress.event.eventPoints > 0 && 
      this.state.progress.event.open &&
      this.scene.isActive('Profile') && 
      this.state.progress.event.type === 1) {
      this.autosave();
      this.scene.stop('Profile');
    }
    
    if (this.state.progress.event.endTime <= 0 && 
      this.state.progress.event.eventPoints > 0 && this.state.progress.event.open &&
      !this.scene.isActive('Modal') && 
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile') && 
      this.state.progress.event.type === 1) { 
      
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

    // туториал по ивентовой ферме
    if (this.state.userSheep.part > 4 && 
      (this.state.name !== '' || this.state.user.login !== '') && 
      this.state.progress.event.startTime <= 0 && 
      this.state.progress.event.endTime > 0 &&
      this.state.progress.event.open) {
      if (this.state.user.additionalTutorial.eventTutorial === 0 &&
        !arrowOnMap &&
        !this.scene.isActive('Modal') &&
        !this.scene.isActive('Tutorial') &&
        !this.scene.isActive('Profile')) {
        arrowOnMap = Arrow.generate(this.game.scene.keys[`${this.state.farm}Bars`], 17)
      }
  
      if (this.state.user.additionalTutorial.eventTutorial === 0 &&
        !this.scene.isActive('Tutorial') &&
        this.scene.isActive('Profile') &&
        this.state.progress.event.startTime <= 0 &&
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
  const Scene: Sheep = this;

  const INDENT: number = 20;
  const MILK_DELAY: number = 60;

  const chickenBalance: Ibalance = Scene.farmBalance('Chicken');
  const cowBalance: Ibalance = Scene.farmBalance('Cow');
  const chickenSettings: IchickenSettings = Scene.state.chickenSettings;
  const cowSettings: IcowSettings = Scene.state.cowSettings;

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

        if (eggs < countEggs && (territory.type === 2 || territory.type === 3)) {
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
          if (chicken.diamond >= 5 && chicken.type === 0) {
            Scene.state.chicken = Scene.state.chicken.filter((el: Ichicken)=> el._id !== chicken._id);
          }
        }
      }
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
    if (Scene.state.progress.chicken.collector > 0) {
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
