// включение туториала
function showTutorial(additional: boolean | string = false): void {
  
  if (this.scene.isActive('Modal')) this.scene.stop('Modal');
  if (this.scene.isActive('Block')) this.scene.stop('Block');
  if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
  if (this.scene.isActive('MapBars')) this.scene.stop('MapBars');
  if (this.scene.isActive('Map')) this.scene.stop('Map');

  let tutorial: Itutorial = {
    farm: 1,
    step: this.state.userSheep.tutorial,
    additional: additional
  }
  this.state.tutorial = tutorial;
  this.scene.launch('Tutorial', this.state);

}


// завершение первого шага (приветствие)
function doneTutor_0(): void {

  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 0,
    farm_id: this.state.farm
  });
  
  this.state.userSheep.tutorial = 10;
  this.scene.stop('Tutorial');

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение второго шага (покупка овцы)
function doneTutor_10(): void {

  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 10,
    farm_id: this.state.farm
  });
  
  this.state.userSheep.tutorial = 20;
  this.scene.stop('Tutorial');

  this.game.scene.keys['SheepBars'].sheepBuy.setVisible(true);
  this.game.scene.keys['SheepBars'].sheepPrice.setVisible(true);
  this.game.scene.keys['SheepBars'].sheepPriceBubble.setVisible(true);

  this.buySheep(1);

  this.time.addEvent({ delay: 2500, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение третьего шага (установка пастбища)
function doneTutor_20(): void {
  
  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 20,
    farm_id: this.state.farm
  });

  for (let i in this.sheep.children.entries) {
    this.sheep.children.entries[i].setVisible(true);
    this.sheep.children.entries[i].woolSprite.setVisible(true);
    this.sheep.children.entries[i].shaveStatus.setVisible(true);
  }

  let sheep = this.sheep.children.entries[0];
  this.aim(sheep, 600, 600);

  this.state.userSheep.tutorial = 30;
  
  this.game.scene.keys['SheepBars'].setBalanceBars(this.balance());
  this.game.scene.keys['SheepBars'].textGrass.setVisible(true).setAlpha(0);
  this.game.scene.keys['SheepBars'].grassBg.setVisible(true).setAlpha(0);
  this.game.scene.keys['SheepBars'].grassBalance.setVisible(true).setAlpha(0);

  let opacity: number = 0;
  let timeEvent: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 40, callback: (): void => {

    opacity += 0.05;
    this.game.scene.keys['SheepBars'].textGrass.setAlpha(opacity);
    this.game.scene.keys['SheepBars'].grassBg.setAlpha(opacity);
    this.game.scene.keys['SheepBars'].grassBalance.setAlpha(opacity);
    if (opacity >= 1) timeEvent.remove(false);

  }, callbackScope: this, loop: true });

  this.time.addEvent({ delay: 3000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение четвертого шага (установка поилки)
function doneTutor_30(): void {
  
  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 30,
    farm_id: this.state.farm
  });

  this.state.userSheep.tutorial = 40;

  this.game.scene.keys['SheepBars'].setBalanceBars(this.balance());
  this.game.scene.keys['SheepBars'].textWater.setVisible(true);
  this.game.scene.keys['SheepBars'].waterBg.setVisible(true);
  this.game.scene.keys['SheepBars'].waterBalance.setVisible(true);

  let opacity: number = 0;
  let timeEvent: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 40, callback: (): void => {

    opacity += 0.05;
    this.game.scene.keys['SheepBars'].textWater.setAlpha(opacity);
    this.game.scene.keys['SheepBars'].waterBg.setAlpha(opacity);
    this.game.scene.keys['SheepBars'].waterBalance.setAlpha(opacity);
    if (opacity >= 1) timeEvent.remove(false);

  }, callbackScope: this, loop: true });

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение пятого шага (стрижка)
function doneTutor_40(): void {

  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 40,
    farm_id: this.state.farm
  });
  
  this.arrows?.destroy();
  this.state.userSheep.tutorial = 50;

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение шестого шага (покупка второй овцы)
function doneTutor_50(): void {

  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 50,
    farm_id: this.state.farm
  });
  
  this.state.userSheep.tutorial = 60;
  this.scene.stop('Tutorial');

  this.game.scene.keys['SheepBars'].sheepBuy.setVisible(true);
  this.game.scene.keys['SheepBars'].sheepPrice.setVisible(true);
  this.game.scene.keys['SheepBars'].sheepPriceBubble.setVisible(true);

  this.buySheep(1);

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение седьмого шага (награда за задание)
function doneTutor_60(): void {

  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 60,
    farm_id: this.state.farm
  });
  
  this.state.userSheep.tutorial = 70;
  this.scene.stop('Tutorial');

  this.pickUpTaskReward(1);

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение восьмого шага (мерджинг овец)
function doneTutor_70(): void {

  this.showMergPointer = false;
  this.mergPointer?.destroy();

  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 70,
    farm_id: this.state.farm
  });
  
  this.state.userSheep.tutorial = 75;

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение шага овцы второй породы
function doneTutor_75(): void {

  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 75,
    farm_id: this.state.farm
  });
  
  this.scene.stop('Tutorial');

  for (let i in this.sheep.children.entries) {
    this.sheep.children.entries[i].setVisible(true);
    this.sheep.children.entries[i].woolSprite.setVisible(true);
    this.sheep.children.entries[i].shaveStatus.setVisible(true);
    this.sheep.children.entries[i].wool = 1000;
    this.sheep.children.entries[i].x = 600;
    this.sheep.children.entries[i].y = 600;
    this.sheep.children.entries[i].woolSprite.x = 600;
    this.sheep.children.entries[i].woolSprite.y = 600;
    this.sheep.children.entries[i].counter = 200;
    this.sheep.children.entries[i].vector = 8;
    this.sheep.children.entries[i].anims.play('sheep-stay-left2', true);
    this.sheep.children.entries[i].woolSprite.setTexture('sheep-left-2-4');
  }
  
  this.state.userSheep.tutorial = 80;

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });

}


// завершение девятого шага (установка хранилища)
function doneTutor_80(): void {

  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 80,
    farm_id: this.state.farm
  });
  
  this.state.userSheep.tutorial = 90;

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение десятого шага (подстригатель)
function doneTutor_90(): void {

  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 90,
    farm_id: this.state.farm
  });
  
  this.state.userSheep.tutorial = 100;

  this.game.scene.keys['SheepBars'].addDiamonds.setVisible(true);
  this.game.scene.keys['SheepBars'].addMoney.setVisible(true);
  this.game.scene.keys['SheepBars'].shop.setVisible(true);
  this.game.scene.keys['SheepBars'].map.setVisible(true);
  this.game.scene.keys['SheepBars'].collectorBtn.setVisible(true);
  this.game.scene.keys['SheepBars'].collector.timeCollectorText.setVisible(true);
  this.game.scene.keys['SheepBars'].collector.bubble.setVisible(true);

  if (this.state.platform === 'web') {
    this.game.scene.keys['SheepBars'].auth.setVisible(true);
  } else {
    this.game.scene.keys['SheepBars'].menu.setVisible(true);
    this.game.scene.keys['SheepBars'].chat.setVisible(true);
    this.game.scene.keys['SheepBars'].profile.setVisible(true);
  }

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// закрытие последнего шага туториала
function doneTutor_100(): void {

  this.state.amplitude.getInstance().logEvent('tutorial', {
    step: 100,
    farm_id: this.state.farm
  });

  this.scene.stop('Tutorial');
}


// действие третьего шага (установка пастбища)
function progressTutor_20(): void {
  
  this.scene.stop('Tutorial');

  let territory = this.territories.children.entries.find((data: any) => data.block === 2 && data.position === 3);
  let modal: Imodal = {
    type: 1,
    sysType: 2
  }
  this.state.modal = modal;
  this.state.territory = territory;
  this.scene.launch('Modal', this.state);
  
}


// действие четвертого шага (установка поилки)
function progressTutor_30(): void {
  
  this.scene.stop('Tutorial');

  let territory = this.territories.children.entries.find((data: any) => data.block === 2 && data.position === 2);
  let modal: Imodal = {
    type: 1,
    sysType: 2
  }
  this.state.modal = modal;
  this.state.territory = territory;
  this.scene.launch('Modal', this.state);
  
}


// действие пятого шага (рост шерсти овцы)
function progressTutor_40(): void {
  
  this.scene.stop('Tutorial');

  for (let i in this.sheep.children.entries) {
    this.sheep.children.entries[i].setVisible(true);
    this.sheep.children.entries[i].woolSprite.setVisible(true);
    this.sheep.children.entries[i].shaveStatus.setVisible(true);
    this.sheep.children.entries[i].wool = 0;
    this.sheep.children.entries[i].x = 600;
    this.sheep.children.entries[i].y = 600;
    this.sheep.children.entries[i].woolSprite.x = 600;
    this.sheep.children.entries[i].woolSprite.y = 600;
    this.sheep.children.entries[i].counter = 200;
    this.sheep.children.entries[i].vector = 8;
    this.sheep.children.entries[i].anims.play('sheep-stay-left1', true);
    this.sheep.children.entries[i].woolSprite.setTexture('sheep-left-1-1');
  }
  
}


// выключение тутора для мерджинга овец
function progressTutor_70() {

  this.mergTutor = 0;
  this.mergPointer = this.physics.add.sprite(480, 520, 'tutor-merging').setDepth(Number(this.game.config.width));
  this.mergPointer.first = true;
  this.showMergPointer = true;
  this.scene.stop('Tutorial');

}


// выключение тутора и включение окна хранилища
function progressTutor_80() {

  this.scene.stop('Tutorial');

  let territory = this.territories.children.entries.find((data: any) => data.block === 2 && data.position === 1);
  let modal: Imodal = {
    type: 1,
    sysType: 2
  }
  this.state.modal = modal;
  this.state.territory = territory;
  this.scene.launch('Modal', this.state);

}


// выключение тутора и показ окна подстригателя
function progressTutor_90(): void {
  
  this.game.scene.keys['SheepBars'].collectorBtn.setVisible(true);

  this.scene.stop('Tutorial');

  let modal: Imodal = {
    type: 2,
    shopType: 4
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}


// тутор первого шага про пещеру
function doneTutorCave1(): void {

  this.state.user.additionalTutorial.cave = true;
  this.scene.stop('Tutorial');
  this.takeDiamondSheep();

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial('cave2');
  }, callbackScope: this, loop: false });

}


// тутор второго шага про пещеру
function doneTutorCave2(): void {

  this.scene.stop('Tutorial');
  let sheep = this.sheep.children.entries.find((data: any) => data.type === 0);

  sheep.setVisible(true);
  sheep.woolSprite.setVisible(true);
  sheep.shaveStatus.setVisible(true);
  sheep.wool = 1000;
  sheep.diamond = 3;
  sheep.x = 600;
  sheep.y = 600;
  sheep.woolSprite.x = 600;
  sheep.woolSprite.y = 600;
  sheep.counter = 200;
  sheep.vector = 8;
  sheep.anims.play('sheep-stay-left0', true);
  sheep.woolSprite.setTexture('sheep-left-0-4');

}

// отмена всего обучения
function skipTutorial(): void {

  this.state.amplitude.getInstance().logEvent('skip_tutorial', {
    farm_id: this.state.farm
  });

  this.scene.stop('Tutorial');

  this.state.userSheep.tutorial = 100;
  this.state.user.additionalTutorial.balance = true;
  this.state.user.additionalTutorial.cave = true;
  this.state.user.additionalTutorial.herdBoost = true;
  this.state.user.additionalTutorial.feedBoost = true;

  for (let i in this.sheep.children.entries) {
    this.sheep.children.entries[i].setVisible(true);
    this.sheep.children.entries[i].woolSprite.setVisible(true);
    this.sheep.children.entries[i].shaveStatus.setVisible(true);
  }

  this.game.scene.keys['SheepBars'].sheepBuy.setVisible(true);
  this.game.scene.keys['SheepBars'].sheepPrice.setVisible(true);
  this.game.scene.keys['SheepBars'].sheepPriceBubble.setVisible(true);
  this.game.scene.keys['SheepBars'].addDiamonds.setVisible(true);
  this.game.scene.keys['SheepBars'].addMoney.setVisible(true);
  this.game.scene.keys['SheepBars'].shop.setVisible(true);
  this.game.scene.keys['SheepBars'].map.setVisible(true);
  this.game.scene.keys['SheepBars'].collectorBtn.setVisible(true);
  this.game.scene.keys['SheepBars'].collector.timeCollectorText.setVisible(true);
  this.game.scene.keys['SheepBars'].collector.bubble.setVisible(true);

  if (this.state.platform === 'web') {
    this.game.scene.keys['SheepBars'].auth.setVisible(true);
  } else {
    this.game.scene.keys['SheepBars'].menu.setVisible(true);
    this.game.scene.keys['SheepBars'].chat.setVisible(true);
    this.game.scene.keys['SheepBars'].profile.setVisible(true);
  }

}


// выключение тутора и показ окна подстригателя
function collectorTutorial(): void {

  this.game.scene.keys['SheepBars'].collectorBtn.setVisible(true);
  this.state.amplitude.getInstance().logEvent('tutorial_collector', {});
  this.scene.stop('Tutorial');

  let modal: Imodal = {
    type: 2,
    shopType: 4
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}



export {
  showTutorial,
  doneTutor_0,
  doneTutor_10,
  doneTutor_20,
  doneTutor_30,
  doneTutor_40,
  doneTutor_50,
  doneTutor_60,
  doneTutor_70,
  doneTutor_75,
  doneTutor_80,
  doneTutor_90,
  doneTutor_100,
  progressTutor_20,
  progressTutor_30,
  progressTutor_40,
  progressTutor_70,
  progressTutor_80,
  progressTutor_90,
  doneTutorCave1,
  doneTutorCave2,
  skipTutorial,
  collectorTutorial
}
