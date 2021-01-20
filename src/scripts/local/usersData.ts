let userData: Iuser = {
  diamonds: 3,
  id: 'local',
  xp: 0,
  hash: 'local',
  login: '',
  counter: 0,
  mail: '',
  level: 1,
  additionalTutorial: {
    balance: false,
    cave: false,
    collector: false
  },
  takenReward: false,
  takenHerdBoostChicken: 0,
  takenHerdBoostSheep: 0
}

let userSheep: IuserSheep = {
  money: 1000,
  fair: 1,
  part: 1,
  countSheep: 0,
  collector: 0,
  collectorLevel: 1,
  collectorTakenTime: 0,
  diamondAnimalTime: 0,
  tutorial: 0,
  autosaveCounter: 0,
  diamondAnimalAd: true
}

let userChicken: IuserChicken = {
  money: 1000,
  fair: 1,
  part: 1,
  countChicken: 0,
  collector: 0,
  collectorLevel: 1,
  collectorTakenTime: 0,
  diamondAnimalTime: 0,
  tutorial: 0,
  autosaveCounter: 0,
  diamondAnimalAd: true
}

export {
  userData,
  userSheep,
  userChicken
}
