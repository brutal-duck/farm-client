function setCollector(): void {

  let delay: number = 1000 / this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userUnicorn.collectorLevel).speed;
  
  let config: Phaser.Types.Time.TimerEventConfig = {

    delay: delay,
    callback: (): void => {
      
      if (this.state.userUnicorn.collector > 0) {

          for (let i in this.resources.children.entries) {
  
            let resource = this.resources.children.entries[i];
            
            if (resource.data.values.timeout > 2 && resource.data.values.type !== 0) {
              
              this.collectResource(resource);
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
