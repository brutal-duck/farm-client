// системное окно
import { shortTime } from '../../general/basic';
import Hint from '../../components/animations/Hint';
import ShowCaseWindow from './../../components/modal/ShowCaseWindow';
import ExchangeTerritoryWindow from '../../components/modal/system/ExchangeTerritoryWindow';
import ExpelAnimalWindow from '../../components/modal/system/ExpelAnimalWindow';
import LogoutWindow from '../../components/modal/system/LogoutWindow';
import DiamondAnimalAd from '../../components/modal/system/DiamondAnimalAd';
import ImproveCollectorWindow from '../../components/modal/system/ImproveCollectorWindow';
import ImproveCollectorEventWindow from '../../components/modal/system/ImproveCollectorEventWindow';
import TerritoryExchangeWindow from '../../components/modal/system/TerritoryExchangeWindow';
import TerritoryExchangeWindowNew from '../../components/modal/system/TerritoryExchangeWindowNew';
import ChangeNicknameWindow from '../../components/modal/system/ChangeNicknameWindow';
import AddEmailWindow from '../../components/modal/system/AddEmailWindow';
import SupportWindow from '../../components/modal/system/SupportWindow';
import RegistrationWindow from '../../components/modal/system/RegistrationWindow';
import CurrencyConvertorWindow from '../../components/modal/system/CurrencyConvertorWindow';
import MessageWindow from '../../components/modal/system/MessageWindow';
import BuyFarmTerritoryWindow from '../../components/modal/system/BuyFarmTerritoryWindow';
import ImproveFactoryWindow from '../../components/modal/system/ImproveFactoryWindow';
import ConfirmSellMilk from '../../components/modal/system/ConfirmSellMilk';
import ConfirmBuyCooldown from '../../components/modal/system/ConfirmBuyCooldown';
import BoughtFarmLand from '../../components/modal/system/BoughtFarmLand';
import BoughtFarmLandNew from '../../components/modal/system/BoughtFarmLandNew';
import FarmPastureWindow from '../../components/modal/system/FarmPastureWindow';
import FarmWaterWindow from '../../components/modal/system/FarmWaterWindow';
import FarmFairWindow from '../../components/modal/system/FarmFairWindow';
import FarmResourceRepositoryWindow from '../../components/modal/system/FarmResourceRepositoryWindow';
import FarmResourceRepositoryWindowNew from '../../components/modal/system/FarmResourceRepositoryWindowNew';
import SheepWindow from '../../components/modal/system/SheepWindow';
import ChickenWindow from '../../components/modal/system/ChickenWindow';
import CowWindow from '../../components/modal/system/CowWindow';
import ConfirmSaveYandexProgress from '../../components/modal/system/ConfirmSaveYandexProgress';
import ConfimExcludeUserWindow from '../../components/modal/system/ConfimExcludeUserWindow';
import ConfirmBuyFarm from './../../components/modal/system/ConfirmByFarm';
import ConfirmSpendDiamonds from './../../components/modal/system/ConfirmSpendDiamonds';
import RecallWindow from './../../components/modal/system/RecallWindow';
import ConfirmBuyAvatar from '../../components/modal/system/ConfirmBuyAvatar';
import MultiplyIncomeAd from './../../components/modal/system/MultiplyIncomeAd';
import ImproveCollectorWindowNew from './../../components/modal/system/ImproveCollectorWindowNew';
import Utils from './../../libs/Utils';
import FarmPastureWindowNew from './../../components/modal/system/FarmPastureWindowNew';
import FarmWaterWindowNew from './../../components/modal/system/FarmWaterWindowNew';
import FarmFairWindowNew from './../../components/modal/system/FarmFairWindowNew';

function systemWindow(): void {
  let height:number = 0;

  this.header = this.add.image(this.cameras.main.centerX - 1, this.cameras.main.centerY - Math.floor(height / 2), 'header-syst').setOrigin(0.5, 1).setDepth(1);
  this.close = this.add.sprite(620, this.header.getCenter().y, 'close-window-btn').setOrigin(0.5).setDepth(2);
  this.body = this.add.tileSprite(this.cameras.main.centerX, this.header.getBottomCenter().y - 12, 614, height + 2, 'mid-syst').setOrigin(0.5, 0.5);
  this.bottom = this.add.image(this.cameras.main.centerX - 1, this.body.getBottomCenter().y, 'bottom-syst').setOrigin(0.5, 0);
  this.textHeader = this.add.text(this.cameras.main.centerX, this.header.getCenter().y - 6, '', {
    font: '37px Shadow',
    fill: '#F9D48D'
  }).setDepth(1).setOrigin(0.5);

  this.clickButton(this.close, (): void => {
    if (this.state.boughtFeedBoost) {
      Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.feedBoostNotification} ${shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang)}`, 2);
      this.state.boughtFeedBoost = false;
    };
    if (this.state.boughtFactoryBoost) {
      Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, `${this.state.lang.factoryBoostNotification} ${shortTime(this.state[`user${this.state.farm}`].factory.boostTime, this.state.lang)}`, 2);
      this.state.boughtFactoryBoost = false;
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
    if (this.state.modal.sysType !== 16 && this.state.modal.sysType !== 17) {
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    }
    if (this.state.modal.sysType === 16 || this.state.modal.sysType === 17) {
      const modal: Imodal = {
        type: 13,
      }
      this.state.modal = modal;
      this.scene.restart(this.state);
    }
    if (this.state.modal.sysType === 27) {
      if (this.state.farm !== 'Cow') this.state.territory?.sellResource();
      else this.state.territory?.factory?.sellProducts();
    }
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
    
      if (this.state.farm === 'Sheep') new SheepWindow(this);
      else if (this.state.farm === 'Chicken') new ChickenWindow(this);
      else if (this.state.farm === 'Cow') new CowWindow(this);
      break;

    case 2: // окно территории

      if (this.state.farm === 'Sheep')  this.sheepTerritory();
      else if (this.state.farm === 'Chicken') this.chickenTerritory();
      else if (this.state.farm === 'Cow') this.cowTerritory();
      else if (this.state.farm === 'Unicorn') this.eventTerritory();
      break;

    case 3: // окно с сообщением
      new MessageWindow(this)
      break;
    
    case 4: // окно конвертора
      new CurrencyConvertorWindow(this)
      break;
      
    case 5: // окно подтверждения обмена территории
      if (this.state.farm !== 'Unicorn') new ExchangeTerritoryWindow(this)
      break;

    case 6: // окно подтверждения продажи животного
      new ExpelAnimalWindow(this)
      break;

    case 7: // окно профиля
      break;

    case 8: // окно завершения сессии
      new LogoutWindow(this)
      break;

    case 9:
      new DiamondAnimalAd(this)
      break;

    case 10: // окно улучшения собирателя
      
      if (this.state.farm !== 'Unicorn') {
        if (!Utils.checkTestB(this.state)) new ImproveCollectorWindow(this);
        else new ImproveCollectorWindowNew(this);
      }
      else new ImproveCollectorEventWindow(this)
      break;
    
    case 11: //окно смены территории
    
      if (this.state.farm !== 'Unicorn') {
        if (Utils.checkTestB(this.state)) new TerritoryExchangeWindowNew(this);
        else new TerritoryExchangeWindow(this);
      }
      break;
    
    case 12: // Окно смены ника
      new ChangeNicknameWindow(this)
      break;

    case 13: // Окно ввода почты
      new AddEmailWindow(this)
      break;

    case 14: // Окно тех поддержки
      new SupportWindow(this)
      break;

    case 15: // Окно регистрации
      new RegistrationWindow(this)
      break;
    
    case 16: // Окно улучшения фабрики
      new ImproveFactoryWindow(this);
      break;

    case 17: // Окно ветрины фабрики
      new ShowCaseWindow(this);
      break;
    
    case 18: 
      new ConfirmSellMilk(this);
      break;
    
    case 19: 
      new ConfirmBuyCooldown(this);
      break;

    case 20: 
      new ConfirmSaveYandexProgress(this);
      break;
      
    case 21: 
      break;

    case 22: 
      new ConfimExcludeUserWindow(this);
      break;

    case 23: 
      new ConfirmBuyFarm(this);
      break;
    
    case 24: 
      new ConfirmSpendDiamonds(this);
      break;
    
    case 25: 
      new RecallWindow(this)
      break;

    case 26: 
      new ConfirmBuyAvatar(this);
      break;

    case 27:
      new MultiplyIncomeAd(this);
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
  const improve: number = this.state.territory.improve;
  let checkImprove: boolean = improve < this.state[`${this.state.farm.toLowerCase()}Settings`][`territories${this.state.farm}Settings`].length;
  if (Utils.checkTestB(this.state)) checkImprove = improve < this.state[`${this.state.farm.toLowerCase()}Settings`].partSettings.length;

  switch (this.state.territory.territoryType) {

    case 0: // территория для покупки
      new BuyFarmTerritoryWindow(this)  
      break;

    case 1: // купленная земля
      if (Utils.checkTestB(this.state)) new BoughtFarmLandNew(this);
      else new BoughtFarmLand(this);
      break;

    case 2: // пастбище
      if (checkImprove) {
        if (Utils.checkTestB(this.state)) new FarmPastureWindowNew(this);
        else new FarmPastureWindow(this);
      } else {
        if (Utils.checkTestB(this.state)) new TerritoryExchangeWindowNew(this);
        else new TerritoryExchangeWindow(this);
      }
      break;
      
    case 3: // поилка
      if (checkImprove) {
        if (Utils.checkTestB(this.state)) new FarmWaterWindowNew(this);
        else new FarmWaterWindow(this);
      } else {
        if (Utils.checkTestB(this.state)) new TerritoryExchangeWindowNew(this);
        else new TerritoryExchangeWindow(this);
      }
      break;

    case 4: // ярмарка
      if (Utils.checkTestB(this.state)) new FarmFairWindowNew(this);
      else new FarmFairWindow(this);
      break;

    case 5: // хранилище яиц
      if (Utils.checkTestB(this.state)) new FarmResourceRepositoryWindowNew(this);
      else new FarmResourceRepositoryWindow(this);
      break;

    default:
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      break;
  }

}

// окно коровьей территории
function cowTerritory(): void {
  const improve: number = this.state.territory.improve;
  let checkImprove: boolean = improve < this.state[`${this.state.farm.toLowerCase()}Settings`][`territories${this.state.farm}Settings`].length;
  if (Utils.checkTestB(this.state)) checkImprove = improve < this.state[`${this.state.farm.toLowerCase()}Settings`].partSettings.length;

  switch (this.state.territory.territoryType) {

    case 0: // территория для покупки
      new BuyFarmTerritoryWindow(this)
      break;

    case 1: // купленная земля
      if (Utils.checkTestB(this.state)) new BoughtFarmLandNew(this);
      else new BoughtFarmLand(this);
      break;

    case 2: // пастбище
      if (checkImprove) {
        if (Utils.checkTestB(this.state)) new FarmPastureWindowNew(this);
        else new FarmPastureWindow(this);
      } else {
        if (Utils.checkTestB(this.state)) new TerritoryExchangeWindowNew(this);
        else new TerritoryExchangeWindow(this);
      }
      break;
      
    case 3: // поилка
      if (checkImprove) {
        if (Utils.checkTestB(this.state)) new FarmWaterWindowNew(this);
        else new FarmWaterWindow(this);
      } else {
        if (Utils.checkTestB(this.state)) new TerritoryExchangeWindowNew(this);
        else new TerritoryExchangeWindow(this);
      }
      break;

    case 4: // ярмарка
      if (Utils.checkTestB(this.state)) new FarmFairWindowNew(this);
      else new FarmFairWindow(this);
      break;

    case 5: // хранилище яиц
      if (Utils.checkTestB(this.state)) new FarmResourceRepositoryWindowNew(this);
      else new FarmResourceRepositoryWindow(this);
      break;

    case 8: // хранилище яиц
      this.cowFactory();
      break;

    default:
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      break;
  }

}


// окно овечей территории
function sheepTerritory(): void {
  const improve: number = this.state.territory.improve;
  let checkImprove: boolean = improve < this.state[`${this.state.farm.toLowerCase()}Settings`][`territories${this.state.farm}Settings`].length;
  if (Utils.checkTestB(this.state)) checkImprove = improve < this.state[`${this.state.farm.toLowerCase()}Settings`].partSettings.length;
  switch (this.state.territory.territoryType) {

    case 0: // территория для покупки
      new BuyFarmTerritoryWindow(this);
      break;

    case 1: // купленная земля
      if (Utils.checkTestB(this.state)) new BoughtFarmLandNew(this);
      else new BoughtFarmLand(this);
      break;

    case 2: // пастбище
      if (checkImprove) {
        if (Utils.checkTestB(this.state)) new FarmPastureWindowNew(this);
        else new FarmPastureWindow(this);
      } else {
        if (Utils.checkTestB(this.state)) new TerritoryExchangeWindowNew(this);
        else new TerritoryExchangeWindow(this);
      }
      break;
      
    case 3: // поилка
      if (checkImprove) {
        if (Utils.checkTestB(this.state)) new FarmWaterWindowNew(this);
        else new FarmWaterWindow(this);
      } else {
        if (Utils.checkTestB(this.state)) new TerritoryExchangeWindowNew(this);
        else new TerritoryExchangeWindow(this);
      }
      break;

    case 4: // ярмарка
      if (Utils.checkTestB(this.state)) new FarmFairWindowNew(this);
      else new FarmFairWindow(this);
      break;

    case 5: // хранилище шерсти
      if (Utils.checkTestB(this.state)) new FarmResourceRepositoryWindowNew(this);
      else new FarmResourceRepositoryWindow(this);
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
      new BuyFarmTerritoryWindow(this)
      break;

    default:
      this.scene.stop();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      break;
  }

}


// задать размеры
function resizeWindow(height: number): void {
  this.header.setY(this.cameras.main.centerY - Math.floor(height / 2));
  this.close.setY(this.header.getCenter().y - 6);
  this.body.height = height + 2;
  this.bottom.setY(this.body.getBottomCenter().y);
  this.textHeader.setPosition(this.textHeader.x, this.header.getCenter().y - 6);
}

// Растягивание верхушки окна
function resizeWindowTop(height: number): void {
  this.header.setY(this.header.y - height)
  this.textHeader.setY(this.header.getCenter().y - 6)
  this.close.setY(this.header.getCenter().y - 6)
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