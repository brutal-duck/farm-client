import { randomString } from '../../general/basic';
import SpeechBubble from '../../components/animations/SpeechBuble';
import CowSprite from './../../components/Animal/CowSprite';
import Territory from './../../components/Territories/Territory';
import Firework from './../../components/animations/Firework';
import Utils from './../../libs/Utils';

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

  for (let i in this.animalGroup?.children.entries) {

    let cow: CowSprite = this.animalGroup?.children.entries[i];
    grassConsumption += cow.settings.eating;
    waterConsumption += cow.settings.drinking;
  }
  
  grassConsumption = Math.round(grassConsumption / 2);
  waterConsumption = Math.round(waterConsumption / 2);

  for (let i in this.territories?.children.entries) {

    const territory: Territory = this.territories?.children.entries[i];

    if (territory.territoryType === 2 || territory.territoryType === 3) {
      const reg: number = this.settings.territoriesCowSettings.find(item => item.improve === territory.improve).regeneration;
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

  for (let i in this.animalGroup?.children.entries) {

    let cow: CowSprite = this.animalGroup?.children.entries[i];
    if (cow.breed !== 0) {
      grassConsumption += cow.settings.eating;
      waterConsumption += cow.settings.drinking;
    }
  }
  
  for (let i in this.territories?.children.entries) {
    const territory: Territory = this.territories?.children.entries[i];
    if (territory.territoryType === 2 || territory.territoryType === 3) {
      const reg: number = this.settings.partSettings[territory.improve - 1].territory.regeneration;
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
    if (!Utils.checkTestB(this.state)) insideCounter++;
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
      this.state.amplitude.logAmplitudeEvent('take_diamond_animal', {
        price: 'hard'
      });

      this.tryTask(18, 0);
      this.tryClanTask(8);

      this.state.userCow.diamondAnimalTime = this.state.cowSettings.cowDiamondsTime;
      
      let x: number = Phaser.Math.Between(530, 660);
      let y: number = Phaser.Math.Between(530, 540);

      if (this.animalGroup.children.entries.length <= 50) {
        let id: string = 'local_' + randomString(18);
        this.animalGroup.generate({ x, y }, 0, id, 0, 0);
        Firework.create(this, { x, y }, 1);
      } else {
        let diamondCow = this.animalGroup.children.entries.find((data: any) => data.type === 0);
        if (diamondCow) {
          diamondCow.diamond = 0;
          diamondCow.x = x;
          diamondCow.y = y;
        } else {
          let id: string = 'local_' + randomString(18); 
          Firework.create(this, { x, y }, 1);
          this.animalGroup.generate({ x, y }, 0, id, 0, 500, 0, 7, true);
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

function buildBorders(): void {
  
  for (let i in this.territories.children.entries) {
    const territory: Territory = this.territories.children.entries[i];
    if (territory.territoryType === 7) {
      territory.borderTop.setVisible(true);
      territory.borderLeft.setVisible(true);
      const bottomTer: Territory = this.territories.children.entries.find((data: any) => data.block === 2 && data.position === 1)
      if (bottomTer.territoryType === 0) territory.borderBottom.setVisible(true);
      else territory.borderBottom.setVisible(false);
    }

    if (territory.territoryType === 6) {
      territory.borderTop.setVisible(true);
    }

    if (territory.territoryType === 1 ||
      territory.territoryType === 2 ||
      territory.territoryType === 3 ||
      territory.territoryType === 5 || 
      territory.territoryType === 8) {

      if (territory.position === 1) {
        territory.borderLeft.setVisible(true);
      }

      if (territory.position === 3) {
        territory.borderRight.setVisible(true);
      }
      
      if (territory.block !== 8) {
        const topTer: Territory = this.territories.children.entries.find((data: any) => data.block === territory.block - 1 && data.position === territory.position);
        const bottomTer: Territory = this.territories.children.entries.find((data: any) => data.block === territory.block + 1 && data.position === territory.position);
        if (topTer !== undefined && topTer.territoryType === 0) {
          territory.borderTop.setVisible(true);
        } else {
          territory.borderTop.setVisible(false);
        }
        if (bottomTer.territoryType === 1 ||
          bottomTer.territoryType === 2 ||
          bottomTer.territoryType === 3 ||
          bottomTer.territoryType === 5 ||
          bottomTer.territoryType === 8) {
          territory.borderBottom.setVisible(false);
        } else {
          territory.borderBottom.setVisible(true);
        }

        if (territory.position === 1) {
          const centerTer: Territory = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 2);
          if (centerTer.territoryType === 0) {
            territory.borderRight.setVisible(true);
          } else {
            territory.borderRight.setVisible(false);
          }
        }
        if (territory.position === 2) {
          const leftTer: Territory = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 1);
          const rightTer: Territory = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 3);
          if (leftTer.territoryType === 0) {
            territory.borderLeft.setVisible(true);
          } else {
            territory.borderLeft.setVisible(false);
          }
          if (rightTer.territoryType === 0) {
            territory.borderRight.setVisible(true);
          } else {
            territory.borderRight.setVisible(false);
          }
        }
        if (territory.position === 3) {
          const centerTer: Territory = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 2);
          if (centerTer.territoryType === 0) {
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

function collisions(): void {

  this.physics.add.overlap(this.animalGroup, this.territories, (animal: CowSprite, territory: Territory): void => {
    if (territory.territoryType !== 2 &&
      territory.territoryType !== 3 &&
      !animal.drag &&
      !animal.aim) {

      let halfWidth: number = Math.ceil(animal.width / 2) + 1;
      let halfHeight: number = Math.ceil(animal.height / 2) + 1;

      let territory: Territory = this.currentTerritory(animal.x, animal.y);
      if (territory === undefined) {
        animal.teleportation();

      } else {

        if (territory.territoryType === 2 || territory.territoryType === 3) {

          let minX: number = (territory.position - 1) * this.height + halfWidth;
          let maxX: number = territory.position * this.height - halfWidth;
        
          let mixY: number = (territory.block - 1) * this.height + halfHeight + this.topIndent;
          let maxY: number = territory.block * this.height - halfHeight + this.topIndent;

          let x: number = Phaser.Math.Between(minX, maxX);
          let y: number = Phaser.Math.Between(mixY, maxY);
          animal.setAim(x, y);
        }
      }
    }
  }, null, this);

  this.physics.add.overlap(this.animalGroup, this.animalGroup, (animal1: CowSprite, animal2: CowSprite): void => {

    if (!animal1.drag &&
      !animal2.drag &&
      animal1.collision === 0 &&
      animal1.moving &&
      !animal1.aim) {
      let territory: Territory = this.currentTerritory(animal1.x, animal1.y);
      
      if (territory.territoryType !== 4) {
        animal1.setReverse();
      }
    }
  }, null, this);
}

function showImproveFactory(): void {

  const modal: Imodal = {
    type: 1,
    sysType: 16
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}

function showFactoryBoost(): void {

  const modal: Imodal = {
    type: 1,
    sysType: 17
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}

function showConfirmSellMilk(): void {

  const modal: Imodal = {
    type: 1,
    sysType: 18
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}

export {
  balance,
  cowPrice,
  maxBreedForBuy,
  takeDiamondCow,
  buildBorders,
  collisions,
  showImproveFactory,
  showFactoryBoost,
  showConfirmSellMilk,
}
