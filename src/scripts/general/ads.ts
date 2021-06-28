import { FAPI } from '../libs/Fapi';
import { randomString } from './basic';
import * as platform from 'platform';
import axios from 'axios';
import Firework from '../components/animations/Firework';
import BigInteger from '../libs/BigInteger';
import MoneyAnimation from './../components/animations/MoneyAnimation';

// поиск рекламы
function findAd(): void {
  if (!this.state.readyAd && !this.state.adBlock) {
    if (this.state.platform === 'ok' && !this.state.adTimeout) {
      this.state.adTimeout = true;
      FAPI.UI.loadAd();
    } else if (this.state.platform === 'vk' && !this.state.adTimeout) {
      this.state.adTimeout = true;
      let win: any = window;
      let mobile: boolean = false; 
      if (platform.os.family === 'Android' || platform.os.family === 'iOS') mobile = true;
      win.admanInit({
        user_id: this.state.vkId,
        app_id: process.env.VK_APP_ID,
        mobile: mobile,
        type: 'rewarded'
      }, this.VKOnAdsReady, this.VKNoAds);
    } else if (this.state.platform === 'ya') {
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
    this.state.adTimeout = false;
    
    this.state.adman.onStarted((): void => {
      this.scene.launch('Block');
    });
    this.state.adman.onCompleted((): void => {
      this.adReward();
      this.scene.stop('Block');
    });
    this.state.adman.onSkipped((): void => {});      
    this.state.adman.onClicked((): void => {}); 
    this.state.adman.start('preroll');
  } else if (this.state.platform === 'ya') {
    this.state.ysdk.adv.showRewardedVideo({
      callbacks: {
        onRewarded: (): void => {
          console.log('onRewarded');
          this.adReward();
        },
        onError: (): void => {
          console.log('onError');
        },
        onClose: (): void => {
          console.log('onClose');
        },
      }
    });
  } else if (this.state.platform === 'android') {
    // @ts-ignore
    window.admob.rewardvideo.show();
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

      } else if (this.state.farm === 'Cow') {
        
        this.animalGroup.generate({ x, y }, 0, id, 0, 500, 0, 7, true);
        type = 'crystall_cow';

      }

      this.tryTask(18, 0);

      this.logAmplitudeEvent('take_diamond_animal', {
        price: 'ad'
      });
      break;

    case 3: // удвоенный бесплатный собиратель
      let time: number = 0;

      if (this.state.farm === 'Sheep') {

        type = 'sheep_trimmer';
        time = time = this.state.sheepCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userSheep.collectorLevel).time * 2;
        this.state.userSheep.collector = time * 60;
        this.state.userSheep.collectorTakenTime = this.state.userSheep.collector;
      } else if (this.state.farm === 'Chicken') {
        
        type = 'egg_catcher';
        time = this.state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userChicken.collectorLevel).time * 2;
        this.state.userChicken.collector = time * 60;
        this.state.userChicken.collectorTakenTime = this.state.userSheep.collector;
      } else if (this.state.farm === 'Cow') {
        
        type = 'milk_picker';
        time = this.state.cowCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userCow.collectorLevel).time * 2;
        this.state.userCow.collector = time * 60;
        this.state.userCow.collectorTakenTime = this.state.userSheep.collector;
      } else if (this.state.farm === 'Unicorn') {
        type = 'resource_catcher';
        time = this.state.eventCollectorSettings.find((data: IcollectorSettings) => data.level === this.state.userUnicorn.collectorLevel).time * 2;
        this.state.userUnicorn.collector = time * 60;
        this.state.userUnicorn.collectorTakenTime = this.state.userSheep.collector;
      }
      this.tryTask(3, 0, time);

      this.logAmplitudeEvent('collector', {
        type: 'free',
        price: 'ad',
      });
      break;
    
    case 4: 
      let position = this.game.scene.keys['Unicorn'].getFreePosition();
      if (position.x === null || position.y === null) return;
      let breed: number = this.state.userUnicorn.points - 3;
      if (breed < 2) breed = 2;
      this.currentTerritory(position.x, position.y).data.values.animal = breed;
      id = 'local_' + randomString(18);
      
      const data = {
        id: this.state.user.id,
        hash: this.state.user.hash,
        counter: this.state.user.counter,
      }
      axios.post(process.env.API + "/unicorn/takeAd", data)
        .then((response) => {
          console.log(this.state.userUnicorn.takenAd)
          if (this.state.userUnicorn.takenAd === 0) this.state.userUnicorn.timeToAd += 60;
          else if (this.state.userUnicorn.takenAd === 1) this.state.userUnicorn.timeToAd += 300;
          else if (this.state.userUnicorn.takenAd === 2) this.state.userUnicorn.timeToAd += 1800;
          else if (this.state.userUnicorn.takenAd === 3) this.state.userUnicorn.timeToAd += 7200;
          else if (this.state.userUnicorn.takenAd >= 4) this.state.userUnicorn.timeToAd += 86400;
          else this.state.userUnicorn.timeToAd += Number.MAX_SAFE_INTEGER;
          this.state.userUnicorn.takenAd += 1;
          console.log(this.scene.state.userUnicorn.timeToAd);
        });
      this.getAnimal(id, breed, position.x, position.y);
      Firework.create(this, { x: position.x, y: position.y }, 1);

      this.logAmplitudeEvent('take_event_animal', {
        price: 'ad'
      });

      type = 'take_event_animal';
      break;
    case 5:
      this.state.userUnicorn.money = BigInteger.add(this.state.userUnicorn.money, this.state.modal.eventParams.offlineProgress);
      MoneyAnimation.create(this.game.scene.keys[this.state.farm + 'Bars']);
      this.logAmplitudeEvent('take_double_profit_event', {
        price: 'ad'
      });
      type = 'take_double_profit_event';
      break;

    default:
      break;

  }

  const properties = {
    screen: type
  }

  this.logAmplitudeRevenue(type, 0, 'rewarded', properties);
  this.autosave();
}


// показ рекламы ВК
function VKOnAdsReady(adman: any): void {
  console.log(adman)
  this.state.adman = adman;
  this.state.readyAd = true;
}


// не рекламы
function VKNoAds(): void {
  console.log('noAds');
  this.state.readyAd = false;
  this.state.adTimeout = false;
}

export {
  findAd,
  watchAd,
  adReward,
  VKOnAdsReady,
  VKNoAds
}
