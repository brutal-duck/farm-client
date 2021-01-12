import axios from 'axios';
import { newMessage } from './elements';

// окно регистрации
function registration(): void {

  this.state.amplitude.getInstance().logEvent('reg_page_viewed', {});

  this.scene.launch('Block');
  this.game.scene.keys[this.state.farm].scrolling.enabled = false;
  this.game.scene.keys[this.state.farm].scrolling.wheel = false;

  let reg: boolean = false;
  
  let root = document.querySelector('#root');
  let modal = document.createElement('div');
  modal.setAttribute("class", "modal");
  root.append(modal);
  let modalWindow = document.createElement('div');
  modalWindow.setAttribute("class", "window");
  modal.append(modalWindow);

  let body = document.createElement('div');
  body.setAttribute("class", "body-window");
  modalWindow.append(body);
  let header = document.createElement('div');
  header.innerText = this.state.lang.saving;
  header.setAttribute("class", "header");
  modalWindow.append(header);
  let footer = document.createElement('div');
  footer.setAttribute("class", "footer");
  modalWindow.append(footer);
  let closeBtn = document.createElement('div');
  closeBtn.setAttribute("class", "close");
  modalWindow.append(closeBtn);

  let error = document.createElement('div');
  error.setAttribute("class", "reg-error");
  body.append(error);

  let login = document.createElement('input');
  login.setAttribute("class", "login-pass");
  login.setAttribute("type", "text");
  login.setAttribute("placeholder", this.state.lang.loginSixSymbols);
  body.append(login);

  let pass = document.createElement('input');
  pass.setAttribute("class", "login-pass");
  pass.setAttribute("type", "password");
  pass.setAttribute("placeholder", this.state.lang.passSixSymbols);
  body.append(pass);

  let btnAuth = document.createElement('div');
  btnAuth.setAttribute("class", "big-btn big-btn-reg mt-10");
  btnAuth.innerText = this.state.lang.save;
  
  let tasks: Itasks[] = this.game.scene.keys[this.state.farm].partTasks();
  let task: Itasks = tasks.find((data: Itasks) => data.type === 10);

  if (task) {
    let span = document.createElement('span');
    span.innerText = String(task.diamonds);
    btnAuth.append(span);
  }

  body.append(btnAuth);

  let btnExit = document.createElement('div');
  btnExit.setAttribute("class", "orange-big-btn big-btn-reg");
  btnExit.innerText = this.state.lang.profileExit;
  body.append(btnExit);
  
  closeBtn.onclick = (): void => {

    modal.remove();
    this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.scene.stop('Block');

  }

  btnExit.onclick = (): void => {
    
    document.cookie = "farmHASH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload();

  }

  btnAuth.onclick = (): void => {
    
    if (!reg) {
      
      error.innerText = '';
      let checkLogin: boolean = true;
      let checkPass: boolean = true;
      let re: RegExp = /^[a-zA-Z0-9]+$/;
      checkLogin = re.test(login.value);
      checkPass = re.test(pass.value);
      
      if (login.value.length < 6) checkLogin = false;
      if (pass.value.length < 6) checkPass = false;

      if (checkLogin && checkPass) {

        reg = true;
        
        axios.post(process.env.API + '/registration', {
          id: this.state.user.id,
          hash: this.state.user.hash,
          counter: this.state.user.counter,
          login: login.value,
          pass: pass.value
        })
        .then((res) => {

          if (res.data.error) window.location.reload();
          else {

            reg = false;

            if (res.data.success) {

              this.state.amplitude.getInstance().logEvent('reg_done', {});

              let tasks: Itasks[] = this.game.scene.keys[this.state.farm].partTasks();
              let task: Itasks = tasks.find((data: Itasks) => data.type === 10);

              if (task) {
                this.game.scene.keys[this.state.farm].takeRewardRegistration = true;
                this.game.scene.keys[this.state.farm].tryTask(10, 1);
              }

              this.state.user.login = login.value;
              modal.remove();
              document.cookie = "farmHASH=" + res.data.hash + "; expires=" + res.data.expires + "; path=/;";
              this.state.user.hash = res.data.hash;
              this.game.scene.keys[this.state.farm].scrolling.enabled = true;
              this.game.scene.keys[this.state.farm].scrolling.wheel = true;
              this.scene.stop('Block');
              this.auth.destroy();
              this.buildMenu();

            } else {
              error.innerText = this.state.lang.haveAccaunt;
            }

          }

        });

      } else {
        error.innerText = this.state.lang.validLoginPass;
      }

    }

  }

}


// смена логина
function changeNickname(): void {

  this.scene.stop();
  this.scene.launch('Block');
  
  this.game.scene.keys[this.state.farm].scrolling.enabled = false;
  this.game.scene.keys[this.state.farm].scrolling.wheel = false;

  let change: boolean = false;
  
  let root = document.querySelector('#root');
  let modal = document.createElement('div');
  modal.setAttribute("class", "modal");
  root.append(modal);
  let modalWindow = document.createElement('div');
  modalWindow.setAttribute("class", "window");
  modal.append(modalWindow);

  let body = document.createElement('div');
  body.setAttribute("class", "body-window");
  modalWindow.append(body);
  let header = document.createElement('div');
  header.innerText = this.state.lang.nickname;
  header.setAttribute("class", "header");
  modalWindow.append(header);
  let footer = document.createElement('div');
  footer.setAttribute("class", "footer");
  modalWindow.append(footer);
  let closeBtn = document.createElement('div');
  closeBtn.setAttribute("class", "close");
  modalWindow.append(closeBtn);

  let error = document.createElement('div');
  error.setAttribute("class", "reg-error");
  body.append(error);

  let label = document.createElement('div');
  label.setAttribute("class", "enter-nickname");
  label.innerText = this.state.lang.enterNickname;
  body.append(label);

  let login = document.createElement('input');
  login.setAttribute("class", "login-pass");
  login.setAttribute("type", "text");
  body.append(login);

  let changeBtn = document.createElement('div');
  changeBtn.setAttribute("class", "big-btn big-btn-css mt-10");
  changeBtn.innerText =  this.state.lang.changeNickname;
  body.append(changeBtn);

  closeBtn.onclick = (): void => {

    modal.remove();
    this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.scene.stop('Block');

  }

  changeBtn.onclick = (): void => {

    if (!change) {

      error.innerText = '';
      let checkLogin: boolean = true;
      let re: RegExp = /^[a-zA-Z0-9]+$/;
      checkLogin = re.test(login.value);
      
      if (login.value.length < 6) checkLogin = false;

      if (checkLogin) {

        change = true;

        axios.post(process.env.API + '/newNickname', {
          id: this.state.user.id,
          hash: this.state.user.hash,
          counter: this.state.user.counter,
          login: login.value
        })
        .then((res) => {

          if (res.data.error) window.location.reload();
          else {

            change = false;

            if (res.data.success) {

              this.state.user.login = login.value;
              modal.remove();
              document.cookie = "farmHASH=" + res.data.hash + "; expires=" + res.data.expires + "; path=/;";
              this.state.user.hash = res.data.hash;
              this.game.scene.keys[this.state.farm].scrolling.enabled = true;
              this.game.scene.keys[this.state.farm].scrolling.wheel = true;
              this.scene.stop('Block');
              
            } else {
              error.innerText = this.state.lang.haveAccaunt;
            }

          }

        });

      } else {
        error.innerText = this.state.lang.validNickname;
      }

    }

  }

}


// окно отправки сообщение в поддержку
function support(): void {

  this.state.amplitude.getInstance().logEvent('support_viewed', {});

  this.scene.stop();
  this.scene.launch('Block');
  
  this.game.scene.keys[this.state.farm].scrolling.enabled = false;
  this.game.scene.keys[this.state.farm].scrolling.wheel = false;
  
  let send: boolean = false;
  let reMail: RegExp = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;

  let root = document.querySelector('#root');
  let modal = document.createElement('div');
  modal.setAttribute("class", "modal");
  root.append(modal);
  let modalWindow = document.createElement('div');
  modalWindow.setAttribute("class", "window");
  modal.append(modalWindow);

  let body = document.createElement('div');
  body.setAttribute("class", "body-window");
  modalWindow.append(body);
  let header = document.createElement('div');
  header.innerText = this.state.lang.help;
  header.setAttribute("class", "header");
  modalWindow.append(header);
  let footer = document.createElement('div');
  footer.setAttribute("class", "footer");
  modalWindow.append(footer);
  let closeBtn = document.createElement('div');
  closeBtn.setAttribute("class", "close");
  modalWindow.append(closeBtn);

  let label = document.createElement('div');
  label.setAttribute("class", "need-help");
  label.innerHTML = this.state.lang.needHelp;
  body.append(label);

  let mail = document.createElement('input');
  mail.setAttribute("class", "login-pass support");
  mail.value = this.state.user.mail;
  mail.setAttribute("placeholder", this.state.lang.yourMail);
  mail.setAttribute("type", "text");
  body.append(mail);

  let message = document.createElement('textarea');
  message.setAttribute("class", "support-text support");
  message.setAttribute("placeholder", this.state.lang.yourMessage);
  body.append(message);

  let sendBtn = document.createElement('div');
  sendBtn.setAttribute("class", "big-btn big-btn-css mt-10");
  sendBtn.innerText = this.state.lang.send;
  body.append(sendBtn);

  mail.onchange = (): void => {

    if (mail.classList.contains('red-border') && reMail.test(mail.value)) {
      mail.classList.remove('red-border');
    } else if (!mail.classList.contains('red-border') && !reMail.test(mail.value)) {
      mail.classList.add('red-border');
    }

  }

  message.onchange = (): void => {

    if (message.classList.contains('red-border') && message.value !== '') {
      message.classList.remove('red-border');
    } else if (!message.classList.contains('red-border') && message.value === '') {
      message.classList.add('red-border');
    }

  }

  closeBtn.onclick = (): void => {

    modal.remove();
    this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.scene.stop('Block');

  }

  sendBtn.onclick = (): void => {

    if (!send) {

      if (message.value !== '' && reMail.test(mail.value)) {

        send = true;

        axios.post(process.env.API + '/sendToSupport', {
          id: this.state.user.id,
          hash: this.state.user.hash,
          counter: this.state.user.counter,
          mail: mail.value,
          message: message.value,
          platform: this.state.platform
        })
        .then((res) => {

          if (res.data.error) window.location.reload();
          else {

            this.state.amplitude.getInstance().logEvent('support_send', {});

            modal.remove();
            this.game.scene.keys[this.state.farm].messageIsSent();
            this.game.scene.keys[this.state.farm].scrolling.enabled = true;
            this.game.scene.keys[this.state.farm].scrolling.wheel = true;
            this.scene.stop('Block');

          }

        });

      }

    }

  }

}


// добавленеи смайликов
function addEmoji(emoji: string): void {

  let emojiStr: string;

  switch (emoji) {
    case 'aa': emojiStr = 'O:-)'; break;
    case 'ab': emojiStr = ':-)'; break;
    case 'ac': emojiStr = ':-('; break;
    case 'ae': emojiStr = ':-P'; break;
    case 'af': emojiStr = '8-)'; break;
    case 'ag': emojiStr = ':-D'; break;
    case 'ah': emojiStr = ':-['; break;
    case 'ai': emojiStr = '=-O'; break;
    case 'aj': emojiStr = ':-*'; break;
    default: emojiStr = ''; break;
  }

  let input: any = document.getElementById("chat-input");
  let message = input.value + emojiStr;

  input.focus();
  input.value = message;
  input.selectionStart = input.value.length;
  input.selectionEnd = input.value.length;
  input.setSelectionRange(input.value.length, input.value.length);

}


// чат
function chatWindow(): void {

  this.scene.launch('Block');
  
  this.game.scene.keys[this.state.farm].scrolling.enabled = false;
  this.game.scene.keys[this.state.farm].scrolling.wheel = false;

  let root = document.querySelector('#root');
  let modal = document.createElement('div');
  modal.setAttribute("class", "modal");
  root.append(modal);
  let modalWindow = document.createElement('div');
  modalWindow.setAttribute("class", "window");
  modal.append(modalWindow);

  let body = document.createElement('div');
  body.setAttribute("class", "body-window");
  modalWindow.append(body);
  let header = document.createElement('div');
  header.innerText = this.state.lang.chat;
  header.setAttribute("class", "header");
  modalWindow.append(header);
  let footer = document.createElement('div');
  footer.setAttribute("class", "footer");
  modalWindow.append(footer);
  let closeBtn = document.createElement('div');
  closeBtn.setAttribute("class", "close");
  modalWindow.append(closeBtn);

  let chat = document.createElement('div');
  chat.setAttribute("class", "chat");
  body.append(chat);

  let chatInside = document.createElement('div');
  chatInside.setAttribute("class", "chat-inside");
  chat.append(chatInside);

  let emojiBlock = document.createElement('div');
  emojiBlock.setAttribute("class", "emoji-block");
  body.append(emojiBlock);

  let aa = document.createElement('div');
  aa.setAttribute("class", "emoji aa");
  emojiBlock.append(aa);
  aa.onclick = (): void => addEmoji('aa');
  
  let ab = document.createElement('div');
  ab.setAttribute("class", "emoji ab");
  emojiBlock.append(ab);
  ab.onclick = (): void => addEmoji('ab');

  let ac = document.createElement('div');
  ac.setAttribute("class", "emoji ac");
  emojiBlock.append(ac);
  ac.onclick = (): void => addEmoji('ac');

  let ae = document.createElement('div');
  ae.setAttribute("class", "emoji ae");
  emojiBlock.append(ae);
  ae.onclick = (): void => addEmoji('ae');

  let af = document.createElement('div');
  af.setAttribute("class", "emoji af");
  emojiBlock.append(af);
  af.onclick = (): void => addEmoji('af');

  let ag = document.createElement('div');
  ag.setAttribute("class", "emoji ag");
  emojiBlock.append(ag);
  ag.onclick = (): void => addEmoji('ag');

  let ah = document.createElement('div');
  ah.setAttribute("class", "emoji ah");
  emojiBlock.append(ah);
  ah.onclick = (): void => addEmoji('ah');

  let ai = document.createElement('div');
  ai.setAttribute("class", "emoji ai");
  emojiBlock.append(ai);
  ai.onclick = (): void => addEmoji('ai');

  let aj = document.createElement('div');
  aj.setAttribute("class", "emoji aj");
  emojiBlock.append(aj);
  aj.onclick = (): void => addEmoji('aj');

  let chatInputBlock = document.createElement('div');
  chatInputBlock.setAttribute("class", "chat-input-block");
  body.append(chatInputBlock);

  let input = document.createElement('input');
  input.setAttribute("type", "text");
  input.setAttribute("id", "chat-input");
  input.setAttribute("placeholder", this.state.lang.message);
  chatInputBlock.append(input);

  let send = document.createElement('div');
  send.setAttribute("class", "send-message-button");
  chatInputBlock.append(send);

  let emoji = document.createElement('div');
  emoji.setAttribute("class", "emoji-icon");
  chatInputBlock.append(emoji);

  let showEmoji: boolean = false;

  closeBtn.onclick = (): void => {

    modal.remove();
    this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.scene.stop('Block');

  }

  send.onclick = (): void => {

    let message: string = input.value;

    if (message !== '') {

      let login: string;
      showEmoji = false;
      emojiBlock.style.bottom = '-13px';

      if (this.state.platform !== 'web') login = this.state.name;
      else login = this.state.user.login;

      this.state.amplitude.getInstance().logEvent('chat_send', {
        farm_id: this.state.farm
      });

      this.state.socket.io.emit('send', {
        id: this.state.user.id,
        hash: this.state.user.hash,
        login: login,
        text: message,
        type: 1
      });

      input.value = '';

    }

  }

  emoji.onclick = (): void => {

    if (showEmoji) {
      emojiBlock.style.bottom = '-13px';
    } else {
      emojiBlock.style.bottom = '32px';
    }

    showEmoji = !showEmoji;

  }

  const data = { 
    id: this.state.user.id,
    hash: this.state.user.hash,
    counter: this.state.user.counter,
    type: 1
  }
  axios.post(process.env.API + "/getLastMessages", data)
  .then((res) => {

    if (res.data.error === true) window.location.reload();
    else {
      
      for (let i: number = res.data.messages.length; i > 0; i--) {
        newMessage(res.data.messages[i - 1], this.state);
      }

    }

  });

}


// окно ввода почты
function addEmail(): void {

  if (this.scene.isActive('Modal')) this.scene.stop('Modal');
  if (this.scene.isActive('Tutorial')) this.scene.stop('Tutorial');
  if (this.scene.isActive('MapBars')) this.scene.stop('MapBars');
  if (this.scene.isActive('Map')) this.scene.stop('Map');
  this.scene.launch('Block');
  
  this.game.scene.keys[this.state.farm].scrolling.enabled = false;
  this.game.scene.keys[this.state.farm].scrolling.wheel = false;
  
  let send: boolean = false;
  let reMail: RegExp = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;

  let root = document.querySelector('#root');
  let modal = document.createElement('div');
  modal.setAttribute("class", "modal");
  root.append(modal);
  let modalWindow = document.createElement('div');
  modalWindow.setAttribute("class", "window");
  modal.append(modalWindow);

  let body = document.createElement('div');
  body.setAttribute("class", "body-window");
  modalWindow.append(body);
  let header = document.createElement('div');
  header.innerText = this.state.lang.yourMail;
  header.setAttribute("class", "header");
  modalWindow.append(header);
  let footer = document.createElement('div');
  footer.setAttribute("class", "footer");
  modalWindow.append(footer);
  let closeBtn = document.createElement('div');
  closeBtn.setAttribute("class", "close");
  modalWindow.append(closeBtn);

  let mail = document.createElement('input');
  mail.setAttribute("class", "login-pass enter-mail");
  mail.value = this.state.user.mail;
  mail.setAttribute("placeholder", this.state.lang.enterYourEmail);
  mail.setAttribute("type", "text");
  body.append(mail);

  let sendBtn = document.createElement('div');
  sendBtn.setAttribute("class", "big-btn big-btn-css mt-10");
  sendBtn.innerText = this.state.lang.sendEmail;
  body.append(sendBtn);

  mail.onchange = (): void => {

    if (mail.classList.contains('red-border') && reMail.test(mail.value)) {
      mail.classList.remove('red-border');
    } else if (!mail.classList.contains('red-border') && !reMail.test(mail.value)) {
      mail.classList.add('red-border');
    }

  }

  closeBtn.onclick = (): void => {

    modal.remove();
    this.game.scene.keys[this.state.farm].scrolling.enabled = true;
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.scene.stop('Block');

  }

  sendBtn.onclick = (): void => {

    if (!send) {

      if (reMail.test(mail.value)) {

        send = true;

        axios.post(process.env.API + '/sendEmail', {
          id: this.state.user.id,
          hash: this.state.user.hash,
          counter: this.state.user.counter,
          mail: mail.value
        })
        .then((res) => {

          if (res.data.error) this.logout();
          else {

            send = false;
            modal.remove();
            this.game.scene.keys[this.state.farm].scrolling.enabled = true;
            this.game.scene.keys[this.state.farm].scrolling.wheel = true;
            this.scene.stop('Block');
            this.game.scene.keys[this.state.farm].tryTask(16, 1);
            
          }

        });

      }

    }

  }

}


export {
  registration,
  changeNickname,
  support,
  chatWindow,
  addEmail
}
