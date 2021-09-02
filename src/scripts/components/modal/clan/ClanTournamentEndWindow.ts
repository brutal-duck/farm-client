import Modal from "../../../scenes/Modal/Modal";

export default class ClanTournamentEndWindow {
  public scene: Modal

  constructor(scene: Modal) {
    this.scene = scene
    this.create()
  }

  public create(): void {
    const y: number = this.scene.cameras.main.centerY - 280;
    const x: number = this.scene.cameras.main.centerX;
    const width: number = 527;
    const height: number = 480;
    const titleStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '23px',
      align: 'left',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
      wordWrap: { width: 400, useAdvancedWrap: true },
    };



    const header: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, y, 'modal-header-event-end').setDepth(2);
    const mid: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(x, header.getBottomCenter().y - 10, width, height, 'white-pixel').setOrigin(0.5, 0).setTint(0xFF9700);
    const bottom: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, mid.getBottomCenter().y, 'profile-window-footer').setOrigin(0.5, 0);

    const bg: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(x, header.getBottomCenter().y + 20, 480, 440, 'modal-square-bg', 10).setOrigin(0.5, 0).setDepth(2);
    const titleSlot: Phaser.GameObjects.Sprite = this.scene.add.sprite(x, bg.getTopCenter().y + 2, 'clan-window-leader-plate-2').setOrigin(0.5, 0).setDisplaySize(479, 45).setDepth(2);
    const title: Phaser.GameObjects.Text = this.scene.add.text(x, titleSlot.getCenter().y, 'sgvwrfe', titleStyle).setOrigin(0.5).setDepth(2)

    this.createClanInfo(x, titleSlot.getBottomCenter().y + 40)
    // clan-window-line
  }


  private createClanInfo(x: number, y: number): void {
    const crown: Phaser.GameObjects.Sprite = this.scene.add.sprite(x + 100, y, 'clan-window-crown').setDepth(2);
    // const text
  }
}