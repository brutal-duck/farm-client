import { payOdnoklassniki, payRobokassa, payVK } from "../../../general/basic";
import Shop from "../../../scenes/Modal/Shop/Main";

const FREE_DIAMONDS: number = 1;
export default class DiamondsWindow {
  public scene: Shop;
  private rows: number

  constructor(scene: Shop) {
    this.scene = scene;
    this.init();
    this.create();
  }

  private init(): void {
    this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('bank_page_viewed', {});
    this.rows = Math.ceil(this.scene.state.packages.length / 2);
    this.setScrolling();
  }
  
  private create(): void {
    this.createAllPackages();
    if (this.checkStarterpack()) this.createStarterpack();
    if (this.checkFreeDiamonds()) this.createFreeDiamonds();
  }

  private createAllPackages(): void {
    for (let i: number = 0; i < this.rows; i++) {
      let y: number = i * 270 + 40;
      if (this.checkStarterpack()) y += 238;
      
      const left: Ipackage = this.scene.state.packages[i * 2];
      const right: Ipackage = this.scene.state.packages[i * 2 + 1];
      
      this.createPack(left, {x: 0, y: y});
      if (right) this.createPack(right, {x: 240, y: y});
    }
  }

  private setScrolling(): void {
    const height: number = this.rows * 270 + 40;
    this.scene.scrolling.bottom = this.scene.height - this.scene.heightWindow + height;
  }

  private createPack(packData: Ipackage, position: Iposition): void {
    const pack: Phaser.GameObjects.Sprite = this.scene.add.sprite(position.x, position.y + this.scene.height, 'bank-package').setOrigin(0, 0);
    this.scene.click(pack, (): void => { this.packHandler(packData); });

    this.scene.add.text(position.x + 110, position.y + 145 + this.scene.height, String(packData.diamonds + packData.bonus), {
      font: '40px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);
    
    const text: string = this.scene.state.platform === 'ok' ? packData.price + ' ' + 'ОК' : 
    this.scene.state.platform === 'vk' ? packData.voices + ' ' + this.scene.state.lang.voices : 
    packData.price + ' ' + this.scene.state.lang.ruble;

    const btn = this.scene.shopButton(position.x + 110, position.y + 223 + this.scene.height, text);
    this.scene.clickShopBtn(btn, (): void => { this.packHandler(packData); });

    if (packData.stock > 0) {
      const x: number = position.x;
      const y: number = position.y + this.scene.height;
      this.scene.add.sprite(x, y, 'stock-tape').setOrigin(0, 0);
      this.scene.add.text(x + 162, y + 42, '+' + packData.stock + '%', {
        font: '34px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5).setRotation(0.55);
    }

    if ((packData.diamonds + packData.bonus) >= 750 && this.checkStarterpack()) {
      const x: number = position.x + 30;
      const y: number = position.y + this.scene.height + 20;
      
      const starterpackIcon: Phaser.GameObjects.Image = this.scene.add.image(x, y, 'starterpack-icon');
      starterpackIcon.setScale(0.4).setDepth(3);
      this.scene.tweens.add({
        targets: starterpackIcon,
        delay: 2000,
        angle: -21,
        duration: 100,
        yoyo: true,
        repeat: 1,
        loop: -1
      });
    }

    if (packData.bonus > 0) {
      const x: number = position.x + 110;
      const y: number = position.y + 180 + this.scene.height;
      const text: string = this.scene.state.lang.benefit + ' ' + '+' + packData.bonus;

      this.scene.add.text(x, y, text, {
        font: '20px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5);
    }
  }

  private createFreeDiamonds(): void {
    let y: number = (this.rows + 1) * 270 + 50 + this.scene.height - 238;
    if (this.checkStarterpack()) y += 238;
    this.scene.add.sprite(this.scene.cameras.main.centerX - 130, y, 'free-diamonds-bg');
    const diamondCount: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 300, y, `+${FREE_DIAMONDS}`, {
      font: '34px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5);
    this.scene.add.sprite(diamondCount.getBounds().right + 5, y, 'diamond').setScale(0.23).setOrigin(0, 0.5);
    const takeBtn: any = this.scene.shopButton(this.scene.cameras.main.centerX - 30, y, '0 ' + this.scene.state.lang.ruble);
    this.scene.clickShopBtn(takeBtn, () => { this.freeDiamondsBtnHandler(); });
  }

  private createStarterpack(): void {
    this.scene.scrolling.bottom += 350;
    const y: number = this.scene.height + 140;
    const starterpackBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 130, y, 'starterpack-bg');
    const starterpackIconShadow: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 265, y + 70, 'starterpack-shadow');
    const starterpackIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 270, y, 'starterpack-icon');
    const text1: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 90, y - 40, this.scene.state.lang.buyFrom, {
      font: '26px Shadow',
      color: '#FBCB64'
    }).setOrigin(0.5, 0.5);

    const text2: Phaser.GameObjects.Text = this.scene.add.text(text1.getBounds().right + 10, text1.y, '750', {
      font: '26px Shadow',
      color: '#ffffff'
    }).setOrigin(0, 0.5);

    const diamond1: Phaser.GameObjects.Image = this.scene.add.image(text2.getBounds().right + 5, text1.y, 'diamond').setScale(0.1).setOrigin(0, 0.5);

    const text3: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 50, text1.getBounds().bottom + 5, this.scene.state.lang.getGift,  {
      font: '26px Shadow',
      color: '#FBCB64'
    }).setOrigin(0.5, 0);

    const text4: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 90, text3.getBounds().bottom + 5, this.scene.state.lang.more, {
      font: '26px Shadow',
      color: '#FBCB64'
    }).setOrigin(0.5, 0);
    
    const text5: Phaser.GameObjects.Text = this.scene.add.text(text4.getBounds().right + 5, text3.getBounds().bottom + 5, '+750', {
      font: '26px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0, 0);

    const diamond2: Phaser.GameObjects.Image = this.scene.add.image(text5.getBounds().right + 5, text5.y, 'diamond').setScale(0.10).setOrigin(0);

    const text6: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 50, text4.getBounds().bottom + 5, this.scene.state.lang.dontMissChanse, {
      font: '26px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0);

    this.scene.tweens.add({
      targets: starterpackIcon,
      delay: 2000,
      props: {
        rotation: { duration: 1200, yoyo: false, ease: 'Power2', value: 2 * Math.PI },
        y: { value: '-=40', ease: 'Power1', duration: 250, repeat: 2, yoyo: true },
      },
      loop: -1,
      loopDelay: 1000,
    });

    this.scene.tweens.add({
      targets: starterpackIconShadow,
      delay: 2000,
      duration: 250,
      repeat: 2,
      yoyo: true,
      scale: 0.3,
      ease: 'Power1',
      loop: -1,
      loopDelay: 1000
    });
  }

  private packHandler(pack: Ipackage): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.closeWindow();

    if (this.scene.state.platform === 'ok') this.scene.payOdnoklassniki(pack.id);
    else if (this.scene.state.platform === 'vk') this.scene.payVK(pack.id);
    else payRobokassa(pack.id, this.scene.state);
  }

  private freeDiamondsBtnHandler(): void {
    this.scene.state.user.takenFreeDiamonds = true;
    this.scene.state.user.diamonds += FREE_DIAMONDS;
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.closeWindow();
    if (this.scene.scene.isActive('Profile')) this.scene.game.scene.keys['Profile'].getCurrency({
      x: this.scene.game.scene.keys['Profile'].cameras.main.centerX,
      y: this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].cameras.main.centerY,
    }, FREE_DIAMONDS, 'diamond');
    else this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].getCurrency({
      x: this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].cameras.main.centerX,
      y: this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].cameras.main.centerY,
    }, FREE_DIAMONDS, 'diamond');
    this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('diamonds_get', {
      type: 'bank_page',
      count: FREE_DIAMONDS,
    });
    this.scene.game.scene.keys[this.scene.state.farm].autosave();
  }

  private checkStarterpack(): boolean {
    return !this.scene.state.user.starterpack && 
    (this.scene.state.userSheep?.part > 4 ||
    this.scene.state.userChicken?.part >= 1 ||
    this.scene.state.userUnicorn?.maxLevelAnimal >= 1 ||
    this.scene.state.userCow?.part >= 1);
  }

  private checkFreeDiamonds(): boolean {
    return !this.scene.state.user.takenFreeDiamonds && 
    (this.scene.state.userSheep.tutorial >= 100 || 
    this.scene.state.progress.chicken.part >= 1 || 
    this.scene.state.progress.cow.part >= 1);
  }

  private closeWindow(): void {
    this.scene.scene.stop();
    this.scene.scene.stop('ShopBars');
    this.scene.scene.stop('Modal');
  }
}