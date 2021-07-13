import SheepBars from '../../scenes/Sheep/SheepBars';
import ChickenBars from '../../scenes/Chicken/ChickenBars';
import CowBars from '../../scenes/Cow/CowBars';
import { sendAppEventVk } from '../../general/basic';
import LocalStorage from './../../libs/LocalStorage';

/**
  *  Планка заданий в барах сцен    
  * 
  *  Конструктор принимает:
  *1. объект сцены; 
*/

// плашка заданий
export default class TaskBoard extends Phaser.GameObjects.TileSprite {

  public scene: SheepBars | ChickenBars | CowBars;

  private bg: Phaser.GameObjects.RenderTexture;
  private bgY: number;
  private bgOriginHeight: number
  private closingAni: Phaser.Tweens.Tween;
  private elements: modalElementType[];
  private interactiveElements: modalElementType[];
  private aditionalHeight: number
  private listButtonOriginY: number

  public isVisibile: boolean;
  public status: number;
  public taskStatus: number;
  public currentTaskProgress: number;
  public taskIcon: Phaser.GameObjects.Sprite;
  public star: Phaser.GameObjects.Sprite;
  public doneText: Phaser.GameObjects.Text;
  public taskText: Phaser.GameObjects.Text;
  public doneIcon: Phaser.GameObjects.Sprite;
  public done: Phaser.GameObjects.Sprite;
  public takeText: Phaser.GameObjects.Text;
  public award: Phaser.GameObjects.Text;
  public awardBg: Phaser.GameObjects.RenderTexture;
  public diamond: Phaser.GameObjects.Sprite;
  public doneButton: Phaser.GameObjects.Sprite;
  public doneButtonText: Phaser.GameObjects.Text;
  public lastPart: Phaser.GameObjects.Text;
  public taskProgress: Phaser.GameObjects.Graphics;
  public counter: number = 0;
  public isGetTop: boolean = false
  public positionY: number;
  public animation: Phaser.Tweens.Tween;
  public isUpdated: boolean = false;
  public taskId: number;
  public gotAward: number;
  public dY: number;
  public taskListElements: any[] = [];
  public listButton: Phaser.GameObjects.Sprite;
  public listIsOpen: boolean = false;
  public listButtondY: number = 0;
  public listTimer: Phaser.Time.TimerEvent;
  public listTime: number = 0;
  public isMoving: boolean = false;

  constructor(scene: SheepBars | ChickenBars | CowBars) {
    super(scene, 0, 0, 0, 0, 'pixel')
    this.scene = scene;
    this.isVisibile = false;
    this.init();
    console.log(scene.state);
    
  }

  static create(scene: SheepBars | ChickenBars | CowBars): TaskBoard {
    return new TaskBoard(scene);
  }

  private init(): void {
    this.scene.add.existing(this);
    this.setOrigin(0).setVisible(false).setInteractive();

    this.elements = [];
    this.interactiveElements = [];
    this.positionY = this.scene.height;
    this.bgY = this.positionY - 190;
    this.createElements();

    this.listTimer = this.scene.time.addEvent({
      delay: 1000,
      callback: (): void => { this.tickListTimer(); },
      loop: true,
    });
  }


  private createElements(): void {

    this.bg = this.scene.add.nineslice(this.scene.cameras.main.centerX, this.bgY, 660, 120, 'tasks-bar-ns', 15).setOrigin(0.5, 1)
    
    this.taskIcon = this.scene.add.sprite(0, 0, ' ').setVisible(false);
    this.star = this.scene.add.sprite(0, 0, 'star').setVisible(false);

    this.doneText = this.scene.add.text(0, 0, ' ', {
      font: '20px Bip',
      color: '#525252'
    }).setDepth(this.scene.height).setOrigin(0, 0.5).setVisible(false);

    this.taskText = this.scene.add.text(0, 0, ' ', { 
      font: '23px Bip',
      color: '#713D1E',
      align: 'left',
      wordWrap: { width: 450 }
    }).setDepth(this.scene.height).setOrigin(0, 0).setVisible(false);

    this.doneIcon = this.scene.add.sprite(0, 0, 'completed').setVisible(false);
    this.done = this.scene.add.sprite(0, 0, 'little-button').setDepth(this.scene.height).setVisible(false);

    this.takeText = this.scene.add.text(0, 0, this.scene.state.lang.pickUp, {
      font: '20px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5, 0.5).setDepth(this.scene.height).setVisible(false);

    this.award = this.scene.add.text(0, 0, ' ', {
      font: '20px Bip',
      color: '#FFFFFF'
    }).setDepth(this.scene.height + 1).setOrigin(0, 0.5).setVisible(false);
    
    // БГ валюты награды
    this.awardBg = this.scene.add.nineslice(0, 0, 60, 40, 'tasks-uncomplete-rend', 16)
      .setOrigin(0, 0.1)
      .setTint(0x6B000A)
      .setDepth(this.scene.height - 1)
      .setVisible(false);

    this.diamond = this.scene.add.sprite(0, 0, ' ')
      .setDepth(this.scene.height)
      .setScale(0.1)
      .setOrigin(0, 0.5)
      .setVisible(false);

    this.doneButton = this.scene.add.sprite(0, 0, 'big-btn-green').setDepth(1).setVisible(false);

    this.doneButtonText = this.scene.add.text(0, 0, this.scene.state.lang.donePart, {
      font: '22px Shadow',
      color: '#FFFFFF'
    }).setDepth(1).setOrigin(0.5, 0.5).setVisible(false);
    
    let lastPartText: string = this.scene.state.lang[this.scene.state.farm.toLowerCase() + 'CompanyDone'];

    if ( this.scene.state.user.test === 'B') {
      if (this.scene.state.farm === 'Sheep' && this.scene.state.userChicken.part <= 0) {
        lastPartText += this.scene.state.lang.chickenFarmPurchaseAvailable;
      } else if (this.scene.state.farm === 'Chicken' && this.scene.state.userCow.part <= 0) {
        lastPartText += this.scene.state.lang.cowFarmPurchaseAvailable;
      }
    }

    this.lastPart = this.scene.add.text(0, 0, lastPartText, {
      font: '26px Bip',
      color: '#713D1E',
      align: 'center',
      wordWrap: { width: 500 },
    }).setDepth(1).setOrigin(0.5).setVisible(false);

    this.taskProgress = this.scene.add.graphics().setVisible(false);
    this.listButton = this.scene.add.sprite(0, 0,'scroll-arrow').setVisible(false).setOrigin(1, 0.8).setDepth(2);
  }

  public preUpdate(): void {
    
    this.checkVisibility();
    let stateParts: Ipart[];
    let userData: IuserSheep | IuserChicken | IuserCow;
    let countBreed: number;

    if (this.scene.state.farm === 'Chicken') {

      stateParts = this.scene.state.chickenSettings.chickenParts;
      userData = this.scene.state.userChicken;
      countBreed = this.scene.state.chickenSettings.chickenSettings.length;

    } else if (this.scene.state.farm === 'Sheep') {

      stateParts = this.scene.state.sheepSettings.sheepParts;
      userData = this.scene.state.userSheep;
      countBreed = this.scene.state.sheepSettings.sheepSettings.length;
      
    } else if (this.scene.state.farm === 'Cow') {

      stateParts = this.scene.state.cowSettings.cowParts;
      userData = this.scene.state.userCow;
      countBreed = this.scene.state.cowSettings.cowSettings.length;
      
    }
    
    const tasks: Itasks[] = this.scene.game.scene.keys[this.scene.state.farm].partTasks();
    tasks.sort((x1: Itasks, x2: Itasks) => {
      if (x1.got_awarded < x2.got_awarded) return -1;
      if (x1.got_awarded > x2.got_awarded) return 1;
      if (x1.done < x2.done) return 1;
      if (x1.done > x2.done) return -1;
      if (x1.sort < x2.sort) return -1;
      if (x1.sort > x2.sort) return 1;
      return 0;
    });
    
    let setter: boolean = false;
    const task: Itasks = tasks[0];

    if (
      this.taskStatus === task?.done && 
      this.currentTaskProgress === task?.progress && 
      this.taskId === task?.id && 
      this.gotAward === task?.got_awarded ||
      this.isMoving) return;
    else {
      if (this.taskId !== task?.id) setter = true;

      this.currentTaskProgress = task.progress;
      this.gotAward = task.got_awarded;
      this.taskStatus = task.done;
      this.taskId = task.id;
      if (this.taskStatus === 0) this.status = 1;
      else if (this.taskStatus === 1 && task?.got_awarded === 0) this.status = 2;
      else this.status = 3;
      if (this.status === 3
        && task?.done === 1
        && task?.got_awarded === 1
        && stateParts.length === userData.part
      ) this.status = 4;
      
      this.animation?.remove();
      if (this.status === 3 || this.status === 2) this.setDoneAnim();
      this.isUpdated = false;
    }
  
    if (!this.isUpdated) {
      // this.awardBg?.clear();
      this.taskProgress?.clear();

      // Выполняется
      console.log('preUpdate ~ this.status', task)
      if (this.status === 1 && task) {
        const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
        
        this.taskText.setText(taskData.name).setWordWrapWidth(450);
        
        const taskTextBounds = this.taskText.getBounds();
        this.taskText.setPosition(150, this.scene.height - taskTextBounds.height - 244);
        let count: number = task.count;
  
        if (task.type === 14 && task.count === 0) count = countBreed;
        
        this.doneText.setText(this.scene.state.lang.performed + ' ' + task.progress + ' / ' + count).setPosition(150, this.scene.height - 220);
            
        let height = 70 + taskTextBounds.height < 120 ? 120 : 70 + taskTextBounds.height
        // let height = 120
        console.log('preUpdate ~ height1', height)

        this.setPosition(30, this.scene.height - 190 - height).setDisplaySize(660, height).removeAllListeners().setTint(0xFFEBC5);
        this.bg.setY(this.bgY).setDisplaySize(660, height)
        this.taskIcon.setTexture(taskData.icon).setPosition(88, this.scene.height  - 190 - height / 2).setTint();

        const progress: number = (100 / count * task.progress) * (6.3 / 100) - Math.PI / 2;

        this.star.setPosition(630, this.scene.height - 190 - height / 2);

        this.scene.click(this, () => { this.scene.clickTaskBoard(task); });
      
        this.taskProgress
          .setPosition(this.taskIcon.x, this.scene.height  - 190 - height / 2)
          .clear()
          .lineStyle(4, 0xc09245, 1)
          .beginPath()
          .arc(0, 0, 40, 0, Math.PI * 2)
          .strokePath()
          .lineStyle(8, 0x70399f, 1)
          .beginPath()
          .arc(0, 0, 46, Math.PI / -2, progress)
          .strokePath()
          .lineStyle(4, 0xc09245, 1)
          .beginPath()
          .arc(0, 0, 51, 0, Math.PI * 2)
          .strokePath()
          .setDepth(3);
        
         
        if (!this.listIsOpen) {
          this.listButton.setPosition(this.bg.getTopRight().x, this.bg.getTopRight().y);
        }

        this.scene.click(this.listButton, () => {
          // if (!this.listMoving) this.toggleList();
          this.toggleList();
        });

        // Получить награду
      } else if (this.status === 2 && task) {
        const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
        
        this.taskText.setText(taskData.name).setWordWrapWidth(390);
        const taskTextBounds: Phaser.Geom.Rectangle = this.taskText.getBounds();
        this.taskText.setPosition(150, this.scene.height - taskTextBounds.height - 244);
        
        let icon: string = 'diamond';
        let award: number = task.diamonds;
        
        this.award.setText(String(award)).setPosition(190, this.positionY - 220);
        this.diamond.setTexture(icon).setPosition(160, this.positionY - 220);

        if (this.scene.state.farm === 'Sheep') {     
          let moneyTask: any = this.scene.game.scene.keys['Sheep'].moneyTasks.find(el => el.id === task.id);
          if (moneyTask) {
            award = moneyTask.money;
            this.award.setText(String(award))
            this.diamond.setTexture('sheepCoin');
            this.awardBg.setSize(this.diamond.getBounds().width + this.award.getBounds().width + 26, this.awardBg.height)
          } else this.awardBg.setSize(60, 40)
        }

        const bounds = this.award.getBounds();
        this.awardBg.setPosition(bounds.left - 40, bounds.top - 3)
      
        let height = 70 + taskTextBounds.height < 120 ? 120 : 70 + taskTextBounds.height
        console.log('preUpdate ~ height2', height)

        this.setPosition(30, this.positionY - 190 - height).setDisplaySize(660, height).removeAllListeners().setTint(0xFFEBC5);
        this.bg.setY(this.bgY).setDisplaySize(660, height)

        this.taskIcon.setTexture(taskData.icon).setPosition(88, this.positionY - 190 - height / 2).setTint(0x777777);

        this.done.setPosition(620, this.positionY - 190 - height / 2);
        this.takeText.setPosition(620, this.positionY - 193 - height / 2);
        
        this.done.removeAllListeners();
        this.scene.clickShopBtn({
          btn: this.done,
          title: this.takeText,
          img: false
        }, (): void => {
          if (icon === 'diamond') {
            this.scene.getCurrency({ x: this.done.x, y: this.done.y }, task.diamonds, 'diamond');
          } else if (icon === 'sheepCoin') {
            this.scene.plusMoneyAnimation({ x: this.done.x, y: this.done.y });
          }
          this.scene.game.scene.keys[this.scene.state.farm].pickUpTaskReward(task.id);

          this.createOldBoard(task);
        });
      
        this.taskProgress?.clear();

        // Завершить главу
      } else if (this.status === 3 && task) {
        this.setPosition(30, this.positionY - 300).setDisplaySize(660, 110).removeAllListeners().setTint(0xFFEBC5);
        this.bg.setY(this.bgY).setDisplaySize(660, 120)
      
        this.doneButton.setPosition(this.scene.cameras.main.centerX, this.positionY - 245);

        this.doneButtonText.setPosition(this.scene.cameras.main.centerX, this.positionY - 249);

        this.doneButton.removeAllListeners();
        this.scene.clickModalBtn({
          btn: this.doneButton,
          title: this.doneButtonText
        }, 
        (): void => {
          this.scene.game.scene.keys[this.scene.state.farm].nextPart();
        });
        
        this.taskProgress?.clear();
      }
      
      // Кампания завершена
      if (this.status === 4 && task) {

        this.setPosition(30, this.scene.height - 300).removeAllListeners().setDisplaySize(660, 110).setTint(0xFFEBC5);
        this.bg.setY(this.bgY).setDisplaySize(660, 120)

        this.lastPart.setPosition(this.scene.cameras.main.centerX, this.scene.height - 245);
        this.taskProgress?.clear();

        const farm: string = this.scene.state.farm;
        if (this.scene.state.platform === 'vk' && !LocalStorage.get(`done${farm}`)) {
          const mission: number = farm === 'Sheep' ? 5 :
          farm === 'Chicken' ? 6 : farm === 'Cow' ? 7 : 0;
          LocalStorage.set(`done${farm}`, 'true');
          sendAppEventVk(this.scene.state, mission, 100);
        }
      }

      this.bgOriginHeight = this.bg.height
      this.listButtonOriginY = this.listButton.y

      let checkSheepTutor: boolean = true;
      if (this.scene.state.farm === 'Sheep' && this.scene.state.userSheep.tutorial < 100) checkSheepTutor = false;
  
      if ((this.scene.menu.isOpened ||
        this.scene.scene.isActive('Modal') ||
        this.scene.scene.isActive('Tutorial') ||
        this.scene.scene.isActive('Fortune')) &&
        !checkSheepTutor
      ) {

        this.hideAllElement();
        if (this.listIsOpen) this.hideTaskListElements();

      } else if (!this.scene.menu.isOpened &&
        !this.scene.scene.isActive('Modal') &&
        !this.scene.scene.isActive('Tutorial') &&
        !this.scene.scene.isActive('Fortune') &&
        checkSheepTutor) {
        if (setter) {
          this.flyInMainBoardAnim();
        }
        this.shownElements();
      }
    }
  }

  private setDoneAnim(): void {
    if (this.listIsOpen) this.closeTaskListAnimation();
    this.animation = this.scene.tweens.add({
      targets: [
        this,
        this.bg,
        this.taskIcon,
        this.star,
        this.doneText,
        this.taskText,
        this.doneIcon,
        this.done,
        this.takeText,
        this.award,
        this.awardBg,
        this.diamond,
        this.doneButton,
        this.doneButtonText,
        this.lastPart,
        this.taskProgress,
      ],
      delay: 800,
      duration: 250,
      yoyo: true,
      y: '-=20',
      repeat: -1,
    });
  }

  private flyOutOldBoardAnim(...args): void {
    const timeline: Phaser.Tweens.Timeline = this.scene.tweens.createTimeline();
    timeline.add({
      targets: args,
      y: `-=160`,
      duration: 500,
      ease: 'Power3',
    });
    timeline.add({
      targets: args,
      x: '+=700',
      duration: 1000,
      ease: 'Power3',
      onComplete: (): void => {
        args.forEach(el => el.destroy());
      }
    });
    timeline.play();
  }

  private setStartY(): void {
    const dYanim: number = 250;
    this.setY(this.y + dYanim);
    this.bg.setY(this.bg.y + dYanim);
    this.taskIcon.setY(this.taskIcon.y + dYanim);
    this.star.setY(this.star.y + dYanim);
    this.doneText.setY(this.doneText.y + dYanim);
    this.taskText.setY(this.taskText.y + dYanim);
    this.doneIcon.setY(this.doneIcon.y + dYanim);
    this.done.setY(this.done.y + dYanim);
    this.takeText.setY(this.takeText.y + dYanim);
    this.award.setY(this.award.y + dYanim);
    this.awardBg.setY(this.awardBg.y + dYanim);
    this.diamond.setY(this.diamond.y + dYanim);
    this.doneButton.setY(this.doneButton.y + dYanim);
    this.doneButtonText.setY(this.doneButtonText.y + dYanim);
    this.lastPart.setY(this.lastPart.y + dYanim);
    this.taskProgress.setY(this.taskProgress.y + dYanim);
    this.listButton.setY(this.listButton.y + dYanim);
  }

  private flyInMainBoardAnim(): void {
    this.isMoving = true;
    this.setStartY();
    this.removeButtonsInteractive();
    this.scene.tweens.add({
      duration: 500,
      targets: [
        this,
        this.bg,
        this.taskIcon,
        this.star,
        this.doneText,
        this.taskText,
        this.doneIcon,
        this.done,
        this.takeText,
        this.award,
        this.awardBg,
        this.diamond,
        this.doneButton,
        this.doneButtonText,
        this.lastPart,
        this.taskProgress,
        this.listButton,
      ],
      alpha: { from: 0, to: 1 },
      y: '-=250',
      ease: 'Power3',
      onComplete: (): void => {
        this.isMoving = false;
        this.setButtonsInteractive();
      }
    });
  }

  private createOldBoard(task: Itasks): void {
    const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
    const oldTaskBoard: Phaser.GameObjects.Graphics = this.scene.add.graphics().setDepth(this.depth + 10000);
    
    const oldTaskText: Phaser.GameObjects.Text = this.scene.add.text(150, 0, taskData.name, {
      font: '23px Bip',
      color: '#713D1E',
      align: 'left',
      wordWrap: { width: 390 }
    }).setDepth(this.scene.height).setOrigin(0, 0).setVisible(true).setDepth(oldTaskBoard.depth);
  
    const taskTextBounds: Phaser.Geom.Rectangle = this.taskText.getBounds();
    
    oldTaskText.y = this.positionY - taskTextBounds.height - 244;
  
    let height: number = 70 + taskTextBounds.height;
    if (height < 120) height = 120;

    oldTaskBoard.setPosition(30, this.positionY - 190 - height);
    oldTaskBoard.fillStyle(0xFFEBC5, 1);
    oldTaskBoard.fillRoundedRect(0, 0, 660, height, 8);
  
    const oldTaskIcon: Phaser.GameObjects.Image = this.scene.add.image(88, this.positionY - 190 - height / 2, taskData.icon).setDepth(oldTaskBoard.depth);
    oldTaskIcon.setTint(0x777777);
    const oldDoneIcon: Phaser.GameObjects.Image = this.scene.add.image(88, this.positionY - 190 - height / 2, 'completed').setDepth(oldTaskBoard.depth);
    this.flyOutOldBoardAnim(oldTaskText, oldTaskBoard, oldTaskIcon, oldDoneIcon);
  }

  private checkVisibility(): void {
    let checkSheepTutor: boolean = true;
    if (this.scene.state.farm === 'Sheep' && this.scene.state.userSheep.tutorial < 100) checkSheepTutor = false;
    if ((this.scene.menu.isOpened ||
      this.scene.scene.isActive('Modal') ||
      this.scene.scene.isActive('Tutorial') ||
      this.scene.scene.isActive('Fortune')) &&
      this.isVisibile || !checkSheepTutor && this.isVisibile) {
      this.hideAllElement();
      this.hideListButton();
      if (this.listIsOpen) {
        this.hideTaskListElements();
      }
    } else if (!this.scene.menu.isOpened &&
      !this.scene.scene.isActive('Modal') &&
      !this.scene.scene.isActive('Tutorial') &&
      !this.scene.scene.isActive('Fortune') &&
      !this.isVisibile && checkSheepTutor
    ) this.shownElements();

    if (!this.listIsOpen) {
      this.setMainPositionListButton();
    }
  }

  private hideAllElement(): void {
    this.isVisibile = false;
    this.hideListButton();
    this.nineSliceAnimationFix()
    this.setVisible(false);
    this.bg.setVisible(false);
    this.taskIcon?.setVisible(false);
    this.star?.setVisible(false);
    this.doneText?.setVisible(false);
    this.taskText?.setVisible(false);
    this.doneIcon?.setVisible(false);
    this.done?.setVisible(false);
    this.takeText?.setVisible(false);
    this.award?.setVisible(false);
    this.awardBg?.setVisible(false);
    this.diamond?.setVisible(false);
    this.doneButton?.setVisible(false);
    this.doneButtonText?.setVisible(false);
    this.lastPart?.setVisible(false);
    this.taskProgress?.setVisible(false);
  }

  private hideListButton(): void {
    this.listButton?.setVisible(false);
  }

  private shownElements(): void {
    this.hideAllElement();
    this.isVisibile = true;

    if (this.status === 1) {
      this.setVisible(true);
      this.bg.setVisible(true);
      this.star?.setVisible(true);
      this.taskIcon?.setVisible(true);
      this.doneText?.setVisible(true);
      this.taskText?.setVisible(true);
      this.taskProgress?.setVisible(true);
      if (!this.closingAni?.isPlaying()) this.listButton?.setVisible(true);
    } else if (this.status === 2) {
      this.setVisible(true);
      this.bg.setVisible(true);
      this.taskText.setVisible(true);
      this.award.setVisible(true);
      this.diamond.setVisible(true);
      this.awardBg.setVisible(true);
      this.taskIcon.setVisible(true);
      this.done.setVisible(true);
      this.takeText.setVisible(true);
    } else if (this.status === 3) {
      this.setVisible(true);
      this.bg.setVisible(true);
      this.doneButton.setVisible(true);
      this.doneButtonText.setVisible(true);
    } else if (this.status === 4) {
      this.setVisible(true);
      this.bg.setVisible(true);
      this.lastPart.setVisible(true);
    }
  }

  private setButtonsInteractive(): void {
    this.doneButton.setInteractive();
    this.done.setInteractive();
  }

  private removeButtonsInteractive(): void {
    this.doneButton.removeInteractive();
    this.done.removeInteractive();
  }

  private openAllTasksWindow(): void {
    this.listButton.setFlipY(true);
    this.hideAllElement();
    this.setdY();
    this.moveListButtonTop();
    this.createAllTasks();
  }

  private setdY(): void {
    const tasksParams: Itasks[] = this.scene.game.scene.keys[this.scene.state.farm].partTasks();
    tasksParams.sort((x1: Itasks, x2: Itasks) => {
      if (x1.got_awarded < x2.got_awarded) return -1;
      if (x1.got_awarded > x2.got_awarded) return 1;
      if (x1.done < x2.done) return 1;
      if (x1.done > x2.done) return -1;
      if (x1.sort < x2.sort) return -1;
      if (x1.sort > x2.sort) return 1;
      return 0;
    });
    tasksParams.splice(0, 1);
    this.dY = this.displayHeight - 10;

    for (let i: number = 0; i < tasksParams.length; i += 1) {    
      const task: Itasks = tasksParams[i];
      const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
      const icon: Phaser.GameObjects.Image = this.scene.add.sprite(0, 0, taskData.icon).setVisible(false).setScale(0.9);
      this.dY += (icon.height + 20);
    }
    this.listButtondY = this.dY - this.displayHeight + 6;
  }

  private createAllTasks(): void {
    const tasksParams: Itasks[] = this.scene.game.scene.keys[this.scene.state.farm].partTasks();
    tasksParams.sort((x1: Itasks, x2: Itasks) => {
      if (x1.got_awarded > x2.got_awarded) return -1;
      if (x1.got_awarded < x2.got_awarded) return 1;
      if (x1.done > x2.done) return 1;
      if (x1.done < x2.done) return -1;
      if (x1.sort > x2.sort) return -1;
      if (x1.sort < x2.sort) return 1;
      return 0;
    });

    tasksParams.pop()

    if (this.elements.length > 0) this.elements.forEach(el => { el?.destroy() })
    this.elements = []
    this.aditionalHeight = 0
    
    for (let i: number = 0; i < tasksParams.length; i++) {    
      const task: Itasks = tasksParams[i];
      const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
      this.elements = this.elements.concat(this.createTaskListElement(task, taskData, i))
    }
    
    this.openTaskListAnimation()
  }

  private createTaskListElement(task: Itasks, taskData: ItaskData, i: number): any[] {
    const icon: Phaser.GameObjects.Image = this.scene.add.sprite(88, this.bg.getTopCenter().y - 60 - i * 110, taskData.icon).setDepth(1).setScale(0.9).setAlpha(0);
    const text: Phaser.GameObjects.Text = this.scene.add.text(icon.getBounds().right + 20, this.bg.getTopCenter().y - 60 - i * 110, taskData.name, {
      font: '24px Bip',
      color: '#713D1E',
      align: 'left',
      wordWrap: { width: 460 }
    }).setDepth(1).setOrigin(0, 0.5).setAlpha(0);
    let height = icon.height;

    const lineTile: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(this.scene.cameras.main.centerX, icon.y + icon.getBounds().height / 2 + 12, 620, 3, 'white-pixel')
      .setDepth(1)
      .setAlpha(0);
    lineTile.setTint(0xdf9241);

    const clickZone: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(icon.getTopLeft().x - 14, icon.getTopLeft().y - 13, 650, lineTile.y - icon.getTopCenter().y + 21, 'white-pixel').setOrigin(0).setAlpha(0.5).setInteractive()
    this.scene.click(clickZone, () => {
      if (!task.done) this.scene.clickTaskBoard(task);
      console.log(task, taskData);
    });
    this.interactiveElements.push(clickZone)
    this.aditionalHeight += clickZone.height
    console.log(i, clickZone.height)

    let completed: Phaser.GameObjects.Sprite = null;
    if (task.done === 1 && task.got_awarded === 1) {
      icon.setTint(0x777777).setAlpha(0);
      completed = this.scene.add.sprite(icon.x, icon.y, 'completed').setDepth(1).setTint(0xc0c0c0).setOrigin(0.5, 0.5).setAlpha(0);
      text.setColor('#6f6f6f').setAlpha(0);
    }
    this.dY -= (height);

    return [
      icon,
      text,
      lineTile,
      completed
    ]
  }

  private openTaskListAnimation(): void {
    let height = 125 + this.aditionalHeight
    console.log('openTaskListAnimation ~ DHeight', this.bg.displayHeight)
    console.log('openTaskListAnimation ~ height', height)
    console.log('openTaskListAnimation ~ this.bgOriginHeight', this.bgOriginHeight)
    console.log('openTaskListAnimation ~ this.aditionalHeight', this.aditionalHeight)

    this.scene.tweens.add({
      onStart: (): void => { this.nineSliceAnimationFix() },
      targets: this.bg,
      height,
      duration: 500,
      ease: 'Power1',
      onUpdate: (): void => { this.bg.setSize(this.bg.width, this.bg.height++) },
      onComplete: (): void => {
        this.listButton.setY(this.bg.getTopCenter().y)
        this.nineSliceAnimationFix()
        console.log(this.bg.height);
        console.log('openTaskListAnimation ~ DHeight2', this.bg.displayHeight)
      }
    });

    this.scene.tweens.add({
      onStart: (): void => { this.nineSliceAnimationFix() },
      targets: this.elements,
      alpha: { value: 1, duration: 300, delay: 500 },
      ease: 'Power1',
    });
  }

  private closeTaskListAnimation(): void {
    this.listButton.setAlpha(0);
    if (this.interactiveElements.length > 0) {
      this.interactiveElements.forEach(el => { el?.destroy() })
      this.interactiveElements = []
    }

    this.scene.tweens.add({
      onStart: (): void => { this.nineSliceAnimationFix() },
      targets: this.elements,
      alpha: { value: 0, duration: 300 },
      ease: 'Power1',
    });

    this.closingAni = this.scene.tweens.add({
      targets: this.bg,
      height: this.bgOriginHeight,
      duration: 500,
      delay: 300,
      ease: 'Power1',
      onUpdate: (): void => { this.bg.setSize(this.bg.width, this.bg.height--) },
      onComplete: (): void => {
        if (this.isVisibile && this.status === 1) this.listButton?.setVisible(true);
        this.fadeOutListButton();
        this.nineSliceAnimationFix();
        console.log(this.bg.height);
      }
    });

    this.scene.time.addEvent({
      delay: 750,
      callback: (): void => {
        this.listTime = 0;
        this.listIsOpen = false;
      }
    });
  }
  
  private toggleList(): void {
    if (!this.listIsOpen) {
      this.listIsOpen = true;
      this.openAllTasksWindow();
    } else {
      this.closeTaskListAnimation();
    }
  }

  private moveListButtonTop(): void {
    const anim: Phaser.Tweens.Tween = this.scene.tweens.add({
      targets: [ this.listButton ],
      onUpdate: (): void => {
        this.listButton.setAlpha(0)
        if (
          this.scene.menu.isOpened ||
          this.scene.scene.isActive('Modal') ||
          this.scene.scene.isActive('Tutorial') ||
          this.scene.scene.isActive('Fortune')
        ) {
          this.setMainPositionListButton();
          anim.stop();
        }
      },
      onStart: (): void => {
        this.listButton.setAlpha(0);
      },
      y: `-=${this.listButtondY}`,
      duration: 500,
      ease: 'Power1',
      onComplete: (): void => {
        this.fadeOutListButton();
      }
    })
  }

  private fadeOutListButton(): void {
    this.scene.tweens.add({
      targets: [ this.listButton ],
      alpha: 1,
      duration: 150,
    });
  }

  private tickListTimer(): void {
    if (this.listIsOpen) this.listTime++;
    if (this.listTime > 3) this.closeTaskListAnimation();
  }

  private hideTaskListElements(): void {
    this.closeTaskListAnimation();
    this.elements.forEach(el => el?.setVisible(false));
  }

  private setMainPositionListButton(): void {
    this.listButton.setFlipY(false);
    this.fadeOutListButton();
    this.listButton.setPosition(this.bg.getTopRight().x, this.bg.getTopRight().y);
  }

  private nineSliceAnimationFix(): void {
    this.scene.add.text(0,0,'').destroy()
  }
}
