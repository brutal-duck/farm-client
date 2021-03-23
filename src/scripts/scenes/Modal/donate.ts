function donate() {
  
  this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'donate');

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 10, this.state.lang.crystalsCredited, {
    font: '30px Shadow',
    color: '#763701',
    align: 'center',
    wordWrap: { width: 350 }
  }).setOrigin(0.5, 0.5);

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 70, this.state.lang.enjoy, {
    font: '30px Shadow',
    color: '#763701',
    align: 'center',
    wordWrap: { width: 350 }
  }).setOrigin(0.5, 0.5);

  let btn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX - 7, this.cameras.main.centerY + 166, 'done-chapter-button');
  let title: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 7, this.cameras.main.centerY + 158, this.state.lang.excellent, {
    font: '32px Shadow',
    fill: '#FFD2D2',
    align: 'center'
  }).setOrigin(0.5, 0.5).setStroke('#2C5D0C', 5);

  this.clickModalBtn({ btn, title }, (): void => {

    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].takeDonate();

  });

  this.openModal(this.cameras.main);

}

export default donate;