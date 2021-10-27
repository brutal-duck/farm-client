import axios from "axios";
import Modal from "../../../scenes/Modal/Modal";
import Chicken from './../../../scenes/Chicken/Main';

export default class RecallWindow {
  public scene: Modal;

  private result: Phaser.GameObjects.Text;
  private description: Phaser.GameObjects.Text;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    // Заголовок и описание
    this.scene.textHeader.setText(this.scene.state.lang.recall);
    this.description = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 170, this.scene.state.lang.recallText, {
      font: '24px Bip',
      color: '#974f00',
      align: 'center',
      wordWrap: { width: 400 }
    }).setOrigin(0.5, 0.5).setDepth(3);

    // HTML элементы
    let root: HTMLDivElement = document.querySelector('#root');
    this.scene.secondInput = document.createElement('textarea');
    root.append(this.scene.secondInput);
    this.scene.secondInput.setAttribute("id", "sup-msg");
    this.scene.secondInput.setAttribute("autocomplete", "off");
    
    // Параметры
    let centered: boolean = true;
    let padding: number = this.scene.cameras.main.height / 100 * 15;
    let modalElement: modalElementType[] = [];
    let tempHeight: number = window.innerHeight;
    const windowHeight: number = window.innerHeight;
    this.scene.secondInput.style.top = '42%';
    this.scene.secondInput.style.bottom = '36%';
    
    // Отрисовка текста, полученного из текстэрии + placeholder
    const msgText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 220, this.scene.cameras.main.centerY - 82, this.scene.state.lang.yourRecall, {
      font: '25px Bip',
      color: '#974f00',
      align: 'left',
      wordWrap: { width: 444 }
    }).setOrigin(0, 0).setDepth(4).setCrop(0, 0, 445, 254);
    
    // Зоны
    const helpModalZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 710, 1200).setDropZone(undefined, () => {}).setInteractive();
    const helpTextareaZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 84, 460, 260).setDropZone(undefined, () => {}).setInteractive();

    // Фон текстэрии
    const msgBG: Phaser.GameObjects.Graphics = this.scene.add.graphics({
      x: this.scene.cameras.main.centerX - 230,
      y: this.scene.cameras.main.centerY - 96
    }).setDepth(2).fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 460, 260, 16);

    // Кнопка
    const sendMsgBtn = this.scene.bigButton('green', 'center', 110, this.scene.state.lang.recallBtn);
    sendMsgBtn.btn.y = this.scene.cameras.main.centerY + 280 - 50;
    sendMsgBtn.title.y = this.scene.cameras.main.centerY + 274 - 50;
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
      msgText,
      helpTextareaZone,
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
        this.scene.secondInput.style.top = '57%';
        this.scene.secondInput.style.bottom = '21%';
        centered = false;

      } else if (windowHeight === tempHeight && !centered) {
              
        modalElement.forEach((el) => el.setY(el.y - padding));
        this.scene.secondInput.style.top = '42%';
        this.scene.secondInput.style.bottom = '36%';
        centered = true;

      }
    }

    // Фокус на текстэрия
    helpTextareaZone.on('pointerdown', (): void => {
      this.scene.secondInput.style.display = 'block';
      this.scene.secondInput.focus();
    });

    // Блюр
    helpModalZone.on('pointerdown', (): void => {
      this.scene.secondInput.style.display = 'none';
      this.scene.secondInput.blur();

      msgText.setText(this.scene.secondInput.value).setDepth(4).setCrop(0, 0, 445, 254);
      if (this.scene.secondInput.value === '') msgText.setText(this.scene.state.lang.yourRecall).setDepth(4).setCrop(0, 0, 434, 100);
    });

    // Отправка
    this.scene.clickModalBtn(sendMsgBtn, (): void => {
      this.scene.secondInput.blur();
      this.sendToSupport();
    });

    this.scene.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.scene.enterKey.on('down', (): void => {
      this.scene.secondInput.blur();
      this.sendToSupport();
    });
    
    this.scene.resizeWindow(470);
  }

  private sendToSupport(): void {
    axios.post(process.env.API + '/sendToSupport', {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      message: this.scene.secondInput.value,
      platform: this.scene.state.platform
    });

    const mainScene = this.scene.scene.get(this.scene.state.farm) as Chicken;
    mainScene.time.addEvent({ delay: 1500, callback: (): void => {
      const modal: Imodal = {
        type: 1,
        sysType: 3,
        height: 150,
        message: mainScene.state.lang.yourRecallIsSent
      }
      mainScene.state.modal = modal;
      mainScene.scene.launch('Modal', mainScene.state);
    }, callbackScope: this, loop: false });

    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.enterKey.destroy();
    this.scene.secondInput.remove();
    this.scene.scene.stop();
  }
}