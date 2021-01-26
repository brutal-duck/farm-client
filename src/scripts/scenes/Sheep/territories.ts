// поставить территорию
function installTerritory(): void {

  if (this.state.exchangeTerritory === 2 ||
    this.state.exchangeTerritory === 3 ||
    this.state.exchangeTerritory === 5) {

    let save: boolean = false;

    let price: number = this.state.sheepSettings.territoriesSheepPrice.find((data: IterritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position).price;

    // 30% от суммы покупки
    price = Math.round((price / 100) * 30);

    if (this.state.userSheep.money >= price) {

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
      this.state.userSheep.money -= price;
      this.tryTask(5, this.state.exchangeTerritory);

      if (this.state.userSheep.tutorial === 20 && this.state.exchangeTerritory === 2) {
        save = true;
        this.doneTutor_20();
      }

      if (this.state.userSheep.tutorial === 30 && this.state.exchangeTerritory === 3) {
        save = true;
        this.doneTutor_30();
      }

      if (this.state.exchangeTerritory === 5) {

        if (this.state.userSheep.tutorial === 80) {
          save = true;
          this.doneTutor_80();
        }

        this.state.territory.volume = 0;
        this.state.territory.money = 0;
        let x: number = this.state.territory.x + 120;
        let y: number = this.state.territory.y + 240;
  
        this.state.territory.setTexture('sheep-repository');
        this.state.territory.repository = this.add.image(x, y, 'sheep-repository-1-1')
          .setDepth(this.state.territory.y + 50)
          .setOrigin(0.5, 1);
        this.firework250(this.state.territory.x + 120, this.state.territory.y + 120);

      } else {

        this.state.territory.volume = 1000;

        this.time.addEvent({ delay: 500, callback: (): void => {

          this.changeSprite(this.state.territory);
          this.firework250(this.state.territory.x + 120, this.state.territory.y + 120);
          
        }, callbackScope: this, loop: false });

      }
      
      if (this.state.territory.block === 2 && this.state.territory.position === 3) {

        for (let i in this.sheep.children.entries) {
          this.sheep.children.entries[i].drag = false;
        }

      }

    } else {

      let count: number = price - this.state.userSheep.money;
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
