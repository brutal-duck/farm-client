import axios from "axios";
import Modal from "../../scenes/Modal/Modal";
import MoneyAnimation from "../animations/MoneyAnimation";

export default class EventEndWindow {
  public scene: Modal;
  public line: Phaser.GameObjects.Text;
  public playerPlaceAndName: Phaser.GameObjects.Text;
  public playerScore: Phaser.GameObjects.Text;
  public eventRatingsNames: Phaser.GameObjects.Text[];
  public eventRatingsScores: Phaser.GameObjects.Text[];


  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {

    this.scene.game.scene.keys[this.scene.state.farm].getEventRaiting();
    let height: number = 390;

    this.eventRatingsNames = [];
    this.eventRatingsScores = [];
    let priceElements: modalElementType[] = [];
    let placeAndName: Phaser.GameObjects.Text;
    let score: Phaser.GameObjects.Text;
    let placeAndNameX: number = this.scene.cameras.main.centerX - 206;
    let placeAndNameY: number = this.scene.cameras.main.centerY + 35;
    let padding: number = 24;

    // Спрайты
    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'raiting-bg-after');
    let rulesBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 130, this.scene.cameras.main.centerY - 292, 'rating-rules-btn').setInteractive();
    let priceBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 126, this.scene.cameras.main.centerY - 292, 'rating-price-btn').setInteractive();

    // Заголовок
    this.scene.add.text(this.scene.cameras.main.centerX + 52, this.scene.cameras.main.centerY - 440, this.scene.state.lang.unicornField, {
      font: '40px Shadow',
      color: '#FFF7E6',
      align: 'center',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 2);

    // 'Условия'
    let rules: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 86, this.scene.cameras.main.centerY - 307, this.scene.state.lang.eventRules, {
      font: '32px Bip',
      color: '#FFF7E6',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

    // 'Призы'
    let price: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 164, this.scene.cameras.main.centerY - 307, this.scene.state.lang.eventPrice, {
      font: '32px Bip',
      color: '#FFF7E6',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

    // Текст условия
    let rulesText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 170, this.scene.state.lang.eventRulesAfter, {
      font: '23px Bip',
      color: '#793D0A',
      align: 'center',
      wordWrap: { width: 380 }
    }).setOrigin(0.5, 0.5).setDepth(2).setLineSpacing(0.2);

    let rulesTextStatus: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX, rulesText.getBounds().bottom + 15, this.scene.state.lang.eventRulesAfterStatus, {
      font: '23px Bip',
      color: '#793D0A',
      align: 'center',
      wordWrap: { width: 380 },
    }).setOrigin(0.5, 0.5).setDepth(2);

    let status: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX, rulesTextStatus.getBounds().bottom + 17, this.scene.state.lang.eventProfileName , {
      font: '24px Bip',
      color: '#459D1A',
      align: 'left',
      wordWrap: { width: 310 }
    }).setOrigin(0.5, 0.5).setDepth(2);
    
    let statusIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(status.getBounds().left - 10, status.y, 'unicorn-status').setDepth(2).setOrigin(1, 0.5).setDepth(2);

    // // Времени осталось
    // let eventLeftText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 100, this.scene.cameras.main.centerY - 40, this.scene.state.lang.eventRulesLeft, {
    //   font: '24px Bip',
    //   color: '#793D0A',
    // }).setOrigin(1, 0.5).setDepth(2);
    
    // // Время
    // let eventLeftTime: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 114, this.scene.cameras.main.centerY - 40, this.shortTime(this.scene.state.progress.event.endTime, this.scene.state.lang), {
    //   font: '24px Bip',
    //   color: '#459D1A',
    // }).setOrigin(0, 0.5).setDepth(2);

    // Призы
    let topPlaces: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 140, this.scene.cameras.main.centerY - 190, 'rating-places').setScale(0.9).setVisible(false);

    let priceTopPlaces: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 20, this.scene.cameras.main.centerY - 230,
      '1 ' + this.scene.state.lang.eventPlace + '\n' + '2 ' + this.scene.state.lang.eventPlace + '\n' + '3 ' + this.scene.state.lang.eventPlace, {
      font: 'Bold 21px Bip',
      color: '#793D0A',
      align: 'right'
    }).setOrigin(1, 0).setVisible(false);

    let pricePlaces: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 20, this.scene.cameras.main.centerY - 144,
      '4-10 ' + this.scene.state.lang.eventPlace + '\n' + '11-100 ' + this.scene.state.lang.eventPlace + '\n' + '101-500 ' + this.scene.state.lang.eventPlace + '\n' + '500+ ' + this.scene.state.lang.eventPlace, {
      font: '21px Bip',
      color: '#793D0A',
      align: 'right'
    }).setOrigin(1, 0).setVisible(false);

    let priceTopPlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 50, this.scene.cameras.main.centerY - 230,
      '- 1000\n' + '- 700\n' + '- 400', {
      font: 'Bold 21px Bip',
      color: '#793D0A',
      align: 'left'
    }).setOrigin(0, 0).setVisible(false);

    let pricePlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 50, this.scene.cameras.main.centerY - 144,
      '- 300\n- 100\n- 50\n- 20', {
      font: '21px Bip',
      color: '#793D0A',
      align: 'left'
    }).setOrigin(0, 0).setVisible(false);

    // Кучки кристалов
    let diamond1: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 188, this.scene.cameras.main.centerY - 196 - 20, 'diamond').setScale(0.1).setAngle(45).setVisible(false);
    let diamond2: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 175, this.scene.cameras.main.centerY - 200 - 20, 'diamond').setScale(0.13).setVisible(false);
    let diamond3: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 165, this.scene.cameras.main.centerY - 191 - 20, 'diamond').setScale(0.09).setAngle(-30).setVisible(false);

    let diamond4: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 168, this.scene.cameras.main.centerY - 164 - 20, 'diamond').setScale(0.10).setAngle(-12).setVisible(false);
    let diamond5: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 180, this.scene.cameras.main.centerY - 169 - 20, 'diamond').setScale(0.12).setAngle(19).setVisible(false);

    let diamond6: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 178, this.scene.cameras.main.centerY - 139 - 20, 'diamond').setScale(0.12).setAngle(-19).setVisible(false);
    let diamond7: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 109 - 20, 'diamond').setScale(0.10).setVisible(false);
    let diamond8: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 81 - 20, 'diamond').setScale(0.09).setVisible(false);
    let diamond9: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 55 - 20, 'diamond').setScale(0.08).setVisible(false);
    let diamond10: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 27 - 20, 'diamond').setScale(0.08).setVisible(false);

    // Затемняем 2ю кнопку
    priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 300, 90);
    price.setTint(0xC0C0C0);
    
    this.scene.state.progress.event.eventRaitings = [{ score: 5, place: 2, name: 'wrgw egrg' },{ score: 2, place: 3, name: '+wrgw egrg' }]
    this.scene.state.progress.event.userEventRaiting = { score: 20, place: 1, name: 'wrgtrgw egrg' }


    // Таблица
    let length: number = this.scene.state.progress.event.eventRaitings.length
    if (length > 10) length = 10

    for (let i: number = 0; i < length; i++) {
      
      placeAndName = this.scene.add.text(placeAndNameX, placeAndNameY + padding * Number(i), '', {
        font: '21px Bip',
        color: '#793D0A',
      }).setCrop(0, 0, 260, 100);

      score = this.scene.add.text(placeAndNameX + 280, placeAndNameY + padding * Number(i), '', {
        font: '21px Bip',
        color: '#793D0A',
      });

      if (this.scene.state.progress.event.eventRaitings[i].score !== null) {
        placeAndName.setText(this.scene.state.progress.event.eventRaitings[i].place + '. ' + this.scene.state.progress.event.eventRaitings[i].name).setCrop(0, 0, 260, 100);
        score.setText(String(this.scene.state.progress.event.eventRaitings[i].score));
        if (i < 3) {
          this.scene.add.sprite(placeAndNameX + 280 + 35, placeAndNameY + padding * Number(i), 'unicorn-status').setOrigin(0, 0).setScale(0.65);
        }
      }
      
      this.eventRatingsNames.push(placeAndName);
      this.eventRatingsScores.push(score);

    }

    this.line = this.scene.add.text(placeAndNameX, placeAndNameY + 240, '-----', {
      font: '26px Shadow',
      color: '#793D0A',
    })

    this.playerPlaceAndName = this.scene.add.text(placeAndNameX, placeAndNameY + 270, this.scene.state.progress.event.userEventRaiting.place + '. ' + this.scene.state.progress.event.userEventRaiting.name, {
      font: '21px Bip',
      color: '#793D0A',
    }).setCrop(0, 0, 220, 100);

    this.playerScore = this.scene.add.text(placeAndNameX + 280, placeAndNameY + 270, String(this.scene.state.progress.event.userEventRaiting.score), {
      font: '21px Bip',
      color: '#793D0A',
    })

    if (this.scene.state.progress.event.userEventRaiting.place <= 10) {

      this.line.setVisible(false);
      this.playerPlaceAndName.setVisible(false);
      this.playerScore.setVisible(false);

    }

    priceElements.push(
      topPlaces,
      priceTopPlaces,
      pricePlaces,
      priceTopPlacesDiamonds,
      pricePlacesDiamonds,
      diamond1,
      diamond2,
      diamond3,
      diamond4,
      diamond5,
      diamond6,
      diamond7,
      diamond8,
      diamond9,
      diamond10
    );

    // Нажатие на 'Условия'
    rulesBtn.on('pointerdown', (): void => {

      priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 400, 90);
      price.setTint(0xC0C0C0);
      rulesBtn.setTint(0xffffff).setCrop(0, 0, 400, 150);
      rules.setTint(0xffffff);

      rulesText.setVisible(true);
      rulesTextStatus.setVisible(true);
      statusIcon.setVisible(true);
      status.setVisible(true);

      priceElements.forEach(el => el.setVisible(false));

    });

    // Нажатие на 'Призы'
    priceBtn.on('pointerdown', (): void => {

      rulesBtn.setTint(0xC0C0C0).setCrop(0, 0, 400, 90);
      rules.setTint(0xC0C0C0);
      priceBtn.setTint(0xffffff).setCrop(0, 0, 400, 150);
      price.setTint(0xffffff);

      rulesText.setVisible(false);
      rulesTextStatus.setVisible(false);
      statusIcon.setVisible(false);
      status.setVisible(false);

      priceElements.forEach(el => el.setVisible(true));

    });

    let diamonds: number;
    if (this.scene.state.progress.event.userEventRaiting.place === 1) diamonds = 1000;
    else if (this.scene.state.progress.event.userEventRaiting.place === 2) diamonds = 700;
    else if (this.scene.state.progress.event.userEventRaiting.place === 3) diamonds = 400;
    else if (this.scene.state.progress.event.userEventRaiting.place <= 10) diamonds = 300;
    else if (this.scene.state.progress.event.userEventRaiting.place <= 100) diamonds = 100;
    else if (this.scene.state.progress.event.userEventRaiting.place <= 500) diamonds = 50;
    else if (this.scene.state.progress.event.userEventRaiting.place >= 501) diamonds = 20;
    // кнопка
    let btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + height, 'repository-sell-btn').setScale(0.7);
    let title: Phaser.GameObjects.Text = this.scene.add.text(btn.getBounds().centerX, this.scene.cameras.main.centerY - 10 + height, this.scene.state.lang.pickUp + ' + ' + diamonds, {
      font: '26px Shadow',
      fill: '#FFFFFF'
    }).setDepth(1).setOrigin(0.5, 0.5);
    title.setShadow(1, 1, '#013220', 0.5);
    
    let coin: Phaser.GameObjects.Sprite = this.scene.add.sprite(title.getBounds().centerX + title.width / 2 + 25, this.scene.cameras.main.centerY - 10 + height, 'diamond')
      .setOrigin(0.5, 0.5)
      .setScale(0.15);
    
    this.scene.clickModalBtn({ btn, title, img1: coin }, (): void => {
      this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('event_finished', {
        farm_id: 'Unicorn'
      });
      if (this.scene.state.progress.event.userEventRaiting.place <= 3) {

        this.scene.state.user.status = 'unicorn';
        
        const data: any = {
          id: this.scene.state.user.id,
          hash: this.scene.state.user.hash,
          counter: this.scene.state.user.counter,
          status: this.scene.state.user.status
        }
        axios.post(process.env.API + "/newStatus", data)
          .then(res => {
            console.log(res);
          });
      }
      this.scene.state.progress.event.eventPoints = -1;
      this.scene.state.user.additionalTutorial.eventTutorial = 0;

      this.scene.state.user.diamonds += diamonds;
      this.scene.game.scene.keys[this.scene.state.farm].logAmplitudeEvent('diamonds_get', {
        type: 'other',
        farm_id: 'Unicorn',
        count: diamonds,
      });
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.game.scene.keys[this.scene.state.farm].autosave();
      this.scene.scene.stop('Modal');
      MoneyAnimation.create(this.scene.game.scene.keys[this.scene.state.farm + 'Bars'], 'diamond');
      
    });
    
  }
}