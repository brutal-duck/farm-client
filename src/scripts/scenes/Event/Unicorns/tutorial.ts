// включение туториала
function showEventTutorial(additional: boolean | string = false): void {
  
  if (this.scene.isActive('Modal')) this.scene.stop('Modal');
  if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
  if (this.state.user.additionalTutorial.eventTutorial > 0) {
    if (this.scene.isActive('Profile')) this.scene.stop('Profile');
  }
  let tutorial: Itutorial;
  if (this.state.progress.event.type === 1) {
    tutorial = {
      farm: 3,
      step: this.state.user.additionalTutorial.eventTutorial,
      additional: additional
    };
    
    if (this.game.scene.keys['Unicorn'].mergPointer) {
      this.game.scene.keys['Unicorn'].mergPointer?.data?.values.animal?.destroy();
      this.game.scene.keys['Unicorn'].mergPointer?.destroy();
    }

  } else if (this.state.progress.event.type === 2) {
    tutorial = {
      farm: 4,
      step: this.state.user.additionalTutorial.eventTutorial,
      additional: additional
    };
  }
  this.state.tutorial = tutorial;
  this.scene.launch('Tutorial', this.state);

}


// завершение первого шага (зазывание на карте)
function doneEventTutor_0(): void {
  if (this.state.progress.event.type === 1) {
    this.logAmplitudeEvent('tutorial', {
      step: 0,
      farm_id: 'Unicorn'
    });
    this.state.user.eventPoints = 0;
    this.state.user.additionalTutorial.eventTutorial = 10;
    
    this.scene.stop('Tutorial');
    this.scene.stop(this.state.farm);
    this.scene.stop(this.state.farm + 'Bars');
    this.scene.stop('Profile');
    this.scene.start('UnicornPreload', this.state);

  } else if (this.state.progress.event.type === 2) {

    this.logAmplitudeEvent('tutorial', {
      step: 0,
      farm_id: 'Fortune'
    });
    this.state.user.eventPoints = 1;
    this.state.user.additionalTutorial.eventTutorial = 10;
    
    this.scene.stop('Tutorial');
    this.scene.stop('Profile');
    this.scene.launch('Fortune', this.state);
  }
}


// завершение второго шага (приветствие часть 1)
function doneEventTutor_10(): void {
  this.logAmplitudeEvent('tutorial', {
    step: 10,
  });
  this.state.user.additionalTutorial.eventTutorial = 20;
  this.scene.stop('Tutorial');

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showEventTutorial();
    
  }, callbackScope: this, loop: false });
  
}


// завершение третьего шага (приветствие часть 2)
function doneEventTutor_20(): void {
  this.logAmplitudeEvent('tutorial', {
    step: 20,
  });
  this.state.user.additionalTutorial.eventTutorial = 30;
  this.scene.stop('Tutorial');
  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showEventTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение четвертого шага (купи 2 единорога)
function doneEventTutor_30(): void {
  this.logAmplitudeEvent('tutorial', {
    step: 30,
  });
  this.state.user.additionalTutorial.eventTutorial = 40;
  this.game.scene.keys['UnicornBars'].animalBuy.setVisible(true);
  this.game.scene.keys['UnicornBars'].animalPrice.setVisible(true);
  this.game.scene.keys['UnicornBars'].animalPriceBubble.setVisible(true);
  this.scene.stop('Tutorial');
  this.time.addEvent({ delay: 500, callback: (): void => {
    this.showEventTutorial();
    
  }, callbackScope: this, loop: false });
  
}


// завершение пятого шага (смерджи два единорога)
function doneEventTutor_40(): void {
  this.logAmplitudeEvent('tutorial', {
    step: 40,
  });
  this.showMergPointer = false;
  this.mergPointer?.data.values.animal?.destroy();
  this.mergPointer?.destroy();
  this.state.user.additionalTutorial.eventTutorial = 50;

  this.time.addEvent({ delay: 500, callback: (): void => {
    this.showEventTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение шестого шага (отправь на работу единорога)
function doneEventTutor_50(): void {
  this.logAmplitudeEvent('tutorial', {
    step: 50,
  });
  this.mergPointer?.data.values.animal?.destroy();
  this.mergPointer?.destroy();
  this.state.user.additionalTutorial.eventTutorial = 60;
  this.time.addEvent({ delay: 500, callback: (): void => {
    this.showEventTutorial();
    
  }, callbackScope: this, loop: false });
  
}


// завершение седьмого шага (заключение часть 1)
function doneEventTutor_60(): void {
  this.logAmplitudeEvent('tutorial', {
    step: 60,
  });
  this.state.user.additionalTutorial.eventTutorial = 70;
  this.scene.stop('Tutorial');

  this.time.addEvent({ delay: 500, callback: (): void => {
    this.showEventTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение восьмого шага (заключение часть 2)
function doneEventTutor_70(): void {

  // this.state.amplitude.getInstance().logEvent('event_tutor_complete', {
  //   farm_id: this.state.farm,
  //   step: 70,
  // });
  
  this.logAmplitudeEvent('tutorial', {
    step: 70,
  });
  this.state.user.additionalTutorial.eventTutorial = 80;
  this.game.scene.keys['UnicornBars'].shop.setVisible(true);
  this.game.scene.keys['UnicornBars'].map.setVisible(true);
  this.game.scene.keys['UnicornBars'].collectorBtn.setVisible(true);
  this.game.scene.keys['UnicornBars'].collector.setVisible(true);
  this.game.scene.keys['UnicornBars'].collector.bubble.setVisible(true);
  this.scene.stop('Tutorial');
  
}


// выключение тутора для мерджинга животных
function progressEventTutor_40() {

  this.mergTutor = 0;
  this.mergPointer = this.physics.add.sprite(120, 740, 'event-tutor-merging').setDepth(Number(this.game.config.width)).setOrigin(0, 0);
  this.mergPointer.setDataEnabled();
  this.mergPointer.data.values.animal = this.physics.add.sprite(120, 740, 'animal1').setDepth(this.height).setTint(0x777777).setScale(0.95);
  this.mergPointer.first = true;
  this.showMergPointer = true;
  this.scene.stop('Tutorial');

}

function progressEventTutor_50() {
  let animal: Phaser.Physics.Arcade.Sprite = this.animals.getChildren()[0];
  this.mergTutor = 0;
  this.mergPointer = this.physics.add.sprite(animal.x, animal.y, 'event-tutor-merging').setDepth(Number(this.game.config.width)).setOrigin(0, 0);
  this.mergPointer.setDataEnabled();
  this.mergPointer.data.values.animal = this.physics.add.sprite(animal.x, animal.y, 'animal' + animal.data.values.type).setDepth(this.height).setTint(0x777777).setScale(0.95);
  this.mergPointer.first = true;
  this.showMergPointer = true;
  this.scene.stop('Tutorial');

}




export {
  showEventTutorial,
  doneEventTutor_0,
  doneEventTutor_10,
  doneEventTutor_20,
  doneEventTutor_30,
  doneEventTutor_40,
  doneEventTutor_50,
  doneEventTutor_60,
  doneEventTutor_70,
  progressEventTutor_40,
  progressEventTutor_50
}
