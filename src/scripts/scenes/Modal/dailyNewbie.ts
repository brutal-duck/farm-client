import axios from 'axios';
import { shortNum } from '../../general/basic';

function dailyNewbie(): void {

  // автоматически собранная награда открытия куриной фермы
  if (this.state.progress.chicken.part > 0 && this.state.daily === 4) {

    this.state.user.takenReward = true;
    axios.post(process.env.API + "/takenNewbieReward", { hash: this.state.user.hash });

  }

  // фон
  this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - 40, 'newbie-bg');

  // заголовок
  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 392, this.state.lang.dailyAwards, {
    font: '36px Shadow',
    color: '#FFEFD5'
  }).setOrigin(0.5, 0.5);

  // таймер
  let textTimer: string = this.state.lang.newbieTimer;
  let days: number = Math.floor(this.state.newbieTime / 86400);
  let hours: number = Math.floor((this.state.newbieTime % 86400) / 3600);
  textTimer = textTimer.replace('$1', String(days));
  textTimer = textTimer.replace('$2', String(hours));

  this.add.text(this.cameras.main.centerX - 3, this.cameras.main.centerY - 323, textTimer, {
    font: '21px Shadow',
    color: '#7E3812'
  }).setOrigin(0.5, 0.5);

  // дни
  let textAwardLitle0: Phaser.GameObjects.Text;
  let textAward0: Phaser.GameObjects.Text;
  let day0: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY - 200, 'newbie-day-0');
  let bgDay0: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY - 268, 'day-yellow');
  let textDay0: Phaser.GameObjects.Text = this.add.text(195, this.cameras.main.centerY - 272, this.state.lang.day + ' 0', {
    font: '20px Shadow',
    color: '#B05B00'
  }).setOrigin(0.5, 0.5);
  
  if (this.state.farm === 'Sheep' && this.state.daily === 1 && !this.state.user.takenReward) {

    let money: string | number = shortNum(this.game.scene.keys[this.state.farm].convertDiamonds(10));
    textAwardLitle0 = this.add.text(203, this.cameras.main.centerY - 200, money, {
      font: '34px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5D4D2B', 4);

    let x: number = textAwardLitle0.getBounds().left;
    textAward0 = this.add.text(x - 10, this.cameras.main.centerY - 200, 'x', {
      font: '24px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5D4D2B', 4);

  }

  let day1: Phaser.GameObjects.Sprite = this.add.sprite(355, this.cameras.main.centerY - 210, 'newbie-day-1');
  let bgDay1: Phaser.GameObjects.Sprite = this.add.sprite(355, this.cameras.main.centerY - 280, 'day-purple');
  let textDay1: Phaser.GameObjects.Text = this.add.text(355, this.cameras.main.centerY - 283, this.state.lang.day + ' 1', {
    font: '20px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5);
  let textAward1: Phaser.GameObjects.Text = this.add.text(400, this.cameras.main.centerY - 175, '5', {
    font: '64px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#5226A3', 4);
  let textAwardLitle1: Phaser.GameObjects.Text = this.add.text(365, this.cameras.main.centerY - 175, 'x', {
    font: '34px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#5226A3', 4);

  let day2: Phaser.GameObjects.Sprite = this.add.sprite(515, this.cameras.main.centerY - 200, 'newbie-day-2');
  let bgDay2: Phaser.GameObjects.Sprite = this.add.sprite(515, this.cameras.main.centerY - 268, 'day-yellow');
  let textDay2: Phaser.GameObjects.Text = this.add.text(515, this.cameras.main.centerY - 272, this.state.lang.day + ' 2', {
    font: '20px Shadow',
    color: '#B05B00'
  }).setOrigin(0.5, 0.5);
  let textAward2: Phaser.GameObjects.Text = this.add.text(505, this.cameras.main.centerY - 175, '3', {
    font: '58px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);
  let textAwardLitle2: Phaser.GameObjects.Text = this.add.text(475, this.cameras.main.centerY - 178, 'x', {
    font: '24px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);

  let textAwardLitle3: Phaser.GameObjects.Text;
  let textAward3: Phaser.GameObjects.Text;
  let day3: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY - 30, 'newbie-day-3');
  let bgDay3: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY - 100, 'day-purple');
  let textDay3: Phaser.GameObjects.Text = this.add.text(195, this.cameras.main.centerY - 103, this.state.lang.day + ' 3', {
    font: '20px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5);

  let day4: Phaser.GameObjects.Sprite = this.add.sprite(360, this.cameras.main.centerY - 25, 'newbie-day-4');
  let bgDay4: Phaser.GameObjects.Sprite = this.add.sprite(360, this.cameras.main.centerY - 95, 'day-yellow');
  let textDay4: Phaser.GameObjects.Text = this.add.text(360, this.cameras.main.centerY - 99, this.state.lang.day + ' 4', {
    font: '20px Shadow',
    color: '#B05B00'
  }).setOrigin(0.5, 0.5);
  let textAward4: Phaser.GameObjects.Text = this.add.text(382, this.cameras.main.centerY + 10, '3', {
    font: '44px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);
  let textAwardLitle4: Phaser.GameObjects.Text = this.add.text(405, this.cameras.main.centerY + 13, this.state.lang.shortHours, {
    font: '24px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);

  let day5: Phaser.GameObjects.Sprite = this.add.sprite(515, this.cameras.main.centerY - 25, 'newbie-day-5');
  let bgDay5: Phaser.GameObjects.Sprite = this.add.sprite(515, this.cameras.main.centerY - 95, 'day-yellow');
  let textDay5: Phaser.GameObjects.Text = this.add.text(515, this.cameras.main.centerY - 99, this.state.lang.day + ' 5', {
    font: '20px Shadow',
    color: '#B05B00'
  }).setOrigin(0.5, 0.5);
  let textAward5: Phaser.GameObjects.Text = this.add.text(505, this.cameras.main.centerY, '3', {
    font: '58px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);
  let textAwardLitle5: Phaser.GameObjects.Text = this.add.text(475, this.cameras.main.centerY - 3, 'x', {
    font: '24px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);

  let day6: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY + 155, 'newbie-day-6');
  let bgDay6: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY + 85, 'day-yellow');
  let textDay6: Phaser.GameObjects.Text = this.add.text(195, this.cameras.main.centerY + 82, this.state.lang.day + ' 6', {
    font: '20px Shadow',
    color: '#B05B00'
  }).setOrigin(0.5, 0.5);
  let textAward6: Phaser.GameObjects.Text = this.add.text(220, this.cameras.main.centerY + 192, '3', {
    font: '42px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);
  let textAwardLitle6: Phaser.GameObjects.Text = this.add.text(241, this.cameras.main.centerY + 192, this.state.lang.shortHours, {
    font: '22px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);

  let day7: Phaser.GameObjects.Sprite = this.add.sprite(425, this.cameras.main.centerY + 155, 'newbie-day-7');
  let bgDay7: Phaser.GameObjects.Sprite = this.add.sprite(425, this.cameras.main.centerY + 75, 'day-red');
  let textDay7: Phaser.GameObjects.Text = this.add.text(425, this.cameras.main.centerY + 73, this.state.lang.day + ' 7', {
    font: '22px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5);
  let textAward7: Phaser.GameObjects.Text = this.add.text(440, this.cameras.main.centerY + 202, '10', {
    font: '66px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#5226A3', 5).setAngle(3);
  let textAwardLitle7: Phaser.GameObjects.Text = this.add.text(393, this.cameras.main.centerY + 212, 'x', {
    font: '34px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#5226A3', 5);

  // кнопка забрать
  let textBtn: string = this.state.lang.pickUp;
  
  if (this.state.user.takenReward) textBtn = this.state.lang.close;

  let btn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + 311, 'done-chapter-button');
  let title: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 303, textBtn, {
    font: '32px Shadow',
    fill: '#FFD2D2',
    align: 'center'
  }).setOrigin(0.5, 0.5).setStroke('#2C5D0C', 5);

  this.clickModalBtn({ btn, title }, (): void => {

    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].takeNewbieAward();

  });

  // завершенные
  if (this.state.daily === 1) {

    if (this.state.user.takenReward) {

      this.add.sprite(day0.x, day0.y, 'award-received');
      day0.setTint(0x999999);

    }

  } else if (this.state.daily === 2) {

    this.add.sprite(day0.x, day0.y, 'award-received');
    day0.setTint(0x999999);

    if (this.state.user.takenReward) {

      this.add.sprite(day1.x, day1.y, 'award-received');
      day1.setTint(0x999999);
      textAward1.setTint(0x999999);
      textAwardLitle1.setTint(0x999999);

    }

  } else if (this.state.daily === 3) {

    this.add.sprite(day0.x, day0.y, 'award-received');
    day0.setTint(0x999999);
    this.add.sprite(day1.x, day1.y, 'award-received');
    day1.setTint(0x999999);
    textAward1.setTint(0x999999);
    textAwardLitle1.setTint(0x999999);

    if (this.state.user.takenReward) {

      this.add.sprite(day2.x, day2.y, 'award-received');
      day2.setTint(0x999999);
      textAward2.setTint(0x999999);
      textAwardLitle2.setTint(0x999999);

    }

  } else if (this.state.daily === 4) {

    this.add.sprite(day0.x, day0.y, 'award-received');
    day0.setTint(0x999999);
    this.add.sprite(day1.x, day1.y, 'award-received');
    day1.setTint(0x999999);
    textAward1.setTint(0x999999);
    textAwardLitle1.setTint(0x999999);
    this.add.sprite(day2.x, day2.y, 'award-received');
    day2.setTint(0x999999);
    textAward2.setTint(0x999999);
    textAwardLitle2.setTint(0x999999);

    if (this.state.user.takenReward) {

      this.add.sprite(day3.x, day3.y, 'award-received');
      day3.setTint(0x999999);

    }

  } else if (this.state.daily === 5) {

    this.add.sprite(day0.x, day0.y, 'award-received');
    day0.setTint(0x999999);
    this.add.sprite(day1.x, day1.y, 'award-received');
    day1.setTint(0x999999);
    textAward1.setTint(0x999999);
    textAwardLitle1.setTint(0x999999);
    this.add.sprite(day2.x, day2.y, 'award-received');
    day2.setTint(0x999999);
    textAward2.setTint(0x999999);
    textAwardLitle2.setTint(0x999999);
    this.add.sprite(day3.x, day3.y, 'award-received');
    day3.setTint(0x999999);

    if (this.state.user.takenReward) {

      this.add.sprite(day4.x, day4.y, 'award-received');
      day4.setTint(0x999999);
      textAward4.setTint(0x999999);
      textAwardLitle4.setTint(0x999999);

    }

  } else if (this.state.daily === 6) {

    this.add.sprite(day0.x, day0.y, 'award-received');
    day0.setTint(0x999999);
    this.add.sprite(day1.x, day1.y, 'award-received');
    day1.setTint(0x999999);
    textAward1.setTint(0x999999);
    textAwardLitle1.setTint(0x999999);
    this.add.sprite(day2.x, day2.y, 'award-received');
    day2.setTint(0x999999);
    textAward2.setTint(0x999999);
    textAwardLitle2.setTint(0x999999);
    this.add.sprite(day3.x, day3.y, 'award-received');
    day3.setTint(0x999999);
    this.add.sprite(day4.x, day4.y, 'award-received');
    day4.setTint(0x999999);
    textAward4.setTint(0x999999);
    textAwardLitle4.setTint(0x999999);

    if (this.state.user.takenReward) {

      this.add.sprite(day5.x, day5.y, 'award-received');
      day5.setTint(0x999999);
      textAward5.setTint(0x999999);
      textAwardLitle5.setTint(0x999999);

    }

  } else if (this.state.daily === 7) {

    this.add.sprite(day0.x, day0.y, 'award-received');
    day0.setTint(0x999999);
    this.add.sprite(day1.x, day1.y, 'award-received');
    day1.setTint(0x999999);
    textAward1.setTint(0x999999);
    textAwardLitle1.setTint(0x999999);
    this.add.sprite(day2.x, day2.y, 'award-received');
    day2.setTint(0x999999);
    textAward2.setTint(0x999999);
    textAwardLitle2.setTint(0x999999);
    this.add.sprite(day3.x, day3.y, 'award-received');
    day3.setTint(0x999999);
    this.add.sprite(day4.x, day4.y, 'award-received');
    day4.setTint(0x999999);
    textAward4.setTint(0x999999);
    textAwardLitle4.setTint(0x999999);
    this.add.sprite(day5.x, day5.y, 'award-received');
    day5.setTint(0x999999);
    textAward5.setTint(0x999999);
    textAwardLitle5.setTint(0x999999);

    if (this.state.user.takenReward) {

      this.add.sprite(day6.x, day6.y, 'award-received');
      day6.setTint(0x999999);
      textAward6.setTint(0x999999);
      textAwardLitle6.setTint(0x999999);

    }

  } else if (this.state.daily === 8) {

    this.add.sprite(day0.x, day0.y, 'award-received');
    day0.setTint(0x999999);
    this.add.sprite(day1.x, day1.y, 'award-received');
    day1.setTint(0x999999);
    textAward1.setTint(0x999999);
    textAwardLitle1.setTint(0x999999);
    this.add.sprite(day2.x, day2.y, 'award-received');
    day2.setTint(0x999999);
    textAward2.setTint(0x999999);
    textAwardLitle2.setTint(0x999999);
    this.add.sprite(day3.x, day3.y, 'award-received');
    day3.setTint(0x999999);
    this.add.sprite(day4.x, day4.y, 'award-received');
    day4.setTint(0x999999);
    textAward4.setTint(0x999999);
    textAwardLitle4.setTint(0x999999);
    this.add.sprite(day5.x, day5.y, 'award-received');
    day5.setTint(0x999999);
    textAward5.setTint(0x999999);
    textAwardLitle5.setTint(0x999999);
    this.add.sprite(day6.x, day6.y, 'award-received');
    day6.setTint(0x999999);
    textAward6.setTint(0x999999);
    textAwardLitle6.setTint(0x999999);

  }

  // анимация
  if (!this.state.user.takenReward) {

    let day: Phaser.GameObjects.Sprite;
    let bgDay: Phaser.GameObjects.Sprite;
    let textDay: Phaser.GameObjects.Text;
    let textAward: Phaser.GameObjects.Text;
    let textAwardLitle: Phaser.GameObjects.Text;

    if (this.state.daily === 1) {
      
      day = day0;
      bgDay = bgDay0;
      textDay = textDay0;
      textAward = textAward0;
      textAwardLitle = textAwardLitle0;

    } else if (this.state.daily === 2) {

      day = day1;
      bgDay = bgDay1;
      textDay = textDay1;
      textAward = textAward1;
      textAwardLitle = textAwardLitle1;

    } else if (this.state.daily === 3) {

      day = day2;
      bgDay = bgDay2;
      textDay = textDay2;
      textAward = textAward2;
      textAwardLitle = textAwardLitle2;

    } else if (this.state.daily === 4) {

      day = day3;
      bgDay = bgDay3;
      textDay = textDay3;
      textAward = textAward3;
      textAwardLitle = textAwardLitle3;

    } else if (this.state.daily === 5) {

      day = day4;
      bgDay = bgDay4;
      textDay = textDay4;
      textAward = textAward4;
      textAwardLitle = textAwardLitle4;

    } else if (this.state.daily === 6) {

      day = day5;
      bgDay = bgDay5;
      textDay = textDay5;
      textAward = textAward5;
      textAwardLitle = textAwardLitle5;

    } else if (this.state.daily === 7) {

      day = day6;
      bgDay = bgDay6;
      textDay = textDay6;
      textAward = textAward6;
      textAwardLitle = textAwardLitle6;

    } else if (this.state.daily === 8) {

      day = day7;
      bgDay = bgDay7;
      textDay = textDay7;
      textAward = textAward7;
      textAwardLitle = textAwardLitle7;

    } else {

      day = day0;
      bgDay = bgDay0;
      textDay = textDay0;
      textAward = textAward0;
      textAwardLitle = textAwardLitle0;

    }

    this.tweens.add({
      targets: [day, bgDay, textDay, textAward, textAwardLitle],
      y: '-=15',
      duration: 160,
      yoyo: true,
      repeat: -1,
      ease: 'Power1'
    });

  }

}

export default dailyNewbie;
