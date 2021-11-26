import Territory from './Territory';
import Cow from './../../scenes/Cow/Main';
import Factory from './Factory';
import Firework from './../animations/Firework';
import SpeechBubble from './../animations/SpeechBuble';
import Utils from './../../libs/Utils';
import { Task } from '../../local/tasks/types';

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
    this.setTexture('cow-repository');
    this.createImproveText();
    this.improveText.setPosition(this.x + 187, this.y + 97);
    this.improveText.setStyle({ fontSize: '32px' });
  }

  public takeDiamondAnimal(): void {
    this.scene.takeDiamondCow();
  }

  public sellResource(): void {
    super.sellResource();
    this.scene.sellMilk();
  }

  public improveFactory(): void {
    const settings: IfactorySettings[] = this.scene.state.cowSettings.cowFactorySettings;
    const user: IuserCow = this.scene.state.userCow;

    const nextImprove = settings.find((item: IfactorySettings) => item.improve === this.improve + 1);
    if (nextImprove && this.improve < settings.length) {
      if (user.part >= nextImprove.unlock_improve) {
        const sale = Utils.checkSale(this.scene.state, 'COW_FACTORY_IMPROVE');
        const moneyPrice = sale ? Math.floor(nextImprove.improveMoneyPrice / 2) : nextImprove.improveMoneyPrice;
        const diamondPrice = sale ? Math.floor(nextImprove.improveDiamondPrice / 2) : nextImprove.improveDiamondPrice;
        if (user.money >= moneyPrice && this.scene.state.user.diamonds >= diamondPrice) {
          if (diamondPrice > 0) {
            const modal: Imodal = {
              type: 1,
              sysType: 24,
              confirmSpendParams: {
                type: 'ImproveFactory',
                level: nextImprove.improve,
                price: diamondPrice,
                callback: () => {
                  this.acceptedImproveFactory(nextImprove);
                }
              }
            };
            this.scene.state.modal = modal;
            this.scene.scene.stop('Modal');
            this.scene.scene.launch('Modal', this.scene.state);
          } else this.acceptedImproveFactory(nextImprove);
        } else {
          if (this.scene.state.user.diamonds < diamondPrice) {
            const count: number = diamondPrice - this.scene.state.user.diamonds;
            this.openConvertor(count, count, 2);
          } else {
            const count: number = moneyPrice - user.money;
            const diamonds: number = this.scene.convertMoney(count);
            this.openConvertor(count, diamonds, 1);
          }
        }
      }
    }
  }

  private acceptedImproveFactory(nextImprove: IfactorySettings): void {
    const sale = Utils.checkSale(this.scene.state, 'COW_FACTORY_IMPROVE');
    const moneyPrice = sale ? Math.floor(nextImprove.improveMoneyPrice / 2) : nextImprove.improveMoneyPrice;
    const diamondPrice = sale ? Math.floor(nextImprove.improveDiamondPrice / 2) : nextImprove.improveDiamondPrice;
    this.scene.state.userCow.money -= moneyPrice;
    this.scene.state.user.diamonds -= diamondPrice;
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
    this.checkAllTerritoriesIsMaxImproveLvlTask();

    if (diamondPrice > 0) {
      this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
        type: 'factory',
        count: diamondPrice,
      });
      this.scene.tryTask(15, 0, diamondPrice);
    }
    this.scene.game.scene.keys['Modal'].scene.stop();
    this.scene.tryTask(24, this.factory.improve);
    this.scene.tryClanTask(6);
    this.scene.achievement.tryType(11);
    if (nextImprove.improve >= this.scene.state.cowSettings.cowFactorySettings.length) this.scene.achievement.tryId(24);
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
      if (Utils.checkTestB(this.scene.state)) {
        const task: Task = this.scene.state.cowTasks.find((el: Itasks) => String(el.id) === '2-1') as unknown as Task;
        if (this.block === 3 && this.position === 1 && this.territoryType === 0 && task.done === 1 && task.awardTaken === 1) {
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
      } else {
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

  public unlockTerritory(): void {
    if (this.bought && this.cooldown <= 0) {
      this.scene.tryTask(5, this.boughtType);
      if (this.territoryType === 0) {
        this.territoryType = this.boughtType;
        this.scene.time.addEvent({ delay: 500, callback: (): void => {
          this.changeSprite();
          this.forest?.destroy();
          this.setTexture(this.scene.state.farm.toLowerCase() + '-bought');
          Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
          this.scene.buildBorders();
        }, callbackScope: this, loop: false });
      } else if (this.territoryType === 1) {
        this.territoryType = this.boughtType;
        if (Utils.checkTestB(this.scene.state)) this.improve = this.scene.state[`user${this.scene.state.farm}`].part - 1 || 1;
        if (this.territoryType === 5) {
          this.volume = 0;
          this.money = 0;
          this.createRepositorySprite();
          Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
        } else if (this.territoryType === 8) {
          this.volume = 0;
          this.money = 0;
          this.createFactorySprite();
          Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
        } else {
          this.volume = 1000;
          this.changeSprite();
          this.scene.time.addEvent({ delay: 500, callback: (): void => {
            Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
          }, callbackScope: this, loop: false });
        }
      }
    }
  }
}