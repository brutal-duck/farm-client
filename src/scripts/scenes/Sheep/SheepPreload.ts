import axios from 'axios';
import tasks from '../../tasks';
import Socket from '../../Socket';
import loadSheep from '../../local/loadSheep';
import { loadingScreen } from '../../general/basic';
import basicTerritories from '../../local/sheepTerritories';
import { checkStorage } from '../../general/basic';

const pixel: string = require("./../../../assets/images/pixel.png");
const bg: string = require("./../../../assets/images/scroll-bg.png");
const top: string = require("./../../../assets/images/sheep/top.png");
const bottom: string = require("./../../../assets/images/sheep/bottom.png");
const topbar: string = require("./../../../assets/images/topbar.png");
const tabbar: string = require("./../../../assets/images/tabbar.png");
const sheepBuyIcon1: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-1.png");
const sheepBuyIcon2: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-2.png");
const sheepBuyIcon3: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-3.png");
const sheepBuyIcon4: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-4.png");
const sheepBuyIcon5: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-5.png");
const sheepBuyIcon6: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-6.png");
const sheepBuyIcon7: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-7.png");
const sheepBuyIcon8: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-8.png");
const sheepBuyIcon9: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-9.png");
const sheepBuyIcon10: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-10.png");
const sheepBuyIcon11: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-11.png");
const sheepBuyIcon12: string = require("./../../../assets/images/sheep/icons/sheep-buy-icon-12.png");
const woolCollector: string = require("./../../../assets/images/sheep/wool-collector.png");
const shop: string = require("./../../../assets/images/icons/shop.png");
const mapIcon: string = require("./../../../assets/images/icons/map.png");
const sandwich: string = require("./../../../assets/images/icons/sandwich.png");
const sandwichClose: string = require("./../../../assets/images/icons/sandwich-close.png");
const profile: string = require("./../../../assets/images/icons/profile.png");
const fortune: string = require("./../../../assets/images/icons/fortune.png");
const chat: string = require("./../../../assets/images/icons/chat.png");
const forBuying: string = require("./../../../assets/images/sheep/territories/for-buying.png");
const bought: string = require("./../../../assets/images/sheep/territories/bought.png");
const merging: string = require("./../../../assets/images/sheep/territories/merging.png");
const tent: string = require("./../../../assets/images/sheep/territories/tent.png");
const house: string = require("./../../../assets/images/sheep/territories/house.png");
const ground: string = require("./../../../assets/images/sheep/territories/ground.png");
const repository: string = require("./../../../assets/images/sheep/territories/repository.png");
const repository11: string = require("./../../../assets/images/sheep/territories/repository-1-1.png");
const repository12: string = require("./../../../assets/images/sheep/territories/repository-1-2.png");
const repository13: string = require("./../../../assets/images/sheep/territories/repository-1-3.png");
const repository14: string = require("./../../../assets/images/sheep/territories/repository-1-4.png");
const repository21: string = require("./../../../assets/images/sheep/territories/repository-2-1.png");
const repository22: string = require("./../../../assets/images/sheep/territories/repository-2-2.png");
const repository23: string = require("./../../../assets/images/sheep/territories/repository-2-3.png");
const repository24: string = require("./../../../assets/images/sheep/territories/repository-2-4.png");
const repository31: string = require("./../../../assets/images/sheep/territories/repository-3-1.png");
const repository32: string = require("./../../../assets/images/sheep/territories/repository-3-2.png");
const repository33: string = require("./../../../assets/images/sheep/territories/repository-3-3.png");
const repository34: string = require("./../../../assets/images/sheep/territories/repository-3-4.png");
const repository41: string = require("./../../../assets/images/sheep/territories/repository-4-1.png");
const repository42: string = require("./../../../assets/images/sheep/territories/repository-4-2.png");
const repository43: string = require("./../../../assets/images/sheep/territories/repository-4-3.png");
const repository44: string = require("./../../../assets/images/sheep/territories/repository-4-4.png");
const grass11: string = require("./../../../assets/images/sheep/territories/grass1-1.png");
const grass12: string = require("./../../../assets/images/sheep/territories/grass1-2.png");
const grass13: string = require("./../../../assets/images/sheep/territories/grass1-3.png");
const grass14: string = require("./../../../assets/images/sheep/territories/grass1-4.png");
const grass15: string = require("./../../../assets/images/sheep/territories/grass1-5.png");
const grass21: string = require("./../../../assets/images/sheep/territories/grass2-1.png");
const grass22: string = require("./../../../assets/images/sheep/territories/grass2-2.png");
const grass23: string = require("./../../../assets/images/sheep/territories/grass2-3.png");
const grass24: string = require("./../../../assets/images/sheep/territories/grass2-4.png");
const grass25: string = require("./../../../assets/images/sheep/territories/grass2-5.png");
const grass31: string = require("./../../../assets/images/sheep/territories/grass3-1.png");
const grass32: string = require("./../../../assets/images/sheep/territories/grass3-2.png");
const grass33: string = require("./../../../assets/images/sheep/territories/grass3-3.png");
const grass34: string = require("./../../../assets/images/sheep/territories/grass3-4.png");
const grass35: string = require("./../../../assets/images/sheep/territories/grass3-5.png");
const grass41: string = require("./../../../assets/images/sheep/territories/grass4-1.png");
const grass42: string = require("./../../../assets/images/sheep/territories/grass4-2.png");
const grass43: string = require("./../../../assets/images/sheep/territories/grass4-3.png");
const grass44: string = require("./../../../assets/images/sheep/territories/grass4-4.png");
const grass45: string = require("./../../../assets/images/sheep/territories/grass4-5.png");
const water11: string = require("./../../../assets/images/sheep/territories/water1-1.png");
const water12: string = require("./../../../assets/images/sheep/territories/water1-2.png");
const water13: string = require("./../../../assets/images/sheep/territories/water1-3.png");
const water14: string = require("./../../../assets/images/sheep/territories/water1-4.png");
const water21: string = require("./../../../assets/images/sheep/territories/water2-1.png");
const water22: string = require("./../../../assets/images/sheep/territories/water2-2.png");
const water23: string = require("./../../../assets/images/sheep/territories/water2-3.png");
const water24: string = require("./../../../assets/images/sheep/territories/water2-4.png");
const water31: string = require("./../../../assets/images/sheep/territories/water3-1.png");
const water32: string = require("./../../../assets/images/sheep/territories/water3-2.png");
const water33: string = require("./../../../assets/images/sheep/territories/water3-3.png");
const water34: string = require("./../../../assets/images/sheep/territories/water3-4.png");
const water41: string = require("./../../../assets/images/sheep/territories/water4-1.png");
const water42: string = require("./../../../assets/images/sheep/territories/water4-2.png");
const water43: string = require("./../../../assets/images/sheep/territories/water4-3.png");
const water44: string = require("./../../../assets/images/sheep/territories/water4-4.png");
const lockTerritory: string = require("./../../../assets/images/lock-territory.png");
const sheep0: string = require("./../../../assets/images/sheep/sheep/sheep0.png");
const sheep1: string = require("./../../../assets/images/sheep/sheep/sheep1.png");
const sheep2: string = require("./../../../assets/images/sheep/sheep/sheep2.png");
const sheep3: string = require("./../../../assets/images/sheep/sheep/sheep3.png");
const sheep4: string = require("./../../../assets/images/sheep/sheep/sheep4.png");
const sheep5: string = require("./../../../assets/images/sheep/sheep/sheep5.png");
const sheep6: string = require("./../../../assets/images/sheep/sheep/sheep6.png");
const sheep7: string = require("./../../../assets/images/sheep/sheep/sheep7.png");
const sheep8: string = require("./../../../assets/images/sheep/sheep/sheep8.png");
const sheep9: string = require("./../../../assets/images/sheep/sheep/sheep9.png");
const sheep10: string = require("./../../../assets/images/sheep/sheep/sheep10.png");
const sheep11: string = require("./../../../assets/images/sheep/sheep/sheep11.png");
const sheep12: string = require("./../../../assets/images/sheep/sheep/sheep12.png");
const wool1: string = require("./../../../assets/images/sheep/wool/wool1.png");
const wool2: string = require("./../../../assets/images/sheep/wool/wool2.png");
const wool3: string = require("./../../../assets/images/sheep/wool/wool3.png");
const wool4: string = require("./../../../assets/images/sheep/wool/wool4.png");
const wool5: string = require("./../../../assets/images/sheep/wool/wool5.png");
const wool6: string = require("./../../../assets/images/sheep/wool/wool6.png");
const wool7: string = require("./../../../assets/images/sheep/wool/wool7.png");
const wool8: string = require("./../../../assets/images/sheep/wool/wool8.png");
const wool9: string = require("./../../../assets/images/sheep/wool/wool9.png");
const wool10: string = require("./../../../assets/images/sheep/wool/wool10.png");
const wool11: string = require("./../../../assets/images/sheep/wool/wool11.png");
const wool12: string = require("./../../../assets/images/sheep/wool/wool12.png");
const mergingAnimation: string = require("./../../../assets/images/merging-animation.png");
const coin: string = require("./../../../assets/images/sheep/icons/money.png");
const diamond: string = require("./../../../assets/images/icons/diamonds.png");
const lock: string = require("./../../../assets/images/icons/lock.png");
const disableSheep: string = require("./../../../assets/images/sheep/sheep/disable-sheep.png");
const houseSprite: string = require("./../../../assets/images/sheep/houses/house-10.png");
const caveDisalble: string = require("./../../../assets/images/cave/cave-disable.png");
const caveReady: string = require("./../../../assets/images/cave/cave-ready.png");
const caveWait: string = require("./../../../assets/images/cave/cave-wait.png");
const caveTimer: string = require("./../../../assets/images/cave/cave-timer.png");
const chapter1: string = require("./../../../assets/images/sheep/chapters/chapter1.png");
const chapter2: string = require("./../../../assets/images/sheep/chapters/chapter2.png");
const chapter3: string = require("./../../../assets/images/sheep/chapters/chapter3.png");
const chapter4: string = require("./../../../assets/images/sheep/chapters/chapter4.png");
const chapter5: string = require("./../../../assets/images/sheep/chapters/chapter5.png");
const chapter6: string = require("./../../../assets/images/sheep/chapters/chapter6.png");
const chapter7: string = require("./../../../assets/images/sheep/chapters/chapter7.png");
const chapter8: string = require("./../../../assets/images/sheep/chapters/chapter8.png");
const chapter9: string = require("./../../../assets/images/sheep/chapters/chapter9.png");
const chapter10: string = require("./../../../assets/images/sheep/chapters/chapter10.png");
const chapter11: string = require("./../../../assets/images/sheep/chapters/chapter11.png");
const chapter12: string = require("./../../../assets/images/sheep/chapters/chapter12.png");
const chapter13: string = require("./../../../assets/images/sheep/chapters/chapter13.png");
const chapter14: string = require("./../../../assets/images/sheep/chapters/chapter14.png");
const chapter15: string = require("./../../../assets/images/sheep/chapters/chapter15.png");
const chapter16: string = require("./../../../assets/images/sheep/chapters/chapter16.png");
const forest1: string = require("./../../../assets/images/sheep/territories/forest-1.png");
const forest2: string = require("./../../../assets/images/sheep/territories/forest-2.png");
const forest3: string = require("./../../../assets/images/sheep/territories/forest-3.png");
const forest4: string = require("./../../../assets/images/sheep/territories/forest-4.png");
const forest5: string = require("./../../../assets/images/sheep/territories/forest-5.png");
const forest6: string = require("./../../../assets/images/sheep/territories/forest-6.png");
const forest7: string = require("./../../../assets/images/sheep/territories/forest-7.png");
const forest8: string = require("./../../../assets/images/sheep/territories/forest-8.png");
const star: string = require("./../../../assets/images/icons/star.png");
const completed: string = require("./../../../assets/images/icons/completed.png");
const littleButton: string = require("./../../../assets/images/modal/little-button.png");
const taskIcon1: string = require("./../../../assets/images/sheep/tasks/task-icon-1.png");
const taskIcon2: string = require("./../../../assets/images/sheep/tasks/task-icon-2.png");
const taskIcon3: string = require("./../../../assets/images/sheep/tasks/task-icon-3.png");
const taskIcon4: string = require("./../../../assets/images/sheep/tasks/task-icon-4.png");
const taskIcon5: string = require("./../../../assets/images/sheep/tasks/task-icon-5.png");
const taskIcon6: string = require("./../../../assets/images/sheep/tasks/task-icon-6.png");
const taskIcon7: string = require("./../../../assets/images/sheep/tasks/task-icon-7.png");
const taskIcon8: string = require("./../../../assets/images/sheep/tasks/task-icon-8.png");
const taskIcon9: string = require("./../../../assets/images/sheep/tasks/task-icon-9.png");
const taskIcon10: string = require("./../../../assets/images/sheep/tasks/task-icon-10.png");
const taskIcon11: string = require("./../../../assets/images/sheep/tasks/task-icon-11.png");
const taskIcon12: string = require("./../../../assets/images/sheep/tasks/task-icon-12.png");
const taskIcon13: string = require("./../../../assets/images/sheep/tasks/task-icon-13.png");
const taskIcon14: string = require("./../../../assets/images/sheep/tasks/task-icon-14.png");
const taskIcon15: string = require("./../../../assets/images/sheep/tasks/task-icon-15.png");
const taskIcon16: string = require("./../../../assets/images/sheep/tasks/task-icon-16.png");
const taskIcon17: string = require("./../../../assets/images/sheep/tasks/task-icon-17.png");
const taskIcon18: string = require("./../../../assets/images/sheep/tasks/task-icon-18.png");
const taskIcon19: string = require("./../../../assets/images/sheep/tasks/task-icon-19.png");
const taskIcon20: string = require("./../../../assets/images/sheep/tasks/task-icon-20.png");
const taskIcon21: string = require("./../../../assets/images/sheep/tasks/task-icon-21.png");
const taskIcon22: string = require("./../../../assets/images/sheep/tasks/task-icon-22.png");
const taskIcon23: string = require("./../../../assets/images/sheep/tasks/task-icon-23.png");
const taskIcon24: string = require("./../../../assets/images/sheep/tasks/task-icon-24.png");
const taskIcon25: string = require("./../../../assets/images/sheep/tasks/task-icon-25.png");
const taskIcon26: string = require("./../../../assets/images/sheep/tasks/task-icon-26.png");
const taskIcon27: string = require("./../../../assets/images/sheep/tasks/task-icon-27.png");
const taskIcon28: string = require("./../../../assets/images/sheep/tasks/task-icon-28.png");
const taskIcon29: string = require("./../../../assets/images/sheep/tasks/task-icon-29.png");
const taskIcon30: string = require("./../../../assets/images/sheep/tasks/task-icon-30.png");
const taskIcon31: string = require("./../../../assets/images/sheep/tasks/task-icon-31.png");
const taskIcon32: string = require("./../../../assets/images/sheep/tasks/task-icon-32.png");
const taskIcon33: string = require("./../../../assets/images/sheep/tasks/task-icon-33.png");
const taskIcon34: string = require("./../../../assets/images/sheep/tasks/task-icon-34.png");
const plus: string = require("./../../../assets/images/icons/plus.png");
const sheepLeaves: string = require("./../../../assets/images/sheep/sheep-leaves.png");
const greenBalanceBg: string = require("./../../../assets/images/balance/green-balance-bg.png");
const redBalanceBg: string = require("./../../../assets/images/balance/red-balance-bg.png");
const resourceEnough: string = require("./../../../assets/images/balance/resource-enough.png");
const resourceProblem: string = require("./../../../assets/images/balance/resource-problem.png");
const grassBalance: string = require("./../../../assets/images/balance/grass-balance.png");
const waterBalance: string = require("./../../../assets/images/balance/water-balance.png");
const sheepLeft_0_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-0-2.png");
const sheepLeft_0_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-0-3.png");
const sheepLeft_0_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-0-4.png");
const sheepRight_0_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-0-2.png");
const sheepRight_0_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-0-3.png");
const sheepRight_0_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-0-4.png");
const sheepLeft_1_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-1-1.png");
const sheepLeft_1_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-1-2.png");
const sheepLeft_1_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-1-3.png");
const sheepLeft_1_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-1-4.png");
const sheepRight_1_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-1-1.png");
const sheepRight_1_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-1-2.png");
const sheepRight_1_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-1-3.png");
const sheepRight_1_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-1-4.png");
const sheepLeft_2_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-2-1.png");
const sheepLeft_2_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-2-2.png");
const sheepLeft_2_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-2-3.png");
const sheepLeft_2_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-2-4.png");
const sheepRight_2_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-2-1.png");
const sheepRight_2_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-2-2.png");
const sheepRight_2_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-2-3.png");
const sheepRight_2_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-2-4.png");
const sheepLeft_3_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-3-1.png");
const sheepLeft_3_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-3-2.png");
const sheepLeft_3_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-3-3.png");
const sheepLeft_3_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-3-4.png");
const sheepRight_3_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-3-1.png");
const sheepRight_3_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-3-2.png");
const sheepRight_3_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-3-3.png");
const sheepRight_3_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-3-4.png");
const sheepLeft_4_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-4-1.png");
const sheepLeft_4_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-4-2.png");
const sheepLeft_4_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-4-3.png");
const sheepLeft_4_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-4-4.png");
const sheepRight_4_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-4-1.png");
const sheepRight_4_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-4-2.png");
const sheepRight_4_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-4-3.png");
const sheepRight_4_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-4-4.png");
const sheepLeft_5_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-5-1.png");
const sheepLeft_5_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-5-2.png");
const sheepLeft_5_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-5-3.png");
const sheepLeft_5_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-5-4.png");
const sheepRight_5_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-5-1.png");
const sheepRight_5_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-5-2.png");
const sheepRight_5_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-5-3.png");
const sheepRight_5_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-5-4.png");
const sheepLeft_6_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-6-1.png");
const sheepLeft_6_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-6-2.png");
const sheepLeft_6_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-6-3.png");
const sheepLeft_6_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-6-4.png");
const sheepRight_6_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-6-1.png");
const sheepRight_6_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-6-2.png");
const sheepRight_6_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-6-3.png");
const sheepRight_6_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-6-4.png");
const sheepLeft_7_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-7-1.png");
const sheepLeft_7_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-7-2.png");
const sheepLeft_7_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-7-3.png");
const sheepLeft_7_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-7-4.png");
const sheepRight_7_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-7-1.png");
const sheepRight_7_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-7-2.png");
const sheepRight_7_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-7-3.png");
const sheepRight_7_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-7-4.png");
const sheepLeft_8_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-8-1.png");
const sheepLeft_8_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-8-2.png");
const sheepLeft_8_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-8-3.png");
const sheepLeft_8_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-8-4.png");
const sheepRight_8_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-8-1.png");
const sheepRight_8_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-8-2.png");
const sheepRight_8_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-8-3.png");
const sheepRight_8_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-8-4.png");
const sheepLeft_9_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-9-1.png");
const sheepLeft_9_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-9-2.png");
const sheepLeft_9_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-9-3.png");
const sheepLeft_9_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-9-4.png");
const sheepRight_9_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-9-1.png");
const sheepRight_9_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-9-2.png");
const sheepRight_9_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-9-3.png");
const sheepRight_9_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-9-4.png");
const sheepLeft_10_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-10-1.png");
const sheepLeft_10_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-10-2.png");
const sheepLeft_10_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-10-3.png");
const sheepLeft_10_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-10-4.png");
const sheepRight_10_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-10-1.png");
const sheepRight_10_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-10-2.png");
const sheepRight_10_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-10-3.png");
const sheepRight_10_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-10-4.png");
const sheepLeft_11_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-11-1.png");
const sheepLeft_11_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-11-2.png");
const sheepLeft_11_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-11-3.png");
const sheepLeft_11_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-11-4.png");
const sheepRight_11_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-11-1.png");
const sheepRight_11_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-11-2.png");
const sheepRight_11_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-11-3.png");
const sheepRight_11_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-11-4.png");
const sheepLeft_12_1: string = require("./../../../assets/images/sheep/sheep/sheep-left-12-1.png");
const sheepLeft_12_2: string = require("./../../../assets/images/sheep/sheep/sheep-left-12-2.png");
const sheepLeft_12_3: string = require("./../../../assets/images/sheep/sheep/sheep-left-12-3.png");
const sheepLeft_12_4: string = require("./../../../assets/images/sheep/sheep/sheep-left-12-4.png");
const sheepRight_12_1: string = require("./../../../assets/images/sheep/sheep/sheep-right-12-1.png");
const sheepRight_12_2: string = require("./../../../assets/images/sheep/sheep/sheep-right-12-2.png");
const sheepRight_12_3: string = require("./../../../assets/images/sheep/sheep/sheep-right-12-3.png");
const sheepRight_12_4: string = require("./../../../assets/images/sheep/sheep/sheep-right-12-4.png");
const tail: string = require("./../../../assets/images/tail.png");
const verticalBorder: string = require("./../../../assets/images/sheep/territories/vertical-border.png");
const horizontalBorder1: string = require("./../../../assets/images/sheep/territories/horizontal-border-1.png");
const horizontalBorder2: string = require("./../../../assets/images/sheep/territories/horizontal-border-2.png");
const horizontalBorder3: string = require("./../../../assets/images/sheep/territories/horizontal-border-3.png");
const tutorMerging: string = require("./../../../assets/images/sheep/tutor-merging.png");
const gift: string = require("./../../../assets/images/icons/gift.png");
const shaveStatus: string = require("./../../../assets/images/sheep/icons/shave-status.png");
const offline: string = require("./../../../assets/images/icons/offline.png");
const arrow: string = require("./../../../assets/images/arrow.png");
const tutorBtn: string = require("./../../../assets/images/modal/tutor-btn.png");
const сurrencyBg: string = require("./../../../assets/images/сurrency-bg.png");
const heart: string = require("./../../../assets/images/icons/heart.png");
const calendar: string = require("./../../../assets/images/calendar.png");
const adIcon: string = require("./../../../assets/images/icons/ad-icon.png");
const bgAd: string = require("./../../../assets/images/icons/bg-ad.png");
const bigButtonGreen: string = require("./../../../assets/images/modal/btn_lg.png");
const starterpackIcon: string = require("./../../../assets/images/icons/starterpack.png");
const firework1: string = require("./../../../assets/images/animations/firework1.png");
const firework2: string = require("./../../../assets/images/animations/firework2.png");
const firework3: string = require("./../../../assets/images/animations/firework3.png");
const fireworkBg: string = require("./../../../assets/images/animations/fireworkBg.png");
const loadingSpinner: string = require('./../../../assets/images/animations/loading-spinner.png');
const farmer: string = require("./../../../assets/images/farmer.png");
const whitePixel: string = require("./../../../assets/images/white-pixel.jpg");
const scrollArrow: string = require("./../../../assets/images/scroll-arrow.png");

class SheepPreload extends Phaser.Scene {

  public lang: string; // индекс языка
  public state: Istate;
  public userReady: boolean;
  public loadingReady: boolean;
  public socket: boolean;
  public loadTime: number;
  public startTime: number;

  public loadSheep = loadSheep.bind(this);
  public loadingScreen = loadingScreen.bind(this);

  constructor() {
    super('SheepPreload');
  }

  
  public init(state: Istate): void {

    this.state  = state;
    this.userReady = false;
    this.loadingReady = false;
    this.socket = false;
    this.loadUser();
    this.startTime = Math.round(new Date().getTime() / 1000);

    if (!this.state.socket) {
      this.socket = true;
      this.loadTime = Math.round(new Date().getTime() / 1000);
      this.state.socket = new Socket(this.state);
    }

  }
  

  public preload(): void {

    this.loadingScreen('Sheep');

    this.load.image('bg', bg);
    this.load.image('sheep-top', top);
    this.load.image('sheep-bottom', bottom);
    this.load.image('topbar', topbar);
    this.load.image('tabbar', tabbar);
    this.load.image('sheep-buy-icon-1', sheepBuyIcon1);
    this.load.image('sheep-buy-icon-2', sheepBuyIcon2);
    this.load.image('sheep-buy-icon-3', sheepBuyIcon3);
    this.load.image('sheep-buy-icon-4', sheepBuyIcon4);
    this.load.image('sheep-buy-icon-5', sheepBuyIcon5);
    this.load.image('sheep-buy-icon-6', sheepBuyIcon6);
    this.load.image('sheep-buy-icon-7', sheepBuyIcon7);
    this.load.image('sheep-buy-icon-8', sheepBuyIcon8);
    this.load.image('sheep-buy-icon-9', sheepBuyIcon9);
    this.load.image('sheep-buy-icon-10', sheepBuyIcon10);
    this.load.image('sheep-buy-icon-11', sheepBuyIcon11);
    this.load.image('sheep-buy-icon-12', sheepBuyIcon12);
    this.load.image('wool-collector', woolCollector);
    this.load.image('shop', shop);
    this.load.image('map-icon', mapIcon);
    this.load.image('sandwich', sandwich);
    this.load.image('sandwich-close', sandwichClose);
    this.load.image('profile', profile);
    this.load.image('fortune-icon', fortune);
    this.load.image('chat', chat);
    this.load.image('sheep-for-buying', forBuying);
    this.load.image('sheep-bought', bought);
    this.load.image('sheep-merging', merging);
    this.load.image('sheep-tent', tent);
    this.load.image('sheep-house', house);
    this.load.image('sheep-ground', ground);
    this.load.image('sheep-repository', repository);
    this.load.image('sheep-repository-1-1', repository11);
    this.load.image('sheep-repository-1-2', repository12);
    this.load.image('sheep-repository-1-3', repository13);
    this.load.image('sheep-repository-1-4', repository14);
    this.load.image('sheep-repository-2-1', repository21);
    this.load.image('sheep-repository-2-2', repository22);
    this.load.image('sheep-repository-2-3', repository23);
    this.load.image('sheep-repository-2-4', repository24);
    this.load.image('sheep-repository-3-1', repository31);
    this.load.image('sheep-repository-3-2', repository32);
    this.load.image('sheep-repository-3-3', repository33);
    this.load.image('sheep-repository-3-4', repository34);
    this.load.image('sheep-repository-4-1', repository41);
    this.load.image('sheep-repository-4-2', repository42);
    this.load.image('sheep-repository-4-3', repository43);
    this.load.image('sheep-repository-4-4', repository44);
    this.load.image('sheep-grass1-1', grass11);
    this.load.image('sheep-grass1-2', grass12);
    this.load.image('sheep-grass1-3', grass13);
    this.load.image('sheep-grass1-4', grass14);
    this.load.image('sheep-grass1-5', grass15);
    this.load.image('sheep-grass2-1', grass21);
    this.load.image('sheep-grass2-2', grass22);
    this.load.image('sheep-grass2-3', grass23);
    this.load.image('sheep-grass2-4', grass24);
    this.load.image('sheep-grass2-5', grass25);
    this.load.image('sheep-grass3-1', grass31);
    this.load.image('sheep-grass3-2', grass32);
    this.load.image('sheep-grass3-3', grass33);
    this.load.image('sheep-grass3-4', grass34);
    this.load.image('sheep-grass3-5', grass35);
    this.load.image('sheep-grass4-1', grass41);
    this.load.image('sheep-grass4-2', grass42);
    this.load.image('sheep-grass4-3', grass43);
    this.load.image('sheep-grass4-4', grass44);
    this.load.image('sheep-grass4-5', grass45);
    this.load.image('sheep-water1-1', water11);
    this.load.image('sheep-water1-2', water12);
    this.load.image('sheep-water1-3', water13);
    this.load.image('sheep-water1-4', water14);
    this.load.image('sheep-water2-1', water21);
    this.load.image('sheep-water2-2', water22);
    this.load.image('sheep-water2-3', water23);
    this.load.image('sheep-water2-4', water24);
    this.load.image('sheep-water3-1', water31);
    this.load.image('sheep-water3-2', water32);
    this.load.image('sheep-water3-3', water33);
    this.load.image('sheep-water3-4', water34);
    this.load.image('sheep-water4-1', water41);
    this.load.image('sheep-water4-2', water42);
    this.load.image('sheep-water4-3', water43);
    this.load.image('sheep-water4-4', water44);
    this.load.image('lock-territory', lockTerritory);
    this.load.spritesheet('sheep0', sheep0, { frameWidth: 121, frameHeight: 158 });
    this.load.spritesheet('sheep1', sheep1, { frameWidth: 135, frameHeight: 128 });
    this.load.spritesheet('sheep2', sheep2, { frameWidth: 135, frameHeight: 128 });
    this.load.spritesheet('sheep3', sheep3, { frameWidth: 135, frameHeight: 132 });
    this.load.spritesheet('sheep4', sheep4, { frameWidth: 135, frameHeight: 147 });
    this.load.spritesheet('sheep5', sheep5, { frameWidth: 135, frameHeight: 130 });
    this.load.spritesheet('sheep6', sheep6, { frameWidth: 135, frameHeight: 139 });
    this.load.spritesheet('sheep7', sheep7, { frameWidth: 159, frameHeight: 126 });
    this.load.spritesheet('sheep8', sheep8, { frameWidth: 138, frameHeight: 139 });
    this.load.spritesheet('sheep9', sheep9, { frameWidth: 135, frameHeight: 131 });
    this.load.spritesheet('sheep10', sheep10, { frameWidth: 146, frameHeight: 133 });
    this.load.spritesheet('sheep11', sheep11, { frameWidth: 151, frameHeight: 125 });
    this.load.spritesheet('sheep12', sheep12, { frameWidth: 136, frameHeight: 146 });
    this.load.image('sheep-wool1', wool1);
    this.load.image('sheep-wool2', wool2);
    this.load.image('sheep-wool3', wool3);
    this.load.image('sheep-wool4', wool4);
    this.load.image('sheep-wool5', wool5);
    this.load.image('sheep-wool6', wool6);
    this.load.image('sheep-wool7', wool7);
    this.load.image('sheep-wool8', wool8);
    this.load.image('sheep-wool9', wool9);
    this.load.image('sheep-wool10', wool10);
    this.load.image('sheep-wool11', wool11);
    this.load.image('sheep-wool12', wool12);
    this.load.image('merging-animation', mergingAnimation);
    this.load.image('sheepCoin', coin);
    this.load.image('diamond', diamond);
    this.load.image('lock', lock);
    this.load.image('disable-sheep', disableSheep);
    this.load.image('sheep-house-sprite', houseSprite)
    this.load.image('cave-disable', caveDisalble);
    this.load.image('cave-ready', caveReady);
    this.load.image('cave-wait', caveWait);
    this.load.image('cave-timer', caveTimer);
    this.load.image('sheep-chapter-1', chapter1);
    this.load.image('sheep-chapter-2', chapter2);
    this.load.image('sheep-chapter-3', chapter3);
    this.load.image('sheep-chapter-4', chapter4);
    this.load.image('sheep-chapter-5', chapter5);
    this.load.image('sheep-chapter-6', chapter6);
    this.load.image('sheep-chapter-7', chapter7);
    this.load.image('sheep-chapter-8', chapter8);
    this.load.image('sheep-chapter-9', chapter9);
    this.load.image('sheep-chapter-10', chapter10);
    this.load.image('sheep-chapter-11', chapter11);
    this.load.image('sheep-chapter-12', chapter12);
    this.load.image('sheep-chapter-13', chapter13);
    this.load.image('sheep-chapter-14', chapter14);
    this.load.image('sheep-chapter-15', chapter15);
    this.load.image('sheep-chapter-16', chapter16);
    this.load.image('sheep-forest-1', forest1);
    this.load.image('sheep-forest-2', forest2);
    this.load.image('sheep-forest-3', forest3);
    this.load.image('sheep-forest-4', forest4);
    this.load.image('sheep-forest-5', forest5);
    this.load.image('sheep-forest-6', forest6);
    this.load.image('sheep-forest-7', forest7);
    this.load.image('sheep-forest-8', forest8);
    this.load.image('star', star);
    this.load.image('completed', completed);
    this.load.image('little-button', littleButton);
    this.load.image('sheep-task-icon-1', taskIcon1);
    this.load.image('sheep-task-icon-2', taskIcon2);
    this.load.image('sheep-task-icon-3', taskIcon3);
    this.load.image('sheep-task-icon-4', taskIcon4);
    this.load.image('sheep-task-icon-5', taskIcon5);
    this.load.image('sheep-task-icon-6', taskIcon6);
    this.load.image('sheep-task-icon-7', taskIcon7);
    this.load.image('sheep-task-icon-8', taskIcon8);
    this.load.image('sheep-task-icon-9', taskIcon9);
    this.load.image('sheep-task-icon-10', taskIcon10);
    this.load.image('sheep-task-icon-11', taskIcon11);
    this.load.image('sheep-task-icon-12', taskIcon12);
    this.load.image('sheep-task-icon-13', taskIcon13);
    this.load.image('sheep-task-icon-14', taskIcon14);
    this.load.image('sheep-task-icon-15', taskIcon15);
    this.load.image('sheep-task-icon-16', taskIcon16);
    this.load.image('sheep-task-icon-17', taskIcon17);
    this.load.image('sheep-task-icon-18', taskIcon18);
    this.load.image('sheep-task-icon-19', taskIcon19);
    this.load.image('sheep-task-icon-20', taskIcon20);
    this.load.image('sheep-task-icon-21', taskIcon21);
    this.load.image('sheep-task-icon-22', taskIcon22);
    this.load.image('sheep-task-icon-23', taskIcon23);
    this.load.image('sheep-task-icon-24', taskIcon24);
    this.load.image('sheep-task-icon-25', taskIcon25);
    this.load.image('sheep-task-icon-26', taskIcon26);
    this.load.image('sheep-task-icon-27', taskIcon27);
    this.load.image('sheep-task-icon-28', taskIcon28);
    this.load.image('sheep-task-icon-29', taskIcon29);
    this.load.image('sheep-task-icon-30', taskIcon30);
    this.load.image('sheep-task-icon-31', taskIcon31);
    this.load.image('sheep-task-icon-32', taskIcon32);
    this.load.image('sheep-task-icon-33', taskIcon33);
    this.load.image('sheep-task-icon-34', taskIcon34);
    this.load.image('plus', plus);
    this.load.image('sheep-leaves', sheepLeaves);
    this.load.image('green-balance-bg', greenBalanceBg);
    this.load.image('red-balance-bg', redBalanceBg);
    this.load.image('resource-enough', resourceEnough);
    this.load.image('resource-problem', resourceProblem);
    this.load.image('grass-balance', grassBalance);
    this.load.image('water-balance', waterBalance);
    this.load.image('sheep-left-0-1', pixel);
    this.load.image('sheep-left-0-2', sheepLeft_0_2);
    this.load.image('sheep-left-0-3', sheepLeft_0_3);
    this.load.image('sheep-left-0-4', sheepLeft_0_4);
    this.load.image('sheep-right-0-1', pixel);
    this.load.image('sheep-right-0-2', sheepRight_0_2);
    this.load.image('sheep-right-0-3', sheepRight_0_3);
    this.load.image('sheep-right-0-4', sheepRight_0_4);
    this.load.image('sheep-left-1-1', sheepLeft_1_1);
    this.load.image('sheep-left-1-2', sheepLeft_1_2);
    this.load.image('sheep-left-1-3', sheepLeft_1_3);
    this.load.image('sheep-left-1-4', sheepLeft_1_4);
    this.load.image('sheep-right-1-1', sheepRight_1_1);
    this.load.image('sheep-right-1-2', sheepRight_1_2);
    this.load.image('sheep-right-1-3', sheepRight_1_3);
    this.load.image('sheep-right-1-4', sheepRight_1_4);
    this.load.image('sheep-left-2-1', sheepLeft_2_1);
    this.load.image('sheep-left-2-2', sheepLeft_2_2);
    this.load.image('sheep-left-2-3', sheepLeft_2_3);
    this.load.image('sheep-left-2-4', sheepLeft_2_4);
    this.load.image('sheep-right-2-1', sheepRight_2_1);
    this.load.image('sheep-right-2-2', sheepRight_2_2);
    this.load.image('sheep-right-2-3', sheepRight_2_3);
    this.load.image('sheep-right-2-4', sheepRight_2_4);
    this.load.image('sheep-left-3-1', sheepLeft_3_1);
    this.load.image('sheep-left-3-2', sheepLeft_3_2);
    this.load.image('sheep-left-3-3', sheepLeft_3_3);
    this.load.image('sheep-left-3-4', sheepLeft_3_4);
    this.load.image('sheep-right-3-1', sheepRight_3_1);
    this.load.image('sheep-right-3-2', sheepRight_3_2);
    this.load.image('sheep-right-3-3', sheepRight_3_3);
    this.load.image('sheep-right-3-4', sheepRight_3_4);
    this.load.image('sheep-left-4-1', sheepLeft_4_1);
    this.load.image('sheep-left-4-2', sheepLeft_4_2);
    this.load.image('sheep-left-4-3', sheepLeft_4_3);
    this.load.image('sheep-left-4-4', sheepLeft_4_4);
    this.load.image('sheep-right-4-1', sheepRight_4_1);
    this.load.image('sheep-right-4-2', sheepRight_4_2);
    this.load.image('sheep-right-4-3', sheepRight_4_3);
    this.load.image('sheep-right-4-4', sheepRight_4_4);
    this.load.image('sheep-left-5-1', sheepLeft_5_1);
    this.load.image('sheep-left-5-2', sheepLeft_5_2);
    this.load.image('sheep-left-5-3', sheepLeft_5_3);
    this.load.image('sheep-left-5-4', sheepLeft_5_4);
    this.load.image('sheep-right-5-1', sheepRight_5_1);
    this.load.image('sheep-right-5-2', sheepRight_5_2);
    this.load.image('sheep-right-5-3', sheepRight_5_3);
    this.load.image('sheep-right-5-4', sheepRight_5_4);
    this.load.image('sheep-left-6-1', sheepLeft_6_1);
    this.load.image('sheep-left-6-2', sheepLeft_6_2);
    this.load.image('sheep-left-6-3', sheepLeft_6_3);
    this.load.image('sheep-left-6-4', sheepLeft_6_4);
    this.load.image('sheep-right-6-1', sheepRight_6_1);
    this.load.image('sheep-right-6-2', sheepRight_6_2);
    this.load.image('sheep-right-6-3', sheepRight_6_3);
    this.load.image('sheep-right-6-4', sheepRight_6_4);
    this.load.image('sheep-left-7-1', sheepLeft_7_1);
    this.load.image('sheep-left-7-2', sheepLeft_7_2);
    this.load.image('sheep-left-7-3', sheepLeft_7_3);
    this.load.image('sheep-left-7-4', sheepLeft_7_4);
    this.load.image('sheep-right-7-1', sheepRight_7_1);
    this.load.image('sheep-right-7-2', sheepRight_7_2);
    this.load.image('sheep-right-7-3', sheepRight_7_3);
    this.load.image('sheep-right-7-4', sheepRight_7_4);
    this.load.image('sheep-left-8-1', sheepLeft_8_1);
    this.load.image('sheep-left-8-2', sheepLeft_8_2);
    this.load.image('sheep-left-8-3', sheepLeft_8_3);
    this.load.image('sheep-left-8-4', sheepLeft_8_4);
    this.load.image('sheep-right-8-1', sheepRight_8_1);
    this.load.image('sheep-right-8-2', sheepRight_8_2);
    this.load.image('sheep-right-8-3', sheepRight_8_3);
    this.load.image('sheep-right-8-4', sheepRight_8_4);
    this.load.image('sheep-left-9-1', sheepLeft_9_1);
    this.load.image('sheep-left-9-2', sheepLeft_9_2);
    this.load.image('sheep-left-9-3', sheepLeft_9_3);
    this.load.image('sheep-left-9-4', sheepLeft_9_4);
    this.load.image('sheep-right-9-1', sheepRight_9_1);
    this.load.image('sheep-right-9-2', sheepRight_9_2);
    this.load.image('sheep-right-9-3', sheepRight_9_3);
    this.load.image('sheep-right-9-4', sheepRight_9_4);
    this.load.image('sheep-left-10-1', sheepLeft_10_1);
    this.load.image('sheep-left-10-2', sheepLeft_10_2);
    this.load.image('sheep-left-10-3', sheepLeft_10_3);
    this.load.image('sheep-left-10-4', sheepLeft_10_4);
    this.load.image('sheep-right-10-1', sheepRight_10_1);
    this.load.image('sheep-right-10-2', sheepRight_10_2);
    this.load.image('sheep-right-10-3', sheepRight_10_3);
    this.load.image('sheep-right-10-4', sheepRight_10_4);
    this.load.image('sheep-left-11-1', sheepLeft_11_1);
    this.load.image('sheep-left-11-2', sheepLeft_11_2);
    this.load.image('sheep-left-11-3', sheepLeft_11_3);
    this.load.image('sheep-left-11-4', sheepLeft_11_4);
    this.load.image('sheep-right-11-1', sheepRight_11_1);
    this.load.image('sheep-right-11-2', sheepRight_11_2);
    this.load.image('sheep-right-11-3', sheepRight_11_3);
    this.load.image('sheep-right-11-4', sheepRight_11_4);
    this.load.image('sheep-left-12-1', sheepLeft_12_1);
    this.load.image('sheep-left-12-2', sheepLeft_12_2);
    this.load.image('sheep-left-12-3', sheepLeft_12_3);
    this.load.image('sheep-left-12-4', sheepLeft_12_4);
    this.load.image('sheep-right-12-1', sheepRight_12_1);
    this.load.image('sheep-right-12-2', sheepRight_12_2);
    this.load.image('sheep-right-12-3', sheepRight_12_3);
    this.load.image('sheep-right-12-4', sheepRight_12_4);
    this.load.image('tail', tail);
    this.load.image('pixel', pixel);
    this.load.image('sheep-vertical-border', verticalBorder);
    this.load.image('sheep-horizontal-border-1', horizontalBorder1);
    this.load.image('sheep-horizontal-border-2', horizontalBorder2);
    this.load.image('sheep-horizontal-border-3', horizontalBorder3);
    this.load.image('tutor-merging', tutorMerging);
    this.load.image('gift', gift);
    this.load.image('shave-status', shaveStatus);
    this.load.image('offline', offline);
    this.load.image('arrow', arrow);
    this.load.image('tutor-btn', tutorBtn);
    this.load.image('сurrency-bg', сurrencyBg);
    this.load.image('heart', heart);
    this.load.image('calendar', calendar);
    this.load.image('ad-icon', adIcon);
    this.load.image('bg-ad', bgAd);
    this.load.image('big-btn-green', bigButtonGreen);
    this.load.image('starterpack-icon', starterpackIcon);
    this.load.image('firework1', firework1);
    this.load.image('firework2', firework2);
    this.load.image('firework3', firework3);
    this.load.image('fireworkBg', fireworkBg);
    this.load.image('loading-spinner', loadingSpinner);
    this.load.image('farmer', farmer);
    this.load.image('white-pixel', whitePixel);
    this.load.image('scroll-arrow', scrollArrow);
  }
  
  
  public create(): void {
    this.loadingReady = true;
  }

  
  public update(): void {

    if (this.loadingReady && this.userReady) {

      if (this.socket) {

        let loadTime: number = Math.round(new Date().getTime() / 1000) - this.loadTime;
        let sizes = document.body.clientWidth + ' * ' + document.body.clientHeight;

        this.state.socket.io.emit('updateSession', {
          user_id: this.state.user.id,
          hash: this.state.user.hash,
          screen_size: sizes,
          loadTime: loadTime
        });

        // подрубаем амплитуду
        const Amplitude = this.state.amplitude;
        const identify = new Amplitude.Identify()
          .set('diamond_balance', this.state.user.diamonds)
          .set('user_id', this.state.user.id)
        Amplitude.getInstance().identify(identify);
        // Amplitude.getInstance().logEvent('load_time', {
        //   seconds: loadTime
        // });

      }

      this.userReady = false;
      this.loadingReady = false;

      // считаем общее время отсутсвия
      this.startTime = Math.round(new Date().getTime() / 1000) - this.startTime;
      this.state.offlineTime += this.startTime;
      
      this.scene.stop();
      this.scene.start('Sheep', this.state); // сцена с овцами
      this.scene.start('SheepBars', this.state); // сцена с барами
      this.scene.start('Preload', this.state); // сцена с подзагрузкой

    }

  }
  
  public loadUser(): void {

    axios.post(process.env.API + '/loadData', {
      hash: this.state.user.hash
    }).then((response) => {

      // checkStorage(response.data.user.hash);

      // let localSaveCounter: number = 0;

      // if (localStorage.userSheep) {
      //   let user: IuserSheep = JSON.parse(localStorage.userSheep);
      //   if (typeof user.autosaveCounter === 'number') localSaveCounter = user.autosaveCounter;
      // }

      // if (response.data.user.sheepSaveCounter >= localSaveCounter) {

        // общие настройки
        this.state.autoSaveSpeed = response.data.settings.general.autoSaveSpeed;
        this.state.maxMerginTime = response.data.settings.general.maxMerginTime;
        this.state.herdBoostSpeedAnimal = response.data.settings.general.herdBoostSpeedAnimal;
        this.state.herdBoostTime = response.data.settings.general.herdBoostTime;
        this.state.herdBoostPrice = response.data.settings.general.herdBoostPrice;
        this.state.herdBoostDelay = response.data.settings.general.herdBoostDelay;
        this.state.packages = response.data.settings.packages;
          
        // массив с настройками для овечей фермы

        const sheepSettings: IsheepSettings = {
          sheepBadPercent: response.data.settings.sheep.badPercent,
          sheepPrice: response.data.settings.sheep.price,
          territoriesSheepSettings: response.data.settings.sheep.territoriesSettings,
          sheepSettings: response.data.settings.sheep.sheepSettings,
          territoriesSheepPrice: response.data.settings.sheep.territoriesPrice,
          sheepFairLevels: response.data.settings.sheep.fairs,
          sheepParts: response.data.settings.sheep.parts,
          buyBetterBreedSheep: response.data.settings.sheep.buyBetterBreed,
          doubledСollectorPrice: response.data.settings.sheep.doubledСollectorPrice,
          collectorPrice4: response.data.settings.sheep.collectorPrice4,
          collectorPrice12: response.data.settings.sheep.collectorPrice12,
          unlockCollector4: response.data.settings.sheep.unlockCollector4,
          unlockCollector12: response.data.settings.sheep.unlockCollector12,
          sheepDiamondsTime: response.data.settings.sheep.diamondAnimalTime,
          feedBoostPrice: response.data.settings.sheep.feedBoostPrice,
        }
        this.state.sheepSettings = sheepSettings;

        const sheep: Isheep[] = [];

        for (let i in response.data.user.sheep) {
          
          const lamb = response.data.user.sheep[i];
          sheep.push({
            _id: lamb._id,
            type: lamb.type,
            wool: lamb.wool,
            x: lamb.x,
            y: lamb.y,
            counter: lamb.counter,
            diamond: lamb.diamond,
            vector: lamb.vector
          });

        }
      
        const sheepTerritories: Iterritories[] = [];
        
        for (let i in response.data.user.sheep_territories) {

          let territory = response.data.user.sheep_territories[i];

          if (territory.block === 0 && territory.position === 1) territory.type = 7;
          if (territory.block === 0 && territory.position === 2) territory.type = 6;
          
          sheepTerritories.push({
            _id: territory._id,
            block: territory.block + 1,
            position: territory.position,
            type: territory.type,
            volume: territory.volume,
            improve: territory.improve,
            money: territory.money
          });
        }

        if (sheepTerritories.length === 0) {
          for (let i in basicTerritories) {

            let territory = basicTerritories[i];
  
            if (territory.block === 0 && territory.position === 1) territory.type = 7;
            if (territory.block === 0 && territory.position === 2) territory.type = 6;
            
            sheepTerritories.push({
              _id: territory._id,
              block: territory.block,
              position: territory.position,
              type: territory.type,
              volume: territory.volume,
              improve: territory.improve,
              money: territory.money
            });
          }
        }
        
        const user: Iuser = {
          diamonds: response.data.user.diamonds,
          id: response.data.user._id,
          xp: response.data.user.xp,
          hash: response.data.user.hash,
          login: response.data.user.login,
          counter: response.data.user.counter,
          mail: response.data.user.mail,
          level: response.data.user.level,
          additionalTutorial: response.data.user.additional_tutorial,
          takenReward: response.data.user.taken_reward,
          status: response.data.user.status,
          statuses: response.data.user.statuses,
          starterpack: response.data.user.starterpack,
          boosts: response.data.user.boosts,          
        }

        const userSheep: IuserSheep = {
          money: response.data.user.money,
          fair: response.data.user.sheep_fair,
          part: response.data.user.sheep_part,
          countSheep: response.data.user.count_sheep,
          collector: response.data.user.shaver_time,
          collectorLevel: response.data.user.sheepCollectorLevel,
          collectorTakenTime: response.data.user.shaver_time,
          diamondAnimalTime: response.data.user.diamonds_sheep_time,
          tutorial: response.data.user.tutor,
          autosaveCounter: response.data.user.sheepSaveCounter,
          diamondAnimalAd: response.data.user.diamonds_sheep_ad,
          takenHerdBoost: response.data.user.takenHerdBoostSheep,
          feedBoostTime: response.data.user.feedBoostTimeSheep,
        }

        const Amplitude = this.state.amplitude;
        const identify = new Amplitude.Identify().set('CatcherSheep', userSheep.collectorLevel);
        Amplitude.getInstance().identify(identify);

        if (response.data.user.tutor === 0) {
          this.state.amplitude.getInstance().logEvent('tutor_before_load', {});
        }

        const sheepTasks: Itasks[] = [];

        for (let i in tasks) if (tasks[i].farm === 1) sheepTasks.push(tasks[i]);
        for (let i in response.data.user.sheep_tasks) {

          let usersTask = response.data.user.sheep_tasks[i];
          let task = tasks.find((task: Itasks) => task.id === usersTask.task_id);
          if (task) {
            task.done = usersTask.done;
            task.got_awarded = usersTask.got_awarded;
            task.progress = usersTask.progress;
          }

        }
        this.state.sheepCollectorSettings = response.data.settings.sheep.collectorSettings;
        this.state.dailyAwards = response.data.user.dailyAwards;
        this.state.newbieTime = response.data.progress.newbieTime;
        this.state.daily = response.data.progress.daily;
        this.state.offlineTime = response.data.progress.sheepOfflineTime;
        this.state.timeToNewDay = response.data.progress.timeToNewDay;
        const progress: Iprogress = {
          sheep: {
            part: response.data.user.sheep_part,
            max: response.data.settings.sheep.parts.length,
            open: true,
            price: response.data.settings.farms[0].price,
            unlock: response.data.settings.farms[0].open,
            donate: response.data.settings.farms[0].donate,
            collector: response.data.user.shaver_time,
            offlineTime: response.data.progress.sheepOfflineTime,
          },
          chicken: {
            part: response.data.user.chicken_part,
            max: response.data.settings.chicken.parts.length,
            open: response.data.user.chicken_part > 0,
            price: response.data.settings.farms[1].price,
            unlock: response.data.settings.farms[1].open,
            donate: response.data.settings.farms[1].donate,
            collector: response.data.user.chicken_collector,
            offlineTime: response.data.progress.chickenOfflineTime,
          },
          cow: {
            part: response.data.user.cow_part,
            max: response.data.settings.cow.parts.length,
            open: response.data.user.cow_part > 0,
            price: response.data.settings.farms[2].price,
            unlock: response.data.settings.farms[2].open,
            donate: response.data.settings.farms[2].donate,
            collector: response.data.user.cow_collector,
            offlineTime: response.data.progress.cowOfflineTime,
          },
          event: {
            eventPoints: response.data.user.eventPoints,
            startTime: response.data.progress.event.startTime,
            endTime: response.data.progress.event.endTime,
            open: response.data.settings.event.open,
            type: response.data.settings.event.type,
          }
        }
        this.state.progress = progress;
        this.state.sheepTerritories = sheepTerritories;
        this.state.sheep = sheep;
        this.state.user = user;
        this.state.userSheep = userSheep;
        this.state.sheepTasks = sheepTasks;
        this.state.farm = 'Sheep';
        this.state.nativeCounter = [0, 0, 0, 0];
        this.userReady = true;
      // } else {
      //   this.loadSheep(response.data.user.counter);
      // }

    })
    // .catch(() => {
    //   this.loadSheep();
    // });

    localStorage.farm = 'Sheep';
  }
  
}

export default SheepPreload;
