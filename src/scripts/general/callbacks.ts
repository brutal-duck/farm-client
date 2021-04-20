import * as amplitude from 'amplitude-js';

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
        this.game.scene.keys[this.state.farm].adReward();
      }
      
    }

  }

}

export {
  okCallback
}
