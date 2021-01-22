import axios from 'axios';
import tasks from '../../tasks';
import Socket from '../../Socket';
import loadSheep from '../../local/loadSheep';
import { checkStorage } from '../../general/basic';

let pixel: any = require("./../../../assets/images/pixel.png");
let bg: any = require("./../../../assets/images/scroll-bg.png");
let top: any = require("./../../../assets/images/sheep/top.png");
let bottom: any = require("./../../../assets/images/sheep/bottom.png");
let topbar: any = require("./../../../assets/images/topbar.png");
let tabbar: any = require("./../../../assets/images/tabbar.png");
let sheepBuyIcon1: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-1.png");
let sheepBuyIcon2: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-2.png");
let sheepBuyIcon3: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-3.png");
let sheepBuyIcon4: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-4.png");
let sheepBuyIcon5: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-5.png");
let sheepBuyIcon6: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-6.png");
let sheepBuyIcon7: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-7.png");
let sheepBuyIcon8: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-8.png");
let sheepBuyIcon9: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-9.png");
let sheepBuyIcon10: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-10.png");
let sheepBuyIcon11: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-11.png");
let sheepBuyIcon12: any = require("./../../../assets/images/sheep/icons/sheep-buy-icon-12.png");
let woolCollector: any = require("./../../../assets/images/sheep/wool-collector.png");
let shop: any = require("./../../../assets/images/icons/shop.png");
let mapIcon: any = require("./../../../assets/images/icons/map.png");
let sandwich: any = require("./../../../assets/images/icons/sandwich.png");
let sandwichClose: any = require("./../../../assets/images/icons/sandwich-close.png");
let profile: any = require("./../../../assets/images/icons/profile.png");
let chat: any = require("./../../../assets/images/icons/chat.png");
let forBuying: any = require("./../../../assets/images/sheep/territories/for-buying.png");
let bought: any = require("./../../../assets/images/sheep/territories/bought.png");
let merging: any = require("./../../../assets/images/sheep/territories/merging.png");
let tent: any = require("./../../../assets/images/sheep/territories/tent.png");
let house: any = require("./../../../assets/images/sheep/territories/house.png");
let ground: any = require("./../../../assets/images/sheep/territories/ground.png");
let repository: any = require("./../../../assets/images/sheep/territories/repository.png");
let repository1: any = require("./../../../assets/images/sheep/territories/repository-1.png");
let repository2: any = require("./../../../assets/images/sheep/territories/repository-2.png");
let repository3: any = require("./../../../assets/images/sheep/territories/repository-3.png");
let repository4: any = require("./../../../assets/images/sheep/territories/repository-4.png");
let grass11: any = require("./../../../assets/images/sheep/territories/grass1-1.png");
let grass12: any = require("./../../../assets/images/sheep/territories/grass1-2.png");
let grass13: any = require("./../../../assets/images/sheep/territories/grass1-3.png");
let grass14: any = require("./../../../assets/images/sheep/territories/grass1-4.png");
let grass15: any = require("./../../../assets/images/sheep/territories/grass1-5.png");
let grass21: any = require("./../../../assets/images/sheep/territories/grass2-1.png");
let grass22: any = require("./../../../assets/images/sheep/territories/grass2-2.png");
let grass23: any = require("./../../../assets/images/sheep/territories/grass2-3.png");
let grass24: any = require("./../../../assets/images/sheep/territories/grass2-4.png");
let grass25: any = require("./../../../assets/images/sheep/territories/grass2-5.png");
let grass31: any = require("./../../../assets/images/sheep/territories/grass3-1.png");
let grass32: any = require("./../../../assets/images/sheep/territories/grass3-2.png");
let grass33: any = require("./../../../assets/images/sheep/territories/grass3-3.png");
let grass34: any = require("./../../../assets/images/sheep/territories/grass3-4.png");
let grass35: any = require("./../../../assets/images/sheep/territories/grass3-5.png");
let grass41: any = require("./../../../assets/images/sheep/territories/grass4-1.png");
let grass42: any = require("./../../../assets/images/sheep/territories/grass4-2.png");
let grass43: any = require("./../../../assets/images/sheep/territories/grass4-3.png");
let grass44: any = require("./../../../assets/images/sheep/territories/grass4-4.png");
let grass45: any = require("./../../../assets/images/sheep/territories/grass4-5.png");
let water11: any = require("./../../../assets/images/sheep/territories/water1-1.png");
let water12: any = require("./../../../assets/images/sheep/territories/water1-2.png");
let water13: any = require("./../../../assets/images/sheep/territories/water1-3.png");
let water14: any = require("./../../../assets/images/sheep/territories/water1-4.png");
let water21: any = require("./../../../assets/images/sheep/territories/water2-1.png");
let water22: any = require("./../../../assets/images/sheep/territories/water2-2.png");
let water23: any = require("./../../../assets/images/sheep/territories/water2-3.png");
let water24: any = require("./../../../assets/images/sheep/territories/water2-4.png");
let water31: any = require("./../../../assets/images/sheep/territories/water3-1.png");
let water32: any = require("./../../../assets/images/sheep/territories/water3-2.png");
let water33: any = require("./../../../assets/images/sheep/territories/water3-3.png");
let water34: any = require("./../../../assets/images/sheep/territories/water3-4.png");
let water41: any = require("./../../../assets/images/sheep/territories/water4-1.png");
let water42: any = require("./../../../assets/images/sheep/territories/water4-2.png");
let water43: any = require("./../../../assets/images/sheep/territories/water4-3.png");
let water44: any = require("./../../../assets/images/sheep/territories/water4-4.png");
let lockTerritory: any = require("./../../../assets/images/lock-territory.png");
let sheep0: any = require("./../../../assets/images/sheep/sheep/sheep0.png");
let sheep1: any = require("./../../../assets/images/sheep/sheep/sheep1.png");
let sheep2: any = require("./../../../assets/images/sheep/sheep/sheep2.png");
let sheep3: any = require("./../../../assets/images/sheep/sheep/sheep3.png");
let sheep4: any = require("./../../../assets/images/sheep/sheep/sheep4.png");
let sheep5: any = require("./../../../assets/images/sheep/sheep/sheep5.png");
let sheep6: any = require("./../../../assets/images/sheep/sheep/sheep6.png");
let sheep7: any = require("./../../../assets/images/sheep/sheep/sheep7.png");
let sheep8: any = require("./../../../assets/images/sheep/sheep/sheep8.png");
let sheep9: any = require("./../../../assets/images/sheep/sheep/sheep9.png");
let sheep10: any = require("./../../../assets/images/sheep/sheep/sheep10.png");
let sheep11: any = require("./../../../assets/images/sheep/sheep/sheep11.png");
let sheep12: any = require("./../../../assets/images/sheep/sheep/sheep12.png");
let wool1: any = require("./../../../assets/images/sheep/wool/wool1.png");
let wool2: any = require("./../../../assets/images/sheep/wool/wool2.png");
let wool3: any = require("./../../../assets/images/sheep/wool/wool3.png");
let wool4: any = require("./../../../assets/images/sheep/wool/wool4.png");
let wool5: any = require("./../../../assets/images/sheep/wool/wool5.png");
let wool6: any = require("./../../../assets/images/sheep/wool/wool6.png");
let wool7: any = require("./../../../assets/images/sheep/wool/wool7.png");
let wool8: any = require("./../../../assets/images/sheep/wool/wool8.png");
let wool9: any = require("./../../../assets/images/sheep/wool/wool9.png");
let wool10: any = require("./../../../assets/images/sheep/wool/wool10.png");
let wool11: any = require("./../../../assets/images/sheep/wool/wool11.png");
let wool12: any = require("./../../../assets/images/sheep/wool/wool12.png");
let mergingAnimation: any = require("./../../../assets/images/merging-animation.png");
let coin: any = require("./../../../assets/images/sheep/icons/money.png");
let diamond: any = require("./../../../assets/images/icons/diamonds.png");
let lock: any = require("./../../../assets/images/icons/lock.png");
let disableSheep: any = require("./../../../assets/images/sheep/sheep/disable-sheep.png");
let house1: any = require("./../../../assets/images/sheep/houses/house-1.png");
let house2: any = require("./../../../assets/images/sheep/houses/house-2.png");
let house3: any = require("./../../../assets/images/sheep/houses/house-3.png");
let house4: any = require("./../../../assets/images/sheep/houses/house-4.png");
let house5: any = require("./../../../assets/images/sheep/houses/house-5.png");
let house6: any = require("./../../../assets/images/sheep/houses/house-6.png");
let house7: any = require("./../../../assets/images/sheep/houses/house-7.png");
let house8: any = require("./../../../assets/images/sheep/houses/house-8.png");
let house9: any = require("./../../../assets/images/sheep/houses/house-9.png");
let house10: any = require("./../../../assets/images/sheep/houses/house-10.png");
let house11: any = require("./../../../assets/images/sheep/houses/house-11.png");
let house12: any = require("./../../../assets/images/sheep/houses/house-12.png");
let house13: any = require("./../../../assets/images/sheep/houses/house-13.png");
let house14: any = require("./../../../assets/images/sheep/houses/house-14.png");
let house15: any = require("./../../../assets/images/sheep/houses/house-15.png");
let house16: any = require("./../../../assets/images/sheep/houses/house-16.png");
let caveDisalble: any = require("./../../../assets/images/cave/cave-disable.png");
let caveReady: any = require("./../../../assets/images/cave/cave-ready.png");
let caveWait: any = require("./../../../assets/images/cave/cave-wait.png");
let caveTimer: any = require("./../../../assets/images/cave/cave-timer.png");
let chapter1: any = require("./../../../assets/images/sheep/chapters/chapter1.png");
let chapter2: any = require("./../../../assets/images/sheep/chapters/chapter2.png");
let chapter3: any = require("./../../../assets/images/sheep/chapters/chapter3.png");
let chapter4: any = require("./../../../assets/images/sheep/chapters/chapter4.png");
let chapter5: any = require("./../../../assets/images/sheep/chapters/chapter5.png");
let chapter6: any = require("./../../../assets/images/sheep/chapters/chapter6.png");
let chapter7: any = require("./../../../assets/images/sheep/chapters/chapter7.png");
let chapter8: any = require("./../../../assets/images/sheep/chapters/chapter8.png");
let chapter9: any = require("./../../../assets/images/sheep/chapters/chapter9.png");
let chapter10: any = require("./../../../assets/images/sheep/chapters/chapter10.png");
let chapter11: any = require("./../../../assets/images/sheep/chapters/chapter11.png");
let chapter12: any = require("./../../../assets/images/sheep/chapters/chapter12.png");
let chapter13: any = require("./../../../assets/images/sheep/chapters/chapter13.png");
let chapter14: any = require("./../../../assets/images/sheep/chapters/chapter14.png");
let chapter15: any = require("./../../../assets/images/sheep/chapters/chapter15.png");
let chapter16: any = require("./../../../assets/images/sheep/chapters/chapter16.png");
let forest1: any = require("./../../../assets/images/sheep/territories/forest-1.png");
let forest2: any = require("./../../../assets/images/sheep/territories/forest-2.png");
let forest3: any = require("./../../../assets/images/sheep/territories/forest-3.png");
let forest4: any = require("./../../../assets/images/sheep/territories/forest-4.png");
let forest5: any = require("./../../../assets/images/sheep/territories/forest-5.png");
let forest6: any = require("./../../../assets/images/sheep/territories/forest-6.png");
let forest7: any = require("./../../../assets/images/sheep/territories/forest-7.png");
let forest8: any = require("./../../../assets/images/sheep/territories/forest-8.png");
let star: any = require("./../../../assets/images/icons/star.png");
let completed: any = require("./../../../assets/images/icons/completed.png");
let littleButton: any = require("./../../../assets/images/modal/little-button.png");
let taskIcon1: any = require("./../../../assets/images/sheep/tasks/task-icon-1.png");
let taskIcon2: any = require("./../../../assets/images/sheep/tasks/task-icon-2.png");
let taskIcon3: any = require("./../../../assets/images/sheep/tasks/task-icon-3.png");
let taskIcon4: any = require("./../../../assets/images/sheep/tasks/task-icon-4.png");
let taskIcon5: any = require("./../../../assets/images/sheep/tasks/task-icon-5.png");
let taskIcon6: any = require("./../../../assets/images/sheep/tasks/task-icon-6.png");
let taskIcon7: any = require("./../../../assets/images/sheep/tasks/task-icon-7.png");
let taskIcon8: any = require("./../../../assets/images/sheep/tasks/task-icon-8.png");
let taskIcon9: any = require("./../../../assets/images/sheep/tasks/task-icon-9.png");
let taskIcon10: any = require("./../../../assets/images/sheep/tasks/task-icon-10.png");
let taskIcon11: any = require("./../../../assets/images/sheep/tasks/task-icon-11.png");
let taskIcon12: any = require("./../../../assets/images/sheep/tasks/task-icon-12.png");
let taskIcon13: any = require("./../../../assets/images/sheep/tasks/task-icon-13.png");
let taskIcon14: any = require("./../../../assets/images/sheep/tasks/task-icon-14.png");
let taskIcon15: any = require("./../../../assets/images/sheep/tasks/task-icon-15.png");
let taskIcon16: any = require("./../../../assets/images/sheep/tasks/task-icon-16.png");
let taskIcon17: any = require("./../../../assets/images/sheep/tasks/task-icon-17.png");
let taskIcon18: any = require("./../../../assets/images/sheep/tasks/task-icon-18.png");
let taskIcon19: any = require("./../../../assets/images/sheep/tasks/task-icon-19.png");
let taskIcon20: any = require("./../../../assets/images/sheep/tasks/task-icon-20.png");
let taskIcon21: any = require("./../../../assets/images/sheep/tasks/task-icon-21.png");
let taskIcon22: any = require("./../../../assets/images/sheep/tasks/task-icon-22.png");
let taskIcon23: any = require("./../../../assets/images/sheep/tasks/task-icon-23.png");
let taskIcon24: any = require("./../../../assets/images/sheep/tasks/task-icon-24.png");
let taskIcon25: any = require("./../../../assets/images/sheep/tasks/task-icon-25.png");
let taskIcon26: any = require("./../../../assets/images/sheep/tasks/task-icon-26.png");
let taskIcon27: any = require("./../../../assets/images/sheep/tasks/task-icon-27.png");
let taskIcon28: any = require("./../../../assets/images/sheep/tasks/task-icon-28.png");
let taskIcon29: any = require("./../../../assets/images/sheep/tasks/task-icon-29.png");
let taskIcon30: any = require("./../../../assets/images/sheep/tasks/task-icon-30.png");
let taskIcon31: any = require("./../../../assets/images/sheep/tasks/task-icon-31.png");
let plus: any = require("./../../../assets/images/icons/plus.png");
let sheepLeaves: any = require("./../../../assets/images/sheep/sheep-leaves.png");
let greenBalanceBg: any = require("./../../../assets/images/balance/green-balance-bg.png");
let redBalanceBg: any = require("./../../../assets/images/balance/red-balance-bg.png");
let resourceEnough: any = require("./../../../assets/images/balance/resource-enough.png");
let resourceProblem: any = require("./../../../assets/images/balance/resource-problem.png");
let grassBalance: any = require("./../../../assets/images/balance/grass-balance.png");
let waterBalance: any = require("./../../../assets/images/balance/water-balance.png");
let sheepLeft_0_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-0-2.png");
let sheepLeft_0_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-0-3.png");
let sheepLeft_0_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-0-4.png");
let sheepRight_0_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-0-2.png");
let sheepRight_0_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-0-3.png");
let sheepRight_0_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-0-4.png");
let sheepLeft_1_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-1-1.png");
let sheepLeft_1_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-1-2.png");
let sheepLeft_1_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-1-3.png");
let sheepLeft_1_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-1-4.png");
let sheepRight_1_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-1-1.png");
let sheepRight_1_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-1-2.png");
let sheepRight_1_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-1-3.png");
let sheepRight_1_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-1-4.png");
let sheepLeft_2_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-2-1.png");
let sheepLeft_2_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-2-2.png");
let sheepLeft_2_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-2-3.png");
let sheepLeft_2_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-2-4.png");
let sheepRight_2_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-2-1.png");
let sheepRight_2_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-2-2.png");
let sheepRight_2_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-2-3.png");
let sheepRight_2_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-2-4.png");
let sheepLeft_3_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-3-1.png");
let sheepLeft_3_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-3-2.png");
let sheepLeft_3_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-3-3.png");
let sheepLeft_3_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-3-4.png");
let sheepRight_3_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-3-1.png");
let sheepRight_3_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-3-2.png");
let sheepRight_3_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-3-3.png");
let sheepRight_3_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-3-4.png");
let sheepLeft_4_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-4-1.png");
let sheepLeft_4_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-4-2.png");
let sheepLeft_4_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-4-3.png");
let sheepLeft_4_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-4-4.png");
let sheepRight_4_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-4-1.png");
let sheepRight_4_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-4-2.png");
let sheepRight_4_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-4-3.png");
let sheepRight_4_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-4-4.png");
let sheepLeft_5_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-5-1.png");
let sheepLeft_5_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-5-2.png");
let sheepLeft_5_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-5-3.png");
let sheepLeft_5_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-5-4.png");
let sheepRight_5_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-5-1.png");
let sheepRight_5_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-5-2.png");
let sheepRight_5_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-5-3.png");
let sheepRight_5_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-5-4.png");
let sheepLeft_6_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-6-1.png");
let sheepLeft_6_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-6-2.png");
let sheepLeft_6_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-6-3.png");
let sheepLeft_6_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-6-4.png");
let sheepRight_6_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-6-1.png");
let sheepRight_6_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-6-2.png");
let sheepRight_6_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-6-3.png");
let sheepRight_6_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-6-4.png");
let sheepLeft_7_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-7-1.png");
let sheepLeft_7_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-7-2.png");
let sheepLeft_7_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-7-3.png");
let sheepLeft_7_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-7-4.png");
let sheepRight_7_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-7-1.png");
let sheepRight_7_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-7-2.png");
let sheepRight_7_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-7-3.png");
let sheepRight_7_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-7-4.png");
let sheepLeft_8_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-8-1.png");
let sheepLeft_8_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-8-2.png");
let sheepLeft_8_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-8-3.png");
let sheepLeft_8_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-8-4.png");
let sheepRight_8_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-8-1.png");
let sheepRight_8_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-8-2.png");
let sheepRight_8_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-8-3.png");
let sheepRight_8_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-8-4.png");
let sheepLeft_9_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-9-1.png");
let sheepLeft_9_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-9-2.png");
let sheepLeft_9_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-9-3.png");
let sheepLeft_9_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-9-4.png");
let sheepRight_9_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-9-1.png");
let sheepRight_9_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-9-2.png");
let sheepRight_9_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-9-3.png");
let sheepRight_9_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-9-4.png");
let sheepLeft_10_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-10-1.png");
let sheepLeft_10_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-10-2.png");
let sheepLeft_10_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-10-3.png");
let sheepLeft_10_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-10-4.png");
let sheepRight_10_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-10-1.png");
let sheepRight_10_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-10-2.png");
let sheepRight_10_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-10-3.png");
let sheepRight_10_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-10-4.png");
let sheepLeft_11_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-11-1.png");
let sheepLeft_11_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-11-2.png");
let sheepLeft_11_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-11-3.png");
let sheepLeft_11_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-11-4.png");
let sheepRight_11_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-11-1.png");
let sheepRight_11_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-11-2.png");
let sheepRight_11_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-11-3.png");
let sheepRight_11_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-11-4.png");
let sheepLeft_12_1: any = require("./../../../assets/images/sheep/sheep/sheep-left-12-1.png");
let sheepLeft_12_2: any = require("./../../../assets/images/sheep/sheep/sheep-left-12-2.png");
let sheepLeft_12_3: any = require("./../../../assets/images/sheep/sheep/sheep-left-12-3.png");
let sheepLeft_12_4: any = require("./../../../assets/images/sheep/sheep/sheep-left-12-4.png");
let sheepRight_12_1: any = require("./../../../assets/images/sheep/sheep/sheep-right-12-1.png");
let sheepRight_12_2: any = require("./../../../assets/images/sheep/sheep/sheep-right-12-2.png");
let sheepRight_12_3: any = require("./../../../assets/images/sheep/sheep/sheep-right-12-3.png");
let sheepRight_12_4: any = require("./../../../assets/images/sheep/sheep/sheep-right-12-4.png");
let tail: any = require("./../../../assets/images/tail.png");
let verticalBorder: any = require("./../../../assets/images/sheep/territories/vertical-border.png");
let horizontalBorder1: any = require("./../../../assets/images/sheep/territories/horizontal-border-1.png");
let horizontalBorder2: any = require("./../../../assets/images/sheep/territories/horizontal-border-2.png");
let horizontalBorder3: any = require("./../../../assets/images/sheep/territories/horizontal-border-3.png");
let tutorMerging: any = require("./../../../assets/images/sheep/tutor-merging.png");
let gift: any = require("./../../../assets/images/icons/gift.png");
let firework250: any = require("./../../../assets/images/animations/firework250.png");
let shaveStatus: any = require("./../../../assets/images/sheep/icons/shave-status.png");
let offline: any = require("./../../../assets/images/icons/offline.png");
let arrow: any = require("./../../../assets/images/arrow.png");
let tutorBtn: any = require("./../../../assets/images/modal/tutor-btn.png");
let сurrencyBg: any = require("./../../../assets/images/сurrency-bg.png");
let heart: any = require("./../../../assets/images/icons/heart.png");
let calendar: any = require("./../../../assets/images/calendar.png");
let adIcon: any = require("./../../../assets/images/icons/ad-icon.png");
let bgAd: any = require("./../../../assets/images/icons/bg-ad.png");
let bigButtonGreen: any = require("./../../../assets/images/modal/btn_lg.png");


class SheepPreload extends Phaser.Scene {

  public lang: string; // индекс языка
  public state: Istate;
  public userReady: boolean;
  public loadingReady: boolean;
  public socket: boolean;
  public loadTime: number;
  public startTime: number;

  public loadSheep = loadSheep.bind(this);

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

    let loading: string = this.state.lang.loading;

    // экран загрузки
    let height: number = 200; // параметр для высоты окна
    let text = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY + 11, '0%', {
      font: '37px Shadow',
      color: '#1F5B06'
    }).setDepth(1).setOrigin(0.5, 0.5);

    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - Math.floor(height / 2), 'header-syst')
      .setOrigin(0.5, 1);
    this.add.image(this.cameras.main.centerX, this.cameras.main.centerY + Math.floor(height / 2), 'bottom-syst')
      .setOrigin(0.5, 0);
    this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY, 614, height + 2, "mid-syst")
      .setOrigin(0.5, 0.5);
    
    this.add.text(this.cameras.main.centerX, this.cameras.main.centerY - Math.floor(height / 2) - 22, loading, {
      font: '37px Shadow',
      color: '#F9D48D'
    }).setDepth(1).setOrigin(0.5, 1);

    this.add.image(120, this.cameras.main.centerY + 20, 'pb-empty-corner');
    this.add.image(600, this.cameras.main.centerY + 20, 'pb-empty-corner').setScale(-1, 1);
    this.add.tileSprite(this.cameras.main.centerX, this.cameras.main.centerY + 20, 436, 130, 'pb-empty-mid');
    
    let leftCorner = this.add.image(120, this.cameras.main.centerY + 20, 'pb-full-corner')
      .setAlpha(0);
    let rightCorner = this.add.image(600, this.cameras.main.centerY + 20, 'pb-full-corner')
      .setFlip(true, false)
      .setAlpha(0);
    let progress = this.add.tileSprite(142, this.cameras.main.centerY + 20, 0, 130, 'pb-full-mid')
      .setOrigin(0, 0.5);

    // прогресс загрузки
    this.load.on('progress', (value: number): void => {

      let percent: number = Math.round(value * 100);

      if (percent >= 5 && leftCorner.alpha === 0) leftCorner.setAlpha(1);
      if (percent >= 95 && rightCorner.alpha === 0) {
        progress.setDisplaySize(436, 130);
        rightCorner.setAlpha(1);
      }

      if (percent > 5 && percent < 95) {

        let onePercent: number = 420 / 90;
        let bar = Math.round(percent * onePercent); 
        progress.setDisplaySize(bar, 130);
        
      }
      
      text.setText(percent + '%');

    });
    
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
    this.load.image('chat', chat);
    this.load.image('sheep-for-buying', forBuying);
    this.load.image('sheep-bought', bought);
    this.load.image('sheep-merging', merging);
    this.load.image('sheep-tent', tent);
    this.load.image('sheep-house', house);
    this.load.image('sheep-ground', ground);
    this.load.image('sheep-repository', repository);
    this.load.image('sheep-repository-1', repository1);
    this.load.image('sheep-repository-2', repository2);
    this.load.image('sheep-repository-3', repository3);
    this.load.image('sheep-repository-4', repository4);
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
    this.load.image('sheep-house-1', house1);
    this.load.image('sheep-house-2', house2);
    this.load.image('sheep-house-3', house3);
    this.load.image('sheep-house-4', house4);
    this.load.image('sheep-house-5', house5);
    this.load.image('sheep-house-6', house6);
    this.load.image('sheep-house-7', house7);
    this.load.image('sheep-house-8', house8);
    this.load.image('sheep-house-9', house9);
    this.load.image('sheep-house-10', house10);
    this.load.image('sheep-house-11', house11);
    this.load.image('sheep-house-12', house12);
    this.load.image('sheep-house-13', house13);
    this.load.image('sheep-house-14', house14);
    this.load.image('sheep-house-15', house15);
    this.load.image('sheep-house-16', house16);
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
    this.load.spritesheet('firework250', firework250, { frameWidth: 250, frameHeight: 250 });
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

    axios.post(process.env.API + '/sheep/loadData', {
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
        this.state.autoSaveSpeed = response.data.autoSaveSpeed;
        this.state.maxMerginTime = response.data.maxMerginTime;
        this.state.packages = response.data.packages;
        this.state.herdBoostSpeedAnimal = response.data.herdBoostSpeedAnimal;
        this.state.herdBoostTime = response.data.herdBoostTime;
        this.state.herdBoostPrice = response.data.herdBoostPrice;
        this.state.herdBoostDelay = response.data.herdBoostDelay;

        // массив с настройками для овечей фермы
        const sheepSettings: IsheepSettings = {
          sheepBadPercent: response.data.sheepBadPercent,
          sheepPrice: response.data.sheepPrice,
          territoriesSheepSettings: response.data.territoriesSheepSettings,
          sheepSettings: response.data.sheepSettings,
          territoriesSheepPrice: response.data.territoriesSheepPrice,
          sheepFairLevels: response.data.sheepFairLevels,
          sheepParts: response.data.sheepParts,
          buyBetterBreedSheep: response.data.buyBetterBreedSheep,
          unlockCollector3: response.data.unlockSheepCollector3,
          unlockCollector8: response.data.unlockSheepCollector8,
          unlockCollector15: response.data.unlockSheepCollector15,
          unlockCollector24: response.data.unlockSheepCollector24,
          collectorPrice3: response.data.sheepCollectorPrice3,
          collectorPrice8: response.data.sheepCollectorPrice8,
          collectorPrice15: response.data.sheepCollectorPrice15,
          collectorPrice24: response.data.sheepCollectorPrice24,
          doubledСollectorPrice: response.data.doubledСollectorPrice,
          collectorPrice4: response.data.collectorPrice4,
          collectorPrice12: response.data.collectorPrice12,
          unlockCollector4: response.data.unlockCollector4,
          unlockCollector12: response.data.unlockCollector12,
          sheepDiamondsTime: response.data.sheepDiamondsTime
        }

        this.state.sheepSettings = sheepSettings;

        const sheep: Isheep[] = [];

        for (let i in response.data.sheep) {
          
          let lamb = response.data.sheep[i];
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

        for (let i in response.data.territories) {

          let territory = response.data.territories[i];

          if (territory.block === 0 && territory.position === 1) territory.type = 7;
          if (territory.block === 0 && territory.position === 2) territory.type = 6;
          if (territory.type === 1 && territory.time > 0) territory.type = 0;
          // territory.time - теперь метка от старого движка. В новом, тип территории остается как в базе
          
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
        }

        const Amplitude = this.state.amplitude;
        const identify = new Amplitude.Identify().set('CatcherSheep', userSheep.collectorLevel);
        Amplitude.getInstance().identify(identify);

        if (response.data.user.tutor === 0) {
          this.state.amplitude.getInstance().logEvent('tutor_before_load', {});
        }

        const sheepTasks: Itasks[] = [];

        for (let i in tasks) if (tasks[i].farm === 1) sheepTasks.push(tasks[i]);
        for (let i in response.data.tasks) {

          let usersTask = response.data.tasks[i];
          let task = tasks.find((task: Itasks) => task.id === usersTask.task_id);

          if (task) {
            task.done = usersTask.done;
            task.got_awarded = usersTask.got_awarded;
            task.progress = usersTask.progress;
          }

        }
        
        this.state.timeToHerdBoost = response.data.timeToHerdBoost;
        this.state.sheepCollectorSettings = response.data.collectorSettings;
        this.state.dailyAwards = response.data.dailyAwards;
        this.state.newbieTime = response.data.newbieTime;
        this.state.daily = response.data.daily;
        this.state.offlineTime = response.data.offlineTime;
        this.state.progress = response.data.progress;
        this.state.sheepTerritories = sheepTerritories;
        this.state.sheep = sheep;
        this.state.user = user;
        this.state.userSheep = userSheep;
        this.state.sheepTasks = sheepTasks;
        this.state.farm = 'Sheep';
        this.userReady = true;
        console.log(this.state.timeToHerdBoost);
        console.log(this.state.userSheep.takenHerdBoost);
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
