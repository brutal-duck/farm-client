import Modal from './../../scenes/Modal/Modal';

export default class SettingsWindow {
  private scene: Modal;
  private header: Phaser.GameObjects.Sprite;
  private headerText: Phaser.GameObjects.Text;
  private closeBtn: Phaser.GameObjects.Sprite;
  private footer: Phaser.GameObjects.Sprite;
  private height: number;
  private width: number;
  private bg: Phaser.GameObjects.TileSprite;
  private x: number;
  private y: number;
  private musicPlus: Phaser.GameObjects.Sprite;
  private musicMinus: Phaser.GameObjects.Sprite;
  private soundPlus: Phaser.GameObjects.Sprite;
  private soundMinus: Phaser.GameObjects.Sprite;
  private soundSegments: Array<Phaser.GameObjects.Sprite>;
  private musicSegments: Array<Phaser.GameObjects.Sprite>;


  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.createElements();
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.height = 200;
    this.width = 527;
  }

  private createElements(): void {
    this.createBg();
    this.createSoundsController();
    this.createHeader();
    this.createFooter();
    if (this.scene.state.platform === 'web' || this.scene.state.platform === 'android') {
      this.createChangeNicknameBtn();
    }
    this.setSegmentsState();
  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.width, this.height, 'white-pixel').setTint(0xFA8F1F);
  }

  private createHeader(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
    };
    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 10 , 'settings-window-header').setOrigin(0.5, 1);
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();

    this.headerText = this.scene.add.text(headerGeom.centerX, headerGeom.centerY - 15, this.scene.state.lang.settingsHeader, headerTextStyle).setOrigin(0.5);
    this.closeBtn = this.scene.add.sprite(headerGeom.right - 35, headerGeom.top + 35, 'tasks-close');

    this.scene.clickButton(this.closeBtn, () => { this.onCloseBtn(); });
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2, 'profile-window-footer').setOrigin(0.5, 0);
  }
  
  private createSoundsController(): void {
    const pos: Iposition = {
      x: this.x,
      y: this.y - 20,
    };

    const musicBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x, pos.y, 'settings-window-music-plate').setDepth(1);
    const soundBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x, musicBg.getBounds().bottom + 20, 'settings-window-sound-plate').setOrigin(0.5, 0).setDepth(1);
    
    const musicBgGeom: Phaser.Geom.Rectangle = musicBg.getBounds();
    const soundBgGeom: Phaser.Geom.Rectangle = soundBg.getBounds();
    const padding: number = 130;
    this.musicMinus = this.scene.add.sprite(musicBgGeom.left + padding, musicBgGeom.centerY, 'settings-window-minus').setDepth(1);
    this.soundMinus = this.scene.add.sprite(soundBgGeom.left + padding, soundBgGeom.centerY, 'settings-window-minus').setDepth(1);
    this.musicSegments = this.createSegments({ x: musicBgGeom.left + padding + 50, y: musicBgGeom.centerY });
    this.soundSegments = this.createSegments({ x: soundBgGeom.left + padding + 50, y: soundBgGeom.centerY });
    this.musicPlus = this.scene.add.sprite(musicBgGeom.right - 40, musicBgGeom.centerY, 'settings-window-plus').setDepth(1);
    this.soundPlus = this.scene.add.sprite(soundBgGeom.right - 40, soundBgGeom.centerY, 'settings-window-plus').setDepth(1);
    this.setVolumeBtnsListeners();
  }

  private setVolumeBtnsListeners(): void {
    this.scene.clickButton(this.musicMinus, () => {
      if (this.scene.state.musicVolume > 0) {
        this.scene.state.musicVolume = (this.scene.state.musicVolume * 10 - 1) / 10;
        this.setSegmentsState();
        this.saveVolume();
      }
    });
    this.scene.clickButton(this.soundMinus, () => {
      if (this.scene.state.soundVolume > 0) {
        this.scene.state.soundVolume = (this.scene.state.soundVolume * 10 - 1) / 10;
        this.setSegmentsState();
        this.saveVolume();
      }
    });
    this.scene.clickButton(this.musicPlus, () => {
      if (this.scene.state.musicVolume < 1) {
        this.scene.state.musicVolume = (this.scene.state.musicVolume * 10 + 1) / 10;
        this.setSegmentsState();
        this.saveVolume();
      }
    });
    this.scene.clickButton(this.soundPlus, () => {
      if (this.scene.state.soundVolume < 1) {
        this.scene.state.soundVolume = (this.scene.state.soundVolume * 10 + 1) / 10;
        this.setSegmentsState();
        this.saveVolume();
      }
    });
  }

  private createSegments(pos: Iposition): Array<Phaser.GameObjects.Sprite> {
    const array: Array<Phaser.GameObjects.Sprite> = [];
    for (let i: number = 0; i < 10; i ++) {
      const sprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x + i * 20, pos.y, 'settings-window-segment').setDepth(1);
      array.push(sprite);
    }
    return array;
  }

  private setSegmentsState(): void {
    this.clearSegment();
    const musicVolume: number = this.scene.state.musicVolume;
    for (let i: number = 0; i < musicVolume * 10; i++) {
      this.musicSegments[i]?.setTint(0xc4ed1e);
    }
    const soundVolume: number = this.scene.state.soundVolume;
    for (let i: number = 0; i < soundVolume * 10; i++) {
      this.soundSegments[i]?.setTint(0xc4ed1e);
    }
  }

  private clearSegment(): void {
    for (let i: number = 0; i < 10; i++) {
      this.musicSegments[i]?.setTint(0xffc074);
    }
    for (let i: number = 0; i < 10; i++) {
      this.soundSegments[i]?.setTint(0xffc074);
    }
  }
  
  private createChangeNicknameBtn(): void {
    const btn: any = this.scene.bigButton('yellow', 'center', 170, this.scene.state.lang.changeNickname);
    btn.btn.setScale(0.91);
    btn.title.setStroke('#ef9d32', 2);
    this.scene.clickModalBtn(btn, (): void => { this.onChangeNickName() });
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
    this.scene.state.foreignProfileId = undefined
  }

  private saveVolume(): void {
    //@ts-ignore
    this.scene.sound.get('music').volume = this.scene.state.musicVolume;
    const music: Phaser.Sound.BaseSound = this.scene.sound.get('music');
    console.log(music)
    this.scene.game.scene.keys[this.scene.state.farm].setPlatformStorage('musicVolume', this.scene.state.musicVolume);
    this.scene.game.scene.keys[this.scene.state.farm].setPlatformStorage('soundVolume', this.scene.state.soundVolume);
  }

  private onChangeNickName = (): void => {
    const modal: Imodal = { type: 1, sysType: 12 };
    this.scene.state.modal = modal;
    this.scene.scene.restart(this.scene.state);
  }
} 