import axios from 'axios';
import { shortNum } from '../../../general/basic';
import Modal from './../../../scenes/Modal/Modal';
import LogoManager from './../../Utils/LogoManager';
import Sheep from './../../../scenes/Sheep/Main';
import Chicken from './../../../scenes/Chicken/Main';
import Cow from './../../../scenes/Cow/Main';
import Unicorn from './../../../scenes/Event/Unicorns/Main';
import Currency from './../../animations/Currency';
import MoneyAnimation from './../../animations/MoneyAnimation';
import Utils from './../../../libs/Utils';

const FARM_PACKAGE: Array<number> = [1000, 100000, 1000000, 1000000000];
const DIAMOND_PACKAGE: Array<number> = [1, 10, 100, 1000];

export default class ClanBankWindow extends Phaser.GameObjects.Sprite {
  public scene: Modal;
  private posx: number;
  private posy: number;
  private windowHeight: number;
  private windowWidth: number;
  private bg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Sprite;
  private closeBtn: Phaser.GameObjects.Sprite;
  private headerText: Phaser.GameObjects.Text;
  private footer: Phaser.GameObjects.Sprite;
  private modalElements: Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.TileSprite | Phaser.GameObjects.Text | Phaser.GameObjects.RenderTexture> = [];
  private windowType: number = 1;
  private farm: string;
  private disableTimer: number = 0;
  private packageBtns: Array<{
    btn: Phaser.GameObjects.Sprite, 
    text: Phaser.GameObjects.Text,
  }> = [];
  private donateBtn: Phaser.GameObjects.Sprite;
  private donateBtnText: Phaser.GameObjects.Text;
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
  private coinIcon: Phaser.GameObjects.Sprite;
  private currentCountText: Phaser.GameObjects.Text;
  private currentUserCountText: Phaser.GameObjects.Text;
  private logElements: Phaser.GameObjects.Group;
  private logs: IclanUserLog[] = [];

  constructor(scene: Modal) {
    super(scene, 0, 0, 'pixel');
    this.scene = scene;
    this.init();
    this.createElements();
  }
  
  private init(): void {

    this.scene.add.existing(this);
    this.posx = this.scene.cameras.main.centerX;
    this.posy = this.scene.cameras.main.centerY;
    this.windowType = this.scene.state.modal.clanTabType || 1;
    this.windowHeight = 620;
    this.windowWidth = 527;
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
    this.bg = this.scene.add.tileSprite(this.posx, this.posy, this.windowWidth, this.windowHeight, 'white-pixel').setTint(0xFF9700);
    this.modalElements.push(this.bg);
  }

  private createHeader(): void {
    this.header = this.scene.add.sprite(this.posx, this.posy - this.windowHeight / 2 + 10 , 'clan-window-header').setDepth(2).setOrigin(0.5, 1);
    this.modalElements.push(this.header);
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.posx, this.posy + this.windowHeight / 2, 'profile-window-footer').setOrigin(0.5, 0);
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
    const textureIcon: string = type === 1 ? 'clan-diamond-coin' : 
    type === 2 ? 'clan-sheep-coin' :
    type === 3 ? 'clan-chicken-coin' : 'clan-cow-coin';
    const tabIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(tabGeom.centerX, tabGeom.centerY - 10, textureIcon);
    
    this.modalElements.push(tab, tabIcon);
    if (!active) {
      this.scene.clickButtonUp(tab, (): void => {
        this.scene.state.modal = {
          type: 19,
          clanTabType: type,
        };
        this.scene.scene.restart(this.scene.state);
      }, tabIcon);
    }
  }

  private createBank(): void {
    const titleTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '26px',
      color: '#fffdfa',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };

    const y = this.scene.cameras.main.centerY + 219
    // this.scene.add.nineslice(this.posx, y, 500, 385, 'modal-square-bg', 10).setOrigin(0.5); // ns!
    this.scene.add.roundedField(this.posx, y, 500, 385, 'modal-square-bg')
    this.scene.add.nineslice(this.posx, y - 150, this.windowWidth - 25, 70,'clan-window-leader-plate-ns', 5)
      .setOrigin(0.5)
      .setAlpha(0.5);
    this.scene.add.nineslice(this.posx, y, this.windowWidth - 25, 70,'clan-window-leader-plate-ns', 5)
      .setOrigin(0.5)
      .setAlpha(0.5);
    this.scene.add.nineslice(this.posx, y + 145, this.windowWidth - 25, 70,'clan-window-leader-plate-ns', 5)
      .setOrigin(0.5)
      .setAlpha(0.5);

    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    LogoManager.createIcon(this.scene, headerGeom.left + 60, headerGeom.centerY, this.scene.state.clan.avatar).setScale(0.35).setDepth(2);
    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY, this.scene.state.lang.clanTreasury, this.headerTextStyle).setDepth(2).setOrigin(0.5);
    if (this.headerText.displayHeight > 100) {
      const multiply: number = this.headerText.displayHeight / 100;
      this.headerText.setFontSize(parseInt(this.headerText.style.fontSize) / multiply);
    }
    const coinTexture: string = `clan-${this.farm}-coin`;
    const title1: Phaser.GameObjects.Text = this.scene.add.text(headerGeom.left + 60, headerGeom.bottom + 12, this.scene.state.lang.nowInTreasury, titleTextStyle);
    this.coinIcon = this.scene.add.sprite(title1.getBounds().right + 7, title1.getBounds().centerY, coinTexture).setScale(0.5).setOrigin(0, 0.5);
    this.currentCountText = this.scene.add.text(this.coinIcon.getBounds().right + 7, title1.getBounds().centerY, '', titleTextStyle).setOrigin(0, 0.5);

    if (this.farm !== 'diamond') {
      const farmProgress: IpartProgress = this.scene.state.progress[this.farm];
      if (farmProgress.open) this.createActiveBtns();
      else this.createDisableBtns();
    } else this.createActiveBtns();
    this.createLogs();
  }

  private createActiveBtns(): void {
    let array: Array<number> = FARM_PACKAGE;
    if (this.farm === 'diamond') array = DIAMOND_PACKAGE;
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '28px',
    };
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
    let x: number = headerGeom.left + 100;
    const btnTexture: string = `clan-bank-${this.farm}-package`;
    this.scene.add.nineslice(this.posx, headerGeom.bottom + 130, this.windowWidth, 150, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);
    for (let i: number = 0; i < 4; i += 1) {
      const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, headerGeom.bottom + 130, `${btnTexture}-${i + 1}`).setScale(0.81).setTint(0xcccccc);
      const text: Phaser.GameObjects.Text = this.scene.add.text(x, headerGeom.bottom + 160, shortNum(array[i]), textStyle).setOrigin(0.5).setTint(0xcccccc);
      btn.state = i;
      btn.type = 'disable';
      text.state = array[i];
      this.scene.click(btn, () => {
        this.setActiveBtn({btn, text});
      });
      this.packageBtns.push({btn, text});
      x += btn.displayWidth + 20
      if (this.activePackage === i) this.setActiveBtn({btn, text});
    }
    
    const userCoinTexture: string = this.farm !== 'diamond' ? `${this.farm}Coin` : 'diamond';
    const titleTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '26px',
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
    const title2: Phaser.GameObjects.Text = this.scene.add.text(headerGeom.left + 60, headerGeom.bottom + 270 - 5, this.scene.state.lang.atYou, titleTextStyle).setOrigin(0, 0.5);
    const coin: Phaser.GameObjects.Sprite = this.scene.add.sprite(title2.getBounds().right + 7, title2.getBounds().centerY, userCoinTexture).setScale(0.12).setOrigin(0, 0.5);
    this.currentUserCountText = this.scene.add.text(coin.getBounds().right + 7, title2.getBounds().centerY, '', titleTextStyle).setOrigin(0, 0.5);

    this.donateBtn = this.scene.add.sprite(this.posx + 130, headerGeom.bottom + 270, 'clan-bank-button').setScale(0.7);
    this.donateBtnText = this.scene.add.text(this.donateBtn.x, this.donateBtn.y - 5, this.scene.state.lang.send, btnTextStyle).setOrigin(0.5);
    this.scene.clickModalBtn({ btn: this.donateBtn, title: this.donateBtnText }, (): void => { 
      this.addFarmMoney(); 
      this.disableTimer = 1000;
    });
  }

  private createDisableBtns(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '28px',
      align: 'center',
      wordWrap: { width: 400 },
    };

    const messageTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '26px',
      color: '#fffdfa',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
      wordWrap: { width: 400 },
    };
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    let x: number = headerGeom.left + 100;
    this.scene.add.nineslice(this.posx, headerGeom.bottom + 130, this.windowWidth, 150, 'clan-window-leader-plate-ns', 5).setOrigin(0.5);
    const btnTexture: string = `clan-bank-${this.farm}-package`;
    for (let i: number = 0; i < 4; i += 1) {
      const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, headerGeom.bottom + 130, `${btnTexture}-${i + 1}`).setScale(0.81).setTint(0x777777);
      this.scene.add.text(x, headerGeom.bottom + 160, shortNum(FARM_PACKAGE[i]), textStyle).setOrigin(0.5).setTint(0x777777);
      x += btn.displayWidth + 20
    }

    this.scene.add.text(this.posx, headerGeom.bottom + 260, this.scene.state.lang[`open${Utils.ucFirst(this.farm)}Farm`], messageTextStyle).setOrigin(0.5).setAlpha(0.9);
  }

  private setActiveBtn(el: {
    btn: Phaser.GameObjects.Sprite, 
    text: Phaser.GameObjects.Text,
  }): void {
    if (el.btn.type === 'active') return;
    this.setDisable();
    el.btn.type = 'active';
    this.activePackage = Number(el.btn.state);
    this.animActive(el);
  }

  private setDisable(): void {
    this.packageBtns.forEach(el => {
      if (el.btn.type !== 'disable') {
        el.btn.type = 'disable';
        this.animDisable(el);
      }
    });
  }

  private animDisable(el: {
    btn: Phaser.GameObjects.Sprite, 
    text: Phaser.GameObjects.Text,
  }): void {
    this.scene.add.tween({
      duration: 70,
      targets: el.text,
      y: '-=9',
      scale: 1,
    });
    this.scene.add.tween({
      duration: 70,
      targets: el.btn,
      scale: 0.81,
      onComplete: (): void => {
        el.btn.setTint(0xcccccc);
        el.text.setTint(0xcccccc);
      }
    });
  }

  private animActive(el: {
    btn: Phaser.GameObjects.Sprite, 
    text: Phaser.GameObjects.Text,
  }): void {
    this.scene.add.tween({
      duration: 70,
      targets: el.text,
      y: '+=9',
      scale: 1.2,
    });

    this.scene.add.tween({
      duration: 70,
      targets: el.btn,
      scale: 1,
      onComplete: (): void => {
        el.btn.setTint(0xffffff);
        el.text.setTint(0xffffff);
      }
    });

  }

  private createLogs(): void {
    this.logs = this.scene.state.clan[this.farm].logs;

    let y: number = this.scene.cameras.main.centerY + 70;
    const x: number = 160;
    this.logElements = this.scene.add.group();
    if (this.checkTextures()) {
      this.logs.reverse().forEach(el => {
        y = this.createLog(el, x, y);
      });
    } else {
      this.loadingAvatars().then(() => {
        this.logs.reverse().forEach(el => {
          y = this.createLog(el, x, y);
        });
      });
    }
  }

  private checkTextures(): boolean {
    return this.logs.every(el => {
      const avatarType = Number(el.avatar);
      const avatarTexture = isNaN(avatarType) ? `avatar-${el.id}` : `avatar-${avatarType}`;
      return this.scene.textures.exists(avatarTexture);
    });
  }

  private createLog(el: IclanUserLog, x: number, y: number) {
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
    const avatarType = Number(el.avatar);
    const avatarTexture = isNaN(avatarType) ? `avatar-${el.id}` : `avatar-${avatarType}`;
    const checkTexture = this.scene.textures.exists(avatarTexture);
    const maskSprite = this.scene.add.sprite(x, y, 'avatar-0').setVisible(false).setScale(0.5).setDepth(2);
    const mask = new Phaser.Display.Masks.BitmapMask(this.scene, maskSprite);
    const avatar = this.scene.add.sprite(x, y, avatarTexture).setMask(mask);
    if (!checkTexture)
      avatar.setTexture('avatar-0');
    const scaleX = maskSprite.displayWidth / avatar.displayWidth;
    const scaleY = maskSprite.displayHeight / avatar.displayHeight;
    avatar.setScale(scaleX, scaleY);

    const name = this.scene.add.text(x + avatar.displayWidth / 2 + 20, y, el.name, textStyle).setOrigin(0, 0.5).setDepth(2);
    if (name.displayHeight > 60) {
      const multiply: number = name.displayHeight / 60;
      name.setFontSize(parseInt(name.style.fontSize) / multiply);
    }
    const time = this.scene.add.text(x + 400, y, this.getDate(el.time), timeTextStyle).setOrigin(0.5).setDepth(2);
    const count = this.scene.add.text(x + 260, y, shortNum(el.count), textStyle).setOrigin(0, 0.5).setDepth(2);
    const coinTexture: string = this.farm !== 'diamond' ? `${this.farm}Coin` : 'diamond';
    const coin: Phaser.GameObjects.Sprite = this.scene.add.sprite(count.getBounds().left - 5, count.getBounds().centerY, coinTexture).setScale(0.11).setOrigin(1, 0.5).setDepth(2);

    this.logElements.add(avatar);
    this.logElements.add(name);
    this.logElements.add(time);
    this.logElements.add(count);
    this.logElements.add(coin);
    y += avatar.displayHeight + 14;
    return y;
  }

  private loadingAvatars(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.logs) {
        this.logs.forEach(el => {
          if (isNaN(Number(el.avatar))) this.scene.load.image(`avatar-${el.id}`, el.avatar);
        });
        this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
          resolve(true)
        });
        this.scene.load.start();
      }
    });
  }

  private addFarmMoney(): void {
    const packageCount: number = Number(this.packageBtns.find(el => el.btn.state === this.activePackage).text.state);
    const mainScene = this.scene.scene.get(this.scene.state.farm) as Sheep | Chicken | Cow | Unicorn;
    const farmUser: string = `user${Utils.ucFirst(this.farm)}`;
    if (this.farm !== 'diamond') {
      const farmMoney: number = Math.round(this.scene.state[farmUser].money);
      if (farmMoney >= packageCount) {
        this.postMoney(packageCount).then(res => {
          if (!res.data.error) {
            this.scene.state.clan = res.data.clan;
            this.scene.state[farmUser].money -= Number(packageCount);
            if (Number(packageCount) >= FARM_PACKAGE[2]) {
              MoneyAnimation.create(this.scene, `${this.farm}Coin`, {
                x: this.coinIcon.x + this.coinIcon.displayWidth / 2,
                y: this.coinIcon.y + this.coinIcon.displayHeight / 2,
              });
            } else {
              this.getCurrency({
                x: this.scene.cameras.main.centerX,
                y: this.header.getBounds().bottom + 260
              }, Number(packageCount), `${this.farm}Coin`);
            }
            this.scene.game.scene.keys[this.scene.state.farm].tryClanTask(11);
            const mainScene = this.scene.scene.get(this.scene.state.farm) as Sheep | Chicken | Cow | Unicorn;
            mainScene.autosave();
          }
        });
      } else if (this.scene.state.farm.toLowerCase() === this.farm) {
        const count: number = Number(packageCount) - Number(farmMoney);
        const diamonds: number = mainScene.convertMoney(count);
        this.openConvertor(count, diamonds, 1);
      } else {
        this.scene.state.modal = {
          type: 18,
          clanWindowType: 7,
          message: this.farm,
        }
        this.scene.scene.restart(this.scene.state);
      }
    } else {
      const userDiamonds: number = this.scene.state.user.diamonds;
      if (userDiamonds >= Number(packageCount)) {
        this.postMoney(Number(packageCount)).then(res => {
          if (!res.data.error) {
            this.scene.state.clan = res.data.clan;
            this.scene.state.user.diamonds -= Number(packageCount);
            this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
              type: 'donate_clan',
              count: Number(packageCount),
            });
            this.scene.state.amplitude.logAmplitudeEvent('clan_diamonds_get', {
              type: 'donate',
              count: Number(packageCount),
            });
            const text: string = this.scene.state.clan[`${this.farm}`].count;
            if (Number(packageCount) >= DIAMOND_PACKAGE[2]) {
              MoneyAnimation.create(this.scene, 'diamond', {
                x: this.coinIcon.x + this.coinIcon.displayWidth / 2,
                y: this.coinIcon.y + this.coinIcon.displayHeight / 2,
              });
            } else {
              this.getCurrency({x: this.scene.cameras.main.centerX, y: this.header.getBounds().bottom + 260}, Number(packageCount), `${this.farm}`);
            }
            this.scene.game.scene.keys[this.scene.state.farm].tryClanTask(11);
            this.currentCountText.setText(text);
            mainScene.autosave();
          }
        });
      } else {
        this.openConvertor(Number(packageCount) - userDiamonds, Number(packageCount) - userDiamonds, 2);
      }
    } 
  }

  private openConvertor(count: number, diamonds: number, type: number): void {
    this.scene.state.convertor = {
      fun: 0,
      count: count,
      diamonds: diamonds,
      type: type
    };
    this.scene.state.modal = {
      type: 1,
      sysType: 4,
    };
    this.scene.scene.restart(this.scene.state);
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }

  private postMoney(count: string | number): Promise<any> {
    let login: string = this.scene.state.user.login;
    if (this.scene.state.platform !== 'web' && this.scene.state.platform !== 'android') login = this.scene.state.name;
    const avatar: string = Number(this.scene.state.user.avatar) > 0 ? this.scene.state.user.avatar : this.scene.state.avatar;
    const points: number = this.farm !== 'diamond' ? this.convertPoints(Number(count)) : Number(count);
    const data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      count: count,
      farm: this.farm,
      name: login,
      avatar: avatar,
      status: this.scene.state.user.status,
      points: points,
    };

    return axios.post(process.env.API + '/addFarmMoney', data);
  }

  private getDate(data: Date): string {
    const time: Date = new Date(data);
    const year: number = time.getFullYear();
    const month: string = time.getMonth() + 1 < 10 ? '0' + time.getMonth() : String(time.getMonth());
    const day: number = time.getDate();
    const hours: number = time.getHours();
    const minutes: string = time.getMinutes() < 10 ? '0' + time.getMinutes() : String(time.getMinutes());
    const date: string =  hours + ':' + minutes + '\n' + day + '.' + month + '.' + year ;
    return date;
  }

  private convertPoints(money: number): number {
    const partsSettings: Ipart[] = this.scene.state[`${this.farm}Settings`][`${this.farm}Parts`];
    const part: number = this.scene.state[`user${Utils.ucFirst(this.farm)}`].part;
  
    const exchange: number = partsSettings.find((item: Ipart) => item.sort === part).exchange;
    return Math.ceil(money / exchange);
  }

  private getCurrency(position: Iposition, counter: number = 1, texture: string): void {
    if (counter > 5) counter = 5;
    const target: Iposition = {
      x: this.coinIcon.x + this.coinIcon.displayWidth / 2,
      y: this.coinIcon.y + this.coinIcon.displayHeight / 2,
    };
    this.scene.time.addEvent({ 
      delay: 100, 
      callback: (): void => {
        const pos: Iposition = {
          x: Phaser.Math.Between(position.x - 30, position.x + 30),
          y: Phaser.Math.Between(position.y - 30, position.y + 30),
        }
        Currency.create(this.scene, pos, target, texture, 350, 0.10, true);
      }, 
      callbackScope: this, 
      repeat: counter - 1,
    });
  }

  public preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (this.scene.scene.isActive() && this.scene.state.modal.type === 19 && this.scene.state.clan) {
      if (JSON.stringify(this.logs) !== JSON.stringify(this.scene.state.clan[this.farm].logs)) {
        this.logElements.destroy(true);
        this.createLogs();
      }
      if (this.donateBtn) {
        if (this.disableTimer > 0) {
          this.disableTimer -= delta;
          this.donateBtn.setTint(0x777777);
          this.donateBtnText.setTint(0x777777);
          this.donateBtn.removeInteractive();
          if (this.donateBtn.type !== 'disable') {
            this.donateBtn.type = 'disable';
          }
        } else {
          if (this.donateBtn.type === 'disable') {
            this.donateBtn.setTint(0xffffff);
            this.donateBtnText.setTint(0xffffff);
            this.donateBtn.setInteractive();
            this.donateBtn.type = 'active';
          }
        }
      }
      if (this.currentCountText.active) {
        if (this.farm !== 'diamond') {
          const text: string = this.scene.state.clan[this.farm].money;
          if (this.currentCountText.text !== text) this.currentCountText.setText(text);
        } else {
          const text: string = String(this.scene.state.clan[this.farm].count);
          if (this.currentCountText.text !== text) this.currentCountText.setText(text);
        }
      }
      if (this.currentUserCountText && this.currentUserCountText.active) {
        const farmUpperCase: string = Utils.ucFirst(this.farm);
        const text: string = this.farm !== 'diamond' ? shortNum(this.scene.state[`user${farmUpperCase}`].money) : String(this.scene.state.user.diamonds);
        const count: number = this.farm !== 'diamond' ? this.scene.state[`user${farmUpperCase}`].money : this.scene.state.user.diamonds;
        const packageCount: number = Number(this.packageBtns.find(el => el.btn.state === this.activePackage).text.state);
        const activeColor: string = '#dcff3c';
        const disableColor: string = '#f32a2a';
        if (this.currentUserCountText.text !== text) this.currentUserCountText.setText(text);
        if (count < packageCount) {
          if (this.currentUserCountText.style.color !== disableColor) this.currentUserCountText.setColor(disableColor);
        } else {
          if (this.currentUserCountText.style.color !== activeColor) this.currentUserCountText.setColor(activeColor);
        }
      }
    }
  }
  
}