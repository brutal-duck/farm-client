import { shortNum, timer, shortTime } from "../../general/basic";
import ExpelAnimalWindow from "../../components/modal/system/ExpelAnimalWindow";

// окно овцы
function sheep(): void {

  this.textHeader.setText(this.state.lang.sheep);

  if (this.state.animal.type !== 0) {

    let icon: string = 'sheep' + this.state.animal.type;
    let sprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 180, icon);
    sprite.anims.play('sheep-stay-right' + this.state.animal.type, true);
    this.add.sprite(sprite.x, sprite.y, 'sheep-right-' + this.state.animal.type  + '-2');

    let breed: string = this.state.lang['sheepBreed' + this.state.animal.type];
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 70, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    let points: IsheepPoints = this.state.sheepSettings.sheepSettings.find((item: IsheepPoints) => item.breed === this.state.animal.type);
    
    let woolGrowth: number = Math.round(1000 / points.wool_growth);

    this.add.text(132, this.cameras.main.centerY + 55, this.state.lang.woolSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.add.text(588, this.cameras.main.centerY + 55, woolGrowth + ' ' + this.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    this.add.text(132, this.cameras.main.centerY + 100, this.state.lang.woolPrice, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    let price: Phaser.GameObjects.Text = this.add.text(588, this.cameras.main.centerY + 100, String(points.long_wool), {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    let priceWidth: number = price.getBounds().left - 25;
    this.add.sprite(priceWidth, this.cameras.main.centerY + 100, 'sheepCoin').setScale(0.15);
    
    let priceWool: number = this.state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === this.state.animal.type).long_wool;

    let diamond = {
      icon: 'sheepCoin',
      text: shortNum(priceWool)
    }
    this.progressButton = this.bigButton('grey', 'left', 180, this.state.lang.cutWool, diamond);

    this.clickModalBtn(this.progressButton, (): void => {

      if (this.state.animal.wool === 1000) {
        
        this.scene.stop();
        this.game.scene.keys[this.state.farm].collectWool(this.state.animal, true);
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  
      }

    });

    let sellPrice = {
      icon: 'sheepCoin',
      text: shortNum(Math.round(this.game.scene.keys[this.state.farm].sheepPrice(1).price / 2))
    }
    let button = this.bigButton('red', 'left', 265, this.state.lang.expel, sellPrice);
    this.clickModalBtn(button, (): void => {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      new ExpelAnimalWindow(this.scene)
    });

    this.resizeWindow(540);

  } else {

    let icon: string = 'sheep' + this.state.animal.type;
    let sprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 130, icon);
    sprite.anims.play('sheep-stay-right0', true);
    this.add.sprite(sprite.x, sprite.y, 'sheep-right-0-4');

    let breed: string = this.state.lang['sheepBreed' + this.state.animal.type];
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 20, breed, {
      font: '30px Bip',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 480 }
    }).setOrigin(0.5, 0.5);

    this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 50, 'pb-chapter-modal');
    this.progressBar = this.add.tileSprite(136, this.cameras.main.centerY + 50, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);

    let points: IsheepPoints = this.state.sheepSettings.sheepSettings.find((item: IsheepPoints) => item.breed === 1);
    
    let woolGrowth: number = Math.round(1000 / points.wool_growth);

    this.add.text(132, this.cameras.main.centerY + 105, this.state.lang.diamondSpeed, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(0, 0.5);

    this.add.text(588, this.cameras.main.centerY + 105, woolGrowth + ' ' + this.state.lang.seconds, {
      font: '28px Bip',
      color: '#925C28'
    }).setOrigin(1, 0.5);

    let diamond = {
      icon: 'diamond',
      text: 1
    }

    this.progressButton = this.bigButton('grey', 'left', 195, this.state.lang.collectDiamond, diamond);
    this.clickModalBtn(this.progressButton, (): void => {

      if (this.state.animal.wool === 1000) {
        
        this.scene.stop();
        this.game.scene.keys[this.state.farm].collectWool(this.state.animal, true);
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  
      }

    });

    this.resizeWindow(430);
    
  }

}


export {
  sheep,
}
