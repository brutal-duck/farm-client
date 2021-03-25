import Scrolling from '../../libs/Scrolling';

function world(): void {

  this.height = Math.round(Number(this.game.config.width) / 3); // ширина территории
  let worldHeight: number = 8 * this.height; // высота играбельного мира
  let allHeight: number = worldHeight + this.topIndent + this.bottomIndent; // вся высота мира
  this.add.tileSprite(0, 0, this.game.config.width, allHeight, 'bg').setOrigin(0, 0);
  this.top = this.add.sprite(0, 0, 'cow-top').setOrigin(0, 0);
  this.bottom = this.add.sprite(0, allHeight, 'cow-bottom').setOrigin(0, 1).setDepth(allHeight);
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
  this.state.cowTerritories.map((data: Iterritories) => {

    let x: number = (data.position - 1) * this.height;
    let y: number = (data.block - 1) * this.height;

    forest++;
    if (forest > 8) forest = 1;

    if (data.position === 0) x++;
    if (data.block === 0) y++;
    y += this.topIndent;

    let type: string;

    if (data.type === 0) {

      type = 'cow-for-buying';

    } else if (data.type === 1) {

      type = 'cow-bought';

    } else if (data.type === 2) {

      switch (data.improve) {
        case 1:
          type = 'cow-grass1-';
          break;
        case 2:
          type = 'cow-grass2-';
          break;
        case 3:
          type = 'cow-grass3-';
          break;
        case 4:
          type = 'cow-grass4-';
          break;
      }

      if (data.volume < 200) {
        type += 1;
      } else if (data.volume >= 200 && data.volume < 400) {
        type += 2;
      } else if (data.volume >= 400 && data.volume < 600) {
        type += 3;
      } else if (data.volume >= 600 && data.volume < 800) {
        type += 4;
      } else if (data.volume >= 800) {
        type += 5;
      }
      
    } else if (data.type === 3) {

      switch (data.improve) {
        case 1:
          type = 'cow-water1-';
          break;
        case 2:
          type = 'cow-water2-';
          break;
        case 3:
          type = 'cow-water3-';
          break;
        case 4:
          type = 'cow-water4-';
          break;
      }

      if (data.volume < 250) {
        type += 1;
      } else if (data.volume >= 250 && data.volume < 500) {
        type += 2;
      } else if (data.volume >= 500 && data.volume < 750) {
        type += 3;
      } else if (data.volume >= 750) {
        type += 4;
      }

    } else if (data.type === 4) {

      type = 'cow-merging';

    } else if (data.type === 5) {

      type = 'cow-repository';

    } else if (data.type === 6) {

      type = 'cow-house';

    } else if (data.type === 7) {

      type = 'cow-ground';

    }

    let territory = this.territories.create(x, y, type);
    territory.setOrigin(0, 0);
    territory.setDepth(y);
    territory._id = data._id;
    territory.block = data.block;
    territory.position = data.position;
    territory.type = data.type;
    territory.volume = data.volume;
    territory.improve = data.improve;
    territory.money = data.money;

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

    territory.borderTop = this.add.sprite(territory.x, territory.y + 15, 'cow-horizontal-border-' + topBorder)
      .setOrigin(0, 1)
      .setDepth(territory.y)
      .setVisible(false);
    
    territory.borderLeft = this.add.sprite(territory.x, territory.y, 'cow-vertical-border')
      .setOrigin(0, 0)
      .setDepth(territory.y)
      .setVisible(false);

    territory.borderRight = this.add.sprite(territory.x + 240, territory.y, 'cow-vertical-border')
      .setOrigin(1, 0)
      .setDepth(territory.y)
      .setVisible(false);

    territory.borderBottom = this.add.sprite(territory.x, territory.y + 240, 'cow-horizontal-border-' + bottomBorder)
      .setOrigin(0, 1)
      .setDepth(territory.y + 240)
      .setVisible(false);

    if (data.type === 0) {

      let x: number = territory.x + 120;
      let y: number = territory.y + 120;

      let unlock: number = this.state.cowSettings.territoriesCowPrice.find((data: IterritoriesPrice) => data.block === territory.block && data.position === territory.position).unlock;

      territory.forest = this.add.image(territory.x + 120, territory.y + 240, 'cow-forest-' + forest)
        .setOrigin(0.5, 1)
        .setDepth(territory.y + 1);

      if (unlock > this.state.userCow.part) {

        territory.lock_image = this.add.image(x, y, 'lock-territory').setDepth(territory.y + 2);
        territory.lock_text = this.add.text(x, y - 37, this.state.lang.part + ' ' + unlock, {
          font: '26px Shadow',
          color: '#ECDFDF'
        }).setOrigin(0.5, 0.5).setDepth(territory.y + 2);

      }

    }

    if (data.type === 4) {

      territory.merging = [];
      territory.mergingCounter = 0;
      this.add.image(x, y - 35, 'cow-tent').setDepth(y).setOrigin(0, 0);
      
      let leftZone: Phaser.GameObjects.Zone = this.add.zone(x + 45, y + 120, 145, 300).setDropZone(undefined, () => {});
      leftZone.type = 'left';
      
      // let graphics1 = this.add.graphics().setDepth(territory.y * 5);
      // graphics1.lineStyle(2, 0xffff00);
      // graphics1.strokeRect(leftZone.x - leftZone.input.hitArea.width / 2, leftZone.y - leftZone.input.hitArea.height / 2, leftZone.input.hitArea.width, leftZone.input.hitArea.height);

      
      let rightZone: Phaser.GameObjects.Zone = this.add.zone(x + 190, y + 120, 145, 300).setDropZone(undefined, () => {});
      rightZone.type = 'right';
      
      // let graphics2 = this.add.graphics().setDepth(territory.y * 5);
      // graphics2.lineStyle(2, 0x00ff00);
      // graphics2.strokeRect(rightZone.x - rightZone.input.hitArea.width / 2, rightZone.y - rightZone.input.hitArea.height / 2, rightZone.input.hitArea.width, rightZone.input.hitArea.height);

      territory.level = this.add.text(territory.x + 50, territory.y + 220, this.state.userCow.fair, {
        font: '34px Shadow',
        color: '#df870a'
      }).setOrigin(0.5, 0.5).setDepth(y);
      
    }

    // Отрисовка хранилища
    if (data.type === 5) {

      let percent: number = 0;
      let max: number = this.state.cowSettings.territoriesCowSettings[data.improve - 1].milkStorage;
  
      if (data.volume > 0) {
        percent = data.volume / (max / 100);
      }
    
      switch (data.improve) {
        case 1:
          type = 'cow-repository-1-';
          break;
        case 2:
          type = 'cow-repository-2-';
          break;
        case 3:
          type = 'cow-repository-3-';
          break;
        case 4:
          type = 'cow-repository-4-';
          break;
      }
  
      if (percent < 25) {
        type += 1;
      } else if (percent >= 25 && percent < 50) {
        type += 2;
      } else if (percent >= 50 && percent < 75) {
        type += 3;
      } else {
        type += 4;
      }

      let x: number = territory.x + 120;
      let y: number = territory.y + 240;

      territory.repository = this.add.image(x, y, type)
        .setDepth(territory.y + 50)
        .setOrigin(0.5, 1);

    }

    if (data.type === 6) {

      let x: number = territory.x + 120;
      let y: number = territory.y + 240;

      this.house = this.add.image(x, y, 'cow-house-' + this.state.userCow.part)
        .setOrigin(0.5, 1)
        .setDepth(territory.y);

    }

    if (data.type === 7) {

      let x: number = territory.x + 120;
      let y: number = territory.y + 240;
      let texture: string = 'cave-wait';

      if (this.state.userCow.part < 3) texture = 'cave-disable';

      territory.cave = this.add.sprite(x, y, texture)
        .setOrigin(0.5, 1)
        .setDepth(territory.y);
      
      territory.timerBg = this.add.sprite(x, y - 200, 'cave-timer')
        .setDepth(territory.y)
        .setVisible(false);

      territory.timer = this.add.text(x, y - 203, '3:00:00', {
        font: '28px Shadow',
        color: '#455409'
      }).setOrigin(0.5, 0.5).setDepth(territory.y).setVisible(false);

      territory.cave.pulseTimer = 0;

      territory.cave.bgAd = this.add.sprite(x + 50, y - 90, 'bg-ad')
        .setDepth(territory.y).setVisible(false);
      territory.cave.free = this.add.text(x + 50, y - 90, 'free', {
        font: '26px Bip',
        color: '#FBE2D2'
      }).setOrigin(0.5, 0.5).setDepth(territory.y).setAngle(11).setStroke('#793510', 4).setVisible(false);
            
      territory.cave.ad = this.add.sprite(x + 50, y - 90, 'ad-icon')
        .setDepth(territory.y).setAngle(11).setVisible(false);

    }

    this.clickTerritory(territory, (): void => {
      
      if (territory.type !== 6 && territory.type !== 7) {

        let modal: Imodal = {
          type: 1,
          sysType: 2
        }
        this.state.modal = modal;
        this.state.territory = territory;
        this.scene.launch('Modal', this.state);

      } else if (territory.type === 6) {
        
        this.showTasks();

      } else if (territory.type === 7) {
        
        this.takeDiamondCow();

      }

    });

  });

  this.buildBorders();
  
  // группа коров
  this.cow = this.physics.add.group({
    collideWorldBounds: true
  });

  // подгружаем коров
  this.state.cow.map((data: Icow) => {
    this.getCow(data._id, data.type, data.x, data.y, data.counter, data.milk, data.diamond, data.vector, true);
  });
  
  // подгружаем яйца
  this.milk = this.physics.add.group();
  // this.state.cowMilk.map((data: IcowMilk) => {
  //   this.getMilk(data);
  // });

  // туториал, если нужен
  // if (this.state.userCow.tutorial === 0) {
  //   this.showTutorial();
  // }

  // расчет оффлайн прогресса
  // this.autoprogress(true);
  
}

export default world;
