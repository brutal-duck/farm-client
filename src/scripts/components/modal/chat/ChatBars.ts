import Modal from '../../../scenes/Modal/Modal';
const SMILES: string[] = ['😊', '😟', '😝', '😍', '😎', '😭', '😘', '😳', '😱'];
const SMILE_HEIGHT: number = 52;
const tabTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'Shadow',
  fontSize: '18px',
  color: '#ffb27c',
  align: 'center',
  stroke: '#602000',
  strokeThickness: 3,
  wordWrap: { width: 100 },
};
const tabActiveTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'Shadow',
  fontSize: '18px',
  color: '#fff2e7',
  align: 'center',
  stroke: '#aa6100',
  strokeThickness: 3,
  wordWrap: { width: 100 },
};

const CLAN: boolean = true;
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
  private enterKey: Phaser.Input.Keyboard.Key;
  private inputBg: Phaser.GameObjects.Sprite;
  private tabChat: Phaser.GameObjects.Sprite | Phaser.GameObjects.RenderTexture;
  private tabChatText: Phaser.GameObjects.Text;
  private tabPersonal: Phaser.GameObjects.Sprite | Phaser.GameObjects.RenderTexture;
  private tabPersonalText: Phaser.GameObjects.Text;
  private tabClan: Phaser.GameObjects.Sprite | Phaser.GameObjects.RenderTexture;
  private tabClanText: Phaser.GameObjects.Text;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
  }

  private create(): void {
    this.createMainElements();
    if (this.scene.state.modal.chatType === 1) this.createInput();
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
    modalElements.push(this.bg,
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
    this.tabCloseBtn);
    window.onresize = (): void => {    
      if (window.innerHeight !== tempHeight) {
        tempHeight = window.innerHeight;
        if (tempHeight < windowHeight && centered) {
          root.scrollIntoView(false)
          modalElements.forEach((el) => el?.setY(el.y + padding))
          this.scene.game.scene.keys['Chat'].scrolling.y += padding
          this.scene.mainInput.style.top = '86%';
          this.scene.mainInput.style.bottom = '9%';
          centered = false
        } else if (!centered) {
          modalElements.forEach((el) => el?.setY(el.y - padding))
          this.scene.game.scene.keys['Chat'].scrolling.y -= padding
          this.scene.mainInput.style.top = '76%';
          this.scene.mainInput.style.bottom = '19%';
          centered = true
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
    const bgGeom: Phaser.Geom.Rectangle = this.bg.getBounds();
    const maxWidth: number = 440;
    const tabHeight: number = 74;
    const activeTabHeight: number = 93;
    const slice: number = 30;
    const type: number = this.scene.state.modal.chatType;
    this.createCloseTab();
    // if (CLAN) {
    //   this.tabChat = this.scene.add.sprite(bgGeom.left + 10, bgGeom.top - 20, 'chat-tab-active').setDepth(2).setOrigin(0, 0);
    //   const tabChatGeom: Phaser.Geom.Rectangle = this.tabChat.getBounds();
    //   this.tabChatText = this.scene.add.text(tabChatGeom.centerX, tabChatGeom.centerY, 'Общий чат', tabActiveTextStyle).setDepth(2).setOrigin(0.5);
    //   this.tabPersonal = this.scene.add.sprite(tabChatGeom.right, bgGeom.top, 'chat-tab').setDepth(2).setOrigin(0, 0);
    //   const tabPersonalGeom: Phaser.Geom.Rectangle = this.tabPersonal.getBounds();
    //   this.tabPersonalText = this.scene.add.text(tabPersonalGeom.centerX, tabPersonalGeom.centerY, 'Личный чат', tabTextStyle).setDepth(2).setOrigin(0.5);
    // } else {
      let tabChatGeom: Phaser.Geom.Rectangle;
      let tabPersonalGeom: Phaser.Geom.Rectangle;
      switch (type) {
        case 1:
          this.tabChat = this.scene.add.nineslice(bgGeom.left + 10, bgGeom.top + 25, maxWidth / 2, activeTabHeight, 'chat-tab-active', slice)
          this.tabChat 
            .setDepth(2)
            .setOrigin(0, 1);
          tabChatGeom = this.tabChat.getBounds();
          this.tabChatText = this.scene.add.text(tabChatGeom.centerX, tabChatGeom.centerY, 'Общий чат', tabActiveTextStyle).setDepth(2).setOrigin(0.5);

          this.tabPersonal = this.scene.add.nineslice(tabChatGeom.right - 3 , bgGeom.top + 25, maxWidth / 2, tabHeight, 'chat-tab', slice);
          this.tabPersonal
            .setDepth(2)
            .setOrigin(0, 1);
          tabPersonalGeom = this.tabPersonal.getBounds();
          this.tabPersonalText = this.scene.add.text(tabPersonalGeom.centerX, tabPersonalGeom.centerY, 'Личный чат', tabTextStyle).setDepth(4).setOrigin(0.5);
        break;
        case 2: 
          this.tabChat = this.scene.add.nineslice(bgGeom.left + 10, bgGeom.top + 25, maxWidth / 2, tabHeight, 'chat-tab', slice);
          this.tabChat 
            .setDepth(2)
            .setOrigin(0, 1);
          tabChatGeom = this.tabChat.getBounds();
          this.tabChatText = this.scene.add.text(tabChatGeom.centerX, tabChatGeom.centerY, 'Общий чат', tabTextStyle).setDepth(2).setOrigin(0.5);
          
          this.tabPersonal = this.scene.add.nineslice(tabChatGeom.right - 3 , bgGeom.top + 25, maxWidth / 2, activeTabHeight, 'chat-tab-active', slice);
          this.tabPersonal
            .setDepth(2)
            .setOrigin(0, 1);
          tabPersonalGeom = this.tabPersonal.getBounds();
          this.tabPersonalText = this.scene.add.text(tabPersonalGeom.centerX, tabPersonalGeom.centerY, 'Личный чат', tabActiveTextStyle).setDepth(2).setOrigin(0.5);
        break;
      }

    // }
    // this.setTabMask();
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
        this.scene.mainInput.remove();
        console.log('1');
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
        this.scene.mainInput.remove();
        console.log('2');
        this.scene.state.modal = {
          type: 9,
          chatType: 2,
        };
        this.scene.scene.stop('Chat');
        this.scene.scene.restart(this.scene.state);
      }, this.tabPersonalText);
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
        this.scene.state.socket.io.emit('sendPersonalMessage', {
          id: this.scene.state.user.id,
          toId: '60ed08498bab5225643ea2a6',
          message: this.scene.mainInput.value,
          userName: login,
          userStatus: this.scene.state.user.status,
        });
      }


      this.scene.mainInput.value = '';
      this.chatText.setText(this.scene.mainInput.value).setDepth(4).setCrop(0, 0, 280, 100).setAlpha(1);
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

  private onCloseBtnClick(): void {
    this.scene.mainInput.remove();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.scene.stop('Chat');
    this.scene.scene.stop('Modal');
    this.enterKey?.destroy();
  }
}
