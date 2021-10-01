import { shortNum } from "../../../general/basic";
import Shop from "../../../scenes/Modal/Shop/Main";
import ShopButton from './../../Buttons/ShopButton';
import Utils from './../../../libs/Utils';

export default class AnimalWindow {
  private scene: Shop;
  private animal: string;
  private resource: string;
  public buttons: IshopButtons[];

  constructor(scene: Shop) {
    this.scene = scene;
    this.init();
    this.create();
  }

  private init(): void {
    this.animal = this.scene.state.farm;
    this.buttons = [];
    if (this.animal === 'Sheep') this.resource = 'wool';
    else if (this.animal === 'Chicken') this.resource = 'egg';
    else if (this.animal === 'Cow') this.resource = 'milk';
  }

  private create(): void {
    const rows: number = this.scene.state[`${this.animal.toLowerCase()}Settings`][`${this.animal.toLowerCase()}Settings`].length;
    let height: number = rows * 270 + 40;
    this.scene.scrolling.bottom = this.scene.height - this.scene.heightWindow + height;
    
    for (let i: number = 0; i < rows; i++) {

      const y: number = i * 270 + 40;
      this.scene.add.sprite(0, y + this.scene.height, 'animal-shop-bg').setOrigin(0, 0);

      // let sheep: IsheepPoints = this.scene.state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === i + 1);
      let animal: any = this.scene.state[`${this.animal.toLowerCase()}Settings`][`${this.animal.toLowerCase()}Settings`].find((data: (IsheepPoints | IchickenPoints | IcowPoints)) => data.breed === i + 1);

      // иконка
      if (this.scene.state[`user${this.animal}`].fair + 1 < animal.breed) this.scene.add.sprite(110, y + this.scene.height + 110, `disable-${this.animal.toLowerCase()}`);
      else {
        const sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(110, y + this.scene.height + 110, `${this.animal.toLowerCase()}-stay-right${animal.breed}`);
        if (this.animal === 'Sheep') this.scene.add.sprite(sprite.x, sprite.y, `${this.animal.toLowerCase()}-right-` + (i + 1)  + '-2');
        sprite.anims.play(`${this.animal.toLowerCase()}-stay-right${animal.breed}`, true);
      }

      // описание
      const center: number = y + 110 + this.scene.height;
      const animalName: string = this.scene.state.lang[`${this.animal.toLowerCase()}Breed${animal.breed}`];
      const name: Phaser.GameObjects.Text = this.scene.add.text(240, center, animalName, {
        font: '28px Shadow',
        fill: '#FFFFFF',
        align: 'left',
        wordWrap: { width: 230 }
      }).setOrigin(0, 0.5);
      const boundsName = name.getBounds();

      const resourcePriceText: string = this.scene.state.lang[`${this.resource}Price`];
      const resource: Phaser.GameObjects.Text = this.scene.add.text(240, center, resourcePriceText, {
        font: '20px Shadow',
        fill: '#FFFFFF'
      }).setOrigin(0, 0.5);
      const resourceBounds = resource.getBounds();
      
      let price: string = '';

      if (this.animal === 'Sheep') price = String(shortNum(animal.long_wool));
      else if (this.animal === 'Chicken') price = String(shortNum(animal.eggPrice));
      else if (this.animal === 'Cow') price = String(shortNum(animal.maxMilkVolume));

      const resourcePrice: Phaser.GameObjects.Text = this.scene.add.text(resourceBounds.right, center, price, {
        font: '20px Shadow',
        fill: '#ECC896'
      }).setOrigin(0, 0.5);

      // кнопка покупки
      let heightBtn: number = 0;
      let btn: ShopButton;
      
      const fairLevel: number = this.scene.state[`user${this.animal}`].fair;
      const buyBetterBreed: number = this.scene.state[`${this.animal.toLowerCase()}Settings`][`buyBetterBreed${this.animal}`]
      if (animal.breed <= fairLevel - buyBetterBreed || animal.breed === 1) {
        const price: string = String(shortNum(this.scene[`${this.animal.toLowerCase()}Price`](animal.breed).price));
        const halfPrice: string = String(shortNum(Math.round(this.scene[`${this.animal.toLowerCase()}Price`](animal.breed).price / 2)))
        btn = new ShopButton(this.scene, { x: 330, y: center }, (): void => {
          const result: boolean = this.scene.game.scene.keys[this.scene.state.farm][`buy${this.animal}`](animal.breed, true);
          if (result) this.updatePrices();
        }, { 
          img: {
            texture: `${this.animal.toLowerCase()}Coin`,
            scale: 0.15,
          }, 
          text1: price,
          text2: Utils.checkSale(this.scene.state.sales,`${this.scene.state.farm.toUpperCase()}_PRICE`) ? halfPrice : null,
        });
        heightBtn = btn.height;
        this.buttons.push({
          btn: btn,
          breed: animal.breed,
        });
      }
      
      let height: number = heightBtn + boundsName.height + resourceBounds.height + 20;
      name.y -= height / 2 - (boundsName.height / 2);
      resource.y -= height / 2 - boundsName.height - (resourceBounds.height / 2) - 5;
      resourcePrice.y = resource.y;

      if (btn) {
        btn.y += height / 2 - (heightBtn / 2);
      }

    }
  }
  
  private updatePrices(): void {
    for (const btn of this.buttons) {
      const text1 = String(shortNum(this.scene[`${this.animal.toLowerCase()}Price`](btn.breed).price));
      const text2 = String(shortNum(Math.round(this.scene[`${this.animal.toLowerCase()}Price`](btn.breed).price / 2)));
      const shopButton: ShopButton = btn.btn;
      shopButton.setText(text1, Utils.checkSale(this.scene.state.sales,`${this.scene.state.farm.toUpperCase()}_PRICE`) ? text2 : null);
    }
  }

}