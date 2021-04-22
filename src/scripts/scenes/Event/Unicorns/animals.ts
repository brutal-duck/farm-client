import { random, randomString } from '../../../general/basic';
import MergingCloud from '../../../components/animations/MergingCloud';
import BigInteger from '../../../libs/BigInteger';
import Currency from './../../../components/animations/Currency';

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
  animal.data.values.moving = true;
  this.physics.moveToObject(animal, target, distance * coefficient);

}

// функция получения нового животного
function getAnimal(
  id: string,
  type: number,
  x: number,
  y: number,
  activeAnimal: IactiveEventAnimal = undefined,
  load: boolean = false): Phaser.Physics.Arcade.Sprite {

  let animal: Phaser.Physics.Arcade.Sprite = this.animals.create(x, y, 'animal' + type).setInteractive().setDepth(y).setAlpha(0.55).setTint(0xFFFFFF);
  animal.setCollideWorldBounds(true);
  animal.setDataEnabled();
  this.input.setDraggable(animal); // задали перетаскивание
  animal.data.values.drag = false; // метка перетаскивания
  animal.data.values.merging = false; // метка курицы в мерджинге
  animal.data.values.oldX = animal.x;
  animal.data.values.oldY = animal.y;
  animal.data.values.type = type; // порода курицы
  animal.data.values._id = id; // id
  animal.data.values.expel = false; // метка изгнания
  animal.data.values.teleport = false; // метка телепорта
  animal.data.values.target = {x, y};
  animal.state = 'base';
  this.checkMerging(animal);
  if (!activeAnimal) {
    animal.data.values.active = this.getActiveAnimal(type,x, y, animal);
  } else {
    animal.data.values.active = this.getActiveAnimal(type, activeAnimal.x, activeAnimal.y, animal, activeAnimal.counter, activeAnimal.vector, activeAnimal.working)
  }
  
  this.click(animal, ()=>{
    if (!animal.data.values.active.data.values.teleport) {
      
      this.teleportation(animal.data.values.active, undefined, true);

    }
  });

  return animal;

}

// функция получения нового животного
function getActiveAnimal(
  type: number,
  x: number,
  y: number,
  base: Phaser.Physics.Arcade.Sprite,
  counter: number = 0,
  vector: number = Phaser.Math.Between(1, 8),
  working: boolean = false,
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
  animal.data.values.working = working;
  animal.data.values.onWorldBounds// отскок от границ мира
  animal.data.values.collision = 1; // временно врубаем счетчик коллизии
  animal.body.mass = 0; // вроде как инерция
  animal.data.values.changeVector = false; // метка смены вектора
  animal.data.values.resource = 0;
  animal.data.values.base = base;
  animal.data.values.teleport = false;
  animal.data.values.topPosition = false;
  animal.data.values.cloud = this.physics.add.sprite(x, y, 'cloud').setVisible(false);
  animal.data.values.goWork = false;
  animal.state = 'active';

  this.doubleClick(animal, ()=> {
    animal.data.values.goWork = true;
    animal.data.values.teleport = true;
    let target: Iposition = new Phaser.Math.Vector2();
    target.x = Phaser.Math.Between(100, 600);
    target.y = Phaser.Math.Between(this.topIndent + 100, this.topIndent + 300);
    animal.data.values.target = target;
    
    let speed: number = Phaser.Math.Distance.Between(animal.x, animal.y, target.x, target.y) * 4;
    
    this.physics.moveToObject(animal, target, speed);
  })
  return animal;
  
}
// выдача ресурса и установка на него слушаетля
function getResource(data: IeventResource): Phaser.Physics.Arcade.Sprite {

  let resource: Phaser.Physics.Arcade.Sprite = this.resources.create(data.x, data.y, 'event-resource');
  resource.setDataEnabled();
  resource.setDepth(data.y);
  resource.data.values.type = data.type;
  resource.data.values._id = data._id;
  resource.data.values.click = true;
  resource.data.values.distance = 0;
  resource.data.values.timeout = 0;
  resource.setAngle(Phaser.Math.Between(0, 360))

  this.click(resource, (): void => {

    if (resource.data.values.click) this.collectResource(resource);

  });
  return resource;
}

function collectResource(resource: Phaser.Physics.Arcade.Sprite): void {
  
  let price: string = this.state.eventSettings.eventSettings.find((data: IeventPoints) => data.breed === resource.data.values.type).resourcePrice;
  if (this.state.userEvent.feedBoostTime > 0) price = BigInteger.multiply(price, this.feedBoostMultiplier);
  resource.data.values.click = false;
  this.state.userEvent.money = BigInteger.add(this.state.userEvent.money, price);
  const startPosition: Iposition = {
    x: resource.x,
    y: resource.y - this.scrolling.scrollY
  }
  const flyResource: Currency = Currency.create(this.game.scene.keys['EventBars'], startPosition, { x: 495, y: 80 }, 'event-resource', 400, 1, true);
  flyResource.sprite.setDepth(-1);
  resource.destroy();
}

// покупка курицы
function buyAnimal(breed: number, shop: boolean = false, diamond: number = 0): boolean {

  let success: boolean = false;

    let animalPrice: { price: string, countAnimal: number } = this.animalPrice(breed);
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

        this.state.amplitude.getInstance().logEvent('diamonds_spent', {
          type: 'buy_unicorn',
          count: diamond,
          farm_id: this.state.farm
        });
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
      
      if (BigInteger.greaterThanOrEqual(this.state.userEvent.money, animalPrice.price)) {

        let {x, y} = this.getFreePosition();
        if (x === null || y === null) return;
        success = true;
        this.currentTerritory(x, y).data.values.animal = breed;
        let id: string = 'local_' + randomString(18);
        this.getAnimal(id, breed, x, y);
        
        this.state.userEvent.money = BigInteger.subtract(this.state.userEvent.money , animalPrice.price);
        this.state.userEvent.countAnimal[breed - 1].counter = animalPrice.countAnimal;
        this.game.scene.keys['EventBars'].updateAnimalPrice();

      } else {
          
          if (shop) {
            this.scene.stop('Shop');
            this.scene.stop('ShopBars');
            this.scene.stop('Modal');
          }
          
          let count: string =  BigInteger.subtract(animalPrice.price, this.state.userEvent.money);
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
  this.currentTerritory(this.state.animal.x, this.state.animal.y).data.values.merging = [];
  this.state.animal.data.values.active?.data.values.cloud.destroy();
  this.state.animal.data.values.active?.destroy();
  this.state.animal.destroy();

}


// мерджинг на в клетках
function checkMerging(animal: Phaser.Physics.Arcade.Sprite): void {

  let territory: Phaser.Physics.Arcade.Sprite;
  let oldTerritory: Phaser.Physics.Arcade.Sprite;

  if (animal.state === 'active') {
    
    territory = this.currentTerritory(animal.x, animal.y);
    let check: any = territory?.data.values.merging.find((data: any) => data._id === animal.data.values.base.data.values._id);
    oldTerritory = this.currentTerritory(animal.data.values.base.x, animal.data.values.base.y);
    
    if (animal.data.values.base.data.values.type > this.state.userEvent.maxLevelAnimal) {
      this.state.userEvent.maxLevelAnimal = animal.data.values.base.data.values.type;
      this.deleteTerritoriesLocks();
      // показать экран нового единорога
      this.getEventRaiting();
      console.log('новый единорог получен!')
    }
    
    if (check === undefined) {
      territory?.data.values.merging.push({
        _id: animal.data.values.base.data.values._id,
        type: animal.data.values.base.data.values.type
      });

    }

    // очистка старой территории
    if (territory?.data.values.merging.length === 1) {
      if (oldTerritory !== undefined && oldTerritory !== territory) {
        this.teleportation(animal);
        let checkOld:any = oldTerritory?.data.values.merging.find((data: any) => data._id === animal.data.values.base.data.values._id);
        
        if (checkOld !== undefined) oldTerritory.data.values.merging = [];
        
      }
    }
  
  } else if (animal.state === 'base') {
    
    territory = this.currentTerritory(animal.x, animal.y);
    let check = territory?.data.values.merging.find((data: any) => data._id === animal.data.values._id);
    oldTerritory = this.currentTerritory(animal.data.values.oldX, animal.data.values.oldY);

    if (animal.data.values.type > this.state.userEvent.maxLevelAnimal) {
      this.state.userEvent.maxLevelAnimal = animal.data.values.type;
      this.deleteTerritoriesLocks();
      // показать экран нового единорога
      this.getEventRaiting();
      console.log('новый единорог получен!')
    }

    if (check === undefined) {
      territory?.data.values.merging.push({
        _id: animal.data.values._id,
        type: animal.data.values.type
      })
    }

    // очистка старой территории
    if (territory?.data.values.merging.length === 1) {
      if (oldTerritory !== undefined && oldTerritory !== territory) {
        this.teleportation(animal);
        let checkOld:any = oldTerritory?.data.values.merging.find((data: any) => data._id === animal.data.values._id);
        
        if (checkOld !== undefined) oldTerritory.data.values.merging = [];
      }
    }
  }

  
  // проверяем совпадение
  if (territory?.data.values.merging.length === 2) {
  
    let animal1: Phaser.Physics.Arcade.Sprite = this.animals.children.entries.find((data: any) => data.data.values._id === territory.data.values.merging[0]._id);
    let animal2: Phaser.Physics.Arcade.Sprite = this.animals.children.entries.find((data: any) => data.data.values._id === territory.data.values.merging[1]._id);

    if (animal1 && animal2) {

      if (animal1?.data.values.type === animal2?.data.values.type) {
        const position: Iposition = {
          x: animal.x,
          y: animal.y
        }
        
        const type: number = animal1.data.values.type + 1;
        const id: string = 'local_' + randomString(18);

        if (type > this.state.eventSettings.eventSettings.length) {
          let modal: Imodal = {
            type: 1,
            sysType: 3,
            height: 150,
            message: this.state.lang.mergingMessageBreedMax
          }
          this.state.modal = modal;
          this.scene.launch('Modal', this.state);
          this.teleportation(animal, undefined, true);
          territory?.data.values.merging.pop();
          return;
        }
        
        if (oldTerritory !== undefined && oldTerritory !== territory) {
          oldTerritory.data.values.merging = [];
        }
        territory.data.values.merging = [];
        this.getAnimal(id, type, position.x, position.y, 0, 0);
        
        this.time.addEvent({ delay: 100, callback: (): void => {
          this.game.scene.keys['EventBars'].updateAnimalPrice();
          MergingCloud.create(this, position);

          animal1?.data.values.active?.data.values.cloud.destroy();
          animal2?.data.values.active?.data.values.cloud.destroy();
          animal1?.data.values.active.destroy();
          animal2?.data.values.active.destroy();
          animal1?.destroy();
          animal2?.destroy();
        }, callbackScope: this, loop: false });
      
      } else {

        this.time.addEvent({ delay: 100, callback: (): void => {
        territory.data.values.merging.shift();
        if (oldTerritory !== undefined && oldTerritory !== territory) {
          oldTerritory.data.values.merging.shift();
        }
        
        
        if (animal.state === 'active') {
          
          if (!animal1.data.values.active.data.values.working) {
            
            this.teleportation(animal2.data.values.active, animal1.data.values.active); 
            
          } else this.teleportation(animal2.data.values.active, animal1);

        } else if (animal.state === 'base') {
          
          if (!animal1.data.values.active.data.values.working && !animal2.data.values.teleport && !animal2.data.values.active.data.values.teleport) {
            this.teleportation(animal2, animal1.data.values.active); 
          } else {
            this.teleportation(animal2, animal1);
          }
        }

        }, callbackScope: this, loop: false });
      }
    }
  }
}


export {

  reverse,
  aim,
  getAnimal,
  getResource,
  buyAnimal,
  confirmExpelAnimal,
  expelAnimal,
  checkMerging,
  collectResource,
  getActiveAnimal,
  
}
