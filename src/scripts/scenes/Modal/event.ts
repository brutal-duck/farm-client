// окно подтверждения изгнания
function confirmExpelAnimal(): void {
    
  this.textHeader.setText(this.state.lang.expelChicken); // заменить тексты

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 60, this.state.lang.confirmExpelChicken, {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: { width: 400 }
  }).setOrigin(0.5, 0.5);

  let button = this.bigButton('red', 'center', 40, this.state.lang.expel);
  this.clickModalBtn(button, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].expelAnimal();
  });

  let cancel = this.bigButton('yellow', 'center', 120, this.state.lang.cancel);
  this.clickModalBtn(cancel, (): void => {
    this.state.animal.expel = false;
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  });

  this.resizeWindow(250);

}

export { confirmExpelAnimal } 