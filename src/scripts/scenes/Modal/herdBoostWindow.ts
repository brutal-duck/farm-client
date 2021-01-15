let x: number = 600;
let y: number = 360;
let yTent: number;

let xRoad: number = 0;
let yRoad: number = 480;

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
  let tent = this.add.image(x, yTent, `${farm}-tent`);
  tent.setDepth(y + 1);

  let road = this.add.sprite(xRoad, yRoad, `herd-boost-road-${farm}`);
  road
    .setOrigin(0)
    .setDepth(2);

  // Заборы
  let borderTop1 = this.add.sprite(0, yRoad + 15, `${farm}-horizontal-border-1`)
  .setOrigin(0, 1)
  .setDepth(y);

  let borderTop2 = this.add.sprite(0 + 240, yRoad + 15, `${farm}-horizontal-border-2`)
  .setOrigin(0, 1)
  .setDepth(y);

  let borderBottom1 = this.add.sprite(0, yRoad + road.height + 15, `${farm}-horizontal-border-1`)
  .setOrigin(0, 1)
  .setDepth(y);

  let borderBottom2 = this.add.sprite(0 + 240, yRoad + road.height  + 15, `${farm}-horizontal-border-2`)
  .setOrigin(0, 1)
  .setDepth(y);

  let borderBottom3 = this.add.sprite(0 + 480, yRoad + road.height  + 15, `${farm}-horizontal-border-3`)
  .setOrigin(0, 1)
  .setDepth(y);

}
  
export default herdBoostWindow;