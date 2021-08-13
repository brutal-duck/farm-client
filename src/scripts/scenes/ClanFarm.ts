import LogoManager, { Icon } from "../components/Utils/LogoManager";
import { click } from "../general/clicks";

export default class ClanFarm extends Phaser.Scene {
  public state: Istate;
  private bg: Phaser.GameObjects.Sprite;
  private nameText: Phaser.GameObjects.Text;
  private icon: Icon;

  constructor() {
    super('ClanFarm');
  }

  public click = click.bind(this);

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
    this.bg = this.add.sprite(0, 0, 'profile-bg').setOrigin(0).setInteractive();

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
      fontFamily: 'Shadow',
      fontSize: '30px',
      align: 'center',
      color: '#763701',
      wordWrap: { width: 350 }
    };
    const pos: Iposition = {
      x: this.cameras.main.centerX,
      y: 50,
    };
    this.icon = LogoManager.createIcon(this, pos.x, pos.y, this.state.clan.avatar).setScale(0.35);
    this.nameText = this.add.text(pos.x + 10, pos.y + 50, this.state.clan.name, textStyle).setOrigin(0.5);
  }

  private createMain(): void {
    const pos: Iposition = {
      x: 385,
      y: 300,
    };
    const zone = this.add.zone(pos.x, pos.y, 200, 200).setDropZone(undefined, () => {});

    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0xFFFF00);
    graphics.strokeRect(
      zone.x - zone.input.hitArea.width / 2, 
      zone.y - zone.input.hitArea.height / 2, 
      zone.input.hitArea.width, 
      zone.input.hitArea.height
      );

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
      x: 130,
      y: 400,
    };
    const zone = this.add.zone(pos.x, pos.y, 120, 120).setDropZone(undefined, () => {});

    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0xFF0000);
    graphics.strokeRect(
      zone.x - zone.input.hitArea.width / 2, 
      zone.y - zone.input.hitArea.height / 2, 
      zone.input.hitArea.width, 
      zone.input.hitArea.height
    );

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
      x: 280,
      y: 540,
    };
    const zone = this.add.zone(pos.x, pos.y, 140, 200).setDropZone(undefined, () => {});

    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0x0000ff);
    graphics.strokeRect(
      zone.x - zone.input.hitArea.width / 2, 
      zone.y - zone.input.hitArea.height / 2, 
      zone.input.hitArea.width, 
      zone.input.hitArea.height
    );

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
      x: 610,
      y: 400
    };
    const zone = this.add.zone(pos.x, pos.y, 150, 210).setDropZone(undefined, () => {});

    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0x00FF00);
    graphics.strokeRect(
      zone.x - zone.input.hitArea.width / 2, 
      zone.y - zone.input.hitArea.height / 2, 
      zone.input.hitArea.width, 
      zone.input.hitArea.height
    );

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
    const farmPosition: Iposition = { x: 140, y: 800 };
    const width: number = 260;
    const height: number = 250;
    
    const zone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y, width, height).setDropZone(undefined, () => {});
    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0xFaaf00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    this.click(zone, () => {
      this.state.modal = {
        type: 1,
        sysType: 3,
        height: 150,
        message: 'Ферма овец',
      };
      this.scene.launch('Modal', this.state);
    });
  }

  private createChicken(): void {
    const farmPosition: Iposition = { x: 580, y: 1050 };
    const width: number = 300;
    const height: number = 200;
    
    const zone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y, width, height).setDropZone(undefined, () => {});
    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0xFF6458);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    this.click(zone, () => {
      this.state.modal = {
        type: 1,
        sysType: 3,
        height: 150,
        message: 'Ферма курок',
      };
      this.scene.launch('Modal', this.state);
    });
  }

  private createCow(): void {
    const farmPosition: Iposition = { x: 150, y: 1050 };
    const width: number = 300;
    const height: number = 200;
    
    const zone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y, width, height).setDropZone(undefined, () => {});
    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0xFaaf00);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
    this.click(zone, () => {
      this.state.modal = {
        type: 1,
        sysType: 3,
        height: 150,
        message: 'Ферма коровок',
      };
      this.scene.launch('Modal', this.state);
    });
  }

  private createEvent(): void {
    const farmPosition: Iposition = { x: 550, y: 800 };
    const width: number = 300;
    const height: number = 250;
    
    const zone: Phaser.GameObjects.Zone = this.add.zone(farmPosition.x, farmPosition.y, width, height).setDropZone(undefined, () => {});
    const graphics: Phaser.GameObjects.Graphics = this.add.graphics();
    graphics.lineStyle(5, 0x7F76F3);
    graphics.strokeRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2, zone.input.hitArea.width, zone.input.hitArea.height);
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
};
