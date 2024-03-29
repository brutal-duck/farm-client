import Modal from "../../../scenes/Modal/Modal";

export default class ExchangeTerritoryWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    this.scene.textHeader.setText(this.scene.state.lang.exchangeTerritory);
    this.scene.resizeWindow(250);

    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 60, this.scene.state.lang.sureExchange, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 440 }
    }).setOrigin(0.5, 0.5);

    const cancel = this.scene.bigButton('yellow', 'center', 120, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(cancel, (): void => { this.closeWindow(false); });

    if (this.scene.state.exchangeTerritory === 2) {

      const confirm = this.scene.bigButton('green', 'center', 40, this.scene.state.lang.exchangeGrass);
      this.scene.clickModalBtn(confirm, (): void => { this.closeWindow(); });

    } else if (this.scene.state.exchangeTerritory === 3) {

      const confirm = this.scene.bigButton('blue', 'center', 40, this.scene.state.lang.exchangeWater);
      this.scene.clickModalBtn(confirm, (): void => { this.closeWindow(); });

    } else if (this.scene.state.exchangeTerritory === 5) {

      const confirm = this.scene.bigButton('orange', 'center', 40, this.scene.state.lang.exchangeRepository);
      this.scene.clickModalBtn(confirm, (): void => { this.closeWindow(); });

    }
  }

  private closeWindow(exchange: boolean = true): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    if (exchange) this.scene.state.territory.exchangeTerritory();
  }

}