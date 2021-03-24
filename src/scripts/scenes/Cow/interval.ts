import {shortTime} from './../../general/basic';
function interval(): void {

  // значение отступа для яиц, чтоб не прилегали к краям территории
  let indent: number = 20;

  let statusBalance: boolean = false;

  let checkRaiting: boolean = false;
  
  this.time.addEvent({ delay: 1000, callback: (): void => {
    
    // проверка подключения к интернету
    this.onlineStatus();

    let balance: Ibalance = this.balance();

    if (!statusBalance && balance.alarm) {

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

    // восстановаление территорий
    for (let i in this.territories.children.entries) {

      let territory = this.territories.children.entries[i];

      if ((territory.type === 2 || territory.type === 3) && territory.volume < 1000) {

        let reg: number = this.settings.territoriesCowSettings.find((item: IterritoriesCowSettings) => item.improve === territory.improve).regeneration;
        territory.volume += reg;
  
        if (territory.volume > 1000) {
          territory.volume = 1000;
        }
  
      }

    }
    
    // поедание территорий коровами
    for (let i in this.cow.children.entries) {

      let cow = this.cow.children.entries[i];
      
      let breed: number;

      if (cow.type === 0) breed = 1;
      else breed = cow.type;
      
      let points: IcowPoints = this.settings.cowSettings.find((item: IcowPoints) => item.breed === breed);

      // зарождение яйца
      if (cow.milk < 1000) {

        let milk: number = points.milk;

        if (balance.alarm) {
          milk = Math.round(milk / 100 * this.settings.cowBadPercent);
          if (milk < 1) milk = 1;
        }

        cow.milk += milk;
        if (cow.milk > 1000) cow.milk = 1000;

      }

      if (cow.milk === 1000) {

        let territory = this.currentTerritory(cow.x, cow.y);

        if (territory) {
          
          let countMilk: number = this.settings.territoriesCowSettings.find((item: IterritoriesCowSettings) => item.improve === territory.improve).countMilk;

          let milks: number = 0;

          for (let i in this.milk.children.entries) {

            let milk = this.milk.children.entries[i];
            let ter = this.currentTerritory(milk.x, milk.y);

            if (ter?.block === territory.block && ter?.position === territory.position) milks++;

          }

          if (milks < countMilk && !cow.drag && (territory.type === 2 || territory.type === 3)) {

            cow.milk = 0;

            // рандом разброса яиц
            let minX: number = cow.x - indent;
            let maxX: number = cow.x + indent;
            let minY: number = cow.y + 40 - indent;
            let maxY: number = cow.y + 40 + indent;

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
 
            let milk: IcowMilk = {
              type: cow.type,
              x: this.random(minX, maxX),
              y: this.random(minY, maxY),
              _id: 'local_' + this.randomString(18)
            }

            this.getMilk(milk);

            if (cow.type === 0) cow.diamond++;
            if (cow.diamond >= 5 && cow.type === 0) {
              this.firework250(cow.x, cow.y);
              cow.destroy();
            }

          }

        }

      }

      // отнимаем очки у территории
      let territory = this.currentTerritory(cow.x, cow.y);

      if (territory && !cow.drag) {

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

          let cow1: any;
          let cow2: any;

          switch (territory.merging.length) {
            case 0:
              cow1 = false;
              cow2 = false;
              break;
            case 1:
              cow1 = this.cow.children.entries.find((data: any) => data._id === territory.merging[0]._id);
              cow2 = false;
              break;
            case 2:
              cow1 = this.cow.children.entries.find((data: any) => data._id === territory.merging[0]._id);
              cow2 = this.cow.children.entries.find((data: any) => data._id === territory.merging[1]._id);;
              break;
            default:
              break;
          }

          this.cancelMerging(territory, cow1, cow2);

        }

      }

    }

    // for (let i in this.milk.children.entries) {

    //   let milk = this.milk.children.entries[i];
    //   milk.timeout++;
    
    // }

    // бар собирателя
    if (this.state.userCow.collector > 0) {

      this.state.userCow.collector--;
      this.game.scene.keys['CowBars'].collector.update();

    } else if (this.game.scene.keys['CowBars'].collector.endAngle !==
      this.game.scene.keys['CowBars'].collector.startAngle) {

      this.game.scene.keys['CowBars'].collector.update();

    }

    // задание на накопление денег
    this.tryTask(6, this.state.userCow.money);

    // задание на коровы на поле
    this.checkAnimalTask();

    // таймер кристаллической коровы
    this.caveTimer();

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
      !this.scene.isActive('Map')) this.getNewbieAward();

    // поиск рекламы
    this.findAd();

    // анимация иконок на пещере
    this.caveIconsAnimation();

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
      !this.scene.isActive('Map')) this.showDonate();

    // уменьшаем время буста комбикорм
    if (this.state.userCow.feedBoostTime > 0) {

      if (Phaser.Math.Between(0, 7) >= 5) { // чтобы не так часто появлялись сердца

        let randomIndex: number = Phaser.Math.Between(0, this.cow.children.entries.length - 1);
        this.hearts(this.cow.children.entries[randomIndex]);

      }

      this.state.userCow.feedBoostTime--;
    }

    // Проверяем и запускаем распростанение овец по полю
    if (this.cow.children.entries.every(el => el.spread === false)) {
      
      this.spreadAnimals();

    }

    // обновление времени евента
    if (this.state.progress.event.endTime > 0) {
      this.state.progress.event.endTime--;
      if ( this.scene.isActive('Map')) {
        this.game.scene.keys['Map'].eventEndTime?.setText(shortTime(this.state.progress.event.endTime, this.state.lang));
      } 
    }

    if (this.state.progress.event.startTime > 0) {
      this.state.progress.event.startTime--;
      if (this.scene.isActive('Map')) {
        this.game.scene.keys['Map'].eventStartTime?.setText(shortTime(this.state.progress.event.startTime, this.state.lang));
      }
    } 

    if (this.state.progress.event.endTime <= 0 && 
      this.state.progress.event.eventPoints > 0  && this.state.progress.event.open &&
      this.scene.isActive('Map')) {
      this.autosave();
      this.scene.stop('Map');
      this.scene.stop('MapBars');
    }

    if (this.state.progress.event.endTime <= 0 && 
      this.state.progress.event.eventPoints > 0 && this.state.progress.event.open &&
      !this.scene.isActive('Modal') && 
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Map')) { 
      
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

    if ((this.state.name !== '' || this.state.user.login !== '') && 
      this.state.progress.event.startTime <= 0 && 
      this.state.progress.event.endTime > 0) {
        
      if (this.state.user.additionalTutorial.eventTutorial === 0 &&
        !this.game.scene.keys[`${this.state.farm}Bars`].arrows?.active &&
        !this.scene.isActive('Modal') &&
        !this.scene.isActive('Tutorial') &&
        !this.scene.isActive('Map')) {
        this.game.scene.keys[`${this.state.farm}Bars`].showMapArrows();
      }
  
      if (this.state.user.additionalTutorial.eventTutorial === 0 &&
        !this.scene.isActive('Tutorial') &&
        this.scene.isActive('Map')) {
        this.game.scene.keys[`Map`].scrolling.wheel = false;
        this.showEventTutorial();
      }
    }

  }, callbackScope: this, loop: true });

  // проверка доната 
  
  

}

export default interval;
