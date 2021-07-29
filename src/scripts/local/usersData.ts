
let userData: Iuser = {
  avatar: '',
  diamonds: 3,
  id: 'local',
  clanId: '',
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
  starterpack: false,
  boosts: {
    sheep: {
      collector4: 0,
      collector12: 0,
      herd: 0,
      feed: 0,
    },
    chicken: {
      collector4: 0,
      collector12: 0,
      herd: 0,
      feed: 0,
    },
    cow: {
      collector4: 0,
      collector12: 0,
      herd: 0,
      feed: 0,
      factory: 0,
    },
    fortune: 0,
  },
  test: 'A',
  takenFreeDiamonds: false,
  takenSocialAward: false,
  messages: [],
  personalMessages: [],
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

let userCow: IuserCow = {
  money: 1000,
  fair: 1,
  part: 1,
  countCow: 0,
  collector: 0,
  collectorLevel: 1,
  collectorTakenTime: 0,
  diamondAnimalTime: 0,
  tutorial: 0,
  autosaveCounter: 0,
  diamondAnimalAd: true,
  takenHerdBoost: 0,
  feedBoostTime: 0,
  factory: {
    currentProduction: 0,
    productionTimer: 0,
    money: 0,
    production1Money: 0,
    production2Money: 0,
    production3Money: 0,
    production4Money: 0,
    boostTime: 0,
  }
}

export {
  userData,
  userSheep,
  userChicken,
  userCow
}
