import {
  click,
  clickButton,
  clickShopBtn,
} from '../general/basic';
import { dragSheep, showSheepSprite } from '../general/animations';
import { Arrows } from '../elements';

let farmer: any = require("./../../assets/images/farmer.png");

class Tutorial extends Phaser.Scene {
  constructor() {
    super('Tutorial');
  }
  
  public state: Istate;
  public height: number;
  public text: Phaser.GameObjects.Text;
  public continueText: any;
  public farmer: Phaser.GameObjects.Sprite;
  public tail: Phaser.GameObjects.Sprite;
  public tutorText: string;
  public generalClick: any;
  public topPosition: boolean;
  public indent: number;
  public tailX: number;
  public tailFlipX: boolean;
  public tailFlipY: boolean;
  public showContinue: boolean;
  public mergPointer: any;
  public showMergPointer: boolean;
  public skipTutorial: boolean;
  public arrows: Arrows; // стрелки
  public showSheep: boolean;
  
  public click = click.bind(this);
  public clickButton = clickButton.bind(this);
  public clickShopBtn = clickShopBtn.bind(this);
  public dragSheep = dragSheep.bind(this);
  public showSheepSprite = showSheepSprite.bind(this);
  

  public init(state: Istate): void {

    this.state = state;
    this.height = Number(this.game.config.height);
    this.generalClick = (): void => null;
    this.showContinue = false;
    this.showMergPointer = false;
    this.skipTutorial = false;
    this.showSheep = false;

  }


  public preload(): void {
    this.load.image('farmer', farmer);
  }


  public create(): void {

    this.game.scene.keys[this.state.farm].scrolling.wheel = false;

    // интерактивный фон
    let clickWindow: Phaser.GameObjects.TileSprite = this.add.tileSprite(0, 0, 720, this.height, 'pixel')
      .setOrigin(0, 0);
    
    this.click(clickWindow, (): void => {

      if (typeof this.generalClick === 'function') {
        this.generalClick();
      }

    });

    // эффект затемнения
    let shadow: number = 0;
    let timeEvent: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 30, callback: (): void => {
      shadow++;
      this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.' + shadow + ')');
      if (shadow === 7) timeEvent.remove(false);
    }, callbackScope: this, loop: true });

    // шаг туториала
    this.chooseStep();

    if (this.state.farm === 'Sheep' && this.skipTutorial) {

      let skip: Phaser.GameObjects.Text = this.add.text(710, 30, this.state.lang.skipTutorial, {
        font: '24px Shadow',
        color: '#868686'
      }).setOrigin(1, 0.5);

      let bounds = skip.getBounds();

      let zone: Phaser.GameObjects.Zone = this.add.zone(
        bounds.x - 10 + bounds.width / 2,
        bounds.y + bounds.height / 2,
        bounds.width + 30, 
        bounds.height + 30
      ).setDropZone(undefined, () => {});

      this.click(zone, (): void => {
        this.game.scene.keys[this.state.farm].skipTutorial();
      });

    }

  }


  public update(): void {

    if (this.game.scene.keys[this.state.farm].scrolling.scrollY !== 0) {
      this.game.scene.keys[this.state.farm].scrolling.scrollY = 0;
    }

    // перетаскивание овец
    this.dragSheep();
    
    // укзывающие стрелки
    if (this.arrows?.active) this.arrows.update();

    // появление спрайта овечки
    this.showSheepSprite();
    
  }


  // выбор шага туториала
  public chooseStep(): void {

    // мягкий (дополнительный туториал)
    if (typeof this.state.tutorial.additional === 'string') {

      if (this.state.tutorial.additional === 'balance') {

        this.state.amplitude.getInstance().logEvent('tutorial_balance', {});

        this.tutorText = this.state.lang.addTutorialBalance;
        this.showContinue = true;
        this.generalClick = (): void => {
          this.scene.stop();
        }

        let balance: Ibalance = this.game.scene.keys[this.state.farm].balance();

        let waterPercent: string = balance.waterPercent + '%';
        let grassPercent: string = balance.grassPercent + '%';
        let waterColor: number = 0x96D005;
        let grassColor: number = 0x96D005;

        this.add.image(0, 0, 'red-balance-bg').setOrigin(0, 0);

        let waterBg: string = 'resource-enough';
        let grassBg: string = 'resource-enough';

        if (balance.notEnoughWater) {
          waterBg = 'resource-problem';
          waterPercent = '-' + waterPercent;
          waterColor = 0xF07D58;
        }

        if (balance.notEnoughGrass) {
          grassBg = 'resource-problem';
          grassPercent = '-' + grassPercent;
          grassColor = 0xF07D58;
        }

        this.add.image(70, 10, waterBg).setOrigin(0.5, 0);
        this.add.image(170, 10, grassBg).setOrigin(0.5, 0);

        this.add.image(70, 10, 'water-balance').setOrigin(0.5, 0);
        this.add.image(170, 10, 'grass-balance').setOrigin(0.5, 0);

        this.add.text(70, 98, waterPercent, {
          font: '26px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);
        this.add.text(170, 98, grassPercent, {
          font: '26px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5);

        let endWater: number = balance.waterPercent * (6.3 / 100) + -1.66;
        let waterBar: Phaser.GameObjects.Graphics = this.add.graphics();
        waterBar.lineStyle(8, waterColor, 1);
        waterBar.beginPath();
        waterBar.arc(70, 47, 32, -1.66, endWater);
        waterBar.strokePath();

        let endGrass: number = balance.grassPercent * (6.3 / 100) + -1.66;
        let grassBar: Phaser.GameObjects.Graphics = this.add.graphics();
        grassBar.clear();
        grassBar.lineStyle(8, grassColor, 1);
        grassBar.beginPath();
        grassBar.arc(170, 47, 32, -1.66, endGrass);
        grassBar.strokePath();

        this.topPosition = true;
        this.indent = 170;
        this.tailX = 320;
        this.tailFlipX = true;
        this.tailFlipY = true;
        this.pointerTutorial();

      } else if (this.state.tutorial.additional === 'cave1') {

        this.state.amplitude.getInstance().logEvent('tutorial_cave', {
          step: 1
        });

        this.tutorText = this.state.lang.addTutorialCave1;

        let cave: Phaser.GameObjects.Image = this.add.image(120, 480, 'cave-ready').setOrigin(0.5, 1);
        this.click(cave, (): void => {
          this.game.scene.keys[this.state.farm].doneTutorCave1();
        });

        this.topPosition = true;
        this.indent = 470;
        this.tailX = 300;
        this.tailFlipX = true;
        this.tailFlipY = true;
        this.pointerTutorial();
        
      } else if (this.state.tutorial.additional === 'cave2') {

        this.state.amplitude.getInstance().logEvent('tutorial_cave', {
          step: 2
        });

        this.tutorText = this.state.lang.addTutorialCave2;
        this.showContinue = true;

        this.generalClick = (): void => this.game.scene.keys[this.state.farm].doneTutorCave2();

        let crystallSheep = this.game.scene.keys[this.state.farm].sheep.children.entries.find((data: any) => data.type === 0);
        crystallSheep.setVisible(false);
        crystallSheep.woolSprite.setVisible(false);
        crystallSheep.shaveStatus.setVisible(false);

        let sheep: Phaser.GameObjects.Sprite = this.add.sprite(600, 600, 'sheep-stay-left0');
        this.add.sprite(600, 600, 'sheep-left-0-4');
        sheep.anims.play('sheep-stay-left0', true);

        this.topPosition = true;
        this.indent = 730;
        this.tailX = 410;
        this.tailFlipX = false;
        this.tailFlipY = true;
        this.pointerTutorial();

      } else if (this.state.tutorial.additional === 'cave3') {

        this.state.amplitude.getInstance().logEvent('tutorial_cave', {
          step: 3
        });

        this.tutorText = this.state.lang.addTutorialCave3;
        this.generalClick = (): void => {
          this.scene.stop();
        }
        
        this.simpleTutorial();

      } else if (this.state.tutorial.additional === 'herdBoost1') {
        this.arrows = new Arrows(this, { x: 372, y: this.height - 92 }, 70, false, false, false, true, false, true);
        let shopBtn: Phaser.GameObjects.Image = this.add.image(370, this.height - 90, 'shop');
        
        this.topPosition = false;
        this.indent = 240;
        this.tailX = 430;
        this.tailFlipX = true;
        this.tailFlipY = false;
        this.tutorText = this.state.lang.addTutorialHerdBoost1;
        this.pointerTutorial();
        
        this.click(shopBtn, (): void => {
          let modal: Imodal = {
            type: 2,
            shopType: 4
          }
          this.state.modal = modal;
          this.scene.stop('Tutorial');
          this.scene.launch('Modal', this.state);
          this.game.scene.keys['Sheep'].showTutorial('herdBoost2');
        }); 

      } else if (this.state.tutorial.additional === 'herdBoost2') {
        // окно буста
        let bg: Phaser.GameObjects.TileSprite = this.add.tileSprite(130, this.cameras.main.centerY - 20, 460, 235, 'boost-bg').setOrigin(0, 0).setAlpha(0);
        let title: Phaser.GameObjects.Text = this.add.text(365 + 5, this.cameras.main.centerY + 15, this.state.lang.herdBoostTitleSheep, { 
          font: '28px Shadow',
          color: '#FFFFFF',
          wordWrap: { width: 300 },
          align: 'center'
        }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2).setAlpha(0);
    
        let icon: Phaser.GameObjects.Sprite = this.add.sprite(170, this.cameras.main.centerY + 50, 'sheep-herd-boost-icon').setOrigin(0, 0).setAlpha(0);
        let flag1: Phaser.GameObjects.Sprite = this.add.sprite(130, this.cameras.main.centerY - 20, 'flags').setOrigin(0, 0).setFlipX(true).setAlpha(0);
        let flag2: Phaser.GameObjects.Sprite = this.add.sprite(595, this.cameras.main.centerY - 20, 'flags').setOrigin(1, 0).setAlpha(0);
        // кнопка
        let xBtn: number =  460;
        let yBtn: number = this.cameras.main.centerY + 120;
        let herdBoostBtn: Phaser.GameObjects.Sprite = this.add.sprite(xBtn, yBtn, 'improve-collector').setAlpha(0);
        let herdBoostBtnText = this.add.text(xBtn, yBtn - 2, this.state.lang.pickUp, {
          font: '23px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4).setDepth(10).setAlpha(0);
        this.arrows = new Arrows(this, { x: 455, y: yBtn}, 70, false, false, false, true, false, true);

        this.topPosition = false;
        this.indent = yBtn;
        this.tailX = 430;
        this.tailFlipX = true;
        this.tailFlipY = false;
        this.tutorText = this.state.lang.addTutorialHerdBoost2;
        this.pointerTutorial();
        let alpha: number = 0;
        let timer: Phaser.Time.TimerEvent = this.time.addEvent({
          delay: 50,
          loop: true,
          callback: () => {
            alpha += 0.1;
            bg.setAlpha(alpha);
            title.setAlpha(alpha);
            icon.setAlpha(alpha);
            flag1.setAlpha(alpha);
            flag2.setAlpha(alpha);
            herdBoostBtn.setAlpha(alpha);
            herdBoostBtnText.setAlpha(alpha);
            if (alpha >= 1) {
              timer.remove();
            }
          },
          callbackScope: this
        })
        this.clickShopBtn({ btn: herdBoostBtn, title: herdBoostBtnText}, (): void => {
          this.scene.stop();
          this.state.user.additionalTutorial.herdBoost = true;  
          this.game.scene.keys[this.state.farm].startHerdBoost();
        });

      } else if (this.state.tutorial.additional === 'feedBoost1') {

        this.arrows = new Arrows(this, { x: 372, y: this.height - 92 }, 70, false, false, false, true, false, true);
        let shopBtn: Phaser.GameObjects.Image = this.add.image(370, this.height - 90, 'shop');
        
        this.topPosition = false;
        this.indent = 240;
        this.tailX = 430;
        this.tailFlipX = true;
        this.tailFlipY = false;
        this.tutorText = this.state.lang.addTutorialFeedBoost1;
        this.pointerTutorial();
        
        this.click(shopBtn, (): void => {
          let modal: Imodal = {
            type: 2,
            shopType: 4
          }
          this.state.modal = modal;
          this.scene.stop('Tutorial');
          this.scene.launch('Modal', this.state);
          this.game.scene.keys['Sheep'].showTutorial('feedBoost2');
        }); 

      } else if (this.state.tutorial.additional === 'feedBoost2') {
        // окно буста
        let y: number = this.cameras.main.centerY + 220;
        let bg: Phaser.GameObjects.TileSprite = this.add.tileSprite(130, y, 460, 230, 'boost-bg').setOrigin(0, 0).setAlpha(0);
        let title: Phaser.GameObjects.Text = this.add.text(365 + 5, y + 20, this.state.lang.feedBoostTitle, { 
          font: '28px Shadow',
          color: '#FFFFFF',
          wordWrap: { width: 300 },
          align: 'center'
        }).setOrigin(0.5, 0.5).setStroke('#8B4A84', 2).setAlpha(0);
    
        let icon: Phaser.GameObjects.Sprite = this.add.sprite(170, y + 30, 'sheep-feed-boost-icon').setOrigin(0, 0).setAlpha(0);
        // кнопка
        let xBtn: number =  460;
        let yBtn: number = y + 110;
        let herdBoostBtn: Phaser.GameObjects.Sprite = this.add.sprite(xBtn, yBtn, 'improve-collector').setAlpha(0);
        let herdBoostBtnText = this.add.text(xBtn, yBtn - 2, this.state.lang.pickUp, {
          font: '23px Shadow',
          color: '#FFFFFF'
        }).setOrigin(0.5, 0.5).setStroke('#3B5367', 4).setDepth(10).setAlpha(0);
        this.arrows = new Arrows(this, { x: 455, y: yBtn}, 70, false, false, false, true, false, true);

        this.topPosition = false;
        this.indent = y - 350;
        this.tailX = 430;
        this.tailFlipX = true;
        this.tailFlipY = false;
        this.tutorText = this.state.lang.addTutorialFeedBoost2;
        this.pointerTutorial();
        let alpha: number = 0;
        let timer: Phaser.Time.TimerEvent = this.time.addEvent({
          delay: 50,
          loop: true,
          callback: () => {
            alpha += 0.1;
            bg.setAlpha(alpha);
            title.setAlpha(alpha);
            icon.setAlpha(alpha);
            herdBoostBtn.setAlpha(alpha);
            herdBoostBtnText.setAlpha(alpha);
            if (alpha >= 1) {
              timer.remove();
            }
          },
          callbackScope: this
        })
        this.clickShopBtn({ btn: herdBoostBtn, title: herdBoostBtnText}, (): void => {
          this.scene.stop('Shop');
          this.scene.stop('ShopBars');
          this.scene.stop('Modal');
          this.scene.stop();
          this.state.user.additionalTutorial.feedBoost = true;  
          this.state[`user${this.state.farm}`].feedBoostTime = 3600;
        });

      } else if (this.state.tutorial.additional === 'collector') {
        
        this.game.scene.keys['SheepBars'].collectorBtn.setVisible(false);
        this.tutorText = this.state.lang.addTutorialCollector;
        let button: Phaser.GameObjects.Sprite = this.add.sprite(230, this.height - 90, 'wool-collector');

        let time: Phaser.GameObjects.Text = this.add.text(230, this.height - 43, '00 : 00', {
          font: '28px Bip',
          color: '#FF0000',
          align: 'center'
        }).setOrigin(0.5, 0.5).setDepth(1);

        let bounds = time.getBounds();
        let bubble: Phaser.GameObjects.Graphics = this.add.graphics({ x: bounds.left - 15, y: bounds.top });
        bubble.fillStyle(0xFFFFFF, 1);
        bubble.strokeRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);
        bubble.fillRoundedRect(0, 0, bounds.width + 30, bounds.height, 8);

        this.clickButton(button, (): void => {
          this.game.scene.keys[this.state.farm].collectorTutorial();
        });

        this.generalClick = (): void => this.game.scene.keys[this.state.farm].collectorTutorial();

        this.topPosition = false;
        this.indent = 250;
        this.tailX = 300;
        this.tailFlipX = true;
        this.tailFlipY = false;
        this.pointerTutorial();

      } else {
        this.fail();
      }

    // жесткий туториал
    } else {

      // овечья ферма
      if (this.state.tutorial.farm === 1) {

        // первый шаг
        if (this.state.tutorial.step === 0) {

          this.state.amplitude.getInstance().logEvent('tutor_after_load', {});
          this.tutorText = this.state.lang.sheepTutorial_0;
          this.generalClick = (): void => this.game.scene.keys[this.state.farm].doneTutor_0();
          this.simpleTutorial();

        // второй шаг
        } else if (this.state.tutorial.step === 10) {

          this.showSheepMoney();
          this.arrows = new Arrows(this, { x: 82, y: this.height - 92 }, 70, false, false, false, true, false, true);
          this.tutorText = this.state.lang.sheepTutorial_10;
          let button: Phaser.GameObjects.Sprite = this.add.sprite(82, this.height - 92, 'sheep-buy-icon-1');
          this.clickButton(button, (): void => {
            this.game.scene.keys[this.state.farm].doneTutor_10();
          });
          this.topPosition = false; // позиционирование бабла (пивот точка)
          this.indent = 250; // отступ сверху-снизу
          this.tailX = 210;
          this.tailFlipX = true;
          this.tailFlipY = false;
          this.pointerTutorial();

        // третий шаг
        } else if (this.state.tutorial.step === 20) {

          this.arrows = new Arrows(this, { x: 600, y: 600 }, 120, false, false, true, false, false, true);
          this.tutorText = this.state.lang.sheepTutorial_20;
          let territory: Phaser.GameObjects.Sprite = this.add.sprite(480, 480, 'sheep-bought').setOrigin(0);
          this.click(territory, (): void => {
            this.game.scene.keys[this.state.farm].progressTutor_20();
          });

          this.topPosition = true;
          this.indent = 730;
          this.tailX = 410;
          this.tailFlipX = false;
          this.tailFlipY = true;
          this.pointerTutorial();

        // четвертый шаг
        } else if (this.state.tutorial.step === 30) {

          this.arrows = new Arrows(this, { x: 360, y: 600 }, 120, false, false, true, false, false, true);
          this.tutorText = this.state.lang.sheepTutorial_30;
          let territory: Phaser.GameObjects.Sprite = this.add.sprite(240, 480, 'sheep-bought').setOrigin(0);
          this.click(territory, (): void => {
            this.game.scene.keys[this.state.farm].progressTutor_30();
          });

          this.topPosition = true;
          this.indent = 730;
          this.tailX = 580;
          this.tailFlipX = true;
          this.tailFlipY = true;
          this.pointerTutorial();

        // пятый шаг
        } else if (this.state.tutorial.step === 40) {

          this.tutorText = this.state.lang.sheepTutorial_40;
          this.skipTutorial = true;

          for (let i in this.game.scene.keys[this.state.farm].sheep.children.entries) {
            this.game.scene.keys[this.state.farm].sheep.children.entries[i].setVisible(false);
            this.game.scene.keys[this.state.farm].sheep.children.entries[i].woolSprite.setVisible(false);
            this.game.scene.keys[this.state.farm].sheep.children.entries[i].shaveStatus.setVisible(false);
          }
          
          this.game.scene.keys[this.state.farm].woolPB_show = true;
          this.generalClick = (): void => this.game.scene.keys[this.state.farm].progressTutor_40();

          let sheep: Phaser.GameObjects.Sprite = this.add.sprite(600, 600, 'sheep-stay-left1');
          this.add.sprite(600, 600, 'sheep-left-1-1');
          sheep.anims.play('sheep-stay-left1', true);

          this.topPosition = true;
          this.indent = 680;
          this.tailX = 470;
          this.tailFlipX = false;
          this.tailFlipY = true;
          this.showContinue = true; // показать "нажмиже, чтобы продолжить"
          this.pointerTutorial();

        // шестой шаг
        } else if (this.state.tutorial.step === 50) {

          this.showSheepMoney();
          this.arrows = new Arrows(this, { x: 82, y: this.height - 92 }, 70, false, false, false, true, false, true);

          this.game.scene.keys['SheepBars'].sheepBuy.setVisible(false);
          this.game.scene.keys['SheepBars'].sheepPrice.setVisible(false);
          this.game.scene.keys['SheepBars'].sheepPriceBubble.setVisible(false);

          this.tutorText = this.state.lang.sheepTutorial_50;
          this.skipTutorial = true;
          let button: Phaser.GameObjects.Sprite = this.add.sprite(82, this.height - 92, 'sheep-buy-icon-1');
          this.clickButton(button, (): void => {
            this.game.scene.keys[this.state.farm].doneTutor_50();
          });
          this.topPosition = false;
          this.indent = 250;
          this.tailX = 210;
          this.tailFlipX = true;
          this.tailFlipY = false;
          this.pointerTutorial();

        // седьмой шаг
        } else if (this.state.tutorial.step === 60) {

          this.tutorText = this.state.lang.sheepTutorial_60;
          this.skipTutorial = true;

          let tasks: Itasks[] = this.game.scene.keys[this.state.farm].partTasks();
          let task: Itasks = tasks.find((task: Itasks) => task.id === 1);
          let taskData: ItaskData = this.game.scene.keys[this.state.farm].getTaskData(task);
          let taskText: Phaser.GameObjects.Text = this.add.text(150, 0, taskData.name, {
            font: '23px Bip',
            color: '#713D1E',
            align: 'left',
            wordWrap: { width: 390 }
          }).setDepth(this.height).setOrigin(0, 0);
          let taskTextBounds = taskText.getBounds();
          taskText.y = this.height - taskTextBounds.height - 244;
          let award: Phaser.GameObjects.Text = this.add.text(190, this.height - 220, String(task.diamonds), {
            font: '20px Bip',
            color: '#FFFFFF'
          }).setDepth(this.height).setOrigin(0, 0.5);
          this.add.image(160, this.height - 220, 'diamond')
            .setDepth(this.height)
            .setScale(0.1)
            .setOrigin(0, 0.5);
          let bounds = award.getBounds();
          let awardBg: Phaser.GameObjects.Graphics = this.add.graphics({ x: bounds.left - 40, y: bounds.top - 3 });
          awardBg.fillStyle(0x713D1E, 1);
          awardBg.fillRoundedRect(0, 0, bounds.width + 50, bounds.height + 6, 5);
          awardBg.setDepth(this.height - 1);
          let height: number = 70 + taskTextBounds.height;
          if (height < 110) height = 110;
          let taskBoard: Phaser.GameObjects.Graphics = this.add.graphics({
            x: 30,
            y: this.height - 190 - height
          });
          taskBoard.fillStyle(0xFFEBC5, 1);
          taskBoard.fillRoundedRect(0, 0, 660, height, 8);
          let taskIcon: Phaser.GameObjects.Image = this.add.image(88, this.height - 190 - height / 2, taskData.icon);
          taskIcon.setTint(0x777777);
          this.add.image(88, this.height - 190 - height / 2, 'completed');
          let done: Phaser.GameObjects.Image = this.add.image(620, this.height - 190 - height / 2, 'little-button').setDepth(this.height);
          let takeText: Phaser.GameObjects.Text = this.add.text(620, this.height - 193 - height / 2, this.state.lang.pickUp, {
            font: '20px Shadow',
            color: '#FFFFFF'
          }).setOrigin(0.5, 0.5).setDepth(this.height);
          this.clickShopBtn({ btn: done, title: takeText, img: false }, (): void => {
            this.game.scene.keys[this.state.farm].doneTutor_60();
          });

          this.topPosition = false;
          this.indent = 380;
          this.tailX = 570;
          this.tailFlipX = false;
          this.tailFlipY = false;
          this.pointerTutorial();

        // восьмой шаг
        } else if (this.state.tutorial.step === 70) {

          this.tutorText = this.state.lang.sheepTutorial_70;
          this.skipTutorial = true;
          this.generalClick = (): void => this.game.scene.keys[this.state.farm].progressTutor_70();
          this.simpleTutorial();
          
          this.game.scene.keys[this.state.farm].showMergPointer = false;
          this.game.scene.keys[this.state.farm].mergPointer?.destroy();
          
          this.time.addEvent({ delay: 500, callback: (): void => {

            this.mergPointer = this.physics.add.sprite(480, 520, 'tutor-merging').setDepth(this.height);
            this.mergPointer.first = true;
            this.showMergPointer = true;

          }, callbackScope: this, loop: false });

        } else if (this.state.tutorial.step === 75) {

          this.tutorText = this.state.lang.sheepTutorial_75;
          this.skipTutorial = true;
          this.showContinue = true;
          this.generalClick = (): void => this.game.scene.keys[this.state.farm].doneTutor_75();

          for (let i in this.game.scene.keys[this.state.farm].sheep.children.entries) {
            this.game.scene.keys[this.state.farm].sheep.children.entries[i].setVisible(false);
            this.game.scene.keys[this.state.farm].sheep.children.entries[i].woolSprite.setVisible(false);
            this.game.scene.keys[this.state.farm].sheep.children.entries[i].shaveStatus.setVisible(false);
          }

          let sheep: Phaser.GameObjects.Sprite = this.add.sprite(600, 600, 'sheep-stay-left2');
          this.add.sprite(600, 600, 'sheep-left-2-4');
          sheep.anims.play('sheep-stay-left2', true);
          
          this.topPosition = true;
          this.indent = 700;
          this.tailX = 450;
          this.tailFlipX = false;
          this.tailFlipY = true;
          this.pointerTutorial();

        // девятый шаг
        } else if (this.state.tutorial.step === 80) {

          this.arrows = new Arrows(this, { x: 120, y: 600 }, 120, false, false, true, false, false, true);
          this.tutorText = this.state.lang.sheepTutorial_80;
          this.skipTutorial = true;
          
          let territory: Phaser.GameObjects.Sprite = this.add.sprite(0, 480, 'sheep-bought').setOrigin(0);
          this.click(territory, (): void => {
            this.game.scene.keys[this.state.farm].progressTutor_80();
          });

          this.topPosition = true;
          this.indent = 730;
          this.tailX = 300;
          this.tailFlipX = true;
          this.tailFlipY = true;
          this.pointerTutorial();

        // десятый шаг
        } else if (this.state.tutorial.step === 90) {

          this.arrows = new Arrows(this, { x: 230, y: this.height - 90 }, 70, false, false, false, true, false, true);
          this.tutorText = this.state.lang.sheepTutorial_90;
          this.skipTutorial = true;
          let button: Phaser.GameObjects.Sprite = this.add.sprite(230, this.height - 90, 'wool-collector');

          this.clickButton(button, (): void => {
            this.game.scene.keys[this.state.farm].progressTutor_90();
          });

          this.topPosition = false;
          this.indent = 250;
          this.tailX = 300;
          this.tailFlipX = true;
          this.tailFlipY = false;
          this.pointerTutorial();

        // одиннадцатый шаг
        } else if (this.state.tutorial.step === 100) {

          this.tutorText = this.state.lang.sheepTutorial_100;
          this.skipTutorial = true;
          this.generalClick = (): void => this.game.scene.keys[this.state.farm].doneTutor_100();
          this.simpleTutorial();

        } else {
          this.fail();
        }

      // куриная ферма
      } else if (this.state.tutorial.farm === 2) {

        if (this.state.tutorial.step === 0) {

          this.tutorText = this.state.lang.chickenTutorial_0;
          this.generalClick = (): void => this.game.scene.keys[this.state.farm].doneTutor_0();
          this.simpleTutorial();

        } else {
          this.fail();
        }

      } else {
        this.fail();
      }

    }

  }


  // указывающий туториал
  public pointerTutorial(): void {

    let y: number;
    let bubbleHeight: number = 200;
    let tailOrigin: number = 0;
    let tailY: number;

    this.text = this.add.text(240, 0, this.tutorText, {
      font: '24px Shadow',
      color: '#7D3C25',
      align: 'left',
      wordWrap: { width: 410 }
    }).setOrigin(0, 0.5).setDepth(1).setAlpha(0);

    let textHeight: number = this.text.getBounds().height;
    if (textHeight > 160) bubbleHeight = textHeight + 40;

    if (this.showContinue) bubbleHeight += 30;

    if (this.topPosition) {

      y = this.indent + bubbleHeight;
      tailOrigin = 1;
      tailY = y - bubbleHeight + 1;

    } else {

      y = this.height - this.indent;
      tailY = y - 1;

    }

    let bubble: Phaser.GameObjects.Graphics = this.add.graphics({ x: 40, y: y - bubbleHeight });
    bubble.fillStyle(0xFFF0DF, 1);
    bubble.fillRoundedRect(0, 0, 640, bubbleHeight, 16).setAlpha(0);

    this.text.y = y - (bubbleHeight / 2);
    this.farmer = this.add.sprite(140, y - (bubbleHeight / 2), 'farmer').setScale(0.6).setAlpha(0);

    this.tail = this.add.sprite(this.tailX, tailY, 'tail').setOrigin(0.5, tailOrigin).setAlpha(0);
    this.tail.setFlipX(this.tailFlipX);
    this.tail.setFlipY(this.tailFlipY);

    let continueBtn: Phaser.GameObjects.Sprite;
    let continueText: Phaser.GameObjects.Text;

    if (this.showContinue) {

      this.text.y -= 35;

      continueBtn = this.add.sprite(325, y - 53, 'tutor-btn')
        .setDepth(1)
        .setAlpha(0);
      continueText = this.add.text(325, y - 56, this.state.lang.next, {
        font: '22px Shadow',
        color: '#FFFFFF',
        align: 'left',
        wordWrap: { width: 410 }
      }).setOrigin(0.5, 0.5).setDepth(1).setAlpha(0);
      this.clickShopBtn({ btn: continueBtn, title: continueText, img: false }, (): void => {
        this.generalClick();
      });

    }

    let opacity: number = 0;
    let timeEvent: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 30, callback: (): void => {

      opacity += 0.05;
      this.text.setAlpha(opacity);
      bubble.setAlpha(opacity);
      this.farmer.setAlpha(opacity);
      this.tail.setAlpha(opacity);
      
      if (this.showContinue) {
        continueBtn.setAlpha(opacity);
        continueText.setAlpha(opacity);
      }

      if (opacity >= 1) timeEvent.remove(false);

    }, callbackScope: this, loop: true });

  }


  // туториал не на что не указывающий
  public simpleTutorial(): void {
    
    let y: number = this.height - 500;

    this.text = this.add.text(100, y, this.tutorText, {
      font: '24px Shadow',
      color: '#7D3C25',
      align: 'left',
      wordWrap: { width: 410 }
    }).setOrigin(0, 1).setDepth(1).setAlpha(0);

    let textHeight: number = this.text.getBounds().height;

    let continueBtn: Phaser.GameObjects.Sprite = this.add.sprite(190, y + 40, 'tutor-btn')
      .setDepth(1)
      .setAlpha(0);
    let continueText: Phaser.GameObjects.Text = this.add.text(190, y + 38, this.state.lang.next, {
      font: '22px Shadow',
      color: '#FFFFFF',
      align: 'left',
      wordWrap: { width: 410 }
    }).setOrigin(0.5, 0.5).setDepth(1).setAlpha(0);
    this.clickShopBtn({ btn: continueBtn, title: continueText, img: false }, (): void => {
      this.generalClick();
    });
    
    let bubble: Phaser.GameObjects.Graphics = this.add.graphics({ x: 75, y: y - textHeight - 25 });
    bubble.fillStyle(0xFFF0DF, 1);
    bubble.fillRoundedRect(0, 0, 485, textHeight + 110, 16).setAlpha(0);
    
    this.farmer = this.add.sprite(590, this.height - 280, 'farmer').setScale(0.8).setAlpha(0);
    this.tail = this.add.sprite(390, y + 84, 'tail').setOrigin(0, 0).setAlpha(0);

    let opacity: number = 0;
    let timeEvent: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 30, callback: (): void => {

      opacity += 0.05;
      this.text.setAlpha(opacity);
      bubble.setAlpha(opacity);
      continueBtn.setAlpha(opacity);
      continueText.setAlpha(opacity);
      this.farmer.setAlpha(opacity);
      this.tail.setAlpha(opacity);
      if (opacity >= 1) timeEvent.remove(false);

    }, callbackScope: this, loop: true });

  }


  // показ денег овечьей фермы
  public showSheepMoney(): void {
    
    let сurrencyBg: Phaser.GameObjects.Sprite = this.add.sprite(590, 100, 'сurrency-bg').setAlpha(0);
    let coin: Phaser.GameObjects.Sprite = this.add.sprite(498, 100, 'sheepCoin').setScale(0.22).setAlpha(0);
    let money: Phaser.GameObjects.Text = this.add.text(590, 100, String(this.state.userSheep.money), {
      font: '32px Shadow',
      color: '#7B3B0D'
    }).setDepth(1).setOrigin(0.5, 0.5).setAlpha(0);

    let opacity: number = 0;
    let timeEvent: Phaser.Time.TimerEvent = this.time.addEvent({ delay: 30, callback: (): void => {

      opacity += 0.05;
      сurrencyBg.setAlpha(opacity);
      coin.setAlpha(opacity);
      money.setAlpha(opacity);

      if (opacity >= 1) timeEvent.remove(false);

    }, callbackScope: this, loop: true });

  }


  // тутор ошибки
  public fail(): void {

    this.generalClick = (): void => {
      this.game.scene.keys[this.state.farm].wheel = true;
      this.scene.stop();
    }
    
    this.tutorText = this.state.lang.tutorialFail;
    this.simpleTutorial();

  }


}

export default Tutorial;
