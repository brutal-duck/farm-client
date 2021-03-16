import axios from 'axios';
import { shortNum, shortTime } from '../../general/basic';

function dailyNewbie(): void {

  // автоматически собранная награда открытия куриной фермы
  if (this.state.progress.chicken.part > 0 && this.state.daily === 4) {

    this.state.user.takenReward = true;
    axios.post(process.env.API + "/takenNewbieReward", { hash: this.state.user.hash });

  }

  // фон
  let bg: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'newbie-bg');

  let close: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + bg.displayWidth / 2 - 45, this.cameras.main.centerY - bg.displayHeight / 2 + 40, 'tasks-close').setDepth(2);

  this.clickButton(close, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].takeNewbieAward();
  });
  // заголовок
  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 350, this.state.lang.newbieAwards, {
    font: '36px Shadow',
    color: '#044677'
  }).setOrigin(0.5, 0.5);

  this.add.text(this.cameras.main.centerX - 3, this.cameras.main.centerY - 240, this.state.lang.stillTimeAward + ' ' + shortTime(this.state.newbieTime, this.state.lang), {
    font: '21px Shadow',
    color: '#FCC97E'
  }).setOrigin(0.5, 0.5);

  let timerText: Phaser.GameObjects.Text = this.add.text(0, this.cameras.main.centerY - 310, this.state.lang.toNextAward, {
    font: '21px Shadow',
    color: '#F4FEFF'
  }).setOrigin(0, 0.5);

  this.timerNewbieAward = this.add.text(0, this.cameras.main.centerY - 310, shortTime(this.state.timeToNewDay, this.state.lang), {
    font: '21px Shadow',
    color: '#E9B744'
  }).setOrigin(0, 0.5);

  let width: number = timerText.displayWidth + this.timerNewbieAward.displayWidth + 5;
  timerText.setX(this.cameras.main.centerX - width / 2);
  this.timerNewbieAward.setX(timerText.getBounds().right + 5);

  
  // дни
  let textAwardLitle0: Phaser.GameObjects.Text;
  let textAward0: Phaser.GameObjects.Text;
  let day0: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY - 200 + 90, 'newbie-day-0');
  let bgDay0: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY - 268 + 90, 'day-yellow');
  let textDay0: Phaser.GameObjects.Text = this.add.text(195, this.cameras.main.centerY - 272 + 90, this.state.lang.day + ' 0', {
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

  let day1: Phaser.GameObjects.Sprite = this.add.sprite(355, this.cameras.main.centerY - 210+ 90, 'newbie-day-1');
  let bgDay1: Phaser.GameObjects.Sprite = this.add.sprite(355, this.cameras.main.centerY - 280+ 90, 'day-purple');
  let textDay1: Phaser.GameObjects.Text = this.add.text(355, this.cameras.main.centerY - 283+ 90, this.state.lang.day + ' 1', {
    font: '20px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5);
  let textAward1: Phaser.GameObjects.Text = this.add.text(400, this.cameras.main.centerY - 175+ 90, '5', {
    font: '64px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#5226A3', 4);
  let textAwardLitle1: Phaser.GameObjects.Text = this.add.text(365, this.cameras.main.centerY - 175+ 90, 'x', {
    font: '34px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#5226A3', 4);

  let day2: Phaser.GameObjects.Sprite = this.add.sprite(515, this.cameras.main.centerY - 200+ 90, 'newbie-day-2');
  let bgDay2: Phaser.GameObjects.Sprite = this.add.sprite(515, this.cameras.main.centerY - 268+ 90, 'day-yellow');
  let textDay2: Phaser.GameObjects.Text = this.add.text(515, this.cameras.main.centerY - 272+ 90, this.state.lang.day + ' 2', {
    font: '20px Shadow',
    color: '#B05B00'
  }).setOrigin(0.5, 0.5);
  let textAward2: Phaser.GameObjects.Text = this.add.text(505, this.cameras.main.centerY - 175+ 90, '3', {
    font: '58px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);
  let textAwardLitle2: Phaser.GameObjects.Text = this.add.text(475, this.cameras.main.centerY - 178+ 90, 'x', {
    font: '24px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);

  let textAwardLitle3: Phaser.GameObjects.Text;
  let textAward3: Phaser.GameObjects.Text;
  let day3: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY - 30+ 90, 'newbie-day-3');
  let bgDay3: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY - 100+ 90, 'day-purple');
  let textDay3: Phaser.GameObjects.Text = this.add.text(195, this.cameras.main.centerY - 103+ 90, this.state.lang.day + ' 3', {
    font: '20px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5);

  let day4: Phaser.GameObjects.Sprite = this.add.sprite(360, this.cameras.main.centerY - 25+ 90, 'newbie-day-4');
  let bgDay4: Phaser.GameObjects.Sprite = this.add.sprite(360, this.cameras.main.centerY - 95+ 90, 'day-yellow');
  let textDay4: Phaser.GameObjects.Text = this.add.text(360, this.cameras.main.centerY - 99+ 90, this.state.lang.day + ' 4', {
    font: '20px Shadow',
    color: '#B05B00'
  }).setOrigin(0.5, 0.5);
  let textAward4: Phaser.GameObjects.Text = this.add.text(382, this.cameras.main.centerY + 10+ 90, '3', {
    font: '44px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);
  let textAwardLitle4: Phaser.GameObjects.Text = this.add.text(405, this.cameras.main.centerY + 13 + 90, this.state.lang.shortHours, {
    font: '24px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);

  let day5: Phaser.GameObjects.Sprite = this.add.sprite(515, this.cameras.main.centerY - 25 + 90, 'newbie-day-5');
  let bgDay5: Phaser.GameObjects.Sprite = this.add.sprite(515, this.cameras.main.centerY - 95 + 90, 'day-yellow');
  let textDay5: Phaser.GameObjects.Text = this.add.text(515, this.cameras.main.centerY - 99 + 90, this.state.lang.day + ' 5', {
    font: '20px Shadow',
    color: '#B05B00'
  }).setOrigin(0.5, 0.5);
  let textAward5: Phaser.GameObjects.Text = this.add.text(505, this.cameras.main.centerY + 90, '3', {
    font: '58px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);
  let textAwardLitle5: Phaser.GameObjects.Text = this.add.text(475, this.cameras.main.centerY - 3 + 90, 'x', {
    font: '24px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);

  let day6: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY + 155 + 90, 'newbie-day-6');
  let bgDay6: Phaser.GameObjects.Sprite = this.add.sprite(195, this.cameras.main.centerY + 85 + 90, 'day-yellow');
  let textDay6: Phaser.GameObjects.Text = this.add.text(195, this.cameras.main.centerY + 82 + 90, this.state.lang.day + ' 6', {
    font: '20px Shadow',
    color: '#B05B00'
  }).setOrigin(0.5, 0.5);
  let textAward6: Phaser.GameObjects.Text = this.add.text(220, this.cameras.main.centerY + 192 + 90, '3', {
    font: '42px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);
  let textAwardLitle6: Phaser.GameObjects.Text = this.add.text(241, this.cameras.main.centerY + 192 + 90, this.state.lang.shortHours, {
    font: '22px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);

  let day7: Phaser.GameObjects.Sprite = this.add.sprite(425, this.cameras.main.centerY + 155 + 90, 'newbie-day-7');
  let bgDay7: Phaser.GameObjects.Sprite = this.add.sprite(425, this.cameras.main.centerY + 75 + 90, 'day-red');
  let textDay7: Phaser.GameObjects.Text = this.add.text(425, this.cameras.main.centerY + 73 + 90, this.state.lang.day + ' 7', {
    font: '22px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5);
  let textAward7: Phaser.GameObjects.Text = this.add.text(440, this.cameras.main.centerY + 202 + 90, '10', {
    font: '66px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#5226A3', 5).setAngle(3);
  let textAwardLitle7: Phaser.GameObjects.Text = this.add.text(393, this.cameras.main.centerY + 212 + 90, 'x', {
    font: '34px Shadow',
    color: '#FFF0F0'
  }).setOrigin(0.5, 0.5).setStroke('#5226A3', 5);

  this.click(bg, () => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].takeNewbieAward();
  })

  

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

  const animation = (): void => {
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

  bg[`preUpdate`] = () => {
    if (this.state.timeToNewDay <= 0 && this.state.user.takenReward) {
      this.state.daily++;
      this.state.user.takenReward = false;
      animation();
    }
  }

}

export default dailyNewbie;
