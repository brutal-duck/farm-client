import Territory from './Territory';
import Cow from './../../scenes/Cow/Main';
import Factory from './Factory';
import Firework from './../animations/Firework';
import SpeechBubble from './../animations/SpeechBuble';

export default class CowTerritory extends Territory {
  public scene: Cow;
  public factory: Factory;
  constructor(scene: Cow, x: number, y: number, type: string, data: Iterritories) {
    super(scene, x, y, type, data);
  }

  protected createElements(): void {
    super.createElements();
    if (this.territoryType === 8) {
      this.createFactorySprite();
    }
  }

  private createFactorySprite(): void {
    this.factory = new Factory(this.scene, this.x + 120, this.y + 85, this.improve);
    this.factory.setDepth(this.y + 1);
    this.improveText.setPosition(this.x + 187, this.y + 97);
    this.improveText.setStyle({ fontSize: '32px' });
  }

  public takeDiamondAnimal(): void {
    this.scene.takeDiamondCow();
  }

  public sellResource(): void {
    this.scene.sellMilk();
  }

  public improveFactory(): void {
    const settings: IfactorySettings[] = this.scene.state.cowSettings.cowFactorySettings;
    const user: IuserCow = this.scene.state.userCow;

    const nextImprove = settings.find((item: IfactorySettings) => item.improve === this.improve + 1);
    if (nextImprove && this.improve < settings.length) {
      if (user.part >= nextImprove.unlock_improve) {
        if (user.money >= nextImprove.improveMoneyPrice && this.scene.state.user.diamonds >= nextImprove.improveDiamondPrice) {
          user.money -= nextImprove.improveMoneyPrice;
          this.scene.state.user.diamonds -= nextImprove.improveDiamondPrice;
          this.improve += 1;
          this.factory.improve += 1;
          this.factory.settings = nextImprove;
          this.scene.time.addEvent({ delay: 200, callback: (): void => {
            this.improveText?.setText(String(this.improve));
            Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 5);

          }, callbackScope: this, loop: false });

          this.scene.state.amplitude.logAmplitudeEvent('factory_up', {
            level: this.factory.improve,
          });

          if (nextImprove.improveDiamondPrice > 0) {
            this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
              type: 'factory',
              count: nextImprove.improveDiamondPrice,
            });
            this.scene.tryTask(15, 0, nextImprove.improveDiamondPrice);
          }
          this.scene.game.scene.keys['Modal'].scene.stop();
          this.scene.tryTask(24, this.factory.improve);
        } else {
          if (this.scene.state.user.diamonds < nextImprove.improveDiamondPrice) {
            const count: number = nextImprove.improveDiamondPrice - this.scene.state.user.diamonds;
            this.openConvertor(count, count, 2);
          } else {
            const count: number = nextImprove.improveMoneyPrice - user.money;
            const diamonds: number = this.scene.convertMoney(count);
            this.openConvertor(count, diamonds, 1);
          }
        }
      }
    }
  }

  public createMergingZone(): void {
    super.createMergingZone();

    const farm: string = this.scene.state.farm.toLowerCase();
    this.scene.add.sprite(this.x, this.y - 35, `${farm}-tent`).setDepth(this.y).setOrigin(0, 0);

    const fairLevel: string = String(this.scene.state[`user${this.scene.state.farm}`].fair);
    this.levelText = this.scene.add.text(this.x + 47, this.y + 196, fairLevel, {
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
      let modal: Imodal = {
        type: 1,
        sysType: 19,
      }
      this.scene.state.territory = this;
      this.scene.state.modal = modal;
      this.scene.scene.launch('Modal', this.scene.state);
      return;
    };
    if (this.scene.state.userCow.part < 3) {
      const task: Itasks = this.scene.state.cowTasks.find(el => el.id === 138);
      if (this.block === 3 && this.position === 1 && this.territoryType === 0 && task.done === 1 && task.got_awarded === 1) {
        const modal: Imodal = {
          type: 1,
          sysType: 2
        }
        this.scene.state.modal = modal;
        this.scene.state.territory = this;
        this.scene.scene.launch('Modal', this.scene.state);
      } else if (this.block === 3 && this.position === 1 && this.territoryType === 0) {
        SpeechBubble.create(this.scene.game.scene.keys[`${this.scene.state.farm}Bars`], this.scene.state.lang.doneFirstTask, 3);
        return;
      } 
    }
    if (this.territoryType !== 6 && this.territoryType !== 7 && this.territoryType !== 8) {
      const modal: Imodal = {
        type: 1,
        sysType: 2
      }
      this.scene.state.modal = modal;
      this.scene.state.territory = this;
      this.scene.scene.launch('Modal', this.scene.state);
    } else if (this.territoryType === 6) {
      if (this.scene.state[`user${this.scene.state.farm}`].collectorLevel < this.scene.state[`${this.scene.state.farm.toLowerCase()}CollectorSettings`].length) {
        this.scene.showImproveCollector();
      } else {
        SpeechBubble.create(this.scene.game.scene.keys[`${this.scene.state.farm}Bars`], this.scene.state.lang.maxCollectorLevel, 3);
      }
    } else if (this.territoryType === 7) {
      this.scene.takeDiamondCow();
    } else if (this.territoryType === 8) {
      const modal: Imodal = {
        type: 13,
      }
      this.scene.state.modal = modal;
      this.scene.state.territory = this;
      this.scene.scene.launch('Modal', this.scene.state);
    }
  }

  public setPositionImproveText(): void {
    if (this.territoryType === 5) {
      const position: Iposition = {
        x: this.improveText?.x,
        y: this.improveText?.y,
      };
  
      if (this.improve < 5) {
        position.x = this.x + 127;
        position.y = this.y + 125;
      } else if (this.improve < 10) {
        position.x = this.x + 87;
        position.y = this.y + 140;
      } else if (this.improve < 15) {
        position.x = this.x + 168;
        position.y = this.y + 138;
      } else {
        position.x = this.x + 130;
        position.y = this.y + 140;
      }
      if (this.improveText.x !== position.x || this.improveText.y !== position.y) {
        this.improveText.setPosition(position.x, position.y);
        this.improveText.setStyle({ fontSize: '32px' });
        this.improveText.setDepth(this.repository.depth + 1);
      }
    } else if (this.territoryType === 2 || this.territoryType === 3) {
      const position: Iposition = {
        x: this.x + 38,
        y: this.y + 24,
      };
  
      if (this.improveText.x !== position.x || this.improveText.y !== position.y) {
        this.improveText
          .setPosition(position.x, position.y)
          .setStyle({ fontSize: '26px' })
          .setDepth(this.depth + 2);
      }
    }
  }
}