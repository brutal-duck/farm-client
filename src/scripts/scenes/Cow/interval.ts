import {shortTime} from './../../general/basic';
import Arrow from '../../components/animations/Arrow';
import Hearts from '../../components/animations/Hearts';
import CowSprite from './../../components/Animal/CowSprite';
import Territory from './../../components/Territories/Territory';
import Cow from './Main';
let checkCollector: number = 0;
let sheepCollectorVolume: number = 0;
let chickenCollectorVolume: number = 0;

function interval(): void {

  let statusBalance: boolean = false;
  let checkRaiting: boolean = false;
  let arrowOnMap: Phaser.GameObjects.Sprite;
  const milkDelay: number = 60;
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
      const territory: Territory = this.territories.children.entries[i];
      if ((territory.territoryType === 2 || territory.territoryType === 3) && territory.volume < 1000) {
        const reg: number = this.settings.territoriesCowSettings.find((item: IterritoriesCowSettings) => item.improve === territory.improve).regeneration;
        territory.volume += reg;
        if (territory.volume > 1000) {
          territory.volume = 1000;
        }
      }
    }
    
    // поедание территорий коровами
    for (let i in this.animalGroup.children.entries) {
      const cow: CowSprite = this.animalGroup.children.entries[i];
      // зарождение яйца
      if (cow.milk < cow.settings.maxMilkVolume) {
        let milk: number = cow.settings.maxMilkVolume / milkDelay;
        if (cow.breed === 0) milk = cow.settings.maxMilkVolume / 10;
  
        if (balance.alarm) {
          milk = Math.round(milk / 100 * this.settings.cowBadPercent);
          if (milk < 1) milk = 1;
        }
        cow.milk += milk;
        if (cow.milk > cow.settings.maxMilkVolume) {
          cow.milk = cow.settings.maxMilkVolume;
        }
      }
      
      // отнимаем очки у территории
      const territory: Territory = this.currentTerritory(cow.x, cow.y);
      if (territory && !cow.drag) {
        if (territory.territoryType === 2) {
          if (cow.settings.eating > territory.volume) territory.volume = 0;
          else territory.volume -= cow.settings.eating;
        } else if (territory.territoryType === 3) {
          if (cow.settings.drinking > territory.volume) territory.volume = 0;
          else territory.volume -= cow.settings.drinking;
        }
      }
    }

    // меняем спрайты территорий, если нужно
    for (let i in this.territories.children.entries) {
      const territory: Territory = this.territories.children.entries[i];
      if (territory.territoryType === 2 || territory.territoryType === 3 || territory.territoryType === 5) {
        territory.changeSprite();
      }
      if (territory.territoryType === 4) {
        if (territory.mergingCounter > 0) territory.mergingCounter++;
        if (territory.mergingCounter > this.state.maxMerginTime) {
          let cow1: CowSprite | boolean;
          let cow2: CowSprite | boolean;
          switch (territory.merging.length) {
            case 0:
              cow1 = false;
              cow2 = false;
              break;
            case 1:
              cow1 = this.animalGroup.children.entries.find((data: any) => data._id === territory.merging[0]._id);
              cow2 = false;
              break;
            case 2:
              cow1 = this.animalGroup.children.entries.find((data: any) => data._id === territory.merging[0]._id);
              cow2 = this.animalGroup.children.entries.find((data: any) => data._id === territory.merging[1]._id);;
              break;
            default:
              break;
          }
          this.cancelMerging(territory, cow1, cow2);
        }
      }
    }

    // бар собирателя
    if (this.state.userCow.collector > 0) {
      this.state.userCow.collector--;
    } 

    // задание на накопление денег
    this.tryTask(6, this.state.userCow.money);

    // задание на коровы на поле
    this.checkAnimalTask();

    // баланс-бары
    this.game.scene.keys['CowBars'].setBalanceBars(balance);
    
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
      
    // отнимание времени до кристалического животного
    if (this.state[`user${this.state.farm}`].diamondAnimalTime > 0) {
      this.state[`user${this.state.farm}`].diamondAnimalTime--;
    }
    // поиск рекламы
    this.findAd();

    // this.debug();

    this.nextDayTimer();

    if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys['Cow'].herdBoostLvl &&
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

    if (this.state.userCow.feedBoostTime > 0) {
      if (Phaser.Math.Between(0, 7) >= 5) { 
        let randomIndex: number = Phaser.Math.Between(0, this.animalGroup.children.entries.length - 1);
        Hearts.create(this, this.animalGroup.children.entries[randomIndex])
      }
      this.state.userCow.feedBoostTime--;
    }

    if (this.state.userCow.factory.boostTime > 0) {
      this.state.userCow.factory.boostTime--;
    }

    // Проверяем и запускаем распростанение овец по полю
    if (this.animalGroup.children.entries.every(el => el.spread === false)) {
      this.spreadAnimals();
    }

    if (this.state.progress.event.type === 2) {
      if (this.state.progress.event.endTime > 0) {
        this.state.progress.event.endTime--;
      }
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
          const modal: Imodal = {
            type: 12,
          };
          this.state.modal = modal;
          this.scene.launch('Modal', this.state);
        }
      }

    }

    if ((this.state.name !== '' || this.state.user.login !== '') && 
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
        this.state.progress.event.open) {
        this.showEventTutorial();
      }
    }


    const factoryTerritory: Territory = this.territories.children.entries.find((data: Territory) => data.territoryType === 8);
    factoryTerritory.productionOfProducts();

    arrayInterval.bind(this)();
  }, callbackScope: this, loop: true });
}

function arrayInterval(): void {
  const Scene: Cow = this;
  const INDENT: number = 20;
  const chickenBalance: Ibalance = Scene.farmBalance('Chicken');
  const sheepBalance: Ibalance = Scene.farmBalance('Sheep');
  const chickenSettings: IchickenSettings = Scene.state.chickenSettings;
  const sheepSettings: IsheepSettings = Scene.state.sheepSettings;

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

    if (Scene.state.progress.sheep.collector > 0) {
      const speed: number = Scene.state.sheepCollectorSettings.find((data: IcollectorSettings) => data.level === Scene.state.userSheep.collectorLevel).speed;
      const SEC: number = 1000;
      sheepCollectorVolume += 2 * SEC;
      let collectedWool: number = Math.floor(sheepCollectorVolume / speed / SEC);
      if (collectedWool > 0) {
        sheepCollectorVolume -= collectedWool * speed * SEC;
        for (let i in Scene.state.chickenTerritories) {
          const territory: Iterritories = Scene.state.chickenTerritories[i];
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
}

export default interval;
