let sheepSettings: IsheepSettings;
import Amplitude from './libs/Amplitude';
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
let notificationCounter: number[];
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
let amplitude: Amplitude;
let online: boolean = true;
let newbieTime: number;
let dailyAwards: boolean[] = [false, false, false, false, false, false, false, false];
let readyAd: boolean;
let adRewardedType: number;
let adTimeout: boolean;
let vkId: number;
let playId: string;
let sheepCollectorSettings: IcollectorSettings[];
let chickenCollectorSettings: IcollectorSettings[];
let cowCollectorSettings: IcollectorSettings[];
let adBlock: boolean;
let donate: boolean;
let boughtFeedBoost: boolean = false;
let boughtFactoryBoost: boolean = false;
let unicornSettings: IunicornSettings;
let eventTerritories: IunicornTerritories[];
let eventAnimals: Iunicorn[];
let eventResources: IunicornResource[];
let userUnicorn: IuserUnicorn;
let unicornCollectorSettings: IcollectorSettings[];
let chat: Ichat[] = [];
let starterpack: boolean = false;
let stock: string = '';
let fortuneData: IfortuneData;
let sheepNotificationCount: number[] = [ 0, 0, 0, 0 ];
let chickenNotificationCount: number[] = [ 0, 0, 0, 0 ];
let cowNotificationCount: number[] = [ 0, 0, 0, 0, 0 ];
let unicornNotificationCount: number[] = [ 0 ];
let storageMultiply: number = 2;
let vkTask: IsociaTasks = {};
let okTask: IsociaTasks = {};
let shownSocialTaskWindow: boolean = false;
let build: number = 0;
let yandexName: string = '';
let musicVolume: number = 1;
let soundVolume: number = 1;
let clanEventTakenAward: boolean = true;
let sales: Isale[] = [];
let clanChatNotificationCount: number = 0;
let dataIsLoaded: boolean = false;
let interstitialTimer: number = 0;
let admob: Iadmob = {
  interstitial: null,
  rewarded: null
};
let badBalanceWindowShown: boolean = false;

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
  unicornTerritories: eventTerritories, // юзерский массив сохраненных территорий евента
  sheep, // юзерский массив сохраненных овец
  chicken, // юзерский массив сохраненных куриц
  cow, // юзерский массив сохраненных коров
  unicorn: eventAnimals, // юзерский массив сохраненных евентовых животных
  chickenEggs, // юзерский массив сохраненных куринных яиц
  cowMilk, // юзерский массив сохраненного коровьего молока
  unicornResources: eventResources, // юзерский массив сохраненных евентовых ресурсов
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
  badBalanceWindowShown,
  clanChatNotificationCount,
  shopNotificationCount: notificationCounter, // счетчик нативов в магазине ['diamonds', 'gold', 'animals', 'booster']
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
  unicornCollectorSettings, // настройки уровней собирателя яиц
  adBlock, // состояние блокировщика рекламы
  donate, // переменная для показа доната
  boughtFeedBoost, // куплен ли буст
  chat, // сообщения в чат
  starterpack, // забрал ли юзер стартерпак
  stock, // тип акции, собтия для revenue
  boughtFactoryBoost, // куплен ли шоколад
  fortuneData, // объект данных колеса
  sheepNotificationCount, // натификаторы для профиля
  chickenNotificationCount, // натификаторы для профиля
  cowNotificationCount, // натификаторы для профиля
  unicornNotificationCount, // натификаторы для профиля
  storageMultiply, // множитель для коров
  vkTask,
  okTask,
  shownSocialTaskWindow,
  build,
  yandexName,
  musicVolume,
  soundVolume,
  clanEventTakenAward,
  sales,
  dataIsLoaded,
  playId,
  interstitialTimer,
  admob,
}

export default state;
