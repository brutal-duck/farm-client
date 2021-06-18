import { currentTerritory } from "../../../scenes/Event/Unicorns/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class ExpelAnimalWindow {
  public scene: Modal;

  private farm: string

  constructor(scene: Modal) {
    this.scene = scene;
    this.farm = this.scene.state.farm
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    this.scene.textHeader.setText(this.scene.state.lang[`expel${this.farm}`]);

    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 60, this.scene.state.lang[`confirmExpel${this.farm}`], {
      font: '26px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5, 0.5);
  
    const button = this.scene.bigButton('red', 'center', 40, this.scene.state.lang.expel);
    this.scene.clickModalBtn(button, (): void => {
      this.closeWindow()
      this.expelAnimal();
    });
  
    const cancel = this.scene.bigButton('yellow', 'center', 120, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(cancel, (): void => {
      this.scene.state.animal.expel = false;
      this.closeWindow()
    });
  
    this.scene.resizeWindow(250);
  
  }


  private expelAnimal(): void {

    if (this.farm === 'Sheep') {
      this.scene.state.animal.woolSprite.destroy();
      this.scene.state.animal.shaveStatus.destroy();
    } else if (this.farm === 'Unicorn') {
      currentTerritory(this.scene.state.animal.x, this.scene.state.animal.y).data.values.merging = [];
      this.scene.state.animal.data.values.active?.data.values.cloud.destroy();
      this.scene.state.animal.data.values.active?.destroy();
    }
  
    this.scene.state.animal.destroy();
  
  }


  private closeWindow(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }

}