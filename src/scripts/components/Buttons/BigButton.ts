import Button, { scenesType } from "./Button";

export default class BigButton extends Button {
  private textColor: string = '#FFFFFF';
  private btnColor: string;
  private textOrigin: number = 0.5;
  private settings: IbigButtonSetting;
  private scale: number;
  /**
   * 
   * @param scene сцена из списка Modal, Sheep, Chicken, Cow, Profile, Fortune, Shop
   * @param y Смещение по y относительно центра
   * @param action Колбек, если передать null, кнопка не кликабельна
   * @param settings Объект настроек в соответствии с интерфейсом
   * @param scale Необязательный параметр, нужен для уменьшенных кнопок
   */
  constructor(scene: scenesType, y: number, action: () => void, settings: IbigButtonSetting, scale: number = 1) { 
    super(scene, { x: scene.cameras.main.centerX, y: scene.cameras.main.centerY + y }, action);
    this.settings = settings;
    this.scale = scale;
    this.initType();
    this.createChildren();
    if (action) this.setClickListener();
  }

  private initType(): void {
    this.textColor = '#FFFFFF';
    this.btnColor;
    this.textOrigin = 0.5;
    this.btnColor = `big-btn-${this.settings.color}`;
  
    if (this.settings.color === 'grey') this.textColor = '#3D3D3D';
    
    if (this.settings.textAlign === 'left') {
      this.textOrigin = 0;
    }
  }

  private createChildren(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '22px',
      fontFamily: 'Shadow',
      color: this.textColor,
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };
    if (this.settings.color === 'grey') textStyle.shadow = null;
    this.mainSprite = this.scene.add.sprite(this.position.x, this.position.y, this.btnColor).setScale(this.scale);
    const textX = this.settings.textAlign === 'left' ? this.mainSprite.getBounds().left + 30 : this.position.x;
    const title = this.scene.add.text(textX, this.position.y - 5, this.settings.text, 
      textStyle).setDepth(1).setOrigin(this.textOrigin, 0.5);
    this.add(title);

    textStyle.fontSize = '24px';
    if (this.settings.right1) {
      const text1 = this.scene.add.text(575, this.position.y - 5, this.settings.right1.text, textStyle).setDepth(1).setOrigin(1, 0.5);
  
      const img1 = this.scene.add.sprite(570 - text1.displayWidth, this.position.y - 5, this.settings.right1.icon)
        .setOrigin(1, 0.5)
        .setScale(0.9);
  
      if (this.settings.right1.icon !== 'ad-icon') img1.setScale(0.15);
      if (this.settings.right1.icon.includes('clan')) img1.setScale(0.6)
  
      this.add(text1);
      this.add(img1);
      if (this.settings.right1.sale) {
        const sale = this.scene.add.text(0, this.position.y - 5, this.settings.right1.sale, textStyle).setOrigin(1, 0.5);
        const startX = this.mainSprite.getBounds().right - 30;
        sale.setX(startX);
        text1.setOrigin(1, 0.5).setFontSize(20).setX(sale.getBounds().left - 3);
        img1.setOrigin(1, 0.5).setX(text1.getBounds().left - 3);

        const tile = this.scene.add.tileSprite(text1.getCenter().x, text1.y, text1.displayWidth, 4, 'text-sale').setDepth(1).setAngle(5).setOrigin(0.5);
        this.add(sale);
        this.add(tile);
      }
      if (this.settings.right2) {
        const text2 = this.scene.add.text(525 - text1.displayWidth, this.position.y - 5, this.settings.right2.text, textStyle).setDepth(1).setOrigin(1, 0.5);
        const img2 = this.scene.add.sprite(
          520 - text1.displayWidth - text2.displayWidth,
          this.position.y - 5,
          this.settings.right2.icon
        ).setOrigin(1, 0.5).setScale(0.15);
        this.add(text2);
        this.add(img2);
      }
    }
  }


  
};
