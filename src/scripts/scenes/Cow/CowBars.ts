import Bars from '../../components/Scenes/BarsScene';
import Cow from './Main';

class CowBars extends Bars {
  public mainScene: Cow;

  constructor() {
    super('Cow');
  }
  
  public init(state: Istate): void {
    super.init(state);  
  }
}

export default CowBars;
