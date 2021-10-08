import { shortTime } from '../../general/basic';
import Modal from './../../scenes/Modal/Modal';
import Firework from './../animations/Firework';



export default class SaleWindow {
  private scene: Modal;
  private header: Phaser.GameObjects.Sprite;
  private headerText: Phaser.GameObjects.Text;
  private closeBtn: Phaser.GameObjects.Sprite;
  private footer: Phaser.GameObjects.Sprite;
  private height: number;
  private width: number;
  private bg: Phaser.GameObjects.TileSprite;
  private x: number;
  private y: number;
  private texture: string;
  private type: string;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.createElements();
    this.createFireworks();
  }

  private init(): void {
    this.texture = this.scene.state.modal.message.split('_').join('-').toLowerCase();
    this.type = this.scene.state.modal.message;
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.height = this.checkBtnHave() ? 300 : 220;
    this.width = 527;
  }

  private createElements(): void {
    this.createBg();
    this.createHeader();
    this.createFooter();
    this.createMainInfo();

  }

  private checkDoublePrice(): boolean {
    const array: Array<string> = [
      'DIAMOND_COUNT',
      'SHEEP_MONEY',
      'CHICKEN_MONEY',
      'COW_MONEY',
    ];
    return array.some(el => el === this.type);
  }

  private checkBtnHave(): boolean {
    const array: Array<string> = [
      'PACKAGE_PRICE',
      'DIAMOND_COUNT',
    ];
    return array.some(el => el === this.type);
  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.width, this.height, 'white-pixel').setTint(0xFF9700);
  }

  private createHeader(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '45px',
    };
    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 15 , 'sale-window-header').setOrigin(0.5, 1);
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 10, this.scene.state.lang.sale, headerTextStyle).setOrigin(0.5);
    this.scene.add.sprite(headerGeom.centerX - 7, headerGeom.bottom - 10, 'sale-window-flags').setOrigin(0.5, 0);

    this.closeBtn = this.scene.add.sprite(headerGeom.right - 35, headerGeom.top + 35, 'close-window-btn');
    
    this.scene.clickButton(this.closeBtn, () => { this.onCloseBtn(); });
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2, 'profile-window-footer').setOrigin(0.5, 0);
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
  }
  private getText(): string {
    const textArray: Array<string> = this.texture.split('-');
    const sting = textArray.map(el => el[0].toUpperCase() + el.slice(1)).join('');
    return sting[0].toLowerCase() + sting.slice(1);
  }

  private createMainInfo(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '20px',
      color: '#FEF5E5',
      align: 'center',
      wordWrap: { width: 320 }
    };
    const headerGeom = this.header.getBounds();
    const icon = this.scene.add.sprite(this.x - 150, headerGeom.bottom + 60, `sale-icon-${this.texture}`).setOrigin(0.5, 0).setDepth(1);
    const sale = this.checkDoublePrice() ? 'sale-window-double-count' : 'sale-window-half-price';
    const saleIcon = this.scene.add.sprite(icon.getTopRight().x, icon.getTopRight().y, sale).setDepth(1).setOrigin(1, 0);
    const tile = this.scene.add.tileSprite(this.x, icon.getCenter().y, this.bg.width, icon.displayHeight - 30, 'modal-bg-plate');
    const text = this.scene.add.text(this.x + 95, icon.getCenter().y, this.scene.state.lang[`${this.getText()}Sale`], textStyle).setOrigin(0.5);
    this.createTimer({ x: this.x, y: tile.getBounds().bottom + 40 });
    if (this.checkBtnHave()) this.createBtn(tile.getBounds().bottom + 150);
  }

  private createTimer(pos: Iposition): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      color: '#F49830',
      fontSize: '22px',
    };
    const timerStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      color: '#38BCD8',
      fontSize: '24px',
    };

    const bgWidth: number = 490;

    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(pos.x, pos.y, bgWidth, 50, 'tasks-bar-ns', 15).setOrigin(0.5, 0);
    const bgGeom: Phaser.Geom.Rectangle = bg.getBounds();
    const last = this.scene.add.text(0, bgGeom.centerY, this.scene.state.lang.saleLastTime, textStyle).setOrigin(0, 0.5);
    const timer = this.scene.add.text(0, bgGeom.centerY, shortTime(this.getLastTime(), this.scene.state.lang), timerStyle).setOrigin(0, 0.5);

    const width = last.displayWidth + timer.displayWidth + 10;
    last.setX(bgGeom.centerX - width / 2);
    timer.setX(last.getBounds().right + 5);
  }
  
  private createBtn(y: number): void {
    const btnStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '23px',
      align: 'center',
      wordWrap: { width: 200, useAdvancedWrap: true },
      stroke: '#01B714',
      strokeThickness: 4
    };
    
    const takeBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.x, y, 'done-chapter-button').setDepth(2);
    const textBtn: Phaser.GameObjects.Text = this.scene.add.text(this.x, takeBtn.getCenter().y, this.scene.state.lang.goTo, btnStyle).setOrigin(0.5, 0.75).setDepth(2);
    this.scene.clickModalBtn({ btn: takeBtn, title: textBtn }, () => {
      this.scene.state.modal = {
        type: 2,
        shopType: 1,
      };
      this.scene.scene.restart(this.scene.state);
    });
  }

  private getLastTime(): number {
    return this.scene.state.sales.find(el => el.type === this.type)?.endTime;
  }

  private createFireworks(): void {
    this.scene.time.addEvent({
      delay: 400,
      callback: (): void => {
        const position: any = {
          x: this.scene.cameras.main.centerX + Phaser.Math.RND.pick(Phaser.Math.RND.signs) * Phaser.Math.Between(80, 200),
          y: this.scene.cameras.main.centerY + Phaser.Math.RND.pick(Phaser.Math.RND.signs) * Phaser.Math.Between(90, 280),
        }
        Firework.create(this.scene, position, 1);
      },
      repeat: 7,
    });
  }
} 