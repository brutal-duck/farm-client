import axios, { AxiosResponse } from "axios";
import Modal from "../../../scenes/Modal/Modal";
import Firework from "../../animations/Firework";
import MoneyAnimation from "../../animations/MoneyAnimation";

export default class ClanTournamentEndWindow {
  public scene: Modal

  private clanPlace: number;
  private playerPlace: number;

  private awardDescriptionStyle: Phaser.Types.GameObjects.Text.TextStyle;
  private titleStyle: Phaser.Types.GameObjects.Text.TextStyle;
  private plate: Phaser.GameObjects.Sprite;
  private bg: IroundedField;

  constructor(scene: Modal) {
    this.scene = scene;
    this.getPlacesInfo();
  }

  private init(): void {
    this.awardDescriptionStyle = {
      color: '#fffdfa',
      fontFamily: 'Bip',
      fontSize: '24px',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
      wordWrap: { width: 240, useAdvancedWrap: true },
    };

    this.titleStyle = {
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
    };

    this.create();
  }

  private create(): void {
    const y: number = this.scene.cameras.main.centerY - 300;
    const x: number = this.scene.cameras.main.centerX;
    const width: number = 527;
    const height: number = 480;
    const btnStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '23px',
      align: 'center',
      wordWrap: { width: 200, useAdvancedWrap: true },
      stroke: '#01B714',
      strokeThickness: 4
    };

    const header: Phaser.GameObjects.Sprite = this.scene.add.sprite(x + 4, y, 'modal-header-event-end').setDepth(2);
    const mid: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(x, header.getBottomCenter().y - 70, width, height, 'white-pixel').setOrigin(0.5, 0).setTint(0xFF9700);
    const bottom: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, mid.getBottomCenter().y, 'profile-window-footer').setOrigin(0.5, 0);
    this.scene.add.text(header.x, header.y + 60, this.scene.state.lang.eventEndText, this.titleStyle).setOrigin(0.5).setFontSize(36).setDepth(2);
    this.scene.add.sprite(bottom.getLeftCenter().x, bottom.getLeftCenter().y, 'decor-left').setOrigin(1);
    this.scene.add.sprite(bottom.getRightCenter().x, bottom.getRightCenter().y, 'decor-right').setOrigin(0, 1);

    this.plate = this.scene.add.sprite(x, header.getBottomCenter().y, 'clan-award-plate').setOrigin(0.5, 0).setDepth(3);
    const title: Phaser.GameObjects.Text = this.scene.add.text(this.plate.x + 12, this.plate.getTopCenter().y + 12, this.scene.state.lang.clanTournamentAwards, { font: '23px Shadow', color: '#F27E35' }).setOrigin(0.5, 0).setDepth(3);
    this.createClanAwardInfo();

    this.bg = this.scene.add.roundedField(x, this.plate.getCenter().y + 20, 480, 260, 'modal-square-bg').setOriginY(0).setDepth(2);
    this.createPlayerAwardInfo();

    this.salute();

    const takeBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, bottom.getCenter().y - 12, 'done-chapter-button').setDepth(2);
    const textBtn: Phaser.GameObjects.Text = this.scene.add.text(x, takeBtn.getCenter().y + 5, this.scene.state.lang.clanTournamentTakeAwards, btnStyle).setOrigin(0.5, 0.75).setDepth(2);
    this.scene.clickModalBtn({ btn: takeBtn, title: textBtn }, () => {
      this.takeAward();
    });
  }

  private createClanAwardInfo(): void {
    const clanBuilding: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.plate.getLeftCenter().x + 96, this.plate.getCenter().y, 'clan-building').setScale(0.72).setDepth(4);
    const buildingShadow: Phaser.GameObjects.Sprite = this.scene.add.sprite(clanBuilding.x, clanBuilding.getBottomCenter().y - 6, 'circle').setAlpha(0.8).setTint(0xEC8828).setDisplaySize(110, 30).setDepth(3);
    const star: Phaser.GameObjects.Sprite = this.scene.add.sprite(clanBuilding.getRightCenter().x + 20, clanBuilding.getRightCenter().y + 20, 'clan-big-star').setDepth(5);
    const glow: Phaser.GameObjects.Sprite = this.scene.add.sprite(star.x - 16, star.y, 'clan-glow').setAlpha(0.8).setScale(0.9).setDepth(4);
    const clanPlace: Phaser.GameObjects.Text = this.scene.add.text(star.x - 6, star.y - 10, String(this.clanPlace), this.awardDescriptionStyle).setOrigin(0.5).setFont('50px Shadow').setDepth(5);
    if (clanPlace.getBounds().width > 80)clanPlace.setFontSize(40)
    const placeText: Phaser.GameObjects.Text = this.scene.add.text(clanPlace.getBottomCenter().x, clanPlace.getBottomCenter().y - 5, this.scene.state.lang.eventPlace, this.awardDescriptionStyle).setOrigin(0.5, 0).setFont('18px Shadow').setDepth(5);
    const clanReceivedText: Phaser.GameObjects.Text = this.scene.add.text(this.plate.getRightCenter().x - 40, this.plate.getCenter().y + 20, this.scene.state.lang.clanTournamentClanReceived, this.awardDescriptionStyle).setOrigin(1).setDepth(4);
    const award: Phaser.GameObjects.Text = this.scene.add.text(clanReceivedText.getCenter().x - 30, clanReceivedText.getBottomCenter().y + 10, this.getClanAward(), this.awardDescriptionStyle).setFont('36px Shadow').setOrigin(0.5, 0).setDepth(4);
    const diamond: Phaser.GameObjects.Sprite = this.scene.add.sprite(award.getRightCenter().x + 10, award.getRightCenter().y + 6, 'clan-diamond-coin').setOrigin(0, 0.6).setScale(0.7).setDepth(4);
  }

  private createPlayerAwardInfo(): void {
    const title: Phaser.GameObjects.Text = this.scene.add.text(this.bg.x, this.bg.getTopCenter().y + 96, this.scene.state.lang.clanTournamentInYourClanPlace, this.awardDescriptionStyle).setColor('#FFFDB1').setFontSize(20).setOrigin(0.5, 0).setDepth(2);
    const playerIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.bg.getLeftCenter().x + 66, this.bg.getLeftCenter().y + 28, 'farmer').setScale(0.4).setDepth(2);
    const medal: Phaser.GameObjects.Sprite = this.scene.add.sprite(playerIcon.getRightCenter().x + 20, playerIcon.getRightCenter().y + 32, 'clan-big-medal').setDepth(4);
    const glow: Phaser.GameObjects.Sprite = this.scene.add.sprite(medal.x - 6, medal.y - 4, 'clan-glow').setAlpha(0.3).setScale(0.85).setDepth(3);
    const playerPlace: Phaser.GameObjects.Text = this.scene.add.text(medal.x - 6, medal.y - 16, String(this.playerPlace), this.awardDescriptionStyle).setOrigin(0.5).setFont('46px Shadow').setDepth(4);
    const placeText: Phaser.GameObjects.Text = this.scene.add.text(playerPlace.getBottomCenter().x, playerPlace.getBottomCenter().y - 5, this.scene.state.lang.eventPlace, this.awardDescriptionStyle).setOrigin(0.5, 0).setFont('18px Shadow').setDepth(4);
    const youReceivedText: Phaser.GameObjects.Text = this.scene.add.text(this.bg.getRightCenter().x - 24, this.bg.getRightCenter().y + 36, this.scene.state.lang.clanTournamentYourAward, this.awardDescriptionStyle).setFontSize(22).setOrigin(1, 0.5).setDepth(3);
    const award: Phaser.GameObjects.Text = this.scene.add.text(youReceivedText.getCenter().x - 20, youReceivedText.getBottomCenter().y + 10, this.getPlayerAward(), this.awardDescriptionStyle).setFont('36px Shadow').setOrigin(0.5, 0).setDepth(3);
    const diamond: Phaser.GameObjects.Sprite = this.scene.add.sprite(award.getRightCenter().x + 10, award.getRightCenter().y + 6, 'diamond').setOrigin(0, 0.6).setScale(0.15).setDepth(3);
  }

  private getClanAward(): string {
    let award: number = 1000;

    if (this.clanPlace === 2) award = 700;
    else if (this.clanPlace === 3) award = 400;
    else if (this.clanPlace >= 4 && this.clanPlace <= 10) award = 300;
    else if (this.clanPlace >= 11 && this.clanPlace <= 100) award = 100;
    else if (this.clanPlace >= 101 && this.clanPlace <= 500) award = 50;
    else if (this.clanPlace > 500) award = 20;

    return String(award);
  }

  private getPlayerAward(): string {
    let award: number = 100;

    if (this.playerPlace === 2) award = 70;
    else if (this.playerPlace === 3) award = 40;
    else if (this.playerPlace >= 4 && this.playerPlace <= 10) award = 30;
    else if (this.playerPlace > 10) award = 10;

    return String(award);
  }

  private getPlacesInfo(): void {
    this.scene.scene.launch('Block');
    const loadingSprite:Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'loading-spinner');
    const animation:Phaser.Tweens.Tween = this.scene.tweens.add({
      targets: loadingSprite,
      rotation: 2 * Math.PI,
      duration: 700,
      repeat: -1,
    });

    Promise.all([
      this.getClanPlace(),
      this.getPlayerPlace()
    ]).then(([res1, res2]): void => {
      if (!res1.data.error && !res2.data.error) {
        this.clanPlace = res1.data.place;
        this.playerPlace = res2.data.place;
        this.init();
      } else this.scene.scene.stop('Modal');
    }).catch((): void => {
      this.scene.scene.stop('Modal');
    }).finally((): void => {
      this.scene.scene.stop('Block');
      animation?.remove();
      loadingSprite?.destroy();
    })
  }

  private getClanPlace(): Promise<AxiosResponse<any>> {
    const data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
    };
    return axios.post(process.env.API + '/getTournamentClanPlace', data);
  }

  private getPlayerPlace(): Promise<AxiosResponse<any>> {
    const data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
    };
    return axios.post(process.env.API + '/getTournamentUserPlace', data);
  }

  private takeAward(): void {
    const clanCount: number = Number(this.getClanAward());
    const userCount: number = Number(this.getPlayerAward());
    const data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      count: clanCount,
    }

    axios.post(process.env.API +'/takeTournamentAward', data).then((res): void => {
      if (!res.data.error) {
        if (this.scene.scene.isActive('ClanFarm')) {
          MoneyAnimation.create(this.scene.game.scene.keys['ClanFarm'], 'diamond', { x: this.scene.cameras.main.centerX, y: this.scene.cameras.main.centerY });
        } else if (this.scene.scene.isActive('Profile')) {
          MoneyAnimation.create(this.scene.game.scene.keys['Profile'], 'diamond', { x: this.scene.cameras.main.centerX, y: this.scene.cameras.main.centerY });
        } else {
          MoneyAnimation.create(this.scene.game.scene.keys[`${this.scene.state.farm}Bars`], 'diamond');
        }
        this.scene.state.user.diamonds += userCount;
        this.scene.state.amplitude.logAmplitudeEvent('diamonds_get', {
          type: 'clan_event',
          count: userCount,
        });
        if (res.data.clanAward) {
          this.scene.state.amplitude.logAmplitudeEvent('clan_diamonds_get', {
            type: 'clan_event',
            count: clanCount,
          });
        }
        this.scene.state.clanEventTakenAward = true;
        this.scene.scene.stop();
        this.scene.game.scene.keys[this.scene.state.farm].ads.showInterstitialAd();
        this.scene.game.scene.keys[this.scene.state.farm].autosave();
      }
    }).catch(() => {
      this.scene.state.clanEventTakenAward = true;
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.scene.state.farm].ads.showInterstitialAd();
    });
  }

  private salute(): void {
    this.scene.time.addEvent({
      delay: 400,
      callback: (): void => {
        const position: any = {
          x: this.scene.cameras.main.centerX + Phaser.Math.RND.pick(Phaser.Math.RND.signs) * Phaser.Math.Between(80, 200),
          y: this.scene.cameras.main.centerY - 100 + Phaser.Math.RND.pick(Phaser.Math.RND.signs) * Phaser.Math.Between(90, 280),
        }
        Firework.create(this.scene, position, 1);
      },
      repeat: 7,
    });
  }
}