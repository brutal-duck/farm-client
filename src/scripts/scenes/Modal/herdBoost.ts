import { random, getRandomBool, randomString, shortTime} from "../../general/basic";
import MergingCloud from '../../components/animations/MergingCloud';

let x: number = 600;
let y: number = 360;
let yTent: number;
let yTextLevel: number;
let xRoad: number = 0;
let yRoad: number = 480;

function herdBoostWindow(): void {
  
  this.game.scene.keys[this.state.farm].scrolling.scrollY = 0; // останавливаем скролл

  createStartTimer.bind(this)(); // запускаем стартовый таймер

}

function createStartTimer(): void {
  let startCount: number = 5;

  let boostCounterWindow: Phaser.Physics.Arcade.Sprite = this.physics.add.sprite(360, 400, 'boost-window-bg')
    .setDepth(1);

  let text1: Phaser.GameObjects.Text = this.add.text(360, 360, this.state.lang[`herdBoostStartTimout${this.state.farm}_1`], {
    font: '19px Shadow',
    color: '#ce9457',
    wordWrap: { width: 230 },
    align: 'center'
  }).setOrigin(0.5, 0.5).setDepth(y * 2);

  let text2: Phaser.GameObjects.Text = this.add.text(360, 410, this.state.lang[`herdBoostStartTimout${this.state.farm}_2`], {
    font: '21px Shadow',
    color: '#946939',
    wordWrap: { width: 440 },
    align: 'center'
  }).setOrigin(0.5, 0.5).setDepth(y * 2);

  let countdown: Phaser.Physics.Arcade.Sprite = this.add.sprite(360, 500, 'boost-countdown').setDepth(2);

  let leaves1: Phaser.Physics.Arcade.Sprite = this.add.sprite(440, 510, 'boost-leaves').setDepth(0).setFlip(true, true);
  let leaves2: Phaser.Physics.Arcade.Sprite = this.add.sprite(280, 510, 'boost-leaves').setDepth(0).setFlip(false, true);

  let timerText: Phaser.GameObjects.Text = this.add.text(362, 492, startCount, {
    font: '64px Shadow',
    color: '#f3eae6'
  }).setOrigin(0.5, 0.5).setDepth(3);

  let timer: Phaser.Time.TimerEvent = this.time.addEvent({
    delay: 1000,
    loop: true,
    callback: () => {
      --startCount;
      timerText.setText(String(startCount));
      if (startCount < 1) {
        hideItems.bind(this)([timerText, leaves1, leaves2, countdown, text1, text2], boostCounterWindow); // скрываем элементы
        timer.remove();
      }
    },
    callbackScope: this
  });
}

function hideItems([...args], boostCounterWindow): void {
  let alpha: number = 1;
  let timer: Phaser.Time.TimerEvent = this.time.addEvent({
    delay: 30,
    loop: true,
    callback: () => {
      alpha -= 0.1;
      args.forEach(item => {
        item.setAlpha(alpha);
      })
      if (alpha <= 0) {
        moveItems.bind(this)([...args], boostCounterWindow); // двигаем плашку
        timer.remove();
      }
    },
    callbackScope: this
  });
}

function moveItems([...args], boostCounterWindow): void {
  let y = boostCounterWindow.y;
  let [timerText, leaves1, leaves2, countdown, text1, text2] = [...args];
  
  // установка новых позиций
  timerText.setText(this.state.herdBoostTime);
  timerText.x = 430;
  timerText.y = 355;

  countdown.x = 430;
  countdown.y = 360;
  
  leaves1.angle = 90;
  leaves1.x = 455;
  leaves1.y = 420;
  leaves2.angle = 90;
  leaves2.x = 455;
  leaves2.y = 290;

  text1.style.wordWrapWidth = 280;
  text1
    .setText(this.state.lang[`herdBoostTimer${this.state.farm}_1`] + this.state.herdBoostTime + ' ' + this.state.lang.seconds)
    .setFontSize('26px');
  text1.y = 1050;
  
  text2.setText(this.state.lang[`herdBoostTimer${this.state.farm}_2`]);
  text2.y = 1100;

  let timer: Phaser.Time.TimerEvent = this.time.addEvent({
    delay: 5,
    loop: true,
    callback: () => {
      y += 10;
      boostCounterWindow.y = y
      if (y >= 1080) {
        timer.remove();
        showItems.bind(this)([...args], boostCounterWindow) // показывам элементы и создаем мир
      }
    },
    callbackScope: this
  });
}

function showItems([...args], boostCounterWindow): void {

  let [timerText] = [...args];

  const worldItems: any[] = createWorld.bind(this)();  // Создаем мир и записываем элементы в массив, чтобы потом скрыть

  let allItems: any[] = args.concat(worldItems);

  //выходим из сумрака
  let alpha: number = 0;
  let timer: Phaser.Time.TimerEvent = this.time.addEvent({
    delay: 30,
    loop: true,
    callback: () => {
      alpha += 0.1;
      allItems.forEach(item => {
        item.setAlpha(alpha);
      })
      if (alpha > 1) {
        timer.remove();
        createAnimals.bind(this)(timerText, allItems, boostCounterWindow);
      }
    },
    callbackScope: this
  });

}

function createWorld(): any[] {
  let farm: string = this.state.farm.toLowerCase();
    // ярмарка и тент
  let fairy: Phaser.Physics.Arcade.Sprite = this.add.sprite(x, y, `${farm}-merging`).setDepth(y).setAlpha(0);
  
  if (farm === 'sheep') { 
    yTent = y - 24;
    yTextLevel = y + 65;
  } else if (farm === 'chicken') {
    yTent = y - 17;
    yTextLevel = y + 82;
  } else if (farm === 'event') {
    yTent = y - 17;
    yTextLevel = y + 82;
  }
  
  this.mergingArray = []; // массив животных для слияния
  
  this.state.herdBoostAnimals = []; // Обнуляем массив животных для буста

  let tent: Phaser.Physics.Arcade.Sprite = this.add.image(x, yTent, `${farm}-tent`).setDepth(y + 1).setAlpha(0);

  let textLevel: Phaser.GameObjects.Text = this.add.text(x + 80, yTextLevel, this.state[`user${this.state.farm}`].fair, {
    font: '36px Shadow',
    color: '#b5315a'
  }).setOrigin(0.5, 0.5).setDepth(y * 2).setAlpha(0);
  
  if (farm === 'event') textLevel.setText(this.state.userEvent.maxLevelAnimal);
  // дорога
  let road: Phaser.GameObjects.Sprite = this.add.sprite(xRoad, yRoad, `herd-boost-road-${farm}`)
    .setOrigin(0)
    .setDepth(yRoad)
    .setDataEnabled()
    .setAlpha(0);

  // Заборы
  let border1: Phaser.GameObjects.Sprite = this.add.sprite(0, yRoad + 15, `${farm}-horizontal-border-1`).setOrigin(0, 1).setDepth(yRoad + 1).setAlpha(0);
  let border2: Phaser.GameObjects.Sprite = this.add.sprite(0 + 240, yRoad + 15, `${farm}-horizontal-border-2`).setOrigin(0, 1).setDepth(yRoad + 1).setAlpha(0);
  let border3: Phaser.GameObjects.Sprite = this.add.sprite(0, yRoad + road.height + 15, `${farm}-horizontal-border-1`).setOrigin(0, 1).setDepth(yRoad + 1).setAlpha(0);
  let border4: Phaser.GameObjects.Sprite = this.add.sprite(0 + 240, yRoad + road.height  + 15, `${farm}-horizontal-border-2`).setOrigin(0, 1).setDepth(yRoad + 1).setAlpha(0);
  let border5: Phaser.GameObjects.Sprite = this.add.sprite(0 + 480, yRoad + road.height  + 15, `${farm}-horizontal-border-3`).setOrigin(0, 1).setDepth(yRoad + 1).setAlpha(0);

  return [fairy, tent, textLevel, road, border1, border2, border3, border4, border5];
}
  
function createAnimals(timerText, allItems, boostCounterWindow): void {
  let animal: string = this.state.farm.toLowerCase();

  if (this.state.farm === 'Sheep') {
    // дроп зоны 
    let topZone: Phaser.GameObjects.Zone = this.add.zone(x, y - 75, 300, 145).setDropZone(undefined, () => {});
    topZone.type = 'top';
    let bottomZone: Phaser.GameObjects.Zone = this.add.zone(x, y + 70, 300, 145).setDropZone(undefined, () => {});
    bottomZone.type = 'bottom';

    // Для проверки дроп зон
    // let graphics2 = this.add.graphics().setDepth(bottomZone.y * 5);
    // graphics2.lineStyle(2, 0x00ff00);
    // graphics2.strokeRect(bottomZone.x - bottomZone.input.hitArea.width / 2, bottomZone.y - bottomZone.input.hitArea.height / 2, bottomZone.input.hitArea.width, bottomZone.input.hitArea.height);
    // let graphics1 = this.add.graphics().setDepth(topZone.y * 5);
    // graphics1.lineStyle(2, 0xffff00);
    // graphics1.strokeRect(topZone.x - topZone.input.hitArea.width / 2, topZone.y - topZone.input.hitArea.height / 2, topZone.input.hitArea.width, topZone.input.hitArea.height);


  } else if (this.state.farm === 'Chicken') {
    // дроп зоны 
    let leftZone: Phaser.GameObjects.Zone = this.add.zone(x - 75, y - 30, 145, 300).setDropZone(undefined, () => {});
    leftZone.type = 'left';
    
    let rightZone: Phaser.GameObjects.Zone = this.add.zone(x + 70, y - 30, 145, 300).setDropZone(undefined, () => {});
    rightZone.type = 'right';

    // для проверки дроп зон
    // let graphics1 = this.add.graphics().setDepth(leftZone.y * 5);
    // graphics1.lineStyle(2, 0xffff00);
    // graphics1.strokeRect(leftZone.x - leftZone.input.hitArea.width / 2, leftZone.y - leftZone.input.hitArea.height / 2, leftZone.input.hitArea.width, leftZone.input.hitArea.height);

    // let graphics2 = this.add.graphics().setDepth(rightZone.y * 5);
    // graphics2.lineStyle(2, 0x00ff00);
    // graphics2.strokeRect(rightZone.x - rightZone.input.hitArea.width / 2, rightZone.y - rightZone.input.hitArea.height / 2, rightZone.input.hitArea.width, rightZone.input.hitArea.height);

  } else if (this.state.farm === 'Cow') {
    // дроп зоны 
    let leftZone: Phaser.GameObjects.Zone = this.add.zone(x - 75, y - 30, 145, 300).setDropZone(undefined, () => {});
    leftZone.type = 'left';
    
    let rightZone: Phaser.GameObjects.Zone = this.add.zone(x + 70, y - 30, 145, 300).setDropZone(undefined, () => {});
    rightZone.type = 'right';

    // для проверки дроп зон
    // let graphics1 = this.add.graphics().setDepth(leftZone.y * 5);
    // graphics1.lineStyle(2, 0xffff00);
    // graphics1.strokeRect(leftZone.x - leftZone.input.hitArea.width / 2, leftZone.y - leftZone.input.hitArea.height / 2, leftZone.input.hitArea.width, leftZone.input.hitArea.height);

    // let graphics2 = this.add.graphics().setDepth(rightZone.y * 5);
    // graphics2.lineStyle(2, 0x00ff00);
    // graphics2.strokeRect(rightZone.x - rightZone.input.hitArea.width / 2, rightZone.y - rightZone.input.hitArea.height / 2, rightZone.input.hitArea.width, rightZone.input.hitArea.height);

  } else if (this.state.farm === 'event') {
    // дроп зоны 
    let leftZone: Phaser.GameObjects.Zone = this.add.zone(x - 75, y - 30, 145, 300).setDropZone(undefined, () => {});
    leftZone.type = 'left';
    
    let rightZone: Phaser.GameObjects.Zone = this.add.zone(x + 70, y - 30, 145, 300).setDropZone(undefined, () => {});
    rightZone.type = 'right';

    // для проверки дроп зон
    // let graphics1 = this.add.graphics().setDepth(leftZone.y * 5);
    // graphics1.lineStyle(2, 0xffff00);
    // graphics1.strokeRect(leftZone.x - leftZone.input.hitArea.width / 2, leftZone.y - leftZone.input.hitArea.height / 2, leftZone.input.hitArea.width, leftZone.input.hitArea.height);

    // let graphics2 = this.add.graphics().setDepth(rightZone.y * 5);
    // graphics2.lineStyle(2, 0x00ff00);
    // graphics2.strokeRect(rightZone.x - rightZone.input.hitArea.width / 2, rightZone.y - rightZone.input.hitArea.height / 2, rightZone.input.hitArea.width, rightZone.input.hitArea.height);

  }

  // создаю группу для животных
  this.animalForBoost = this.physics.add.group();

  let currentTime: number = this.state.herdBoostTime;

  let timerCreate: Phaser.Time.TimerEvent = this.time.addEvent({
    delay: this.state.herdBoostDelay,
    loop: true,
    callback: () => {
      this.getRandomAnimal(animal); 
    },
    callbackScope: this
  });
  
  // кристалическая овца
  let timerCreateCrystalAnimal: Phaser.Time.TimerEvent = this.time.addEvent({
    delay: this.state.herdBoostTime / 3 * 1000,
    loop: true,
    callback: () => {
      if (this.state.farm === 'Event') return;
      this.getRandomAnimal(animal, true);
    },
    callbackScope: this
  });

  // таймер переключающий время
  let timerTickText: Phaser.Time.TimerEvent = this.time.addEvent({
    delay: 1000,
    loop: true,
    callback: () => {
      --currentTime;
      timerText.setText(currentTime);
      if (currentTime <= 0) {
        this.animalForBoost.children.entries.forEach((sheep) => {
          sheep.data.values.woolSprite?.destroy();
        });
        this.animalForBoost.destroy(true);
        timerCreate.remove();
        timerTickText.remove();
        timerCreateCrystalAnimal.remove();
        showEndScore.bind(this)(allItems, boostCounterWindow);
      }
    },
    callbackScope: this
  });
}

function showEndScore(items, boostCounterWindow): void {
  let alpha: number = 1;
  let timer: Phaser.Time.TimerEvent = this.time.addEvent({
    delay: 30,
    loop: true,
    callback: () => {
      alpha -= 0.1;
      items.forEach(item => {
        item.setAlpha(alpha);
      })
      if (alpha <= 0) {
        timer.remove();
        moveToEnd.bind(this)(boostCounterWindow);
      }
    },
    callbackScope: this
  });
}

function createScoreText(): void {
  this.add.text(360, 380, this.state.lang[`herdBoostScore${this.state.farm}`] + this.state.herdBoostAnimals.length, {
    font: '30px Shadow',
    color: '#ce9457',
    align: 'center',
    wordWrap: {width: 350}
  }).setOrigin(0.5, 0.5).setDepth(2);

  this.add.text(360, 440, this.state.lang.herdBoostNext, {
    font: '20px Shadow',
    color: '#946939',
    align: 'center'
  }).setOrigin(0.5, 0.5).setDepth(2);
}

function moveToEnd(boostCounterWindow): void {
  let y = boostCounterWindow.y;
  let timer: Phaser.Time.TimerEvent = this.time.addEvent({
    delay: 5,
    loop: true,
    callback: () => {
      y -= 10;
      boostCounterWindow.y = y
      if (y <= 400) {
        timer.remove();
        createScoreText.bind(this)();
        stopBoostScene.bind(this)();
      }
    },
    callbackScope: this
  });
}

function stopBoostScene(): void {
  this.input.on('pointerdown', ()=>{
    this.state.user.diamonds -= this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost;
    if (this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost > 0) {
      this.game.scene.keys[this.state.farm].tryTask(15, 0, this.state.herdBoostPrice);
      this.state.amplitude.getInstance().logEvent('diamonds_spent', {
        type: 'herd',
        count: this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost,
        farm_id: this.state.farm,
        chapter: this.state[`user${this.state.farm}`].part,
      });
    }
    this.state[`user${this.state.farm}`].takenHerdBoost++;
    this.scene.stop();
    this.game.scene.keys[this.state.farm].createBoostAnimal();
  });
}

function getRandomAnimal(type: string, crystal: boolean = false): void {
  let {x, y, side, _id} = this.getRandomStartPosition(); 

  // Изменение рандома
  let randomArray: number[] = [];
  let max: number = this.state[`user${this.state.farm}`].fair;
  if (this.state.farm === 'Event') max = this.state[`user${this.state.farm}`].maxLevelAnimal;

  for (let i: number = 0; i < max; i++) {
    randomArray.push(i ** 2 * 100);
  }

  let randomIndex: number = random(0, max ** 2 * 100);
  let randomType: number;

  
  for (let i = randomArray.length - 1; i >= 0; i--) {
    if (randomIndex >= randomArray[i]) {
      randomType = randomArray.length - i;
      break;
    } 
  }

  // кристалическое животное?
  if (crystal) randomType = 0;

  let animal: Phaser.Physics.Arcade.Sprite = this.animalForBoost.create(x, y, type + randomType)
    .setDepth(y)
    .setInteractive()
    .setDataEnabled();

  animal.data.values.velocity = -this.state.herdBoostSpeedAnimal;

  if (side === 'right') {
    animal.data.values.velocity = this.state.herdBoostSpeedAnimal;
  }

  animal.data.values.velocity += random(-20, 20);
  this.input.setDraggable(animal); 
  animal.data.values.type = randomType;
  animal.data.values.side = side; 
  animal.data.values._id = _id;
  animal.data.values.drag = false;
  animal.data.values.merging = false; // метка животного в мерджинге
  animal.setDepth(animal.y);

  animal.setVelocityX(animal.data.values.velocity);
  // случайная шерсть если овца
  if (type === 'sheep') {

    let stage: number = random(2, 4); 

    animal.data.values.stage = stage;
  
    animal.data.values.woolSprite = this.physics.add.sprite(x, y, type + '-' + animal.data.values.side + '-' + animal.data.values.type + '-' + animal.data.values.stage);
  
    animal.data.values.woolSprite.setDepth(y)
      .setVelocityX(animal.data.values.velocity);
    animal.data.values.woolSprite.setDepth(animal.y);
  }
  

  animal.play(type + '-move-' + animal.data.values.side + animal.data.values.type);
  drag.bind(this)(animal);
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

  return {x, y, side, _id};
}

function drag(animal: Phaser.Physics.Arcade.Sprite): void {
  
  if (animal.body === null) return;
  this.input.on('dragstart', (pointer: any, animal: Phaser.Physics.Arcade.Sprite): void => {

    if (animal.data.values.merging) this.mergingArray = []; // если животное из мерджа то очистить массив
    animal.data.values.merging = false; // снимаем метку с животных после попытки мерджа
    animal.data.values.drag = true;
    animal.setVelocity(0, 0); // отменяем передвижение
    animal.data.values.woolSprite?.setVelocity(0, 0);
    animal.setCollideWorldBounds(true); // чтобы не могли перетащить за пределы
      // анимация
    animal.anims.play(this.state.farm.toLowerCase() + '-stay-' + animal.data.values.side + animal.data.values.type, true);
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
    if (animal.body === null) return;
    if (!animal.data.values.merging) {
      if (zone.type === 'left') {
        checkMerging.bind(this)(animal, 'left');
      } else if (zone.type === 'top') {
        checkMerging.bind(this)(animal, 'top');
      } else if (zone.type === 'right') {
        checkMerging.bind(this)(animal, 'right');
      } else if (zone.type === 'bottom') {
        checkMerging.bind(this)(animal, 'bottom');
      }
    }
  });
  
  this.input.on('dragend', (pointer: any, animal: Phaser.Physics.Arcade.Sprite): void => {
    
    if (animal.data) { // существует ли еще dataManager животного
      
      if (animal.data.values.drag === false) return;

      animal.data.values.drag = false;
  
      if ((animal.y < 480 && animal.x < 480) || animal.y > 960 || animal.y < 200) {
        MergingCloud.create(this, animal, true);
        animal.data?.values.woolSprite?.destroy();
        animal.destroy();
          
      } else {
        if (animal.data.values.merging) {

          animal.setVelocityX(0);
          animal.data.values.woolSprite?.setVelocityX(0);
          animal.data.values.side = 'right';
        } else {
          // проверяем в какую сторону нужно отправить овцу
          animal.setCollideWorldBounds(false);
          
          if (animal.data.values.side === 'right') {
            animal.data.values.velocity = this.state.herdBoostSpeedAnimal;
          } else  if (animal.data.values.side === 'left') {
            animal.data.values.velocity = -this.state.herdBoostSpeedAnimal;
          }
          animal.setDepth(animal.y);
          animal.data.values.woolSprite?.setDepth(animal.y);
          animal.setVelocityX(animal.data.values.velocity);
          animal.data.values.woolSprite?.setVelocityX(animal.data.values.velocity);
          animal.play(this.state.farm.toLowerCase() + '-move-' + animal.data.values.side + animal.data.values.type);
        }
      }
    }
  });
}

function checkMerging(animal: Phaser.Physics.Arcade.Sprite, position: string): void {
  if (animal) {

    animal.data.values.merging = true;
    
    let check = this.mergingArray.find((data: any) => data._id === animal.data.values._id);
    
    if (check === undefined) {
      if (this.mergingArray.length === 1 && this.mergingArray[0].position === position) {
        if (position === 'top') position = 'bottom';
        else if (position === 'bottom') position = 'top';
        if (position === 'left') position = 'right';
        else if (position === 'right') position = 'left';
      };
  
      this.mergingArray.push({
        _id: animal.data.values._id,
        type: animal.data.values.type,
        position: position
      })
  
      // проверка позиции для овец
      if (position === 'top') {
  
        if (animal.data.values.side === 'left') {
  
          animal.data.values.side = 'right';
          animal.data.values.woolSprite.setTexture(this.state.farm.toLowerCase()+ '-' + animal.data.values.side + '-' + animal.data.values.type + '-' + animal.data.values.stage);
        
        }
  
        animal.anims.play(this.state.farm.toLowerCase() + '-stay-right' + animal.data.values.type, true);
        animal.y = y - 100;
        animal.x = x - 25;
        animal.data.values.woolSprite.x = animal.x;
        animal.data.values.woolSprite.y = animal.y;
    
      } else if (position === 'bottom') {
  
        if (animal.data.values.side === 'left') {
  
          animal.data.values.side = 'right';
          animal.data.values.woolSprite.setTexture(this.state.farm.toLowerCase()+ '-' + animal.data.values.side + '-' + animal.data.values.type + '-' + animal.data.values.stage);
        
        }
  
        animal.anims.play(this.state.farm.toLowerCase() + '-stay-right' + animal.data.values.type, true);
        animal.y = y + 20;
        animal.x = x - 25;
        animal.data.values.woolSprite.x = animal.x;
        animal.data.values.woolSprite.y = animal.y;
      }
  
      // проверка позиции для кур
      if (position === 'left') {
        if (animal.data.values.side === 'left') {
  
          animal.data.values.side = 'right';
  
        }
  
        animal.anims.play(this.state.farm.toLowerCase() + '-stay-right' + animal.data.values.type, true);
        animal.y = y;
        animal.x = x - 50;
  
      } else if (position === 'right') {
  
        if (animal.data.values.side === 'left') {
          animal.data.values.side = 'right';
  
        }
  
        animal.anims.play(this.state.farm.toLowerCase() + '-stay-right' + animal.data.values.type, true);
        animal.y = y;
        animal.x = x + 50;
      }
    }
    
    // проверяем совпадение
    if (this.mergingArray.length === 2) {
  
      let animal1: Phaser.Physics.Arcade.Sprite = this.animalForBoost.children.entries.find((data: any) => data.data.values._id === this.mergingArray[0]._id);
      let animal2: Phaser.Physics.Arcade.Sprite = this.animalForBoost.children.entries.find((data: any) => data.data.values._id === this.mergingArray[1]._id);
      
      if (animal1 && animal2) {
        if (animal1?.data.values.type === animal2?.data.values.type) {
          let newType = animal.data.values.type < this.state[`${this.state.farm.toLowerCase()}Settings`][`${this.state.farm.toLowerCase()}Settings`].length
            ? animal.data.values.type + 1
            : animal.data.values.type;
          if (animal1.data.values.type === 0 && animal2.data.values.type === 0) newType = 0;
          this.state.herdBoostAnimals.push(newType);
  
          this.time.addEvent({ delay: 100, callback: (): void => {
            MergingCloud.create(this, { x, y });
            animal1?.data?.values.woolSprite?.destroy();
            animal2?.data?.values.woolSprite?.destroy();
            animal1?.destroy();
            animal2?.destroy();
          }, callbackScope: this, loop: false });
        } else {
          this.time.addEvent({ delay: 100, callback: (): void => {
            MergingCloud.create(this, { x, y }, true);
            animal1?.data?.values.woolSprite?.destroy();
            animal2?.data?.values.woolSprite?.destroy();
            animal1?.destroy();
            animal2?.destroy();
          }, callbackScope: this, loop: false });
        }
        this.mergingArray = [];
      }
    }
  }
}

export {
  herdBoostWindow,
  getRandomAnimal,
  getRandomStartPosition
};