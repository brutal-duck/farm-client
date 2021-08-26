import { shortNum } from "../../general/basic";
import Modal from "../../scenes/Modal/Modal"
import RoundedProgress from "../animations/RoundedProgress"

export default class TaskBar extends Phaser.GameObjects.Sprite {

  public scene: Modal;
  public taskInfo: { task: Itasks, taskData: ItaskData };

  private barHeight: number;
  private valutaTexture: string;
  private award: string;
  
  private icon: Phaser.GameObjects.Sprite;
  private bar: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private takeButton: Phaser.GameObjects.Sprite;
  private barText: Phaser.GameObjects.Text;
  private valuta: Phaser.GameObjects.Sprite;
  private valutaSum: Phaser.GameObjects.Text;
  private checkIcon: Phaser.GameObjects.Sprite;
  private progressText: Phaser.GameObjects.Text;
  private progress: RoundedProgress;
  private ringInner: Phaser.GameObjects.Sprite;
  private ringOuter: Phaser.GameObjects.Sprite;

  private taskInProgressTextStyle: Phaser.Types.GameObjects.Text.TextStyle;
  private taskCompliteAwardNonTakenTextColor: string;
  private taskCompliteAwardTakenTextColor: string;

  private currentProgress: number;
  private done: number;

  constructor(x: number, y: number, taskInfo: { task: Itasks, taskData: ItaskData }, scene: Modal) {
    super(scene, x, y, '');
    this.scene = scene;    
    this.taskInfo = taskInfo;
    this.scene.add.existing(this);
    this.init();
    this.create();
  }

  private init(): void {
    this.barHeight = 140;

    const moneyTask = this.scene.game.scene.keys['Sheep'].moneyTasks.find(el => el.id === this.taskInfo.task.id);
    if (this.scene.state.farm === 'Sheep' && moneyTask) {     
      this.valutaTexture = 'sheepCoin';
      this.award = '';
    } else {
      this.valutaTexture = 'diamond';
      this.award = String(this.taskInfo.task.diamonds);
    }

    this.taskInProgressTextStyle = {
      fontFamily: 'Bip',
      fontSize: '24px',
      color: '#e08400',
      align: 'center',
      wordWrap: { width: 330 }
    }

    this.taskCompliteAwardNonTakenTextColor = '#759534';
    this.taskCompliteAwardTakenTextColor = '#494949';

    this.currentProgress = this.taskInfo.task.progress;
    this.done = this.taskInfo.task.done;

    this.setOrigin(0.5, 0).setDepth(2);
  }


  private create(): void {
    this.icon = this.scene.add.sprite(this.x - 170, this.y + 60, this.taskInfo.taskData.icon).setDepth(3).setScale(0.9);
    this.text = this.scene.add.text(this.x, this.y, this.taskInfo.taskData.name, this.taskInProgressTextStyle).setDepth(3).setOrigin(0.5);
    
    if (this.text.height > 30) this.barHeight += (this.text.height - 30) / 2;

    this.bar = this.scene.add.sprite(this.x, this.y, 'tasks-bar').setOrigin(0, 1).setDepth(3);
    this.barText = this.scene.add.text(this.x, this.y, '', { font: '24px Shadow', color: '#FFFFFF' }).setOrigin(0, 0.5).setDepth(4);
    this.valuta = this.scene.add.sprite(this.x, this.y, this.valutaTexture).setOrigin(0, 0.5).setDepth(3).setScale(0.14);
    this.valutaSum = this.scene.add.text(this.x, this.y, this.award, { font: '34px Bip', color: '#FFFFFF' }).setDepth(3).setOrigin(0, 0.5).setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 5);
    this.checkIcon = this.scene.add.sprite(this.icon.x, this.icon.y, 'completed').setDepth(4);
    
    let count: number = this.taskInfo.task.type === 14 && this.taskInfo.task.count === 0 ? this.scene.state[`${this.scene.state.farm.toLowerCase()}Settings`][`${this.scene.state.farm.toLowerCase()}Settings`].length : this.taskInfo.task.count;
    this.progressText = this.scene.add.text(this.icon.x, this.icon.getBottomCenter().y + 26, `${shortNum(this.taskInfo.task.progress)}/${shortNum(count)}`, { font: '26px Shadow', color: '#b65e00' }).setDepth(3).setOrigin(0.5).setShadow(1, 1, 'rgba(0, 0, 0, 0.5)', 2);
    if (this.progressText.width > 120) this.progressText.setOrigin(0, 0.5).setX(this.icon.getLeftCenter().x - 18).setFontSize(24);

    this.progress = new RoundedProgress(this.scene, this.icon.x, this.icon.y, 1.2).setPercent(Math.round(100 / count * this.taskInfo.task.progress)).setTint(0x70399f);
    this.ringInner = this.scene.add.sprite(this.progress.rightSegment.x, this.progress.rightSegment.y, 'circle-outline').setScale(0.95).setTint(0xc09245).setDepth(this.progress.rightSegment.depth + 1);
    this.ringOuter = this.scene.add.sprite(this.progress.rightSegment.x, this.progress.rightSegment.y, 'circle-outline').setScale(1.2).setTint(0xc09245).setDepth(this.progress.rightSegment.depth + 1);

    if (this.taskInfo.task.done === 1 && this.taskInfo.task.got_awarded === 1) this.taskComplete();
    else if (this.taskInfo.task.done === 1 && this.taskInfo.task.got_awarded === 0) this.taskCompleteAwardNonTaken();
    else this.taskInProgress();
  }


  private taskInProgress(): void {
    // Задание выполняется
    this.setTexture('tasks-uncomplete').setDisplaySize(460, this.barHeight);
    this.scene.click(this, (): void => {
      this.scene.scene.stop('Modal');
      this.scene.clickTaskBoard(this.taskInfo.task);
    });
    
    this.text.setPosition(this.getCenter().x + 60, this.getCenter().y - 26);
    this.bar.setPosition(this.x - 30, this.y + this.getBounds().height - 1);
    this.barText.setPosition(this.bar.getLeftCenter().x + 30, this.bar.getLeftCenter().y).setText(this.scene.state.lang.taskReward);
    this.valuta.setPosition(this.barText.getRightCenter().x + (this.award ? 6 : 24), this.barText.getRightCenter().y);
    this.valutaSum.setPosition(this.valuta.getRightCenter().x + 4, this.valuta.getRightCenter().y);
    this.checkIcon.setVisible(false);
  }


  private taskCompleteAwardNonTaken(): void {
    // Задание выполнено, награда не получена
    this.setTexture('tasks-reward').setDisplaySize(460, this.barHeight);
    this.text.setPosition(this.getCenter().x + 60, this.getCenter().y - 26).setColor(this.taskCompliteAwardNonTakenTextColor);
    this.bar.setPosition(this.x - 30, this.y + this.getBounds().height - 1);
    this.takeButton = this.scene.add.sprite(this.bar.getLeftCenter().x + 18, this.bar.getLeftCenter().y + 3, 'little-button').setOrigin(0, 0.5).setDepth(3).setDisplaySize(134, 48);
    this.barText.setPosition(this.takeButton.getCenter().x, this.takeButton.getCenter().y - 4).setFontSize(22).setText(this.scene.state.lang.pickUp).setOrigin(0.5);
    this.valuta.setPosition(this.barText.getRightCenter().x + (this.award ? 18 : 24), this.barText.getRightCenter().y);
    this.valutaSum.setPosition(this.valuta.getRightCenter().x + 4, this.valuta.getRightCenter().y);
    this.checkIcon.setVisible(true);
    this.hideProgress();
    this.scene.taskWindow?.updateProgress();

    this.scene.clickShopBtn({ btn: this.takeButton, title: this.barText, img: false }, (): void => {
      if (this.valutaTexture === 'diamond') this.scene.game.scene.keys[this.scene.state.farm + 'Bars'].getCurrency({ x: this.takeButton.x, y: this.takeButton.y }, this.taskInfo.task.diamonds, 'diamond');
      else this.scene.game.scene.keys[this.scene.state.farm + 'Bars'].plusMoneyAnimation({ x: this.takeButton.x, y: this.takeButton.y });
      this.scene.game.scene.keys[this.scene.state.farm].pickUpTaskReward(this.taskInfo.task.id);
      this.taskComplete();
    });
  }


  private taskComplete(): void {
    // Задание выполнено, награда получена
    this.setTexture('tasks-complete').setDisplaySize(460, this.barHeight);
    this.text.setPosition(this.getCenter().x + 60, this.getCenter().y).setColor(this.taskCompliteAwardTakenTextColor).setAlpha(0.6);

    this.bar?.setVisible(false);
    this.takeButton?.setVisible(false);
    this.barText?.setVisible(false);
    this.valuta?.setVisible(false);
    this.valutaSum?.setVisible(false);
    this.checkIcon.setVisible(true).setTint(0xc0c0c0).setAlpha(0.9);
    this.hideProgress();
    this.scene.taskWindow?.updateProgress();
  }


  private hideProgress(): void {
    this.progressText.setVisible(false);
    this.progress.destroy();
    this.ringInner.setVisible(false);
    this.ringOuter.setVisible(false);
  }


  private setProgress(): void {
    this.currentProgress = this.taskInfo.task.progress;
    const count: number = this.taskInfo.task.type === 14 && this.taskInfo.task.count === 0 ? this.scene.state[`${this.scene.state.farm}Settings`][`${this.scene.state.farm}Settings`].length : this.taskInfo.task.count;
    this.progressText?.setText(`${shortNum(this.taskInfo.task.progress)}/${shortNum(count)}`);
    if (this.progressText?.width > 120) this.progressText.setOrigin(0, 0.5).setX(this.icon.getLeftCenter().x - 18).setFontSize(24);
    this.progress?.setPercent(Math.round(100 / count * this.taskInfo.task.progress));
    if (this.taskInfo.task.done === 1 || Math.round(100 / count * this.taskInfo.task.progress) === 100) this.taskCompleteAwardNonTaken();
  }

  private setDone(): void {
    this.done = this.taskInfo.task.done
    if (this.taskInfo.task.done === 1 && this.taskInfo.task.got_awarded === 0) this.taskCompleteAwardNonTaken();
    else if (this.taskInfo.task.done === 1 && this.taskInfo.task.got_awarded === 1) this.taskComplete();
  }


  public preUpdate(): void {
    if (this.currentProgress !== this.taskInfo.task.progress) this.setProgress();
    if (this.done !== this.taskInfo.task.done) this.setDone();
  }
}