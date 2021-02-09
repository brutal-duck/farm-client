// окно подтверждения изгнания
function confirmExpelAnimal(): void {
    
  this.textHeader.setText(this.state.lang.expelChicken); // заменить тексты

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 60, this.state.lang.confirmExpelChicken, {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: { width: 400 }
  }).setOrigin(0.5, 0.5);

  let button = this.bigButton('red', 'center', 40, this.state.lang.expel);
  this.clickModalBtn(button, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.game.scene.keys[this.state.farm].expelAnimal();
  });

  let cancel = this.bigButton('yellow', 'center', 120, this.state.lang.cancel);
  this.clickModalBtn(cancel, (): void => {
    this.state.animal.expel = false;
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  });

  this.resizeWindow(250);

}

// окно конвертора куриной фермы
function eventConvertor(): void {

  this.textHeader.setText(this.state.lang.exchange);

  if (this.state.convertor.type === 1) {

    this.resizeWindow(300);

    let count: number | string = this.shortNum(this.state.convertor.count);
    let length: number = String(count).length * 10 + 15;

    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 140, this.state.lang.rememberSellEggs, {
      font: '26px Bip',
      color: '#57A90E',
      align: 'center',
      wordWrap: { width: 440 }
    }).setOrigin(0.5, 0);

    let notEnaugh: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - length, this.cameras.main.centerY - 10, this.state.lang.notEnoughForYou, {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    let border = notEnaugh.getBounds();

    this.add.text(border.right + 50, this.cameras.main.centerY - 10, count, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center'
    }).setOrigin(0, 0.5);

    this.add.sprite(border.right + 5, this.cameras.main.centerY - 10, 'eventCoin')
      .setOrigin(0, 0.5)
      .setScale(0.15);

      
    if (this.state.convertor.diamonds === 1 && this.state.readyAd) {

      let right = {
        icon: 'ad-icon',
        text: ''
      }

      let ad = this.bigButton('green', 'left', 60, this.state.lang.addCoins, right);
      this.clickModalBtn(ad, (): void => {

        this.game.scene.keys[this.state.farm].watchAd(1);
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        
      });

    } else {

      // let right = {
      //   icon: 'diamond',
      //   text: shortNum(this.state.convertor.diamonds)
      // }
    
      // let pay = this.bigButton('green', 'left', 60, this.state.lang.surcharge, right);
      // this.clickModalBtn(pay, (): void => {
      //   this.scene.stop();
      //   this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      //   this.game.scene.keys[this.state.farm].exchange();
      // });

      let btn = this.bigButton('green', 'center', 60, this.state.lang.goExchanger);
      this.clickModalBtn(btn, (): void => {
        let modal: Imodal = {
          type: 2,
          shopType: 2
        }
        this.state.modal = modal;
        this.scene.stop();
        this.scene.start('Modal', this.state);

      });
    }
  
    let cancel = this.bigButton('yellow', 'center', 140, this.state.lang.cancel);
    this.clickModalBtn(cancel, (): void => {
      if (this.state.boughtFeedBoost) {
        this.game.scene.keys[`${this.state.farm}Bars`].showFeedTime();
        this.state.boughtFeedBoost = false;
      };
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    });

  } else if (this.state.convertor.type === 2) {
    
    this.resizeWindow(280);

    let count: number | string = this.shortNum(this.state.convertor.count);
    let length: number = String(count).length * 10 + 15;

    let notEnaugh: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - length, this.cameras.main.centerY - 55, this.state.lang.notEnoughForYou, {
      font: '26px Bip',
      color: '#925C28'
    }).setOrigin(0.5, 0.5);

    let border = notEnaugh.getBounds();

    this.add.text(border.right + 50, this.cameras.main.centerY - 55, count, {
      font: '26px Bip',
      color: '#925C28',
      align: 'center'
    }).setOrigin(0, 0.5);

    this.add.sprite(border.right + 5, this.cameras.main.centerY - 55, 'diamond')
      .setOrigin(0, 0.5)
      .setScale(0.15);

    let pay = this.bigButton('green', 'center', 40, this.state.lang.buy);
    this.clickModalBtn(pay, (): void => {

      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].showBank();

    });

    let cancel = this.bigButton('yellow', 'center', 120, this.state.lang.cancel);
    this.clickModalBtn(cancel, (): void => {
      if (this.state.boughtFeedBoost) {
        this.game.scene.keys[`${this.state.farm}Bars`].showFeedTime();
        this.state.boughtFeedBoost = false;
      };
      
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    });

  }

}

function buyEventTerritory(): void {
  this.textHeader.setText(this.state.lang.buyTerritory);

  let settings: IeventTerritoriesPrice = this.state.eventSettings.territoriesEventPrice.find((data: IeventTerritoriesPrice) => data.block === this.state.territory.block && data.position === this.state.territory.position);

  if (this.state.userEvent.maxLevelAnimal >= settings.unlock) {
    if (settings.diamond > 0) {
      // 70% от суммы покупки  
      let right = {
        icon: 'diamond',
        text: settings.diamond
      }
    
      let button = this.bigButton('yellow', 'left', 20, this.state.lang.buyTerritory, right);
      this.clickModalBtn(button, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].buyTerritory();
      });

    } else {

      // 70% от суммы покупки
      let price = Math.round((settings.price / 100) * 70);
  
      let right = {
        icon: 'eventCoin',
        text: this.shortNum(price)
      }
    
      let button = this.bigButton('yellow', 'left', 20, this.state.lang.buyTerritory, right);
      this.clickModalBtn(button, (): void => {
        this.scene.stop();
        this.game.scene.keys[this.state.farm].scrolling.wheel = true;
        this.game.scene.keys[this.state.farm].buyTerritory();
      });

    }
    
  } else {

    let right = {
      icon: 'lock',
      text: this.state.lang.shortPart + ' ' + settings.unlock
    }
  
    this.bigButton('grey', 'left', 20, this.state.lang.buyTerritory, right);

  }
  
  this.resizeWindow(130);
}

// окно улучшения собирателя 
function improveCollectorEvent(): void {

  this.textHeader.setText(this.state.lang.eggCollector + ' ' + this.state.userEvent.collectorLevel + ' ' + this.state.lang.shortLevel + '.');

  let thisLevel: IcollectorSettings = this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userEvent.collectorLevel);
  let nextLevel: IcollectorSettings = this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userEvent.collectorLevel + 1);

  let speedText: string = this.state.lang.speed + ': ' + thisLevel.speed + ' / ' + this.state.lang.seconds;
  let speed: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 80, speedText, {
    font: '34px Bip',
    color: '#925C28'
  });
  
  let durationText: string = this.state.lang.duration + ': ' + thisLevel.time + ' ' + this.state.lang.minutes;
  let duration: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 25, durationText, {
    font: '34px Bip',
    color: '#925C28'
  });

  let icon: string;

  if (nextLevel.time > thisLevel.time) {

    let position: Iposition = {
      x: duration.getBounds().right + 10,
      y: duration.y
    }
    let text: string = '(+' + (nextLevel.time - thisLevel.time) + ' ' + this.state.lang.shortMinutes +  ')';
    this.add.text(position.x, position.y, text, {
      font: '34px Bip',
      color: '#57A90E'
    });
    
  } else if (nextLevel.speed > thisLevel.speed) {

    let position: Iposition = {
      x: speed.getBounds().right + 10,
      y: speed.y
    }
    let text: string = '(+' + (nextLevel.speed - thisLevel.speed).toFixed(1) + ' ' + this.state.lang.seconds +  ')';
    this.add.text(position.x, position.y, text, {
      font: '34px Bip',
      color: '#57A90E'
    });

  }

  if (this.state.userEvent.maxLevelAnimal >= nextLevel.chapter) {

    if (nextLevel.diamonds) icon = 'diamond';
    else icon = 'eventCoin';

    let right = {
      icon: icon,
      text: String(nextLevel.price)
    }
    let improve = this.bigButton('green', 'left', 90, this.state.lang.improve, right);
    this.clickModalBtn(improve, (): void => {

      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.game.scene.keys[this.state.farm].improveCollector();

    });

  } else {

    let improve = {
      icon: 'lock',
      text: this.state.lang.shortPart + ' ' + nextLevel.chapter
    }
    this.bigButton('grey', 'left', 90, this.state.lang.improve, improve);

  }

  this.resizeWindow(250);
  
}

export { 
  confirmExpelAnimal,
  eventConvertor,
  buyEventTerritory,
  improveCollectorEvent
} 