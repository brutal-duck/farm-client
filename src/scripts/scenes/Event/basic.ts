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
  for (let i = 0; i < this.state.eventSettings.eventSettings.length; i ++ ) { // убрать жесткое число
    if (this.currentTerritory(x, y).data.values.type !== 0) {
      if (this.currentTerritory(x, y).data.values.merging.length !== 0) {
        x += 240;
        if (x >= 650) {
          x = 120;
          y += 240;
        }
      } else break
    } else {

      this.scene.stop('Shop');
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');
  
      let modal: Imodal = {
        type: 1,
        sysType: 3,
        height: 150,
        message: this.state.lang.maxChickenCount // поменять
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
      return {x: null, y: null}
    }
  }
  return {x, y} 

}

// максимальная порода для покупки
function maxBreedForBuy(): number {

  let breed: number = 1;
  let breedPrice: bigint = BigInt(100000000000000000000000000000000000000000000000000000000000000000000000);
  for (let i = 0; i < this.state.userEvent.countAnimal.length - 1; i++ ) {
    let counter: bigint = BigInt(this.state.userEvent.countAnimal[i].counter);
    let currentPrice = counter * this.state.eventSettings.eventSettings[i].price; 
    if (currentPrice <= breedPrice) {
        breedPrice = currentPrice;
        breed = i + 1;
    }
    
  };
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

function convertDiamonds(diamonds: number): number {
  
  let breedSettings: IeventPoints[] = this.state.eventSettings.eventSettings;
  let maxLevel: number = this.state.userEvent.maxLevelAnimal;
  
  let setting: IeventPoints = breedSettings.find((item: IeventPoints) => item.breed === maxLevel);
  let exchange: number;

  if (setting) {
    exchange = setting.exchange;
  } else {
    exchange = 1;
  }
  
  return exchange *= diamonds;

}

function convertMoney(money: number): number {

  let breedSettings: IeventPoints[] = this.state.eventSettings.eventSettings;
  let maxLevel: number = this.state.userEvent.maxLevelAnimal;
  
  let setting: IeventPoints = breedSettings.find((item: IeventPoints) => item.breed === maxLevel);
  let exchange: number;

  if (setting) {
    exchange = setting.exchange;
  } else {
    exchange = 1;
  }

  let needDiamonds: number = 1;
  let sumExchange: number = exchange;

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
}
