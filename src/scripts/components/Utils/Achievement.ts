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
  ach2 = require('../../../assets/images/achievements/icon-1.png'),
  ach3 = require('../../../assets/images/achievements/icon-1.png'),
  ach4 = require('../../../assets/images/achievements/icon-1.png'),
  ach5 = require('../../../assets/images/achievements/icon-1.png'),
  ach6 = require('../../../assets/images/achievements/icon-1.png'),
  ach7 = require('../../../assets/images/achievements/icon-1.png'),
  ach8 = require('../../../assets/images/achievements/icon-1.png'),
  ach9 = require('../../../assets/images/achievements/icon-1.png'),
  ach10 = require('../../../assets/images/achievements/icon-1.png'),
  ach11 = require('../../../assets/images/achievements/icon-1.png'),
  ach12 = require('../../../assets/images/achievements/icon-1.png'),
  ach13 = require('../../../assets/images/achievements/icon-1.png'),
  ach14 = require('../../../assets/images/achievements/icon-1.png'),
  ach15 = require('../../../assets/images/achievements/icon-1.png'),
  ach16 = require('../../../assets/images/achievements/icon-1.png'),
  ach17 = require('../../../assets/images/achievements/icon-1.png'),
  ach18 = require('../../../assets/images/achievements/icon-1.png'),
  ach19 = require('../../../assets/images/achievements/icon-1.png'),
  ach20 = require('../../../assets/images/achievements/icon-1.png'),
  ach21 = require('../../../assets/images/achievements/icon-1.png'),
  ach22 = require('../../../assets/images/achievements/icon-1.png'),
  ach23 = require('../../../assets/images/achievements/icon-1.png'),
  ach24 = require('../../../assets/images/achievements/icon-1.png'),
  ach25 = require('../../../assets/images/achievements/icon-1.png'),
  ach26 = require('../../../assets/images/achievements/icon-1.png'),
  ach27 = require('../../../assets/images/achievements/icon-1.png'),
  ach28 = require('../../../assets/images/achievements/icon-1.png'),
  ach29 = require('../../../assets/images/achievements/icon-1.png'),
  ach30 = require('../../../assets/images/achievements/icon-1.png'),
  ach31 = require('../../../assets/images/achievements/icon-1.png'),
  ach32 = require('../../../assets/images/achievements/icon-1.png'),
  ach33 = require('../../../assets/images/achievements/icon-1.png'),
  ach34 = require('../../../assets/images/achievements/icon-1.png'),
  ach35 = require('../../../assets/images/achievements/icon-1.png'),
  ach36 = require('../../../assets/images/achievements/icon-1.png'),
  ach37 = require('../../../assets/images/achievements/icon-1.png'),
  ach38 = require('../../../assets/images/achievements/icon-1.png'),
  ach39 = require('../../../assets/images/achievements/icon-1.png'),
  ach40 = require('../../../assets/images/achievements/icon-1.png'),
  ach41 = require('../../../assets/images/achievements/icon-1.png'),
  ach42 = require('../../../assets/images/achievements/icon-1.png'),
  ach43 = require('../../../assets/images/achievements/icon-1.png'),
  ach44 = require('../../../assets/images/achievements/icon-1.png'),
  ach45 = require('../../../assets/images/achievements/icon-1.png'),
  ach46 = require('../../../assets/images/achievements/icon-1.png'),
  ach47 = require('../../../assets/images/achievements/icon-1.png'),
  ach48 = require('../../../assets/images/achievements/icon-1.png'),
  ach49 = require('../../../assets/images/achievements/icon-1.png'),
  ach50 = require('../../../assets/images/achievements/icon-1.png'),
  ach51 = require('../../../assets/images/achievements/icon-1.png'),
  ach52 = require('../../../assets/images/achievements/icon-1.png'),
  ach53 = require('../../../assets/images/achievements/icon-1.png'),
  ach54 = require('../../../assets/images/achievements/icon-1.png'),
  ach55 = require('../../../assets/images/achievements/icon-1.png'),
  ach56 = require('../../../assets/images/achievements/icon-1.png'),
  ach57 = require('../../../assets/images/achievements/icon-1.png'),
  ach58 = require('../../../assets/images/achievements/icon-1.png'),
  ach59 = require('../../../assets/images/achievements/icon-1.png'),
  ach60 = require('../../../assets/images/achievements/icon-1.png'),
  ach61 = require('../../../assets/images/achievements/icon-1.png'),
  ach62 = require('../../../assets/images/achievements/icon-1.png'),
  ach63 = require('../../../assets/images/achievements/icon-1.png'),
  ach64 = require('../../../assets/images/achievements/icon-1.png'),
  ach65 = require('../../../assets/images/achievements/icon-1.png'),
  ach66 = require('../../../assets/images/achievements/icon-1.png'),
  ach67 = require('../../../assets/images/achievements/icon-1.png'),
  ach68 = require('../../../assets/images/achievements/icon-1.png'),
  ach69 = require('../../../assets/images/achievements/icon-1.png'),
  ach70 = require('../../../assets/images/achievements/icon-1.png'),
  ach71 = require('../../../assets/images/achievements/icon-1.png'),
  ach72 = require('../../../assets/images/achievements/icon-1.png'),
  ach73 = require('../../../assets/images/achievements/icon-1.png'),
  ach74 = require('../../../assets/images/achievements/icon-1.png'),
  ach75 = require('../../../assets/images/achievements/icon-1.png'),
  ach76 = require('../../../assets/images/achievements/icon-1.png'),
  ach77 = require('../../../assets/images/achievements/icon-1.png'),
  ach78 = require('../../../assets/images/achievements/icon-1.png'),
  ach79 = require('../../../assets/images/achievements/icon-1.png'),
  ach80 = require('../../../assets/images/achievements/icon-1.png'),
  ach81 = require('../../../assets/images/achievements/icon-1.png'),
  ach82 = require('../../../assets/images/achievements/icon-1.png'),
  ach83 = require('../../../assets/images/achievements/icon-1.png'),
  ach84 = require('../../../assets/images/achievements/icon-1.png'),
  ach85 = require('../../../assets/images/achievements/icon-1.png'),
  ach86 = require('../../../assets/images/achievements/icon-1.png'),
  ach87 = require('../../../assets/images/achievements/icon-1.png'),
  ach88 = require('../../../assets/images/achievements/icon-1.png'),
  ach89 = require('../../../assets/images/achievements/icon-1.png'),
  ach90 = require('../../../assets/images/achievements/icon-1.png'),
  ach91 = require('../../../assets/images/achievements/icon-1.png'),
  ach92 = require('../../../assets/images/achievements/icon-1.png'),
  ach93 = require('../../../assets/images/achievements/icon-1.png'),
  ach94 = require('../../../assets/images/achievements/icon-1.png'),
  ach95 = require('../../../assets/images/achievements/icon-1.png'),
  ach96 = require('../../../assets/images/achievements/icon-1.png'),
  ach97 = require('../../../assets/images/achievements/icon-1.png'),
  ach98 = require('../../../assets/images/achievements/icon-1.png'),
  ach99 = require('../../../assets/images/achievements/icon-1.png'),
  ach100 = require('../../../assets/images/achievements/icon-1.png'),
  ach101 = require('../../../assets/images/achievements/icon-1.png'),
  ach102 = require('../../../assets/images/achievements/icon-1.png'),
  ach103 = require('../../../assets/images/achievements/icon-1.png'),
  ach104 = require('../../../assets/images/achievements/icon-1.png'),
  ach105 = require('../../../assets/images/achievements/icon-1.png'),
  ach106 = require('../../../assets/images/achievements/icon-1.png'),
  ach107 = require('../../../assets/images/achievements/icon-1.png'),
  ach108 = require('../../../assets/images/achievements/icon-1.png'),
  ach109 = require('../../../assets/images/achievements/icon-1.png'),
  ach110 = require('../../../assets/images/achievements/icon-1.png'),
  ach111 = require('../../../assets/images/achievements/icon-1.png'),
  ach112 = require('../../../assets/images/achievements/icon-1.png'),
  ach113 = require('../../../assets/images/achievements/icon-1.png'),
  ach114 = require('../../../assets/images/achievements/icon-1.png'),
  ach115 = require('../../../assets/images/achievements/icon-1.png'),
  ach116 = require('../../../assets/images/achievements/icon-1.png'),
  ach117 = require('../../../assets/images/achievements/icon-1.png'),
  ach118 = require('../../../assets/images/achievements/icon-1.png'),
  ach119 = require('../../../assets/images/achievements/icon-1.png'),
  ach120 = require('../../../assets/images/achievements/icon-1.png'),
  ach121 = require('../../../assets/images/achievements/icon-1.png'),
  ach122 = require('../../../assets/images/achievements/icon-1.png'),
  ach123 = require('../../../assets/images/achievements/icon-1.png'),
  ach124 = require('../../../assets/images/achievements/icon-1.png'),
  ach125 = require('../../../assets/images/achievements/icon-1.png'),
  ach126 = require('../../../assets/images/achievements/icon-1.png'),
  ach127 = require('../../../assets/images/achievements/icon-1.png'),
  ach128 = require('../../../assets/images/achievements/icon-1.png'),
  ach129 = require('../../../assets/images/achievements/icon-1.png'),
  ach130 = require('../../../assets/images/achievements/icon-1.png'),
  ach131 = require('../../../assets/images/achievements/icon-1.png'),
  ach132 = require('../../../assets/images/achievements/icon-1.png'),
  ach133 = require('../../../assets/images/achievements/icon-1.png'),
  ach134 = require('../../../assets/images/achievements/icon-1.png'),
  ach135 = require('../../../assets/images/achievements/icon-1.png'),
  ach136 = require('../../../assets/images/achievements/icon-1.png'),
  ach137 = require('../../../assets/images/achievements/icon-1.png'),
  ach138 = require('../../../assets/images/achievements/icon-1.png'),
  ach139 = require('../../../assets/images/achievements/icon-1.png'),
  ach140 = require('../../../assets/images/achievements/icon-1.png'),
  ach141 = require('../../../assets/images/achievements/icon-1.png'),
  ach142 = require('../../../assets/images/achievements/icon-1.png'),
  ach143 = require('../../../assets/images/achievements/icon-1.png'),
  ach144 = require('../../../assets/images/achievements/icon-1.png'),
  ach145 = require('../../../assets/images/achievements/icon-1.png'),
  ach146 = require('../../../assets/images/achievements/icon-1.png'),
  ach147 = require('../../../assets/images/achievements/icon-1.png'),
  ach148 = require('../../../assets/images/achievements/icon-1.png'),
  ach149 = require('../../../assets/images/achievements/icon-1.png'),
  ach150 = require('../../../assets/images/achievements/icon-1.png'),
  ach151 = require('../../../assets/images/achievements/icon-1.png'),
  ach152 = require('../../../assets/images/achievements/icon-1.png'),
  ach153 = require('../../../assets/images/achievements/icon-1.png'),
  ach154 = require('../../../assets/images/achievements/icon-1.png'),
  ach155 = require('../../../assets/images/achievements/icon-1.png'),
  ach156 = require('../../../assets/images/achievements/icon-1.png'),
  ach157 = require('../../../assets/images/achievements/icon-1.png'),
  ach158 = require('../../../assets/images/achievements/icon-1.png'),
  ach159 = require('../../../assets/images/achievements/icon-1.png'),
  ach160 = require('../../../assets/images/achievements/icon-1.png'),
  ach161 = require('../../../assets/images/achievements/icon-1.png'),
  ach162 = require('../../../assets/images/achievements/icon-1.png'),
  ach163 = require('../../../assets/images/achievements/icon-1.png'),
  ach164 = require('../../../assets/images/achievements/icon-1.png'),
  ach165 = require('../../../assets/images/achievements/icon-1.png'),
  ach166 = require('../../../assets/images/achievements/icon-1.png'),
  ach167 = require('../../../assets/images/achievements/icon-1.png'),
  ach168 = require('../../../assets/images/achievements/icon-1.png'),
  ach169 = require('../../../assets/images/achievements/icon-1.png'),
  ach170 = require('../../../assets/images/achievements/icon-1.png'),
  ach171 = require('../../../assets/images/achievements/icon-1.png'),
  ach172 = require('../../../assets/images/achievements/icon-1.png'),
  ach173 = require('../../../assets/images/achievements/icon-1.png'),
  ach174 = require('../../../assets/images/achievements/icon-1.png'),
  ach175 = require('../../../assets/images/achievements/icon-1.png'),
  ach176 = require('../../../assets/images/achievements/icon-1.png'),
  ach177 = require('../../../assets/images/achievements/icon-1.png'),
  ach178 = require('../../../assets/images/achievements/icon-1.png'),
  ach179 = require('../../../assets/images/achievements/icon-1.png'),
  ach180 = require('../../../assets/images/achievements/icon-1.png'),
  ach181 = require('../../../assets/images/achievements/icon-1.png'),
  ach182 = require('../../../assets/images/achievements/icon-1.png'),
  ach183 = require('../../../assets/images/achievements/icon-1.png'),
  ach184 = require('../../../assets/images/achievements/icon-1.png'),
  ach185 = require('../../../assets/images/achievements/icon-1.png'),
  ach186 = require('../../../assets/images/achievements/icon-1.png'),
  ach187 = require('../../../assets/images/achievements/icon-1.png'),
  ach188 = require('../../../assets/images/achievements/icon-1.png'),
  ach189 = require('../../../assets/images/achievements/icon-1.png'),
  ach190 = require('../../../assets/images/achievements/icon-1.png'),
  ach191 = require('../../../assets/images/achievements/icon-1.png'),
  ach192 = require('../../../assets/images/achievements/icon-1.png'),
  ach193 = require('../../../assets/images/achievements/icon-1.png'),
  ach194 = require('../../../assets/images/achievements/icon-1.png'),
  ach195 = require('../../../assets/images/achievements/icon-1.png'),
  ach196 = require('../../../assets/images/achievements/icon-1.png'),
  ach197 = require('../../../assets/images/achievements/icon-1.png'),
  ach198 = require('../../../assets/images/achievements/icon-1.png'),
  ach199 = require('../../../assets/images/achievements/icon-1.png'),
  ach200 = require('../../../assets/images/achievements/icon-1.png'),
  ach201 = require('../../../assets/images/achievements/icon-1.png'),
  ach202 = require('../../../assets/images/achievements/icon-1.png'),
  ach203 = require('../../../assets/images/achievements/icon-1.png'),
  ach204 = require('../../../assets/images/achievements/icon-1.png'),
  ach205 = require('../../../assets/images/achievements/icon-1.png'),
  ach206 = require('../../../assets/images/achievements/icon-1.png'),
  ach207 = require('../../../assets/images/achievements/icon-1.png'),
  ach208 = require('../../../assets/images/achievements/icon-1.png'),
  ach209 = require('../../../assets/images/achievements/icon-1.png'),
  ach210 = require('../../../assets/images/achievements/icon-1.png'),
  ach211 = require('../../../assets/images/achievements/icon-1.png'),
  ach212 = require('../../../assets/images/achievements/icon-1.png'),
  ach213 = require('../../../assets/images/achievements/icon-1.png'),
  ach214 = require('../../../assets/images/achievements/icon-1.png'),
  ach215 = require('../../../assets/images/achievements/icon-1.png'),
  ach216 = require('../../../assets/images/achievements/icon-1.png'),
  ach217 = require('../../../assets/images/achievements/icon-1.png'),
  ach218 = require('../../../assets/images/achievements/icon-1.png'),
  ach219 = require('../../../assets/images/achievements/icon-1.png'),
  ach220 = require('../../../assets/images/achievements/icon-1.png'),
  ach221 = require('../../../assets/images/achievements/icon-1.png'),
  ach222 = require('../../../assets/images/achievements/icon-1.png'),
  ach223 = require('../../../assets/images/achievements/icon-1.png'),
  ach224 = require('../../../assets/images/achievements/icon-1.png'),
  ach225 = require('../../../assets/images/achievements/icon-1.png'),
  ach226 = require('../../../assets/images/achievements/icon-1.png'),
  ach227 = require('../../../assets/images/achievements/icon-1.png'),
  ach228 = require('../../../assets/images/achievements/icon-1.png'),
  ach229 = require('../../../assets/images/achievements/icon-1.png'),
  ach230 = require('../../../assets/images/achievements/icon-1.png'),
  ach231 = require('../../../assets/images/achievements/icon-1.png'),
  ach232 = require('../../../assets/images/achievements/icon-1.png'),
  ach233 = require('../../../assets/images/achievements/icon-1.png'),
  ach234 = require('../../../assets/images/achievements/icon-1.png'),
  ach235 = require('../../../assets/images/achievements/icon-1.png'),
  ach236 = require('../../../assets/images/achievements/icon-1.png'),
  ach237 = require('../../../assets/images/achievements/icon-1.png'),
  ach238 = require('../../../assets/images/achievements/icon-1.png'),
  ach239 = require('../../../assets/images/achievements/icon-1.png'),
  ach240 = require('../../../assets/images/achievements/icon-1.png'),
  ach241 = require('../../../assets/images/achievements/icon-1.png'),
  ach242 = require('../../../assets/images/achievements/icon-1.png'),
  ach243 = require('../../../assets/images/achievements/icon-1.png'),
  ach244 = require('../../../assets/images/achievements/icon-1.png'),
  ach245 = require('../../../assets/images/achievements/icon-1.png'),
  ach246 = require('../../../assets/images/achievements/icon-1.png'),
  ach247 = require('../../../assets/images/achievements/icon-1.png'),
  ach248 = require('../../../assets/images/achievements/icon-1.png'),
  ach249 = require('../../../assets/images/achievements/icon-1.png'),
  ach250 = require('../../../assets/images/achievements/icon-1.png'),
  ach251 = require('../../../assets/images/achievements/icon-1.png'),
  ach252 = require('../../../assets/images/achievements/icon-1.png'),
  ach253 = require('../../../assets/images/achievements/icon-1.png'),
  ach254 = require('../../../assets/images/achievements/icon-1.png'),
  ach255 = require('../../../assets/images/achievements/icon-1.png'),
  ach256 = require('../../../assets/images/achievements/icon-1.png'),
  ach257 = require('../../../assets/images/achievements/icon-1.png'),
  ach258 = require('../../../assets/images/achievements/icon-1.png'),
  ach259 = require('../../../assets/images/achievements/icon-1.png'),
  ach260 = require('../../../assets/images/achievements/icon-1.png'),
  ach261 = require('../../../assets/images/achievements/icon-1.png'),
  ach262 = require('../../../assets/images/achievements/icon-1.png'),
  ach263 = require('../../../assets/images/achievements/icon-1.png'),
  ach264 = require('../../../assets/images/achievements/icon-1.png'),
  ach265 = require('../../../assets/images/achievements/icon-1.png'),
  ach266 = require('../../../assets/images/achievements/icon-1.png'),
  ach267 = require('../../../assets/images/achievements/icon-1.png'),
  ach268 = require('../../../assets/images/achievements/icon-1.png'),
  ach269 = require('../../../assets/images/achievements/icon-1.png'),
  ach270 = require('../../../assets/images/achievements/icon-1.png'),
  ach271 = require('../../../assets/images/achievements/icon-1.png'),
  ach272 = require('../../../assets/images/achievements/icon-1.png'),
  ach273 = require('../../../assets/images/achievements/icon-1.png'),
  ach274 = require('../../../assets/images/achievements/icon-1.png'),
  ach275 = require('../../../assets/images/achievements/icon-1.png'),
}

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
    const maxPart: number = this.state[`${this.state.farm.toLowerCase()}Settings`][`${this.state.farm.toLowerCase()}Parts`].length;
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
