function setCollector(): void {

  let delay: number = 1000 / this.state.cowCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userCow.collectorLevel).speed;

  let config: Phaser.Types.Time.TimerEventConfig = {

    delay: delay,
    callback: (): void => {

      if (this.state.userCow.collector > 0) {

        for (let i in this.eggs.children.entries) {

          let egg = this.eggs.children.entries[i];

          if (egg.timeout > 2 && egg.type !== 0) {
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

export default setCollector;
