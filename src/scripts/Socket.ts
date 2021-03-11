import * as openSocket from 'socket.io-client';

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

    this.io.on('getRating', (data: any) => {
      // console.log(data)
      // console.log(this.state.progress)
      this.state.progress.event.updateRaitings = true;
      this.state.progress.event.eventRaitings = data.ratings;
      this.state.progress.event.userEventRaiting = data.user;
      this.state.progress.event.eventPoints = data.user.score;
      // console.log(this.state);
    });

  }

}
