import SheepBars from '../../scenes/Sheep/SheepBars';
import ChickenBars from '../../scenes/Chicken/ChickenBars';
import CowBars from '../../scenes/Cow/CowBars';

/**
  *  Планка заданий в барах сцен    
  * 
  *  Конструктор принимает:
  *1. объект сцены; 
*/

// плашка заданий
export default class TaskBoard extends Phaser.GameObjects.TileSprite{

  public scene: SheepBars | ChickenBars | CowBars;
  public isVisibile: boolean;
  public status: number;
  public taskStatus: number;
  public currentTaskProgress: number;
  public taskIcon: Phaser.GameObjects.Sprite;
  public tileSprite: Phaser.GameObjects.TileSprite;
  public star: Phaser.GameObjects.Sprite;
  public doneText: Phaser.GameObjects.Text;
  public taskText: Phaser.GameObjects.Text;
  public doneIcon: Phaser.GameObjects.Sprite;
  public done: Phaser.GameObjects.Sprite;
  public takeText: Phaser.GameObjects.Text;
  public award: Phaser.GameObjects.Text;
  public awardBg: Phaser.GameObjects.Graphics;
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
  public listButton: Phaser.GameObjects.TileSprite;
  public listButtonText: Phaser.GameObjects.Text;
  public listIsOpen: boolean = false;
  public listButtondY: number = 0;

  constructor(
    scene: SheepBars | ChickenBars | CowBars
  ) {
    super(scene, 0, 0, 0, 0, 'white-pixel')
    this.scene = scene;
    this.isVisibile = false;
    this.init();
  }

  static create(scene: SheepBars | ChickenBars | CowBars): TaskBoard {
    return new TaskBoard(scene);
  }

  private init(): void {
    this.scene.add.existing(this);
    this.setOrigin(0);

    this.positionY = this.scene.height;
    this.createElements();
  }

  private createElements(): void {
    this.taskIcon = this.scene.add.sprite(0, 0, ' ')
      .setVisible(false);

    this.tileSprite = this.scene.add.tileSprite(0, 0, 0, 0, 'modal')
      .setInteractive()
      .setOrigin(0)
      .setVisible(false);

    this.star = this.scene.add.sprite(0, 0, 'star')
      .setVisible(false);

    this.doneText = this.scene.add.text(0, 0, ' ', {
      font: '20px Bip',
      color: '#525252'
    })
      .setDepth(this.scene.height)
      .setOrigin(0, 0.5)
      .setVisible(false);

    this.taskText = this.scene.add.text(0, 0, ' ', { 
      font: '23px Bip',
      color: '#713D1E',
      align: 'left',
      wordWrap: { width: 450 }
    })
      .setDepth(this.scene.height)
      .setOrigin(0, 0)
      .setVisible(false);

    this.doneIcon = this.scene.add.sprite(0, 0, 'completed')
      .setVisible(false);

    this.done = this.scene.add.sprite(0, 0, 'little-button')
      .setDepth(this.scene.height)
      .setVisible(false);

    this.takeText = this.scene.add.text(0, 0, this.scene.state.lang.pickUp, {
      font: '20px Shadow',
      color: '#FFFFFF'
    })
      .setOrigin(0.5, 0.5)
      .setDepth(this.scene.height)
      .setVisible(false);

    this.award = this.scene.add.text(0, 0, ' ', {
      font: '20px Bip',
      color: '#FFFFFF'
    })
      .setDepth(this.scene.height + 1)
      .setOrigin(0, 0.5)
      .setVisible(false);
      
    this.awardBg = this.scene.add.graphics()
      .setDepth(this.scene.height - 1)
      .setVisible(false);

    this.diamond = this.scene.add.sprite(0, 0, ' ')
      .setDepth(this.scene.height)
      .setScale(0.1)
      .setOrigin(0, 0.5)
      .setVisible(false);

    this.doneButton = this.scene.add.sprite(0, 0, 'big-btn-green')
      .setDepth(1)
      .setVisible(false);

    this.doneButtonText = this.scene.add.text(0, 0, this.scene.state.lang.donePart, {
      font: '22px Shadow',
      color: '#FFFFFF'
    })
      .setDepth(1)
      .setOrigin(0.5, 0.5)
      .setVisible(false);
    this.lastPart = this.scene.add.text(0, 0, this.scene.state.lang[this.scene.state.farm.toLowerCase() + 'CompanyDone'], {
      font: '26px Bip',
      color: '#713D1E'
    }).setDepth(1).setOrigin(0.5, 0.5).setVisible(false);

    this.taskProgress = this.scene.add.graphics().setVisible(false);

    this.listButton = this.scene.add.tileSprite(0,0, 0, 0, 'white-pixel').setTint(0xFFEBC5).setOrigin(1).setVisible(false);
    this.listButtonText = this.scene.add.text(0, 0, '^', {
      font: '34px Bip',
      color: '#00000',
    }).setOrigin(1).setVisible(false);
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
    if (this.taskStatus === task.done && this.currentTaskProgress === task.progress && this.taskId === task.id && this.gotAward === task.got_awarded) return;
    else {
      if (this.taskId !== task.id) {
        setter = true;
      }
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
        && stateParts.length === userData.part) {
        this.status = 4;
      }
      this.animation?.remove();
      if (this.status === 3 || this.status === 2) {
        this.setDoneAnim();
      } 
      this.isUpdated = false;   
      
    }
  
    if (!this.isUpdated) {
      this.awardBg?.clear();
      this.taskProgress?.clear();

      if (this.status === 1 && task) {
            
        const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
        
        this.taskText
          .setText(taskData.name)
          .setWordWrapWidth(450);
          
        const taskTextBounds = this.taskText.getBounds();
        this.taskText.setPosition(150, this.scene.height - taskTextBounds.height - 244);
        let count: number = task.count;
  
        if (task.type === 14 && task.count === 0) count = countBreed;
        
        this.doneText
          .setText(this.scene.state.lang.performed + ' ' + task.progress + ' / ' + count)
          .setPosition(150, this.scene.height - 220);
            
        let height: number = 70 + taskTextBounds.height;
        if (height < 110) height = 110;

        this
          .setPosition(30, this.scene.height - 190 - height)
          .setDisplaySize(660, height)
          .setTint(0xFFEBC5);

        this.taskIcon
          .setTexture(taskData.icon)
          .setPosition(88, this.scene.height  - 190 - height / 2)
          .setTint();

        const progress: number = (100 / count * task.progress) * (6.3 / 100) - Math.PI / 2;

        this.star.setPosition(630, this.scene.height - 190 - height / 2);

        this.tileSprite
          .removeAllListeners()
          .setPosition(30, this.scene.height - 190 - height)
          .setDisplaySize(660, height);

        this.scene.click(this.tileSprite, () => {
          this.scene.clickTaskBoard(task);
        });
      
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
          
        this.listButton.setPosition(this.tileSprite.getBounds().right, this.tileSprite.getBounds().top).setDisplaySize(20, 20).setOrigin(1);
        this.listButtonText.setPosition(this.listButton.x, this.listButton.y).setOrigin(1, 0.5);
        this.scene.click(this.listButton, () => {
          this.toggleList();
        });
      } else if (this.status === 2 && task) {
      
        const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
        
        this.taskText
          .setText(taskData.name)
          .setWordWrapWidth(390);
        const taskTextBounds: Phaser.Geom.Rectangle = this.taskText.getBounds();
        this.taskText.setPosition(150, this.scene.height - taskTextBounds.height - 244);
        
        let icon: string = 'diamond';
        let award: number = task.diamonds;
            
        if (this.scene.state.farm === 'Sheep') {     
          let moneyTask: any = this.scene.game.scene.keys['Sheep'].moneyTasks.find(el => el.id === task.id);
          if (moneyTask) {
            award = moneyTask.money;
            icon = 'sheepCoin';
          }
        }
        
        this.award
          .setText(String(award))
          .setPosition(190, this.positionY - 220);

        this.diamond
          .setTexture(icon)
          .setPosition(160, this.positionY - 220);

        const bounds = this.award.getBounds();

        this.awardBg
          .setPosition(bounds.left - 40, bounds.top - 3)
          .fillStyle(0x713D1E, 1)
          .fillRoundedRect(0, 0, bounds.width + 50, bounds.height + 6, 5);
      
        let height: number = 70 + taskTextBounds.height;
        if (height < 110) height = 110;
      
        this
          .setPosition(30, this.positionY - 190 - height)
          .setDisplaySize(660, height)
          .setTint(0xFFEBC5);
        
        this.taskIcon
          .setTexture(taskData.icon)
          .setPosition(88, this.positionY - 190 - height / 2)
          .setTint(0x777777);

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
      
        this.tileSprite
          .removeAllListeners()
          .setPosition(30, this.scene.height - 190 - height)
          .setDisplaySize(660, height);

        this.taskProgress?.clear();
      } else if (this.status === 3 && task) {
        this
          .setPosition(30, this.positionY - 300)
          .setDisplaySize(660, 110)
          .setTint(0xFFEBC5);
      
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
        
        this.tileSprite
          .removeAllListeners()
          .setPosition(30, this.positionY - 300)
          .setDisplaySize(660, 110);

        this.taskProgress?.clear();
      }
          
      if (this.status === 4 && task) {

        this
          .setPosition( 30, this.scene.height - 300)
          .setDisplaySize(660, 110)
          .setTint(0xFFEBC5);
      
        this.lastPart.setPosition(this.scene.cameras.main.centerX, this.scene.height - 245);

        this.tileSprite
          .removeAllListeners()
          .setPosition(30, this.positionY - 300)
          .setDisplaySize(660, 110);

        this.taskProgress?.clear();
      }

      let checkSheepTutor: boolean = true;
      if (this.scene.state.farm === 'Sheep' && this.scene.state.userSheep.tutorial < 100) checkSheepTutor = false;
  
      if ((this.scene.menu.isOpened ||
        this.scene.scene.isActive('Modal') ||
        this.scene.scene.isActive('Tutorial')) &&
        !checkSheepTutor) {
          this.hideAllElement();
      } else if (!this.scene.menu.isOpened &&
        !this.scene.scene.isActive('Modal') &&
        !this.scene.scene.isActive('Tutorial') &&
        checkSheepTutor) {
        if (setter) {
          this.setStartY();
          this.flyInMainBoardAnim();
        }
        this.shownElements();
      }
    }
  }

  private setDoneAnim(): void {
    this.animation = this.scene.tweens.add({
      targets: [
        this, 
        this.taskIcon,
        this.tileSprite,
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
      delay: 500,
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
    this.taskIcon.setY(this.taskIcon.y + dYanim);
    this.tileSprite.setY(this.tileSprite.y + dYanim);
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
    this.listButtonText.setY(this.listButtonText.y + dYanim);
  }

  private flyInMainBoardAnim(): void {
    this.removeButtonsInteractive();
    this.scene.tweens.add({
      duration: 500,
      targets: [
        this, 
        this.taskIcon,
        this.tileSprite,
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
        this.listButtonText
      ],
      alpha: { from: 0, to: 1 },
      y: '-=250',
      ease: 'Power3',
      onComplete: (): void => {
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
    if (height < 110) height = 110;

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
      this.scene.scene.isActive('Tutorial') || this.listIsOpen) &&
      this.isVisibile || !checkSheepTutor && this.isVisibile) {
      this.hideAllElement();
      this.hideListButton();
    } else if (!this.scene.menu.isOpened &&
      !this.scene.scene.isActive('Modal') &&
      !this.scene.scene.isActive('Tutorial') &&
      !this.isVisibile && checkSheepTutor && !this.listIsOpen) {
        this.shownElements();
    } 
  }

  private hideAllElement(): void {
    this.isVisibile = false;
    this.setVisible(false);
    this.taskIcon?.setVisible(false);
    this.tileSprite?.setVisible(false);
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
    this.listButtonText?.setVisible(false);
  }
  private shownElements(): void {
    this.hideAllElement();
    this.isVisibile = true;

    if (this.status === 1) {
      this.setVisible(true);
      this.star?.setVisible(true);
      this.taskIcon?.setVisible(true);
      this.tileSprite?.setVisible(true);
      this.doneText?.setVisible(true);
      this.taskText?.setVisible(true);
      this.taskProgress?.setVisible(true);
      this.listButton?.setVisible(true);
      this.listButtonText?.setVisible(true);
    } else if (this.status === 2) {
      this.setVisible(true);
      this.taskText.setVisible(true);
      this.award.setVisible(true);
      this.diamond.setVisible(true);
      this.awardBg.setVisible(true);
      this.taskIcon.setVisible(true);
      this.done.setVisible(true);
      this.takeText.setVisible(true);
      this.tileSprite.setVisible(true);
    } else if (this.status === 3) {
      this.setVisible(true);
      this.doneButton.setVisible(true);
      this.doneButtonText.setVisible(true);
      this.tileSprite.setVisible(true);
    } else if (this.status === 4) {
      this.setVisible(true);
      this.lastPart.setVisible(true);
      this.tileSprite.setVisible(true);
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
    this.dY = 0;

    for (let i: number = 0; i < tasksParams.length; i += 1) {    
      const task: Itasks = tasksParams[i];
      const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
      const icon: Phaser.GameObjects.Image = this.scene.add.sprite(0, 0, taskData.icon).setVisible(false).setScale(0.9);
      this.dY += (icon.height + 20);
    }
    this.listButtondY = this.dY - 105;
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

    let last: boolean = false;
    for (let i: number = 0; i < tasksParams.length; i += 1) {    
      const task: Itasks = tasksParams[i];
      const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
      if (i === tasksParams.length - 1) last = true;
      this.createTaskListElement(task, taskData,  last);
    }
  }

  private createTaskListElement(task: Itasks, taskData: ItaskData, last: boolean): void {
    let icon: Phaser.GameObjects.Image = this.scene.add.sprite(88, this.positionY - 250, taskData.icon).setDepth(1).setScale(0.9).setAlpha(0);
    let text: Phaser.GameObjects.Text = this.scene.add.text(icon.getBounds().right + 20, this.positionY - 250, taskData.name, {
      font: '24px Bip',
      color: '#944000',
      align: 'left',
      wordWrap: { width: 460 }
    }).setDepth(1).setOrigin(0, 0.5).setAlpha(0);
    let height = icon.height + 20;

    const bgTile: Phaser.GameObjects.TileSprite = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.positionY - 250, 660, height, 'white-pixel');
    bgTile.setTint(0xFFEBC5).setInteractive();
    let lineTile: Phaser.GameObjects.TileSprite = null;
    if (!last) {
      lineTile = this.scene.add.tileSprite(this.scene.cameras.main.centerX, bgTile.y + bgTile.height / 2, 640, 3, 'white-pixel').setDepth(1).setAlpha(0);
      lineTile.setTint(0x858585);
    }

    let completed: Phaser.GameObjects.Sprite = null;
    if (task.done === 1 && task.got_awarded === 1) {
      icon.setTint(0x777777).setAlpha(0);
      completed = this.scene.add.sprite(icon.x, icon.y, 'completed').setDepth(1).setTint(0xc0c0c0).setOrigin(0.5, 0.5).setAlpha(0);
      text.setColor('#494949').setAlpha(0);
    }    
    this.dY -= (height);
    console.log(this.dY);
    const targets: any[] = [ icon, text, lineTile, completed,  bgTile ];
    this.taskListElements = [...this.taskListElements, targets];
    this.openTaskListAnimation(targets)
  }

  private openTaskListAnimation(targets: any[]): void {
    let target: any[] = [...targets]; 
    const timeline: Phaser.Tweens.Timeline = this.scene.tweens.timeline();
    timeline.add({
      targets: targets,
      duration: 700,
      y: `-=${this.dY}`,
      ease: 'Power1', 
    });
    target.pop();
    timeline.add({
      targets: target,
      alpha: { from: 0, to: 1},
      duration: 300,
    });
    timeline.play();
    
  }

  private closeTaskListAnimation(): void {
    this.taskListElements.reverse();
    this.taskListElements.forEach((array: any[], index)=> {
      const timeline: Phaser.Tweens.Timeline = this.scene.tweens.timeline();
      const targets = [...array];
      this.dY = (array[0].height + 20) * index; 
      targets.pop();
      timeline.add({
        targets: targets,
        alpha: { from: 1, to: 0},
        duration: 300,
      });
      timeline.add({
        targets: array,
        duration: 700,
        y: `+=${this.dY}`,
        ease: 'Power1', 
        onComplete: (): void => {
          console.log('complete')
          array.forEach(el => {
            el?.destroy();
          })
        }
      });
      timeline.play();
    });
    this.scene.time.addEvent({
      delay: 300,
      callback: (): void => {
        this.moveListButtonButtom();
      }
    });
    this.scene.time.addEvent({
      delay: 950,
      callback: (): void => {
        this.listIsOpen = false;
      }
    })
  }
  
  private toggleList(): void {
    if (!this.listIsOpen) {
      this.listIsOpen = true;
      this.listButtonText.setFlipY(true);
      this.openAllTasksWindow();
    } else {
      this.listButtonText.setFlipY(false);
      this.closeTaskListAnimation();
    }
  }

  private moveListButtonTop(): void {
    this.scene.tweens.add({
      targets: [ this.listButton, this.listButtonText ],
      y: `-=${this.listButtondY}`,
      duration: 700,
      ease: 'Power1',
    })
  }

  private moveListButtonButtom(): void {
    this.scene.tweens.add({
      targets: [ this.listButton, this.listButtonText ],
      y: `+=${this.listButtondY}`,
      duration: 700,
      ease: 'Power1',
    })
  }
}
