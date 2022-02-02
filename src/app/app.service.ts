import {Injectable} from '@nestjs/common';
import {TwitchBotService} from "./services/twitch-bot.service";
import {WebSocketPlainService} from "./services/web-socket-plain.service";

@Injectable()
export class AppService {

    constructor(private wsService: WebSocketPlainService) {
    }

    getHello(): string {
        return 'Hello World!';
    }
}
