// поставить территорию
import Firework from './../../components/Firework';
function installTerritory(): void {

  if (this.state.exchangeTerritory === 2 ||
    this.state.exchangeTerritory === 3 ||
    this.state.exchangeTerritory === 5) {

    let price: number = this.state.chickenSettings.territoriesChickenPrice.find((data: IterritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position).price;

    // 30% от суммы покупки
    price = Math.round((price / 100) * 30);

    if (this.state.userChicken.money >= price) {

      let territory: string;

      if (this.state.exchangeTerritory === 2) territory = 'grass';
      else if (this.state.exchangeTerritory === 3) territory = 'water';
      else if (this.state.exchangeTerritory === 5) territory = 'repository';

      this.state.amplitude.getInstance().logEvent('install_territory', {
        block: this.state.territory.block,
        position: this.state.territory.position,
        farm_id: this.state.farm,
        type: territory
      });

      this.state.territory.improve = 1;
      this.state.territory.type = this.state.exchangeTerritory;
      this.state.userChicken.money -= price;
      this.tryTask(5, this.state.exchangeTerritory);

      if (this.state.exchangeTerritory === 5) {

        this.state.territory.volume = 0;
        this.state.territory.money = 0;
        let x: number = this.state.territory.x + 120;
        let y: number = this.state.territory.y + 240;
  
        this.state.territory.setTexture('chicken-repository');
        this.state.territory.repository = this.add.image(x, y, 'chicken-repository-1-1')
          .setDepth(this.state.territory.y + 50)
          .setOrigin(0.5, 1);
        Firework.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 }, 3);

      } else {

        this.state.territory.volume = 1000;

        this.time.addEvent({ delay: 500, callback: (): void => {
          
          this.changeSprite(this.state.territory);
          Firework.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 }, 3);

        }, callbackScope: this, loop: false });

      }

    } else {

      let count: number = price - this.state.userChicken.money;
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


export {
  installTerritory
}
