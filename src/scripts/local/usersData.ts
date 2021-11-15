import achievements from "./tasks/achievements";

const userData: Iuser = {
  takeFreeDiamondTime: 0,
  fortuneTimeAd: 3600 * 3,
  avatar: '',
  boughtAvatars: [],
  diamonds: 3,
  id: 'local',
  clanId: '',
  xp: 0,
  hash: 'local',
  login: '',
  counter: 0,
  mail: '',
  level: 1,
  clanTasks: [],
  additionalTutorial: {
    balance: false,
    cave: false,
    collector: false,
    herdBoost: false,
    feedBoost: false,
    eventTutorial: false,
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
  achievements: achievements,
};

const basicClan: Iclan = {
  isClosed: false,
  avatar: {
    bg: 1,
    frame: 1,
    icon: 1,
  },
  diamond: {
    count: 0,
    logs: [],
  },
  points: 0,
  limit: 10,
  main: {
    level: 1,
    cooldown: 0,
  },
  chatMessages: [],
  id: '',
  ownerId: '',
  name: '',
  users: [],
  sheep: {
    level: 1,
    cooldown: 0,
    money: '0',
    logs: [],
  },
  chicken: {
    level: 1,
    cooldown: 0,
    money: '0',
    logs: [],
  },
  cow: {
    level: 1,
    cooldown: 0,
    money: '0',
    logs: [],
  }
};

const userSheep: IuserSheep = {
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
  feedBoostTime: 0,
  herdBoostAd: true,
  feedBoostAd: true,
}

const userChicken: IuserChicken = {
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
  feedBoostTime: 0,
  herdBoostAd: true,
  feedBoostAd: true,
}

const userCow: IuserCow = {
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
  herdBoostAd: true,
  feedBoostAd: true,
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
  userCow,
  basicClan
}
