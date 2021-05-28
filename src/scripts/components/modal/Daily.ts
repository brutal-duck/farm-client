import Modal from './../../scenes/Modal/Modal';
import Hint from './../animations/Hint';
interface Iaward {
  type: number;
  count: number;
}

const AWARDS: { type: number, count: number }[] = [
  { type: 1, count: 2 },
  { type: 5, count: 1 },
  { type: 4, count: 1 },
  { type: 3, count: 1 },
  { type: 5, count: 1 },
  { type: 4, count: 1 },
  { type: 2, count: 20 }
];

export default class Daily extends Phaser.GameObjects.Sprite {
  public scene: Modal;
  private day: number;
  private geom: Phaser.Geom.Rectangle;
  private takeBtn: Phaser.GameObjects.Sprite;
  private takeText: Phaser.GameObjects.Text;

  constructor(scene: Modal) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'daily-bg');
    this.day = Number(scene.state.daily) - 1;
    this.create();
  }


  private create(): void {
    this.createWindow();
    this.createAwards();
    this.setListeners();
  }

  private createWindow(): void {
    this.scene.add.existing(this);
    this.geom = this.getBounds();
      // строим окно
    this.scene.add.text(this.geom.centerX, this.geom.centerY - 240, this.scene.state.lang.dailyAwards, {
      font: '26px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);
    this.scene.add.text(this.geom.centerX, this.geom.centerY - 190, this.scene.state.lang.dailyDescr, {
      font: '16px Shadow',
      color: '#FFE065',
      align: 'center',
      wordWrap: { width: 300 },
    }).setOrigin(0.5, 0.5);

    this.takeBtn = this.scene.add.sprite(this.geom.centerX, this.geom.centerY + 360, 'middle-button');
    this.takeText = this.scene.add.text(this.geom.centerX, this.geom.centerY + 357, this.scene.state.lang.pickUp, {
      font: '22px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);


    this.scene.openModal(this.scene.cameras.main);
  }

  private createAwards(): void {  
    const POSITIONS: Iposition[] = [
      {
        x: this.geom.centerX - 130,
        y: this.geom.centerY - 50
      },
      {
        x: this.geom.centerX,
        y: this.geom.centerY - 50
      },
      {
        x: this.geom.centerX + 130,
        y: this.geom.centerY - 50
      },
      {
        x: this.geom.centerX - 130,
        y: this.geom.centerY + 100
      },
      {
        x: this.geom.centerX,
        y: this.geom.centerY + 100
      },
      {
        x: this.geom.centerX + 130,
        y: this.geom.centerY + 100
      },
      {
        x: this.geom.centerX,
        y: this.geom.centerY + 250
      }
    ];

    for (let i: number = 1; i <= AWARDS.length; i += 1) {
      const state: string = this.scene.state.daily === i ? 'active' : this.scene.state.daily > i ? 'complete' : '';
      new Award(this.scene, AWARDS[i - 1], POSITIONS[i - 1], state, i);
    }
  }

  private setListeners(): void {
    this.scene.clickModalBtn({ btn: this.takeBtn, title: this.takeText }, (): void => {

      if (this.day > 6) this.day = 0;
      
      if (!AWARDS[this.day]) {
        this.scene.scene.stop();
        return;
      }

      if (AWARDS[this.day].type === 1) {
        this.scene.state.user.diamonds += AWARDS[this.day].count;

        this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('diamonds_get', {
          type: 'daily_award',
          count: AWARDS[this.day].count,
        });

        this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].getCurrency({ x: this.scene.cameras.main.centerX, y: this.scene.cameras.main.centerY }, AWARDS[this.day].count, 'diamond');

        const text: string = this.scene.state.lang.dailyNewbieHint0.replace('$1', String(AWARDS[this.day].count)); 
        Hint.create(this.scene.game.scene.keys[`${this.scene.state.farm}Bars`], -250, text, 2);
        this.scene.state.user.diamonds += AWARDS[this.day].count;
        this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('diamonds_get', {
          type: 'daily_award',
          count: AWARDS[this.day].count,
        });

        this.scene.game.scene.keys[`${this.scene.state.farm}Bars`].getCurrency({ x: this.scene.cameras.main.centerX, y: this.scene.cameras.main.centerY }, AWARDS[this.day].count, 'diamond');
      } else if (AWARDS[this.day].type === 3) {
        this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].feed += AWARDS[this.day].count;
        const text: string = this.scene.state.lang[`dailyHint_3_${this.scene.state.farm}`]; 
        Hint.create(this.scene.game.scene.keys[`${this.scene.state.farm}Bars`], -250, text, 2);
      } else if (AWARDS[this.day].type === 4) {
        this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].herd += AWARDS[this.day].count;
        const text: string = this.scene.state.lang[`dailyHint_4_${this.scene.state.farm}`]; 
        Hint.create(this.scene.game.scene.keys[`${this.scene.state.farm}Bars`], -250, text, 2);
      } else if (AWARDS[this.day].type === 5) {
        this.scene.state.user.boosts[this.scene.state.farm.toLowerCase()].collector4 += AWARDS[this.day].count;
        const text: string = this.scene.state.lang[`dailyHint_5_${this.scene.state.farm}`]; 
        Hint.create(this.scene.game.scene.keys[`${this.scene.state.farm}Bars`], -250, text, 2);
      }
      this.scene.state.daily = false;
      this.scene.state.user.takenReward = true;
      this.scene.scene.stop();
    });
    
  }
}

class Award implements Iaward {
  public type: number;
  public count: number;
  private state: string;
  private position: Iposition;
  private scene: Modal;
  private bg: Phaser.GameObjects.Sprite;
  private achievement: Phaser.GameObjects.Sprite;
  private award: Phaser.GameObjects.Sprite;
  private dayText: Phaser.GameObjects.Text;
  private countText: Phaser.GameObjects.Text;
  private bubble: Phaser.GameObjects.Graphics;
  private day: number;

  constructor(scene: Modal, { type, count }: Iaward, position: Iposition, state: string, day: number) {
    this.scene = scene;
    this.type = type;
    this.count = count;
    this.position = position;
    this.state = state;
    this.day = day;
    this.create();
  }

  public create(): void {
    this.bg = this.scene.add.sprite(this.position.x, this.position.y, 'award-bg')
    .setTint(0x777777)
    .setDepth(2);

    this.achievement = this.scene.add.sprite(this.position.x, this.position.y + 35, 'achievement-daily')
    .setTint(0x777777)
    .setOrigin(0.5, 0)
    .setDepth(3);

    if (this.type === 1) {
      this.award = this.scene.add.sprite(this.position.x, this.position.y, 'diamond').setTint(0x999999).setScale(0.27).setDepth(3);
    } else if (this.type === 2) {
      this.award = this.scene.add.sprite(this.position.x, this.position.y - 15, 'gift').setTint(0x999999).setDepth(3);
    } else {
      this.award = this.scene.add.sprite(this.position.x, this.position.y, `award-${this.type}`).setTint(0x999999).setDepth(3);
    }

    if (this.count > 1 && this.type !== 2) {
      this.countText = this.scene.add.text(this.position.x, this.position.y + 15, String(this.count), {
        font: '22px Shadow',
        color: '#CCCCCC'
      }).setOrigin(0.5, 0.5).setDepth(4);
      this.bubble = this.scene.add.graphics({ x: this.position.x - 33, y: this.position.y }).setDepth(4)
      .fillStyle(0xFFCC948, 0.4)
      .fillRoundedRect(0, 0, 66, 30, 5);
    }

    this.dayText = this.scene.add.text(this.position.x, this.position.y + 40, this.scene.state.lang.day + ` ${String(this.day)}`, {
      font: '22px Shadow',
      color: '#783C10'
    }).setOrigin(0.5, 0).setTint(0x777777).setDepth(5);


    this.scene.add.sprite(this.position.x, this.position.y, 'flash-daily').setDepth(1).setVisible(this.state === 'active');
    this.scene.add.sprite(this.position.x - 47, this.position.y + 42, 'completed').setScale(0.5).setDepth(4).setVisible(this.state === 'complete');

    this.setState();
  }

  private setState(): void {
    if (this.state === 'active') {
      this.bg?.setTint(0xFFFFFF);
      this.achievement?.setTint(0xFFFFFF);
      this.dayText?.setTint(0xFFFFFF);
      this.award?.setTint(0xFFFFFF);
      this.countText?.setColor('#FFFFFF');

      this.bubble?.clear();
      this.bubble?.fillStyle(0xFFCC948, 0.6);
      this.bubble?.fillRoundedRect(0, 0, 70, 30, 5);
    }
  }
}
