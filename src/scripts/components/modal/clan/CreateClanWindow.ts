import axios from "axios";
import Modal from "../../../scenes/Modal/Modal";
import ClanWindow from './ClanWindow';

export default class CreateClanWindow {
  private window: ClanWindow;
  private scene: Modal;

  private enterName: Phaser.GameObjects.Text;
  private result: Phaser.GameObjects.Text;
  private nameError: boolean;
  private change: boolean;
  private clanIsClosed: boolean = true;
  private switchBg: Phaser.GameObjects.Sprite;
  private switchTextOpen: Phaser.GameObjects.Text;
  private switchTextClose: Phaser.GameObjects.Text;
  private bg: Phaser.GameObjects.RenderTexture;
  private x: number;
  private y: number;

  private inputText: Phaser.GameObjects.Text;
  private input: HTMLInputElement;

  constructor(window: ClanWindow) {
    this.window = window;
    this.scene = window.scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.x = this.scene.cameras.main.centerX;
    this.y = this.scene.cameras.main.centerY;
    this.nameError = false;
    this.change = false;
    this.window.headerText.setText(this.scene.state.lang.clanСreation);
  }

  private create(): void {
    const inputTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '22px',
      fontFamily: 'Bip',
      color: '#8f8f8f',
    };

    const pos: Iposition = {
      x: this.scene.cameras.main.centerX,
      y: this.scene.cameras.main.centerY - 100,
    };

    // HTML элементы
    const root: HTMLDivElement = document.querySelector('#root');
    this.input = document.createElement('input');
    root.append(this.input);
    this.input.setAttribute("id", "clanname");
    this.input.setAttribute("autocomplete", "off");

    const inputWidth: number = 460;
    const inputHeigth: number = 70;
    const inputBg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(pos.x, pos.y - 20, inputWidth, inputHeigth, 'clan-window-search-plate-ns', 5).setDepth(2).setOrigin(0.5);
    const inputBgGeom: Phaser.Geom.Rectangle = inputBg.getBounds();
    // Заголовок и описание
    this.inputText = this.scene.add.text(inputBgGeom.left + 15, inputBgGeom.centerY, this.scene.state.lang.inputClanName, inputTextStyle).setOrigin(0, 0.5).setDepth(5);

    // Параметры
    let centered: boolean = true;
    let padding: number;
    let tempHeight: number = window.innerHeight;
    const windowHeight: number = window.innerHeight;

    this.switchBg = this.scene.add.sprite(pos.x, pos.y + 100, 'sys-switch');
    this.switchTextOpen = this.scene.add.text(pos.x - 90, pos.y + 100, this.scene.state.lang.clanIsOpen).setOrigin(0.5);
    this.switchTextClose = this.scene.add.text(pos.x + 90, pos.y + 100, this.scene.state.lang.clanIsClose).setOrigin(0.5);
    this.switchOpened();

    this.scene.click(this.switchBg, () => {
      this.switchOpened();
    });
    // Кнопка
    const createClanBtn = this.scene.bigButton('green', 'center', 250, this.scene.state.lang.createClan);
    this.result = this.scene.add.text(pos.x, pos.y - 100, '', {
      font: '19px Shadow',
      color: '#FF0000',
      align: 'center',
      wordWrap: { width: 520 }
    }).setOrigin(0.5, 0.5).setDepth(4).setAlpha(0);

    padding = this.scene.cameras.main.height / 100 * 30;
    this.window.modalElements.push(
      this.scene.header,
      this.scene.body,
      this.scene.bottom,
      this.scene.close,
      this.scene.textHeader,
      this.enterName,
      this.switchBg,
      this.switchTextOpen,
      this.switchTextClose,
      this.inputText,
      inputBg,
      createClanBtn.btn,
      createClanBtn.title,
      this.result,
    );

    window.onresize = (): void => {
      tempHeight = window.innerHeight;

      if (windowHeight !== tempHeight && centered) {

        root.scrollIntoView(false)
        this.window.modalElements.forEach((el) => el.setY(el.y + padding))
        this.input.style.top = '75%';
        this.input.style.bottom = '19%';
        centered = false;

      } else if (windowHeight === tempHeight && !centered) {
        
        this.window.modalElements.forEach((el) => el.setY(el.y - padding));
        this.input.style.top = '49%';
        this.input.style.bottom = '44%';
        centered = true;

      }
    }

    // Фокус
    this.scene.click(inputBg, (): void => {
      console.log('click')
      this.input.style.display = 'block';
      this.input.focus();
      this.inputText.setVisible(false);
      this.window.addWindowHeight(100);
    });

    this.scene.click(this.window.bg, (): void => {
      console.log('click bg')
      this.input.style.display = 'none';
      this.input.blur();
      const text: string = this.input.value ? this.input.value : this.scene.state.lang.inputClanName;
      const color: string = this.input.value ? '#974f00' : '#8f8f8f';
      this.inputText.setText(text).setColor(color).setDepth(4).setCrop(0, 0, 280, 100).setVisible(true);
    });

    // Кнопка смены ника
    this.scene.clickModalBtn(createClanBtn, (): void => { this.createClan(); });
    this.scene.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.scene.enterKey.on('down', (): void => { this.createClan(); });

    // this.scene.resizeWindow(310);
  }

  private switchOpened(): void {
    const textActiveStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '18px',
      color: '#fff3f3',
      wordWrap: { width: 50 },
      align: 'center',
      shadow: {
        offsetX: 2,
        offsetY: 3, 
        color: '#4f8c0088',
        blur: 2,
        fill: true,
      },
    };
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '16px',
      color: '#8e8e8e',
      wordWrap: { width: 50 },
      align: 'center',
      shadow: {
        offsetX: 0,
        offsetY: 0, 
        color: '#000000',
        blur: 0,
        fill: true,
      },
    };
    this.clanIsClosed = !this.clanIsClosed;
    this.switchBg.setFlipX(this.clanIsClosed);
    this.switchTextOpen.setStyle(!this.clanIsClosed ? textActiveStyle : textStyle);
    this.switchTextClose.setStyle(this.clanIsClosed ? textActiveStyle : textStyle);
  }

  private createClan(): void {
    if (!this.change) {

      let checkName: boolean = true;
      const re: RegExp = /[\p{Alpha}\p{M}\p{Nd}\p{Pc}\p{Join_C}]/gu;
      checkName = re.test(this.scene.mainInput.value);
          
      if (this.scene.mainInput.value.length < 6 || this.scene.mainInput.value.length > 20) checkName = false;
      
      if (checkName) {
        let login: string = this.scene.state.user.login;
        if (this.scene.state.platform !== 'web' && this.scene.state.platform !== 'android') login = this.scene.state.name;
        const avatar: string = Number(this.scene.state.user.avatar) > 0 ? this.scene.state.user.avatar : this.scene.state.avatar;
        const clanAvatar = {
          bg: Phaser.Math.Between(1, 10),
          frame: Phaser.Math.Between(1, 10),
          icon: Phaser.Math.Between(1, 10),
        };
        this.change = true;
        axios.post(process.env.API + '/createClan', {
          id: this.scene.state.user.id,
          hash: this.scene.state.user.hash,
          counter: this.scene.state.user.counter,
          name: this.scene.mainInput.value,
          isClosed: this.clanIsClosed,
          userName: login,
          userAvatar: avatar,
          userStatus: this.scene.state.user.status,
          avatar: clanAvatar,
        }).then((res) => {
          if (res.data.error) {
            this.change = false;
            if (!this.nameError) this.enterName.setY(this.enterName.y + 34);
              this.nameError = true;
              this.result.setText(this.scene.state.lang.haveClan).setAlpha(1);
              // this.scene.resizeWindow(350);
          } else {
            this.scene.state.user.clanId = res.data.result.id;
            this.scene.state.clan = res.data.result;

            this.scene.state.socket.io.emit('joinClanRoom', {
              clanId: this.scene.state.user.clanId,
            });
            
            this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
            this.scene.enterKey.destroy();
            this.scene.mainInput.remove();
            this.scene.scene.stop();
          }
        });
      } else {
        if (!this.nameError) this.enterName.setY(this.enterName.y + 24);
        this.nameError = true;
        this.result.setText(this.scene.state.lang.validNickname).setAlpha(1);
        // this.scene.resizeWindow(350);
      }
    }
  }
}