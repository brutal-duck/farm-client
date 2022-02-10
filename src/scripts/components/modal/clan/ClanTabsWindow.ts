import axios from 'axios';
import { shortNum, shortTime } from '../../../general/basic';
import Modal from '../../../scenes/Modal/Modal';
import LogoManager from '../../Utils/LogoManager';
import { CHANGE_EMBLEM_COST, CHANGE_CLAN_NAME_COST, CREATE_CLAN_COST } from '../../../local/settings';
import BigButton from './../../Buttons/BigButton';
import Utils from './../../../libs/Utils';
import ClanTab from './ClanTab';
const KEY: string = '1491f4c9d53dfa6c50d0c4a375f9ba76';


export default class ClanTabsWindow extends Phaser.GameObjects.Sprite {
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
  private modalElements: Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.TileSprite | Phaser.GameObjects.Text | Phaser.GameObjects.RenderTexture | IroundedField | BigButton> = [];
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

  private mainInput: HTMLInputElement;
  private enterKey: Phaser.Input.Keyboard.Key;
  private inputText: Phaser.GameObjects.Text;
  private cooldownTimer: Phaser.GameObjects.Text;

  constructor(scene: Modal) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'pixel');
    this.scene = scene;
    this.init();
    this.createElements();
  }
  
  private init(): void {
    this.scene.add.existing(this);
    this.windowType = this.scene.state.modal.clanTabType || 2;
    this.windowHeight = 600;
    this.windowWidth = 527;
  }

  private createElements(): void {
    this.createBg();
    this.createHeader();
    this.createFooter();
    this.createCloseTab();
    if (this.scene.state.clan) {
      if (this.scene.state.user.id === this.scene.state.clan?.ownerId) {
        this.createTabs([1, 2, 4]);
      } else {
        this.createTabs([1, 2]);
      }
    } else {
      this.createTabs([2, 3]);
    }
    this.createMainElements();
  }

  private createMainElements(): void {
    switch (this.windowType) {
      case 1:
        this.createClanInfo();
        break;
      case 2:
        this.createLeaderboard();
        break;
      case 3:
        this.createSearch();
        break;
      case 4:
        this.clanSettings();
        break;
      default:
        break;
    }
  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.windowWidth, this.windowHeight, 'white-pixel').setTint(0xFF9700);
    this.modalElements.push(this.bg);
  }

  private createHeader(): void {
    this.header = this.scene.add.sprite(this.x, this.y - this.windowHeight / 2 + 10 , 'clan-window-header').setDepth(2).setOrigin(0.5, 1);
    this.modalElements.push(this.header);
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.windowHeight / 2, 'profile-window-footer').setOrigin(0.5, 0);
    this.modalElements.push(this.footer);
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.removeInput();
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
    const activeTab: number = this.windowType;
    const tabCount: number = types.length;
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    let left: number = headerGeom.left + 90;
    if (types.length === 2) left = headerGeom.left + 130;
    const maxWidth: number = 455;
    types.forEach((el: number) => {
      this.createTab({ x: left, y: headerGeom.top - 25 }, activeTab === el, tabCount, el)
      left += maxWidth / tabCount - 1;
    });
  }

  private createTab(pos: Iposition, active: boolean, count: number, type: number): void {
    const maxWidth: number = 455;
    const tabHeight: number = 104;
    const activeTabHeight: number = 115;
    const slice: number = 30;
    const height: number = active ? activeTabHeight : tabHeight;
    const texture = active ? 'clan-window-tab-active' : 'clan-window-tab-disable';
    const callback = () => {
      this.scene.state.modal = {
        type: 17,
        clanTabType: type,
      };
      this.removeInput();
      this.scene.scene.stop('ClanScroll');
      this.scene.scene.restart(this.scene.state);
    };

    const tab = new ClanTab(this.scene, pos.x, pos.y, maxWidth / count, height, `clan-window-icon-${type}`, active, callback, type);
    this.modalElements.push(
      tab, 
      tab.tl,
      tab.tc,
      tab.tr,
      tab.ml,
      tab.mr,
      tab.bl,
      tab.bc,
      tab.br,
      tab.icon,
      tab.flag,
    );
  }

  private createClanInfo(): void {
    const scoreTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#f3dcc9',
      fontFamily: 'Shadow',
      fontSize: '19px',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    if (!this.scene.state.clan) {
      this.scene.scene.stop()
      this.scene.scene.stop('ClanScroll');
      this.scene.scene.stop('ClanFarm');
      return;
    }
    const { name, avatar, points } = this.scene.state.clan;
    this.headerTextStyle.wordWrap = { width: 270, useAdvancedWrap: true };
    this.headerText = this.scene.add.text(headerGeom.left + 110, headerGeom.centerY, name, this.headerTextStyle).setDepth(2).setOrigin(0, 0.5).setFontSize(25);
    const clanAvatar = LogoManager.createIcon(this.scene, headerGeom.left + 60, headerGeom.centerY, avatar).setDepth(2).setScale(0.4);
    const scoreBg = this.scene.add.sprite(headerGeom.right - 20, headerGeom.centerY, 'clan-window-points-bg').setDepth(2).setOrigin(1, 0.5);
    const scoreBgGeom: Phaser.Geom.Rectangle = scoreBg.getBounds();
    const text: string = `${this.scene.state.lang.scores}: ${shortNum(points)}`;
    const scoreText = this.scene.add.text(scoreBgGeom.centerX, scoreBgGeom.centerY, text, scoreTextStyle).setDepth(2).setOrigin(0.5);
    this.scene.add.roundedField(this.x, this.y + 100, 480, 600, 'modal-square-bg').setDepth(1);
    this.createClanBtns();
    this.scene.scene.launch('ClanScroll', this.scene.state);
    const limit: number = this.scene.state.clan.main.cooldown > 0 ? this.scene.state.clan.limit - 1 : this.scene.state.clan.limit;
    const countText: string = `${this.scene.state.lang.players} ${this.scene.state.clan.users.length}/${limit}`
    const userCount: Phaser.GameObjects.Text = this.scene.add.text(headerGeom.left  + 40, headerGeom.bottom + 40, countText, this.headerTextStyle).setOrigin(0, 0.5);
  }

  private createClanBtns(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100, useAdvancedWrap: true },
      align: 'center',
      fontSize: '16px',
      color: '#ffffff',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    
    const leaveBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(headerGeom.centerX  + 30, headerGeom.bottom + 45, 'profile-window-button-red');
    const leaveBtnText: Phaser.GameObjects.Text = this.scene.add.text(leaveBtn.x, leaveBtn.y - 5, this.scene.state.lang.leaveClan, textStyle).setOrigin(0.5);
    
    const chatBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(headerGeom.centerX + 170, headerGeom.bottom + 45, 'profile-window-button-yellow');
    const chatBtnText: Phaser.GameObjects.Text = this.scene.add.text(chatBtn.x, chatBtn.y - 5, this.scene.state.lang.clanChat.replace(' ', '\n'), textStyle).setOrigin(0.5);

    this.scene.clickModalBtn({ btn: leaveBtn, title: leaveBtnText }, () => { this.onLeaveBtn(); });

    this.scene.clickModalBtn({ btn: chatBtn, title: chatBtnText }, () => { this.onChatBtn(); });
  }

  private onChatBtn(): void {
    this.scene.state.modal = {
      type: 9,
      chatType: 3,
    };
    this.scene.scene.stop('ClanScroll');
    this.scene.scene.restart(this.scene.state);
  }

  private onLeaveBtn(): void {
    let login: string = this.scene.state.user.login;
    if (this.scene.state.platform !== 'web' && this.scene.state.platform !== 'android') login = this.scene.state.name;
    this.scene.state.socket.io.emit('sendClanMessage', {
      id: this.scene.state.user.id,
      clanId: this.scene.state.user.clanId,
      message: KEY,
      userName: login,
      userStatus: this.scene.state.user.status,
    });

    this.scene.state.socket.io.emit('leaveClan');
    this.scene.state.user.clanId = null;
    this.scene.state.clan = null;
    this.scene.state.user.messages = this.scene.state.user.messages.filter(el => el.type !== 5);
    this.scene.state.modal = {
      type: 17,
      clanTabType: 2,
    };
    this.removeInput();
    this.scene.scene.stop('ClanScroll');
    this.scene.scene.stop('ClanFarm');
    this.scene.scene.restart(this.scene.state);
    this.scene.scene.launch('Profile', this.scene.state);
  }

  private createLeaderboard(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    if (this.scene.state.user.clanId) {
      const bgHeight: number = 680;
      const bgY: number = this.y + 70;
      this.scene.add.roundedField(this.x, bgY, 480, bgHeight, 'modal-square-bg').setDepth(1);
    } else {
      const bgHeight: number = 590;
      const bgY: number = this.y + 120;
      this.scene.add.roundedField(this.x, bgY, 480, bgHeight, 'modal-square-bg').setDepth(1);
      this.scene.add.tileSprite(this.x, headerGeom.bottom - 2, this.windowWidth, 100, 'white-pixel').setTint(0xD06900).setOrigin(0.5, 0);
      const right1: IbigButtonElementSettings = {
        text: String(CREATE_CLAN_COST),
        icon: 'diamond',
        sale: Utils.checkSale(this.scene.state, 'CLAN') ? String(Math.floor(CREATE_CLAN_COST / 2)) : null,
      };
      
      const settings: IbigButtonSetting = {
        color: 'green',
        textAlign: 'left',
        text: this.scene.state.lang.createClan,
        right1: right1,
      }
      const action = () => {
          this.scene.state.modal = {
            type: 18,
            clanWindowType: 1,
          };
          this.removeInput();
          this.scene.scene.stop('ClanScroll');
          this.scene.scene.restart(this.scene.state);
      };

      new BigButton(this.scene, -240, action, settings);
    }

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 3, this.scene.state.lang.clansLiderboard, this.headerTextStyle).setDepth(2).setOrigin(0.5);
    this.scene.scene.launch('ClanScroll', this.scene.state);
  }

  private createSearch(): void {
    const buttonTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      color: '#fffdfa',
      fontSize: '19px',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };
    const inputTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '22px',
      fontFamily: 'Bip',
      color: '#8f8f8f',
    };
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    const bgHeight: number = 590;
    const bgY: number = this.y + 120;
    const bg: IroundedField = this.scene.add.roundedField(this.x, bgY, 480, bgHeight, 'modal-square-bg').setDepth(1);
    const tile: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(this.x, headerGeom.bottom - 2, this.windowWidth, 100, 'white-pixel').setTint(0xD06900).setOrigin(0.5, 0);
    const inputBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(headerGeom.centerX - 45, headerGeom.centerY, 'clan-window-search-plate').setDepth(2);
    const inputBgGeom: Phaser.Geom.Rectangle = inputBg.getBounds();
    const searchBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(inputBgGeom.right + 40, inputBgGeom.centerY + 2, 'profile-window-button-green').setDepth(2).setScale(0.92);
    const searchBtnText: Phaser.GameObjects.Text = this.scene.add.text(searchBtn.x, searchBtn.y - 5, this.scene.state.lang.search, buttonTextStyle).setDepth(2).setOrigin(0.5);

    this.scene.clickModalBtn({ btn: searchBtn, title: searchBtnText }, () => { this.searchClans(); });

    this.inputText = this.scene.add.text(inputBgGeom.left + 10, inputBgGeom.centerY, this.scene.state.lang.inputClanName, inputTextStyle).setOrigin(0, 0.5).setDepth(5);
    this.createInput();

    this.scene.click(inputBg, () => {
      this.mainInput.style.display = 'block';
      this.mainInput.focus();
      this.inputText.setVisible(false);
    });
    
    this.scene.click(this.header, () => {
      this.mainInput.style.display = 'none';
      this.mainInput.blur();
      const text: string = this.mainInput.value ? this.mainInput.value : this.scene.state.lang.inputClanName;
      const color: string = this.mainInput.value ? '#974f00' : '#8f8f8f';
      this.inputText.setText(text).setColor(color).setDepth(4).setCrop(0, 0, 280, 100).setVisible(true);
    })

    const right1: IbigButtonElementSettings = {
      text: String(CREATE_CLAN_COST),
      icon: 'diamond',
      sale: Utils.checkSale(this.scene.state, 'CLAN') ? String(Math.floor(CREATE_CLAN_COST / 2)) : null,
    };
    
    const settings: IbigButtonSetting = {
      color: 'green',
      textAlign: 'left',
      text: this.scene.state.lang.createClan,
      right1: right1,
    }
    const action = () => {
        this.scene.state.modal = {
          type: 18,
          clanWindowType: 1,
        };
        this.removeInput();
        this.scene.scene.stop('ClanScroll');
        this.scene.scene.restart(this.scene.state);
    };

    const btn = new BigButton(this.scene, -240, action, settings);

    this.modalElements.push(
      inputBg, 
      searchBtn, 
      searchBtnText, 
      this.inputText,
      btn,
      bg,
      tile,
    );

    this.scene.scene.launch('ClanScroll', this.scene.state);
  }

  private createInput(): void {
    const root: HTMLDivElement = document.querySelector('#root');
    this.mainInput = document.createElement('input');
    root.append(this.mainInput);
    this.mainInput.setAttribute("id", "clan-search");
    this.mainInput.setAttribute("autocomplete", "off");
    const height = Number(this.scene.game.config.height) / 12 - 100;
    const startTop: number = 19;
    const startBottom: number = 77;
    this.mainInput.style.top = `${startTop + height / 4}%`;
    this.mainInput.style.bottom = `${startBottom - height / 4}%`;
    this.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.enterKey.on('down', (): void => this.searchClans());

    const paddingPercent = 10;
    const padding: number = this.scene.cameras.main.height / 100 * paddingPercent;
    let centered: boolean = true;
    let tempHeight: number = window.innerHeight;
    const windowHeight: number = window.innerHeight;

    window.onresize = (): void => {
      tempHeight = window.innerHeight;
      if (windowHeight !== tempHeight && centered) {
        root.scrollIntoView(false)
        const topNewPosition: number = +this.mainInput.style.top.replace('%', '') + paddingPercent;
        const bottomNewPosition: number = +this.mainInput.style.bottom.replace('%', '') - paddingPercent;
        this.mainInput.style.top = `${topNewPosition}%`;
        this.mainInput.style.bottom = `${bottomNewPosition}%`;
        this.modalElements.forEach((el) => el?.setY(el.y + padding));
        this.scene.game.scene.keys['ClanScroll'].scrolling.y += padding;
        centered = false;

      } else if (windowHeight === tempHeight && !centered) {
        const topNewPosition: number = +this.mainInput.style.top.replace('%', '') - paddingPercent;
        const bottomNewPosition: number = +this.mainInput.style.bottom.replace('%', '') + paddingPercent;
        this.mainInput.style.top = `${topNewPosition}%`;
        this.mainInput.style.bottom = `${bottomNewPosition}%`;
        this.modalElements.forEach((el) => el?.setY(el.y - padding));
        this.scene.game.scene.keys['ClanScroll'].scrolling.y -= padding;
        centered = true;
      }
    }
  }

  private removeInput(): void {
    this.mainInput?.remove();
    this.enterKey?.destroy();
  }

  private searchClans(): void {
    if (this.mainInput.value !== '') {
      this.scrollY = this.scene.game.scene.keys['ClanScroll'].scrolling.y
      this.scene.scene.stop('ClanScroll');
      this.scene.state.searchClan = this.mainInput.value;
      this.scene.scene.launch('ClanScroll', this.scene.state);
      this.mainInput.value = '';
      this.mainInput.style.display = 'none';
      this.mainInput.blur();
      this.inputText.setText(this.scene.state.lang.inputClanName).setDepth(4).setCrop(0, 0, 280, 100).setColor('#8f8f8f').setVisible(true);
    }
  }

  private clanSettings(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    const btnTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '19px',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
      wordWrap: { width: 160, useAdvancedWrap: true },
    };

    const errorTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '19px',
      color: '#DC3D00',
      align: 'center',
      wordWrap: { width: 480, useAdvancedWrap: true },
    };

    this.headerText = this.scene.add.text(headerGeom.left + 110, headerGeom.centerY, this.scene.state.clan?.name, this.headerTextStyle).setDepth(2).setOrigin(0, 0.5).setFontSize(30);
    const clanAvatar = LogoManager.createIcon(this.scene, headerGeom.left + 60, headerGeom.centerY, this.scene.state.clan?.avatar).setDepth(2).setScale(0.40);
    let price: number;

    // Первый слот
    const boosterBg: IroundedField = this.scene.add.roundedField(headerGeom.centerX, headerGeom.bottom + 20, 480, 150, 'modal-square-bg').setOriginY(0).setDepth(2);
    const boosterTextBg = this.scene.add.sprite(boosterBg.getTopCenter().x, boosterBg.getTopCenter().y + 2, 'clan-window-leader-plate-2').setOrigin(0.5, 0).setDisplaySize(479, 45).setDepth(2);
    const boosterIcon = this.scene.add.sprite(boosterBg.getLeftCenter().x + 70, boosterBg.getCenter().y, 'clan-task-icon-6').setScale(1.15).setDepth(2);
    this.cooldownTimer = this.scene.add.text(boosterTextBg.getCenter().x + 40, boosterTextBg.getCenter().y, '', this.headerTextStyle).setOrigin(0.5).setDepth(2);
    const boosterBtn = this.scene.add.sprite(boosterBg.getCenter().x, boosterBg.getCenter().y + 24, 'profile-window-button-green').setScale(1.40, 1.05).setDepth(2);
    const boosterBtnText = this.scene.add.text(boosterBtn.getCenter().x, boosterBtn.getCenter().y - 1, '', btnTextStyle).setOrigin(0.5, 0.6).setDepth(2);
    const boosterValuta = this.scene.add.sprite(boosterBtn.getRightCenter().x + 40, boosterBtn.y - 5, 'clan-diamond-coin').setScale(0.7).setDepth(2);
    const boosterPriceText = this.scene.add.text(boosterValuta.x + 30, boosterValuta.y, '', this.headerTextStyle).setFontSize(28).setOrigin(0, 0.5).setDepth(2);

    this.scene.clickModalBtn({ btn: boosterBtn, title: boosterBtnText }, () => { improveOrBoostClanHQ(); });

    if (this.scene.state.clan?.main.cooldown > 0) {
      this.cooldownTimer.setText(`${this.scene.state.lang.left} ${shortTime(this.scene.state.clan.main.cooldown, this.scene.state.lang)}`);
      boosterBtnText.setText(this.scene.state.lang.speedUpImprovment);
      const estimateCost: number = Math.round(this.scene.state.clan.main.cooldown / 60) * 2;
      price = estimateCost > 1000 ? 1000 : estimateCost;
    } else {
      this.cooldownTimer.setText(`${this.scene.state.lang.headquarters} ${this.scene.state.lang.lvl} ${this.scene.state.clan.main.level}`);
      boosterBtnText.setText(this.scene.state.lang.improveClan);
      price = 100 * Math.pow(2, this.scene.state.clan.main.level - 1);
    }

    boosterPriceText.setText(String(price < 1000 ? price : shortNum(price))).setFontSize(boosterPriceText.getBounds().width > 70 ? 27 : 28)

    // Второй слот
    const changeEmblemBg: IroundedField = this.scene.add.roundedField(boosterBg.getBottomCenter().x, boosterBg.getBottomCenter().y + 30, 480, 150, 'modal-square-bg').setOriginY(0).setDepth(2);
    const changeEmblemTextBg = this.scene.add.sprite(changeEmblemBg.getTopCenter().x, changeEmblemBg.getTopCenter().y + 2, 'clan-window-leader-plate-2').setOrigin(0.5, 0).setDisplaySize(479, 45).setDepth(2);
    const clanEmblem = LogoManager.createIcon(this.scene, changeEmblemBg.getLeftCenter().x + 70, changeEmblemBg.getCenter().y, this.scene.state.clan?.avatar).setDepth(2).setScale(0.5);
    const changeEmblemText = this.scene.add.text(changeEmblemTextBg.getCenter().x + 40, changeEmblemTextBg.getCenter().y, this.scene.state.lang.emblem, this.headerTextStyle).setOrigin(0.5).setDepth(2);
    const changeEmblemBtn = this.scene.add.sprite(changeEmblemBg.getCenter().x, changeEmblemBg.getCenter().y + 24, 'profile-window-button-green').setScale(1.40, 1.05).setDepth(2);
    const changeEmblemBtnText = this.scene.add.text(changeEmblemBtn.getCenter().x, changeEmblemBtn.getCenter().y - 1, this.scene.state.lang.changeEmblem, btnTextStyle).setOrigin(0.5, 0.6).setDepth(2);
    
    if (Utils.checkSale(this.scene.state, 'CLAN')) {
      const changeEmblemValuta = this.scene.add.sprite(changeEmblemBtn.getRightCenter().x + 30, changeEmblemBtn.y - 5, 'diamond').setScale(0.15).setDepth(2);
      const text1 = this.scene.add.text(changeEmblemValuta.x + 25, changeEmblemValuta.y, String(CHANGE_EMBLEM_COST), this.headerTextStyle).setColor('#eeeeee').setFontSize(24).setOrigin(0, 0.5).setDepth(2);
      this.scene.add.text(text1.getBounds().right + 3, changeEmblemValuta.y, String(Math.floor(CHANGE_EMBLEM_COST / 2)), this.headerTextStyle).setFontSize(28).setOrigin(0, 0.5).setDepth(2);
      this.scene.add.tileSprite(text1.getCenter().x, text1.y, text1.displayWidth, 4, 'text-sale').setDepth(2).setAngle(5).setOrigin(0.5);
    } else {
      const changeEmblemValuta = this.scene.add.sprite(changeEmblemBtn.getRightCenter().x + 30, changeEmblemBtn.y - 5, 'diamond').setScale(0.15).setDepth(2);
      this.scene.add.text(changeEmblemValuta.x + 30, changeEmblemValuta.y, String(CHANGE_EMBLEM_COST), this.headerTextStyle).setFontSize(28).setOrigin(0, 0.5).setDepth(2);
    }
    
    this.scene.clickModalBtn({ btn: changeEmblemBtn, title: changeEmblemBtnText }, () => { changeClanEmblem(); });

    // Третий слот
    const changeClanNameBg: IroundedField = this.scene.add.roundedField(changeEmblemBg.getBottomCenter().x, changeEmblemBg.getBottomCenter().y + 30, 480, 220, 'modal-square-bg').setOriginY(0).setDepth(3);
    const changeClanNameTextBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(changeClanNameBg.getTopCenter().x, changeClanNameBg.getTopCenter().y + 2, 'clan-window-leader-plate-2').setOrigin(0.5, 0).setDisplaySize(479, 45).setDepth(3);
    const changeClanNameText: Phaser.GameObjects.Text = this.scene.add.text(changeClanNameTextBg.getCenter().x, changeClanNameTextBg.getCenter().y, String(this.scene.state.lang.clanName), this.headerTextStyle).setOrigin(0.5).setDepth(3);
    const inpitField: Phaser.GameObjects.Sprite = this.scene.add.sprite(changeClanNameBg.getCenter().x, changeClanNameTextBg.getBottomCenter().y + 20, 'clan-window-search-plate').setScale(1.175, 1.14).setOrigin(0.5, 0).setDepth(3).setInteractive();
    const inputText: Phaser.GameObjects.Text = this.scene.add.text(inpitField.getLeftCenter().x + 12, inpitField.getCenter().y, this.scene.state.lang.inputClanName, {
      font: '22px Bip',
      color: '#8f8f8f',
    }).setOrigin(0, 0.5).setDepth(4).setCrop(0, 0, inpitField.getBounds().width - 24, 100);
    const result: Phaser.GameObjects.Text = this.scene.add.text(changeClanNameBg.getBottomCenter().x, changeClanNameBg.getBottomCenter().y + 16, '', errorTextStyle).setOrigin(0.5, 0).setDepth(3);

    const right1: IbigButtonElementSettings = {
      text: String(CHANGE_CLAN_NAME_COST),
      icon: 'diamond',
      sale: Utils.checkSale(this.scene.state, 'CLAN') ? String(Math.floor(CHANGE_CLAN_NAME_COST / 2)) : null,
    };
    
    const settings: IbigButtonSetting = {
      color: 'green',
      textAlign: 'left',
      text: this.scene.state.lang.changeClanName,
      right1: right1,
    }
    const action = () => {
      changeClanName();
    };

    const changeClanNameBtn = new BigButton(this.scene, 260, action, settings, 0.9);
    changeClanNameBtn.setDepth(3).setScale(0.9);

    let change: boolean = false;
    const root: HTMLDivElement = document.querySelector('#root');
    this.mainInput = document.createElement('input');
    root.append(this.mainInput);
    this.mainInput.setAttribute("id", "clan-change-name");
    this.mainInput.setAttribute("autocomplete", "off");
    this.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.enterKey.on('down', (): void => { changeClanName(); });
    const blurZone: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(this.header.getBottomCenter().x, this.header.getBottomCenter().y, this.scene.cameras.main.width, this.scene.cameras.main.height - this.header.getBottomCenter().y, 'pixel').setOrigin(0.5, 0).setAlpha(0.0001).setVisible(false).setDepth(2).setInteractive()
    this.scene.click(inpitField, (): void => { focus(); });
    this.scene.click(blurZone, (): void => { blur(); });

    const focus = () => {
      this.mainInput.style.display = 'block';
      this.mainInput.focus();
      blurZone.setVisible(true)
      inputText.setVisible(false);
    }

    const blur = () => {
      this.mainInput.style.display = 'none';
      this.mainInput.blur();
      const text: string = this.mainInput.value ? this.mainInput.value : this.scene.state.lang.inputClanName;
      const color: string = this.mainInput.value ? '#974f00' : '#8f8f8f';
      blurZone.setVisible(false)
      inputText.setText(text).setColor(color).setDepth(4).setCrop(0, 0, inpitField.getBounds().width - 24, 100).setVisible(true);
    }

    const changeClanName = () => {
      if (this.scene.state.user.diamonds >= CHANGE_CLAN_NAME_COST) {
        if (!change) {
          blur();
          let checkName: boolean = true;
          const str: string = this.mainInput.value;
          const re: RegExp = /[\p{Alpha}\p{Nd}\s]/gu;
          const matched = str.match(re);
          checkName = !(!matched || matched.length < str.length);
          if (str.length < 6 || str.length > 20) checkName = false;
          
          if (checkName) {
            change = true;
            axios.post(process.env.API + '/changeClanName', {
              clanId: this.scene.state.clan.id,
              userId: this.scene.state.user.id,
              hash: this.scene.state.user.hash,
              counter: this.scene.state.user.counter,
              name: str,
            }).then((res) => {
              if (res.data.error) {
                change = false;
                result.setText(this.scene.state.lang.haveClan).setAlpha(1);
              } else {          
                this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
                this.enterKey.destroy();
                this.removeInput();
                this.scene.scene.stop('ClanScroll');
                this.scene.scene.restart(this.scene.state);
                this.scene.state.user.diamonds -= CHANGE_CLAN_NAME_COST;
                this.scene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
                  type: 'change_clan_name',
                  count: CHANGE_CLAN_NAME_COST,
                });
              }
            });
          } else {
            result.setText(this.scene.state.lang.validClanName).setAlpha(1);
          }
        }
      } else {
        this.scene.state.convertor = {
          fun: 0,
          count: CHANGE_CLAN_NAME_COST - this.scene.state.user.diamonds,
          diamonds: CHANGE_CLAN_NAME_COST - this.scene.state.user.diamonds,
          type: 2
        };
        this.scene.state.modal = {
          type: 1,
          sysType: 4,
        };
        this.removeInput();
        this.scene.scene.restart(this.scene.state);
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      }

    }

    const changeClanEmblem = () => {
      this.scene.state.clanAvatar = this.scene.state.clan.avatar;
      this.scene.state.modal = {
        type: 18,
        clanWindowType: 2,
      };
      this.removeInput();
      this.scene.scene.stop('ClanScroll');
      this.scene.scene.restart(this.scene.state);
    }

    const improveOrBoostClanHQ = () => {
      if (this.scene.state.clan.main.cooldown > 0) {
        this.scene.state.modal = {
          type: 18,
          clanWindowType: 6,
          message: 'main',
        };
        this.removeInput();
        this.scene.scene.stop('ClanScroll');
        this.scene.scene.restart(this.scene.state);

      } else {
        this.scene.state.modal = {
          type: 18,
          clanWindowType: 3,
        };
        this.removeInput();
        this.scene.scene.stop('ClanScroll');
        this.scene.scene.restart(this.scene.state);
      }
    }
  }

  public preUpdate(): void {
    if (this.cooldownTimer?.active && this.scene.state.clan.main.cooldown > 0) {
      const text: string = `${this.scene.state.lang.left} ${shortTime(this.scene.state.clan?.main.cooldown, this.scene.state.lang)}`;
      if (text !== this.cooldownTimer.text) {
        this.cooldownTimer.setText(text);
      }
    }
  }
}