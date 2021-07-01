import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import ExpelAnimalWindow from "./ExpelAnimalWindow";

export default class SheepWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    this.scene.textHeader.setText(this.scene.state.lang.sheep);

    if (this.scene.state.animal.type !== 0) this.customSheep();
    else this.crystalSheep();
  }


  private customSheep(): void {
    let icon: string = 'sheep' + this.scene.state.animal.type;
    let sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 180, icon);
    sprite.anims.play('sheep-stay-right' + this.scene.state.animal.type, true);
    this.scene.add.sprite(sprite.x, sprite.y, 'sheep-right-' + this.scene.state.animal.type  + '-2');

    let breed: string = this.scene.state.lang['sheepBreed' + this.scene.state.animal.type];
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY, 0, 16, 'green-progress').setOrigin(0, 0.5);

    let points: IsheepPoints = this.scene.state.sheepSettings.sheepSettings.find((item: IsheepPoints) => item.breed === this.scene.state.animal.type);
    let woolGrowth: number = Math.round(1000 / points.wool_growth);

    this.scene.add.text(132, this.scene.cameras.main.centerY + 55, this.scene.state.lang.woolSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.scene.add.text(588, this.scene.cameras.main.centerY + 55, woolGrowth + ' ' + this.scene.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    this.scene.add.text(132, this.scene.cameras.main.centerY + 100, this.scene.state.lang.woolPrice, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    let price: Phaser.GameObjects.Text = this.scene.add.text(588, this.scene.cameras.main.centerY + 100, String(points.long_wool), {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    let priceWidth: number = price.getBounds().left - 25;
    this.scene.add.sprite(priceWidth, this.scene.cameras.main.centerY + 100, 'sheepCoin').setScale(0.15);
    
    let priceWool: number = this.scene.state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === this.scene.state.animal.type).long_wool;

    let diamond = {
      icon: 'sheepCoin',
      text: shortNum(priceWool)
    };
    this.scene.progressButton = this.scene.bigButton('grey', 'left', 180, this.scene.state.lang.cutWool, diamond);

    this.scene.clickModalBtn(this.scene.progressButton, (): void => {
      if (this.scene.state.animal.wool === 1000) {
        this.scene.scene.stop();
        this.scene.game.scene.keys[this.scene.state.farm].collectWool(this.scene.state.animal, true);
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      }
    });

    let sellPrice = {
      icon: 'sheepCoin',
      text: shortNum(Math.round(this.scene.game.scene.keys[this.scene.state.farm].sheepPrice(1).price / 2))
    };
    let button = this.scene.bigButton('red', 'left', 265, this.scene.state.lang.expel, sellPrice);
    this.scene.clickModalBtn(button, (): void => {
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      new ExpelAnimalWindow(this.scene);
    });

    this.scene.resizeWindow(540);
  }


  private crystalSheep(): void {
    let icon: string = 'sheep' + this.scene.state.animal.type;
    const sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 130, icon);
    sprite.anims.play('sheep-stay-right0', true);
    this.scene.add.sprite(sprite.x, sprite.y, 'sheep-right-0-4');

    let breed: string = this.scene.state.lang['sheepBreed' + this.scene.state.animal.type];
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 20, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 50, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY + 50, 0, 16, 'green-progress').setOrigin(0, 0.5);

    let points: IsheepPoints = this.scene.state.sheepSettings.sheepSettings.find((item: IsheepPoints) => item.breed === 1);
    let woolGrowth: number = Math.round(1000 / points.wool_growth);

    this.scene.add.text(132, this.scene.cameras.main.centerY + 105, this.scene.state.lang.diamondSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.scene.add.text(588, this.scene.cameras.main.centerY + 105, woolGrowth + ' ' + this.scene.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    const diamond = {
      icon: 'diamond',
      text: 1
    };

    this.scene.progressButton = this.scene.bigButton('grey', 'left', 195, this.scene.state.lang.collectDiamond, diamond);
    this.scene.clickModalBtn(this.scene.progressButton, (): void => {
      if (this.scene.state.animal.wool === 1000) {
        this.scene.scene.stop();
        this.scene.game.scene.keys[this.scene.state.farm].collectWool(this.scene.state.animal, true);
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      }
    });

    this.scene.resizeWindow(430);
  }
}