import { shortNum, shortTime } from '../../general/basic';
import Factory from './../Territories/Factory';
import Territory from './../Territories/Territory';
import Modal from './../../scenes/Modal/Modal';

const ACTIVE_COLOR: string = '#773a05';
const LOCKED_COLOR: string =  '#595959';
const BOOST_COLOR: string = '#ffe7ce';
const MILK_IN_STORAGE_COLOR: string = '#fffcdc';
const WHITE_COLOR: string = '#ffffff';
const RED_COLOR: string = '#ff0000';
const PRODUCTION_COLOR: string = '#cd7f20';

export default class FactoryWindow extends Phaser.GameObjects.Sprite {
  public scene: Modal;
  private closeBtn: Phaser.GameObjects.Sprite;
  private currentProductionText: Phaser.GameObjects.Text;
  private product1PercentText: Phaser.GameObjects.Text;
  private product2PercentText: Phaser.GameObjects.Text;
  private product3PercentText: Phaser.GameObjects.Text;
  private product4PercentText: Phaser.GameObjects.Text;
  private product4Sprite: Phaser.GameObjects.Sprite;
  private progressBar: Phaser.GameObjects.TileSprite;
  private boostTimer: Phaser.GameObjects.Text;
  private sellButton: any;
  private milkInStorageText1: Phaser.GameObjects.Text;
  private milkInStorageText2: Phaser.GameObjects.Text;
  private emptyAnimation: Phaser.Tweens.Tween;
  private productionAnimation: Phaser.Tweens.Tween;
  private product: Phaser.GameObjects.Sprite;
  private productMask: Phaser.Display.Masks.BitmapMask;

  constructor(scene: Modal){
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'factory-window');
    this.create();
  }

  private create(): void {
    this.scene.add.existing(this);
    this.createBitMask();
    this.createElements();
  };

  private createElements(): void {

    const factory: Factory = this.scene.state.territory.factory;
    const factoryLevel: string = this.scene.state.lang.factory.replace('$1', this.scene.state.territory.improve);
  
    const windowGeom: Phaser.Geom.Rectangle = this.getBounds();
  
    this.scene.add.text(windowGeom.centerX - 30, windowGeom.centerY - 405, factoryLevel, {
      font: '40px Shadow',
      color: '#fffcdc'
    }).setOrigin(0.5);

    this.closeBtn = this.scene.add.sprite(windowGeom.right - 50, windowGeom.top + 40,'tasks-close');
    
    this.scene.clickButton(this.closeBtn, () => {
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    });
  
    this.milkInStorageText1 = this.scene.add.text(windowGeom.left + 60, windowGeom.top + 130, this.scene.state.lang.milkInStorage, {
      font: '20px Shadow',
      color: '#fffcdc', 
    }).setOrigin(0, 0.5).setShadow(2, 2, '#08080888', 2);

    this.scene.add.text(windowGeom.left + 60, windowGeom.top + 155, this.scene.state.lang.slotSize, {
      font: '20px Shadow',
      color: '#fffcdc', 
    }).setOrigin(0, 0.5).setShadow(2, 2, '#08080888', 2);

    let storageVolume: number = 0;

    const territories: Territory[] = this.scene.game.scene.keys['Cow'].territories.children.entries;

    for (const territory of territories) {
      if (territory.territoryType === 5) storageVolume += territory.volume;
    }

    this.milkInStorageText2 = this.scene.add.text(windowGeom.right - 140, windowGeom.top + 130, shortNum(storageVolume), {
      font: '20px Shadow',
      color: '#fffcdc', 
    }).setOrigin(0, 0.5).setShadow(2, 2, '#08080888', 2);

    this.scene.add.text(windowGeom.right - 140, windowGeom.top + 155, shortNum(factory.settings.lotSize), {
      font: '20px Shadow',
      color: '#fffcdc', 
    }).setOrigin(0, 0.5).setShadow(2, 2, '#08080888', 2);

    this.scene.add.sprite(windowGeom.centerX, windowGeom.centerY - 159, 'factory-wheel').setDepth(1).setMask(this.productMask);
    this.scene.add.sprite(windowGeom.centerX + 239, windowGeom.centerY - 159, 'factory-wheel').setDepth(1).setMask(this.productMask);


    const product: string = factory.currentProduction ? this.scene.state.lang[factory.currentProduction] : '';
  
    this.currentProductionText = this.scene.add.text(windowGeom.centerX, windowGeom.centerY - 135, `${this.scene.state.lang.produced}: ${product}`, {
      font: '20px Shadow',
      color: '#cd7f20'
    }).setOrigin(0.5, 0.5);
  
    this.scene.add.sprite(windowGeom.centerX, windowGeom.centerY - 100, 'pb-chapter-modal');
    this.progressBar = this.scene.add.tileSprite(136, windowGeom.centerY - 100, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);
  
    const efficiencyText1: Phaser.GameObjects.Text = this.scene.add.text(windowGeom.left + 50, windowGeom.centerY - 40, `${this.scene.state.lang.efficiencyProduction}`, {
      font: '18px Shadow',
      color: '#773a05', 
      align: 'left',
      wordWrap: { width: 200 },
    }).setOrigin(0, 0.5);
  
    const efficiencyText2: Phaser.GameObjects.Text = this.scene.add.text(windowGeom.centerX - 20, windowGeom.centerY - 40, `${factory.settings.efficiency}%`, {
      font: '42px Shadow',
      color: '#773a05', 
      align: 'center',
    }).setOrigin(0.5);

    const nextImprove: IfactorySettings = this.scene.state.cowSettings.cowFactorySettings.find(el => el.improve === factory.improve + 1);
    if (nextImprove) {
      let improveBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(windowGeom.centerX + 130, windowGeom.centerY - 37, 'improve-collector');
      let improveText: Phaser.GameObjects.Text = this.scene.add.text(windowGeom.centerX + 130, windowGeom.centerY - 40, this.scene.state.lang.improve, {
        font: '26px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4);
      
      this.scene.clickShopBtn({ btn: improveBtn, title: improveText }, (): void => {
        this.scene.game.scene.keys[this.scene.state.farm].showImproveFactory();
      });

    } else {
      efficiencyText1.setPosition(windowGeom.centerX - 140, windowGeom.centerY - 40);
      efficiencyText2.setPosition(windowGeom.centerX + 90, windowGeom.centerY - 42);
    }

    this.scene.add.text(windowGeom.centerX, windowGeom.centerY + 47, this.scene.state.lang.probabilityOfProduction, {
      font: '19px Shadow',
      color: '#feb55f', 
    }).setOrigin(0.5);
    const productPercents: number[] = factory.getPercent();

    const product1Percent: number = productPercents[0];
    this.product1PercentText = this.scene.add.text(windowGeom.left + 113, windowGeom.centerY + 92, `${product1Percent}%`, {
      font: '33px Shadow',
      color: product1Percent > 0 ? ACTIVE_COLOR : LOCKED_COLOR, 
      align: 'center',
    }).setOrigin(0.5);
  
    const product2Percent: number = productPercents[1];
    const product2SlotTexture: string = product2Percent > 0 ? 'factory-production-slot-2' : 'factory-production-slot-disable-2';
  
    const product2slotSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(windowGeom.centerX - 62, windowGeom.centerY + 177, product2SlotTexture);
    this.product2PercentText = this.scene.add.text(product2slotSprite.x + 5 , product2slotSprite.y - 85, `${product2Percent}%`, {
      font: '33px Shadow',
      color: product2Percent > 0 ? ACTIVE_COLOR : LOCKED_COLOR, 
      align: 'center',
    }).setOrigin(0.5);
  
  
    const product3Percent: number = productPercents[2];
    const product3SlotTexture: string = product3Percent > 0 ? 'factory-production-slot-3' : 'factory-production-slot-disable-3';
  
    const product3slotSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(windowGeom.centerX + 55, windowGeom.centerY + 177, product3SlotTexture);
    this.product3PercentText = this.scene.add.text(product3slotSprite.x + 5 , product3slotSprite.y - 85, `${product3Percent}%`, {
      font: '33px Shadow',
      color: product3Percent > 0 ? ACTIVE_COLOR : LOCKED_COLOR, 
      align: 'center',
    }).setOrigin(0.5);
  
  
    const product4Percent: number = this.scene.state.userCow.factory.boostTime > 0 ? productPercents[3] : 0;
    const product4SlotTexture: string = product4Percent > 0 ? 'factory-production-slot-4' : 'factory-production-slot-disable-4';
  
    this.product4Sprite = this.scene.add.sprite(windowGeom.centerX + 171, windowGeom.centerY + 177, product4SlotTexture);
    this.product4PercentText = this.scene.add.text(this.product4Sprite.x + 5 , this.product4Sprite.y - 85, `${product4Percent}%`, {
      font: '33px Shadow',
      color: product4Percent > 0 ? BOOST_COLOR : LOCKED_COLOR, 
      align: 'center',
    }).setOrigin(0.5);
    this.scene.add.sprite(this.product4Sprite.x + 28, this.product4Sprite.y - 25, 'plus').setScale(0.84);
  
    if (product4Percent > 0) {
      this.boostTimer = this.scene.add.text(this.product4Sprite.x, this.product4Sprite.y + 82, shortTime(this.scene.state.userCow.factory.boostTime, this.scene.state.lang), {
        font: '28px Shadow',
        color: BOOST_COLOR, 
      }).setOrigin(0.5);
    }

    const zone: Phaser.GameObjects.Zone = this.scene.add.zone(windowGeom.centerX - 5, windowGeom.centerY + 175, 470, 230).setDropZone(undefined, () => {});

    this.scene.click(zone, (): void => {
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.scene.state.farm].showFactoryBoost();
    });
  
    const milkMoney = {
      icon: 'cowCoin',
      text: String(factory.money),
    }
  
    this.sellButton = this.scene.repositoryBtn(370, this.scene.state.lang.sellProduct, milkMoney);
    this.scene.clickModalBtn(this.sellButton, (): void => {
      if (factory.money > 0) {
        this.scene.scene.stop();
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.state.territory.sellProducts();
      }
    }); 
  }

  public preUpdate(): void {
    let percent: number = 0;
  
    const factoryTerritory: Territory = this.scene.state.territory;
    const factory: Factory = factoryTerritory.factory;
  
    if (factory.productionTimer > 0) {
      percent = 100 - factory.productionTimer / (factory.settings.processingTime / 100);
    }
    
    if (factory.productionTimer > 0 && !this.product) {
      this.setProductionAnimation();
    }
    
    const width: number = Math.round(444 / 100 * percent);
  
    if (this.progressBar.displayWidth !== width) {
      this.progressBar.setDisplaySize(width, 16);
    }
    const product: string = factory.currentProduction ? this.scene.state.lang[`production${factory.currentProduction}`] : '';
    const volume: string = `${this.scene.state.lang.produced}: ${product}`;
    if (this.currentProductionText.text !== volume && !this.emptyAnimation) {
      this.currentProductionText.setText(volume);
    }
  
    if (this.sellButton.text1.text !== shortNum(factory.money)) {
      this.sellButton.text1.setText(shortNum(factory.money));
      this.sellButton.img1.setX(this.sellButton.text1.getBounds().left - 10);
    }
  
    if (this.scene.state.userCow.factory.boostTime > 0) {
      if (this.boostTimer.text !== shortTime(this.scene.state.userCow.factory.boostTime, this.scene.state.lang)) {
        this.boostTimer.setText(shortTime(this.scene.state.userCow.factory.boostTime, this.scene.state.lang));
      }
    } else {
      if (this.boostTimer?.visible) {
        const percents: number[] = this.scene.state.territory.factory.getPercent();
        this.boostTimer.setVisible(false);
        this.product4Sprite.setTexture('factory-production-slot-disable-4');
        this.product1PercentText.setText(`${percents[0]}%`);
        this.product2PercentText.setText(`${percents[1]}%`);
        this.product3PercentText.setText(`${percents[2]}%`);
        this.product4PercentText.setText(`0%`);
      }
    }

    let storageVolume: number = 0;
    const territories: Territory[] = this.scene.game.scene.keys['Cow'].territories.children.entries;

    for (const territory of territories) {
      if (territory.territoryType === 5) storageVolume += territory.volume;
    }

    if (this.milkInStorageText2.text !== shortNum(storageVolume)) {
      this.milkInStorageText2.setText(shortNum(storageVolume));
    }

    if (storageVolume < factory.settings.lotSize && factory.productionTimer <= 0 && !this.emptyAnimation) {
      this.setEmptyAnimation();
    } else if (storageVolume > factory.settings.lotSize && this.emptyAnimation) {
      this.removeEmptyAnimation()
    }


  }

  private setEmptyAnimation(): void {
    this.currentProductionText.setText(this.scene.state.lang.haveNotMilk);
    this.emptyAnimation = this.scene.tweens.add({
      targets: [],
      loopDelay: 300, 
      loop: -1,
      onLoop: (): void => {
        if (this.currentProductionText.style.color !== WHITE_COLOR) {
          this.currentProductionText.setColor(WHITE_COLOR);
          this.milkInStorageText1.setColor(WHITE_COLOR);
          this.milkInStorageText2.setColor(WHITE_COLOR);
        } else {
          this.currentProductionText.setColor(RED_COLOR);
          this.milkInStorageText1.setColor(RED_COLOR);
          this.milkInStorageText2.setColor(RED_COLOR);
        }
      }
    });
  }

  private removeEmptyAnimation(): void {
    this.emptyAnimation.remove();
    this.emptyAnimation = undefined;
    this.currentProductionText.setColor(PRODUCTION_COLOR);
    this.milkInStorageText1.setColor(MILK_IN_STORAGE_COLOR);
    this.milkInStorageText2.setColor(MILK_IN_STORAGE_COLOR);
  }

  private setProductionAnimation(): void {
    const x: number = this.scene.cameras.main.centerX - 190;
    const targetX: number = this.scene.cameras.main.centerX + 350;
    const y: number = this.scene.cameras.main.centerY - 175;
    this.product = this.scene.add.sprite(x, y, `factory-production-${this.scene.state.territory.factory.currentProduction}`).setAlpha(0.2).setOrigin(0.5, 1);
    this.product.setMask(this.productMask);
    this.productionAnimation = this.scene.tweens.add({
      targets: this.product,
      props: {
        alpha: { from: 0.2, to: 1, duration: 500 },
        x: { from: x, to: targetX, duration: 3000 },
      }, 
      loop: -1,
      onLoop: (): void => {
        if (this.product && this.product.texture.key !== `factory-production-${this.scene.state.territory.currentProduction}`) {
          this.removeProductionAnimation();
        }
      }
    });
  }

  private createBitMask(): void {
    const x: number = this.scene.cameras.main.centerX - 246;
    const y: number = this.scene.cameras.main.centerY - 280;
    const width: number = 487;
    const height: number = 118;
    const mask: Phaser.GameObjects.Graphics = this.scene.add.graphics().fillRoundedRect(x, y, width, height, 12).setVisible(false);
    this.productMask = new Phaser.Display.Masks.BitmapMask(this.scene, mask);
  }
  private removeProductionAnimation(): void {
    this.product.destroy();
    this.product = undefined;
    this.productionAnimation.remove();
    this.productionAnimation = undefined;
  }
}
