import axios, { AxiosResponse } from 'axios';
import { shortNum } from '../../../general/basic';
import Modal from '../../../scenes/Modal/Modal';
import { clanTournamentSettings } from '../../../local/settings';
import BigInteger from '../../../libs/BigInteger';

export default class ClanTournamentWindow extends Phaser.GameObjects.Sprite {
  public scene: Modal;
  private posx: number;
  private posy: number;
  private windowHeight: number;
  private windowWidth: number;
  private bg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Sprite;
  private closeBtn: Phaser.GameObjects.Sprite;
  private headerText: Phaser.GameObjects.Text;
  private footer: Phaser.GameObjects.Sprite;
  private modalElements: Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.TileSprite | Phaser.GameObjects.Text | Phaser.GameObjects.RenderTexture> = [];
  private windowType: number = 1;
  private farm: string;
  private userMoney: Phaser.GameObjects.Text;
  private userMoneyIcon: Phaser.GameObjects.Sprite;
  private textUserPoints: Phaser.GameObjects.Text;
  private countUserPoints: Phaser.GameObjects.Text;
  private textClanPoints: Phaser.GameObjects.Text;
  private countClanPoints: Phaser.GameObjects.Text;
  private textClanPlace: Phaser.GameObjects.Text;
  private countClanPlace: Phaser.GameObjects.Text;
  private plates: AnimalPlate[] = [];

  private userPoints: number = 0;
  private clanPoints: number = 0;
  private clanPlace: number = 0;


  constructor(scene: Modal) {
    super(scene, 0, 0, 'pixel');
    this.scene = scene;
    this.init();
  }
  
  private init(): void {
    this.scene.add.existing(this);
    this.posx = this.scene.cameras.main.centerX;
    this.posy = this.scene.cameras.main.centerY + 50;
    this.windowType = this.scene.state.modal.clanTabType || 1;
    this.windowHeight = 650;
    this.windowWidth = 527;
    if (!this.scene.state.clanTournamentData) this.getEventData();
    else this.createElements();
  }

  private getEventData(): void {
    const data: any = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
    };
    this.scene.scene.launch('Block');
    const loadingSprite:Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'loading-spinner');
    const animation:Phaser.Tweens.Tween = this.scene.tweens.add({
      targets: loadingSprite,
      rotation: 2 * Math.PI,
      duration: 700,
      repeat: -1,
    });
    axios.post(process.env.API + '/getTournamentUserData', data).then(res => {
      const { data } = res;
      console.log(data)
      if (!data.error) {
        this.scene.state.clanTournamentData = data.data;
        this.scene.state.clanEventPlace = data.data.place;
        this.scene.scene.stop('Block');
        animation?.remove();
        loadingSprite?.destroy();
        this.createElements();
      }
    });
  }

  private createElements(): void {
    this.userPoints = this.scene.state.clanTournamentData.points;
    this.clanPoints = this.scene.state.clanTournamentData.clanPoints;
    this.clanPlace = this.scene.state.clanTournamentData.place;
    this.createBg();
    this.createHeader();
    this.createFooter();
    this.createCloseTab();
    this.createTabs([1, 2, 3]);
    this.createMainElements();
    this.createAnimals();
  }

  private createMainElements(): void {
    switch (this.windowType) {
      case 1:
        this.farm = 'sheep';
        break;
      case 2:
        this.farm = 'chicken';
        break;
      case 3:
        this.farm = 'cow';
        break;
      default:
        break;
    }
    this.createInfo();
  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.posx, this.posy, this.windowWidth, this.windowHeight, 'white-pixel').setTint(0xFF9700);
    this.modalElements.push(this.bg);
  }

  private createHeader(): void {
    this.header = this.scene.add.sprite(this.posx, this.posy - this.windowHeight / 2 + 45 , 'clan-tournament-header').setDepth(2).setOrigin(0.5, 1);
    this.modalElements.push(this.header);
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.posx, this.posy + this.windowHeight / 2, 'profile-window-footer').setOrigin(0.5, 0);
    this.modalElements.push(this.footer);
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.state.clanTournamentData = null;
    this.scene.scene.stop();
  }

  private createCloseTab(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    const tab: Phaser.GameObjects.Sprite = this.scene.add.sprite(headerGeom.right - 18, headerGeom.top + 5, 'clan-window-tab-close').setOrigin(1, 1);
    const tabGeom: Phaser.Geom.Rectangle = tab.getBounds();
    const tabIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(tabGeom.centerX + 5, tabGeom.centerY - 5, 'close-window-btn').setOrigin(0.5).setScale(0.9);
    this.scene.clickButtonUp(tab, (): void => { this.onCloseBtn() }, tabIcon);
    this.modalElements.push(tab, tabIcon);
  }

  private createTabs(types: Array<number>): void {
    const tabCount: number = types.length;
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    let left: number = headerGeom.left + 15;
    const maxWidth: number = 455;
    types.forEach((el: number) => {
      this.createTab({ x: left, y: headerGeom.top + 25 }, tabCount, el)
      left += maxWidth / tabCount;
    });
  }

  private createTab(pos: Iposition, count: number, type: number): void {
    const active: boolean = this.windowType === type;
    const maxWidth: number = 455;
    const tabHeight: number = 104;
    const activeTabHeight: number = 115;
    const slice: number = 30;
    const height: number = active ? activeTabHeight : tabHeight;
    const texture: string = active ? 'clan-window-tab-active' : 'clan-window-tab-disable';
    const tab: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(pos.x, pos.y, maxWidth / count, height, texture, slice).setOrigin(0, 1);
    const tabGeom: Phaser.Geom.Rectangle = tab.getBounds();
    const textureIcon: string = type === 1 ? 'clan-tab-icon-sheep' : 
    type === 2 ? 'clan-tab-icon-chicken' : 'clan-tab-icon-cow';
    const tabIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(tabGeom.centerX, tabGeom.centerY - 10, textureIcon);
    
    this.modalElements.push(tab, tabIcon);
    if (!active) {
      this.scene.clickButtonUp(tab, (): void => {
        this.scene.state.modal = {
          type: 20,
          clanTabType: type,
        };
        this.scene.scene.stop('ClanScroll');
        this.scene.scene.restart(this.scene.state);
      }, tabIcon);
    }
  }

  private createInfo(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '19px',
      color: '#fffdfa',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };

    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    
    const y = this.posy + 125;
    this.scene.add.nineslice(this.posx, y, 490, 590, 'modal-square-bg', 10).setOrigin(0.5);
    this.scene.add.sprite(this.posx, y - 308, 'clan-tournament-plate-bg');
    
    this.userMoney = this.scene.add.text(this.posx + 12, y - 308, shortNum(this.scene.state[`user${this.farm[0].toUpperCase() + this.farm.slice(1)}`].money), textStyle).setOrigin(0.5).setFontSize(24).setAlpha(0.65);
    this.userMoneyIcon = this.scene.add.sprite(this.posx - 60, y - 308, `${this.farm}Coin`).setScale(0.125);

    this.textUserPoints = this.scene.add.text(0, headerGeom.centerY + 2 - 40, `${this.scene.state.lang.yourContribution}:`, textStyle)
      .setOrigin(0.5)
      .setDepth(2);

    this.countUserPoints = this.scene.add.text(0, headerGeom.centerY + 2 - 40, `${this.userPoints}`, textStyle)
      .setOrigin(0.5)
      .setDepth(2)
      .setColor('#dcff3c');

    this.textClanPoints = this.scene.add.text(0, headerGeom.centerY + 35 - 40, `${this.scene.state.lang.clanAnimals}:`, textStyle)
      .setOrigin(0.5)
      .setDepth(2);

    this.countClanPoints = this.scene.add.text(0, headerGeom.centerY + 35 - 40, `${shortNum(this.clanPoints)}`, textStyle)
      .setOrigin(0.5)
      .setDepth(2)
      .setColor('#dcff3c');

    this.scene.add.nineslice(this.bg.getBounds().left, headerGeom.centerY + 123, 400, 50, 'clan-window-leader-plate-ns', 5).setOrigin(0, 0.5);

    this.textClanPlace = this.scene.add.text(0, headerGeom.centerY + 123, `${this.scene.state.lang.clanPlace}:`, textStyle)
      .setOrigin(0.5)
      .setFontSize(25)
      .setDepth(2);
    this.countClanPlace = this.scene.add.text(0, headerGeom.centerY + 123, `${this.clanPlace}`, textStyle).setDepth(2)
      .setOrigin(0.5)
      .setFontSize(25)
      .setDepth(2)
      .setColor('#dcff3c');

    const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.posx + 160, headerGeom.centerY + 123, 'profile-window-button-yellow').setScale(1.3, 1.2);
    const title: Phaser.GameObjects.Text = this.scene.add.text(btn.x, btn.y - 5, this.scene.state.lang.eventRating, textStyle).setFontSize(22).setOrigin(0.5);

    this.scene.clickModalBtn({ btn, title }, () => {
      this.scene.state.modal = {
        type: 21,
      };
      this.scene.scene.restart(this.scene.state);
    });
    this.setUserTextX();
    this.setClanTextX();
    this.setClanPlaceTextX();
  }

  public preUpdate(time: number, delta: number): void {
    if (this.scene.scene.isActive() && this.scene.state.modal.type === 20 && this.scene.state.clanTournamentData) {
      if (this.clanPlace !== this.scene.state.clanTournamentData.place) {
        this.clanPlace = this.scene.state.clanTournamentData.place;
        this.countClanPlace.setText(String(this.clanPlace));
        this.setClanPlaceTextX();
      }

      if (this.clanPoints !== this.scene.state.clanTournamentData.clanPoints) {
        this.clanPoints = this.scene.state.clanTournamentData.clanPoints;
        this.countClanPoints.setText(String(this.clanPoints));
        this.setClanTextX();
      }

      if (this.userPoints !== this.scene.state.clanTournamentData.points) {
        this.userPoints = this.scene.state.clanTournamentData.points;
        this.countUserPoints.setText(String(this.userPoints));
        this.setUserTextX();
      }
      if (this.scene.state.progress.clanEvent.endTime <= 0) this.scene.scene.stop();
    }
  }
  
  private setUserTextX(): void {
    const x = this.posx + 140;
    const textGeom: Phaser.Geom.Rectangle = this.textUserPoints.getBounds();
    const countGeom: Phaser.Geom.Rectangle = this.countUserPoints.getBounds();
    const width: number = (textGeom.width + countGeom.width) / 4 + 2;
    this.textUserPoints.setX(x - width);
    this.countUserPoints.setX(x + width);
  }

  private setClanTextX(): void {
    const x = this.posx + 145;
    const textGeom: Phaser.Geom.Rectangle = this.textClanPoints.getBounds();
    const countGeom: Phaser.Geom.Rectangle = this.countClanPoints.getBounds();
    const width: number = (textGeom.width + countGeom.width) / 4 + 2;
    this.textClanPoints.setX(x - width);
    this.countClanPoints.setX(x + width);
  }

  private setClanPlaceTextX(): void {
    const x = this.posx - 50;
    const textGeom: Phaser.Geom.Rectangle = this.textClanPlace.getBounds();
    const countGeom: Phaser.Geom.Rectangle = this.countClanPlace.getBounds();
    const width: number = (textGeom.width + countGeom.width) / 4 + 2;
    this.textClanPlace.setX(x - width);
    this.countClanPlace.setX(x + width);
  }

  private createAnimals(): void {
    const startY: number = 540;
    let x: number = 240;
    let y: number = startY;
    clanTournamentSettings.forEach((el, index) => {
      const sprite = new AnimalPlate(this, x, y, this.farm, index + 1);
      y += sprite.displayHeight + 10;
      if (y > 1100) {
        y = startY;
        x += sprite.displayWidth + 25;
      }
      this.plates.push(sprite);
    });
  }

  public updateBtns(): void {
    this.userMoney.setText(shortNum(this.scene.state[`user${this.farm[0].toUpperCase() + this.farm.slice(1)}`].money));
    this.plates.forEach(el => {
      el.updateBtnState();
    });
  }

  public disableBtns(): void {
    this.plates.forEach(el => {
      el.disableBtn();
    });
  }
}

class AnimalPlate extends Phaser.GameObjects.Sprite {
  public scene: Modal;
  private window: ClanTournamentWindow;
  private breed: number;
  private price: string;
  private count: number;
  public type: string;
  private btn: Phaser.GameObjects.Sprite;
  private btnText: Phaser.GameObjects.Text;
  private btnImg: Phaser.GameObjects.Sprite;

  constructor(window: ClanTournamentWindow, x: number, y: number, type: string, breed: number) {
    super(window.scene, x, y, 'clan-tournament-animal-bg');
    this.breed = breed;
    this.window = window;
    this.type = type;
    this.init();
    this.create();
  }

  private init(): void {
    const animal: ItournamentAnimal = this.scene.state.clanTournamentData[this.type].find((el: ItournamentAnimal) => el.breed === this.breed);
    this.count = animal ? animal.count : 0;
    this.setPrice();
  }

  private create(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '16px',
      color: '#fffdfa',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };
    const btnTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '18px',
      color: '#fffdfa',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#577f2a',
        blur: 2,
        fill: true,
      },
    };
    this.scene.add.existing(this);
    const mask: Phaser.Display.Masks.BitmapMask = this.createBitmapMask();

    const paddingX: number = this.type === 'sheep' ? 40 : this.type === 'chicken' ? 60 : 50;
    const paddingY: number = this.type === 'cow' ? -10 : 0;
    const scale: number = this.type === 'cow' ? 0.65 : 0.8
    this.scene.add.sprite(this.x - this.width / 2 + paddingX, this.y + paddingY, `clan-${this.type}-${this.breed}`).setScale(scale).setMask(mask);
    this.scene.add.text(this.x + 35 + 5, this.y - 23, this.scene.state.lang[`${this.type}Breed${this.breed}`], textStyle).setOrigin(0.5);
    this.btn = this.scene.add.sprite(this.x + 35 + 5, this.y + 17, 'little-button').setScale(0.95, 0.75);
    this.btnImg = this.scene.add.sprite(this.btn.x - this.btn.displayWidth / 2 + 22, this.btn.y - 5, `${this.type}Coin`).setScale(0.08);
    this.btnText = this.scene.add.text(this.btnImg.x + this.btnImg.displayWidth / 2 + 5, this.btn.y - 5, shortNum(this.price), btnTextStyle).setOrigin(0, 0.5);
    this.scene.clickShopBtn({ btn: this.btn, title: this.btnText, img: this.btnImg }, () => {
      this.onClick();
    });
    this.updateBtnState();
  }


  private setPrice(): void {
    const setting = clanTournamentSettings.find(el => el.breed === this.breed);
    const coefficient = 7;
    if (setting) this.price = setting.price;

    for (let i = 1; i < this.count; i++) {
      this.price = BigInteger.add(this.price, BigInteger.divide(BigInteger.multiply(this.price, String(coefficient)), '100'));
    }
  }

  public updateBtnState(): void {
    const animal: ItournamentAnimal = this.scene.state.clanTournamentData[this.type].find((el: ItournamentAnimal) => el.breed === this.breed);
    this.count = animal ? animal.count : 0;
    this.setPrice();
    const money = this.scene.state[`user${this.type[0].toUpperCase() + this.type.slice(1)}`].money;
    if (BigInteger.greaterThanOrEqual(String(Math.round(money)), this.price)) {
      this.btn.setInteractive();
      this.btn.setTexture('little-button');
      this.btnText.setColor('#fffdfa').setShadow(1, 1, '#577f2a', 2, true).setText(shortNum(this.price));
    } else {
      this.btn.setTexture('little-button-disable');
      this.btnText.setColor('#676767').setShadow().setText(shortNum(this.price));
      this.btn.removeInteractive();
    }
  }

  public disableBtn(): void {
    this.btn.removeInteractive();
  }

  private onClick(): void {
    this.window.disableBtns();
    this.postServer().then(res => {
      const { error, clan, place } = res.data;
      if (!error) {
        this.scene.state[`user${this.type[0].toUpperCase() + this.type.slice(1)}`].money -= Number(this.price);
        const user = clan.users.find(el => el.id === this.scene.state.user.id);
        this.scene.state.clanTournamentData = {
          clanPoints: clan.points,
          points: user.points,
          sheep: user.sheep,
          chicken: user.chicken,
          cow: user.cow,
          place: place,
        };
        this.window.updateBtns(); 
      }
    }).finally(() => {
      this.window.updateBtns();
    });
  }

  private postServer(): Promise<AxiosResponse<any>> {
    let login: string = this.scene.state.user.login;;
    if (this.scene.state.platform !== 'web' && this.scene.state.platform !== 'android') login = this.scene.state.name;
    const data = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      type: this.type,
      breed: this.breed,
      name: login,
      avatar: this.scene.state.user.avatar,
      status: this.scene.state.user.status,
    };
    return axios.post(process.env.API + '/addAnimalTournament', data);
  }
}