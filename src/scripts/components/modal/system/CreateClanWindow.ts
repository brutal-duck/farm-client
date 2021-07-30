import axios from "axios";
import Modal from "../../../scenes/Modal/Modal";

export default class CreateClanWindow {
  public scene: Modal;

  private enterName: Phaser.GameObjects.Text;
  private result: Phaser.GameObjects.Text;
  private nameError: boolean;
  private change: boolean;
  private clanIsClosed: boolean = true;
  private switchBg: Phaser.GameObjects.Sprite;
  private switchTextOpen: Phaser.GameObjects.Text;
  private switchTextClose: Phaser.GameObjects.Text;

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.nameError = false;
    this.change = false;
  }

  private create(): void {
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX,
      y: this.scene.cameras.main.centerY - 40,
    };

    // Заголовок и описание
    this.scene.textHeader.setText(this.scene.state.lang.clan);
    this.enterName = this.scene.add.text(pos.x, pos.y - 70, this.scene.state.lang.enterClanName, {
      font: '28px Shadow',
      color: '#974f00'
    }).setOrigin(0.5, 0.5).setDepth(3);

    // HTML элементы
    const root: HTMLDivElement = document.querySelector('#root');
    this.scene.mainInput = document.createElement('input');
    root.append(this.scene.mainInput);
    this.scene.mainInput.setAttribute("id", "clanname");
    this.scene.mainInput.setAttribute("autocomplete", "off");

    // Параметры
    let centered: boolean = true;
    let padding: number;
    let modalElement: modalElementType[] = [];
    let tempHeight: number = window.innerHeight;
    const windowHeight: number = window.innerHeight;

    // Отрисовка текста, полученного из инпут
    const clanNameText: Phaser.GameObjects.Text = this.scene.add.text(pos.x - 190, pos.y + 35, this.scene.mainInput.value, {
      font: '24px Bip',
      color: '#974f00'
    }).setOrigin(0, 0.5).setDepth(3).setCrop(0, 0, 434, 100);

    // Зона для интерактива и ее границы для всего окна
    const clanNameModalZone: Phaser.GameObjects.Zone = this.scene.add.zone(pos.x, pos.y, 690, 1200).setDropZone(undefined, (): void => {}).setInteractive();

    // Зона для интерактива и ее границы для инпут
    const clanNameInputZone: Phaser.GameObjects.Zone = this.scene.add.zone(pos.x, pos.y + 16, 460, 70).setDropZone(undefined, (): void => {}).setInteractive();
        
    // Фон инпута
    const clanNameBG: Phaser.GameObjects.Graphics = this.scene.add.graphics({
      x: pos.x - 230,
      y: pos.y - 20
    }).setDepth(2).fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 460, 70, 16);

    this.switchBg = this.scene.add.sprite(pos.x, pos.y + 100, 'sys-switch');
    this.switchTextOpen = this.scene.add.text(pos.x - 90, pos.y + 100, this.scene.state.lang.clanIsOpen).setOrigin(0.5);
    this.switchTextClose = this.scene.add.text(pos.x + 90, pos.y + 100, this.scene.state.lang.clanIsClose).setOrigin(0.5);
    this.switchOpened();

    this.scene.click(this.switchBg, () => {
      this.switchOpened();
    });
    // Кнопка
    const createClanBtn = this.scene.bigButton('green', 'center', 150, this.scene.state.lang.createClan);
    this.result = this.scene.add.text(pos.x, pos.y - 100, '', {
      font: '19px Shadow',
      color: '#FF0000',
      align: 'center',
      wordWrap: { width: 520 }
    }).setOrigin(0.5, 0.5).setDepth(4).setAlpha(0);

    padding = this.scene.cameras.main.height / 100 * 30;
    modalElement.push(
      this.scene.header,
      this.scene.body,
      this.scene.bottom,
      this.scene.close,
      this.scene.textHeader,
      this.enterName,
      this.switchBg,
      this.switchTextOpen,
      this.switchTextClose,
      clanNameText,
      clanNameInputZone,
      clanNameBG,
      createClanBtn.btn,
      createClanBtn.title,
      this.result,
    );

    window.onresize = (): void => {
      tempHeight = window.innerHeight;

      if (windowHeight !== tempHeight && centered) {

        root.scrollIntoView(false)
        modalElement.forEach((el) => el.setY(el.y + padding))
        this.scene.mainInput.style.top = '75%';
        this.scene.mainInput.style.bottom = '19%';
        centered = false;

      } else if (windowHeight === tempHeight && !centered) {
        
        modalElement.forEach((el) => el.setY(el.y - padding));
        this.scene.mainInput.style.top = '49%';
        this.scene.mainInput.style.bottom = '44%';
        centered = true;

      }
    }

    // Фокус
    clanNameInputZone.on('pointerdown', (): void => {
      this.scene.mainInput.style.display = 'block';
      this.scene.mainInput.focus();
    });

    // Блюр
    clanNameModalZone.on('pointerdown', (): void => {
      this.scene.mainInput.style.display = 'none';
      this.scene.mainInput.blur();
      clanNameText.setText(this.scene.mainInput.value).setDepth(4).setCrop(0, 0, 434, 100);
    });

    // Кнопка смены ника
    this.scene.clickModalBtn(createClanBtn, (): void => { this.createClan(); });
    this.scene.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.scene.enterKey.on('down', (): void => { this.createClan(); });

    this.scene.resizeWindow(310);
  }

  private switchOpened(): void {
    const textActiveStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '16px',
      color: '#fff3e2',
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
        }).then((res) => {
          if (res.data.error) {
            this.change = false;
            if (!this.nameError) this.enterName.setY(this.enterName.y + 34);
              this.nameError = true;
              this.result.setText(this.scene.state.lang.haveClan).setAlpha(1);
              this.scene.resizeWindow(350);
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
        this.scene.resizeWindow(350);
      }
    }
  }
}