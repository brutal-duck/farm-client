import axios from "axios";
import Modal from "../../../scenes/Modal/Modal";

export default class ConfirmSaveYandexProgress {
  public scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private create(): void {
    this.scene.textHeader.setText(this.scene.state.lang.saveProgress);
    this.scene.close.setVisible(false);
    this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 70, this.scene.state.lang.findSavedProgress, {
      font: '26px Bip',
      color: '#925C28',
      wordWrap: { width: 450 },
      align: 'center',
    }).setOrigin(0.5);
    
    const greenBtn = this.scene.bigButton('green', 'center', 20, this.scene.state.lang.repeatSave);
    const redBtn = this.scene.bigButton('yellow', 'center', 110, this.scene.state.lang.loadOldSave);

    this.scene.clickModalBtn(greenBtn, (): void => {
      this.onBtnClick(true);
    });

    this.scene.clickModalBtn(redBtn, (): void => { 
      this.onBtnClick(false)
    });

    this.scene.resizeWindow(250);
  }


  private onBtnClick(currentUser: boolean): void {
    this.scene.state.ysdk.getPlayer().then((player) => {
      const data = {
        id: this.scene.state.user.id,
        hash: this.scene.state.user.hash,
        counter: this.scene.state.user.counter,
        yaId: player.getUniqueID(),
        currentUser: currentUser,
      }

      axios.post(process.env.API + '/saveProgressYa', data)
        .then((res) => { 
          this.closeWindow();
          if (!currentUser) location.reload();
         });
    }); 
  }

  private closeWindow(): void {
    this.scene.scene.stop();
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
  }
}