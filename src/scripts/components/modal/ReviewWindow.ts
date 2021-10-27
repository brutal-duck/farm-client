import Modal from '../../scenes/Modal/Modal';
import SpriteButton from './../Buttons/SpriteButton';

export default class ReviewWindow {
  private scene: Modal;

  constructor(scene: Modal) {
    this.scene = scene;
    this.createElements();
  }

  private createElements(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '32px',
      fontFamily: 'Shadow',
      color: '#FEF5D9',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 3, 
        color: 'rgba(0, 0, 0, 0.5)',
        blur: 5,
        fill: true,
      },
    };

    const bg = this.scene.add.sprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY, 'review-bg');
    const bgGeom = bg.getBounds();
    const text = this.scene.add.text(bgGeom.centerX, bgGeom.centerY + 30, this.scene.state.lang.likeGame, textStyle).setOrigin(0.5);
    new SpriteButton(
      this.scene, 
      {
        x: bgGeom.centerX - 90,
        y: bgGeom.centerY + 130,
      },
      (): void => { this.onClickLikeBtn(); },
      'review-btn-like',
    );

    new SpriteButton(
      this.scene, 
      {
        x: bgGeom.centerX + 90,
        y: bgGeom.centerY + 130,
      },
      (): void => { this.onClickDislikeBtn(); },
      'review-btn-dislike',
    );
  }

  private onClickLikeBtn(): void {
    const cordova = window['cordova'];
    cordova.plugins.AppReview.requestReview().catch(() => {
      return cordova.plugins.AppReview.openStoreScreen();
    });
    this.scene.scene.stop();
  }

  private onClickDislikeBtn(): void {
    this.scene.state.modal = {
      type: 1,
      sysType: 25,
    };
    this.scene.scene.restart(this.scene.state);
  }
};
