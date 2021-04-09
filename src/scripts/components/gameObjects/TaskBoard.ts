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
export default class TaskBoard extends Phaser.GameObjects.Graphics{

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

  constructor(
    scene: SheepBars | ChickenBars | CowBars
  ) {
    super(scene)
    this.scene = scene;
    this.isVisibile = false;
    this.init();
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
    }).setVisible(false);

    this.taskText = this.scene.add.text(0, 0, ' ', { //
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
      .setDepth(this.scene.height)
      .setOrigin(0, 0.5)
      .setVisible(false);
      
    this.awardBg = this.scene.add.graphics()
      .setDepth(this.scene.height - 1)
      .fillStyle(0x713D1E, 1)
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
    this.lastPart = this.scene.add.text(0, 0, ' ', {
      font: '26px Bip',
      color: '#713D1E'
    }).setVisible(false);

    this.taskProgress = this.scene.add.graphics().setVisible(false);
  }

  public init(): void {
    this.scene.add.existing(this);

    this.positionY = this.scene.height;
  }

  static create(scene: SheepBars | ChickenBars | CowBars): TaskBoard {
    return new TaskBoard(scene);
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
      duration: 250,
      yoyo: true,
      y: '-=20',
      repeat: -1,
    });
  }

  private createNewBoardAnim(...args): void {
    const timeline: Phaser.Tweens.Timeline = this.scene.tweens.createTimeline();
    timeline.add({
      targets: args,
      y: '-=180',
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
    timeline.add({
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
      ],
      y: '-=250',
      ease: 'Power1'
    })
    timeline.play();
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
    
    this.createNewBoardAnim(oldTaskBoard, oldTaskIcon, oldDoneIcon, oldTaskText);
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
    
    const task: Itasks = tasks[0];
    
    if (this.taskStatus === task.done && this.currentTaskProgress === task.progress && this.taskId === task.id && this.gotAward === task.got_awarded) return;
    else {
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
      this.isUpdated = false;   
      
    }
  
    if (!this.isUpdated) {
      this.clear();
      this.awardBg?.clear();
      
      if (this.status === 1 && task) {
            
        const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
        this.taskText.setText(taskData.name);
        const taskTextBounds = this.taskText.getBounds();
        this.taskText.setPosition(150, this.scene.height - taskTextBounds.height - 244);
        this.taskText.setVisible(true);
        let count: number = task.count;
  
        if (task.type === 14 && task.count === 0) count = countBreed;
  
        this.doneText = this.scene.add.text(
          150,
          this.scene.height - 220,
          this.scene.state.lang.performed + ' ' + task.progress + ' / ' + count, {
            font: '20px Bip',
            color: '#525252'
          }
        ).setDepth(this.scene.height).setOrigin(0, 0.5).setVisible(true);
            
        let height: number = 70 + taskTextBounds.height;
        if (height < 110) height = 110;

        this.setPosition(30, this.scene.height - 190 - height);
        this.fillStyle(0xFFEBC5, 1);
        this.fillRoundedRect(0, 0, 660, height, 8).setVisible(true);

        this.taskIcon.setTexture(taskData.icon).setPosition(88, this.scene.height  - 190 - height / 2).setVisible(true);

        const progress: number = (100 / count * task.progress) * (6.3 / 100) - Math.PI / 2;
        this.star.setPosition(630, this.scene.height - 190 - height / 2).setVisible(true);
        this.tileSprite.setPosition(30, this.scene.height - 190 - height).setDisplaySize(660, height).setVisible(true);

        this.scene.click(this.tileSprite, () => {
          this.scene.clickTaskBoard(task);
        });
      
        this.taskProgress
          .clear()
          .lineStyle(4, 0xc09245, 1)
          .beginPath()
          .arc(this.taskIcon.x, this.taskIcon.y, 40, 0, Math.PI * 2)
          .strokePath()
          .lineStyle(8, 0x70399f, 1)
          .beginPath()
          .arc(this.taskIcon.x, this.taskIcon.y, 46, Math.PI / -2, progress)
          .strokePath()
          .lineStyle(4, 0xc09245, 1)
          .beginPath()
          .arc(this.taskIcon.x, this.taskIcon.y, 51, 0, Math.PI * 2)
          .strokePath()
          .setDepth(3)
          .setVisible(true);
          
      } else if (this.status === 2 && task) {
      
        const taskData: ItaskData = this.scene.game.scene.keys[this.scene.state.farm].getTaskData(task);
        
        this.taskText.setText(taskData.name);
        const taskTextBounds: Phaser.Geom.Rectangle = this.taskText.getBounds();
        this.taskText
          .setPosition(150, this.scene.height - taskTextBounds.height - 244)
          .setVisible(true);
        
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
          .setPosition(190, this.positionY - 220)
          .setVisible(true);

        this.diamond
          .setTexture('icon')
          .setPosition(160, this.positionY - 220)
          .setVisible(true);

        const bounds = this.award.getBounds();

        this.awardBg
          .setPosition(bounds.left - 40, bounds.top - 3)
          .fillRoundedRect(0, 0, bounds.width + 50, bounds.height + 6, 5)
          .setVisible(true);
      
        let height: number = 70 + taskTextBounds.height;
        if (height < 110) height = 110;
      
        this
          .setPosition(30, this.positionY - 190 - height)
          .fillStyle(0xFFEBC5, 1)
          .fillRoundedRect(0, 0, 660, height, 8)
          .setVisible(true);
        
        this.taskIcon
          .setTexture(taskData.icon)
          .setPosition(88, this.positionY - 190 - height / 2)
          .setVisible(true)
          .setTint(0x777777);

        this.done
          .setPosition(620, this.positionY - 190 - height / 2)
          .setVisible(true);
      
        this.takeText
          .setPosition(620, this.positionY - 193 - height / 2)
          .setVisible(true);
      
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
          .setPosition(30, this.scene.height - 190 - height)
          .setSize(660, height)
          .setVisible(true);

        this.taskProgress?.clear();
      } else if (this.status === 3 && task) {

        this
          .setPosition(30, this.positionY - 300)
          .fillStyle(0xFFEBC5, 1)
          .fillRoundedRect(0, 0, 660, 110, 8)
          .setVisible(true);
      
        this.doneButton
          .setPosition(this.scene.cameras.main.centerX, this.positionY - 245)
          .setVisible(true);

        this.doneButtonText
          .setPosition(this.scene.cameras.main.centerX, this.positionY - 249)
          .setVisible(true);

        this.scene.clickModalBtn({
          btn: this.doneButton,
          title: this.doneButtonText
        }, 
        (): void => {
          this.scene.game.scene.keys[this.scene.state.farm].nextPart();
        });
        
        this.tileSprite
          .setPosition(30, this.positionY - 300)
          .setSize(660, 110)
          .setVisible(true);

        this.taskProgress?.clear();
      }
          
      if (this.status === 4 && task) {
        this.setPosition( 30, this.scene.height - 300);
        this.fillStyle(0xFFEBC5, 1);
        this.fillRoundedRect(0, 0, 660, 110, 8).setVisible(false);
      
        this.lastPart = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.height - 245, this.scene.state.lang[this.scene.state.farm.toLowerCase() + 'CompanyDone'], {
          font: '26px Bip',
          color: '#713D1E'
        }).setDepth(1).setOrigin(0.5, 0.5).setVisible(false);
      
        this.tileSprite = this.scene.add.tileSprite(30, this.scene.height - 300, 660, 110, 'modal')
          .setOrigin(0)
          .setInteractive().setVisible(false);
  
        this.taskProgress?.clear();
      
      }

      let checkSheepTutor: boolean = true;
      if (this.scene.state.farm === 'Sheep' && this.scene.state.userSheep.tutorial < 100) checkSheepTutor = false;
  
      if ((this.scene.menu.isOpened ||
        this.scene.scene.isActive('Modal') ||
        this.scene.scene.isActive('Tutorial')) &&
        !checkSheepTutor) {
        this.setVisibility(false);
      } else if (!this.scene.menu.isOpened &&
        !this.scene.scene.isActive('Modal') &&
        !this.scene.scene.isActive('Tutorial') &&
        checkSheepTutor) {
        this.setVisibility(true);
      }
    }

    this.animation?.remove();
    if ((this.status === 3 || this.status === 2)) {
      this.setDoneAnim();
    } 
  }

  private checkVisibility(): void {
    let checkSheepTutor: boolean = true;
    if (this.scene.state.farm === 'Sheep' && this.scene.state.userSheep.tutorial < 100) checkSheepTutor = false;

    if ((this.scene.menu.isOpened ||
      this.scene.scene.isActive('Modal') ||
      this.scene.scene.isActive('Tutorial')) &&
      this.isVisibile || !checkSheepTutor && this.isVisibile) {
      this.setVisibility(false);
    } else if (!this.scene.menu.isOpened &&
      !this.scene.scene.isActive('Modal') &&
      !this.scene.scene.isActive('Tutorial') &&
      !this.isVisibile && checkSheepTutor) {
      this.setVisibility(true);
    }
  }

  private setVisibility(visible: boolean): void {
    this.isVisibile = visible;
    this.setVisible(visible);
    this.taskIcon?.setVisible(visible);
    this.tileSprite?.setVisible(visible);
    this.star?.setVisible(visible);
    this.doneText?.setVisible(visible);
    this.taskText?.setVisible(visible);
    this.doneIcon?.setVisible(visible);
    this.done?.setVisible(visible);
    this.takeText?.setVisible(visible);
    this.award?.setVisible(visible);
    this.awardBg?.setVisible(visible);
    this.diamond?.setVisible(visible);
    this.doneButton?.setVisible(visible);
    this.doneButtonText?.setVisible(visible);
    this.lastPart?.setVisible(visible);
    this.taskProgress?.setVisible(visible);
  }
}
