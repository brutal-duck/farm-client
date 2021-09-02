import axios from 'axios';
import { shortNum, shortTime } from '../../../general/basic';
import Modal from '../../../scenes/Modal/Modal';
import LogoManager from '../../Utils/LogoManager';
const KEY: string = '1491f4c9d53dfa6c50d0c4a375f9ba76';
const CHANGE_EMBLEM_COST: number = 200
const CHANGE_CLAN_NAME_COST: number = 200

export default class TournamentRaitingsWindow extends Phaser.GameObjects.Sprite {
  public scene: Modal;
  public x: number;
  public y: number;
  public scrollY: number;
  private windowHeight: number;
  private windowWidth: number;
  private bg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Sprite;
  private closeBtn: Phaser.GameObjects.Sprite;
  private headerText: Phaser.GameObjects.Text;
  private footer: Phaser.GameObjects.Sprite;
  private timer: Phaser.GameObjects.Text;
  private windowType: number = 1;
  private headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#fffdfa',
    fontFamily: 'Shadow',
    fontSize: '23px',
    align: 'left',
    shadow: {
      offsetX: 1,
      offsetY: 1, 
      color: '#96580e',
      blur: 2,
      fill: true,
    },
    wordWrap: { width: 400, useAdvancedWrap: true },
  };

  constructor(scene: Modal) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'pixel');
    this.scene = scene;
    this.init();
    this.createElements();
  }
  
  private init(): void {
    this.scene.add.existing(this);
    this.windowType = this.scene.state.modal.clanTabType || 1;
    this.windowHeight = 600;
    this.windowWidth = 527;
  }

  private createElements(): void {
    this.createBg();
    this.createHeader();
    this.createFooter();
    this.createCloseTab();
    this.createTabs([1, 2, 3]);
    this.createMainElements();
  }

  private createMainElements(): void {
    switch (this.windowType) {
      case 1:
        this.createClanLeaderboard();
        break;
      case 2:
        this.createUserLeaderboard();
        break;
      case 3:
        this.createRules();
        break;
      default:
        break;
    }
  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.windowWidth, this.windowHeight, 'white-pixel').setTint(0xFF9700);
  }

  private createHeader(): void {
    this.header = this.scene.add.sprite(this.x, this.y - this.windowHeight / 2 + 10 , 'clan-window-header').setDepth(2).setOrigin(0.5, 1);
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.windowHeight / 2, 'profile-window-footer').setOrigin(0.5, 0);
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
  }

  private createTabs(types: Array<number>): void {
    const activeTab: number = this.windowType;
    const tabCount: number = types.length;
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    let left: number = headerGeom.left + 15;
    const maxWidth: number = 455;
    types.forEach((el: number) => {
      this.createTab({x: left, y: headerGeom.top + 25}, activeTab === el, tabCount, el)
      left += maxWidth / tabCount;
    });
  }

  private createTab(pos: Iposition, active: boolean, count: number, type: number): void {
    const maxWidth: number = 455;
    const tabHeight: number = 104;
    const activeTabHeight: number = 115;
    const slice: number = 30;
    const height: number = active ? activeTabHeight : tabHeight;
    const texture: string = active ? 'clan-window-tab-active' : 'clan-window-tab-disable';
    const tab: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(pos.x, pos.y, maxWidth / count, height, texture, slice).setOrigin(0, 1);
    const tabGeom: Phaser.Geom.Rectangle = tab.getBounds();
    const icon: string =  type === 1 ?  'clan-window-icon-2' : type === 2 ?  'clan-window-icon-1' : 'clan-window-icon-5';
    let tabIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(tabGeom.centerX, tabGeom.centerY - 10, icon).setOrigin(0.5);
    let flag: Phaser.GameObjects.Sprite;
    if (type === 2) {
      const mask = new Phaser.Display.Masks.BitmapMask(this.scene, tabIcon);
      mask.invertAlpha = true;
      if (this.scene.state.clan.avatar) {
        flag = LogoManager.createFlag(this.scene, tabGeom.centerX + 5, tabGeom.centerY - 10 - 5, this.scene.state.clan.avatar).setScale(0.205).setMask(mask);
      }
    }
    if (!active) {
      this.scene.clickButtonUp(tab, (): void => {
        this.scene.state.modal = {
          type: 21,
          clanTabType: type,
        };
        this.scene.scene.stop('ClanScroll');
        this.scene.scene.restart(this.scene.state);
      }, tabIcon, flag);
    }
  }

  private createClanLeaderboard(): void {

    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    const bgHeight: number = 590;
    const bgY: number = this.y + 20;
    this.scene.add.nineslice(this.x, bgY, 480, bgHeight, 'modal-square-bg', 10).setDepth(1).setOrigin(0.5);

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 3, this.scene.state.lang.clansLiderboard, this.headerTextStyle).setDepth(2).setOrigin(0.5);

    this.createTimer({
      x: this.scene.cameras.main.centerX,
      y: bgY + bgHeight / 2 + 20,
    });

    this.scene.state.modal.clanTabType = 1;
    this.scene.scene.launch('ClanScroll', this.scene.state);
  }


  private createUserLeaderboard(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    const bgHeight: number = 590;
    const bgY: number = this.y + 20;
    this.scene.add.nineslice(this.x, bgY, 480, bgHeight, 'modal-square-bg', 10).setDepth(1).setOrigin(0.5);

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 3, this.scene.state.lang.clansLiderboard, this.headerTextStyle).setDepth(2).setOrigin(0.5);
    
    this.createTimer({
      x: this.scene.cameras.main.centerX,
      y: bgY + bgHeight / 2 + 20,
    });

    this.scene.scene.launch('ClanScroll', this.scene.state);
  }

  private createRules(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    const bgHeight: number = 590;
    const bgY: number = this.y + 20;
    this.scene.add.nineslice(this.x, bgY, 480, bgHeight, 'modal-square-bg', 10).setDepth(1).setOrigin(0.5);

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 3, this.scene.state.lang.clansLiderboard, this.headerTextStyle).setDepth(2).setOrigin(0.5);
    
    this.createTimer({
      x: this.scene.cameras.main.centerX,
      y: bgY + bgHeight / 2 + 20,
    });
  }

  private createTimer(pos: Iposition): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 350 },
      color: '#DD8842',
      fontSize: '22px',
      align: 'center',
    };

    const bgWidth: number = 460;

    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(pos.x, pos.y, bgWidth, 60, 'tasks-bar-ns', 15).setOrigin(0.5, 0);
    const bgGeom: Phaser.Geom.Rectangle = bg.getBounds();
    this.timer = this.scene.add.text(bgGeom.centerX, bgGeom.centerY, '', textStyle).setOrigin(0.5);
  }
  public preUpdate(): void {
    if (this.timer && this.timer.active) {
      const timerText: string = `${this.scene.state.lang.eventLastTime} ${shortTime(this.scene.state.progress.clanEvent.endTime, this.scene.state.lang)}`;
      if (this.timer.text !== timerText) this.timer.setText(timerText);
    }
  }
}