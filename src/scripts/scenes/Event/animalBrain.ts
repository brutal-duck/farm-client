import { random } from '../../general/basic';

function collisions(): void {

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
            
            // шанс смены вектора движения
            if (random(1, 170) === 1) {
              animal.data.values.changeVector = true;
              animal.data.values.vector = random(1, 8);
            }
            
            // шанс остановки или продолжения движения
            if (animal.data.values.counter > random(150, 170)) {
              
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
               
            }

          animal.data.values.counter++;

          // счетчик коллизий для обратного движения
          if (animal.data.values.collision >= 0) animal.data.values.collision++;
          if (animal.data.values.collision >= 200) animal.data.values.collision = 0;

        } else {
            // если есть точка-цель
          let distance: number = Phaser.Math.Distance.Between(animal.x, animal.y, animal.data.values.aimX, animal.data.values.aimY);

          if (animal.x < 0 ||
            animal.x > 720 ||
            animal.y < 240 ||
            animal.y > 720 || 
            (distance > animal.data.values.distance && animal.data.values.distance > 0)) {
                
              animal.data.values.aim = false;
              animal.body.reset(animal.x, animal.y);
                
              animal.data.values.moving = false;
              animal.data.values.aimX = 0;
              animal.data.values.aimY = 0;
              animal.data.values.distance = 0;

            } else {

              animal.data.values.distance = distance;

            }

            animal.data.values.counter++; 

          }
          
      }
        
      // уход от границ
      if (((animal.x < animal.width / 2) ||
        (animal.x > 720 - animal.width / 2) ||
        (animal.y < 240 + animal.height / 2) ||
        (animal.y > 720 - animal.height / 2))
        && animal.data.values.working && !animal.data.values.aim) {

          let aimX: number = random(0 + Math.ceil(animal.width / 2), 720 - Math.ceil(animal.width / 2));
          let aimY: number = random(240 + Math.ceil(animal.height / 2), 720 - Math.ceil(animal.height / 2));
          this.aim(animal, aimX, aimY);
      
      } 
    
    }  
    
    animal.setDepth(animal.y + Math.round((animal.height / 2) + 1)); // z-index
  
  }

}

export {animalBrain, collisions};