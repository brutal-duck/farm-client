import Scrolling from '../../libs/Scrolling';
import Cave from '../../components/gameObjects/Cave';
import CowSprite from '../../components/Animal/CowSprite';
import CowGroup from '../../components/AnimalGroup/CowGroup';
import Territory from './../../components/Territories/Territory';
import CooldownSprite from './../../components/Territories/CooldownSprite';
import CowTerritory from './../../components/Territories/CowTerritory';

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

    const type: string = getTerritoryType.bind(this)(data);

    let territory: Territory = new CowTerritory(this, x, y, type, data);

    let topBorder: number = 1;
    let bottomBorder: number = 1;
  
    if (territory.position === 1) {
      topBorder = 1;
      bottomBorder = 3;
    } else if (territory.position === 2) {
      topBorder = 2;
      bottomBorder = 1;
    } else if (territory.position === 3) {
      topBorder = 3;
      bottomBorder = 2;
    }

    if (territory.cooldown > 0) {
      territory.cooldownSprite = new CooldownSprite(territory);
    }

    territory.bought = data.bought;
    territory.boughtType = data.boughtType;

    if (territory.bought && territory.cooldown === 0) {
      territory.unlockTerritory();
    }

    territory.createBorders(topBorder, bottomBorder)
    territory.createForest(forest);
  });

  this.buildBorders();
  
  // группа коров
  this.animalGroup = new CowGroup(this);

  // подгружаем коров
  this.state.cow.map((data: Icow) => {
    this.animalGroup.generate({ x: data.x, y: data.y }, data.type, data._id, data.counter, data.milk, data.diamond, data.vector, false)
  });

  // туториал, если нужен
  if (this.state.userCow.tutorial === 0) {
    this.showTutorial();
  }
}

function getTerritoryType(data: Iterritories): string {
  let type: string;
  let stage: number = 1;
  if (data.improve >= 5) {
    stage = 2;
    if (data.improve >= 10) {
      stage = 3
      if (data.improve >= 15) {
        stage = 4
      }
    }
  }
  // if (data.block === 3 && data.position === 1 && data.type !== 8) {
  //   data.type = 8;
  // }
  if (data.type === 0) type = 'cow-for-buying';
  else if (data.type === 1) type = 'cow-bought';
  else if (data.type === 2) {
    type = `${this.state.farm.toLowerCase()}-grass${stage}-`;

    if (data.volume < 250) type += 1;
    else if (data.volume >= 250 && data.volume < 500) type += 2;
    else if (data.volume >= 500 && data.volume < 750) type += 3;
    else if (data.volume >= 750) type += 4;
    
  } else if (data.type === 3) {
    type = `${this.state.farm.toLowerCase()}-water${stage}-`;

    if (data.volume < 250) type += 1;
    else if (data.volume >= 250 && data.volume < 500) type += 2;
    else if (data.volume >= 500 && data.volume < 750) type += 3;
    else if (data.volume >= 750) type += 4;

  } else if (data.type === 4) type = 'cow-merging';
  else if (data.type === 5) type = 'cow-repository';
  else if (data.type === 6) type = 'cow-house';
  else if (data.type === 7) type = 'cow-ground';
  else if (data.type === 8) type = 'cow-repository';
  
  return type;
}
export default world;
