import axios from "axios";
import Modal from "../../scenes/Modal/Modal";
import MoneyAnimation from "../animations/MoneyAnimation";

export default class EventEndWindow {
  public scene: Modal;

  private line: Phaser.GameObjects.Text;
  private playerPlaceAndName: Phaser.GameObjects.Text;
  private playerScore: Phaser.GameObjects.Text;
  private eventRatingsNames: Phaser.GameObjects.Text[];
  private eventRatingsScores: Phaser.GameObjects.Text[];
  private priceBtn: Phaser.GameObjects.Sprite;
  private price: Phaser.GameObjects.Text;
  private rulesBtn: Phaser.GameObjects.Sprite;
  private rules: Phaser.GameObjects.Text;
  private status: Phaser.GameObjects.Text;
  private rulesText: Phaser.GameObjects.Text;
  private rulesTextStatus: Phaser.GameObjects.Text;
  private statusIcon: Phaser.GameObjects.Sprite;
  private priceElements: modalElementType[];

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.priceElements = [];
  }

  private create(): void {
    this.scene.game.scene.keys[this.scene.state.farm].getEventRaiting();
    let height: number = 390;

    this.eventRatingsNames = [];
    this.eventRatingsScores = [];
    let priceElements: modalElementType[] = [];
    let placeAndName: Phaser.GameObjects.Text;
    let score: Phaser.GameObjects.Text;
    const placeAndNameX: number = this.scene.cameras.main.centerX - 206;
    const placeAndNameY: number = this.scene.cameras.main.centerY + 35;
    const padding: number = 24;

    // Спрайты
    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'raiting-bg-after');
    this.rulesBtn = this.scene.add.sprite(this.scene.cameras.main.centerX - 130, this.scene.cameras.main.centerY - 292, 'rating-rules-btn').setInteractive();
    this.priceBtn = this.scene.add.sprite(this.scene.cameras.main.centerX + 126, this.scene.cameras.main.centerY - 292, 'rating-price-btn').setInteractive();

    // Заголовок
    this.scene.add.text(this.scene.cameras.main.centerX + 52, this.scene.cameras.main.centerY - 440, this.scene.state.lang.unicornField, {
      font: '40px Shadow',
      color: '#FFF7E6',
      align: 'center',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 2);

    // 'Условия'
    this.rules = this.scene.add.text(this.scene.cameras.main.centerX - 86, this.scene.cameras.main.centerY - 307, this.scene.state.lang.eventRules, {
      font: '32px Bip',
      color: '#FFF7E6',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

    // 'Призы'
    this.price = this.scene.add.text(this.scene.cameras.main.centerX + 164, this.scene.cameras.main.centerY - 307, this.scene.state.lang.eventPrice, {
      font: '32px Bip',
      color: '#FFF7E6',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

    // Текст условия
    this.rulesText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 170, this.scene.state.lang.eventRulesAfter, {
      font: '23px Bip',
      color: '#793D0A',
      align: 'center',
      wordWrap: { width: 380 }
    }).setOrigin(0.5, 0.5).setDepth(2).setLineSpacing(0.2);

    this.rulesTextStatus = this.scene.add.text(this.scene.cameras.main.centerX, this.rulesText.getBounds().bottom + 15, this.scene.state.lang.eventRulesAfterStatus, {
      font: '23px Bip',
      color: '#793D0A',
      align: 'center',
      wordWrap: { width: 380 },
    }).setOrigin(0.5, 0.5).setDepth(2);

    this.status = this.scene.add.text(this.scene.cameras.main.centerX, this.rulesTextStatus.getBounds().bottom + 17, this.scene.state.lang.unicornProfileName , {
      font: '24px Bip',
      color: '#459D1A',
      align: 'left',
      wordWrap: { width: 310 }
    }).setOrigin(0.5, 0.5).setDepth(2);
    
    this.statusIcon = this.scene.add.sprite(this.status.getBounds().left - 10, this.status.y, 'unicorn-status').setDepth(2).setOrigin(1, 0.5).setDepth(2);

    // Призы
    const topPlaces: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 140, this.scene.cameras.main.centerY - 190, 'rating-places').setScale(0.9).setVisible(false);

    const priceTopPlaces: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 20, this.scene.cameras.main.centerY - 230,
      '1 ' + this.scene.state.lang.eventPlace + '\n' + '2 ' + this.scene.state.lang.eventPlace + '\n' + '3 ' + this.scene.state.lang.eventPlace, {
      font: 'Bold 21px Bip',
      color: '#793D0A',
      align: 'right'
    }).setOrigin(1, 0).setVisible(false);

    const pricePlaces: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 20, this.scene.cameras.main.centerY - 144,
      '4-10 ' + this.scene.state.lang.eventPlace + '\n' + '11-100 ' + this.scene.state.lang.eventPlace + '\n' + '101-500 ' + this.scene.state.lang.eventPlace + '\n' + '500+ ' + this.scene.state.lang.eventPlace, {
      font: '21px Bip',
      color: '#793D0A',
      align: 'right'
    }).setOrigin(1, 0).setVisible(false);

    const priceTopPlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 50, this.scene.cameras.main.centerY - 230,
      '- 1000\n' + '- 700\n' + '- 400', {
      font: 'Bold 21px Bip',
      color: '#793D0A',
      align: 'left'
    }).setOrigin(0, 0).setVisible(false);

    const pricePlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 50, this.scene.cameras.main.centerY - 144,
      '- 300\n- 100\n- 50\n- 20', {
      font: '21px Bip',
      color: '#793D0A',
      align: 'left'
    }).setOrigin(0, 0).setVisible(false);

    // Кучки кристалов
    const firstPlaceDiamonds: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 175, this.scene.cameras.main.centerY - 220, [
      this.scene.add.sprite(13, 4, 'diamond').setScale(0.11).setAngle(45).setTint(0x000000),
      this.scene.add.sprite(13, 4, 'diamond').setScale(0.1).setAngle(45),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.14).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.13),
      this.scene.add.sprite(-10, 9, 'diamond').setScale(0.1).setAngle(-30).setTint(0x000000),
      this.scene.add.sprite(-10, 9, 'diamond').setScale(0.09).setAngle(-30),
    ]).setVisible(false);

    const secondPlaceDiamonds: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 180, this.scene.cameras.main.centerY - 189, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.13).setAngle(19).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.12).setAngle(19),
      this.scene.add.sprite(-12, 5, 'diamond').setScale(0.11).setAngle(-12).setTint(0x000000),
      this.scene.add.sprite(-12, 5, 'diamond').setScale(0.1).setAngle(-12),
    ]).setVisible(false);

    const thirdPlaceDiamond: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 178, this.scene.cameras.main.centerY - 159, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.13).setAngle(-19).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.12).setAngle(-19),
    ]).setVisible(false);

    const fourthPlaceDiamond: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 129, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.11).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.1),
    ]).setVisible(false);

    const fifthPlaceDiamond: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 101, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.1).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.09),
    ]).setVisible(false);

    const sixthPlaceDiamond: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 75, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.09).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.08),
    ]).setVisible(false);

    const seventhPlaceDiamond: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 47, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.08).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.07),
    ]).setVisible(false);

    // Затемняем 2ю кнопку
    this.priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 300, 90);
    this.price.setTint(0xC0C0C0);
    
    // Для тестов
    // if (!this.scene.state.unicornRaitings?.ratings) {
    //   this.scene.state.unicornRaitings?.ratings = [{ score: 5, place: 2, name: 'wrgw egrg' },{ score: 2, place: 3, name: '+wrgw egrg' }]
    //   this.scene.state.unicornRaitings?.user = { score: 20, place: 1, name: 'wrgtrgw egrg' }
    // }

    // Таблица
    let length: number = this.scene.state.unicornRaitings?.ratings.length;
    if (length > 10) length = 10;

    for (let i: number = 0; i < length; i++) {
      placeAndName = this.scene.add.text(placeAndNameX, placeAndNameY + padding * Number(i), '', {
        font: '21px Bip',
        color: '#793D0A',
      }).setCrop(0, 0, 260, 100);

      score = this.scene.add.text(placeAndNameX + 280, placeAndNameY + padding * Number(i), '', {
        font: '21px Bip',
        color: '#793D0A',
      });

      if (this.scene.state.unicornRaitings?.ratings[i].score !== null) {
        placeAndName.setText(this.scene.state.unicornRaitings?.ratings[i].place + '. ' + this.scene.state.unicornRaitings?.ratings[i].name).setCrop(0, 0, 260, 100);
        score.setText(String(this.scene.state.unicornRaitings?.ratings[i].score));
        if (i < 3) this.scene.add.sprite(placeAndNameX + 280 + 35, placeAndNameY + padding * Number(i), 'unicorn-status').setOrigin(0, 0).setScale(0.65);
      }
      
      this.eventRatingsNames.push(placeAndName);
      this.eventRatingsScores.push(score);
    }

    this.line = this.scene.add.text(placeAndNameX, placeAndNameY + 240, '-----', {
      font: '26px Shadow',
      color: '#793D0A',
    });

    this.playerPlaceAndName = this.scene.add.text(placeAndNameX, placeAndNameY + 270, this.scene.state.unicornRaitings?.user.place + '. ' + this.scene.state.unicornRaitings?.user.name, {
      font: '21px Bip',
      color: '#793D0A',
    }).setCrop(0, 0, 220, 100);

    this.playerScore = this.scene.add.text(placeAndNameX + 280, placeAndNameY + 270, String(this.scene.state.unicornRaitings?.user.score), {
      font: '21px Bip',
      color: '#793D0A',
    });

    if (this.scene.state.unicornRaitings?.user.place <= 10) {
      this.line.setVisible(false);
      this.playerPlaceAndName.setVisible(false);
      this.playerScore.setVisible(false);
    }

    this.priceElements.push(
      topPlaces,
      priceTopPlaces,
      pricePlaces,
      priceTopPlacesDiamonds,
      pricePlacesDiamonds,
      firstPlaceDiamonds,
      secondPlaceDiamonds,
      thirdPlaceDiamond,
      fourthPlaceDiamond,
      fifthPlaceDiamond,
      sixthPlaceDiamond,
      seventhPlaceDiamond,
    );

    // Нажатие на 'Условия'
    this.rulesBtn.on('pointerdown', (): void => { this.toogleBtn(true) });

    // Нажатие на 'Призы'
    this.priceBtn.on('pointerdown', (): void => { this.toogleBtn(false) });

    let diamonds: number;
    if (this.scene.state.unicornRaitings?.user.place === 1) diamonds = 1000;
    else if (this.scene.state.unicornRaitings?.user.place === 2) diamonds = 700;
    else if (this.scene.state.unicornRaitings?.user.place === 3) diamonds = 400;
    else if (this.scene.state.unicornRaitings?.user.place <= 10) diamonds = 300;
    else if (this.scene.state.unicornRaitings?.user.place <= 100) diamonds = 100;
    else if (this.scene.state.unicornRaitings?.user.place <= 500) diamonds = 50;
    else if (this.scene.state.unicornRaitings?.user.place >= 501) diamonds = 20;
    // кнопка
    const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + height, 'repository-sell-btn').setScale(0.7);
    const title: Phaser.GameObjects.Text = this.scene.add.text(btn.getBounds().centerX, this.scene.cameras.main.centerY - 10 + height, this.scene.state.lang.pickUp + ' + ' + diamonds, {
      font: '26px Shadow',
      fill: '#FFFFFF'
    }).setDepth(1).setOrigin(0.5, 0.5);
    title.setShadow(1, 1, '#013220', 0.5);
    
    const coin: Phaser.GameObjects.Sprite = this.scene.add.sprite(title.getBounds().centerX + title.width / 2 + 25, this.scene.cameras.main.centerY - 10 + height, 'diamond').setOrigin(0.5, 0.5).setScale(0.15);
    
    this.scene.clickModalBtn({ btn, title, img1: coin }, (): void => {
      this.scene.state.amplitude.logAmplitudeEvent('event_finished', {
        farm_id: 'Unicorn'
      });
      if (this.scene.state.unicornRaitings?.user.place <= 3) {

        this.scene.state.user.status = 'unicorn';
        
        const data: any = {
          id: this.scene.state.user.id,
          hash: this.scene.state.user.hash,
          counter: this.scene.state.user.counter,
          status: this.scene.state.user.status
        };
        axios.post(process.env.API + "/newStatus", data)
          .then(res => {});
      }
      this.scene.state.userUnicorn.points = -1;

      this.scene.state.user.diamonds += diamonds;
      this.scene.state.amplitude.logAmplitudeEvent('diamonds_get', {
        type: 'unicorn_award',
        farm_id: 'Unicorn',
        count: diamonds,
      });
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.game.scene.keys[this.scene.state.farm].autosave();
      const data: any = {
        id: this.scene.state.user.id,
        hash: this.scene.state.user.hash,
        counter: this.scene.state.user.counter,
      };
      axios.post(process.env.API + "/takeAward", data)
          .then(res => {console.log(res.data)});
      this.scene.scene.stop('Modal');
      MoneyAnimation.create(this.scene.game.scene.keys[this.scene.state.farm + 'Bars'], 'diamond');
    });
  }

  private toogleBtn(showRules: boolean): void {
    if (showRules) {
      this.priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 400, 90);
      this.price.setTint(0xC0C0C0);
      this.rulesBtn.setTint(0xffffff).setCrop(0, 0, 400, 150);
      this.rules.setTint(0xffffff);
    } else {
      this.rulesBtn.setTint(0xC0C0C0).setCrop(0, 0, 400, 90);
      this.rules.setTint(0xC0C0C0);
      this.priceBtn.setTint(0xffffff).setCrop(0, 0, 400, 150);
      this.price.setTint(0xffffff);
    }

    this.rulesText.setVisible(showRules);
    this.rulesTextStatus.setVisible(showRules);
    this.statusIcon.setVisible(showRules);
    this.status.setVisible(showRules);

    this.priceElements.forEach(el => el.setVisible(!showRules));
  }
}