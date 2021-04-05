import CowSprite from './../../components/Animal/CowSprite';
function setCollector(): void {

  let delay: number = 1000 / this.state.cowCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userCow.collectorLevel).speed;

  let config: Phaser.Types.Time.TimerEventConfig = {

    delay: delay,
    callback: (): void => {

      if (this.state.userCow.collector > 0) {

        for (let i in this.cow.children.entries) {

          let cow: CowSprite = this.cow.children.entries[i];

          if (cow.milk >= 1000 && cow.animalType !== 0) {
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
