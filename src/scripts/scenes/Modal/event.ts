// окно подтверждения изгнания
import { random, getRandomBool, randomString, shortTime, romanize, shortNum} from "../../general/basic";
import axios  from 'axios';
import Hint from '../../components/animations/Hint';
import MergingCloud from '../../components/animations/MergingCloud';

function confirmExpelAnimal(): void {
    
  this.textHeader.setText(this.state.lang.expelEventAnimal); // заменить тексты

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 60, this.state.lang.confirmExpelEventAnimal, {
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

    this.state.animal.data.values.expel = false;
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
        this.game.scene.keys[`${this.state.farm}Bars`].hint = Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.feedBoostNative} ${shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang)}`, 2);
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
        this.game.scene.keys[`${this.state.farm}Bars`].hint = Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.feedBoostNative} ${shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang)}`, 2);
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

      let price: number = settings.price;
  
      let right = {
        icon: 'eventCoin',
        text: this.shortNum(price)
      }
    
      let button = this.bigButton('green', 'left', 20, this.state.lang.buyTerritory, right);
      this.clickModalBtn(button, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].buyTerritory();
      });

      this.resizeWindow(130);
  } else {

    let right1 = {
      icon: 'diamond',
      text: settings.diamond
    }
  
    let button = this.bigButton('green', 'left', -15, this.state.lang.buyTerritory, right1);
    this.clickModalBtn(button, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].buyTerritory();
    });

    let right2 = {
      icon: 'lock',
      text: this.state.lang.shortLevel + '. ' + settings.unlock
    }
  
    this.bigButton('grey', 'left', 65, this.state.lang.buyTerritory, right2);

    this.resizeWindow(150);
  }
  
  
}

// окно улучшения собирателя 
function improveCollectorEvent(): void {

  this.textHeader.setText(this.state.lang.resourceCollector + ' ' + this.state.userEvent.collectorLevel + ' ' + this.state.lang.shortLevel + '.');

  let thisLevel: IcollectorSettings = this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userEvent.collectorLevel);
  let nextLevel: IcollectorSettings = this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userEvent.collectorLevel + 1);

  let speedText: string = this.state.lang.power + ': ' + thisLevel.speed + ' ' + this.state.lang.unitEvent + '/' + this.state.lang.seconds;
  let speed: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 80, speedText, {
    font: '30px Bip',
    color: '#925C28'
  });
  
  let durationText: string = this.state.lang.duration + ': ' + thisLevel.time + ' ' + this.state.lang.minutes;
  let duration: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 25, durationText, {
    font: '30px Bip',
    color: '#925C28'
  });

  let icon: string;
  let nextLevelText: Phaser.GameObjects.Text;

  if (nextLevel.time > thisLevel.time) {

    let position: Iposition = {
      x: duration.getBounds().right + 10,
      y: duration.y
    }
    let text: string = '(+' + (nextLevel.time - thisLevel.time) + ' ' + this.state.lang.shortMinutes +  ')';
    nextLevelText = this.add.text(position.x, position.y, text, {
      font: '30px Bip',
      color: '#57A90E'
    });
    
  } else if (nextLevel.speed > thisLevel.speed) {

    let position: Iposition = {
      x: speed.getBounds().right + 10,
      y: speed.y
    }
    let text: string = '(+' + (nextLevel.speed - thisLevel.speed).toFixed(1) + ' ' + this.state.lang.seconds +  ')';
    nextLevelText = this.add.text(position.x, position.y, text, {
      font: '30px Bip',
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

      this.game.scene.keys[this.state.farm].improveCollector();
      this.updateImproveCollectorEvent(improve, speed, duration, nextLevelText);  

    });

  } else {

    let improve = {
      icon: 'lock',
      text: this.state.lang.shortLevel + ' ' + nextLevel.chapter
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
  let fairy: Phaser.Physics.Arcade.Sprite = this.add.sprite(x, y + 5, `${farm}-merging`).setDepth(y).setAlpha(0);
  
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
    // let graphics1 = this.add.graphics().setDepth(leftZone.y * 5);
    // graphics1.lineStyle(2, 0xffff00);
    // graphics1.strokeRect(leftZone.x - leftZone.input.hitArea.width / 2, leftZone.y - leftZone.input.hitArea.height / 2, leftZone.input.hitArea.width, leftZone.input.hitArea.height);

    // let graphics2 = this.add.graphics().setDepth(rightZone.y * 5);
    // graphics2.lineStyle(2, 0x00ff00);
    // graphics2.strokeRect(rightZone.x - rightZone.input.hitArea.width / 2, rightZone.y - rightZone.input.hitArea.height / 2, rightZone.input.hitArea.width, rightZone.input.hitArea.height);


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
        this.animalForBoost.children.entries.forEach((animal) => {
          animal?.data?.values.cloud?.destroy();
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
    console.log(this.state.herdBoostAnimals);
    
  });
}

function getRandomAnimal(type: string): void {
  let {x, y, side, _id} = getRandomStartPosition.bind(this)(); 

  // Изменение рандома
  let randomArray: number[] = [];
  let max: number = this.state[`user${this.state.farm}`].maxLevelAnimal - 4;
  max = max <= 0 ? 1 : max;

  let min: number = this.state[`user${this.state.farm}`].maxLevelAnimal - 14;
  min = min <= 0 ? 0 : min;

  for (let i: number = min; i < max; i++) {
    randomArray.push(i ** 2 * 100);
  }

  let randomIndex: number = random(min + 1 , max ** 2 * 100);
  let randomType: number;
  
  for (let i = randomArray.length - 1; i >= 0; i--) {
    if (randomIndex >= randomArray[i]) {
      randomType = min + randomArray.length - i;
      break;
    } else randomType = min;
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
  animal.setScale(0.8);
  animal.data.values.cloud = this.physics.add.sprite(animal.x, animal.y + animal.height / 2 - 30, 'cloud');
  animal.data.values.cloud.setDepth(y - 1).setVelocityX(animal.data.values.velocity).setScale(0.8);
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

function eventDrag(): void {

  this.input.on('dragstart', (pointer: any, animal: Phaser.Physics.Arcade.Sprite): void => {
    if (animal.body === null) return;
    animal.data.values.drag = true;
    animal.data.values.cloud.setVisible(false);
    if (animal.data.values.merging) this.mergingArray = []; // если животное из мерджа то очистить массив
    animal.data.values.merging = false; // снимаем метку с животных после попытки мерджа
    animal.setVelocity(0, 0); // отменяем передвижение
    animal.data.values.cloud?.setVelocity(0, 0);
    animal?.setCollideWorldBounds(true); // чтобы не могли перетащить за пределы
  });

  this.input.on('drag', (pointer: any, animal: Phaser.Physics.Arcade.Sprite, dragX: number, dragY: number): void => {
    animal.x = dragX;
    animal.y = dragY;
    animal.setDepth(dragY + Math.round((animal.height / 2) + 100));
    if (animal.data.values.cloud) {
      animal.data.values.cloud.x = dragX;
      animal.data.values.cloud.y = dragY + animal.height / 2 - 30;
      animal.data.values.cloud.setDepth(dragY + Math.round((animal.height / 2) + 99));
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
    
    if (animal.data) { // существует ли еще dataManager животного

      if (animal.data.values.drag === false) return;

      animal.data.values.drag = false;
    
      if ((animal.y < 480 && animal.x < 480) || animal.y > 900 || animal.y < 200) {
          MergingCloud.create(this, animal, true);
          animal?.data?.values.cloud?.destroy();
          animal.destroy();
      } else {
        if (animal.data.values.merging) {
          animal.setVelocityX(0);
          animal.data.values.cloud?.setVelocityX(0).setVisible(false);
          animal.data.values.side = 'right';
        } else {
          // проверяем в какую сторону нужно отправить овцу
          animal?.setCollideWorldBounds(false);
          if (animal.data.values.side === 'right') {
            animal.data.values.velocity = this.state.herdBoostSpeedAnimal;
          } else  if (animal.data.values.side === 'left') {
            animal.data.values.velocity = -this.state.herdBoostSpeedAnimal;
          }
          animal.setDepth(animal.y);
          animal.data.values.cloud.setVisible(true);
          animal.setVelocityX(animal.data.values.velocity);
          animal.data.values.cloud.setDepth(animal.y - 1);
          animal.data.values.cloud.setVelocityX(animal.data.values.velocity);
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
          
          MergingCloud.create(this, { x, y });

          animal1?.data?.values.cloud?.destroy();
          animal2?.data?.values.cloud?.destroy();
          animal1?.destroy();
          animal2?.destroy();
        }, callbackScope: this, loop: false });
      } else {
        this.time.addEvent({ delay: 100, callback: (): void => {
        
          MergingCloud.create(this, { x, y }, true);

          animal1?.data?.values.cloud?.destroy();
          animal2?.data?.values.cloud?.destroy();
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
        if (!animal.data.values.drag && !animal.data.values.merging) {

          let coefficient: number = animal.height / animal.data.values.cloud.height;
          let originTerm: number = 0.0065;

          if (animal.data.values.topPosition) {
            animal.originY -= originTerm;
            animal.setOrigin(0.5, animal.originY);
            animal.data.values.cloud.originY -= originTerm * coefficient;
            animal.data.values.cloud.setOrigin(0.5, animal.data.values.cloud.originY);
            if (animal.originY <= 0.45) animal.data.values.topPosition = false;
            
          } else {
            animal.originY += originTerm;
            animal.setOrigin(0.5, animal.originY);
            animal.data.values.cloud.originY += originTerm * coefficient;
            animal.data.values.cloud.setOrigin(0.5, animal.data.values.cloud.originY);
            if (animal.originY >= 0.55) animal.data.values.topPosition = true;
          }

        }
        
      });
    },
    loop: true

  });

}

function eventProgress(): void {
  
  let height: number = 80;
  let doubleProfitPrice: number = 5;
  let ad: boolean = false;

  this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - height, 'autoprogress-bg');

  this.add.text(this.cameras.main.centerX + 58, this.cameras.main.centerY - 148 - height, this.state.lang.offlineTime, {
    font: '21px Shadow',
    color: '#06693e'
  }).setOrigin(1);

  this.add.text(this.cameras.main.centerX + 150, this.cameras.main.centerY - 146 - height, shortTime(this.state.modal.eventParams.offlineTime, this.state.lang), {
    font: '36px Shadow',
    color: '#fff3e1'
  }).setOrigin(0.5, 1).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 3);

  this.add.text(this.cameras.main.centerX + 12, this.cameras.main.centerY - 74 - height, this.state.lang.offlineCollectorTime + ' ' + shortTime(this.state.modal.eventParams.collectorTime, this.state.lang), {
    font: '21px Shadow',
    color: '#fff3e1',
    align: 'center',
    wordWrap: { width: 260 }
  }).setOrigin(0.5, 0.5).setLineSpacing(8);

  this.add.text(this.cameras.main.centerX + 80, this.cameras.main.centerY + 10 - height, '+' + shortNum(this.state.modal.eventParams.offlineProgress), {
    font: '48px Shadow',
    color: '#fff3e1'
  }).setOrigin(0.5, 0.5).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 3);

  this.add.text(this.cameras.main.centerX + 9, this.cameras.main.centerY + 96 - height, this.state.lang.doubleProfit, {
    font: '24px Shadow',
    color: '#643302'
  }).setOrigin(0.5, 0.5);

  // Определение стоимости удвоения
  if (this.state.modal.eventParams.offlineTime >= 1800 && this.state.modal.eventParams.offlineTime <= 7200) doubleProfitPrice = 40
  else if (this.state.modal.eventParams.offlineTime > 7200) doubleProfitPrice = 90;

  // Кнопка удвоения
  let btn: Phaser.GameObjects.Sprite;
  let title: Phaser.GameObjects.Text;
  let img1: Phaser.GameObjects.Sprite;
  let text1: Phaser.GameObjects.Text;

  btn = this.add.sprite(this.cameras.main.centerX + 9, this.cameras.main.centerY + 156 - height, 'purple-btn');
  title = this.add.text(btn.x - 140, btn.y, this.state.lang.pickUp + ' X2', {
    font: '30px Shadow',
    color: '#fff3e1',
  }).setOrigin(0, 0.5).setStroke('#7214a3', 7).setCrop(0, 0, 200, 100);


  if (this.state.readyAd && doubleProfitPrice === 5) {

    img1 = this.add.sprite(btn.x + 100, btn.y, 'ad-icon').setScale(0.8);
    ad = true;

  } else {

    img1 = this.add.sprite(btn.x + 80, btn.y, 'diamond').setScale(0.12);
    text1 = this.add.text(btn.x + 120, btn.y, doubleProfitPrice, {
      font: '30px Shadow',
      color: '#fff3e1',
    }).setOrigin(0.5, 0.5).setStroke('#7214a3', 7); 

  }

  this.clickModalBtn({
    btn: btn,
    title: title,
    text1: text1,
    img1: img1
  }, (): void => {

    this.state.userEvent.money += this.state.modal.eventParams.offlineProgress;

    if (ad && doubleProfitPrice === 5) {

      this.game.scene.keys[this.state.farm].watchAd(5);
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();

    } else if (this.state.user.diamonds - doubleProfitPrice >= 0) {
      
      this.state.user.diamonds -= doubleProfitPrice;
      this.state.amplitude.getInstance().logEvent('diamonds_spent', {
        type: 'event_double_salary',
        count: doubleProfitPrice,
        farm_id: this.state.farm
      });
      this.state.userEvent.money += this.state.modal.eventParams.offlineProgress;
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
      this.game.scene.keys['EventBars'].plusMoney();

    } else {
      
      this.state.convertor = {
        fun: 0,
        count: doubleProfitPrice - this.state.user.diamonds,
        diamonds: doubleProfitPrice - this.state.user.diamonds,
        type: 1
      }
  
      this.game.scene.keys[this.state.farm].exchange();
    }

  })


  // Кнопка 'Забрать'
  this.time.addEvent({ delay: 3000, callback: (): void => {

    let pickUp = this.shopButton(this.cameras.main.centerX + 9, this.cameras.main.centerY + 276 - height, this.state.lang.pickUp);
    this.clickShopBtn(pickUp, (): void => {
      
      this.state.userEvent.money += this.state.modal.eventParams.offlineProgress;
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
  
    });

  }, callbackScope: this, loop: false });

  this.openModal(this.cameras.main);


}


function eventRatings(): void {

  this.eventRatingsNames = [];
  this.eventRatingsScores = [];
  let priceElements: modalElementType[] = [];
  let placeAndName: Phaser.GameObjects.Text;
  let score: Phaser.GameObjects.Text;
  let placeAndNameX: number = this.cameras.main.centerX - 206;
  let placeAndNameY: number = this.cameras.main.centerY + 130;
  let padding: number = 24;

  // Спрайты
  this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'rating-bg');
  let rulesBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX - 130, this.cameras.main.centerY - 264, 'rating-rules-btn').setInteractive();
  let priceBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 126, this.cameras.main.centerY - 264, 'rating-price-btn').setInteractive();
  let closeBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 268, this.cameras.main.centerY - 452, 'tasks-close').setOrigin(0.5, 0.5).setScale(1.15);

  // Заголовок
  this.add.text(this.cameras.main.centerX + 20, this.cameras.main.centerY - 430, this.state.lang.unicornField, {
    font: '42px Shadow',
    color: '#FFF7E6',
    align: 'center',
    wordWrap: { width: 400 }
  }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 2);

  // 'Условия'
  let rules: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 86, this.cameras.main.centerY - 283, this.state.lang.eventRules, {
    font: '32px Bip',
    color: '#FFF7E6',
  }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

  // 'Призы'
  let price: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 164, this.cameras.main.centerY - 283, this.state.lang.eventPrice, {
    font: '32px Bip',
    color: '#FFF7E6',
  }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

  // Текст условия
  let rulesText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 186, this.state.lang.eventRulesTеxt, {
    font: '23px Bip',
    color: '#793D0A',
    align: 'center',
    wordWrap: { width: 380 }
  }).setOrigin(0.5, 0.5).setDepth(2).setLineSpacing(0.2);
  let rulesText2: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 97, this.state.lang.eventRulesTеxt2, {
    font: '23px Bip',
    color: '#793D0A',
    align: 'center',
    wordWrap: { width: 430 }
  }).setOrigin(0.5, 0.5).setDepth(2).setLineSpacing(0.2);

  // Времени осталось
  let eventLeftText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 100, this.cameras.main.centerY - 25, this.state.lang.eventRulesLeft, {
    font: '24px Bip',
    color: '#793D0A',
  }).setOrigin(1, 0.5).setDepth(2);
  
  // Время
  this.eventLeftTime = this.add.text(this.cameras.main.centerX + 114, this.cameras.main.centerY - 25, this.shortTime(this.state.progress.event.endTime, this.state.lang), {
    font: '24px Bip',
    color: '#459D1A',
  }).setOrigin(0, 0.5).setDepth(2);

  // Призы
  let topPlaces: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX - 140, this.cameras.main.centerY - 170, 'rating-places').setScale(0.9).setVisible(false);

  let priceTopPlaces: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY - 210,
    '1 ' + this.state.lang.eventPlace + '\n' + '2 ' + this.state.lang.eventPlace + '\n' + '3 ' + this.state.lang.eventPlace, {
    font: 'Bold 21px Bip',
    color: '#793D0A',
    align: 'right'
  }).setOrigin(1, 0).setVisible(false);

  let pricePlaces: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY - 124,
    '4-10 ' + this.state.lang.eventPlace + '\n' + '11-100 ' + this.state.lang.eventPlace + '\n' + '101-500 ' + this.state.lang.eventPlace + '\n' + '500+ ' + this.state.lang.eventPlace, {
    font: '21px Bip',
    color: '#793D0A',
    align: 'right'
  }).setOrigin(1, 0).setVisible(false);

  let priceTopPlacesDiamonds: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 50, this.cameras.main.centerY - 210,
    '- 1000\n' + '- 700\n' + '- 400', {
    font: 'Bold 21px Bip',
    color: '#793D0A',
    align: 'left'
  }).setOrigin(0, 0).setVisible(false);

  let pricePlacesDiamonds: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 50, this.cameras.main.centerY - 124,
    '- 300\n- 100\n- 50\n- 20', {
    font: '21px Bip',
    color: '#793D0A',
    align: 'left'
  }).setOrigin(0, 0).setVisible(false);

  // Кучки кристалов
  let diamond1: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 188, this.cameras.main.centerY - 196, 'diamond').setScale(0.1).setAngle(45).setVisible(false);
  let diamond2: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 175, this.cameras.main.centerY - 200, 'diamond').setScale(0.13).setVisible(false);
  let diamond3: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 165, this.cameras.main.centerY - 191, 'diamond').setScale(0.09).setAngle(-30).setVisible(false);

  let diamond4: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 168, this.cameras.main.centerY - 164, 'diamond').setScale(0.10).setAngle(-12).setVisible(false);
  let diamond5: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 180, this.cameras.main.centerY - 169, 'diamond').setScale(0.12).setAngle(19).setVisible(false);

  let diamond6: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 178, this.cameras.main.centerY - 139, 'diamond').setScale(0.12).setAngle(-19).setVisible(false);
  let diamond7: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 109, 'diamond').setScale(0.10).setVisible(false);
  let diamond8: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 81, 'diamond').setScale(0.09).setVisible(false);
  let diamond9: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 55, 'diamond').setScale(0.08).setVisible(false);
  let diamond10: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 27, 'diamond').setScale(0.08).setVisible(false);


  // 'Рейтинг'
  let rating: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 30, this.cameras.main.centerY + 52, this.state.lang.eventRating.toUpperCase(), {
    font: '34px Bip',
    color: '#FFF7E6',
  }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

  // Затемняем 2ю кнопку
  priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 300, 90);
  price.setTint(0xC0C0C0);

  // Таблица
  for (let i: number = 0; i < 10; i++) {
    
    placeAndName = this.add.text(placeAndNameX, placeAndNameY + padding * Number(i), '', {
      font: '21px Bip',
      color: '#793D0A',
    }).setCrop(0, 0, 260, 100);

    score = this.add.text(placeAndNameX + 280, placeAndNameY + padding * Number(i), '', {
      font: '21px Bip',
      color: '#793D0A',
    });

    if (this.state.progress.event.eventRaitings[i].score !== null) {
      placeAndName.setText(this.state.progress.event.eventRaitings[i].place + '. ' + this.state.progress.event.eventRaitings[i].name).setCrop(0, 0, 260, 100);
      score.setText(this.state.progress.event.eventRaitings[i].score);
      if (i < 3) {
        this.add.sprite(placeAndNameX + 280 + 35, placeAndNameY + padding * Number(i), 'unicorn-status').setOrigin(0, 0).setScale(0.65);
      }
    }

    this.eventRatingsNames.push(placeAndName);
    this.eventRatingsScores.push(score);

  }

  this.line = this.add.text(placeAndNameX, placeAndNameY + 240, '-----', {
    font: '26px Shadow',
    color: '#793D0A',
  })

  this.playerPlaceAndName = this.add.text(placeAndNameX, placeAndNameY + 270, this.state.progress.event.userEventRaiting.place + '. ' + this.state.progress.event.userEventRaiting.name, {
    font: '21px Bip',
    color: '#793D0A',
  }).setCrop(0, 0, 240, 100);

  this.playerScore = this.add.text(placeAndNameX + 280, placeAndNameY + 270, this.state.progress.event.userEventRaiting.score, {
    font: '21px Bip',
    color: '#793D0A',
  })

  if (this.state.progress.event.userEventRaiting.place <= 10) {

    this.line.setVisible(false);
    this.playerPlaceAndName.setVisible(false);
    this.playerScore.setVisible(false);

  }

  priceElements.push(
    topPlaces,
    priceTopPlaces,
    pricePlaces,
    priceTopPlacesDiamonds,
    pricePlacesDiamonds,
    diamond1,
    diamond2,
    diamond3,
    diamond4,
    diamond5,
    diamond6,
    diamond7,
    diamond8,
    diamond9,
    diamond10
  );

  // Нажатие на 'Условия'
  rulesBtn.on('pointerdown', (): void => {

    priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 400, 90);
    price.setTint(0xC0C0C0);
    rulesBtn.setTint(0xffffff).setCrop(0, 0, 400, 150);
    rules.setTint(0xffffff);

    rulesText.setVisible(true);
    rulesText2.setVisible(true);
    eventLeftText.setVisible(true);
    this.eventLeftTime.setVisible(true);

    priceElements.forEach(el => el.setVisible(false));

  });

  // Нажатие на 'Призы'
  priceBtn.on('pointerdown', (): void => {

    rulesBtn.setTint(0xC0C0C0).setCrop(0, 0, 400, 90);
    rules.setTint(0xC0C0C0);
    priceBtn.setTint(0xffffff).setCrop(0, 0, 400, 150);
    price.setTint(0xffffff);

    rulesText.setVisible(false);
    rulesText2.setVisible(false);
    eventLeftText.setVisible(false);
    this.eventLeftTime.setVisible(false);

    priceElements.forEach(el => el.setVisible(true));

  });


  // Закрытие окна
  this.clickButton(closeBtn, (): void => {
    
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.scene.stop('Modal');
    
  });

  this.openModal(this.cameras.main);

}

function endEventModal(): void {
  this.game.scene.keys[this.state.farm].getEventRaiting();
  let height: number = 390;

  this.eventRatingsNames = [];
  this.eventRatingsScores = [];
  let priceElements: modalElementType[] = [];
  let placeAndName: Phaser.GameObjects.Text;
  let score: Phaser.GameObjects.Text;
  let placeAndNameX: number = this.cameras.main.centerX - 206;
  let placeAndNameY: number = this.cameras.main.centerY + 35;
  let padding: number = 24;

  // Спрайты
  this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'raiting-bg-after');
  let rulesBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX - 130, this.cameras.main.centerY - 292, 'rating-rules-btn').setInteractive();
  let priceBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 126, this.cameras.main.centerY - 292, 'rating-price-btn').setInteractive();

  // Заголовок
  this.add.text(this.cameras.main.centerX + 52, this.cameras.main.centerY - 440, this.state.lang.unicornField, {
    font: '40px Shadow',
    color: '#FFF7E6',
    align: 'center',
  }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 2);

  // 'Условия'
  let rules: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 86, this.cameras.main.centerY - 307, this.state.lang.eventRules, {
    font: '32px Bip',
    color: '#FFF7E6',
  }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

  // 'Призы'
  let price: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 164, this.cameras.main.centerY - 307, this.state.lang.eventPrice, {
    font: '32px Bip',
    color: '#FFF7E6',
  }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

  // Текст условия
  let rulesText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 170, this.state.lang.eventRulesAfter, {
    font: '23px Bip',
    color: '#793D0A',
    align: 'center',
    wordWrap: { width: 380 }
  }).setOrigin(0.5, 0.5).setDepth(2).setLineSpacing(0.2);

  let rulesTextStatus: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, rulesText.getBounds().bottom + 15, this.state.lang.eventRulesAfterStatus, {
    font: '23px Bip',
    color: '#793D0A',
    align: 'center',
    wordWrap: { width: 380 },
  }).setOrigin(0.5, 0.5).setDepth(2);

  let status: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, rulesTextStatus.getBounds().bottom + 17, this.state.lang.eventProfileName , {
    font: '24px Bip',
    color: '#459D1A',
    align: 'left',
    wordWrap: { width: 310 }
  }).setOrigin(0.5, 0.5).setDepth(2);
  
  let statusIcon: Phaser.GameObjects.Sprite = this.add.sprite(status.getBounds().left - 10, status.y, 'unicorn-status').setDepth(2).setOrigin(1, 0.5).setDepth(2);

  // // Времени осталось
  // let eventLeftText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 100, this.cameras.main.centerY - 40, this.state.lang.eventRulesLeft, {
  //   font: '24px Bip',
  //   color: '#793D0A',
  // }).setOrigin(1, 0.5).setDepth(2);
  
  // // Время
  // let eventLeftTime: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 114, this.cameras.main.centerY - 40, this.shortTime(this.state.progress.event.endTime, this.state.lang), {
  //   font: '24px Bip',
  //   color: '#459D1A',
  // }).setOrigin(0, 0.5).setDepth(2);

  // Призы
  let topPlaces: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX - 140, this.cameras.main.centerY - 190, 'rating-places').setScale(0.9).setVisible(false);

  let priceTopPlaces: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY - 230,
    '1 ' + this.state.lang.eventPlace + '\n' + '2 ' + this.state.lang.eventPlace + '\n' + '3 ' + this.state.lang.eventPlace, {
    font: 'Bold 21px Bip',
    color: '#793D0A',
    align: 'right'
  }).setOrigin(1, 0).setVisible(false);

  let pricePlaces: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY - 144,
    '4-10 ' + this.state.lang.eventPlace + '\n' + '11-100 ' + this.state.lang.eventPlace + '\n' + '101-500 ' + this.state.lang.eventPlace + '\n' + '500+ ' + this.state.lang.eventPlace, {
    font: '21px Bip',
    color: '#793D0A',
    align: 'right'
  }).setOrigin(1, 0).setVisible(false);

  let priceTopPlacesDiamonds: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 50, this.cameras.main.centerY - 230,
    '- 1000\n' + '- 700\n' + '- 400', {
    font: 'Bold 21px Bip',
    color: '#793D0A',
    align: 'left'
  }).setOrigin(0, 0).setVisible(false);

  let pricePlacesDiamonds: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 50, this.cameras.main.centerY - 144,
    '- 300\n- 100\n- 50\n- 20', {
    font: '21px Bip',
    color: '#793D0A',
    align: 'left'
  }).setOrigin(0, 0).setVisible(false);

  // Кучки кристалов
  let diamond1: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 188, this.cameras.main.centerY - 196 - 20, 'diamond').setScale(0.1).setAngle(45).setVisible(false);
  let diamond2: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 175, this.cameras.main.centerY - 200 - 20, 'diamond').setScale(0.13).setVisible(false);
  let diamond3: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 165, this.cameras.main.centerY - 191 - 20, 'diamond').setScale(0.09).setAngle(-30).setVisible(false);

  let diamond4: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 168, this.cameras.main.centerY - 164 - 20, 'diamond').setScale(0.10).setAngle(-12).setVisible(false);
  let diamond5: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 180, this.cameras.main.centerY - 169 - 20, 'diamond').setScale(0.12).setAngle(19).setVisible(false);

  let diamond6: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 178, this.cameras.main.centerY - 139 - 20, 'diamond').setScale(0.12).setAngle(-19).setVisible(false);
  let diamond7: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 109 - 20, 'diamond').setScale(0.10).setVisible(false);
  let diamond8: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 81 - 20, 'diamond').setScale(0.09).setVisible(false);
  let diamond9: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 55 - 20, 'diamond').setScale(0.08).setVisible(false);
  let diamond10: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 27 - 20, 'diamond').setScale(0.08).setVisible(false);

  // Затемняем 2ю кнопку
  priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 300, 90);
  price.setTint(0xC0C0C0);
  
  // Таблица
  for (let i: number = 0; i < 10; i++) {
    
    placeAndName = this.add.text(placeAndNameX, placeAndNameY + padding * Number(i), '', {
      font: '21px Bip',
      color: '#793D0A',
    }).setCrop(0, 0, 260, 100);

    score = this.add.text(placeAndNameX + 280, placeAndNameY + padding * Number(i), '', {
      font: '21px Bip',
      color: '#793D0A',
    });

    if (this.state.progress.event.eventRaitings[i].score !== null) {
      placeAndName.setText(this.state.progress.event.eventRaitings[i].place + '. ' + this.state.progress.event.eventRaitings[i].name).setCrop(0, 0, 260, 100);
      score.setText(this.state.progress.event.eventRaitings[i].score);
      if (i < 3) {
        this.add.sprite(placeAndNameX + 280 + 35, placeAndNameY + padding * Number(i), 'unicorn-status').setOrigin(0, 0).setScale(0.65);
      }
    }
    
    this.eventRatingsNames.push(placeAndName);
    this.eventRatingsScores.push(score);

  }

  this.line = this.add.text(placeAndNameX, placeAndNameY + 240, '-----', {
    font: '26px Shadow',
    color: '#793D0A',
  })

  this.playerPlaceAndName = this.add.text(placeAndNameX, placeAndNameY + 270, this.state.progress.event.userEventRaiting.place + '. ' + this.state.progress.event.userEventRaiting.name, {
    font: '21px Bip',
    color: '#793D0A',
  }).setCrop(0, 0, 220, 100);

  this.playerScore = this.add.text(placeAndNameX + 280, placeAndNameY + 270, this.state.progress.event.userEventRaiting.score, {
    font: '21px Bip',
    color: '#793D0A',
  })

  if (this.state.progress.event.userEventRaiting.place <= 10) {

    this.line.setVisible(false);
    this.playerPlaceAndName.setVisible(false);
    this.playerScore.setVisible(false);

  }

  priceElements.push(
    topPlaces,
    priceTopPlaces,
    pricePlaces,
    priceTopPlacesDiamonds,
    pricePlacesDiamonds,
    diamond1,
    diamond2,
    diamond3,
    diamond4,
    diamond5,
    diamond6,
    diamond7,
    diamond8,
    diamond9,
    diamond10
  );

  // Нажатие на 'Условия'
  rulesBtn.on('pointerdown', (): void => {

    priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 400, 90);
    price.setTint(0xC0C0C0);
    rulesBtn.setTint(0xffffff).setCrop(0, 0, 400, 150);
    rules.setTint(0xffffff);

    rulesText.setVisible(true);
    rulesTextStatus.setVisible(true);
    statusIcon.setVisible(true);
    status.setVisible(true);

    priceElements.forEach(el => el.setVisible(false));

  });

  // Нажатие на 'Призы'
  priceBtn.on('pointerdown', (): void => {

    rulesBtn.setTint(0xC0C0C0).setCrop(0, 0, 400, 90);
    rules.setTint(0xC0C0C0);
    priceBtn.setTint(0xffffff).setCrop(0, 0, 400, 150);
    price.setTint(0xffffff);

    rulesText.setVisible(false);
    rulesTextStatus.setVisible(false);
    statusIcon.setVisible(false);
    status.setVisible(false);

    priceElements.forEach(el => el.setVisible(true));

  });

  let diamonds: number;
  if (this.state.progress.event.userEventRaiting.place === 1) diamonds = 1000;
  else if (this.state.progress.event.userEventRaiting.place === 2) diamonds = 700;
  else if (this.state.progress.event.userEventRaiting.place === 3) diamonds = 400;
  else if (this.state.progress.event.userEventRaiting.place <= 10) diamonds = 300;
  else if (this.state.progress.event.userEventRaiting.place <= 100) diamonds = 100;
  else if (this.state.progress.event.userEventRaiting.place <= 500) diamonds = 50;
  else if (this.state.progress.event.userEventRaiting.place >= 501) diamonds = 20;
  // кнопка
  let btn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + height, 'repository-sell-btn').setScale(0.7);
  let title: Phaser.GameObjects.Text = this.add.text(btn.getBounds().centerX, this.cameras.main.centerY - 10 + height, this.state.lang.pickUp + ' + ' + diamonds, {
    font: '26px Shadow',
    fill: '#FFFFFF'
  }).setDepth(1).setOrigin(0.5, 0.5);
  title.setShadow(1, 1, '#013220', 0.5);
  
  let coin: Phaser.GameObjects.Sprite = this.add.sprite(title.getBounds().centerX + title.width / 2 + 25, this.cameras.main.centerY - 10 + height, 'diamond')
    .setOrigin(0.5, 0.5)
    .setScale(0.15);
  
  this.clickModalBtn({ btn, title, img1: coin }, (): void => {
    this.state.amplitude.getInstance().logEvent('event_finished', {
      farm_id: 'Event'
    });
    if (this.state.progress.event.userEventRaiting.place <= 3) {

      this.state.user.status = 'unicorn';
      
      const data: any = {
        id: this.state.user.id,
        hash: this.state.user.hash,
        counter: this.state.user.counter,
        status: this.state.user.status
      }
      axios.post(process.env.API + "/newStatus", data)
        .then(res => {
          console.log(res);
        });
    }
    this.state.progress.event.eventPoints = -1;
    this.state.user.additionalTutorial.eventTutorial = 0;

    this.state.user.diamonds += diamonds;
    this.state.amplitude.getInstance().logEvent('diamonds_get', {
      type: 'other',
      farm_id: 'Event',
      count: diamonds
    });
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].autosave();
    this.scene.stop('Modal');
    this.game.scene.keys[this.state.farm + 'Bars'].plusDiamonds();
    
  });
  this.openModal(this.cameras.main);

}

function updateImproveCollectorEvent(
  btn: {
    btn: Phaser.GameObjects.Sprite,
    img1: Phaser.GameObjects.Sprite,
    img2: Phaser.GameObjects.Sprite,
    text1: Phaser.GameObjects.Text
    text2: Phaser.GameObjects.Text
    title: Phaser.GameObjects.Text
  }, 
  speed: Phaser.GameObjects.Text, 
  duration: Phaser.GameObjects.Text, 
  nextLevelText: Phaser.GameObjects.Text): void {

  this.textHeader.setText(this.state.lang.resourceCollector + ' ' + this.state.userEvent.collectorLevel + ' ' + this.state.lang.shortLevel + '.');
  let thisLevel: IcollectorSettings = this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userEvent.collectorLevel);
  let nextLevel: IcollectorSettings = this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userEvent.collectorLevel + 1);

  let speedText: string = this.state.lang.power + ': ' + thisLevel.speed + ' ' + this.state.lang.unitEvent + '/' + this.state.lang.seconds;
  speed.setText(speedText);
    
  let durationText: string = this.state.lang.duration + ': ' + thisLevel.time + ' ' + this.state.lang.minutes;
  duration.setText(durationText);

  let position: Iposition;
  let text: string;
  if (nextLevel.time > thisLevel.time) {

    position = {
      x: duration.getBounds().right + 10,
      y: duration.y
    }
    text = '(+' + (nextLevel.time - thisLevel.time) + ' ' + this.state.lang.shortMinutes +  ')';
    
  } else if (nextLevel.speed > thisLevel.speed) {
    
    position = {
      x: speed.getBounds().right + 10,
      y: speed.y
    }
    text = '(+' + (nextLevel.speed - thisLevel.speed).toFixed(1) + ' ' + this.state.lang.seconds +  ')';
  }
  nextLevelText.setPosition(position.x, position.y);
  nextLevelText.setText(text);
  if (this.state.userEvent.maxLevelAnimal >= nextLevel.chapter) {
    let icon: string;
    if (nextLevel.diamonds) icon = 'diamond';
    else icon = 'eventCoin';

    let right = {
      icon: icon,
      text: String(nextLevel.price)
    }

    btn.text1.setText(right.text);
    btn.img1.setTexture(right.icon);
    btn.img1.setX(570 - btn.text1.displayWidth);

  } else {

    btn.btn.destroy();
    btn.img1.destroy();
    btn.text1.destroy();
    btn.title.destroy();

    let improve = {
      icon: 'lock',
      text: this.state.lang.shortLevel + '. ' + nextLevel.chapter
    }
    this.bigButton('grey', 'left', 90, this.state.lang.improve, improve);

  }

}


export { 
  confirmExpelAnimal,
  eventConvertor,
  buyEventTerritory,
  improveCollectorEvent,
  herdBoostEventWindow,
  eventDrag,
  eventProgress,
  eventRatings,
  endEventModal,
  updateImproveCollectorEvent
} 