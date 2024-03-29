import { random } from "../../general/basic";
import SpeechBubble from '../../components/animations/SpeechBuble';

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

      if (territory.territoryType === 4) {

        if (chicken.type === 0) {
          SpeechBubble.create(this, this.state.lang.mergingDiamondChicken, 1);
          this.cancelMerging(territory, chicken, false);
        } else if (chicken.type === this.state.chickenSettings.chickenSettings.length) {
          SpeechBubble.create(this, this.state.lang.mergingMessageBreedMax, 1);
          this.cancelMerging(territory, chicken, false);
        } else if (this.state.userChicken.fair < chicken.type) {
          SpeechBubble.create(this, this.state.lang.needImproveFair, 1);
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
    chicken.spread = false;
    chicken.aimX = 0;
    chicken.aimY = 0;
    chicken.collision = 0;
    chicken.counter = 200;

    let typeTerritory = this.currentTerritory(chicken.x, chicken.y);

    if (typeTerritory) {

      if (typeTerritory.territoryType !== 4) {

        // мерджинг на поле
        this.dragChickenMerging(chicken);

        // удаление животного
        if (typeTerritory.territoryType === 0) {

          chicken.expel = true;
          this.state.animal = chicken;
          this.confirmExpelChicken();

        } else chicken.expel = false;

        for (let i in this.territories.children.entries) {

          let territory = this.territories.children.entries[i];

          if (territory.territoryType === 4) {

            let check = territory.merging.find((data: Imerging) => data._id === chicken._id);

            if (check) {
              territory.merging.splice(0, 1);
              territory.mergingCounter = 0;
              break;
            }

          } else chicken.merging = false;

        }

      }

    } else {
      chicken.expel = true;
      this.state.animal = chicken;
      this.confirmExpelChicken();
      this.teleportation(chicken);
    }

  });

}

export default drag;
