import Resource from './Resource';
import Cow from '../../scenes/Cow/Main';

export default class Milk extends Resource {
  public scene: Cow;
  constructor(scene: Cow, { x , y }: Iposition) {
    super(scene, x, y, `cow-milk`);

  }
  static create(scene: Cow, position: Iposition, target: Iposition): Milk {
    const newMilk = new Milk(scene, position);
    newMilk.flyToPoint(target);
    return newMilk;
  }
}