import { shortNum, shortTime } from '../../general/basic';
import Factory from './../Territories/Factory';
import Modal from './../../scenes/Modal/Modal';

export default class ShowCaseWindow {
  public scene: Modal;
  public state: Istate;
  private factoryBoostTimer: Phaser.GameObjects.Text;
  private startY: number;
  private factory: Factory;
  private probability1text: Phaser.GameObjects.Text;
  private probability1count: Phaser.GameObjects.Text;
  private probability2text: Phaser.GameObjects.Text;
  private probability2count: Phaser.GameObjects.Text;
  private probability3text: Phaser.GameObjects.Text;
  private probability3count: Phaser.GameObjects.Text;
  private probability4text: Phaser.GameObjects.Text;
  private probability4count: Phaser.GameObjects.Text;
  private price1text: Phaser.GameObjects.Text;
  private price1count: Phaser.GameObjects.Text;
  private price2text: Phaser.GameObjects.Text;
  private price2count: Phaser.GameObjects.Text;
  private price3text: Phaser.GameObjects.Text;
  private price3count: Phaser.GameObjects.Text;
  private price4text: Phaser.GameObjects.Text;
  private price4count: Phaser.GameObjects.Text;
  private coin4: Phaser.GameObjects.Sprite;
  private boostText: Phaser.GameObjects.Text;
  private sprite1: Phaser.GameObjects.Sprite;
  private sprite2: Phaser.GameObjects.Sprite;
  private sprite3: Phaser.GameObjects.Sprite;
  private sprite4: Phaser.GameObjects.Sprite;
  private buyBoostBtn: any;
  private multiplyTime: number;
  private price: number;
  private progressBar: Phaser.GameObjects.TileSprite;
  private progressBarBg: Phaser.GameObjects.Sprite;

  constructor(scene: Modal){
    this.scene = scene;
    this.state = scene.state;
    this.startY = this.scene.cameras.main.centerY - 280;
    this.factory = this.state.territory.factory;
    this.multiplyTime = 1;
    if (this.state.userCow.factory.boostTime > 0) this.multiplyTime = 2;
    this.price = 25;
    this.create();
    this.setListeners();
  }

  private create(): void {

    this.scene.textHeader.setText(this.state.lang.showCase);

    this.create1Production();
    this.create2Production();
    this.create3Production();

    this.createBoost();
  

    this.scene.resizeWindow(720);
  }

  private create1Production(): void {

    const productPercents: number[] = this.factory.getPercent();
    const product1Percent: number = productPercents[0];

    this.sprite1 = this.scene.add.sprite(160, this.startY + 50, `factory-production-1`);
    const spriteGeom: Phaser.Geom.Rectangle = this.sprite1.getBounds();

    this.scene.add.text(this.scene.cameras.main.centerX, spriteGeom.top, this.state.lang.production1, {
      font: '28px Bip',
      color: '#925C28',
      wordWrap: { width: 300 },
      align: 'center',
    }).setOrigin(0.5, 1);

    this.probability1text = this.scene.add.text(spriteGeom.right + 30, spriteGeom.centerY - 15, `${this.state.lang.probabilityOfProduction}:`, {
      font: '20px Bip',
      color: '#925C28',
      wordWrap: { width: 400 },
      align: 'left',
    }).setOrigin(0, 0.5);

    const probability1textGeom: Phaser.Geom.Rectangle = this.probability1text.getBounds();

    this.probability1count = this.scene.add.text(probability1textGeom.right + 5, this.probability1text.y, `${product1Percent}%`, {
      font: '20px Bip',
      color: '#57A90E',
      wordWrap: { width: 400 },
      align: 'left',
    }).setOrigin(0, 0.5);

    this.price1text = this.scene.add.text(spriteGeom.right + 30, spriteGeom.centerY + 15, `${this.state.lang.price}`, {
      font: '20px Bip',
      color: '#925C28',
      wordWrap: { width: 400 },
      align: 'left',
    }).setOrigin(0, 0.5);

    const priceGeom: Phaser.Geom.Rectangle = this.price1text.getBounds();
    const coin: Phaser.GameObjects.Sprite = this.scene.add.sprite(priceGeom.right, priceGeom.centerY, 'cowCoin').setScale(0.11).setOrigin(0, 0.5);


    this.price1count = this.scene.add.text(priceGeom.right + 35, priceGeom.centerY, `${shortNum(this.state.userCow.factory.production1Multiply * this.factory.settings.lotSize)}`, {
      font: '20px Bip',
      color: '#57A90E',
      wordWrap: { width: 400 },
      align: 'left',
    }).setOrigin(0, 0.5);
  }

  private create2Production(): void {

    const productPercents: number[] = this.factory.getPercent();
    const productPercent: number = productPercents[1];
    
    this.scene.add.text(this.scene.cameras.main.centerX, this.startY + 120, this.state.lang.production2, {
      font: '28px Bip',
      color: '#925C28',
      wordWrap: { width: 400 },
      align: 'center',
    }).setOrigin(0.5);
    this.sprite2 = this.scene.add.sprite(160, this.startY + 50 + 120, `factory-production-2`);

    const spriteGeom: Phaser.Geom.Rectangle = this.sprite2.getBounds();

    const level: number = this.state.cowSettings.cowFactorySettings.find(el => el.production2Percent > 0).improve;

    if (this.factory.improve >= level) {
      this.probability2text = this.scene.add.text(spriteGeom.right + 30, spriteGeom.centerY - 15, `${this.state.lang.probabilityOfProduction}:`, {
        font: '20px Bip',
        color: '#925C28',
        wordWrap: { width: 400 },
        align: 'left',
      }).setOrigin(0, 0.5);
  
      this.probability2count = this.scene.add.text(this.probability2text.getBounds().right + 5, this.probability2text.y, `${productPercent}%`, {
        font: '20px Bip',
        color: '#57A90E',
        wordWrap: { width: 400 },
        align: 'left',
      }).setOrigin(0, 0.5);
  
      this.price2text = this.scene.add.text(spriteGeom.right + 30, spriteGeom.centerY + 15, `${this.state.lang.price}`, {
        font: '20px Bip',
        color: '#925C28',
        wordWrap: { width: 400 },
        align: 'left',
      }).setOrigin(0, 0.5);
  
      const priceGeom: Phaser.Geom.Rectangle = this.price2text.getBounds();
      const coin: Phaser.GameObjects.Sprite = this.scene.add.sprite(priceGeom.right, priceGeom.centerY, 'cowCoin').setScale(0.11).setOrigin(0, 0.5);
  
      this.price2count = this.scene.add.text(priceGeom.right + 35, priceGeom.centerY, `${shortNum(this.state.userCow.factory.production2Multiply * this.factory.settings.lotSize)}`, {
        font: '20px Bip',
        color: '#57A90E',
        wordWrap: { width: 400 },
        align: 'left',
      }).setOrigin(0, 0.5);
    } else {
      this.sprite2.setTint(0x777777);
      const text: string = this.state.lang.openProductionOnLevel.replace('$1', String(level));
      this.scene.add.text(spriteGeom.right + 30, spriteGeom.centerY, text, {
        font: '20px Bip',
        color: '#595959',
        wordWrap: { width: 300 },
        align: 'left',
      }).setOrigin(0, 0.5);
    }


  }

  private create3Production(): void {

    const productPercents: number[] = this.factory.getPercent();
    const productPercent: number = productPercents[2];
    
    this.sprite3 = this.scene.add.sprite(160, this.startY + 50 + 240, `factory-production-3`);
    const spriteGeom: Phaser.Geom.Rectangle = this.sprite3.getBounds();

    this.scene.add.text(this.scene.cameras.main.centerX, spriteGeom.centerY - 50, this.state.lang.production3, {
      font: '28px Bip',
      color: '#925C28',
      wordWrap: { width: 400 },
      align: 'center',
    }).setOrigin(0.5);

    const level: number = this.state.cowSettings.cowFactorySettings.find(el => el.production3Percent > 0).improve;

    if (this.factory.improve >= level) {
      this.probability3text = this.scene.add.text(spriteGeom.right + 30, spriteGeom.centerY - 15, `${this.state.lang.probabilityOfProduction}:`, {
        font: '20px Bip',
        color: '#925C28',
        wordWrap: { width: 400 },
        align: 'left',
      }).setOrigin(0, 0.5);
  
      this.probability3count = this.scene.add.text(this.probability2text.getBounds().right + 5, this.probability3text.y, `${productPercent}%`, {
        font: '20px Bip',
        color: '#57A90E',
        wordWrap: { width: 400 },
        align: 'left',
      }).setOrigin(0, 0.5);
  
      this.price3text = this.scene.add.text(spriteGeom.right + 30, spriteGeom.centerY + 15, `${this.state.lang.price}`, {
        font: '20px Bip',
        color: '#925C28',
        wordWrap: { width: 400 },
        align: 'left',
      }).setOrigin(0, 0.5);
  
      const priceGeom: Phaser.Geom.Rectangle = this.price3text.getBounds();
      const coin: Phaser.GameObjects.Sprite = this.scene.add.sprite(priceGeom.right, priceGeom.centerY, 'cowCoin').setScale(0.11).setOrigin(0, 0.5);
  
      this.price3count = this.scene.add.text(priceGeom.right + 35, this.price3text.y, `${shortNum(this.state.userCow.factory.production3Multiply * this.factory.settings.lotSize)}`, {
        font: '20px Bip',
        color: '#57A90E',
        wordWrap: { width: 400 },
        align: 'left',
      }).setOrigin(0, 0.5);
    } else {
      const text: string = this.state.lang.openProductionOnLevel.replace('$1', String(level));
      this.sprite3.setTint(0x777777);
      this.scene.add.text(spriteGeom.right + 30, spriteGeom.centerY, text, {
        font: '20px Bip',
        color: '#595959',
        wordWrap: { width: 300 },
        align: 'left',
      }).setOrigin(0, 0.5);
    }


  }

  private createBoost(): void {
    const productPercents: number[] = this.factory.getPercent();
    const product4Percent: number = productPercents[3] ? productPercents[3] : 0;

    const tile: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.startY + 360, 400, 5, 'white-pixel').setTint(0x925C28);

    this.scene.add.text(this.scene.cameras.main.centerX, tile.y + 20, this.state.lang.production4, {
      font: '28px Bip',
      color: '#925C28',
      wordWrap: { width: 400 },
      align: 'center',
    }).setOrigin(0.5, 0);

    this.progressBarBg = this.scene.add.sprite(this.scene.cameras.main.centerX, this.startY + 550, 'pb-chapter-modal').setVisible(true);
    this.progressBar = this.scene.add.tileSprite(this.scene.cameras.main.centerX - this.progressBarBg.width / 2 + 18, this.progressBarBg.y, 442, 16, 'green-progress').setOrigin(0, 0.5).setVisible(true);

    this.sprite4 = this.scene.add.sprite(170, this.startY + 470, 'factory-production-4');

    const spriteGeom: Phaser.Geom.Rectangle = this.sprite4.getBounds();
    this.probability4text = this.scene.add.text(spriteGeom.right + 20, spriteGeom.centerY - 30, `${this.state.lang.probabilityOfProduction}:`, {
      font: '20px Bip',
      color: '#925C28',
      wordWrap: { width: 400 },
      align: 'left',
    }).setOrigin(0, 0.5).setVisible(false);

    this.probability4count = this.scene.add.text(this.probability4text.getBounds().right + 5, this.probability4text.y, `${product4Percent}%`, {
      font: '20px Bip',
      color: '#57A90E',
      wordWrap: { width: 400 },
      align: 'left',
    }).setOrigin(0, 0.5).setVisible(false);

    this.price4text = this.scene.add.text(spriteGeom.right + 17, spriteGeom.centerY, `${this.state.lang.price}`, {
      font: '20px Bip',
      color: '#925C28',
      wordWrap: { width: 400 },
      align: 'left',
    }).setOrigin(0, 0.5).setVisible(true);

    const priceGeom: Phaser.Geom.Rectangle = this.price4text.getBounds();
    this.coin4 = this.scene.add.sprite(priceGeom.right, priceGeom.centerY, 'cowCoin').setScale(0.11).setOrigin(0, 0.5).setVisible(true);

    this.price4count = this.scene.add.text(priceGeom.right + 35, priceGeom.centerY, `${shortNum(this.state.userCow.factory.production4Multiply * this.factory.settings.lotSize)}`, {
      font: '20px Bip',
      color: '#57A90E',
      wordWrap: { width: 400 },
      align: 'left',
    }).setOrigin(0, 0.5).setVisible(true);

    const text: string = this.state.lang.factoryBoostCounterText + shortTime(this.state.userCow.factory.boostTime, this.state.lang);
    this.factoryBoostTimer = this.scene.add.text(spriteGeom.right + 17, spriteGeom.centerY + 30, text, {
      font: '20px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5).setVisible(false);

    this.boostText = this.scene.add.text(spriteGeom.right + 17, spriteGeom.centerY - 20, this.state.lang.showCaseText, {
      font: '20px Bip',
      color: '#925C28',
      wordWrap: { width: 370 },
      align: 'left',
    }).setOrigin(0, 0.5).setVisible(false);

    const textMultiply = this.state.lang.buyCocoaBeans.replace('$1', String(this.multiplyTime));
    const right1 = {
      text: this.price,
      icon: 'diamond'}
    this.buyBoostBtn = this.scene.bigButton('green', 'left', 350, textMultiply, right1);
  
  }

  private setListeners(): void {

    const ONE_HOUR: number = 3600;
    
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.scene.clickModalBtn(this.buyBoostBtn, (): void => {
      
      if (this.state.user.diamonds >= this.price) {
        
        if (this.state.userCow.factory.boostTime <= 0) {
          this.state.user.diamonds -= this.price;
          this.state.userCow.factory.boostTime += ONE_HOUR;
          this.scene.game.scene.keys[this.scene.state.farm].tryTask(15, 0, this.price);
  
          this.state.boughtFactoryBoost = true;
  
          this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
            type: 'booster_factory',
            count: this.price,
          });
  
          this.buyBoostBtn.title.setText(this.state.lang.buyCocoaBeans.replace('$1', String(2)));
        } else {
          if (this.state.userCow.factory.boostTime / ONE_HOUR + 2 > this.scene.game.scene.keys['Cow'].factoryBoostStack) {
            const modal: Imodal = {
              type: 1,
              sysType: 3,
              height: 150,
              message: this.state.lang.factoryBoostMaxTime
            }
            this.state.modal = modal;
            this.scene.scene.restart(this.state);
          } else {
            this.state.boughtFactoryBoost = true;
            this.state.user.diamonds -= this.price;
            this.scene.game.scene.keys[this.scene.state.farm].tryTask(15, 0, this.price);
            this.state.userCow.factory.boostTime += 2 * ONE_HOUR;
            this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
              type: 'booster_factory',
              count: this.price,
            });
          }
        }
      } else {
        const countResources = this.price - this.state.user.diamonds;
        this.state.convertor = {
          fun: 0,
          count: countResources,
          diamonds: countResources,
          type: 2
        }
        const modal: Imodal = {
          type: 1,
          sysType: 4
        }
        this.state.modal = modal;
        this.scene.scene.restart(this.state);
      }
    });
  }

  private update(): void {
    if (this.state.modal.type === 1 && this.state.modal.sysType === 17 && this.scene.scene.isActive('Modal')) {
      const MAX_WIDTH: number = 442;
      const ONE_HOUR: number = 3600;
      const productPercents: number[] = this.factory.getPercent();
      const product1Percent: number = productPercents[0];
      const product2Percent: number = productPercents[1];
      const product3Percent: number = productPercents[2];
      const product4Percent: number = productPercents[3] ? productPercents[3] : 0;

      if (this.state.userCow.factory.boostTime > 0) {
        const text1: string = this.state.lang.factoryBoostCounterText + shortTime(this.state.userCow.factory.boostTime, this.state.lang);
        if (this.factoryBoostTimer?.active && this.sprite4?.active) {
          if (this.factoryBoostTimer.text !== text1) {
            this.factoryBoostTimer.setText(text1);
          }
          if (!this.factoryBoostTimer?.visible || this.sprite4.texture?.key !== 'factory-production-4') {
            const sprite4Geom: Phaser.Geom.Rectangle = this.sprite4?.getBounds();
            this.sprite4?.setTexture('factory-production-4');
            this.factoryBoostTimer?.setVisible(true);
            this.boostText?.setVisible(false);
            this.progressBar?.setVisible(true);
            this.probability4count?.setVisible(true);
            this.probability4text?.setVisible(true);
            this.price4text?.setY(sprite4Geom.centerY);
            this.price4count?.setY(sprite4Geom.centerY);
            this.coin4?.setY(sprite4Geom.centerY);
            this.probability4count?.setText(`${product4Percent}%`);
          }
          const progress: number = (this.state.userCow.factory.boostTime / (ONE_HOUR * this.scene.game.scene.keys[this.state.farm].feedBoostStack)) * MAX_WIDTH;
          if (this.progressBar.displayWidth !== progress) {
            this.progressBar.setDisplaySize(progress, 16);
          }

        } 
      } else if (this.factoryBoostTimer?.active && this.sprite4?.active) {
        if (this.factoryBoostTimer?.visible || this.sprite4?.texture.key !== 'factory-cacao') {
          const sprite4Geom: Phaser.Geom.Rectangle = this.sprite4?.getBounds();
          this.sprite4?.setTexture('factory-cacao');
          this.progressBar?.setVisible(false);
          this.factoryBoostTimer?.setVisible(false);
          this.boostText?.setVisible(true);
          this.probability4count?.setVisible(false);
          this.probability4text?.setVisible(false);
          this.price4text?.setY(sprite4Geom.centerY + 25);
          this.price4count?.setY(sprite4Geom.centerY + 25);
          this.coin4?.setY(sprite4Geom.centerY + 25);
        }
      }

      if (product1Percent > 0) {
        if (this.probability1count?.active && this.probability1count?.text !== `${product1Percent}%`) {
          this.probability1count?.setText(`${product1Percent}%`);
        }
      }
      
      if (product2Percent > 0) {
        if (this.probability2count?.active && this.probability2count?.text !== `${product2Percent}%`) {
          this.probability2count?.setText(`${product2Percent}%`);
        }
      }

      if (product3Percent > 0) {
        if (this.probability3count?.active && this.probability3count?.text !== `${product3Percent}%`) {
          this.probability3count?.setText(`${product3Percent}%`);
        }
      }
    }
  }
}