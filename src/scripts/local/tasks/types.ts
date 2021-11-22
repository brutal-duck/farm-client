enum TaskType {
  BUY_ANIMAL = 1,
  MERGE_ANIMAL = 2,
  TAKE_COLLECTOR = 3,
  GET_ANIMAL = 4,
  BUY_TERRITORY = 5,
  COLLECT_MONEY = 6,
  IMPROVE_FAIR = 7,
  IMPROVE_PASTURE = 8,
  IMPROVE_WATER = 9,
  SAVE_PROGRESS = 10,
  HAND_COLLECT = 11,
  CREATE_CLAN = 12,
  ANIMAL_ON_FARM = 14,
  SPEND_DIAMONDS = 15,
  ADD_EMAIL = 16,
  IMPROVE_REPOSITORY = 17,
  TAKE_DIAMOND_ANIMAL = 18,
  COLLECT_DIAMONDS_FROM_ANIMAL = 19,
  SELL_RESOURCE = 20,
  TAKE_FEED_BOOST = 21,
  TAKE_HERD_BOOST = 22,
  IMPROVE_COLLECTOR = 23,
  IMPROVE_FACTORY = 24,
  TAKE_ANIMAL_FROM_HERD = 25,
  SAVE_MILK = 26,
  IMPROVE_ALL_TERRITORY = 27,
  EXCHANGE_DIAMOND = 28,
};

enum TerritoryType {
  BOUGHT = 1,
  PASTURE = 2,
  WATER = 3,
  REPOSITORY = 5,
  FACTORY = 8,
}

type Task = {
  id: `${number}-${number}`;
  type: TaskType; 
  state: number;
  done: 0 | 1;
  awardTaken: 0 | 1;
  awardType: 'diamond' | 'coin';
  award: number;
  count: number;
  progress: number;
  sort: number;
};

export { TaskType, Task, TerritoryType };
