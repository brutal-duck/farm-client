// включение туториала
function showTutorial(additional: boolean | string = false): void {
  
  if (this.scene.isActive('Modal')) this.scene.stop('Modal');
  if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
  if (this.scene.isActive('Profile')) this.scene.stop('Profile');
  if (this.scene.isActive('Shop')) this.scene.stop('Shop');
  if (this.scene.isActive('ShopBars')) this.scene.stop('ShopBars');
  
  let tutorial: Itutorial = {
    farm: 2,
    step: this.state.userChicken.tutorial,
    additional: additional
  }
  this.state.tutorial = tutorial;
  this.scene.launch('Tutorial', this.state);

}

// завершение первого шага (приветствие)
function doneTutor_0(): void {
  
  this.state.userChicken.tutorial = 10;
  this.scene.stop('Tutorial');
  
}


export {
  showTutorial,
  doneTutor_0
}
