function daily(): void {

  let day: number = this.state.daily - 1;
  let awards: { type: number, count: number }[] = [
    { type: 1, count: 2 },
    { type: 1, count: 4 },
    { type: 1, count: 6 },
    { type: 1, count: 8 },
    { type: 1, count: 10 },
    { type: 1, count: 12 },
    { type: 1, count: 20 }
  ];

  // строим окно
  this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'daily-bg');
  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 240, this.state.lang.dailyAwards, {
    font: '26px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0.5, 0.5);
  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 190, this.state.lang.dailyDescr, {
    font: '16px Shadow',
    color: '#FFE065',
    align: 'center',
    wordWrap: { width: 300 }
  }).setOrigin(0.5, 0.5);

  let takeBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 360, 'middle-button');
  let takeText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 357, this.state.lang.pickUp, {
    font: '22px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0.5, 0.5);

  let position1: Iposition = {
    x: this.cameras.main.centerX - 130,
    y: this.cameras.main.centerY - 50
  }
  
  let position2: Iposition = {
    x: this.cameras.main.centerX,
    y: this.cameras.main.centerY - 50
  }

  let position3: Iposition = {
    x: this.cameras.main.centerX + 130,
    y: this.cameras.main.centerY - 50
  }
  
  let position4: Iposition = {
    x: this.cameras.main.centerX - 130,
    y: this.cameras.main.centerY + 100
  }
  
  let position5: Iposition = {
    x: this.cameras.main.centerX,
    y: this.cameras.main.centerY + 100
  }

  let position6: Iposition = {
    x: this.cameras.main.centerX + 130,
    y: this.cameras.main.centerY + 100
  }

  let position7: Iposition = {
    x: this.cameras.main.centerX,
    y: this.cameras.main.centerY + 250
  }

  let bg1: Phaser.GameObjects.Sprite = this.add.sprite(position1.x, position1.y, 'award-bg')
    .setTint(0x777777)
    .setDepth(2);
  let bg2: Phaser.GameObjects.Sprite = this.add.sprite(position2.x, position2.y, 'award-bg')
    .setTint(0x777777)
    .setDepth(2);
  let bg3: Phaser.GameObjects.Sprite = this.add.sprite(position3.x, position3.y, 'award-bg')
    .setTint(0x777777)
    .setDepth(2);
  let bg4: Phaser.GameObjects.Sprite = this.add.sprite(position4.x, position4.y, 'award-bg')
    .setTint(0x777777)
    .setDepth(2);
  let bg5: Phaser.GameObjects.Sprite = this.add.sprite(position5.x, position5.y, 'award-bg')
    .setTint(0x777777)
    .setDepth(2);
  let bg6: Phaser.GameObjects.Sprite = this.add.sprite(position6.x, position6.y, 'award-bg')
    .setTint(0x777777)
    .setDepth(2);
  let bg7: Phaser.GameObjects.Sprite = this.add.sprite(position7.x, position7.y, 'award-bg')
    .setTint(0x777777)
    .setDepth(2);

  let achievement1: Phaser.GameObjects.Sprite = this.add.sprite(position1.x, position1.y + 35, 'achievement-daily')
    .setTint(0x777777)
    .setOrigin(0.5, 0)
    .setDepth(3);

  let achievement2: Phaser.GameObjects.Sprite = this.add.sprite(position2.x, position2.y + 35, 'achievement-daily')
    .setTint(0x777777)
    .setOrigin(0.5, 0)
    .setDepth(3);

  let achievement3: Phaser.GameObjects.Sprite = this.add.sprite(position3.x, position3.y + 35, 'achievement-daily')
    .setTint(0x777777)
    .setOrigin(0.5, 0)
    .setDepth(3);

  let achievement4: Phaser.GameObjects.Sprite = this.add.sprite(position4.x, position4.y + 35, 'achievement-daily')
    .setTint(0x777777)
    .setOrigin(0.5, 0)
    .setDepth(3);

  let achievement5: Phaser.GameObjects.Sprite = this.add.sprite(position5.x, position5.y + 35, 'achievement-daily')
    .setTint(0x777777)
    .setOrigin(0.5, 0)
    .setDepth(3);

  let achievement6: Phaser.GameObjects.Sprite = this.add.sprite(position6.x, position6.y + 35, 'achievement-daily')
    .setTint(0x777777)
    .setOrigin(0.5, 0)
    .setDepth(3);

  let achievement7: Phaser.GameObjects.Sprite = this.add.sprite(position7.x, position7.y + 35, 'achievement-daily')
    .setTint(0x777777)
    .setOrigin(0.5, 0)
    .setDepth(3);

  let award1: Phaser.GameObjects.Sprite;
  let award2: Phaser.GameObjects.Sprite;
  let award3: Phaser.GameObjects.Sprite;
  let award4: Phaser.GameObjects.Sprite;
  let award5: Phaser.GameObjects.Sprite;
  let award6: Phaser.GameObjects.Sprite;
  let award7: Phaser.GameObjects.Sprite;

  if (awards[0].type === 1) {
    award1 = this.add.sprite(position1.x, position1.y, 'diamond').setTint(0x999999).setScale(0.27).setDepth(3);
  }

  if (awards[1].type === 1) {
    award2 = this.add.sprite(position2.x, position2.y, 'diamond').setTint(0x999999).setScale(0.27).setDepth(3);
  }

  if (awards[2].type === 1) {
    award3 = this.add.sprite(position3.x, position3.y, 'diamond').setTint(0x999999).setScale(0.27).setDepth(3);
  }

  if (awards[3].type === 1) {
    award4 = this.add.sprite(position4.x, position4.y, 'diamond').setTint(0x999999).setScale(0.27).setDepth(3);
  }

  if (awards[4].type === 1) {
    award5 = this.add.sprite(position5.x, position5.y, 'diamond').setTint(0x999999).setScale(0.27).setDepth(3);
  }

  if (awards[5].type === 1) {
    award6 = this.add.sprite(position6.x, position6.y, 'diamond').setTint(0x999999).setScale(0.27).setDepth(3);
  }

  if (awards[6].type === 1) {
    award7 = this.add.sprite(position7.x, position7.y, 'diamond').setTint(0x999999).setScale(0.27).setDepth(3);
  }

  let day1: Phaser.GameObjects.Text = this.add.text(position1.x, position1.y + 40, this.state.lang.day + ' 1', {
    font: '22px Shadow',
    color: '#783C10'
  }).setOrigin(0.5, 0).setTint(0x777777).setDepth(3);

  let day2: Phaser.GameObjects.Text = this.add.text(position2.x, position2.y + 40, this.state.lang.day + ' 2', {
    font: '22px Shadow',
    color: '#783C10'
  }).setOrigin(0.5, 0).setTint(0x777777).setDepth(3);

  let day3: Phaser.GameObjects.Text = this.add.text(position3.x, position3.y + 40, this.state.lang.day + ' 3', {
    font: '22px Shadow',
    color: '#783C10'
  }).setOrigin(0.5, 0).setTint(0x777777).setDepth(3);

  let day4: Phaser.GameObjects.Text = this.add.text(position4.x, position4.y + 40, this.state.lang.day + ' 4', {
    font: '22px Shadow',
    color: '#783C10'
  }).setOrigin(0.5, 0).setTint(0x777777).setDepth(3);

  let day5: Phaser.GameObjects.Text = this.add.text(position5.x, position5.y + 40, this.state.lang.day + ' 5', {
    font: '22px Shadow',
    color: '#783C10'
  }).setOrigin(0.5, 0).setTint(0x777777).setDepth(3);

  let day6: Phaser.GameObjects.Text = this.add.text(position6.x, position6.y + 40, this.state.lang.day + ' 6', {
    font: '22px Shadow',
    color: '#783C10'
  }).setOrigin(0.5, 0).setTint(0x777777).setDepth(3);

  let day7: Phaser.GameObjects.Text = this.add.text(position7.x, position7.y + 40, this.state.lang.day + ' 7', {
    font: '22px Shadow',
    color: '#783C10'
  }).setOrigin(0.5, 0).setTint(0x777777).setDepth(3);

  let gift: Phaser.GameObjects.Sprite = this.add.sprite(position7.x, position7.y - 15, 'gift')
    .setTint(0x777777)
    .setDepth(3);
  
  let count1: Phaser.GameObjects.Text = this.add.text(position1.x, position1.y + 15, String(awards[0].count), {
    font: '22px Shadow',
    color: '#CCCCCC'
  }).setOrigin(0.5, 0.5).setDepth(4);
  let bubble1 = this.add.graphics({ x: position1.x - 33, y: position1.y }).setDepth(3);
  bubble1.fillStyle(0xFFCC948, 0.4);
  bubble1.fillRoundedRect(0, 0, 66, 30, 5);
  
  let count2: Phaser.GameObjects.Text = this.add.text(position2.x, position2.y + 15, String(awards[1].count), {
    font: '22px Shadow',
    color: '#CCCCCC'
  }).setOrigin(0.5, 0.5).setDepth(4);
  let bubble2 = this.add.graphics({ x: position2.x - 34, y: position2.y }).setDepth(3);
  bubble2.fillStyle(0xFFCC948, 0.4);
  bubble2.fillRoundedRect(0, 0, 66, 30, 5);

  let count3: Phaser.GameObjects.Text = this.add.text(position3.x, position3.y + 15, String(awards[2].count), {
    font: '22px Shadow',
    color: '#CCCCCC'
  }).setOrigin(0.5, 0.5).setDepth(4);
  let bubble3 = this.add.graphics({ x: position3.x - 34, y: position3.y }).setDepth(3);
  bubble3.fillStyle(0xFFCC948, 0.4);
  bubble3.fillRoundedRect(0, 0, 66, 30, 5);
  
  let count4: Phaser.GameObjects.Text = this.add.text(position4.x, position4.y + 15, String(awards[3].count), {
    font: '22px Shadow',
    color: '#CCCCCC'
  }).setOrigin(0.5, 0.5).setDepth(4);
  let bubble4 = this.add.graphics({ x: position4.x - 34, y: position4.y }).setDepth(3);
  bubble4.fillStyle(0xFFCC948, 0.4);
  bubble4.fillRoundedRect(0, 0, 66, 30, 5);

  let count5: Phaser.GameObjects.Text = this.add.text(position5.x, position5.y + 15, String(awards[4].count), {
    font: '22px Shadow',
    color: '#CCCCCC'
  }).setOrigin(0.5, 0.5).setDepth(4);
  let bubble5 = this.add.graphics({ x: position5.x - 34, y: position5.y }).setDepth(3);
  bubble5.fillStyle(0xFFCC948, 0.4);
  bubble5.fillRoundedRect(0, 0, 66, 30, 5);

  let count6: Phaser.GameObjects.Text = this.add.text(position6.x, position6.y + 15, String(awards[5].count), {
    font: '22px Shadow',
    color: '#CCCCCC'
  }).setOrigin(0.5, 0.5).setDepth(4);
  let bubble6 = this.add.graphics({ x: position6.x - 34, y: position6.y }).setDepth(3);
  bubble6.fillStyle(0xFFCC948, 0.4);
  bubble6.fillRoundedRect(0, 0, 66, 30, 5);

  let count7: Phaser.GameObjects.Text = this.add.text(position7.x, position7.y + 15, String(awards[6].count), {
    font: '22px Shadow',
    color: '#CCCCCC'
  }).setOrigin(0.5, 0.5).setDepth(4);
  let bubble7 = this.add.graphics({ x: position7.x - 34, y: position7.y }).setDepth(3);
  bubble7.fillStyle(0xFFCC948, 0.4);
  bubble7.fillRoundedRect(0, 0, 66, 30, 5);

  if (this.state.daily === 1) {

    bg1.setTint(0xFFFFFF);
    achievement1.setTint(0xFFFFFF);
    day1.setTint(0xFFFFFF);
    award1.setTint(0xFFFFFF);
    count1.setColor('#FFFFFF');
    bubble1.clear();
    bubble1.fillStyle(0xFFCC948, 0.6);
    bubble1.fillRoundedRect(0, 0, 70, 30, 5);
    this.add.sprite(position1.x, position1.y, 'flash-daily').setDepth(1);

  } else if (this.state.daily === 2) {

    bg2.setTint(0xFFFFFF);
    achievement2.setTint(0xFFFFFF);
    day2.setTint(0xFFFFFF);
    award2.setTint(0xFFFFFF);
    count2.setColor('#FFFFFF');
    bubble2.clear();
    bubble2.fillStyle(0xFFCC948, 0.6);
    bubble2.fillRoundedRect(0, 0, 70, 30, 5);
    this.add.sprite(position2.x, position2.y, 'flash-daily').setDepth(1);
    this.add.sprite(position1.x - 47, position1.y + 42, 'completed').setScale(0.5).setDepth(4);

  } else if (this.state.daily === 3) {

    bg3.setTint(0xFFFFFF);
    achievement3.setTint(0xFFFFFF);
    day3.setTint(0xFFFFFF);
    award3.setTint(0xFFFFFF);
    count3.setColor('#FFFFFF');
    bubble3.clear();
    bubble3.fillStyle(0xFFCC948, 0.6);
    bubble3.fillRoundedRect(0, 0, 70, 30, 5);
    this.add.sprite(position3.x, position3.y, 'flash-daily').setDepth(1);
    this.add.sprite(position1.x - 47, position1.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position2.x - 47, position2.y + 42, 'completed').setScale(0.5).setDepth(4);

  } else if (this.state.daily === 4) {

    bg4.setTint(0xFFFFFF);
    achievement4.setTint(0xFFFFFF);
    day4.setTint(0xFFFFFF);
    award4.setTint(0xFFFFFF);
    count4.setColor('#FFFFFF');
    bubble4.clear();
    bubble4.fillStyle(0xFFCC948, 0.6);
    bubble4.fillRoundedRect(0, 0, 70, 30, 5);
    this.add.sprite(position4.x, position4.y, 'flash-daily').setDepth(1);
    this.add.sprite(position1.x - 47, position1.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position2.x - 47, position2.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position3.x - 47, position2.y + 42, 'completed').setScale(0.5).setDepth(4);

  } else if (this.state.daily === 5) {

    bg5.setTint(0xFFFFFF);
    achievement5.setTint(0xFFFFFF);
    day5.setTint(0xFFFFFF);
    award5.setTint(0xFFFFFF);
    count5.setColor('#FFFFFF');
    bubble5.clear();
    bubble5.fillStyle(0xFFCC948, 0.6);
    bubble5.fillRoundedRect(0, 0, 70, 30, 5);
    this.add.sprite(position5.x, position5.y, 'flash-daily').setDepth(1);
    this.add.sprite(position1.x - 47, position1.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position2.x - 47, position2.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position3.x - 47, position2.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position4.x - 47, position4.y + 42, 'completed').setScale(0.5).setDepth(4);

  } else if (this.state.daily === 6) {

    bg6.setTint(0xFFFFFF);
    achievement6.setTint(0xFFFFFF);
    day6.setTint(0xFFFFFF);
    award6.setTint(0xFFFFFF);
    count6.setColor('#FFFFFF');
    bubble6.clear();
    bubble6.fillStyle(0xFFCC948, 0.6);
    bubble6.fillRoundedRect(0, 0, 70, 30, 5);
    this.add.sprite(position6.x, position6.y, 'flash-daily').setDepth(1);
    this.add.sprite(position1.x - 47, position1.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position2.x - 47, position2.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position3.x - 47, position2.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position4.x - 47, position4.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position5.x - 47, position5.y + 42, 'completed').setScale(0.5).setDepth(4);

  } else if (this.state.daily === 7) {
    
    bg7.setTint(0xFFFFFF);
    achievement7.setTint(0xFFFFFF);
    day7.setTint(0xFFFFFF);
    award7.setTint(0xFFFFFF);
    count1.setColor('#FFFFFF');
    bubble7.clear();
    bubble7.fillStyle(0xFFCC948, 0.6);
    bubble7.fillRoundedRect(0, 0, 70, 30, 5);
    this.add.sprite(position7.x, position7.y, 'flash-daily').setDepth(1);
    gift.setVisible(false);
    this.add.sprite(position1.x - 47, position1.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position2.x - 47, position2.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position3.x - 47, position2.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position4.x - 47, position4.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position5.x - 47, position5.y + 42, 'completed').setScale(0.5).setDepth(4);
    this.add.sprite(position6.x - 47, position6.y + 42, 'completed').setScale(0.5).setDepth(4);

  } else {

    bg1.setTint(0xFFFFFF);
    achievement1.setTint(0xFFFFFF);
    day1.setTint(0xFFFFFF);
    award1.setTint(0xFFFFFF);
    count1.setColor('#FFFFFF');
    bubble1.clear();
    bubble1.fillStyle(0xFFCC948, 0.6);
    bubble1.fillRoundedRect(0, 0, 70, 30, 5);
    this.add.sprite(position1.x, position1.y, 'flash-daily').setDepth(1);
  
  }

  if (this.state.daily !== 7) {
    
    award7.setVisible(false);
    count7.setVisible(false);
    bubble7.clear();

  }

  this.clickModalBtn({ btn: takeBtn, title: takeText }, (): void => {

    if (day > 6) day = 0;

    if (awards[day].type === 1) {
      this.state.user.diamonds += awards[day].count;

      this.state.amplitude.getInstance().logEvent('diamonds_get', {
        type: 'daily_award',
        count: awards[day].count,
        farm_id: this.state.farm,
        chapter: this.state[`user${this.state.farm}`].part,
      });

      this.game.scene.keys[`${this.state.farm}Bars`].getCurrency({ x: this.cameras.main.centerX, y: this.cameras.main.centerY }, awards[day].count, 'diamond');
    }

    this.state.daily = false;
    this.state.user.takenReward = true;
    this.scene.stop();

  });
  
  this.openModal(this.cameras.main);

}

export default daily;
