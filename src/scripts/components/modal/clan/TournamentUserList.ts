import axios, { AxiosResponse } from 'axios';
import { shortNum } from '../../../general/basic';
import Clan from '../../../scenes/Modal/Clan/Main';

export default class TournamentUserList {
  private scene: Clan;
  private loadingText: Phaser.GameObjects.Text;
  constructor (scene: Clan) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    const heightWindow: number = 640;
    this.scene.scrollHeight = Number(this.scene.game.config.height) - 1200 + heightWindow;
    this.scene.scrolling.bottom = 0;
    this.scene.scrolling.scrollY = 0;
    this.createLoading();
    this.getUserList();
  }
  
  private getUserList(): void {
    const data: any = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
    };
    axios.post(process.env.API + '/getTournamentUserRaitings', data).then((res: AxiosResponse<{ raitings: Array<IclanUser> }>) => {
      if (this.scene.state.modal.clanTabType === 2) {
        this.loadingText?.destroy();
        const { data } = res;
        this.loadingAvatars(data.raitings).then(() => {
          data.raitings.forEach((el, index) => {
            this.createUser(el, index + 1);
          });
        })
      }
    });
  }

  private loadingAvatars(array: IclanUser[]): Promise<boolean> {
    return new Promise(resolve => {
      if (array) {
        array.forEach(el => {
          if (isNaN(Number(el.avatar))) this.scene.load.image(`avatar-${el.id}`, el.avatar);
        });
        this.scene.load.once(Phaser.Loader.Events.COMPLETE, () => {
          resolve(true)
        });
        this.scene.load.start();
      }
    });
  }

  private createLoading(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 350 },
      color: '#ffffff',
      fontSize: '25px',
      align: 'center',
    };
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 120,
      y: this.scene.windowHeight + this.scene.scrollHeight,
    };
    const maxDotCount: number = 4;
    let dotCount: number = 0;
    this.loadingText = this.scene.add.text(pos.x, pos.y, this.scene.state.lang.loading, textStyle).setOrigin(0.5).setAlpha(0.7);

    const tween: Phaser.Tweens.Tween = this.scene.add.tween({
      targets: this.loadingText,
      duration: 0,
      onLoop: () => {
        if (!this.loadingText.active) tween.remove();
        if (dotCount < maxDotCount) dotCount += 1;
        else dotCount = 0;
        
        let text: string = this.scene.state.lang.loading;
        for (let i = 0; i < dotCount; i ++) {
          text += '.'
        }
        if (this.loadingText.active) this.loadingText.setText(text);
      },
      loop: -1,
      loopDelay: 150,
    });

  }

  private createUser(data: IclanUser, ratePosition: number): void {
    const nameTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '20px',
      align: 'left',
      wordWrap: { width: 240, useAdvancedWrap: true },
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
      x: this.scene.cameras.main.centerX - 330,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding,
    };
    const positionTexture: string = ratePosition === 1 ? 'clan-window-medal-gold' : 
    ratePosition === 2 ? 'clan-window-medal-silver' :
    ratePosition === 3 ? 'clan-window-medal-bronze' : 'clan-window-medal';

    const { name, id, avatar, points, status } = data;
    
    const medalPos: Iposition = {
      x: ratePosition > 3 ? pos.x : pos.x + 2,
      y: ratePosition > 3 ? pos.y : pos.y + 2,
    };

    const positionSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(medalPos.x, medalPos.y, positionTexture)
      .setDepth(1);
    const positionText: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, String(ratePosition), scoreTextStyle)
      .setOrigin(0.5)
      .setDepth(1);
    
    const avatarType = Number(avatar);
    const avatarTexture: string = isNaN(avatarType) ? `avatar-${id}` : `avatar-${avatarType}`;
    const checkTexture = this.scene.textures.exists(avatarTexture);
    const maskSprite = this.scene.add.sprite(positionText.getBounds().right + 65, pos.y, 'avatar-0').setScale(0.63).setVisible(false);
    const mask = new Phaser.Display.Masks.BitmapMask(this.scene, maskSprite);
    const avatarSprite = this.scene.add.sprite(maskSprite.x, maskSprite.y, avatarTexture).setMask(mask).setDepth(1);
    if (!checkTexture) avatarSprite.setTexture('avatar-0');
    const scaleX = maskSprite.displayWidth / avatarSprite.displayWidth;
    const scaleY = maskSprite.displayHeight / avatarSprite.displayHeight;
    avatarSprite.setScale(scaleX, scaleY);

    const avatarGeom: Phaser.Geom.Rectangle = avatarSprite.getBounds();
    const nameText: Phaser.GameObjects.Text = this.scene.add.text(avatarGeom.right + 20, avatarSprite.y, name, nameTextStyle)
      .setDepth(1)
      .setOrigin(0, 0.5)
      .setCrop(0, 0, 250, 250);
    const pointsText: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 370, pos.y, shortNum(points), scoreTextStyle)
      .setDepth(1)
      .setOrigin(0, 0.5);

      
    const statusSettings: IstatusSettings = this.scene.getStatusSettings(status);

    if (statusSettings) {
      const x: number = avatarSprite.x + 20;
      const y: number = avatarSprite.y - 20;
      this.scene.game.scene.keys[this.scene.state.farm].achievement.lazyLoading(status).then(() => {
        this.scene.add.sprite(x, y, statusSettings.iconTexture).setDepth(2).setOrigin(0, 0.5).setScale(0.35);
      });
    }

    if (ratePosition === 1) {
      this.scene.add.sprite(avatarGeom.centerX, avatarGeom.bottom + 10, 'clan-window-wreath')
        .setOrigin(0.5, 1)
        .setScale(0.5)
        .setDepth(1);
    } 
    if (ratePosition > 3) {
      this.scene.add.sprite(pos.x - avatarGeom.width / 2 + 15, avatarGeom.bottom + 10, 'clan-window-line')
        .setOrigin(0, 0.5);
    } else this.scene.add.sprite(pos.x + 210, pos.y, 'clan-window-leader-plate');

    const bgZone = this.scene.add.zone(pos.x - 50, pos.y, bgWidth, avatarSprite.displayHeight).setOrigin(0, 0.5).setDropZone(undefined, () => {});
    this.scene.click(bgZone, () => { this.onUserPlateClick(id) });

    this.scene.scrollHeight += padding + avatarGeom.height + 10;
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