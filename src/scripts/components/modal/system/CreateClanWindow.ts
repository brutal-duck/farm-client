import axios from "axios";
import Modal from "../../../scenes/Modal/Modal";

export default class CreateClanWindow {
  public scene: Modal;

  private enterName: Phaser.GameObjects.Text;
  private result: Phaser.GameObjects.Text;
  private nameError: boolean;
  private change: boolean;

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
    // Заголовок и описание
    this.scene.textHeader.setText(this.scene.state.lang.clan);
    this.enterName = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, this.scene.state.lang.enterClanName, {
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
    const clanNameText: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX - 220, this.scene.cameras.main.centerY + 35, this.scene.mainInput.value, {
      font: '24px Bip',
      color: '#974f00'
    }).setOrigin(0, 0.5).setDepth(3).setCrop(0, 0, 434, 100);

    // Зона для интерактива и ее границы для всего окна
    const clanNameModalZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 710, 1200).setDropZone(undefined, (): void => {}).setInteractive();
    // let graphics: Phaser.GameObjects.Graphics = this.scene.add.graphics()
    // .lineStyle(2, 0x7b40b8)
    // .strokeRect(nicknameModalZone.x - nicknameModalZone.input.hitArea.width / 2, nicknameModalZone.y - nicknameModalZone.input.hitArea.height / 2, nicknameModalZone.input.hitArea.width, nicknameModalZone.input.hitArea.height);

    // Зона для интерактива и ее границы для инпут
    const clanNameInputZone: Phaser.GameObjects.Zone = this.scene.add.zone(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 36, 460, 70).setDropZone(undefined, (): void => {}).setInteractive();
    // let graphics2: Phaser.GameObjects.Graphics = this.scene.add.graphics()
    // .lineStyle(2, 0xFFFF00)
    // .strokeRect(nicknameInputZone.x - nicknameInputZone.input.hitArea.width / 2, nicknameInputZone.y - nicknameInputZone.input.hitArea.height / 2, nicknameInputZone.input.hitArea.width, nicknameInputZone.input.hitArea.height);
        
    // Фон инпута
    const clanNameBG: Phaser.GameObjects.Graphics = this.scene.add.graphics({
      x: this.scene.cameras.main.centerX - 230,
      y: this.scene.cameras.main.centerY
    }).setDepth(2).fillStyle(0xffffff, 1).fillRoundedRect(0, 0, 460, 70, 16);

    // Кнопка
    const createClanBtn = this.scene.bigButton('green', 'center', 130, this.scene.state.lang.createClan);
    this.result = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 90, '', {
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

    this.scene.resizeWindow(270);
  }

  private createClan(): void {
    if (!this.change) {

      let checkName: boolean = true;
      const re: RegExp = /^[a-zA-Z0-9]+$/;
      checkName = re.test(this.scene.mainInput.value);
          
      if (this.scene.mainInput.value.length < 6) checkName = false;
    
      if (checkName) {
        this.change = true;
        axios.post(process.env.API + '/createClan', {
          id: this.scene.state.user.id,
          hash: this.scene.state.user.hash,
          counter: this.scene.state.user.counter,
          name: this.scene.mainInput.value
        }).then((res) => {
          if (res.data.error) {
            if (!this.nameError) this.enterName.setY(this.enterName.y + 34);
              this.nameError = true;
              this.result.setText(this.scene.state.lang.haveClan).setAlpha(1);
          } else {
            this.scene.state.user.clanId = res.data.result.clanId;
            this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
            this.scene.enterKey.destroy();
            this.scene.mainInput.remove();
            this.scene.scene.stop();
          }
        });
      } else {
        if (!this.nameError) this.enterName.setY(this.enterName.y + 34);
        this.nameError = true;
        this.result.setText(this.scene.state.lang.validNickname).setAlpha(1);
      }
    }
  }
}