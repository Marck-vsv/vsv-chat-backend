import { BadRequestException, Injectable } from '@nestjs/common';
import { ChatGateway } from './gateway/chat.gateway';
import { PrismaService } from 'src/utils/prisma.service';
// import { Prisma } from '@prisma/client';

@Injectable()
export class ChatService {
  constructor(private chatGateway: ChatGateway) {}

  private prisma = new PrismaService();
  private queryIn = this.prisma.chat;
  private queryParticipant = this.prisma.chatParticipant;

  // Get - Get all chat rooms for user (user_name/user_id)
  async getChatRooms(username: string) {
    try {
      const rooms = await this.queryParticipant.findMany({
        where: {
          user: {
            user_name: username,
          },
        },
      });

      if (!rooms) {
        throw new BadRequestException('No rooms found');
      }

      return rooms;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
