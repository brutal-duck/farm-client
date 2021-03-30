import { random } from '../../general/basic';
import Hearts from './../../components/Hearts';

function sheepBrain(): void {

  for (let i in this.sheep.children.entries) {

    let sheep = this.sheep.children.entries[i];

    // если не перетаскиваем
    if (!sheep.drag) {

      let territory = this.currentTerritory(sheep.x, sheep.y);

      if (territory) {
        
        if (territory.type !== 4 || sheep.aim) {

          // проверка, не находится ли за бортом
          if (territory.type !== 2 && territory.type !== 3 && territory.type !== 4) {

            if (territory.type === 0 && sheep.expel) {

              sheep.aim = false;
              sheep.spread = false;
              sheep.moving = false;
              sheep.setVelocity(0, 0);
              sheep.body.reset(sheep.x, sheep.y);

            } else if (territory.type === 1 && this.state.userSheep.tutorial === 20) {
              
              if (!sheep.aim) {
                
                sheep.vector = 6;
                sheep.anims.play('sheep-stay-right1', true);
                sheep.woolSprite.setTexture('sheep-right-1-0');
                sheep.body.reset(sheep.x, sheep.y);
                sheep.drag = true;
                sheep.x = 360;
                sheep.y = 600;
                sheep.wool = 0;

              }

            } else if (!(territory.type === 1 && this.state.userSheep.tutorial === 30)) {
              this.teleportation(sheep);
            }

          }

          // если нет цели
          if (!sheep.aim && !sheep.expel) {

            // шанс смены вектора движения
            if (random(1, 170) === 1) {

              sheep.changeVector = true;
              sheep.vector = random(1, 8);

            }

            // шанс остановки или продолжения движения
            if (sheep.counter > random(130, 170)) {

              if (sheep.counter >= 400) sheep.counter = 0;

              if (sheep.moving !== false) {

                sheep.moving = false;
                sheep.setVelocity(0, 0);
                sheep.body.reset(sheep.x, sheep.y);

              }

            } else {
              
              if (!sheep.moving || sheep.changeVector) {

                sheep.body.reset(sheep.x, sheep.y);
                sheep.setVelocity(0, 0);
                let x: number = random(this.velocity - 10, this.velocity + 10);
                let y: number = random(this.velocity - 10, this.velocity + 10);

                switch (sheep.vector) {
                  case 1: sheep.setVelocity(x, y); break;
                  case 2: sheep.setVelocity(-x, y); break;
                  case 3: sheep.setVelocity(-x, -y); break;
                  case 4: sheep.setVelocity(x, -y); break;
                  case 5: sheep.setVelocity(0, -y); break;
                  case 6: sheep.setVelocity(x, 0); break;
                  case 7: sheep.setVelocity(0, y); break;
                  case 8: sheep.setVelocity(-x, 0); break;
                }

              }

              sheep.moving = true;
              sheep.changeVector = false;

            }

            // счетчик коллизий для обратного движения
            if (sheep.collision > 0) sheep.collision++;
            if (sheep.collision >= 200) sheep.collision = 0;
            
            sheep.counter++;
            
          } else {

            // если есть точка-цель
            let distance: number = Phaser.Math.Distance.Between(sheep.x, sheep.y, sheep.aimX, sheep.aimY);

            if (sheep.x < 0 ||
              sheep.x > 720 ||
              sheep.y < 0 ||
              (distance > sheep.distance && sheep.distance > 0)) {

              if (sheep.aimX === 600 && sheep.aimY === 600 && this.state.userSheep.tutorial === 30) {
                Hearts.create(this, sheep);
                sheep.vector = 6;
                sheep.anims.play('sheep-stay-right1', true);
                sheep.woolSprite.setTexture('sheep-right-1-0');
                sheep.body.reset(sheep.x, sheep.y);
                sheep.drag = true;
                sheep.x = 600;
                sheep.y = 600;
                sheep.wool = 0;

              }

              sheep.body.reset(sheep.x, sheep.y);
              sheep.aim = false;
              sheep.spread = false;
              sheep.moving = false;
              sheep.aimX = 0;
              sheep.aimY = 0;
              sheep.distance = 0;

            } else {

              sheep.distance = distance;

            }
      
          }
          
        }

        // уход от границ
        if (((territory.position === 1 && sheep.x < sheep.width / 2) ||
          (territory.position === 3 && sheep.x > (3 * this.height) - sheep.width / 2) ||
          (territory.block === 8 && sheep.y > this.topIndent + (8 * this.height) - sheep.height / 2))
          && !sheep.aim) {

          let aimX: number = random(territory.x + Math.ceil(sheep.width / 2), territory.x - Math.ceil(sheep.width / 2) + 240);
          let aimY: number = random(territory.y + Math.ceil(sheep.width / 2), territory.y - Math.ceil(sheep.width / 2) + 240);
          this.aim(sheep, aimX, aimY);

        }

      } else this.teleportation(sheep);

      sheep.setDepth(sheep.y + Math.round((sheep.height / 2) + 1)); // z-index

      // уход с ярмарки, если там не нужно быть
      if (territory.type === 4 && !sheep.merging && !sheep.aim) {

        sheep.merging = false;
        let randomX: number = random(territory.x + 40, territory.x + 200);
        let randomY: number = random(territory.y + 280, territory.y + 440);
        this.aim(sheep, randomX, randomY);

      }

    } else {
      sheep.body.reset(sheep.x, sheep.y);
    }

    this.woolSprite(sheep);

  }

}

export default sheepBrain;
