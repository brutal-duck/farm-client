import { random, randomString, shortNum, shortTime } from '../../general/basic';

function interval(): void {

  // значение отступа для яиц, чтоб не прилегали к краям территории
  let indent: number = 20;

  let statusBalance: boolean = false;

  this.time.addEvent({ delay: 1000, callback: (): void => {
    
    // проверка подключения к интернету
    this.onlineStatus();
    
    for (let i in this.animals.children.entries) {

      let animal: Phaser.Physics.Arcade.Sprite = this.animals.children.entries[i].data.values.active;
      
      let breed: number = animal.data.values.base.data.values.type;

      
      let points: IeventPoints = this.state.eventSettings.eventSettings.find((item: IeventPoints) => item.breed === breed);

      
      if (animal.data.values.working) {
        // зарождение ресурса
        if (animal.data.values.resource < 1000) {

          let resource: number = points.resource;

          animal.data.values.resource += resource;

        if (animal.data.values.resource > 1000) animal.data.values.resource = 1000;

      }

      if (animal.data.values.resource === 1000 && this.resources.getLength() <= this.maxCountResource) {
        
        let resource: IeventResource = {
          type: animal.data.values.base.data.values.type,
          x: animal.x,
          y: animal.y + animal.height / 2,
          _id: 'local_' + randomString(18)
        }
       
        this.getResource(resource);

        animal.data.values.resource = 0;  

        }
      }
    }    

    for (let i in this.resources.children.entries) {

      let resource: Phaser.Physics.Arcade.Sprite = this.resources.children.entries[i];
      resource.data.values.timeout++;
    
    }
    
    // бар собирателя
    if (this.state.userEvent.collector > 0) {

      this.state.userEvent.collector--;
      this.game.scene.keys['EventBars'].collector.update();

    } else if (this.game.scene.keys['EventBars'].collector.endAngle !== this.game.scene.keys['EventBars'].collector.startAngle) {

      this.game.scene.keys['EventBars'].collector.update();

    }
    if (this.startCreateHerdBoostAnimal) {
      let freePositions: Iposition[] = this.getFreeBoostPositions();

      this.createBoostAnimal(freePositions);

    }

    // уменьшаем время буста комбикорм
    if (this.state.userEvent.feedBoostTime > 0) {

      if (Phaser.Math.Between(0, 7) >= 5) { // чтобы не так часто появлялись сердца

        let randomIndex: number = Phaser.Math.Between(0, this.animals.children.entries.length - 1);

        if (this.animals.children.entries[randomIndex].data.values.active.data.values.working) {
          this.hearts(this.animals.children.entries[randomIndex].data.values.active);
        }
        
      }

      this.state.userEvent.feedBoostTime--;
      this.game.scene.keys['EventBars'].feedBoostTime.setText(shortTime(this.state.userEvent.feedBoostTime,this.state.lang))
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


    if (this.state.userEvent.collector > 0) {
      let proceeds: bigint = BigInt(0);
      this.animals.children.entries.forEach(animal => {
        if (animal.data.values.active.data.values.working) {
          let price: bigint = this.state.eventSettings.eventSettings.find((data: IeventPoints) => data.breed === animal.data.values.type).resourcePrice;
          proceeds += price;
        }
      });
      this.game.scene.keys['EventBars'].proceedsText.setText(shortNum(proceeds / BigInt(10)) + '/' + this.state.lang.seconds);
  
    } else {
      this.game.scene.keys['EventBars'].proceedsText.setText('0/' + this.state.lang.seconds);
    }
    
    // Обновление иконки feed буста
    if (this.state.userEvent.maxLevelAnimal >= this.game.scene.keys.Event.feedBoostLvl &&
    this.state.user.additionalTutorial.feedBoost) {
      
      if (this.state.userEvent.feedBoostTime > 0 && !this.game.scene.keys['EventBars'].feedBoostTime.visible) {
        this.game.scene.keys['EventBars'].proceedsText.y = 80;
        this.game.scene.keys['EventBars'].proceedsText.setColor('#cbff40');
        this.game.scene.keys['EventBars'].feedBoostDoubledIcon.setVisible(true);
        this.game.scene.keys['EventBars'].feedBoostIcon.setVisible(true);
        this.game.scene.keys['EventBars'].feedBoostTime.setVisible(true);
      } else if (this.state.userEvent.feedBoostTime <= 0 && this.game.scene.keys['EventBars'].feedBoostTime.visible) {
        this.game.scene.keys['EventBars'].proceedsText.y = 92;
        this.game.scene.keys['EventBars'].proceedsText.setColor('#f2ede4');
        this.game.scene.keys['EventBars'].feedBoostDoubledIcon.setVisible(false);
        this.game.scene.keys['EventBars'].feedBoostIcon.setVisible(false);
        this.game.scene.keys['EventBars'].feedBoostTime.setVisible(false);
      }
      
    }

    // обновление времени евента

    if (this.state.progress.event.endTime > 0) {
      this.state.progress.event.endTime--;
      if ( this.scene.isActive('Map')) {
        this.game.scene.keys['Map'].eventEndTime?.setText(shortTime(this.state.progress.event.endTime, this.state.lang));
      } 
    }

    if (this.state.progress.event.endTime <= 0 && this.scene.isActive('Event')) {
      this.scene.stop('Map');
      this.scene.stop('MapBars');
      this.scene.stop('Event');
      this.scene.stop('EventBars');
      this.scene.start('SheepPreload', this.state);
    }

    if (this.state.progress.event.startTime > 0) {
      this.state.progress.event.startTime--;
      if (this.scene.isActive('Map')) {
        this.game.scene.keys['Map'].eventStartTime?.setText(shortTime(this.state.progress.event.startTime, this.state.lang));
      }
    }
    
  }, callbackScope: this, loop: true });

}

export default interval;
