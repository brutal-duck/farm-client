function nextChapter(): void {

  this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'done-chapter');

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 300, this.state.modal.donePart.part, {
    font: '30px Shadow',
    fill: '#290F5B'
  }).setOrigin(0.5, 0.5);

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 260, this.state.modal.donePart.name, {
    font: '36px Shadow',
    fill: '#FFDDA7'
  }).setOrigin(0.5, 0.5);

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 190, this.state.lang.partDone, {
    font: '44px Shadow',
    fill: '#50241D'
  }).setOrigin(0.5, 0.5).setStroke('#FF7700', 7);

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 80, this.state.modal.donePart.doneText, {
    font: '22px Shadow',
    fill: '#FFDEDE',
    align: 'center',
    wordWrap: { width: 350 }
  }).setOrigin(0.5, 0.5);

  this.add.text(this.cameras.main.centerX - 80, this.cameras.main.centerY + 45, this.state.lang.yourAward, {
    font: '26px Shadow',
    fill: '#643202'
  }).setOrigin(0.5, 0.5);

  this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 153, this.state.modal.donePart.chapter);

  this.add.sprite(this.cameras.main.centerX + 170, this.cameras.main.centerY + 50, 'plus').setScale(0.8);
  this.add.sprite(this.cameras.main.centerX + 240, this.cameras.main.centerY + 50, 'award-bg').setScale(0.9);
  this.add.sprite(this.cameras.main.centerX + 240, this.cameras.main.centerY + 50, 'diamond').setScale(0.25).setAngle(5);
  this.add.text(this.cameras.main.centerX + 240, this.cameras.main.centerY + 60, this.state.modal.donePart.award, {
    font: '28px Shadow',
    fill: '#FFFFFF'
  }).setOrigin(0.5, 0.5).setAngle(5);

  let btn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 295, 'done-chapter-button');
  let title: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 290, this.state.lang.nextPart, {
    font: '24px Shadow',
    fill: '#FFD2D2',
    align: 'center',
    wordWrap: { width: 260 }
  }).setOrigin(0.5, 0.5).setStroke('#2C5D0C', 5);

  this.clickModalBtn({ btn, title }, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].donePart();
  });


}

export default nextChapter;
