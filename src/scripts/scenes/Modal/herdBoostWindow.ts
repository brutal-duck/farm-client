import { random, getRandomBool } from "../../general/basic";

let x: number = 600;
let y: number = 360;
let yTent: number;

let xRoad: number = 0;
let yRoad: number = 480;
 

function herdBoostWindow() {

  this.game.scene.keys[this.state.farm].scrolling.scrollY = 0;

  let farm: string = this.state.farm.toLowerCase();
  // ярмарка и тент
  this.add.sprite(x, y, `${farm}-merging`).setDepth(y);
  
  if (farm === 'sheep') yTent = y - 24;
  else if (farm === 'chicken') yTent = y - 17;

  this.add.image(x, yTent, `${farm}-tent`).setDepth(y + 1);

  this.add.text(x + 80, y + 65, this.state.userSheep.fair, {
    font: '36px Shadow',
    color: '#b5315a'
  }).setOrigin(0.5, 0.5).setDepth(y + 1000);

  // дорога
  let road: Phaser.GameObjects.Sprite = this.add.sprite(xRoad, yRoad, `herd-boost-road-${farm}`).setOrigin(0).setDepth(yRoad);

  // Заборы
  this.add.sprite(0, yRoad + 15, `${farm}-horizontal-border-1`).setOrigin(0, 1).setDepth(y);
  this.add.sprite(0 + 240, yRoad + 15, `${farm}-horizontal-border-2`).setOrigin(0, 1).setDepth(y);
  this.add.sprite(0, yRoad + road.height + 15, `${farm}-horizontal-border-1`).setOrigin(0, 1).setDepth(y);
  this.add.sprite(0 + 240, yRoad + road.height  + 15, `${farm}-horizontal-border-2`).setOrigin(0, 1).setDepth(y);
  this.add.sprite(0 + 480, yRoad + road.height  + 15, `${farm}-horizontal-border-3`).setOrigin(0, 1).setDepth(y);

  let timerCounter = 0;

  if (this.state.farm === 'Sheep') {
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


function getRandomSheep() {

  const {x, y, side} = this.getRandomStartPosition(); 

  let randomType: number = random(1, this.state.userSheep.fair);
  const sheep: Phaser.Physics.Arcade.Sprite = this.sheepForBoost.create(x, y, 'sheep' + randomType)
    .setDepth(y)
    .setInteractive()
    .setDataEnabled();

  sheep.data.values.velocity = -this.state.herdBoostSpeedAnimal

  if (side === 'right') {
    sheep.data.values.velocity = this.state.herdBoostSpeedAnimal;
  }
  
  sheep.data.values.type = randomType;
  this.input.setDraggable(sheep); 
  // sheep.drag = false; 
  // sheep.dragTimeout = 0;
  // sheep.merging = false; // метка животного в мерджинге
  let stage: number = random(2, 4); 
  sheep.setVelocityX(sheep.data.values.velocity);

  sheep.data.values.woolSprite = this.physics.add.sprite(x, y, 'sheep-' + side + '-' + sheep.data.values.type + '-' + stage);

  sheep.data.values.woolSprite.setDepth(y)
    .setVelocityX(sheep.data.values.velocity);

  sheep.play('sheep-move-' + side + sheep.data.values.type);
}

function getRandomChicken() {
  
  const {x, y, side} = this.getRandomStartPosition(); 

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
  // chicken.drag = false; 
  // chicken.dragTimeout = 0;
  // chicken.merging = false; // метка животного в мерджинге

  chicken.setVelocityX(chicken.data.values.velocity);

  chicken.play('chicken-move-' + side + chicken.data.values.type);
}

function getRandomStartPosition(){
  let x: number = 0;
  let y: number = random(550, 850);
  let side: string = 'right';
  
  if (getRandomBool()) {
    side = 'left';
    x = this.game.config.width + 100;
  } else {
    x = -100;
  }

  return {x, y, side}
}

export {
  herdBoostWindow,
  getRandomSheep,
  getRandomChicken,
  getRandomStartPosition
};