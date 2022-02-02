import {Injectable} from '@nestjs/common';
import {TwitchBotService} from "./services/twitch-bot.service";

@Injectable()
export class AppService {

    constructor(private twitchBotService: TwitchBotService) {
        this.twitchBotService.addMessageListener(message => console.log('New message received: ' + message));
    }

    getHello(): string {
        return 'Hello World!';
    }
}
