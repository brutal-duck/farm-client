import axios from 'axios';

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


export {
  registration,
  support
}
