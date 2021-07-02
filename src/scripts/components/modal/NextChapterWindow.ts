import Modal from "../../scenes/Modal/Modal";

export default class NextChapterWindow {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 50, 'done-chapter');
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 300, this.scene.state.modal.donePart.part, { font: '30px Shadow', fill: '#290F5B' }).setOrigin(0.5, 0.5);
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 260, this.scene.state.modal.donePart.name, { font: '36px Shadow', fill: '#FFDDA7' }).setOrigin(0.5, 0.5);
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 190, this.scene.state.lang.partDone, { font: '44px Shadow', fill: '#50241D' }).setOrigin(0.5, 0.5).setStroke('#FF7700', 7);
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 80, this.scene.state.modal.donePart.doneText, {
      font: '22px Shadow',
      fill: '#FFDEDE',
      align: 'center',
      wordWrap: { width: 350 }
    }).setOrigin(0.5, 0.5);
  
    this.scene.add.text(this.scene.cameras.main.centerX - 80, this.scene.cameras.main.centerY + 45, this.scene.state.lang.yourAward, { font: '26px Shadow', fill: '#643202' }).setOrigin(0.5, 0.5);
    this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 153, this.scene.state.modal.donePart.chapter);
    
    // this.scene.add.sprite(this.scene.cameras.main.centerX + 170, this.scene.cameras.main.centerY + 50, 'plus').setScale(0.8);
    // this.scene.add.sprite(this.scene.cameras.main.centerX + 240, this.scene.cameras.main.centerY + 50, 'award-bg').setScale(0.9);
    // this.scene.add.sprite(this.scene.cameras.main.centerX + 240, this.scene.cameras.main.centerY + 50, 'diamond').setScale(0.25).setAngle(5);
    // this.scene.add.text(this.scene.cameras.main.centerX + 240, this.scene.cameras.main.centerY + 60, this.scene.state.modal.donePart.award, { font: '28px Shadow', fill: '#FFFFFF' }).setOrigin(0.5, 0.5).setAngle(5);
    const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 295, 'done-chapter-button');
    const title: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY + 290, this.scene.state.lang.nextPart, {
      font: '24px Shadow',
      fill: '#FFD2D2',
      align: 'center',
      wordWrap: { width: 260 }
    }).setOrigin(0.5, 0.5).setStroke('#2C5D0C', 5);
  
    this.scene.clickModalBtn({ btn, title }, (): void => { this.closeWindow(); });
  }

  private closeWindow(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.game.scene.keys[this.scene.state.farm].donePart();
  }
}