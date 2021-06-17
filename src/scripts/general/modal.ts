import axios from 'axios';
import { romanize, shortNum } from './basic';

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
  else if (this.state.farm === 'Cow') part = this.state.userCow.part;

  let done: boolean = true;
  let tasks: Itasks[] = this.partTasks();

  for (let i in tasks) {

    if (tasks[i].necessary === 1 && tasks[i].got_awarded === 0) {
      done = false;
      break;
    }

  }

  let tasksParams: ItasksParams = {
    part: String(part),
    name: this.state.lang[this.state.farm.toLowerCase() + 'NamePart' + part],
    farmer: this.state.lang[this.state.farm.toLowerCase() + 'ProfileName'] + ' ' + romanize(part),
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
  let checkBoost: boolean = true;

  if (this.state.farm === 'Sheep') {
    if (this.state.userSheep.tutorial >= 100 && this.state.userSheep.part > 3 && !this.state.user.takenReward) check = true;
    if (!this.state.user.additionalTutorial.herdBoost && this.state.userSheep.part >= this.game.scene.keys[this.state.farm].herdBoostLvl || 
      !this.state.user.additionalTutorial.feedBoost && this.state.userSheep.part >= this.game.scene.keys[this.state.farm].feedBoostLvl) checkBoost = false;
  } else if (this.state.farm === 'Chicken') {
    if (this.state.userChicken.tutorial > 0 && !this.state.user.takenReward) check = true;
  } else if (this.state.farm === 'Cow') {
    if (this.state.userCow.tutorial > 0 && !this.state.user.takenReward) check = true;
  }

  if (check && checkBoost && this.dailyStartCheck &&
    typeof this.state.daily === 'number' &&
    !this.scene.isActive('Modal') &&
    !this.scene.isActive('Tutorial') &&
    !this.scene.isActive('Profile') && 
    !this.scene.isActive('Fortune')) {
    this.dailyStartCheck = false;
    // дейлики для новичка
    if (this.state.newbieTime > 0) {
      const modal: Imodal = { type: 6 }
      this.state.modal = modal;
      this.scene.launch('Modal', this.state);
    // дейлики для старых
    } else {
      const modal: Imodal = { type: 4 }
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
      this.state.farm !== 'Sheep' && this.state.user.test === 'A') {

      this.game.scene.keys[this.state.farm + 'Bars'].newbieAwardAnimation();

    }

    if ((this.state.daily === 4 ||
      this.state.daily === 6) &&
      this.state.farm !== 'Chicken' && this.state.user.test === 'A') {
      
      if (this.state.daily === 4) {
        this.state.dailyAwards[3] = false;
      }

      this.game.scene.keys[this.state.farm + 'Bars'].newbieAwardAnimation();

    }

    // анимашка для собирателей в любом случае
    if ((this.state.daily === 5 || this.state.daily === 7) && this.state.user.test === 'A') {
      this.game.scene.keys[this.state.farm + 'Bars'].newbieAwardAnimation();
    }

    if (this.state.farm === 'Sheep' && (this.state.daily === 5 || this.state.daily === 7) && this.state.user.test === 'B') {
      this.game.scene.keys[this.state.farm + 'Bars'].newbieAwardAnimation();
    }

    if (this.state.user.test === 'B' && this.state.farm !== 'Sheep') {
      this.game.scene.keys[this.state.farm + 'Bars'].newbieAwardAnimation();
    }

    this.getNewbieAward();

    this.state.user.takenReward = true;
    axios.post(process.env.API + "/takenNewbieReward", { hash: this.state.user.hash });

  }

}


// показ окна успешного доната
function showDonate(): void {
  this.state.donate = false;
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

function changeNickname(): void {
  
  // Заголовок и описание
  this.textHeader.setText(this.state.lang.nickname);
  let enterNickname: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 70, this.state.lang.enterNickname, {
    font: '28px Shadow',
    color: '#974f00'
  }).setOrigin(0.5, 0.5).setDepth(3);

  // HTML элементы
  let root: HTMLDivElement = document.querySelector('#root');
  this.mainInput = document.createElement('input');
  root.append(this.mainInput);
  this.mainInput.setAttribute("id", "nickname");
  this.mainInput.setAttribute("autocomplete", "off");

  // Параметры
  let change: boolean = false;
  let centered: boolean = true;
  let nicknameError: boolean = false;
  let result: Phaser.GameObjects.Text;
  let padding: number;
  let modalElement: modalElementType[] = [];
  let tempHeight: number = window.innerHeight;
  const windowHeight: number = window.innerHeight;

  // Отрисовка текста, полученного из инпут
  let nicknameText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 220, this.cameras.main.centerY + 35, this.mainInput.value, {
    font: '24px Bip',
    color: '#974f00'
  }).setOrigin(0, 0.5).setDepth(3).setCrop(0, 0, 434, 100);

  // Зона для интерактива и ее границы для всего окна
  let nicknameModalZone: Phaser.GameObjects.Zone = this.add.zone(this.cameras.main.centerX, this.cameras.main.centerY, 710, 1200).setDropZone(undefined, () => {});
  // let graphics: Phaser.GameObjects.Graphics = this.add.graphics()
  // .lineStyle(2, 0x7b40b8)
  // .strokeRect(nicknameModalZone.x - nicknameModalZone.input.hitArea.width / 2, nicknameModalZone.y - nicknameModalZone.input.hitArea.height / 2, nicknameModalZone.input.hitArea.width, nicknameModalZone.input.hitArea.height);

  // Зона для интерактива и ее границы для инпут
  let nicknameInputZone: Phaser.GameObjects.Zone = this.add.zone(this.cameras.main.centerX, this.cameras.main.centerY + 36, 460, 70).setDropZone(undefined, () => {});
  // let graphics2: Phaser.GameObjects.Graphics = this.add.graphics()
  // .lineStyle(2, 0xFFFF00)
  // .strokeRect(nicknameInputZone.x - nicknameInputZone.input.hitArea.width / 2, nicknameInputZone.y - nicknameInputZone.input.hitArea.height / 2, nicknameInputZone.input.hitArea.width, nicknameInputZone.input.hitArea.height);
      
  // Фон инпута
  let nicknameBG: Phaser.GameObjects.Graphics = this.add.graphics({
    x: this.cameras.main.centerX - 230,
    y: this.cameras.main.centerY
  })
  .setDepth(2)
  .fillStyle(0xffffff, 1)
  .fillRoundedRect(0, 0, 460, 70, 16);

  // Кнопка
  let changeNicknameBtn = this.bigButton('green', 'center', 130, this.state.lang.changeNickname);
  result = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 90, '', {
    font: '19px Shadow',
    color: '#FF0000',
    align: 'center',
    wordWrap: { width: 520 }
  }).setOrigin(0.5, 0.5).setDepth(4).setAlpha(0);

  padding = this.cameras.main.height / 100 * 30;
  modalElement.push(
    this.header,
    this.body,
    this.bottom,
    this.close,
    this.textHeader,
    enterNickname,
    nicknameText,
    nicknameInputZone,
    nicknameBG,
    changeNicknameBtn.btn,
    changeNicknameBtn.title,
    result,
  );    


  window.onresize = (): void => {
      
    tempHeight = window.innerHeight;

    if (windowHeight !== tempHeight && centered) {

      root.scrollIntoView(false)

      modalElement.forEach((el) => el.setY(el.y + padding))
      this.mainInput.style.top = '80%';
      this.mainInput.style.bottom = '14%';

      centered = false

    } else if (windowHeight === tempHeight && !centered) {
      
      modalElement.forEach((el) => el.setY(el.y - padding));
      this.mainInput.style.top = '50%';
      this.mainInput.style.bottom = '44%';
      
      centered = true

    }

  }

  // Фокус
  nicknameInputZone.setInteractive();
  nicknameInputZone.on('pointerdown', (): void => {
        
    this.mainInput.style.display = 'block';
    this.mainInput.focus();

  });

  // Блюр
  nicknameModalZone.setInteractive();
  nicknameModalZone.on('pointerdown', (): void => {
                
    this.mainInput.style.display = 'none';
    this.mainInput.blur();
    nicknameText.setText(this.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);

  });

  // Кнопка смены ника
  this.clickModalBtn(changeNicknameBtn, (): void => changeNickname());

  this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
  this.enterKey.on('down', (): void => changeNickname());

  const changeNickname = (): void => {
        
    if (!change) {

      let checkLogin: boolean = true;
      let re: RegExp = /^[a-zA-Z0-9]+$/;
      checkLogin = re.test(this.mainInput.value);
          
      if (this.mainInput.value.length < 6) checkLogin = false;
    
      if (checkLogin) {
    
        change = true;
    
        axios.post(process.env.API + '/newNickname', {
          id: this.state.user.id,
          hash: this.state.user.hash,
          counter: this.state.user.counter,
          login: this.mainInput.value
        }).then((res) => {
          
          if (res.data.error) window.location.reload();
          else {
            change = false;
    
            if (res.data.success) {
    
              this.state.user.login = this.mainInput.value;
              document.cookie = "farmHASH=" + res.data.hash + "; expires=" + res.data.expires + "; path=/;";
              this.state.user.hash = res.data.hash;
              this.game.scene.keys[this.state.farm].scrolling.wheel = true;
              this.enterKey.destroy();
              this.mainInput.remove();
              this.scene.stop();
                  
            } else {

              if (!nicknameError) enterNickname.setY(enterNickname.y + 34);
              nicknameError = true;
              result.setText(this.state.lang.haveAccaunt).setAlpha(1);

            }
          }
        });
    
      } else {

        if (!nicknameError) enterNickname.setY(enterNickname.y + 34);
        nicknameError = true;
        result.setText(this.state.lang.validNickname).setAlpha(1);

      }

    }

  }

  this.resizeWindow(270);

}

function addEmail(): void {

  // Заголовок и описание
  this.textHeader.setText(this.state.lang.yourMail);
  let enterEmail: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 70, this.state.lang.enterYourEmail, {
    font: '28px Shadow',
    color: '#974f00'
  }).setOrigin(0.5, 0.5).setDepth(3);

  // HTML элементы
  let root: HTMLDivElement = document.querySelector('#root');
  this.mainInput = document.createElement('input');
  root.append(this.mainInput);
  this.mainInput.setAttribute("id", "nickname");
  this.mainInput.setAttribute("autocomplete", "off");
  
  // Параметры
  let send: boolean = false;
  let centered: boolean = true;
  let emailError: boolean = false;
  let result: Phaser.GameObjects.Text;
  let reMail: RegExp = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
  let padding: number = this.cameras.main.height / 100 * 30;
  let modalElement: modalElementType[] = [];
  let tempHeight: number = window.innerHeight;
  const windowHeight: number = window.innerHeight;

  // Отрисовка текста, полученного из инпут
  let emailText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 220, this.cameras.main.centerY + 35, this.mainInput.value, {
    font: '24px Bip',
    color: '#974f00'
  }).setOrigin(0, 0.5).setDepth(3).setCrop(0, 0, 434, 100);
  
  let emailModalZone: Phaser.GameObjects.Zone = this.add.zone(this.cameras.main.centerX, this.cameras.main.centerY, 710, 1200).setDropZone(undefined, () => {});
  let emailInputZone: Phaser.GameObjects.Zone = this.add.zone(this.cameras.main.centerX, this.cameras.main.centerY + 36, 460, 70).setDropZone(undefined, () => {});
  
  // Фон инпута
  let emailBG: Phaser.GameObjects.Graphics = this.add.graphics({
    x: this.cameras.main.centerX - 230,
    y: this.cameras.main.centerY
  })
  .setDepth(2)
  .fillStyle(0xffffff, 1)
  .fillRoundedRect(0, 0, 460, 70, 16);

  // Кнопка
  let sendEmailBtn = this.bigButton('green', 'center', 130, this.state.lang.sendEmail);
  result = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 90, '', {
    font: '19px Shadow',
    color: '#FF0000',
    align: 'center',
    wordWrap: { width: 520 }
  }).setOrigin(0.5, 0.5).setDepth(4).setAlpha(0);

  modalElement.push(
    this.header,
    this.body,
    this.bottom,
    this.close,
    this.textHeader,
    enterEmail,
    emailText,
    emailInputZone,
    emailBG,
    sendEmailBtn.btn,
    sendEmailBtn.title,
    result
  );    


  window.onresize = (): void => {
      
    tempHeight = window.innerHeight;

    if (windowHeight !== tempHeight && centered) {

      root.scrollIntoView(false);

      modalElement.forEach((el) => el.setY(el.y + padding));
      this.mainInput.style.top = '80%';
      this.mainInput.style.bottom = '14%';

      centered = false;

    } else if (windowHeight === tempHeight && !centered) {
          
      modalElement.forEach((el) => el.setY(el.y - padding));
      this.mainInput.style.top = '50%';
      this.mainInput.style.bottom = '44%';

      centered = true;

    }
    
  }

  // Фокус
  emailInputZone.setInteractive();
  emailInputZone.on('pointerdown', (): void => {
        
    this.mainInput.style.display = 'block';
    this.mainInput.focus();

  });

  // Блюр
  emailModalZone.setInteractive();
  emailModalZone.on('pointerdown', (): void => {
                
    this.mainInput.style.display = 'none';
    this.mainInput.blur();

    emailText.setText(this.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);

  });

  
  // Отправка почты
  this.clickModalBtn(sendEmailBtn, (): void => sendEmail());

  this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  this.enterKey.on('down', (): void => sendEmail());


  const sendEmail = (): void => {
    if (!send) {

      if (reMail.test(this.mainInput.value)) {

        send = true;

        axios.post(process.env.API + '/sendEmail', {
          id: this.state.user.id,
          hash: this.state.user.hash,
          counter: this.state.user.counter,
          mail: this.mainInput.value
        })
        .then((res) => {

          if (res.data.error) this.logout();
          else {

            send = false;
            this.game.scene.keys[this.state.farm].scrolling.wheel = true;
            this.enterKey.destroy()
            this.mainInput.remove();
            this.scene.stop();
            this.game.scene.keys[this.state.farm].tryTask(16, 1);

          }

        });

      } else {

        if (!emailError) enterEmail.setY(enterEmail.y + 34);
        emailError = true;
        result.setText(this.state.lang.emailError).setAlpha(1);

      }

    }

  }

  this.resizeWindow(270);
}

function support(): void {

  // Заголовок и описание
  this.textHeader.setText(this.state.lang.help);
  let description: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 216, this.state.lang.needHelp, {
    font: '24px Bip',
    color: '#974f00',
    align: 'center',
    wordWrap: { width: 400 }
  }).setOrigin(0.5, 0.5).setDepth(3);

  // HTML элементы
  let root: HTMLDivElement = document.querySelector('#root');
  this.mainInput = document.createElement('input');
  this.secondInput = document.createElement('textarea');
  root.append(this.mainInput);
  root.append(this.secondInput);
  this.mainInput.setAttribute("id", "sup-email");
  this.mainInput.setAttribute("autocomplete", "off");
  this.secondInput.setAttribute("id", "sup-msg");
  this.secondInput.setAttribute("autocomplete", "off");
  
  // Параметры
  let send: boolean = false;
  let centered: boolean = true;
  let isInputTouched: boolean = false;
  let isTextareaTouched: boolean = false;
  let sendError: boolean = false;
  let result: Phaser.GameObjects.Text;
  let reMail: RegExp = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
  let padding: number = this.cameras.main.height / 100 * 15;
  let modalElement: modalElementType[] = [];
  let tempHeight: number = window.innerHeight;
  const windowHeight: number = window.innerHeight;

  // Отрисовка текста, полученного из инпут + placeholder
  let emailText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 220, this.cameras.main.centerY - 101, this.state.lang.yourMail, {
    font: '24px Bip',
    color: '#974f00'
  }).setOrigin(0, 0.5).setDepth(4).setCrop(0, 0, 434, 100);

  // Отрисовка текста, полученного из текстэрии + placeholder
  let msgText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 220, this.cameras.main.centerY - 42, this.state.lang.yourMessage, {
    font: '25px Bip',
    color: '#974f00',
    align: 'left',
    wordWrap: { width: 444 }
  }).setOrigin(0, 0).setDepth(4).setCrop(0, 0, 445, 254);
  
  // Зоны
  let helpModalZone: Phaser.GameObjects.Zone = this.add.zone(this.cameras.main.centerX, this.cameras.main.centerY, 710, 1200).setDropZone(undefined, () => {});
  let helpInputZone: Phaser.GameObjects.Zone = this.add.zone(this.cameras.main.centerX, this.cameras.main.centerY - 101, 460, 70).setDropZone(undefined, () => {});
  let helpTextareaZone: Phaser.GameObjects.Zone = this.add.zone(this.cameras.main.centerX, this.cameras.main.centerY + 84, 460, 260).setDropZone(undefined, () => {});

  // Фон инпута
  let emailBG: Phaser.GameObjects.Graphics = this.add.graphics({
    x: this.cameras.main.centerX - 230,
    y: this.cameras.main.centerY - 137
  })
  .setDepth(2)
  .fillStyle(0xffffff, 1)
  .fillRoundedRect(0, 0, 460, 70, 16);

  // Фон текстэрии
  let msgBG: Phaser.GameObjects.Graphics = this.add.graphics({
    x: this.cameras.main.centerX - 230,
    y: this.cameras.main.centerY - 46
  })
  .setDepth(2)
  .fillStyle(0xffffff, 1)
  .fillRoundedRect(0, 0, 460, 260, 16);

  // Кнопка
  let sendMsgBtn = this.bigButton('green', 'center', 130, this.state.lang.send);
  sendMsgBtn.btn.y = this.cameras.main.centerY + 280
  sendMsgBtn.title.y = this.cameras.main.centerY + 274
  result = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 166, '', {
    font: '21px Shadow',
    color: '#FF0000',
    align: 'center',
    wordWrap: { width: 520 }
  }).setOrigin(0.5, 0.5).setDepth(4).setAlpha(0);

  modalElement.push(
    this.header,
    this.body,
    this.bottom,
    this.close,
    this.textHeader,
    description,
    emailText,
    msgText,
    helpInputZone,
    helpTextareaZone,
    emailBG,
    msgBG,
    sendMsgBtn.btn,
    sendMsgBtn.title,
    result
  )
  
  // resize
  window.onresize = (): void => {
      
    tempHeight = window.innerHeight;

    if (windowHeight !== tempHeight && centered) {

      root.scrollIntoView(false);

      modalElement.forEach((el) => el.setY(el.y + padding));
      this.mainInput.style.top = '53.5%';
      this.mainInput.style.bottom = '40.5%';
      this.secondInput.style.top = '61%';
      this.secondInput.style.bottom = '17%';
  
      centered = false;

      } else if (windowHeight === tempHeight && !centered) {
            
      modalElement.forEach((el) => el.setY(el.y - padding));
      this.mainInput.style.top = '38.5%';
      this.mainInput.style.bottom = '55.5%';
      this.secondInput.style.top = '46%';
      this.secondInput.style.bottom = '32%';

      centered = true;

    }

  }

  // Фокус на инпут
  helpInputZone.setInteractive();
  helpInputZone.on('pointerdown', (): void => {

    this.secondInput.style.display = 'none';
    this.mainInput.style.display = 'block';
    this.secondInput.blur();
    this.mainInput.focus();

    msgText.setText(this.secondInput.value).setDepth(4).setCrop(0, 0, 445, 254);
    if (this.secondInput.value === '') msgText.setText(this.state.lang.yourMessage).setDepth(4).setCrop(0, 0, 434, 100);

    if (!isInputTouched) isInputTouched = true
    checkError('textarea');

  });

  // Фокус на текстэрия
  helpTextareaZone.setInteractive();
  helpTextareaZone.on('pointerdown', (): void => {

    this.mainInput.style.display = 'none';
    this.secondInput.style.display = 'block';
    this.mainInput.blur();
    this.secondInput.focus();

    emailText.setText(this.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
    if (this.mainInput.value === '') emailText.setText(this.state.lang.yourMail).setDepth(4).setCrop(0, 0, 434, 100);

    if (!isTextareaTouched) isTextareaTouched = true
    checkError('input');

  });

  // Блюр
  helpModalZone.setInteractive();
  helpModalZone.on('pointerdown', (): void => {
                
    this.mainInput.style.display = 'none';
    this.secondInput.style.display = 'none';
    this.mainInput.blur();
    this.secondInput.blur();

    emailText.setText(this.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
    msgText.setText(this.secondInput.value).setDepth(4).setCrop(0, 0, 445, 254);
    if (this.mainInput.value === '') emailText.setText(this.state.lang.yourMail).setDepth(4).setCrop(0, 0, 434, 100);
    if (this.secondInput.value === '') msgText.setText(this.state.lang.yourMessage).setDepth(4).setCrop(0, 0, 434, 100);

    checkError();

  });

  // Валидация
  const checkError = (elements: string = 'all'): void => {

    if (elements === 'all' || elements === 'input') {
      if (sendError && reMail.test(this.mainInput.value) && isInputTouched && result.text === this.state.lang.emailError) {
        description.setY(description.y + 24);
        result.setAlpha(0)
        sendError = false
      }
    }

    if (elements === 'all' || elements === 'textarea') {
      if (sendError && this.secondInput.value !== '' && isTextareaTouched && result.text === this.state.lang.messageError) {
        description.setY(description.y + 24);
        result.setAlpha(0)
        sendError = false
      }
    }

  }

  // Отправка
  this.clickModalBtn(sendMsgBtn, (): void => {
    this.mainInput.blur();
    this.secondInput.blur();
    sendToSupport();
  });

  this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  this.enterKey.on('down', (): void => {
    this.mainInput.blur();
    this.secondInput.blur();
    sendToSupport();
  });

  const sendToSupport = (): void => {

    if (!send) {

      if (reMail.test(this.mainInput.value)) {

        if (this.secondInput.value !== '') {

          send = true;

          axios.post(process.env.API + '/sendToSupport', {
            id: this.state.user.id,
            hash: this.state.user.hash,
            counter: this.state.user.counter,
            mail: this.mainInput.value,
            message: this.secondInput.value,
            platform: this.state.platform
          })
          .then((res) => {

            if (res.data.error) window.location.reload();
            else {

              this.game.scene.keys[this.state.farm].messageIsSent();
              this.game.scene.keys[this.state.farm].scrolling.wheel = true;
              this.enterKey.destroy()
              this.secondInput.remove();
              this.mainInput.remove();
              this.scene.stop();  

            }

          });

        } else {

          if (!sendError) description.setY(description.y - 24);
          sendError = true;
          result.setText(this.state.lang.messageError).setAlpha(1);
  
        }

      } else {
  
        if (!sendError) description.setY(description.y - 24);
        sendError = true;
        result.setText(this.state.lang.emailError).setAlpha(1);
  
      }

    }

  }
  
  this.resizeWindow(580);
}

function registration(): void {
  
  // Заголовок
  this.textHeader.setText(this.state.lang.saving);

  // HTML элементы
  let root: HTMLDivElement = document.querySelector('#root');
  this.mainInput = document.createElement('input');
  this.secondInput = document.createElement('input');
  root.append(this.mainInput);
  root.append(this.secondInput);
  this.mainInput.setAttribute("id", "reg-login");
  this.mainInput.setAttribute("autocomplete", "off");
  this.secondInput.setAttribute("id", "reg-pass");
  this.secondInput.setAttribute("autocomplete", "off");
  this.secondInput.setAttribute("type", "password");
  
  // Параметры
  let reg: boolean = false;
  let centered: boolean = true;
  let isLoginTouched: boolean = false;
  let isPassTouched: boolean = false;
  let errorType: string = ''
  let lastLogin: string = ''
  let result: Phaser.GameObjects.Text;
  let re: RegExp = /^[a-zA-Z0-9]+$/;
  let padding: number = this.cameras.main.height / 100 * 22;
  let extraHeight: number = 50;
  let modalElement: modalElementType[] = [];
  let tempHeight: number = window.innerHeight;
  const windowHeight: number = window.innerHeight;
  
  // Отрисовка текста, полученного из инпут + placeholder
  let loginText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 220, this.cameras.main.centerY - 113, this.state.lang.loginSixSymbols, {
    font: '24px Bip',
    color: '#974f00'
  }).setOrigin(0, 0.5).setDepth(4).setCrop(0, 0, 434, 100);

  // Отрисовка текста, полученного из инпут + placeholder
  let passText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 220, this.cameras.main.centerY - 18, this.state.lang.passSixSymbols, {
    font: '24px Bip',
    color: '#974f00'
  }).setOrigin(0, 0.5).setDepth(4).setCrop(0, 0, 434, 100);

  // Зоны
  let regModalZone: Phaser.GameObjects.Zone = this.add.zone(this.cameras.main.centerX, this.cameras.main.centerY, 710, 1200).setDropZone(undefined, () => {});
  let loginInputZone: Phaser.GameObjects.Zone = this.add.zone(this.cameras.main.centerX, this.cameras.main.centerY - 113, 460, 70).setDropZone(undefined, () => {});
  let passTextareaZone: Phaser.GameObjects.Zone = this.add.zone(this.cameras.main.centerX, this.cameras.main.centerY - 18, 460, 70).setDropZone(undefined, () => {});

  // Фон логина
  let loginBG: Phaser.GameObjects.Graphics = this.add.graphics({
    x: this.cameras.main.centerX - 230,
    y: this.cameras.main.centerY - 149
  })
  .setDepth(2)
  .fillStyle(0xffffff, 1)
  .fillRoundedRect(0, 0, 460, 70, 16);

  // Фон пароля
  let passBG: Phaser.GameObjects.Graphics = this.add.graphics({
    x: this.cameras.main.centerX - 230,
    y: this.cameras.main.centerY - 53
  })
  .setDepth(2)
  .fillStyle(0xffffff, 1)
  .fillRoundedRect(0, 0, 460, 70, 16);

  let regBtn = this.bigButton('green', 'center', 130, this.state.lang.save);
  regBtn.btn.y = this.cameras.main.centerY + 80
  regBtn.title.y = this.cameras.main.centerY + 74

  let logoutBtn = this.bigButton('red', 'center', 130, this.state.lang.profileExit);
  logoutBtn.btn.y = this.cameras.main.centerY + 166
  logoutBtn.title.y = this.cameras.main.centerY + 160

  result = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 180, '', {
    font: '19px Shadow',
    color: '#FF0000',
    align: 'center',
    wordWrap: { width: 500 }
  }).setOrigin(0.5, 1).setDepth(4).setAlpha(0);

  modalElement.push(
    this.header,
    this.body,
    this.bottom,
    this.close,
    this.textHeader,
    loginText,
    passText,
    loginInputZone,
    passTextareaZone,
    loginBG,
    passBG,
    regBtn.btn,
    regBtn.title,
    logoutBtn.btn,
    logoutBtn.title,
    result
  )
  
  // resize
  window.onresize = (): void => {
    
    tempHeight = window.innerHeight;

    if (windowHeight !== tempHeight && centered) {

      root.scrollIntoView(false);

      modalElement.forEach((el) => el.setY(el.y + padding));
      this.mainInput.style.top = '59.5%';
      this.mainInput.style.bottom = '34.5%';
      this.secondInput.style.top = '67.5%';
      this.secondInput.style.bottom = '26.5%';
      
      centered = false;

    } else if (windowHeight === tempHeight && !centered) {
          
      modalElement.forEach((el) => el.setY(el.y - padding));
      this.mainInput.style.top = '37.5%';
      this.mainInput.style.bottom = '56.5%';
      this.secondInput.style.top = '45.5%';
      this.secondInput.style.bottom = '48.5%';
  
      centered = true;

    }

  }
  
  // Фокус на логин
  loginInputZone.setInteractive();
  loginInputZone.on('pointerdown', (): void => {

    this.secondInput.style.display = 'none';
    this.mainInput.style.display = 'block';
    this.mainInput.focus();
    
    if (this.secondInput.value === '') passText.setText(this.state.lang.passSixSymbols).setDepth(4).setCrop(0, 0, 434, 100)
    else passText.setText(hidePass()).setDepth(4).setCrop(0, 0, 434, 100);
    
    if (!isLoginTouched) isLoginTouched = true
    checkError();

  });

  // Фокус на пароль
  passTextareaZone.setInteractive();
  passTextareaZone.on('pointerdown', (): void => {

    this.mainInput.style.display = 'none';
    this.secondInput.style.display = 'block';
    this.secondInput.focus();

    if (this.mainInput.value === '') loginText.setText(this.state.lang.loginSixSymbols).setDepth(4).setCrop(0, 0, 434, 100)
    else loginText.setText(this.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
    
    if (!isPassTouched) isPassTouched = true
    checkError();

  });

  // Блюр
  regModalZone.setInteractive();
  regModalZone.on('pointerdown', (): void => {

    // isInputActive = false

    this.mainInput.style.display = 'none';
    this.secondInput.style.display = 'none';
    this.mainInput.blur();
    this.secondInput.blur();

    if (this.mainInput.value === '') loginText.setText(this.state.lang.loginSixSymbols).setDepth(4).setCrop(0, 0, 434, 100)
    else loginText.setText(this.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
    
    if (this.secondInput.value === '') passText.setText(this.state.lang.passSixSymbols).setDepth(4).setCrop(0, 0, 434, 100)
    else passText.setText(hidePass()).setDepth(4).setCrop(0, 0, 434, 100);

    checkError();

  });

  // Скрытие пароля
  const hidePass = (): string => {
    let output: string = ''
    let i: number = 0

    while (i < this.secondInput.value.length) {
      output += '*'
      i++
    }

    return output
  }

  // Валидация
  const checkError = (): void => {

    if (
      errorType === 'validLoginPass' &&
      re.test(this.mainInput.value) &&
      re.test(this.secondInput.value) &&
      this.mainInput.value.length >= 6 &&
      this.secondInput.value.length >= 6 &&
      isLoginTouched &&
      isPassTouched
    ) {

      this.resizeWindowTop(-(extraHeight + 20));
      result.setAlpha(0);
      errorType = ''

    } else if (errorType === 'haveAccaunt' && lastLogin !== this.mainInput.value) {

      this.resizeWindowTop(-(extraHeight + 20));
      result.setAlpha(0);
      errorType = ''

    }

  }

  // Отправка
  this.clickModalBtn(regBtn, (): void => {
    this.mainInput.blur();
    this.secondInput.blur();
    registration();
  });

  this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  this.enterKey.on('down', (): void => {
    this.mainInput.blur();
    this.secondInput.blur();
    registration();
  });

  const registration = (): void => {

    if (!reg) {
      
      let checkLogin: boolean = true;
      let checkPass: boolean = true;
      checkLogin = re.test(this.mainInput.value);
      checkPass = re.test(this.secondInput.value);
      
      if (this.mainInput.value.length < 6) checkLogin = false;
      if (this.secondInput.value.length < 6) checkPass = false;

      if (checkLogin && checkPass) {

        reg = true;
        
        axios.post(process.env.API + '/registration', {
          id: this.state.user.id,
          hash: this.state.user.hash,
          counter: this.state.user.counter,
          login: this.mainInput.value,
          pass: this.secondInput.value
        })
        .then((res) => {

          if (res.data.error) window.location.reload();
          else {

            reg = false;

            if (res.data.success) {

              let tasks: Itasks[] = this.game.scene.keys[this.state.farm].partTasks();
              let task: Itasks = tasks.find((data: Itasks) => data.type === 10);

              if (task) {
                this.game.scene.keys[this.state.farm].takeRewardRegistration = true;
                this.game.scene.keys[this.state.farm].tryTask(10, 1);
              }

              this.state.user.login = this.mainInput.value;
              document.cookie = "farmHASH=" + res.data.hash + "; expires=" + res.data.expires + "; path=/;";
              this.state.user.hash = res.data.hash;
              this.game.scene.keys[this.state.farm].scrolling.wheel = true;
              this.enterKey.destroy()
              this.secondInput.remove();
              this.mainInput.remove();
              this.scene.stop();

            } else {

              lastLogin = this.mainInput.value
              result.setText(this.state.lang.haveAccaunt).setAlpha(1);
              setExtraHeight()
              errorType = 'haveAccaunt'
          
            }

          }

        });

      } else {
        
        result.setText(this.state.lang.validLoginPass).setAlpha(1);
        setExtraHeight()
        errorType = 'validLoginPass'
        
        
      }

    }

  }
  
  // Установка высоты окна
  const setExtraHeight = (): void => {

    if (errorType === '') {

      extraHeight = result.getBounds().height
      this.resizeWindowTop(extraHeight + 20);

    } else if (errorType === 'haveAccaunt' || errorType === 'validLoginPass') {

      this.resizeWindowTop(-(extraHeight + 20));
      extraHeight = result.getBounds().height
      this.resizeWindowTop(extraHeight + 20);

    }
  }

  // Выход
  this.clickModalBtn(logoutBtn, (): void => {

    document.cookie = "farmHASH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.farm = '';
    window.location.reload();

  });


  this.resizeWindow(360);
  
}


function confirmBuyCooldown(): void {
  this.textHeader.setText(this.state.lang.buyTerritory);
  const price: number = this.state.territory.cooldownSprite.price;

  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 70, this.state.lang.confirmBuyCooldown, {
    font: '26px Bip',
    color: '#925C28',
    wordWrap: { width: 450 },
    align: 'center',
  }).setOrigin(0.5);
  const img = {
    icon: 'diamond',
    text: shortNum(price), // Обработать обновление текста кнопки
  };

  this.progressButton = this.bigButton('green', 'left', 20, this.state.lang.speedUpFor, img);
  const redBtn = this.bigButton('red', 'center', 110, this.state.lang.cancel);

  this.clickModalBtn(this.progressButton, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    if (this.state.user.diamonds >= price) {
      this.game.scene.keys[this.state.farm].logAmplitudeEvent('diamonds_spent', {
        type: 'cooldown',
        count: price,
      });
      this.state.user.diamonds -= price;
      this.state.territory.cooldown = 0;
      this.game.scene.keys[this.state.farm].tryTask(15, 0, price);
    } else {
      // вызывем конвертор
      this.state.convertor = {
        fun: 0,
        count: price,
        diamonds: price,
        type: 1
      }
      this.game.scene.keys[this.state.farm].exchange();
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    }
  });

  this.clickModalBtn(redBtn, (): void => {
    this.scene.stop();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
  });
  this.resizeWindow(250);
}


// окно улучшения подстригателя
function improveCollector(): void {
  
  const farm: string = this.state.farm.toLowerCase();
  const resource: string = this.state.farm === 'Sheep' ? 'wool' : 
  this.state.farm === 'Chicken' ? 'egg' : 
  this.state.farm === 'Cow' ? 'milk' : '';
  
  this.textHeader.setText(`${this.state.lang[`${resource}Collector`]} ${this.state[`user${this.state.farm}`].collectorLevel} ${this.state.lang.shortLevel}.`);
  const thisLevel: IcollectorSettings = this.state[`${farm}CollectorSettings`].find((data: IcollectorSettings) => data.level === this.state[`user${this.state.farm}`].collectorLevel);
  const nextLevel: IcollectorSettings = this.state[`${farm}CollectorSettings`].find((data: IcollectorSettings) => data.level === this.state[`user${this.state.farm}`].collectorLevel + 1);
  
  let speedText: string = `${this.state.lang.power}: ${thisLevel.speed} ${this.state.lang[`unit${this.state.farm}`]}/${this.state.lang.seconds}`;

  const speed: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 80, speedText, {
    font: '30px Bip',
    color: '#925C28'
  });
  
  const durationText: string = `${this.state.lang.duration}: ${thisLevel.time} ${this.state.lang.minutes}`;
  const duration: Phaser.GameObjects.Text = this.add.text(125, this.cameras.main.centerY - 25, durationText, {
    font: '30px Bip',
    color: '#925C28'
  });

  let icon: string;
  let nextLevelText: Phaser.GameObjects.Text;

  if (nextLevel.time > thisLevel.time) {

    const position: Iposition = {
      x: duration.getBounds().right + 10,
      y: duration.y
    }
    const text: string = `(+${(nextLevel.time - thisLevel.time)} ${this.state.lang.shortMinutes})`;
    nextLevelText = this.add.text(position.x, position.y, text, {
      font: '30px Bip',
      color: '#57A90E'
    });
    
  } else if (nextLevel.speed > thisLevel.speed) {

    const position: Iposition = {
      x: speed.getBounds().right + 10,
      y: speed.y
    }
    let text: string = `(+${(nextLevel.speed - thisLevel.speed).toFixed(1)})`;
    nextLevelText = this.add.text(position.x, position.y, text, {
      font: '30px Bip',
      color: '#57A90E'
    });

  }

  if (this.state[`user${this.state.farm}`].part >= nextLevel.chapter) {
    if (nextLevel.diamonds) icon = 'diamond';
    else icon = `${farm}Coin`;

    const right = {
      icon: icon,
      text: shortNum(nextLevel.price)
    }
    const improve = this.bigButton('green', 'left', 90, this.state.lang.improve, right);
    this.clickModalBtn(improve, (): void => {
      this.game.scene.keys[this.state.farm].improveCollector();
      this.updateImproveCollector(improve, speed, duration, nextLevelText);  
    
    });

  } else {

    let improve = {
      icon: 'lock',
      text: `${this.state.lang.shortPart} ${nextLevel.chapter}`,
    }
    this.bigButton('grey', 'left', 90, this.state.lang.improve, improve);

  }

  this.resizeWindow(250);
  
}

function updateImproveCollector(
  btn: {
    btn: Phaser.GameObjects.Sprite,
    img1: Phaser.GameObjects.Sprite,
    img2: Phaser.GameObjects.Sprite,
    text1: Phaser.GameObjects.Text
    text2: Phaser.GameObjects.Text
    title: Phaser.GameObjects.Text
  }, 
  speed: Phaser.GameObjects.Text, 
  duration: Phaser.GameObjects.Text, 
  nextLevelText: Phaser.GameObjects.Text): void {
  const farm: string = this.state.farm.toLowerCase();
  const resource: string = this.state.farm === 'Sheep' ? 'wool' : 
  this.state.farm === 'Chicken' ? 'egg' : 
  this.state.farm === 'Cow' ? 'milk' : '';

  this.textHeader.setText(`${this.state.lang[`${resource}Collector`]} ${this.state[`user${this.state.farm}`].collectorLevel} ${this.state.lang.shortLevel}.`);

  const thisLevel: IcollectorSettings = this.state[`${farm}CollectorSettings`]
    .find((data: IcollectorSettings) => data.level === this.state[`user${this.state.farm}`].collectorLevel);
  const nextLevel: IcollectorSettings = this.state[`${farm}CollectorSettings`]
    .find((data: IcollectorSettings) => data.level === this.state[`user${this.state.farm}`].collectorLevel + 1);

  let speedText: string = `${this.state.lang.power}: ${thisLevel.speed} ${this.state.lang[`unit${this.state.farm}`]}/${this.state.lang.seconds}`;

  speed.setText(speedText);

  const durationText: string = `${this.state.lang.duration}: ${thisLevel.time} ${this.state.lang.minutes}`;
  duration.setText(durationText);

  let position: Iposition = {
    x: undefined,
    y: undefined,
  };
  let text: string;
  if (nextLevel?.time > thisLevel.time) {

    position = {
      x: duration.getBounds().right + 10,
      y: duration.y
    }
    text = `(+${(nextLevel.time - thisLevel.time)} ${this.state.lang.shortMinutes})`;
    
  } else if (nextLevel?.speed > thisLevel.speed) {
    
    position = {
      x: speed.getBounds().right + 10,
      y: speed.y
    }
    text =  `(+${(nextLevel.speed - thisLevel.speed).toFixed(1)} ${this.state.lang.seconds})`;
  }
  nextLevelText.setPosition(position.x, position.y);
  nextLevelText.setText(text);
  if (this.state[`user${this.state.farm}`].part >= nextLevel?.chapter) {
    let icon: string;
    if (nextLevel.diamonds) icon = 'diamond';
    else icon = `${farm}Coin`;

    let right = {
      icon: icon,
      text: shortNum(nextLevel.price)
    }

    btn.text1.setText(right.text);
    btn.img1.setTexture(right.icon);
    btn.img1.setX(570 - btn.text1.displayWidth);

  } else {

    btn.btn.destroy();
    btn.img1.destroy();
    btn.text1.destroy();
    btn.title.destroy();

    let improve = {
      icon: 'lock',
      text: `${this.state.lang.shortPart} ${nextLevel?.chapter}`,
    }
    this.bigButton('grey', 'left', 90, this.state.lang.improve, improve);

  }
  
}

function openEmailWindow(): void {

  let modal: Imodal = {
    type: 1,
    sysType: 13
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
  startHerdBoost,
  changeNickname,
  addEmail,
  support,
  registration,
  improveCollector,
  updateImproveCollector,
  openEmailWindow,
  confirmBuyCooldown
}
