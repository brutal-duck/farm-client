// мигание нулевого таймера собирателя
function pulseCollector(): void {

  if (this.state.userEvent.collector === 0) {

    this.collector.pulseTimer++;

    if (this.collector.pulseTimer === 20) this.collector.setColor(false);
    else if (this.collector.pulseTimer === 40) {
      this.collector.pulseTimer = 0;
      this.collector.setColor(true);
    }

  }

}

function flyAnimal(): void {
  this.time.addEvent({
    delay: 30,
    callback: (): void => {
      this.animals.children.entries.forEach(animal => {
        let activeAnimal: Phaser.Physics.Arcade.Sprite = animal.data.values.active;

        if (activeAnimal.data.values.working) {
          
          if (activeAnimal.data.values.topPosition) {
            activeAnimal.originY -= 0.0065;
            activeAnimal.setOrigin(0.5, activeAnimal.originY);
            activeAnimal.data.values.cloud.setOrigin(0.5, activeAnimal.originY);
            if (activeAnimal.originY <= 0.45) activeAnimal.data.values.topPosition = false;
            
          } else {
            activeAnimal.originY += 0.0065;
            activeAnimal.setOrigin(0.5, activeAnimal.originY);
            activeAnimal.data.values.cloud.setOrigin(0.5, activeAnimal.originY);
            if (activeAnimal.originY >= 0.55) activeAnimal.data.values.topPosition = true;
          }
        }
        
      });
    },
    loop: true

  });

}

function plusResourceAnimation(position: Iposition): void {
  
  let y = position.y - this.game.scene.keys[this.state.farm].scrolling.scrollY;

  let resource: Phaser.GameObjects.Sprite = this.сurrency.create(position.x, y, 'event-resource');
  resource.setDataEnabled();
  resource.data.values.counter = 0;

  let target: Iposition = { x: 495, y: 80 }
  let aim = new Phaser.Math.Vector2();
  aim.x = target.x;
  aim.y = target.y;
  let distance: number = Phaser.Math.Distance.Between(resource.x, resource.y, target.x, target.y) * 2;
  this.physics.moveToObject(resource, aim, distance);

}

function updateTeleportation() {
  this.animals.children.entries.forEach((animal: Phaser.Physics.Arcade.Sprite) => {
    
    if (animal.data.values.active.data.values.teleport) {
      let target: Iposition = animal.data.values.target;
      let distance: number = Phaser.Math.Distance.Between(animal.data.values.active.x, animal.data.values.active.y, target.x, target.y);
      if (distance < 40) {
        animal.data.values.active.body.reset(target.x, target.y);
        animal.data.values.active.data.values.teleport = false;
        animal.setDepth(animal.y);
        animal.data.values.active.setDepth(animal.y * 2);
      }

    }

    if (animal.data.values.teleport) {
      let target: Iposition = animal.data.values.target;
      let distance: number = Phaser.Math.Distance.Between(animal.x, animal.y, target.x, target.y);
      if (distance < 40) {
        animal.body.reset(target.x, target.y);
        animal.setDepth(animal.y);
        animal.data.values.teleport = false;
        this.checkMerging(animal);
      }
    }
    
  })
}

function teleportation(
  animal1: Phaser.Physics.Arcade.Sprite, 
  animal2?: Phaser.Physics.Arcade.Sprite, 
  click: boolean = false
  ): void {
 
  if (animal1.data.values.drag === false) {

    if (!animal2) {
      
      if (click) {

        if (animal1.state === 'active') {

          let target: Iposition = new Phaser.Math.Vector2();
          target.x = animal1.data.values.base.x;
          target.y = animal1.data.values.base.y;
          animal1.data.values.base.data.values.target = target;
          animal1.data.values.teleport = true;
          animal1.data.values.drag = false; // убираем метку перетаскивания
          animal1.data.values.aim = false;
          animal1.setVelocity(0);
          animal1.data.values.aimX = 0;
          animal1.data.values.aimY = 0;
          animal1.data.values.working = false;
          animal1.setDepth(animal1.data.values.base.y + 100);
  
          let speed: number = Phaser.Math.Distance.Between(animal1.x, animal1.y, target.x, target.y) * 4;
          
          this.physics.moveToObject(animal1, target, speed);

        } else if (animal1.state === 'base') {

          let target: Iposition = new Phaser.Math.Vector2();
          target.x = animal1.data.values.oldX;
          target.y = animal1.data.values.oldY;
          animal1.data.values.target = target;
          animal1.data.values.teleport = true;
          let speed: number = Phaser.Math.Distance.Between(animal1.x, animal1.y, target.x, target.y) * 4;
          
          this.physics.moveToObject(animal1, target, speed);
        }
        
      } else {

        if (animal1.state === 'active') {
        
          animal1.data.values.base.x = animal1.x;
          animal1.data.values.base.y = animal1.y;
          animal1.data.values.base.data.values.oldX = animal1.data.values.base.x;
          animal1.data.values.base.data.values.oldY = animal1.data.values.base.y;
          animal1.setDepth(animal1.y + 1);
          animal1.data.values.base.setDepth(animal1.y);
  
        } else if (animal1.state === 'base') {
          animal1.data.values.oldX = animal1.x;
          animal1.data.values.oldY = animal1.y;
          animal1.setDepth(animal1.y);
        }
      }
    
    } else {
      
      if (animal1.state === 'active') {

        let target: Iposition = new Phaser.Math.Vector2();
        target.x = animal1.data.values.base.data.values.oldX;
        target.y = animal1.data.values.base.data.values.oldY;
        
        let speed: number = Phaser.Math.Distance.Between(animal2.x, animal2.y, target.x, target.y) * 4;
        
        animal2.data.values.teleport = true;

        if (animal2.state === 'active') {

          animal2.data.values.base.data.values.target = target;
          animal1.data.values.base.x = animal1.x;
          animal1.data.values.base.y = animal1.y;
          animal1.data.values.base.data.values.oldX = animal1.data.values.base.x;
          animal1.data.values.base.data.values.oldY = animal1.data.values.base.y;

          animal2.data.values.base.data.values.oldX = target.x;
          animal2.data.values.base.data.values.oldY = target.y;
          this.physics.moveToObject(animal2, target, speed);
          this.physics.moveToObject(animal2.data.values.base, target, speed);
          animal2.data.values.base.data.values.teleport = true;

        } else if (animal2.state === 'base') {

          animal2.data.values.target = target;
          this.physics.moveToObject(animal2, target, speed);
          animal1.data.values.oldX = animal1.data.values.base.x;
          animal1.data.values.oldY = animal1.data.values.base.y;
          
          animal2.data.values.oldX = target.x;
          animal2.data.values.oldY = target.y;

        }

      } else if (animal1.state === 'base') {
        

        let target: Iposition = new Phaser.Math.Vector2();
        target.x = animal1.data.values.oldX;
        target.y = animal1.data.values.oldY;
        
        animal2.data.values.oldX = target.x;
        animal2.data.values.oldY = target.y;
        
        animal1.data.values.oldX = animal1.x;
        animal1.data.values.oldY = animal1.y;

        let speed: number = Phaser.Math.Distance.Between(animal2.x, animal2.y, target.x, target.y) * 4;

        this.physics.moveToObject(animal2, target, speed);
        animal2.data.values.teleport = true;

        if (animal2.state === 'active') {

          animal2.data.values.base.data.values.target = target;
          animal2.data.values.base.data.values.teleport = true;
          this.physics.moveToObject(animal2.data.values.base, target, speed);
          

        } else if (animal2.state === 'base') {
          animal2.data.values.target = target;
        }
      }
      this.checkMerging(animal1);
    }
  }
}

export {
  pulseCollector,
  flyAnimal,
  plusResourceAnimation,
  teleportation,
  updateTeleportation
}
