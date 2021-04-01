import { randomString } from '../../general/basic';
import SpeechBubble from './../../components/SpeechBuble';

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

  for (let i in this.cow.children.entries) {

    let cow = this.cow.children.entries[i];

    let breed: number;
    if (cow.type === 0) breed = 1;
    else breed = cow.type;

    let points: IcowPoints = this.settings.cowSettings.find((item: IcowPoints) => item.breed === breed);
    
    grassConsumption += points.eating;
    waterConsumption += points.drinking;

  }
  
  grassConsumption = Math.round(grassConsumption / 2);
  waterConsumption = Math.round(waterConsumption / 2);

  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];

    if (territory.type === 2 || territory.type === 3) {
      
      let reg: number = this.settings.territoriesCowSettings.find(item => item.improve === territory.improve).regeneration;

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


// цена коровы
function cowPrice(breed: number) {

  let degree = Math.pow(2, breed - 1);
  let insideCounter: number = this.state.userCow.countCow;
  let insidePrice: number = 0;

  for (let i = 0; i < degree; i++) {
    let price = this.state.cowSettings.cowPrice;

    if (insideCounter !== 0 && insideCounter !== 1) {
      price *= insideCounter;
    }

    insidePrice += price;
    insideCounter++;
  }

  return {
    price: insidePrice,
    countCow: insideCounter
  }

}


// максимальная порода для покупки
function maxBreedForBuy(): number {

  let breed: number = 1;
  this.state.cowSettings.cowSettings.map((data: IcowPoints) => {
    if (data.breed <= this.state.userCow.fair - this.state.cowSettings.buyBetterBreedCow) breed = data.breed;
    return true;
  });
  
  return breed;
  
}


// Кристалическая корова
function takeDiamondCow(): void {
  
  if (this.state.userCow.part >= 3) {

    if (this.state.userCow.diamondAnimalTime === 0) {

      this.state.amplitude.getInstance().logEvent('take_diamond_animal', {
        farm_id: this.state.farm,
        price: 'hard'
      });

      this.tryTask(18, 0);
      this.state.userCow.diamondAnimalTime = this.state.cowSettings.cowDiamondsTime;
      
      let x: number = Phaser.Math.Between(530, 660);
      let y: number = Phaser.Math.Between(530, 540);

      if (this.cow.children.entries.length <= 50) {

        let id: string = 'local_' + randomString(18);
        this.getCow(id, 0, x, y, 0, 500);

      } else {

        let diamondCow = this.cow.children.entries.find((data: any) => data.type === 0);

        if (diamondCow) {

          diamondCow.diamond = 0;
          diamondCow.x = x;
          diamondCow.y = y;

        } else {
          
          let id: string = 'local_' + randomString(18);
          this.getCow(id, 0, x, y, 0, 500);

        }

      }

    } else if (this.state.readyAd && this.state.userCow.diamondAnimalAd) {

      let modal: Imodal = {
        type: 1,
        sysType: 9
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    } else {
      SpeechBubble.create(this, this.state.lang.cowCaveMessage, 2);
    }

  }
  
}


export {
  balance,
  cowPrice,
  maxBreedForBuy,
  takeDiamondCow
}