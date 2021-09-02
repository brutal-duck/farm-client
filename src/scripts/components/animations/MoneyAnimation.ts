import SheepBars from './../../scenes/Sheep/SheepBars';
import ChickenBars from './../../scenes/Chicken/ChickenBars';
import CowBars from './../../scenes/Cow/CowBars';
import UnicornBars from '../../scenes/Event/Unicorns/UnicornBars';
import Sheep from '../../scenes/Sheep/Main';
import Chicken from '../../scenes/Chicken/Main';
import Cow from '../../scenes/Cow/Main';
import Unicorn from '../../scenes/Event/Unicorns/Main';
import Modal from './../../scenes/Modal/Modal';
import Profile from './../../scenes/Profile';
import ClanFarm from './../../scenes/ClanFarm';

export default class MoneyAnimation  {
  public scene: SheepBars | ChickenBars | CowBars | UnicornBars | Modal | Profile | ClanFarm;
  public position: Iposition;
  public texture: string;
  public money: Phaser.GameObjects.Group;
  private target: Iposition;

  constructor(scene: SheepBars | ChickenBars | CowBars | UnicornBars | Modal | Profile | ClanFarm, texture: string, target?: Iposition) {
    this.scene = scene;
    this.position = { x: this.scene.cameras.main.centerX, y: this.scene.cameras.main.centerY };
    this.texture  = texture;
    this.target = target;
    this.init();
  }

  static create(scene: SheepBars | ChickenBars | CowBars | UnicornBars | Modal | Profile | ClanFarm, texture: string = `${scene.state.farm.toLowerCase()}Coin`, target?: Iposition): MoneyAnimation {
    return new MoneyAnimation(scene, texture, target);
  }

  private init(): void {
    this.money = this.scene.add.group();
    this.scene.time.addEvent({
      delay: 100,
      callbackScope: this,
      repeat: 2,
      callback: () => {
        this.animation();
      }
    })

    this.scene.time.addEvent({
      delay: 3000,
      callback: () => {
        this.money.destroy(true);
      }
    })

  }

  private animation(): void {
    const alphaDuration: number = 600;
    const rotationConfig = { value: Math.PI * 2, duration: 300, repeat: 1, ease: 'Power1' };
    const scaleConfig = { value: { from: 0, to: 0.20 }, duration: 300, yoyo: true, ease: 'Power3' };
    const alphaConfig = { value: { from: 1, to: 0.5 }, duration: alphaDuration };

    const moneySprite1: Phaser.GameObjects.Sprite = this.moneySprite;
    this.scene.tweens.add({
      targets: moneySprite1,
      props: {
          x: { value: this.position.x - Phaser.Math.Between(40, 120), duration: 150 },
          y: { value: this.position.y - Phaser.Math.Between(40, 120), duration: 250 },
          rotation: rotationConfig,
          scale: scaleConfig,
          alpha: alphaConfig,
      },
      onComplete: () => {
        this.flyToBar(moneySprite1);
      },
      // onCompleteScope: this,
      ease: 'Sine.easeInOut',
    });

    let moneySprite2: Phaser.GameObjects.Sprite = this.moneySprite;
    this.scene.tweens.add({
      delay: 150,
      targets: moneySprite2,
      props: {
        x: { value: this.position.x + Phaser.Math.Between(40, 120), duration: 250 },
        y: { value: this.position.y - Phaser.Math.Between(40, 120), duration: 150 },
        rotation: rotationConfig,
        scale: scaleConfig,
        alpha: alphaConfig,
      },
      onComplete: () => {
        this.flyToBar(moneySprite2);
      },
      onCompleteScope: this,
      ease: 'Sine.easeInOut',
    });

    let moneySprite3: Phaser.GameObjects.Sprite = this.moneySprite;
    this.scene.tweens.add({
      delay: 50,
      targets: moneySprite3,
      props: {
        x: { value: this.position.x + Phaser.Math.Between(40, 120), duration: 150 },
        y: { value: this.position.y + Phaser.Math.Between(40, 120), duration: 250 },
        rotation: rotationConfig,
        scale: scaleConfig,
        alpha: alphaConfig,
      },
      onComplete: () => {
        this.flyToBar(moneySprite3);
      },
      onCompleteScope: this,
      ease: 'Sine.easeInOut',
    });

    let moneySprite4: Phaser.GameObjects.Sprite = this.moneySprite;
    this.scene.tweens.add({
      delay: 200,
      targets: moneySprite4,
      props: {
        x: { value: this.position.x - Phaser.Math.Between(40, 120), duration: 250 },
        y: { value: this.position.y + Phaser.Math.Between(40, 120), duration: 200 },
        rotation: rotationConfig,
        scale: scaleConfig,
        alpha: alphaConfig,
      },      
      onComplete: () => {
        this.flyToBar(moneySprite4);
      },
      onCompleteScope: this,
      ease: 'Sine.easeInOut',
    });

    let moneySprite5: Phaser.GameObjects.Sprite = this.moneySprite;
    this.scene.tweens.add({
      delay: 300,
      targets: moneySprite5,
      props: {
        x: { value: this.position.x + Phaser.Math.Between(40, 120), duration: 200, yoyo: true},
        y: { value: this.position.y + Phaser.Math.Between(40, 120), duration: 250, yoyo: true},
        rotation: rotationConfig,
        scale: scaleConfig,
        alpha: alphaConfig,
      },
      onComplete: () => {
        this.flyToBar(moneySprite5);
      },
      onCompleteScope: this,
      ease: 'Sine.easeInOut',
    });

    let moneySprite6: Phaser.GameObjects.Sprite = this.moneySprite;
    this.scene.tweens.add({
      delay: 100,
      targets: moneySprite6,
      props: {
        x: { value: this.position.x - Phaser.Math.Between(40, 120), duration: 250, yoyo: true },
        y: { value: this.position.y - Phaser.Math.Between(40, 120), duration: 200, yoyo: true},
        rotation: rotationConfig,
        scale: scaleConfig,
        alpha: alphaConfig,
      },
      onComplete: () => {
        this.flyToBar(moneySprite6);
      },
      onCompleteScope: this,
      ease: 'Sine.easeInOut',
    });

    const mainScene = this.scene.game.scene.getScene(this.scene.state.farm) as Sheep | Chicken | Cow | Unicorn;
    if (this.texture !== 'diamond') mainScene.playSoundOnce('coins-sound');
  }

  private flyToBar(sprite: Phaser.GameObjects.Sprite): void {
    if (!this.target) {
      if (this.texture !== 'diamond') this.target = { x: 495, y: 120 };
      else this.target = { x: 495, y: 30 };
    }
    const alpha = { from: 0.8, to: 1 };

    if (this.target.x === this.scene.cameras.main.centerX && this.target.y === this.scene.cameras.main.centerY) {
      alpha.from = 0.5
      alpha.to = 0;
    }
    this.scene.tweens.add({
      targets: sprite,
      alpha: alpha,
      scale: { from: 0.1, to: 0.2},
      x: this.target.x,
      y: this.target.y,
      duration: 400,
      onComplete: (): void => {
        sprite.destroy();
      },
      onCompleteScope: this,
    });
  }

  private get moneySprite(): Phaser.GameObjects.Sprite {
    const money: Phaser.GameObjects.Sprite  = this.scene.add.sprite(this.position.x, this.position.y, this.texture).setDepth(10000).setAlpha(0).setScale(0.12);
    this.money.add(money);
    return money;
  }
}