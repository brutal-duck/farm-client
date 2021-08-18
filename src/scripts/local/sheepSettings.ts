const config: Iconfig[] = [
  //1
  {
    collectorTime: 3,
    collectorTimeCost: 0,
    collectorSpeed: 0.1,
    collectorSpeedCost: 0,
    repositoryCost: 1,
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
    territoryColddown: 4,
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
        count: 4,
        progress: 0,
        text: 'taskName_0',
        icon: 'sheep-task-icon-1',
        sort: 4
      },
      // получи овец
      {
        id: '124',
        type: 4,
        state: 2,
        done: false,
        awardTaken: false,
        awardType: 'diamond',
        award: 1,
        count: 2,
        progress: 0,
        text: 'taskName_9',
        icon: 'sheep-task-icon-2',
        sort: 5
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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
    tasks: [],
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