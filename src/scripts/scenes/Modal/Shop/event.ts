import { shortNum, shortTime } from '../../../general/basic';
import BigInteger from './../../../libs/BigInteger';
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

    let pack: Phaser.GameObjects.Sprite = this.add.sprite(0, y + this.height, 'event-money-package').setOrigin(0, 0);
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

      let pack: Phaser.GameObjects.Sprite = this.add.sprite(240, y + this.height, 'event-money-package').setOrigin(0, 0);
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

function getDiamondPrice(devisor, breed): number {
  const lvl: number = 60;
  let diamondPrice: number = 40;
  let multiply: number = 1 + Math.floor((breed - lvl) / 5) 
  let inc: number = 5;
  if (breed > lvl) {
    diamondPrice += inc * multiply;
  }
  return Math.round(diamondPrice / devisor);
}

// животные
function animals(): void {

  let rows: number = this.state.unicornSettings.unicornSettings.length;
  let height: number = rows * 270 + 40;
  this.scrolling.bottom = this.height - this.heightWindow + height;
  
  for (let i: number = 0; i < rows; i++) {

    let y: number = i * 270 + 40;
    this.add.sprite(0, y + this.height, 'animal-shop-bg').setOrigin(0, 0);

    let animal: IeventPoints = this.state.unicornSettings.unicornSettings.find((data: IeventPoints) => data.breed === i + 1);

    // иконка
    if (this.state.userUnicorn.maxLevelAnimal < animal.breed) {
      this.add.sprite(110, y + this.height + 110, 'disable-animal');
    } else {

      this.add.sprite(110, y + this.height + 110, 'animal' + animal.breed);

    }

    // описание
    let center: number = y + 110 + this.height;
    
    let animalName: string = this.state.lang['eventBreed' + animal.breed];
    let name: Phaser.GameObjects.Text = this.add.text(240, center, animalName, {
      font: '28px Shadow',
      fill: '#FFFFFF',
      align: 'left',
      wordWrap: { width: 230 }
    }).setOrigin(0, 0.5);
    let boundsName = name.getBounds();

    let resourcePriceText: string = this.state.lang.resourcePrice;

    let resource: Phaser.GameObjects.Text = this.add.text(240, center, resourcePriceText, {
      font: '20px Shadow',
      fill: '#FFFFFF'
    }).setOrigin(0, 0.5);
    let boundsResource = resource.getBounds();
    
    let resourcePrice: Phaser.GameObjects.Text = this.add.text(boundsResource.right, center, String(shortNum(BigInteger.divide(animal.resourcePrice, String(10)))), {
      font: '20px Shadow',
      fill: '#ECC896'
    }).setOrigin(0, 0.5);

    // кнопка покупки
    let heightBtn: number = 0;
    let btn: any = false;
    if (animal.breed <= this.state.userUnicorn.maxLevelAnimal - 4 || animal.breed === 1) {

      let price: string = String(shortNum(this.animalPrice(animal.breed).price));
      
      btn = this.shopButton(330, center, price, 'unicornCoin');
      this.clickShopBtn(btn, (): void => {

        let result: boolean = this.game.scene.keys[this.state.farm].buyAnimal(animal.breed, true);
        if (result) this.updateAnimalPrices({text: btn.title, breed: animal.breed, img: btn.img});

      });

      this.buttons.push({
        text: btn.title,
        breed: animal.breed,
        img: btn.img
      });

      heightBtn = btn.btn.height;

    } else if (animal.breed <= this.state.userUnicorn.maxLevelAnimal - 3 || animal.breed === 2 && this.state.userUnicorn.maxLevelAnimal > 2) {

      const diamondPrice = this.getDiamondPrice(4, animal.breed);

      if (this.state.readyAd && this.state.userUnicorn.timeToAd <= 0) {
        
        btn = this.shopButton(330, center,  this.state.lang.pickUp, 'ad-icon');
        this.clickShopBtn(btn, (): void => {
          if (this.game.scene.keys[this.state.farm].getFreeBoostPositions().length > 0) {
            this.game.scene.keys[this.state.farm].watchAd(4);
            this.scene.stop('Shop');
            this.scene.stop('ShopBars');
            this.scene.stop('Modal');
            this.game.scene.keys[this.state.farm].scrolling.wheel = true;
          } else {
            this.scene.stop('Shop');
            this.scene.stop('ShopBars');
            this.scene.stop('Modal');
  
            let modal: Imodal = {
              type: 1,
              sysType: 3,
              height: 150,
              message: this.state.lang.maxEventCount
            }
            this.state.modal = modal;
            this.scene.launch('Modal', this.state);
          }

        });
  
      } else {

        btn = this.shopButton(330, center, String(diamondPrice), 'diamond');
        this.clickShopBtn(btn, (): void => {
  
          this.game.scene.keys[this.state.farm].buyAnimal(animal.breed, true, diamondPrice);
  
        });

      }
      

      this.buttons.push({
        text: btn.title,
        breed: animal.breed,
        img: btn.img
      });

      heightBtn = btn.btn.height;

    } else if (animal.breed <= this.state.userUnicorn.maxLevelAnimal - 2 || animal.breed === 3 && this.state.userUnicorn.maxLevelAnimal > 3) {

      const diamondPrice = this.getDiamondPrice(2, animal.breed);
      
      btn = this.shopButton(330, center, String(diamondPrice), 'diamond');
      this.clickShopBtn(btn, (): void => {

        this.game.scene.keys[this.state.farm].buyAnimal(animal.breed, true, diamondPrice);

      });

      this.buttons.push({
        text: btn.title,
        breed: animal.breed,
        img: btn.img
      });

      heightBtn = btn.btn.height;

    } else if (animal.breed <= this.state.userUnicorn.maxLevelAnimal - 1 || animal.breed === 4 && this.state.userUnicorn.maxLevelAnimal > 4) {

      const diamondPrice = this.getDiamondPrice(1, animal.breed);
      
      btn = this.shopButton(330, center, String(diamondPrice), 'diamond');
      this.clickShopBtn(btn, (): void => {

        this.game.scene.keys[this.state.farm].buyAnimal(animal.breed, true, diamondPrice);

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
function updateAnimalPrices({text, breed, img}): void {
 
  text.setText(String(shortNum(this.animalPrice(breed).price)));
  img.x = text.getBounds().left - 25;

}

export {
  animalMoney,
  animals,
  updateAnimalPrices,
  getDiamondPrice
}
