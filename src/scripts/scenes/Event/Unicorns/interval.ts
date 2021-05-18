import { randomString, shortNum, shortTime } from '../../../general/basic';
import Hearts from '../../../components/animations/Hearts';
import BigInteger from '../../../libs/BigInteger';
import Unicorn from './Main';
let checkCollector: number = 0;
let sheepCollectorVolume: number = 0;
let chickenCollectorVolume: number = 0;
let cowCollectorVolume: number = 0;
function interval(): void {

  this.time.addEvent({ delay: 1000, callback: (): void => {
    
    // проверка подключения к интернету
    this.onlineStatus();
    
    for (let i in this.animals.children.entries) {

      const animal: Phaser.Physics.Arcade.Sprite = this.animals.children.entries[i].data.values.active;
      const breed: number = animal.data.values.base.data.values.type;
      const points: IeventPoints = this.state.unicornSettings.unicornSettings.find((item: IeventPoints) => item.breed === breed);

      if (animal.data.values.working) {
        // зарождение ресурса
        if (animal.data.values.resource < 1000) {
        const resource: number = points.resource;
        animal.data.values.resource += resource;
        if (animal.data.values.resource > 1000) animal.data.values.resource = 1000;
      }

      if (animal.data.values.resource === 1000 && this.resources.getLength() <= this.maxCountResource) {
        const resource: IeventResource = {
          type: animal.data.values.base.data.values.type,
          x: animal.x,
          y: animal.y + animal.height / 2,
          _id: 'local_' + randomString(18)
        };
        this.getResource(resource);
        animal.data.values.resource = 0;  
        }
      }
    }    

    for (let i in this.resources.children.entries) {
      const resource: Phaser.Physics.Arcade.Sprite = this.resources.children.entries[i];
      resource.data.values.timeout++;
    }
    
    // бар собирателя
    if (this.state.userUnicorn.collector > 0) {
      this.state.userUnicorn.collector--;
    } 
    
    if (this.state.userUnicorn.herdBoostAnimals.length > 0) {
      this.startCreateHerdBoostAnimal = true;
    }
    if (this.startCreateHerdBoostAnimal) {
      const freePositions: Iposition[] = this.getFreeBoostPositions();
      this.createBoostAnimal(freePositions);
    }

    if (this.scene.isActive('Modal') && this.state.modal.type === 11) {
      this.game.scene.keys['Modal'].eventLeftTime.setText(shortTime(this.state.progress.event.endTime, this.state.lang));
    }
    // уменьшаем время буста комбикорм
    if (this.state.userUnicorn.feedBoostTime > 0) {
      if (Phaser.Math.Between(0, 7) >= 5) { // чтобы не так часто появлялись сердца
        const randomIndex: number = Phaser.Math.Between(0, this.animals.children.entries.length - 1);
        if (this.animals.children.entries[randomIndex].data.values.active.data.values.working) {
          Hearts.create(this, this.animals.children.entries[randomIndex].data.values.active);
        }
      }
      this.state.userUnicorn.feedBoostTime--;
      this.game.scene.keys['UnicornBars'].feedBoostTime.setText(shortTime(this.state.userUnicorn.feedBoostTime,this.state.lang))
    }
    
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

    // // поиск рекламы
    this.findAd();
    
    // this.debug();

    this.nextDayTimer();


    if (this.state[`user${this.state.farm}`].maxLevelAnimal >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
     this.state[`user${this.state.farm}`].takenHerdBoost <= 0 && 
     this.state.user.additionalTutorial.herdBoost) {
      this.state.nativeCounter[3] = 1;
    } else this.state.nativeCounter[3] = 0;

    if (!this.state.user.starterpack && this.state.user.additionalTutorial.eventTutorial > 70) this.state.nativeCounter[0] = 1;
    else this.state.nativeCounter[0] = 0;

    let nativeCount = 0;
    
    for (let i = 0; i < this.state.nativeCounter.length; i++) {
      nativeCount += this.state.nativeCounter[i];
    }
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShopCounter.setText(nativeCount);

    let proceeds: string = String(0);
    this.animals.children.entries.forEach(animal => {
      if (animal.data.values.active.data.values.working) {
        let price: string = this.state.unicornSettings.unicornSettings.find((data: IeventPoints) => data.breed === animal.data.values.type).resourcePrice;
        proceeds = BigInteger.add(proceeds, price);
      }
    });
    
    if (this.state.userUnicorn.collector <= 0) proceeds = String(0);
    const text1: string = `${this.state.lang.income} ${shortNum(BigInteger.divide(proceeds, String(10)))}/${this.state.lang.seconds}`;
    const text2: string = `${shortNum(BigInteger.divide(proceeds, String(10)))}/${this.state.lang.seconds}`;
    const text3: string = `${this.state.lang.income} ${shortNum(BigInteger.divide(proceeds, String(10)))}/${this.state.lang.seconds}`;
    
    if (
      this.state.userUnicorn.collector > 0 && 
      this.state.userUnicorn.feedBoostTime <= 0 && 
      this.game.scene.keys['UnicornBars'].proceedsText.text !== text1
    ) {
      this.game.scene.keys['UnicornBars'].proceedsText.setText(text1);
  
    } else if (
      this.state.userUnicorn.feedBoostTime > 0 &&
      this.game.scene.keys['UnicornBars'].proceedsText.text !== text2
    ) { 
      this.game.scene.keys['UnicornBars'].proceedsText.setText(text2);
    } else if (
      this.state.userUnicorn.feedBoostTime <= 0 &&
      this.game.scene.keys['UnicornBars'].proceedsText.text !== text3
    ) {
      this.game.scene.keys['UnicornBars'].proceedsText.setText(text3);
    } 
    

    // Обновление иконки feed буста
    if (this.state.userUnicorn.maxLevelAnimal >= this.game.scene.keys['Unicorn'].feedBoostLvl &&
    this.state.user.additionalTutorial.feedBoost) {
      
      if (this.state.userUnicorn.feedBoostTime > 0 && !this.game.scene.keys['UnicornBars'].feedBoostTime.visible) {
        this.game.scene.keys['UnicornBars'].proceedsText.y = 80;
        this.game.scene.keys['UnicornBars'].proceedsText.setColor('#cbff40');
        this.game.scene.keys['UnicornBars'].feedBoostDoubledIcon.setVisible(true);
        this.game.scene.keys['UnicornBars'].feedBoostIcon.setVisible(true);
        this.game.scene.keys['UnicornBars'].feedBoostTime.setVisible(true);
      } else if (this.state.userUnicorn.feedBoostTime <= 0 && this.game.scene.keys['UnicornBars'].feedBoostTime.visible) {
        this.game.scene.keys['UnicornBars'].proceedsText.y = 92;
        this.game.scene.keys['UnicornBars'].proceedsText.setColor('#f2ede4');
        this.game.scene.keys['UnicornBars'].feedBoostDoubledIcon.setVisible(false);
        this.game.scene.keys['UnicornBars'].feedBoostIcon.setVisible(false);
        this.game.scene.keys['UnicornBars'].feedBoostTime.setVisible(false);
      }
    }

    // повтор шага туториала про мерджинг животных
    if ((this.state.user.additionalTutorial.eventTutorial === 40 || 
      this.state.user.additionalTutorial.eventTutorial === 50) && 
      !this.scene.isActive('Tutorial')) {

      this.mergTutor++;
      const dragAnimal: Phaser.GameObjects.Sprite = this.animals.children.entries.find((data: Phaser.GameObjects.Sprite) => data.data.values.active.data.values.drag);
      if (this.mergTutor > 5 && !dragAnimal) this.showEventTutorial();
    }

     // обновление времени евента
     if (this.state.progress.event.type === 1) {
       if (this.state.progress.event.endTime > 0) {
         this.state.progress.event.endTime--;
         if ( this.scene.isActive('Profile')) {
           this.game.scene.keys['Profile'].eventEndTime?.setText(shortTime(this.state.progress.event.endTime, this.state.lang));
         } 
       }
   
       if (this.state.progress.event.endTime <= 0 && this.scene.isActive('Unicorn')) {
         this.autosave();
         this.scene.stop('Profile');
         this.scene.stop('MapBars');
         this.scene.stop('Unicorn');
         this.scene.stop('UnicornBars');
         this.scene.start('SheepPreload', this.state);
       }
   
       if (this.state.progress.event.startTime > 0) {
         this.state.progress.event.startTime--;
         if (this.scene.isActive('Profile')) {
           this.game.scene.keys['Profile'].eventStartTime?.setText(shortTime(this.state.progress.event.startTime, this.state.lang));
         }
       }
    }
    
    if (this.state.userUnicorn.timeToAd > 0) {
      --this.state.userUnicorn.timeToAd;
    }

    this.intervalPorgressCollectorTime();
    arrayInterval.bind(this)();
  }, callbackScope: this, loop: true });
}

function arrayInterval(): void {
  const Scene: Unicorn = this;

  const INDENT: number = 20;
  const MILK_DELAY: number = 60;

  const chickenBalance: Ibalance = Scene.farmBalance('Chicken');
  const cowBalance: Ibalance = Scene.farmBalance('Cow');
  const chickenSettings: IchickenSettings = Scene.state.chickenSettings;
  const cowSettings: IcowSettings = Scene.state.cowSettings;
  const sheepBalance: Ibalance = Scene.farmBalance('Sheep');
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
}

export default interval;
