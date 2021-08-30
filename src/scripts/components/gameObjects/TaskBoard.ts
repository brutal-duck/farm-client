import SheepBars from '../../scenes/Sheep/SheepBars';
import ChickenBars from '../../scenes/Chicken/ChickenBars';
import CowBars from '../../scenes/Cow/CowBars';
import { sendAppEventVk } from '../../general/basic';
import LocalStorage from './../../libs/LocalStorage';
import RoundedProgress from '../animations/RoundedProgress';

/**
  *  Планка заданий в барах сцен    
  * 
  *  Конструктор принимает:
  *1. объект сцены; 
*/

// плашка заданий
export default class TaskBoard extends Phaser.GameObjects.TileSprite {

  public scene: SheepBars | ChickenBars | CowBars;

  // private t: any
  private bg: Phaser.GameObjects.RenderTexture;
  private bgY: number;
  private bgOriginHeight: number;
  private closingAniIsPlaying: boolean;
  private elements: Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.Text | Phaser.GameObjects.TileSprite>;
  private interactiveElements: Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.Text | Phaser.GameObjects.TileSprite>;;
  private aditionalHeight: number;
  private isVisibile: boolean;
  private status: number;
  private taskStatus: number;
  private currentTaskProgress: number;
  private taskIcon: Phaser.GameObjects.Sprite;
  private star: Phaser.GameObjects.Sprite;
  private doneText: Phaser.GameObjects.Text;
  private taskText: Phaser.GameObjects.Text;
  private checkMark: Phaser.GameObjects.Sprite;
  private done: Phaser.GameObjects.Sprite;
  private takeText: Phaser.GameObjects.Text;
  private award: Phaser.GameObjects.Text;
  private awardBg: Phaser.GameObjects.RenderTexture;
  private diamond: Phaser.GameObjects.Sprite;
  private doneButton: Phaser.GameObjects.Sprite;
  private doneButtonText: Phaser.GameObjects.Text;
  private lastPart: Phaser.GameObjects.Text;
  private taskProgress: RoundedProgress;
  private taskProgressMask: Phaser.GameObjects.TileSprite;
  private taskProgressBorder1: Phaser.GameObjects.Sprite;
  private taskProgressBorder2: Phaser.GameObjects.Sprite;
  private positionY: number;
  private animation: Phaser.Tweens.Tween;
  private progressAni: Phaser.Tweens.Tween 
  private isUpdated: boolean = false;
  private taskId: number;
  private gotAward: number;
  private listButton: Phaser.GameObjects.Sprite;
  private listIsOpen: boolean = false;
  private listButtondY: number = 0;
  private listTime: number = 0;
  private isMoving: boolean = false;

  constructor(scene: SheepBars | ChickenBars | CowBars) {
    super(scene, 0, 0, 0, 0, 'pixel');
    this.scene = scene;
    this.isVisibile = false;
    this.init();
  }

  static create(scene: SheepBars | ChickenBars | CowBars): TaskBoard {
    return new TaskBoard(scene);
  }

  private init(): void {
    this.scene.add.existing(this);
    this.setVisible(false).setInteractive();

    this.elements = [];
    this.interactiveElements = [];
    this.positionY = this.scene.height;
    this.bgY = this.positionY - 190;
    this.closingAniIsPlaying = false;
    this.createElements();

    this.scene.time.addEvent({
      delay: 1000,
      callback: (): void => { this.tickListTimer(); },
      loop: true,
    });
  }


  private createElements(): void {
    // Тестирование: на пробел выполняется задание
    // this.scene.input.keyboard.addKey('SPACE').on('down', (): void => { this.t.done = 1 })

    this.bg = this.scene.add.nineslice(this.scene.cameras.main.centerX, this.bgY, 660, 120, 'tasks-bar-ns', 15).setDepth(this.scene.height + 100).setVisible(false).setOrigin(0.5, 1).setInteractive();
    
    this.taskIcon = this.scene.add.sprite(0, 0, ' ').setDepth(this.bg.depth + 1).setVisible(false);
    this.star = this.scene.add.sprite(0, 0, 'star').setDepth(this.bg.depth + 1).setVisible(false);

    this.doneText = this.scene.add.text(0, 0, ' ', {
      font: '20px Bip',
      color: '#525252'
    }).setDepth(this.bg.depth + 1).setOrigin(0, 0.5).setVisible(false);

    this.taskText = this.scene.add.text(0, 0, ' ', { 
      font: '23px Bip',
      color: '#713D1E',
      align: 'left',
      wordWrap: { width: 450 }
    }).setDepth(this.bg.depth + 1).setOrigin(0, 0).setVisible(false);
    
    this.checkMark = this.scene.add.sprite(0, 0, 'completed').setDepth(this.bg.depth + 2).setVisible(false);
    this.done = this.scene.add.sprite(0, 0, 'little-button').setDepth(this.bg.depth + 1).setVisible(false);

    this.takeText = this.scene.add.text(0, 0, this.scene.state.lang.pickUp, {
      font: '20px Shadow',
      color: '#FFFFFF'
    }).setOrigin(0.5).setDepth(this.bg.depth + 1).setVisible(false);

    this.award = this.scene.add.text(0, 0, ' ', {
      font: '20px Bip',
      color: '#FFFFFF'
    }).setDepth(this.bg.depth + 2).setOrigin(0, 0.5).setVisible(false);
    
    // БГ валюты награды
    this.awardBg = this.scene.add.nineslice(0, 0, 60, 40, 'tasks-uncomplete-rend', 16)
      .setOrigin(0, 0.1)
      .setTint(0x6B000A)
      .setDepth(this.bg.depth + 1)
      .setVisible(false);

    this.diamond = this.scene.add.sprite(0, 0, ' ')
      .setDepth(this.bg.depth + 1)
      .setScale(0.1)
      .setOrigin(0, 0.5)
      .setVisible(false);

    this.doneButton = this.scene.add.sprite(0, 0, 'big-btn-green').setDepth(this.bg.depth + 1).setVisible(false);

    this.doneButtonText = this.scene.add.text(0, 0, this.scene.state.lang.donePart, {
      font: '22px Shadow',
      color: '#FFFFFF'
    }).setDepth(this.bg.depth + 2).setOrigin(0.5, 0.5).setVisible(false);
    
    let lastPartText: string = this.scene.state.lang[this.scene.state.farm.toLowerCase() + 'CompanyDone'];

    this.lastPart = this.scene.add.text(0, 0, lastPartText, {
      font: '26px Bip',
      color: '#713D1E',
      align: 'center',
      wordWrap: { width: 500 },
    }).setDepth(this.bg.depth + 1).setOrigin(0.5).setVisible(false);

    this.taskProgress = new RoundedProgress(this.scene, 0, 0, 1.35).setTint(0x70399f).setVisible(false);
    this.taskProgressMask = this.taskProgress.mask.bitmapMask as Phaser.GameObjects.TileSprite;
    this.taskProgressMask.setVisible(false);
    this.taskProgressBorder1 = this.scene.add.sprite(0, 0, 'circle-outline').setTint(0xc09245).setScale(1.35).setVisible(false).setDepth(this.taskProgress.rightSegment.depth);
    this.taskProgressBorder2 = this.scene.add.sprite(0, 0, 'circle-outline').setTint(0xc09245).setScale(1.1).setVisible(false).setDepth(this.taskProgress.rightSegment.depth);
    this.listButton = this.scene.add.sprite(0, 0,'scroll-arrow').setVisible(false).setOrigin(1, 0.8).setDepth(this.bg.depth + 1);
  }

  public preUpdate(): void {
    this.checkVisibility();
    const farm = this.scene.state.farm;
    let stateParts: Ipart[] = this.scene.state[`${farm.toLowerCase()}Settings`][`${farm.toLowerCase()}Parts`];
    let userData: IuserSheep | IuserChicken | IuserCow = this.scene.state[`user${farm}`];
    let countBreed: number = this.scene.state[`${farm.toLowerCase()}Settings`][`${farm.toLowerCase()}Settings`].length;
    
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
        
    // Определение текущего задание для тестирования
    // if (this.t !== task) this.t = task
    
    // Поиск невыполненого задания для тестирования
    // for (let i = tasks.length - 1; i >= 0; i--) {
    //   if (!tasks[i].done) {
    //     this.t = tasks[i]
    //     break
    //   }
    // }

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

      // Выполняется
      if (this.status === 1 && task) {
        const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
        
        this.taskText.setText(taskData.name).setWordWrapWidth(450);
        
        const taskTextBounds = this.taskText.getBounds();
        this.taskText.setPosition(150, this.scene.height - taskTextBounds.height - 248);
        let count: number = task.count;
  
        if (task.type === 14 && task.count === 0) count = countBreed;
        
        this.doneText.setText(this.scene.state.lang.performed + ' ' + task.progress + ' / ' + count).setPosition(150, this.scene.height - 225);
            
        let height = 70 + taskTextBounds.height < 120 ? 120 : 70 + taskTextBounds.height;

        this.bg.setY(this.bgY).setDisplaySize(660, height).removeAllListeners();
        this.taskIcon.setTexture(taskData.icon).setPosition(88, this.scene.height  - 190 - height / 2).setTint().setAlpha(1);
        this.star.setPosition(630, this.scene.height - 190 - height / 2);

        this.scene.click(this.bg, () => { this.scene.clickTaskBoard(task); });

        const progress: number = Math.round(100 / count * task.progress);
        this.taskProgress.setPercent(progress, 0, progress === 0 ? 1 : 500).setPosition(this.taskIcon.x, this.scene.height  - 190 - height / 2);
        this.taskProgressBorder1.setPosition(this.taskIcon.x, this.scene.height  - 190 - height / 2);
        this.taskProgressBorder2.setPosition(this.taskIcon.x, this.scene.height  - 190 - height / 2);
        
        if (!this.listIsOpen) {
          this.listButton.setPosition(this.bg.getTopRight().x, this.bg.getTopRight().y);
        }

        this.scene.click(this.listButton, () => { this.toggleList() });

        // Получить награду
      } else if (this.status === 2 && task) {
                
        const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
        
        this.taskText.setText(taskData.name).setWordWrapWidth(390);
        const taskTextBounds: Phaser.Geom.Rectangle = this.taskText.getBounds();
        this.taskText.setPosition(150, this.scene.height - taskTextBounds.height - 248);
        
        let icon: string = 'diamond';
        let award: number = task.diamonds;
        
        this.award.setText(String(award)).setPosition(190, this.positionY - 220);
        this.diamond.setTexture(icon).setPosition(160, this.positionY - 220);

        if (this.scene.state.farm === 'Sheep') {
          let moneyTask: any = this.scene.game.scene.keys['Sheep'].moneyTasks.find(el => el.id === task.id);
          if (moneyTask) {
            award = moneyTask.money;
            this.award.setText(String(award));
            this.diamond.setTexture('sheepCoin');
            this.awardBg.setSize(this.diamond.getBounds().width + this.award.getBounds().width + 26, this.awardBg.height);
          } else this.awardBg.setSize(60, 40);
        }

        const bounds = this.award.getBounds();
        this.awardBg.setPosition(bounds.left - 40, bounds.top - 3);
      
        let height = 70 + taskTextBounds.height < 120 ? 120 : 70 + taskTextBounds.height;
        if (!this.closingAniIsPlaying) this.bg.setY(this.bgY).setDisplaySize(660, height).removeAllListeners();

        this.taskIcon.setTexture(taskData.icon).setPosition(88, this.positionY - 190 - height / 2).setTint(0x777777).setAlpha(0.6);
        this.done.setPosition(620, this.positionY - 190 - height / 2);
        this.takeText.setPosition(620, this.positionY - 193 - height / 2);
        this.checkMark.setPosition(this.taskIcon.x, this.taskIcon.y);
        this.taskProgress.setPosition(this.taskIcon.x, this.scene.height  - 190 - height / 2);
        this.taskProgressBorder1.setPosition(this.taskIcon.x, this.scene.height  - 190 - height / 2);
        this.taskProgressBorder2.setPosition(this.taskIcon.x, this.scene.height  - 190 - height / 2);
        
        this.done.removeAllListeners();
        this.scene.clickShopBtn({
          btn: this.done,
          title: this.takeText,
          img: false
        }, (): void => {
          if (!this.closingAniIsPlaying) {
            if (icon === 'diamond') this.scene.getCurrency({ x: this.done.x, y: this.done.y }, task.diamonds, 'diamond');
            else if (icon === 'sheepCoin') this.scene.plusMoneyAnimation({ x: this.done.x, y: this.done.y });
            this.scene.game.scene.keys[this.scene.state.farm].pickUpTaskReward(task.id);
            this.createOldBoard(task);
          }
        });

        // Завершить главу
      } else if (this.status === 3 && task) {
        this.bg.setY(this.bgY).setDisplaySize(660, 110).removeAllListeners();

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
        
        this.taskProgress.setPercent(0);
      }
      
      // Кампания завершена
      if (this.status === 4 && task) {
        this.bg.setY(this.bgY).setDisplaySize(660, 110).removeAllListeners();
        this.lastPart.setPosition(this.scene.cameras.main.centerX, this.scene.height - 245);

        if (this.scene.state.platform === 'vk' && !LocalStorage.get(`done${farm}`)) {
          const mission: number = farm === 'Sheep' ? 5 :
          farm === 'Chicken' ? 6 : farm === 'Cow' ? 7 : 0;
          LocalStorage.set(`done${farm}`, 'true');
          sendAppEventVk(this.scene.state, mission, 100);
        }
      }

      this.bgOriginHeight = this.bg.displayHeight;

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
        checkSheepTutor
      ) {
        this.shownElements();
        if (setter) this.flyInMainBoardAnim();
        else if (this.status === 2) this.setProgressAni();
      }
    }
  }

  private setVisibleProgressElements(isVisible: boolean): void {
    this.taskProgress?.setVisible(isVisible)
    this.taskProgressBorder1.setVisible(isVisible)
    this.taskProgressBorder2.setVisible(isVisible)
  }


  private setProgressAni(): void {
    const duration = 400
    const delay = 350

    this.checkMark.setAlpha(0.5).setScale(0.85)
    this.taskProgress?.setPercent(100, 0, 350)
    this.setVisibleProgressElements(true)

    this.progressAni = this.scene.tweens.add({
      onStart: (): void => { this.taskProgress.fadeOut(duration) },
      targets: [
        this.taskProgressBorder1,
        this.taskProgressBorder2,
        this.checkMark
      ],
      alpha: (target): number => {
        if (target === this.checkMark) return 1
        else return 0
      },
      scale: (target): number => {
        if (target === this.checkMark) return 1
        else return target.scale
      },
      delay,
      duration,
    })
  }

  private setDoneAnim(): void {
    if (this.listIsOpen && !this.closingAniIsPlaying) this.closeTaskListAnimation();
    this.animation = this.scene.tweens.add({
      targets: [
        this.bg,
        this.taskIcon,
        this.star,
        this.doneText,
        this.taskText,
        this.checkMark,
        this.done,
        this.takeText,
        this.award,
        this.awardBg,
        this.diamond,
        this.doneButton,
        this.doneButtonText,
        this.lastPart,
        this.taskProgress.rightSegment,
        this.taskProgress.leftSegment,
        this.taskProgressMask,
        this.taskProgressBorder1,
        this.taskProgressBorder2,
      ],
      onStart: (): void => { this.setVisibleProgressElements(false) },
      delay: 850,
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
      onComplete: (): void => { args.forEach(el => el.destroy()) }
    });
    timeline.play();
  }

  private setStartY(): void {
    const dYanim: number = 250;
    this.bg.setY(this.bgY + dYanim);
    this.taskIcon.setY(this.taskIcon.y + dYanim);
    this.star.setY(this.star.y + dYanim);
    this.doneText.setY(this.doneText.y + dYanim);
    this.taskText.setY(this.taskText.y + dYanim);
    this.checkMark.setY(this.checkMark.y + dYanim);
    this.done.setY(this.done.y + dYanim);
    this.takeText.setY(this.takeText.y + dYanim);
    this.award.setY(this.award.y + dYanim);
    this.awardBg.setY(this.awardBg.y + dYanim);
    this.diamond.setY(this.diamond.y + dYanim);
    this.doneButton.setY(this.doneButton.y + dYanim);
    this.doneButtonText.setY(this.doneButtonText.y + dYanim);
    this.lastPart.setY(this.lastPart.y + dYanim);    
    this.taskProgress.rightSegment.setY(this.taskProgress.rightSegment.y + dYanim);
    this.taskProgress.leftSegment.setY(this.taskProgress.leftSegment.y + dYanim);
    this.taskProgressMask.setY(this.taskProgressMask.y + dYanim);
    this.taskProgressBorder1.setY(this.taskProgressBorder1.y + dYanim);
    this.taskProgressBorder2.setY(this.taskProgressBorder2.y + dYanim);
    this.listButton.setY(this.listButton.y + dYanim);
  }

  private flyInMainBoardAnim(): void {
    if (!this.closingAniIsPlaying) {
      this.isMoving = true;
      this.setStartY();
      this.removeButtonsInteractive();
      if (this.status === 2) this.setVisibleProgressElements(false);

      this.scene.tweens.add({
        duration: 500,
        targets: [
          this.bg,
          this.taskIcon,
          this.star,
          this.doneText,
          this.taskText,
          this.checkMark,
          this.done,
          this.takeText,
          this.award,
          this.awardBg,
          this.diamond,
          this.doneButton,
          this.doneButtonText,
          this.lastPart,
          this.taskProgress.rightSegment,
          this.taskProgress.leftSegment,
          this.taskProgressMask,
          this.taskProgressBorder1,
          this.taskProgressBorder2,
          this.listButton,
        ],
        alpha: (target): number => {
          if (target !== this.checkMark) target.setAlpha(0);
          if (target.tintTopLeft === parseInt('0x777777', 16) && this.status === 2) return 0.6;
          else if (target === this.checkMark) return this.checkMark.alpha;
          else return 1
        },
        y: '-=250',
        ease: 'Power3',
        onComplete: (): void => {
          this.isMoving = false;
          this.setButtonsInteractive();
        }
      });
    }
  }

  private createOldBoard(task: Itasks): void {
    if (this.progressAni?.isPlaying()) this.progressAni?.remove();
    this.setVisibleProgressElements(false)

    const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
    const oldTaskBoard: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(this.bg.x, this.bgY, this.bg.displayWidth, this.bg.displayHeight, 'tasks-bar-ns', 15).setOrigin(0.5, 1).setDepth(this.depth + 10000);
    const oldTaskText: Phaser.GameObjects.Text = this.scene.add.text(150, this.positionY - this.taskText.getBounds().height - 244, taskData.name, {
      font: '23px Bip',
      color: '#713D1E',
      align: 'left',
      wordWrap: { width: 390 }
    }).setOrigin(0, 0).setVisible(true).setDepth(oldTaskBoard.depth);
      
    let height = 70 + this.taskText.getBounds().height < 120 ? 120 : 70 + this.taskText.getBounds().height;
  
    const oldTaskIcon: Phaser.GameObjects.Image = this.scene.add.image(88, this.positionY - 190 - height / 2, taskData.icon).setDepth(oldTaskBoard.depth).setTint(0x777777).setAlpha(0.6);
    const oldDoneIcon: Phaser.GameObjects.Image = this.scene.add.image(88, this.positionY - 190 - height / 2, 'completed').setDepth(oldTaskBoard.depth).setTint(0xc0c0c0).setAlpha(0.9);
    this.flyOutOldBoardAnim(oldTaskText, oldTaskBoard, oldTaskIcon, oldDoneIcon);
  }

  private checkVisibility(): void {
    let checkSheepTutor: boolean = true;
    if (this.scene.state.farm === 'Sheep' && this.scene.state.userSheep.tutorial < 100) checkSheepTutor = false;
    if (
      (this.scene.menu.isOpened ||
      this.scene.scene.isActive('Modal') ||
      this.scene.scene.isActive('Tutorial') ||
      this.scene.scene.isActive('Block') ||
      this.scene.scene.isActive('Fortune')) &&
      this.isVisibile || !checkSheepTutor && this.isVisibile
    ) {
      this.hideAllElement();
      this.hideListButton();
      if (this.listIsOpen) this.hideTaskListElements();
    } else if (
      !this.scene.menu.isOpened &&
      !this.scene.scene.isActive('Modal') &&
      !this.scene.scene.isActive('Block') &&
      !this.scene.scene.isActive('Tutorial') &&
      !this.scene.scene.isActive('Fortune') &&
      !this.isVisibile && checkSheepTutor
    ) this.shownElements();

    if (!this.listIsOpen) this.setMainPositionListButton();
  }

  private hideAllElement(): void {
    this.isVisibile = false;
    this.hideListButton();
    this.nineSliceAnimationFix();
    this.bg?.setVisible(false);
    this.taskIcon?.setVisible(false);
    this.star?.setVisible(false);
    this.doneText?.setVisible(false);
    this.taskText?.setVisible(false);
    this.checkMark?.setVisible(false);
    this.done?.setVisible(false);
    this.takeText?.setVisible(false);
    this.award?.setVisible(false);
    this.awardBg?.setVisible(false);
    this.diamond?.setVisible(false);
    this.doneButton?.setVisible(false);
    this.doneButtonText?.setVisible(false);
    this.lastPart?.setVisible(false);
    this.setVisibleProgressElements(false);
  }

  private hideListButton(): void {
    this.listButton?.setVisible(false);
  }

  private shownElements(): void {
    this.hideAllElement();
    this.isVisibile = true;

    if (this.status === 1) {
      this.bg.setVisible(true);
      this.star?.setVisible(true);
      this.taskIcon?.setVisible(true);
      this.doneText?.setVisible(true);
      this.taskText?.setVisible(true);
      this.taskProgress?.setVisible(true);
      this.taskProgressBorder1.setVisible(true);
      this.taskProgressBorder2.setVisible(true);
      if (!this.closingAniIsPlaying) this.listButton?.setVisible(true);
    } else if (this.status === 2) {
      this.bg.setVisible(true);
      this.taskText.setVisible(true);
      this.checkMark.setVisible(true);
      this.award.setVisible(true);
      this.diamond.setVisible(true);
      this.awardBg.setVisible(true);
      this.taskIcon.setVisible(true);
      this.done.setVisible(true);
      this.takeText.setVisible(true);
      this.taskProgress?.setVisible(true);
      this.taskProgressBorder1.setVisible(true);
      this.taskProgressBorder2.setVisible(true);
    } else if (this.status === 3) {
      this.bg.setVisible(true);
      this.doneButton.setVisible(true);
      this.doneButtonText.setVisible(true);
    } else if (this.status === 4) {
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
    this.moveListButtonTop();
    this.createAllTasks();
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

    tasksParams.pop();

    if (this.elements.length > 0) this.elements.forEach(el => { el?.destroy() });
    this.elements = [];
    this.aditionalHeight = 0;
    
    for (let i: number = 0; i < tasksParams.length; i++) {    
      const task: Itasks = tasksParams[i];
      const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
      this.elements = this.elements.concat(this.createTaskListElement(task, taskData, i));
    }
    
    if (!this.closingAniIsPlaying) this.openTaskListAnimation();
  }

  private createTaskListElement(task: Itasks, taskData: ItaskData, i: number): any[] {
    const icon: Phaser.GameObjects.Image = this.scene.add.sprite(88, this.bg.getTopCenter().y - 60 - i * 110, taskData.icon).setDepth(this.bg.depth + 1).setScale(0.85).setAlpha(0);
    const text: Phaser.GameObjects.Text = this.scene.add.text(icon.getBounds().right + 20, this.bg.getTopCenter().y - 60 - i * 110, taskData.name, {
      font: '24px Bip',
      color: '#713D1E',
      align: 'left',
      wordWrap: { width: 460 }
    }).setDepth(this.bg.depth + 1).setOrigin(0, 0.5).setAlpha(0);

    const lineTile: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(this.scene.cameras.main.centerX, icon.y + icon.getBounds().height / 2 + 18, 620, 3, 'white-pixel').setDepth(this.bg.depth + 1).setAlpha(0).setTint(0xdf9241);
    const clickZone: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(icon.getTopLeft().x - 14, icon.getTopLeft().y - 10, 650, lineTile.y - icon.getTopCenter().y + 21, 'white-pixel').setDepth(this.bg.depth + 2).setOrigin(0).setAlpha(0.0001).setInteractive();
    this.scene.click(clickZone, () => { if (!task.done) this.scene.clickTaskBoard(task) });
    this.interactiveElements.push(clickZone);
    this.aditionalHeight += clickZone.height + 4;

    let completed: Phaser.GameObjects.Sprite = null;
    let progress: RoundedProgress = null;
    let border1: Phaser.GameObjects.Sprite = null;
    let border2: Phaser.GameObjects.Sprite = null;
    if (task.done === 1 && task.got_awarded === 1) {
      icon.setTint(0x777777).setAlpha(0);
      completed = this.scene.add.sprite(icon.x, icon.y, 'completed').setDepth(this.bg.depth + 2).setTint(0xc0c0c0).setOrigin(0.5).setAlpha(0);
      text.setColor('#6f6f6f').setAlpha(0);
    } else {
      progress = new RoundedProgress(this.scene, icon.x, icon.y, 1.13).setPercent(Math.round(100 / task.count * task.progress)).setTint(0x70399f).setAlpha(0);
      border1 = this.scene.add.sprite(icon.x, icon.y, 'circle-outline').setScale(1.15).setTint(0xc09245).setAlpha(0).setDepth(progress.rightSegment.depth + 1);
      border2 = this.scene.add.sprite(icon.x, icon.y, 'circle-outline').setScale(0.9).setTint(0xc09245).setAlpha(0).setDepth(progress.rightSegment.depth + 1);
    }

    return [
      icon,
      text,
      lineTile,
      completed,
      progress?.rightSegment,
      progress?.leftSegment,
      border1,
      border2
    ];
  }

  private openTaskListAnimation(): void {
    let height = this.bgOriginHeight + this.aditionalHeight;

    this.scene.tweens.add({
      onStart: (): void => { this.nineSliceAnimationFix() },
      targets: this.bg,
      height,
      duration: 500,
      ease: 'Power1',
      onUpdate: (): void => {
        this.bg.setSize(this.bg.width, this.bg.height--);
        this.bg.setDisplaySize(this.bg.width, this.bg.height);
      },
      onComplete: (): void => {
        this.listButton.setY(this.bg.getTopCenter().y);
        this.nineSliceAnimationFix();
      }
    });

    this.scene.tweens.add({
      onStart: (): void => { this.nineSliceAnimationFix() },
      targets: this.elements,
      alpha: (target): number => {
        if (target.tintTopLeft === parseInt('0x777777', 16)) return 0.6;
        else if (target.tintTopLeft === parseInt('0xc0c0c0', 16)) return 0.9;
        else return 1;
      },
      duration: 300,
      delay: 500,
      ease: 'Power1',
    });
  }

  private closeTaskListAnimation(): void {
    this.closingAniIsPlaying = true;
    this.listButton.setAlpha(0);

    if (this.interactiveElements.length > 0) {
      this.interactiveElements.forEach(el => { el?.destroy() });
      this.interactiveElements = [];
    }

    this.scene.tweens.add({
      onStart: (): void => { this.nineSliceAnimationFix() },
      targets: this.elements,
      alpha: { value: 0, duration: 300 },
      ease: 'Power1',
    });

    this.scene.tweens.add({
      targets: this.bg,
      height: this.bgOriginHeight,
      duration: 500,
      delay: 300,
      ease: 'Power1',
      onUpdate: (): void => {
        this.bg.setSize(this.bg.width, this.bg.height--);
        this.bg.setDisplaySize(this.bg.width, this.bg.height);
        if (this.elements.some(el => el?.alpha !== 0)) this.elements.forEach(el => { el?.setAlpha(0) });
      },
      onComplete: (): void => {
        if (this.isVisibile && this.status === 1) this.listButton?.setVisible(true);
        this.elements.forEach(el => { el?.destroy() });
        this.fadeOutListButton();
        this.nineSliceAnimationFix();
        this.closingAniIsPlaying = false;
      }
    });

    this.scene.time.addEvent({
      delay: 800,
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
    } else if (!this.closingAniIsPlaying) this.closeTaskListAnimation();
  }

  private moveListButtonTop(): void {
    const anim: Phaser.Tweens.Tween = this.scene.tweens.add({
      onStart: (): void => {  this.listButton.setAlpha(0) },
      targets: [ this.listButton ],
      y: `-=${this.listButtondY}`,
      duration: 500,
      ease: 'Power1',
      onUpdate: (): void => {
        this.listButton.setAlpha(0);
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
      onComplete: (): void => { this.fadeOutListButton() }
    });
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
    if (this.listTime > 3 && !this.closingAniIsPlaying) this.closeTaskListAnimation();
  }

  private hideTaskListElements(): void {
    if (!this.closingAniIsPlaying) this.closeTaskListAnimation();
    this.elements.forEach(el => el?.setVisible(false));
  }

  private setMainPositionListButton(): void {
    this.listButton.setFlipY(false);
    this.fadeOutListButton();
    this.listButton.setPosition(this.bg.getTopRight().x, this.bg.getTopRight().y);
  }

  private nineSliceAnimationFix(): void {
    this.scene.add.text(0,0,'').destroy();
  }
}
