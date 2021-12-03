import { click } from '../../../general/clicks';
import Scrolling from '../../../libs/Scrolling';
import Utils from './../../../libs/Utils';

export default class Achievements extends Phaser.Scene {
  public state: Istate;
  public height: number;
  public scrollHeight: number;
  public windowHeight: number;
  public windowWidth: number;
  public scrolling: Scrolling;
  private activeIcon: Phaser.GameObjects.Sprite;

  public click = click.bind(this);
  constructor() {
    super('Achievements');
  }

  public init(state: Istate): void {
    this.state = state;
    this.scrollHeight = Number(this.game.config.height);
    this.windowHeight = 640;
    this.windowWidth = 500;
    this.initScrolling();
  }

  private initScrolling(): void {
    this.height = this.scrollHeight + this.windowHeight - 30;
    let y: number = this.cameras.main.centerY - 270;
    const cameraOptions: IScrollingOptions = {
      x: 110,
      y: y,
      width: this.windowWidth,
      height: this.windowHeight,
      wheel: true,
      top: this.height
    };
    
    this.scrolling = new Scrolling(this, cameraOptions);
    this.input.on('pointerup', (): void => {
      this.scrolling.enabled = true;
      this.scrolling.wheel = true;
    });
  }

  public preload(): void {

  }

  public create(): void {
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
    const x = this.cameras.main.centerX - 307;
    const y = this.windowHeight + this.scrollHeight + padding;
    const statusStr = id === 41 ? 'unicorn' : `ach${id}`;

    const iconSprite = this.add.sprite(x, y, texture).setDepth(1);
    const iconGeom = iconSprite.getBounds();
    if ((progress || progress === 0) && (count || count === 0)) {
      const done = progress >= count;
      if (done) {
        const bg = this.add.sprite(this.cameras.main.centerX - 107, y, 'achievement-bg-complete');
        const bgGeom = bg.getBounds();
        const titleText = this.add.text(bgGeom.centerX + iconGeom.width / 2 + 10, y - 30, this.state.lang[`${statusStr}Status`], titleStyle).setOrigin(0.5, 0);
        const noteText = this.add.text(bgGeom.centerX + iconGeom.width / 2 + 10, y + 10, this.state.lang.achievementUnlock, noteStyle).setOrigin(0.5).setFontSize(18);
        const checkSprite = this.add.sprite(bg.x, bg.y, 'achievement-frame').setVisible(false).setDepth(1);
        iconSprite.setDataEnabled();
        iconSprite.setData('check', checkSprite);
        if (this.state.user.status === statusStr) {
          this.scrolling.scrollY = this.scrollHeight + this.windowHeight - 30;
          this.activeIcon = iconSprite;
          checkSprite.setVisible(true);
        }
        this.click(bg, () => {
          if (this.state.user.status !== statusStr) {
            this.setStatus(id);
            this.updateActiveIcon(iconSprite);
          }
        });
      } else {
        const bg = this.add.sprite(this.cameras.main.centerX - 107, y, 'achievement-bg');
        const titleText = this.add.text(iconGeom.right + 15, y - 27, this.state.lang[`${statusStr}Status`], titleStyle).setOrigin(0, 0.5);
        const maxWidth = 200;
        if (titleText.width > maxWidth) {
          const scale = maxWidth / titleText.width ;
          titleText.setFontSize(Math.round(parseInt(titleStyle.fontSize) * scale))
        }
        const noteStr = this.state.lang[`achievementText${id}`];
        const noteText = this.add.text(iconGeom.right + 15, y + 10, noteStr, noteStyle).setOrigin(0, 0.5);
        const progressStr = `${progress}/${count}`;
        const x = bg.x + 130;
        const progressText = this.add.text(x, y, progressStr, progressStyle).setOrigin(0.5);
        const pointsText = this.add.text(bg.x + 210, y, String(points), pointsStyle).setOrigin(0.5);
        iconSprite.setTint(0x000000).setAlpha(0.25);
      }
    } else {
      const bg = this.add.sprite(this.cameras.main.centerX - 107, y, 'achievement-bg-complete');
      const bgGeom = bg.getBounds();
      const titleText = this.add.text(bgGeom.centerX + iconGeom.width / 2 + 10, y - 30, this.state.lang[`${statusStr}Status`], titleStyle).setOrigin(0.5, 0);
      const noteText = this.add.text(bgGeom.centerX + iconGeom.width / 2 + 10, y + 10, this.state.lang.achievementUnlock, noteStyle).setOrigin(0.5).setFontSize(18);
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