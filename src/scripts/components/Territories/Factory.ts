import Cow from './../../scenes/Cow/Main';

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
  }

  
  public getPercent(): number[] {
    const pull: number[] = [ this.settings.production1Percent, this.settings.production2Percent, this.settings.production3Percent ];
    if (this.scene.state.userCow.factory.boostTime > 0) pull.push(this.settings.production4Percent);

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
    } else if (this.workAnimation && (this.currentProduction === 0 || !this.currentProduction)){
      this.removeAnimation();
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

  private removeAnimation(): void {
    this.workAnimation.remove();
    this.workAnimation = undefined;
  }
}