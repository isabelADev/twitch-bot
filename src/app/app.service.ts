import {Injectable} from '@nestjs/common';
import {TwitchBotService} from "./services/twitch-bot.service";
import {MessageExchangeGateway} from "./gateways/message-exchange.gateway";

@Injectable()
export class AppService {

    constructor(private wsService: MessageExchangeGateway) {
    }

    getHello(): string {
        return 'Hello World!';
    }
}
