import { shortNum } from "../../../general/basic";
import Shop from "../../../scenes/Modal/Shop/Main";

export default class MoneyWindow {
  public scene: Shop;
  private animal: string

  constructor(scene: Shop) {
    this.scene = scene;
    this.animal = this.scene.state.farm.toLowerCase()
    if (this.animal === 'unicorn') this.animal = 'event'
    this.create();
  }

  private create(): void {

    let diamonds: number[] = [1, 10, 50, 100, 500, 1000];
    let rows: number = Math.ceil(diamonds.length / 2);
    let height: number = rows * 270 + 40;
    this.scene.scrolling.bottom = this.scene.height - this.scene.heightWindow + height;
  
    for (let i: number = 0; i < rows; i++) {
  
      let y: number = i * 270 + 40;
      let left: number = diamonds[i * 2];
      let right: number = diamonds[i * 2 + 1];
  
      let pack: Phaser.GameObjects.Sprite = this.scene.add.sprite(0, y + this.scene.height, `${this.animal}-money-package`).setOrigin(0, 0);
      this.scene.click(pack, (): void => {
  
        this.scene.state.convertor = {
          fun: 0,
          count: left,
          diamonds: left,
          type: 1
        }
        this.scene.game.scene.keys[this.scene.state.farm].exchange();
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
        this.scene.scene.stop('ShopBars');
        this.scene.scene.stop('Modal');
      });
      
      let count: string = String(shortNum(this.scene.game.scene.keys[this.scene.state.farm].convertDiamonds(left)));
  
      this.scene.add.text(110, y + 160 + this.scene.height, count, { font: '40px Shadow', color: '#FFFFFF' }).setOrigin(0.5, 0.5);
  
      let btn = this.scene.shopButton(110, y + 223 + this.scene.height, left, 'diamond');
      this.scene.clickShopBtn(btn, (): void => {
        
        this.scene.state.convertor = {
          fun: 0,
          count: left,
          diamonds: left,
          type: 1
        }
        this.scene.game.scene.keys[this.scene.state.farm].exchange();
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.scene.stop();
        this.scene.scene.stop('ShopBars');
        this.scene.scene.stop('Modal');
      });
  
      if (right) {
  
        let pack: Phaser.GameObjects.Sprite = this.scene.add.sprite(240, y + this.scene.height, `${this.animal}-money-package`).setOrigin(0, 0);
        this.scene.click(pack, (): void => {
  
          this.scene.state.convertor = {
            fun: 0,
            count: right,
            diamonds: right,
            type: 1
          }
          this.scene.game.scene.keys[this.scene.state.farm].exchange();
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
          this.scene.scene.stop();
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');
        });
  
        let count: string = String(shortNum(this.scene.game.scene.keys[this.scene.state.farm].convertDiamonds(right)));
  
        this.scene.add.text(350, y + 160 + this.scene.height, count, {
          font: '40px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);
  
        let btn = this.scene.shopButton(350, y + 223 + this.scene.height, right, 'diamond');
        this.scene.clickShopBtn(btn, (): void => {
  
          this.scene.state.convertor = {
            fun: 0,
            count: right,
            diamonds: right,
            type: 1
          }
          this.scene.game.scene.keys[this.scene.state.farm].exchange();
          this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
          this.scene.scene.stop();
          this.scene.scene.stop('ShopBars');
          this.scene.scene.stop('Modal');
        });
      }
    }
  }
}