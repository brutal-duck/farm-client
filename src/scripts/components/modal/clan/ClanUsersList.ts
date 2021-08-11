import { shortNum } from '../../../general/basic';
import Clan from './../../../scenes/Modal/Clan/Main';

export default class ClanUsersList {
  private scene: Clan;
  private array: Array<IclanUser>;
  private listLength: number;
  private clanName: string;
  private clanAvatar: string;
  constructor (scene: Clan) {
    this.scene = scene;
    this.init();
    this.listLength = this.array?.length || 0;
    this.clanName = this.scene.state.clan.name;
    this.clanAvatar = JSON.stringify(this.scene.state.clan.avatar);
    this.array?.forEach(el => {
      this.createUser(el);
    });
  }

  public update(): void {
    if (
      this.scene.state.clan?.users.length !== this.listLength
      || this.clanName !== this.scene.state.clan?.name
      || JSON.stringify(this.scene.state.clan.avatar) !== this.clanAvatar
      ) {
      this.scene.scene.restart(this.scene.state);
    }
  }

  private init(): void {
    this.scene.scrollHeight = Number(this.scene.game.config.height) - 1200 + 660;
    this.scene.scrolling.bottom = 0;
    this.scene.scrolling.scrollY = 0;
    this.array = this.scene.state.clan?.users.sort((a, b) => a.points - b.points);
  }

  private createUser(data: IclanUser): void {
    const nameTextStyle: Phaser.Types.GameObjects.Text.TextStyle  = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '20px',
      align: 'left',
      wordWrap: { width: 200 },
    };
    const scoreTextStyle: Phaser.Types.GameObjects.Text.TextStyle  = {
      color: '#f3dcc9',
      fontFamily: 'Shadow',
      fontSize: '20px',
      align: 'center',
    };
    const btnTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      align: 'center',
      fontSize: '13px',
      color: '#ffffff',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };
    const padding: number = 10;
    const bgWidth: number = 460;
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 300,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding,
    };
    const { name, status, points, avatar, id } = data;

    const avatarSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x, pos.y, 'farmer').setScale(0.35);

    const expelBtnPosition: Iposition = {
      x: avatarSprite.x + avatarSprite.displayWidth / 2 - 9,
      y: avatarSprite.y + avatarSprite.displayHeight / 2 - 15,
    };

    const expelBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(expelBtnPosition.x, expelBtnPosition.y, 'clan-window-exclude-button').setScale(1);
    expelBtn.setVisible(this.scene.state.user.id === this.scene.state.clan?.ownerId);

    this.scene.clickButton(expelBtn, (): void => {
      this.scene.state.modal = {
        type: 1,
        sysType: 22,
        userId: id,
        message: name,
      };

      this.scene.scene.stop('ClanScroll');
      this.scene.scene.stop('Modal');
      this.scene.scene.launch('Modal', this.scene.state);
    });

    const nameText: Phaser.GameObjects.Text = this.scene.add.text(avatarSprite.x + avatarSprite.displayWidth / 2 + 10, avatarSprite.y, name, nameTextStyle)
      .setOrigin(0, 0.5)
      .setCrop(0, 0, 250, 100);
    const pointsText: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 360, pos.y, shortNum(points), scoreTextStyle).setOrigin(0.5);

    const statusSettings: IstatusSettings = this.scene.getStatusSettings(status);

    if (statusSettings) {
      const x: number = avatarSprite.x + 25;
      const y: number = avatarSprite.y - 25;
      this.scene.add.sprite(x, y, statusSettings.iconTexture).setVisible(statusSettings.iconVisible).setOrigin(0, 0.5).setScale(0.9);
    }

    const bgZone = this.scene.add.zone(pos.x - 50, pos.y, bgWidth, avatarSprite.displayHeight).setOrigin(0, 0.5).setDropZone(undefined, () => {});
    this.scene.click(bgZone, () => { this.onUserPlateClick(id) });

    if (this.scene.state.clan.ownerId === id) {
      this.scene.add.sprite(avatarSprite.x, avatarSprite.y - avatarSprite.displayHeight / 2, 'clan-window-crown');
      expelBtn.setVisible(false);
    }

    const line: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x - avatarSprite.displayWidth / 2, pos.y + avatarSprite.displayHeight / 2 + 5, 'clan-window-line').setOrigin(0, 0.5);

    this.scene.scrollHeight += padding + avatarSprite.displayHeight;
    this.scene.scrolling.bottom = this.scene.scrollHeight;
  }

  private onUserPlateClick(id: string): void {
    this.scene.state.foreignProfileId = id !== this.scene.state.user.id ? id : '';
    this.scene.state.modal = {
      type: 15,
    };
    this.scene.scene.stop('ClanScroll');
    this.scene.scene.launch('Modal',this.scene.state);
  }
}