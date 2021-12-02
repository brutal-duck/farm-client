// включение туториала
import SheepTerritory from './../../components/Territories/SheepTerritory';
import SheepBars from './SheepBars';
function showTutorial(additional: boolean | string = false): void {
  if (this.scene.isActive('Modal')) this.scene.stop('Modal');
  if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
  if (this.scene.isActive('Profile')) this.scene.stop('Profile');
  if (this.scene.isActive('Shop')) this.scene.stop('Shop');
  if (this.scene.isActive('ShopBars')) this.scene.stop('ShopBars');
  if (this.scene.isActive('ClanScroll')) this.scene.stop('ClanScroll');
  if (this.scene.isActive('Achievements')) this.scene.stop('Achievements');
  
  const tutorial: Itutorial = {
    farm: 1,
    step: this.state.userSheep.tutorial,
    additional: additional
  }
  this.state.tutorial = tutorial;
  this.scene.launch('Tutorial', this.state);
}


// завершение первого шага (приветствие)
function doneTutor_0(): void {
  this.state.amplitude.logAmplitudeEvent('tutorial', {
    step: 0
  });
  
  this.state.userSheep.tutorial = 10;
  this.scene.stop('Tutorial');

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
}


// завершение второго шага (покупка овцы)
function doneTutor_10(): void {
  const barsScene = this.game.scene.getScene('SheepBars') as SheepBars;

  this.state.amplitude.logAmplitudeEvent('tutorial', {
    step: 10,
  });

  this.state.userSheep.tutorial = 20;
  this.scene.stop('Tutorial');

  barsScene.animalBuy.setVisible(true);
  barsScene.animalPrice.setVisible(true);
  barsScene.animalPriceBubble.setVisible(true);

  this.buySheep(1);

  this.time.addEvent({ delay: 2500, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// завершение третьего шага (установка пастбища)
function doneTutor_20(): void {
  const barsScene = this.game.scene.getScene('SheepBars') as SheepBars;
  this.state.amplitude.logAmplitudeEvent('tutorial', {
    step: 20
  });

  for (let i in this.sheep.children.entries) {
    this.sheep.children.entries[i].setVisible(true);
    this.sheep.children.entries[i].woolSprite.setVisible(true);
    this.sheep.children.entries[i].shaveStatus.setVisible(true);
  }

  let sheep = this.sheep.children.entries[0];
  this.aim(sheep, 600, 600);

  this.state.userSheep.tutorial = 30;
  barsScene.setBalanceBars(this.balance());
  const elements = [
    barsScene.textGrass.setVisible(true).setAlpha(0),
    barsScene.grassBalance.setVisible(true).setAlpha(0),
    barsScene.balanceBg.setVisible(true).setAlpha(0),
  ]

  this.tweens.add({
    targets: elements,
    alpha: 1,
    duration: 500
  })

  this.time.addEvent({ delay: 3000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
}


// завершение четвертого шага (установка поилки)
function doneTutor_30(): void {
  const barsScene = this.game.scene.getScene('SheepBars') as SheepBars;
  
  this.state.amplitude.logAmplitudeEvent('tutorial', {
    step: 30
  });
  this.state.userSheep.tutorial = 40;

  barsScene.setBalanceBars(this.balance());
  const elements = [
    barsScene.textWater.setVisible(true),
    barsScene.waterBalance.setVisible(true),
  ]

  this.tweens.add({
    targets: elements,
    alpha: 1,
    duration: 500
  })

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
}


// завершение пятого шага (стрижка)
function doneTutor_40(): void {
  this.state.amplitude.logAmplitudeEvent('tutorial', {
    step: 40
  });

  this.state.userSheep.tutorial = 50;

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
}


// завершение шестого шага (покупка второй овцы)
function doneTutor_50(): void {
  const barsScene = this.game.scene.getScene('SheepBars') as SheepBars;

  this.state.amplitude.logAmplitudeEvent('tutorial', {
    step: 50
  });

  this.state.userSheep.tutorial = 60;
  this.scene.stop('Tutorial');

  barsScene.animalBuy.setVisible(true);
  barsScene.animalPrice.setVisible(true);
  barsScene.animalPriceBubble.setVisible(true);

  this.buySheep(1);

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
}


// завершение седьмого шага (награда за задание)
function doneTutor_60(): void {
  this.state.amplitude.logAmplitudeEvent('tutorial', {
    step: 60
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

  this.state.amplitude.logAmplitudeEvent('tutorial', {
    step: 70
  });

  this.state.userSheep.tutorial = 75;

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
}


// завершение шага овцы второй породы
function doneTutor_75(): void {
  this.state.amplitude.logAmplitudeEvent('tutorial', {
    step: 75
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
  this.state.amplitude.logAmplitudeEvent('tutorial', {
    step: 80
  });

  this.state.userSheep.tutorial = 90;

  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
}


// завершение десятого шага (подстригатель)
function doneTutor_90(): void {
  const barsScene = this.game.scene.getScene('SheepBars') as SheepBars;

  this.state.amplitude.logAmplitudeEvent('tutorial', {
    step: 90
  });
  
  this.state.userSheep.tutorial = 100;

  barsScene.taskZone.setVisible(true);
  barsScene.addDiamonds.setVisible(true);
  barsScene.addMoney.setVisible(true);
  barsScene.shop.setVisible(true);
  barsScene.map.setVisible(true);
  barsScene.collectorBtn.setVisible(true);
  barsScene.collector.setVisible(true);
  barsScene.collector.bubble.setVisible(true);
  this.time.addEvent({ delay: 1000, callback: (): void => {
    this.showTutorial();
  }, callbackScope: this, loop: false });
  
}


// закрытие последнего шага туториала
function doneTutor_100(): void {
  this.state.amplitude.logAmplitudeEvent('tutorial', { step: 100 });
  if (this.state.platform === 'android') {
    try { window[`Adjust`].trackEvent(this.state.adjust.tutorialDoneEvent) }
    catch (err) { console.log('ADJUST', err) }
  }
  this.achievement.tryId(1);
  this.scene.stop('Tutorial');
}


// действие третьего шага (установка пастбища)
function progressTutor_20(): void {
  this.scene.stop('Tutorial');

  const territory: SheepTerritory = this.territories.children.entries.find((data: any) => data.block === 2 && data.position === 3);
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

  const territory: SheepTerritory = this.territories.children.entries.find((data: any) => data.block === 2 && data.position === 2);
  const modal: Imodal = {
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

  const territory = this.territories.children.entries.find((data: any) => data.block === 2 && data.position === 1);
  const modal: Imodal = {
    type: 1,
    sysType: 2
  }
  this.state.modal = modal;
  this.state.territory = territory;
  this.scene.launch('Modal', this.state);
}


// выключение тутора и показ окна подстригателя
function progressTutor_90(): void {
  const barsScene = this.game.scene.getScene('SheepBars') as SheepBars;
  barsScene.collectorBtn.setVisible(true);
  this.scene.stop('Tutorial');
  const modal: Imodal = {
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
  const sheep = this.sheep.children.entries.find((data: any) => data.type === 0);

  sheep.setVisible(true);
  sheep.woolSprite.setVisible(true);
  sheep.shaveStatus.setVisible(true);
  sheep.wool = 1000;
  sheep.diamond = 1;
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
  const barsScene = this.game.scene.getScene('SheepBars') as SheepBars;
  this.achievement.tryId(1);

  this.state.amplitude.logAmplitudeEvent('skip_tutorial', {});
  if (this.state.platform === 'android') {
    try { window[`Adjust`].trackEvent(this.state.adjust.tutorialDoneEvent); }
    catch (err) { console.log('ADJUST', err) }
  }
  this.scene.stop('Tutorial');

  this.state.userSheep.tutorial = 100;
  this.state.user.additionalTutorial.balance = true;
  this.state.user.additionalTutorial.cave = true;
  this.state.user.additionalTutorial.herdBoost = true;
  this.state.user.additionalTutorial.feedBoost = true;
  
  for (let i in this.sheep.children.entries) {
    let sheep = this.sheep.children.entries[i]
    sheep.setVisible(true)
    sheep.shaveStatus.setVisible(true);
    sheep.woolSprite.setVisible(true)
    sheep.drag = false
  }

  barsScene.balanceBg.setVisible(true);
  barsScene.taskZone.setVisible(true);
  barsScene.animalBuy.setVisible(true);
  barsScene.animalPrice.setVisible(true);
  barsScene.animalPriceBubble.setVisible(true);
  barsScene.addDiamonds.setVisible(true);
  barsScene.addMoney.setVisible(true);
  barsScene.shop.setVisible(true);
  barsScene.map.setVisible(true);
  barsScene.collectorBtn.setVisible(true);
  barsScene.collector.setVisible(true);
  barsScene.collector.bubble.setVisible(true);
}


// выключение тутора и показ окна подстригателя
function collectorTutorial(): void {
  this.game.scene.keys['SheepBars'].collectorBtn.setVisible(true);
  this.state.amplitude.logAmplitudeEvent('tutorial_collector', {});
  this.scene.stop('Tutorial');

  const modal: Imodal = {
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
