import Currency from './../components/animations/Currency';

// пульсация баланс-баров
function pulseBalance(): void {
  const textWater: Phaser.GameObjects.Text = this.textWater;
  const textGrass: Phaser.GameObjects.Text = this.textGrass;

  if (this.waterProblem && this.state.userSheep.tutorial >= 100) {
    let pulseTimer = textWater.getData('pulseTimer');
    pulseTimer += 1;
    textWater.setData('pulseTimer', pulseTimer);

    if (pulseTimer === 20) textWater.setColor('#82261c');
    else if (pulseTimer === 40) {
      textWater.setData('pulseTimer', 0);
      textWater.setColor('#FFFFFF');
    }
  } else if (!this.waterProblem && textWater.style.color === '#82261c') textWater.setColor('#FFFFFF');
  if (this.grassProblem && this.state.userSheep.tutorial >= 100) {
    let pulseTimer = textGrass.getData('pulseTimer');
    pulseTimer += 1;
    textGrass.setData('pulseTimer', pulseTimer);

    if (pulseTimer === 20) textGrass.setColor('#82261c');
    else if (pulseTimer === 40) {
      textGrass.setData('pulseTimer', 0);
      textGrass.setColor('#FFFFFF');
    }
  } else if (!this.grassProblem && textGrass.style.color === '#82261c') textGrass.setColor('#FFFFFF');
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
    if (this.state.farm === 'Sheep'|| this.state.farm === 'Cow') target.x = 230;
    
  } else if (this.state.daily === 6) {

    x = 515;
    y = this.cameras.main.centerY - 25;
    image = 'newbie-day-5';
    
  } else if (this.state.daily === 7) {

    x = 195;
    y = this.cameras.main.centerY + 155;
    image = 'newbie-day-6';
    if (this.state.farm === 'Chicken' || this.state.farm === 'Cow') target.x = 230;
    
  } else if (this.state.daily === 8) {

    x = 425;
    y = this.cameras.main.centerY + 155;
    image = 'newbie-day-7';
    
  }

  let sprite: Phaser.GameObjects.Sprite = this.physics.add.sprite(x, y, image).setDepth(this.height);
  
  this.tweens.add({
    props: {
      scaleX: { from: -1, to: 1, yoyo: true, duration: 300 },
      x: { from: sprite.x, to: target.x, duration: 600 },
      y: { from: sprite.y, to: target.y, duration: 600 },
    },
    onComplete: (): void => {
      if (this.state.daily === 4 && this.state.farm === 'Sheep') {

        if (this.scene.isActive('Modal')) this.scene.stop('Modal');
        if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
        if (this.scene.isActive('Shop')) this.scene.stop('Shop');
        if (this.scene.isActive('ShopBars')) this.scene.stop('ShopBars');
        if (this.scene.isActive('Profile')) this.scene.stop('Profile');
        this.scene.stop('Sheep');
        this.scene.stop('SheepBars');
        this.scene.start('ChickenPreload', this.state);

      }
      sprite.destroy();
    },
    targets: sprite,
  });
}

// получения нескольких ресурсов
function getCurrency(position: Iposition, counter: number = 1, texture: string): void {

  if (counter > 5) counter = 5;

  let time: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
    counter--;
    const pos: Iposition = {
      x: Phaser.Math.Between(position.x - 30, position.x + 30),
      y: Phaser.Math.Between(position.y - this.game.scene.keys[this.state.farm].scrolling.scrollY - 30, position.y - this.game.scene.keys[this.state.farm].scrolling.scrollY + 30),
    }
    let target = { x: 495, y: 30 };
    if (texture !== 'diamond') {
      target = { x: 495, y: 120}
    }
    Currency.create(this.game.scene.keys[`${this.state.farm}Bars`], pos, target, texture, 400);
    if (counter <= 0) time.remove(false);
  }, callbackScope: this, loop: true });

}

function improveCollectorAnim(position: Iposition): void {
  let icon: string;
  if (this.state.farm === 'Sheep') icon = 'wool-collector';
  else if (this.state.farm === 'Chicken') icon = 'egg-collector';
  else if (this.state.farm === 'Cow') icon = 'milk-collector';
  else if (this.state.farm === 'Unicorn') icon = 'event-collector';
  
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

function openModal(...args: Phaser.Cameras.Scene2D.Camera[]): void {
  this.tweens.add({
    duration: 100,
    targets: args,
    zoom: { from: 0.85, to: 1.05 },
    onComplete: () => {
      this.tweens.add({
        duration: 100,
        targets: args,
        zoom: { from: 1.1, to: 1 },
      })
    },
    onCompleteScope: this,
  });
}

function openShop(...args: Phaser.Cameras.Scene2D.Camera[]): void {
  this.tweens.add({
    duration: 150,
    targets: args,
    alpha: { from: 0.7, to: 1.1 },
    onComplete: () => {
      this.tweens.add({
        duration: 100,
        targets: args,
        alpha: { from: 1.1, to: 1 },
      })
    },
    onCompleteScope: this,
  });
}

function plusMoneyAnimation(position: Iposition): void {
  let y = position.y - this.game.scene.keys[this.state.farm].scrolling.scrollY;
  let target: Iposition = { x: 495, y: 120 };
  Currency.create(this, { x: position.x - 70, y: y }, target, `${this.state.farm.toLowerCase()}Coin`, 400, 0.2);
  Currency.create(this, { x: position.x + 70, y: y }, target, `${this.state.farm.toLowerCase()}Coin`, 400, 0.2);
  Currency.create(this, { x: position.x, y: y - 30 }, target, `${this.state.farm.toLowerCase()}Coin`, 400, 0.2);
}

export {
  pulseBalance,
  increaseDiamonds,
  dragSheep,
  showSheepSprite,
  newbieAwardAnimation,
  getCurrency,
  openShop,
  improveCollectorAnim,
  openModal,
  plusMoneyAnimation
}
