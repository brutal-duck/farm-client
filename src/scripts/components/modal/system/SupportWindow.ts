import axios from "axios";
import Modal from "../../../scenes/Modal/Modal";

export default class SupportWindow {
  public scene: Modal;

  private send: boolean;
  private sendError: boolean;
  private reMail: RegExp;
  private isInputTouched: boolean;
  private isTextareaTouched: boolean;
  private result: Phaser.GameObjects.Text;
  private description: Phaser.GameObjects.Text;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.send = false;
    this.sendError = false;
    this.reMail = /^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i;
    this.isInputTouched = false;
    this.isTextareaTouched = false;
  }

  private create(): void {
    // Заголовок и описание
    this.scene.textHeader.setText(this.scene.state.lang.help);
    this.description = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 216, this.scene.state.lang.needHelp, {
      font: '24px Bip',
      color: '#974f00',
      align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5, 0.5).setDepth(3);

    // HTML элементы
    let root: HTMLDivElement = document.querySelector('#root');
    this.scene.mainInput = document.createElement('input');
    this.scene.secondInput = document.createElement('textarea');
    root.append(this.scene.mainInput);
    root.append(this.scene.secondInput);
    this.scene.mainInput.setAttribute("id", "sup-email");
    this.scene.mainInput.setAttribute("autocomplete", "off");
    this.scene.secondInput.setAttribute("id", "sup-msg");
    this.scene.secondInput.setAttribute("autocomplete", "off");
    
    // Параметры
    let centered: boolean = true;
    let padding: number = this.scene.cameras.main.height / 100 * 15;
    let modalElement: modalElementType[] = [];
    let tempHeight: number = window.innerHeight;
    const windowHeight: number = window.innerHeight;

    // Отрисовка текста, полученного из инпут + placeholder
    const emailText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 220, this.scene.cameras.main.centerY - 101, this.scene.state.lang.yourMail, {
      font: '24px Bip',
      color: '#974f00'
    }).setOrigin(0, 0.5).setDepth(4).setCrop(0, 0, 434, 100);

    // Отрисовка текста, полученного из текстэрии + placeholder
    const msgText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 220, this.scene.cameras.main.centerY - 42, this.scene.state.lang.yourMessage, {
      font: '25px Bip',
      color: '#974f00',
      align: 'left',
      wordWrap: { width: 444 }
    }).setOrigin(0, 0).setDepth(4).setCrop(0, 0, 445, 254);
    
    // Зоны
    const helpModalZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 710, 1200).setDropZone(undefined, () => {}).setInteractive();
    const helpInputZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 101, 460, 70).setDropZone(undefined, () => {}).setInteractive();
    const helpTextareaZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 84, 460, 260).setDropZone(undefined, () => {}).setInteractive();

    // Фон инпута
    const emailBG: Phaser.GameObjects.Graphics = this.scene.add.graphics({
      x: this.scene.cameras.main.centerX - 230,
      y: this.scene.cameras.main.centerY - 137
    }).setDepth(2).fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 460, 70, 16);

    // Фон текстэрии
    const msgBG: Phaser.GameObjects.Graphics = this.scene.add.graphics({
      x: this.scene.cameras.main.centerX - 230,
      y: this.scene.cameras.main.centerY - 46
    }).setDepth(2).fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 460, 260, 16);

    // Кнопка
    const sendMsgBtn = this.scene.bigButton('green', 'center', 130, this.scene.state.lang.send);
    sendMsgBtn.btn.y = this.scene.cameras.main.centerY + 280
    sendMsgBtn.title.y = this.scene.cameras.main.centerY + 274
    this.result = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 166, '', {
      font: '21px Shadow',
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
      this.description,
      emailText,
      msgText,
      helpInputZone,
      helpTextareaZone,
      emailBG,
      msgBG,
      sendMsgBtn.btn,
      sendMsgBtn.title,
      this.result
    );
    
    // resize
    window.onresize = (): void => {
      tempHeight = window.innerHeight;

      if (windowHeight !== tempHeight && centered) {

        root.scrollIntoView(false);
        modalElement.forEach((el) => el.setY(el.y + padding));
        this.scene.mainInput.style.top = '53.5%';
        this.scene.mainInput.style.bottom = '40.5%';
        this.scene.secondInput.style.top = '61%';
        this.scene.secondInput.style.bottom = '17%';
        centered = false;

      } else if (windowHeight === tempHeight && !centered) {
              
        modalElement.forEach((el) => el.setY(el.y - padding));
        this.scene.mainInput.style.top = '38.5%';
        this.scene.mainInput.style.bottom = '55.5%';
        this.scene.secondInput.style.top = '46%';
        this.scene.secondInput.style.bottom = '32%';
        centered = true;

      }
    }

    // Фокус на инпут
    helpInputZone.on('pointerdown', (): void => {
      this.scene.secondInput.style.display = 'none';
      this.scene.mainInput.style.display = 'block';
      this.scene.secondInput.blur();
      this.scene.mainInput.focus();

      msgText.setText(this.scene.secondInput.value).setDepth(4).setCrop(0, 0, 445, 254);
      if (this.scene.secondInput.value === '') msgText.setText(this.scene.state.lang.yourMessage).setDepth(4).setCrop(0, 0, 434, 100);

      if (!this.isInputTouched) this.isInputTouched = true;
      this.validate('textarea');
    });

    // Фокус на текстэрия
    helpTextareaZone.on('pointerdown', (): void => {
      this.scene.mainInput.style.display = 'none';
      this.scene.secondInput.style.display = 'block';
      this.scene.mainInput.blur();
      this.scene.secondInput.focus();

      emailText.setText(this.scene.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
      if (this.scene.mainInput.value === '') emailText.setText(this.scene.state.lang.yourMail).setDepth(4).setCrop(0, 0, 434, 100);

      if (!this.isTextareaTouched) this.isTextareaTouched = true;
      this.validate('input');
    });

    // Блюр
    helpModalZone.on('pointerdown', (): void => {
      this.scene.mainInput.style.display = 'none';
      this.scene.secondInput.style.display = 'none';
      this.scene.mainInput.blur();
      this.scene.secondInput.blur();

      emailText.setText(this.scene.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
      msgText.setText(this.scene.secondInput.value).setDepth(4).setCrop(0, 0, 445, 254);
      if (this.scene.mainInput.value === '') emailText.setText(this.scene.state.lang.yourMail).setDepth(4).setCrop(0, 0, 434, 100);
      if (this.scene.secondInput.value === '') msgText.setText(this.scene.state.lang.yourMessage).setDepth(4).setCrop(0, 0, 434, 100);
      this.validate();
    });

    // Отправка
    this.scene.clickModalBtn(sendMsgBtn, (): void => {
      this.scene.mainInput.blur();
      this.scene.secondInput.blur();
      this.sendToSupport();
    });

    this.scene.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.scene.enterKey.on('down', (): void => {
      this.scene.mainInput.blur();
      this.scene.secondInput.blur();
      this.sendToSupport();
    });
    
    this.scene.resizeWindow(580);
  }

  
  private validate(elements: string = 'all'): void {
    if (elements === 'all' || elements === 'input') {
      if (this.sendError && this.reMail.test(this.scene.mainInput.value) && this.isInputTouched && this.result.text === this.scene.state.lang.emailError) {
        this.description.setY(this.description.y + 24);
        this.result.setAlpha(0);
        this.sendError = false;
      }
    }

    if (elements === 'all' || elements === 'textarea') {
      if (this.sendError && this.scene.secondInput.value !== '' && this.isTextareaTouched && this.result.text === this.scene.state.lang.messageError) {
        this.description.setY(this.description.y + 24);
        this.result.setAlpha(0);
        this.sendError = false;
      }
    }
  }


  private sendToSupport(): void {
    if (!this.send) {

      if (this.reMail.test(this.scene.mainInput.value)) {

        if (this.scene.secondInput.value !== '') {

          this.send = true;

          axios.post(process.env.API + '/sendToSupport', {
            id: this.scene.state.user.id,
            hash: this.scene.state.user.hash,
            counter: this.scene.state.user.counter,
            mail: this.scene.mainInput.value,
            message: this.scene.secondInput.value,
            platform: this.scene.state.platform
          })
          .then((res) => {

            if (res.data.error) window.location.reload();
            else {

              this.scene.game.scene.keys[this.scene.state.farm].messageIsSent();
              this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
              this.scene.enterKey.destroy();
              this.scene.secondInput.remove();
              this.scene.mainInput.remove();
              this.scene.scene.stop();  

            }

          });

        } else {

          if (!this.sendError) this.description.setY(this.description.y - 24);
          this.sendError = true;
          this.result.setText(this.scene.state.lang.messageError).setAlpha(1);
  
        }

      } else {
  
        if (!this.sendError) this.description.setY(this.description.y - 24);
        this.sendError = true;
        this.result.setText(this.scene.state.lang.emailError).setAlpha(1);
  
      }
    }
  }
}