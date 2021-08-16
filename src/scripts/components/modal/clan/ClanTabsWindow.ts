import { shortNum } from '../../../general/basic';
import Modal from '../../../scenes/Modal/Modal';
import LogoManager from '../../Utils/LogoManager';
const KEY: string = '1491f4c9d53dfa6c50d0c4a375f9ba76';

export default class ClanTabsWindow {
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

  private input: HTMLInputElement;
  private enterKey: Phaser.Input.Keyboard.Key;
  private inputText: Phaser.GameObjects.Text;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.createElements();
  }
  
  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.windowType = this.scene.state.modal.clanTabType || 2;
    this.height = 600;
    this.width = 527;
  }

  private createElements(): void {
    this.createBg();
    this.createHeader();
    this.createFooter();
    this.createCloseTab();
    if (this.scene.state.user.clanId) {
      if (this.scene.state.user.id === this.scene.state.clan.ownerId) {
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
    let left: number = headerGeom.left + 15;
    const maxWidth: number = 455;
    types.forEach((el: number) => {
      this.createTab({x: left, y: headerGeom.top + 25}, activeTab === el, tabCount, el)
      left += maxWidth / tabCount;
    });
  }

  private createTab(pos: Iposition, active: boolean, count: number, type: number): void {
    const tabTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#ffb27c',
      align: 'center',
      stroke: '#602000',
      strokeThickness: 3,
      wordWrap: { width: 100 },
    };
    const tabActiveTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#fff2e7',
      align: 'center',
      stroke: '#aa6100',
      strokeThickness: 3,
      wordWrap: { width: 100 },
    };

    const maxWidth: number = 455;
    const tabHeight: number = 104;
    const activeTabHeight: number = 115;
    const slice: number = 30;
    const height: number = active ? activeTabHeight : tabHeight;
    const texture: string = active ? 'clan-window-tab-active' : 'clan-window-tab-disable';
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = active ? tabActiveTextStyle : tabTextStyle;
    const tab: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(pos.x, pos.y, maxWidth / count, height, texture, slice).setOrigin(0, 1);
    const tabGeom: Phaser.Geom.Rectangle = tab.getBounds();
    let tabIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(tabGeom.centerX, tabGeom.centerY - 10, `clan-window-icon-${type}`).setOrigin(0.5);
    let flag: Phaser.GameObjects.Sprite;
    if (type === 1) {
      const mask = new Phaser.Display.Masks.BitmapMask(this.scene, tabIcon);
      mask.invertAlpha = true;
      flag = LogoManager.createFlag(this.scene, tabGeom.centerX + 5, tabGeom.centerY - 10 - 5, this.scene.state.clan.avatar).setScale(0.205).setMask(mask);
    }
    this.modalElements.push(tab, tabIcon);
    if (!active) {
      this.scene.clickButtonUp(tab, (): void => {
        this.scene.state.modal = {
          type: 17,
          clanTabType: type,
        };
        this.removeInput();
        this.scene.scene.stop('ClanScroll');
        this.scene.scene.restart(this.scene.state);
      }, tabIcon, flag);
    }
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
    const { name, avatar, points } = this.scene.state.clan;
    this.headerTextStyle.wordWrap = { width: 270, useAdvancedWrap: true };
    this.headerText = this.scene.add.text(headerGeom.left + 110, headerGeom.centerY, name, this.headerTextStyle).setDepth(2).setOrigin(0, 0.5).setFontSize(25);
    const clanAvatar = LogoManager.createIcon(this.scene, headerGeom.left + 60, headerGeom.centerY, avatar).setDepth(2).setScale(0.4);
    const scoreBg = this.scene.add.sprite(headerGeom.right - 20, headerGeom.centerY, 'clan-window-points-bg').setDepth(2).setOrigin(1, 0.5);
    const scoreBgGeom: Phaser.Geom.Rectangle = scoreBg.getBounds();
    const text: string = `${this.scene.state.lang.scores}: ${shortNum(points)}`;
    const scoreText = this.scene.add.text(scoreBgGeom.centerX, scoreBgGeom.centerY, text, scoreTextStyle).setDepth(2).setOrigin(0.5);
    this.scene.add.nineslice(this.x, this.y + 100, 480, 600, 'modal-square-bg', 10).setDepth(1).setOrigin(0.5);
    this.createClanBtns();
    this.scene.scene.launch('ClanScroll', this.scene.state);
  }

  private createClanBtns(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
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
  }

  private createLeaderboard(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    if (this.scene.state.user.clanId) {
      const bgHeight: number = 680;
      const bgY: number = this.y + 70;
      this.scene.add.nineslice(this.x, bgY, 480, bgHeight, 'modal-square-bg', 10).setDepth(1).setOrigin(0.5);
    } else {
      const bgHeight: number = 590;
      const bgY: number = this.y + 120;
      this.scene.add.nineslice(this.x, bgY, 480, bgHeight, 'modal-square-bg', 10).setDepth(1).setOrigin(0.5);
      this.scene.add.tileSprite(this.x, headerGeom.bottom - 2, this.width, 100, 'white-pixel').setTint(0xD06900).setOrigin(0.5, 0);
      const right1 = {
        text: 250,
        icon: 'diamond'
      };
      const btn = this.scene.bigButton('green', 'left', -240, this.scene.state.lang.createClan, right1);
      this.scene.clickModalBtn(btn, () => {
        this.scene.state.modal = {
          type: 18,
          clanWindowType: 1,
        };
        this.removeInput();
        this.scene.scene.stop('ClanScroll');
        this.scene.scene.restart(this.scene.state);
      });
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
    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(this.x, bgY, 480, bgHeight, 'modal-square-bg', 10).setDepth(1).setOrigin(0.5);
    const tile: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(this.x, headerGeom.bottom - 2, this.width, 100, 'white-pixel').setTint(0xD06900).setOrigin(0.5, 0);
    const inputBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(headerGeom.centerX - 45, headerGeom.centerY, 'clan-window-search-plate').setDepth(2);
    const inputBgGeom: Phaser.Geom.Rectangle = inputBg.getBounds();
    const searchBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(inputBgGeom.right + 40, inputBgGeom.centerY + 2, 'profile-window-button-green').setDepth(2).setScale(0.92);
    const searchBtnText: Phaser.GameObjects.Text = this.scene.add.text(searchBtn.x, searchBtn.y - 5, this.scene.state.lang.search, buttonTextStyle).setDepth(2).setOrigin(0.5);

    this.scene.clickModalBtn({ btn: searchBtn, title: searchBtnText }, () => { this.searchClans(); });

    this.inputText = this.scene.add.text(inputBgGeom.left + 10, inputBgGeom.centerY, this.scene.state.lang.inputClanName, inputTextStyle).setOrigin(0, 0.5).setDepth(5);
    this.createInput();

    this.scene.click(inputBg, () => {
      this.input.style.display = 'block';
      this.input.focus();
      this.inputText.setVisible(false);
    });
    
    this.scene.click(this.header, () => {
      this.input.style.display = 'none';
      this.input.blur();
      const text: string = this.input.value ? this.input.value : this.scene.state.lang.inputClanName;
      const color: string = this.input.value ? '#974f00' : '#8f8f8f';
      this.inputText.setText(text).setColor(color).setDepth(4).setCrop(0, 0, 280, 100).setVisible(true);
    })

    const right1 = {
      text: 250,
      icon: 'diamond'
    };
    const btn = this.scene.bigButton('green', 'left', -240, this.scene.state.lang.createClan, right1);
    this.scene.clickModalBtn(btn, () => {
      this.scene.state.modal = {
        type: 18,
        clanWindowType: 1,
      }
      this.removeInput();
      this.scene.scene.stop('ClanScroll');
      this.scene.scene.restart(this.scene.state);
    });

    this.modalElements.push(
      inputBg, 
      searchBtn, 
      searchBtnText, 
      this.inputText,
      btn.btn,
      btn.title,
      btn.text1,
      btn.text2,
      btn.img1,
      btn.img2,
      bg,
      tile,
    );

    this.scene.scene.launch('ClanScroll', this.scene.state);
  }

  private createInput(): void {
    const root: HTMLDivElement = document.querySelector('#root');
    this.input = document.createElement('input');
    root.append(this.input);
    this.input.setAttribute("id", "clan-search");
    this.input.setAttribute("autocomplete", "off");
    const height = Number(this.scene.game.config.height) / 12 - 100;
    const startTop: number = 19;
    const startBottom: number = 77;
    this.input.style.top = `${startTop + height / 4}%`;
    this.input.style.bottom = `${startBottom - height / 4}%`;
    this.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.enterKey.on('down', (): void => this.searchClans());

    const padding: number = this.scene.cameras.main.height / 100 * 10;
    let centered: boolean = true;
    let tempHeight: number = window.innerHeight;
    let windowHeight: number = window.innerHeight;

    window.onresize = (): void => {    
      if (window.innerHeight !== tempHeight) {
        tempHeight = window.innerHeight;
        if (tempHeight < windowHeight && centered) {
          root.scrollIntoView(false)
          const height = Number(this.scene.game.config.height) / 12 - 100;
          const startTop: number = 9;
          const startBottom: number = 87;
          this.input.style.top = `${startTop - height / 4}%`;
          this.input.style.bottom = `${startBottom + height / 4}%`;
          this.modalElements.forEach((el) => el?.setY(el.y + padding));
          this.scene.game.scene.keys['Chat'].scrolling.y += padding;
          centered = false;
        } else if (!centered) {
          const height = Number(this.scene.game.config.height) / 12 - 100;
          const startTop: number = 19;
          const startBottom: number = 77;
          this.input.style.top = `${startTop - height / 4}%`;
          this.input.style.bottom = `${startBottom + height / 4}%`;
          this.modalElements.forEach((el) => el?.setY(el.y - padding));
          this.scene.game.scene.keys['Chat'].scrolling.y -= padding;
          centered = true;
        }
      }
    }
  }

  private removeInput(): void {
    this.input?.remove();
    this.enterKey?.destroy();
  }

  private searchClans(): void {
    if (this.input.value !== '') {
      this.scene.scene.stop('ClanScroll');
      this.scene.state.searchClan = this.input.value;
      this.scene.scene.launch('ClanScroll', this.scene.state);
      this.input.value = '';
      this.input.style.display = 'none';
      this.input.blur();
      this.inputText.setText(this.scene.state.lang.inputClanName).setDepth(4).setCrop(0, 0, 280, 100).setColor('#8f8f8f').setVisible(true);
    }
  }

  private clanSettings(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();

    this.headerText = this.scene.add.text(headerGeom.left + 110, headerGeom.centerY, this.scene.state.clan.name, this.headerTextStyle).setDepth(2).setOrigin(0, 0.5).setFontSize(30);
    const clanAvatar = LogoManager.createIcon(this.scene, headerGeom.left + 60, headerGeom.centerY, this.scene.state.clan.avatar).setDepth(2).setScale(0.40);

    const right1 = {
      text: 100,
      icon: 'diamond'
    };

    const btn1 = this.scene.bigButton('green', 'left', -220, this.scene.state.lang.changeClanName, right1);
    this.scene.clickModalBtn(btn1, () => {
      this.removeInput();
      this.scene.scene.stop('ClanScroll');
      this.scene.state.modal = {
        type: 1,
        sysType: 21,
      }
      this.scene.scene.restart(this.scene.state);
    });

    const right2 = {
      text: 200,
      icon: 'diamond'
    };

    const btn2 = this.scene.bigButton('green', 'left', -130, this.scene.state.lang.changeClanAvatar, right2);
    this.scene.clickModalBtn(btn2, () => {
      this.scene.state.clanAvatar = this.scene.state.clan.avatar;
      this.scene.state.modal = {
        type: 18,
        clanWindowType: 2,
      };
      this.removeInput();
      this.scene.scene.stop('ClanScroll');
      this.scene.scene.restart(this.scene.state);
    });
  }
}