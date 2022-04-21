import { shortTime } from '../../../general/basic';
import Modal from '../../../scenes/Modal/Modal';
import LogoManager from '../../Utils/LogoManager';
import ClanTab from './ClanTab';

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
  private windowType: number = 2;
  private headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#fffdfa',
    fontFamily: 'Shadow',
    fontSize: '26px',
    align: 'center',
    shadow: {
      offsetX: 1,
      offsetY: 1, 
      color: '#96580e',
      blur: 2,
      fill: true,
    },
    wordWrap: { width: 500, useAdvancedWrap: true },
  };

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
    this.createTabs([2, 1, 3]);
    this.createMainElements();
  }

  private createMainElements(): void {
    switch (this.windowType) {
      case 2:
        this.createClanLeaderboard();
        break;
      case 1:
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
    this.scene.scene.stop('ClanScroll');
    this.scene.state.modal = {
      type: 20,
      clanTabType: 1,
    };
    this.scene.scene.restart(this.scene.state);
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
    let left: number = headerGeom.left + 87;
    const maxWidth: number = 455;
    types.forEach((el: number) => {
      this.createTab({ x: left, y: headerGeom.top - 22 }, activeTab === el, tabCount, el)
      left += maxWidth / tabCount;
    });
  }

  private createTab(pos: Iposition, active: boolean, count: number, type: number): void {
    const maxWidth: number = 455;
    const tabHeight: number = 104;
    const activeTabHeight: number = 115;
    const height: number = active ? activeTabHeight : tabHeight;

    const icon: string =  type === 2 ?  'clan-window-icon-2' : type === 1 ?  'clan-window-icon-1' : 'clan-window-icon-5';
    const callback = (): void => {
      this.scene.state.modal = {
        type: 21,
        clanTabType: type,
      };
      this.scene.scene.stop('ClanScroll');
      this.scene.scene.restart(this.scene.state);
    };
    new ClanTab(this.scene, pos.x, pos.y, maxWidth / count, height, icon, active, callback, type);
  }

  private createClanLeaderboard(): void {

    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    const bgHeight: number = 610;
    const bgY: number = this.y + 30;
    this.scene.add.roundedField(this.x, bgY, 480, bgHeight, 'modal-square-bg').setDepth(1);

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 3, this.scene.state.lang.clansLiderboard, this.headerTextStyle).setDepth(2).setOrigin(0.5);

    this.createTimer({
      x: this.scene.cameras.main.centerX,
      y: bgY + bgHeight / 2 + 15,
    });

    this.scene.state.modal.clanTabType = 1;
    this.scene.scene.launch('ClanScroll', this.scene.state);
  }


  private createUserLeaderboard(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    const bgHeight: number = 610;
    const bgY: number = this.y + 30;
    this.scene.add.roundedField(this.x, bgY, 480, bgHeight, 'modal-square-bg').setDepth(1);

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 3, this.scene.state.lang.clanLeaders, this.headerTextStyle).setDepth(2).setOrigin(0.5).setFontSize(28);
    
    this.createTimer({
      x: this.scene.cameras.main.centerX,
      y: bgY + bgHeight / 2 + 15,
    });

    this.scene.state.modal.clanTabType = 2;
    this.scene.scene.launch('ClanScroll', this.scene.state);
  }

  private createRules(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 3, this.scene.state.lang.eventPrice, this.headerTextStyle).setDepth(2).setOrigin(0.5).setFontSize(34);
    this.createClanRules();
    this.createUsersRules();
    this.createTimer({
      x: this.scene.cameras.main.centerX,
      y: this.y + 340,
    });
  }

  private createClanRules(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '21px',
      color: '#FFF7F0',
      align: 'right'
    };
    const titleTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '24px',
      color: '#FFF7F0',
    };

    const bgY: number = this.y - 120;
    this.scene.add.roundedField(this.x, bgY, 480, 310, 'modal-square-bg').setDepth(1);
    const startX: number = this.x - 20;
    const startY: number = this.y - 210
    this.scene.add.text(this.x, this.y - 250, this.scene.state.lang.awardsForClans, titleTextStyle).setOrigin(0.5).setDepth(1);

    const topPlacesText: string = `1 ${this.scene.state.lang.eventPlace}\n2 ${this.scene.state.lang.eventPlace}\n3 ${this.scene.state.lang.eventPlace}`;
    const priceTopPlaces: Phaser.GameObjects.Text = this.scene.add.text(startX, startY, topPlacesText, textStyle)
      .setLineSpacing(12)
      .setOrigin(1, 0)
      .setDepth(2);
    const priceTopPlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(startX + 70, startY, '1000\n700\n400', textStyle)
      .setOrigin(0)
      .setLineSpacing(12)
      .setDepth(2)
      .setAlign('left');

    this.scene.add.tileSprite(this.x, priceTopPlaces.getCenter().y, 480, priceTopPlaces.displayHeight + 20,'clan-window-leader-plate-ns', 5)
      .setOrigin(0.5)
      .setAlpha(0.8)
      .setDepth(1);

    const pricePlaces: Phaser.GameObjects.Text = this.scene.add.text(startX, priceTopPlaces.getBounds().bottom + 15,
      `4-10 ${this.scene.state.lang.eventPlace}\n11-100 ${this.scene.state.lang.eventPlace}\n101-500 ${this.scene.state.lang.eventPlace}\n500+ ${this.scene.state.lang.eventPlace}`, textStyle).setOrigin(1, 0).setDepth(2);

    const pricePlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(startX + 70, priceTopPlaces.getBounds().bottom + 15,
      '300\n100\n50\n20', textStyle).setOrigin(0, 0).setDepth(2).setAlign('left');

    const diamondX: number = this.x + 176;
    const priceTopCenterY: number = priceTopPlaces.getBounds().centerY;
    // Кучки кристалов
    this.scene.add.container(diamondX, priceTopCenterY - 40, [
      this.scene.add.sprite(0, 0, 'clan-diamond-coin').setScale(0.55),
      this.scene.add.sprite(11, 4, 'diamond').setScale(0.08).setAngle(20),
      this.scene.add.sprite(-11, 4, 'diamond').setScale(0.08).setAngle(-20),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.12),
    ]).setDepth(2);

    this.scene.add.sprite(diamondX, priceTopCenterY, 'clan-diamond-coin')
      .setScale(0.6)
      .setDepth(2);
    this.scene.add.sprite(diamondX, priceTopCenterY + 40, 'clan-diamond-coin')
      .setScale(0.5)
      .setDepth(2);

    this.scene.add.sprite(startX - 120, priceTopCenterY - 40, 'clan-window-medal-gold').setDepth(2);
    this.scene.add.text(startX - 120 - 2, priceTopCenterY - 40 - 2, '1', textStyle).setFontFamily('Shadow').setOrigin(0.5).setDepth(2);
    this.scene.add.sprite(startX - 120, priceTopCenterY, 'clan-window-medal-silver').setDepth(2);
    this.scene.add.text(startX - 120 - 1, priceTopCenterY - 2, '2', textStyle).setFontFamily('Shadow').setOrigin(0.5).setDepth(2);
    this.scene.add.sprite(startX - 120, priceTopCenterY + 40, 'clan-window-medal-bronze').setDepth(2);
    this.scene.add.text(startX - 120 - 1, priceTopCenterY + 40 - 2, '3', textStyle).setFontFamily('Shadow').setOrigin(0.5).setDepth(2);

    const diamondPlaceY: number = pricePlacesDiamonds.getBounds().centerY;

    this.scene.add.sprite(diamondX, diamondPlaceY - 40, 'clan-diamond-coin').setScale(0.4).setDepth(2);
    this.scene.add.sprite(diamondX, diamondPlaceY - 10, 'clan-diamond-coin').setScale(0.38).setDepth(2);
    this.scene.add.sprite(diamondX, diamondPlaceY + 15, 'clan-diamond-coin').setScale(0.35).setDepth(2);
    this.scene.add.sprite(diamondX, diamondPlaceY + 41, 'clan-diamond-coin').setScale(0.33).setDepth(2);
  }

  private createUsersRules(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '21px',
      color: '#FFF7F0',
      align: 'right'
    };
    const titleTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '24px',
      color: '#FFF7F0',
    };

    const bgY: number = this.y + 190;
    this.scene.add.roundedField(this.x, bgY, 480, 250, 'modal-square-bg').setDepth(1);
    const startX: number = this.x - 20;
    const startY: number = bgY - 60;
    this.scene.add.text(this.x, startY - 40, this.scene.state.lang.awardsForUsersInClan, titleTextStyle).setOrigin(0.5).setDepth(1);

    const topPlacesText: string = `1 ${this.scene.state.lang.eventPlace}\n2 ${this.scene.state.lang.eventPlace}\n3 ${this.scene.state.lang.eventPlace}`;
    const priceTopPlaces: Phaser.GameObjects.Text = this.scene.add.text(startX, startY, topPlacesText, textStyle)
      .setLineSpacing(12)
      .setOrigin(1, 0)
      .setDepth(2);
    const priceTopPlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(startX + 70, startY, '100\n70\n40', textStyle)
      .setOrigin(0)
      .setLineSpacing(12)
      .setDepth(2)
      .setAlign('left');

    this.scene.add.tileSprite(this.x, priceTopPlaces.getCenter().y, 480, priceTopPlaces.displayHeight + 20,'clan-window-leader-plate-ns', 5)
      .setOrigin(0.5)
      .setAlpha(0.8)
      .setDepth(1);

    const pricePlaces: Phaser.GameObjects.Text = this.scene.add.text(startX, priceTopPlaces.getBounds().bottom + 15,
      `4-10 ${this.scene.state.lang.eventPlace}\n10+ ${this.scene.state.lang.eventPlace}`, textStyle).setOrigin(1, 0).setDepth(2);

    const pricePlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(startX + 70, priceTopPlaces.getBounds().bottom + 15,
      '30\n10', textStyle).setOrigin(0, 0).setDepth(2).setAlign('left');

    const diamondX: number = this.x + 176;
    const priceTopCenterY: number = priceTopPlaces.getBounds().centerY;

    // Кучки кристалов
    this.scene.add.container(diamondX, priceTopCenterY - 40, [
      this.scene.add.sprite(11, 4, 'diamond').setScale(0.08).setAngle(20),
      this.scene.add.sprite(-11, 4, 'diamond').setScale(0.08).setAngle(-20),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.12),
    ]).setDepth(2);

    this.scene.add.sprite(diamondX, priceTopCenterY, 'diamond')
      .setScale(0.11)
      .setDepth(2);
    this.scene.add.sprite(diamondX, priceTopCenterY + 40, 'diamond')
      .setScale(0.1)
      .setDepth(2);

    this.scene.add.sprite(startX - 120, priceTopCenterY - 40, 'clan-window-medal-gold').setDepth(2);
    this.scene.add.text(startX - 120 - 2, priceTopCenterY - 40 - 3, '1', textStyle).setFontFamily('Shadow').setOrigin(0.5).setDepth(2);
    this.scene.add.sprite(startX - 120, priceTopCenterY, 'clan-window-medal-silver').setDepth(2);
    this.scene.add.text(startX - 120 - 1, priceTopCenterY - 2, '2', textStyle).setFontFamily('Shadow').setOrigin(0.5).setDepth(2);
    this.scene.add.sprite(startX - 120, priceTopCenterY + 40, 'clan-window-medal-bronze').setDepth(2);
    this.scene.add.text(startX - 120 - 1, priceTopCenterY + 40 - 2, '3', textStyle).setFontFamily('Shadow').setOrigin(0.5).setDepth(2);

    const diamondPlaceY: number = pricePlacesDiamonds.getBounds().centerY;

    this.scene.add.sprite(diamondX, diamondPlaceY - 15, 'diamond')
      .setScale(0.09)
      .setDepth(2);
    this.scene.add.sprite(diamondX, diamondPlaceY + 15, 'diamond')
      .setScale(0.08)
      .setDepth(2);
  }
  
  private createTimer(pos: Iposition): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 350 },
      color: '#DD8842',
      fontSize: '22px',
      align: 'center',
    };

    const bgWidth: number = 480;

    const bg = this.scene.add.sprite(pos.x, pos.y, 'tasks-bar-fix', 15).setOrigin(0.5, 0);
    bg.setDisplaySize(bgWidth, 50);
    const bgGeom: Phaser.Geom.Rectangle = bg.getBounds();
    this.timer = this.scene.add.text(bgGeom.centerX, bgGeom.centerY, '', textStyle).setOrigin(0.5);
  }

  public preUpdate(): void {
    if (this.timer && this.timer.active && this.scene.state.progress.clanEvent.endTime > 0) {
      const timerText: string = `${this.scene.state.lang.eventLastTime} ${shortTime(this.scene.state.progress.clanEvent.endTime, this.scene.state.lang)}`;
      if (this.timer.text !== timerText) this.timer.setText(timerText);
    }
    if (this.scene.state.progress.clanEvent.endTime <= 0) {
      this.scene.scene.stop('ClanScroll');
      this.scene.scene.stop();
    }
  }
}