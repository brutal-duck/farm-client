const cowPartSettings: IpartSettings[] = [
  //1
  {
    collector: {
      time: 3,
      improveTimePrice: 0,
      speed: 0.1,
      imporveSpeedPrice: 0,
    },
    territory: {
      improveRepositoryPrice: 1,
      improveFairPrice: 0,
      improveTerritoryPrice: 500,
      regeneration: 13,
      maxRepositoryVolume: 5400,
      cooldown: 0,
    },
    exchange: 450,
  },
  //2
  {
    collector: {
      time: 5,
      improveTimePrice: 8000,
      speed: 0.2,
      imporveSpeedPrice: 2,
    },
    territory: {
      improveRepositoryPrice: 1,
      improveFairPrice: 0,
      improveTerritoryPrice: 2000,
      regeneration: 13,
      maxRepositoryVolume: 18000,
      cooldown: 0.5,
    },
    exchange: 450,
  },
  //3
  {
    collector: {
      time: 7,
      improveTimePrice: 13300,
      speed: 0.3,
      imporveSpeedPrice: 3,
    },
    territory: {
      improveRepositoryPrice: 2,
      improveFairPrice: 8800,
      improveTerritoryPrice: 5320,
      regeneration: 14,
      maxRepositoryVolume: 25200,
      cooldown: 16,
    },
    exchange: 900,
  },
  //4
  {
    collector: {
      time: 9,
      improveTimePrice: 37300,
      speed: 0.4,
      imporveSpeedPrice: 4,
    },
    territory: {
      improveRepositoryPrice: 2,
      maxRepositoryVolume: 86400,
      improveFairPrice: 24700,
      improveTerritoryPrice: 12433,
      regeneration: 17, // Увеличено для сохранения баланса
      cooldown: 21,
    },
    exchange: 1800,
  },
  //5
  {
    collector: {
      time: 11,
      improveTimePrice: 128400,
      speed: 0.5,
      imporveSpeedPrice: 5,
    },
    territory: {
      improveRepositoryPrice: 3,
      maxRepositoryVolume: 264000,
      improveFairPrice: 85200,
      improveTerritoryPrice: 36686,
      regeneration: 19, // Увеличено для сохранения баланса
      cooldown: 52,
    },
    exchange: 4800,
  },
  //6
  {
    collector: {
      time: 13,
      improveTimePrice: 789200,
      speed: 0.6,
      imporveSpeedPrice: 6,
    },
    territory: {
      improveRepositoryPrice: 3,
      maxRepositoryVolume: 748800,
      improveFairPrice: 525200,
      improveTerritoryPrice: 197300,
      regeneration: 20, // Увеличено для сохранения баланса
      cooldown: 93,
    },
    exchange: 12000,
  },
  //7
  {
    collector: {
      time: 15,
      improveTimePrice: 6736000,
      speed: 0.8,
      imporveSpeedPrice: 7,
    },
    territory: {
      improveRepositoryPrice: 4,
      maxRepositoryVolume: 2304000,
      improveFairPrice: 0,
      improveTerritoryPrice: 748444,
      regeneration: 21,
      cooldown: 108,
    },
    exchange: 28800,
  },
  //8
  {
    collector: {
      time: 17,
      improveTimePrice: 5176000,
      speed: 0.9,
      imporveSpeedPrice: 8,
    },
    territory: {
      improveRepositoryPrice: 4,
      maxRepositoryVolume: 2937600,
      improveFairPrice: 5176000,
      improveTerritoryPrice: 1035200,
      regeneration: 23,
      cooldown: 122,
    },
    exchange: 38400,
  },
  //9
  {
    collector: {
      time: 19,
      improveTimePrice: 26432000,
      speed: 1.1,
      imporveSpeedPrice: 9,
    },
    territory: {
      improveRepositoryPrice: 5,
      maxRepositoryVolume: 8025600,
      improveFairPrice: 0,
      improveTerritoryPrice: 2402909,
      regeneration: 28,
      cooldown: 136,
    },
    exchange: 86400,
  },
  //10
  {
    collector: {
      time: 21,
      improveTimePrice: 18040000,
      speed: 1.2,
      imporveSpeedPrice: 10,
    },
    territory: {
      improveRepositoryPrice: 5,
      maxRepositoryVolume: 8870400,
      improveFairPrice: 18040000,
      improveTerritoryPrice: 3006667,
      regeneration: 27,
      cooldown: 201,
    },
    exchange: 105600,
  },
  //11
  {
    collector: {
      time: 23,
      improveTimePrice: 106432000,
      speed: 1.3,
      imporveSpeedPrice: 11,
    },
    territory: {
      improveRepositoryPrice: 6,
      maxRepositoryVolume: 22963200,
      improveFairPrice: 0,
      improveTerritoryPrice: 8187077,
      regeneration: 29,
      cooldown: 220,
    },
    exchange: 211200,
  },
  //12
  {
    collector: {
      time: 25,
      improveTimePrice: 68848000,
      speed: 1.4,
      imporveSpeedPrice: 12,
    },
    territory: {
      improveRepositoryPrice: 6,
      maxRepositoryVolume: 24960000,
      improveFairPrice: 68848000,
      improveTerritoryPrice: 9835429,
      regeneration: 32,
      cooldown: 240,
    },
    exchange: 249600,
  },
  //13
  {
    collector: {
      time: 27,
      improveTimePrice: 299494400,
      speed: 1.5,
      imporveSpeedPrice: 13,
    },
    territory: {
      improveRepositoryPrice: 7,
      maxRepositoryVolume: 62208000,
      improveFairPrice: 0,
      improveTerritoryPrice: 19966293,
      regeneration: 33,
      cooldown: 259,
    },
    exchange: 499200,
  },
  //14
  {
    collector: {
      time: 29,
      improveTimePrice: 186528000,
      speed: 1.6,
      imporveSpeedPrice: 14,
    },
    territory: {
      improveRepositoryPrice: 7,
      maxRepositoryVolume: 66816000,
      improveFairPrice: 186528000,
      improveTerritoryPrice: 23316000,
      regeneration: 36,
      cooldown: 278,
    },
    exchange: 576000,
  },
  //15
  {
    collector: {
      time: 60,
      improveTimePrice: 801740800,
      speed: 1.7,
      imporveSpeedPrice: 15,
    },
    territory: {
      improveRepositoryPrice: 8,
      maxRepositoryVolume: 156672000,
      improveFairPrice: 0,
      improveTerritoryPrice: 47161224,
      regeneration: 41,
      cooldown: 576,
    },
    exchange: 1152000,
  },
  //16
  {
    collector: {
      time: 62,
      improveTimePrice: 939814400,
      speed: 1.8,
      imporveSpeedPrice: 16,
    },
    territory: {
      improveRepositoryPrice: 8,
      maxRepositoryVolume: 161894400,
      improveFairPrice: 939814400,
      improveTerritoryPrice: 104423822,
      regeneration: 43,
      cooldown: 595,
    },
    exchange: 1305600,
  },
  //17
  {
    collector: {
      time: 64,
      improveTimePrice: 3885363200,
      speed: 1.9,
      imporveSpeedPrice: 17,
    },
    territory: {
      improveRepositoryPrice: 9,
      maxRepositoryVolume: 373555200,
      improveFairPrice: 0,
      improveTerritoryPrice: 204492800,
      regeneration: 45,
      cooldown: 614,
    },
    exchange: 2611200,
  },
  //18
  {
    collector: {
      time: 66,
      improveTimePrice: 2240844800,
      speed: 2,
      imporveSpeedPrice: 18,
    },
    territory: {
      improveRepositoryPrice: 9,
      maxRepositoryVolume: 385228800,
      improveFairPrice: 2240844800,
      improveTerritoryPrice: 224084480,
      regeneration: 48,
      cooldown: 633,
    },
    exchange: 2918400,
  },
  //19
  {
    collector: {
      time: 68,
      improveTimePrice: 9245286400,
      speed: 2.1,
      imporveSpeedPrice: 19,
    },
    territory: {
      improveRepositoryPrice: 10,
      maxRepositoryVolume: 877363200,
      improveFairPrice: 0,
      improveTerritoryPrice: 440251733,
      regeneration: 49,
      cooldown: 652,
    },
    exchange: 5836800,
  },
  //20
  {
    collector: {
      time: 70,
      improveTimePrice: 10528153600,
      speed: 5,
      imporveSpeedPrice: 20,
    },
    territory: {
      improveRepositoryPrice: 10,
      maxRepositoryVolume: 989184000,
      improveFairPrice: 4177822480,
      improveTerritoryPrice: 501340648,
      regeneration: 54,
      cooldown: 0,
    },
    exchange: 6451200,
  },
];

export default cowPartSettings;