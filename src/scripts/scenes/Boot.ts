import * as Webfont from '../libs/Webfonts.js';
import { FAPI } from '../libs/Fapi.js';
import axios from 'axios';
import state from '../state';
import langs from '../langs';
import bridge, { UserInfo } from '@vkontakte/vk-bridge';
import * as amplitude from 'amplitude-js';
import { okCallback } from '../general/callbacks';
import LocalStorage from './../libs/LocalStorage';
import Amplitude from './../libs/Amplitude';

Amplitude.init();
// amplitude.getInstance().init(process.env.AMPLITUDE);

const headerSyst: string = require('./../../assets/images/modal/header-syst.png');
const midSyst: string = require('./../../assets/images/modal/mid-syst.png');
const bottomSyst: string = require('./../../assets/images/modal/bottom-syst.png');
const pbEmptyCorner: string = require('./../../assets/images/modal/pb_empty_corner.png');
const pbEmptyMid: string = require('./../../assets/images/modal/pb_empty_mid.png');
const pbFullCorner: string = require('./../../assets/images/modal/pb_full_corner.png');
const pbFullMid: string = require('./../../assets/images/modal/pb_full_mid.png');
const modal: string = require('./../../assets/images/modal/modal.png');
const close: string = require('./../../assets/images/modal/header_close.png');

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
  private authorization: boolean;
  private name: string;
  private avatar: string;
  public okCallback = okCallback.bind(this);
  public build: string;
  public params: URLSearchParams;

  public init(): void {
    this.build = '3.7.3';
    console.log('Build ' + this.build);
    // console.log('y1')
    this.state = state;
    this.fontsReady = false;
    this.userReady = false;
    this.play = false;
    this.authorization = false;
    this.name = '';
    this.avatar = '';
    this.setAutosaveListener();
    this.checkAbBlock();
    this.setLangs();
    this.setPlatform();
    this.initAmplitude();
    this.loadFonts();
    this.checkUser();

    if (process.env.DEV_CLIENT === window.location.origin) {
      this.initEruda();
    }
  }

  private initEruda(): void {
    // require('../libs/eruda')();
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
    this.load.image('header-close', close);
  }

  public update(): void {
    if (this.userReady && this.fontsReady) {
      this.userReady = false;
      this.fontsReady = false;
      this.setStartState();
    }
  }

  private setPlatform(): void {
    this.platform = 'web';
    // this.platform = 'ya';
    // this.platform = 'android';
    this.hash = '';

    if (this.platform === 'android') {
      this.androidInit();
    }
    const search: string = window.location.search;
    this.params = new URLSearchParams(search);
    const vk: string = this.params.get('api_url');
    const ok: string = this.params.get('api_server');
    if (vk === 'https://api.vk.com/api.php') this.platform = 'vk';
    else if (ok === 'https://api.ok.ru/') this.platform = 'ok';
    // this.platform = 'vk'
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

  private setLangs(): void {
    let lang: string = window.navigator.language;
    lang = lang.toLowerCase();
    let ru: number = lang.indexOf('ru');

    if (ru !== -1) this.lang = 'ru';
    else this.lang = 'en';
    
    this.state.lang = langs[this.lang];
  }

  private initAmplitude(): void {
    this.state.amplitude = new Amplitude(this);
    this.state.amplitude.startIdentify();
  }

  private setStartState(): void {
    this.state.user = {
      diamonds: 0,
      id: '',
      xp: 0,
      hash: this.hash,
      login: '',
      counter: 0,
      mail: '',
      level: 0,
      additionalTutorial: { balance: false, cave: false, collector: false, herdBoost: false, feedBoost: false, eventTutorial: 0 },
      takenReward: true,
      status: ' ',
      statuses: [],
      starterpack: false,
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
    }
    this.state.platform = this.platform;
    this.state.name = this.name;
    this.state.avatar = this.avatar;

    this.scene.stop();

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

  private setCookieHash(hash: string, expires: string): void {
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
      this.checkAndroidUser();
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

  private checkOkUser(): void{
    let FAPIData = FAPI.Util.getRequestParameters();
    FAPI.init(FAPIData.api_server, FAPIData.apiconnection, (): void => {
      this.okCallback(); // коллбэк одноклассников
    });
    this.postCheckUser(Number(FAPIData.logged_user_id))
    this.name = FAPIData.user_name;
    this.avatar = FAPIData.user_image;
    this.checkOkTask({ id: FAPIData.logged_user_id, sessionKey: FAPIData.session_key, sessionSecretKey: FAPIData.session_secret_key });
  }

  private checkWebUser(): void {
    this.hash = this.getCookieHash();
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
          this.initYandexUser().catch((err) => {
            console.log(err);
            ysdk.auth.openAuthDialog().then(() => {
              this.initYandexUser();
            }).catch(() => {
              this.createErrorWindow();
            });
          });
        });
      }
  }

  private async initYandexUser(): Promise<void> {
    return this.state.ysdk.getPlayer().then(player => {
      this.name = player.getName();
      this.avatar = player.getPhoto('large');
      const id: string = player.getUniqueID();
      this.postCheckUser(id);
    });
  }
  
  private checkAndroidUser(): void {
    this.hash = LocalStorage.get('hash');
    this.postCheckUser(this.hash);
  }

  private postCheckUser(id: number | string): void {
    axios.post(process.env.API + '/checkUser', {
      platform: this.platform,
      data: id
    }).then((response) => {
      if (response.data.error === false) {
        if (this.platform === 'web' && response.data.status === 'new') {
          this.createLanding();
        } else if (this.platform === 'web') {
          this.setCookieHash(response.data.hash, response.data.expires);
        } else {
          this.userReady = true;
          this.hash = response.data.hash;
          if (this.platform === 'android') {
            LocalStorage.set('hash', response.data.hash);
          }
        }
      } else this.createErrorWindow();
    }).catch((): void => {
      if (this.hash !== '') {
        this.userReady = true;
      } else {
        if (this.platform === 'web') {
          this.createLanding();
        } else {
          this.createLocalUser();
        }
      }
    });
  }

  private createLanding(): void {
    this.state.amplitude.logAmplitudeEvent('landing_view', {});
    let root = document.querySelector('#root');
    let modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    root.append(modal);
    let modalWindow = document.createElement('div');
    modalWindow.setAttribute('class', 'window');
    modal.append(modalWindow);

    let body = document.createElement('div');
    body.setAttribute('class', 'body-window');
    modalWindow.append(body);
    let header = document.createElement('div');
    header.setAttribute('class', 'header');
    modalWindow.append(header);
    let footer = document.createElement('div');
    footer.setAttribute('class', 'footer');
    modalWindow.append(footer);

    let welcome = document.createElement('div');
    welcome.setAttribute('class', 'welcome');
    welcome.innerHTML = this.state.lang.welcomeToFarm;
    body.append(welcome);

    let playBtn = document.createElement('div');
    playBtn.setAttribute('class', 'play-btn middle-btn');
    playBtn.innerHTML = this.state.lang.play;
    body.append(playBtn);

    let loginText = document.createElement('div');
    loginText.setAttribute('class', 'login');
    let login = document.createElement('span');
    login.innerHTML = this.state.lang.enterTo;
    loginText.append(login);
    loginText.append(this.state.lang.yourAccaunt);
    body.append(loginText);

    let agreement = document.createElement('div');
    agreement.setAttribute('class', 'agreement');
    agreement.innerHTML = this.state.lang.agreement;
    body.append(agreement);

    login.onclick = (): void => {
      modal.remove();
      this.createAuthWindow();
    }

    agreement.onclick = (): void => { window.open('https://' + location.hostname + '/agreement', '_blank'); }

    playBtn.onclick = (): void => {
      if (!this.play) {
        modal.remove();
        axios.post(process.env.API + '/checkUser', {
          platform: 'webNew',
        }).then((response) => {
          if (response.data.error === false) {
            this.setCookieHash(response.data.hash, response.data.expires);
            this.state.amplitude.logAmplitudeEvent('landing_login', {});
          } else this.createErrorWindow();
        }).catch(() => {
          this.createLocalUser();
        });
      }
    }
  }

  private androidInit(): void {
    this.initEruda();
    const cordovaScript: HTMLScriptElement = document.createElement('script');
    cordovaScript.setAttribute('src', 'cordova.js');
    if (!cordovaScript) return;
    document.body.appendChild(cordovaScript);

    document.addEventListener('deviceready', (): void => {
      window.screen.orientation.lock('portrait-primary');

      document.addEventListener('admob.rewardvideo.events.LOAD_FAIL', (): void => {
        // @ts-ignore
        window.admob.rewardvideo.prepare();
        this.state.readyAd = false;
      });

      document.addEventListener('admob.rewardvideo.events.LOAD', (): void => {
        console.log('Android ad ready!');
        this.state.readyAd = true;
      });

      document.addEventListener('admob.rewardvideo.events.CLOSE', (): void => {
        // @ts-ignore
        window.admob.rewardvideo.prepare();
        this.state.readyAd = false;
      });

      document.addEventListener('admob.rewardvideo.events.REWARD', (): void => {
        this.game.scene.keys[this.state.farm].adReward();
        // @ts-ignore
        window.admob.rewardvideo.prepare();
        this.state.readyAd = false;
      });

      // @ts-ignore
      window.admob.rewardvideo.config({
        id: process.env.ADMOB_REWARDED_ID,
        isTesting: true,
      });

      // @ts-ignore
      window.admob.rewardvideo.prepare();
    }, false);
  }

  private createAuthWindow(): void {
    let root = document.querySelector('#root');
    let modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    root.append(modal);
    let modalWindow = document.createElement('div');
    modalWindow.setAttribute('class', 'window');
    modal.append(modalWindow);

    let body = document.createElement('div');
    body.setAttribute('class', 'body-window');
    modalWindow.append(body);
    let header = document.createElement('div');
    header.setAttribute('class', 'header');
    modalWindow.append(header);
    let footer = document.createElement('div');
    footer.setAttribute('class', 'footer');
    modalWindow.append(footer);

    let auth = document.createElement('div');
    auth.setAttribute('class', 'auth');
    auth.innerHTML = this.state.lang.authorize;
    body.append(auth);

    let error = document.createElement('div');
    error.setAttribute('class', 'error');
    body.append(error);
    
    let login = document.createElement('input');
    login.setAttribute('class', 'login-pass');
    login.setAttribute('type', 'text');
    body.append(login);
    let pass = document.createElement('input');
    pass.setAttribute('class', 'login-pass');
    pass.setAttribute('type', 'password');
    body.append(pass);

    let btnAuth = document.createElement('div');
    btnAuth.setAttribute('class', 'big-btn big-btn-css mt-10');
    btnAuth.innerHTML = this.state.lang.enter;
    body.append(btnAuth);
    
    let cancel = document.createElement('div');
    cancel.setAttribute('class', 'big-btn big-btn-css');
    cancel.innerHTML = this.state.lang.cancel;
    body.append(cancel);

    cancel.onclick = (): void => {
      modal.remove();
      this.createLanding();
    }

    btnAuth.onclick = (): void => {
      if (!this.authorization) {
        error.innerHTML = '';
        axios.post(process.env.API + '/authorization', {
          login: login.value,
          pass: pass.value
        }).then((response) => {
          this.authorization = false;
          if (response.data.success) {
            modal.remove();
            this.setCookieHash(response.data.hash, response.data.expires);
          } else error.innerHTML = this.state.lang.wrongLoginPass;
        }).catch(() => {
          this.createErrorWindow();
        });
      }
    }
  }

  public createErrorWindow(): void {

    let modal = document.querySelector('.modal');
    if (modal) modal.remove();
    
    let root = document.querySelector('#root');
    modal = document.createElement('div');
    modal.setAttribute('class', 'modal');
    root.append(modal);
    let modalWindow = document.createElement('div');
    modalWindow.setAttribute('class', 'window');
    modal.append(modalWindow);

    let body = document.createElement('div');
    body.setAttribute('class', 'body-window');
    modalWindow.append(body);
    let header = document.createElement('div');
    header.setAttribute('class', 'header');
    modalWindow.append(header);
    let footer = document.createElement('div');
    footer.setAttribute('class', 'footer');
    modalWindow.append(footer);

    let error = document.createElement('div');
    error.setAttribute('class', 'unknown-error');
    error.innerHTML = this.state.lang.unknownError;
    body.append(error);

    let reload = document.createElement('div');
    reload.setAttribute('class', 'reload-btn middle-btn');
    reload.innerHTML = this.state.lang.reload;
    body.append(reload);

    reload.onclick = (): void => {
      window.location.reload();
    }

  }

  private createLocalUser(): void {
    console.log('localUser');
    this.state.amplitude.logAmplitudeEvent('landing_login', {});
    let expires: Date | string = new Date();
    expires.setFullYear(expires.getFullYear() + 1);
    expires = expires.toUTCString();
    this.setCookieHash('local', expires);
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
      subNative: false,
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
        if (data.scope === 'notify') this.state.vkTask.subNative = data.allowed;
        if (data.scope === 'menu') this.state.vkTask.addFavorites = data.allowed;
      })
    }).catch(err => console.log(err));
  }

  private checkOkTask(data: { id: string; sessionKey: string; sessionSecretKey: string; }): void {
    this.state.okTask = {
      joinGroup: false,
      subGroup: false,
      addFavorites: false,
    };
    axios.post(process.env.API + '/checkOkTask', data).then(res => {
      this.state.okTask.joinGroup = res.data.data.joinGroup;
      this.state.okTask.subGroup = res.data.data.subGroup;
    });

    FAPI.Client.call({ 'method':'storage.get', 'keys': 'addFavourites' }, (status, data, error) => {
      if (data) this.state.okTask.addFavorites = JSON.parse(data.data.addFavourites);
    });
  }
}

export default Boot;
