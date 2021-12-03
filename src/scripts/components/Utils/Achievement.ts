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

enum iconsUrl {
  ach1 = require('../../../assets/images/achievements/icon-1.png'),
  ach2 = require('../../../assets/images/achievements/icon-2.png'),
  ach3 = require('../../../assets/images/achievements/icon-3.png'),
  ach4 = require('../../../assets/images/achievements/icon-4.png'),
  ach5 = require('../../../assets/images/achievements/icon-5.png'),
  ach6 = require('../../../assets/images/achievements/icon-6.png'),
  ach8 = require('../../../assets/images/achievements/icon-8.png'),
  ach9 = require('../../../assets/images/achievements/icon-9.png'),
  ach10 = require('../../../assets/images/achievements/icon-10.png'),
  ach11 = require('../../../assets/images/achievements/icon-11.png'),
  ach12 = require('../../../assets/images/achievements/icon-12.png'),
  ach13 = require('../../../assets/images/achievements/icon-13.png'),
  ach15 = require('../../../assets/images/achievements/icon-15.png'),
  ach16 = require('../../../assets/images/achievements/icon-16.png'),
  ach17 = require('../../../assets/images/achievements/icon-17.png'),
  ach18 = require('../../../assets/images/achievements/icon-18.png'),
  ach19 = require('../../../assets/images/achievements/icon-19.png'),
  ach20 = require('../../../assets/images/achievements/icon-20.png'),
  ach21 = require('../../../assets/images/achievements/icon-21.png'),
  ach22 = require('../../../assets/images/achievements/icon-22.png'),
  ach23 = require('../../../assets/images/achievements/icon-23.png'),
  ach24 = require('../../../assets/images/achievements/icon-24.png'),
  ach27 = require('../../../assets/images/achievements/icon-27.png'),
  ach30 = require('../../../assets/images/achievements/icon-30.png'),
  ach33 = require('../../../assets/images/achievements/icon-33.png'),
  ach35 = require('../../../assets/images/achievements/icon-35.png'),
  ach36 = require('../../../assets/images/achievements/icon-36.png'),
  ach37 = require('../../../assets/images/achievements/icon-37.png'),
  ach38 = require('../../../assets/images/achievements/icon-38.png'),
  ach39 = require('../../../assets/images/achievements/icon-39.png'),
  ach40 = require('../../../assets/images/achievements/icon-40.png'),
  ach41 = require('../../../assets/images/achievements/icon-41.png'),
  ach42 = require('../../../assets/images/achievements/icon-42.png'),
  ach43 = require('../../../assets/images/achievements/icon-43.png'),
  ach44 = require('../../../assets/images/achievements/icon-44.png'),
  ach45 = require('../../../assets/images/achievements/icon-45.png'),
  ach46 = require('../../../assets/images/achievements/icon-46.png'),
  ach47 = require('../../../assets/images/achievements/icon-47.png'),
  ach48 = require('../../../assets/images/achievements/icon-48.png'),
  ach49 = require('../../../assets/images/achievements/icon-49.png'),
  ach50 = require('../../../assets/images/achievements/icon-50.png'),
  ach99 = require('../../../assets/images/achievements/icon-99.png'),
  ach100 = require('../../../assets/images/achievements/icon-100.png'),
  ach101 = require('../../../assets/images/achievements/icon-101.png'),
  ach102 = require('../../../assets/images/achievements/icon-102.png'),
  ach103 = require('../../../assets/images/achievements/icon-103.png'),
  ach104 = require('../../../assets/images/achievements/icon-104.png'),
  ach105 = require('../../../assets/images/achievements/icon-105.png'),
  ach106 = require('../../../assets/images/achievements/icon-106.png'),
  ach107 = require('../../../assets/images/achievements/icon-107.png'),
  ach108 = require('../../../assets/images/achievements/icon-108.png'),
  ach109 = require('../../../assets/images/achievements/icon-109.png'),
  ach110 = require('../../../assets/images/achievements/icon-110.png'),
  ach111 = require('../../../assets/images/achievements/icon-111.png'),
  ach112 = require('../../../assets/images/achievements/icon-112.png'),
  ach113 = require('../../../assets/images/achievements/icon-113.png'),
  ach114 = require('../../../assets/images/achievements/icon-114.png'),
  ach115 = require('../../../assets/images/achievements/icon-115.png'),
  ach116 = require('../../../assets/images/achievements/icon-116.png'),
  ach117 = require('../../../assets/images/achievements/icon-117.png'),
  ach118 = require('../../../assets/images/achievements/icon-118.png'),
  ach119 = require('../../../assets/images/achievements/icon-119.png'),
  ach120 = require('../../../assets/images/achievements/icon-120.png'),
  ach121 = require('../../../assets/images/achievements/icon-121.png'),
  ach122 = require('../../../assets/images/achievements/icon-122.png'),
  ach123 = require('../../../assets/images/achievements/icon-123.png'),
  ach124 = require('../../../assets/images/achievements/icon-124.png'),
  ach125 = require('../../../assets/images/achievements/icon-125.png'),
  ach126 = require('../../../assets/images/achievements/icon-126.png'),
  ach127 = require('../../../assets/images/achievements/icon-127.png'),
  ach128 = require('../../../assets/images/achievements/icon-128.png'),
  ach129 = require('../../../assets/images/achievements/icon-129.png'),
  ach130 = require('../../../assets/images/achievements/icon-130.png'),
  ach131 = require('../../../assets/images/achievements/icon-131.png'),
  ach132 = require('../../../assets/images/achievements/icon-132.png'),
  ach133 = require('../../../assets/images/achievements/icon-133.png'),
  ach134 = require('../../../assets/images/achievements/icon-134.png'),
  ach135 = require('../../../assets/images/achievements/icon-135.png'),
  ach136 = require('../../../assets/images/achievements/icon-136.png'),
  ach137 = require('../../../assets/images/achievements/icon-137.png'),
  ach138 = require('../../../assets/images/achievements/icon-138.png'),
  ach139 = require('../../../assets/images/achievements/icon-139.png'),
  ach140 = require('../../../assets/images/achievements/icon-140.png'),
  ach141 = require('../../../assets/images/achievements/icon-141.png'),
  ach142 = require('../../../assets/images/achievements/icon-142.png'),
  ach143 = require('../../../assets/images/achievements/icon-143.png'),
  ach144 = require('../../../assets/images/achievements/icon-144.png'),
  ach145 = require('../../../assets/images/achievements/icon-145.png'),
  ach146 = require('../../../assets/images/achievements/icon-146.png'),
  ach147 = require('../../../assets/images/achievements/icon-147.png'),
  ach148 = require('../../../assets/images/achievements/icon-148.png'),
  ach149 = require('../../../assets/images/achievements/icon-149.png'),
  ach150 = require('../../../assets/images/achievements/icon-150.png'),
  ach151 = require('../../../assets/images/achievements/icon-151.png'),
  ach152 = require('../../../assets/images/achievements/icon-152.png'),
  ach153 = require('../../../assets/images/achievements/icon-153.png'),
  ach154 = require('../../../assets/images/achievements/icon-154.png'),
  ach155 = require('../../../assets/images/achievements/icon-155.png'),
  ach156 = require('../../../assets/images/achievements/icon-156.png'),
  ach157 = require('../../../assets/images/achievements/icon-157.png'),
  ach158 = require('../../../assets/images/achievements/icon-158.png'),
  ach159 = require('../../../assets/images/achievements/icon-159.png'),
  ach160 = require('../../../assets/images/achievements/icon-160.png'),
  ach161 = require('../../../assets/images/achievements/icon-161.png'),
  ach162 = require('../../../assets/images/achievements/icon-162.png'),
  ach163 = require('../../../assets/images/achievements/icon-163.png'),
  ach164 = require('../../../assets/images/achievements/icon-164.png'),
  ach165 = require('../../../assets/images/achievements/icon-165.png'),
  ach166 = require('../../../assets/images/achievements/icon-166.png'),
  ach167 = require('../../../assets/images/achievements/icon-167.png'),
  ach168 = require('../../../assets/images/achievements/icon-168.png'),
  ach169 = require('../../../assets/images/achievements/icon-169.png'),
  ach170 = require('../../../assets/images/achievements/icon-170.png'),
  ach179 = require('../../../assets/images/achievements/icon-179.png'),
  ach180 = require('../../../assets/images/achievements/icon-180.png'),
  ach181 = require('../../../assets/images/achievements/icon-181.png'),
  ach182 = require('../../../assets/images/achievements/icon-182.png'),
  ach183 = require('../../../assets/images/achievements/icon-183.png'),
  ach184 = require('../../../assets/images/achievements/icon-184.png'),
  ach185 = require('../../../assets/images/achievements/icon-185.png'),
  ach186 = require('../../../assets/images/achievements/icon-186.png'),
  ach187 = require('../../../assets/images/achievements/icon-187.png'),
  ach188 = require('../../../assets/images/achievements/icon-188.png'),
  ach189 = require('../../../assets/images/achievements/icon-189.png'),
  ach190 = require('../../../assets/images/achievements/icon-190.png'),
  ach191 = require('../../../assets/images/achievements/icon-191.png'),
  ach192 = require('../../../assets/images/achievements/icon-192.png'),
  ach193 = require('../../../assets/images/achievements/icon-193.png'),
  ach194 = require('../../../assets/images/achievements/icon-194.png'),
  ach195 = require('../../../assets/images/achievements/icon-195.png'),
  ach196 = require('../../../assets/images/achievements/icon-196.png'),
  ach197 = require('../../../assets/images/achievements/icon-197.png'),
  ach198 = require('../../../assets/images/achievements/icon-198.png'),
  ach199 = require('../../../assets/images/achievements/icon-199.png'),
  ach200 = require('../../../assets/images/achievements/icon-200.png'),
  ach201 = require('../../../assets/images/achievements/icon-201.png'),
  ach202 = require('../../../assets/images/achievements/icon-202.png'),
  ach203 = require('../../../assets/images/achievements/icon-203.png'),
  ach204 = require('../../../assets/images/achievements/icon-204.png'),
  ach205 = require('../../../assets/images/achievements/icon-205.png'),
  ach206 = require('../../../assets/images/achievements/icon-206.png'),
  ach207 = require('../../../assets/images/achievements/icon-207.png'),
  ach208 = require('../../../assets/images/achievements/icon-208.png'),
  ach209 = require('../../../assets/images/achievements/icon-209.png'),
  ach210 = require('../../../assets/images/achievements/icon-210.png'),
  ach211 = require('../../../assets/images/achievements/icon-211.png'),
  ach212 = require('../../../assets/images/achievements/icon-212.png'),
  ach213 = require('../../../assets/images/achievements/icon-213.png'),
  ach214 = require('../../../assets/images/achievements/icon-214.png'),
  ach215 = require('../../../assets/images/achievements/icon-215.png'),
  ach216 = require('../../../assets/images/achievements/icon-216.png'),
  ach217 = require('../../../assets/images/achievements/icon-217.png'),
  ach218 = require('../../../assets/images/achievements/icon-218.png'),
  ach219 = require('../../../assets/images/achievements/icon-219.png'),
  ach220 = require('../../../assets/images/achievements/icon-220.png'),
  ach221 = require('../../../assets/images/achievements/icon-221.png'),
  ach222 = require('../../../assets/images/achievements/icon-222.png'),
  ach223 = require('../../../assets/images/achievements/icon-223.png'),
  ach224 = require('../../../assets/images/achievements/icon-224.png'),
  ach225 = require('../../../assets/images/achievements/icon-225.png'),
  ach226 = require('../../../assets/images/achievements/icon-226.png'),
  ach227 = require('../../../assets/images/achievements/icon-227.png'),
  ach228 = require('../../../assets/images/achievements/icon-228.png'),
  ach229 = require('../../../assets/images/achievements/icon-229.png'),
  ach230 = require('../../../assets/images/achievements/icon-230.png'),
  ach231 = require('../../../assets/images/achievements/icon-231.png'),
  ach232 = require('../../../assets/images/achievements/icon-232.png'),
  ach233 = require('../../../assets/images/achievements/icon-233.png'),
  ach234 = require('../../../assets/images/achievements/icon-234.png'),
  ach243 = require('../../../assets/images/achievements/icon-243.png'),
  ach244 = require('../../../assets/images/achievements/icon-244.png'),
  ach245 = require('../../../assets/images/achievements/icon-245.png'),
  ach246 = require('../../../assets/images/achievements/icon-246.png'),
  ach247 = require('../../../assets/images/achievements/icon-247.png'),
  ach248 = require('../../../assets/images/achievements/icon-248.png'),
  ach249 = require('../../../assets/images/achievements/icon-249.png'),
  ach250 = require('../../../assets/images/achievements/icon-250.png'),
  ach267 = require('../../../assets/images/achievements/icon-267.png'),
  ach268 = require('../../../assets/images/achievements/icon-268.png'),
  ach269 = require('../../../assets/images/achievements/icon-269.png'),
  ach270 = require('../../../assets/images/achievements/icon-270.png'),
  ach271 = require('../../../assets/images/achievements/icon-271.png'),
  ach272 = require('../../../assets/images/achievements/icon-272.png'),
  ach273 = require('../../../assets/images/achievements/icon-273.png'),
  ach274 = require('../../../assets/images/achievements/icon-274.png'),
  ach275 = require('../../../assets/images/achievements/icon-275.png'),
};

export { iconsUrl };
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
    Hint.create(currentScene, -250, hintStr, 2);
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
      this.scene.load.image(`${status}-status`, iconsUrl[status]);
      this.scene.load.on('complete', () => resolve(true));
      this.scene.load.start();
    });
  }
};
