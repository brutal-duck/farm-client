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


export {
  bigButton,
  repositoryBtn,
  shopButton,
  boostButton,
}
