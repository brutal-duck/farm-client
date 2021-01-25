import axios from 'axios';
import state from './../../state';

// автосохранение
function autosave(): void {

  this.autoSaveTimer = 0;

  let tasks: Itasks[] = this.partTasks();
  let territories: Iterritories[] = [];
  let sheep: Isheep[] = [];

  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];
    territories.push({
      _id: territory._id,
      block: territory.block - 1,
      position: territory.position,
      type: territory.type,
      volume: territory.volume,
      improve: territory.improve,
      money: territory.money
    });

  }

  for (let i in this.sheep.children.entries) {

    let lamb = this.sheep.children.entries[i];
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

  if (typeof this.state.userSheep.autosaveCounter === 'number') this.state.userSheep.autosaveCounter++;
  else this.state.userSheep.autosaveCounter = 0;

  let user: IsheepUserAutoSave = {
    diamonds: this.state.user.diamonds,
    xp: this.state.user.xp,
    money: this.state.userSheep.money,
    fair: this.state.userSheep.fair,
    part: this.state.userSheep.part,
    countSheep: this.state.userSheep.countSheep,
    collector: this.state.userSheep.collector,
    collectorLevel: this.state.userSheep.collectorLevel,
    diamondSheepTime: this.state.userSheep.diamondAnimalTime,
    tutorial: this.state.userSheep.tutorial,
    additional_tutorial: this.state.user.additionalTutorial,
    taken_reward: this.state.user.takenReward,
    autosaveCounter: this.state.userSheep.autosaveCounter,
    diamondSheepAd: this.state.userSheep.diamondAnimalAd,
    takenHerdBoost: this.state.userSheep.takenHerdBoost,
  }
  
  // localStorage.user = JSON.stringify(this.state.user);
  // localStorage.userSheep = JSON.stringify(this.state.userSheep);
  // localStorage.sheepTasks = JSON.stringify(tasks);
  // localStorage.sheepTerritories = JSON.stringify(territories);
  // localStorage.sheep = JSON.stringify(sheep);
  // localStorage.sheepTime = Math.round(new Date().getTime() / 1000);
  // localStorage.dailyAwards = JSON.stringify(this.state.dailyAwards);

  const data = { 
    id: this.state.user.id,
    hash: this.state.user.hash,
    counter: this.state.user.counter,
    tasks: tasks,
    territories: territories,
    sheep: sheep,
    user: user,
    dailyAwards: this.state.dailyAwards
  }

  axios.post(process.env.API + "/sheep/autoSave", data)
  .then((res) => {
    
    if (this.scene.isActive('Sheep')) {

      if (res.data.error) {

        this.logout();

        console.log(res.data)
        console.log('CRASH autosave sheep');

      } else {

        if (this.state.user.hash === 'local') {
          
          this.state.user.id = res.data.newUser._id;
          this.state.user.hash = res.data.newUser.hash;
          this.state.user.counter = res.data.newUser.counter;

          if (this.state.platform === 'web') {
            document.cookie = "farmHASH=" + this.state.user.hash + "; expires=" + res.data.expires + "; path=/;";
          }

        }

        if (res.data.donate &&
          !this.scene.isActive('Modal') &&
          !this.scene.isActive('Block') &&
          !this.scene.isActive('Tutorial') &&
          !this.scene.isActive('Map')) this.showDonate();

      }

    }

  });

}

export default autosave;
