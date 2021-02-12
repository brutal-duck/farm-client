import { random } from "../../general/basic";

function drag(): void {

  this.input.on('dragstart', (pointer: any, sheep: any): void => {
    
    if (this.state.userSheep.tutorial >= 70) {

      this.scrolling.downHandler(); // остановка скролла
      this.scrolling.enabled = false; // отключаем скролл
      this.scrolling.wheel = false; // отключаем колесо
      sheep.drag = true; // метим перетаскивание для других функций
      sheep.setVelocity(0, 0); // отменяем передвижение
      sheep.body.onWorldBounds = false; // чтобы не могли перетащить за пределы

      // анимация
      if (sheep.vector === 2 ||
        sheep.vector === 3 ||
        sheep.vector === 7 ||
        sheep.vector === 8) {
        sheep.anims.play('sheep-stay-left' + sheep.type, true);
      } else {
        sheep.anims.play('sheep-stay-right' + sheep.type, true);
      }

    }

  });

  this.input.on('drag', (pointer: any, sheep: any, dragX: number, dragY: number): void => {

    if (this.state.userSheep.tutorial >= 70) {

      sheep.x = dragX;
      sheep.y = dragY;
      sheep.setDepth(dragY + Math.round((sheep.height / 2) + 100));
      
    }

  });

  // дропзоны для мерджинга
  this.input.on('drop', (pointer: any, sheep: any, zone: any): void => {

    let territory = this.currentTerritory(sheep.x, sheep.y);
    
    if (territory) {

      if (territory.type === 4) {

        if (sheep.type === 0) {

          this.createSpeechBubble(this.state.lang.mergingDiamondSheep);
          this.cancelMerging(territory, sheep, false);

        } else if (sheep.type === this.state.sheepSettings.sheepSettings.length) {
          
          this.createSpeechBubble(this.state.lang.mergingMessageBreedMax);
          this.cancelMerging(territory, sheep, false);

        } else if (this.state.userSheep.fair < sheep.type) {

          this.createSpeechBubble(this.state.lang.needImproveFair);
          this.cancelMerging(territory, sheep, false);

        } else {

          if (zone.type === 'top') {

            this.checkMerging(territory, sheep, 'top');

          } else if (zone.type === 'bottom') {

            this.checkMerging(territory, sheep, 'bottom');

          }

        }

      } else {

        let randomX: number = random(territory.x + 40, territory.x + 200);
        let randomY: number = random(territory.y + 280, territory.y + 440);
        this.aim(sheep, randomX, randomY);
        
      }

    } else this.teleportation(sheep);

  });

  this.input.on('dragend', (pointer: any, sheep: any): void => {

    this.scrolling.enabled = true; // включаем скролл
    this.scrolling.wheel = true; // включаем колесо
    sheep.body.onWorldBounds = true;
    sheep.drag = false; // убираем метку перетаскивания
    sheep.aim = false;
    sheep.spread = false;
    sheep.aimX = 0;
    sheep.aimY = 0;
    sheep.collision = 0;
    sheep.counter = 200;

    let typeTerritory = this.currentTerritory(sheep.x, sheep.y);

    if (typeTerritory) {

      if (typeTerritory.type !== 4) {

        // мерджинг на поле
        this.dragSheepMerging(sheep);

        // удаление животного
        if (typeTerritory.type === 0 && this.state.userSheep.tutorial >= 100) {

          sheep.expel = true;
          this.state.animal = sheep;
          this.confirmExpelSheep();

        } else sheep.expel = false;

        for (let i in this.territories.children.entries) {

          let territory = this.territories.children.entries[i];

          if (territory.type === 4) {

            let check = territory.merging.find((data: Imerging) => data._id === sheep._id);

            if (check) {
              territory.merging.splice(0, 1);
              territory.mergingCounter = 0;
              break;
            }

          } else sheep.merging = false;

        }

      }

    } else this.teleportation(sheep);
    
  });

}

export default drag;
