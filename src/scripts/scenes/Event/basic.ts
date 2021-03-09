import axios from 'axios';
import { randomString, shortNum } from './../../general/basic';
// цена животного
function animalPrice(breed: number): {price: bigint, countAnimal: number} {

  let insideCounter: number = this.state.userEvent.countAnimal[breed - 1].counter;
  let insidePrice: bigint = this.state.eventSettings.eventSettings[breed - 1].price;
  let coefficient: bigint = BigInt(this.state.eventSettings.priceCoefficient);
  
  for (let i = 1; i < insideCounter; i++) {
    
    insidePrice += insidePrice * coefficient / BigInt(100);

  }
  
  insideCounter++;
  return {
    price: insidePrice,
    countAnimal: insideCounter
  }

}

function getFreePosition(): {x: number, y: number} {
  let x: number = 120;
  let y: number = this.topIndent + 600;
  for (let i = 0; i < this.state.eventSettings.eventSettings.length; i ++ ) {
    let territory: Phaser.Physics.Arcade.Sprite = this.currentTerritory(x, y);
    if (territory.data.values.type !== 0) {
      if (territory.data.values.merging.length !== 0) {
        x += territory.width;
        if (x >= 650) {
          x = 120;
          y += 240;
        }
      } else break;
    } else {
      x += 240;
      if (x >= 650) {
        x = 120;
        y += 240;
      }
    }
    if (y >= this.topIndent + 1400) {
      let territoryForBuy: Phaser.Physics.Arcade.Sprite = this.territories.children.entries.find(territory => territory.data.values.type === 0);
      if (territoryForBuy !== undefined) {
        this.scene.stop('Shop');
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');
        
        let modal: Imodal = {
          type: 1,
          sysType: 2,
        }

        this.state.territory = territoryForBuy;
        this.state.territory.type = territoryForBuy.data.values.type;
        this.state.territory.block = territoryForBuy.data.values.block;
        this.state.territory.position = territoryForBuy.data.values.position;
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);

      } else {
        this.scene.stop('Shop');
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');
    
        let modal: Imodal = {
          type: 1,
          sysType: 3,
          height: 150,
          message: this.state.lang.maxEventCount
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
        
      }
      return {x: null, y: null}
    }
    
  }
  return {x, y} 

}

function getFreeBoostPositions(): Iposition[] {
  let x: number = 120;
  let y: number = this.topIndent + 600;
  let positions: Iposition[] = [];
  for (let i = 0; i < this.state.eventSettings.eventSettings.length; i ++ ) { // убрать жесткое число
    if (this.currentTerritory(x, y)?.data.values.type !== 0) {
      if (this.currentTerritory(x, y)?.data.values.merging.length !== 0) {
        x += 240;
        if (x >= 650) {
          x = 120;
          y += 240;
        }
      } else {
        positions.push({ x, y });
        x += 240;
        if (x >= 650) {
          x = 120;
          y += 240;
        }}
    } else {
          
      if (y >= this.topIndent + 1400) {
        break;
      } else {
        x += 240;
        if (x >= 650) {
          x = 120;
          y += 240;
        }
      }
    
    };
  }

  return positions;

}

// максимальная порода для покупки
function maxBreedForBuy(): number {

  let breed: number = this.state.userEvent.maxLevelAnimal - 4;
  
  if (breed <= 0) {
    breed = 1;
  } else if (this.state.userEvent.maxLevelAnimal <= 10) {
    let currentPrice: bigint;
    let breedPrice: bigint;
    for (let i = breed; i >= 1; i--) {

      currentPrice = this.animalPrice(i).price;
      breedPrice = this.animalPrice(breed).price;
      if (currentPrice <= breedPrice) {
        breedPrice = currentPrice;
        breed = i ;
      }
    }
  } else if (this.state.userEvent.maxLevelAnimal > 10) {
    let currentPrice: bigint;
    let breedPrice: bigint;
    for (let i = breed; i >= this.state.userEvent.maxLevelAnimal - 9; i--) {

      currentPrice = this.animalPrice(i).price;
      breedPrice = this.animalPrice(breed).price;
      if (currentPrice <= breedPrice) {
        breedPrice = currentPrice;
        breed = i ;
      }
    }
  }
  return breed;
  
}

// территория на которой находится объект
function currentTerritory(x: number, y: number): object {

  let block: number = Math.ceil((y - this.topIndent) / this.height);
  let position: number = Math.ceil(x / this.height);
  return this.territories.children.entries.find((data: Phaser.Physics.Arcade.Sprite) => data.data.values.block === block && data.data.values.position === position);
  
}

// бесплатный собиратель
function freeCollector(type: number = 1): void {

  let user: IuserEvent = this.state.userEvent;
  let settings: IcollectorSettings[] = this.state.eventCollectorSettings;
  let doubledСollectorPrice: number = this.state.eventSettings.doubledСollectorPrice;


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


  
      // this.state.amplitude.getInstance().logEvent('collector', {
      //   type: 'free',
      //   farm_id: this.state.farm
      // });

    } else {
      
      minutes *= 2;
      let doubleTimePrice: number = Math.floor(minutes / 60 * doubledСollectorPrice);

      if (this.state.user.diamonds >= doubleTimePrice) {

        this.state.user.diamonds -= doubleTimePrice;
        user.collector += minutes * 60;
        user.collectorTakenTime = user.collector;
        this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
  
        // this.state.amplitude.getInstance().logEvent('collector', {
        //   type: minutes + ' minutes',
        //   price: 'hard',
        //   farm_id: this.state.farm
        // });
  
        // this.state.amplitude.getInstance().logEvent('diamonds_spent', {
        //   type: 'collector',
        //   count: doubleTimePrice,
        //   farm_id: this.state.farm
        // });

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

  let user: IuserEvent = this.state.userEvent;
  let settings: IeventSettings = this.state.eventSettings;

  let hours: number;

  if (type === 3) hours = 4;
  else if (type === 4) hours = 12;

  this.scrolling.wheel = true;
  this.scene.stop('Shop');
  this.scene.stop('ShopBars');
  this.scene.stop('Modal');

  if (settings['unlockCollector' + hours] <= user.maxLevelAnimal) {
    
    if (this.state.user.diamonds >= settings['collectorPrice' + hours]) {

      this.state.user.diamonds -= settings['collectorPrice' + hours];
      user.collector += hours * 60 * 60;
      user.collectorTakenTime = user.collector;
      this.game.scene.keys[this.state.farm + 'Bars'].collector.update();

      // this.state.amplitude.getInstance().logEvent('collector', {
      //   type: hours + ' hours',
      //   price: 'hard',
      //   farm_id: this.state.farm
      // });

      // this.state.amplitude.getInstance().logEvent('diamonds_spent', {
      //   type: 'collector',
      //   count: settings['collectorPrice' + hours],
      //   farm_id: this.state.farm
      // });

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

function convertDiamonds(diamonds: number): bigint {
  
  let breedSettings: IeventPoints[] = this.state.eventSettings.eventSettings;
  let maxLevel: number = this.state.userEvent.maxLevelAnimal;
  
  let setting: IeventPoints = breedSettings.find((item: IeventPoints) => item.breed === maxLevel);
  let exchange: bigint;

  if (setting) {
    exchange = setting.exchange;
  } else {
    exchange = BigInt(1);
  }
  
  return exchange *= BigInt(diamonds);

}

function convertMoney(money: bigint): number {

  let breedSettings: IeventPoints[] = this.state.eventSettings.eventSettings;
  let maxLevel: number = this.state.userEvent.maxLevelAnimal;
  
  let setting: IeventPoints = breedSettings.find((item: IeventPoints) => item.breed === maxLevel);
  let exchange: bigint;

  if (setting) {
    exchange = setting.exchange;
  } else {
    exchange = BigInt(1);
  }

  let needDiamonds: number = 1;
  let sumExchange: bigint = exchange;

  while (sumExchange < money) {
    needDiamonds++;
    sumExchange = sumExchange + exchange;
  }

  return needDiamonds;

}

// улучшение собирателей
function improveCollector(): void {

  let user: IuserEvent = this.state.userEvent;
  let collectorSettings: IcollectorSettings[] = this.state.eventCollectorSettings;


  let nextLevel: IcollectorSettings = collectorSettings.find((data: IcollectorSettings) => data.level === user.collectorLevel + 1);

  if (nextLevel.diamonds) {

    if (this.state.user.diamonds >= nextLevel.price) {

      this.state.amplitude.getInstance().logEvent('diamonds_spent', {
        type: 'improve_collector',
        count: nextLevel.price,
        farm_id: this.state.farm
      });

      this.state.user.diamonds -= nextLevel.price;
      user.collectorLevel++;
      this.setCollector();
      
      this.game.scene.keys['Modal'].improveCollectorAnim({x: this.cameras.main.centerX, y: this.cameras.main.centerY + 10});
      
      this.time.addEvent({ delay: 500, callback: (): void => {
        this.game.scene.keys[this.state.farm + 'Bars'].firework250(230, Number(this.game.config.height) - 70);
      }, callbackScope: this, loop: false });

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

      user.money -= BigInt(nextLevel.price);
      user.collectorLevel++;
      this.setCollector();

      this.game.scene.keys['Modal'].improveCollectorAnim({x: this.cameras.main.centerX, y: this.cameras.main.centerY + 10});

      this.time.addEvent({ delay: 500, callback: (): void => {
        this.game.scene.keys[this.state.farm + 'Bars'].firework250(230, Number(this.game.config.height) - 70);
      }, callbackScope: this, loop: false });

    } else {

      let count: number = nextLevel.price - Number(user.money);
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

function exchange(ad: boolean = false): void {

  let user: IuserEvent  = this.state.userEvent;
  let buyAnimal = (): void => this.buyAnimal(this.state.convertor.breed);

  if (this.state.convertor.diamonds > this.state.user.diamonds) {

    let countResources = this.state.convertor.diamonds - this.state.user.diamonds;

    this.time.addEvent({ delay: 100, callback: (): void => {

      this.state.convertor.type = 2;
      this.state.convertor.count = countResources;

      let modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
      
    }, callbackScope: this, loop: false });

  } else {

    this.state.user.diamonds -= this.state.convertor.diamonds;
    user.money += BigInt(this.convertDiamonds(this.state.convertor.diamonds));

    if (!ad) {

      // this.state.amplitude.getInstance().logEvent('diamonds_spent', {
      //   type: 'convertor',
      //   count: this.state.convertor.diamonds,
      //   farm_id: this.state.farm
      // });

    }

    if (this.state.convertor.fun === 1) {
      buyAnimal();
    } else if (this.state.convertor.fun === 2) {
      // this.fairLevelUp();
    } else if (this.state.convertor.fun === 3) {
      // this.improveTerritory();
    } else if (this.state.convertor.fun === 4) {
      // this.exchangeTerritory();
    } else if (this.state.convertor.fun === 5) {
      // this.installTerritory();
    } else if (this.state.convertor.fun === 6) {
      this.buyTerritory();
    } else if (this.state.convertor.fun === 7) {
      // this.buyNextFarm();
    } else if (this.state.convertor.fun === 8) {
      this.improveCollector();
    }

  }
  
}

function createBoostAnimal(positions): void {
  if (this.state.userEvent.herdBoostAnimals.length === 0) {
    this.startCreateHerdBoostAnimal = false;
    return;
  };

  positions.forEach(position => {
    if (this.state.userEvent.herdBoostAnimals.length > 0) {
      
      let type = this.state.userEvent.herdBoostAnimals.pop();
      let id: string = 'local_' + randomString(18);
      this.getAnimal(id, type, position.x, position.y);
      this.firework250(position.x, position.y);

    }
  });

}

function tryTask(): void {
  console.log('TryTask');
}

function buildMenu(): void {
 
  this.profile = this.add.image(650, this.height - 90, 'profile').setScale(0.8).setDepth(this.height + 2);
  this.chat = this.add.image(650, this.height - 90, 'chat').setScale(0.8).setDepth(this.height + 2);
  this.menu = this.add.image(650, this.height - 90, 'sandwich').setDepth(this.height + 3);

  this.clickButton(this.profile, (): void => {

    let modal: Imodal = {
      type: 1,
      sysType: 7
    }
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);

  });

  this.clickButton(this.chat, (): void => {
    let modal: Imodal = { type: 9 }
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);
  });

  this.clickButton(this.menu, (): void => {
    
    
    // if (this.taskBoard.zone?.scene && this.sendwich) {
    //   this.taskBoard.zone.depth = this.height + 1;
    // } else if (this.taskBoard.zone?.scene && !this.sendwich) {
    //   this.taskBoard.zone.depth = -1;
    // }

    this.sendwich = !this.sendwich;
    this.sendwichTimer = 0;

    if (this.sendwich) {
      this.menu.setTexture('sandwich-close');
    } else {
      this.menu.setTexture('sandwich');
    }

  });
}

function updateRaitingsBar(): void {
  if (this.state.progress.event.updateRaitings) {
    this.state.progress.event.updateRaitings = false;
    let score: number = this.state.progress.event.eventPoints < 0 ? 0 : this.state.progress.event.eventPoints;

    this.score.setText(score + ' ' + this.scoreEnding(score, this.state.lang));
    this.place.setText(this.state.progress.event.userEventRaiting.place + ' ' + this.state.lang.eventPlace);
    
  }
  
}

function scoreEnding(score: number, lang: any): string {
  if (lang.index === 'ru') {
    // Склоняет 'дней' в зависимости от числа
    let scoresWord: string[] = ['Очко', 'Очка', 'Очков'];
    const cases: number[] = [2, 0, 1, 1, 1, 2];
    return scoresWord[(score % 100 > 4 && score % 100 < 20) ? 2 : cases[(score % 10 < 5) ? score % 10 : 5]];  
  } 
  else if (lang.index === 'en' && score === 1) return 'Score'
  else if (lang.index === 'en') return 'Scores'
}

function buyNextFarm(): void {

  let user: IuserSheep | IuserChicken;
  let progress: IpartProgress;
  let farm: string;
  let check: boolean = false;

  user = this.state.userSheep;
  progress = this.state.progress.chicken;
  farm = 'Chicken';

  if (progress.donate) {
    
    if (this.state.user.diamonds >= progress.price) check = true;

    else {

      let count: number = progress.price - this.state.user.diamonds;
          
      this.state.convertor = {
        fun: 7,
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

  } else {

    if (user.money >= progress.price) check = true;

    else {
      
      let count: number = progress.price - user.money;
      let modal: Imodal = {
        type: 1,
        sysType: 3,
        message: String(this.state.lang.notEnoughForYou + ' ' + shortNum(count)),
        height: 150
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
    
    }
  }


  if (check) {

    if (progress.donate) this.state.user.diamonds -= progress.price;
    else {

      const data = { 
        id: this.state.user.id,
        hash: this.state.user.hash,
        counter: this.state.user.counter,
        price: progress.price,
      }
      axios.post(process.env.API + "/buyNextFarm", data)
      .then((res) => {
        if (res.data.success) {
          user.money -= progress.price;

          this.state.amplitude.getInstance().logEvent('get_new_farm', {
            type: 'buy',
            farm_id: farm
          });
      
          this.scene.stop(this.state.farm);
          this.scene.stop(this.state.farm + 'Bars');
          this.scene.start(farm + 'Preload', this.state);
        }
      });
    }
  }
}



export {
  animalPrice,
  maxBreedForBuy,
  getFreePosition,
  currentTerritory,
  freeCollector,
  buyCollector,
  convertDiamonds,
  convertMoney,
  improveCollector,
  exchange,
  createBoostAnimal,
  getFreeBoostPositions,
  tryTask,
  buildMenu,
  updateRaitingsBar,
  scoreEnding,
  buyNextFarm
}
