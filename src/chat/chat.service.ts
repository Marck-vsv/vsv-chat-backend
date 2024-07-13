import { BadRequestException, Injectable } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { PrismaService } from 'src/utils/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private chatGateway: ChatGateway) {}

  private prisma = new PrismaService();
  private queryIn = this.prisma.chat;

  getChatRooms() {
    try {
      const chat_rooms = this.queryIn.findMany();

      if (!chat_rooms) {
        throw new BadRequestException('Could not get chat rooms');
      }

      return chat_rooms;
    } catch (error) {
      console.error('Could not get chat rooms');
      throw error;
    }
  }

  createChatRoom(data: Prisma.ChatCreateInput) {
    try {
      const create_chat = this.queryIn.create({
        data: {
          ...data,
          chat_participants: {},
        },
      });

      if (!create_chat) {
        throw new BadRequestException('Could not create chat');
      }

      return create_chat;
    } catch (error) {
      console.error('Could not create chat');
      throw error;
    }
  }

  updateChatRoom() {
    return 'This action updates a chatRoom';
  }

  deleteChatRoom() {
    return 'This action removes a chatRoom';
  }
}
