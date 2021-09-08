import {
  userData,
  userSheep,
  userChicken,
  userCow,
  basicClan
} from '../local/usersData';

import { improveClanFarm } from '../local/settings';
import AllTasks from '../tasks';
import basicSheepTerritories from '../local/sheepTerritories';
import basicChickenTerritories from '../local/chickenTerritories';
import basicCowTerritories from '../local/cowTerritories';

export default class DataValidator {
  public static checkUser(data: Iuser): Iuser {
    for (const key in userData) {
      if (typeof data[key] !== typeof userData[key]) data[key] = userData[key];
    }
    return data;
  }

  public static checkUserSheep(data: IuserSheep): IuserSheep {
    for (const key in userSheep) {
      if (typeof data[key] !== typeof userSheep[key]) data[key] = userSheep[key];
    }
    return data;
  }

  public static checkUserChicken(data: IuserChicken): IuserChicken {
    for (const key in userChicken) {
      if (typeof data[key] !== typeof userChicken[key]) data[key] = userChicken[key];
    }
    return data;
  }

  public static checkUserCow(data: IuserCow): IuserCow {
    for (const key in userCow) {
      if (typeof data[key] !== typeof userCow[key]) data[key] = userCow[key];
    }
    return data;
  }

  public static setTaskStatus (farmId: number, resTask: any[]): Itasks[] {
    const updatedTasks: Itasks[] = [];
    for (const task of AllTasks) if (task.farm === farmId) updatedTasks.push(task);
    for (const usersTask of resTask) {
      const task = AllTasks.find((task: Itasks) => task.id === usersTask.task_id);
      if (task) {
        task.done = usersTask.done;
        task.got_awarded = usersTask.got_awarded;
        task.progress = usersTask.progress;
      }
    }
    return updatedTasks;
  }

  public static validateTerritories (territories: Iterritories[], type: number): Iterritories[] {
    const  basicTerritories: Iterritories[] = type === 1 ? basicSheepTerritories : 
    type === 2 ? basicChickenTerritories :
    type === 3 ? basicCowTerritories : [];
    const maxTerritoryType: number = 8;
    for (let i: number = 0; i < territories.length; i += 1) {
      const territory: Iterritories = basicTerritories.find((data: Iterritories) => territories[i].position === data.position && territories[i].block === data.block);
      if (territory) {
        if (!(territory.type >= 0 && territory.type <= maxTerritoryType
          && territory.money >= 0
          && territory.volume >= 0
          && territory.improve > 0)) {
          territories[i] = basicTerritories[i];  
        }
      } else {
        territories[i] = basicTerritories[i];
      }
    }
  
    if (territories.length === 0) {
      for (const territory of basicTerritories) {
        territories.push({
          _id: territory._id,
          block: territory.block,
          position: territory.position,
          type: territory.type,
          volume: territory.volume,
          improve: territory.improve,
          money: territory.money, 
          cooldown: territory.cooldown,
          boughtType: territory.boughtType,
        });
      }
    }
    return territories;
  }

  public static validateBoosts (boosts: Iboosts): Iboosts {
    if (boosts) {
      const sheepBoostsBasic: IfarmBosts = userData.boosts.sheep;
      const chickenBoostsBasic: IfarmBosts = userData.boosts.chicken;
      const cowBoostsBasic: IfarmBosts = userData.boosts.cow;
      const fortuneBoostsBasic: number = userData.boosts.fortune;
    
      for (const key in sheepBoostsBasic) {
        if (!boosts.sheep[key]) boosts.sheep[key] = sheepBoostsBasic[key];
      }
      for (const key in chickenBoostsBasic) {
        if (!boosts.chicken[key]) boosts.chicken[key] = chickenBoostsBasic[key];
      }
      for (const key in cowBoostsBasic) {
        if (!boosts.cow[key]) boosts.cow[key] = cowBoostsBasic[key];
      }
      if (!boosts.fortune) boosts.fortune = fortuneBoostsBasic;
      return boosts;
    }
    return userData.boosts;
  }

  public static validateClan (clan: Iclan): Iclan {
    const validClan = clan;
    if (validClan) {
      for (const key in basicClan) {
        if (typeof basicClan[key] !== typeof validClan[key]) validClan[key] = basicClan[key];
      }
      if (typeof validClan.sheep.level !== 'number' || validClan.sheep.level <= 0 || validClan.sheep.level > improveClanFarm.length) validClan.sheep.level = basicClan.sheep.level;
      if (typeof validClan.chicken.level !== 'number' || validClan.chicken.level <= 0 || validClan.chicken.level > improveClanFarm.length) validClan.chicken.level = basicClan.chicken.level;
      if (typeof validClan.cow.level !== 'number' || validClan.cow.level <= 0 || validClan.cow.level > improveClanFarm.length) validClan.cow.level = basicClan.cow.level;
      if (typeof validClan.main.level !== 'number' || validClan.main.level <= 0) validClan.main.level = basicClan.main.level;
      if (typeof validClan.diamond.count !== 'number') validClan.diamond.count = basicClan.diamond.count;
      if (typeof validClan.sheep.money !== 'string' || Number(validClan.sheep.money) <= 0) validClan.sheep.money = basicClan.sheep.money;
      if (typeof validClan.chicken.money !== 'string' || Number(validClan.chicken.money) <= 0) validClan.chicken.money = basicClan.chicken.money;
      if (typeof validClan.cow.money !== 'string' || Number(validClan.cow.money) <= 0) validClan.cow.money = basicClan.cow.money;
    }
    return validClan;
  };
};
