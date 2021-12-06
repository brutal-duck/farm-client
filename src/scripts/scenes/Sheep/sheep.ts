import { random, randomString } from '../../general/basic';
import Arrow from '../../components/animations/Arrow';
import Firework from '../../components/animations/Firework';
import MergingCloud from '../../components/animations/MergingCloud';
import Wool from '../../components/Resource/Wool';
import SpeechBubble from '../../components/animations/SpeechBuble';
import Utils from './../../libs/Utils';
import SheepTerritory from './../../components/Territories/SheepTerritory';
import { TaskType } from '../../local/tasks/types';


// телепортация овец на свободные территории
function teleportation(sheep: any): void {

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
  
  // смотрим, где какая овца сидит
  for (let i in this.sheep.children.entries) {

    let c = this.sheep.children.entries[i];
    let territory = this.currentTerritory(c.x, c.y);

    if (territory !== undefined) {
      
      territory = territories.find(data => data._id === territory._id);

      if (territory !== undefined) {
        territory.count++;
      }
      
    }
    
  }

  if (territories.length > 0) {

    // сортируем, чтобы взять первую с наименьшим количеством
    territories.sort((x1, x2) => {
      if (x1.count < x2.count) return -1;
      if (x1.count > x2.count) return 1;
      return 0;
    });
    
    let halfWidth: number = Math.ceil(sheep.width / 2) + 1;
    let halfHeight: number = Math.ceil(sheep.height / 2) + 1;

    let minX: number = (territories[0].position - 1) * this.height + halfWidth;
    let maxX: number = territories[0].position * this.height - halfWidth;

    let mixY: number = (territories[0].block - 1) * this.height + halfHeight + this.topIndent;
    let maxY: number = territories[0].block * this.height - halfHeight + this.topIndent;

    sheep.x = random(minX, maxX);
    sheep.y = random(mixY, maxY);
    sheep.counter = 200;
    sheep.aim = false;
    sheep.aimX = 0;
    sheep.aimY = 0;
    sheep.distance = 0;

  } else {
    
    sheep.drag = true;
    sheep.x = 600;
    sheep.y = 600;
    sheep.wool = 0;

  }

}


// функция реверсивного движения животного
function reverse(sheep: any): void {

  sheep.collision = 1;

  let x: number = random(this.velocity - 5, this.velocity + 5);
  let y: number = random(this.velocity - 5, this.velocity + 5);
  
  sheep.setVelocity(0, 0);
  sheep.body.reset(sheep.x, sheep.y);

  switch(sheep.vector) {
    case 1:
      sheep.vector = 3;
      sheep.setVelocity(-x, -y);
      break;
    case 2:
      sheep.vector = 4;
      sheep.setVelocity(x, -y);
      break;
    case 3:
      sheep.vector = 1;
      sheep.setVelocity(x, y);
      break;
    case 4:
      sheep.vector = 2;
      sheep.setVelocity(-x, y);
      break;
    case 5:
      sheep.vector = 7;
      sheep.setVelocity(0, y);
      break;
    case 6:
      sheep.vector = 8;
      sheep.setVelocity(-x, 0);
      break;
    case 7:
      sheep.vector = 5;
      sheep.setVelocity(0, -y);
      break;
    case 8:
      sheep.vector = 6;
      sheep.setVelocity(x, 0);
      break;
  }

}


// функция получения цели для точки движения овцы
function aim(sheep: any, x: number, y: number): void {

  if (sheep.x < x && sheep.y > y) sheep.vector = 4;
  else if (sheep.x < x && sheep.y < y) sheep.vector = 1;
  else if (sheep.x > x && sheep.y < y) sheep.vector = 2;
  else if (sheep.x > x && sheep.y > y) sheep.vector = 3;
  else if (sheep.x === x && sheep.y > y) sheep.vector = 5;
  else if (sheep.x === x && sheep.y < y) sheep.vector = 7;
  else if (sheep.x < x && sheep.y === y) sheep.vector = 6;
  else if (sheep.x > x && sheep.y === y) sheep.vector = 8;

  sheep.aim = true;
  sheep.aimX = x;
  sheep.aimY = y;
  sheep.distance = 0;
  let target: Iposition = new Phaser.Math.Vector2();
  target.x = x;
  target.y = y;
  let distance: number = Phaser.Math.Distance.Between(sheep.x, sheep.y, target.x, target.y);
  let coefficient: number = 1;

  if (distance >= 400) {
    coefficient = 0.075;
  } else if (distance < 400 && distance >= 300) {
    coefficient = 0.10;
  } else if (distance < 300 && distance >= 200) {
    coefficient = 0.13;
  } else if (distance < 200 && distance >= 100) {
    coefficient = 0.25;
  }

  if (this.state.userSheep.tutorial === 20) coefficient = 0.5;

  this.physics.moveToObject(sheep, target, distance * coefficient);

}


// функция получения нового животного
function getSheep(
  id: string,
  type: number,
  x: number,
  y: number,
  counter: number = 0,
  wool: number = 0,
  diamond: number = 0,
  vector: number = 7,
  anim: boolean = true): void {
  if (type > this.state.sheepSettings.sheepSettings.length) {
    type = this.state.sheepSettings.sheepSettings.length;
  }
  
  let sheep = this.sheep.create(x, y, 'sheep' + type)
    .setInteractive()
    .setDepth(y)
    .setCollideWorldBounds(true);
  
  this.input.setDraggable(sheep); // задали перетаскивание
  sheep.moving = false; // движение
  sheep.vector = vector; // вектор движения
  sheep.counter = counter; // счетчик
  sheep.aim = false; // цель движения
  sheep.aimX = 0; // точка X цели
  sheep.aimY = 0; // точка Y цели
  sheep.distance = 0; // дистанция для целей
  sheep.drag = false; // метка перетаскивания
  sheep.dragTimeout = 0; // метка задержки перетаскивания
  sheep.body.onWorldBounds = true; // отскок от границ мира
  sheep.collision = 1; // временно врубаем счетчик коллизии
  sheep.body.mass = 0; // вроде как инерция
  sheep.changeVector = false; // метка смены вектора
  sheep.merging = false; // метка животного в мерджинге
  sheep.type = type; // порода
  sheep.wool = wool; // шерсть
  sheep._id = id; // id
  sheep.diamond = diamond; // счетчик кристаллов для кристаллического животного.
  sheep.expel = false; // метка изгнания
  sheep.spread = false;

  let side: string = 'right';
  let stage: number;
  
  if (wool <= 200) stage = 1;
  else if (wool > 200 && wool <= 600) stage = 2;
  else if (wool > 600 && wool <= 900) stage = 3;
  else stage = 4;

  if (vector === 2 || vector === 3 || vector === 7 || vector === 8) side = 'left';
  sheep.woolSprite = this.add.sprite(x, y, 'sheep-' + side + '-' + sheep.type + '-' + stage);
  const statusTexture: string = sheep.type !== 0 ? 'shave-status' : 'diamond-status';
  sheep.shaveStatus = this.add.sprite(x, y, statusTexture).setVisible(false);
  sheep.anims.play('sheep-stay-' + side + sheep.type, true);
  if (anim) Firework.create(this, { x, y }, 1);
  
  this.click(sheep, (): void => {

    // let modal: Imodal = {
    //   type: 1,
    //   sysType: 1
    // }
    // this.state.modal = modal;
    // this.state.animal = sheep;
    // this.scene.launch('Modal', this.state);

    if (sheep.wool >= 900) {
      this.collectWool(sheep, true);
    }

  });

  return sheep;

}


// мерджинг
function checkMerging(territory: any, sheep: any, position: string) {

  sheep.merging = true;
  territory.mergingCounter = 1;
  let check = territory.merging.find((data: any) => data._id === sheep._id);

  if (check === undefined) {

    // если на этой позиции уже стоит овца
    if (territory.merging.length === 1 && territory.merging[0].position === position) {

      if (position === 'top') position = 'bottom';
      else if (position === 'bottom') position = 'top';

    }

    // запоминаем
    territory.merging.push({
      _id: sheep._id,
      type: sheep.type,
      position: position
    });

    // ставим на парковку
    if (position === 'top') {

      sheep.anims.play('sheep-stay-right' + sheep.type, true);
      sheep.vector = 6;
      sheep.y = territory.y + 30;
      sheep.x = territory.x + 90;

    } else if (position === 'bottom') {

      sheep.anims.play('sheep-stay-right' + sheep.type, true);
      sheep.vector = 6;
      sheep.y = territory.y + 130;
      sheep.x = territory.x + 90;

    }

  } else {

    if (check.position === 'top' && position === 'bottom') check.position = 'bottom';
    if (check.position === 'bottom' && position === 'top') check.position = 'top';

    // обновляем положение парковки
    if (position === 'top') {

      sheep.anims.play('sheep-stay-right' + sheep.type, true);
      sheep.vector = 6;
      sheep.y = territory.y + 30;
      sheep.x = territory.x + 90;

    } else if (position === 'bottom') {

      sheep.anims.play('sheep-stay-right' + sheep.type, true);
      sheep.vector = 6;
      sheep.y = territory.y + 130;
      sheep.x = territory.x + 90;

    }

  }

  // проверяем успешный на мерджинг
  if (territory.merging.length === 2) {

    let sheep1 = this.sheep.children.entries.find((data: any) => data._id === territory.merging[0]._id);
    let sheep2 = this.sheep.children.entries.find((data: any) => data._id === territory.merging[1]._id);

    if (sheep1?.type === sheep2?.type) {

      this.mergTutor = 0;
      
      this.time.addEvent({ delay: 100, callback: (): void => {
        
        let position: Iposition = {
          x: territory.x + 120,
          y: territory.y + 120
        }
        MergingCloud.create(this, position);
        let type: number = sheep1.type + 1;
        sheep1.woolSprite.destroy();
        sheep2.woolSprite.destroy();
        sheep1.shaveStatus.destroy();
        sheep2.shaveStatus.destroy();
        sheep1.destroy();
        sheep2.destroy();
        let id: string = 'local_' + randomString(18);
        let x: number = territory.x + 120;
        let y: number = territory.y + 240;
        let sheep = this.getSheep(id, type, x, y, 0, 0, 0, 7, false);
        let aimX: number = random(territory.x + 40, territory.x + 200);
        let aimY: number = random(territory.y + 280, territory.y + 440);
        this.aim(sheep, aimX, aimY);
        this.tryTask(2, type);
        this.tryTask(4, type);
        this.tryClanTask(5);
        this.checkAnimalTask();

        if (this.state.userSheep.tutorial === 70) {
          this.doneTutor_70();
        }

      }, callbackScope: this, loop: false });

      territory.merging = [];

    } else {

      if (sheep1 && sheep2) {
        SpeechBubble.create(this, this.state.lang.mergingMessageBreed, 1);
        this.cancelMerging(territory, sheep1, sheep2);
      } else {
        
        // костыль
        for (let i in this.sheep.children.entries) this.sheep.children.entries[i].merging = false;
        if (sheep1) this.teleportation(sheep1);
        if (sheep2) this.teleportation(sheep2);
        territory.merging = [];

      }

    }


  }
  
}


// отмена мерджинга
function cancelMerging(territory: any, sheep1: any, sheep2: any) {

  this.time.addEvent({ delay: 100, callback: (): void => {

    if (sheep1) {

      sheep1.merging = false;
      let randomX: number = random(territory.x + 40, territory.x + 200);
      let randomY: number = random(territory.y + 280, territory.y + 440);
      this.aim(sheep1, randomX, randomY);

    }

    if (sheep2) {

      sheep2.merging = false;
      let randomX: number = random(territory.x + 40, territory.x + 200);
      let randomY: number = random(territory.y + 280, territory.y + 440);
      this.aim(sheep2, randomX, randomY);

    }

    for (let i in territory.merging) {

      let sheep = this.sheep.children.entries.find((data: any) => data._id === territory.merging[i]._id);
      let randomX: number = random(territory.x + 40, territory.x + 200);
      let randomY: number = random(territory.y + 280, territory.y + 440);
      this.aim(sheep, randomX, randomY);
      sheep.mergin = false;

    }
    
    territory.merging = [];
    territory.mergingCounter = 0;

  }, callbackScope: this, loop: false });
  
}


// покупка овцы
function buySheep(breed: number, shop: boolean = false): boolean { 
  const checkSale = (saleName: string): boolean => {
    return this.state.sales.some((el: Isale) => el.type === saleName && el.startTime <= 0 && el.endTime > 0) && this.state.userSheep.tutorial >= 100; 
  }

  let success: boolean = false;

  if (this.sheep.children.entries.length < 50) {

    let sheepPrice = this.sheepPrice(breed);
    if (checkSale(`${this.state.farm.toUpperCase()}_PRICE`)) sheepPrice.price = Math.round(sheepPrice.price / 2);

    if (this.state.userSheep.money >= sheepPrice.price) {
      
      const action = () => {
        success = true;
        let x: number = Phaser.Math.Between(550, 660);
        let y: number = Phaser.Math.Between(530, 540);
        if (this.scrolling.scrollY > 350) {
          const position: Iposition = this.findFreeTerritory(600,  this.height + this.scrolling.scrollY + 250);
          if (position) {
            x = Phaser.Math.Between(position.x - 50, position.x + 50);
            y = Phaser.Math.Between(position.y - 10, position.y + 10);
          }
        }
        if (this.state.userSheep.tutorial === 20) {
          x = 550;
          y = 530;
        }
  
        let id: string = 'local_' + randomString(18);
        let sheep = this.getSheep(id, breed, x, y);
        this.state.userSheep.money -= sheepPrice.price;
        this.state.userSheep.countSheep = sheepPrice.countSheep;
        this.game.scene.keys['SheepBars'].updateAnimalPrice();
        this.tryTask(1, breed);
        this.tryClanTask(1);
        this.tryTask(4, breed);
        this.checkAnimalTask();
  
        let land: number = this.territories.children.entries.find((data: any) => data.block === 2 && data.position === 3).territoryType;
  
        if (land !== 2 && land !== 3) {
          if (this.state.userSheep.tutorial === 20) {
            this.aim(sheep, 360, 600);
            Firework.create(this, { x: 600, y: 600 }, 1);
          } else {
            sheep.body.reset(sheep.x, sheep.y);
            sheep.drag = true;
            sheep.x = 600;
            sheep.y = 600;
            sheep.wool = 0;
          }
        }
      };

      const checkNewBalance: { pasture: boolean, water: boolean } = this.checkSheepBalance(breed);
      const oldBalance: Ibalance  = this.balance();
      if ((!checkNewBalance.pasture || !checkNewBalance.water) 
        && !oldBalance.alarm 
        && this.state.userSheep.tutorial >= 100 
        && this.state.user.additionalTutorial.balance) {
        const modal: Imodal = { 
          type: 1, 
          sysType: 28, 
          confirmSpendParams: { 
            type: !checkNewBalance.pasture ? 'pasture' : 'water', 
            price: 0, 
            callback: () => { action(); },
          },
        };
        this.state.modal = modal;
        this.scene.stop('Modal');
        this.scene.stop('Shop');
        this.scene.stop('ShopBars');
        this.scene.launch('Modal', this.state);
      } else {
        action();
      }
    } else {

      if (shop) {
        this.scene.stop('Shop');
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');
      }

      let count: number = sheepPrice.price - this.state.userSheep.money;
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
      message: this.state.lang.maxSheepCount
    };
    this.achievement.tryId(8);
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);

  }

  return success;

}


// подстригатель
function collectWool(sheep: any, manualСollect: boolean = false, anim: boolean = true): void {

  let path: Iposition;
  let length: number;
  let repository: any = false;

  if (sheep.type !== 0) {

    if (manualСollect) {
      
      sheep.wool = 0;
      let price: number = this.state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === sheep.type).long_wool;
      if (this.state.userSheep.feedBoostTime > 0) price *= this.feedBoostMultiplier; // если бустер комбикорм активен
      if (this.state.clan) {
        const multiply: number = this.state.clan.sheep.cooldown > 0 ? 1 + ((this.state.clan.sheep.level - 1) / 100) : 1 + (this.state.clan.sheep.level / 100);
        price *= multiply;
      }
      this.state.userSheep.money += price;

      if (anim) {
        this.game.scene.keys['SheepBars'].plusMoneyAnimation({
          x: sheep.x,
          y: sheep.y
        });
        this.tryTask(11, 1);
        this.tryClanTask(4);
      }


      if (this.state.userSheep.tutorial === 40) {
        this.doneTutor_40();
      }

    } else {

      for (let i in this.territories.children.entries) {
        let territory: SheepTerritory = this.territories.children.entries[i];

        if (territory.territoryType === 5) {
          let max: number = this.state.sheepSettings.territoriesSheepSettings.find((data: IterritoriesSheepSettings) => data.improve === territory.improve).storage;

          if (Utils.checkTestB(this.state)) {
            max = this.state.sheepSettings.partSettings[territory.improve - 1].territory.maxRepositoryVolume;
          }

          if (max > territory.volume) {
            sheep.wool = 0;
            const position: Iposition = {
              x: territory.x + 120,
              y: territory.y + 120
            }
            const distance: number = Phaser.Math.Distance.Between(sheep.x, sheep.y - 50, position.x, position.y);
            if (length === undefined || distance < length) {
              length = distance;
              path = position;
              repository = territory;
            }
          }
        }
      }
      if (length) {
        let price: number = this.state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === sheep.type).long_wool;
        if (this.state.userSheep.feedBoostTime > 0) price *= this.feedBoostMultiplier; // если бустер комбикорм активен
        if (this.state.clan) {
          const multiply: number = this.state.clan.sheep.cooldown > 0 ? 1 + ((this.state.clan.sheep.level - 1) / 100) : 1 + (this.state.clan.sheep.level / 100);
          price *= multiply;
        }
        repository.volume++;
        repository.money += price;
        Wool.create(this, { x: sheep.x, y: sheep.y - 50 }, sheep.type, path);
      } else {
        if (manualСollect) {
          const modal: Imodal = {
            type: 1,
            sysType: 3,
            height: 150,
            message: this.state.lang.haveNotSpaceRepository
          }
          this.state.modal = modal;
          this.scene.launch('Modal', this.state);
        }
      }
    }
  } else {
    const position: Iposition = {
      x: sheep.x,
      y: sheep.y - 50
    };

    sheep.wool = 0;
    sheep.diamond++;
    this.game.scene.keys['SheepBars'].getCurrency(position, 1, 'diamond');
    this.state.user.diamonds++;
    this.tryTask(19, 0);
    this.tryClanTask(15);

    if (sheep.diamond >= 3) {
      if (this.caveTutor) {
        this.time.addEvent({ delay: 2000, callback: (): void => {
          this.showTutorial('cave3');
          this.caveTutor = false;
        }, callbackScope: this, loop: false });
      }
 
      Firework.create(this, sheep, 1);
      sheep.woolSprite.destroy();
      sheep.shaveStatus.destroy();
      sheep.destroy();
      
      this.game.scene.keys[this.state.farm].autosave();
      this.state.amplitude.logAmplitudeEvent('diamonds_get', {
        type: 'diamond_animal',
        count: 3,
      });
    }
  }
}

// продать шерсть из хранилища
function sellWool(): void {
  if (this.state.territory) {
    if (this.state.territory.territoryType === 5 && this.state.territory.money > 0) {
      this.tryTask(TaskType['SELL_RESOURCE'], 0, this.state.territory.volume);
      this.tryClanTask(2);

      this.state.userSheep.money += this.state.territory.money;
      this.state.territory.money = 0;
      this.state.territory.volume = 0;
      
      this.game.scene.keys['SheepBars'].plusMoneyAnimation({
        x: this.state.territory.x + 120,
        y: this.state.territory.y + 120
      });
      this.autosave();
    }
  }
}

// подтверждение продажи овцы
function confirmExpelSheep(): void {

  let modal: Imodal = {
    type: 1,
    sysType: 6
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}



// актуальный спрайт шерсти
function woolSprite(sheep: any): void {

  let side: string;
  let stage: number;
  let statusPosition: number;
  
  if (sheep.vector === 2 ||
    sheep.vector === 3 ||
    sheep.vector === 7 ||
    sheep.vector === 8) {
    side = 'left';
    statusPosition = 50;
  } else {
    side = 'right';
    statusPosition = -50;
  }

  if (sheep.wool <= 200) stage = 1;
  else if (sheep.wool > 200 && sheep.wool <= 600) stage = 2;
  else if (sheep.wool > 600 && sheep.wool <= 900) stage = 3;
  else stage = 4;
  
  let texture: string = 'sheep-' + side + '-' + sheep.type + '-' + stage;

  if (sheep.woolSprite.texture.key !== texture) {
    sheep.woolSprite.setTexture(texture);
  }
  
  sheep.woolSprite.setDepth(sheep.depth + 1);
  sheep.woolSprite.x = sheep.x;
  sheep.woolSprite.y = sheep.y;

  // значек стрижки
  if (sheep.wool >= 900 && !sheep.shaveStatus.visible) sheep.shaveStatus.setVisible(true);
  if (sheep.wool < 900 && sheep.shaveStatus.visible) sheep.shaveStatus.setVisible(false);
  sheep.shaveStatus.setDepth(sheep.depth + 1);
  sheep.shaveStatus.x = sheep.x + statusPosition;
  sheep.shaveStatus.y = sheep.y - 60;

  // скрытие статуса стрижки для тутора
  if ((this.state.userSheep.tutorial === 20 ||
    this.state.userSheep.tutorial === 40 ||
    this.state.userSheep.tutorial === 75 ||
    this.state.tutorial?.additional === 'cave2') && this.scene.isActive('Tutorial')) {
    sheep.shaveStatus.setVisible(false);
  }

  // стрелки для тутора
  if (this.state.userSheep.tutorial === 40 && !this.scene.isActive('Tutorial') && sheep.wool >= 900 && !this.arrow) {
    this.woolPB_bg?.destroy();
    this.woolPB_lineBg?.destroy();
    this.woolPB_progress?.destroy();
    this.arrow = Arrow.generate(this, 4, sheep);
  }

  // прогресс бар для тутора
  if (this.state.userSheep.tutorial === 40 && !this.scene.isActive('Tutorial') && sheep.wool < 900 && this.woolPB_show) {

    this.woolPB_bg?.destroy();
    this.woolPB_lineBg?.destroy();
    this.woolPB_progress?.destroy();

    let x: number = sheep.x - 55;
    let y: number = sheep.y - 90;
    let progress: number = 9.4 * (sheep.wool / 90);

    this.woolPB_bg = this.add.graphics({ x: x, y: y }).setDepth(y);
    this.woolPB_bg.fillStyle(0xFFFEDE, 1);
    this.woolPB_bg.fillRoundedRect(0, 0, 100, 22, 5);
    this.woolPB_lineBg = this.add.graphics({ x: x + 3, y: y + 3 }).setDepth(y);
    this.woolPB_lineBg.fillStyle(0xFFE398, 1);
    this.woolPB_lineBg.fillRoundedRect(0, 0, 94, 16, 3);
    this.woolPB_progress = this.add.graphics({ x: x + 3, y: y + 3 }).setDepth(y);
    this.woolPB_progress.fillStyle(0xFF8C3B, 1);
    this.woolPB_progress.fillRoundedRect(0, 0, progress, 16, 3);

  }

  if (!sheep.drag) {

    if ((sheep.moving || sheep.aim) && !sheep.merging) sheep.anims.play('sheep-move-' + side + sheep.type, true);
    else sheep.anims.play('sheep-stay-' + side + sheep.type, true);

  }

}


// мерджинг на поле
function dragSheepMerging(sheep: any): void {
  
  let max: number = this.state.sheepSettings.sheepSettings.length;
  let findSheep: any = this.sheep.children.entries.find((data: any) => {

    if (data.x - (data.width / 2) <= sheep.x && data.x + (data.width / 2) >= sheep.x &&
      data.y - (data.height / 2) <= sheep.y && data.y + (data.height / 2) >= sheep.y &&
      data.type === sheep.type &&
      sheep.type > 0 &&
      sheep.type < max &&
      data._id !== sheep._id &&
      this.state.userSheep.tutorial >= 100 &&
      this.state.userSheep.fair >= sheep.type) {

      return data;

    } else return false;

  });

  if (findSheep) {

    const position: Iposition = {
      x: sheep.x,
      y: sheep.y
    }
    MergingCloud.create(this, position);
    
    const type: number = sheep.type + 1;

    findSheep.woolSprite.destroy();
    findSheep.shaveStatus.destroy();
    findSheep.destroy();
    
    sheep.woolSprite.destroy();
    sheep.shaveStatus.destroy();
    sheep.destroy();

    const id: string = 'local_' + randomString(18);

    this.getSheep(id, type, position.x, position.y, 0, 0, 0, 7, false);

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
  getSheep,
  checkMerging,
  cancelMerging,
  buySheep,
  collectWool,
  sellWool,
  confirmExpelSheep,
  woolSprite,
  dragSheepMerging
}
