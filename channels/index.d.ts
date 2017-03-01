import { Socket, Channel } from 'phoenix';
import { Observable } from 'rxjs';

export declare class PhoenixChannel {
    public channel: Channel;
    constructor(public socket: Socket, public topic: string, options: Object);
    join();
    observeMessage (message: string);
}

export declare class PhoenixChannels {
    public socket: Socket;
    constructor(socketUrl: string);
    channel(topic: string, options: Object): PhoenixChannel;
}
