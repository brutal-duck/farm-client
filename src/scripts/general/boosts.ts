import { shortTime } from "./basic";

function showFeedTime(): void {
    
    let x: number = this.cameras.main.centerX;
    let y: number = this.cameras.main.centerY - 250;

    
    let text: Phaser.GameObjects.Text = this.add.text(x, y,  this.state.lang.feedBoostNative + shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang), {
        font: '35px Bip',
        fill: '#FFFFFF'
      });
    text.setOrigin(0.5, 0.5)
      .setDepth(y)
      .setDepth(y + 1)
      .setStroke('#000000', 5);

    let textWidth: number = text.width + 50;

    let bar: Phaser.GameObjects.Graphics = this.add.graphics();
    bar.fillStyle(0x000000, 0.6)
      .fillRoundedRect(x - textWidth / 2, y - 35, textWidth, 70, 20)
      .setDepth(y);

    let alpha: number = 1;

    let timer: Phaser.Time.TimerEvent = this.time.addEvent({
        delay: 50,
        loop: true,
        callback: () => {

          if (alpha >= 0) {

            alpha -= 0.015;
            text.setAlpha(alpha);
            bar.setAlpha(alpha);

          } else {

            bar.destroy();
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