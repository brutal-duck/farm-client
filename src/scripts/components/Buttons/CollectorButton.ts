import Button from './Button';
import Shop from './../../scenes/Modal/Shop/Main';

export default class CollectorButton extends Button {
  private settings: IcollectorButtonSetting;
  private texture: string = 'boost-btn';
  private leftTextColor: string = '#0A7A26';
  private rightTextColor: string = '#FFFFFF';
  private icon: string = 'diamond';

  constructor(scene: Shop, position: Iposition, action: () => void, settings: IcollectorButtonSetting) {
    super(scene, position, action);
    this.settings = settings;
    this.initType();
    this.createChildren();
    if (action) this.setClickListener();
  }

  private initType(): void {
    switch (this.settings.type) {
      case 'lock': 
        this.texture = 'boost-btn-disable';
        this.leftTextColor = '#3D3D3D';
        this.rightTextColor = '#3D3D3D';
        this.icon = 'lock';
        break;
      case 'lock-ad':
        this.texture = 'boost-btn-disable';
        this.icon = 'ad-icon';
        this.leftTextColor = '#3D3D3D';
        this.rightTextColor = '#3D3D3D';
        break;
      case 'ad':
        this.texture = 'boost-btn-ad';
        this.icon = 'ad-icon';
        this.leftTextColor = '#FFFFFF';
        break;
      case 'lock-ad-diamond':
        this.texture = 'boost-btn-disable';
        this.leftTextColor = '#3D3D3D';
        this.rightTextColor = '#3D3D3D';
        break;
      case 'ad-diamond':
        this.texture = 'boost-btn-ad';
        this.leftTextColor = '#FFFFFF';
        break;
      case 'free-lock':
        this.texture = 'boost-btn-disable';
        this.leftTextColor = '#3D3D3D';
        this.rightTextColor = '#3D3D3D';
        break;
    }
  }

  private createChildren(): void {
    this.mainSprite = this.scene.add.sprite(this.position.x, this.position.y, this.texture);
    this.mainSprite.setInteractive();
    const leftTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '30px',
      fontFamily: 'Shadow',
      color: this.leftTextColor
    };

    const leftLittleStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '20px',
      fontFamily: 'Shadow',
      color: this.leftTextColor
    };

    const rightTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '30px',
      fontFamily: 'Shadow',
      color: this.rightTextColor
    };

    const btnGeom: Phaser.Geom.Rectangle = this.mainSprite.getBounds();
    const leftText = this.scene.add.text(btnGeom.left + 20, this.position.y - 4, this.settings.left, leftTextStyle).setOrigin(0, 0.5);
  
    const leftBound: number = leftText.getBounds().right + 2;
    const leftLittle = this.scene.add.text(leftBound, this.position.y - 1, `${this.settings.leftLitleText}.`, leftLittleStyle).setOrigin(0, 0.5);
  
    const rightText = this.scene.add.text(btnGeom.right - 20, this.position.y - 4, this.settings.right, rightTextStyle).setOrigin(1, 0.5);
    if (this.settings.type === 'lock') rightText.setX(btnGeom.right - 10).setFontSize(26);
    const iconX: number = rightText.getBounds().left - 5;
    const img: Phaser.GameObjects.Sprite = this.scene.add.sprite(iconX, this.position.y - 4, this.icon).setOrigin(1, 0.5);
    if (this.settings.type !== 'lock-ad' && this.settings.type !== 'ad') img.setScale(0.13);
    else img.setScale(0.7);
  
    if (this.settings.type === 'free' || this.settings.type === 'free-lock' || this.settings.type === 'free-diamond') img.setVisible(false);
    
    if (this.settings.sale) {
      const sale = this.scene.add.text(btnGeom.right - 15, this.position.y - 4, this.settings.sale, rightTextStyle).setOrigin(1, 0.5);
      rightText.setFontSize(25);

      const width = sale.displayWidth + rightText.displayWidth + img.displayWidth;
      const maxWidth: number = 80;
      if (width > maxWidth) {
        sale.setFontSize(25).setX(btnGeom.right - 10);
        rightText.setFontSize(20);
        img.setScale(img.scale - img.scale * 0.15);
      }

      rightText.setX(sale.getBounds().left - 3);
      img.setOrigin(1, 0.5).setX(rightText.getBounds().left - 3);
      const tile = this.scene.add.tileSprite(rightText.getCenter().x, rightText.y, rightText.displayWidth, 4, 'text-sale').setAngle(5).setOrigin(0.5);
      this.add(sale);
      this.add(tile);
    }
    this.add(leftText);
    this.add(leftLittle);
    this.add(rightText);
    this.add(img);
  }
};
