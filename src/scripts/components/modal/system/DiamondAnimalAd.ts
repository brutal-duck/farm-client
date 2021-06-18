import { timer } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class DiamondAnimalAd {
  public scene: Modal;

  private farm: string
  private caveTimer: Phaser.GameObjects.Text;

  constructor(scene: Modal) {
    this.scene = scene;
    this.farm = this.scene.state.farm
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    this.scene.textHeader.setText(this.scene.state.lang[`summon${this.farm}`]);

    let sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 145, `${this.farm.toLowerCase()}0`);
    if (this.farm === 'Chicken') sprite.anims.play('chicken-drag0', true);
    else sprite.anims.play(`${this.farm.toLowerCase()}-stay-right0`, true);
    if (this.farm === 'Sheep') this.scene.add.sprite(sprite.x, sprite.y, 'sheep-right-0-4');

    const time: string = timer(this.scene.state[`user${this.farm}`].diamondAnimalTime);
    this.caveTimer = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 55, this.scene.state.lang.summonTime + time, {
      font: '26px Bip',
      color: '#57A90E',
      align: 'center',
      wordWrap: { width: 420 }
    }).setOrigin(0.5, 0);

    this.scene.add.text(this.scene.cameras.main.centerX - length, this.scene.cameras.main.centerY + 15, this.scene.state.lang.wantAdSummon, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 420 }
    }).setOrigin(0.5, 0);

    const right = {
      icon: 'ad-icon',
      text: ''
    }

    const ad = this.scene.bigButton('green', 'left', 135, this.scene.state.lang.summon, right);
    this.scene.clickModalBtn(ad, (): void => {

      this.scene.state[`user${this.farm}`].diamondAnimalAd = false;
      this.scene.game.scene.keys[this.farm].watchAd(2);
      this.closeWindow()
      
    });

    const cancel = this.scene.bigButton('yellow', 'center', 225, this.scene.state.lang.cancel);
    this.scene.clickModalBtn(cancel, (): void => { this.closeWindow() });

    this.scene.resizeWindow(450);

  }

  private closeWindow(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.farm].scrolling.wheel = true;
  }

}