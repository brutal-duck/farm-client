function animations(): void {
  
  // кристаллическая корова
  this.anims.create({
    key: 'cow-move-right0',
    frames: this.anims.generateFrameNumbers('cow0', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left0',
    frames: this.anims.generateFrameNumbers('cow0', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right0',
    frames: [ { key: 'cow0', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left0',
    frames: [ { key: 'cow0', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag0',
    frames: [ { key: 'cow0', frame: 5 } ],
    frameRate: 20
  });

  // первая порода
  this.anims.create({
    key: 'cow-move-right1',
    frames: this.anims.generateFrameNumbers('cow1', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left1',
    frames: this.anims.generateFrameNumbers('cow1', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right1',
    frames: [ { key: 'cow1', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left1',
    frames: [ { key: 'cow1', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag1',
    frames: [ { key: 'cow1', frame: 5 } ],
    frameRate: 20
  });

  // вторая порода
  this.anims.create({
    key: 'cow-move-right2',
    frames: this.anims.generateFrameNumbers('cow2', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left2',
    frames: this.anims.generateFrameNumbers('cow2', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right2',
    frames: [ { key: 'cow2', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left2',
    frames: [ { key: 'cow2', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag2',
    frames: [ { key: 'cow2', frame: 5 } ],
    frameRate: 20
  });
  
  // тертья порода
  this.anims.create({
    key: 'cow-move-right3',
    frames: this.anims.generateFrameNumbers('cow3', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left3',
    frames: this.anims.generateFrameNumbers('cow3', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right3',
    frames: [ { key: 'cow3', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left3',
    frames: [ { key: 'cow3', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag3',
    frames: [ { key: 'cow3', frame: 5 } ],
    frameRate: 20
  });

  // четвертая порода
  this.anims.create({
    key: 'cow-move-right4',
    frames: this.anims.generateFrameNumbers('cow4', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left4',
    frames: this.anims.generateFrameNumbers('cow4', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right4',
    frames: [ { key: 'cow4', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left4',
    frames: [ { key: 'cow4', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag4',
    frames: [ { key: 'cow4', frame: 5 } ],
    frameRate: 20
  });

  // пятая порода
  this.anims.create({
    key: 'cow-move-right5',
    frames: this.anims.generateFrameNumbers('cow5', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left5',
    frames: this.anims.generateFrameNumbers('cow5', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right5',
    frames: [ { key: 'cow5', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left5',
    frames: [ { key: 'cow5', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag5',
    frames: [ { key: 'cow5', frame: 5 } ],
    frameRate: 20
  });

  // шестая порода
  this.anims.create({
    key: 'cow-move-right6',
    frames: this.anims.generateFrameNumbers('cow6', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left6',
    frames: this.anims.generateFrameNumbers('cow6', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right6',
    frames: [ { key: 'cow6', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left6',
    frames: [ { key: 'cow6', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag6',
    frames: [ { key: 'cow6', frame: 5 } ],
    frameRate: 20
  });

  // седьмая порода
  this.anims.create({
    key: 'cow-move-right7',
    frames: this.anims.generateFrameNumbers('cow7', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left7',
    frames: this.anims.generateFrameNumbers('cow7', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right7',
    frames: [ { key: 'cow7', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left7',
    frames: [ { key: 'cow7', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag7',
    frames: [ { key: 'cow7', frame: 5 } ],
    frameRate: 20
  });

  // восьмая порода
  this.anims.create({
    key: 'cow-move-right8',
    frames: this.anims.generateFrameNumbers('cow8', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left8',
    frames: this.anims.generateFrameNumbers('cow8', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right8',
    frames: [ { key: 'cow8', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left8',
    frames: [ { key: 'cow8', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag8',
    frames: [ { key: 'cow8', frame: 5 } ],
    frameRate: 20
  });

  // девятая порода
  this.anims.create({
    key: 'cow-move-right9',
    frames: this.anims.generateFrameNumbers('cow9', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left9',
    frames: this.anims.generateFrameNumbers('cow9', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right9',
    frames: [ { key: 'cow9', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left9',
    frames: [ { key: 'cow9', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag9',
    frames: [ { key: 'cow9', frame: 5 } ],
    frameRate: 20
  });

  // десятая порода
  this.anims.create({
    key: 'cow-move-right10',
    frames: this.anims.generateFrameNumbers('cow10', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left10',
    frames: this.anims.generateFrameNumbers('cow10', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right10',
    frames: [ { key: 'cow10', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left10',
    frames: [ { key: 'cow10', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag10',
    frames: [ { key: 'cow10', frame: 5 } ],
    frameRate: 20
  });

  // одиннадцатая порода
  this.anims.create({
    key: 'cow-move-right11',
    frames: this.anims.generateFrameNumbers('cow11', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left11',
    frames: this.anims.generateFrameNumbers('cow11', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right11',
    frames: [ { key: 'cow11', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left11',
    frames: [ { key: 'cow11', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag11',
    frames: [ { key: 'cow11', frame: 5 } ],
    frameRate: 20
  });

  // двенадцатая порода
  this.anims.create({
    key: 'cow-move-right12',
    frames: this.anims.generateFrameNumbers('cow12', { start: 10, end: 6 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-move-left12',
    frames: this.anims.generateFrameNumbers('cow12', { start: 0, end: 4 }),
    forward: false,
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'cow-stay-right12',
    frames: [ { key: 'cow12', frame: 10 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-stay-left12',
    frames: [ { key: 'cow12', frame: 0 } ],
    frameRate: 20
  });
  this.anims.create({
    key: 'cow-drag12',
    frames: [ { key: 'cow12', frame: 5 } ],
    frameRate: 20
  });

}


// мигание нулевого таймера собирателя
function pulseCollector(): void {

  if (this.state.userCow.collector === 0) {

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

      let max: number = this.state.cowSettings.territoriesCowSettings.find((data: IterritoriesCowSettings) => data.improve === territory.improve).milkStorage;
      
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
