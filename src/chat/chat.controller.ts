import {
  // Body,
  Controller,
  // Delete,
  Get,
  // Post,
  // Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from 'src/auth/auth.service';
// import { Prisma } from '@prisma/client';
import { Request } from 'express';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(
    private readonly chatService: ChatService,
    private readonly authService: AuthService,
  ) {}

  @Get('rooms')
  async getChatRooms(@Req() req: Request) {
    const username = await this.authService.getUserIdFromToken(req);
    return await this.chatService.getChatRooms(username.username);
  }
}
