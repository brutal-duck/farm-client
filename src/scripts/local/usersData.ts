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
    collector: false,
    herdBoost: false,
    feedBoost: false,
    eventTutorial: 0
  },
  takenReward: false,
  status: '',
  statuses: [], 
  starterpack: false
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
  diamondAnimalAd: true,
  takenHerdBoost: 0,
  feedBoostTime: 0
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
  diamondAnimalAd: true,
  takenHerdBoost: 0,
  feedBoostTime: 0
}

export {
  userData,
  userSheep,
  userChicken
}
