import Resource from './Resource';
import Cow from '../../scenes/Cow/Main';

export default class Milk extends Resource {
  public scene: Cow;
  constructor(scene: Cow, { x , y }: Iposition, type: number) {
    super(scene, x, y, `cow-milk${type}`);

  }
  static create(scene: Cow, position: Iposition, type: number, target: Iposition): Milk {
    const newMilk = new Milk(scene, position, type);
    newMilk.flyToPoint(target);
    return newMilk;
  }
}