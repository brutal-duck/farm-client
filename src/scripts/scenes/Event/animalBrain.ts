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

    let animal: Phaser.Physics.Arcade.Sprite = this.animals.children.entries[i].data.values.active;
    
    // если не перетаскиваем
    if (!animal.data.values.drag) {
      
      if (animal.data.values.working) {
        
        animal.data.values.cloud.setVisible(true);
        animal.data.values.cloud.x = animal.x;
        animal.data.values.cloud.y = animal.y + animal.height / 2 - 10;
        
          // // если нет цели у животного
          if (!animal.data.values.aim) {
            
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
            animal.y < this.topIndent ||
            animal.y > this.topIndent + 480 || 
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
          
        // уход от границ
        if (((animal.x < animal.width / 2) ||
        (animal.x > 720 - animal.width / 2) ||
        (animal.y < this.topIndent + animal.height / 2) ||
        (animal.y > this.topIndent + 480 - animal.height / 2 - animal.data.values.cloud.height / 4))
        && animal.data.values.working && !animal.data.values.aim) {
  
        let aimX: number = random(0 + Math.ceil(animal.width / 2), 720 - Math.ceil(animal.width / 2));
        let aimY: number = random(this.topIndent + Math.ceil(animal.height / 2), this.topIndent + 480 - Math.ceil(animal.height / 2));
        this.aim(animal, aimX, aimY);
      
        }   
        
      } 

    }  
    
    animal.data.values.cloud.setDepth(animal.y + Math.round((animal.height / 2) + 100));
    animal.setDepth(animal.y + Math.round((animal.height / 2) + 101)); // z-index
    if (animal.data.values.teleport) animal.setDepth(animal.y * 10000);
    if (animal.data.values.base.data.values.teleport) animal.data.values.base.setDepth(animal.y * 10000);
  
  }

}

export {animalBrain, collisions};