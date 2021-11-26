import { sheepSettings, chickenSettings, cowSettings } from './settings';
import LocalStorage from './../libs/LocalStorage';
import sheepPartSettings from './test/sheepPartSettings';
import chickenPartSettings from './test/chickenPartSettings';

export default (test?: boolean): Iprogress => {

  let sheepPart: number = 1;
  let chickenPart: number = 0;
  let cowPart: number = 0;
  let openChicken: boolean = false;
  let openCow: boolean = false;

  if (LocalStorage.get('userSheep')) sheepPart = JSON.parse(LocalStorage.get('userSheep')).part;

  if (LocalStorage.get('userChicken')) {

    chickenPart = JSON.parse(LocalStorage.get('userChicken')).part;
    if (chickenPart > 0) openChicken = true;

  }

  if (LocalStorage.get('userCow')) {

    cowPart = JSON.parse(LocalStorage.get('userCow')).part;
    if (cowPart > 0) openCow = true;

  }

  return {
    sheep: {
      part: sheepPart,
      max: test ? sheepPartSettings.length : sheepSettings.sheepParts.length,
      open: true,
      price: 0,
      unlock: 0,
      donate: false
    },
    chicken: {
      part: chickenPart,
      max: test ? chickenPartSettings.length : chickenSettings.chickenParts.length,
      open: openChicken,
      price: 300000000,
      unlock: 8,
      donate: false
    },
    cow: {
      part: cowPart,
      max: cowSettings.cowParts.length,
      open: openCow,
      price: 300000000,
      unlock: 8,
      donate: false
    },
    event: {
      startTime: 0,
      endTime: 0,
      open: false,
      type: 1,
    },
    clanEvent: {
      startTime: 0,
      endTime: 0,
      open: false,
      type: 1,
    }
  }

}
