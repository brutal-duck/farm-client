import { shortNum } from "../../../general/basic";
import Modal from "../../../scenes/Modal/Modal";

export default class ImproveFactoryWindow {
  public scene: Modal;

  private thisLevel: IfactorySettings
  private nextLevel: IfactorySettings
  private headerStyle: Phaser.Types.GameObjects.Text.TextStyle
  private basicStyle: Phaser.Types.GameObjects.Text.TextStyle
  private improveStyle: Phaser.Types.GameObjects.Text.TextStyle
  private duration: Phaser.GameObjects.Text
  private lot: Phaser.GameObjects.Text
  private efficiency: Phaser.GameObjects.Text

  constructor(scene: Modal) {
    this.scene = scene;
    this.init();
    this.create();
    this.scene.openModal(this.scene.cameras.main);
  }

  private init(): void {
    this.headerStyle = {
      fontSize: '26px',
      fontFamily: 'Shadow',
      color: '#925C28',
      wordWrap: { width: 350 },
      align: 'center',
    };
    this.basicStyle = {
      fontSize: '24px',
      fontFamily: 'Bip',
      color: '#925C28'
    };
    this.improveStyle = {
      fontSize: '24px',
      fontFamily: 'Bip',
      color: '#57A90E'
    };
  }

  private create(): void {
    const factory: string = this.scene.state.lang.factory.replace('$1', this.scene.state.territory.factory.improve);
    this.scene.textHeader.setText(factory);
    
    this.thisLevel = this.scene.state.territory.factory.settings;
    this.nextLevel = this.scene.state.cowSettings.cowFactorySettings.find((data: IfactorySettings) => data.improve === this.scene.state.territory.factory.improve + 1);

    let nextLevelProductId: number = 0;
    for (let i = 2; i < 4; i++) {
      if (this.thisLevel[`production${i}Percent`] <= 0 && this.nextLevel[`production${i}Percent`] > 0) {
        nextLevelProductId = i;
        break;
      }
    }

    if (nextLevelProductId > 0) this.newProductNameText(nextLevelProductId);

    const dY: number = nextLevelProductId > 0 ? 0 : 20;
    
    const nextLevelHeader: string = `${this.scene.state.lang.nextFactory.replace('$1', String(this.nextLevel.improve))}`;
    const header: Phaser.GameObjects.Text = this.scene.add.text(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 110, nextLevelHeader, this.headerStyle).setOrigin(0.5);

    const lotSize: string = `${this.scene.state.lang.lotSize}: ${shortNum(this.thisLevel.lotSize)} ${this.scene.state.lang.litres}`;
    this.lot = this.scene.add.text(125, this.scene.cameras.main.centerY - 60 + dY, lotSize, this.basicStyle);
    
    const time: string = this.thisLevel.processingTime / 60 < 1 ? `${this.thisLevel.processingTime} ${this.scene.state.lang.seconds}`: 
    `${shortNum(this.thisLevel.processingTime / 60)} ${this.scene.state.lang.minutes}`;

    const durationText: string = `${this.scene.state.lang.processingTime}: ${time}`;
    this.duration = this.scene.add.text(125, this.scene.cameras.main.centerY - 20 + dY, durationText, this.basicStyle);

    const efficiencyText: string = `${this.scene.state.lang.efficiency}: ${this.thisLevel.efficiency}%`;
    this.efficiency = this.scene.add.text(125, this.scene.cameras.main.centerY + 20 + dY, efficiencyText, this.basicStyle);

    if (this.nextLevel.processingTime > this.thisLevel.processingTime) this.nextLevelProcessingTimeText();
    if (this.nextLevel.lotSize > this.thisLevel.lotSize) this.nextLevelLotSizeText();
    if (this.nextLevel.efficiency > this.thisLevel.efficiency) this.nextLevelEfficiencyText();

    this.improveBtn(nextLevelProductId);

    if (nextLevelProductId > 0)  this.scene.resizeWindow(320);
    else {
      header.setY(header.y += 20);
      this.scene.resizeWindow(280);
    }
  }


  private newProductNameText(nextLevelProductId: number): void {
    const text: string = `${this.scene.state.lang[`production${nextLevelProductId}`]}`;
    const productText: Phaser.GameObjects.Text = this.scene.add.text(125, this.scene.cameras.main.centerY + 60, `${this.scene.state.lang.newProduct}:`, this.basicStyle);
    this.scene.add.text(productText.getBounds().right + 10, this.scene.cameras.main.centerY + 60, text, this.improveStyle);
  }


  private nextLevelProcessingTimeText(): void {
    const position: Iposition = {
      x: this.duration.getBounds().right + 10,
      y: this.duration.y
    };
    const time: string = (this.nextLevel.processingTime - this.thisLevel.processingTime) / 60 < 1 ? 
    `${(this.nextLevel.processingTime - this.thisLevel.processingTime)} ${this.scene.state.lang.seconds}`: 
    `${shortNum(Math.ceil((this.nextLevel.processingTime - this.thisLevel.processingTime) / 60)) } ${this.scene.state.lang.minutes}`;

    const text: string = `(+${time})`;
    this.scene.add.text(position.x, position.y, text, this.improveStyle);
  }


  private nextLevelLotSizeText(): void {
    const position: Iposition = {
      x: this.lot.getBounds().right + 10,
      y: this.lot.y
    };
    const text: string = `(+${shortNum(this.nextLevel.lotSize - this.thisLevel.lotSize)} ${this.scene.state.lang.litres})`;
    this.scene.add.text(position.x, position.y, text, this.improveStyle);
  }


  private nextLevelEfficiencyText(): void {
    const position: Iposition = {
      x: this.efficiency.getBounds().right + 10,
      y: this.efficiency.y
    };
    const text: string = `(+${shortNum(this.nextLevel.efficiency - this.thisLevel.efficiency)}%)`;
    this.scene.add.text(position.x, position.y, text, this.improveStyle);
  }


  private improveBtn(nextLevelProductId: number): void {
    let icon: string;
    let text: string;
    const btnY: number = nextLevelProductId > 0 ? 150 : 130;

    if (this.scene.state[`user${this.scene.state.farm}`].part >= this.nextLevel.unlock_improve) {
      if (this.nextLevel.improveDiamondPrice) {
        icon = 'diamond';
        text = String(this.nextLevel.improveDiamondPrice);
      } else {
        icon = `cowCoin`;
        text = String(this.nextLevel.improveMoneyPrice);
      }

      const right = {
        icon: icon,
        text: shortNum(text)
      };
      const improve = this.scene.bigButton('green', 'left', btnY, this.scene.state.lang.improve, right);
      this.scene.clickModalBtn(improve, (): void => { this.scene.state.territory.improveFactory(); });

    } else {

      const improve = {
        icon: 'lock',
        text: `${this.scene.state.lang.shortPart} ${this.nextLevel.unlock_improve}`,
      };
      this.scene.bigButton('grey', 'left', btnY, this.scene.state.lang.improve, improve);
      
    }
  }
}