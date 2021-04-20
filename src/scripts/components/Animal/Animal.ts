import Cow from '../../scenes/Cow/Main';
import Firework from '../animations/Firework';
import Sheep from '../../scenes/Sheep/Main';
import Chicken from '../../scenes/Chicken/Main';
import Territory from './../Territories/Territory';

export default abstract class Animal extends Phaser.Physics.Arcade.Sprite {
  public type: string;
  public scene: Cow | Sheep | Chicken;
  public drag: boolean;
  public moving: boolean;
  public vector: number;
  public _id: string;
  public diamond: number;
  public counter: number;
  public aim: boolean; 
  public aimX: number;
  public aimY: number;
  public collision: number;
  public spread: boolean;
  public basicVelocity: number;
  public distance: number;
  public expel: boolean;
  public changeVector: boolean;
  public merging: boolean;
  public timeToCreate: number;
  public breed: number;

  constructor(
    scene: Cow | Sheep | Chicken, 
    position: Iposition, 
    type: string, 
    breed: number,
    id: string,
    counter: number = 0,
    diamond: number = 0,
    vector: number = 7,
    fireworkAnim: boolean = false
    ) {
    super(scene, position.x, position.y, `${type}${breed}`);
    this.scene = scene;
    this.type = type;
    this.breed = breed;
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
    this.drag = false;
    this.spread = false;
    this.expel = false; // метка изгнания
    this.changeVector = false; // метка смены вектора
    this.merging = false; // метка коровы в мерджинге
    this.distance = 0;
    this.basicVelocity = 20;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setDepth(this.y);
    this.setInteractive();
    this.scene.input.setDraggable(this);
  }

  public preUpdate(time: number, delta: number) {
    super.preUpdate(time, delta)
    if (this.scene) {
      this.setBrain();
    }
  }

  public startDrag() {
    this.scene.scrolling.downHandler(); // остановка скролла
    this.scene.scrolling.enabled = false; // отключаем скролл
    this.scene.scrolling.wheel = false; // отключаем колесо
    this.setVelocity(0, 0); // отменяем передвижение
    this.setCollideWorldBounds(true) // чтобы не могли перетащить за пределы
    this.drag = true;
  }

  public dragging(dragX: number, dragY: number) {
    if (this.drag) {
      this.setPosition(dragX, dragY);
      this.setDepth(dragY + Math.round((this.height / 2) + 1000));
    }
  }

  public endDrag() {
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
  
    let x: number = Phaser.Math.Between(this.basicVelocity - 5, this.basicVelocity + 5);
    let y: number = Phaser.Math.Between(this.basicVelocity - 5, this.basicVelocity + 5);
    
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


  public setBrain(): void {
      // если не перетаскиваем
    if (!this.drag) {
      let territory: Territory = this.scene.currentTerritory(this.x, this.y);
      if (territory) {

        if (territory.territoryType !== 4 || this.aim) {
          
          // проверка, не находится ли за бортом
          if (territory.territoryType !== 2 && territory.territoryType !== 3 && territory.territoryType !== 4) {

            if (territory.territoryType === 0 && this.expel) {
              this.aim = false;
              this.spread = false;
              this.moving = false;
              this.setVelocity(0, 0);
              this.body.reset(this.x, this.y);
            } else this.teleportation();

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
                let x: number = Phaser.Math.Between(this.basicVelocity - 10, this.basicVelocity + 10);
                let y: number = Phaser.Math.Between(this.basicVelocity - 10, this.basicVelocity + 10);
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
        this.teleportation()
      };

      this.setDepth(this.y + Math.round((this.height / 2) + 1)); // z-index

      // уход с ярмарки, если там не нужно быть
      if (territory?.territoryType === 4 && !this.merging && !this.aim) {
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
        side = 'left';
      } else {
        side = 'right';
      }
      if ((this.moving || this.aim) && !this.merging) {
        this.play(`${this.type}-move-${side}${this.breed}`, true);
      } else this.play(`${this.type}-stay-${side}${this.breed}`, true);
    }
  }

  public get openedTerritory(): any[] {
    let territories: any[] = [];

  // берем только нужные территории
    for (let i in this.scene.territories.children.entries) {
      
      //@ts-ignore
      const territory: Territory = this.scene.territories.children.entries[i];
      if (territory.territoryType === 2 || territory.territoryType === 3) {
        territories.push({
          _id: territory._id,
          block: territory.block,
          position: territory.position,
          count: 0
        });
      }
    }
    return territories;
  }

  public teleportation(): void {
    const territories: any[] = this.openedTerritory;
    // смотрим, где какая корова сидит  
    // @ts-ignore Убрать игнор, когда animalGroup появится во всех сценах
    for (let i in this.scene.animalGroup.children.entries) {
    // @ts-ignore Убрать игнор, когда animalGroup появится во всех сценах
      const c: Animal = this.scene.animalGroup.children.entries[i];
      let territory = this.scene.currentTerritory(c.x, c.y);

      if (territory !== undefined) {
        territory = territories.find(data => data._id === territory._id);
        if (territory !== undefined) {
          territory.count++;
        }
      }
    }

    // сортируем, чтобы взять первую с наименьшим количеством
    territories.sort((x1, x2) => {
      if (x1.count < x2.count) return -1;
      if (x1.count > x2.count) return 1;
      return 0;
    });

    let halfWidth: number = Math.ceil(this.width / 2) + 1;
    let halfHeight: number = Math.ceil(this.height / 2) + 1;
    let minX: number = (territories[0].position - 1) * this.scene.height + halfWidth;
    let maxX: number = territories[0].position * this.scene.height - halfWidth;

    let mixY: number = (territories[0].block - 1) * this.scene.height + halfHeight + this.scene.topIndent;
    let maxY: number = territories[0].block * this.scene.height - halfHeight + this.scene.topIndent;

    this.x = Phaser.Math.Between(minX, maxX);
    this.y = Phaser.Math.Between(mixY, maxY);
    this.counter = 200;
    this.aim = false;
    this.aimX = 0;
    this.aimY = 0;
    this.distance = 0;
  }

}
