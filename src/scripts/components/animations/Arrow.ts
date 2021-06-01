import Sheep from '../../scenes/Sheep/Main';
import SheepBars from '../../scenes/Sheep/SheepBars';
import Tutorial from '../../scenes/Tutorial';
import Shop from '../../scenes/Modal/Shop/Main';
import Territory from './../Territories/Territory';
/**
  *  Конструктор принимает:
  ** Объект сцены, состояние(номер типа) и необязательный параметр позиции.
  * 
  *1	Туториал на кнопку покупки овцы в баре  
  *2	Туториал на территорию 2 / 3  
  *3	Туториал на территорию 2 / 2  
  *4	Туториал на стоячую овцу  
  *5	Туториал на кнопку покупки овцы в баре  
  *6	Туториал на землю 2 / 1  
  *7	Тутор на кнопку подстригателя в баре  
  *8	Тутор на кнопку забрать в магазине  
  *9	Задание с продажей шерсти из хранилища  
  *10	Тутор стрелка на покупку территории в середину  
  *11	Первый этап туториала стадного буста  
  *12	Второй этап туториала стадного буста  
  *13	Первый этап туториала комбикорма  
  *14	Второй этап туториала комбикорма  
  *15	Туториал ивента на покупку единорога  
  *16	Туториал ивента на покупку единорога  
  *17	Тутор стрелка на кнопку карты в барах для начала ивента  
  *18	Стрелка на подстригателя  
  *19 Стрелка на фабрику
*/

export default class Arrow extends Phaser.GameObjects.Sprite {
    
  public scene: any;
  public position: Iposition;
  public state: number;
  constructor(
    scene: Sheep | SheepBars | Shop | Tutorial,
    state: number, 
    position?: Iposition | Phaser.GameObjects.Sprite,
  ) {
    super(scene, 0, 0, 'arrow')
    this.scene = scene;
    this.init(state, position);
    this.type = 'Arrow'
  }
  
  static generate(scene: Sheep | SheepBars | Shop | Tutorial, state: number, position?: Iposition | Phaser.GameObjects.Sprite): Arrow {
    return new Arrow(scene, state, position);
  }

  public init(state: number, position: Iposition): void {
    this.state = state;
    this.position = position;
    this.scene.add.existing(this);
    this.create();
  }
  
  public create(): this {
    switch (this.state) {
      case 1:
        this.x = 82 + 70 + this.width / 2;
        this.y = Number(this.scene.game.config.height) - 92;
        this.setAngle(180);
        this.fadeIn();
        this.horizontalAnim();
        break;
      case 2:
        this.x = 600;
        this.y = 600 - 150 - this.height;
        this.setAngle(90);
        this.fadeIn();
        this.verticalAnim();
        break;
      case 3:
        this.x = 360;
        this.y = 600 - 150 - this.height;
        this.setAngle(90);
        this.fadeIn();
        this.verticalAnim();
        break;
      case 4:
        this.x = this.position.x;
        this.y = this.position.x - 60 - this.height / 2;
        this.setAngle(90);
        this.verticalAnim();
        break;
      case 5:
        this.x = 82 + 70 + this.width / 2;
        this.y = Number(this.scene.game.config.height) - 92;
        this.setAngle(180);
        this.fadeIn();
        this.horizontalAnim();
        break;  
      case 6:
        this.x = 120;
        this.y = 600 - this.height - 150;
        this.setAngle(90);
        this.fadeIn();
        this.verticalAnim();
        break;  
      case 7:
        this.x = 290 - 10 + this.width / 2;
        this.y = Number(this.scene.game.config.height) - 92;
        this.setAngle(180);
        this.fadeIn();
        this.horizontalAnim();
        break; 
      case 8:
        this.x = 330 - 150 - this.width / 2;
        this.y = Number(this.scene.game.config.height) + 100;
        this.horizontalAnim();
        break; 
      case 9:
        this.x = this.position.x;
        this.y = this.position.y - 120 - this.height / 2;
        this.setAngle(90);
        this.verticalAnim();
        break; 
      case 10:
        this.x = this.position.x;
        this.y = this.position.y - 180 - this.height / 2;
        this.setAngle(90);
        this.verticalAnim();
        break;
      case 11: 
        this.x = 372 + 70 + this.width / 2;
        this.y = Number(this.scene.game.config.height) - 92;
        this.setAngle(180);
        this.fadeIn();
        this.horizontalAnim();
        break;
      case 12: 
        this.x = 455 + 70 + this.width / 2;
        this.y = this.scene.cameras.main.centerY + 120;
        this.setAngle(180);
        this.fadeIn();
        this.horizontalAnim();
        break;
      case 13: 
        this.x = 372 + 70 + this.width / 2;
        this.y = Number(this.scene.game.config.height) - 92;
        this.setAngle(180);
        this.fadeIn();
        this.horizontalAnim();
        break;
      case 14: 
        this.x = 455 + 70 + this.width / 2;
        this.y = this.scene.cameras.main.centerY + 320;
        this.setAngle(180);
        this.fadeIn();
        this.horizontalAnim();
        break;
      case 15: 
        this.x = 82 + 70 + this.width / 2;
        this.y = Number(this.scene.game.config.height) - 92;
        this.setAngle(180);
        this.fadeIn();
        this.horizontalAnim();
        break;
      case 16: 
        this.x = 82 + 70 + this.width / 2;
        this.y = Number(this.scene.game.config.height) - 92;
        this.setAngle(180);
        this.fadeIn();
        this.horizontalAnim();
        break;
      case 17: 
        this.x = 510;
        this.y = Number(this.scene.game.config.height) - 70 - 150 - this.height / 2;
        this.setAngle(90);
        this.verticalAnim();
        break;
      case 18: 
        this.x = 230;
        this.y = Number(this.scene.game.config.height) - 70 - 150 - this.height / 2;
        this.setAngle(90);
        this.verticalAnim();
        break;
      case 19:
        this.x = this.position.x;
        this.y = this.position.y - 180 - this.height / 2;
        this.setAngle(90);
        this.verticalAnim();
      break;
    }

    this.setDepth(this.y * 2);
    return this
  }
  
  private fadeIn(): void {
    this.scene.tweens.add({
      duration: 100,
      alpha: { from: 0, to: 1 },
      targets: this
    });
  }

  private horizontalAnim(): void {
    this.scene.tweens.add({
      duration: 250,
      x:  '+=50',
      targets: this,
      yoyo: true,
      repeat: -1
    });
  }

  private verticalAnim(): void {
    this.scene.tweens.add({
      duration: 250,
      y:  '+=50',
      targets: this,
      yoyo: true,
      repeat: -1
  });
  }

  private checkModalOpen(): boolean {
    return this.scene.scene.isActive('Modal') ;
  }

  private checkTutorialOpen(): boolean {
    return this.scene.scene.isActive('Tutorial');
  }

  private setVisibility(): void {
    switch (this.state) {
      case 9:
      case 10:
        if ((this.checkModalOpen() || this.checkTutorialOpen()) && this.visible) this.setVisible(false);
        else if (!this.checkModalOpen() && !this.checkTutorialOpen() && !this.visible) this.setVisible(true);
      break;
      case 17:
      case 18:
        if (this.checkModalOpen() && this.visible) this.setVisible(false);
        else if (!this.checkModalOpen() && !this.visible) this.setVisible(true);
      break;
      case 19:
        if ((this.checkModalOpen() || this.checkTutorialOpen()) && this.visible) this.setVisible(false);
        else if (!this.checkModalOpen() && !this.checkTutorialOpen() && !this.visible) this.setVisible(true);
      break;
    }
  }

  private checkTaskDone(id: number): boolean {
    const tasks: Itasks[] = this.scene.partTasks();
    const task: Itasks = tasks.find((data: Itasks) => (data.id === id));
    return task.done === 1;
  }

  private checkDestroy(): boolean {
    let result: boolean = false 

    switch (this.state) {
      case 4:
        result = this.scene.state.userSheep.tutorial > 40;
      break;
      case 9:
        result = this.checkTaskDone(127);
      break;
      case 10:
        if (this.scene.state.farm === 'Sheep') {
          result = this.checkTaskDone(5);
        } else if (this.scene.state.farm === 'Cow') {
          result = this.checkTaskDone(137);
        }
      break;
      case 16: 
        result = this.scene.state.user.additionalTutorial.eventTutorial > 30;
      break;
      case 17: 
        result = this.scene.state.user.additionalTutorial.eventTutorial > 0;
      break;
      case 18: 
        result = this.scene.state[`user${this.scene.state.farm}`].collector > 0;
      break;
      case 19: 
        const factoryTerritory: Territory = this.scene.territories.children.entries.find((data: Territory) => data.territoryType === 8);
        result = factoryTerritory.factory.money <= 0 || factoryTerritory.factory.currentProduction !== undefined;
      break;
    }
    return result;
  }

  private newPosition(): void {
    switch (this.state) {
      case 4:
        const sheep: Phaser.GameObjects.Sprite = this.scene?.sheep.children.entries[0];
        if (sheep) this.setPosition(sheep.x, sheep.y - sheep.height - 50);
      break;
    }
  }

  public preUpdate(): void {
    this.setVisibility();    
    if (this.checkDestroy()) this.destroy();
    this.newPosition();
  }

}