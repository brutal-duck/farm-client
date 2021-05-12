let general: { autoSaveSpeed: number, maxMerginTime: number, boostSpeedAnimal: number, boostTime: number, boostPrice: number, packages: Ipackage[] } = {
  autoSaveSpeed: 15,
  maxMerginTime: 30,
  boostSpeedAnimal: 100,
  boostTime: 30,
  boostPrice: 20,
  packages: [
    { bonus: 25, diamonds: 225, id: 1, price: 75, voices: 11, stock: 10, top: false },
    { bonus: 150, diamonds: 600, id: 2, price: 200, voices: 29, stock: 20, top: false },
    { bonus: 500, diamonds: 1500, id: 3, price: 500, voices: 72, stock: 25, top: true },
    { bonus: 2600, diamonds: 4900, id: 4, price: 1500, voices: 215, stock: 40, top: false }
  ]
}

let sheepSettings: IsheepSettings = {
  buyBetterBreedSheep: 2,
  feedBoostPrice: 35,
  sheepBadPercent: 30,
  sheepDiamondsTime: 10800,
  sheepPrice: 100,
  doubledСollectorPrice: 25,
  collectorPrice4: 85,
  collectorPrice12: 220,
  unlockCollector4: 5,
  unlockCollector12: 8,
  sheepFairLevels: [
    { level: 1, price_m: 0, price_d: 0, part_unlock: 1 },
    { level: 2, price_m: 5000, price_d: 0, part_unlock: 2 },
    { level: 3, price_m: 25000, price_d: 0, part_unlock: 4 },
    { level: 4, price_m: 150000, price_d: 0, part_unlock: 7 },
    { level: 5, price_m: 800000, price_d: 0, part_unlock: 9 },
    { level: 6, price_m: 4000000, price_d: 0, part_unlock: 10 },
    { level: 7, price_m: 12000000, price_d: 0, part_unlock: 11 },
    { level: 8, price_m: 27600000, price_d: 0, part_unlock: 12 },
    { level: 9, price_m: 62400000, price_d: 0, part_unlock: 13 },
    { level: 10, price_m: 140000000, price_d: 0, part_unlock: 14 },
    { level: 11, price_m: 309000000, price_d: 0, part_unlock: 15 },
    { level: 12, price_m: 680000000, price_d: 0, part_unlock: 16 }
  ],
  sheepParts: [
    { sort: 1, award: 10, improve_territory_2: 1000, improve_territory_3: 3000, improve_territory_4: 6000, collector: 3, exchange: 1000 },
    { sort: 2, award: 10, improve_territory_2: 7000, improve_territory_3: 13000, improve_territory_4: 26000, collector: 3, exchange: 1900 },
    { sort: 3, award: 10, improve_territory_2: 17000, improve_territory_3: 33500, improve_territory_4: 66500, collector: 10, exchange: 3700 },
    { sort: 4, award: 10, improve_territory_2: 27000, improve_territory_3: 54000, improve_territory_4: 107000, collector: 15, exchange: 7200 },
    { sort: 5, award: 10, improve_territory_2: 126000, improve_territory_3: 253000, improve_territory_4: 506000, collector: 15, exchange: 14000 },
    { sort: 6, award: 10, improve_territory_2: 495000, improve_territory_3: 989000, improve_territory_4: 1979000, collector: 15, exchange: 27000 },
    { sort: 7, award: 10, improve_territory_2: 1051500, improve_territory_3: 2102500, improve_territory_4: 4205500, collector: 20, exchange: 51000 },
    { sort: 8, award: 10, improve_territory_2: 1608000, improve_territory_3: 3216000, improve_territory_4: 6432000, collector: 25, exchange: 96000 },
    { sort: 9, award: 10, improve_territory_2: 4082000, improve_territory_3: 8163000, improve_territory_4: 16327000, collector: 25, exchange: 180000 },
    { sort: 10, award: 10, improve_territory_2: 10177000, improve_territory_3: 20354000, improve_territory_4: 40708000, collector: 25, exchange: 330000 },
    { sort: 11, award: 10, improve_territory_2: 17600000, improve_territory_3: 35200500, improve_territory_4: 70401000, collector: 25, exchange: 600000 },
    { sort: 12, award: 10, improve_territory_2: 25023000, improve_territory_3: 50047000, improve_territory_4: 100094000, collector: 25, exchange: 1075200 },
    { sort: 13, award: 10, improve_territory_2: 60846000, improve_territory_3: 121693000, improve_territory_4: 243385000, collector: 25, exchange: 1900000 },
    { sort: 14, award: 10, improve_territory_2: 146611000, improve_territory_3: 293222000, improve_territory_4: 586443000, collector: 30, exchange: 3350000 },
    { sort: 15, award: 10, improve_territory_2: 248601000, improve_territory_3: 497202000, improve_territory_4: 994403500, collector: 30, exchange: 6000000 },
    { sort: 16, award: 10, improve_territory_2: 350591000, improve_territory_3: 701182000, improve_territory_4: 1402364000, collector: 30, exchange: 12000000 }
  ],
  sheepSettings: [
    { breed: 1, long_wool: 100, wool_growth: 250, eating: 10, drinking: 2 },
    { breed: 2, long_wool: 200, wool_growth: 150, eating: 11, drinking: 2 },
    { breed: 3, long_wool: 400, wool_growth: 100, eating: 12, drinking: 3 },
    { breed: 4, long_wool: 800, wool_growth: 100, eating: 13, drinking: 3 },
    { breed: 5, long_wool: 1600, wool_growth: 100, eating: 14, drinking: 3 },
    { breed: 6, long_wool: 3200, wool_growth: 100, eating: 15, drinking: 3 },
    { breed: 7, long_wool: 6400, wool_growth: 100, eating: 17, drinking: 4 },
    { breed: 8, long_wool: 12800, wool_growth: 100, eating: 19, drinking: 4 },
    { breed: 9, long_wool: 25600, wool_growth: 100, eating: 21, drinking: 5 },
    { breed: 10, long_wool: 51200, wool_growth: 100, eating: 23, drinking: 5 },
    { breed: 11, long_wool: 102400, wool_growth: 100, eating: 25, drinking: 6 },
    { breed: 12, long_wool: 204800, wool_growth: 100, eating: 28, drinking: 7 }
  ],
  territoriesSheepPrice: [
    { block :1, position: 1, price: 0, unlock: 1 },
    { block :1, position: 2, price: 0, unlock: 1 },
    { block :1, position: 3, price: 0, unlock: 1 },
    { block :2, position: 1, price: 1667, unlock: 2 },
    { block :2, position: 2, price: 0, unlock: 1 },
    { block :2, position: 3, price: 0, unlock: 1 },
    { block :3, position: 1, price: 36000, unlock: 4 },
    { block :3, position: 2, price: 24000, unlock: 3 },
    { block :3, position: 3, price: 2000, unlock: 2 },
    { block :4, position: 1, price: 407000, unlock: 7 },
    { block :4, position: 2, price: 132000, unlock: 6 },
    { block :4, position: 3, price: 132000, unlock: 5 },
    { block :5, position: 1, price: 3092000, unlock: 10 },
    { block :5, position: 2, price: 1150000, unlock: 9 },
    { block :5, position: 3, price: 1150000, unlock: 8 },
    { block :6, position: 1, price: 50885000, unlock: 13 },
    { block :6, position: 2, price: 20408000, unlock: 12 },
    { block :6, position: 3, price: 20408000, unlock: 11 },
    { block :7, position: 1, price: 304232000, unlock: 15 },
    { block :7, position: 2, price: 304232000, unlock: 14 },
    { block :7, position: 3, price: 125117000, unlock: 13 },
    { block :8, position: 1, price: 1752955000, unlock: 16 },
    { block :8, position: 2, price: 1752955000, unlock: 16 },
    { block :8, position: 3, price: 733054000, unlock: 16 }
  ],
  territoriesSheepSettings: [
    { improve: 1, regeneration: 11, unlock_improve: 1, woolStorage: 200 },
    { improve: 2, regeneration: 22, unlock_improve: 2, woolStorage: 700 },
    { improve: 3, regeneration: 33, unlock_improve: 5, woolStorage: 1500 },
    { improve: 4, regeneration: 44, unlock_improve: 8, woolStorage: 4000 }
  ]
}

let chickenSettings: IchickenSettings = {
  buyBetterBreedChicken: 2,
  feedBoostPrice: 35,
  chickenBadPercent: 40,
  chickenDiamondsTime: 10800,
  chickenPrice: 100,
  doubledСollectorPrice: 25,
  collectorPrice4: 85,
  collectorPrice12: 220,
  unlockCollector4: 5,
  unlockCollector12: 8,
  chickenFairLevels: [
    { level: 1, price_m: 0, price_d: 0, part_unlock: 1 },
    { level: 2, price_m: 5000, price_d: 0, part_unlock: 2 },
    { level: 3, price_m: 25000, price_d: 0, part_unlock: 4 },
    { level: 4, price_m: 150000, price_d: 0, part_unlock: 7 },
    { level: 5, price_m: 800000, price_d: 0, part_unlock: 9 },
    { level: 6, price_m: 4000000, price_d: 0, part_unlock: 10 },
    { level: 7, price_m: 12000000, price_d: 0, part_unlock: 11 },
    { level: 8, price_m: 27600000, price_d: 0, part_unlock: 12 },
    { level: 9, price_m: 62400000, price_d: 0, part_unlock: 13 },
    { level: 10, price_m: 140000000, price_d: 0, part_unlock: 14 },
    { level: 11, price_m: 309000000, price_d: 0, part_unlock: 15 },
    { level: 12, price_m: 680000000, price_d: 0, part_unlock: 16 }
  ],
  chickenParts: [
    { sort: 1, award: 10, improve_territory_2: 1000, improve_territory_3: 3000, improve_territory_4: 6000, collector: 10, exchange: 1000 },
    { sort: 2, award: 10, improve_territory_2: 7000, improve_territory_3: 13000, improve_territory_4: 26000, collector: 10, exchange: 1900} ,
    { sort: 3, award: 10, improve_territory_2: 17000, improve_territory_3: 33500, improve_territory_4: 66500, collector: 10, exchange: 3700 },
    { sort: 4, award: 10, improve_territory_2: 27000, improve_territory_3: 54000, improve_territory_4: 107000, collector: 15, exchange: 7200 },
    { sort: 5, award: 10, improve_territory_2: 126000, improve_territory_3: 253000, improve_territory_4: 506000, collector: 15, exchange: 14000 },
    { sort: 6, award: 10, improve_territory_2: 495000, improve_territory_3: 989000, improve_territory_4: 1979000, collector: 15, exchange: 27000 },
    { sort: 7, award: 10, improve_territory_2: 1051500, improve_territory_3: 2102500, improve_territory_4: 4205500, collector: 20, exchange: 51000 },
    { sort: 8, award: 10, improve_territory_2: 1608000, improve_territory_3: 3216000, improve_territory_4: 6432000, collector: 25, exchange: 96000 },
    { sort: 9, award: 10, improve_territory_2: 4082000, improve_territory_3: 8163000, improve_territory_4: 16327000, collector: 25, exchange: 180000 },
    { sort: 10, award: 10, improve_territory_2: 10177000, improve_territory_3: 20354000, improve_territory_4: 40708000, collector: 25, exchange: 330000 },
    { sort: 11, award: 10, improve_territory_2: 17600000, improve_territory_3: 35200500, improve_territory_4: 70401000, collector: 25, exchange: 600000 },
    { sort: 12, award: 10, improve_territory_2: 25023000, improve_territory_3: 50047000, improve_territory_4: 100094000, collector: 25, exchange: 1075200 },
    { sort: 13, award: 10, improve_territory_2: 60846000, improve_territory_3: 121693000, improve_territory_4: 243385000, collector: 25, exchange: 1900000 },
    { sort: 14, award: 10, improve_territory_2: 146611000, improve_territory_3: 293222000, improve_territory_4: 586443000, collector: 30, exchange: 3350000 },
    { sort: 15, award: 10, improve_territory_2: 248601000, improve_territory_3: 497202000, improve_territory_4: 994403500, collector: 30, exchange: 6000000 },
    { sort: 16, award: 10, improve_territory_2: 350591000, improve_territory_3: 701182000, improve_territory_4: 1402364000, collector: 30, exchange: 12000000 }
  ],
  chickenSettings: [
    { breed: 1, drinking: 2, eating: 10, egg: 100, eggPrice: 100 },
    { breed: 2, drinking: 2, eating: 11, egg: 100, eggPrice: 200 },
    { breed: 3, drinking: 3, eating: 12, egg: 100, eggPrice: 400 },
    { breed: 4, drinking: 3, eating: 13, egg: 100, eggPrice: 800 },
    { breed: 5, drinking: 3, eating: 14, egg: 100, eggPrice: 1600 },
    { breed: 6, drinking: 3, eating: 15, egg: 100, eggPrice: 3200 },
    { breed: 7, drinking: 4, eating: 17, egg: 100, eggPrice: 6400 },
    { breed: 8, drinking: 4, eating: 19, egg: 100, eggPrice: 12800 },
    { breed: 9, drinking: 5, eating: 21, egg: 100, eggPrice: 25600 },
    { breed: 10, drinking: 5, eating: 23, egg: 100, eggPrice: 51200 },
    { breed: 11, drinking: 6, eating: 25, egg: 100, eggPrice: 102400 },
    { breed: 12, drinking: 7, eating: 28, egg: 100, eggPrice: 204800 }
  ],
  territoriesChickenPrice: [
    { block: 1, position: 1, price: 0, unlock: 1 },
    { block: 1, position: 2, price: 0, unlock: 1 },
    { block: 1, position: 3, price: 0, unlock: 1 },
    { block: 2, position: 1, price: 2000, unlock: 2 },
    { block: 2, position: 2, price: 50, unlock: 1 },
    { block: 2, position: 3, price: 0, unlock: 1 },
    { block: 3, position: 1, price: 36000, unlock: 4 },
    { block: 3, position: 2, price: 24000, unlock: 3 },
    { block: 3, position: 3, price: 2000, unlock: 2 },
    { block: 4, position: 1, price: 407000, unlock: 7 },
    { block: 4, position: 2, price: 132000, unlock: 6 },
    { block: 4, position: 3, price: 132000, unlock: 5 },
    { block: 5, position: 1, price: 3092000, unlock: 10 },
    { block: 5, position: 2, price: 1150000, unlock: 9 },
    { block: 5, position: 3, price: 1150000, unlock: 8 },
    { block: 6, position: 1, price: 50885000, unlock: 13 },
    { block: 6, position: 2, price: 20408000, unlock: 12 },
    { block: 6, position: 3, price: 20408000, unlock: 11 },
    { block: 7, position: 1, price: 304232000, unlock: 15 },
    { block: 7, position: 2, price: 304232000, unlock: 14 },
    { block: 7, position: 3, price: 125117000, unlock: 13 },
    { block: 8, position: 1, price: 1752955000, unlock: 16 },
    { block: 8, position: 2, price: 1752955000, unlock: 16 },
    { block: 8, position: 3, price: 733054000, unlock: 16 }
  ],
  territoriesChickenSettings: [
    { improve: 1, regeneration: 11, countEggs: 5, unlock_improve: 1, eggStorage: 200 },
    { improve: 2, regeneration: 22, countEggs: 5, unlock_improve: 2, eggStorage: 700 },
    { improve: 3, regeneration: 33, countEggs: 5, unlock_improve: 5, eggStorage: 1500 },
    { improve: 4, regeneration: 44, countEggs: 5, unlock_improve: 8, eggStorage: 4000 }
  ]
}

let cowSettings: IcowSettings = {
  buyBetterBreedCow: 2,
  feedBoostPrice: 35,
  cowBadPercent: 40,
  cowDiamondsTime: 10800,
  cowPrice: 100,
  doubledСollectorPrice: 25,
  collectorPrice4: 85,
  collectorPrice12: 220,
  unlockCollector4: 5,
  unlockCollector12: 8,
  cowFactorySettings: [
    { 
      improve: 1,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 0,
      processingTime: 15,
      lotSize: 100,
      clabberPercent: 40,
      pasteurizedMilkPercent: 0,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 20,
    },
    { 
      improve: 2,
      unlock_improve: 1,
      improveMoneyPrice: 40000,
      improveDiamondPrice: 0,
      processingTime: 30,
      lotSize: 400,
      clabberPercent: 40,
      pasteurizedMilkPercent: 30,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 50,
    },
    { 
      improve: 3,
      unlock_improve: 1,
      improveMoneyPrice: 600000,
      improveDiamondPrice: 0,
      processingTime: 30,
      lotSize: 1000,
      clabberPercent: 30,
      pasteurizedMilkPercent: 40,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 55,
    },
    { 
      improve: 4,
      unlock_improve: 1,
      improveMoneyPrice: 1600000,
      improveDiamondPrice: 0,
      processingTime: 30,
      lotSize: 2000,
      clabberPercent: 30,
      pasteurizedMilkPercent: 45,
      cheesePercent: 0,
      chocolatePercent: 100,
      efficiency: 60,
    },
    { 
      improve: 5,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 60,
      processingTime: 60,
      lotSize: 3000,
      clabberPercent: 35,
      pasteurizedMilkPercent: 45,
      cheesePercent: 20,
      chocolatePercent: 100,
      efficiency: 93,
    },
    { 
      improve: 6,
      unlock_improve: 1,
      improveMoneyPrice: 12000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 12000,
      clabberPercent: 35,
      pasteurizedMilkPercent: 45,
      cheesePercent: 20,
      chocolatePercent: 100,
      efficiency: 93,
    },
    { 
      improve: 7,
      unlock_improve: 1,
      improveMoneyPrice: 36000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 25000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 8,
      unlock_improve: 1,
      improveMoneyPrice: 56000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 35000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 9,
      unlock_improve: 1,
      improveMoneyPrice: 160000000,
      improveDiamondPrice: 0,
      processingTime: 60,
      lotSize: 50000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 10,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 240,
      processingTime: 120,
      lotSize: 150000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 43,
      cheesePercent: 32,
      chocolatePercent: 100,
      efficiency: 104,
    },
    { 
      improve: 11,
      unlock_improve: 1,
      improveMoneyPrice: 320000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 300000,
      clabberPercent: 25,
      pasteurizedMilkPercent: 45,
      cheesePercent: 35,
      chocolatePercent: 100,
      efficiency: 108,
    },
    { 
      improve: 12,
      unlock_improve: 1,
      improveMoneyPrice: 560000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 400000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 50,
      cheesePercent: 30,
      chocolatePercent: 100,
      efficiency: 105,
    },
    { 
      improve: 13,
      unlock_improve: 1,
      improveMoneyPrice: 1200000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 600000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 50,
      cheesePercent: 30,
      chocolatePercent: 100,
      efficiency: 105,
    },
    { 
      improve: 14,
      unlock_improve: 1,
      improveMoneyPrice: 1600000000,
      improveDiamondPrice: 0,
      processingTime: 120,
      lotSize: 950000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 50,
      cheesePercent: 30,
      chocolatePercent: 100,
      efficiency: 105,
    },
    { 
      improve: 15,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 540,
      processingTime: 180,
      lotSize: 2000000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 35,
      cheesePercent: 45,
      chocolatePercent: 100,
      efficiency: 113,
    },
    { 
      improve: 16,
      unlock_improve: 1,
      improveMoneyPrice: 2600000000,
      improveDiamondPrice: 0,
      processingTime: 180,
      lotSize: 3500000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 35,
      cheesePercent: 45,
      chocolatePercent: 100,
      efficiency: 113,
    },
    { 
      improve: 17,
      unlock_improve: 1,
      improveMoneyPrice: 4000000000,
      improveDiamondPrice: 0,
      processingTime: 180,
      lotSize: 5000000,
      clabberPercent: 20,
      pasteurizedMilkPercent: 35,
      cheesePercent: 45,
      chocolatePercent: 100,
      efficiency: 113,
    },
    { 
      improve: 18,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 840,
      processingTime: 300,
      lotSize: 9000000,
      clabberPercent: 5,
      pasteurizedMilkPercent: 30,
      cheesePercent: 65,
      chocolatePercent: 100,
      efficiency: 130,
    },
    { 
      improve: 19,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 1080,
      processingTime: 300,
      lotSize: 14000000,
      clabberPercent: 5,
      pasteurizedMilkPercent: 30,
      cheesePercent: 65,
      chocolatePercent: 100,
      efficiency: 130,
    },
    { 
      improve: 20,
      unlock_improve: 1,
      improveMoneyPrice: 0,
      improveDiamondPrice: 1800,
      processingTime: 300,
      lotSize: 30000000,
      clabberPercent: 5,
      pasteurizedMilkPercent: 30,
      cheesePercent: 65,
      chocolatePercent: 100,
      efficiency: 130,
    },
  ],
  cowFairLevels: [
    { level: 1, price_m: 0, price_d: 0, part_unlock: 1 },
    { level: 2, price_m: 5000, price_d: 0, part_unlock: 2 },
    { level: 3, price_m: 25000, price_d: 0, part_unlock: 4 },
    { level: 4, price_m: 150000, price_d: 0, part_unlock: 7 },
    { level: 5, price_m: 800000, price_d: 0, part_unlock: 9 },
    { level: 6, price_m: 4000000, price_d: 0, part_unlock: 10 },
    { level: 7, price_m: 12000000, price_d: 0, part_unlock: 11 },
    { level: 8, price_m: 27600000, price_d: 0, part_unlock: 12 },
    { level: 9, price_m: 62400000, price_d: 0, part_unlock: 13 },
    { level: 10, price_m: 140000000, price_d: 0, part_unlock: 14 },
    { level: 11, price_m: 309000000, price_d: 0, part_unlock: 15 },
    { level: 12, price_m: 680000000, price_d: 0, part_unlock: 16 }
  ],
  cowParts: [
    { sort: 1, award: 10, improve_territory_2: 1000, improve_territory_3: 3000, improve_territory_4: 6000, collector: 10, exchange: 1000 },
    { sort: 2, award: 10, improve_territory_2: 7000, improve_territory_3: 13000, improve_territory_4: 26000, collector: 10, exchange: 1900 },
    { sort: 3, award: 10, improve_territory_2: 17000, improve_territory_3: 33500, improve_territory_4: 66500, collector: 10, exchange: 3700 },
    { sort: 4, award: 10, improve_territory_2: 27000, improve_territory_3: 54000, improve_territory_4: 107000, collector: 15, exchange: 7200 },
    { sort: 5, award: 10, improve_territory_2: 126000, improve_territory_3: 253000, improve_territory_4: 506000, collector: 15, exchange: 14000 },
    { sort: 6, award: 10, improve_territory_2: 495000, improve_territory_3: 989000, improve_territory_4: 1979000, collector: 15, exchange: 27000 },
    { sort: 7, award: 10, improve_territory_2: 1051500, improve_territory_3: 2102500, improve_territory_4: 4205500, collector: 20, exchange: 51000 },
    { sort: 8, award: 10, improve_territory_2: 1608000, improve_territory_3: 3216000, improve_territory_4: 6432000, collector: 25, exchange: 96000 },
    { sort: 9, award: 10, improve_territory_2: 4082000, improve_territory_3: 8163000, improve_territory_4: 16327000, collector: 25, exchange: 180000 },
    { sort: 10, award: 10, improve_territory_2: 10177000, improve_territory_3: 20354000, improve_territory_4: 40708000, collector: 25, exchange: 330000 },
    { sort: 11, award: 10, improve_territory_2: 17600000, improve_territory_3: 35200500, improve_territory_4: 70401000, collector: 25, exchange: 600000 },
    { sort: 12, award: 10, improve_territory_2: 25023000, improve_territory_3: 50047000, improve_territory_4: 100094000, collector: 25, exchange: 1075200 },
    { sort: 13, award: 10, improve_territory_2: 60846000, improve_territory_3: 121693000, improve_territory_4: 243385000, collector: 25, exchange: 1900000 },
    { sort: 14, award: 10, improve_territory_2: 146611000, improve_territory_3: 293222000, improve_territory_4: 586443000, collector: 30, exchange: 3350000 },
    { sort: 15, award: 10, improve_territory_2: 248601000, improve_territory_3: 497202000, improve_territory_4: 994403500, collector: 30, exchange: 6000000 },
    { sort: 16, award: 10, improve_territory_2: 350591000, improve_territory_3: 701182000, improve_territory_4: 1402364000, collector: 30, exchange: 12000000 },
  ],
  cowSettings: [
    { breed: 1, drinking: 2, eating: 10, maxMilkVolume: 100 },
    { breed: 2, drinking: 2, eating: 11, maxMilkVolume: 100 },
    { breed: 3, drinking: 3, eating: 12, maxMilkVolume: 100 },
    { breed: 4, drinking: 3, eating: 13, maxMilkVolume: 100 },
    { breed: 5, drinking: 3, eating: 14, maxMilkVolume: 100 },
    { breed: 6, drinking: 3, eating: 15, maxMilkVolume: 100 },
    { breed: 7, drinking: 4, eating: 17, maxMilkVolume: 100 },
    { breed: 8, drinking: 4, eating: 19, maxMilkVolume: 100 },
    { breed: 9, drinking: 5, eating: 21, maxMilkVolume: 100 },
    { breed: 10, drinking: 5, eating: 23, maxMilkVolume: 100 },
    { breed: 11, drinking: 6, eating: 25, maxMilkVolume: 100 },
    { breed: 12, drinking: 7, eating: 28, maxMilkVolume: 100 }
  ],
  territoriesCowPrice: [
    { block: 1, position: 1, price: 0, unlock: 1 },
    { block: 1, position: 2, price: 0, unlock: 1 },
    { block: 1, position: 3, price: 0, unlock: 1 },
    { block: 2, position: 1, price: 2000, unlock: 2 },
    { block: 2, position: 2, price: 50, unlock: 1 },
    { block: 2, position: 3, price: 0, unlock: 1 },
    { block: 3, position: 1, price: 36000, unlock: 4 },
    { block: 3, position: 2, price: 24000, unlock: 3 },
    { block: 3, position: 3, price: 2000, unlock: 2 },
    { block: 4, position: 1, price: 407000, unlock: 7 },
    { block: 4, position: 2, price: 132000, unlock: 6 },
    { block: 4, position: 3, price: 132000, unlock: 5 },
    { block: 5, position: 1, price: 3092000, unlock: 10 },
    { block: 5, position: 2, price: 1150000, unlock: 9 },
    { block: 5, position: 3, price: 1150000, unlock: 8 },
    { block: 6, position: 1, price: 50885000, unlock: 13 },
    { block: 6, position: 2, price: 20408000, unlock: 12 },
    { block: 6, position: 3, price: 20408000, unlock: 11 },
    { block: 7, position: 1, price: 304232000, unlock: 15 },
    { block: 7, position: 2, price: 304232000, unlock: 14 },
    { block: 7, position: 3, price: 125117000, unlock: 13 },
    { block: 8, position: 1, price: 1752955000, unlock: 16 },
    { block: 8, position: 2, price: 1752955000, unlock: 16 },
    { block: 8, position: 3, price: 733054000, unlock: 16 }
  ],
  territoriesCowSettings: [
    { 
      improve: 1, 
      regeneration: 11, 
      unlock_improve: 1, 
      storage: 5000,   
      improvePastureMoneyPrice: 0,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 2, 
      regeneration: 13, 
      unlock_improve: 2, 
      storage: 30000,   
      improvePastureMoneyPrice: 100,
      improveStorageMoneyPrice: 10000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 3, 
      regeneration: 15, 
      unlock_improve: 2, 
      storage: 100000,   
      improvePastureMoneyPrice: 400,
      improveStorageMoneyPrice: 150000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 4, 
      regeneration: 17, 
      unlock_improve: 2, 
      storage: 230000,   
      improvePastureMoneyPrice: 1500,
      improveStorageMoneyPrice: 400000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 5, 
      regeneration: 19, 
      unlock_improve: 2, 
      storage: 510000,   
      improvePastureMoneyPrice: 5000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 50,
    },
    { 
      improve: 6, 
      regeneration: 22, 
      unlock_improve: 3, 
      storage: 1100000,   
      improvePastureMoneyPrice: 10000,
      improveStorageMoneyPrice: 3000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 7, 
      regeneration: 23, 
      unlock_improve: 3, 
      storage: 2500000,   
      improvePastureMoneyPrice: 23000,
      improveStorageMoneyPrice: 9000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 8, 
      regeneration: 24, 
      unlock_improve: 4, 
      storage: 5000000,   
      improvePastureMoneyPrice: 50000,
      improveStorageMoneyPrice: 14000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 9, 
      regeneration: 25, 
      unlock_improve: 4, 
      storage: 9000000,   
      improvePastureMoneyPrice: 70000,
      improveStorageMoneyPrice: 40000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 10, 
      regeneration: 27, 
      unlock_improve: 5, 
      storage: 14500000,   
      improvePastureMoneyPrice: 100000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 200,
    },
    { 
      improve: 11, 
      regeneration: 29, 
      unlock_improve: 6, 
      storage: 22000000,   
      improvePastureMoneyPrice: 402000,
      improveStorageMoneyPrice: 80000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 12, 
      regeneration: 31, 
      unlock_improve: 6, 
      storage: 35000000,   
      improvePastureMoneyPrice: 1230000,
      improveStorageMoneyPrice: 140000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 13, 
      regeneration: 33, 
      unlock_improve: 7, 
      storage: 50000000,   
      improvePastureMoneyPrice: 1400000,
      improveStorageMoneyPrice: 300000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 14, 
      regeneration: 34, 
      unlock_improve: 7, 
      storage: 80000000,   
      improvePastureMoneyPrice: 1600000,
      improveStorageMoneyPrice: 400000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 15, 
      regeneration: 35, 
      unlock_improve: 8, 
      storage: 110000000,   
      improvePastureMoneyPrice: 1800000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 450,
    },
    { 
      improve: 16, 
      regeneration: 36, 
      unlock_improve: 9, 
      storage: 200000000,   
      improvePastureMoneyPrice: 3600000,
      improveStorageMoneyPrice: 650000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 17, 
      regeneration: 38, 
      unlock_improve: 10, 
      storage: 300000000,   
      improvePastureMoneyPrice: 7200000,
      improveStorageMoneyPrice: 1000000000,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 0,
    },
    { 
      improve: 18, 
      regeneration: 40, 
      unlock_improve: 11, 
      storage: 400000000,   
      improvePastureMoneyPrice: 14400000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 700,
    },
    { 
      improve: 19, 
      regeneration: 42, 
      unlock_improve: 12, 
      storage: 500000000,   
      improvePastureMoneyPrice: 28800000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 900,
    },
    { 
      improve: 20, 
      regeneration: 44, 
      unlock_improve: 13, 
      storage: 1000000000,   
      improvePastureMoneyPrice: 57600000,
      improveStorageMoneyPrice: 0,
      improvePastureDiamondPrice: 0,
      improveStorageDiamondPrice: 1500,
    },
  ]
};

const unicornSettings: IeventSettings = {
  buyBetterBreedAnimal: 2,
  doubledСollectorPrice: 25,
  feedBoostPrice: 40,
  collectorPrice4: 90,
  collectorPrice12: 250,
  unlockCollector4: 5,
  unlockCollector12: 8,
  priceCoefficient: 7,
  unicornSettings: [
    { 
      breed: 1, 
      resource: 100, 
      resourcePrice: '10',
      price: '100',
      exchange: '1000'
    },
    { 
      breed: 2, 
      resource: 100, 
      resourcePrice: '20',
      price: '1500',
      exchange: '2800'
    },
    { 
      breed: 3, 
      resource: 100, 
      resourcePrice: '40',
      price: '4800',
      exchange: '7200'
    },
    { 
      breed: 4, 
      resource: 100, 
      resourcePrice: '90',
      price: '15000',
      exchange: '17600'
    },
    { 
      breed: 5, 
      resource: 100, 
      resourcePrice: '190',
      price: '48000',
      exchange: '41600'
    },
    { 
      breed: 6, 
      resource: 100, 
      resourcePrice: '400',
      price: '150000',
      exchange: '96000'
    },
    { 
      breed: 7, 
      resource: 100, 
      resourcePrice: '850',
      price: '480000',
      exchange: '217600'
    },
    { 
      breed: 8, 
      resource: 100, 
      resourcePrice: '1780',
      price: '1500000',
      exchange: '486600'
    },
    { 
      breed: 9, 
      resource: 100, 
      resourcePrice: '3750',
      price: '4800000',
      exchange: '1075200'
    },
    { 
      breed: 10, 
      resource: 100, 
      resourcePrice: '7900',
      price: '15000000',
      exchange: '2355200'
    },
    { 
      breed: 11, 
      resource: 100, 
      resourcePrice: '16000',
      price: '48000000',
      exchange: '5120000'
    },
    { 
      breed: 12, 
      resource: 100, 
      resourcePrice: '73000',
      price: '480000000',
      exchange: '12000000'
    },
    { 
      breed: 13, 
      resource: 100, 
      resourcePrice: '34000',
      price: '150000000',
      exchange: '24000000'
    },
    { 
      breed: 14, 
      resource: 100, 
      resourcePrice: '150000',
      price: '1500000000',
      exchange: '48000000'
    },
    { 
      breed: 15, 
      resource: 100, 
      resourcePrice: '320000',
      price: '4800000000',
      exchange: '96000000'
    },
    { 
      breed: 16, 
      resource: 100, 
      resourcePrice: '670000',
      price: '15000000000',
      exchange: '192000000'
    },
    { 
      breed: 17, 
      resource: 100, 
      resourcePrice: '1400000',
      price: '48000000000',
      exchange: '384000000'
    },
    { 
      breed: 18, 
      resource: 100, 
      resourcePrice: '2900000',
      price: '150000000000',
      exchange: '768000000'
    },
    { 
      breed: 19, 
      resource: 100, 
      resourcePrice: '6200000',
      price: '480000000000',
      exchange: '1536000000'
    },
    { 
      breed: 20, 
      resource: 100, 
      resourcePrice: '13000000',
      price: '1500000000000',
      exchange: '3072000000'
    },
    { 
      breed: 21, 
      resource: 100, 
      resourcePrice: '25000000',
      price: '4800000000000',
      exchange: '6144000000'
    },
    { 
      breed: 22, 
      resource: 100, 
      resourcePrice: '50200000',
      price: '15000000000000',
      exchange: '12288000000'
    },
    { 
      breed: 23, 
      resource: 100, 
      resourcePrice: '100300000',
      price: '48000000000000',
      exchange: '24576000000'
    },
    { 
      breed: 24, 
      resource: 100, 
      resourcePrice: '200000000',
      price: '150000000000000',
      exchange: '49152000000'
    },
    { 
      breed: 25, 
      resource: 100, 
      resourcePrice: '400000000',
      price: '480000000000000',
      exchange: '98304000000'
    },
    { 
      breed: 26, 
      resource: 100, 
      resourcePrice: '800000000',
      price: '1500000000000000',
      exchange: '196608000000'
    },
    { 
      breed: 27, 
      resource: 100, 
      resourcePrice: '1600000000',
      price: '4800000000000000',
      exchange: '393216000000'
    },
    { 
      breed: 28, 
      resource: 100, 
      resourcePrice: '3200000000', 
      price: '15000000000000000', 
      exchange: '786432000000'
    },
    { 
      breed: 29, 
      resource: 100, 
      resourcePrice: '6400000000',
      price: '48000000000000000',
      exchange: '1572864000000'
    },
    { 
      breed: 30, 
      resource: 100, 
      resourcePrice: '12800000000',
      price: '150000000000000000',
      exchange: '3145728000000'
    },
    { 
      breed: 31, 
      resource: 100, 
      resourcePrice: '25600000000',
      price: '480000000000000000',
      exchange: '6291456000000'
    },
    { 
      breed: 32, 
      resource: 100, 
      resourcePrice: '51200000000',
      price: '1500000000000000000',
      exchange: '12582912000000'
    },
    { 
      breed: 33, 
      resource: 100, 
      resourcePrice: '102400000000',
      price: '4800000000000000000',
      exchange: '25165824000000'
    },
    { 
      breed: 34, 
      resource: 100, 
      resourcePrice: '204800000000',
      price: '15000000000000000000',
      exchange: '50331648000000'
    },
    { 
      breed: 35, 
      resource: 100, 
      resourcePrice: '409600000000',
      price: '48000000000000000000',
      exchange: '100663296000000'
    },
    { 
      breed: 36, 
      resource: 100, 
      resourcePrice: '819200000000',
      price: '150000000000000000000',
      exchange: '201326592000000'
    },
    { 
      breed: 37, 
      resource: 100, 
      resourcePrice: '1638400000000',
      price: '480000000000000000000',
      exchange: '402653184000000'
    },
    { 
      breed: 38, 
      resource: 100, 
      resourcePrice: '3276800000000',
      price: '1500000000000000000000',
      exchange: '805306368000000'
    },
    { 
      breed: 39, 
      resource: 100, 
      resourcePrice: '6553600000000',
      price: '4800000000000000000000',
      exchange: '1610612736000000'
    },
    { 
      breed: 40, 
      resource: 100, 
      resourcePrice: '13107200000000',
      price: '15000000000000000000000',
      exchange: '3221225472000000'
    },
    { 
      breed: 41, 
      resource: 100, 
      resourcePrice: '26214400000000',
      price: '48000000000000000000000',
      exchange: '6442450944000000'
    },
    { 
      breed: 42, 
      resource: 100, 
      resourcePrice: '52428800000000',
      price: '150000000000000000000000',
      exchange: '12884901888000000'
    },
    { 
      breed: 43, 
      resource: 100, 
      resourcePrice: '104857600000000',
      price: '480000000000000000000000',
      exchange: '25769803776000000'
    },
    { 
      breed: 44, 
      resource: 100, 
      resourcePrice: '209715200000000',
      price: '1500000000000000000000000',
      exchange: '51539607552000000'
    },
    { 
      breed: 45, 
      resource: 100, 
      resourcePrice: '419430400000000',
      price: '4800000000000000000000000',
      exchange: '103079215104000000'
    },
    { 
      breed: 46, 
      resource: 100, 
      resourcePrice: '838860800000000',
      price: '15000000000000000000000000',
      exchange: '206158430208000000'
    },
    { 
      breed: 47, 
      resource: 100, 
      resourcePrice: '1677721600000000',
      price: '48000000000000000000000000',
      exchange: '412316860416000000'
    },
    { 
      breed: 48, 
      resource: 100, 
      resourcePrice: '3355443200000000',
      price: '150000000000000000000000000',
      exchange: '824633720832000000'
    },
    { 
      breed: 49, 
      resource: 100, 
      resourcePrice: '6710886400000000',
      price: '480000000000000000000000000',
      exchange: '1649267441664000000'
    },
    { 
      breed: 50, 
      resource: 100, 
      resourcePrice: '13421772800000000',
      price: '1500000000000000000000000000',
      exchange: '3298534883328000000'
    },
    { 
      breed: 51, 
      resource: 100, 
      resourcePrice: '26843545600000000',
      price: '4800000000000000000000000000',
      exchange: '6597069766656000000'
    },
    { 
      breed: 52, 
      resource: 100, 
      resourcePrice: '53687091200000000', 
      price: '15000000000000000000000000000', 
      exchange: '13194139533312000000'
    },
    { 
      breed: 53, 
      resource: 100, 
      resourcePrice: '107374182400000000', 
      price: '48000000000000000000000000000', 
      exchange: '26388279066624000000'
    },
    { 
      breed: 54, 
      resource: 100, 
      resourcePrice: '214748364800000000', 
      price: '150000000000000000000000000000', 
      exchange: '52776558133248000000'
    },
    { 
      breed: 55, 
      resource: 100, 
      resourcePrice: '429496729600000000', 
      price: '480000000000000000000000000000', 
      exchange: '105553116266496000000'
    },
    { 
      breed: 56, 
      resource: 100, 
      resourcePrice: '858993459200000000', 
      price: '1500000000000000000000000000000', 
      exchange: '211106232532992000000'
    },
    { 
      breed: 57, 
      resource: 100, 
      resourcePrice: '1717986918400000000', 
      price: '4800000000000000000000000000000', 
      exchange: '422212465065984000000'
    },
    { 
      breed: 58, 
      resource: 100, 
      resourcePrice: '3435973836800000000', 
      price: '15000000000000000000000000000000', 
      exchange: '844424930131968000000'
    },
    { 
      breed: 59, 
      resource: 100, 
      resourcePrice: '6871947673600000000', 
      price: '48000000000000000000000000000000', 
      exchange: '1688849860263940000000'
    },
    { 
      breed: 60, 
      resource: 100, 
      resourcePrice: '13743895347200000000', 
      price: '150000000000000000000000000000000', 
      exchange: '3377699720527870000000'
    },
    { 
      breed: 61, 
      resource: 100, 
      resourcePrice: '27487790694400000000', 
      price: '4800000000000000000000000000000000', 
      exchange: '6755399441055740000000'
    },
    { 
      breed: 62, 
      resource: 100, 
      resourcePrice: '5497558138880000000', 
      price: '15000000000000000000000000000000000', 
      exchange: '13510798882111500000000'
    },
    { 
      breed: 63, 
      resource: 100, 
      resourcePrice: '10995116277760000000', 
      price: '48000000000000000000000000000000000', 
      exchange: '27021597764223000000000'
    },
    { 
      breed: 64, 
      resource: 100, 
      resourcePrice: '21990232555520000000', 
      price: '150000000000000000000000000000000000', 
      exchange: '54043195528446000000000'
    },
    { 
      breed: 65, 
      resource: 100, 
      resourcePrice: '43980465111040000000', 
      price: '480000000000000000000000000000000000',
      exchange: '108086391056892000000000'
    },
    { 
      breed: 66, 
      resource: 100, 
      resourcePrice: '87960930222080000000', 
      price: '1500000000000000000000000000000000000', 
      exchange: '216172782113784000000000'
    },
    { 
      breed: 67, 
      resource: 100, 
      resourcePrice: '175921860444160000000', 
      price: '4800000000000000000000000000000000000', 
      exchange: '432345564227568000000000'
    },
    { 
      breed: 68, 
      resource: 100, 
      resourcePrice: '351843720888320000000', 
      price: '15000000000000000000000000000000000000', 
      exchange: '864691128455135000000000'
    },
    { 
      breed: 69, 
      resource: 100, 
      resourcePrice: '703687441776640000000', 
      price: '48000000000000000000000000000000000000', 
      exchange: '1729382256910270000000000'
    },
    { 
      breed: 70, 
      resource: 100, 
      resourcePrice: '1407374883553280000000', 
      price: '150000000000000000000000000000000000000', 
      exchange: '3458764513820540000000000'
    },
    { 
      breed: 71, 
      resource: 100, 
      resourcePrice: '28147497671065600000000', 
      price: '480000000000000000000000000000000000000', 
      exchange: '6917529027641080000000000'
    },
    { 
      breed: 72, 
      resource: 100, 
      resourcePrice: '56294995342131200000000',
      price: '1500000000000000000000000000000000000000',
      exchange: '13835058055282200000000000'
    },
    { 
      breed: 73, 
      resource: 100, 
      resourcePrice: '112589990684262000000000',
      price: '4800000000000000000000000000000000000000',
      exchange: '27670116110564300000000000'
    },
    { 
      breed: 74, 
      resource: 100, 
      resourcePrice: '225179981368525000000000',
      price: '15000000000000000000000000000000000000000',
      exchange: '55340232221128700000000000'
    },
    { 
      breed: 75, 
      resource: 100, 
      resourcePrice: '450359962737050000000000',
      price: '48000000000000000000000000000000000000000',
      exchange: '110680464442257000000000000'
    },
    { 
      breed: 76, 
      resource: 100, 
      resourcePrice: '900719925474099000000000',
      price: '150000000000000000000000000000000000000000',
      exchange: '221360928884515000000000000'
    },
    { 
      breed: 77, 
      resource: 100, 
      resourcePrice: '1801439850948200000000000',
      price: '480000000000000000000000000000000000000000',
      exchange: '442721857769029000000000000'
    },
    { 
      breed: 78, 
      resource: 100, 
      resourcePrice: '3602879701896400000000000',
      price: '1500000000000000000000000000000000000000000',
      exchange: '885443715538059000000000000'
    },
    { 
      breed: 79, 
      resource: 100, 
      resourcePrice: '7205759403792790000000000',
      price: '4800000000000000000000000000000000000000000',
      exchange: '1770887431076120000000000000'
    },
    { 
      breed: 80, 
      resource: 100, 
      resourcePrice: '14411518807585600000000000',
      price: '15000000000000000000000000000000000000000000',
      exchange: '3541774862152230000000000000'
    },
    { 
      breed: 81, 
      resource: 100, 
      resourcePrice: '2882303761517120000000000',
      price: '48000000000000000000000000000000000000000000',
      exchange: '6917529027641080000000000'
    },
    { 
      breed: 82, 
      resource: 100, 
      resourcePrice: '5764607523034240000000000',
      price: '150000000000000000000000000000000000000000000',
      exchange: '13835058055282200000000000'
    },
    { 
      breed: 83, 
      resource: 100, 
      resourcePrice: '11529215046068500000000000',
      price: '480000000000000000000000000000000000000000000',
      exchange: '27670116110564300000000000'
    },
    { 
      breed: 84, 
      resource: 100, 
      resourcePrice: '23058430092136900000000000',
      price: '1500000000000000000000000000000000000000000000',
      exchange: '55340232221128700000000000'
    },
    { 
      breed: 85, 
      resource: 100, 
      resourcePrice: '46116860184273900000000000',
      price: '4800000000000000000000000000000000000000000000',
      exchange: '110680464442257000000000000'
    },
    { 
      breed: 86, 
      resource: 100, 
      resourcePrice: '92233720368547800000000000',
      price: '15000000000000000000000000000000000000000000000',
      exchange: '221360928884515000000000000'
    },
    { 
      breed: 87, 
      resource: 100, 
      resourcePrice: '184467440737096000000000000',
      price: '48000000000000000000000000000000000000000000000',
      exchange: '442721857769029000000000000'
    },
    { 
      breed: 88, 
      resource: 100, 
      resourcePrice: '368934881474191000000000000',
      price: '150000000000000000000000000000000000000000000000',
      exchange: '885443715538059000000000000'
    },
    { 
      breed: 89, 
      resource: 100, 
      resourcePrice: '737869762948382000000000000',
      price: '480000000000000000000000000000000000000000000000',
      exchange: '1770887431076120000000000000'
    },
    { 
      breed: 90, 
      resource: 100, 
      resourcePrice: '1475739525896760000000000000',
      price: '1500000000000000000000000000000000000000000000000',
      exchange: '3541774862152230000000000000'
    },
    { 
      breed: 91, 
      resource: 100, 
      resourcePrice: '2951479051793530000000000000',
      price: '4800000000000000000000000000000000000000000000000',
      exchange: '7253554917687780000000000000000'
    },
    { 
      breed: 92, 
      resource: 100, 
      resourcePrice: '5902958103587060000000000000',
      price: '15000000000000000000000000000000000000000000000000',
      exchange: '14507109835375600000000000000000'
    },
    { 
      breed: 93, 
      resource: 100, 
      resourcePrice: '11805916207174100000000000000',
      price: '48000000000000000000000000000000000000000000000000',
      exchange: '29014219670751100000000000000000'
    },
    { 
      breed: 94, 
      resource: 100, 
      resourcePrice: '23611832414348200000000000000',
      price: '150000000000000000000000000000000000000000000000000',
      exchange: '58028439341502200000000000000000'
    },
    { 
      breed: 95, 
      resource: 100, 
      resourcePrice: '47223664828696500000000000000',
      price: '480000000000000000000000000000000000000000000000000',
      exchange: '116056878683004000000000000000000'
    },
    { 
      breed: 96, 
      resource: 100, 
      resourcePrice: '94447329657392900000000000000', 
      price: '1500000000000000000000000000000000000000000000000000', 
      exchange: '232113757366009000000000000000000'
    },
    { 
      breed: 97, 
      resource: 100, 
      resourcePrice: '188894659314786000000000000000', 
      price: '4800000000000000000000000000000000000000000000000000', 
      exchange: '464227514732018000000000000000000'
    },
    { 
      breed: 98, 
      resource: 100, 
      resourcePrice: '377789318629572000000000000000', 
      price: '15000000000000000000000000000000000000000000000000000', 
      exchange: '928455029464035000000000000000000'
    },
    { 
      breed: 99, 
      resource: 100, 
      resourcePrice: '755578637259143000000000000000', 
      price: '48000000000000000000000000000000000000000000000000000', 
      exchange: '1856910058928070000000000000000000'
    },
    { 
      breed: 100, 
      resource: 100, 
      resourcePrice: '1511157274518290000000000000000', 
      price: '150000000000000000000000000000000000000000000000000000', 
      exchange: '3713820117856140000000000000000000'
    },
  ],
  territoriesUnicornPrice: [
    { block: 3, position: 1, diamond: 0, price: 0, unlock: 0 },
    { block: 3, position: 2, diamond: 0, price: 0, unlock: 0 },
    { block: 3, position: 3, diamond: 0, price: 0, unlock: 0 },
    { block: 4, position: 1, diamond: 0, price: 0, unlock: 0 },
    { block: 4, position: 2, diamond: 10, price: 1500, unlock: 2 },
    { block: 4, position: 3, diamond: 10, price: 5000, unlock: 4 },
    { block: 5, position: 1, diamond: 20, price: 10000, unlock: 6 },
    { block: 5, position: 2, diamond: 40, price: 20000, unlock: 8 },
    { block: 5, position: 3, diamond: 100, price: 50000, unlock: 10 },
    { block: 6, position: 1, diamond: 180, price: 90000, unlock: 12 },
    { block: 6, position: 2, diamond: 300, price: 150000, unlock: 14 },
    { block: 6, position: 3, diamond: 400, price: 200000, unlock: 16 },
  ],
  territoriesUnicornSettings: [
    { improve: 1, regeneration: 11, countResources: 5, unlock_improve: 1, resourceStorage: 200 },
    { improve: 2, regeneration: 22, countResources: 5, unlock_improve: 2, resourceStorage: 700 },
    { improve: 3, regeneration: 33, countResources: 5, unlock_improve: 5, resourceStorage: 1500 },
    { improve: 4, regeneration: 44, countResources: 5, unlock_improve: 8, resourceStorage: 4000 }
  ]
}


export {
  general,
  sheepSettings,
  chickenSettings,
  cowSettings,
  unicornSettings
}
