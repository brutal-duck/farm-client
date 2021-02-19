import { random, randomString } from '../../general/basic';

// расчет прогресса во время отсутствия
function autoprogress(load: boolean = false): void {

   // время буста комбикорм
  let wasFeedBoost: number = 0;

  if (this.state.userEvent.feedBoostTime >= this.state.offlineTime) {
    this.state.userEvent.feedBoostTime -= this.state.offlineTime;
    wasFeedBoost = this.state.offlineTime;
  } else {
    wasFeedBoost = this.state.userEvent.feedBoostTime;
    this.state.userEvent.feedBoostTime = 0;
  }

  // время собирателя
  let wasCollector: number = 0;

  if (this.state.userEvent.collector >= this.state.offlineTime) {
    this.state.userEvent.collector -= this.state.offlineTime;
    wasCollector = this.state.offlineTime;
  } else {
    wasCollector = this.state.userEvent.collector;
    this.state.userEvent.collector = 0;
  }

  // процент ресурсов под бустом
  let feedBoostNumberPercent: number = 100 + Number((wasFeedBoost / wasCollector).toFixed(2)) * 100;
  if (feedBoostNumberPercent >= 200 ) feedBoostNumberPercent = 200;
  let feedPercent: bigint = BigInt(feedBoostNumberPercent);

  if (!load) this.game.scene.keys['EventBars'].collector.update();
  if (!load) this.state.timeToHerdBoost -= this.state.offlineTime;
  
  // считаем сколько появилось ресурсов
  let newResources: { resource: boolean, id: string, type: number, count: number }[] = [];

  for (let i in this.animals.children.entries) {

    let animal = this.animals.children.entries[i];
    let breed: number = animal.data.values.type;

    let points: IeventPoints = this.state.eventSettings.eventSettings.find((item: IeventPoints) => item.breed === breed);

    let resource: number = points.resource;

    let resources: number = Math.floor((resource * wasCollector) / 1000);

    if (resources === 0) {
      if (animal.data.values.active.data.values.resource + (resources * wasCollector) > 1000) animal.data.values.active.data.values.resource = 1000;
      else animal.data.values.active.data.values.resource += (resources * wasCollector);
    }
    
    if (this.state.userEvent.collector === 0) {
      animal.data.values.resource = random(0, 1000);
    }

    if (animal.data.values.active.data.values.working) {
      newResources.push({
        id: animal.data.values._id,
        type: animal.data.values.type,
        count: resources,
        resource: false
      });
    }
  }

  // добавляем в массив ресурсов, которые могут лежать на поле
  for (let i in this.resources.children.entries) {

    let resource = this.resources.children.entries[i];

      newResources.push({
        id: resource.data.values._id,
        type: resource.data.values.type,
        count: 1,
        resource: true
      });

  }

  // скорость сборки
  let percent: number = 100;
  let speed: number = this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userEvent.collectorLevel).speed;

  if (this.animals.children.entries.length > speed * 10) {

    let excess: number = 100 / (speed * 10) * this.animals.children.entries.length;
    percent = Math.round(100 / (excess / 100));
    
  }

  // формируем массив ресурсов
  let resourceArr: { id: string, type: number }[] = [];

  for (let i in newResources) {
    for (let j: number = 0; j < newResources[i].count; j++) {
      resourceArr.push({
        id: newResources[i].id,
        type: newResources[i].type
      });
    }
  }

  // сохраняем ресурсы
  let income: bigint = BigInt(0);
  let length: number = resourceArr.length;
  
  if (percent < 100) length = Math.floor(length / 100 * percent);

  for (let i: number = 0; i < length; i++) {

    let price: bigint = this.state.eventSettings.eventSettings.find((data: IeventPoints) => data.breed === resourceArr[i].type).resourcePrice;
    price = (price * feedPercent) / BigInt(100); // коэфф
    
    
    if (wasCollector > 0) {
      
      let resource = newResources.find(data => data.id === resourceArr[i].id);

      if (resource.count > 0) resource.count--;

      income += price;

    }
  }
  if (this.state.offlineTime > 900) {
    let modal: Imodal = {
      type: 10,
      eventParams: {
        offlineTime: this.state.offlineTime,
        offlineProgress: income,
        collectorTime: wasCollector,
      }
    }
    console.log(modal)
    // this.state.modal = modal;
    // this.scene.launch('Modal', this.state);
  }
  
  
  // убираем ресурсы, которые собрали с поля
  for (let i in newResources) {

    if (newResources[i].resource && newResources[i].count === 0) {
      
      let resource = this.resources.children.entries.find((data: any) => data.data.values._id === newResources[i].id);
      
      resource.destroy();
    }

  }

  // ложим остатки ресурсов на поле
  let remainingResources: number[] = [];
  for (let i in newResources) {

    for (let j: number = 0; j < newResources[i].count; j++) {

      if (!newResources[i].resource) {
        
        remainingResources.push(newResources[i].type);
      }
    }
  }

  // формируем свободные места на рабочей зоне
  let freeSpace: Iposition[] = [];
  for (let j: number = 0; j < this.maxCountResource - this.resources.children.entries.length; j++) {
    freeSpace.push({
      x: random(20, 700),
      y: random(this.topIndent + 20, this.topIndent + 460)
    });
  }
  
  // ставим оставшиеся ресуры на поле
  let index: number = 0;
  for (let i in freeSpace) {

    if (typeof remainingResources[index] === 'number') {

      let resource: IchickenEgg = {
        type: remainingResources[index],
        x: freeSpace[i].x,
        y: freeSpace[i].y,
        _id: 'local_' + randomString(18)
      }

      this.getResource(resource);

    } else break;

    index++;

  } 

}

export default autoprogress;
