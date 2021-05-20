import { shortNum, shortTime } from '../../general/basic';
import Factory from './../Territories/Factory';
import Territory from './../Territories/Territory';
import Modal from './../../scenes/Modal/Modal';

const ACTIVE_COLOR: string = '#773a05';
const LOCKED_COLOR: string =  '#595959';
const BOOST_COLOR: string = '#ffe7ce';

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
  private milkInStorageText: Phaser.GameObjects.Text;


  constructor(scene: Modal){
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'factory-window');
    this.create();
  }

  private create(): void {
    this.scene.add.existing(this);
    this.createElements();
  };

  private createElements(): void {

    const factory: Factory = this.scene.state.territory.factory;
    const factoryLevel: string = this.scene.state.lang.factory.replace('$1', this.scene.state.territory.improve);
  
    const windowGeom: Phaser.Geom.Rectangle = this.getBounds();
  
    this.scene.add.text(windowGeom.centerX - 20, windowGeom.centerY - 400, factoryLevel, {
      font: '40px Shadow',
      color: '#fffcdc'
    }).setOrigin(0.5);

    this.closeBtn = this.scene.add.sprite(windowGeom.right - 50, windowGeom.top + 40,'tasks-close');
    
    this.scene.clickButton(this.closeBtn, () => {
      this.scene.scene.stop();
    });
  
    this.scene.add.text(windowGeom.left + 70, windowGeom.top + 130, this.scene.state.lang.milkInStorage, {
      font: '22px Shadow',
      color: '#fffcdc', 
    }).setOrigin(0, 0.5);

    this.scene.add.text(windowGeom.left + 70, windowGeom.top + 155, this.scene.state.lang.slotSize, {
      font: '22px Shadow',
      color: '#fffcdc', 
    }).setOrigin(0, 0.5);

    let sorageVolume: number = 0;

    const territories: Territory[] = this.scene.game.scene.keys['Cow'].territories.children.entries;

    for (const territory of territories) {
      if (territory.territoryType === 5) sorageVolume += territory.volume;
    }

    this.milkInStorageText = this.scene.add.text(windowGeom.right - 120, windowGeom.top + 130, shortNum(sorageVolume), {
      font: '22px Shadow',
      color: '#fffcdc', 
    }).setOrigin(0, 0.5);
    this.scene.add.text(windowGeom.right - 120, windowGeom.top + 155, shortNum(factory.settings.lotSize), {
      font: '22px Shadow',
      color: '#fffcdc', 
    }).setOrigin(0, 0.5);

    const product: string = factory.currentProduction ? this.scene.state.lang[factory.currentProduction] : '';
  
    this.currentProductionText = this.scene.add.text(windowGeom.centerX, windowGeom.centerY - 135, `${this.scene.state.lang.produced}: ${product}`, {
      font: '22px Shadow',
      color: '#cd7f20'
    }).setOrigin(0.5, 0.5);
  
    this.scene.add.sprite(windowGeom.centerX, windowGeom.centerY - 100, 'pb-chapter-modal');
    this.progressBar = this.scene.add.tileSprite(136, windowGeom.centerY - 100, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);
  
    let improveBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(windowGeom.centerX + 130, windowGeom.centerY - 37, 'improve-collector');
    let improveText: Phaser.GameObjects.Text = this.scene.add.text(windowGeom.centerX + 130, windowGeom.centerY - 40, this.scene.state.lang.improve, {
      font: '26px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4);
    
    this.scene.clickShopBtn({ btn: improveBtn, title: improveText }, (): void => {
      this.scene.game.scene.keys[this.scene.state.farm].showImproveFactory();
    });
    
    this.scene.add.text(windowGeom.left + 50, windowGeom.centerY - 40, `${this.scene.state.lang.efficiency}`, {
      font: '18px Shadow',
      color: '#773a05', 
      align: 'left',
      wordWrap: { width: 200 },
    }).setOrigin(0, 0.5);
  
    this.scene.add.text(windowGeom.centerX - 20, windowGeom.centerY - 40, `${factory.settings.efficiency}%`, {
      font: '42px Shadow',
      color: '#773a05', 
      align: 'center',
    }).setOrigin(0.5);
  

    this.scene.add.text(windowGeom.centerX, windowGeom.centerY + 45, this.scene.state.lang.probabilityOfProduction, {
      font: '18px Shadow',
      color: '#feb55f', 
    }).setOrigin(0.5);
    const product1Percent: number = factory.getPercent(1);
    this.product1PercentText = this.scene.add.text(windowGeom.left + 115, windowGeom.centerY + 95, `${product1Percent}%`, {
      font: '32px Shadow',
      color: product1Percent > 0 ? ACTIVE_COLOR : LOCKED_COLOR, 
      align: 'center',
    }).setOrigin(0.5);
  
    const product2Percent: number = factory.getPercent(2);
    const product2SlotTexture: string = product2Percent > 0 ? 'factory-production-slot-2' : 'factory-production-slot-disable-2';
  
    const product2slotSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(windowGeom.centerX - 62, windowGeom.centerY + 177, product2SlotTexture);
    this.product2PercentText = this.scene.add.text(product2slotSprite.x + 5 , product2slotSprite.y - 82, `${product2Percent}%`, {
      font: '32px Shadow',
      color: product2Percent > 0 ? ACTIVE_COLOR : LOCKED_COLOR, 
      align: 'center',
    }).setOrigin(0.5);
  
  
    const product3Percent: number = factory.getPercent(3);
    const product3SlotTexture: string = product3Percent > 0 ? 'factory-production-slot-3' : 'factory-production-slot-disable-3';
  
    const product3slotSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(windowGeom.centerX + 55, windowGeom.centerY + 177, product3SlotTexture);
    this.product3PercentText = this.scene.add.text(product3slotSprite.x + 5 , product3slotSprite.y - 82, `${product3Percent}%`, {
      font: '32px Shadow',
      color: product3Percent > 0 ? ACTIVE_COLOR : LOCKED_COLOR, 
      align: 'center',
    }).setOrigin(0.5);
  
  
    const product4Percent: number = this.scene.state.userCow.factory.boostTime > 0 ? factory.getPercent(4) : 0;
    const product4SlotTexture: string = product4Percent > 0 ? 'factory-production-slot-4' : 'factory-production-slot-disable-4';
  
    this.product4Sprite = this.scene.add.sprite(windowGeom.centerX + 171, windowGeom.centerY + 177, product4SlotTexture);
    this.product4PercentText = this.scene.add.text(this.product4Sprite.x + 5 , this.product4Sprite.y - 82, `${product4Percent}%`, {
      font: '32px Shadow',
      color: product4Percent > 0 ? BOOST_COLOR : LOCKED_COLOR, 
      align: 'center',
    }).setOrigin(0.5);
    this.scene.add.sprite(this.product4Sprite.x + 30, this.product4Sprite.y - 20, 'plus').setScale(0.8);
  
    if (product4Percent > 0) {
      this.boostTimer = this.scene.add.text(this.product4Sprite.x, this.product4Sprite.y + 82, shortTime(this.scene.state.userCow.factory.boostTime, this.scene.state.lang), {
        font: '28px Shadow',
        color: BOOST_COLOR, 
      }).setOrigin(0.5);
    }
    // this.click(this.chocolateSprite, (): void => {
    //   this.scene.stop();
    //   this.game.scene.keys[this.scene.state.farm].showFactoryBoost();
    // });
  
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
    
    const width: number = Math.round(444 / 100 * percent);
  
    if (this.progressBar.displayWidth !== width) {
      this.progressBar.setDisplaySize(width, 16);
    }
    const product: string = factory.currentProduction ? this.scene.state.lang[`production${factory.currentProduction}`] : '';
    const volume: string = `${this.scene.state.lang.produced}: ${product}`;
    if (this.currentProductionText.text !== volume) {
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
        this.boostTimer.setVisible(false);
        this.product4Sprite.setTexture('factory-production-slot-disable-4');
        this.product1PercentText.setText(`${this.scene.state.territory.factory.getPercent(1)}%`);
        this.product2PercentText.setText(`${this.scene.state.territory.factory.getPercent(2)}%`);
        this.product3PercentText.setText(`${this.scene.state.territory.factory.getPercent(3)}%`);
        this.product4PercentText.setText(`${this.scene.state.territory.factory.getPercent(4)}%`);
      }
    }
  }
}
