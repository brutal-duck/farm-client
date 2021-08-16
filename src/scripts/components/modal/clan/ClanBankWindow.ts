import axios from 'axios';
import { shortNum } from '../../../general/basic';
import Modal from './../../../scenes/Modal/Modal';
import LogoManager from './../../Utils/LogoManager';
import Sheep from './../../../scenes/Sheep/Main';
import Chicken from './../../../scenes/Chicken/Main';
import Cow from './../../../scenes/Cow/Main';
import Unicorn from './../../../scenes/Event/Unicorns/Main';
import BigInteger from './../../../libs/BigInteger';
const KEY: string = '1491f4c9d53dfa6c50d0c4a375f9ba76';

export default class ClanBankWindow {
  private scene: Modal;
  private x: number;
  private y: number;
  private height: number;
  private width: number;
  private bg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Sprite;
  private closeBtn: Phaser.GameObjects.Sprite;
  private headerText: Phaser.GameObjects.Text;
  private footer: Phaser.GameObjects.Sprite;
  private modalElements: Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.TileSprite | Phaser.GameObjects.Text | Phaser.GameObjects.RenderTexture> = [];
  private windowType: number = 1;
  private farm: string;
  private packageBtns: Array<{
    btn: Phaser.GameObjects.Sprite, 
    text: Phaser.GameObjects.Text,
  }> = [];
  private headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#fffdfa',
    fontFamily: 'Shadow',
    fontSize: '34px',
    align: 'center',
    shadow: {
      offsetX: 1,
      offsetY: 1, 
      color: '#96580e',
      blur: 2,
      fill: true,
    },
    wordWrap: { width: 400, useAdvancedWrap: true },
  };
  private activePackage: number = 0;
  private currentCountText: Phaser.GameObjects.Text;
  private logElements: Phaser.GameObjects.Group;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.createElements();
  }
  
  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.windowType = this.scene.state.modal.clanTabType || 1;
    this.height = 600;
    this.width = 527;
  }

  private createElements(): void {
    this.createBg();
    this.createHeader();
    this.createFooter();
    this.createCloseTab();
    this.createTabs([1, 2, 3, 4]);
    this.createMainElements();
  }

  private createMainElements(): void {
    switch (this.windowType) {
      case 1:
        this.farm = 'diamond';
        break;
      case 2:
        this.farm = 'sheep';
        break;
      case 3:
        this.farm = 'chicken';
        break;
      case 4:
        this.farm = 'cow';
        break;
      default:
        break;
    }
    this.createBank();
  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.width, this.height, 'white-pixel').setTint(0xFA8F1F);
    this.modalElements.push(this.bg);
  }

  private createHeader(): void {
    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 10 , 'clan-window-header').setDepth(2).setOrigin(0.5, 1);
    this.modalElements.push(this.header);
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2, 'profile-window-footer').setOrigin(0.5, 0);
    this.modalElements.push(this.footer);
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
    this.scene.scene.stop('ClanScroll');
  }

  private createCloseTab(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    const tab: Phaser.GameObjects.Sprite = this.scene.add.sprite(headerGeom.right - 18, headerGeom.top + 5, 'clan-window-tab-close').setOrigin(1, 1);
    const tabGeom: Phaser.Geom.Rectangle = tab.getBounds();
    const tabIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(tabGeom.centerX + 5, tabGeom.centerY - 5, 'close-window-btn').setOrigin(0.5).setScale(0.9);
    this.scene.clickButtonUp(tab, (): void => { this.onCloseBtn() }, tabIcon);
    this.modalElements.push(tab, tabIcon);
  }

  private createTabs(types: Array<number>): void {
    const tabCount: number = types.length;
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    let left: number = headerGeom.left + 15;
    const maxWidth: number = 455;
    types.forEach((el: number) => {
      this.createTab({x: left, y: headerGeom.top + 25}, tabCount, el)
      left += maxWidth / tabCount;
    });
  }

  private createTab(pos: Iposition, count: number, type: number): void {
    const active: boolean = this.windowType === type;
    const maxWidth: number = 455;
    const tabHeight: number = 104;
    const activeTabHeight: number = 115;
    const slice: number = 30;
    const height: number = active ? activeTabHeight : tabHeight;
    const texture: string = active ? 'clan-window-tab-active' : 'clan-window-tab-disable';
    const tab: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(pos.x, pos.y, maxWidth / count, height, texture, slice).setOrigin(0, 1);
    const tabGeom: Phaser.Geom.Rectangle = tab.getBounds();
    const textureIcon: string = type === 1 ? 'diamond' : type === 2 ? 'icon-shop-sheep' : type === 3 ? 'icon-shop-chicken' : 'icon-shop-cow';
    const tabIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(tabGeom.centerX, tabGeom.centerY - 10, textureIcon).setOrigin(0.5);
    if (type === 1) tabIcon.setScale(0.25)
    
    this.modalElements.push(tab, tabIcon);
    if (!active) {
      this.scene.clickButtonUp(tab, (): void => {
        this.scene.state.modal = {
          type: 19,
          clanTabType: type,
        };
        this.scene.scene.stop('ClanScroll');
        this.scene.scene.restart(this.scene.state);
      }, tabIcon);
    }
  }

  private createBank(): void {
    const titleTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#fffdfa',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    }
    const btnTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      align: 'center',
      fontSize: '20px',
      color: '#ffffff',
      stroke: '#277C03',
      strokeThickness: 3,
    };
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    LogoManager.createIcon(this.scene, headerGeom.left + 60, headerGeom.centerY, this.scene.state.clan.avatar).setScale(0.35).setDepth(2);
    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY, this.scene.state.lang.clanTreasury, this.headerTextStyle).setDepth(2).setOrigin(0.5);
    if (this.headerText.displayHeight > 100) {
      const multiply: number = this.headerText.displayHeight / 100;
      this.headerText.setFontSize(parseInt(this.headerText.style.fontSize) / multiply);
    }
    const coinTexture: string = this.farm !== 'diamond' ? `${this.farm}Coin` : 'diamond';
    const titleText: string = this.farm !== 'diamond' ? shortNum(this.scene.state.clan[this.farm].money) : shortNum(this.scene.state.clan[`${this.farm}`].count);
    const title1: Phaser.GameObjects.Text = this.scene.add.text(headerGeom.left + 60, headerGeom.bottom + 20, this.scene.state.lang.nowInTreasury, titleTextStyle);
    const coin: Phaser.GameObjects.Sprite = this.scene.add.sprite(title1.getBounds().right + 10, title1.getBounds().centerY, coinTexture).setScale(0.15).setOrigin(0, 0.5);
    this.currentCountText = this.scene.add.text(coin.getBounds().right + 10, title1.getBounds().centerY, titleText, titleTextStyle).setOrigin(0, 0.5);
    this.createBtns();
    const donateBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, headerGeom.bottom + 260, 'done-chapter-button');
    const donateBtnText: Phaser.GameObjects.Text = this.scene.add.text(donateBtn.x, donateBtn.y - 5, this.scene.state.lang.send, btnTextStyle).setOrigin(0.5);
    this.scene.clickModalBtn({ btn: donateBtn, title: donateBtnText }, (): void => { this.addFarmMoney(); });

    this.createLogs();
  }

  private createBtns(): void {
    let array: Array<number> = [1000, 100000, 1000000, 1000000000];
    if (this.farm === 'diamond') array = [1, 10, 100, 1000];
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '28px',
    };
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    let x: number = headerGeom.left + 100;
    const btnTexture: string = this.farm !== 'diamond' ? `${this.farm}-money-package` : 'bank-package';
    for (let i: number = 0; i < 4; i += 1) {
      const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, headerGeom.bottom + 130, btnTexture).setScale(0.45);
      const text: Phaser.GameObjects.Text = this.scene.add.text(x, headerGeom.bottom + 160, shortNum(array[i]), textStyle).setOrigin(0.5);
      btn.state = i;
      text.state = array[i];
      this.scene.click(btn, () => {
        this.setActive(btn);
      });
      this.packageBtns.push({btn, text});
      x += btn.displayWidth + 20
      if (this.activePackage === i) this.setActive(btn);
    }
  }

  private setActive(btn: Phaser.GameObjects.Sprite): void {
    if (btn.type === 'active') return;
    this.activePackage = Number(btn.state);
    this.setDisable();
    btn.type = 'active';
    btn.setScale(0.55);
  }

  private setDisable(): void {
    this.packageBtns.forEach(el => {
      el.btn.type = 'disable';
      el.btn.setScale(0.45);
    });
  }

  private createLogs(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '22px',
      align: 'left',
      wordWrap: { width: 150, useAdvancedWrap: true },
    };
    const timeTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '18px',
      align: 'center',
      wordWrap: { width: 50 },
    };
    const array: IclanUserLog[] = this.scene.state.clan[this.farm].logs;
    let y: number = this.scene.cameras.main.centerY + 80;
    this.scene.add.nineslice(this.scene.cameras.main.centerX, y + 150, 500, 380, 'modal-square-bg', 10).setOrigin(0.5);
    const x: number = 160;
    this.logElements = this.scene.add.group();
    array.reverse().forEach(el => {
      const avatar = this.scene.add.sprite(x, y, 'farmer').setScale(0.25);
      const name = this.scene.add.text(x + avatar.displayWidth / 2 + 20, y, el.name, textStyle).setOrigin(0, 0.5);
      if (name.displayHeight > 60) {
        const multiply: number = name.displayHeight / 60;
        name.setFontSize(parseInt(name.style.fontSize) / multiply);
      }
      const time = this.scene.add.text(x + 400, y, this.getDate(el.time), timeTextStyle).setOrigin(0.5);
      const count = this.scene.add.text(x + 260, y, shortNum(el.count), textStyle).setOrigin(0, 0.5);
      const coinTexture: string = this.farm !== 'diamond' ? `${this.farm}Coin` : 'diamond';
      const coin: Phaser.GameObjects.Sprite = this.scene.add.sprite(count.getBounds().left - 5, count.getBounds().centerY, coinTexture).setScale(0.11).setOrigin(1, 0.5);
      this.logElements.add(avatar);
      this.logElements.add(name);
      this.logElements.add(time);
      this.logElements.add(count);
      this.logElements.add(coin);
      y += avatar.displayHeight + 10;
    });
  }

  private addFarmMoney(): void {
    const count: string = String(this.packageBtns.find(el => el.btn.state === this.activePackage).text.state);
    if (this.farm !== 'diamond') {
      const farmMoney: string = this.scene.state[`user${this.farm[0].toUpperCase() + this.farm.slice(1)}`].money;
      if (BigInteger.greaterThanOrEqual(farmMoney, count)) {
        console.log(farmMoney, count)

        this.postMoney(count).then(res => {
          if (!res.data.error) {
            this.scene.state[`user${this.farm[0].toUpperCase() + this.farm.slice(1)}`].money -= Number(count);
            const text: string = shortNum(this.scene.state.clan[this.farm].money);
            this.currentCountText.setText(text);
            this.logElements.destroy(true);
            this.createLogs();
            const mainScene = this.scene.scene.get(this.scene.state.farm) as Sheep | Chicken | Cow | Unicorn;
            mainScene.autosave();
          }
        });
      } else {
        console.log(farmMoney, count)
      }
    } else {
      const userDiamonds: number = this.scene.state.user.diamonds;
      if (userDiamonds >= Number(count)) {
        this.postMoney(Number(count)).then(res => {
          if (!res.data.error) {
            this.scene.state.user.diamonds -= Number(count);
            const text: string = shortNum(this.scene.state.clan[`${this.farm}`].count);
            this.currentCountText.setText(text);
            this.logElements.destroy(true);
            this.createLogs();
            const mainScene = this.scene.scene.get(this.scene.state.farm) as Sheep | Chicken | Cow | Unicorn;
            mainScene.autosave();
          }
        });
      }
    } 
  }

  private postMoney(count: string | number): Promise<any> {
    let login: string = this.scene.state.user.login;
    if (this.scene.state.platform !== 'web' && this.scene.state.platform !== 'android') login = this.scene.state.name;
    const avatar: string = Number(this.scene.state.user.avatar) > 0 ? this.scene.state.user.avatar : this.scene.state.avatar;
    const data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      count: count,
      farm: this.farm,
      name: login,
      avatar: avatar,
      status: this.scene.state.user.status,
    };

    return axios.post(process.env.API + '/addFarmMoney', data);
  }
  private getDate(data: Date): string {
    const time: Date = new Date(data);
    const year: number = time.getFullYear();
    const month: number = time.getMonth() + 1;
    const day: number = time.getDate();
    const hours: number = time.getHours();
    const minutes: string = time.getMinutes() < 10 ? '0' + time.getMinutes() : String(time.getMinutes());
    const date: string =  hours + ':' + minutes + '\n' + day + '.' + month + '.' + year ;
    return date;
  }

}