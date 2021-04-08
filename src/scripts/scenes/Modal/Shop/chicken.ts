import { shortNum, shortTime } from '../../../general/basic';
import MoneyAnimation from './../../../components/animations/MoneyAnimation';
// монеты
function chickenMoney(): void {
  
  let diamonds: number[] = [1, 10, 50, 100, 500, 1000];
  let rows: number = Math.ceil(diamonds.length / 2);
  let height: number = rows * 270 + 40;
  this.scrolling.bottom = this.height - this.heightWindow + height;

  for (let i: number = 0; i < rows; i++) {

    let y: number = i * 270 + 40;
    let left: number = diamonds[i * 2];
    let right: number = diamonds[i * 2 + 1];

    let pack: Phaser.GameObjects.Sprite = this.add.sprite(0, y + this.height, 'chicken-money-package').setOrigin(0, 0);
    this.click(pack, (): void => {

      this.state.convertor = {
        fun: 0,
        count: left,
        diamonds: left,
        type: 1
      }
      this.game.scene.keys[this.state.farm].exchange();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');
      MoneyAnimation.create(this.game.scene.keys[`${this.state.farm}Bars`], `${this.state.farm.toLowerCase()}Coin`);

    });
    
    let count: string = String(shortNum(this.game.scene.keys[this.state.farm].convertDiamonds(left)));

    this.add.text(110, y + 160 + this.height, count, {
      font: '40px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    let btn = this.shopButton(110, y + 223 + this.height, left, 'diamond');
    this.clickShopBtn(btn, (): void => {
      
      this.state.convertor = {
        fun: 0,
        count: left,
        diamonds: left,
        type: 1
      }
      this.game.scene.keys[this.state.farm].exchange();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');
      MoneyAnimation.create(this.game.scene.keys[`${this.state.farm}Bars`], `${this.state.farm.toLowerCase()}Coin`);

    });

    if (right) {

      let pack: Phaser.GameObjects.Sprite = this.add.sprite(240, y + this.height, 'chicken-money-package').setOrigin(0, 0);
      this.click(pack, (): void => {

        this.state.convertor = {
          fun: 0,
          count: right,
          diamonds: right,
          type: 1
        }
        this.game.scene.keys[this.state.farm].exchange();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');
        MoneyAnimation.create(this.game.scene.keys[`${this.state.farm}Bars`], `${this.state.farm.toLowerCase()}Coin`);

      });

      let count: string = String(shortNum(this.game.scene.keys[this.state.farm].convertDiamonds(right)));

      this.add.text(350, y + 160 + this.height, count, {
        font: '40px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5);

      let btn = this.shopButton(350, y + 223 + this.height, right, 'diamond');
      this.clickShopBtn(btn, (): void => {

        this.state.convertor = {
          fun: 0,
          count: right,
          diamonds: right,
          type: 1
        }
        this.game.scene.keys[this.state.farm].exchange();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');
        MoneyAnimation.create(this.game.scene.keys[`${this.state.farm}Bars`], `${this.state.farm.toLowerCase()}Coin`);

      });

    }

  }

}


// курицы
function chicken(): void {

  let rows: number = this.state.chickenSettings.chickenSettings.length;
  let height: number = rows * 270 + 40;
  this.scrolling.bottom = this.height - this.heightWindow + height;
  
  for (let i: number = 0; i < rows; i++) {

    let y: number = i * 270 + 40;
    this.add.sprite(0, y + this.height, 'animal-shop-bg').setOrigin(0, 0);

    let chicken: IchickenPoints = this.state.chickenSettings.chickenSettings.find((data: IchickenPoints) => data.breed === i + 1);

    // иконка
    if (this.state.userChicken.fair + 1 < chicken.breed) {
      this.add.sprite(110, y + this.height + 110, 'disable-chicken');
    } else {

      let sprite: Phaser.GameObjects.Sprite = this.add.sprite(110, y + this.height + 110, 'chicken' + chicken.breed);
      sprite.anims.play('chicken-drag' + chicken.breed, true);

    }

    // описание
    let center: number = y + 110 + this.height;
    
    let chickenName: string = this.state.lang['chickenBreed' + chicken.breed];
    let name: Phaser.GameObjects.Text = this.add.text(240, center, chickenName, {
      font: '28px Shadow',
      fill: '#FFFFFF',
      align: 'left',
      wordWrap: { width: 230 }
    }).setOrigin(0, 0.5);
    let boundsName = name.getBounds();

    let eggPriceText: string = this.state.lang.eggPrice;
    let egg: Phaser.GameObjects.Text = this.add.text(240, center, eggPriceText, {
      font: '20px Shadow',
      fill: '#FFFFFF'
    }).setOrigin(0, 0.5);
    let boundsEgg = egg.getBounds();

    let eggPrice: Phaser.GameObjects.Text = this.add.text(boundsEgg.right, center, String(shortNum(chicken.eggPrice)), {
      font: '20px Shadow',
      fill: '#ECC896'
    }).setOrigin(0, 0.5);

    // кнопка покупки
    let heightBtn: number = 0;
    let btn: any = false;
    if (chicken.breed <= this.state.userChicken.fair - this.state.chickenSettings.buyBetterBreedChicken || chicken.breed === 1) {

      let price: string = String(shortNum(this.chickenPrice(chicken.breed).price));
      
      btn = this.shopButton(330, center, price, 'chickenCoin');
      this.clickShopBtn(btn, (): void => {

        let result: boolean = this.game.scene.keys[this.state.farm].buyChicken(chicken.breed, true);
        if (result) this.updateChickenPrices();

      });

      this.buttons.push({
        text: btn.title,
        breed: chicken.breed,
        img: btn.img
      });

      heightBtn = btn.btn.height;

    }
    
    let height: number = heightBtn + boundsName.height + boundsEgg.height + 20;
    name.y -= height / 2 - (boundsName.height / 2);
    egg.y -= height / 2 - boundsName.height - (boundsEgg.height / 2) - 5;
    eggPrice.y = egg.y;

    if (btn) {
      btn.btn.y += height / 2 - (heightBtn / 2);
      btn.title.y += height / 2 - (heightBtn / 2);
      btn.img.y += height / 2 - (heightBtn / 2);
    }

  }

}

// обновление цен кнопок
function updateChickenPrices(): void {
  
  for (let i in this.buttons) {

    this.buttons[i].text.setText(String(shortNum(this.chickenPrice(this.buttons[i].breed).price)));
    this.buttons[i].img.x = this.buttons[i].text.getBounds().left - 25;

  }

}


export {
  chickenMoney,
  chicken,
  updateChickenPrices
}
