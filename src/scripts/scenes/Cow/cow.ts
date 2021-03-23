import { random, randomString } from '../../general/basic';

// телепортация коров на свободные территории
function teleportation(cow: any): void {

  let territories = [];

  // берем только нужные территории
  for (let i in this.territories.children.entries) {

    if (this.territories.children.entries[i].type === 2 || this.territories.children.entries[i].type === 3) {
      territories.push({
        _id: this.territories.children.entries[i]._id,
        block: this.territories.children.entries[i].block,
        position: this.territories.children.entries[i].position,
        count: 0
      });
    }

  }
  
  // смотрим, где какая корова сидит
  for (let i in this.cow.children.entries) {

    let c = this.cow.children.entries[i];
    let territory = this.currentTerritory(c.x, c.y);

    if (territory !== undefined) {
      
      territory = territories.find(data => data._id === territory._id);

      if (territory !== undefined) {
        territory.count++;
      }
      
    }
    
  }

  // сортируем, чтобы взять первую с наименьшим количеством
  territories.sort((x1, x2) => {
    if (x1.count < x2.count) return -1;
    if (x1.count > x2.count) return 1;
    return 0;
  });
  
  let halfWidth: number = Math.ceil(cow.width / 2) + 1;
  let halfHeight: number = Math.ceil(cow.height / 2) + 1;

  let minX: number = (territories[0].position - 1) * this.height + halfWidth;
  let maxX: number = territories[0].position * this.height - halfWidth;

  let mixY: number = (territories[0].block - 1) * this.height + halfHeight + this.topIndent;
  let maxY: number = territories[0].block * this.height - halfHeight + this.topIndent;

  cow.x = random(minX, maxX);
  cow.y = random(mixY, maxY);
  cow.counter = 200;
  cow.aim = false;
  cow.aimX = 0;
  cow.aimY = 0;
  cow.distance = 0;

}


// функция реверсивного движения коровы
function reverse(cow: any): void {

  cow.collision = 1;

  let x: number = random(this.velocity - 5, this.velocity + 5);
  let y: number = random(this.velocity - 5, this.velocity + 5);
  
  cow.setVelocity(0, 0);
  cow.body.reset(cow.x, cow.y);

  switch(cow.vector) {
    case 1:
      cow.vector = 3;
      cow.setVelocity(-x, -y);
      break;
    case 2:
      cow.vector = 4;
      cow.setVelocity(x, -y);
      break;
    case 3:
      cow.vector = 1;
      cow.setVelocity(x, y);
      break;
    case 4:
      cow.vector = 2;
      cow.setVelocity(-x, y);
      break;
    case 5:
      cow.vector = 7;
      cow.setVelocity(0, y);
      break;
    case 6:
      cow.vector = 8;
      cow.setVelocity(-x, 0);
      break;
    case 7:
      cow.vector = 5;
      cow.setVelocity(0, -y);
      break;
    case 8:
      cow.vector = 6;
      cow.setVelocity(x, 0);
      break;
  }

}


// функция получения цели для точки движения коровы
function aim(cow: any, x: number, y: number): void {

  if (cow.x < x && cow.y > y) cow.vector = 4;
  else if (cow.x < x && cow.y < y) cow.vector = 1;
  else if (cow.x > x && cow.y < y) cow.vector = 2;
  else if (cow.x > x && cow.y > y) cow.vector = 3;
  else if (cow.x === x && cow.y > y) cow.vector = 5;
  else if (cow.x === x && cow.y < y) cow.vector = 7;
  else if (cow.x < x && cow.y === y) cow.vector = 6;
  else if (cow.x > x && cow.y === y) cow.vector = 8;

  cow.aim = true;
  cow.aimX = x;
  cow.aimY = y;
  cow.distance = 0;
  let target: Iposition = new Phaser.Math.Vector2();
  target.x = x;
  target.y = y;
  let distance: number = Phaser.Math.Distance.Between(cow.x, cow.y, target.x, target.y);
  let coefficient: number = 1;

  if (distance >= 400) {
    coefficient = 0.15;
  } else if (distance < 400 && distance >= 300) {
    coefficient = 0.20;
  } else if (distance < 300 && distance >= 200) {
    coefficient = 0.25;
  } else if (distance < 200 && distance >= 100) {
    coefficient = 0.5;
  }

  this.physics.moveToObject(cow, target, distance * coefficient);

}


// функция получения новой коровы
function getCow(
  id: string,
  type: number,
  x: number,
  y: number,
  counter: number = 0,
  egg: number = 0,
  diamond: number = 0,
  vector: number = 7,
  load: boolean = false): void {

  let cow = this.cow.create(x, y, 'cow' + type).setInteractive().setDepth(y);
  cow.setCollideWorldBounds(true);
  this.input.setDraggable(cow); // задали перетаскивание
  cow.moving = false; // движение
  cow.vector = vector; // вектор движения
  cow.counter = counter; // счетчик
  cow.aim = false; // цель движения
  cow.aimX = 0; // точка X цели
  cow.aimY = 0; // точка Y цели
  cow.distance = 0; // дистанция для целей
  cow.drag = false; // метка перетаскивания
  cow.body.onWorldBounds = true; // отскок от границ мира
  cow.collision = 1; // временно врубаем счетчик коллизии
  cow.body.mass = 0; // вроде как инерция
  cow.changeVector = false; // метка смены вектора
  cow.merging = false; // метка коровы в мерджинге
  cow.type = type; // порода коровы
  cow.egg = egg; // зарождение яйца
  cow._id = id; // id
  cow.diamond = diamond; // счетчик кристаллов для кристаллическлй коровы.
  cow.expel = false; // метка изгнания
  cow.spread = false;

  // this.click(cow, (): void => {

  //   let modal: Imodal = {
  //     type: 1,
  //     sysType: 1
  //   }
  //   this.state.modal = modal;
  //   this.state.animal = cow;
  //   this.scene.launch('Modal', this.state);

  // });
  
  if (type === 0) this.firework250(x, y);

  return cow;

}


// переместить яйцо в хранилище
function getEgg(data: IcowEgg): void {

  let egg = this.eggs.create(data.x, data.y, 'cow-egg' + data.type);
  egg.setDepth(data.y);
  egg.type = data.type;
  egg._id = data._id;
  egg.click = true;
  egg.distance = 0;
  egg.timeout = 0;

  this.click(egg, (): void => {

    if (egg.click) {

      let manualСollect: boolean = false;

      if (egg.type !== 0) manualСollect = true;

      this.collectEgg(egg, manualСollect);

    }
    
  });

}


// мерджинг
function checkMerging(territory: any, cow: any, position: string) {

  cow.merging = true;
  territory.mergingCounter = 1;
  let check = territory.merging.find((data: any) => data._id === cow._id);

  if (check === undefined) {

    // если на этой позиции уже стоит корова
    if (territory.merging.length === 1 && territory.merging[0].position === position) {

      if (position === 'left') position = 'right';
      else if (position === 'right') position = 'left';

    }

    // запоминаем
    territory.merging.push({
      _id: cow._id,
      type: cow.type,
      position: position
    });

    // ставим коров на парковку
    if (position === 'left') {

      cow.anims.play('cow-stay-right' + cow.type, true);
      cow.y = territory.y + 120;
      cow.x = territory.x + 70;
      cow.vector = 6;

    } else if (position === 'right') {

      cow.anims.play('cow-stay-left' + cow.type, true);
      cow.y = territory.y + 120;
      cow.x = territory.x + 170;
      cow.vector = 8;

    }

  } else {

    if (check.position === 'left' && position === 'right') check.position = 'right';
    if (check.position === 'right' && position === 'left') check.position = 'left';

    // обновляем положение парковки
    if (position === 'left') {

      cow.anims.play('cow-stay-right' + cow.type, true);
      cow.y = territory.y + 120;
      cow.x = territory.x + 70;
      cow.vector = 6;

    } else if (position === 'right') {

      cow.anims.play('cow-stay-left' + cow.type, true);
      cow.y = territory.y + 120;
      cow.x = territory.x + 170;
      cow.vector = 8;

    }

  }

  // проверяем успешный на мерджинг
  if (territory.merging.length === 2) {

    let cow1 = this.cow.children.entries.find((data: any) => data._id === territory.merging[0]._id);
    let cow2 = this.cow.children.entries.find((data: any) => data._id === territory.merging[1]._id);

    if (cow1?.type === cow2?.type) {
      
      this.time.addEvent({ delay: 100, callback: (): void => {

        let position: Iposition = {
          x: territory.x + 120,
          y: territory.y + 120
        }
        this.mergingCloud(position);
        let type: number = cow1.type + 1;
        cow1.destroy();
        cow2.destroy();
        let id: string = 'local_' + randomString(18);
        let x: number = territory.x + 120;
        let y: number = territory.y + 240;
        let cow = this.getCow(id, type, x, y, 0, 0);
        let aimX: number = random(territory.x + 40, territory.x + 200);
        let aimY: number = random(territory.y + 280, territory.y + 440);
        this.aim(cow, aimX, aimY);
        this.tryTask(2, type);
        this.tryTask(4, type);
        this.checkAnimalTask();

      }, callbackScope: this, loop: false });

      territory.merging = [];

    } else {

      if (cow1 && cow2) {

        this.createSpeechBubble(this.state.lang.mergingMessageBreed);
        this.cancelMerging(territory, cow1, cow2);

      } else {
        
        // костыль
        for (let i in this.cow.children.entries) this.cow.children.entries[i].merging = false;
        if (cow1) this.teleportation(cow2);
        if (cow2) this.teleportation(cow2);
        territory.merging = [];

      }

    }


  }
  
}


// отмена мерджинга
function cancelMerging(territory: any, cow1: any, cow2: any) {

  this.time.addEvent({ delay: 100, callback: (): void => {

    if (cow1) {

      cow1.merging = false;
      let randomX: number = random(territory.x + 40, territory.x + 200);
      let randomY: number = random(territory.y + 280, territory.y + 440);
      this.aim(cow1, randomX, randomY);

    }

    if (cow2) {

      cow2.merging = false;
      let randomX: number = random(territory.x + 40, territory.x + 200);
      let randomY: number = random(territory.y + 280, territory.y + 440);
      this.aim(cow2, randomX, randomY);

    }

    for (let i in territory.merging) {

      let cow = this.cow.children.entries.find((data: any) => data._id === territory.merging[i]._id);
      let randomX: number = random(territory.x + 40, territory.x + 200);
      let randomY: number = random(territory.y + 280, territory.y + 440);
      this.aim(cow, randomX, randomY);
      cow.mergin = false;

    }
    
    territory.merging = [];
    territory.mergingCounter = 0;

  }, callbackScope: this, loop: false });
  
}


// покупка коровы
function buyCow(breed: number, shop: boolean = false): boolean {

  let success: boolean = false;

  if (this.cow.children.entries.length < 50) {

    let cowPrice = this.cowPrice(breed);

    if (this.state.userCow.money >= cowPrice.price) {
      
      success = true;
      let x: number = random(530, 660);
      let y: number = random(530, 540);
      let id: string = 'local_' + randomString(18);
      this.getCow(id, breed, x, y);
      this.state.userCow.money -= cowPrice.price;
      this.state.userCow.countCow = cowPrice.countCow;
      this.game.scene.keys['CowBars'].updateCowPrice();
      this.tryTask(1, breed);
      this.tryTask(4, breed);
      this.checkAnimalTask();

    } else {

      if (shop) {
        this.scene.stop('Shop');
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');
      }

      let count: number = cowPrice.price - this.state.userCow.money;
      let diamonds: number = this.convertMoney(count);
      this.state.convertor = {
        fun: 1,
        count: count,
        diamonds: diamonds,
        type: 1,
        breed: breed
      }

      let modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    }
  
  } else {

    if (shop) {
      this.scene.stop('Shop');
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');
    }

    let modal: Imodal = {
      type: 1,
      sysType: 3,
      height: 150,
      message: this.state.lang.maxCowCount
    }
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);

  }

  return success;

}


// собиратель яиц
function collectEgg(egg: any, manualСollect: boolean = false): void {

  let path: Iposition;
  let length: number;
  let repository: any = false;

  if (egg.type !== 0) {

    if (manualСollect) {

      let price: number = this.state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === egg.type).eggPrice;
      if (this.state.userCow.feedBoostTime > 0) price *= this.feedBoostMultiplier; // если бустер комбикорм активен
      this.state.userCow.money += price;
      egg.destroy();

      this.game.scene.keys['CowBars'].plusMoneyAnimation({
        x: egg.x,
        y: egg.y - 50
      });

      this.tryTask(11, 0);

    } else {

      for (let i in this.territories.children.entries) {

        let territory = this.territories.children.entries[i];

        if (territory.type === 5) {
          
          let max: number = this.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === territory.improve).eggStorage;

          if (max > territory.volume) {

            let position: Iposition = {
              x: territory.x + 120,
              y: territory.y + 120
            }
            let distance: number = Phaser.Math.Distance.Between(egg.x, egg.y, position.x, position.y);
            
            if (length === undefined || distance < length) {

              length = distance;
              path = position;
              repository = territory;

            }

          }

        }

      }

      if (length) {

        length *= 3;
        let price: number = this.state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === egg.type).eggPrice;
        if (this.state.userCow.feedBoostTime > 0) price *= this.feedBoostMultiplier; // если бустер комбикорм активен
        egg.click = false;
        repository.volume++;
        repository.money += price;
        let target = new Phaser.Math.Vector2();
        egg.distance = length;
        target.x = path.x;
        target.y = path.y;
        egg.target = path;
        this.physics.moveToObject(egg, target, length);

      } // else console.log('have not space for eggs');

    }

  } else {

    let position: Iposition = {
      x: egg.x,
      y: egg.y
    }

    this.state.amplitude.getInstance().logEvent('diamonds_get', {
      type: 'diamond_animal',
      count: 1,
      farm_id: this.state.farm
    });

    this.game.scene.keys['CowBars'].plusDiamondsAnimation(position);
    this.state.user.diamonds++;
    egg.destroy();
    this.tryTask(19, 0);

  }

}


// продать яйца из хранилища
function sellEggs(): void {

  if (this.state.territory) {

    if (this.state.territory.type === 5 && this.state.territory.money > 0) {

      this.tryTask(20, 0);

      this.state.userCow.money += this.state.territory.money;
      this.state.territory.money = 0;
      this.state.territory.volume = 0;
      
      this.game.scene.keys['CowBars'].plusMoneyAnimation({
        x: this.state.territory.x + 120,
        y: this.state.territory.y + 120
      });

    }

  }

}


// полет яиц
function eggsFly(): void {

  for (let i in this.eggs.children.entries) {

    let egg = this.eggs.children.entries[i];

    if (egg.body.speed > 0) {

      egg.setDepth(egg.y + 100);
      let distance = Phaser.Math.Distance.Between(egg.x, egg.y, egg.target.x, egg.target.y) * 3;

      if (egg.x < 0 ||
        egg.x > 720 ||
        egg.y < 0 ||
        (distance > egg.distance && egg.distance > 0) ||
        distance < 100) {
        
        egg.destroy();
        
      } else egg.distance = distance;

    }

  }
  
}


// подтверждение продажи коровы
function confirmExpelCow(): void {

  let modal: Imodal = {
    type: 1,
    sysType: 6
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}


// продажа коровы
function expelCow(): void {

  this.state.animal.destroy();

}


// мерджинг на поле
function dragCowMerging(cow: any): void {
  
  let max: number = this.state.cowSettings.cowSettings.length;
  let findCow: any = this.cow.children.entries.find((data: any) => {

    if (data.x - (data.width / 2) <= cow.x && data.x + (data.width / 2) >= cow.x &&
      data.y - (data.height / 2) <= cow.y && data.y + (data.height / 2) >= cow.y &&
      data.type === cow.type &&
      cow.type > 0 &&
      cow.type < max &&
      data._id !== cow._id &&
      this.state.userCow.tutorial >= 0 &&
      this.state.userCow.fair >= cow.type) {

      return data;

    } else return false;

  });

  if (findCow) {

    const position: Iposition = {
      x: cow.x,
      y: cow.y
    }
    this.mergingCloud(position);
    
    const type: number = cow.type + 1;

    findCow.destroy();
    cow.destroy();

    const id: string = 'local_' + randomString(18);
    
    this.getCow(id, type, position.x, position.y, 0, 0);

    this.tryTask(2, type);
    this.tryTask(4, type);
    this.checkAnimalTask();

  }

}


export {
  teleportation,
  reverse,
  aim,
  getCow,
  getEgg,
  checkMerging,
  cancelMerging,
  buyCow,
  collectEgg,
  sellEggs,
  eggsFly,
  confirmExpelCow,
  expelCow,
  dragCowMerging
}
