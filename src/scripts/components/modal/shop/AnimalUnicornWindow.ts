import { shortNum } from "../../../general/basic";
import BigInteger from "../../../libs/BigInteger";
import Shop from "../../../scenes/Modal/Shop/Main";

export default class AnimalUnicornWindow {
  private scene: Shop;
  public buttons: IshopButtons[];

  constructor(scene: Shop) {
    this.scene = scene;
    this.buttons = [];
    this.create();
  }

  private create(): void {

    let rows: number = this.scene.state.unicornSettings.unicornSettings.length;
    let height: number = rows * 270 + 40;
    this.scene.scrolling.bottom = this.scene.height - this.scene.heightWindow + height;
    
    for (let i: number = 0; i < rows; i++) {

      let y: number = i * 270 + 40;
      this.scene.add.sprite(0, y + this.scene.height, 'animal-shop-bg').setOrigin(0, 0);

      let animal: IeventPoints = this.scene.state.unicornSettings.unicornSettings.find((data: IeventPoints) => data.breed === i + 1);

      // иконка
      if (this.scene.state.userUnicorn.maxLevelAnimal < animal.breed) {
        this.scene.add.sprite(110, y + this.scene.height + 110, 'disable-animal');
      } else {

        this.scene.add.sprite(110, y + this.scene.height + 110, 'animal' + animal.breed);

      }

      // описание
      let center: number = y + 110 + this.scene.height;
      
      let animalName: string = this.scene.state.lang['eventBreed' + animal.breed];
      let name: Phaser.GameObjects.Text = this.scene.add.text(240, center, animalName, {
        font: '28px Shadow',
        fill: '#FFFFFF',
        align: 'left',
        wordWrap: { width: 230 }
      }).setOrigin(0, 0.5);
      let boundsName = name.getBounds();

      let resourcePriceText: string = this.scene.state.lang.resourcePrice;

      let resource: Phaser.GameObjects.Text = this.scene.add.text(240, center, resourcePriceText, {
        font: '20px Shadow',
        fill: '#FFFFFF'
      }).setOrigin(0, 0.5);
      let boundsResource = resource.getBounds();
      
      let resourcePrice: Phaser.GameObjects.Text = this.scene.add.text(boundsResource.right, center, String(shortNum(BigInteger.divide(animal.resourcePrice, String(10)))), {
        font: '20px Shadow',
        fill: '#ECC896'
      }).setOrigin(0, 0.5);

      // кнопка покупки
      let heightBtn: number = 0;
      let btn: any = false;
      if (animal.breed <= this.scene.state.userUnicorn.maxLevelAnimal - 4 || animal.breed === 1) {

        let price: string = String(shortNum(this.scene.animalPrice(animal.breed).price));
        
        btn = this.scene.shopButton(330, center, price, 'unicornCoin');
        this.scene.clickShopBtn(btn, (): void => {

          let result: boolean = this.scene.game.scene.keys[this.scene.state.farm].buyAnimal(animal.breed, true);
          if (result) this.scene.updatePrices({text: btn.title, breed: animal.breed, img: btn.img});

        });

        this.buttons.push({
          text: btn.title,
          breed: animal.breed,
          img: btn.img
        });

        heightBtn = btn.btn.height;

      } else if (animal.breed <= this.scene.state.userUnicorn.maxLevelAnimal - 3 || animal.breed === 2 && this.scene.state.userUnicorn.maxLevelAnimal > 2) {

        const diamondPrice = this.getDiamondPrice(4, animal.breed);

        if (this.scene.state.readyAd && this.scene.state.userUnicorn.timeToAd <= 0) {
          
          btn = this.scene.shopButton(330, center,  this.scene.state.lang.pickUp, 'ad-icon');
          this.scene.clickShopBtn(btn, (): void => {
            if (this.scene.game.scene.keys[this.scene.state.farm].getFreeBoostPositions().length > 0) {
              this.scene.game.scene.keys[this.scene.state.farm].watchAd(4);
              this.scene.stop('Shop');
              this.scene.stop('ShopBars');
              this.scene.stop('Modal');
              this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
            } else {
              this.scene.stop('Shop');
              this.scene.stop('ShopBars');
              this.scene.stop('Modal');
    
              let modal: Imodal = {
                type: 1,
                sysType: 3,
                height: 150,
                message: this.scene.state.lang.maxEventCount
              }
              this.scene.state.modal = modal;
              this.scene.launch('Modal', this.scene.state);
            }

          });
    
        } else {

          btn = this.scene.shopButton(330, center, String(diamondPrice), 'diamond');
          this.scene.clickShopBtn(btn, (): void => {
    
            this.scene.game.scene.keys[this.scene.state.farm].buyAnimal(animal.breed, true, diamondPrice);
    
          });

        }
        

        this.buttons.push({
          text: btn.title,
          breed: animal.breed,
          img: btn.img
        });

        heightBtn = btn.btn.height;

      } else if (animal.breed <= this.scene.state.userUnicorn.maxLevelAnimal - 2 || animal.breed === 3 && this.scene.state.userUnicorn.maxLevelAnimal > 3) {

        const diamondPrice = this.getDiamondPrice(2, animal.breed);
        
        btn = this.scene.shopButton(330, center, String(diamondPrice), 'diamond');
        this.scene.clickShopBtn(btn, (): void => {

          this.scene.game.scene.keys[this.scene.state.farm].buyAnimal(animal.breed, true, diamondPrice);

        });

        this.buttons.push({
          text: btn.title,
          breed: animal.breed,
          img: btn.img
        });

        heightBtn = btn.btn.height;

      } else if (animal.breed <= this.scene.state.userUnicorn.maxLevelAnimal - 1 || animal.breed === 4 && this.scene.state.userUnicorn.maxLevelAnimal > 4) {

        const diamondPrice = this.getDiamondPrice(1, animal.breed);
        
        btn = this.scene.shopButton(330, center, String(diamondPrice), 'diamond');
        this.scene.clickShopBtn(btn, (): void => {

          this.scene.game.scene.keys[this.scene.state.farm].buyAnimal(animal.breed, true, diamondPrice);

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


  private updatePrices({text, breed, img}): void {

    text.setText(String(shortNum(this.scene.animalPrice(breed).price)));
    img.x = text.getBounds().left - 25;
  
  }


  private getDiamondPrice(devisor, breed): number {
    const lvl: number = 60;
    let diamondPrice: number = 40;
    let multiply: number = 1 + Math.floor((breed - lvl) / 5) 
    let inc: number = 5;
    if (breed > lvl) {
      diamondPrice += inc * multiply;
    }
    return Math.round(diamondPrice / devisor);
  }

}