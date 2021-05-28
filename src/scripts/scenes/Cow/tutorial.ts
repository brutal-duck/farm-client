// включение туториала
function showTutorial(additional: boolean | string = false): void {
  
  if (this.scene.isActive('Modal')) this.scene.stop('Modal');
  if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
  if (this.scene.isActive('MapBars')) this.scene.stop('MapBars');
  if (this.scene.isActive('Profile')) this.scene.stop('Profile');

  let tutorial: Itutorial = {
    farm: 4,
    step: this.state.userCow.tutorial,
    additional: additional
  }
  this.state.tutorial = tutorial;
  this.scene.launch('Tutorial', this.state);

}

// завершение первого шага (приветствие)
function doneTutor_0(): void {

  this.logAmplitudeEvent('tutorial', {
    step: 0
  });
  
  this.state.userCow.tutorial = 10;
  this.scene.stop('Tutorial');

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}

function doneTutor_10(): void {

  this.logAmplitudeEvent('tutorial', {
    step: 10
  });
  
  this.state.userCow.tutorial = 20;
  this.scene.stop('Tutorial');

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}

function doneTutor_20(): void {

  this.logAmplitudeEvent('tutorial', {
    step: 20
  });
  
  this.state.userCow.tutorial = 30;
  this.scene.stop('Tutorial');

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}

function doneTutor_30(): void {

  this.logAmplitudeEvent('tutorial', {
    step: 30
  });
  
  this.state.userCow.tutorial = 40;
  this.scene.stop('Tutorial');
}


export {
  showTutorial,
  doneTutor_0,
  doneTutor_10,
  doneTutor_20,
  doneTutor_30,
}
