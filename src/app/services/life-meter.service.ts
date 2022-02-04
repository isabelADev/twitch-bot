import {Injectable, Logger} from "@nestjs/common";
import {TwitchBotService} from "./twitch-bot.service";
import {MessageExchangeGateway} from "../gateways/message-exchange.gateway";

const commands = [
    {
        cmd: '!dia', payload: {
            fieldName: 'hp',
            value: 10
        }
    },
    {
        cmd: '!cafe', payload: {
            fieldName: 'mp',
            value: 10
        }
    }
];

@Injectable()
export class LifeMeterService {

    private logger: Logger = new Logger('LifeMeterService');

    constructor(
        private twitchBotService: TwitchBotService,
        private messageExchangeGateway: MessageExchangeGateway
    ) {
        this.twitchBotService.addMessageListener(this.onMessageHandler.bind(this));
    }

    onMessageHandler(target, context, msg, self) {
        // Ignore messages from the bot
        if (self) {
            return;
        }
        const commandName = msg.trim();
        commands.forEach(command => {
            if (commandName === command.cmd) {
                this.logger.log('Command run: ' + command.cmd);
                this.messageExchangeGateway.sendMessage(JSON.stringify(command.payload));
            }
        });
    }
}
