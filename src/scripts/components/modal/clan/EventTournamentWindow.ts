import axios from 'axios';
import { shortNum } from '../../../general/basic';
import Modal from './../../../scenes/Modal/Modal';
import LogoManager from './../../Utils/LogoManager';
import Sheep from './../../../scenes/Sheep/Main';
import Chicken from './../../../scenes/Chicken/Main';
import Cow from './../../../scenes/Cow/Main';
import Unicorn from './../../../scenes/Event/Unicorns/Main';
import Currency from './../../animations/Currency';
import MoneyAnimation from './../../animations/MoneyAnimation';
import { clanTournamentSettings } from '../../../local/settings';
import BigInteger from './../../../libs/BigInteger';

const FARM_PACKAGE: Array<number> = [1000, 100000, 1000000, 1000000000];
const DIAMOND_PACKAGE: Array<number> = [1, 10, 100, 1000];

export default class EventTournamentWindow extends Phaser.GameObjects.Sprite {
  public scene: Modal;
  private posx: number;
  private posy: number;
  private windowHeight: number;
  private windowWidth: number;
  private bg: Phaser.GameObjects.TileSprite;
  private header: Phaser.GameObjects.Sprite;
  private closeBtn: Phaser.GameObjects.Sprite;
  private headerText: Phaser.GameObjects.Text;
  private footer: Phaser.GameObjects.Sprite;
  private modalElements: Array<Phaser.GameObjects.Sprite | Phaser.GameObjects.TileSprite | Phaser.GameObjects.Text | Phaser.GameObjects.RenderTexture> = [];
  private windowType: number = 1;
  private farm: string;
  private disableTimer: number = 0;
  private packageBtns: Array<{
    btn: Phaser.GameObjects.Sprite, 
    text: Phaser.GameObjects.Text,
  }> = [];
  private donateBtn: Phaser.GameObjects.Sprite;
  private donateBtnText: Phaser.GameObjects.Text;
  private headerTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
    color: '#fffdfa',
    fontFamily: 'Shadow',
    fontSize: '34px',
    align: 'center',
    shadow: {
      offsetX: 1,
      offsetY: 1, 
      color: '#96580e',
      blur: 2,
      fill: true,
    },
    wordWrap: { width: 400, useAdvancedWrap: true },
  };
  private activePackage: number = 0;
  private coinIcon: Phaser.GameObjects.Sprite;
  private currentCountText: Phaser.GameObjects.Text;
  private logElements: Phaser.GameObjects.Group;
  private logs: IclanUserLog[] = [];

  constructor(scene: Modal) {
    super(scene, 0, 0, 'pixel');
    this.scene = scene;
    this.init();
    this.createElements();
  }
  
  private init(): void {
    this.scene.add.existing(this);
    this.posx = this.scene.cameras.main.centerX;
    this.posy = this.scene.cameras.main.centerY + 50;
    this.windowType = this.scene.state.modal.clanTabType || 1;
    this.windowHeight = 620;
    this.windowWidth = 527;
    if (!this.scene.state.clanTournamentData) this.getEventData();
    else this.createElements();
  }

  private getEventData(): void {
    const data: any = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
    };
    axios.post(process.env.API + '/getTournamentUserData', data).then(res => {
      const { data } = res;
      console.log(data)
      if (!data.error) {
        this.scene.state.clanTournamentData = data.data;
        this.createElements();
      }
    });
  }



  private createElements(): void {
    this.createBg();
    this.createHeader();
    this.createFooter();
    this.createCloseTab();
    this.createTabs([1, 2, 3]);
    this.createMainElements();
  }

  private createMainElements(): void {
    switch (this.windowType) {
      case 1:
        this.farm = 'sheep';
        break;
      case 2:
        this.farm = 'chicken';
        break;
      case 3:
        this.farm = 'cow';
        break;
      default:
        break;
    }
    this.createBank();
  }

  private createBg(): void {
    this.bg = this.scene.add.tileSprite(this.posx, this.posy, this.windowWidth, this.windowHeight, 'white-pixel').setTint(0xFF9700);
    this.modalElements.push(this.bg);
  }

  private createHeader(): void {
    this.header = this.scene.add.sprite(this.posx, this.posy - this.windowHeight / 2 + 45 , 'clan-tournament-header').setDepth(2).setOrigin(0.5, 1);
    this.modalElements.push(this.header);
  }

  private createFooter(): void {
    this.footer = this.scene.add.sprite(this.posx, this.posy + this.windowHeight / 2, 'profile-window-footer').setOrigin(0.5, 0);
    this.modalElements.push(this.footer);
  }

  private onCloseBtn(): void {
    this.scene.game.scene.keys[this.scene.state.farm].scrolling.wheel = true;
    this.scene.state.clanTournamentData = null;
    this.scene.scene.stop();
  }

  private createCloseTab(): void {
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    const tab: Phaser.GameObjects.Sprite = this.scene.add.sprite(headerGeom.right - 18, headerGeom.top + 5, 'clan-window-tab-close').setOrigin(1, 1);
    const tabGeom: Phaser.Geom.Rectangle = tab.getBounds();
    const tabIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(tabGeom.centerX + 5, tabGeom.centerY - 5, 'close-window-btn').setOrigin(0.5).setScale(0.9);
    this.scene.clickButtonUp(tab, (): void => { this.onCloseBtn() }, tabIcon);
    this.modalElements.push(tab, tabIcon);
  }

  private createTabs(types: Array<number>): void {
    const tabCount: number = types.length;
    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    let left: number = headerGeom.left + 15;
    const maxWidth: number = 455;
    types.forEach((el: number) => {
      this.createTab({ x: left, y: headerGeom.top + 25 }, tabCount, el)
      left += maxWidth / tabCount;
    });
  }

  private createTab(pos: Iposition, count: number, type: number): void {
    const active: boolean = this.windowType === type;
    const maxWidth: number = 455;
    const tabHeight: number = 104;
    const activeTabHeight: number = 115;
    const slice: number = 30;
    const height: number = active ? activeTabHeight : tabHeight;
    const texture: string = active ? 'clan-window-tab-active' : 'clan-window-tab-disable';
    const tab: Phaser.GameObjects.RenderTexture = this.scene.add.nineslice(pos.x, pos.y, maxWidth / count, height, texture, slice).setOrigin(0, 1);
    const tabGeom: Phaser.Geom.Rectangle = tab.getBounds();
    const textureIcon: string = type === 1 ? 'clan-tab-icon-sheep' : 
    type === 2 ? 'clan-tab-icon-chicken' : 'clan-tab-icon-cow';
    const tabIcon: Phaser.GameObjects.Sprite = this.scene.add.sprite(tabGeom.centerX, tabGeom.centerY - 10, textureIcon);
    
    this.modalElements.push(tab, tabIcon);
    if (!active) {
      this.scene.clickButtonUp(tab, (): void => {
        this.scene.state.modal = {
          type: 20,
          clanTabType: type,
        };
        this.scene.scene.stop('ClanScroll');
        this.scene.scene.restart(this.scene.state);
      }, tabIcon);
    }
  }

  private createBank(): void {
    const titleTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '26px',
      color: '#fffdfa',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    }

    const headerGeom: Phaser.Geom.Rectangle = this.header.getBounds();
    
    const y = this.posy + 120
    this.scene.add.nineslice(this.posx, y, 500, 600, 'modal-square-bg', 10).setOrigin(0.5);
  }

  public preUpdate(time: number, delta: number): void {
    if (this.scene.scene.isActive() && this.scene.state.modal.type === 20) {
      
    }
  }
  
}

class AnimalPlate extends Phaser.GameObjects.Sprite {
  public scene: Modal;
  private breed: number;
  private price: string;
  private count: number;
  public type: string;
  constructor(scene: Modal, x: number, y: number, texture: string, type: string, breed: number) {
    super(scene, x, y, texture);
    this.breed = breed;
    this.init();
    this.create();
  }
  private init(): void {
    const animal: ItournamentAnimal = this.scene.state.clanTournamentData[this.type].find((el: ItournamentAnimal) => el.breed === this.breed);
    this.count = animal ? animal.count : 0;    
  }
  private create(): void {

  }

  private setPrice(): void {
    const setting = clanTournamentSettings.find(el => el.breed === this.breed);
    const coefficient = 7;
    if (setting) this.price = setting.price;

    this.price = BigInteger.add(this.price, BigInteger.divide(BigInteger.multiply(this.price, String(coefficient)), '100'));
  }
}
