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

  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.width, this.height, 'white-pixel').setTint(0xFA8F1F);
  }

  private createHeader(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
    };
    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 10 , 'clan-window-header').setDepth(2).setOrigin(0.5, 1);
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2, 'profile-window-footer').setOrigin(0.5, 0);
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
    this.scene.state.foreignProfileId = undefined
  }

  private createTabs(): void {
    const tabCount: number = this.scene.state.user.clanId ? 3 : 2;
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();

    let tabClanGeom: Phaser.Geom.Rectangle;
    let leaderboardTabGeom: Phaser.Geom.Rectangle;
    let searchTabGeom: Phaser.Geom.Rectangle;
    switch (this.scene.state.modal.clanType) {
      case 1:
        const clanTab = this.createTab({x: headerGeom.left + 20, y: headerGeom.top + 25}, true, tabCount, 'Клан');
        this.clanTab = clanTab.tab;
        this.clanTabText = clanTab.text;
        tabClanGeom = this.clanTab.getBounds();
        const leaderboardTab = this.createTab({x: tabClanGeom.right, y: headerGeom.top + 25}, false, tabCount, 'Лучшие кланы');
        this.leaderboardTab = leaderboardTab.tab;
        this.leaderboardTabText = leaderboardTab.text;
        leaderboardTabGeom = this.leaderboardTab.getBounds();
        const searchTab = this.createTab({x: leaderboardTabGeom.right, y: headerGeom.top + 25}, false, tabCount, 'Поиск');
        this.searchTab = searchTab.tab;
        this.searchTabText = searchTab.text;
        searchTabGeom = this.searchTab.getBounds();
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

    const maxWidth: number = 440;
    const tabHeight: number = 74;
    const activeTabHeight: number = 93;
    const slice: number = 30;
    const height: number = active ? activeTabHeight : tabHeight;
    const texture: string = active ? 'clan-window-tab-active' : 'clan-window-tab-disable';
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = active ? tabActiveTextStyle : tabTextStyle;
    const tab = this.scene.add.nineslice(pos.x, pos.y, maxWidth / count, height, texture, slice).setOrigin(0, 1);
    const tabGeom = tab.getBounds();
    const text = this.scene.add.text(tabGeom.centerX, tabGeom.centerY, string, textStyle).setOrigin(0.5);
    return { tab, text };
  }
}