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

  constructor(scene, x, y, improve) {
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

  
  public getPercent(product: number): number {
    const pull: number[] = [ this.settings.production1Percent, this.settings.production2Percent, this.settings.production3Percent ];
    if (this.scene.state.userCow.factory.boostTime > 0) pull.push(this.settings.production4Percent);
    return this.settings[`production${product}Percent`] / pull.reduce((prev, cur) => prev += cur) * 100;
  }
}