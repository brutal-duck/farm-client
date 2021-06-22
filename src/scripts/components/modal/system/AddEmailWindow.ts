import axios from "axios";
import { logout } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class AddEmailWindow {
  public scene: Modal;

  private enterEmail: Phaser.GameObjects.Text
  private result: Phaser.GameObjects.Text;
  private send: boolean
  private emailError: boolean
  private reMail: RegExp

  constructor(scene: Modal) {
    this.scene = scene;
    this.init()
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.send = false
    this.emailError = false
    this.reMail = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i
  }

  private create(): void {

    // Заголовок и описание
    this.scene.textHeader.setText(this.scene.state.lang.yourMail);
    this.enterEmail = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, this.scene.state.lang.enterYourEmail, {
      font: '28px Shadow',
      color: '#974f00'
    }).setOrigin(0.5, 0.5).setDepth(3);

    // HTML элементы
    let root: HTMLDivElement = document.querySelector('#root');
    this.scene.mainInput = document.createElement('input');
    root.append(this.scene.mainInput);
    this.scene.mainInput.setAttribute("id", "nickname");
    this.scene.mainInput.setAttribute("autocomplete", "off");
    
    // Параметры
    let centered: boolean = true;
    let padding: number = this.scene.cameras.main.height / 100 * 30;
    let modalElement: modalElementType[] = [];
    let tempHeight: number = window.innerHeight;
    const windowHeight: number = window.innerHeight;

    // Отрисовка текста, полученного из инпут
    let emailText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 220, this.scene.cameras.main.centerY + 35, this.scene.mainInput.value, {
      font: '24px Bip',
      color: '#974f00'
    }).setOrigin(0, 0.5).setDepth(3).setCrop(0, 0, 434, 100);
    
    let emailModalZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 710, 1200).setDropZone(undefined, () => {}).setInteractive();
    let emailInputZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 36, 460, 70).setDropZone(undefined, () => {}).setInteractive();
    
    // Фон инпута
    let emailBG: Phaser.GameObjects.Graphics = this.scene.add.graphics({
      x: this.scene.cameras.main.centerX - 230,
      y: this.scene.cameras.main.centerY
    }).setDepth(2).fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 460, 70, 16);

    // Кнопка
    let sendEmailBtn = this.scene.bigButton('green', 'center', 130, this.scene.state.lang.sendEmail);
    this.result = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 90, '', {
      font: '19px Shadow',
      color: '#FF0000',
      align: 'center',
      wordWrap: { width: 520 }
    }).setOrigin(0.5, 0.5).setDepth(4).setAlpha(0);

    modalElement.push(
      this.scene.header,
      this.scene.body,
      this.scene.bottom,
      this.scene.close,
      this.scene.textHeader,
      this.enterEmail,
      emailText,
      emailInputZone,
      emailBG,
      sendEmailBtn.btn,
      sendEmailBtn.title,
      this.result
    );    


    window.onresize = (): void => {
        
      tempHeight = window.innerHeight;

      if (windowHeight !== tempHeight && centered) {

        root.scrollIntoView(false);
        modalElement.forEach((el) => el.setY(el.y + padding));
        this.scene.mainInput.style.top = '80%';
        this.scene.mainInput.style.bottom = '14%';
        centered = false;

      } else if (windowHeight === tempHeight && !centered) {
            
        modalElement.forEach((el) => el.setY(el.y - padding));
        this.scene.mainInput.style.top = '50%';
        this.scene.mainInput.style.bottom = '44%';
        centered = true;

      }
      
    }

    // Фокус
    emailInputZone.on('pointerdown', (): void => {
      this.scene.mainInput.style.display = 'block';
      this.scene.mainInput.focus();
    });

    // Блюр
    emailModalZone.on('pointerdown', (): void => {
      this.scene.mainInput.style.display = 'none';
      this.scene.mainInput.blur();
      emailText.setText(this.scene.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
    });

    // Отправка почты
    this.scene.clickModalBtn(sendEmailBtn, (): void => { this.sendEmail() });
    this.scene.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.scene.enterKey.on('down', (): void => { this.sendEmail() });

    this.scene.resizeWindow(270);
  
  }

  private sendEmail(): void {

    if (!this.send) {

      if (this.reMail.test(this.scene.mainInput.value)) {

        this.send = true;

        axios.post(process.env.API + '/sendEmail', {
          id: this.scene.state.user.id,
          hash: this.scene.state.user.hash,
          counter: this.scene.state.user.counter,
          mail: this.scene.mainInput.value
        }).then((res) => {

          if (res.data.error) logout();
          else {

            this.send = false;
            this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
            this.scene.enterKey.destroy()
            this.scene.mainInput.remove();
            this.scene.scene.stop();
            this.scene.game.scene.keys[this.scene.state.farm].tryTask(16, 1);

          }

        });

      } else {

        if (!this.emailError) this.enterEmail.setY(this.enterEmail.y + 34);
        this.emailError = true;
        this.result.setText(this.scene.state.lang.emailError).setAlpha(1);

      }

    }

  }

}