import { click } from '../../general/clicks';
import Scrolling from '../../libs/Scrolling';
import Utils from '../../libs/Utils';
import Modal from '../../scenes/Modal/Modal';

export default class AchievementsWindow {
  public state: Istate;
  public height: number;
  public scrollHeight: number;
  public windowHeight: number;
  public windowWidth: number;
  public scrolling: Scrolling;
  private activeIcon: Phaser.GameObjects.Sprite;
  private scene: Modal;
  private x: number;
  private y: number;
  private width: number;
  private bg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Sprite;
  private footer: Phaser.GameObjects.Sprite;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init(scene.state);
  }

  public init(state: Istate): void {
    this.state = state;
    this.scrollHeight = Number(this.scene.game.config.height);
    this.windowHeight = 640;
    this.windowWidth = 500;
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.initScrolling();
    this.height = 600;
    this.width = 527;
    this.create();
  }

  private createMain(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.width, this.height, 'white-pixel').setTint(0xFF9700);
    this.createHeader();
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2, 'profile-window-footer').setOrigin(0.5, 0);
  }

  private createHeader(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
      wordWrap: { width: 400, useAdvancedWrap: true },
      align: 'center',
    };
    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 25, 'achievement-window-header').setOrigin(0.5, 1);
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();

    this.scene.add.text(headerGeom.centerX - 15, headerGeom.bottom - 70, this.scene.state.lang.achievements, headerTextStyle).setOrigin(0.5);
    const closeBtn = this.scene.add.sprite(headerGeom.right - 35, headerGeom.bottom - 95, 'close-window-btn');

    this.scene.clickButton(closeBtn, () => { this.onCloseBtn(); });
  }

  private onCloseBtn(): void {
    this.scene.state.modal = { type: 15 };
    this.scene.scene.restart(this.scene.state);
  }

  private initScrolling(): void {
    this.height = this.scrollHeight + this.windowHeight - 30;
    let y: number = this.scene.cameras.main.centerY - 270;
    const cameraOptions: IScrollingOptions = {
      x: 110,
      y: y,
      width: this.windowWidth,
      height: this.windowHeight,
      wheel: true,
      top: this.height
    };
    
    this.scrolling = new Scrolling(this.scene, cameraOptions);
    this.scene.input.on('pointerup', (): void => {
      this.scrolling.enabled = true;
      this.scrolling.wheel = true;
    });
  }

  private create(): void {
    this.createMain();
    const { achievements } = this.state.user;
    const foreignAchievements = this.state.modal.achievements;
    const sortedAchievements = foreignAchievements || [...achievements].sort((a, b) => b.progress / b.count - a.progress / a.count);
    this.createAchievements(sortedAchievements);
  }

  private createAchievements(achievements: Iachievement[]): void {
    achievements.forEach(el => {
      if (el.id !== 2 || el.id == 2 && (Utils.checkSocialPlatform(this.state.platform))) this.createAchievement(el);
    });
  }

  private createAchievement(data: Iachievement): void {
    const titleStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#ffffff',
      shadow: {
        fill: true,
        offsetX: 2,
        offsetY: 2,
        color: 'rgba(0, 0, 0, 0.2)',
        blur: 3
      },
    };
    const noteStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '12px',
      color: '#FDDBA8',
      wordWrap: { width: 220, useAdvancedWrap: true },
    };
    const progressStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '19px',
      color: '#F9DEB3',
    };
    const pointsStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '30px',
      color: '#ffffff',
      shadow: {
        fill: true,
        offsetX: 2,
        offsetY: 2,
        color: 'rgba(0, 0, 0, 0.2)',
        blur: 3,
      },
    };

    const { id, progress, count, points } = data;

    const texture = `ach${id}-status`;
    const padding = 35;
    const x = this.scene.cameras.main.centerX - 307;
    const y = this.windowHeight + this.scrollHeight + padding;
    const statusStr = id === 41 ? 'unicorn' : `ach${id}`;

    const iconSprite = this.scene.add.sprite(x, y, texture).setDepth(1);
    const iconGeom = iconSprite.getBounds();
    if ((progress || progress === 0) && (count || count === 0)) {
      const done = progress >= count;
      if (done) {
        const bg = this.scene.add.sprite(this.scene.cameras.main.centerX - 107, y, 'achievement-bg-complete');
        const bgGeom = bg.getBounds();
        const titleText = this.scene.add.text(bgGeom.centerX + iconGeom.width / 2 + 10, y - 30, this.state.lang[`${statusStr}Status`], titleStyle).setOrigin(0.5, 0);
        const noteText = this.scene.add.text(bgGeom.centerX + iconGeom.width / 2 + 10, y + 10, this.state.lang.achievementUnlock, noteStyle).setOrigin(0.5).setFontSize(18);
        const checkSprite = this.scene.add.sprite(bg.x, bg.y, 'achievement-frame').setVisible(false).setDepth(1);
        iconSprite.setDataEnabled();
        iconSprite.setData('check', checkSprite);
        if (this.state.user.status === statusStr) {
          this.scrolling.scrollY = this.scrollHeight + this.windowHeight - 30;
          this.activeIcon = iconSprite;
          checkSprite.setVisible(true);
        }
        this.scene.click(bg, () => {
          if (this.state.user.status !== statusStr) {
            this.setStatus(id);
            this.updateActiveIcon(iconSprite);
          }
        });
      } else {
        const bg = this.scene.add.sprite(this.scene.cameras.main.centerX - 107, y, 'achievement-bg');
        const titleText = this.scene.add.text(iconGeom.right + 15, y - 27, this.state.lang[`${statusStr}Status`], titleStyle).setOrigin(0, 0.5);
        const maxWidth = 200;
        if (titleText.width > maxWidth) {
          const scale = maxWidth / titleText.width ;
          titleText.setFontSize(Math.round(parseInt(titleStyle.fontSize) * scale))
        }
        const noteStr = this.state.lang[`achievementText${id}`];
        const noteText = this.scene.add.text(iconGeom.right + 15, y + 10, noteStr, noteStyle).setOrigin(0, 0.5);
        const progressStr = `${progress}/${count}`;
        const x = bg.x + 130;
        const progressText = this.scene.add.text(x, y, progressStr, progressStyle).setOrigin(0.5);
        const pointsText = this.scene.add.text(bg.x + 210, y, String(points), pointsStyle).setOrigin(0.5);
        iconSprite.setTint(0x000000).setAlpha(0.25);
      }
    } else {
      const bg = this.scene.add.sprite(this.scene.cameras.main.centerX - 107, y, 'achievement-bg-complete');
      const bgGeom = bg.getBounds();
      const titleText = this.scene.add.text(bgGeom.centerX + iconGeom.width / 2 + 10, y - 30, this.state.lang[`${statusStr}Status`], titleStyle).setOrigin(0.5, 0);
      const noteText = this.scene.add.text(bgGeom.centerX + iconGeom.width / 2 + 10, y + 10, this.state.lang.achievementUnlock, noteStyle).setOrigin(0.5).setFontSize(18);
    }

    this.scrollHeight += iconGeom.height + padding;
    this.scrolling.bottom = this.scrollHeight;
  }

  private setStatus(id: number): void {
    const statusStr = id === 41 ? 'unicorn' : `ach${id}`;
    this.state.user.status = statusStr;
  }

  private updateActiveIcon(newIcon: Phaser.GameObjects.Sprite): void {
    const newCheckSprite = newIcon.getData('check');
    if (this.activeIcon) {
      const oldCheckSprite = this.activeIcon.getData('check');
      if (oldCheckSprite) oldCheckSprite.setVisible(false);
    }
    this.activeIcon = newIcon;
    newCheckSprite?.setVisible(true);
  }
}