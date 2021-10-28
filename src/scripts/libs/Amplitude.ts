import * as amplitude from 'amplitude-js';
import Boot from './../scenes/Boot';
import Sheep from './../scenes/Sheep/Main';
import Chicken from './../scenes/Chicken/Main';
import Unicorn from './../scenes/Event/Unicorns/Main';
import Cow from './../scenes/Cow/Main';

const VK_DEVELOPERS_ID: Array<number> = [41285968, 191781124, 164603032, 23755036, 60373258, 3922194];

export default class Amplitude implements Iamplitude {
  private state: Istate;
  private scene: Boot;
  private active: boolean = false;
  private amplitude: any;

  constructor (scene: Boot) {
    this.scene = scene;
    this.state = scene.state;
    this.amplitude = amplitude;
  }

  public static init(): void {
    amplitude.getInstance().init(process.env.AMPLITUDE);
  }

  public startIdentify(): void {
    try {
      const identify = new this.amplitude.Identify().setOnce('start_version', this.scene.build);
      this.amplitude.getInstance().identify(identify);
      this.setRevenue();
      this.active = true;
    } catch (e) {
      console.log(e);
      this.active = false;
    }
  }

  public setFarmIdentify(): void {
    if (this.active) {
      const identify = new this.amplitude.Identify()
        .set('diamond_balance', this.state.user.diamonds)
        .set('user_id', this.state.user.id)
        .set('browser', navigator.userAgent)
        .set('partner', this.state.platform)
        .set('test', this.state.user.test)
        .set(`Catcher${this.state.farm}`, this.state[`user${this.state.farm}`].collectorLevel);

      if (this.state.platform === 'ok' || this.state.platform === 'vk') {
        let refer: string = '';
        location.search.substr(1).split('&').forEach(item => {
          const [key, value] = item.split('=');
          if (
            this.state.platform === 'vk' && key === 'referrer' 
            || this.state.platform === 'ok' && key === 'refplace'
          ) {
            refer = value;
          }
        });
        identify.set('referrer', refer);
      }
      this.amplitude.getInstance().identify(identify);
      // this.amplitude.getInstance().logEvent('load_time', {
      //   seconds: loadTime
      // });
    }
  }

  private setRevenue(): void {
    const OutSum: string = this.scene.params.get('OutSum');
    const InvId: string = this.scene.params.get('InvId');

    if (OutSum && InvId) {
      const revenue: amplitude.Revenue = new this.amplitude.Revenue()
        .setProductId('Product #' + InvId)
        .setPrice(OutSum);
        this.amplitude.logRevenueV2(revenue);
    }
  }

  public logAmplitudeEvent(eventName: string, data: IamplitudeData): void {
    if (this.active && !VK_DEVELOPERS_ID.some(el => el === this.state.vkId)) {
      const eventData: IamplitudeData = this.getEventData(data);
      this.amplitude.getInstance().logEvent(eventName, eventData);
    } else {
      console.log('Исключение', eventName);
    }
  }
  
  public logAmplitudeRevenue(productId: string, price: number, type: string = '',  data: IamplitudeData): void {
    if (this.active && !VK_DEVELOPERS_ID.some(el => el === this.state.vkId)) {
      const revenueData: IamplitudeData = this.getEventData(data);
      const revenue: amplitude.Revenue = new this.amplitude.Revenue()
        .setProductId(productId)
        .setPrice(price)
        .setEventProperties(revenueData);
    
      if (type) revenue.setRevenueType(type);
      this.amplitude.logRevenueV2(revenue);
    } else {
      console.log('Исключение ревеню', productId);
    }
  }

  private getEventData(data: IamplitudeData): IamplitudeData {
    let eventData: IamplitudeData;
    const MainScene: Sheep | Chicken | Cow = this.scene.game.scene.getScene(this.state.farm) as Sheep | Chicken | Cow;
    const CowScene: Cow = this.scene.game.scene.getScene('Cow') as Cow;
    const UnicornScene: Unicorn = this.scene.game.scene.getScene('Unicorn') as Unicorn;
  
    if (this.state.farm !== 'Unicorn' && data.farm_id !== 'Unicorn') {
      const balance: Ibalance = MainScene?.balance();
      const waterPercent: number = balance?.notEnoughWater ? -1 * balance?.waterPercent : balance?.waterPercent;
      const grassPercent: number = balance?.notEnoughGrass ? -1 * balance?.grassPercent : balance?.grassPercent;
      let countAnimal: number = 0;
      if (this.state.farm !== 'Cow') this[this.state.farm?.toLowerCase()]?.children.entries.length;
      if (this.state.farm === 'Cow') countAnimal = CowScene?.animalGroup?.children.entries.length;
  
      eventData = {
        test: this.state.user?.test,
        farm_id: this.state.farm,
        chapter: this.state[`user${this.state.farm}`]?.part,
        diamonds: this.state.user?.diamonds,
        money: this.state[`user${this.state.farm}`]?.money,
        fairLevel: this.state[`user${this.state.farm}`]?.fair,
        collector: this.state[`user${this.state.farm}`]?.collector,
        countAnimal: countAnimal,
        balanceWaterPercent: waterPercent,
        balanceGrassPercent: grassPercent,
      }
    } else {
      let countAnimal: number = UnicornScene?.animals?.children.entries.length;
      if (!countAnimal) countAnimal = 0;
  
      eventData = {
        test: this.state.user.test,
        farm_id: this.state.farm,
        chapter: this.state[`user${this.state.farm}`].points,
        diamonds: this.state.user.diamonds,
        money: this.state[`user${this.state.farm}`].money,
        collector: this.state[`user${this.state.farm}`].collector,
        countAnimal: countAnimal,
      }
    }
    for (const key in data) {
      eventData[key] = data[key];
    }
    return eventData;
  }
}