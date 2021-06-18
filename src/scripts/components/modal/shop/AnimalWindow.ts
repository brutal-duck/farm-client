import { shortNum } from "../../../general/basic";
import Shop from "../../../scenes/Modal/Shop/Main";

export default class AnimalWindow {
  private scene: Shop;
  private animal: string
  private resource: string
  public buttons: IshopButtons[];

  constructor(scene: Shop) {
    this.scene = scene;
    this.init();
    this.create();
  }

  private init(): void {
    this.animal = this.scene.state.farm
    this.buttons = [];
    if (this.animal === 'Sheep') this.resource = 'wool'
    else if (this.animal === 'Chicken') this.resource = 'egg'
    else if (this.animal === 'Cow') this.resource = 'milk'
  }

  private create(): void {

    let rows: number = this.scene.state[`${this.animal.toLowerCase()}Settings`][`${this.animal.toLowerCase()}Settings`].length;
    let height: number = rows * 270 + 40;
    this.scene.scrolling.bottom = this.scene.height - this.scene.heightWindow + height;
    
    for (let i: number = 0; i < rows; i++) {

      let y: number = i * 270 + 40;
      this.scene.add.sprite(0, y + this.scene.height, 'animal-shop-bg').setOrigin(0, 0);

      // let sheep: IsheepPoints = this.scene.state.sheepSettings.sheepSettings.find((data: IsheepPoints) => data.breed === i + 1);
      let animal: any = this.scene.state[`${this.animal.toLowerCase()}Settings`][`${this.animal.toLowerCase()}Settings`].find((data: (IsheepPoints | IchickenPoints | IcowPoints)) => data.breed === i + 1);

      // иконка
      if (this.scene.state[`user${this.animal}`].fair + 1 < animal.breed) this.scene.add.sprite(110, y + this.scene.height + 110, `disable-${this.animal.toLowerCase()}`);
      else {

        let sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(110, y + this.scene.height + 110, `${this.animal.toLowerCase()}-stay-right${animal.breed}`);
        if (this.animal === 'Sheep') this.scene.add.sprite(sprite.x, sprite.y, `${this.animal.toLowerCase()}-right-` + (i + 1)  + '-2');
        sprite.anims.play(`${this.animal.toLowerCase()}-stay-right${animal.breed}`, true);

      }

      // описание
      let center: number = y + 110 + this.scene.height;
      let animalName: string = this.scene.state.lang[`${this.animal.toLowerCase()}Breed${animal.breed}`];
      let name: Phaser.GameObjects.Text = this.scene.add.text(240, center, animalName, {
        font: '28px Shadow',
        fill: '#FFFFFF',
        align: 'left',
        wordWrap: { width: 230 }
      }).setOrigin(0, 0.5);
      let boundsName = name.getBounds();

      let resourcePriceText: string = this.scene.state.lang[`${this.resource}Price`];
      let resource: Phaser.GameObjects.Text = this.scene.add.text(240, center, resourcePriceText, {
        font: '20px Shadow',
        fill: '#FFFFFF'
      }).setOrigin(0, 0.5);
      let resourceBounds = resource.getBounds();
      
      let price: string = ''
      if (this.animal === 'Sheep') price = String(shortNum(animal.long_wool))
      else if (this.animal === 'Chicken') price = String(shortNum(animal.eggPrice))
      else if (this.animal === 'Cow') price = String(shortNum(animal.maxMilkVolume))

      let resourcePrice: Phaser.GameObjects.Text = this.scene.add.text(resourceBounds.right, center, price, {
        font: '20px Shadow',
        fill: '#ECC896'
      }).setOrigin(0, 0.5);

      // кнопка покупки
      let heightBtn: number = 0;
      let btn: any = false;
      
      if (animal.breed <= this.scene.state[`user${this.animal}`].fair - this.scene.state[`${this.animal.toLowerCase()}Settings`][`buyBetterBreed${this.animal}`] || animal.breed === 1) {

        let price: string = String(shortNum(this.scene[`${this.animal.toLowerCase()}Price`](animal.breed).price));
        
        btn = this.scene.shopButton(330, center, price, `${this.animal.toLowerCase()}Coin`);
        this.scene.clickShopBtn(btn, (): void => {

          let result: boolean = this.scene.game.scene.keys[this.scene.state.farm][`buy${this.animal}`](animal.breed, true);
          if (result) this.updatePrices();

        });

        this.buttons.push({
          text: btn.title,
          breed: animal.breed,
          img: btn.img
        });

        heightBtn = btn.btn.height;

      }
      
      let height: number = heightBtn + boundsName.height + resourceBounds.height + 20;
      name.y -= height / 2 - (boundsName.height / 2);
      resource.y -= height / 2 - boundsName.height - (resourceBounds.height / 2) - 5;
      resourcePrice.y = resource.y;

      if (btn) {
        btn.btn.y += height / 2 - (heightBtn / 2);
        btn.title.y += height / 2 - (heightBtn / 2);
        btn.img.y += height / 2 - (heightBtn / 2);
      }

    }

  }


  private updatePrices(): void {

    for (let i in this.buttons) {
      
      this.buttons[i].text.setText(String(shortNum(this.scene[`${this.animal.toLowerCase()}Price`](this.buttons[i].breed).price)));
      this.buttons[i].img.x = this.buttons[i].text.getBounds().left - 25;
  
    }
  
  }

}