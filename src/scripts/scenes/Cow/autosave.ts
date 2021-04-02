import axios from 'axios';

// автосохранение
function autosave(): void {
  
  this.autoSaveTimer = 0;

  let tasks: Itasks[] = this.partTasks();
  let territories: Iterritories[] = [];
  let cow: Icow[] = [];

  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];
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

  for (let i in this.cow.children.entries) {

    let cw = this.cow.children.entries[i];
    cow.push({
      _id: cw._id,
      type: cw.animalType,
      milk: cw.milk,
      x: cw.x,
      y: cw.y,
      counter: cw.counter,
      diamond: cw.diamond,
      vector: cw.vector
    });

  }
  
  if (typeof this.state.userCow.autosaveCounter === 'number') this.state.userCow.autosaveCounter++;
  else this.state.userCow.autosaveCounter = 0;

  let user: IcowUserAutoSave = {
    diamonds: this.state.user.diamonds,
    xp: this.state.user.xp,
    money: this.state.userCow.money,
    fair: this.state.userCow.fair,
    part: this.state.userCow.part,
    countCow: this.state.userCow.countCow,
    collector: this.state.userCow.collector,
    collectorLevel: this.state.userCow.collectorLevel,
    diamondCowTime: this.state.userCow.diamondAnimalTime,
    tutorial: this.state.userCow.tutorial,
    additional_tutorial: this.state.user.additionalTutorial,
    taken_reward: this.state.user.takenReward,
    autosaveCounter: this.state.userCow.autosaveCounter,
    diamondCowAd: this.state.userCow.diamondAnimalAd,
    takenHerdBoost: this.state.userCow.takenHerdBoost,
    feedBoostTime: this.state.userCow.feedBoostTime,
    eventPoints: this.state.progress.event.eventPoints,
    status: this.state.user.status,   
    boosts: this.state.user.boosts,
  }


  // Не использовалось
  // localStorage.user = JSON.stringify(this.state.user);
  // localStorage.userCow = JSON.stringify(this.state.userCow);
  // localStorage.cowTasks = JSON.stringify(tasks);
  // localStorage.cowTerritories = JSON.stringify(territories);
  // localStorage.cow = JSON.stringify(cow);
  // localStorage.cowTime = Math.round(new Date().getTime() / 1000);
  // localStorage.dailyAwards = JSON.stringify(this.state.dailyAwards);

  const data = { 
    id: this.state.user.id,
    hash: this.state.user.hash,
    counter: this.state.user.counter,
    tasks: tasks,
    territories: territories,
    cow: cow,
    user: user,
    dailyAwards: this.state.dailyAwards,
  }

  axios.post(process.env.API + "/cow/autoSave", data)
  .then((res) => {
    
    if (this.scene.isActive('Cow')) {

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
