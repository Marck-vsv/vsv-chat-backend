import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { ChatModule } from './chat/chat.module';
import { MessageModule } from './message/message.module';
import { AuthModule } from './auth/auth.module';
import { PasswordModule } from './utils/password/password.module';

@Module({
  imports: [UserModule, ChatModule, MessageModule, AuthModule, PasswordModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
