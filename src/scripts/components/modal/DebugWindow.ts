import { randomString, shortNum } from "../../general/basic";
import LocalStorage from "../../libs/LocalStorage";
import sheepPartSettings from "../../local/test/sheepPartSettings";
import Modal from "../../scenes/Modal/Modal";
import Hint from "../animations/Hint";
import BigButton from "../Buttons/BigButton";
import { basicSheepFarm, fullTerritories } from "../../local/basicFarms/basicSheepFarm";
import Sheep from './../../scenes/Sheep/Main';
import sheepTerritories from "../../local/sheepTerritories";

export default class DebugWindow {
  public scene: Modal;
  private x: number;
  private y: number;
  private readonly height: number = 750;
  private readonly width: number = 527;
  private bg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Sprite;
  private closeBtn: Phaser.GameObjects.Sprite;
  private headerText: Phaser.GameObjects.Text;
  private footer: Phaser.GameObjects.Sprite;
  private newMoney: number;
  private newDiamonds: number;
  private autoprogressTime: number;
  private newPart: number;
  
  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.createElements();
  };

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.newMoney = this.scene.state[`user${this.scene.state.farm}`].money;
    this.newDiamonds = this.scene.state.user.diamonds;
    this.autoprogressTime = 0;
    this.newPart = this.scene.state[`user${this.scene.state.farm}`].part;
  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.x, this.y, this.width, this.height, 'white-pixel').setTint(0xFF9700);
  }

  private createHeader(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '50px',
      wordWrap: { width: 400, useAdvancedWrap: true },
      align: 'center',
    };
    this.header = this.scene.add.sprite(this.x, this.y - this.height / 2 + 10, 'settings-window-header').setOrigin(0.5, 1);
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();

    this.headerText = this.scene.add.text(headerGeom.centerX - 30, headerGeom.centerY - 10, 'DEBUG', headerTextStyle).setOrigin(0.5);
    this.closeBtn = this.scene.add.sprite(headerGeom.right - 35, headerGeom.top + 35, 'close-window-btn');

    this.scene.clickButton(this.closeBtn, () => { this.closeWindow(); });
  }
  
  private closeWindow(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop();
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.x, this.y + this.height / 2, 'profile-window-footer').setOrigin(0.5, 0);
  }

  private createElements(): void {
    this.createBg();
    this.createHeader();
    this.createFooter();
    this.createBtns();
    this.createIncrement({ x: this.x, y: this.y - 150 }, 'diamond');
    this.createIncrement({ x: this.x, y: this.y - 70 }, this.scene.state.farm.toLowerCase());
    this.createAutoprogressInc();
    this.createPartInc();
  }

  private createBtns(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      align: 'center',
      fontSize: '24px',
      color: '#ffe2e2',
      stroke: '#009900',
      strokeThickness: 3,
    };
    const { centerX, centerY } = this.scene.cameras.main;
    const pos1: Iposition = { x: centerX - 120, y: centerY + 435 };
    const pos2: Iposition = { x: centerX + 120, y: centerY + 435 };

    const resetProgress = () => {
      LocalStorage.set('hash', '');
      LocalStorage.set('farm', '');
      window.location.reload();
    };

    const openAllAchievemetns = () => {
      if (!this.scene.state.user.achievements.every(el => el.progress === el.count)) {
        this.scene.state.user.achievements.forEach(el => {
          el.progress = el.count;
        });
        Hint.create(this.scene, -300, 'Все достижения открыты', 2);
      } else {
        Hint.create(this.scene, -300, 'Все достижения уже открыты', 2);
      }
    };

    const openFarm = (farm: string) => {
      this.scene.game.scene.keys[this.scene.state.farm].autosave();
      this.scene.scene.stop();
      this.scene.scene.stop(this.scene.state.farm);
      this.scene.scene.stop(this.scene.state.farm + 'Bars');
      this.scene.scene.start(farm + 'Preload', this.scene.state);
    };

    new BigButton(this.scene, -310, resetProgress, { color: 'red', text: 'Сбросить прогресс', textAlign: 'center' });
    new BigButton(this.scene, -230, openAllAchievemetns, { color: 'green', text: 'Открыть достижения', textAlign: 'center' });

    if (this.scene.state.farm === 'Sheep') {
      new BigButton(this.scene, 260, () => openFarm('Chicken'), { color: 'yellow', text: 'Куриная ферма', textAlign: 'center' });
      new BigButton(this.scene, 340, () => openFarm('Cow'), { color: 'yellow', text: 'Коровья ферма', textAlign: 'center' });
    } else if (this.scene.state.farm === 'Chicken') {
      new BigButton(this.scene, 260, () => openFarm('Sheep'), { color: 'yellow', text: 'Овечья ферма', textAlign: 'center' });
      new BigButton(this.scene, 340, () => openFarm('Cow'), { color: 'yellow', text: 'Коровья ферма', textAlign: 'center' });
    } else if (this.scene.state.farm === 'Cow') {
      new BigButton(this.scene, 260, () => openFarm('Sheep'), { color: 'yellow', text: 'Овечья ферма', textAlign: 'center' });
      new BigButton(this.scene, 340, () => openFarm('Chicken'), { color: 'yellow', text: 'Куриная ферма', textAlign: 'center' });
    }


    const acceptBtn = this.scene.add.sprite(pos1.x, pos1.y, 'profile-window-button-green').setScale(1.5);
    const acceptBtnText = this.scene.add.text(acceptBtn.x, acceptBtn.y - 5, 'Применить', textStyle).setOrigin(0.5);

    const cancelBtn = this.scene.add.sprite(pos2.x, pos2.y, 'profile-window-button-yellow').setScale(1.5);
    const cancelBtnText = this.scene.add.text(cancelBtn.x + 2, cancelBtn.y - 5, 'Отменить', textStyle).setOrigin(0.5).setStroke('#D78A31', 2);

    this.scene.clickModalBtn({ btn: cancelBtn, title: cancelBtnText }, () => { this.closeWindow(); });
    this.scene.clickModalBtn({ btn: acceptBtn, title: acceptBtnText }, () => { this.onAcceptBtn(); });
  }

  private onAcceptBtn(): void {
    this.setNewCounts();
    this.startAutoprogress();
    this.updatePart();
    this.closeWindow();
  }

  private setNewCounts(): void {
    this.scene.state[`user${this.scene.state.farm}`].money = this.newMoney;
    this.scene.state.user.diamonds = this.newDiamonds;
  }

  private startAutoprogress(): void {
    if (this.autoprogressTime > 0) {
      const ONE_HOUR = 3600;
      this.scene.state.offlineTime = this.autoprogressTime * ONE_HOUR;
      this.scene.game.scene.keys[this.scene.state.farm].autoprogress();
    }
    this.scene.scene.stop();
  }

  private updatePart(): void {
    const currentPart = this.scene.state[`user${this.scene.state.farm}`].part;
    if (this.newPart === currentPart) return;
    const newSettings = basicSheepFarm[this.newPart - 1];

    this.scene.state[`user${this.scene.state.farm}`].part = this.newPart;
    this.scene.state[`user${this.scene.state.farm}`].fair = newSettings.fairLevel;
    this.scene.state[`user${this.scene.state.farm}`].collectorLevel = this.newPart - 1;
    this.scene.state[`user${this.scene.state.farm}`].collectorTimeLevel = this.newPart - 1;
    const mainScene = this.scene.scene.get('Sheep') as Sheep;
    mainScene.sheep.clear(true, true);
    mainScene.territories.clear(true, true);

    for (let i = 1; i < newSettings.animalBreed; i += 1) {
      const id = 'local_' + randomString(18);
      mainScene.state.sheep = [];
      mainScene.state.sheep.push({ _id: id, type: newSettings.animalBreed, x: 0, y: 0, wool: 0, counter: 0, diamond: 0, vector: 0 });
    }

    mainScene.state.sheepTerritories = sheepTerritories;
    if (this.newPart > 1) {
      for (let i = 0; i < newSettings.territoryCount; i += 1) {
        mainScene.state.sheepTerritories[i] = fullTerritories[i];
        mainScene.state.sheepTerritories[i].improve = this.newPart - 1;
      }
    }

    mainScene.world();
    mainScene.autosave();
    this.scene.scene.stop('Sheep');
    this.scene.scene.stop('SheepBars');
    mainScene.scene.start('Sheep' + 'Preload');
  }

  private createIncrement(pos: Iposition, farm: string): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
      wordWrap: { width: 400, useAdvancedWrap: true },
      align: 'center',
    };
    const coinBg: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x, pos.y, 'settings-plate').setDepth(1);
    const coinBgGeom: Phaser.Geom.Rectangle = coinBg.getBounds();
    const iconTexture = farm === 'diamond' ? 'diamond' : `${farm}Coin`;
    const coinIcon = this.scene.add.sprite(coinBgGeom.left + 45, coinBgGeom.centerY, iconTexture).setScale(0.25).setDepth(1);
    const coinMinus = this.scene.add.sprite(coinBgGeom.left + 130, coinBgGeom.centerY, 'settings-window-minus').setDepth(1);
    const coinPlus = this.scene.add.sprite(coinBgGeom.right - 40, coinBgGeom.centerY, 'settings-window-plus').setDepth(1);
    const coinCount = this.scene.add.text(coinBgGeom.centerX + 45, coinBgGeom.centerY, shortNum(this.newMoney), textStyle).setOrigin(0.5).setDepth(1);
    const moneyDelta = this.scene.game.scene.keys[this.scene.state.farm].convertDiamonds(10);
    let callbackMinus = () => {
      if (this.newMoney <= 0) return;
      this.newMoney -= moneyDelta;
      if (this.newMoney < 0) this.newMoney = 0;
      coinCount.setText(shortNum(this.newMoney));
    };
    let callbackPlus = () => {
      this.newMoney += moneyDelta;
      coinCount.setText(shortNum(this.newMoney));
    };

    if (farm === 'diamond') {
      coinCount.setText(shortNum(this.newDiamonds))
      const diamondDelta = 100;
      callbackMinus = () => {
        if (this.newDiamonds <= 0) return;
        this.newDiamonds -= diamondDelta;
        if (this.newDiamonds < 0) this.newDiamonds = 0;
        coinCount.setText(shortNum(this.newDiamonds));
      };
      callbackPlus = () => {
        this.newDiamonds += diamondDelta;
        coinCount.setText(shortNum(this.newDiamonds));
      };
    }

    this.scene.clickButton(coinMinus, callbackMinus);
    this.scene.clickButton(coinPlus, callbackPlus);
  }

  private createAutoprogressInc(): void {
    const pos = { x: this.x, y: this.y + 50 };
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
      wordWrap: { width: 400, useAdvancedWrap: true },
      align: 'center',
    };
    const title = this.scene.add.text(pos.x, pos.y - 40, 'Автопрогресс:', textStyle).setFontSize(30).setOrigin(0.5, 1).setDepth(2);
    const timeBg = this.scene.add.sprite(pos.x, pos.y, 'clear-plate').setDepth(1);
    const timeBgGeom = timeBg.getBounds();
    const timeMinus = this.scene.add.sprite(timeBgGeom.left + 40, timeBgGeom.centerY, 'settings-window-minus').setDepth(1);
    const timePlus = this.scene.add.sprite(timeBgGeom.right - 40, timeBgGeom.centerY, 'settings-window-plus').setDepth(1);
    const timeCount = this.scene.add.text(timeBgGeom.centerX, timeBgGeom.centerY, '0 ч.', textStyle).setOrigin(0.5).setDepth(1);
    const callBackMinus = () => {
      if (this.autoprogressTime <= 0) return;
      this.autoprogressTime -= 1;
      if (this.autoprogressTime < 0) this.autoprogressTime = 0;
      timeCount.setText(`${this.autoprogressTime} ч.`);
    };

    const callBackPlus = () => {
      this.autoprogressTime += 1;
      timeCount.setText(`${this.autoprogressTime} ч.`);
    };

    this.scene.clickButton(timeMinus, callBackMinus);
    this.scene.clickButton(timePlus, callBackPlus);
  }

  private createPartInc(): void {
    const pos = { x: this.x, y: this.y + 170 };
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#F3FBD0',
      fontFamily: 'Shadow',
      fontSize: '38px',
      wordWrap: { width: 400, useAdvancedWrap: true },
      align: 'center',
    };
    const title = this.scene.add.text(pos.x, pos.y - 40, 'Выбор главы:', textStyle).setFontSize(30).setOrigin(0.5, 1).setDepth(2);
    const partBg = this.scene.add.sprite(pos.x, pos.y, 'clear-plate').setDepth(1);
    const partBgGeom = partBg.getBounds();
    const partMinus = this.scene.add.sprite(partBgGeom.left + 40, partBgGeom.centerY, 'settings-window-minus').setDepth(1);
    const partPlus = this.scene.add.sprite(partBgGeom.right - 40, partBgGeom.centerY, 'settings-window-plus').setDepth(1);
    const partCount = this.scene.add.text(partBgGeom.centerX, partBgGeom.centerY, `${this.newPart} глава`, textStyle).setOrigin(0.5).setDepth(1);

    const minPart = 1;
    const callBackMinus = () => {
      if (this.newPart <= minPart) return;
      this.newPart -= minPart;
      if (this.newPart < minPart) this.newPart = minPart;
      partCount.setText(`${this.newPart} глава`);
    };

    const maxPart = sheepPartSettings.length;
    const callBackPlus = () => {
      if (this.newPart === maxPart) return;
      this.newPart += 1;
      partCount.setText(`${this.newPart} глава`);
    };

    this.scene.clickButton(partMinus, callBackMinus);
    this.scene.clickButton(partPlus, callBackPlus);
  }
};
