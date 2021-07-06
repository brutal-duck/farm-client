import Territory from './Territory';
import Factory from './Factory';
import Sheep from './../../scenes/Sheep/Main';
import SpeechBubble from './../animations/SpeechBuble';

export default class SheepTerritory extends Territory {
  public scene: Sheep;
  public factory: Factory;
  constructor(scene: Sheep, x: number, y: number, type: string, data: Iterritories) {
    super(scene, x, y, type, data);
  }

  public takeDiamondAnimal(): void {
    this.scene.takeDiamondSheep();
  }

  public sellResource(): void {
    this.scene.sellWool();
  }

  public createMetgingZone(): void {
    super.createMetgingZone();

    let topZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 120, this.y + 45, 300, 145).setDropZone(undefined, () => {});
    topZone.type = 'top';
    // let graphics1 = this.add.graphics().setDepth(territory.y * 5);
    // graphics1.lineStyle(2, 0xffff00);
    // graphics1.strokeRect(topZone.x - topZone.input.hitArea.width / 2, topZone.y - topZone.input.hitArea.height / 2, topZone.input.hitArea.width, topZoneinput.hitArea.height);
    
    let bottomZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 120, this.y + 190, 300, 145).setDropZone(undefined, () => {});
    bottomZone.type = 'bottom';
    
    // let graphics2 = this.add.graphics().setDepth(territory.y * 5);
    // graphics2.lineStyle(2, 0x00ff00);
    // graphics2.strokeRect(bottomZone.x - bottomZone.input.hitArea.width / 2, bottomZone.y - bottomZone.input.hitArea.height / 2, bottomZone.input.hitAreawidth, bottomZone.input.hitArea.height);
  }

  public onTerritoryClick(): void {
    super.onTerritoryClick();
    if (this.scene.state.userSheep.tutorial >= 100) {
        
      if (this.territoryType !== 6 && this.territoryType !== 7) {

        let modal: Imodal = {
          type: 1,
          sysType: 2
        }
        this.scene.state.modal = modal;
        this.scene.state.territory = this;
        this.scene.scene.launch('Modal', this.scene.state);

      } else if (this.territoryType === 6) {
        if (this.scene.state.userSheep.collectorLevel < this.scene.state.sheepCollectorSettings.length) {
          this.scene.showImproveCollector();
        } else {
          SpeechBubble.create(this.scene.game.scene.keys[`SheepBars`], this.scene.state.lang.maxCollectorLevel, 3);
        }
      } else if (this.territoryType === 7) {
        this.scene.takeDiamondSheep();
      }
    }
  }
}