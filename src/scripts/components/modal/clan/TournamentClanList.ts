import axios from 'axios';
import { shortNum } from '../../../general/basic';
import Clan from '../../../scenes/Modal/Clan/Main';
import LogoManager from '../../Utils/LogoManager';

export default class TournamentClanList {
  private scene: Clan;
  private loadingText: Phaser.GameObjects.Text;
  private place: number;
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
    this.getClanList();
  }
  
  private getClanList(): void {
    const data: any = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
    };
    axios.post(process.env.API + '/getTournamentRaitings', data).then(res => {
      if (this.scene.state.modal.clanTabType === 1) {
        this.loadingText?.destroy();
        const { data } = res;
        this.place = data.place;
        data.raitings.forEach((el: Iclan, id: number) => {
          this.createClan(el, id + 1);
        });
        if (this.place > data.raitings.length) this.createUserClan();
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

  private createClan(data: Iclan, ratePosition: number): void {
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

    const { name, id, avatar, points } = data;
    
    const medalPos: Iposition = {
      x: ratePosition > 3 ? pos.x : pos.x + 2,
      y: ratePosition > 3 ? pos.y : pos.y + 2,
    };

    const positionSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(medalPos.x, medalPos.y, positionTexture)
      .setDepth(1);
    const positionText: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, String(ratePosition), scoreTextStyle)
      .setOrigin(0.5)
      .setDepth(1);
    const avatarSprite = LogoManager.createIcon(this.scene, pos.x + 70, pos.y, avatar)
      .setScale(0.35)
      .setDepth(1)
    const avatarGeom: Phaser.Geom.Rectangle = avatarSprite.getBounds();
    const nameText: Phaser.GameObjects.Text = this.scene.add.text(avatarGeom.right + 20, avatarSprite.y, name, nameTextStyle)
      .setDepth(1)
      .setOrigin(0, 0.5)
      .setCrop(0, 0, 250, 250);
    const pointsText: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 370, pos.y, shortNum(points), scoreTextStyle)
      .setDepth(1)
      .setOrigin(0, 0.5);

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

    this.scene.scrollHeight += padding + avatarGeom.height + 10;
    this.scene.scrolling.bottom = this.scene.scrollHeight;
  }

  private createUserClan(): void {
    const nameTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '20px',
      align: 'left',
      wordWrap: { width: 220, useAdvancedWrap: true },
    };
    const scoreTextStyle = {
      color: '#f3dcc9',
      fontFamily: 'Shadow',
      fontSize: '20px',
      align: 'center',
    };
    const padding: number = 10;
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 340,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding - 5,
    };

    const { name, avatar } = this.scene.state.clan;
    
    const positionText: Phaser.GameObjects.Text = this.scene.add.text(pos.x, pos.y, String(this.place), scoreTextStyle)
      .setOrigin(0, 0.5)
      .setDepth(2);
    const positionSprite = this.scene.add.sprite(positionText.getBottomCenter().x, positionText.y, 'clan-window-medal-ns')
      .setOrigin(0.5)
      .setDepth(1)
      .setDisplaySize(positionText.displayWidth + 15, 32);

    const avatarSprite = LogoManager.createIcon(this.scene, positionText.getBounds().right + 50, pos.y, avatar)
      .setScale(0.35)
      .setDepth(1)
    const avatarGeom: Phaser.Geom.Rectangle = avatarSprite.getBounds();
    const nameText: Phaser.GameObjects.Text = this.scene.add.text(avatarGeom.right + 10, avatarSprite.y, name, nameTextStyle)
      .setDepth(1)
      .setOrigin(0, 0.5).setCrop(0, 0, 250, 250);
    const points: number = this.scene.state.clanTournamentData?.clanPoints;
    const pointsText: Phaser.GameObjects.Text = this.scene.add.text(pos.x + 370, pos.y, shortNum(points), scoreTextStyle)
      .setDepth(1)
      .setOrigin(0, 0.5);
    
    this.scene.add.sprite(pos.x + 220, pos.y, 'clan-window-leader-plate');
    this.scene.scrollHeight += padding + avatarGeom.height + 10;
    this.scene.scrolling.bottom = this.scene.scrollHeight;
  }
}