import { random, randomString } from '../../general/basic';

// телепортация животного на старое место
function teleportation(animal: Phaser.Physics.Arcade.Sprite): void {
  if (animal.state === 'active') {
    animal.x = animal.data.values.base.x;
    animal.y = animal.data.values.base.y;
    animal.data.values.drag = false; // убираем метку перетаскивания
    animal.data.values.aim = false;
    animal.setVelocity(0);
    animal.data.values.aimX = 0;
    animal.data.values.aimY = 0;
    animal.data.values.working = false;
    animal.setDepth(animal.data.values.base.y + 100);
  }

  

}

// функция реверсивного движения животного
function reverse(animal: Phaser.Physics.Arcade.Sprite): void {

  animal.data.values.collision = 1;

  let x: number = random(this.velocity - 5, this.velocity + 5);
  let y: number = random(this.velocity - 5, this.velocity + 5);
  
  animal.setVelocity(0, 0);
  animal.body.reset(animal.x, animal.y);

  switch(animal.data.values.vector) {
    case 1:
      animal.data.values.vector = 3;
      animal.setVelocity(-x, -y);
      break;
    case 2:
      animal.data.values.vector = 4;
      animal.setVelocity(x, -y);
      break;
    case 3:
      animal.data.values.vector = 1;
      animal.setVelocity(x, y);
      break;
    case 4:
      animal.data.values.vector = 2;
      animal.setVelocity(-x, y);
      break;
    case 5:
      animal.data.values.vector = 7;
      animal.setVelocity(0, y);
      break;
    case 6:
      animal.data.values.vector = 8;
      animal.setVelocity(-x, 0);
      break;
    case 7:
      animal.data.values.vector = 5;
      animal.setVelocity(0, -y);
      break;
    case 8:
      animal.data.values.vector = 6;
      animal.setVelocity(x, 0);
      break;
  }

}

// функция получения цели для точки движения животного
function aim(animal: Phaser.Physics.Arcade.Sprite, x: number, y: number): void {

  if (animal.x < x && animal.y > y) animal.data.values.vector = 4;
  else if (animal.x < x && animal.y < y) animal.data.values.vector = 1;
  else if (animal.x > x && animal.y < y) animal.data.values.vector = 2;
  else if (animal.x > x && animal.y > y) animal.data.values.vector = 3;
  else if (animal.x === x && animal.y > y) animal.data.values.vector = 5;
  else if (animal.x === x && animal.y < y) animal.data.values.vector = 7;
  else if (animal.x < x && animal.y === y) animal.data.values.vector = 6;
  else if (animal.x > x && animal.y === y) animal.data.values.vector = 8;
  
  animal.data.values.aim = true;
  animal.data.values.aimX = x;
  animal.data.values.aimY = y;
  animal.data.values.distance = 0;
  let target: Iposition = new Phaser.Math.Vector2();
  target.x = x;
  target.y = y;
  let distance: number = Phaser.Math.Distance.Between(animal.x, animal.y, target.x, target.y);
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
  
  this.physics.moveToObject(animal, target, distance * coefficient);

}

// функция получения нового животного
function getAnimal(
  id: string,
  type: number,
  x: number,
  y: number,
  counter: number = 0,
  vector: number = 7,
  load: boolean = false): Phaser.Physics.Arcade.Sprite {

  let animal: Phaser.Physics.Arcade.Sprite = this.animals.create(x, y, 'animal' + type).setInteractive().setDepth(y).setAlpha(0.7);
  animal.setCollideWorldBounds(true);
  animal.setDataEnabled();
  this.input.setDraggable(animal); // задали перетаскивание
  animal.data.values.drag = false; // метка перетаскивания
  animal.data.values.merging = false; // метка курицы в мерджинге
  animal.data.values.type = type; // порода курицы
  animal.data.values._id = id; // id
  animal.data.values.expel = false; // метка изгнания
  animal.state = 'base';
  this.checkMerging(animal);
  animal.data.values.active =  this.getActiveAnimal(id,type,x, y, animal);
 
  return animal;

}

// функция получения нового животного
function getActiveAnimal(
  id: string,
  type: number,
  x: number,
  y: number,
  base: Phaser.Physics.Arcade.Sprite,
  counter: number = 0,
  vector: number = 7,
  load: boolean = false): Phaser.Physics.Arcade.Sprite {

  let animal: Phaser.Physics.Arcade.Sprite = this.physics.add.sprite(x, y, 'animal' + type).setInteractive().setDepth(y+100);
  animal.setCollideWorldBounds(true);
  animal.setDataEnabled();
  this.input.setDraggable(animal); // задали перетаскивание
  animal.data.values.moving = false; // движение
  animal.data.values.vector = vector; // вектор движения
  animal.data.values.counter = counter; // счетчик
  animal.data.values.aim = false; // цель движения
  animal.data.values.aimX = 0; // точка X цели
  animal.data.values.aimY = 0; // точка Y цели
  animal.data.values.distance = 0; // дистанция для целей
  animal.data.values.drag = false; // метка перетаскивания
  animal.data.values.onWorldBounds// отскок от границ мира
  animal.data.values.collision = 1; // временно врубаем счетчик коллизии
  animal.body.mass = 0; // вроде как инерция
  animal.data.values.changeVector = false; // метка смены вектора
  animal.data.values.resource = 0;
  animal.data.values.base = base;
  animal.state = 'active';
  

  return animal;

}
// выдача ресурса и установка на него слушаетля
function getResource(data: IeventResource): void {

  let resource: Phaser.Physics.Arcade.Sprite = this.resources.create(data.x, data.y, 'event-resource' + data.type);
  resource.setDepth(data.y);
  resource.setDataEnabled();
  resource.data.values.type = data.type;
  resource.data.values._id = data._id;
  resource.data.values.click = true;
  resource.data.values.distance = 0;
  resource.data.values.timeout = 0;

  this.click(resource, (): void => {

    if (resource.data.values.click) this.collectResource(resource);

  });
}

function collectResource(resource: Phaser.Physics.Arcade.Sprite): void {

  let end: Iposition = {
    x: 720,
    y: 0
  }
  
  let price: number = this.state.eventSettings.eventSettings.find((data: IeventPoints) => data.breed === resource.data.values.type).resourcePrice;
  
  resource.data.values.click = false;
  this.state.userEvent.money += price;
  let target = new Phaser.Math.Vector2();
  resource.data.values.distance = Phaser.Math.Distance.Between(resource.x, resource.y, end.x, end.y);
  
  target.x = end.x;
  target.y = end.y;
  resource.data.values.target = end;
  this.physics.moveToObject(resource, target, 100);

}

// покупка курицы
function buyAnimal(breed: number, shop: boolean = false, diamond: number = 0): boolean {

  let success: boolean = false;

    let animalPrice = this.animalPrice(breed);
    if (diamond > 0) {
      if (this.state.user.diamonds >= diamond) {
        success = true;
        let {x, y} = this.getFreePosition();
        if (x === null || y === null) return;
        this.currentTerritory(x, y).data.values.animal = breed;
        let id: string = 'local_' + randomString(18);
        this.getAnimal(id, breed, x, y);
        this.state.user.diamonds -= diamond;
        this.state.userEvent.countAnimal[breed - 1].counter = animalPrice.countAnimal;
      } else {
        if (shop) {
          this.scene.stop('Shop');
          this.scene.stop('ShopBars');
          this.scene.stop('Modal');
        }
        this.state.convertor = {
          fun: 0,
          count: diamond - this.state.user.diamonds,
          diamonds: diamond - this.state.user.diamonds,
          type: 1
        }
  
        this.game.scene.keys[this.state.farm].exchange();
      }

    } else {
      
      if (this.state.userEvent.money >= animalPrice.price) {

        let {x, y} = this.getFreePosition();
        if (x === null || y === null) return;
        success = true;
        this.currentTerritory(x, y).data.values.animal = breed;
        let id: string = 'local_' + randomString(18);
        this.getAnimal(id, breed, x, y);
        this.state.userEvent.money -= animalPrice.price;
        this.state.userEvent.countAnimal[breed - 1].counter = animalPrice.countAnimal;
        this.game.scene.keys['EventBars'].updateAnimalPrice();

      } else {
          
          if (shop) {
            this.scene.stop('Shop');
            this.scene.stop('ShopBars');
            this.scene.stop('Modal');
          }

          let count: number = animalPrice.price - this.state.userEvent.money;
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
    }

  return success;

}

// собиратель яиц

// полет яиц
function resourcesFly(): void {

  for (let i in this.resources.children.entries) {

    let resource: any = this.resources.children.entries[i];

    if (resource.body.speed > 0) {

      resource.setDepth(resource.y + 100);
      let distance = Phaser.Math.Distance.Between(resource.x, resource.y, resource.data.values.target.x, resource.data.values.target.y) * 3;

      if (resource.x < 0 ||
        resource.x > 720 ||
        resource.y < 0 ||
        (distance > resource.data.values.distance && resource.data.values.distance > 0) ||
        distance < 100) {
        
          resource.destroy();
        
      } else resource.data.values.type.distance = distance;

    }

  }
  
}


// подтверждение продажи курицы
function confirmExpelAnimal(): void {

  let modal: Imodal = {
    type: 1,
    sysType: 6
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}


// продажа курочки
function expelAnimal(): void {

  this.state.animal.destroy();

}


// мерджинг на в клетках
function checkMerging(animal: Phaser.Physics.Arcade.Sprite): void {
  
  if (animal.state === 'active') {
    
    animal.data.values.base.data.values.merging = true;
    
    let territory: Phaser.Physics.Arcade.Sprite = this.currentTerritory(animal.x, animal.y);
    let check = territory?.data.values.merging.find((data: any) => data._id === animal.data.values.base.data.values._id);
    let oldTerritory: Phaser.Physics.Arcade.Sprite = this.currentTerritory(animal.data.values.base.x, animal.data.values.base.y);
    
    if (animal.data.values.base.data.values.type > this.state.userEvent.maxLevelAnimal) {
      this.state.userEvent.maxLevelAnimal = animal.data.values.base.data.values.type;
      this.deleteTerritoriesLocks();
      // показать экран нового единорога
    }
  
    if (check === undefined) {
      territory?.data.values.merging.push({
        _id: animal.data.values.base.data.values._id,
        type: animal.data.values.base.data.values.type
      })
    }
    
    // очистка старой территории
    if (territory?.data.values.merging.length === 1) {
      if (oldTerritory !== undefined && oldTerritory !== territory) {
        oldTerritory.data.values.merging = [];
        animal.data.values.base.x = animal.x;
        animal.data.values.base.y = animal.y;
        animal.data.values.base.setDepth(animal.y);
        console.log(oldTerritory)
      }
    }
  
    // проверяем совпадение
    if (territory?.data.values.merging.length === 2) {
  
      let animal1: Phaser.Physics.Arcade.Sprite = this.animals.children.entries.find((data: any) => data.data.values._id === territory.data.values.merging[0]._id);
      let animal2: Phaser.Physics.Arcade.Sprite = this.animals.children.entries.find((data: any) => data.data.values._id === territory.data.values.merging[1]._id);
      
      if (animal1 && animal2) {
        if (animal1?.data.values.type === animal2?.data.values.type && !animal1.data.values.working) {
          const position: Iposition = {
            x: animal.x,
            y: animal.y
          }
          
          const type: number = animal1.data.values.type + 1;
          const id: string = 'local_' + randomString(18);
          
          oldTerritory.data.values.merging = [];
          territory.data.values.merging = [];
          this.getAnimal(id, type, position.x, position.y, 0, 0);
          
          this.time.addEvent({ delay: 100, callback: (): void => {
            
            this.mergingCloud(position);
            animal1?.destroy();
            animal2?.destroy();
          }, callbackScope: this, loop: false });
        
        } else {
  
          this.time.addEvent({ delay: 100, callback: (): void => {
          territory.data.values.merging.pop(); 
          this.teleportation(animal2.data.values.active);
          }, callbackScope: this, loop: false });
        }
      }
    }
  } else if (animal.state === 'base') {

    animal.data.values.merging = true;
    
    let territory: Phaser.Physics.Arcade.Sprite = this.currentTerritory(animal.x, animal.y);
    let check = territory?.data.values.merging.find((data: any) => data._id === animal.data.values._id);
    let oldTerritory: Phaser.Physics.Arcade.Sprite = this.currentTerritory(animal.x, animal.y);
  
    if (animal.data.values.type > this.state.userEvent.maxLevelAnimal) {
      this.state.userEvent.maxLevelAnimal = animal.data.values.type;
      this.deleteTerritoriesLocks();
      // показать экран нового единорога
    }
  
    if (check === undefined) {
      territory?.data.values.merging.push({
        _id: animal.data.values._id,
        type: animal.data.values.type
      })
    }
    
    // очистка старой территории
    if (territory?.data.values.merging.length === 1) {
      if (oldTerritory !== undefined && oldTerritory !== territory) oldTerritory.data.values.merging = [];
    }
  
    // проверяем совпадение
    if (territory?.data.values.merging.length === 2) {
  
      let animal1: Phaser.Physics.Arcade.Sprite = this.animals.children.entries.find((data: any) => data.data.values._id === territory.data.values.merging[0]._id);
      let animal2: Phaser.Physics.Arcade.Sprite = this.animals.children.entries.find((data: any) => data.data.values._id === territory.data.values.merging[1]._id);
      
      if (animal1 && animal2) {
        if (animal1?.data.values.type === animal2?.data.values.type && !animal1.data.values.working) {
          const position: Iposition = {
            x: animal.x,
            y: animal.y
          }
          
          const type: number = animal1.data.values.type + 1;
          const id: string = 'local_' + randomString(18);
          
          oldTerritory.data.values.merging = [];
          territory.data.values.merging = [];
          this.getAnimal(id, type, position.x, position.y, 0, 0);
          
          this.time.addEvent({ delay: 100, callback: (): void => {
            
            this.mergingCloud(position);
            animal1?.destroy();
            animal2?.destroy();
          }, callbackScope: this, loop: false });
        
        } else {
  
          this.time.addEvent({ delay: 100, callback: (): void => {
          territory.data.values.merging.pop(); 
          this.teleportation(animal2.data.values.active);
          }, callbackScope: this, loop: false });
        }
      }
    }
  }
  
}

// мерджинг на поле
function dragAnimalMerging(animal: Phaser.Physics.Arcade.Sprite): void {
  
  let max: number = this.state.eventSettings.eventSettings.length;
  console.log(this.animals)
  let findAnimal: Phaser.Physics.Arcade.Sprite = this.animals.children.entries.find((data: Phaser.Physics.Arcade.Sprite) => {

    if (data.x - (data.width / 2) <= animal.x && 
      data.x + (data.width / 2) >= animal.x &&
      data.y - (data.height / 2) <= animal.y && 
      data.y + (data.height / 2) >= animal.y &&
      data.data.values.type === animal.data.values.type &&
      animal.data.values.type > 0 &&
      animal.data.values.type < max &&
      data.data.values._id !== animal.data.values._id) {

      return data;

    } else return false;

  });

  if (findAnimal) {

    const position: Iposition = {
      x: animal.x,
      y: animal.y
    }
    this.mergingCloud(position);
    
    const type: number = animal.data.values.type + 1;
    findAnimal.data.values.disabledAnimal.destroy();
    animal.data.values.disabledAnimal.destroy();
    findAnimal.destroy();
    
    animal.destroy();

    const id: string = 'local_' + randomString(18);

    this.getAnimal(id, type, position.x, position.y, 0, 0);

  }

}

export {
  teleportation,
  reverse,
  aim,
  getAnimal,
  getResource,
  buyAnimal,
  resourcesFly,
  confirmExpelAnimal,
  expelAnimal,
  checkMerging,
  collectResource,
  dragAnimalMerging,
  getActiveAnimal
  
}
