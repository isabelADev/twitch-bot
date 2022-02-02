import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TwitchBotService} from "./services/twitch-bot.service";
import {ConfigModule} from "@nestjs/config";
import configuration from "../common/core/config/configuration";
import {WebSocketPlainService} from "./services/web-socket-plain.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration]
        })
    ],
    controllers: [AppController],
    providers: [AppService, TwitchBotService, WebSocketPlainService],
})
export class AppModule {
}
