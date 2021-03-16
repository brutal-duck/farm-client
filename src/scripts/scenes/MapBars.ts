import { clickButton } from '../general/clicks';

class MapBars extends Phaser.Scene {

  public state: Istate;
  public clickButton = clickButton.bind(this);

  constructor() {
    super('MapBars');
  }

  public init(state: Istate): void {
    this.state = state;
  }

  public create(): void {

    let height: number = Number(this.game.config.height);
    let back: Phaser.GameObjects.Image = this.add.image(100, height - 100, 'back');

    this.clickButton(back, (): void => {

      this.game.scene.keys[this.state.farm].scrolling.downHandler();
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop('Map');
      this.scene.stop();
      
    });

  }


}

export default MapBars;
