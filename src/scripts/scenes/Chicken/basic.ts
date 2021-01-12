import { randomString } from '../../general/basic';

// расчет баланса фермы
function balance(): Ibalance {

  let waterConsumption: number = 0;
  let grassConsumption: number = 0;
  let waterRecovery: number = 0;
  let grassRecovery: number = 0;
  let waterPercent: number = 0;
  let grassPercent: number = 0;
  let alarm: boolean = false;
  let notEnoughGrass: boolean = false;
  let notEnoughWater: boolean = false;

  for (let i in this.chicken.children.entries) {

    let chicken = this.chicken.children.entries[i];

    let breed: number;
    if (chicken.type === 0) breed = 1;
    else breed = chicken.type;

    let points: IchickenPoints = this.settings.chickenSettings.find((item: IchickenPoints) => item.breed === breed);
    
    grassConsumption += points.eating;
    waterConsumption += points.drinking;

  }
  
  grassConsumption = Math.round(grassConsumption / 2);
  waterConsumption = Math.round(waterConsumption / 2);

  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];

    if (territory.type === 2 || territory.type === 3) {
      
      let reg: number = this.settings.territoriesChickenSettings.find(item => item.improve === territory.improve).regeneration;

      if (territory.type === 2) {
        grassRecovery += reg;
      } else {
        waterRecovery += reg;
      }

    }

  }

  if (waterRecovery > 0) {
    waterPercent = Math.round((waterRecovery - waterConsumption) / (waterRecovery / 100));
  } else waterPercent = -100;
  
  if (grassRecovery > 0) {
    grassPercent = Math.round((grassRecovery - grassConsumption) / (grassRecovery / 100));
  } else grassPercent = -100;

  if (grassRecovery < grassConsumption || waterRecovery < waterConsumption) {

    if (grassRecovery < grassConsumption) {
      notEnoughGrass = true;

      if (grassConsumption / 2 > grassRecovery) {
        grassPercent = 100;
      } else {
        grassPercent = Math.round((grassConsumption - grassRecovery) / (grassRecovery / 100));
      }
    }

    if (waterRecovery < waterConsumption) {
      notEnoughWater = true;
      
      if (waterConsumption / 2 > waterRecovery) {
        waterPercent = 100;
      } else {
        waterPercent = Math.round((waterConsumption - waterRecovery) / (waterRecovery / 100));
      }
    }

    alarm = true;

  }

  if (waterPercent > 100) waterPercent = 100;
  if (waterPercent < 0) waterPercent = 0;
  if (grassPercent > 100) grassPercent = 100;
  if (grassPercent < 0) grassPercent = 0;

  return {
    alarm: alarm,
    waterPercent: waterPercent,
    grassPercent: grassPercent,
    grassConsumption: grassConsumption,
    waterConsumption: waterConsumption,
    grassRecovery: grassRecovery,
    waterRecovery: waterRecovery,    
    notEnoughGrass: notEnoughGrass,
    notEnoughWater: notEnoughWater
  }

}


// цена курицы
function chickenPrice(breed: number) {

  let degree = Math.pow(2, breed - 1);
  let insideCounter: number = this.state.userChicken.countChicken;
  let insidePrice: number = 0;

  for (let i = 0; i < degree; i++) {
    let price = this.state.chickenSettings.chickenPrice;

    if (insideCounter !== 0 && insideCounter !== 1) {
      price *= insideCounter;
    }

    insidePrice += price;
    insideCounter++;
  }

  return {
    price: insidePrice,
    countChicken: insideCounter
  }

}


// максимальная порода для покупки
function maxBreedForBuy(): number {

  let breed: number = 1;
  this.state.chickenSettings.chickenSettings.map((data: IchickenPoints) => {
    if (data.breed <= this.state.userChicken.fair - this.state.chickenSettings.buyBetterBreedChicken) breed = data.breed;
    return true;
  });
  
  return breed;
  
}


// берем кристаллическую курицу
function takeDiamondChicken(): void {
  
  if (this.state.userChicken.part >= 3) {

    if (this.state.userChicken.diamondAnimalTime === 0) {

      this.state.amplitude.getInstance().logEvent('take_diamond_animal', {
        farm_id: this.state.farm,
        price: 'hard'
      });

      this.tryTask(18, 0);
      this.state.userChicken.diamondAnimalTime = this.state.chickenSettings.chickenDiamondsTime;
      
      let x: number = Phaser.Math.Between(530, 660);
      let y: number = Phaser.Math.Between(530, 540);

      if (this.chicken.children.entries.length <= 50) {

        let id: string = 'local_' + randomString(18);
        this.getChicken(id, 0, x, y, 0, 500);

      } else {

        let diamondChicken = this.chicken.children.entries.find((data: any) => data.type === 0);

        if (diamondChicken) {

          diamondChicken.diamond = 0;
          diamondChicken.x = x;
          diamondChicken.y = y;

        } else {
          
          let id: string = 'local_' + randomString(18);
          this.getChicken(id, 0, x, y, 0, 500);

        }

      }

    } else if (this.state.readyAd && this.state.userChicken.diamondAnimalAd) {

      let modal: Imodal = {
        type: 1,
        sysType: 9
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    } else {
      this.createSpeechBubble(this.state.lang.chickenCaveMessage, true);
    }

  }
  
}


export {
  balance,
  chickenPrice,
  maxBreedForBuy,
  takeDiamondChicken
}
