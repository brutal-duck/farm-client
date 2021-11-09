import Bars from '../../components/Scenes/BarsScene';
import Chicken from './Main';

class ChickenBars extends Bars {
  public mainScene: Chicken;

  constructor() {
    super('Chicken');
  }
  
  public init(state: Istate): void {
    super.init(state);  
  }
}

export default ChickenBars;
