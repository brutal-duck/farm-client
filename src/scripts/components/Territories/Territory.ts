import Cow from './../../scenes/Cow/Main';
import CowSprite from './../Animal/CowSprite';
import Cave from './../gameObjects/Cave';
import Firework from './../animations/Firework';
import Stars from './../animations/Stars';

export default class Territory extends Phaser.Physics.Arcade.Sprite {
  public scene: Cow;
  public _id: string;
  public block: number;
  public position: number;
  public territoryType: number; 
  public volume: number;
  public improve: number;
  public money: number;
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

  // тип территории 6
  public house: Phaser.GameObjects.Sprite;

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
    this.setListeners();
    if (this.territoryType === 2 || this.territoryType === 3 || this.territoryType === 5) {
      this.createImproveText();
    }
  }

  private createImproveText(): void {
    this.improveText = this.scene.add.text(this.x + 40, this.y + 30, String(this.improve), {
      font: '26px Shadow',
      color: '#ECDFDF',
    }).setStroke('#000000', 3).setDepth(this.depth + 2).setOrigin(0.5);
  }

  public createBorders(topBorder: number, bottomBorder: number): void {
    this.borderTop = this.scene.add.sprite(this.x, this.y + 15, `cow-horizontal-border-${topBorder}`)
    .setOrigin(0, 1)
    .setDepth(this.y)
    .setVisible(false);
  
    this.borderLeft = this.scene.add.sprite(this.x, this.y, 'cow-vertical-border')
      .setOrigin(0, 0)
      .setDepth(this.y)
      .setVisible(false);

    this.borderRight = this.scene.add.sprite(this.x + 240, this.y, 'cow-vertical-border')
      .setOrigin(1, 0)
      .setDepth(this.y)
      .setVisible(false);

    this.borderBottom = this.scene.add.sprite(this.x, this.y + 240, `cow-horizontal-border-${bottomBorder}`)
      .setOrigin(0, 1)
      .setDepth(this.y + 240)
      .setVisible(false);
  }

  public createForest(forest: number): void {
    if (this.territoryType === 0) {
      let unlock: number = this.scene.state.cowSettings.territoriesCowPrice.find((data: IterritoriesPrice) => data.block === this.block && data.position === this.position).unlock;

      this.forest = this.scene.add.sprite(this.x + 120, this.y + 240, `cow-forest-${forest}`)
        .setOrigin(0.5, 1)
        .setDepth(this.y + 1);

      if (unlock > this.scene.state.userCow.part) {

        this.lock_image = this.scene.add.sprite(this.x + 120, this.y + 120, 'lock-territory').setDepth(this.y + 2);
        this.lock_text = this.scene.add.text(this.x + 120, this.y + 120 - 37, this.scene.state.lang.part + ' ' + unlock, {
          font: '26px Shadow',
          color: '#ECDFDF'
        }).setOrigin(0.5, 0.5).setDepth(this.y + 2);
      }
    }
  }

  public createMetgingZone(): void {
    if (this.territoryType === 4) {

      this.merging = [];
      this.mergingCounter = 0;
      // this.y += 16
      // this.scaleY = 0.94

      this.scene.add.sprite(this.x, this.y - 35, 'cow-tent').setDepth(this.y).setOrigin(0, 0);
      
      let topZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 120, this.y + 45, 300, 145).setDropZone(undefined, () => {});
      topZone.type = 'top';

      // let graphics1 = this.add.graphics().setDepth(territory.y * 5);
      // graphics1.lineStyle(2, 0xffff00);
      // graphics1.strokeRect(topZone.x - topZone.input.hitArea.width / 2, topZone.y - topZone.input.hitArea.height / 2, topZone.input.hitArea.width, topZone.input.hitArea.height);

      
      let bottomZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.x + 120, this.y + 190, 300, 145).setDropZone(undefined, () => {});
      bottomZone.type = 'bottom';
      
      // let graphics2 = this.add.graphics().setDepth(territory.y * 5);
      // graphics2.lineStyle(2, 0x00ff00);
      // graphics2.strokeRect(bottomZone.x - bottomZone.input.hitArea.width / 2, bottomZone.y - bottomZone.input.hitArea.height / 2, bottomZone.input.hitArea.width, bottomZone.input.hitArea.height);

      this.levelText = this.scene.add.text(this.x + 47, this.y + 196, String(this.scene.state.userCow.fair), {
        font: '34px Shadow',
        color: '#df870a'
      }).setOrigin(0.5, 0.5).setDepth(this.y);
      
    }
  }

  public createRepositorySprite(): void {
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
    if (this.territoryType === 5) {
      
      let percent: number = 0;
      let max: number = this.scene.state.cowSettings.territoriesCowSettings[this.improve - 1].storage;
      let type: string = `cow-repository-${stage}-`;

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

    }
  }

  public createHouseSprite(): void {
    if (this.territoryType === 6) {
      this.scene.house = this.scene.add.sprite(this.x + 120, this.y + 240, `${this.scene.state.farm.toLowerCase()}-house-sprite`)
        .setOrigin(0.5, 1)
        .setDepth(this.y);
    }
  }

  public createCave(): void {
    if (this.territoryType === 7) {
      Cave.create(this.scene, { x: this.x + 120, y: this.y + 240 });
    }
  }

  private setListeners(): void {
    this.scene.clickTerritory(this, (): void => {
      if (this.territoryType !== 6 && this.territoryType !== 7) {
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
        }
      } else if (this.territoryType === 7) {
        this.scene.takeDiamondCow();
      }
    });
  }

  // покупка земли
  public buyTerritory(): void {
    const user: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];
    const settings: IterritoriesPrice = this.scene.state.cowSettings.territoriesCowPrice.find((data: IterritoriesPrice) => data.block === this.block && data.position === this.position);


    if (user.part >= settings.unlock && this.territoryType === 0) {
      // 70% от суммы покупки
      const price = Math.round((settings.price / 100) * 70);

      if (user.money >= price) {
        this.scene.state.amplitude.getInstance().logEvent('buy_territory', {
          block: this.block,
          position: this.position,
          farm_id: this.scene.state.farm
        });

        this.territoryType = 1;
        user.money -= price;
        this.scene.tryTask(5, 1);

        this.scene.time.addEvent({ delay: 500, callback: (): void => {
          this.forest?.destroy();
          this.setTexture(this.scene.state.farm.toLowerCase() + '-bought');
          Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 3);
          this.scene.buildBorders();
        }, callbackScope: this, loop: false });

      } else {

        const count: number = price - user.money;
        const diamonds: number = this.scene.convertMoney(count);
        this.openConvertor(count, diamonds, 6, 1);
      }
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
      
      const settings: IterritoriesCowSettings = territoriesSettings.find((data: IterritoriesCowSettings) => data.improve === 2);
  
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

            this.scene.state.amplitude.getInstance().logEvent('exchange_territory', {
              block: this.block,
              position: this.position,
              farm_id: this.scene.state.farm,
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
    
          this.scene.state.amplitude.getInstance().logEvent('exchange_territory', {
            block: this.block,
            position: this.position,
            farm_id: this.scene.state.farm,
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
    if (this.improveText?.text !== String(this.improve)) {
      this.improveText?.setText(String(this.improve));
    }
  }

  // улучшение ярмарки
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

          this.scene.state.amplitude.getInstance().logEvent('fair_up', {
            level: user.fair,
            farm_id: this.scene.state.farm
          });

          if (nextFair.price_d > 0) {

            this.scene.state.amplitude.getInstance().logEvent('diamonds_spent', {
              type: 'fair',
              count: nextFair.price_d,
              farm_id: this.scene.state.farm,
              chapter: this.scene.state[`user${this.scene.state.farm}`].part,
            });

          }

        } else {
          if (this.scene.state.user.diamonds < nextFair.price_d) {
            let count: number = nextFair.price_d - this.scene.state.user.diamonds;
            this.openConvertor(count, count, 2, 2);
          } else {
            let count: number = nextFair.price_m - user.money;
            let diamonds: number = this.scene.convertMoney(count);
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

      this.scene.state.amplitude.getInstance().logEvent('improve_territory', {
        block: this.block,
        position: this.position,
        farm_id: this.scene.state.farm,
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

      this.scene.state.amplitude.getInstance().logEvent('improve_territory', {
        block: this.block,
        position: this.position,
        farm_id: this.scene.state.farm,
        level: improve,
        type: territory
      });

      this.improve = improve;
      this.scene.state.user.diamonds -= price;

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
}