interface Iposition {
  x: number;
  y: number;
}
interface Isize {
  width: number;
  height: number;
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
  position?: string;
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
  status: string;
  boosts: Iboosts;
  
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
  status: string;
  boosts: Iboosts;
}
interface IcowUserAutoSave {
  diamonds: number;
  xp: number;
  money: number;
  fair: number;
  part: number;
  countCow: number;
  collector: number;
  collectorLevel: number;
  diamondCowTime: number;
  tutorial: number;
  additional_tutorial: IadditionalTutorial;
  taken_reward: boolean;
  autosaveCounter: number;
  diamondCowAd: boolean;
  takenHerdBoost: number;
  feedBoostTime: number;
  status: string;
  boosts: Iboosts;
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
  additionalTutorial: IadditionalTutorial;
  status: string;
  boosts: Iboosts;
}
interface IuserAutoSave {
  diamonds: number;
  xp: number;
  status: string;
  boosts: Iboosts;
  additionalTutorial: IadditionalTutorial;
  takenReward: boolean;
  userSheep: IuserSheep;
  userChicken: IuserChicken;
  userCow: IuserCow;
  userUnicorn?: IuserEvent;
  test: string;
  takenFreeDiamonds: boolean;
  takenSocialAward: boolean;
  messages: Imessage[];
  personalMessages: IuserPersonalMessage[];
  yandexName: string;
  fortuneTutorial: boolean;
}
interface Imessage {
  type: number;
  text: string;
  status: number;
  check: boolean;
  time: number;
}
interface IuserPersonalMessage {
  userId: string;
  name: string;
  status: string;
  messages: IpersonalMessage[];
}
interface IpersonalMessage {
  owned: boolean;
  time: Date;
  text: string;
  check: boolean;
  fromId?: string;
  toId?:string;
  name?: string;
  status?: string;
}
interface IprofileData {
  id: string;
  name: string;
  status: string;
  level: number;
  avatar: string;
}
interface IdataAutoSave {
  id: string;
  hash: string;
  counter: number,
  dailyAwards: boolean[];
  user: IuserAutoSave;
  sheepTasks: Itasks[];
  sheepTerritories: Iterritories[];
  sheep: Isheep[];
  chickenTasks: Itasks[];
  chickenTerritories: Iterritories[];
  chicken: Ichicken[];
  chickenEggs: IchickenEgg[];
  cow: Icow[];
  cowTasks: Itasks[];
  cowTerritories: Iterritories[];
  unicorn: IeventAnimal[];
  unicornTerritories: IeventTerritories[];
  unicornResource: IeventResource[];
  build: number;
}
// for state
interface IadditionalTutorial {
  balance: boolean;
  cave: boolean;
  collector: boolean;
  herdBoost: boolean;
  feedBoost: boolean;
  eventTutorial: boolean;
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
  status: string;
  statuses: string[];
  starterpack: boolean;
  boosts: Iboosts;
  test: string;
  takenFreeDiamonds: boolean;
  takenSocialAward: boolean;
  messages: Imessage[];
  personalMessages: IuserPersonalMessage[];
  fortuneTutorial: boolean;
}
interface IuserSheep {
  money: number;
  fair: number;
  part: number;
  countSheep: number;
  collector: number;
  collectorLevel: number;
  collectorTimeLevel: number;
  collectorSpeedLevel: number;
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
interface Ifactory {
  currentProduction: number;
  productionTimer: number;
  money: number;
  production1Money: number;
  production2Money: number;
  production3Money: number;
  production4Money: number;
  boostTime: number;
  milkMultiply?: number;
  production1Multiply?: number;
  production2Multiply?: number;
  production3Multiply?: number;
  production4Multiply?: number;
}
interface IuserCow {
  money: number;
  fair: number;
  part: number;
  countCow: number;
  collector: number;
  collectorLevel: number;
  collectorTakenTime: number;
  diamondAnimalTime: number;
  tutorial: number;
  autosaveCounter: number;
  diamondAnimalAd: boolean;
  takenHerdBoost: number;
  feedBoostTime: number;
  factory: Ifactory;
}
interface IuserEvent {
  money: string;
  countAnimal: { counter: number }[];
  collector: number;
  collectorLevel: number;
  collectorTakenTime: number;
  tutorial: number;
  autosaveCounter: number;
  takenHerdBoost: number;
  feedBoostTime: number;
  herdBoostAnimals: number[];
  takenAd: number;
  timeToAd: number;
  points: number;
  takenAward: boolean;
}
interface IunicornRaitingsData {
  ratings: IeventRaiting[];
  user: IeventRaiting;
  updated: boolean;
}
interface Iterritories {
  block: number;
  improve: number;
  position: number;
  type: number;
  volume: number;
  money: number;
  cooldown: number,
  bought?: boolean;
  boughtType: number;
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
interface Icow {
  type: number;
  milk: number;
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
interface IcowMilk {
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
interface IcowPoints {
  breed: number;
  drinking: number;
  eating: number;
  maxMilkVolume: number;
  id?: any;
}
interface IeventPoints {
  breed: number;
  resource: number;
  resourcePrice: string;
  price: string;
  exchange: string;
  id?: any;
}
interface IterritoriesSheepSettings {
  improve: number;
  regeneration: number;
  unlock_improve: number;
  storage: number;
  improvePastureMoneyPrice: number;
  improveStorageMoneyPrice: number;
  improvePastureDiamondPrice: number;
  improveStorageDiamondPrice: number;
  id?: any;
}
interface IterritoriesChickenSettings {
  improve: number;
  regeneration: number;
  countEggs: number;
  unlock_improve: number;
  storage: number;
  improvePastureMoneyPrice: number;
  improveStorageMoneyPrice: number;
  improvePastureDiamondPrice: number;
  improveStorageDiamondPrice: number;
  id?: any;
}
interface IterritoriesCowSettings {
  improve: number;
  regeneration: number;
  unlock_improve: number;
  storage: number;
  improvePastureMoneyPrice: number;
  improveStorageMoneyPrice: number;
  improvePastureDiamondPrice: number;
  improveStorageDiamondPrice: number;
  id?: any;
}
interface IfactorySettings {
  improve: number;
  unlock_improve: number;
  improveMoneyPrice: number;
  improveDiamondPrice: number;
  processingTime: number;
  lotSize: number;
  production1Percent: number;
  production2Percent: number;
  production3Percent: number;
  production4Percent: number;
  efficiency: number;
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
  unlockCooldown: number;
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
  level: number;
  part_unlock: number;
  price_d: number;
  price_m: number;
  id?: any;
}
interface Ipart {
  sort: number;
  award: number;
  improve_territory_2: number;
  improve_territory_3: number;
  improve_territory_4: number;
  exchange: number;
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
interface IcowSettings {
  cowBadPercent: number;
  cowPrice: number;
  cowSettings: IcowPoints[];
  territoriesCowPrice: IterritoriesPrice[];
  territoriesCowSettings: IterritoriesCowSettings[];
  cowFairLevels: IfairLevel[];
  cowFactorySettings: IfactorySettings[];
  cowParts: Ipart[];
  buyBetterBreedCow: number;
  doubledСollectorPrice: number;
  collectorPrice4: number;
  collectorPrice12: number;
  unlockCollector4: number;
  unlockCollector12: number;
  cowDiamondsTime: number;
  feedBoostPrice: number;
  storageMultiply?: number;
}
interface IeventSettings {
  unicornSettings: IeventPoints[]; // нужно попарвить
  territoriesUnicornPrice: IeventTerritoriesPrice[];
  territoriesUnicornSettings: IterritoriesEventSettings[];
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
  offlineProgress: string;
  collectorTime: number;
}
interface Imodal {
  type: number;
  sysType?: number;
  chatType?: number;
  chatUserId?: string;
  shopType?: number;
  donePart?: IdonePart;
  height?: number;
  message?: string;
  tasksParams?: ItasksParams;
  eventParams?: IeventParams;
}
interface Iconvertor {
  fun: number;
  count: number | string;
  diamonds: number;
  type: number;
  breed?: number;
}
interface Ipackage {
  bonus: number;
  active: boolean;
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
  collector?: number;
  offlineTime?: number;
}
interface IeventProgress {
  startTime: number;
  endTime: number;
  open: boolean;
  type: number;
}
interface Iprogress {
  sheep: IpartProgress;
  chicken: IpartProgress;
  cow: IpartProgress;
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

type modalElementType = Phaser.GameObjects.Sprite | Phaser.GameObjects.Image | Phaser.GameObjects.Zone | Phaser.GameObjects.Text | Phaser.GameObjects.Graphics | Phaser.GameObjects.Container | Phaser.GameObjects.TileSprite;
interface Ichat {
  login: string;
  time: string;
  text: string;
  id: string;
  status: string;
  userId: string;
}
interface IScrollingOptions {
  x: number;
  y: number;
  width: number;
  height: number;
  wheel: boolean;
  top: number;
}
interface IeventRaiting {
  place: number;
  name: string;
  score: string | number;
}
interface IstatusSettings {
  textColor: string;
  text: string;
  iconTexture: string;
  iconVisible: boolean;
}
interface Iboosts {
  sheep: IfarmBosts;
  chicken: IfarmBosts;
  cow: IfarmBosts;
  fortune: number;
}
interface IfarmBosts {
  collector4: number;
  collector12: number;
  herd: number;
  feed: number;
  factory?: number;
}
interface IamplitudeData {
  farm_id?: string;
  chapter?: number;
  diamonds?: number;
  money?: number;
  fairLevel?: number;
  collector?: number;
  countAnimal?: number;
  balanceWaterPercent?: number;
  balanceGrassPercent?: number;
  type?: string;
  count?: number;
  price?: number;
  level?: number;
  block?: number;
  position?: number;
  step?: number;
  stock?: boolean;
  test?: string;
}
interface IfortuneUser {
  name: string;
  prize: string;
  time: number;
}
interface IfortuneData {
  pull: number,
  recentWinners: IfortuneUser[];
  lastWinner: IfortuneUser;
}
interface IsociaTasks {
  joinGroup?: boolean;
  addFavorites?: boolean;
  subGroup?: boolean;
  subNotification?: boolean;
  sendPost?:boolean;
}
interface Iconfig {
  collectorTime: number;
  collectorTimeCost: number;
  collectorSpeed: number;
  collectorSpeedCost: number;
  repositoryCost: number;
  repositoryVolume: number;
  fairCost: number;
  grassAndWaterTerritoryCost: number;
  grassAndWaterRestorePoints: number;
  territoryColddown: number;
  oneDiamondToMoney: number;
  tasks: ItaskSheep[]
}
interface ItaskSheep {
  id: string;
  done: boolean;
  awardTaken: boolean;
  awardType: string;
  award: number;
  target: number
  progress: number;
  text: string;
  icon: string;
}
// interface ISheepConfig {
//   woolPrice: number;
//   woolGrowthSpeed: number;
//   eating: number;
//   drinking: number;
//   profitPerMinute: number;
//   unlockPart: number;
// }
interface Istate {
  platform: string;
  autoSaveSpeed: number;
  maxMerginTime: number;
  herdBoostSpeedAnimal: number;
  herdBoostPrice: number;
  herdBoostTime: number;
  herdBoostDelay: number;
  herdBoostAnimals: number[];
  shopNotificationCount: number[];
  timeToNewDay: number;
  sheepSettings: IsheepSettings;
  chickenSettings: IchickenSettings;
  cowSettings: IcowSettings;
  unicornSettings: IeventSettings;
  chickenTerritories: Iterritories[];
  cowTerritories: Iterritories[];
  sheepTerritories: Iterritories[];
  eventTerritories: IeventTerritories[];
  sheep: Isheep[];
  chicken: Ichicken[];
  cow: Icow[];
  eventAnimals: IeventAnimal[];
  chickenEggs: IchickenEgg[];
  cowMilk: IcowMilk[];
  eventResources: IeventResource[];
  lang: { [key: string]: string };
  modal: Imodal;
  animal: any;
  territory: any;
  user: Iuser;
  userSheep: IuserSheep;
  userChicken: IuserChicken;
  userCow: IuserCow;
  userUnicorn: IuserEvent;
  convertor: Iconvertor;
  exchangeTerritory: number;
  farm: string;
  packages: Ipackage[];
  sheepTasks: Itasks[];
  chickenTasks: Itasks[];
  cowTasks: Itasks[];
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
  cowCollectorSettings: IcollectorSettings[];
  eventCollectorSettings: IcollectorSettings[];
  adBlock: boolean;
  adman: any;
  donate: boolean;
  boughtFeedBoost: boolean;
  boughtFactoryBoost: boolean;
  chat: Ichat[];
  stock: string;
  starterpack: boolean;
  fortuneData: IfortuneData;
  sheepNotificationCount: number[];
  chickenNotificationCount: number[];
  cowNotificationCount: number[];
  unicornNotificationCount: number[];
  storageMultiply: number;
  vkTask: IsociaTasks;
  okTask: IsociaTasks;
  shownSocialTaskWindow: boolean;
  ysdk?: any;
  unicornRaitings?: IunicornRaitingsData;
  build: number;
  yaPlayer?: any;
  updatePersonalMessage?: boolean;
  foreignProfileId?: string;
  yandexName?: string;
  musicVolume: number;
  soundVolume: number;
  config: Iconfig[];
}
