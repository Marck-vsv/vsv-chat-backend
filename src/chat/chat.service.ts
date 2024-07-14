import { BadRequestException, Injectable } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { PrismaService } from 'src/utils/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private chatGateway: ChatGateway) {}

  private prisma = new PrismaService();
  private queryIn = this.prisma.chat;

  getChatRooms() {}

  createChatRoom(data: Prisma.ChatCreateInput) {
    try {
      const chat = this.queryIn.create({
        data,
      });

      if (!chat) {
        throw new BadRequestException('Could not create chat room');
      }

      return chat;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  updateChatRoom() {
    return 'This action updates a chatRoom';
  }

  deleteChatRoom() {
    return 'This action removes a chatRoom';
  }
}
