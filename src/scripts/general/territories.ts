// территория на которой находится объект
import Firework from '../components/animations/Firework';
import Stars from '../components/animations/Stars';
function currentTerritory(x: number, y: number): object {

  let block: number = Math.ceil((y - this.topIndent) / this.height);
  let position: number = Math.ceil(x / this.height);
  return this.territories.children.entries.find((data: any) => data.block === block && data.position === position);
  
}


// установка актуального спрайта территории
function changeSprite(territory: any): void {
  
  let farm: string = this.state.farm.toLowerCase();

  let sprite: string = territory.texture.key;

  if (territory.type === 2) {

    switch (territory.improve) {
      case 1:
        sprite = farm + '-grass1-';
        break;
      case 2:
        sprite = farm + '-grass2-';
        break;
      case 3:
        sprite = farm + '-grass3-';
        break;
      case 4:
        sprite = farm + '-grass4-';
        break;
    }

    if (territory.volume < 200) {
      sprite += 1;
    } else if (territory.volume >= 200 && territory.volume < 400) {
      sprite += 2;
    } else if (territory.volume >= 400 && territory.volume < 600) {
      sprite += 3;
    } else if (territory.volume >= 600 && territory.volume < 800) {
      sprite += 4;
    } else if (territory.volume >= 800) {
      sprite += 5;
    }

  }

  if (territory.type === 3) {

    switch (territory.improve) {
      case 1:
        sprite = farm + '-water1-';
        break;
      case 2:
        sprite = farm + '-water2-';
        break;
      case 3:
        sprite = farm + '-water3-';
        break;
      case 4:
        sprite = farm + '-water4-';
        break;
    }

    if (territory.volume < 250) {
      sprite += 1;
    } else if (territory.volume >= 250 && territory.volume < 500) {
      sprite += 2;
    } else if (territory.volume >= 500 && territory.volume < 750) {
      sprite += 3;
    } else if (territory.volume >= 750) {
      sprite += 4;
    }

  }

  if (territory.type === 5) {
    
    let max: number, percent: number = 0;

    if (this.state.farm === 'Sheep') {

      max = this.state.sheepSettings.territoriesSheepSettings[territory.improve - 1].woolStorage;

    } else if (this.state.farm === 'Chicken') {

      max = this.state.chickenSettings.territoriesChickenSettings[territory.improve - 1].eggStorage;

    } else if (this.state.farm === 'Cow') {

      max = this.state.cowSettings.territoriesCowSettings[territory.improve - 1].storage;

    }

    if (territory.volume > 0) {
      percent = territory.volume / (max / 100);
    }

    switch (territory.improve) {
      case 1:
        sprite = farm + '-repository-1-';
        break;
      case 2:
        sprite = farm + '-repository-2-';
        break;
      case 3:
        sprite = farm + '-repository-3-';
        break;
      case 4:
        sprite = farm + '-repository-4-';
        break;
    }

    if (percent < 25) {
      sprite += 1;
    } else if (percent >= 25 && percent < 50) {
      sprite += 2;
    } else if (percent >= 50 && percent < 75) {
      sprite += 3;
    } else {
      sprite += 4;
    }

    if (territory.repository.texture.key !== sprite) {
      territory.repository.setTexture(sprite);
    }

  }

  if (territory.texture.key !== sprite && territory.type !== 5) {
    territory.setTexture(sprite);
  } 

}


// улучшение ярмарки
function fairLevelUp(): void {

  let fairs: IfairLevel[] = [];
  let user: IuserSheep | IuserChicken | IuserCow;
  let updateAnimalBuy: any;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    fairs = this.state.sheepSettings.sheepFairLevels;
    updateAnimalBuy = (): void => {
      this.game.scene.keys['SheepBars'].sheepBuy.setTexture('sheep-buy-icon-' + this.maxBreedForBuy());
      this.game.scene.keys['SheepBars'].updateSheepPrice();
    }

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    fairs = this.state.chickenSettings.chickenFairLevels;
    updateAnimalBuy = (): void => {
      this.game.scene.keys['ChickenBars'].chickenBuy.setTexture('chicken-buy-icon-' + this.maxBreedForBuy());
      this.game.scene.keys['ChickenBars'].updateChickenPrice();
    }
    
  } else if (this.state.farm === 'Cow') {

    user = this.state.userCow;
    fairs = this.state.cowSettings.cowFairLevels;
    updateAnimalBuy = (): void => {
      this.game.scene.keys['CowBars'].cowBuy.setTexture('cow-buy-icon-' + this.maxBreedForBuy());
      this.game.scene.keys['CowBars'].updateCowPrice();
    }
    
  }
  
  let nextFair = fairs.find((item: IfairLevel) => item.level === user.fair + 1);

  if (nextFair && user.fair < fairs.length) {

    if (user.part >= nextFair.part_unlock) {

      if (user.money >= nextFair.price_m && this.state.user.diamonds >= nextFair.price_d) {

        user.money -= nextFair.price_m;
        this.state.user.diamonds -= nextFair.price_d;
        user.fair++;
        updateAnimalBuy();
        this.tryTask(7, user.fair);
        this.tryTask(15, 0, nextFair.price_d);

        this.time.addEvent({ delay: 200, callback: (): void => {

          // переделать, взять ярмарку из массива группы
          this.state.territory.level?.setText(user.fair);
          Stars.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 });
          // Firework.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 }, 3);

        }, callbackScope: this, loop: false });

        this.state.amplitude.getInstance().logEvent('fair_up', {
          level: user.fair,
          farm_id: this.state.farm
        });

        if (nextFair.price_d > 0) {

          this.state.amplitude.getInstance().logEvent('diamonds_spent', {
            type: 'fair',
            count: nextFair.price_d,
            farm_id: this.state.farm,
            chapter: this.state[`user${this.state.farm}`].part,
          });
          
        }

      } else {

        if (this.state.user.diamonds < nextFair.price_d) {

          let count: number = nextFair.price_d - this.state.user.diamonds;
          
          this.state.convertor = {
            fun: 2,
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

        } else {

          let count: number = nextFair.price_m - user.money;
          let diamonds: number = this.convertMoney(count);
          this.state.convertor = {
            fun: 2,
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
  
}


// улучшение территории
function improveTerritory(): void {

  let user: IuserSheep | IuserChicken | IuserCow;
  let territoriesSettings: any = [];
  let parts: Ipart[] = [];

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    territoriesSettings = this.state.sheepSettings.territoriesSheepSettings;
    parts = this.state.sheepSettings.sheepParts;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    territoriesSettings = this.state.chickenSettings.territoriesChickenSettings;
    parts = this.state.chickenSettings.chickenParts;
    
  } else if (this.state.farm === 'Cow') {

    user = this.state.userCow;
    territoriesSettings = this.state.cowSettings.territoriesCowSettings;
    parts = this.state.cowSettings.cowParts;
    
  }

  if (this.state.territory.improve < territoriesSettings.length &&
    (this.state.territory.type === 2 ||
    this.state.territory.type === 3 ||
    this.state.territory.type === 5)) {

    let price: number;
    let part: Ipart = parts.find((data: Ipart) => data.sort === user.part);
    let lock: number = territoriesSettings.find((data: any) => data.improve === this.state.territory.improve + 1).unlock_improve;
    
    if (user.part >= lock) {

      let improve: number;

      if (this.state.territory.improve === 1) {
        price = part.improve_territory_2;
        improve = 2;
      } else if (this.state.territory.improve === 2) {
        price = part.improve_territory_3;
        improve = 3;
      } else {
        price = part.improve_territory_4;
        improve = 4;
      }

      if (user.money >= price) {

        let territory: string;

        if (this.state.territory.type === 2) territory = 'grass';
        else if (this.state.territory.type === 3) territory = 'water';
        else if (this.state.territory.type === 5) territory = 'repository';
  
        this.state.amplitude.getInstance().logEvent('improve_territory', {
          block: this.state.territory.block,
          position: this.state.territory.position,
          farm_id: this.state.farm,
          level: improve,
          type: territory
        });

        this.state.territory.improve = improve;
        user.money -= price;

        if (this.state.territory.type === 5) {

          this.tryTask(17, improve);

          this.state.territory.repository.setTexture(this.state.farm.toLowerCase() + '-repository-' + improve + '-1');
          Firework.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 }, 3);

        } else {

          if (this.state.territory.type === 2) {
            this.tryTask(8, improve);
          }

          if (this.state.territory.type === 3) {
            this.tryTask(9, improve);
          }

          this.state.territory.volume = 1000;

          this.time.addEvent({ delay: 500, callback: (): void => {
            
            this.changeSprite(this.state.territory);
            Firework.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 }, 3);

          }, callbackScope: this, loop: false });

        }
      
      } else {

        let count: number = price - user.money;
        let diamonds: number = this.convertMoney(count);
        this.state.convertor = {
          fun: 3,
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


// смена территории
function exchangeTerritory(): void {

  let user: IuserSheep | IuserChicken | IuserCow;
  let parts: Ipart[] = [];
  let sell: any;
  let farm: string = this.state.farm.toLowerCase();

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    parts = this.state.sheepSettings.sheepParts;
    sell = (): void => this.sellWool();

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    parts = this.state.chickenSettings.chickenParts;
    sell = (): void => this.sellEggs();
    
  } else if (this.state.farm === 'Cow') {

    user = this.state.userCow;
    parts = this.state.cowSettings.cowParts;
    sell = (): void => this.sellMilk();
    
  }

  if (this.state.exchangeTerritory === 2 ||
    this.state.exchangeTerritory === 3 ||
    this.state.exchangeTerritory === 5) {

    let price: number = parts.find((data: Ipart) => data.sort === user.part).improve_territory_2;

    if (this.state.exchangeTerritory === 5) {

      let check: boolean = this.checkExchangeRepository(this.state.territory);

      if (!check) {

        let modal: Imodal = {
          type: 1,
          sysType: 3,
          height: 150,
          message: this.state.lang.repCloseToFair
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
        
      } else {

        if (user.money >= price) {

          let from: string;

          if (this.state.territory.type === 2) from = 'grass';
          else if (this.state.territory.type === 3) from = 'water';
          else if (this.state.territory.type === 5) from = 'repository';
          
          let to: string;

          if (this.state.exchangeTerritory === 2) to = 'grass';
          else if (this.state.exchangeTerritory === 3) to = 'water';
          else if (this.state.exchangeTerritory === 5) to = 'repository';
    
          this.state.amplitude.getInstance().logEvent('exchange_territory', {
            block: this.state.territory.block,
            position: this.state.territory.position,
            farm_id: this.state.farm,
            from: from,
            to: to
          });

          this.state.territory.type = this.state.exchangeTerritory;
          user.money -= price;
          this.state.territory.improve = 1;
          this.state.territory.volume = 0;
          this.state.territory.money = 0;
          let x: number = this.state.territory.x + 120;
          let y: number = this.state.territory.y + 240;
  
          this.tryTask(5, this.state.exchangeTerritory);

          this.state.territory.setTexture(farm + '-repository');
          this.state.territory.repository = this.add.image(x, y, farm + '-repository-1-1')
            .setDepth(this.state.territory.y + 50)
            .setOrigin(0.5, 1);
          Firework.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 }, 3);
  
        } else {
    
          let count: number = price - user.money;
          let diamonds: number = this.convertMoney(count);
          this.state.convertor = {
            fun: 4,
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

    } else {
      
      if (user.money >= price) {

        let from: string;

        if (this.state.territory.type === 2) from = 'grass';
        else if (this.state.territory.type === 3) from = 'water';
        else if (this.state.territory.type === 5) from = 'repository';
        
        let to: string;

        if (this.state.exchangeTerritory === 2) to = 'grass';
        else if (this.state.exchangeTerritory === 3) to = 'water';
        else if (this.state.exchangeTerritory === 5) to = 'repository';
  
        this.state.amplitude.getInstance().logEvent('exchange_territory', {
          block: this.state.territory.block,
          position: this.state.territory.position,
          farm_id: this.state.farm,
          from: from,
          to: to
        });

        if (this.state.territory.type === 5 && this.state.territory.repository) {
          sell();
          this.state.territory.repository.destroy();
        }
  
        this.state.territory.type = this.state.exchangeTerritory;
        user.money -= price;
        this.state.territory.improve = 1;
        this.state.territory.volume = 1000;
        
        this.tryTask(5, this.state.exchangeTerritory);

        this.time.addEvent({ delay: 500, callback: (): void => {

          this.changeSprite(this.state.territory);
          Firework.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 }, 3);

        }, callbackScope: this, loop: false });

      } else {
  
        let count: number = price - user.money;
        let diamonds: number = this.convertMoney(count);
        this.state.convertor = {
          fun: 4,
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


// убрать ненужные замки с территорий
function deleteTerritoriesLocks(): void {

  let part: number;
  let prices: IterritoriesPrice[] = [];

  if (this.state.farm === 'Sheep') {

    part = this.state.userSheep.part;
    prices = this.state.sheepSettings.territoriesSheepPrice;

  } else if (this.state.farm === 'Chicken') {

    part = this.state.userChicken.part;
    prices = this.state.chickenSettings.territoriesChickenPrice;
    
  } else if (this.state.farm === 'Cow') {

    part = this.state.userCow.part;
    prices = this.state.cowSettings.territoriesCowPrice;
    
  }

  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];

    if (territory.type === 0) {

      let unlock: number = prices.find((data: IterritoriesPrice) => data.block === territory.block && data.position === territory.position).unlock;

      if (part >= unlock && territory.lock_image && territory.lock_text) {
        
        territory.lock_image.destroy();
        territory.lock_text.destroy();

      }

    }

  }

}


// заборы
function buildBorders(): void {
  
  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];

    if (territory.type === 7) {

      territory.borderTop.setVisible(true);
      territory.borderLeft.setVisible(true);

      let bottomTer = this.territories.children.entries.find((data: any) => data.block === 2 && data.position === 1)
      
      if (bottomTer.type === 0) territory.borderBottom.setVisible(true);
      else territory.borderBottom.setVisible(false);

    }

    if (territory.type === 6) {
      territory.borderTop.setVisible(true);
    }

    if (territory.type === 1 ||
      territory.type === 2 ||
      territory.type === 3 ||
      territory.type === 5) {

      if (territory.position === 1) {
        territory.borderLeft.setVisible(true);
      }

      if (territory.position === 3) {
        territory.borderRight.setVisible(true);
      }
      
      if (territory.block !== 8) {

        let topTer = this.territories.children.entries.find((data: any) => data.block === territory.block - 1 && data.position === territory.position);
        
        let bottomTer = this.territories.children.entries.find((data: any) => data.block === territory.block + 1 && data.position === territory.position);

        if (topTer !== undefined && topTer.type === 0) {
          territory.borderTop.setVisible(true);
        } else {
          territory.borderTop.setVisible(false);
        }

        if (bottomTer.type === 1 ||
          bottomTer.type === 2 ||
          bottomTer.type === 3 ||
          bottomTer.type === 5) {
          territory.borderBottom.setVisible(false);
        } else {
          territory.borderBottom.setVisible(true);
        }

        if (territory.position === 1) {

          let centerTer = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 2);

          if (centerTer.type === 0) {
            territory.borderRight.setVisible(true);
          } else {
            territory.borderRight.setVisible(false);
          }

        }
        
        if (territory.position === 2) {

          let leftTer = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 1);

          let rightTer = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 3);

          if (leftTer.type === 0) {
            territory.borderLeft.setVisible(true);
          } else {
            territory.borderLeft.setVisible(false);
          }

          if (rightTer.type === 0) {
            territory.borderRight.setVisible(true);
          } else {
            territory.borderRight.setVisible(false);
          }

        }

        if (territory.position === 3) {

          let centerTer = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 2);

          if (centerTer.type === 0) {
            territory.borderLeft.setVisible(true);
          } else {
            territory.borderLeft.setVisible(false);
          }

        }

      } else {
        territory.borderBottom.setVisible(true);
      }

    }

  }
  
}


// проверка на возможность обмена территроии на хранилище
function checkExchangeRepository(territory: any): boolean {

  let status: boolean = true;
  if (territory.block === 2 && territory.position === 3) status = false;
  return status;

}


// покупка земли
function buyTerritory(): void {

  let user: IuserSheep | IuserChicken | IuserCow;
  let settings: IterritoriesPrice;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    settings = this.state.sheepSettings.territoriesSheepPrice.find((data: IterritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position);

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    settings = this.state.chickenSettings.territoriesChickenPrice.find((data: IterritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position);
    
  } else if (this.state.farm === 'Cow') {

    user = this.state.userCow;
    settings = this.state.cowSettings.territoriesCowPrice.find((data: IterritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position);
    
  }

  if (user.part >= settings.unlock && this.state.territory.type === 0) {

    // 70% от суммы покупки
    let price = Math.round((settings.price / 100) * 70);

    if (user.money >= price) {

      this.state.amplitude.getInstance().logEvent('buy_territory', {
        block: this.state.territory.block,
        position: this.state.territory.position,
        farm_id: this.state.farm
      });

      this.state.territory.type = 1;
      user.money -= price;
      this.tryTask(5, 1);

      const territory = this.state.territory;

      this.time.addEvent({ delay: 500, callback: (): void => {

        territory.forest.destroy();
        territory.setTexture(this.state.farm.toLowerCase() + '-bought');
        Firework.create(this, { x: territory.x + 120, y: territory.y + 120 }, 3);
        this.buildBorders();

      }, callbackScope: this, loop: false });

    } else {

      let count: number = price - user.money;
      let diamonds: number = this.convertMoney(count);
      this.state.convertor = {
        fun: 6,
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

function findFreeTerritory (x: number, y: number): Iposition {
  const territory: any = this.currentTerritory(x, y);
  if (territory) {
    if (territory.type === 2 || territory.type === 3) {
      return { x: territory.x + 120, y: territory.y + 120 };
    } else return this.findFreeTerritory(x - 240, y);
  } else if (y > 0) return this.findFreeTerritory(600, y - 240);
  else return;
} 

export {
  currentTerritory,
  changeSprite,
  fairLevelUp,
  improveTerritory,
  exchangeTerritory,
  deleteTerritoriesLocks,
  buildBorders,
  checkExchangeRepository,
  buyTerritory,
  findFreeTerritory
}
