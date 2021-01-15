import { random, getRandomBool } from "../../general/basic";

let x: number = 600;
let y: number = 360;
let yTent: number;

let xRoad: number = 0;
let yRoad: number = 480;
 

function herdBoostWindow() {

  this.game.scene.keys[this.state.farm].scrolling.scrollY = 0;

  let farm: string = this.state.farm.toLowerCase();
  
  let merging: Phaser.GameObjects.Sprite = this.add.sprite(x, y, `${farm}-merging`)
    .setDepth(y);
  
  if (farm === 'sheep') {
    yTent = y - 24;
  } else if (farm === 'chicken') {
    yTent = y - 17;
  }
  let tent: Phaser.GameObjects.Image = this.add.image(x, yTent, `${farm}-tent`)
    .setDepth(y + 1);

  let road: Phaser.GameObjects.Sprite = this.add.sprite(xRoad, yRoad, `herd-boost-road-${farm}`)
    .setOrigin(0)
    .setDepth(2);

  // Заборы
  let borderTop1: Phaser.GameObjects.Sprite = this.add.sprite(0, yRoad + 15, `${farm}-horizontal-border-1`)
    .setOrigin(0, 1)
    .setDepth(y);

  let borderTop2: Phaser.GameObjects.Sprite = this.add.sprite(0 + 240, yRoad + 15, `${farm}-horizontal-border-2`)
    .setOrigin(0, 1)
    .setDepth(y);

  let borderBottom1: Phaser.GameObjects.Sprite = this.add.sprite(0, yRoad + road.height + 15, `${farm}-horizontal-border-1`)
    .setOrigin(0, 1)
    .setDepth(y);

  let borderBottom2: Phaser.GameObjects.Sprite = this.add.sprite(0 + 240, yRoad + road.height  + 15, `${farm}-horizontal-border-2`)
    .setOrigin(0, 1)
    .setDepth(y);

  let borderBottom3: Phaser.GameObjects.Sprite = this.add.sprite(0 + 480, yRoad + road.height  + 15, `${farm}-horizontal-border-3`)
    .setOrigin(0, 1)
    .setDepth(y);

  if (this.state.farm === 'Sheep') {

    // создаю группу для овец
    this.sheepForBoost = this.physics.add.group();

    let timer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.getRandomSheep,
      callbackScope: this
    });

  } else if (this.state.farm === 'Chicken') {

    this.chickenForBoost = this.physics.add.group();

    let timer = this.time.addEvent({
      delay: 1000,
      loop: true,
      callback: this.getRandomChicken,
      callbackScope: this
    });

  }
}


function getRandomSheep() {
  let x: number = 0;
    let y: number = random(550, 850);
    let side: string = 'right';

    if (getRandomBool()) {
      side = 'left'
      x = this.game.config.width + 100;
    } else {
      x = -100;
    }

  let randomType: number = random(1, this.state.userSheep.fair);
  let sheep: Phaser.Physics.Arcade.Sprite = this.sheepForBoost.create(x, y, 'sheep' + randomType)
    .setDepth(y)
    .setInteractive()
    .setDataEnabled();

  sheep.data.values.velocity = -this.state.herdBoostSpeedAnimal

  if (side === 'right') {
    sheep.data.values.velocity = this.state.herdBoostSpeedAnimal;
    sheep.setTexture('sheep'+ randomType, 4)
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
  let x: number = 0;
  let y: number = random(550, 850);
  let side: string = 'right';
  
  if (getRandomBool()) {
    side = 'left'
    x = this.game.config.width + 100;
  } else {
    x = -100;
  }

  let randomType: number = random(1, this.state.userChicken.fair);
  let chicken: Phaser.Physics.Arcade.Sprite = this.chickenForBoost.create(x, y, 'chicken' + randomType)
    .setDepth(y)
    .setInteractive()
    .setDataEnabled();

  chicken.data.values.velocity = -this.state.herdBoostSpeedAnimal

  if (side === 'right') {
    chicken.data.values.velocity = this.state.herdBoostSpeedAnimal;
    chicken.setTexture('chicken' + randomType, 7)
  }
  
  chicken.data.values.type = randomType;
  this.input.setDraggable(chicken); 
  // sheep.drag = false; 
  // sheep.dragTimeout = 0;
  // sheep.merging = false; // метка животного в мерджинге

  chicken.setVelocityX(chicken.data.values.velocity);

  chicken.play('chicken-move-' + side + chicken.data.values.type);
}


export {
  herdBoostWindow,
  getRandomSheep,
  getRandomChicken
};