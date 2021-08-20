import LogoManager, { Icon } from "../components/Utils/LogoManager";
import { click, clickModalBtn } from "../general/clicks";
import ClanCooldownBuilding from './../components/clan/ClanCooldownBuilding';

const clanMap: string = require('../../assets/images/clan/map.jpg');
const clanChickenFarm: string = require('../../assets/images/clan/chicken-farm.png');
const clanFlagpole: string = require('../../assets/images/clan/flagpole.png');
const clanCooldownBg: string = require('../../assets/images/clan/cooldown-bg.png');

const levelTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
  fontFamily: 'Shadow',
  fontSize: '30px',
  color: '#FAEA9F'
};
export default class ClanFarm extends Phaser.Scene {
  public state: Istate;
  private bg: Phaser.GameObjects.Sprite;
  private nameText: Phaser.GameObjects.Text;
  private icon: Icon;
  private mainBuildingCooldownSprite: ClanCooldownBuilding;
  private sheepCooldownSprite: ClanCooldownBuilding;
  private chickenCooldownSprite: ClanCooldownBuilding;
  private cowCooldownSprite: ClanCooldownBuilding;
  private clanLevelText: Phaser.GameObjects.Text
  private sheepLevelText: Phaser.GameObjects.Text;
  private chickenLevelText: Phaser.GameObjects.Text;
  private cowLevelText: Phaser.GameObjects.Text;

  constructor() {
    super('ClanFarm');
  }

  public click = click.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);

  public preload(): void {
    this.load.image('clan-map', clanMap);
    this.load.image('clan-chicken-farm', clanChickenFarm);
    this.load.image('clan-flagpole', clanFlagpole);
    this.load.image('clan-cooldown-bg', clanCooldownBg);
  }
  
  public init(state: Istate): void {
    this.state = state;
  }

  public create(): void {
    this.createBg();
    this.createClanInfo();
    this.createMain();
    this.createBank();
    this.createShop();
    this.createClanTask();
    this.createSheep();
    this.createEvent();
    this.createChicken();
    this.createCow();
  }

  private createBg(): void {
    this.bg = this.add.sprite(0, 0, 'clan-map').setOrigin(0).setInteractive();

    const pos: Iposition = {
      x: 630,
      y: 60,
    };
    const zone = this.add.zone(pos.x, pos.y, 50, 50).setDropZone(undefined, () => {});

    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0xFFFF00);
    graphics.strokeRect(
      zone.x - zone.input.hitArea.width / 2, 
      zone.y - zone.input.hitArea.height / 2, 
      zone.input.hitArea.width, 
      zone.input.hitArea.height
      );

    this.click(zone, () => {
      this.scene.stop();
    });
  }

  private createClanInfo(): void {
    const textStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '24px',
      align: 'left',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };
    const pos: Iposition = {
      x: 70,
      y: 65,
    };
    this.icon = LogoManager.createIcon(this, pos.x, pos.y, this.state.clan.avatar).setScale(0.41);
    this.nameText = this.add.text(pos.x + 240, pos.y - 30, this.state.clan.name, textStyle).setOrigin(0.5);
    if (this.nameText.displayWidth > 340) {
      const multiply: number = this.nameText.displayWidth / 340;
      this.nameText.setFontSize(parseInt(textStyle.fontSize) / multiply);
    }
  }

  private createMain(): void {
    const pos: Iposition = {
      x: 390,
      y: 300,
    };
    const zone = this.add.zone(pos.x, pos.y, 200, 240).setDropZone(undefined, () => {});
    const textLevel: string = this.state.clan.mainBuilding.cooldown > 0 ? String(this.state.clan.mainBuilding.level - 1) : String(this.state.clan.mainBuilding.level);
    this.cowLevelText = this.add.text(pos.x, pos.y + 60, textLevel, levelTextStyle).setOrigin(0.5);
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFFFF00);
    // graphics.strokeRect(
    //   zone.x - zone.input.hitArea.width / 2, 
    //   zone.y - zone.input.hitArea.height / 2, 
    //   zone.input.hitArea.width, 
    //   zone.input.hitArea.height
    //   );

    this.click(zone, () => {
      this.state.modal = {
        type: 17,
        clanTabType: 1,
      }
      this.scene.launch('Modal', this.state);
    });
  }

  private createBank(): void {
    const pos: Iposition = {
      x: 595,
      y: 520,
    };
    const zone = this.add.zone(pos.x, pos.y, 160, 200).setDropZone(undefined, () => {});

    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFF0000);
    // graphics.strokeRect(
    //   zone.x - zone.input.hitArea.width / 2, 
    //   zone.y - zone.input.hitArea.height / 2, 
    //   zone.input.hitArea.width, 
    //   zone.input.hitArea.height
    // );

    this.click(zone, () => {
      this.state.modal = {
        type: 19,
        clanTabType: 1,
      };
      this.scene.launch('Modal', this.state);
    });
  }

  private createShop(): void {
    const pos: Iposition = {
      x: 145,
      y: 530,
    };
    const zone = this.add.zone(pos.x, pos.y, 155, 210).setDropZone(undefined, () => {});

    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0x0000ff);
    // graphics.strokeRect(
    //   zone.x - zone.input.hitArea.width / 2, 
    //   zone.y - zone.input.hitArea.height / 2, 
    //   zone.input.hitArea.width, 
    //   zone.input.hitArea.height
    // );

    this.click(zone, () => {
      this.state.modal = {
        type: 2,
        shopType: 1,
      };
      this.scene.launch('Modal', this.state);
    });
  }

  private createClanTask(): void {
    const pos: Iposition = {
      x: 180,
      y: 320
    };
    const zone = this.add.zone(pos.x, pos.y, 150, 210).setDropZone(undefined, () => {});

    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0x00FF00);
    // graphics.strokeRect(
    //   zone.x - zone.input.hitArea.width / 2, 
    //   zone.y - zone.input.hitArea.height / 2, 
    //   zone.input.hitArea.width, 
    //   zone.input.hitArea.height
    // );

    this.click(zone, () => {
      this.state.modal = {
        type: 1,
        sysType: 3,
        height: 150,
        message: 'Ежедневные задания',
      };
      this.scene.launch('Modal', this.state);
    });
  }

  private createSheep(): void {
    const farmPosition: Iposition = { x: 150, y: 750 };
    const width: number = 300;
    const height: number = 240;
    const textLevel: string = this.state.clan.sheep.cooldown > 0 ? String(this.state.clan.sheep.level - 1) : String(this.state.clan.sheep.level);
    this.sheepLevelText = this.add.text(farmPosition.x + 155, farmPosition.y + 38, textLevel, levelTextStyle).setOrigin(0.5);
    const zone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y, width, height).setDropZone(undefined, () => {});
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFaaf00);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    this.click(zone, () => {
      if (this.state.clan.sheep.cooldown <= 0) {
        this.state.modal = {
          type: 18,
          clanWindowType: 5,
          message: 'sheep',
        };
        this.scene.launch('Modal', this.state);
      }
    });
  }

  private createChicken(): void {
    const farmPosition: Iposition = { x: 580, y: 990 };
    const sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'clan-chicken-farm');
    const textLevel: string = this.state.clan.chicken.cooldown > 0 ? String(this.state.clan.chicken.level - 1) : String(this.state.clan.chicken.level);
    this.chickenLevelText = this.add.text(farmPosition.x - 106, farmPosition.y + 20, textLevel, levelTextStyle).setOrigin(0.5);
    this.click(sprite, () => {
      if (this.state.clan.chicken.cooldown <= 0) {
        this.state.modal = {
          type: 18,
          clanWindowType: 5,
          message: 'chicken',
        };
        this.scene.launch('Modal', this.state);
      }
    });
  }

  private createCow(): void {
    const farmPosition: Iposition = { x: 150, y: 1000 };
    const width: number = 300;
    const height: number = 250;
    
    const textLevel: string = this.state.clan.cow.cooldown > 0 ? String(this.state.clan.cow.level - 1) : String(this.state.clan.cow.level);
    this.cowLevelText = this.add.text(farmPosition.x + 167, farmPosition.y + 32, textLevel, levelTextStyle).setOrigin(0.5);
    const zone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y, width, height).setDropZone(undefined, () => {});
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFaccdd);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    this.click(zone, () => {
      if (this.state.clan.cow.cooldown <= 0) {
        this.state.modal = {
          type: 18,
          clanWindowType: 5,
          message: 'cow',
        };
        this.scene.launch('Modal', this.state);
      }
    });
  }

  private createEvent(): void {
    const farmPosition: Iposition = { x: 550, y: 800 };
    const width: number = 300;
    const height: number = 250;
    
    const zone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y, width, height).setDropZone(undefined, () => {});
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0x7F76F3);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    this.click(zone, () => {
      this.state.modal = {
        type: 1,
        sysType: 3,
        height: 150,
        message: 'Ивент типа',
      };
      this.scene.launch('Modal', this.state);
    });
  }

  public update(): void {
    if (this.state.clan.mainBuilding.cooldown > 0 && !this.mainBuildingCooldownSprite?.active) {
      const pos: Iposition = { x: 395, y: 450 };
      this.mainBuildingCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.mainBuilding, 'main');
    }
    if (this.state.clan.sheep.cooldown > 0 && !this.sheepCooldownSprite?.active) {
      const pos: Iposition = { x: 100, y: 860 };
      this.sheepCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.sheep, 'sheep');
    }
    if (this.state.clan.chicken.cooldown > 0 && !this.chickenCooldownSprite?.active) {
      const pos: Iposition = { x: 620, y: 1130 };
      this.chickenCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.chicken, 'chicken');
    }
    if (this.state.clan.cow.cooldown > 0 && !this.cowCooldownSprite?.active) {
      const pos: Iposition = { x: 120, y: 1160 };
      this.cowCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.cow, 'cow');
    }
  }
};
