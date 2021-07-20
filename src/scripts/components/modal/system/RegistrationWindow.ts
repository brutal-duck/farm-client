import axios from "axios";
import Modal from "../../../scenes/Modal/Modal";
import LocalStorage from './../../../libs/LocalStorage';

export default class RegistrationWindow {
  public scene: Modal;

  private errorType: string;
  private extraHeight: number;
  private result: Phaser.GameObjects.Text;
  private reg: boolean;
  private lastLogin: string;
  private re: RegExp;
  private isLoginTouched: boolean;
  private isPassTouched: boolean;


  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.errorType = '';
    this.extraHeight = 50;
    this.reg = false;
    this.lastLogin = '';
    this.re = /^[a-zA-Z0-9]+$/;
    this.isLoginTouched = false;
    this.isPassTouched = false;
  }

  private create(): void {
    // Заголовок
    this.scene.textHeader.setText(this.scene.state.lang.saving);

    // HTML элементы
    const root: HTMLDivElement = document.querySelector('#root');
    this.scene.mainInput = document.createElement('input');
    this.scene.secondInput = document.createElement('input');
    root.append(this.scene.mainInput);
    root.append(this.scene.secondInput);
    this.scene.mainInput.setAttribute("id", "reg-login");
    this.scene.mainInput.setAttribute("autocomplete", "off");
    this.scene.secondInput.setAttribute("id", "reg-pass");
    this.scene.secondInput.setAttribute("autocomplete", "off");
    this.scene.secondInput.setAttribute("type", "password");
    
    // Параметры
    let centered: boolean = true;
    let padding: number = this.scene.cameras.main.height / 100 * 22;
    let modalElement: modalElementType[] = [];
    let tempHeight: number = window.innerHeight;
    const windowHeight: number = window.innerHeight;
    
    // Отрисовка текста, полученного из инпут + placeholder
    const loginText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 220, this.scene.cameras.main.centerY - 113, this.scene.state.lang.loginSixSymbols, {
      font: '24px Bip',
      color: '#974f00'
    }).setOrigin(0, 0.5).setDepth(4).setCrop(0, 0, 434, 100);

    // Отрисовка текста, полученного из инпут + placeholder
    const passText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 220, this.scene.cameras.main.centerY - 18, this.scene.state.lang.passSixSymbols, {
      font: '24px Bip',
      color: '#974f00'
    }).setOrigin(0, 0.5).setDepth(4).setCrop(0, 0, 434, 100);

    // Зоны
    const regModalZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 710, 1200).setDropZone(undefined, () => {}).setInteractive();
    const loginInputZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 113, 460, 70).setDropZone(undefined, () => {}).setInteractive();
    const passTextareaZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 18, 460, 70).setDropZone(undefined, () => {}).setInteractive();

    // Фон логина
    const loginBG: Phaser.GameObjects.Graphics = this.scene.add.graphics({
      x: this.scene.cameras.main.centerX - 230,
      y: this.scene.cameras.main.centerY - 149
    }).setDepth(2).fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 460, 70, 16);

    // Фон пароля
    const passBG: Phaser.GameObjects.Graphics = this.scene.add.graphics({
      x: this.scene.cameras.main.centerX - 230,
      y: this.scene.cameras.main.centerY - 53
    }).setDepth(2).fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 460, 70, 16);

    const regBtn = this.scene.bigButton('green', 'center', 130, this.scene.state.lang.save);
    regBtn.btn.y = this.scene.cameras.main.centerY + 80;
    regBtn.title.y = this.scene.cameras.main.centerY + 74;

    const logoutBtnText: string = this.scene.state.lang.profileExit.replace('\n', ' ');
    const logoutBtn = this.scene.bigButton('red', 'center', 130, logoutBtnText);
    logoutBtn.btn.y = this.scene.cameras.main.centerY + 166;
    logoutBtn.title.y = this.scene.cameras.main.centerY + 160;

    this.result = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 180, '', {
      font: '19px Shadow',
      color: '#FF0000',
      align: 'center',
      wordWrap: { width: 500 }
    }).setOrigin(0.5, 1).setDepth(4).setAlpha(0);

    modalElement.push(
      this.scene.header,
      this.scene.body,
      this.scene.bottom,
      this.scene.close,
      this.scene.textHeader,
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
      this.result
    );
    
    // resize
    window.onresize = (): void => {
      tempHeight = window.innerHeight;

      if (windowHeight !== tempHeight && centered) {

        root.scrollIntoView(false);
        modalElement.forEach((el) => el.setY(el.y + padding));
        this.scene.mainInput.style.top = '59.5%';
        this.scene.mainInput.style.bottom = '34.5%';
        this.scene.secondInput.style.top = '67.5%';
        this.scene.secondInput.style.bottom = '26.5%';
        centered = false;

      } else if (windowHeight === tempHeight && !centered) {
            
        modalElement.forEach((el) => el.setY(el.y - padding));
        this.scene.mainInput.style.top = '37.5%';
        this.scene.mainInput.style.bottom = '56.5%';
        this.scene.secondInput.style.top = '45.5%';
        this.scene.secondInput.style.bottom = '48.5%';
        centered = true;

      }
    }
    
    // Фокус на логин
    loginInputZone.on('pointerdown', (): void => {
      this.scene.secondInput.style.display = 'none';
      this.scene.mainInput.style.display = 'block';
      this.scene.mainInput.focus();
      
      if (this.scene.secondInput.value === '') passText.setText(this.scene.state.lang.passSixSymbols).setDepth(4).setCrop(0, 0, 434, 100);
      else passText.setText(this.hidePass()).setDepth(4).setCrop(0, 0, 434, 100);
      
      if (!this.isLoginTouched) this.isLoginTouched = true;
      this.validate();
    });

    // Фокус на пароль
    passTextareaZone.on('pointerdown', (): void => {
      this.scene.mainInput.style.display = 'none';
      this.scene.secondInput.style.display = 'block';
      this.scene.secondInput.focus();

      if (this.scene.mainInput.value === '') loginText.setText(this.scene.state.lang.loginSixSymbols).setDepth(4).setCrop(0, 0, 434, 100);
      else loginText.setText(this.scene.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
      
      if (!this.isPassTouched) this.isPassTouched = true;
      this.validate();
    });

    // Блюр
    regModalZone.on('pointerdown', (): void => {
      this.scene.mainInput.style.display = 'none';
      this.scene.secondInput.style.display = 'none';
      this.scene.mainInput.blur();
      this.scene.secondInput.blur();

      if (this.scene.mainInput.value === '') loginText.setText(this.scene.state.lang.loginSixSymbols).setDepth(4).setCrop(0, 0, 434, 100)
      else loginText.setText(this.scene.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
      
      if (this.scene.secondInput.value === '') passText.setText(this.scene.state.lang.passSixSymbols).setDepth(4).setCrop(0, 0, 434, 100)
      else passText.setText(this.hidePass()).setDepth(4).setCrop(0, 0, 434, 100);

      this.validate();
    });

    // Отправка
    this.scene.clickModalBtn(regBtn, (): void => {
      this.scene.mainInput.blur();
      this.scene.secondInput.blur();
      this.registration();
    });

    this.scene.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.scene.enterKey.on('down', (): void => {
      this.scene.mainInput.blur();
      this.scene.secondInput.blur();
      this.registration();
    });
    
    // Выход
    this.scene.clickModalBtn(logoutBtn, (): void => {
      document.cookie = "farmHASH=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      LocalStorage.set('farm', '');
      window.location.reload();
    });

    this.scene.resizeWindow(360);
  }


  private hidePass(): string {
    let output: string = '';
    let i: number = 0;

    while (i < this.scene.secondInput.value.length) {
      output += '*';
      i++;
    }

    return output
  }


  private validate(): void {
    if (
      this.errorType === 'validLoginPass' &&
      this.re.test(this.scene.mainInput.value) &&
      this.re.test(this.scene.secondInput.value) &&
      this.scene.mainInput.value.length >= 6 &&
      this.scene.secondInput.value.length >= 6 &&
      this.isLoginTouched &&
      this.isPassTouched
    ) {

      this.scene.resizeWindowTop(-(this.extraHeight + 20));
      this.result.setAlpha(0);
      this.errorType = '';

    } else if (this.errorType === 'haveAccaunt' && this.lastLogin !== this.scene.mainInput.value) {

      this.scene.resizeWindowTop(-(this.extraHeight + 20));
      this.result.setAlpha(0);
      this.errorType = '';

    }
  }

  private registration(): void {
    if (!this.reg) {
      
      let checkLogin: boolean = true;
      let checkPass: boolean = true;
      checkLogin = this.re.test(this.scene.mainInput.value);
      checkPass = this.re.test(this.scene.secondInput.value);
      
      if (this.scene.mainInput.value.length < 6) checkLogin = false;
      if (this.scene.secondInput.value.length < 6) checkPass = false;

      if (checkLogin && checkPass) {

        this.reg = true;
        
        axios.post(process.env.API + '/registration', {
          id: this.scene.state.user.id,
          hash: this.scene.state.user.hash,
          counter: this.scene.state.user.counter,
          login: this.scene.mainInput.value,
          pass: this.scene.secondInput.value
        }).then((res) => {

          if (res.data.error) window.location.reload();
          else {

            this.reg = false;

            if (res.data.success) {

              let tasks: Itasks[] = this.scene.game.scene.keys[this.scene.state.farm].partTasks();
              let task: Itasks = tasks.find((data: Itasks) => data.type === 10);

              if (task) {
                this.scene.game.scene.keys[this.scene.state.farm].takeRewardRegistration = true;
                this.scene.game.scene.keys[this.scene.state.farm].tryTask(10, 1);
              }

              this.scene.state.user.login = this.scene.mainInput.value;
              document.cookie = "farmHASH=" + res.data.hash + "; expires=" + res.data.expires + "; path=/;";
              this.scene.state.user.hash = res.data.hash;
              this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
              this.scene.enterKey.destroy();
              this.scene.secondInput.remove();
              this.scene.mainInput.remove();
              this.scene.scene.stop();

            } else {

              this.lastLogin = this.scene.mainInput.value;
              this.result.setText(this.scene.state.lang.haveAccaunt).setAlpha(1);
              this.setExtraHeight();
              this.errorType = 'haveAccaunt';
          
            }

          }

        });

      } else {
        
        this.result.setText(this.scene.state.lang.validLoginPass).setAlpha(1);
        this.setExtraHeight();
        this.errorType = 'validLoginPass';
        
      }
    }
  }


  private setExtraHeight(): void {
    if (this.errorType === '') {
      this.extraHeight = this.result.getBounds().height
      this.scene.resizeWindowTop(this.extraHeight + 20);
    } else if (this.errorType === 'haveAccaunt' || this.errorType === 'validLoginPass') {
      this.scene.resizeWindowTop(-(this.extraHeight + 20));
      this.extraHeight = this.result.getBounds().height
      this.scene.resizeWindowTop(this.extraHeight + 20);
    }
  }

}