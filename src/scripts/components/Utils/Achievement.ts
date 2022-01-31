import Sheep from './../../scenes/Sheep/Main';
import Chicken from './../../scenes/Chicken/Main';
import Cow from './../../scenes/Cow/Main';
import Unicorn from './../../scenes/Event/Unicorns/Main';
import BarsScene from './../Scenes/BarsScene';
import Hint, { hintScene } from './../animations/Hint';
import Utils from './../../libs/Utils';
import Fortune from './../../scenes/Fortune';
import Modal from './../../scenes/Modal/Modal';
import Profile from './../../scenes/Profile';
import ClanFarm from './../../scenes/ClanFarm';
import assets from '../../data/assets';
export default class Achievement {
  public scene: Sheep | Chicken | Cow | Unicorn;
  private state: Istate;

  constructor(scene: Sheep | Chicken | Cow | Unicorn) {
    this.scene = scene;
    this.state = this.scene.state;
  }

  public tryId(id: number, count: number = 1): void {
    const achievement = this.state.user.achievements.find(ach => ach.id === id && ach.count > ach.progress);
    if (achievement) {
      achievement.progress += count;
      if (achievement.progress >= achievement.count) this.setDone(achievement);
    }
  }
  
  public tryType(type: number, achState: number = 0, count: number = 1): void {
    const filteredAchievements: Iachievement[] = this.state.user.achievements.filter(ach => ach.type === type && ach.count > ach.progress);
    filteredAchievements.forEach(ach => {
      if (ach.state === achState) ach.progress += count;
      if (ach.progress >= ach.count) this.setDone(ach);
    });
    if (type === 2) this.checkDoneFarm();
  }

  private setDone(ach: Iachievement): void {
    const barsScene = this.scene.game.scene.getScene(`${this.scene.state.farm}Bars`) as BarsScene;
    const fortuneScene = this.scene.game.scene.getScene('Fortune') as Fortune;
    const modalScene = this.scene.game.scene.getScene('Modal') as Modal;
    const profileScene = this.scene.game.scene.getScene('Profile') as Profile;
    const clanScene = this.scene.game.scene.getScene('ClanFarm') as ClanFarm;
    let currentScene: hintScene = barsScene;
    if (this.scene.scene.isActive('Fortune')) currentScene = fortuneScene;
    // else if (this.scene.scene.isActive('Modal')) currentScene = modalScene;
    else if (this.scene.scene.isActive('Profile')) currentScene = profileScene;
    else if (this.scene.scene.isActive('ClanFarm')) currentScene = clanScene;
    
    const status = ach.id === 41 ? 'unicorn' : `ach${ach.id}`;
    const hintStr = `${Utils.ucFirst(this.state.lang.achievementUnlock)}\n${Utils.ucFirst(this.state.lang[`${status}Status`])}`;
    if (currentScene.scene.isActive()) Hint.create(currentScene, -250, hintStr, 2);
    const checkStatus = this.state.user.statuses.some(el => el === status);
    if (!checkStatus) this.state.user.statuses.push(status);
    if (!this.state.user.status) this.state.user.status = status;
  }

  /**
   * 
   * @param currProgress Текущий прогресс
   * @param id Если нужно уставновить прогресс для ачивки с id
   * @param type Если нужно установить прогресс для ачивки с типом
   * @param achState Если нужно установить прогресс для ачивки с типом и стейтом
   */
  public static setCurrentProgress(state: Istate, currProgress: number, id: number = 0, type: number = 0, achState: number = 0): void {
    if (id !== 0) {
      const achievement = state.user.achievements.find(ach => ach.id === id && ach.count > ach.progress);
      if (achievement) achievement.progress = currProgress;
    } else {
      const filteredAchievements: Iachievement[] = state.user.achievements.filter(ach => ach.type === type && ach.count > ach.progress);
      filteredAchievements.forEach(ach => {
        if (ach.state === achState) ach.progress = currProgress;
        if (ach.progress >= ach.count) {
          const status = ach.id === 41 ? 'unicorn' : `ach${ach.id}`;
          const checkStatus = state.user.statuses.some(el => el === status);
          if (!checkStatus) state.user.statuses.push(status);
          if (!state.user.status) state.user.status = status;
        }
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
    let maxPart: number = this.state[`${this.state.farm.toLowerCase()}Settings`][`${this.state.farm.toLowerCase()}Parts`].length;
    if (Utils.checkTestB(this.scene.state)) maxPart = this.state[`${this.state.farm.toLowerCase()}Settings`].partSettings.length;
    if (this.state[`user${this.state.farm}`].part === maxPart) {
      const partTask: Itasks[] = mainScene.partTasks();
      const check = partTask.every(el => el.done === 1);
      if (check) this.tryId(40);
    }
  }

  public lazyLoading(status: string): Promise<Boolean> {
    return new Promise((resolve) => {
      if (!status) return resolve(true);
      if (this.scene.textures.exists(`${status}-status`)) return resolve(true);
      this.scene.load.image(`${status}-status`, assets.iconsUrl[status]);
      this.scene.load.on('complete', () => resolve(true));
      this.scene.load.start();
    });
  }
};
