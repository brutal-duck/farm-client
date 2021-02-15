// окно подтверждения изгнания
import { random, getRandomBool, randomString, shortTime} from "../../general/basic";

function confirmExpelAnimal(): void {
    
  this.textHeader.setText(this.state.lang.expelChicken); // заменить тексты

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 60, this.state.lang.confirmExpelChicken, {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: { width: 400 }
  }).setOrigin(0.5, 0.5);

  let button = this.bigButton('red', 'center', 40, this.state.lang.expel);
  this.clickModalBtn(button, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].expelAnimal();
  });

  let cancel = this.bigButton('yellow', 'center', 120, this.state.lang.cancel);
  this.clickModalBtn(cancel, (): void => {
    this.state.animal.expel = false;
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  });

  this.resizeWindow(250);

}

// окно конвертора куриной фермы
function eventConvertor(): void {

  this.textHeader.setText(this.state.lang.exchange);

  if (this.state.convertor.type === 1) {

    this.resizeWindow(300);

    let count: number | string = this.shortNum(this.state.convertor.count);
    let length: number = String(count).length * 10 + 15;

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 140, this.state.lang.rememberSellEggs, {
      font: '26px Bip',
      color: '#57A90E',
      align: 'center',
      wordWrap: { width: 440 }
    }).setOrigin(0.5, 0);

    let notEnaugh: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - length, this.cameras.main.centerY - 10, this.state.lang.notEnoughForYou, {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    let border = notEnaugh.getBounds();

    this.add.text(border.right + 50, this.cameras.main.centerY - 10, count, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center'
    }).setOrigin(0, 0.5);

    this.add.sprite(border.right + 5, this.cameras.main.centerY - 10, 'eventCoin')
      .setOrigin(0, 0.5)
      .setScale(0.15);

      
    if (this.state.convertor.diamonds === 1 && this.state.readyAd) {

      let right = {
        icon: 'ad-icon',
        text: ''
      }

      let ad = this.bigButton('green', 'left', 60, this.state.lang.addCoins, right);
      this.clickModalBtn(ad, (): void => {

        this.game.scene.keys[this.state.farm].watchAd(1);
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        
      });

    } else {

      // let right = {
      //   icon: 'diamond',
      //   text: shortNum(this.state.convertor.diamonds)
      // }
    
      // let pay = this.bigButton('green', 'left', 60, this.state.lang.surcharge, right);
      // this.clickModalBtn(pay, (): void => {
      //   this.scene.stop();
      //   this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      //   this.game.scene.keys[this.state.farm].exchange();
      // });

      let btn = this.bigButton('green', 'center', 60, this.state.lang.goExchanger);
      this.clickModalBtn(btn, (): void => {
        let modal: Imodal = {
          type: 2,
          shopType: 2
        }
        this.state.modal = modal;
        this.scene.stop();
        this.scene.start('Modal', this.state);

      });
    }
  
    let cancel = this.bigButton('yellow', 'center', 140, this.state.lang.cancel);
    this.clickModalBtn(cancel, (): void => {
      if (this.state.boughtFeedBoost) {
        this.game.scene.keys[`${this.state.farm}Bars`].showFeedTime();
        this.state.boughtFeedBoost = false;
      };
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    });

  } else if (this.state.convertor.type === 2) {
    
    this.resizeWindow(280);

    let count: number | string = this.shortNum(this.state.convertor.count);
    let length: number = String(count).length * 10 + 15;

    let notEnaugh: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - length, this.cameras.main.centerY - 55, this.state.lang.notEnoughForYou, {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    let border = notEnaugh.getBounds();

    this.add.text(border.right + 50, this.cameras.main.centerY - 55, count, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center'
    }).setOrigin(0, 0.5);

    this.add.sprite(border.right + 5, this.cameras.main.centerY - 55, 'diamond')
      .setOrigin(0, 0.5)
      .setScale(0.15);

    let pay = this.bigButton('green', 'center', 40, this.state.lang.buy);
    this.clickModalBtn(pay, (): void => {

      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].showBank();

    });

    let cancel = this.bigButton('yellow', 'center', 120, this.state.lang.cancel);
    this.clickModalBtn(cancel, (): void => {
      if (this.state.boughtFeedBoost) {
        this.game.scene.keys[`${this.state.farm}Bars`].showFeedTime();
        this.state.boughtFeedBoost = false;
      };
      
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    });

  }

}

function buyEventTerritory(): void {
  this.textHeader.setText(this.state.lang.buyTerritory);

  let settings: IeventTerritoriesPrice = this.state.eventSettings.territoriesEventPrice.find((data: IeventTerritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position);

  if (this.state.userEvent.maxLevelAnimal >= settings.unlock) {
    if (settings.diamond > 0) {
      // 70% от суммы покупки  
      let right = {
        icon: 'diamond',
        text: settings.diamond
      }
    
      let button = this.bigButton('yellow', 'left', 20, this.state.lang.buyTerritory, right);
      this.clickModalBtn(button, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].buyTerritory();
      });

    } else {

      // 70% от суммы покупки
      let price = Math.round((settings.price / 100) * 70);
  
      let right = {
        icon: 'eventCoin',
        text: this.shortNum(price)
      }
    
      let button = this.bigButton('yellow', 'left', 20, this.state.lang.buyTerritory, right);
      this.clickModalBtn(button, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].buyTerritory();
      });

    }
    
  } else {

    let right = {
      icon: 'lock',
      text: this.state.lang.shortLevel + ' ' + settings.unlock
    }
  
    this.bigButton('grey', 'left', 20, this.state.lang.buyTerritory, right);

  }
  
  this.resizeWindow(130);
}

// окно улучшения собирателя 
function improveCollectorEvent(): void {

  this.textHeader.setText(this.state.lang.eggCollector + ' ' + this.state.userEvent.collectorLevel + ' ' + this.state.lang.shortLevel + '.');

  let thisLevel: IcollectorSettings = this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userEvent.collectorLevel);
  let nextLevel: IcollectorSettings = this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userEvent.collectorLevel + 1);

  let speedText: string = this.state.lang.speed + ': ' + thisLevel.speed + ' / ' + this.state.lang.seconds;
  let speed: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 80, speedText, {
    font: '34px Bip',
    color: '#925C28'
  });
  
  let durationText: string = this.state.lang.duration + ': ' + thisLevel.time + ' ' + this.state.lang.minutes;
  let duration: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 25, durationText, {
    font: '34px Bip',
    color: '#925C28'
  });

  let icon: string;

  if (nextLevel.time > thisLevel.time) {

    let position: Iposition = {
      x: duration.getBounds().right + 10,
      y: duration.y
    }
    let text: string = '(+' + (nextLevel.time - thisLevel.time) + ' ' + this.state.lang.shortMinutes +  ')';
    this.add.text(position.x, position.y, text, {
      font: '34px Bip',
      color: '#57A90E'
    });
    
  } else if (nextLevel.speed > thisLevel.speed) {

    let position: Iposition = {
      x: speed.getBounds().right + 10,
      y: speed.y
    }
    let text: string = '(+' + (nextLevel.speed - thisLevel.speed).toFixed(1) + ' ' + this.state.lang.seconds +  ')';
    this.add.text(position.x, position.y, text, {
      font: '34px Bip',
      color: '#57A90E'
    });

  }

  if (this.state.userEvent.maxLevelAnimal >= nextLevel.chapter) {

    if (nextLevel.diamonds) icon = 'diamond';
    else icon = 'eventCoin';

    let right = {
      icon: icon,
      text: String(nextLevel.price)
    }
    let improve = this.bigButton('green', 'left', 90, this.state.lang.improve, right);
    this.clickModalBtn(improve, (): void => {

      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].improveCollector();

    });

  } else {

    let improve = {
      icon: 'lock',
      text: this.state.lang.shortPart + ' ' + nextLevel.chapter
    }
    this.bigButton('grey', 'left', 90, this.state.lang.improve, improve);

  }

  this.resizeWindow(250);
  
}

let x: number = 600;
let y: number = 360;
let yTent: number;
let yTextLevel: number;
let xRoad: number = 0;
let yRoad: number = 480;

function herdBoostEventWindow(): void {
  
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
  timerText.x = 140;
  timerText.y = 1080;

  countdown.x = 140;
  countdown.y = 1085;

  leaves1.angle = 90;
  leaves1.x = 135;
  leaves1.y = 1140;
  leaves2.angle = 90;
  leaves2.x = 135;
  leaves2.y = 1015;

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
  
  if (farm === 'event') {
    yTent = y - 17;
    yTextLevel = y + 82;
  }
  
  this.mergingArray = []; // массив животных для слияния
  this.state.herdBoostAnimals = [];
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


  // создаю группу для животных
  this.animalForBoost = this.physics.add.group();
  flyAnimal.bind(this)(); // полет животных
  let currentTime: number = this.state.herdBoostTime;

  let timerCreate: Phaser.Time.TimerEvent = this.time.addEvent({
    delay: this.state.herdBoostDelay,
    loop: true,
    callback: () => {
      getRandomAnimal.bind(this)('animal'); 
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
    this.state[`user${this.state.farm}`].takenHerdBoost++;
    this.scene.stop();
    this.game.scene.keys['Event'].startCreateHerdBoostAnimal = true;
  });
}

function getRandomAnimal(type: string): void {
  let {x, y, side, _id} = getRandomStartPosition.bind(this)(); 

  // Изменение рандома
  let randomArray: number[] = [];
  let max: number = this.state[`user${this.state.farm}`].maxLevelAnimal;

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
  animal.data.values.topPosition = false;
  animal.setVelocityX(animal.data.values.velocity);

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
    animal.setVelocity(0, 0); // отменяем передвижение
    animal.data.values.woolSprite?.setVelocity(0, 0);
    animal.setCollideWorldBounds(true); // чтобы не могли перетащить за пределы
  });

  this.input.on('drag', (pointer: any, animal: Phaser.Physics.Arcade.Sprite, dragX: number, dragY: number): void => {
    animal.data.values.drag = true;
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
      } else if (zone.type === 'right') {
        checkMerging.bind(this)(animal, 'right');
      }
    }
  });
  
  this.input.on('dragend', (pointer: any, animal: Phaser.Physics.Arcade.Sprite): void => {
    animal.setCollideWorldBounds(false);
    if (animal.data) { // существует ли еще dataManager животного
      
      animal.data.values.drag === false;
    
      if (animal.data.values.drag === false) return;
  
      if ((animal.y < 480 && animal.x < 480) || animal.y > 960 || animal.y < 200) {
          this.mergingCloud({x: animal.x, y: animal.y}, true); // плохое облако на месте животного
          animal.data?.values.woolSprite?.destroy();
          animal.destroy();
      } else {
        if (animal.data.values.merging) {
          animal.setVelocityX(0);
          animal.data.values.woolSprite?.setVelocityX(0);
          animal.data.values.side = 'right';
        } else {
          // проверяем в какую сторону нужно отправить овцу
          if (animal.data.values.side === 'right') {
            animal.data.values.velocity = this.state.herdBoostSpeedAnimal;
          } else  if (animal.data.values.side === 'left') {
            animal.data.values.velocity = -this.state.herdBoostSpeedAnimal;
          }
          animal.setDepth(animal.y);
          animal.setVelocityX(animal.data.values.velocity);
        }
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
      if (position === 'left') position = 'right';
      else if (position === 'right') position = 'left';
    };

    this.mergingArray.push({
      _id: animal.data.values._id,
      type: animal.data.values.type,
      position: position
    })

    // проверка позиции для кур
    if (position === 'left') {
      if (animal.data.values.side === 'left') {

        animal.data.values.side = 'right';

      }

      animal.y = y;
      animal.x = x - 50;

    } else if (position === 'right') {

      if (animal.data.values.side === 'left') {
        animal.data.values.side = 'right';

      }

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
        this.state.userEvent.herdBoostAnimals.push(newType);

        this.time.addEvent({ delay: 100, callback: (): void => {
          
          this.mergingCloud({x, y}); // создаем на месте ярмарки хорошее облако

          animal1?.data.values.woolSprite?.destroy();
          animal2?.data.values.woolSprite?.destroy();
          animal1?.destroy();
          animal2?.destroy();
        }, callbackScope: this, loop: false });
      } else {
        this.time.addEvent({ delay: 100, callback: (): void => {
        
          this.mergingCloud({x, y}, true); // создаем на месте ярмарки облако

          animal1.data.values.woolSprite?.destroy();
          animal2.data.values.woolSprite?.destroy();
          animal1.destroy();
          animal2.destroy();
        }, callbackScope: this, loop: false });
      }
      this.mergingArray = [];
    }
  }
}

function flyAnimal(): void {

  this.time.addEvent({
    delay: 30,
    callback: (): void => {
      this.animalForBoost?.children?.entries.forEach(animal => {
        if (!animal.data.values.drag && !animal.data.values.merging )
          if (animal.data.values.topPosition) {
            animal.originY -= 0.0065;
            animal.setOrigin(0.5, animal.originY);
            if (animal.originY <= 0.45) animal.data.values.topPosition = false;
            
          } else {
            animal.originY += 0.0065;
            animal.setOrigin(0.5, animal.originY);
            if (animal.originY >= 0.55) animal.data.values.topPosition = true;
          }
        
      });
    },
    loop: true

  });

}

export { 
  confirmExpelAnimal,
  eventConvertor,
  buyEventTerritory,
  improveCollectorEvent,
  herdBoostEventWindow
} 