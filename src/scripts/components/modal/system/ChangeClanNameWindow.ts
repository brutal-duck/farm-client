import axios from "axios";
import Modal from "../../../scenes/Modal/Modal";

export default class ChangeClanNameWindow {
  private scene: Modal;

  private result: Phaser.GameObjects.Text;
  private change: boolean;
  private x: number;
  private y: number;

  private modalElements: Array<modalElementType> = [];
  private inputText: Phaser.GameObjects.Text;
  private input: HTMLInputElement;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.change = false;
    this.scene.textHeader.setText(this.scene.state.lang.changeClanName);

    this.scene.events.once(Phaser.Scenes.Events.SHUTDOWN,() => {
      this.removeInput();
    });
  }

  private create(): void {
    const inputTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '22px',
      fontFamily: 'Bip',
      color: '#8f8f8f',
    };

    const pos: Iposition = {
      x: this.x,
      y: this.y,
    };

    // HTML элементы
    const root: HTMLDivElement = document.querySelector('#root');
    this.input = document.createElement('input');
    root.append(this.input);
    this.input.setAttribute("id", "clanname");
    this.input.setAttribute("autocomplete", "off");
    const height = Number(this.scene.game.config.height) / 12 - 100;
    const startTop: number = 45;
    const startBottom: number = 49;
    this.input.style.top = `${startTop + height / 4}%`;
    this.input.style.bottom = `${startBottom - height / 4}%`;
    const inputWidth: number = 460;
    const inputHeigth: number = 70;
    const inputBg = this.scene.add.graphics().fillStyle(0xffffff, 1).fillRoundedRect(pos.x - inputWidth / 2, pos.y - 20 - inputHeigth / 2, inputWidth, inputHeigth, 10);
    const inputBgGeom = {
      left: pos.x - inputWidth / 2,
      centerY: pos.y - 20,
      top: pos.y - 20 - inputHeigth / 2,
    };
    const modalZone = this.scene.add.zone(0, 0, this.scene.cameras.main.width, this.scene.cameras.main.height).setDropZone(undefined, () => {}).setOrigin(0);
    const inputZone = this.scene.add.zone(pos.x - inputWidth / 2, pos.y - 20 - inputHeigth / 2, inputWidth, inputHeigth).setDropZone(undefined, () => {}).setOrigin(0);
    // Заголовок и описание
    this.inputText = this.scene.add.text(inputBgGeom.left + 15, inputBgGeom.centerY, this.scene.state.lang.inputClanName, inputTextStyle).setOrigin(0, 0.5).setDepth(5);

    // Параметры
    let centered: boolean = true;
    let padding: number;
    let tempHeight: number = window.innerHeight;
    const windowHeight: number = window.innerHeight;
    // Кнопка
    const right1 = {
      text: 100,
      icon: 'diamond'
    };
    const changeNameBtn = this.scene.bigButton('green', 'left', 90, this.scene.state.lang.changeClanName, right1);
    const errorTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '19px',
      color: '#DC3D00',
      align: 'center',
      wordWrap: { width: 460, useAdvancedWrap: true },
    };
    this.result = this.scene.add.text(pos.x, inputBgGeom.top - 10, '', errorTextStyle).setOrigin(0.5, 1).setDepth(4).setAlpha(0);

    padding = this.scene.cameras.main.height / 100 * 30;
    this.modalElements.push(
      this.scene.header,
      this.scene.body,
      this.scene.bottom,
      this.scene.close,
      this.scene.textHeader,
      this.inputText,
      inputZone,
      inputBg,
      changeNameBtn.btn,
      changeNameBtn.title,
      changeNameBtn.text1,
      changeNameBtn.img1,
      this.result,
    );

    window.onresize = (): void => {
      tempHeight = window.innerHeight;

      if (windowHeight !== tempHeight && centered) {
        root.scrollIntoView(false)
        this.modalElements.forEach((el) => el.setY(el.y + padding));
        const height = Number(this.scene.game.config.height) / 12 - 100;
        const startTop: number = 75;
        const startBottom: number = 19;
        this.input.style.top = `${startTop + height / 4}%`;
        this.input.style.bottom = `${startBottom - height / 4}%`;
        centered = false;

      } else if (windowHeight === tempHeight && !centered) {
        this.modalElements.forEach((el) => el.setY(el.y - padding));
        const height = Number(this.scene.game.config.height) / 12 - 100;
        const startTop: number = 45;
        const startBottom: number = 49;
        this.input.style.top = `${startTop + height / 4}%`;
        this.input.style.bottom = `${startBottom - height / 4}%`;
        centered = true;
      }
    }

    // Фокус
    this.scene.click(inputZone, (): void => {
      this.input.style.display = 'block';
      this.input.focus();
      this.inputText.setVisible(false);
    });

    this.scene.click(modalZone, (): void => {
      this.input.style.display = 'none';
      this.input.blur();
      const text: string = this.input.value ? this.input.value : this.scene.state.lang.inputClanName;
      const color: string = this.input.value ? '#974f00' : '#8f8f8f';
      this.inputText.setText(text).setColor(color).setDepth(4).setCrop(0, 0, 280, 100).setVisible(true);
    });

    // Кнопка смены ника
    this.scene.clickModalBtn(changeNameBtn, (): void => { this.changeClanName(); });
    this.scene.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.scene.enterKey.on('down', (): void => { this.changeClanName(); });
    this.scene.resizeWindow(220);
  }

  private changeClanName(): void {
    if (!this.change) {

      let checkName: boolean = true;
      const re: RegExp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;
      checkName = re.test(this.input.value);
          
      if (this.input.value.length < 6 || this.input.value.length > 20) checkName = false;
      
      if (checkName) {
        this.change = true;
        axios.post(process.env.API + '/changeClanName', {
          clanId: this.scene.state.clan.id,
          userId: this.scene.state.user.id,
          hash: this.scene.state.user.hash,
          counter: this.scene.state.user.counter,
          name: this.input.value,
        }).then((res) => {
          if (res.data.error) {
            this.change = false;
              this.result.setText(this.scene.state.lang.haveClan).setAlpha(1);
              this.scene.resizeWindow(230);
          } else {          
            this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
            this.scene.enterKey.destroy();
            this.removeInput();
            this.input.remove();
            this.scene.scene.stop();
          }
        });
      } else {
        this.result.setText(this.scene.state.lang.validClanName).setAlpha(1);
        this.scene.resizeWindow(290);
      }
    }
  }

  private removeInput(): void {
    this.input?.remove();
    this.scene.enterKey?.destroy();
  }
}