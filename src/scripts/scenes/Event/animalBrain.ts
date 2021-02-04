import { random } from '../../general/basic';

function collisions(): void {

  this.physics.add.overlap(this.animals, this.territories, (animal: Phaser.Physics.Arcade.Sprite, territory: any): void => {

    if (!animal.data.values.drag &&
      !animal.data.values.aim && 
      animal.data.values.working) {

      let halfWidth: number = Math.ceil(animal.width / 2) + 1;
      let halfHeight: number = Math.ceil(animal.height / 2) + 1;

      let territory: Phaser.Physics.Arcade.Sprite = this.territories.children.entries.find((data: Phaser.Physics.Arcade.Sprite) => data.data.values.type === 4)
      
          let minX: number = territory.x + halfWidth;
          let maxX: number = territory.x + territory.width - halfWidth;
        
          let mixY: number = territory.y + halfHeight;
          let maxY: number = territory.y + territory.height - halfHeight;

          let x: number = random(minX, maxX);
          let y: number = random(mixY, maxY);
          this.aim(animal, x, y);

    }

  }, null, this);

  this.physics.add.overlap(this.animals, this.animals, (animal1: Phaser.Physics.Arcade.Sprite, animal2: Phaser.Physics.Arcade.Sprite): void => {

    if (!animal1.data.values.drag &&
      !animal2.data.values.drag &&
      animal1.data.values.collision === 0 &&
      animal1.data.values.moving &&
      !animal1.data.values.aim) {

        this.reverse(animal1);
      }

  }, null, this);

}


function animalBrain(): void {

  for (let i in this.animals.children.entries) {

    let animal: Phaser.Physics.Arcade.Sprite = this.animals.children.entries[i];
    
    // если не перетаскиваем
    if (!animal.data.values.drag) {
      
      if (animal.data.values.working) {
        
          // // если нет цели у животного
          if (!animal.data.values.aim) {
            console.log(animal.data.values._id)
            // шанс смены вектора движения
            if (random(1, 170) === 1) {
              animal.data.values.changeVector = true;
              animal.data.values.vector = random(1, 8);
            }
            
            // шанс остановки или продолжения движения
            if (animal.data.values.counter > random(130, 170)) {
              
              if (animal.data.values.counter >= 200) animal.data.values.counter = 0;

              if (animal.data.values.moving !== false) {

                animal.data.values.moving = false;
                animal.setVelocity(0, 0);
                animal.body.reset(animal.x, animal.y);

              }

            } else {
              
              if (!animal.data.values.moving || animal.data.values.changeVector) {

                animal.body.reset(animal.x, animal.y);
                animal.setVelocity(0, 0);
                let x: number = random(this.velocity - 10, this.velocity + 10);
                let y: number = random(this.velocity - 10, this.velocity + 10);

                switch (animal.data.values.vector) {
                  case 1: animal.setVelocity(x, y); break;
                  case 2: animal.setVelocity(-x, y); break;
                  case 3: animal.setVelocity(-x, -y); break;
                  case 4: animal.setVelocity(x, -y); break;
                  case 5: animal.setVelocity(0, -y); break;
                  case 6: animal.setVelocity(x, 0); break;
                  case 7: animal.setVelocity(0, y); break;
                  case 8: animal.setVelocity(-x, 0); break;
                }

              }

              animal.data.values.moving = true;
              animal.data.values.changeVector = false;
              animal.data.values.counter++; 
              

            }

            // счетчик коллизий для обратного движения
            if (animal.data.values.collision > 0) animal.data.values.collision++;
            if (animal.data.values.collision >= 200) animal.data.values.collision = 0;
            
            
          } else {
            // если есть точка-цель
            let distance: number = Phaser.Math.Distance.Between(animal.x, animal.y, animal.data.values.aimX, animal.data.values.aimY);

            if (animal.x < 0 ||
              animal.x > 720 ||
              animal.y < 0 ||
              (distance > animal.data.values.distance && animal.data.values.distance > 0)) {

              animal.body.reset(animal.x, animal.y);
              animal.data.values.aim = false;
              animal.data.values.moving = false;
              animal.data.values.aimX = 0;
              animal.data.values.aimY = 0;
              animal.data.values.distance = 0;

            } else {

              animal.data.values.distance = distance;

            }
      
          }
          
        }
        animal.data.values.counter++; 

        // уход от границ
        

        let aimX: number = random(0 + Math.ceil(animal.width / 2), 720 - Math.ceil(animal.width / 2));
        let aimY: number = random(240 + Math.ceil(animal.width / 2), 720 - Math.ceil(animal.width / 2));
        this.aim(animal, aimX, aimY);



      // animal.setDepth(animal.y + Math.round((animal.height / 2) + 1)); // z-index
    

    // if (!animal.data.values.drag) {

    //   let side: string;

    //   if (animal.data.values.merging) animal.data.values.moving = false;

    //   if (animal.data.values.vector === 2 ||
    //     animal.data.values.vector === 3 ||
    //     animal.data.values.vector === 7 ||
    //     animal.data.values.vector === 8) {
    //     side = 'left';
    //   } else {
    //     side = 'right';
    //   }

    //   if (animal.data.values.moving || animal.data.values.aim) animal.anims.play('animal-move-' + side + animal.type, true);
    //   else animal.anims.play('animal-stay-' + side + animal.type, true);
  
    // }

  }

}
}

export {animalBrain, collisions};