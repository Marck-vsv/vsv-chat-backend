import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';
import { ChatGateway } from './gateway/chat.gateway';
import { AuthService } from 'src/auth/auth.service';
import { UserModule } from 'src/user/user.module';
import { PasswordModule } from 'src/utils/password/password.module';

@Module({
  imports: [UserModule, PasswordModule],
  controllers: [ChatController],
  providers: [ChatService, JwtStrategy, ChatGateway, AuthService],
  exports: [ChatService],
})
export class ChatModule {}
