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
      console.log(JSON.parse(data))
      this.state.eventRaitings = JSON.parse(data).ratings;
      this.state.userEventRaiting = JSON.parse(data).user;
      // console.log(this.state);
    });

  }

}
