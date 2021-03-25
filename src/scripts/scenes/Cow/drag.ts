import { random } from "../../general/basic";

function drag(): void {

  this.input.on('dragstart', (pointer: any, cow: any): void => {

    this.scrolling.downHandler(); // остановка скролла
    this.scrolling.enabled = false; // отключаем скролл
    this.scrolling.wheel = false; // отключаем колесо
    cow.drag = true; // метим перетаскивание для других функций
    cow.setVelocity(0, 0); // отменяем передвижение
    cow.body.onWorldBounds = false; // чтобы не могли перетащить за пределы

    // анимация
    cow.anims.play('cow-drag' + cow.type, true);

  });

  this.input.on('drag', (pointer: any, cow: any, dragX: number, dragY: number): void => {

    if (cow.drag) {

      cow.x = dragX;
      cow.y = dragY;
      cow.setDepth(dragY + Math.round((cow.height / 2) + 100));

    }

  });

  // дропзоны для мерджинга
  this.input.on('drop', (pointer: any, cow: any, zone: any): void => {

    let territory = this.currentTerritory(cow.x, cow.y);
    
    if (territory) {

      if (territory.type === 4) {

        if (cow.type === 0) {

          this.createSpeechBubble(this.state.lang.mergingDiamondCow);
          this.cancelMerging(territory, cow, false);

        } else if (cow.type === this.state.cowSettings.cowSettings.length) {
          
          this.createSpeechBubble(this.state.lang.mergingMessageBreedMax);
          this.cancelMerging(territory, cow, false);

        } else if (this.state.userCow.fair < cow.type) {

          this.createSpeechBubble(this.state.lang.needImproveFair);
          this.cancelMerging(territory, cow, false);

        } else {

          if (zone.type === 'top') {

            this.checkMerging(territory, cow, 'top');

          } else if (zone.type === 'bottom') {

            this.checkMerging(territory, cow, 'bottom');

          }

        }

      } else {

        let randomX: number = random(territory.x + 40, territory.x + 200);
        let randomY: number = random(territory.y + 280, territory.y + 440);
        this.aim(cow, randomX, randomY);
        
      }
    
     } else this.teleportation(cow);

  });

  this.input.on('dragend', (pointer: any, cow: any): void => {

    this.scrolling.enabled = true; // включаем скролл
    this.scrolling.wheel = true; // включаем колесо
    cow.body.onWorldBounds = true;
    cow.drag = false; // убираем метку перетаскивания
    cow.aim = false;
    cow.spread = false;
    cow.aimX = 0;
    cow.aimY = 0;
    cow.collision = 0;
    cow.counter = 200;

    let typeTerritory = this.currentTerritory(cow.x, cow.y);

    if (typeTerritory) {

      if (typeTerritory.type !== 4) {

        // мерджинг на поле
        this.dragCowMerging(cow);

        // удаление животного
        if (typeTerritory.type === 0) {

          cow.expel = true;
          this.state.animal = cow;
          this.confirmExpelCow();

        } else cow.expel = false;

        for (let i in this.territories.children.entries) {

          let territory = this.territories.children.entries[i];

          if (territory.type === 4) {

            let check = territory.merging.find((data: Imerging) => data._id === cow._id);

            if (check) {
              territory.merging.splice(0, 1);
              territory.mergingCounter = 0;
              break;
            }

          } else cow.merging = false;

        }

      }

    } else {
      cow.expel = true;
      this.state.animal = cow;
      this.confirmExpelCow();
      this.teleportation(cow);
    }

  });

}

export default drag;
