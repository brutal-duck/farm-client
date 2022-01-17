import * as Webfont from '../libs/Webfonts.js';
import { FAPI } from '../libs/Fapi.js';
import axios, { AxiosResponse } from 'axios';
import state from '../state';
import langs from '../langs';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import { okCallback } from '../general/callbacks';
import LocalStorage from './../libs/LocalStorage';
import Amplitude from './../libs/Amplitude';
import Landing from '../components/Web/Landing';
import Login from '../components/Web/Login';
import ErrorWindow from '../components/Web/ErrorWindow';
import { clickShopBtn, clickModalBtn, click } from './../general/clicks';
import { shopButton, bigButton } from './../elements';
import { setPlatformStorage, getPlatformStorage } from './../general/basic';
import RoundedField from '../components/gameObjects/RoundedField';
import ConfirmSaveAndroidProgress from './../components/Web/ConfirmSaveAndroidProgress';
import achievements from './../local/tasks/achievements';

Amplitude.init();

const headerSyst: string = require('./../../assets/images/modal/header-syst.png');
const midSyst: string = require('./../../assets/images/modal/mid-syst.png');
const bottomSyst: string = require('./../../assets/images/modal/bottom-syst.png');
const pbEmptyCorner: string = require('./../../assets/images/modal/pb_empty_corner.png');
const pbEmptyMid: string = require('./../../assets/images/modal/pb_empty_mid.png');
const pbFullCorner: string = require('./../../assets/images/modal/pb_full_corner.png');
const pbFullMid: string = require('./../../assets/images/modal/pb_full_mid.png');
const modal: string = require('./../../assets/images/modal/modal.png');
const landingBtn: string = require('./../../assets/images/modal/middle-button.png');
const loginBtnGreen: string = require('./../../assets/images/modal/btn_lg.png');
const loginBtnRed: string = require('./../../assets/images/modal/btn_lr.png');
const loginBtnYellow: string = require('./../../assets/images/modal/btn_ly.png');
const pixelForLanding: string = require('./../../assets/images/white-pixel.jpg');
const diamondLil: string = require('../../assets/images/icons/diamond-lil.png');

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  public state: Istate;
  public platform: string;
  private hash: string;
  private lang: string;
  private fontsReady: boolean;
  private userReady: boolean;
  private play: boolean;
  private name: string;
  private avatar: string;
  public okCallback = okCallback.bind(this);
  public build: number;
  public params: URLSearchParams;
  private landing: Landing;
  private authorizationWindow: Login;
  private createnLanding: boolean = true;
  private doubleSave: boolean = false;
  private pushToken: string = '';
  public androidData: IconfirmAndroidData;
  private serverError: boolean;

  public shopButton = shopButton.bind(this);
  public bigButton = bigButton.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public click = click.bind(this);
  public setPlatformStorage = setPlatformStorage.bind(this);
  public getPlatformStorage = getPlatformStorage.bind(this);

  public init(): void {
    this.build = 4.18;
    // console.log(this.game.device, 'this.game.device');
    this.state = state;
    this.fontsReady = false;
    this.userReady = false;
    this.play = false;
    this.name = '';
    this.avatar = '';
    this.setAutosaveListener();
    this.checkAbBlock();
    this.setPlatform();
    this.setLangs();
    this.initAmplitude();
    this.loadFonts();
    this.checkUser();
    this.switchingMusic();
    this.addNewGameObjectsInFactory();
  }

  private setAutosaveListener(): void {
    window.addEventListener('beforeunload', (): void => {
      if ((this.state.farm === 'Sheep' && this.scene.isActive('Sheep')) ||
        (this.state.farm === 'Chicken' && this.scene.isActive('Chicken')) ||
        (this.state.farm === 'Cow' && this.scene.isActive('Cow')) ||
        (this.state.farm === 'Unicorn' && this.scene.isActive('Unicorn'))) {
        this.game.scene.keys[this.state.farm].autosave();
      }
    }, false);
  }

  public preload(): void {
    this.load.image('header-syst', headerSyst);
    this.load.image('mid-syst', midSyst);
    this.load.image('bottom-syst', bottomSyst);
    this.load.image('pb-empty-corner', pbEmptyCorner);
    this.load.image('pb-empty-mid', pbEmptyMid);
    this.load.image('pb-full-corner', pbFullCorner);
    this.load.image('pb-full-mid', pbFullMid);
    this.load.image('modal', modal);
    this.load.image('diamond-lil', diamondLil);
    this.load.image('shop-btn', landingBtn);
    this.load.image('big-btn-green', loginBtnGreen);
    this.load.image('big-btn-red', loginBtnRed);
    this.load.image('big-btn-yellow', loginBtnYellow);
    this.load.image('pixel-landing', pixelForLanding);
  }

  public update(): void {
    if (this.userReady && this.fontsReady) {
      this.userReady = false;
      this.fontsReady = false;
      this.setStartState();
      this.initVolume();
    }
    if (!this.createnLanding && this.fontsReady) {
      this.createLanding();
    }
    if (this.fontsReady && this.doubleSave) {
      new ConfirmSaveAndroidProgress(this);
      this.doubleSave = false;
    }

    if (this.fontsReady && this.serverError) {
      this.serverError = false;
      this.children.destroy();
      new ErrorWindow(this, this.state.lang.checkYourInternet); 
    }
  }

  private initVolume(): void {
    if (this.state.platform !== 'ya') {
      this.getPlatformStorage('musicVolume').then(data => {
        if (data) this.state.musicVolume = Number(data);
        this.getPlatformStorage('soundVolume').then(data => {
          if (data) this.state.soundVolume = Number(data);
        }).catch(() => {
          this.state.soundVolume = 1;
          this.state.musicVolume = 1;
          this.setPlatformStorage('soundVolume', String(this.state.soundVolume));
        });
      }).catch(() => {
        this.state.musicVolume = 1;
        this.setPlatformStorage('musicVolume', String(this.state.musicVolume));
      });
    } else {
      this.getPlatformStorage('volume').then(data => {
        if (data.music && data.sound) {
          this.state.musicVolume = Number(data.music);
          this.state.soundVolume = Number(data.sound);
        } else {
          this.state.musicVolume = 1;
          this.state.soundVolume = 1;
          this.setPlatformStorage('volume', {
            music: this.state.musicVolume,
            sound: this.state.soundVolume,
          });
        }
      });
    }
  }

  private setPlatform(): void {
    this.platform = process.env.platform === 'ya' ? 'ya' : process.env.platform === 'android' ? 'android' : 'web';
    this.hash = '';

    const search: string = window.location.search;
    this.params = new URLSearchParams(search);
    // location.search.substr(1).split('&').forEach(function (item) {
    //   console.log(item)
    // })
    const vk: string = this.params.get('api_url');
    const ok: string = this.params.get('api_server');
    if (vk === 'https://api.vk.com/api.php') this.platform = 'vk';
    else if (ok === 'https://api.ok.ru/') this.platform = 'ok';
    console.log('Platform', this.platform);
  }

  private loadFonts(): void {
    let scene: Boot = this;
    Webfont.load({
      custom: {
        families: ['Shadow', 'Bip']
      },
      active() {
        scene.fontsReady = true;
      }
    });
  }

  private setLangs(lang?: string): void {
    if (lang) {
      if (lang !== 'ru') lang = 'en';
      this.lang = lang;
      this.state.lang = langs[this.lang];
      return;
    }
    if (this.platform !== 'vk' && this.platform !== 'ok') {
      let lang: string = window.navigator.language;
      lang = lang.toLowerCase();
      let ru: number = lang.indexOf('ru');
  
      if (ru !== -1) this.lang = 'ru';
      else this.lang = 'en';
    } else this.lang = 'ru';
    this.state.lang = langs[this.lang];
  }

  private initAmplitude(): void {
    this.state.amplitude = new Amplitude(this);
    this.state.amplitude.startIdentify();
  }

  private setStartState(): void {
    this.state.user = {
      takeFreeDiamondTime: 0,
      fortuneTimeAd: 3600 * 3,
      achievements: achievements,
      diamonds: 0,
      avatar: '',
      boughtAvatars: [],
      id: '',
      clanId: '',
      xp: 0,
      hash: this.hash,
      login: '',
      counter: 0,
      mail: '',
      level: 0,
      additionalTutorial: { balance: false, cave: false, collector: false, herdBoost: false, feedBoost: false, eventTutorial: false },
      takenReward: true,
      status: ' ',
      statuses: [],
      starterpack: false,
      clanTasks: [],
      boosts: {
        sheep: {
          collector4: 0,
          collector12: 0,
          herd: 0,
          feed: 0
        },
        chicken: {
          collector4: 0,
          collector12: 0,
          herd: 0,
          feed: 0
        },
        cow: {
          collector4: 0,
          collector12: 0,
          herd: 0,
          feed: 0,
          factory: 0,
        },
        fortune: 0,
      },
      test: '',
      takenFreeDiamonds: false,
      takenSocialAward: false,
      messages: [],
      personalMessages: [],
    }
    this.state.platform = this.platform;
    this.state.build = this.build;
    this.state.name = this.name;
    this.state.avatar = this.avatar;

    this.scene.stop();

    if (this.platform === 'android') {
      try { window[`Adjust`].trackEvent(this.state.adjust.firstOpenEvent) }
      catch (err) { console.log('ADJUST', err) }
    }
   
    if (LocalStorage.get('farm') === 'Sheep' ||
      LocalStorage.get('farm') === 'Chicken' ||
      LocalStorage.get('farm') === 'Cow') {
      this.scene.start(LocalStorage.get('farm') + 'Preload', this.state);
    } else {
      this.scene.start('SheepPreload', this.state);
    }
  }

  private getCookieHash(): string {
    let cookie = document.cookie;
    let result = cookie.split(';');
    let hash: string = '';

    for (let j = 0; j < result.length; j++) {
      result[j] = result[j]?.replace(/(\s*)\B(\s*)/g, '');
      let searchHash = result[j]?.indexOf('farmHASH');
      if (searchHash === 0) {
        hash = result[j].slice(9);
        break;
      }
    }
    return hash;
  }

  public setCookieHash(hash: string, expires: string): void {
    this.hash = hash;
    document.cookie = 'farmHASH=' + hash + '; expires=' + expires + '; path=/;';
    this.userReady = true;
  }

  private checkUser(): void {
    if (this.platform === 'vk') {
      this.checkVkUser();
    } else if (this.platform === 'ok') {
      this.checkOkUser();
    } else if (this.platform === 'web') {
      this.checkWebUser();
    } else if (this.platform === 'ya') {
      this.checkYandexUser();
    } else if (this.platform === 'android') {
      this.initAndroidPlatform();
    }
  }

  private async checkVkUser(): Promise<void> {
    // тестовые
    // this.avatar = 'https://vk.com/images/camera_200.png';
    // this.state.vkId = 20506616;
    // data = 20506616;
    bridge.send('VKWebAppInit', {});
    let bridgeData: UserInfo = await bridge.send('VKWebAppGetUserInfo', {});
    this.postCheckUser(bridgeData.id);
    this.state.vkId = bridgeData.id;
    this.name = bridgeData.first_name + ' ' + bridgeData.last_name;
    this.avatar = bridgeData.photo_200;
    this.checkVkTask();
  }

  private checkOkUser(): void {
    const FAPIData = FAPI.Util.getRequestParameters();
    FAPI.init(FAPIData.api_server, FAPIData.apiconnection, (): void => {
      this.okCallback(); // коллбэк одноклассников
    });
    this.postCheckUser(Number(FAPIData.logged_user_id))
    this.name = FAPIData.user_name;
    this.avatar = FAPIData.user_image;
    this.checkOkTask({ id: FAPIData.logged_user_id, sessionKey: FAPIData.session_key, sessionSecretKey: FAPIData.session_secret_key });
  }

  private checkWebUser(): void {
    this.hash = LocalStorage.get('hash');
    this.postCheckUser(this.hash);
  }

  private checkYandexUser(): void {
    const d: Document = document;
    const t: HTMLScriptElement = d.getElementsByTagName('script')[0];
    const s: HTMLScriptElement = d.createElement('script');
    s.src = 'https://yandex.ru/games/sdk/v2';
    s.async = true;
    t.parentNode.insertBefore(s, t);
    s.onload = (): void => {
      window['YaGames'].init().then((ysdk: any) => {
        this.state.ysdk = ysdk;
        this.setLangs(ysdk.environment.i18n.lang);
        this.initYandexUser().catch((err) => {
          this.hash = LocalStorage.get('hash');
          this.postCheckUser(this.hash);
        });
      });
    }
  }

  private async initYandexUser(): Promise<void> {
    return this.state.ysdk.getPlayer().then(player => {
      const id: string = player.getUniqueID();
      this.name = player.getName();
      if (!this.name) this.name = `yandex_${id.substr(0, 4)}`;
      this.state.yandexName = this.name;
      this.avatar = player.getPhoto('large');
      this.state.yaPlayer = player;
      this.postCheckUser(id, true);
    });
  }

  private initAndroidPlatform(): void {
    const cordovaScript: HTMLScriptElement = document.createElement('script');
    cordovaScript.setAttribute('src', 'cordova.js');
    if (!cordovaScript) return;
    document.body.appendChild(cordovaScript);

    document.addEventListener('deviceready', (): void => {
      this.hash = LocalStorage.get('hash');
      this.initAndroidAdjust();
      this.FBinit();
      window.screen.orientation.lock('portrait-primary');

      const admob = window['admob'];
      admob.start().then(() => {
        this.initAndroidRewardedAd();
        this.initAndroidInterstitialAd();
      });

      this.pushToken = '';
      let userData: IgooglePlayServicesData | string = this.hash;
      let token: boolean = false;
      let login: boolean = false;

      const checkUser = (): void => {
        if (token && login) {
          if (userData !== this.hash) {
            const data: IgooglePlayServicesData = userData as IgooglePlayServicesData;
            this.checkAuthAndroidUser(data);
          } else {
            this.postCheckUser(userData);
          }
        }
      }

      const pushNotification = window['pushNotification'];
      pushNotification.registration(
        (data: string): void => {
          token = true;
          this.pushToken = data;
          checkUser();
        },
        (): void => {
          token = true;
          checkUser();
        }
      );

      document.addEventListener("play.SILENT_SIGNED_IN_FAILED",  (): void => {
        if (!login) {
          login = true;
          checkUser();
        }
      });
      document.addEventListener("play.SIGN_IN_FAILED",  (): void => {
        if (!login) {
          login = true;
          checkUser();
        }
      });
      document.addEventListener("play.PLAYER_INFO",  (data: any): void => {
        if (!login) {
          login = true;
          userData = data;
          checkUser();
        }
      });
      
      const cordova = window['cordova'];
      cordova.plugins.playGamesServices.initialize();
    });
  }

  private FBinit(): void {
    const script = document.createElement('script');
    script.setAttribute('src', 'text/javascript');
    script.setAttribute('src', 'https://connect.facebook.net/en_US/sdk.js');
    script.setAttribute('charset', 'utf-8');
    document.body.append(script);

    script.onload = (): void => {
      const FB = window['FB'];
      FB.init({
        appId: '911792946365467',
        xfbml: true,
        version: 'v9.0'
      });
    }
  }

  private checkAuthAndroidUser(data: IgooglePlayServicesData): void {
    this.state.playId = data.playerId;
    if (this.hash) {
      this.checkOldUser().then(res => {
        const { hashUser, servicesUser } = res.data;
        if (hashUser && !servicesUser) {
          this.updateAndroidUser(data).then(() => {
            LocalStorage.set('hash', '');
            this.postCheckUser(data.playerId, true);
          }).catch(e => {
            this.serverError = true;
          });
        } else if (hashUser && servicesUser) {
          this.androidData = {
            servicesData: data,
            hashUser: hashUser,
            servicesUser: servicesUser,
          };
          this.doubleSave = true;
        } else {
          this.postCheckUser(data.playerId, true, data.displayName);
          LocalStorage.set('hash', '');
        }
      }).catch(e => {
        this.serverError = true;
      });
    } else {
      this.checkOldUser().then(res => {
        const { servicesUser } = res.data;
        if (servicesUser) {
          this.postCheckUser(data.playerId, true);
        } else {
          this.postCheckUser(data.playerId, true, data.displayName);
        }
      }).catch(e => {
        this.serverError = true;
      });
    }
  }

  private checkOldUser(): Promise<AxiosResponse<any>> {
    return axios.post(process.env.API + '/checkAndroidUser', { hash: this.hash, id: this.state.playId });
  }

  public updateAndroidUser(data: IgooglePlayServicesData): Promise<AxiosResponse<{ error: boolean }>> {
    return axios.post(process.env.API + '/updateAndroidUser', { hash: this.hash, playId: data.playerId, login: data.displayName });
  }

  private initAndroidAdjust(): void {
    // @ts-ignore
    const adjustConfig = new AdjustConfig(process.env.ADJUST, AdjustConfig.EnvironmentProduction); // Для продакшена
    window[`Adjust`].create(adjustConfig);
    
    this.state.adjust = {
      // @ts-ignore
      firstOpenEvent: new AdjustEvent("odowuy"),
      // @ts-ignore
      tutorialDoneEvent: new AdjustEvent("nalk5e"),
      // @ts-ignore
      shopPurchaseEvent: new AdjustEvent("s1xl3a"),
      // @ts-ignore
      adEvent: new AdjustEvent("2zs7zu")
    }
  }

  private initAndroidRewardedAd(): void {
    const admob = window['admob'];
    this.state.admob.rewarded = new admob.RewardedAd({
      // adUnitId: 'ca-app-pub-3940256099942544/5224354917',
      adUnitId: process.env.ADMOB_REWARDED_ID,
    });
    this.state.admob.rewarded.on('loadfail', (): void => {
      this.state.readyAd = false;
      this.state.admob.rewarded.load();
    });
    this.state.admob.rewarded.on('load', (): void => {
      this.state.readyAd = true;
    });
    this.state.admob.rewarded.on('show', (): void => {
      this.state.admob.rewarded.load();
    });
    this.state.admob.rewarded.on('showfail', (): void => {
      this.state.admob.rewarded.load();
    });
    this.state.admob.rewarded.on('dismiss', (): void => {
      this.state.musicVolume = this.game.scene.keys[this.state.farm].ads.musicVolume;
      this.state.soundVolume = this.game.scene.keys[this.state.farm].ads.soundVolume;
      // @ts-ignore
      this.sound.get('music').volume = this.state.musicVolume;
    });
    this.state.admob.rewarded.on('reward', (): void => {
      this.game.scene.keys[this.state.farm].ads.adReward();
      if (this.platform === 'android') {
        try { window[`Adjust`].trackEvent(this.state.adjust.adEvent) }
        catch (err) { console.log(err) }
      }
    });
    this.state.admob.rewarded.load();
  }

  private initAndroidInterstitialAd(): void {
    const admob = window['admob'];
    this.state.admob.interstitial = new admob.InterstitialAd({
      // adUnitId: 'ca-app-pub-3940256099942544/1033173712',
      adUnitId: process.env.ADMOB_INTERSTITIAL_ID,
    });
    this.state.admob.interstitial.on('load', (): void => {
      this.state.admob.interstitial.show();
    });
    this.state.admob.interstitial.on('show', (): void => {
      this.state.amplitude.logAmplitudeRevenue('interstitial', 0, 'interstitial', {});
    });
  }

  public postCheckUser(id: number | string, auth?: boolean, login?: string): void {
    axios.post(process.env.API + '/checkUser', {
      platform: this.platform,
      data: id,
      auth: auth,
      pushToken: this.pushToken,
      login: login,
    }).then((response) => {
      const { hash, error, expires, status } = response.data;
      if (error === false) {
        if (this.platform === 'web' && status === 'new') {
          this.createnLanding = false;
        } else if (
          this.platform === 'web' 
          || (this.platform === 'android' 
          || this.platform === 'ya') && !auth
        ) {
          this.setLocalStorageHash(hash);
        } else {
          this.userReady = true;
          this.hash = hash;
        }
      } else this.createErrorWindow();
    }).catch((): void => {
      this.serverError = true;
    });
  }

  public setLocalStorageHash(hash: string): void {
    this.userReady = true;
    this.hash = hash;
    LocalStorage.set('hash', hash);
  }

  public createLanding(): void {
    this.createnLanding = true;
    if (this.authorizationWindow) {
      this.landing = new Landing(this);
    } else {
      this.landing = new Landing(this);
      this.state.amplitude.logAmplitudeEvent('landing_view', {});
    }
    this.destroyAuthorizationWindow();
  }

  private destroyLanding(): void {
    this.landing?.destroy();
  }

  public createAuthorizationWindow(): void {
    this.destroyLanding();
    this.authorizationWindow = new Login(this);
  }

  private destroyAuthorizationWindow(): void {
    this.authorizationWindow?.destroy();
  }

  public playBtnHandler(): void {
    if (!this.play) {
      axios.post(process.env.API + '/checkUser', {
        platform: 'webNew',
      }).then((response) => {
        if (response.data.error === false) {
          this.setLocalStorageHash(response.data.hash);
          this.state.amplitude.logAmplitudeEvent('landing_login', {});
        } else this.createErrorWindow();
      }).catch(() => {
        this.serverError = true;
      });
    }
  }

  public createErrorWindow(): void {
    this.destroyLanding();
    this.destroyAuthorizationWindow();
    new ErrorWindow(this);
  }

  private checkAbBlock(): void {
    this.state.adBlock = true;
    const block = document.querySelector('#adblock');
    if (block) {
      if (block.clientHeight > 1) this.state.adBlock = false;
    }
  }

  private checkVkTask(): void {
    this.state.vkTask = {
      joinGroup: false,
      subGroup: false,
      subNotification: false,
      addFavorites: false
    }
    const data = {
      id: this.state.vkId,
    };

    axios.post(process.env.API + '/checkVkTask', data).then(res => {
      this.state.vkTask.joinGroup = res.data.data.joinGroup;
      this.state.vkTask.subGroup = res.data.data.subGroup;
    }).catch(err => console.log(err));

    bridge.send('VKWebAppCheckAllowedScopes', { scopes: 'menu, notify' }).then(res => {
      res.result.forEach(data => {
        if (data.scope === 'notify') this.state.vkTask.subNotification = data.allowed;
        if (data.scope === 'menu') this.state.vkTask.addFavorites = data.allowed;
      })
    }).catch(err => console.log(err));
  }

  private checkOkTask(data: { id: string; sessionKey: string; sessionSecretKey: string; }): void {
    this.state.okTask = {
      joinGroup: false,
      subGroup: false,
      addFavorites: false,
      sendPost: false,
    };
    axios.post(process.env.API + '/checkOkTask', data).then(res => {
      this.state.okTask.joinGroup = res.data.data.joinGroup;
      this.state.okTask.subGroup = res.data.data.subGroup;
      // this.state.okTask.sendPost = res.data.data.sendPost;
    });

    FAPI.Client.call({ 'method': 'storage.get', 'keys': 'addFavourites, sendPost' }, (status, data, error) => {
      if (data) {
        this.state.okTask.addFavorites = JSON.parse(data.data.addFavourites);
        this.state.okTask.sendPost = JSON.parse(data.data.sendPost);
      }
    });
  }

  private switchingMusic(): void {
    document.addEventListener('visibilitychange', (): void => {
      if (document.visibilityState === 'visible') {
        setTimeout((): void => {
          const music: Phaser.Sound.BaseSound = this.sound.get('music');
          music?.play();
        }, 10);
      } else {
        const music: Phaser.Sound.BaseSound = this.sound.get('music');
        music?.pause();
      }
    }, false);
  }

  private addNewGameObjectsInFactory(): void {
    Phaser.GameObjects.GameObjectFactory.register(
      'roundedField',
      function (this: Phaser.GameObjects.GameObjectFactory, x: number, y: number, width: number, height: number, atlasTexure: string) {
        return new RoundedField(this.scene, x, y, width, height, atlasTexure)
      }
    )
  }
}

export default Boot;
