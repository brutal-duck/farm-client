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

export {
  registration
}
