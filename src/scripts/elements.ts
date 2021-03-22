import { shortNum, shortTime } from './general/basic';
import SheepBars from './scenes/Sheep/SheepBars';
import ChickenBars from './scenes/Chicken/ChickenBars';

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
      time = shortTime(this.scene.state.userChicken.collector, this.scene.state.lang);
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
      this.farmData = this.scene.state.userChicken;
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

  if (icon === 'sheepCoin' || icon === 'chickenCoin' || icon === 'diamond' || icon === 'eventCoin') {
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


// плашка заданий
class TaskBoard {

  public scene: SheepBars | ChickenBars;
  public active: boolean;
  public status: number;
  public taskIcon: Phaser.GameObjects.Image;
  public tileSprite: Phaser.GameObjects.TileSprite;
  public star: Phaser.GameObjects.Image;
  public taskBoard: Phaser.GameObjects.Graphics;
  public doneText: Phaser.GameObjects.Text;
  public taskText: Phaser.GameObjects.Text;
  public doneIcon: Phaser.GameObjects.Image;
  public done: Phaser.GameObjects.Image;
  public takeText: Phaser.GameObjects.Text;
  public award: Phaser.GameObjects.Text;
  public awardBg: Phaser.GameObjects.Graphics;
  public diamond: Phaser.GameObjects.Image;
  public doneButton: Phaser.GameObjects.Image;
  public doneButtonText: Phaser.GameObjects.Text;
  public lastPart: Phaser.GameObjects.Text;
  public zone: Phaser.GameObjects.Zone;
  public timer: Phaser.Time.TimerEvent;
  public counter: number = 0;
  public isGetTop: boolean = false
  public elements: any[]; // ПОМЕНЯТЬ ТИП
  public y: number;
  public taskProgress: Phaser.GameObjects.Graphics;

  constructor(
    scene: SheepBars | ChickenBars
  ) {
    this.scene = scene;
    this.active = true;
    this.init();
    this.update();
  }


  public init(): void {

    this.y = this.scene.height;
    this.scene.time.addEvent({
      delay: 20,
      callback: (): void => {

        if (this.status === 2 || this.status === 3) {

          if (!this.isGetTop) this.y--;
          else this.y++;

          if (this.elements !== undefined) {
            
            this.elements.forEach((el: any) => { // ПОМЕНЯТЬ ТИП
              
              if (!this.isGetTop) el.setY(el.y - 1)
              else el.setY(el.y + 1)
  
            })
            
          }

          this.counter++
          
          if (this.counter >= 16) {
            this.isGetTop = !this.isGetTop
            this.counter = 0
          }

        }
        
      },
      loop: true
    })

  }

  public update(): void {
    
    let tasks: Itasks[] = this.scene.game.scene.keys[this.scene.state.farm].partTasks();
    tasks.sort((x1: Itasks, x2: Itasks) => {
      if (x1.got_awarded < x2.got_awarded) return -1;
      if (x1.got_awarded > x2.got_awarded) return 1;
      if (x1.done < x2.done) return 1;
      if (x1.done > x2.done) return -1;
      if (x1.sort < x2.sort) return -1;
      if (x1.sort > x2.sort) return 1;
      return 0;
    });
    
    let task: Itasks = tasks[0];

    if (task?.done === 0) this.status = 1;
    else if (task?.done === 1 && task?.got_awarded === 0) this.status = 2;
    else this.status = 3;

    let stateParts: Ipart[];
    let userData: IuserSheep | IuserChicken;
    let countBreed: number;

    if (this.scene.state.farm === 'Chicken') {

      stateParts = this.scene.state.chickenSettings.chickenParts;
      userData = this.scene.state.userChicken;
      countBreed = this.scene.state.chickenSettings.chickenSettings.length;

    } else if (this.scene.state.farm === 'Sheep') {

      stateParts = this.scene.state.sheepSettings.sheepParts;
      userData = this.scene.state.userSheep;
      countBreed = this.scene.state.sheepSettings.sheepSettings.length;
      
    } else if (this.scene.state.farm === 'Cow') {

      stateParts = this.scene.state.chickenSettings.chickenParts;
      userData = this.scene.state.userChicken;
      countBreed = this.scene.state.chickenSettings.chickenSettings.length;
      
    }

    if (this.status === 3
      && task?.done === 1
      && task?.got_awarded === 1
      && stateParts.length === userData.part) {
      this.status = 4;
    }

    if (this.tileSprite) this.tileSprite.destroy();
    if (this.taskBoard) this.taskBoard.clear();
    if (this.taskText) this.taskText.destroy();
    if (this.doneText) this.doneText.destroy();
    if (this.taskIcon) this.taskIcon.destroy();
    if (this.star) this.star.destroy();
    if (this.done) this.done.destroy();
    if (this.doneIcon) this.doneIcon.destroy();
    if (this.takeText) this.takeText.destroy();
    if (this.award) this.award.destroy();
    if (this.awardBg) this.awardBg.clear();
    if (this.diamond) this.diamond.destroy();
    if (this.doneButton) this.doneButton.destroy();
    if (this.doneButtonText) this.doneButtonText.destroy();
    if (this.lastPart) this.lastPart.destroy();
    if (this.zone) this.zone.destroy();
    
    if (this.status === 1 && task) {

      let taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);

      this.taskText = this.scene.add.text(150, 0, taskData.name, {
        font: '23px Bip',
        color: '#713D1E',
        align: 'left',
        wordWrap: { width: 450 }
      }).setDepth(this.scene.height).setOrigin(0, 0);

      let taskTextBounds = this.taskText.getBounds();
      
      this.taskText.y = this.scene.height - taskTextBounds.height - 244;

      let count: number = task.count;

      if (task.type === 14 && task.count === 0) count = countBreed;

      this.doneText = this.scene.add.text(
        150,
        this.scene.height - 220,
        this.scene.state.lang.performed + ' ' + task.progress + ' / ' + count, {
          font: '20px Bip',
          color: '#525252'
        }
      ).setDepth(this.scene.height).setOrigin(0, 0.5);
      
      let height: number = 70 + taskTextBounds.height;
      if (height < 110) height = 110;

      this.taskBoard = this.scene.add.graphics({
        x: 30,
        y: this.scene.height - 190 - height
      });
      this.taskBoard.fillStyle(0xFFEBC5, 1);
      this.taskBoard.fillRoundedRect(0, 0, 660, height, 8);

      this.zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.taskBoard.y + (height / 2), 660, height).setDropZone(undefined, () => {}).setDepth(this.scene.height + 1);
      
      this.scene.click(this.zone, (): void => this.scene.clickTaskBoard(task));

      this.taskIcon = this.scene.add.image(88, this.scene.height  - 190 - height / 2, taskData.icon);

      let progress: number = (100 / count * task.progress) * (6.3 / 100) - Math.PI / 2

      if (!this.taskProgress) {
        this.taskProgress = this.scene.add.graphics()
          .clear()
          // Внутренний круг
          .lineStyle(4, 0xc09245, 1)
          .beginPath()
          .arc(this.taskIcon.x, this.taskIcon.y, 40, 0, Math.PI * 2)
          .strokePath()
          // Прогресс
          .lineStyle(8, 0x70399f, 1)
          .beginPath()
          .arc(this.taskIcon.x, this.taskIcon.y, 46, Math.PI / -2, progress)
          .strokePath()
          // Внешний круг
          .lineStyle(4, 0xc09245, 1)
          .beginPath()
          .arc(this.taskIcon.x, this.taskIcon.y, 51, 0, Math.PI * 2)
          .strokePath()
          .setDepth(3)
          .setVisible(true);
        
      } else {
        this.taskProgress
          .clear()
          // Внутренний круг
          .lineStyle(4, 0xc09245, 1)
          .beginPath()
          .arc(this.taskIcon.x, this.taskIcon.y, 40, 0, Math.PI * 2)
          .strokePath()
          // Прогресс
          .lineStyle(8, 0x70399f, 1)
          .beginPath()
          .arc(this.taskIcon.x, this.taskIcon.y, 46, Math.PI / -2, progress)
          .strokePath()
          // Внешний круг
          .lineStyle(4, 0xc09245, 1)
          .beginPath()
          .arc(this.taskIcon.x, this.taskIcon.y, 51, 0, Math.PI * 2)
          .strokePath()
          .setDepth(3)
          .setVisible(true);
      }

        
      this.star = this.scene.add.image(630, this.scene.height - 190 - height / 2, 'star');

      this.tileSprite = this.scene.add.tileSprite(30, this.scene.height - 190 - height, 660, height, 'modal')
        .setOrigin(0)
        .setInteractive();

    }

    if (this.status === 2 && task) {

      let taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
      
      this.taskText = this.scene.add.text(150, 0, taskData.name, {
        font: '23px Bip',
        color: '#713D1E',
        align: 'left',
        wordWrap: { width: 390 }
      }).setDepth(this.scene.height).setOrigin(0, 0);

      let taskTextBounds: Phaser.Geom.Rectangle = this.taskText.getBounds();
      
      this.taskText.y = this.y - taskTextBounds.height - 244;
      
      let icon: string = 'diamond';
      let award: number = task.diamonds;
      
      if (this.scene.state.farm === 'Sheep') {     
        let moneyTask: any = this.scene.game.scene.keys['Sheep'].moneyTasks.find(el => el.id === task.id);
        if (moneyTask) {
          award = moneyTask.money;
          icon = 'sheepCoin';
        }
      }
      
      this.award = this.scene.add.text(190, this.y - 220, String(award), {
        font: '20px Bip',
        color: '#FFFFFF'
      }).setDepth(this.scene.height).setOrigin(0, 0.5);
      
      this.diamond = this.scene.add.image(160, this.y - 220, icon)
        .setDepth(this.scene.height)
        .setScale(0.1)
        .setOrigin(0, 0.5);

      let bounds = this.award.getBounds();
      this.awardBg = this.scene.add.graphics({ x: bounds.left - 40, y: bounds.top - 3 });
      this.awardBg.fillStyle(0x713D1E, 1);
      this.awardBg.fillRoundedRect(0, 0, bounds.width + 50, bounds.height + 6, 5);
      this.awardBg.setDepth(this.scene.height - 1);

      let height: number = 70 + taskTextBounds.height;
      if (height < 110) height = 110;

      this.taskBoard = this.scene.add.graphics({
        x: 30,
        y: this.y - 190 - height
      });
      this.taskBoard.fillStyle(0xFFEBC5, 1);
      this.taskBoard.fillRoundedRect(0, 0, 660, height, 8);

      this.taskIcon = this.scene.add.image(88, this.y - 190 - height / 2, taskData.icon);
      this.taskIcon.setTint(0x777777);
      this.doneIcon = this.scene.add.image(88, this.y - 190 - height / 2, 'completed');

      this.done = this.scene.add.image(620, this.y - 190 - height / 2, 'little-button')
        .setDepth(this.scene.height);
      this.takeText = this.scene.add.text(620, this.y - 193 - height / 2, this.scene.state.lang.pickUp, {
        font: '20px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5).setDepth(this.scene.height);

      this.scene.clickShopBtn({
        btn: this.done,
        title: this.takeText,
        img: false
      }, (): void => {
        if (icon === 'diamond') {
          this.scene.getDiamonds({ x: this.done.x, y: this.done.y }, task.diamonds);
        } else if (icon === 'sheepCoin') {
          this.scene.plusMoneyAnimation({ x: this.done.x, y: this.done.y });
        }
        this.scene.game.scene.keys[this.scene.state.farm].pickUpTaskReward(task.id);
      });

      this.tileSprite = this.scene.add.tileSprite(30, this.scene.height - 190 - height, 660, height, 'modal')
        .setOrigin(0)
        .setInteractive();

      // Анимация
      this.elements = [];
      this.elements.push(
        this.taskText,
        this.award,
        this.diamond,
        this.awardBg,
        this.taskBoard,
        this.taskIcon,
        this.doneIcon,
        this.done,
        this.takeText,
        this.tileSprite
      )
      
      this.taskProgress?.clear();
    }

    if (this.status === 3 && task) {

      this.taskBoard = this.scene.add.graphics({
        x: 30,
        y: this.y - 300
      });
      this.taskBoard.fillStyle(0xFFEBC5, 1);
      this.taskBoard.fillRoundedRect(0, 0, 660, 110, 8);

      this.doneButton = this.scene.add.image(this.scene.cameras.main.centerX, this.y - 245, 'big-btn-green').setDepth(1);
      this.doneButtonText = this.scene.add.text(this.scene.cameras.main.centerX, this.y - 249, this.scene.state.lang.donePart, {
        font: '22px Shadow',
        fill: '#FFFFFF'
      }).setDepth(1).setOrigin(0.5, 0.5);

      this.scene.clickModalBtn({
        btn: this.doneButton,
        title: this.doneButtonText
      }, (): void => {
        this.scene.game.scene.keys[this.scene.state.farm].nextPart();
      });

      this.tileSprite = this.scene.add.tileSprite(30, this.y - 300, 660, 110, 'modal')
        .setOrigin(0)
        .setInteractive();

      // Анимация
      this.elements = [];
      this.elements.push(
        this.taskBoard,
        this.doneButton,
        this.doneButtonText,
        this.tileSprite
      )
      
      this.taskProgress?.clear();
    }
    
    if (this.status === 4 && task) {
      
      this.taskBoard = this.scene.add.graphics({
        x: 30,
        y: this.scene.height - 300
      });
      this.taskBoard.fillStyle(0xFFEBC5, 1);
      this.taskBoard.fillRoundedRect(0, 0, 660, 110, 8);

      this.lastPart = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.height - 245, this.scene.state.lang[this.scene.state.farm.toLowerCase() + 'CompanyDone'], {
        font: '26px Bip',
        fill: '#713D1E'
      }).setDepth(1).setOrigin(0.5, 0.5);

      this.tileSprite = this.scene.add.tileSprite(30, this.scene.height - 300, 660, 110, 'modal')
        .setOrigin(0)
        .setInteractive();

      this.taskProgress?.clear();

    }

    this.setActive(this.active);

  }

  public setActive(active: boolean): void {

    this.active = active;
    let tasks = this.scene.game.scene.keys[this.scene.state.farm].partTasks();
    tasks.sort((x1: Itasks, x2: Itasks) => {
      if (x1.got_awarded < x2.got_awarded) return -1;
      if (x1.got_awarded > x2.got_awarded) return 1;
      if (x1.done < x2.done) return 1;
      if (x1.done > x2.done) return -1;
      if (x1.sort < x2.sort) return -1;
      if (x1.sort > x2.sort) return 1;
      return 0;
    });

    let task: Itasks = tasks[0];

    if (this.status === 1 && task) {

      this.tileSprite.setVisible(active);
      this.taskText.setVisible(active);
      this.doneText.setVisible(active);
      this.taskBoard.setVisible(active);
      this.taskIcon.setVisible(active);
      this.taskProgress.setVisible(active);
      this.star.setVisible(active);

    }

    if (this.status === 2 && task) {

      this.tileSprite.setVisible(active);
      this.takeText.setVisible(active);
      this.done.setVisible(active);
      this.doneIcon.setVisible(active);
      this.taskIcon.setVisible(active);
      this.taskBoard.setVisible(active);
      this.awardBg.setVisible(active);
      this.award.setVisible(active);
      this.diamond.setVisible(active);
      this.taskText.setVisible(active);

    }

    if (this.status === 3 && task) {

      this.tileSprite.setVisible(active);
      this.taskBoard.setVisible(active);
      this.doneButton.setVisible(active);
      this.doneButtonText.setVisible(active);

    }

    if (this.status === 4 && task) {

      this.tileSprite.setVisible(active);
      this.taskBoard.setVisible(active);
      this.lastPart.setVisible(active);
      
    }

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

    if (this.taskBoard.zone?.scene && this.sendwich) {
      this.taskBoard.zone.depth = this.height + 1;
    } else if (this.taskBoard.zone?.scene && !this.sendwich) {
      this.taskBoard.zone.depth = -1;
    }

    this.sendwich = !this.sendwich;
    this.sendwichTimer = 0;

    if (this.sendwich) {
      this.menu.setTexture('sandwich-close');
    } else {
      this.menu.setTexture('sandwich');
    }

  });

}


// стрелки
class Arrows {

  public active: boolean;
  public visible: boolean;
  public scene: Phaser.Scene;
  public position: Iposition;
  public radius: number;
  public corners: boolean;
  public show_1: boolean;
  public show_2: boolean;
  public show_3: boolean;
  public show_4: boolean;
  public height: number;
  public arrow_1: Phaser.GameObjects.Sprite;
  public arrow_2: Phaser.GameObjects.Sprite;
  public arrow_3: Phaser.GameObjects.Sprite;
  public arrow_4: Phaser.GameObjects.Sprite;
  public counter: number;
  public outside: boolean;
  public pointPosition: Iposition;
  public fadeIn: boolean;

  constructor(
    scene: Phaser.Scene,
    position: Iposition | Phaser.GameObjects.Sprite,
    radius: number,
    corners: boolean,
    show_1: boolean,
    show_2: boolean,
    show_3: boolean,
    show_4: boolean,
    fadeIn: boolean = false
  ) {
    this.scene = scene;
    this.position = position;
    this.radius = radius;
    this.corners = corners;
    this.show_1 = show_1;
    this.show_2 = show_2;
    this.show_3 = show_3;
    this.show_4 = show_4;
    this.fadeIn = fadeIn;
    this.build();
  }


  public build(): void {

    this.pointPosition = { x: this.position.x, y: this.position.y }
    this.active = true;
    this.visible = true;
    this.counter = 0;
    this.outside = true;
    this.height = Number(this.scene.game.config.height);

    if (this.corners) {

      if (this.show_1) {
        this.arrow_1 = this.scene.add.sprite(this.position.x, this.position.y, 'arrow').setDepth(this.height + 100);
        this.arrow_1.setAngle(45);
        this.arrow_1.x = this.arrow_1.x - this.radius - (this.arrow_1.width / 2);
        this.arrow_1.y = this.arrow_1.y - this.radius - (this.arrow_1.width / 2);
      }

      if (this.show_2) {
        this.arrow_2 = this.scene.add.sprite(this.position.x, this.position.y, 'arrow').setDepth(this.height + 100);
        this.arrow_2.setAngle(135);
        this.arrow_2.x = this.arrow_2.x + this.radius + (this.arrow_2.width / 2);
        this.arrow_2.y = this.arrow_2.y - this.radius - (this.arrow_2.width / 2);
      }

      if (this.show_3) {
        this.arrow_3 = this.scene.add.sprite(this.position.x, this.position.y, 'arrow').setDepth(this.height + 100);
        this.arrow_3.setAngle(-135);
        this.arrow_3.x = this.arrow_3.x + this.radius + (this.arrow_3.width / 2);
        this.arrow_3.y = this.arrow_3.y + this.radius + (this.arrow_3.width / 2);
      }
      
      if (this.show_4) {
        this.arrow_4 = this.scene.add.sprite(this.position.x, this.position.y, 'arrow').setDepth(this.height + 100);
        this.arrow_4.setAngle(-45);
        this.arrow_4.x = this.arrow_4.x - this.radius - (this.arrow_4.width / 2);
        this.arrow_4.y = this.arrow_4.y + this.radius + (this.arrow_4.width / 2);
      }

    } else {

      if (this.show_1) {
        this.arrow_1 = this.scene.add.sprite(this.position.x, this.position.y, 'arrow').setDepth(this.height + 100);
        this.arrow_1.x = this.arrow_1.x - this.radius - (this.arrow_1.width / 2);
      }

      if (this.show_2) {
        this.arrow_2 = this.scene.add.sprite(this.position.x, this.position.y, 'arrow').setDepth(this.height + 100);
        this.arrow_2.setAngle(90);
        this.arrow_2.y = this.arrow_2.y - this.radius - (this.arrow_2.width / 2);
      }

      if (this.show_3) {
        this.arrow_3 = this.scene.add.sprite(this.position.x, this.position.y, 'arrow').setDepth(this.height + 100);
        this.arrow_3.setAngle(180);
        this.arrow_3.x = this.arrow_3.x + this.radius + (this.arrow_3.width / 2);
      }

      if (this.show_4) {
        this.arrow_4 = this.scene.add.sprite(this.position.x, this.position.y, 'arrow').setDepth(this.height + 100);
        this.arrow_4.setAngle(-90);
        this.arrow_4.y = this.arrow_4.y + this.radius + (this.arrow_4.width / 2);
      }

    }

    if (this.fadeIn) {

      if (this.show_1) this.arrow_1.setAlpha(0);
      if (this.show_2) this.arrow_2.setAlpha(0);
      if (this.show_3) this.arrow_3.setAlpha(0);
      if (this.show_4) this.arrow_4.setAlpha(0);
      
      let opacity: number = 0;
      let timeEvent: Phaser.Time.TimerEvent = this.scene.time.addEvent({ delay: 30, callback: (): void => {
  
        opacity += 0.05;
        if (this.show_1) this.arrow_1.setAlpha(opacity);
        if (this.show_2) this.arrow_2.setAlpha(opacity);
        if (this.show_3) this.arrow_3.setAlpha(opacity);
        if (this.show_4) this.arrow_4.setAlpha(opacity);
        if (opacity >= 1) timeEvent.remove(false);
  
      }, callbackScope: this, loop: true });

    }

  }


  public update(): void {

    if (this.pointPosition.x !== this.position.x) {

      let x: number = this.position.x - this.pointPosition.x;
      this.pointPosition.x = this.position.x;

      if (this.show_1) this.arrow_1.x += x;
      if (this.show_2) this.arrow_2.x += x;
      if (this.show_3) this.arrow_3.x += x;
      if (this.show_4) this.arrow_4.x += x;

    }

    if (this.pointPosition.y !== this.position.y) {

      let y: number = this.position.y - this.pointPosition.y;
      this.pointPosition.y = this.position.y;

      if (this.show_1) this.arrow_1.y += y;
      if (this.show_2) this.arrow_2.y += y;
      if (this.show_3) this.arrow_3.y += y;
      if (this.show_4) this.arrow_4.y += y;

    }

    this.counter++;

    if (this.corners) {

      if (this.outside) {

        if (this.show_1) {
          this.arrow_1.x -= 2.5;
          this.arrow_1.y -= 2.5;
        }

        if (this.show_2) {
          this.arrow_2.x += 2.5;
          this.arrow_2.y -= 2.5;
        }

        if (this.show_3) {
          this.arrow_3.x += 2.5;
          this.arrow_3.y += 2.5;
        }

        if (this.show_4) {
          this.arrow_4.x -= 2.5;
          this.arrow_4.y += 2.5;
        }

      } else {

        if (this.show_1) {
          this.arrow_1.x += 2.5;
          this.arrow_1.y += 2.5;
        }

        if (this.show_2) {
          this.arrow_2.x -= 2.5;
          this.arrow_2.y += 2.5;
        }

        if (this.show_3) {
          this.arrow_3.x -= 2.5;
          this.arrow_3.y -= 2.5;
        }

        if (this.show_4) {
          this.arrow_4.x += 2.5;
          this.arrow_4.y -= 2.5;
        }

      }

    } else {

      if (this.outside) {

        if (this.show_1) this.arrow_1.x -= 3;
        if (this.show_2) this.arrow_2.y -= 3;
        if (this.show_3) this.arrow_3.x += 3;
        if (this.show_4) this.arrow_4.y += 3;

      } else {

        if (this.show_1) this.arrow_1.x += 3;
        if (this.show_2) this.arrow_2.y += 3;
        if (this.show_3) this.arrow_3.x -= 3;
        if (this.show_4) this.arrow_4.y -= 3;

      }

    }
    
    if (this.counter === 20) {
      this.counter = 0;
      this.outside = !this.outside;
    }
    
  }


  public destroy(): void {

    if (this.show_1) this.arrow_1.destroy();
    if (this.show_2) this.arrow_2.destroy();
    if (this.show_3) this.arrow_3.destroy();
    if (this.show_4) this.arrow_4.destroy();
    this.active = false;

  }
  

  public setVisible(visible: boolean): void {

    if (this.show_1) this.arrow_1.setVisible(visible);
    if (this.show_2) this.arrow_2.setVisible(visible);
    if (this.show_3) this.arrow_3.setVisible(visible);
    if (this.show_4) this.arrow_4.setVisible(visible);
    this.visible = visible;
    
  }


}


export {
  createSpeechBubble,
  mergingCloud,
  bigButton,
  repositoryBtn,
  Collector,
  shopButton,
  boostButton,
  TaskBoard,
  buildMenu,
  Arrows
}
