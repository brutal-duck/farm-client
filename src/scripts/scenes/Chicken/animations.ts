function animations(): void {
  
  // кристаллическая курица
  this.anims.create({
    key: 'chicken-move-right0',
    frames: this.anims.generateFrameNumbers('chicken0', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left0',
    frames: this.anims.generateFrameNumbers('chicken0', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right0',
    frames: [ { key: 'chicken0', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left0',
    frames: [ { key: 'chicken0', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag0',
    frames: [ { key: 'chicken0', frame: 5 } ],
    frameRate: 20
  });

  // первая порода
  this.anims.create({
    key: 'chicken-move-right1',
    frames: this.anims.generateFrameNumbers('chicken1', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left1',
    frames: this.anims.generateFrameNumbers('chicken1', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right1',
    frames: [ { key: 'chicken1', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left1',
    frames: [ { key: 'chicken1', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag1',
    frames: [ { key: 'chicken1', frame: 5 } ],
    frameRate: 20
  });

  // вторая порода
  this.anims.create({
    key: 'chicken-move-right2',
    frames: this.anims.generateFrameNumbers('chicken2', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left2',
    frames: this.anims.generateFrameNumbers('chicken2', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right2',
    frames: [ { key: 'chicken2', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left2',
    frames: [ { key: 'chicken2', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag2',
    frames: [ { key: 'chicken2', frame: 5 } ],
    frameRate: 20
  });
  
  // тертья порода
  this.anims.create({
    key: 'chicken-move-right3',
    frames: this.anims.generateFrameNumbers('chicken3', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left3',
    frames: this.anims.generateFrameNumbers('chicken3', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right3',
    frames: [ { key: 'chicken3', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left3',
    frames: [ { key: 'chicken3', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag3',
    frames: [ { key: 'chicken3', frame: 5 } ],
    frameRate: 20
  });

  // четвертая порода
  this.anims.create({
    key: 'chicken-move-right4',
    frames: this.anims.generateFrameNumbers('chicken4', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left4',
    frames: this.anims.generateFrameNumbers('chicken4', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right4',
    frames: [ { key: 'chicken4', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left4',
    frames: [ { key: 'chicken4', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag4',
    frames: [ { key: 'chicken4', frame: 5 } ],
    frameRate: 20
  });

  // пятая порода
  this.anims.create({
    key: 'chicken-move-right5',
    frames: this.anims.generateFrameNumbers('chicken5', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left5',
    frames: this.anims.generateFrameNumbers('chicken5', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right5',
    frames: [ { key: 'chicken5', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left5',
    frames: [ { key: 'chicken5', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag5',
    frames: [ { key: 'chicken5', frame: 5 } ],
    frameRate: 20
  });

  // шестая порода
  this.anims.create({
    key: 'chicken-move-right6',
    frames: this.anims.generateFrameNumbers('chicken6', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left6',
    frames: this.anims.generateFrameNumbers('chicken6', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right6',
    frames: [ { key: 'chicken6', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left6',
    frames: [ { key: 'chicken6', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag6',
    frames: [ { key: 'chicken6', frame: 5 } ],
    frameRate: 20
  });

  // седьмая порода
  this.anims.create({
    key: 'chicken-move-right7',
    frames: this.anims.generateFrameNumbers('chicken7', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left7',
    frames: this.anims.generateFrameNumbers('chicken7', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right7',
    frames: [ { key: 'chicken7', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left7',
    frames: [ { key: 'chicken7', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag7',
    frames: [ { key: 'chicken7', frame: 5 } ],
    frameRate: 20
  });

  // восьмая порода
  this.anims.create({
    key: 'chicken-move-right8',
    frames: this.anims.generateFrameNumbers('chicken8', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left8',
    frames: this.anims.generateFrameNumbers('chicken8', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right8',
    frames: [ { key: 'chicken8', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left8',
    frames: [ { key: 'chicken8', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag8',
    frames: [ { key: 'chicken8', frame: 5 } ],
    frameRate: 20
  });

  // девятая порода
  this.anims.create({
    key: 'chicken-move-right9',
    frames: this.anims.generateFrameNumbers('chicken9', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left9',
    frames: this.anims.generateFrameNumbers('chicken9', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right9',
    frames: [ { key: 'chicken9', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left9',
    frames: [ { key: 'chicken9', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag9',
    frames: [ { key: 'chicken9', frame: 5 } ],
    frameRate: 20
  });

  // десятая порода
  this.anims.create({
    key: 'chicken-move-right10',
    frames: this.anims.generateFrameNumbers('chicken10', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left10',
    frames: this.anims.generateFrameNumbers('chicken10', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right10',
    frames: [ { key: 'chicken10', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left10',
    frames: [ { key: 'chicken10', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag10',
    frames: [ { key: 'chicken10', frame: 5 } ],
    frameRate: 20
  });

  // одиннадцатая порода
  this.anims.create({
    key: 'chicken-move-right11',
    frames: this.anims.generateFrameNumbers('chicken11', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left11',
    frames: this.anims.generateFrameNumbers('chicken11', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right11',
    frames: [ { key: 'chicken11', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left11',
    frames: [ { key: 'chicken11', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag11',
    frames: [ { key: 'chicken11', frame: 5 } ],
    frameRate: 20
  });

  // двенадцатая порода
  this.anims.create({
    key: 'chicken-move-right12',
    frames: this.anims.generateFrameNumbers('chicken12', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-move-left12',
    frames: this.anims.generateFrameNumbers('chicken12', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'chicken-stay-right12',
    frames: [ { key: 'chicken12', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-stay-left12',
    frames: [ { key: 'chicken12', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'chicken-drag12',
    frames: [ { key: 'chicken12', frame: 5 } ],
    frameRate: 20
  });

}


// мигание нулевого таймера собирателя
function pulseCollector(): void {

  if (this.state.userChicken.collector === 0) {

    this.collector.pulseTimer++;

    if (this.collector.pulseTimer === 20) this.collector.setColor(false);
    else if (this.collector.pulseTimer === 40) {
      this.collector.pulseTimer = 0;
      this.collector.setColor(true);
    }

  }

}


// анимация полных хранилищ
function repositoryAnimation(): void {
  
  for (let i in this.territories.children.entries) {

    let territory = this.territories.children.entries[i];

    if (territory.type === 5 && territory.repository) {

      let max: number = this.state.chickenSettings.territoriesChickenSettings.find((data: IterritoriesChickenSettings) => data.improve === territory.improve).eggStorage;
      
      if (max === territory.volume) {

        let scale: number = territory.repository.scale;

        if (territory.repository.increase) {

          scale += 0.002;
          if (scale >= 1.05) territory.repository.increase = false;

        } else {

          scale -= 0.002;
          if (scale <= 1) territory.repository.increase = true;

        }

        territory.repository.setScale(scale);

      } else if (territory.repository.scale !== 1) {

        territory.repository.scale = 1;

      }

    }

  }

}

// поведение стрелок
function arrowsBehavior(): void {
  
  if (this.arrows?.active) {
    
    this.arrows.update();

    if ((this.scene.isActive('Modal') ||
      this.scene.isActive('Tutorial')) &&
      this.arrows.visible) {
      
      this.arrows.setVisible(false);
      
    } else if (!this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.arrows.visible) {

      this.arrows.setVisible(true);
      
    }

  }

}
export {
  animations,
  pulseCollector,
  repositoryAnimation,
  arrowsBehavior
}
