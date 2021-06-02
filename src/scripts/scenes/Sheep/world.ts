import Scrolling from '../../libs/Scrolling';
import Cave from '../../components/gameObjects/Cave';
import SpeechBubble from './../../components/animations/SpeechBuble';
import CooldownSprite from './../../components/Territories/CooldownSprite';

function world(): void {

  this.height = Math.round(Number(this.game.config.width) / 3); // ширина территории
  let worldHeight: number = 8 * this.height; // высота играбельного мира
  let allHeight: number = worldHeight + this.topIndent + this.bottomIndent; // вся высота мира
  this.add.tileSprite(0, 0, this.game.config.width, allHeight, 'bg').setOrigin(0, 0);
  this.top = this.add.sprite(0, 0, 'sheep-top').setOrigin(0, 0);
  this.bottom = this.add.sprite(0, allHeight, 'sheep-bottom').setOrigin(0, 1).setDepth(allHeight);
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
  this.state.sheepTerritories.map((data: Iterritories) => {

    let x: number = (data.position - 1) * this.height;
    let y: number = (data.block - 1) * this.height;

    forest++;
    if (forest > 8) forest = 1;

    if (data.position === 0) x++;
    if (data.block === 0) y++;
    y += this.topIndent;

    let type: string;

    if (data.type === 0) {

      type = 'sheep-for-buying';

    } else if (data.type === 1) {

      type = 'sheep-bought';

    } else if (data.type === 2) {

      switch (data.improve) {
        case 1:
          type = 'sheep-grass1-';
          break;
        case 2:
          type = 'sheep-grass2-';
          break;
        case 3:
          type = 'sheep-grass3-';
          break;
        case 4:
          type = 'sheep-grass4-';
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
          type = 'sheep-water1-';
          break;
        case 2:
          type = 'sheep-water2-';
          break;
        case 3:
          type = 'sheep-water3-';
          break;
        case 4:
          type = 'sheep-water4-';
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

      type = 'sheep-merging';

    } else if (data.type === 5) {

      type = 'sheep-repository';

    } else if (data.type === 6) {

      type = 'sheep-house';

    } else if (data.type === 7) {

      type = 'sheep-ground';

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
    territory.cooldown = data.cooldown;

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

    territory.borderTop = this.add.sprite(territory.x, territory.y + 15, 'sheep-horizontal-border-' + topBorder)
      .setOrigin(0, 1)
      .setDepth(territory.y)
      .setVisible(false);
    
    territory.borderLeft = this.add.sprite(territory.x, territory.y, 'sheep-vertical-border')
      .setOrigin(0, 0)
      .setDepth(territory.y)
      .setVisible(false);

    territory.borderRight = this.add.sprite(territory.x + 240, territory.y, 'sheep-vertical-border')
      .setOrigin(1, 0)
      .setDepth(territory.y)
      .setVisible(false);

    territory.borderBottom = this.add.sprite(territory.x, territory.y + 240, 'sheep-horizontal-border-' + bottomBorder)
      .setOrigin(0, 1)
      .setDepth(territory.y + 240)
      .setVisible(false);

    if (data.type === 0) {

      let x: number = territory.x + 120;
      let y: number = territory.y + 120;

      let unlock: number = this.state.sheepSettings.territoriesSheepPrice.find((data: IterritoriesPrice) => data.block === territory.block && data.position === territory.position).unlock;

      territory.forest = this.add.image(territory.x + 120, territory.y + 240, 'sheep-forest-' + forest)
        .setOrigin(0.5, 1)
        .setDepth(territory.y + 1);

      if (unlock > this.state.userSheep.part) {

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
      this.add.image(x, y - 57, 'sheep-tent').setDepth(y).setOrigin(0, 0);
      
      let topZone: Phaser.GameObjects.Zone = this.add.zone(x + 120, y + 45, 300, 145).setDropZone(undefined, () => {});
      topZone.type = 'top';
      
      // let graphics1 = this.add.graphics().setDepth(territory.y * 5);
      // graphics1.lineStyle(2, 0xffff00);
      // graphics1.strokeRect(topZone.x - topZone.input.hitArea.width / 2, topZone.y - topZone.input.hitArea.height / 2, topZone.input.hitArea.width, topZone.input.hitArea.height);

      
      let bottomZone: Phaser.GameObjects.Zone = this.add.zone(x + 120, y + 190, 300, 145).setDropZone(undefined, () => {});
      bottomZone.type = 'bottom';
      
      // let graphics2 = this.add.graphics().setDepth(territory.y * 5);
      // graphics2.lineStyle(2, 0x00ff00);
      // graphics2.strokeRect(bottomZone.x - bottomZone.input.hitArea.width / 2, bottomZone.y - bottomZone.input.hitArea.height / 2, bottomZone.input.hitArea.width, bottomZone.input.hitArea.height);

      territory.level = this.add.text(territory.x + 200, territory.y + 185, this.state.userSheep.fair, {
        font: '36px Shadow',
        color: '#b5315a'
      }).setOrigin(0.5, 0.5).setDepth(y);
      
    }

    if (data.type === 5) {

      let percent: number = 0;
      let max: number = this.state.sheepSettings.territoriesSheepSettings[data.improve - 1].woolStorage
  
      if (data.volume > 0) {
        percent = data.volume / (max / 100);
      }
    
      switch (data.improve) {
        case 1:
          type = 'sheep-repository-1-';
          break;
        case 2:
          type = 'sheep-repository-2-';
          break;
        case 3:
          type = 'sheep-repository-3-';
          break;
        case 4:
          type = 'sheep-repository-4-';
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

      this.house = this.add.image(x, y, 'sheep-house-sprite')
        .setOrigin(0.5, 1)
        .setDepth(territory.y);
    }

    if (data.type === 7) {

      let x: number = territory.x + 120;
      let y: number = territory.y + 240;
      Cave.create(this, { x, y });
    }

    if (territory.type === 0 && territory.cooldown > 0) {
      new CooldownSprite(territory);
    }

    territory.bought = data.bought;

    if (territory.bought && territory.cooldown === 0) {
      this.unlockTerritory(territory);
    }

    this.clickTerritory(territory, (): void => {
      if (territory.cooldown > 0) return;
      if (this.state.userSheep.tutorial >= 100) {
        
        if (territory.type !== 6 && territory.type !== 7) {

          let modal: Imodal = {
            type: 1,
            sysType: 2
          }
          this.state.modal = modal;
          this.state.territory = territory;
          this.scene.launch('Modal', this.state);

        } else if (territory.type === 6) {
          if (this.state[`user${this.state.farm}`].collectorLevel < this.state[`${this.state.farm.toLowerCase()}CollectorSettings`].length) {
            this.showImproveCollector();
          } else {
            SpeechBubble.create(this.game.scene.keys[`${this.state.farm}Bars`], this.state.lang.maxCollectorLevel, 3);
          }
        } else if (territory.type === 7) {
          this.takeDiamondSheep();
        }
      }
    });
  });
  this.buildBorders();
  
  // группа овец
  this.sheep = this.physics.add.group({
    collideWorldBounds: true
  });

  // подгружаем овец
  this.state.sheep.map((data: Isheep) => {
    this.getSheep(data._id, data.type, data.x, data.y, data.counter, data.wool, data.diamond, data.vector, false);
  });

  // шерсть
  this.wool = this.physics.add.group();

  // туториал, если нужен
  if (this.state.userSheep.tutorial < 100) {
    this.showTutorial();
  }
}

export default world;
