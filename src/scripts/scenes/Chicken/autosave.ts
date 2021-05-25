import axios from 'axios';
import Egg from '../../components/Resource/Egg';

// автосохранение
function autosave(): void {
  
  this.autoSaveTimer = 0;

  let tasks: Itasks[] = this.partTasks();
  let territories: Iterritories[] = [];
  let chicken: Ichicken[] = [];
  let eggs: IchickenEgg[] = [];

  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];
    territories.push({
      _id: territory._id,
      block: territory.block,
      position: territory.position,
      type: territory.type,
      volume: territory.volume,
      improve: territory.improve,
      money: territory.money,
      cooldown: territory.cooldown,
    });

  }

  for (let i in this.chicken.children.entries) {

    let chick = this.chicken.children.entries[i];
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
  
  if (typeof this.state.userChicken.autosaveCounter === 'number') this.state.userChicken.autosaveCounter++;
  else this.state.userChicken.autosaveCounter = 0;

  const user: IchickenUserAutoSave = {
    diamonds: this.state.user.diamonds,
    xp: this.state.user.xp,
    money: this.state.userChicken.money,
    fair: this.state.userChicken.fair,
    part: this.state.userChicken.part,
    countChicken: this.state.userChicken.countChicken,
    collector: this.state.userChicken.collector,
    collectorLevel: this.state.userChicken.collectorLevel,
    diamondChickenTime: this.state.userChicken.diamondAnimalTime,
    tutorial: this.state.userChicken.tutorial,
    additional_tutorial: this.state.user.additionalTutorial,
    taken_reward: this.state.user.takenReward,
    autosaveCounter: this.state.userChicken.autosaveCounter,
    diamondChickenAd: this.state.userChicken.diamondAnimalAd,
    takenHerdBoost: this.state.userChicken.takenHerdBoost,
    feedBoostTime: this.state.userChicken.feedBoostTime,
    eventPoints: this.state.progress.event.eventPoints,
    status: this.state.user.status,   
    boosts: this.state.user.boosts,

  }

  for (let i in this.eggs.children.entries) {
    const egg: Egg = this.eggs.children.entries[i];
    eggs.push({
      _id: egg._id,
      x: Math.round(egg.x),
      y: Math.round(egg.y),
      type: egg.animalType
    });
  }

  // localStorage.user = JSON.stringify(this.state.user);
  // localStorage.userChicken = JSON.stringify(this.state.userChicken);
  // localStorage.chickenTasks = JSON.stringify(tasks);
  // localStorage.chickenTerritories = JSON.stringify(territories);
  // localStorage.chicken = JSON.stringify(chicken);
  // localStorage.chickenEggs = JSON.stringify(eggs);
  // localStorage.chickenTime = Math.round(new Date().getTime() / 1000);
  // localStorage.dailyAwards = JSON.stringify(this.state.dailyAwards);

  const data = { 
    id: this.state.user.id,
    hash: this.state.user.hash,
    counter: this.state.user.counter,
    tasks: tasks,
    territories: territories,
    chicken: chicken,
    user: user,
    eggs: eggs,
    dailyAwards: this.state.dailyAwards,
  }
  axios.post(process.env.API + "/chicken/autoSave", data)
  .then((res) => {
    
    if (this.scene.isActive('Chicken')) {

      if (res.data.error) this.logout();
      else {

        if (this.state.user.hash === 'local') {
          
          this.state.user.id = res.data.newUser._id;
          this.state.user.hash = res.data.newUser.hash;
          this.state.user.counter = res.data.newUser.counter;

          if (this.state.platform === 'web') {
            document.cookie = "farmHASH=" + this.state.user.hash + "; expires=" + res.data.expires + "; path=/;";
          }

        }
        if (res.data.donate) this.state.donate = true; 
      }
      
    }

  });

}

export default autosave;
