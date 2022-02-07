const OFFSET_TOP = 33;
import Modal from './../../../scenes/Modal/Modal';
import LogoManager from './../../Utils/LogoManager';
const OFFSET_BOTTOM = 12;
const OFFSET_LEFT = 33;
const OFFSET_RIGHT = 33;
const OFFSET_X = OFFSET_LEFT + OFFSET_RIGHT;
const OFFSET_Y = OFFSET_TOP + OFFSET_BOTTOM;

export default class ClanTab extends Phaser.GameObjects.TileSprite {
  private iconTexture: string;
  private activeSprite: boolean;
  private typeIcon: number;
  private callback: () => void;
  public icon: Phaser.GameObjects.Sprite;
  public tl: Phaser.GameObjects.Sprite;
  public tc: Phaser.GameObjects.TileSprite;
  public tr: Phaser.GameObjects.Sprite;
  public ml: Phaser.GameObjects.TileSprite;
  public mr: Phaser.GameObjects.TileSprite;
  public bl: Phaser.GameObjects.Sprite;
  public bc: Phaser.GameObjects.TileSprite;
  public br: Phaser.GameObjects.Sprite;
  public scene: Modal;
  public flag: Phaser.GameObjects.Sprite;

  constructor(scene: Phaser.Scene, x: number, y: number, width: number, height: number, icon: string, active: boolean = false, callback?: () => void, type?: number) {
    super(scene, x, y, width - OFFSET_X + 2, height - OFFSET_Y, active ? 'clan-window-tab-active-mc' : 'clan-window-tab-disable-mc');
    this.activeSprite = active;
    this.iconTexture = icon;
    this.callback = callback;
    this.typeIcon = type;
    this.create();
  }

  private create() {
    this.scene.add.existing(this);
    const tabGeom = this.getBounds();
    const texturePrefix = this.activeSprite ? 'clan-window-tab-active-' : 'clan-window-tab-disable-';
    
    this.tl = this.scene.add.sprite(tabGeom.left, tabGeom.top, texturePrefix + 'tl').setOrigin(1);
    this.tc = this.scene.add.tileSprite(tabGeom.centerX, tabGeom.top, this.width, OFFSET_TOP, texturePrefix + 'tc').setOrigin(0.5, 1);
    this.tr = this.scene.add.sprite(tabGeom.right, tabGeom.top, texturePrefix + 'tr').setOrigin(0, 1);
    this.ml = this.scene.add.tileSprite(tabGeom.left, tabGeom.centerY, OFFSET_LEFT, this.height + 1,  texturePrefix + 'ml').setOrigin(1, 0.5);
    this.mr = this.scene.add.tileSprite(tabGeom.right, tabGeom.centerY, OFFSET_RIGHT, this.height + 1,  texturePrefix + 'mr').setOrigin(0, 0.5);
    this.bl = this.scene.add.sprite(tabGeom.left, tabGeom.bottom, texturePrefix + 'bl').setOrigin(1, 0);
    this.bc = this.scene.add.tileSprite(tabGeom.centerX, tabGeom.bottom, this.width, OFFSET_BOTTOM, texturePrefix + 'bc').setOrigin(0.5, 0);
    this.br = this.scene.add.sprite(tabGeom.right, tabGeom.bottom, texturePrefix + 'br').setOrigin(0);

    this.icon = this.scene.add.sprite(tabGeom.centerX, tabGeom.centerY - 10, this.iconTexture);

    if (this.typeIcon === 1) {
      const mask = new Phaser.Display.Masks.BitmapMask(this.scene, this.icon);
      mask.invertAlpha = true;
      if (this.scene.state.clan?.avatar) {
        this.flag = LogoManager.createFlag(this.scene, tabGeom.centerX + 5, tabGeom.centerY - 10 - 5, this.scene.state.clan?.avatar).setScale(0.205).setMask(mask);
      }
    }

    if (!this.activeSprite) {
      const zone = this.scene.add.tileSprite(this.x, this.y, this.width + OFFSET_X, this. height + OFFSET_Y, 'pixel');
      const array = [      
        this,
        this.tl,
        this.tc,
        this.tr,
        this.ml,
        this.mr,
        this.bl,
        this.bc,
        this.br,
        this.icon,
      ];
      
      if (this.flag) array.push(this.flag);

      this.scene.clickButtonClanUp(zone, () => {
        if (this.callback !== undefined) this.callback();
      }, array);
    }
  }
};
