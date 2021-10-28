import Chicken from "../../scenes/Chicken/Main";
import { FAPI } from '../../libs/Fapi'
import * as platform from 'platform';
import Cow from "../../scenes/Cow/Main";
import Unicorn from "../../scenes/Event/Unicorns/Main";
import Sheep from "../../scenes/Sheep/Main";
import axios from "axios";
import Firework from "../animations/Firework";
import BigInteger from "../../libs/BigInteger";
import MoneyAnimation from "../animations/MoneyAnimation";
import { randomString } from "../../general/basic";

/**
  * Реклама  
  * 
  * методы:
  ** findAd - поиск рекламы
  ** watchAd - просмотр рекламы
  ** adReward - получение награды за просмотр
  ** VKOnAdsReady - готовность рекламы
  ** VKNoAds - реклама не найдена
*/

export default class Ads {
  public scene: Sheep | Chicken | Cow | Unicorn
  private musicVolume: number;
  private soundVolume: number;

  constructor(scene: Sheep | Chicken | Cow | Unicorn) {
    this.scene = scene
    this.musicVolume = this.scene.state.musicVolume || 0;
    this.soundVolume = this.scene.state.soundVolume || 0;
  }

  public findAd(): void {
    if (!this.scene.state.readyAd && !this.scene.state.adBlock) {
      if (this.scene.state.platform === 'ok' && !this.scene.state.adTimeout) {
        this.scene.state.adTimeout = true;
        FAPI.UI.loadAd();
      } else if (this.scene.state.platform === 'vk' && !this.scene.state.adTimeout) {
        this.scene.state.adTimeout = true;
        let win: any = window;
        let mobile: boolean = false; 
        if (platform.os.family === 'Android' || platform.os.family === 'iOS') mobile = true;
        win.admanInit({
          user_id: this.scene.state.vkId,
          app_id: process.env.VK_APP_ID,
          mobile: mobile,
          type: 'rewarded'
        }, this.scene.VKOnAdsReady, this.scene.VKNoAds);
      } else if (this.scene.state.platform === 'ya') {
        this.scene.state.readyAd = true;
      }
    }
  }

  public watchAd(type: number): void {
    this.scene.state.adRewardedType = type;
    this.scene.state.readyAd = false;
    this.scene.state.musicVolume = 0;
    this.scene.state.soundVolume = 0;
    //@ts-ignore
    this.scene.sound.get('music').volume = this.scene.state.musicVolume;

    if (this.scene.state.platform === 'ok') {
      FAPI.UI.showLoadedAd();
    } else if (this.scene.state.platform === 'vk') {
      this.scene.state.adTimeout = false;
      
      this.scene.state.adman.onStarted((): void => {
        this.scene.scene.launch('Block');
      });
      this.scene.state.adman.onCompleted((): void => {
        this.adReward();
        this.scene.scene.stop('Block');
      });
      this.scene.state.adman.onSkipped((): void => {
        this.scene.state.musicVolume = this.musicVolume;
        this.scene.state.soundVolume = this.soundVolume;
        //@ts-ignore
        this.scene.sound.get('music').volume = this.scene.state.musicVolume;
      });      
      this.scene.state.adman.onClicked((): void => {}); 
      this.scene.state.adman.start('preroll');
    } else if (this.scene.state.platform === 'ya') {
      this.scene.state.ysdk.adv.showRewardedVideo({
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
            this.scene.state.musicVolume = this.musicVolume;
            this.scene.state.soundVolume = this.soundVolume;
            //@ts-ignore
            this.scene.sound.get('music').volume = this.scene.state.musicVolume;
          },
        }
      });
    } else if (this.scene.state.platform === 'android') {
      // @ts-ignore
      window.admob.rewardvideo.show();
    }
  }

  public adReward(): void {
    let type: string;
  
    switch(this.scene.state.adRewardedType) {
  
      case 1: // доп.софта для обмена
        this.scene.state.user.diamonds += 1;
        this.scene.exchange(true);
        type = 'free_soft';
        break;
  
      case 2: // кристаллическое животное
        let x: number = Phaser.Math.Between(530, 660);
        let y: number = Phaser.Math.Between(530, 540);
        let id: string = 'local_' + randomString(18);
  
        if (this.scene.state.farm === 'Sheep') {
  
          let scene = this.scene as Sheep
          scene.getSheep(id, 0, x, y, 0, 500);
          type = 'crystall_sheep';
  
        } else if (this.scene.state.farm === 'Chicken') {
          
          let scene = this.scene as Chicken
          scene.getChicken(id, 0, x, y, 0, 500);
          type = 'crystall_chicken';
  
        } else if (this.scene.state.farm === 'Cow') {
          
          let scene = this.scene as Cow
          scene.animalGroup.generate({ x, y }, 0, id, 0, 500, 0, 7, true);
          type = 'crystall_cow';
  
        }
  
        this.scene.tryTask(18, 0);
        this.scene.tryClanTask(8);
  
        this.scene.state.amplitude.logAmplitudeEvent('take_diamond_animal', {
          price: 'ad'
        });
        break;
  
      case 3: // удвоенный бесплатный собиратель
        let time: number = 0;
  
        if (this.scene.state.farm === 'Sheep') {
  
          type = 'sheep_trimmer';
          time = this.scene.state.sheepCollectorSettings.find((data: IcollectorSettings) => data.level === this.scene.state.userSheep.collectorLevel).time * 2;
          this.scene.state.userSheep.collector = time * 60;
          this.scene.state.userSheep.collectorTakenTime = this.scene.state.userSheep.collector;
        } else if (this.scene.state.farm === 'Chicken') {
          
          type = 'egg_catcher';
          time = this.scene.state.chickenCollectorSettings.find((data: IcollectorSettings) => data.level === this.scene.state.userChicken.collectorLevel).time * 2;
          this.scene.state.userChicken.collector = time * 60;
          this.scene.state.userChicken.collectorTakenTime = this.scene.state.userChicken.collector;
        } else if (this.scene.state.farm === 'Cow') {
          
          type = 'milk_picker';
          time = this.scene.state.cowCollectorSettings.find((data: IcollectorSettings) => data.level === this.scene.state.userCow.collectorLevel).time * 2;
          this.scene.state.userCow.collector = time * 60;
          this.scene.state.userCow.collectorTakenTime = this.scene.state.userCow.collector;
        } else if (this.scene.state.farm === 'Unicorn') {
          type = 'resource_catcher';
          time = this.scene.state.unicornCollectorSettings.find((data: IcollectorSettings) => data.level === this.scene.state.userUnicorn.collectorLevel).time * 2;
          this.scene.state.userUnicorn.collector = time * 60;
          this.scene.state.userUnicorn.collectorTakenTime = this.scene.state.userUnicorn.collector;
        }
        this.scene.tryTask(3, 0, time);
        this.scene.tryClanTask(7, 0, time);
  
        this.scene.state.amplitude.logAmplitudeEvent('collector', {
          type: 'free',
          price: 'ad',
        });
        break;
      
      case 4: 
        let position = this.scene.game.scene.keys['Unicorn'].getFreePosition();
        if (position.x === null || position.y === null) return;
        let breed: number = this.scene.state.userUnicorn.points - 3;
        if (breed < 2) breed = 2;
        this.scene.currentTerritory(position.x, position.y).data.values.animal = breed;
        id = 'local_' + randomString(18);
        
        const data = {
          id: this.scene.state.user.id,
          hash: this.scene.state.user.hash,
          counter: this.scene.state.user.counter,
        }
        axios.post(process.env.API + "/unicorn/takeAd", data)
        .then((response) => {
          if (this.scene.state.userUnicorn.takenAd === 0) this.scene.state.userUnicorn.timeToAd += 60;
          else if (this.scene.state.userUnicorn.takenAd === 1) this.scene.state.userUnicorn.timeToAd += 300;
          else if (this.scene.state.userUnicorn.takenAd === 2) this.scene.state.userUnicorn.timeToAd += 1800;
          else if (this.scene.state.userUnicorn.takenAd === 3) this.scene.state.userUnicorn.timeToAd += 7200;
          else if (this.scene.state.userUnicorn.takenAd >= 4) this.scene.state.userUnicorn.timeToAd += 86400;
          else this.scene.state.userUnicorn.timeToAd += Number.MAX_SAFE_INTEGER;
          this.scene.state.userUnicorn.takenAd += 1;
        });

        let scene = this.scene as Unicorn
        scene.getAnimal(id, breed, position.x, position.y);
        Firework.create(this.scene, { x: position.x, y: position.y }, 1);
  
        this.scene.state.amplitude.logAmplitudeEvent('take_event_animal', {
          price: 'ad'
        });
  
        type = 'take_event_animal';
        break;
      case 5:
        this.scene.state.userUnicorn.money = BigInteger.add(this.scene.state.userUnicorn.money, this.scene.state.modal.unicornParams.offlineProgress);
        MoneyAnimation.create(this.scene.game.scene.keys[this.scene.state.farm + 'Bars']);
        this.scene.state.amplitude.logAmplitudeEvent('take_double_profit_event', {
          price: 'ad'
        });
        type = 'take_double_profit_event';
        break;
      case 6: 
        const FREE_DIAMONDS = 1;
        this.scene.state.user.diamonds += FREE_DIAMONDS;
        this.scene.state.user.takeFreeDiamondTime = 60 * 60;
        this.scene.game.scene.keys[this.scene.state.farm].autosave();
        this.scene.state.amplitude.logAmplitudeEvent('diamonds_get', {
          type: 'take_ad_diamond',
          count: FREE_DIAMONDS,
        });
        this.scene.game.scene.keys['ShopBars'].getCurrency({
          x: this.scene.game.scene.keys['ShopBars'].cameras.main.centerX + 100,
          y: this.scene.game.scene.keys['ShopBars'].cameras.main.centerY - 300,
        }, FREE_DIAMONDS, 'diamond');
        type = 'take_ad_diamond';
        break;
      default:
        break;
  
    }
  
    const properties = {
      screen: type
    }
  
    this.scene.state.amplitude.logAmplitudeRevenue(type, 0, 'rewarded', properties);
    this.scene.autosave();
    this.scene.state.musicVolume = this.musicVolume;
    this.scene.state.soundVolume = this.soundVolume;
    //@ts-ignore
    this.scene.sound.get('music').volume = this.scene.state.musicVolume;
  }

  public VKOnAdsReady(adman: any): void {
    console.log(adman)
    this.scene.state.adman = adman;
    this.scene.state.readyAd = true;
  }


  public VKNoAds(): void {
    console.log('noAds');
    this.scene.state.readyAd = false;
    this.scene.state.adTimeout = false;
  }
}