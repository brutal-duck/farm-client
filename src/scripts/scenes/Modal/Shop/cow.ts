import { shortNum, shortTime } from '../../../general/basic';

// монеты
function cowMoney(): void {
  
  let diamonds: number[] = [1, 10, 50, 100, 500, 1000];
  let rows: number = Math.ceil(diamonds.length / 2);
  let height: number = rows * 270 + 40;
  this.scrolling.bottom = this.height - this.heightWindow + height;

  for (let i: number = 0; i < rows; i++) {

    let y: number = i * 270 + 40;
    let left: number = diamonds[i * 2];
    let right: number = diamonds[i * 2 + 1];

    let pack: Phaser.GameObjects.Sprite = this.add.sprite(0, y + this.height, 'cow-money-package').setOrigin(0, 0);
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
    });

    if (right) {

      let pack: Phaser.GameObjects.Sprite = this.add.sprite(240, y + this.height, 'cow-money-package').setOrigin(0, 0);
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
      });

    }

  }

}


// коровы
function cow(): void {

  let rows: number = this.state.cowSettings.cowSettings.length;
  let height: number = rows * 270 + 40;
  this.scrolling.bottom = this.height - this.heightWindow + height;
  
  for (let i: number = 0; i < rows; i++) {

    let y: number = i * 270 + 40;
    this.add.sprite(0, y + this.height, 'animal-shop-bg').setOrigin(0, 0);

    let cow: IcowPoints = this.state.cowSettings.cowSettings.find((data: IcowPoints) => data.breed === i + 1);

    // иконка
    if (this.state.userCow.fair + 1 < cow.breed) {
      this.add.sprite(110, y + this.height + 110, 'disable-cow');
    } else {
      const sprite: Phaser.GameObjects.Sprite = this.add.sprite(110, y + this.height + 110, 'cow' + cow.breed);
    }

    // описание
    let center: number = y + 110 + this.height;
    
    let cowName: string = this.state.lang['cowBreed' + cow.breed];
    let name: Phaser.GameObjects.Text = this.add.text(240, center, cowName, {
      font: '28px Shadow',
      fill: '#FFFFFF',
      align: 'left',
      wordWrap: { width: 230 }
    }).setOrigin(0, 0.5);
    let boundsName = name.getBounds();

    let milkPriceText: string = this.state.lang.milkPrice;
    let milk: Phaser.GameObjects.Text = this.add.text(240, center, milkPriceText, {
      font: '20px Shadow',
      fill: '#FFFFFF'
    }).setOrigin(0, 0.5);
    let boundsMilk = milk.getBounds();

    let milkPrice: Phaser.GameObjects.Text = this.add.text(boundsMilk.right, center, String(shortNum(cow.maxMilkVolume)), {
      font: '20px Shadow',
      fill: '#ECC896'
    }).setOrigin(0, 0.5);

    // кнопка покупки
    let heightBtn: number = 0;
    let btn: any = false;
    if (cow.breed <= this.state.userCow.fair - this.state.cowSettings.buyBetterBreedCow || cow.breed === 1) {

      let price: string = String(shortNum(this.cowPrice(cow.breed).price));
      
      btn = this.shopButton(330, center, price, 'cowCoin');
      this.clickShopBtn(btn, (): void => {

        let result: boolean = this.game.scene.keys[this.state.farm].buyCow(cow.breed, true);
        if (result) this.updateCowPrices();

      });

      this.buttons.push({
        text: btn.title,
        breed: cow.breed,
        img: btn.img
      });

      heightBtn = btn.btn.height;

    }
    
    let height: number = heightBtn + boundsName.height + boundsMilk.height + 20;
    name.y -= height / 2 - (boundsName.height / 2);
    milk.y -= height / 2 - boundsName.height - (boundsMilk.height / 2) - 5;
    milkPrice.y = milk.y;

    if (btn) {
      btn.btn.y += height / 2 - (heightBtn / 2);
      btn.title.y += height / 2 - (heightBtn / 2);
      btn.img.y += height / 2 - (heightBtn / 2);
    }

  }

}

// обновление цен кнопок
function updateCowPrices(): void {
  
  for (let i in this.buttons) {

    this.buttons[i].text.setText(String(shortNum(this.cowPrice(this.buttons[i].breed).price)));
    this.buttons[i].img.x = this.buttons[i].text.getBounds().left - 25;

  }

}


export {
  cowMoney,
  cow,
  updateCowPrices
}
