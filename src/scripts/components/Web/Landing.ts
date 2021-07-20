import Boot from "../../scenes/Boot";

export default class Landing {
  public scene: Boot;

  private bg: Phaser.GameObjects.TileSprite
  private bgTop: Phaser.GameObjects.Sprite
  private bgBot: Phaser.GameObjects.Sprite

  private wellcome: Phaser.GameObjects.Text
  private btn: { btn: Phaser.GameObjects.Sprite, title: Phaser.GameObjects.Text }
  private yourAcc: Phaser.GameObjects.Text
  private enterAcc: Phaser.GameObjects.Text
  private underline: Phaser.GameObjects.TileSprite
  private clickZone: Phaser.GameObjects.TileSprite
  private agreement: Phaser.GameObjects.Text
  private agreementUnderline: Phaser.GameObjects.TileSprite
  private agreementClickZone: Phaser.GameObjects.TileSprite
  private elements: modalElementType[]

  constructor(scene: Boot) {
    this.scene = scene;
    this.create();
  }


  private create(): void {
    this.bg = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 20, 614, 420, 'mid-syst')

    this.btn = this.scene.shopButton(this.bg.x, this.bg.y, this.scene.state.lang.play);
    this.btn.btn.setScale(1.5);
    this.btn.title.setFontSize(38);
    this.scene.clickShopBtn(this.btn, (): void => {
      this.scene.playBtnHandler();
    })

    this.wellcomeText();
    this.enterYourAccountText();
    this.agreementText();
    this.topAndBottomBgSides();

    this.elements = [
      this.bg,
      this.bgTop,
      this.bgBot,
      this.btn.btn,
      this.btn.title,
      this.wellcome,
      this.yourAcc,
      this.enterAcc,
      this.underline,
      this.clickZone,
      this.agreement,
      this.agreementUnderline,
      this.agreementClickZone
    ];
  }

  private wellcomeText(): void {
    this.wellcome = this.scene.add.text(this.bg.x, this.bg.y - 100, this.scene.state.lang.welcomeToFarm, { font: 'Bold 40px Shadow', color: '#925C28', align: 'center', wordWrap: { width: 500 } }).setOrigin(0.5, 1).setDepth(this.bg.depth + 1);
  }

  
  private enterYourAccountText(): void {
    this.yourAcc = this.scene.add.text(this.bg.x, this.bg.y + 100, this.scene.state.lang.yourAccaunt, { font: 'Bold 30px Shadow', color: '#925C28', align: 'right', wordWrap: { width: 500 } }).setOrigin(0.5, 0).setLineSpacing(8).setDepth(this.bg.depth + 1);
    this.enterAcc = this.scene.add.text(this.bg.x - 76, this.bg.y + 100, this.scene.state.lang.enterTo, { font: 'Bold 30px Shadow', color: '#05b23f' }).setOrigin(1, 0).setDepth(this.bg.depth + 1);
    this.underline = this.scene.add.tileSprite(this.enterAcc.x - 2, this.enterAcc.y + this.enterAcc.getBounds().height - 3, this.enterAcc.width - 2, 2, 'pixel-landing').setOrigin(1, 0).setTint(0x05b23f).setDepth(this.bg.depth + 1);
    this.clickZone = this.scene.add.tileSprite(this.enterAcc.x + 5, this.enterAcc.y - 5, this.enterAcc.width + 10, this.enterAcc.height + 10, 'pixel-landing').setAlpha(0.0001).setOrigin(1, 0).setDepth(this.bg.depth + 2).setInteractive();
    
    this.clickZone.on('pointerover', (): void => {
      this.enterAcc.setColor('#85AF7C');
      this.underline.setTint(0x85AF7C);
    })

    this.clickZone.on('pointerout', (): void => {
      this.enterAcc.setColor('#05b23f');
      this.underline.setTint(0x05b23f);
    })

    this.scene.click(this.clickZone, (): void => {
      this.scene.createAuthorizationWindow();
    })
  }


  private agreementText(): void {
    const agreementText: string = this.scene.state.lang.agreement.replace('\n', ' ');
    this.agreement = this.scene.add.text(this.bg.x, this.bg.getBottomCenter().y + 10, agreementText, { font: '24px Shadow', color: '#777777' }).setOrigin(0.5, 0).setDepth(this.bg.depth + 1);
    this.agreementUnderline = this.scene.add.tileSprite(this.agreement.x - 1, this.agreement.y + this.agreement.getBounds().height - 2, this.agreement.width, 2, 'pixel-landing').setOrigin(0.5, 0).setTint(0x777777).setDepth(this.bg.depth + 1);
    this.agreementClickZone = this.scene.add.tileSprite(this.agreement.x, this.agreement.y - 5, this.agreement.width + 10, this.agreement.height + 10, 'pixel-landing').setAlpha(0.0001).setOrigin(0.5, 0).setDepth(this.bg.depth + 2).setInteractive();
    
    this.agreementClickZone.on('pointerover', (): void => {
      this.agreement.setColor('#999999');
      this.agreementUnderline.setTint(0x999999);
    })

    this.agreementClickZone.on('pointerout', (): void => {
      this.agreement.setColor('#777777');
      this.agreementUnderline.setTint(0x777777);
    })
    
    this.scene.click(this.agreementClickZone, (): void => { window.open('https://' + location.hostname + '/agreement', '_blank'); })
  }


  private topAndBottomBgSides(): void {
    this.bgTop = this.scene.add.sprite(this.bg.getTopCenter().x - 1, this.bg.getTopCenter().y, 'header-syst').setOrigin(0.5, 1).setScale(this.bg.scale);
    this.bgBot = this.scene.add.sprite(this.bg.getBottomCenter().x, this.bg.getBottomCenter().y - 1, 'bottom-syst').setOrigin(0.5, 0).setScale(this.bg.scale);
  }

  
  public destroy(): void {
    this.elements.forEach(el => { el.destroy(); })
  }

}