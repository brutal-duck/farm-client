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

    this.intervalPorgressCollectorTime();

    this.sheepIntervalProgress();
    this.chickenIntervalProgress();
    if (checkCollector < 2) {
      checkCollector += 1;
    } else {
      checkCollector = 0;
      this.sheepCollectorProgress(sheepCollectorVolume);
      this.chickenCollectorProgress(chickenCollectorVolume);
    }
    
    this.updateProfileNative();
  }, callbackScope: this, loop: true });
}


export default interval;
