function deleteTerritoriesLocks(): void {

  let lvl: number = this.state.userEvent.maxLevelAnimal;
  let prices: IeventTerritoriesPrice[] = this.state.eventSettings.territoriesEventPrice;

  for (let i in this.territories.children.entries) {
    
    let territory = this.territories.children.entries[i];

    if (territory.data.values.type === 0) {
        console.log(territory)

      let unlock: number = prices.find((data: IeventTerritoriesPrice) => data.block === territory.data.values.block && data.position === territory.data.values.position).unlock;

      if (lvl >= unlock && territory.data.values.lock_image && territory.data.values.lock_text) {
        
        territory.data.values.lock_image.destroy();
        territory.data.values.lock_text.destroy();

      }

    }

  }

}

export { deleteTerritoriesLocks }