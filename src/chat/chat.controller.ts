import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Prisma } from '@prisma/client';

@Controller('chat')
@UseGuards(JwtAuthGuard)
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('rooms')
  async getChatRooms() {
    return await this.chatService.getChatRooms();
  }

  @Post('create')
  async createChatRoom(@Body() data: Prisma.ChatCreateInput): Promise<any> {
    return await this.chatService.createChatRoom(data);
  }

  @Put('update')
  updateChatRoom() {}

  @Delete('delete')
  deleteChatRoom() {}
}
