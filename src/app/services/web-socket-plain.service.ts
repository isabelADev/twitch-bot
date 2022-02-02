import {Injectable} from "@nestjs/common";
import {Server as WebSocketServer} from "ws";
import {TwitchBotService} from "./twitch-bot.service";

const commands = [
    { cmd: '!dia', fieldName: 'hp', value: '10'},
    { cmd: '!cafe', fieldName: 'mp', value: '10'}
];

@Injectable()
export class WebSocketPlainService {
    private wsServer: WebSocketServer;
    private webSocket: WebSocket;

    constructor(private twitchBotService: TwitchBotService) {
        this.wsServer = new WebSocketServer({port: 8081})

        this.wsServer.on('connection', w => {
            this.webSocket = w;
            console.log(`* Client Connected.`);
            // Called every time a message comes in
        });

        this.twitchBotService.addMessageListener(this.onMessageHandler);
    }

    onMessageHandler(target, context, msg, self) {
        if (self) {
            return;
        } // Ignore messages from the bot

        // Remove whitespace from chat message
        const commandName = msg.trim();

        commands.forEach(command => {
            if (commandName === command.cmd) {
                let msg = {
                    fieldName: command.fieldName,
                    value: command.value
                };
                this.webSocket.send(JSON.stringify(msg));
                console.log("Message sent:");
                console.dir(msg);
            }
        });
    }

}
