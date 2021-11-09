import Sheep from './Main';
import Bars from '../../components/Scenes/BarsScene';

class SheepBars extends Bars {
  public mainScene: Sheep;

  constructor() {
    super('Sheep');
  }

  public init(state: Istate): void {
    super.init(state);
  }

  public create(): void {
    super.create();
    this.hideElementsOnTutorial();
  }

  public update(): void {
    super.update();
    this.updateCalendarIcon();
  }

  public setBalanceBars(balance: Ibalance): void {
    if (this.state.userSheep.part >= 6) {
      if (balance.alarm && this.balanceBg.texture.key === 'green-balance-bg') {
        this.balanceBg.setTexture('red-balance-bg');
      } else if (!balance.alarm && this.balanceBg.texture.key === 'red-balance-bg') {
        this.balanceBg.setTexture('green-balance-bg');
      }
    } else {
      if (balance.alarm && this.balanceBg.texture.key === 'green-balance-bg-big' && this.state.userSheep.tutorial >= 100) {
        this.balanceBg.setTexture('red-balance-bg-big');
      } else if (!balance.alarm && this.balanceBg.texture.key === 'red-balance-bg-big') {
        this.balanceBg.setTexture('green-balance-bg-big');
      }
    }

    let waterPercent: string = balance.waterPercent + '%';
    if (balance.notEnoughWater) {
      waterPercent = '-' + balance.waterPercent + '%';
      this.waterProblem = true;
    } else this.waterProblem = false;

    if (this.textWater.text !== waterPercent && this.state.userSheep.tutorial >= 40) {
      if (this.state.userSheep.tutorial === 40 && waterPercent !== '-100%') {
        this.textWater.setText(waterPercent);
      } else if (this.state.userSheep.tutorial > 40) {
        this.textWater.setText(waterPercent);
      }
    }

    let grassPercent: string = balance.grassPercent + '%';
    if (balance.notEnoughGrass) {
      grassPercent = '-' + balance.grassPercent + '%';
      this.grassProblem = true;
    } else this.grassProblem = false;
    if (this.textGrass.text !== grassPercent && this.state.userSheep.tutorial >= 30) {
      if (this.state.userSheep.tutorial === 30 && grassPercent !== '-100%') {
        this.textGrass.setText(grassPercent);
      } else if (this.state.userSheep.tutorial > 30) {
        this.textGrass.setText(grassPercent);
      }
    }
  }

  private hideElementsOnTutorial() {
    if (this.state.userSheep.tutorial < 100) {
      this.taskZone.setVisible(false);
      this.addDiamonds.setVisible(false);
      this.addMoney.setVisible(false);
      this.shop.setVisible(false);
      this.map.setVisible(false);
      this.collectorBtn.setVisible(false);
      this.collector.setVisible(false);
      this.collector.bubble.setVisible(false);
    }

    if (this.state.userSheep.tutorial < 20) {
      this.animalBuy.setVisible(false);
      this.saleBuyIcon.setVisible(false);
      this.animalPrice.setVisible(false);
      this.animalPriceBubble.setVisible(false);
    }

    if (this.state.userSheep.tutorial < 30) {
      this.textGrass.setVisible(false);
      this.grassBalance.setVisible(false);
    }

    if (this.state.userSheep.tutorial < 40) {
      this.textWater.setVisible(false);
      this.waterBalance.setVisible(false);
    }

    if (this.state.userSheep.tutorial < 30) {
      this.balanceBg.setVisible(false);
    }
  }

  private updateCalendarIcon(): void {
    if (this.calendar?.active) {
      if (this.state.farm === 'Sheep') {
        if (this.state.userSheep.part >= 4 && !this.calendar.visible) {
          this.calendar.setVisible(true);
          this.calendarText.setVisible(true);
        } else if (this.state.userSheep.part < 4 && this.calendar.visible) {
          this.calendar.setVisible(false);
          this.calendarText.setVisible(false);
        }
      }
    }
  }
}

export default SheepBars;
