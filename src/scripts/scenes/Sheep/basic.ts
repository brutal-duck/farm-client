import { randomString } from '../../general/basic';
import SpeechBubble from '../../components/animations/SpeechBuble';
import Utils from './../../libs/Utils';
import Territory from './../../components/Territories/Territory';
import Sheep from './Main';

// расчет баланса фермы
function balance(): Ibalance {
  if (Utils.checkTestB(this.state)) return balanceTestB.bind(this)();
  let waterConsumption: number = 0;
  let grassConsumption: number = 0;
  let waterRecovery: number = 0;
  let grassRecovery: number = 0;
  let waterPercent: number = 0;
  let grassPercent: number = 0;
  let alarm: boolean = false;
  let notEnoughGrass: boolean = false;
  let notEnoughWater: boolean = false;

  for (let i in this.sheep?.children.entries) {

    let sheep = this.sheep?.children.entries[i];

    let breed: number;
    if (sheep.type === 0) breed = 1;
    else breed = sheep.type;

    let points: IsheepPoints = this.settings.sheepSettings.find((item: IsheepPoints) => item.breed === breed);
    
    grassConsumption += points.eating;
    waterConsumption += points.drinking;

  }

  grassConsumption = Math.round(grassConsumption / 2);
  waterConsumption = Math.round(waterConsumption / 2);

  for (let i in this.territories?.children.entries) {

    let territory = this.territories?.children.entries[i];

    if (territory.territoryType === 2 || territory.territoryType === 3) {
      
      let reg: number = this.settings.territoriesSheepSettings.find(item => item.improve === territory.improve).regeneration;

      if (territory.territoryType === 2) {
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

function balanceTestB(): Ibalance {
  let waterConsumption: number = 0;
  let grassConsumption: number = 0;
  let waterRecovery: number = 0;
  let grassRecovery: number = 0;
  let waterPercent: number = 0;
  let grassPercent: number = 0;
  let alarm: boolean = false;
  let notEnoughGrass: boolean = false;
  let notEnoughWater: boolean = false;

  for (const sheep of this.sheep?.children?.entries) {
    if (sheep.type !== 0) {
      const points: IsheepPoints =  this.settings.sheepSettings.find((item: IsheepPoints) => item.breed === sheep.type);
      grassConsumption += points.eating;
      waterConsumption += points.drinking;
    }
  }

  const territories: Territory[] = this.territories?.children?.entries;
  for (const territory of territories) {
    const partSettings: IpartSettings[] = this.settings.partSettings;
    if (territory.territoryType === 2 || territory.territoryType === 3) {
      const reg: number = partSettings[territory.improve - 1].territory.regeneration;
      if (territory.territoryType === 2) grassRecovery += reg;
      else waterRecovery += reg;
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

function checkSheepBalance(newAnimalBreed: number): { pasture: boolean, water: boolean } {
  const { state, sheep, settings, territories } = this as Sheep;
  if (Utils.checkTestB(state)) return checkSheepBalanceTestB.bind(this)(newAnimalBreed);

  let waterConsumption = 0;
  let grassConsumption = 0;
  let waterRecovery = 0;
  let grassRecovery = 0;
  const animalsBreed = sheep?.getChildren().map(el => Number(el.type));
  animalsBreed.push(newAnimalBreed);
  for (const breed of animalsBreed) {
    const checkBreed = breed === 0 ? 1 : breed;
    const points = settings.sheepSettings.find(item => item.breed === checkBreed);
    grassConsumption += points.eating;
    waterConsumption += points.drinking;
  }

  grassConsumption = Math.round(grassConsumption / 2);
  waterConsumption = Math.round(waterConsumption / 2);

  for (const i in territories?.children?.entries) {
    const territory = territories.children.entries[i] as Territory;
    if (territory.territoryType === 2 || territory.territoryType === 3) {
      const reg = settings.territoriesSheepSettings.find(item => item.improve === territory.improve).regeneration;
      if (territory.territoryType === 2) grassRecovery += reg;
      else waterRecovery += reg;
    }
  }

  return { 
    pasture: grassConsumption <= grassRecovery,
    water: waterConsumption <= waterRecovery,
  };
}

function checkSheepBalanceTestB(newAnimalBreed: number): { pasture: boolean, water: boolean } {
  const { sheep, settings, territories } = this as Sheep;

  let waterConsumption = 0;
  let grassConsumption = 0;
  let waterRecovery = 0;
  let grassRecovery = 0;
  const animalsBreed = sheep?.getChildren().map(el => Number(el.type));
  animalsBreed.push(newAnimalBreed);
  for (const breed of animalsBreed) {
    if (breed !== 0) {
      const points = settings?.sheepSettings.find(item => item.breed === breed);
      grassConsumption += points.eating;
      waterConsumption += points.drinking;
    }
  }

  for (const i in territories?.children?.entries) {
    const territory = territories.children.entries[i] as Territory;
    if (territory.territoryType === 2 || territory.territoryType === 3) {
      const reg = settings.partSettings[territory.improve - 1].territory.regeneration;
      if (territory.territoryType === 2) grassRecovery += reg;
      else waterRecovery += reg;
    }
  }

  return { 
    pasture: grassConsumption <= grassRecovery,
    water: waterConsumption <= waterRecovery,
  };
}

// цена овцы
function sheepPrice(breed: number) {

  let degree = Math.pow(2, breed - 1);
  let insideCounter: number = this.state.userSheep.countSheep;
  let insidePrice: number = 0;

  for (let i = 0; i < degree; i++) {
    let price = this.state.sheepSettings.sheepPrice;

    if (insideCounter !== 0 && insideCounter !== 1) {
      price *= insideCounter;
    }

    insidePrice += price;
    if (!Utils.checkTestB(this.state)) insideCounter++;
  }

  return {
    price: insidePrice,
    countSheep: insideCounter
  }

}


// максимальная порода для покупки
function maxBreedForBuy(): number {

  let breed: number = 1;
  this.state.sheepSettings.sheepSettings.map((data: IsheepPoints) => {
    if (data.breed <= this.state.userSheep.fair - this.state.sheepSettings.buyBetterBreedSheep) breed = data.breed;
    return true;
  });
  
  return breed;
  
}


// берем кристаллическую овцу
function takeDiamondSheep(): void {
  
  if (this.state.userSheep.part >= 3 && this.state.user.additionalTutorial.cave) {

    if (this.state.userSheep.diamondAnimalTime === 0) {

      this.state.amplitude.logAmplitudeEvent('take_diamond_animal', {});

      this.tryTask(18, 0);
      this.tryClanTask(8);
      this.state.userSheep.diamondAnimalTime = this.state.sheepSettings.sheepDiamondsTime;
      
      let x: number = Phaser.Math.Between(530, 660);
      let y: number = Phaser.Math.Between(530, 540);

      if (this.sheep.children.entries.length <= 50) {

        let id: string = 'local_' + randomString(18);
        this.getSheep(id, 0, x, y, 0, 500);

      } else {

        let diamondSheep = this.sheep.children.entries.find((data: any) => data.type === 0);

        if (diamondSheep) {

          diamondSheep.diamond = 0;
          diamondSheep.x = x;
          diamondSheep.y = y;

        } else {
          
          let id: string = 'local_' + randomString(18);
          this.getSheep(id, 0, x, y, 0, 500);

        }

      }

    } else if (this.state.readyAd && this.state.userSheep.diamondAnimalAd) {

      let modal: Imodal = {
        type: 1,
        sysType: 9
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    } else {
      SpeechBubble.create(this, this.state.lang.sheepCaveMessage, 2);
    }

  }
  
}


export {
  balance,
  sheepPrice,
  maxBreedForBuy,
  checkSheepBalance,
  takeDiamondSheep,
};
