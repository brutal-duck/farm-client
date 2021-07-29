import Modal from './../../../scenes/Modal/Modal';

export default class ClanWindowBars {
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
  private clanTab: Phaser.GameObjects.RenderTexture;
  private leaderboardTab: Phaser.GameObjects.RenderTexture;
  private searchTab: Phaser.GameObjects.RenderTexture;
  private clanTabText: Phaser.GameObjects.Text;
  private leaderboardTabText: Phaser.GameObjects.Text;
  private searchTabText: Phaser.GameObjects.Text;
  private tabClose: Phaser.GameObjects.Sprite;
  private tabCloseBtn: Phaser.GameObjects.Sprite;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.createElements();
  }
  
  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.height = 600;
    this.width = 527;
  }

  private createElements(): void {
    this.createBg();
    this.createHeader();
    this.createFooter();
    this.createTabs();
    this.setTabsListeners();
    if (this.scene.state.modal.clanType === 1){
      this.createClanInfo();
    }
  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.width, this.height, 'white-pixel').setTint(0xFA8F1F);
  }

  private createHeader(): void {

    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 10 , 'clan-window-header').setDepth(2).setOrigin(0.5, 1);
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2, 'profile-window-footer').setOrigin(0.5, 0);
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
    this.scene.scene.stop('Clan');
  }

  private createCloseTab(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    this.tabClose = this.scene.add.sprite(headerGeom.right - 18, headerGeom.top + 5, 'clan-window-tab-close').setOrigin(1, 1);
    const tabGeom: Phaser.Geom.Rectangle = this.tabClose.getBounds();
    this.tabCloseBtn = this.scene.add.sprite(tabGeom.centerX + 5, tabGeom.centerY - 5, 'tasks-close').setOrigin(0.5).setScale(0.9);
  }

  private createTabs(): void {
    const tabCount: number = this.scene.state.user.clanId ? 3 : 2;
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    this.createCloseTab();
    let tabClanGeom: Phaser.Geom.Rectangle;
    let leaderboardTabGeom: Phaser.Geom.Rectangle;
    let searchTabGeom: Phaser.Geom.Rectangle;
    switch (this.scene.state.modal.clanType) {
      case 1:
        const clanTab = this.createTab({x: headerGeom.left + 15, y: headerGeom.top + 10}, true, tabCount, 'Клан');
        this.clanTab = clanTab.tab;
        this.clanTabText = clanTab.text;
        tabClanGeom = this.clanTab.getBounds();
        const leaderboardTab = this.createTab({x: tabClanGeom.right, y: headerGeom.top + 10}, false, tabCount, 'Лучшие кланы');
        this.leaderboardTab = leaderboardTab.tab;
        this.leaderboardTabText = leaderboardTab.text;
        leaderboardTabGeom = this.leaderboardTab.getBounds();
        const searchTab = this.createTab({x: leaderboardTabGeom.right, y: headerGeom.top + 10}, false, tabCount, 'Поиск');
        this.searchTab = searchTab.tab;
        this.searchTabText = searchTab.text;
        searchTabGeom = this.searchTab.getBounds();
        break;
        case 2:
        if (tabCount === 2) {
          const leaderboardTab = this.createTab({x: headerGeom.left + 15, y: headerGeom.top + 10}, true, tabCount, 'Лучшие кланы');
          this.leaderboardTab = leaderboardTab.tab;
          this.leaderboardTabText = leaderboardTab.text;
          leaderboardTabGeom = this.leaderboardTab.getBounds();
          const searchTab = this.createTab({x: leaderboardTabGeom.right, y: headerGeom.top + 10}, false, tabCount, 'Поиск');
          this.searchTab = searchTab.tab;
          this.searchTabText = searchTab.text;
          searchTabGeom = this.searchTab.getBounds();
        } else {
          const clanTab = this.createTab({x: headerGeom.left + 15, y: headerGeom.top + 10}, false, tabCount, 'Клан');
          this.clanTab = clanTab.tab;
          this.clanTabText = clanTab.text;
          tabClanGeom = this.clanTab.getBounds();
          const leaderboardTab = this.createTab({x: tabClanGeom.right, y: headerGeom.top + 10}, true, tabCount, 'Лучшие кланы');
          this.leaderboardTab = leaderboardTab.tab;
          this.leaderboardTabText = leaderboardTab.text;
          leaderboardTabGeom = this.leaderboardTab.getBounds();
          const searchTab = this.createTab({x: leaderboardTabGeom.right, y: headerGeom.top + 10}, false, tabCount, 'Поиск');
          this.searchTab = searchTab.tab;
          this.searchTabText = searchTab.text;
          searchTabGeom = this.searchTab.getBounds();
        }
        break;
        case 3:
        if (tabCount === 2) {
          const leaderboardTab = this.createTab({x: headerGeom.left + 15, y: headerGeom.top + 10}, false, tabCount, 'Лучшие кланы');
          this.leaderboardTab = leaderboardTab.tab;
          this.leaderboardTabText = leaderboardTab.text;
          leaderboardTabGeom = this.leaderboardTab.getBounds();
          const searchTab = this.createTab({x: leaderboardTabGeom.right, y: headerGeom.top + 10}, true, tabCount, 'Поиск');
          this.searchTab = searchTab.tab;
          this.searchTabText = searchTab.text;
          searchTabGeom = this.searchTab.getBounds();
        } else {
          const clanTab = this.createTab({x: headerGeom.left + 15, y: headerGeom.top + 10}, false, tabCount, 'Клан');
          this.clanTab = clanTab.tab;
          this.clanTabText = clanTab.text;
          tabClanGeom = this.clanTab.getBounds();
          const leaderboardTab = this.createTab({x: tabClanGeom.right, y: headerGeom.top + 10}, false, tabCount, 'Лучшие кланы');
          this.leaderboardTab = leaderboardTab.tab;
          this.leaderboardTabText = leaderboardTab.text;
          leaderboardTabGeom = this.leaderboardTab.getBounds();
          const searchTab = this.createTab({x: leaderboardTabGeom.right, y: headerGeom.top + 10}, true, tabCount, 'Поиск');
          this.searchTab = searchTab.tab;
          this.searchTabText = searchTab.text;
          searchTabGeom = this.searchTab.getBounds();
        }
        break;
      default:
        break;
    }
  }

  private createTab(pos: Iposition, active: boolean, count: number, string: string): { 
    tab: Phaser.GameObjects.RenderTexture;
    text: Phaser.GameObjects.Text;
  } {
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
    const tabHeight: number = 75;
    const activeTabHeight: number = 100;
    const slice: number = 30;
    const height: number = active ? activeTabHeight : tabHeight;
    const texture: string = active ? 'clan-window-tab-active' : 'clan-window-tab-disable';
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = active ? tabActiveTextStyle : tabTextStyle;
    const tab = this.scene.add.nineslice(pos.x, pos.y, maxWidth / count, height, texture, slice).setOrigin(0, 1);
    const tabGeom = tab.getBounds();
    const text = this.scene.add.text(tabGeom.centerX, tabGeom.centerY, string, textStyle).setOrigin(0.5);
    return { tab, text };
  }

  private setTabsListeners(): void {
    if (this.scene.state.modal.clanType !== 1 && this.clanTab) {
      this.scene.clickButtonUp(this.clanTab, (): void => {
        this.scene.state.modal = {
          type: 17,
          clanType: 1,
        };
        this.scene.scene.stop('Clan');
        this.scene.scene.restart(this.scene.state);
      }, this.clanTabText);
    }
    if (this.scene.state.modal.clanType !== 2) {
      this.scene.clickButtonUp(this.leaderboardTab, (): void => {
        this.scene.state.modal = {
          type: 17,
          clanType: 2,
        };
        this.scene.scene.stop('Clan');
        this.scene.scene.restart(this.scene.state);
      }, this.leaderboardTabText);
    }
    if (this.scene.state.modal.clanType !== 3) {
      this.scene.clickButtonUp(this.searchTab, (): void => {
        this.scene.state.modal = {
          type: 17,
          clanType: 3,
        };
        this.scene.scene.stop('Clan');
        this.scene.scene.restart(this.scene.state);
      }, this.searchTabText);
    }

    this.scene.clickButtonUp(this.tabClose, (): void => { this.onCloseBtn(); }, this.tabCloseBtn);
  }

  private createClanInfo(): void {
    const headerTextStyle = {
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
      wordWrap: { width: 500 },
    };
    const scoreTextStyle = {
      color: '#f3dcc9',
      fontFamily: 'Shadow',
      fontSize: '18px',
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

    this.headerText = this.scene.add.text(headerGeom.left + 120, headerGeom.centerY, this.scene.state.clan.name, headerTextStyle).setDepth(2).setOrigin(0, 0.5);
    const clanAvatar = this.scene.add.sprite(headerGeom.left + 30, headerGeom.centerY, 'farmer').setDepth(2).setOrigin(0, 0.5).setScale(0.3);
    const scoreBg = this.scene.add.nineslice(headerGeom.right - 20, headerGeom.centerY, 110, 35, 'modal-square-bg', 10).setDepth(2).setOrigin(1, 0.5);
    const scoreBgGeom: Phaser.Geom.Rectangle = scoreBg.getBounds();
    const scoreText = this.scene.add.text(scoreBgGeom.centerX, scoreBgGeom.centerY, 'Очки: 2000', scoreTextStyle).setDepth(2).setOrigin(0.5);
    this.scene.add.nineslice(this.x, this.y + 100, 480, 600, 'modal-square-bg', 10).setDepth(1).setOrigin(0.5);
    this.createClanBtns();
    this.scene.scene.launch('Clan', this.scene.state);
  }

  private createClanBtns(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      align: 'center',
      fontSize: '18px',
      color: '#ffffff',
      stroke: '#D78A31',
      strokeThickness: 3,
    };
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    const chatBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(headerGeom.centerX + 30, headerGeom.bottom + 45, 'profile-window-button-yellow');
    const chatBtnText: Phaser.GameObjects.Text = this.scene.add.text(chatBtn.x, chatBtn.y - 5, this.scene.state.lang.clanChat.replace(' ', '\n'), textStyle).setOrigin(0.5);

    const mapBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(headerGeom.centerX  + 170, headerGeom.bottom + 45, 'profile-window-button-yellow');
    const mapBtnText: Phaser.GameObjects.Text = this.scene.add.text(mapBtn.x, mapBtn.y - 5, this.scene.state.lang.clanMap.replace(' ', '\n'), textStyle).setOrigin(0.5);
  }
}