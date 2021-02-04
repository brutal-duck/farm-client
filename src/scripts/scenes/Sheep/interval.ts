import { Arrows } from '../../elements';

function interval(): void {

  let statusBalance: boolean = false;

  this.time.addEvent({ delay: 1000, callback: (): void => {

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
      !this.scene.isActive('Block') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Map')) {

      this.caveTutor = true;
      this.time.addEvent({ delay: 300, callback: (): void => {
        this.showTutorial('cave1');
      }, callbackScope: this, loop: false });
    }

    // тутор про бустер переполох
    if (this.state.userSheep.part >= this.herdBoostLvl &&
    !this.state.user.additionalTutorial.herdBoost &&
    !this.scene.isActive('Modal') &&
    !this.scene.isActive('Block') &&
    !this.scene.isActive('Tutorial') &&
    !this.scene.isActive('Map')) {
    this.showTutorial('herdBoost1');
    }

    // тутор про бустер комбикорм
    if (this.state.userSheep.part >= this.feedBoostLvl &&
      !this.state.user.additionalTutorial.feedBoost &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Block') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Map')) {
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
      this.game.scene.keys['SheepBars'].collector.update();

    } else if (this.game.scene.keys['SheepBars'].collector.endAngle !==
      this.game.scene.keys['SheepBars'].collector.startAngle) {
      
      this.game.scene.keys['SheepBars'].collector.update();

    }

    // задание на накопление денег
    this.tryTask(6, this.state.userSheep.money);

    // задание на овец на поле
    this.checkAnimalTask();

    // таймер кристаллической овцы
    this.caveTimer();

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
      if (task?.done === 0 && task?.id === 127 && !this.arrows?.active) {

        let territory: any = this.territories.children.entries.find((data: any) => data.type === 5);
        
        if (territory?.volume > 0) {

          this.arrows = new Arrows(this, { x: territory.x + 120, y: territory.y + 120 }, 120, false, false, true, false, false);

        }

      }

      // задание на покупку территории и установку пастбища
      if (task?.done === 0 && task?.id === 5 && !this.arrows?.active) {
        
        let territory: any = this.territories.children.entries.find((data: any) => data.block === 3 && data.position === 3);
        this.arrows = new Arrows(this, { x: territory.x + 120, y: territory.y + 180 }, 120, false, false, true, false, false);

      }

    }

    // тутор про невключенного подстригателя
    if (this.state.user.additionalTutorial.collector) {

      if (this.state.userSheep.collector === 0 &&
        !this.game.scene.keys['SheepBars'].arrows?.active &&
        !this.scene.isActive('Modal') &&
        !this.scene.isActive('Block') &&
        !this.scene.isActive('Tutorial') &&
        !this.scene.isActive('Map')) {

        this.counterWithoutCollector++;

        if (this.counterWithoutCollector >= 10) {

          this.counterWithoutCollector = 0;
          this.game.scene.keys['SheepBars'].showArrows();

        }

      }

    } else {

      if (this.state.userSheep.tutorial >= 100 && this.state.userSheep.collector === 0 && !this.scene.isActive('Tutorial')) {

        this.counterWithoutCollector++;

        if (this.counterWithoutCollector >= 10 &&
          this.state.userSheep.part >= 2 &&
          !this.scene.isActive('Modal') &&
          !this.scene.isActive('Block') &&
          !this.scene.isActive('Tutorial') &&
          !this.scene.isActive('Map')) {

          this.counterWithoutCollector = 0;
          this.state.user.additionalTutorial.collector = true;
          this.showTutorial('collector');

        }

      }

    }

    if (this.game.scene.keys['SheepBars'].arrows?.active && this.state.userSheep.collector > 0) {

      this.counterWithoutCollector = 0;
      this.game.scene.keys['SheepBars'].arrows.destroy();

    }

    if (this.state.newbieTime > 0) this.state.newbieTime--;

    // выдача наград новичка
    if (!this.scene.isActive('Modal') &&
      !this.scene.isActive('Block') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Map')) this.getNewbieAward();
    
    // поиск рекламы
    this.findAd();
    
    // анимация иконок на пещере
    this.caveIconsAnimation();

    this.debug();
    
    // таймер до буста стадо
    if (this.state.timeToHerdBoost > 0) {
      --this.state.timeToHerdBoost;
    } else {
      console.log('очистка таймера');
      this.state[`user${this.state.farm}`].takenHerdBoost = 0;
      this.state.timeToHerdBoost = 86400;
    } 

    if (this.state[`user${this.state.farm}`].takenHerdBoost <= 0) {
      this.state.nativeCounter[3] = 1;
    }

    let nativeCount = 0;

    for (let i = 0; i < this.state.nativeCounter.length; i++) {
      nativeCount += this.state.nativeCounter[i];
    }
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShopCounter.setText(nativeCount);

    if (this.state.donate &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Block') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Map')) this.showDonate();
      
    // уменьшаем время буста комбикорм
    if (this.state.userSheep.feedBoostTime > 0) {

      if (this.getRandomBool()) { // чтобы не так часто появлялись сердца

        let randomIndex: number = Phaser.Math.Between(0, this.sheep.children.entries.length - 1);
        this.hearts(this.sheep.children.entries[randomIndex]);

      }

      this.state.userSheep.feedBoostTime--;

    }
    
  }, callbackScope: this, loop: true });
  

}

export default interval;
