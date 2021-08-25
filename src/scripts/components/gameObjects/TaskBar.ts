import { shortNum } from "../../general/basic";
import Modal from "../../scenes/Modal/Modal"
import RoundedProgress from "../animations/RoundedProgress"

export default class TaskBar extends Phaser.GameObjects.Sprite {

  public scene: Modal;
  public x: number;
  public y: number;
  public taskInfo: { task: Itasks, taskData: ItaskData };

  private barHeight: number;
  private icon: Phaser.GameObjects.Sprite;
  private bar: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private valutaTexture: string;
  private award: string

  constructor(x: number, y: number, taskInfo: { task: Itasks, taskData: ItaskData }, scene: Modal) {
    super(scene, x, y, '');
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.taskInfo = taskInfo;
    this.scene.add.existing(this);
    this.init();
  }


  private init(): void {
    this.barHeight = 140

    const moneyTask = this.scene.game.scene.keys['Sheep'].moneyTasks.find(el => el.id === this.taskInfo.task.id)
    if (this.scene.state.farm === 'Sheep' && moneyTask) {     
      this.valutaTexture = 'sheepCoin';
      this.award = '';
    } else {
      this.valutaTexture = 'diamond';
      this.award = String(this.taskInfo.task.diamonds);
    }

    this.icon = this.scene.add.sprite(this.x, this.y, this.taskInfo.taskData.icon).setDepth(3).setScale(0.9)
    this.bar = this.scene.add.sprite(this.x, this.y, 'tasks-bar').setOrigin(0, 1).setDepth(3).setVisible(false)
    this.text = this.scene.add.text(this.x, this.y, this.taskInfo.taskData.name,{
      font: '24px Bip',
      color: '#944000',
      align: 'center',
      wordWrap: { width: 330 }
    }).setDepth(3).setOrigin(0.5)

    if (this.text.height > 30) this.barHeight += (this.text.height - 30) / 2

    this.setOrigin(0.5, 0).setDepth(2)
    this.create()
  }


  private create(): void {
    if (this.taskInfo.task.done === 1 && this.taskInfo.task.got_awarded === 1) this.taskComplete()
    else if (this.taskInfo.task.done === 1 && this.taskInfo.task.got_awarded === 0) this.taskCompleteAwardNonTaken()
    else this.taskInProgress()
  }


  private taskComplete(): void {
    // Задание выполнено, награда получена
    this.setTexture('tasks-complete').setDisplaySize(460, this.barHeight)
    this.text.setPosition(this.getCenter().x + 60, this.getCenter().y).setColor('#494949').setAlpha(0.6)
    this.icon.setPosition(this.getLeftCenter().x + 60, this.getCenter().y - 10).setTint(0x777777).setAlpha(0.5)
    this.scene.add.sprite(this.icon.x, this.icon.y, 'completed').setDepth(3).setTint(0xc0c0c0).setAlpha(0.9);
  }


  private taskCompleteAwardNonTaken(): void {
    // Задание выполнено, награда не получена
    this.setTexture('tasks-reward').setDisplaySize(460, this.barHeight)
    this.bar.setPosition(this.getBottomCenter().x - 30, this.getBottomCenter().y - 1).setVisible(true)
    const takeButton: Phaser.GameObjects.Sprite = this.scene.add.sprite(this.bar.getLeftCenter().x + 18, this.bar.getLeftCenter().y + 3, 'little-button').setOrigin(0, 0.5).setDepth(3).setDisplaySize(134, 48);
    const takeText: Phaser.GameObjects.Text = this.scene.add.text(takeButton.getCenter().x, takeButton.getCenter().y - 4, this.scene.state.lang.pickUp, { font: '22px Shadow', color: '#FFFFFF' }).setOrigin(0.5).setDepth(3)
    const valuta: Phaser.GameObjects.Sprite = this.scene.add.sprite(takeButton.getRightCenter().x + (this.award ? 6 : 18), takeButton.getRightCenter().y, this.valutaTexture).setOrigin(0, 0.5).setDepth(3).setScale(0.14)
    this.scene.add.text(valuta.getRightCenter().x + 4, valuta.getRightCenter().y, this.award, { font: '34px Bip', color: '#FFFFFF' }).setDepth(3).setOrigin(0, 0.5).setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 5)
    this.text.setPosition(this.getCenter().x + 60, this.getCenter().y - 26)
    this.icon.setPosition(this.getLeftCenter().x + 60, this.getCenter().y - 10).setTint(0x777777)
    this.scene.add.sprite(this.icon.x, this.icon.y, 'completed').setDepth(3)

    this.scene.clickShopBtn({ btn: takeButton, title: takeText, img: false }, (): void => {
      if (this.valutaTexture === 'diamond') this.scene.game.scene.keys[this.scene.state.farm + 'Bars'].getCurrency({ x: takeButton.x, y: takeButton.y }, this.taskInfo.task.diamonds, 'diamond');
      else if (this.valutaTexture === 'sheepCoin')  this.scene.game.scene.keys[this.scene.state.farm + 'Bars'].plusMoneyAnimation({ x: takeButton.x, y: takeButton.y });
      this.scene.game.scene.keys[this.scene.state.farm].pickUpTaskReward(this.taskInfo.task.id);
    });
  }


  private taskInProgress(): void {
    // Задание выполняется
    this.setTexture('tasks-uncomplete').setDisplaySize(460, this.barHeight)
    this.scene.click(this, (): void => {
      this.scene.scene.stop('Modal');
      this.scene.clickTaskBoard(this.taskInfo.task);
    });

    this.bar.setPosition(this.getBottomCenter().x - 30, this.getBottomCenter().y - 1).setVisible(true)
    const takeText: Phaser.GameObjects.Text = this.scene.add.text(this.bar.getLeftCenter().x + 30, this.bar.getLeftCenter().y, this.scene.state.lang.taskReward, { font: '24px Shadow', color: '#FFFFFF' }).setOrigin(0, 0.5).setDepth(3)
    const valuta: Phaser.GameObjects.Sprite = this.scene.add.sprite(takeText.getRightCenter().x + (this.award ? 8 : 16), takeText.getRightCenter().y, this.valutaTexture).setOrigin(0, 0.5).setDepth(3).setScale(0.14)
    this.scene.add.text(valuta.getRightCenter().x + 4, valuta.getRightCenter().y, this.award, { font: '34px Bip', color: '#FFFFFF' }).setDepth(3).setOrigin(0, 0.5).setShadow(2, 2, 'rgba(0, 0, 0, 0.5)', 5)
    
    this.text.setPosition(this.getCenter().x + 60, this.getCenter().y - 26)

    this.icon.setPosition(this.getLeftCenter().x + 60, this.getCenter().y - 10)
    let count: number = this.taskInfo.task.type === 14 && this.taskInfo.task.count === 0 ? this.scene.state[`${this.scene.state.farm}Settings`][`${this.scene.state.farm}Settings`].length : this.taskInfo.task.count;
    const doneText: Phaser.GameObjects.Text = this.scene.add.text(this.icon.x, this.icon.getBottomCenter().y + 26, `${shortNum(this.taskInfo.task.progress)}/${shortNum(count)}`, { font: '26px Shadow', color: '#944000' }).setDepth(3).setOrigin(0.5).setShadow(1, 1, 'rgba(0, 0, 0, 0.5)', 2);
    if (doneText.width > 120) doneText.setOrigin(0, 0.5).setX(this.icon.getLeftCenter().x - 18).setFontSize(24);

    const progress = new RoundedProgress(this.scene, this.icon.x, this.icon.y, 1.2).setPercent(Math.round(100 / count * this.taskInfo.task.progress)).setTint(0x70399f)
    this.scene.add.sprite(progress.rightSegment.x, progress.rightSegment.y, 'circle-outline').setScale(0.95).setTint(0xc09245).setDepth(progress.rightSegment.depth + 1);
    this.scene.add.sprite(progress.rightSegment.x, progress.rightSegment.y, 'circle-outline').setScale(1.2).setTint(0xc09245).setDepth(progress.rightSegment.depth + 1);
  }
}