// поставить территорию
import Firework from '../../components/animations/Firework';
import Territory from './../../components/Territories/Territory';
function installTerritory(): void {

  if (this.state.exchangeTerritory === 2 ||
    this.state.exchangeTerritory === 3 ||
    this.state.exchangeTerritory === 5) {

    let price: number = this.state.cowSettings.territoriesCowPrice.find((data: IterritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position).price;

    // 30% от суммы покупки
    price = Math.round((price / 100) * 30);

    if (this.state.userCow.money >= price) {

      let territory: string;

      if (this.state.exchangeTerritory === 2) territory = 'grass';
      else if (this.state.exchangeTerritory === 3) territory = 'water';
      else if (this.state.exchangeTerritory === 5) territory = 'repository';

      this.logAmplitudeEvent('install_territory', {
        block: this.state.territory.block,
        position: this.state.territory.position,
        type: territory
      });

      this.state.territory.improve = 1;
      this.state.territory.territoryType = this.state.exchangeTerritory;
      this.state.userCow.money -= price;
      this.tryTask(5, this.state.exchangeTerritory);

      if (this.state.exchangeTerritory === 5) {

        this.state.territory.volume = 0;
        this.state.territory.money = 0;
        let x: number = this.state.territory.x + 120;
        let y: number = this.state.territory.y + 240;
  
        this.state.territory.setTexture('cow-repository');
        this.state.territory.repository = this.add.image(x, y, 'cow-repository-1-1')
          .setDepth(this.state.territory.y + 50)
          .setOrigin(0.5, 1);
        Firework.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 }, 3);
      } else {
        this.state.territory.volume = 1000;

        this.time.addEvent({ delay: 500, callback: (): void => {
          this.state.territory.changeSprite();
          Firework.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 }, 3);
        }, callbackScope: this, loop: false });
      }
    } else {

      let count: number = price - this.state.userCow.money;
      let diamonds: number = this.convertMoney(count);
      this.state.convertor = {
        fun: 5,
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
  }
}

function deleteTerritoriesLocks(): void {
  let part: number;
  let prices: IterritoriesPrice[] = [];

  if (this.state.farm === 'Sheep') {
    part = this.state.userSheep.part;
    prices = this.state.sheepSettings.territoriesSheepPrice;
  } else if (this.state.farm === 'Chicken') {
    part = this.state.userChicken.part;
    prices = this.state.chickenSettings.territoriesChickenPrice;
  } else if (this.state.farm === 'Cow') {
    part = this.state.userCow.part;
    prices = this.state.cowSettings.territoriesCowPrice;
  }

  for (let i in this.territories.children.entries) {
    const territory: Territory = this.territories.children.entries[i];
    if (territory.territoryType === 0) {
      const unlock: number = prices.find((data: IterritoriesPrice) => data.block === territory.block && data.position === territory.position).unlock;
      if (part >= unlock && territory.lock_image && territory.lock_text) {
        territory.lock_image.destroy();
        territory.lock_text.destroy();
      }
    }
  }
}

export {
  installTerritory,
  deleteTerritoriesLocks
}
