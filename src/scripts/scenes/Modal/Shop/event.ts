import { shortNum, shortTime } from '../../../general/basic';

// монеты
function animalMoney(): void {
  
  let diamonds: number[] = [1, 10, 50, 100, 500, 1000];
  let rows: number = Math.ceil(diamonds.length / 2);
  let height: number = rows * 270 + 40;
  this.scrolling.bottom = this.height - this.heightWindow + height;

  for (let i: number = 0; i < rows; i++) {

    let y: number = i * 270 + 40;
    let left: number = diamonds[i * 2];
    let right: number = diamonds[i * 2 + 1];

    let pack: Phaser.GameObjects.Sprite = this.add.sprite(0, y + this.height, 'animal-money-package').setOrigin(0, 0);
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


// курицы
function animals(): void {

  let rows: number = this.state.eventSettings.eventSettings.length;
  let height: number = rows * 270 + 40;
  this.scrolling.bottom = this.height - this.heightWindow + height;
  
  for (let i: number = 0; i < rows; i++) {

    let y: number = i * 270 + 40;
    this.add.sprite(0, y + this.height, 'animal-shop-bg').setOrigin(0, 0);

    let animal: IeventPoints = this.state.eventSettings.eventSettings.find((data: IeventPoints) => data.breed === i + 1);

    // иконка
    if (this.state.userEvent.maxLevelAnimal + 1 < animal.breed) {
      this.add.sprite(110, y + this.height + 110, 'disable-animal');
    } else {

      let sprite: Phaser.GameObjects.Sprite = this.add.sprite(110, y + this.height + 110, 'animal' + animal.breed);
      sprite.anims.play('chicken-drag' + animal.breed, true);

    }

    // описание
    let center: number = y + 110 + this.height;
    
    let animalName: string = this.state.lang['chickenBreed' + animal.breed];
    let name: Phaser.GameObjects.Text = this.add.text(240, center, animalName, {
      font: '28px Shadow',
      fill: '#FFFFFF',
      align: 'left',
      wordWrap: { width: 230 }
    }).setOrigin(0, 0.5);
    let boundsName = name.getBounds();

    let resourcePriceText: string = this.state.lang.eggPrice;
    let resource: Phaser.GameObjects.Text = this.add.text(240, center, resourcePriceText, {
      font: '20px Shadow',
      fill: '#FFFFFF'
    }).setOrigin(0, 0.5);
    let boundsResource = resource.getBounds();

    let resourcePrice: Phaser.GameObjects.Text = this.add.text(boundsResource.right, center, String(shortNum(animal.resourcePrice)), {
      font: '20px Shadow',
      fill: '#ECC896'
    }).setOrigin(0, 0.5);

    // кнопка покупки
    let heightBtn: number = 0;
    let btn: any = false;
    if (animal.breed <= this.state.userEvent.maxLevelAnimal || animal.breed === 1) {

      let price: string = String(shortNum(this.animalPrice(animal.breed).price));
      
      btn = this.shopButton(330, center, price, 'animalCoin');
      this.clickShopBtn(btn, (): void => {

        let result: boolean = this.game.scene.keys[this.state.farm].buyAnimal(animal.breed, true);
        if (result) this.updateAnimalPrices();

      });

      this.buttons.push({
        text: btn.title,
        breed: animal.breed,
        img: btn.img
      });

      heightBtn = btn.btn.height;

    }
    
    let height: number = heightBtn + boundsName.height + boundsResource.height + 20;
    name.y -= height / 2 - (boundsName.height / 2);
    resource.y -= height / 2 - boundsName.height - (boundsResource.height / 2) - 5;
    resourcePrice.y = resource.y;

    if (btn) {
      btn.btn.y += height / 2 - (heightBtn / 2);
      btn.title.y += height / 2 - (heightBtn / 2);
      btn.img.y += height / 2 - (heightBtn / 2);
    }

  }

}

// обновление цен кнопок
function updateAnimalPrices(): void {
  
  for (let i in this.buttons) {

    this.buttons[i].text.setText(String(shortNum(this.animalPrice(this.buttons[i].breed).price)));
    this.buttons[i].img.x = this.buttons[i].text.getBounds().left - 25;

  }

}


export {
  animalMoney,
  animals,
  updateAnimalPrices
}
