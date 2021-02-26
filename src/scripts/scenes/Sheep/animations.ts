function animations(): void {
  
  // кристаллическая овца
  this.anims.create({
    key: 'sheep-move-right0',
    frames: this.anims.generateFrameNumbers('sheep0', { start: 5, end: 9 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left0',
    frames: this.anims.generateFrameNumbers('sheep0', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right0',
    frames: [ { key: 'sheep0', frame: 5 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left0',
    frames: [ { key: 'sheep0', frame: 1 } ],
    frameRate: 20
  });

  // первая порода
  this.anims.create({
    key: 'sheep-move-right1',
    frames: this.anims.generateFrameNumbers('sheep1', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left1',
    frames: this.anims.generateFrameNumbers('sheep1', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right1',
    frames: [ { key: 'sheep1', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left1',
    frames: [ { key: 'sheep1', frame: 1 } ],
    frameRate: 20
  });

  // вторая порода
  this.anims.create({
    key: 'sheep-move-right2',
    frames: this.anims.generateFrameNumbers('sheep2', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left2',
    frames: this.anims.generateFrameNumbers('sheep2', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right2',
    frames: [ { key: 'sheep2', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left2',
    frames: [ { key: 'sheep2', frame: 1 } ],
    frameRate: 20
  });
  
  // тертья порода
  this.anims.create({
    key: 'sheep-move-right3',
    frames: this.anims.generateFrameNumbers('sheep3', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left3',
    frames: this.anims.generateFrameNumbers('sheep3', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right3',
    frames: [ { key: 'sheep3', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left3',
    frames: [ { key: 'sheep3', frame: 1 } ],
    frameRate: 20
  });

  // четвертая порода
  this.anims.create({
    key: 'sheep-move-right4',
    frames: this.anims.generateFrameNumbers('sheep4', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left4',
    frames: this.anims.generateFrameNumbers('sheep4', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right4',
    frames: [ { key: 'sheep4', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left4',
    frames: [ { key: 'sheep4', frame: 1 } ],
    frameRate: 20
  });

  // пятая порода
  this.anims.create({
    key: 'sheep-move-right5',
    frames: this.anims.generateFrameNumbers('sheep5', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left5',
    frames: this.anims.generateFrameNumbers('sheep5', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right5',
    frames: [ { key: 'sheep5', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left5',
    frames: [ { key: 'sheep5', frame: 1 } ],
    frameRate: 20
  });

  // шестая порода
  this.anims.create({
    key: 'sheep-move-right6',
    frames: this.anims.generateFrameNumbers('sheep6', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left6',
    frames: this.anims.generateFrameNumbers('sheep6', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right6',
    frames: [ { key: 'sheep6', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left6',
    frames: [ { key: 'sheep6', frame: 1 } ],
    frameRate: 20
  });

  // седьмая порода
  this.anims.create({
    key: 'sheep-move-right7',
    frames: this.anims.generateFrameNumbers('sheep7', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left7',
    frames: this.anims.generateFrameNumbers('sheep7', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right7',
    frames: [ { key: 'sheep7', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left7',
    frames: [ { key: 'sheep7', frame: 1 } ],
    frameRate: 20
  });

  // восьмая порода
  this.anims.create({
    key: 'sheep-move-right8',
    frames: this.anims.generateFrameNumbers('sheep8', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left8',
    frames: this.anims.generateFrameNumbers('sheep8', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right8',
    frames: [ { key: 'sheep8', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left8',
    frames: [ { key: 'sheep8', frame: 1 } ],
    frameRate: 20
  });

  // девятая порода
  this.anims.create({
    key: 'sheep-move-right9',
    frames: this.anims.generateFrameNumbers('sheep9', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left9',
    frames: this.anims.generateFrameNumbers('sheep9', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right9',
    frames: [ { key: 'sheep9', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left9',
    frames: [ { key: 'sheep9', frame: 1 } ],
    frameRate: 20
  });

  // десятая порода
  this.anims.create({
    key: 'sheep-move-right10',
    frames: this.anims.generateFrameNumbers('sheep10', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left10',
    frames: this.anims.generateFrameNumbers('sheep10', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right10',
    frames: [ { key: 'sheep10', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left10',
    frames: [ { key: 'sheep10', frame: 1 } ],
    frameRate: 20
  });

  // одиннадцатая порода
  this.anims.create({
    key: 'sheep-move-right11',
    frames: this.anims.generateFrameNumbers('sheep11', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left11',
    frames: this.anims.generateFrameNumbers('sheep11', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right11',
    frames: [ { key: 'sheep11', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left11',
    frames: [ { key: 'sheep11', frame: 1 } ],
    frameRate: 20
  });

  // двенадцатая порода
  this.anims.create({
    key: 'sheep-move-right12',
    frames: this.anims.generateFrameNumbers('sheep12', { start: 4, end: 7 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-move-left12',
    frames: this.anims.generateFrameNumbers('sheep12', { start: 0, end: 3 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'sheep-stay-right12',
    frames: [ { key: 'sheep12', frame: 4 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'sheep-stay-left12',
    frames: [ { key: 'sheep12', frame: 1 } ],
    frameRate: 20
  });

}


// мигание нулевого таймера собирателя
function pulseCollector(): void {

  if (this.state.userSheep.collector === 0 && this.state.userSheep.tutorial >= 100) {

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

      let max: number = this.state.sheepSettings.territoriesSheepSettings.find((data: IterritoriesSheepSettings) => data.improve === territory.improve).woolStorage;
      
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
      this.scene.isActive('Block') ||
      this.scene.isActive('Tutorial')) &&
      this.arrows.visible) {
      
      this.arrows.setVisible(false);
      
    } else if (!this.scene.isActive('Modal') &&
      !this.scene.isActive('Block') &&
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
