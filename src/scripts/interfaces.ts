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
interface IeventUserAutoSave {
  diamonds: number;
  xp: number;
  money: string;
  countAnimal: {counter: number}[];
  collector: number;
  collectorLevel: number;
  tutorial: number;
  herdBoostAnimals: number[];
  autosaveCounter: number;
  takenHerdBoost: number;
  feedBoostTime: number;
  
}
// for state
interface IadditionalTutorial {
  balance: boolean;
  cave: boolean;
  collector: boolean;
  herdBoost: boolean;
  feedBoost: boolean;
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
interface IuserEvent {
  money: bigint;
  countAnimal: {counter: number}[];
  collector: number;
  collectorLevel: number;
  collectorTakenTime: number;
  tutorial: number;
  autosaveCounter: number;
  takenHerdBoost: number;
  feedBoostTime: number;
  maxLevelAnimal: number;
  herdBoostAnimals: number[];
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
interface IeventTerritories {
  block: number;
  position: number;
  type: number;
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
interface IeventAnimal {
  type: number;
  x: number;
  y: number;
  activeAnimal: IactiveEventAnimal;
  _id?: string;
}
interface IactiveEventAnimal{
  x: number;
  y: number;
  working: boolean;
  vector: number;
  counter: number;
}
interface IchickenEgg {
  _id?: any;
  type: number;
  x: number;
  y: number;
}
interface IeventResource {
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
interface IeventPoints {
  breed: number;
  resource: number;
  resourcePrice: bigint;
  price: bigint;
  exchange: bigint;
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
interface IterritoriesEventSettings {
  improve: number;
  regeneration: number;
  countResources: number;
  unlock_improve: number;
  resourceStorage: number;
  id?: any;
}
interface IterritoriesPrice {
  block: number;
  position: number;
  price: number;
  unlock: number;
  id?: any;
}

interface IeventTerritoriesPrice {
  block: number;
  position: number;
  price: number;
  diamond: number;
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
interface IeventSettings {
  eventSettings: IeventPoints[]; // нужно попарвить
  territoriesEventPrice: IeventTerritoriesPrice[];
  territoriesEventSettings: IterritoriesEventSettings[];
  buyBetterBreedAnimal: number;
  doubledСollectorPrice: number;
  collectorPrice4: number;
  collectorPrice12: number;
  unlockCollector4: number;
  unlockCollector12: number;
  priceCoefficient: number;
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
interface IeventParams {
  offlineTime: number;
  offlineProgress: number;
}
interface Imodal {
  type: number;
  sysType?: number;
  shopType?: number;
  donePart?: IdonePart;
  height?: number;
  message?: string;
  tasksParams?: ItasksParams;
  eventParams?: IeventParams;
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
interface IeventProgress {
  eventPoints: number;
  startTime: number;
  endTime: number;
  open: boolean;
}
interface Iprogress {
  sheep: IpartProgress;
  chicken: IpartProgress;
  event: IeventProgress;
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
interface Ichat {
  login: string;
  time: string;
  text: string;
  id: string;
}
interface IScrollingOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  wheel: boolean;
  top: number;
}
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
  eventSettings: IeventSettings;
  chickenTerritories: Iterritories[];
  sheepTerritories: Iterritories[];
  eventTerritories: IeventTerritories[];
  sheep: Isheep[];
  chicken: Ichicken[];
  eventAnimals: IeventAnimal[];
  chickenEggs: IchickenEgg[];
  eventResources: IeventResource[];
  lang: any;
  modal: Imodal;
  animal: any;
  territory: any;
  user: Iuser;
  userSheep: IuserSheep;
  userChicken: IuserChicken;
  userEvent: IuserEvent;
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
  eventCollectorSettings: IcollectorSettings[];
  adBlock: boolean;
  adman: any;
  donate: boolean;
  boughtFeedBoost: boolean;
  chat: Ichat[];
}
