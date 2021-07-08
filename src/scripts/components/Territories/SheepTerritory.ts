import Territory from './Territory';
import Factory from './Factory';
import Sheep from './../../scenes/Sheep/Main';
import SpeechBubble from './../animations/SpeechBuble';

export default class SheepTerritory extends Territory {
  public scene: Sheep;
  constructor(scene: Sheep, x: number, y: number, type: string, data: Iterritories) {
    super(scene, x, y, type, data);
  }

  public takeDiamondAnimal(): void {
    this.scene.takeDiamondSheep();
  }

  public sellResource(): void {
    this.scene.sellWool();
  }

  public createMergingZone(): void {
    super.createMergingZone();

    const farm: string = this.scene.state.farm.toLowerCase();
    this.scene.add.sprite(this.x, this.y - 60, `${farm}-tent`).setDepth(this.y).setOrigin(0, 0);

    const fairLevel: string = String(this.scene.state[`user${this.scene.state.farm}`].fair);
    this.levelText = this.scene.add.text(this.x + 200, this.y + 180, fairLevel, {
      font: '34px Shadow',
      color: '#df870a'
    }).setOrigin(0.5, 0.5).setDepth(this.y);

    const topZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 120, this.y + 45, 300, 145).setDropZone(undefined, () => {});
    topZone.type = 'top';
    // let graphics1 = this.add.graphics().setDepth(territory.y * 5);
    // graphics1.lineStyle(2, 0xffff00);
    // graphics1.strokeRect(topZone.x - topZone.input.hitArea.width / 2, topZone.y - topZone.input.hitArea.height / 2, topZone.input.hitArea.width, topZoneinput.hitArea.height);
    
    const bottomZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 120, this.y + 190, 300, 145).setDropZone(undefined, () => {});
    bottomZone.type = 'bottom';
    
    // let graphics2 = this.add.graphics().setDepth(territory.y * 5);
    // graphics2.lineStyle(2, 0x00ff00);
    // graphics2.strokeRect(bottomZone.x - bottomZone.input.hitArea.width / 2, bottomZone.y - bottomZone.input.hitArea.height / 2, bottomZone.input.hitAreawidth, bottomZone.input.hitArea.height);
  }

  public onTerritoryClick(): void {
    super.onTerritoryClick();
    if (this.cooldown > 0) {
      const modal: Imodal = {
        type: 1,
        sysType: 19,
      }
      this.scene.state.territory = this;
      this.scene.state.modal = modal;
      this.scene.scene.launch('Modal', this.scene.state);
      return;
    };
    if (this.scene.state.userSheep.tutorial >= 100) {
        
      if (this.territoryType !== 6 && this.territoryType !== 7) {
        const modal: Imodal = {
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
        this.takeDiamondAnimal();
      }
    }
  }

  public setPositionImproveText(): void {
    if (this.territoryType === 5) {
      const position: Iposition = {
        x: this.improveText?.x,
        y: this.improveText?.y,
      };
  
      if (this.improve < 5) {
        position.x = this.x + 70;
        position.y = this.y + 136;
      } else if (this.improve < 10) {
        position.x = this.x + 73;
        position.y = this.y + 136;
      } else if (this.improve < 15) {
        position.x = this.x + 60;
        position.y = this.y + 136;
      } else {
        position.x = this.x + 46;
        position.y = this.y + 129;
      }
      if (this.improveText.x !== position.x || this.improveText.y !== position.y) {
        this.improveText
          .setPosition(position.x, position.y)
          .setDepth(this.repository.depth + 1);
      }
    } else if (this.territoryType === 2 || this.territoryType === 3) {
      const position: Iposition = {
        x: this.x + 38,
        y: this.y + 24,
      };
  
      if (this.improveText.x !== position.x || this.improveText.y !== position.y) {
        this.improveText
          .setPosition(position.x, position.y)
          .setDepth(this.depth + 2);
      }
    }
  }
}