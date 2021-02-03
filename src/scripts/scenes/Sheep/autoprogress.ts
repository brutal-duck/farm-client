// расчет прогресса во время отсутствия
function autoprogress(load: boolean = false): void {

  // время кристаллической овцы
  if (this.state.userSheep.diamondAnimalTime >= this.state.offlineTime) this.state.userSheep.diamondAnimalTime -= this.state.offlineTime;
  else {
    this.state.userSheep.diamondAnimalTime = 0;
    this.state.userSheep.diamondAnimalAd = true;
  }
  this.caveTimer();

  // время буста комбикорм
  let wasFeedBoost: number = 0;

  if (this.state.userSheep.feedBoostTime >= this.state.offlineTime) {
    this.state.userSheep.feedBoostTime -= this.state.offlineTime;
    wasFeedBoost = this.state.offlineTime;
  } else {
    wasFeedBoost = this.state.userSheep.feedBoostTime;
    this.state.userSheep.feedBoostTime = 0;
  }

  // время собирателя
  let wasCollector: number = 0;

  if (this.state.userSheep.collector >= this.state.offlineTime) {
    this.state.userSheep.collector -= this.state.offlineTime;
    wasCollector = this.state.offlineTime;
  } else {
    wasCollector = this.state.userSheep.collector;
    this.state.userSheep.collector = 0;
  }

  
  
  if (!load) this.game.scene.keys['SheepBars'].collector.update();
  if (!load) this.state.timeToHerdBoost -= this.state.offlineTime;

  // считаем сколько раз подстригли овец
  let balance: Ibalance = this.balance();
  let sheepWoolcuts: { id: string, type: number, count: number }[] = [];

  if (balance.waterRecovery > 0 && balance.grassRecovery > 0) {

    for (let i in this.sheep.children.entries) {

      let sheep = this.sheep.children.entries[i];
      let breed: number;

      if (sheep.type === 0) breed = 1;
      else breed = sheep.type;

      let points: IsheepPoints = this.settings.sheepSettings.find((item: IsheepPoints) => item.breed === breed);

      let wool: number = points.wool_growth;

      if (balance.alarm) {
        wool = Math.round(wool / 100 * this.settings.sheepBadPercent);
        if (wool < 1) wool = 1;
      }

      let woolcuts: number = Math.floor((wool * wasCollector) / 1000);

      if (woolcuts === 0) {
        if (sheep.wool + (wool * wasCollector) > 1000) sheep.wool = 1000;
        else sheep.wool += (wool * wasCollector);
      }
      
      if (this.state.userSheep.collector === 0) {
        sheep.wool = 1000;
      }

      if (sheep.type !== 0) {

        sheepWoolcuts.push({
          id: sheep._id,
          type: sheep.type,
          count: woolcuts
        });

      }

    }

  }

  // скорость сборки
  let speed: number = this.state.sheepCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userSheep.collectorLevel).speed;

  if (this.sheep.children.entries.length > speed * 10) {

    let excess: number = 100 / (speed * 10) * this.sheep.children.entries.length;
    let percent: number = 100 / (excess / 100);

    for (let i in sheepWoolcuts) {
      if (sheepWoolcuts[i].count > 0) {
        sheepWoolcuts[i].count = Math.round(sheepWoolcuts[i].count / 100 * percent);
      }
    }

  }

  // заполняем хранилища
  let wool: number[] = [];

  for (let i in sheepWoolcuts) {
    for (let j: number = 0; j < sheepWoolcuts[i].count; j++) {
      wool.push(sheepWoolcuts[i].type);
    }
  }

  for (let i in wool) {
    
    let price: number = this.state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === wool[i]).long_wool;

    for (let j in this.territories.children.entries) {

      if (this.territories.children.entries[j].type === 5) {
        
        let territory = this.territories.children.entries[j];
        let max: number = this.settings.territoriesSheepSettings.find((item: IterritoriesSheepSettings) => item.improve === territory.improve).woolStorage;

        if (territory.volume < max) {

          let sheep = sheepWoolcuts.find(data => data.type === wool[i] && data.count > 0);
          if (sheep?.count > 0) sheep.count--;

          territory.money += price;
          territory.volume++;
          break;

        }
        
      }
      
    }

  }
  
  // если есть остаток, то овцы пушистые
  for (let i in sheepWoolcuts) {

    if (sheepWoolcuts[i].count > 0) {
      let sheep = this.sheep.children.entries.find((data: any) => data._id === sheepWoolcuts[i].id);
      sheep.wool = 1000;
    }

  }

}

export default autoprogress;
