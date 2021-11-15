import Sheep from './../../scenes/Sheep/Main';
import Chicken from './../../scenes/Chicken/Main';
import Cow from './../../scenes/Cow/Main';
import Unicorn from './../../scenes/Event/Unicorns/Main';

export default class Achievement {
  public scene: Sheep | Chicken | Cow | Unicorn;
  private state: Istate;

  constructor(scene: Sheep | Chicken | Cow | Unicorn) {
    this.scene = scene;
    this.state = this.scene.state;
  }

  public tryId(id: number, count: number = 1): void {
    const achievement = this.state.user.achievements.find(ach => ach.id === id && ach.count > ach.progress);
    if (achievement) achievement.progress += count;
  }
  
  public tryType(type: number, achState: number = 0, count: number = 1): void {
    const filteredAchievements: Iachievement[] = this.state.user.achievements.filter(ach => ach.type === type && ach.count > ach.progress);
    filteredAchievements.forEach(ach => {
      if (ach.state === achState) ach.progress += count;
    });
    if (type === 2) this.checkDoneFarm();
  }

  /**
   * 
   * @param currProgress Текущий прогресс
   * @param id Если нужно уставновить прогресс для ачивки с id
   * @param type Если нужно установить прогресс для ачивки с типом
   * @param achState Если нужно установить прогресс для ачивки с типом и стейтом
   */
  public setCurrentProgress(currProgress: number, id: number = 0, type: number = 0, achState: number = 0): void {
    if (id !== 0) {
      const achievement = this.state.user.achievements.find(ach => ach.id === id && ach.count > ach.progress);
      if (achievement) achievement.progress = currProgress;
    } else {
      const filteredAchievements: Iachievement[] = this.state.user.achievements.filter(ach => ach.type === type && ach.count > ach.progress);
      filteredAchievements.forEach(ach => {
        if (ach.state === achState) ach.progress = currProgress;
      });
    }
  }

  public tryClanTypes(type: number): void {
    this.tryType(12);
    if (type !== 6 && type !== 14 && type !== 16 && type !== 17 && type !== 19) this.tryType(type + 12);
    else if (type === 19) this.tryId(275);
  }

  public checkDoneFarm(): void {
    const mainScene = this.scene as Sheep | Chicken | Cow;
    const maxPart: number = this.state[`${this.state.farm.toLowerCase()}Settings`][`${this.state.farm.toLowerCase()}Parts`].length;
    if (this.state[`user${this.state.farm}`].part === maxPart) {
      const partTask: Itasks[] = mainScene.partTasks();
      const check = partTask.every(el => el.done === 1 && el.got_awarded);
      if (check) this.tryId(40);
    }
  }
};
