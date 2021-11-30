import { shortTime } from '../../general/basic';
import Arrow from '../../components/animations/Arrow';
import Hearts from '../../components/animations/Hearts';
import SpeechBubble from '../../components/animations/SpeechBuble';
import SheepTerritory from './../../components/Territories/SheepTerritory';
import { decrementAdFreeDiamondTime, incFortuneAdTimer, incInterstitialAdTimer, progressClanCooldown, progressClanEventTime, progressSalesTime, showSale } from '../../general/interval';
import Utils from './../../libs/Utils';
import Territory from './../../components/Territories/Territory';
import { Task } from '../../local/tasks/types';

let checkCollector: number = 0;
const BALANCE_HINT_COUNTDOWN = 30;
let balanceCounter: number = 0;
let balanceCounterMultiplier = 1;
let chickenCollectorVolume: number = 0;
let cowCollectorVolume: number = 0;

function interval(): void {
  
  let statusBalance: boolean = false;
  let checkRaiting: boolean = false;
  let arrowOnStorage: Phaser.GameObjects.Sprite;
  let arrowOnTerrirory: Phaser.GameObjects.Sprite;
  let arrowOnMerging: Phaser.GameObjects.Sprite;
  let arrowOnMap: Phaser.GameObjects.Sprite;
  let arrowOnCollector: Phaser.GameObjects.Sprite;
  this.time.addEvent({ delay: 1000, callback: (): void => {
    
    this.remainderSellResource();
    // проверка подключения к интернету
    this.onlineStatus();

    let balance: Ibalance = this.balance();

    // Подсказка при отрицательном балансе
    if (balance.notEnoughGrass || balance.notEnoughWater) {
      balanceCounter++;

      if (balanceCounter >= BALANCE_HINT_COUNTDOWN * balanceCounterMultiplier && this.state.userSheep.part >= 2) {
        SpeechBubble.create(this.game.scene.keys['SheepBars'], this.state.lang.remainderBalance, 4);
        balanceCounter = 0;
        balanceCounterMultiplier++;
      }

      if (Phaser.Math.Between(0, 7) >= 5 && this.state.userSheep.tutorial >= 100 && this.sheep.children.entries.length > 0) {
        let randomIndex: number = Phaser.Math.Between(0, this.sheep.children.entries.length - 1);
        let textures: string[] = ['not-enought-water', 'not-enought-grass'];
        let texture: string = textures[Phaser.Math.Between(0, 1)];

        if (balance.notEnoughGrass && !balance.notEnoughWater) texture = 'not-enought-grass';
        else if (balance.notEnoughWater && !balance.notEnoughGrass) texture = 'not-enought-water';
        
        Hearts.create(this, this.sheep.children.entries[randomIndex], texture);
      }

    } else if (balanceCounter !== 0 && balanceCounterMultiplier !== 1) {
      balanceCounter = 0;
      balanceCounterMultiplier = 1;
    }

    if (!statusBalance && balance.alarm) {

      // тутор про нарушение баланса воды или травы
      if (!this.state.user.additionalTutorial.balance && this.state.userSheep.tutorial >= 100 && !this.caveTutor) {

        this.state.user.additionalTutorial.balance = true;
        this.showTutorial('balance');

      }

      this.state.amplitude.logAmplitudeEvent('resources', {
        status: 'problem started',
      });

    } else if (statusBalance && !balance.alarm) {

      this.state.amplitude.logAmplitudeEvent('resources', {
        status: 'problem is over',
      });

    }

    statusBalance = balance.alarm;

    // тутор про пещеру
    if (this.state.userSheep.part >= 3 &&
      !this.state.user.additionalTutorial.cave &&
      this.state.userSheep.diamondAnimalTime === 0 &&
      !this.scene.get('Modal').load.isLoading() &&
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
    !this.scene.get('Modal').load.isLoading() &&
    !this.scene.isActive('Modal') &&
    !this.scene.isActive('Tutorial') &&
    !this.scene.isActive('Profile')&&
    !this.scene.isActive('Fortune')) {
    this.showTutorial('herdBoost1');
    }

    // тутор про бустер комбикорм
    if (this.state.userSheep.part >= this.feedBoostLvl &&
      !this.state.user.additionalTutorial.feedBoost &&
      !this.scene.get('Modal').load.isLoading() &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')&&
      !this.scene.isActive('Fortune')) {
      this.showTutorial('feedBoost1');
      }

    let checkTerritory = true;
    // восстановаление территорий
    for (let i in this.territories.children.entries) {
      let territory: SheepTerritory = this.territories.children.entries[i];
      if ((territory.territoryType === 2 || territory.territoryType === 3) && territory.volume < 1000) {
        let reg: number = this.settings.territoriesSheepSettings.find((item: IterritoriesSheepSettings) => item.improve === territory.improve).regeneration;
        if (Utils.checkTestB(this.state)) reg = this.state.sheepSettings.partSettings[territory.improve - 1].territory.regeneration;
        territory.volume += reg;
        if (territory.volume > 1000) {
          territory.volume = 1000;
        }
      }
      checkTerritory = checkTerritory && territory.territoryType !== 0;
    }
    if (checkTerritory) this.achievement.tryId(35);

    let diamondAnimalCount = 0;
    // поедание территорий животным
    for (let i in this.sheep.children.entries) {
      let sheep = this.sheep.children.entries[i];
      if (sheep.type === 0) diamondAnimalCount += 1;
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
      let territory: SheepTerritory = this.currentTerritory(sheep.x, sheep.y);
      if (territory && !sheep.drag) {
        if (territory.territoryType === 2) {
          if (points.eating > territory.volume) territory.volume = 0;
          else territory.volume -= points.eating;
        } else if (territory.territoryType === 3) {
          if (points.drinking > territory.volume) territory.volume = 0;
          else territory.volume -= points.drinking;
        }
      }
    }

    if (diamondAnimalCount >= 5) this.achievement.tryId(9);
    // меняем спрайты территорий, если нужно
    for (let i in this.territories.children.entries) {
      const territory: SheepTerritory = this.territories.children.entries[i];
      if (territory.territoryType === 2 || territory.territoryType === 3 || territory.territoryType === 5) {
        territory.changeSprite();
      }
      if (territory.territoryType === 4) {
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
    this.tryTask(6, 0, 0, this.state.userSheep.money);

    // задание на овец на поле
    this.checkAnimalTask();

    // баланс-бары
    this.game.scene.keys['SheepBars'].setBalanceBars(balance);

    // автосохранение
    this.autoSaveTimer++;
    if (this.autoSaveTimer >= this.state.autoSaveSpeed) this.autosave();

    // повтор шага туториала про мерджинг овец
    if (this.state.userSheep.tutorial === 70 && !this.scene.isActive('Tutorial')) {

      this.mergTutor++;
      let successMergin: any = this.territories.children.entries.find((data: any) => data.territoryType === 4);

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
    if (this.state.userSheep.part <= 3) {
      
      let tasks = this.partTasks();
      if (Utils.checkTestB(this.state)) {
        tasks.sort((x1: Task, x2: Task) => {
          if (x1.awardTaken < x2.awardTaken) return -1;
          if (x1.awardTaken > x2.awardTaken) return 1;
          if (x1.done < x2.done) return 1;
          if (x1.done > x2.done) return -1;
          if (x1.sort < x2.sort) return -1;
          if (x1.sort > x2.sort) return 1;
          return 0;
        });
      } else {
        tasks.sort((x1: Itasks, x2: Itasks) => {
          if (x1.got_awarded < x2.got_awarded) return -1;
          if (x1.got_awarded > x2.got_awarded) return 1;
          if (x1.done < x2.done) return 1;
          if (x1.done > x2.done) return -1;
          if (x1.sort < x2.sort) return -1;
          if (x1.sort > x2.sort) return 1;
          return 0;
        });
      }

      let task = tasks[0];
      
      // задание с продажей шерсти из хранилища
      if (task?.done === 0 && (task?.id === 127 || task?.id === '1-4') && !arrowOnStorage) {
        let territory: any = this.territories.children.entries.find((data: any) => data.territoryType === 5);
        if (territory?.volume > 0) {
          arrowOnStorage = Arrow.generate(this, 9, { x: territory.x + 120, y: territory.y + 120 });
        }

      }

      // задание на покупку территории и установку пастбища
      if (task?.done === 0 && (task?.id === 5 || task?.id === '2-1' || task?.id === '2-2') && !arrowOnTerrirory) {
        let territory: Territory = this.territories.children.entries.find((data: any) => data.block === 3 && data.position === 3);
        arrowOnTerrirory = Arrow.generate(this, 10, { x: territory.x + 120, y: territory.y + 180 });
      }

      if (task?.done === 0 && task?.id === '3-4' && !arrowOnMerging) {
        const territory: Territory = this.territories.children.entries.find((data: Territory) => data.territoryType === 4);
        arrowOnMerging = Arrow.generate(this, 21, { x: territory.x + 120, y: territory.y + 180 });
      }

    }

    this.intervalCollectorTutorial(arrowOnCollector);

    if (this.state.newbieTime > 0) this.state.newbieTime--;

    // выдача наград новичка
    if (!this.scene.isActive('Modal') &&
      !this.scene.get('Modal').load.isLoading() &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')) this.getNewbieAward();
    
    // поиск рекламы
    this.ads.findAd();

    this.nextDayTimer();
    
    if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
     this.state[`user${this.state.farm}`].takenHerdBoost <= 0 && 
     this.state.user.additionalTutorial.herdBoost ) {
      this.state.shopNotificationCount[3] = 1;
    } else this.state.shopNotificationCount[3] = 0;

    if (!this.state.user.takenFreeDiamonds && this.state.userSheep.tutorial >= 100) this.state.shopNotificationCount[0] = 1;
    else this.state.shopNotificationCount[0] = 0;

    this.game.scene.keys[`${this.state.farm}Bars`].updateNotificationShop();

    if (this.state.donate &&
      !this.scene.get('Modal').load.isLoading() &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')) this.showDonate();
      
    // уменьшаем время буста комбикорм
    if (this.state.userSheep.feedBoostTime > 0) {

      if (Phaser.Math.Between(0, 7) >= 5 && this.sheep.children.entries.length > 0) { // чтобы не так часто появлялись сердца

        let randomIndex: number = Phaser.Math.Between(0, this.sheep.children.entries.length - 1);
        Hearts.create(this, this.sheep.children.entries[randomIndex]);

      }

      this.state.userSheep.feedBoostTime--;

    }

    // Проверяем и запускаем распростанение овец по полю
    if (this.sheep.children.entries.every(el => el.spread === false)) this.spreadAnimals();
    
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

    if (this.state.progress.event.endTime <= 0 && 
      !this.state.userUnicorn?.takenAward &&
      this.state.userUnicorn?.points > 0 &&
      this.state.progress.event.open &&
      this.scene.isActive('Profile')) {
      this.autosave();
      this.scene.stop('Profile');
    }
    
    // туториал по ивентовой ферме
    if (this.state.userSheep.part > 4 && 
      (this.state.name !== '' ||  this.state.user.login !== ''
      || this.state.platform === 'ya' && !this.state.yaPlayer) && 
      this.state.progress.event.startTime <= 0 && 
      this.state.progress.event.endTime > 0 &&
      this.state.progress.event.open) {
      if ((this.state.userUnicorn?.tutorial === 0 &&
        this.state.progress.event.type === 1) &&
        !arrowOnMap && !this.scene.isActive('Modal') &&
        !this.scene.isActive('Tutorial') &&
        !this.scene.isActive('Profile')) {
        arrowOnMap = Arrow.generate(this.game.scene.keys[`${this.state.farm}Bars`], 17);
      }
  
      if ((this.state.userUnicorn?.tutorial === 0 &&
        this.state.progress.event.type === 1) &&
        !this.scene.isActive('Tutorial') &&
        this.scene.isActive('Profile') &&
        this.state.progress.event.open) {
        this.showEventTutorial();
      }
    }

    if ((this.state.clanTutor || this.state.fortuneTutor) && 
      !arrowOnMap && 
      !this.scene.get('Modal').load.isLoading() &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')) {
      arrowOnMap = Arrow.generate(this.game.scene.keys[`${this.state.farm}Bars`], 20);
    }

    if (this.state.clanTutor && this.scene.isActive('Profile') && !this.scene.isActive('Tutorial')) {
      this.showTutorial('clan');
    }

    if (this.state.fortuneTutor && this.scene.isActive('Profile') && !this.scene.isActive('Tutorial')) {
      this.showTutorial('fortune');
    }
    
    this.intervalPorgressCollectorTime();

    this.chickenIntervalProgress();
    this.cowIntervalProgress();
    this.progressTerritoryCooldown(this.territories.children.entries, 1, 'Sheep');
    
    if (checkCollector < 2) {
      checkCollector += 1;
    } else {
      checkCollector = 0;
      chickenCollectorVolume = this.chickenCollectorProgress(chickenCollectorVolume);
      cowCollectorVolume = this.cowCollectorProgress(cowCollectorVolume);
    }
    this.cowFactoryProgress();
    progressClanCooldown(this.state);
    progressSalesTime(this.state);

    this.updateProfileNotification();
    this.showFeedBoostSpeechBubble();

    // Звуки
    if (this.sheep?.children.entries.length > 0 && time % 14 === 0) {
      this.playSoundOnce(`sheep-sound-${Phaser.Math.Between(1, 2)}`)
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
    if (this.state.user.clanTasks.length > 0 && this.state.user.clanTasks.every((el: IclanTask) => el.done)) {
      this.achievement.tryId(122);
    }

  }, callbackScope: this, loop: true });
  

}

export default interval;
