import { сurrencyAnimation } from "../../general/animations";

function deleteTerritoriesLocks(): void {

  let lvl: number = this.state.userEvent.maxLevelAnimal;
  let prices: IeventTerritoriesPrice[] = this.state.eventSettings.territoriesEventPrice;

  for (let i in this.territories.children.entries) {
    
    let territory = this.territories.children.entries[i];

    if (territory.data.values.type === 0) {

      let unlock: number = prices.find((data: IeventTerritoriesPrice) => data.block === territory.data.values.block && data.position === territory.data.values.position).unlock;

      if (lvl >= unlock && territory.data.values.lock_image && territory.data.values.lock_text) {
        
        territory.data.values.lock_image.destroy();
        territory.data.values.lock_text.destroy();

      }

    }

  }

}

function buyTerritory(): void {

  let settings: IeventTerritoriesPrice;
  settings = this.state.eventSettings.territoriesEventPrice.find((data: IeventTerritoriesPrice) => data.block === this.state.territory.data.values.block && data.position === this.state.territory.data.values.position);
  
  if (this.state.userEvent.maxLevelAnimal >= settings.unlock && this.state.territory.data.values.type === 0) {

    if (settings.price > 0) {
       
      // 70% от суммы покупки
      let price: number = Math.round((settings.price / 100) * 70);

      if (this.state.userEvent.money >= price) {
    
        this.state.amplitude.getInstance().logEvent('buy_territory', {
          block: this.state.territory.data.values.block,
          position: this.state.territory.data.values.position,
          farm_id: this.state.farm
        });
    
        this.state.territory.data.values.type = 2;
        this.state.userEvent.money -= price;
    
        const territory: Phaser.Physics.Arcade.Sprite = this.state.territory;
    
        this.time.addEvent({ delay: 500, callback: (): void => {
    
          territory.data.values.forest.destroy();
          territory.setTexture(this.state.farm.toLowerCase() + '-bought');
          this.firework250(territory.x + 120, territory.y + 120);
          this.buildBorders();
    
        }, callbackScope: this, loop: false });
    
        } else {
    
          let count: number = price - this.state.userEvent.money;
          let diamonds: number = this.convertMoney(count);
          this.state.convertor = {
            fun: 6,
            count: count,
            diamonds: diamonds,
            type: 1
          }
    
          let modal: Imodal = {
            type: 1,
            sysType: 4
          }
          this.state.modal = modal;
          this.scene.launch('Modal', this.state);
    
        }
    } else if (settings.diamond > 0) {
      
      let price: number = settings.diamond;
      if (this.state.user.diamonds >= price) {
    
        this.state.amplitude.getInstance().logEvent('buy_territory', {
          block: this.state.territory.data.values.block,
          position: this.state.territory.data.values.position,
          farm_id: this.state.farm
        });
    
        this.state.territory.data.values.type = 2;
        this.state.user.diamonds -= price;
    
        const territory: Phaser.Physics.Arcade.Sprite = this.state.territory;
    
        this.time.addEvent({ delay: 500, callback: (): void => {
    
          territory.data.values.forest.destroy();
          territory.setTexture(this.state.farm.toLowerCase() + '-bought');
          this.firework250(territory.x + 120, territory.y + 120);
          this.buildBorders();
    
        }, callbackScope: this, loop: false });
    
      } else {
        this.state.convertor = {
          fun: 0,
          count: price - this.state.user.diamonds,
          diamonds: price - this.state.user.diamonds,
          type: 1
        }
  
        let modal: Imodal = {
          type: 1,
          sysType: 4
        }
        this.state.modal = modal;
        this.scene.launch('Modal', this.state);
  
      }  

    }
    
  }

}

export { deleteTerritoriesLocks, buyTerritory}