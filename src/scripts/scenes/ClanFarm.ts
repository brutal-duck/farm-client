import axios from "axios";
import Notificator from "../components/gameObjects/Notificator";
import LogoManager, { Icon } from "../components/Utils/LogoManager";
import { shortNum, loadingModal, shortTime } from "../general/basic";
import { click, clickButton, clickModalBtn } from "../general/clicks";
import { getNewClanTasks } from "../general/tasks";
import ClanCooldownBuilding from './../components/clan/ClanCooldownBuilding';
import ClanFlagPole from './../components/clan/ClanFlagPole';

const clanMap: string = require('../../assets/images/clan/map.jpg');
const clanChickenFarm: string = require('../../assets/images/clan/chicken-farm.png');
const clanFlagpole: string = require('../../assets/images/clan/flagpole.png');
const clanCooldownBg: string = require('../../assets/images/clan/cooldown-bg.png');
const clanSheepCoin: string = require('../../assets/images/clan/coin-sheep.png');
const clanChickenCoin: string = require('../../assets/images/clan/coin-chicken.png');
const clanCowCoin: string = require('../../assets/images/clan/coin-cow.png');
const clanDiamondCoin: string = require('../../assets/images/clan/coin-diamond.png');
const factorySmoke: string = require('../../assets/images/cow/factory-smoke.png');
const event: string = require('../../assets/images/clan/event.png');
const clanBuilding: string = require('../../assets/images/clan/clan-building.png');


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
  private taskNotificator: Notificator;
  private shopNotificator: Notificator;
  private eventSprite: Phaser.GameObjects.Sprite;
  private eventClanIcon: Icon;
  private eventPlace: Phaser.GameObjects.Text;
  private eventTime: Phaser.GameObjects.Text;
  private eventStartText: Phaser.GameObjects.Text;
  private eventStartTime: Phaser.GameObjects.Text;
  private eventStartBg: Phaser.GameObjects.Graphics;


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
    this.load.image('factory-smoke', factorySmoke);
    this.load.image('clan-sheep-coin', clanSheepCoin);
    this.load.image('clan-chicken-coin', clanChickenCoin);
    this.load.image('clan-cow-coin', clanCowCoin);
    this.load.image('clan-diamond-coin', clanDiamondCoin);
    this.load.image('clan-map-event', event);
    this.load.image('clan-building', clanBuilding);
  }
  
  public init(state: Istate): void {
    this.state = state;
    if (this.state.user.clanTasks.length <= 0) this.state.user.clanTasks = getNewClanTasks(this.state);
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

    const diamondSprite: Phaser.GameObjects.Sprite = this.add.sprite(pos.x + 270, pos.y + 5, 'clan-diamond-coin').setScale(0.40);
    this.diamondCountText = this.add.text(pos.x + 285, pos.y + 5, String(this.state.clan.diamond.count), textStyle).setOrigin(0, 0.5);

    const sheepSprite: Phaser.GameObjects.Sprite = this.add.sprite(pos.x + 270, pos.y + 35, 'clan-sheep-coin').setScale(0.40);
    this.sheepCountText = this.add.text(pos.x + 285, pos.y + 35, shortNum(this.state.clan.sheep.money), textStyle).setOrigin(0, 0.5);

    const chickenSprite: Phaser.GameObjects.Sprite = this.add.sprite(pos.x + 390, pos.y + 5, 'clan-chicken-coin').setScale(0.40);
    this.chickenCountText = this.add.text(pos.x + 405, pos.y + 5, shortNum(this.state.clan.chicken.money), textStyle).setOrigin(0, 0.5);

    const cowSprite: Phaser.GameObjects.Sprite = this.add.sprite(pos.x + 390, pos.y + 35, 'clan-cow-coin').setScale(0.40);
    this.cowCountText = this.add.text(pos.x + 405, pos.y + 35, shortNum(this.state.clan.cow.money), textStyle).setOrigin(0, 0.5);
    
    const mainZone: Phaser.GameObjects.Zone = this.add.zone(pos.x + 65, pos.y + 5, 270, 140).setDropZone(undefined, () => {});
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFFFF00);
    // graphics.strokeRect(
    //   mainZone.x - mainZone.input.hitArea.width / 2, 
    //   mainZone.y - mainZone.input.hitArea.height / 2, 
    //   mainZone.input.hitArea.width, 
    //   mainZone.input.hitArea.height
    // );

    const bankZone: Phaser.GameObjects.Zone = this.add.zone(pos.x + 375, pos.y + 20, 260, 70).setDropZone(undefined, () => {});
    // const bankGraphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // bankGraphics.lineStyle(5, 0xFFaaff);
    // bankGraphics.strokeRect(
    //   bankZone.x - bankZone.input.hitArea.width / 2, 
    //   bankZone.y - bankZone.input.hitArea.height / 2, 
    //   bankZone.input.hitArea.width, 
    //   bankZone.input.hitArea.height
    // );
    
    this.click(mainZone, () => {
      this.state.modal = {
        type: 17,
        clanTabType: 1,
      }
      this.scene.launch('Modal', this.state);
    });

    this.click(bankZone, () => {
      this.state.modal = {
        type: 19,
        clanTabType: 1,
      };
      this.scene.launch('Modal', this.state);
    });
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

    if (this.state.clan.main?.cooldown > 0) {
      const pos: Iposition = { x: 395, y: 450 };
      this.mainCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.main, 'main');
      this.click(this.mainCooldownSprite, () => {
        this.state.modal = {
          type: 18,
          clanWindowType: 6,
          message: 'main',
        };
        this.scene.launch('Modal',  this.state);
      });
    }
  }

  private createBank(): void {
    const pos: Iposition = {
      x: 595,
      y: 480,
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

    this.click(zone, (): void => {
      this.state.modal = {
        type: 2,
        shopType: 1,
      };
      this.scene.launch('Modal', this.state);
    });

    this.shopNotificator = new Notificator(this, { x: pos.x + 60, y: pos.y - 60, });

    if (!this.state.user.starterpack && this.state.user.takenFreeDiamonds) {

      const starterpackIcon: Phaser.GameObjects.Sprite = this.add.sprite(pos.x + 55, pos.y - 50, 'stock-icon').setScale(0.45);
      this.tweens.add({
        targets: starterpackIcon,
        delay: 2000,
        props: {
          rotation: { duration: 600, yoyo: false, ease: 'Power2', value: 2 * Math.PI },
          scale: { value: 0.5, ease: 'Power1', duration: 250, yoyo: true },
        },
        loop: -1,
      });

      this.click(starterpackIcon, (): void => {
        const modal: Imodal = {
          type: 2,
          shopType: 1
        }
        this.state.modal = modal;
        this.scene.stop();
        this.scene.launch('Modal', this.state);
      });
    }
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
    this.taskNotificator = new Notificator(this, { x: pos.x + 65, y: pos.y - 70}, true);
    this.click(zone, () => {
      this.state.modal = {
        type: 18,
        clanWindowType: 8,
      };
      this.scene.launch('Modal', this.state);
    });
  }

  private createSheep(): void {
    const farmPosition: Iposition = { x: 150, y: 770 };
    const width: number = 300;
    const height: number = 240;
    const textLevel: string = this.state.clan.sheep.cooldown > 0 ? String(this.state.clan.sheep.level - 1) : String(this.state.clan.sheep.level);
    this.sheepLevelText = this.add.text(farmPosition.x + 155, farmPosition.y + 33, textLevel, levelTextStyle).setOrigin(0.5);
    const zone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y, width, height).setDropZone(undefined, () => {});
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFaaf00);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    new ClanFlagPole(this, { x: farmPosition.x + 58, y: farmPosition.y - 125 }).setDepth(2);

    this.click(zone, () => {
      this.state.modal = {
        type: 18,
        clanWindowType: 5,
        message: 'sheep',
      };
      this.scene.launch('Modal', this.state);
    });

    if (this.state.clan.sheep?.cooldown > 0) {
      const pos: Iposition = { x: 100, y: 860 };
      this.sheepCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.sheep, 'sheep');
    }
  }

  private createChicken(): void {
    const farmPosition: Iposition = { x: 580, y: 1050 };
    const width: number = 300;
    const height: number = 270;
    
    const zone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y, width, height).setDropZone(undefined, () => {});
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFaccdd);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);

    const textLevel: string = this.state.clan.chicken.cooldown > 0 ? String(this.state.clan.chicken.level - 1) : String(this.state.clan.chicken.level);
    this.chickenLevelText = this.add.text(farmPosition.x - 106, farmPosition.y + 10, textLevel, levelTextStyle).setOrigin(0.5);
    new ClanFlagPole(this, { x: farmPosition.x, y: farmPosition.y - 175 }).setDepth(2);
    this.click(zone, () => {
      this.state.modal = {
        type: 18,
        clanWindowType: 5,
        message: 'chicken',
      };
      this.scene.launch('Modal', this.state);
    });

    if (this.state.clan.chicken?.cooldown > 0) {
      const pos: Iposition = { x: 620, y: 1130 };
      this.chickenCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.chicken, 'chicken');
    }
  }

  private createCow(): void {
    const farmPosition: Iposition = { x: 150, y: 1025 };
    const width: number = 300;
    const height: number = 270;
    
    const textLevel: string = this.state.clan.cow.cooldown > 0 ? String(this.state.clan.cow.level - 1) : String(this.state.clan.cow.level);
    this.cowLevelText = this.add.text(farmPosition.x + 169, farmPosition.y + 23, textLevel, levelTextStyle).setOrigin(0.5);
    new ClanFlagPole(this, { x: farmPosition.x + 86, y: farmPosition.y - 150 }).setDepth(2);

    const zone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y, width, height).setDropZone(undefined, () => {});
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0xFaccdd);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    this.click(zone, () => {
      this.state.modal = {
        type: 18,
        clanWindowType: 5,
        message: 'cow',
      };
      this.scene.launch('Modal', this.state);
    });

    if (this.state.clan.cow?.cooldown > 0) {
      const pos: Iposition = { x: 120, y: 1130 };
      this.cowCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.cow, 'cow');
    }
  }

  private createEvent(): void {
    const pos: Iposition = { x: 580, y: 720 };
    const width: number = 250;
    const height: number = 220;
    const timeTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '17px',
      color: '#dc6023',
    };
    const placeTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      fontSize: '17px',
      color: '#FEF4E6',
      stroke: '#d0875b',
      strokeThickness: 3,
    };
    const startTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '16px',
      color: '#fbd0b9',
      fontFamily: 'Shadow',
    };
    const startTimeTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontSize: '21px',
      color: '#cbff40',
      fontFamily: 'Shadow'
    };
    // const zone: Phaser.GameObjects.Zone = this.add.zone(pos.x, pos.y, width, height).setDropZone(undefined, () => {});
    // const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    // graphics.lineStyle(5, 0x7F76F3);
    // graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    this.eventSprite = this.add.sprite(pos.x, pos.y, 'clan-map-event').setVisible(false);
    this.eventClanIcon = LogoManager.createIcon(this, pos.x + 4, pos.y + 48, this.state.clan.avatar).setScale(0.23).setVisible(false);
    this.eventPlace = this.add.text(pos.x + 4, pos.y + 82, '-', placeTextStyle).setOrigin(0.5).setVisible(false);
    const timeText: string = `${this.state.lang.lastTime} ${shortTime(this.state.progress.clanEvent.endTime, this.state.lang)}`;
    this.eventTime = this.add.text(pos.x + 4, pos.y + 100, timeText, timeTextStyle).setOrigin(0.5).setVisible(false);

    this.eventStartText = this.add.text(pos.x - 10, pos.y + 30, this.state.lang.eventStart, startTextStyle)
      .setOrigin(0.5)
      .setDepth(1)
      .setVisible(false);
    
    this.eventStartTime = this.add.text(pos.x - 10, pos.y + 40, '-', startTimeTextStyle)
      .setOrigin(0.5)
      .setDepth(2)
      .setVisible(false);

    this.eventStartBg = this.add.graphics({
      fillStyle: {
        color: 0x2b3d11,
        alpha: 0.5
      },
    }).fillRoundedRect(this.eventStartText.getBounds().left - 25, this.eventStartText.getBounds().top - 20, this.eventStartText.width + 50, 60)
      .setVisible(false);
    
    this.click(this.eventSprite, (): void => {
      this.state.modal = {
        type: 20,
        clanTabType: 1,
      };
      this.scene.launch('Modal', this.state);
    });
  }

  public update(): void {
    if (!this.state.clan) {
      this.scene.stop();
      this.scene.stop('Modal');
      this.scene.stop('Clan');
    } else {
      this.updateCooldowns();
      this.updateLevelText();
      this.updateCountsText();
      this.updatePlayerCount();
      this.updateClanName();
      this.updateClanIcon();
      this.updateShopNotification();
      this.updateTaskNotification();
      this.updateEventState();
      this.updateEventText();
    }
  }

  private updateEventState(): void {
    if (!this.eventSprite.visible && this.state.progress.clanEvent.startTime <= 0 && this.state.progress.clanEvent.endTime > 0) {
      this.setClanEventPlace();
      this.eventSprite.setVisible(true);
      this.eventClanIcon.setVisible(true);
      this.eventPlace.setVisible(true);
      this.eventTime.setVisible(true);
      this.eventStartText.setVisible(false);
      this.eventStartTime.setVisible(false);
      this.eventStartBg.setVisible(false);
    } else if (!this.eventStartBg.visible && this.state.progress.clanEvent.startTime > 0 && this.state.progress.clanEvent.endTime > 0) {
      this.eventSprite.setVisible(false);
      this.eventClanIcon.setVisible(false);
      this.eventPlace.setVisible(false);
      this.eventTime.setVisible(false);
      this.eventStartText.setVisible(true).setY(this.eventStartText.y - 10);
      this.eventStartTime.setVisible(true);
      this.eventStartBg.setVisible(true);
    } else if (!this.eventStartBg.visible && this.state.progress.clanEvent.endTime <= 0) {
      this.eventSprite.setVisible(false);
      this.eventClanIcon.setVisible(false);
      this.eventPlace.setVisible(false);
      this.eventTime.setVisible(false);
      this.eventStartText.setVisible(true).setText(this.state.lang.eventEndText);
      this.eventStartTime.setVisible(false);
      this.eventStartBg.setVisible(true);
    }
  }

  private updateCountsText(): void {
    if (this.diamondCountText.active && this.diamondCountText?.text !== String(this.state.clan.diamond.count)) {
      this.diamondCountText.setText(String(this.state.clan.diamond.count));
    }
    if (this.sheepCountText.active && this.sheepCountText?.text !== shortNum(this.state.clan.sheep?.money)) {
      this.sheepCountText.setText(shortNum(this.state.clan.sheep.money));
    }
    if (this.chickenCountText.active && this.chickenCountText?.text !== shortNum(this.state.clan.chicken?.money)) {
      this.chickenCountText.setText(shortNum(this.state.clan.chicken.money));
    }
    if (this.cowCountText.active && this.cowCountText?.text !== shortNum(this.state.clan.cow?.money)) {
      this.cowCountText.setText(shortNum(this.state.clan.cow.money));
    }
  }

  private updateCooldowns(): void {
    if (this.state.clan.main?.cooldown > 0 && !this.mainCooldownSprite?.active) {
      const pos: Iposition = { x: 395, y: 450 };
      this.createStartCooldownAnimation(pos.x, pos.y - 20);
      this.mainCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.main, 'main');
      this.click(this.mainCooldownSprite, () => {
        if (this.state.clan.ownerId === this.state.user.id) {
          this.state.modal = {
            type: 18,
            clanWindowType: 6,
            message: 'main',
          };
          this.scene.launch('Modal',  this.state);
        }
      });
    }
    if (this.state.clan.sheep?.cooldown > 0 && !this.sheepCooldownSprite?.active) {
      const pos: Iposition = { x: 100, y: 860 };
      this.createStartCooldownAnimation(pos.x, pos.y);
      this.sheepCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.sheep, 'sheep');
    }
    if (this.state.clan.chicken?.cooldown > 0 && !this.chickenCooldownSprite?.active) {
      const pos: Iposition = { x: 620, y: 1130 };
      this.createStartCooldownAnimation(pos.x, pos.y);
      this.chickenCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.chicken, 'chicken');
    }
    if (this.state.clan.cow?.cooldown > 0 && !this.cowCooldownSprite?.active) {
      const pos: Iposition = { x: 120, y: 1130 };
      this.createStartCooldownAnimation(pos.x, pos.y);
      this.cowCooldownSprite = new ClanCooldownBuilding(this, pos, this.state.clan.cow, 'cow');
    }
  }

  private createStartCooldownAnimation(x: number, y: number): void {
    const emitter1: Phaser.GameObjects.Particles.ParticleEmitter = this.add.particles('factory-smoke').setDepth(5).createEmitter({
      x: x - 50,
      y: y,
      speed: { min: 50, max: 150 },
      angle: { min: 0, max: 360},
      scale: { start: 0, end: 1, ease: 'Back.easeOut' },
      alpha: { start: 1, end: 0, ease: 'Quart.easeOut' },
      blendMode: 'SCREEN',
      lifespan: 2000
    }).setVisible(false);
    const emitter2: Phaser.GameObjects.Particles.ParticleEmitter = this.add.particles('factory-smoke').setDepth(5).createEmitter({
      x: x,
      y: y - 20,
      speed: { min: 50, max: 150 },
      angle: { min: 0, max: 360},
      scale: { start: 0, end: 1, ease: 'Back.easeOut' },
      alpha: { start: 1, end: 0, ease: 'Quart.easeOut' },
      blendMode: 'SCREEN',
      lifespan: 2000
    }).setVisible(false);
    const emitter3: Phaser.GameObjects.Particles.ParticleEmitter = this.add.particles('factory-smoke').setDepth(5).createEmitter({
      x: x + 50,
      y: y,
      speed: { min: 50, max: 150 },
      angle: { min: 0, max: 360},
      scale: { start: 0, end: 1, ease: 'Back.easeOut' },
      alpha: { start: 1, end: 0, ease: 'Quart.easeOut' },
      blendMode: 'SCREEN',
      lifespan: 2000
    }).setVisible(false);
    this.time.addEvent({
      delay: 300,
      callback: (): void => {
        emitter1.setVisible(true);
        emitter2.setVisible(true);
        emitter3.setVisible(true);
        this.time.addEvent({
          delay: 400,
          callback: (): void => {
            emitter1.stop();
            emitter2.stop();
            emitter3.stop();
          }, 
        });
      }, 
    });
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

  private updateShopNotification(): void {
    this.shopNotificator?.setVisible(this.checkFreeDiamondsNotification());
  }

  private checkFreeDiamondsNotification(): boolean {
    return !this.state.user.takenFreeDiamonds && 
    (this.state.userSheep.tutorial >= 100 || 
    this.state.progress.chicken.part >= 1 || 
    this.state.progress.cow.part >= 1);
  }

  private updateTaskNotification(): void {
    const count = this.state.user.clanTasks.filter(el => el.done && !el.got_awarded).length;
    this.taskNotificator.setCount(count);
  }

  private updateEventText(): void {
    if (this.eventTime.visible) {
      const timeText: string = `${this.state.lang.lastTime} ${shortTime(this.state.progress.clanEvent.endTime, this.state.lang)}`;
      if (this.eventTime.text !== timeText) this.eventTime.setText(timeText);
    }
    if (this.eventPlace.visible) {
      if (this.state.clanEventPlace) {
        const placeText: string = `${this.state.clanEventPlace} ${this.state.lang.eventPlace}`;
        if (this.eventPlace.text !== placeText) this.eventPlace.setText(placeText);
      }
    }
    if (this.eventStartTime.visible) {
      const timeText: string = shortTime(this.state.progress.clanEvent.startTime, this.state.lang);
      if (this.eventStartTime.text !== timeText) this.eventStartTime.setText(timeText);
    }
    if (this.eventClanIcon.visible) {
      const { bg, frame, icon } = this.state.clan.avatar;
      if (this.eventClanIcon.texture !== `clan-texture-${bg}-${frame}-${icon}`) {
        const pos: Iposition = { x: 580, y: 720 };
        this.eventClanIcon.destroy();
        this.eventClanIcon = LogoManager.createIcon(this, pos.x + 4, pos.y + 48, this.state.clan.avatar).setScale(0.23);
      }
    }
  }

  private setClanEventPlace(): void {
    const data = {
      id: this.state.user.id,
      hash: this.state.user.hash,
      counter: this.state.user.counter,
    };
    axios.post(process.env.API + '/getTournamentClanPlace', data).then(res => {
      const { error, place } = res.data;
      if (!error) {
        if (this.state.clanEventPlace !== place) {
          this.state.clanEventPlace = place;
        }
      }
    });
  }
};
