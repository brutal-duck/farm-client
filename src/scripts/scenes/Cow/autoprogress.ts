import { random, randomString } from '../../general/basic';

// расчет прогресса во время отсутствия
function autoprogress(load: boolean = false): void {

  // // значение отступа для молока, чтоб не прилегали к краям территории
  // let indent: number = 20;

  // // время кристаллической коровы
  // if (this.state.userCow.diamondAnimalTime >= this.state.offlineTime) this.state.userCow.diamondAnimalTime -= this.state.offlineTime;
  // else {
  //   this.state.userCow.diamondAnimalTime = 0;
  //   this.state.userCow.diamondAnimalAd = true;
  // }

  //  // время буста комбикорм
  //  let wasFeedBoost: number = 0;

  //  if (this.state.userCow.feedBoostTime >= this.state.offlineTime) {
  //    this.state.userCow.feedBoostTime -= this.state.offlineTime;
  //    wasFeedBoost = this.state.offlineTime;
  //  } else {
  //    wasFeedBoost = this.state.userCow.feedBoostTime;
  //    this.state.userCow.feedBoostTime = 0;
  //  }

  // // время собирателя
  // let wasCollector: number = 0;

  // if (this.state.userCow.collector >= this.state.offlineTime) {
  //   this.state.userCow.collector -= this.state.offlineTime;
  //   wasCollector = this.state.offlineTime;
  // } else {
  //   wasCollector = this.state.userCow.collector;
  //   this.state.userCow.collector = 0;
  // }

  // // процент молока под бустом
  // let feedPercent: number = Number((wasFeedBoost / wasCollector).toFixed(2));
  // if (feedPercent >= 1 ) feedPercent = 1;

  // if (!load) this.game.scene.keys['CowBars'].collector.update();
  // if (!load) this.state.timeToNewDay -= this.state.offlineTime;
  
  // // считаем сколько молока принесла корова
  // let balance: Ibalance = this.balance();
  // let newMilk: { milk: boolean, id: string, type: number, count: number }[] = [];

  // for (let i in this.cow.children.entries) {

  //   let cow = this.cow.children.entries[i];
  //   let breed: number;

  //   if (cow.type === 0) breed = 1;
  //   else breed = cow.type;

  //   let points: IcowPoints = this.settings.cowSettings.find((item: IcowPoints) => item.breed === breed);

  //   let milk: number = points.milk;

  //   if (balance.alarm) {
  //     milk = Math.round(milk / 100 * this.settings.cowBadPercent);
  //     if (milk < 1) milk = 1;
  //   }

  //   let milks: number = Math.floor((milk * wasCollector) / 1000);

  //   if (milks === 0) {
  //     if (cow.milk + (milks * wasCollector) > 1000) cow.milk = 1000;
  //     else cow.milk += (milks * wasCollector);
  //   }
    
  //   if (this.state.userCow.collector === 0) {
  //     cow.milk = random(0, 1000);
  //   }

  //   newMilk.push({
  //     id: cow._id,
  //     type: cow.type,
  //     count: milks,
  //     milk: false
  //   });

  // }

  // // добавляем в массив яйца, которые могут лежать на поле
  // for (let i in this.milk.children.entries) {

  //   let milk = this.milk.children.entries[i];

  //   if (milk.type !== 0) {

  //     newMilk.push({
  //       id: milk._id,
  //       type: milk.type,
  //       count: 1,
  //       milk: true
  //     });

  //   }

  // }

  // // берем кристаллические корова если есть и формируем обновленный массив
  // let milks: { milk: boolean, id: string, type: number, count: number }[] = [];

  // for (let i in newMilk) {

  //   if (newMilk[i].type !== 0) {

  //     milks.push(newMilk[i]);

  //   } else {

  //     let cow = this.cow.children.entries.find((data: any) => data._id === newMilk[i].id);
  //     let territory = this.currentTerritory(cow.x, cow.y);

  //     let count: number = 0;
  //     let minX: number = (territory.position - 1) * 240 + indent;
  //     let maxX: number = territory.position * 240 - indent;
  //     let minY: number = territory.block * 240 + indent;
  //     let maxY: number = (territory.block + 1) * 240 - indent;

  //     if (newMilk[i].count < cow.diamond) {

  //       cow.diamond -= newMilk[i].count;
  //       count = newMilk[i].count;

  //     } else {

  //       count = 5 - cow.diamond;
  //       cow.destroy();
        
  //     }

  //     for (let j: number = 0; j < count; j++) {
        
  //       let milk: IcowMilk = {
  //         type: 0,
  //         x: random(minX, maxX),
  //         y: random(minY, maxY),
  //         _id: 'local_' + randomString(18)
  //       }
  
  //       this.getMilk(milk);

  //     }

  //   }

  // }

  // // скорость сборки
  // let percent: number = 100;
  // let speed: number = this.state.cowCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userCow.collectorLevel).speed;

  // if (this.cow.children.entries.length > speed * 10) {

  //   let excess: number = 100 / (speed * 10) * this.cow.children.entries.length;
  //   percent = Math.round(100 / (excess / 100));
    
  // }

  // формируем массив яиц
  // let milkArr: { id: string, type: number }[] = [];

  // for (let i in milks) {
  //   for (let j: number = 0; j < milks[i].count; j++) {
  //     milkArr.push({
  //       id: milks[i].id,
  //       type: milks[i].type
  //     });
  //   }
  // }

  // ложим яйца в хранилища
  // let length: number = milkArr.length;
  // if (percent < 100) length = Math.floor(milkArr.length / 100 * percent);

  // for (let i: number = 0; i < length; i++) {
    
  //   let price: number = this.state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === milkArr[i].type).milkPrice;
  //   price *= (1 + feedPercent); // коэфф
    
  //   for (let j in this.territories.children.entries) {

  //     if (this.territories.children.entries[j].type === 5) {
        
  //       let territory = this.territories.children.entries[j];

  //       let max: number = this.settings.territoriesCowSettings.find((item: IterritoriesCowSettings) => item.improve === territory.improve).storage;

  //       if (territory.volume < max && wasCollector > 0) {

  //         let milkArr = milks.find(data => data.id === milkArr[i].id);
  //         if (milkArr.count > 0) milkArr.count--;

  //         territory.money += price;
  //         territory.volume++;
  //         break;

  //       }
        
  //     }
      
  //   }

  // }

  // убираем яйца, которые собрали с поля
  // for (let i in milks) {

  //   if (milks[i].milk && milks[i].count === 0) {
  //     let milk = this.milks.children.entries.find((data: any) => data._id === milks[i].id);
  //     milk.destroy();
  //   }

  // }

  // ложим остатки яиц на поле
  // let remainingMilk: number[] = [];
  // for (let i in milks) {
  //   for (let j: number = 0; j < milks[i].count; j++) {
  //     if (!milks[i].milk) {
  //       remainingMilk.push(milks[i].type);
  //     }
  //   }
  // }

  // формируем свободные места на клетках
  // let freeSpace: Iposition[] = [];
  // for (let i in this.territories.children.entries) {

  //   let territory = this.territories.children.entries[i];

  //   if (territory.type === 2 || territory.type === 3) {

  //     let count: number = this.settings.territoriesCowSettings.find((item: IterritoriesCowSettings) => item.improve === territory.improve).countMilks;
  //     let minX: number = (territory.position - 1) * 240 + indent;
  //     let maxX: number = territory.position * 240 - indent;
  //     let minY: number = territory.block * 240 + indent;
  //     let maxY: number = (territory.block + 1) * 240 - indent;

  //     for (let j in this.milk.children.entries) {
  //       let milk = this.mliks.children.entries[j];
  //       if (milk.x > minX && milk.x < maxX && milk.y > minY && milk.y < maxY) count--;
  //     }

  //     for (let j: number = 0; j < count; j++) {
  //       freeSpace.push({
  //         x: random(minX, maxX),
  //         y: random(minY, maxY)
  //       });
  //     }

  //   }

  // }
  
  // ставим оставшиеся яйца на поле
  // let index: number = 0;
  // for (let i in freeSpace) {

  //   if (typeof remainingMilk[index] === 'number') {

  //     let milk: IcowMilk = {
  //       type: remainingMilk[index],
  //       x: freeSpace[i].x,
  //       y: freeSpace[i].y,
  //       _id: 'local_' + randomString(18)
  //     }

  //     this.getMilk(milk);

  //   } else break;

  //   index++;

  // }

}

export default autoprogress;
