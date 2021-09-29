import { shortNum } from "../../../general/basic";
import Shop from "../../../scenes/Modal/Shop/Main";

const BASIC_DIAMONDS: number[] = [1, 10, 50, 100, 500, 1000];
export default class MoneyWindow {
  public scene: Shop;
  private animal: string;

  constructor(scene: Shop) {
    this.scene = scene;
    this.init();
    this.create();
  }

  private init(): void {
    this.animal = this.scene.state.farm.toLowerCase();
    if (this.animal === 'unicorn') this.animal = 'event';
  }

  private create(): void {
    const rows: number = Math.ceil(BASIC_DIAMONDS.length / 2);
    const height: number = rows * 270 + 40;
    this.scene.scrolling.bottom = this.scene.height - this.scene.heightWindow + height;
  
    for (let i: number = 0; i < rows; i++) {
      const y: number = i * 270 + 40 + this.scene.height;
      const left: number = BASIC_DIAMONDS[i * 2];
      const right: number = BASIC_DIAMONDS[i * 2 + 1];
      this.createPack(left, { x: 0, y: y});
      if (right) this.createPack(right, { x: 240, y: y });
    }
  }

  private createPack(diamonds: number, position: Iposition) {
    const pack: Phaser.GameObjects.Sprite = this.scene.add.sprite(position.x, position.y, `${this.animal}-money-package`).setOrigin(0);
    this.scene.click(pack, (): void => { this.convert(diamonds) });
    if (this.checkActiveSale()) {
      const count1: string = String(shortNum(this.scene.game.scene.keys[this.scene.state.farm].convertDiamonds(diamonds)));
      const count2: string = String(shortNum(this.scene.game.scene.keys[this.scene.state.farm].convertDiamonds(2 * diamonds)));
      const text1 = this.scene.add.text(position.x + 110, position.y + 135, count1, {
        font: '35px Shadow',
        color: '#ddd',
      }).setOrigin(0.5);
      const text2 = this.scene.add.text(position.x + 110, position.y + 170, count2, {
        font: '40px Shadow',
        color: '#FFFFFF',
      }).setOrigin(0.5);

      this.scene.add.tileSprite(text1.x, text1.y, text1.displayWidth + 7, 5, 'white-pixel').setTint(0xFF4A2C).setAngle(5).setOrigin(0.5);
    } else {
      const count: string = String(shortNum(this.scene.game.scene.keys[this.scene.state.farm].convertDiamonds(diamonds)));
      this.scene.add.text(position.x + 110, position.y + 160, count, { font: '40px Shadow', color: '#FFFFFF' }).setOrigin(0.5);
    }
    const btn = this.scene.shopButton(position.x + 110, position.y + 223, diamonds, 'diamond');
    this.scene.clickShopBtn(btn, (): void => { this.convert(diamonds) });
  }

  private checkActiveSale(): boolean {
    const saleName: string = `${this.scene.state.farm.toUpperCase()}_MONEY`; 
    return this.scene.state.sales.some(el => el.type === saleName && el.startTime <= 0 && el.endTime > 0); 
  }

  private convert(side: number) {
    this.scene.state.convertor = {
      fun: 0,
      count: side,
      diamonds: side,
      type: 1
    };
    this.scene.game.scene.keys[this.scene.state.farm].exchange();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
    this.scene.scene.stop('ShopBars');
    this.scene.scene.stop('Modal');
  }
}