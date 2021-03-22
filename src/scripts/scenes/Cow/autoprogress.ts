import { random, randomString } from '../../general/basic';

// расчет прогресса во время отсутствия
function autoprogress(load: boolean = false): void {

  // значение отступа для яиц, чтоб не прилегали к краям территории
  let indent: number = 20;

  // время кристаллической курочки
  if (this.state.userChicken.diamondAnimalTime >= this.state.offlineTime) this.state.userChicken.diamondAnimalTime -= this.state.offlineTime;
  else {
    this.state.userChicken.diamondAnimalTime = 0;
    this.state.userChicken.diamondAnimalAd = true;
  }
  this.caveTimer();

   // время буста комбикорм
   let wasFeedBoost: number = 0;

   if (this.state.userChicken.feedBoostTime >= this.state.offlineTime) {
     this.state.userChicken.feedBoostTime -= this.state.offlineTime;
     wasFeedBoost = this.state.offlineTime;
   } else {
     wasFeedBoost = this.state.userChicken.feedBoostTime;
     this.state.userChicken.feedBoostTime = 0;
   }

  // время собирателя
  let wasCollector: number = 0;

  if (this.state.userChicken.collector >= this.state.offlineTime) {
    this.state.userChicken.collector -= this.state.offlineTime;
    wasCollector = this.state.offlineTime;
  } else {
    wasCollector = this.state.userChicken.collector;
    this.state.userChicken.collector = 0;
  }

  // процент шерсти под бустом
  let feedPercent: number = Number((wasFeedBoost / wasCollector).toFixed(2));
  if (feedPercent >= 1 ) feedPercent = 1;

  if (!load) this.game.scene.keys['CowBars'].collector.update();
  if (!load) this.state.timeToNewDay -= this.state.offlineTime;
  
  // считаем сколько снесла курица яйцо
  let balance: Ibalance = this.balance();
  let newEggs: { egg: boolean, id: string, type: number, count: number }[] = [];

  for (let i in this.chicken.children.entries) {

    let chicken = this.chicken.children.entries[i];
    let breed: number;

    if (chicken.type === 0) breed = 1;
    else breed = chicken.type;

    let points: IchickenPoints = this.settings.chickenSettings.find((item: IchickenPoints) => item.breed === breed);

    let egg: number = points.egg;

    if (balance.alarm) {
      egg = Math.round(egg / 100 * this.settings.chickenBadPercent);
      if (egg < 1) egg = 1;
    }

    let eggs: number = Math.floor((egg * wasCollector) / 1000);

    if (eggs === 0) {
      if (chicken.egg + (eggs * wasCollector) > 1000) chicken.egg = 1000;
      else chicken.egg += (eggs * wasCollector);
    }
    
    if (this.state.userChicken.collector === 0) {
      chicken.egg = random(0, 1000);
    }

    newEggs.push({
      id: chicken._id,
      type: chicken.type,
      count: eggs,
      egg: false
    });

  }

  // добавляем в массив яйца, которые могут лежать на поле
  for (let i in this.eggs.children.entries) {

    let egg = this.eggs.children.entries[i];

    if (egg.type !== 0) {

      newEggs.push({
        id: egg._id,
        type: egg.type,
        count: 1,
        egg: true
      });

    }

  }

  // берем кристаллические курицы если есть и формируем обновленный массив
  let eggs: { egg: boolean, id: string, type: number, count: number }[] = [];

  for (let i in newEggs) {

    if (newEggs[i].type !== 0) {

      eggs.push(newEggs[i]);

    } else {

      let chicken = this.chicken.children.entries.find((data: any) => data._id === newEggs[i].id);
      let territory = this.currentTerritory(chicken.x, chicken.y);

      let count: number = 0;
      let minX: number = (territory.position - 1) * 240 + indent;
      let maxX: number = territory.position * 240 - indent;
      let minY: number = territory.block * 240 + indent;
      let maxY: number = (territory.block + 1) * 240 - indent;

      if (newEggs[i].count < chicken.diamond) {

        chicken.diamond -= newEggs[i].count;
        count = newEggs[i].count;

      } else {

        count = 5 - chicken.diamond;
        chicken.destroy();
        
      }

      for (let j: number = 0; j < count; j++) {
        
        let egg: IchickenEgg = {
          type: 0,
          x: random(minX, maxX),
          y: random(minY, maxY),
          _id: 'local_' + randomString(18)
        }
  
        this.getEgg(egg);

      }

    }

  }

  // скорость сборки
  let percent: number = 100;
  let speed: number = this.state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userChicken.collectorLevel).speed;

  if (this.chicken.children.entries.length > speed * 10) {

    let excess: number = 100 / (speed * 10) * this.chicken.children.entries.length;
    percent = Math.round(100 / (excess / 100));
    
  }

  // формируем массив яиц
  let eggsArr: { id: string, type: number }[] = [];

  for (let i in eggs) {
    for (let j: number = 0; j < eggs[i].count; j++) {
      eggsArr.push({
        id: eggs[i].id,
        type: eggs[i].type
      });
    }
  }

  // ложим яйца в хранилища
  let length: number = eggsArr.length;
  if (percent < 100) length = Math.floor(eggsArr.length / 100 * percent);

  for (let i: number = 0; i < length; i++) {
    
    let price: number = this.state.chickenSettings.chickenSettings.find((data: IchickenPoints) => data.breed === eggsArr[i].type).eggPrice;
    price *= (1 + feedPercent); // коэфф
    
    for (let j in this.territories.children.entries) {

      if (this.territories.children.entries[j].type === 5) {
        
        let territory = this.territories.children.entries[j];

        let max: number = this.settings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).eggStorage;

        if (territory.volume < max && wasCollector > 0) {

          let egg = eggs.find(data => data.id === eggsArr[i].id);
          if (egg.count > 0) egg.count--;

          territory.money += price;
          territory.volume++;
          break;

        }
        
      }
      
    }

  }

  // убираем яйца, которые собрали с поля
  for (let i in eggs) {

    if (eggs[i].egg && eggs[i].count === 0) {
      let egg = this.eggs.children.entries.find((data: any) => data._id === eggs[i].id);
      egg.destroy();
    }

  }

  // ложим остатки яиц на поле
  let remainingEggs: number[] = [];
  for (let i in eggs) {
    for (let j: number = 0; j < eggs[i].count; j++) {
      if (!eggs[i].egg) {
        remainingEggs.push(eggs[i].type);
      }
    }
  }

  // формируем свободные места на клетках
  let freeSpace: Iposition[] = [];
  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];

    if (territory.type === 2 || territory.type === 3) {

      let count: number = this.settings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).countEggs;
      let minX: number = (territory.position - 1) * 240 + indent;
      let maxX: number = territory.position * 240 - indent;
      let minY: number = territory.block * 240 + indent;
      let maxY: number = (territory.block + 1) * 240 - indent;

      for (let j in this.eggs.children.entries) {
        let egg = this.eggs.children.entries[j];
        if (egg.x > minX && egg.x < maxX && egg.y > minY && egg.y < maxY) count--;
      }

      for (let j: number = 0; j < count; j++) {
        freeSpace.push({
          x: random(minX, maxX),
          y: random(minY, maxY)
        });
      }

    }

  }
  
  // ставим оставшиеся яйца на поле
  let index: number = 0;
  for (let i in freeSpace) {

    if (typeof remainingEggs[index] === 'number') {

      let egg: IchickenEgg = {
        type: remainingEggs[index],
        x: freeSpace[i].x,
        y: freeSpace[i].y,
        _id: 'local_' + randomString(18)
      }

      this.getEgg(egg);

    } else break;

    index++;

  }

}

export default autoprogress;
