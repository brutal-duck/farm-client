import { random } from "../../general/basic";
import SpeechBubble from '../../components/animations/SpeechBuble';
import CowSprite from '../../components/Animal/CowSprite';

function drag(): void {

  this.input.on('dragstart', (pointer: any, cow: CowSprite): void => {
    cow.startDrag()
  });

  this.input.on('drag', (pointer: any, cow: CowSprite, dragX: number, dragY: number): void => {
    cow.dragging(dragX, dragY);
  });

  // дропзоны для мерджинга
  this.input.on('drop', (pointer: any, cow: CowSprite, zone: any): void => {

    let territory = this.currentTerritory(cow.x, cow.y);
    if (territory) {
      if (territory.type === 4) {
        if (cow.breed === 0) {
          SpeechBubble.create(this, this.state.lang.mergingDiamondCow, 1);
          this.cancelMerging(territory, cow, false);
        } else if (cow.breed === this.state.cowSettings.cowSettings.length) {
          SpeechBubble.create(this, this.state.lang.mergingMessageBreedMax, 1);
          this.cancelMerging(territory, cow, false);
        } else if (this.state.userCow.fair < cow.breed) {
          SpeechBubble.create(this, this.state.lang.needImproveFair, 1);
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
        cow.setAim(randomX, randomY);
      }
     } else cow.teleportation();
  });

  this.input.on('dragend', (pointer: any, cow: CowSprite): void => {
    cow.endDrag();
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
      cow.teleportation();
    }
  });
}

export default drag;
