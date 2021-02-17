import { sheepSettings, chickenSettings } from './settings';

export default (): Iprogress => {

  let sheepPart: number = 1;
  let chickenPart: number = 0;
  let openChicken: boolean = false;
  let eventMaxLevelAnimal: number = 0

  if (localStorage.userSheep) sheepPart = JSON.parse(localStorage.userSheep).part;

  if (localStorage.userChicken) {

    chickenPart = JSON.parse(localStorage.userChicken).part;
    if (chickenPart > 0) openChicken = true;

  }

  return {
    sheep: {
      part: sheepPart,
      max: sheepSettings.sheepParts.length,
      open: true,
      price: 0,
      unlock: 0,
      donate: false
    },
    chicken: {
      part: chickenPart,
      max: chickenSettings.chickenParts.length,
      open: openChicken,
      price: 300000000,
      unlock: 8,
      donate: false
    },
    event: {
      maxLevelAnimal: eventMaxLevelAnimal,
      startTime: 0,
      endTime: 0,
      open: false
    }
  }

}
