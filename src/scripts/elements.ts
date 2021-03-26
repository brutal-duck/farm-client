import { shortNum, shortTime } from './general/basic';
import SheepBars from './scenes/Sheep/SheepBars';
import ChickenBars from './scenes/Chicken/ChickenBars';
import CowBars from './scenes/Cow/CowBars';

// бабл
function createSpeechBubble(text: string, type: number = 1): void {
  
  let x = 120;
  let y = 360;
  let width = 340;

  if (type === 2) {
    y = 220;
    x = 260;
  } 

  if (type === 3) {
    y = 165;
    x = 205;
  } 

  let bubble: Phaser.GameObjects.Graphics = this.add.graphics({ x: x, y: y });

  bubble.fillStyle(0xFFFFFF, 1);

  let bubbleText: Phaser.GameObjects.Text = this.add.text(x + 20, y, text, {
    font: '24px Bip',
    color: '#823431',
    align: 'left',
    wordWrap: { width: width }
  }).setDepth(y + 240);

  let bubleTextHeight = bubbleText.getBounds().height + 40;
  bubbleText.setPosition(x + 20, bubble.y + 20);
  bubble.fillRoundedRect(0, 0, width, bubleTextHeight, 16);

  let point1X = width;
  let point1Y = 40;
  let point2X = width;
  let point2Y = 10;
  let point3X = width + 40;
  let point3Y = 20;

  if (type === 2) {
    point1X = 0;
    point2X = 0;
    point3X = -40;
  }
  if (type === 3) {
    point1Y = bubleTextHeight / 2 - 15;
    point2Y = bubleTextHeight / 2 + 15;
    point3Y = bubleTextHeight / 2 + 25;
  }

  bubble.fillTriangle(point1X, point1Y, point2X, point2Y, point3X, point3Y);
  bubble.setDepth(y + 240);

  let bubbleFarmer: Phaser.GameObjects.Image;
  let bubbleBg: Phaser.GameObjects.Graphics = this.add.graphics();
  if (type === 3 ) {
    bubbleFarmer = this.add.image(bubble.x + width + 20, bubble.y + (bubleTextHeight / 2), 'farmer').setOrigin(0, 0.5).setScale(0.5);
    bubbleBg.fillStyle(0x000000, 0.5).fillRoundedRect(bubble.x - 20, bubble.y - 20, width + bubbleFarmer.displayWidth + 60, bubleTextHeight + 40, 16)
  }
  let anims: Phaser.Tweens.Tween = this.tweens.add({
    targets: [bubble, bubbleText, bubbleFarmer, bubbleBg],
    delay: 3000,
    duration: 1000,
    alpha: 0,
    ease: 'Power1',
    onComplete: () => {
      bubble?.destroy();
      bubbleText?.destroy();
      bubbleFarmer?.destroy();
      bubbleBg?.destroy();
      anims.remove();
    },
  });

}


// облако при мерджинге (Добавил type при неудчном мерджинге)
function mergingCloud(position: Iposition, type: boolean = false): void {

  let x: number = position.x;
  let y: number = position.y;
  let cloud = !type 
    ? this.add.image(x, y, 'merging-animation').setDepth(y + 10000)
    : this.add.image(x, y, 'bad-merging-animation').setDepth(y + 10000);
  let cloudText = this.add.text(x, y, this.state.lang.herdBoostBadMerge, {
    font: '34px Shadow',
    color: '#1a1a1a',
    align: 'center'
  }).setOrigin(0.5, 0.5).setVisible(type).setDepth(y + 10001).setStroke('#cc3737', 2);

  let delay = 10;
  let interval = this.time.addEvent({ delay: 30, callback: (): void => {

    cloud.y -= 4;
    cloudText.y = cloud.y;
    if (delay === 0) {

      let alpha: number = Number(cloud.alpha.toFixed(2)) - 0.02;
      cloud.setAlpha(alpha);
      cloudText.setAlpha(alpha);

      if (alpha <= 0.03) {
        cloud.destroy();
        cloudText.destroy();
        interval.remove(false);
      }

    } else delay--;

  }, callbackScope: this, loop: true });
  
}


// большая кнопка
function bigButton(
  color: string,
  textAlign: string,
  height: number,
  text: string,
  right1: any = false,
  right2: any = false
): any {
  
  let textColor: string = '#FFFFFF';
  let btnColor: string;
  let textOrigin: number = 0.5;
  let textX: number = this.cameras.main.centerX;

  if (color === 'grey') {

    textColor = '#3D3D3D';
    btnColor = 'big-btn-grey';

  } else if (color === 'green') btnColor = 'big-btn-green';
  else if (color === 'blue') btnColor = 'big-btn-blue';
  else if (color === 'orange') btnColor = 'big-btn-orange';
  else if (color === 'red') btnColor = 'big-btn-red';
  else if (color === 'yellow') btnColor = 'big-btn-yellow';

  if (textAlign === 'left') {
    textOrigin = 0;
    textX = 145;
  }
  
  // кнопка
  let btn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + height, btnColor);
  let title: Phaser.GameObjects.Text = this.add.text(textX, this.cameras.main.centerY - 5 + height, text, {
    font: '22px Shadow',
    fill: textColor
  }).setDepth(1).setOrigin(textOrigin, 0.5);
  let text1: any, text2: any, img1: any, img2: any;

  if (right1) {

    text1 = this.add.text(575, this.cameras.main.centerY - 5 + height, right1.text, {
      font: '24px Shadow',
      fill: textColor
    }).setDepth(1).setOrigin(1, 0.5);

    img1 = this.add.sprite(570 - text1.displayWidth, this.cameras.main.centerY - 5 + height, right1.icon)
      .setOrigin(1, 0.5)
      .setScale(0.9);

    if (right1.icon !== 'ad-icon') img1.setScale(0.15);

    if (right2) {

      text2 = this.add.text(525 - text1.displayWidth, this.cameras.main.centerY - 5 + height, right2.text, {
        font: '24px Shadow',
        fill: textColor
      }).setDepth(1).setOrigin(1, 0.5);
  
      img2 = this.add.sprite(
        520 - text1.displayWidth - text2.displayWidth,
        this.cameras.main.centerY - 5 + height,
        right2.icon
      ).setOrigin(1, 0.5).setScale(0.15);

    }

  }

  return {
    btn: btn,
    title: title,
    text1: text1,
    text2: text2,
    img1: img1,
    img2: img2
  };

}


// кнопка продажи материала в хранилищаx
function repositoryBtn(
  height: number,
  text: string,
  rightBlock: any
): any {
  
  // кнопка
  let btn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + height, 'repository-sell-btn');
  let title: Phaser.GameObjects.Text = this.add.text(150, this.cameras.main.centerY - 10 + height, text, {
    font: '26px Shadow',
    fill: '#FFFFFF'
  }).setDepth(1).setOrigin(0, 0.5);

  let money: Phaser.GameObjects.Text;
  let coin: Phaser.GameObjects.Sprite;

  money = this.add.text(565, this.cameras.main.centerY - 10 + height, rightBlock.text, {
    font: '28px Shadow',
    fill: '#FFFFFF'
  }).setDepth(1).setOrigin(1, 0.5);

  coin = this.add.sprite(555 - money.displayWidth, this.cameras.main.centerY - 10 + height, rightBlock.icon)
    .setOrigin(1, 0.5)
    .setScale(0.15);

  return {
    btn: btn,
    title: title,
    text1: money,
    img1: coin,
  };

}


// круговой бар собирателя
class Collector {

  public x: number;
  public y: number;
  public radius: number;
  public startAngle: number;
  public endAngle: number;
  public color: number;
  public weight: number;
  public collector: Phaser.GameObjects.Graphics;
  public scene: any;
  public percent: number;
  public timeCollectorText: Phaser.GameObjects.Text;
  public bubble: Phaser.GameObjects.Graphics;
  public pulseTimer: number = 0;
  public farmData: any;

  constructor(
    scene: any,
    x: number,
    y: number,
    radius: number
  ) {
    this.scene = scene;
    this.x = x || 400;
    this.y = y || 300;
    this.radius = radius || 40;
    this.startAngle = -1.66;
    this.endAngle = -1.66;
    this.color = 0x89DE3D;
    this.weight = 10;
    this.init();
  }

  public init(): void {
    
    if (this.scene.state.farm === 'Event') {
      this.weight = 15;
      this.color = 0x750296;
    }
    this.percent = 6.3 / 100;
    this.collector = this.scene.add.graphics();
    this.collector.lineStyle(this.weight, this.color, 1);
    this.collector.beginPath();
    this.collector.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    this.collector.strokePath();

    let time: string; 

    if (this.scene.state.farm === 'Chicken') {
      time = shortTime(this.scene.state.userChicken.collector, this.scene.state.lang);
    } else if (this.scene.state.farm === 'Sheep') {
      time = shortTime(this.scene.state.userSheep.collector, this.scene.state.lang);
    } else if (this.scene.state.farm === 'Event') {
      time = shortTime(this.scene.state.userEvent.collector, this.scene.state.lang);
    } else if (this.scene.state.farm === 'Cow') {
      time = shortTime(this.scene.state.userCow.collector, this.scene.state.lang);
    }

    this.timeCollectorText = this.scene.add.text(230, this.scene.height - 43, time, {
      font: '28px Bip',
      color: '#925C28',
      align: 'center'
    }).setDepth(this.scene.height).setOrigin(0.5, 0.5);

    let bounds = this.timeCollectorText.getBounds();
    this.bubble = this.scene.add.graphics({ x: bounds.left - 15, y: bounds.top });
    this.bubble.fillStyle(0xffffff, 1);
    this.bubble.strokeRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);
    this.bubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);

    if (this.scene.state.farm === 'Sheep') {
      this.farmData = this.scene.state.userSheep;
    } else if (this.scene.state.farm === 'Chicken') {
      this.farmData = this.scene.state.userChicken;
    } else if (this.scene.state.farm === 'Event') {
      this.farmData = this.scene.state.userEvent;
    } else if (this.scene.state.farm === 'Cow') {
      this.farmData = this.scene.state.userCow;
    } 

  }

  public update(): void {

    let percent: number = 0;
    
    if (this.farmData.collector > 0 && this.farmData.collectorTakenTime > 0) {
      percent = Math.round(this.farmData.collector / (this.farmData.collectorTakenTime / 100));
    }

    this.endAngle = percent * this.percent + this.startAngle;

    this.collector.clear();
    this.collector.lineStyle(this.weight, this.color, 1);
    this.collector.beginPath();
    this.collector.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
    this.collector.strokePath();
    
    let time: string = shortTime(this.farmData.collector, this.scene.state.lang);
    this.timeCollectorText.setText(time);
    this.timeCollectorText.setColor('#925C28');

    if (this.bubble.visible) {

      this.bubble.destroy();
      let bounds = this.timeCollectorText.getBounds();
      this.bubble = this.scene.add.graphics({ x: bounds.left - 15, y: bounds.top });
      this.bubble.fillStyle(0xffffff, 1);
      this.bubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);

    }

    if (this.scene.scene.isActive('Shop') && this.scene.state.modal?.shopType === 4) {

      if (this.farmData.collector === 0) {

        this.scene.scene.stop('Shop');
        this.scene.scene.launch('Shop', this.scene.state);

      } else if (this.scene.game.scene.keys['Shop'].collectorTimer?.active) {

        this.scene.game.scene.keys['Shop'].collectorTimer.setText(this.scene.state.lang.still + ' ' + time);
        
      }

    }

  }

  public setColor(status: boolean): void {

    let textColor: string;
    let bubbleColor: number;

    if (status) {
      textColor = '#FFFFFF';
      bubbleColor = 0xC70000;
    } else {
      textColor = '#C70000';
      bubbleColor = 0xFFFFFF;
    }
    
    this.timeCollectorText.setColor(textColor);
    this.bubble.destroy();
    let bounds = this.timeCollectorText.getBounds();
    this.bubble = this.scene.add.graphics({ x: bounds.left - 15, y: bounds.top });
    this.bubble.fillStyle(bubbleColor, 1);
    this.bubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);

  }

}


// кнопка в магазине
function shopButton(x: number, y: number, text: string, icon: any = false): any {
  
  let img: Phaser.GameObjects.Image | boolean = false;
  let btn: Phaser.GameObjects.Image = this.add.image(x, y, 'shop-btn');

  let textX: number = x;
  if (icon) textX += 20;

  let title: Phaser.GameObjects.Text = this.add.text(textX, y - 5, text, {
    font: '28px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0.5, 0.5);

  if (icon === 'sheepCoin' || icon === 'chickenCoin' || icon === 'diamond' || icon === 'eventCoin' || icon === 'cowCoin') {
    img = this.add.image(title.getBounds().left - 25, y - 5, icon).setScale(0.15);
  }

  if (icon === 'ad-icon') {
    img = this.add.image(title.getBounds().left - 25, y - 5, icon).setScale(0.5);
  }

  return {
    btn: btn,
    title: title,
    img: img
  };

}


// кнопка буста
function boostButton(
  x: number,
  y: number,
  left: string,
  leftLitleText: string,
  right: string,
  type: string = 'diamond'
): any {

  let texture: string = 'boost-btn';
  let leftTextColor: string = '#0A7A26';
  let rightTextColor: string = '#FFFFFF';
  let icon: string = 'diamond';

  if (type === 'lock') {

    texture = 'boost-btn-disable';
    leftTextColor = '#3D3D3D';
    rightTextColor = '#3D3D3D';
    icon = 'lock';

  } else if (type === 'lock-ad') {

    texture = 'boost-btn-disable';
    icon = 'ad-icon';
    leftTextColor = '#3D3D3D';
    rightTextColor = '#3D3D3D';

  } else if (type === 'ad') {

    texture = 'boost-btn-ad';
    icon = 'ad-icon';
    leftTextColor = '#FFFFFF';

  } else if (type === 'lock-ad-diamond') {

    texture = 'boost-btn-disable';
    leftTextColor = '#3D3D3D';
    rightTextColor = '#3D3D3D';

  } else if (type === 'ad-diamond') {

    texture = 'boost-btn-ad';
    leftTextColor = '#FFFFFF';

  } else if (type === 'free-lock') {

    texture = 'boost-btn-disable';
    leftTextColor = '#3D3D3D';
    rightTextColor = '#3D3D3D';

  }

  let btn: Phaser.GameObjects.Sprite = this.add.sprite(x, y, texture);
  let leftText: Phaser.GameObjects.Text = this.add.text(x - 88, y - 4, left, {
    font: '30px Shadow',
    color: leftTextColor
  }).setOrigin(0, 0.5);

  let leftBound: number = leftText.getBounds().right + 2;
  let leftLitle: Phaser.GameObjects.Text = this.add.text(leftBound, y - 1, leftLitleText + '.', {
    font: '20px Shadow',
    color: leftTextColor
  }).setOrigin(0, 0.5);

  let rightText: Phaser.GameObjects.Text = this.add.text(x + 88, y - 4, right, {
    font: '30px Shadow',
    color: rightTextColor
  }).setOrigin(1, 0.5);

  let iconX: number = rightText.getBounds().left - 25;
  let img: Phaser.GameObjects.Sprite = this.add.sprite(iconX, y - 4, icon)
  
  if (type !== 'lock-ad' && type !== 'ad') img.setScale(0.13);
  else img.setScale(0.7);

  if (type === 'free' || type === 'free-lock') img.setVisible(false);

  return {
    btn: btn,
    left: leftText,
    leftLitle: leftLitle,
    right: rightText,
    icon: img
  }

}

// кнопки меню
function buildMenu(): void {
  
  this.profile = this.add.image(650, this.height - 90, 'profile').setScale(0.8).setDepth(this.height + 2);
  this.chat = this.add.image(650, this.height - 90, 'chat').setScale(0.8).setDepth(this.height + 2);
  this.menu = this.add.image(650, this.height - 90, 'sandwich').setDepth(this.height + 3);

  this.clickButton(this.profile, (): void => {

    let modal: Imodal = {
      type: 1,
      sysType: 7
    }
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);

  });

  this.clickButton(this.chat, (): void => {
    
    let modal: Imodal = { type: 9 }
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);

  });

  this.clickButton(this.menu, (): void => {

    this.sendwich = !this.sendwich;
    this.sendwichTimer = 0;

    if (this.sendwich) {
      this.menu.setTexture('sandwich-close');
    } else {
      this.menu.setTexture('sandwich');
    }

  });

}

export {
  createSpeechBubble,
  mergingCloud,
  bigButton,
  repositoryBtn,
  Collector,
  shopButton,
  boostButton,
  buildMenu,
}
