interface Iposition {
  x: number;
  y: number;
}
interface Ibalance {
  alarm: boolean;
  grassConsumption: number;
  grassPercent: number;
  grassRecovery: number;
  notEnoughGrass: boolean;
  notEnoughWater: boolean;
  waterConsumption: number;
  waterPercent: number;
  waterRecovery: number;
}
interface Imerging {
  _id: string;
  type: number;
}
interface IshopButtons {
  text: Phaser.GameObjects.Text;
  img: Phaser.GameObjects.Image;
  breed: number;
}
interface IsheepUserAutoSave {
  diamonds: number;
  xp: number;
  money: number;
  fair: number;
  part: number;
  countSheep: number;
  collector: number;
  collectorLevel: number;
  diamondSheepTime: number;
  tutorial: number;
  additional_tutorial: IadditionalTutorial;
  taken_reward: boolean;
  autosaveCounter: number;
  diamondSheepAd: boolean;
  takenHerdBoost: number;
  feedBoostTime: number;
  
}
interface IchickenUserAutoSave {
  diamonds: number;
  xp: number;
  money: number;
  fair: number;
  part: number;
  countChicken: number;
  collector: number;
  collectorLevel: number;
  diamondChickenTime: number;
  tutorial: number;
  additional_tutorial: IadditionalTutorial;
  taken_reward: boolean;
  autosaveCounter: number;
  diamondChickenAd: boolean;
  takenHerdBoost: number;
  feedBoostTime: number;
}

// for state
interface IadditionalTutorial {
  balance: boolean;
  cave: boolean;
  collector: boolean;
  herdBoost: boolean;
}
interface Iuser {
  diamonds: number;
  id: string;
  xp: number;
  hash: string;
  login: string;
  counter: number;
  mail: string;
  level: number;
  additionalTutorial: IadditionalTutorial;
  takenReward: boolean;
}
interface IuserSheep {
  money: number;
  fair: number;
  part: number;
  countSheep: number;
  collector: number;
  collectorLevel: number;
  collectorTakenTime: number;
  diamondAnimalTime: number;
  tutorial: number;
  autosaveCounter: number;
  diamondAnimalAd: boolean;
  takenHerdBoost: number;
  feedBoostTime: number;
}
interface IuserChicken {
  money: number;
  fair: number;
  part: number;
  countChicken: number;
  collector: number;
  collectorLevel: number;
  collectorTakenTime: number;
  diamondAnimalTime: number;
  tutorial: number;
  autosaveCounter: number;
  diamondAnimalAd: boolean;
  takenHerdBoost: number;
  feedBoostTime: number;
}
interface Iterritories {
  block: number;
  improve: number;
  position: number;
  type: number;
  volume: number;
  money: number;
  _id?: any;
}
interface Isheep {
  type: number;
  wool: number;
  x: number;
  y: number;
  counter: number;
  diamond: number;
  vector: number;
  _id?: string;
}
interface Ichicken {
  type: number;
  egg: number;
  x: number;
  y: number;
  counter: number;
  diamond: number;
  vector: number;
  _id?: string;
}
interface IchickenEgg {
  _id?: any;
  type: number;
  x: number;
  y: number;
}
interface IsheepPoints {
  breed: number;
  drinking: number;
  eating: number;
  long_wool: number;
  wool_growth: number;
  id?: any;
}
interface IchickenPoints {
  breed: number;
  drinking: number;
  eating: number;
  egg: number;
  eggPrice: number;
  id?: any;
}
interface IterritoriesSheepSettings {
  improve: number;
  regeneration: number;
  unlock_improve: number;
  woolStorage: number;
  id?: any;
}
interface IterritoriesChickenSettings {
  improve: number;
  regeneration: number;
  countEggs: number;
  unlock_improve: number;
  eggStorage: number;
  id?: any;
}
interface IterritoriesPrice {
  block: number;
  position: number;
  price: number;
  unlock: number;
  id?: any;
}
interface IfairLevel {
  exchange: number;
  level: number;
  part_unlock: number;
  price_d: number;
  price_m: number;
  id?: any;
}
interface Ipart {
  sort: number;
  award: number;
  collector: number;
  improve_territory_2: number;
  improve_territory_3: number;
  improve_territory_4: number;
}
interface IsheepSettings {
  sheepBadPercent: number;
  sheepPrice: number;
  sheepSettings: IsheepPoints[];
  territoriesSheepPrice: IterritoriesPrice[];
  territoriesSheepSettings: IterritoriesSheepSettings[];
  sheepFairLevels: IfairLevel[];
  sheepParts: Ipart[];
  buyBetterBreedSheep: number;
  doubledСollectorPrice: number;
  collectorPrice4: number;
  collectorPrice12: number;
  unlockCollector4: number;
  unlockCollector12: number;
  sheepDiamondsTime: number;
  feedBoostPrice: number;
}
interface IchickenSettings {
  chickenBadPercent: number;
  chickenPrice: number;
  chickenSettings: IchickenPoints[];
  territoriesChickenPrice: IterritoriesPrice[];
  territoriesChickenSettings: IterritoriesChickenSettings[];
  chickenFairLevels: IfairLevel[];
  chickenParts: Ipart[];
  buyBetterBreedChicken: number;
  doubledСollectorPrice: number;
  collectorPrice4: number;
  collectorPrice12: number;
  unlockCollector4: number;
  unlockCollector12: number;
  chickenDiamondsTime: number;
  feedBoostPrice: number;
}
interface ItaskData {
  icon: string;
  name: string;
}
interface Itasks {
  count: number;
  diamonds: number;
  done: number;
  got_awarded: number;
  id: number;
  necessary: number;
  part: number;
  progress: number;
  sort: number;
  state: number;
  type: number;
  xp: number;
  farm: number;
}
interface IdonePart {
  part: string;
  name: string;
  award: string;
  doneText: string;
  chapter: string;
}
interface ItasksParams {
  part: string;
  name: string;
  farmer: string;
  done: boolean;
  description: string;
  tasks: Itasks[];
}
interface Imodal {
  type: number;
  sysType?: number;
  shopType?: number;
  donePart?: IdonePart;
  height?: number;
  message?: string;
  tasksParams?: ItasksParams;
}
interface Iconvertor {
  fun: number;
  count: number;
  diamonds: number;
  type: number;
  breed?: number;
}
interface Ipackage {
  bonus: number;
  diamonds: number;
  id: number;
  price: number;
  voices: number;
  stock: number;
  top: boolean;
}
interface Itutorial {
  farm: number;
  step: number;
  additional: boolean | string;
}
interface IpartProgress {
  part: number;
  max: number;
  open: boolean;
  price: number;
  unlock: number;
  donate: boolean;
}
interface Iprogress {
  sheep: IpartProgress;
  chicken: IpartProgress;
}
interface IcollectorSettings {
  level: number;
  chapter: number;
  time: number;
  speed: number;
  price: number;
  diamonds: boolean;
}

type modalElementType = Phaser.GameObjects.Sprite | Phaser.GameObjects.Image | Phaser.GameObjects.Zone | Phaser.GameObjects.Text | Phaser.GameObjects.Graphics;
interface Istate {
  platform: string;
  autoSaveSpeed: number;
  maxMerginTime: number;
  herdBoostSpeedAnimal: number;
  herdBoostPrice: number;
  herdBoostTime: number;
  herdBoostDelay: number;
  herdBoostAnimals: number[];
  nativeCounter: number[];
  timeToHerdBoost: number;
  sheepSettings: IsheepSettings;
  chickenSettings: IchickenSettings;
  chickenTerritories: Iterritories[];
  sheepTerritories: Iterritories[];
  sheep: Isheep[];
  chicken: Ichicken[];
  chickenEggs: IchickenEgg[];
  lang: any;
  modal: Imodal;
  animal: any;
  territory: any;
  user: Iuser;
  userSheep: IuserSheep;
  userChicken: IuserChicken;
  convertor: Iconvertor;
  exchangeTerritory: number;
  farm: string;
  packages: Ipackage[];
  sheepTasks: Itasks[];
  chickenTasks: Itasks[];
  name: string;
  avatar: string;
  socket: any;
  tutorial: Itutorial;
  progress: Iprogress;
  offlineTime: number;
  daily: number | boolean;
  payDiamonds: number;
  payId: number;
  payPrice: number;
  amplitude: any;
  online: boolean;
  newbieTime: number;
  dailyAwards: boolean[];
  readyAd: boolean;
  adRewardedType: number;
  adTimeout: boolean;
  vkId: number;
  sheepCollectorSettings: IcollectorSettings[];
  chickenCollectorSettings: IcollectorSettings[];
  adBlock: boolean;
  adman: any;
  donate: boolean;
}
