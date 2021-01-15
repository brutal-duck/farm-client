import { random } from "../../general/basic";


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
    this.sheepForBoost = this.physics.add.group({
      collideWorldBounds: true
    });
    
    // создаю овцу в группе
    
    this.getRandomSheep(this.game.config.width - 200, yRoad + 100);
    
    this.getRandomSheep(600, 500);

    
  }
  

}

function getRandomSheep(x, y) {
  let randomType = random(1, this.state.userSheep.fair);
  let sheep = this.sheepForBoost.create(x, y, 'sheep' + randomType)
    .setDepth(y)
    .setInteractive();

  let wool: number = random(0, 900);
  sheep.type = randomType;
  this.input.setDraggable(sheep); // задали перетаскивание
  sheep.moving = false; // движение
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
  sheep.wool = wool; // шерсть
  sheep.expel = false; // метка изгнания

  let side: string = 'left';
  let stage: number;

  if (wool <= 200) stage = 1;
  else if (wool > 200 && wool <= 600) stage = 2;
  else if (wool > 600 && wool <= 900) stage = 3;
  else stage = 4;

  sheep.woolSprite = this.add.sprite(x, y, 'sheep-' + side + '-' + sheep.type + '-' + stage)
    .setDepth(y);
}



export {
  herdBoostWindow,
  getRandomSheep
};