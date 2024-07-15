import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { Logger } from '@nestjs/common';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    Logger.log(client.id + ' has connected...');

    client.broadcast.emit('user_join', client.id + ' has connected...');
  }

  handleDisconnect(client: Socket) {
    Logger.log(client.id + ' has disconnected...');

    this.server.emit('user_left', client.id + ' has disconnected...');
  }

  @SubscribeMessage('message')
  messageHandler(client: Socket, message: any) {
    Logger.log(message);
    client.emit('message', message);
  }
}
