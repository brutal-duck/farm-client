
import { random } from "../../general/basic";
import { currentTerritory } from "../../general/territories";

function drag(): void {

  this.input.on('dragstart', (pointer: any, animal: Phaser.Physics.Arcade.Sprite): void => {
    this.scrolling.downHandler(); // остановка скролла
    this.scrolling.enabled = false; // отключаем скролл
    this.scrolling.wheel = false; // отключаем колесо
    animal.data.values.drag = true; // метим перетаскивание для других функций
    animal.setVelocity(0, 0); // отменяем передвижение
    animal.setCollideWorldBounds(true);
    if (!animal.data.values.working) {
      animal.data.values.disabledAnimal = this.add.sprite(animal.x, animal.y, animal.texture.key).setAlpha(0.7).setDepth(animal.y).setInteractive();
      
      this.click(animal.data.values.disabledAnimal, ():void => {
        this.teleportation(animal);
      })
    }
    
   // анимация
    animal.anims.play('chicken-drag' + animal.data.values.type, true);

  });

  this.input.on('drag', (pointer: any, animal: Phaser.Physics.Arcade.Sprite, dragX: number, dragY: number): void => {

    if (animal.data.values.drag) {

      animal.x = dragX;
      animal.y = dragY;
      animal.setDepth(dragY + Math.round((animal.height / 2) + 100));

    }

  });

  // дропзоны для мерджинга
  this.input.on('drop', (pointer: any, animal: Phaser.Physics.Arcade.Sprite, zone: Phaser.GameObjects.Zone): void => {
    console.log('drop')

     if (zone.type === 'type0') {
      animal.data.values.working = true;
     } else {
       animal.data.values.working = false;
       let territory: Phaser.Physics.Arcade.Sprite = this.currentTerritory(animal.x, animal.y);
       if (territory) {
          
        animal.x = zone.x + zone.width / 2;
        animal.y = zone.y + zone.height / 2;
        
       }
     }
  });
  
  this.input.on('dragend', (pointer: any, animal: Phaser.Physics.Arcade.Sprite): void => {

    this.scrolling.enabled = true; // включаем скролл
    this.scrolling.wheel = true; // включаем колесо
    animal.setCollideWorldBounds(true);
    animal.data.values.drag = false; // убираем метку перетаскивания
    animal.data.values.aim = false;
    animal.data.values.aimX = 0;
    animal.data.values.aimY = 0;
    animal.data.values.collision = 0;
    if (animal.data.values.working) {
      // если зона работы
      console.log('work');
    } else {
      // если это не рабочая зона
      console.log('merge');
      animal.data.values.working = false;
      let territory: Phaser.Physics.Arcade.Sprite = this.currentTerritory(animal.x, animal.y);
    
      if (territory) {
  
        if (territory.data.values.type !== 4) {
          animal.data.values.disabledAnimal.destroy();
          this.checkMerging(animal);        
          // удаление животного
          if (territory.data.values.type === 0) {
            animal.data.values.expel = true;
            this.state.animal = animal;
            this.confirmExpelAnimal();
  
          } else animal.data.values.expel = false;
        }
      }
    }
  });

}

export default drag;
