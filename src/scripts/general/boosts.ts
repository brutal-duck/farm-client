import { randomString, sendSocialEvent } from "./basic";
import Firework from '../components/animations/Firework';

// получение животного по бусту
function createBoostAnimal(): void {
  this.tryTask(22, 0);
  this.tryClanTask(3);

  if (this.state[`user${this.state.farm}`].takenHerdBoost <= 0) {
    this.state.user.diamonds -= this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost;
    this.state[`user${this.state.farm}`].takenHerdBoost += 1;
  } else if (this.state.user.boosts[this.state.farm.toLowerCase()].herd > 0) {
    this.state.user.boosts[this.state.farm.toLowerCase()].herd -= 1;
    this.state.amplitude.logAmplitudeEvent('herd_boost_spent', {});
  } else if (this.state.user.boosts[this.state.farm.toLowerCase()].herd <= 0) {
    this.state.user.diamonds -= this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost;
    this.tryTask(15, 0, this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost);
    this.state.amplitude.logAmplitudeEvent('diamonds_spent', {
      type: 'herd',
      count: this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost,
    });
    this.state[`user${this.state.farm}`].takenHerdBoost += 1;
    this.state.amplitude.logAmplitudeEvent('booster_merge', {
      count: this.state[`user${this.state.farm}`].takenHerdBoost,
    });
  }

  if (this.state.herdBoostAnimals.length === 0) return;
  
  this.state.herdBoostAnimals.forEach(type => {
    this.time.addEvent({ 
      delay: 100, 
      callback: (): void => {
        let x: number = Phaser.Math.Between(510, 690);
        let y: number = Phaser.Math.Between(510, 690);
        let id: string = 'local_' + randomString(18);
        if (this.state.farm !== 'Cow') {
          this[`get${this.state.farm}`](id, type, x, y, 0, 500);
          Firework.create(this, {x, y}, 1);
        } else {
          this.animalGroup.generate({x, y}, type, id, 0, 0, 0, 7, true);
        }
        if (type === 0) {
          this.tryTask(18, 0);
          this.tryClanTask(8);
        }
      }, 
      callbackScope: this, 
      loop: false 
    });
    this.tryTask(2, 0);
    this.tryTask(2, type);
    this.tryTask(4, type);
    this.tryClanTask(5);
  });
  this.tryTask(25, 0, this.state.herdBoostAnimals.length);
  this.tryClanTask(12, 0, this.state.herdBoostAnimals.length);
  this.tryClanTask(13, this.state.herdBoostAnimals.length);
  const COUNT: number = 12;
  if (this.state.herdBoostAnimals.length >= COUNT) {
    sendSocialEvent(this.state, 4, this.state.herdBoostAnimals.length);
  }
  this.state.herdBoostAnimals = [];
}

function updateNotificationShop(): void {
  const counter: number = this.state.shopNotificationCount.reduce((a: number, b: number) => a + b);
  
  if ((
    this.scene.isActive('Modal') 
    || this.scene.isActive('Tutorial') 
    || this.state.farm === 'Sheep' 
    && this.state.userSheep.tutorial < 100 
    || counter <= 0) 
    && this.game.scene.keys[`${this.state.farm}Bars`].shopNotificator.visible
  )  {
    this.game.scene.keys[`${this.state.farm}Bars`].shopNotificator.setVisible(false);
  } else if (!this.scene.isActive('Modal') && 
  !this.scene.isActive('Tutorial') && counter > 0 && 
  (!this.game.scene.keys[`${this.state.farm}Bars`].shopNotificator.visible || 
  this.game.scene.keys[`${this.state.farm}Bars`].shopNotificator.count !== counter)) {
    if (this.state.farm === 'Sheep' && this.state.userSheep.tutorial >= 100) {
      this.game.scene.keys[`${this.state.farm}Bars`].shopNotificator.setVisible(true);
      this.game.scene.keys[`${this.state.farm}Bars`].shopNotificator.setCount(counter);
    }
    if (this.state.farm !== 'Sheep') {
      this.game.scene.keys[`${this.state.farm}Bars`].shopNotificator.setVisible(true);
      this.game.scene.keys[`${this.state.farm}Bars`].shopNotificator.setCount(counter);
    }
  } 
}

// улучшение собирателей
function improveCollector(): void {

  let user: IuserSheep | IuserChicken | IuserCow;
  let collectorSettings: IcollectorSettings[];

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    collectorSettings = this.state.sheepCollectorSettings;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    collectorSettings = this.state.chickenCollectorSettings;

  } else if (this.state.farm === 'Cow') {

    user = this.state.userCow;
    collectorSettings = this.state.cowCollectorSettings;

  }

  let nextLevel: IcollectorSettings = collectorSettings.find((data: IcollectorSettings) => data.level === user.collectorLevel + 1);
  let secondNextLevel: IcollectorSettings = collectorSettings.find((data: IcollectorSettings) => data.level === user.collectorLevel + 2);
  
  if (!nextLevel) {
    
    this.scene.stop('Modal');
    this.scene.stop('Shop');
    this.scene.stop('ShopBars');

    let modal: Imodal = {
      type: 1,
      sysType: 3,
      message: this.state.lang.maxLevelCollector,
      height: 150
    }
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);
  } else {

    if (nextLevel.diamonds) {
  
      if (this.state.user.diamonds >= nextLevel.price) {
  
        this.game.scene.keys[this.state.farm].tryTask(15, 0, nextLevel.price);
  
        this.state.amplitude.logAmplitudeEvent('diamonds_spent', {
          type: 'improve_collector',
          count: nextLevel.price,
        });

        this.state.user.diamonds -= nextLevel.price;
        user.collectorLevel++;
        this.setCollector();
  
        this.game.scene.keys['Modal'].improveCollectorAnim({x: this.cameras.main.centerX, y: this.cameras.main.centerY + 10});
        this.game.scene.keys[this.state.farm].tryTask(23, 0, 0, user.collectorLevel);
        this.tryClanTask(6);
        
        if (!secondNextLevel) {
          this.scene.stop('Modal');
          this.scene.stop('Shop');
          this.scene.stop('ShopBars');
      
          let modal: Imodal = {
            type: 1,
            sysType: 3,
            message: this.state.lang.maxLevelCollector,
            height: 150
          }
          this.state.modal = modal;
          this.scene.launch('Modal', this.state);
        }
      } else {
  
        this.state.convertor = {
          fun: 8,
          count: nextLevel.price - this.state.user.diamonds,
          diamonds: nextLevel.price - this.state.user.diamonds,
          type: 2
        }
        let modal: Imodal = {
          type: 1,
          sysType: 4
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
  
      }
  
    } else {
  
      if (user.money >= nextLevel.price) {
  
        user.money -= nextLevel.price;
        user.collectorLevel++;
        this.setCollector();
  
        this.game.scene.keys['Modal'].improveCollectorAnim({x: this.cameras.main.centerX, y: this.cameras.main.centerY + 10});
        this.game.scene.keys[this.state.farm].tryTask(23, 0, 0, user.collectorLevel);
        this.tryClanTask(6);

        if (!secondNextLevel) {
          this.scene.stop('Modal');
          this.scene.stop('Shop');
          this.scene.stop('ShopBars');
      
          let modal: Imodal = {
            type: 1,
            sysType: 3,
            message: this.state.lang.maxLevelCollector,
            height: 150
          }
          this.state.modal = modal;
          this.scene.launch('Modal', this.state);
        }
      } else {
  
        let count: number = nextLevel.price - user.money;
        let diamonds: number = this.convertMoney(count);
        this.state.convertor = {
          fun: 8,
          count: count,
          diamonds: diamonds,
          type: 1
        }
        let modal: Imodal = {
          type: 1,
          sysType: 4
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
  
      }
  
    }
    
  }
  
}


// бесплатный собиратель
function freeCollector(type: number = 1): void {

  let user: IuserSheep | IuserChicken | IuserCow;
  let settings: IcollectorSettings[];
  let doubledСollectorPrice: number;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    settings = this.state.sheepCollectorSettings;
    doubledСollectorPrice = this.state.sheepSettings.doubledСollectorPrice;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    settings = this.state.chickenCollectorSettings;
    doubledСollectorPrice = this.state.chickenSettings.doubledСollectorPrice;

  } else if (this.state.farm === 'Cow') {

    user = this.state.userCow;
    settings = this.state.cowCollectorSettings;
    doubledСollectorPrice = this.state.cowSettings.doubledСollectorPrice;

  }

  this.scrolling.wheel = true;
  this.scene.stop('Shop');
  this.scene.stop('ShopBars');
  this.scene.stop('Modal');

  if (user.collector === 0) {

    let minutes: number = settings.find((data: IcollectorSettings) => data.level === user.collectorLevel).time;

    if (type === 1) {

      let collector: number = minutes * 60;
      user.collector += collector;
      user.collectorTakenTime = user.collector;
      this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
      this.tryTask(3, 0, minutes);
      this.tryClanTask(7, 0, minutes);
  
      if (user.tutorial === 90 && this.state.farm === 'Sheep') {
        this.doneTutor_90();
      }
  
      this.state.amplitude.logAmplitudeEvent('collector', {
        type: 'free',
      });
      Firework.create(this.game.scene.keys[`${this.state.farm}Bars`], { x: 230, y: this.game.config.height - 90 }, 1);
    } else {
      
      minutes *= 2;
      let doubleTimePrice: number = Math.floor(minutes / 60 * doubledСollectorPrice);

      if (this.state.user.diamonds >= doubleTimePrice) {

        this.state.user.diamonds -= doubleTimePrice;
        user.collector += minutes * 60;
        user.collectorTakenTime = user.collector;
        this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
        this.tryTask(3, 0, minutes);
        this.tryTask(15, 0, doubleTimePrice);
        this.tryClanTask(7, 0, minutes);

        this.state.amplitude.logAmplitudeEvent('collector', {
          type: minutes + ' minutes',
          price: 'hard',
        });

        this.state.amplitude.logAmplitudeEvent('diamonds_spent', {
          type: 'collector',
          count: doubleTimePrice,
        });

        Firework.create(this.game.scene.keys[`${this.state.farm}Bars`], { x: 230, y: this.game.config.height - 90 }, 1);
      } else {

        let count: number = doubleTimePrice - this.state.user.diamonds;
        this.state.convertor = {
          fun: 0,
          count: count,
          diamonds: count,
          type: 2
        }
        let modal: Imodal = {
          type: 1,
          sysType: 4
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);

      }

    }

  }

}


// покупка собирателя
function buyCollector(type: number): void {

  let user: IuserSheep | IuserChicken | IuserCow;
  let settings: IsheepSettings | IchickenSettings | IcowSettings;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    settings = this.state.sheepSettings;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    settings = this.state.chickenSettings;

  } else if (this.state.farm === 'Cow') {

    user = this.state.userCow;
    settings = this.state.cowSettings;

  }

  let hours: number;

  if (type === 3) hours = 4;
  else if (type === 4) hours = 12;

  this.scrolling.wheel = true;
  this.scene.stop('Shop');
  this.scene.stop('ShopBars');
  this.scene.stop('Modal');

  if (settings['unlockCollector' + hours] <= user.part) {
    if (this.state.user.boosts[this.state.farm.toLowerCase()][`collector${hours}`] > 0) {
      this.state.user.boosts[this.state.farm.toLowerCase()][`collector${hours}`] -= 1;
      user.collector += hours * 60 * 60;
      user.collectorTakenTime = user.collector;
      this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
      this.tryTask(3, 0, hours * 60);
      this.tryClanTask(7, 0, hours * 60);

      this.state.amplitude.logAmplitudeEvent('collector', {
        type: hours + ' hours',
        price: 'hard',
      });

      Firework.create(this.game.scene.keys[`${this.state.farm}Bars`], { x: 230, y: this.game.config.height - 90 }, 1);

    } else if (this.state.user.diamonds >= settings['collectorPrice' + hours]) {

      this.state.user.diamonds -= settings['collectorPrice' + hours];
      user.collector += hours * 60 * 60;
      user.collectorTakenTime = user.collector;
      this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
      this.tryTask(3, 0, hours * 60);
      this.tryTask(15, 0, settings['collectorPrice' + hours]);
      this.tryClanTask(7, 0, hours * 60);

      this.state.amplitude.logAmplitudeEvent('collector', {
        type: hours + ' hours',
        price: 'hard',
      });

      this.state.amplitude.logAmplitudeEvent('diamonds_spent', {
        type: 'collector',
        count: settings['collectorPrice' + hours],
      });

      Firework.create(this.game.scene.keys[`${this.state.farm}Bars`], { x: 230, y: this.game.config.height - 90 }, 1);
      
    } else {

      let count: number = settings['collectorPrice' + hours] - this.state.user.diamonds;
      this.state.convertor = {
        fun: 0,
        count: count,
        diamonds: count,
        type: 2
      }
      let modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    }
    
  }
  
}
export {
  createBoostAnimal,
  updateNotificationShop,
  improveCollector,
  freeCollector,
  buyCollector,
}