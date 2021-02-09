import axios from 'axios';

// автосохранение
function autosave(): void {
  
  this.autoSaveTimer = 0;

  let territories: IeventTerritories[] = [];
  let animals: IeventAnimal[] = [];
  let resources: IeventResource[] = [];

  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];
    territories.push({
      _id: territory._id,
      block: territory.block,
      position: territory.position,
      type: territory.type,
    });

  }

  for (let i in this.animals.children.entries) {

    let animal: Phaser.Physics.Arcade.Sprite = this.animals.children.entries[i];
    animals.push({
      _id: animal.data.values._id,
      type: animal.data.values.type,
      x: animal.x,
      y: animal.y,
      activeAnimal: {
        x: animal.data.values.active.x,
        y: animal.data.values.active.y,
        working: animal.data.values.active.data.values.working,
      }
    });

  }
  
  if (typeof this.state.userEvent.autosaveCounter === 'number') this.state.userEvent.autosaveCounter++;
  else this.state.userEvent.autosaveCounter = 0;

  let user: IeventUserAutoSave = {
    diamonds: this.state.user.diamonds,
    xp: this.state.user.xp,
    money: this.state.userEvent.money,
    countAnimal: this.state.userEvent.countChicken,
    collector: this.state.userEvent.collector,
    collectorLevel: this.state.userEvent.collectorLevel,
    tutorial: this.state.userEvent.tutorial,
    additional_tutorial: this.state.user.additionalTutorial,
    taken_reward: this.state.user.takenReward,
    autosaveCounter: this.state.userEvent.autosaveCounter,
    takenHerdBoost: this.state.userEvent.takenHerdBoost,
    feedBoostTime: this.state.userEvent.feedBoostTime,
    maxLevelAnimal: this.state.userEvent.maxLevelAnimal
  }

  for (let i in this.resources.children.entries) {

    let resource: Phaser.Physics.Arcade.Sprite = this.resources.children.entries[i];
    resources.push({
      _id: resource.data.values._id,
      x: Math.round(resource.x),
      y: Math.round(resource.y),
      type: resource.data.values.type
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
    territories: territories,
    animals: animals,
    user: user,
    resources: resources,
  }
  axios.post(process.env.API + "/event/autoSave", data)
  .then((res) => {
    
    if (this.scene.isActive('Event')) {

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
