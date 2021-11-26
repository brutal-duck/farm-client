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
      regeneration: 15,
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
      regeneration: 16,
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
      regeneration: 18,
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
      improveFairPrice: 3448000,
      improveTerritoryPrice: 1035200,
      regeneration: 23,
      cooldown: 163,
    },
    exchange: 38400,
  },
  //9
  {
    collector: {
      time: 19,
      improveTimePrice: 35244800,
      speed: 1.1,
      imporveSpeedPrice: 9,
    },
    territory: {
      improveRepositoryPrice: 5,
      maxRepositoryVolume: 8025600,
      improveFairPrice: 0,
      improveTerritoryPrice: 3204073,
      regeneration: 28,
      cooldown: 182,
    },
    exchange: 86400,
  },
  //10
  {
    collector: {
      time: 21,
      improveTimePrice: 24059200,
      speed: 1.2,
      imporveSpeedPrice: 10,
    },
    territory: {
      improveRepositoryPrice: 5,
      maxRepositoryVolume: 8870400,
      improveFairPrice: 16033600,
      improveTerritoryPrice: 4009867,
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
      cooldown: 276,
    },
    exchange: 211200,
  },
  //12
  {
    collector: {
      time: 25,
      improveTimePrice: 86070400,
      speed: 1.4,
      imporveSpeedPrice: 12,
    },
    territory: {
      improveRepositoryPrice: 6,
      maxRepositoryVolume: 24960000,
      improveFairPrice: 57366400,
      improveTerritoryPrice: 12295771,
      regeneration: 32,
      cooldown: 300,
    },
    exchange: 249600,
  },
  //13
  {
    collector: {
      time: 27,
      improveTimePrice: 374374400,
      speed: 1.5,
      imporveSpeedPrice: 13,
    },
    territory: {
      improveRepositoryPrice: 7,
      maxRepositoryVolume: 62208000,
      improveFairPrice: 0,
      improveTerritoryPrice: 24958293,
      regeneration: 33,
      cooldown: 324,
    },
    exchange: 499200,
  },
  //14
  {
    collector: {
      time: 29,
      improveTimePrice: 233184000,
      speed: 1.6,
      imporveSpeedPrice: 14,
    },
    territory: {
      improveRepositoryPrice: 7,
      maxRepositoryVolume: 66816000,
      improveFairPrice: 155424000,
      improveTerritoryPrice: 29148000,
      regeneration: 36,
      cooldown: 348,
    },
    exchange: 576000,
  },
  //15
  {
    collector: {
      time: 60,
      improveTimePrice: 1002188800,
      speed: 1.7,
      imporveSpeedPrice: 15,
    },
    territory: {
      improveRepositoryPrice: 8,
      maxRepositoryVolume: 156672000,
      improveFairPrice: 0,
      improveTerritoryPrice: 58952282,
      regeneration: 41,
      cooldown: 720,
    },
    exchange: 1152000,
  },
  //16
  {
    collector: {
      time: 62,
      improveTimePrice: 1174822400,
      speed: 1.8,
      imporveSpeedPrice: 16,
    },
    territory: {
      improveRepositoryPrice: 8,
      maxRepositoryVolume: 161894400,
      improveFairPrice: 783142400,
      improveTerritoryPrice: 130535822,
      regeneration: 43,
      cooldown: 744,
    },
    exchange: 1305600,
  },
  //17
  {
    collector: {
      time: 64,
      improveTimePrice: 4856729600,
      speed: 1.9,
      imporveSpeedPrice: 17,
    },
    territory: {
      improveRepositoryPrice: 9,
      maxRepositoryVolume: 373555200,
      improveFairPrice: 0,
      improveTerritoryPrice: 255617347,
      regeneration: 45,
      cooldown: 768,
    },
    exchange: 2611200,
  },
  //18
  {
    collector: {
      time: 66,
      improveTimePrice: 2801177600,
      speed: 2,
      imporveSpeedPrice: 18,
    },
    territory: {
      improveRepositoryPrice: 9,
      maxRepositoryVolume: 385228800,
      improveFairPrice: 1867289600,
      improveTerritoryPrice: 280117760,
      regeneration: 48,
      cooldown: 792,
    },
    exchange: 2918400,
  },
  //19
  {
    collector: {
      time: 68,
      improveTimePrice: 11556659200,
      speed: 2.1,
      imporveSpeedPrice: 19,
    },
    territory: {
      improveRepositoryPrice: 10,
      maxRepositoryVolume: 877363200,
      improveFairPrice: 0,
      improveTerritoryPrice: 550317105,
      regeneration: 49,
      cooldown: 816,
    },
    exchange: 5836800,
  },
  //20
  {
    collector: {
      time: 70,
      improveTimePrice: 13160243200,
      speed: 5,
      imporveSpeedPrice: 20,
    },
    territory: {
      improveRepositoryPrice: 10,
      maxRepositoryVolume: 989184000,
      improveFairPrice: 4177822480,
      improveTerritoryPrice: 626678248,
      regeneration: 54,
      cooldown: 0,
    },
    exchange: 6451200,
  },
];

export default cowPartSettings;