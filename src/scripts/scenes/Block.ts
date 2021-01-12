class Block extends Phaser.Scene {

  constructor() {
    super('Block');
  }


  public create(): void {

    let height: number = Number(this.game.config.height);

    this.add.tileSprite(0, 0, 720, height, 'pixel')
      .setInteractive()
      .setOrigin(0, 0);
      
  }

}

export default Block;
