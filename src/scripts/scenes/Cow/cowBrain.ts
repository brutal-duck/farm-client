import { random } from '../../general/basic';

function cowBrain(): void {

  for (let i in this.cow.children.entries) {

    let cow = this.cow.children.entries[i];

    // если не перетаскиваем
    if (!cow.drag) {

      let territory = this.currentTerritory(cow.x, cow.y);
      
      if (territory) {

        if (territory.type !== 4 || cow.aim) {

          // проверка, не находится ли за бортом
          if (territory.type !== 2 && territory.type !== 3 && territory.type !== 4) {

            if (territory.type === 0 && cow.expel) {

              cow.aim = false;
              cow.spread = false;
              cow.moving = false;
              cow.setVelocity(0, 0);
              cow.body.reset(cow.x, cow.y);

            } else this.teleportation(cow);

          }

          // если нет цели у коровы
          if (!cow.aim && !cow.expel) {

            // шанс смены вектора движения
            if (random(1, 170) === 1) {
              cow.changeVector = true;
              cow.vector = random(1, 8);
            }

            // шанс остановки или продолжения движения
            if (cow.counter > random(130, 170)) {

              if (cow.counter >= 400) cow.counter = 0;

              if (cow.moving !== false) {

                cow.moving = false;
                cow.setVelocity(0, 0);
                cow.body.reset(cow.x, cow.y);

              }

            } else {
              
              if (!cow.moving || cow.changeVector) {

                cow.body.reset(cow.x, cow.y);
                cow.setVelocity(0, 0);
                let x: number = random(this.velocity - 10, this.velocity + 10);
                let y: number = random(this.velocity - 10, this.velocity + 10);

                switch (cow.vector) {
                  case 1: cow.setVelocity(x, y); break;
                  case 2: cow.setVelocity(-x, y); break;
                  case 3: cow.setVelocity(-x, -y); break;
                  case 4: cow.setVelocity(x, -y); break;
                  case 5: cow.setVelocity(0, -y); break;
                  case 6: cow.setVelocity(x, 0); break;
                  case 7: cow.setVelocity(0, y); break;
                  case 8: cow.setVelocity(-x, 0); break;
                }

              }

              cow.moving = true;
              cow.changeVector = false;

            }

            // счетчик коллизий для обратного движения
            if (cow.collision > 0) cow.collision++;
            if (cow.collision >= 200) cow.collision = 0;
            
            cow.counter++;

          } else {

            // если есть точка-цель
            let distance: number = Phaser.Math.Distance.Between(cow.x, cow.y, cow.aimX, cow.aimY);

            if (cow.x < 0 ||
              cow.x > 720 ||
              cow.y < 0 ||
              (distance > cow.distance && cow.distance > 0)) {

              cow.body.reset(cow.x, cow.y);
              cow.aim = false;
              cow.spread = false;
              cow.moving = false;
              cow.aimX = 0;
              cow.aimY = 0;
              cow.distance = 0;

            } else {

              cow.distance = distance;

            }
      
          }
          
        }

        // уход от границ
        if (((territory.position === 1 && cow.x < cow.width / 2) ||
        (territory.position === 3 && cow.x > (3 * this.height) - cow.width / 2) ||
        (territory.block === 8 && cow.y > this.topIndent + (8 * this.height) - cow.height / 2))
        && !cow.aim) {

        let aimX: number = random(territory.x + Math.ceil(cow.width / 2), territory.x - Math.ceil(cow.width / 2) + 240);
        let aimY: number = random(territory.y + Math.ceil(cow.width / 2), territory.y - Math.ceil(cow.width / 2) + 240);
        this.aim(cow, aimX, aimY);

      }

      } else this.teleportation(cow);

      cow.setDepth(cow.y + Math.round((cow.height / 2) + 1)); // z-index

      // уход с ярмарки, если там не нужно быть
      if (territory.type === 4 && !cow.merging && !cow.aim) {

        cow.merging = false;
        let randomX: number = random(territory.x + 40, territory.x + 200);
        let randomY: number = random(territory.y + 280, territory.y + 440);
        this.aim(cow, randomX, randomY);

      }

    }
    
    let statusPosition: number;


    if (!cow.drag) {

      let side: string;

      if (cow.merging) cow.moving = false;

      if (cow.vector === 2 ||
        cow.vector === 3 ||
        cow.vector === 7 ||
        cow.vector === 8) {
        side = 'left';
        statusPosition = 50
      } else {
        side = 'right';
        statusPosition = -50
      }

      if (cow.moving || cow.aim) cow.anims.play('cow-move-' + side + cow.type, true);
      else cow.anims.play('cow-stay-' + side + cow.type, true);
  
    }

    if (cow.milk >= 900 && !cow.milkStatus.visible) cow.milkStatus.setVisible(true);
    if (cow.milk < 900 && cow.milkStatus.visible) cow.milkStatus.setVisible(false);
    cow.milkStatus.setDepth(cow.depth + 1);
    cow.milkStatus.x = cow.x + statusPosition;
    cow.milkStatus.y = cow.y - 60;

  }


}

export default cowBrain;