import {shortTime} from './../../general/basic';
import Arrow from '../../components/animations/Arrow';
import Hearts from '../../components/animations/Hearts';
import CowSprite from './../../components/Animal/CowSprite';
import Territory from './../../components/Territories/Territory';
import SpeechBubble from '../../components/animations/SpeechBuble';
import Factory from './../../components/Territories/Factory';
import CowTerritory from './../../components/Territories/CowTerritory';
import { decrementAdFreeDiamondTime, incFortuneAdTimer, incInterstitialAdTimer, progressClanCooldown, progressClanEventTime, progressSalesTime, showSale } from '../../general/interval';
import { Task } from '../../local/tasks/types';
import Utils from './../../libs/Utils';

let checkCollector: number = 0;
let sheepCollectorVolume: number = 0;
let chickenCollectorVolume: number = 0;
let arrowOnCollector: Phaser.GameObjects.Sprite;
let arrowOnTerrirory: Phaser.GameObjects.Sprite;
let arrowOnFactory: Phaser.GameObjects.Sprite;
const BALANCE_HINT_COUNTDOWN = 20;
let balanceCounter: number = 0;
let balanceCounterMultiplier: number = 1;

function interval(): void {

  let statusBalance: boolean = false;
  let checkRaiting: boolean = false;
  let arrowOnMap: Phaser.GameObjects.Sprite;
  const MILK_DELAY: number = 10;
  this.time.addEvent({ delay: 1000, callback: (): void => {
    
    // проверка подключения к интернету
    this.onlineStatus();

    let balance: Ibalance = this.balance();

    // Подсказка при отрицательном балансе
    if (balance.notEnoughGrass || balance.notEnoughWater) {
      balanceCounter++;

      if (balanceCounter >= BALANCE_HINT_COUNTDOWN * balanceCounterMultiplier) {
        SpeechBubble.create(this.game.scene.keys['CowBars'], this.state.lang.remainderBalance, 4);
        balanceCounter = 0;
        balanceCounterMultiplier++;
      }

      if (Phaser.Math.Between(0, 7) >= 5 && this.animalGroup.children.entries.length > 0) {
        let randomIndex: number = Phaser.Math.Between(0, this.animalGroup.children.entries.length - 1);
        let textures: string[] = ['not-enought-water', 'not-enought-grass'];
        let texture: string = textures[Phaser.Math.Between(0, 1)];

        if (balance.notEnoughGrass && !balance.notEnoughWater) texture = 'not-enought-grass';
        else if (balance.notEnoughWater && !balance.notEnoughGrass) texture = 'not-enought-water';
        
        Hearts.create(this, this.animalGroup.children.entries[randomIndex], texture);
      }

    } else if (balanceCounter !== 0 && balanceCounterMultiplier !== 1) {
      balanceCounter = 0;
      balanceCounterMultiplier = 1;
    }

    if (!statusBalance && balance.alarm) {
      this.state.amplitude.logAmplitudeEvent('resources', {
        status: 'problem started',
      });

    } else if (statusBalance && !balance.alarm) {
      this.state.amplitude.logAmplitudeEvent('resources', {
        status: 'problem is over',
      });
    }

    statusBalance = balance.alarm;

    let checkTerritory = true;
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
      checkTerritory = checkTerritory && territory.territoryType !== 0;
    }

    if (checkTerritory) this.achievement.tryId(37);
    
    let diamondAnimalCount = 0;
    // поедание территорий коровами
    for (let i in this.animalGroup.children.entries) {
      const cow: CowSprite = this.animalGroup.children.entries[i];
      if (cow.breed === 0) diamondAnimalCount += 1;
      // зарождение яйца
      if (cow.milk < cow.settings.maxMilkVolume) {
        let milk: number = cow.settings.maxMilkVolume / MILK_DELAY;
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
    if (diamondAnimalCount >= 5) this.achievement.tryId(9);

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



    if (this.state.userCow.part <= 2) {
      
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
      // задание на покупку территории и установку пастбища
      if (task?.done === 0 && task?.id === 137 && !arrowOnTerrirory) {
        let territory: any = this.territories.children.entries.find((data: Territory) => data.block === 3 && data.position === 1);
        arrowOnTerrirory = Arrow.generate(this, 10, { x: territory.x + 120, y: territory.y + 180 });
      }

      const factory: CowTerritory = this.territories.children.entries.find((el: CowTerritory) => el.territoryType === 8)
      let milkTask: Itasks | Task = tasks.find(el => el.id === 138);
      let factoryTask: Itasks | Task = tasks.find(el => el.id === 137);
      
      if (Utils.checkTestB(this.state)) {
        const tasks: Task[] = this.partTasks();
        milkTask = tasks.find(el => el.id === '2-1');
        factoryTask = tasks.find(el => el.id === '2-3');
      }
      if (milkTask?.done === 1 && (factoryTask?.done === 1 || factory)
        && !this.scene.isActive('Tutorial')
        && !this.scene.isActive('Modal')
        && !this.scene.isActive('Profile')
        && !this.scene.isActive('Fortune') 
        && this.state.userCow.tutorial < 50
        && this.state.userCow.tutorial >= 10) {
        this.showTutorial();
      }
    }
    
    if (this.state.userCow.tutorial === 0 && this.state.userCow.part >= 3) this.state.userCow.tutorial = 50;
    // бар собирателя
    if (this.state.userCow.collector > 0) {
      this.state.userCow.collector--;
    } 

    this.intervalCollectorTutorial(arrowOnCollector);
    // задание на накопление денег
    this.tryTask(6, 0, 0, this.state.userCow.money);

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
      
    // поиск рекламы
    this.ads.findAd();

    this.nextDayTimer();

    if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys['Cow'].herdBoostLvl &&
    this.state[`user${this.state.farm}`].takenHerdBoost <= 0 && 
     this.state.user.additionalTutorial.herdBoost) {
      this.state.shopNotificationCount[3] = 1;
    } else this.state.shopNotificationCount[3] = 0;

    if (!this.state.user.takenFreeDiamonds) this.state.shopNotificationCount[0] = 1;
    else this.state.shopNotificationCount[0] = 0;
    
    this.game.scene.keys[`${this.state.farm}Bars`].updateNotificationShop();


    if (this.state.donate &&
      !this.scene.get('Modal').load.isLoading() &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')) this.showDonate();

    if (this.state.userCow.feedBoostTime > 0) {
      if (Phaser.Math.Between(0, 7) >= 5 && this.animalGroup.children.entries.length > 0) { 
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
        this.state.progress.event.open &&
        !this.state.userUnicorn?.takenAward &&
        this.state.userUnicorn?.points > 0 &&
        this.scene.isActive('Profile')) {
        this.autosave();
        this.scene.stop('Profile');
      }
  
      if (this.state.progress.event.endTime <= 0 && 
        !this.state.userUnicorn?.takenAward && 
        this.state.userUnicorn?.points > 0 &&
        this.state.progress.event.open &&
        !this.scene.get('Modal').load.isLoading() &&
        !this.scene.isActive('Modal') && 
        !this.scene.isActive('Tutorial') &&
        !this.scene.isActive('Profile') && 
        this.state.progress.event.type === 1) { 
        if (!checkRaiting) {
          this.getEventRaiting();
          checkRaiting = true;
        }
        
        if (this.state.unicornRaitings?.updated) {
          let modal: Imodal = {
            type: 12,
          };
  
          this.state.modal = modal;
          this.scene.launch('Modal', this.state);
        }
      }

    }

    if ((this.state.name !== '' ||  this.state.user.login !== ''
    || this.state.platform === 'ya' && !this.state.yaPlayer) && 
      this.state.progress.event.startTime <= 0 && 
      this.state.progress.event.endTime > 0 &&
      this.state.progress.event.open) {
        if ((this.state.userUnicorn?.tutorial === 0 &&
          this.state.progress.event.type === 1) &&
          !arrowOnMap && !this.scene.isActive('Modal') &&
          !this.scene.isActive('Tutorial') &&
          !this.scene.isActive('Profile')) {
          Arrow.generate(this.game.scene.keys[`${this.state.farm}Bars`], 17);
        }
    
        if ((this.state.userUnicorn?.tutorial === 0 &&
          this.state.progress.event.type === 1) &&
          !this.scene.isActive('Tutorial') &&
          this.scene.isActive('Profile') &&
          this.state.progress.event.open) {
          this.showEventTutorial();
        }
    }


    const factoryTerritory: CowTerritory = this.territories.children.entries.find((data: CowTerritory) => data.territoryType === 8);
    if (factoryTerritory) {
      const factory: Factory = factoryTerritory.factory;
      if (factory) {
        if (this.state.userCow.tutorial >= 50) {
          factory.productionOfProducts();
        }
        if (factory.money > 0 && !arrowOnFactory?.active && !factory.currentProduction) {
            arrowOnFactory = Arrow.generate(this, 19, { x: factoryTerritory.x + 120, y: factoryTerritory.y + 180 });
        }
      }
    }

    this.intervalPorgressCollectorTime();

    this.sheepIntervalProgress();
    this.chickenIntervalProgress();
    this.progressTerritoryCooldown(this.territories.children.entries, 1, 'Cow');
    if (checkCollector < 2) {
      checkCollector += 1;
    } else {
      checkCollector = 0;
      sheepCollectorVolume = this.sheepCollectorProgress(sheepCollectorVolume);
      chickenCollectorVolume = this.chickenCollectorProgress(chickenCollectorVolume);
    }
    
    this.updateProfileNotification();
    this.showFeedBoostSpeechBubble();
    progressClanCooldown(this.state);
    progressSalesTime(this.state);

    const volume: number = this.territories.children.entries.find(el => el.territoryType === 5)?.volume;
    this.tryTask(26, 0, 0, Math.round(volume));

    // Звуки
    if (this.animalGroup?.children.entries.length > 0 && time % 14 === 0) {
      this.playSoundOnce(`cow-sound-${Phaser.Math.Between(1, 3)}`)
    }
    
    this.tryClanTask(18);

    progressClanEventTime(this.state);
    if (
      !this.state.clanEventTakenAward &&
      !this.scene.get('Modal').load.isLoading() &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile') &&
      !this.scene.isActive('Fortune')
    ) {
      this.state.modal = { type: 22 };
      this.scene.launch('Modal', this.state);
    }

    showSale(this);
    this.speedCheckCollector();
    decrementAdFreeDiamondTime(this.state);
    incInterstitialAdTimer(this.state);
    incFortuneAdTimer(this.state);

    if (this.state.userCow.part === 2) {
      if (this.territories.children.entries.some(el => el.territoryType === 8)) {
        this.tryTask(5, 8);
      }
    }
    if (this.state.user.clanTasks.length > 0 && this.state.user.clanTasks.every((el: IclanTask) => el.done)) {
      this.achievement.tryId(122);
    }
  }, callbackScope: this, loop: true });
}


export default interval;
