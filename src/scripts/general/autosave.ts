import axios from 'axios';
import Egg from '../components/Resource/Egg';
import Territory from './../components/Territories/Territory';
import CowSprite from './../components/Animal/CowSprite';
import Factory from './../components/Territories/Factory';

export default function autosave(): void {
  const state: Istate = this.state;
  this.autoSaveTimer = 0;

  let unicorn = undefined;
  let unicornTerritories = undefined;
  let unicornResource = undefined;
  let userUnicorn = undefined;
  let sheepTasks: Itasks[] = [];
  let chickenTasks: Itasks[] = [];
  let cowTasks: Itasks[] = [];

  for (let i: number = 0; i < state.sheepTasks.length; i++) {
    if (state.sheepTasks[i].part === state.userSheep.part) {
      if (state.sheepTasks[i].type === 10) {
        if ((this.state.platform === 'web' &&
          this.state.user.login === '') || 
          this.takeRewardRegistration) {
            sheepTasks.push(state.sheepTasks[i]);
        }
      } else if (state.sheepTasks[i].type === 16) {
        if (this.state.platform === 'web') {
          sheepTasks.push(state.sheepTasks[i]);
        }
      } else {
        sheepTasks.push(state.sheepTasks[i]);
      }
    }
  }

  for (let i: number = 0; i < state.chickenTasks.length; i++) {
    if (state.chickenTasks[i].part === state.userChicken.part) {
      if (state.chickenTasks[i].type === 10) {
        if ((this.state.platform === 'web' &&
          this.state.user.login === '') || 
          this.takeRewardRegistration) {
            chickenTasks.push(state.chickenTasks[i]);
        }
      } else if (state.chickenTasks[i].type === 16) {
        if (this.state.platform === 'web') {
          chickenTasks.push(state.chickenTasks[i]);
        }
      } else {
        chickenTasks.push(state.chickenTasks[i]);
      }
    }
  }

  for (let i: number = 0; i < state.cowTasks.length; i++) {
    if (state.cowTasks[i].part === state.userCow.part) {
      if (state.cowTasks[i].type === 10) {
        if ((this.state.platform === 'web' &&
          this.state.user.login === '') || 
          this.takeRewardRegistration) {
            cowTasks.push(state.cowTasks[i]);
        }
      } else if (state.sheepTasks[i].type === 16) {
        if (this.state.platform === 'web') {
          cowTasks.push(state.cowTasks[i]);
        }
      } else {
        cowTasks.push(state.cowTasks[i]);
      }
    }
  }
  

  if (state.farm === 'Sheep') {
    sheepTasks = this.partTasks();
    const territories: Iterritories[] = [];
    const sheep: Isheep[] = [];
    
    state.userChicken.collector = state.progress.chicken.collector;
    state.userCow.collector = state.progress.cow.collector;
  
    if (typeof this.state.userSheep.autosaveCounter === 'number') this.state.userSheep.autosaveCounter++;
    else this.state.userSheep.autosaveCounter = 0;

    for (const i in this.territories.children.entries) {
      const territory = this.territories.children.entries[i];
      territories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type,
        volume: territory.volume,
        improve: territory.improve,
        money: territory.money
      });
    }
  
    for (const i in this.sheep.children.entries) {
      const lamb = this.sheep.children.entries[i];
      sheep.push({
        _id: lamb._id,
        type: lamb.type,
        wool: lamb.wool,
        x: Math.round(lamb.x),
        y: Math.round(lamb.y),
        counter: lamb.counter,
        diamond: lamb.diamond,
        vector: lamb.vector
      });
    }

    state.sheep = sheep;
    state.sheepTerritories = territories;
  } else if (state.farm === 'Chicken') {
    chickenTasks = this.partTasks();
    const territories: Iterritories[] = [];
    const chicken: Ichicken[] = [];
    const eggs: IchickenEgg[] = [];

    state.userSheep.collector = state.progress.sheep.collector;
    state.userCow.collector = state.progress.cow.collector;
  
    if (typeof state.userChicken.autosaveCounter === 'number') state.userChicken.autosaveCounter++;
    else state.userChicken.autosaveCounter = 0;

    for (const i in this.territories.children.entries) {
      const territory = this.territories.children.entries[i];
      territories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type,
        volume: territory.volume,
        improve: territory.improve,
        money: territory.money
      });
  
    }
  
    for (const i in this.chicken.children.entries) {
      const chick = this.chicken.children.entries[i];
      chicken.push({
        _id: chick._id,
        type: chick.type,
        egg: chick.egg,
        x: chick.x,
        y: chick.y,
        counter: chick.counter,
        diamond: chick.diamond,
        vector: chick.vector
      });
  
    }

    for (const i in this.eggs.children.entries) {
      const egg: Egg = this.eggs.children.entries[i];
      eggs.push({
        _id: egg._id,
        x: Math.round(egg.x),
        y: Math.round(egg.y),
        type: egg.animalType
      });
    }
  
    state.chicken = chicken;
    state.chickenTerritories = territories;
    state.chickenEggs = eggs;
  } else if (state.farm === 'Cow') {
    cowTasks = this.partTasks();
    const territories: Iterritories[] = [];
    const cow: Icow[] = [];
    state.userSheep.collector = state.progress.sheep.collector;
    state.userChicken.collector = state.progress.chicken.collector;
  
    if (typeof this.state.userCow.autosaveCounter === 'number') this.state.userCow.autosaveCounter++;
    else this.state.userCow.autosaveCounter = 0;

    for (const i in this.territories.children.entries) {
      const territory: Territory = this.territories.children.entries[i];
      territories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.territoryType,
        volume: territory.volume,
        improve: territory.improve,
        money: territory.money
      });
    }
  
    for (const i in this.animalGroup.children.entries) {
      const cw: CowSprite = this.animalGroup.children.entries[i];
      cow.push({
        _id: cw._id,
        type: cw.breed,
        milk: cw.milk,
        x: cw.x,
        y: cw.y,
        counter: cw.counter,
        diamond: cw.diamond,
        vector: cw.vector
      });
    }

    state.cow = cow;
    state.cowTerritories = territories;
    const factoryTer: Factory = this.territories.children.entries.find((data: Territory) => data.territoryType === 8).factory;
    const factory: Ifactory = {
      currentProduction: factoryTer.currentProduction,
      productionTimer: factoryTer.productionTimer,
      money: factoryTer.money,
      production1Money: factoryTer.production1Money,
      production2Money: factoryTer.production2Money,
      production3Money: factoryTer.production3Money,
      production4Money: factoryTer.production4Money,
      boostTime: state.userCow.factory.boostTime,
    }
    
    state.userCow.factory = factory;
  } else if (state.farm === 'Unicorn') {
    userUnicorn = state.userUnicorn;
    this.getEventRaiting();

    if (typeof state.userUnicorn.autosaveCounter === 'number') state.userUnicorn.autosaveCounter++;
    else state.userUnicorn.autosaveCounter = 0;
    
    const territories: IeventTerritories[] = [];
    const animals: IeventAnimal[] = [];
    const resources: IeventResource[] = [];

    for (const i in this.territories.children.entries) {
      const territory = this.territories.children.entries[i];
      territories.push({
        _id: territory.data.values._id,
        block: territory.data.values.block,
        position: territory.data.values.position,
        type: territory.data.values.type,
      });
    }

    for (const i in this.animals.children.entries) {
      const animal: Phaser.Physics.Arcade.Sprite = this.animals.children.entries[i];
      animals.push({
        _id: animal.data.values._id,
        type: animal.data.values.type,
        x: animal.x,
        y: animal.y,
        activeAnimal: {
          x: animal.data.values.active.x,
          y: animal.data.values.active.y,
          working: animal.data.values.active.data.values.working,
          vector: animal.data.values.active.data.values.vector,
          counter: animal.data.values.active.data.values.counter,
        }
      });
    }

    for (const i in this.resources.children.entries) {
      const resource: Phaser.Physics.Arcade.Sprite = this.resources.children.entries[i];
      resources.push({
        _id: resource.data.values._id,
        x: Math.round(resource.x),
        y: Math.round(resource.y),
        type: resource.data.values.type
      });
    }

    unicorn = animals;
    unicornTerritories = territories;
    unicornResource = resources;
  }
  
  const user: IuserAutoSave = {
    diamonds: state.user.diamonds,
    xp: state.user.xp,
    takenReward: state.user.takenReward,
    additionalTutorial: state.user.additionalTutorial,
    eventPoints: state.progress.event.eventPoints,
    status: state.user.status,
    boosts: state.user.boosts,
    userSheep: state.userSheep,    
    userChicken: state.userChicken,    
    userCow: state.userCow,   
    userUnicorn: userUnicorn, 
  }

  const data: IdataAutoSave = { 
    id: state.user.id,
    hash: state.user.hash,
    counter: state.user.counter,
    user: user,
    dailyAwards: state.dailyAwards,

    sheep: state.sheep,
    sheepTerritories: state.sheepTerritories,
    sheepTasks: sheepTasks,

    chicken: state.chicken,
    chickenEggs: state.chickenEggs,
    chickenTerritories: state.chickenTerritories,
    chickenTasks: chickenTasks,

    cow: state.cow,
    cowTasks: cowTasks,
    cowTerritories: state.cowTerritories,

    unicorn: unicorn,
    unicornResource: unicornResource,
    unicornTerritories : unicornTerritories,
  }

  axios.post(process.env.API + "/autoSave", data)
    .then((res) => {
      if (this.scene.isActive('Sheep') || this.scene.isActive('Chicken') || this.scene.isActive('Cow')) {
        if (res.data.error) this.logout();
        else {
          if (state.user.hash === 'local') {
            state.user.id = res.data.newUser._id;
            state.user.hash = res.data.newUser.hash;
            state.user.counter = res.data.newUser.counter;
            if (state.platform === 'web') {
              document.cookie = "farmHASH=" + state.user.hash + "; expires=" + res.data.expires + "; path=/;";
            }
          }
          if (res.data.donate) state.donate = true; 
        }
      }
    });
}



