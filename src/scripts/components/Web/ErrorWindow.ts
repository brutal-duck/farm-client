import Boot from "../../scenes/Boot";
import SheepPreload from './../../scenes/Sheep/SheepPreload';
import ChickenPreload from './../../scenes/Chicken/ChickenPreload';
import CowPreload from './../../scenes/Cow/CowPreload';

export default class ErrorWindow {
  public scene: Boot | SheepPreload | ChickenPreload | CowPreload;

  constructor(scene: Boot | SheepPreload | ChickenPreload | CowPreload) {
    this.scene = scene;
    this.create();
  }

  private create(): void {
    const bg: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 20, 614, 240, 'mid-syst');
    this.scene.add.sprite(bg.x - 1, bg.getTopCenter().y + 1, 'header-syst').setOrigin(0.5, 1);
    this.scene.add.sprite(bg.x, bg.getBottomCenter().y - 1, 'bottom-syst').setOrigin(0.5, 0);

    this.scene.add.text(bg.x, bg.y - 10, this.scene.state.lang.unknownError, { font: 'Bold 30px Shadow', color: '#925C28', align: 'center', wordWrap: { width: 400 } }).setOrigin(0.5, 1).setLineSpacing(8).setDepth(bg.depth + 1);
    
    const btn = this.shopButton(bg.x, bg.y + 80, this.scene.state.lang.reload);
    btn.btn.setScale(1.8);
    btn.title.setFontSize(34);
    this.scene.clickShopBtn(btn, (): void => { window.location.reload(); });
  }

  private shopButton(x: number, y: number, text: string, icon: any = false): any {
    let img: Phaser.GameObjects.Image | boolean = false;
    let btn: Phaser.GameObjects.Image = this.scene.add.image(x, y, 'shop-btn');
  
    let textX: number = x;
    if (icon) textX += 20;
  
    let title: Phaser.GameObjects.Text = this.scene.add.text(textX, y - 5, text, {
      font: '28px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);
  
    if (icon === 'sheepCoin' || icon === 'chickenCoin' || icon === 'diamond' || icon === 'unicornCoin' || icon === 'cowCoin') {
      img = this.scene.add.image(title.getBounds().left - 25, y - 5, icon).setScale(0.15);
    }
  
    if (icon === 'ad-icon') {
      img = this.scene.add.image(title.getBounds().left - 25, y - 5, icon).setScale(0.5);
    }
  
    return {
      btn: btn,
      title: title,
      img: img
    };
  
  }
}