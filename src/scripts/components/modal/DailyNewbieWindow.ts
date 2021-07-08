import axios from 'axios';
import { shortNum, shortTime } from '../../general/basic';
import Chicken from '../../scenes/Chicken/Main';
import Cow from '../../scenes/Cow/Main';
import Unicorn from '../../scenes/Event/Unicorns/Main';
import Modal from '../../scenes/Modal/Modal';
import Sheep from '../../scenes/Sheep/Main';



export default class DailyNewbieWindow extends Phaser.GameObjects.Sprite {
  public scene: Modal;
  private closeBtn: Phaser.GameObjects.Sprite;
  private timerNewbieAward: Phaser.GameObjects.Text;
  private day0: Phaser.GameObjects.Sprite;
  private bgDay0: Phaser.GameObjects.Sprite;
  private textDay0: Phaser.GameObjects.Text;
  private textAward0: Phaser.GameObjects.Text;
  private textAwardLitle0: Phaser.GameObjects.Text;
  private day1: Phaser.GameObjects.Sprite;
  private bgDay1: Phaser.GameObjects.Sprite;
  private textDay1: Phaser.GameObjects.Text;
  private textAward1: Phaser.GameObjects.Text;
  private textAwardLitle1: Phaser.GameObjects.Text;
  private day2: Phaser.GameObjects.Sprite;
  private bgDay2: Phaser.GameObjects.Sprite;
  private textDay2: Phaser.GameObjects.Text;
  private textAward2: Phaser.GameObjects.Text;
  private textAwardLitle2: Phaser.GameObjects.Text;
  private day3: Phaser.GameObjects.Sprite;
  private bgDay3: Phaser.GameObjects.Sprite;
  private textDay3: Phaser.GameObjects.Text;
  private textAward3: Phaser.GameObjects.Text;
  private textAwardLitle3: Phaser.GameObjects.Text;
  private day4: Phaser.GameObjects.Sprite;
  private bgDay4: Phaser.GameObjects.Sprite;
  private textDay4: Phaser.GameObjects.Text;
  private textAward4: Phaser.GameObjects.Text;
  private textAwardLitle4: Phaser.GameObjects.Text;
  private day5: Phaser.GameObjects.Sprite;
  private bgDay5: Phaser.GameObjects.Sprite;
  private textDay5: Phaser.GameObjects.Text;
  private textAward5: Phaser.GameObjects.Text;
  private textAwardLitle5: Phaser.GameObjects.Text;
  private day6: Phaser.GameObjects.Sprite;
  private bgDay6: Phaser.GameObjects.Sprite;
  private textDay6: Phaser.GameObjects.Text;
  private textAward6: Phaser.GameObjects.Text;
  private textAwardLitle6: Phaser.GameObjects.Text;
  private day7: Phaser.GameObjects.Sprite;
  private bgDay7: Phaser.GameObjects.Sprite;
  private textDay7: Phaser.GameObjects.Text;
  private textAward7: Phaser.GameObjects.Text;
  private textAwardLitle7: Phaser.GameObjects.Text;

  constructor(scene: Modal) {
    super(scene, scene.cameras.main.centerX, scene.cameras.main.centerY, 'newbie-bg');
    this.init();
  }

  private init(): void {
    this.scene.add.existing(this);
    this.createElements();
    this.setListeners();

    if (this.scene.state.progress.chicken.part > 0 && this.scene.state.daily === 4 && this.scene.state.user.test !== 'B') {
      this.scene.state.user.takenReward = true;
      axios.post(process.env.API + "/takenNewbieReward", { hash: this.scene.state.user.hash });
    }    

    this.scene.openModal(this.scene.cameras.main);
  }

  private createElements(): void {
    this.closeBtn = this.scene.add.sprite(this.x + this.displayWidth / 2 - 45, this.y - this.displayHeight / 2 + 40, 'tasks-close').setDepth(2);
    // заголовок
    this.scene.add.text(this.x, this.y - 350, this.scene.state.lang.newbieAwards, {
      font: '36px Shadow',
      color: '#044677'
    }).setOrigin(0.5, 0.5);

    this.scene.add.text(this.x - 3, this.y - 240, this.scene.state.lang.stillTimeAward + ' ' + shortTime(this.scene.state.newbieTime, this.scene.state.lang), {
      font: '21px Shadow',
      color: '#FCC97E'
    }).setOrigin(0.5, 0.5);

    let timerText: Phaser.GameObjects.Text = this.scene.add.text(0, this.y - 310, this.scene.state.lang.toNextAward, {
      font: '21px Shadow',
      color: '#F4FEFF'
    }).setOrigin(0, 0.5);
  
    this.timerNewbieAward = this.scene.add.text(0, this.y - 310, shortTime(this.scene.state.timeToNewDay, this.scene.state.lang), {
      font: '21px Shadow',
      color: '#E9B744'
    }).setOrigin(0, 0.5);
  
    let width: number = timerText.displayWidth + this.timerNewbieAward.displayWidth + 5;
    timerText.setX(this.x - width / 2);
    this.timerNewbieAward.setX(timerText.getBounds().right + 5);

    if (this.scene.state.user.test === 'B') {
      this.createAwardTestB();
    } else {
      this.createAwardTestA();
    }

    this.setElementsState();
    this.setAnimation();
  }

  private createAwardTestA(): void {
     // дни
    this.day0 = this.scene.add.sprite(195, this.y - 110, 'newbie-day-0');
    this.bgDay0 = this.scene.add.sprite(195, this.y - 178, 'day-yellow');
    this.textDay0 = this.scene.add.text(195, this.y - 182, this.scene.state.lang.day + ' 0', {
      font: '20px Shadow',
      color: '#B05B00'
    }).setOrigin(0.5, 0.5);

    if (this.scene.state.farm === 'Sheep' && this.scene.state.daily === 1 && !this.scene.state.user.takenReward) {

      let money: string | number = shortNum(this.scene.game.scene.keys[this.scene.state.farm].convertDiamonds(10));
      this.textAwardLitle0 = this.scene.add.text(203, this.y - 110, money, {
        font: '34px Shadow',
        color: '#FFF0F0'
      }).setOrigin(0.5, 0.5).setStroke('#5D4D2B', 4);

      let x: number = this.textAwardLitle0.getBounds().left;
      this.textAward0 = this.scene.add.text(x - 10, this.y - 110, 'x', {
        font: '24px Shadow',
        color: '#FFF0F0'
      }).setOrigin(0.5, 0.5).setStroke('#5D4D2B', 4);

    }

    this.day1 = this.scene.add.sprite(355, this.y - 120, 'newbie-day-1');
    this.bgDay1 = this.scene.add.sprite(355, this.y - 190, 'day-purple');
    this.textDay1 = this.scene.add.text(355, this.y - 193, this.scene.state.lang.day + ' 1', {
      font: '20px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5);
    this.textAward1 = this.scene.add.text(400, this.y - 85, '5', {
      font: '64px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5226A3', 4);
    this.textAwardLitle1 = this.scene.add.text(365, this.y - 85, 'x', {
      font: '34px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5226A3', 4);

    this.day2 = this.scene.add.sprite(515, this.y - 110, 'newbie-day-2');
    this.bgDay2 = this.scene.add.sprite(515, this.y - 178, 'day-yellow');
    this.textDay2 = this.scene.add.text(515, this.y - 182, this.scene.state.lang.day + ' 2', {
      font: '20px Shadow',
      color: '#B05B00'
    }).setOrigin(0.5, 0.5);
    this.textAward2 = this.scene.add.text(505, this.y - 85, '3', {
      font: '58px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);
    this.textAwardLitle2 = this.scene.add.text(475, this.y - 88, 'x', {
      font: '24px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);

    this.day3 = this.scene.add.sprite(195, this.y + 60, 'newbie-day-3');
    this.bgDay3 = this.scene.add.sprite(195, this.y - 10, 'day-purple');
    this.textDay3 = this.scene.add.text(195, this.y - 13, this.scene.state.lang.day + ' 3', {
      font: '20px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5);

    this.day4 = this.scene.add.sprite(360, this.y + 65, 'newbie-day-4');
    this.bgDay4 = this.scene.add.sprite(360, this.y - 5, 'day-yellow');
    this.textDay4 = this.scene.add.text(360, this.y - 9, this.scene.state.lang.day + ' 4', {
      font: '20px Shadow',
      color: '#B05B00'
    }).setOrigin(0.5, 0.5);

    this.textAward4 = this.scene.add.text(382, this.y + 100, '3', {
      font: '44px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);
    this.textAwardLitle4 = this.scene.add.text(405, this.y + 103, this.scene.state.lang.shortHours, {
      font: '24px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);

    this.day5 = this.scene.add.sprite(515, this.y + 65, 'newbie-day-5');
    this.bgDay5 = this.scene.add.sprite(515, this.y - 5, 'day-yellow');
    this.textDay5 = this.scene.add.text(515, this.y - 9, this.scene.state.lang.day + ' 5', {
      font: '20px Shadow',
      color: '#B05B00'
    }).setOrigin(0.5, 0.5);
    this.textAward5 = this.scene.add.text(505, this.y + 90, '3', {
      font: '58px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);
    this.textAwardLitle5 = this.scene.add.text(475, this.y + 87, 'x', {
      font: '24px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);

    this.day6 = this.scene.add.sprite(195, this.y + 245, 'newbie-day-6');
    this.bgDay6 = this.scene.add.sprite(195, this.y + 175, 'day-yellow');
    this.textDay6 = this.scene.add.text(195, this.y + 172, this.scene.state.lang.day + ' 6', {
      font: '20px Shadow',
      color: '#B05B00'
    }).setOrigin(0.5, 0.5);
    this.textAward6 = this.scene.add.text(220, this.y + 282, '3', {
      font: '42px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);
    this.textAwardLitle6 = this.scene.add.text(241, this.y + 282, this.scene.state.lang.shortHours, {
      font: '22px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);

    this.day7 = this.scene.add.sprite(425, this.y + 245, 'newbie-day-7');
    this.bgDay7 = this.scene.add.sprite(425, this.y + 165, 'day-red');
    this.textDay7 = this.scene.add.text(425, this.y + 163, this.scene.state.lang.day + ' 7', {
      font: '22px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5);
    this.textAward7 = this.scene.add.text(440, this.y + 292, '10', {
      font: '66px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5226A3', 5).setAngle(3);
    this.textAwardLitle7 = this.scene.add.text(393, this.y + 302, 'x', {
      font: '34px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5226A3', 5);
  }

  private createAwardTestB(): void {
    this.day0 = this.scene.add.sprite(195, this.y - 110, 'newbie-day-0');
    this.bgDay0 = this.scene.add.sprite(195, this.y - 178, 'day-yellow');
    this.textDay0 = this.scene.add.text(195, this.y - 182, this.scene.state.lang.day + ' 0', {
      font: '20px Shadow',
      color: '#B05B00'
    }).setOrigin(0.5, 0.5);

    if (this.scene.state.farm === 'Sheep' && this.scene.state.daily === 1 && !this.scene.state.user.takenReward) {

      let money: string | number = shortNum(this.scene.game.scene.keys[this.scene.state.farm].convertDiamonds(10));
      this.textAwardLitle0 = this.scene.add.text(203, this.y - 110, money, {
        font: '34px Shadow',
        color: '#FFF0F0'
      }).setOrigin(0.5, 0.5).setStroke('#5D4D2B', 4);

      let x: number = this.textAwardLitle0.getBounds().left;
      this.textAward0 = this.scene.add.text(x - 10, this.y - 110, 'x', {
        font: '24px Shadow',
        color: '#FFF0F0'
      }).setOrigin(0.5, 0.5).setStroke('#5D4D2B', 4);

    }

    this.day1 = this.scene.add.sprite(355, this.y - 120, 'newbie-day-1');
    this.bgDay1 = this.scene.add.sprite(355, this.y - 190, 'day-purple');
    this.textDay1 = this.scene.add.text(355, this.y - 193, this.scene.state.lang.day + ' 1', {
      font: '20px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5);
    this.textAward1 = this.scene.add.text(400, this.y - 85, '3', {
      font: '64px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5226A3', 4);
    this.textAwardLitle1 = this.scene.add.text(365, this.y - 85, 'x', {
      font: '34px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5226A3', 4);

    this.day2 = this.scene.add.sprite(515, this.y - 110, 'newbie-day-2');
    this.bgDay2 = this.scene.add.sprite(515, this.y - 178, 'day-yellow');
    this.textDay2 = this.scene.add.text(515, this.y - 182, this.scene.state.lang.day + ' 2', {
      font: '20px Shadow',
      color: '#B05B00'
    }).setOrigin(0.5, 0.5);
    this.textAward2 = this.scene.add.text(505, this.y - 85, '3', {
      font: '58px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);
    this.textAwardLitle2 = this.scene.add.text(475, this.y - 88, 'x', {
      font: '24px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);

    this.day3 = this.scene.add.sprite(195, this.y + 60, 'newbie-day-1');
    this.bgDay3 = this.scene.add.sprite(195, this.y - 10, 'day-purple');
    this.textDay3 = this.scene.add.text(195, this.y - 13, this.scene.state.lang.day + ' 3', {
      font: '20px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5);
    this.textAward3 = this.scene.add.text(240, this.y + 95, '5', {
      font: '64px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5226A3', 4);
    this.textAwardLitle3 = this.scene.add.text(205, this.y + 95, 'x', {
      font: '34px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5226A3', 4);

    this.day4 = this.scene.add.sprite(360, this.y + 65, 'newbie-day-4');
    this.bgDay4 = this.scene.add.sprite(360, this.y - 5, 'day-yellow');
    this.textDay4 = this.scene.add.text(360, this.y - 9, this.scene.state.lang.day + ' 4', {
      font: '20px Shadow',
      color: '#B05B00'
    }).setOrigin(0.5, 0.5);

    this.textAward4 = this.scene.add.text(382, this.y + 100, '3', {
      font: '44px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);
    this.textAwardLitle4 = this.scene.add.text(405, this.y + 103, this.scene.state.lang.shortHours, {
      font: '24px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);

    this.day5 = this.scene.add.sprite(515, this.y + 65, 'newbie-day-2');
    this.bgDay5 = this.scene.add.sprite(515, this.y - 5, 'day-yellow');
    this.textDay5 = this.scene.add.text(515, this.y - 9, this.scene.state.lang.day + ' 5', {
      font: '20px Shadow',
      color: '#B05B00'
    }).setOrigin(0.5, 0.5);
    this.textAward5 = this.scene.add.text(505, this.y + 90, '5', {
      font: '58px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);
    this.textAwardLitle5 = this.scene.add.text(475, this.y + 87, 'x', {
      font: '24px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4);

    this.day6 = this.scene.add.sprite(195, this.y + 245, 'newbie-day-4');
    this.bgDay6 = this.scene.add.sprite(195, this.y + 175, 'day-yellow');
    this.textDay6 = this.scene.add.text(195, this.y + 172, this.scene.state.lang.day + ' 6', {
      font: '20px Shadow',
      color: '#B05B00'
    }).setOrigin(0.5, 0.5);
    this.textAward6 = this.scene.add.text(220, this.y + 282, '5', {
      font: '42px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);
    this.textAwardLitle6 = this.scene.add.text(241, this.y + 282, this.scene.state.lang.shortHours, {
      font: '22px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#137B09', 4).setAngle(8);

    this.day7 = this.scene.add.sprite(425, this.y + 245, 'newbie-day-7');
    this.bgDay7 = this.scene.add.sprite(425, this.y + 165, 'day-red');
    this.textDay7 = this.scene.add.text(425, this.y + 163, this.scene.state.lang.day + ' 7', {
      font: '22px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5);
    this.textAward7 = this.scene.add.text(440, this.y + 292, '10', {
      font: '66px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5226A3', 5).setAngle(3);
    this.textAwardLitle7 = this.scene.add.text(393, this.y + 302, 'x', {
      font: '34px Shadow',
      color: '#FFF0F0'
    }).setOrigin(0.5, 0.5).setStroke('#5226A3', 5);
  }

  private setListeners(): void {
    this.scene.clickButton(this.closeBtn, (): void => {
      this.scene.scene.stop();
      this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
      this.scene.game.scene.keys[this.scene.state.farm].takeNewbieAward();
    });

    this.scene.click(this, () => {
      if (!this.scene.state.user.takenReward || this.scene.state.daily === 4 && this.scene.state.user.test !== 'B' || this.scene.state.user.test === 'B') {
        const mainScene = this.scene.game.scene.getScene(this.scene.state.farm) as Sheep | Chicken | Cow | Unicorn;
        mainScene.playSoundOnce('award-sound')
        this.scene.scene.stop();
        this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
        this.scene.game.scene.keys[this.scene.state.farm].takeNewbieAward();
      }
    });
  }

  private setElementsState(): void {
    if (this.scene.state.daily === 1) {

      if (this.scene.state.user.takenReward) {
  
        this.scene.add.sprite(this.day0.x, this.day0.y, 'award-received');
        this.day0.setTint(0x999999);
  
      }
  
    } else if (this.scene.state.daily === 2) {
  
      this.scene.add.sprite(this.day0.x, this.day0.y, 'award-received');
      this.day0.setTint(0x999999);
  
      if (this.scene.state.user.takenReward) {
  
        this.scene.add.sprite(this.day1.x, this.day1.y, 'award-received');
        this.day1.setTint(0x999999);
        this.textAward1.setTint(0x999999);
        this.textAwardLitle1.setTint(0x999999);
  
      }
  
    } else if (this.scene.state.daily === 3) {
  
      this.scene.add.sprite(this.day0.x, this.day0.y, 'award-received');
      this.day0.setTint(0x999999);
      this.scene.add.sprite(this.day1.x, this.day1.y, 'award-received');
      this.day1.setTint(0x999999);
      this.textAward1.setTint(0x999999);
      this.textAwardLitle1.setTint(0x999999);
  
      if (this.scene.state.user.takenReward) {
  
        this.scene.add.sprite(this.day2.x, this.day2.y, 'award-received');
        this.day2.setTint(0x999999);
        this.textAward2.setTint(0x999999);
        this.textAwardLitle2.setTint(0x999999);
  
      }
  
    } else if (this.scene.state.daily === 4) {
  
      this.scene.add.sprite(this.day0.x, this.day0.y, 'award-received');
      this.day0.setTint(0x999999);
      this.scene.add.sprite(this.day1.x, this.day1.y, 'award-received');
      this.day1.setTint(0x999999);
      this.textAward1.setTint(0x999999);
      this.textAwardLitle1.setTint(0x999999);
      this.scene.add.sprite(this.day2.x, this.day2.y, 'award-received');
      this.day2.setTint(0x999999);
      this.textAward2.setTint(0x999999);
      this.textAwardLitle2.setTint(0x999999);
  
      if (this.scene.state.user.takenReward) {
  
        this.scene.add.sprite(this.day3.x, this.day3.y, 'award-received');
        this.day3.setTint(0x999999);
  
      }
  
    } else if (this.scene.state.daily === 5) {
  
      this.scene.add.sprite(this.day0.x, this.day0.y, 'award-received');
      this.day0.setTint(0x999999);
      this.scene.add.sprite(this.day1.x, this.day1.y, 'award-received');
      this.day1.setTint(0x999999);
      this.textAward1.setTint(0x999999);
      this.textAwardLitle1.setTint(0x999999);
      this.scene.add.sprite(this.day2.x, this.day2.y, 'award-received');
      this.day2.setTint(0x999999);
      this.textAward2.setTint(0x999999);
      this.textAwardLitle2.setTint(0x999999);
      this.scene.add.sprite(this.day3.x, this.day3.y, 'award-received');
      this.day3.setTint(0x999999);
  
      if (this.scene.state.user.takenReward) {
  
        this.scene.add.sprite(this.day4.x, this.day4.y, 'award-received');
        this.day4.setTint(0x999999);
        this.textAward4.setTint(0x999999);
        this.textAwardLitle4.setTint(0x999999);
  
      }
  
    } else if (this.scene.state.daily === 6) {
  
      this.scene.add.sprite(this.day0.x, this.day0.y, 'award-received');
      this.day0.setTint(0x999999);
      this.scene.add.sprite(this.day1.x, this.day1.y, 'award-received');
      this.day1.setTint(0x999999);
      this.textAward1.setTint(0x999999);
      this.textAwardLitle1.setTint(0x999999);
      this.scene.add.sprite(this.day2.x, this.day2.y, 'award-received');
      this.day2.setTint(0x999999);
      this.textAward2.setTint(0x999999);
      this.textAwardLitle2.setTint(0x999999);
      this.scene.add.sprite(this.day3.x, this.day3.y, 'award-received');
      this.day3.setTint(0x999999);
      this.scene.add.sprite(this.day4.x, this.day4.y, 'award-received');
      this.day4.setTint(0x999999);
      this.textAward4.setTint(0x999999);
      this.textAwardLitle4.setTint(0x999999);
  
      if (this.scene.state.user.takenReward) {
  
        this.scene.add.sprite(this.day5.x, this.day5.y, 'award-received');
        this.day5.setTint(0x999999);
        this.textAward5.setTint(0x999999);
        this.textAwardLitle5.setTint(0x999999);
  
      }
  
    } else if (this.scene.state.daily === 7) {
  
      this.scene.add.sprite(this.day0.x, this.day0.y, 'award-received');
      this.day0.setTint(0x999999);
      this.scene.add.sprite(this.day1.x, this.day1.y, 'award-received');
      this.day1.setTint(0x999999);
      this.textAward1.setTint(0x999999);
      this.textAwardLitle1.setTint(0x999999);
      this.scene.add.sprite(this.day2.x, this.day2.y, 'award-received');
      this.day2.setTint(0x999999);
      this.textAward2.setTint(0x999999);
      this.textAwardLitle2.setTint(0x999999);
      this.scene.add.sprite(this.day3.x, this.day3.y, 'award-received');
      this.day3.setTint(0x999999);
      this.scene.add.sprite(this.day4.x, this.day4.y, 'award-received');
      this.day4.setTint(0x999999);
      this.textAward4.setTint(0x999999);
      this.textAwardLitle4.setTint(0x999999);
      this.scene.add.sprite(this.day5.x, this.day5.y, 'award-received');
      this.day5.setTint(0x999999);
      this.textAward5.setTint(0x999999);
      this.textAwardLitle5.setTint(0x999999);
  
      if (this.scene.state.user.takenReward) {
  
        this.scene.add.sprite(this.day6.x, this.day6.y, 'award-received');
        this.day6.setTint(0x999999);
        this.textAward6.setTint(0x999999);
        this.textAwardLitle6.setTint(0x999999);
  
      }
  
    } else if (this.scene.state.daily === 8) {
  
      this.scene.add.sprite(this.day0.x, this.day0.y, 'award-received');
      this.day0.setTint(0x999999);
      this.scene.add.sprite(this.day1.x, this.day1.y, 'award-received');
      this.day1.setTint(0x999999);
      this.textAward1.setTint(0x999999);
      this.textAwardLitle1.setTint(0x999999);
      this.scene.add.sprite(this.day2.x, this.day2.y, 'award-received');
      this.day2.setTint(0x999999);
      this.textAward2.setTint(0x999999);
      this.textAwardLitle2.setTint(0x999999);
      this.scene.add.sprite(this.day3.x, this.day3.y, 'award-received');
      this.day3.setTint(0x999999);
      this.scene.add.sprite(this.day4.x, this.day4.y, 'award-received');
      this.day4.setTint(0x999999);
      this.textAward4.setTint(0x999999);
      this.textAwardLitle4.setTint(0x999999);
      this.scene.add.sprite(this.day5.x, this.day5.y, 'award-received');
      this.day5.setTint(0x999999);
      this.textAward5.setTint(0x999999);
      this.textAwardLitle5.setTint(0x999999);
      this.scene.add.sprite(this.day6.x, this.day6.y, 'award-received');
      this.day6.setTint(0x999999);
      this.textAward6.setTint(0x999999);
      this.textAwardLitle6.setTint(0x999999);
  
    }
  }

  private setAnimation(): void {
    if (!this.scene.state.user.takenReward) {
      const daily: number = Number(this.scene.state.daily) - 1 < 0 ? 0 : Number(this.scene.state.daily) - 1;
      
      let day: Phaser.GameObjects.Sprite = this[`day${daily}`];
      let bgDay: Phaser.GameObjects.Sprite = this[`bgDay${daily}`];
      let textDay: Phaser.GameObjects.Text = this[`textDay${daily}`];
      let textAward: Phaser.GameObjects.Text = this[`textAward${daily}`];
      let textAwardLitle: Phaser.GameObjects.Text = this[`textAwardLitle${daily}`];
   
      this.scene.tweens.add({
        targets: [day, bgDay, textDay, textAward, textAwardLitle],
        y: '-=15',
        duration: 160,
        yoyo: true,
        repeat: -1,
        ease: 'Power1'
      });
    }
  
  }

  public preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    if (this.scene.state.modal.type === 6) {
      let text: string = shortTime(this.scene.state.timeToNewDay, this.scene.state.lang);
      if (this.timerNewbieAward.text !== text) this.timerNewbieAward.setText(text);
    }
  }
}
