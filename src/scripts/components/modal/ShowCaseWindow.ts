import { shortNum, shortTime } from '../../general/basic';
import Factory from './../Territories/Factory';
import Modal from './../../scenes/Modal/Modal';

export default class ShowCaseWindow {
  public scene: Modal;
  public state: Istate;
  private factoryBoostTimer: Phaser.GameObjects.Text;
  private startY: number;
  private factory: Factory;
  private probability1: Phaser.GameObjects.Text;
  private probability2: Phaser.GameObjects.Text;
  private probability3: Phaser.GameObjects.Text;
  private probability4: Phaser.GameObjects.Text;
  private price1: Phaser.GameObjects.Text;
  private price2: Phaser.GameObjects.Text;
  private price3: Phaser.GameObjects.Text;
  private price4: Phaser.GameObjects.Text;
  private sprite1: Phaser.GameObjects.Sprite;
  private sprite2: Phaser.GameObjects.Sprite;
  private sprite3: Phaser.GameObjects.Sprite;
  private sprite4: Phaser.GameObjects.Sprite;
  private buyBoostBtn: any;
  private multiplyTime: number;
  private price: number;

  constructor(scene: Modal){
    this.scene = scene;
    this.state = scene.state;
    this.startY = this.scene.cameras.main.centerY - 270;
    this.factory = this.state.territory.factory;
    this.multiplyTime = 1;
    if (this.state.userCow.factory.boostTime > 0) this.multiplyTime = 2;
    this.price = 25;
    this.create();
    this.setListeners();
  }

  private create(): void {

    this.scene.textHeader.setText(this.state.lang.showCase);

  
    this.createProduction(1);
    this.createProduction(2);
    this.createProduction(3);
    this.createBoost();
  

    this.scene.resizeWindow(600);
  }

  private createProduction(number: number): void {
    const productPercent: number = this.factory.getPercent()[number - 1];
    const padding: number = (number - 1) * 120;
    this.scene.add.text(this.scene.cameras.main.centerX, this.startY + padding, this.state.lang[`production${number}`], {
      font: '28px Bip',
      color: '#925C28',
      wordWrap: { width: 400 },
      align: 'center',
    }).setOrigin(0.5);
    const sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(160, this.startY + 50 + padding, `factory-production-${number}`);
    this[`sprite${number}`] = sprite;
    const spriteGeom: Phaser.Geom.Rectangle = sprite.getBounds();
    this[`probability${number}`] = this.scene.add.text(spriteGeom.right + 30, spriteGeom.centerY - 15, `${this.state.lang.probabilityOfProduction}: ${productPercent}%`, {
      font: '20px Bip',
      color: '#925C28',
      wordWrap: { width: 400 },
      align: 'left',
    }).setOrigin(0, 0.5);
    this[`price${number}`] = this.scene.add.text(spriteGeom.right + 30, spriteGeom.centerY + 15, `${this.state.lang.price}${shortNum(this.state.userCow.factory[`production${number}Multiply`] * this.factory.settings.lotSize)}`, {
      font: '20px Bip',
      color: '#925C28',
      wordWrap: { width: 400 },
      align: 'left',
    }).setOrigin(0, 0.5);
  }

  private createBoost(): void {
    const productPercents: number[] = this.factory.getPercent();
    const product4Percent: number = productPercents[3] ? productPercents[3] : 0;

    this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.startY + 350, 400, 5, 'white-pixel').setTint(0x925C28);
    this.scene.add.text(this.scene.cameras.main.centerX, this.startY + 390, this.state.lang.production4, {
      font: '28px Bip',
      color: '#925C28',
      wordWrap: { width: 400 },
      align: 'center',
    }).setOrigin(0.5);

    if (this.state.userCow.factory.boostTime > 0) {
      this.sprite4 = this.scene.add.sprite(170, this.startY + 450, 'factory-production-4');
      const spriteGeom: Phaser.Geom.Rectangle = this.sprite4.getBounds();
      this.probability4 = this.scene.add.text(spriteGeom.right + 20, spriteGeom.centerY - 30, `${this.state.lang.probabilityOfProduction}: ${product4Percent}%`, {
        font: '20px Bip',
        color: '#925C28',
        wordWrap: { width: 400 },
        align: 'left',
      }).setOrigin(0, 0.5);
      this.price4 = this.scene.add.text(spriteGeom.right + 17, spriteGeom.centerY, `${this.state.lang.price}${shortNum(this.state.userCow.factory.production4Multiply * this.factory.settings.lotSize)}`, {
        font: '20px Bip',
        color: '#925C28',
        wordWrap: { width: 400 },
        align: 'left',
      }).setOrigin(0, 0.5);
      const text: string = this.state.lang.factoryBoostCounterText + shortTime(this.state.userCow.factory.boostTime, this.state.lang);
      this.factoryBoostTimer = this.scene.add.text(spriteGeom.right + 17, spriteGeom.centerY + 30, text, {
        font: '20px Bip',
        color: '#925C28'
      }).setOrigin(0, 0.5);
    } else {
      this.sprite4 = this.scene.add.sprite(170, this.startY + 450, 'factory-production-1');
      const spriteGeom: Phaser.Geom.Rectangle = this.sprite4.getBounds();
      this.probability1 = this.scene.add.text(spriteGeom.right + 10, spriteGeom.centerY, this.state.lang.showCaseText2, {
        font: '26px Bip',
        color: '#925C28',
        wordWrap: { width: 400 },
        align: 'left',
      }).setOrigin(0, 0.5);
    }

    const text = this.state.lang.buyCocoaBeans.replace('$1', String(this.multiplyTime));
    const right1 = {
      text: this.price,
      icon: 'diamond'}
    this.buyBoostBtn = this.scene.bigButton('green', 'left', 280, text, right1);
  
  }
  private setListeners(): void {

    const ONE_HOUR: number = 3600;
    
    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
    this.scene.clickModalBtn(this.buyBoostBtn, (): void => {
      
      if (this.state.user.diamonds >= this.price) {
        
        if (this.state.userCow.factory.boostTime <= 0) {
          this.state.user.diamonds -= this.price;
          this.state.userCow.factory.boostTime += ONE_HOUR;
  
          this.state.boughtFactoryBoost = true;
  
          this.scene.game.scene.keys[this.state.farm].logAmplitudeEvent('diamonds_spent', {
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
            this.state.userCow.factory.boostTime += 2 * ONE_HOUR;
            this.scene.game.scene.keys[this.state.farm].logAmplitudeEvent('diamonds_spent', {
              type: 'booster_factory',
              count: this.price,
            });
          }
        }
      } else {
        const countResources = this.price - this.state.user.diamonds;
        this.state.convertor = {
          fun: 2,
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
      if (this.state.userCow.factory.boostTime > 0) {
        if (this.factoryBoostTimer.text !== shortTime(this.state.userCow.factory.boostTime, this.state.lang)) {
          this.factoryBoostTimer.setText(shortTime(this.state.userCow.factory.boostTime,this.state.lang));
        }
      } else {
        if (this.factoryBoostTimer?.visible) {
          this.factoryBoostTimer.setVisible(false);
        }
      }
    }
  }
}