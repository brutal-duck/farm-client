type gameObject =  Phaser.GameObjects.Sprite | Phaser.GameObjects.RenderTexture | Phaser.GameObjects.Text;

export default class FadeOut {
  private _gameObj: gameObject;
  private _scene: Phaser.Scene;

  constructor(scene:Phaser.Scene, gameObj: gameObject) {
    this._gameObj = gameObj;
    this._scene = scene;
    this.setAnim();
  }
  
  public static create(scene: Phaser.Scene, gameObj: gameObject) {
    new FadeOut(scene, gameObj);
  }

  private setAnim(): void {
    this._scene.add.tween({
      targets: this._gameObj,
      alpha: 0,
      duration: 1500,
      onComplete: (): void => {
        this._gameObj?.destroy();
      }
    });
  }
  
}