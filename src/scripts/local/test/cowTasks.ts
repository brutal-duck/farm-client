import { TaskType, Task, TerritoryType } from "../tasks/types";

const testCowTasks: Task[] = [
  {
    id: '1-1',
    type: TaskType['BUY_ANIMAL'],
    state: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    count: 2,
    progress: 0,
    sort: 10
  },
  {
    id: '1-2',
    type: TaskType['MERGE_ANIMAL'],
    state: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    count: 1,
    progress: 0,
    sort: 20
  },
  {
    id: '1-3',
    type: TaskType['TAKE_COLLECTOR'],
    state: 0,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    count: 1,
    progress: 0,
    sort: 30
  },
  {
    id: '1-4',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['REPOSITORY'],
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    count: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '2-1',
    type: TaskType['SAVE_MILK'],
    state: 0,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    count: 500,
    progress: 0,
    sort: 10
  },
  {
    id: '2-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    count: 1,
    progress: 0,
    sort: 20
  },
  {
    id: '2-3',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['FACTORY'],
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    count: 1,
    progress: 0,
    sort: 30
  },
  {
    id: '2-4',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    count: 6,
    progress: 0,
    sort: 40
  },
  {
    id: '2-5',
    type: TaskType['BUY_ANIMAL'],
    state: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    count: 2,
    progress: 0,
    sort: 50
  },
  {
    id: '2-6',
    type: TaskType['GET_ANIMAL'],
    state: 2,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '2-7',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '3-1',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 3,
    count: 6,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 57
  },
  {
    id: '3-2',
    type: TaskType['IMPROVE_FAIR'],
    state: 2,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '3-3',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 3,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '3-4',
    type: TaskType['GET_ANIMAL'],
    state: 3,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '3-5',
    type: TaskType['TAKE_DIAMOND_ANIMAL'],
    state: 0,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '4-1',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 4,
    count: 6,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '4-2',
    type: TaskType['IMPROVE_FAIR'],
    state: 3,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '4-3',
    type: TaskType['COLLECT_MONEY'],
    state: 0,
    count: 20000,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '4-4',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '4-5',
    type: TaskType['GET_ANIMAL'],
    state: 4,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '5-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '5-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '5-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 5,
    count: 7,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '5-4',
    type: TaskType['IMPROVE_FAIR'],
    state: 4,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '5-5',
    type: TaskType['TAKE_HERD_BOOST'],
    state: 0,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '5-6',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 5,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '5-7',
    type: TaskType['GET_ANIMAL'],
    state: 5,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '6-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '6-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '6-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 6,
    count: 8,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '6-4',
    type: TaskType['IMPROVE_FAIR'],
    state: 5,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '6-5',
    type: TaskType['TAKE_FEED_BOOST'],
    state: 0,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '6-6',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 6,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '6-7',
    type: TaskType['GET_ANIMAL'],
    state: 6,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '7-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '7-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '7-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 7,
    count: 9,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '7-4',
    type: TaskType['HAND_COLLECT'],
    state: 0,
    count: 15,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '7-5',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 7,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '7-6',
    type: TaskType['TAKE_COLLECTOR'],
    state: 0,
    count: 30,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '7-7',
    type: TaskType['GET_ANIMAL'],
    state: 6,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '8-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '8-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '8-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 8,
    count: 10,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '8-4',
    type: TaskType['IMPROVE_FAIR'],
    state: 6,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '8-5',
    type: TaskType['EXCHANGE_DIAMOND'],
    state: 0,
    count: 500000,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '8-6',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 8,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '8-7',
    type: TaskType['GET_ANIMAL'],
    state: 7,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '9-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '9-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['WATER'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '9-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 9,
    count: 11,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '9-4',
    type: TaskType['COLLECT_MONEY'],
    state: 0,
    count: 10_000_000,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '9-5',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 9,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '9-6',
    type: TaskType['SPEND_DIAMONDS'],
    state: 0,
    count: 15,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '9-7',
    type: TaskType['GET_ANIMAL'],
    state: 7,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '10-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '10-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '10-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 10,
    count: 12,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '10-4',
    type: TaskType['IMPROVE_FAIR'],
    state: 7,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '10-5',
    type: TaskType['TAKE_ANIMAL_FROM_HERD'],
    state: 0,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '10-6',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 10,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '10-7',
    type: TaskType['GET_ANIMAL'],
    state: 8,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '11-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '11-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '11-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 11,
    count: 13,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '11-4',
    type: TaskType['TAKE_DIAMOND_ANIMAL'],
    state: 0,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '11-5',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 11,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '11-6',
    type: TaskType['SELL_RESOURCE'],
    state: 0,
    count: 1000,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '11-7',
    type: TaskType['GET_ANIMAL'],
    state: 8,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '12-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '12-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '12-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 12,
    count: 14,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '12-4',
    type: TaskType['IMPROVE_FAIR'],
    state: 8,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '12-5',
    type: TaskType['COLLECT_DIAMONDS_FROM_ANIMAL'],
    state: 0,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '12-6',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 12,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '12-7',
    type: TaskType['GET_ANIMAL'],
    state: 9,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '13-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '13-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '13-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 13,
    count: 15,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '13-4',
    type: TaskType['TAKE_HERD_BOOST'],
    state: 0,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '13-5',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 13,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '13-6',
    type: TaskType['TAKE_FEED_BOOST'],
    state: 0,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '13-7',
    type: TaskType['GET_ANIMAL'],
    state: 9,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '14-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '14-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '14-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 14,
    count: 16,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '14-4',
    type: TaskType['IMPROVE_FAIR'],
    state: 9,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '14-5',
    type: TaskType['HAND_COLLECT'],
    state: 0,
    count: 8,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '14-6',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 14,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '14-7',
    type: TaskType['GET_ANIMAL'],
    state: 10,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '15-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '15-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['REPOSITORY'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '15-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 15,
    count: 17,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '15-4',
    type: TaskType['SPEND_DIAMONDS'],
    state: 0,
    count: 25,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '15-5',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 15,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '15-6',
    type: TaskType['COLLECT_MONEY'],
    state: 0,
    count: 100_000_000,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '15-7',
    type: TaskType['GET_ANIMAL'],
    state: 10,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '16-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '16-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '16-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 16,
    count: 18,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '16-4',
    type: TaskType['IMPROVE_FAIR'],
    state: 10,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '16-5',
    type: TaskType['TAKE_ANIMAL_FROM_HERD'],
    state: 0,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '16-6',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 16,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '16-7',
    type: TaskType['GET_ANIMAL'],
    state: 11,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '17-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '17-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '17-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 17,
    count: 19,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '17-4',
    type: TaskType['EXCHANGE_DIAMOND'],
    state: 0,
    count: 100_000_000,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '17-5',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 17,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '17-6',
    type: TaskType['TAKE_DIAMOND_ANIMAL'],
    state: 0,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '17-7',
    type: TaskType['GET_ANIMAL'],
    state: 11,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '18-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '18-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '18-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 18,
    count: 20,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '18-4',
    type: TaskType['IMPROVE_FAIR'],
    state: 11,
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '18-5',
    type: TaskType['COLLECT_DIAMONDS_FROM_ANIMAL'],
    state: 0,
    count: 3,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '18-6',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 18,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '18-7',
    type: TaskType['GET_ANIMAL'],
    state: 12,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '19-1',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['BOUGHT'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 10
  },
  {
    id: '19-2',
    type: TaskType['BUY_TERRITORY'],
    state: TerritoryType['PASTURE'],
    count: 1,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 65
  },
  {
    id: '19-3',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 19,
    count: 21,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 67
  },
  {
    id: '19-4',
    type: TaskType['TAKE_HERD_BOOST'],
    state: 0,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '19-5',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 19,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
  {
    id: '19-6',
    type: TaskType['TAKE_FEED_BOOST'],
    state: 0,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 60
  },
  {
    id: '19-7',
    type: TaskType['GET_ANIMAL'],
    state: 12,
    count: 2,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 70
  },
  {
    id: '20-1',
    type: TaskType['IMPROVE_ALL_TERRITORY'],
    state: 20,
    count: 21,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 45
  },
  {
    id: '20-2',
    type: TaskType['IMPROVE_COLLECTOR'],
    state: 0,
    count: 20,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 20
  },
  {
    id: '20-3',
    type: TaskType['GET_ANIMAL'],
    state: 12,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 30
  },
  {
    id: '20-4',
    type: TaskType['TAKE_ANIMAL_FROM_HERD'],
    state: 0,
    count: 4,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 40
  },
  {
    id: '20-5',
    type: TaskType['ANIMAL_ON_FARM'],
    state: 0,
    count: 0,
    done: 0,
    awardTaken: 0,
    awardType: 'diamond',
    award: 1,
    progress: 0,
    sort: 50
  },
];

export default testCowTasks;