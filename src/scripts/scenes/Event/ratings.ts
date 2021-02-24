export default function ratings(): void {

  this.eventRatingsNames = []
  this.eventRatingsScores = []
  let priceElements: modalElementType[] = [];
  let placeAndName: Phaser.GameObjects.Text
  let score: Phaser.GameObjects.Text
  let placeAndNameX: number = this.cameras.main.centerX - 206
  let placeAndNameY: number = this.cameras.main.centerY + 130
  let padding: number = 24

  // Спрайты
  let ratingBG: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'rating-bg')
  let rulesBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX - 130, this.cameras.main.centerY - 264, 'rating-rules-btn').setInteractive()
  let priceBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 126, this.cameras.main.centerY - 264, 'rating-price-btn').setInteractive()
  let closeBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 268, this.cameras.main.centerY - 452, 'tasks-close').setOrigin(0.5, 0.5).setScale(1.15)

  // Заголовок
  let title: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 20, this.cameras.main.centerY - 430, this.state.lang.unicornField, {
    font: '42px Shadow',
    color: '#FFF7E6',
    align: 'center',
    wordWrap: { width: 400 }
  }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 4, 'rgba(0, 0, 0, 0.5)', 2);

  // 'Условия'
  let rules: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 86, this.cameras.main.centerY - 283, this.state.lang.eventRules, {
    font: '32px Bip',
    color: '#FFF7E6',
  }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

  // 'Призы'
  let price: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 164, this.cameras.main.centerY - 283, this.state.lang.eventPrice, {
    font: '32px Bip',
    color: '#FFF7E6',
  }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

  // Текст условия
  let rulesText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 186, this.state.lang.eventRulesTеxt, {
    font: '23px Bip',
    color: '#793D0A',
    align: 'center',
    wordWrap: { width: 380 }
  }).setOrigin(0.5, 0.5).setDepth(2).setLineSpacing(0.2)
  let rulesText2: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 112, this.state.lang.eventRulesTеxt2, {
    font: '23px Bip',
    color: '#793D0A',
    align: 'center',
    wordWrap: { width: 430 }
  }).setOrigin(0.5, 0.5).setDepth(2).setLineSpacing(0.2)

  // Времени осталось
  let eventLeftText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 100, this.cameras.main.centerY - 40, this.state.lang.eventRulesLeft, {
    font: '24px Bip',
    color: '#793D0A',
  }).setOrigin(1, 0.5).setDepth(2)
  
  // Время
  let eventLeftTime: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 114, this.cameras.main.centerY - 40, this.shortTime(this.state.progress.event.endTime, this.state.lang), {
    font: '24px Bip',
    color: '#459D1A',
  }).setOrigin(0, 0.5).setDepth(2)

  // Призы
  let topPlaces: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX - 140, this.cameras.main.centerY - 170, 'rating-places').setScale(0.9).setVisible(false)

  let priceTopPlaces: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY - 210,
    '1 ' + this.state.lang.eventPlace + '\n' + '2 ' + this.state.lang.eventPlace + '\n' + '3 ' + this.state.lang.eventPlace, {
    font: 'Bold 21px Bip',
    color: '#793D0A',
    align: 'right'
  }).setOrigin(1, 0).setVisible(false)

  let pricePlaces: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 20, this.cameras.main.centerY - 124,
    '4-10 ' + this.state.lang.eventPlace + '\n' + '11-100 ' + this.state.lang.eventPlace + '\n' + '101-500 ' + this.state.lang.eventPlace + '\n' + '500+ ' + this.state.lang.eventPlace, {
    font: '21px Bip',
    color: '#793D0A',
    align: 'right'
  }).setOrigin(1, 0).setVisible(false)

  let priceTopPlacesDiamonds: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 50, this.cameras.main.centerY - 210,
    '- 1000\n' + '- 700\n' + '- 400', {
    font: 'Bold 21px Bip',
    color: '#793D0A',
    align: 'left'
  }).setOrigin(0, 0).setVisible(false)

  let pricePlacesDiamonds: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 50, this.cameras.main.centerY - 124,
    '- 300\n- 100\n- 50\n- 20', {
    font: '21px Bip',
    color: '#793D0A',
    align: 'left'
  }).setOrigin(0, 0).setVisible(false)

  // Кучки кристалов
  let diamond1: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 188, this.cameras.main.centerY - 196, 'diamond').setScale(0.1).setAngle(45).setVisible(false)
  let diamond2: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 175, this.cameras.main.centerY - 200, 'diamond').setScale(0.13).setVisible(false)
  let diamond3: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 165, this.cameras.main.centerY - 191, 'diamond').setScale(0.09).setAngle(-30).setVisible(false)

  let diamond4: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 168, this.cameras.main.centerY - 164, 'diamond').setScale(0.10).setAngle(-12).setVisible(false)
  let diamond5: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 180, this.cameras.main.centerY - 169, 'diamond').setScale(0.12).setAngle(19).setVisible(false)

  let diamond6: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 178, this.cameras.main.centerY - 139, 'diamond').setScale(0.12).setAngle(-19).setVisible(false)
  let diamond7: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 109, 'diamond').setScale(0.10).setVisible(false)
  let diamond8: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 81, 'diamond').setScale(0.09).setVisible(false)
  let diamond9: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 55, 'diamond').setScale(0.08).setVisible(false)
  let diamond10: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 176, this.cameras.main.centerY - 27, 'diamond').setScale(0.08).setVisible(false)


  // 'Рейтинг'
  let rating: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 30, this.cameras.main.centerY + 52, this.state.lang.eventRating.toUpperCase(), {
    font: '34px Bip',
    color: '#FFF7E6',
  }).setOrigin(0.5, 0.5).setDepth(2).setShadow(1, 3, 'rgba(0, 0, 0, 0.5)', 2);

  // Затемняем 2ю кнопку
  priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 300, 90)
  price.setTint(0xC0C0C0)

  // Таблица
  for (let i: number = 0; i < 10; i++) {
    
    placeAndName = this.add.text(placeAndNameX, placeAndNameY + padding * Number(i), '', {
      font: '21px Bip',
      color: '#793D0A',
    }).setCrop(0, 0, 280, 100)

    score = this.add.text(placeAndNameX + 300, placeAndNameY + padding * Number(i), '', {
      font: '21px Bip',
      color: '#793D0A',
    })

    if (this.state.progress.event.eventRaitings[i].score !== null) {
      placeAndName.setText(this.state.progress.event.eventRaitings[i].place + '. ' + this.state.progress.event.eventRaitings[i].name).setCrop(0, 0, 280, 100)
      score.setText(this.state.progress.event.eventRaitings[i].score)
    }
    
    this.eventRatingsNames.push(placeAndName)
    this.eventRatingsScores.push(score)

  }

  this.line = this.add.text(placeAndNameX, placeAndNameY + 240, '-----', {
    font: '26px Shadow',
    color: '#793D0A',
  })

  this.playerPlaceAndName = this.add.text(placeAndNameX, placeAndNameY + 270, this.state.progress.event.userEventRaiting.place + '. ' + this.state.progress.event.userEventRaiting.name, {
    font: '21px Bip',
    color: '#793D0A',
  }).setCrop(0, 0, 280, 100)

  this.playerScore = this.add.text(placeAndNameX + 300, placeAndNameY + 270, this.state.progress.event.userEventRaiting.score + 90, {
    font: '21px Bip',
    color: '#793D0A',
  })

  if (this.state.progress.event.userEventRaiting.place <= 10) {

    this.line.setVisible(false)
    this.playerPlaceAndName.setVisible(false)
    this.playerScore.setVisible(false)

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
  )

  // Нажатие на 'Условия'
  rulesBtn.on('pointerdown', (): void => {

    priceBtn.setTint(0xC0C0C0).setCrop(0, 0, 400, 90)
    price.setTint(0xC0C0C0)
    rulesBtn.setTint(0xffffff).setCrop(0, 0, 400, 150)
    rules.setTint(0xffffff)

    rulesText.setVisible(true)
    rulesText2.setVisible(true)
    eventLeftText.setVisible(true)
    eventLeftTime.setVisible(true)

    priceElements.forEach(el => el.setVisible(false))

  })

  // Нажатие на 'Призы'
  priceBtn.on('pointerdown', (): void => {

    rulesBtn.setTint(0xC0C0C0).setCrop(0, 0, 400, 90)
    rules.setTint(0xC0C0C0)
    priceBtn.setTint(0xffffff).setCrop(0, 0, 400, 150)
    price.setTint(0xffffff)

    rulesText.setVisible(false)
    rulesText2.setVisible(false)
    eventLeftText.setVisible(false)
    eventLeftTime.setVisible(false)

    priceElements.forEach(el => el.setVisible(true))

  })


  // Закрытие окна
  this.clickButton(closeBtn, (): void => {
    
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.scene.stop('Modal');
    
  });

}

