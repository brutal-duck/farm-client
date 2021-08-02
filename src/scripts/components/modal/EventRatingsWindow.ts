import { shortTime } from "../../general/basic";
import Modal from "../../scenes/Modal/Modal";

export default class EventRatingsWindow extends Phaser.GameObjects.Sprite {
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
  private rulesText: Phaser.GameObjects.Text;
  private rulesText2: Phaser.GameObjects.Text;
  private eventLeftText: Phaser.GameObjects.Text;
  private priceElements: modalElementType[];

  constructor(scene: Modal) {
    super(scene, 0, 0, 'pixel');
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.scene.add.existing(this);
    this.eventRatingsNames = [];
    this.eventRatingsScores = [];
    this.priceElements = [];
  }

  private create(): void {

    let placeAndName: Phaser.GameObjects.Text;
    let score: Phaser.GameObjects.Text;
    const placeAndNameX: number = this.scene.cameras.main.centerX - 206;
    const placeAndNameY: number = this.scene.cameras.main.centerY + 130;
    const padding: number = 24;

    // Спрайты
    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'rating-bg');
    this.rulesBtn = this.scene.add.sprite(this.scene.cameras.main.centerX - 130, this.scene.cameras.main.centerY - 264, 'rating-rules-btn').setInteractive();
    this.priceBtn = this.scene.add.sprite(this.scene.cameras.main.centerX + 126, this.scene.cameras.main.centerY - 264, 'rating-price-btn').setInteractive();
    const closeBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 268, this.scene.cameras.main.centerY - 452, 'tasks-close').setOrigin(0.5, 0.5).setScale(1.15);

    // Заголовок
    this.scene.add.text(this.scene.cameras.main.centerX + 20, this.scene.cameras.main.centerY - 430, this.scene.state.lang.unicornField, {
      font: '38px Shadow',
      color: '#FFF7E6',
      align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 2);

    // 'Условия'
    this.rules = this.scene.add.text(this.scene.cameras.main.centerX - 86, this.scene.cameras.main.centerY - 283, this.scene.state.lang.eventRules, {
      font: '32px Bip',
      color: '#FFF7E6',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

    // 'Призы'
    this.price = this.scene.add.text(this.scene.cameras.main.centerX + 164, this.scene.cameras.main.centerY - 283, this.scene.state.lang.eventPrice, {
      font: '32px Bip',
      color: '#FFF7E6',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

    // Текст условия
    this.rulesText = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 186, this.scene.state.lang.eventRulesTеxt, {
      font: '23px Bip',
      color: '#793D0A',
      align: 'center',
      wordWrap: { width: 380 }
    }).setOrigin(0.5, 0.5).setDepth(2).setLineSpacing(0.2);
    this.rulesText2 = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 97, this.scene.state.lang.eventRulesTеxt2, {
      font: '23px Bip',
      color: '#793D0A',
      align: 'center',
      wordWrap: { width: 430 }
    }).setOrigin(0.5, 0.5).setDepth(2).setLineSpacing(0.2);

    // Времени осталось
    this.eventLeftText = this.scene.add.text(this.scene.cameras.main.centerX + 100, this.scene.cameras.main.centerY - 25, this.scene.state.lang.eventRulesLeft, {
      font: '24px Bip',
      color: '#793D0A',
    }).setOrigin(1, 0.5).setDepth(2);
    
    // Время
    this.scene.eventLeftTime = this.scene.add.text(this.scene.cameras.main.centerX + 114, this.scene.cameras.main.centerY - 25, shortTime(this.scene.state.progress.event.endTime, this.scene.state.lang), { font: '24px Bip', color: '#459D1A' }).setOrigin(0, 0.5).setDepth(2);

    // Призы
    const topPlaces: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 140, this.scene.cameras.main.centerY - 170, 'rating-places').setScale(0.9).setVisible(false);

    const priceTopPlaces: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 20, this.scene.cameras.main.centerY - 210,
      '1 ' + this.scene.state.lang.eventPlace + '\n' + '2 ' + this.scene.state.lang.eventPlace + '\n' + '3 ' + this.scene.state.lang.eventPlace, {
      font: 'Bold 21px Bip',
      color: '#793D0A',
      align: 'right'
    }).setOrigin(1, 0).setVisible(false);

    const pricePlaces: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 20, this.scene.cameras.main.centerY - 124,
      '4-10 ' + this.scene.state.lang.eventPlace + '\n' + '11-100 ' + this.scene.state.lang.eventPlace + '\n' + '101-500 ' + this.scene.state.lang.eventPlace + '\n' + '500+ ' + this.scene.state.lang.eventPlace, {
      font: '21px Bip',
      color: '#793D0A',
      align: 'right'
    }).setOrigin(1, 0).setVisible(false);

    const priceTopPlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 50, this.scene.cameras.main.centerY - 210,
      '- 1000\n' + '- 700\n' + '- 400', {
      font: 'Bold 21px Bip',
      color: '#793D0A',
      align: 'left'
    }).setOrigin(0, 0).setVisible(false);

    const pricePlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 50, this.scene.cameras.main.centerY - 124,
      '- 300\n- 100\n- 50\n- 20', {
      font: '21px Bip',
      color: '#793D0A',
      align: 'left'
    }).setOrigin(0, 0).setVisible(false);

    // Кучки кристалов
    const firstPlaceDiamonds: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 175, this.scene.cameras.main.centerY - 200, [
      this.scene.add.sprite(13, 4, 'diamond').setScale(0.11).setAngle(45).setTint(0x000000),
      this.scene.add.sprite(13, 4, 'diamond').setScale(0.1).setAngle(45),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.14).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.13),
      this.scene.add.sprite(-10, 9, 'diamond').setScale(0.1).setAngle(-30).setTint(0x000000),
      this.scene.add.sprite(-10, 9, 'diamond').setScale(0.09).setAngle(-30),
    ]).setVisible(false);

    const secondPlaceDiamonds: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 180, this.scene.cameras.main.centerY - 169, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.13).setAngle(19).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.12).setAngle(19),
      this.scene.add.sprite(-12, 5, 'diamond').setScale(0.11).setAngle(-12).setTint(0x000000),
      this.scene.add.sprite(-12, 5, 'diamond').setScale(0.1).setAngle(-12),
    ]).setVisible(false);

    const thirdPlaceDiamond: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 178, this.scene.cameras.main.centerY - 139, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.13).setAngle(-19).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.12).setAngle(-19),
    ]).setVisible(false);

    const fourthPlaceDiamond: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 109, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.11).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.1),
    ]).setVisible(false);

    const fifthPlaceDiamond: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 81, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.1).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.09),
    ]).setVisible(false);

    const sixthPlaceDiamond: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 55, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.09).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.08),
    ]).setVisible(false);

    const seventhPlaceDiamond: Phaser.GameObjects.Container = this.scene.add.container(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 27, [
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.08).setTint(0x000000),
      this.scene.add.sprite(0, 0, 'diamond').setScale(0.07),
    ]).setVisible(false);


    // 'Рейтинг'
    this.scene.add.text(this.scene.cameras.main.centerX + 30, this.scene.cameras.main.centerY + 52, this.scene.state.lang.eventRating.toUpperCase(), {
      font: '34px Bip',
      color: '#FFF7E6',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

    // Затемняем 2ю кнопку
    this.priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 300, 90);
    this.price.setTint(0xC0C0C0);

    // Для тестов
    // if (!this.scene.state.progress.event.ratings) {
    //   this.scene.state.progress.event.ratings = [{ score: 5, place: 2, name: 'wrgw egrg' },{ score: 2, place: 3, name: '+wrgw egrg' }]
    //   this.scene.state.progress.event.user = { score: 20, place: 1, name: 'wrgtrgw egrg' }
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

      if (this.scene.state.unicornRaitings?.ratings && this.scene.state.unicornRaitings?.ratings[i].score !== null) {
        placeAndName.setText(this.scene.state.unicornRaitings?.ratings[i].place + '. ' + this.scene.state.unicornRaitings?.ratings[i].name).setCrop(0, 0, 260, 100);
        score.setText(String(this.scene.state.unicornRaitings?.ratings[i].score));
        if (i < 3)  this.scene.add.sprite(placeAndNameX + 280 + 35, placeAndNameY + padding * Number(i), 'unicorn-status').setOrigin(0, 0).setScale(0.65);
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
    }).setCrop(0, 0, 240, 100);

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
      seventhPlaceDiamond
    );

    // Нажатие на 'Условия'
    this.rulesBtn.on('pointerdown', (): void => { this.toogleBtn(true); });

    // Нажатие на 'Призы'
    this.priceBtn.on('pointerdown', (): void => { this.toogleBtn(false); });

    // Закрытие окна
    this.scene.clickButton(closeBtn, (): void => {
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.scene.stop('Modal');
    });
  }

  public preUpdate(): void {
    // Обновление таблицы рейтингов евента
    if (this.scene.state.unicornRaitings?.updated && this.scene.state.modal.type === 11 && this.eventRatingsNames) {
      for (let i: number = 0; i < 10; i++) {
        if (this.scene.state.unicornRaitings?.ratings[i]?.score) {
          this.eventRatingsNames[i]?.setText(this.scene.state.unicornRaitings?.ratings[i].place + '. ' + this.scene.state.unicornRaitings?.ratings[i].name).setCrop(0, 0, 260, 100);
          this.eventRatingsScores[i]?.setText(String(this.scene.state.unicornRaitings?.ratings[i].score));
        }
      }
      if (this.line && this.playerPlaceAndName && this.playerScore) {
          if (this.scene.state.unicornRaitings?.user.place <= 10) {
            this.line?.setVisible(false);
            this.playerPlaceAndName?.setVisible(false);
            this.playerScore?.setVisible(false);
          } else if (this.scene.state.unicornRaitings?.user.place > 10) {
            this.line?.setVisible(true);
            this.playerPlaceAndName?.setVisible(true).setCrop(0, 0, 280, 100);
            this.playerScore?.setVisible(true);
          }
        }
      this.scene.state.unicornRaitings.updated = false;
    }
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
    this.rulesText2.setVisible(showRules);
    this.eventLeftText.setVisible(showRules);
    this.scene.eventLeftTime.setVisible(showRules);

    this.priceElements.forEach(el => el.setVisible(!showRules));
  }
}