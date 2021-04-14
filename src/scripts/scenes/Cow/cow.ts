import { random, randomString } from '../../general/basic';
import Firework from '../../components/animations/Firework';
import MergingCloud from '../../components/animations/MergingCloud';
import Milk from '../../components/Resource/Milk';
import SpeechBubble from '../../components/animations/SpeechBuble';
import CowSprite from '../../components/Animal/CowSprite';
import Territory from './../../components/Territories/Territory';

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
  for (let i in this.animalGroup.children.entries) {

    let c: CowSprite = this.animalGroup.children.entries[i];
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

// мерджинг
function checkMerging(territory: any, cow: CowSprite, position: string) {

  cow.merging = true;
  territory.mergingCounter = 1;
  let check = territory.merging.find((data: any) => data._id === cow._id);
  if (check === undefined) {

    // если на этой позиции уже стоит корова
    if (territory.merging.length === 1 && territory.merging[0].position === position) {

      if (position === 'top') position = 'bottom';
      else if (position === 'bottom') position = 'top';
      console.log('check === undefined')
    }

    // запоминаем
    territory.merging.push({
      _id: cow._id,
      breed: cow.breed,
      position: position
    });

    // ставим на парковку
    if (position === 'top') {
      cow.vector = 4;
      cow.y = territory.y + 30;
      cow.x = territory.x + 165;
    } else if (position === 'bottom') {
      cow.vector = 4;
      cow.y = territory.y + 130;
      cow.x = territory.x + 165;
    }

  } else {

    if (check.position === 'top' && position === 'bottom') check.position = 'bottom';
    if (check.position === 'bottom' && position === 'top') check.position = 'top';

    // обновляем положение парковки
    if (position === 'top') {
      cow.vector = 4;
      cow.y = territory.y + 30;
      cow.x = territory.x + 165;
    } else if (position === 'bottom') {
      cow.vector = 4;
      cow.y = territory.y + 130;
      cow.x = territory.x + 165;
    }

  }

  // проверяем успешный на мерджинг
  if (territory.merging.length === 2) {

    let cow1: CowSprite = this.animalGroup.children.entries.find((data: any) => data._id === territory.merging[0]._id);
    let cow2: CowSprite = this.animalGroup.children.entries.find((data: any) => data._id === territory.merging[1]._id);

    if (cow1?.breed === cow2?.breed) {
      
      this.time.addEvent({ delay: 100, callback: (): void => {

        let position: Iposition = {
          x: territory.x + 120,
          y: territory.y + 120
        }
        MergingCloud.create(this, position);
        let type: number = cow1.breed + 1;
        cow1.destroy();
        cow2.destroy();
        let id: string = 'local_' + randomString(18);
        let x: number = territory.x + 120;
        let y: number = territory.y + 240;
        
        const cow: CowSprite = this.animalGroup.generate(this, { x, y }, type, id, 0, 0, 7, false);
        let aimX: number = Phaser.Math.Between(territory.x + 40, territory.x + 200);
        let aimY: number = Phaser.Math.Between(territory.y + 280, territory.y + 440);
        cow.setAim( aimX, aimY);
        this.tryTask(2, type);
        this.tryTask(4, type);
        this.checkAnimalTask();

      }, callbackScope: this, loop: false });

      territory.merging = [];

    } else {

      if (cow1 && cow2) {
        SpeechBubble.create(this, this.state.lang.mergingMessageBreed, 1);
        this.cancelMerging(territory, cow1, cow2);

      } else {
        
        // костыль
        for (let i in this.animalGroup.children.entries) this.animalGroup.children.entries[i].merging = false;
        if (cow1) cow2.teleportation();
        if (cow2) cow2.teleportation();
        territory.merging = [];

      }
    }
  }
}


// отмена мерджинга
function cancelMerging(territory: any, cow1: CowSprite, cow2: CowSprite) {

  this.time.addEvent({ delay: 100, callback: (): void => {

    if (cow1) {

      cow1.merging = false;
      let randomX: number = random(territory.x + 40, territory.x + 200);
      let randomY: number = random(territory.y + 280, territory.y + 440);
      cow1.setAim(randomX, randomY);

    }

    if (cow2) {

      cow2.merging = false;
      let randomX: number = random(territory.x + 40, territory.x + 200);
      let randomY: number = random(territory.y + 280, territory.y + 440);
      cow2.setAim(randomX, randomY);

    }

    for (let i in territory.merging) {

      let cow: CowSprite = this.animalGroup.children.entries.find((data: any) => data._id === territory.merging[i]._id);
      let randomX: number = Phaser.Math.Between(territory.x + 40, territory.x + 200);
      let randomY: number = Phaser.Math.Between(territory.y + 280, territory.y + 440);
      cow.setAim(randomX, randomY);
      cow.merging = false;

    }
    
    territory.merging = [];
    territory.mergingCounter = 0;

  }, callbackScope: this, loop: false });
  
}


// покупка коровы
function buyCow(breed: number, shop: boolean = false): boolean {

  let success: boolean = false;

  if (this.animalGroup.children.entries.length < 50) {

    let cowPrice = this.cowPrice(breed);

    if (this.state.userCow.money >= cowPrice.price) {
      
      success = true;
      let x: number = random(530, 660);
      let y: number = random(530, 540);
      let id: string = 'local_' + randomString(18);
      this.animalGroup.generate(this, { x, y }, breed, id, 0, 0, 7, true);
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


// собиратель молока
function collectMilk(cow: CowSprite, manualСollect: boolean = false): void {

  let path: Iposition;
  let length: number;
  let repository: any = false;

  if (cow.breed !== 0) {
    if (manualСollect) {
      this.tryTask(11, 0);
    }
    for (let i in this.territories.children.entries) {
      const territory: Territory = this.territories.children.entries[i];
      if (territory.territoryType === 5) {
        const max: number = this.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === territory.improve).milkStorage;
        if (max > territory.volume + cow.milk) {
          cow.milk = 0;
          const position: Iposition = {
            x: territory.x + 120,
            y: territory.y + 120
          }
          const distance: number = Phaser.Math.Distance.Between(cow.x, cow.y - 50, position.x, position.y);
          if (length === undefined || distance < length) {
            length = distance;
            path = position;
            repository = territory;
          }
        }
      }
    }

    if (length) {
      Milk.create(this, { x: cow.x, y: cow.y - 50}, 0, path);
      let price: number = 0;
      if (this.state.userCow.feedBoostTime > 0) price *= this.feedBoostMultiplier; // если бустер комбикорм активен
      repository.volume += cow.settings.maxMilkVolume;
      repository.money += price;
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
      console.log('have not space for milk');
    }
  } else {
    let position: Iposition = {
      x: cow.x,
      y: cow.y - 50
    }

    // this.state.amplitude.getInstance().logEvent('diamonds_get', {
    //   type: 'diamond_animal',
    //   count: 1,
    //   farm_id: this.state.farm,
    //  chapter: this.state[`user${this.state.farm}`].part,

    // });

    cow.milk = 0;
    cow.diamond++;
    this.game.scene.keys['CowBars'].getCurrency(position, 1, 'diamond');
    this.state.user.diamonds++;
    this.tryTask(19, 0);


    if (cow.diamond >= 5) {

      // if (this.caveTutor) {
        
      //   this.time.addEvent({ delay: 2000, callback: (): void => {
      //     this.showTutorial('cave3');
      //     this.caveTutor = false;
      //   }, callbackScope: this, loop: false });

      // }
 
      Firework.create(this, cow, 1);
      cow.destroy();
      
      // this.state.amplitude.getInstance().logEvent('diamonds_get', {
      //   type: 'diamond_animal',
      //   count: 5,
      //   farm_id: this.state.farm,
      //   chapter: this.state[`user${this.state.farm}`].part,
      // });
    }
  }
}


// продать яйца из хранилища
function sellMilk(): void {
  if (this.state.territory) {
    if (this.state.territory.territoryType === 5 && this.state.territory.volume > 0) {

      this.tryTask(20, 0);

      this.state.userCow.money += this.state.territory.volume;
      this.state.territory.money = 0;
      this.state.territory.volume = 0;
      
      this.game.scene.keys['CowBars'].plusMoneyAnimation({
        x: this.state.territory.x + 120,
        y: this.state.territory.y + 120
      });
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
function dragCowMerging(cow: CowSprite): void {
  let max: number = this.state.cowSettings.cowSettings.length;
  let findCow: CowSprite = this.animalGroup.children.entries.find((data: any) => {
    if (data.x - (data.width / 2) <= cow.x && data.x + (data.width / 2) >= cow.x &&
      data.y - (data.height / 2) <= cow.y && data.y + (data.height / 2) >= cow.y &&
      data.breed === cow.breed &&
      cow.breed > 0 &&
      cow.breed < max &&
      data._id !== cow._id &&
      this.state.userCow.tutorial >= 0 &&
      this.state.userCow.fair >= cow.breed) {
      return data;
    } else return false;
  });

  if (findCow) {
    const position: Iposition = {
      x: cow.x,
      y: cow.y
    }
    MergingCloud.create(this, position);
    const type: number = cow.breed + 1;
    findCow.destroy();
    cow.destroy();
    const id: string = 'local_' + randomString(18);
    this.animalGroup.generate(this, position, type, id, 0, 0, 7, false);
    this.tryTask(2, type);
    this.tryTask(4, type);
    this.checkAnimalTask();
  }
}


export {
  teleportation,
  checkMerging,
  cancelMerging,
  buyCow,
  collectMilk,
  sellMilk,
  confirmExpelCow,
  expelCow,
  dragCowMerging
}
