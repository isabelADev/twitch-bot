import {Injectable} from "@nestjs/common";
import {
    SubscribeMessage,
    WebSocketGateway,
    OnGatewayInit,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
    MessageBody,
} from '@nestjs/websockets';
import {Logger} from '@nestjs/common';
import {TwitchBotService} from "../services/twitch-bot.service";
import {Socket, Server} from 'socket.io';


@WebSocketGateway({
    cors: { origin: ['*'] }
})
export class MessageExchangeGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private logger: Logger = new Logger('MessageExchangeGateway');

    /**
     * Handles incomming message from Client
     * @param client
     * @param message
     */
    @SubscribeMessage('message')
    handleMessage(client: Socket, message: any): void {
        this.logger.warn('He recibido el mensaje: ' + message);
    }

    /**
     * Sends a message to Client
     * @param message
     */
    sendMessage(message: string): void {
        this.server.emit('message', message);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

}
