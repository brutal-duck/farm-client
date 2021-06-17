// включение туториала
function showTutorial(additional: boolean | string = false): void {
  
  if (this.scene.isActive('Modal') && this.state.modal.type !== 13) this.scene.stop('Modal');
  if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
  if (this.scene.isActive('Profile')) this.scene.stop('Profile');
  if (this.scene.isActive('Shop')) this.scene.stop('Shop');
  if (this.scene.isActive('ShopBars')) this.scene.stop('ShopBars');
  
  if (this.state.userCow.tutorial >= 10) {
    let factory: any = this.territories.children.entries.find(el => (el.territoryType === 8));
    this.state.territory = factory;
    if (factory && !this.scene.isActive('Modal')) {
      const modal: Imodal = {
        type: 13,
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
    }; 
  
    const interval: Phaser.Time.TimerEvent = this.time.addEvent({
      delay: 300,
      loop: true,
      callback: (): void => {
        if (this.scene.isActive('Modal') && this.state.modal.type === 13) {
          let tutorial: Itutorial = {
            farm: 5,
            step: this.state.userCow.tutorial,
            additional: additional
          }
          this.state.tutorial = tutorial;
          this.scene.launch('Tutorial', this.state);
          interval.destroy();
        }
      },
      callbackScope: this,
    });
  } else {
    let tutorial: Itutorial = {
      farm: 5,
      step: this.state.userCow.tutorial,
      additional: additional
    }
    this.state.tutorial = tutorial;
    this.scene.launch('Tutorial', this.state);
  }


}

// завершение первого шага (приветствие)
function doneTutor_0(): void {

  this.logAmplitudeEvent('tutorial', {
    step: 0
  });
  
  this.state.userCow.tutorial = 10;
  this.scene.stop('Tutorial');
}

function doneTutor_10(): void {

  this.logAmplitudeEvent('tutorial', {
    step: 10
  });
  
  this.state.userCow.tutorial = 20;
  this.scene.stop('Tutorial');

  this.time.addEvent({ delay: 500, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}

function doneTutor_20(): void {

  this.logAmplitudeEvent('tutorial', {
    step: 20
  });
  
  this.state.userCow.tutorial = 30;
  this.scene.stop('Tutorial');

  this.time.addEvent({ delay: 500, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}

function doneTutor_30(): void {

  this.logAmplitudeEvent('tutorial', {
    step: 30
  });
  
  this.state.userCow.tutorial = 40;
  this.scene.stop('Tutorial');

  this.time.addEvent({ delay: 500, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}

function doneTutor_40(): void {

  this.logAmplitudeEvent('tutorial', {
    step: 40
  });
  
  this.state.userCow.tutorial = 50;
  this.scene.stop('Tutorial');
}


export {
  showTutorial,
  doneTutor_0,
  doneTutor_10,
  doneTutor_20,
  doneTutor_30,
  doneTutor_40,
}
