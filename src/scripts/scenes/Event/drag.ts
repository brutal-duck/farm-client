function drag(): void {

  this.input.on('dragstart', (pointer: any, animal: Phaser.Physics.Arcade.Sprite): void => {
    if (animal.state === 'base') {
      if (animal.data.values.active.data.values.teleport) return;
    }
    this.scrolling.downHandler(); // остановка скролла
    this.scrolling.enabled = false; // отключаем скролл
    this.scrolling.wheel = false; // отключаем колесо
    animal.data.values.zone = false;
    animal.data.values.working = false;
    animal.data.values.drag = true; // метим перетаскивание для других функций
    animal.data.values.cloud?.setVisible(false);
    animal.data.values.cloud?.setOrigin(0.5, 0.5);
    animal.setOrigin(0.5, 0.5);
    animal.setVelocity(0, 0); // отменяем передвижение
    animal.setCollideWorldBounds(true);

  });

  this.input.on('drag', (pointer: any, animal: Phaser.Physics.Arcade.Sprite, dragX: number, dragY: number): void => {

    if (animal.data.values.drag) {

      animal.x = dragX;
      animal.y = dragY;
      animal.setDepth(dragY + Math.round((animal.height / 2) + 1000));

    }

  });

  // дропзоны для мерджинга
  this.input.on('drop', (pointer: any, animal: Phaser.Physics.Arcade.Sprite, zone: Phaser.GameObjects.Zone): void => {
    if (animal.state === 'base') {
      if (zone.type === 'type0') {
        this.teleportation(animal); 

      } else if (zone) {
        animal.data.values.zone = true;
        let territory: Phaser.Physics.Arcade.Sprite = this.currentTerritory(animal.x, animal.y);
        if (territory) {
          
        animal.x = zone.x + zone.width / 2;
        animal.y = zone.y + zone.height / 2;
        
       } 
      }
    } else if (animal.state === 'active') {
      
      if (zone.type === 'type0') {
       animal.data.values.working = true;
       animal.data.values.zone = true;
      } else if (zone) {
        animal.data.values.working = false;
        animal.data.values.zone = true;
        let territory: Phaser.Physics.Arcade.Sprite = this.currentTerritory(animal.x, animal.y);
        if (territory) {
          animal.setOrigin(0.5, 0.5);
          animal.x = zone.x + zone.width / 2;
          animal.y = zone.y + zone.height / 2;
          animal.setDepth(animal.y + 100);
         
        } 
      } 
    }



  });
  
  this.input.on('dragend', (pointer: any, animal: Phaser.Physics.Arcade.Sprite): void => {
    this.scrolling.enabled = true; // включаем скролл
    this.scrolling.wheel = true; // включаем колесо
    animal.data.values.drag = false; // убираем метку перетаскивания
    
    if (!animal.data.values.zone)  {
      
      if (animal.y > this.topIndent + 480 + 240 * 3.5){

        if (animal.state === 'active') { 
          animal.data.values.base.data.values.expel = true;
          this.state.animal = animal.data.values.base;

        } else if (animal.state === 'base') {
          animal.data.values.expel = true;
          
          this.state.animal = animal;
        }
        this.teleportation(animal, undefined, true);
        this.confirmExpelAnimal();
      } 
      this.teleportation(animal, undefined, true); 
      return;
    }

    if (animal.state === 'active') {
      animal.data.values.aim = false;
      animal.data.values.aimX = 0;
      animal.data.values.aimY = 0;
      animal.data.values.collision = 0;

      if (animal.data.values.working) {
        // если зона работы
  
      } else {
        // если это не рабочая зона

        let territory: Phaser.Physics.Arcade.Sprite = this.currentTerritory(animal.x, animal.y);
      
        if (territory) {
    
          if (territory.data.values.type !== 4) {
  
            // удаление животного
            if (territory.data.values.type === 0) {
              animal.data.values.base.data.values.expel = true;
              this.teleportation(animal, undefined, true);
              this.state.animal = animal.data.values.base;
              this.confirmExpelAnimal();
    
            } else {
              
              animal.data.values.base.data.values.expel = false;
              this.checkMerging(animal); 
            }
          }
        } else this.teleportation(animal, undefined, true);
      }

    } else if (animal.state === 'base') {
      let territory: Phaser.Physics.Arcade.Sprite = this.currentTerritory(animal.x, animal.y);
      
      if (territory) {
  
        if (territory.data.values.type !== 4) {

          // удаление животного
          if (territory.data.values.type === 0) {
            animal.data.values.expel = true;
            this.teleportation(animal, undefined, true);
            this.state.animal = animal;
            this.confirmExpelAnimal();
  
          } else {
            animal.data.values.expel = false;
            this.checkMerging(animal); 
          }
        }
      } else this.teleportation(animal, undefined, true);
    }
  });
 
}

export default drag;
