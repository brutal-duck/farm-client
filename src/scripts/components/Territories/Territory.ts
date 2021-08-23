import Cow from './../../scenes/Cow/Main';
import Cave from './../gameObjects/Cave';
import Firework from './../animations/Firework';
import Stars from './../animations/Stars';
import CooldownSprite from './CooldownSprite';
import Chicken from './../../scenes/Chicken/Main';
import Sheep from './../../scenes/Sheep/Main';
import FadeOut from './../animations/FadeOut';
import SheepTerritory from './SheepTerritory';

export default class Territory extends Phaser.Physics.Arcade.Sprite {
  public scene: Cow | Sheep | Chicken;
  public _id: string;
  public block: number;
  public position: number;
  public territoryType: number; 
  public volume: number;
  public improve: number;
  public money: number;
  public cooldown: number;
  public bought: boolean;
  public boughtType: number;
  public borderTop: Phaser.GameObjects.Sprite;
  public borderBottom: Phaser.GameObjects.Sprite;
  public borderLeft: Phaser.GameObjects.Sprite;
  public borderRight: Phaser.GameObjects.Sprite;
  public improveText: Phaser.GameObjects.Text;

  // тип территории 0
  public forest: Phaser.GameObjects.Sprite;
  public lock_image: Phaser.GameObjects.Sprite;
  public lock_text: Phaser.GameObjects.Text;

  // тип территории 4
  public merging: Imerging[];
  public mergingCounter: number;
  public levelText: Phaser.GameObjects.Text;

  // тип территории 5
  public repository: Phaser.GameObjects.Sprite;
  public repositoryAnim: Phaser.Tweens.Tween;

  // тип территории 6
  public house: Phaser.GameObjects.Sprite;

  // тип территории 8


  public cooldownSprite: CooldownSprite;


  constructor(scene: Cow | Sheep | Chicken, x: number, y: number, type: string, data: Iterritories) {
    super(scene, x, y, type);

    this.init(data);
  }

  private init(data: Iterritories): void {
    this.scene.add.existing(this);
    this.scene.territories.add(this);
    this.setOrigin(0, 0);
    this.setDepth(this.y);
    this._id = data._id;
    this.block = data.block;
    this.position = data.position;
    this.territoryType = data.type;
    this.volume = data.volume;
    this.improve = data.improve;
    this.money = data.money;
    this.cooldown = data.cooldown;
    this.bought = data.bought;
    this.boughtType = data.boughtType;
    this.createElements();
    this.setListeners();
  }

  protected createElements(): void {
    if (this.territoryType === 2 || this.territoryType === 3 || this.territoryType === 5 || this.territoryType === 8) {
      this.createImproveText();
    }
    if (this.territoryType === 4) {
      this.createMergingZone();
    } else if (this.territoryType === 5) {
      this.createRepositorySprite();
    } else if (this.territoryType === 6) {
      this.createHouseSprite();
    } else if (this.territoryType === 7) {
      this.createCave();
    }
    this.createBorders();
    this.unlockTerritory();
    if (this.cooldown > 0) {
      this.cooldownSprite = new CooldownSprite(this);
    }
  }

  protected createImproveText(): void {
    this.improveText = this.scene.add.text(this.x + 38, this.y + 24, String(this.improve), {
      font: '26px Shadow',
      color: '#ffe571',
    }).setStroke('#000000', 1).setDepth(this.depth + 2).setOrigin(0.5);
  }

  public createBorders(): void {
    let topBorder: number = 1;
    let bottomBorder: number = 1;
  
    if (this.position === 1) {
      topBorder = 1;
      bottomBorder = 3;
    } else if (this.position === 2) {
      topBorder = 2;
      bottomBorder = 1;
    } else if (this.position === 3) {
      topBorder = 3;
      bottomBorder = 2;
    }

    const farm: string = this.scene.state.farm.toLowerCase();
    this.borderTop = this.scene.add.sprite(this.x, this.y + 15, `${farm}-horizontal-border-${topBorder}`)
    .setOrigin(0, 1)
    .setDepth(this.y)
    .setVisible(false);
  
    this.borderLeft = this.scene.add.sprite(this.x, this.y, `${farm}-vertical-border`)
      .setOrigin(0, 0)
      .setDepth(this.y)
      .setVisible(false);

    this.borderRight = this.scene.add.sprite(this.x + 240, this.y, `${farm}-vertical-border`)
      .setOrigin(1, 0)
      .setDepth(this.y)
      .setVisible(false);

    this.borderBottom = this.scene.add.sprite(this.x, this.y + 240, `${farm}-horizontal-border-${bottomBorder}`)
      .setOrigin(0, 1)
      .setDepth(this.y + 240)
      .setVisible(false);
  }

  public createForest(forest: number): void {
    const farm: string = this.scene.state.farm.toLowerCase();
    const territoriesPrice: IterritoriesPrice[] = this.scene.state[`${farm}Settings`][`territories${this.scene.state.farm}Price`];
    const part: number = this.scene.state[`user${this.scene.state.farm}`].part;
    if (this.territoryType === 0) {
      const unlock: number = territoriesPrice.find((data: IterritoriesPrice) => data.block === this.block && data.position === this.position).unlock;

      this.forest = this.scene.add.sprite(this.x + 120, this.y + 240, `${farm}-forest-${forest}`)
        .setOrigin(0.5, 1)
        .setDepth(this.y + 1);

      if (unlock > part) {

        this.lock_image = this.scene.add.sprite(this.x + 120, this.y + 120, 'lock-territory').setDepth(this.y + 2);
        this.lock_text = this.scene.add.text(this.x + 120, this.y + 120 - 37, this.scene.state.lang.part + ' ' + unlock, {
          font: '26px Shadow',
          color: '#ECDFDF'
        }).setOrigin(0.5, 0.5).setDepth(this.y + 2);
      }
    }
  }

  public createMergingZone(): void {
    this.merging = [];
    this.mergingCounter = 0;
  }

  public createRepositorySprite(): void {
    if (!this.improveText) {
      this.createImproveText();
    }
    const farm: string = this.scene.state.farm.toLowerCase();
    this.setTexture(`${farm}-repository`);

    let stage: number = 1;
    if (this.improve >= 5) {
      stage = 2;
      if (this.improve >= 10) {
        stage = 3
        if (this.improve >= 15) {
          stage = 4
        }
      }
    }
      
    let percent: number = 0;
    let max: number;   

    if (this.scene.state.farm === 'Sheep') {
      max = this.scene.state.config[this.improve - 1].repositoryVolume
    } else if (this.scene.state.farm === 'Chicken') {
      max = this.scene.state.chickenSettings.territoriesChickenSettings[this.improve - 1].storage;
    } else if (this.scene.state.farm === 'Cow') {
      max = this.scene.state.cowSettings.cowFactorySettings[this.improve - 1].lotSize * this.scene.state.storageMultiply;
    }

    let type: string = `${farm}-repository-${stage}-`;

    if (this.volume > 0) {
      percent = this.volume / (max / 100);
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

    this.repository = this.scene.add.sprite(this.x + 120, this.y + 240, type)
      .setDepth(this.y + 1)
      .setOrigin(0.5, 1);
    
    this.setPositionImproveText();
  }

  public setPositionImproveText(): void {
  }

  private createHouseSprite(): void {
    this.scene.house = this.scene.add.sprite(this.x + 120, this.y + 240, `${this.scene.state.farm.toLowerCase()}-house-sprite`)
      .setOrigin(0.5, 1)
      .setDepth(this.y + 1);
  }

  private createCave(): void {
    Cave.create(this.scene, { x: this.x + 120, y: this.y + 240 });
  }

  private setListeners(): void {
    this.scene.clickTerritory(this, (): void => {
      this.onTerritoryClick();
    });
  }
  
  public onTerritoryClick(): void {
  }

  public buyTerritory(): void {
    const farm: string = this.scene.state.farm;
    const user: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${farm}`];
    const territoriesPrice: IterritoriesPrice[] = this.scene.state[`${farm.toLowerCase()}Settings`][`territories${farm}Price`];
    const settings: IterritoriesPrice = territoriesPrice.find((data: IterritoriesPrice) => data.block === this.block && data.position === this.position);

    if (user.part >= settings.unlock && this.territoryType === 0) {
      // 70% от суммы покупки
      const price = Math.round(this.scene.state.config[this.scene.state[`user${farm}`].part - 1].grassAndWaterTerritoryCost / 100 * 70)

      if (user.money >= price) {
        this.scene.state.amplitude.logAmplitudeEvent('buy_territory', {
          block: this.block,
          position: this.position,
        });

        user.money -= price;
        this.setTerritoryUnlockCooldown(1);
      } else {
        const count: number = price - user.money;
        const diamonds: number = this.scene.convertMoney(count);
        this.openConvertor(count, diamonds, 1);
      }
    }
  }

  private setTerritoryUnlockCooldown(type: number): void {
    const currentPart = this.scene.state[`user${this.scene.state.farm}`].part - 1
    const cd = this.scene.state.config[currentPart].territoryColddown * 60
    const time: number = type === 1 ? cd : Math.round(cd / 4);
    console.log('setTerritoryUnlockCooldown ~ time', time)
    this.scene.tryTask(5, type);
    this.cooldown = time;
    this.boughtType = type;
    this.bought = true;
    this.cooldownSprite = new CooldownSprite(this);
  }
  
  public unlockTerritory(): void {
    if (this.bought && this.cooldown <= 0) {
      if (this.territoryType === 0) {
        FadeOut.create(this.scene, this.scene.add.sprite(this.x + 120, this.y + 120, this.scene.state.farm.toLowerCase() + '-for-buying').setDepth(this.forest.depth - 1));
        FadeOut.create(this.scene, this.forest);
        this.scene.playSoundOnce('tree-falling-sound');
        this.territoryType = this.boughtType;
        this.scene.time.addEvent({ delay: 0, callback: (): void => {
          this.changeSprite();
          this.setTexture(this.scene.state.farm.toLowerCase() + '-bought');
          this.scene.buildBorders();
        }, callbackScope: this, loop: false });
      } else if (this.territoryType === 1) {
        this.territoryType = this.boughtType;
        if (this.territoryType === 5) {
          this.volume = 0;
          this.money = 0;
          this.createRepositorySprite();
          Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
        } else {
          this.volume = 1000;
          this.changeSprite();
          this.scene.time.addEvent({ delay: 500, callback: (): void => {
            Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
          }, callbackScope: this, loop: false });
        }
        this.checkAllTerritoriesIsMaxImproveLvlTask()
      }
    }
  }

  public openConvertor(count: number, diamonds: number, type: number): void {
    this.scene.state.convertor = {
      fun: 0,
      count: count,
      diamonds: diamonds,
      type: type
    }
    const modal: Imodal = {
      type: 1,
      sysType: 4
    }
    this.scene.state.modal = modal;
    this.scene.scene.launch('Modal', this.scene.state);
  }

  public exchangeTerritory(): void {
    let farm: string = this.scene.state.farm;
    const user: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${farm}`];
    const currentPart: number = user.part

    if (
      this.scene.state.exchangeTerritory === 2 ||
      this.scene.state.exchangeTerritory === 3 ||
      this.scene.state.exchangeTerritory === 5
    ) {
      const exchangePriceCoins = Math.round(this.scene.state.config[currentPart - 1].grassAndWaterTerritoryCost / 100 * 30)
      const exchangePriceDiamonds = this.scene.state.config[currentPart - 1].repositoryCost
      console.log('exchangeTerritory ~ exchangePriceCoins', exchangePriceCoins)
      console.log('exchangeTerritory ~ exchangePriceDiamonds', exchangePriceDiamonds)
  
      if (this.territoryType === 5) {
        if (user.money >= exchangePriceCoins) {
          const to: string = this.scene.state.exchangeTerritory === 2 ? 'grass' : 'water';

          this.scene.state.amplitude.logAmplitudeEvent('exchange_territory', {
            block: this.block,
            position: this.position,
            from: 'repository',
            to
          });

          if (this.repository) {
            this.sellResource();
            this.repository.destroy();
          }
    
          this.territoryType = this.scene.state.exchangeTerritory;
          user.money -= exchangePriceCoins;
          this.improve = 1;
          this.volume = 1000;
          
          this.scene.tryTask(5, this.scene.state.exchangeTerritory);

          this.scene.time.addEvent({ delay: 500, callback: (): void => {
            this.changeSprite();
            Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
          }, callbackScope: this, loop: false });

        } else {
          const count: number = exchangePriceCoins - user.money;
          const diamonds: number = this.scene.convertMoney(count);
          this.openConvertor(count, diamonds, 1);
        }
        
      } else if (this.scene.state.exchangeTerritory === 5) {
        const check: boolean = this.checkExchangeRepository();
  
        if (!check) {
          let modal: Imodal = {
            type: 1,
            sysType: 3,
            height: 150,
            message: this.scene.state.lang.repCloseToFair
          }
          this.scene.state.modal = modal;
          this.scene.scene.launch('Modal', this.scene.state);
          
        } else {
  
          if (this.scene.state.user.diamonds >= exchangePriceDiamonds) {
            const from: string = this.territoryType === 2 ? 'grass' : 'water';

            this.scene.state.amplitude.logAmplitudeEvent('exchange_territory', {
              block: this.block,
              position: this.position,
              from,
              to: 'repository'
            });
  
            this.territoryType = this.scene.state.exchangeTerritory;
            this.scene.state.user.diamonds -= exchangePriceDiamonds;
            this.scene.tryTask(5, this.scene.state.exchangeTerritory);

            this.improve = 1;
            this.volume = 0;
            this.money = 0;
            this.createRepositorySprite();
            Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
          } else {
            let count: number = exchangePriceDiamonds - this.scene.state.user.diamonds
            let diamonds: number = exchangePriceDiamonds - this.scene.state.user.diamonds
            this.scene.state.convertor = { fun: 8, count, diamonds, type: 2 }
            this.scene.state.modal = { type: 1, sysType: 4 };
            this.scene.scene.stop()
            this.scene.scene.start('Modal', this.scene.state);
          }
        }

      } else if (user.money >= exchangePriceCoins) {

        const from: string = this.territoryType === 2 ? 'grass' : 'water';
        const to: string = this.scene.state.exchangeTerritory === 2 ? 'grass' : 'water';

        this.scene.state.amplitude.logAmplitudeEvent('exchange_territory', {
          block: this.block,
          position: this.position,
          from,
          to
        });
        
        this.territoryType = this.scene.state.exchangeTerritory;
        user.money -= exchangePriceCoins;
        this.improve = 1;
        this.volume = 1000;
        
        this.scene.tryTask(5, this.scene.state.exchangeTerritory);

        this.scene.time.addEvent({ delay: 500, callback: (): void => {
          this.changeSprite();
          Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
        }, callbackScope: this, loop: false });

      } else {
        const count: number = exchangePriceCoins - user.money;
        const diamonds: number = this.scene.convertMoney(count);
        this.openConvertor(count, diamonds, 1);
      }
    }
  }

  public sellResource(): void {

  }

  private checkExchangeRepository(): boolean {
    let status: boolean = true;
    if (this.block === 2 && this.position === 3) status = false;
    return status;
  }

  public changeSprite(): void {
    let farm: string = this.scene.state.farm.toLowerCase();
    if ((this.territoryType === 2 || this.territoryType === 3 || this.territoryType === 5) && !this.improveText) {
      this.createImproveText();
    }

    this.setPositionImproveText();

    if (this.improveText?.text !== String(this.improve)) {
      this.improveText?.setText(String(this.improve));
    }
  
    let sprite: string = this.texture.key;
    let stage: number = 1;
    if (this.improve >= 5) {
      stage = 2;
      if (this.improve >= 10) {
        stage = 3
        if (this.improve >= 15) {
          stage = 4
        }
      }
    }
  
    if (this.territoryType === 2) {
      sprite = `${farm}-grass${stage}-`

      if (this.volume < 250) {
        sprite += 1;
      } else if (this.volume >= 250 && this.volume < 500) {
        sprite += 2;
      } else if (this.volume >= 500 && this.volume < 750) {
        sprite += 3;
      } else if (this.volume >= 750) {
        sprite += 4;
      }
    }
  
    if (this.territoryType === 3) {
      sprite = `${farm}-water${stage}-`
  
      if (this.volume < 250) {
        sprite += 1;
      } else if (this.volume >= 250 && this.volume < 500) {
        sprite += 2;
      } else if (this.volume >= 500 && this.volume < 750) {
        sprite += 3;
      } else if (this.volume >= 750) {
        sprite += 4;
      }
    }
  
    if (this.territoryType === 5) {
      
      let max: number;
      
      if (this.scene.state.farm === 'Sheep') {
        max = this.scene.state.config[this.improve - 1].repositoryVolume
      } else if (this.scene.state.farm === 'Chicken') {
        max = this.scene.state.chickenSettings.territoriesChickenSettings[this.improve - 1].storage;
      } else if (this.scene.state.farm === 'Cow') {
        max = this.scene.state.cowSettings.cowFactorySettings[this.improve - 1].lotSize * this.scene.state.storageMultiply;
      }
      
      const percent: number = this.volume > 0 ? this.volume / (max / 100) : 0;
      sprite = `${farm}-repository-${stage}-`;

      if (percent < 25) {
        sprite += 1;
      } else if (percent >= 25 && percent < 50) {
        sprite += 2;
      } else if (percent >= 50 && percent < 75) {
        sprite += 3;
      } else {
        sprite += 4;
      }
      if (this.repository?.texture?.key !== sprite) {
        this.repository?.setTexture(sprite);
      }
    }
    
    if (this.texture?.key !== sprite && this.territoryType !== 5) {
      this.setTexture(sprite);
    } 

    
  }

  public fairLevelUp(cost: number): void {
    const fairs: IfairLevel[] = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`${this.scene.state.farm.toLowerCase()}FairLevels`];
    const user: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];
    let updateAnimalBuy: () => void;

    if (this.scene.state.farm === 'Sheep') {
      updateAnimalBuy = (): void => {
        this.scene.game.scene.keys['SheepBars'].sheepBuy.setTexture('sheep-buy-icon-' + this.scene.maxBreedForBuy());
        this.scene.game.scene.keys['SheepBars'].updateSheepPrice();
      }
    } else if (this.scene.state.farm === 'Chicken') {
      updateAnimalBuy = (): void => {
        this.scene.game.scene.keys['ChickenBars'].chickenBuy.setTexture('chicken-buy-icon-' + this.scene.maxBreedForBuy());
        this.scene.game.scene.keys['ChickenBars'].updateChickenPrice();
      }
    } else if (this.scene.state.farm === 'Cow') {
      updateAnimalBuy = (): void => {
        this.scene.game.scene.keys['CowBars'].cowBuy.setTexture('cow-buy-icon-' + this.scene.maxBreedForBuy());
        this.scene.game.scene.keys['CowBars'].updateCowPrice();
      }
    }

    if (cost) {
      if (user.money >= cost) {
        user.money -= cost;
        user.fair++;
        updateAnimalBuy();
        this.scene.tryTask(7, user.fair);
        this.scene.time.addEvent({ delay: 200, callback: (): void => {
          this.levelText?.setText(String(user.fair));
          Stars.create(this.scene, { x: this.x + 120, y: this.y + 120 });
        }, callbackScope: this, loop: false });
  
        this.scene.state.amplitude.logAmplitudeEvent('fair_up', { level: user.fair, });
  
      } else {
        const count: number = cost - user.money;
        const diamonds: number = this.scene.convertMoney(count);
        this.openConvertor(count, diamonds, 1);
      }

    } else {
      // Старое
      const nextFair = fairs.find((item: IfairLevel) => item.level === user.fair + 1);
      if (nextFair && user.fair < fairs.length) {
        if (user.part >= nextFair.part_unlock) {
          if (user.money >= nextFair.price_m && this.scene.state.user.diamonds >= nextFair.price_d) {
            user.money -= nextFair.price_m;
            this.scene.state.user.diamonds -= nextFair.price_d;
            user.fair++;
            updateAnimalBuy();
            this.scene.tryTask(7, user.fair);
            this.scene.tryTask(15, 0, nextFair.price_d);
            this.scene.time.addEvent({ delay: 200, callback: (): void => {
              this.levelText?.setText(String(user.fair));
              Stars.create(this.scene, { x: this.x + 120, y: this.y + 120 });
  
            }, callbackScope: this, loop: false });
  
            this.scene.state.amplitude.logAmplitudeEvent('fair_up', {
              level: user.fair,
            });
  
            if (nextFair.price_d > 0) {
              this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
                type: 'fair',
                count: nextFair.price_d,
              });
            }
  
          } else {
            if (this.scene.state.user.diamonds < nextFair.price_d) {
              const count: number = nextFair.price_d - this.scene.state.user.diamonds;
              this.openConvertor(count, count, 2);
            } else {
              const count: number = nextFair.price_m - user.money;
              const diamonds: number = this.scene.convertMoney(count);
              this.openConvertor(count, diamonds, 1);
            }
          }
        }
      }
    }

  }


  public improveTerritory(): void {
    let user: IuserSheep | IuserChicken | IuserCow;
    let territoriesSettings: any = [];
  
    if (this.scene.state.farm === 'Sheep') {
      user = this.scene.state.userSheep;
      territoriesSettings = this.scene.state.sheepSettings.territoriesSheepSettings;
  
    } else if (this.scene.state.farm === 'Chicken') {
      user = this.scene.state.userChicken;
      territoriesSettings = this.scene.state.chickenSettings.territoriesChickenSettings;
      
    } else if (this.scene.state.farm === 'Cow') {
      user = this.scene.state.userCow;
      territoriesSettings = this.scene.state.cowSettings.territoriesCowSettings;
    }

    const coinPrice = Math.round(this.scene.state.config[this.improve].grassAndWaterTerritoryCost / 100 * 30)
    const diamondPrice = this.scene.state.config[this.improve].repositoryCost

    if (this.scene.state.farm === 'Sheep') {
      if (this.territoryType === 5) this.diamondImprove(diamondPrice)
      else if (this.territoryType === 2 || this.territoryType === 3) this.moneyImprove(user, coinPrice)

    } else {
      // Старое улучшение
      if (this.improve < territoriesSettings.length &&
        (this.territoryType === 2 ||
        this.territoryType === 3 ||
        this.territoryType === 5)
      ) {
        const settings: IterritoriesCowSettings = territoriesSettings.find((data: any) => data.improve === this.improve + 1);
        
        if (user.part >= settings.unlock_improve) {
          if (this.territoryType === 5) {
            if (settings.improveStorageMoneyPrice) {
              this.moneyImprove(user, settings.improveStorageMoneyPrice);
            } else if (settings.improveStorageDiamondPrice) {
              this.diamondImprove(settings.improveStorageDiamondPrice);
            }
          } else if (this.territoryType === 2 || this.territoryType === 3){
            if (settings.improvePastureMoneyPrice) {
              this.moneyImprove(user, settings.improvePastureMoneyPrice);
            } else if (settings.improvePastureDiamondPrice) {
              this.diamondImprove(settings.improvePastureDiamondPrice);
            }
          }
        }
      }
    }
  }  

  private moneyImprove(user: IuserSheep | IuserChicken | IuserCow, price: number) {
    const improve: number = this.improve + 1;
    if (user.money >= price) {
  
      let territory: string;

      if (this.territoryType === 2) territory = 'grass';
      else if (this.territoryType === 3) territory = 'water';
      else if (this.territoryType === 5) territory = 'repository';

      this.scene.state.amplitude.logAmplitudeEvent('improve_territory', {
        block: this.block,
        position: this.position,
        level: improve,
        type: territory
      });

      this.improve = improve;
      user.money -= price;

      if (this.territoryType === 5) {
        this.scene.tryTask(17, improve);
        this.changeSprite();
        Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);

      } else {

        if (this.territoryType === 2) {
          this.scene.tryTask(8, improve);
        }

        if (this.territoryType === 3) {
          this.scene.tryTask(9, improve);
        }

        this.volume = 1000;

        this.scene.time.addEvent({ delay: 500, callback: (): void => {
          
          this.changeSprite();
          Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);

        }, callbackScope: this, loop: false });

      }

      this.checkAllTerritoriesIsMaxImproveLvlTask()
    
    } else {

      let count: number = price - user.money;
      let diamonds: number = this.scene.convertMoney(count);
      this.openConvertor(count, diamonds, 1);
    }
  };
  
  private diamondImprove(price: number) {
    const improve: number = this.improve + 1;
    if (this.scene.state.user.diamonds >= price) {
  
      let territory: string;

      if (this.territoryType === 2) territory = 'grass';
      else if (this.territoryType === 3) territory = 'water';
      else if (this.territoryType === 5) territory = 'repository';

      this.scene.state.amplitude.logAmplitudeEvent('improve_territory', {
        block: this.block,
        position: this.position,
        level: improve,
        type: territory
      });

      this.improve = improve;
      this.scene.state.user.diamonds -= price;
      this.scene.tryTask(15, 0, price);
      if (this.territoryType === 5) {
        this.scene.tryTask(17, improve);
        this.changeSprite();
        Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
        this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', { type: 'storage', count: price, });

      } else {
        if (this.territoryType === 2) this.scene.tryTask(8, improve);
        if (this.territoryType === 3) this.scene.tryTask(9, improve);
        this.volume = 1000;
        this.scene.time.addEvent({ delay: 500, callback: (): void => {
          this.changeSprite();
          Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
        }, callbackScope: this, loop: false });
      }

      this.checkAllTerritoriesIsMaxImproveLvlTask()

    } else {
      let count: number = price - this.scene.state.user.diamonds;
      let diamonds: number = this.scene.convertDiamonds(count);
      this.openConvertor(count, diamonds, 2);
    }
  };

  public checkAllTerritoriesIsMaxImproveLvlTask(): void {
    let part = this.scene.state[`user${this.scene.state.farm}`].part
    let availableTerritories: number = part === 20 ? 21 : part + 2
    let territories = this.scene.territories.children.entries.filter((el: SheepTerritory) => (el.territoryType === 5 || el.territoryType === 2 || el.territoryType === 3) && el.improve === part)
    this.scene.tryTask(27, availableTerritories, 0, territories.length)
  }

  private createFullStorageAnim(): void {    
    this.repositoryAnim = this.scene.tweens.add({
      targets: [this.improveText, this.repository],
      y: '-=5',
      yoyo: true,
      duration: 250,
      repeat: -1,
    })
  }

  private checkAndSetRepositoryAnim(): void {
    if (this.territoryType === 5) {
      let max: number = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`territories${this.scene.state.farm}Settings`].find(data => data.improve === this.improve).storage;
      if (this.scene.state.farm === 'Sheep') {
        max = this.scene.state.config[this.improve - 1].repositoryVolume
      } else if (this.scene.state.farm === 'Cow') {
        max = this.scene.state.cowSettings.cowFactorySettings.find(data => data.improve === this.improve).lotSize * this.scene.state.storageMultiply;
      }
      if (this.volume >= max && !this.repositoryAnim) {
        this.createFullStorageAnim();
      } else if (this.volume < max && this.repositoryAnim) {
        this.repository.setPosition(this.x + 120, this.y + 240);
        this.repositoryAnim.remove();
        this.repositoryAnim = null;
      }
    }
  }

  public preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    this.checkAndSetRepositoryAnim();
  }
}