import axios from 'axios';
import Clan from './../../../scenes/Modal/Clan/Main';
const KEY = '196ea80e3d8a8ef81b09c965d6658b7f';

export default class ClanSearch {
  private scene: Clan;
  private array: Array<Iclan>;
  constructor (scene: Clan) {
    this.scene = scene;
    this.init();
    this.array = []
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
    const { name, isClosed, id } = data;

    const texture: string = isClosed ? 'profile-window-button-yellow' : 'profile-window-button-green';
    const textBtn: string = isClosed ? this.scene.state.lang.sendInvite.replace(' ', '\n') : this.scene.state.lang.join;

    
    const avatarSprite: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x + 40, pos.y, 'farmer').setScale(0.28).setDepth(1);
    const avatarGeom: Phaser.Geom.Rectangle = avatarSprite.getBounds();
    const nameText: Phaser.GameObjects.Text = this.scene.add.text(avatarGeom.right + 20, avatarSprite.y, name, nameTextStyle).setDepth(1).setOrigin(0, 0.5).setCrop(0, 0, 250, 250);

    const btn: Phaser.GameObjects.Sprite = this.scene.add.sprite(pos.x + 370, pos.y + 5, texture).setDepth(1);
    const btnText: Phaser.GameObjects.Text = this.scene.add.text(btn.x, btn.y - 5, textBtn, buttonTextStyle).setOrigin(0.5).setDepth(1);

    this.scene.clickModalBtn({ btn: btn, title: btnText }, () => { this.onClickBtn(data); });

    this.scene.add.sprite(pos.x + 210, pos.y, 'clan-window-leader-plate');

    this.scene.scrollHeight += padding + avatarGeom.height + 10;
    this.scene.scrolling.bottom = this.scene.scrollHeight;
  }

  private onClickBtn(clan: Iclan): void {
    if (clan.isClosed) {
      this.askJoinClosedClan(clan);
    } else {
      this.joinOpenedClan(clan);
    }
  }

  private askJoinClosedClan(clan: Iclan): void {
    let login: string = this.scene.state.user.login;
    if (this.scene.state.platform !== 'web' && this.scene.state.platform !== 'android') login = this.scene.state.name;
    const avatar: string = Number(this.scene.state.user.avatar) > 0 ? this.scene.state.user.avatar : this.scene.state.avatar;
    const data = {
      clanId: clan.id, 
      login: login,
    };
    this.scene.state.socket.io.emit('askJoinClan', data);
  }

  private joinOpenedClan(clan: Iclan): void {
    let login: string = this.scene.state.user.login;
    if (this.scene.state.platform !== 'web' && this.scene.state.platform !== 'android') login = this.scene.state.name;
    const avatar: string = Number(this.scene.state.user.avatar) > 0 ? this.scene.state.user.avatar : this.scene.state.avatar;
    const data = {
      userId: this.scene.state.user.id,
      hash: this.scene.state.user.hash,
      counter: this.scene.state.user.counter,
      clanId: clan.id,
      userName: login,
      userAvatar: avatar,
      userStatus: this.scene.state.user.status,
    };

    axios.post(process.env.API +'/acceptInviteClan', data).then((res): void => {
      const { status } = res.data.result;
      if (res.data.error) {
        if (status === 'limit') {
          this.scene.state.modal = {
            type: 1,
            sysType: 3,
            message: this.scene.state.lang.clanIsFull,
          };
          this.scene.scene.stop();
          this.scene.scene.stop('Modal');
          this.scene.scene.launch('Modal', this.scene.state);
        }
      } else {
        if (res.data.result.id) {
          this.scene.state.modal = {
            type: 17,
            clanType: 1,
            message: this.scene.state.lang.clanIsFull,
          };
          this.scene.state.user.clanId = res.data.result.id;
          this.scene.state.clan = res.data.result;
  
          this.scene.state.socket.io.emit('joinClanRoom', {
            clanId: this.scene.state.user.clanId,
          });
          this.scene.state.socket.io.emit('sendClanMessage', {
            id: this.scene.state.user.id,
            clanId: this.scene.state.user.clanId,
            message: KEY,
            userName: login,
            userStatus: this.scene.state.user.status,
          });
          this.scene.scene.stop('Modal');
          this.scene.scene.stop();
          this.scene.scene.launch('Modal', this.scene.state);
        }
      }
    });    
  }
}