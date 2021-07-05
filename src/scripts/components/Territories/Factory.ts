import Cow from './../../scenes/Cow/Main';
import Territory from './Territory';

const WHITE_COLOR: number = 0xffffff;
const RED_COLOR: number = 0xff0000;
export default class Factory extends Phaser.GameObjects.Sprite {
  public scene: Cow;
  public settings: IfactorySettings;
  public productionTimer: number = 0;
  public currentProduction: number;
  public production1Money: number = 0;
  public production2Money: number = 0;
  public production3Money: number = 0;
  public production4Money: number = 0;
  public money: number = 0;
  public improve: number;
  public workAnimation: Phaser.GameObjects.Particles.ParticleEmitter;
  public flash: Phaser.GameObjects.Sprite;
  public idleAnimation: Phaser.Tweens.Tween;

  constructor(scene: Cow, x: number, y: number, improve: number) {
    super(scene, x, y, 'cow-factory');
    this.improve = improve;
    this.init();
  }

  private init(): void {
    this.scene.add.existing(this);
    this.currentProduction = this.scene.state.userCow.factory.currentProduction;
    this.productionTimer = this.scene.state.userCow.factory.productionTimer;
    this.production1Money = this.scene.state.userCow.factory.production1Money;
    this.production2Money = this.scene.state.userCow.factory.production2Money;
    this.production3Money = this.scene.state.userCow.factory.production3Money;
    this.production4Money = this.scene.state.userCow.factory.production4Money;
    this.money = this.scene.state.userCow.factory.money;
    this.settings = this.scene.state.cowSettings.cowFactorySettings.find((data: IfactorySettings) => data.improve === this.improve);
    this.flash = this.scene.add.sprite(this.x + 12, this.y + 4, 'factory-flash').setDepth(this.depth + 1000).setVisible(false);
    this.setIdleAnimation();
  }

  
  public getPercent(): number[] {
    const pull: number[] = [ this.settings.production1Percent, this.settings.production2Percent, this.settings.production3Percent ];
    if (this.scene?.state.userCow.factory.boostTime > 0) pull.push(this.settings.production4Percent);

    const mainPull: number = pull.reduce((prev, cur) => prev += cur);
    const result: number[] = [];

    for (let i: number = 0; i < pull.length; i += 1) {
      result.push(Math.round(this.settings[`production${i + 1}Percent`] /  mainPull * 100));
    }

    if (result.reduce((prev, cur) => prev += cur) > 100) {
      result[0] -= 1;
    }
    return result;
  }

  public preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (!this.workAnimation && this.currentProduction !== 0 && this.currentProduction) {
      this.setWorkAnimation();
      this.removeIdleAnimation()
    } else if (this.workAnimation && (this.currentProduction === 0 || !this.currentProduction)){
      this.removeWorkAnimation();
      this.setIdleAnimation();
    }
  }
  public setWorkAnimation(): void {
    this.workAnimation = this.scene.add.particles('factory-smoke').setDepth(this.depth + 10000).createEmitter({
      x: this.x - 25,
      y: this.y - 115,
      angle: { min: 250, max: 300 },
      speed: { min: 20, max: 100 },
      gravityY: -50,
      lifespan: 1500,
      quantity: 1,
      frequency: 10,
      scale: { start: 0.15, end: 0.7 },
      alpha: { start: 0.6, end: 0 },
      
    });
  }

  private removeWorkAnimation(): void {
    this.workAnimation.remove();
    this.workAnimation = undefined;
  }

  private setIdleAnimation(): void {
    this.flash.setVisible(true);
    this.idleAnimation = this.scene.add.tween({
      targets: [],
      loopDelay: 300, 
      loop: -1,
      onLoop: (): void => {
        if (this.flash.tintTopLeft !== WHITE_COLOR) {
          this.flash.setTint(WHITE_COLOR);
        } else {
          this.flash.setTint(RED_COLOR);
        }
      }
    })
  }

  private removeIdleAnimation(): void {
    this.flash.setVisible(false);
    this.idleAnimation.remove();
    this.idleAnimation = undefined;
  }

  public productionOfProducts(): void {
    let resourceAmount: number = 0;
    if (this.productionTimer <= 0) {
      this.endProduction();
      const storages: Territory[] = this.scene.territories.children.entries.filter((data: Territory) => data.territoryType === 5) as Territory[];
      
      storages.forEach((storage: Territory) => { resourceAmount += storage.volume; });

      if (resourceAmount >= this.settings.lotSize) {
        this.productionTimer = this.settings.processingTime;
        let lot: number = this.settings.lotSize;
        for (let i in storages) {
          const storage: Territory = storages[i];
          if (storage.volume > lot) {
            storage.volume -= lot;
            lot = 0;
          } else {
            lot -= storage.volume;
            storage.volume = 0;
          }
        }
        this.startProduction();
      } else {
        console.log('Not enough milk for production');
      }
    } else {
      this.productionTimer -= 1;
    }
  }
  
  private startProduction(): void {
    const productId = this.getRandomProductId();
    if (productId) {
      this.currentProduction = productId;
    } else {
      this.startProduction();
    }
  }

  private endProduction(): void {
    if (this.currentProduction) {
      const multiply: number = this.scene.state.userCow.factory[`production${this.currentProduction}Multiply`];
      this[`production${this.currentProduction}Money`] += this.settings.lotSize * multiply;
      this.money += this.settings.lotSize * multiply;
      this.currentProduction = undefined;
    }
  }

  public getRandomProductId(): number {
    const pull: number[] = [ this.settings.production1Percent, this.settings.production2Percent, this.settings.production3Percent ];
    if (this.scene.state.userCow.factory.boostTime > 0) pull.push(this.settings.production4Percent);

    const totalCounter: number = pull.reduce((prev, current) => prev += current);
    const arrRange: {
      id: number,
      bottom: number,
      top: number
    }[] = [];

    let current: number = 0;
    let previos: number = 0;
    for (let i: number = 0; i < pull.length; i += 1) {
      if (pull[i] !== 0) {
        current = pull[i] + previos;
        arrRange.push({
          id: i + 1, 
          bottom: previos, 
          top: current 
        })
        previos = current;
      }
    }

    const randomIndex: number = Phaser.Math.Between(1, totalCounter);
    let productId: number;

    for (let i: number = 0; i < arrRange.length; i += 1) {
      if (arrRange[i].bottom < randomIndex && arrRange[i].top >= randomIndex) {
        productId = arrRange[i].id;
      }
    }
    return productId;
  }

  public sellProducts(): void {
    if (this.money > 0) {
      this.scene.tryTask(20, 0);

      this.scene.state.userCow.money += this.money;
      this.money = 0;
      this.production1Money = 0;
      this.production2Money = 0;
      this.production3Money = 0;
      this.production4Money = 0;
      
      this.scene.game.scene.keys['CowBars'].plusMoneyAnimation({
        x: this.x + 120,
        y: this.y + 120
      });
    }
  }
}