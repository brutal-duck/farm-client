export default class TaskBar extends Phaser.GameObjects.Sprite {

  public scene: Phaser.Scene
  public x: number
  public y: number
  public task: { task: Itasks, taskData: ItaskData }

  constructor(x: number, y: number, task: { task: Itasks, taskData: ItaskData }, scene: Phaser.Scene) {
    super(scene, x, y, '')
    this.scene = scene
    this.x = x
    this.y = y
    this.task = task
    this.scene.add.existing(this)
  }
}