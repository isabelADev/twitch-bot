import {Client, Options} from "tmi.js";
import {Injectable} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {options} from "tsconfig-paths/lib/options";

const DEF_OPTIONS: Options = {
    identity: {
        username: '',
        password: ''
    },
    channels: ['']
};

@Injectable()
export class TwitchBotService {

    private client: Client;
    readonly options: Options;

    constructor(private configService: ConfigService) {
        this.options = this.buildOptions();
        this.client = new Client(this.options);
        this.client.on('connected', (ipAddress: string, port: number) => {
            TwitchBotService.onConnected(ipAddress, port);
        });
        this.client.connect();
    }

    addMessageListener(callback: (target, context, msg, self) => any) {
        this.client.addListener('message', callback);
    }

    removeMessageListener(callback: (target, context, msg, self) => any) {
        this.client.removeListener('message', callback)
    }

    say(channel: string, message: string): void {
        if (this.options.channels.contains(channel)) {
            this.client.say(channel, message)
        } else {
            throw new Error('Channel is not in options channel list. Message could not be sent');
        }
    }

    private static onConnected(ipAddress: string, port: number) {
        console.info(`* Connected to ${ipAddress}:${port}`);
    }

    private buildOptions() {
        try {

            const channelsStr: string = this.configService.get('channels');
            let channels: string[] = [];
            if (channelsStr && channelsStr.length > 0) {
                channels = channelsStr.split(',');
            }
            return {
                options: {
                    debug: true
                },
                identity: {
                    username: this.configService.get('identity.username'),
                    password: this.configService.get('identity.password')
                },
                channels: channels
            }
        } catch (e) {
            return DEF_OPTIONS;
        }
    }
}
