import {Client, Options} from "tmi.js";
import {Injectable} from "@nestjs/common";

const options: Options = {};

@Injectable()
export class TwitchBotService {

    private client: Client;

    constructor() {
        this.client = new Client(options);
        this.client.on('connected', TwitchBotService.onConnected);
        this.client.connect();
    }

    addMessageListener(callback: (...args: any[]) => any) {
        this.client.addListener('message', callback);
    }

    removeMessageListener(callback: (...args: any[]) => any) {
        this.client.removeListener('message', callback)
    }

    private static onConnected(ipAddress: string, port: number) {
        console.info(`* Connected to ${ipAddress}:${port}`);
    }

}
