// системное окно
import { shortTime } from '../../general/basic';
import Hint from '../../components/animations/Hint';
function systemWindow(): void {
  let height:number = 0;

  this.header = this.add.image(this.cameras.main.centerX - 1, this.cameras.main.centerY - Math.floor(height / 2), 'header-syst')
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
      this.game.scene.keys[`${this.state.farm}Bars`].hint = Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.feedBoostNative} ${shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang)}`, 2);
      this.state.boughtFeedBoost = false;
    };
    if (this.state.modal.sysType === 6) this.state.animal.expel = false;
    if (
      this.state.modal.sysType === 12 || 
      this.state.modal.sysType === 13 ||
      this.state.modal.sysType === 14 ||
      this.state.modal.sysType === 15
    ) {
      this.enterKey.destroy();
      this.mainInput.remove();
      if (this.secondInput !== undefined) this.secondInput.remove();
    }

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
      } else if (this.state.farm === 'Cow') {
        this.cow();
      }
      break;

    case 2: // окно территории

      if (this.state.farm === 'Sheep') {
        this.sheepTerritory();
      } else if (this.state.farm === 'Chicken') {
        this.chickenTerritory();
      } else if (this.state.farm === 'Cow') {
        this.cowTerritory();
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
      } else if (this.state.farm === 'Cow') {
        this.cowConvertor();
      } else if (this.state.farm === 'Event') {
        this.eventConvertor();
      }

      break;
      
    case 5: // окно подтверждения обмена территории

      if (this.state.farm === 'Sheep') {
        this.confirmSheepExchangeTerritory();
      } else if (this.state.farm === 'Chicken') {
        this.confirmChickenExchangeTerritory();
      } else if (this.state.farm === 'Cow') {
        this.confirmCowExchangeTerritory();
      }

      break;

      case 6: // окно подтверждения продажи животного

      if (this.state.farm === 'Sheep') {
        this.confirmExpelSheep();
      } else if (this.state.farm === 'Chicken') {
        this.confirmExpelChicken();
      } else if (this.state.farm === 'Cow') {
        this.confirmExpelCow();
      } else if (this.state.farm === 'Event') {
        this.confirmExpelAnimal();
      }
      
      break;

    case 7: // окно профиля

      this.profileWindow();
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
      } else if (this.state.farm === 'Cow') {
        this.diamondCowAd();
      }
      
      break;

    case 10: // окно улучшения собирателя
      
      if (this.state.farm !== 'Event') {
        this.improveCollector();
      } else {
        this.improveCollectorEvent();
      }
      
      break;
    
    case 11: //окно смены территории
      if(this.state.farm === 'Sheep') {
        this.sheepWoolRepositoryExchange();
      } else if (this.state.farm === 'Chicken') {
        this.chickenEggRepositoryExchange();
      } else if (this.state.farm === 'Cow') {
        this.cowMilkRepositoryExchange();
      }
      break;
    
    case 12: // Окно смены ника
      this.changeNickname();
      break;

    case 13: // Окно ввода почты
      this.addEmail();
      break;

    case 14: // Окно тех поддержки
      this.support();
      break;

    case 15: // Окно регистрации
      this.registration();
      break;

    default:      
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      break;

  }
  this.openModal(this.cameras.main);
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

// окно коровьей территории
function cowTerritory(): void {
  
  switch (this.state.territory.type) {

    case 0: // территория для покупки
      this.buyCowTerritory();
      break;

    case 1: // купленная земля
      this.boughtCowLand();
      break;

    case 2: // пастбище
      this.cowPasture();
      break;
      
    case 3: // поилка
      this.cowWater();
      break;

    case 4: // ярмарка
      this.cowFair();
      break;

    case 5: // хранилище яиц
      this.cowMilkRepository();
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

// Растягивание верхушки окна
function resizeWindowTop(height: number): void {

  this.textHeader.setY(this.textHeader.y - height)
  this.header.setY(this.header.y - height)
  this.close.setY(this.close.y - height)
  this.body.setY(this.body.y - height / 2)
  this.body.height += height

}

export {
  systemWindow,
  chickenTerritory,
  cowTerritory,
  sheepTerritory,
  resizeWindow,
  resizeWindowTop,
  eventTerritory
}