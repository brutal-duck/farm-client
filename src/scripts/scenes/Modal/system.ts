// системное окно
function systemWindow(): void {

  let height = 0;

  this.header = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - Math.floor(height / 2), 'header-syst')
    .setOrigin(0.5, 1);
  this.close = this.add.sprite(620, this.cameras.main.centerY - Math.floor(height / 2) - 45, 'header-close')
    .setOrigin(0.5, 0.5)
    .setDepth(1);
  this.bottom = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + Math.floor(height / 2), 'bottom-syst')
    .setOrigin(0.5, 0);
  this.body = this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 614, height + 2, 'mid-syst')
    .setOrigin(0.5, 0.5);
  this.textHeader = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - Math.floor(height / 2) - 25, '', {
    font: '37px Shadow',
    fill: '#F9D48D'
  }).setDepth(1).setOrigin(0.5, 1);

  this.clickButton(this.close, (): void => {
    if (this.state.boughtFeedBoost) {
      this.game.scene.keys[`${this.state.farm}Bars`].showFeedTime();
      this.state.boughtFeedBoost = false;
    };
    if (this.state.modal.sysType === 6) this.state.animal.expel = false;
    if (this.state.modal.sysType === 12) this.mainInput.remove();

    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;

  });

  // блокирование крестика для туториала
  if ((this.state.modal?.sysType === 2 &&
    this.state.userSheep?.tutorial === 20 &&
    this.state.territory?.block === 2 &&
    this.state.territory?.position === 3) ||
    (this.state.modal?.sysType === 2 &&
    this.state.userSheep?.tutorial === 30 &&
    this.state.territory?.block === 2 &&
    this.state.territory?.position === 2) ||
    (this.state.modal?.sysType === 2 &&
    this.state.userSheep?.tutorial === 80 &&
    this.state.territory?.block === 2 &&
    this.state.territory?.position === 1)) {
    this.close.setVisible(false);
  }

  // тип окна
  switch (this.state.modal.sysType) {
    case 1: // окно животного
    
      if (this.state.farm === 'Sheep') {
        this.sheep();
      } else if (this.state.farm === 'Chicken') {
        this.chicken();
      }
      break;

    case 2: // окно территории

      if (this.state.farm === 'Sheep') {
        this.sheepTerritory();
      } else if (this.state.farm === 'Chicken') {
        this.chickenTerritory();
      } else if (this.state.farm === 'Event') {
        this.eventTerritory();
      }
      
      break;

    case 3: // окно с сообщением
      this.textHeader.setText(this.state.lang.message);
      this.resizeWindow(this.state.modal.height);
      this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 20, this.state.modal.message, {
        font: '26px Bip',
        color: '#925C28',
        align: 'center',
        wordWrap: { width: 400 }
      }).setOrigin(0.5, 0.5);
      break;
    
    case 4: // окно конвертора

      if (this.state.farm === 'Sheep') {
        this.sheepConvertor();
      } else if (this.state.farm === 'Chicken') {
        this.chickenConvertor();
      } else if (this.state.farm === 'Event') {
        this.eventConvertor();
      }

      break;
      
    case 5: // окно подтверждения обмена территории

      if (this.state.farm === 'Sheep') {
        this.confirmSheepExchangeTerritory();
      } else if (this.state.farm === 'Chicken') {
        this.confirmChickenExchangeTerritory();
      }

      break;

      case 6: // окно подтверждения продажи животного

      if (this.state.farm === 'Sheep') {
        this.confirmExpelSheep();
      } else if (this.state.farm === 'Chicken') {
        this.confirmExpelChicken();
      } else if (this.state.farm === 'Event') {
        this.confirmExpelAnimal();
      }
      
      break;

    case 7: // окно профиля

      if (this.state.farm === 'Sheep') {
        this.sheepProfile();
      } else if (this.state.farm === 'Chicken') {
        this.chickenProfile();
      }
      
      break;

    case 8: // окно завершения сессии
      
      this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0)');
      this.close.setVisible(false);
      this.textHeader.setText(this.state.lang.message);
      this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 20, this.state.lang.stopSession, {
        font: '26px Bip',
        color: '#925C28',
        align: 'center',
        wordWrap: { width: 400 }
      }).setOrigin(0.5, 0.5);
      this.resizeWindow(120);
      
      break;

    case 9: // окно завершения сессии
      
      if (this.state.farm === 'Sheep') {
        this.diamondSheepAd();
      } else if (this.state.farm === 'Chicken') {
        this.diamondChickenAd();
      }
      
      break;

    case 10: // окно улучшения собирателя
      
      if (this.state.farm === 'Sheep') {
        this.improveCollectorSheep();
      } else if (this.state.farm === 'Chicken') {
        this.improveCollectorChicken();
      }
      
      break;
    
    case 11: //окно смены территории
      if(this.state.farm === 'Sheep') {
        this.sheepWoolRepositoryExchange();
      } else if (this.state.farm === 'Chicken') {
        this.chickenEggRepositoryExchange();
      }
      break;
    
    case 12:
      this.changeNickname();
      break;
    default:      
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      break;
    

  }

}

// окно куриной территории
function chickenTerritory(): void {
  
  switch (this.state.territory.type) {

    case 0: // территория для покупки
      this.buyChickenTerritory();
      break;

    case 1: // купленная земля
      this.boughtChickenLand();
      break;

    case 2: // пастбище
      this.chickenPasture();
      break;
      
    case 3: // поилка
      this.chickenWater();
      break;

    case 4: // ярмарка
      this.chickenFair();
      break;

    case 5: // хранилище яиц
      this.chickenEggsRepository();
      break;

    default:
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      break;
  }

}


// окно овечей территории
function sheepTerritory(): void {
  
  switch (this.state.territory.type) {

    case 0: // территория для покупки
      this.buySheepTerritory();
      break;

    case 1: // купленная земля
      this.boughtSheepLand();
      break;

    case 2: // пастбище
      this.sheepPasture();
      break;
      
    case 3: // поилка
      this.sheepWater();
      break;

    case 4: // ярмарка
      this.sheepFair();
      break;

    case 5: // хранилище шерсти
      this.sheepWoolRepository();
      break;

    default:
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      break;
  }

}

// окно эвентовой территории 
function eventTerritory(): void {
  
  switch (this.state.territory.type) {

    case 0: // территория для покупки
      this.buyEventTerritory();
      break;

    default:
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      break;
  }

}


// задать размеры
function resizeWindow(height: number): void {

  this.header.y = this.cameras.main.centerY - Math.floor(height / 2);
  this.close.y = this.cameras.main.centerY - Math.floor(height / 2) - 45;
  this.bottom.y = this.cameras.main.centerY + Math.floor(height / 2);
  this.body.height = height + 2;
  this.textHeader.setPosition(this.textHeader.x, this.cameras.main.centerY - Math.floor(height / 2) - 25);

}

export {
  systemWindow,
  chickenTerritory,
  sheepTerritory,
  resizeWindow,
  eventTerritory
}