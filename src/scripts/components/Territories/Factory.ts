import Cow from './../../scenes/Cow/Main';

export default class Factory extends Phaser.GameObjects.Sprite {
  public scene: Cow;
  public settings: IfactorySettings;
  public productionTimer: number = 0;
  public currentProduction: string = '';
  public clabberMoney: number = 0;
  public pasteurizedMilkMoney: number = 0;
  public cheeseMoney: number = 0;
  public chocolateMoney: number = 0;
  public money: number = 0;
  public improve: number;

  constructor(scene, x, y, improve) {
    super(scene, x, y, 'cow-factory');
    this.improve = improve;
    this.init();
  }

  private init(): void {
    this.scene.add.existing(this);
    this.productionTimer = this.scene.state.userCow.factory.productionTimer;
    this.currentProduction = this.scene.state.userCow.factory.currentProduction;
    this.clabberMoney = this.scene.state.userCow.factory.clabberMoney;
    this.pasteurizedMilkMoney = this.scene.state.userCow.factory.pasteurizedMilkMoney;
    this.cheeseMoney = this.scene.state.userCow.factory.cheeseMoney;
    this.chocolateMoney = this.scene.state.userCow.factory.chocolateMoney;
    this.money = this.scene.state.userCow.factory.money;
    this.settings = this.scene.state.cowSettings.cowFactorySettings.find((data: IfactorySettings) => data.improve === this.improve);
  }
}