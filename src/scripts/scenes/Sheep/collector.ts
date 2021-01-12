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

export default setCollector;
