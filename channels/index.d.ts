import { Socket, Channel } from 'phoenix';
import { Observable } from 'rxjs';

export declare class PhoenixChannel {
    public channel: Channel;
    constructor(socket: Socket, topic: string, options: Object);
    join(): Observable<any>;
    leave(): Observable<any>;
    observeMessage (message: string): Observable<any>;
}

export declare class PhoenixChannels {
    public socket: Socket;
    constructor(socketUrl: string);
    channel(topic: string, options: Object): PhoenixChannel;
}
