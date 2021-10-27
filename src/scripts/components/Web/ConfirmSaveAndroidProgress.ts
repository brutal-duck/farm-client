import Boot from "../../scenes/Boot";
import LocalStorage from './../../libs/LocalStorage';

export default class ConfirmSaveAndroidProgress {
  public scene: Boot;
  private hashUser: IcheckAndroidUserData;
  private servicesUser: IcheckAndroidUserData;
  private servicesData: IgooglePlayServicesData;

  constructor(scene: Boot) {
    this.scene = scene;
    this.hashUser = this.scene.androidData.hashUser;
    this.servicesData = this.scene.androidData.servicesData;
    this.servicesUser = this.scene.androidData.servicesUser;
    this.create();
  }

  private create(): void {
    const headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '37px',
      fontFamily: 'Shadow',
      color: '#F9D48D',
    };

    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '25px',
      fontFamily: 'Bip',
      color: '#925C28',
      align: 'left',
      wordWrap: { width: 450 },
    };

    const bg = this.scene.add.tileSprite(this.scene.cameras.main.centerX, this.scene.cameras.main.centerY - 20, 614, 320, 'mid-syst');
    const bgGeom = bg.getBounds();
    const header = this.scene.add.sprite(bgGeom.centerX - 1, bgGeom.top + 14, 'header-syst').setOrigin(0.5, 1);
    this.scene.add.sprite(bgGeom.centerX - 1, bgGeom.bottom - 1, 'bottom-syst').setOrigin(0.5, 0);
    const title = this.scene.add.text(bgGeom.centerX, header.getBounds().centerY - 6, this.scene.state.lang.saveProgress, headerTextStyle).setOrigin(0.5);
    const text0 = this.scene.add.text(bgGeom.centerX, header.getBounds().bottom + 15, this.scene.state.lang.foundManySave, textStyle).setOrigin(0.5, 0);

    const str1 = this.scene.state.lang.androidFoundUser.replace('$1', String(this.hashUser.sheepPart)).replace('$2', String(this.hashUser.diamonds));
    const str2 = this.scene.state.lang.androidFoundUser.replace('$1', String(this.servicesUser.sheepPart)).replace('$2', String(this.servicesUser.diamonds));
    
    const text1 = this.scene.add.text(bgGeom.centerX - 15, text0.getBounds().bottom + 5, str1, textStyle).setOrigin(0.5, 0);
    const text2 = this.scene.add.text(bgGeom.centerX - 15, text1.getBounds().bottom + 5, str2, textStyle).setOrigin(0.5, 0);
    
    const diamond1 = this.scene.add.sprite(text1.getBounds().right + 5, text1.getBounds().centerY, 'diamond-lil').setOrigin(0, 0.5);
    const diamond2 = this.scene.add.sprite(text2.getBounds().right + 5, text2.getBounds().centerY, 'diamond-lil').setOrigin(0, 0.5);
    const text4 = this.scene.add.text(bgGeom.centerX, text2.getBounds().bottom + 15, this.scene.state.lang.setAction, textStyle).setFontFamily('Shadow').setOrigin(0.5, 0);

    const btnStr1 = `${this.scene.state.lang.saveAndroidProgress} - ${this.hashUser.sheepPart} ${this.scene.state.lang.part}, ${this.hashUser.diamonds}`
    const btnStr2 = `${this.scene.state.lang.saveAndroidProgress} - ${this.servicesUser.sheepPart} ${this.scene.state.lang.part}, ${this.servicesUser.diamonds}`
    const greenBtn = this.scene.bigButton('green', 'center', 30 + 30, btnStr1);
    const redBtn = this.scene.bigButton('yellow', 'center', 30 + 110, btnStr2);

    const greenTitleGeom: Phaser.Geom.Rectangle = greenBtn.title.getBounds();
    const redTitleGeom: Phaser.Geom.Rectangle = redBtn.title.getBounds();
    const btnDiamond1 = this.scene.add.sprite(greenTitleGeom.right + 5, greenTitleGeom.centerY, 'diamond-lil').setOrigin(0, 0.5);
    const btnDiamond2 = this.scene.add.sprite(redTitleGeom.right + 5, redTitleGeom.centerY, 'diamond-lil').setOrigin(0, 0.5);
    greenBtn.img1 = btnDiamond1;
    redBtn.img1 = btnDiamond2;
    this.scene.clickModalBtn(greenBtn, (): void => {
      this.updateUser();
    });

    this.scene.clickModalBtn(redBtn, (): void => { 
      this.clearHash();
    });
  }

  private updateUser(): void {
    this.scene.updateAndroidUser(this.servicesData).then(() => {
      LocalStorage.clear();
      this.scene.postCheckUser(this.servicesData.playerId, true);
      this.scene.children.destroy();
    });
  }

  private clearHash(): void {
    LocalStorage.clear();
    this.scene.children.destroy();
    this.scene.postCheckUser(this.servicesData.playerId, true);
  }
}