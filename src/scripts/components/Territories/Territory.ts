import Cow from './../../scenes/Cow/Main';
import CowSprite from './../Animal/CowSprite';
import Cave from './../gameObjects/Cave';
import Firework from './../animations/Firework';
import Stars from './../animations/Stars';
import Factory from './Factory';
import SpeechBubble from './../animations/SpeechBuble';
import CooldownSprite from './CooldownSprite';

export default class Territory extends Phaser.Physics.Arcade.Sprite {
  public scene: Cow;
  public _id: string;
  public block: number;
  public position: number;
  public territoryType: number; 
  public volume: number;
  public improve: number;
  public money: number;
  public cooldown: number;
  public bought: boolean;
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
  public factory: Factory;

  public cooldownSprite: CooldownSprite;


  constructor(scene: Cow, x: number, y: number, type: string, data: Iterritories) {
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
    this.createElements();
    this.setListeners();
  }

  private createElements(): void {
    if (this.territoryType === 2 || this.territoryType === 3 || this.territoryType === 5 || this.territoryType === 8) {
      this.createImproveText();
    }
    if (this.territoryType === 4) {
      this.createMetgingZone();
    } else if (this.territoryType === 5) {
      this.createRepositorySprite();
    } else if (this.territoryType === 6) {
      this.createHouseSprite();
    } else if (this.territoryType === 7) {
      this.createCave();
    } else if (this.territoryType === 8) {
      this.createFactorySprite();
    }
  }

  private createImproveText(): void {
    this.improveText = this.scene.add.text(this.x + 38, this.y + 24, String(this.improve), {
      font: '26px Shadow',
      color: '#ffe571',
    }).setStroke('#000000', 1).setDepth(this.depth + 2).setOrigin(0.5);
  }

  public createBorders(topBorder: number, bottomBorder: number): void {
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

  private createMetgingZone(): void {
    const farm: string = this.scene.state.farm.toLowerCase();
    const fairLevel: string = String(this.scene.state[`user${this.scene.state.farm}`].fair);

    this.merging = [];
    this.mergingCounter = 0;
    this.scene.add.sprite(this.x, this.y - 35, `${farm}-tent`).setDepth(this.y).setOrigin(0, 0);
    
    let topZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 120, this.y + 45, 300, 145).setDropZone(undefined, () => {});
    topZone.type = 'top';
    // let graphics1 = this.add.graphics().setDepth(territory.y * 5);
    // graphics1.lineStyle(2, 0xffff00);
    // graphics1.strokeRect(topZone.x - topZone.input.hitArea.width / 2, topZone.y - topZone.input.hitArea.height / 2, topZone.input.hitArea.width, topZoneinput.hitArea.height);
    
    let bottomZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 120, this.y + 190, 300, 145).setDropZone(undefined, () => {});
    bottomZone.type = 'bottom';
    
    // let graphics2 = this.add.graphics().setDepth(territory.y * 5);
    // graphics2.lineStyle(2, 0x00ff00);
    // graphics2.strokeRect(bottomZone.x - bottomZone.input.hitArea.width / 2, bottomZone.y - bottomZone.input.hitArea.height / 2, bottomZone.input.hitAreawidth, bottomZone.input.hitArea.height);
    this.levelText = this.scene.add.text(this.x + 47, this.y + 196, fairLevel, {
      font: '34px Shadow',
      color: '#df870a'
    }).setOrigin(0.5, 0.5).setDepth(this.y);
  }

  private createRepositorySprite(): void {
    const farm: string = this.scene.state.farm.toLowerCase();
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
    let max: number = this.scene.state.cowSettings.territoriesCowSettings[this.improve - 1].storage;
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

  private setPositionImproveText(): void {
    if (this.territoryType === 5) {
      const position: Iposition = {
        x: this.improveText?.x,
        y: this.improveText?.y,
      };
  
      if (this.improve < 5) {
        position.x = this.x + 127;
        position.y = this.y + 125;
      } else if (this.improve < 10) {
        position.x = this.x + 87;
        position.y = this.y + 140;
      } else if (this.improve < 15) {
        position.x = this.x + 168;
        position.y = this.y + 138;
      } else {
        position.x = this.x + 130;
        position.y = this.y + 140;
      }
      if (this.improveText.x !== position.x || this.improveText.y !== position.y) {
        this.improveText.setPosition(position.x, position.y);
        this.improveText.setStyle({ fontSize: '32px' });
        this.improveText.setDepth(this.repository.depth + 1);
      }
    } else if (this.territoryType === 2 || this.territoryType === 3){
      const position: Iposition = {
        x: this.x + 38,
        y: this.y + 24,
      };
  
      if (this.improveText.x !== position.x || this.improveText.y !== position.y) {
        this.improveText
          .setPosition(position.x, position.y)
          .setStyle({ fontSize: '26px' })
          .setDepth(this.depth + 2);
      }
    }
  }

  private createHouseSprite(): void {
    this.scene.house = this.scene.add.sprite(this.x + 120, this.y + 240, `${this.scene.state.farm.toLowerCase()}-house-sprite`)
      .setOrigin(0.5, 1)
      .setDepth(this.y + 1);
  }

  private createCave(): void {
    Cave.create(this.scene, { x: this.x + 120, y: this.y + 240 });
  }

  private createFactorySprite(): void {
    this.factory = new Factory(this.scene, this.x + 120, this.y + 85, this.improve);
    this.factory.setDepth(this.y + 1);
    this.improveText.setPosition(this.x + 187, this.y + 97);
    this.improveText.setStyle({ fontSize: '32px' });

  }

  private setListeners(): void {
    this.scene.clickTerritory(this, (): void => {
      if (this.cooldown > 0) {
        let modal: Imodal = {
          type: 1,
          sysType: 19,
        }
        this.scene.state.territory = this;
        this.scene.state.modal = modal;
        this.scene.scene.launch('Modal', this.scene.state);
        return;
      };

      if (this.territoryType !== 6 && this.territoryType !== 7 && this.territoryType !== 8) {
        const modal: Imodal = {
          type: 1,
          sysType: 2
        }
        this.scene.state.modal = modal;
        this.scene.state.territory = this;
        this.scene.scene.launch('Modal', this.scene.state);
      } else if (this.territoryType === 6) {
        if (this.scene.state[`user${this.scene.state.farm}`].collectorLevel < this.scene.state[`${this.scene.state.farm.toLowerCase()}CollectorSettings`].length) {
          this.scene.showImproveCollector();
        } else {
          SpeechBubble.create(this.scene.game.scene.keys[`${this.scene.state.farm}Bars`], this.scene.state.lang.maxCollectorLevel, 3);
        }
      } else if (this.territoryType === 7) {
        this.scene.takeDiamondCow();
      } else if (this.territoryType === 8) {
        const modal: Imodal = {
          type: 13,
        }
        this.scene.state.modal = modal;
        this.scene.state.territory = this;
        this.scene.scene.launch('Modal', this.scene.state);
      }
    });
  }

  public buyTerritory(): void {
    const farm: string = this.scene.state.farm.toLowerCase();
    const user: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];
    const territoriesPrice: IterritoriesPrice[] = this.scene.state[`${farm}Settings`][`territories${this.scene.state.farm}Price`];
    const settings: IterritoriesPrice = territoriesPrice.find((data: IterritoriesPrice) => data.block === this.block && data.position === this.position);

    if (user.part >= settings.unlock && this.territoryType === 0) {
      // 70% от суммы покупки
      const price = Math.round((settings.price / 100) * 70);

      if (user.money >= price) {
        this.scene.logAmplitudeEvent('buy_territory', {
          block: this.block,
          position: this.position,
        });

        user.money -= price;
        this.setTerritoryUnlockCooldown();
      } else {
        const count: number = price - user.money;
        const diamonds: number = this.scene.convertMoney(count);
        this.openConvertor(count, diamonds, 6, 1);
      }
    }
  }


  private setTerritoryUnlockCooldown(): void {
    const settings: IterritoriesPrice = this.scene.state.cowSettings.territoriesCowPrice
      .find((el: IterritoriesPrice) => el.block === this.block && el.position === this.position);
    
    this.cooldown = settings.unlockCooldown;
    this.bought = true;
    this.cooldownSprite = new CooldownSprite(this);
  }
  
  public unlockTerritory(): void {
    if (this.bought && this.cooldown <= 0 && this.territoryType === 0) {
      this.territoryType = 1;
      this.scene.tryTask(5, 1);
      this.scene.time.addEvent({ delay: 500, callback: (): void => {
        this.forest?.destroy();
        this.setTexture(this.scene.state.farm.toLowerCase() + '-bought');
        Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
        this.scene.buildBorders();
      }, callbackScope: this, loop: false });
    }
  }

  private openConvertor(count: number, diamonds: number, fun: number, type: number): void {
    
    this.scene.state.convertor = {
      fun: fun,
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
    
    const user: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];
    let farm: string = this.scene.state.farm.toLowerCase();
    let territoriesSettings: IterritoriesCowSettings[] = this.scene.state[`${farm}Settings`][`territories${this.scene.state.farm}Settings`]
    let sell: any;
  
    if (this.scene.state.farm === 'Sheep') {
      //@ts-ignore
      sell = (): void => this.scene.sellWool();
    } else if (this.scene.state.farm === 'Chicken') {
      //@ts-ignore
      sell = (): void => this.scene.sellEggs();
    } else if (this.scene.state.farm === 'Cow') {
      sell = (): void => this.scene.sellMilk();
    }
  
    if (this.scene.state.exchangeTerritory === 2 ||
      this.scene.state.exchangeTerritory === 3 ||
      this.scene.state.exchangeTerritory === 5) {
      
      const settings: IterritoriesCowSettings = territoriesSettings.find(data => data.improve === 2);
  
      if (this.scene.state.exchangeTerritory === 5) {
  
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
  
          if (user.money >= settings.improvePastureMoneyPrice) {
  
            let from: string;
  
            if (this.territoryType === 2) from = 'grass';
            else if (this.territoryType === 3) from = 'water';
            else if (this.territoryType === 5) from = 'repository';
            
            const to: string = 'repository';

            this.scene.logAmplitudeEvent('exchange_territory', {
              block: this.block,
              position: this.position,
              from: from,
              to: to
            });
  
            this.territoryType = this.scene.state.exchangeTerritory;
            user.money -= settings.improvePastureMoneyPrice;
            this.improve = 1;
            this.volume = 0;
            this.money = 0;
            let x: number = this.x + 120;
            let y: number = this.y + 240;
    
            this.scene.tryTask(5, this.scene.state.exchangeTerritory);
  
            this.setTexture(farm + '-repository');
            this.repository = this.scene.add.sprite(x, y, farm + '-repository-1-1')
              .setDepth(this.y + 1)
              .setOrigin(0.5, 1);
            Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
    
          } else {
            let count: number = settings.improvePastureMoneyPrice - user.money;
            let diamonds: number = this.scene.convertMoney(count);
            this.openConvertor(count, diamonds, 6, 1);
          }
  
        }
  
      } else {
        
        if (user.money >= settings.improvePastureMoneyPrice) {
  
          let from: string;
  
          if (this.territoryType === 2) from = 'grass';
          else if (this.territoryType === 3) from = 'water';
          else if (this.territoryType === 5) from = 'repository';
          
          let to: string;
  
          if (this.scene.state.exchangeTerritory === 2) to = 'grass';
          else if (this.scene.state.exchangeTerritory === 3) to = 'water';
          else if (this.scene.state.exchangeTerritory === 5) to = 'repository';
    
          this.scene.logAmplitudeEvent('exchange_territory', {
            block: this.block,
            position: this.position,
            from: from,
            to: to
          });
  
          if (this.territoryType === 5 && this.repository) {
            sell();
            this.repository.destroy();
          }
    
          this.territoryType = this.scene.state.exchangeTerritory;
          user.money -= settings.improvePastureMoneyPrice;
          this.improve = 1;
          this.volume = 1000;
          
          this.scene.tryTask(5, this.scene.state.exchangeTerritory);
  
          this.scene.time.addEvent({ delay: 500, callback: (): void => {
            this.changeSprite();
            Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
          }, callbackScope: this, loop: false });
  
        } else {
          const count: number = settings.improvePastureMoneyPrice - user.money;
          const diamonds: number = this.scene.convertMoney(count);
          this.openConvertor(count, diamonds, 6, 1);
        }
      }
    }
  }

  public checkExchangeRepository(): boolean {
    let status: boolean = true;
    if (this.block === 2 && this.position === 3) status = false;
    return status;
  }

  public changeSprite(): void {
    let farm: string = this.scene.state.farm.toLowerCase();
    if ((this.territoryType === 2 || this.territoryType === 3 || this.territoryType === 5) && ! this.improveText) {
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

      if (this.volume < 200) {
        sprite += 1;
      } else if (this.volume >= 200 && this.volume < 400) {
        sprite += 2;
      } else if (this.volume >= 400 && this.volume < 600) {
        sprite += 3;
      } else if (this.volume >= 600 && this.volume < 800) {
        sprite += 4;
      } else if (this.volume >= 800) {
        sprite += 5;
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
        max = this.scene.state.sheepSettings.territoriesSheepSettings[this.improve - 1].woolStorage;
      } else if (this.scene.state.farm === 'Chicken') {
        max = this.scene.state.chickenSettings.territoriesChickenSettings[this.improve - 1].eggStorage;
      } else if (this.scene.state.farm === 'Cow') {
        max = this.scene.state.cowSettings.territoriesCowSettings[this.improve - 1].storage;
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
      if (this.repository.texture.key !== sprite) {
        this.repository.setTexture(sprite);
      }
    }
    
    if (this.texture.key !== sprite && this.territoryType !== 5) {
      this.setTexture(sprite);
    } 

    
  }

  public fairLevelUp(): void {

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

          this.scene.logAmplitudeEvent('fair_up', {
            level: user.fair,
          });

          if (nextFair.price_d > 0) {
            this.scene.logAmplitudeEvent('diamonds_spent', {
              type: 'fair',
              count: nextFair.price_d,
            });
          }

        } else {
          if (this.scene.state.user.diamonds < nextFair.price_d) {
            const count: number = nextFair.price_d - this.scene.state.user.diamonds;
            this.openConvertor(count, count, 2, 2);
          } else {
            const count: number = nextFair.price_m - user.money;
            const diamonds: number = this.scene.convertMoney(count);
            this.openConvertor(count, diamonds, 2, 1);
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
  
    if (this.improve < territoriesSettings.length &&
      (this.territoryType === 2 ||
      this.territoryType === 3 ||
      this.territoryType === 5)) {
  
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

  private moneyImprove(user: IuserSheep | IuserChicken | IuserCow, price: number) {
    const improve: number = this.improve + 1;
    if (user.money >= price) {
  
      let territory: string;

      if (this.territoryType === 2) territory = 'grass';
      else if (this.territoryType === 3) territory = 'water';
      else if (this.territoryType === 5) territory = 'repository';

      this.scene.logAmplitudeEvent('improve_territory', {
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
    
    } else {

      let count: number = price - user.money;
      let diamonds: number = this.scene.convertMoney(count);
      this.openConvertor(count, diamonds, 3, 1);
    }
  };
  
  private diamondImprove(price: number) {
    const improve: number = this.improve + 1;
    if (this.scene.state.user.diamonds >= price) {
  
      let territory: string;

      if (this.territoryType === 2) territory = 'grass';
      else if (this.territoryType === 3) territory = 'water';
      else if (this.territoryType === 5) territory = 'repository';

      this.scene.logAmplitudeEvent('improve_territory', {
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
    } else {
      let count: number = price - this.scene.state.user.diamonds;
      let diamonds: number = this.scene.convertDiamonds(count);
      this.openConvertor(count, diamonds, 3, 1);
    }
  };

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
      const max: number = this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`territories${this.scene.state.farm}Settings`]
        .find(data => data.improve === this.improve).storage * 0.9;
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

  public improveFactory(): void {
    const settings: IfactorySettings[] = this.scene.state.cowSettings.cowFactorySettings;
    const user: IuserCow = this.scene.state.userCow;

    const nextImprove = settings.find((item: IfactorySettings) => item.improve === this.improve + 1);
    if (nextImprove && this.improve < settings.length) {
      if (user.part >= nextImprove.unlock_improve) {
        if (user.money >= nextImprove.improveMoneyPrice && this.scene.state.user.diamonds >= nextImprove.improveDiamondPrice) {
          user.money -= nextImprove.improveMoneyPrice;
          this.scene.state.user.diamonds -= nextImprove.improveDiamondPrice;
          this.improve += 1;
          this.factory.improve += 1;
          this.factory.settings = nextImprove;
          this.scene.time.addEvent({ delay: 200, callback: (): void => {
            this.improveText?.setText(String(this.improve));
            Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 5);

          }, callbackScope: this, loop: false });

          this.scene.logAmplitudeEvent('factory_up', {
            level: this.factory.improve,
          });

          if (nextImprove.improveDiamondPrice > 0) {
            this.scene.logAmplitudeEvent('diamonds_spent', {
              type: 'factory',
              count: nextImprove.improveDiamondPrice,
            });
            this.scene.tryTask(15, 0, nextImprove.improveDiamondPrice);
          }
          this.scene.game.scene.keys['Modal'].scene.stop();
          this.scene.tryTask(24, this.factory.improve);
        } else {
          if (this.scene.state.user.diamonds < nextImprove.improveDiamondPrice) {
            const count: number = nextImprove.improveDiamondPrice - this.scene.state.user.diamonds;
            this.openConvertor(count, count, 2, 2);
          } else {
            const count: number = nextImprove.improveMoneyPrice - user.money;
            const diamonds: number = this.scene.convertMoney(count);
            this.openConvertor(count, diamonds, 2, 1);
          }
        }
      }
    }
  }


  public productionOfProducts(): void {
    let resourceAmount: number = 0;
    if (this.territoryType === 8) {
      if (this.factory.productionTimer <= 0) {
        this.endProduction();
        const storages: Territory[] = this.scene.territories.children.entries.filter((data: Territory) => data.territoryType === 5) as Territory[];
        
        storages.forEach((storage: Territory) => {
          resourceAmount += storage.volume;
        });

        if (resourceAmount >= this.factory.settings.lotSize) {
          this.factory.productionTimer = this.factory.settings.processingTime;
          let lot: number = this.factory.settings.lotSize;
          for (let i in storages) {
            const storage: Territory = storages[i];
            if (storage.volume > lot) {
              storage.volume -= lot;
              lot = 0;
            } else {
              lot -= storage.volume;
              storage.volume = 0;
            }
          }
          this.startProduction();
        } else {
          console.log('Not enough milk for production');
        }
      } else {
        this.factory.productionTimer -= 1;
      }
    }
  }
  
  private startProduction(): void {
    const productId = this.getRandomProductId();
    if (productId) {
      this.factory.currentProduction = productId;
    } else {
      this.startProduction();
    }
  }

  private endProduction(): void {
    if (this.factory.currentProduction) {
      const multiply: number = this.scene.state.userCow.factory[`production${this.factory.currentProduction}Multiply`];
      this.factory[`production${this.factory.currentProduction}Money`] += this.factory.settings.lotSize * multiply;
      this.factory.money += this.factory.settings.lotSize * multiply;
      this.factory.currentProduction = undefined;
    }
  }

  public getRandomProductId(): number {
    const pull: number[] = [ this.factory.settings.production1Percent, this.factory.settings.production2Percent, this.factory.settings.production3Percent ];
    if (this.scene.state.userCow.factory.boostTime > 0) pull.push(this.factory.settings.production4Percent);

    const totalCounter: number = pull.reduce((prev, current) => prev += current);
    const arrRange: {
      id: number,
      bottom: number,
      top: number
    }[] = [];

    let current: number = 0;
    let previos: number = 0;
    for (let i: number = 0; i < pull.length; i += 1) {
      if (pull[i] !== 0) {
        current = pull[i] + previos;
        arrRange.push({
          id: i + 1, 
          bottom: previos, 
          top: current 
        })
        previos = current;
      }
    }

    const randomIndex: number = Phaser.Math.Between(1, totalCounter);
    let productId: number;

    for (let i: number = 0; i < arrRange.length; i += 1) {
      if (arrRange[i].bottom < randomIndex && arrRange[i].top >= randomIndex) {
        productId = arrRange[i].id;
      }
    }
    return productId;
  }


  public sellProducts(): void {
    if (this.territoryType === 8 && this.factory.money > 0) {
      this.scene.tryTask(20, 0);

      this.scene.state.userCow.money += this.factory.money;
      this.factory.money = 0;
      this.factory.production1Money = 0;
      this.factory.production2Money = 0;
      this.factory.production3Money = 0;
      this.factory.production4Money = 0;
      
      this.scene.game.scene.keys['CowBars'].plusMoneyAnimation({
        x: this.x + 120,
        y: this.y + 120
      });
    }
  }
}