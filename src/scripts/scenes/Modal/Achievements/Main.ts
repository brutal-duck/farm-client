import Scrolling from '../../../libs/Scrolling';

export default class Achievements extends Phaser.Scene {
  public state: Istate;
  public height: number;
  public scrollHeight: number;
  public windowHeight: number;
  public windowWidth: number;
  public scrolling: Scrolling;

  constructor() {
    super('Achievements');
  }

  public init(state: Istate): void {
    this.state = state;
    this.scrollHeight = Number(this.game.config.height);
    this.windowHeight = 680;
    this.windowWidth = 479;
    this.initScrolling();
  }

  private initScrolling(): void {
    this.height = this.scrollHeight + this.windowHeight - 30;
    let y: number = this.cameras.main.centerY - 270;
    const cameraOptions: IScrollingOptions = {
      x: 120,
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
    const sortedAchievements = [...achievements].sort((a, b) => b.progress / b.count - a.progress / a.count);
    this.createAchievements(sortedAchievements);
  }

  private createAchievements(achievements: Iachievement[]): void {
    achievements.forEach(el => {
      this.createAchievement(el);
    });
  }

  private createAchievement(data: Iachievement): void {
    const titleStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#ffffff',
      wordWrap: { width: 350 },
    };
    const progressStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#ffffff',
    };

    const { id, progress, count } = data;
    const done = progress > count;
    const progressStr = done ? `${count} / ${count}` : `${progress} / ${count}`;
    const titleStr = this.state.lang[`achievemetText${id}`];
    const texture = `achievement-${id}`;
    const padding = 20;
    const x = this.cameras.main.centerX - 300;
    const y = this.windowHeight + this.scrollHeight + padding;

    const iconSprite = this.add.sprite(x, y, texture);
    const iconGeom = iconSprite.getBounds();
    const titleText = this.add.text(iconGeom.right + 20, y, titleStr, titleStyle).setOrigin(0, 0.5);
    const progressText = this.add.text(iconGeom.right + 30, titleText.getBounds().bottom, progressStr, progressStyle);

    this.scrollHeight += iconGeom.height + padding;
    this.scrolling.bottom = this.scrollHeight;
  }
}