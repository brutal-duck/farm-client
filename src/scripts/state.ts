let sheepSettings: IsheepSettings;
let chickenSettings: IchickenSettings;
let chickenTerritories: Iterritories[];
let sheepTerritories: Iterritories[];
let sheep: Isheep[];
let chicken: Ichicken[];
let chickenEggs: IchickenEgg[];
let lang: object;
let modal: Imodal;
let animal: any;
let territory: any;
let autoSaveSpeed: number;
let maxMerginTime: number;
let herdBoostSpeedAnimal: number;
let herdBoostPrice: number;
let herdBoostTime: number;
let herdBoostDelay: number;
let herdBoostAnimals: number[];
let nativeCounter: number[];
let timeToHerdBoost: number;
let user: Iuser;
let userSheep: IuserSheep;
let userChicken: IuserChicken;
let convertor: Iconvertor;
let exchangeTerritory: number;
let farm: string;
let packages: Ipackage[];
let sheepTasks: Itasks[];
let chickenTasks: Itasks[];
let platform: string;
let name: string;
let avatar: string;
let socket: any;
let tutorial: Itutorial;
let progress: Iprogress;
let offlineTime: number;
let daily: number | boolean;
let payDiamonds: number;
let payId: number;
let payPrice: number;
let amplitude: any;
let online: boolean = true;
let newbieTime: number;
let dailyAwards: boolean[] = [false, false, false, false, false, false, false, false];
let readyAd: boolean;
let adRewardedType: number;
let adTimeout: boolean;
let vkId: number;
let sheepCollectorSettings: IcollectorSettings[];
let chickenCollectorSettings: IcollectorSettings[];
let adBlock: boolean;
let adman: any;
let donate: boolean;

let state: Istate = {
  // записываемые в localStorage
  autoSaveSpeed, // скорость автосохранения
  maxMerginTime, // время не активности животного на ярмарке
  herdBoostSpeedAnimal, // скорость животного во время 'стадного' буста
  herdBoostPrice, // стоимость покупки 'стадного' буста
  herdBoostTime, // время длительности 'стадного' буста
  herdBoostDelay, // время задержки для появления животного во время "стадного буста"
  herdBoostAnimals, // массив животных для буста
  timeToHerdBoost, // время до пуста
  sheepSettings, // настройки и параметры
  chickenSettings, // настройки и параметры
  farm, // имя сцены активной фермы (записывается в localStorage)
  chickenTerritories, // юзерский массив сохраненных территорий кур
  sheepTerritories, // юзерский массив сохраненных территорий овец
  sheep, // юзерский массив сохраненных овец
  chicken, // юзерский массив сохраненных куриц
  chickenEggs, // юзерский массив сохраненных куринных яиц
  user, // массив общих данных юзера для всех ферм
  userSheep, // массив данных юзера для овечьей фермы
  userChicken, // массив данных юзера для куринной фермы
  sheepTasks, // задания куриной фермы
  chickenTasks, // задания куриной фермы
  dailyAwards, // награды новичка

  // не записываемые в localStorage
  nativeCounter, // счетчик нативов в магазине ['diamonds', 'gold', 'animals', 'booster']
  lang, // массив слов выбранного языка
  modal, // настройки окон
  animal, // сюда присваиваем животное (для окна)
  territory, // сюда присваиваем территорию (для окна)
  convertor, // данные конвертора
  exchangeTerritory, // тип территории на которую хотим менять
  packages, //пакеты оплаты
  platform, // платформа
  name, // имя юзера в соц.сетях
  avatar, // аватар юзера в соц.сетях
  socket, // сокеты
  tutorial, // настройки для туториала
  progress, // прогресс для карты фермы
  offlineTime, // время отстутствия пользователя
  daily, // ежедневные награды
  payDiamonds, // количество кристаллов для оплаты (одноклассники)
  payId, // id пакета для оплаты (одноклассники)
  payPrice, // цена пакета для оплаты (одноклассники)
  amplitude, // амплитуда
  online, // подключение к инету
  newbieTime, // время дейликов для новичка
  readyAd, // реклама загружена, готова к показу
  adRewardedType, // тип вознаграждения на рекламу
  adTimeout, // время таймаута до возможности показать рекламу
  vkId, // ВК id
  sheepCollectorSettings, // настройки уровней подстригателя
  chickenCollectorSettings, // настройки уровней собирателя яиц
  adBlock, // состояние блокировщика рекламы
  adman, // объект рекламы вк
  donate // переменная для показа доната
}

export default state;
