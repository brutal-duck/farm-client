import axios from "axios";
import Boot from "../../scenes/Boot";

export default class Login {
  public scene: Boot;

  private bg: Phaser.GameObjects.TileSprite;
  private bgOriginY: number;
  private bgOriginYNonCentered: number;
  private bgOriginHeight: number;
  private bgTop: Phaser.GameObjects.Sprite;
  private title: Phaser.GameObjects.Text;
  private regModalZone: Phaser.GameObjects.Zone;
  private enterKey: Phaser.Input.Keyboard.Key;

  private mainInput: HTMLInputElement;
  private secondInput: HTMLInputElement;
  private result: Phaser.GameObjects.Text;
  private elements: modalElementType[];
  private centered: boolean;

  private isLoginTouched: boolean;
  private isPassTouched: boolean;
  private currentHeight: number;
  private authorization: boolean;
  private re: RegExp;
  private errorType: string;

  constructor(scene: Boot) {
    this.scene = scene;
    this.init();
    this.create();
  }


  private init(): void {
    this.centered = true;
    this.elements = [];
    this.errorType = '';
    this.currentHeight = 0;
    this.re = /^[a-zA-Z0-9]+$/;
    this.isLoginTouched = false;
    this.isPassTouched = false;
    this.authorization = false;
  }


  private create(): void {
    this.bg = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 20, 614, 440, 'mid-syst').setDepth(2);
    this.bgOriginY = this.bg.y;
    this.bgOriginHeight = this.bg.height;
    this.bgTop = this.scene.add.sprite(this.bg.getTopCenter().x - 1, this.bg.getTopCenter().y + 13, 'header-syst').setOrigin(0.5, 1).setDepth(this.bg.depth + 1);
    const bgBottom: Phaser.GameObjects.Sprite =  this.scene.add.sprite(this.bg.getBottomCenter().x - 2, this.bg.getBottomCenter().y - 1, 'bottom-syst').setOrigin(0.5, 0).setDepth(this.bg.depth + 1);
    this.title = this.scene.add.text(this.bg.x, this.bg.getTopCenter().y + 26, this.scene.state.lang.authorize, { font: 'Bold 32px Shadow', color: '#925C28' }).setOrigin(0.5, 0).setDepth(this.bg.depth + 1);

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
    let padding: number = this.scene.cameras.main.height / 100 * 22;
    let tempHeight: number = window.innerHeight;
    const windowHeight: number = window.innerHeight;
    this.bgOriginYNonCentered = this.bgOriginY + padding;
    
    // Отрисовка текста, полученного из инпут + placeholder
    const loginText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 220, this.scene.cameras.main.centerY - 113, this.scene.state.lang.login, {
      font: '24px Bip',
      color: '#974f00'
    }).setOrigin(0, 0.5).setDepth(this.bg.depth + 2).setCrop(0, 0, 434, 100);

    // Отрисовка текста, полученного из инпут + placeholder
    const passText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 220, this.scene.cameras.main.centerY - 18, this.scene.state.lang.password, {
      font: '24px Bip',
      color: '#974f00'
    }).setOrigin(0, 0.5).setDepth(this.bg.depth + 2).setCrop(0, 0, 434, 100);

    // Зоны
    this.regModalZone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 710, 1200).setDropZone(undefined, () => {}).setInteractive();
    const loginInputZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 113, 460, 70).setDropZone(undefined, () => {}).setInteractive();
    const passTextareaZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 18, 460, 70).setDropZone(undefined, () => {}).setInteractive();

    // Фон логина
    const loginBG: Phaser.GameObjects.Graphics = this.scene.add.graphics({
      x: this.scene.cameras.main.centerX - 230,
      y: this.scene.cameras.main.centerY - 149
    }).setDepth(this.bg.depth + 1).fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 460, 70, 16);

    // Фон пароля
    const passBG: Phaser.GameObjects.Graphics = this.scene.add.graphics({
      x: this.scene.cameras.main.centerX - 230,
      y: this.scene.cameras.main.centerY - 53
    }).setDepth(this.bg.depth + 1).fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 460, 70, 16);

    const logBtn = this.scene.bigButton('green', 'center', 130, this.scene.state.lang.enter);
    logBtn.btn.setY(this.scene.cameras.main.centerY + 106).setDepth(this.bg.depth + 1).setScale(0.95);
    logBtn.title.setY(this.scene.cameras.main.centerY + 100).setDepth(this.bg.depth + 1);

    const logoutBtn = this.scene.bigButton('red', 'center', 130, this.scene.state.lang.cancel);
    logoutBtn.btn.setY(this.scene.cameras.main.centerY + 192).setDepth(this.bg.depth + 1).setScale(0.95);
    logoutBtn.title.setY(this.scene.cameras.main.centerY + 186).setDepth(this.bg.depth + 1);

    this.result = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 164, '', {
      font: '19px Shadow',
      color: '#FF0000',
      align: 'center',
      wordWrap: { width: 500 }
    }).setOrigin(0.5, 1).setDepth(this.bg.depth + 2).setAlpha(0);

    this.elements.push(
      this.bg,
      this.bgTop,
      bgBottom,
      this.title,
      loginText,
      passText,
      loginInputZone,
      passTextareaZone,
      loginBG,
      passBG,
      logBtn.btn,
      logBtn.title,
      logoutBtn.btn,
      logoutBtn.title,
      this.result
    );
    
    // resize
    window.onresize = (): void => {
      tempHeight = window.innerHeight;

      if (windowHeight !== tempHeight && this.centered) {

        root.scrollIntoView(false);
        this.elements.forEach((el) => el.setY(el.y + padding));
        this.mainInput.style.top = '59.5%';
        this.mainInput.style.bottom = '34.5%';
        this.secondInput.style.top = '67.5%';
        this.secondInput.style.bottom = '26.5%';
        this.centered = false;

      } else if (windowHeight === tempHeight && !this.centered) {
            
        this.elements.forEach((el) => el.setY(el.y - padding));
        this.mainInput.style.top = '37.5%';
        this.mainInput.style.bottom = '56.5%';
        this.secondInput.style.top = '45.5%';
        this.secondInput.style.bottom = '48.5%';
        this.centered = true;

      }
    }
    
    // Фокус на логин
    loginInputZone.on('pointerdown', (): void => {
      this.secondInput.style.display = 'none';
      this.mainInput.style.display = 'block';
      this.mainInput.focus();
      
      if (this.secondInput.value === '') passText.setText(this.scene.state.lang.password).setDepth(4).setCrop(0, 0, 434, 100);
      else passText.setText(this.hidePass()).setDepth(4).setCrop(0, 0, 434, 100);
      
      if (!this.isLoginTouched) this.isLoginTouched = true;
      this.validate();
    });

    // Фокус на пароль
    passTextareaZone.on('pointerdown', (): void => {
      this.mainInput.style.display = 'none';
      this.secondInput.style.display = 'block';
      this.secondInput.focus();

      if (this.mainInput.value === '') loginText.setText(this.scene.state.lang.login).setDepth(4).setCrop(0, 0, 434, 100);
      else loginText.setText(this.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
      
      if (!this.isPassTouched) this.isPassTouched = true;
      this.validate();
    });

    // Блюр
    this.regModalZone.on('pointerdown', (): void => {
      this.mainInput.style.display = 'none';
      this.secondInput.style.display = 'none';
      this.mainInput.blur();
      this.secondInput.blur();

      if (this.mainInput.value === '') loginText.setText(this.scene.state.lang.login).setDepth(4).setCrop(0, 0, 434, 100);
      else loginText.setText(this.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
      
      if (this.secondInput.value === '') passText.setText(this.scene.state.lang.password).setDepth(4).setCrop(0, 0, 434, 100);
      else passText.setText(this.hidePass()).setDepth(4).setCrop(0, 0, 434, 100);

      this.validate();
    });

    // Отправка
    this.scene.clickModalBtn(logBtn, (): void => {
      this.mainInput.blur();
      this.secondInput.blur();
      this.login();
    });

    this.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.enterKey.on('down', (): void => {
      this.mainInput.blur();
      this.secondInput.blur();
      this.login();
    });
    
    // Выход
    this.scene.clickModalBtn(logoutBtn, (): void => {
      this.scene.createLanding();
    });
  
  }


  private hidePass(): string {
    let output: string = '';
    let i: number = 0;

    while (i < this.secondInput.value.length) {
      output += '*';
      i++;
    }

    return output;
  }


  private validate(): void {
    if (
      this.errorType === 'validLoginPass' &&
      this.re.test(this.mainInput.value) &&
      this.re.test(this.secondInput.value) &&
      this.mainInput.value.length >= 6 &&
      this.secondInput.value.length >= 6 &&
      this.isLoginTouched &&
      this.isPassTouched
    ) {

      this.resizeWindow(0);
      this.result.setAlpha(0);
      this.errorType = '';

    } else if (this.errorType === 'wrongLoginPass') {

      this.resizeWindow(0);
      this.result.setAlpha(0);
      this.errorType = '';

    }
  }


  private login(): void {
    if (!this.authorization) {

      let checkLogin: boolean = true;
      let checkPass: boolean = true;
      checkLogin = this.re.test(this.mainInput.value);
      checkPass = this.re.test(this.secondInput.value);
      
      if (this.mainInput.value.length < 6) checkLogin = false;
      if (this.secondInput.value.length < 6) checkPass = false;

      if (checkLogin && checkPass) {

        this.authorization = true;

        axios.post(process.env.API + '/authorization', {
          login: this.mainInput.value,
          pass: this.secondInput.value
        }).then((response) => {

          this.authorization = false;

          if (response.data.success) {
            this.enterKey.destroy();
            this.secondInput.remove();
            this.mainInput.remove();
            this.scene.setCookieHash(response.data.hash, response.data.expires);
          } else {
            this.result.setText(this.scene.state.lang.wrongLoginPass).setAlpha(1);
            this.resizeWindow(16);
            this.errorType = 'wrongLoginPass';
          }

        }).catch(() => {
          this.scene.createErrorWindow();
        });

      } else {

        this.result.setText(this.scene.state.lang.validLoginPass).setAlpha(1);
        this.resizeWindow(68);
        this.errorType = 'validLoginPass';

      }

    }
  }


  private resizeWindow(height: number): void {
    if (this.currentHeight !== height) {
      this.currentHeight = height;
      let y = this.centered ? this.bgOriginY : this.bgOriginYNonCentered;
      this.bg.setY(y - height / 2).setSize(this.bg.width, this.bgOriginHeight + height + 6);
      this.bgTop.setY(this.bg.getTopCenter().y + 15);
      this.title.setY(this.bg.getTopCenter().y + 20);
    }
  }


  public destroy(): void {
    this.secondInput.remove();
    this.mainInput.remove();
    this.regModalZone.destroy();
    this.elements.forEach(el => { el.destroy() });
  }
}