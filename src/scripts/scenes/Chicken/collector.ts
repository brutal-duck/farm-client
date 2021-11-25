function setCollector(): void {

  let delay: number = 1000 / this.state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userChicken.collectorLevel).speed;

  let config: Phaser.Types.Time.TimerEventConfig = {

    delay: delay,
    callback: (): void => {

      if (this.state.userChicken.collector > 0) {

        for (let i in this.eggs.children.entries) {

          let egg = this.eggs.children.entries[i];

          if (egg.timeout > 2 && egg.animalType !== 0) {
            this.collectEgg(egg);
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

export function updateCollector(delta: number): void {
  if (this.collectorCD <= 0) {
    this.collectorIsReady = true;

    if (this.state.userChicken.collector > 0) {
      for (let i in this.eggs.children.entries) {
        let egg = this.eggs.children.entries[i];
        if (egg.timeout > 2 && egg.animalType !== 0) {
          this.collectEgg(egg);
          this.collectorIsReady = false;
          const speed = this.state.chickenSettings.partSettings[this.state.userChicken.collectorLevel - 1].collector.speed;
          this.collectorCD = Math.round(1000 / speed);
          break;
        }
      
      }
    }
  } else if (!this.collectorIsReady) this.collectorCD -= delta;
}

export default setCollector;
