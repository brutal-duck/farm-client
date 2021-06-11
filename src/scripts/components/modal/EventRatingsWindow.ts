import { shortTime } from "../../general/basic";
import Modal from "../../scenes/Modal/Modal";

export default class EventRatingsWindow {
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

    this.eventRatingsNames = [];
    this.eventRatingsScores = [];
    let priceElements: modalElementType[] = [];
    let placeAndName: Phaser.GameObjects.Text;
    let score: Phaser.GameObjects.Text;
    let placeAndNameX: number = this.scene.cameras.main.centerX - 206;
    let placeAndNameY: number = this.scene.cameras.main.centerY + 130;
    let padding: number = 24;

    // Спрайты
    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'rating-bg');
    let rulesBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 130, this.scene.cameras.main.centerY - 264, 'rating-rules-btn').setInteractive();
    let priceBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 126, this.scene.cameras.main.centerY - 264, 'rating-price-btn').setInteractive();
    let closeBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 268, this.scene.cameras.main.centerY - 452, 'tasks-close').setOrigin(0.5, 0.5).setScale(1.15);

    // Заголовок
    this.scene.add.text(this.scene.cameras.main.centerX + 20, this.scene.cameras.main.centerY - 430, this.scene.state.lang.unicornField, {
      font: '42px Shadow',
      color: '#FFF7E6',
      align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 2);

    // 'Условия'
    let rules: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 86, this.scene.cameras.main.centerY - 283, this.scene.state.lang.eventRules, {
      font: '32px Bip',
      color: '#FFF7E6',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

    // 'Призы'
    let price: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 164, this.scene.cameras.main.centerY - 283, this.scene.state.lang.eventPrice, {
      font: '32px Bip',
      color: '#FFF7E6',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

    // Текст условия
    let rulesText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 186, this.scene.state.lang.eventRulesTеxt, {
      font: '23px Bip',
      color: '#793D0A',
      align: 'center',
      wordWrap: { width: 380 }
    }).setOrigin(0.5, 0.5).setDepth(2).setLineSpacing(0.2);
    let rulesText2: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 97, this.scene.state.lang.eventRulesTеxt2, {
      font: '23px Bip',
      color: '#793D0A',
      align: 'center',
      wordWrap: { width: 430 }
    }).setOrigin(0.5, 0.5).setDepth(2).setLineSpacing(0.2);

    // Времени осталось
    let eventLeftText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 100, this.scene.cameras.main.centerY - 25, this.scene.state.lang.eventRulesLeft, {
      font: '24px Bip',
      color: '#793D0A',
    }).setOrigin(1, 0.5).setDepth(2);
    
    // Время
    this.scene.eventLeftTime = this.scene.add.text(this.scene.cameras.main.centerX + 114, this.scene.cameras.main.centerY - 25, shortTime(this.scene.state.progress.event.endTime, this.scene.state.lang), { font: '24px Bip', color: '#459D1A' }).setOrigin(0, 0.5).setDepth(2);

    // Призы
    let topPlaces: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX - 140, this.scene.cameras.main.centerY - 170, 'rating-places').setScale(0.9).setVisible(false);

    let priceTopPlaces: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 20, this.scene.cameras.main.centerY - 210,
      '1 ' + this.scene.state.lang.eventPlace + '\n' + '2 ' + this.scene.state.lang.eventPlace + '\n' + '3 ' + this.scene.state.lang.eventPlace, {
      font: 'Bold 21px Bip',
      color: '#793D0A',
      align: 'right'
    }).setOrigin(1, 0).setVisible(false);

    let pricePlaces: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 20, this.scene.cameras.main.centerY - 124,
      '4-10 ' + this.scene.state.lang.eventPlace + '\n' + '11-100 ' + this.scene.state.lang.eventPlace + '\n' + '101-500 ' + this.scene.state.lang.eventPlace + '\n' + '500+ ' + this.scene.state.lang.eventPlace, {
      font: '21px Bip',
      color: '#793D0A',
      align: 'right'
    }).setOrigin(1, 0).setVisible(false);

    let priceTopPlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 50, this.scene.cameras.main.centerY - 210,
      '- 1000\n' + '- 700\n' + '- 400', {
      font: 'Bold 21px Bip',
      color: '#793D0A',
      align: 'left'
    }).setOrigin(0, 0).setVisible(false);

    let pricePlacesDiamonds: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX + 50, this.scene.cameras.main.centerY - 124,
      '- 300\n- 100\n- 50\n- 20', {
      font: '21px Bip',
      color: '#793D0A',
      align: 'left'
    }).setOrigin(0, 0).setVisible(false);

    // Кучки кристалов
    let diamond1: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 188, this.scene.cameras.main.centerY - 196, 'diamond').setScale(0.1).setAngle(45).setVisible(false);
    let diamond2: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 175, this.scene.cameras.main.centerY - 200, 'diamond').setScale(0.13).setVisible(false);
    let diamond3: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 165, this.scene.cameras.main.centerY - 191, 'diamond').setScale(0.09).setAngle(-30).setVisible(false);

    let diamond4: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 168, this.scene.cameras.main.centerY - 164, 'diamond').setScale(0.10).setAngle(-12).setVisible(false);
    let diamond5: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 180, this.scene.cameras.main.centerY - 169, 'diamond').setScale(0.12).setAngle(19).setVisible(false);

    let diamond6: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 178, this.scene.cameras.main.centerY - 139, 'diamond').setScale(0.12).setAngle(-19).setVisible(false);
    let diamond7: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 109, 'diamond').setScale(0.10).setVisible(false);
    let diamond8: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 81, 'diamond').setScale(0.09).setVisible(false);
    let diamond9: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 55, 'diamond').setScale(0.08).setVisible(false);
    let diamond10: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX + 176, this.scene.cameras.main.centerY - 27, 'diamond').setScale(0.08).setVisible(false);


    // 'Рейтинг'
    this.scene.add.text(this.scene.cameras.main.centerX + 30, this.scene.cameras.main.centerY + 52, this.scene.state.lang.eventRating.toUpperCase(), {
      font: '34px Bip',
      color: '#FFF7E6',
    }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

    // Затемняем 2ю кнопку
    priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 300, 90);
    price.setTint(0xC0C0C0);

    // Для тестов
    // this.scene.state.progress.event.eventRaitings = [{ score: 5, place: 2, name: 'wrgw egrg' },{ score: 2, place: 3, name: '+wrgw egrg' }]
    // this.scene.state.progress.event.userEventRaiting = { score: 20, place: 1, name: 'wrgtrgw egrg' }

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

      
      if (this.scene.state.progress.event.eventRaitings && this.scene.state.progress.event.eventRaitings[i].score !== null) {
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
    }).setCrop(0, 0, 240, 100);

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
      rulesText2.setVisible(true);
      eventLeftText.setVisible(true);
      this.scene.eventLeftTime.setVisible(true);

      priceElements.forEach(el => el.setVisible(false));

    });

    // Нажатие на 'Призы'
    priceBtn.on('pointerdown', (): void => {

      rulesBtn.setTint(0xC0C0C0).setCrop(0, 0, 400, 90);
      rules.setTint(0xC0C0C0);
      priceBtn.setTint(0xffffff).setCrop(0, 0, 400, 150);
      price.setTint(0xffffff);

      rulesText.setVisible(false);
      rulesText2.setVisible(false);
      eventLeftText.setVisible(false);
      this.scene.eventLeftTime.setVisible(false);

      priceElements.forEach(el => el.setVisible(true));

    });


    // Закрытие окна
    this.scene.clickButton(closeBtn, (): void => {
      
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.scene.stop('Modal');
      
    });

    this.scene.events.on(Phaser.Scenes.Events.UPDATE, this.update, this);
   
  }

  private update(): void {

    // Обновление таблицы рейтингов евента
    if (this.scene.state.progress.event.updateRaitings && this.scene.state.modal.type === 11) {

      for (let i: number = 0; i < 10; i++) {
        if (this.scene.state.progress.event.eventRaitings[i].score !== null) {
          this.eventRatingsNames[i]?.setText(this.scene.state.progress.event.eventRaitings[i].place + '. ' + this.scene.state.progress.event.eventRaitings[i].name).setCrop(0, 0, 260, 100)
          this.eventRatingsScores[i]?.setText(String(this.scene.state.progress.event.eventRaitings[i].score))
        }
      }
      
      if (this.scene.state.progress.event.userEventRaiting.place <= 10) {
        
        this.line?.setVisible(false)
        this.playerPlaceAndName?.setVisible(false)
        this.playerScore?.setVisible(false)
    
      } else if (this.scene.state.progress.event.userEventRaiting.place > 10) {
        
        this.line?.setVisible(true)
        this.playerPlaceAndName?.setVisible(true).setCrop(0, 0, 280, 100)
        this.playerScore?.setVisible(true)
        
      }

      this.scene.state.progress.event.updateRaitings = false

    }
    
  }
}