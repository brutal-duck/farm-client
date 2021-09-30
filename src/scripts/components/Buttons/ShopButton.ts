import Button, { scenesType, childrenType } from './Button';
interface IshopButtonIcon {
  texture: string;
  scale: number;
};
interface IshopButtonElements {
  text1?: string;
  text2?: string;
  img?: IshopButtonIcon;
};

const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontSize: '28px',
  fontFamily: 'Shadow',
  color: '#FFFFFF',
};

const text2Style: Phaser.Types.GameObjects.Text.TextStyle = {
  fontSize: '20px',
  fontFamily: 'Shadow',
  color: '#eeeeee',
};

export default class ShopButton extends Button {
  private text1: Phaser.GameObjects.Text;
  private text2: Phaser.GameObjects.Text;
  private tile: Phaser.GameObjects.TileSprite;
  private img: Phaser.GameObjects.Sprite;
  constructor(scene: scenesType, position: Iposition, action: () => void, elements: IshopButtonElements) {
    super(scene, position, action);
    this.createChildren(elements);
  }

  protected init(): void {
    super.init();
  }

  private createChildren(elements: IshopButtonElements): void {
    this.mainSprite = this.scene.add.sprite(this.position.x, this.position.y, 'shop-btn');
    this.mainSprite.setInteractive();
    const textX = elements.img ? this.position.x += 20 : this.position.x;
    this.text1 = this.scene.add.text(textX, this.position.y - 5, elements.text1, textStyle).setOrigin(0.5);
    this.img = this.scene.add.sprite(this.text1.getBounds().left - 25, this.position.y - 5, elements.img.texture).setScale(elements.img.scale);
    if (elements.text2) {
      this.text2 = this.scene.add.text(0, this.position.y - 5, elements.text2, textStyle).setOrigin(0, 0.5).setFontSize(25);
      this.img.setScale(elements.img.scale - elements.img.scale * 0.15);
      this.text1.setStyle(text2Style);
      const width = (this.text1.displayWidth + this.text2.displayWidth + this.img.displayWidth + 10) / 2;
      this.img.setX(this.position.x - width);
      this.text1.setOrigin(0, 0.5).setX(this.img.getBounds().right + 3);
      this.text2.setX(this.text1.getBounds().right + 3);
      this.tile = this.scene.add.tileSprite(this.text1.x + this.text1.displayWidth / 2, this.text1.y, this.text1.displayWidth, 4, 'text-sale').setAngle(5).setOrigin(0.5);
      this.add(this.text2);
      this.add(this.tile);
    }
    this.add(this.text1);
    this.add(this.img);
    this.setClickListener();
  }

  private updateText(): void {

  }

  public setText(text1: string, text2: string): void {
    this.text1.setText(text1)
    if (text2) {
      if (this.text2) {
        this.text2.setText(text2).setFontSize(25);
      } else {
        this.text2 = this.scene.add.text(0, this.position.y - 5, text2, textStyle).setOrigin(0, 0.5).setFontSize(25);
        this.img.setScale(this.img.scale - this.img.scale * 0.15);
        this.tile = this.scene.add.tileSprite(this.text1.x + this.text1.displayWidth / 2, this.text1.y, this.text1.displayWidth, 4, 'text-sale').setAngle(5).setOrigin(0.5);
      }
      this.text1.setStyle(text2Style);
      const width = (this.text1.displayWidth + this.text2.displayWidth + this.img.displayWidth + 10) / 2;
      this.img.setX(this.position.x - width);
      this.text1.setOrigin(0, 0.5).setX(this.img.getBounds().right + 3);
      this.text2.setX(this.text1.getBounds().right + 3);

    } else {
      this.img?.setX(this.text1.getBounds().left - 25);
    }
  }
  
}
