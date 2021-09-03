import axios, { AxiosResponse } from "axios";
import Modal from "../../../scenes/Modal/Modal";

export default class ClanTournamentEndWindow {
  public scene: Modal

  private clanPlace: number;
  private playerPlace: number;
  private awardDescriptionStyle: Phaser.Types.GameObjects.Text.TextStyle;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
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

    this.clanPlace = 1;
    this.playerPlace = 1;

    this.create();
  }

  private create(): void {
    const y: number = this.scene.cameras.main.centerY - 280;
    const x: number = this.scene.cameras.main.centerX;
    const width: number = 527;
    const height: number = 480;
    const titleStyle: Phaser.Types.GameObjects.Text.TextStyle = {
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
      wordWrap: { width: 400, useAdvancedWrap: true },
    };



    const header: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, y, 'modal-header-event-end').setDepth(2);
    const mid: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(x, header.getBottomCenter().y - 10, width, height, 'white-pixel').setOrigin(0.5, 0).setTint(0xFF9700);
    const bottom: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, mid.getBottomCenter().y, 'profile-window-footer').setOrigin(0.5, 0);

    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(x, header.getBottomCenter().y + 20, 480, 440, 'modal-square-bg', 10).setOrigin(0.5, 0).setDepth(2);
    const titleSlot: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, bg.getTopCenter().y + 2, 'clan-window-leader-plate-2').setOrigin(0.5, 0).setDisplaySize(479, 45).setDepth(2);
    const title: Phaser.GameObjects.Text = this.scene.add.text(x, titleSlot.getCenter().y, this.scene.state.lang.clanTournamentAwards, titleStyle).setOrigin(0.5).setDepth(2);

    this.createClanAwardInfo(x, titleSlot.getBottomCenter().y + 40);

    const takeBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, bottom.getTopCenter().y, 'done-chapter-button').setDepth(2);
    const textBtn: Phaser.GameObjects.Text = this.scene.add.text(x, takeBtn.getCenter().y, this.scene.state.lang.clanTournamentTakeAwards, this.awardDescriptionStyle).setOrigin(0.5).setDepth(2);
    this.scene.clickModalBtn({ btn: takeBtn, title: textBtn }, () => { console.log('награда') });
  }


  private createClanAwardInfo(x: number, y: number): void {
    const clanPlace: Phaser.GameObjects.Text = this.scene.add.text(x - 100, y, String(this.clanPlace), this.awardDescriptionStyle).setDepth(2);
    const crown: Phaser.GameObjects.Sprite = this.scene.add.sprite(x + 100, y, 'clan-window-crown').setDepth(2);
    const text: Phaser.GameObjects.Text = this.scene.add.text(crown.getCenter().x, crown.getBottomCenter().y + 10, this.scene.state.lang.clanTournamentClanReceived, this.awardDescriptionStyle).setOrigin(0.5, 0).setDepth(2);
    const award: Phaser.GameObjects.Text = this.scene.add.text(crown.getCenter().x, text.getBottomCenter().y + 20, this.getClanAward(), this.awardDescriptionStyle).setOrigin(0.5, 0).setDepth(2);
    const divider: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, text.getBottomCenter().y + 80, 'clan-window-line').setDepth(2);
    this.createPlayerAwardInfo(x, divider.getBottomCenter().y + 40);
  }


  private createPlayerAwardInfo(x: number, y: number): void {
    const playerPlace: Phaser.GameObjects.Text = this.scene.add.text(x - 100, y, String(this.playerPlace), this.awardDescriptionStyle).setOrigin(0.5).setDepth(2);
    const playerIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(x + 100, y, 'clan-window-crown').setDepth(2);
    const text: Phaser.GameObjects.Text = this.scene.add.text(playerIcon.getCenter().x, playerIcon.getBottomCenter().y + 10, this.scene.state.lang.clanTournamentYouReceived, this.awardDescriptionStyle).setOrigin(0.5, 0).setDepth(2);
    const award: Phaser.GameObjects.Text = this.scene.add.text(playerIcon.getCenter().x, text.getBottomCenter().y + 20, this.getPlayerAward(), this.awardDescriptionStyle).setOrigin(0.5, 0).setDepth(2);
  }


  private getClanAward(): string {
    let award: number;

    if (this.clanPlace === 1) award = 1000
    else if (this.clanPlace === 2) award = 700
    else if (this.clanPlace === 3) award = 400
    else if (this.clanPlace >= 4 && this.clanPlace <= 10) award = 300
    else if (this.clanPlace >= 11 && this.clanPlace <= 100) award = 100
    else if (this.clanPlace >= 101 && this.clanPlace <= 500) award = 50
    else if (this.clanPlace > 500) award = 20

    return String(award)
  }


  private getPlayerAward(): string {
    let award: number;

    if (this.playerPlace === 1) award = 100
    else if (this.playerPlace === 2) award = 70
    else if (this.playerPlace === 3) award = 40
    else if (this.playerPlace >= 4 && this.playerPlace <= 10) award = 30
    else if (this.playerPlace > 10) award = 10

    return String(award)
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
        this.clanPlace = res1.data.place
        this.playerPlace = res2.data.place
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
    let data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      count: +this.getClanAward() // количество кристаллов клана в зависимости от места
    }

    axios.post(process.env.API +'/takeTournamentAward', data).then((res): void => {
      if (!res.data) {
        // анимация
        this.scene.scene.stop()
      }
    });
  }
}