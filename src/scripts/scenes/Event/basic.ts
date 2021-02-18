import { randomString } from './../../general/basic';
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
  } else {
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

    let type = this.state.userEvent.herdBoostAnimals.pop();
    let id: string = 'local_' + randomString(18);
    this.getAnimal(id, type, position.x, position.y);
    this.firework250(position.x, position.y);
    
  });

}

function updateEventNativeShop(): void {
  let counter: number = 0;
  for (let i = 0; i < this.state.nativeCounter.length; i++) {
    counter += this.state.nativeCounter[i];
  }
  
  if (
    (this.scene.isActive('Modal') ||
    this.scene.isActive('Block') ||
    this.scene.isActive('Tutorial') ||
    (this.state[`user${this.state.farm}`].maxLevelAnimal < this.game.scene.keys[this.state.farm].herdBoostLvl) ||
    this.state[`user${this.state.farm}`].takenHerdBoost > 0
    || !this.state.user.additionalTutorial.herdBoost) &&
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.visible ||
    counter <= 0

  ) {

    this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.setVisible(false);
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShopCounter.setVisible(false);

  } else if (
    !this.scene.isActive('Modal') &&
    !this.scene.isActive('Block') &&
    !this.scene.isActive('Tutorial') &&
    this.state[`user${this.state.farm}`].maxLevelAnimal >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
    !this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.visible &&
    this.state[`user${this.state.farm}`].takenHerdBoost <= 0 &&
    counter > 0 &&
    this.state.user.additionalTutorial.herdBoost

  ) {

    this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.setVisible(true);
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShopCounter.setVisible(true);
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShopCounter.setText(counter);
  }
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
  updateEventNativeShop,
  tryTask,
  buildMenu
}
