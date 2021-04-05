import Resource from './Resource';
import Sheep from '../../scenes/Sheep/Main';

export default class Wool extends Resource {
  public scene: Sheep;
  constructor(scene: Sheep, { x , y }: Iposition, type: number) {
    super(scene, x, y, `sheep-wool${type}`);

  }
  static create(scene: Sheep, position: Iposition, type: number, target: Iposition): Wool {
    const newWool = new Wool(scene, position, type);
    newWool.flyToPoint(target);
    return newWool;
  }
}