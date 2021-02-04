function showFeedTime(): void {
    
    let x: number = this.cameras.main.centerX
    let y: number = this.cameras.main.centerY - 200;
    let text: Phaser.GameObjects.Text = this.add.text(x, y,  this.state.lang.feedBoostNative + this.shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang), {
        font: '31px Shadow',
        fill: '#FFFFFF'
      }).setOrigin(0.5, 0.5).setDepth(y).setStroke('#000000', 5);

    let alpha: number = 1;

    let timer: Phaser.Time.TimerEvent = this.time.addEvent({
        delay: 50,
        loop: true,
        callback: () => {

          if (alpha >= 0) {

            alpha -= 0.02;
            text.setAlpha(alpha);

          } else {

            text.destroy();
            timer.remove();

          }
        },
        callbackScope: this
      })
}

export {
    showFeedTime,
}