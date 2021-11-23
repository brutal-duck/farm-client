function setCollector(): void {
  
  let delay: number = 1000 / this.state.sheepCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userSheep.collectorLevel).speed;

  let config: Phaser.Types.Time.TimerEventConfig = {

    delay: delay,
    callback: (): void => {

      if (this.state.userSheep.collector > 0) {

        for (let i in this.sheep.children.entries) {

          let sheep = this.sheep.children.entries[i];

          if (sheep.wool >= 1000 && sheep.type !== 0) {
            this.collectWool(sheep);
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

    if (this.state.userSheep.collector > 0) {
      for (let i in this.sheep.children.entries) {
        const sheep = this.sheep.children.entries[i];
        if (sheep.wool >= 1000 && sheep.type !== 0) {
          this.collectWool(sheep);
          this.collectorIsReady = false;
          const speed = this.state.sheepSettings.partSettings[this.state.userSheep.collectorLevel - 1].collector.speed;
          this.collectorCD = Math.round(1000 / speed);
          break;
        }
      }
    }
  } else if (!this.collectorIsReady) this.collectorCD -= delta;
}

export default setCollector;
