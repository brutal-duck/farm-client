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
  }
}
