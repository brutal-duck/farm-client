import bridge from '@vkontakte/vk-bridge';
import Chicken from "../../scenes/Chicken/Main";
import { FAPI } from '../../libs/Fapi'
import Cow from "../../scenes/Cow/Main";
import Unicorn from "../../scenes/Event/Unicorns/Main";
import Sheep from "../../scenes/Sheep/Main";
import axios from "axios";
import Firework from "../animations/Firework";
import BigInteger from "../../libs/BigInteger";
import MoneyAnimation from "../animations/MoneyAnimation";
import { randomString } from "../../general/basic";
import Shop from './../../scenes/Modal/Shop/Main';
import { incFortuneAdTimer } from '../../general/interval';
import Fortune from './../../scenes/Fortune';
import Utils from './../../libs/Utils';

const INTERSTITIAL_DELAY = process.env.platform === 'gd' ? 180 : 60;
const ONE_HOUR = 3600;
const TWO_HOURS = 7200;
/**
  * Реклама  
  * 
  * методы:
  ** findAd - поиск рекламы
  ** watchAd - просмотр рекламы
  ** adReward - получение награды за просмотр
*/

export default class Ads {
  public scene: Sheep | Chicken | Cow | Unicorn;
  private musicVolume: number;
  private soundVolume: number;

  constructor(scene: Sheep | Chicken | Cow | Unicorn) {
    this.scene = scene;
    this.musicVolume = this.scene.state.musicVolume || 0;
    this.soundVolume = this.scene.state.soundVolume || 0;
  }

  public findAd(): void {
    if (!this.scene.state.readyAd && !this.scene.state.adBlock) {
      if (this.scene.state.platform === 'ok' && !this.scene.state.adTimeout) {
        this.scene.state.adTimeout = true;
        FAPI.UI.loadAd();
      } else if (this.scene.state.platform === 'vk') {
        this.scene.state.readyAd = true;
      } else if (this.scene.state.platform === 'ya') {
        this.scene.state.readyAd = true;
      } else if (this.scene.state.platform === 'gd') {
        this.scene.state.readyAd = true;
      }
    }
  }

  public watchAd(type: number): void {
    if (process.env.platform === 'gd') {
      this.scene.state.interstitialTimer = 0;
    }
    this.scene.state.adRewardedType = type;
    this.scene.state.readyAd = false;
    this.musicVolume = this.scene.state.musicVolume;
    this.soundVolume = this.scene.state.soundVolume;
    this.scene.state.musicVolume = 0;
    this.scene.state.soundVolume = 0;
    // @ts-ignore
    this.scene.sound.get('music').volume = this.scene.state.musicVolume;

    if (this.scene.state.platform === 'ok') {
      FAPI.UI.showLoadedAd();
    } else if (this.scene.state.platform === 'vk') {
      this.scene.scene.launch('Block');
      bridge
        .send('VKWebAppShowNativeAds', { ad_format:'reward' })
        .then(data => {
          if (data.result) this.adReward();
        })
        .finally(() => {
          this.scene.state.musicVolume = this.musicVolume;
          this.scene.state.soundVolume = this.soundVolume;
          //@ts-ignore
          this.scene.sound.get('music').volume = this.scene.state.musicVolume;
          this.scene.scene.stop('Block');
        });
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
      this.scene.state.admob.rewarded.show();
    } else if (this.scene.state.platform === 'gd') {
      const gdsdk = window['gdsdk'];
      if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
        gdsdk.showAd('rewarded');
      }
    }
  }

  public showInterstitialAd(): void {
    if (!Ads.checkShowInterstitial(this.scene.state)) return;
    this.scene.state.interstitialTimer = 0;
    switch (this.scene.state.platform) {
      case 'vk':
        bridge.send("VKWebAppShowNativeAds", { ad_format:"interstitial" })
        .then(data => {
          if (data.result) this.scene.state.amplitude.logAmplitudeRevenue('interstitial', 0, 'interstitial', {});
        });
        break;
      case 'ok':
        FAPI.UI.showAd();
        break;
      case 'ya':
        try {
          this.scene.state.ysdk?.adv.showFullscreenAdv({
            callbacks: {
              onOpen: () => {
                this.scene.state.amplitude.logAmplitudeRevenue('interstitial', 0, 'interstitial', {});
              },
            },
          });
        } catch (e) {
          console.log(e);
        }
        break;
      case 'android':
        this.scene.state.admob.interstitial.load();
        this.scene.state.amplitude.logAmplitudeRevenue('interstitial', 0, 'interstitial', {});
        break;
      case 'gd':
        const gdsdk = window['gdsdk'];
        if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
          this.musicVolume = this.scene.state.musicVolume;
          this.soundVolume = this.scene.state.soundVolume;
          this.scene.state.musicVolume = 0;
          this.scene.state.soundVolume = 0;
          if (this.scene.sound.get('music')) {
            // @ts-ignore
            this.scene.sound.get('music').volume = this.scene.state.musicVolume;
          }
          gdsdk.showAd('interstitial');
          this.scene.state.amplitude.logAmplitudeRevenue('interstitial', 0, 'interstitial', {});
        }
        break;
      default:
        break;
    }
  }

  public static checkShowInterstitial(state: Istate): boolean {
    if (process.env.platform === 'gd' && !state.prerollInterstitial) {
      console.log('PREROLL INTERSTITIAL');
      state.prerollInterstitial = true;
      return true;
    }

    const farm: string = state.farm;
    let result: boolean;
    if (farm === 'Unicorn') {
      const userFarm: IuserUnicorn = state.userUnicorn;
      result = state.interstitialTimer >= INTERSTITIAL_DELAY && userFarm.points > 2;
    } else {
      const userFarm: IuserSheep | IuserChicken | IuserCow = state[`user${farm}`];
      result = state.interstitialTimer >= INTERSTITIAL_DELAY && userFarm.part >= 2;
    }

    return result && !state.user.starterpack;
  }

  public static showInterstitialOnPreload(state: Istate, scene: Phaser.Scene): void {
    if (!Ads.checkShowInterstitial(state)) return;
    state.interstitialTimer = 0;
    switch (state.platform) {
      case 'vk':
        bridge.send("VKWebAppShowNativeAds", { ad_format:"interstitial" })
        .then(data => {
          if (data.result) state.amplitude.logAmplitudeRevenue('interstitial', 0, 'interstitial', {});
        });
        break;
      case 'ok':
        FAPI.UI.showAd();
        break;
      case 'ya':
        try {
          state.ysdk?.adv.showFullscreenAdv({
            callbacks: {
              onOpen: () => {
                state.amplitude.logAmplitudeRevenue('interstitial', 0, 'interstitial', {});
              },
            },
          });
        } catch (e) {
          console.log(e);
        }
        break;
      case 'android':
        state.admob.interstitial.load();
        state.amplitude.logAmplitudeRevenue('interstitial', 0, 'interstitial', {});
        break;
      case 'gd':
        const gdsdk = window['gdsdk'];
        if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
          gdsdk.showAd('interstitial');
          state.amplitude.logAmplitudeRevenue('interstitial', 0, 'interstitial', {});
        }
        break;
      default:
        break;
    }
  }

  public adReward(): void {
    let type: string;
    const farmUser: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${this.scene.state.farm}`];
    const MainScene: Sheep | Chicken | Cow | Unicorn = this.scene.game.scene.keys[this.scene.state.farm];
    switch (this.scene.state.adRewardedType) {
  
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
  
        if (Utils.checkTestB(this.scene.state)) {
          if (this.scene.state.farm === 'Sheep') {
    
            type = 'sheep_trimmer';
            time = this.scene.state.sheepSettings.partSettings[this.scene.state.userSheep.collectorTimeLevel - 1].collector.time * 2;
            this.scene.state.userSheep.collector = time * 60;
            this.scene.state.userSheep.collectorTakenTime = this.scene.state.userSheep.collector;
          } else if (this.scene.state.farm === 'Chicken') {
            
            type = 'egg_catcher';
            time = this.scene.state.chickenSettings.partSettings[this.scene.state.userChicken.collectorTimeLevel - 1].collector.time * 2;
            this.scene.state.userChicken.collector = time * 60;
            this.scene.state.userChicken.collectorTakenTime = this.scene.state.userChicken.collector;
          } else if (this.scene.state.farm === 'Cow') {
            
            type = 'milk_picker';
            time = this.scene.state.cowSettings.partSettings[this.scene.state.userCow.collectorTimeLevel - 1].collector.time * 2
            this.scene.state.userCow.collector = time * 60;
            this.scene.state.userCow.collectorTakenTime = this.scene.state.userCow.collector;
          } else if (this.scene.state.farm === 'Unicorn') {
            type = 'resource_catcher';
            time = this.scene.state.unicornCollectorSettings.find((data: IcollectorSettings) => data.level === this.scene.state.userUnicorn.collectorLevel).time * 2;
            this.scene.state.userUnicorn.collector = time * 60;
            this.scene.state.userUnicorn.collectorTakenTime = this.scene.state.userUnicorn.collector;
          }
        } else {
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
        const FREE_DIAMONDS_TIME = process.env.platform === 'gd' ? 5 : 60;
        this.scene.state.user.diamonds += FREE_DIAMONDS;
        this.scene.state.user.takeFreeDiamondTime = 60 * FREE_DIAMONDS_TIME;
        this.scene.game.scene.keys[this.scene.state.farm].autosave();
        this.scene.state.amplitude.logAmplitudeEvent('diamonds_get', {
          type: 'take_ad_diamond',
          count: FREE_DIAMONDS,
        });
        const shopScene: Shop = this.scene.game.scene.keys['Shop'];
        if (shopScene.scene.isActive() && shopScene.diamondsWindow) shopScene.diamondsWindow.pickUpAnim();
        type = 'take_ad_diamond';
        break;
      case 7:
        if (this.scene.state.farm !== 'Cow') {
          farmUser.money += this.scene.state.territory.money * 2;
          this.scene.state.territory.sellResource();
        } else {
          farmUser.money += this.scene.state.territory.factory.money * 2;
          this.scene.state.territory.factory?.sellProducts();
        }
        type = 'take_ad_multiply';
        break;
      case 8:
        MainScene.startHerdBoost();
        farmUser.herdBoostAd = false;
        type = 'take_ad_herd_boost';
        break;
      case 9:
        if (farmUser.feedBoostTime <= 0) {
          farmUser.feedBoostTime += ONE_HOUR;
          MainScene.tryTask(21, 0, 1);
          MainScene.tryClanTask(9, 0, 1);
        } else {
          farmUser.feedBoostTime += TWO_HOURS;
          MainScene.tryTask(21, 0, 2);
          MainScene.tryClanTask(9, 0, 2);
        }
        farmUser.feedBoostAd = false;
        type = 'take_ad_feed_boost';
        break;
      case 10:
        const fortuneScene = this.scene.game.scene.getScene('Fortune') as Fortune;
        fortuneScene.adStartFortune();
        incFortuneAdTimer(this.scene.state, -ONE_HOUR);
        type = 'take_ad_fortune';
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
}