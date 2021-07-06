import SheepTerritory from './../components/Territories/SheepTerritory';
import ChickenTerritory from './../components/Territories/ChickenTerritory';
import CowTerritory from './../components/Territories/CowTerritory';

function currentTerritory(x: number, y: number): SheepTerritory | ChickenTerritory | CowTerritory {
  const block: number = Math.ceil((y - this.topIndent) / this.height);
  const position: number = Math.ceil(x / this.height);
  return this.territories.children.entries.find((data: any) => data.block === block && data.position === position);
}


// убрать ненужные замки с территорий
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

    const territory = this.territories.children.entries[i];

    if (territory.territoryType === 0) {
      const unlock: number = prices.find((data: IterritoriesPrice) => data.block === territory.block && data.position === territory.position).unlock;
      if (part >= unlock && territory.lock_image && territory.lock_text) {
        territory.lock_image.destroy();
        territory.lock_text.destroy();
      }
    }
  }
}

// заборы
function buildBorders(): void {
  
  for (let i in this.territories.children.entries) {
    const territory = this.territories.children.entries[i];
    if (territory.territoryType === 7) {
      territory.borderTop.setVisible(true);
      territory.borderLeft.setVisible(true);

      const bottomTer = this.territories.children.entries.find((data: any) => data.block === 2 && data.position === 1)
      if (bottomTer.territoryType === 0) territory.borderBottom.setVisible(true);
      else territory.borderBottom.setVisible(false);
    }

    if (territory.territoryType === 6) {
      territory.borderTop.setVisible(true);
    }

    if (territory.territoryType === 1 ||
      territory.territoryType === 2 ||
      territory.territoryType === 3 ||
      territory.territoryType === 5) {

      if (territory.position === 1) {
        territory.borderLeft.setVisible(true);
      }

      if (territory.position === 3) {
        territory.borderRight.setVisible(true);
      }
      
      if (territory.block !== 8) {
        const topTer = this.territories.children.entries.find((data: any) => data.block === territory.block - 1 && data.position === territory.position);
        const bottomTer = this.territories.children.entries.find((data: any) => data.block === territory.block + 1 && data.position === territory.position);

        if (topTer !== undefined && topTer.territoryType === 0) {
          territory.borderTop.setVisible(true);
        } else {
          territory.borderTop.setVisible(false);
        }
        if (bottomTer.territoryType === 1 ||
          bottomTer.territoryType === 2 ||
          bottomTer.territoryType === 3 ||
          bottomTer.territoryType === 5) {
          territory.borderBottom.setVisible(false);
        } else {
          territory.borderBottom.setVisible(true);
        }

        if (territory.position === 1) {
          const centerTer = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 2);

          if (centerTer.territoryType === 0) {
            territory.borderRight.setVisible(true);
          } else {
            territory.borderRight.setVisible(false);
          }
        }
        
        if (territory.position === 2) {
          const leftTer = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 1);
          const rightTer = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 3);

          if (leftTer.territoryType === 0) {
            territory.borderLeft.setVisible(true);
          } else {
            territory.borderLeft.setVisible(false);
          }
          if (rightTer.territoryType === 0) {
            territory.borderRight.setVisible(true);
          } else {
            territory.borderRight.setVisible(false);
          }
        }

        if (territory.position === 3) {
          const centerTer = this.territories.children.entries.find((data: any) => data.block === territory.block && data.position === 2);
          if (centerTer.territoryType === 0) {
            territory.borderLeft.setVisible(true);
          } else {
            territory.borderLeft.setVisible(false);
          }
        }
      } else {
        territory.borderBottom.setVisible(true);
      }
    }
  }
}

function findFreeTerritory (x: number, y: number): Iposition {
  const territory: any = this.currentTerritory(x, y);
  if (territory) {
    if (territory.territoryType === 2 || territory.territoryType === 3) {
      return { x: territory.x + 120, y: territory.y + 120 };
    } else return this.findFreeTerritory(x - 240, y);
  } else if (y > 0) return this.findFreeTerritory(600, y - 240);
  else return;
} 

export {
  currentTerritory,
  deleteTerritoriesLocks,
  buildBorders,
  findFreeTerritory,
}
