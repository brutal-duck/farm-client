import { random } from '../../general/basic';

function chickenBrain(): void {

  for (let i in this.chicken.children.entries) {

    let chicken = this.chicken.children.entries[i];

    // если не перетаскиваем
    if (!chicken.drag) {

      let territory = this.currentTerritory(chicken.x, chicken.y);
      
      if (territory) {

        if (territory.territoryType !== 4 || chicken.aim) {

          // проверка, не находится ли за бортом
          if (territory.territoryType !== 2 && territory.territoryType !== 3 && territory.territoryType !== 4) {

            if (territory.territoryType === 0 && chicken.expel) {

              chicken.aim = false;
              chicken.spread = false;
              chicken.moving = false;
              chicken.setVelocity(0, 0);
              chicken.body.reset(chicken.x, chicken.y);

            } else this.teleportation(chicken);

          }

          // если нет цели у курицы
          if (!chicken.aim && !chicken.expel) {

            // шанс смены вектора движения
            if (random(1, 170) === 1) {
              chicken.changeVector = true;
              chicken.vector = random(1, 8);
            }

            // шанс остановки или продолжения движения
            if (chicken.counter > random(130, 170)) {

              if (chicken.counter >= 400) chicken.counter = 0;

              if (chicken.moving !== false) {

                chicken.moving = false;
                chicken.setVelocity(0, 0);
                chicken.body.reset(chicken.x, chicken.y);

              }

            } else {
              
              if (!chicken.moving || chicken.changeVector) {

                chicken.body.reset(chicken.x, chicken.y);
                chicken.setVelocity(0, 0);
                let x: number = random(this.velocity - 10, this.velocity + 10);
                let y: number = random(this.velocity - 10, this.velocity + 10);

                switch (chicken.vector) {
                  case 1: chicken.setVelocity(x, y); break;
                  case 2: chicken.setVelocity(-x, y); break;
                  case 3: chicken.setVelocity(-x, -y); break;
                  case 4: chicken.setVelocity(x, -y); break;
                  case 5: chicken.setVelocity(0, -y); break;
                  case 6: chicken.setVelocity(x, 0); break;
                  case 7: chicken.setVelocity(0, y); break;
                  case 8: chicken.setVelocity(-x, 0); break;
                }

              }

              chicken.moving = true;
              chicken.changeVector = false;

            }

            // счетчик коллизий для обратного движения
            if (chicken.collision > 0) chicken.collision++;
            if (chicken.collision >= 200) chicken.collision = 0;
            
            chicken.counter++;

          } else {

            // если есть точка-цель
            let distance: number = Phaser.Math.Distance.Between(chicken.x, chicken.y, chicken.aimX, chicken.aimY);

            if (chicken.x < 0 ||
              chicken.x > 720 ||
              chicken.y < 0 ||
              (distance > chicken.distance && chicken.distance > 0)) {

              chicken.body.reset(chicken.x, chicken.y);
              chicken.aim = false;
              chicken.spread = false;
              chicken.moving = false;
              chicken.aimX = 0;
              chicken.aimY = 0;
              chicken.distance = 0;

            } else {

              chicken.distance = distance;

            }
      
          }
          
        }

        // уход от границ
        if (((territory.position === 1 && chicken.x < chicken.width / 2) ||
        (territory.position === 3 && chicken.x > (3 * this.height) - chicken.width / 2) ||
        (territory.block === 8 && chicken.y > this.topIndent + (8 * this.height) - chicken.height / 2))
        && !chicken.aim) {

        let aimX: number = random(territory.x + Math.ceil(chicken.width / 2), territory.x - Math.ceil(chicken.width / 2) + 240);
        let aimY: number = random(territory.y + Math.ceil(chicken.width / 2), territory.y - Math.ceil(chicken.width / 2) + 240);
        this.aim(chicken, aimX, aimY);

      }

      } else this.teleportation(chicken);

      chicken.setDepth(chicken.y + Math.round((chicken.height / 2) + 1)); // z-index

      // уход с ярмарки, если там не нужно быть
      if (territory.territoryType === 4 && !chicken.merging && !chicken.aim) {

        chicken.merging = false;
        let randomX: number = random(territory.x + 40, territory.x + 200);
        let randomY: number = random(territory.y + 280, territory.y + 440);
        this.aim(chicken, randomX, randomY);

      }

    }

    if (!chicken.drag) {

      let side: string;

      if (chicken.merging) chicken.moving = false;

      if (chicken.vector === 2 ||
        chicken.vector === 3 ||
        chicken.vector === 7 ||
        chicken.vector === 8) {
        side = 'left';
      } else {
        side = 'right';
      }

      if (chicken.moving || chicken.aim) chicken.anims.play('chicken-move-' + side + chicken.type, true);
      else chicken.anims.play('chicken-stay-' + side + chicken.type, true);
  
    }

  }

}

export default chickenBrain;