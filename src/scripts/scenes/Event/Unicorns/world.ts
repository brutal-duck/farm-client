import Scrolling from '../../../libs/Scrolling';

function world(): void {
  const state: Istate = this.state;
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

  let forest: number = 5;
  state.unicornTerritories.map((data: IunicornTerritories, index: number) => {
    let x: number = (data.position - 1) * this.height;
    let y: number = (data.block - 1) * this.height;
    
    forest++;
    if (forest > 6) forest = 1;
    if (data.position === 0) x++;
    if (data.block === 0) y++;
    y += this.topIndent;

    let type: string;

    if (data.type === 0) {

      type = 'event-for-buying';

    } else if (data.type === 2) {

      type = 'event-grass'
      
    } else if (data.type === 4) {

      type = 'event-work-zone';
    
    }
    const territory:Phaser.Physics.Arcade.Sprite = this.territories.create(x, y, type);
    
    territory.setDataEnabled()
    .setOrigin(0, 0)
    .setDepth(y);

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

    territory.data.values.borderTop = this.add.sprite(territory.x, territory.y + 15, 'unicorn-horizontal-border-' + topBorder)
      .setOrigin(0, 1)
      .setDepth(territory.y + 1)
      .setVisible(false);
    
    territory.data.values.borderLeft = this.add.sprite(territory.x, territory.y, 'unicorn-vertical-border')
      .setOrigin(0, 0)
      .setDepth(territory.y + 1)
      .setVisible(false);

    territory.data.values.borderRight = this.add.sprite(territory.x + 240, territory.y, 'unicorn-vertical-border')
      .setOrigin(1, 0)
      .setDepth(territory.y + 1)
      .setVisible(false);

    territory.data.values.borderBottom = this.add.sprite(territory.x, territory.y + 240, 'unicorn-horizontal-border-' + bottomBorder)
      .setOrigin(0, 1)
      .setDepth(territory.y + 1)
      .setVisible(false);

    if (data.type === 0) {

      let x: number = territory.x + 120;
      let y: number = territory.y + 120;

      const unlock: number = state.unicornSettings.territoriesUnicornPrice.find((data: IunicornTerritoriesPrice) => data.block === territory.data.values.block && data.position === territory.data.values.position).unlock;

      territory.data.values.forest = this.add.image(territory.x + 120, territory.y + 240, 'event-forest-' + forest)
        .setOrigin(0.5, 1)
        .setDepth(territory.y + 2);
      territory.data.values.btn = this.add.image(x, y,'event-territory-btn').setDepth(territory.y + 3);
      territory.data.values.btnText = this.add.text(x + 2, y + 2, state.lang.buy,  {
        font: '30px Shadow',
        color: '#e2f5fe',
        align: 'center'
      }).setOrigin(0.5,0.5).setDepth(territory.y + 4).setShadow(0, -2, '#00000055', 0);
      territory.data.values.lock_image = this.add.image(x, y, 'lock-event-territory').setDepth(territory.y + 3).setVisible(false);

        // проверка на замок
      if (unlock > state.userUnicorn.points) {
        territory.data.values.btn.setVisible(false);
        territory.data.values.btnText.setVisible(false);
        territory.data.values.lock_image = this.add.image(x, y, 'lock-event-territory').setDepth(territory.y + 3).setVisible(true);

      }
    } 

    
    
    const territoryZone: Phaser.GameObjects.Zone = this.add.zone(x + 40, y + 40, territory.width - 80, territory.height - 80).setDropZone(undefined, () => {}).setOrigin(0, 0);

    territoryZone.type = 'type' + index;
    if (territoryZone.type === 'type0') territoryZone.setDisplaySize(territoryZone.width, territoryZone.height - 50);
    // let graphics = this.add.graphics().setDepth(territory.y * 5);
    // graphics.lineStyle(5, 0x000000);
    // graphics.strokeRect(territoryZone.x, territoryZone.y, territoryZone.input.hitArea.width, territoryZone.input.hitArea.height);

    
    this.clickTerritory(territory, (): void => {
      if (state.userUnicorn.tutorial > 70) {
        const modal: Imodal = {
          type: 1,
          sysType: 2
        }
        state.modal = modal;
        state.territory = territory;
        state.territory.type = territory.data.values.type;
        state.territory.block = territory.data.values.block;
        state.territory.position = territory.data.values.position;
        if (territory.data.values.type !== 2 && territory.data.values.type !== 4) {
          this.scene.launch('Modal', state);
        }
  
        if (territory.data?.values.merging.length > 0) {
          const animal: Phaser.Physics.Arcade.Sprite = this.animals.children.entries.find((data: any) => data.data.values._id === territory.data.values.merging[0]._id)
          if (!animal.data.values.active.data.values.teleport) {
            this.teleportation(animal.data.values.active, undefined, true);
          }
        }
      }
    });
  });

  this.buildBorders();
  

  // цветочки 
  this.buildFlowers();
  
  // конфети
  this.buildConfetti();


  // группа куриц
  this.animals = this.physics.add.group({
    collideWorldBounds: true
  });

  // подгружаем животных
  state.unicorn?.map((data: Iunicorn) => {
    this.getAnimal(data._id, data.type, data.x, data.y, data.activeAnimal, true);
  });
  
  // подгружаем ресур
  this.resources = this.physics.add.group();
  state.unicornResources.map((data: IunicornResource) => {
    this.getResource(data);
  });

  // туториал, если нужен
  if (state.userUnicorn.tutorial === 0) state.userUnicorn.tutorial = 10;
  if (state.userUnicorn.tutorial > 0 && state.userUnicorn.tutorial < 80) this.showEventTutorial();

  this.startCreateHerdBoostAnimal = state.userUnicorn.herdBoostAnimals.length > 0;
  // расчет оффлайн прогресса
  this.autoprogress(true);
  
}

export default world;
