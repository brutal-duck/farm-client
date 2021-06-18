import { shortNum } from "../../../general/basic";
import Shop from "../../../scenes/Modal/Shop/Main";

export default class MoneyWindow {
  public scene: Shop;
  private animal: string

  constructor(scene: Shop) {
    this.scene = scene;
    this.init();
    this.create();
  }

  private init(): void {
    this.animal = this.scene.state.farm.toLowerCase()
    if (this.animal === 'unicorn') this.animal = 'event'
  }

  private create(): void {

    const diamonds: number[] = [1, 10, 50, 100, 500, 1000];
    const rows: number = Math.ceil(diamonds.length / 2);
    const height: number = rows * 270 + 40;
    this.scene.scrolling.bottom = this.scene.height - this.scene.heightWindow + height;
  
    for (let i: number = 0; i < rows; i++) {
  
      const y: number = i * 270 + 40;
      const left: number = diamonds[i * 2];
      const right: number = diamonds[i * 2 + 1];
  
      const pack: Phaser.GameObjects.Sprite = this.scene.add.sprite(0, y + this.scene.height, `${this.animal}-money-package`).setOrigin(0, 0);
      this.scene.click(pack, (): void => { this.convert(left) });
      
      const count: string = String(shortNum(this.scene.game.scene.keys[this.scene.state.farm].convertDiamonds(left)));
  
      this.scene.add.text(110, y + 160 + this.scene.height, count, { font: '40px Shadow', color: '#FFFFFF' }).setOrigin(0.5, 0.5);
  
      const btn = this.scene.shopButton(110, y + 223 + this.scene.height, left, 'diamond');
      this.scene.clickShopBtn(btn, (): void => { this.convert(left) });
  
      if (right) {
  
        const pack: Phaser.GameObjects.Sprite = this.scene.add.sprite(240, y + this.scene.height, `${this.animal}-money-package`).setOrigin(0, 0);
        this.scene.click(pack, (): void => { this.convert(right) });
  
        const count: string = String(shortNum(this.scene.game.scene.keys[this.scene.state.farm].convertDiamonds(right)));
  
        this.scene.add.text(350, y + 160 + this.scene.height, count, {
          font: '40px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);
  
        const btn = this.scene.shopButton(350, y + 223 + this.scene.height, right, 'diamond');
        this.scene.clickShopBtn(btn, (): void => { this.convert(right) });
      }
    }
  }

  private convert(side: number) {
    this.scene.state.convertor = {
      fun: 0,
      count: side,
      diamonds: side,
      type: 1
    }
    this.scene.game.scene.keys[this.scene.state.farm].exchange();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
    this.scene.scene.stop('ShopBars');
    this.scene.scene.stop('Modal');
  }

}