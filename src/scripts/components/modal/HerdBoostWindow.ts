import { getRandomBool, randomString } from "../../general/basic";
import Modal from "../../scenes/Modal/Modal";
import MergingCloud from "../animations/MergingCloud";

export default class HerdBoostWindow {
  public scene: Modal;

  private x: number;
  private y: number;
  private yTent: number;
  private yTextLevel: number;
  private xRoad: number;
  private yRoad: number;
  private boostCounterWindow: Phaser.GameObjects.Sprite;
  private elements: (Phaser.GameObjects.Text | Phaser.GameObjects.Sprite)[];
  private animal: string;
  private mergingArray: any[];
  private animalForBoost: Phaser.Physics.Arcade.Group;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.eventDrag();
    this.create();
  }

  private init(): void {
    this.x = 600;
    this.y = 360;
    this.xRoad = 0;
    this.yRoad = 480;
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.scrollY = 0; // останавливаем скролл
  }


  private create(): void {
    let startCount: number = 5;
    this.boostCounterWindow = this.scene.physics.add.sprite(360, 400, 'boost-window-bg').setDepth(1);
  
    const text1: Phaser.GameObjects.Text = this.scene.add.text(360, 360, this.scene.state.lang[`herdBoostStartTimout${this.scene.state.farm}_1`], {
      font: '19px Shadow',
      color: '#ce9457',
      wordWrap: { width: 230 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setDepth(this.y * 2);
  
    const text2: Phaser.GameObjects.Text = this.scene.add.text(360, 410, this.scene.state.lang[`herdBoostStartTimout${this.scene.state.farm}_2`], {
      font: '21px Shadow',
      color: '#946939',
      wordWrap: { width: 440 },
      align: 'center'
    }).setOrigin(0.5, 0.5).setDepth(this.y * 2);
  
    const countdown: Phaser.GameObjects.Sprite = this.scene.add.sprite(360, 500, 'boost-countdown').setDepth(2);
    const leaves1: Phaser.GameObjects.Sprite = this.scene.add.sprite(440, 510, 'boost-leaves').setDepth(0).setFlip(true, true);
    const leaves2: Phaser.GameObjects.Sprite = this.scene.add.sprite(280, 510, 'boost-leaves').setDepth(0).setFlip(false, true);
    const timerText: Phaser.GameObjects.Text = this.scene.add.text(362, 492, String(startCount), { font: '64px Shadow', color: '#f3eae6' }).setOrigin(0.5, 0.5).setDepth(3);

    this.elements = [timerText, leaves1, leaves2, countdown, text1, text2];

    const timer: Phaser.Time.TimerEvent = this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        --startCount;
        timerText.setText(String(startCount));
        if (startCount < 1) {
          this.scene.tweens.add({
            targets: this.elements,
            alpha: 0,
            duration: 400,
            onComplete: (): void => { this.moveItems(); }
          })
          timer.remove();
        }
      },
      callbackScope: this
    });
  }


  private moveItems(): void {
    let [timerText, leaves1, leaves2, countdown, text1, text2]: any = this.elements;
    
    // установка новых позиций
    timerText.setText(this.scene.state.herdBoostTime).setPosition(430, 355);
    countdown.setPosition(430, 360);
    leaves1.setAngle(90).setPosition(455, 420);
    leaves2.setAngle(90).setPosition(455, 290);
    text1.style.wordWrapWidth = 280;
    text1.setText(this.scene.state.lang[`herdBoostTimer${this.scene.state.farm}_1`] + this.scene.state.herdBoostTime + ' ' + this.scene.state.lang.seconds).setFontSize('26px').setY(1050);
    text2.setText(this.scene.state.lang[`herdBoostTimer${this.scene.state.farm}_2`]).setY(1100);

    this.scene.tweens.add({
      targets: this.boostCounterWindow,
      y: 1080,
      duration: 1000,
      onComplete: (): void => {

        this.createWorld();  // Создаем мир и записываем элементы в массив, чтобы потом скрыть
      
        this.scene.tweens.add({
          targets: this.elements,
          alpha: 1,
          duration: 600,
          onComplete: (): void => { this.createAnimals(); }
        })

      }
    });
  }
  

  private createWorld(): void {
    const farm: string = this.scene.state.farm.toLowerCase();
    // ярмарка и тент
    const fairy: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x, this.y, `${farm}-merging`).setDepth(this.y).setAlpha(0);
    
    if (farm === 'sheep') { 
      this.yTent = this.y - 24;
      this.yTextLevel = this.y + 65;
    } else if (farm === 'chicken' || farm === 'unicorn') {
      this.yTent = this.y - 17;
      this.yTextLevel = this.y + 82;
    } else if (farm === 'cow') {
      this.yTent = this.y - 19;
      this.yTextLevel = this.y + 75;
    } 
  
    this.mergingArray = []; // массив животных для слияния
    this.scene.state.herdBoostAnimals = []; // Обнуляем массив животных для буста
  
    const tent: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x, this.yTent, `${farm}-tent`).setDepth(this.y + 1).setAlpha(0);
    const xTextLevel: number = farm === 'cow' ? this.x - 75 : this.x + 80;
    const textLevel: Phaser.GameObjects.Text = this.scene.add.text(xTextLevel, this.yTextLevel, this.scene.state[`user${this.scene.state.farm}`].fair, { font: '36px Shadow', color: '#b5315a' }).setOrigin(0.5, 0.5).setDepth(this.y * 2).setAlpha(0);
    
    if (farm === 'unicorn') textLevel.setText(String(this.scene.state.userUnicorn.points));
    // дорога
    const road: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.xRoad, this.yRoad, `herd-boost-road-${farm}`).setOrigin(0).setDepth(this.yRoad).setDataEnabled().setAlpha(0);
  
    // Заборы
    const border1: Phaser.GameObjects.Sprite = this.scene.add.sprite(0, this.yRoad + 15, `${farm}-horizontal-border-1`).setOrigin(0, 1).setDepth(this.yRoad + 1).setAlpha(0);
    const border2: Phaser.GameObjects.Sprite = this.scene.add.sprite(0 + 240, this.yRoad + 15, `${farm}-horizontal-border-2`).setOrigin(0, 1).setDepth(this.yRoad + 1).setAlpha(0);
    const border3: Phaser.GameObjects.Sprite = this.scene.add.sprite(0, this.yRoad + road.height + 15, `${farm}-horizontal-border-1`).setOrigin(0, 1).setDepth(this.yRoad + 1).setAlpha(0);
    const border4: Phaser.GameObjects.Sprite = this.scene.add.sprite(0 + 240, this.yRoad + road.height  + 15, `${farm}-horizontal-border-2`).setOrigin(0, 1).setDepth(this.yRoad + 1).setAlpha(0);
    const border5: Phaser.GameObjects.Sprite = this.scene.add.sprite(0 + 480, this.yRoad + road.height  + 15, `${farm}-horizontal-border-3`).setOrigin(0, 1).setDepth(this.yRoad + 1).setAlpha(0);
  
    this.elements.push(fairy, tent, textLevel, road, border1, border2, border3, border4, border5);
  }


  private createAnimals(): void {
    this.animal = this.scene.state.farm.toLowerCase();
  
    if (this.scene.state.farm === 'Sheep') {
      // дроп зоны 
      const topZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x, this.y - 75, 300, 145).setDropZone(undefined, () => {});
      topZone.type = 'top';
      const bottomZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x, this.y + 70, 300, 145).setDropZone(undefined, () => {});
      bottomZone.type = 'bottom';
  
      // Для проверки дроп зон
      // let graphics2 = this.add.graphics().setDepth(bottomZone.y * 5);
      // graphics2.lineStyle(2, 0x00ff00);
      // graphics2.strokeRect(bottomZone.x - bottomZone.input.hitArea.width / 2, bottomZone.y - bottomZone.input.hitArea.height / 2, bottomZone.input.hitArea.width, bottomZone.input.hitArea.height);
      // let graphics1 = this.add.graphics().setDepth(topZone.y * 5);
      // graphics1.lineStyle(2, 0xffff00);
      // graphics1.strokeRect(topZone.x - topZone.input.hitArea.width / 2, topZone.y - topZone.input.hitArea.height / 2, topZone.input.hitArea.width, topZone.input.hitArea.height);
  
  
    } else if (this.scene.state.farm === 'Chicken') {
      // дроп зоны 
      const leftZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x - 75, this.y - 30, 145, 300).setDropZone(undefined, () => {});
      leftZone.type = 'left';
      
      const rightZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 70, this.y - 30, 145, 300).setDropZone(undefined, () => {});
      rightZone.type = 'right';
  
      // для проверки дроп зон
      // let graphics1 = this.add.graphics().setDepth(leftZone.y * 5);
      // graphics1.lineStyle(2, 0xffff00);
      // graphics1.strokeRect(leftZone.x - leftZone.input.hitArea.width / 2, leftZone.y - leftZone.input.hitArea.height / 2, leftZone.input.hitArea.width, leftZone.input.hitArea.height);
  
      // let graphics2 = this.add.graphics().setDepth(rightZone.y * 5);
      // graphics2.lineStyle(2, 0x00ff00);
      // graphics2.strokeRect(rightZone.x - rightZone.input.hitArea.width / 2, rightZone.y - rightZone.input.hitArea.height / 2, rightZone.input.hitArea.width, rightZone.input.hitArea.height);
  
    } else if (this.scene.state.farm === 'Cow') {
      // дроп зоны 
      const topZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x, this.y - 75, 300, 145).setDropZone(undefined, () => {});
      topZone.type = 'top';
      const bottomZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x, this.y + 70, 300, 145).setDropZone(undefined, () => {});
      bottomZone.type = 'bottom';
  
      // Для проверки дроп зон
      // let graphics2 = this.add.graphics().setDepth(bottomZone.y * 5);
      // graphics2.lineStyle(2, 0x00ff00);
      // graphics2.strokeRect(bottomZone.x - bottomZone.input.hitArea.width / 2, bottomZone.y - bottomZone.input.hitArea.height / 2, bottomZone.input.hitArea.width, bottomZone.input.hitArea.height);
      // let graphics1 = this.add.graphics().setDepth(topZone.y * 5);
      // graphics1.lineStyle(2, 0xffff00);
      // graphics1.strokeRect(topZone.x - topZone.input.hitArea.width / 2, topZone.y - topZone.input.hitArea.height / 2, topZone.input.hitArea.width, topZone.input.hitArea.height);
  
    } else if (this.scene.state.farm === 'unicorn') {
      // дроп зоны 
      const leftZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x - 75, this.y - 30, 145, 300).setDropZone(undefined, () => {});
      leftZone.type = 'left';
      
      const rightZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 70, this.y - 30, 145, 300).setDropZone(undefined, () => {});
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
    this.animalForBoost = this.scene.physics.add.group();
    let currentTime: number = this.scene.state.herdBoostTime;

    const timerCreate: Phaser.Time.TimerEvent = this.scene.time.addEvent({
      delay: this.scene.state.herdBoostDelay,
      loop: true,
      callback: () => { this.getRandomAnimal(); },
      callbackScope: this
    });
    
    // кристалическая овца
    const timerCreateCrystalAnimal: Phaser.Time.TimerEvent = this.scene.time.addEvent({
      delay: this.scene.state.herdBoostTime / 3 * 1000,
      loop: true,
      callback: () => {
        if (this.scene.state.farm === 'Unicorn') return;
        this.getRandomAnimal(true);
      },
      callbackScope: this
    });
  
    let [timerText]: any = this.elements;

    // таймер переключающий время
    const timerTickText: Phaser.Time.TimerEvent = this.scene.time.addEvent({
      delay: 1000,
      loop: true,
      callback: () => {
        --currentTime;
        timerText.setText(currentTime);

        if (currentTime <= 0) {
          this.animalForBoost.children.entries.forEach((sheep) => { sheep.data.values.woolSprite?.destroy(); });
          this.animalForBoost.destroy(true);
          timerCreate.remove();
          timerTickText.remove();
          timerCreateCrystalAnimal.remove();

          this.scene.tweens.add({
            targets: this.elements,
            alpha: 0,
            duration: 800,
            onComplete: (): void => {

              this.scene.tweens.add({
                targets: this.boostCounterWindow,
                y: 400,
                duration: 800,
                onComplete: (): void => {
                  this.createScoreText();
                  this.stopBoostScene();
                }
              })

            }
          })
        }
      },
      callbackScope: this
    });
  }
  

  private stopBoostScene(): void {
    this.scene.input.on('pointerdown', (): void => {
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.scene.state.farm].createBoostAnimal();
    });
  }
  
  
  private createScoreText(): void {
    this.scene.add.text(360, 380, this.scene.state.lang[`herdBoostScore${this.scene.state.farm}`] + this.scene.state.herdBoostAnimals.length, {
      font: '30px Shadow',
      color: '#ce9457',
      align: 'center',
      wordWrap: {width: 350}
    }).setOrigin(0.5, 0.5).setDepth(2);
  
    this.scene.add.text(360, 440, this.scene.state.lang.herdBoostNext, {
      font: '20px Shadow',
      color: '#946939',
      align: 'center'
    }).setOrigin(0.5, 0.5).setDepth(2);
  }


  private getRandomAnimal(crystal: boolean = false): void {
    let {x, y, side, _id} = this.getRandomStartPosition(); 
  
    // Изменение рандома
    let randomArray: number[] = [];
    let max: number = this.scene.state[`user${this.scene.state.farm}`].fair;
    if (this.scene.state.farm === 'Unicorn') max = this.scene.state[`user${this.scene.state.farm}`].points;
  
    for (let i: number = 0; i < max; i++) { randomArray.push(i ** 2 * 100); };
  
    let randomIndex: number = Phaser.Math.Between(0, max ** 2 * 100);
    let randomType: number;
    
    for (let i = randomArray.length - 1; i >= 0; i--) {
      if (randomIndex >= randomArray[i]) {
        randomType = randomArray.length - i;
        break;
      } 
    }
  
    // кристалическое животное?
    if (crystal) randomType = 0;
  
    const animal: Phaser.Physics.Arcade.Sprite = this.animalForBoost.create(x, y, this.animal + randomType).setDepth(y).setInteractive().setDataEnabled();
    animal.data.values.velocity = -this.scene.state.herdBoostSpeedAnimal;
  
    if (side === 'right') animal.data.values.velocity = this.scene.state.herdBoostSpeedAnimal;
  
    animal.data.values.velocity += Phaser.Math.Between(-20, 20);
    this.scene.input.setDraggable(animal); 
    animal.data.values.type = randomType;
    animal.data.values.side = side; 
    animal.data.values._id = _id;
    animal.data.values.drag = false;
    animal.data.values.merging = false; // метка животного в мерджинге
    animal.setDepth(animal.y);
    animal.setVelocityX(animal.data.values.velocity);

    // случайная шерсть если овца
    if (this.animal === 'sheep') {
      let stage: number = Phaser.Math.Between(2, 4); 
      animal.data.values.stage = stage;
      animal.data.values.woolSprite = this.scene.physics.add.sprite(x, y, this.animal + '-' + animal.data.values.side + '-' + animal.data.values.type + '-' + animal.data.values.stage).setVelocityX(animal.data.values.velocity).setDepth(animal.y);
    }
  
    animal.play(this.animal + '-move-' + animal.data.values.side + animal.data.values.type);
  }
  

  private getRandomStartPosition(): {x: number, y: number, side: string, _id: string} {
    let x: number = 0;
    let y: number = Phaser.Math.Between(550, 850);
    let side: string = 'right';
    let _id: string = 'local_' + randomString(18);
    
    if (getRandomBool()) {
      side = 'left';
      x = +this.scene.game.config.width + 100;
    } else x = -100;
  
    return {x, y, side, _id};
  }
  
  
  private checkMerging(animal: Phaser.Physics.Arcade.Sprite, position: string): void {
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
          position
        });
    
        // проверка позиции для овец
        if (position === 'top') {
    
          if (animal.data.values.side === 'left') {
            animal.data.values.side = 'right';
            animal.data.values.woolSprite?.setTexture(this.scene.state.farm.toLowerCase()+ '-' + animal.data.values.side + '-' + animal.data.values.type + '-' + animal.data.values.stage);
          }
    
          animal.anims.play(this.scene.state.farm.toLowerCase() + '-stay-right' + animal.data.values.type, true);
  
          animal.setPosition(this.x - 25, this.y - 100);
          animal.data.values.woolSprite?.setPosition(animal.x, animal.y);
          if (this.scene.state.farm === 'Cow') animal.setPosition(this.x + 45, this.y - 100);
        } else if (position === 'bottom') {
    
          if (animal.data.values.side === 'left') {
            animal.data.values.side = 'right';
            animal.data.values.woolSprite?.setTexture(this.scene.state.farm.toLowerCase()+ '-' + animal.data.values.side + '-' + animal.data.values.type + '-' + animal.data.values.stage);
          }

          animal.anims.play(this.scene.state.farm.toLowerCase() + '-stay-right' + animal.data.values.type, true);
          animal.setPosition(this.x - 25, this.y + 20);
          animal.data.values.woolSprite?.setPosition(animal.x, animal.y);
          if (this.scene.state.farm === 'Cow') animal.setPosition(this.x + 45, this.y + 20);
        }
    
        // проверка позиции для кур
        if (position === 'left') {
          if (animal.data.values.side === 'left') animal.data.values.side = 'right';
          animal.anims.play(this.scene.state.farm.toLowerCase() + '-stay-right' + animal.data.values.type, true);
          animal.setPosition(this.x - 50, this.y);
        } else if (position === 'right') {
          if (animal.data.values.side === 'right') animal.data.values.side = 'left'
          animal.anims.play(this.scene.state.farm.toLowerCase() + '-stay-left' + animal.data.values.type, true);
          animal.setPosition(this.x + 50, this.y);
        }
      }

      // проверяем совпадение
      if (this.mergingArray.length === 2) {
    
        const animal1: Phaser.Physics.Arcade.Sprite = this.animalForBoost.children.entries.find((data: any) => data.data.values._id === this.mergingArray[0]._id) as Phaser.Physics.Arcade.Sprite;
        const animal2: Phaser.GameObjects.Sprite = this.animalForBoost.children.entries.find((data: any) => data.data.values._id === this.mergingArray[1]._id) as Phaser.Physics.Arcade.Sprite;
        
        if (animal1 && animal2) {
          if (animal1?.data.values.type === animal2?.data.values.type) {
            let newType = animal.data.values.type < this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`${this.scene.state.farm.toLowerCase()}Settings`].length
              ? animal.data.values.type + 1
              : animal.data.values.type;
            if (animal1.data.values.type === 0 && animal2.data.values.type === 0) newType = 0;
            this.scene.state.herdBoostAnimals.push(newType);
    
            this.scene.time.addEvent({ delay: 100, callback: (): void => {
              MergingCloud.create(this.scene, { x: this.x, y: this.y });
              animal1?.data?.values.woolSprite?.destroy();
              animal2?.data?.values.woolSprite?.destroy();
              animal1?.destroy();
              animal2?.destroy();
            }, callbackScope: this, loop: false });
          } else {
            this.scene.time.addEvent({ delay: 100, callback: (): void => {
              MergingCloud.create(this.scene, { x: this.x, y: this.y }, true);
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
  
  private eventDrag(): void {
    this.scene.input.on('dragstart', (pointer: any, animal: Phaser.Physics.Arcade.Sprite): void => {
      if (animal.body === null) return;
      animal.data.values.drag = true;

      if (animal.data.values.merging) this.mergingArray = []; // если животное из мерджа то очистить массив
      animal.data.values.merging = false; // снимаем метку с животных после попытки мерджа
      animal.setVelocity(0, 0); // отменяем передвижение
      animal.data.values.woolSprite?.setVelocity(0, 0);
      animal?.setCollideWorldBounds(true); // чтобы не могли перетащить за пределы
      animal.anims.play(this.scene.state.farm.toLowerCase() + '-stay-' + animal.data.values.side + animal.data.values.type, true);
    });
  
    this.scene.input.on('drag', (pointer: any, animal: Phaser.Physics.Arcade.Sprite, dragX: number, dragY: number): void => {
      animal.setPosition(dragX, dragY).setDepth(dragY + Math.round((animal.height / 2) + 100));
      if (animal.data.values.woolSprite) {
        animal.data.values.woolSprite.setPosition(dragX, dragY);
        animal.data.values.woolSprite.setDepth(dragY + Math.round((animal.height / 2) + 101));
      }
    });
  
    this.scene.input.on('drop', (pointer: any, animal: Phaser.Physics.Arcade.Sprite, zone: any): void => { 
      if (animal.body === null) return;
      if (!animal.data.values.merging) {
        if (zone.type === 'left') this.checkMerging(animal, 'left');
        else if (zone.type === 'top') this.checkMerging(animal, 'top');
        else if (zone.type === 'right') this.checkMerging(animal, 'right');
        else if (zone.type === 'bottom') this.checkMerging(animal, 'bottom');
      }
    });
    
    this.scene.input.on('dragend', (pointer: any, animal: Phaser.Physics.Arcade.Sprite): void => {
      
      if (animal.data) { // существует ли еще dataManager животного
  
        if (animal.data.values.drag === false) return;

        animal.data.values.drag = false;
      
        if ((animal.y < 480 && animal.x < 480) || animal.y > 900 || animal.y < 200) {
            MergingCloud.create(this.scene, animal, true);
            animal.data?.values.woolSprite?.destroy();
            animal.destroy();
        } else {
          if (animal.data.values.merging) {
            animal.setVelocityX(0);
            animal.data.values.woolSprite?.setVelocityX(0);
            animal.data.values.side = 'right';
          } else {
            // проверяем в какую сторону нужно отправить овцу
            animal?.setCollideWorldBounds(false);
            if (animal.data.values.side === 'right')  animal.data.values.velocity = this.scene.state.herdBoostSpeedAnimal;
            else  if (animal.data.values.side === 'left') animal.data.values.velocity = -this.scene.state.herdBoostSpeedAnimal;
            
            animal.setDepth(animal.y);
            animal.data.values.woolSprite?.setDepth(animal.y);
            animal.setVelocityX(animal.data.values.velocity);
            animal.data.values.woolSprite?.setVelocityX(animal.data.values.velocity);
            animal.play(this.scene.state.farm.toLowerCase() + '-move-' + animal.data.values.side + animal.data.values.type);
          }
        }
      }
    });
  }
}