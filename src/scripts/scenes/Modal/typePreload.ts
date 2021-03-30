let partProgress: any = require("./../../../assets/images/modal/part-progress.png");
let newbieBg: any = require("./../../../assets/images/daily/newbie-bg.png");
let newbieDay0: any = require("./../../../assets/images/daily/newbie-day-0.png");
let newbieDay1: any = require("./../../../assets/images/daily/newbie-day-1.png");
let newbieDay2: any = require("./../../../assets/images/daily/newbie-day-2.png");
let newbieDay3: any = require("./../../../assets/images/daily/newbie-day-3.png");
let newbieDay4: any = require("./../../../assets/images/daily/newbie-day-4.png");
let newbieDay5: any = require("./../../../assets/images/daily/newbie-day-5.png");
let newbieDay6: any = require("./../../../assets/images/daily/newbie-day-6.png");
let newbieDay7: any = require("./../../../assets/images/daily/newbie-day-7.png");
let dayYellow: any = require("./../../../assets/images/daily/day-yellow.png");
let dayPurple: any = require("./../../../assets/images/daily/day-purple.png");
let dayRed: any = require("./../../../assets/images/daily/day-red.png");
let awardReceived: any = require("./../../../assets/images/daily/award-received.png");
let donateBg: any = require("./../../../assets/images/modal/donate.png");
let doneChapterButton: any = require("./../../../assets/images/modal/done-chapter-button.png");
let dailyBg: any = require("./../../../assets/images/modal/daily-bg.png");
let middleButton: any = require("./../../../assets/images/modal/middle-button.png");
let awardBg: any = require("./../../../assets/images/icons/award-bg.png");
let achievementDaily: any = require("./../../../assets/images/modal/achievement-daily.png");
let flashDaily: any = require("./../../../assets/images/modal/flash-daily.png");
let doneChapter: any = require("./../../../assets/images/modal/done-chapter.png");
let pbChapterAnimal: any = require("./../../../assets/images/modal/pb-chapter-modal.png");
let greenProgress: any = require("./../../../assets/images/modal/green-progress.png");
let farmer: any = require("./../../../assets/images/farmer.png");
// let tasksWindowSide: any = require("./../../../assets/images/modal/tasks-window-side.png"); // old
// let tasksWindowBody: any = require("./../../../assets/images/modal/tasks-window-body.png"); // old
let tasksTop: any = require("./../../../assets/images/modal/tasks-top.png");
let tasksMiddle: any = require("./../../../assets/images/modal/tasks-middle.png");
let tasksBottom: any = require("./../../../assets/images/modal/tasks-bottom.png");
let tasksComplete: any = require("./../../../assets/images/modal/tasks-complete.png");
let tasksUncomplete: any = require("./../../../assets/images/modal/tasks-uncomplete.png");
let tasksReward: any = require("./../../../assets/images/modal/tasks-reward.png");
let tasksBar: any = require("./../../../assets/images/modal/tasks-bar.png");
let tasksClose: any = require("./../../../assets/images/modal/tasks-close.png");
// let pbChapter: any = require("./../../../assets/images/modal/pb-chapter.png");
let bigButtonGrey: any = require("./../../../assets/images/modal/btn_l_lock.png");
let bigButtonBlue: any = require("./../../../assets/images/modal/btn_lb.png");
let bigButtonOrange: any = require("./../../../assets/images/modal/btn_lo.png");
let bigButtonRed: any = require("./../../../assets/images/modal/btn_lr.png");
let bigButtonYellow: any = require("./../../../assets/images/modal/btn_ly.png");
let repositorySellBtn: any = require("./../../../assets/images/modal/repository-sell-btn.png");
let herdBoostRoadSheep: any = require("./../../../assets/images/sheep/herd-boost-road-sheep.png");
let herdBoostRoadChicken: any = require("./../../../assets/images/chicken/herd-boost-road-chicken.png");
let herdBoostRoadCow: any = require("./../../../assets/images/cow/herd-boost-road-cow.png");
let herdBoostRoadEvent: any = require("./../../../assets/images/event/herd-boost-road-event.png");
let badMergingAnimation: any = require("./../../../assets/images/bad-merging-animation.png");
let boostWindowBg: any = require("./../../../assets/images/boost/background.png");
let boostCountdown: any = require("./../../../assets/images/boost/countdown.png");
let boostLeaves: any = require("./../../../assets/images/boost/leaves.png");
let flags: any = require("./../../../assets/images/modal/flags.png");
let chatBackground: any = require("./../../../assets/images/modal/chat-bg.png");
let chatSendBtn: any = require("./../../../assets/images/modal/chat-send-btn.png");
let chatEmojiBtn: any = require("./../../../assets/images/modal/chat-emoji-btn.png");
let autoprogressBG: any = require("./../../../assets/images/event/modal/autoprogress-bg.png");
let purpleBtn: any = require("./../../../assets/images/event/modal/purple-btn.png");
let ratingBG: any = require("./../../../assets/images/event/modal/rating-bg.png");
let ratingRulesBtn: any = require("./../../../assets/images/event/modal/rating-rules-btn.png");
let ratingPriseBtn: any = require("./../../../assets/images/event/modal/rating-price-btn.png");
let ratingPrisePlaces: any = require("./../../../assets/images/event/modal/rating-places.png");
let ratingBGAfter: any = require("./../../../assets/images/event/modal/raiting-bg-after.png");
let unicornStatus: any = require("./../../../assets/images/icons/unicorn-status.png");
let feedBoostChickenIcon: any = require("./../../../assets/images/icons/chicken-feed-boost.png");
let feedBoostCowIcon: any = require("./../../../assets/images/icons/cow-feed-boost.png");
let tile1: any = require("./../../../assets/images/chat-tile-1.png");
let tile2: any = require("./../../../assets/images/chat-tile-2.png");
let corner1: any = require("./../../../assets/images/chat-corner-1.png");
let corner2: any = require("./../../../assets/images/chat-corner-2.png");


export default function typePreload(): void {
    switch (this.state.modal.type) {
      case 1: // системное окно
        this.load.image('unicorn-status', unicornStatus);
        if (this.state.platform !== 'web') {
          this.load.image('avatar', this.state.avatar);
        } else {
          this.load.image('farmer', farmer);
        }
        this.load.image('pb-chapter-modal', pbChapterAnimal);
        this.load.image('big-btn-grey', bigButtonGrey);
        this.load.image('big-btn-blue', bigButtonBlue);
        this.load.image('big-btn-orange', bigButtonOrange);
        this.load.image('big-btn-red', bigButtonRed);
        this.load.image('big-btn-yellow', bigButtonYellow);
        this.load.image('repository-sell-btn', repositorySellBtn);
        this.load.image('green-progress', greenProgress);
        this.load.image('middle-button', middleButton);

        break;
      case 2: // магазин
        // this.load.image('shop-window', shopWindow);
        if (this.state.farm === 'Chicken') this.load.image('chicken-feed-boost-icon', feedBoostChickenIcon); 
        else if (this.state.farm === 'Cow') this.load.image('cow-feed-boost-icon', feedBoostCowIcon); 
        
        break;
      case 3: // окно с заданиями
        this.load.image('tasks-top', tasksTop);
        this.load.image('tasks-middle', tasksMiddle);
        this.load.image('tasks-bottom', tasksBottom);
        this.load.image('tasks-complete', tasksComplete);
        this.load.image('tasks-uncomplete', tasksUncomplete);
        this.load.image('tasks-reward', tasksReward);
        this.load.image('tasks-bar', tasksBar);
        this.load.image('tasks-close', tasksClose);
        this.load.image('part-progress', partProgress);

        break;
      case 4: // ежедневные награды +
        this.load.image('award-bg', awardBg);
        this.load.image('daily-bg', dailyBg);
        this.load.image('achievement-daily', achievementDaily);
        this.load.image('flash-daily', flashDaily);
        this.load.image('middle-button', middleButton);
        break;
      case 5: // следующая глава +
        this.load.image('done-chapter', doneChapter);
        this.load.image('done-chapter-button', doneChapterButton);

        break;
      case 6: // ежедневные награды новичков +
        this.load.image('newbie-bg', newbieBg);
        this.load.image('newbie-day-0', newbieDay0);
        this.load.image('newbie-day-1', newbieDay1);
        this.load.image('newbie-day-2', newbieDay2);
        this.load.image('newbie-day-3', newbieDay3);
        this.load.image('newbie-day-4', newbieDay4);
        this.load.image('newbie-day-5', newbieDay5);
        this.load.image('newbie-day-6', newbieDay6);
        this.load.image('newbie-day-7', newbieDay7);
        this.load.image('day-yellow', dayYellow);
        this.load.image('day-purple', dayPurple);
        this.load.image('day-red', dayRed);
        this.load.image('award-received', awardReceived);
        this.load.image('done-chapter-button', doneChapterButton);
        break;
      case 7: // окно выдачи донатных кристаллов +
        this.load.image('done-chapter-button', doneChapterButton);
        this.load.image('donate', donateBg);
        break;
      case 8: // окно стадного буста +
        if (this.state.farm === 'Sheep') this.load.image('herd-boost-road-sheep', herdBoostRoadSheep);
        if (this.state.farm === 'Chicken') this.load.image('herd-boost-road-chicken', herdBoostRoadChicken);
        if (this.state.farm === 'Cow') this.load.image('herd-boost-road-cow', herdBoostRoadCow);
        if (this.state.farm === 'Event') this.load.image('herd-boost-road-event', herdBoostRoadEvent);
        this.load.image('bad-merging-animation', badMergingAnimation);
        this.load.image('boost-window-bg', boostWindowBg);
        this.load.image('boost-countdown', boostCountdown);
        this.load.image('boost-leaves', boostLeaves);
        this.load.image('flags', flags);
        break;
      case 9: // Чат +
        this.load.image('chat-bg', chatBackground);
        this.load.image('chat-send-btn', chatSendBtn);
        this.load.image('chat-emoji-btn', chatEmojiBtn);
        this.load.image('unicorn-status', unicornStatus);
        this.load.image('tile1', tile1);
        this.load.image('tile2', tile2);
        this.load.image('corner1', corner1);
        this.load.image('corner2', corner2);
        break;
      case 10: // окно автопрогресса ивентовой фермы +
        this.load.image('autoprogress-bg', autoprogressBG);
        this.load.image('purple-btn', purpleBtn);
        break;
      case 11: // окно рейтингов ивентовой фермы +
        this.load.image('rating-bg', ratingBG);
        this.load.image('rating-rules-btn', ratingRulesBtn);
        this.load.image('rating-price-btn', ratingPriseBtn);
        this.load.image('rating-places', ratingPrisePlaces);
        this.load.image('unicorn-status', unicornStatus);

        break;
      case 12: // окно выдачи наград ивентовой фермы +
        this.load.image('raiting-bg-after',ratingBGAfter);
        this.load.image('rating-places', ratingPrisePlaces);
        this.load.image('rating-rules-btn', ratingRulesBtn);
        this.load.image('rating-price-btn', ratingPriseBtn);
        this.load.image('unicorn-status', unicornStatus);

        break;
      default:
        break;
    }
    
}