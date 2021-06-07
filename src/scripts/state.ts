let sheepSettings: IsheepSettings;
let chickenSettings: IchickenSettings;
let chickenTerritories: Iterritories[];
let cowSettings: IcowSettings;
let cowTerritories: Iterritories[];
let sheepTerritories: Iterritories[];
let sheep: Isheep[];
let chicken: Ichicken[];
let chickenEggs: IchickenEgg[];
let cow: Icow[];
let cowMilk: IcowMilk[];
let lang: { [key: string]: string };
let modal: Imodal;
let animal: any;
let territory: any;
let autoSaveSpeed: number;
let maxMerginTime: number;
let herdBoostSpeedAnimal: number;
let herdBoostPrice: number;
let herdBoostTime: number;
let herdBoostDelay: number;
let herdBoostAnimals: number[] = [];
let nativeCounter: number[];
let timeToNewDay: number;
let user: Iuser;
let userSheep: IuserSheep;
let userChicken: IuserChicken;
let userCow: IuserCow;
let convertor: Iconvertor;
let exchangeTerritory: number;
let farm: string;
let packages: Ipackage[];
let sheepTasks: Itasks[];
let chickenTasks: Itasks[];
let cowTasks: Itasks[];
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
let cowCollectorSettings: IcollectorSettings[];
let adBlock: boolean;
let adman: any;
let donate: boolean;
let boughtFeedBoost: boolean = false;
let boughtFactoryBoost: boolean = false;
let unicornSettings: IeventSettings;
let eventTerritories: IeventTerritories[];
let eventAnimals: IeventAnimal[];
let eventResources: IeventResource[];
let userUnicorn: IuserEvent;
let eventCollectorSettings: IcollectorSettings[];
let chat: Ichat[] = [];
let starterpack: boolean = false;
let stock: string = '';
let fortuneData: IfortuneData;
let sheepNativeCount: number[] = [ 0, 0, 0, 0 ];
let chickenNativeCount: number[] = [ 0, 0, 0, 0 ];
let cowNativeCount: number[] = [ 0, 0, 0, 0, 0 ];

let state: Istate = {
  // записываемые в localStorage
  autoSaveSpeed, // скорость автосохранения
  maxMerginTime, // время не активности животного на ярмарке
  herdBoostSpeedAnimal, // скорость животного во время 'стадного' буста
  herdBoostPrice, // стоимость покупки 'стадного' буста
  herdBoostTime, // время длительности 'стадного' буста
  herdBoostDelay, // время задержки для появления животного во время "стадного буста"
  herdBoostAnimals, // массив животных для буста
  timeToNewDay, // время до пуста
  sheepSettings, // настройки и параметры
  chickenSettings, // настройки и параметры
  cowSettings, // настройки и параметры
  unicornSettings, // настройки и параметры
  farm, // имя сцены активной фермы (записывается в localStorage)
  chickenTerritories, // юзерский массив сохраненных территорий кур
  cowTerritories, // юзерский массив сохраненных территорий коров
  sheepTerritories, // юзерский массив сохраненных территорий овец
  eventTerritories, // юзерский массив сохраненных территорий евента
  sheep, // юзерский массив сохраненных овец
  chicken, // юзерский массив сохраненных куриц
  cow, // юзерский массив сохраненных коров
  eventAnimals, // юзерский массив сохраненных евентовых животных
  chickenEggs, // юзерский массив сохраненных куринных яиц
  cowMilk, // юзерский массив сохраненного коровьего молока
  eventResources, // юзерский массив сохраненных евентовых ресурсов
  user, // массив общих данных юзера для всех ферм
  userSheep, // массив данных юзера для овечьей фермы
  userChicken, // массив данных юзера для куринной фермы
  userCow, // массив данных юзера для коровьей фермы
  userUnicorn, // массив данных юзера для евентовой фермы
  sheepTasks, // задания овечьей фермы
  chickenTasks, // задания куриной фермы
  cowTasks, // задания коровьей фермы
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
  cowCollectorSettings, // настройки уровней собирателя яиц
  eventCollectorSettings, // настройки уровней собирателя яиц
  adBlock, // состояние блокировщика рекламы
  adman, // объект рекламы вк
  donate, // переменная для показа доната
  boughtFeedBoost, // куплен ли буст
  chat, // сообщения в чат
  starterpack, // забрал ли юзер стартерпак
  stock, // тип акции, собтия для revenue
  boughtFactoryBoost, // куплен ли шоколад
  fortuneData,
  sheepNativeCount,
  chickenNativeCount,
  cowNativeCount,
}

export default state;
