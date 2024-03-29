import {shortTime} from './../../general/basic';
import Arrow from '../../components/animations/Arrow';
import Firework from '../../components/animations/Firework';
import Hearts from '../../components/animations/Hearts';
import Egg from '../../components/Resource/Egg';
import { decrementAdFreeDiamondTime, incFortuneAdTimer, incInterstitialAdTimer, progressClanCooldown, progressClanEventTime, progressSalesTime, showSale } from '../../general/interval';
import SpeechBubble from '../../components/animations/SpeechBuble';
import ChickenTerritory from './../../components/Territories/ChickenTerritory';
import Utils from './../../libs/Utils';
let checkCollector: number = 0;
let sheepCollectorVolume: number = 0;
let cowCollectorVolume: number = 0;
const BALANCE_HINT_COUNTDOWN = 30;
let balanceCounter: number = 0;
let balanceCounterMultiplier = 1;

function interval(): void {

  // значение отступа для яиц, чтоб не прилегали к краям территории
  let indent: number = 20;

  let statusBalance: boolean = false;

  let checkRaiting: boolean = false;

  let arrowOnMap: Phaser.GameObjects.Sprite;
  
  this.time.addEvent({ delay: 1000, callback: (): void => {
    if (process.env.platform === 'gd') {
      this.ads.showInterstitialAd();
    }
    
    // проверка подключения к интернету
    this.onlineStatus();

    let balance: Ibalance = this.balance();

    // Подсказка при отрицательном балансе
    if (balance.notEnoughGrass || balance.notEnoughWater) {
      balanceCounter++;

      if (balanceCounter >= BALANCE_HINT_COUNTDOWN * balanceCounterMultiplier) {
        SpeechBubble.create(this.game.scene.keys['ChickenBars'], this.state.lang.remainderBalance, 4);
        balanceCounter = 0;
        balanceCounterMultiplier++;
      }

      if (Phaser.Math.Between(0, 7) >= 5 && this.chicken.children.entries.length > 0) {
        let randomIndex: number = Phaser.Math.Between(0, this.chicken.children.entries.length - 1);
        let textures: string[] = ['not-enought-water', 'not-enought-grass'];
        let texture: string = textures[Phaser.Math.Between(0, 1)];

        if (balance.notEnoughGrass && !balance.notEnoughWater) texture = 'not-enought-grass';
        else if (balance.notEnoughWater && !balance.notEnoughGrass) texture = 'not-enought-water';
        
        Hearts.create(this, this.chicken.children.entries[randomIndex], texture);
      }

    } else if (balanceCounter !== 0 && balanceCounterMultiplier !== 1) {
      balanceCounter = 0;
      balanceCounterMultiplier = 1;
    }

    if (!statusBalance && balance.alarm) {
      this.state.amplitude.logAmplitudeEvent('resources', {
        status: 'problem started',
      });
    } else if (statusBalance && !balance.alarm) {
      this.state.amplitude.logAmplitudeEvent('resources', {
        status: 'problem is over',
      });
    }

    statusBalance = balance.alarm;

    let checkTerritory = true;
    // восстановаление территорий
    for (let i in this.territories.children.entries) {
      let territory = this.territories.children.entries[i];
      if ((territory.territoryType === 2 || territory.territoryType === 3) && territory.volume < 1000) {
        let reg: number = this.settings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).regeneration;
        if (Utils.checkTestB(this.state)) reg = this.state.chickenSettings.partSettings[territory.improve - 1].territory.regeneration;
        territory.volume += reg;
        if (territory.volume > 1000) {
          territory.volume = 1000;
        }
      }
      checkTerritory = checkTerritory && territory.territoryType !== 0;
    }

    if (checkTerritory) this.achievement.tryId(36);

    
    let diamondAnimalCount = 0;
    // поедание территорий курицами
    for (let i in this.chicken.children.entries) {
      const chicken = this.chicken.children.entries[i];
      if (chicken.type === 0) diamondAnimalCount += 1;
      let breed: number;

      if (chicken.type === 0) breed = 1;
      else breed = chicken.type;
      
      let points: IchickenPoints = this.settings.chickenSettings.find((item: IchickenPoints) => item.breed === breed);
      if (chicken.egg < 1000) {
        let egg: number = points.egg;
        if (balance.alarm) {
          egg = Math.round(egg / 100 * this.settings.chickenBadPercent);
          if (egg < 1) egg = 1;
        }
        chicken.egg += egg;
        if (chicken.egg > 1000) chicken.egg = 1000;
      }

      if (chicken.egg === 1000) {
        let territory = this.currentTerritory(chicken.x, chicken.y);
        if (territory) {
          let countEggs: number = this.settings.territoriesChickenSettings.find((item: IterritoriesChickenSettings) => item.improve === territory.improve).countEggs;
          let eggs: number = 0;
          for (let i in this.eggs.children.entries) {
            let egg = this.eggs.children.entries[i];
            let ter = this.currentTerritory(egg.x, egg.y);
            if (ter?.block === territory.block && ter?.position === territory.position) eggs++;
          }

          if (eggs < countEggs && !chicken.drag && (territory.territoryType === 2 || territory.territoryType === 3)) {
            chicken.egg = 0;
            // рандом разброса яиц
            let minX: number = chicken.x - indent;
            let maxX: number = chicken.x + indent;
            let minY: number = chicken.y + 40 - indent;
            let maxY: number = chicken.y + 40 + indent;

            let left: number = (territory.position - 1) * 240 + indent;
            let right: number = territory.position * 240 - indent;
            let top: number = (territory.block) * 240 + indent;
            let bottom: number = (territory.block + 1) * 240 - indent;

            if (left > minX) minX = left;
            if (maxX > right) maxX = right;
            if (top > minY) minY = top;
            if (maxY > bottom) {
              maxY = bottom;
              if (maxY < minY) minY -= 40;
            }
 
            let egg: IchickenEgg = {
              type: chicken.type,
              x: this.random(minX, maxX),
              y: this.random(minY, maxY),
              _id: 'local_' + this.randomString(18)
            }
            Egg.create(this, egg);

            if (chicken.type === 0) chicken.diamond++;
            if (chicken.diamond >= 3 && chicken.type === 0) {
              Firework.create(this, chicken, 1)
              chicken.destroy();
            }
          }
        }
      }

      if (diamondAnimalCount >= 5) this.achievement.tryId(9);

      // отнимаем очки у территории
      let territory = this.currentTerritory(chicken.x, chicken.y);

      if (territory && !chicken.drag) {

        if (territory.territoryType === 2) {

          if (points.eating > territory.volume) territory.volume = 0;
          else territory.volume -= points.eating;
  
        } else if (territory.territoryType === 3) {

          if (points.drinking > territory.volume) territory.volume = 0;
          else territory.volume -= points.drinking;

        }

      }

    }

    // меняем спрайты территорий, если нужно
    for (let i in this.territories.children.entries) {

      let territory: ChickenTerritory = this.territories.children.entries[i];

      if (territory.territoryType === 2 || territory.territoryType === 3 || territory.territoryType === 5) {
        territory.changeSprite();
      }

      if (territory.territoryType === 4) {

        if (territory.mergingCounter > 0) territory.mergingCounter++;
        if (territory.mergingCounter > this.state.maxMerginTime) {

          let chicken1: any;
          let chicken2: any;

          switch (territory.merging.length) {
            case 0:
              chicken1 = false;
              chicken2 = false;
              break;
            case 1:
              chicken1 = this.chicken.children.entries.find((data: any) => data._id === territory.merging[0]._id);
              chicken2 = false;
              break;
            case 2:
              chicken1 = this.chicken.children.entries.find((data: any) => data._id === territory.merging[0]._id);
              chicken2 = this.chicken.children.entries.find((data: any) => data._id === territory.merging[1]._id);;
              break;
            default:
              break;
          }

          this.cancelMerging(territory, chicken1, chicken2);

        }

      }

    }

    for (let i in this.eggs.children.entries) {

      let egg = this.eggs.children.entries[i];
      egg.timeout++;
    
    }

    // бар собирателя
    if (this.state.userChicken.collector > 0) {
      this.state.userChicken.collector--;
    } 

    this.intervalCollectorTutorial();
    // задание на накопление денег
    this.tryTask(6, 0, 0, this.state.userChicken.money);

    // задание на кур на поле
    this.checkAnimalTask();

    // баланс-бары
    this.game.scene.keys['ChickenBars'].setBalanceBars(balance);
    
    // автосохранение
    this.autoSaveTimer++;
    if (this.autoSaveTimer >= this.state.autoSaveSpeed) this.autosave();

    // автопрогресс в случае неактивности
    let time: number = Math.round(new Date().getTime() / 1000);

    if (time > this.autoprogressTimer + 5) {
      this.state.offlineTime = time - this.autoprogressTimer;
      this.autoprogress();
    }
    
    this.autoprogressTimer = time;
    
    // окно с ежедневными наградами
    this.dailyAward();

    if (this.state.newbieTime > 0) this.state.newbieTime--;

    // выдача наград новичка
    if (!this.scene.isActive('Modal') &&
      !this.scene.get('Modal').load.isLoading() &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')) this.getNewbieAward();

    // поиск рекламы
    this.ads.findAd();

    this.nextDayTimer();

    if (this.state[`user${this.state.farm}`].part >= this.game.scene.keys[this.state.farm].herdBoostLvl &&
     this.state[`user${this.state.farm}`].takenHerdBoost <= 0 && 
     this.state.user.additionalTutorial.herdBoost) {
      this.state.shopNotificationCount[3] = 1;
    } else this.state.shopNotificationCount[3] = 0;

    if (!this.state.user.takenFreeDiamonds) this.state.shopNotificationCount[0] = 1;
    else this.state.shopNotificationCount[0] = 0;

    this.game.scene.keys[`${this.state.farm}Bars`].updateNotificationShop();


    if (this.state.donate &&
      !this.scene.get('Modal').load.isLoading() &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile')) this.showDonate();

    // уменьшаем время буста комбикорм
    if (this.state.userChicken.feedBoostTime > 0) {

      if (Phaser.Math.Between(0, 7) >= 5 && this.chicken.children.entries.length > 0) { // чтобы не так часто появлялись сердца

        let randomIndex: number = Phaser.Math.Between(0, this.chicken.children.entries.length - 1);
        Hearts.create(this, this.chicken.children.entries[randomIndex])
      }

      this.state.userChicken.feedBoostTime--;
    }

    // Проверяем и запускаем распростанение овец по полю
    if (this.chicken.children.entries.every(el => el.spread === false)) {
      
      this.spreadAnimals();

    }
    if (this.state.progress.event.type === 1) {

      // обновление времени евента
      if (this.state.progress.event.endTime > 0) {
        this.state.progress.event.endTime--;
        if ( this.scene.isActive('Profile')) {
          this.game.scene.keys['Profile'].eventEndTime?.setText(shortTime(this.state.progress.event.endTime, this.state.lang));
        } 
      }
  
      if (this.state.progress.event.startTime > 0) {
        this.state.progress.event.startTime--;
        if (this.scene.isActive('Profile')) {
          this.game.scene.keys['Profile'].eventStartTime?.setText(shortTime(this.state.progress.event.startTime, this.state.lang));
        }
      } 
  
      if (this.state.progress.event.endTime <= 0 && 
        !this.state.userUnicorn?.takenAward &&
        this.state.userUnicorn?.points > 0 &&
        this.state.progress.event.open &&
        this.scene.isActive('Profile')) {
        this.autosave();
        this.scene.stop('Profile');
      }
      
      if (this.state.progress.event.endTime <= 0 && 
        !this.state.userUnicorn?.takenAward && 
        this.state.userUnicorn?.points > 0 &&
        this.state.progress.event.open &&
        !this.scene.get('Modal').load.isLoading() &&
        !this.scene.isActive('Modal') && 
        !this.scene.isActive('Tutorial') &&
        !this.scene.isActive('Profile') && 
        this.state.progress.event.type === 1) { 
        if (!checkRaiting) {
          this.getEventRaiting();
          checkRaiting = true;
        }
        
        if (this.state.unicornRaitings?.updated) {
          let modal: Imodal = {
            type: 12,
          };
  
          this.state.modal = modal;
          this.scene.launch('Modal', this.state);
        }
      }
    }

    if ((this.state.name !== '' ||  this.state.user.login !== ''
    || this.state.platform === 'ya' && !this.state.yaPlayer) && 
      this.state.progress.event.startTime <= 0 && 
      this.state.progress.event.endTime > 0 &&
      this.state.progress.event.open) {
        
      if ((this.state.userUnicorn?.tutorial === 0 &&
        this.state.progress.event.type === 1) &&
        !arrowOnMap && !this.scene.isActive('Modal') &&
        !this.scene.isActive('Tutorial') &&
        !this.scene.isActive('Profile')) {
        Arrow.generate(this.game.scene.keys[`${this.state.farm}Bars`], 17);
      }
  
      if ((this.state.userUnicorn?.tutorial === 0 &&
        this.state.progress.event.type === 1) &&
        !this.scene.isActive('Tutorial') &&
        this.scene.isActive('Profile') &&
        this.state.progress.event.open) {
        this.showEventTutorial();
      }
    }

    this.intervalPorgressCollectorTime();
    this.progressTerritoryCooldown(this.territories.children.entries, 1, 'Chicken');
    this.sheepIntervalProgress();
    this.cowIntervalProgress();
  
    if (checkCollector < 2) {
      checkCollector += 1;
    } else {
      checkCollector = 0;
      cowCollectorVolume = this.cowCollectorProgress(cowCollectorVolume);
      sheepCollectorVolume = this.sheepCollectorProgress(sheepCollectorVolume);
    }
  
    this.cowFactoryProgress();
    this.updateProfileNotification();
    this.showFeedBoostSpeechBubble();
    progressClanCooldown(this.state);
    progressSalesTime(this.state);

    // Звуки
    if (this.chicken?.children.entries.length > 0 && time % 14 === 0) {
      this.playSoundOnce(`chicken-sound-${Phaser.Math.Between(1, 5)}`)
    }
    
    this.tryClanTask(18);
    progressClanEventTime(this.state);
    if (
      !this.state.clanEventTakenAward &&
      !this.scene.get('Modal').load.isLoading() &&
      !this.scene.isActive('Modal') &&
      !this.scene.isActive('Tutorial') &&
      !this.scene.isActive('Profile') &&
      !this.scene.isActive('Fortune')
    ) {
      this.state.modal = { type: 22 };
      this.scene.launch('Modal', this.state);
    }

    showSale(this);
    this.speedCheckCollector();
    decrementAdFreeDiamondTime(this.state);
    incInterstitialAdTimer(this.state);
    incFortuneAdTimer(this.state);
    if (this.state.user.clanTasks.length > 0 && this.state.user.clanTasks.every((el: IclanTask) => el.done)) {
      this.achievement.tryId(122);
    }
  }, callbackScope: this, loop: true });

}

export default interval;
