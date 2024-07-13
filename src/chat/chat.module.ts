import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { ChatGateway } from './gateway/chat.gateway';

@Module({
  controllers: [ChatController],
  providers: [ChatService, JwtStrategy, ChatGateway],
})
export class ChatModule {}
