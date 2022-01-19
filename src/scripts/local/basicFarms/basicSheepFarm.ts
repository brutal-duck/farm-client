const basicSheepFarm = [
  { animalCount: 0, animalBreed: 0, fairLevel: 1, territoryCount: 3 + 3 }, // 1
  { animalCount: 1, animalBreed: 2, fairLevel: 1, territoryCount: 3 + 3 }, // 2
  { animalCount: 2, animalBreed: 2, fairLevel: 1, territoryCount: 4 + 3 }, // 3
  { animalCount: 2, animalBreed: 3, fairLevel: 2, territoryCount: 5 + 3 }, // 4
  { animalCount: 4, animalBreed: 4, fairLevel: 3, territoryCount: 6 + 3 }, // 5 туториал на переполох
  { animalCount: 4, animalBreed: 5, fairLevel: 4, territoryCount: 7 + 3 }, // 6 туториал на комбикорм
  { animalCount: 4, animalBreed: 6, fairLevel: 5, territoryCount: 8 + 3 }, // 7 туториал на клан
  { animalCount: 6, animalBreed: 6, fairLevel: 5, territoryCount: 9 + 3 }, // 8 туториал на колесо
  { animalCount: 4, animalBreed: 7, fairLevel: 6, territoryCount: 10 + 3 }, // 9 
  { animalCount: 6, animalBreed: 7, fairLevel: 6, territoryCount: 11 + 3 }, // 10 
  { animalCount: 4, animalBreed: 8, fairLevel: 7, territoryCount: 12 + 3 }, // 11
  { animalCount: 6, animalBreed: 8, fairLevel: 7, territoryCount: 13 + 3 }, // 12
  { animalCount: 4, animalBreed: 9, fairLevel: 8, territoryCount: 14 + 3 }, // 13
  { animalCount: 6, animalBreed: 9, fairLevel: 8, territoryCount: 15 + 3 }, // 14
  { animalCount: 4, animalBreed: 10, fairLevel: 9, territoryCount: 16 + 3 }, // 15
  { animalCount: 6, animalBreed: 10, fairLevel: 9, territoryCount: 17 + 3 }, // 16
  { animalCount: 4, animalBreed: 11, fairLevel: 10, territoryCount: 18 + 3 }, // 17
  { animalCount: 6, animalBreed: 11, fairLevel: 10, territoryCount: 19 + 3 }, // 18
  { animalCount: 4, animalBreed: 12, fairLevel: 11, territoryCount: 20 + 3 }, // 19
  { animalCount: 6, animalBreed: 12, fairLevel: 11, territoryCount: 21 + 3 }, // 20
];

const fullTerritories = [
  { _id: 'local_11', block: 1, position: 1, type: 7, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_12', block: 1, position: 2, type: 6, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_13', block: 1, position: 3, type: 4, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_21', block: 2, position: 1, type: 5, volume: 0, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_22', block: 2, position: 2, type: 3, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_23', block: 2, position: 3, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_31', block: 3, position: 1, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_32', block: 3, position: 2, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_33', block: 3, position: 3, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_41', block: 4, position: 1, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_42', block: 4, position: 2, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_43', block: 4, position: 3, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_51', block: 5, position: 1, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_52', block: 5, position: 2, type: 3, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_53', block: 5, position: 3, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_61', block: 6, position: 1, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_62', block: 6, position: 2, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_63', block: 6, position: 3, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_71', block: 7, position: 1, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_72', block: 7, position: 2, type: 5, volume: 0, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_73', block: 7, position: 3, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_81', block: 8, position: 1, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_82', block: 8, position: 2, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, },
  { _id: 'local_83', block: 8, position: 3, type: 2, volume: 1000, improve: 1, money: 0, cooldown: 0, boughtType: 0, }
];

export { basicSheepFarm, fullTerritories };
