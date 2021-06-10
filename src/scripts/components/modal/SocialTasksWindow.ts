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
        joinGroup: false,
        subGroup: false,
        subNative: false,
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
    const topGeom: Phaser.Geom.Rectangle = this.topBg.getBounds();
    this.header = this.scene.add.text(centerX, topGeom.centerY, 'Подарки', {
      color: '#F6DDFD',
      font: '45px Shadow',
    }).setOrigin(0.5, 0);

    this.close = this.scene.add.sprite(topGeom.top, topGeom.right, 'tasks-close')
    this.createElements();
  }

  private createElements(): void {
    const centerX: number = this.scene.cameras.main.centerX;
    const centerY: number = this.scene.cameras.main.centerY;
    let taskLenght: number = -1;
    for (const key in this.socialTasks) taskLenght += 1;

    let count: number = 0;
    const startY: number = centerY - taskLenght * (50);
    const textWidth: number = 200;
    for (const key in this.socialTasks) {
      const y: number = startY + count * 100;
      const bg: Phaser.GameObjects.Sprite = this.scene.add.sprite(centerX,  y, 'social-task-bg');
      const text: Phaser.GameObjects.Text = this.scene.add.text(centerX - 180 , y, LANGS[key],  {
        font: '20px Bip',
        color: '#944000',
        wordWrap: { width: textWidth },
      }).setOrigin(0, 0.5);
      const button: Phaser.GameObjects.Sprite = this.scene.add.sprite(centerX + 120, y, 'improve-collector').setScale(0.8);
      const buttonText: Phaser.GameObjects.Text = this.scene.add.text(centerX + 120, y - 3, 'Выполнить', {
        font: '20px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4);
      
      this.scene.clickShopBtn({ btn: button, title: buttonText }, (): void => {
        this.onBtnHandler(key);
      });
      count += 1;
    }
    this.height = count * 100;
    this.setBgPosition();
  }

  private setBgPosition(): void {
    const centerY: number = this.scene.cameras.main.centerY;

    this.topBg.setY(centerY - Math.floor(this.height / 2));
    this.middleBg.setDisplaySize(526, this.height);
    this.bottomBg.setY(centerY + Math.floor(this.height / 2));
  }

  private onBtnHandler(key: string) {
    if (key === 'joinGroup') {
      bridge.send('VKWebAppJoinGroup', { group_id: Number(process.env.VK_GROUP_ID) })
        .then(res => {
          if (res.result) this.scene.state.vkTask.joinGroup = res.result;
        });
    } else if (key === 'addFavorites') {
      bridge.send('VKWebAppAddToFavorites')
        .then(res => {
          if (res.result) this.scene.state.vkTask.addFavorites = res.result;
        });
    } else if (key === 'subGroup') {
      bridge.send("VKWebAppAllowMessagesFromGroup", { group_id: Number(process.env.VK_GROUP_ID) })
        .then(res => {
          if (res.result) this.scene.state.vkTask.subGroup = res.result;
        });
    } else if (key === 'subNative') {
      bridge.send("VKWebAppAllowNotifications").then(res => {
        if (res.result) this.scene.state.vkTask.subNative = res.result;
      })
    }
  }
}
