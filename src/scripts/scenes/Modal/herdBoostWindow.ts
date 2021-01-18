import { random, getRandomBool, randomString } from "../../general/basic";
import { sheep } from "./sheep";

let x: number = 600;
let y: number = 360;
let yTent: number;
let yTextLevel: number;
let xRoad: number = 0;
let yRoad: number = 480;

function herdBoostWindow(): void {
  this.game.scene.keys[this.state.farm].scrolling.scrollY = 0;

  let farm: string = this.state.farm.toLowerCase();
  // ярмарка и тент
  this.add.sprite(x, y, `${farm}-merging`).setDepth(y);
  
  if (farm === 'sheep') { 
    yTent = y - 24;
    yTextLevel = y + 65;
  } else if (farm === 'chicken') {
    yTent = y - 17;
    yTextLevel = y + 82;
  };
  
  // массив животных для слияния
  this.mergingArray = [];

  this.add.image(x, yTent, `${farm}-tent`).setDepth(y + 1);

  this.add.text(x + 80, yTextLevel, this.state[`user${this.state.farm}`].fair, {
    font: '36px Shadow',
    color: '#b5315a'
  }).setOrigin(0.5, 0.5).setDepth(y * 2);
  
  // дорога
  let road: Phaser.GameObjects.Sprite = this.add.sprite(xRoad, yRoad, `herd-boost-road-${farm}`)
    .setOrigin(0)
    .setDepth(yRoad)
    .setDataEnabled()
  road.data.values.type = 'road'

  // Заборы
  this.add.sprite(0, yRoad + 15, `${farm}-horizontal-border-1`).setOrigin(0, 1).setDepth(y);
  this.add.sprite(0 + 240, yRoad + 15, `${farm}-horizontal-border-2`).setOrigin(0, 1).setDepth(y);
  this.add.sprite(0, yRoad + road.height + 15, `${farm}-horizontal-border-1`).setOrigin(0, 1).setDepth(y);
  this.add.sprite(0 + 240, yRoad + road.height  + 15, `${farm}-horizontal-border-2`).setOrigin(0, 1).setDepth(y);
  this.add.sprite(0 + 480, yRoad + road.height  + 15, `${farm}-horizontal-border-3`).setOrigin(0, 1).setDepth(y);

  let timerCounter = 0;

  if (this.state.farm === 'Sheep') {
    // дроп зоны 
    let topZone: Phaser.GameObjects.Zone = this.add.zone(x, y - 75, 300, 145).setDropZone(undefined, () => {});
    topZone.type = 'top'
    let bottomZone: Phaser.GameObjects.Zone = this.add.zone(x, y + 70, 300, 145).setDropZone(undefined, () => {});
    bottomZone.type = 'bottom';

    // Для проверки дроп зон
    let graphics2 = this.add.graphics().setDepth(bottomZone.y * 5);
    graphics2.lineStyle(2, 0x00ff00);
    graphics2.strokeRect(bottomZone.x - bottomZone.input.hitArea.width / 2, bottomZone.y - bottomZone.input.hitArea.height / 2, bottomZone.input.hitArea.width, bottomZone.input.hitArea.height);
   
    let graphics1 = this.add.graphics().setDepth(topZone.y * 5);
    graphics1.lineStyle(2, 0xffff00);
    graphics1.strokeRect(topZone.x - topZone.input.hitArea.width / 2, topZone.y - topZone.input.hitArea.height / 2, topZone.input.hitArea.width, topZone.input.hitArea.height);

    // создаю группу для овец
    this.sheepForBoost = this.physics.add.group();

    let timer: Phaser.Time.TimerEvent = this.time.addEvent({
      delay: this.state.herdBoostDelay,
      loop: true,
      callback: () => {
        this.getRandomSheep();
        ++timerCounter;
        if (timerCounter >= this.state.herdBoostTime) {
          timer.remove();
        }
      },
      callbackScope: this
    });
    
  } else if (this.state.farm === 'Chicken') {
    // дроп зоны 
    let leftZone: Phaser.GameObjects.Zone = this.add.zone(x - 75, y - 30, 145, 300).setDropZone(undefined, () => {});
    leftZone.type = 'left';
    
    let rightZone: Phaser.GameObjects.Zone = this.add.zone(x + 70, y - 30, 145, 300).setDropZone(undefined, () => {});
    rightZone.type = 'right';

    // для проверки дроп зон
    let graphics1 = this.add.graphics().setDepth(leftZone.y * 5);
    graphics1.lineStyle(2, 0xffff00);
    graphics1.strokeRect(leftZone.x - leftZone.input.hitArea.width / 2, leftZone.y - leftZone.input.hitArea.height / 2, leftZone.input.hitArea.width, leftZone.input.hitArea.height);

    let graphics2 = this.add.graphics().setDepth(rightZone.y * 5);
    graphics2.lineStyle(2, 0x00ff00);
    graphics2.strokeRect(rightZone.x - rightZone.input.hitArea.width / 2, rightZone.y - rightZone.input.hitArea.height / 2, rightZone.input.hitArea.width, rightZone.input.hitArea.height);



    this.chickenForBoost = this.physics.add.group();

    let timer: Phaser.Time.TimerEvent = this.time.addEvent({
      delay: this.state.herdBoostDelay,
      loop: true,
      callback: () => {
        this.getRandomChicken();
        ++timerCounter;
        if (timerCounter >= this.state.herdBoostTime) {
          timer.remove();
        }},
      callbackScope: this
    });

  }
}

function getRandomSheep(): void {

  let {x, y, side, _id} = this.getRandomStartPosition(); 

  let randomType: number = random(1, this.state.userSheep.fair);
  let sheep: Phaser.Physics.Arcade.Sprite = this.sheepForBoost.create(x, y, 'sheep' + randomType)
    .setDepth(y)
    .setInteractive()
    .setDataEnabled();

  sheep.data.values.velocity = -this.state.herdBoostSpeedAnimal

  if (side === 'right') {
    sheep.data.values.velocity = this.state.herdBoostSpeedAnimal;
  }
  
  sheep.data.values.type = randomType;
  this.input.setDraggable(sheep); 
  sheep.data.values.drag = false;
  sheep.data.values.side = side; 
  sheep.data.values._id = _id;
  // sheep.dragTimeout = 0;
  sheep.data.values.merging = false; // метка животного в мерджинге

  let stage: number = random(2, 4); 
  sheep.data.values.stage = stage;
  sheep.setVelocityX(sheep.data.values.velocity);

  sheep.data.values.woolSprite = this.physics.add.sprite(x, y, 'sheep-' + sheep.data.values.side + '-' + sheep.data.values.type + '-' + sheep.data.values.stage);

  sheep.data.values.woolSprite.setDepth(y)
    .setVelocityX(sheep.data.values.velocity);

  sheep.play('sheep-move-' + side + sheep.data.values.type);
  drag.bind(this)(sheep);
}

function getRandomChicken(): void {
  
  const {x, y, side, _id} = this.getRandomStartPosition(); 
  
  let randomType: number = random(1, this.state.userChicken.fair);
  const chicken: Phaser.Physics.Arcade.Sprite = this.chickenForBoost.create(x, y, 'chicken' + randomType)
    .setDepth(y)
    .setInteractive()
    .setDataEnabled();

  chicken.data.values.velocity = -this.state.herdBoostSpeedAnimal;

  if (side === 'right') {
    chicken.data.values.velocity = this.state.herdBoostSpeedAnimal;
  }
  
  chicken.data.values.type = randomType;
  this.input.setDraggable(chicken); 
  chicken.data.values.side = side;
  chicken.data.values._id = _id;
  chicken.data.values.drag = false; 
  // chicken.dragTimeout = 0;
  chicken.data.values.merging = false; // метка животного в мерджинге

  chicken.setVelocityX(chicken.data.values.velocity);

  chicken.play('chicken-move-' + chicken.data.values.side + chicken.data.values.type);

  drag.bind(this)(chicken);
}

function getRandomStartPosition(): {x: number, y: number, side: string, _id: string} {
  let x: number = 0;
  let y: number = random(550, 850);
  let side: string = 'right';
  let _id: string = 'local_' + randomString(18);
  
  if (getRandomBool()) {
    side = 'left';
    x = this.game.config.width + 100;
  } else {
    x = -100;
  }

  return {x, y, side, _id}
}

function drag(animal): void {
  this.input.on('dragstart', (pointer: any, animal: any): void => {
    animal.data.values.drag = true; // метим перетаскивание для других функций
    animal.setVelocity(0, 0); // отменяем передвижение
    animal.data.values.woolSprite?.setVelocity(0, 0);
    animal.body.onWorldBounds = false; // чтобы не могли перетащить за пределы
      // анимация
      if(animal.data.values.side === 'left') {
        animal.anims.play(this.state.farm.toLowerCase() + '-stay-left' + animal.data.values.type, true);
      } else {
        animal.anims.play(this.state.farm.toLowerCase() + '-stay-right' + animal.data.values.type, true);
      }
  });

  this.input.on('drag', (pointer: any, animal: Phaser.Physics.Arcade.Sprite, dragX: number, dragY: number): void => {

    animal.x = dragX;
    animal.y = dragY;
    animal.setDepth(dragY + Math.round((animal.height / 2) + 100));
    if (animal.data.values.woolSprite) {
      animal.data.values.woolSprite.x = dragX;
      animal.data.values.woolSprite.y = dragY;
      animal.data.values.woolSprite.setDepth(dragY + Math.round((animal.height / 2) + 101));
    }
  });

  this.input.on('drop', (pointer: any, animal: Phaser.Physics.Arcade.Sprite, zone: any): void => { 
    if (!animal.data.values.merging) {
      if (zone.type === 'left') {
        checkMerging.bind(this)(animal, 'left');
        console.log('left')
      } else if (zone.type === 'top') {
        checkMerging.bind(this)(animal, 'top');
        console.log('top')
      } else if (zone.type === 'right') {
        checkMerging.bind(this)(animal, 'right');
        console.log('right')
      } else if (zone.type === 'bottom') {
        checkMerging.bind(this)(animal, 'bottom');
        console.log('bottom')
      }
    }
  });

  this.input.on('dragend', (pointer: any, animal: Phaser.Physics.Arcade.Sprite): void => {

    if ((animal.y < 480 && animal.x < 480) || animal.y > 960) {
        console.log('x: ' + animal.x, 'y: ' + animal.y)
        animal.data?.values.woolSprite?.destroy();
        animal.destroy();
        console.log('miss drop')
      } else {
        console.log('popal')
        animal.data.values.drag = false;
        if (animal.data.values.merging) {
          animal.setVelocityX(0);
          animal.data.values.woolSprite?.setVelocityX(0);
        } else {
          animal.setVelocityX(animal.data.values.velocity);
          animal.data.values.woolSprite?.setVelocityX(animal.data.values.velocity);
          animal.play(this.state.farm.toLowerCase() + '-move-' + animal.data.values.side + animal.data.values.type);
        }
      }
  });
}

function checkMerging(animal: Phaser.Physics.Arcade.Sprite, position: string): void {
  animal.data.values.merging = true;
  let check = this.mergingArray.find((data: any) => data._id === animal.data.values._id);

  if (check === undefined) {
    if (this.mergingArray.length === 1 && this.mergingArray[0].position === position) {
      if (position === 'top') position = 'bottom';
        else if (position === 'bottom') position = 'top';
    }
  
    this.mergingArray.push({
      _id: animal.data.values._id,
      type: animal.data.values.type,
      position: position
    })
    
    if (position === 'top') {
  
      if (animal.data.values.side === 'left') {
        animal.data.values.side = 'right';
        animal.data.values.woolSprite.setTexture('sheep-' + animal.data.values.side + '-' + animal.data.values.type + '-' + animal.data.values.stage);
      }
  
      animal.anims.play(this.state.farm.toLowerCase() + '-stay-right' + animal.data.values.type, true);
      animal.y = y - 100;
      animal.x = x - 25;
      animal.data.values.woolSprite.x = animal.x;
      animal.data.values.woolSprite.y = animal.y;
  
    } else if (position === 'bottom') {
      if (animal.data.values.side === 'left') {
        animal.data.values.side = 'right';
        animal.data.values.woolSprite.setTexture('sheep-' + animal.data.values.side + '-' + animal.data.values.type + '-' + animal.data.values.stage);
      }
      animal.anims.play(this.state.farm.toLowerCase() + '-stay-right' + animal.data.values.type, true);
      animal.y = y + 20;
      animal.x = x - 25;
      animal.data.values.woolSprite.x = animal.x;
      animal.data.values.woolSprite.y = animal.y;
    }
  }
  if (this.mergingArray.length === 2) {

    let sheep1: Phaser.Physics.Arcade.Sprite = this.sheepForBoost.children.entries.find((data: any) => data.data.values._id === this.mergingArray[0]._id);
    let sheep2: Phaser.Physics.Arcade.Sprite = this.sheepForBoost.children.entries.find((data: any) => data.data.values._id === this.mergingArray[1]._id);
    
    if (sheep1 && sheep2) {
      if (sheep1?.data.values.type === sheep2?.data.values.type) {
        this.time.addEvent({ delay: 100, callback: (): void => {
          console.log('получай овцу');
          sheep1.data.values.woolSprite.destroy();
          sheep2.data.values.woolSprite.destroy();
          sheep1.destroy();
          sheep2.destroy();
        }, callbackScope: this, loop: false });
      } else {
        this.time.addEvent({ delay: 100, callback: (): void => {
          console.log('не те овцы');
          sheep1.data.values.woolSprite.destroy();
          sheep2.data.values.woolSprite.destroy();
          sheep1.destroy();
          sheep2.destroy();
        }, callbackScope: this, loop: false });
      }
      this.mergingArray = [];
    }
  }

  
  

// } else {

//   if (check.position === 'top' && position === 'bottom') check.position = 'bottom';
//   if (check.position === 'bottom' && position === 'top') check.position = 'top';

//   // обновляем положение парковки
//   if (position === 'top') {

//     animal.anims.play(this.state.farm.toLowerCase() + '-stay-right' + animal.type, true);
//     sheep.vector = 6;
//     animal.y = y + 30;
//     sheep.x = x + 90;

//   } else if (position === 'bottom') {

//     sheep.anims.play(this.state.farm.toLowerCase() + '-stay-right' + animal.type, true);
//     sheep.vector = 6;
//     sheep.y = territory.y + 130;
//     sheep.x = territory.x + 90;

//   }

}



export {
  herdBoostWindow,
  getRandomSheep,
  getRandomChicken,
  getRandomStartPosition
};