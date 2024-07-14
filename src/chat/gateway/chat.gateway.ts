import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;

  handleConnection(client: Socket) {
    console.log(client.id + ' has connected...');

    client.broadcast.emit('user_join', {
      message: client.id + ' has connected...',
    });
  }

  handleDisconnect(client: Socket) {
    console.log(client.id + ' has disconnected...');

    this.server.emit('user_left', {
      message: client.id + ' has disconnected...',
    });
  }

  @SubscribeMessage('message')
  messageHandler(client: Socket, message: any) {
    console.log(message);

    client.emit('reply', 'Macaco é tu');
  }
}
