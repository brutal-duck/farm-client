import axios from 'axios';
import { FAPI } from '../libs/Fapi.js';
import bridge from '@vkontakte/vk-bridge';
import Hint from '../components/animations/Hint';
import Firework from '../components/animations/Firework';
import BigInteger from '../libs/BigInteger';
import MoneyAnimation from './../components/animations/MoneyAnimation';
import SpeechBubble from './../components/animations/SpeechBuble';
import LocalStorage from './../libs/LocalStorage';
import ChickenTerritory from './../components/Territories/ChickenTerritory';
import SheepTerritory from './../components/Territories/SheepTerritory';
import CowTerritory from './../components/Territories/CowTerritory';
import { getNewClanTasks } from './tasks';
import Utils from './../libs/Utils';
import SheepBars from './../scenes/Sheep/SheepBars';
import ChickenBars from './../scenes/Chicken/ChickenBars';
import CowBars from './../scenes/Cow/CowBars';
import Chicken from './../scenes/Chicken/Main';
import Sheep from './../scenes/Sheep/Main';
import Cow from './../scenes/Cow/Main';
import Territory from './../components/Territories/Territory';
import Factory from './../components/Territories/Factory';
import { Task, TaskType } from '../local/tasks/types';
import { general } from '../local/settings';

// рандомное число
function random(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}


// рандомное boolean значение
function getRandomBool(): boolean {
  return Boolean(Math.round(Math.random()));
}


// рандомнакя строка
function randomString(length: number = 5): string {

  let characters: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let rs: string = '';

  while (rs.length < length) {
    rs += characters[Math.floor(Math.random() * characters.length)];
  }

  return rs;

}

// сокращенные числа
function shortNum(num: number | string): string {

  if (typeof num === 'number') num = Number(num.toFixed(0));
  
	num = String(num);
  
	if (BigInteger.lessThan(num, '9999')) return num;
	else {
		
		let pow10: number = 0; // Начальная степень
		let index: string = num.slice(1, 3); // Второе и третье число в num для составления выходного числа

    let leftover: string = num;

		// Сокращаем число, определяя степень
		while (BigInteger.greaterThanOrEqual(num, '10')) {
      num = BigInteger.divide(String(num), '10');
			pow10 += 1;
		}

		//"лишние" нули (в конце прибавятся)
		const nulls: number = pow10 % 3;
    leftover = leftover.slice(nulls + 1, nulls + 2);
		//число степеней, кратное 3м
		let pow10correctly: number = ( pow10 - nulls ) / 3;
	
		//название каждой 3й степени
		let powName: string;
	
		//если большое (от аа)
		if ( pow10correctly >= 5 ) {
	
			let character1 = 97, character2 = 97;
	
			while (pow10correctly > 5) {
				character2 += 1;
				if ( character2 > 122 ) {
					character1 += 1;
					character2 = 97;
				}
				pow10correctly -= 1;
			}
	
			powName = String.fromCharCode(character1) + String.fromCharCode(character2);
	
		} else { //если меньше "аа"
			switch ( pow10correctly ) {

				case 0:	powName = '';
				break;
	
				case 1: powName = 'K';
				break;
	
				case 2:	powName = 'M';
				break;
	
				case 3:	powName = 'B';
				break;
	
				case 4:	powName = 'T';
				break;

			}
		}
	
		let newNum: string;
		switch (nulls) {

			case 0: newNum = String(num) +'.'+ String(leftover); 
			break;

			case 1: newNum = String(num) + index[0] +'.'+ String(leftover);
			break;

			case 2: newNum = String(num) + index +'.'+ String(leftover);
			break;
			
		}
	
		return newNum + powName.toUpperCase();

	}

}


// формат короткой даты
function shortTime(seconds: number, lang: any): string {

  let result: string | number;
  let numOne: string | number = '00';
  let numTwo: string | number = '00';
  let weeks: boolean = false;
  let days: boolean = false;
  let hours: boolean = false;

  if (seconds === 0) result = '00:00';
  else if (seconds > 604800) {
    weeks = true;
    numOne = Math.floor(seconds / 604800);
    numTwo = Math.floor((seconds % 604800) / 86400);
  } else if (seconds > 86400) {
    days = true;
    numOne = Math.floor(seconds / 86400);
    numTwo = Math.floor((seconds % 86400) / 3600);
  } else if (seconds > 3600) {
    hours = true;
    numOne = Math.floor(seconds / 3600);
    numTwo = Math.floor((seconds % 3600) / 60);
  } else if (seconds > 60) {
    numOne = Math.floor(seconds / 60);
    numTwo = Math.floor(seconds % 60);
  } else {
    numOne = '00';
    numTwo = seconds;
  }

  if (weeks) {
    result = numOne + lang.shortWheek + ' ' + numTwo + lang.shortDays;
  } else if (days) {
    result = numOne + lang.shortDays + ' ' + numTwo + lang.shortHours;
  } else if (hours) {
    result = numOne + lang.shortHours + ' ' + numTwo + lang.shortMinutes;
  } else { 
    if (String(numTwo).length < 2) numTwo = '0' + String(numTwo);
    result =  numOne + ' : ' + numTwo;
  }

  return String(result);
  
}


// таймер времени
function timer(num: number): string {

  let hours: number | string;
  let minutes: number | string;
  let seconds: number | string;

  if (num > 3600) {

    hours = Math.floor(num / 3600);
    minutes = Math.floor((num % 3600) / 60);
    seconds = Math.floor(num % 60);

  } else if (num > 60) {

    hours = '';
    minutes = Math.floor(num / 60);
    seconds = Math.floor(num % 60);

  } else {

    hours = '';
    minutes = '00';
    seconds = num;

  }
  
  hours = String(hours);
  minutes = String(minutes);
  seconds = String(seconds);

  if (hours.length !== 0) hours = hours + ':';
  if (minutes.length === 1) minutes = '0' + minutes;
  if (seconds.length === 1) seconds = '0' + seconds;

  let time: string = hours + minutes + ':' + seconds;

  return time;

}

// оплата пакета робокассой
function payRobokassa(id: number, state: Istate): void {
  const data = {
    id: state.user.id,
    packageId: id
  }
  axios.post(process.env.API + "/addOrder", data)
    .then((response) => {
      if (response.data.error === true) window.location.reload();
      else {
        for (let prop in response.data) {
          if (prop !== 'error') {
            let element: any = document.querySelector('input[name="' + prop + '"]');
            element.value = response.data[prop];
          }
        }
        let form: any = document.querySelector('#robokassa');
        form.submit();
      }
    });
}


// оплата пакета ОКами в одноклассниках
function payOdnoklassniki(id: number): void {
  const data = {
    id: this.state.user.id,
    packageId: id
  }

  axios.post(process.env.API + "/addOrderOk", data)
    .then((res) => {
      if (res.data.error === false) {
        let pack = this.state.packages.find((data: any) => data.id === id);
        if (pack) {
          this.state.payDiamonds = pack.diamonds + pack.bonus;
          this.state.payId = res.data.orderId;
          this.state.payPrice = pack.price;
          FAPI.UI.showPayment(this.state.payDiamonds + ' ' + this.state.lang.diamonds, this.state.lang.okPayDescr, res.data.orderId, pack.price, null, null, 'ok', 'true');
        }
      }
    });
}


// оплата пакета голосами в ВК
function payVK(id: number): void {
  let pack = this.state.packages.find((data: any) => data.id === id);
  if (pack) {
    bridge.send("VKWebAppShowOrderBox", { type: 'item', item: String(id) });
  }
}

function payYandex(id: number): void {
  const pack: Ipackage = this.state.packages.find((data: any) => data.id === id);
  if (pack) {
    this.state.ysdk.getPlayer().then(() => {
      this.state.ysdk.getPayments({ signed: true }).then(payments => {
        payments.purchase({ id: String(id) }).then(purchase => {
          axios.post(process.env.API + "/addOrderYa", {
            signature: purchase.signature,
            userId: this.state.user.id, 
            packageId: id, 
          }).then(res => {
            if (!res.data.error) this.game.scene.keys[this.state.farm].autosave();
          }); 
        });
      }).catch(err => { console.log(err); });
    }).catch(() => {
      this.game.scene.keys[this.state.farm].yandexAuth();
    });
  }
}

function yandexAuth(): Promise<void> {
  return this.state.ysdk.auth.openAuthDialog().then(() => {
    this.state.ysdk.getPlayer().then((player) => {
      this.state.yaPlayer = player;
      this.state.name = player.getName();
      if (this.state.name === '') this.state.name = `yandex_${this.state.user.id.substr(0, 4)}`;
      this.state.yandexName = this.name;
      this.state.avatar = player.getPhoto('large');
      axios.post(process.env.API + "/authYa", {
        id: this.state.user.id,
        hash: this.state.user.hash,
        counter: this.state.user.counter,
        yaId: player.getUniqueID(),
      }).then((res) => {
        const { founded, error } = res.data;
        if (!error) {
          if (founded) {
            const modal: Imodal = {
              type: 1,
              sysType: 20,
            }
            this.state.modal = modal;
            this.scene.launch('Modal', this.state);
          }
        }
      })
    });
  }).catch((err) => {
    const modal: Imodal = {
      type: 1,
      sysType: 3,
      height: 150,
      message: this.state.lang.authorizationRequired
    }
    this.state.modal = modal;
    this.scene.launch('Modal', this.state);
  });
}

function payAndroid(id: number): void {
  const store: any = window['store'];
  store.order('package_' + id);
}

// римское число
function romanize (num: number): string {

  let digits: string[] = String(+num).split("");
  let key: string[] = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
             "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
             "","I","II","III","IV","V","VI","VII","VIII","IX"];
  let roman: string = "";
  let i: number = 3;

  while (i--) {
    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
  }
  
  return Array(+digits.join("") + 1).join("M") + roman;

}

// функция завершения сессии
function logout(): void {
  
  if (this.scene.isActive('Modal')) this.scene.stop('Modal');
  if (this.scene.isActive('Shop')) this.scene.stop('Shop');
  if (this.scene.isActive('ShopBars')) this.scene.stop('ShopBars');
  if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
  if (this.scene.isActive('Profile')) this.scene.stop('Profile');
  if (this.scene.isActive('Fortune')) this.scene.stop('Fortune');
  if (this.scene.isActive('ClanFarm')) this.scene.stop('ClanFarm');
  if (this.scene.isActive('ClanScroll')) this.scene.stop('ClanScroll');
  if (this.scene.isActive('Chat')) this.scene.stop('Chat');
  if (this.scene.isActive(this.state.farm)) this.scene.stop(this.state.farm);
  if (this.scene.isActive(this.state.farm + 'Bars')) this.scene.stop(this.state.farm + 'Bars');
  let modal: Imodal = {
    type: 1,
    sysType: 8
  }
  this.state.modal = modal;
  this.scene.launch('Modal', this.state);

}


function convertDiamonds(diamonds: number): number {
  if (Utils.checkTestB(this.state)) return convertDiamondsTestB.bind(this)(diamonds);
  const farm: string = this.state.farm.toLowerCase();
  const partsSettings: Ipart[] = this.state[`${farm}Settings`][`${farm}Parts`];
  const part: number = this.state[`user${this.state.farm}`].part;
  
  let exchange: number = partsSettings.find((item: Ipart) => item.sort === part).exchange;
  return exchange *= diamonds;
}

function convertDiamondsTestB(diamonds: number): number {
  const farm: string = this.state.farm.toLowerCase();
  const partSettings: IpartSettings[] = this.state[`${farm}Settings`].partSettings;
  const part: number = this.state[`user${this.state.farm}`].part;
  const exchange = partSettings[part - 1].exchange;
  return exchange * diamonds;
}


function convertMoney(money: number): number {
  if (Utils.checkTestB(this.state)) return convertMoneyTestB.bind(this)(money);
  const farm: string = this.state.farm.toLowerCase();
  const partsSettings: Ipart[] = this.state[`${farm}Settings`][`${farm}Parts`];
  const part: number = this.state[`user${this.state.farm}`].part;

  const exchange: number = partsSettings.find((item: Ipart) => item.sort === part).exchange;
  return Math.ceil(money / exchange);
}

function convertMoneyTestB(money: number): number {
  const farm: string = this.state.farm.toLowerCase();
  const partsSettings: IpartSettings[] = this.state[`${farm}Settings`].partSettings;
  const part: number = this.state[`user${this.state.farm}`].part;

  const exchange: number = partsSettings[part - 1].exchange;
  return Math.ceil(money / exchange);
}


// обмен и дальнейшая функция
function exchange(ad: boolean = false): void {

  let user: IuserSheep | IuserChicken | IuserCow;
  let buyAnimal: any;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    buyAnimal = (): void => this.buySheep(this.state.convertor.breed);

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    buyAnimal = (): void => this.buyChicken(this.state.convertor.breed);

  } else if (this.state.farm === 'Cow') {

    user = this.state.userCow;
    buyAnimal = (): void => this.buyCow(this.state.convertor.breed);

  }

  if (this.state.convertor.diamonds > this.state.user.diamonds) {
    const countResources = this.state.convertor.diamonds - this.state.user.diamonds;
    
    this.time.addEvent({ delay: 100, callback: (): void => {
      this.state.convertor.type = 2;
      this.state.convertor.count = countResources;
      const modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
      
    }, callbackScope: this, loop: false });
  } else {
    this.state.user.diamonds -= this.state.convertor.diamonds;
    const addedMoney = this.convertDiamonds(this.state.convertor.diamonds);
    const doubledMoney = this.convertDiamonds(2 * this.state.convertor.diamonds);
    if (Utils.checkSale(this.state, `${this.state.farm.toUpperCase()}_MONEY`)){
      user.money += doubledMoney;
      this.tryTask(TaskType['EXCHANGE_DIAMOND'], 0, doubledMoney);
    } else {
      user.money += addedMoney;
      this.tryTask(TaskType['EXCHANGE_DIAMOND'], 0, addedMoney);
    }
    this.game.scene.keys[this.state.farm].tryClanTask(10, 0, this.state.convertor.diamonds);
    this.game.scene.keys[this.state.farm].achievement.tryId(39);
    if (this.scene.isActive('ClanFarm')) {
      MoneyAnimation.create(this.game.scene.keys['ClanFarm'], `${this.state.farm.toLowerCase()}Coin`, {
        x: this.game.scene.keys['ClanFarm'].cameras.main.centerX,
        y: this.game.scene.keys['ClanFarm'].cameras.main.centerY, 
      });
    } else if (this.scene.isActive('Profile')) {
      MoneyAnimation.create(this.game.scene.keys['Profile'], `${this.state.farm.toLowerCase()}Coin`, {
        x: this.game.scene.keys['Profile'].cameras.main.centerX,
        y: this.game.scene.keys['Profile'].cameras.main.centerY, 
      });
    } else {
      MoneyAnimation.create(this.game.scene.keys[`${this.state.farm}Bars`]);
    }
    if (!ad) {
      this.state.amplitude.logAmplitudeEvent('diamonds_spent', {
        type: 'convertor',
        count: this.state.convertor.diamonds,
      });
      this.tryTask(15, 0, this.state.convertor.diamonds);
    }

    if (this.state.convertor.fun === 1) {
      buyAnimal();
    } else if (this.state.convertor.fun === 2) {
      // this.fairLevelUp();
    } else if (this.state.convertor.fun === 3) {
      this.improveTerritory();
    } else if (this.state.convertor.fun === 4) {
      this.exchangeTerritory();
    } else if (this.state.convertor.fun === 5) {
      // this.installTerritory();
    } else if (this.state.convertor.fun === 6) {
      this.buyTerritory();
    } else if (this.state.convertor.fun === 8) {
      this.improveCollector();
    }
    this.autosave();
  }

}

// завершение главы
function donePart(): void {
  let user: IuserSheep | IuserChicken | IuserCow;
  let parts: Ipart[];
  if (this.state.farm === 'Sheep') {
    user = this.state.userSheep;
    parts = this.state.sheepSettings.sheepParts;
  } else if (this.state.farm === 'Chicken') {
    user = this.state.userChicken;
    parts = this.state.chickenSettings.chickenParts;
  } else if (this.state.farm === 'Cow') {
    user = this.state.userCow;
    parts = this.state.cowSettings.cowParts;
  }
  
  if (this.state.farm === 'Sheep' && this.caveTutor) {
    this.caveTutor = !this.caveTutor;
  }
  user.part++;
  this.state.progress[this.state.farm.toLowerCase()].part = user.part;
  
  this.deleteTerritoriesLocks();
  this.game.scene.keys[this.state.farm + 'Bars'].setCurrentPartProgress();

  this.state.amplitude.logAmplitudeEvent('chapter_done', {
    chapter: user.part - 1
  });
  this.autosave();
  
  this.state.user.level += 1;
  if (((user.part / 4) ^ 0) === user.part / 4) {
    sendSocialEvent(this.state, 5, user.part);
  }
  sendAppEventVk(this.state, 1, this.state.userSheep.part + this.state.userChicken.part + this.state.userCow.part);
  
  this.time.addEvent({ delay: 100, callback: (): void => {
    this.checkDoneTasks();
    this.tryClanTask(17);
  }, callbackScope: this, loop: false });

  const checkReview = this.state.platform === 'android' && this.state.farm === 'Chicken' && user.part === 2;

  if (checkReview) {
    this.state.modal = { type: 24 };
    this.scene.launch('Modal', this.state);
  }


  const { cave, herdBoost, feedBoost } = this.state.user.additionalTutorial as IadditionalTutorial;
  const { farm } = this.state as Istate;

  const checkShowSheep = farm === 'Sheep' 
  && (user.part === 3 && !cave 
  || user.part === 4 
  || user.part === 5 && !herdBoost
  || user.part === 6 && !feedBoost);
  const checkShowCow = farm === 'Cow' && user.part === 2;

  this.time.addEvent({ delay: 300, callback: (): void => {
    if (!checkShowSheep && !checkShowCow) {
      if (!Utils.checkActiveScenes(this, ['Modal', 'Tutorial', 'Profile'])) this.showTasks();
    }
  }, callbackScope: this, loop: false });

  if (user.part === 7 && farm === 'Sheep' && Utils.checkUserHasName(this.state)) {
    this.state.clanTutor = true;
  } else if (user.part === 8 && farm === 'Sheep' && Utils.checkUserHasName(this.state)) {
    this.state.fortuneTutor = true;
    this.state.fortuneTutorialWin = true;
  }

  if (this.state.farm === 'Sheep') this.state.badBalanceWindowShown = false;
}


// забрать награду за задание
function pickUpTaskReward(id: number): void {
  if (Utils.checkTestB(this.state)) return pickUpTaskRewardTestB.bind(this)(String(id));
  let tasks: Itasks[] = [];

  if (this.state.farm === 'Sheep') tasks = this.state.sheepTasks;
  else if (this.state.farm === 'Chicken') tasks = this.state.chickenTasks;
  else if (this.state.farm === 'Cow') tasks = this.state.cowTasks;

  let task: Itasks = tasks.find((data: Itasks) => data.id === id);
  if (task?.done === 1 && task?.got_awarded === 0) {

    if (this.state.farm === 'Sheep') {     
      let moneyTask: any = this.moneyTasks.find(el => el.id === task.id);
      if (moneyTask) this.state.userSheep.money += moneyTask.money;
      else this.state.user.diamonds += task.diamonds;
    } else this.state.user.diamonds += task.diamonds;

    this.state.amplitude.logAmplitudeEvent('diamonds_get', {
      type: 'task_award',
      count: task.diamonds,
    });
    this.autosave();
    this.state.user.xp += task.xp;
    task.got_awarded = 1;
  }
}

function pickUpTaskRewardTestB(id: string): void {
  const tasks: Task[] = this.state[`${this.state.farm.toLowerCase()}Tasks`];
  const task = tasks.find((data) => data.id === id);
  if (!task || task.done === 0 || task.awardTaken === 1) return;

  if (task.awardType === 'diamond') {
    this.state.user.diamonds += task.award;
    this.state.amplitude.logAmplitudeEvent('diamonds_get', {
      type: 'task_award',
      count: task.award,
    });
  } else {
    this.state.userSheep.money += task.award;
  }

  task.awardTaken = 1;
  this.autosave();
}

// проверка подключения к интернету
function onlineStatus(): void {

  // let http_request: XMLHttpRequest = new XMLHttpRequest();

  // http_request.onreadystatechange = (): void => {

  //   if (http_request.readyState === 4) {
      
  //     if (http_request.status === 200) this.state.online = true;
  //     else this.state.online = false;
      
  //   }

  // }

  // http_request.open('GET', 'https://ipv4.icanhazip.com', true);
  // http_request.timeout = 1500;
  // http_request.send('');
  
}


// отображение оффлайн заглушки
function socialButtons(): void {
  
  if (this.state.online && this.offline.visible) {

    this.offline.setVisible(false);

  } else if (!this.state.online && !this.offline.visible) {

    this.offline.setVisible(true);
    this.sendwichTimer = 250;

    if (this.state.modal?.type === 1 &&
      this.state.modal?.sysType === 7 &&
      this.scene.isActive('Modal')) {
      this.scene.stop('Modal');
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    }

  }

}


// очистка не актуального localStorage
function checkStorage(hash: string): void {

  if (LocalStorage.get('user')) {

    let user: Iuser = JSON.parse(LocalStorage.get('user'));

    if (user.hash !== hash) {
      LocalStorage.clear();
      console.log('clear localStorage');
    }

  }

}

// получение награды для новичка
function getNewbieAward(): void {
  for (let i: number = 0; i < this.state.dailyAwards.length; i++) {
    if (i === 0 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {
      this.state.dailyAwards[i] = false;
      this.state.userSheep.money += this.convertDiamonds(10);
      MoneyAnimation.create(this.game.scene.keys['SheepBars']);
      const text: string = this.state.lang.dailyNewbieHint0.replace('$1', String(this.convertDiamonds(10))); 
      Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, text, 2);
      break;
    }

    if (i === 1 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {
      this.state.dailyAwards[i] = false;
      let counter: number = 0;
      const text: string = this.state.lang.dailyNewbieHint1; 
      Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, text, 2);

      const timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        counter++;
        let x: number = random(270, 690);
        let y: number = random(510, 690);
        let id: string = 'local_' + randomString(18);
        this.getSheep(id, 0, x, y, 0, 500);
        this.tryTask(18, 0);
        this.tryClanTask(8);
        if (counter >= 5) timeout.remove(false);

      }, callbackScope: this, loop: true });
      break;

    }

    if (i === 2 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {
      this.state.dailyAwards[i] = false;
      const type: number = this.state.userSheep.fair + 1;
      let counter: number = 0;
      const text: string = this.state.lang.dailyNewbieHint2.replace('$1', String(type)); 
      Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, text, 2);
      let timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        
        counter++;
        const x: number = random(270, 690);
        const y: number = random(510, 690);
        const id: string = 'local_' + randomString(18);
        this.getSheep(id, type, x, y, 0, 500);
        Firework.create(this, {x, y}, 1);
        this.tryTask(2, 0);
        this.tryTask(2, type);
        this.tryTask(4, type);
        this.tryClanTask(5);
        if (counter >= 3) timeout.remove(false);

      }, callbackScope: this, loop: true });
      break;
    }

    if (i === 3 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {
      this.state.dailyAwards[i] = false;
      if (this.scene.isActive('Modal')) this.scene.stop('Modal');
      if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
      if (this.scene.isActive('Shop')) this.scene.stop('Shop');
      if (this.scene.isActive('ShopBars')) this.scene.stop('ShopBars');
      if (this.scene.isActive('Profile')) this.scene.stop('Profile');
      this.scene.stop('Sheep');
      this.scene.stop('SheepBars');
      this.scene.start('ChickenPreload', this.state);

      this.state.amplitude.logAmplitudeEvent('get_new_farm', {
        type: 'daily',
        farm_id: 'Chicken',
      });
      break;
    }

    if (i === 4 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {
      const text: string = this.state.lang.dailyNewbieHint4; 
      this.game.scene.keys[`${this.state.farm}Bars`].hint = (this.game.scene.keys['SheepBars'], -250, text, 2);
      this.state.dailyAwards[i] = false;
      this.state.userSheep.collector += 3 * 60 * 60;
      this.state.userSheep.collectorTakenTime = this.state.userSheep.collector;
      this.game.scene.keys[`${this.state.farm}Bars`].collector.update();
      this.tryTask(3, 0, 3 * 60 * 60);
      this.tryClanTask(7, 0, 3 * 60 * 60);
      break;
    }

    if (i === 5 && this.state.dailyAwards[i] && this.state.farm === 'Chicken') {
      const type: number = this.state.userChicken.fair + 1;
      let counter: number = 0;
      const text: string = this.state.lang.dailyNewbieHint5.replace('$1', String(type)); 
      Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, text, 2);

      const timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        counter++;
        let x: number = random(270, 690);
        let y: number = random(510, 690);
        let id: string = 'local_' + randomString(18);
        this.getChicken(id, type, x, y, 0, 500);
        Firework.create(this, {x, y}, 1);
        this.tryTask(2, 0);
        this.tryTask(2, type);
        this.tryTask(4, type);
        this.tryClanTask(5);
        if (counter >= 3) timeout.remove(false);
      }, callbackScope: this, loop: true });
      this.state.dailyAwards[i] = false;
      break;
    }

    if (i === 6 && this.state.dailyAwards[i] && this.state.farm === 'Chicken') {
      const text: string = this.state.lang.dailyNewbieHint6; 
      Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, text, 2);
      this.state.dailyAwards[i] = false;
      this.state.userChicken.collector += 3 * 60 * 60;
      this.state.userChicken.collectorTakenTime = this.state.userChicken.collector;
      this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
      this.tryTask(3, 0, 3 * 60 * 60);
      this.tryClanTask(7, 0, 3 * 60 * 60);
      break;
    }

    if (i === 7 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {
      const text: string = this.state.lang.dailyNewbieHint7; 
      Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, text, 2);
      let counter: number = 0;
      const timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        counter++;
        let x: number = random(270, 690);
        let y: number = random(510, 690);
        let id: string = 'local_' + randomString(18);
        this.getSheep(id, 0, x, y, 0, 500);
        this.tryTask(18, 0);
        this.tryClanTask(8);
        if (counter >= 10) timeout.remove(false);
      }, callbackScope: this, loop: true });
      this.state.dailyAwards[i] = false;
      break;
    }
  }
}


// функция сбора донатных кристаллов
function takeDonate(): void {

  const data = {
    id: this.state.user.id,
    hash: this.state.user.hash,
    counter: this.state.user.counter,
  }
  axios.post(process.env.API + "/getDonate", data)
  .then((res) => {

    if (res.data.error) this.logout();
    else {

      if (res.data.donate > 0) {
        this.state.stock = '';
        if (this.state.starterpack) this.state.stock = 'starterpack';
        let pack: Ipackage = this.state.packages.find((data: Ipackage) => data.id === res.data.package);
        this.state.user.diamonds += res.data.donate;
        this.state.user.starterpack = true;

        const chapter: string = this.state.farm === 'Unicorn' ? `${this.state.farm}` : `${this.state.farm}_${this.state[`user${this.state.farm}`].part}`;
        const eventPorerties: any = {
          'chapter': chapter,
          'stock': this.state.stock,
        };
        this.state.amplitude.logAmplitudeRevenue('Product #' + res.data.package, pack.price, '', eventPorerties);

        MoneyAnimation.create(this.game.scene.keys[this.state.farm + 'Bars'], 'diamond');
        this.autosave();

      }

    }

  });

}

function loadingScreen(farmType: string): void {
  let loading: string = this.state.lang.loading;
  let general: number = 13; // Количество общих посказок
  let sheep: number = 7; // Количество посказок для овечьей фермы
  let chicken: number = 7; // Количество посказок для куриной фермы
  let cow: number = 7; // Количество посказок для коровьей фермы
  let event: number = 4; // Количество посказок для евентовой фермы
  let helpArr: string[] = [];

  // Создаем массив с подсказками
  for (let i: number = 0; i < general; i++) {
    helpArr.push(this.state.lang['helpGeneral_' + String(i + 1)]);
  }
  
  // Добавляем в массив подсказки в зависимости от типа фермы
  if (farmType === 'Sheep') { for (let i: number = 0; i < sheep; i++) helpArr.push(this.state.lang['helpSheep_' + String(i + 1)]); }
  else if (farmType === 'Chicken') { for (let i: number = 0; i < chicken; i++) helpArr.push(this.state.lang['helpChicken_' + String(i + 1)]); }
  else if (farmType === 'Unicorn') { for (let i: number = 0; i < event; i++) helpArr.push(this.state.lang['helpEvent_' + String(i + 1)]); }
  else if (farmType === 'Cow') { for (let i: number = 0; i < cow; i++) helpArr.push(this.state.lang['helpCow_' + String(i + 1)]); }

  let helpText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 90, helpArr[random(0, helpArr.length - 1)], {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: { width: 440 }
  }).setOrigin(0.5, 0.5).setDepth(4);

  // экран загрузки
  let padding: number = helpText.height / 2 + 10; // Отступ для элементов в зависимости от высоты текста посказки + доп отступ для отображения версии
  let height: number = 220 + helpText.height / 3; // параметр для высоты окна в зависимости от высоты текста посказки
  let text: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 11 - padding, '0%', {
    font: '37px Shadow',
    color: '#1F5B06'
  }).setDepth(1).setOrigin(0.5, 0.5);

  const header: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - Math.floor(height / 2), 'header-syst').setOrigin(0.5, 1).setDepth(2);
  const mid: Phaser.GameObjects.Sprite = this.add.tileSprite(this.cameras.main.centerX, header.getBottomCenter().y - 12, 614, height + 2, "mid-syst").setOrigin(0.5, 0);
  const bot: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX - 1, mid.getBottomCenter().y, 'bottom-syst').setOrigin(0.5, 0);
  
  this.add.text(this.cameras.main.centerX, header.getCenter().y - 6, loading, {
    font: '37px Shadow',
    color: '#F9D48D'
  }).setDepth(3).setOrigin(0.5);

  this.add.sprite(120, this.cameras.main.centerY + 20 - padding, 'pb-empty-corner');
  this.add.sprite(600, this.cameras.main.centerY + 20 - padding, 'pb-empty-corner').setScale(-1, 1);
  this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY + 20 - padding, 436, 130, 'pb-empty-mid');
  
  let leftCorner: Phaser.GameObjects.Sprite = this.add.sprite(120, this.cameras.main.centerY + 20 - padding, 'pb-full-corner').setAlpha(0);
  let rightCorner: Phaser.GameObjects.Sprite = this.add.sprite(600, this.cameras.main.centerY + 20 - padding, 'pb-full-corner').setFlip(true, false).setAlpha(0);
  let progress: Phaser.GameObjects.TileSprite = this.add.tileSprite(142, this.cameras.main.centerY + 20 - padding, 0, 130, 'pb-full-mid').setVisible(false).setOrigin(0, 0.5);

  // прогресс загрузки
  this.load.on('progress', (value: number): void => {
    let percent: number = Math.round(value * 100);
    if (!progress.active) return;
    if (percent >= 5 && leftCorner?.alpha === 0) leftCorner?.setAlpha(1);
    if (percent >= 95 && rightCorner?.alpha === 0) {
      progress?.setDisplaySize(436, 130);
      rightCorner?.setAlpha(1);
    }

    if (percent > 5 && percent < 95) {

      let onePercent: number = 420 / 90;
      let bar: number = Math.round(percent * onePercent);
      progress?.setDisplaySize(bar, 130).setVisible(true);
      
    }
    
    text?.setText(percent + '%');
  });

  // Информация о версии
  this.add.text(bot.getBottomRight().x - 50, bot.getBottomRight().y - 38, `v${this.state.build}`, { font: '18px Shadow', color: '#929DB5' }).setOrigin(1)
}

function loadingModal(): void {
  let loadingSprite: Phaser.GameObjects.Sprite;
  let animation: Phaser.Tweens.Tween;
  let pixel: Phaser.GameObjects.TileSprite;
  this.load.on('start', () => {
    this.scene.launch('Block');
    loadingSprite = this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'loading-spinner');
    animation = this.tweens.add({
      targets: loadingSprite,
      rotation: 2 * Math.PI,
      duration: 700,
      repeat: -1,
    });
  });
  
  this.load.on('complete', () => {
    this.scene.stop('Block');
    animation?.remove();
    loadingSprite?.destroy();
    pixel?.destroy();
  })
}

// Перераспределние животных на поле
function spreadAnimals(): void {
  if (Utils.checkTestB(this.state)) return;
  const animal: string = this.state.farm === 'Cow' ? 'animalGroup' : this.state.farm.toLowerCase();
  let localSpread: boolean = false; // Локальная метка на передвижение
  const allTerritories = []; // Все территории
  let nearTerritories = [];  // Территории вокруг самой заполенной
  let animalWithoutAim: any = false; // Овца без цели

  // 1. ПОДГОТОВКА ДАННЫХ
  // берем только нужные территории
  const territories: SheepTerritory[] | ChickenTerritory[] | CowTerritory[] = this.territories.children.entries;
  for (const territory of territories) {
    if (territory.territoryType === 2 || territory.territoryType === 3) {
      allTerritories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        count: [],
        x: territory.x + territory.width / 2,
        y: territory.y + territory.height / 2
      });
    }
  }

  // смотрим, где какая овца сидит
  if (this[animal]) {
    for (let i in this[animal].children.entries) {
  
      let c = this[animal].children.entries[i];
      let territory = this.currentTerritory(c.x, c.y);
  
      if (territory) {
        
        territory = allTerritories.find(data => data._id === territory._id);
        if (territory) territory.count.push(this[animal].children.entries[i])

      }
    }
  }

  // 2. ОТПРАВЛЯЕМ ОВЕЦ НА САМЫЕ НИЖНИЕ ТЕРРИТОРИИ
  // Сортируем и находим самые нижние клетки
  allTerritories.sort((x1, x2) => {
    if (x1.block > x2.block) return -1;
    if (x1.block < x2.block) return 1;
    return 0;
  });

  // Ищим овец на территории выше и отправляем вниз
  for (let i in allTerritories) {
    if (allTerritories[i].count.length === 0 && allTerritories[i].block - 1 >= 2) {
      
      let topTerritory = allTerritories.find(data => data.block === allTerritories[i].block - 1 && data.position === allTerritories[i].position);
      
      if (
        topTerritory &&
        topTerritory.count.length >= 2 &&
        topTerritory.count.every(el => !el.spread) &&
        topTerritory.count.find(data => !data.aim) !== undefined
      ) {

        animalWithoutAim = topTerritory.count.find(data => !data.aim);        
        
        if (this[animal].children.entries.every(animal => !animal.spread)) {
          animalWithoutAim.spread = true;
          let randomX: number = Phaser.Math.Between(allTerritories[i].x - 10, allTerritories[i].x + 10);
          let randomY: number = Phaser.Math.Between(allTerritories[i].y - 10, allTerritories[i].y + 10);
  
          if (this.state.farm === 'Cow') animalWithoutAim.setAim(randomX, randomY);
          else this.aim(animalWithoutAim, randomX, randomY);
          localSpread = true;
        }
      }
    }
  }

  // 3. ПЕРЕМЕЩИЕ НА ОСТАЛЬНЫХ ТЕРРИТОРИЯХ С ПРИОРИТЕТОМ ДВИЖЕНИЯ ВНИЗ
  if (!localSpread) {

    // Сортируем и находим самое заполненое поле
    allTerritories.sort((x1, x2) => {
      if (x1.count.length > x2.count.length) return -1;
      if (x1.count.length < x2.count.length) return 1;
      return 0;
    });
 
    for (let i in allTerritories) {
      // Проверяем, есть ли перемещающаяся овца
      if (allTerritories[i].count.every(el => !el.spread)) {
        
        // Находим лишнюю овцу без цели
        animalWithoutAim = allTerritories[i].count.find(data => !data.aim);
        nearTerritories = [];
      
        // Проверяем территорию снизу и если она пустая, то перемещаем овцу
        if (allTerritories[i].block + 1 >= 3) {
    
          let bottomTerritory = allTerritories.find(data => data.block === allTerritories[i].block + 1 && data.position === allTerritories[i].position);
    
          if (
            bottomTerritory &&
            bottomTerritory.count.length === 0 &&
            animalWithoutAim &&
            !animalWithoutAim.spread
          ) {
    
            animalWithoutAim.spread = true;
            let randomX: number = Phaser.Math.Between(bottomTerritory.x - 10, bottomTerritory.x + 10);
            let randomY: number = Phaser.Math.Between(bottomTerritory.y - 10, bottomTerritory.y + 10);

            if (this.state.farm === 'Cow') animalWithoutAim.setAim(randomX, randomY);
            else this.aim(animalWithoutAim, randomX, randomY);
            
            break;
  
          } else if (bottomTerritory) nearTerritories.push(bottomTerritory);
    
        }
    
        // Если овца еще не перемещается, то продолжаем проверять территорию вокруг
        if (animalWithoutAim && !animalWithoutAim.spread) {
          
          // Проверяем территорию справа
          if (allTerritories[i].position + 1 <= 3) {
            let rightTerritory = allTerritories.find(data => data.position === allTerritories[i].position + 1 && data.block === allTerritories[i].block);
            if (rightTerritory) nearTerritories.push(rightTerritory);
          }
          
          // Проверяем территорию слева 
          if (allTerritories[i].position - 1 >= 1) {
            let leftTerritory = allTerritories.find(data => data.position === allTerritories[i].position - 1 && data.block === allTerritories[i].block);
            if (leftTerritory) nearTerritories.push(leftTerritory);
          }
            
          // Проверяем территорию сверху
          if (allTerritories[i].block - 1 >= 2) {
            let topTerritory = allTerritories.find(data => data.block === allTerritories[i].block - 1 && data.position === allTerritories[i].position);
            if (topTerritory) nearTerritories.push(topTerritory);
          }
          
          // Сортируем по запонености
          nearTerritories.sort((x1, x2) => {
            if (x1.count.length < x2.count.length) return -1;
            if (x1.count.length > x2.count.length) return 1;
            return 0;
          });
        
          // Перемещение овцы на свободную территорию если:
          if (
            animalWithoutAim &&
            nearTerritories.length !== 0 &&
            allTerritories[i].count.length > nearTerritories[0].count.length + 1
          ) {

            animalWithoutAim.spread = true;
            let randomX: number = Phaser.Math.Between(nearTerritories[0].x - 10, nearTerritories[0].x + 10);
            let randomY: number = Phaser.Math.Between(nearTerritories[0].y - 10, nearTerritories[0].y + 10);

            if (this.state.farm === 'Cow') animalWithoutAim.setAim(randomX, randomY);
            else this.aim(animalWithoutAim, randomX, randomY);

            break;
          }
        }
      }
    }
  }
}

function getEventRaiting(): void {
  let login: string;
  if (this.state.platform !== 'web' && this.state.platform !== 'gd') {
    login = this.state.name
  } else login = this.state.user.login

  const points: number = this.state.userUnicorn.points;

  this.state.socket.io.emit('setUnicornRating', {
    name: login,
    userId: this.state.user.id,
    points: points
  });
}

function getStatusSettings(string: string): IstatusSettings {
  if (string && this.state.lang[string + 'Status']) {
    return {
      textColor: '#459D1A',
      text: Utils.ucFirst(this.state.lang[string + 'Status']),
      iconTexture: `${string}-status`,
      iconVisible: true,
    }
  } 
  return;
} 

function nextDayTimer(): void {
  if (this.state.timeToNewDay > 0) {
    --this.state.timeToNewDay;
  } else { // обнуление параметров
    this.state.timeToNewDay = 86400;
    this.state.userSheep.takenHerdBoost = 0;
    this.state.userChicken.takenHerdBoost = 0;
    this.state.userCow.takenHerdBoost = 0;
    this.state.user.takenFreeDiamonds = false;
    this.state.user.takenSocialAward = false;
    this.state.userSheep.herdBoostAd = true;
    this.state.userSheep.feedBoostAd = true;
    this.state.userChicken.herdBoostAd = true;
    this.state.userChicken.feedBoostAd = true;
    this.state.userCow.herdBoostAd = true;
    this.state.userCow.feedBoostAd = true;
    this.state.user.takeFreeDiamondTime = 0;
    if (this.state.user.clanId) {
      this.state.user.clanTasks = getNewClanTasks(this.state);
      this.scene.stop('Modal');
      this.scene.launch('Modal', this.state);
    }
    axios.post(process.env.API + "/newDay", {    
      id: this.state.user.id,
      hash: this.state.user.hash,
      counter: this.state.user.counter,
    }).then((res) => {
      if (!res.data.error) {
        if (this.state.user.takenReward) {
          this.state.daily++;
          this.game.scene.keys[`${this.state.farm}Bars`].calendarText.setText(String(Number(this.state.daily)));
          this.state.user.takenReward = false;
        }
      }
    });
  }
}

function autoporgressCollectorTime(): void {
  if (this.state.progress.sheep.collector >= this.state.offlineTime) {
    this.state.progress.sheep.collector -= this.state.offlineTime;
  } else {
    this.state.progress.sheep.collector = 0;
  }

  if (this.state.progress.chicken.collector >= this.state.offlineTime) {
    this.state.progress.chicken.collector -= this.state.offlineTime;
  } else {
    this.state.progress.chicken.collector = 0;
  }

  if (this.state.progress.cow.collector >= this.state.offlineTime) {
    this.state.progress.cow.collector -= this.state.offlineTime;
  } else {
    this.state.progress.cow.collector = 0;
  }
}

function remainderSellResource(): void {
  const delay: number = 30;
  const remainderMaxPart: number = 9;
  const remainderPercent: number = 0.6;
  if (this.state[`user${this.state.farm}`].part <= remainderMaxPart) {
    this.remaindSellTimer++;
    if (this.remaindSellTimer >= delay) {
      const storages: any[] = this.territories.children.entries.filter(el => el.territoryType === 5)
      let check: boolean = false;
      for (let i: number =0; i < storages.length; i++) {
        const setting: IterritoriesSheepSettings = this.state.sheepSettings.territoriesSheepSettings.find(elSetting => elSetting.improve === storages[i].improve);
        if (storages[i].volume >= setting.storage * remainderPercent) {
          check = true;
          break;
        }
      }
      if (check && 
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')) {
        SpeechBubble.create(this.game.scene.keys[`${this.state.farm}Bars`], this.state.lang[`help${this.state.farm}_1`], 3);
        this.remaindSellTimer = 0;
      }
    }
  }
}

function createTaskZone(): void {
  this.taskZone = this.add.zone(80, 75, 160, 150).setDepth(1).setDropZone(undefined, () => {});

  // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
  // graphics
  //   .lineStyle(2, 0xFFFF00)
  //   .setDepth(1)
  //   .strokeRect(
  //     this.taskZone.x - this.taskZone.input.hitArea.width / 2,
  //     this.taskZone.y - this.taskZone.input.hitArea.height / 2,
  //     this.taskZone.input.hitArea.width, 
  //     this.taskZone.input.hitArea.height
  //   );
    
  this.click(this.taskZone, () => {
    this.game.scene.keys[this.state.farm].showTasks();
  });
}

function farmBalance(farm: string): Ibalance {
  if (Utils.checkTestB(this.state)) return farmBalanceTestB.bind(this)(farm);
  let waterConsumption: number = 0;
  let grassConsumption: number = 0;
  let waterRecovery: number = 0;
  let grassRecovery: number = 0;
  let waterPercent: number = 0;
  let grassPercent: number = 0;
  let alarm: boolean = false;
  let notEnoughGrass: boolean = false;
  let notEnoughWater: boolean = false;

  const animals = this.state[farm.toLowerCase()];
  const settings = this.state[`${farm.toLowerCase()}Settings`][`${farm.toLowerCase()}Settings`];
  for (let i in animals) {
    const animal = animals[i];
    let breed: number;
    if (animal.type === 0) breed = 1;
    else breed = animal.type;
    const points: IsheepPoints | IchickenPoints | IcowPoints = settings.find((item) => item.breed === breed);
    grassConsumption += points.eating;
    waterConsumption += points.drinking;
  }

  grassConsumption = Math.round(grassConsumption / 2);
  waterConsumption = Math.round(waterConsumption / 2);
  const territories: Iterritories[] = this.state[`${farm.toLowerCase()}Territories`];
  const territoriesSettings = this.state[`${farm.toLowerCase()}Settings`][`territories${farm}Settings`];
  for (let i in territories) {
    const territory: Iterritories = territories[i];
    if (territory.type === 2 || territory.type === 3) {
      let reg: number = territoriesSettings.find(item => item.improve === territory.improve).regeneration;
      if (territory.type === 2) {
        grassRecovery += reg;
      } else {
        waterRecovery += reg;
      }
    }
  }

  if (waterRecovery > 0) {
    waterPercent = Math.round((waterRecovery - waterConsumption) / (waterRecovery / 100));
  } else waterPercent = -100;
  
  if (grassRecovery > 0) {
    grassPercent = Math.round((grassRecovery - grassConsumption) / (grassRecovery / 100));
  } else grassPercent = -100;
  
  if (grassRecovery < grassConsumption || waterRecovery < waterConsumption) {

    if (grassRecovery < grassConsumption) {
      notEnoughGrass = true;
      if (grassConsumption / 2 > grassRecovery) {
        grassPercent = 100;
      } else {
        grassPercent = Math.round((grassConsumption - grassRecovery) / (grassRecovery / 100));
      }
    }

    if (waterRecovery < waterConsumption) {
      notEnoughWater = true;
      if (waterConsumption / 2 > waterRecovery) {
        waterPercent = 100;
      } else {
        waterPercent = Math.round((waterConsumption - waterRecovery) / (waterRecovery / 100));
      }
    }
    alarm = true;
  }

  if (waterPercent > 100) waterPercent = 100;
  if (waterPercent < 0) waterPercent = 0;
  if (grassPercent > 100) grassPercent = 100;
  if (grassPercent < 0) grassPercent = 0;

  return {
    alarm: alarm,
    waterPercent: waterPercent,
    grassPercent: grassPercent,
    grassConsumption: grassConsumption,
    waterConsumption: waterConsumption,
    grassRecovery: grassRecovery,
    waterRecovery: waterRecovery,    
    notEnoughGrass: notEnoughGrass,
    notEnoughWater: notEnoughWater
  }
}

function farmBalanceTestB(farm: string): Ibalance {
  let waterConsumption: number = 0;
  let grassConsumption: number = 0;
  let waterRecovery: number = 0;
  let grassRecovery: number = 0;
  let waterPercent: number = 0;
  let grassPercent: number = 0;
  let alarm: boolean = false;
  let notEnoughGrass: boolean = false;
  let notEnoughWater: boolean = false;

  const animals = this.state[farm.toLowerCase()];
  const settings = this.state[`${farm.toLowerCase()}Settings`][`${farm.toLowerCase()}Settings`];
  for (let i in animals) {
    const animal = animals[i];
    let breed: number;
    if (animal.type === 0) breed = 1;
    else breed = animal.type;
    const points: IsheepPoints | IchickenPoints | IcowPoints = settings.find((item) => item.breed === breed);
    grassConsumption += points.eating;
    waterConsumption += points.drinking;
  }

  const territories: Iterritories[] = this.state[`${farm.toLowerCase()}Territories`];
  for (let territory of territories) {
    if (territory.type === 2 || territory.type === 3) {
      const partSettings: IpartSettings[] = this.state[`${farm.toLowerCase()}Settings`].partSettings;
      const reg: number = partSettings[territory.improve - 1].territory.regeneration;
      if (territory.type === 2) grassRecovery += reg;
      else waterRecovery += reg;
    }
  }

  if (waterRecovery > 0) {
    waterPercent = Math.round((waterRecovery - waterConsumption) / (waterRecovery / 100));
  } else waterPercent = -100;
  
  if (grassRecovery > 0) {
    grassPercent = Math.round((grassRecovery - grassConsumption) / (grassRecovery / 100));
  } else grassPercent = -100;
  
  if (grassRecovery < grassConsumption || waterRecovery < waterConsumption) {

    if (grassRecovery < grassConsumption) {
      notEnoughGrass = true;
      if (grassConsumption / 2 > grassRecovery) {
        grassPercent = 100;
      } else {
        grassPercent = Math.round((grassConsumption - grassRecovery) / (grassRecovery / 100));
      }
    }

    if (waterRecovery < waterConsumption) {
      notEnoughWater = true;
      if (waterConsumption / 2 > waterRecovery) {
        waterPercent = 100;
      } else {
        waterPercent = Math.round((waterConsumption - waterRecovery) / (waterRecovery / 100));
      }
    }
    alarm = true;
  }

  if (waterPercent > 100) waterPercent = 100;
  if (waterPercent < 0) waterPercent = 0;
  if (grassPercent > 100) grassPercent = 100;
  if (grassPercent < 0) grassPercent = 0;

  return {
    alarm: alarm,
    waterPercent: waterPercent,
    grassPercent: grassPercent,
    grassConsumption: grassConsumption,
    waterConsumption: waterConsumption,
    grassRecovery: grassRecovery,
    waterRecovery: waterRecovery,    
    notEnoughGrass: notEnoughGrass,
    notEnoughWater: notEnoughWater
  }
}

function sendSocialEvent(state: Istate, type: number, value: number): void {
  const langs: { [key: string]: string } = {
    sheep5: `Я уже на ${value} главе овечей фермы! Что же будет дальше?`,
    chicken5: `Я уже на ${value} главе куриной фермы! Что же будет дальше?`,
    cow5: `Я уже на ${value} главе коровьей фермы! Что же будет дальше?`,
    chicken2: 'Я уже на куриной ферме! Что же будет дальше?',
    cow3: 'Я уже на коровьей ферме! Что же будет дальше?',
    sheep4: `Мной было захвачено ${value} овечек на овечьем переполохе! Сможешь больше?`,
    chicken4: `Мной было захвачено ${value} курочек на курином переполохе! Сможешь больше?`,
    cow4: `Мной было захвачено ${value} коровок на коровьем переполохе! Сможешь больше?`,
    basic: 'Присоединяйтесь ко мне в игре “Просто ферма”'
  }
  const farm: string = state.farm.toLowerCase();
  const FARM: string = state.farm.toUpperCase();

  
  if (state.platform === 'vk') {
    if (type !== 1) {
      const attach: string = process.env[`VK_${FARM}_BANNER_${type}`];
      bridge.send("VKWebAppShowWallPostBox", {
          "message": langs[farm + type],
          "attachments": `${attach},${process.env.VK_APP_LINK}`
      }).then((res) => {
        if (res.post_id) this.state.amplitude.logAmplitudeEvent('wall_post', {});

      });
    } 
  };
  if (state.platform === 'ok') {
    if (type !== 1) {
      const attach: string = process.env[`OK_${FARM}_BANNER_${type}`];

      FAPI.UI.postMediatopic( {
        "media": [
          {
            "type": "text", 
            "text": langs[farm + type],
          },
          {
            "type": "link", 
            "noImage": true, 
            "imageUrl": attach,
            "url": process.env.OK_APP_LINK
          },
        ]
      }, false);
    } 
  }
}

function sendAppEventVk(state: Istate, type: number, value: number): void {
  if (state.platform === 'vk') {
    const data = {
      id: state.user.id,
      hash: state.user.hash,
      counter: state.user.counter,
      activityId: type,
      value,
    };
    axios.post(process.env.API + "/appEventVk", data).then((res) => {});
  }
}

function playSoundOnce(soundName: string): void {
  if (this.game.scene.keys['Preload'].readySounds) {    
    const sound = this.sound.add(soundName, { volume: this.state.soundVolume, loop: false });
    sound.play();
  }
}

function setPlatformStorage(key: string, value: any): void {
  const valueString: string = JSON.stringify(value);
  switch (this.state.platform) {
    case 'vk':
      bridge.send('VKWebAppStorageSet', { key: key, value: valueString });
      break;
    case 'ok':
      FAPI.Client.call({ method: 'storage.set', key: key, value: valueString });
      break;
    case 'ya':
      const obj = {};
      obj[key] = valueString;
      this.state.yaPlayer?.setData(obj, true).then(res => {
      });
      break;
    default:
      LocalStorage.set(key, valueString);
      break;
  }
}

function getPlatformStorage(key: string): Promise<any> {
  const isJSON = (data: string): boolean => {
    try {
      JSON.parse(data);
    } catch (e) {
      return false;
    }
    return true;
  };

  return new Promise((resolve, reject) => {
    switch (this.state.platform) {
      case 'vk':
        bridge.send('VKWebAppStorageGet', { keys: [key] }).then(data => {
          const result = data.keys[0]?.value;
          if (isJSON(result)) resolve(JSON.parse(result));
          reject(false);
        });
        break;
      case 'ok':
        FAPI.Client.call({ method: 'storage.get', keys: [key] }, (res, data) => {
          const result = data.data[key];
          if (isJSON(result)) resolve(JSON.parse(result));
          reject(false);
        });
        break;
      case 'ya':
        this.state.yaPlayer?.getData().then(data => {
          const result = data[key];
          if (isJSON(result)) resolve(JSON.parse(result));
          reject(false);
        }).catch(err => console.log(err));
        break;
      default:
        const result = LocalStorage.get(key);
        if (isJSON(result)) resolve(JSON.parse(result));
        reject(false);
        break;
    }
  });
}

function openConvertorForClan(): void {
  if (this.state.openConvertor) {
    this.state.openConvertor = false;
    this.scene.launch('ClanFarm', this.state);
    this.state.modal = {
      type: 2,
      shopType: 2,
    };
    this.scene.launch('Modal', this.state);
  }
}

function createСleanButton(): void {
  const barsScene: SheepBars | ChickenBars | CowBars = this;

  const actionSheep = (): void => {
    const mainScene: Sheep = barsScene.game.scene.keys[barsScene.state.farm];
    mainScene.sheep.children.iterate(el => {
      if (el) mainScene.collectWool(el, true, false);
    });
    mainScene.territories.children.iterate((el: Territory) => {
      if (el.territoryType === 2 || el.territoryType === 3) {
        el.volume = 1000;
      } else if (el.territoryType === 5) {
        mainScene.state.territory = el;
        mainScene.sellWool();
        mainScene.state.territory = null;
      }
    });
    mainScene.freeCollector();
  };

  const actionChicken = (): void => {
    const mainScene: Chicken = barsScene.game.scene.keys['Chicken'];
    const eggs = [...mainScene.eggs.children.entries];
    eggs.forEach(el => {
      if (el) mainScene.collectEgg(el, true, false);
    });
    mainScene.territories.children.iterate((el: Territory) => {
      if (el.territoryType === 2 || el.territoryType === 3) el.volume = 1000;
      else if (el.territoryType === 5) {
        mainScene.state.territory = el;
        mainScene.sellEggs();
        mainScene.state.territory = null;
      }
    });
    mainScene.freeCollector();
  };

  const actionCow = (): void => {
    const mainScene: Cow = barsScene.game.scene.keys['Cow'];
    mainScene.animalGroup.children.iterate(el => {
      if (el) mainScene.collectMilk(el, true, false);
    });
    mainScene.territories.children.iterate((el: CowTerritory) => {
      if (el.territoryType === 2 || el.territoryType === 3) el.volume = 1000;
      else if (el.territoryType === 8) el.factory.sellProducts();
    });
    mainScene.freeCollector();
  };
  if (barsScene.checkCleanUpBtn()) {
    barsScene.cleanUpBtn = barsScene.add.sprite(barsScene.cameras.main.width - 42, 185, 'btn-clean');

    barsScene.clickButton(barsScene.cleanUpBtn, (): void => {
      barsScene.state.modal = {
        type: 1,
        sysType: 24,
        confirmSpendParams: {
          type: 'CleanUp',
          price: 1,
          callback: (): void => {
            if (barsScene.state.farm === 'Sheep') actionSheep();
            else if (barsScene.state.farm === 'Chicken') actionChicken();
            else if (barsScene.state.farm === 'Cow') actionCow();
            barsScene.cleanUpBtn?.destroy();
            barsScene.game.scene.keys[barsScene.state.farm].tryTask(15, 1);

            barsScene.state.amplitude.logAmplitudeEvent('diamonds_spent', {
              type: 'cleaning',
              count: 1,
            });
          }
        }
      };
      barsScene.scene.launch('Modal', barsScene.state);
    });
  }
}

function checkCleanUpBtn():  boolean {
  const barsScene: SheepBars | ChickenBars | CowBars = this;

  const farmUser: IuserSheep | IuserChicken | IuserCow = barsScene.state[`user${barsScene.state.farm}`];
  let check = false;
  if (barsScene.state.farm === 'Sheep') {
    const mainScene: Sheep = barsScene.game.scene.keys[barsScene.state.farm];
    mainScene.territories.children.iterate((ter: Territory) => {
      if (ter.territoryType === 5) {
        const terSettings: IterritoriesSheepSettings = mainScene.state.sheepSettings.territoriesSheepSettings.find(el => ter.improve === el.improve);
        check = Math.round(terSettings.storage / 2) < ter.volume;
      }
    });
  } else if (barsScene.state.farm === 'Chicken') {
    const mainScene: Chicken = barsScene.game.scene.keys[barsScene.state.farm];
    mainScene.territories.children.iterate((ter: Territory) => {
      if (ter.territoryType === 5) {
        const terSettings: IterritoriesChickenSettings = mainScene.state.chickenSettings.territoriesChickenSettings.find(el => ter.improve === el.improve);
        check = Math.round(terSettings.storage / 2) < ter.volume;
      }
    });
  } else if (barsScene.state.farm === 'Cow') {
    const mainScene: Cow = barsScene.game.scene.keys[barsScene.state.farm];
    const factoryTerritory = mainScene.territories.children.entries.find((ter: CowTerritory) => ter.territoryType === 8) as CowTerritory;
    check = factoryTerritory && factoryTerritory.factory.money > 0;
  }

  return farmUser.collector <= 0 && check && barsScene.state.userSheep.part > 8;
}

function initAndroidStore(): void {
  const { packages } = general;
  const store: any = window['store'];
  if (!store) {
    console.log('Store not available');
    return;
  }

  for (const pack of packages) {
    store.register({
      id: String(pack.id),
      alias: 'package_' + pack.id,
      price: pack.price,
      type: store.CONSUMABLE
    });
  }

  for (const pack of packages) {
    store.when('package_' + pack.id)
      .approved((p) => {
        p.verify();
      })
      .verified((p) => {
        axios.post(process.env.API + '/callbackPayAndroid', {
          id: this.state.user.id,
          hash: this.state.user.hash,
          counter: this.state.user.counter,
          pack: p,
        }).then(res => {
          if (!res.data.error) {
            try {
              this.state.adjust.shopPurchaseEvent.setRevenue(pack.price, 'RUB');
              window[`Adjust`].trackEvent(this.state.adjust.shopPurchaseEvent);
            } catch (err) { console.log('ADJUST', err) }

            this.game.scene.keys[this.state.farm].autosave();
          }
        });
        p.finish();
      });
  }

  store.error((error) => {
    console.log('ERROR ' + error.code + ': ' + error.message);
  });
  store.applicationUsername = () => this.state.user.id;
  store.refresh();
}

export {
  createСleanButton,
  openConvertorForClan,
  yandexAuth,
  random,
  getRandomBool,
  randomString,
  shortNum,
  timer,
  shortTime,
  payRobokassa,
  payOdnoklassniki,
  payVK,
  payYandex,
  payAndroid,
  romanize,
  logout,
  convertDiamonds,
  convertMoney,
  exchange,
  donePart,
  pickUpTaskReward,
  onlineStatus,
  socialButtons,
  checkStorage,
  getNewbieAward,
  takeDonate,
  loadingScreen,
  spreadAnimals,
  getEventRaiting,
  getStatusSettings,
  nextDayTimer,
  autoporgressCollectorTime,
  loadingModal,
  remainderSellResource,
  createTaskZone,
  farmBalance,
  sendSocialEvent,
  sendAppEventVk,
  playSoundOnce,
  setPlatformStorage,
  getPlatformStorage,
  checkCleanUpBtn,
  initAndroidStore
}
