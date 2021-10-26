import * as openSocket from 'socket.io-client';
import DataValidator from './libs/DataValidator';

export default class Socket {

  public io: openSocket;
  public state: Istate;
  
  constructor(state: Istate) {
    this.state = state;
    this.init();
  }
  
  public init(): void {

    this.io = openSocket(process.env.API);

    this.io.on('add', (data: any) => {
      
      if (data.type === 1) this.state.chat.push(data);

    });

    this.io.on('getUnicornRating', (data: IunicornRaitingsData) => {
      // console.log(data)
      // console.log(this.state.progress)
      this.state.userUnicorn.points = Number(data.user.score);
      this.state.unicornRaitings = data;
      this.state.unicornRaitings.updated = true;
      // console.log(this.state);
    });

    this.io.on('fortune', (data: any) => {
      this.state.fortuneData = data;
    });
    this.io.on('newPersonalMessage', (data: IpersonalMessage) => {
      const message: IpersonalMessage = {
        text: data.text,
        check: data.check,
        owned: data.owned,
        time: data.time,
      };
      if (data.owned) {
        const user: IuserPersonalMessage = this.state.user.personalMessages.find(el => el.userId === data.toId);
        if (user) {
          user.messages.push(message);
        }
      } else {
        this.state.updatePersonalMessage = true;
        const user: IuserPersonalMessage = this.state.user.personalMessages.find(el => el.userId === data.fromId);
        if (user) {
          if (user.name !== data.name) user.name = data.name;
          if (user.status !== data.status) user.status = data.status;
          user.messages.push(message);
        } else {
          const createnUser: IuserPersonalMessage = {
            name: data.name,
            userId: data.fromId,
            status: data.status,
            messages: [message]
          };
          this.state.user.personalMessages.push(createnUser);
        }
      }
    });

    this.io.on('newClanMessage', (data: Ichat) => {
      if (this.state.clan) {
        if (data.id === this.state.clan.id) {
          this.state.clan.chatMessages.push(data);
          this.state.clanChatNotificationCount += 1;
        }
      }
    });

    this.io.on('newInviteClan', (data: Imessage) => {
      this.state.updatePersonalMessage = true;
      this.state.user.messages.push(data);
      if (data.type === 3) {
        this.state.closeModal = true;
      }
    });

    this.io.on('joinClanAccepted', (data: Iclan) => {
      this.state.user.clanId = data.id;
      this.state.clan = data;
      this.state.socket.io.emit('joinClanRoom', {
        clanId: this.state.user.clanId,
      });
    });

    this.io.on('updateClanData', (data: Iclan) => {
      if (this.state.clan) {
       this.state.clan =  DataValidator.validateClan(data);
      }
    });
  }
}
