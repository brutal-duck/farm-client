
import Territory from './Territory';
import Chicken from './../../scenes/Chicken/Main';
import SpeechBubble from './../animations/SpeechBuble';

export default class ChickenTerritory extends Territory {
    public scene: Chicken;
    constructor(scene: Chicken, x: number, y: number, type: string, data: Iterritories) {
        super(scene, x, y, type, data);
    }

    public takeDiamondAnimal(): void {
        this.scene.takeDiamondChicken();
    }
    
    public sellResource(): void {
      this.scene.sellEggs();
    }

    public createMergingZone(): void {
      super.createMergingZone();

      this.scene.add.image(this.x, this.y - 35, 'chicken-tent').setDepth(this.y).setOrigin(0, 0);
      
      let leftZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 45, this.y + 120, 145, 300).setDropZone(undefined, () => {});
      leftZone.type = 'left';
      
      // let graphics1 = this.add.graphics().setDepth(territory.y * 5);
      // graphics1.lineStyle(2, 0xffff00);
      // graphics1.strokeRect(leftZone.x - leftZone.input.hitArea.width / 2, leftZone.y - leftZone.input.hitArea.height / 2, leftZone.input.hitArea.width, leftZone.input.hitArea.height);

      
      let rightZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 190, this.y + 120, 145, 300).setDropZone(undefined, () => {});
      rightZone.type = 'right';
      
      // let graphics2 = this.add.graphics().setDepth(territory.y * 5);
      // graphics2.lineStyle(2, 0x00ff00);
      // graphics2.strokeRect(rightZone.x - rightZone.input.hitArea.width / 2, rightZone.y - rightZone.input.hitArea.height / 2, rightZone.input.hitArea.width, rightZone.input.hitArea.height);

      this.levelText = this.scene.add.text(this.x + 200, this.y + 202, String(this.scene.state.userChicken.fair), {
        font: '34px Shadow',
        color: '#b5315a'
      }).setOrigin(0.5, 0.5).setDepth(this.y);
    }

  public onTerritoryClick(): void {
    super.onTerritoryClick();
    if (this.territoryType !== 6 && this.territoryType !== 7) {

      const modal: Imodal = {
        type: 1,
        sysType: 2
      }
      this.scene.state.modal = modal;
      this.scene.state.territory = this;
      this.scene.scene.launch('Modal', this.scene.state);

    } else if (this.territoryType === 6) {
      
      if (this.scene.state.userChicken.collectorLevel < this.scene.state.chickenCollectorSettings.length) {
        this.scene.showImproveCollector();
      } else {
        SpeechBubble.create(this.scene.game.scene.keys['ChickenBars'], this.scene.state.lang.maxCollectorLevel, 3);
      }
    } else if (this.territoryType === 7) {
      this.takeDiamondAnimal();
    }
  }
}