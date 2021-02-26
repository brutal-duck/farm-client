import axios from 'axios';

// автосохранение
function autosave(): void {
  this.getEventRaiting();
  this.autoSaveTimer = 0;

  let territories: IeventTerritories[] = [];
  let animals: IeventAnimal[] = [];
  let resources: IeventResource[] = [];

  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];
    territories.push({
      _id: territory.data.values._id,
      block: territory.data.values.block,
      position: territory.data.values.position,
      type: territory.data.values.type,
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
        vector: animal.data.values.active.data.values.vector,
        counter: animal.data.values.active.data.values.counter,
      }
    });

  }
  
  if (typeof this.state.userEvent.autosaveCounter === 'number') this.state.userEvent.autosaveCounter++;
  else this.state.userEvent.autosaveCounter = 0;

  let user: IeventUserAutoSave = {
    diamonds: this.state.user.diamonds,
    xp: this.state.user.xp,
    money: String(this.state.userEvent.money),
    herdBoostAnimals: this.state.userEvent.herdBoostAnimals,
    takenHerdBoost: this.state.userEvent.takenHerdBoost,
    feedBoostTime: this.state.userEvent.feedBoostTime,
    countAnimal: this.state.userEvent.countAnimal,
    collector: this.state.userEvent.collector,
    collectorLevel: this.state.userEvent.collectorLevel,
    tutorial: this.state.userEvent.tutorial,
    autosaveCounter: this.state.userEvent.autosaveCounter, 
    eventPoints: this.state.userEvent.maxLevelAnimal,
    additionalTutorial: this.state.user.additionalTutorial   
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

        if (res.data.donate) this.state.donate = true; 
      }
      
    }

  });

}

export default autosave;
