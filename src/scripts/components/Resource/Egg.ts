import Resource from "./Resource";
import Chicken from '../../scenes/Chicken/Main';

export default class Egg extends Resource {
  public scene: Chicken;
  private isClicked: boolean;
  public timeout: number;
  public _id: string;
  public animalType: number;
  
  constructor(scene: Chicken, { x , y, type, _id }: IchickenEgg) {
    super(scene, x, y, `chicken-egg${type}`);
    this.isClicked = false;
    this.timeout = 0;
    this.type = String(type);
    this._id = _id;
    this.animalType = type;
    this.setEventClick();
  }

  static create(scene: Chicken, egg: IchickenEgg): Egg {
    const newEgg = new Egg(scene, egg);
    newEgg.scene.eggs.add(newEgg);
    return newEgg;
  }

  public setEventClick(): void {
    this.scene.click(this, () => {
      if (!this.isClicked) {
        this.isClicked = true;
        let manualСollect: boolean = false;
        if (Number(this.animalType) !== 0) manualСollect = true;
        this.scene.collectEgg(this, manualСollect);
      }
    });
  }
}