import { adminMsgAtlas, clanMsgAtlas, foreignMsgAtlas, squareBgAtlas, tabActiveAtlas, tabAtlas, userMsgAtlas } from "../data/atlases";
import assets from "../data/assets";
class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  public state: Istate;

  public readySounds: boolean = false;

  public init(state: Istate): void {
    this.state = state;
  }

  public preload(): void {
    
    this.load.image('diamond', assets.diamond);
    this.load.image('sheepCoin', assets.sheepCoin);
    this.load.image('chickenCoin', assets.chickenCoin);
    this.load.image('cowCoin', assets.cowCoin);
    this.load.image('profile-bg', assets.profileBackground);
    this.load.image('profile-cow-farm', assets.profileCowFarm);
    this.load.image('profile-chicken-farm', assets.profileChickenFarm);
    this.load.image('profile-event-farm', assets.profileEventFarm);
    this.load.image('profile-sticker', assets.profileSticker);
    this.load.image('profile-cow-farm-lock', assets.profileCowFarmLock);
    this.load.image('profile-lock-icon', assets.profileLockIcon);
    this.load.image('profile-event-island', assets.profileEventIsland);
    this.load.image('profile-btn', assets.profileBtn);
    this.load.image('profile-pointer', assets.profilePointer);

    // магазин
    this.load.image('shop-head', assets.shopHead);
    this.load.image('shop-close', assets.shopClose);
    this.load.image('shop-tab-active', assets.shopTabActive);
    this.load.image('shop-tab', assets.shopTab);
    this.load.image('shop-window', assets.shopWindow);
    this.load.image('icon-shop-sheep', assets.iconShopSheep);
    this.load.image('icon-shop-chicken', assets.iconShopChicken);
    this.load.image('icon-shop-cow', assets.iconShopCow);
    this.load.image('icon-shop-boosts', assets.iconShopBoosts);
    this.load.image('bank-package', assets.bankPackage);
    this.load.image('stock-tape', assets.stockTape);
    this.load.image('shop-btn', assets.shopBtn);
    if (this.state.farm === 'Sheep') this.load.image('sheep-money-package', assets.sheepMoneyPackage);
    if (this.state.farm === 'Chicken') this.load.image('chicken-money-package', assets.chickenMoneyPackage);
    if (this.state.farm === 'Cow') this.load.image('cow-money-package', assets.cowMoneyPackage);
    this.load.image('animal-shop-bg', assets.animalShopBg);
    if (this.state.farm === 'Sheep') this.load.image('shop-sheep-wool-collector', assets.shopWoolCollector);
    if (this.state.farm === 'Chicken') this.load.image('shop-chicken-egg-collector', assets.shopEggCollector);
    if (this.state.farm === 'Cow') this.load.image('shop-cow-milk-collector', assets.shopMilkCollector);
    if (this.state.farm === 'Unicorn') this.load.image('icon-shop-event', assets.iconShopEvent);
    if (this.state.farm === 'Unicorn') this.load.image('event-money-package', assets.eventMoneyPackage);
    if (this.state.farm === 'Unicorn') this.load.image('shop-unicorn-resource-collector', assets.shopResourceCollector);
    this.load.image('shop-btn-disable', assets.shopBtnDisable);
    this.load.image('boost-btn', assets.boostBtn);
    this.load.image('boost-btn-disable', assets.boostBtnDisable);
    this.load.image('boost-btn-ad', assets.boostBtnAd);
    this.load.image('level-bg', assets.levelBg);
    this.load.image('boost-bg', assets.boostBg);

    // другие окна
    if (this.state.newbieTime > 0) {
      this.load.image('newbie-bg', assets.newbieBg);
      this.load.image('newbie-day-0', assets.newbieDay0);
      this.load.image('newbie-day-1', assets.newbieDay1);
      this.load.image('newbie-day-2', assets.newbieDay2);
      this.load.image('newbie-day-3', assets.newbieDay3);
      this.load.image('newbie-day-4', assets.newbieDay4);
      this.load.image('newbie-day-5', assets.newbieDay5);
      this.load.image('newbie-day-6', assets.newbieDay6);
      this.load.image('newbie-day-7', assets.newbieDay7);
      this.load.image('day-yellow', assets.dayYellow);
      this.load.image('day-purple', assets.dayPurple);
      this.load.image('day-red', assets.dayRed);
      this.load.image('award-received', assets.awardReceived);
    } else {
      this.load.image('daily-bg', assets.dailyBg);
      this.load.image('achievement-daily', assets.achievementDaily);
      this.load.image('flash-daily', assets.flashDaily);
    }

    this.load.image('donate', assets.donateBg);
    this.load.image('done-chapter-button', assets.doneChapterButton);
    this.load.image('middle-button', assets.middleButton);
    this.load.image('award-bg', assets.awardBg);
    this.load.image('done-chapter', assets.doneChapter);
    this.load.image('pb-chapter-modal', assets.pbChapterAnimal);
    this.load.image('green-progress', assets.greenProgress);
    this.load.image('farmer', assets.farmer);
    // this.load.image('tasks-window-side', assets.tasksWindowSide);
    // this.load.image('tasks-window-body', assets.tasksWindowBody);
    this.load.image('tasks-top', assets.tasksTop);
    this.load.image('tasks-middle', assets.tasksMiddle);
    this.load.image('tasks-bottom', assets.tasksBottom);
    this.load.image('tasks-uncomplite', assets.tasksUncomplete);
    this.load.image('tasks-reward', assets.tasksReward);
    this.load.image('tasks-bar', assets.tasksBar);
    this.load.image('close-window-btn', assets.closeWindowBtn);
    this.load.image('pb-chapter', assets.pbChapter);
    this.load.image('big-btn-grey', assets.bigButtonGrey);
    this.load.image('big-btn-blue', assets.bigButtonBlue);
    this.load.image('big-btn-orange', assets.bigButtonOrange);
    this.load.image('big-btn-red', assets.bigButtonRed);
    this.load.image('big-btn-yellow', assets.bigButtonYellow);
    this.load.image('repository-sell-btn', assets.repositorySellBtn);

    if ((this.state.platform === 'vk' || this.state.platform === 'ok' || this.state.platform === 'ya') && this.state.avatar !== '') {
      this.load.image(`avatar-${this.state.user.id}`, this.state.avatar);
    }

    // буст 'стадо'
    if (this.state.farm === 'Sheep') this.load.image('herd-boost-road-sheep', assets.herdBoostRoadSheep);
    if (this.state.farm === 'Chicken') this.load.image('herd-boost-road-chicken', assets.herdBoostRoadChicken);
    if (this.state.farm === 'Cow') this.load.image('herd-boost-road-cow', assets.herdBoostRoadCow);
    if (this.state.farm === 'Unicorn') this.load.image('herd-boost-road-event', assets.herdBoostRoadEvent);
    this.load.image('bad-merging-animation', assets.badMergingAnimation);
    this.load.image('boost-window-bg', assets.boostWindowBg);
    this.load.image('boost-countdown', assets.boostCountdown);
    this.load.image('boost-leaves', assets.boostLeaves);
    this.load.image('flags', assets.flags);
    this.load.image('sheep-herd-boost-icon', assets.herdBoostSheepIcon);
    this.load.image('chicken-herd-boost-icon', assets.herdBoostChickenIcon);
    this.load.image('cow-herd-boost-icon', assets.herdBoostCowIcon);
    this.load.image('sheep-feed-boost-icon', assets.feedBoostSheepIcon);
    this.load.image('chicken-herd-boost-icon', assets.feedBoostChickenIcon);
    this.load.image('cow-herd-boost-icon', assets.feedBoostCowIcon);
    this.load.image('event-herd-boost-icon', assets.herdBoostEventIcon);
    this.load.image('event-feed-boost-icon', assets.feedBoostEventIcon);
    this.load.image('unicorn-status', assets.unicornStatus);
    this.load.image('starterpack-bg', assets.starterpackBg);
    this.load.image('starterpack-shadow', assets.starterpackShadow);
    this.load.image('firework1', assets.firework1);
    this.load.image('firework2', assets.firework2);
    this.load.image('firework3', assets.firework3);
    this.load.image('fireworkBg', assets.fireworkBg);

    this.load.image('chat-bg', assets.chatBackground);
    this.load.image('chat-delete-bg', assets.chatDeleteBg);
    this.load.image('chat-trash', assets.chatTrash);
    this.load.image('chat-arrow', assets.chatArrow);
    this.load.atlas('chat-tab', assets.chatTab, tabAtlas);
    this.load.image('chat-tab-close', assets.chatTabClose);
    this.load.atlas('chat-tab-active', assets.chatTabActive, tabActiveAtlas);
    this.load.atlas('chat-foreign-message-bg', assets.chatForeignMessageBg, foreignMsgAtlas);
    this.load.atlas('chat-clan-message-bg', assets.chatClanMessageBg, clanMsgAtlas);
    this.load.atlas('chat-admin-message-bg', assets.chatAdminMessageBg, adminMsgAtlas);
    this.load.atlas('chat-user-message-bg', assets.chatUserMessageBg, userMsgAtlas);
    this.load.image('chat-input-bg', assets.chatInput);
    this.load.image('chat-send-btn', assets.chatSendBtn);
    this.load.image('chat-emoji-btn', assets.chatEmojiBtn);
    this.load.image('unicorn-status', assets.unicornStatus);
    this.load.image('fortune-plate', assets.fortunePlate);

    this.load.image('factory-window', assets.factoryWindow);
    this.load.image('factory-wheel', assets.factoryWheel);
    this.load.image('factory-production-1', assets.factoryProduction1);
    this.load.image('factory-production-2', assets.factoryProduction2);
    this.load.image('factory-production-3', assets.factoryProduction3);
    this.load.image('factory-production-4', assets.factoryProduction4);
    this.load.image('factory-cacao', assets.factoryCacao);
    this.load.image('factory-production-slot-2', assets.factoryProductionSlot2);
    this.load.image('factory-production-slot-disable-2', assets.factoryProductionSlotDisable2);
    this.load.image('factory-production-slot-3', assets.factoryProductionSlot3);
    this.load.image('factory-production-slot-disable-3', assets.factoryProductionSlotDisable3);
    this.load.image('factory-production-slot-4', assets.factoryProductionSlot4);
    this.load.image('factory-production-slot-disable-4', assets.factoryProductionSlotDisable4);

    this.load.audio('music', assets.music);
    this.load.audio('click-sound', assets.clickSound);
    this.load.audio('firework-sound', assets.fireworkSound);
    this.load.audio('coins-sound', assets.coinsSound);
    this.load.audio('error-sound', assets.errorSound);
    this.load.audio('merge-sound', assets.mergeSound);
    this.load.audio('award-sound', assets.awardSound);
    this.load.audio('donate-window-sound', assets.donateWindowSound);
    this.load.audio('donate-take-sound', assets.donateTakeSound);
    this.load.audio('tree-falling-sound', assets.treeFallingSound);
    if (this.game.scene.keys['Sheep'].scene.isActive()) {
      this.load.audio('sheep-sound-1', assets.sheepSound1);
      this.load.audio('sheep-sound-2', assets.sheepSound2);
    }
    if (this.game.scene.keys['Chicken'].scene.isActive()) {
      this.load.audio('chicken-sound-1', assets.chickenSound1);
      this.load.audio('chicken-sound-2', assets.chickenSound2);
      this.load.audio('chicken-sound-3', assets.chickenSound3);
      this.load.audio('chicken-sound-4', assets.chickenSound4);
      this.load.audio('chicken-sound-5', assets.chickenSound5);
    }
    if (this.game.scene.keys['Cow'].scene.isActive()) {
      this.load.audio('cow-sound-1', assets.cowSound1);
      this.load.audio('cow-sound-2', assets.cowSound2);
      this.load.audio('cow-sound-3', assets.cowSound3);
    }
    this.load.image('profile-window-button-yellow', assets.profileWindowBtnYellow);
    this.load.image('profile-window-button-red', assets.profileWindowBtnRed);
    this.load.image('profile-window-button-green', assets.profileWindowBtnGreen);
    this.load.image('profile-window-settings-btn', assets.profileWindowSettingsBtn);
    this.load.image('profile-window-footer', assets.profileWindowFooter);
    this.load.image('profile-window-header', assets.profileWindowHeader);
    this.load.image('profile-window-level', assets.profileWindowLevel);
    this.load.image('profile-window-bg', assets.profileWindowBg);
    this.load.image('boost-counter-bg', assets.boostCounterBg);

    this.load.image('settings-window-header', assets.settingsWindowHeader);
    this.load.image('settings-window-minus', assets.settingsWindowMinus);
    this.load.image('settings-window-plus', assets.settingsWindowPlus);
    this.load.image('settings-window-segment', assets.settingsWindowSegment);
    this.load.image('settings-window-music-plate', assets.settingsWindowMusicPlate);
    this.load.image('settings-window-sound-plate', assets.settingsWindowSoundPlate);
    
    if (this.state.platform === 'ok' || this.state.platform === 'vk') {
      this.load.image('social-task-bg', assets.socialTaskBg);
      this.load.image('social-task-top', assets.socialTaskTop);
      this.load.image('social-task-bottom', assets.socialTaskBottom);
      this.load.image('social-task-middle', assets.socialTaskMiddle);
    }

    this.load.image('sys-switch', assets.sysSwitch);
    this.load.atlas('modal-square-bg', assets.squareBg, squareBgAtlas);
    this.load.image('clan-window-header', assets.clanWindowHeader);
    this.load.image('clan-window-tab-active', assets.clanWindowTabActive);
    this.load.image('clan-window-tab-disable', assets.clanWindowTabDisable);
    this.load.image('clan-window-tab-close', assets.clanWindowTabClose);
    this.load.image('clan-window-crown', assets.clanWindowCrown);
    this.load.image('clan-window-line', assets.clanWindowLine);
    this.load.image('clan-window-medal-bronze', assets.clanWindowMedalBronze);
    this.load.image('clan-window-medal-gold', assets.clanWindowMedalGold);
    this.load.image('clan-window-medal-silver', assets.clanWindowMedalSilver);
    this.load.image('clan-window-medal', assets.clanWindowMedal);
    this.load.image('clan-window-medal-ns', assets.clanWindowMedal);
    this.load.image('clan-window-leader-plate', assets.clanWindowLeaderPlate);
    this.load.image('clan-window-points-bg', assets.clanWindowPointsBg);
    this.load.image('clan-window-search-plate', assets.clanWindowSearchPlate);
    this.load.image('clan-window-search-plate-ns', assets.clanWindowSearchPlate);
    this.load.image('clan-window-wreath', assets.clanWindowWreath);
    this.load.image('clan-window-wreath-bg', assets.clanWindowBgWreath);
    this.load.image('clan-window-icon-1', assets.clanWindowIcon1);
    this.load.image('clan-window-icon-2', assets.clanWindowIcon2);
    this.load.image('clan-window-icon-3', assets.clanWindowIcon3);
    this.load.image('clan-window-icon-4', assets.clanWindowIcon4);
    this.load.image('clan-window-icon-5', assets.clanWindowIcon5);
    this.load.image('clan-window-exclude-button', assets.clanWindowExcludeBtn);

    this.load.image('clan-icon-1', assets.clanIcon1);
    this.load.image('clan-icon-2', assets.clanIcon2);
    this.load.image('clan-icon-3', assets.clanIcon3);
    this.load.image('clan-icon-4', assets.clanIcon4);
    this.load.image('clan-icon-5', assets.clanIcon5);
    this.load.image('clan-icon-6', assets.clanIcon6);
    this.load.image('clan-icon-7', assets.clanIcon7);
    this.load.image('clan-icon-8', assets.clanIcon8);
    this.load.image('clan-icon-9', assets.clanIcon9);
    this.load.image('clan-icon-10', assets.clanIcon10);
    this.load.image('clan-icon-11', assets.clanIcon11);
    this.load.image('clan-icon-12', assets.clanIcon12);
    this.load.image('clan-frame-1', assets.clanFrame1);
    this.load.image('clan-frame-1', assets.clanFrame1);
    this.load.image('clan-frame-2', assets.clanFrame2);
    this.load.image('clan-frame-3', assets.clanFrame3);
    this.load.image('clan-frame-4', assets.clanFrame4);
    this.load.image('clan-frame-5', assets.clanFrame5);
    this.load.image('clan-frame-6', assets.clanFrame6);
    this.load.image('clan-frame-7', assets.clanFrame7);
    this.load.image('clan-frame-8', assets.clanFrame8);
    this.load.image('clan-frame-9', assets.clanFrame9);
    this.load.image('clan-frame-10', assets.clanFrame10);
    this.load.image('clan-frame-11', assets.clanFrame11);
    this.load.image('clan-bg-1', assets.clanBg1);
    this.load.image('clan-bg-2', assets.clanBg2);
    this.load.image('clan-bg-3', assets.clanBg3);
    this.load.image('clan-bg-4', assets.clanBg4);
    this.load.image('clan-bg-5', assets.clanBg5);
    this.load.image('clan-bg-6', assets.clanBg6);
    this.load.image('clan-bg-7', assets.clanBg7);
    this.load.image('clan-bg-8', assets.clanBg8);
    this.load.image('clan-bg-9', assets.clanBg9);
    this.load.image('clan-bg-10', assets.clanBg10);
    this.load.image('clan-bg-11', assets.clanBg11);
    this.load.image('clan-bg-12', assets.clanBg12);
    this.load.image('clan-bg-13', assets.clanBg13);
    this.load.image('clan-bg-14', assets.clanBg14);
    this.load.image('clan-main-frame', assets.clanMainFrame);
    this.load.image('clan-window-search-plate-ns', assets.clanWindowSearchPlate);
    this.load.image('clan-window-leader-plate-ns', assets.clanWindowLeaderPlate);
    this.load.image('clan-bank-sheep-package-1', assets.clanBankSheepPackage1);
    this.load.image('clan-bank-sheep-package-2', assets.clanBankSheepPackage2);
    this.load.image('clan-bank-sheep-package-3', assets.clanBankSheepPackage3);
    this.load.image('clan-bank-sheep-package-4', assets.clanBankSheepPackage4);
    this.load.image('clan-bank-chicken-package-1', assets.clanBankChickenPackage1);
    this.load.image('clan-bank-chicken-package-2', assets.clanBankChickenPackage2);
    this.load.image('clan-bank-chicken-package-3', assets.clanBankChickenPackage3);
    this.load.image('clan-bank-chicken-package-4', assets.clanBankChickenPackage4);
    this.load.image('clan-bank-cow-package-1', assets.clanBankCowPackage1);
    this.load.image('clan-bank-cow-package-2', assets.clanBankCowPackage2);
    this.load.image('clan-bank-cow-package-3', assets.clanBankCowPackage3);
    this.load.image('clan-bank-cow-package-4', assets.clanBankCowPackage4);
    this.load.image('clan-bank-diamond-package-1', assets.clanBankDiamondPackage1);
    this.load.image('clan-bank-diamond-package-2', assets.clanBankDiamondPackage2);
    this.load.image('clan-bank-diamond-package-3', assets.clanBankDiamondPackage3);
    this.load.image('clan-bank-diamond-package-4', assets.clanBankDiamondPackage4);
    this.load.image('clan-map', assets.clanMap);
    this.load.image('clan-cooldown-bg', assets.clanCooldownBg);
    this.load.image('clan-chicken-farm', assets.clanChickenFarm);
    this.load.image('clan-flagpole', assets.clanFlagpole);
    this.load.image('icon-clan-sheep', assets.iconClanSheep);
    this.load.image('icon-clan-chicken', assets.iconClanChicken);
    this.load.image('icon-clan-cow', assets.iconClanCow);
    this.load.image('modal-header-orange', assets.headerOrange);
    this.load.image('stock-icon', assets.stock);

    this.load.image('clan-task-icon-1', assets.clanTaskIcon1);
    this.load.image('clan-task-icon-2', assets.clanTaskIcon2);
    this.load.image('clan-task-icon-3', assets.clanTaskIcon3);
    this.load.image('clan-task-icon-4', assets.clanTaskIcon4);
    this.load.image('clan-task-icon-5', assets.clanTaskIcon5);
    this.load.image('clan-task-icon-6', assets.clanTaskIcon6);
    this.load.image('clan-task-icon-7', assets.clanTaskIcon7);
    this.load.image('clan-task-icon-8', assets.clanTaskIcon8);
    this.load.image('clan-task-icon-9', assets.clanTaskIcon9);
    this.load.image('clan-task-icon-10', assets.clanTaskIcon10);
    this.load.image('clan-task-icon-11', assets.clanTaskIcon11);
    this.load.image('clan-task-icon-12', assets.clanTaskIcon12);
    this.load.image('clan-task-icon-13', assets.clanTaskIcon13);
    this.load.image('clan-task-icon-14', assets.clanTaskIcon14);
    this.load.image('clan-task-icon-15', assets.clanTaskIcon15);
    this.load.image('clan-task-icon-16', assets.clanTaskIcon16);
    this.load.image('clan-task-icon-17', assets.clanTaskIcon17);
    this.load.image('clan-task-icon-18', assets.clanTaskIcon18);
    this.load.image('clan-task-icon-19', assets.clanTaskIcon19);
    this.load.image('clan-bank-button', assets.clanBankBtn);
    this.load.image('clan-tab-icon-sheep', assets.clanTabIconSheep);
    this.load.image('clan-tab-icon-chicken', assets.clanTabIconChicken);
    this.load.image('clan-tab-icon-cow', assets.clanTabIconCow);
    this.load.image('clan-tournament-header', assets.clanTournamentHeader);
    this.load.image('clan-tournament-decor', assets.clanTournamentDecor);
    this.load.image('clan-tournament-animal-bg', assets.clanTournamentAnimalBg);
    this.load.image('clan-tournament-plate-bg', assets.clanTournamentPlateBg);

    this.load.image('sale-window-header', assets.saleWindowHeader);
    this.load.image('sale-window-flags', assets.saleWindowFlags);
    this.load.image('sale-window-double-count', assets.saleWindowDoubleCount);
    this.load.image('sale-window-half-price', assets.saleWindowHalfPrice);
    this.load.image('sale-window-header', assets.settingsWindowHeader);
    this.load.image('close-window-btn', assets.closeWindowBtn);
    this.load.image('sale-icon-chicken-collector-improve', assets.saleIconChickenCollectorImprove);
    this.load.image('sale-icon-chicken-collector-price', assets.saleIconChickenCollectorPrice);
    this.load.image('sale-icon-chicken-feed', assets.saleIconChickenFeed);
    this.load.image('sale-icon-chicken-herd', assets.saleIconChickenHerd);
    this.load.image('sale-icon-chicken-money', assets.saleIconChickenMoney);
    this.load.image('sale-icon-chicken-price', assets.saleIconChickenPrice);
    this.load.image('sale-icon-chicken-repository-improve', assets.saleIconChickenRepositoryImprove);
    this.load.image('sale-icon-clan', assets.saleIconClan);
    this.load.image('sale-icon-cow-collector-improve', assets.saleIconCowCollectorImprove);
    this.load.image('sale-icon-cow-collector-price', assets.saleIconCowCollectorPrice);
    this.load.image('sale-icon-cow-factory-improve', assets.saleIconCowFactoryImprove);
    this.load.image('sale-icon-cow-feed', assets.saleIconCowFeed);
    this.load.image('sale-icon-cow-herd', assets.saleIconCowHerd);
    this.load.image('sale-icon-cow-money', assets.saleIconCowMoney);
    this.load.image('sale-icon-cow-price', assets.saleIconCowPrice);
    this.load.image('sale-icon-cow-repository-improve', assets.saleIconCowRepositoryImprove);
    this.load.image('sale-icon-diamond-count', assets.saleIconDiamondCount);
    this.load.image('sale-icon-package-price', assets.saleIconPackagePrice);
    this.load.image('sale-icon-sheep-collector-improve', assets.saleIconSheepCollectorImprove);
    this.load.image('sale-icon-sheep-collector-price', assets.saleIconSheepCollectorPrice);
    this.load.image('sale-icon-sheep-feed', assets.saleIconSheepFeed);
    this.load.image('sale-icon-sheep-herd', assets.saleIconSheepHerd);
    this.load.image('sale-icon-sheep-money', assets.saleIconSheepMoney);
    this.load.image('sale-icon-sheep-price', assets.saleIconSheepPrice);
    this.load.image('sale-icon-sheep-repository-improve', assets.saleIconSheepRepositoryImprove);
    this.load.image('modal-bg-plate', assets.modalBgPlate);
    this.load.image('avatar-0', assets.avatar0);
    this.load.image('avatar-1', assets.avatar1);
    this.load.image('avatar-2', assets.avatar2);
    this.load.image('avatar-3', assets.avatar3);
    this.load.image('avatar-4', assets.avatar4);
    this.load.image('avatar-5', assets.avatar5);
    this.load.image('avatar-6', assets.avatar6);
    this.load.image('avatar-7', assets.avatar7);
    this.load.image('avatar-8', assets.avatar8);
    this.load.image('buy-avatar-plate', assets.buyPlate);
    this.load.image('profile-window-edit-avatar-btn', assets.profileWindoweEitAvataBtn);
    this.load.image('avatar-frame', assets.avatarFrame);

  }

  public create(): void {
    if (!this.readySounds) {
      const music: Phaser.Sound.BaseSound = this.sound.add('music', { volume: this.state.musicVolume, loop: true });
      music.play();
      this.readySounds = true;
    }
  }

}

export default Preload;
