// поставить территорию
import Firework from '../../components/animations/Firework';
function installTerritory(): void {
  if (this.state.exchangeTerritory === 2 ||
    this.state.exchangeTerritory === 3 ||
    this.state.exchangeTerritory === 5) {

    let save: boolean = false;
    this.state.territory.improve = 1;
    this.state.territory.territoryType = this.state.exchangeTerritory;
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
      this.state.territory.setTexture('sheep-repository');
      this.state.territory.createImproveText();
      this.state.territory.createRepositorySprite();
      Firework.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 }, 3);
  
    } else {
      this.state.territory.volume = 1000;
      this.time.addEvent({ delay: 500, callback: (): void => {
        this.state.territory.changeSprite();
        Firework.create(this, { x: this.state.territory.x + 120, y: this.state.territory.y + 120 }, 3);
      }, callbackScope: this, loop: false });
    }
    
    if (this.state.territory.block === 2 && this.state.territory.position === 3) {
      for (let i in this.sheep.children.entries) {
        this.sheep.children.entries[i].drag = false;
      }
    }
  }
}

export {
  installTerritory
}
