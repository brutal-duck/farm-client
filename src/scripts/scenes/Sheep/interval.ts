import { shortTime } from '../../general/basic';
import Arrow from '../../components/animations/Arrow';
import Hearts from '../../components/animations/Hearts';

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

      // this.state.amplitude.getInstance().logEvent('resources', {
      //   status: 'problem started',
      //   farm_id: this.state.farm
      // });

    } else if (statusBalance && !balance.alarm) {

      // this.state.amplitude.getInstance().logEvent('resources', {
      //   status: 'problem is over',
      //   farm_id: this.state.farm
      // });

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
          !this.scene.isActive('Profile')) {

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
      this.state.progress.event.endTime > 0) {
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
        this.state.progress.event.startTime <= 0) {
        this.showEventTutorial();
      }
    }

    this.intervalPorgressCollectorTime();
  }, callbackScope: this, loop: true });
  

}

export default interval;
