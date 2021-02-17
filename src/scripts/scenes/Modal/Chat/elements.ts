function createChatBars(height: number = 0): void {

  // Заголовок
  let chatTitle: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 388 + height, this.state.lang.chat, {
    font: '52px Bip',
    color: '#59120E',
    align: 'center',
  }).setOrigin(0.5, 0.5)
  
  // Параметры
  let modalElements: modalElementType[] = [];
  let emojiElements: modalElementType[] = [];
  let padding: number = this.cameras.main.height / 100 * 10;
  let emojiHeight: number = 54
  let tempHeight: number = window.innerHeight;
  const windowHeight: number = window.innerHeight;
  const emoji: string[] = ['😊', '😟', '😝', '😍', '😎', '😭', '😘', '😳', '😱']
  
  // HTML
  let root: HTMLDivElement = document.querySelector('#root');
  this.mainInput = document.createElement('input');
  root.append(this.mainInput);
  this.mainInput.setAttribute("id", "chat");
  this.mainInput.setAttribute("autocomplete", "off");
  
  // Отрисовка текста, полученного из инпут
  let chatText: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 216, this.cameras.main.centerY + 344 + height, this.mainInput.value, {
    font: '24px Bip',
    color: '#974f00'
  }).setOrigin(0, 0.5).setDepth(5)
  
  // Зона окна
  let chatModalZone: Phaser.GameObjects.Zone = this.add.zone(5, 5, 710, 1190).setOrigin(0).setDropZone(undefined, () => {});
  chatModalZone.setInteractive()
  // this.add.graphics().lineStyle(2, 0x2A0AFF).strokeRect(5, 5, 710, 1190)

  // Зона инпута
  let chatInputZone: Phaser.GameObjects.Zone = this.add.zone(134, this.cameras.main.centerY + 311 + height, 294, 65).setOrigin(0).setDropZone(undefined, () => {});
  chatInputZone.setInteractive()
  // this.add.graphics().lineStyle(2, 0xF20800).strokeRect(134, this.cameras.main.centerY + 311 + height, 294, 65)
  
  let sendMsgBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 187, this.cameras.main.centerY + 345 + height, 'chat-send-btn').setOrigin(0.5, 0.5)
  let emojiBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 102, this.cameras.main.centerY + 345 + height, 'chat-emoji-btn').setOrigin(0.5, 0.5)
  let closeBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 236, this.cameras.main.centerY - 388 + height, 'header-close').setOrigin(0.5, 0.5)

  // Отрисовка панели смайликов
  let emojiBGround: Phaser.GameObjects.Graphics = this.add.graphics().fillStyle(0x742990).fillRect(118, this.cameras.main.centerY + 248 + height, 482, emojiHeight).setDepth(1).setVisible(false)
  let emojiAA: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 210, this.cameras.main.centerY + 276 + height, emoji[0], {font: '38px Bip'}).setOrigin(0.5, 0.5).setDepth(2).setVisible(false).setInteractive()
  let emojiAB: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 158, this.cameras.main.centerY + 276 + height, emoji[1], {font: '38px Bip'}).setOrigin(0.5, 0.5).setDepth(2).setVisible(false).setInteractive()
  let emojiAC: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 105, this.cameras.main.centerY + 276 + height, emoji[2], {font: '38px Bip'}).setOrigin(0.5, 0.5).setDepth(2).setVisible(false).setInteractive()
  let emojiAD: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX - 52, this.cameras.main.centerY + 276 + height, emoji[3], {font: '38px Bip'}).setOrigin(0.5, 0.5).setDepth(2).setVisible(false).setInteractive()
  let emojiAE: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 276 + height, emoji[4], {font: '38px Bip'}).setOrigin(0.5, 0.5).setDepth(2).setVisible(false).setInteractive()
  let emojiAF: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 52, this.cameras.main.centerY + 276 + height, emoji[5], {font: '38px Bip'}).setOrigin(0.5, 0.5).setDepth(2).setVisible(false).setInteractive()
  let emojiAG: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 105, this.cameras.main.centerY + 276 + height, emoji[6], {font: '38px Bip'}).setOrigin(0.5, 0.5).setDepth(2).setVisible(false).setInteractive()
  let emojiAH: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 158, this.cameras.main.centerY + 276 + height, emoji[7], {font: '38px Bip'}).setOrigin(0.5, 0.5).setDepth(2).setVisible(false).setInteractive()
  let emojiAI: Phaser.GameObjects.Text = this.add.text(this.cameras.main.centerX + 210, this.cameras.main.centerY + 276 + height, emoji[8], {font: '38px Bip'}).setOrigin(0.5, 0.5).setDepth(2).setVisible(false).setInteractive()

  modalElements.push(
    emojiBGround,
    emojiAA,
    emojiAB,
    emojiAC,
    emojiAD,
    emojiAE,
    emojiAF,
    emojiAG,
    emojiAH,
    emojiAI,
    this.game.scene.keys['Modal'].chatBG,
    chatTitle,
    chatText,
    chatInputZone,
    sendMsgBtn,
    emojiBtn,
    closeBtn,
  )

  emojiElements = modalElements.slice(0, 10)
  emojiElements.forEach((el: Phaser.GameObjects.Text) => {

    if (el.type !== 'Graphics') {

      this.click(el, (): void => {
        
        this.mainInput.style.display = 'block';
        this.mainInput.focus();
        this.mainInput.value += el.text
        chatText.setText(this.mainInput.value).setAlpha(0)

      })
      
    }

  })

  
  // Отправка сообщения
  const sendMsg = (): void => {
        
    if (this.mainInput.value !== '') {
      
      if (emojiBGround.visible) {
        
        emojiElements.forEach((el: Phaser.GameObjects.Text | Phaser.GameObjects.Graphics) => el.setVisible(!el.visible))
        this.game.scene.keys['Chat'].scrolling.height += emojiHeight - 3;
        this.game.scene.keys['Chat'].scrollHeight -= emojiHeight;
        this.game.scene.keys['Chat'].scrolling.bottom = this.game.scene.keys['Chat'].scrollHeight
        this.game.scene.keys['Chat'].scrolling.scrollY = this.game.scene.keys['Chat'].scrollHeight
        
      }
      
      let login: string;

      if (this.state.platform !== 'web') login = this.state.name;
      else login = this.state.user.login;
      
      this.state.amplitude.getInstance().logEvent('chat_send', {
        farm_id: this.state.farm
      });
      
      this.state.socket.io.emit('send', {
        id: this.state.user.id,
        hash: this.state.user.hash,
        login: login,
        text: this.mainInput.value,
        type: 1
      });

      this.mainInput.value = '';
      chatText.setText(this.mainInput.value).setDepth(4).setCrop(0, 0, 280, 100).setAlpha(1);
      
    }
    
  }
  
  this.click(sendMsgBtn, (): void => {
    sendMsg()
  })
  
  let enter: Phaser.Input.Keyboard.Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)
  enter.on('down', (): void => {
    sendMsg()
  });
  
  // Панель смайлов
  this.click(emojiBtn, (): void => {
    emojiElements.forEach((el) => el.setVisible(!el.visible))
    
    if (!emojiBGround.visible) {
      this.game.scene.keys['Chat'].scrolling.height += emojiHeight - 3;
      this.game.scene.keys['Chat'].scrollHeight -= emojiHeight;
    } else {
      this.game.scene.keys['Chat'].scrolling.height -= emojiHeight - 3;
      this.game.scene.keys['Chat'].scrollHeight += emojiHeight;
    }
    
    this.game.scene.keys['Chat'].scrolling.bottom = this.game.scene.keys['Chat'].scrollHeight
    this.game.scene.keys['Chat'].scrolling.scrollY = this.game.scene.keys['Chat'].scrollHeight
    
  })
  
  // Ресайз
  window.onresize = (): void => {
    
    if (window.innerHeight !== tempHeight) {
      
      tempHeight = window.innerHeight;
      
      if (tempHeight < windowHeight) {
        
        root.scrollIntoView(false)
        modalElements.forEach((el) => el.setY(el.y + padding))
        this.game.scene.keys['Chat'].scrolling.y += padding
        this.mainInput.style.top = '86%';
        this.mainInput.style.bottom = '9%';  
        
      } else {
        
        modalElements.forEach((el) => el.setY(el.y - padding))
        this.game.scene.keys['Chat'].scrolling.y -= padding
        this.mainInput.style.top = '76%';
        this.mainInput.style.bottom = '19%';  
        
      }
      
    }
    
  }

  // Фокус
  chatInputZone.on('pointerdown', (): void => {
        
    this.mainInput.style.display = 'block';
    this.mainInput.focus();
    chatText.setAlpha(0);

  });
  
  // Блюр
  chatModalZone.on('pointerdown', (): void => {
    
    this.mainInput.style.display = 'none';
    this.mainInput.blur();
    chatText.setText(this.mainInput.value).setDepth(4).setCrop(0, 0, 280, 100).setAlpha(1);
    
  });
  
  // Закрытие окна
  this.clickButton(closeBtn, (): void => {
    
    this.mainInput.remove();
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.scene.stop('Chat');
    this.scene.stop('Modal');
    enter.destroy()
    
  });
  
}

export {
  createChatBars
}
