import Chat from "../../scenes/Modal/Chat/Main";

export default class AskBar extends Phaser.GameObjects.Sprite {
  public scene: Chat;
  public x: number;
  public y: number;
  public sprite: string;

  public mask: Phaser.Display.Masks.BitmapMask;
  public elements: Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.Text>;
  public acceptBtn: Phaser.GameObjects.Sprite;
  public acceptBtnText: Phaser.GameObjects.Text;
  public declainBtn: Phaser.GameObjects.Sprite;
  public declainBtnText: Phaser.GameObjects.Text;

  private btnTextStyle: Phaser.Types.GameObjects.Text.TextStyle;
  private textStyle: Phaser.Types.GameObjects.Text.TextStyle;

  constructor(scene: Chat, x: number, y: number, sprite: string = 'chat-delete-bg') {
    super(scene, x, y, sprite);
    this.scene = scene
    this.x = x;
    this.y = y;
    this.sprite = sprite;
    this.scene.add.existing(this)
    this.init();
  }


  private init(): void {
    this.setDepth(2).setInteractive();
    this.elements = []
    this.btnTextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      align: 'center',
      fontSize: '12px',
      color: '#ffe2e2',
      stroke: '#D78A31',
      strokeThickness: 1,
    };
    this.textStyle = {
      fontFamily: 'Bip',
      wordWrap: { width: 100 },
      align: 'center',
      fontSize: '16px',
      color: '#ffebdc',
      stroke: '#373737',
      strokeThickness: 1,
    };

    this.create();
  }

  private create(): void {
    const text: Phaser.GameObjects.Text = this.scene.add.text(this.x, this.y - 15, this.scene.state.lang.delete, this.textStyle).setOrigin(0.5).setDepth(2);
    this.acceptBtn = this.scene.add.sprite(this.x - 35, this.y + 14, 'profile-window-button-red').setOrigin(0.5).setScale(0.5).setDepth(2).setInteractive();
    this.acceptBtnText = this.scene.add.text(this.x - 35, this.y + 10, this.scene.state.lang.yes, this.btnTextStyle).setOrigin(0.5).setDepth(2);
    this.declainBtn = this.scene.add.sprite(this.x + 35, this.y + 14, 'profile-window-button-green').setOrigin(0.5).setScale(0.5).setDepth(2).setInteractive();
    this.declainBtnText = this.scene.add.text(this.x + 35, this.y + 10, this.scene.state.lang.no, this.btnTextStyle).setOrigin(0.5).setDepth(2);

    this.elements = [
      this,
      text,
      this.acceptBtn,
      this.acceptBtnText,
      this.declainBtn,
      this.declainBtnText
    ]
  }

  public setGlobalMask(x: number = this.x, y: number = this.y, origin: { x: number, y: number } = { x: 0.5, y: 0.5 }): this {
    this.mask = this.createBitmapMask(this.scene.add.tileSprite(x, y, this.width, this.height, 'white-pixel').setOrigin(origin.x, origin.y).setVisible(false));
    this.mask.invertAlpha = true
    this.elements.forEach(el => el.setMask(this.mask))
    return this
  }
}
