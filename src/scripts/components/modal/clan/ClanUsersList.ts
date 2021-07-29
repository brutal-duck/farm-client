import { shortNum } from '../../../general/basic';
import Clan from './../../../scenes/Modal/Clan/Main';

export default class ClanUsersList {
  private scene: Clan;
  private array: Array<IclanUser>;
  constructor (scene: Clan) {
    this.scene = scene;
    this.init();
    this.array.forEach(el => {
      this.createUser(el);
    })
  }

  private init(): void {
    this.scene.scrollHeight = Number(this.scene.game.config.height) - 1200 + 670;
    this.scene.scrolling.bottom = 0;
    this.scene.scrolling.scrollY = 0;
    this.array = this.scene.state.clan.users.sort((a, b) => a.points - b.points);
  }

  private createUser(data: IclanUser): void {
    const nameTextStyle = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '20px',
      align: 'left',
    };
    const scoreTextStyle = {
      color: '#f3dcc9',
      fontFamily: 'Shadow',
      fontSize: '20px',
      align: 'center',
    };
    const padding: number = 10;
    const bgWidth: number = 450;
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 300,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding,
    };
    const { name, status, points, avatar, id } = data;

    const avatarSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x, pos.y, 'farmer').setScale(0.35);
    const nameText: Phaser.GameObjects.Text = this.scene.add.text(avatarSprite.x + avatarSprite.displayWidth / 2 + 10, avatarSprite.y, name, nameTextStyle).setOrigin(0, 0.5);
    const pointsText: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 360, pos.y, shortNum(Phaser.Math.Between(1, 50000)), scoreTextStyle).setOrigin(0.5);

    const statusSettings: IstatusSettings = this.scene.getStatusSettings(status);

    if (statusSettings) {
      const x: number = avatarSprite.x + 25;
      const y: number = avatarSprite.y - 25;
      this.scene.add.sprite(x, y, statusSettings.iconTexture).setVisible(statusSettings.iconVisible).setOrigin(0, 0.5).setScale(0.9);
    }

    if (this.scene.state.clan.ownerId === id) {
      this.scene.add.sprite(avatarSprite.x, avatarSprite.y - avatarSprite.displayHeight / 2, 'clan-window-crown');
    }

    const line: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x - avatarSprite.displayWidth / 2, pos.y + avatarSprite.displayHeight / 2 + 5, 'clan-window-line').setOrigin(0, 0.5);

    this.scene.scrollHeight += padding + avatarSprite.displayHeight;
    this.scene.scrolling.bottom = this.scene.scrollHeight;
  }
}