import Modal from "../../../scenes/Modal/Modal";

export default class MultiplyIncomeAd {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '26px',
      fontFamily: 'Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 450 }
    };
    const multiplyStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '35px',
      fontFamily: 'Shadow',
      color: '#ffffff',
      stroke: '#C44002',
      strokeThickness: 7,
    };

    const { multiplyIcomeHeader, multiplyIcomeText,  triple, cancel } = this.scene.state.lang;
    const { centerX, centerY } = this.scene.cameras.main;

    this.scene.textHeader.setText(multiplyIcomeHeader);


    const icon = this.scene.add.sprite(centerX, centerY - 100, `${this.scene.state.farm.toLowerCase()}Coin`).setScale(0.57);
    const iconGeom = icon.getBounds();
    const x = this.scene.add.text(iconGeom.right - 50, iconGeom.bottom - 50, 'x', multiplyStyle).setOrigin(0.5);
    const x3 = this.scene.add.text(iconGeom.right - 20, iconGeom.bottom - 50, '3', multiplyStyle).setFontSize(60).setOrigin(0.5);

    this.scene.add.text(centerX - length, centerY - 100 + 90, multiplyIcomeText, textStyle).setOrigin(0.5, 0);

    const right = { icon: 'ad-icon', text: '' };

    const ad = this.scene.bigButton('green', 'left', 20 + 70, triple, right);
    this.scene.clickModalBtn(ad, (): void => { this.adButtonHandler(); });

    const cancelBtn = this.scene.bigButton('yellow', 'center', 100 + 70, cancel);
    this.scene.clickModalBtn(cancelBtn, (): void => { this.closeWindow(); });

    this.scene.resizeWindow(400);
  }

  private closeWindow(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    if (this.scene.state.farm !== 'Cow') this.scene.state.territory.sellResource();
    else this.scene.state.territory.factory?.sellProducts();
  }

  private adButtonHandler(): void {
    this.scene.game.scene.keys[this.scene.state.farm].ads.watchAd(7);
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }
}