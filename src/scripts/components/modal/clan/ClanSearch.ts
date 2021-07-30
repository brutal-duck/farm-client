import axios from 'axios';
import { shortNum } from '../../../general/basic';
import Clan from './../../../scenes/Modal/Clan/Main';

export default class ClanSearch {
  private scene: Clan;
  constructor (scene: Clan) {
    this.scene = scene;
    this.init();
  }

  private init(): void {
    const heightWindow: number = this.scene.state.user.clanId ? 570 : 650;
    this.scene.scrollHeight = Number(this.scene.game.config.height) - 1200 + heightWindow;
    this.scene.scrolling.bottom = 0;
    this.scene.scrolling.scrollY = 0;
    this.getClanList();
  }
  
  private getClanList(): void {
    const data: any = {
      id: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
    };
    axios.post(process.env.API + '/getClanRaitingList', data).then(res => {
      console.log(res.data)
      res.data.forEach((el, id) => {
        this.createClan(el, id + 1);
      });
      console.log(res.data);
    })
  }

  private createClan(data: Iclan, ratePosition): void {
    const nameTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      color: '#fffdfa',
      fontFamily: 'Shadow',
      fontSize: '20px',
      align: 'left',
      wordWrap: { width: 210 },
    };
    const buttonTextStyle: Phaser.Types.GameObjects.Text.TextStyle = {
      fontFamily: 'Shadow',
      wordWrap: { width: 100 },
      color: '#fffdfa',
      fontSize: '18px',
      align: 'center',
      shadow: {
        offsetX: 1,
        offsetY: 1, 
        color: '#96580e',
        blur: 2,
        fill: true,
      },
    };
    const padding: number = 10;
    const bgWidth: number = 450;
    const pos: Iposition = {
      x: this.scene.cameras.main.centerX - 330,
      y: this.scene.windowHeight + this.scene.scrollHeight + padding,
    };
    const texture: string = data.isClosed ? 'profile-window-button-yellow' : 'profile-window-button-green';
    const textBtn: string = data.isClosed ? this.scene.state.lang.sendInvite.replace(' ', '\n') : this.scene.state.lang.join;

    const { name } = data;
    
    const avatarSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x + 40, pos.y, 'farmer').setScale(0.28).setDepth(1);
    const avatarGeom: Phaser.Geom.Rectangle = avatarSprite.getBounds();
    const nameText: Phaser.GameObjects.Text = this.scene.add.text(avatarGeom.right + 20, avatarSprite.y, name, nameTextStyle).setDepth(1).setOrigin(0, 0.5).setCrop(0, 0, 250, 250);
    const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x + 370, pos.y + 5, texture).setDepth(1);
    const btnText: Phaser.GameObjects.Text = this.scene.add.text(btn.x, btn.y - 5, textBtn, buttonTextStyle).setOrigin(0.5).setDepth(1);

    this.scene.add.sprite(pos.x + 210, pos.y, 'clan-window-leader-plate');

    this.scene.scrollHeight += padding + avatarGeom.height + 10;
    this.scene.scrolling.bottom = this.scene.scrollHeight;
  }
}