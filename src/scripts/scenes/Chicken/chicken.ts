import { random, randomString } from '../../general/basic';
import Firework from '../../components/animations/Firework';
import MergingCloud from '../../components/animations/MergingCloud';
import Egg from '../../components/Resource/Egg';
import SpeechBubble from '../../components/animations/SpeechBuble';

// телепортация куриц на свободные территории
function teleportation(chicken: any): void {

  let territories = [];

  // берем только нужные территории
  for (let i in this.territories.children.entries) {

    if (this.territories.children.entries[i].territoryType === 2 || this.territories.children.entries[i].territoryType === 3) {
      territories.push({
        _id: this.territories.children.entries[i]._id,
        block: this.territories.children.entries[i].block,
        position: this.territories.children.entries[i].position,
        count: 0
      });
    }

  }
  
  // смотрим, где какая курица сидит
  for (let i in this.chicken.children.entries) {

    let c = this.chicken.children.entries[i];
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
  
  let halfWidth: number = Math.ceil(chicken.width / 2) + 1;
  let halfHeight: number = Math.ceil(chicken.height / 2) + 1;

  let minX: number = (territories[0].position - 1) * this.height + halfWidth;
  let maxX: number = territories[0].position * this.height - halfWidth;

  let mixY: number = (territories[0].block - 1) * this.height + halfHeight + this.topIndent;
  let maxY: number = territories[0].block * this.height - halfHeight + this.topIndent;

  chicken.x = random(minX, maxX);
  chicken.y = random(mixY, maxY);
  chicken.counter = 200;
  chicken.aim = false;
  chicken.aimX = 0;
  chicken.aimY = 0;
  chicken.distance = 0;

}


// функция реверсивного движения курицы
function reverse(chicken: any): void {

  chicken.collision = 1;

  let x: number = random(this.velocity - 5, this.velocity + 5);
  let y: number = random(this.velocity - 5, this.velocity + 5);
  
  chicken.setVelocity(0, 0);
  chicken.body.reset(chicken.x, chicken.y);

  switch(chicken.vector) {
    case 1:
      chicken.vector = 3;
      chicken.setVelocity(-x, -y);
      break;
    case 2:
      chicken.vector = 4;
      chicken.setVelocity(x, -y);
      break;
    case 3:
      chicken.vector = 1;
      chicken.setVelocity(x, y);
      break;
    case 4:
      chicken.vector = 2;
      chicken.setVelocity(-x, y);
      break;
    case 5:
      chicken.vector = 7;
      chicken.setVelocity(0, y);
      break;
    case 6:
      chicken.vector = 8;
      chicken.setVelocity(-x, 0);
      break;
    case 7:
      chicken.vector = 5;
      chicken.setVelocity(0, -y);
      break;
    case 8:
      chicken.vector = 6;
      chicken.setVelocity(x, 0);
      break;
  }

}


// функция получения цели для точки движения курицы
function aim(chicken: any, x: number, y: number): void {

  if (chicken.x < x && chicken.y > y) chicken.vector = 4;
  else if (chicken.x < x && chicken.y < y) chicken.vector = 1;
  else if (chicken.x > x && chicken.y < y) chicken.vector = 2;
  else if (chicken.x > x && chicken.y > y) chicken.vector = 3;
  else if (chicken.x === x && chicken.y > y) chicken.vector = 5;
  else if (chicken.x === x && chicken.y < y) chicken.vector = 7;
  else if (chicken.x < x && chicken.y === y) chicken.vector = 6;
  else if (chicken.x > x && chicken.y === y) chicken.vector = 8;

  chicken.aim = true;
  chicken.aimX = x;
  chicken.aimY = y;
  chicken.distance = 0;
  let target: Iposition = new Phaser.Math.Vector2();
  target.x = x;
  target.y = y;
  let distance: number = Phaser.Math.Distance.Between(chicken.x, chicken.y, target.x, target.y);
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

  this.physics.moveToObject(chicken, target, distance * coefficient);

}


// функция получения новой курицы
function getChicken(
  id: string,
  type: number,
  x: number,
  y: number,
  counter: number = 0,
  egg: number = 0,
  diamond: number = 0,
  vector: number = 7,
  anim: boolean = true): void {

  if (type > this.state.chickenSettings.chickenSettings.length) {
    type = this.state.chickenSettings.chickenSettings.length;
  }

  let chicken = this.chicken.create(x, y, 'chicken' + type).setInteractive().setDepth(y);
  chicken.setCollideWorldBounds(true);
  this.input.setDraggable(chicken); // задали перетаскивание
  chicken.moving = false; // движение
  chicken.vector = vector; // вектор движения
  chicken.counter = counter; // счетчик
  chicken.aim = false; // цель движения
  chicken.aimX = 0; // точка X цели
  chicken.aimY = 0; // точка Y цели
  chicken.distance = 0; // дистанция для целей
  chicken.drag = false; // метка перетаскивания
  chicken.body.onWorldBounds = true; // отскок от границ мира
  chicken.collision = 1; // временно врубаем счетчик коллизии
  chicken.body.mass = 0; // вроде как инерция
  chicken.changeVector = false; // метка смены вектора
  chicken.merging = false; // метка курицы в мерджинге
  chicken.type = type; // порода курицы
  chicken.egg = egg; // зарождение яйца
  chicken._id = id; // id
  chicken.diamond = diamond; // счетчик кристаллов для кристаллическлй курицы.
  chicken.expel = false; // метка изгнания
  chicken.spread = false;

  // this.click(chicken, (): void => {

  //   let modal: Imodal = {
  //     type: 1,
  //     sysType: 1
  //   }
  //   this.state.modal = modal;
  //   this.state.animal = chicken;
  //   this.scene.launch('Modal', this.state);

  // });
  
  if (anim) Firework.create(this, { x, y }, 1);

  return chicken;

}

// мерджинг
function checkMerging(territory: any, chicken: any, position: string) {

  chicken.merging = true;
  territory.mergingCounter = 1;
  let check = territory.merging.find((data: any) => data._id === chicken._id);

  if (check === undefined) {

    // если на этой позиции уже стоит курица
    if (territory.merging.length === 1 && territory.merging[0].position === position) {

      if (position === 'left') position = 'right';
      else if (position === 'right') position = 'left';

    }

    // запоминаем
    territory.merging.push({
      _id: chicken._id,
      type: chicken.type,
      position: position
    });

    // ставим кур на парковку
    if (position === 'left') {

      chicken.anims.play('chicken-stay-right' + chicken.type, true);
      chicken.y = territory.y + 120;
      chicken.x = territory.x + 70;
      chicken.vector = 6;

    } else if (position === 'right') {

      chicken.anims.play('chicken-stay-left' + chicken.type, true);
      chicken.y = territory.y + 120;
      chicken.x = territory.x + 170;
      chicken.vector = 8;

    }

  } else {

    if (check.position === 'left' && position === 'right') check.position = 'right';
    if (check.position === 'right' && position === 'left') check.position = 'left';

    // обновляем положение парковки
    if (position === 'left') {

      chicken.anims.play('chicken-stay-right' + chicken.type, true);
      chicken.y = territory.y + 120;
      chicken.x = territory.x + 70;
      chicken.vector = 6;

    } else if (position === 'right') {

      chicken.anims.play('chicken-stay-left' + chicken.type, true);
      chicken.y = territory.y + 120;
      chicken.x = territory.x + 170;
      chicken.vector = 8;

    }

  }

  // проверяем успешный на мерджинг
  if (territory.merging.length === 2) {

    let chicken1 = this.chicken.children.entries.find((data: any) => data._id === territory.merging[0]._id);
    let chicken2 = this.chicken.children.entries.find((data: any) => data._id === territory.merging[1]._id);

    if (chicken1?.type === chicken2?.type) {
      
      this.time.addEvent({ delay: 100, callback: (): void => {

        let position: Iposition = {
          x: territory.x + 120,
          y: territory.y + 120
        }
        MergingCloud.create(this, position);
        let type: number = chicken1.type + 1;
        chicken1.destroy();
        chicken2.destroy();
        let id: string = 'local_' + randomString(18);
        let x: number = territory.x + 120;
        let y: number = territory.y + 240;
        let chicken = this.getChicken(id, type, x, y, 0, 0, 0, 7, false);
        let aimX: number = random(territory.x + 40, territory.x + 200);
        let aimY: number = random(territory.y + 280, territory.y + 440);
        this.aim(chicken, aimX, aimY);
        this.tryTask(2, type);
        this.tryTask(4, type);
        this.tryClanTask(5);
        this.checkAnimalTask();

      }, callbackScope: this, loop: false });

      territory.merging = [];

    } else {

      if (chicken1 && chicken2) {
        SpeechBubble.create(this, this.state.lang.mergingMessageBreed, 1);
        this.cancelMerging(territory, chicken1, chicken2);

      } else {
        
        // костыль
        for (let i in this.chicken.children.entries) this.chicken.children.entries[i].merging = false;
        if (chicken1) this.teleportation(chicken2);
        if (chicken2) this.teleportation(chicken2);
        territory.merging = [];

      }

    }


  }
  
}


// отмена мерджинга
function cancelMerging(territory: any, chicken1: any, chicken2: any) {

  this.time.addEvent({ delay: 100, callback: (): void => {

    if (chicken1) {

      chicken1.merging = false;
      let randomX: number = random(territory.x + 40, territory.x + 200);
      let randomY: number = random(territory.y + 280, territory.y + 440);
      this.aim(chicken1, randomX, randomY);

    }

    if (chicken2) {

      chicken2.merging = false;
      let randomX: number = random(territory.x + 40, territory.x + 200);
      let randomY: number = random(territory.y + 280, territory.y + 440);
      this.aim(chicken2, randomX, randomY);

    }

    for (let i in territory.merging) {

      let chicken = this.chicken.children.entries.find((data: any) => data._id === territory.merging[i]._id);
      let randomX: number = random(territory.x + 40, territory.x + 200);
      let randomY: number = random(territory.y + 280, territory.y + 440);
      this.aim(chicken, randomX, randomY);
      chicken.mergin = false;

    }
    
    territory.merging = [];
    territory.mergingCounter = 0;

  }, callbackScope: this, loop: false });
  
}


// покупка курицы
function buyChicken(breed: number, shop: boolean = false): boolean {

  const checkSale = (saleName: string): boolean => {
    return this.state.sales.some((el: Isale) => el.type === saleName && el.startTime <= 0 && el.endTime > 0); 
  }

  let success: boolean = false;

  if (this.chicken.children.entries.length < 50) {

    let chickenPrice = this.chickenPrice(breed);
    if (checkSale(`${this.state.farm.toUpperCase()}_PRICE`)) chickenPrice.price = Math.round(chickenPrice.price / 2);

    if (this.state.userChicken.money >= chickenPrice.price) {
      
      success = true;
      let x: number = random(530, 660);
      let y: number = random(530, 540);

      if (this.scrolling.scrollY > 350) {
        const position: Iposition = this.findFreeTerritory(600, this.height + this.scrolling.scrollY + 250);
        if (position) {
          x = Phaser.Math.Between(position.x - 50, position.x + 50);
          y = Phaser.Math.Between(position.y - 10, position.y + 10);
        }
      }
      let id: string = 'local_' + randomString(18);
      this.getChicken(id, breed, x, y);
      this.state.userChicken.money -= chickenPrice.price;
      this.state.userChicken.countChicken = chickenPrice.countChicken;
      this.game.scene.keys['ChickenBars'].updateAnimalPrice();
      this.tryTask(1, breed);
      this.tryClanTask(1);
      this.tryTask(4, breed);
      this.checkAnimalTask();

    } else {

      if (shop) {
        this.scene.stop('Shop');
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');
      }

      let count: number = chickenPrice.price - this.state.userChicken.money;
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
      message: this.state.lang.maxChickenCount
    }
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);
    this.achievement.tryId(8);

  }

  return success;

}


// собиратель яиц
function collectEgg(egg: Egg, manualСollect: boolean = false, anim: boolean = true): void {
  let path: Iposition;
  let length: number;
  let repository: any = false;
  if (egg.animalType !== 0) {

    if (manualСollect) {
      let price: number = this.state.chickenSettings.chickenSettings.find((data: IchickenPoints) => data.breed === egg.animalType).eggPrice;
      if (this.state.userChicken.feedBoostTime > 0) price *= this.feedBoostMultiplier; // если бустер комбикорм активен
      if (this.state.clan) {
        const multiply: number = this.state.clan.chicken.cooldown > 0 ? 1 + ((this.state.clan.chicken.level - 1) / 100) : 1 + (this.state.clan.chicken.level / 100);
        price *= multiply;
      }
      this.state.userChicken.money += price;
      egg.destroy();
      if (anim) this.game.scene.keys['ChickenBars'].getCurrency({
        x: egg.x,
        y: egg.y - 50
      }, 3, 'chickenCoin');
      this.tryTask(11, 0);
      this.tryClanTask(4);
    } else {
      for (let i in this.territories.children.entries) {
        const territory = this.territories.children.entries[i];
        if (territory.territoryType === 5) {
          const max: number = this.state.chickenSettings.territoriesChickenSettings.find((data: IterritoriesChickenSettings) => data.improve === territory.improve).storage;

          if (max > territory.volume) {
            const position: Iposition = {
              x: territory.x + 120,
              y: territory.y + 120
            };
            const distance: number = Phaser.Math.Distance.Between(egg.x, egg.y, position.x, position.y);
            
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
        let price: number = this.state.chickenSettings.chickenSettings.find((data: IchickenPoints) => data.breed === egg.animalType).eggPrice;
        if (this.state.userChicken.feedBoostTime > 0) price *= this.feedBoostMultiplier; // если бустер комбикорм активен
        if (this.state.clan) {
          const multiply: number = this.state.clan.chicken.cooldown > 0 ? 1 + ((this.state.clan.chicken.level - 1) / 100) : 1 + (this.state.clan.chicken.level / 100);
          price *= multiply;
        }
        
        repository.volume++;
        repository.money += price;
        egg.flyToPoint(path);
      }

    }
  } else {
    const position: Iposition = {
      x: egg.x,
      y: egg.y
    };

    this.state.amplitude.logAmplitudeEvent('diamonds_get', {
      type: 'diamond_animal',
      count: 1,
    });

    this.game.scene.keys['ChickenBars'].getCurrency(position, 1, 'diamond');
    this.state.user.diamonds++;
    egg.destroy();
    this.tryTask(19, 0);
    this.tryClanTask(15);
  }
}


// продать яйца из хранилища
function sellEggs(): void {
  if (this.state.territory) {
    if (this.state.territory.territoryType === 5 && this.state.territory.money > 0) {
      this.tryTask(20, 0);
      this.tryClanTask(2);

      this.state.userChicken.money += this.state.territory.money;
      this.state.territory.money = 0;
      this.state.territory.volume = 0;
      
      this.game.scene.keys['ChickenBars'].plusMoneyAnimation({
        x: this.state.territory.x + 120,
        y: this.state.territory.y + 120
      });
      this.autosave();
    }
  }
}

// подтверждение продажи курицы
function confirmExpelChicken(): void {

  let modal: Imodal = {
    type: 1,
    sysType: 6
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}



// мерджинг на поле
function dragChickenMerging(chicken: any): void {
  
  let max: number = this.state.chickenSettings.chickenSettings.length;
  let findChicken: any = this.chicken.children.entries.find((data: any) => {

    if (data.x - (data.width / 2) <= chicken.x && data.x + (data.width / 2) >= chicken.x &&
      data.y - (data.height / 2) <= chicken.y && data.y + (data.height / 2) >= chicken.y &&
      data.type === chicken.type &&
      chicken.type > 0 &&
      chicken.type < max &&
      data._id !== chicken._id &&
      this.state.userChicken.tutorial >= 0 &&
      this.state.userChicken.fair >= chicken.type) {

      return data;

    } else return false;

  });

  if (findChicken) {

    const position: Iposition = {
      x: chicken.x,
      y: chicken.y
    }
    MergingCloud.create(this, position);
    
    const type: number = chicken.type + 1;

    findChicken.destroy();
    chicken.destroy();

    const id: string = 'local_' + randomString(18);
    
    this.getChicken(id, type, position.x, position.y, 0, 0, 0, 7, false);

    this.tryTask(2, type);
    this.tryTask(4, type);
    this.tryClanTask(5);
    this.checkAnimalTask();

  }

}


export {
  teleportation,
  reverse,
  aim,
  getChicken,
  checkMerging,
  cancelMerging,
  buyChicken,
  collectEgg,
  sellEggs,
  confirmExpelChicken,
  dragChickenMerging
}
