import Modal from './../../scenes/Modal/Modal';
import bridge from '@vkontakte/vk-bridge';
import { FAPI } from '../../libs/Fapi.js';

const LANGS: { [key: string]: string } = {
  joinGroupVK: 'Вступи в группу',
  joinGroupOK: 'Вступи в группу',
  addFavoritesVK: 'Добавь в избранное',
  addFavoritesOK: 'Добавь группу в закладки',
  subGroupVK: 'Подпишись на ЛС от группы',
  subGroupOK: 'Подпишись на ЛС от группы',
  subNativeVK: 'Подпишись на уведомления',
  title: 'Социальные задания',
  subtitle: 'Получай ежедневную награду'
}

export default class SocialTasksWindow {
  public scene: Modal;
  private height: number;
  public socialTasks: IsociaTasks;
  private topBg: Phaser.GameObjects.Sprite;
  private bottomBg: Phaser.GameObjects.Sprite;
  private middleBg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Text;
  private subHeader: Phaser.GameObjects.Text;
  private close: Phaser.GameObjects.Sprite;
  private takeText1: Phaser.GameObjects.Text;
  private takeText2: Phaser.GameObjects.Text;
  private diamond: Phaser.GameObjects.Sprite;
  private takeBtn: Phaser.GameObjects.Sprite;
  private takeBtnText: Phaser.GameObjects.Text;
  private readonly award: number = 5;
  private joinGroupTask: Task;
  private subGroupTask: Task;
  private subNativeTask: Task;
  private addFavoritesTask: Task;
  
  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
  }

  private init(): void {
    if (this.scene.scene.isActive('Profile')) this.scene.game.scene.keys['Profile'].updateSocialTaskNative();
    this.height = 0;
    if (this.scene.state.platform === 'vk') {
      this.socialTasks = this.scene.state.vkTask;
    } else if (this.scene.state.platform === 'web') {
      this.socialTasks = {
        joinGroup: false,
        subGroup: false,
      }
    } else if (this.scene.state.platform === 'ok') {
      this.socialTasks = this.scene.state.okTask;
    }
  }
  private create(): void {
    const height: number = 500;
    const centerX: number = this.scene.cameras.main.centerX;
    const centerY: number = this.scene.cameras.main.centerY;

    this.topBg = this.scene.add.sprite(centerX, centerY - Math.floor(height / 2), 'social-task-top').setOrigin(0.5, 1);
    this.middleBg = this.scene.add.tileSprite(centerX - 1, centerY, 526, height, 'social-task-middle');
    this.bottomBg = this.scene.add.sprite(centerX, centerY +  Math.floor(height / 2), 'social-task-bottom').setOrigin(0.5, 0);
    this.header = this.scene.add.text(centerX - 25, centerY, LANGS.title, {
      color: '#F6DDFD',
      font: '35px Shadow',
    }).setOrigin(0.5);
    this.subHeader = this.scene.add.text(centerX - 25, centerY, LANGS.subtitle, {
      color: '#942109',
      font: '22px Shadow',
    }).setOrigin(0.5);
    this.close = this.scene.add.sprite(centerX, centerY, 'tasks-close').setDepth(2);
    this.scene.clickButton(this.close, () => {
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.scene.stop();
    });

    this.takeText1 = this.scene.add.text(centerX - 220, centerY, String(this.award), {
      font: '34px Shadow',
      color: '#F6DDFD'
    }).setShadow(2, 2, '#595959', 1).setOrigin(0, 0.5);
    this.diamond = this.scene.add.sprite(0, centerY, 'diamond').setScale(0.2).setOrigin(0, 0.5);
    this.takeText2 = this.scene.add.text(0, centerY, 'в день', {
      font: '34px Shadow',
      color: '#F6DDFD'
    }).setShadow(2, 2, '#595959', 1).setOrigin(0, 0.5);
    this.takeBtnText = this.scene.add.text(0, 0, this.scene.state.lang.pickUp, {
      font: '25px Shadow',
      color: '#ffffff'
    }).setOrigin(0.5).setDepth(2);
    this.takeBtn = this.scene.add.sprite(0, 0, 'shop-btn');

    if (!this.scene.state.user.takenSocialAward && !this.checkTask()) {
      this.scene.state.shownSocialTaskWindow = true;
      if (this.scene.scene.isActive('Profile')) this.scene.game.scene.keys['Profile'].updateSocialTaskNative();
    }
    this.setTakeBtnState();
    this.createElements();
    this.setBgPosition();
  }

  private checkTask(): boolean {
    const check: boolean[] = [];
    for (const key in this.socialTasks) {
      check.push(this.socialTasks[key]);
    }
    return check.every(el => el);
  }

  public setTakeBtnState(): void {
    if (this.checkTask() && !this.scene.state.user.takenSocialAward) {
      this.takeBtn.setTexture('shop-btn');
      this.takeBtnText.setStroke('#0A600A', 4).setColor('#ffffff');
      this.scene.clickShopBtn({ btn: this.takeBtn, title: this.takeBtnText }, (): void => {
        this.onBtnPickUpHandler();
      });
    } else {
      this.takeBtn.setTexture('shop-btn-disable');
      this.takeBtnText.setStroke('#888888', 4).setColor('#3B3B3B');
    } 
  }

  private createElements(): void {
    const centerX: number = this.scene.cameras.main.centerX;
    const centerY: number = this.scene.cameras.main.centerY;
    let taskLenght: number = -1;
    for (const key in this.socialTasks) taskLenght += 1;

    let count: number = 0;
    const startY: number = centerY - taskLenght * (50);
    for (const key in this.socialTasks) {
      const y: number = startY + count * 100;
      count += 1;
      if (key === 'joinGroup') {
        this.joinGroupTask = new Task(this, key, { x: centerX, y: y });
        this.joinGroupTask.setState(this.socialTasks[key]);
      } else if (key === 'subGroup') {
        this.subGroupTask = new Task(this, key, { x: centerX, y: y });
        this.subGroupTask.setState(this.socialTasks[key]);
      } else if (key === 'subNative') {
        this.subNativeTask = new Task(this, key, { x: centerX, y: y });
        this.subNativeTask.setState(this.socialTasks[key]);
      } else if (key === 'addFavorites') {
        this.addFavoritesTask = new Task(this, key, { x: centerX, y: y });
        this.addFavoritesTask.setState(this.socialTasks[key]);
      }
    }
    this.height = count * 100;
  }

  private setBgPosition(): void {
    const centerY: number = this.scene.cameras.main.centerY;

    this.topBg.setY(centerY - Math.floor(this.height / 2));
    this.middleBg.setDisplaySize(526, this.height);
    this.bottomBg.setY(centerY + Math.floor(this.height / 2));
    const topGeom: Phaser.Geom.Rectangle = this.topBg.getBounds();
    const bottomGeom: Phaser.Geom.Rectangle = this.bottomBg.getBounds();
    
    this.header.setY(topGeom.centerY - 35);
    this.subHeader.setY(topGeom.centerY);
    this.close.setPosition(topGeom.right - 35, topGeom.top + 35);
    this.takeText1.setY(bottomGeom.centerY);
    this.diamond.setPosition(this.takeText1.getBounds().right + 8,  bottomGeom.centerY);
    this.takeText2.setPosition(this.diamond.getBounds().right + 8,  bottomGeom.centerY);
    this.takeBtn.setPosition(bottomGeom.right - this.takeBtn.displayWidth / 2 - 60, bottomGeom.centerY);
    this.takeBtnText.setPosition(this.takeBtn.x, this.takeBtn.y - 3);
  }  
  private onBtnPickUpHandler(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;

    const centerPosition: Iposition = { x: this.scene.cameras.main.centerX, y: this.scene.cameras.main.centerY };
    if (this.scene.scene.isActive('Profile')) this.scene.game.scene.keys['Profile'].getCurrency(centerPosition, this.award, 'diamond');
    else this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].getCurrency(centerPosition, this.award, 'diamond');
    
    this.scene.state.user.diamonds += this.award;
    this.scene.state.user.takenSocialAward = true;
    if (this.scene.scene.isActive('Profile')) this.scene.game.scene.keys['Profile'].updateSocialTaskNative();
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('diamonds_get', {
      type: 'virality',
      count: this.award,
    });
  }
}

class Task {
  private window: SocialTasksWindow;
  private scene: Modal;
  private key: string;
  private position: Iposition;
  private bg: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private button: Phaser.GameObjects.Sprite;
  private buttonText: Phaser.GameObjects.Text;
  private complete: Phaser.GameObjects.Sprite;

  constructor(window: SocialTasksWindow, key: string, position: Iposition) {
    this.window = window;
    this.scene = window.scene;
    this.key = key;
    this.position = position;
    this.create();
  }

  private create(): void {
    const textWidth: number = 200;
    this.bg = this.scene.add.sprite(this.position.x,  this.position.y, 'social-task-bg');
    this.text = this.scene.add.text(this.position.x - 180 , this.position.y, LANGS[`${this.key}${this.scene.state.platform.toUpperCase()}`],  {
      font: '20px Bip',
      color: '#944000',
      wordWrap: { width: textWidth },
    }).setOrigin(0, 0.5);
    this.complete = this.scene.add.sprite(this.position.x + 120, this.position.y, 'completed');
    this.button = this.scene.add.sprite(this.position.x + 120, this.position.y, 'improve-collector').setScale(0.8).setVisible(false);
    this.buttonText = this.scene.add.text(this.position.x + 120, this.position.y - 3, 'Выполнить', {
      font: '20px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4).setVisible(false);
    
    this.scene.clickShopBtn({ btn: this.button, title: this.buttonText }, (): void => {
      this.onBtnHandler();
    });
  }

  private onBtnHandler() {
    switch (this.key) {
      case 'joinGroup':
        this.joinGroupCallback();
      break;
      case 'addFavorites':
        this.addFavoritesCallback();
      break;
      case 'subGroup':
        this.subGroupCallback();
      break;
      case 'subNative':
        this.subNativeCallback();
      break;
      default: 
        console.log('Wrong key');
      break;
    }
  }

  private joinGroupCallback(): void {
    if (this.scene.state.platform === 'vk') {
      bridge.send('VKWebAppJoinGroup', { group_id: Number(process.env.VK_GROUP_ID) })
        .then(res => {
          if (res.result) {
            this.window.socialTasks.joinGroup = res.result;
          }
          this.setState(res.result);
          this.window.setTakeBtnState();
        }).catch(err => console.log(err));
    } else if (this.scene.state.platform === 'ok') {
      window.open(`https://ok.ru/group/${process.env.OK_GROUP_ID}`);
      this.window.socialTasks.joinGroup = true;
      this.setState(true);
      this.window.setTakeBtnState();
    }
  }

  private addFavoritesCallback(): void {
    if (this.scene.state.platform === 'vk') {
      bridge.send('VKWebAppAddToFavorites').then(res => {
        if (res.result) {
          this.window.socialTasks.addFavorites = res.result;
        }
        this.setState(res.result);
        this.window.setTakeBtnState();
      }).catch(err => console.log(err));
    } else if (this.scene.state.platform === 'ok') {
      FAPI.Client.call({ 'method':'bookmark.add', 'ref_id': String(process.env.OK_GROUP_ID), 'bookmark_type': 'group' }, (status, data, error) => {
        if (data) {
          this.window.socialTasks.addFavorites = data.success;
          FAPI.Client.call({ 'method':'storage.set', 'key': 'addFavourites', 'value': JSON.stringify(data.success) });
          this.setState(data.success);
          this.window.setTakeBtnState();
        }
      });
    }
  }

  private subGroupCallback(): void {
    if (this.scene.state.platform === 'vk') {
      bridge.send('VKWebAppAllowMessagesFromGroup', { group_id: Number(process.env.VK_GROUP_ID) })
      .then(res => {
        if (res.result) {
          this.window.socialTasks.subGroup = res.result;
        }
        this.setState(res.result);
        this.window.setTakeBtnState();
      }).catch(err => console.log(err));
    } else if (this.scene.state.platform === 'ok') {
      // FAPI.UI.showPermissions(["BOT_API_INIT"]);
      window.open(`https://ok.ru/group/${process.env.OK_GROUP_ID}`);
      this.window.socialTasks.subGroup = true;
      this.setState(true);
      this.window.setTakeBtnState();
    }
  }

  private subNativeCallback(): void {
    if (this.scene.state.platform === 'vk') {
      bridge.send('VKWebAppAllowNotifications').then(res => {
        if (res.result) {
          this.window.socialTasks.subNative = res.result;
        }
        this.setState(res.result);
        this.window.setTakeBtnState();
      }).catch(err => console.log(err));
    }
  }

  public setState(complete: boolean): void {
    if (complete) {
      this.bg.setTint(0xc0c0c0);
      this.text.setColor('#797A75');
      this.complete.setVisible(true);
      this.button.setVisible(false);
      this.buttonText.setVisible(false);
    } else {
      this.bg.setTint(0xFFFFFF);
      this.text.setColor('#944000');
      this.complete.setVisible(false);
      this.button.setVisible(true);
      this.buttonText.setVisible(true);
    }
  };
}
