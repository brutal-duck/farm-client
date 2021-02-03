import axios from 'axios';
import { FAPI } from '../libs/Fapi.js';
import bridge from '@vkontakte/vk-bridge';
import * as amplitude from 'amplitude-js';
import state from './../state';
import { Arrows } from '../elements';

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


// функция нажатия на кнопку со скейлом
function clickButton(button: any, action: any): void {

  button.setInteractive();

  button.on('pointerdown', (): void => {

    this.game.scene.keys[this.state.farm].scrolling.enabled = false;
    this.game.scene.keys[this.state.farm].scrolling.downHandler();

    button.press = true;
    button.increase = false;
    let counter: number = 0;
    let interval = this.time.addEvent({ delay: 5, callback: () => {

      if (button.scale > 0.8 && !button.increase) {
        let scale: number = button.scale - 0.1;
        button.scale = Number(scale.toFixed(2));
      }
      
      counter++;

      if (counter >= 2) interval.remove(false);

    }, callbackScope: this, loop: true });

  });

  button.on('pointerout', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        if (button.scale < 1 && button.increase) {
          let scale: number = button.scale + 0.05;
          button.scale = Number(scale.toFixed(2));
        }

        if (button.scale >= 1) interval.remove(false);

      }, callbackScope: this, loop: true });

    }

  });

  button.on('pointerup', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let interval = this.time.addEvent({ delay: 10, callback: () => {
  
        if (button.scale < 1 && button.increase) {
          let scale: number = button.scale + 0.05;
          button.scale = Number(scale.toFixed(2));
        }
  
        if (button.scale >= 1) interval.remove(false);
  
      }, callbackScope: this, loop: true });

      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      action();

    } else {
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    }

  });
  
}


// функция нажатия
function click(object: any, action: any, maxMoveCounter: number = 3): void {

  object.setInteractive();
  let moveCounter: number = 0;

  object.on('pointerdown', (): void => {
    object.xDown = object.x;
    object.yDown = object.y;
    object.press = true;
  });

  object.on('pointermove', (): void => {
    if (object.press) moveCounter++;
  });

  object.on('pointerout', (): void => {
    
    if (object.press) {
      moveCounter = 0;
      object.press = false;
    }

  });

  object.on('pointerup', (): void => {

    let x: number;
    let y: number;

    if (object.xDown >= object.x) x = object.xDown - object.x;
    else x = object.x - object.xDown;

    if (object.yDown >= object.y) y = object.yDown - object.y;
    else y = object.y - object.yDown;
    
    if (object.press && moveCounter < maxMoveCounter && x < 5 && y < 5) {
      object.press = false;
      action();
    } else if (object.press) {
      object.press = false;
    }

    moveCounter = 0;

  });
  
}


// функция нажатия на кнопку с затемнением
function clickModalBtn(arr: any, action: any) {

  let button = arr.btn;
  let title = arr.title;
  let text1 = arr.text1;
  let text2 = arr.text2;
  let img1 = arr.img1;
  let img2 = arr.img2;

  button.setInteractive();

  button.on('pointerdown', (): void => {

    this.game.scene.keys[this.state.farm].scrolling.enabled = false;
    this.game.scene.keys[this.state.farm].scrolling.downHandler();

    button.press = true;
    button.increase = false;
    let counter: number = 0;
    let filter: number = 0xFFFFFF;
    let interval = this.time.addEvent({ delay: 5, callback: () => {

      filter -= 0x222222;
      button.setTint(filter);
      title.setTint(filter);
      button.y = Math.round(button.y + 1);
      title.y = Math.round(title.y + 1);

      if (text1 !== undefined) {
        text1.setTint(filter);
        text1.y = Math.round(text1.y + 1);
      }

      if (text2 !== undefined) {
        text2.setTint(filter);
        text2.y = Math.round(text2.y + 1);
      }

      if (img1 !== undefined) {
        img1.setTint(filter);
        img1.y = Math.round(img1.y + 1);
      }

      if (img2 !== undefined) {
        img2.setTint(filter);
        img2.y = Math.round(img2.y + 1);
      }

      counter++;

      if (counter >= 3) interval.remove(false);

    }, callbackScope: this, loop: true });

  });

  button.on('pointerout', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;

      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        title.setTint(filter);
        button.y = Math.round(button.y - 1);
        title.y = Math.round(title.y - 1);

        if (text1 !== undefined) {
          text1.setTint(filter);
          text1.y = Math.round(text1.y - 1);
        }

        if (text2 !== undefined) {
          text2.setTint(filter);
          text2.y = Math.round(text2.y - 1);
        }

        if (img1 !== undefined) {
          img1.setTint(filter);
          img1.y = Math.round(img1.y - 1);
        }

        if (img2 !== undefined) {
          img2.setTint(filter);
          img2.y = Math.round(img2.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);

      }, callbackScope: this, loop: true });

    }

  });

  button.on('pointerup', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        title.setTint(filter);
        button.y = Math.round(button.y - 1);
        title.y = Math.round(title.y - 1);

        if (text1 !== undefined) {
          text1.setTint(filter);
          text1.y = Math.round(text1.y - 1);
        }

        if (text2 !== undefined) {
          text2.setTint(filter);
          text2.y = Math.round(text2.y - 1);
        }

        if (img1 !== undefined) {
          img1.setTint(filter);
          img1.y = Math.round(img1.y - 1);
        }

        if (img2 !== undefined) {
          img2.setTint(filter);
          img2.y = Math.round(img2.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);
  
      }, callbackScope: this, loop: true });

      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      action();

    } else {
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    }

  });

}


// сокращенные числа
function shortNum(num: number | string): number | string {

  let num1: number | string;
  let num2: number | string;

  if (num > 9999 && num < 1000000) {
    num1 = String(num).slice(-3, -2);
    num2 = String(num).slice(0, -3);
    num = num2 + "." + num1 + "k";
  } else if (num >= 1000000 && num < 1000000000) {
    num1 = String(num).slice(-6, -5);
    num2 = String(num).slice(0, -6);
    num = num2 + "." + num1 + "m";
  } else if (num >= 1000000000 && num < 1000000000000) {
    num1 = String(num).slice(-9, -8);
    num2 = String(num).slice(0, -9);
    num = num2 + "." + num1 + "b";
  } else if (num >= 1000000000000) {
    num1 = String(num).slice(-12, -11);
    num2 = String(num).slice(0, -12);
    num = num2 + "." + num1 + "t";
  }

  return num;

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


// нажатие на табы
function clickButtonUp(button: any, action: any, icon: any = false): void {

  button.setInteractive();
  button.up = 0;

  button.on('pointerdown', (): void => {

    this.game.scene.keys[this.state.farm].scrolling.enabled = false;
    this.game.scene.keys[this.state.farm].scrolling.downHandler();

    button.press = true;
    button.increase = false;
    let interval = this.time.addEvent({ delay: 5, callback: () => {

      if (button.up < 7 && !button.increase) {
        button.up++;
        button.y++;
        if (icon) icon.y++;
      }
      
      if (button.up >= 7) interval.remove(false);

    }, callbackScope: this, loop: true });

  });

  button.on('pointerout', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        if (button.up > 0 && button.increase) {
          button.up--;
          button.y--;
          if (icon) icon.y--;
        }

        if (button.up <= 0) interval.remove(false);

      }, callbackScope: this, loop: true });

    }

  });

  button.on('pointerup', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let interval = this.time.addEvent({ delay: 10, callback: () => {
  
        if (button.up > 0 && button.increase) {
          button.up--;
          button.y--;
          if (icon) icon.y--;
        }

        if (button.up <= 0) interval.remove(false);
  
      }, callbackScope: this, loop: true });

      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      action();

    } else {
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    }

  });
  
}


// нажатие на кнопку в окне магазина
function clickShopBtn(btn: any, action: any) {

  let button = btn.btn;
  let title = btn.title;
  let img = btn.img;

  button.setInteractive();

  button.on('pointerdown', (): void => {

    this.game.scene.keys[this.state.farm].scrolling.enabled = false;
    this.game.scene.keys[this.state.farm].scrolling.downHandler();

    button.press = true;
    button.increase = false;
    let counter: number = 0;
    let filter: number = 0xFFFFFF;
    let interval = this.time.addEvent({ delay: 5, callback: () => {

      filter -= 0x222222;
      button.setTint(filter);
      title.setTint(filter);
      button.y = Math.round(button.y + 1);
      title.y = Math.round(title.y + 1);

      if (img) {
        img.setTint(filter);
        img.y = Math.round(img.y + 1);
      }

      counter++;

      if (counter >= 3) interval.remove(false);

    }, callbackScope: this, loop: true });

  });

  button.on('pointerout', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;

      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        title.setTint(filter);
        button.y = Math.round(button.y - 1);
        title.y = Math.round(title.y - 1);

        if (img) {
          img.setTint(filter);
          img.y = Math.round(img.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);

      }, callbackScope: this, loop: true });

    }

  });

  button.on('pointerup', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        title.setTint(filter);
        button.y = Math.round(button.y - 1);
        title.y = Math.round(title.y - 1);

        if (img) {
          img.setTint(filter);
          img.y = Math.round(img.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);
  
      }, callbackScope: this, loop: true });

      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      action();

    } else {
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    }

  });

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


// нажатие на кнопку в окне магазина
function clickBoostBtn(btn: any, action: any) {

  let button = btn.btn;
  let left = btn.left;
  let leftLitle = btn.leftLitle;
  let right = btn.right;
  let img = btn.icon;

  button.setInteractive();

  button.on('pointerdown', (): void => {

    this.game.scene.keys[this.state.farm].scrolling.enabled = false;
    this.game.scene.keys[this.state.farm].scrolling.downHandler();

    button.press = true;
    button.increase = false;
    let counter: number = 0;
    let filter: number = 0xFFFFFF;
    let interval = this.time.addEvent({ delay: 5, callback: () => {

      filter -= 0x222222;
      button.setTint(filter);
      left.setTint(filter);
      leftLitle.setTint(filter);
      right.setTint(filter);
      button.y = Math.round(button.y + 1);
      left.y = Math.round(left.y + 1);
      leftLitle.y = Math.round(leftLitle.y + 1);
      right.y = Math.round(right.y + 1);

      if (img) {
        img.setTint(filter);
        img.y = Math.round(img.y + 1);
      }

      counter++;

      if (counter >= 3) interval.remove(false);

    }, callbackScope: this, loop: true });

  });

  button.on('pointerout', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;

      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        left.setTint(filter);
        leftLitle.setTint(filter);
        right.setTint(filter);
        button.y = Math.round(button.y - 1);
        left.y = Math.round(left.y - 1);
        leftLitle.y = Math.round(leftLitle.y - 1);
        right.y = Math.round(right.y - 1);

        if (img) {
          img.setTint(filter);
          img.y = Math.round(img.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);

      }, callbackScope: this, loop: true });

    }

  });

  button.on('pointerup', (): void => {

    if (button.press) {

      button.press = false;
      button.increase = true;
      let counter: number = 0;
      let filter: number = 0x999999;
      let interval = this.time.addEvent({ delay: 10, callback: () => {

        filter += 0x222222;
        button.setTint(filter);
        left.setTint(filter);
        leftLitle.setTint(filter);
        right.setTint(filter);
        button.y = Math.round(button.y - 1);
        left.y = Math.round(left.y - 1);
        leftLitle.y = Math.round(leftLitle.y - 1);
        right.y = Math.round(right.y - 1);

        if (img) {
          img.setTint(filter);
          img.y = Math.round(img.y - 1);
        }

        counter++;

        if (counter >= 3) interval.remove(false);
  
      }, callbackScope: this, loop: true });

      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      action();

    } else {
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    }

  });

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


// нажатие на территорию
function clickTerritory(object: any, action: any): void {

  object.setInteractive();
  let moveCounter: number = 0;

  object.on('pointerdown', (): void => {
    object.press = true;
  });

  object.on('pointermove', (): void => {
    if (object.press) moveCounter++
  });

  object.on('pointerout', (): void => {
    
    if (object.press) {

      moveCounter = 0;
      object.press = false;
      
    }

  });

  object.on('pointerup', (): void => {

    if (object.press && moveCounter < 5) {

      object.press = false;
      action();
      
    } else if (object.press) object.press = false;

    moveCounter = 0;

  });
  
}


// функция завершения сессии
function logout(): void {
  
  if (this.scene.isActive('Modal')) this.scene.stop('Modal');
  if (this.scene.isActive('Block')) this.scene.stop('Block');
  if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
  if (this.scene.isActive('MapBars')) this.scene.stop('MapBars');
  if (this.scene.isActive('Map')) this.scene.stop('Map');
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

  let fairLevels: any;
  let fair: number;
  
  if (this.state.farm === 'Sheep') {

    fairLevels = this.state.sheepSettings.sheepFairLevels;
    fair = this.state.userSheep.fair;

  } else if (this.state.farm === 'Chicken') {

    fairLevels = this.state.chickenSettings.chickenFairLevels;
    fair = this.state.userChicken.fair;

  }

  let exchange: number = fairLevels.find((item: IfairLevel) => item.level === fair).exchange;
  return exchange *= diamonds;

}


function convertMoney(money: number): number {

  let fairLevels: IfairLevel[];
  let fair: number;
  
  if (this.state.farm === 'Sheep') {

    fairLevels = this.state.sheepSettings.sheepFairLevels;
    fair = this.state.userSheep.fair;

  } else if (this.state.farm === 'Chicken') {

    fairLevels = this.state.chickenSettings.chickenFairLevels;
    fair = this.state.userChicken.fair;

  }

  let exchange: number = fairLevels.find((item: IfairLevel) => item.level === fair).exchange;
  let needDiamonds: number = 1;
  let sumExchange: number = exchange;

  while (sumExchange < money) {
    needDiamonds++;
    sumExchange = sumExchange + exchange;
  }

  return needDiamonds;

}


// обмен и дальнейшая функция
function exchange(ad: boolean = false): void {

  let user: IuserSheep | IuserChicken;
  let buyAnimal: any;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    buyAnimal = (): void => this.buySheep(this.state.convertor.breed);

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    buyAnimal = (): void => this.buyChicken(this.state.convertor.breed);

  }
  
  if (this.state.convertor.diamonds > this.state.user.diamonds) {

    let countResources = this.state.convertor.diamonds - this.state.user.diamonds;

    this.time.addEvent({ delay: 100, callback: (): void => {

      this.state.convertor.type = 2;
      this.state.convertor.count = countResources;

      let modal: Imodal = {
        type: 1,
        sysType: 4
      }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
      
    }, callbackScope: this, loop: false });

  } else {

    this.state.user.diamonds -= this.state.convertor.diamonds;
    user.money += this.convertDiamonds(this.state.convertor.diamonds);

    if (!ad) {

      this.state.amplitude.getInstance().logEvent('diamonds_spent', {
        type: 'convertor',
        count: this.state.convertor.diamonds,
        farm_id: this.state.farm
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


// бесплатный собиратель
function freeCollector(type: number = 1): void {

  let user: IuserSheep | IuserChicken;
  let settings: IcollectorSettings[];
  let doubledСollectorPrice: number;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    settings = this.state.sheepCollectorSettings;
    doubledСollectorPrice = this.state.sheepSettings.doubledСollectorPrice;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    settings = this.state.chickenCollectorSettings;
    doubledСollectorPrice = this.state.chickenSettings.doubledСollectorPrice;

  }

  this.scrolling.wheel = true;
  this.scene.stop('Shop');
  this.scene.stop('ShopBars');
  this.scene.stop('Modal');

  if (user.collector === 0) {

    let minutes: number = settings.find((data: IcollectorSettings) => data.level === user.collectorLevel).time;

    if (type === 1) {

      let collector: number = minutes * 60;
      user.collector += collector;
      user.collectorTakenTime = user.collector;
      this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
      this.tryTask(3, 0, minutes);
  
      if (user.tutorial === 90 && this.state.farm === 'Sheep') {
        this.doneTutor_90();
      }
  
      this.state.amplitude.getInstance().logEvent('collector', {
        type: 'free',
        farm_id: this.state.farm
      });

    } else {
      
      minutes *= 2;
      let doubleTimePrice: number = Math.floor(minutes / 60 * doubledСollectorPrice);

      if (this.state.user.diamonds >= doubleTimePrice) {

        this.state.user.diamonds -= doubleTimePrice;
        user.collector += minutes * 60;
        user.collectorTakenTime = user.collector;
        this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
        this.tryTask(3, 0, minutes);
        this.tryTask(15, 0, doubleTimePrice);
  
        this.state.amplitude.getInstance().logEvent('collector', {
          type: minutes + ' minutes',
          price: 'hard',
          farm_id: this.state.farm
        });
  
        this.state.amplitude.getInstance().logEvent('diamonds_spent', {
          type: 'collector',
          count: doubleTimePrice,
          farm_id: this.state.farm
        });

      } else {

        let count: number = doubleTimePrice - this.state.user.diamonds;
        this.state.convertor = {
          fun: 0,
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

    }

  }

}


// покупка собирателя
function buyCollector(type: number): void {

  let user: IuserSheep | IuserChicken;
  let settings: IsheepSettings | IchickenSettings;

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    settings = this.state.sheepSettings;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    settings = this.state.chickenSettings;

  }

  let hours: number;

  if (type === 3) hours = 4;
  else if (type === 4) hours = 12;

  this.scrolling.wheel = true;
  this.scene.stop('Shop');
  this.scene.stop('ShopBars');
  this.scene.stop('Modal');

  if (settings['unlockCollector' + hours] <= user.part) {
    
    if (this.state.user.diamonds >= settings['collectorPrice' + hours]) {

      this.state.user.diamonds -= settings['collectorPrice' + hours];
      user.collector += hours * 60 * 60;
      user.collectorTakenTime = user.collector;
      this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
      this.tryTask(3, 0, hours * 60);
      this.tryTask(15, 0, settings['collectorPrice' + hours]);

      this.state.amplitude.getInstance().logEvent('collector', {
        type: hours + ' hours',
        price: 'hard',
        farm_id: this.state.farm
      });

      this.state.amplitude.getInstance().logEvent('diamonds_spent', {
        type: 'collector',
        count: settings['collectorPrice' + hours],
        farm_id: this.state.farm
      });

    } else {

      let count: number = settings['collectorPrice' + hours] - this.state.user.diamonds;
      this.state.convertor = {
        fun: 0,
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
    
  }
  
}


// завершение главы
function donePart(): void {

  let user: IuserSheep | IuserChicken;
  let parts: Ipart[];

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    parts = this.state.sheepSettings.sheepParts;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    parts = this.state.chickenSettings.chickenParts;

  }

  let award: number = parts.find((data: Ipart) => data.sort === user.part).award;

  this.state.user.diamonds += award;

  this.state.amplitude.getInstance().logEvent('diamonds_get', {
    type: 'part_award',
    farm_id: this.state.farm,
    count: award
  });
  
  this.scrolling.scrollY = 0;
  user.part++;
  this.state.progress[this.state.farm.toLowerCase()].part = user.part;
  
  this.deleteTerritoriesLocks();
  this.game.scene.keys[this.state.farm + 'Bars'].taskBoard.update();
  this.game.scene.keys[this.state.farm + 'Bars'].currentPartProgress();

  this.state.amplitude.getInstance().logEvent('chapter_done', {
    farm_id: this.state.farm,
    chapter: user.part - 1
  });

  this.time.addEvent({ delay: 500, callback: (): void => {

    this.house.setTexture(this.state.farm.toLowerCase() + '-house-' + user.part);
    let house: Phaser.GameObjects.Sprite = this.territories.children.entries.find((data: any) => data.type === 6);
    this.firework250(house.x + 120, house.y + 120);
    this.checkDoneTasks();

  }, callbackScope: this, loop: false });

  this.time.addEvent({ delay: 1500, callback: (): void => {

    if (!this.scene.isActive('Modal') &&
      !this.scene.isActive('Block') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Map')) this.showTasks();
      
  }, callbackScope: this, loop: false });

}


// забрать награду за задание
function pickUpTaskReward(id: number): void {

  let tasks: Itasks[] = [];

  if (this.state.farm === 'Sheep') tasks = this.state.sheepTasks;
  else if (this.state.farm === 'Chicken') tasks = this.state.chickenTasks;

  let task: Itasks = tasks.find((data: Itasks) => data.id === id);

  if (task?.done === 1 && task?.got_awarded === 0) {

    this.state.user.xp += task.xp;
    this.state.user.diamonds += task.diamonds;
    task.got_awarded = 1;
    this.game.scene.keys[this.state.farm + 'Bars'].taskBoard.update();

    if (this.scene.isActive('Modal')) {

      this.scene.stop('Modal');
      this.showTasks();

    }

    console.log('анимация за сбор награды за задание задания');

  }

}


// таймер кристаллической пещеры
function caveTimer(): void {

  let user: IuserSheep | IuserChicken;

  if (this.state.farm === 'Sheep') user = this.state.userSheep;
  else if (this.state.farm === 'Chicken') user = this.state.userChicken;

  if (user.diamondAnimalTime > 0) {

    user.diamondAnimalTime--;

    let caveTerritory = this.territories.children.entries.find((data: any) => data.type === 7);

    if (!caveTerritory.timerBg.visible) {
      caveTerritory.timerBg.setVisible(true);
    }

    if (!caveTerritory.timer.visible) {
      caveTerritory.timer.setVisible(true);
    }

    if (caveTerritory.cave.texture.key !== 'cave-wait') {
      caveTerritory.cave.setTexture('cave-wait');
    }

    let time: string = timer(user.diamondAnimalTime);

    caveTerritory.timer.setText(time);

    if (this.scene.isActive('Modal') && this.state.modal?.type === 1 && this.state.modal?.sysType === 9) {
      this.game.scene.keys['Modal'].caveTimer.setText(this.state.lang.summonTime + time);
    }

    if (user.diamondAnimalTime === 0) {
      user.diamondAnimalAd = true;
      caveTerritory.timer.setVisible(false);
      caveTerritory.timerBg.setVisible(false);
    }

  }

}


// проверка подключения к интернету
function onlineStatus(): void {

  let http_request: XMLHttpRequest = new XMLHttpRequest();

  http_request.onreadystatechange = (): void => {

    if (http_request.readyState === 4) {
      
      if (http_request.status === 200) this.state.online = true;
      else this.state.online = false;
      
    }

  }

  http_request.open('GET', 'https://ipv4.icanhazip.com', true);
  http_request.timeout = 1500;
  http_request.send('');
  
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

    let modal = document.querySelector('.modal');

    if (modal && this.scene.isActive('Block')) {
      this.scene.stop('Block');
      modal.remove();
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

  let user: IuserSheep | IuserChicken;
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

    this.state.amplitude.getInstance().logEvent('get_new_farm', {
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
      this.game.scene.keys['SheepBars'].plusMoney();
      break;

    }

    if (i === 1 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {

      this.state.dailyAwards[i] = false;
      let counter: number = 0;
      let timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        
        counter++;
        let x: number = random(270, 690);
        let y: number = random(510, 690);
        let id: string = 'local_' + randomString(18);
        this.getSheep(id, 0, x, y, 0, 500, -5);

        if (counter >= 5) timeout.remove(false);

      }, callbackScope: this, loop: true });
      break;

    }

    if (i === 2 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {

      this.state.dailyAwards[i] = false;
      let type: number = this.state.userSheep.fair + 1;
      let counter: number = 0;
      let timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        
        counter++;
        let x: number = random(270, 690);
        let y: number = random(510, 690);
        let id: string = 'local_' + randomString(18);
        this.getSheep(id, type, x, y, 0, 500);
        this.firework250(x, y);

        if (counter >= 3) timeout.remove(false);

      }, callbackScope: this, loop: true });
      break;

    }

    if (i === 3 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {

      this.state.dailyAwards[i] = false;
      if (this.scene.isActive('Modal')) this.scene.stop('Modal');
      if (this.scene.isActive('Block')) this.scene.stop('Block');
      if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
      if (this.scene.isActive('Shop')) this.scene.stop('Shop');
      if (this.scene.isActive('ShopBars')) this.scene.stop('ShopBars');
      if (this.scene.isActive('Map')) this.scene.stop('Map');
      if (this.scene.isActive('MapBars')) this.scene.stop('MapBars');
      this.scene.stop('Sheep');
      this.scene.stop('SheepBars');
      this.scene.start('ChickenPreload', this.state);

      this.state.amplitude.getInstance().logEvent('get_new_farm', {
        type: 'daily',
        farm_id: 'Chicken'
      });
      break;

    }

    if (i === 4 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {

      this.state.dailyAwards[i] = false;
      this.state.userSheep.collector += 3 * 60 * 60;
      this.state.userSheep.collectorTakenTime = this.state.userSheep.collector;
      this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
      break;

    }

    if (i === 5 && this.state.dailyAwards[i] && this.state.farm === 'Chicken') {

      let type: number = this.state.userChicken.fair + 1;
      let counter: number = 0;
      let timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        
        counter++;
        let x: number = random(270, 690);
        let y: number = random(510, 690);
        let id: string = 'local_' + randomString(18);
        this.getChicken(id, type, x, y, 0, 500);
        this.firework250(x, y);

        if (counter >= 3) timeout.remove(false);

      }, callbackScope: this, loop: true });
      this.state.dailyAwards[i] = false;
      break;

    }

    if (i === 6 && this.state.dailyAwards[i] && this.state.farm === 'Chicken') {

      this.state.dailyAwards[i] = false;
      this.state.userChicken.collector += 3 * 60 * 60;
      this.state.userChicken.collectorTakenTime = this.state.userChicken.collector;
      this.game.scene.keys[this.state.farm + 'Bars'].collector.update();
      break;

    }

    if (i === 7 && this.state.dailyAwards[i] && this.state.farm === 'Sheep') {

      let counter: number = 0;
      let timeout: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 100, callback: (): void => {
        
        counter++;
        let x: number = random(270, 690);
        let y: number = random(510, 690);
        let id: string = 'local_' + randomString(18);
        this.getSheep(id, 0, x, y, 0, 500, -5);

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
        
        let pack: Ipackage = this.state.packages.find((data: Ipackage) => data.id === res.data.package);
        this.state.user.diamonds += res.data.donate;
        let revenue: amplitude.Revenue = new amplitude.Revenue()
          .setProductId('Product #' + res.data.package)
          .setPrice(pack.price);
        this.state.amplitude.logRevenueV2(revenue);
        this.game.scene.keys[this.state.farm + 'Bars'].plusDiamonds();
        this.autosave();

      }

    }

  });

}


// улучшение собирателей
function improveCollector(): void {

  let user: IuserSheep | IuserChicken;
  let collectorSettings: IcollectorSettings[];

  if (this.state.farm === 'Sheep') {

    user = this.state.userSheep;
    collectorSettings = this.state.sheepCollectorSettings;

  } else if (this.state.farm === 'Chicken') {

    user = this.state.userChicken;
    collectorSettings = this.state.chickenCollectorSettings;

  }

  let nextLevel: IcollectorSettings = collectorSettings.find((data: IcollectorSettings) => data.level === user.collectorLevel + 1);

  if (nextLevel.diamonds) {

    if (this.state.user.diamonds >= nextLevel.price) {

      this.tryTask(15, 0, nextLevel.price);
      this.tryTask(21, nextLevel.level);

      this.state.amplitude.getInstance().logEvent('diamonds_spent', {
        type: 'improve_collector',
        count: nextLevel.price,
        farm_id: this.state.farm
      });

      this.state.user.diamonds -= nextLevel.price;
      user.collectorLevel++;
      this.setCollector();
      
      this.time.addEvent({ delay: 500, callback: (): void => {
        this.game.scene.keys[this.state.farm + 'Bars'].firework250(230, Number(this.game.config.height) - 70);
      }, callbackScope: this, loop: false });

    } else {

      this.state.convertor = {
        fun: 8,
        count: nextLevel.price - this.state.user.diamonds,
        diamonds: nextLevel.price - this.state.user.diamonds,
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

    if (user.money >= nextLevel.price) {

      this.tryTask(21, nextLevel.level);
      user.money -= nextLevel.price;
      user.collectorLevel++;
      this.setCollector();

      this.time.addEvent({ delay: 500, callback: (): void => {
        this.game.scene.keys[this.state.farm + 'Bars'].firework250(230, Number(this.game.config.height) - 70);
      }, callbackScope: this, loop: false });

    } else {

      let count: number = nextLevel.price - user.money;
      let diamonds: number = this.convertMoney(count);
      this.state.convertor = {
        fun: 8,
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
  
}


function debug(): void {

  let user: IuserSheep | IuserChicken;

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
      this.game.scene.keys[this.state.farm + 'Bars'].taskBoard.update();
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

// получение животного по бусту
function createBoostAnimal(): void {
  if (!this.state.herdBoostAnimals) return;
  this.state.herdBoostAnimals.forEach(type => {
    if (this.state.farm === 'Sheep') {
      this.time.addEvent({ 
        delay: 100, 
        callback: (): void => {
          let x: number = random(270, 690);
          let y: number = random(510, 690);
          let id: string = 'local_' + randomString(18);
          this.getSheep(id, type, x, y, 0, 500);
          this.firework250(x, y);
        }, 
        callbackScope: this, 
        loop: false 
      });
    } else if (this.state.farm === 'Chicken') {
      
      this.time.addEvent({
        delay: 100, callback: (): void => {
          let x: number = random(270, 690);
          let y: number = random(510, 690);
          let id: string = 'local_' + randomString(18);
          this.getChicken(id, type, x, y, 0, 500);
          this.firework250(x, y);
        }, 
        callbackScope: this, 
        loop: false 
      });
    }
  });
  this.state.herdBoostAnimals = [];
}

function updateNativeShop(): void {
  let counter: number = 0;
  for (let i = 0; i < this.state.nativeCounter.length; i++) {
    counter += this.state.nativeCounter[i];
  }
  
  if ((this.scene.isActive('Modal') ||
  this.scene.isActive('Block') ||
  this.scene.isActive('Tutorial') ||
  (this.state[`user${this.state.farm}`].part < this.game.scene.keys[this.state.farm].herdBoostLvl) ||
  this.state[`user${this.state.farm}`].takenHerdBoost > 0
  || !this.state.user.additionalTutorial.herdBoost) &&
  this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.visible ||
  counter <= 0) {
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.setVisible(false);
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShopCounter.setVisible(false);
  } else if (!this.scene.isActive('Modal') &&
  !this.scene.isActive('Block') &&
  !this.scene.isActive('Tutorial') &&
  this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
  !this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.visible &&
  this.state[`user${this.state.farm}`].takenHerdBoost <= 0 &&
  counter > 0 &&
  this.state.user.additionalTutorial.herdBoost) {
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShop.setVisible(true);
    this.game.scene.keys[`${this.state.farm}Bars`].nativeShopCounter.setVisible(true);
  }
}

function updateHerdBoostBtn(): void {
  if (this.state.modal.shopType === 4 && 
    this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
    this.state.user.additionalTutorial.herdBoost) {
    let xBtn: number =  330;
    let yBtn: number = 520 + this.height;
    this.herdBoostTimerText.setText(this.state.lang.stillForBoost + ' ' + shortTime(this.state.timeToHerdBoost, this.state.lang));
    if (this.state[`user${this.state.farm}`].takenHerdBoost <= 0 && !this.herdBoostBtn.data.values.updated) { 
      this.herdBoostBtn.data.values.updated = true;
      // если не взят буст
      this.herdBoostBtnLeftText.setText(this.state.lang.pickUp); 
      this.herdBoostDiamondBtn.setVisible(false);
      this.herdBoostBtn.setY(yBtn - 23);
      this.herdBoostBtnLeftText.setY(yBtn - 25);
      this.herdBoostBtnLeftText.setX(xBtn);
      this.herdBoostBtnLeftText.setOrigin(0.5, 0.5);
      this.herdBoostBtnRightText.setVisible(false);
      this.herdBoostTimerText.setVisible(false);
    } 
  }
}

function collectorBoost(): void {
  // собиратель шерсти
  let resource: string;
  if (this.state.farm === 'Sheep') resource = 'wool';
  if (this.state.farm === 'Chicken') resource = 'egg';
  this.add.sprite(0, 20 + this.height, 'boost-bg').setOrigin(0, 0);
  this.add.text(225, 40 + this.height, this.state.lang[`${resource}Collector`], {
    font: '28px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
  let collectorSprite: Phaser.GameObjects.Sprite = this.add.sprite(40, 65 + this.height, `shop-${this.state.farm.toLowerCase()}-${resource}-collector`).setOrigin(0, 0);
  let levelBg: Phaser.GameObjects.Sprite = this.add.sprite(10, 55 + this.height, 'level-bg').setOrigin(0, 0);
  
  let level: string = String(this.state[`user${this.state.farm}`].collectorLevel);
  if (this.state[`user${this.state.farm}`].collectorLevel === this.state[`${this.state.farm.toLowerCase()}CollectorSettings`].length) level = 'Max';

  let userLevel: Phaser.GameObjects.Text = this.add.text(52, 90 + this.height, level, {
    font: '26px Bip',
    color: '#F8DF86'
  }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);
  let levelText: Phaser.GameObjects.Text = this.add.text(52, 110 + this.height, this.state.lang.shortLevel, {
    font: '18px Bip',
    color: '#F8DF86'
  }).setOrigin(0.5, 0.5).setStroke('#B66B06', 2);

  let freeTime: number = this.state[`${this.state.farm.toLowerCase()}CollectorSettings`].find((data: IcollectorSettings) => data.level === this.state[`user${this.state.farm}`].collectorLevel).time;

  // осталось времени
  if (this.state[`user${this.state.farm}`].collector > 0) {

    let time: string = shortTime(this.state[`user${this.state.farm}`].collector, this.state.lang);
    this.collectorTimer = this.add.text(120, 235 + this.height, this.state.lang.still + ' ' + time, {
      font: '20px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5);

  }

  // бесплатный
  if (this.state[`user${this.state.farm}`].collector === 0) {

    if (this.state[`user${this.state.farm}`].tutorial === 90) {
      this.arrows = new Arrows(this, { x: 330, y: 100 + this.height }, 100, false, true, false, false, false);
    }

    this.freeCollector = this.boostButton(350, 100 + this.height, String(freeTime), this.state.lang.shortMinutes, this.state.lang.take, 'free');
    this.clickBoostBtn(this.freeCollector, (): void => {
      this.game.scene.keys[this.state.farm].freeCollector(1);
    });

  } else {

    this.freeCollector = this.boostButton(350, 100 + this.height, String(freeTime), this.state.lang.shortMinutes, this.state.lang.take, 'free-lock');

  }

  // удвоенный собиратель
  let doubleTime: number = freeTime * 2;

  let doubleTimePrice: number = Math.floor(doubleTime / 60 * this.state[`${this.state.farm.toLowerCase()}Settings`].doubledСollectorPrice);

  if (this.state[`user${this.state.farm}`].collector === 0 && this.state[`user${this.state.farm}`].tutorial >= 100) {

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
  if (this.state[`${this.state.farm.toLowerCase()}Settings`].unlockCollector4 <= this.state[`user${this.state.farm}`].part) {

    let hours4 = this.boostButton(350, 220 + this.height, '4', this.state.lang.shortHours, String(this.state[`${this.state.farm.toLowerCase()}Settings`].collectorPrice4), 'diamond');
    this.clickBoostBtn(hours4, (): void => {
      this.game.scene.keys[this.state.farm].buyCollector(3);
    });

  } else {

    this.boostButton(350, 220 + this.height, '4', this.state.lang.shortHours, String(this.state[`${this.state.farm.toLowerCase()}Settings`].unlockCollector4), 'lock');
    
  }

  // 12 часа собирателя
  if (this.state[`${this.state.farm.toLowerCase()}Settings`].unlockCollector12 <= this.state[`user${this.state.farm}`].part) {

    let hours12 = this.boostButton(350, 280 + this.height, '12', this.state.lang.shortHours, String(this.state[`${this.state.farm.toLowerCase()}Settings`].collectorPrice12), 'diamond');
    this.clickBoostBtn(hours12, (): void => {
      this.game.scene.keys[this.state.farm].buyCollector(4);
    });

  } else {

    this.boostButton(350, 280 + this.height, '12', this.state.lang.shortHours, String(this.state[`${this.state.farm.toLowerCase()}Settings`].unlockCollector12), 'lock');
    
  }
  
  // кнопка улучшения
  if (this.state[`user${this.state.farm}`].collectorLevel < this.state[`${this.state.farm.toLowerCase()}CollectorSettings`].length && this.state[`user${this.state.farm}`].tutorial >= 100) {
    
    let improve: Phaser.GameObjects.Sprite = this.add.sprite(120, 285 + this.height, 'improve-collector');
    let improveText: Phaser.GameObjects.Text = this.add.text(120, 281 + this.height, this.state.lang.improve, {
      font: '26px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4);

    this.clickShopBtn({ btn: improve, title: improveText }, (): void => {
      this.game.scene.keys[this.state.farm].showImproveCollector();
    });

    if (this.state[`user${this.state.farm}`].collector === 0) {
      improve.y -= 15;
      improveText.y -= 15;
    }

  } else {
    
    if (this.state[`user${this.state.farm}`].collector > 0) {

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


function herdBoost(): void {

  this.add.tileSprite(0, 344 + this.height, 466, 270, 'boost-bg').setOrigin(0, 0);
  this.add.text(240, 380 + this.height, this.state.lang[`herdBoostTitle${this.state.farm}`], { 
    font: '28px Shadow',
    color: '#FFFFFF',
    wordWrap: { width: 300 },
    align: 'center'
  }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
  
  this.add.sprite(40, 420 + this.height, `${this.state.farm.toLocaleLowerCase()}-herd-boost-icon`).setOrigin(0, 0);
  this.add.sprite(0, 344 + this.height, 'flags').setOrigin(0, 0).setFlipX(true);
  this.add.sprite(466, 344 + this.height, 'flags').setOrigin(1, 0);
  // кнопка
  let xBtn: number =  330;
  let yBtn: number = 520 + this.height;
  this.herdBoostBtn = this.add.sprite(xBtn, yBtn, 'improve-collector');
  this.herdBoostBtn.setDataEnabled();
  this.herdBoostBtn.data.values.updated = false;

  this.herdBoostDiamondBtn = this.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11);
  
  this.herdBoostBtnLeftText = this.add.text(xBtn, yBtn - 5 , this.state.lang.buy, {
    font: '23px Shadow',
    color: '#FFFFFF'
  }).setOrigin(1, 0.5).setStroke('#3B5367', 4).setDepth(10);

  this.herdBoostBtnRightText = this.add.text(xBtn, yBtn - 5 , String(shortNum(this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost)), {
    font: '23px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0, 0.5).setStroke('#3B5367', 4).setDepth(10);

  
  this.herdBoostDiamondBtn.setX(this.herdBoostBtn.x + this.herdBoostBtnLeftText.width - 25 - this.herdBoostBtnRightText.width);
  this.herdBoostBtnLeftText.setX(this.herdBoostDiamondBtn.getBounds().left - 2);
  this.herdBoostBtnRightText.setX(this.herdBoostDiamondBtn.getBounds().right + 1);
  
  this.herdBoostTimerText = this.add.text(xBtn, yBtn - 60, this.state.lang.stillForBoost + ' ' + shortTime(this.state.timeToHerdBoost, this.state.lang), {
    font: '20px Shadow',
    color: '#FFFFFF',
    wordWrap: {width: 220},
    align: 'center'
  }).setOrigin(0.5, 0.5);

  this.clickModalBtn({ btn: this.herdBoostBtn, title: this.herdBoostBtnLeftText, text1: this.herdBoostBtnRightText, img1: this.herdBoostDiamondBtn }, (): void => {
    if (this.state.user.diamonds >= this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost) {
      this.state.user.diamonds -= this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost;
      this.game.scene.keys[this.state.farm].startHerdBoost();

      if (this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost > 0) {
        this.state.amplitude.getInstance().logEvent('diamonds_spent', {
          type: 'herd',
          count: this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost,
          farm_id: this.state.farm
        });
      }

      this.state.amplitude.getInstance().logEvent('booster_merge', {
        count: this.state[`user${this.state.farm}`].takenHerdBoost,
        farm_id: this.state.farm
      });
    } else {
      // вызывем конвертор
      this.state.convertor = {
        fun: 0,
        count: this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost,
        diamonds: this.state.herdBoostPrice * this.state[`user${this.state.farm}`].takenHerdBoost,
        type: 1
      }
      this.game.scene.keys[this.state.farm].exchange();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');
    }
    // проверка хватает ли денег и лишь потом запуск сцены
  });
}

function feedBoost(): void {
  this.add.tileSprite(0, 635 + this.height, 466, 270, 'boost-bg').setOrigin(0, 0);
  this.add.text(240, 655 + this.height, this.state.lang.feedBoostTitle, { 
    font: '28px Shadow',
    color: '#FFFFFF',
    wordWrap: { width: 300 },
    align: 'center'
  }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);

  this.add.text(330, 710 + this.height, this.state.lang.feedBoostSubtitle, { 
    font: '18px Shadow',
    color: '#FFFFFF',
    wordWrap: { width: 240 },
    align: 'center'
  }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2);
  
  this.add.sprite(40, 670 + this.height, `${this.state.farm.toLocaleLowerCase()}-feed-boost-icon`).setOrigin(0, 0);

  let xBtn: number =  330;
  let yBtn: number = 770 + this.height;
  let feedBoostBtn = this.add.sprite(xBtn, yBtn, 'improve-collector');

  let feedBoostDiamondBtn = this.add.sprite(xBtn, yBtn - 5, 'diamond').setVisible(true).setScale(0.11);
  
  let feedBoostBtnLeftText = this.add.text(xBtn, yBtn - 5 , this.state.lang.buy, {
    font: '23px Shadow',
    color: '#FFFFFF'
  }).setOrigin(1, 0.5).setStroke('#3B5367', 4).setDepth(10);

  let feedBoostBtnRightText = this.add.text(xBtn, yBtn - 5 , String(shortNum(this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice)), {
    font: '23px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0, 0.5).setStroke('#3B5367', 4).setDepth(10);

  
  feedBoostDiamondBtn.setX(feedBoostBtn.x + feedBoostBtnLeftText.width - 25 - feedBoostBtnRightText.width);
  feedBoostBtnLeftText.setX(feedBoostDiamondBtn.getBounds().left - 2);
  feedBoostBtnRightText.setX(feedBoostDiamondBtn.getBounds().right + 1);

  this.add.sprite(10, this.height + 870, 'pb-chapter-modal').setOrigin(0, 0.5).setScale(0.92, 1);
  this.feedProgressBar = this.add.tileSprite(25, this.height + 870, 0, 16, 'green-progress')
      .setOrigin(0, 0.5);
  
  this.feedProgressBar.setDataEnabled();
  this.feedProgressBar.data.values.maxWidth = 408;
  let progress: number = (this.state[`user${this.state.farm}`].feedBoostTime / (3600 * this.game.scene.keys[this.state.farm].feedBoostStack)) * this.feedProgressBar.data.values.maxWidth;
  this.feedProgressBar.setDisplaySize(progress, 16);
  this.feedProgressText = this.add.text(240, this.height + 840, this.state.lang.still + ' ' + shortTime(this.state[`user${this.state.farm}`].feedBoostTime, this.state.lang), {
    font: '21px Shadow',
    color: '#FFFFFF'
  }).setOrigin(0.5, 0.5);



  this.clickModalBtn({ btn: feedBoostBtn, title: feedBoostBtnLeftText, text1: feedBoostBtnRightText, img1: feedBoostDiamondBtn }, (): void => {
    this.state.user.diamonds = 1000;
    if (this.state.user.diamonds >= this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice) {
      this.state.user.diamonds -= this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice;
      if (this.state[`user${this.state.farm}`].feedBoostTime + 7200 > this.game.scene.keys[this.state.farm].feedBoostStack * 3600) {
        console.log('хватит'); // вывести окно
      } else {
        if (this.state[`user${this.state.farm}`].feedBoostTime <= 0) {
          this.state[`user${this.state.farm}`].feedBoostTime += 3600; // прибавить час
        } else {
          this.state[`user${this.state.farm}`].feedBoostTime += 7200; // прибавить 2часа
        }
      }
      
    } else {
      // вызывем конвертор
      this.state.convertor = {
        fun: 0,
        count: this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice,
        diamonds: this.state[`${this.state.farm.toLowerCase()}Settings`].feedBoostPrice,
        type: 1
      }
      this.game.scene.keys[this.state.farm].exchange();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
      this.scene.stop();
      this.scene.stop('ShopBars');
      this.scene.stop('Modal');
    }
    // проверка хватает ли денег и лишь потом запуск сцены
  });
}

function loadingScreen(farmType: string): void {

  let loading: string = this.state.lang.loading;
  let general: number = 13; // Количество общих посказок
  let sheep: number = 7; // Количество посказок для овечьей фермы
  let chicken: number = 7; // Количество посказок для куриной фермы
  let helpArr: string[] = [];

  // Создаем массив с подсказками
  for (let i: number = 0; i < general; i++) {
    helpArr.push(this.state.lang['helpGeneral_' + String(i + 1)]);
  }
  
  // Добавляем в массив подсказки в зависимости от типа фермы
  if (farmType === 'Sheep') {
    for (let i: number = 0; i < sheep; i++) {
      helpArr.push(this.state.lang['helpSheep_' + String(i + 1)]);
    }
  } else if (farmType === 'Chicken') {
    for (let i: number = 0; i < chicken; i++) {
      helpArr.push(this.state.lang['helpChicken_' + String(i + 1)]);
    }
  }

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


export {
  random,
  getRandomBool,
  randomString,
  clickButton,
  click,
  clickModalBtn,
  shortNum,
  timer,
  shortTime,
  clickButtonUp,
  clickShopBtn,
  payRobokassa,
  payOdnoklassniki,
  payVK,
  clickBoostBtn,
  romanize,
  clickTerritory,
  logout,
  convertDiamonds,
  convertMoney,
  exchange,
  freeCollector,
  buyCollector,
  donePart,
  pickUpTaskReward,
  caveTimer,
  onlineStatus,
  socialButtons,
  checkStorage,
  buyNextFarm,
  getNewbieAward,
  createBoostAnimal,
  takeDonate,
  improveCollector,
  debug,
  updateNativeShop,
  updateHerdBoostBtn,
  herdBoost,
  feedBoost,
  collectorBoost,
  loadingScreen
}
