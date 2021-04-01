
import SheepBars from './../scenes/Sheep/SheepBars';
import ChickenBars from './../scenes/Chicken/ChickenBars';
import CowBars from './../scenes/Cow/CowBars';
import EventBars from './../scenes/Event/EventBars';

export default class BarsMenu extends Phaser.GameObjects.Sprite {
  public scene: SheepBars | ChickenBars | CowBars | EventBars; 
  private profileIcon: Phaser.GameObjects.Sprite;
  private chatIcon: Phaser.GameObjects.Sprite;
  private authIcon: Phaser.GameObjects.Sprite;
  private offlineIcon: Phaser.GameObjects.Sprite;
  public isOpened: boolean = false;
  private showTimer: number = 0;
  private profileAnim: Phaser.Tweens.Tween;
  private chatAnim: Phaser.Tweens.Tween;

  constructor(scene: SheepBars | ChickenBars | CowBars | EventBars) {
    super(scene, 650, scene.height - 90, 'sandwich');
    this.init();
  }
  static create(scene: SheepBars | ChickenBars | CowBars | EventBars): BarsMenu {
    return new BarsMenu(scene);
  }

  private init(): void {
    this.buildElements();
    this.setListeners();
  }

  public preUpdate(): void {
    this.setVisibility();
    this.tickShowTimerAndSetState();
  }

  private buildElements(): void {
    this.scene.add.existing(this);
    this.setDepth(this.y + 3);
    this.profileIcon = this.scene.add.sprite(this.x, this.y, 'profile').setScale(0.8).setDepth(this.y + 2);
    this.chatIcon = this.scene.add.sprite(this.x, this.y, 'chat').setScale(0.8).setDepth(this.y + 2);
    this.authIcon = this.scene.add.sprite(this.x, this.y, 'profile').setVisible(false).setDepth(this.y + 2);
    this.offlineIcon = this.scene.add.sprite(this.x, this.y, 'offline')
    .setInteractive()
    .setDepth(this.y + 4)
    .setVisible(false);
  }

  private setListeners(): void {
    this.scene.clickButton(this.authIcon, (): void => {
      let modal: Imodal = {
        type: 1,
        sysType: 15
      }
      this.scene.state.modal = modal;
      this.scene.scene.launch('Modal', this.scene.state);
    });
    this.scene.clickButton(this.profileIcon, (): void => {
      let modal: Imodal = {
        type: 1,
        sysType: 7
      }
      this.scene.state.modal = modal;
      this.scene.scene.launch('Modal', this.scene.state);
    });
    this.scene.clickButton(this.chatIcon, (): void => {
      let modal: Imodal = { type: 9 }
      this.scene.state.modal = modal;
      this.scene.scene.launch('Modal', this.scene.state);
    });
    this.scene.clickButton(this, (): void => {
      this.removeAmimation();
      if (!this.profileAnim && !this.chatAnim) {
        this.isOpened = !this.isOpened;
        this.showTimer = 0;
        if (!this.isOpened) {
          this.hideElements();
          this.setTexture('sandwich');
        } else {
          this.showElements();
          this.setTexture('sandwich-close');
        }
      }
    });
  }

  private removeAmimation(): void {
    this.profileAnim?.remove()
    this.profileAnim = undefined;
    this.chatAnim?.remove();
    this.chatAnim = undefined;
    
  }



  private setVisibility(): void {

    if (this.scene.state.platform === 'web' && this.scene.state.user.login === '' && !this.authIcon.visible) { 
      this.authIcon.setVisible(true);
      this.setVisible(false);
      this.profileIcon.setVisible(false);
      this.chatIcon.setVisible(false);
    } else if (this.scene.state.platform === 'web' && this.scene.state.user.login !== '' && this.authIcon.visible) {
      this.authIcon.setVisible(false);
      this.setVisible(true);
      this.profileIcon.setVisible(true);
      this.chatIcon.setVisible(true);
    }

    if (!this.scene.state.online && !this.offlineIcon.visible) {
      this.offlineIcon.setVisible(true);
      this.hideElements();
    }

    if (this.scene.state.farm === 'Sheep' && this.scene.state.userSheep.tutorial < 100) {
      this.authIcon.setVisible(false);
      this.setVisible(false);
      this.chatIcon.setVisible(false);
      this.profileIcon.setVisible(false);
    } else if (this.scene.state.farm === 'Sheep' && this.scene.state.userSheep.tutorial >= 100 && this.scene.state.platform === 'web' && !this.visible) {
      this.authIcon.setVisible(true);
    } else if (this.scene.state.farm === 'Sheep' && this.scene.state.userSheep.tutorial >= 100 && this.scene.state.platform !== 'web') {
      this.authIcon.setVisible(false);
      this.setVisible(true);
      this.chatIcon.setVisible(true);
      this.profileIcon.setVisible(true);
    }

    if (this.scene.state.farm === 'Event' && this.scene.state.user.additionalTutorial.eventTutorial < 80 && this.visible) {
      this.setVisible(false);
      this.chatIcon.setVisible(false);
      this.profileIcon.setVisible(false);
    } else if (this.scene.state.farm === 'Event' && this.scene.state.user.additionalTutorial.eventTutorial >= 80 &&  !this.visible) {
      this.setVisible(true);
      this.profileIcon.setVisible(true);
      this.chatIcon.setVisible(true);
    }


  }

  private tickShowTimerAndSetState(): void {
    if (this.isOpened) {
      this.showTimer++;
      if (this.showTimer >= 250 && !this.profileAnim && !this.chatAnim) {
        this.hideElements();
        this.isOpened = false;
        this.showTimer = 0;
        this.setTexture('sandwich');
      }
    }
  }


  private showElements(): void {
    const duration: number = 500;
    this.profileAnim = this.scene.add.tween({
      targets: this.profileIcon,
      duration: duration,
      y: { from: this.y, to: this.y - 250 },
      ease: 'Power1',
      scale: 1,
    });
    this.chatAnim = this.scene.add.tween({
      targets: this.chatIcon,
      y: { from: this.y, to: this.y - 125 },
      duration: duration,
      ease: 'Power1',
      scale: 1,
      onComplete: (): void => {
        this.removeAmimation();
      }
    });
  }

  private hideElements(): void {
    const duration: number = 500;
    this.profileAnim = this.scene.add.tween({
      targets: this.profileIcon,
      duration: duration,
      y: { from: this.profileIcon.y, to: this.y },
      ease: 'Power1',
      scale: 0.8,
    });
    this.chatAnim = this.scene.add.tween({
      targets: this.chatIcon,
      y: { from: this.chatIcon.y, to: this.y },
      duration: duration,
      ease: 'Power1',
      scale: 0.8,
      onComplete: (): void => {
        this.removeAmimation()
      }
    });
  }
}