function createChatBars(height: number): void {

  let sendMsgBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 187, this.cameras.main.centerY + 345 + this.game.scene.keys['Modal'].chatHeight, 'chat-send-btn').setOrigin(0.5, 0.5)
  let emojiBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 102, this.cameras.main.centerY + 345 + this.game.scene.keys['Modal'].chatHeight, 'chat-emoji-btn').setOrigin(0.5, 0.5)
  let closeBtn: Phaser.GameObjects.Sprite = this.add.sprite(this.cameras.main.centerX + 236, this.cameras.main.centerY - 388 + this.game.scene.keys['Modal'].chatHeight, 'header-close').setOrigin(0.5, 0.5)
  
  this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - 392 + this.game.scene.keys['Modal'].chatHeight, this.state.lang.chat, {
    font: '52px Bip',
    color: '#59120E',
    align: 'center',
  }).setOrigin(0.5, 0.5)

  this.clickButton(closeBtn, (): void => {
    
    this.game.scene.keys[this.state.farm].scrolling.wheel = true;
    this.scene.stop('Chat');
    this.scene.stop('Modal');
  
  });

  this.click(sendMsgBtn, (): void => {
    console.log('Send')
  })
  
  this.click(emojiBtn, (): void => {
    console.log('Emoji')
  })

}

export {
  createChatBars
}





