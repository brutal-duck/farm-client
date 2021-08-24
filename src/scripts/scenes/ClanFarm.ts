import LogoManager, { Icon } from "../components/Utils/LogoManager";
import { shortNum, loadingModal } from "../general/basic";
import { click, clickButton, clickModalBtn } from "../general/clicks";
import ClanCooldownBuilding from './../components/clan/ClanCooldownBuilding';
import ClanFlagPole from './../components/clan/ClanFlagPole';

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
  private mainCooldownSprite: ClanCooldownBuilding;
  private sheepCooldownSprite: ClanCooldownBuilding;
  private chickenCooldownSprite: ClanCooldownBuilding;
  private cowCooldownSprite: ClanCooldownBuilding;
  private clanLevelText: Phaser.GameObjects.Text
  private sheepLevelText: Phaser.GameObjects.Text;
  private chickenLevelText: Phaser.GameObjects.Text;
  private cowLevelText: Phaser.GameObjects.Text;
  private diamondCountText: Phaser.GameObjects.Text;
  private sheepCountText: Phaser.GameObjects.Text;
  private chickenCountText: Phaser.GameObjects.Text;
  private cowCountText: Phaser.GameObjects.Text;
  private playerCountText: Phaser.GameObjects.Text;
  private currentIcon: IconfigIcon;

  constructor() {
    super('ClanFarm');
  }

  public click = click.bind(this);
  public clickModalBtn = clickModalBtn.bind(this);
  public clickButton = clickButton.bind(this);
  private loadingModal = loadingModal.bind(this);

  public preload(): void {
    this.cameras.main.setBackgroundColor('rgba(0, 0, 0, 0.5)');
    this.loadingModal();
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

    const backBtn: Phaser.GameObjects.Sprite = this.add.sprite(658, 60, 'close-window-btn');

    this.clickButton(backBtn, () => {
      this.game.scene.keys[this.state.farm].scrolling.downHandler();
      this.game.scene.keys[this.state.farm].scrolling.enabled = true;
      this.game.scene.keys[this.state.farm].scrolling.wheel = true;
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
        offsetX: 2,
        offsetY: 2, 
        color: '#364f7e',
        blur: 2,
        fill: true,
      },
    };
    const pos: Iposition = {
      x: 70,
      y: 65,
    };
    this.currentIcon = this.state.clan.avatar;
    this.icon = LogoManager.createIcon(this, pos.x + 15, pos.y + 7, this.currentIcon).setScale(0.439);

    this.nameText = this.add.text(pos.x + 260, pos.y - 40, this.state.clan.name, textStyle).setOrigin(0.5);
    if (this.nameText.displayWidth > 380) {
      const multiply: number = this.nameText.displayWidth / 380;
      this.nameText.setFontSize(parseInt(textStyle.fontSize) / multiply);
    }

    const limit: number = this.state.clan.main.cooldown > 0 ? this.state.clan.limit - 1 : this.state.clan.limit;
    const countText: string = `${this.state.clan.users.length}/${limit}`
    this.playerCountText = this.add.text(pos.x + 130, pos.y + 18, countText, textStyle).setFontSize(36).setOrigin(0, 0.5);

    const diamondSprite: Phaser.GameObjects.Sprite = this.add.sprite(pos.x + 270, pos.y + 5, 'diamond').setScale(0.10);
    this.diamondCountText = this.add.text(pos.x + 285, pos.y + 5, String(this.state.clan.diamond.count), textStyle).setOrigin(0, 0.5);

    const sheepSprite: Phaser.GameObjects.Sprite = this.add.sprite(pos.x + 270, pos.y + 35, 'sheepCoin').setScale(0.10);
    this.sheepCountText = this.add.text(pos.x + 285, pos.y + 35, shortNum(this.state.clan.sheep.money), textStyle).setOrigin(0, 0.5);

    const chickenSprite: Phaser.GameObjects.Sprite = this.add.sprite(pos.x + 390, pos.y + 5, 'chickenCoin').setScale(0.10);
    this.chickenCountText = this.add.text(pos.x + 405, pos.y + 5, shortNum(this.state.clan.chicken.money), textStyle).setOrigin(0, 0.5);

    const cowSprite: Phaser.GameObjects.Sprite = this.add.sprite(pos.x + 390, pos.y + 35, 'cowCoin').setScale(0.10);
    this.cowCountText = this.add.text(pos.x + 405, pos.y + 35, shortNum(this.state.clan.cow.money), textStyle).setOrigin(0, 0.5);
    
  }

  private createMain(): void {
    const pos: Iposition = {
      x: 390,
      y: 300,
    };
    const zone = this.add.zone(pos.x, pos.y, 200, 260).setDropZone(undefined, () => {});
    const textLevel: string = this.state.clan.main.cooldown > 0 ? String(this.state.clan.main.level - 1) : String(this.state.clan.main.level);
    this.clanLevelText = this.add.text(pos.x + 4, pos.y + 60, textLevel, levelTextStyle).setOrigin(0.5);
    new ClanFlagPole(this, {x: pos.x + 5, y: pos.y - 110}).setDepth(2);
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
      y: 490,
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
      y: 320,
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
      x: 220,
      y: 530
    };
    const zone = this.add.zone(pos.x, pos.y, 180, 180).setDropZone(undefined, () => {});

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
    new ClanFlagPole(this, { x: farmPosition.x + 59, y: farmPosition.y - 130 }).setDepth(2);

    this.click(zone, () => {
      if (this.state.clan.sheep.cooldown <= 0) {
        this.state.modal = {
          type: 18,
          clanWindowType: 5,
          message: 'sheep',
        };
      } else {
        this.state.modal = {
          type: 18,
          clanWindowType: 6,
          message: 'sheep',
        };
      }
      this.scene.launch('Modal', this.state);
    });
  }

  private createChicken(): void {
    const farmPosition: Iposition = { x: 580, y: 990 };
    const sprite = this.add.sprite(farmPosition.x, farmPosition.y, 'clan-chicken-farm');
    const textLevel: string = this.state.clan.chicken.cooldown > 0 ? String(this.state.clan.chicken.level - 1) : String(this.state.clan.chicken.level);
    this.chickenLevelText = this.add.text(farmPosition.x - 106, farmPosition.y + 20, textLevel, levelTextStyle).setOrigin(0.5);
    new ClanFlagPole(this, { x: farmPosition.x + 2, y: farmPosition.y - 160 }).setDepth(2);
    this.click(sprite, () => {
      if (this.state.clan.chicken.cooldown <= 0) {
        this.state.modal = {
          type: 18,
          clanWindowType: 5,
          message: 'chicken',
        };
      } else {
        this.state.modal = {
          type: 18,
          clanWindowType: 6,
          message: 'chicken',
        };
      }
      this.scene.launch('Modal', this.state);
    });
  }

  private createCow(): void {
    const farmPosition: Iposition = { x: 150, y: 1000 };
    const width: number = 300;
    const height: number = 250;
    
    const textLevel: string = this.state.clan.cow.cooldown > 0 ? String(this.state.clan.cow.level - 1) : String(this.state.clan.cow.level);
    this.cowLevelText = this.add.text(farmPosition.x + 167, farmPosition.y + 32, textLevel, levelTextStyle).setOrigin(0.5);
    new ClanFlagPole(this, { x: farmPosition.x + 88, y: farmPosition.y - 140 }).setDepth(2);

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
      } else {
        this.state.modal = {
          type: 18,
          clanWindowType: 6,
          message: 'cow',
        };
      }
      this.scene.launch('Modal', this.state);
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
    this.updateCooldowns();
    this.updateLevelText();
    this.updateCountsText();
    this.updatePlayerCount();
    this.updateClanName();
    this.updateClanIcon();
  }

  private updateCountsText(): void {
    if (this.diamondCountText.active && this.diamondCountText?.text !== String(this.state.clan.diamond.count)) {
      this.diamondCountText.setText(String(this.state.clan.diamond.count));
    }
    if (this.sheepCountText.active && this.sheepCountText?.text !== shortNum(this.state.clan.sheep.money)) {
      this.sheepCountText.setText(shortNum(this.state.clan.sheep.money));
    }
    if (this.chickenCountText.active && this.chickenCountText?.text !== shortNum(this.state.clan.chicken.money)) {
      this.chickenCountText.setText(shortNum(this.state.clan.chicken.money));
    }
    if (this.cowCountText.active && this.cowCountText?.text !== shortNum(this.state.clan.cow.money)) {
      this.cowCountText.setText(shortNum(this.state.clan.cow.money));
    }
  }

  private updateCooldowns(): void {
    if (this.state.clan.main.cooldown > 0 && !this.mainCooldownSprite?.active) {
      const pos: Iposition = { x: 395, y: 450 };
      this.mainCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.main, 'main');
      this.click(this.mainCooldownSprite, () => {
        this.state.modal = {
          type: 18,
          clanWindowType: 6,
          message: 'main',
        };
        this.scene.launch('Modal',  this.state);
      })
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

  private updateLevelText(): void {
    if (this.state.clan.main.cooldown <= 0 && this.clanLevelText?.active) {
      const text: string = String(this.state.clan.main.level);
      if (text !== this.clanLevelText.text) this.clanLevelText.setText(text);
    }
    if (this.state.clan.sheep.cooldown <= 0 && this.sheepLevelText?.active) {
      const text: string = String(this.state.clan.sheep.level);
      if (text !== this.sheepLevelText.text) this.sheepLevelText.setText(text);
    }
    if (this.state.clan.chicken.cooldown <= 0 && this.chickenLevelText?.active) {
      const text: string = String(this.state.clan.chicken.level);
      if (text !== this.chickenLevelText.text) this.chickenLevelText.setText(text);
    }
    if (this.state.clan.cow.cooldown <= 0 && this.cowLevelText?.active) {
      const text: string = String(this.state.clan.cow.level);
      if (text !== this.cowLevelText.text) this.cowLevelText.setText(text);
    }
  }
  private updatePlayerCount(): void {
    const limit: number = this.state.clan.main.cooldown > 0 ? this.state.clan.limit - 1 : this.state.clan.limit;
    const countText: string = `${this.state.clan.users.length}/${limit}`
    if (countText !== this.playerCountText.text) this.playerCountText.setText(countText);
  }

  private updateClanName(): void {
    if (this.nameText.text !== this.state.clan.name) {
      this.nameText.setText(this.state.clan.name);
      if (this.nameText.displayWidth > 380) {
        const multiply: number = this.nameText.displayWidth / 380;
        this.nameText.setFontSize(parseInt(this.nameText.style.fontSize) / multiply);
      }
    }
  }

  private updateClanIcon(): void {
    if (JSON.stringify(this.currentIcon) !== JSON.stringify(this.state.clan.avatar)) {
      this.currentIcon = this.state.clan.avatar;
      this.icon.destroy();
      const pos: Iposition = {
        x: 85,
        y: 72,
      };
      this.icon = LogoManager.createIcon(this, pos.x, pos.y, this.currentIcon).setScale(0.439);
    }
  }
};

