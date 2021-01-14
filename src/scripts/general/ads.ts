import { FAPI } from '../libs/Fapi';
import * as amplitude from 'amplitude-js';
import { randomString } from './basic';
import * as platform from 'platform';

// поиск рекламы
function findAd(): void {

  if (!this.state.readyAd && !this.state.adBlock) {
    
    if (this.state.platform === 'ok' && !this.state.adTimeout) {

      this.state.adTimeout = true;
      FAPI.UI.loadAd();

    } else if (this.state.platform === 'vk' && !this.state.adTimeout) {

      this.state.readyAd = true;

    }
    
  }
}


// смотреть рекламу
function watchAd(type: number): void {

  this.state.adRewardedType = type;
  this.state.readyAd = false;

  if (this.state.platform === 'ok') {

    FAPI.UI.showLoadedAd();

  } else if (this.state.platform === 'vk') {

    let win: any = window;
    let mobile: boolean = false;

    if (platform.os.family === 'Android' || platform.os.family === 'iOS') mobile = true;

    win.admanInit({
      user_id: this.state.vkId,
      app_id: process.env.VK_APP_ID,
      mobile: mobile,
      type: 'rewarded'
    }, this.VKOnAdsReady, this.VKNoAds);

  }

}


// выдача награды
function adReward(): void {

  let type: string;

  switch(this.state.adRewardedType) {

    case 1: // доп.софта для обмена
      this.state.user.diamonds += 1;
      this.exchange(true);
      type = 'free_soft';
      break;

    case 2: // кристаллическое животное
      let x: number = Phaser.Math.Between(530, 660);
      let y: number = Phaser.Math.Between(530, 540);
      let id: string = 'local_' + randomString(18);

      if (this.state.farm === 'Sheep') {

        this.getSheep(id, 0, x, y, 0, 500);
        type = 'crystall_sheep';

      } else if (this.state.farm === 'Chicken') {
        
        this.getChicken(id, 0, x, y, 0, 500);
        type = 'crystall_chicken';

      }

      this.tryTask(18, 0);

      this.state.amplitude.getInstance().logEvent('take_diamond_animal', {
        farm_id: this.state.farm,
        price: 'ad'
      });
      break;

    case 3: // удвоенный бесплатный собиратель
      let time: number = 0;

      if (this.state.farm === 'Sheep') {

        type = 'sheep_trimmer';
        time = time = this.state.sheepCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userSheep.collectorLevel).time * 2;
        this.state.userSheep.collector = time * 60;

      } else if (this.state.farm === 'Chicken') {
        
        type = 'egg_catcher';
        time = this.state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userChicken.collectorLevel).time * 2;
        this.state.userChicken.collector = time * 60;

      }

      this.tryTask(3, 0, time);

      this.state.amplitude.getInstance().logEvent('collector', {
        type: 'free',
        price: 'ad',
        farm_id: this.state.farm
      });
      break;

    default:
      break;

  }

  let properties = {
    screen: type
  }
  let revenue: amplitude.Revenue = new amplitude.Revenue()
    .setProductId(type)
    .setPrice(0)
    .setRevenueType('rewarded')
    .setEventProperties(properties);
  this.state.amplitude.logRevenueV2(revenue);

}


// показ рекламы ВК
function VKOnAdsReady(adman: any): void {

  adman.onStarted((): void => {});
  adman.onCompleted((): void => {
    this.adReward();
  });
  adman.onSkipped((): void => {});      
  adman.onClicked((): void => {}); 
  adman.start('preroll');

}


// не рекламы
function VKNoAds(): void {
  console.log('noAds');
}

export {
  findAd,
  watchAd,
  adReward,
  VKOnAdsReady,
  VKNoAds
}
