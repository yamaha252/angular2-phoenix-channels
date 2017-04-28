import { Socket, Channel } from 'phoenix';
import { Observable } from 'rxjs';

export class PhoenixChannel {
  public channel: Channel;

  constructor(public socket: Socket, public topic: string, options = {}) {
    this.channel = this.socket.channel(topic, options);
  }

  join(): Observable<any> {
    let joined = this.channel.join();
    return new Observable( (observer) => {
      joined
          .receive("ok", resp => {
            observer.next(resp);
            observer.complete();
          })
          .receive("error", resp => { observer.error(resp); });
    });
  }

  leave(): Observable<any> {
    let leaved = this.channel.leave();
    return new Observable( (observer) => {
      leaved
          .receive("ok", resp => {
            observer.next(resp);
            observer.complete();
          })
          .receive("error", resp => { observer.error(resp); });
    });
  }

  observeMessage(message: string): Observable<any> {
    return new Observable( (observer) => {
      this.channel.on(message, (resp) => {
        observer.next(resp);
      });
      this.channel.onClose(() => {
        observer.complete();
      });
    });
  }
}

export class PhoenixChannels {
  public socket: Socket;

  constructor(socketUrl: string) {
    this.socket =  new Socket(socketUrl);
    this.socket.connect();
  }

  channel(topic: string, options = {}) {
    return new PhoenixChannel(this.socket, topic, options);
  }
}
