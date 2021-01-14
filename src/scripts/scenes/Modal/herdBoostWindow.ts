let x: number = 600;
let y: number = 360;
let yTent: number;

function herdBoostWindow() {

  this.game.scene.keys[this.state.farm].scrolling.scrollY = 0;

  let farm: string = this.state.farm.toLowerCase();
  
  let merging = this.add.sprite(x, y, `${farm}-merging`);
  merging.setDepth(y);
  
  if (farm === 'sheep') {
    yTent = y - 24;
  } else if (farm === 'chicken') {
    yTent = y - 17;
  }
  let tent = this.add.image(x, yTent, `${farm}-tent`).setDepth(y + 1);
}
  
export default herdBoostWindow;