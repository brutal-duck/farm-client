import { random } from './basic';

function collisions(): void {

  let animals: any;

  if (this.state.farm === 'Sheep') animals = this.sheep;
  else if (this.state.farm === 'Chicken') animals = this.chicken;
  else if (this.state.farm === 'Cow') animals = this.cow;

  this.physics.add.overlap(animals, this.territories, (animal: any, territory: any): void => {

    if (territory.type !== 2 &&
      territory.type !== 3 &&
      !animal.drag &&
      !animal.aim) {

      let halfWidth: number = Math.ceil(animal.width / 2) + 1;
      let halfHeight: number = Math.ceil(animal.height / 2) + 1;

      let territory = this.currentTerritory(animal.x, animal.y);
      
      if (territory === undefined) {

        this.teleportation(animal);

      } else {

        if (territory.type === 2 || territory.type === 3) {

          let minX: number = (territory.position - 1) * this.height + halfWidth;
          let maxX: number = territory.position * this.height - halfWidth;
        
          let mixY: number = (territory.block - 1) * this.height + halfHeight + this.topIndent;
          let maxY: number = territory.block * this.height - halfHeight + this.topIndent;

          let x: number = random(minX, maxX);
          let y: number = random(mixY, maxY);
          if (this.state.farm === 'Cow') {
            animal.setAim(x, y);
          } else {
            this.aim(animal, x, y);
          }

        }

      }

    }

  }, null, this);

  this.physics.add.overlap(animals, animals, (animal1: any, animal2: any): void => {

    if (!animal1.drag &&
      !animal2.drag &&
      animal1.collision === 0 &&
      animal1.moving &&
      !animal1.aim) {

      let territory = this.currentTerritory(animal1.x, animal1.y);
      
      if (territory.type !== 4) {
        if (this.state.farm === 'Cow') {
          animal1.setReverse();
        } else {
          this.reverse(animal1);
        }
      }
      
    }

  }, null, this);

}

export default collisions;
