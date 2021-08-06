import axios from "axios";
import Modal from "../../../scenes/Modal/Modal";
import ClanWindow from './ClanWindow';
import LogoManager, { Icon } from './../../Utils/LogoManager';

export default class CreateClanWindow {
  private window: ClanWindow;
  private scene: Modal;

  private result: Phaser.GameObjects.Text;
  private change: boolean;
  private clanIsClosed: boolean = true;
  private switchBg: Phaser.GameObjects.Sprite;
  private switchTextOpen: Phaser.GameObjects.Text;
  private switchTextClose: Phaser.GameObjects.Text;
  private bg: Phaser.GameObjects.RenderTexture;
  private x: number;
  private y: number;
  private addHeightError: boolean;
  private addHeightFounded: boolean;
  private clanFlag: Phaser.GameObjects.Sprite;
  private avatar: IconfigIcon;
  private icon: Icon;

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
    const height = Number(this.scene.game.config.height) / 12 - 100;
    const startTop: number = 37;
    const startBottom: number = 57;
    this.input.style.top = `${startTop + height / 4}%`;
    this.input.style.bottom = `${startBottom - height / 4}%`;
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

    this.switchBg = this.scene.add.sprite(pos.x, inputBgGeom.bottom + 20, 'sys-switch').setOrigin(0.5, 0);
    const switchBgGeom: Phaser.Geom.Rectangle = this.switchBg.getBounds();
    this.switchTextOpen = this.scene.add.text(pos.x - 90, switchBgGeom.centerY, this.scene.state.lang.clanIsOpen).setOrigin(0.5);
    this.switchTextClose = this.scene.add.text(pos.x + 90, switchBgGeom.centerY, this.scene.state.lang.clanIsClose).setOrigin(0.5);
    this.switchOpened();

    this.scene.click(this.switchBg, () => {
      this.switchOpened();
    });
    // Кнопка
    const createClanBtn = this.scene.bigButton('green', 'center', 280, this.scene.state.lang.createClan);
    const errorTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '19px',
      color: '#DC3D00',
      align: 'center',
      wordWrap: { width: 460, useAdvancedWrap: true },
    };
    this.result = this.scene.add.text(pos.x, inputBgGeom.top - 10, '', errorTextStyle).setOrigin(0.5, 1).setDepth(4).setAlpha(0);

    padding = this.scene.cameras.main.height / 100 * 30;
    this.window.modalElements.push(
      this.scene.header,
      this.scene.body,
      this.scene.bottom,
      this.scene.close,
      this.scene.textHeader,
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
        this.window.modalElements.forEach((el) => el.setY(el.y + padding));
        const height = Number(this.scene.game.config.height) / 12 - 100;
        const startTop: number = 47;
        const startBottom: number = 47;
        this.input.style.top = `${startTop + height / 4}%`;
        this.input.style.bottom = `${startBottom - height / 4}%`;
        centered = false;

      } else if (windowHeight === tempHeight && !centered) {
        this.window.modalElements.forEach((el) => el.setY(el.y - padding));
        const height = Number(this.scene.game.config.height) / 12 - 100;
        const startTop: number = 37;
        const startBottom: number = 57;
        this.input.style.top = `${startTop + height / 4}%`;
        this.input.style.bottom = `${startBottom - height / 4}%`;
        centered = true;
      }
    }

    // Фокус
    this.scene.click(inputBg, (): void => {
      this.input.style.display = 'block';
      this.input.focus();
      this.inputText.setVisible(false);
    });

    this.scene.click(this.window.bg, (): void => {
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

    this.createClanFlag();
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
      checkName = re.test(this.input.value);
          
      if (this.input.value.length < 6 || this.input.value.length > 20) checkName = false;
      
      if (checkName) {
        let login: string = this.scene.state.user.login;
        if (this.scene.state.platform !== 'web' && this.scene.state.platform !== 'android') login = this.scene.state.name;
        const avatar: string = Number(this.scene.state.user.avatar) > 0 ? this.scene.state.user.avatar : this.scene.state.avatar;
        this.change = true;
        axios.post(process.env.API + '/createClan', {
          id: this.scene.state.user.id,
          hash: this.scene.state.user.hash,
          counter: this.scene.state.user.counter,
          name: this.input.value,
          isClosed: this.clanIsClosed,
          userName: login,
          userAvatar: avatar,
          userStatus: this.scene.state.user.status,
          avatar: this.avatar,
        }).then((res) => {
          if (res.data.error) {
            this.change = false;
              this.result.setText(this.scene.state.lang.haveClan).setAlpha(1);
              if (!this.addHeightError && !this.addHeightFounded) {
                this.addHeightFounded = true;
                this.window.addWindowHeight(10);
              } 
          } else {
            this.scene.state.user.clanId = res.data.result.id;
            this.scene.state.clan = res.data.result;

            this.scene.state.socket.io.emit('joinClanRoom', {
              clanId: this.scene.state.user.clanId,
            });
            
            this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
            this.scene.enterKey.destroy();
            this.input.remove();
            this.scene.scene.stop();
          }
        });
      } else {
        this.result.setText(this.scene.state.lang.validClanName).setAlpha(1);

        if (!this.addHeightError && !this.addHeightFounded) {
          this.addHeightError = true;
          this.window.addWindowHeight(55);
        } else if (!this.addHeightError) {
          this.addHeightError = true;
          this.window.addWindowHeight(45);
        }
      }
    }
  }

  private createClanFlag(): void {
    const buttonTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      color: '#fffdfa',
      fontSize: '19px',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };
    
    const tile: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(this.x, this.switchBg.getBounds().bottom + 20, this.window.width - 50, 200, 'modal-square-bg', 10).setOrigin(0.5, 0);
    this.initAvatar();
    const y: number = tile.getBounds().centerY;
    this.icon = LogoManager.createIcon(this.scene, this.x - 120, y, this.avatar).setScale(0.8);
    const geom: Phaser.Geom.Rectangle = this.icon.getBounds();
    const randomBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(geom.right + 150, geom.centerY - 40, 'profile-window-button-red').setScale(1.1);
    const randomBtnText: Phaser.GameObjects.Text = this.scene.add.text(randomBtn.x, randomBtn.y - 5, 'Случайно', buttonTextStyle).setOrigin(0.5);

    const changeBtn: Phaser.GameObjects.Sprite = this.scene.add.sprite(geom.right + 150, geom.centerY + 40, 'profile-window-button-green').setScale(1.1);
    const changeBtnText: Phaser.GameObjects.Text = this.scene.add.text(changeBtn.x, changeBtn.y - 5, 'Изменить', buttonTextStyle).setOrigin(0.5);
    this.scene.clickModalBtn({ btn: randomBtn, title: randomBtnText }, () => { this.getNewIcon(); });
    this.scene.clickModalBtn({ btn: changeBtn, title: changeBtnText }, () => { this.openChangeWindow(); });
    this.window.modalElements.push(
      randomBtn,
      randomBtnText,
      changeBtn,
      changeBtnText,
      this.icon,
    );
  }

  private initAvatar(): void {
    this.avatar = {
      bg: Phaser.Math.Between(1, 14),
      frame: Phaser.Math.Between(1, 3),
      icon: Phaser.Math.Between(1, 12),
    };
  }

  private getNewIcon(): void {
    this.initAvatar();
    const pos: Iposition = {
      x: this.icon.x,
      y: this.icon.y,
    };

    this.icon.destroy();
    this.icon = LogoManager.createIcon(this.scene, pos.x, pos.y, this.avatar).setScale(0.8);
    console.log(this.avatar)
  }

  private openChangeWindow(): void {
    this.scene.state.modal = {
      type: 18,
      clanWindowType: 2,
    };
    this.removeInput();
    this.scene.scene.restart(this.scene.state);
  }

  private removeInput(): void {
    this.input?.remove();
    this.scene.enterKey?.destroy();
  }
}