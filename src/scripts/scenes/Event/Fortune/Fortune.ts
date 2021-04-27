import { shortTime } from '../../../general/basic';
import { clickModalBtn, clickButton } from '../../../general/clicks';
import CowSprite from './../../../components/Animal/CowSprite';

const modal: string = require('../../../../assets/images/event/fortune/modal.png');
const btn: string = require('../../../../assets/images/event/fortune/btn.png');
const wheel: string = require('../../../../assets/images/event/fortune/wheel.png');
const pointer: string = require('../../../../assets/images/event/fortune/pointer.png');

interface IfortuneUser {
  name: string;
  count: string;
  time: number;
}

export default class Fortune extends Phaser.Scene {
  constructor() {
    super('Fortune');
  }

  public state: Istate;
  public endTimeText: Phaser.GameObjects.Text;
  public btn: Phaser.GameObjects.Sprite;
  public btnText1: Phaser.GameObjects.Text;
  public btnText2: Phaser.GameObjects.Text;
  public btnImg: Phaser.GameObjects.Sprite;
  public wheel: Phaser.GameObjects.Sprite;
  public pointer: Phaser.GameObjects.Sprite;
  public prizeId: number;
  public readonly price: number = 10;
  public closeBtn: Phaser.GameObjects.Sprite;
  public moneyPull: number = 1000;
  public moneyPullText: Phaser.GameObjects.Text;
  public userList: IfortuneUser[] = [
    {
      name: 'александр',
      count: '100',
      time: 1010
    },
    {
      name: 'дмитрий-владимирович крузенштерн',
      count: '1000',
      time: 2000
    },
    {
      name: 'александр',
      count: '1200',
      time: 3000
    },
    {
      name: 'але2213123ксандр',
      count: '100',
      time: 4000
    },
    {
      name: 'алексвфыв а   ндр',
      count: '100',
      time: 5000
    },{
      name: 'алексфывыфвфы андр',
      count: '1050',
      time: 6000
    },
    {
      name: 'александр',
      count: '100',
      time: 7000
    },
    {
      name: 'Не александр',
      count: '50',
      time: 8000
    },
    {
      name: 'вфывфывфывфыв',
      count: '100',
      time: 9000
    },
    {
      name: 'алексаячсячсячсндр',
      count: '100',
      time: 10000
    }
  ];

  public listElements: any[] = [];

  public clickModalBtn = clickModalBtn.bind(this);
  public clickButton = clickButton.bind(this);

  public init(state: Istate): void {
    this.state = state;
  }

  public preload(): void {
    this.load.image('fortune-modal', modal);
    this.load.image('fortune-btn', btn);
    this.load.image('fortune-wheel', wheel);
    this.load.image('fortune-pointer', pointer);
  }

  public create(): void {
    this.state.user.boosts.fortune = 0;
    console.log('Fortune Create')
    this.add.tileSprite(0, 0,
      Number(this.game.config.width),
      Number(this.game.config.height),
      'modal'
    ).setOrigin(0).setInteractive();
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');
    this.createElements();
    this.creaeteList();
    this.setListeners();
  }

  public update(): void {
    this.updateElements();
  }

  private createElements(): void {
    const modalSprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'fortune-modal').setInteractive();
    const modalGeom: Phaser.Geom.Rectangle = modalSprite.getBounds();
    this.add.text(modalGeom.centerX, modalGeom.top + 30, 'Колесо фортуны', {
      font: '24px Shadow',
      color: '#ffffff'
    }).setOrigin(0.5, 0);
    this.endTimeText = this.add.text(modalGeom.centerX, modalGeom.top + 80, `Ярмарка закроется через ${shortTime(this.state.progress.event.endTime, this.state.lang)}`, {
      font: '24px Shadow',
      color: '#ffffff'
    }).setOrigin(0.5, 0);

    this.btn = this.add.sprite(modalGeom.centerX + 140, modalGeom.centerY - 50, 'fortune-btn');
    this.btnText1 = this.add.text(this.btn.x, this.btn.y - 5, 'купить билетик', {
      font: '16px Shadow',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5, 1);
    this.btnText2 = this.add.text(this.btnText1.getBounds().centerX, this.btnText1.getBounds().bottom + 5, String(this.price), {
      font: '16px Shadow',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5, 0);
    this.btnImg = this.add.sprite(this.btnText2.getBounds().right, this.btnText2.getBounds().centerY, 'diamond').setScale(0.10).setOrigin(0, 0.5);

    this.add.text(modalGeom.centerX + 120, modalGeom.centerY - 320, 'Главный приз', {
      font: '32px Shadow',
      color: '#ffffff',
      align: 'center',
    }).setOrigin(0.5);

    this.moneyPullText = this.add.text(modalGeom.centerX + 120, modalGeom.centerY - 250, String(this.moneyPull), {
      font: '45px Shadow',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.wheel = this.add.sprite(modalGeom.centerX - 145, modalGeom.centerY - 185, 'fortune-wheel');
    this.pointer = this.add.sprite(modalGeom.centerX - 145, modalGeom.centerY - 190, 'fortune-pointer');
    this.closeBtn = this.add.sprite(modalGeom.right - 70, modalGeom.top + 40,'tasks-close')
    
    this.add.text(modalGeom.centerX + 30, modalGeom.centerY + 45, 'Последние победители', {
      font: '24px Shadow',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: 200 },
    }).setShadow(0, 2, '#000000', 3).setOrigin(0.5);
  }

  private creaeteList(): void {
    let startY: number = this.cameras.main.centerY + 120;
    for (let i: number = 0; i < this.userList.length; i++) {
      const name: Phaser.GameObjects.Text = this.add.text(160, startY, this.userList[i].name, {
        font: '21px Bip',
        color: '#793D0A',
        align: 'left'
      }).setCrop(0, 0, 220, 30).setOrigin(0, 0.5);
      const count: Phaser.GameObjects.Text = this.add.text(420, startY, this.userList[i].count, {
        font: '21px Bip',
        color: '#793D0A',
        align: 'left'
      }).setOrigin(0, 0.5);
      const diamond: Phaser.GameObjects.Sprite = this.add.sprite(405, startY, 'diamond').setScale(0.11).setAngle(-10);
      const time: Phaser.GameObjects.Text = this.add.text(500, startY, shortTime(this.userList[i].time, this.state.lang), {
        font: '21px Bip',
        color: '#793D0A',
        align: 'left'
      }).setOrigin(0, 0.5);
      
      startY += 30

      this.listElements.push({
        name,
        count,
        diamond,
        time
      });
    }
  }

  private destoryListElemets(): void {
    if (this.listElements.length > 0) {
      this.listElements.forEach(el => {
        el?.name?.destroy();
        el?.count?.destroy();
        el?.diamond?.destroy();
        el?.time?.destroy();
      });
      this.listElements = [];
    }
  }

  private removeInteractiveElements(): void {
    this.closeBtn.removeInteractive();
    this.btn.removeInteractive();
    this.closeBtn.setTint(0xC0C0C0);
    this.btn.setTint(0xC0C0C0);
  }

  private setInteractiveElements(): void {
    this.closeBtn.setInteractive();
    this.btn.setInteractive();
    this.closeBtn.setTint(0xffffff);
    this.btn.setTint(0xffffff);
  }

  private updateElements(): void {
    if (this.state.user.boosts.fortune > 0 && this.btnText2.text !== `Остался ${this.state.user.boosts.fortune}`) {
      this.btnText1.setText('Играть');
      this.btnText2.setText(`Остался ${this.state.user.boosts.fortune}`);
      this.btnImg.setTexture('sheepCoin').setPosition(this.btnText2.getBounds().right, this.btnText2.getBounds().centerY);
    } else if (this.state.user.boosts.fortune <= 0 && this.btnText2.text !== String(this.price)) {
      this.btnText1.setText('Купить билетик');
      this.btnText2.setText(String(this.price));
      this.btnImg.setTexture('diamond').setPosition(this.btnText2.getBounds().right, this.btnText2.getBounds().centerY);
    }

    if (this.moneyPullText.text !== String(this.moneyPull)) {
      this.moneyPullText.setText(String(this.moneyPull));
    }
  }

  private setListeners(): void {
    const btn: any = {
      btn: this.btn,
      title: this.btnText1,
      text1: this.btnText2,
      img1: this.btnImg
    }
    this.clickModalBtn(btn, () => this.handlerStartBtn());

    this.clickButton(this.closeBtn, () => {
      this.scene.stop();
    })
  }

  private handlerStartBtn(): void {
    this.getRandomIndexPrize();

    const type: string = this.prizeId === 1 ? 'джекпот' :
    this.prizeId === 2 ? 'регулярный приз, 5% от фонда' :
    this.prizeId === 3 ? '10 минут монет' : 
    this.prizeId === 4 ? '15 минут монет' :
    this.prizeId === 5 ? '30 минут монет' :
    this.prizeId === 6 ? 'переполох' :
    this.prizeId === 7 ? 'комбикорм' : 
    this.prizeId === 8 ? 'билеты' : '';

    console.log(type);
    if (this.state.user.boosts.fortune > 0) {
      this.startScrollWheel();
    } else {
      this.startScrollWheel();
    }
  }

  private startScrollWheel(): void {
    const endAngle: number = this.prizeId === 1 ? -330 :
    this.prizeId === 2 ? -150 :
    this.prizeId === 3 || this.prizeId === 4 || this.prizeId === 5 ? -30 :
    this.prizeId === 6 ? -210 :
    this.prizeId === 7 ? -90 :
    this.prizeId === 8 ? -270 : 0;

    const dAngle: number = Phaser.Math.Between(1, 22) * Phaser.Math.RND.pick(Phaser.Math.RND.signs);

    if (dAngle > 10 && (this.prizeId === 3 || this.prizeId === 4 || this.prizeId === 5)) {
      let anim = this.tweens.add({
        targets: this.wheel,
        onUpdate: (): void => {
          this.removeInteractiveElements();
        },
        onUpdateScope: this,
        duration: 2500,
        angle: { from: 0, to: -1430 },
        ease: 'Power1',
      });
      this.tweens.add({
        delay: 2100,
        onStart:(): void => {
          anim.stop();
          anim.remove();
        },
        targets: this.wheel,
        ease: 'Power2',
        duration: 900,
        angle: endAngle + dAngle,
        onUpdate: (): void => {
          this.removeInteractiveElements();
        },
        onUpdateScope: this,
        onComplete: (): void => {
          this.setAngle(dAngle);
          this.setInteractiveElements();
          this.getPrize();
        },
        onCompleteScope: this,
      })
    } else if (dAngle < -10 && this.prizeId === 8) {
      this.tweens.add({
        targets: this.wheel,
        onUpdate: (): void => {
          this.removeInteractiveElements();
        },
        onUpdateScope: this,
        duration: 2500,
        angle: { from: 0, to: -1370 },
        ease: 'Power1',
        onComplete: () => {
          this.setAngle(dAngle);
          this.setInteractiveElements();
          this.getPrize();
        },
        onCompleteScope: this,
      });
    } else {
      this.tweens.add({
        targets: this.wheel,
        onUpdate: (): void => {
          this.removeInteractiveElements();
        },
        onUpdateScope: this,
        duration: 2500,
        angle: { from: 0, to: -1440 + endAngle + dAngle},
        ease: 'Power1',
        onComplete: () => {
          this.setAngle(dAngle);
          this.setInteractiveElements();
          this.getPrize();
        },
        onCompleteScope: this,
      });
    }
  }

  private setAngle(dAngle: number): void {
    const percent: number = Math.abs(Math.round(dAngle / 22 * 100));
    const duration: number = 200 + 200 * percent / 100;

    this.tweens.add({
      duration: duration,
      targets: this.wheel,
      angle: `-=${dAngle}`,      
    });
  }
  private getPrize(): void {
    if (this.state.user.boosts.fortune > 0) {
      this.state.user.boosts.fortune -= 1;
    } else {
      this.state.user.diamonds -= this.price;
      this.moneyPull += this.price;
    }
    switch (this.prizeId) {
      case 1:
        // джекпот (70%)
        this.getJackpot();
        break;
      case 2:
        // 5 процентов от всей суммы
        this.getFreeDiamonds(5);
        break;
      case 3:
        // 10 минут монеток
        this.getFreeCoin(600);
        break;
      case 4:
        // 15 минут монеток
        this.getFreeCoin(900);
        break;
      case 5:
        // 30 минут монеток
        this.getFreeCoin(1800);
        break;
      case 6:
        // переполох
        this.getFreeHerdBoost();
        break;
      case 7:
        // комбикорм
        this.getFreeFeedBoost();
        break;
      case 8:
        // билеты
        this.getFreeTickets();
        break;
      default: 
        break;
    }
  }

  private getFreeDiamonds(percent: number): void {
    this.moneyPull -= Math.round(percent * this.moneyPull / 100);
    this.state.user.diamonds += Math.round(percent * this.moneyPull / 100);
  }

  private getJackpot(): void {
    this.getFreeDiamonds(70);
    // ОТПРАВИТь что ты крут
  }

  private getFreeTickets(): void {
    this.state.user.boosts.fortune += 10;
  }

  private getFreeFeedBoost(): void {
    if (this.state.progress.chicken.open) {
      if (Phaser.Math.Between(1, 2) === 1) {
        this.state.user.boosts.sheep.feed += 1;
        console.log('для овец')
      } else {
        this.state.user.boosts.chicken.feed += 1;
        console.log('для кур')
      }
    } else {
      this.state.user.boosts.sheep.feed += 1;
      console.log('для овец')
    }
  }

  private getFreeHerdBoost(): void {
    if (this.state.progress.chicken.open) {
      if (Phaser.Math.Between(1, 2) === 1) {
        this.state.user.boosts.sheep.herd += 1;
        console.log('для овец')
      } else {
        this.state.user.boosts.chicken.herd += 1;
        console.log('для кур')
      }
    } else {
      this.state.user.boosts.sheep.herd += 1;
      console.log('для овец')
    }
  }

  private getFreeCoin(time: number): void {
    let income: number = 0;
    
    if (this.state.farm === 'Sheep') {
      this.game.scene.keys['Sheep'].sheep.children.iterate((child: any) => {
        if (child.type !== 0) {
          income += this.state.sheepSettings.sheepSettings.find((data: any) => data.breed === child.type).long_wool / 10;
        }
      });
      this.state.userSheep.money += (income * time);
    } else if (this.state.farm === 'Chicken') {
      this.game.scene.keys['Chicken'].chicken.children.iterate((child: any) => {
        if (child.type !== 0) {
          income += this.state.chickenSettings.chickenSettings.find((data: any) => data.breed === child.type).eggPrice / 10;
        }
      });
      this.state.userChicken.money += (income * time);
    } else if (this.state.farm === 'Cow') {
      this.game.scene.keys['Cow'].animalGroup.children.iterate((child: CowSprite) => {
        if (child.breed !== 0) {
          income += child.settings.maxMilkVolume / 60 * 0.2;
        }
      });
      this.state.userCow.money += (income * time);
    }
  }

  private getRandomIndexPrize(): void {
    const pull: number[] = [26, 500, 3445, 2584, 1723, 861, 861, 500];

    const totalCounter: number = pull.reduce((prev, current) => prev += current);
    const arrRange: {
      id: number,
      bottom: number,
      top: number
    }[] = [];

    let current: number = 0;
    let previos: number = 0;
    for (let i: number = 0; i < pull.length; i += 1) {
      if (pull[i] !== 0) {
        current = pull[i] + previos;
        arrRange.push({
          id: i + 1, 
          bottom: previos, 
          top: current 
        })
        previos = current;
      }
    }

    const randomIndex: number = Phaser.Math.Between(1, totalCounter);

    for (let i: number = 0; i < arrRange.length; i += 1) {
      if (arrRange[i].bottom < randomIndex && arrRange[i].top >= randomIndex) {
        this.prizeId = arrRange[i].id;
      }
    }
  }
};
