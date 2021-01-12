import { random } from "../../general/basic";

function drag(): void {

  this.input.on('dragstart', (pointer: any, chicken: any): void => {

    this.scrolling.downHandler(); // остановка скролла
    this.scrolling.enabled = false; // отключаем скролл
    this.scrolling.wheel = false; // отключаем колесо
    chicken.drag = true; // метим перетаскивание для других функций
    chicken.setVelocity(0, 0); // отменяем передвижение
    chicken.body.onWorldBounds = false; // чтобы не могли перетащить за пределы

    // анимация
    chicken.anims.play('chicken-drag' + chicken.type, true);

  });

  this.input.on('drag', (pointer: any, chicken: any, dragX: number, dragY: number): void => {

    if (chicken.drag) {

      chicken.x = dragX;
      chicken.y = dragY;
      chicken.setDepth(dragY + Math.round((chicken.height / 2) + 100));

    }

  });

  // дропзоны для мерджинга
  this.input.on('drop', (pointer: any, chicken: any, zone: any): void => {

    let territory = this.currentTerritory(chicken.x, chicken.y);
    
    if (territory) {

      if (territory.type === 4) {

        if (chicken.type === 0) {

          this.createSpeechBubble(this.state.lang.mergingDiamondChicken);
          this.cancelMerging(territory, chicken, false);

        } else if (chicken.type === this.state.chickenSettings.chickenSettings.length) {
          
          this.createSpeechBubble(this.state.lang.mergingMessageBreedMax);
          this.cancelMerging(territory, chicken, false);

        } else if (this.state.userChicken.fair < chicken.type) {

          this.createSpeechBubble(this.state.lang.needImproveFair);
          this.cancelMerging(territory, chicken, false);

        } else {

          if (zone.type === 'left') {

            this.checkMerging(territory, chicken, 'left');

          } else if (zone.type === 'right') {

            this.checkMerging(territory, chicken, 'right');

          }

        }

      } else {

        let randomX: number = random(territory.x + 40, territory.x + 200);
        let randomY: number = random(territory.y + 280, territory.y + 440);
        this.aim(chicken, randomX, randomY);
        
      }
    
     } else this.teleportation(chicken);

  });

  this.input.on('dragend', (pointer: any, chicken: any): void => {

    this.scrolling.enabled = true; // включаем скролл
    this.scrolling.wheel = true; // включаем колесо
    chicken.body.onWorldBounds = true;
    chicken.drag = false; // убираем метку перетаскивания
    chicken.aim = false;
    chicken.aimX = 0;
    chicken.aimY = 0;
    chicken.collision = 0;
    chicken.counter = 200;

    let typeTerritory = this.currentTerritory(chicken.x, chicken.y);

    if (typeTerritory) {

      if (typeTerritory.type !== 4) {

        // мерджинг на поле
        this.dragChickenMerging(chicken);

        // удаление животного
        if (typeTerritory.type === 0) {

          chicken.expel = true;
          this.state.animal = chicken;
          this.confirmExpelChicken();

        } else chicken.expel = false;

        for (let i in this.territories.children.entries) {

          let territory = this.territories.children.entries[i];

          if (territory.type === 4) {

            let check = territory.merging.find((data: Imerging) => data._id === chicken._id);

            if (check) {
              territory.merging.splice(0, 1);
              territory.mergingCounter = 0;
              break;
            }

          } else chicken.merging = false;

        }

      }

    } else this.teleportation(chicken);

  });

}

export default drag;
