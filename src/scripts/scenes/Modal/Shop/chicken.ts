import { shortNum, shortTime } from '../../../general/basic';

// монеты
function chickenMoney(): void {
  
  let diamonds: number[] = [1, 10, 50, 100, 500, 1000];
  let rows: number = Math.ceil(diamonds.length / 2);
  let height: number = rows * 270 + 40;
  this.scrolling.bottom = this.height - this.heightWindow + height;

  for (let i: number = 0; i < rows; i++) {

    let y: number = i * 270 + 40;
    let left: number = diamonds[i * 2];
    let right: number = diamonds[i * 2 + 1];

    let pack: Phaser.GameObjects.Sprite = this.add.sprite(0, y + this.height, 'chicken-money-package').setOrigin(0, 0);
    this.click(pack, (): void => {

      this.state.convertor = {
        fun: 0,
        count: left,
        diamonds: left,
        type: 1
      }
      this.game.scene.keys[this.state.farm].exchange();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');

    });
    
    let count: string = String(shortNum(this.game.scene.keys[this.state.farm].convertDiamonds(left)));

    this.add.text(110, y + 160 + this.height, count, {
      font: '40px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

    let btn = this.shopButton(110, y + 223 + this.height, left, 'diamond');
    this.clickShopBtn(btn, (): void => {
      
      this.state.convertor = {
        fun: 0,
        count: left,
        diamonds: left,
        type: 1
      }
      this.game.scene.keys[this.state.farm].exchange();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');

    });

    if (right) {

      let pack: Phaser.GameObjects.Sprite = this.add.sprite(240, y + this.height, 'chicken-money-package').setOrigin(0, 0);
      this.click(pack, (): void => {

        this.state.convertor = {
          fun: 0,
          count: right,
          diamonds: right,
          type: 1
        }
        this.game.scene.keys[this.state.farm].exchange();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');

      });

      let count: string = String(shortNum(this.game.scene.keys[this.state.farm].convertDiamonds(right)));

      this.add.text(350, y + 160 + this.height, count, {
        font: '40px Shadow',
        color: '#FFFFFF'
      }).setOrigin(0.5, 0.5);

      let btn = this.shopButton(350, y + 223 + this.height, right, 'diamond');
      this.clickShopBtn(btn, (): void => {

        this.state.convertor = {
          fun: 0,
          count: right,
          diamonds: right,
          type: 1
        }
        this.game.scene.keys[this.state.farm].exchange();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.scene.stop();
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');

      });

    }

  }

}


// курицы
function chicken(): void {

  let rows: number = this.state.chickenSettings.chickenSettings.length;
  let height: number = rows * 270 + 40;
  this.scrolling.bottom = this.height - this.heightWindow + height;
  
  for (let i: number = 0; i < rows; i++) {

    let y: number = i * 270 + 40;
    this.add.sprite(0, y + this.height, 'animal-shop-bg').setOrigin(0, 0);

    let chicken: IchickenPoints = this.state.chickenSettings.chickenSettings.find((data: IchickenPoints) => data.breed === i + 1);

    // иконка
    if (this.state.userChicken.fair + 1 < chicken.breed) {
      this.add.sprite(110, y + this.height + 110, 'disable-chicken');
    } else {

      let sprite: Phaser.GameObjects.Sprite = this.add.sprite(110, y + this.height + 110, 'chicken' + chicken.breed);
      sprite.anims.play('chicken-drag' + chicken.breed, true);

    }

    // описание
    let center: number = y + 110 + this.height;
    
    let chickenName: string = this.state.lang['chickenBreed' + chicken.breed];
    let name: Phaser.GameObjects.Text = this.add.text(240, center, chickenName, {
      font: '28px Shadow',
      fill: '#FFFFFF',
      align: 'left',
      wordWrap: { width: 230 }
    }).setOrigin(0, 0.5);
    let boundsName = name.getBounds();

    let eggPriceText: string = this.state.lang.eggPrice;
    let egg: Phaser.GameObjects.Text = this.add.text(240, center, eggPriceText, {
      font: '20px Shadow',
      fill: '#FFFFFF'
    }).setOrigin(0, 0.5);
    let boundsEgg = egg.getBounds();

    let eggPrice: Phaser.GameObjects.Text = this.add.text(boundsEgg.right, center, String(shortNum(chicken.eggPrice)), {
      font: '20px Shadow',
      fill: '#ECC896'
    }).setOrigin(0, 0.5);

    // кнопка покупки
    let heightBtn: number = 0;
    let btn: any = false;
    if (chicken.breed <= this.state.userChicken.fair - this.state.chickenSettings.buyBetterBreedChicken || chicken.breed === 1) {

      let price: string = String(shortNum(this.chickenPrice(chicken.breed).price));
      
      btn = this.shopButton(330, center, price, 'chickenCoin');
      this.clickShopBtn(btn, (): void => {

        let result: boolean = this.game.scene.keys[this.state.farm].buyChicken(chicken.breed, true);
        if (result) this.updateChickenPrices();

      });

      this.buttons.push({
        text: btn.title,
        breed: chicken.breed,
        img: btn.img
      });

      heightBtn = btn.btn.height;

    }
    
    let height: number = heightBtn + boundsName.height + boundsEgg.height + 20;
    name.y -= height / 2 - (boundsName.height / 2);
    egg.y -= height / 2 - boundsName.height - (boundsEgg.height / 2) - 5;
    eggPrice.y = egg.y;

    if (btn) {
      btn.btn.y += height / 2 - (heightBtn / 2);
      btn.title.y += height / 2 - (heightBtn / 2);
      btn.img.y += height / 2 - (heightBtn / 2);
    }

  }

}


// бусты
function chickenBoosts(): void {

  this.scrolling.bottom = this.height - this.heightWindow + 300;

  // собиратель яиц
  this.add.sprite(0, 20 + this.height, 'boost-bg').setOrigin(0, 0);
  this.add.text(225, 40 + this.height, this.state.lang.eggCollector, {
    font: '28px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
  let collectorSprite: Phaser.GameObjects.Sprite = this.add.sprite(40, 65 + this.height, 'shop-chicken-egg-collector').setOrigin(0, 0);
  let levelBg: Phaser.GameObjects.Sprite = this.add.sprite(10, 55 + this.height, 'level-bg').setOrigin(0, 0);
  
  let level: string = String(this.state.userChicken.collectorLevel);
  if (this.state.userChicken.collectorLevel === this.state.chickenCollectorSettings.length) level = 'Max';

  let userLevel: Phaser.GameObjects.Text = this.add.text(52, 90 + this.height, level, {
    font: '26px Bip',
    color: '#F8DF86'
  }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);
  let levelText: Phaser.GameObjects.Text = this.add.text(52, 110 + this.height, this.state.lang.shortLevel, {
    font: '18px Bip',
    color: '#F8DF86'
  }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);

  let freeTime: number = this.state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userChicken.collectorLevel).time;

  // осталось времени
  if (this.state.userChicken.collector > 0) {

    let time: string = shortTime(this.state.userChicken.collector, this.state.lang);
    this.collectorTimer = this.add.text(120, 235 + this.height, this.state.lang.still + ' ' + time, {
      font: '20px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

  }

  // бесплатный
  if (this.state.userChicken.collector === 0) {

    this.freeCollector = this.boostButton(350, 100 + this.height, String(freeTime), this.state.lang.shortMinutes, this.state.lang.take, 'free');
    this.clickBoostBtn(this.freeCollector, (): void => {
      this.game.scene.keys[this.state.farm].freeCollector(1);
    });

  } else {

    this.boostButton(350, 100 + this.height, String(freeTime), this.state.lang.shortMinutes, this.state.lang.take, 'free-lock');

  }

  // удвоенный собиратель
  let doubleTime: number = freeTime * 2;

  let doubleTimePrice: number = Math.floor(doubleTime / 60 * this.state.chickenSettings.doubledСollectorPrice);

  if (this.state.userChicken.collector === 0) {

    if (this.state.readyAd) {

      let doubleCollector = this.boostButton(350, 160 + this.height, String(doubleTime), this.state.lang.shortMinutes, '', 'ad');
      this.clickBoostBtn(doubleCollector, (): void => {

        this.game.scene.keys[this.state.farm].watchAd(3);
        this.scene.stop('Shop');
        this.scene.stop('ShopBars');
        this.scene.stop('Modal');
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;

      });

    } else {
      
      let doubleCollector = this.boostButton(350, 160 + this.height, String(doubleTime), this.state.lang.shortMinutes, String(doubleTimePrice), 'ad-diamond');
      this.clickBoostBtn(doubleCollector, (): void => {
        this.game.scene.keys[this.state.farm].freeCollector(2);
      });

    }

  } else {
    
    if (this.state.readyAd) {
      this.boostButton(350, 160 + this.height, String(doubleTime), this.state.lang.shortMinutes, '', 'lock-ad');
    } else {
      this.boostButton(350, 160 + this.height, String(doubleTime), this.state.lang.shortMinutes, String(doubleTimePrice), 'lock-ad-diamond');
    }

  }

  // 4 часа собирателя
  if (this.state.chickenSettings.unlockCollector4 <= this.state.userChicken.part) {

    let hours4 = this.boostButton(350, 220 + this.height, '4', this.state.lang.shortHours, String(this.state.chickenSettings.collectorPrice4), 'diamond');
    this.clickBoostBtn(hours4, (): void => {
      this.game.scene.keys[this.state.farm].buyCollector(3);
    });

  } else {

    this.boostButton(350, 220 + this.height, '4', this.state.lang.shortHours, String(this.state.chickenSettings.unlockCollector4), 'lock');
    
  }

  // 12 часов собирателя
  if (this.state.chickenSettings.unlockCollector12 <= this.state.userChicken.part) {

    let hours12 = this.boostButton(350, 280 + this.height, '12', this.state.lang.shortHours, String(this.state.chickenSettings.collectorPrice12), 'diamond');
    this.clickBoostBtn(hours12, (): void => {
      this.game.scene.keys[this.state.farm].buyCollector(4);
    });

  } else {

    this.boostButton(350, 280 + this.height, '12', this.state.lang.shortHours, String(this.state.chickenSettings.unlockCollector12), 'lock');
    
  }

  // кнопка улучшения
  if (this.state.userChicken.collectorLevel < this.state.chickenCollectorSettings.length) {
  
    let improve: Phaser.GameObjects.Sprite = this.add.sprite(120, 285 + this.height, 'improve-collector');
    let improveText: Phaser.GameObjects.Text = this.add.text(120, 281 + this.height, this.state.lang.improve, {
      font: '26px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4);

    this.clickShopBtn({ btn: improve, title: improveText }, (): void => {
      this.game.scene.keys[this.state.farm].showImproveCollector();
    });

    if (this.state.userChicken.collector === 0) {
      improve.y -= 15;
      improveText.y -= 15;
    }

  } else {

    if (this.state.userChicken.collector > 0) {

      this.collectorTimer.y += 45;
      collectorSprite.y += 25;
      levelBg.y += 25;
      userLevel.y += 25;
      levelText.y += 25;

    } else {

      collectorSprite.y += 35;
      levelBg.y += 35;
      userLevel.y += 35;
      levelText.y += 35;

    }

  }

}


// обновление цен кнопок
function updateChickenPrices(): void {
  
  for (let i in this.buttons) {

    this.buttons[i].text.setText(String(shortNum(this.chickenPrice(this.buttons[i].breed).price)));
    this.buttons[i].img.x = this.buttons[i].text.getBounds().left - 25;

  }

}


export {
  chickenMoney,
  chicken,
  chickenBoosts,
  updateChickenPrices
}
