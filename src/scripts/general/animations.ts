import { random, getRandomBool } from './basic';

function genAnimations(): void {

  this.anims.create({
    key: 'firework250',
    frames: this.anims.generateFrameNumbers('firework250', { start: 0, end: 7, first: 0 }),
    frameRate: 15
  });

}

// салют
function firework250(x: number, y: number): void {

  let firework: Phaser.GameObjects.Sprite = this.add.sprite(x, y - 30, 'firework250').setDepth(y + 250);
  firework.anims.play('firework250');

  let timeOut: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 500, callback: (): void => {
    firework.destroy();
    timeOut.remove(false);
  }, callbackScope: this, loop: false });

}


// анимация монет и кристаллов
function сurrencyAnimation(): void {

  for (let i in this.сurrency.children.entries) {

    let coin = this.сurrency.children.entries[i];
    let target: Iposition;
    
    if (coin.texture.key !== 'diamond') target = { x: 495, y: 120 }
    else target = { x: 495, y: 30 };

    if (coin.counter > 0 && coin.counter < 25) coin.counter++;
    else if (coin.counter === 25) {

      coin.body.reset(coin.x, coin.y);
      coin.counter = 0;
      let aim: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
      aim.x = target.x;
      aim.y = target.y;
      let distance: number = Phaser.Math.Distance.Between(coin.x, coin.y, target.x, target.y) * 2;
      this.physics.moveToObject(coin, aim, distance);

    } else {

      let distance = Phaser.Math.Distance.Between(coin.x, coin.y, target.x, target.y) * 2;

      if (coin.x < 0 ||
        coin.x > 720 ||
        coin.y < 0 ||
        (distance > coin.distance && coin.distance > 0) ||
        distance < 100) {
        
        coin.destroy();
        
      } else coin.distance = distance;

    }

  }

}


// анимация меню
function menuAnimation(): void {
  
  if (this.menu) {

    if (this.sendwich) {

      this.sendwichTimer++;

      if (this.sendwichTimer >= 250) {
        this.sendwich = false;
        this.sendwichTimer = 0;
        this.menu.setTexture('sandwich');
      }

    }

    if (this.sendwich && this.chat.y > this.height - 230) {
      
      let step: number = this.chat.y - 7;
      let scale: number = this.chat.scale += 0.01;

      if (step <= this.height - 230) {
        step = this.height - 230;
        scale = 1;
      }

      if (this.chat.scale > 1) scale = 1;

      this.chat.y = step;
      this.chat.setScale(scale);

    } else if (!this.sendwich && this.chat.y < this.menu.y) {

      let step: number = this.chat.y + 7;
      let scale: number = this.chat.scale -= 0.03;

      if (step >= this.menu.y) {
        step = this.menu.y;
        scale = 0.8;
      }

      if (this.chat.scale < 0.8) scale = 0.8;
      
      this.chat.y = step;
      this.chat.setScale(scale);

    }

    if (this.sendwich && this.profile.y > this.height - 370) {

      let step: number = this.profile.y - 14;
      let scale: number = this.profile.scale += 0.01;

      if (step <= this.height - 370) {
        step = this.height - 370;
        scale = 1;
      }

      if (this.profile.scale > 1) scale = 1;

      this.profile.y = step;
      this.profile.setScale(scale);

    } else if (!this.sendwich && this.profile.y < this.menu.y) {

      let step: number = this.profile.y + 14;
      let scale: number = this.profile.scale -= 0.03;

      if (step >= this.menu.y) {
        step = this.menu.y;
        scale = 0.8;
      }
      
      if (this.profile.scale < 0.8) scale = 0.8;
      
      this.profile.y = step;
      this.profile.setScale(scale);

    }

  }

}


// анимация пещеры
function cave(): void {

  let user: IuserSheep | IuserChicken | IuserCow;

  if (this.state.farm === 'Sheep') {
    user = this.state.userSheep;
  } else if (this.state.farm === 'Chicken') {
    user = this.state.userChicken;
  } else if (this.state.farm === 'Cow') {
    user = this.state.userCow;
  }
  
  if (user.part >= 3) {

    let cave = this.territories.children.entries.find((data: any) => data.type === 7).cave;

    if (user.diamondAnimalTime === 0) {

      if (!cave.bgAd.visible) cave.bgAd.visible = true;
      if (!cave.free.visible) cave.free.visible = true;

      cave.pulseTimer++;

      if (cave.pulseTimer === 20) cave.setTexture('cave-ready');
      else if (cave.pulseTimer === 40) {
        cave.pulseTimer = 0;
        cave.setTexture('cave-wait');
      }

    } else {

      if (cave.free.visible) cave.free.visible = false;

      if (this.state.readyAd && user.diamondAnimalAd) {

        if (!cave.bgAd.visible) cave.bgAd.visible = true;
        if (!cave.ad.visible) cave.ad.visible = true;

      } else {

        if (cave.bgAd.visible) cave.bgAd.visible = false;
        if (cave.ad.visible) cave.ad.visible = false;

      }

    }

  }

}


// пульсация баланс-баров
function pulseBalance(): void {

  if (this.waterProblem) {

    this.textWater.pulseTimer++;

    if (this.textWater.pulseTimer === 20) this.textWater.setColor('#521400');
    else if (this.textWater.pulseTimer === 40) {
      this.textWater.pulseTimer = 0;
      this.textWater.setColor('#FFFFFF');
    }

  } else if (!this.waterProblem && this.textWater.style.color === '#521400') {
    this.textWater.setColor('#FFFFFF');
  }

  if (this.grassProblem) {

    this.textGrass.pulseTimer++;

    if (this.textGrass.pulseTimer === 20) this.textGrass.setColor('#521400');
    else if (this.textGrass.pulseTimer === 40) {
      this.textGrass.pulseTimer = 0;
      this.textGrass.setColor('#FFFFFF');
    }

  } else if (!this.grassProblem && this.textGrass.style.color === '#521400') {
    this.textGrass.setColor('#FFFFFF');
  }

}


// анимация прибавления кристаллов
function increaseDiamonds(): void {

  if (this.countIncrease > 0) {

    let increase: boolean = true;
    this.increaseAnimation = true;
    this.countIncrease--;

    this.userDiamonds = this.stepsDiamonds[this.countIncrease];

    if (this.countIncrease === 0) this.stepsDiamonds = [];

    this.timeout = this.time.addEvent({ delay: 10, callback: (): void => {

      if (increase) {

        this.diamonds.scale += 0.1;

        if (this.diamonds.scale >= 1.5) increase = false;

      } else {

        this.diamonds.scale -= 0.1;

        if (this.diamonds.scale <= 1) {

          this.diamonds.scale = 1;
          this.increaseAnimation = false;
          this.timeout.remove(false);

        }

      }

    }, callbackScope: this, loop: true });

  }

}


// анимация монет от позиции
function plusDiamondsAnimation(position: Iposition): void {
  
  let y = position.y - this.game.scene.keys[this.state.farm].scrolling.scrollY;

  let diamond = this.сurrency.create(position.x, y, 'diamond').setScale(0.16);

  diamond.counter = 0;

  let target: Iposition = { x: 495, y: 30 }
  let aim: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
  aim.x = target.x;
  aim.y = target.y;
  let distance: number = Phaser.Math.Distance.Between(diamond.x, diamond.y, target.x, target.y) * 2;
  this.physics.moveToObject(diamond, aim, distance);

}


// перетаскивание овец
function dragSheep(sheep: boolean = false): void {

  if (this.showMergPointer) {

    if (!this.mergPointer.start) {

      this.mergPointer.stop = false;
      this.mergPointer.setVisible(true);
      let target: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
      target.x = 585;
      let distance: number = 285;

      if (!sheep) {

        if (this.mergPointer.first) {

          target.y = 300;
          this.mergPointer.x = 450;
          this.mergPointer.y = 520;
          distance = 300;

        } else {

          target.y = 400;
          this.mergPointer.x = 480;
          this.mergPointer.y = 560;
          distance = 270;

        }

      } else {

        this.mergPointer.x = 480;
        this.mergPointer.y = 560;

        target.y = 350;
        let sheep1: any = this.sheep.children.entries[0];
        let sheep2: any = this.sheep.children.entries[1];

        if (sheep1 && sheep2) {

          if ((this.mergPointer.first && !sheep1.merging) || !this.mergPointer.first && sheep2.merging) {
            this.mergPointer.x = sheep1.x;
            this.mergPointer.y = sheep1.y;
          } else {
            this.mergPointer.x = sheep2.x;
            this.mergPointer.y = sheep2.y;
          }

        }

      }

      this.mergPointer.target = target.y;
      
      if (this.mergPointer.scene) {

        this.physics.moveToObject(this.mergPointer, target, distance);
        this.mergPointer.start = true;

      }

    } else {

      if (this.mergPointer.y <= this.mergPointer.target && !this.mergPointer.stop) {

        this.mergPointer.stop = true;
        this.mergPointer.body.reset(this.mergPointer.x, this.mergPointer.y);
        this.mergPointer.first = !this.mergPointer.first;

        this.time.addEvent({ delay: 300, callback: (): void => {
          this.mergPointer.setVisible(false);
        }, callbackScope: this, loop: false });

        this.time.addEvent({ delay: 1000, callback: (): void => {
          this.showMergPointer = true;
          this.mergPointer.start = false;
        }, callbackScope: this, loop: false });

      }

    }

  }

}


// вплывающие сердечки
function hearts(animal: any): void {

  if (animal) {
    
    let counter: number = 0;
    let interval: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 250, callback: (): void => {

      counter++;

      let heart: Phaser.GameObjects.Sprite = this.physics.add.sprite(animal.x + 20, animal.y - 80, 'heart')
        .setDepth(animal.y + 100)
        .setScale(random(8, 10) / 10)
        .setAngle(random(-5, 5));

      let rand: number;
      if (getRandomBool()) rand = random(-30, -20);
      else rand = random(20, 30);

      let target: Iposition = {
        x: animal.x + 20 + rand,
        y: animal.y - 200
      }
      this.physics.moveToObject(heart, target, 100);

      let opacity: number = 1;
      let timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 30, callback: (): void => {

        opacity -= 0.01;
        heart.setAlpha(opacity);

        if (opacity <= 0) {

          heart.destroy();
          timeout.remove(false);

        }
        
      }, callbackScope: this, loop: true });

      if (counter > 2) interval.remove(false);

    }, callbackScope: this, loop: true });
  
  }

}


// появление спрайта овечки
function showSheepSprite(): void {

  if (this.state.tutorial.step === 20 && this.state.tutorial.farm === 1 && !this.showSheep) {

    if (!this.game.scene.keys[this.state.farm].sheep.children.entries[0]?.aim) {

      this.showSheep = true;
      let sheep: Phaser.GameObjects.Sprite = this.add.sprite(360, 600, 'sheep-stay-right1').setAlpha(0);
      let wool: Phaser.GameObjects.Sprite = this.add.sprite(360, 600, 'sheep-right-1-1').setAlpha(0);
      sheep.anims.play('sheep-stay-right1', true);

      let opacity: number = 0;
      let timeEvent: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 30, callback: (): void => {
  
        opacity += 0.05;
        sheep.setAlpha(opacity);
        wool.setAlpha(opacity);
  
        if (opacity >= 1) {
          
          for (let i in this.game.scene.keys[this.state.farm].sheep.children.entries) {
            this.game.scene.keys[this.state.farm].sheep.children.entries[i].setVisible(false);
            this.game.scene.keys[this.state.farm].sheep.children.entries[i].woolSprite.setVisible(false);
            this.game.scene.keys[this.state.farm].sheep.children.entries[i].shaveStatus.setVisible(false);
          }

          timeEvent.remove(false);

        }
  
      }, callbackScope: this, loop: true });

    }

  }

}


// поведение иконки календарика для ежедневных подарков новичка
function calendarAnimation(): void {

  if (this.calendar?.scene) {

    if (this.state.farm === 'Sheep') {

      if (this.state.userSheep.part >= 4 && !this.calendar.visible) {
        this.calendar.setVisible(true);
      } else if (this.state.userSheep.part < 4 && this.calendar.visible) {
        this.calendar.setVisible(false);
      }

    }

    this.calendar.counter++;

    if (this.calendar.counter >= 250) {

      this.calendar.counter = 0;
      let counter: number = 0;
      let timeEvent: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 30, callback: (): void => {

        counter++;

        if (counter <= 7) {

          this.calendar.y--;
          this.calendarText.y--;
          this.calendar.scale += 0.02;
          this.calendarText.scale += 0.02;
        
        } else {
          
          this.calendar.y++;
          this.calendarText.y++;
          this.calendar.scale -= 0.02;
          this.calendarText.scale -= 0.02;

        }
      
        if (counter >= 14) {

          timeEvent.remove(false);
          this.calendar.scale = 1;
          this.calendarText.scale = 1;
          this.calendar.y = 77;
          this.calendarText.y = 85;

        }

      }, callbackScope: this, loop: true });

    }

  }

}


// анимация летящей плашки награды на значек карты
function newbieAwardAnimation(): void {

  let x: number = 195;
  let y: number = this.cameras.main.centerY - 200;
  let image: string = 'newbie-day-0';
  let target: Iposition = { x: 510, y: this.height - 90 }

  if (this.state.daily === 2) {

    x = 355;
    y = this.cameras.main.centerY - 210;
    image = 'newbie-day-1';

  } else if (this.state.daily === 3) {

    x = 515;
    y = this.cameras.main.centerY - 200;
    image = 'newbie-day-2';
    
  } else if (this.state.daily === 4) {

    x = 195;
    y = this.cameras.main.centerY - 30;
    image = 'newbie-day-3';
    
  } else if (this.state.daily === 5) {

    x = 360;
    y = this.cameras.main.centerY - 25;
    image = 'newbie-day-4';
    if (this.state.farm === 'Sheep') target.x = 230;
    
  } else if (this.state.daily === 6) {

    x = 515;
    y = this.cameras.main.centerY - 25;
    image = 'newbie-day-5';
    
  } else if (this.state.daily === 7) {

    x = 195;
    y = this.cameras.main.centerY + 155;
    image = 'newbie-day-6';
    if (this.state.farm === 'Chicken') target.x = 230;
    // нет коров
    
  } else if (this.state.daily === 8) {

    x = 425;
    y = this.cameras.main.centerY + 155;
    image = 'newbie-day-7';
    
  }

  let sprite: Phaser.GameObjects.Sprite = this.physics.add.sprite(x, y, image).setDepth(this.height);

  let aim: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
  aim.x = target.x;
  aim.y = target.y;
  this.physics.moveToObject(sprite, aim, 600);

  let scale: boolean = true;
  let interval: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 20, callback: (): void => {

    if (scale) sprite.scaleX -= 0.1;
    else sprite.scaleX += 0.1;
    
    if (sprite.scaleX >= 1 || sprite.scaleX <= 0) scale = !scale;

    if (sprite.y >= target.y) {

      if (this.state.daily === 4 && this.state.farm === 'Sheep') {

        if (this.scene.isActive('Modal')) this.scene.stop('Modal');
        if (this.scene.isActive('Block')) this.scene.stop('Block');
        if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
        if (this.scene.isActive('Shop')) this.scene.stop('Shop');
        if (this.scene.isActive('ShopBars')) this.scene.stop('ShopBars');
        if (this.scene.isActive('Map')) this.scene.stop('Map');
        if (this.scene.isActive('MapBars')) this.scene.stop('MapBars');
        this.scene.stop('Sheep');
        this.scene.stop('SheepBars');
        this.scene.start('ChickenPreload', this.state);

      }

      sprite.destroy();
      interval.remove(false);

    }

  }, callbackScope: this, loop: true });

}


// анимация иконок на кристаллической пещере
function caveIconsAnimation(): void {

  this.caveIconsTimer++;

  if (this.caveIconsTimer >= 5) {

    this.caveIconsTimer = 0;

    let cave = this.territories.children.entries.find((data: any) => data.type === 7).cave;
    const y: number = cave.bgAd.y;

    let counter: number = 0;
    let timeEvent: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 30, callback: (): void => {

      counter++;

      if (counter <= 7) {

        cave.bgAd.scale += 0.05;
        cave.free.scale += 0.05;
        cave.ad.scale += 0.05;
        cave.bgAd.rotation -= 0.05;
        cave.free.rotation -= 0.05;
        cave.ad.rotation -= 0.05;
        cave.bgAd.y -= 3;
        cave.free.y -= 3;
        cave.ad.y -= 3;
      
      } else {

        cave.bgAd.scale -= 0.05;
        cave.free.scale -= 0.05;
        cave.ad.scale -= 0.05;
        cave.bgAd.rotation += 0.05;
        cave.free.rotation += 0.05;
        cave.ad.rotation += 0.05;
        cave.bgAd.y += 3;
        cave.free.y += 3;
        cave.ad.y += 3;

      }
    
      if (counter >= 14) {

        cave.bgAd.scale = 1;
        cave.free.scale = 1;
        cave.ad.scale = 1;
        cave.bgAd.rotation = 0;
        cave.free.setAngle(11);
        cave.ad.setAngle(11);
        cave.bgAd.y = y;
        cave.free.y = y;
        cave.ad.y = y;
        timeEvent.remove(false);

      }

    }, callbackScope: this, loop: true });

  }

}


// анимация кристаллов
function plusDiamonds(): void {
    
  let x = this.cameras.main.centerX;
  let y = this.cameras.main.centerY;

  let img1 = this.сurrency.create(x, y, 'diamond').setScale(0.2);
  let img2 = this.сurrency.create(x, y, 'diamond').setScale(0.2);
  let img3 = this.сurrency.create(x, y, 'diamond').setScale(0.2);
  let img4 = this.сurrency.create(x, y, 'diamond').setScale(0.2);
  let img5 = this.сurrency.create(x, y, 'diamond').setScale(0.2);
  let img6 = this.сurrency.create(x, y, 'diamond').setScale(0.2);
  let img7 = this.сurrency.create(x, y, 'diamond').setScale(0.2);
  let img8 = this.сurrency.create(x, y, 'diamond').setScale(0.2);

  img1.setVelocity(350, 350);
  img2.setVelocity(500, 0);
  img3.setVelocity(350, -350);
  img4.setVelocity(-350, 350);
  img5.setVelocity(-500, 0);
  img6.setVelocity(-350, -350);
  img7.setVelocity(0, -500);
  img8.setVelocity(0, 500);

  img1.counter = 1;
  img2.counter = 1;
  img3.counter = 1;
  img4.counter = 1;
  img5.counter = 1;
  img6.counter = 1;
  img7.counter = 1;
  img8.counter = 1;

}


// получения кристаллов
function getDiamonds(position: Iposition, counter: number = 1): void {

  if (counter > 5) counter = 5;

  let time: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
    counter--;
    const pos: Iposition = {
      x: Phaser.Math.Between(position.x - 30, position.x + 30),
      y: Phaser.Math.Between(position.y - 30, position.y + 30),
    }
    this.plusDiamondsAnimation(pos);
    if (counter <= 0) time.remove(false);
  }, callbackScope: this, loop: true });

}

function improveCollectorAnim(position: Iposition): void {
  let icon: string;
  if (this.state.farm === 'Sheep') icon = 'wool-collector';
  else if (this.state.farm === 'Chicken') icon = 'egg-collector';
  else if (this.state.farm === 'Cow') icon = 'egg-collector';
  else if (this.state.farm === 'Event') icon = 'event-collector';
  
  let sprite: Phaser.GameObjects.Sprite = this.add.sprite(position.x, position.y, icon); 

  let tween: Phaser.Tweens.Tween = this.tweens.add({
    targets: sprite,
    props: {
      scaleX: { value: 0, ease: 'Linear'}, 
      y: { value: '-=60', ease: 'Power2'},
    },
    yoyo: true,
    duration: 280,
    repeat: 1,
    onComplete: () => {
      tween.remove();
      sprite.destroy();
    },
  });

}
export {
  firework250,
  genAnimations,
  сurrencyAnimation,
  menuAnimation,
  cave,
  pulseBalance,
  increaseDiamonds,
  plusDiamondsAnimation,
  dragSheep,
  hearts,
  showSheepSprite,
  calendarAnimation,
  newbieAwardAnimation,
  caveIconsAnimation,
  plusDiamonds,
  getDiamonds,
  improveCollectorAnim
}
