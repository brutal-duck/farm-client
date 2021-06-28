import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";
import ExpelAnimalWindow from "./ExpelAnimalWindow";

export default class ChickenWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    this.scene.textHeader.setText(this.scene.state.lang.chicken);

    if (this.scene.state.animal.type !== 0) this.customChicken()
    else this.crystalChicken()
  
  }


  private customChicken(): void {

    let icon: string = 'chicken' + this.scene.state.animal.type;
    let sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 145, icon);
    sprite.anims.play('chicken-drag' + this.scene.state.animal.type, true);

    let breed: string = this.scene.state.lang['chickenBreed' + this.scene.state.animal.type];
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 35, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 35, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY + 35, 0, 16, 'green-progress').setOrigin(0, 0.5);

    let points: IchickenPoints = this.scene.state.chickenSettings.chickenSettings.find((item: IchickenPoints) => item.breed === this.scene.state.animal.type);
    
    let eggSpeed: number = Math.round(1000 / points.egg);

    this.scene.add.text(132, this.scene.cameras.main.centerY + 90, this.scene.state.lang.eggSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.scene.add.text(588, this.scene.cameras.main.centerY + 90, eggSpeed + ' ' + this.scene.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    this.scene.add.text(132, this.scene.cameras.main.centerY + 135, this.scene.state.lang.eggPrice, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    let price: Phaser.GameObjects.Text = this.scene.add.text(588, this.scene.cameras.main.centerY + 135, String(points.eggPrice), {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    let priceWidth: number = price.getBounds().left - 25;
    this.scene.add.sprite(priceWidth, this.scene.cameras.main.centerY + 135, 'chickenCoin').setScale(0.15);

    let sellPrice = {
      icon: 'chickenCoin',
      text: shortNum(Math.round(this.scene.game.scene.keys[this.scene.state.farm].chickenPrice(1).price / 2))
    }
    let button = this.scene.bigButton('red', 'left', 220, this.scene.state.lang.expel, sellPrice);
    this.scene.clickModalBtn(button, (): void => {
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      new ExpelAnimalWindow(this.scene)
    });

    this.scene.resizeWindow(460);

  }


  private crystalChicken(): void {

    let icon: string = 'chicken' + this.scene.state.animal.type;
    let sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 85, icon);
    sprite.anims.play('chicken-drag0', true);

    let breed: string = this.scene.state.lang['chickenBreed' + this.scene.state.animal.type];
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 25, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 95, 'pb-chapter-modal');
    this.scene.progressBar = this.scene.add.tileSprite(136, this.scene.cameras.main.centerY + 95, 0, 16, 'green-progress').setOrigin(0, 0.5);

    let points: IchickenPoints = this.scene.state.chickenSettings.chickenSettings.find((item: IchickenPoints) => item.breed === 1);
    let eggSpeed: number = Math.round(1000 / points.egg);

    this.scene.add.text(132, this.scene.cameras.main.centerY + 150, this.scene.state.lang.diamondSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.scene.add.text(588, this.scene.cameras.main.centerY + 150, eggSpeed + ' ' + this.scene.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    this.scene.resizeWindow(350);

  }
}