import CowSprite from './../../components/Animal/CowSprite';
import Territory from './../../components/Territories/Territory';
function setCollector(): void {

  let delay: number = 1000 / this.state.cowCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userCow.collectorLevel).speed;

  let config: Phaser.Types.Time.TimerEventConfig = {

    delay: delay,
    callback: (): void => {
      if (this.state.userCow.collector > 0) {
        const storages: Territory[] = this.territories.children.entries.filter((el: Territory) => el.territoryType === 5);
        for (let i in this.animalGroup.children.entries) {
          const cow: CowSprite = this.animalGroup.children.entries[i];
          const freeStorage: Territory = storages.find((el: Territory) => {
            return this.state.cowSettings.territoriesCowSettings
              .find((data: IterritoriesCowSettings) => data.improve === el.improve).storage >= cow.milk + el.volume;
          });
          if (cow.milk >= cow.settings.maxMilkVolume && cow.breed !== 0 && freeStorage) {
            this.collectMilk(cow);
            break;
          }
        }
      }
    },
    callbackScope: this,
    loop: true
  }
  if (this.collectorTimer) this.collectorTimer.reset(config);
  else this.collectorTimer = this.time.addEvent(config);
}

export default setCollector;
