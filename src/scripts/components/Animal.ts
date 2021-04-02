import AnimalSpine from './animalSpine'
import Cow from './../scenes/Cow/Main';
import Firework from './Firework';
import Sheep from './../scenes/Sheep/Main';
import Chicken from './../scenes/Chicken/Main';

export default abstract class Animal extends Phaser.Physics.Arcade.Sprite {
  public animalSpine: AnimalSpine;
  public type: string;
  public scene: Cow | Sheep | Chicken;
  public drag: boolean;
  public moving: boolean;
  public vector: number;
  public _id: string;
  public diamond: number;
  public counter: number;
  public anim: boolean;
  public aim: boolean; 
  public aimX: number;
  public aimY: number;
  public collision: number;
  public spread: boolean;
  public velocity: number;
  public distance: number;
  public expel: boolean;
  public changeVector: boolean;
  public merging: boolean;

  constructor(
    scene: Cow | Sheep | Chicken, 
    position: Iposition, 
    texture: string,   
    id: string,
    counter: number = 0,
    diamond: number = 0,
    vector: number = 7,
    fireworkAnim: boolean = false
    ) {
    super(scene, position.x, position.y, 'cow1');
    this.scene = scene;
    this.type = texture;
    this.vector = vector; // вектор движения
    this._id = id;
    this.diamond = diamond;
    this.counter = counter; // счетчик
    this.init();
    if (fireworkAnim) Firework.create(scene, position, 1);

  }

  public init(): void {
    this.moving = false; // движение
    this.aim = false; // цель движения
    this.aimX = 0; // точка X цели
    this.aimY = 0; // точка Y цели
    this.collision = 1;
    this.spread = false;
    this.expel = false; // метка изгнания
    this.changeVector = false; // метка смены вектора
    this.merging = false; // метка коровы в мерджинге
    this.distance = 0;
    this.velocity = 0;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setDepth(this.y + 1000);
    this.setAlpha(0.0000001);
    this.setInteractive();
    this.scene.input.setDraggable(this);

    this.createSpine();
  }

  public createSpine(): void {
    this.animalSpine = AnimalSpine.create(this.scene, this.body.x, this.body.y, this.type);
  }

  public preUpdate() {
    // update spine animation
    this.animalSpine.update(this);
    this.setBrain();
  }

  public stayRight() {
    this.setVelocity(0, 0); // отменяем передвижение
    this.moving = false;
    this.body.reset(this.x, this.y);
    this.setFlipX(false);
    this.animalSpine.setAnimation('stay', true); 
    this.animalSpine.setAttachment('tag', 'tag');
  }

  public stayLeft() {
    this.setVelocity(0, 0); // отменяем передвижение
    this.moving = false;
    this.body.reset(this.x, this.y);
    this.setFlipX(true);
    this.animalSpine.setAnimation('stay', true); 
    this.animalSpine.setAttachment('tag', 'tag-flip');
  }

  public startRightMoving() {
    this.moving = true;
    this.setFlipX(false);
    this.animalSpine.setAnimation('move', true);
    this.animalSpine.setAttachment('tag', 'tag');
  }

  public startLeftMoving() {
    this.moving = true;
    this.setFlipX(true);
    this.animalSpine.setAnimation('move', true);
    this.animalSpine.setAttachment('tag', 'tag-flip');
  }

  public eating() {

  }

  public startDrag() {
    this.scene.scrolling.downHandler(); // остановка скролла
    this.scene.scrolling.enabled = false; // отключаем скролл
    this.scene.scrolling.wheel = false; // отключаем колесо
    this.setVelocity(0, 0); // отменяем передвижение
    this.setCollideWorldBounds(true) // чтобы не могли перетащить за пределы
    this.drag = true;
    this.animalSpine.setAnimation('drag', true);
  }

  public dragging(dragX, dragY) {
    if (this.drag) {
      this.x = dragX;
      this.y = dragY;
      this.setDepth(dragY + Math.round((this.height / 2) + 100));
    }
  }

  public endDrag() {
    this.animalSpine.setAnimation('stay', true);
    this.scene.scrolling.enabled = true; // включаем скролл
    this.scene.scrolling.wheel = true; // включаем колесо
    this.setCollideWorldBounds(true);
    this.drag = false; // убираем метку перетаскивания
    this.aim = false;
    this.spread = false;
    this.aimX = 0;
    this.aimY = 0;
    this.collision = 0;
    this.counter = 200;
  }

  public setReverse(): void {

    this.collision = 1;
  
    let x: number = Phaser.Math.Between(this.velocity - 5, this.velocity + 5);
    let y: number = Phaser.Math.Between(this.velocity - 5, this.velocity + 5);
    
    this.setVelocity(0, 0);
    this.body.reset(this.x, this.y);
  
    switch(this.vector) {
      case 1:
        this.vector = 3;
        this.setVelocity(-x, -y);
        break;
      case 2:
        this.vector = 4;
        this.setVelocity(x, -y);
        break;
      case 3:
        this.vector = 1;
        this.setVelocity(x, y);
        break;
      case 4:
        this.vector = 2;
        this.setVelocity(-x, y);
        break;
      case 5:
        this.vector = 7;
        this.setVelocity(0, y);
        break;
      case 6:
        this.vector = 8;
        this.setVelocity(-x, 0);
        break;
      case 7:
        this.vector = 5;
        this.setVelocity(0, -y);
        break;
      case 8:
        this.vector = 6;
        this.setVelocity(x, 0);
        break;
    }
  
  }

  // функция получения цели для точки движения коровы
  public setAim(x: number, y: number): void {

    if (this.x < x && this.y > y) this.vector = 4;
    else if (this.x < x && this.y < y) this.vector = 1;
    else if (this.x > x && this.y < y) this.vector = 2;
    else if (this.x > x && this.y > y) this.vector = 3;
    else if (this.x === x && this.y > y) this.vector = 5;
    else if (this.x === x && this.y < y) this.vector = 7;
    else if (this.x < x && this.y === y) this.vector = 6;
    else if (this.x > x && this.y === y) this.vector = 8;

    this.aim = true;
    this.aimX = x;
    this.aimY = y;
    this.distance = 0;
    let target: Iposition = new Phaser.Math.Vector2();
    target.x = x;
    target.y = y;
    let distance: number = Phaser.Math.Distance.Between(this.x, this.y, target.x, target.y);
    let coefficient: number = 1;

    if (distance >= 400) {
      coefficient = 0.15;
    } else if (distance < 400 && distance >= 300) {
      coefficient = 0.20;
    } else if (distance < 300 && distance >= 200) {
      coefficient = 0.25;
    } else if (distance < 200 && distance >= 100) {
      coefficient = 0.5;
    }

    this.scene.physics.moveToObject(this, target, distance * coefficient);

  }

  public checkMerging(territory: any, position: string) {
  
    this.merging = true;
    this.aim = false;

    territory.mergingCounter = 1;
    let check = territory.merging.find((data: any) => data._id === this._id);
  
    if (check === undefined) {
  
      // если на этой позиции уже стоит корова
      if (territory.merging.length === 1 && territory.merging[0].position === position) {
  
        if (position === 'top') position = 'bottom';
        else if (position === 'bottom') position = 'top';
  
      }
  
      // запоминаем
      territory.merging.push({
        _id: this._id,
        type: this.type,
        position: position
      });
  
      // ставим на парковку
      if (position === 'top') {
  
        this.stayRight();
        this.vector = 8;
        this.y = territory.y + 30;
        this.x = territory.x + 160;
  
      } else if (position === 'bottom') {
  
        this.stayRight();
        this.vector = 8;
        this.y = territory.y + 130;
        this.x = territory.x + 160;
  
      }
  
    } else {
  
      if (check.position === 'top' && position === 'bottom') check.position = 'bottom';
      if (check.position === 'bottom' && position === 'top') check.position = 'top';
  
      // обновляем положение парковки
      if (position === 'top') {
  
        this.stayRight();
        this.vector = 8;
        this.y = territory.y + 30;
        this.x = territory.x + 160;
  
      } else if (position === 'bottom') {
  
        this.stayRight();
        this.vector = 8;
        this.y = territory.y + 130;
        this.x = territory.x + 160;
  
      }
  
    }
  
    // проверяем успешный на мерджинг
    // if (territory.merging.length === 2) {
  
    //   let cow1 = this.scene.cow.children.entries.find((data: any) => data._id === territory.merging[0]._id);
    //   let cow2 = this.scene.cow.children.entries.find((data: any) => data._id === territory.merging[1]._id);
  
    //   if (cow1?.type === cow2?.type) {
        
    //     this.scene.time.addEvent({ delay: 100, callback: (): void => {
  
    //       // let position: Iposition = {
    //       //   x: territory.x + 120,
    //       //   y: territory.y + 120
    //       // }
    //       // MergingCloud.create(this.scene, position);
    //       // let type: number = cow1.type + 1;
    //       // cow1.destroy();
    //       // cow2.destroy();
    //       // cow1.milkStatus.destroy();
    //       // cow2.milkStatus.destroy();
    //       // let id: string = 'local_' + randomString(18);
    //       // let x: number = territory.x + 120;
    //       // let y: number = territory.y + 240;
    //       // let cow = this.getCow(id, type, x, y, 0, 0, 0, 7, false);
    //       // let aimX: number = random(territory.x + 40, territory.x + 200);
    //       // let aimY: number = random(territory.y + 280, territory.y + 440);
    //       // this.aim(cow, aimX, aimY);
    //       // this.tryTask(2, type);
    //       // this.tryTask(4, type);
    //       // this.checkAnimalTask();
  
    //     }, callbackScope: this, loop: false });
  
    //     territory.merging = [];
  
    //   } else {
  
    //     if (cow1 && cow2) {
    //       SpeechBubble.create(this, this.state.lang.mergingMessageBreed, 1);
    //       this.cancelMerging(territory, cow1, cow2);
  
    //     } else {
          
    //       // костыль
    //       for (let i in this.cow.children.entries) this.cow.children.entries[i].merging = false;
    //       if (cow1) this.teleportation(cow2);
    //       if (cow2) this.teleportation(cow2);
    //       territory.merging = [];
  
    //     }
    //   }
    // }
  }

  public setBrain(): void {
      // если не перетаскиваем
    if (!this.drag) {
      let territory = this.scene.currentTerritory(this.x, this.y);
      if (territory) {

        if (territory.type !== 4 || this.aim) {
          
          // проверка, не находится ли за бортом
          if (territory.type !== 2 && territory.type !== 3 && territory.type !== 4) {

            if (territory.type === 0 && this.expel) {
              this.aim = false;
              this.spread = false;
              this.moving = false;
              this.setVelocity(0, 0);
              this.body.reset(this.x, this.y);
            } else this.scene.teleportation(this);

          }

          // если нет цели у коровы
          if (!this.aim && !this.expel) {
            // шанс смены вектора движения
            if (Phaser.Math.Between(1, 170) === 1) {
              this.changeVector = true;
              this.vector = Phaser.Math.Between(1, 8);
            }
            // шанс остановки или продолжения движения
            if (this.counter > Phaser.Math.Between(130, 170)) {

              if (this.counter >= 400) this.counter = 0;

              if (this.moving !== false) {
                this.moving = false;
                this.setVelocity(0, 0);
                this.body.reset(this.x, this.y);
              }

            } else {
              
              if (!this.moving || this.changeVector) {
                this.body.reset(this.x, this.y);
                this.setVelocity(0, 0);
                let x: number = Phaser.Math.Between(this.velocity - 10, this.velocity + 10);
                let y: number = Phaser.Math.Between(this.velocity - 10, this.velocity + 10);
                switch (this.vector) {
                  case 1: this.setVelocity(x, y); break;
                  case 2: this.setVelocity(-x, y); break;
                  case 3: this.setVelocity(-x, -y); break;
                  case 4: this.setVelocity(x, -y); break;
                  case 5: this.setVelocity(0, -y); break;
                  case 6: this.setVelocity(x, 0); break;
                  case 7: this.setVelocity(0, y); break;
                  case 8: this.setVelocity(-x, 0); break;
                }
              }
              this.moving = true;
              this.changeVector = false;
            }

            // счетчик коллизий для обратного движения
            if (this.collision > 0) this.collision++;
            if (this.collision >= 200) this.collision = 0;
            
            this.counter++;

          } else {

            // если есть точка-цель
            let distance: number = Phaser.Math.Distance.Between(this.x, this.y, this.aimX, this.aimY);

            if (this.x < 0 ||
              this.x > 720 ||
              this.y < 0 ||
              (distance > this.distance && this.distance > 0)) {

              this.body.reset(this.x, this.y);
              this.aim = false;
              this.spread = false;
              this.moving = false;
              this.aimX = 0;
              this.aimY = 0;
              this.distance = 0;

            } else {
              this.distance = distance;
            }
          }
        }

        // уход от границ
        if (((territory.position === 1 && this.x < this.width / 2) ||
        (territory.position === 3 && this.x > (3 * this.scene.height) - this.width / 2) ||
        (territory.block === 8 && this.y > this.scene.topIndent + (8 * this.scene.height) - this.height / 2))
        && !this.aim) {

        let aimX: number = Phaser.Math.Between(territory.x + Math.ceil(this.width / 2), territory.x - Math.ceil(this.width / 2) + 240);
        let aimY: number = Phaser.Math.Between(territory.y + Math.ceil(this.width / 2), territory.y - Math.ceil(this.width / 2) + 240);
        this.setAim(aimX, aimY);

        }

      } else {
        this.scene.teleportation(this)
      };

      this.setDepth(this.y + Math.round((this.height / 2) + 1)); // z-index

      // уход с ярмарки, если там не нужно быть
      if (territory.type === 4 && !this.merging && !this.aim) {
        this.merging = false;
        let randomX: number = Phaser.Math.Between(territory.x + 40, territory.x + 200);
        let randomY: number = Phaser.Math.Between(territory.y + 280, territory.y + 440);
        this.setAim(randomX, randomY);

      }
    }
    if (!this.drag) {
      let side: string;
      if (this.merging) this.moving = false;
      if (this.vector === 2 ||
        this.vector === 3 ||
        this.vector === 7 ||
        this.vector === 8) {
        side = 'Left';
      } else {
        side = 'Right';
      }
      if (this.moving || this.aim) this[`start${side}Moving`]();
      else this[`stay${side}`]();
    }
  }

  public destroy(): void {
    super.destroy();
    this.animalSpine.destroy();
  }
}
