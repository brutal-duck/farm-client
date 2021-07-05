import Territory from './Territory';
import Cow from './../../scenes/Cow/Main';
import Factory from './Factory';
import Firework from './../animations/Firework';

export default class CowTerritory extends Territory {
  public scene: Cow;
  public factory: Factory;
  constructor(scene: Cow, x: number, y: number, type: string, data: Iterritories) {
    super(scene, x, y, type, data);
  }

  protected createElements(): void {
    super.createElements();
    if (this.territoryType === 8) {
      this.createFactorySprite();
    }
  }

  private createFactorySprite(): void {
    this.factory = new Factory(this.scene, this.x + 120, this.y + 85, this.improve);
    this.factory.setDepth(this.y + 1);
    this.improveText.setPosition(this.x + 187, this.y + 97);
    this.improveText.setStyle({ fontSize: '32px' });
  }

  public takeDiamondAnimal(): void {
    this.scene.takeDiamondCow();
  }

  public sellResource(): void {
    this.scene.sellMilk();
  }

  public improveFactory(): void {
    const settings: IfactorySettings[] = this.scene.state.cowSettings.cowFactorySettings;
    const user: IuserCow = this.scene.state.userCow;

    const nextImprove = settings.find((item: IfactorySettings) => item.improve === this.improve + 1);
    if (nextImprove && this.improve < settings.length) {
      if (user.part >= nextImprove.unlock_improve) {
        if (user.money >= nextImprove.improveMoneyPrice && this.scene.state.user.diamonds >= nextImprove.improveDiamondPrice) {
          user.money -= nextImprove.improveMoneyPrice;
          this.scene.state.user.diamonds -= nextImprove.improveDiamondPrice;
          this.improve += 1;
          this.factory.improve += 1;
          this.factory.settings = nextImprove;
          this.scene.time.addEvent({ delay: 200, callback: (): void => {
            this.improveText?.setText(String(this.improve));
            Firework.create(this.scene, { x: this.x + 120, y: this.y + 120 }, 5);

          }, callbackScope: this, loop: false });

          this.scene.state.amplitude.logAmplitudeEvent('factory_up', {
            level: this.factory.improve,
          });

          if (nextImprove.improveDiamondPrice > 0) {
            this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
              type: 'factory',
              count: nextImprove.improveDiamondPrice,
            });
            this.scene.tryTask(15, 0, nextImprove.improveDiamondPrice);
          }
          this.scene.game.scene.keys['Modal'].scene.stop();
          this.scene.tryTask(24, this.factory.improve);
        } else {
          if (this.scene.state.user.diamonds < nextImprove.improveDiamondPrice) {
            const count: number = nextImprove.improveDiamondPrice - this.scene.state.user.diamonds;
            this.openConvertor(count, count, 2);
          } else {
            const count: number = nextImprove.improveMoneyPrice - user.money;
            const diamonds: number = this.scene.convertMoney(count);
            this.openConvertor(count, diamonds, 1);
          }
        }
      }
    }
  }
}