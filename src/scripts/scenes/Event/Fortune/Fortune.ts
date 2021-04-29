import { shortNum, shortTime } from '../../../general/basic';
import { clickModalBtn, clickButton, click } from '../../../general/clicks';
import CowSprite from './../../../components/Animal/CowSprite';
import { loadingModal } from './../../../general/basic';
import Hint from './../../../components/animations/Hint';
import Firework from './../../../components/animations/Firework';
import Currency from './../../../components/animations/Currency';

const modal: string = require('../../../../assets/images/event/fortune/modal.png');
const btn: string = require('../../../../assets/images/event/fortune/btn.png');
const wheel: string = require('../../../../assets/images/event/fortune/wheel.png');
const pointer: string = require('../../../../assets/images/event/fortune/pointer.png');
const ticket: string = require('../../../../assets/images/event/fortune/ticket.png');
const jackpotBg: string = require('../../../../assets/images/event/fortune/jackpot-bg.png');
const doneChapterButton: string = require("../../../../assets/images/modal/done-chapter-button.png");




export default class Fortune extends Phaser.Scene {
  constructor() {
    super('Fortune');
  }

  public state: Istate;
  public hints: Phaser.GameObjects.Group;
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
  public moneyPullText: Phaser.GameObjects.Text;
  public whellIsScrolling: boolean = false;
  public lastestWinnerText: Phaser.GameObjects.Text;
  public currentList: IfortuneUser[] = [];
  public jackpotBg: Phaser.GameObjects.TileSprite;
  public jackpotModal: Phaser.GameObjects.Sprite;
  public jackpotBtn: Phaser.GameObjects.Sprite;
  public jackpotText: Phaser.GameObjects.Text;
  public jackpotCount: Phaser.GameObjects.Text;
  public jackpotDiamond: Phaser.GameObjects.Sprite;

  public listElements: any[] = [];

  public clickModalBtn = clickModalBtn.bind(this);
  public clickButton = clickButton.bind(this);
  public click = click.bind(this);
  public loadingModal = loadingModal.bind(this);

  public init(state: Istate): void {
    this.state = state;
  }

  public preload(): void {
    this.loadingModal();
    this.load.image('fortune-modal', modal);
    this.load.image('fortune-btn', btn);
    this.load.image('fortune-wheel', wheel);
    this.load.image('fortune-pointer', pointer);
    this.load.image('fortune-ticket', ticket);
    this.load.image('fortune-jackpot-bg', jackpotBg);
    this.load.image('done-chapter-button', doneChapterButton);

  }

  public create(): void {
    const data = {
      name: this.state.platform !== 'web' ? this.state.name : this.state.user.login,
      spending: 0,
      prize: 0,
      jackpot: false,
    }
    this.state.socket.io.emit('fortune-send', data);
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
    if (this.state.progress.event.endTime > 0) {
      this.updateElements();
    } else {
      this.scene.stop();
    }
  }

  private createElements(): void {
    this.hints = this.add.group();
    const modalSprite: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'fortune-modal').setInteractive();
    const modalGeom: Phaser.Geom.Rectangle = modalSprite.getBounds();

    this.add.text(modalGeom.centerX + 20, modalGeom.top + 30, this.state.lang.fortuneWheel, {
      font: '35px Shadow',
      color: '#edd9fd'
    }).setOrigin(0.5, 0);

    this.endTimeText = this.add.text(modalGeom.centerX + 20, modalGeom.top + 80, `${this.state.lang.fairClose} ${shortTime(this.state.progress.event.endTime, this.state.lang)}`, {
      font: '24px Shadow',
      color: '#66222c'
    }).setOrigin(0.5, 0);

    this.btn = this.add.sprite(modalGeom.centerX + 140, modalGeom.centerY - 35, 'fortune-btn');
    this.btnText1 = this.add.text(this.btn.x + 5, this.btn.y - 5, this.state.lang.buyTicket, {
      font: '20px Shadow',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5, 1);
    this.btnText2 = this.add.text(this.btnText1.getBounds().centerX + 10, this.btnText1.getBounds().bottom + 5, String(this.price), {
      font: '20px Shadow',
      color: '#ffffff',
      align: 'center'
    }).setOrigin(0.5, 0);
    this.btnImg = this.add.sprite(this.btnText2.getBounds().left, this.btnText2.getBounds().centerY, 'diamond').setScale(0.10).setOrigin(1, 0.5);

    this.moneyPullText = this.add.text(modalGeom.centerX + 140, modalGeom.centerY - 240, ' ', {
      font: '45px Shadow',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.wheel = this.add.sprite(modalGeom.centerX - 142, modalGeom.centerY - 180, 'fortune-wheel');
    this.pointer = this.add.sprite(modalGeom.centerX - 138, modalGeom.centerY - 185, 'fortune-pointer');
    this.closeBtn = this.add.sprite(modalGeom.right - 70, modalGeom.top + 40,'tasks-close')
    
    this.add.text(modalGeom.centerX + 50, modalGeom.centerY + 45, this.state.lang.latestWinners, {
      font: '24px Shadow',
      color: '#fff9ea',
      align: 'center',
      wordWrap: { width: 200 },
    }).setShadow(0, 2, '#000000', 3).setOrigin(0.5);
    
    this.lastestWinnerText = this.add.text(modalGeom.centerX + 155, modalGeom.centerY - 180, ' ', {
      font: '18px Shadow',
      color: '#ffd595',
      align: 'center',
      wordWrap: { width: 240 },
    }).setOrigin(0.5);

    this.lastestWinnerText.setDataEnabled();
    const winnerTextGeom: Phaser.Geom.Rectangle = this.lastestWinnerText.getBounds();

    this.lastestWinnerText.data.values.name = this.add.text(winnerTextGeom.centerX, winnerTextGeom.bottom, ' ', {
      font: '18px Shadow',
      color: '#f9eee1',
    }).setOrigin(0.5, 0);

    const nameTextGeom: Phaser.Geom.Rectangle = this.lastestWinnerText.data.values.name.getBounds();

    if (nameTextGeom.width > 210) {
      this.lastestWinnerText.data.values.name.setCrop(0, 0, 210, 40);
      this.lastestWinnerText.data.values.name.setOrigin(0);
      this.lastestWinnerText.data.values.name.setX(modalGeom.centerX + 50);
    }

    this.lastestWinnerText.data.values.time = this.add.text(winnerTextGeom.centerX, winnerTextGeom.bottom + 20, ' ', {
        font: '18px Shadow',
        color: '#f2ff25',
    }).setOrigin(0.5, 0);
  }

  private creaeteList(): void {
    let startY: number = this.cameras.main.centerY + 120;
    this.currentList?.reverse();
    for (let i: number = 0; i < this.currentList.length; i++) {
      const name: Phaser.GameObjects.Text = this.add.text(180, startY, this.currentList[i].name, {
        font: '21px Bip',
        color: '#793D0A',
        align: 'left'
      }).setCrop(0, 0, 210, 30).setOrigin(0, 0.5);
      const count: Phaser.GameObjects.Text = this.add.text(440, startY, shortNum(this.currentList[i].prize), {
        font: '21px Bip',
        color: '#793D0A',
        align: 'left'
      }).setOrigin(0, 0.5);
      const diamond: Phaser.GameObjects.Sprite = this.add.sprite(425, startY, 'diamond').setScale(0.11).setAngle(-10);
      const time: Phaser.GameObjects.Text = this.add.text(500, startY, this.currentList[i].time > 0 ? `${shortTime(this.currentList[i].time, this.state.lang)}` : this.state.lang.now, {
        font: '21px Bip',
        color: '#793D0A',
        align: 'left'
      }).setOrigin(0, 0.5);
      
      startY += 40

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
    this.whellIsScrolling = false;
  }

  private updateElements(): void {
    if (this.whellIsScrolling) return;

    if (this.state.fortuneData?.pull) {
      if (
        this.state.user.boosts.fortune > 0 && 
        (this.btnText1.text !== this.state.lang.scroll || 
        this.btnText2.text !== String(this.state.user.boosts.fortune)) && 
        !this.whellIsScrolling
      ) {
        this.btnText1.setText(this.state.lang.scroll);
        this.btnText2.setText(String(this.state.user.boosts.fortune));
        this.btnImg.setTexture('fortune-ticket')
          .setPosition(this.btnText2.getBounds().left, this.btnText2.getBounds().centerY)
          .setScale(0.4);
      } else if (
        this.state.user.boosts.fortune <= 0 && 
        (this.btnText1.text !== this.state.lang.buyTicket ||
        this.btnText2.text !== String(this.price)) && 
        !this.whellIsScrolling
      ) {
        this.btnText1.setText(this.state.lang.buyTicket);
        this.btnText2.setText(String(this.price));
        this.btnImg.setTexture('diamond')
          .setPosition(this.btnText2.getBounds().left, this.btnText2.getBounds().centerY)
          .setScale(0.10);
      }
      if (this.moneyPullText.text !== String(this.state.fortuneData.pull)) {
        this.moneyPullText.setText(String(this.state.fortuneData.pull));
      }
  
      const text1: string = this.state.lang.lastTimePrize.replace('$1', this.state.fortuneData?.lastWinner?.prize);
  
      if (this.lastestWinnerText.text !== text1 || 
        this.lastestWinnerText.data.values.name.text !== this.state.fortuneData.lastWinner?.name ||
        this.lastestWinnerText.data.values.time.text !== `${shortTime(this.state.fortuneData.lastWinner?.time, this.state.lang)} ${this.state.lang.back}`) {
        if (this.state.fortuneData.lastWinner) {
          this.lastestWinnerText.setText(text1).setVisible(true);
          this.lastestWinnerText.data.values.name.setText(this.state.fortuneData.lastWinner?.name).setVisible(true);
          this.lastestWinnerText.data.values.name.setY(this.lastestWinnerText.getBounds().bottom);
      
          const nameTextGeom: Phaser.Geom.Rectangle = this.lastestWinnerText.data.values.name.getBounds();
          if (nameTextGeom.width > 210) {
            this.lastestWinnerText.data.values.name.setCrop(0, 0, 210, 40);
            this.lastestWinnerText.data.values.name.setOrigin(0);
            this.lastestWinnerText.data.values.name.setX(this.cameras.main.centerX + 43);
          }
      
          this.lastestWinnerText.data.values.time.setText(this.state.fortuneData.lastWinner?.time > 0 ? `${shortTime(this.state.fortuneData.lastWinner?.time, this.state.lang)} ${this.state.lang.back}` : this.state.lang.now).setVisible(true);
          this.lastestWinnerText.data.values.time.setY(nameTextGeom.bottom);
        } else {
          this.lastestWinnerText.setVisible(false);
          this.lastestWinnerText.data.values.name.setVisible(false);
          this.lastestWinnerText.data.values.time.setVisible(false);
        }
      }

      if (JSON.stringify(this.state.fortuneData.recentWinners) !== JSON.stringify(this.currentList)) {
        this.currentList = this.state.fortuneData.recentWinners;
        this.destoryListElemets();
        this.creaeteList();
      }
    }

    const text: string = `${this.state.lang.fairClose} ${shortTime(this.state.progress.event.endTime, this.state.lang)}`;
    if (this.endTimeText.text !== text) {
      this.endTimeText.setText(text);
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
    this.removeInteractiveElements();
    this.getRandomIndexPrize();
    this.setUpdatedButton();
    this.whellIsScrolling = true;
    // const type: string = this.prizeId === 1 ? 'джекпот' :
    // this.prizeId === 2 ? 'регулярный приз, 5% от фонда' :
    // this.prizeId === 3 ? '10 минут монет' : 
    // this.prizeId === 4 ? '15 минут монет' :
    // this.prizeId === 5 ? '30 минут монет' :
    // this.prizeId === 6 ? 'переполох' :
    // this.prizeId === 7 ? 'комбикорм' : 
    // this.prizeId === 8 ? 'билеты' : '';

    // console.log(type);
    if (this.state.user.boosts.fortune > 0) {
      this.startScrollWheel();
    } else {
      if (this.state.user.diamonds >= this.price) {
        this.startScrollWheel();
      } else {
        console.log('net denyag')
      }
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
    // const dAngle: number = -25;

    if (dAngle > 10 && (this.prizeId === 3 || this.prizeId === 4 || this.prizeId === 5)) {
      let anim = this.tweens.add({
        targets: this.wheel,
        onUpdate: (): void => {
          this.removeInteractiveElements();
        },
        onUpdateScope: this,
        duration: 3500,
        angle: { from: 0, to: -2160 },
        ease: 'Power3',
      });
      this.tweens.add({
        delay: 2500,
        onStart:(): void => {
          anim.stop();
          anim.remove();
        },
        targets: this.wheel,
        ease: 'Power2',
        duration: 2000,
        angle: endAngle + dAngle,
        onUpdate: (): void => {
          this.removeInteractiveElements();
        },
        onUpdateScope: this,
        onComplete: (): void => {
          this.setAngle(dAngle);
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
        duration: 3500,
        angle: { from: 0, to: -2093 },
        ease: 'Power3',
        onComplete: () => {
          this.setAngle(dAngle);
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
        duration: 3500,
        angle: { from: 0, to: -2160 + endAngle + dAngle},
        ease: 'Power3',
        onComplete: () => {
          this.setAngle(dAngle);
        },
        onCompleteScope: this,
      });
    }
  }

  private setUpdatedButton(): void {
    if (this.state.user.boosts.fortune > 1) {
      this.btnText2.setText(String(this.state.user.boosts.fortune - 1));
    } else if (this.state.user.boosts.fortune === 1) {
      this.btnText1.setText(this.state.lang.buyTicket);
      this.btnText2.setText(String(this.price));
      this.btnImg.setTexture('diamond')
        .setPosition(this.btnText2.getBounds().left, this.btnText2.getBounds().centerY)
        .setScale(0.1);
    }
  }

  private setAngle(dAngle: number): void {
    const percent: number = Math.abs(Math.round(dAngle / 22 * 100));
    const duration: number = 200 + 200 * percent / 100;
    
    this.tweens.add({
      duration: duration,
      targets: this.wheel,
      angle: `-=${dAngle}`, 
      onComplete: (): void => {
        this.time.addEvent({
          delay: 200,
          callback: () => {
            this.getPrize();
            this.setInteractiveElements();
          }
        })
      }   
    });
  }

  private sendSocket(prize: number = 0): void {
    let data: any = {
      name: this.state.platform !== 'web' ? this.state.name : this.state.user.login,
      spending: 0,
      prize: 0,
      jackpot: false,
    };
    if (this.state.user.boosts.fortune >= 1) {
      if (this.prizeId === 1) {
        data = {
          name: this.state.platform !== 'web' ? this.state.name : this.state.user.login,
          spending: 0,
          prize: prize,
          jackpot: true,
        }
      } else if ( this.prizeId === 2) {
        data = {
          name: this.state.platform !== 'web' ? this.state.name : this.state.user.login,
          spending: 0,
          prize: prize,
          jackpot: false,
        }
      }
    } else {
      if (this.prizeId === 1) {
        data = {
          name: this.state.platform !== 'web' ? this.state.name : this.state.user.login,
          spending: this.price,
          prize: prize,
          jackpot: true,
        }
      } else if ( this.prizeId === 2) {
        data = {
          name: this.state.platform !== 'web' ? this.state.name : this.state.user.login,
          spending: this.price,
          prize: prize,
          jackpot: false,
        }
      } else if ( this.prizeId >= 3 && this.prizeId <= 8) {
        data = {
          name: this.state.platform !== 'web' ? this.state.name : this.state.user.login,
          spending: this.price,
          prize: 0,
          jackpot: false,
        }
      }
    }
    this.state.socket.io.emit('fortune-send', data);
  }

  private getPrize(): void {
    let prize: number = 0;
    if (this.prizeId === 1) {
      prize = Math.round(70 * this.state.fortuneData.pull / 100);
    } else {
      prize = Math.round(5 * this.state.fortuneData.pull / 100);
    }
    this.sendSocket(prize);

    this.state.progress.event.eventPoints += 1;

    if (this.state.user.boosts.fortune > 0) {
      this.state.user.boosts.fortune -= 1;
    } else {
      this.state.user.diamonds -= this.price;

      this.game.scene.keys[this.state.farm].logAmplitudeEvent('diamonds_spent', {
        type: 'fortune',
        count: this.price,
        countFortune: this.state.progress.event.eventPoints,
      });
    }

    switch (this.prizeId) {
      case 1:
        // джекпот (70%)
        this.getJackpot(prize);
        break;
      case 2:
        // 5 процентов от всей суммы
        this.getFreeDiamonds(prize);
        const text: string = this.state.lang.fortuneHint_2.replace('$1', String(prize));
        Hint.create(this, -250, text, 3);
        this.getCurrency(this.wheel, prize, 'diamond');

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

  private getFreeDiamonds(prize: number): void {
    this.state.user.diamonds += prize;

    this.game.scene.keys[this.state.farm].logAmplitudeEvent('diamonds_get', {
      type: 'fortune',
      count: prize,
    })
  }

  private getJackpot(prize: number): void {
    this.getFreeDiamonds(prize);
    this.sendChatMassage(prize);
    this.showJackpotWindow(prize);
  }

  private sendChatMassage(prize: number): void {
    const KEY: string = 
    `6307b55e185c4058b9c12d9d076ddae6
    26cd32b7a7d1d6096528ae647c235d6f
    adde749a4a6c3186a429f98b4c7abe18
    6ec1fb0bf90ee695df541d93ce8ac263
    12a9cd2785f399c0938e15d19b2ce7ba
    47c922da1f077a8508b6fccf572d08c8
    59a38e7c495a71393839f19a2a6dd372
    f7f581c3cb90712919777fc0b3ff232a
    76f8f2b2a7f03cf307f788961513e8c9
    04961f62df30faa6a4ffbc16cfe059b4`;

    this.state.socket.io.emit('send', {
      id: this.state.user.id,
      hash: this.state.user.hash,
      login: this.state.platform !== 'web' ? this.state.name : this.state.user.login,
      text: `${KEY}_${prize}`,
      type: 1,
      status: this.state.user.status
    });
  }

  private showJackpotWindow(prize: number): void {
    this.time.addEvent({
      delay: 500,
      callback: (): void => {

        const position: any = {
          x: this.cameras.main.centerX + Phaser.Math.RND.pick(Phaser.Math.RND.signs) * Phaser.Math.Between(100, 180),
          y: this.cameras.main.centerY + Phaser.Math.RND.pick(Phaser.Math.RND.signs) * Phaser.Math.Between(100, 180),
        }
        Firework.create(this, position, 1);
      }, 
      repeat: -1
    });
    const bg: Phaser.GameObjects.TileSprite = this.add.tileSprite(0, 0, this.cameras.main.width, this.cameras.main.height, 'white-pixel')
      .setInteractive()
      .setOrigin(0)
      .setDepth(1)
      .setTint(0x000000)
      .setAlpha(0.5);

    const modal: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'fortune-jackpot-bg')
      .setDepth(1);

    const text: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 7, this.cameras.main.centerY + 10, this.state.lang.jackpotCongratulations, {
      font: '30px Shadow',
      color: '#793D0A',
      align: 'center',
      wordWrap: { width: 250 },
    }).setDepth(1)
      .setOrigin(0.5, 0);
    const textGeom: Phaser.Geom.Rectangle = text.getBounds();
    const count: Phaser.GameObjects.Text = this.add.text(textGeom.centerX, textGeom.bottom + 5, String(prize), {
      font: '32px Shadow',
      color: '#FFFFFF',
      align: 'center',
    }).setDepth(1)
      .setOrigin(0.5, 0)
      .setShadow(3, 5, '#3F3F3F', 5);
    const countGeom: Phaser.Geom.Rectangle = count.getBounds()

    const diamond: Phaser.GameObjects.Sprite = this.add.sprite(countGeom.left - 5, countGeom.centerY, 'diamond')
      .setOrigin(1, 0.5)
      .setScale(0.1)
      .setDepth(1);

    const button: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX - 7, this.cameras.main.centerY + 180, 'done-chapter-button').setDepth(1);
    const buttonGeom: Phaser.Geom.Rectangle = button.getBounds();

    const btnText: Phaser.GameObjects.Text = this.add.text(buttonGeom.centerX, buttonGeom.centerY - 7, this.state.lang.pickUp, {
      font: '32px Shadow',
      fill: '#FFD2D2',
      align: 'center'
    }).setOrigin(0.5, 0.5).setStroke('#2C5D0C', 5).setDepth(1);

    const btn: any = {
      btn: button,
      title: btnText,
    }

    this.clickModalBtn(btn, (): void => {
      bg?.destroy();
      modal?.destroy();
      text?.destroy();
      count?.destroy();
      diamond?.destroy();
      button?.destroy();
      btnText?.destroy();
      this.getCurrency({ x: this.cameras.main.centerX, y: this.cameras.main.centerY }, prize, 'diamond');
    });
    this.click(bg, (): void => {
      bg?.destroy();
      modal?.destroy();
      text?.destroy();
      count?.destroy();
      diamond?.destroy();
      button?.destroy();
      btnText?.destroy();
      this.getCurrency({ x: this.cameras.main.centerX, y: this.cameras.main.centerY }, prize, 'diamond');
    });
  }

  private getCurrency(position: Iposition, counter: number = 1, texture: string): void {

    if (counter > 5) counter = 5;
  
    let time: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
      counter--;
      const pos: Iposition = {
        x: Phaser.Math.Between(position.x - 30, position.x + 30),
        y: Phaser.Math.Between(position.y - this.game.scene.keys[this.state.farm].scrolling.scrollY - 30, position.y - this.game.scene.keys[this.state.farm].scrolling.scrollY + 30),
      }
      let target = { x: 495, y: 30 };
      if (texture !== 'diamond') {
        target = { x: 495, y: 120}
      }
      Currency.create(this, pos, target, texture, 400);
      if (counter <= 0) time.remove(false);
    }, callbackScope: this, loop: true });
  }

  private getFreeTickets(): void {
    const random: number = Phaser.Math.Between(1, 100)
    const count: number = random >= 1 && random < 10 ? 3 :
    random >= 10 && random < 30 ? 2 : 1;
    this.state.user.boosts.fortune += count;
    const text: string = this.state.lang.fortuneHint_6.replace('$1', String(count));
    Hint.create(this, -250, text, 3);
  }

  private getFreeFeedBoost(): void {
    if (this.state.progress.chicken.open) {
      if (Phaser.Math.Between(1, 2) === 1) {
        this.state.user.boosts.sheep.feed += 1;
        console.log('для овец')
        Hint.create(this, -250, this.state.lang.fortuneHint_4_Sheep, 3);
      } else {
        this.state.user.boosts.chicken.feed += 1;
        Hint.create(this, -250, this.state.lang.fortuneHint_4_Chicken, 3);
        console.log('для кур')
      }
    } else {
      this.state.user.boosts.sheep.feed += 1;
      console.log('для овец')
      Hint.create(this, -250, this.state.lang.fortuneHint_4_Sheep, 3);
    }
  }

  private getFreeHerdBoost(): void {
    if (this.state.progress.chicken.open) {
      if (Phaser.Math.Between(1, 2) === 1) {
        this.state.user.boosts.sheep.herd += 1;
        Hint.create(this, -250, this.state.lang.fortuneHint_5_Sheep, 3);
        console.log('для овец')
      } else {
        this.state.user.boosts.chicken.herd += 1;
        Hint.create(this, -250, this.state.lang.fortuneHint_5_Chicken, 3);
        console.log('для кур')
      }
    } else {
      this.state.user.boosts.sheep.herd += 1;
      Hint.create(this, -250, this.state.lang.fortuneHint_5_Sheep, 3);
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
      if (income > 0) {
        this.state.userSheep.money += (income * time);
      } else this.state.userSheep.money += 1000;
    } else if (this.state.farm === 'Chicken') {
      this.game.scene.keys['Chicken'].chicken.children.iterate((child: any) => {
        if (child.type !== 0) {
          income += this.state.chickenSettings.chickenSettings.find((data: any) => data.breed === child.type).eggPrice / 10;
        }
      });
      if (income > 0) {
        this.state.userChicken.money += (income * time);
      } else this.state.userChicken.money += 1000;
    } else if (this.state.farm === 'Cow') {
      this.game.scene.keys['Cow'].animalGroup.children.iterate((child: CowSprite) => {
        if (child.breed !== 0) {
          income += child.settings.maxMilkVolume / 60 * 0.2;
        }
      });
      if (income > 0) {
        this.state.userCow.money += (income * time);
      } else {
        this.state.userCow.money += 1000;
      }
    }
    const text: string = income > 0 ? this.state.lang.fortuneHint_3.replace('$1', shortNum(income * time)) : this.state.lang.fortuneHint_3.replace('$1', '1000');

    Hint.create(this, -250, text, 3);
  }

  private getRandomIndexPrize(): void {
    // const pull: number[] = [ 26, 500, 3445, 2584, 1723, 861, 861, 500 ];
    const pull: number[] = [ 26, 400, 1579, 1579, 1579, 1579, 1579, 1579 ];

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
