import Boot from "../../scenes/Boot";
import SheepPreload from './../../scenes/Sheep/SheepPreload';
import ChickenPreload from './../../scenes/Chicken/ChickenPreload';
import CowPreload from './../../scenes/Cow/CowPreload';
import UnicornPreload from './../../scenes/Event/Unicorns/UnicornPreload';

export default class ErrorWindow {
  public scene: Boot | SheepPreload | ChickenPreload | CowPreload | UnicornPreload;
  private text: string;

  constructor(scene: Boot | SheepPreload | ChickenPreload | CowPreload | UnicornPreload, text?: string) {
    this.scene = scene;
    this.text = text || this.scene.state.lang.unknownError
    this.create();
  }

  private create(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '37px',
      fontFamily: 'Shadow',
      color: '#F9D48D',
    };

    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontStyle: 'Bold',
      fontSize: '30px',
      fontFamily: 'Shadow',
      color: '#925C28',
      align: 'center',
      wordWrap: { width: 400 },
    };
    
    const bg: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 20, 614, 200, 'mid-syst');
    const bgGeom = bg.getBounds();
    const header = this.scene.add.sprite(bgGeom.centerX - 1, bgGeom.top + 14, 'header-syst').setOrigin(0.5, 1);
    this.scene.add.sprite(bgGeom.centerX - 1, bgGeom.bottom - 1, 'bottom-syst').setOrigin(0.5, 0);

    this.scene.add.text(bgGeom.centerX, header.getBounds().centerY - 6, this.scene.state.lang.error, headerTextStyle).setOrigin(0.5);

    this.scene.add.text(bgGeom.centerX, bgGeom.centerY + 5, this.text, textStyle).setOrigin(0.5, 1).setLineSpacing(8);
    
    const btn = this.shopButton(bg.x, bg.y + 80, this.scene.state.lang.repeat);
    this.scene.clickShopBtn(btn, (): void => { window.location.reload(); });
  }

  private shopButton(x: number, y: number, text: string): any {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '25px',
      fontFamily: 'Shadow',
      color: '#FFFFFF',
    };

    const btn = this.scene.add.sprite(x, y, 'shop-btn').setScale(1.3);
    const title = this.scene.add.text(x, y - 5, text, textStyle).setOrigin(0.5);
    
    return {
      btn: btn,
      title: title,
    };
  }
}