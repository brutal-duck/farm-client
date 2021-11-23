import { FAPI } from '../libs/Fapi.js';

// коллбэк одноклассников
function okCallback(): void {

  let win: any = window;
  win.API_callback = (method: any, result: any, data: any): void => {
    
    // метод успешной оплаты
    if (method === 'showPayment' && result === 'ok') {
      this.game.scene.keys[this.state.farm].autosave();
    }

    // метод готовой рекламы
    if (method === 'loadAd') {
      if (result === 'ok') {
        setTimeout((): void => {
          this.state.readyAd = true;
        }, 5000);
      } else {
        this.state.adTimeout = false;
      }
    }

    // метод просмотра рекламы
    if (method === 'showLoadedAd') {
      this.state.adTimeout = false;
      if (result === 'ok' && (data === 'complete' || data === 'ad_shown')) {
        this.game.scene.keys[this.state.farm].ads.adReward();
      }
      this.scene.state.musicVolume = this.musicVolume;
      this.scene.state.soundVolume = this.soundVolume;
      //@ts-ignore
      this.scene.sound.get('music').volume = this.scene.state.musicVolume;
    }

    
    if (method === 'postMediatopic') {
      if (result === 'ok') {
        this.state.amplitude.logAmplitudeEvent('wall_post', {});
        this.state.okTask.sendPost = true;
        if (this.scene.isActive('Modal') && this.state.modal.type === 14) {
          this.game.scene.keys['Modal'].socialTakskWindow.socialTasks.sendPost = true;
          this.game.scene.keys['Modal'].socialTakskWindow.sendPostTask.setState(true);
          this.game.scene.keys['Modal'].socialTakskWindow.setTakeBtnState();
        }
        FAPI.Client.call({ 'method':'storage.set', 'key': 'sendPost', 'value': JSON.stringify(true) });
      }
    }

    if (method === 'showAd') {
      this.state.amplitude.logAmplitudeRevenue('interstitial', 0, 'interstitial', {});
    }
  }
}

export {
  okCallback
}
