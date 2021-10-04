import Button from './Button';
import Shop from './../../scenes/Modal/Shop/Main';
import Sheep from './../../scenes/Sheep/Main';
import Chicken from './../../scenes/Chicken/Main';
import Cow from './../../scenes/Cow/Main';

type Scenes = Shop | Sheep | Chicken | Cow

export default class BoostButton extends Button {
  private settings: IboostButtonSetting;
  private texture: string = 'improve-collector';
  private icon: string = 'diamond';
  constructor(scene: Scenes, position: Iposition, action: () => void, settings: IboostButtonSetting) {
    super(scene, position, action);
    this.settings = settings;
    this.createChildren();
    if (action) this.setClickListener();
  }

  private createChildren(): void {
    this.mainSprite = this.scene.add.sprite(this.position.x, this.position.y, this.texture);
    this.mainSprite.setInteractive();

    const btnTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '23px',
      fontFamily: 'Shadow',
      color: '#ffffff',
      stroke: '#3B5367',
      strokeThickness: 4,
    };
    const textY: number = this.position.y - 5;
    const btnGeom: Phaser.Geom.Rectangle = this.mainSprite.getBounds();
    const leftText = this.scene.add.text(this.position.x, textY, this.settings.left, btnTextStyle).setOrigin(0.5);
  
    if (this.settings.right) {
      const rightText = this.scene.add.text(0, textY, this.settings.right, btnTextStyle).setOrigin(0, 0.5);
      const img: Phaser.GameObjects.Sprite = this.scene.add.sprite(0, textY, this.icon).setOrigin(0, 0.5).setScale(0.11);
      
      if (this.settings.sale) {
        const sale = this.scene.add.text(btnGeom.right - 15, textY, this.settings.sale, btnTextStyle).setFontSize(22).setOrigin(0, 0.5);
        leftText.setFontSize(22);
        rightText.setFontSize(18);
        img.setScale(0.1)
        const width = (leftText.displayWidth + sale.displayWidth + rightText.displayWidth + img.displayWidth) / 2;
        
        leftText.setOrigin(0, 0.5);
        leftText.setX(this.position.x - width);
        img.setX(leftText.getBounds().right);
        rightText.setX(img.getBounds().right);
        sale.setX(rightText.getBounds().right);
        const tile = this.scene.add.tileSprite(rightText.getCenter().x, rightText.y, rightText.displayWidth, 4, 'text-sale').setAngle(5).setOrigin(0.5);
        this.add(sale);
        this.add(tile);
      } else {
        const width = (leftText.displayWidth + rightText.displayWidth + img.displayWidth + 6) / 2;

        leftText.setOrigin(0, 0.5);
        leftText.setX(this.position.x - width);
        img.setX(leftText.getBounds().right + 3);
        rightText.setX(img.getBounds().right + 3);
      }

      this.add(img);
      this.add(rightText);
    }
    this.add(leftText);
  }
} 