import axios from 'axios';
import { FAPI } from '../libs/Fapi.js';
import bridge from '@vkontakte/vk-bridge';
import * as amplitude from 'amplitude-js';
import Hint from '../components/animations/Hint';
import Firework from '../components/animations/Firework';
import BigInteger from '../libs/BigInteger';
import MoneyAnimation from './../components/animations/MoneyAnimation';
import SpeechBubble from './../components/animations/SpeechBuble';
import tasks from '../tasks';
import basicSheepTerritories from '../local/sheepTerritories';
import basicChickenTerritories from '../local/chickenTerritories';
import basicCowTerritories from '../local/cowTerritories';
import basicUnicornCollector from '../local/unicornCollector';
import { unicornSettings, sheepSettings, chickenSettings, cowSettings } from '../local/settings';


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
  if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
  if (this.scene.isActive('Profile')) this.scene.stop('Profile');
  if (this.scene.isActive('Fortune')) this.scene.stop('Fortune');
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
  const farm: string = this.state.farm.toLowerCase();
  const partsSettings: Ipart[] = this.state[`${farm}Settings`][`${farm}Parts`];
  const part: number = this.state[`user${this.state.farm}`].part;
  
  let exchange: number = partsSettings.find((item: Ipart) => item.sort === part).exchange;
  return exchange *= diamonds;
}


function convertMoney(money: number): number {
  const farm: string = this.state.farm.toLowerCase();
  const partsSettings: Ipart[] = this.state[`${farm}Settings`][`${farm}Parts`];
  const part: number = this.state[`user${this.state.farm}`].part;

  const exchange: number = partsSettings.find((item: Ipart) => item.sort === part).exchange;
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
    user.money += this.convertDiamonds(this.state.convertor.diamonds);

    MoneyAnimation.create(this.game.scene.keys[`${this.state.farm}Bars`]);
    if (!ad) {

      this.logAmplitudeEvent('diamonds_spent', {
        type: 'convertor',
        count: this.state.convertor.diamonds,
      });
      this.tryTask(15, 0, this.state.convertor.diamonds);
    }

    if (this.state.convertor.fun === 1) {
      buyAnimal();
    } else if (this.state.convertor.fun === 2) {
      this.fairLevelUp();
    } else if (this.state.convertor.fun === 3) {
      this.improveTerritory();
    } else if (this.state.convertor.fun === 4) {
      this.exchangeTerritory();
    } else if (this.state.convertor.fun === 5) {
      this.installTerritory();
    } else if (this.state.convertor.fun === 6) {
      this.buyTerritory();
    } else if (this.state.convertor.fun === 7) {
      this.buyNextFarm();
    } else if (this.state.convertor.fun === 8) {
      this.improveCollector();
    }
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

  const award: number = parts.find((data: Ipart) => data.sort === user.part).award;

  this.state.user.diamonds += award;

  this.logAmplitudeEvent('diamonds_get', {
    type: 'part_award',
    count: award,
  });

  user.part++;
  this.state.progress[this.state.farm.toLowerCase()].part = user.part;
  
  this.deleteTerritoriesLocks();
  this.game.scene.keys[this.state.farm + 'Bars'].currentPartProgress();

  this.logAmplitudeEvent('chapter_done', {
    chapter: user.part - 1
  });
  this.autosave();
  
  this.time.addEvent({ delay: 200, callback: (): void => {
    this.checkDoneTasks();
  }, callbackScope: this, loop: false });

  this.time.addEvent({ delay: 1500, callback: (): void => {
    if (!((user.part === 3 && this.state.user.additionalTutorial.cave) || 
      (user.part === 5 && this.state.user.additionalTutorial.herdBoost) ||
      (user.part === 6 && this.state.user.additionalTutorial.feedBoost) || 
      user.part === 4)) {
      if (!this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')) this.showTasks();
    }
  }, callbackScope: this, loop: false });

}


// забрать награду за задание
function pickUpTaskReward(id: number): void {

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

    this.state.user.xp += task.xp;
    task.got_awarded = 1;

    if (this.scene.isActive('Modal')) {

      this.scene.stop('Modal');
      this.showTasks();

    }

  }

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

  if (localStorage.user) {

    let user: Iuser = JSON.parse(localStorage.user);

    if (user.hash !== hash) {
      localStorage.clear();
      console.log('clear localStorage');
    }

  }

}


// покупка следующей фермы
function buyNextFarm(): void {

  let user: IuserSheep | IuserChicken | IuserCow;
  let progress: IpartProgress;
  let farm: string;
  let check: boolean = false;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    progress = this.state.progress.chicken;
    farm = 'Chicken';

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    // progress = this.state.progress.chicken;
    // farm = 'Chicken';

  } else if (this.state.farm === 'Cow') {

    user = this.state.userCow;
    // progress = this.state.progress.cow;
    // farm = 'Cow';

  } 

  if (progress.donate) {
    
    if (this.state.user.diamonds >= progress.price) check = true;
    else {

      let count: number = progress.price - this.state.user.diamonds;
          
      this.state.convertor = {
        fun: 7,
        count: count,
        diamonds: count,
        type: 2
      }

      let modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);

    }

  } else {

    if (user.money >= progress.price) check = true;
    else {
      
      let count: number = progress.price - user.money;
      let diamonds: number = this.convertMoney(count);
      this.state.convertor = {
        fun: 7,
        count: count,
        diamonds: diamonds,
        type: 1
      }

      let modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
      
    }
    
  }


  if (check) {

    if (progress.donate) this.state.user.diamonds -= progress.price;
    else user.money -= progress.price;

    this.logAmplitudeEvent('get_new_farm', {
      type: 'buy',
      farm_id: farm
    });

    this.scene.stop(this.state.farm);
    this.scene.stop(this.state.farm + 'Bars');
    this.scene.start(farm + 'Preload', this.state);

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

      let timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        
        counter++;
        let x: number = random(270, 690);
        let y: number = random(510, 690);
        let id: string = 'local_' + randomString(18);
        this.getSheep(id, 0, x, y, 0, 500, -5);
        this.tryTask(18, 0);
        if (counter >= 5) timeout.remove(false);

      }, callbackScope: this, loop: true });
      break;

    }

    if (i === 2 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {

      this.state.dailyAwards[i] = false;
      let type: number = this.state.userSheep.fair + 1;
      let counter: number = 0;
      const text: string = this.state.lang.dailyNewbieHint2.replace('$1', String(type)); 
      Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, text, 2);
      let timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        
        counter++;
        let x: number = random(270, 690);
        let y: number = random(510, 690);
        let id: string = 'local_' + randomString(18);
        this.getSheep(id, type, x, y, 0, 500);
        Firework.create(this, {x, y}, 1);
        this.tryTask(2, 0);
        this.tryTask(2, type);
        this.tryTask(4, type);
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

      this.logAmplitudeEvent('get_new_farm', {
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
      break;
      
    }

    if (i === 5 && this.state.dailyAwards[i] && this.state.farm === 'Chicken') {

      let type: number = this.state.userChicken.fair + 1;
      let counter: number = 0;
      const text: string = this.state.lang.dailyNewbieHint5.replace('$1', String(type)); 
      Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, text, 2);

      let timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        
        counter++;
        let x: number = random(270, 690);
        let y: number = random(510, 690);
        let id: string = 'local_' + randomString(18);
        this.getChicken(id, type, x, y, 0, 500);
        Firework.create(this, {x, y}, 1);
        this.tryTask(2, 0);
        this.tryTask(2, type);
        this.tryTask(4, type);
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
      break;

    }

    if (i === 7 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {
      const text: string = this.state.lang.dailyNewbieHint7; 
      Hint.create(this.game.scene.keys[`${this.state.farm}Bars`], -250, text, 2);
      let counter: number = 0;
      let timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        
        counter++;
        let x: number = random(270, 690);
        let y: number = random(510, 690);
        let id: string = 'local_' + randomString(18);
        this.getSheep(id, 0, x, y, 0, 500, -5);
        this.tryTask(18, 0);
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
        this.logAmplitudeRevenue('Product #' + res.data.package, pack.price, '', eventPorerties);

        MoneyAnimation.create(this.game.scene.keys[this.state.farm + 'Bars'], 'diamond');
        this.autosave();

      }

    }

  });

}

function debug(): void {

  let user: IuserSheep | IuserChicken | IuserCow;

  if (this.state.farm === 'Sheep') {
    user = this.state.userSheep;

    let checkUsersData: boolean = false;
    if (typeof this.state.userSheep.money !== 'number') checkUsersData = true;
    if (typeof this.state.userSheep.fair !== 'number') checkUsersData = true;
    if (typeof this.state.userSheep.part !== 'number') checkUsersData = true;
    if (typeof this.state.userSheep.collector !== 'number') checkUsersData = true;
    if (typeof this.state.userSheep.collectorLevel !== 'number') checkUsersData = true;
    if (typeof this.state.userSheep.collectorTakenTime !== 'number') checkUsersData = true;
    if (typeof this.state.userSheep.diamondAnimalTime !== 'number') checkUsersData = true;
    if (typeof this.state.userSheep.tutorial !== 'number') checkUsersData = true;
    if (typeof this.state.userSheep.autosaveCounter !== 'number') checkUsersData = true;
    if (typeof this.state.userSheep.diamondAnimalAd !== 'boolean') checkUsersData = true;
    if (typeof this.state.userSheep.countSheep !== 'number') checkUsersData = true;
    if (checkUsersData && !this.game.scene.keys[this.state.farm].debugLog) {
      this.game.scene.keys[this.state.farm].debugLog = true;
      sendDebug(this.state.userSheep, this.state, 'userSheep');
    }

  } else if (this.state.farm === 'Chicken') {
    user = this.state.userChicken;

    let checkUsersData: boolean = false;
    if (typeof this.state.userChicken.money !== 'number') checkUsersData = true;
    if (typeof this.state.userChicken.fair !== 'number') checkUsersData = true;
    if (typeof this.state.userChicken.part !== 'number') checkUsersData = true;
    if (typeof this.state.userChicken.collector !== 'number') checkUsersData = true;
    if (typeof this.state.userChicken.collectorLevel !== 'number') checkUsersData = true;
    if (typeof this.state.userChicken.collectorTakenTime !== 'number') checkUsersData = true;
    if (typeof this.state.userChicken.diamondAnimalTime !== 'number') checkUsersData = true;
    if (typeof this.state.userChicken.tutorial !== 'number') checkUsersData = true;
    if (typeof this.state.userChicken.autosaveCounter !== 'number') checkUsersData = true;
    if (typeof this.state.userChicken.diamondAnimalAd !== 'boolean') checkUsersData = true;
    if (typeof this.state.userChicken.countChicken !== 'number') checkUsersData = true;
    if (checkUsersData && !this.game.scene.keys[this.state.farm].debugLog) {
      this.game.scene.keys[this.state.farm].debugLog = true;
      sendDebug(this.state.userChicken, this.state, 'userChicken');
    }

  } else if (this.state.farm === 'Cow') {
    user = this.state.userCow;

    let checkUsersData: boolean = false;
    if (typeof this.state.userCow.money !== 'number') checkUsersData = true;
    if (typeof this.state.userCow.fair !== 'number') checkUsersData = true;
    if (typeof this.state.userCow.part !== 'number') checkUsersData = true;
    if (typeof this.state.userCow.collector !== 'number') checkUsersData = true;
    if (typeof this.state.userCow.collectorLevel !== 'number') checkUsersData = true;
    if (typeof this.state.userCow.collectorTakenTime !== 'number') checkUsersData = true;
    if (typeof this.state.userCow.diamondAnimalTime !== 'number') checkUsersData = true;
    if (typeof this.state.userCow.tutorial !== 'number') checkUsersData = true;
    if (typeof this.state.userCow.autosaveCounter !== 'number') checkUsersData = true;
    if (typeof this.state.userCow.diamondAnimalAd !== 'boolean') checkUsersData = true;
    if (typeof this.state.userCow.countCow !== 'number') checkUsersData = true;
    if (checkUsersData && !this.game.scene.keys[this.state.farm].debugLog) {
      this.game.scene.keys[this.state.farm].debugLog = true;
      sendDebug(this.state.userCow, this.state, 'userCow');
    }

  }

  if (user.collector > 0 && typeof this.game.scene.keys[this.state.farm].collectorTimer?.delay !== 'number' && !this.game.scene.keys[this.state.farm].debugLog) {
    this.game.scene.keys[this.state.farm].debugLog = true;
    sendDebug(user, this.state, 'collector');
  }

  let tasks: Itasks[] = this.partTasks();

  if (tasks.length > 0) {
    
    // ярмарка
    let fairTask = tasks.find(data => data.type === 7);

    if (user.fair >= fairTask?.state && fairTask?.done === 0) {

      fairTask.done = 1;
      fairTask.got_awarded = 1;
      this.game.scene.keys[this.state.farm + 'Bars'].currentPartProgress();
      
    }

  }

}

// отправка дебага на сервер
function sendDebug(data: any, state: Istate, type: string): void {

  console.log('sendDebug', data, state, type);

  const query = { 
    id: state.user.id,
    hash: state.user.hash,
    counter: state.user.counter,
    data: data,
    type: type
  }
  axios.post(process.env.API + "/crashLog", query)

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

  let helpText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 100, helpArr[random(0, helpArr.length - 1)], {
    font: '26px Bip',
    color: '#925C28',
    align: 'center',
    wordWrap: { width: 440 }
  }).setOrigin(0.5, 0.5).setDepth(4);

  // экран загрузки
  let padding: number = helpText.height / 2; // Отступ для элементов в зависимости от высоты текста посказки
  let height: number = 200 + helpText.height / 3; // параметр для высоты окна в зависимости от высоты текста посказки
  let text: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 11 - padding, '0%', {
    font: '37px Shadow',
    color: '#1F5B06'
  }).setDepth(1).setOrigin(0.5, 0.5);

  this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY - Math.floor(height / 2), 'header-syst')
    .setOrigin(0.5, 1);
  this.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY + Math.floor(height / 2), 'bottom-syst')
    .setOrigin(0.5, 0);
  this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 614, height + 2, "mid-syst")
    .setOrigin(0.5, 0.5);
  
  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - Math.floor(height / 2) - 22, loading, {
    font: '37px Shadow',
    color: '#F9D48D'
  }).setDepth(1).setOrigin(0.5, 1);

  this.add.sprite(120, this.cameras.main.centerY + 20 - padding, 'pb-empty-corner');
  this.add.sprite(600, this.cameras.main.centerY + 20 - padding, 'pb-empty-corner').setScale(-1, 1);
  this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY + 20 - padding, 436, 130, 'pb-empty-mid');
  
  let leftCorner: Phaser.GameObjects.Sprite = this.add.sprite(120, this.cameras.main.centerY + 20 - padding, 'pb-full-corner')
    .setAlpha(0);
  let rightCorner: Phaser.GameObjects.Sprite = this.add.sprite(600, this.cameras.main.centerY + 20 - padding, 'pb-full-corner')
    .setFlip(true, false)
    .setAlpha(0);
  let progress: Phaser.GameObjects.TileSprite = this.add.tileSprite(142, this.cameras.main.centerY + 20 - padding, 0, 130, 'pb-full-mid')
    .setVisible(false)
    .setOrigin(0, 0.5);

  // прогресс загрузки
  this.load.on('progress', (value: number): void => {

    let percent: number = Math.round(value * 100);

    if (percent >= 5 && leftCorner.alpha === 0) leftCorner.setAlpha(1);
    if (percent >= 95 && rightCorner.alpha === 0) {
      progress.setDisplaySize(436, 130);
      rightCorner.setAlpha(1);
    }

    if (percent > 5 && percent < 95) {

      let onePercent: number = 420 / 90;
      let bar: number = Math.round(percent * onePercent);
      progress.setDisplaySize(bar, 130).setVisible(true);
      
    }
    
    text.setText(percent + '%');

  });
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

  let animal: string = this.state.farm.toLowerCase();
  
  let localSpread: boolean = false; // Локальная метка на передвижение
  let allTerritories = []; // Все территории
  let nearTerritories = [];  // Территории вокруг самой заполенной
  let animalWithoutAim: any = false; // Овца без цели

  // 1. ПОДГОТОВКА ДАННЫХ
  // берем только нужные территории
  for (let i in this.territories.children.entries) {

    if (this.territories.children.entries[i].type === 2 || this.territories.children.entries[i].type === 3) {
      allTerritories.push({
        _id: this.territories.children.entries[i]._id,
        block: this.territories.children.entries[i].block,
        position: this.territories.children.entries[i].position,
        count: [],
        x: this.territories.children.entries[i].x + this.territories.children.entries[i].width / 2,
        y: this.territories.children.entries[i].y + this.territories.children.entries[i].height / 2
      });
    }

  }

  // смотрим, где какая овца сидит
  if (this[animal] !== undefined) {

    for (let i in this[animal].children.entries) {
  
      let c = this[animal].children.entries[i];
      let territory = this.currentTerritory(c.x, c.y);
  
      if (territory !== undefined) {
        
        territory = allTerritories.find(data => data._id === territory._id);
  
        if (territory !== undefined) {
          territory.count.push(this[animal].children.entries[i])
        }
        
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
        topTerritory !== undefined &&
        topTerritory.count.length !== 0 &&
        topTerritory.count.every(el => el.spread === false) &&
        topTerritory.count.find(data => data.aim === false) !== undefined
      ) {

        animalWithoutAim = topTerritory.count.find(data => data.aim === false);        
        animalWithoutAim.spread = true;
        let randomX: number = Phaser.Math.Between(allTerritories[i].x - 10, allTerritories[i].x + 10);
        let randomY: number = Phaser.Math.Between(allTerritories[i].y - 10, allTerritories[i].y + 10);
        if (this.state.farm === 'Cow') {
          animalWithoutAim.setAim(randomX, randomY);
        } else {
          this.aim(animalWithoutAim, randomX, randomY);
        }
        localSpread = true;

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
      if (allTerritories[i].count.every(el => el.spread === false)) {
        
        // Находим лишнюю овцу без цели
        animalWithoutAim = allTerritories[i].count.find(data => data.aim === false);
        nearTerritories = [];
      
        // Проверяем территорию снизу и если она пустая, то перемещаем овцу
        if (allTerritories[i].block + 1 >= 3) {
    
          let bottomTerritory = allTerritories.find(data => data.block === allTerritories[i].block + 1 && data.position === allTerritories[i].position);
    
          if (
            bottomTerritory !== undefined &&
            bottomTerritory.count.length === 0 &&
            animalWithoutAim &&
            animalWithoutAim.spread === false
          ) {
    
            animalWithoutAim.spread = true;
            let randomX: number = Phaser.Math.Between(bottomTerritory.x - 10, bottomTerritory.x + 10);
            let randomY: number = Phaser.Math.Between(bottomTerritory.y - 10, bottomTerritory.y + 10);
            if (this.state.farm === 'Cow') {
              animalWithoutAim.setAim(randomX, randomY);
            } else {
              this.aim(animalWithoutAim, randomX, randomY);

            }
            
            break;
  
          } else if (bottomTerritory !== undefined) nearTerritories.push(bottomTerritory);
    
        }
    
        // Если овца еще не перемещается, то продолжаем проверять территорию вокруг
        if (animalWithoutAim && animalWithoutAim.spread === false) {
          
          // Проверяем территорию справа
          if (allTerritories[i].position + 1 <= 3) {
            let rightTerritory = allTerritories.find(data => data.position === allTerritories[i].position + 1 && data.block === allTerritories[i].block);
            if (rightTerritory !== undefined) nearTerritories.push(rightTerritory);
          }
          
          // Проверяем территорию слева 
          if (allTerritories[i].position - 1 >= 1) {
            let leftTerritory = allTerritories.find(data => data.position === allTerritories[i].position - 1 && data.block === allTerritories[i].block);
            if (leftTerritory !== undefined) nearTerritories.push(leftTerritory);
          }
            
          // Проверяем территорию сверху
          if (allTerritories[i].block - 1 >= 2) {
            let topTerritory = allTerritories.find(data => data.block === allTerritories[i].block - 1 && data.position === allTerritories[i].position);
            if (topTerritory !== undefined) nearTerritories.push(topTerritory);
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

            if (this.state.farm === 'Cow') {
              animalWithoutAim.setAim(randomX, randomY);
            } else {
              this.aim(animalWithoutAim, randomX, randomY);
            }

            break;
  
          }
        }
      }
    }
  }
}

function getEventRaiting(): void {
  
  let login: string;
  if (this.state.platform !== 'web') {
    login = this.state.name
  } else login = this.state.user.login

  let score: number = this.state.farm === 'Unicorn' ? this.state.userUnicorn.maxLevelAnimal : this.state.progress.event.eventPoints;

  this.state.socket.io.emit('setRating', {
    name: login,
    mongo: this.state.user.id,
    score: score
  });
}

function getStatusSettings(string: string): IstatusSettings {
  if (string && this.state.lang[string + 'Status']) {
    return {
      textColor: '#459D1A',
      text: this.state.lang[string + 'Status'],
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
    this.state[`user${this.state.farm}`].takenHerdBoost = 0;
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

function intervalPorgressCollectorTime(): void {

  if (this.state.farm === 'Sheep') {
    this.state.progress.sheep.collector = this.state.userSheep.collector;
    if (this.state.progress.chicken.collector > 0) this.state.progress.chicken.collector--;
    if (this.state.progress.cow.collector > 0) this.state.progress.cow.collector--;
  } else if (this.state.farm === 'Chicken') {
    this.state.progress.chicken.collector = this.state.userChicken.collector;
    if (this.state.progress.sheep.collector > 0) this.state.progress.sheep.collector--;
    if (this.state.progress.cow.collector > 0) this.state.progress.cow.collector--;
  } else if (this.state.farm === 'Cow') {
    this.state.progress.cow.collector = this.state.userCow.collector;
    if (this.state.progress.sheep.collector > 0) this.state.progress.sheep.collector--;
    if (this.state.progress.chicken.collector > 0) this.state.progress.chicken.collector--;
  } else if (this.state.farm === 'Unicorn') {
    if (this.state.progress.chicken.collector > 0) this.state.progress.chicken.collector--;
    if (this.state.progress.sheep.collector > 0) this.state.progress.sheep.collector--;
    if (this.state.progress.cow.collector > 0) this.state.progress.cow.collector--;
  }
}

function autoporgressCollectorTime(): void {
  if (this.state.progress.sheep.collector >= this.state.progress.sheep.offlineTime) {
    this.state.progress.sheep.collector -= this.state.progress.sheep.offlineTime;
  } else {
    this.state.progress.sheep.collector = 0;
  }

  if (this.state.progress.chicken.collector >= this.state.progress.chicken.offlineTime) {
    this.state.progress.chicken.collector -= this.state.progress.chicken.offlineTime;
  } else {
    this.state.progress.chicken.collector = 0;
  }

  if (this.state.progress.cow.collector >= this.state.progress.cow.offlineTime) {
    this.state.progress.cow.collector -= this.state.progress.cow.offlineTime;
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
      const storages: any[] = this.territories.children.entries.filter(el => el.type === 5)
      let check: boolean = false;
      for (let i: number =0; i < storages.length; i++) {
        const setting = this.state.sheepSettings.territoriesSheepSettings.find(elSetting => elSetting.improve === storages[i].improve);
        if (storages[i].volume >= setting.woolStorage * remainderPercent) {
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
  this.taskZone = this.add.zone(this.cameras.main.centerX, 75, 200, 150).setDepth(1).setDropZone(undefined, () => {});

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

function logAmplitudeEvent(eventName: string, data: IamplitudeData): void {
  let eventData: IamplitudeData;

  if (this.state.farm !== 'Unicorn' && data.farm_id !== 'Unicorn') {
    const balance: Ibalance = this.balance();
    const waterPercent: number = balance.notEnoughWater? -1 * balance.waterPercent : balance.waterPercent;
    const grassPercent: number = balance.notEnoughGrass ? -1 * balance.grassPercent : balance.grassPercent;
    let countAnimal: number = this[this.state.farm.toLowerCase()]?.children.entries.length;
    if (!countAnimal) countAnimal = 0;
    if (this.state.farm === 'Cow') countAnimal = this.animalGroup?.children.entries.length;
    eventData = {
      farm_id: this.state.farm,
      chapter: this.state[`user${this.state.farm}`].part,
      diamonds: this.state.user.diamonds,
      money: this.state[`user${this.state.farm}`].money,
      fairLevel: this.state[`user${this.state.farm}`].fair,
      collector: this.state[`user${this.state.farm}`].collector,
      countAnimal: countAnimal,
      balanceWaterPercent: waterPercent,
      balanceGrassPercent: grassPercent,
    }
  } else {
    let countAnimal: number = this.animals?.children.entries.length;
    if (!countAnimal) countAnimal = 0;

    eventData = {
      farm_id: this.state.farm,
      chapter: this.state[`user${this.state.farm}`].maxLevelAnimal,
      diamonds: this.state.user.diamonds,
      money: this.state[`user${this.state.farm}`].money,
      collector: this.state[`user${this.state.farm}`].collector,
      countAnimal: countAnimal,
    }
  }
  for (const key in data) {
    eventData[key] = data[key];
  }
  this.state.amplitude.getInstance().logEvent(eventName, eventData);
}


function logAmplitudeRevenue(productId: string, price: number, type: string = '',  data: IamplitudeData): void {
  let revenueData: IamplitudeData;

  if (this.state.farm !== 'Unicorn' && data.farm_id !== 'Unicorn') {
    const balance: Ibalance = this.balance();
    const waterPercent: number = balance.notEnoughWater? -1 * balance.waterPercent : balance.waterPercent;
    const grassPercent: number = balance.notEnoughGrass ? -1 * balance.grassPercent : balance.grassPercent;
    let countAnimal: number = this[this.state.farm.toLowerCase()]?.children.entries.length;
    if (this.state.farm === 'Cow') countAnimal = this.animalGroup?.children.entries.length;
    if (!countAnimal) countAnimal = 0;

    revenueData = {
      farm_id: this.state.farm,
      chapter: this.state[`user${this.state.farm}`].part,
      diamonds: this.state.user.diamonds,
      money: this.state[`user${this.state.farm}`].money,
      fairLevel: this.state[`user${this.state.farm}`].fair,
      collector: this.state[`user${this.state.farm}`].collector,
      countAnimal: countAnimal,
      balanceWaterPercent: waterPercent,
      balanceGrassPercent: grassPercent,
    }
  } else {
    let countAnimal: number = this.animals?.children.entries.length;
    if (!countAnimal) countAnimal = 0;

    revenueData = {
      farm_id: this.state.farm,
      chapter: this.state[`user${this.state.farm}`].maxLevelAnimal,
      diamonds: this.state.user.diamonds,
      money: this.state[`user${this.state.farm}`].money,
      collector: this.state[`user${this.state.farm}`].collector,
      countAnimal: countAnimal,
    }
  }
  for (const key in data) {
    revenueData[key] = data[key];
  }

  const revenue: amplitude.Revenue = new amplitude.Revenue()
    .setProductId(productId)
    .setPrice(price)
    .setEventProperties(revenueData);

  if (type) revenue.setRevenueType(type);

  this.state.amplitude.logRevenueV2(revenue);
}

function loadData(response): void {

  // общие настройки
  this.state.autoSaveSpeed = response.data.settings.general.autoSaveSpeed;
  this.state.maxMerginTime = response.data.settings.general.maxMerginTime;
  this.state.herdBoostSpeedAnimal = response.data.settings.general.herdBoostSpeedAnimal;
  this.state.herdBoostTime = response.data.settings.general.herdBoostTime;
  this.state.herdBoostPrice = response.data.settings.general.herdBoostPrice;
  this.state.herdBoostDelay = response.data.settings.general.herdBoostDelay;
  this.state.packages = response.data.settings.packages;

  // общие данные
  this.state.dailyAwards = response.data.user.dailyAwards;
  this.state.newbieTime = response.data.progress.newbieTime;
  this.state.daily = response.data.progress.daily;
  this.state.timeToNewDay = response.data.progress.timeToNewDay;

  const resSheepSettings: IsheepSettings = {
    sheepBadPercent: response.data.settings.sheep.badPercent,
    sheepPrice: response.data.settings.sheep.price,
    territoriesSheepSettings: response.data.settings.sheep.territoriesSettings,
    sheepSettings: response.data.settings.sheep.sheepSettings,
    territoriesSheepPrice: response.data.settings.sheep.territoriesPrice,
    sheepFairLevels: response.data.settings.sheep.fairs,
    sheepParts: response.data.settings.sheep.parts,
    buyBetterBreedSheep: response.data.settings.sheep.buyBetterBreed,
    doubledСollectorPrice: response.data.settings.sheep.doubledСollectorPrice,
    collectorPrice4: response.data.settings.sheep.collectorPrice4,
    collectorPrice12: response.data.settings.sheep.collectorPrice12,
    unlockCollector4: response.data.settings.sheep.unlockCollector4,
    unlockCollector12: response.data.settings.sheep.unlockCollector12,
    sheepDiamondsTime: response.data.settings.sheep.diamondAnimalTime,
    feedBoostPrice: response.data.settings.sheep.feedBoostPrice,
  }


  const resChickenSettings: IchickenSettings = {
    chickenBadPercent: response.data.settings.chicken.badPercent,
    chickenPrice: response.data.settings.chicken.price,
    territoriesChickenSettings: response.data.settings.chicken.territoriesSettings,
    chickenSettings: response.data.settings.chicken.chickenSettings,
    territoriesChickenPrice: response.data.settings.chicken.territoriesPrice,
    chickenFairLevels: response.data.settings.chicken.fairs,
    chickenParts: response.data.settings.chicken.parts,
    buyBetterBreedChicken: response.data.settings.chicken.buyBetterBreed,
    doubledСollectorPrice: response.data.settings.chicken.doubledСollectorPrice,
    collectorPrice4: response.data.settings.chicken.collectorPrice4,
    collectorPrice12: response.data.settings.chicken.collectorPrice12,
    unlockCollector4: response.data.settings.chicken.unlockCollector4,
    unlockCollector12: response.data.settings.chicken.unlockCollector12,
    chickenDiamondsTime: response.data.settings.chicken.diamondAnimalTime,
    feedBoostPrice: response.data.settings.chicken.feedBoostPrice,
  };

  const factoryCowSettings: IfactorySettings[] = [
    { 
      improve: 1,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 0,
      processingTime: 15,
      lotSize: 100,
      clabberPercent: 40,
      pasteurizedMilkPercent: 0,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 20,
    },
    { 
      improve: 2,
      unlock_improve: 1,
      improveMoneyPrice: 40000,
      improveDiamondPrice: 0,
      processingTime: 30,
      lotSize: 400,
      clabberPercent: 40,
      pasteurizedMilkPercent: 30,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 50,
    },
    { 
      improve: 3,
      unlock_improve: 1,
      improveMoneyPrice: 600000,
      improveDiamondPrice: 0,
      processingTime: 30,
      lotSize: 1000,
      clabberPercent: 30,
      pasteurizedMilkPercent: 40,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 55,
    },
    { 
      improve: 4,
      unlock_improve: 1,
      improveMoneyPrice: 1600000,
      improveDiamondPrice: 0,
      processingTime: 30,
      lotSize: 2000,
      clabberPercent: 30,
      pasteurizedMilkPercent: 45,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 60,
    },
    { 
      improve: 5,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 60,
      processingTime: 60,
      lotSize: 3000,
      clabberPercent: 35,
      pasteurizedMilkPercent: 45,
      cheesePercent: 20,
      chocolatePercent: 100,
      efficiency: 93,
    },
    { 
      improve: 6,
      unlock_improve: 1,
      improveMoneyPrice: 12000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 12000,
      clabberPercent: 35,
      pasteurizedMilkPercent: 45,
      cheesePercent: 20,
      chocolatePercent: 100,
      efficiency: 93,
    },
    { 
      improve: 7,
      unlock_improve: 1,
      improveMoneyPrice: 36000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 25000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 8,
      unlock_improve: 1,
      improveMoneyPrice: 56000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 35000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 9,
      unlock_improve: 1,
      improveMoneyPrice: 160000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 50000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 10,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 240,
      processingTime: 120,
      lotSize: 150000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 11,
      unlock_improve: 1,
      improveMoneyPrice: 320000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 300000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 45,
      cheesePercent: 35,
      chocolatePercent: 100,
      efficiency: 108,
    },
    { 
      improve: 12,
      unlock_improve: 1,
      improveMoneyPrice: 560000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 400000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 50,
      cheesePercent: 30,
      chocolatePercent: 100,
      efficiency: 105,
    },
    { 
      improve: 13,
      unlock_improve: 1,
      improveMoneyPrice: 1200000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 600000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 50,
      cheesePercent: 30,
      chocolatePercent: 100,
      efficiency: 105,
    },
    { 
      improve: 14,
      unlock_improve: 1,
      improveMoneyPrice: 1600000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 950000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 50,
      cheesePercent: 30,
      chocolatePercent: 100,
      efficiency: 105,
    },
    { 
      improve: 15,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 540,
      processingTime: 180,
      lotSize: 2000000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 35,
      cheesePercent: 45,
      chocolatePercent: 100,
      efficiency: 113,
    },
    { 
      improve: 16,
      unlock_improve: 1,
      improveMoneyPrice: 2600000000,
      improveDiamondPrice: 0,
      processingTime: 180,
      lotSize: 3500000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 35,
      cheesePercent: 45,
      chocolatePercent: 100,
      efficiency: 113,
    },
    { 
      improve: 17,
      unlock_improve: 1,
      improveMoneyPrice: 4000000000,
      improveDiamondPrice: 0,
      processingTime: 180,
      lotSize: 5000000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 35,
      cheesePercent: 45,
      chocolatePercent: 100,
      efficiency: 113,
    },
    { 
      improve: 18,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 840,
      processingTime: 300,
      lotSize: 9000000,
      clabberPercent: 5,
      pasteurizedMilkPercent: 30,
      cheesePercent: 65,
      chocolatePercent: 100,
      efficiency: 130,
    },
    { 
      improve: 19,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 1080,
      processingTime: 300,
      lotSize: 14000000,
      clabberPercent: 5,
      pasteurizedMilkPercent: 30,
      cheesePercent: 65,
      chocolatePercent: 100,
      efficiency: 130,
    },
    { 
      improve: 20,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 1800,
      processingTime: 300,
      lotSize: 30000000,
      clabberPercent: 5,
      pasteurizedMilkPercent: 30,
      cheesePercent: 65,
      chocolatePercent: 100,
      efficiency: 130,
    },
  ];

  const resCowSettings: IcowSettings = {
    cowBadPercent: response.data.settings.cow.badPercent,
    cowPrice: response.data.settings.cow.price,
    territoriesCowSettings: response.data.settings.cow.territoriesSettings,
    cowSettings: response.data.settings.cow.cowSettings,
    territoriesCowPrice: response.data.settings.cow.territoriesPrice,
    cowFairLevels: response.data.settings.cow.fairs,
    cowParts: response.data.settings.cow.parts,
    buyBetterBreedCow: response.data.settings.cow.buyBetterBreed,
    doubledСollectorPrice: response.data.settings.cow.doubledСollectorPrice,
    collectorPrice4: response.data.settings.cow.collectorPrice4,
    collectorPrice12: response.data.settings.cow.collectorPrice12,
    unlockCollector4: response.data.settings.cow.unlockCollector4,
    unlockCollector12: response.data.settings.cow.unlockCollector12,
    cowDiamondsTime: response.data.settings.cow.diamondAnimalTime,
    feedBoostPrice: response.data.settings.cow.feedBoostPrice,
    cowFactorySettings: factoryCowSettings,
  };

  const territoriesCowSettings: IterritoriesCowSettings[] = [
    { 
      improve: 1, 
      regeneration: 11, 
      unlock_improve: 1, 
      storage: 5000,   
      improvePastureMoneyPrice: 0,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 2, 
      regeneration: 13, 
      unlock_improve: 2, 
      storage: 30000,   
      improvePastureMoneyPrice: 100,
      improveStorageMoneyPrice: 10000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 3, 
      regeneration: 15, 
      unlock_improve: 2, 
      storage: 100000,   
      improvePastureMoneyPrice: 400,
      improveStorageMoneyPrice: 150000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 4, 
      regeneration: 17, 
      unlock_improve: 2, 
      storage: 230000,   
      improvePastureMoneyPrice: 1500,
      improveStorageMoneyPrice: 400000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 5, 
      regeneration: 19, 
      unlock_improve: 2, 
      storage: 510000,   
      improvePastureMoneyPrice: 5000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 50,
    },
    { 
      improve: 6, 
      regeneration: 22, 
      unlock_improve: 3, 
      storage: 1100000,   
      improvePastureMoneyPrice: 10000,
      improveStorageMoneyPrice: 3000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 7, 
      regeneration: 23, 
      unlock_improve: 3, 
      storage: 2500000,   
      improvePastureMoneyPrice: 23000,
      improveStorageMoneyPrice: 9000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 8, 
      regeneration: 24, 
      unlock_improve: 4, 
      storage: 5000000,   
      improvePastureMoneyPrice: 50000,
      improveStorageMoneyPrice: 14000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 9, 
      regeneration: 25, 
      unlock_improve: 4, 
      storage: 9000000,   
      improvePastureMoneyPrice: 70000,
      improveStorageMoneyPrice: 40000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    {
      improve: 10, 
      regeneration: 27, 
      unlock_improve: 5, 
      storage: 14500000,   
      improvePastureMoneyPrice: 100000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 200,
    },
    { 
      improve: 11, 
      regeneration: 29, 
      unlock_improve: 6, 
      storage: 22000000,   
      improvePastureMoneyPrice: 402000,
      improveStorageMoneyPrice: 80000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 12, 
      regeneration: 31, 
      unlock_improve: 6, 
      storage: 35000000,   
      improvePastureMoneyPrice: 1230000,
      improveStorageMoneyPrice: 140000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 13, 
      regeneration: 33, 
      unlock_improve: 7, 
      storage: 50000000,   
      improvePastureMoneyPrice: 1400000,
      improveStorageMoneyPrice: 300000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 14, 
      regeneration: 34, 
      unlock_improve: 7, 
      storage: 80000000,   
      improvePastureMoneyPrice: 1600000,
      improveStorageMoneyPrice: 400000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 15, 
      regeneration: 35, 
      unlock_improve: 8, 
      storage: 110000000,   
      improvePastureMoneyPrice: 1800000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 450,
    },
    { 
      improve: 16, 
      regeneration: 36, 
      unlock_improve: 9, 
      storage: 200000000,   
      improvePastureMoneyPrice: 3600000,
      improveStorageMoneyPrice: 650000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 17, 
      regeneration: 38, 
      unlock_improve: 10, 
      storage: 300000000,   
      improvePastureMoneyPrice: 7200000,
      improveStorageMoneyPrice: 1000000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 18, 
      regeneration: 40, 
      unlock_improve: 11, 
      storage: 400000000,   
      improvePastureMoneyPrice: 14400000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 700,
    },
    { 
      improve: 19, 
      regeneration: 42, 
      unlock_improve: 12, 
      storage: 500000000,   
      improvePastureMoneyPrice: 28800000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 900,
    },
    { 
      improve: 20, 
      regeneration: 44, 
      unlock_improve: 13, 
      storage: 1000000000,   
      improvePastureMoneyPrice: 57600000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 1500,
    },
  ];

  cowSettings.territoriesCowSettings = territoriesCowSettings;
  
  for (const key in resSheepSettings) {
    if (resSheepSettings[key] === undefined || resSheepSettings[key] === null) resSheepSettings[key] = sheepSettings[key];
  }

  for (const key in resChickenSettings) {
    if (resChickenSettings[key] === undefined || resChickenSettings[key] === null) resChickenSettings[key] = chickenSettings[key];
  }

  for (const key in resCowSettings) {
    if (resCowSettings[key] === undefined || resCowSettings[key] === null) resCowSettings[key] = cowSettings[key];
  }

  this.state.sheepSettings = resSheepSettings;
  this.state.chickenSettings = resChickenSettings;
  this.state.cowSettings = resCowSettings;
  // животные
  const sheep: Isheep[] = [];
  for (let i in response.data.user.sheep) {    
    const lamb = response.data.user.sheep[i];
    sheep.push({
      _id: lamb._id,
      type: lamb.type,
      wool: lamb.wool,
      x: lamb.x,
      y: lamb.y,
      counter: lamb.counter,
      diamond: lamb.diamond,
      vector: lamb.vector
    });
  };

  const chicken: Ichicken[] = [];
  for (let i in response.data.user.chicken) {  
    const chick = response.data.user.chicken[i];
    chicken.push({
      _id: chick._id,
      type: chick.type,
      egg: chick.egg,
      x: chick.x,
      y: chick.y,
      counter: chick.counter,
      diamond: chick.diamond,
      vector: chick.vector
    });
  };

  const cow: Icow[] = [];
  for (let i in response.data.user.cow) {
    const cw = response.data.user.cow[i];
    cow.push({
      _id: cw._id,
      type: cw.type,
      milk: cw.milk,
      x: cw.x,
      y: cw.y,
      counter: cw.counter,
      diamond: cw.diamond,
      vector: cw.vector
    });
  };

  this.state.sheep = sheep;
  this.state.chicken = chicken;
  this.state.cow = cow;

  //территории для обычных ферм
  const sheepTerritories: Iterritories[] = []; 
  for (let i in response.data.user.sheep_territories) {
    const territory = response.data.user.sheep_territories[i];
    sheepTerritories.push({
      _id: territory._id,
      block: territory.block + 1,
      position: territory.position,
      type: territory.type,
      volume: territory.volume,
      improve: territory.improve,
      money: territory.money
    });
  }

  const chickenTerritories: Iterritories[] = [];
  for (let i in response.data.user.chicken_territories) {
    let territory = response.data.user.chicken_territories[i];
    chickenTerritories.push({
      _id: territory._id,
      block: territory.block,
      position: territory.position,
      type: territory.type,
      volume: territory.volume,
      improve: territory.improve,
      money: territory.money
    });
  }

  const cowTerritories: Iterritories[] = [];
  for (let i in response.data.user.cow_territories) {
    const territory = response.data.user.cow_territories[i];
    cowTerritories.push({
      _id: territory._id,
      block: territory.block,
      position: territory.position,
      type: territory.type,
      volume: territory.volume,
      improve: territory.improve,
      money: territory.money
    });
  }

  // проверка наличия территорий
  if (sheepTerritories.length === 0) {
    for (let i in basicSheepTerritories) {
      const territory = basicSheepTerritories[i];
      sheepTerritories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type,
        volume: territory.volume,
        improve: territory.improve,
        money: territory.money
      });
    }
  }

  if (chickenTerritories.length === 0) {
    for (let i in basicChickenTerritories) {
      let territory = basicChickenTerritories[i];
      chickenTerritories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type,
        volume: territory.volume,
        improve: territory.improve,
        money: territory.money
      });
    }
  }

  if (cowTerritories.length === 0) {
    for (let i in basicCowTerritories) {
      const territory = basicCowTerritories[i];
      cowTerritories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type,
        volume: territory.volume,
        improve: territory.improve,
        money: territory.money
      });
    }
  }

  this.state.sheepTerritories = sheepTerritories;
  this.state.chickenTerritories = chickenTerritories;
  this.state.cowTerritories = cowTerritories;

  // яйца
  const chickenEggs: IchickenEgg[] = [];
  for (let i in response.data.user.chicken_eggs) {
    const egg = response.data.user.chicken_eggs[i];
    chickenEggs.push({
      _id: egg._id,
      x: egg.x > 0 && egg.x < 720 ? egg.x : Phaser.Math.Between(500, 700),
      y: egg.y > 480 && egg.y < 2160 ? egg.y : Phaser.Math.Between(500, 700),
      type: egg.type
    });
  }
  this.state.chickenEggs = chickenEggs;

  const user: Iuser = {
    diamonds: response.data.user.diamonds,
    id: response.data.user._id,
    xp: response.data.user.xp,
    hash: response.data.user.hash,
    login: response.data.user.login,
    counter: response.data.user.counter,
    mail: response.data.user.mail,
    level: response.data.user.level,
    additionalTutorial: response.data.user.additional_tutorial,
    takenReward: response.data.user.taken_reward,
    status: response.data.user.status,
    statuses: response.data.user.statuses,
    starterpack: response.data.user.starterpack,
    boosts: response.data.user.boosts,          
  };
  this.state.user = user;

  if (response.data.user.chicken_part === 0 && this.state.farm === 'Chicken') response.data.user.chicken_part = 1;
  if (response.data.user.cow_part === 0 && this.state.farm === 'Cow') response.data.user.cow_part = 1;

  const userSheep: IuserSheep = {
    money: response.data.user.money,
    fair: response.data.user.sheep_fair,
    part: response.data.user.sheep_part,
    countSheep: response.data.user.count_sheep,
    collector: response.data.user.shaver_time,
    collectorLevel: response.data.user.sheepCollectorLevel,
    collectorTakenTime: response.data.user.shaver_time,
    diamondAnimalTime: response.data.user.diamonds_sheep_time,
    tutorial: response.data.user.tutor,
    autosaveCounter: response.data.user.sheepSaveCounter,
    diamondAnimalAd: response.data.user.diamonds_sheep_ad,
    takenHerdBoost: response.data.user.takenHerdBoostSheep,
    feedBoostTime: response.data.user.feedBoostTimeSheep,
  }

  const userChicken: IuserChicken = {
    money: response.data.user.chicken_money,
    fair: response.data.user.chicken_fair,
    part: response.data.user.chicken_part,
    countChicken: response.data.user.count_chicken,
    collector: response.data.user.chicken_collector,
    collectorLevel: response.data.user.chickenCollectorLevel,
    collectorTakenTime: response.data.user.chicken_collector,
    diamondAnimalTime: response.data.user.diamonds_chicken_time,
    tutorial: response.data.user.chicken_tutor,
    autosaveCounter: response.data.user.chickenSaveCounter,
    diamondAnimalAd: response.data.user.diamonds_chicken_ad,
    takenHerdBoost: response.data.user.takenHerdBoostChicken,
    feedBoostTime: response.data.user.feedBoostTimeChicken,
  }

  const userCow: IuserCow = {
    money: response.data.user.cow_money,
    fair: response.data.user.cow_fair,
    part: response.data.user.cow_part,
    countCow: response.data.user.count_cow,
    collector: response.data.user.cow_collector,
    collectorLevel: response.data.user.cowCollectorLevel,
    collectorTakenTime: response.data.user.cow_collector,
    diamondAnimalTime: response.data.user.diamonds_cow_time,
    tutorial: response.data.user.cow_tutor,
    autosaveCounter: response.data.user.cowSaveCounter,
    diamondAnimalAd: response.data.user.diamonds_cow_ad,
    takenHerdBoost: response.data.user.takenHerdBoostCow,
    feedBoostTime: response.data.user.feedBoostTimeCow,
    factoryBoostTime: 0,
  }

  this.state.userSheep = userSheep;
  this.state.userChicken = userChicken;
  this.state.userCow = userCow;

  const sheepTasks: Itasks[] = [];
  for (let i in tasks) if (tasks[i].farm === 1) sheepTasks.push(tasks[i]);
  for (let i in response.data.user.sheep_tasks) {
    const usersTask = response.data.user.sheep_tasks[i];
    const task = tasks.find((task: Itasks) => task.id === usersTask.task_id);
    if (task) {
      task.done = usersTask.done;
      task.got_awarded = usersTask.got_awarded;
      task.progress = usersTask.progress;
    }
  }

  const chickenTasks: Itasks[] = [];
  for (let i in tasks) if (tasks[i].farm === 2) chickenTasks.push(tasks[i]);
  for (let i in response.data.user.chicken_tasks) {
    const usersTask = response.data.user.chicken_tasks[i];
    const task = tasks.find((task: Itasks) => task.id === usersTask.task_id);
    if (task) {
      task.done = usersTask.done;
      task.got_awarded = usersTask.got_awarded;
      task.progress = usersTask.progress;
    }
  }

  const cowTasks: Itasks[] = [];
  for (let i in tasks) if (tasks[i].farm === 2) cowTasks.push(tasks[i]);
  for (let i in response.data.user.cow_tasks) {
    const usersTask = response.data.user.cow_tasks[i];
    const task = tasks.find((task: Itasks) => task.id === usersTask.task_id);
    if (task) {
      task.done = usersTask.done;
      task.got_awarded = usersTask.got_awarded;
      task.progress = usersTask.progress;
    }
  }

  this.state.sheepTasks = sheepTasks;
  this.state.chickenTasks = chickenTasks;
  this.state.cowTasks = cowTasks;

  this.state.sheepCollectorSettings = response.data.settings.sheep.collectorSettings;
  this.state.chickenCollectorSettings = response.data.settings.chicken.collectorSettings;
  this.state.cowCollectorSettings = response.data.settings.cow.collectorSettings;
  const progress: Iprogress = {
    sheep: {
      part: response.data.user.sheep_part,
      max: response.data.settings.sheep.parts.length,
      open: true,
      price: response.data.settings.farms[0].price,
      unlock: response.data.settings.farms[0].open,
      donate: response.data.settings.farms[0].donate,
      collector: response.data.user.shaver_time,
      offlineTime: response.data.progress.sheepOfflineTime,
    },
    chicken: {
      part: response.data.user.chicken_part,
      max: response.data.settings.chicken.parts.length,
      open: response.data.user.chicken_part > 0,
      price: response.data.settings.farms[1].price,
      unlock: response.data.settings.farms[1].open,
      donate: response.data.settings.farms[1].donate,
      collector: response.data.user.chicken_collector,
      offlineTime: response.data.progress.chickenOfflineTime,
    },
    cow: {
      part: response.data.user.cow_part,
      max: response.data.settings.cow.parts.length,
      open: response.data.user.cow_part > 0,
      price: response.data.settings.farms[2].price,
      unlock: response.data.settings.farms[2].open,
      donate: response.data.settings.farms[2].donate,
      collector: response.data.user.cow_collector,
      offlineTime: response.data.progress.cowOfflineTime,
    },
    event: {
      eventPoints: response.data.user.eventPoints,
      startTime: response.data.progress.event.startTime,
      endTime: response.data.progress.event.endTime,
      open: response.data.settings.event.open,
      type: response.data.settings.event.type,
    }
  }
  this.state.progress = progress;

  if (
    this.state.progress.event.type === 1 
    && this.state.progress.event.startTime < 0 
    && this.state.progress.endTime > 0 
    && this.state.progress.event.open
  ) {

    this.state.unicornSettings = unicornSettings;

    const eventAnimals: IeventAnimal[] = []; // IeventAnimal
    for (let i in response.data.event.animals) {
      let animal = response.data.event.animals[i];
      eventAnimals.push({
        _id: animal._id,
        type: animal.type,
        activeAnimal: animal.activeAnimal,
        x: animal.x,
        y: animal.y,
      });
    }

    const eventTerritories: IeventTerritories[] = [];
    for (let i in response.data.event.territories) {
      let territory = response.data.event.territories[i];
      eventTerritories.push({
        _id: territory._id,
        block: territory.block,
        position: territory.position,
        type: territory.type
      });
    }

    const eventResources: IeventResource[] = []; // IeventResource
    for (let i in response.data.event.resources) {
      let eventResource = response.data.event.resources[i];
      eventResources.push({
        _id: eventResource._id,
        x: eventResource.x,
        y: eventResource.y,
        type: eventResource.type
      });
    }

    const countAnimal = response.data.event.countAnimal;
    if (countAnimal.length < this.state.unicornSettings.unicornSettings.length) {
      let addCounter: number = this.state.unicornSettings.unicornSettings.length - countAnimal.length;
      for (let i = 0; i < addCounter; i++) {
        countAnimal.push({ counter: 1 });
      }
    }
    const userUnicorn: IuserEvent = {  
      money: response.data.event.money,
      countAnimal: countAnimal,
      collector: response.data.event.collector,
      collectorLevel: response.data.event.collectorLevel,
      collectorTakenTime: response.data.event.collector,
      tutorial: response.data.event.tutorial,
      autosaveCounter: response.data.event.autosaveCounter,
      takenHerdBoost: response.data.event.takenHerdBoost,
      feedBoostTime: response.data.event.feedBoostTime,
      maxLevelAnimal: response.data.user.eventPoints,
      herdBoostAnimals: response.data.event.herdBoostAnimals,
      takenAd: response.data.event.takenAd,
      timeToAd: response.data.event.timeToAd,
    };

    this.state.eventTerritories = eventTerritories;
    this.state.eventAnimals = eventAnimals;
    this.state.eventResources = eventResources; 
    this.state.userUnicorn = userUnicorn;
    this.state.eventCollectorSettings = basicUnicornCollector;
  }
}

export {
  random,
  getRandomBool,
  randomString,
  shortNum,
  timer,
  shortTime,
  payRobokassa,
  payOdnoklassniki,
  payVK,
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
  buyNextFarm,
  getNewbieAward,
  takeDonate,
  debug,
  loadingScreen,
  spreadAnimals,
  getEventRaiting,
  getStatusSettings,
  nextDayTimer,
  intervalPorgressCollectorTime,
  autoporgressCollectorTime,
  loadingModal,
  remainderSellResource,
  createTaskZone,
  logAmplitudeEvent,
  logAmplitudeRevenue,
  loadData
}
