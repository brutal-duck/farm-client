const config: Iconfig[] = [
  //1
  {
    collectorTime: 3,
    collectorTimeCost: 0,
    collectorSpeed: 0.1,
    collectorSpeedCost: 0,
    repositoryCost: 1, // 0?
    repositoryVolume: 27,
    fairCost: 0,
    grassAndWaterTerritoryCost: 500,
    grassAndWaterRestorePoints: 13,
    territoryColddown: 0,
    oneDiamondToMoney: 450,
    tasks: [
      // купи овец
      {
        id: '111', // id
        type: 1, // тип
        state: 1, // $2 / Y
        done: false, // выполенно?
        awardTaken: false, // награда получена?
        awardType: 'diamond', // валюта награды
        award: 1, // размер награды
        count: 2, // $1 / X
        progress: 0, // прогресс
        text: 'taskName_0', // текст в langs
        icon: 'sheep-task-icon-1', // спрайт иконки
        sort: 1 // приоритет для сортировки
      },
      // обменяй
      {
        id: '112',
        type: 2,
        state: 2,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        count: 1,
        progress: 0,
        text: 'taskName_1',
        icon: 'sheep-task-icon-2',
        sort: 2
      },
      // включи собиратель
      {
        id: '113',
        type: 3,
        state: 0,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        count: 1,
        progress: 0,
        text: 'taskName_2',
        icon: 'sheep-task-icon-16',
        sort: 3
      },
      // продай с хранилища
      {
        id: '114',
        type: 20,
        state: 0,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        count: 1,
        progress: 0,
        text: 'taskName_3',
        icon: 'sheep-task-icon-31',
        sort: 4
      }
    ],
  },
  //2
  {
    collectorTime: 5,
    collectorTimeCost: 2600,
    collectorSpeed: 0.2,
    collectorSpeedCost: 2,
    repositoryCost: 1,
    repositoryVolume: 90,
    fairCost: 0,
    grassAndWaterTerritoryCost: 650,
    grassAndWaterRestorePoints: 13,
    territoryColddown: 0.25,
    oneDiamondToMoney: 450,
    tasks: [
      // купи землю
      {
        id: '121',
        type: 5,
        state: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        count: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      // купи траву
      {
        id: '122',
        type: 5,
        state: 2,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        count: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      // улучши все территории
      {
        id: '123',
        type: 27,
        state: 2,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        count: 4,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      // купи овец
      {
        id: '124',
        type: 1,
        state: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        count: 2,
        progress: 0,
        text: 'taskName_0',
        icon: 'sheep-task-icon-1',
        sort: 4
      },
      // получи овец
      {
        id: '125',
        type: 4,
        state: 2,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_9',
        icon: 'sheep-task-icon-2',
        sort: 5
      },
      // улучши собиратель
      {
        id: '126',
        type: 23,
        state: 0,
        count: 2,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 6
      },
    ],
  },
  //3
  {
    collectorTime: 7,
    collectorTimeCost: 4300,
    collectorSpeed: 0.3,
    collectorSpeedCost: 3,
    repositoryCost: 2,
    repositoryVolume: 126,
    fairCost: 4300,
    grassAndWaterTerritoryCost: 1720,
    grassAndWaterRestorePoints: 14,
    territoryColddown: 5,
    oneDiamondToMoney: 900,
    tasks: [
      // купи землю
      {
        id: '131',
        type: 5,
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      // купи траву
      {
        id: '132',
        type: 5,
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      // улучши все территории
      {
        id: '133',
        type: 27,
        state: 3, // требуемый уровень
        count: 5, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      // улучши ярмарку
      {
        id: '134',
        type: 7,
        state: 2,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_11',
        icon: 'sheep-task-icon-22',
        sort: 4
      },
      {
        type: 23, // улучши собиратель
        id: '135',
        state: 0,
        count: 3,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 5
      },
      // получи овец
      {
        id: '136',
        type: 4,
        state: 3, // порода
        count: 2, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_10',
        icon: 'sheep-task-icon-3',
        sort: 6
      },
      // получи кристалическое животное
      {
        id: '137',
        type: 18,
        state: 0, // порода
        count: 1, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_12',
        icon: 'sheep-task-icon-14',
        sort: 7
      },
    ],
  },
  //4
  {
    collectorTime: 9,
    collectorTimeCost: 12100,
    collectorSpeed: 0.4,
    collectorSpeedCost: 4,
    repositoryCost: 2,
    repositoryVolume: 216,
    fairCost: 12100,
    grassAndWaterTerritoryCost: 4033,
    grassAndWaterRestorePoints: 15,
    territoryColddown: 7,
    oneDiamondToMoney: 1800,
    tasks: [
      {
        type: 5, // купи землю
        id: '141',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '142',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '143',
        state: 4, // требуемый уровень
        count: 6, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 7, // улучши ярмарку
        id: '144',
        state: 3,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_11',
        icon: 'sheep-task-icon-22',
        sort: 4
      },
      {
        type: 6, // накопить монет
        id: '145',
        state: 0,
        count: 30000, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_14',
        icon: 'sheep-task-icon-15',
        sort: 5
      },
      {
        type: 23, // улучши собиратель
        id: '146',
        state: 0,
        count: 4,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '147',
        state: 4, // порода
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_13',
        icon: 'sheep-task-icon-4',
        sort: 7
      },
    ],
  },
  //5
  {
    collectorTime: 11,
    collectorTimeCost: 42000,
    collectorSpeed: 0.5,
    collectorSpeedCost: 5,
    repositoryCost: 3,
    repositoryVolume: 330,
    fairCost: 42000,
    grassAndWaterTerritoryCost: 12000,
    grassAndWaterRestorePoints: 16,
    territoryColddown: 17,
    oneDiamondToMoney: 4800,
    tasks: [
      {
        type: 5, // купи землю
        id: '151',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '152',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '153',
        state: 5, // требуемый уровень
        count: 7, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 7, // улучши ярмарку
        id: '154',
        state: 4,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_11',
        icon: 'sheep-task-icon-22',
        sort: 4
      },
      {
        type: 22, // возьми переполох
        id: '155',
        state: 0,
        count: 1, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_15',
        icon: 'sheep-task-icon-33',
        sort: 5
      },
      {
        type: 23, // улучши собиратель
        id: '156',
        state: 0,
        count: 5,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '157',
        state: 5, // порода
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_16',
        icon: 'sheep-task-icon-5',
        sort: 7
      },
    ],
  },
  //6
  {
    collectorTime: 13,
    collectorTimeCost: 261200,
    collectorSpeed: 0.6,
    collectorSpeedCost: 6,
    repositoryCost: 3,
    repositoryVolume: 468,
    fairCost: 261200,
    grassAndWaterTerritoryCost: 65300,
    grassAndWaterRestorePoints: 18,
    territoryColddown: 31,
    oneDiamondToMoney: 12000,
    tasks: [
      {
        type: 5, // купи землю
        id: '161',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '162',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '163',
        state: 6, // требуемый уровень
        count: 8, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 7, // улучши ярмарку
        id: '164',
        state: 5,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_11',
        icon: 'sheep-task-icon-22',
        sort: 4
      },
      {
        type: 21, // возьми комбикорм
        id: '165',
        state: 0,
        count: 1, // количество минут
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_25',
        icon: 'sheep-task-icon-32',
        sort: 5
      },
      {
        type: 23, // улучши собиратель
        id: '166',
        state: 0,
        count: 6,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '167',
        state: 6, // порода
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_17',
        icon: 'sheep-task-icon-6',
        sort: 7
      },
    ],
  },
  //7
  {
    collectorTime: 15,
    collectorTimeCost: 2243200,
    collectorSpeed: 0.8,
    collectorSpeedCost: 7,
    repositoryCost: 4,
    repositoryVolume: 720,
    fairCost: 0,
    grassAndWaterTerritoryCost: 249244,
    grassAndWaterRestorePoints: 21,
    territoryColddown: 36,
    oneDiamondToMoney: 28800,
    tasks: [
      {
        type: 5, // купи землю
        id: '171',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '172',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '173',
        state: 7, // требуемый уровень
        count: 9, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 11, // ручной сбор
        id: '174',
        state: 0,
        count: 4,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_28',
        icon: 'sheep-task-icon-21',
        sort: 4
      },
      {
        type: 23, // улучши собиратель
        id: '175',
        state: 0,
        count: 7,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 5
      },
      {
        type: 3, // включи собиратель
        id: '176',
        state: 0,
        count: 30, // количество минут
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_27',
        icon: 'sheep-task-icon-16',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '177',
        state: 6, // порода
        count: 2, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_171',
        icon: 'sheep-task-icon-6',
        sort: 7
      },
    ],
  },
  //8
  {
    collectorTime: 17,
    collectorTimeCost: 1720000,
    collectorSpeed: 0.9,
    collectorSpeedCost: 8,
    repositoryCost: 4,
    repositoryVolume: 918,
    fairCost: 1720000,
    grassAndWaterTerritoryCost: 344000,
    grassAndWaterRestorePoints: 23,
    territoryColddown: 54,
    oneDiamondToMoney: 38400,
    tasks: [
      {
        type: 5, // купи землю
        id: '181',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '182',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '183',
        state: 8, // требуемый уровень
        count: 10, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 7, // улучши ярмарку
        id: '184',
        state: 6,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_11',
        icon: 'sheep-task-icon-22',
        sort: 4
      },
      {
        type: 28, // купи монеты
        id: '185',
        state: 0,
        count: 500000, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_29',
        icon: 'sheep-task-icon-15',
        sort: 5
      },
      {
        type: 23, // улучши собиратель
        id: '186',
        state: 0,
        count: 8,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '167',
        state: 7, // порода
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_18',
        icon: 'sheep-task-icon-7',
        sort: 7
      },
    ],
  },
  //9
  {
    collectorTime: 19,
    collectorTimeCost: 11744000,
    collectorSpeed: 1.1,
    collectorSpeedCost: 9,
    repositoryCost: 5,
    repositoryVolume: 1254,
    fairCost: 0,
    grassAndWaterTerritoryCost: 1067636,
    grassAndWaterRestorePoints: 28,
    territoryColddown: 60,
    oneDiamondToMoney: 86400,
    tasks: [
      {
        type: 5, // купи землю
        id: '191',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '192',
        state: 3, // вода
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_31',
        icon: 'sheep-task-icon-26',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '193',
        state: 9, // требуемый уровень
        count: 11, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 6, // накопи монет
        id: '194',
        state: 0,
        count: 1000000,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_14',
        icon: 'sheep-task-icon-15',
        sort: 4
      },
      {
        type: 23, // улучши собиратель
        id: '195',
        state: 0,
        count: 9,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 5
      },
      {
        type: 15, // потрать кристаллы
        id: '196',
        state: 0,
        count: 15, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_30',
        icon: 'sheep-task-icon-14',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '197',
        state: 7, // порода
        count: 2, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_181',
        icon: 'sheep-task-icon-7',
        sort: 7
      },
    ],
  },
  //10
  {
    collectorTime: 21,
    collectorTimeCost: 8008000,
    collectorSpeed: 1.2,
    collectorSpeedCost: 10,
    repositoryCost: 5,
    repositoryVolume: 1386,
    fairCost: 8008000,
    grassAndWaterTerritoryCost: 1334667,
    grassAndWaterRestorePoints: 27,
    territoryColddown: 67,
    oneDiamondToMoney: 105600,
    tasks: [
      {
        type: 5, // купи землю
        id: '1101',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '1102',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '1103',
        state: 10, // требуемый уровень
        count: 12, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 7, // улучши ярмарку
        id: '1104',
        state: 7,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_11',
        icon: 'sheep-task-icon-22',
        sort: 4
      },
      {
        type: 25, // поймай в переполохе
        id: '1105',
        state: 0,
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_32',
        icon: 'sheep-task-icon-33',
        sort: 5
      },
      {
        type: 23, // улучши собиратель
        id: '1106',
        state: 0,
        count: 10,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '1107',
        state: 8, // порода
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_19',
        icon: 'sheep-task-icon-8',
        sort: 7
      },
    ],
  },
  //11
  {
    collectorTime: 23,
    collectorTimeCost: 35468800,
    collectorSpeed: 1.3,
    collectorSpeedCost: 11,
    repositoryCost: 6,
    repositoryVolume: 1794,
    fairCost: 0,
    grassAndWaterTerritoryCost: 2728369,
    grassAndWaterRestorePoints: 29,
    territoryColddown: 92,
    oneDiamondToMoney: 211200,
    tasks: [
      {
        type: 5, // купи землю
        id: '1111',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '1112',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '1113',
        state: 11, // требуемый уровень
        count: 13, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 18, // получи кристаллическое животное
        id: '1114',
        state: 0,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_34',
        icon: 'sheep-task-icon-14',
        sort: 4
      },
      {
        type: 23, // улучши собиратель
        id: '1115',
        state: 0,
        count: 11,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 5
      },
      {
        type: 29, // продать ресурс из хранилища
        id: '1116',
        state: 0,
        count: 300, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_33',
        icon: 'sheep-task-icon-31',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '1117',
        state: 8, // порода
        count: 2, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_191',
        icon: 'sheep-task-icon-7',
        sort: 7
      },
    ],
  },
  //12
  {
    collectorTime: 25,
    collectorTimeCost: 28662400,
    collectorSpeed: 1.4,
    collectorSpeedCost: 12,
    repositoryCost: 6,
    repositoryVolume: 1950,
    fairCost: 28662400,
    grassAndWaterTerritoryCost: 4094629,
    grassAndWaterRestorePoints: 32,
    territoryColddown: 100,
    oneDiamondToMoney: 249600,
    tasks: [
      {
        type: 5, // купи землю
        id: '1121',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '1122',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '1123',
        state: 12, // требуемый уровень
        count: 14, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 7, // улучши ярмарку
        id: '1124',
        state: 8,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_11',
        icon: 'sheep-task-icon-22',
        sort: 4
      },
      {
        type: 19, // кристаллы с животных
        id: '1125',
        state: 0,
        count: 2, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_35',
        icon: 'sheep-task-icon-14',
        sort: 5
      },
      {
        type: 23, // улучши собиратель
        id: '1126',
        state: 0,
        count: 12,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '1127',
        state: 9, // порода
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_20',
        icon: 'sheep-task-icon-9',
        sort: 7
      },
    ],
  },
  //13
  {
    collectorTime: 27,
    collectorTimeCost: 124774400,
    collectorSpeed: 1.5,
    collectorSpeedCost: 13,
    repositoryCost: 7,
    repositoryVolume: 2430,
    fairCost: 0,
    grassAndWaterTerritoryCost: 8318293,
    grassAndWaterRestorePoints: 33,
    territoryColddown: 108,
    oneDiamondToMoney: 499200,
    tasks: [
      {
        type: 5, // купи землю
        id: '1131',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '1132',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '1133',
        state: 13, // требуемый уровень
        count: 15, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 22, // переполох
        id: '1134',
        state: 0,
        count: 2,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_36',
        icon: 'sheep-task-icon-33',
        sort: 4
      },
      {
        type: 23, // улучши собиратель
        id: '1135',
        state: 0,
        count: 13,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 5
      },
      {
        type: 21, // выдать комбикорм
        id: '1136',
        state: 0,
        count: 2, // часов
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_26',
        icon: 'sheep-task-icon-32',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '1137',
        state: 9, // порода
        count: 2, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_201',
        icon: 'sheep-task-icon-9',
        sort: 7
      },
    ],
  },
  //14
  {
    collectorTime: 29,
    collectorTimeCost: 77664000,
    collectorSpeed: 1.6,
    collectorSpeedCost: 14,
    repositoryCost: 7,
    repositoryVolume: 2610,
    fairCost: 77664000,
    grassAndWaterTerritoryCost: 9708000,
    grassAndWaterRestorePoints: 36,
    territoryColddown: 116,
    oneDiamondToMoney: 576000,
    tasks: [
      {
        type: 5, // купи землю
        id: '1141',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '1142',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '1143',
        state: 14, // требуемый уровень
        count: 16, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 7, // улучши ярмарку
        id: '1144',
        state: 9,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_11',
        icon: 'sheep-task-icon-22',
        sort: 4
      },
      {
        type: 11, // ручной сбор
        id: '1145',
        state: 0,
        count: 8, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_28',
        icon: 'sheep-task-icon-21',
        sort: 5
      },
      {
        type: 23, // улучши собиратель
        id: '1146',
        state: 0,
        count: 14,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '1147',
        state: 10, // порода
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_21',
        icon: 'sheep-task-icon-10',
        sort: 7
      },
    ],
  },
  //15
  {
    collectorTime: 60,
    collectorTimeCost: 334028800,
    collectorSpeed: 1.7,
    collectorSpeedCost: 15,
    repositoryCost: 8,
    repositoryVolume: 3060,
    fairCost: 0,
    grassAndWaterTerritoryCost: 19648753,
    grassAndWaterRestorePoints: 41,
    territoryColddown: 240,
    oneDiamondToMoney: 1152000,
    tasks: [
      {
        type: 5, // купи землю
        id: '1151',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи хранилище
        id: '1152',
        state: 5, // хранилище
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_37',
        icon: 'sheep-task-icon-31',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '1153',
        state: 15, // требуемый уровень
        count: 17, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 15, // потрать кристалы
        id: '1154',
        state: 0,
        count: 25,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_30',
        icon: 'sheep-task-icon-14',
        sort: 4
      },
      {
        type: 23, // улучши собиратель
        id: '1155',
        state: 0,
        count: 15,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 5
      },
      {
        type: 6, // накопи монет
        id: '1156',
        state: 0,
        count: 100_000_000, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_14',
        icon: 'sheep-task-icon-15',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '1157',
        state: 10, // порода
        count: 2, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_211',
        icon: 'sheep-task-icon-10',
        sort: 7
      },
    ],
  },
  //16
  {
    collectorTime: 62,
    collectorTimeCost: 391462400,
    collectorSpeed: 1.8,
    collectorSpeedCost: 16,
    repositoryCost: 8,
    repositoryVolume: 3162,
    fairCost: 391462400,
    grassAndWaterTerritoryCost: 43495822,
    grassAndWaterRestorePoints: 43,
    territoryColddown: 248,
    oneDiamondToMoney: 1305600,
    tasks: [
      {
        type: 5, // купи землю
        id: '1161',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '1162',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '1163',
        state: 16, // требуемый уровень
        count: 18, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 7, // улучши ярмарку
        id: '1164',
        state: 10,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_11',
        icon: 'sheep-task-icon-22',
        sort: 4
      },
      {
        type: 25, // поймать
        id: '1165',
        state: 0,
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_32',
        icon: 'sheep-task-icon-33',
        sort: 5
      },
      {
        type: 23, // улучши собиратель
        id: '1166',
        state: 0,
        count: 16,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '1167',
        state: 11, // порода
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_22',
        icon: 'sheep-task-icon-11',
        sort: 7
      },
    ],
  },
  //17
  {
    collectorTime: 64,
    collectorTimeCost: 1618841600,
    collectorSpeed: 1.9,
    collectorSpeedCost: 17,
    repositoryCost: 9,
    repositoryVolume: 3648,
    fairCost: 0,
    grassAndWaterTerritoryCost: 85202189,
    grassAndWaterRestorePoints: 45,
    territoryColddown: 256,
    oneDiamondToMoney: 2611200,
    tasks: [
      {
        type: 5, // купи землю
        id: '1171',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '1172',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '1173',
        state: 17, // требуемый уровень
        count: 19, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 28, // купи монеты
        id: '1174',
        state: 0,
        count: 100_000_000,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_29',
        icon: 'sheep-task-icon-15',
        sort: 4
      },
      {
        type: 23, // улучши собиратель
        id: '1175',
        state: 0,
        count: 17,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 5
      },
      {
        type: 18, // кристаллическое животное
        id: '1176',
        state: 0,
        count: 2, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_34',
        icon: 'sheep-task-icon-14',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '1177',
        state: 11, // порода
        count: 2, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_221',
        icon: 'sheep-task-icon-11',
        sort: 7
      },
    ],
  },
  //18
  {
    collectorTime: 66,
    collectorTimeCost: 933401600,
    collectorSpeed: 2,
    collectorSpeedCost: 18,
    repositoryCost: 9,
    repositoryVolume: 3762,
    fairCost: 933401600,
    grassAndWaterTerritoryCost: 93340160,
    grassAndWaterRestorePoints: 48,
    territoryColddown: 264,
    oneDiamondToMoney: 2918400,
    tasks: [
      {
        type: 5, // купи землю
        id: '1181',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '1182',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '1183',
        state: 18, // требуемый уровень
        count: 20, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 7, // улучши ярмарку
        id: '1184',
        state: 11,
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_11',
        icon: 'sheep-task-icon-22',
        sort: 4
      },
      {
        type: 19, // собрать кристаллы с животного
        id: '1185',
        state: 0,
        count: 3, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_35',
        icon: 'sheep-task-icon-14',
        sort: 5
      },
      {
        type: 23, // улучши собиратель
        id: '1186',
        state: 0,
        count: 18,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '1187',
        state: 12, // порода
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_23',
        icon: 'sheep-task-icon-12',
        sort: 7
      },
    ],
  },
  //19
  {
    collectorTime: 68,
    collectorTimeCost: 3852083200,
    collectorSpeed: 2.1,
    collectorSpeedCost: 19,
    repositoryCost: 10,
    repositoryVolume: 4284,
    fairCost: 0,
    grassAndWaterTerritoryCost: 183432533,
    grassAndWaterRestorePoints: 49,
    territoryColddown: 272,
    oneDiamondToMoney: 5836800,
    tasks: [
      {
        type: 5, // купи землю
        id: '1191',
        state: 1, // зелмя
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_4',
        icon: 'sheep-task-icon-29',
        sort: 1
      },
      {
        type: 5, // купи траву
        id: '1192',
        state: 2, // трава
        count: 1,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_5',
        icon: 'sheep-task-icon-25',
        sort: 2
      },
      {
        type: 27, // улучши все территории
        id: '1193',
        state: 19, // требуемый уровень
        count: 21, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 3
      },
      {
        type: 22, // переполох
        id: '1194',
        state: 0,
        count: 2,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_36',
        icon: 'sheep-task-icon-33',
        sort: 4
      },
      {
        type: 23, // улучши собиратель
        id: '1195',
        state: 0,
        count: 19,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 5
      },
      {
        type: 21, // комбикорм
        id: '1196',
        state: 0,
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_26',
        icon: 'sheep-task-icon-32',
        sort: 6
      },
      {
        type: 4, // получи овец
        id: '1197',
        state: 12, // порода
        count: 2, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_24',
        icon: 'sheep-task-icon-12',
        sort: 7
      },
    ],
  },
  //20
  {
    collectorTime: 70,
    collectorTimeCost: 4386611200,
    collectorSpeed: 5,
    collectorSpeedCost: 20,
    repositoryCost: 10,
    repositoryVolume: 4830,
    fairCost: 0,
    grassAndWaterTerritoryCost: 208886248,
    grassAndWaterRestorePoints: 54,
    territoryColddown: 0,
    oneDiamondToMoney: 6451200,
    tasks: [
      {
        type: 27, // улучши все территории
        id: '1201',
        state: 20, // требуемый уровень
        count: 21, // количество территорий
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_6',
        icon: 'sheep-task-icon-24',
        sort: 1
      },
      {
        type: 23, // улучши собиратель
        id: '1202',
        state: 0,
        count: 20,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_7',
        icon: 'sheep-task-icon-34',
        sort: 2
      },
      {
        type: 4, // получи овец
        id: '1203',
        state: 12, // порода
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_24',
        icon: 'sheep-task-icon-12',
        sort: 3
      },
      {
        type: 25, // поймай овец
        id: '1204',
        state: 0, // порода
        count: 4, // количество
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_32',
        icon: 'sheep-task-icon-33',
        sort: 4
      },
      {
        type: 14, // все овцы на поле
        id: '1205',
        state: 0,
        count: 0,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        progress: 0,
        text: 'taskName_38',
        icon: 'sheep-task-icon-33',
        sort: 5
      },
    ],
  },
]

// const sheepConfig: ISheepConfig[] = [
//   { woolPrice: 100, woolGrowthSpeed: 250, eating: 10, drinking: 2, profitPerMinute: 1500, unlockPart: 0 },
//   { woolPrice: 200, woolGrowthSpeed: 150, eating: 11, drinking: 2, profitPerMinute: 1800, unlockPart: 0 },
//   { woolPrice: 400, woolGrowthSpeed: 100, eating: 12, drinking: 3, profitPerMinute: 2400, unlockPart: 3 },
//   { woolPrice: 800, woolGrowthSpeed: 100, eating: 13, drinking: 3, profitPerMinute: 4800, unlockPart: 4 },
//   { woolPrice: 1600, woolGrowthSpeed: 100, eating: 14, drinking: 3, profitPerMinute: 9600, unlockPart: 5 },
//   { woolPrice: 3200, woolGrowthSpeed: 100, eating: 16, drinking: 3, profitPerMinute: 19200, unlockPart: 6 },
//   { woolPrice: 6400, woolGrowthSpeed: 100, eating: 18, drinking: 4, profitPerMinute: 38400, unlockPart: 8 },
//   { woolPrice: 12800, woolGrowthSpeed: 100, eating: 20, drinking: 4, profitPerMinute: 76800, unlockPart: 10 },
//   { woolPrice: 25600, woolGrowthSpeed: 100, eating: 24, drinking: 5, profitPerMinute: 153600, unlockPart: 12 },
//   { woolPrice: 51200, woolGrowthSpeed: 100, eating: 28, drinking: 5, profitPerMinute: 307200, unlockPart: 14 },
//   { woolPrice: 102400, woolGrowthSpeed: 100, eating: 32, drinking: 6, profitPerMinute: 614400, unlockPart: 16 },
//   { woolPrice: 204800, woolGrowthSpeed: 100, eating: 36, drinking: 7, profitPerMinute: 1228800, unlockPart: 18 }
// ]

export {
  config,
  // sheepConfig
}