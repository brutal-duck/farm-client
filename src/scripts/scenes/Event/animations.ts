
function flyAnimal(): void {
  this.time.addEvent({
    delay: 30,
    callback: (): void => {
      this.animals.children.entries.forEach(animal => {
        let activeAnimal: Phaser.Physics.Arcade.Sprite = animal.data.values.active;

        if (activeAnimal.data.values.working) {
          let coefficient: number = activeAnimal.height / activeAnimal.data.values.cloud.height;
        
          let originTerm: number = 0.0065;
          if (activeAnimal.data.values.topPosition) {
            activeAnimal.originY -= originTerm;
            activeAnimal.data.values.cloud.originY -= originTerm * coefficient;
            activeAnimal.setOrigin(0.5, activeAnimal.originY);
            activeAnimal.data.values.cloud.setOrigin(0.5, activeAnimal.data.values.cloud.originY);
            if (activeAnimal.originY <= 0.45) activeAnimal.data.values.topPosition = false;
            
          } else {
            activeAnimal.originY += originTerm;
            activeAnimal.data.values.cloud.originY += originTerm * coefficient;
            activeAnimal.setOrigin(0.5, activeAnimal.originY);
            activeAnimal.data.values.cloud.setOrigin(0.5, activeAnimal.data.values.cloud.originY);
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
      this.input.setDraggable(animal, false);
      if (animal.data.values.active.data.values.goWork) {
        
        animal.data.values.active.setDepth(animal.data.values.active.y);
        let target: Iposition = animal.data.values.active.data.values.target;
        
        let distance: number = Phaser.Math.Distance.Between(animal.data.values.active.x, animal.data.values.active.y, target.x, target.y);
        if ((distance > animal.data.values.active.data.values.distance && animal.data.values.active.data.values.distance > 0) || distance < 40) {
          animal.data.values.active.data.values.distance = 0;
          this.input.setDraggable(animal, true);
          animal.data.values.active.data.values.working = true;
          animal.data.values.active.data.values.goWork = false;
          animal.data.values.active.body.reset(target.x, target.y);
          animal.data.values.active.setOrigin(0.5, 0.5);
          animal.data.values.active.data.values.teleport = false;
          animal.setDepth(animal.y);
          animal.data.values.active.setDepth(animal.y * 2);
        } else animal.data.values.active.data.values.distance = distance;

      } else {
        animal.data.values.active.setDepth(animal.data.values.active.y);
        let target: Iposition = animal.data.values.target;
        let distance: number = Phaser.Math.Distance.Between(animal.data.values.active.x, animal.data.values.active.y, target.x, target.y);
        if ((distance > animal.data.values.active.data.values.distance && animal.data.values.active.data.values.distance > 0) || distance < 40) {
          animal.data.values.active.data.values.distance = 0;
          this.input.setDraggable(animal, true);
          animal.data.values.active.body.reset(target.x, target.y);
          animal.data.values.active.setOrigin(0.5, 0.5);
          animal.data.values.active.data.values.teleport = false;
          animal.setDepth(animal.y);
          animal.data.values.active.setDepth(animal.y * 2);
        } else animal.data.values.active.data.values.distance = distance;
      }
      
    }

    if (animal.data.values.teleport) {
      animal.setDepth(animal.y);
      let target: Iposition = animal.data.values.target;
      let distance: number = Phaser.Math.Distance.Between(animal.x, animal.y, target.x, target.y);
      if ((distance > animal.data.values.distance && animal.data.values.distance > 0) || distance < 40) {
        animal.data.values.distance = 0;
        this.input.setDraggable(animal, true);
        animal.body.reset(target.x, target.y);
        animal.setDepth(animal.y);
        animal.data.values.teleport = false;
        this.checkMerging(animal);
      } else animal.data.values.distance = distance;
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
          animal1.setDepth(target.y + 100);
          animal1.data.values.cloud.setVisible(false);
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
        animal2.setDepth(target.y + 100);
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
        animal2.setDepth(target.y + 100);
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


// перетаскивание овец
function dragEventAnimal(animal: boolean = false): void {
 
  if (this.showMergPointer) {
    
    if (this.state.user.additionalTutorial.eventTutorial === 40) {
      if (!this.mergPointer.start) {
        let distance: number = 285;
        let target: Phaser.Math.Vector2 = new Phaser.Math.Vector2();

        this.mergPointer.stop = false;
        this.mergPointer.setVisible(true);
        this.mergPointer.data.values.animal.setVisible(true);
        let animal1: Phaser.Physics.Arcade.Sprite = this.game.scene.keys['Event'].animals.getChildren()[0];
        let animal2: Phaser.Physics.Arcade.Sprite = this.game.scene.keys['Event'].animals.getChildren()[1];
        target.x = animal2.x;
        target.y = animal2.y;
        this.mergPointer.x = animal1.x;
        this.mergPointer.y = animal1.y;
        this.mergPointer.data.values.animal.setX(this.mergPointer.x);
        this.mergPointer.data.values.animal.setY(this.mergPointer.y);
        distance = 300;
        this.mergPointer.target = target;

        if (this.mergPointer.scene) {
  
          this.physics.moveToObject(this.mergPointer, target, distance);
          this.physics.moveToObject(this.mergPointer.data.values.animal, target, distance);
          this.mergPointer.start = true;
          this.mergPointer.setDepth(this.mergPointer.y + 10001);
          this.mergPointer.data.values.animal.setDepth(this.mergPointer.y + 10000);
          
        } 
      
      } else {

        let distance: number = Phaser.Math.Distance.Between(this.mergPointer.x, this.mergPointer.y, this.mergPointer.target.x, this.mergPointer.target.y);
        
        if (distance <= 10 && !this.mergPointer.stop) {

          this.mergPointer.stop = true;
          this.mergPointer.data.values.animal.body.reset(this.mergPointer.target.x, this.mergPointer.target.y);
          this.mergPointer.body.reset(this.mergPointer.target.x, this.mergPointer.target.y);
          
          this.mergPointer.first = !this.mergPointer.first;
  
          this.time.addEvent({ delay: 300, callback: (): void => {
            this.mergPointer.setVisible(false);
            this.mergPointer?.data?.values.animal.setVisible(false);
          }, callbackScope: this, loop: false });
  
          this.time.addEvent({ delay: 1000, callback: (): void => {
            this.showMergPointer = true;
            this.mergPointer.start = false;
          }, callbackScope: this, loop: false });
        }
      }
    } else if (this.state.user.additionalTutorial.eventTutorial === 50) {
      
      if (!this.mergPointer.start) {
        let target: Phaser.Math.Vector2 = new Phaser.Math.Vector2();
        let distance: number = 285;

        this.mergPointer.stop = false;
        this.mergPointer?.setVisible(true);
        this.mergPointer?.data?.values.animal?.setVisible(true);
        
        target.x = 360;
        target.y = 360;
        
        let animal: Phaser.Physics.Arcade.Sprite = this.game.scene.keys['Event'].animals.getChildren()[0];
        this.mergPointer.setX(animal.x);
        this.mergPointer.setY(animal.y);
        this.mergPointer?.data?.values.animal?.setX(this.mergPointer.x);
        this.mergPointer?.data?.values.animal?.setY(this.mergPointer.y);
        distance = 300;
        this.mergPointer.target = target;
          
        if (this.mergPointer.scene) {
    
          this.physics.moveToObject(this.mergPointer, target, distance);
          this.physics.moveToObject(this.mergPointer.data.values.animal, target, distance);
          this.mergPointer.start = true;
          this.mergPointer.setDepth(this.mergPointer.y + 10001);
          this.mergPointer.data.values.animal.setDepth(this.mergPointer.y + 10000);
          
        }

      } else {
        
        let distance: number = Phaser.Math.Distance.Between(this.mergPointer.x, this.mergPointer.y, this.mergPointer.target.x, this.mergPointer.target.y);
        if (distance <= 10 && !this.mergPointer.stop) {
  
          this.mergPointer.stop = true;
          this.mergPointer.data.values.animal.body.reset(this.mergPointer.x, this.mergPointer.y);
          this.mergPointer.body.reset(this.mergPointer.x, this.mergPointer.y);
          
          this.mergPointer.first = !this.mergPointer.first;
  
          this.time.addEvent({ delay: 300, callback: (): void => {
            this.mergPointer.setVisible(false);
            this.mergPointer?.data?.values.animal?.setVisible(false);
          }, callbackScope: this, loop: false });
  
          this.time.addEvent({ delay: 1000, callback: (): void => {
            this.showMergPointer = true;
            this.mergPointer.start = false;
          }, callbackScope: this, loop: false });

        }

      }
    }
  }

}
export {
  flyAnimal,
  plusResourceAnimation,
  teleportation,
  updateTeleportation,
  dragEventAnimal,
}
