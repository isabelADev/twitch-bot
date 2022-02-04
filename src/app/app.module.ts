import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {TwitchBotService} from "./services/twitch-bot.service";
import {ConfigModule} from "@nestjs/config";
import configuration from "../common/core/config/configuration";
import {MessageExchangeGateway} from "./gateways/message-exchange.gateway";
import {LifeMeterService} from "./services/life-meter.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration]
        })
    ],
    controllers: [AppController],
    providers: [AppService, TwitchBotService, MessageExchangeGateway, LifeMeterService],
})
export class AppModule {
}
