import axios from 'axios';
import Modal from '../../../scenes/Modal/Modal';
import Notificator from './../../gameObjects/Notificator';
const SMILES: string[] = ['😊', '😟', '😝', '😍', '😎', '😭', '😘', '😳', '😱'];
const SMILE_HEIGHT: number = 52;

export default class ChatBars {
  private scene: Modal;
  private smilePanelElements: Array<Phaser.GameObjects.Text | Phaser.GameObjects.TileSprite>;
  private chatText: Phaser.GameObjects.Text;
  private tabClose: Phaser.GameObjects.Sprite | Phaser.GameObjects.RenderTexture;
  private tabCloseBtn: Phaser.GameObjects.Sprite;
  private bg: Phaser.GameObjects.Sprite;
  private chatModalZone: Phaser.GameObjects.Zone;
  private chatInputZone: Phaser.GameObjects.Zone;
  private sendMsgBtn: Phaser.GameObjects.Sprite;
  private smileBtn: Phaser.GameObjects.Sprite;
  public enterKey: Phaser.Input.Keyboard.Key;
  private inputBg: Phaser.GameObjects.Sprite;
  private tabChat: Phaser.GameObjects.Sprite | Phaser.GameObjects.RenderTexture;
  private tabChatText: Phaser.GameObjects.Text;
  private tabPersonal: Phaser.GameObjects.Sprite | Phaser.GameObjects.RenderTexture;
  private tabPersonalText: Phaser.GameObjects.Text;
  private tabClan: Phaser.GameObjects.Sprite | Phaser.GameObjects.RenderTexture;
  private tabClanText: Phaser.GameObjects.Text;
  private bgNamePlate: Phaser.GameObjects.TileSprite;
  private name: Phaser.GameObjects.Text;
  private arrow: Phaser.GameObjects.Sprite;
  private personalTabNotificator: Notificator;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
  }

  private create(): void {
    this.createMainElements();
    if (
      this.scene.state.modal.chatType === 1 
      || this.scene.state.modal.chatType === 2 
      && this.scene.state.modal.userId 
      || this.scene.state.modal.chatType === 3
    ) this.createInput();
    if (this.scene.state.modal.chatType === 2 && this.scene.state.modal.userId) this.createPersonalChatPlate();
    this.setTabsListeners();
    this.setResize();
  }

  private setResize(): void {
    const root: HTMLDivElement = document.querySelector('#root');
    const padding: number = this.scene.cameras.main.height / 100 * 10;
    let centered: boolean = true;
    let tempHeight: number = window.innerHeight;
    let windowHeight: number = window.innerHeight;
    const modalElements: Array<Phaser.GameObjects.Text | Phaser.GameObjects.TileSprite | Phaser.GameObjects.Sprite | Phaser.GameObjects.Zone | Phaser.GameObjects.RenderTexture> = [];
    if (this.smilePanelElements) modalElements.concat(this.smilePanelElements)
    modalElements.push(
      this.bg,
      this.chatText,
      this.chatInputZone,
      this.sendMsgBtn,
      this.smileBtn,
      this.inputBg,
      this.tabChat,
      this.tabChatText,
      this.tabPersonal, 
      this.tabPersonalText,
      this.tabClan,
      this.tabClanText,
      this.tabClose,
      this.tabCloseBtn,
      this.arrow,
      this.name,
      this.bgNamePlate,
    );
    window.onresize = (): void => {    
      if (window.innerHeight !== tempHeight) {
        tempHeight = window.innerHeight;
        if (tempHeight < windowHeight && centered) {
          root.scrollIntoView(false)
          const height = Number(this.scene.game.config.height) / 12 - 100;
          const startTop: number = 88;
          const startBottom: number = 7;
          this.scene.mainInput.style.top = `${startTop - height / 4}%`;
          this.scene.mainInput.style.bottom = `${startBottom + height / 4}%`;
          modalElements.forEach((el) => el?.setY(el.y + padding));
          this.scene.game.scene.keys['Chat'].scrolling.y += padding;
          centered = false;
        } else if (!centered) {
          const height = Number(this.scene.game.config.height) / 12 - 100;
          const startTop: number = 78;
          const startBottom: number = 17;
          this.scene.mainInput.style.top = `${startTop - height / 4}%`;
          this.scene.mainInput.style.bottom = `${startBottom + height / 4}%`;
          modalElements.forEach((el) => el?.setY(el.y - padding));
          this.scene.game.scene.keys['Chat'].scrolling.y -= padding;
          centered = true;
        }
      }
    }
  }

  private createMainElements(): void {
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX, 
      y: this.scene.cameras.main.centerY,
    }

    
    this.bg = this.scene.add.sprite(pos.x, pos.y + 20, 'chat-bg').setDepth(3);
    const bgGeom: Phaser.Geom.Rectangle = this.bg.getBounds();
    // Зона окна
    this.chatModalZone = this.scene.add.zone(bgGeom.left, bgGeom.top + 20, bgGeom.width, bgGeom.height).setOrigin(0).setDropZone(undefined, (): void => {});
    this.chatModalZone.setDepth(3).setInteractive();
    this.createTabs();
  }

  private createTabs(): void {
    const tabTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#ffb27c',
      align: 'center',
      stroke: '#602000',
      strokeThickness: 3,
      wordWrap: { width: 100 },
    };
    const tabActiveTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '20px',
      color: '#fff2e7',
      align: 'center',
      stroke: '#aa6100',
      strokeThickness: 3,
      wordWrap: { width: 100 },
    };

    const bgGeom: Phaser.Geom.Rectangle = this.bg.getBounds();
    const maxWidth: number = 440;
    const tabHeight: number = 74;
    const activeTabHeight: number = 93;
    const slice: number = 30;
    const type: number = this.scene.state.modal.chatType;
    this.createCloseTab();
    if (this.scene.state.user.clanId) {
      let tabChatGeom: Phaser.Geom.Rectangle;
      let tabPersonalGeom: Phaser.Geom.Rectangle;
      let tabClanGeom: Phaser.Geom.Rectangle;
      const countNotification: number = this.getPersonalTabCountNotification();

      switch (type) {
        case 1:
          this.tabChat = this.scene.add.nineslice(bgGeom.left + 10, bgGeom.top + 25, maxWidth / 3, activeTabHeight, 'chat-tab-active', slice)
          this.tabChat 
            .setDepth(2)
            .setOrigin(0, 1);
          tabChatGeom = this.tabChat.getBounds();
          this.tabChatText = this.scene.add.text(tabChatGeom.centerX, tabChatGeom.centerY, this.scene.state.lang.generalChat, tabActiveTextStyle).setDepth(2).setOrigin(0.5);

          this.tabClan = this.scene.add.nineslice(tabChatGeom.right - 3 , bgGeom.top + 25, maxWidth / 3, tabHeight, 'chat-tab', slice);
          this.tabClan
            .setDepth(2)
            .setOrigin(0, 1);
          tabClanGeom = this.tabClan.getBounds();

          this.tabClanText = this.scene.add.text(tabClanGeom.centerX, tabClanGeom.centerY, this.scene.state.lang.clanChat, tabTextStyle).setDepth(4).setOrigin(0.5);

          this.tabPersonal = this.scene.add.nineslice(tabClanGeom.right - 3 , bgGeom.top + 25, maxWidth / 3, tabHeight, 'chat-tab', slice);
          this.tabPersonal
            .setDepth(2)
            .setOrigin(0, 1);
          tabPersonalGeom = this.tabPersonal.getBounds();
          this.tabPersonalText = this.scene.add.text(tabPersonalGeom.centerX, tabPersonalGeom.centerY, this.scene.state.lang.personalChat, tabTextStyle).setDepth(4).setOrigin(0.5);
          const notificationPos: Iposition = {
            x: tabPersonalGeom.right - 10,
            y: tabPersonalGeom.top + 10,
          };
          this.personalTabNotificator = new Notificator(this.scene, notificationPos);
          this.personalTabNotificator.setDepth(4);
          this.personalTabNotificator.setCount(countNotification);
        break;
        case 2: 
          this.tabChat = this.scene.add.nineslice(bgGeom.left + 10, bgGeom.top + 25, maxWidth / 3, tabHeight, 'chat-tab', slice);
          this.tabChat 
            .setDepth(2)
            .setOrigin(0, 1);
          tabChatGeom = this.tabChat.getBounds();
          this.tabChatText = this.scene.add.text(tabChatGeom.centerX, tabChatGeom.centerY, this.scene.state.lang.generalChat, tabTextStyle).setDepth(2).setOrigin(0.5);
          
          this.tabClan = this.scene.add.nineslice(tabChatGeom.right - 3 , bgGeom.top + 25, maxWidth / 3, tabHeight, 'chat-tab', slice);
          this.tabClan
            .setDepth(2)
            .setOrigin(0, 1);
          tabClanGeom = this.tabClan.getBounds();
          this.tabClanText = this.scene.add.text(tabClanGeom.centerX, tabClanGeom.centerY, this.scene.state.lang.clanChat, tabTextStyle).setDepth(4).setOrigin(0.5);

          this.tabPersonal = this.scene.add.nineslice(tabClanGeom.right - 3 , bgGeom.top + 25, maxWidth / 3, activeTabHeight, 'chat-tab-active', slice);
          this.tabPersonal
            .setDepth(2)
            .setOrigin(0, 1);
          tabPersonalGeom = this.tabPersonal.getBounds();
          this.tabPersonalText = this.scene.add.text(tabPersonalGeom.centerX, tabPersonalGeom.centerY, this.scene.state.lang.personalChat, tabActiveTextStyle).setDepth(2).setOrigin(0.5);
        break;
        case 3: 
          this.tabChat = this.scene.add.nineslice(bgGeom.left + 10, bgGeom.top + 25, maxWidth / 3, tabHeight, 'chat-tab', slice);
          this.tabChat 
            .setDepth(2)
            .setOrigin(0, 1);
          tabChatGeom = this.tabChat.getBounds();
          this.tabChatText = this.scene.add.text(tabChatGeom.centerX, tabChatGeom.centerY, this.scene.state.lang.generalChat, tabTextStyle).setDepth(2).setOrigin(0.5);
          
          this.tabClan = this.scene.add.nineslice(tabChatGeom.right - 3 , bgGeom.top + 25, maxWidth / 3, activeTabHeight, 'chat-tab-active', slice);
          this.tabClan
            .setDepth(2)
            .setOrigin(0, 1);
          tabClanGeom = this.tabClan.getBounds();
          this.tabClanText = this.scene.add.text(tabClanGeom.centerX, tabClanGeom.centerY, this.scene.state.lang.clanChat, tabActiveTextStyle).setDepth(4).setOrigin(0.5);

          this.tabPersonal = this.scene.add.nineslice(tabClanGeom.right - 3 , bgGeom.top + 25, maxWidth / 3, tabHeight, 'chat-tab', slice);
          this.tabPersonal
            .setDepth(2)
            .setOrigin(0, 1);
          tabPersonalGeom = this.tabPersonal.getBounds();
          this.tabPersonalText = this.scene.add.text(tabPersonalGeom.centerX, tabPersonalGeom.centerY, this.scene.state.lang.personalChat, tabTextStyle).setDepth(2).setOrigin(0.5);
          const notificationPos1: Iposition = {
            x: tabPersonalGeom.right - 10,
            y: tabPersonalGeom.top + 10,
          };
          this.personalTabNotificator = new Notificator(this.scene, notificationPos1);
          this.personalTabNotificator.setDepth(4);
          this.personalTabNotificator.setCount(countNotification);
        break;
      }
    } else {
      let tabChatGeom: Phaser.Geom.Rectangle;
      let tabPersonalGeom: Phaser.Geom.Rectangle;
      switch (type) {
        case 1:
          this.tabChat = this.scene.add.nineslice(bgGeom.left + 10, bgGeom.top + 25, maxWidth / 2, activeTabHeight, 'chat-tab-active', slice)
          this.tabChat 
            .setDepth(2)
            .setOrigin(0, 1);
          tabChatGeom = this.tabChat.getBounds();
          this.tabChatText = this.scene.add.text(tabChatGeom.centerX, tabChatGeom.centerY, this.scene.state.lang.generalChat, tabActiveTextStyle).setDepth(2).setOrigin(0.5);

          this.tabPersonal = this.scene.add.nineslice(tabChatGeom.right - 3 , bgGeom.top + 25, maxWidth / 2, tabHeight, 'chat-tab', slice);
          this.tabPersonal
            .setDepth(2)
            .setOrigin(0, 1);
          tabPersonalGeom = this.tabPersonal.getBounds();
          this.tabPersonalText = this.scene.add.text(tabPersonalGeom.centerX, tabPersonalGeom.centerY, this.scene.state.lang.personalChat, tabTextStyle).setDepth(4).setOrigin(0.5);
          
          const countNotification: number = this.getPersonalTabCountNotification();
          const notificationPos: Iposition = {
            x: tabPersonalGeom.right - 10,
            y: tabPersonalGeom.top + 10,
          };
          this.personalTabNotificator = new Notificator(this.scene, notificationPos);
          this.personalTabNotificator.setDepth(4);
          this.personalTabNotificator.setCount(countNotification);
        break;
        case 2: 
          this.tabChat = this.scene.add.nineslice(bgGeom.left + 10, bgGeom.top + 25, maxWidth / 2, tabHeight, 'chat-tab', slice);
          this.tabChat 
            .setDepth(2)
            .setOrigin(0, 1);
          tabChatGeom = this.tabChat.getBounds();
          this.tabChatText = this.scene.add.text(tabChatGeom.centerX, tabChatGeom.centerY, this.scene.state.lang.generalChat, tabTextStyle).setDepth(2).setOrigin(0.5);
          
          this.tabPersonal = this.scene.add.nineslice(tabChatGeom.right - 3 , bgGeom.top + 25, maxWidth / 2, activeTabHeight, 'chat-tab-active', slice);
          this.tabPersonal
            .setDepth(2)
            .setOrigin(0, 1);
          tabPersonalGeom = this.tabPersonal.getBounds();
          this.tabPersonalText = this.scene.add.text(tabPersonalGeom.centerX, tabPersonalGeom.centerY, this.scene.state.lang.personalChat, tabActiveTextStyle).setDepth(2).setOrigin(0.5);
        break;
      }
    }
  }
  
  public update(): void {
    if (this.scene.state.updatePersonalMessage && this.personalTabNotificator) {
      this.scene.state.updatePersonalMessage = false;
      const count: number = this.getPersonalTabCountNotification();
      this.personalTabNotificator?.setCount(count);
    }
  }

  private getPersonalTabCountNotification(): number {
    let count: number = 0;
    for (const user of this.scene.state.user.personalMessages) {
      for (const message of user.messages) {
        if (!message.check) {
          count += 1;
          break;
        }
      }
    }
    for (const message of this.scene.state.user.messages) {
      if (!message.check) {
        count += 1;
      }
    }
    return count;
  }

  private createCloseTab(): void {
    const bgGeom: Phaser.Geom.Rectangle = this.bg.getBounds();
    this.tabClose = this.scene.add.sprite(bgGeom.right - 18, bgGeom.top + 25, 'chat-tab-close').setOrigin(1, 1).setDepth(2);
    const tabGeom: Phaser.Geom.Rectangle = this.tabClose.getBounds();
    this.tabCloseBtn = this.scene.add.sprite(tabGeom.centerX + 30, tabGeom.centerY, 'tasks-close').setOrigin(0.5).setDepth(2);
  }

  private createSmilePanel(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Bip',
      fontSize: '38px',
    };
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 210,
      y: this.scene.cameras.main.centerY + 292,
    }
    this.smilePanelElements = [];
    const bg: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(pos.x + 210, pos.y, 482, SMILE_HEIGHT + 2, 'white-pixel')
      .setTint(0x742990)
      .setDepth(3)
      .setVisible(false);
    this.smilePanelElements.push(bg);

    for (let i: number = 0; i < SMILES.length; i += 1) {
      const smile: Phaser.GameObjects.Text = this.scene.add.text(pos.x + SMILE_HEIGHT * i, pos.y, SMILES[i], textStyle);
      smile.setOrigin(0.5, 0.5)
        .setDepth(3)
        .setVisible(false)
        .setInteractive();
      this.scene.click(smile, (): void => {
        this.onSmileClick(smile);
      })
      this.smilePanelElements.push(smile);
    }
  }

  public createInput(): void {
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX,
      y: this.scene.cameras.main.centerY + 330,
    }

    const root: HTMLDivElement = document.querySelector('#root');
    this.scene.mainInput = document.createElement('input');
    root.append(this.scene.mainInput);
    this.scene.mainInput.setAttribute("id", "chat");
    this.scene.mainInput.setAttribute("autocomplete", "off");
    
    const height = Number(this.scene.game.config.height) / 12 - 100;
    const startTop: number = 78;
    const startBottom: number = 17;
    this.scene.mainInput.style.top = `${startTop - height / 4}%`;
    this.scene.mainInput.style.bottom = `${startBottom + height / 4}%`;

    this.inputBg = this.scene.add.sprite(pos.x, pos.y + 32, 'chat-input-bg').setDepth(3);
    // Отрисовка текста, полученного из инпут
    this.chatText = this.scene.add.text(pos.x - 216, pos.y + 33, this.scene.mainInput.value, {
      font: '24px Bip',
      color: '#974f00'
    }).setOrigin(0, 0.5).setDepth(5);
    
    // Зона инпута
    this.chatInputZone = this.scene.add.zone(134, pos.y, 294, 65).setOrigin(0).setDropZone(undefined, (): void => {});
    this.chatInputZone.setInteractive().setDepth(3);
    
    this.sendMsgBtn = this.scene.add.sprite(pos.x + 187, pos.y + 34, 'chat-send-btn').setOrigin(0.5).setDepth(3);
    this.smileBtn = this.scene.add.sprite(pos.x + 102, pos.y + 34, 'chat-emoji-btn').setOrigin(0.5).setDepth(3);

    this.createSmilePanel();

    this.scene.clickButton(this.smileBtn, (): void => { this.toggleSmilePannel(); });
    // Фокус
    this.chatInputZone.on('pointerdown', (): void => {
      this.scene.mainInput.style.display = 'block';
      this.scene.mainInput.focus();
      this.chatText.setAlpha(0);
    });
    
    // Блюр
    this.chatModalZone.on('pointerdown', (): void => {
      this.scene.mainInput.style.display = 'none';
      this.scene.mainInput.blur();
      this.chatText.setText(this.scene.mainInput.value).setDepth(4).setCrop(0, 0, 280, 100).setAlpha(1);
    });

    this.scene.clickButton(this.sendMsgBtn, (): void => { this.sendMsg(); });

    this.enterKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.enterKey.on('down', (): void => this.sendMsg());
  }
  
  private setTabsListeners(): void {
    if (this.scene.state.modal.chatType !== 1) {
      this.scene.clickButtonUp(this.tabChat, (): void => {
        this.scene.mainInput?.remove();
        this.deleteUserWithoutMessages();
        this.enterKey?.destroy();
        this.scene.state.modal = {
          type: 9,
          chatType: 1,
        };
        this.scene.scene.stop('Chat');
        this.scene.scene.restart(this.scene.state);
      }, this.tabChatText);
    }
    if (this.scene.state.modal.chatType !== 2) {
      this.scene.clickButtonUp(this.tabPersonal, (): void => {
        this.scene.mainInput?.remove();
        this.enterKey?.destroy();
        this.scene.state.modal = {
          type: 9,
          chatType: 2,
        };
        this.scene.scene.stop('Chat');
        this.scene.scene.restart(this.scene.state);
      }, this.tabPersonalText);
    }
    if (this.scene.state.modal.chatType !== 3 && this.tabClan) {
      this.scene.clickButtonUp(this.tabClan, (): void => {
        this.scene.mainInput?.remove();
        this.enterKey?.destroy();
        this.scene.state.modal = {
          type: 9,
          chatType: 3,
        };
        this.scene.scene.stop('Chat');
        this.scene.scene.restart(this.scene.state);
      }, this.tabClanText);
    }

    this.scene.clickButtonUp(this.tabClose, (): void => { this.onCloseBtnClick(); }, this.tabCloseBtn);
  }

  private onSmileClick(el: Phaser.GameObjects.Text): void {
    this.scene.mainInput.style.display = 'block';
    this.scene.mainInput.focus();
    this.scene.mainInput.value += el.text;
    this.chatText.setText(this.scene.mainInput.value).setAlpha(0);
  }

  private sendMsg(): void {
    if (this.scene.mainInput.value !== '') {
      if (this.smilePanelElements[0].visible) this.toggleSmilePannel();
      
      let login: string = this.scene.state.user.login;;
      if (this.scene.state.platform !== 'web' && this.scene.state.platform !== 'android') login = this.scene.state.name;
      this.scene.state.amplitude.logAmplitudeEvent('chat_send', {});
  
      if (this.scene.state.modal.chatType === 1) {
        this.scene.state.socket.io.emit('send', {
          id: this.scene.state.user.id,
          hash: this.scene.state.user.hash,
          login: login,
          text: this.scene.mainInput.value,
          type: 1,
          status: this.scene.state.user.status
        });
      } else if (this.scene.state.modal.chatType === 2) {
        const user: IuserPersonalMessage = this.scene.state.user.personalMessages.find(el => el.userId === this.scene.state.modal.userId);
        this.scene.state.socket.io.emit('sendPersonalMessage', {
          id: this.scene.state.user.id,
          toId: user.userId,
          message: this.scene.mainInput.value,
          userName: login,
          userStatus: this.scene.state.user.status,
        });
      } else if (this.scene.state.modal.chatType === 3) {
        this.scene.state.socket.io.emit('sendClanMessage', {
          id: this.scene.state.user.id,
          clanId: this.scene.state.user.clanId,
          message: this.scene.mainInput.value,
          userName: login,
          userStatus: this.scene.state.user.status,
        });
      }
      this.scene.mainInput.value = '';
      this.chatText.setText('').setDepth(4).setCrop(0, 0, 280, 100).setAlpha(1);
    }
  }

  private toggleSmilePannel(): void {
    this.smilePanelElements.forEach(el => el.setVisible(!el.visible));
    
    if (!this.smilePanelElements[0].visible) {
      this.scene.game.scene.keys['Chat'].scrolling.height += SMILE_HEIGHT;
      this.scene.game.scene.keys['Chat'].scrollHeight -= SMILE_HEIGHT + 3;
    } else {
      this.scene.game.scene.keys['Chat'].scrolling.height -= SMILE_HEIGHT;
      this.scene.game.scene.keys['Chat'].scrollHeight += SMILE_HEIGHT + 3;
    }
    
    this.scene.game.scene.keys['Chat'].scrolling.bottom = this.scene.game.scene.keys['Chat'].scrollHeight;
    this.scene.game.scene.keys['Chat'].scrolling.scrollY = this.scene.game.scene.keys['Chat'].scrollHeight;
  }

  private createPersonalChatPlate(): void {
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 1, 
      y: this.bg.getBounds().top + 71,
    };
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '40px',
      color: '#fffcf9',
      shadow: {
        offsetX: 1,
        offsetY: 2, 
        color: 'rgba(0, 0, 0, 0.5)',
        blur: 2,
        fill: true,
      },
    };

    const user: IuserPersonalMessage = this.scene.state.user.personalMessages.find(el => el.userId === this.scene.state.modal.userId);
    const windowWidth: number = 482;
    this.bgNamePlate = this.scene.add.tileSprite(pos.x, pos.y, windowWidth, 68, 'white-pixel').setDepth(4).setAlpha(0.3).setOrigin(0.5, 0);
    const bgGeom: Phaser.Geom.Rectangle = this.bgNamePlate.getBounds();
    this.name = this.scene.add.text(pos.x, bgGeom.centerY, user.name, textStyle).setDepth(4).setOrigin(0.5);
    this.arrow = this.scene.add.sprite(bgGeom.left + 20, bgGeom.centerY, 'chat-arrow').setDepth(4).setOrigin(0, 0.5);
    if (this.name.displayWidth > 350) {
      const multiply: number = this.name.displayWidth / 350;
      this.name.setFontSize(parseInt(this.name.style.fontSize) / multiply);
    }
    this.scene.click(this.arrow, () => {
      this.scene.mainInput?.remove();
      this.enterKey?.destroy();
      this.deleteUserWithoutMessages();
      this.scene.state.modal = {
        type: 9,
        chatType: 2,
      };
      this.scene.scene.stop('Chat');
      this.scene.scene.restart(this.scene.state);
    });
    this.scene.click(this.name, () => {
      this.onUserNameClick(user.userId)
    })
  }

  private deleteUserWithoutMessages(): void {
    if (this.scene.state.modal.chatType === 2 && this.scene.state.modal.userId) {
      const user: IuserPersonalMessage = this.scene.state.user.personalMessages.find(el => el.userId === this.scene.state.modal.userId);
      if (user.messages.length <= 0) this.scene.state.user.personalMessages.pop();
    }
  }

  private onCloseBtnClick(): void {
    this.scene.state.updatePersonalMessage = true;
    this.scene.mainInput?.remove();
    this.deleteUserWithoutMessages();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop('Chat');
    this.scene.scene.stop('Modal');
    this.enterKey?.destroy();
  }

  private onUserNameClick(id: string): void {
    this.scene.mainInput?.remove();
    this.enterKey?.destroy();
    this.scene.state.foreignProfileId = id;
    this.scene.state.modal = {
      type: 15,
    };
    this.scene.scene.stop('Chat');
    this.scene.scene.restart(this.scene.state);
  }
}
