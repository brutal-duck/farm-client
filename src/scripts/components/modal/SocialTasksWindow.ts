import Modal from './../../scenes/Modal/Modal';
import bridge from '@vkontakte/vk-bridge';

const LANGS: { [key: string]: string } = {
  joinGroup: 'Вступи в группу',
  addFavorites: 'Добавь в избранное',
  subGroup: 'Подпишись на ЛС от группы',
  subNative: 'Подпишись на уведомления',
}

export default class SocialTasksWindow {
  public scene: Modal;
  private height: number;
  private socialTasks: IsociaTasks;
  private topBg: Phaser.GameObjects.Sprite;
  private bottomBg: Phaser.GameObjects.Sprite;
  private middleBg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Text;
  private close: Phaser.GameObjects.Sprite;
  private takeText1: Phaser.GameObjects.Text;
  private takeText2: Phaser.GameObjects.Text;
  private diamond: Phaser.GameObjects.Sprite;
  private takeBtn: Phaser.GameObjects.Sprite;
  private takeBtnText: Phaser.GameObjects.Text;
  private award: number = 10;
  private joinGroupTask: Task;
  private subGroupTask: Task;
  private subNativeTask: Task;
  private addFavoritesTask: Task;
  
  constructor(scene: Modal){
    this.scene = scene;
    this.init();
    this.create();
  }

  private init(): void {
    this.height = 0;
    if (this.scene.state.platform === 'vk') {
      this.socialTasks = this.scene.state.vkTask;
    } else if (this.scene.state.platform === 'web') {
      this.socialTasks = {
        joinGroup: true,
        subGroup: true,
        subNative: true,
        addFavorites: false
      }
    }

  }
  private create(): void {
    const height: number = 500;
    const centerX: number = this.scene.cameras.main.centerX;
    const centerY: number = this.scene.cameras.main.centerY;

    this.topBg = this.scene.add.sprite(centerX, centerY - Math.floor(height / 2), 'social-task-top').setOrigin(0.5, 1);
    this.middleBg = this.scene.add.tileSprite(centerX - 1, centerY, 526, height, 'social-task-middle');
    this.bottomBg = this.scene.add.sprite(centerX, centerY +  Math.floor(height / 2), 'social-task-bottom').setOrigin(0.5, 0);
    this.header = this.scene.add.text(centerX, centerY, 'Подарки', {
      color: '#F6DDFD',
      font: '45px Shadow',
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

    if (this.checkTask()) {
      this.takeBtn = this.scene.add.sprite(0, 0, 'shop-btn');
      this.takeBtnText.setStroke('#0A600A', 4);
      this.scene.clickShopBtn({ btn: this.takeBtn, title: this.takeBtnText }, (): void => {
        this.onBtnPickUpHandler();
      });
    } else {
      this.takeBtn = this.scene.add.sprite(0, 0, 'shop-btn-disable');
      this.takeBtnText.setStroke('#888888', 4);
    }

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
      this[`${key}Task`] = new Task(this.scene, key, { x: centerX, y: y }, this.onBtnHandler);
      this[`${key}Task`].setState(this.socialTasks[key])
      
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
    
    this.header.setY(topGeom.centerY - 25);
    this.close.setPosition(topGeom.right - 35, topGeom.top + 35);
    this.takeText1.setY(bottomGeom.centerY);
    this.diamond.setPosition(this.takeText1.getBounds().right + 8,  bottomGeom.centerY);
    this.takeText2.setPosition(this.diamond.getBounds().right + 8,  bottomGeom.centerY);
    this.takeBtn.setPosition(bottomGeom.right - this.takeBtn.displayWidth / 2 - 60, bottomGeom.centerY);
    this.takeBtnText.setPosition(this.takeBtn.x, this.takeBtn.y - 3);
  }

  private onBtnHandler(key: string) {
    if (key === 'joinGroup') {
      bridge.send('VKWebAppJoinGroup', { group_id: Number(process.env.VK_GROUP_ID) })
        .then(res => {
          if (res.result) this.scene.state.vkTask.joinGroup = res.result;
          this.joinGroupTask.setState(res.result);
        });
    } else if (key === 'addFavorites') {
      bridge.send('VKWebAppAddToFavorites')
        .then(res => {
          if (res.result) this.scene.state.vkTask.addFavorites = res.result;
          this.addFavoritesTask.setState(res.result);
        });
    } else if (key === 'subGroup') {
      bridge.send("VKWebAppAllowMessagesFromGroup", { group_id: Number(process.env.VK_GROUP_ID) })
        .then(res => {
          if (res.result) this.scene.state.vkTask.subGroup = res.result;
          this.subGroupTask.setState(res.result);
        });
    } else if (key === 'subNative') {
      bridge.send("VKWebAppAllowNotifications").then(res => {
        if (res.result) this.scene.state.vkTask.subNative = res.result;
        this.subNativeTask.setState(res.result)
      })
    }
  }
  
  private onBtnPickUpHandler(): void {
    // установить метку
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].getCurrency({ x: this.takeBtn.x, y: this.takeBtn.y }, this.award, 'diamond');
    this.scene.state.user.diamonds += this.award;
    this.scene.scene.stop();

  }
}

class Task {
  private scene: Modal;
  private key: string;
  private position: Iposition;
  private bg: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private button: Phaser.GameObjects.Sprite;
  private buttonText: Phaser.GameObjects.Text;
  private complete: Phaser.GameObjects.Sprite;
  private onBtnHandler: (key: string) => void;

  constructor(scene, key, position, onBtnHandler) {
    this.scene = scene;
    this.key = key;
    this.position = position;
    this.onBtnHandler = onBtnHandler.bind(this);
    this.create();
  }

  private create(): void {
    const textWidth: number = 200;
    this.bg = this.scene.add.sprite(this.position.x,  this.position.y, 'social-task-bg');
    this.text = this.scene.add.text(this.position.x - 180 , this.position.y, LANGS[this.key],  {
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
      this.onBtnHandler(this.key);
    });
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
