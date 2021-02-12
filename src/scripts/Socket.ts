import * as openSocket from 'socket.io-client';
import { newMessage } from './elements';

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
      
      if (data.type === 1) {
        newMessage(data, this.state);
      }

    });

    this.io.on('getRating', (data: any) => {
      console.log(data);
    });

  }

}
