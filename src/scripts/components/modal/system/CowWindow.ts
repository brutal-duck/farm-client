import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import ExpelAnimalWindow from "./ExpelAnimalWindow";

export default class CowWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    this.scene.textHeader.setText(this.scene.state.lang.cow);

    if (this.scene.state.animal.breed !== 0) this.customCow()
    else this.crystalCow()
  
  }


  private customCow(): void {

    let icon: string = 'cow' + this.scene.state.animal.breed;
    let sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 145, icon);
    sprite.anims.play('cow-drag' + this.scene.state.animal.breed, true);

    let breed: string = this.scene.state.lang['cowBreed' + this.scene.state.animal.breed];
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 35, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 35, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY + 35, 0, 16, 'green-progress').setOrigin(0, 0.5);

    let milkSpeed: number = Math.round(this.scene.state.animal.settings.maxMilkVolume / 60);

    this.scene.add.text(132, this.scene.cameras.main.centerY + 90, this.scene.state.lang.milkSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.scene.add.text(588, this.scene.cameras.main.centerY + 90, milkSpeed + ' ' + this.scene.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    this.scene.add.text(132, this.scene.cameras.main.centerY + 135, this.scene.state.lang.milkPrice, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    let price: Phaser.GameObjects.Text = this.scene.add.text(588, this.scene.cameras.main.centerY + 135, String(this.scene.state.animal.settings.maxMilkVolume), {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    let priceWidth: number = price.getBounds().left - 25;
    this.scene.add.sprite(priceWidth, this.scene.cameras.main.centerY + 135, 'cowCoin').setScale(0.15);

    let sellPrice = {
      icon: 'cowCoin',
      text: shortNum(Math.round(this.scene.game.scene.keys[this.scene.state.farm].cowPrice(1).price / 2))
    }
    let button = this.scene.bigButton('red', 'left', 220, this.scene.state.lang.expel, sellPrice);
    this.scene.clickModalBtn(button, (): void => {
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      new ExpelAnimalWindow(this.scene)
    });

    this.scene.resizeWindow(460);

  }


  private crystalCow(): void {

    let icon: string = 'cow' + this.scene.state.animal.breed;
    let sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 85, icon);
    sprite.anims.play('cow-drag0', true);

    let breed: string = this.scene.state.lang['cowBreed' + this.scene.state.animal.breed];
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 25, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 95, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY + 95, 0, 16, 'green-progress').setOrigin(0, 0.5);

    let points: IcowPoints = this.scene.state.cowSettings.cowSettings.find((item: IcowPoints) => item.breed === 1);
    
    let milkSpeed: number = Math.round(points.maxMilkVolume / 60);

    this.scene.add.text(132, this.scene.cameras.main.centerY + 150, this.scene.state.lang.diamondSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.scene.add.text(588, this.scene.cameras.main.centerY + 150, milkSpeed + ' ' + this.scene.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    this.scene.resizeWindow(350);

  }
}