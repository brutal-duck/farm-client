import Scrolling from '../../libs/Scrolling';

function world(): void {

  this.height = Math.round(Number(this.game.config.width) / 3); // ширина территории
  let worldHeight: number = 6 * this.height; // высота играбельного мира
  let allHeight: number = worldHeight + this.topIndent + this.bottomIndent; // вся высота мира
  this.add.tileSprite(0, 0, this.game.config.width, allHeight, 'bg').setOrigin(0, 0);
  this.top = this.add.sprite(0, 0, 'event-top').setOrigin(0, 0);
  this.bottom = this.add.sprite(0, allHeight, 'event-bottom').setOrigin(0, 1).setDepth(allHeight);
  this.cameras.main.setBounds(0, 0, 720, allHeight); // границы сцены
  this.physics.world.setBounds(-100, 0, 920, allHeight); // границы физического мира

  // скролл
  let cameraOptions = {
    wheel: true, // колесо мыши
    bottom: allHeight // нижняя точка мира (от картинки фона)
  };
  this.scrolling = new Scrolling(this, cameraOptions);
  this.input.on('pointerup', (): void => {
    this.scrolling.enabled = true;
    this.scrolling.wheel = true;
  });

  // строим территории
  this.territories = this.physics.add.group(); // группа территорий

  let forest: number = 1;
  let grass: number = 1;
  this.state.eventTerritories.map((data: IeventTerritories, index: number) => {
    let x: number = (data.position - 1) * this.height;
    let y: number = (data.block - 1) * this.height;

    forest++;
    if (forest > 8) forest = 1;
    grass++;
    if (grass > 5) grass = 1;
    if (data.position === 0) x++;
    if (data.block === 0) y++;
    y += this.topIndent;

    let type: string;

    if (data.type === 0) {

      type = 'event-for-buying';

    } else if (data.type === 1) { // промежуточное положение купленной пустой не факт что нужно

      type = 'event-bought';

    } else if (data.type === 2) {

      type = 'event-grass' + grass
      
    } else if (data.type === 4) {

      type = 'event-work-zone';
    
    }
    let territory:Phaser.Physics.Arcade.Sprite = this.territories.create(x, y, type);
    territory.setDataEnabled();
    territory.setOrigin(0, 0);
    territory.setDepth(y);
    territory.data.values._id = data._id;
    territory.data.values.block = data.block;
    territory.data.values.position = data.position;
    territory.data.values.type = data.type;
    territory.data.values.merging = [];

    // заборы
    let topBorder: number = 1;
    let bottomBorder: number = 1;

    if (data.position === 1) {
      topBorder = 1;
      bottomBorder = 3;
    } else if (data.position === 2) {
      topBorder = 2;
      bottomBorder = 1;
    } else if (data.position === 3) {
      topBorder = 3;
      bottomBorder = 2;
    }

    territory.data.values.borderTop = this.add.sprite(territory.x, territory.y + 15, 'event-horizontal-border-' + topBorder)
      .setOrigin(0, 1)
      .setDepth(territory.y)
      .setVisible(false);
    
    territory.data.values.borderLeft = this.add.sprite(territory.x, territory.y, 'event-vertical-border')
      .setOrigin(0, 0)
      .setDepth(territory.y)
      .setVisible(false);

    territory.data.values.borderRight = this.add.sprite(territory.x + 240, territory.y, 'event-vertical-border')
      .setOrigin(1, 0)
      .setDepth(territory.y)
      .setVisible(false);

    territory.data.values.borderBottom = this.add.sprite(territory.x, territory.y + 240, 'event-horizontal-border-' + bottomBorder)
      .setOrigin(0, 1)
      .setDepth(territory.y + 240)
      .setVisible(false);

    if (data.type === 0) {

      let x: number = territory.x + 120;
      let y: number = territory.y + 120;

      let unlock: number = this.state.eventSettings.territoriesEventPrice.find((data: IterritoriesPrice) => data.block === territory.data.values.block && data.position === territory.data.values.position).unlock;

      territory.data.values.forest = this.add.image(territory.x + 120, territory.y + 240, 'event-forest-' + forest)
        .setOrigin(0.5, 1)
        .setDepth(territory.y + 1);
      
      territory.data.values.lock_image = this.add.image(x, y, 'lock-territory').setDepth(territory.y + 2);
      territory.data.values.lock_text = this.add.text(x, y - 37, this.state.lang.part + ' ' + unlock, {
        font: '26px Shadow',
        color: '#ECDFDF'
      }).setOrigin(0.5, 0.5).setDepth(territory.y + 2);

        // проверка на замок
      // if (unlock > this.state.userEvent.part) {

      //   territory.lock_image = this.add.image(x, y, 'lock-territory').setDepth(territory.y + 2);
      //   territory.lock_text = this.add.text(x, y - 37, this.state.lang.part + ' ' + unlock, {
      //     font: '26px Shadow',
      //     color: '#ECDFDF'
      //   }).setOrigin(0.5, 0.5).setDepth(territory.y + 2);

      // }
    } 

    let territoryZone: Phaser.GameObjects.Zone = this.add.zone(x + 10, y + 10, territory.width - 20, territory.height - 20).setDropZone(undefined, () => {}).setOrigin(0, 0);
    territoryZone.type = 'type' + index;
    let graphics = this.add.graphics().setDepth(territory.y * 5);
    graphics.lineStyle(5, 0x000000);
    graphics.strokeRect(territoryZone.x, territoryZone.y, territoryZone.input.hitArea.width, territoryZone.input.hitArea.height);

    
    this.clickTerritory(territory, (): void => {
      this.state.territory = territory;
      this.buyTerritory();

    });

  });

  this.buildBorders();
  
  // группа куриц
  this.animals = this.physics.add.group({
    collideWorldBounds: true
  });

  this.resources = this.physics.add.group();

  // подгружаем куриц
  // this.state.eventAnimals.map((data: IeventAnimal) => {
  //   this.getChicken(data._id, data.type, data.x, data.y, data.counter, data.egg, data.diamond, data.vector, true);
  // });
  
  // // подгружаем яйца
  // this.eggs = this.physics.add.group();
  // this.state.chickenEggs.map((data: IchickenEgg) => {
  //   this.getEgg(data);
  // });

  // // туториал, если нужен
  // if (this.state.userChicken.tutorial === 0) {
  //   this.showTutorial();
  // }

  // // расчет оффлайн прогресса
  // this.autoprogress(true);
  
}

export default world;
