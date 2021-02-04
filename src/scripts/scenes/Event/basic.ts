// цена животного
function animalPrice(breed: number): {price: number, countAnimal: number} {

  let insideCounter: number = this.state.userEvent.countAnimal[breed - 1].counter;
  let insidePrice: number = this.state.eventSettings.eventSettings[breed - 1].price;
    
  insidePrice *= insideCounter;
  insideCounter++;

  return {
    price: insidePrice,
    countAnimal: insideCounter
  }

}

function getFreePosition(): {x: number, y: number} {
  let x: number = 120;
  let y: number = 840;
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
      console.log('нет животного тебе') 
      return {x: null, y: null}
    }
  }
  return {x, y} 

}

// максимальная порода для покупки
function maxBreedForBuy(): number {

  let breed: number = 1;
  let breedPrice: number = Infinity;
  for (let i = 0; i < this.state.userEvent.countAnimal.length - 1; i++ ) {

    let currentPrice = this.state.userEvent.countAnimal[i].counter * this.state.eventSettings.eventSettings[i].price; 
    if (currentPrice <= breedPrice) {
        breedPrice = currentPrice;
        breed = i + 1;
    }
    
  };
  return breed;
  
}

function convertEventMoney(money: number): number {

  let fairLevels: IfairLevel[];
  let fair: number;
  
  if (this.state.farm === 'Sheep') {

    fairLevels = this.state.sheepSettings.sheepFairLevels;
    fair = this.state.userSheep.fair;

  } else if (this.state.farm === 'Chicken') {

    fairLevels = this.state.chickenSettings.chickenFairLevels;
    fair = this.state.userChicken.fair;

  }

  let exchange: number = fairLevels.find((item: IfairLevel) => item.level === fair).exchange;
  let needDiamonds: number = 1;
  let sumExchange: number = exchange;

  while (sumExchange < money) {
    needDiamonds++;
    sumExchange = sumExchange + exchange;
  }

  return needDiamonds;

}

// территория на которой находится объект
function currentTerritory(x: number, y: number): object {

  let block: number = Math.ceil((y - this.topIndent) / this.height);
  let position: number = Math.ceil(x / this.height);
  return this.territories.children.entries.find((data: Phaser.Physics.Arcade.Sprite) => data.data.values.block === block && data.data.values.position === position);
  
}
export {
  animalPrice,
  maxBreedForBuy,
  getFreePosition,
  convertEventMoney,
  currentTerritory
}
