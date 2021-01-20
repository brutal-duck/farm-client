import axios from 'axios';
import { romanize } from './basic';

// окно подтверждения смены территории
function confirmExchangeTerritory(type: number): void {
  
  this.state.exchangeTerritory = type;
  let modal: Imodal = {
    type: 1,
    sysType: 5
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}


// сообщение об успешной отправки запроса в техподдержку
function messageIsSent(): void {

  this.time.addEvent({ delay: 1500, callback: (): void => {

    let modal: Imodal = {
      type: 1,
      sysType: 3,
      height: 150,
      message: this.state.lang.yourMessageIsSent
    }
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);

  }, callbackScope: this, loop: false });
  
}


// окно банка
function showBank(): void {

  let modal: Imodal = {
    type: 2,
    shopType: 1
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}


// окно завершения текущей главы
function nextPart(): void {

  let user: IuserSheep | IuserChicken;
  let parts: Ipart[];

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    parts = this.state.sheepSettings.sheepParts;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    parts = this.state.chickenSettings.chickenParts;

  }

  if (parts.length > user.part) {

    let tasks: Itasks[] = this.partTasks();
    let status: boolean = true;

    if (tasks.length === 0) status = false;
    
    for (let i: number = 0; i < tasks.length; i++) {

      if ((tasks[i].done !== 1 || tasks[i].got_awarded !== 1) && tasks[i].necessary === 1) {
        status = false;
        break;
      }

    }

    if (status) {

      let thisPart: Ipart = parts.find((data: Ipart) => data.sort === user.part);

      let part: string = this.state.lang.part + ' ' + user.part;
      let namePart: string = this.state.lang[this.state.farm.toLowerCase() + 'NamePart' + user.part];
      let award: number = thisPart.award;
      let doneText: string = this.state.lang[this.state.farm.toLowerCase() + 'PartDone' + user.part];

      let donePart: IdonePart = {
        part: part,
        name: namePart,
        award: 'x ' + award,
        doneText: doneText,
        chapter: this.state.farm.toLowerCase() + '-chapter-' + user.part
      }

      let modal: Imodal = {
        type: 5,
        donePart: donePart
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    }
    
  }

}


// окно заданий
function showTasks(): void {

  let part: number;

  if (this.state.farm === 'Sheep') part = this.state.userSheep.part;
  else if (this.state.farm === 'Chicken') part = this.state.userChicken.part;

  let done: boolean = true;
  let tasks: Itasks[] = this.partTasks();

  for (let i in tasks) {

    if (tasks[i].necessary === 1 && tasks[i].got_awarded === 0) {
      done = false;
      break;
    }

  }

  let tasksParams: ItasksParams = {
    part: this.state.lang.part + ' ' + part,
    name: this.state.lang[this.state.farm.toLowerCase() + 'NamePart' + part],
    farmer: this.state.lang.sheepProfileName + ' ' + romanize(part),
    done: done,
    description: this.state.lang[this.state.farm.toLowerCase() + 'PartAward' + part],
    tasks: tasks
  }

  let modal: Imodal = {
    type: 3,
    tasksParams: tasksParams
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}


// показ окна с ежедневными наградами
function dailyAward(): void {

  let check: boolean = false;
  
  if (this.state.farm === 'Sheep') {

    if (this.state.userSheep.tutorial >= 100 && this.state.userSheep.part > 3 && !this.state.user.takenReward) check = true;

  } else if (this.state.farm === 'Chicken') {

    if (this.state.userChicken.tutorial > 0 && !this.state.user.takenReward) check = true;

  }

  if (check &&
    typeof this.state.daily === 'number' &&
    !this.scene.isActive('Modal') &&
    !this.scene.isActive('Block') &&
    !this.scene.isActive('Tutorial') &&
    !this.scene.isActive('Map')) {

    // дейлики для новичка
    if (this.state.newbieTime > 0) {

      let modal: Imodal = { type: 6 }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    // дейлики для старых
    } else {

      let modal: Imodal = { type: 4 }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    }

  }

}


// забрать награду за новичка
function takeNewbieAward(): void {

  if (!this.state.user.takenReward) {

    if (this.state.daily === 1) this.state.dailyAwards[0] = true; // монеты овец
    if (this.state.daily === 2) this.state.dailyAwards[1] = true; // 5 кристаллических овец по 10 кристаллов
    if (this.state.daily === 3) this.state.dailyAwards[2] = true; // 3 овцы максимальной породы юзера
    if (this.state.daily === 4) this.state.dailyAwards[3] = true; // анлок куриной фермы
    if (this.state.daily === 5) this.state.dailyAwards[4] = true; // подстригатель на три часа
    if (this.state.daily === 6) this.state.dailyAwards[5] = true; // 3 куры максимальной породы юзера
    if (this.state.daily === 7) this.state.dailyAwards[6] = true; // собиратель яиц на три часа
    if (this.state.daily === 8) {

      this.state.dailyAwards[7] = true;
      this.game.scene.keys[this.state.farm + 'Bars'].calendar?.destroy();
      this.game.scene.keys[this.state.farm + 'Bars'].calendarText?.destroy();

    }

    if ((this.state.daily === 1 ||
      this.state.daily === 2 ||
      this.state.daily === 3 ||
      this.state.daily === 8) &&
      this.state.farm !== 'Sheep') {

      this.game.scene.keys[this.state.farm + 'Bars'].newbieAwardAnimation();

    }

    if ((this.state.daily === 4 ||
      this.state.daily === 6) &&
      this.state.farm !== 'Chicken') {
      
      if (this.state.daily === 4) {
        this.state.dailyAwards[3] = false;
      }

      this.game.scene.keys[this.state.farm + 'Bars'].newbieAwardAnimation();

    }

    // анимашка для собирателей в любом случае
    if (this.state.daily === 5 || this.state.daily === 7) {
      this.game.scene.keys[this.state.farm + 'Bars'].newbieAwardAnimation();
    }

    this.getNewbieAward();

    this.state.user.takenReward = true;
    axios.post(process.env.API + "/takenNewbieReward", { hash: this.state.user.hash });

  }

}


// показ окна успешного доната
function showDonate(): void {

  let modal: Imodal = { type: 7 }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}


// окно улучшения собирателя
function showImproveCollector(): void {

  this.scene.stop('Shop');
  this.scene.stop('ShopBars');

  let modal: Imodal = {
    type: 1,
    sysType: 10
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}

function startHerdBoost(): void {

  this.scene.stop('Shop');
  this.scene.stop('ShopBars');

  let modal: Imodal = {
    type: 8,
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}


export {
  confirmExchangeTerritory,
  messageIsSent,
  showBank,
  nextPart,
  showTasks,
  dailyAward,
  takeNewbieAward,
  showDonate,
  showImproveCollector,
  startHerdBoost
}
