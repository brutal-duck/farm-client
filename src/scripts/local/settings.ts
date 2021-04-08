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
    { breed: 1, drinking: 2, eating: 10, milk: 100, milkPrice: 100 },
    { breed: 2, drinking: 2, eating: 11, milk: 100, milkPrice: 200 },
    { breed: 3, drinking: 3, eating: 12, milk: 100, milkPrice: 400 },
    { breed: 4, drinking: 3, eating: 13, milk: 100, milkPrice: 800 },
    { breed: 5, drinking: 3, eating: 14, milk: 100, milkPrice: 1600 },
    { breed: 6, drinking: 3, eating: 15, milk: 100, milkPrice: 3200 },
    { breed: 7, drinking: 4, eating: 17, milk: 100, milkPrice: 6400 },
    { breed: 8, drinking: 4, eating: 19, milk: 100, milkPrice: 12800 },
    { breed: 9, drinking: 5, eating: 21, milk: 100, milkPrice: 25600 },
    { breed: 10, drinking: 5, eating: 23, milk: 100, milkPrice: 51200 },
    { breed: 11, drinking: 6, eating: 25, milk: 100, milkPrice: 102400 },
    { breed: 12, drinking: 7, eating: 28, milk: 100, milkPrice: 204800 }
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
    { improve: 1, regeneration: 11, countMilk: 5, unlock_improve: 1, milkStorage: 200 },
    { improve: 2, regeneration: 22, countMilk: 5, unlock_improve: 2, milkStorage: 700 },
    { improve: 3, regeneration: 33, countMilk: 5, unlock_improve: 5, milkStorage: 1500 },
    { improve: 4, regeneration: 44, countMilk: 5, unlock_improve: 8, milkStorage: 4000 }
  ]
}


export {
  general,
  sheepSettings,
  chickenSettings,
  cowSettings
}
