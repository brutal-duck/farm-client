import Scrolling from '../../libs/Scrolling';
import Cave from '../../components/gameObjects/Cave';
import Egg from '../../components/Resource/Egg';
import SpeechBubble from './../../components/animations/SpeechBuble';
import CooldownSprite from './../../components/Territories/CooldownSprite';
import ChickenTerritory from './../../components/Territories/ChickenTerritory';

function world(): void {

  this.height = Math.round(Number(this.game.config.width) / 3); // ширина территории
  let worldHeight: number = 8 * this.height; // высота играбельного мира
  let allHeight: number = worldHeight + this.topIndent + this.bottomIndent; // вся высота мира
  this.add.tileSprite(0, 0, this.game.config.width, allHeight, 'bg').setOrigin(0, 0);
  this.top = this.add.sprite(0, 0, 'chicken-top').setOrigin(0, 0);
  this.bottom = this.add.sprite(0, allHeight, 'chicken-bottom').setOrigin(0, 1).setDepth(allHeight);
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
  this.state.chickenTerritories.map((data: Iterritories) => {
    let x: number = (data.position - 1) * this.height;
    let y: number = (data.block - 1) * this.height;
    forest++;
    if (forest > 8) forest = 1;
    y += this.topIndent;
    const type: string = getTerritoryType.bind(this)(data);
    const territory: ChickenTerritory = new ChickenTerritory(this, x, y, type, data);
    territory.createForest(forest);
    this.territories.add(territory);
  });

  this.buildBorders();
  
  // группа куриц
  this.chicken = this.physics.add.group({
    collideWorldBounds: true
  });

  // подгружаем куриц
  this.state.chicken.map((data: Ichicken) => {
    this.getChicken(data._id, data.type, data.x, data.y, data.counter, data.egg, data.diamond, data.vector, false);
  });
  
  // подгружаем яйца
  this.eggs = this.physics.add.group();
  this.state.chickenEggs.map((data: IchickenEgg) => {
    Egg.create(this, data)
  });

  this.checkDoneTasks();

  // туториал, если нужен
  if (this.state.userChicken.tutorial === 0) {
    this.showTutorial();
  } 
}

function getTerritoryType(data: Iterritories): string {
  const farm: string = this.state.farm.toLowerCase();
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

  if (data.type === 0) type = `${farm}-for-buying`;
  else if (data.type === 1) type = `${farm}-bought`;
  else if (data.type === 2) {
    type = `${farm}-grass${stage}-`;

    if (data.volume < 250) type += 1;
    else if (data.volume >= 250 && data.volume < 500) type += 2;
    else if (data.volume >= 500 && data.volume < 750) type += 3;
    else if (data.volume >= 750) type += 4;
    
  } else if (data.type === 3) {
    type = `${farm}-water${stage}-`;

    if (data.volume < 250) type += 1;
    else if (data.volume >= 250 && data.volume < 500) type += 2;
    else if (data.volume >= 500 && data.volume < 750) type += 3;
    else if (data.volume >= 750) type += 4;

  } else if (data.type === 4) type = `${farm}-merging`;
  else if (data.type === 5) type = `${farm}-repository`;
  else if (data.type === 6) type = `${farm}-house`;
  else if (data.type === 7) type = `${farm}-ground`;
  else if (data.type === 8) type = `${farm}-repository`;
  
  return type;
}

export default world;
