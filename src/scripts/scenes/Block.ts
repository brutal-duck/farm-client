export default class Block extends Phaser.Scene {
  constructor(){
    super('Block');
  }

  public create(): void {
    this.add.tileSprite(0, 0,
      Number(this.game.config.width),
      Number(this.game.config.height),
      'modal'
    ).setOrigin(0).setInteractive();
  }
}